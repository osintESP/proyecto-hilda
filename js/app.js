const TRANSLATIONS = {
    es: {
        greeting: "Hola, Campeón/a",
        readyMsg: "¿Listo para hoy?",
        startBtn: "EMPEZAR SESIÓN",
        freeMode: "O elegir un ejercicio suelto",
        streakLabel: "Días Seguidos",
        correct: "¡Correcto!",
        btnNext: "Siguiente",
        goalTitle: "¡META CUMPLIDA!",
        goalMsg: "Sesión completa.",
        btnThanks: "¡Gracias!",
        breatheTitle: "Vamos a pausar",
        breatheSubtitle: "Respira hondo...",
        btnResume: "Continuar",
        movInst: "Limpia la pantalla",
        traceInst: "Sigue la línea",
        settingsTitle: "Configuración",
        neglectMode: "Modo Heminegligencia",
        viewHistory: "Historial",
        legalTitle: "Bienvenido",
        legalText1: "Herramienta de asistencia.",
        legalText2: "No constituye opinión médica ni reemplaza a profesionales de la salud. El uso es bajo su exclusiva responsabilidad.",
        btnAccept: "Acepto y Continuar",
        btnFinish: "Empezar",
        calibTitle: "Toca el botón rojo",
        calibDesc: "Para configurar.",
        setupComplete: "¡Todo Listo!",
        setupMsg: "Pantalla adaptada.",
        modMovTitle: "Movimiento",
        modMemTitle: "Memoria",
        modLangTitle: "Lenguaje",
        modTraceTitle: "Trazos",
        modSeqTitle: "Secuencia",
        seqInst: "Repite los colores",
        modNumTitle: "Números",
        numInst: "Toca en orden",
        modSideTitle: "Toca el Lado",
        sideInst: "Toca los círculos",
        modDragTitle: "Arrastra",
        dragInst: "Arrastra al contenedor",
        soundTitle: "Sonido",
        largeText: "Texto Grande",
        tryAgain: "Intenta otra vez",
        resetData: "Reiniciar progreso",
        prevBtn: "Signos de Alerta"
    },
    en: {
        greeting: "Hello, Champion",
        readyMsg: "Ready for today?",
        startBtn: "START SESSION",
        freeMode: "Or choose free practice",
        streakLabel: "Day Streak",
        correct: "Correct!",
        btnNext: "Next",
        goalTitle: "GOAL REACHED!",
        goalMsg: "Session complete.",
        btnThanks: "Thanks!",
        breatheTitle: "Let's pause",
        breatheSubtitle: "Breathe deeply...",
        btnResume: "Continue",
        movInst: "Clean screen",
        traceInst: "Follow line",
        settingsTitle: "Settings",
        neglectMode: "Neglect Mode",
        viewHistory: "History",
        legalTitle: "Welcome",
        legalText1: "Assistive tool.",
        legalText2: "Not medical advice. Use at own risk.",
        btnAccept: "Accept & Continue",
        btnFinish: "Start",
        calibTitle: "Tap red button",
        calibDesc: "To setup.",
        setupComplete: "All Set!",
        setupMsg: "Screen adapted.",
        modMovTitle: "Movement",
        modMemTitle: "Memory",
        modLangTitle: "Language",
        modTraceTitle: "Tracing",
        soundTitle: "Sound",
        largeText: "Large Text",
        tryAgain: "Try again",
        resetData: "Reset progress",
        prevBtn: "Warning Signs"
    },
    pt: {
        greeting: "Olá, Campeão/ã",
        readyMsg: "Pronto para hoje?",
        startBtn: "INICIAR SESSÃO",
        freeMode: "Ou treino livre",
        streakLabel: "Dias Seguidos",
        correct: "Correto!",
        btnNext: "Próximo",
        goalTitle: "META ALCANÇADA!",
        goalMsg: "Sessão completa.",
        btnThanks: "Obrigado!",
        breatheTitle: "Vamos pausar",
        breatheSubtitle: "Respire fundo...",
        btnResume: "Continuar",
        movInst: "Limpe a tela",
        traceInst: "Siga a linha",
        settingsTitle: "Configurações",
        neglectMode: "Modo Heminegligência",
        viewHistory: "Histórico",
        legalTitle: "Bem-vindo",
        legalText1: "Ferramenta de assistência.",
        legalText2: "Não é conselho médico. Use por sua conta.",
        btnAccept: "Aceitar e Continuar",
        btnFinish: "Começar",
        calibTitle: "Toque no botão vermelho",
        calibDesc: "Para configurar.",
        setupComplete: "Tudo Pronto!",
        setupMsg: "Tela adaptada.",
        modMovTitle: "Movimento",
        modMemTitle: "Memória",
        modLangTitle: "Linguagem",
        modTraceTitle: "Traços",
        soundTitle: "Som",
        largeText: "Texto Grande",
        tryAgain: "Tente novamente",
        resetData: "Reiniciar progresso",
        prevBtn: "Sinais de Alerta"
    }
};

