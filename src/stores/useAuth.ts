import { StacksSessionState, authenticate } from 'micro-stacks/connect'
import create from 'zustand'

import { useColorVote } from './useColorVote'

interface AuthStore {
  session: StacksSessionState | null
  connect: () => Promise<void>
  disconnect: () => void
}

export const appDetails = {
  name: 'Colors Vote Tuto',
  icon: `localhost:3003/src/favicon.svg`,
}

const SESSION_STORAGE_KEY = 'stacks-session'
let rawSession = localStorage.getItem(SESSION_STORAGE_KEY)
let session: AuthStore['session'] = null
if (rawSession) {
  try {
    session = JSON.parse(rawSession)
  } catch (err) {
    rawSession = null
    localStorage.removeItem(SESSION_STORAGE_KEY)
  }
}

export const useAuth = create<AuthStore>((set) => ({
  session,

  disconnect: () => {
    set({ session: null })
    useColorVote.getState().resetAll()
    localStorage.clear()
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
