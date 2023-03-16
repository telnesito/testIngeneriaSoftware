
import { Route, Routes } from 'react-router'
import './App.css'
import EditorPage from './pages/EditorPage'
import EditorCodigo from './components/EditorCodigo'
import EditorConsola from './components/EditorConsola'
import EditorRuby from './components/EditorRuby'
import { Home } from './components/Home'


function App() {

  return (
    <div className="App">

      <Routes>

        <Route path='/' element={<EditorPage />}>
          <Route path='' element={<Home />}></Route>
          <Route path='editor-web' element={<EditorCodigo />} />
          <Route path='editor-consola' element={<EditorConsola />} />
          <Route path='editor-ruby' element={<EditorRuby />} />
          <Route path='*' element={<h1>No existe la pagina xd</h1>}></Route>
        </Route>




      </Routes>


    </div>
  )
}

export default App
