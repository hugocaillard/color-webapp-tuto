import create from 'zustand'
import { cvToTrueValue, uintCV } from 'micro-stacks/clarity'

import { callContract, readOnlyRequest } from '../data/stacks'
import { randomise } from '../data/array'

type ValidVote = 0 | 1 | 2 | 3 | 4 | 5
type Vote = undefined | ValidVote

export interface Color {
  id: bigint
  value: string
  score: bigint
}

interface ColorStore {
  colors: Color[]
  votes: Map<BigInt, Vote>
  updateVote: (id: bigint, vote: number) => void
  fetchColors: () => Promise<void>
  sendVote: () => Promise<void>
}

const initialVote = new Map([
  [0n, undefined],
  [1n, undefined],
  [2n, undefined],
  [3n, undefined],
])

function isVoteValid(vote: number | undefined): vote is ValidVote {
  if (vote === undefined || isNaN(vote)) return false
  return vote >= 0 && vote <= 5
}

function checkColors(colors: unknown): colors is Color[] {
  if (!Array.isArray(colors)) return false
  return colors.reduce((acc, c) => acc && c.value, true)
}

export const useColorVote = create<ColorStore>((set, get) => ({
  colors: [],
  votes: initialVote,

  updateVote(id, value) {
    const vote = value > 5 ? 5 : value < 0 ? 0 : value
    if (!isVoteValid(vote)) return false

    set((state) => ({ votes: state.votes.set(id, vote) }))
  },

  async fetchColors() {
    const rawColors = await readOnlyRequest('get-colors')
    if (!rawColors) return

    const colors = cvToTrueValue(rawColors)
    if (checkColors(colors)) set({ colors: randomise(colors) })
  },

  async sendVote() {
    const { votes } = get()
    const senderVote = [
      votes.get(0n),
      votes.get(1n),
      votes.get(2n),
      votes.get(3n),
    ] as const
    if (!senderVote.every(isVoteValid)) return

    await callContract('vote', senderVote.map(uintCV))
  },
}))
