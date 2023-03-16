
import { Route, Routes } from 'react-router'
import './App.css'
import EditorPage from './pages/EditorPage'
import EditorCodigo from './components/EditorCodigo'
import EditorConsola from './components/EditorConsola'

function App() {

  return (
    <div className="App">

      <Routes>

        <Route path='/*' element={<EditorPage />}>

          <Route path='' element={<EditorCodigo />} />
          <Route path='editor-consola' element={<EditorConsola />} />

        </Route>



      </Routes>


    </div>
  )
}

export default App
