import { useEffect, useRef, useState } from "react"
import type { WatermarkProps } from "../components/watermark"
import { merge } from "lodash-es"
import { mergeNumberVal } from "../utils/indx"

type WatermarkOptions = Omit<WatermarkProps, 'className' | 'style' | 'children'>

const defaultOptions = {
  rotate: -20,
  zIndex: 1,
  width: 100,
  gap: [100, 100],
  fontStyle: {
    fontSize: '16px',
    color: 'rgba(0, 0, 0, 0.15)',
    fontFamily: 'sans-serif',
    fontWeight: 'normal'
  },
  getContainer: () => document.body
}

const getMergedOptionsWithDefaultVal = (opt: Partial<WatermarkOptions>) => {
  const options = opt || {}
  const mergedOptions = {
    ...options,
    rotate: options.rotate || defaultOptions.rotate,
    zIndex: options.zIndex || defaultOptions.zIndex,
    fontStyle: { ...defaultOptions.fontStyle, ...options.fontStyle },
    width: mergeNumberVal(options?.width, options.image ? defaultOptions.width : undefined),
    height: mergeNumberVal(options.height, undefined)!,
    getContainer: options.getContainer!,
    gap: [
      mergeNumberVal(options.gap?.[0], defaultOptions.gap[0]),
      mergeNumberVal(options.gap?.[1], defaultOptions.gap[1])
    ],
  } as Required<WatermarkOptions>
  const mergedOffsetX = mergeNumberVal(mergedOptions.offset?.[0], 0)!
  const mergedOffsetY = mergeNumberVal(mergedOptions.offset?.[1] || mergedOptions.offset?.[0], 0)!
  mergedOptions.offset = [mergedOffsetX, mergedOffsetY]
  return mergedOptions
}

async function getCanvasData (options: Required<WatermarkOptions>): Promise<{ width: number, height: number, base64Url: string}> {
  const {
    rotate,
    image,
    content,
    fontStyle,
    gap
  } = options
  console.log(content)
  // cavans构建画笔和上下文
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  // 获取当前屏幕分辨率
  const radio = window.devicePixelRatio

  // 测量绘制文字的尺寸
  const measureTextSize = (
    ctx: CanvasRenderingContext2D,
    content: string[],
    rotate: number
  ) => {
    let width = 0
    let height = 0
    const lineSize: Array<{ width: number, height: number}> = []
    content.forEach((item) => {
      const {
        width: textWidth,
        fontBoundingBoxAscent, // baseline 到顶部的距离
        fontBoundingBoxDescent // baseline 到底部的距离
      } = context.measureText(item)
      const textHeight = fontBoundingBoxAscent + fontBoundingBoxDescent // 加起来就是行高

      if (textWidth > width) {
        width = textWidth
      }

      height += textHeight
      lineSize.push({ height: textHeight, width: textWidth })
    })

    const angle = (rotate * Math.PI) / 180

    return {
      originWidth: width,
      originHeight: height,
      // 有旋转的话，要用 sin、cos 函数算出旋转后的宽高
      width: Math.ceil(Math.abs(Math.sin(angle) * height) + Math.abs(Math.cos(angle) * width)),
      height: Math.ceil(Math.abs(Math.sin(angle) * width) + Math.abs(height * Math.cos(angle))),
      lineSize,
    }
  }

  // 设置 canvas 的宽高、rotate、scale
  const configCanvas = (size: { width: number, height: number}) => {
    const canvasWidth = gap[0] + size.width
    const canvasHeight = gap[1] + size.height

    // 因为不同屏幕的设备像素比不一样，也就是 1px 对应的物理像素不一样，所以要在单位后面乘以 devicePixelRatio
    canvas.setAttribute('width', `${canvasWidth * radio}px`)
    canvas.setAttribute('height', `${canvasHeight * radio}px`)
    canvas.style.width = `${canvasWidth}`
    canvas.style.height = `${canvasHeight}`

    context?.translate((canvasWidth * radio) / 2, (canvasHeight * radio) / 2)
    context?.scale(radio, radio)

    const rotateAngle = (rotate * Math.PI) / 180
    context?.rotate(rotateAngle)
  }

  // 绘制文字
  const drawText = () => {
    const { fontSize, fontWeight, fontFamily, color } = fontStyle
    const realFontsize = mergeNumberVal(fontSize, 0) 
    context.font = `${fontWeight} ${realFontsize}px ${fontFamily}`

    // 没有传入width或者height就自己计算
    const measureSize = measureTextSize(context, [...content], rotate)

    const width = options.width || measureSize.width
    const height = options.height || measureSize.height
    configCanvas({ width, height })

    context.fillStyle = color!
    context.font = `${fontWeight} ${realFontsize}px ${fontFamily}`
    context.textBaseline = 'top' as CanvasTextBaseline // 顶部对齐

    [...content].forEach((item, index) => {
      const { height: lineHeight, width: lineWidth } = measureSize.lineSize[index]
      const xStartPoint = -lineWidth / 2
      const yStartPoint = -(options.height || measureSize.originHeight) / 2 + lineHeight * index // TODO:???

      context?.fillText(
        item,
        xStartPoint,
        yStartPoint,
        options.width || measureSize.originWidth
      )
    })
    return Promise.resolve({ base64Url: canvas.toDataURL(), width, height })
  }

  // 绘制图片
  const drawImage = () => {
    return new Promise<{ width: number, height: number, base64Url: string}>((resolve) => {
      const imgEle = new Image()
      imgEle.crossOrigin = 'anonymous' // 跨域的时候不携带 cookie
      imgEle.referrerPolicy = 'no-referrer' // 不携带 referer

      imgEle.src = image
      imgEle.onload = () => {
        let { width, height } = options
        if (!width || !height) {
          if (width) {
            // 等比例缩放（保持纵横比）计算公式
            // 这里的+width 中一元运算符+的作用把 width 强制转成 Number 类型
            // 确保参与运算的是数字 等同于 Number(width)
            // * +width按新的目标宽度缩放
            height = (imgEle.height / imgEle.width) * +width
          } else {
            width = (imgEle.width / imgEle.height) * +height
          }
        }
        configCanvas({ width, height })
        // -width / 2 源 image 的左上角在目标画布上 X 轴坐标
        // -height / 2 源 image 的左上角在目标画布上 Y 轴坐标
        context?.drawImage(imgEle, -width / 2, -height / 2, width, height)
        return resolve({ base64Url: canvas.toDataURL(), width, height})
      }
      imgEle.onerror = () => {
        // 图片加载失败的时候 转为绘制文字
        return drawText()
      }
    })
  }

  return image ? drawImage() : drawText()
}

