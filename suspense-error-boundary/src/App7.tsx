// use的使用
/**
 * 当 promise 在 pending 的时候，展示 suspense 的 fallback。

  当 promise 是 resolve 的时候，展示 Suspense 的子组件。

  当 promise 是 reject 的时候，展示 ErrorBoundary 的 fallback
 */
import { createContext, Suspense, use, type ReactNode } from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"

function fetchData () {
  return new Promise<Array<number>>((resolve) => {
    setTimeout(() => {
      resolve([1,2,3,4,5,6,7,8,9,10])
    }, 1000)
  })
}

interface MyListPropsType {
  fetchDataPromise: Promise<Array<number>>
}

function MyList (props: MyListPropsType) {
  // 这里use除了读取Promise 还可以读取context 代替useContext。
  const theme = use(ThemeContext)
  // use的灵活性体现在 use 可以在条件语句如 if 和循环如 for 内调用，useContext 必须在组件的顶层调用
  const list = use(props.fetchDataPromise)
  // 这里console输出是为了验证触发错误边界的报错!!! 
  // console.log(window.a.b)
  return (
    <>
      <ul style={{ 'background': theme === 'dark' ? '#111': '#ccc' }}>
          {
            list.map(item => {
              return (
                <li style={{ color: theme === 'dark' ? '#fff' : '#000' }}>商品 { item }</li>
              )
            })
          }
        </ul>
    </>
  )
}

const ThemeContext = createContext<string>('light')

function App () {

  function loadData () {
    return fetchData()
  }

  function handleErrorFallback ({ error }: FallbackProps): ReactNode {
    return (
      <div>
        <span>出错了，{ error.message }</span>
      </div>
    )
  }
  return (
    <ThemeContext value={'dark'}>
    {/* 如果传递给 use 的 Promise 被拒绝，将显示最近错误边界的后备 UI。 */}
      <ErrorBoundary FallbackComponent={handleErrorFallback}>
      {/* use 的 Promise 处于 pending 时，调用 use 的组件也会 挂起。如果调用 use 的组件被包装在 Suspense 边界内，将显示后备 UI。 */}
        <Suspense fallback={<span>数据加载ing...</span>}>
        {/* use 的 Promise 被解决，Suspense 后备方案将被使用 use API 返回的数据替换 */}
          <MyList fetchDataPromise={loadData()} />
        </Suspense>
      </ErrorBoundary>
    </ThemeContext>
  )
}

export default App
