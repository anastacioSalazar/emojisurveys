import { Box, Container, Typography, Button } from '@mui/material'

function Cta() {
  return (
    <Box
      id="registro"
      sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="sm">
        <Typography sx={{ fontSize: '3rem', mb: 2.5 }}>🎉</Typography>
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.4rem' }, fontWeight: 800, mb: 2.5, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
          ¡Comienza a Recopilar Feedback Hoy!
        </Typography>
        <Typography sx={{ fontSize: '1.15rem', mb: 5, lineHeight: 1.6, opacity: 0.95 }}>
          Únete a miles de empresas que ya utilizan EmojiSurveys para mejorar la experiencia de sus clientes. Crea tu primera encuesta gratis en menos de 2 minutos.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: 50,
            px: 5,
            py: 1.75,
            fontWeight: 700,
            fontSize: '1.1rem',
            background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 12px 35px rgba(0,0,0,0.3)' },
          }}
        >
          ✨ Crear Cuenta Gratis
        </Button>
      </Container>
    </Box>
  )
}

export default Cta