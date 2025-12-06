/**
 * SISTEMA DE GAMIFICACIÓN
 * Maneja puntos, niveles, rachas e insignias
 */

class GamificationSystem {
    constructor() {
        this.points = this.loadPoints();
        this.level = this.calculateLevel();
        this.streak = this.loadStreak();
        this.badges = this.loadBadges();
        this.stats = this.loadStats();
        
        this.pointsPerExercise = 10;
        this.pointsPerStreak = 50;
        this.pointsPerLevel = 100;
        
        this.init();
    }
    
    init() {
        this.updateDisplay();
        this.checkDailyStreak();
        this.checkBadges();
    }
    
    // ==================== PUNTOS ====================
    
    loadPoints() {
        return parseInt(localStorage.getItem('rehab_points') || '0');
    }
    
    savePoints() {
        localStorage.setItem('rehab_points', this.points.toString());
    }
    
    addPoints(amount, reason = '') {
        this.points += amount;
        this.savePoints();
        this.level = this.calculateLevel();
        this.updateDisplay();
        this.showNotification(`+${amount} puntos! ${reason}`, 'success');
        this.checkBadges();
        return this.points;
    }
    
    // ==================== NIVELES ====================
    
    calculateLevel() {
        // Fórmula: nivel = floor(sqrt(puntos / 100)) + 1
        return Math.floor(Math.sqrt(this.points / 100)) + 1;
    }
    
    getPointsForNextLevel() {
        const nextLevel = this.level + 1;
        return Math.pow(nextLevel - 1, 2) * 100;
    }
    
    getProgressToNextLevel() {
        const currentLevelPoints = Math.pow(this.level - 1, 2) * 100;
        const nextLevelPoints = this.getPointsForNextLevel();
        const progress = (this.points - currentLevelPoints) / (nextLevelPoints - currentLevelPoints);
        return Math.min(Math.max(progress * 100, 0), 100);
    }
    
    // ==================== RACHAS ====================
    
    loadStreak() {
        const data = JSON.parse(localStorage.getItem('rehab_streak') || '{"count":0,"lastDate":""}');
        return data;
    }
    
    saveStreak() {
        localStorage.setItem('rehab_streak', JSON.stringify(this.streak));
    }
    
    checkDailyStreak() {
        const today = this.getToday();
        const lastDate = this.streak.lastDate;
        
        if (lastDate === today) {
            // Ya completó hoy
            return this.streak.count;
        }
        
        const yesterday = this.getYesterday();
        if (lastDate === yesterday) {
            // Continuó la racha
            this.streak.count++;
            this.streak.lastDate = today;
            this.saveStreak();
            
            // Bonus por racha
            if (this.streak.count % 7 === 0) {
                this.addPoints(this.pointsPerStreak, `🔥 ${this.streak.count} días de racha!`);
            }
        } else if (lastDate !== '' && lastDate !== yesterday) {
            // Perdió la racha
            this.streak.count = 1;
            this.streak.lastDate = today;
            this.saveStreak();
            this.showNotification('Comenzaste una nueva racha! 🔥', 'info');
        } else {
            // Primera vez
            this.streak.count = 1;
            this.streak.lastDate = today;
            this.saveStreak();
        }
        
        this.updateDisplay();
        return this.streak.count;
    }
    
    getToday() {
        return new Date().toISOString().split('T')[0];
    }
    
    getYesterday() {
        const date = new Date();
        date.setDate(date.getDate() - 1);
        return date.toISOString().split('T')[0];
    }
    
    // ==================== INSIGNIAS ====================
    
    loadBadges() {
        return JSON.parse(localStorage.getItem('rehab_badges') || '[]');
    }
    
    saveBadges() {
        localStorage.setItem('rehab_badges', JSON.stringify(this.badges));
    }
    
    checkBadges() {
        const allBadges = this.getAllBadges();
        
        allBadges.forEach(badge => {
            if (!this.badges.includes(badge.id) && this.checkBadgeCondition(badge)) {
                this.unlockBadge(badge);
            }
        });
    }
    
    checkBadgeCondition(badge) {
        switch(badge.condition) {
            case 'first_exercise':
                return this.stats.completedExercises >= 1;
            
            case 'complete_10':
                return this.stats.completedExercises >= 10;
            
            case 'complete_50':
                return this.stats.completedExercises >= 50;
            
            case 'complete_100':
                return this.stats.completedExercises >= 100;
            
            case 'streak_7':
                return this.streak.count >= 7;
            
            case 'streak_30':
                return this.streak.count >= 30;
            
            case 'streak_100':
                return this.streak.count >= 100;
            
            case 'level_5':
                return this.level >= 5;
            
            case 'level_10':
                return this.level >= 10;
            
            case 'level_20':
                return this.level >= 20;
            
            case 'perfect_10':
                return this.stats.perfectScores >= 10;
            
            case 'motor_master':
                return this.stats.motorExercises >= 50;
            
            case 'cognitive_master':
                return this.stats.cognitiveExercises >= 50;
            
            case 'speech_master':
                return this.stats.speechExercises >= 50;
            
            case 'total_time_10':
                return this.stats.totalTime >= 600; // 10 horas en minutos
            
            default:
                return false;
        }
    }
    
