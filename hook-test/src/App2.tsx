import { useEffect, useState } from "react"

async function queryData () {
  const data = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(666)
    }, 2000)
  })
  return data
}

function Child () {
  useEffect(() => {

    console.log('Child useEffect')
    const timer = setInterval(() => {
      console.log('Child timer running~')
    }, 1000)
    return () => {
      console.log('clear Child useEffect timer~ timer:', timer)
      clearInterval(timer)
    }
  }, [])
  return (
    <>
      <p>I'm a child component</p>
    </>
  )
}

function App () {
  const [num, setNum] = useState(0)

  const [showChild, setShowChild] = useState(true)
  const toggleChild = () => {
    setShowChild(showChild => !showChild)
  }
  // 如果想在初次渲染的时候请求数据然后setState 可以借助useEffect来实现
  useEffect(() => {
    console.log('useEffect1')
    // 注意这里想用async await语法需要单独写一个函数，因为useEffect的回调函数不支持异步函数async
    queryData().then((data) => {
      setNum(data as number)
    })
    return () => {
      console.log('clear useEffect1')
    }
  }, [])
  // 这里useEffect第二个参数是依赖项，当依赖项发生变化时，useEffect会重新执行

  // 如果第二个参数为空数组，则useEffect只会执行一次
  useEffect(() => {
    console.log('useEffect2')
    return () => {
      console.log('clear useEffect2')
    }
  })
  // 如果第二个参数为空，则useEffect每次都执行

  useEffect(() => {
    console.log('useEffect3')
    return () => {
      console.log('clear useEffect3')
    }
  }, [1, 2, 3, 'abc'])
  // 这里几个变量都是常量 因为不会变化 所以不会触发effect的重新执行 输出效果和第一个effect相同

  useEffect(() => {
    console.log('useEffect4')
    return () => {
      console.log('clear useEffect4')
    }
  }, [1, 2, 3, new Date()])
  // 这里的new Date()是一个对象 每次都是新的对象 所以会触发effect的重新执行 效果和第二个参数不传为空一样

  // 如果useEffect跑了一个定时器 依赖改变时 会重新启动一个新的定时器，这里需要手动清理之前启动的定时器，否则会内存泄漏
  useEffect(() => {
    console.log('useEffect5')
    const timer = setInterval(() => {
      console.log(num)
    }, 1000)
    console.log('start useEffect5 timer~ timer:', timer)
    return () => {
      // 这里清理函数的执行是在effect重新运行之前执行的 或者在组件销毁时执行
      console.log('clear useEffect5 timer~ timer:', timer)
      clearInterval(timer)
    }
  }, [num]) // 这里只在num变化时重新运行Effect 启动新的定时器 如果num不变化 则不会重新启动定时器
  return (
    <>
      <button onClick={() => setNum(num => num + 1)}>Click me {num}</button>
      <button onClick={toggleChild}>Toggle Child {showChild ? 'Hide' : 'Show'}</button>
      {
        showChild ? <Child /> : <div>Child is hidden</div>
      }
    </>
  )
}

export default App
