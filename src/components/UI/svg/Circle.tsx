import { FunctionComponent } from 'preact'

interface CircleProps {
  fill: string
}

export const Circle: FunctionComponent<CircleProps> = ({ fill }) => {
  return (
    <svg viewBox="0 0 100 100">
      <circle
        className="stroke-slate-800"
        cx="50"
        cy="50"
        r="42"
        fill={fill}
        strokeWidth="1"
      />
    </svg>
  )
}