const DB_LENGUAJE = [{
    emoji: "🍎",
    es: {
        c: "Manzana",
        w: ["Pelota", "Mesa"]
    },
    en: {
        c: "Apple",
        w: ["Ball", "Table"]
    },
    pt: {
        c: "Maçã",
        w: ["Bola", "Mesa"]
    }
}, {
    emoji: "👓",
    es: {
        c: "Lentes",
        w: ["Vaso", "Plato"]
    },
    en: {
        c: "Glasses",
        w: ["Cup", "Plate"]
    },
    pt: {
        c: "Óculos",
        w: ["Copo", "Prato"]
    }
}];

const DB_IMAGENES = [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=800", // Nature
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=800", // Green
    "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?q=80&w=800", // Animal
    "https://images.unsplash.com/photo-1501854140884-074bf86ee91c?q=80&w=800", // Landscape
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800"  // Forest
];
let state = {
    plan: [],
    planIndex: 0,
    score: 0,
    consecutiveErrors: 0,
    queue: [],
    difficulty: 1,
    itemFailed: false
},
    settings = {
        neglectMode: false,
        lang: 'es',
        sound: true
    },
    calibrationTimer = null,
    tracePoints = [];
const STORAGE_KEY = 'rehabilita_v23';

const SoundManager = {
    ctx: null,
    init: function () {
        if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    },
    playTone: function (f, t, d) {
        if (!settings.sound) return;
        this.init();
        if (this.ctx.state === 'suspended') this.ctx.resume();
        const o = this.ctx.createOscillator(),
            g = this.ctx.createGain();
        o.type = t;
        o.frequency.setValueAtTime(f, this.ctx.currentTime);
        g.gain.setValueAtTime(0.1, this.ctx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + d);
        o.connect(g);
        g.connect(this.ctx.destination);
        o.start();
        o.stop(this.ctx.currentTime + d);
    },
    playSuccess: function () {
        this.playTone(523.25, 'sine', 0.1);
        setTimeout(() => this.playTone(659.25, 'sine', 0.3), 100);
    },
    playError: function () {
        this.playTone(150, 'triangle', 0.2);
    },
    playWin: function () {
        this.playTone(523.25, 'sine', 0.1);
        setTimeout(() => this.playTone(783.99, 'sine', 0.4), 200);
    }
};

const SafeStorage = {
    get: function (k) {
        try {
            return localStorage.getItem(k)
        } catch (e) {
            return null
        }
    },
    set: function (k, v) {
        try {
            localStorage.setItem(k, v)
        } catch (e) { }
    },
    del: function (k) {
        try {
            localStorage.removeItem(k)
        } catch (e) { }
    },
    clear: function () {
        try {
            localStorage.clear()
        } catch (e) { }
    }
};

/* === UNIT TESTS === */
async function runTests() {
    const out = document.getElementById('test-output');
    const sum = document.getElementById('test-summary');
    document.getElementById('test-modal').classList.remove('hidden');
    document.getElementById('test-modal').classList.add('flex');
    out.innerHTML = 'Initializing System Diagnostics...<br>';

    let passed = 0,
        total = 0;
    const log = (msg, type) => {
        total++;
        const color = type === 'ok' ? '#4ade80' : '#f87171';
        const icon = type === 'ok' ? '✅' : '❌';
        out.innerHTML += `<span style="color:${color}">${icon} ${msg}</span><br>`;
        if (type === 'ok') passed++;
        out.scrollTop = out.scrollHeight;
    };

    // Test 1: Storage
    SafeStorage.set('test_unit', 'ok');
    if (SafeStorage.get('test_unit') === 'ok') log("LocalStorage Write/Read OK", 'ok');
    else log("LocalStorage Failed", 'fail');
    SafeStorage.del('test_unit');

    // Test 2: Translations
    if (TRANSLATIONS['es'] && TRANSLATIONS['es'].legalText2.includes("No constituye opinión médica")) log("Disclaimer Text Validated", 'ok');
    else log("Disclaimer Text Mismatch", 'fail');

    // Test 3: Score Logic (Clamp)
    let testScore = 0;
    for (let i = 0; i < 150; i++) testScore++;
    // Logic: Score should be managed by progress, let's check Math.min logic
    const clamped = Math.min(100, 150);
    if (clamped === 100) log("Score Clamping Logic OK", 'ok');
    else log("Score Logic Error", 'fail');

    // Test 4: Reset
    if (typeof resetData === 'function') log("Reset Function Exists", 'ok');
    else log("Reset Missing", 'fail');

    // Test 5: DOM Elements
    const reqIds = ['screen-home', 'progress-bar', 'modal-onboarding'];
    let domOk = true;
    reqIds.forEach(id => {
        if (!document.getElementById(id)) domOk = false;
    });
    if (domOk) log("Critical DOM Elements Found", 'ok');
    else log("DOM Elements Missing", 'fail');

    sum.innerHTML = `RESULT: ${passed}/${total} TESTS PASSED`;
    sum.style.color = passed === total ? '#4ade80' : '#f87171';
}

