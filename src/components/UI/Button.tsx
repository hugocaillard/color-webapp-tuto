import classNames from 'classnames'
import { JSX } from 'preact'

export function Button({
  children,
  className,
  ...props
}: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={classNames(
        'block',
        'my-2',
        'px-4 py-1',
        'rounded',
        'border border-1 border-slate-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'hover:border-slate-900',
      )}
      {...props}
    >
      {children}
    </button>
  )
}
