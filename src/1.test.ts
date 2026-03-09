import { describe, it, expect } from 'vitest';
import { 
  createUser, 
  createBook, 
  calculateArea, 
  getStatusColor, 
  UpperFirst, 
  TrimStr, 
  getFirstElement, 
  findById,
  users
} from './1';

describe('createUser', () => {
  it('should create a user with id, name and isActive true', () => {
    const user = createUser(1, 'John');
    expect(user).toEqual({
      id: 1,
      name: 'John',
      email: undefined,
      isActive: true
    });
  });

  it('should create a user with email when provided', () => {
    const user = createUser(2, 'Jane', 'jane@mail.com');
    expect(user).toEqual({
      id: 2,
      name: 'Jane',
      email: 'jane@mail.com',
      isActive: true
    });
  });
});

describe('createBook', () => {
  it('should return the same book object', () => {
    const book = {
      title: 'Test Book',
      author: 'Author',
      year: 2024,
      genre: 'fiction' as const
    };
    expect(createBook(book)).toBe(book);
  });

  it('should work with book without year', () => {
    const book = {
      title: 'Test Book',
      author: 'Author',
      genre: 'non-fiction' as const
    };
    expect(createBook(book)).toEqual(book);
  });
});

describe('calculateArea', () => {
  it('should calculate circle area correctly', () => {
    expect(calculateArea('circle', { radius: 5 })).toBeCloseTo(Math.PI * 25);
    expect(calculateArea('circle', { radius: 0 })).toBe(0);
  });

  it('should calculate square area correctly', () => {
    expect(calculateArea('square', { side: 4 })).toBe(16);
    expect(calculateArea('square', { side: 0 })).toBe(0);
  });
});

describe('getStatusColor', () => {
  it('should return green for active status', () => {
    expect(getStatusColor('active')).toBe('green');
  });

  it('should return yellow for new status', () => {
    expect(getStatusColor('new')).toBe('yellow');
  });

  it('should return red for inactive status', () => {
    expect(getStatusColor('inactive')).toBe('red');
  });
});

describe('UpperFirst', () => {
  it('should capitalize first letter and lowercase the rest', () => {
    expect(UpperFirst('hello')).toBe('Hello');
    expect(UpperFirst('HELLO')).toBe('Hello');
    expect(UpperFirst('hELLO')).toBe('Hello');
  });

  it('should return uppercase when uppercase flag is true', () => {
    expect(UpperFirst('hello', true)).toBe('HELLO');
  });

  it('should handle empty string', () => {
    expect(UpperFirst('')).toBe('');
  });
});

describe('TrimStr', () => {
  it('should trim whitespace from string', () => {
    expect(TrimStr('  hello  ')).toBe('hello');
    expect(TrimStr('\n\tworld\n')).toBe('world');
  });

  it('should trim and uppercase when flag is true', () => {
    expect(TrimStr('  hello  ', true)).toBe('HELLO');
  });

  it('should handle empty string', () => {
    expect(TrimStr('')).toBe('');
  });
});

describe('getFirstElement', () => {
  it('should return first element of array', () => {
    expect(getFirstElement([10, 20, 30])).toBe(10);
    expect(getFirstElement(['a', 'b', 'c'])).toBe('a');
  });

  it('should return undefined for empty array', () => {
    expect(getFirstElement([])).toBeUndefined();
  });
});

describe('findById', () => {
  it('should find user by id', () => {
    expect(findById(users, 1)).toEqual(users[0]);
    expect(findById(users, 2)).toEqual(users[1]);
  });

  it('should return undefined when id not found', () => {
    expect(findById(users, 99)).toBeUndefined();
  });
});