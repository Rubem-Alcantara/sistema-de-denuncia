import { useState } from 'react';
import axios from 'axios';
import {
  Container, Paper, Typography, TextField, Checkbox,
  FormControlLabel, Button, Box, Alert, AlertTitle, Fade
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SecurityIcon from '@mui/icons-material/Security';
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
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box display="flex" alignItems="center" mb={2} color="primary.main">
            <SecurityIcon sx={{ fontSize: 40, mr: 2 }} />
            <Typography variant="h4" component="h1" fontWeight="bold">
            Canal Seguro
            </Typography>
        </Box>
        <Typography variant="subtitle1" color="text.secondary" mb={4}>
          Relate incidentes de vazamento de dados. Sua identidade e segurança são nossa prioridade.
        </Typography>

        <Fade in={!!status.type}>
          <Box mb={3}>
            {status.type === 'success' && (
              <Alert severity="success" variant="filled" sx={{ borderRadius: 2 }}>
                <AlertTitle>Denúncia Registrada!</AlertTitle>
                Protocolo de acompanhamento: 
                <Typography variant="h5" component="div" sx={{ mt: 1, fontWeight: 'bold', letterSpacing: 3 }}>
                    {status.protocol}
                </Typography>
                <Button color="inherit" size="small" sx={{ mt: 2 }} onClick={() => setStatus({ type: '', message: '' })}>
                    Nova Denúncia
                </Button>
              </Alert>
            )}
            {status.type === 'error' && <Alert severity="error">{status.message}</Alert>}
          </Box>
        </Fade>

        {status.type !== 'success' && (
          <form onSubmit={handleSubmit}>
            <Box display="flex" flexDirection="column" gap={3}>
              <TextField
                label="Empresa Envolvida"
                name="empresaEnvolvida"
                value={formData.empresaEnvolvida}
                onChange={handleChange}
                required
                fullWidth
                variant="outlined"
                placeholder="Ex: Empresa X Ltda"
              />

              <TextField
                label="Descrição do Vazamento"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                placeholder="Descreva os detalhes do incidente..."
              />

              <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.anonima}
                        onChange={handleChange}
                        name="anonima"
                        color="primary"
                      />
                    }
                    label={<Typography fontWeight="bold">Desejo anonimato garantido por lei</Typography>}
                  />
                  <Typography variant="caption" display="block" color="text.secondary" sx={{ ml: 4 }}>
                      Se marcado, não coletaremos seu nome ou e-mail.
                  </Typography>
              </Paper>

              <Fade in={!formData.anonima} unmountOnExit>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField
                    label="Seu Nome (Opcional)"
                    name="nomeDenunciante"
                    value={formData.nomeDenunciante}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    label="Seu E-mail (Opcional)"
                    name="emailDenunciante"
                    value={formData.emailDenunciante}
                    onChange={handleChange}
                    fullWidth
                    variant="standard"
                    type="email"
                  />
                </Box>
              </Fade>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<SendIcon />}
                disabled={status.type === 'loading'}
                sx={{ py: 1.5, fontWeight: 'bold', mt: 2 }}
              >
                {status.type === 'loading' ? 'Criptografando e Enviando...' : 'Registrar Denúncia Segura'}
              </Button>
            </Box>
          </form>
        )}

        <Box mt={4} display="flex" justifyContent="center">
            <Button 
                variant="text" 
                color="secondary" 
                size="small" 
                onClick={() => navigate('/login')}
            >
                Acesso Restrito (Admin)
            </Button>
        </Box>

      </Paper>
    </Container>
  );
}

export default DenunciaForm;