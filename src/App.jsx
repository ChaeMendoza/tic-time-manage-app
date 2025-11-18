import { Route, Routes } from 'react-router-dom';
import './App.css'
import Home from "./pages/index.jsx";
import ResgisterPage from './pages/register.jsx';
import LoginPage from './pages/login.jsx';
import DashboardPage from './pages/dashboard.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import { useAuth } from './hooks/useAuth';
import CalendarPage from './pages/calendar.jsx';
import NotFound from './pages/not-found.jsx';

function App() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/register' element={<ResgisterPage />}/>
      <Route exact path='/login' element={<LoginPage />}/>
      <Route exact path='/calendar' element={<CalendarPage />}/>
      <Route 
        exact 
        path='/dashboard' 
        element={
          <ProtectedRoute isAuthenticated={isAuthenticated}>
            <DashboardPage></DashboardPage>
          </ProtectedRoute>
        } 
      />
      {/* Ruta catch-all para 404 - DEBE IR AL FINAL */}
      <Route path='*' element={<NotFound />} />
    </Routes>
  )
}

export default App
