import { useState } from 'react';
import axios from 'axios';
import { Container, Paper, TextField, Button, Typography, Box, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [credenciais, setCredenciais] = useState({ login: '', senha: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredenciais({ ...credenciais, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    // Gera o token de autenticação (Basic Auth)
    const token = 'Basic ' + btoa(`${credenciais.login}:${credenciais.senha}`);

    try {
      // Testa o token batendo no backend
      await axios.get('http://localhost:8080/api/auth/check', {
        headers: { 'Authorization': token }
      });
      
      // Se não der erro, salva o token e entra
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = token;
      navigate('/admin');
      
    } catch (error) {
      console.error(error);
      setErro('Usuário ou senha incorretos!');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 10 }}>
      <Paper elevation={3} sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: '50%', mb: 2 }}>
            <LockIcon sx={{ color: 'white', fontSize: 30 }} />
        </Box>
        <Typography component="h1" variant="h5" fontWeight="bold" mb={3}>
          Acesso Restrito
        </Typography>

        {erro && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{erro}</Alert>}

        <form onSubmit={handleLogin} style={{ width: '100%' }}>
          <TextField label="Usuário" name="login" fullWidth margin="normal" required autoFocus onChange={handleChange} />
          <TextField label="Senha" name="senha" type="password" fullWidth margin="normal" required onChange={handleChange} />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2, py: 1.5, fontWeight: 'bold' }}>
            Entrar
          </Button>
          <Button fullWidth size="small" onClick={() => navigate('/')}>Voltar</Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Login;