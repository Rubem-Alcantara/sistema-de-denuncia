import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container, Paper, Typography, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Chip, Box, Button, IconButton, Tooltip, Menu, MenuItem
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import HomeIcon from '@mui/icons-material/Home';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Ícone de "três pontinhos"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { useNavigate } from 'react-router-dom';

function AdminPanel() {
  const [denuncias, setDenuncias] = useState([]);
  const navigate = useNavigate();
  
  // Estados para controlar o Menu de Opções
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const open = Boolean(anchorEl);

  const carregarDados = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/denuncias');
      setDenuncias(response.data);
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  // --- LÓGICA DE ATUALIZAÇÃO ---
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
      // Chama o Java para atualizar
      await axios.put(`http://localhost:8080/api/denuncias/${selectedId}/status`, null, {
        params: { novoStatus }
      });
      
      // Atualiza a tela localmente (para ver a cor mudar na hora)
      carregarDados();
      handleMenuClose();
    } catch (error) {
      alert("Erro ao atualizar status!");
      console.error(error);
    }
  };
  // -----------------------------

  const formatarData = (dataString) => {
    if(!dataString) return "-";
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR') + ' ' + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusColor = (status) => {
    const s = status ? status.toUpperCase() : "PENDENTE";
    switch (s) {
      case 'CONCLUIDA': return 'success'; // Verde
      case 'EM ANALISE': return 'info';   // Azul
      default: return 'warning';          // Laranja
    }
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
            <Typography variant="h4" component="h1" fontWeight="800" color="#1a237e">
            Painel de Compliance
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
            Gerenciamento de denúncias e incidentes de segurança
            </Typography>
        </Box>
        <Box display="flex" gap={2}>
            <Button variant="outlined" startIcon={<HomeIcon />} onClick={() => navigate('/')}>
                Formulário
            </Button>
            <Button variant="contained" startIcon={<RefreshIcon />} onClick={carregarDados} sx={{ bgcolor: '#1a237e' }}>
                Atualizar Lista
            </Button>
        </Box>
      </Box>

      <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>PROTOCOLO</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>EMPRESA</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DESCRIÇÃO</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>DENUNCIANTE</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>STATUS</TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>GERENCIAR</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {denuncias.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell><Chip label={row.protocolo} size="small" variant="outlined" color="primary" /></TableCell>
                <TableCell>{row.empresaEnvolvida}</TableCell>
                <TableCell sx={{ maxWidth: 250 }}><Typography noWrap variant="body2">{row.descricao}</Typography></TableCell>
                <TableCell>
                    {row.anonima ? <Chip label="ANÔNIMO" size="small" /> : row.nomeDenunciante}
                </TableCell>
                <TableCell>
                    <Chip label={row.status || "PENDENTE"} color={getStatusColor(row.status)} size="small" sx={{ fontWeight: 'bold', minWidth: 100 }} />
                </TableCell>
                <TableCell align="center">
                    <Tooltip title="Alterar Status">
                        <IconButton onClick={(e) => handleMenuClick(e, row.id)}>
                            <MoreVertIcon />
                        </IconButton>
                    </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Menu de Opções (Escondido até clicar) */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => mudarStatus('PENDENTE')}>
            <PendingIcon color="warning" sx={{ mr: 1 }} /> Pendente
        </MenuItem>
        <MenuItem onClick={() => mudarStatus('EM ANALISE')}>
            <AssignmentIcon color="info" sx={{ mr: 1 }} /> Em Análise
        </MenuItem>
        <MenuItem onClick={() => mudarStatus('CONCLUIDA')}>
            <CheckCircleIcon color="success" sx={{ mr: 1 }} /> Concluir Caso
        </MenuItem>
      </Menu>
    </Container>
  );
}

export default AdminPanel;