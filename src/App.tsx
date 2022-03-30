import { useEffect } from 'preact/hooks'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Container } from './components/UI/Container'
<<<<<<< HEAD
import { useAuth } from './stores/useAuth'
import { useColorVote } from './stores/useColorVote'
=======
import { useAuth } from './hooks/useAuth'
import { useColorVote } from './hooks/useColorVote'
>>>>>>> cb195f6 (step-2: improve color fetch)
import { Vote } from './pages/Vote'

export function App() {
  const { session } = useAuth()
  useEffect(() => {
    // fetch colors without rerendering App
    if (session) useColorVote.getState().fetchColors()
  }, [session])

  return (
    <div className="h-screen flex flex-col text-slate-800">
      <div className="flex-auto">
        <Header />

        <main>
          <Container>
            {session ? <Vote /> : <p>Connect your wallet</p>}
          </Container>
        </main>
      </div>

      <Footer />
    </div>
  )
}
