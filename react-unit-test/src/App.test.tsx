import React, { act } from 'react'
import { fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react'
import App from './App'
import Toggle from './Toggle'
import useCounter from './useCounter'

test('renders learn react link', () => {
  render(<App />)
  // 通过 screen 来查询 dom，查找文本内容匹配正则 /learn react/ 的 a 标签
  //  screen 是 @testing-library/react 提供的 api，是从全局查找 dom，
  // 可以直接根据文本查（getByText），根据标签名和属性查（getByRole） 等
  const linkElement = screen.getByText(/learn react/i)
  expect(linkElement).toBeInTheDocument()
})

test('renders learn react link', () => {
  // render 会返回组件挂载的容器 dom，它是一个 HTMLElement 的对象，有各种 dom 方法
  const { container } = render(<App />)
  const linkElement = container.querySelector('.App-link')
  expect(linkElement?.textContent).toBe('Learn React')
})

// onClick、onChange 等事件监听器的组件，怎么测试?
// 单测里触发某个元素的某个事件需要用到 fireEvent 方法
// test('test toggle click', () => {
//   const { container } = render(<Toggle/>)
//   expect(container.querySelector('p')?.textContent).toBe('close')
//   // 用 fireEvent.click 触发 button 的点击事件
//   // fireEvent 可以触发任何元素的任何事件
//   fireEvent.click(container.querySelector('button')!)
//   expect(container.querySelector('p')?.textContent).toBe('open')
// })

// 触发change事件 第二个参数传入 target 的 value 值
// fireEvent.change(container.querySelector('input')!, { target: { value: 'a'}})

// 如果组件中有段异步逻辑，过段时间才会渲染内容，这时候怎么测？
// test('test toggle click', async () => {
//   const { container } = render(<Toggle/>)
//   expect(container.querySelector('p')?.textContent).toBe('close')
//   fireEvent.click(container.querySelector('button')!)
//   await waitFor(() => expect(container.querySelector('p')?.textContent).toBe('open'), {
//     timeout: 3000
//   })
// })

// 还有一个 api 比较常用，就是 act 作用：把所有浏览器里跑的代码都包一层 act，这样行为会和在浏览器里一样
test('test toggle click', async () => {
  const { container } = render(<Toggle/>)
  expect(container.querySelector('p')?.textContent).toBe('close')
  act(() => {
    fireEvent.click(container.querySelector('button')!)
  })
  // 等待异步操作完成再断言，可以指定 timeout
  await waitFor(() => expect(container.querySelector('p')?.textContent).toBe('open'), {
    timeout: 3000
  })
})

// 如何单独测试 hooks
test('useCounter', () => {
  // renderHook 执行 hook，可以通过 result.current 拿到 自定义hook 返回值
  const hook = renderHook(() => useCounter(0))
  const [count, increment, decrement]  = hook.result.current;

  act(() => {
    increment(2)
  })

  expect(hook.result.current[0]).toBe(2)

  act(() => {
    decrement(3)
  })

  expect(hook.result.current[0]).toBe(-1)

  hook.unmount()
})