import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';

// Importação das Telas da Versão 3.0
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
      {/* CssBaseline aplica correções globais do Material UI */}
      <CssBaseline /> 
      
      <Routes>
        {/* Rota Pública: Página Inicial */}
        <Route path="/" element={<Home />} />
        
        {/* Rota Pública: Criar Denúncia */}
        <Route path="/nova-denuncia" element={<DenunciaForm />} />
        
        {/* Rota Pública: Consultar Status */}
        <Route path="/acompanhar" element={<Acompanhar />} />
        
        {/* Rota Pública: Login Admin */}
        <Route path="/login" element={<Login />} />

        {/* Rota Privada: Painel Administrativo */}
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          } 
        />
        
        {/* Qualquer rota desconhecida volta para a Home */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;