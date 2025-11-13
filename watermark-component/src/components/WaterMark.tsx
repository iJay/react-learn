import type React from "react"
import { useCallback, useEffect, useRef, type PropsWithChildren } from "react"
import useWatermark from "../hooks/useWatermark";

export type FontStyleProps = {
  fontFamily?: string;
  fontSize?: number | string;
  fontWeight?: number | string;
  color?: string,
}

// 水印组件
export interface WatermarkProps extends PropsWithChildren {
  style?: React.CSSProperties
  className?: string
  width?: number
  height?: number
  content?: string
  image?: string
  rotate?: number
  fontStyle?: FontStyleProps
  gap?: [number, number] // 两个水印之间的空白距离
  offset?: [number, number] // 水印相对于 container 容器的偏移量，也就是左上角的空白距离
  zIndex?: number | string
  getContainer?: () => HTMLElement
}

function WaterMark (props: WatermarkProps) {
  const {
    width,
    height,
    content,
    image,
    rotate,
    fontStyle,
    gap,
    offset,
    style,
    className,
    getContainer,
    children,
    zIndex
  } = props

  const containerRef = useRef<HTMLElement>(null)

  const getContainerInner = useCallback(() => {
    return getContainer ? getContainer() : containerRef.current
  }, [getContainer])

  const { generateWatermark } = useWatermark({
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    fontStyle,
    gap,
    offset,
    getContainer,
  })

  useEffect(() => {
    generateWatermark({
      zIndex,
      width,
      height,
      rotate,
      image,
      content,
      fontStyle,
      gap,
      offset,
      getContainer,
    })
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(fontStyle),
    JSON.stringify(gap),
    JSON.stringify(offset),
    getContainer,
  ]) // 对象参数（fontSize）、数组参数（gap、offset）用 JSON.stringify 序列化后再放到 deps 数组里 原因？？？

  return (
    <div
      className={className}
      style={style}
      ref={containerRef}
    >
      { children }
    </div>
  )
}

export default WaterMark
