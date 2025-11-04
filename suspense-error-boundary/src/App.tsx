import { lazy, Suspense } from 'react'
import './App.css'

const LazyAaa = lazy(() => import('./Aaa'))

function App() {

  return (
    <>
      <div className="card">
        {/* Sespense的fallback后跟着一个异步组件，当异步组件加载时，会显示fallback的内容，当异步组件加载完成后，会显示异步组件的内容。 */}
        {/* 大多数场景下，Suspense 就专门和 lazy 搭配使用的 */}
        {/* 但是有时候Sespense不搭配Lazy也可以，比如App2的代码： */}
        {/* 它的底层原理就是 throw 一个 promise，然后 React 会捕获这个 promise，交给最近的 Suspense 组件来处理 */}
        <Suspense fallback={'loading...'}>
          <LazyAaa />
        </Suspense>
      </div>
    </>
  )
}

export default App
