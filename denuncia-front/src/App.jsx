import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DenunciaForm from './DenunciaForm';
import AdminPanel from './AdminPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota para o usuário comum*/}
        <Route path="/" element={<DenunciaForm />} />
        
        {/* Rota para o administrador */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;