import type { PropsWithChildren } from "react"
import cs from 'classnames'
import './index.scss'

type BaseIconProps = PropsWithChildren<{
  className?: string;
  style?: React.CSSProperties;
  size?: string | string[];
  spin?: boolean;
  ref?: React.Ref<SVGAElement>
}>

export type IconProps = BaseIconProps & Omit<React.SVGAttributes<SVGElement>, keyof BaseIconProps>

function getSize(size: IconProps["size"]) {
  if (Array.isArray(size) && size.length === 2) {
    return size as string[]
  }

  const width = size as string || '1em'
  const height = size as string || '1em'

  return [width, height]
}

function Icon (props: IconProps) {
  const {
    style,
    className, 
    spin, 
    size = '1em',
    children,
    ref,
    ...rest
  } = props

  const cn = cs(
    'icon',
    {
      'icon-spin': spin
    },
    className
  )

  // 可以传 [10px, 10px] 分别指定宽高，也可以传 10px 来同时指定宽高
  const [width, height] = getSize(size)

  return (
    <svg ref={ref} style={style} className={cn} fill="currentColor" width={width} height={height} {...rest}>
      { children }
    </svg>
  )
}

export default Icon

