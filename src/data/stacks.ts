import { StacksMocknet } from 'micro-stacks/network'
import { callReadOnlyFunction } from 'micro-stacks/transactions'
import type { ClarityValue } from 'micro-stacks/clarity'
import {
  makeContractCallToken,
  openTransactionPopup,
} from 'micro-stacks/connect'

import { useAuth, appDetails } from '../stores/useAuth'

const network = new StacksMocknet({
  url: 'http://localhost:3999',
})

const ADDRESS = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM'
const CONTRACT = 'color-vote'

export async function readOnlyRequest<T extends ClarityValue>(
  name: string,
  args: (string | ClarityValue)[] = [],
) {
  const address = useAuth.getState().session?.addresses.testnet
  if (!address) {
    console.warn('missing address')
    return
  }

  try {
    const res = (await callReadOnlyFunction({
      network,
      contractAddress: ADDRESS,
      contractName: CONTRACT,
      functionName: name,
      functionArgs: args,
      senderAddress: address,
    })) as T

    return res
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function callContract(name: string, args: ClarityValue[] = []) {
  const key = useAuth.getState().session?.appPrivateKey
  const address = useAuth.getState().session?.addresses.testnet
  if (!key || !address) return Promise.reject(new Error())

  const token = await makeContractCallToken({
    appDetails,
    network,
    contractAddress: ADDRESS,
    contractName: CONTRACT,
    functionName: name,
    functionArgs: args,
    privateKey: key,
    stxAddress: address,
  })

  return new Promise<string>((resolve, reject) =>
    openTransactionPopup({
      token,
      onFinish: (payload) => resolve(payload.txId),
      onCancel: () => reject(new Error('cancelled')),
    }),
  )
}
