import { FunctionalComponent } from 'preact'

export const H1: FunctionalComponent = ({ children }) => {
  return <h1 className="text-slate-900 text-3xl font-semibold">{children}</h1>
}
