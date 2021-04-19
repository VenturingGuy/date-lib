let dateTest = require('../src/index.js');
let testClass = dateTest.D;

let trial = new testClass();

test('get year', () => {
    expect(trial.year).toBe(2021);
  });

test('get short year', () => {
expect(trial.yr).toBe(21);
});

test('get month', () => {
expect(trial.month).toBe('April');
});

test('get short month', () => {
expect(trial.mon).toBe('Apr');
});

test('get day', () => {
expect(trial.day).toBe('Sunday');
});

test('get short day', () => {
expect(trial.dy).toBe('Sun');
});

test('get date', () => {
expect(trial.date).toBe(18);
});

test('get hour', () => {
expect(trial.hours).toBe(20);
});

test('get minutes', () => {
expect(trial.mins).toBe(25);
});

test('get the seconds', () => {
expect(trial.secs).toBe(0);
});

test('trial.format()', () => {
        expect(trial.format('M d Y')).toBe('April 18 2021');
        expect(trial.format('M, d Y')).toBe('April, 18 2021');
        expect(trial.format('y/m/d')).toBe('21/Apr/18');
        expect(trial.format('H:I:S')).toBe('08:32:05');
        expect(trial.format('h:i:s')).toBe('8:32:5');
        expect(trial.format('Y-M-D h:I:S')).toBe('2021-April-18 8:32:05');
});

test('Sanity Check', () => {
    expect(2+2).toBe(4)
})