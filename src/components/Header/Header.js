import React from 'react';
import { AppBar, Toolbar, Typography, Button, Badge, IconButton } from '@mui/material';
import { ShoppingCart, Person } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const MenuButtons = styled('div')({
  display: 'flex',
  gap: '1rem',
});

const Logo = styled(Typography)({
  fontWeight: 'bold',
  cursor: 'pointer',
});

const Header = () => {
  return (
    <AppBar position="fixed">
      <StyledToolbar>
        <Logo variant="h6" component={Link} to="/" sx={{ color: 'white', textDecoration: 'none' }}>
          Lanchonete React
        </Logo>
        
        <MenuButtons>
          <Button color="inherit" component={Link} to="/">
            Início
          </Button>
          <Button color="inherit" component={Link} to="/cardapio">
            Cardápio
          </Button>
          <Button color="inherit" component={Link} to="/promocoes">
            Promoções
          </Button>
          <Button color="inherit" component={Link} to="/sobre">
            Sobre Nós
          </Button>
          <Button color="inherit" component={Link} to="/contato">
            Contato
          </Button>
          
          <IconButton color="inherit" component={Link} to="/carrinho">
            <Badge badgeContent={0} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>
          
          <IconButton color="inherit" component={Link} to="/login">
            <Person />
          </IconButton>
        </MenuButtons>
      </StyledToolbar>
    </AppBar>
  );
};

export default Header; 