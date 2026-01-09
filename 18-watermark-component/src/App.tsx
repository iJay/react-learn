import './App.css'
import Watermark from './components/watermark'

function App() {
  return (
    <Watermark content={['内部文档', '绝密资料']}>
      <div>这里是公司内部文档Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit possimus necessitatibus voluptatem eligendi consequatur similique culpa repudiandae commodi nostrum. Rem harum neque odio minus error, aliquid accusantium quia laborum non.</div>
    </Watermark>
  )
}

export default App
