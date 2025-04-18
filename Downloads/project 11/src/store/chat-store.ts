import { create } from 'zustand'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  createdAt: Date
}

interface ChatState {
  messages: Message[]
  isOpen: boolean
  isLoading: boolean
  currentModuleId: string | null
  
  // Actions
  openChat: () => void
  closeChat: () => void
  sendMessage: (content: string) => Promise<void>
  clearMessages: () => void
  setCurrentModule: (moduleId: string) => void
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  currentModuleId: null,
  
  openChat: () => set({ isOpen: true }),
  closeChat: () => set({ isOpen: false }),
  
  sendMessage: async (content) => {
    const messageId = crypto.randomUUID()
    
    // Add user message
    set(state => ({
      messages: [
        ...state.messages,
        {
          id: messageId,
          role: 'user',
          content,
          createdAt: new Date()
        }
      ],
      isLoading: true
    }))
    
    try {
      // Instead of calling the API, generate mock responses for testing
      setTimeout(() => {
        const moduleId = get().currentModuleId || '';
        let response = '';
        
        if (content.toLowerCase().includes('rvu')) {
          response = "RVU stands for Relative Value Unit, which is a measure of value used to calculate physician reimbursement. The current national average for payment is about $45 per RVU, though this varies by location and organization.\n\nFor example:\n- 99213 (established patient, low complexity) = 1.3 RVUs\n- 99214 (established patient, moderate complexity) = 1.92 RVUs\n- 99215 (established patient, high complexity) = 2.8 RVUs";
        } else if (content.toLowerCase().includes('billing')) {
          response = "When billing, you can choose between time-based or complexity-based coding. Complexity-based coding often yields higher RVUs per hour. For example, billing four 99214 visits (moderate complexity) in an hour would generate 7.68 RVUs, which is significantly higher than the target of 5.4 RVUs per hour needed to reach a $400K yearly income.";
        } else if (content.toLowerCase().includes('code')) {
          response = "Some commonly missed add-on codes that can boost your revenue include:\n\n- 99406: Tobacco cessation counseling (3-10 mins) - 0.24 RVU\n- G0447: Obesity counseling - 0.45 RVU\n- 99401: Preventative medicine counseling - 0.48 RVU\n- G2211: Medicare continuity of care - 0.33 RVU\n\nThese can be added to standard E&M codes with a 25 modifier.";
        } else if (moduleId.includes('procedure')) {
          response = "Office procedures that are quick and high-yield include:\n\n1. 69210: Cerumen removal - 0.61 RVU\n2. 17110: Wart destruction - 0.70 RVU\n3. 11200: Skin tag removal - 0.80 RVU\n\nThese can be billed alongside an office visit using the 25 modifier.";
        } else {
          response = "I'm here to help you understand medical billing and coding concepts from the Primary Care Financial Masterclass. Feel free to ask specific questions about E&M codes, RVUs, Medicare billing, documentation requirements, or any other related topics.";
        }
        
        // Add AI response
        set(state => ({
          messages: [
            ...state.messages,
            {
              id: crypto.randomUUID(),
              role: 'assistant',
              content: response,
              createdAt: new Date()
            }
          ],
          isLoading: false
        }));
      }, 1000);
      
    } catch (error) {
      console.error('Error sending message:', error)
      
      // Add error message
      set(state => ({
        messages: [
          ...state.messages,
          {
            id: crypto.randomUUID(),
            role: 'assistant',
            content: 'Sorry, I encountered an error. Please try again later.',
            createdAt: new Date()
          }
        ],
        isLoading: false
      }))
    }
  },
  
  clearMessages: () => set({ messages: [] }),
  
  setCurrentModule: (moduleId) => set({ currentModuleId: moduleId })
}))