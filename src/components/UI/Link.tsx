import { FunctionalComponent } from 'preact'

export const Link: FunctionalComponent<{ href: string }> = ({
  children,
  href,
}) => {
  return (
    <a
      className="text-blue-700 hover:text-blue-900 hover:underline transition-colors"
      href={href}
      target="_blank"
    >
      {children}
    </a>
  )
}
