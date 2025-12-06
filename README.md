# 💪 ReHabilita - Aplicación Gratuita de Rehabilitación Post-ACV

**La mejor aplicación gratuita para recuperación post-ACV**, creada con las mejores prácticas de apps líderes del mercado como FitMi, MusicGlove y Constant Therapy.

## 🌟 Características Principales

### 🎮 **Sistema de Gamificación**
- ✅ Puntos y niveles
- 🔥 Sistema de rachas diarias
- 🏆 15+ insignias desbloqueables
- 📊 Seguimiento de progreso detallado

### 💪 **Ejercicios Motores** (10+ ejercicios)
- **Mano y dedos**: Tocar dedos, agarrar y soltar, alcanzar objetos
- **Brazo y hombro**: Elevar brazo, círculos de hombro
- **Pierna**: Elevar pierna, bombeo de tobillo
- **Equilibrio**: Juegos de equilibrio con acelerómetro

### 🧠 **Ejercicios Cognitivos** (6+ ejercicios)
- **Memoria**: Emparejar cartas, recordar secuencias
- **Razonamiento**: Completar patrones, secuencias numéricas
- **Atención**: Tareas de atención selectiva
- **Lenguaje**: Nombrar objetos, vocabulario

### 📹 **Detección con Cámara** (MediaPipe)
- Detección de movimientos de mano en tiempo real
- Feedback visual inmediato
- Medición objetiva del progreso

### ♿ **Accesibilidad Total**
- Texto grande configurable
- Modo alto contraste
- Retroalimentación multimodal (visual + auditiva + háptica)
- Interfaz simple e intuitiva
- Tamaños de botones optimizados (min 44px)

## 📋 Ejercicios Basados en Evidencia Científica

Todos los ejercicios están basados en las mejores prácticas clínicas:

### Ejercicios Motores
1. **Finger Tapping** - Basado en MusicGlove
   - Mejora destreza fina 3x más rápido que terapia tradicional
   - 20 repeticiones, 5 minutos

2. **Reach & Grab** - Inspirado en FitMi
   - Coordinación ojo-mano
   - Rango de movimiento del brazo

3. **Mirror Therapy Virtual**
   - Reduce dolor
   - Mejora control motor
   - Estimula neuroplasticidad

### Ejercicios Cognitivos
1. **Memory Match** - Tipo Constant Therapy
   - Memoria a corto plazo
   - Atención visual

2. **Sequence Recall** - Inspirado en Lumosity
   - Memoria de trabajo
   - Secuenciación

3. **Attention Tasks**
   - Atención selectiva
   - Control inhibitorio

## 🚀 Instalación y Uso

### Opción 1: Uso Directo (Más Rápido)
1. Descarga todos los archivos
2. Abre `index.html` en tu navegador
3. ¡Listo! No requiere servidor ni instalación

### Opción 2: Servidor Local (Recomendado para cámara)
```bash
# Con Python
python -m http.server 8080

# Con Node.js
npx serve

# Luego visita: http://localhost:8080
```

### Opción 3: Docker
```bash
# Construir
docker build -t rehabilita .

# Ejecutar
docker run -p 8080:80 rehabilita

# Visita: http://localhost:8080
```

### Opción 4: Desplegar en la Nube (Gratis)

#### Netlify
```bash
# Arrastra la carpeta completa a Netlify Drop
# o usa Netlify CLI
netlify deploy
```

#### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git push origin main

