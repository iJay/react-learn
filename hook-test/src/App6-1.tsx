// useMemo 缓存计算结果 useCallback 缓存函数
import { memo, useCallback, useEffect, useMemo, useState } from "react"

interface BbbProps {
  count: number
  callbackFn: () => void
}

function Bbb (props: BbbProps) {
  console.log('Bbb render...')
  const { count } = props
  return (
    <div>
      <p>Bbb: {count}</p>
    </div>
  )
}

const MemoBbb = memo(Bbb)
// memo的作用就是只有包裹组件的props发生变化时，组件才会重新渲染

function App () {
  const [, setNum] = useState(0)
  const [count] = useState(0)

  // 因为这里每次setNum的调用会导致重新执行App组件，callbackFn函数引用变化，所以会导致Bbb组件的重新渲染
  // 为了防止这种不必要的重新渲染，可以使用useCallback来缓存函数
  // function callbackFn () {
  //   console.log('callbackFn')
  // }

  const callbackMemoFn = useCallback(function () {}, [])
  // 这里的依赖项未空数组，所以函数引用不会变化，不会导致Bbb组件的重新渲染
  // 如果这里依赖项不为空数组，则当依赖项发生变化时，函数引用会变化，会导致Bbb组件的重新渲染

  const memoCount = useMemo(() => {
    return count * 10
  }, [count])
  // 只有在依赖项发生变化时，useMemo才会重新计算结果，否则会返回缓存的结果

  useEffect(() => {
    setInterval(() => {
      // 这里setNum的调用会导致Bbb组件的重新渲染 但是memo useMemo useCallback的使用可以避免这种不必要的重新渲染
      setNum(num => num + 1)
    }, 2000);
  }, [])
  
  return (
    <>
      {/* <MemoBbb count={count}  callbackFn={callbackFn}/> */}
      {/* <MemoBbb count={count}  callbackFn={callbackMemoFn}/> */}
      <MemoBbb count={memoCount}  callbackFn={callbackMemoFn}/>
    </>
  )
}

export default App

/**
 * memo 必须搭配useMemo useCallback使用 否则无法避免不必要的重新渲染
 * 只使用useMemo useCallback也是没有意义的 因为不管 props 变没变都会重新渲染，只是做了无用功。
 */
