import { useEffect, useRef, useState } from "react"

function App () {
  const containerRef = useRef(null)
  const [ className, setClassName ] = useState('aaa')

  useEffect(() => {
    setTimeout(() => {
      setClassName('bbb')
    }, 2000)
  }, [])

  useEffect(() => {
    const targetEle = containerRef.current!

    const callback = (mutationsList: MutationRecord[]) => {
      console.log(mutationsList)
    }

    const observer = new MutationObserver(callback)

    observer.observe(targetEle, {
      attributes: true, // 监听属性变化
      childList: true, // 监听 children 变化
      subtree: true // 连带子节点的属性、children变化也监听
      // attributeFilter 指定监听哪些属性的变化
    })

  }, [])

  return (
    <div>
        <div id="container" ref={containerRef}>
          <div className={className}>
            {
              className === 'aaa' ? <div>aaa</div> : <div>
                <p>bbb</p>
              </div>
            }
          </div>
        </div>
    </div>
  )
}

export default App
