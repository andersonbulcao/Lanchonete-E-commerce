import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Snackbar,
  Alert,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Facebook,
  Google,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [tab, setTab] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [registerData, setRegisterData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
  });

  const handleLoginSubmit = (event) => {
    event.preventDefault();
    // Aqui você implementaria a lógica de login
    console.log('Login:', loginData);
    setSnackbar({
      open: true,
      message: 'Login realizado com sucesso!',
      severity: 'success',
    });
  };

  const handleRegisterSubmit = (event) => {
    event.preventDefault();
    // Aqui você implementaria a lógica de registro
    if (registerData.password !== registerData.confirmPassword) {
      setSnackbar({
        open: true,
        message: 'As senhas não coincidem!',
        severity: 'error',
      });
      return;
    }
    console.log('Registro:', registerData);
    setSnackbar({
      open: true,
      message: 'Registro realizado com sucesso!',
      severity: 'success',
    });
  };

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegisterChange = (event) => {
    const { name, value } = event.target;
    setRegisterData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Tabs
          value={tab}
          onChange={(_, newValue) => setTab(newValue)}
          centered
          sx={{ mb: 3 }}
        >
          <Tab label="Login" />
          <Tab label="Cadastro" />
        </Tabs>

        {tab === 0 ? (
          // Login Form
          <Box component="form" onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              value={loginData.email}
              onChange={handleLoginChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={loginData.password}
              onChange={handleLoginChange}
              required
              sx={{ mb: 3 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mb: 2 }}
            >
              Entrar
            </Button>

            <Link
              component={RouterLink}
              to="/recuperar-senha"
              color="primary"
              align="center"
              display="block"
              sx={{ mb: 3 }}
            >
              Esqueceu sua senha?
            </Link>

            <Divider sx={{ mb: 2 }}>ou entre com</Divider>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Google />}
                  onClick={() => console.log('Login com Google')}
                >
                  Google
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  startIcon={<Facebook />}
                  onClick={() => console.log('Login com Facebook')}
                >
                  Facebook
                </Button>
              </Grid>
            </Grid>
          </Box>
        ) : (
          // Register Form
          <Box component="form" onSubmit={handleRegisterSubmit}>
            <TextField
              fullWidth
              label="Nome completo"
              name="name"
              value={registerData.name}
              onChange={handleRegisterChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              type="email"
              value={registerData.email}
              onChange={handleRegisterChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Telefone"
              name="phone"
              value={registerData.phone}
              onChange={handleRegisterChange}
              required
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={registerData.password}
              onChange={handleRegisterChange}
              required
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              fullWidth
              label="Confirmar senha"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={registerData.confirmPassword}
              onChange={handleRegisterChange}
              required
              sx={{ mb: 3 }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ mb: 2 }}
            >
              Cadastrar
            </Button>

            <Typography variant="body2" align="center" color="text.secondary">
              Ao se cadastrar, você concorda com nossos{' '}
              <Link component={RouterLink} to="/termos-servico">
                Termos de Serviço
              </Link>{' '}
              e{' '}
              <Link component={RouterLink} to="/politica-privacidade">
                Política de Privacidade
              </Link>
            </Typography>
          </Box>
        )}
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

export default Login; 