# En Settings > Pages, selecciona la rama main
# Tu app estará en: https://tuusuario.github.io/rehabilita
```

#### Vercel
```bash
vercel
```

## 📱 Instalación como PWA (Aplicación)

En dispositivos móviles:
1. Abre la app en tu navegador
2. Toca el menú (⋮) 
3. Selecciona "Agregar a pantalla de inicio"
4. ¡Ahora funciona como una app nativa!

## 🎯 Guía de Uso

### Primera Vez
1. Abre la aplicación
2. Tu progreso se guarda automáticamente en el navegador
3. No requiere cuenta ni registro

### Realizar Ejercicios
1. Ve a la pantalla de inicio
2. Toca "Empezar Ahora" en el ejercicio recomendado
3. O explora todas las categorías
4. Sigue las instrucciones en pantalla
5. ¡Completa y gana puntos!

### Usar la Cámara
1. Ve a la sección "Cámara"
2. Permite acceso a la cámara
3. Selecciona un ejercicio con detección
4. Coloca tu mano frente a la cámara
5. El sistema detecta tus movimientos automáticamente

### Exportar Progreso
1. Ve a "Progreso"
2. Toca "Exportar Reporte para Terapeuta"
3. Comparte el archivo TXT con tu terapeuta

## 🏗️ Arquitectura del Proyecto

```
rehabilita/
├── index.html              # Página principal
├── manifest.json           # PWA manifest
├── css/
│   ├── main.css           # Estilos principales
│   ├── exercises.css      # Estilos de ejercicios
│   └── animations.css     # Animaciones (placeholder)
├── js/
│   ├── app.js            # Aplicación principal
│   ├── gamification.js   # Sistema de puntos/niveles
│   ├── progress-tracker.js # (placeholder)
│   ├── exercises/
│   │   ├── motor-exercises.js      # Ejercicios motores
│   │   ├── cognitive-exercises.js  # Ejercicios cognitivos
│   │   ├── speech-exercises.js     # Ejercicios de lenguaje
│   │   └── exercise-manager.js     # (placeholder)
│   ├── detection/
│   │   └── hand-detection.js      # MediaPipe hands
│   └── utils/
│       ├── storage.js    # localStorage wrapper
│       ├── audio.js      # Web Audio API
│       └── notifications.js # Sistema de notificaciones
└── assets/               # Imágenes y sonidos (placeholder)
```

## 🔧 Personalización

### Cambiar Meta Diaria
1. Ve a Configuración (⚙️)
2. Ajusta "Minutos por día"
3. Guarda

### Activar/Desactivar Características
- **Texto Grande**: Para mejor legibilidad
- **Alto Contraste**: Para visibilidad mejorada
- **Sonidos**: Efectos de audio
- **Voz**: Retroalimentación hablada (próximamente)

## 📊 Comparación con Apps de Pago

| Característica | ReHabilita | FitMi | MusicGlove | Constant Therapy |
|---|---|---|---|---|
| Precio | ✅ **GRATIS** | $549 USD | $299 USD | $23/mes |
| Ejercicios Motores | ✅ 10+ | ✅ 40 | ✅ (solo mano) | ❌ |
| Ejercicios Cognitivos | ✅ 6+ | ❌ | ❌ | ✅ 100,000+ |
| Detección con Cámara | ✅ Gratis | ❌ (requiere hardware) | ❌ (requiere guante) | ❌ |
| Gamificación | ✅ | ✅ | ✅ | ✅ |
| Sin Hardware Especial | ✅ | ❌ | ❌ | ✅ |
| Offline | ✅ | ✅ | ✅ | ❌ |
| Open Source | ✅ | ❌ | ❌ | ❌ |

## 🌐 Compatibilidad

### Navegadores Soportados
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Chrome Mobile
- ✅ Safari iOS

### Características por Navegador
- **Detección de cámara**: Chrome, Edge, Safari 15+
- **Web Audio**: Todos los navegadores modernos
- **PWA**: Todos excepto Firefox Desktop

## 🔐 Privacidad y Datos

- ✅ **100% Local**: Todos los datos se guardan en tu dispositivo
- ✅ **Sin Servidor**: No enviamos datos a ningún servidor
- ✅ **Sin Registro**: No requiere cuenta ni email
- ✅ **Sin Rastreo**: No usamos analytics ni cookies de terceros
- ✅ **Código Abierto**: Puedes revisar todo el código

## 🤝 Contribuir

¿Quieres mejorar ReHabilita?

1. Haz fork del proyecto
2. Crea una rama para tu feature
3. Haz commit de tus cambios
4. Push a la rama
5. Abre un Pull Request

### Ideas para Contribuir
- [ ] Más ejercicios (motor, cognitivo, lenguaje)
- [ ] Soporte para más idiomas
- [ ] Integración con wearables
- [ ] Modo multijugador
- [ ] Estadísticas avanzadas con gráficos
- [ ] Modo oscuro
- [ ] Sincronización en la nube (opcional)

## 📖 Documentación Científica

Los ejercicios están basados en:

1. **Neuroplasticidad**: Taub et al. (1999) - Terapia de restricción del movimiento
2. **Alta Repetición**: Wolf et al. (2006) - EXCITE Trial
3. **Terapia de Espejo**: Ramachandran & Altschuler (2009)
4. **Gamificación en Rehab**: Lohse et al. (2014)
5. **Realidad Virtual**: Laver et al. (2017) - Cochrane Review

## ❓ FAQ

**P: ¿Necesito internet?**
R: No para ejercicios básicos. Solo para detección con cámara (MediaPipe CDN).

**P: ¿Funciona en tablet?**
R: Sí, optimizado para tablets y teléfonos.

**P: ¿Puedo usarla con mi terapeuta?**
R: Sí, puedes exportar reportes detallados de progreso.

**P: ¿Los datos se sincronizan entre dispositivos?**
R: No actualmente, pero está en el roadmap.

**P: ¿Reemplaza la terapia profesional?**
R: No. ReHabilita complementa pero no reemplaza la terapia profesional.

## 🎯 Roadmap

### v1.0 (Actual) ✅
- [x] Ejercicios motores básicos
- [x] Ejercicios cognitivos
- [x] Sistema de gamificación
- [x] Detección con cámara (básico)
- [x] PWA

### v1.1 (Próximo)
- [ ] Más ejercicios (30+ total)
- [ ] Gráficos de progreso con Chart.js
- [ ] Modo oscuro
- [ ] Soporte de voz completo
- [ ] Ejercicios de equilibrio con acelerómetro

### v2.0 (Futuro)
- [ ] Sincronización opcional en la nube
- [ ] Modo multijugador
- [ ] Integración con wearables
- [ ] IA para recomendaciones personalizadas
- [ ] Soporte multiidioma (inglés, portugués)

## 💝 Donaciones

ReHabilita es 100% gratis y siempre lo será. Si quieres apoyar el desarrollo:
- ⭐ Dale una estrella en GitHub
- 🐛 Reporta bugs o sugiere features
- 🤝 Contribuye con código
- 📢 Comparte con otros que lo necesiten

## 📄 Licencia

MIT License - Libre para usar, modificar y distribuir.

## 👨‍⚕️ Descargo de Responsabilidad

ReHabilita es una herramienta de apoyo y no reemplaza el consejo médico profesional. Siempre consulta con tu médico o terapeuta antes de comenzar cualquier programa de ejercicios.

---

Hecho con ❤️ para ayudar en la recuperación post-ACV

**¿Preguntas? ¿Sugerencias?**
Abre un Issue en GitHub o contáctanos.

#Rehabilitación #ACV #Stroke #OpenSource #Accesibilidad #Salud
