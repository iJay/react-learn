// 跨任意层组件传递数据 useContext

import { createContext, useContext, useState } from "react"

// 使用createContext创建一个上下文，这个上下文可以传递数据到任意层级的组件
const CountContext = createContext<number>(0)

function App () {
  const [count, setCount] = useState(0)
  const handleClick = () => {
    setCount(count + 1)
  }
  return (
    // 使用CountContext组件传递数据到任意层级的组件
    <>
    <button onClick={handleClick}>Click me {count}</button>
    <CountContext value={count}>
      <Bbb />
    </CountContext>
    {/*从 React 19 开始，可以将 CountContext 直接作为渲染的上下文 provider。较旧版本的 React 需要使用 CountContext.Provider*/}
    {/* <CountContext.Provider value={222}>
     <CountContext.Provider value={222}>
      <Bbb />
    </CountContext.Provider> */}
    </>
  )
}

function Bbb () {
  return (
    <div>
      <Ccc />
    </div>
  )
}

function Ccc () {
  // 使用useContext获取上下文中的数据
  const count = useContext(CountContext)
  return (
    <div>
      <p>Ccc: {count}</p>
    </div>
  )
}

export default App
