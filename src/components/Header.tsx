import { Button } from './UI/Button'
import { Container } from './UI/Container'
import { H1 } from './UI/Typography'

export const Header = () => {
  return (
    <header>
      <Container className="flex justify-between items-center">
        <H1>Color App</H1>
        <Button>Connect Wallet</Button>
      </Container>
    </header>
  )
}