    unlockBadge(badge) {
        this.badges.push(badge.id);
        this.saveBadges();
        this.addPoints(badge.points, `Insignia desbloqueada: ${badge.name}!`);
        this.showBadgeUnlocked(badge);
    }
    
    getAllBadges() {
        return [
            {
                id: 'first_exercise',
                name: 'Primera Victoria',
                description: 'Completa tu primer ejercicio',
                icon: '🎯',
                points: 50,
                condition: 'first_exercise'
            },
            {
                id: 'complete_10',
                name: 'Comenzando',
                description: 'Completa 10 ejercicios',
                icon: '🌟',
                points: 100,
                condition: 'complete_10'
            },
            {
                id: 'complete_50',
                name: 'Dedicado',
                description: 'Completa 50 ejercicios',
                icon: '💪',
                points: 250,
                condition: 'complete_50'
            },
            {
                id: 'complete_100',
                name: 'Campeón',
                description: 'Completa 100 ejercicios',
                icon: '🏆',
                points: 500,
                condition: 'complete_100'
            },
            {
                id: 'streak_7',
                name: 'Constancia',
                description: 'Mantén una racha de 7 días',
                icon: '🔥',
                points: 200,
                condition: 'streak_7'
            },
            {
                id: 'streak_30',
                name: 'Disciplinado',
                description: 'Mantén una racha de 30 días',
                icon: '🔥🔥',
                points: 500,
                condition: 'streak_30'
            },
            {
                id: 'streak_100',
                name: 'Imparable',
                description: 'Mantén una racha de 100 días',
                icon: '🔥🔥🔥',
                points: 1000,
                condition: 'streak_100'
            },
            {
                id: 'level_5',
                name: 'Avanzando',
                description: 'Alcanza el nivel 5',
                icon: '⭐',
                points: 150,
                condition: 'level_5'
            },
            {
                id: 'level_10',
                name: 'Experto',
                description: 'Alcanza el nivel 10',
                icon: '⭐⭐',
                points: 300,
                condition: 'level_10'
            },
            {
                id: 'level_20',
                name: 'Maestro',
                description: 'Alcanza el nivel 20',
                icon: '⭐⭐⭐',
                points: 600,
                condition: 'level_20'
            },
            {
                id: 'perfect_10',
                name: 'Perfeccionista',
                description: 'Obtén 10 puntuaciones perfectas',
                icon: '💯',
                points: 300,
                condition: 'perfect_10'
            },
            {
                id: 'motor_master',
                name: 'Maestro del Movimiento',
                description: 'Completa 50 ejercicios motores',
                icon: '✋',
                points: 300,
                condition: 'motor_master'
            },
            {
                id: 'cognitive_master',
                name: 'Cerebro Brillante',
                description: 'Completa 50 ejercicios cognitivos',
                icon: '🧠',
                points: 300,
                condition: 'cognitive_master'
            },
            {
                id: 'speech_master',
                name: 'Comunicador Experto',
                description: 'Completa 50 ejercicios de lenguaje',
                icon: '💬',
                points: 300,
                condition: 'speech_master'
            },
            {
                id: 'total_time_10',
                name: 'Dedicación Total',
                description: 'Acumula 10 horas de práctica',
                icon: '⏱️',
                points: 500,
                condition: 'total_time_10'
            }
        ];
    }
    
    // ==================== ESTADÍSTICAS ====================
    
    loadStats() {
        return JSON.parse(localStorage.getItem('rehab_stats') || JSON.stringify({
            completedExercises: 0,
            motorExercises: 0,
            cognitiveExercises: 0,
            speechExercises: 0,
            balanceExercises: 0,
            perfectScores: 0,
            totalTime: 0,
            lastCompleted: null
        }));
    }
    
    saveStats() {
        localStorage.setItem('rehab_stats', JSON.stringify(this.stats));
    }
    
