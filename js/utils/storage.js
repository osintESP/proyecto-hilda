/**
 * SISTEMA DE ALMACENAMIENTO LOCAL
 */

class StorageSystem {
    constructor() {
        this.prefix = 'rehabilita_';
    }
    
    set(key, value) {
        try {
            const serialized = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, serialized);
            return true;
        } catch (error) {
            console.error('Error saving to storage:', error);
            return false;
        }
    }
    
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Error reading from storage:', error);
            return defaultValue;
        }
    }
    
    remove(key) {
        localStorage.removeItem(this.prefix + key);
    }
    
    clear() {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith(this.prefix)) {
                localStorage.removeItem(key);
            }
        });
    }
    
    recordDailyTime(minutes) {
        const today = new Date().toISOString().split('T')[0];
        const dailyData = this.get('daily_data', {});
        
        dailyData[today] = (dailyData[today] || 0) + minutes;
        this.set('daily_data', dailyData);
        
        return dailyData[today];
    }
    
    getTodayTime() {
        const today = new Date().toISOString().split('T')[0];
        const dailyData = this.get('daily_data', {});
        return dailyData[today] || 0;
    }
}

window.storage = new StorageSystem();
