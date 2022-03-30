import { FunctionComponent } from 'preact'

interface CircleProps {
  hex: string
}

export const Circle: FunctionComponent<CircleProps> = ({ hex }) => {
  return (
    <svg viewBox="0 0 100 100">
      <circle
        className="stroke-slate-800"
        cx="50"
        cy="50"
        r="42"
        fill={`#${hex}`}
        strokeWidth="2"
      />
    </svg>
  )
}
