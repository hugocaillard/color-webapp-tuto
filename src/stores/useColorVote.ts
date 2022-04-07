import create from 'zustand'
import { cvToTrueValue, uintCV } from 'micro-stacks/clarity'
import { fetchTransaction } from 'micro-stacks/api'
import type {
  ContractCallTransaction,
  MempoolContractCallTransaction,
} from '@stacks/stacks-blockchain-api-types'

import { callContract, network, readOnlyRequest } from '../data/stacks'
import { randomise } from '../data/array'

type ValidValue = 0 | 1 | 2 | 3 | 4 | 5
type Vote = undefined | ValidValue
type VoteTx = ContractCallTransaction | MempoolContractCallTransaction

export interface Color {
  id: bigint
  value: string
  score: bigint
}

interface ColorStore {
  colors: Color[] | null
  vote: Map<BigInt, Vote>
  isValid: boolean
  txId: string | null
  lastTx: VoteTx | null
  updateVote: (id: bigint, vote: number) => void
  fetchColors: () => Promise<void>
  fetchLastTx: () => Promise<void>
  sendVote: () => Promise<void>
  resetVote: () => void
}

const ids = [0n, 1n, 2n, 3n] as const
const getInitialVote = () => new Map(ids.map((id) => [id, undefined]))

function isValueValid(value: unknown): value is ValidValue {
  if (value === undefined || isNaN(Number(value))) return false
  return Number(value) >= 0 && Number(value) <= 5
}

function checkColors(colors: unknown): colors is Color[] {
  if (!Array.isArray(colors)) return false
  return colors.reduce((acc, c) => acc && c.value, true)
}

export const useColorVote = create<ColorStore>((set, get) => ({
  colors: null,
  fetchError: false,
  txId: localStorage.getItem('txId'),
  lastTx: null,

  vote: getInitialVote(),
  isValid: false,

  updateVote(id, inputValue) {
    const value = inputValue > 5 ? 5 : inputValue < 0 ? 0 : inputValue
    if (!isValueValid(value)) return false

    set((state) => {
      const update = state.vote.set(id, value)
      return {
        vote: update,
        isValid: Array.from(update).every(([, v]) => isValueValid(v)),
      }
    })
  },

  async fetchColors() {
    const rawColors = await readOnlyRequest('get-colors')
    if (!rawColors) return

    const colors = cvToTrueValue(rawColors)
    if (checkColors(colors)) set({ colors: randomise(colors) })
  },

  async sendVote() {
    const { vote: votes } = get()
    const senderVote = ids.map((id) => votes.get(id))
    if (!senderVote.every(isValueValid)) return

    const txId = await callContract('vote', senderVote.map(uintCV))
    localStorage.setItem('txId', txId)
    set({ txId })
  },

  async fetchLastTx() {
    const { txId } = get()
    if (!txId) return

    try {
      const tx: VoteTx = (await fetchTransaction({
        url: network.getCoreApiUrl(),
        txid: txId,
      })) as VoteTx
      if ('error' in tx) throw new Error('tx error')
      set({ lastTx: tx })
    } catch (err) {
      localStorage.removeItem('txId')
      set({ txId: null })
    }
  },

  resetVote() {
    set(() => ({ vote: getInitialVote() }))
  },
}))
