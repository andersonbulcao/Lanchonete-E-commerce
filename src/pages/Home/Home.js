import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Paper,
  Rating,
  Divider,
  Stack,
} from '@mui/material';
import {
  RestaurantMenu,
  LocalShipping,
  AccessTime,
  Star,
  LocalOffer,
} from '@mui/icons-material';

const Home = () => {
  const navigate = useNavigate();

  // Produtos em destaque
  const destaques = [
    {
      id: 1,
      nome: 'X-Burger Especial',
      descricao: 'Hambúrguer artesanal com queijo, bacon, alface e tomate',
      preco: 25.90,
      imagem: 'https://source.unsplash.com/featured/?burger',
      avaliacao: 4.8,
    },
    {
      id: 2,
      nome: 'Batata Frita Grande',
      descricao: 'Batata frita crocante com sal e temperos especiais',
      preco: 13.90,
      imagem: 'https://source.unsplash.com/featured/?fries',
      avaliacao: 4.5,
    },
    {
      id: 3,
      nome: 'Milk Shake',
      descricao: 'Milk Shake cremoso de chocolate com chantilly',
      preco: 15.90,
      imagem: 'https://source.unsplash.com/featured/?milkshake',
      avaliacao: 4.7,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?restaurant,burger)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            color="white"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Sabor e Qualidade
          </Typography>
          <Typography
            variant="h5"
            color="white"
            paragraph
            sx={{ mb: 4, maxWidth: 600 }}
          >
            Os melhores lanches da cidade, feitos com ingredientes selecionados
            e muito carinho para você.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<RestaurantMenu />}
            onClick={() => navigate('/cardapio')}
            sx={{ mr: 2 }}
          >
            Ver Cardápio
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ color: 'white', borderColor: 'white' }}
            onClick={() => navigate('/promocoes')}
          >
            Promoções
          </Button>
        </Container>
      </Box>

      {/* Destaques Section */}
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Destaques do Dia
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          {destaques.map((produto) => (
            <Grid item xs={12} sm={6} md={4} key={produto.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={produto.imagem}
                  alt={produto.nome}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h6" component="h3">
                    {produto.nome}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {produto.descricao}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={produto.avaliacao} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      {produto.avaliacao}
                    </Typography>
                  </Box>
                  <Typography variant="h6" color="primary">
                    R$ {produto.preco.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <LocalShipping sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Entrega Rápida
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Entregamos em toda a cidade com rapidez e segurança
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <AccessTime sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Horário Estendido
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Funcionamos todos os dias das 11h às 23h
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%', textAlign: 'center' }}>
                <LocalOffer sx={{ fontSize: 40, color: 'primary.main', mb: 2 }} />
                <Typography variant="h6" gutterBottom>
                  Promoções Diárias
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Descontos especiais todos os dias da semana
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box
        sx={{
          position: 'relative',
          height: '50vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: 'url(https://source.unsplash.com/1600x900/?kitchen,cooking)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography
            variant="h3"
            color="white"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Faça seu pedido agora!
          </Typography>
          <Typography
            variant="h6"
            color="white"
            paragraph
            sx={{ mb: 4 }}
          >
            Peça online e receba no conforto da sua casa
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/cardapio')}
            sx={{ minWidth: 200 }}
          >
            Fazer Pedido
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default Home; 