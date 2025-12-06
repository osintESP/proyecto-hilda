/**
 * SISTEMA DE AUDIO
 * Genera sonidos usando Web Audio API
 */

class AudioSystem {
    constructor() {
        this.context = null;
        this.enabled = true;
        this.init();
    }
    
    init() {
        try {
            this.context = new (window.AudioContext || window.webkitAudioContext)();
            this.enabled = localStorage.getItem('sound_effects') !== 'false';
        } catch (error) {
            console.error('Web Audio API no soportada:', error);
            this.enabled = false;
        }
    }
    
    playSuccess() {
        if (!this.enabled) return;
        this.playTone(523.25, 0.1, 'sine'); // C5
        setTimeout(() => this.playTone(659.25, 0.15, 'sine'), 100); // E5
    }
    
    playError() {
        if (!this.enabled) return;
        this.playTone(196, 0.3, 'sawtooth'); // G3
    }
    
    playClick() {
        if (!this.enabled) return;
        this.playTone(800, 0.05, 'square');
    }
    
    playLevelUp() {
        if (!this.enabled) return;
        const notes = [261.63, 329.63, 392, 523.25]; // C, E, G, C
        notes.forEach((freq, idx) => {
            setTimeout(() => this.playTone(freq, 0.2, 'sine'), idx * 100);
        });
    }
    
    playTone(frequency, duration, type = 'sine') {
        if (!this.context) return;
        
        try {
            const oscillator = this.context.createOscillator();
            const gainNode = this.context.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.context.destination);
            
            oscillator.type = type;
            oscillator.frequency.value = frequency;
            
            gainNode.gain.setValueAtTime(0.3, this.context.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(
                0.01,
                this.context.currentTime + duration
            );
            
            oscillator.start(this.context.currentTime);
            oscillator.stop(this.context.currentTime + duration);
        } catch (error) {
            console.error('Error playing tone:', error);
        }
    }
    
    setEnabled(enabled) {
        this.enabled = enabled;
        localStorage.setItem('sound_effects', enabled);
    }
}

window.audioSystem = new AudioSystem();
