import { Reset, Wrap, Layout } from './Style'
import Container from './components/Container'

function App() {
  return (
    <Wrap>
      <Reset />
      <Layout>
        <Container />
      </Layout>
    </Wrap>
  );
}

export default App
