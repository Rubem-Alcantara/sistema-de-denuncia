import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './Home';
import DenunciaForm from './DenunciaForm';
import Acompanhar from './Acompanhar'; // A tela nova
import Login from './Login';
import AdminPanel from './AdminPanel';

// Componente simples para Proteger Rota (Se não tiver token, manda pro login)
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <CssBaseline /> 
      
      <Routes>
        
        <Route path="/" element={<Home />} />
        
        <Route path="/nova-denuncia" element={<DenunciaForm />} />
        
        <Route path="/acompanhar" element={<Acompanhar />} />
        
        <Route path="/login" element={<Login />} />

        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          } 
        />
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;