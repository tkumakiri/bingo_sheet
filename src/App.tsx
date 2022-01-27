// import './App.css'
import { Provider } from 'react-redux'
import Sheet from './features/sheet/Sheet'
// import store from './app/store'
import logo from './logo.svg'

function App() {
  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col">
      <Sheet />
    </div>
  )
}

export default App
