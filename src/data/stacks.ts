import { StacksMocknet } from 'micro-stacks/network'
import { callReadOnlyFunction } from 'micro-stacks/transactions'
import { ClarityValue } from 'micro-stacks/clarity'

import { useAuth } from '../stores/useAuth'

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
      contractAddress: ADDRESS,
      contractName: CONTRACT,
      functionName: name,
      functionArgs: args,
      senderAddress: address,
      network,
    })) as T

    return res
  } catch (err) {
    console.error(err)
    return null
  }
}
