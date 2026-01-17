import { useEffect, useRef } from 'react'

function App() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      console.log(window.scrollY + window.innerHeight, document.documentElement.scrollHeight);
    })
  }, []);

  return (
    <div>
      <div id="box" ref={ref} style={{
        border: '10px solid #000',
        marginTop: '800px',
        width: '100px',
        height: '100px',
        background: 'pink',
        overflow: 'auto',
        transform: 'rotate(45deg)'
      }}>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
        <p>xxxxx</p>
      </div>
    </div>
  )
}

export default App
