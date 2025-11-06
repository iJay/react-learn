// ReportingObserver ReportingObserver 可以监听过时的 api、浏览器干预等报告等的打印，在回调里上报，这些是错误监听无法监听到但对了解网页运行情况很有用的数据

import { useEffect } from "react"

/**
 * 当浏览器运行到过时（deprecation）的 api 的时候，会在控制台打印一个过时的报告
 * 浏览器还会在一些情况下对网页行为做一些干预（intervention），比如会把占用 cpu 太多的广告的 iframe 删掉,如果我知道的话或许可以优化下 iframe
 * 会在网络比较慢的时候把图片替换为占位图片，点击才会加载, 如果我知道的话可能会优化下图片大小
 * 以上这些干预或者过时的 api 并不是报错，所以不能用错误监听的方式来拿到，但这些情况对网页 app 来说可能也是很重要的
 */
function App () {

  useEffect(() => {
    const reportingObserver = new ReportingObserver((reports) => {
      console.log(reports)
      for (const report of reports) {
        console.log('🟡 Deprecation:', report.type, report.body) // 上报
      }
    }, {types: ['intervention', 'deprecation']})
    reportingObserver.observe()

    const records = reportingObserver.takeRecords();
    console.log(records)

    // 使用废弃 API
    console.log(new Date().getYear()); // 会触发一个 deprecation 报告

    // 尝试在后台播放音频
    const audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3')
    audio.play().catch(err => console.warn('Autoplay blocked:', err))

  }, [])

  return (
    <>
      <div>ReportingObserver</div>
    </>
  )
}

export default App

