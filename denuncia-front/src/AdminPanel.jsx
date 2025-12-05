import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Box, Button, IconButton, 
  Tooltip, Menu, MenuItem, Stack, Dialog, DialogTitle, DialogContent, 
  DialogActions, TextField
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import RateReviewIcon from '@mui/icons-material/RateReview'; 
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [denuncias, setDenuncias] = useState([]);
  const navigate = useNavigate();
  
  // Estados do Menu de Status
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const openMenu = Boolean(anchorEl);

  // Estados do Modal de Resposta
  const [openDialog, setOpenDialog] = useState(false);
  const [respostaTexto, setRespostaTexto] = useState('');
  const [idParaResponder, setIdParaResponder] = useState(null);

  const carregarDados = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/denuncias');
      setDenuncias(response.data);
    } catch (error) {
      console.error("Erro ao carregar:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // --- MENU DE STATUS ---
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const mudarStatus = async (novoStatus) => {
    try {
      await axios.put(`http://localhost:8080/api/denuncias/${selectedId}/status`, null, {
        params: { novoStatus }
      });
      carregarDados();
      handleMenuClose();
    } catch (error) {
      alert("Erro ao atualizar status!");
    }
  };

  // --- MODAL DE RESPOSTA ---
  const handleOpenResposta = (id, respostaAtual) => {
      setIdParaResponder(id);
      setRespostaTexto(respostaAtual || ''); // Se já tiver resposta, preenche
      setOpenDialog(true);
  };

  const handleFecharResposta = () => {
      setOpenDialog(false);
      setRespostaTexto('');
      setIdParaResponder(null);
  };

  const enviarResposta = async () => {
      if(!respostaTexto.trim()) return;

      try {
          await axios.put(`http://localhost:8080/api/denuncias/${idParaResponder}/resposta`, respostaTexto, {
              headers: { 'Content-Type': 'text/plain' } 
          });
          
          carregarDados();
          handleFecharResposta();
      } catch (error) {
          console.error(error);
          alert("Erro ao salvar resposta.");
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
      
      {/* Cabeçalho */}
      <Box sx={{ 
        background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
        color: 'white', 
        pt: 6, pb: 15, px: 2, textAlign: 'center',
        borderBottomLeftRadius: { xs: '30px', md: '50% 40px' },
        borderBottomRightRadius: { xs: '30px', md: '50% 40px' },
        boxShadow: 4, position: 'relative', zIndex: 1
      }}>
        <Box sx={{ position: 'absolute', top: 20, right: 20 }}>
            <Button 
                variant="outlined" startIcon={<ArrowBackIcon />} onClick={() => navigate('/')}
                sx={{ color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
            >
                Sair
            </Button>
        </Box>
        <Container maxWidth="lg">
          <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mb={2}>
            <AdminPanelSettingsIcon sx={{ fontSize: 50, opacity: 0.9 }} />
          </Stack>
          <Typography variant="h3" fontWeight="800" sx={{ letterSpacing: -1, mb: 1 }}>Painel de Compliance</Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, fontWeight: 400 }}>Gerenciamento de incidentes e auditoria.</Typography>
        </Container>
      </Box>

      {/* Tabela */}
      <Container maxWidth="xl" sx={{ mt: -10, mb: 8, flexGrow: 1, position: 'relative', zIndex: 10 }}>
        <Paper elevation={3} sx={{ p: 3, borderRadius: 4, bgcolor: 'white', overflow: 'hidden' }}>
          
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} px={1}>
            <Typography variant="h5" fontWeight="bold" color="#1a237e">Lista de Denúncias</Typography>
            <Button variant="contained" startIcon={<RefreshIcon />} onClick={carregarDados} sx={{ bgcolor: '#1a237e' }}>
              Atualizar
            </Button>
          </Box>

          <TableContainer sx={{ borderRadius: 2, border: '1px solid #e0e0e0' }}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead sx={{ bgcolor: '#f5f7fa' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold' }}>PROTOCOLO</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>EMPRESA</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>DESCRIÇÃO</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>AUDITORIA</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 'bold' }}>AÇÕES</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {denuncias.length === 0 ? (
                    <TableRow><TableCell colSpan={6} align="center" sx={{ py: 5 }}>Nenhuma denúncia encontrada.</TableCell></TableRow>
                ) : (
                    denuncias.map((row) => (
                    <TableRow key={row.id} hover>
                        <TableCell><Chip label={row.protocolo} size="small" variant="outlined" color="primary" sx={{ fontWeight: 'bold' }} /></TableCell>
                        <TableCell>{row.empresaEnvolvida}</TableCell>
                        <TableCell sx={{ maxWidth: 300 }}><Typography noWrap variant="body2">{row.descricao}</Typography></TableCell>
                        <TableCell>
                            <Chip label={row.status || "PENDENTE"} color={getStatusColor(row.status)} size="small" sx={{ fontWeight: 'bold', minWidth: 100 }} />
                        </TableCell>
                        
                        {/* Coluna Visual da Resposta */}
                        <TableCell>
                            {row.respostaAuditoria ? (
                                <Typography variant="caption" color="success.main" fontWeight="bold">✔ Respondido</Typography>
                            ) : (
                                <Typography variant="caption" color="text.secondary">—</Typography>
                            )}
                        </TableCell>

                        <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center">
                                {/* Botão RESPONDER */}
                                <Tooltip title="Escrever Parecer">
                                    <IconButton color="primary" onClick={() => handleOpenResposta(row.id, row.respostaAuditoria)} size="small" sx={{ bgcolor: '#e3f2fd' }}>
                                        <RateReviewIcon fontSize="small" />
                                    </IconButton>
                                </Tooltip>
                                
                                {/* Botão STATUS */}
                                <Tooltip title="Alterar Status">
                                    <IconButton onClick={(e) => handleMenuClick(e, row.id)} size="small">
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>
                            </Stack>
                        </TableCell>
                    </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>

      {/* MENU  DE STATUS */}
      <Menu anchorEl={anchorEl} open={openMenu} onClose={handleMenuClose}>
        <MenuItem onClick={() => mudarStatus('PENDENTE')} dense><PendingIcon fontSize="small" color="warning" sx={{ mr: 1 }} /> Pendente</MenuItem>
        <MenuItem onClick={() => mudarStatus('EM ANALISE')} dense><AssignmentIcon fontSize="small" color="info" sx={{ mr: 1 }} /> Em Análise</MenuItem>
        <MenuItem onClick={() => mudarStatus('CONCLUIDA')} dense><CheckCircleIcon fontSize="small" color="success" sx={{ mr: 1 }} /> Concluir</MenuItem>
      </Menu>

      {/* MODAL DE RESPOSTA */}
      <Dialog open={openDialog} onClose={handleFecharResposta} fullWidth maxWidth="sm">
          <DialogTitle sx={{ bgcolor: '#1a237e', color: 'white' }}>
              Responder Auditoria
          </DialogTitle>
          <DialogContent sx={{ mt: 2 }}>
              <Typography variant="body2" color="text.secondary" paragraph sx={{ mt: 2 }}>
                  Esta resposta ficará visível para o denunciante ao consultar o protocolo.
              </Typography>
              <TextField
                  autoFocus
                  margin="dense"
                  label="Parecer da Auditoria"
                  type="text"
                  fullWidth
                  multiline
                  rows={6}
                  variant="outlined"
                  value={respostaTexto}
                  onChange={(e) => setRespostaTexto(e.target.value)}
                  placeholder="Descreva as ações tomadas e a conclusão do caso..."
              />
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleFecharResposta} color="inherit">Cancelar</Button>
              <Button onClick={enviarResposta} variant="contained" color="primary">
                  Salvar Resposta
              </Button>
          </DialogActions>
      </Dialog>

    </Box>
  );
}

export default AdminPanel;