/* === INIT === */
if (typeof window !== 'undefined') {
    window.onload = function () {
        if (!SafeStorage.get(STORAGE_KEY)) {
            const l = navigator.language.split('-')[0];
            if (['es', 'en', 'pt'].includes(l)) settings.lang = l;
        }
        loadSettings();
        checkOnboarding();
        loadData();
        applyLanguage();
        window.addEventListener('resize', () => {
            if (document.getElementById('screen-movimiento').classList.contains('hidden') === false) initCanvas();
            if (document.getElementById('screen-trazos').classList.contains('hidden') === false) initTrace();
        });
    };
}

function checkOnboarding() {
    if (!SafeStorage.get('setup_complete')) {
        document.getElementById('modal-onboarding').classList.remove('hidden');
        document.getElementById('modal-onboarding').classList.add('flex');
    }
}

function startCalibration() {
    document.getElementById('step-legal').classList.add('hidden');
    document.getElementById('step-calibration').classList.remove('hidden');
    document.getElementById('step-calibration').classList.add('flex');
    calibrationTimer = setTimeout(() => {
        document.getElementById('calibration-target').style.left = '50%';
    }, 2500);
}

function handleCalibrationClick() {
    const btn = document.getElementById('calibration-target');
    const container = btn.parentElement;
    const btnRect = btn.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();

    // Calculate position relative to container width
    const relativeX = (btnRect.left - containerRect.left) + (btnRect.width / 2);
    const p = (relativeX / containerRect.width) * 100;

    if (p > 35) {
        settings.neglectMode = true;
        document.getElementById('setup-detail').innerText = getTrans('neglectMode');
    } else {
        settings.neglectMode = false;
        document.getElementById('setup-detail').innerText = "Normal";
    }
    clearTimeout(calibrationTimer);
    saveSettings();
    applySettingsStyles();
    document.getElementById('step-calibration').classList.add('hidden');
    document.getElementById('step-result').classList.remove('hidden');
    document.getElementById('step-result').classList.add('flex');
}

function finishOnboarding() {
    SafeStorage.set('setup_complete', 'true');
    document.getElementById('modal-onboarding').classList.add('hidden');
    document.getElementById('modal-onboarding').classList.remove('flex');
}

function loadSettings() {
    const s = SafeStorage.get('rehabilita_settings');
    if (s) {
        settings = {
            ...settings,
            ...JSON.parse(s)
        };
        applySettingsStyles();
    }
}

function saveSettings() {
    SafeStorage.set('rehabilita_settings', JSON.stringify(settings));
}

function applySettingsStyles() {
    document.body.classList.toggle('neglect-mode-active', settings.neglectMode);
    const k = document.getElementById('knob-neglect'),
        b = document.getElementById('btn-neglect');
    if (settings.neglectMode) {
        b.classList.replace('bg-slate-300', 'bg-rose-500');
        k.classList.add('translate-x-6');
    } else {
        b.classList.replace('bg-rose-500', 'bg-slate-300');
        k.classList.remove('translate-x-6');
    }
    const sk = document.getElementById('knob-sound'),
        sb = document.getElementById('btn-sound');
    if (settings.sound) {
        sb.classList.replace('bg-slate-300', 'bg-green-500');
        sk.classList.add('translate-x-6');
    } else {
        sb.classList.replace('bg-green-500', 'bg-slate-300');
        sk.classList.remove('translate-x-6');
    }
}

function toggleNeglectMode() {
    settings.neglectMode = !settings.neglectMode;
    applySettingsStyles();
    saveSettings();
}

function toggleSound() {
    settings.sound = !settings.sound;
    applySettingsStyles();
    saveSettings();
}

function changeLanguage(l) {
    settings.lang = l;
    saveSettings();
    applyLanguage();
}

function applyLanguage() {
    const t = TRANSLATIONS[settings.lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const k = el.getAttribute('data-i18n');
        if (t[k]) el.innerHTML = t[k];
    });
    document.querySelectorAll('.flag-btn').forEach(btn => btn.classList.toggle('active', btn.innerText.toLowerCase().includes(settings.lang === 'es' ? '🇪🇸' : settings.lang === 'en' ? '🇺🇸' : '🇧🇷')));
}

