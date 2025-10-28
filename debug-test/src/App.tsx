import { useLayoutEffect, useState } from 'react'
import './App.css'

async function queryData () {
  const data = await new Promise<number>((resolve) => {
    setTimeout(() => {
      resolve(667)
    }, 2000)
  })
  return data
}

function App() {
  const [count, setCount] = useState(0)

  useLayoutEffect(() => {
    queryData().then((data) => {
      setCount(data)
    })
  }, [])

  function handleClick() {
    setCount((count) => {
      return count + 1
    })
  }

  return (
    <>
      <button onClick={() => handleClick()}>
        count is {count}
      </button>
    </>
  )
}

export default App
