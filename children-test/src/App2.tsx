// Children 的 api 被放到了 legacy 目录 替代方案01 对 children 包装的那一层封装个组件
import { type PropsWithChildren } from 'react'

function RowItem (props: PropsWithChildren) {
  const { children } = props
  return (
    <div className='row-item'>
      { children}
    </div>
  )
}

function RowList (props: PropsWithChildren) {
  const { children } = props
  return (
    <div className="row-list">
      { children }
    </div>
  )
}

function App () {
  return (
    <>
      <RowList>
        <RowItem>
          <div>111</div>
        </RowItem>
        <RowItem>
          <div>222</div>
        </RowItem>
        <RowItem>
          <div>333</div>
        </RowItem>
      </RowList>
    </>
  )
}

export default App
