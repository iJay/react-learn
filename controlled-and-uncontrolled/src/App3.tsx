// 支持受控模式和非受控模式的的基础组件写法

import { useEffect, useRef, useState } from "react";

interface CalendarProps {
  defaultValue?: Date;
  value?: Date;
  onChange?: (date: Date) => void;
}

interface CalendarUncontrolledProps {
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

interface CalendarControlledProps {
  value: Date;
  onChange: (date: Date) => void;
}

function CalendarControlled(props: CalendarControlledProps) {
  const { value, onChange} = props
  
  function changeValue (date: Date) {
    onChange?.(date)
  }
  
  return (
    <>
      <h4>{value.toLocaleDateString()}</h4>
      <div onClick={() => { changeValue(new Date('2025-10-27'))}}>2025-10-27</div>
      <div onClick={() => { changeValue(new Date('2025-10-28'))}}>2025-10-28</div>
      <div onClick={() => { changeValue(new Date('2025-10-29'))}}>2025-10-29</div>
    </>
  )
}

function CalendarUncontrolled(props: CalendarUncontrolledProps) {
  const { defaultValue = new Date(), onChange} = props

  const [value, setValue] = useState(defaultValue)

  function changeValue(date: Date) {
    setValue(date)
    onChange?.(date)
  }
  
  return (
    <div>
      <h4>{ value.toLocaleDateString()}</h4>
      <div onClick={() => { changeValue(new Date('2025-10-27'))}}>2025-10-27</div>
      <div onClick={() => { changeValue(new Date('2025-10-28'))}}>2025-10-28</div>
      <div onClick={() => { changeValue(new Date('2025-10-29'))}}>2025-10-29</div>
    </div>
  )
}

function Calendar(props: CalendarProps) {
  // 通过判断 value 是不是 undefined 来区分受控模式和非受控模式
  const {
    defaultValue,
    value: propsValue,
    onChange
  } = props

  const [value, setValue] = useState(() => {
    if (propsValue) {
      // 通过判断 value 是不是 undefined 来区分受控模式和非受控模式 从而决定初始值是从 props 还是从 defaultValue 来
      return propsValue
    } else {
      return defaultValue
    }
  })

  const isFirstRender = useRef(true)

  useEffect(() => {
    if (propsValue === undefined && !isFirstRender.current) {
      // 如果 propsValue 是 undefined，并且不是第一次渲染，则设置内部状态
      // 这是为了保证展示的mergedValue在非受控模式下应该是取值value，而不是propsValue
      setValue(propsValue)
    }
    isFirstRender.current = false
  }, [propsValue])

  const mergedValue = propsValue === undefined ? value : propsValue

  function changeValue (date: Date) {
    // 非受控模式下，需要设置内部状态
    if (propsValue === undefined) {
      setValue(date)
    }
    // 受控和非受控模式下，都需要调用 onChange 回调
    onChange?.(date)
  }
  
  return (
    <>
      <h4>{mergedValue?.toLocaleDateString()}</h4>
      <div onClick={() => { changeValue(new Date('2025-10-27'))}}>2025-10-27</div>
      <div onClick={() => { changeValue(new Date('2025-10-28'))}}>2025-10-28</div>
      <div onClick={() => { changeValue(new Date('2025-10-29'))}}>2025-10-29</div>
    </>
  )
}

function App () {

  const [date, setDate] = useState(new Date('2025-10-28'))

  function onChangeControlled (date: Date) {
    setDate(date)
  }

  function onChange (date: Date) {
    console.log('onChange', date)
  }

  return (
    <>
      <section>
        <h3>只支持非受控模式</h3>
        <CalendarUncontrolled defaultValue={new Date('2025-10-28')} onChange={onChange} />
      </section>
      <section>
        <h3>只支持受控模式</h3>
        <CalendarControlled value={date} onChange={onChangeControlled} />
      </section>
      <section>
        <h3>支持非受控模式和受控模式</h3>
        <Calendar value={date} onChange={onChangeControlled} />
      </section>
    </>
  )
}

export default App
