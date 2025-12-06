/**
 * EJERCICIOS MOTORES
 * Basados en las mejores prácticas de FitMi y MusicGlove
 */

class MotorExercises {
    constructor() {
        this.exercises = this.getAllExercises();
    }
    
    getAllExercises() {
        return [
            // ==================== MANO Y DEDOS ====================
            {
                id: 'finger_tapping',
                name: 'Tocar Dedos',
                category: 'motor',
                subcategory: 'hand',
                description: 'Toca cada dedo con tu pulgar en secuencia',
                icon: '👆',
                difficulty: 1,
                duration: 300, // 5 minutos en segundos
                targetReps: 20,
                instructions: [
                    'Coloca tu mano frente a ti',
                    'Toca cada dedo con tu pulgar uno por uno',
                    'Intenta hacer movimientos precisos y controlados',
                    'Repite el patrón completo 20 veces'
                ],
                benefits: [
                    'Mejora la destreza fina',
                    'Fortalece la coordinación dedo-pulgar',
                    'Aumenta el rango de movimiento'
                ],
                setup: (container) => this.setupFingerTapping(container),
                camera: false
            },
            
            {
                id: 'finger_tapping_camera',
                name: 'Tocar Dedos con Cámara',
                category: 'motor',
                subcategory: 'hand',
                description: 'Usa la cámara para detectar tus movimientos de dedos',
                icon: '📹👆',
                difficulty: 2,
                duration: 300,
                targetReps: 15,
                instructions: [
                    'Activa la cámara',
                    'Coloca tu mano frente a la cámara',
                    'Toca cada dedo con tu pulgar',
                    'El sistema detectará tus movimientos automáticamente'
                ],
                benefits: [
                    'Retroalimentación visual en tiempo real',
                    'Medición objetiva del progreso',
                    'Corrección de movimientos'
                ],
                setup: (container) => this.setupFingerTappingCamera(container),
                camera: true
            },
            
            {
                id: 'grasp_release',
                name: 'Agarrar y Soltar',
                category: 'motor',
                subcategory: 'hand',
                description: 'Practica abrir y cerrar tu mano completamente',
                icon: '✊',
                difficulty: 1,
                duration: 240,
                targetReps: 30,
                instructions: [
                    'Cierra tu mano formando un puño',
                    'Abre tu mano extendiendo todos los dedos',
                    'Mantén cada posición por 2 segundos',
                    'Repite 30 veces'
                ],
                benefits: [
                    'Fortalece músculos de la mano',
                    'Mejora el agarre funcional',
                    'Aumenta la fuerza de prensión'
                ],
                setup: (container) => this.setupGraspRelease(container),
                camera: false
            },
            
            {
                id: 'reach_grab',
                name: 'Alcanzar Objetos',
                category: 'motor',
                subcategory: 'arm',
                description: 'Toca los objetos que aparecen en pantalla',
                icon: '🎯',
                difficulty: 2,
                duration: 300,
                targetReps: 20,
                instructions: [
                    'Objetos aparecerán en diferentes posiciones',
                    'Toca cada objeto lo más rápido posible',
                    'Intenta mantener precisión',
                    'Completa 20 objetos'
                ],
                benefits: [
                    'Mejora coordinación ojo-mano',
                    'Aumenta rango de movimiento del brazo',
                    'Practica movimientos funcionales'
                ],
                setup: (container) => this.setupReachGrab(container),
                camera: false
            },
            
            // ==================== BRAZO Y HOMBRO ====================
            {
                id: 'arm_raise',
                name: 'Elevar Brazo',
                category: 'motor',
                subcategory: 'arm',
                description: 'Eleva tu brazo hacia arriba y bájalo lentamente',
                icon: '🙋',
                difficulty: 2,
                duration: 240,
                targetReps: 15,
                instructions: [
                    'Siéntate cómodamente',
                    'Levanta tu brazo lentamente hacia arriba',
                    'Mantén por 3 segundos',
                    'Baja lentamente',
                    'Repite 15 veces'
                ],
                benefits: [
                    'Fortalece hombro',
                    'Previene rigidez',
                    'Mejora rango de movimiento'
                ],
                setup: (container) => this.setupArmRaise(container),
                camera: true
            },
            
            {
                id: 'shoulder_circles',
                name: 'Círculos de Hombro',
                category: 'motor',
                subcategory: 'arm',
                description: 'Realiza movimientos circulares con tu hombro',
                icon: '🔄',
                difficulty: 1,
                duration: 180,
                targetReps: 10,
                instructions: [
                    'Mueve tu hombro en círculos grandes',
                    'Haz 10 círculos hacia adelante',
                    'Luego 10 círculos hacia atrás',
                    'Mantén el movimiento controlado'
                ],
                benefits: [
                    'Aumenta movilidad del hombro',
                    'Previene hombro congelado',
                    'Reduce rigidez'
                ],
                setup: (container) => this.setupShoulderCircles(container),
                camera: false
            },
            
            // ==================== PIERNA Y EQUILIBRIO ====================
            {
                id: 'leg_lift',
                name: 'Elevar Pierna',
                category: 'motor',
                subcategory: 'leg',
                description: 'Sentado, eleva tu pierna hasta que esté paralela al suelo',
                icon: '🦵',
                difficulty: 2,
                duration: 240,
                targetReps: 20,
                instructions: [
                    'Siéntate en una silla',
                    'Extiende una pierna hasta que esté paralela al piso',
                    'Mantén por 3 segundos',
                    'Baja lentamente',
                    'Alterna con la otra pierna'
                ],
                benefits: [
                    'Fortalece cuádriceps',
                    'Mejora equilibrio',
                    'Facilita la marcha'
                ],
                setup: (container) => this.setupLegLift(container),
                camera: false
            },
            
            {
                id: 'ankle_pumps',
                name: 'Bombeo de Tobillo',
                category: 'motor',
                subcategory: 'leg',
                description: 'Mueve tu pie hacia arriba y abajo',
                icon: '🦶',
                difficulty: 1,
                duration: 180,
                targetReps: 30,
                instructions: [
                    'Siéntate cómodamente',
                    'Flexiona tu pie hacia ti',
                    'Extiende tu pie alejándolo',
                    'Repite con control'
                ],
                benefits: [
                    'Previene rigidez',
                    'Mejora circulación',
                    'Fortalece tobillo'
                ],
                setup: (container) => this.setupAnklePumps(container),
                camera: false
            },
            
            // ==================== EQUILIBRIO ====================
            {
                id: 'balance_game',
                name: 'Juego de Equilibrio',
                category: 'motor',
                subcategory: 'balance',
                description: 'Usa el acelerómetro para mantener el equilibrio',
                icon: '⚖️',
                difficulty: 3,
                duration: 300,
                targetReps: 1,
                instructions: [
                    'Sostén tu dispositivo con ambas manos',
                    'Inclínalo para controlar el juego',
                    'Mantén la bola en el centro',
                    'Practica el control fino'
                ],
                benefits: [
                    'Mejora equilibrio y coordinación',
                    'Entrena el control postural',
                    'Desarrolla propiocepción'
                ],
                setup: (container) => this.setupBalanceGame(container),
                camera: false
            }
        ];
    }
    
