/**
 * SISTEMA DE DETECCIÓN DE MANOS
 * Usa MediaPipe Hands para detectar movimientos
 */

class HandDetection {
    constructor() {
        this.hands = null;
        this.camera = null;
        this.isRunning = false;
        this.onResults = null;
    }
    
    async init() {
        try {
            // Inicializar MediaPipe Hands
            if (typeof Hands === 'undefined') {
                console.warn('MediaPipe Hands no disponible');
                return false;
            }
            
            this.hands = new Hands({
                locateFile: (file) => {
                    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
                }
            });
            
            this.hands.setOptions({
                maxNumHands: 2,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });
            
            return true;
        } catch (error) {
            console.error('Error inicializando detección de manos:', error);
            return false;
        }
    }
    
    async start(videoElement) {
        if (!this.hands) {
            await this.init();
        }
        
        if (!this.hands) {
            console.error('No se pudo inicializar detección de manos');
            return;
        }
        
        this.hands.onResults((results) => {
            if (this.onResults) {
                this.onResults(results);
            }
            this.drawResults(results);
        });
        
        this.camera = new Camera(videoElement, {
            onFrame: async () => {
                await this.hands.send({ image: videoElement });
            },
            width: 1280,
            height: 720
        });
        
        this.camera.start();
        this.isRunning = true;
    }
    
    stop() {
        if (this.camera) {
            this.camera.stop();
        }
        this.isRunning = false;
    }
    
    drawResults(results) {
        const canvas = document.getElementById('output-canvas');
        if (!canvas) return;
        
        const canvasCtx = canvas.getContext('2d');
        const videoElement = document.getElementById('video-input');
        
        if (!canvasCtx || !videoElement) return;
        
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        
        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
                    color: '#00FF00',
                    lineWidth: 5
                });
                drawLandmarks(canvasCtx, landmarks, {
                    color: '#FF0000',
                    lineWidth: 2
                });
            }
        }
        
        canvasCtx.restore();
    }
    
    // Detectar tap de dedos
    detectFingerTap(landmarks) {
        if (!landmarks || landmarks.length < 21) return null;
        
        const thumb = landmarks[4];
        const index = landmarks[8];
        const middle = landmarks[12];
        const ring = landmarks[16];
        const pinky = landmarks[20];
        
        const thumbToIndex = this.distance(thumb, index);
        const thumbToMiddle = this.distance(thumb, middle);
        const thumbToRing = this.distance(thumb, ring);
        const thumbToPinky = this.distance(thumb, pinky);
        
        const threshold = 0.05;
        
        if (thumbToIndex < threshold) return 'index';
        if (thumbToMiddle < threshold) return 'middle';
        if (thumbToRing < threshold) return 'ring';
        if (thumbToPinky < threshold) return 'pinky';
        
        return null;
    }
    
    distance(point1, point2) {
        const dx = point1.x - point2.x;
        const dy = point1.y - point2.y;
        const dz = (point1.z || 0) - (point2.z || 0);
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    }
    
    startFingerTappingExercise(container) {
        console.log('Iniciando ejercicio de finger tapping con cámara');
        
        const feedbackEl = document.getElementById('exercise-feedback');
        const repsEl = document.getElementById('camera-reps');
        
        let reps = 0;
        let lastTap = null;
        
        this.onResults = (results) => {
            if (!results.multiHandLandmarks || results.multiHandLandmarks.length === 0) {
                if (feedbackEl) feedbackEl.textContent = 'No se detecta mano';
                return;
            }
            
            const tap = this.detectFingerTap(results.multiHandLandmarks[0]);
            
            if (tap && tap !== lastTap) {
                reps++;
                if (repsEl) repsEl.textContent = reps;
                if (feedbackEl) feedbackEl.textContent = `¡${tap} detectado!`;
                
                if (window.audioSystem) {
                    window.audioSystem.playSuccess();
                }
                
                lastTap = tap;
            } else if (!tap) {
                lastTap = null;
                if (feedbackEl) feedbackEl.textContent = 'Esperando...';
            }
        };
    }
}

window.handDetection = new HandDetection();
