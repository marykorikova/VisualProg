import { describe, it, expect } from 'vitest';
import { csvToJSON } from '../src/csvToJSON';

describe('csvToJSON', () => {
  it('should convert valid CSV array to JSON objects', () => {
    const input = ["p1;p2;p3;p4", "1;A;b;c", "2;B;v;d"];
    const delimiter = ';';
    const expected = [
      { p1: '1', p2: 'A', p3: 'b', p4: 'c' },
      { p1: '2', p2: 'B', p3: 'v', p4: 'd' }
    ];
    expect(csvToJSON(input, delimiter)).toEqual(expected);
  });

  it('should throw error if input array is empty', () => {
    expect(() => csvToJSON([], ';')).toThrow('Input array is empty');
  });

  it('should throw error if row has incompatibled field count', () => {
    const input = ["h1;h2", "a;b;c"];
    expect(() => csvToJSON(input, ';')).toThrow('Row 2 has 3 fields, expected 2');
  });

  it('should throw error if header row is void', () => {
    const input = ["", "a;b"];
    expect(() => csvToJSON(input, ';')).toThrow();
  });
});