import React from 'react';
import { Box, Button, Container, Typography, Grid, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)({
  backgroundImage: 'url(https://source.unsplash.com/1600x900/?burger)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '70vh',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  }
});

const HeroContent = styled(Box)({
  position: 'relative',
  color: 'white',
  textAlign: 'center',
  zIndex: 1,
});

const ProductCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  }
});

const destaques = [
  {
    id: 1,
    nome: 'X-Burger Especial',
    preco: 'R$ 25,90',
    imagem: 'https://source.unsplash.com/400x300/?hamburger'
  },
  {
    id: 2,
    nome: 'Combo Família',
    preco: 'R$ 89,90',
    imagem: 'https://source.unsplash.com/400x300/?french-fries'
  },
  {
    id: 3,
    nome: 'Milk Shake',
    preco: 'R$ 15,90',
    imagem: 'https://source.unsplash.com/400x300/?milkshake'
  }
];

const Home = () => {
  return (
    <Box>
      <HeroSection>
        <Container>
          <HeroContent>
            <Typography variant="h2" component="h1" gutterBottom>
              Peça seus lanches favoritos online!
            </Typography>
            <Typography variant="h5" gutterBottom>
              Entregamos qualidade e sabor diretamente na sua porta
            </Typography>
            <Button variant="contained" color="primary" size="large" sx={{ mt: 4 }}>
              Ver Cardápio
            </Button>
          </HeroContent>
        </Container>
      </HeroSection>

      <Container sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom textAlign="center">
          Destaques do Dia
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {destaques.map((produto) => (
            <Grid item key={produto.id} xs={12} sm={6} md={4}>
              <ProductCard>
                <CardMedia
                  component="img"
                  height="200"
                  image={produto.imagem}
                  alt={produto.nome}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h3">
                    {produto.nome}
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {produto.preco}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    Adicionar ao Carrinho
                  </Button>
                </CardActions>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 