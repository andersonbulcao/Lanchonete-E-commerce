import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  WhatsApp,
  Phone,
  Email,
  LocationOn,
} from '@mui/icons-material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Informações de Contato */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Contato
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Phone sx={{ mr: 1 }} />
              <Typography>(11) 1234-5678</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <WhatsApp sx={{ mr: 1 }} />
              <Typography>(11) 98765-4321</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Email sx={{ mr: 1 }} />
              <Typography>contato@lanchonete.com</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <LocationOn sx={{ mr: 1 }} />
              <Typography>Rua da Lanchonete, 123</Typography>
            </Box>
          </Grid>

          {/* Links Rápidos */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Links Rápidos
            </Typography>
            <Link
              component={RouterLink}
              to="/cardapio"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Cardápio
            </Link>
            <Link
              component={RouterLink}
              to="/promocoes"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Promoções
            </Link>
            <Link
              component={RouterLink}
              to="/sobre"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Sobre Nós
            </Link>
            <Link
              component={RouterLink}
              to="/contato"
              color="inherit"
              display="block"
            >
              Contato
            </Link>
          </Grid>

          {/* Informações Legais */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Informações Legais
            </Typography>
            <Link
              component={RouterLink}
              to="/politica-privacidade"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Política de Privacidade
            </Link>
            <Link
              component={RouterLink}
              to="/termos-servico"
              color="inherit"
              display="block"
              sx={{ mb: 1 }}
            >
              Termos de Serviço
            </Link>
            <Link
              component={RouterLink}
              to="/trabalhe-conosco"
              color="inherit"
              display="block"
            >
              Trabalhe Conosco
            </Link>
          </Grid>

          {/* Redes Sociais */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom>
              Redes Sociais
            </Typography>
            <Box>
              <IconButton color="inherit" aria-label="Facebook">
                <Facebook />
              </IconButton>
              <IconButton color="inherit" aria-label="Instagram">
                <Instagram />
              </IconButton>
              <IconButton color="inherit" aria-label="Twitter">
                <Twitter />
              </IconButton>
              <IconButton color="inherit" aria-label="WhatsApp">
                <WhatsApp />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 2 }}>
              Horário de Funcionamento:
              <br />
              Segunda a Domingo: 11h às 23h
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

        <Typography variant="body2" align="center">
          © {new Date().getFullYear()} Lanchonete React. Todos os direitos reservados.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 