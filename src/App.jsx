/**
 * App.jsx — EmojiSurveys
 * Incluye: Header, Hero/Carrusel, PhoneVideo, Stats, Features, Results, CTA.
 * ✅ Material UI v5  ✅ Español  ✅ Full responsive (xs → xl)
 * ✅ Ancho completo en desktop (sin tope de 1200px)
 * ✅ Base URL: https://app.emojisurveys.pro
 */

import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  useMediaQuery,
  useTheme,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from '@mui/material';
import MenuIcon          from '@mui/icons-material/Menu';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


// ─── Constantes ────────────────────────────────────────────────────────────────
const BASE_URL    = 'https://app.emojisurveys.pro';
const DEMO_URL    = 'https://app.emojisurveys.pro/surveyRes/nD9YdUknboKU5zrM';
const YT_VIDEO_ID = 'H6N41pQeac4';

// ─── Tema ───────────────────────────────────────────────────────────────────
const appTheme = createTheme({
  palette: {
    primary:    { main: '#667eea' },
    secondary:  { main: '#764ba2' },
    background: { default: '#fff' },
    text: { primary: '#1e1b4b', secondary: '#64748b' },
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", system-ui, sans-serif',
    h1: { fontWeight: 800, lineHeight: 1.12 },
    h2: { fontWeight: 800, lineHeight: 1.18 },
    h3: { fontWeight: 700 },
    h4: { fontWeight: 700 },
  },
  shape: { borderRadius: 16 },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', fontWeight: 600, borderRadius: '50px' },
      },
    },
    MuiCard: {
      styleOverrides: { root: { borderRadius: 20 } },
    },
    MuiContainer: {
      defaultProps: { maxWidth: false },
      styleOverrides: {
        root: {
          paddingLeft:  'clamp(4px, 4vw, 20px)',
          paddingRight: 'clamp(4px, 4vw, 20px)',
          width: '100%',
        },
      },
    },
  },
});

// ─── Datos estáticos ─────────────────────────────────────────────────────────
const carouselItems = [
  { id: 1, emoji: '😊', title: 'Encuestas Divertidas con Emojis',          description: 'Captura la satisfacción del cliente usando emojis de caritas. Haz que responder sea divertido y fácil.',                                  imageUrl: `${BASE_URL}/imgpresentacion/imagen1.png`, fallbackColor: '#667eea' },
  { id: 2, emoji: '⭐', title: 'Evaluaciones con Estrellas y Sliders',     description: 'Múltiples formas de evaluar: estrellas, sliders, opciones múltiples. Todo personalizable según tus necesidades.',                          imageUrl: `${BASE_URL}/imgpresentacion/imagen2.png`, fallbackColor: '#764ba2' },
  { id: 3, emoji: '📊', title: 'Resultados Instantáneos',                  description: 'Obtén análisis en tiempo real con gráficos dinámicos. Crea en minutos y comparte con tus clientes.',                                    imageUrl: `${BASE_URL}/imgpresentacion/imagen3.png`, fallbackColor: '#ff6b6b' },
  { id: 4, emoji: '🎨', title: 'Diseño Personalizable',                    description: 'Personaliza colores, fuentes y estilos para que tu encuesta se vea como tu marca. Crea experiencias únicas y memorables.',                imageUrl: `${BASE_URL}/imgpresentacion/imagen4.png`, fallbackColor: '#ff9a9e' },
];

const features = [
  { icon: '😍', title: 'Encuestas con Emojis',           description: 'Usa caritas emoji para hacer las encuestas más atractivas y obtener respuestas honestas sobre la satisfacción del cliente.' },
  { icon: '⭐', title: 'Múltiples Tipos de Evaluación',  description: 'Estrellas, sliders, opciones múltiples (2 o 4), escalas del 1 al 5. Todo completamente personalizable.' },
  { icon: '📈', title: 'Análisis Inteligente',           description: 'Resultados en tablas y gráficos dinámicos. Identifica tendencias y áreas de mejora con análisis en tiempo real.' },
  { icon: '⚡', title: 'Creación Rápida',                description: 'Crea encuestas profesionales en minutos. Combina preguntas abiertas, opción múltiple y escalas de calificación.' },
  { icon: '📱', title: 'Feedback Inmediato',             description: 'Obtén respuestas instantáneas y comunica los resultados a tus clientes para mostrar que sus opiniones son valoradas.' },
  { icon: '🎯', title: 'Fácil de Compartir',             description: 'Distribuye tus encuestas por correo, redes sociales o intégralas en tu sitio web. Maximiza tu tasa de respuesta.' },
];

