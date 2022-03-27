import { StacksSessionState, authenticate } from 'micro-stacks/connect'
import create from 'zustand'

export const appDetails = {
  name: 'Colors Vote Tuto',
  icon: `localhost:3003/src/favicon.svg`,
}

const SESSION_STORAGE_KEY = 'stacks-session'
const rawSession = localStorage.getItem(SESSION_STORAGE_KEY)

interface AuthStore {
  session: StacksSessionState | null
  isLoading: boolean
  connectFromStorage: () => void
  connect: () => Promise<void>
  disconnect: () => void
}

export const useAuth = create<AuthStore>((set) => ({
  session: null,
  isLoading: true,

  disconnect: () => {
    set({ session: null })
    localStorage.clear()
  },

  connectFromStorage: () => {
    if (rawSession) {
      try {
        const session = JSON.parse(rawSession)
        set({ session, isLoading: false })
      } catch (err) {
        console.warn(err)
      }
    } else {
      set({ isLoading: false })
    }
  },

  connect: async () => {
    try {
      const session = await authenticate({ appDetails })
      if (!session) throw new Error('invalid session')
      set({ session })
    } catch (err) {
      console.error(err)
    }
  },
}))
