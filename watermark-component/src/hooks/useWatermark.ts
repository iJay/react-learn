// useWatermark 绘制水印
import { useEffect, useRef, useState } from 'react'
import type { WatermarkProps } from '../components/WaterMark'
import { merge } from 'lodash-es'


function measureTextSize (ctx: CanvasRenderingContext2D, content: string[], rotate: number) {}

function getCanvasData = async (options: Required<WatermarkOptions>) => {
  const {
    rotate,
    image,
    content,
    fontStyle,
    gap
  } = options
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const radio = window.devicePixelRatio

  const canvasConfig = (size: {width: number, height: number}) => {
    const canvasWidth = gap[0] = size.width
    const canvasHeight = gap[1] = size.height

    canvas.setAttribute('width', `${canvasWidth * radio}px`)
    canvas.setAttribute('height', `${canvasHeight * radio}px`)
    canvas.style.width = `${canvasWidth}px`
    canvas.style.height = `${canvasHeight}px`
    
    
    ctx.translate((canvasWidth * radio) / 2, (canvasHeight * radio) / 2)
    ctx.scale(radio, radio)

    const rotateAngle = (rotate * Math.PI) / 180
    ctx.rotate(rotateAngle)
  }

  const drawText = () => {
    const { fontSize, color, fontFamily, fontWeight } = fontStyle
    const measureSize = measureTextSize(ctx, [...content], rotate)

    const width = options.width || measureSize.width
    const height = options.height || measureSize.height

    ctx.fillStyle = color
    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`
    ctx.textBaseline = 'top'

    [...content].forEach((item, index) => {
      const [height: lineHeight, width: lineWidth] = measureSize.lineSize[index]

      const xStartPoint = -lineWidth / 2
      const yStartPoint = -(options.height || measureSize.height) / 2 + lineHeight * index

      ctx.fillText(
        item,
        xStartPoint,
        yStartPoint,
        options.width || measureSize.originWidth,
      )
    });

    return Promise.resolve({ base64Url: canvas.toDataURL(), width, height })
  }
  const drawImage = () => {
    return new Promise<{width: number, height: number, base64Url: string}>((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous' // 跨域请求时候不携带 cookie
      img.referrerPolicy = 'no-referrer' // 不发送 referrer
      img.onload = () => {
        let { width, height } = options
        if (!width || !height) {
          if (width) {
            height = (img.height / img.width) * +width // 根据宽度计算高度 * +是????
          } else {
            width = (img.width / img.height) * + height // 根据高度计算宽度
          }
        }
        canvasConfig({ width, height })

        ctx.drawImage(img, -width / 2, -height / 2, width, height)
        return resolve({ base64Url: canvas.toDataURL(), width, height })
      }
      img.onerror = () => {
        return drawText()
      }
    })
  }

  return image ? drawImage() : drawText()
}

export type WatermarkOptions = Omit<WatermarkProps, 'className' | 'style' | 'children'>

function useWatermark (params: WatermarkOptions) {

  const [options, setOptions] = useState(params || {})

  const watermarkDiv = useRef<HTMLDivElement>(null)

  const container = params.getContainer?.()

  function drawWatermark () {
    if (!container) return

  }

  useEffect(() => {
    drawWatermark()
  }, [options])

  return {
    generateWatermark: (newOptions: Partial<WatermarkOptions>) => {
      setOptions(merge({}, options, newOptions))
    },
    destory: () => {}
  }
}


export default useWatermark
