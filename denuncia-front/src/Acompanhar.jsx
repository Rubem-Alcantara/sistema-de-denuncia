import { useState } from 'react';
import axios from 'axios';
import {
  Container, Paper, Typography, TextField, Button, Box, 
  Alert, Stack, Divider, Chip, Fade
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

function Acompanhar() {
  const navigate = useNavigate();
  const [protocolo, setProtocolo] = useState('');
  const [resultado, setResultado] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErro('');
    setResultado(null);

    try {
      // Ajuste a URL conforme seu backend (ex: GET /api/denuncias/protocolo/{xyz})
      const response = await axios.get(`http://localhost:8080/api/denuncias/protocolo/${protocolo}`);
      setResultado(response.data);
    } catch (error) {
      console.error(error);
      setErro('Protocolo não encontrado ou erro no sistema.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const s = status ? status.toUpperCase() : "PENDENTE";
    switch (s) {
      case 'CONCLUIDA': return 'success';
      case 'EM ANALISE': return 'info';
      default: return 'warning';
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
        pb: 15, 
        px: 2,
        textAlign: 'center',
        borderBottomLeftRadius: { xs: '30px', md: '50% 40px' },
        borderBottomRightRadius: { xs: '30px', md: '50% 40px' },
        boxShadow: 4,
        position: 'relative',
        zIndex: 1
      }}>
        
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
          <Typography variant="h3" component="h1" fontWeight="800" sx={{ letterSpacing: -1, mb: 1 }}>
            Consultar Protocolo
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400, maxWidth: 600, mx: 'auto' }}>
            Acompanhe o status da sua denúncia e verifique as respostas da auditoria.
          </Typography>
        </Container>
      </Box>

      {/* 2. Card Flutuante de Busca */}
      <Container maxWidth="sm" sx={{ mt: -10, mb: 8, position: 'relative', zIndex: 10 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
          
          <Box display="flex" alignItems="center" mb={3}>
              <AssignmentIcon color="primary" sx={{ fontSize: 30, mr: 2 }} />
              <Typography variant="h5" fontWeight="bold" color="#2c3e50">
                  Rastreamento
              </Typography>
          </Box>

          <form onSubmit={handleSearch}>
            <Box display="flex" gap={2} flexDirection={{ xs: 'column', sm: 'row' }}>
                <TextField 
                    label="Número do Protocolo" 
                    placeholder="Ex: 2024-e8a9..."
                    fullWidth 
                    value={protocolo}
                    onChange={(e) => setProtocolo(e.target.value)}
                    required
                    variant="outlined"
                />
                <Button 
                    type="submit" 
                    variant="contained" 
                    size="large"
                    disabled={loading}
                    startIcon={<SearchIcon />}
                    sx={{ px: 4, fontWeight: 'bold', minWidth: '140px' }}
                >
                    {loading ? '...' : 'BUSCAR'}
                </Button>
            </Box>
          </form>

          {/* Exibição de Erros */}
          {erro && (
            <Fade in>
                <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>{erro}</Alert>
            </Fade>
          )}

          {/* Exibição do Resultado */}
          {resultado && (
            <Fade in>
                <Box sx={{ mt: 4, border: '1px solid #e0e0e0', borderRadius: 2, overflow: 'hidden' }}>
                    <Box sx={{ bgcolor: '#f5f7fa', p: 2, borderBottom: '1px solid #e0e0e0' }}>
                        <Typography variant="subtitle2" color="text.secondary">STATUS ATUAL</Typography>
                        <Chip 
                            label={resultado.status || "PENDENTE"} 
                            color={getStatusColor(resultado.status)} 
                            sx={{ fontWeight: 'bold', mt: 1 }} 
                        />
                    </Box>
                    <Box sx={{ p: 3 }}>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            RESUMO DA DENÚNCIA
                        </Typography>
                        <Typography variant="body1" paragraph>
                            {resultado.descricao}
                        </Typography>
                        
                        <Divider sx={{ my: 2 }} />
                        
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                            RESPOSTA DA AUDITORIA
                        </Typography>
                        {resultado.respostaAuditoria ? (
                             <Alert severity="info" variant="outlined" sx={{ mt: 1, border: '1px dashed #0288d1' }}>
                                {resultado.respostaAuditoria}
                             </Alert>
                        ) : (
                            <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                                Ainda não há resposta registrada para este caso.
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Fade>
          )}

        </Paper>
      </Container>
    </Box>
  );
}

export default Acompanhar;