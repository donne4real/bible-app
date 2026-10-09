import {
  isRemoteTranslation,
  findMatchRange,
  matchesSearch,
  clearCache,
} from './bibleLoader';

describe('isRemoteTranslation', () => {
  it('should return true for remote translations', () => {
    expect(isRemoteTranslation('nlt')).toBe(true);
    expect(isRemoteTranslation('amp')).toBe(true);
    expect(isRemoteTranslation('niv')).toBe(true);
  });

  it('should return false for local translations', () => {
    expect(isRemoteTranslation('web')).toBe(false);
    expect(isRemoteTranslation('kjv')).toBe(false);
    expect(isRemoteTranslation('yor')).toBe(false);
  });
});

describe('findMatchRange', () => {
  it('should find simple substring match', () => {
    const result = findMatchRange('In the beginning God created', 'beginning');
    expect(result).toEqual([7, 16]);
  });

  it('should return null for no match', () => {
    const result = findMatchRange('In the beginning', 'xyz');
    expect(result).toBeNull();
  });

  it('should handle case-insensitive matching', () => {
    const result = findMatchRange('Hello World', 'hello');
    expect(result).toEqual([0, 5]);
  });

  it('should handle empty query', () => {
    const result = findMatchRange('Hello World', '');
    expect(result).toBeNull();
  });

  it('should handle Arabic diacritics', () => {
    const arabicText = 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ';
    const result = findMatchRange(arabicText, 'الله');
    expect(result).not.toBeNull();
  });

  it('should match at the start of text', () => {
    const result = findMatchRange('Hello World', 'Hello');
    expect(result).toEqual([0, 5]);
  });

  it('should match at the end of text', () => {
    const result = findMatchRange('Hello World', 'World');
    expect(result).toEqual([6, 11]);
  });
});

describe('matchesSearch', () => {
  it('should return true for matching text', () => {
    expect(matchesSearch('In the beginning God created', 'beginning')).toBe(true);
  });

  it('should return false for non-matching text', () => {
    expect(matchesSearch('In the beginning', 'xyz')).toBe(false);
  });

  it('should handle empty query', () => {
    expect(matchesSearch('Hello', '')).toBe(false);
  });

  it('should be case-insensitive', () => {
    expect(matchesSearch('Hello World', 'hello')).toBe(true);
    expect(matchesSearch('Hello World', 'HELLO')).toBe(true);
  });
});

describe('clearCache', () => {
  it('should be callable without errors', () => {
    expect(() => clearCache()).not.toThrow();
  });
});
