import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react"

// 如何把ref从子组件传递到父组件？ forwardRef + useImperativeHandle

const Child1: React.ForwardRefRenderFunction<HTMLInputElement> = (props, ref) => {
  return (
    <div>
      <input ref={ref} />
    </div>
  )
}

// React19之前 是借助forwardRef 其返回的组件能够接收 ref 属性，现在可以直接传递ref属性
function Child2 ({ ref }: { ref: React.Ref<HTMLInputElement> }) {
  return (
    <div>
      <input ref={ref} />
    </div>
  )
}

type ChildHandle = {
  focus: () => void;
}

// 有时候子组件并不想暴漏所有属性，只想暴漏部分属性，这时候可以使用useImperativeHandle
function Child3 ({ ref }: { ref: React.Ref<ChildHandle> }) {
  const inputRef = useRef<HTMLInputElement>(null)
  // useImperativeHandle的第一个参数是组件传入的ref，第二个参数是返回值的类型，第三个参数是依赖项
  useImperativeHandle(ref, () => {
    return {
      focus: () => inputRef.current?.focus()
    }
  }, [])
  return <input ref={inputRef} />
}

const WrapedChild1 = forwardRef(Child1)

function App () {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  
  return (
    <div>
      <section>
        <h3>forwradRef wrapped component</h3>
        <WrapedChild1 ref={inputRef} />
      </section>
      <section>
        <h3>function component with ref</h3>
        <Child2 ref={inputRef} />
      </section>
      <section>
        <h3>useImperativeHandle wrapped component</h3>
        <Child3 ref={inputRef} />
      </section>
    </div>
  )
}

export default App
