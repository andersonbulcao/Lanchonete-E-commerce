import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  Snackbar,
  Alert,
  IconButton,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  AddShoppingCart,
  RemoveShoppingCart,
  Timer,
  Add,
  Remove,
} from '@mui/icons-material';

// Usando os mesmos produtos do GerenciarProdutos
const produtos = [
  {
    id: 1,
    nome: 'X-Burger Especial',
    categoria: 'lanches',
    preco: 25.90,
    descricao: 'Hambúrguer artesanal, queijo cheddar, bacon, alface e tomate',
    estoque: 50,
    imagem: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&auto=format',
    ingredientes: ['Pão brioche', 'Hambúrguer 180g', 'Queijo cheddar', 'Bacon', 'Alface', 'Tomate'],
    tempoPreparoMin: 20
  },
  {
    id: 2,
    nome: 'Refrigerante Cola',
    categoria: 'bebidas',
    preco: 6.00,
    descricao: 'Refrigerante 350ml',
    estoque: 100,
    imagem: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=500&auto=format',
    ingredientes: [],
    tempoPreparoMin: 1
  },
  {
    id: 3,
    nome: 'Milk Shake',
    categoria: 'sobremesas',
    preco: 15.90,
    descricao: 'Milk Shake 400ml (Chocolate, Morango ou Baunilha)',
    estoque: 30,
    imagem: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=500&auto=format',
    ingredientes: ['Sorvete', 'Leite', 'Calda'],
    tempoPreparoMin: 10
  },
];

const Cardapio = () => {
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos');
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [quantidade, setQuantidade] = useState(1);
  const [observacoes, setObservacoes] = useState('');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [personalizacoes, setPersonalizacoes] = useState({});

  const handleOpenDialog = (produto) => {
    setProdutoSelecionado(produto);
    setOpenDialog(true);
    setQuantidade(1);
    setObservacoes('');
    setPersonalizacoes({});
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProdutoSelecionado(null);
  };

  const handleAddToCart = () => {
    // Aqui você implementaria a lógica para adicionar ao carrinho
    const item = {
      ...produtoSelecionado,
      quantidade,
      observacoes,
      personalizacoes: Object.entries(personalizacoes)
        .filter(([_, value]) => value)
        .map(([key]) => key),
    };
    console.log('Item adicionado ao carrinho:', item);
    
    setSnackbar({
      open: true,
      message: 'Produto adicionado ao carrinho!',
      severity: 'success'
    });
    handleCloseDialog();
  };

  const handleChangeQuantidade = (delta) => {
    setQuantidade(prev => Math.max(1, prev + delta));
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const produtosFiltrados = categoriaAtiva === 'todos'
    ? produtos
    : produtos.filter(p => p.categoria === categoriaAtiva);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Cardápio
      </Typography>

      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={categoriaAtiva}
          onChange={(_, newValue) => setCategoriaAtiva(newValue)}
          centered
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Tab label="Todos" value="todos" />
          <Tab label="Lanches" value="lanches" />
          <Tab label="Bebidas" value="bebidas" />
          <Tab label="Sobremesas" value="sobremesas" />
          <Tab label="Porções" value="porcoes" />
        </Tabs>
      </Paper>

      <Grid container spacing={3}>
        {produtosFiltrados.map((produto) => (
          <Grid item xs={12} sm={6} md={4} key={produto.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={produto.imagem}
                alt={produto.nome}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="div">
                  {produto.nome}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {produto.descricao}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" color="primary">
                    R$ {produto.preco.toFixed(2)}
                  </Typography>
                  <Chip
                    icon={<Timer />}
                    label={`${produto.tempoPreparoMin} min`}
                    size="small"
                    color="secondary"
                  />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<AddShoppingCart />}
                  onClick={() => handleOpenDialog(produto)}
                >
                  Adicionar ao Carrinho
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        {produtoSelecionado && (
          <>
            <DialogTitle>
              Personalizar Pedido - {produtoSelecionado.nome}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                {produtoSelecionado.ingredientes.length > 0 && (
                  <Box>
                    <Typography variant="subtitle1" gutterBottom>
                      Ingredientes:
                    </Typography>
                    <FormGroup>
                      {produtoSelecionado.ingredientes.map((ingrediente) => (
                        <FormControlLabel
                          key={ingrediente}
                          control={
                            <Checkbox
                              checked={!personalizacoes[`sem_${ingrediente}`]}
                              onChange={(e) => setPersonalizacoes(prev => ({
                                ...prev,
                                [`sem_${ingrediente}`]: !e.target.checked
                              }))}
                            />
                          }
                          label={ingrediente}
                        />
                      ))}
                    </FormGroup>
                  </Box>
                )}

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography>Quantidade:</Typography>
                  <IconButton onClick={() => handleChangeQuantidade(-1)} disabled={quantidade <= 1}>
                    <Remove />
                  </IconButton>
                  <Typography>{quantidade}</Typography>
                  <IconButton onClick={() => handleChangeQuantidade(1)}>
                    <Add />
                  </IconButton>
                </Box>

                <TextField
                  label="Observações"
                  multiline
                  rows={3}
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  fullWidth
                  placeholder="Ex: Ponto da carne, sem cebola, etc."
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1">
                    Total:
                  </Typography>
                  <Typography variant="h6" color="primary">
                    R$ {(produtoSelecionado.preco * quantidade).toFixed(2)}
                  </Typography>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} startIcon={<RemoveShoppingCart />}>
                Cancelar
              </Button>
              <Button
                onClick={handleAddToCart}
                variant="contained"
                color="primary"
                startIcon={<AddShoppingCart />}
              >
                Adicionar ao Carrinho
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Cardapio; 