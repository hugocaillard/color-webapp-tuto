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
          {colors.map((color) => (
            <div className="w-full" key={color.id}>
              <Circle fill={`#${color.value}`} />
            </div>
          ))}
        </div>
      ) : null}
    </>
  )
}
