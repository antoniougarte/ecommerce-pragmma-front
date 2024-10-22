import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import { AuthProvider } from "./context/AuthContext";
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './ProtectedRoute';
import ProfilePage from './pages/ProfilePage';

function App() {

  return (
    <>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/Register' element={<RegisterPage/>}/>

          <Route element={<ProtectedRoute/>}>
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/tasks' element={<h1>tasks page</h1>}/>
            <Route path='/add-task' element={<h1>new task</h1>}/>
            <Route path='/tasks/:id' element={<h1>update task</h1>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </>
  )
}

export default App
