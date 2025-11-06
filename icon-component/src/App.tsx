
import './App.css'
import createFrontIconFont from './Icon/createFrontIconFont'
import IconAdd from './Icon/icons/IconAdd'
import IconEmail from './Icon/icons/IconEmail'

const IconFont = createFrontIconFont('//at.alicdn.com/t/c/font_5059178_3z7ra0ql20n.js')

function App() {
  return (
    <div style={ {padding: '50px'} }>
      <IconAdd size='40px'></IconAdd>
      <IconEmail spin></IconEmail>
      <IconEmail style={{color: 'blue', fontSize: '50px'}}></IconEmail>
      <hr />
      <IconFont type='icon-a-yuangongfuli2x' fill="red" size='60px'/>
      <IconFont type='icon-a-yuangongchengchang2x' size='50px'/>
    </div>
  )
}

export default App
