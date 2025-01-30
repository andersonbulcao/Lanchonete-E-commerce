import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const TermosServico = () => {
  return (
    <Container maxWidth="md" sx={{ my: 4 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Termos de Serviço
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            1. Aceitação dos Termos
          </Typography>
          <Typography paragraph>
            Ao acessar e usar nosso serviço de delivery, você concorda com estes termos de serviço 
            e todas as condições aqui estabelecidas.
          </Typography>

          <Typography variant="h6" gutterBottom>
            2. Pedidos e Entregas
          </Typography>
          <Typography paragraph>
            - Os pedidos estão sujeitos à disponibilidade dos produtos.
            - O tempo de entrega é estimado e pode variar dependendo do tráfego e condições climáticas.
            - A taxa de entrega é calculada com base na distância.
          </Typography>

          <Typography variant="h6" gutterBottom>
            3. Pagamentos
          </Typography>
          <Typography paragraph>
            - Aceitamos diversas formas de pagamento, incluindo cartões de crédito/débito, PIX e dinheiro.
            - Os preços podem ser alterados sem aviso prévio.
            - Promoções e descontos estão sujeitos a condições específicas.
          </Typography>

          <Typography variant="h6" gutterBottom>
            4. Cancelamentos
          </Typography>
          <Typography paragraph>
            - Pedidos podem ser cancelados antes do início do preparo.
            - Após o início do preparo, não é possível realizar o cancelamento.
            - Em caso de problemas com o pedido, entre em contato com nosso suporte.
          </Typography>

          <Typography variant="h6" gutterBottom>
            5. Responsabilidades
          </Typography>
          <Typography paragraph>
            - Nos comprometemos a entregar produtos de qualidade e seguros.
            - O cliente é responsável por fornecer informações corretas de entrega.
            - Não nos responsabilizamos por atrasos causados por informações incorretas.
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default TermosServico; 