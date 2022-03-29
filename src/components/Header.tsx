import { useAuth } from '../hooks/useAuth'
import { Button } from './UI/Button'
import { Container } from './UI/Container'
import { H1 } from './UI/Typography'

export const Header = () => {
  const { connect, disconnect, session } = useAuth()

  return (
    <header>
      <Container className="h-16 flex justify-between items-center">
        <H1>Color App</H1>
        {session ? (
          <Button onClick={disconnect}>Disconnect</Button>
        ) : (
          <Button onClick={connect}>Connect Wallet</Button>
        )}
      </Container>
    </header>
  )
}
