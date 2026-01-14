import { useCallback, useEffect, useRef, type CSSProperties, type PropsWithChildren } from "react"
import useWatermark from "../../hooks/useWatermark";

export interface WatermarkProps extends PropsWithChildren{
  style?: CSSProperties;  // 外部容器div样式
  className?: string; // 外部容器div class
  zIndex?: string | number; // 外部容器div 的z-index值
  getContainer?: () => HTMLElement; // 指定的外部容器div
  content?: string | string[]; // 指定的水印中的文字内容
  image?: string; // 指定的水印中绘制的图片
  width?: number; // 水印宽度
  height?: number; // 水印高度
  rotate?: number; // 绘制水印内容的旋转角度
  gap?: [number, number]; // 绘制水印内容之间的空白距离
  offset?: [number, number]; // 绘制水印内容对于外部容器的偏移量
  fontStyle?: { // canvas绘制的字体样式
    color?: string;
    fontFamily?: string;
    fontWeight?: number | string;
    fontSize?: number | string;
  }
}

function Watermark (props: WatermarkProps) {
  const { 
    className,
    style,
    zIndex,
    image,
    content,
    width,
    height,
    rotate,
    gap,
    offset,
    fontStyle
 } = props
  const containerRef = useRef<HTMLDivElement>(null)

  const getContainer = useCallback(() => {
    return props.getContainer ? props.getContainer() : containerRef.current!
  }, [containerRef.current, props.getContainer])

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
    getContainer
  })

  useEffect(() => {
    generateWatermark(
      {
        zIndex,
        width,
        height,
        rotate,
        image,
        content,
        fontStyle,
        gap,
        offset,
        getContainer
      }
    )
  }, [
    zIndex,
    width,
    height,
    rotate,
    image,
    content,
    JSON.stringify(props.fontStyle),
    JSON.stringify(props.gap),
    JSON.stringify(props.offset),
    getContainer,
  ])

  return(
    props.children ? <div
      className={className}
      style={style}
      ref={containerRef}
    >
      { props.children }
    </div>
    :
    null
  )
}

export default Watermark
