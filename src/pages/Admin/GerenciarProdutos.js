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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Avatar,
  Grid,
  InputAdornment,
  Rating,
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

// Dados mockados com imagens
const produtosIniciais = [
  {
    id: 1,
    nome: 'X-Burger Especial',
    categoria: 'Hambúrgueres',
    preco: 25.90,
    descricao: 'Hambúrguer artesanal com queijo, bacon, alface e tomate',
    estoque: 50,
    imagem: 'https://source.unsplash.com/featured/?burger',
    ingredientes: ['Pão', 'Hambúrguer 180g', 'Queijo', 'Bacon', 'Alface', 'Tomate'],
    tempoPreparo: '20-25 min',
    avaliacaoMedia: 4.5,
    numeroAvaliacoes: 128,
  },
  {
    id: 2,
    nome: 'Batata Frita Grande',
    categoria: 'Acompanhamentos',
    preco: 13.90,
    descricao: 'Batata frita crocante com sal e temperos',
    estoque: 100,
    imagem: 'https://source.unsplash.com/featured/?fries',
    ingredientes: ['Batata', 'Sal', 'Temperos'],
    tempoPreparo: '15-20 min',
    avaliacaoMedia: 4.8,
    numeroAvaliacoes: 95,
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
    tempoPreparo: '10 min',
    avaliacaoMedia: 4.2,
    numeroAvaliacoes: 78,
  },
];

const categorias = ['lanches', 'bebidas', 'sobremesas', 'porções'];

const GerenciarProdutos = () => {
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    preco: '',
    descricao: '',
    estoque: '',
    imagem: '',
    ingredientes: '',
    tempoPreparo: '',
  });

  const handleOpen = (produto = null) => {
    if (produto) {
      setEditando(produto.id);
      setFormData(produto);
    } else {
      setEditando(null);
      setFormData({
        nome: '',
        categoria: '',
        preco: '',
        descricao: '',
        estoque: '',
        imagem: '',
        ingredientes: '',
        tempoPreparo: '',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditando(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editando) {
      setProdutos(produtos.map(produto =>
        produto.id === editando.id ? {
          ...produto,
          ...formData,
          ingredientes: formData.ingredientes.split(',').map(i => i.trim()),
          avaliacaoMedia: produto.avaliacaoMedia,
          numeroAvaliacoes: produto.numeroAvaliacoes,
        } : produto
      ));
    } else {
      setProdutos([...produtos, {
        ...formData,
        id: produtos.length + 1,
        ingredientes: formData.ingredientes.split(',').map(i => i.trim()),
        avaliacaoMedia: 0,
        numeroAvaliacoes: 0,
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(produtos.filter(p => p.id !== id));
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">
          Gerenciar Produtos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={() => handleOpen(null)}
        >
          Novo Produto
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Imagem</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Estoque</TableCell>
              <TableCell>Tempo Preparo</TableCell>
              <TableCell>Avaliação</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtos.map((produto) => (
              <TableRow key={produto.id}>
                <TableCell>
                  <Avatar
                    src={produto.imagem}
                    alt={produto.nome}
                    variant="rounded"
                    sx={{ width: 60, height: 60 }}
                  />
                </TableCell>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.categoria}</TableCell>
                <TableCell>R$ {Number(produto.preco).toFixed(2)}</TableCell>
                <TableCell>{produto.estoque}</TableCell>
                <TableCell>{produto.tempoPreparo}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Rating value={produto.avaliacaoMedia} readOnly precision={0.5} />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({produto.numeroAvaliacoes})
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpen(produto)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(produto.id)}
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editando ? 'Editar Produto' : 'Novo Produto'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="URL da Imagem"
                  name="imagem"
                  value={formData.imagem}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Preço"
                  name="preco"
                  type="number"
                  value={formData.preco}
                  onChange={handleChange}
                  required
                  InputProps={{
                    startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Categoria"
                  name="categoria"
                  value={formData.categoria}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Tempo de Preparo"
                  name="tempoPreparo"
                  value={formData.tempoPreparo}
                  onChange={handleChange}
                  required
                  placeholder="Ex: 20-25 min"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descrição"
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleChange}
                  multiline
                  rows={2}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Ingredientes"
                  name="ingredientes"
                  value={formData.ingredientes}
                  onChange={handleChange}
                  required
                  helperText="Separe os ingredientes por vírgula"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancelar</Button>
            <Button type="submit" variant="contained">
              {editando ? 'Salvar' : 'Criar'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default GerenciarProdutos; 