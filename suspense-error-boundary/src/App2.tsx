// otai 这个状态管理库，它支持了 Suspense。
import { Suspense } from 'react'
import { atom, useAtom } from 'jotai'
import './App.css'

const userAtom = atom(async () => {
  const userId = 1
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}?_delay=2000`)
  return response.json()
})

const UserName = () => {
  const [ user ] = useAtom(userAtom)
  return (
    <div>User Name: {user.name}</div>
  )
}

function App() {
  return (
    <>
      <div className="card">
        {/* 这里即使没有lazy包裹，Suspense也能正常工作。因为jotai的atom支持了Suspense。 */}
        <Suspense fallback={'loading...'}>
          <UserName />
        </Suspense>
      </div>
    </>
  )
}

export default App
