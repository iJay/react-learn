import { useRef, type MouseEventHandler } from "react"

function App () {
  const ref = useRef<HTMLDivElement>(null)

  const clickHandler: MouseEventHandler<HTMLDivElement> = () => {
    console.log('clentHeight', ref.current?.clientHeight) // 元素内容高度 不包含border
    console.log('scrollHeight', ref.current?.scrollHeight) // 元素滚动区域的总高度
    console.log('offsetHeight', ref.current?.offsetHeight) // 元素高度 包含border
    console.log('clent rect height', ref.current?.getBoundingClientRect().height) // 包围盒的高度
  }

  return (
    <div>
      <div
        id="box"
        ref={ref}
        style={{
          border: '10px solid #000',
          marginTop: '300px',
          width: '100px',
          height: '100px',
          background: 'pink',
          overflow: 'auto',
          // transform: 'rotate(45deg)' // 这里旋转之后ref.current?.getBoundingClientRect().height 与 ref.current?.offsetHeight就不再相等了
        }} 
        onClick={clickHandler}
      >
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
        <div>xxxxx</div>
      </div>
    </div>
  )
}

export default App
