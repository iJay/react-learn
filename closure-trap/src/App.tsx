import { useEffect, useReducer, useRef, useState } from 'react'
import './App.css'
import useInterval from './utils/useInterval'



interface Action {
  type: 'add'
  payload: number
}

function reducer(state: number, action: Action) {
  switch (action.type) {
    case 'add':
      return state + action.payload
    default:
      return state
  }
}

function App() {
  const [count, setCount] = useState(0)
  // const [result, dispatch] = useReducer(reducer, 0)
  console.log('App render:', count)

  // useEffect(() => {
  //   console.log('effect里的count', count)
  //   setInterval(() => {
  //     console.log('interval里的count', count)
  //       // 这里是闭包陷阱 因为setInterval的回调函数是一个闭包 它捕获了count第一次渲染时的值
  //       // 所以每次interval里的count拿到的都是第一次渲染时的count值
  //     setCount(count + 1)
  //   }, 1000)
  // }, [])

  // 方案1
  // useEffect(() => {
  //   setInterval(() => {
  //     // 这里因为传入的这个函数的参数是上一次的count值，所以每次interval里的count拿到的都是最新的count值
  //     setCount(count => count + 1)
  //   }, 1000)
  // }, [])

  // 方案1.1
  // useEffect(() => {
  //   setInterval(() => {
  //     // dispatch 一个 action，不直接引用 state，所以也不会形成闭包
  //     dispatch({ type: 'add', payload: 1 })
  //   }, 1000)
  // }, [])

  // 方案2
  // useEffect(() => {
  //   console.log('effect里的count', count)
  //   const timer = setInterval(() => {
  //     console.log('interval里的count', count)
  //     setCount(count + 1) // 这里重新跑定时器导致定时不准, 因为每次销毁、重建它，调度时间会不断偏移。
  //   }, 1000)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [count])


  // 方案3
  // const updateCount = () => {
  //   console.log('updateCount', count)
  //   setCount(count + 1)
  // }

  // const funcRef = useRef(updateCount)

  // funcRef.current = updateCount
  // ref.current 的值改了不会触发重新渲染
  // 这里手动更新funcRef.current的值，从而更新定时器回调函数的引用
  // 而更新函数引用，从而保证updateCount函数作用域中能访问的count是最新的count值
  // 如果注释了funcRef.current = updateCount，则每次定时器回调函数执行时，updateCount中的count一直都是0
  
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     funcRef.current()
  //   }, 1000)
  //   return () => {
  //     clearInterval(timer)
  //   }
  // }, [])

  // 方案3.1 使用自定义hook
  let cleanFn = useInterval(() => {
    setCount(count + 1)
  }, 1000)

  return (
    <>
      <div>{ count}</div>
      <button onClick={() => cleanFn()}>Stop</button>
      {/* <div>{ result}</div> */}
    </>
  )
}

export default App
