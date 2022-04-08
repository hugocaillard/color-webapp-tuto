import { useEffect } from 'preact/hooks'

import { useColorVote } from '../stores/useColorVote'
import { H2 } from './UI/Typography'

export function LastVote() {
  const { txId, lastTx, fetchLastTx } = useColorVote()
  useEffect(() => {
    fetchLastTx()
  }, [txId])

  useEffect(() => {
    if (lastTx && lastTx.tx_status === 'pending') {
      const timeout = setTimeout(() => fetchLastTx(), 2000)
      return () => clearTimeout(timeout)
    }
  }, [lastTx])

  return lastTx ? (
    <div>
      <H2>Previous vote</H2>
      <p>
        <b>Status</b>: <span className="capitalize">{lastTx.tx_status}</span>
      </p>
      <p>
        <b>Function</b>:{' '}
        <span className="capitalize">{lastTx.contract_call.function_name}</span>
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
