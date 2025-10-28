import type { FC } from "react";

// 函数组件的类型
interface AaaProps {
  name: string;
  content: React.ReactNode
}

const Aaa: React.FunctionComponent<AaaProps>  = (props) => {
  return <div>aaa, {props.name} {props.content}</div>
}

const App: FC = () => { // 这里函数组件类型 FC=FunctionComponent 如果有参数FC需要传入参数类型 如FC<AaaProps>
  return <Aaa name={'leohan'} content={'这是内容，这是内容，这是内容！'}/>
}

export default App
