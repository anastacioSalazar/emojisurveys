import { Box, Container, Grid, Typography } from '@mui/material'

const stats = [
  { number: '10K+', label: 'Encuestas Creadas' },
  { number: '95%', label: 'Satisfacción Cliente' },
  { number: '2 min', label: 'Tiempo Promedio' },
  { number: '24/7', label: 'Soporte Disponible' },
]

function Stats() {
  return (
    <Box sx={{ py: { xs: 6, md: 8 }, background: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} textAlign="center">
          {stats.map((stat, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Typography sx={{ fontSize: '2.5rem', fontWeight: 800, color: '#667eea' }}>{stat.number}</Typography>
              <Typography sx={{ color: '#64748b', fontWeight: 500 }}>{stat.label}</Typography>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default Stats