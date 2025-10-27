import { useCallback, useEffect, useLayoutEffect, useRef } from "react"

function useInterval(fn: Function, delay: number | null) {
  const funcRef = useRef(fn)

  let cleanFnRef = useRef<Function>()

  const cleanFn = useCallback(() => { //因为这个返回的函数可能作为参数传入别的组件，这样用 useCallback 包裹就可以避免该参数的变化
    cleanFnRef.current?.()
  }, [])
  
  useLayoutEffect(() => {
    // 这里在 useLayoutEffect 里更新 ref.current 的值，它是在 dom 操作完之后同步执行的，比 useEffect 更早
    funcRef.current = fn
    // 虽然官方文档不建议写入或者读取ref.current,初始化出外，因为会让组件行为不可预测
    // 但是像ahooks中很多源码实现里都用了这种方式
  })

  useEffect(() => {
    const timer = setInterval(() => {
      funcRef.current()
    }, delay || 0)
    cleanFnRef.current = () => {
      clearInterval(timer)
    }
    return cleanFn
  }, [delay])

  return cleanFn
}

export default useInterval