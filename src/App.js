import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import Navbar from './components/Navbar';
import { Contacto } from './components/Contacto';
import { AcercaDe } from './components/AcercaDe';
import { Registro } from './components/Registro';
import { UserProvider } from './context/UserProvider';


function App() {
  return (
    <UserProvider>
      <Navbar />
        
      <Routes>
        <Route path="/"/>
        <Route path='/login' element={<Login />} />
        <Route path='/registo' element={<Registro />} />
        <Route path='/contact' element={<Contacto />} />
        <Route path='/aboutus' element={<AcercaDe />} />
      </Routes>
    </UserProvider>
    
  );
}

export default App;