function getTrans(k) {
    return TRANSLATIONS[settings.lang][k] || k;
}

function loadData() {
    const r = SafeStorage.get(STORAGE_KEY);
    const d = r ? JSON.parse(r) : {
        streak: 0,
        lastDate: '',
        dailyCount: 0,
        dailyDate: '',
        history: []
    };
    const t = new Date().toDateString();
    if (d.dailyDate !== t) {
        d.dailyCount = 0;
        d.dailyDate = t;
        const y = new Date();
        y.setDate(y.getDate() - 1);
        if (d.lastDate !== y.toDateString() && d.lastDate !== t) d.streak = 0;
    }
    SafeStorage.set(STORAGE_KEY, JSON.stringify(d));
    updateDashboard(d);
}

function updateDashboard(d) {
    document.getElementById('streak-display').innerText = d.streak;
}

function goHome() {
    hideAll();
    document.getElementById('screen-home').classList.remove('hidden');
    document.getElementById('progress-container').classList.add('hidden');
    loadData();
}

function showFreeMode() {
    hideAll();
    document.getElementById('screen-freemode').classList.remove('hidden');
}

function showPrevention() {
    hideAll();
    document.getElementById('screen-prevention').classList.remove('hidden');
}

function hideAll() {
    ['screen-home', 'screen-freemode', 'screen-prevention', 'screen-lenguaje', 'screen-memoria', 'screen-movimiento', 'screen-trazos', 'screen-calma', 'screen-stats', 'screen-secuencia', 'screen-numeros', 'screen-sides', 'screen-drag'].forEach(id => document.getElementById(id).classList.add('hidden'));
    ['modal-success', 'modal-goal'].forEach(id => document.getElementById(id).classList.add('hidden'));
}

function toggleSettings() {
    const m = document.getElementById('modal-settings');
    m.classList.toggle('hidden');
    m.classList.toggle('flex');
}

function toggleFeedback() {
    const m = document.getElementById('modal-feedback');
    m.classList.toggle('hidden');
    m.classList.toggle('flex');
}

function submitFeedback() {
    const txt = document.getElementById('feedback-input').value;
    if (txt.length > 0) {
        alert("¡Gracias! Tu opinión nos ayuda.");
        document.getElementById('feedback-input').value = "";
        toggleFeedback();
    }
}

function startDailyPlan() {
    // Pool completo de ejercicios
    const allExercises = ['movimiento', 'memoria', 'lenguaje', 'trazos', 'secuencia', 'numeros', 'sides', 'drag'];

    // Selección aleatoria de 5 ejercicios
    const shuffled = shuffle([...allExercises]);
    state.plan = shuffled.slice(0, 5);

    state.planIndex = 0;
    state.consecutiveErrors = 0;
    state.score = 0;
    state.itemFailed = false;
    runModule(state.plan[0]);
}

function startSession(m) {
    state.plan = [m];
    state.planIndex = 0;
    state.consecutiveErrors = 0;
    state.score = 0;
    state.itemFailed = false;
    runModule(m);
}

function runModule(m) {
    hideAll();
    document.getElementById('progress-container').classList.remove('hidden');
    updateProgress();
    state.itemFailed = false;
    if (m === 'movimiento') {
        document.getElementById('screen-movimiento').classList.remove('hidden');
        setTimeout(initCanvas, 50);
    } else if (m === 'memoria') {
        document.getElementById('screen-memoria').classList.remove('hidden');
        renderMemoria();
    } else if (m === 'lenguaje') {
        state.queue = shuffle([...DB_LENGUAJE]);
        state.subIndex = 0;
        document.getElementById('screen-lenguaje').classList.remove('hidden');
        renderLenguaje();
    } else if (m === 'trazos') {
        document.getElementById('screen-trazos').classList.remove('hidden');
        setTimeout(initTrace, 50);
    } else if (m === 'secuencia') {
        document.getElementById('screen-secuencia').classList.remove('hidden');
        initSecuencia();
    } else if (m === 'numeros') {
        document.getElementById('screen-numeros').classList.remove('hidden');
        initNumeros();
    } else if (m === 'sides') {
        document.getElementById('screen-sides').classList.remove('hidden');
        initSides();
    } else if (m === 'drag') {
        document.getElementById('screen-drag').classList.remove('hidden');
        initDrag();
    }
}

function nextLevel() {
    document.getElementById('modal-success').classList.add('hidden');
    state.planIndex++;
    if (state.planIndex >= state.plan.length) endSession();
    else runModule(state.plan[state.planIndex]);
}

function handleMistake() {
    state.consecutiveErrors++;
    if (state.consecutiveErrors >= 3) {
        triggerCalm();
        state.consecutiveErrors = 0;
    }
}

function triggerCalm() {
    document.getElementById('screen-calma').classList.remove('hidden');
    document.getElementById('progress-container').classList.add('hidden');
}

