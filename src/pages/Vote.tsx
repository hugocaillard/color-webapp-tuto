import type { JSX } from 'preact'

import { LastVote } from '../components/LastVote'
import { Button } from '../components/UI/Button'
import { Circle } from '../components/UI/svg/Circle'
import { H2 } from '../components/UI/Typography'
import { useColorVote } from '../stores/useColorVote'
import { VoteInput } from '../components/UI/VoteInput'

export const Vote = () => {
  const { colors, vote, isValid, updateVote, sendVote, resetVote } =
    useColorVote()

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    sendVote()
  }

  return (
    <>
      <H2>Vote</H2>
      <div className="h-60 sm:h-72 flex items-center justify-center">
        {colors ? (
          <form onSubmit={handleSubmit} onReset={resetVote} className="w-full">
            <div className="flex">
              {colors.map((c) => (
                <div key={c.id} className="w-full">
                  <Circle hex={c.value} />
                  <VoteInput
                    id={c.id.toString()}
                    value={vote.get(c.id)}
                    onInput={(e) =>
                      updateVote(c.id, e.currentTarget.valueAsNumber)
                    }
                  />
                </div>
              ))}
            </div>
            <div class="mt-6 flex justify-center gap-4">
              <Button type="submit" disabled={!isValid}>
                Vote
              </Button>
              <Button type="reset">Empty form</Button>
            </div>
          </form>
        ) : (
          <p className="text-center text-slate-600">Loading</p>
        )}
      </div>

      <LastVote />
    </>
  )
}
