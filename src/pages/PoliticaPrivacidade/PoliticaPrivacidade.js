import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const PoliticaPrivacidade = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Política de Privacidade
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Informações que coletamos
          </Typography>
          <Typography paragraph>
            Coletamos informações que você nos fornece diretamente, incluindo nome, endereço, 
            número de telefone, endereço de e-mail e informações de pagamento quando você faz um pedido.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. Como usamos suas informações
          </Typography>
          <Typography paragraph>
            Utilizamos suas informações para processar seus pedidos, enviar atualizações sobre o status 
            do pedido, melhorar nossos serviços e enviar comunicações de marketing (com seu consentimento).
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Compartilhamento de informações
          </Typography>
          <Typography paragraph>
            Não vendemos suas informações pessoais. Compartilhamos apenas com parceiros necessários 
            para a entrega do seu pedido e processamento de pagamentos.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Segurança
          </Typography>
          <Typography paragraph>
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas 
            informações contra acesso não autorizado e uso indevido.
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Seus direitos
          </Typography>
          <Typography paragraph>
            Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. 
            Entre em contato conosco para exercer esses direitos.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default PoliticaPrivacidade; 