    recordExerciseCompletion(exerciseData) {
        this.stats.completedExercises++;
        
        // Categoría
        switch(exerciseData.category) {
            case 'motor':
                this.stats.motorExercises++;
                break;
            case 'cognitive':
                this.stats.cognitiveExercises++;
                break;
            case 'speech':
                this.stats.speechExercises++;
                break;
            case 'balance':
                this.stats.balanceExercises++;
                break;
        }
        
        // Puntuación perfecta
        if (exerciseData.accuracy >= 100) {
            this.stats.perfectScores++;
        }
        
        // Tiempo
        this.stats.totalTime += exerciseData.timeSpent;
        this.stats.lastCompleted = new Date().toISOString();
        
        this.saveStats();
        
        // Puntos base
        let points = this.pointsPerExercise;
        
        // Bonus por precisión
        if (exerciseData.accuracy >= 90) {
            points += 20;
        } else if (exerciseData.accuracy >= 80) {
            points += 10;
        }
        
        // Bonus por velocidad (si es rápido y preciso)
        if (exerciseData.timeSpent < exerciseData.targetTime && exerciseData.accuracy >= 80) {
            points += 15;
        }
        
        this.addPoints(points, '¡Ejercicio completado!');
        this.checkDailyStreak();
        this.checkBadges();
    }
    
    // ==================== UI ====================
    
    updateDisplay() {
        // Puntos
        const pointsEl = document.getElementById('points-count');
        if (pointsEl) pointsEl.textContent = this.points.toLocaleString();
        
        // Nivel
        const levelEl = document.getElementById('level-count');
        if (levelEl) levelEl.textContent = this.level;
        
        // Racha
        const streakEl = document.getElementById('streak-count');
        if (streakEl) streakEl.textContent = this.streak.count;
        
        const streakDaysEl = document.getElementById('streak-days');
        if (streakDaysEl) streakDaysEl.textContent = this.streak.count;
        
        // Mensaje de racha
        const streakMessage = this.getStreakMessage();
        const streakMessageEl = document.getElementById('streak-message');
        if (streakMessageEl) streakMessageEl.textContent = streakMessage;
    }
    
    getStreakMessage() {
        const count = this.streak.count;
        if (count === 0) return '¡Comienza tu racha hoy!';
        if (count < 3) return '¡Buen comienzo!';
        if (count < 7) return '¡Mantén el ritmo!';
        if (count < 14) return '¡Una semana completa! 🎉';
        if (count < 30) return '¡Impresionante constancia!';
        if (count < 100) return '¡Un mes completo! 🏆';
        return '¡Eres imparable! 🔥🔥🔥';
    }
    
    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }
    
    showBadgeUnlocked(badge) {
        // Crear elemento de insignia desbloqueada
        const badgeEl = document.createElement('div');
        badgeEl.className = 'badge-unlocked';
        badgeEl.innerHTML = `
            <div class="badge-unlocked-content">
                <div class="badge-icon">${badge.icon}</div>
                <h3>¡Nueva Insignia!</h3>
                <p class="badge-name">${badge.name}</p>
                <p class="badge-desc">${badge.description}</p>
                <p class="badge-points">+${badge.points} puntos</p>
            </div>
        `;
        
        document.body.appendChild(badgeEl);
        
        setTimeout(() => {
            badgeEl.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            badgeEl.classList.remove('show');
            setTimeout(() => badgeEl.remove(), 300);
        }, 4000);
        
        // Efecto de sonido (si está habilitado)
        if (this.isSoundEnabled()) {
            this.playSound('badge-unlocked');
        }
    }
    
    isSoundEnabled() {
        return localStorage.getItem('sound_effects') !== 'false';
    }
    
    playSound(soundName) {
        // Placeholder - se implementará con el sistema de audio
        console.log(`Playing sound: ${soundName}`);
    }
    
    // ==================== EXPORTAR ====================
    
    exportData() {
        const data = {
            points: this.points,
            level: this.level,
            streak: this.streak,
            badges: this.badges,
            stats: this.stats,
            exportDate: new Date().toISOString()
        };
        
        return data;
    }
    
    exportAsJSON() {
        const data = this.exportData();
        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `rehabilita-progreso-${this.getToday()}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }
    
    resetProgress() {
        if (!confirm('¿Estás seguro de que quieres reiniciar todo tu progreso? Esta acción no se puede deshacer.')) {
            return false;
        }
        
        localStorage.removeItem('rehab_points');
        localStorage.removeItem('rehab_streak');
        localStorage.removeItem('rehab_badges');
        localStorage.removeItem('rehab_stats');
        
        this.points = 0;
        this.level = 1;
        this.streak = { count: 0, lastDate: '' };
        this.badges = [];
        this.stats = {
            completedExercises: 0,
            motorExercises: 0,
            cognitiveExercises: 0,
            speechExercises: 0,
            balanceExercises: 0,
            perfectScores: 0,
            totalTime: 0,
            lastCompleted: null
        };
        
        this.updateDisplay();
        this.showNotification('Progreso reiniciado', 'info');
        
        return true;
    }
}

// Instancia global
window.gamification = new GamificationSystem();
