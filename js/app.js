/**
 * REHABILITA - APLICACIÓN PRINCIPAL
 * Coordinador de todas las funcionalidades
 */

class RehabilitaApp {
    constructor() {
        this.currentView = 'home';
        this.exercises = [];
        this.init();
    }
    
    async init() {
        console.log('🚀 Iniciando ReHabilita...');
        
        // Cargar todos los ejercicios
        this.loadAllExercises();
        
        // Setup event listeners
        this.setupNavigation();
        this.setupSettings();
        this.setupModals();
        this.setupExerciseCards();
        
        // Ocultar loading y mostrar app
        setTimeout(() => {
            document.getElementById('loading-screen').style.display = 'none';
            document.getElementById('app').style.display = 'block';
            
            // Inicializar vista home
            this.showView('home');
            this.updateHomeView();
        }, 1500);
        
        console.log('✅ ReHabilita listo!');
    }
    
    // ==================== CARGA DE EJERCICIOS ====================
    
    loadAllExercises() {
        this.exercises = [];
        
        // Motor exercises
        if (window.motorExercises) {
            this.exercises.push(...window.motorExercises.exercises);
        }
        
        // Cognitive exercises
        if (window.cognitiveExercises) {
            this.exercises.push(...window.cognitiveExercises.exercises);
        }
        
        // Speech exercises (si están disponibles)
        if (window.speechExercises) {
            this.exercises.push(...window.speechExercises.exercises);
        }
        
        console.log(`📚 Cargados ${this.exercises.length} ejercicios`);
    }
    
    // ==================== NAVEGACIÓN ====================
    
    setupNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn');
        
        navButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const view = btn.dataset.view;
                this.showView(view);
                
