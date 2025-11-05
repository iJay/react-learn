import { useEffect } from "react"

const defaultOptions: MutationObserverInit = {
  subtree: true,
  childList: true,
  attributeFilter: ['style', 'class']
}

function useMutateObserver (
  targetEles: HTMLElement | HTMLElement[],
  callback: MutationCallback,
  options: MutationObserverInit = defaultOptions
) {
  useEffect(() => {
    if (!targetEles) return
    const target = Array.isArray(targetEles) ? targetEles : [ targetEles ]

    let observer: MutationObserver

    if ('MutationObserver' in  window) {
      observer = new MutationObserver(callback)

      target.forEach((ele) => {
        observer.observe(ele, options)
      })
    }

    return () => {
      // 清理操作
      observer.takeRecords() // 在销毁的时候，调用 takeRecords 删掉所有剩余通知
      observer.disconnect() // 调用 disconnect 停止接收新的通知
    }

  }, [options, targetEles])
}

export default useMutateObserver
