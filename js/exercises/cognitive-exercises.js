/**
 * EJERCICIOS COGNITIVOS
 * Basados en Constant Therapy y otras apps líderes
 */

class CognitiveExercises {
    constructor() {
        this.exercises = this.getAllExercises();
    }
    
    getAllExercises() {
        return [
            {
                id: 'memory_match',
                name: 'Emparejar Cartas',
                category: 'cognitive',
                subcategory: 'memory',
                description: 'Encuentra las parejas de cartas iguales',
                icon: '🃏',
                difficulty: 2,
                duration: 300,
                targetScore: 8,
                instructions: [
                    'Voltea las cartas de dos en dos',
                    'Encuentra todas las parejas',
                    'Intenta recordar las posiciones',
                    'Completa en el menor tiempo posible'
                ],
                benefits: [
                    'Mejora memoria a corto plazo',
                    'Entrena atención visual',
                    'Fortalece concentración'
                ],
                setup: (container) => this.setupMemoryMatch(container),
                camera: false
            },
            
            {
                id: 'sequence_recall',
                name: 'Recordar Secuencia',
                category: 'cognitive',
                subcategory: 'memory',
                description: 'Repite la secuencia de luces en el orden correcto',
                icon: '💡',
                difficulty: 2,
                duration: 240,
                targetScore: 10,
                instructions: [
                    'Observa la secuencia de luces',
                    'Repite la secuencia tocando los botones',
                    'La secuencia se hace más larga cada vez',
                    'Llega al nivel 10'
                ],
                benefits: [
                    'Mejora memoria de trabajo',
                    'Entrena secuenciación',
                    'Aumenta capacidad de atención'
                ],
                setup: (container) => this.setupSequenceRecall(container),
                camera: false
            },
            
            {
                id: 'pattern_completion',
                name: 'Completar Patrón',
                category: 'cognitive',
                subcategory: 'reasoning',
                description: 'Identifica qué figura completa el patrón',
                icon: '🔢',
                difficulty: 3,
                duration: 300,
                targetScore: 10,
                instructions: [
                    'Observa el patrón mostrado',
                    'Identifica la lógica',
                    'Selecciona la figura que falta',
                    'Completa 10 patrones'
                ],
                benefits: [
                    'Mejora razonamiento lógico',
                    'Entrena reconocimiento de patrones',
                    'Fortalece habilidades de resolución'
                ],
                setup: (container) => this.setupPatternCompletion(container),
                camera: false
            },
            
            {
                id: 'word_naming',
                name: 'Nombrar Objetos',
                category: 'cognitive',
                subcategory: 'language',
                description: 'Identifica y nombra los objetos mostrados',
                icon: '🖼️',
                difficulty: 1,
                duration: 240,
                targetScore: 15,
                instructions: [
                    'Mira la imagen',
                    'Selecciona el nombre correcto',
                    'Intenta ser rápido y preciso',
                    'Completa 15 objetos'
                ],
                benefits: [
                    'Mejora denominación',
                    'Entrena vocabulario',
                    'Fortalece procesamiento visual-verbal'
                ],
                setup: (container) => this.setupWordNaming(container),
                camera: false
            },
            
            {
                id: 'attention_task',
                name: 'Tarea de Atención',
                category: 'cognitive',
                subcategory: 'attention',
                description: 'Toca solo los objetos del color indicado',
                icon: '🎯',
                difficulty: 2,
                duration: 180,
                targetScore: 20,
                instructions: [
                    'Se te indicará un color',
                    'Toca solo los objetos de ese color',
                    'Ignora los demás colores',
                    'Mantén la concentración'
                ],
                benefits: [
                    'Mejora atención selectiva',
                    'Entrena control inhibitorio',
                    'Aumenta velocidad de procesamiento'
                ],
                setup: (container) => this.setupAttentionTask(container),
                camera: false
            },
            
            {
                id: 'number_sequence',
                name: 'Secuencia Numérica',
                category: 'cognitive',
                subcategory: 'reasoning',
                description: 'Ordena los números de menor a mayor',
                icon: '🔢',
                difficulty: 2,
                duration: 240,
                targetScore: 10,
                instructions: [
                    'Se mostrarán números desordenados',
                    'Tócalos en orden de menor a mayor',
                    'Sé rápido pero preciso',
                    'Completa 10 secuencias'
                ],
                benefits: [
                    'Mejora procesamiento numérico',
                    'Entrena secuenciación',
                    'Fortalece velocidad de respuesta'
                ],
                setup: (container) => this.setupNumberSequence(container),
                camera: false
            }
        ];
    }
    
