import classNames from "classnames"
import React, { useContext, useMemo } from "react"
import './index.scss' 
import { ConfigContext } from "./ConfigProvider"

type SizeType = 'small' | 'middle' | 'large' | number | undefined

interface SpaceProps extends React.HTMLAttributes<HTMLDivElement> {
  style?: React.CSSProperties;
  className?: string;
  size?: SizeType | [SizeType, SizeType];
  direction?: 'horizontal' | 'vertical';
  align?: 'start' | 'end' | 'center' | 'baseline';
  split?: React.ReactNode | undefined;
  children?: React.ReactNode | undefined;
  wrap?: boolean
}

const spaceSize = {
  small: 8,
  middle: 16,
  large: 24,
}

function getSizeNumber(size: SizeType) {
  return typeof size === 'string' ? spaceSize[size] : size || 0
}

function Space (props: SpaceProps) {
  const { space } = useContext(ConfigContext)

  const {
    children,
    style,
    className,
    direction = 'horizontal',
    align,
    size = space?.size || 'small', // 默认上下文传入 或者 small
    wrap = false,
    split
  } = props

  // 解决chidlren
  const flatNodes = React.Children.toArray(children)
  const childrenNodes = flatNodes.map((child: any, i: number) => {
    const key = child && child.key || `space-item-${i}`
    return (
      <>
        <div className='space-item' key={key}>
          {child}
        </div>
        {
          split && (
            <span className={`${className}-split`} style={style}>
              {split}
            </span>
          )
        }
      </>
    )
  })

  // className 
  const mergedAlign = align === undefined ? 'center' : align
  const cn = classNames(
    'space',
    `space-${direction}`,
    {
      [`space-align-${mergedAlign}`]: mergedAlign
    },
    className,
  )

  // style
  const otherStyles: React.CSSProperties = {}

  const [horizontalSize, verticalSize] = useMemo(() => {
    return (Array.isArray(size) ? size : [size, size]).map(item => {
      return getSizeNumber(item)
    })
  }, [size])
  console.log(horizontalSize, verticalSize)
  otherStyles.columnGap = horizontalSize
  otherStyles.rowGap = verticalSize

  // 处理wrap
  if (wrap) {
    otherStyles.flexWrap = 'wrap'
  }
  console.log('otherStyles', otherStyles)
  return (
    <div
      className={cn}
      style={
        {
          ...style,
          ...otherStyles
        }
      }
    >
      { childrenNodes }
    </div>
  )
}

export default Space