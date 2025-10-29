// useImperativeHandle + ts 使用

import { useEffect, useImperativeHandle, useRef } from "react";

interface AaaProps {
  name?: string;
  ref?: React.Ref<AaaRefType>;  
}

interface AaaRefType {
  aaa: () => void
}

function Aaa (props: AaaProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { ref, name } = props
  useImperativeHandle(ref, () => {
    return {
      aaa: () => inputRef.current?.focus()
    }
  }, [])
  return (
    <>
      { name && <span>{ name }</span> }
      <input ref={inputRef} placeholder="请输入内容" />
    </>
  )
}

function App () {
  const inputRef = useRef<AaaRefType>(null)

  useEffect(() => {
    inputRef.current?.aaa()
  }, [])

  return (
    <>
      <Aaa ref={inputRef} />
    </>
  )
}

export default App
