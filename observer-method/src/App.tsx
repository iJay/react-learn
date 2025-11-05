// IntersectionObserver
// 监听一个元素和可视区域相交部分的比例，然后在可视比例达到某个阈值的时候触发回调
import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    const intersectionObserver = new IntersectionObserver(
      function (entries) {
          console.log('info:');
          entries.forEach(item => {
              console.log(item.target, item.intersectionRatio)
          })
      }, {
      threshold: 0.5
  });
  // 元素 box1 和 box2 在可视范围达到一半（0.5）和全部（1）的时候分别触发了回调
  intersectionObserver.observe(document.querySelector('#box1')!);
  intersectionObserver.observe(document.querySelector('#box2')!);
  
  }, [])
  return (
    <>
      <div id="box1">BOX111</div>
      <div id="box2">BOX222</div>
    </>
  )
}

export default App
