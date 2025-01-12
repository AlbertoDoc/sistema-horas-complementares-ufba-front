import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import './App.css'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/home' index element={<HomePage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
