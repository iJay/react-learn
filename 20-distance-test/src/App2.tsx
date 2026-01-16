import { useEffect, useRef } from "react"

function App () {
  const ref = useRef<HTMLDivElement>(null)


  function getTotalOffsetTop (element: HTMLElement) {
    let totalOffsetTop = 0
    while (element) {
      if (totalOffsetTop > 0) {
        // 这里大于零是为了排除最初的element元素本身的border值
        totalOffsetTop += element.clientTop
      }
      totalOffsetTop += element.offsetTop
      // offsetTop 相对于哪个元素，哪个元素就是 offsetParent
      element = element.offsetParent as HTMLDivElement
    }
    return totalOffsetTop
  }

  useEffect(() => {
    // 是距离最近的有 position 属性（relative 或 absolute 或 fixed）的元素内边距边缘的距离
    console.log('offsetTop', ref.current?.offsetTop)
    // clientTop是上边框的高度
    console.log('clientTop', ref.current?.clientTop)

    console.log('total offsetTop', getTotalOffsetTop(ref.current!))
  }, [])

  return (
    <div>
      <div style={
        {
          position: 'relative', // 这里如果注释掉，那么就是相对于body的距离了
          margin: '100px',
          padding: '200px',
          border: '1px solid blue'
        }
      }>
        <div id="box" ref={ref} style={{
          border: '20px solid #000',
          width: '100px',
          height: '100px',
          background: 'pink',
        }}>
        </div>
      </div>
    </div>
  )
}

export default App
