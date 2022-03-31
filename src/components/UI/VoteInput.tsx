import type { JSX } from 'preact'

type VoteInputProps = {
  id: string
  onInput: JSX.GenericEventHandler<HTMLInputElement>
  value?: number
}

export function VoteInput({ id, value, onInput }: VoteInputProps) {
  return (
    <input
      id={id}
      value={value}
      onInput={onInput}
      type="number"
      className="block w-3/4 mx-auto text-center"
      min="0"
      max="5"
    />
  )
}
