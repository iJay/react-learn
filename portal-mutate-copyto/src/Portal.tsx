import { useEffect, useImperativeHandle, useMemo, type PropsWithChildren } from "react"
import { createPortal } from "react-dom";

type PortalProps = PropsWithChildren<{
  attach?: HTMLElement | string;
  ref: React.Ref<HTMLElement>
}>

// 封装选择 attach 节点的逻辑
function getAttach (attach: PortalProps['attach']) {
  if (typeof attach === 'string') {
    return document.querySelector(attach)
  }
  if (typeof attach === 'object' && attach instanceof window.HTMLElement) {
    return attach
  }
  return document.body
}

function Portal (props: PortalProps) {
  const { attach, children, ref } = props

  // 创建一个容器元素
  const container = useMemo(() => {
    const el = document.createElement('div')
    el.className = 'portal-wrapper'
    return el
  }, [])

  // 将attach负载点和容器元素关联起来
  useEffect(() => {
    const parentElement = getAttach(attach)
    parentElement?.appendChild?.(container)
    return () => {
      parentElement?.removeChild?.(container)
    }
  }, [container, attach])

  // 返回容器暴露给调用者组件
  useImperativeHandle(ref, () => container)

  return createPortal(children, container)
}

export default Portal
