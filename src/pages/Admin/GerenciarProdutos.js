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
} from '@mui/material';
import { Edit, Delete, Add } from '@mui/icons-material';

// Dados mockados com imagens
const produtosIniciais = [
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

const categorias = ['lanches', 'bebidas', 'sobremesas', 'porções'];

const GerenciarProdutos = () => {
  const [produtos, setProdutos] = useState(produtosIniciais);
  const [openDialog, setOpenDialog] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    nome: '',
    categoria: '',
    preco: '',
    descricao: '',
    estoque: '',
    imagem: '',
    ingredientes: [],
    tempoPreparoMin: ''
  });

  const handleOpenDialog = (produto = null) => {
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
        ingredientes: [],
        tempoPreparoMin: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditando(null);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const produtoFormatado = {
      ...formData,
      preco: Number(formData.preco),
      estoque: Number(formData.estoque),
      tempoPreparoMin: Number(formData.tempoPreparoMin),
      ingredientes: formData.ingredientes.length ? formData.ingredientes : [],
    };
    
    if (editando) {
      setProdutos(produtos.map(p => 
        p.id === editando ? { ...produtoFormatado, id: editando } : p
      ));
    } else {
      setProdutos([...produtos, { ...produtoFormatado, id: Date.now() }]);
    }
    handleCloseDialog();
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
          onClick={() => handleOpenDialog()}
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
                    sx={{ width: 56, height: 56 }}
                  />
                </TableCell>
                <TableCell>{produto.nome}</TableCell>
                <TableCell>{produto.categoria}</TableCell>
                <TableCell>R$ {Number(produto.preco).toFixed(2)}</TableCell>
                <TableCell>{produto.estoque}</TableCell>
                <TableCell>{produto.tempoPreparoMin} min</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(produto)}
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

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editando ? 'Editar Produto' : 'Novo Produto'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              label="Nome do Produto"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              fullWidth
              required
            />
            <FormControl fullWidth required>
              <InputLabel>Categoria</InputLabel>
              <Select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                label="Categoria"
              >
                {categorias.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Preço"
              name="preco"
              type="number"
              value={formData.preco}
              onChange={handleChange}
              fullWidth
              required
              inputProps={{ step: '0.01' }}
            />
            <TextField
              label="URL da Imagem"
              name="imagem"
              value={formData.imagem}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <TextField
              label="Ingredientes (separados por vírgula)"
              name="ingredientes"
              value={Array.isArray(formData.ingredientes) ? formData.ingredientes.join(', ') : ''}
              onChange={(e) => handleChange({
                target: {
                  name: 'ingredientes',
                  value: e.target.value.split(',').map(item => item.trim())
                }
              })}
              fullWidth
            />
            <TextField
              label="Tempo de Preparo (minutos)"
              name="tempoPreparoMin"
              type="number"
              value={formData.tempoPreparoMin}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Estoque"
              name="estoque"
              type="number"
              value={formData.estoque}
              onChange={handleChange}
              fullWidth
              required
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editando ? 'Salvar' : 'Criar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default GerenciarProdutos; 