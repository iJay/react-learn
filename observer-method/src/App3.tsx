// ResizeObserver 元素可以用 ResizeObserver 监听大小的改变，当 width、height 被修改时会触发回调
import { useEffect } from 'react'
import './App.css'

function App () {
  useEffect(() => {
    const box = document.getElementById('app3-box')!
    setTimeout(() => {
      box.style.width = '200px'
    }, 3000)
  }, [])

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      console.log('当前大小：', entries)
    })
    const box = document.getElementById('app3-box')!
    resizeObserver.observe(box)
  }, [])

  return (
    <div id="app3-box"></div>
  )
}

export default App
