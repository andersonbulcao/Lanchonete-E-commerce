import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  TextField,
  Snackbar,
  Alert,
  Chip,
} from '@mui/material';
import {
  LocalOffer,
  ContentCopy,
  Timer,
} from '@mui/icons-material';

// Mock de cupons - em um projeto real viria da API
const cuponsMock = [
  {
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

const Cupons = () => {
  const [cupons] = useState(cuponsMock);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleCopiarCupom = (codigo) => {
    navigator.clipboard.writeText(codigo).then(() => {
      setSnackbar({
        open: true,
        message: 'Cupom copiado com sucesso!',
        severity: 'success',
      });
    });
  };

  const isValido = (validade) => {
    return new Date(validade) > new Date();
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Cupons de Desconto
      </Typography>

      <Box sx={{ mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Aplicar Cupom
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8} md={6}>
              <TextField
                fullWidth
                label="Código do Cupom"
                placeholder="Digite seu código"
                InputProps={{
                  endAdornment: (
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ ml: 1 }}
                    >
                      Aplicar
                    </Button>
                  ),
                }}
              />
            </Grid>
          </Grid>
        </Paper>
      </Box>

      <Grid container spacing={3}>
        {cupons.map((cupom) => (
          <Grid item xs={12} md={6} key={cupom.codigo}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LocalOffer color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">
                    {cupom.tipo === 'percentual'
                      ? `${cupom.desconto}% OFF`
                      : 'Frete Grátis'}
                  </Typography>
                </Box>

                <Typography variant="body1" paragraph>
                  {cupom.descricao}
                </Typography>

                <Box sx={{ mb: 2 }}>
                  <Chip
                    icon={<Timer />}
                    label={`Válido até ${new Date(cupom.validade).toLocaleDateString()}`}
                    color={isValido(cupom.validade) ? 'primary' : 'error'}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {cupom.usoMaximo && (
                    <Chip
                      label={`Uso máximo: ${cupom.usoMaximo}x`}
                      size="small"
                    />
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mr: 2 }}
                  >
                    Compra mínima: R$ {cupom.minimoCompra.toFixed(2)}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    value={cupom.codigo}
                    size="small"
                    InputProps={{
                      readOnly: true,
                      sx: { bgcolor: 'action.hover' },
                    }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<ContentCopy />}
                    onClick={() => handleCopiarCupom(cupom.codigo)}
                  >
                    Copiar
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
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

export default Cupons; 