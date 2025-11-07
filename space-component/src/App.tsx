// import { ConfigProvider } from 'antd'
import './App.css'
import ConfigProvider from './ConfigProvider'
import Space from './Space'

export default function App() {
  return <ConfigProvider space={{ size: 96 }}>
    <Space 
      className='container' 
      direction="horizontal"
      align="end" 
      wrap={true}
      split={
        <div className='box' style={{background: 'blue'}}></div>
      }
    >
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </Space>
    {/* <Space 
      wrap={true} 
      style={{ height: 200, background: 'green' }} 
      direction="horizontal" 
      size={[ 'large', 200 ]} 
      align='center'
      split={
        <div className='box' style={{background: 'yellow'}}></div>
      }
    >
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </Space>
    <Space direction="vertical">
      <div className="box"></div>
      <div className="box"></div>
      <div className="box"></div>
    </Space> */}
  </ConfigProvider>
}
