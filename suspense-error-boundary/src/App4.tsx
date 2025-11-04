import { useEffect } from "react";
import { ErrorBoundary, type FallbackProps } from "react-error-boundary";

function Bbb () {

  useEffect(() => {
    throw Error('测试主动抛出错误"xxx"')
  }, [])

  return (
    <div>Bbb</div>
  )
}

function Aaa () {
  const b = window.a.b
  return (
    <>
      <span>{ b }</span>
      <Bbb></Bbb>
    </>
  )
}

function App () {
  function fallbackRender ({error}: FallbackProps) {
    return (
      <div>
        <p>出错了：{ error.message }</p>
      </div>
    )
  }
  return (
    // ErrorBoundary 生效了 并不一定是 ErrorBoundary 的 children，任意层级的子组件抛出的错误都可以捕获到
    // 组件抛错的时候，会向上寻找最近的 ErrorBoundary 组件
    <ErrorBoundary fallbackRender={fallbackRender}>
      <Aaa></Aaa>
    </ErrorBoundary>
  )
}

export default App
