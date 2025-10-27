import { memo, useEffect, useState } from "react"

interface BbbProps {
  count: number
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

  useEffect(() => {
    setInterval(() => {
      // 这里setNum的调用会导致Bbb组件的重新渲染
      setNum(num => num + 1)
    }, 2000);
  }, [])
  
  return (
    <>
      {/* 应该避免不必要的重新渲染，比如这里Bbb组件的count属性没有变化，但是因为setNum的调用会导致Bbb组件的重新渲染， 使用memo来避免不必要的重新渲染 */}
      {/* <Bbb count={2} /> */}
      <MemoBbb count={2} />
    </>
  )
}

export default App
