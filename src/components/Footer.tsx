import { Container } from './UI/Container'
import { Link } from './UI/Link'

export const Footer = () => {
  return (
    <footer class="text-center">
      <Container>
        Color App - <Link href="https://www.clearness.dev">Clearness</Link> -{' '}
        <Link href="https://github.com/hugocaillard/color-webapp-tuto">
          GitHub
        </Link>
      </Container>
    </footer>
  )
}
