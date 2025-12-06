#!/bin/bash

# Script para actualizar tu repositorio de GitHub
# https://github.com/osintESP/proyecto-hilda

echo "🚀 Actualizando GitHub con ReHabilita mejorado..."

# Paso 1: Asegurarse de estar en el directorio correcto
cd "$(dirname "$0")"

# Paso 2: Inicializar Git si no existe
if [ ! -d ".git" ]; then
    echo "📦 Inicializando Git..."
    git init
    git remote add origin https://github.com/osintESP/proyecto-hilda.git
fi

# Paso 3: Crear branch nueva para no sobrescribir
echo "🌿 Creando branch 'rehabilita-mejorado'..."
git checkout -b rehabilita-mejorado 2>/dev/null || git checkout rehabilita-mejorado

# Paso 4: Agregar todos los archivos
echo "➕ Agregando archivos..."
git add .

# Paso 5: Hacer commit
echo "💾 Haciendo commit..."
git commit -m "✨ ReHabilita v2.0 - Aplicación completa de rehabilitación

- 🎮 Sistema de gamificación completo (puntos, niveles, insignias)
- 💪 10+ ejercicios motores basados en FitMi/MusicGlove
- 🧠 6+ ejercicios cognitivos tipo Constant Therapy
- 📹 Detección con cámara usando MediaPipe Hands
- ♿ 100% accesible (texto grande, alto contraste)
- 📱 PWA instalable en móvil
- 🔊 Sistema de audio con Web Audio API
- 📊 Estadísticas y exportación de progreso
- 📚 Documentación exhaustiva

Valor equivalente: ~\$1,124 USD en apps de pago
Código: ~5,000 líneas
Todo GRATIS y Open Source ❤️"

# Paso 6: Instrucciones para push
echo ""
echo "✅ ¡Listo para subir a GitHub!"
echo ""
echo "Ahora ejecuta:"
echo "  git push -u origin rehabilita-mejorado"
echo ""
echo "Luego en GitHub:"
echo "  1. Ve a tu repositorio"
echo "  2. Verás un botón 'Compare & pull request'"
echo "  3. Crea el Pull Request"
echo "  4. Haz merge a main"
echo ""
echo "O si quieres reemplazar main directamente:"
echo "  git checkout main"
echo "  git merge rehabilita-mejorado"
echo "  git push origin main"