    // ==================== SETUP FUNCTIONS ====================
    
    setupFingerTapping(container) {
        const state = {
            currentFinger: 0,
            reps: 0,
            targetReps: 20,
            score: 0,
            startTime: Date.now()
        };
        
        const fingers = ['👍', '👆', '🖕', '🤙', '🤞'];
        const fingerNames = ['Pulgar', 'Índice', 'Medio', 'Anular', 'Meñique'];
        
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Tocar Dedos</h2>
                <p class="exercise-instructions">Toca el dedo indicado</p>
                
                <div class="exercise-counter">${state.reps}/${state.targetReps}</div>
                
                <div class="interactive-area">
                    <div class="finger-buttons">
                        ${fingers.map((emoji, idx) => `
                            <button class="finger-btn" data-finger="${idx}">
                                <span class="finger-icon">${emoji}</span>
                                <span class="finger-label">${fingerNames[idx]}</span>
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="live-progress">
                    <div class="progress-text">
                        <div class="progress-label">Progreso</div>
                        <div class="progress-value">${Math.round((state.reps / state.targetReps) * 100)}%</div>
                    </div>
                </div>
            </div>
        `;
        
        // Seleccionar dedo aleatorio
        const selectRandomFinger = () => {
            const buttons = container.querySelectorAll('.finger-btn');
            buttons.forEach(btn => btn.classList.remove('highlight'));
            
            state.currentFinger = Math.floor(Math.random() * fingers.length);
            buttons[state.currentFinger].classList.add('highlight');
        };
        
        selectRandomFinger();
        
        // Event listeners
        container.querySelectorAll('.finger-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const clicked = parseInt(btn.dataset.finger);
                
                if (clicked === state.currentFinger) {
                    btn.classList.add('correct');
                    state.reps++;
                    state.score += 10;
                    
                    // Sonido de éxito
                    if (window.audioSystem) {
                        window.audioSystem.playSuccess();
                    }
                    
                    // Actualizar contador
                    const counter = container.querySelector('.exercise-counter');
                    counter.textContent = `${state.reps}/${state.targetReps}`;
                    
                    const progressValue = container.querySelector('.progress-value');
                    progressValue.textContent = `${Math.round((state.reps / state.targetReps) * 100)}%`;
                    
                    setTimeout(() => {
                        btn.classList.remove('correct');
                        
                        if (state.reps >= state.targetReps) {
                            // Completado
                            this.completeExercise(container, state, 'finger_tapping');
                        } else {
                            selectRandomFinger();
                        }
                    }, 300);
                } else {
                    btn.classList.add('incorrect');
                    
                    if (window.audioSystem) {
                        window.audioSystem.playError();
                    }
                    
                    setTimeout(() => {
                        btn.classList.remove('incorrect');
                    }, 500);
                }
            });
        });
        