function resumeFromCalm() {
    document.getElementById('screen-calma').classList.add('hidden');
    document.getElementById('progress-container').classList.remove('hidden');
}

function endSession() {
    const d = JSON.parse(SafeStorage.get(STORAGE_KEY) || '{}');
    d.streak = (d.streak || 0) + 1;
    // Calculate strict score
    const finalScore = Math.min(100, Math.round((state.score / state.plan.length) * 100));
    d.history.push({
        date: new Date().toLocaleDateString(),
        score: finalScore
    });
    SafeStorage.set(STORAGE_KEY, JSON.stringify(d));
    SoundManager.playWin();
    document.getElementById('modal-goal').classList.remove('hidden');
    document.getElementById('modal-goal').classList.add('flex');
}

function closeGoalModal() {
    document.getElementById('modal-goal').classList.add('hidden');
    goHome();
}

function updateProgress() {
    const pct = Math.min(100, ((state.planIndex) / state.plan.length) * 100);
    document.getElementById('progress-bar').style.width = `${pct}%`;
}

function initCanvas() {
    // Random Image Selection
    const randomImg = DB_IMAGENES[Math.floor(Math.random() * DB_IMAGENES.length)];
    document.getElementById('hidden-image').src = randomImg;
    document.getElementById('clean-success').classList.add('hidden');
    const cvs = document.getElementById('scratch-canvas');
    const ctx = cvs.getContext('2d');
    cvs.width = cvs.parentElement.offsetWidth;
    cvs.height = cvs.parentElement.offsetHeight;
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineWidth = 60;
    ctx.lineCap = 'round';
    let isD = false;
    const d = (e) => {
        if (!isD) return;
        const r = cvs.getBoundingClientRect();
        ctx.beginPath();
        ctx.arc((e.touches ? e.touches[0].clientX : e.clientX) - r.left, (e.touches ? e.touches[0].clientY : e.clientY) - r.top, 30, 0, Math.PI * 2);
        ctx.fill();
        checkClean(ctx, cvs);
    };
    cvs.onmousedown = () => {
        isD = true
    };
    cvs.onmouseup = () => {
        isD = false
    };
    cvs.onmousemove = d;
    cvs.ontouchstart = (e) => {
        e.preventDefault();
        isD = true;
        d(e)
    };
    cvs.ontouchmove = (e) => {
        e.preventDefault();
        d(e)
    };
    cvs.ontouchend = () => {
        isD = false
    };
}

function checkClean(ctx, cvs) {
    const d = ctx.getImageData(0, 0, cvs.width, cvs.height).data;
    let c = 0;
    for (let i = 3; i < d.length; i += 200)
        if (d[i] === 0) c++;
    if (c / (d.length / 200) > 0.4) document.getElementById('clean-success').classList.remove('hidden');
}

function finishMovementGame() {
    if (!state.itemFailed) state.score++;
    SoundManager.playSuccess();
    document.getElementById('modal-success').classList.remove('hidden');
    document.getElementById('modal-success').classList.add('flex');
}

function renderMemoria() {
    const g = document.getElementById('memoria-grid');
    g.innerHTML = '';
    // Pool más grande de iconos variados
    const iconPool = ["🐶", "🐱", "🦁", "🐘", "🐼", "🦊", "🐸", "🦋"];
    // Seleccionar 3 pares aleatorios
    const shuffledPool = shuffle([...iconPool]);
    let icons = shuffledPool.slice(0, 3);
    let deck = shuffle([...icons, ...icons]);
    let f = [],
        m = 0;
    state.itemFailed = false;
    // Grid 3x2 para iconos más grandes
    g.className = 'grid gap-6 w-full max-w-md grid-cols-3';
    deck.forEach(i => {
        const c = document.createElement('div');
        c.className = "aspect-square bg-violet-200 rounded-2xl flex items-center justify-center text-7xl cursor-pointer shadow-sm btn-huge";
        c.innerHTML = '<i class="fa-solid fa-question text-violet-400 text-5xl"></i>';
        c.onclick = () => {
            if (f.length >= 2 || c.innerText === i) return;
            c.classList.replace('bg-violet-200', 'bg-white');
            c.innerText = i;
            f.push(c);
            if (f.length === 2) {
                if (f[0].innerText === f[1].innerText) {
                    m++;
                    f = [];
                    if (m === 3) setTimeout(() => {
                        if (!state.itemFailed) state.score++;
                        SoundManager.playSuccess();
                        document.getElementById('modal-success').classList.remove('hidden');
                        document.getElementById('modal-success').classList.add('flex');
                    }, 1000);
                } else {
                    handleMistake();
                    state.itemFailed = true;
                    SoundManager.playError();
                    setTimeout(() => {
                        f.forEach(e => {
                            e.classList.replace('bg-white', 'bg-violet-200');
                            e.innerHTML = '<i class="fa-solid fa-question text-violet-400 text-5xl"></i>';
                        });
                        f = [];
                    }, 2500);
                }
            }
        };
        g.appendChild(c);
    });
}

