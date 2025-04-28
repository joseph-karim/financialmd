import { createClient } from 'npm:@supabase/supabase-js@2.36.0'

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
}

const SUPABASE_URL = Deno.env.get('SUPABASE_URL') || ''
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY') || ''
const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY') || ''

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    })
  }

  try {
    // Verify request
    const authHeader = req.headers.get('Authorization')
    
    if (!authHeader) {
      return new Response(JSON.stringify({ error: 'Missing Authorization header' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Parse request body
    const { message, moduleId } = await req.json()

    if (!message) {
      return new Response(JSON.stringify({ error: 'Missing message in request body' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Verify user session
    const authToken = authHeader.replace('Bearer ', '')
    const { data: { user }, error: authError } = await supabase.auth.getUser(authToken)

    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Get user role
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single()

    if (userError || userData?.role !== 'paid') {
      return new Response(JSON.stringify({ error: 'Upgrade to full access required' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      })
    }

    // Fetch module content for context if moduleId is provided
    let moduleContent = ''
    if (moduleId) {
      const { data: moduleData, error: moduleError } = await supabase
        .from('modules')
        .select('content')
        .eq('id', moduleId)
        .single()

      if (!moduleError && moduleData) {
        moduleContent = moduleData.content
      }
    }

    // Prepare messages for OpenAI
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are an AI assistant for the Primary Care Financial Masterclass, a program that helps primary care physicians maximize their earnings through effective billing and coding practices. 
        
        You specialize in medical billing codes, RVU values, and how to optimize patient encounters for proper reimbursement. You can explain complex topics like Medical Decision Making (MDM), time-based billing, CPT codes, G-codes, add-on codes, and other coding concepts.

        Always be professional, clear, and helpful. When explaining complex billing concepts, use examples to illustrate your points.
        
        ${moduleContent ? 'The user is currently viewing the following module content: ' + moduleContent : ''}
        
        If you don't know the answer to a question, don't make up information - suggest the user check specific resources or consult their coding department.`
      },
      { role: 'user', content: message }
    ]

    // Call OpenAI API
    const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: messages,
        temperature: 0.5,
      }),
    })

    const responseData = await openaiResponse.json()

    if (!openaiResponse.ok) {
      throw new Error(responseData.error?.message || 'OpenAI API error')
    }

    const aiResponse = responseData.choices[0]?.message?.content || 'Sorry, I couldn\'t generate a response.'

    return new Response(
      JSON.stringify({ response: aiResponse }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )

  } catch (error) {
    console.error('Error processing request:', error)
    
    return new Response(
      JSON.stringify({ error: error.message || 'Internal server error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    )
  }
})