import { useRef, useState } from "react"

// Hook类型
function App () {
  // useState一般用推导出的类型就行
  // const [num, setNum] = useState(0)
  // 也可以手动生命类型
  const [num, setNum] = useState<number>(0)
  // useEffect 和 useLayoutEffect 没有类型参数

  // 保存dom引用的时候
  const ref = useRef<HTMLInputElement>(undefined)

  // 保存别的内容的时候
  const numRef = useRef<{ num: number}>(null)

  numRef.current = { num: 999 }

  return (
    <>
      <h3>Hello Wolrd!</h3>
      <button onClick={() => setNum(num => num + 1)}>click { num }</button>
      <input ref={ref} />
    </>
  )
}

export default App
