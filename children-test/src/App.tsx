import React from 'react'
import './App.css'


interface AaaProps {
  children: React.ReactNode
}

interface Aaa2Props {
  children: React.ReactNode[]
}

function Aaa2 (props: Aaa2Props) {
  const { children } = props
  // 第三点这里调用sort方法会报错, 因为 props.children 的元素是只读的，不能重新赋值，所以也就不能排序
  // Uncaught TypeError: Cannot assign to read only property '0' of object '[object Array]'
  // console.log(children.sort())
  return (
    <div className='container'>
      {
        children.map((child) => {
          return (
            <div className='item'>
              { child }
            </div>
          )
        })
      }
    </div>
  )
}

function Aaa (props: AaaProps) {
  const { children } = props
  // 用 React.Children.toArray 转成数组就好了
  const arr = React.Children.toArray(children)
  console.log(arr)

  // React.Children.count 计数
  const count = React.Children.count(children)
  console.log('count', count)

  // React.Children.forEach 遍历 这里也是拍平了
  React.Children.forEach(children, (child, index) => {
    console.log('item' + index, child)
  })

  // React.Children.only only 是如果 children 不是一个元素就报错
  // const onlyOne = React.Children.only(children);
  // console.log('first', onlyOne)

  return (
    <div className='container'>
      {
        React.Children.map(children, (child) => {
          return (
            <div className='item'>
              { child }
            </div>
          )
        })
      }
    </div>
  )
}

function App() {
  return (
    <>
     {/* Aaa和Aaa2的最终效果都一样 但也有不同
     首先是声明的children类型前者是React.ReactNode后者是React.ReactNode[]，这就意味着后者的类型如果是一个元素就会报错 */}
      <section>
        <Aaa>
          <a href="#">111</a>
          <a href="#">222</a>
          <a href="#">333</a>
        </Aaa>
        <Aaa2>
          <a href="#">111</a>
          <a href="#">222</a>
          <a href="#">333</a>
        </Aaa2>
      </section>
      <hr />
      <section>
      {/* 其次是React.Children会将数组拍平 而children并不会 */}
      <Aaa>
        {
            [
                <span>111</span>,
                <span>333</span>,
                [<span>444</span>, <span>222</span>, [<span>000</span>, <span>-1-1-1</span>]]
            ]
        }
      </Aaa>
      <Aaa2>
        {
            [
                <span>111</span>,
                <span>333</span>,
                [<span>444</span>, <span>222</span>, [<span>000</span>, <span>-1-1-1</span>]]
            ]
        }
      </Aaa2>
      </section>
    </>
  )
}

export default App
