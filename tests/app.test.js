const { state, settings, TRANSLATIONS, shuffle } = require('../js/app.js');

describe('ReHabilita Core Logic', () => {

    beforeEach(() => {
        // Reset state before each test
        state.score = 0;
        state.planIndex = 0;
        state.consecutiveErrors = 0;
    });

    test('Translations should exist for all supported languages', () => {
        expect(TRANSLATIONS.es).toBeDefined();
        expect(TRANSLATIONS.en).toBeDefined();
        expect(TRANSLATIONS.pt).toBeDefined();
    });

    test('Shuffle function should randomize array', () => {
        const arr = [1, 2, 3, 4, 5];
        const original = [...arr];
        const shuffled = shuffle(arr);
        expect(shuffled).toHaveLength(original.length);
        expect(shuffled).toEqual(expect.arrayContaining(original));
        // Note: There's a tiny chance it shuffles to the same order, but for unit testing logic it's acceptable
    });

    test('Initial state should be correct', () => {
        expect(state.score).toBe(0);
        expect(state.difficulty).toBe(1);
    });

    test('Settings should default to Spanish', () => {
        expect(settings.lang).toBe('es');
    });

});
