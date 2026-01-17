import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"

interface MyLazyLoadProps {
  className?: string;
  style?: CSSProperties,
  placeholder?: ReactNode,
  offset?: string | number
  width?: number | string,
  height?: number | string,
  onContentVisible?: () => void,
  children: ReactNode
}

function MyLazyLoad (props: MyLazyLoadProps) {
  const { 
    className = '',
    style,
    offset = 0,
    width,
    onContentVisible,
    placeholder,
    height,
    children
  } = props

  const containerRef = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(false)

  const styles = { height, width, ...style }

  const elementObserver = useRef<IntersectionObserver>(null)

  function lazyLoadHandler (entries: IntersectionObserverEntry[]) {
    const [ entry ] = entries
    const { isIntersecting } = entry

    // 当 isIntersecting 为 true 的时候，就是从不相交到相交，反之，是从相交到不相交。
    if (isIntersecting) {
      setVisible(true)
      onContentVisible?.()

      const node = containerRef.current
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node)
      }
    }
  }

  useEffect(() => {
    const options = {
      rootMargin: typeof offset === 'number' ? `${offset}px` : offset || '0px',
      threshold: 0 // 一进入可视区域就触发
    }

    elementObserver.current = new IntersectionObserver(lazyLoadHandler, options)

    const node = containerRef.current

    if (node instanceof HTMLElement) {
      elementObserver.current.observe(node)
    }

    return () => {
      if (node && node instanceof HTMLElement) {
        elementObserver.current?.unobserve(node)
      }
    }

  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={styles}
    >
      {
        visible ? children : placeholder
      }
    </div>
  )
}

export default MyLazyLoad
