import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Grid,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Divider,
  Rating,
  TextField,
  IconButton,
} from '@mui/material';
import {
  AccessTime,
  LocalShipping,
  AttachMoney,
  Star,
  Receipt,
  Close,
} from '@mui/icons-material';

// Mock de pedidos - em um projeto real viria da API
const pedidosMock = [
  {
    id: '#12345',
    data: '2024-02-20',
    status: 'Entregue',
    total: 76.80,
    itens: [
      { nome: 'X-Burger Especial', quantidade: 2, preco: 25.90 },
      { nome: 'Refrigerante Cola', quantidade: 2, preco: 6.00 },
      { nome: 'Batata Frita G', quantidade: 1, preco: 13.00 },
    ],
    avaliacao: 5,
    comentario: 'Excelente! Chegou rápido e quentinho.',
    endereco: 'Rua das Flores, 123',
    pagamento: 'Cartão de Crédito',
  },
  {
    id: '#12346',
    data: '2024-02-19',
    status: 'Entregue',
    total: 41.80,
    itens: [
      { nome: 'X-Salada', quantidade: 1, preco: 22.90 },
      { nome: 'Milk Shake', quantidade: 1, preco: 15.90 },
      { nome: 'Refrigerante', quantidade: 1, preco: 6.00 },
    ],
    avaliacao: 4,
    comentario: 'Muito bom, mas demorou um pouco.',
    endereco: 'Av. Principal, 456',
    pagamento: 'PIX',
  },
];

const HistoricoPedidos = () => {
  const [pedidos] = useState(pedidosMock);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [dialogAvaliacao, setDialogAvaliacao] = useState(false);
  const [avaliacao, setAvaliacao] = useState({
    nota: 5,
    comentario: '',
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Entregue':
        return 'success';
      case 'Em preparo':
        return 'warning';
      case 'Cancelado':
        return 'error';
      default:
        return 'default';
    }
  };

  const handleVerDetalhes = (pedido) => {
    setPedidoSelecionado(pedido);
  };

  const handleFecharDetalhes = () => {
    setPedidoSelecionado(null);
  };

  const handleAvaliar = (pedido) => {
    setPedidoSelecionado(pedido);
    setAvaliacao({
      nota: pedido.avaliacao || 5,
      comentario: pedido.comentario || '',
    });
    setDialogAvaliacao(true);
  };

  const handleEnviarAvaliacao = () => {
    // Aqui você implementaria a lógica para salvar a avaliação
    console.log('Avaliação:', {
      pedidoId: pedidoSelecionado.id,
      ...avaliacao,
    });
    setDialogAvaliacao(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Histórico de Pedidos
      </Typography>

      <Grid container spacing={3}>
        {pedidos.map((pedido) => (
          <Grid item xs={12} key={pedido.id}>
            <Card>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6" gutterBottom>
                      Pedido {pedido.id}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                      <AccessTime fontSize="small" />
                      <Typography variant="body2">
                        {new Date(pedido.data).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoney fontSize="small" />
                      <Typography variant="body2">
                        Total: R$ {pedido.total.toFixed(2)}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, flexWrap: 'wrap' }}>
                      <Chip
                        label={pedido.status}
                        color={getStatusColor(pedido.status)}
                        sx={{ mb: 1 }}
                      />
                      {pedido.avaliacao && (
                        <Chip
                          icon={<Star />}
                          label={`${pedido.avaliacao}/5`}
                          color="primary"
                          sx={{ mb: 1 }}
                        />
                      )}
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Receipt />}
                        onClick={() => handleVerDetalhes(pedido)}
                        sx={{ mb: 1 }}
                      >
                        Ver Detalhes
                      </Button>
                      {pedido.status === 'Entregue' && !pedido.avaliacao && (
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<Star />}
                          onClick={() => handleAvaliar(pedido)}
                          sx={{ mb: 1 }}
                        >
                          Avaliar
                        </Button>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog de Detalhes do Pedido */}
      <Dialog
        open={Boolean(pedidoSelecionado) && !dialogAvaliacao}
        onClose={handleFecharDetalhes}
        maxWidth="sm"
        fullWidth
      >
        {pedidoSelecionado && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Detalhes do Pedido {pedidoSelecionado.id}
                <IconButton onClick={handleFecharDetalhes}>
                  <Close />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Data do Pedido"
                    secondary={new Date(pedidoSelecionado.data).toLocaleDateString()}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Status"
                    secondary={
                      <Chip
                        label={pedidoSelecionado.status}
                        color={getStatusColor(pedidoSelecionado.status)}
                        size="small"
                      />
                    }
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Endereço de Entrega"
                    secondary={pedidoSelecionado.endereco}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Forma de Pagamento"
                    secondary={pedidoSelecionado.pagamento}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText primary="Itens do Pedido" />
                </ListItem>
                {pedidoSelecionado.itens.map((item, index) => (
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
                    secondary={`R$ ${pedidoSelecionado.total.toFixed(2)}`}
                  />
                </ListItem>
                {pedidoSelecionado.avaliacao && (
                  <>
                    <Divider />
                    <ListItem>
                      <ListItemText
                        primary="Avaliação"
                        secondary={
                          <Box>
                            <Rating value={pedidoSelecionado.avaliacao} readOnly />
                            <Typography variant="body2">
                              {pedidoSelecionado.comentario}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  </>
                )}
              </List>
            </DialogContent>
          </>
        )}
      </Dialog>

      {/* Dialog de Avaliação */}
      <Dialog
        open={dialogAvaliacao}
        onClose={() => setDialogAvaliacao(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Avaliar Pedido</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <Typography>Sua avaliação</Typography>
            <Rating
              value={avaliacao.nota}
              onChange={(_, newValue) => setAvaliacao({ ...avaliacao, nota: newValue })}
              size="large"
            />
            <TextField
              label="Comentário"
              multiline
              rows={4}
              value={avaliacao.comentario}
              onChange={(e) => setAvaliacao({ ...avaliacao, comentario: e.target.value })}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogAvaliacao(false)}>Cancelar</Button>
          <Button onClick={handleEnviarAvaliacao} variant="contained">
            Enviar Avaliação
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default HistoricoPedidos;

 