                // Update active state
                navButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
            });
        });
        
        // Categorías en home
        document.querySelectorAll('.category-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.dataset.category;
                this.showView('exercises');
                this.filterExercises(category);
            });
        });
    }
    
    showView(viewName) {
        this.currentView = viewName;
        
        // Ocultar todas las vistas
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Mostrar vista seleccionada
        const view = document.getElementById(`${viewName}-view`);
        if (view) {
            view.classList.add('active');
            
            // Actualizar contenido según vista
            switch(viewName) {
                case 'home':
                    this.updateHomeView();
                    break;
                case 'exercises':
                    this.updateExercisesView();
                    break;
                case 'progress':
                    this.updateProgressView();
                    break;
                case 'camera':
                    this.updateCameraView();
                    break;
            }
        }
    }
    
    // ==================== VISTA HOME ====================
    
    updateHomeView() {
        // Actualizar progreso diario
        this.updateDailyProgress();
        
        // Actualizar ejercicio recomendado
        this.updateRecommendedExercise();
    }
    
    updateDailyProgress() {
        const goal = parseInt(localStorage.getItem('daily_goal') || '20');
        const today = new Date().toISOString().split('T')[0];
        const dailyData = JSON.parse(localStorage.getItem('daily_data') || '{}');
        const todayMinutes = dailyData[today] || 0;
        
        const progressPercent = Math.min((todayMinutes / goal) * 100, 100);
        
        const goalEl = document.getElementById('daily-goal');
        if (goalEl) {
            goalEl.textContent = `${todayMinutes}/${goal} min`;
        }
        
        const fillEl = document.getElementById('daily-progress-fill');
        if (fillEl) {
            fillEl.style.width = `${progressPercent}%`;
        }
    }
    
    updateRecommendedExercise() {
        // Obtener ejercicio recomendado basado en historial
        const recommended = this.getRecommendedExercise();
        
        if (recommended) {
            const titleEl = document.getElementById('recommended-title');
            const descEl = document.getElementById('recommended-desc');
            
            if (titleEl) titleEl.textContent = recommended.name;
            if (descEl) descEl.textContent = recommended.description;
        }
        
        // Setup botón
        const startBtn = document.getElementById('start-recommended');
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startExercise(recommended);
            });
        }
    }
    
    getRecommendedExercise() {
        // Lógica simple: ejercicio aleatorio de categoría menos practicada
        if (this.exercises.length === 0) return null;
        
        const stats = window.gamification ? window.gamification.stats : null;
        
        if (!stats) {
            return this.exercises[0]; // Default al primero
        }
        
        // Determinar categoría menos practicada
        const categoryScores = {
            motor: stats.motorExercises || 0,
            cognitive: stats.cognitiveExercises || 0,
            speech: stats.speechExercises || 0,
            balance: stats.balanceExercises || 0
        };
        
        const leastPracticed = Object.keys(categoryScores).reduce((a, b) => 
            categoryScores[a] < categoryScores[b] ? a : b
        );
        
        // Buscar ejercicio de esa categoría
        const filtered = this.exercises.filter(ex => ex.category === leastPracticed);
        
        if (filtered.length === 0) return this.exercises[0];
        
        return filtered[Math.floor(Math.random() * filtered.length)];
    }
    
    // ==================== VISTA EJERCICIOS ====================
    
    setupExerciseCards() {
        this.updateExercisesView();
        
        // Setup filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.dataset.filter;
                
                // Update active state
                document.querySelectorAll('.filter-btn').forEach(b => {
                    b.classList.remove('active');
                });
                btn.classList.add('active');
                
                this.filterExercises(filter);
            });
        });
    }
    
    updateExercisesView() {
        this.filterExercises('all');
    }
    
    filterExercises(category) {
        const container = document.getElementById('exercises-list');
        if (!container) return;
        
        const filtered = category === 'all' ? 
            this.exercises : 
            this.exercises.filter(ex => ex.category === category || ex.subcategory === category);
        
        container.innerHTML = filtered.map(exercise => `
            <div class="exercise-card" data-exercise-id="${exercise.id}">
                <div class="exercise-header">
                    <div class="exercise-icon">${exercise.icon}</div>
                    <div class="exercise-level">Nivel ${exercise.difficulty}</div>
                </div>
                <h3>${exercise.name}</h3>
                <p>${exercise.description}</p>
                <div class="exercise-meta">
                    <span>⏱️ ${Math.floor(exercise.duration / 60)} min</span>
                    <span>🎯 ${exercise.targetReps || exercise.targetScore} ${exercise.targetReps ? 'reps' : 'pts'}</span>
                </div>
            </div>
        `).join('');
        
        // Add click handlers
        container.querySelectorAll('.exercise-card').forEach(card => {
            card.addEventListener('click', () => {
                const exerciseId = card.dataset.exerciseId;
                const exercise = this.exercises.find(ex => ex.id === exerciseId);
                if (exercise) {
                    this.startExercise(exercise);
                }
            });
        });
    }
    
    // ==================== VISTA PROGRESO ====================
    
    updateProgressView() {
        const stats = window.gamification ? window.gamification.stats : null;
        
        if (!stats) return;
        
        // Actualizar estadísticas
        const totalTimeEl = document.getElementById('total-time');
        if (totalTimeEl) {
            totalTimeEl.textContent = Math.floor(stats.totalTime);
        }
        
        const completedEl = document.getElementById('completed-exercises');
        if (completedEl) {
            completedEl.textContent = stats.completedExercises;
        }
        
        const accuracyEl = document.getElementById('accuracy');
        if (accuracyEl) {
            // Calcular precisión promedio (placeholder)
            accuracyEl.textContent = '85%';
        }
        
        const badgesEl = document.getElementById('badges-earned');
        if (badgesEl) {
            badgesEl.textContent = window.gamification.badges.length;
        }
        
        // Actualizar insignias
        this.updateBadgesDisplay();
        
        // Setup export button
        const exportBtn = document.getElementById('export-report');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportReport();
            });
        }
    }
    
    updateBadgesDisplay() {
        const container = document.getElementById('badges-grid');
        if (!container) return;
        
        const allBadges = window.gamification ? window.gamification.getAllBadges() : [];
        const earnedBadges = window.gamification ? window.gamification.badges : [];
        
        container.innerHTML = allBadges.map(badge => {
            const earned = earnedBadges.includes(badge.id);
            return `
                <div class="badge-item ${earned ? 'earned' : 'locked'}">
                    <div class="badge-icon">${badge.icon}</div>
                    <div class="badge-name">${badge.name}</div>
                </div>
            `;
        }).join('');
    }
    
    exportReport() {
        if (!window.gamification) return;
        
        const data = window.gamification.exportData();
        
        // Crear documento formateado
        const report = `
REPORTE DE PROGRESO - REHABILITA
================================
Fecha: ${new Date().toLocaleDateString('es-ES')}

RESUMEN GENERAL
--------------
Puntos Totales: ${data.points}
Nivel Actual: ${data.level}
Racha Actual: ${data.streak.count} días
Insignias: ${data.badges.length}

ESTADÍSTICAS
------------
Ejercicios Completados: ${data.stats.completedExercises}
- Movimiento: ${data.stats.motorExercises}
- Cognición: ${data.stats.cognitiveExercises}
- Lenguaje: ${data.stats.speechExercises}
- Equilibrio: ${data.stats.balanceExercises}

Tiempo Total: ${data.stats.totalTime} minutos
Puntuaciones Perfectas: ${data.stats.perfectScores}

INSIGNIAS OBTENIDAS
------------------
${data.badges.join(', ') || 'Ninguna aún'}

---
Este reporte puede ser compartido con tu terapeuta.
        `.trim();
        
        // Descargar como archivo de texto
        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `rehabilita-reporte-${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        
        if (window.gamification) {
            window.gamification.showNotification('Reporte exportado exitosamente', 'success');
        }
    }
    
    // ==================== VISTA CÁMARA ====================
    
    updateCameraView() {
        const startBtn = document.getElementById('start-camera');
        const stopBtn = document.getElementById('stop-camera');
        
        if (startBtn) {
            startBtn.addEventListener('click', () => {
                this.startCamera();
            });
        }
        
        if (stopBtn) {
            stopBtn.addEventListener('click', () => {
                this.stopCamera();
            });
        }
    }
    
    async startCamera() {
        try {
            const video = document.getElementById('video-input');
            if (!video) return;
            
            const stream = await navigator.mediaDevices.getUserMedia({ 
                video: { 
                    width: 1280,
                    height: 720
                } 
            });
            
            video.srcObject = stream;
            
            document.getElementById('start-camera').style.display = 'none';
            document.getElementById('stop-camera').style.display = 'block';
            
            // Iniciar detección de mano si está disponible
            if (window.handDetection) {
                window.handDetection.start(video);
            }
            
        } catch (error) {
            console.error('Error al acceder a la cámara:', error);
            alert('No se pudo acceder a la cámara. Verifica los permisos.');
        }
    }
    
    stopCamera() {
        const video = document.getElementById('video-input');
        if (video && video.srcObject) {
            const tracks = video.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            video.srcObject = null;
        }
        
        document.getElementById('start-camera').style.display = 'block';
        document.getElementById('stop-camera').style.display = 'none';
        
        if (window.handDetection) {
            window.handDetection.stop();
        }
    }
    
    // ==================== EJERCICIOS ====================
    
    startExercise(exercise) {
        const modal = document.getElementById('exercise-modal');
        const area = document.getElementById('exercise-area');
        
        if (!modal || !area) return;
        
        // Mostrar modal
        modal.classList.add('active');
        
        // Cargar ejercicio
        if (exercise.setup) {
            exercise.setup(area);
        } else {
            area.innerHTML = `
                <div class="exercise-container">
                    <h2 class="exercise-title">${exercise.name}</h2>
                    <p>Ejercicio en desarrollo...</p>
                </div>
            `;
        }
    }
    
    // ==================== MODALES Y SETTINGS ====================
    
    setupModals() {
        // Cerrar modales al hacer click en X o fuera
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });
        
        document.querySelectorAll('.modal-close').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.closest('.modal').classList.remove('active');
            });
        });
    }
    
    setupSettings() {
        const settingsBtn = document.getElementById('settings-btn');
        const settingsModal = document.getElementById('settings-modal');
        
        if (settingsBtn && settingsModal) {
            settingsBtn.addEventListener('click', () => {
                settingsModal.classList.add('active');
                this.loadSettings();
            });
        }
        
        // Aplicar settings
        this.setupSettingsControls();
    }
    
    loadSettings() {
        // Cargar valores guardados
        const largeText = localStorage.getItem('large_text') === 'true';
        const highContrast = localStorage.getItem('high_contrast') === 'true';
        const voiceFeedback = localStorage.getItem('voice_feedback') !== 'false';
        const soundEffects = localStorage.getItem('sound_effects') !== 'false';
        const dailyGoal = parseInt(localStorage.getItem('daily_goal') || '20');
        
        // Actualizar controles
        const largeTextEl = document.getElementById('large-text');
        const highContrastEl = document.getElementById('high-contrast');
        const voiceEl = document.getElementById('voice-feedback');
        const soundEl = document.getElementById('sound-effects');
        const goalEl = document.getElementById('daily-goal-input');
        
        if (largeTextEl) largeTextEl.checked = largeText;
        if (highContrastEl) highContrastEl.checked = highContrast;
        if (voiceEl) voiceEl.checked = voiceFeedback;
        if (soundEl) soundEl.checked = soundEffects;
        if (goalEl) goalEl.value = dailyGoal;
        
        // Aplicar clases
        if (largeText) document.body.classList.add('large-text');
        if (highContrast) document.body.classList.add('high-contrast');
    }
    
    setupSettingsControls() {
        // Large text
        const largeTextEl = document.getElementById('large-text');
        if (largeTextEl) {
            largeTextEl.addEventListener('change', (e) => {
                localStorage.setItem('large_text', e.target.checked);
                document.body.classList.toggle('large-text', e.target.checked);
            });
        }
        
        // High contrast
        const highContrastEl = document.getElementById('high-contrast');
        if (highContrastEl) {
            highContrastEl.addEventListener('change', (e) => {
                localStorage.setItem('high_contrast', e.target.checked);
                document.body.classList.toggle('high-contrast', e.target.checked);
            });
        }
        
        // Voice feedback
        const voiceEl = document.getElementById('voice-feedback');
        if (voiceEl) {
            voiceEl.addEventListener('change', (e) => {
                localStorage.setItem('voice_feedback', e.target.checked);
            });
        }
        
        // Sound effects
        const soundEl = document.getElementById('sound-effects');
        if (soundEl) {
            soundEl.addEventListener('change', (e) => {
                localStorage.setItem('sound_effects', e.target.checked);
            });
        }
        
        // Daily goal
        const goalEl = document.getElementById('daily-goal-input');
        if (goalEl) {
            goalEl.addEventListener('change', (e) => {
                localStorage.setItem('daily_goal', e.target.value);
                this.updateDailyProgress();
            });
        }
        
        // Reset progress
        const resetBtn = document.getElementById('reset-progress');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (window.gamification) {
                    window.gamification.resetProgress();
                }
            });
        }
        
        // Export data
        const exportBtn = document.getElementById('export-data');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                if (window.gamification) {
                    window.gamification.exportAsJSON();
                }
            });
        }
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.app = new RehabilitaApp();
    });
} else {
    window.app = new RehabilitaApp();
}
