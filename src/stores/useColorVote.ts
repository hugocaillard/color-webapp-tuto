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
type ValidVote = [ValidValue, ValidValue, ValidValue, ValidValue]
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
  alreadyVoted: boolean
  saveTx: (txId: string) => void
  updateVote: (id: bigint, vote: number) => void
  fetchVote: () => Promise<void>
  fetchColors: () => Promise<void>
  fetchLastTx: () => Promise<void>
  sendVote: () => Promise<void>
  unvote: () => Promise<void>
  resetVote: () => void
  resetAll: () => void
}

const ids = [0n, 1n, 2n, 3n] as const
const getVoteMap = (values?: ValidVote) =>
  new Map(ids.map((id, i) => [id, values ? values[i] : undefined]))

function isValueValid(value: unknown): value is ValidValue {
  if (value === undefined || isNaN(Number(value))) return false
  return Number(value) >= 0 && Number(value) <= 5
}

function isPreviousVoteValid(vote: unknown): vote is ValidVote {
  if (!Array.isArray(vote) || vote.length !== 4) return false
  return vote.reduce((acc, v) => isValueValid(v) && acc, true)
}

function checkColors(colors: unknown): colors is Color[] {
  if (!Array.isArray(colors)) return false
  return colors.reduce((acc, c) => acc && c.value, true)
}

export const useColorVote = create<ColorStore>((set, get) => ({
  vote: getVoteMap(),
  txId: localStorage.getItem('txId'),
  colors: null,
  lastTx: null,
  fetchError: false,
  alreadyVoted: false,
  isValid: false,

  saveTx(txId: string) {
    localStorage.setItem('txId', txId)
    set({ txId })
  },

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

  async fetchVote() {
    const rawVote = await readOnlyRequest('get-sender-vote')
    if (!rawVote) return

    const vote = cvToTrueValue(rawVote)
    if (!vote || !Array.isArray(vote)) return

    const voteAsNbs = vote.map((v) => parseInt(v))
    if (!isPreviousVoteValid(voteAsNbs)) return
    set({ vote: getVoteMap(voteAsNbs), alreadyVoted: true })
  },

  async fetchColors() {
    const rawColors = await readOnlyRequest('get-colors')
    if (!rawColors) return

    const colors = cvToTrueValue(rawColors)
    if (checkColors(colors)) set({ colors: randomise(colors) })
  },

  async sendVote() {
    const { vote, alreadyVoted, saveTx } = get()
    const senderVote = ids.map((id) => vote.get(id))
    if (!senderVote.every(isValueValid)) return

    const txId = await callContract(
      alreadyVoted ? 'revote' : 'vote',
      senderVote.map(uintCV),
    )
    saveTx(txId)
  },

  async unvote() {
    const { alreadyVoted, saveTx } = get()
    if (!alreadyVoted) return

    const txId = await callContract('unvote')
    set({ vote: getVoteMap() })
    saveTx(txId)
  },

  async fetchLastTx() {
    const { txId, lastTx } = get()
    if (!txId) return
    try {
      const tx: VoteTx = (await fetchTransaction({
        url: network.getCoreApiUrl(),
        txid: txId,
      })) as VoteTx
      if ('error' in tx) throw new Error('tx error')
      if (lastTx?.tx_id === txId && lastTx?.tx_status === tx.tx_status) return

      set({ lastTx: tx })
    } catch (err) {
      if (err instanceof Error && err.message === 'tx error') {
        localStorage.removeItem('txId')
        set({ txId: null })
      }
    }
  },

  resetVote() {
    set(() => ({ vote: getVoteMap() }))
  },

  resetAll() {
    set({
      vote: getVoteMap(),
      txId: null,
      lastTx: null,
      alreadyVoted: false,
    })
  },
}))
