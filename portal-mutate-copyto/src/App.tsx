// Portal
import './App.css'
import { createPortal } from 'react-dom'

function App() {
  const content = (
    <div className='btn'>
      <button>按钮</button>
    </div>
  )

  // content直接挂载到body之下了
  return createPortal(content, document.body)
}

export default App
