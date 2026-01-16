import { useRef, type MouseEventHandler } from "react"

function App () {
  const ref = useRef<HTMLDivElement>(null)

  const clickHandler: MouseEventHandler<HTMLDivElement> = () => {
    // 获取元素的滚动距离使用ele.scrollTop
    console.log(ref.current?.scrollTop)
  }

  return (
    <div>
      <div id="box" ref={ref} style={{
        marginTop: '800px',
        width: '100px',
        height: '100px',
        background: 'ping',
        overflow: 'auto'
      }} onClick={clickHandler}>
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
