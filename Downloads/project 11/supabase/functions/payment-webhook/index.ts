import { createClient } from 'npm:@supabase/supabase-js@2.36.0'
import Stripe from 'npm:stripe@14.17.0'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || ''
const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY') || ''
const STRIPE_WEBHOOK_SECRET = Deno.env.get('STRIPE_WEBHOOK_SECRET') || ''

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2024-04-10',
})

// Create Supabase client with service role key for admin operations
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }
    
    // Get the stripe signature from the request headers
    const signature = req.headers.get('stripe-signature')
    
    if (!signature) {
      return new Response(JSON.stringify({ error: 'No stripe signature found' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }
    
    // Get the raw request body
    const body = await req.text()
    
    // Verify the webhook signature
    let event
    try {
      event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET)
    } catch (error) {
      return new Response(JSON.stringify({ error: `Webhook signature verification failed: ${error.message}` }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }
    
    // Handle the event based on its type
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      
      // Extract the user ID from the client_reference_id
      const userId = session.client_reference_id
      
      if (!userId) {
        throw new Error('No user ID provided in client_reference_id')
      }
      
      // Record payment in database
      await supabase.from('payments').insert({
        user_id: userId,
        stripe_payment_id: session.id,
        amount: session.amount_total / 100, // Convert from cents to dollars
      })
      
      // Update user role to paid
      await supabase.rpc('update_user_to_paid', {
        user_id_param: userId,
      })
      
      return new Response(JSON.stringify({ received: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }
    
    // Return a response for other event types
    return new Response(JSON.stringify({ received: true, event: event.type }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    })
    
  } catch (error) {
    console.error('Error processing Stripe webhook:', error)
    
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }
})