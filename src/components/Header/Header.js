import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Menu as MenuIcon,
  ShoppingCart,
  Person,
  LocalOffer,
  ExitToApp,
  RestaurantMenu,
  Info,
  ContactSupport,
  History,
} from '@mui/icons-material';

const pages = [
  { name: 'Cardápio', path: '/cardapio', icon: <RestaurantMenu /> },
  { name: 'Promoções', path: '/promocoes', icon: <LocalOffer /> },
  { name: 'Sobre', path: '/sobre', icon: <Info /> },
  { name: 'Contato', path: '/contato', icon: <ContactSupport /> },
];

const userMenuItems = [
  { name: 'Meu Perfil', path: '/perfil', icon: <Person /> },
  { name: 'Meus Pedidos', path: '/historico-pedidos', icon: <History /> },
  { name: 'Cupons', path: '/cupons', icon: <LocalOffer /> },
  { name: 'Sair', path: '/logout', icon: <ExitToApp /> },
];

const Header = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo para desktop */}
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LANCHONETE
          </Typography>

          {/* Logo para mobile */}
          <Typography
            variant="h5"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LANCHONETE
          </Typography>

          {/* Menu desktop */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.name}
                component={RouterLink}
                to={page.path}
                onClick={handleCloseUserMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                startIcon={page.icon}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* Carrinho e Menu do Usuário */}
          <Box sx={{ flexGrow: 0 }}>
            <IconButton
              component={RouterLink}
              to="/carrinho"
              size="large"
              aria-label="carrinho de compras"
              color="inherit"
              sx={{ mr: 2 }}
            >
              <Badge badgeContent={4} color="error">
                <ShoppingCart />
              </Badge>
            </IconButton>

            <Tooltip title="Opções">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {userMenuItems.map((item) => (
                <MenuItem
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  onClick={handleCloseUserMenu}
                >
                  <ListItemIcon>
                    {item.icon}
                  </ListItemIcon>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 