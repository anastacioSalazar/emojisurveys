import { useState, useEffect } from 'react'
import { Box, Typography, Container, Stack, Chip } from '@mui/material'

const YOUTUBE_VIDEO_ID = 'H6N41pQeac4' // reemplaza con tu video real

function PhoneFrame({ children }) {
  return (
    <Box
      sx={{
        width: 280,
        height: 560,
        background: '#1a1a2e',
        borderRadius: '44px',
        padding: '14px 12px',
        boxShadow: `0 0 0 2px #2d2d4e, 0 0 0 4px #1a1a2e, 0 30px 80px rgba(0,0,0,0.35), 0 10px 30px rgba(102,126,234,0.25)`,
        position: 'relative',
      }}
    >
      <Box
        sx={{
          width: 90,
          height: 22,
          background: '#1a1a2e',
          borderRadius: '0 0 16px 16px',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      />
      <Box sx={{ width: '100%', height: '100%', borderRadius: '34px', overflow: 'hidden', background: '#000' }}>
        {children}
      </Box>
    </Box>
  )
}

function YouTubeFacade() {
  const [playing, setPlaying] = useState(false)
  const [thumbError, setThumbError] = useState(false)

  // Preconnect a dominios de YouTube solo si el componente está montado
  useEffect(() => {
    const origins = ['https://www.youtube.com', 'https://i.ytimg.com']
    const links = origins.map((origin) => {
      const link = document.createElement('link')
      link.rel = 'preconnect'
      link.href = origin
      document.head.appendChild(link)
      return link
    })
    return () => links.forEach((l) => document.head.contains(l) && document.head.removeChild(l))
  }, [])

  if (playing) {
    return (
      <iframe
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0&modestbranding=1`}
        title="Demo de EmojiSurveys, creador de encuestas con emojis"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  const thumbSrc = thumbError
    ? `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`

  return (
    <Box
      component="button"
      onClick={() => setPlaying(true)}
      aria-label="Reproducir demo de EmojiSurveys"
      sx={{ display: 'block', width: '100%', height: '100%', p: 0, border: 'none', cursor: 'pointer', background: '#000', position: 'relative' }}
    >
      <Box
        component="img"
        src={thumbSrc}
        alt="Vista previa del video demo de EmojiSurveys"
        loading="lazy"
        decoding="async"
        onError={() => setThumbError(true)}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 52,
          height: 36,
          background: 'rgba(220,0,0,0.92)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
          <polygon points="5,3 19,12 5,21" />
        </svg>
      </Box>
    </Box>
  )
}

function QRPhone() {
  return (
    <PhoneFrame>
      <Stack
        sx={{ width: '100%', height: '100%', background: 'white', alignItems: 'center', justifyContent: 'center', gap: 2, p: 3, boxSizing: 'border-box' }}
      >
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', color: '#667eea' }}>
          Escanea y Responde
        </Typography>
        <Box
          component="img"
          src="/qr.png"
          alt="Código QR para responder una encuesta de ejemplo de EmojiSurveys"
          loading="lazy"
          decoding="async"
          sx={{ width: '100%', maxWidth: 200, height: 'auto', borderRadius: 2, boxShadow: '0 4px 20px rgba(102,126,234,0.15)' }}
        />
        <Typography sx={{ fontSize: '1.4rem', lineHeight: 1 }}>😊 ⭐ 🎚️</Typography>
        <Typography sx={{ fontSize: '0.68rem', color: '#94a3b8', textAlign: 'center', lineHeight: 1.5 }}>
          Apunta tu cámara al QR para abrir la encuesta al instante
        </Typography>
      </Stack>
    </PhoneFrame>
  )
}

function PhoneVideo() {
  return (
    <Box sx={{ py: { xs: 8, md: 10 }, background: 'linear-gradient(180deg, #f8f9ff 0%, #eef0ff 100%)', textAlign: 'center' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ fontSize: { xs: '1.8rem', md: '2rem' }, fontWeight: 800, color: '#1e1b4b', mb: 1.5 }}>
          Míralo en Acción
        </Typography>
        <Typography sx={{ color: '#64748b', maxWidth: 500, mx: 'auto', mb: 6, lineHeight: 1.6 }}>
          Mira el demo y escanea el QR para probar tu primera encuesta con emojis ahora mismo.
        </Typography>

        <Stack direction="row" spacing={6} justifyContent="center" alignItems="flex-start" useFlexGap flexWrap="wrap">
          <Stack alignItems="center" spacing={2}>
            <Chip label="▶ Demo" sx={{ background: 'rgba(220,0,0,0.08)', color: '#dc0000', fontWeight: 700 }} />
            <PhoneFrame>
              <YouTubeFacade />
            </PhoneFrame>
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: '#7c86b0' }}>
              ▶ Ver demo
            </Typography>
          </Stack>

          <Stack alignItems="center" spacing={2}>
            <Chip label="📲 Encuesta Real" sx={{ background: 'rgba(102,126,234,0.10)', color: '#667eea', fontWeight: 700 }} />
            <QRPhone />
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, letterSpacing: 1.2, textTransform: 'uppercase', color: '#7c86b0' }}>
              📲 Pruébalo ya
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export default PhoneVideo