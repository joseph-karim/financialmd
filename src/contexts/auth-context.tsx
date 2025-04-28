import { createContext, useContext, useState } from 'react'
import { Session, User } from '@supabase/supabase-js'
import { useNavigate } from 'react-router-dom'

// Mock user for testing without authentication
const TEST_USER: User = {
  id: '00000000-0000-0000-0000-000000000000',
  email: 'test@example.com',
  app_metadata: {},
  user_metadata: {},
  aud: 'authenticated',
  created_at: new Date().toISOString(),
}

type AuthContextType = {
  session: Session | null
  user: User | null
  signIn: (email: string, password: string) => Promise<{
    error: Error | null
  }>
  signInWithMagicLink: (email: string) => Promise<{
    error: Error | null
  }>
  signUp: (email: string, password: string) => Promise<{
    error: Error | null
    data: {
      user: User | null
      session: Session | null
    } | null
  }>
  signOut: () => Promise<void>
  loading: boolean
  userRole: 'free' | 'paid' | null
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  signIn: async () => ({ error: null }),
  signInWithMagicLink: async () => ({ error: null }),
  signUp: async () => ({ error: null, data: null }),
  signOut: async () => {},
  loading: true,
  userRole: null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate()
  const [loading] = useState(false)

  // For testing: Always provide a mock user and 'paid' role
  const [user] = useState<User>(TEST_USER)
  const [session] = useState<Session | null>({
    access_token: 'test-access-token',
    refresh_token: 'test-refresh-token',
    expires_in: 3600,
    expires_at: 9999999999,
    token_type: 'bearer',
    user: TEST_USER,
  })
  const [userRole] = useState<'free' | 'paid'>('paid')

  // Mock auth functions that immediately succeed
  const signIn = async (_email: string, _password: string) => {
    return { error: null }
  }

  const signInWithMagicLink = async (_email: string) => {
    return { error: null }
  }

  const signUp = async (_email: string, _password: string) => {
    return {
      error: null,
      data: {
        user: TEST_USER,
        session: session
      }
    }
  }

  const signOut = async () => {
    navigate('/')
  }

  const value = {
    session,
    user,
    signIn,
    signInWithMagicLink,
    signUp,
    signOut,
    loading,
    userRole,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}