import { FunctionalComponent } from 'preact'

export const H1: FunctionalComponent = ({ children }) => {
  return <h1 className="text-slate-900 text-3xl font-semibold">{children}</h1>
}

export const H2: FunctionalComponent = ({ children }) => {
  return <h2 className="text-slate-900 text-2xl font-medium">{children}</h2>
}

export const H3: FunctionalComponent = ({ children }) => {
  return <h3 className="text-slate-800 text-xl font-medium">{children}</h3>
}
