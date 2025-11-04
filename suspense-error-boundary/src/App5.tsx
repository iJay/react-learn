import { Suspense } from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"

let data, promise

function fetchData () {
  if ( data ) return data
  promise = new Promise((resolve) => {
    setTimeout(() => {
      data = '收到的数据'
      resolve(data)
    }, 2000)
  })
  // throw promise // throw promise 没有触发包裹的ErrorBoundary
  // 这里改成throw一个error 看看Suspense和ErrorBoundary是否冲突
  throw Error('抛出一个错误："XXX", 被ErrorBoundary捕获到了！')
  // 所以这里 ErrorBoundary 和 Suspense 虽然都是捕获组件 throw 出的东西，但这俩互不相干，一个捕获 error，一个捕获 promise。
}

function Content () {
  const data = fetchData()
  return (
    <div>
      { data }
    </div>
  )
}

function fallbackRender({error}: FallbackProps) {
  return (
    <div>出错了， {error.message}</div>
  )
}

function App () {
  return (
    // 从这里可以看出 只要 throw 一个 promise，就会被最近的 Suspense 捕获
    // promise 初始状态展示 fallback，promise 
    // 由此可以看出 React.lazy 是不是也是基于这个实现的
    // React.lazy 包裹之后，也会 throw 一个 promise 来触发 Suspense,当 promise 改变状态后，再返回拿到的值
    // 这样也就是jotai为什么可以支持 Suspense
    // 业务开发中我们也不用Suspense实现loading效果 而是通过内部useState定义一个loading变量 如App6.tsx
    // 不过如果你用了一些支持 Suspense 的框架，比如 jotai、next.js 等，那也可以用 Suspense。
    // 框架内部给你做了 throw promise 的事情, 案例如App2.tsx
    // 其次React的hook use也可以实现类似的效果
    <Suspense fallback={'loading data'}>
      <ErrorBoundary fallbackRender={fallbackRender}>
        <Content />
      </ErrorBoundary>
    </Suspense>
  )
}

export default App
