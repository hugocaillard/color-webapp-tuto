import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Container } from './components/UI/Container'

export function App() {
  return (
    <div className="h-screen flex flex-col text-slate-800">
      <div className="flex-auto">
        <Header />

        <main>
          <Container>
            <p>Color App</p>
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  )
}
