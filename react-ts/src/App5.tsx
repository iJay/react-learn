// useReducer + ts 、useMemo + ts、 useCallback + ts、 useContext + ts、memo + ts的使用
import { createContext, memo, useCallback, useContext, useMemo, useReducer } from "react"

interface State {
  number: number
}
interface Action {
  type: 'add' | 'minus'
  payload: number
}

function Bbb () {
  console.log('Bbb render')
  // useContext 的类型参数是 Context 内容的类型
  const theme = useContext<string>(ThemeContext)
  return (
    <div>
      Bbb 当前的主题色是 {theme}
    </div>
  )
}

interface AaaProps {
  name?: string;
  callback?: () => void
}

// function Aaa (props: AaaProps) {
//   console.log('Aaa render')
//   const { name, callback } = props
//   return (
//     <>
//       {name && <span>{name} </span>}
//       <button onClick={callback}>click</button>
//       <Bbb />
//    </>
//   )
// }

// const MemoAaa = memo(Aaa)

// 这里的memo的参数类型 是包裹的函数组件的参数类型
const MemoAaa = memo<AaaProps>(function Abb (props)  {
  console.log('Aaa render')
  const { name, callback } = props
  return (
    <>
      {name && <span>{name} </span>}
      <button onClick={callback}>click</button>
      <Bbb />
    </>
  )
})

// createContext的参数类型是传入参数的类型
const ThemeContext = createContext<string>('light')

function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'add':
      return { ...state, number: state.number + action.payload }
    case 'minus':
      return { ...state, number: state.number - action.payload }
    default:
      return state
  }
}

function App () {
  // const [result, dispatch] = useReducer<State, [ Action ]>(reducer, { number: 0 })
  // 这里useReducer的参数类型中 注意第三个参数类型是在数组中的泛型
  const [result, dispatch] = useReducer<State, string, [ Action ]>(reducer, 'two', (param) => {
    if (param === 'zero') {
      return { number: 0 }
    } else if (param === 'one') {
      return { number: 1 }
    } else {
      return { number: 2 }
    }
  })
  function aaaCallback () {
    console.log('aaaCallback')
  }

  // 这里useCallback的参数类型是传入的函数类型
  const memoAaaCallback = useCallback<() => void>(aaaCallback, [])

  // 这里useMemo的参数类型是第一个函数参数的返回值类型
  const memoDoubleNumber = useMemo<number>(() => result.number * 2, [result.number])

  return (
    <>
      <button onClick={() => dispatch({ type: 'add', payload: 1 })}>+</button>
      <button onClick={() => dispatch({ type: 'minus', payload: 1 })}>-</button>
      <br />
      <span>number: {result.number}</span>
      <br />
      <span>double number: {memoDoubleNumber}</span>
      <ThemeContext value="dark">
        <MemoAaa name="LeoHan" callback={memoAaaCallback}/>
      </ThemeContext>
    </>
  )
}

export default App


