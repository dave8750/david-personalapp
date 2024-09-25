import React from 'react';
import { Container, Typography, Box, Button, Paper } from '@mui/material';

export const metadata = { title: 'Domov | Zoškasnap' };

export default function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: 'center', my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Vitajte na Zoškasnap!
        </Typography>
        <Typography variant="h5" component="h2" color="text.secondary" gutterBottom>
          Zdieľajte svoje okamihy s ostatnými
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
          Začnite
        </Button>
      </Box>

      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, 
          gap: 4 
        }}
      >
        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Funkcia 1
          </Typography>
          <Typography>
            Popis funkcie 1. Vytvorte a zdieľajte svoj obsah s našou komunitou.
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Funkcia 2
          </Typography>
          <Typography>
            Popis funkcie 2. Upravujte svoje príspevky a sledujte reakcie ostatných.
          </Typography>
        </Paper>

        <Paper elevation={3} sx={{ padding: 2 }}>
          <Typography variant="h6" gutterBottom>
            Funkcia 3
          </Typography>
          <Typography>
            Popis funkcie 3. Prejdite si populárne príspevky a inšpirujte sa.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
}
