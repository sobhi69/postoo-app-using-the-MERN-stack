import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Postoo from './components/postoo/Postoo';
import UpdatePost from './components/updatePost/UpdatePost';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Postoo />} />
        <Route path='/update/:id' element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
