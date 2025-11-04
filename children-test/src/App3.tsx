// Children 的 api 被放到了 legacy 目录 替代方案2 传入props和renderItem自定义函数 chidlren内容由props传入

import type { PropsWithChildren } from "react"
import type React from "react"

interface ItemProps {
  content: React.ReactNode;
  id: number;
}

interface RowListProps extends PropsWithChildren  {
  dataSource: Array<ItemProps>;
  renderItem: (item: ItemProps, index: number) => React.ReactNode
}

function RowList(props: RowListProps) {
  const { dataSource, renderItem } = props
  return (
    <div className="row-list">
      {
        dataSource.map((dataItem, index) => {
          return renderItem(dataItem, index)
        })
      }
    </div>
  )
}

function App () {
  return (
    <RowList
      dataSource={[
        {
          id: 1,
          content: <span>111aaa</span>
        },
        {
          id: 2,
          content: <span>222bbb</span>
        },
        {
          id: 3,
          content: <span>333ccc</span>
        }
      ]}
      renderItem={(item: ItemProps, index: number) => {
        return (
          <div className="row-item">
            {index + 1}、{ item.content }
          </div>
        )
      }}
    />
  )
}

export default App
