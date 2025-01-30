import React from 'react';
import {
  Container,
  Typography,
  Grid,
  Paper,
  Box,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Box)(({ theme }) => ({
  backgroundImage: 'url(https://source.unsplash.com/1600x900/?restaurant-kitchen)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  height: '400px',
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  }
}));

const HeroContent = styled(Box)({
  position: 'relative',
  color: 'white',
  textAlign: 'center',
  zIndex: 1,
});

const ContentSection = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4, 0),
}));

const TeamMemberCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

const equipe = [
  {
    nome: 'João Silva',
    cargo: 'Chef Principal',
    foto: 'https://source.unsplash.com/400x400/?chef',
    descricao: '15 anos de experiência em culinária gourmet.',
  },
  {
    nome: 'Maria Oliveira',
    cargo: 'Gerente',
    foto: 'https://source.unsplash.com/400x400/?manager',
    descricao: 'Especialista em gestão de restaurantes.',
  },
  {
    nome: 'Pedro Santos',
    cargo: 'Chef de Cozinha',
    foto: 'https://source.unsplash.com/400x400/?cook',
    descricao: 'Especializado em hambúrgueres artesanais.',
  },
];

const Sobre = () => {
  return (
    <Box>
      <HeroSection>
        <Container>
          <HeroContent>
            <Typography variant="h2" component="h1" gutterBottom>
              Nossa História
            </Typography>
            <Typography variant="h5">
              Servindo os melhores lanches desde 2024
            </Typography>
          </HeroContent>
        </Container>
      </HeroSection>

      <Container>
        <ContentSection elevation={2}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" gutterBottom>
                Quem Somos
              </Typography>
              <Typography paragraph>
                Somos uma lanchonete comprometida com a qualidade e o sabor. Nossa jornada começou com um sonho de oferecer os melhores lanches da cidade, combinando ingredientes frescos e receitas exclusivas.
              </Typography>
              <Typography paragraph>
                Cada hambúrguer é preparado com carne selecionada e ingredientes de primeira qualidade. Nossa equipe é treinada para oferecer não apenas comida excepcional, mas também um serviço que fará você se sentir em casa.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://source.unsplash.com/600x400/?burger-restaurant"
                alt="Nossa Lanchonete"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2,
                }}
              />
            </Grid>
          </Grid>
        </ContentSection>

        <ContentSection elevation={2}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Nossa Missão
          </Typography>
          <Typography paragraph textAlign="center">
            Proporcionar a melhor experiência gastronômica aos nossos clientes, através de produtos de qualidade e atendimento excepcional.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Qualidade
                </Typography>
                <Typography>
                  Utilizamos apenas ingredientes frescos e de primeira linha em nossas preparações.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Inovação
                </Typography>
                <Typography>
                  Buscamos sempre novas receitas e combinações para surpreender nossos clientes.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box textAlign="center">
                <Typography variant="h6" gutterBottom>
                  Atendimento
                </Typography>
                <Typography>
                  Nosso compromisso é proporcionar a melhor experiência aos nossos clientes.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </ContentSection>

        <ContentSection elevation={2}>
          <Typography variant="h4" gutterBottom textAlign="center">
            Nossa Equipe
          </Typography>
          <Grid container spacing={4}>
            {equipe.map((membro) => (
              <Grid item key={membro.nome} xs={12} sm={6} md={4}>
                <TeamMemberCard>
                  <CardMedia
                    component="img"
                    height="300"
                    image={membro.foto}
                    alt={membro.nome}
                  />
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {membro.nome}
                    </Typography>
                    <Typography variant="subtitle1" color="primary" gutterBottom>
                      {membro.cargo}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {membro.descricao}
                    </Typography>
                  </CardContent>
                </TeamMemberCard>
              </Grid>
            ))}
          </Grid>
        </ContentSection>
      </Container>
    </Box>
  );
};

export default Sobre; 