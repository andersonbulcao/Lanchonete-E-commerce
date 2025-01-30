import React from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import {
  TrendingUp,
  ShoppingCart,
  People,
  Inventory,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StatsCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  color: theme.palette.primary.contrastText,
  backgroundColor: theme.palette.primary.main,
}));

const OrdersPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  height: '100%',
}));

// Dados mockados - em um projeto real viriam de uma API
const stats = {
  vendasHoje: 'R$ 2.590,00',
  pedidosHoje: 32,
  clientesAtivos: 150,
  produtosAtivos: 45,
};

const pedidosRecentes = [
  {
    id: '#1234',
    cliente: 'João Silva',
    valor: 'R$ 89,90',
    status: 'Em preparo',
    horario: '14:30',
  },
  {
    id: '#1233',
    cliente: 'Maria Oliveira',
    valor: 'R$ 45,90',
    status: 'Entregue',
    horario: '14:15',
  },
  {
    id: '#1232',
    cliente: 'Pedro Santos',
    valor: 'R$ 125,80',
    status: 'A caminho',
    horario: '14:00',
  },
];

const produtosBaixoEstoque = [
  'Pão de Hambúrguer - 15 unidades',
  'Refrigerante Cola 350ml - 8 unidades',
  'Bacon - 300g',
];

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* Estatísticas */}
        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp sx={{ mr: 1 }} />
              <Typography variant="h6">Vendas Hoje</Typography>
            </Box>
            <Typography variant="h4">{stats.vendasHoje}</Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <ShoppingCart sx={{ mr: 1 }} />
              <Typography variant="h6">Pedidos</Typography>
            </Box>
            <Typography variant="h4">{stats.pedidosHoje}</Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <People sx={{ mr: 1 }} />
              <Typography variant="h6">Clientes</Typography>
            </Box>
            <Typography variant="h4">{stats.clientesAtivos}</Typography>
          </StatsCard>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <StatsCard>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Inventory sx={{ mr: 1 }} />
              <Typography variant="h6">Produtos</Typography>
            </Box>
            <Typography variant="h4">{stats.produtosAtivos}</Typography>
          </StatsCard>
        </Grid>

        {/* Pedidos Recentes */}
        <Grid item xs={12} md={8}>
          <OrdersPaper>
            <Typography variant="h6" gutterBottom>
              Pedidos Recentes
            </Typography>
            <List>
              {pedidosRecentes.map((pedido, index) => (
                <React.Fragment key={pedido.id}>
                  <ListItem>
                    <ListItemText
                      primary={`Pedido ${pedido.id} - ${pedido.cliente}`}
                      secondary={`${pedido.horario} - ${pedido.status}`}
                    />
                    <Typography variant="body2" color="primary">
                      {pedido.valor}
                    </Typography>
                  </ListItem>
                  {index < pedidosRecentes.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </OrdersPaper>
        </Grid>

        {/* Alertas de Estoque */}
        <Grid item xs={12} md={4}>
          <OrdersPaper>
            <Typography variant="h6" gutterBottom color="error">
              Produtos com Estoque Baixo
            </Typography>
            <List>
              {produtosBaixoEstoque.map((produto, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemText primary={produto} />
                  </ListItem>
                  {index < produtosBaixoEstoque.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </OrdersPaper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 