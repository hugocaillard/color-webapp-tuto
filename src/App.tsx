import { useEffect } from 'preact/hooks'

import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Container } from './components/UI/Container'
import { useAuth } from './stores/useAuth'
import { useColorVote } from './stores/useColorVote'
import { Vote } from './pages/Vote'

export function App() {
  const { session } = useAuth()
  useEffect(() => {
    if (session) {
      const { fetchVote, fetchColors } = useColorVote.getState()
      fetchVote()
      fetchColors()
    }
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
