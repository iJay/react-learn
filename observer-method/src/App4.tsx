// PerformanceObserver 用于监听记录 performance 数据的行为，一旦记录了就会触发回调，这样我们就可以在回调里把这些数据上报，去做性能分析了

import { useEffect } from "react"

// performance 的 api 用于记录一些时间点、某个时间段、资源加载的耗时
function App () {

  function measureClick () {
    performance.measure('button clicked')
  }

  useEffect(() => {
    const performanceObserver = new PerformanceObserver(list => {
      list.getEntries().forEach(entry => {
        console.log(entry) // 上报
        // if (entry.name === 'Mount') {
        //   console.log('Mount 来源：', entry);
        // }
      })
    })

    performanceObserver!.observe({
      // 监听 mark（时间点）、measure（时间段）、resource（资源加载耗时） 这三种记录时间的行为
      entryTypes: ['resource', 'mark', 'measure']
    })

    performance.mark('registered-observer')

  }, [])
  return (
    <>
      <button onClick={measureClick}>Measure</button>
      <img src="https://p9-passport.byteacctimg.com/img/user-avatar/4e9e751e2b32fb8afbbf559a296ccbf2~300x300.image" />
    </>
  )
}

export default App
