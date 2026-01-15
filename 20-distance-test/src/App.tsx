import { useEffect, useRef, type MouseEventHandler } from 'react'
import './App.css'

function App() {
  const ref = useRef<HTMLDivElement>(null)

  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    console.log('react click pageY', e.pageY)
    console.log('react click clientY', e.clientY)
    // React合成事件不存在offsetY
    console.log('react click offsetY', e.offsetY)
    console.log('react click screenY', e.screenY)
  }

  useEffect(() => {
    document.getElementById('box')!.addEventListener('click', (e) => {
      console.log('native click pageY', e.pageY)
      console.log('native click clientY', e.clientY)
      console.log('native click offsetY', e.offsetY)
      console.log('native click screenY', e.screenY)
    })
  }, [])

  return (
    <div>
      <div id="box" ref={ref} style={{
        marginTop: '800px',
        width: '100px',
        height: '100px',
        background: 'blue',
        border: '10px solid #ccc'
      }} onClick={clickHandler}></div>
    </div>
  )
}

export default App
