import React, { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import { Send as SendIcon } from '@mui/icons-material';

const vagasDisponiveis = [
  'Atendente',
  'Cozinheiro(a)',
  'Auxiliar de Cozinha',
  'Entregador(a)',
  'Gerente de Loja',
  'Operador(a) de Caixa',
];

const TrabalheConosco = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    vaga: '',
    experiencia: '',
    mensagem: '',
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você implementaria a lógica para enviar o currículo
    console.log('Dados do formulário:', formData);
    setSnackbar({
      open: true,
      message: 'Currículo enviado com sucesso! Entraremos em contato.',
      severity: 'success',
    });
    // Limpar formulário
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      vaga: '',
      experiencia: '',
      mensagem: '',
    });
  };

  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Trabalhe Conosco
        </Typography>

        <Typography variant="body1" paragraph align="center" sx={{ mb: 4 }}>
          Junte-se à nossa equipe e faça parte de uma empresa em crescimento!
          Estamos sempre em busca de pessoas talentosas e apaixonadas por gastronomia.
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Vagas Disponíveis
              </Typography>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nome Completo"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="E-mail"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Vaga de Interesse</InputLabel>
                <Select
                  name="vaga"
                  value={formData.vaga}
                  onChange={handleChange}
                  label="Vaga de Interesse"
                >
                  {vagasDisponiveis.map((vaga) => (
                    <MenuItem key={vaga} value={vaga}>
                      {vaga}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Experiência Profissional"
                name="experiencia"
                value={formData.experiencia}
                onChange={handleChange}
                multiline
                rows={4}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Mensagem Adicional"
                name="mensagem"
                value={formData.mensagem}
                onChange={handleChange}
                multiline
                rows={3}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<SendIcon />}
                fullWidth
              >
                Enviar Currículo
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Benefícios
          </Typography>
          <Typography component="ul">
            <li>Vale Refeição</li>
            <li>Vale Transporte</li>
            <li>Plano de Saúde</li>
            <li>Plano Odontológico</li>
            <li>Desconto em produtos</li>
            <li>Ambiente de trabalho agradável</li>
          </Typography>
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

export default TrabalheConosco; 