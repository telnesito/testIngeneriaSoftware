
import { Route, Routes } from 'react-router'
import './App.css'
import EditorPage from './pages/EditorPage'
import EditorCodigo from './components/EditorCodigo'
import EditorConsola from './components/EditorConsola'
import EditorRuby from './components/EditorRuby'

function App() {

  return (
    <div className="App">

      <Routes>

        <Route path='/*' element={<EditorPage />}>

          <Route path='' element={<EditorCodigo />} />
          <Route path='editor-consola' element={<EditorConsola />} />
          <Route path='editor-ruby' element={<EditorRuby />} />
        </Route>



      </Routes>


    </div>
  )
}

export default App
