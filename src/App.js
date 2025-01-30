import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Layouts
import AdminLayout from './layouts/AdminLayout';

// Componentes principais
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Páginas públicas
import Home from './pages/Home/Home';
import Cardapio from './pages/Cardapio/Cardapio';
import Login from './pages/Login/Login';
import Carrinho from './pages/Carrinho/Carrinho';
import Contato from './pages/Contato/Contato';
import Sobre from './pages/Sobre/Sobre';
import Promocoes from './pages/Promocoes/Promocoes';

// Páginas administrativas
import Dashboard from './pages/Admin/Dashboard';
import GerenciarProdutos from './pages/Admin/GerenciarProdutos';
import GerenciarPedidos from './pages/Admin/GerenciarPedidos';
import GerenciarUsuarios from './pages/Admin/GerenciarUsuarios';
import Configuracoes from './pages/Admin/Configuracoes';

// Criando um tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4400',
    },
    secondary: {
      main: '#FFA726',
    },
  },
  typography: {
    fontFamily: [
      'Roboto',
      'Arial',
      'sans-serif'
    ].join(','),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          {/* Rotas Administrativas */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="produtos" element={<GerenciarProdutos />} />
            <Route path="pedidos" element={<GerenciarPedidos />} />
            <Route path="usuarios" element={<GerenciarUsuarios />} />
            <Route path="configuracoes" element={<Configuracoes />} />
          </Route>

          {/* Rotas Públicas */}
          <Route
            path="*"
            element={
              <Box sx={{ 
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <Header />
                <Box sx={{ 
                  flexGrow: 1,
                  marginTop: '64px' // altura do header
                }}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/cardapio" element={<Cardapio />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/contato" element={<Contato />} />
                    <Route path="/sobre" element={<Sobre />} />
                    <Route path="/promocoes" element={<Promocoes />} />
                  </Routes>
                </Box>
                <Footer />
              </Box>
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
