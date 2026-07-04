import { Box, Container, Grid, Card, Stack, Typography, Chip } from '@mui/material'

const resultCards = [
  { file: 'Result1.png', label: 'Resumen de Respuestas' },
  { file: 'Result2.png', label: 'Métricas de Satisfacción' },
  { file: 'Result3.png', label: 'Análisis de Tendencias' },
  { file: 'Result4.png', label: 'Desglose Detallado' },
]

const dotColors = ['#ff5f57', '#febc2e', '#28c840']

function ResultsGallery() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, background: 'linear-gradient(180deg, #ffffff 0%, #f4f6ff 100%)', textAlign: 'center' }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 7 }}>
          <Chip
            label="Panel en Vivo"
            sx={{ background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', fontWeight: 700, letterSpacing: 1, mb: 2.5 }}
          />
          <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2.2rem' }, fontWeight: 800, color: '#1e1b4b', mb: 2 }}>
            Resultados de Encuestas en Tiempo Real
          </Typography>
          <Typography sx={{ color: '#64748b', maxWidth: 520, mx: 'auto', lineHeight: 1.7 }}>
            Visualiza tus datos al instante con paneles claros e intuitivos. Sin conocimientos técnicos, fácil y profesional desde el primer día.
          </Typography>
        </Box>

        <Grid container spacing={3.5}>
          {resultCards.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  borderRadius: 5,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(102,126,234,0.10)',
                  border: '1px solid rgba(102,126,234,0.10)',
                  textAlign: 'left',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 16px 48px rgba(102,126,234,0.20)' },
                }}
              >
                <Stack direction="row" alignItems="center" spacing={1} sx={{ px: 2.5, py: 1.75, borderBottom: '1px solid #f1f3ff', background: '#fafbff' }}>
                  <Stack direction="row" spacing={0.75}>
                    {dotColors.map((c) => (
                      <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                    ))}
                  </Stack>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', ml: 0.75, letterSpacing: 0.5 }}>
                    {item.label}
                  </Typography>
                </Stack>
                <Box
                  component="img"
                  src={`/result/${item.file}`}
                  alt={`${item.label} en el panel de resultados de EmojiSurveys`}
                  loading="lazy"
                  decoding="async"
                  sx={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography sx={{ mt: 6, fontSize: '0.95rem', color: '#94a3b8', letterSpacing: 0.3 }}>
          ✦ Todos los gráficos se actualizan automáticamente. ✦
        </Typography>
      </Container>
    </Box>
  )
}

export default ResultsGallery