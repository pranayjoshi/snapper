import { useSelector } from "react-redux";
import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';

function App() {
    const mode = useSelector((state:any)=> state.mode);
    const isAuth = Boolean(useSelector((state:any)=> state.token));
  return (
    <div className="App dark:bg-slate-900">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={isAuth ? <HomePage/> : <Navigate to="/"/>}/>
        <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/"/>}/>
        </Routes>
      </BrowserRouter>
        
    </div>
  );
}

export default App;
