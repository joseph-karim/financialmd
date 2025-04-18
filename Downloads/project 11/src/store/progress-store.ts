import { create } from 'zustand'

interface ProgressState {
  // Track completed modules
  completedModules: Record<string, boolean>
  // Track current module
  currentModuleId: string | null
  
  // Actions
  markModuleAsCompleted: (moduleId: string) => Promise<void>
  setCurrentModule: (moduleId: string) => void
  fetchUserProgress: (userId: string) => Promise<void>
  
  // State
  isLoading: boolean
}

export const useProgressStore = create<ProgressState>((set) => ({
  completedModules: {},
  currentModuleId: null,
  isLoading: false,
  
  markModuleAsCompleted: async (moduleId) => {
    // For testing, we'll just update the local state
    // without making actual API calls
    set(state => ({
      completedModules: {
        ...state.completedModules,
        [moduleId]: true
      }
    }))
  },
  
  setCurrentModule: (moduleId) => {
    set({ currentModuleId: moduleId })
  },
  
  fetchUserProgress: async (_userId) => {
    // For testing, we'll just keep this empty
    // and not actually fetch from Supabase
    set({ isLoading: false })
  }
}))