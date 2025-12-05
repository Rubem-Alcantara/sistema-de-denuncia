import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  // Verifica se existe o token salvo no navegador
  const token = localStorage.getItem('token');

  // Se não tiver token, manda pro Login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se tiver, deixa passar
  return children;
}

export default PrivateRoute;