const stats = [
  { number: '10K+',  label: 'Encuestas Creadas' },
  { number: '95%',   label: 'Satisfacción Cliente' },
  { number: '2 min', label: 'Tiempo Promedio' },
  { number: '24/7',  label: 'Soporte Disponible' },
];

const resultCards = [
  { file: 'Result1.png', label: 'Resumen de Respuestas' },
  { file: 'Result2.png', label: 'Métricas de Satisfacción' },
  { file: 'Result3.png', label: 'Análisis de Tendencias' },
  { file: 'Result4.png', label: 'Desglose Detallado' },
];

// ─────────────────────────────────────────────────────────────────────────────
// HEADER — full viewport width, botones con redirección real
// ─────────────────────────────────────────────────────────────────────────────
function Header({ onNavigate }) {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

  const openMenu  = (e) => setAnchorEl(e.currentTarget);
  const closeMenu = ()  => setAnchorEl(null);
  const goTo      = (page) => { onNavigate(page); closeMenu(); };
  const openDemo  = ()  => { window.open(DEMO_URL, '_blank', 'noopener,noreferrer'); closeMenu(); };

  const C = {
    grad:     'linear-gradient(135deg,rgba(102,126,234,0.95) 0%,rgba(118,75,162,0.95) 100%)',
    primary:  '#667eea',
    navBg:    'rgba(255,255,255,0.10)',
    navHover: 'rgba(255,255,255,0.20)',
    demoBg:   'rgba(255,220,50,0.15)',
    demoBgHv: 'rgba(255,220,50,0.28)',
    demoBdr:  'rgba(255,220,50,0.55)',
    demoText: '#FFE066',
  };

  const navBtn = {
    backgroundColor: C.navBg, color: 'white', border: 'none',
    fontSize: 13, fontWeight: 500, px: 1.5, py: 0.75, borderRadius: 1.5,
    backdropFilter: 'blur(10px)', minWidth: 'auto',
    '&:hover': { backgroundColor: C.navHover, transform: 'translateY(-1px)' },
  };

  const demoBtn = {
    ...navBtn,
    backgroundColor: C.demoBg, border: `1.5px solid ${C.demoBdr}`,
    color: C.demoText, fontWeight: 600,
    '&:hover': { backgroundColor: C.demoBgHv, transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(255,220,50,0.25)' },
  };

  const loginBtn = {
    px: 1.75, py: 0.875, backgroundColor: 'rgba(255,255,255,0.20)', color: 'white',
    border: '2px solid white', borderRadius: 1.5, fontSize: 13, fontWeight: 500,
    backdropFilter: 'blur(10px)', minWidth: 'auto',
    '&:hover': { backgroundColor: 'white', color: C.primary, transform: 'translateY(-1px)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' },
  };

  const registerBtn = {
    px: 1.75, py: 0.875, backgroundColor: 'white', color: C.primary,
    border: 'none', borderRadius: 1.5, fontSize: 13, fontWeight: 600,
    boxShadow: '0 4px 12px rgba(255,255,255,0.3)', minWidth: 'auto',
    '&:hover': { transform: 'translateY(-1px)', boxShadow: '0 6px 16px rgba(255,255,255,0.4)' },
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        background: C.grad,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(102,126,234,0.3)',
        zIndex: (t) => t.zIndex.appBar + 1,
        width: '100%',
      }}
    >
      <Container disableGutters>
        <Toolbar
          sx={{
            px: 'clamp(12px, 3vw, 60px)',
            minHeight: { xs: 56, sm: 64 },
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Hamburguesa (móvil) */}
          {isMobile && (
            <IconButton onClick={openMenu} sx={{ color: 'white', mr: 1.5 }} aria-label="Abrir menú">
              <MenuIcon />
            </IconButton>
          )}

          {/* Logo + nav */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: isMobile ? 1.5 : 3, flex: 1 }}>
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 0.75, cursor: 'pointer', flexShrink: 0 }}
              onClick={() => onNavigate('')}
            >
              <Box sx={{ width: 32, height: 32, borderRadius: 1.5, overflow: 'hidden', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={`${BASE_URL}/logop.png`} alt="EmojiSurveys" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Box>
              <Typography variant="h6" sx={{ fontSize: { xs: 18, sm: 22 }, fontWeight: 700, color: 'white', letterSpacing: '-0.5px' }}>
                EmojiSurveys
              </Typography>
            </Box>

            {!isMobile && (
              <Box sx={{ display: 'flex', gap: 0.75 }}>
                <Button onClick={() => onNavigate('')}        sx={navBtn}  disableRipple>🏠 Inicio</Button>
                <Button onClick={() => onNavigate('contacto')} sx={navBtn}  disableRipple>📬 Contacto</Button>
                <Button onClick={openDemo}                     sx={demoBtn} disableRipple>🚀 Probar Demo</Button>
              </Box>
            )}
          </Box>

          {/* Botones de auth (desktop) */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: 1.5, ml: 'auto', flexShrink: 0 }}>
              <Button onClick={() => onNavigate('login')}    sx={loginBtn}    variant="outlined"  disableRipple>Iniciar Sesión</Button>
              <Button onClick={() => onNavigate('register')} sx={registerBtn} variant="contained" disableRipple>✨ Registrarse</Button>
            </Box>
          )}

          {/* Menú móvil */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={closeMenu}
            sx={{ '& .MuiPaper-root': { borderRadius: 2, boxShadow: '0 4px 12px rgba(0,0,0,0.15)', mt: 1, minWidth: 200 } }}
          >
            {[
              { label: '🚀 Probar Demo',     action: openDemo,                color: '#b8860b', hoverBg: 'rgba(255,220,50,0.12)' },
              { label: '🏠 Inicio',          action: () => goTo(''),          color: C.primary, hoverBg: 'rgba(102,126,234,0.08)' },
              { label: '📬 Contacto',        action: () => goTo('contacto'),  color: C.primary, hoverBg: 'rgba(102,126,234,0.08)' },
              { label: '🔐 Iniciar Sesión',  action: () => goTo('login'),     color: C.primary, hoverBg: 'rgba(102,126,234,0.08)' },
              { label: '✨ Registrarse',     action: () => goTo('register'),  color: C.primary, hoverBg: 'rgba(102,126,234,0.08)' },
            ].map(({ label, action, color, hoverBg }) => (
              <MenuItem key={label} onClick={action}
                sx={{ py: 1.5, px: 2, fontSize: 14, fontWeight: 500, color, '&:hover': { backgroundColor: hoverBg } }}>
                {label}
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CARRUSEL — 100% de ancho, full-bleed
// ─────────────────────────────────────────────────────────────────────────────
function HoCarousel({ height = '75vh', onNavigate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [imgErrors,   setImgErrors]   = useState({});
  const [btnHovered,  setBtnHovered]  = useState(false);

  useEffect(() => {
    const { imageUrl } = carouselItems[0];
    if (!imageUrl) return;
    const link = document.createElement('link');
    link.rel = 'preload'; link.as = 'image'; link.href = imageUrl;
    document.head.appendChild(link);
    return () => { if (document.head.contains(link)) document.head.removeChild(link); };
  }, []);

  useEffect(() => {
    const id = setInterval(() => setActiveSlide((p) => (p + 1) % carouselItems.length), 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <Box sx={{ position: 'relative', width: '100%', height, overflow: 'hidden', background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)' }}>
      {carouselItems.map((item, index) => (
        <Box
          key={item.id}
          sx={{
            position: 'absolute', inset: 0,
            opacity: activeSlide === index ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            pointerEvents: activeSlide === index ? 'auto' : 'none',
            backgroundColor: item.fallbackColor,
          }}
        >
          {!imgErrors[index] && (
            <Box
              component="img"
              src={item.imageUrl}
              alt=""
              aria-hidden="true"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchpriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
              onError={() => setImgErrors((p) => ({ ...p, [index]: true }))}
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
            />
          )}

          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,rgba(102,126,234,0.82) 0%,rgba(118,75,162,0.82) 100%)' }} />

          <Box
            sx={{
              position: 'relative', zIndex: 1,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              height: '100%', textAlign: 'center', color: 'white',
              px: { xs: 2, sm: 4, md: 8, lg: 14 },
            }}
          >
            <Typography sx={{ fontSize: { xs: '3rem', md: '4rem' }, mb: { xs: 1.5, md: 2 } }}>{item.emoji}</Typography>

            <Typography
              component="h1"
              sx={{
                fontSize: { xs: '1.75rem', sm: '2.4rem', md: '3rem', lg: '3.5rem' },
                fontWeight: 800, lineHeight: 1.15,
                textShadow: '2px 2px 6px rgba(0,0,0,0.3)',
                mb: { xs: 2, md: 3 }, color: 'white',
                maxWidth: { md: '80%', lg: '70%' }, mx: 'auto',
              }}
            >
              {item.title}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '1rem', sm: '1.15rem', md: '1.35rem' },
                maxWidth: { xs: '100%', sm: 640, md: 760 },
                lineHeight: 1.7, color: 'rgba(255,255,255,0.92)',
                mb: { xs: 3, md: 4 }, fontWeight: 400, mx: 'auto',
              }}
            >
              {item.description}
            </Typography>

            <Button
              variant="contained"
              size="large"
              endIcon={<ArrowForwardIosIcon />}
              onClick={() => onNavigate('register')}
              onMouseEnter={() => setBtnHovered(true)}
              onMouseLeave={() => setBtnHovered(false)}
              sx={{
                background: 'linear-gradient(45deg,#ff6b6b,#feca57)',
                color: 'white',
                px: { xs: 3.5, md: 5 }, py: { xs: 1.4, md: 1.8 },
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                boxShadow: '0 8px 25px rgba(0,0,0,0.22)',
                transform: btnHovered ? 'translateY(-3px)' : 'none',
                transition: 'all 0.3s ease',
                '&:hover': { background: 'linear-gradient(45deg,#e85d5d,#f0b93a)', boxShadow: '0 14px 35px rgba(0,0,0,0.30)' },
              }}
            >
              🚀 Empieza Ahora
            </Button>
          </Box>
        </Box>
      ))}

      <Box sx={{ position: 'absolute', bottom: 28, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 1.5, zIndex: 2 }}>
        {carouselItems.map((_, i) => (
          <Box
            key={i}
            component="button"
            onClick={() => setActiveSlide(i)}
            aria-label={`Ir al slide ${i + 1}`}
            sx={{
              width: 14, height: 14, p: 0, border: 'none', borderRadius: '50%', cursor: 'pointer',
              background: activeSlide === i ? 'white' : 'rgba(255,255,255,0.45)',
              transform: activeSlide === i ? 'scale(1.25)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// YOUTUBE FACADE
// ─────────────────────────────────────────────────────────────────────────────
function YouTubeFacade({ videoId }) {
  const [playing,    setPlaying]    = useState(false);
  const [thumbError, setThumbError] = useState(false);

  if (playing) {
    return (
      <iframe
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
        title="Demo de EmojiSurveys"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  const thumb = thumbError
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <Box
      component="button"
      onClick={() => setPlaying(true)}
      aria-label="Reproducir demo de EmojiSurveys"
      sx={{ display: 'block', width: '100%', height: '100%', p: 0, border: 'none', cursor: 'pointer', background: '#000', position: 'relative' }}
    >
      <Box component="img" src={thumb} alt="Miniatura del demo de EmojiSurveys" loading="lazy"
        onError={() => setThumbError(true)}
        sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      <Box aria-hidden="true" sx={{
        position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
        width: 52, height: 36, background: 'rgba(220,0,0,0.92)', borderRadius: '8px',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5,3 19,12 5,21" /></svg>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PHONE FRAME
// ─────────────────────────────────────────────────────────────────────────────
function PhoneFrame({ children, scale = 1 }) {
  const W = 280 * scale;
  const H = 560 * scale;
  const s = (v) => v * scale;

  return (
    <Box sx={{ display: 'inline-block', position: 'relative' }}>
      <Box sx={{
        width: W, height: H, background: '#1a1a2e',
        borderRadius: `${s(44)}px`, padding: `${s(14)}px ${s(12)}px`,
        boxShadow: `0 0 0 ${s(2)}px #2d2d4e, 0 0 0 ${s(4)}px #1a1a2e, 0 ${s(30)}px ${s(80)}px rgba(0,0,0,0.35), 0 ${s(10)}px ${s(30)}px rgba(102,126,234,0.25)`,
        position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        <Box sx={{ width: s(90), height: s(22), background: '#1a1a2e', borderRadius: `0 0 ${s(16)}px ${s(16)}px`, position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', zIndex: 10 }} />
        <Box sx={{ position: 'absolute', top: s(100), left: -s(4), width: s(4), height: s(40), borderRadius: `${s(3)}px 0 0 ${s(3)}px`, background: '#2d2d4e' }} />
        <Box sx={{ position: 'absolute', top: s(155), left: -s(4), width: s(4), height: s(40), borderRadius: `${s(3)}px 0 0 ${s(3)}px`, background: '#2d2d4e' }} />
        <Box sx={{ position: 'absolute', top: s(130), right: -s(4), width: s(4), height: s(60), borderRadius: `0 ${s(3)}px ${s(3)}px 0`, background: '#2d2d4e' }} />
        <Box sx={{ width: '100%', height: '100%', borderRadius: `${s(34)}px`, overflow: 'hidden', background: '#000' }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// QR PHONE
// ─────────────────────────────────────────────────────────────────────────────
function QRPhone({ scale = 1 }) {
  return (
    <PhoneFrame scale={scale}>
      <Box sx={{ width: '100%', height: '100%', background: 'white', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, p: 3, boxSizing: 'border-box' }}>
        <Typography sx={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: '#667eea', m: 0 }}>
          Escanea y Responde
        </Typography>
        <Box
          component="img"
          src={`${BASE_URL}/qr.png`}
          alt="Escanea el código QR para responder la encuesta"
          loading="lazy"
          decoding="async"
          sx={{ width: '100%', maxWidth: 200 * scale, height: 'auto', borderRadius: 3, boxShadow: '0 4px 20px rgba(102,126,234,0.15)' }}
        />
        <Typography sx={{ fontSize: '1.4rem', lineHeight: 1 }}>😊 ⭐ 🎚️</Typography>
        <Typography sx={{ fontSize: '0.68rem', color: '#94a3b8', textAlign: 'center', lineHeight: 1.5 }}>
          Apunta tu cámara al QR para abrir la encuesta al instante
        </Typography>
      </Box>
    </PhoneFrame>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECCIÓN VIDEO + QR
// ─────────────────────────────────────────────────────────────────────────────
function PhoneVideo() {
  const theme  = useTheme();
  const isXs   = useMediaQuery(theme.breakpoints.only('xs'));
  const isSm   = useMediaQuery(theme.breakpoints.only('sm'));
  const phoneScale = isXs ? 0.72 : isSm ? 0.85 : 1;

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, background: 'linear-gradient(180deg,#f8f9ff 0%,#eef0ff 100%)', textAlign: 'center', width: '100%' }}>
      <Container>
        <Typography variant="h3" sx={{ mb: 1.5, fontSize: { xs: '1.6rem', md: '2rem' }, color: 'text.primary' }}>
          Míralo en Acción
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 560, mx: 'auto', mb: { xs: 5, md: 6 }, lineHeight: 1.7, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
          Mira el demo y escanea el QR para probar tu primera encuesta ahora mismo.
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'center',
          alignItems: { xs: 'center', sm: 'flex-start' },
          gap: { xs: 5, sm: 4, md: 8 },
          flexWrap: 'wrap',
        }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Chip label="▶ Demo" sx={{ background: 'rgba(220,0,0,0.08)', color: '#dc0000', fontWeight: 700, letterSpacing: '0.8px' }} />
            <PhoneFrame scale={phoneScale}>
              <YouTubeFacade videoId={YT_VIDEO_ID} />
            </PhoneFrame>
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#7c86b0' }}>
              ▶ Ver demo
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <Chip label="📲 Encuesta Real" sx={{ background: 'rgba(102,126,234,0.10)', color: '#667eea', fontWeight: 700, letterSpacing: '0.8px' }} />
            <QRPhone scale={phoneScale} />
            <Typography sx={{ fontSize: '0.88rem', fontWeight: 700, letterSpacing: '1.2px', textTransform: 'uppercase', color: '#7c86b0' }}>
              📲 Pruébalo ya
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STATS
// ─────────────────────────────────────────────────────────────────────────────
function StatsSection() {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 8 }, background: 'white', width: '100%' }}>
      <Container>
        <Grid container spacing={{ xs: 2, md: 4 }} justifyContent="center">
          {stats.map((stat, i) => (
            <Grid item xs={6} sm={3} key={i}>
              <Box sx={{ textAlign: 'center', p: { xs: 1.5, md: 2 } }}>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'primary.main', mb: 1, fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem', lg: '3rem' } }}>
                  {stat.number}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontWeight: 500, fontSize: { xs: '0.85rem', md: '1rem' } }}>
                  {stat.label}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FEATURES
// ─────────────────────────────────────────────────────────────────────────────
function HoFeatures() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  return (
    <Box component="section" id="features" sx={{ py: { xs: 7, md: 10 }, background: 'linear-gradient(180deg,#f8fafc 0%,#e2e8f0 100%)', width: '100%' }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 8 } }}>
          <Typography
            variant="h2"
            sx={{
              mb: 2.5,
              fontSize: { xs: '1.75rem', sm: '2.2rem', md: '2.6rem', lg: '2.8rem' },
              background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            🎯 EmojiSurveys: Encuestas que Funcionan
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 860, mx: 'auto', lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1.1rem', lg: '1.15rem' } }}>
            La plataforma más divertida y funcional para medir la satisfacción del cliente. Crea
            encuestas atractivas con emojis, obtén feedback inmediato y analiza resultados como un profesional.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 3, md: 4, xl: 5 }}>
          {features.map((feature, index) => (
            <Grid item xs={6} key={index}>
              <Card
                elevation={hoveredIdx === index ? 6 : 2}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
                sx={{
                  height: '100%',
                  transition: 'transform 0.35s ease, box-shadow 0.35s ease',
                  transform: hoveredIdx === index ? 'translateY(-10px)' : 'none',
                  border: '1px solid rgba(255,255,255,0.25)',
                }}
              >
                <CardContent sx={{ textAlign: 'center', p: { xs: 3.5, md: 4, xl: 5 } }}>
                  <Typography sx={{ fontSize: { xs: '3rem', md: '3.5rem' }, mb: 2 }}>{feature.icon}</Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: 'text.primary', fontSize: { xs: '1.05rem', md: '1.2rem' } }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: { md: '0.9rem', lg: '0.95rem' } }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RESULTADOS / CAPTURAS
// ─────────────────────────────────────────────────────────────────────────────
function ResultsSection() {
  return (
    <Box component="section" sx={{ py: { xs: 7, md: 10 }, background: 'linear-gradient(180deg,#ffffff 0%,#f4f6ff 100%)', textAlign: 'center', width: '100%' }}>
      <Container>
        <Box sx={{ mb: { xs: 5, md: 7 } }}>
          <Chip
            label="Panel en Vivo"
            sx={{
              background: 'linear-gradient(135deg,#667eea,#764ba2)',
              color: 'white', fontWeight: 700, fontSize: '0.78rem',
              letterSpacing: '2px', textTransform: 'uppercase', mb: 2.5,
            }}
          />
          <Typography variant="h2" sx={{ mb: 2, color: 'text.primary', fontSize: { xs: '1.6rem', sm: '1.9rem', md: '2.2rem', lg: '2.5rem' } }}>
            Resultados de Encuestas en Tiempo Real
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: 580, mx: 'auto', lineHeight: 1.8, fontSize: { xs: '0.95rem', md: '1.05rem' } }}>
            Visualiza tus datos al instante con paneles claros e intuitivos — sin conocimientos
            técnicos. Diseñado para ser fácil, amigable y profesional desde el primer día.
          </Typography>
        </Box>

        <Grid container spacing={{ xs: 2.5, md: 3.5, xl: 4 }}>
          {resultCards.map((item, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                elevation={1}
                sx={{
                  overflow: 'hidden', border: '1px solid rgba(102,126,234,0.10)', textAlign: 'left',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 16px 48px rgba(102,126,234,0.18)' },
                }}
              >
                <Box sx={{ px: 2.5, py: 1.5, borderBottom: '1px solid #f1f3ff', display: 'flex', alignItems: 'center', gap: 1, background: '#fafbff' }}>
                  <Box sx={{ display: 'flex', gap: '6px' }}>
                    {['#ff5f57', '#febc2e', '#28c840'].map((c) => (
                      <Box key={c} sx={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                    ))}
                  </Box>
                  <Typography sx={{ fontSize: '0.78rem', fontWeight: 600, color: '#94a3b8', ml: 0.5, letterSpacing: '0.5px' }}>
                    {item.label}
                  </Typography>
                </Box>
                <Box
                  component="img"
                  src={`${BASE_URL}/result/${item.file}`}
                  alt={`${item.label} en el panel de resultados de EmojiSurveys`}
                  loading="lazy"
                  decoding="async"
                  sx={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </Card>
            </Grid>
          ))}
        </Grid>

        <Typography sx={{ mt: 6, color: '#94a3b8', fontSize: '0.95rem', letterSpacing: '0.3px' }}>
          ✦ Todos los gráficos se actualizan automáticamente. ✦
        </Typography>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────────────────────────────────────
function CTASection({ onNavigate }) {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 10 },
        background: 'linear-gradient(135deg,#667eea 0%,#764ba2 100%)',
        color: 'white', textAlign: 'center',
        position: 'relative', overflow: 'hidden', width: '100%',
      }}
    >
      <Container>
        <Typography sx={{ fontSize: { xs: '2.5rem', md: '3rem' }, mb: 2 }}>🎉</Typography>
        <Typography
          variant="h2"
          sx={{ color: 'white', mb: 2.5, textShadow: '2px 2px 4px rgba(0,0,0,0.3)', fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem', lg: '2.8rem' } }}
        >
          ¡Comienza a Recopilar Feedback Hoy!
        </Typography>
        <Typography
          variant="body1"
          sx={{ color: 'rgba(255,255,255,0.92)', maxWidth: 660, mx: 'auto', mb: 5, lineHeight: 1.7, fontSize: { xs: '1rem', md: '1.15rem' } }}
        >
          Únete a miles de empresas que ya utilizan EmojiSurveys para mejorar la experiencia de
          sus clientes. Crea tu primera encuesta gratis en menos de 2 minutos.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => onNavigate('register')}
          sx={{
            background: 'linear-gradient(45deg,#ff6b6b,#feca57)',
            color: 'white',
            px: { xs: 4, md: 6 }, py: { xs: 1.6, md: 2 },
            fontSize: { xs: '1rem', md: '1.1rem' },
            boxShadow: '0 8px 25px rgba(0,0,0,0.22)',
            '&:hover': { background: 'linear-gradient(45deg,#e85d5d,#f0b93a)', transform: 'translateY(-3px)', boxShadow: '0 14px 35px rgba(0,0,0,0.3)' },
          }}
        >
          ✨ Crear Cuenta Gratis
        </Button>
      </Container>
    </Box>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP RAÍZ
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const theme    = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigate = (page) => {
    window.location.href = `${BASE_URL}/${page}`;
  };

  return (
    <ThemeProvider theme={appTheme}>
      <CssBaseline />
      <Header    onNavigate={handleNavigate} />
      <HoCarousel height={isMobile ? '65vh' : '75vh'} onNavigate={handleNavigate} />
      <PhoneVideo />
      <StatsSection />
      <HoFeatures />
      <ResultsSection />
      <CTASection onNavigate={handleNavigate} />
    </ThemeProvider>
  );
}