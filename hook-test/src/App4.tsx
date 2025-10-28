// 记住 ref 的特点是修改了 current 属性不会导致渲染。
import { useEffect, useRef, useState } from "react"
function App () {
  const inputRef = useRef<HTMLInputElement>(null)
  // 这里通过useRef保存了input元素的引用，然后在useEffect里调用它的focus方法
  // 这里useRef的类型参数是保存的内容的类型
  // ref的内容保存在current属性中
  const numRef = useRef<number>(0)
  const [, forceRender] = useState<number>(0)

  useEffect(() => {
    inputRef.current?.focus() // 初次渲染时 自动聚焦
  }, [])

  const handleClick = () => {
    numRef.current += 1 // 这里仅仅是修改numRef的current并不会触发组件的重新渲染，但是其数值已经变化了
    console.log('numRef.current', numRef.current)
    forceRender(Math.random())
    // 所以这里需要通过setState来触发组件的重新渲染， 不过一般不这么用，因为想改变内容直接使用useState或者useReducer即可。
    // 所以 useRef一般用保存在一些不用于渲染的变量，比如定时器、事件监听器等
  }
  
  return (
    <div>
      <input ref={inputRef}></input>
      <button onClick={handleClick}>Click me { numRef.current}</button>
    </div>
  )
}

export default App
