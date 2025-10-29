// 传入组件的props参数类型PropsWithChildren 、CSSProperties、HTMLAttributes、xxxEventHandler

import type { ComponentProps, CSSProperties, HTMLAttributes, MouseEvent, MouseEventHandler, PropsWithChildren, ReactNode } from "react"

// interface CccProps {
//   content?: ReactNode
//   children?: ReactNode
// }
// 考虑到传children太常见了，所以React提供了相关类型 PropsWithChildren
type CccProps = PropsWithChildren<{
  content?: ReactNode
  // 有时候组件可以传入一些css的值
  color?: CSSProperties['color'],
  style?: CSSProperties,
  clickHandler?: MouseEventHandler<HTMLButtonElement>
}>

function Ccc (props: CccProps) {
  return (
    <div style={{ color: props.color, ...props.style }}>
      ccc, { props.content }
      <p>{ props.children }</p>
      <button onClick={props.clickHandler}>click me Ccc</button>
    </div>
  )
}

// type BbbProps = PropsWithChildren<{
//   name?: string
// } & HTMLAttributes<HTMLDivElement>>
// 继承 html 标签的属性，前面用的是 HTMLAttributes( ButtonHTMLAttributes、AnchorHTMLAttributes等)
// 也可以使用ComponentProps 其类型参数是标签名，比如 a、div、form 这些
type BbbProps = PropsWithChildren<
  {
    name?: string,
    clickHandler?: (e: MouseEvent<HTMLButtonElement>) => void
  } & ComponentProps<'div'>
>

function Bbb (props: BbbProps) {
  return (
    <div title={props.title}>
      <p>{ props.children }</p>
      <input type="text" />
      <button onClick={props.clickHandler}>click me Bbb</button>
    </div>
  )
}

function App () {
  return (
    <>
      {/* <Ccc content={<div>666</div>} /> */}
      {/* 如果这里不想通过参数传入内容，可以在children里传入内容 */}
      {/* 组件需要传入一些事件处理函数 需要用 xxxEventHandler 的类型，比如 MouseEventHandler、ChangeEventHandler 等，它的类型参数是元素的类型 */}
      {/* 或者自己声明一个函数类型也可以 */}
      <Ccc clickHandler={() => console.log('click me Ccc')} content={<div>666</div>} color="red" style={{ fontSize: '20px', backgroundColor: 'blue' }}>
        <button>777</button>
      </Ccc>
      {/* 如果组件希望可以当成html标签一样用，也就是传很多html属性作为参数 */}
      <Bbb title="请点击按钮查看效果" clickHandler={() => console.log('click me Bbb')}>
        <button>888</button>
      </Bbb>
    </>
  )
}

export default App