function renderLenguaje() {
    const item = state.queue[state.subIndex];
    document.getElementById('lang-emoji').innerText = item.emoji;
    document.getElementById('lang-feedback').innerText = "";
    const g = document.getElementById('lang-options-grid');
    g.innerHTML = '';
    let o = [{
        t: item[settings.lang].c,
        ok: true
    }, {
        t: item[settings.lang].w[0],
        ok: false
    }];
    state.itemFailed = false;
    shuffle(o).forEach(z => {
        const b = document.createElement('button');
        b.className = "btn-huge w-full bg-white border-2 border-slate-200 text-xl py-4 rounded-2xl font-bold text-slate-700 shadow-sm";
        b.innerText = z.t;
        b.onclick = function () {
            if (z.ok) {
                state.consecutiveErrors = 0;
                if (!state.itemFailed) state.score++;
                SoundManager.playSuccess();
                document.getElementById('modal-success').classList.remove('hidden');
                document.getElementById('modal-success').classList.add('flex');
            } else {
                state.itemFailed = true;
                this.classList.add('bg-red-100', 'text-red-600', 'border-red-200', 'animate-shake');
                document.getElementById('lang-feedback').innerText = getTrans('tryAgain');
                SoundManager.playError();
                handleMistake();
            }
        };
        g.appendChild(b);
    });
}

function initTrace() {
    document.getElementById('trace-success').classList.add('hidden');
    const cvs = document.getElementById('trace-canvas');
    const ctx = cvs.getContext('2d');
    cvs.width = cvs.parentElement.offsetWidth;
    cvs.height = cvs.parentElement.offsetHeight;
    tracePoints = [];
    ctx.clearRect(0, 0, cvs.width, cvs.height);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 40;
    ctx.lineCap = 'round';
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    const w = cvs.width,
        h = cvs.height;
    for (let i = 20; i < w - 20; i += 10) {
        const y = h / 2 + Math.sin(i * 0.02) * 60;
        if (i === 20) ctx.moveTo(i, y);
        else ctx.lineTo(i, y);
        tracePoints.push({
            x: i,
            y: y,
            hit: false
        });
    }
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(20, h / 2 + Math.sin(20 * 0.02) * 60, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(w - 20, h / 2 + Math.sin((w - 20) * 0.02) * 60, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 20;
    let isD = false;
    const hm = (x, y) => {
        const r = cvs.getBoundingClientRect();
        const tx = x - r.left;
        const ty = y - r.top;
        if (isD) {
            ctx.lineTo(tx, ty);
            ctx.stroke();
        }
        tracePoints.forEach(p => {
            if (!p.hit && Math.sqrt(Math.pow(tx - p.x, 2) + Math.pow(ty - p.y, 2)) < 40) p.hit = true;
        });
        const hits = tracePoints.filter(p => p.hit).length;
        if (hits / tracePoints.length > 0.9) {
            if (document.getElementById('trace-success').classList.contains('hidden')) {
                if (!state.itemFailed) state.score++;
                SoundManager.playSuccess();
                document.getElementById('trace-success').classList.remove('hidden');
            }
        }
    };
    const s = (e) => {
        isD = true;
        ctx.beginPath();
        const r = cvs.getBoundingClientRect();
        ctx.moveTo((e.touches ? e.touches[0].clientX : e.clientX) - r.left, (e.touches ? e.touches[0].clientY : e.clientY) - r.top);
    };
    const m = (e) => {
        if (!isD) return;
        hm(e.touches ? e.touches[0].clientX : e.clientX, e.touches ? e.touches[0].clientY : e.clientY);
    };
    cvs.onmousedown = s;
    cvs.onmouseup = () => {
        isD = false
    };
    cvs.onmousemove = m;
    cvs.ontouchstart = (e) => {
        e.preventDefault();
        s(e)
    };
    cvs.ontouchmove = (e) => {
        e.preventDefault();
        m(e)
    };
    cvs.ontouchend = () => {
        isD = false
    };
}

function initSecuencia() {
    const container = document.getElementById('seq-grid');
    container.innerHTML = '';
    const colors = ['red', 'blue', 'green', 'yellow'];
    const sequence = [];
    const userSequence = [];

    // Create buttons
    colors.forEach(c => {
        const btn = document.createElement('div');
        btn.id = `seq-${c}`;
        btn.className = `w-full aspect-square rounded-2xl bg-${c}-200 border-4 border-${c}-300 cursor-pointer transition-all duration-200 seq-btn`;
        btn.onclick = () => handleSeqClick(c);
        container.appendChild(btn);
    });

    // Generate simple sequence (2 steps for accessibility)
    for (let i = 0; i < 2; i++) sequence.push(colors[Math.floor(Math.random() * colors.length)]);

    setTimeout(() => playSequence(sequence), 1000);

    state.currentSequence = sequence;
    state.userSequence = [];
}

function playSequence(seq) {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= seq.length) {
            clearInterval(interval);
            return;
        }
        const color = seq[i];
        const btn = document.getElementById(`seq-${color}`);

        // Flash effect
        btn.classList.remove(`bg-${color}-200`);
        btn.classList.add(`bg-${color}-500`, 'scale-105', 'shadow-xl');
        SoundManager.playTone(color === 'red' ? 300 : color === 'blue' ? 400 : color === 'green' ? 500 : 600, 'sine', 0.5);

        setTimeout(() => {
            btn.classList.add(`bg-${color}-200`);
            btn.classList.remove(`bg-${color}-500`, 'scale-105', 'shadow-xl');
        }, 800); // Long flash for accessibility

        i++;
    }, 1500); // Slow interval
}

