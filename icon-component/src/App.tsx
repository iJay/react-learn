
import './App.css'
import IconAdd from './Icon/icons/IconAdd'
import IconEmail from './Icon/icons/IconEmail'

function App() {
  return (
    <div style={ {padding: '50px'} }>
      <IconAdd size='40px'></IconAdd>
      <IconEmail spin></IconEmail>
      <IconEmail style={{color: 'blue', fontSize: '50px'}}></IconEmail>
    </div>
  )
}

export default App
