import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import './App.css'
import SystemToastContainer from './components/SystemToastContainer';
import BaremaForm from './pages/BaremaPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/home' index element={<HomePage />}></Route>
          <Route path='/barema' element={<BaremaForm />}></Route>
        </Routes>
      </BrowserRouter>
      <SystemToastContainer />
    </div>
  )
}

export default App
