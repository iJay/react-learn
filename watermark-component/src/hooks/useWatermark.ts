// useWatermark 绘制水印
import { useEffect, useState } from 'react'
import type { WatermarkProps } from '../components/WaterMark'
import { merge } from 'lodash-es'


export type WatermarkOptions = Omit<WatermarkProps, 'className' | 'style' | 'children'>

function useWatermark (params: WatermarkOptions) {

  const [options, setOptions] = useState(params || {})

  function drawWatermark () {
    //
  }

  useEffect(() => {
    drawWatermark()
  }, [options])

  return {
    generateWatermark: (newOptions: Partial<WatermarkOptions>) => {
      setOptions(merge({}, options, newOptions))
    }
  }
}


export default useWatermark
