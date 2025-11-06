// MutationObserver 监听对元素的属性的修改、对它的子节点的增删改
// 可以用到的场景：文章水印被人通过 devtools 去掉了，那么就可以通过 MutationObserver 监听这个变化，然后重新加上，让水印去不掉
import { useEffect } from 'react'
import './App.css'

function App () {

  useEffect(() => {
    setTimeout(() => {
      const box = document.getElementById('app2-box')!
      box.style.background = 'red'
    },2000)
  } ,[])

  useEffect(() => {
    setTimeout(() => {
      const dom = document.createElement('button')
      const box = document.getElementById('app2-box')!
      dom.textContent = '东东东'
      box.appendChild(dom)
    },3000)
  })

  useEffect(() => {
    setTimeout(() => {
      document.querySelectorAll('button')[0].remove()
    },5000)
  }, [])

  useEffect(() => {
    const box = document.getElementById('app2-box')!
    // 创建一个 MutationObserver 对象，监听这个盒子的属性和子节点的变化
    const mutationObserver = new MutationObserver((mutationList) => {
      console.log(mutationList)
    })
    mutationObserver.observe(box, {
      childList: true,
      attributes: true,
    })
  }, [])

  return (
    <>
      <div id="app2-box"><button>光</button></div>
    </>
  )
}

export default App
