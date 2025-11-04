import { useEffect, useState } from "react"

async function fetchData () {
  const data = await new Promise<Array<number>>((resolve) => {
    setTimeout(() => {
      resolve([1,2,3,4,5,6,7,8,9,10])
    }, 1000)
  })
  return data
}

function App () {
  const [list, setList] = useState<Array<number>>([])
  const [loading, setLoading] = useState<boolean>(false)

  async function loadData () {
    setLoading(true)
    const data = await fetchData()
    setList(data)
    setLoading(false)
  }

  function handleRefresh () {
    loadData()
  }
  
  useEffect(() => {
    loadData()
  }, [])
  return (
    <div>
      <button onClick={handleRefresh}>刷新</button>
      <ul>
        {
          loading ? '加载中...' : list.map(item => {
            return (
              <li>商品 { item }</li>
            )
          })
        }
      </ul>
    </div>
  )
}

export default App
