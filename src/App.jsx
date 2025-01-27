import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoordinatorHomePage from './pages/CoordinatorHomePage';
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
          <Route path='/home' index element={<CoordinatorHomePage />}></Route>
          <Route path='/barema' element={<BaremaForm />}></Route>
        </Routes>
      </BrowserRouter>
      <SystemToastContainer />
    </div>
  )
}

export default App
