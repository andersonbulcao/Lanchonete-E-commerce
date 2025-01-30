import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Link,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const FormContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: 400,
  margin: '0 auto',
  marginTop: theme.spacing(8),
}));

const Form = styled('form')({
  width: '100%',
  marginTop: 2,
});

const SubmitButton = styled(Button)({
  margin: '24px 0 16px',
});

const Login = () => {
  const [tab, setTab] = useState(0);
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
    nome: '',
    confirmarSenha: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTabChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementar lógica de autenticação
    console.log('Form submitted:', formData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <FormContainer elevation={3}>
        <Typography component="h1" variant="h5">
          {tab === 0 ? 'Entrar' : 'Criar Conta'}
        </Typography>

        <Box sx={{ width: '100%', mb: 3 }}>
          <Tabs
            value={tab}
            onChange={handleTabChange}
            centered
            textColor="primary"
            indicatorColor="primary"
          >
            <Tab label="Login" />
            <Tab label="Cadastro" />
          </Tabs>
        </Box>

        <Form onSubmit={handleSubmit}>
          {tab === 1 && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Nome completo"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
          )}

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Senha"
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleChange}
          />

          {tab === 1 && (
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Confirmar senha"
              name="confirmarSenha"
              type="password"
              value={formData.confirmarSenha}
              onChange={handleChange}
            />
          )}

          <SubmitButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {tab === 0 ? 'Entrar' : 'Cadastrar'}
          </SubmitButton>

          {tab === 0 && (
            <Box textAlign="center">
              <Link href="#" variant="body2">
                Esqueceu sua senha?
              </Link>
            </Box>
          )}
        </Form>
      </FormContainer>
    </Container>
  );
};

export default Login; 