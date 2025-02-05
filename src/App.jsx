import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CoordinatorHomePage from './pages/CoordinatorHomePage';
import './App.css'
import SystemToastContainer from './components/SystemToastContainer';
import BaremaPage from './pages/BaremaPage';
import EvaluationPage from './pages/EvaluationPage';
import StudentHomePage from './pages/StudentHomePage';
import ProgressPage from './pages/ProgressPage';
import RegisterHoursPage from './pages/RegisterHoursPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/home' index element={<CoordinatorHomePage />}></Route>
          <Route path='/barema' element={<BaremaPage isVisualization={false} />}></Route>
          <Route path='/evaluation' element={<EvaluationPage />}></Route>
          <Route path='/home/student' element={<StudentHomePage />}></Route>
          <Route path='/barema/view' element={<BaremaPage isVisualization={true} />}></Route>
          <Route path='/progress' element={<ProgressPage />}></Route>
          <Route path='/hours/register' element={<RegisterHoursPage />}></Route>
        </Routes>
      </BrowserRouter>
      <SystemToastContainer />
    </div>
  )
}

export default App
