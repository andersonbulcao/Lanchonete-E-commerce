import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  Chip,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Edit, Block, CheckCircle } from '@mui/icons-material';

// Dados mockados - em um projeto real viriam de uma API
const usuariosIniciais = [
  {
    id: 1,
    nome: 'João Silva',
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321',
    tipo: 'cliente',
    status: 'ativo',
    dataCadastro: '15/01/2024',
  },
  {
    id: 2,
    nome: 'Maria Oliveira',
    email: 'maria.oliveira@email.com',
    telefone: '(11) 98765-4322',
    tipo: 'cliente',
    status: 'ativo',
    dataCadastro: '16/01/2024',
  },
  {
    id: 3,
    nome: 'Admin Sistema',
    email: 'admin@lanchonete.com',
    telefone: '(11) 98765-4323',
    tipo: 'admin',
    status: 'ativo',
    dataCadastro: '01/01/2024',
  },
  {
    id: 4,
    nome: 'Pedro Santos',
    email: 'pedro.santos@email.com',
    telefone: '(11) 98765-4324',
    tipo: 'cliente',
    status: 'bloqueado',
    dataCadastro: '17/01/2024',
  },
];

const GerenciarUsuarios = () => {
  const [usuarios, setUsuarios] = useState(usuariosIniciais);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    tipo: 'cliente',
  });

  const handleOpenDialog = (usuario = null) => {
    if (usuario) {
      setSelectedUser(usuario);
      setFormData({
        nome: usuario.nome,
        email: usuario.email,
        telefone: usuario.telefone,
        tipo: usuario.tipo,
      });
    } else {
      setSelectedUser(null);
      setFormData({
        nome: '',
        email: '',
        telefone: '',
        tipo: 'cliente',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (selectedUser) {
      setUsuarios(usuarios.map(user =>
        user.id === selectedUser.id
          ? { ...user, ...formData }
          : user
      ));
    } else {
      setUsuarios([...usuarios, {
        id: Date.now(),
        ...formData,
        status: 'ativo',
        dataCadastro: new Date().toLocaleDateString(),
      }]);
    }
    handleCloseDialog();
  };

  const toggleUserStatus = (userId) => {
    setUsuarios(usuarios.map(user =>
      user.id === userId
        ? { ...user, status: user.status === 'ativo' ? 'bloqueado' : 'ativo' }
        : user
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">
          Gerenciar Usuários
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleOpenDialog()}
        >
          Novo Usuário
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data Cadastro</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nome}</TableCell>
                <TableCell>{usuario.email}</TableCell>
                <TableCell>{usuario.telefone}</TableCell>
                <TableCell>
                  <Chip
                    label={usuario.tipo}
                    color={usuario.tipo === 'admin' ? 'secondary' : 'default'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={usuario.status}
                    color={usuario.status === 'ativo' ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>{usuario.dataCadastro}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(usuario)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color={usuario.status === 'ativo' ? 'error' : 'success'}
                    onClick={() => toggleUserStatus(usuario.id)}
                  >
                    {usuario.status === 'ativo' ? <Block /> : <CheckCircle />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              fullWidth
              required
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.tipo === 'admin'}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    tipo: e.target.checked ? 'admin' : 'cliente'
                  }))}
                />
              }
              label="Usuário Administrador"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {selectedUser ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GerenciarUsuarios; 