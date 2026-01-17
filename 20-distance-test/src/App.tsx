import { useEffect, useRef, type MouseEventHandler } from 'react'
import './App.css'

function App() {
  const ref = useRef<HTMLDivElement>(null)

  const clickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    console.log('react click pageY', e.pageY) // 点击的位置到文档顶部的距离
    console.log('react click clientY', e.clientY) // 点击的位置到可视区域顶部的距离
    // React合成事件对象不存在offsetY属性
    console.log('react click offsetY', e.offsetY) // 点击位置到触发事件的元素内边距（Padding）边缘的垂直距离
    console.log('react click screenY', e.screenY) // 点击位置到到屏幕顶部的距离

    // 这里的domRect是包含整个元素的最小矩形（包括 padding 和 border-width）
    const domRect = document.getElementById('box')!.getBoundingClientRect()
    const top = domRect.top
    // 除了 width 和 height 以外的属性(x,y,top,left)都是相对于视图窗口的左上角来计算的
    console.log('box domRect top:', top)
    console.log('box domRect left:', domRect.left)
    console.log('box domRect x:', domRect.x)
    console.log('box domRect y:', domRect.y)
    console.log('box domRect width:', domRect.width)
    console.log('box domRect height:', domRect.height)
    // 这里的window.scrooY是窗口的滚动距离，可以换做window.pageYOffset, 但后者过时了
    console.log('react click offsetY', e.pageY - top - window.scrollY) 
  }

  useEffect(() => {
    document.getElementById('box')!.addEventListener('click', (e) => {
      console.log('native click pageY', e.pageY)
      console.log('native click clientY', e.clientY)
      console.log('native click offsetY', e.offsetY)
      console.log('native click screenY', e.screenY)
    })
  }, [])

  return (
    <div>
      <div id="box" ref={ref} style={{
        marginTop: '800px',
        width: '100px',
        height: '100px',
        background: 'blue',
        border: '10px solid #ccc'
      }} onClick={clickHandler}></div>
    </div>
  )
}

export default App
