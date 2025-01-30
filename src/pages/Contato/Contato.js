import React, { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Phone,
  Email,
  LocationOn,
  WhatsApp,
  AccessTime,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ContactContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.grey[100],
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
}));

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
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
    // Implementar lógica de envio do formulário
    console.log('Formulário enviado:', formData);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Entre em Contato
      </Typography>

      <ContactContainer elevation={2}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Envie sua Mensagem
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nome"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Mensagem"
                    name="mensagem"
                    multiline
                    rows={4}
                    value={formData.mensagem}
                    onChange={handleChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                  >
                    Enviar Mensagem
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>

          <Grid item xs={12} md={6}>
            <ContactInfo>
              <Typography variant="h5" gutterBottom>
                Informações de Contato
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Endereço"
                    secondary="Av. Principal, 1000 - Centro, Sua Cidade - Estado"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Telefone"
                    secondary="(11) 1234-5678"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <WhatsApp color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="WhatsApp"
                    secondary="(11) 98765-4321"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Email color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary="contato@lanchonete.com.br"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccessTime color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Horário de Funcionamento"
                    secondary="Segunda a Domingo: 11h às 23h"
                  />
                </ListItem>
              </List>

              <Box sx={{ mt: 4 }}>
                <Typography variant="h6" gutterBottom>
                  Nossa Localização
                </Typography>
                {/* Aqui você pode adicionar um mapa do Google Maps */}
                <Box
                  sx={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: theme => theme.palette.grey[300],
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography>Mapa será carregado aqui</Typography>
                </Box>
              </Box>
            </ContactInfo>
          </Grid>
        </Grid>
      </ContactContainer>
    </Container>
  );
};

export default Contato; 