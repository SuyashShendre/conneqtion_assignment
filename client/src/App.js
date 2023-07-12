import './App.css';
import { Routes, Route } from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Needhelp from './components/Needhelp';

function App() {
  return (
    <>
      <Routes>
        {localStorage.getItem('token') ?
          <Route path="/" element={<Dashboard />} />
          : <Route path="/" element={<Login />} />}

        <Route path="/register" element={<Register />} />
        <Route path="/needhelp" element={<Needhelp />} />

      </Routes>
    </>
  );
}

export default App;