function useWatermark (params: WatermarkOptions) {

  const [options, setOptions] = useState(params || {})

  const mergedOptions = getMergedOptionsWithDefaultVal(options)

  const { zIndex, gap } = mergedOptions

  const container = mergedOptions.getContainer!()

  // watermarkDiv保存水印元素dom
  const watermarkDiv = useRef<HTMLDivElement>(null)

  // 设置一个Observer监听器 监听水印元素删除
  const mutationObserver = useRef<MutationObserver>(null)

  function drawWatermark  () {
    if (!container) return

    // getCanvasData方法绘制背景图
    getCanvasData(mergedOptions).then(({base64Url, width, height}) => {
      const offsetTop = mergedOptions.offset[0] + 'px'
      const offsetLeft = mergedOptions.offset[1] + 'px'
      const watermarkStyle = `
      width: calc(100% - ${offsetLeft});
      height: calc(100% - ${offsetTop});
      position: absolute;
      top: ${offsetTop};
      left: ${offsetLeft};
      right: 0;
      bottom: 0;
      background-image: url(${base64Url});
      background-repeat: repeat;
      background-size: ${gap[0] + width}px ${gap[1] + height}px;
      background-position: 0 0;
      z-index: ${zIndex};
      pointer-events: none;
      `
      if (!watermarkDiv.current) {
        const div = document.createElement('div')
        watermarkDiv.current = div
        container.append(div)
        container.style.position = 'relative'
      }
  
      watermarkDiv.current?.setAttribute('style', watermarkStyle.trim())

      if (container) {
        mutationObserver.current?.disconnect()
        mutationObserver.current = new MutationObserver((mutation) => {
          const isChanged = mutation.some((mutation) => {
            let flag = false
            if (mutation.removedNodes.length) {
              flag = Array.from(mutation.removedNodes).some((node) => node === watermarkDiv.current)
            }
            if (mutation.type === 'attributes' && mutation.target === watermarkDiv.current) {
              flag = true
            }
            return flag
          })
          if (isChanged) {
            watermarkDiv.current = null
            drawWatermark()
          }
        })
        mutationObserver.current.observe(container, {
          attributes: true,
          subtree: true,
          childList: true
        })
      }
    })
  }

  useEffect(() => {
    drawWatermark()
  }, [options])

  return {
    generateWatermark: (newOptions: Partial<WatermarkOptions>) => {
      // 调用setOptions触发重绘
      setOptions(merge({}, options, newOptions))
    },
    destory: () => {}
  }
}

export default useWatermark
