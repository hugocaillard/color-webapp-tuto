import classNames from 'classnames'
import { FunctionalComponent } from 'preact'

export const Container: FunctionalComponent<{ className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div class={classNames('max-w-3xl', 'p-4', 'mx-auto', className)}>
      {children}
    </div>
  )
}
