import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalOffer, Timer } from '@mui/icons-material';

const PromotionCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const DiscountBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  backgroundColor: theme.palette.error.main,
  color: 'white',
  padding: '4px 8px',
  borderRadius: theme.shape.borderRadius,
  fontWeight: 'bold',
}));

// Dados mockados - em um projeto real viriam de uma API
const promocoes = [
  {
    id: 1,
    titulo: 'Combo Família',
    descricao: '4 X-Burgers + 4 Refrigerantes + 2 Porções de Batata',
    precoOriginal: 'R$ 159,90',
    precoPromocional: 'R$ 129,90',
    desconto: '20%',
    imagem: 'https://source.unsplash.com/600x400/?burger-combo',
    validade: '31/03/2024',
    dias: 'Todos os dias',
  },
  {
    id: 2,
    titulo: 'Happy Hour',
    descricao: '2 X-Saladas + 2 Cervejas',
    precoOriginal: 'R$ 89,90',
    precoPromocional: 'R$ 69,90',
    desconto: '22%',
    imagem: 'https://source.unsplash.com/600x400/?beer-burger',
    validade: '31/03/2024',
    dias: 'Segunda a Sexta, das 17h às 20h',
  },
  {
    id: 3,
    titulo: 'Combo Individual',
    descricao: '1 X-Tudo + Batata Frita + Refrigerante',
    precoOriginal: 'R$ 49,90',
    precoPromocional: 'R$ 39,90',
    desconto: '20%',
    imagem: 'https://source.unsplash.com/600x400/?hamburger-fries',
    validade: '31/03/2024',
    dias: 'Todos os dias',
  },
  {
    id: 4,
    titulo: 'Sobremesa Especial',
    descricao: 'Milk Shake + Brownie',
    precoOriginal: 'R$ 29,90',
    precoPromocional: 'R$ 24,90',
    desconto: '17%',
    imagem: 'https://source.unsplash.com/600x400/?milkshake-brownie',
    validade: '31/03/2024',
    dias: 'Todos os dias',
  },
];

const Promocoes = () => {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" gutterBottom textAlign="center">
        Promoções
      </Typography>
      <Typography variant="h6" color="text.secondary" textAlign="center" gutterBottom>
        Aproveite nossas ofertas especiais
      </Typography>

      <Grid container spacing={4} sx={{ mt: 2 }}>
        {promocoes.map((promocao) => (
          <Grid item key={promocao.id} xs={12} sm={6} md={6}>
            <PromotionCard>
              <Box sx={{ position: 'relative' }}>
                <CardMedia
                  component="img"
                  height="300"
                  image={promocao.imagem}
                  alt={promocao.titulo}
                />
                <DiscountBadge>
                  {promocao.desconto} OFF
                </DiscountBadge>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h5" component="h2" gutterBottom>
                  {promocao.titulo}
                </Typography>
                <Typography variant="body1" paragraph>
                  {promocao.descricao}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ textDecoration: 'line-through' }}
                  >
                    {promocao.precoOriginal}
                  </Typography>
                  <Typography variant="h6" color="primary" fontWeight="bold">
                    {promocao.precoPromocional}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<Timer />}
                    label={promocao.dias}
                    variant="outlined"
                  />
                  <Chip
                    icon={<LocalOffer />}
                    label={`Válido até ${promocao.validade}`}
                    variant="outlined"
                    color="primary"
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  size="large"
                >
                  Pedir Agora
                </Button>
              </CardActions>
            </PromotionCard>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary" paragraph>
          * Promoções válidas por tempo limitado
        </Typography>
        <Typography variant="body1" color="text.secondary">
          * Consulte disponibilidade para delivery
        </Typography>
      </Box>
    </Container>
  );
};

export default Promocoes; 