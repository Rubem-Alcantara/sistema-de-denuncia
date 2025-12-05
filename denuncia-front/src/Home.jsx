import { Container, Typography, Box, Button, Paper, Stack, IconButton, useMediaQuery, useTheme } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SearchIcon from '@mui/icons-material/Search';
import SecurityIcon from '@mui/icons-material/Security';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login'; 
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Estilo base do card
  const cardStyle = {
    p: 4,
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column', 
    borderRadius: 4,
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': { 
      transform: 'translateY(-5px)', 
      boxShadow: '0 12px 30px rgba(0,0,0,0.12)' 
    },
    cursor: 'pointer',
    bgcolor: 'white',
    position: 'relative',
    overflow: 'hidden'
  };

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)'
    }}>
      
      {/* Cabeçalho */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        color: 'white', 
        pt: 8, 
        pb: 12, 
        px: 2,
        textAlign: 'center',
        borderBottomLeftRadius: { xs: '30px', md: '50% 40px' },
        borderBottomRightRadius: { xs: '30px', md: '50% 40px' },
        boxShadow: 4,
        position: 'relative'
      }}>

        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
            {isMobile ? (
                
                <IconButton onClick={() => navigate('/login')} sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.1)' }}>
                    <LockIcon />
                </IconButton>
            ) : (
                
                <Button 
                    variant="outlined" 
                    startIcon={<LockIcon />}
                    onClick={() => navigate('/login')}
                    sx={{ 
                        color: 'white', 
                        borderColor: 'rgba(255,255,255,0.5)',
                        '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' },
                        textTransform: 'none',
                        fontWeight: 'bold'
                    }}
                >
                    Área Administrativa
                </Button>
            )}
        </Box>

        <Container maxWidth="md">
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={2}>
            <SecurityIcon sx={{ fontSize: 64, opacity: 0.9 }} />
          </Stack>
          
          <Typography variant="h3" component="h1" fontWeight="800" sx={{ letterSpacing: -1, mb: 2, textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
            Canal de Ética & Segurança
          </Typography>
          
          <Typography variant="h6" sx={{ opacity: 0.95, fontWeight: 400, maxWidth: 650, mx: 'auto', lineHeight: 1.6 }}>
            Plataforma segura, confidencial e independente para reportar violações de conduta, ética e segurança da informação.
          </Typography>
        </Container>
      </Box>

      {/* Área dos Cartões */}
      <Container maxWidth="md" sx={{ mt: -8, mb: 8, flexGrow: 1 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, 
          gap: 4, 
          alignItems: 'stretch' 
        }}>

          {/* Card: Denúncia */}
          <Paper elevation={0} sx={cardStyle} onClick={() => navigate('/nova-denuncia')}>
            <Box sx={{ bgcolor: '#ffebee', width: 90, height: 90, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
              <ReportProblemIcon sx={{ fontSize: 45, color: '#d32f2f' }} />
            </Box>
            
            <Typography variant="h5" fontWeight="bold" gutterBottom color="#2c3e50">
              Registrar Denúncia
            </Typography>
            
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, flexGrow: 1, px: 2 }}>
              Relate um incidente. Você pode optar pelo anonimato total garantido por criptografia de ponta a ponta.
            </Typography>
            
            <Button variant="contained" color="error" fullWidth size="large" sx={{ borderRadius: 2, py: 1.5, fontWeight: 'bold', boxShadow: 'none' }}>
              INICIAR REGISTRO
            </Button>
          </Paper>

          {/* Card: Consulta */}
          <Paper elevation={0} sx={cardStyle} onClick={() => navigate('/acompanhar')}>
            <Box sx={{ bgcolor: '#e3f2fd', width: 90, height: 90, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
              <SearchIcon sx={{ fontSize: 45, color: '#0288d1' }} />
            </Box>
            
            <Typography variant="h5" fontWeight="bold" gutterBottom color="#2c3e50">
              Consultar Protocolo
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4, flexGrow: 1, px: 2 }}>
              Já possui um número de protocolo? Verifique o status da investigação e a resposta da auditoria.
            </Typography>
            
            <Button variant="contained" color="primary" fullWidth size="large" sx={{ borderRadius: 2, py: 1.5, fontWeight: 'bold', boxShadow: 'none' }}>
              VERIFICAR STATUS
            </Button>
          </Paper>

        </Box>
      </Container>

      <Box sx={{ py: 4, textAlign: 'center', borderTop: '1px solid #e0e0e0', bgcolor: 'white' }}>
        <Typography variant="body2" color="text.secondary">
          Todas as comunicações são criptografadas e confidenciais.
        </Typography>
      </Box>

    </Box>
  );
}

export default Home;