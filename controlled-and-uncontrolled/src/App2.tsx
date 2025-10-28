import { useState, type ChangeEvent } from "react"

// 受控模式
function App () {
  const [value, setValue] = useState('LeoHan')

  console.log('App render~')
  
  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const val = event.target.value.toUpperCase()
    console.log('onChange', val)
    // 这里会触发App的重新渲染
    setValue(val)
    // 绕了一圈什么也没改，还导致组件的重新渲染，为什么要用受控模式呢？
    /**
     * 当对输入的值做处理之后设置到表单的时候，或者想要同步状态值到父组件
     * 比如把用户输入的值转换为大写 或者And中的Form表单项 是需要一个Store来统一管理所有表单项的状态
     */
  }
  
  return (
    <>
      <input value={value} onChange={onChange} />
    </>
  )
}

export default App