    // ==================== MEMORY MATCH ====================
    
    setupMemoryMatch(container) {
        const state = {
            pairs: 8,
            matches: 0,
            flipped: [],
            locked: false,
            attempts: 0,
            startTime: Date.now()
        };
        
        const emojis = ['🍎', '🍌', '🍇', '🍊', '🍓', '🍒', '🥝', '🍑'];
        const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
        
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Emparejar Cartas</h2>
                <p class="exercise-instructions">Encuentra todas las parejas</p>
                
                <div class="exercise-stats" style="margin-bottom: 20px;">
                    <div class="stat">
                        <span class="stat-label">Parejas</span>
                        <span id="pairs-count" class="stat-value">${state.matches}/${state.pairs}</span>
                    </div>
                    <div class="stat">
                        <span class="stat-label">Intentos</span>
                        <span id="attempts-count" class="stat-value">${state.attempts}</span>
                    </div>
                </div>
                
                <div class="memory-grid">
                    ${cards.map((emoji, idx) => `
                        <div class="memory-card" data-index="${idx}" data-emoji="${emoji}">
                            <div class="card-face card-front">?</div>
                            <div class="card-face card-back">${emoji}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
        
        const cardElements = container.querySelectorAll('.memory-card');
        
        cardElements.forEach(card => {
            card.addEventListener('click', () => {
                if (state.locked || card.classList.contains('flipped') || card.classList.contains('matched')) {
                    return;
                }
                
                card.classList.add('flipped');
                state.flipped.push(card);
                
                if (state.flipped.length === 2) {
                    state.locked = true;
                    state.attempts++;
                    
                    const attemptsEl = container.getElementById('attempts-count');
                    attemptsEl.textContent = state.attempts;
                    
                    const [first, second] = state.flipped;
                    const match = first.dataset.emoji === second.dataset.emoji;
                    
                    setTimeout(() => {
                        if (match) {
                            first.classList.add('matched');
                            second.classList.add('matched');
                            state.matches++;
                            
                            const pairsEl = container.getElementById('pairs-count');
                            pairsEl.textContent = `${state.matches}/${state.pairs}`;
                            
                            if (window.audioSystem) {
                                window.audioSystem.playSuccess();
                            }
                            
                            if (state.matches === state.pairs) {
                                setTimeout(() => {
                                    this.completeExercise(container, state, 'memory_match');
                                }, 500);
                            }
                        } else {
                            first.classList.remove('flipped');
                            second.classList.remove('flipped');
                            
                            if (window.audioSystem) {
                                window.audioSystem.playError();
                            }
                        }
                        
                        state.flipped = [];
                        state.locked = false;
                    }, 800);
                }
            });
        });
        
        return state;
    }
    
    // ==================== SEQUENCE RECALL ====================
    
    setupSequenceRecall(container) {
        const state = {
            level: 1,
            targetLevel: 10,
            sequence: [],
            userSequence: [],
            isPlaying: false,
            startTime: Date.now()
        };
        
        const colors = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3', '#F38181'];
        
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Recordar Secuencia</h2>
                <p class="exercise-instructions">Observa y repite la secuencia</p>
                
                <div class="exercise-counter">Nivel ${state.level}/${state.targetLevel}</div>
                
                <div class="sequence-grid">
                    ${colors.map((color, idx) => `
                        <button class="sequence-btn" data-index="${idx}" style="background: ${color};"></button>
                    `).join('')}
                </div>
                
                <button id="start-sequence" class="btn-primary" style="margin-top: 20px;">
                    Ver Secuencia
                </button>
            </div>
        `;
        
        const buttons = container.querySelectorAll('.sequence-btn');
        const startBtn = container.getElementById('start-sequence');
        
        const playSequence = async () => {
            state.isPlaying = true;
            state.userSequence = [];
            startBtn.disabled = true;
            
            // Generar secuencia
            state.sequence = [];
            for (let i = 0; i < state.level + 2; i++) {
                state.sequence.push(Math.floor(Math.random() * colors.length));
            }
            
            // Reproducir secuencia
            for (const idx of state.sequence) {
                await new Promise(resolve => {
                    buttons[idx].classList.add('active');
                    setTimeout(() => {
                        buttons[idx].classList.remove('active');
                        setTimeout(resolve, 300);
                    }, 600);
                });
            }
            
            state.isPlaying = false;
            startBtn.disabled = false;
            startBtn.textContent = 'Tu turno';
        };
        
        startBtn.addEventListener('click', () => {
            if (!state.isPlaying) {
                playSequence();
            }
        });
        
        buttons.forEach((btn, idx) => {
            btn.addEventListener('click', () => {
                if (state.isPlaying || state.sequence.length === 0) return;
                
                btn.classList.add('active');
                setTimeout(() => btn.classList.remove('active'), 300);
                
                state.userSequence.push(idx);
                
                // Verificar
                const currentIndex = state.userSequence.length - 1;
                if (state.userSequence[currentIndex] !== state.sequence[currentIndex]) {
                    // Error
                    if (window.audioSystem) {
                        window.audioSystem.playError();
                    }
                    
                    setTimeout(() => {
                        alert('¡Incorrecto! Intenta de nuevo.');
                        playSequence();
                    }, 500);
                    return;
                }
                
                // Completó la secuencia
                if (state.userSequence.length === state.sequence.length) {
                    state.level++;
                    
                    if (window.audioSystem) {
                        window.audioSystem.playSuccess();
                    }
                    
                    const counter = container.querySelector('.exercise-counter');
                    counter.textContent = `Nivel ${state.level}/${state.targetLevel}`;
                    
                    if (state.level > state.targetLevel) {
                        setTimeout(() => {
                            this.completeExercise(container, state, 'sequence_recall');
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            startBtn.textContent = 'Siguiente Nivel';
                            playSequence();
                        }, 1500);
                    }
                }
            });
        });
        
        return state;
    }
    
    // ==================== WORD NAMING ====================
    
    setupWordNaming(container) {
        const state = {
            score: 0,
            targetScore: 15,
            currentItem: null,
            startTime: Date.now()
        };
        
        const items = [
            { emoji: '🍎', name: 'Manzana', options: ['Manzana', 'Naranja', 'Plátano', 'Pera'] },
            { emoji: '🚗', name: 'Auto', options: ['Auto', 'Bicicleta', 'Avión', 'Barco'] },
            { emoji: '🏠', name: 'Casa', options: ['Casa', 'Edificio', 'Tienda', 'Escuela'] },
            { emoji: '🐕', name: 'Perro', options: ['Perro', 'Gato', 'Conejo', 'Pájaro'] },
            { emoji: '🌳', name: 'Árbol', options: ['Árbol', 'Flor', 'Planta', 'Pasto'] },
            { emoji: '☀️', name: 'Sol', options: ['Sol', 'Luna', 'Estrella', 'Nube'] },
            { emoji: '📱', name: 'Teléfono', options: ['Teléfono', 'Computadora', 'Tablet', 'Reloj'] },
            { emoji: '✏️', name: 'Lápiz', options: ['Lápiz', 'Pluma', 'Marcador', 'Borrador'] },
            { emoji: '👕', name: 'Camisa', options: ['Camisa', 'Pantalón', 'Zapatos', 'Sombrero'] },
            { emoji: '🍕', name: 'Pizza', options: ['Pizza', 'Hamburguesa', 'Pasta', 'Sushi'] },
            { emoji: '⚽', name: 'Pelota', options: ['Pelota', 'Raqueta', 'Red', 'Arco'] },
            { emoji: '📚', name: 'Libro', options: ['Libro', 'Cuaderno', 'Revista', 'Diario'] },
            { emoji: '🎵', name: 'Música', options: ['Música', 'Sonido', 'Ruido', 'Silencio'] },
            { emoji: '🍔', name: 'Hamburguesa', options: ['Hamburguesa', 'Hot Dog', 'Sándwich', 'Wrap'] },
            { emoji: '🌊', name: 'Ola', options: ['Ola', 'Río', 'Lago', 'Mar'] }
        ];
        
        const showNextItem = () => {
            const item = items[state.score];
            state.currentItem = item;
            
            container.innerHTML = `
                <div class="exercise-container">
                    <h2 class="exercise-title">Nombrar Objetos</h2>
                    <p class="exercise-instructions">¿Qué objeto es este?</p>
                    
                    <div class="exercise-counter">${state.score}/${state.targetScore}</div>
                    
                    <div style="font-size: 120px; text-align: center; margin: 40px 0;">
                        ${item.emoji}
                    </div>
                    
                    <div class="word-options">
                        ${item.options.map(option => `
                            <button class="word-btn" data-word="${option}">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
            `;
            
            container.querySelectorAll('.word-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const selected = btn.dataset.word;
                    
                    if (selected === item.name) {
                        btn.classList.add('selected');
                        state.score++;
                        
                        if (window.audioSystem) {
                            window.audioSystem.playSuccess();
                        }
                        
                        setTimeout(() => {
                            if (state.score >= state.targetScore) {
                                this.completeExercise(container, state, 'word_naming');
                            } else {
                                showNextItem();
                            }
                        }, 500);
                    } else {
                        if (window.audioSystem) {
                            window.audioSystem.playError();
                        }
                        btn.style.animation = 'shake 0.5s';
                    }
                });
            });
        };
        
        showNextItem();
        return state;
    }
    
    // ==================== ATTENTION TASK ====================
    
    setupAttentionTask(container) {
        const state = {
            score: 0,
            targetScore: 20,
            errors: 0,
            targetColor: null,
            startTime: Date.now()
        };
        
        const colors = {
            '🔴': 'Rojo',
            '🔵': 'Azul',
            '🟢': 'Verde',
            '🟡': 'Amarillo'
        };
        
        const colorKeys = Object.keys(colors);
        state.targetColor = colorKeys[Math.floor(Math.random() * colorKeys.length)];
        
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Tarea de Atención</h2>
                <p class="exercise-instructions">Toca solo los objetos ${colors[state.targetColor]}</p>
                
                <div style="font-size: 64px; text-align: center; margin: 20px 0;">
                    ${state.targetColor}
                </div>
                
                <div class="exercise-counter">${state.score}/${state.targetScore}</div>
                
                <div id="attention-area" class="interactive-area"></div>
            </div>
        `;
        
        const area = container.getElementById('attention-area');
        
        const spawnObject = () => {
            const obj = document.createElement('div');
            const color = colorKeys[Math.floor(Math.random() * colorKeys.length)];
            obj.className = 'target-object';
            obj.textContent = color;
            obj.dataset.color = color;
            
            const maxX = area.clientWidth - 80;
            const maxY = area.clientHeight - 80;
            obj.style.left = Math.random() * maxX + 'px';
            obj.style.top = Math.random() * maxY + 'px';
            
            area.appendChild(obj);
            
            obj.addEventListener('click', () => {
                if (obj.dataset.color === state.targetColor) {
                    obj.classList.add('hit');
                    state.score++;
                    
                    if (window.audioSystem) {
                        window.audioSystem.playSuccess();
                    }
                    
                    const counter = container.querySelector('.exercise-counter');
                    counter.textContent = `${state.score}/${state.targetScore}`;
                    
                    setTimeout(() => obj.remove(), 300);
                    
                    if (state.score >= state.targetScore) {
                        setTimeout(() => {
                            this.completeExercise(container, state, 'attention_task');
                        }, 500);
                    }
                } else {
                    state.errors++;
                    obj.style.animation = 'shake 0.5s';
                    
                    if (window.audioSystem) {
                        window.audioSystem.playError();
                    }
                }
            });
            
            setTimeout(() => {
                if (obj.parentElement) {
                    obj.remove();
                }
            }, 2000);
        };
        
        // Spawn objects every 800ms
        const interval = setInterval(() => {
            if (state.score >= state.targetScore) {
                clearInterval(interval);
                return;
            }
            spawnObject();
        }, 800);
        
        spawnObject();
        
        return state;
    }
    
    // ==================== NUMBER SEQUENCE ====================
    
    setupNumberSequence(container) {
        const state = {
            level: 1,
            targetLevel: 10,
            sequence: [],
            userSequence: [],
            startTime: Date.now()
        };
        
        const showLevel = () => {
            // Generar números aleatorios
            const count = 5 + state.level;
            state.sequence = [];
            for (let i = 1; i <= count; i++) {
                state.sequence.push(i);
            }
            state.sequence.sort(() => Math.random() - 0.5);
            state.userSequence = [];
            
            const sortedSequence = [...state.sequence].sort((a, b) => a - b);
            
            container.innerHTML = `
                <div class="exercise-container">
                    <h2 class="exercise-title">Secuencia Numérica</h2>
                    <p class="exercise-instructions">Toca los números de menor a mayor</p>
                    
                    <div class="exercise-counter">Nivel ${state.level}/${state.targetLevel}</div>
                    
                    <div class="interactive-area">
                        <div style="display: grid; grid-template-columns: repeat(${Math.min(4, count)}, 1fr); gap: 10px; max-width: 400px; margin: 0 auto;">
                            ${state.sequence.map(num => `
                                <button class="word-btn" data-number="${num}" style="font-size: 32px; padding: 20px;">
                                    ${num}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;
            
            let expectedIndex = 0;
            
            container.querySelectorAll('[data-number]').forEach(btn => {
                btn.addEventListener('click', () => {
                    const clicked = parseInt(btn.dataset.number);
                    
                    if (clicked === sortedSequence[expectedIndex]) {
                        btn.classList.add('selected');
                        btn.disabled = true;
                        expectedIndex++;
                        
                        if (window.audioSystem) {
                            window.audioSystem.playSuccess();
                        }
                        
                        if (expectedIndex === sortedSequence.length) {
                            state.level++;
                            
                            setTimeout(() => {
                                if (state.level > state.targetLevel) {
                                    this.completeExercise(container, state, 'number_sequence');
                                } else {
                                    showLevel();
                                }
                            }, 1000);
                        }
                    } else {
                        btn.style.animation = 'shake 0.5s';
                        
                        if (window.audioSystem) {
                            window.audioSystem.playError();
                        }
                    }
                });
            });
        };
        
        showLevel();
        return state;
    }
    
    // Helper para completar
    setupPatternCompletion(container) {
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Completar Patrón</h2>
                <p class="exercise-instructions">Proximamente</p>
            </div>
        `;
        return {};
    }
    
    // ==================== COMPLETION ====================
    
    completeExercise(container, state, exerciseId) {
        const exercise = this.exercises.find(ex => ex.id === exerciseId);
        const timeSpent = Math.floor((Date.now() - state.startTime) / 1000);
        
        const accuracy = state.errors ? 
            Math.round((state.score / (state.score + state.errors)) * 100) :
            100;
        
        container.innerHTML = `
            <div class="exercise-results">
                <div class="result-icon">🎉</div>
                <h2 class="result-title">¡Excelente Trabajo!</h2>
                
                <div class="result-stats">
                    <div class="result-stat">
                        <span class="result-stat-value">${state.score || state.matches || state.level}</span>
                        <span class="result-stat-label">Puntuación</span>
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
        
        if (window.gamification) {
            window.gamification.recordExerciseCompletion({
                category: exercise.category,
                accuracy: accuracy,
                timeSpent: Math.floor(timeSpent / 60),
                targetTime: Math.floor(exercise.duration / 60)
            });
        }
        
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
window.cognitiveExercises = new CognitiveExercises();
