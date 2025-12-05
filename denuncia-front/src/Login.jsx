import { useState } from 'react';
import axios from 'axios';
import { Container, Paper, TextField, Button, Typography, Box, Alert, Stack, IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      
      {/* 1. Cabeçalho Padrão */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        color: 'white', 
        pt: 8, 
        pb: 15, // Espaço para o card subir
        px: 2,
        textAlign: 'center',
        borderBottomLeftRadius: { xs: '30px', md: '50% 40px' },
        borderBottomRightRadius: { xs: '30px', md: '50% 40px' },
        boxShadow: 4,
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Botão de Voltar (Canto Superior Direito) */}
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
            <Button 
                variant="outlined" 
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/')}
                sx={{ 
                    color: 'white', 
                    borderColor: 'rgba(255,255,255,0.5)',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                    textTransform: 'none',
                    fontWeight: 'bold'
                }}
            >
                Voltar ao Início
            </Button>
        </Box>

        <Container maxWidth="sm">
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={2}>
            <SecurityIcon sx={{ fontSize: 50, opacity: 0.9 }} />
          </Stack>
          <Typography variant="h4" component="h1" fontWeight="800" sx={{ letterSpacing: -1, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            Compliance & Auditoria
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, mt: 1 }}>
            Acesso restrito a gestores autorizados.
          </Typography>
        </Container>
      </Box>

      {/* 2. Card de Login Flutuante */}
      <Container maxWidth="xs" sx={{ mt: -10, zIndex: 10, position: 'relative' }}>
        <Paper 
            elevation={6} 
            sx={{ 
                p: 4, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                borderRadius: 4
            }}
        >
          {/* Ícone de Cadeado em destaque */}
          <Box sx={{ 
              bgcolor: '#e3f2fd', 
              p: 2, 
              borderRadius: '50%', 
              mb: 2,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
          }}>
             <LockIcon sx={{ color: '#1565c0', fontSize: 32 }} />
          </Box>
          
          <Typography component="h1" variant="h5" fontWeight="bold" color="#1a237e" mb={1}>
            Área Administrativa
          </Typography>
          
          <Typography variant="body2" color="text.secondary" mb={3} textAlign="center">
             Entre com suas credenciais para gerenciar as denúncias.
          </Typography>

          {erro && (
              <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: 2 }}>
                  {erro}
              </Alert>
          )}

          <form onSubmit={handleLogin} style={{ width: '100%' }}>
            <TextField 
                label="Usuário" 
                name="login" 
                fullWidth 
                margin="normal" 
                required 
                autoFocus 
                variant="outlined"
                onChange={handleChange} 
            />
            <TextField 
                label="Senha" 
                name="senha" 
                type="password" 
                fullWidth 
                margin="normal" 
                required 
                variant="outlined"
                onChange={handleChange} 
            />
            
            <Button 
                type="submit" 
                fullWidth 
                variant="contained" 
                size="large"
                sx={{ 
                    mt: 4, 
                    mb: 2, 
                    py: 1.5, 
                    fontWeight: 'bold',
                    bgcolor: '#1565c0',
                    '&:hover': { bgcolor: '#0d47a1' }
                }}
            >
              ENTRAR NO SISTEMA
            </Button>
          </form>

        </Paper>

        <Typography variant="caption" display="block" textAlign="center" color="text.secondary" sx={{ mt: 4 }}>
             Sistema Seguro v1.0 • Acesso Monitorado
        </Typography>
      </Container>
    </Box>
  );
}

export default Login;