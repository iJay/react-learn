import copy from "copy-to-clipboard"
import CopyToClipboard from "./components/CopyToClipboard"

function App () {

  function onClick () {
    const res = copy('神说要有光666')
    console.log('done', res)
  }

  return (
    <div>
      <button onClick={onClick}>复制</button>
      <CopyToClipboard text={'神说要有光777'} onCopy={() => { console.log('done')}}>
        <button onClick={() => alert(1)}>复制1</button>
      </CopyToClipboard>
    </div>
  )
}

export default App