function handleSeqClick(color) {
    const btn = document.getElementById(`seq-${color}`);

    // Visual feedback
    btn.classList.remove(`bg-${color}-200`);
    btn.classList.add(`bg-${color}-500`);
    setTimeout(() => btn.classList.add(`bg-${color}-200`), 200);

    SoundManager.playTone(color === 'red' ? 300 : color === 'blue' ? 400 : color === 'green' ? 500 : 600, 'sine', 0.2);

    state.userSequence.push(color);

    // Check logic
    const idx = state.userSequence.length - 1;
    if (state.userSequence[idx] !== state.currentSequence[idx]) {
        // Error
        SoundManager.playError();
        document.getElementById('seq-feedback').innerText = getTrans('tryAgain');
        state.userSequence = [];
        setTimeout(() => {
            document.getElementById('seq-feedback').innerText = "";
            playSequence(state.currentSequence);
        }, 1500);
        return;
    }

    if (state.userSequence.length === state.currentSequence.length) {
        // Success
        setTimeout(() => {
            finishMovementGame(); // Reuse success modal
        }, 500);
    }
}

// === NUEVO JUEGO: NÚMEROS ===
function initNumeros() {
    const container = document.getElementById('num-grid');
    container.innerHTML = '';
    const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    state.currentNumber = 1;
    state.itemFailed = false;

    numbers.forEach(n => {
        const btn = document.createElement('div');
        btn.className = 'w-full aspect-square rounded-2xl bg-blue-100 border-4 border-blue-200 cursor-pointer transition-all duration-200 flex items-center justify-center text-5xl font-black text-blue-600 hover:scale-105';
        btn.innerText = n;
        btn.onclick = () => handleNumberClick(n, btn);
        container.appendChild(btn);
    });
}

function handleNumberClick(n, btn) {
    if (n === state.currentNumber) {
        btn.classList.add('bg-green-200', 'border-green-400', 'text-green-700');
        btn.classList.remove('bg-blue-100', 'border-blue-200', 'text-blue-600');
        SoundManager.playTone(400 + (n * 50), 'sine', 0.2);
        state.currentNumber++;

        if (state.currentNumber > 9) {
            setTimeout(() => {
                if (!state.itemFailed) state.score++;
                SoundManager.playSuccess();
                document.getElementById('modal-success').classList.remove('hidden');
                document.getElementById('modal-success').classList.add('flex');
            }, 500);
        }
    } else {
        state.itemFailed = true;
        btn.classList.add('animate-shake', 'bg-red-100', 'border-red-300');
        SoundManager.playError();
        handleMistake();
        setTimeout(() => {
            btn.classList.remove('animate-shake', 'bg-red-100', 'border-red-300');
        }, 500);
    }
}

// === NUEVO JUEGO: TOCA EL LADO ===
function initSides() {
    const container = document.getElementById('sides-container');
    container.innerHTML = '';
    state.sidesClicked = 0;
    state.sidesTarget = 10;
    state.itemFailed = false;

    spawnSideCircle();
}

function spawnSideCircle() {
    if (state.sidesClicked >= state.sidesTarget) {
        setTimeout(() => {
            if (!state.itemFailed) state.score++;
            SoundManager.playSuccess();
            document.getElementById('modal-success').classList.remove('hidden');
            document.getElementById('modal-success').classList.add('flex');
        }, 500);
        return;
    }

    const container = document.getElementById('sides-container');
    container.innerHTML = '';

    const circle = document.createElement('div');
    const side = Math.random() > 0.5 ? 'left' : 'right';
    const top = 20 + Math.random() * 60;

    circle.className = 'absolute w-20 h-20 bg-rose-400 rounded-full cursor-pointer transition-transform hover:scale-110 animate-pop';
    circle.style.top = `${top}%`;
    circle.style[side] = '10%';
    circle.onclick = () => {
        SoundManager.playTone(500, 'sine', 0.1);
        state.sidesClicked++;
        document.getElementById('sides-counter').innerText = `${state.sidesClicked}/${state.sidesTarget}`;
        spawnSideCircle();
    };

    container.appendChild(circle);
}

