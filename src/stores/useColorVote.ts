import create from 'zustand'
import { cvToTrueValue } from 'micro-stacks/clarity'

import { readOnlyRequest } from '../data/stacks'

export interface Color {
  id: bigint
  value: string
  score: bigint
}

interface ColorStore {
  colors: Color[]
  fetchColors: () => Promise<void>
}

export const useColorVote = create<ColorStore>((set, get) => ({
  colors: [],

  async fetchColors() {
    const rawColors = await readOnlyRequest('get-colors')
    if (!rawColors) return

    const colors = cvToTrueValue(rawColors) as Color[]
    set({ colors })
  },
}))
