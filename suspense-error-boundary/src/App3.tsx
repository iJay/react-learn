/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from 'react'

function Bbb () {
  const b = window.a.b
  return (
    <div>Bbb: {b}</div>
  )
}

// 注意：ErrorBoundary 只能是 class 组件的形式
class ErrorBoundary extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      hasError: false
    } as any
  }

  static getDerivedStateFromError(error) {
    // 接收错误修改state触发重新渲染，渲染出错误对应的 UI
    return { hasError: true, message: error.message }
  }

  componentDidCatch(error: Error, serrorInfo: any) {
    // 拿到错误信息，打印日志
    console.log(error, serrorInfo)
  }

  render () {
    if ((this.state as any).hasError as boolean) {
      return <div>Error: {(this.state as any)?.message}</div>
    }
    return (this.props as any)?.children
  }
}

function App () {
  return (
    // 如果这里ErrorBoundary组件去掉 
    // 所以ErrorBoundary的作用，就是捕获子组件抛出的错误，显示对应的 UI
    <ErrorBoundary>
      <Bbb />
    </ErrorBoundary>
  )
}

 export default App
