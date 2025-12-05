import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DenunciaForm from './DenunciaForm';
import AdminPanel from './AdminPanel';
import Login from './Login';
import PrivateRoute from './PrivateRoute';

function App() {
  
  // Isso garante que, se você der F5, o login não se perde
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = token;
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rota 1: O Formulário Público (Home) */}
        <Route path="/" element={<DenunciaForm />} />
        
        {/* Rota 2: A Tela de Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Rota 3: O Painel (Protegido pelo PrivateRoute) */}
        <Route path="/admin" element={
          <PrivateRoute>
            <AdminPanel />
          </PrivateRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;