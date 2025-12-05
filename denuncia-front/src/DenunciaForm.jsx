import { useState } from 'react';
import axios from 'axios';
import {
  Container, Paper, Typography, TextField, Checkbox,
  FormControlLabel, Button, Box, Alert, AlertTitle, Fade, Stack
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

function DenunciaForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    descricao: '',
    empresaEnvolvida: '',
    anonima: false,
    nomeDenunciante: '',
    emailDenunciante: ''
  });

  const [status, setStatus] = useState({ type: '', message: '', protocol: '' });

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: 'loading', message: '' });

    try {
      const response = await axios.post('http://localhost:8080/api/denuncias', formData);
      setStatus({
        type: 'success',
        protocol: response.data.protocolo
      });
      setFormData({ descricao: '', empresaEnvolvida: '', anonima: false, nomeDenunciante: '', emailDenunciante: '' });
    } catch (error) {
      console.error("Erro:", error);
      setStatus({ type: 'error', message: 'Erro de conexão com o servidor.' });
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
        pt: 6, 
        pb: 15, // Espaço para o card subir
        px: 2,
        textAlign: 'center',
        borderBottomLeftRadius: { xs: '30px', md: '50% 40px' },
        borderBottomRightRadius: { xs: '30px', md: '50% 40px' },
        boxShadow: 4,
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Botão Voltar (Canto Superior Direito) */}
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
                Voltar
            </Button>
        </Box>

        <Container maxWidth="md">
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={2}>
            <SecurityIcon sx={{ fontSize: 50, opacity: 0.9 }} />
          </Stack>
          
          <Typography variant="h3" component="h1" fontWeight="800" sx={{ letterSpacing: -1, mb: 1, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            Canal Seguro
          </Typography>
          
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
            Relate incidentes de vazamento de dados. Sua identidade e segurança são nossa prioridade absoluta.
          </Typography>
        </Container>
      </Box>

      {/* 2. Formulário Flutuante */}
      <Container maxWidth="md" sx={{ 
          mt: -10, 
          mb: 8, 
          position: 'relative', 
          zIndex: 10 
      }}>
        <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
          
          {/* Título Interno do Card */}
          <Box display="flex" alignItems="center" mb={4} pb={2} borderBottom="1px solid #eee">
              <LockIcon color="primary" sx={{ fontSize: 32, mr: 2 }} />
              <Box>
                <Typography variant="h5" fontWeight="bold" color="#2c3e50">
                    Formulário de Denúncia
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Preencha os campos abaixo. Campos com * são obrigatórios.
                </Typography>
              </Box>
          </Box>

          <Fade in={!!status.type}>
            <Box mb={3}>
              {status.type === 'success' && (
                <Alert severity="success" variant="filled" sx={{ borderRadius: 2, boxShadow: 3 }}>
                  <AlertTitle sx={{ fontWeight: 'bold' }}>Denúncia Registrada com Sucesso!</AlertTitle>
                  <Box sx={{ mt: 2, bgcolor: 'rgba(0,0,0,0.1)', p: 2, borderRadius: 1, textAlign: 'center' }}>
                      <Typography variant="body2">Seu protocolo de acompanhamento:</Typography>
                      <Typography variant="h4" component="div" sx={{ fontWeight: '900', letterSpacing: 2, mt: 1 }}>
                          {status.protocol}
                      </Typography>
                      <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                          Guarde este número com segurança. Ele é a única forma de acompanhar seu caso.
                      </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    color="inherit" 
                    sx={{ mt: 3, color: '#1b5e20', fontWeight: 'bold', bgcolor: 'white', '&:hover': { bgcolor: '#f1f8e9' } }}
                    onClick={() => setStatus({ type: '', message: '' })}
                    fullWidth
                  >
                    Fazer Nova Denúncia
                  </Button>
                </Alert>
              )}
              {status.type === 'error' && <Alert severity="error" sx={{ borderRadius: 2 }}>{status.message}</Alert>}
            </Box>
          </Fade>

          {status.type !== 'success' && (
            <form onSubmit={handleSubmit}>
              <Box display="flex" flexDirection="column" gap={3}>
                
                <TextField
                  label="Empresa Envolvida / Departamento"
                  name="empresaEnvolvida"
                  value={formData.empresaEnvolvida}
                  onChange={handleChange}
                  required
                  fullWidth
                  variant="outlined"
                  placeholder="Ex: Departamento Financeiro ou Empresa X"
                  InputLabelProps={{ shrink: true }}
                />

                <TextField
                  label="Descrição Detalhada do Incidente"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  required
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  placeholder="Descreva o que aconteceu, quando, onde e quem estava envolvido..."
                  InputLabelProps={{ shrink: true }}
                />

                {/* Área de Anonimato destacada */}
                <Paper variant="outlined" sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2, border: '1px dashed #bdbdbd' }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formData.anonima}
                          onChange={handleChange}
                          name="anonima"
                          color="primary"
                        />
                      }
                      label={<Typography fontWeight="bold" color="text.primary">Desejo manter anonimato total</Typography>}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mt: 0.5 }}>
                        Ao marcar esta opção, seus dados pessoais não serão solicitados e não serão armazenados em nossos servidores. Garantia conforme LGPD.
                    </Typography>
                </Paper>

                <Fade in={!formData.anonima} unmountOnExit>
                  <Box display="flex" flexDirection="column" gap={3} sx={{ p: 1 }}>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                        Dados de Identificação (Opcional)
                    </Typography>
                    <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                        <TextField
                        label="Seu Nome"
                        name="nomeDenunciante"
                        value={formData.nomeDenunciante}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        size="small"
                        />
                        <TextField
                        label="Seu E-mail"
                        name="emailDenunciante"
                        value={formData.emailDenunciante}
                        onChange={handleChange}
                        fullWidth
                        variant="outlined"
                        type="email"
                        size="small"
                        />
                    </Box>
                  </Box>
                </Fade>

                <Button
                  type="submit"
                  variant="contained"
                  color="error" // Cor vermelha/erro chama atenção para ação importante
                  size="large"
                  endIcon={<SendIcon />}
                  disabled={status.type === 'loading'}
                  sx={{ py: 2, fontWeight: 'bold', mt: 2, borderRadius: 2, fontSize: '1.1rem' }}
                >
                  {status.type === 'loading' ? 'Criptografando e Enviando...' : 'ENVIAR DENÚNCIA'}
                </Button>
              </Box>
            </form>
          )}

          <Box mt={4} textAlign="center">
              <Button onClick={() => navigate('/')} color="inherit" size="small" sx={{ color: '#9e9e9e' }}>
                  Cancelar e voltar ao início
              </Button>
          </Box>

        </Paper>
      </Container>
    </Box>
  );
}

export default DenunciaForm;