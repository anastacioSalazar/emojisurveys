import { Box, Container, Grid, Card, CardContent, Typography } from '@mui/material'

const features = [
  { icon: '😍', title: 'Encuestas con Emojis', description: 'Usa caritas emoji para hacer las encuestas más atractivas y obtener respuestas honestas sobre la satisfacción del cliente.' },
  { icon: '⭐', title: 'Múltiples Tipos de Evaluación', description: 'Estrellas, sliders, opciones múltiples y escalas del 1 al 5. Todo completamente personalizable.' },
  { icon: '📈', title: 'Análisis Inteligente', description: 'Resultados en tablas y gráficos dinámicos. Identifica tendencias y áreas de mejora en tiempo real.' },
  { icon: '⚡', title: 'Creación Rápida', description: 'Crea encuestas profesionales en minutos combinando preguntas abiertas, opción múltiple y escalas.' },
  { icon: '📱', title: 'Feedback Inmediato', description: 'Obtén respuestas instantáneas y muestra a tus clientes que sus opiniones son valoradas.' },
  { icon: '🎯', title: 'Fácil de Compartir', description: 'Distribuye tus encuestas por correo, redes sociales o intégralas en tu sitio web.' },
]

function Features() {
  return (
    <Box id="features" sx={{ py: { xs: 8, md: 10 }, background: 'linear-gradient(180deg, #f8fafc 0%, #e2e8f0 100%)' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.4rem' },
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              mb: 2,
            }}
          >
            🎯 EmojiSurveys: Encuestas que Funcionan
          </Typography>
          <Typography sx={{ color: '#64748b', maxWidth: 800, mx: 'auto', lineHeight: 1.7 }}>
            La plataforma más divertida y funcional para medir la satisfacción del cliente. Crea encuestas atractivas con emojis, obtén feedback inmediato y analiza resultados como un profesional.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  textAlign: 'center',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                  transition: 'all 0.4s ease',
                  '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' },
                }}
              >
                <CardContent sx={{ py: 5, px: 3 }}>
                  <Typography sx={{ fontSize: '3.5rem', mb: 2.5 }}>{feature.icon}</Typography>
                  <Typography variant="h3" sx={{ fontSize: '1.4rem', fontWeight: 700, color: '#1e293b', mb: 1.5 }}>
                    {feature.title}
                  </Typography>
                  <Typography sx={{ color: '#64748b', lineHeight: 1.6 }}>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Features