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
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  LocalOffer,
} from '@mui/icons-material';

// Mock inicial de cupons
const cuponsMock = [
  {
    id: 1,
    codigo: 'PRIMEIRA10',
    desconto: 10,
    tipo: 'percentual',
    descricao: 'Ganhe 10% de desconto na sua primeira compra',
    validade: '2024-03-31',
    minimoCompra: 30,
    usoMaximo: 1,
    ativo: true,
  },
  {
    id: 2,
    codigo: 'FRETE0',
    desconto: 0,
    tipo: 'frete',
    descricao: 'Frete grátis para compras acima de R$ 50',
    validade: '2024-03-31',
    minimoCompra: 50,
    usoMaximo: null,
    ativo: true,
  },
  {
    id: 3,
    codigo: 'COMBO25',
    desconto: 25,
    tipo: 'percentual',
    descricao: 'Ganhe 25% de desconto em combos',
    validade: '2024-03-31',
    minimoCompra: 60,
    usoMaximo: 3,
    ativo: true,
  },
];

const GerenciarCupons = () => {
  const [cupons, setCupons] = useState(cuponsMock);
  const [open, setOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({
    codigo: '',
    desconto: '',
    tipo: 'percentual',
    descricao: '',
    validade: '',
    minimoCompra: '',
    usoMaximo: '',
    ativo: true,
  });

  const handleOpen = (cupom = null) => {
    if (cupom) {
      setEditando(cupom);
      setFormData({
        codigo: cupom.codigo,
        desconto: cupom.desconto,
        tipo: cupom.tipo,
        descricao: cupom.descricao,
        validade: cupom.validade,
        minimoCompra: cupom.minimoCompra,
        usoMaximo: cupom.usoMaximo || '',
        ativo: cupom.ativo,
      });
    } else {
      setFormData({
        codigo: '',
        desconto: '',
        tipo: 'percentual',
        descricao: '',
        validade: '',
        minimoCompra: '',
        usoMaximo: '',
        ativo: true,
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
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editando) {
      setCupons(cupons.map(cupom =>
        cupom.id === editando.id ? { ...cupom, ...formData } : cupom
      ));
    } else {
      setCupons([...cupons, {
        ...formData,
        id: cupons.length + 1,
      }]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setCupons(cupons.filter(cupom => cupom.id !== id));
  };

  const isValido = (validade) => {
    return new Date(validade) > new Date();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4">Gerenciar Cupons</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpen()}
        >
          Novo Cupom
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Desconto</TableCell>
              <TableCell>Validade</TableCell>
              <TableCell>Mínimo</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cupons.map((cupom) => (
              <TableRow key={cupom.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocalOffer sx={{ mr: 1 }} color="primary" />
                    {cupom.codigo}
                  </Box>
                </TableCell>
                <TableCell>
                  {cupom.tipo === 'percentual' ? 'Desconto %' : 'Frete Grátis'}
                </TableCell>
                <TableCell>
                  {cupom.tipo === 'percentual' ? `${cupom.desconto}%` : 'Frete Grátis'}
                </TableCell>
                <TableCell>
                  {new Date(cupom.validade).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  R$ {cupom.minimoCompra.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Chip
                    label={isValido(cupom.validade) ? 'Ativo' : 'Expirado'}
                    color={isValido(cupom.validade) ? 'success' : 'error'}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(cupom)} color="primary">
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(cupom.id)} color="error">
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
          {editando ? 'Editar Cupom' : 'Novo Cupom'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Código"
                  name="codigo"
                  value={formData.codigo}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth required>
                  <InputLabel>Tipo</InputLabel>
                  <Select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    label="Tipo"
                  >
                    <MenuItem value="percentual">Desconto Percentual</MenuItem>
                    <MenuItem value="frete">Frete Grátis</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {formData.tipo === 'percentual' && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Desconto (%)"
                    name="desconto"
                    type="number"
                    value={formData.desconto}
                    onChange={handleChange}
                    required
                  />
                </Grid>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Valor Mínimo"
                  name="minimoCompra"
                  type="number"
                  value={formData.minimoCompra}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Validade"
                  name="validade"
                  type="date"
                  value={formData.validade}
                  onChange={handleChange}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Uso Máximo"
                  name="usoMaximo"
                  type="number"
                  value={formData.usoMaximo}
                  onChange={handleChange}
                  helperText="Deixe em branco para uso ilimitado"
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

export default GerenciarCupons; 