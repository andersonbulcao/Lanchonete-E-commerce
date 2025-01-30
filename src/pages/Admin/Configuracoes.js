import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Box,
  Switch,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
  CardHeader,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
} from '@mui/material';

// Dados mockados - em um projeto real viriam de uma API
const configuracoesIniciais = {
  geral: {
    nomeEstabelecimento: 'Lanchonete React',
    cnpj: '12.345.678/0001-90',
    telefone: '(11) 1234-5678',
    email: 'contato@lanchonete.com',
    horarioFuncionamento: '11:00 às 23:00',
  },
  entrega: {
    raioEntrega: 5,
    taxaEntrega: 5.00,
    tempoEstimadoEntrega: 45,
    entregaGratisPedidoAcima: 100.00,
    pedidoMinimo: 20.00,
    entregaAtiva: true,
  },
  pagamento: {
    aceitaDinheiro: true,
    aceitaPix: true,
    aceitaCartaoCredito: true,
    aceitaCartaoDebito: true,
    aceitaValeRefeicao: true,
    taxaCartao: 5,
  },
  notificacoes: {
    emailNovoPedido: true,
    emailPedidoCancelado: true,
    emailStatusPedido: true,
    whatsappNovoPedido: true,
    whatsappStatusPedido: true,
  },
};

const Configuracoes = () => {
  const [configuracoes, setConfiguracoes] = useState(configuracoesIniciais);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (section, field, value) => {
    setConfiguracoes(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSave = (section) => {
    // Aqui você implementaria a lógica para salvar no backend
    console.log(`Salvando configurações de ${section}:`, configuracoes[section]);
    setSnackbar({
      open: true,
      message: 'Configurações salvas com sucesso!',
      severity: 'success',
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Configurações do Sistema
      </Typography>

      <Grid container spacing={3}>
        {/* Configurações Gerais */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Informações do Estabelecimento"
              action={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave('geral')}
                >
                  Salvar
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Nome do Estabelecimento"
                    value={configuracoes.geral.nomeEstabelecimento}
                    onChange={(e) => handleChange('geral', 'nomeEstabelecimento', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="CNPJ"
                    value={configuracoes.geral.cnpj}
                    onChange={(e) => handleChange('geral', 'cnpj', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Telefone"
                    value={configuracoes.geral.telefone}
                    onChange={(e) => handleChange('geral', 'telefone', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    value={configuracoes.geral.email}
                    onChange={(e) => handleChange('geral', 'email', e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Horário de Funcionamento"
                    value={configuracoes.geral.horarioFuncionamento}
                    onChange={(e) => handleChange('geral', 'horarioFuncionamento', e.target.value)}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Configurações de Entrega */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Configurações de Entrega"
              action={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave('entrega')}
                >
                  Salvar
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.entrega.entregaAtiva}
                        onChange={(e) => handleChange('entrega', 'entregaAtiva', e.target.checked)}
                      />
                    }
                    label="Entrega Ativa"
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Raio de Entrega (km)"
                    type="number"
                    value={configuracoes.entrega.raioEntrega}
                    onChange={(e) => handleChange('entrega', 'raioEntrega', Number(e.target.value))}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">km</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Taxa de Entrega"
                    type="number"
                    value={configuracoes.entrega.taxaEntrega}
                    onChange={(e) => handleChange('entrega', 'taxaEntrega', Number(e.target.value))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Tempo Estimado (min)"
                    type="number"
                    value={configuracoes.entrega.tempoEstimadoEntrega}
                    onChange={(e) => handleChange('entrega', 'tempoEstimadoEntrega', Number(e.target.value))}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">min</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Entrega Grátis Acima de"
                    type="number"
                    value={configuracoes.entrega.entregaGratisPedidoAcima}
                    onChange={(e) => handleChange('entrega', 'entregaGratisPedidoAcima', Number(e.target.value))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Pedido Mínimo"
                    type="number"
                    value={configuracoes.entrega.pedidoMinimo}
                    onChange={(e) => handleChange('entrega', 'pedidoMinimo', Number(e.target.value))}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Configurações de Pagamento */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Configurações de Pagamento"
              action={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave('pagamento')}
                >
                  Salvar
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.pagamento.aceitaDinheiro}
                        onChange={(e) => handleChange('pagamento', 'aceitaDinheiro', e.target.checked)}
                      />
                    }
                    label="Aceita Dinheiro"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.pagamento.aceitaPix}
                        onChange={(e) => handleChange('pagamento', 'aceitaPix', e.target.checked)}
                      />
                    }
                    label="Aceita PIX"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.pagamento.aceitaCartaoCredito}
                        onChange={(e) => handleChange('pagamento', 'aceitaCartaoCredito', e.target.checked)}
                      />
                    }
                    label="Aceita Cartão de Crédito"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.pagamento.aceitaCartaoDebito}
                        onChange={(e) => handleChange('pagamento', 'aceitaCartaoDebito', e.target.checked)}
                      />
                    }
                    label="Aceita Cartão de Débito"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.pagamento.aceitaValeRefeicao}
                        onChange={(e) => handleChange('pagamento', 'aceitaValeRefeicao', e.target.checked)}
                      />
                    }
                    label="Aceita Vale Refeição"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Taxa de Cartão (%)"
                    type="number"
                    value={configuracoes.pagamento.taxaCartao}
                    onChange={(e) => handleChange('pagamento', 'taxaCartao', Number(e.target.value))}
                    InputProps={{
                      endAdornment: <InputAdornment position="end">%</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Configurações de Notificações */}
        <Grid item xs={12}>
          <Card>
            <CardHeader
              title="Configurações de Notificações"
              action={
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleSave('notificacoes')}
                >
                  Salvar
                </Button>
              }
            />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.notificacoes.emailNovoPedido}
                        onChange={(e) => handleChange('notificacoes', 'emailNovoPedido', e.target.checked)}
                      />
                    }
                    label="Email para Novo Pedido"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.notificacoes.emailPedidoCancelado}
                        onChange={(e) => handleChange('notificacoes', 'emailPedidoCancelado', e.target.checked)}
                      />
                    }
                    label="Email para Pedido Cancelado"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.notificacoes.emailStatusPedido}
                        onChange={(e) => handleChange('notificacoes', 'emailStatusPedido', e.target.checked)}
                      />
                    }
                    label="Email para Atualização de Status"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.notificacoes.whatsappNovoPedido}
                        onChange={(e) => handleChange('notificacoes', 'whatsappNovoPedido', e.target.checked)}
                      />
                    }
                    label="WhatsApp para Novo Pedido"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={configuracoes.notificacoes.whatsappStatusPedido}
                        onChange={(e) => handleChange('notificacoes', 'whatsappStatusPedido', e.target.checked)}
                      />
                    }
                    label="WhatsApp para Atualização de Status"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

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

export default Configuracoes; 