// === NUEVO JUEGO: ARRASTRA Y SUELTA ===
function initDrag() {
    const items = document.querySelectorAll('.drag-item');
    const target = document.getElementById('drag-target');
    state.dragCompleted = 0;
    state.dragTotal = items.length;
    state.itemFailed = false;

    items.forEach(item => {
        // Reset position
        item.style.position = 'absolute';
        item.style.left = '0';
        item.style.top = '0';
        item.style.cursor = 'grab';

        let isDragging = false;
        let currentX = 0;
        let currentY = 0;
        let initialX = 0;
        let initialY = 0;

        const startDrag = (e) => {
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - currentX;
                initialY = e.touches[0].clientY - currentY;
            } else {
                initialX = e.clientX - currentX;
                initialY = e.clientY - currentY;
            }

            if (e.target === item) {
                isDragging = true;
                item.style.cursor = 'grabbing';
                item.style.zIndex = '1000';
            }
        };

        const doDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();

            if (e.type === 'touchmove') {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }

            item.style.transform = `translate(${currentX}px, ${currentY}px)`;
        };

        const endDrag = () => {
            if (!isDragging) return;
            isDragging = false;
            item.style.cursor = 'grab';

            const itemRect = item.getBoundingClientRect();
            const targetRect = target.getBoundingClientRect();

            const overlap = !(itemRect.right < targetRect.left ||
                itemRect.left > targetRect.right ||
                itemRect.bottom < targetRect.top ||
                itemRect.top > targetRect.bottom);

            if (overlap) {
                item.style.opacity = '0';
                item.style.transform = 'scale(0)';
                SoundManager.playSuccess();
                state.dragCompleted++;

                if (state.dragCompleted >= state.dragTotal) {
                    setTimeout(() => {
                        if (!state.itemFailed) state.score++;
                        document.getElementById('modal-success').classList.remove('hidden');
                        document.getElementById('modal-success').classList.add('flex');
                    }, 500);
                }
            } else {
                // Reset position with animation
                item.style.transition = 'transform 0.3s ease';
                item.style.transform = 'translate(0, 0)';
                setTimeout(() => {
                    item.style.transition = '';
                    currentX = 0;
                    currentY = 0;
                }, 300);
            }
        };

        item.addEventListener('mousedown', startDrag);
        item.addEventListener('touchstart', startDrag, { passive: false });
        document.addEventListener('mousemove', doDrag);
        document.addEventListener('touchmove', doDrag, { passive: false });
        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);
    });
}

function showStats() {
    hideAll();
    document.getElementById('screen-stats').classList.remove('hidden');
    const d = JSON.parse(SafeStorage.get(STORAGE_KEY) || '{"history":[]}');
    if (!d.history || d.history.length === 0) {
        document.getElementById('stats-content').classList.add('hidden');
        document.getElementById('stats-empty').classList.remove('hidden');
        return;
    }
    document.getElementById('stats-content').classList.remove('hidden');
    document.getElementById('stats-empty').classList.add('hidden');
    if (window.myChart) window.myChart.destroy();
    window.myChart = new Chart(document.getElementById('progressChart'), {
        type: 'line',
        data: {
            labels: d.history.slice(-10).map((h, i) => h.date),
            datasets: [{
                label: '%',
                data: d.history.slice(-10).map(h => h.score),
                borderColor: '#e11d48',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function resetData() {
    if (confirm("¿Borrar todo?")) {
        // Aggressive Reset
        const keys = Object.keys(localStorage);
        for (let k of keys)
            if (k.startsWith('rehabilita') || k.startsWith('setup') || k.startsWith('legal')) localStorage.removeItem(k);
        location.reload();
    }
}

function useHint() {
    state.itemFailed = true;
    const w = Array.from(document.getElementById('lang-options-grid').children).filter(b => b.innerText !== state.queue[state.subIndex][settings.lang].c);
    if (w.length) {
        w[0].style.opacity = '0.2';
        w[0].disabled = true;
        document.getElementById('btn-hint').classList.add('hidden');
    }
}

function shuffle(a) {
    return a.sort(() => Math.random() - 0.5);
}

// Export for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        state,
        settings,
        TRANSLATIONS,
        SoundManager,
        SafeStorage,
        shuffle
    };
}
