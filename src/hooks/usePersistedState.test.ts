import { renderHook, act } from '@testing-library/react';
import {
  usePersistedState,
  usePersistedJSONState,
  usePersistedStringState,
  usePersistedNumberState,
  usePersistedBooleanState,
} from './usePersistedState';

describe('usePersistedState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should return default value when localStorage is empty', () => {
    const { result } = renderHook(() =>
      usePersistedState('test-key', 'default')
    );

    expect(result.current[0]).toBe('default');
  });

  it('should update state and persist to localStorage', () => {
    const { result } = renderHook(() =>
      usePersistedState('test-key', 'initial')
    );

    act(() => {
      result.current[1]('updated');
    });

    expect(result.current[0]).toBe('updated');
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', '"updated"');
  });

  it('should load value from localStorage on init', () => {
    // Pre-populate the store directly
    localStorage.setItem('test-key', '"stored-value"');

    const { result } = renderHook(() =>
      usePersistedState('test-key', 'default')
    );

    expect(result.current[0]).toBe('stored-value');
  });

  it('should handle function updater', () => {
    const { result } = renderHook(() =>
      usePersistedState('test-key', 0)
    );

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(1);
  });
});

describe('usePersistedJSONState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should handle complex objects', () => {
    const defaultValue = { name: 'Test', count: 0 };
    const { result } = renderHook(() =>
      usePersistedJSONState('test-key', defaultValue)
    );

    expect(result.current[0]).toEqual(defaultValue);

    act(() => {
      result.current[1]({ name: 'Updated', count: 5 });
    });

    expect(result.current[0]).toEqual({ name: 'Updated', count: 5 });
  });

  it('should handle arrays', () => {
    const { result } = renderHook(() =>
      usePersistedJSONState<string[]>('test-key', [])
    );

    act(() => {
      result.current[1](['a', 'b', 'c']);
    });

    expect(result.current[0]).toEqual(['a', 'b', 'c']);
  });
});

describe('usePersistedStringState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should store and retrieve strings without JSON encoding', () => {
    const { result } = renderHook(() =>
      usePersistedStringState('test-key', 'default')
    );

    act(() => {
      result.current[1]('hello world');
    });

    expect(result.current[0]).toBe('hello world');
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', 'hello world');
  });
});

describe('usePersistedNumberState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should store and retrieve numbers', () => {
    const { result } = renderHook(() =>
      usePersistedNumberState('test-key', 0)
    );

    act(() => {
      result.current[1](42);
    });

    expect(result.current[0]).toBe(42);
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', '42');
  });

  it('should return default for invalid stored value', () => {
    localStorage.setItem('test-key', 'not-a-number');

    const { result } = renderHook(() =>
      usePersistedNumberState('test-key', 10)
    );

    expect(result.current[0]).toBe(10);
  });
});

describe('usePersistedBooleanState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should store and retrieve booleans', () => {
    const { result } = renderHook(() =>
      usePersistedBooleanState('test-key', false)
    );

    act(() => {
      result.current[1](true);
    });

    expect(result.current[0]).toBe(true);
    expect(localStorage.setItem).toHaveBeenCalledWith('test-key', 'true');
  });

  it('should handle false correctly', () => {
    localStorage.setItem('test-key', 'false');

    const { result } = renderHook(() =>
      usePersistedBooleanState('test-key', true)
    );

    expect(result.current[0]).toBe(false);
  });
});
