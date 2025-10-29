import { useCallback, useLayoutEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"

function useMeragedState<T> (defaultStateValue: T, props: {
  defaultValue?: T,
  value?: T,
  onChange?: (value: T) => void,
}) : [T, Dispatch<SetStateAction<T>>] {
  const {
    defaultValue,
    value: propsValue,
    onChange, 
  } = props

  const [stateValue, setStateValue] = useState<T>(() => {
    if (propsValue !== undefined) {
      return propsValue!
    } else if (defaultValue !== undefined) {
      return defaultValue!
    } else {
      return defaultStateValue
    }
  })

  const mergedValue = propsValue === undefined ? stateValue : propsValue

  function isFunction(value: unknown): value is Function {
    return typeof value === 'function'
  }

  const setValue = useCallback((value: SetStateAction<T>) => {
    const res = isFunction(value) ? value(stateValue) : value
    if (propsValue === undefined) {
      setStateValue(res)
    }
    onChange?.(res)
  }, [stateValue])

  const isFirstRender = useRef(true)

  useLayoutEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      setStateValue(propsValue!)
    }
    isFirstRender.current = false
  }, [propsValue])


  return [mergedValue, setValue]
}

export default useMeragedState
