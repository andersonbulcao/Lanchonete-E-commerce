import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Alert,
  Snackbar,
} from '@mui/material';
import {
  Delete,
  Add,
  Remove,
  CheckCircle,
} from '@mui/icons-material';

// Mock do carrinho - em um projeto real viria do estado global (Redux)
const carrinhoInicial = {
  items: [
    {
      id: 1,
      nome: 'X-Burger Especial',
      preco: 25.90,
      quantidade: 2,
      observacoes: 'Sem cebola',
      personalizacoes: ['sem_Cebola'],
      imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format',
    },
    {
      id: 2,
      nome: 'Refrigerante Cola',
      preco: 6.00,
      quantidade: 1,
      observacoes: '',
      personalizacoes: [],
      imagem: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format',
    },
  ],
};

const passos = ['Carrinho', 'Entrega', 'Pagamento', 'Confirmação'];

const Carrinho = () => {
  const [carrinho, setCarrinho] = useState(carrinhoInicial);
  const [passoAtivo, setPassoAtivo] = useState(0);
  const [dadosEntrega, setDadosEntrega] = useState({
    nome: '',
    telefone: '',
    endereco: '',
    complemento: '',
    tipoEntrega: 'delivery',
  });
  const [dadosPagamento, setDadosPagamento] = useState({
    metodo: 'pix',
    troco: '',
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleQuantidade = (id, delta) => {
    setCarrinho(prev => ({
      ...prev,
      items: prev.items.map(item =>
        item.id === id
          ? { ...item, quantidade: Math.max(1, item.quantidade + delta) }
          : item
      ),
    }));
  };

  const handleRemoverItem = (id) => {
    setCarrinho(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id),
    }));
  };

  const calcularTotal = () => {
    const subtotal = carrinho.items.reduce(
      (total, item) => total + item.preco * item.quantidade,
      0
    );
    const taxaEntrega = dadosEntrega.tipoEntrega === 'delivery' ? 5 : 0;
    return subtotal + taxaEntrega;
  };

  const handleProximoPasso = () => {
    if (passoAtivo === passos.length - 1) {
      // Aqui você implementaria a lógica para finalizar o pedido
      console.log('Pedido finalizado:', {
        items: carrinho.items,
        entrega: dadosEntrega,
        pagamento: dadosPagamento,
        total: calcularTotal(),
      });
      setSnackbar({
        open: true,
        message: 'Pedido realizado com sucesso!',
        severity: 'success',
      });
    } else {
      setPassoAtivo(prev => prev + 1);
    }
  };

  const handlePassoAnterior = () => {
    setPassoAtivo(prev => prev - 1);
  };

  const renderConteudoPasso = () => {
    switch (passoAtivo) {
      case 0:
        return (
          <Box>
            <List>
              {carrinho.items.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    mb: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                  }}
                >
                  <Box
                    component="img"
                    src={item.imagem}
                    alt={item.nome}
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: 1,
                      mr: 2,
                      objectFit: 'cover',
                    }}
                  />
                  <ListItemText
                    primary={item.nome}
                    secondary={
                      <>
                        <Typography variant="body2" color="text.secondary">
                          {item.observacoes}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          R$ {item.preco.toFixed(2)}
                        </Typography>
                      </>
                    }
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantidade(item.id, -1)}
                    >
                      <Remove />
                    </IconButton>
                    <Typography>{item.quantidade}</Typography>
                    <IconButton
                      size="small"
                      onClick={() => handleQuantidade(item.id, 1)}
                    >
                      <Add />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoverItem(item.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Total:</Typography>
              <Typography variant="h6" color="primary">
                R$ {calcularTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        );

      case 1:
        return (
          <Box>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Tipo de Entrega</FormLabel>
              <RadioGroup
                value={dadosEntrega.tipoEntrega}
                onChange={(e) => setDadosEntrega(prev => ({
                  ...prev,
                  tipoEntrega: e.target.value,
                }))}
              >
                <FormControlLabel
                  value="delivery"
                  control={<Radio />}
                  label="Delivery (+ R$ 5,00)"
                />
                <FormControlLabel
                  value="retirada"
                  control={<Radio />}
                  label="Retirar no local"
                />
              </RadioGroup>
            </FormControl>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Nome completo"
                  value={dadosEntrega.nome}
                  onChange={(e) => setDadosEntrega(prev => ({
                    ...prev,
                    nome: e.target.value,
                  }))}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Telefone"
                  value={dadosEntrega.telefone}
                  onChange={(e) => setDadosEntrega(prev => ({
                    ...prev,
                    telefone: e.target.value,
                  }))}
                  required
                />
              </Grid>
              {dadosEntrega.tipoEntrega === 'delivery' && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Endereço"
                      value={dadosEntrega.endereco}
                      onChange={(e) => setDadosEntrega(prev => ({
                        ...prev,
                        endereco: e.target.value,
                      }))}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Complemento"
                      value={dadosEntrega.complemento}
                      onChange={(e) => setDadosEntrega(prev => ({
                        ...prev,
                        complemento: e.target.value,
                      }))}
                    />
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box>
            <FormControl component="fieldset" sx={{ mb: 3 }}>
              <FormLabel component="legend">Forma de Pagamento</FormLabel>
              <RadioGroup
                value={dadosPagamento.metodo}
                onChange={(e) => setDadosPagamento(prev => ({
                  ...prev,
                  metodo: e.target.value,
                }))}
              >
                <FormControlLabel
                  value="pix"
                  control={<Radio />}
                  label="PIX"
                />
                <FormControlLabel
                  value="cartao"
                  control={<Radio />}
                  label="Cartão (Crédito/Débito)"
                />
                <FormControlLabel
                  value="dinheiro"
                  control={<Radio />}
                  label="Dinheiro"
                />
              </RadioGroup>
            </FormControl>

            {dadosPagamento.metodo === 'dinheiro' && (
              <TextField
                fullWidth
                label="Troco para quanto?"
                value={dadosPagamento.troco}
                onChange={(e) => setDadosPagamento(prev => ({
                  ...prev,
                  troco: e.target.value,
                }))}
                type="number"
                InputProps={{
                  startAdornment: 'R$',
                }}
              />
            )}

            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Resumo do Pedido
              </Typography>
              <Typography>
                Subtotal: R$ {calcularTotal().toFixed(2)}
              </Typography>
              {dadosEntrega.tipoEntrega === 'delivery' && (
                <Typography>
                  Taxa de entrega: R$ 5,00
                </Typography>
              )}
              <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
                Total: R$ {calcularTotal().toFixed(2)}
              </Typography>
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <CheckCircle color="success" sx={{ fontSize: 60, mb: 2 }} />
            <Typography variant="h5" gutterBottom>
              Pedido Confirmado!
            </Typography>
            <Typography color="text.secondary" paragraph>
              Seu pedido foi recebido e está sendo preparado.
            </Typography>
            <Typography variant="h6" gutterBottom>
              Tempo estimado de entrega: 45-60 minutos
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Detalhes do Pedido:
              </Typography>
              <Typography>
                Número do Pedido: #{Math.floor(Math.random() * 10000)}
              </Typography>
              <Typography>
                Total: R$ {calcularTotal().toFixed(2)}
              </Typography>
              <Typography>
                Forma de Pagamento: {dadosPagamento.metodo.toUpperCase()}
              </Typography>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Carrinho de Compras
      </Typography>

      <Stepper activeStep={passoAtivo} sx={{ mb: 4 }}>
        {passos.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Paper sx={{ p: 3 }}>
        {renderConteudoPasso()}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            onClick={handlePassoAnterior}
            disabled={passoAtivo === 0}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            onClick={handleProximoPasso}
            disabled={carrinho.items.length === 0}
          >
            {passoAtivo === passos.length - 1 ? 'Finalizar' : 'Próximo'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Carrinho; 