// JSX 的类型
import type { JSX } from 'react'
import './App.css'

interface AaaProps {
  name: string,
  content: React.ReactElement // 描述一个 jsx 类型，就用 React.ReactElement
  title: React.ReactNode
}

function Aaa (props: AaaProps) { // 组件我们一般不写返回值类型，就用默认推导出来的,React 函数组件默认返回值就是 JSX.Element
  return <div>
    { props.title }
    { props.content }
    <p>aaa, { props.name }</p>
  </div>
}

function App() {
  const content: JSX.Element = <p>这里是文章内容，这里是文章内容，这里是文章内容。</p>
  return (
    <>
      {/* 这里ReactElement类型的content不能是null、number类型 */}
      {/* <Aaa name={'LeoHan'} content={undefined}></Aaa> */}
      {/* <Aaa name={'LeoHan'} content={3}></Aaa> */}
      {/* ReactNode类型 包含 ReactElement、或者 number、string、null、boolean 等 */}
      {/* 因此三个类型的关系 ReactNode > ReactElement > JSX.Element */}
      {/* 所以，一般情况下，如果你想描述一个参数接收 JSX 类型，就用 ReactNode  */}
      <Aaa name={'LeoHan'} content={content} title={null}></Aaa>
      <Aaa name={'LeoHan'} content={content} title={33333333}></Aaa>
      <Aaa name={'LeoHan'} content={content} title={<h3>Title</h3>}></Aaa>
    </>
  )
}

export default App