        return state;
    }
    
    setupFingerTappingCamera(container) {
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Tocar Dedos con Cámara</h2>
                <p class="exercise-instructions">Coloca tu mano frente a la cámara</p>
                
                <div class="video-container">
                    <video id="exercise-video" autoplay playsinline></video>
                    <canvas id="exercise-canvas"></canvas>
                    <div id="exercise-feedback" class="camera-feedback">
                        Detectando mano...
                    </div>
                </div>
                
                <div class="exercise-stats">
                    <div class="stat">
                        <span class="stat-label">Repeticiones</span>
                        <span id="camera-reps" class="stat-value">0</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Precisión</span>
                        <span id="camera-accuracy" class="stat-value">0%</span>
                    </div>
                </div>
                
                <button id="stop-camera-exercise" class="btn-danger">
                    Detener Ejercicio
                </button>
            </div>
        `;
        
        // Iniciar detección de mano
        if (window.handDetection) {
            window.handDetection.startFingerTappingExercise(container);
        }
        
        return {};
    }
    
    setupGraspRelease(container) {
        const state = {
            reps: 0,
            targetReps: 30,
            phase: 'close', // 'close' or 'open'
            startTime: Date.now()
        };
        
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Agarrar y Soltar</h2>
                <p class="exercise-instructions">Sigue las instrucciones visuales</p>
                
                <div class="exercise-counter">${state.reps}/${state.targetReps}</div>
                
                <div class="interactive-area">
                    <div id="hand-visual" class="hand-visual">
                        <div class="hand-icon">✋</div>
                        <div class="hand-instruction">Cierra tu mano</div>
                    </div>
                </div>
                
                <button id="complete-rep" class="btn-primary btn-large">
                    Completar Repetición
                </button>
            </div>
        `;
        
        const handIcon = container.querySelector('.hand-icon');
        const instruction = container.querySelector('.hand-instruction');
        const completeBtn = container.getElementById('complete-rep');
        
        completeBtn.addEventListener('click', () => {
            if (state.phase === 'close') {
                // Cambiar a fase de abrir
                handIcon.textContent = '✊';
                instruction.textContent = 'Abre tu mano';
                state.phase = 'open';
                completeBtn.textContent = 'Mano Abierta';
            } else {
                // Completar repetición
                state.reps++;
                state.phase = 'close';
                handIcon.textContent = '✋';
                instruction.textContent = 'Cierra tu mano';
                completeBtn.textContent = 'Completar Repetición';
                
                const counter = container.querySelector('.exercise-counter');
                counter.textContent = `${state.reps}/${state.targetReps}`;
                
                if (window.audioSystem) {
                    window.audioSystem.playSuccess();
                }
                
                if (state.reps >= state.targetReps) {
                    this.completeExercise(container, state, 'grasp_release');
                }
            }
        });
        
        return state;
    }
    
    setupReachGrab(container) {
        const state = {
            score: 0,
            targetScore: 20,
            misses: 0,
            startTime: Date.now()
        };
        
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Alcanzar Objetos</h2>
                <p class="exercise-instructions">Toca los objetos lo más rápido que puedas</p>
                
                <div class="exercise-counter">${state.score}/${state.targetScore}</div>
                
                <div id="reach-area" class="interactive-area"></div>
            </div>
        `;
        
        const area = container.getElementById('reach-area');
        const emojis = ['🍎', '⚽', '🎯', '⭐', '🎁', '🌟', '💎', '🏀'];
        
        const spawnObject = () => {
            const obj = document.createElement('div');
            obj.className = 'target-object';
            obj.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            
            // Posición aleatoria
            const maxX = area.clientWidth - 80;
            const maxY = area.clientHeight - 80;
            obj.style.left = Math.random() * maxX + 'px';
            obj.style.top = Math.random() * maxY + 'px';
            
            area.appendChild(obj);
            
            // Click handler
            obj.addEventListener('click', () => {
                obj.classList.add('hit');
                state.score++;
                
                const counter = container.querySelector('.exercise-counter');
                counter.textContent = `${state.score}/${state.targetScore}`;
                
                if (window.audioSystem) {
                    window.audioSystem.playSuccess();
                }
                
                setTimeout(() => obj.remove(), 500);
                
                if (state.score >= state.targetScore) {
                    this.completeExercise(container, state, 'reach_grab');
                } else {
                    setTimeout(() => spawnObject(), 500);
                }
            });
            
            // Auto-remove después de 3 segundos
            setTimeout(() => {
                if (obj.parentElement) {
                    obj.remove();
                    state.misses++;
                    spawnObject();
                }
            }, 3000);
        };
        
        // Iniciar con primer objeto
        spawnObject();
        
        return state;
    }
    
    setupArmRaise(container) {
        const state = {
            reps: 0,
            targetReps: 15,
            phase: 'ready',
            startTime: Date.now()
        };
        
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Elevar Brazo</h2>
                <p class="exercise-instructions">Levanta tu brazo lentamente</p>
                
                <div class="exercise-counter">${state.reps}/${state.targetReps}</div>
                
                <p style="text-align: center; color: var(--text-secondary); margin: 20px 0;">
                    Activa la cámara para detección automática o usa el botón manual
                </p>
                
                <button id="manual-complete" class="btn-primary btn-large">
                    Completar Elevación
                </button>
            </div>
        `;
        
        const btn = container.getElementById('manual-complete');
        btn.addEventListener('click', () => {
            state.reps++;
            const counter = container.querySelector('.exercise-counter');
            counter.textContent = `${state.reps}/${state.targetReps}`;
            
            if (window.audioSystem) {
                window.audioSystem.playSuccess();
            }
            
            if (state.reps >= state.targetReps) {
                this.completeExercise(container, state, 'arm_raise');
            }
        });
        
        return state;
    }
    
    setupShoulderCircles(container) {
        return this.setupSimpleRepExercise(container, {
            title: 'Círculos de Hombro',
            instructions: 'Realiza círculos con tu hombro',
            targetReps: 20,
            exerciseId: 'shoulder_circles'
        });
    }
    
    setupLegLift(container) {
        return this.setupSimpleRepExercise(container, {
            title: 'Elevar Pierna',
            instructions: 'Extiende tu pierna paralela al suelo',
            targetReps: 20,
            exerciseId: 'leg_lift'
        });
    }
    
    setupAnklePumps(container) {
        return this.setupSimpleRepExercise(container, {
            title: 'Bombeo de Tobillo',
            instructions: 'Flexiona y extiende tu pie',
            targetReps: 30,
            exerciseId: 'ankle_pumps'
        });
    }
    
    setupBalanceGame(container) {
        // Implementación simple del juego de equilibrio
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Juego de Equilibrio</h2>
                <p class="exercise-instructions">Mantén la bola en el centro</p>
                <p style="text-align: center; color: var(--text-secondary);">
                    Proximamente: Juego con acelerómetro
                </p>
            </div>
        `;
        
        return {};
    }
    
    // Helper para ejercicios simples
    setupSimpleRepExercise(container, config) {
        const state = {
            reps: 0,
            targetReps: config.targetReps,
            startTime: Date.now()
        };
        
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">${config.title}</h2>
                <p class="exercise-instructions">${config.instructions}</p>
                
                <div class="exercise-counter">${state.reps}/${state.targetReps}</div>
                
                <button id="complete-rep" class="btn-primary btn-large">
                    Completar Repetición
                </button>
            </div>
        `;
        
        const btn = container.getElementById('complete-rep');
        btn.addEventListener('click', () => {
            state.reps++;
            const counter = container.querySelector('.exercise-counter');
            counter.textContent = `${state.reps}/${state.targetReps}`;
            
            if (window.audioSystem) {
                window.audioSystem.playSuccess();
            }
            
            if (state.reps >= state.targetReps) {
                this.completeExercise(container, state, config.exerciseId);
            }
        });
        
        return state;
    }
    
    // ==================== COMPLETION ====================
    
    completeExercise(container, state, exerciseId) {
        const timeSpent = Math.floor((Date.now() - state.startTime) / 1000);
        const exercise = this.exercises.find(ex => ex.id === exerciseId);
        
        const accuracy = state.score ? 
            Math.round((state.score / (state.score + (state.misses || 0))) * 100) :
            100;
        
        container.innerHTML = `
            <div class="exercise-results">
                <div class="result-icon">🎉</div>
                <h2 class="result-title">¡Excelente Trabajo!</h2>
                
                <div class="result-stats">
                    <div class="result-stat">
                        <span class="result-stat-value">${state.reps || state.score}</span>
                        <span class="result-stat-label">Repeticiones</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-stat-value">${accuracy}%</span>
                        <span class="result-stat-label">Precisión</span>
                    </div>
                    <div class="result-stat">
                        <span class="result-stat-value">${Math.floor(timeSpent / 60)}:${(timeSpent % 60).toString().padStart(2, '0')}</span>
                        <span class="result-stat-label">Tiempo</span>
                    </div>
                </div>
                
                <div class="stars">
                    <span class="star ${accuracy >= 60 ? 'filled' : ''}">⭐</span>
                    <span class="star ${accuracy >= 80 ? 'filled' : ''}">⭐</span>
                    <span class="star ${accuracy >= 95 ? 'filled' : ''}">⭐</span>
                </div>
                
                <div class="exercise-actions">
                    <button id="repeat-exercise" class="btn-secondary">
                        Repetir
                    </button>
                    <button id="close-exercise" class="btn-primary">
                        Continuar
                    </button>
                </div>
            </div>
        `;
        
        // Guardar progreso
        if (window.gamification) {
            window.gamification.recordExerciseCompletion({
                category: exercise.category,
                accuracy: accuracy,
                timeSpent: Math.floor(timeSpent / 60),
                targetTime: Math.floor(exercise.duration / 60)
            });
        }
        
        // Event listeners
        container.getElementById('repeat-exercise').addEventListener('click', () => {
            exercise.setup(container);
        });
        
        container.getElementById('close-exercise').addEventListener('click', () => {
            const modal = document.getElementById('exercise-modal');
            if (modal) modal.classList.remove('active');
        });
    }
}

// Instancia global
window.motorExercises = new MotorExercises();
