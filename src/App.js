import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import Navbar from './components/Navbar';
import { Todo } from './components/Todo';
import { AcercaDe } from './components/AcercaDe';
import { Registro } from './components/Registro';
import { UserProvider } from './context/UserProvider';
import { Home } from './components/Home';


function App() {
  return (
    <UserProvider>
      <Navbar />
        
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='/login' element={<Login />} />

        <Route path='/registro' element={<Registro  />} />
        <Route path='/tareas' element={<Todo />} />
        <Route path='/aboutus' element={<AcercaDe />} />
      </Routes>
    </UserProvider>
    
  );
}

export default App;
