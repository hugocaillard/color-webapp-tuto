import type { JSX } from 'preact'

import { Button } from '../components/UI/Button'
import { Circle } from '../components/UI/svg/Circle'
import { H2 } from '../components/UI/Typography'
import { useColorVote } from '../stores/useColorVote'
import { VoteInput } from '../components/UI/VoteInput'

export const Vote = () => {
  const { colors, votes, updateVote, sendVote } = useColorVote()

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    sendVote()
  }

  return (
    <>
      <H2>Vote</H2>
      {colors ? (
        <form onSubmit={handleSubmit}>
          <div className="flex">
            {colors.map((c) => (
              <div key={c.id} className="w-full">
                <Circle hex={c.value} />
                <VoteInput
                  id={c.id.toString()}
                  value={votes.get(c.id)}
                  onInput={(e) =>
                    updateVote(c.id, parseInt(e.currentTarget.value))
                  }
                />
              </div>
            ))}
          </div>
          <div class="mt-6 flex justify-around">
            <Button type="submit">Vote</Button>
          </div>
        </form>
      ) : null}
    </>
  )
}
