import { Circle } from '../components/UI/svg/Circle'
import { H2 } from '../components/UI/Typography'
import { useColorVote } from '../stores/useColorVote'

export const Vote = () => {
  const { colors } = useColorVote()

  return (
    <>
      <H2>Vote</H2>
      {colors ? (
        <div className="flex">
          {colors.map((c) => (
            <Circle key={c.id} hex={c.value} />
          ))}
        </div>
      ) : null}
    </>
  )
}
