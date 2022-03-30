import create from 'zustand'
import { cvToTrueValue } from 'micro-stacks/clarity'

import { readOnlyRequest } from '../data/stacks'
import { randomise } from '../data/array'

export interface Color {
  id: bigint
  value: string
  score: bigint
}

interface ColorStore {
  colors: Color[]
  fetchColors: () => Promise<void>
}

function checkColors(colors: unknown): colors is Color[] {
  if (!Array.isArray(colors)) return false
  return colors.reduce((acc, c) => acc && c.value, true)
}

export const useColorVote = create<ColorStore>((set, get) => ({
  colors: [],

  async fetchColors() {
    const rawColors = await readOnlyRequest('get-colors')
    if (!rawColors) return

    const colors = cvToTrueValue(rawColors)
    if (checkColors(colors)) set({ colors: randomise(colors) })
  },
}))
