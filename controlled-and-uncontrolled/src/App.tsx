// 非受控模式
import type { ChangeEvent } from 'react'
import { useEffect, useRef } from 'react'
import './App.css'

function App() {

  const inputRef = useRef<HTMLInputElement>(null)

  console.log('App render~')

  useEffect(() => {
    setTimeout(() => {
      // 非受控模式 也可以通过 ref 拿到 value
      console.log(inputRef.current?.value)
    }, 2000)
  }, [])

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    // 非受控模式 用户输入触发 onChange 事件，通过 event.target 拿到 value
    console.log(event.target.value)
  }
  
  return (
    <>
      <input defaultValue={'LeoHan'} onChange={onChange} />
      <input defaultValue={'AmyZhan'} ref={inputRef} />
    </>
  )
}

export default App
