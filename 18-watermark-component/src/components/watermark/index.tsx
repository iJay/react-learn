import type { CSSProperties, PropsWithChildren } from "react"

interface WatermarkProps extends PropsWithChildren{
  style?: CSSProperties;  // 外部容器div样式
  className?: string; // 外部容器div class
  zIndex?: string | number; // 外部容器div 的z-index值
  getContainer?: HTMLElement; // 指定的外部容器div
  content?: string | string[]; // 指定的水印中的文字内容
  image?: string; // 指定的水印中绘制的图片
  width?: number; // 水印宽度
  height?: number; // 水印高度
  rotate?: number; // 绘制内容的旋转角度
  gap?: [number, number]; // 两个水印之间的空白距离
  offset?: [number, number]; // 水印对于外部容器的偏移量
  fontStyle?: { // canvas绘制的字体样式
    color?: string;
    fontFamily?: string;
    fontWeight?: number | string;
    fontSize?: number | string;
  }
}

function Watermark (props: WatermarkProps) {
  return(
    <div>
      { props.children }
    </div>
  )
}

export default Watermark
