/**
 * EJERCICIOS DE LENGUAJE Y HABLA
 * Basados en terapia de afasia y recuperación del lenguaje
 */

class SpeechExercises {
    constructor() {
        this.exercises = this.getAllExercises();
    }
    
    getAllExercises() {
        return [
            {
                id: 'sentence_completion',
                name: 'Completar Frases',
                category: 'speech',
                subcategory: 'language',
                description: 'Completa las frases con la palabra correcta',
                icon: '✍️',
                difficulty: 2,
                duration: 240,
                targetScore: 10,
                instructions: [
                    'Lee la frase incompleta',
                    'Selecciona la palabra correcta',
                    'Completa 10 frases'
                ],
                benefits: [
                    'Mejora comprensión verbal',
                    'Entrena gramática',
                    'Fortalece vocabulario'
                ],
                setup: (container) => this.setupSentenceCompletion(container),
                camera: false
            }
        ];
    }
    
    setupSentenceCompletion(container) {
        const sentences = [
            { text: 'El sol brilla en el ___', options: ['cielo', 'agua', 'árbol'], answer: 'cielo' },
            { text: 'Me gusta tomar ___ en la mañana', options: ['café', 'cama', 'zapatos'], answer: 'café' },
            { text: 'El perro ___ muy fuerte', options: ['ladra', 'vuela', 'nada'], answer: 'ladra' }
        ];
        
        container.innerHTML = `
            <div class="exercise-container">
                <h2 class="exercise-title">Completar Frases</h2>
                <p class="exercise-instructions">Selecciona la palabra correcta</p>
                <p>Ejercicio en desarrollo...</p>
            </div>
        `;
        
        return {};
    }
}

window.speechExercises = new SpeechExercises();
