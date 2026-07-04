import { useState, useEffect } from 'react'
import { Box, Typography, Button, Stack } from '@mui/material'

const carouselItems = [
  {
    id: 1,
    emoji: '😊',
    title: 'Encuestas Divertidas con Emojis',
    description:
      'Captura la satisfacción del cliente usando emojis de caritas. Haz que responder sea divertido y fácil.',
    imageUrl: '/imgpresentacion/imagen1.png',
    fallbackColor: '#667eea',
  },
  {
    id: 2,
    emoji: '⭐',
    title: 'Evaluaciones con Estrellas y Sliders',
    description:
      'Múltiples formas de evaluar: estrellas, sliders, opciones múltiples. Todo personalizable según tus necesidades.',
    imageUrl: '/imgpresentacion/imagen2.png',
    fallbackColor: '#764ba2',
  },
  {
    id: 3,
    emoji: '📊',
    title: 'Resultados Instantáneos',
    description:
      'Obtén análisis en tiempo real con gráficos dinámicos. Crea en minutos y comparte con tus clientes.',
    imageUrl: '/imgpresentacion/imagen3.png',
    fallbackColor: '#ff6b6b',
  },
  {
    id: 4,
    emoji: '🎨',
    title: 'Diseño Personalizable',
    description:
      'Personaliza colores, fuentes y estilos para que tu encuesta se vea como tu marca.',
    imageUrl: '/imgpresentacion/imagen4.png',
    fallbackColor: '#ff9a9e',
  },
]

function HeroCarousel({ height = '75vh' }) {
  const [activeSlide, setActiveSlide] = useState(0)
  const [imgErrors, setImgErrors] = useState({})

  // Preload de la primera imagen del carrusel (candidata a LCP)
  useEffect(() => {
    const first = carouselItems[0]
    if (!first?.imageUrl) return
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = first.imageUrl
    document.head.appendChild(link)
    return () => {
      if (document.head.contains(link)) document.head.removeChild(link)
    }
  }, [])

  // Autoplay
  useEffect(() => {
    const id = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % carouselItems.length)
    }, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        height,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      {carouselItems.map((item, index) => {
        const isFirst = index === 0
        const isActive = activeSlide === index

        return (
          <Box
            key={item.id}
            sx={{
              position: 'absolute',
              inset: 0,
              opacity: isActive ? 1 : 0,
              pointerEvents: isActive ? 'auto' : 'none',
              transition: 'opacity 0.8s ease-in-out',
              backgroundColor: item.fallbackColor,
            }}
          >
            {!imgErrors[index] && (
              <Box
                component="img"
                src={item.imageUrl}
                alt=""
                aria-hidden="true"
                loading={isFirst ? 'eager' : 'lazy'}
                fetchPriority={isFirst ? 'high' : 'auto'}
                decoding="async"
                onError={() => setImgErrors((p) => ({ ...p, [index]: true }))}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
            )}

            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(135deg, rgba(102,126,234,0.8) 0%, rgba(118,75,162,0.8) 100%)',
              }}
            />

            <Stack
              spacing={3}
              alignItems="center"
              justifyContent="center"
              sx={{ position: 'relative', height: '100%', textAlign: 'center', color: 'white', px: 2 }}
            >
              <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' } }}>{item.emoji}</Typography>

              {/* Solo el primer slide lleva el H1 real para SEO; el resto usan H2 para no duplicar H1 */}
              {isFirst ? (
                <Typography
                  variant="h1"
                  sx={{ fontSize: { xs: '2.2rem', md: '3.4rem' }, fontWeight: 800, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                >
                  {item.title}
                </Typography>
              ) : (
                <Typography
                  variant="h2"
                  sx={{ fontSize: { xs: '2.2rem', md: '3.4rem' }, fontWeight: 800, textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
                >
                  {item.title}
                </Typography>
              )}

              <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.4rem' }, maxWidth: 700, lineHeight: 1.6, textShadow: '1px 1px 2px rgba(0,0,0,0.3)' }}>
                {item.description}
              </Typography>

              <Button
                href="#registro"
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 50,
                  px: 4,
                  py: 1.5,
                  fontWeight: 700,
                  fontSize: '1.05rem',
                  background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                }}
              >
                🚀 Empieza Ahora
              </Button>
            </Stack>
          </Box>
        )
      })}

      <Stack
        direction="row"
        spacing={1.5}
        sx={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 2 }}
      >
        {carouselItems.map((_, index) => (
          <Box
            key={index}
            component="button"
            onClick={() => setActiveSlide(index)}
            aria-label={`Ir al slide ${index + 1}`}
            sx={{
              width: 14,
              height: 14,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              p: 0,
              backgroundColor: activeSlide === index ? 'white' : 'rgba(255,255,255,0.5)',
              transform: activeSlide === index ? 'scale(1.2)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default HeroCarousel