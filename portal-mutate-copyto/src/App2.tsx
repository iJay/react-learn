// 
import Protal from './Portal'
import { useEffect, useRef } from 'react'
import './App.css'

function App() {
  const containerRef = useRef<HTMLElement>(null)
  const content = (
    <div className='btn'>
      <button>按钮</button>
    </div>
  )

  useEffect(() => {
    console.log(containerRef)
  }, [])

  return (
    <Protal attach={document.body} ref={containerRef}>
      { content }
    </Protal>
  )
}

export default App
