// import LazyLoad from 'react-lazyload'
import LazyLoad from './components/MyLazyLoad/index'
import img1 from './assets/react.svg'
import img2 from '/vite.svg'
import './App.css'
import React from 'react'

const LazyGuang = React.lazy(() => import('./components/Guang/index'))

function App() {
  return (
    <div>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      <p>xxxxxx</p>
      {/* 这里的offset是距离可视区域-50px（即进入可视区域50px）时显示 */}
      <LazyLoad offset={-50} placeholder={<div>组件加载中....</div>}>
        <LazyGuang/>
      </LazyLoad>
      <LazyLoad offset={10} placeholder={<div>loading...</div>}>
        <img src={img1}/>
      </LazyLoad>
      <LazyLoad placeholder={<div>loading...</div>}>
        <img src={img2}/>
      </LazyLoad>
      
    </div>
  )
}

export default App
