/**
 * SISTEMA DE NOTIFICACIONES
 * Muestra mensajes toast al usuario
 */

class NotificationSystem {
    constructor() {
        this.container = document.getElementById('notification');
        this.queue = [];
        this.isShowing = false;
    }
    
    show(message, type = 'info', duration = 3000) {
        this.queue.push({ message, type, duration });
        
        if (!this.isShowing) {
            this.showNext();
        }
    }
    
    showNext() {
        if (this.queue.length === 0) {
            this.isShowing = false;
            return;
        }
        
        this.isShowing = true;
        const { message, type, duration } = this.queue.shift();
        
        if (!this.container) return;
        
        this.container.textContent = message;
        this.container.className = `notification ${type}`;
        this.container.classList.add('show');
        
        setTimeout(() => {
            this.container.classList.remove('show');
            setTimeout(() => this.showNext(), 300);
        }, duration);
    }
    
    success(message) {
        this.show(message, 'success');
    }
    
    error(message) {
        this.show(message, 'error');
    }
    
    info(message) {
        this.show(message, 'info');
    }
}

window.notifications = new NotificationSystem();
