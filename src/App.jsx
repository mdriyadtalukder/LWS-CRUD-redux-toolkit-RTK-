import './App.css'
import Balance from './components/Balance'
import Form from './components/Form'
import Layout from './components/Layout'
import Transactions from './components/Transactions'

function App() {

  return (
    <Layout>
      <Balance></Balance>
      <Form></Form>
      <Transactions></Transactions>
    </Layout>
  )
}

export default App
