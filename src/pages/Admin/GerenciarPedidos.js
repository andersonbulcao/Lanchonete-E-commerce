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
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { Visibility } from '@mui/icons-material';

// Dados mockados - em um projeto real viriam de uma API
const pedidosIniciais = [
  {
    id: '#1234',
    cliente: 'João Silva',
    data: '30/01/2024',
    hora: '14:30',
    status: 'Em preparo',
    total: 89.90,
    itens: [
      { nome: 'X-Burger Especial', quantidade: 2, preco: 25.90 },
      { nome: 'Refrigerante Cola', quantidade: 2, preco: 6.00 },
      { nome: 'Batata Frita G', quantidade: 1, preco: 26.10 },
    ],
    endereco: 'Rua das Flores, 123 - Centro',
    pagamento: 'Cartão de Crédito',
  },
  {
    id: '#1233',
    cliente: 'Maria Oliveira',
    data: '30/01/2024',
    hora: '14:15',
    status: 'Entregue',
    total: 45.90,
    itens: [
      { nome: 'X-Salada', quantidade: 1, preco: 22.90 },
      { nome: 'Milk Shake', quantidade: 1, preco: 15.90 },
      { nome: 'Refrigerante', quantidade: 1, preco: 7.10 },
    ],
    endereco: 'Av. Principal, 456 - Jardim',
    pagamento: 'PIX',
  },
  {
    id: '#1232',
    cliente: 'Pedro Santos',
    data: '30/01/2024',
    hora: '14:00',
    status: 'A caminho',
    total: 125.80,
    itens: [
      { nome: 'Combo Família', quantidade: 1, preco: 89.90 },
      { nome: 'Sobremesa Especial', quantidade: 2, preco: 17.95 },
    ],
    endereco: 'Rua do Comércio, 789 - Vila Nova',
    pagamento: 'Dinheiro',
  },
];

const statusOptions = [
  'Pendente',
  'Em preparo',
  'A caminho',
  'Entregue',
  'Cancelado',
];

const getStatusColor = (status) => {
  const colors = {
    'Pendente': 'warning',
    'Em preparo': 'info',
    'A caminho': 'primary',
    'Entregue': 'success',
    'Cancelado': 'error',
  };
  return colors[status] || 'default';
};

const GerenciarPedidos = () => {
  const [pedidos, setPedidos] = useState(pedidosIniciais);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = (pedido) => {
    setSelectedPedido(pedido);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPedido(null);
  };

  const handleStatusChange = (pedidoId, newStatus) => {
    setPedidos(pedidos.map(pedido =>
      pedido.id === pedidoId
        ? { ...pedido, status: newStatus }
        : pedido
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Gerenciar Pedidos
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Data/Hora</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pedidos.map((pedido) => (
              <TableRow key={pedido.id}>
                <TableCell>{pedido.id}</TableCell>
                <TableCell>{pedido.cliente}</TableCell>
                <TableCell>{`${pedido.data} ${pedido.hora}`}</TableCell>
                <TableCell>R$ {pedido.total.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip
                    label={pedido.status}
                    color={getStatusColor(pedido.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    startIcon={<Visibility />}
                    onClick={() => handleOpenDialog(pedido)}
                    size="small"
                  >
                    Detalhes
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {selectedPedido && (
          <>
            <DialogTitle>
              Detalhes do Pedido {selectedPedido.id}
            </DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Cliente"
                    secondary={selectedPedido.cliente}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Endereço"
                    secondary={selectedPedido.endereco}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Forma de Pagamento"
                    secondary={selectedPedido.pagamento}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Itens do Pedido" />
                </ListItem>
                {selectedPedido.itens.map((item, index) => (
                  <ListItem key={index} sx={{ pl: 4 }}>
                    <ListItemText
                      primary={item.nome}
                      secondary={`${item.quantidade}x R$ ${item.preco.toFixed(2)}`}
                    />
                  </ListItem>
                ))}
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Total"
                    secondary={`R$ ${selectedPedido.total.toFixed(2)}`}
                  />
                </ListItem>
                <ListItem>
                  <FormControl fullWidth>
                    <InputLabel>Status do Pedido</InputLabel>
                    <Select
                      value={selectedPedido.status}
                      label="Status do Pedido"
                      onChange={(e) => handleStatusChange(selectedPedido.id, e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </ListItem>
              </List>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Fechar</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default GerenciarPedidos; 