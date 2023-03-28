import {BrowserRouter, Navigate, Routes, Route} from "react-router-dom";
import HomePage from 'scenes/homePage';
import LoginPage from 'scenes/loginPage';
import ProfilePage from 'scenes/profilePage';
import {Bell} from '@styled-icons/heroicons-outline/Bell';
import {LogoGithub} from '@styled-icons/ionicons-solid/LogoGithub'

function App() {
  return (
    <div className="App dark:bg-slate-900">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profile/:userId" element={<ProfilePage/>}/>
        </Routes>
      </BrowserRouter>
      <LogoGithub></LogoGithub>
      <Bell></Bell>
        
    </div>
  );
}

export default App;
