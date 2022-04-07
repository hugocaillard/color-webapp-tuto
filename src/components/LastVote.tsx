import { useEffect } from 'preact/hooks'

import { useColorVote } from '../stores/useColorVote'
import { H2 } from './UI/Typography'

export function LastVote() {
  const { txId, lastTx, fetchLastTx } = useColorVote()
  useEffect(() => {
    fetchLastTx()
  }, [txId])

  return lastTx ? (
    <div>
      <H2>Previous vote</H2>
      <p>
        <b>Status</b>: <span className="capitalize">{lastTx.tx_status}</span>
      </p>
      <ul className="flex gap-3">
        {lastTx.contract_call.function_args?.map((v) => (
          <li>
            <span className="font-bold capitalize">{v.name}</span>:{' '}
            {v.repr.replace('u', '')}
          </li>
        ))}
      </ul>
    </div>
  ) : null
}
