export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          role: 'free' | 'paid'
        }
        Insert: {
          id?: string
          created_at?: string
          email?: string
          role?: 'free' | 'paid'
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          role?: 'free' | 'paid'
        }
      }
      modules: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
          order_index: number
          is_preview: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
          order_index: number
          is_preview: boolean
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
          order_index?: number
          is_preview?: boolean
        }
      }
      progress: {
        Row: {
          id: string
          created_at: string
          user_id: string
          module_id: string
          completed: boolean
          updated_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          module_id: string
          completed: boolean
          updated_at?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          module_id?: string
          completed?: boolean
          updated_at?: string
        }
      }
      quiz_results: {
        Row: {
          id: string
          created_at: string
          user_id: string
          module_id: string
          score: number
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          module_id: string
          score: number
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          module_id?: string
          score?: number
        }
      }
      quiz_questions: {
        Row: {
          id: string
          created_at: string
          module_id: string
          question: string
          options: string[]
          correct_answer: string
        }
        Insert: {
          id?: string
          created_at?: string
          module_id: string
          question: string
          options: string[]
          correct_answer: string
        }
        Update: {
          id?: string
          created_at?: string
          module_id?: string
          question?: string
          options?: string[]
          correct_answer?: string
        }
      }
      payments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          stripe_payment_id: string
          amount: number
          payment_date: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          stripe_payment_id: string
          amount: number
          payment_date?: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          stripe_payment_id?: string
          amount?: number
          payment_date?: string
        }
      }
    }
  }
}