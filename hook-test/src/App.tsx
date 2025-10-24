import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const [number, setNumber] = useState(() => { // 如果初始状态需要经过复杂计算得到，这里可以传递一个函数来计算初始值
    // 这里只能是同步代码，不能是异步代码
    const num1 = 1 + 2
    const num2 = 2 + 3
    return num1 + num2
  })

  return (
    <>
      {/* <p>setXXX的参数可以是一个新的值，也可以是一个函数，这个函数的参数是上一次的state值</p> */}
      <button onClick={() => setCount(count + 1)}>Click me {count}</button>
      <button onClick={() => setNumber(num => num + 1)}>Click me {number}</button>
    </>
  )
}

export default App
