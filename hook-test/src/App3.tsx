import { useReducer } from "react"
import { produce } from "immer"

interface Data {
  result: number;
}

// 如果对象结构很复杂，每次reducer创建一个新对象会很繁琐，而且性能不好
// 比如：
interface ComplexData {
  a: {
    c: {
      e: number,
      f: number,
    },
    d: number,
  },
  b: number,
}

function complexReducerWithImmer (state: ComplexData, action: Action) {
  switch (action.type) {
    case 'add':
      // 这里produce第一个参数是初始值，第二个参数是修改函数
      // draft是初始值的副本，可以修改draft的值，但是不能修改原始的state
      // 修改后的draft会返回一个新的对象，这个对象会替换原始的state
      // 这样就可以避免每次创建一个新对象，提高性能
      return produce(state, (draft) => {
        draft.a.c.e += action.payload
      })
    case 'minus':
      return produce(state, (draft) => {
        draft.a.c.e -= action.payload
      })
    default:
      return state
  }
}

function ComplexReducer(state: ComplexData, action: Action) {
  // 对于复杂的对象结构，每次reducer创建一个新对象会很繁琐，而且性能不好
  // 在最佳实践中 针对复杂对象结构 推荐使用immer来处理
  switch (action.type) {
    case 'add':
      return {
        ...state,
        a: {
          ...state.a,
          c: {
            ...state.a.c,
            e: state.a.c.e + action.payload,
          },
          d: state.a.d,
        },
        b: state.b
      }
    case 'minus':
      return {
        ...state,
        a: {
          ...state.a,
          c: {
            ...state.a.c,
            e: state.a.c.e - action.payload,
          },
          d: state.a.d,
        },
        b: state.b,
      }
    default:
      return state
  }
}


interface Action {
  type: 'add' | 'minus';
  payload: number;
}

function reducer(state: Data, action: Action) {
  switch (action.type) {
    case 'add':
      state.result += action.payload
      return state
      // 以上写法是错误的，因为不能直接修改state，如果直接修改原始的 state 返回，对象引用没有变化，无法触发组件的重新渲染
      // return { ...state, result: state.result + action.payload}
    case 'minus':
      return { ...state, result: state.result - action.payload }
    default:
      return state
  }
}

const App = () => {
  // 当state的逻辑比较复杂，用useReducer。所以的逻辑都封装在reducer中，避免重复的逻辑
  const [data, dispatch] = useReducer<Data, [ Action ]>(reducer, { result: 0 })

  const [data2, dispatch2] = useReducer<Data, string, [Action]>(reducer, 'zero', (param) => {
    if (param === 'zero') {
      return { result: 0 }
    } else if (param === 'one') {
      return { result: 1 }
    } else {
      return { result: 2 }
    }
  })

  const [data3, dispatch3] = useReducer<ComplexData, [ Action ]>(ComplexReducer, {
    a: {
      c: {
        e: 0,
        f: 0,
      },
      d: 0,
    },
    b: 0,
  })

  const [data4, dispatch4] = useReducer<ComplexData, [Action]>(complexReducerWithImmer, {
    a: {
      c: {
        e: 0,
        f: 0,
      },
    },
    b: 0,
  })

  return (
    <>
      <section>
        <h3>useReducer两个参数：reducer函数和初始值</h3>
        <button onClick={() => dispatch({ type: 'add', payload: 1 })}>+</button>
        <span>{data.result}</span>
        <button onClick={() => dispatch({ type: 'minus', payload: 1 })}>-</button>
      </section>
      <section>
        <h3>useReducer三个参数：reducer函数、初始值、初始值计算函数</h3>
        <button onClick={() => dispatch2({ type: 'add', payload: 1 })}>+</button>
        <span>{data2.result}</span>
        <button onClick={() => dispatch2({ type: 'minus', payload: 1 })}>-</button>
      </section>
      <section>
        <h3>useReducer复杂对象结构</h3>
        <button onClick={() => dispatch3({ type: 'add', payload: 1 })}>+</button>
        <span>{JSON.stringify(data3)}</span>
        <button onClick={() => dispatch3({ type: 'minus', payload: 1 })}>-</button>
      </section>
      <section>
        <h3>useReducer复杂对象结构 with Immer</h3>
        <button onClick={() => dispatch4({ type: 'add', payload: 1 })}>+</button>
        <span>{JSON.stringify(data4)}</span>
        <button onClick={() => dispatch4({ type: 'minus', payload: 1 })}>-</button>
      </section>
    </>
  )
}

export default App

// 综合上， 在react里，只要涉及到State的修改，都要返回一个新的对象，否则无法触发组件的重新渲染 无论使用useState还是useReducer
// 涉及复杂的深层对象的修改，可以借助immer优化，这也是React推崇的数组不可变性原则
