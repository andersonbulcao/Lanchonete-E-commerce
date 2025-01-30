import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import {
  Facebook,
  Instagram,
  Twitter,
  WhatsApp
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const FooterRoot = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const FooterLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
});

const SocialIcons = styled(Box)({
  display: 'flex',
  gap: '1rem',
  marginTop: '1rem',
});

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Implementar lógica de inscrição na newsletter
    console.log('Email inscrito:', email);
    setEmail('');
  };

  return (
    <FooterRoot>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Sobre Nós
            </Typography>
            <Typography variant="body2">
              Servindo os melhores lanches da cidade desde 2024.
              Qualidade e sabor incomparáveis para você.
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Links Rápidos
            </Typography>
            <Box display="flex" flexDirection="column" gap={1}>
              <FooterLink href="/politica-privacidade">
                Política de Privacidade
              </FooterLink>
              <FooterLink href="/termos-servico">
                Termos de Serviço
              </FooterLink>
              <FooterLink href="/trabalhe-conosco">
                Trabalhe Conosco
              </FooterLink>
            </Box>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Newsletter
            </Typography>
            <form onSubmit={handleNewsletterSubmit}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{
                  backgroundColor: 'white',
                  borderRadius: 1,
                  marginBottom: 2
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                fullWidth
              >
                Inscrever-se
              </Button>
            </form>

            <SocialIcons>
              <IconButton color="inherit">
                <Facebook />
              </IconButton>
              <IconButton color="inherit">
                <Instagram />
              </IconButton>
              <IconButton color="inherit">
                <Twitter />
              </IconButton>
              <IconButton color="inherit">
                <WhatsApp />
              </IconButton>
            </SocialIcons>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          align="center"
          sx={{ marginTop: 4, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 2 }}
        >
          © {new Date().getFullYear()} Lanchonete React. Todos os direitos reservados.
        </Typography>
      </Container>
    </FooterRoot>
  );
};

export default Footer; 