import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for state that persists to localStorage
 * @param key - localStorage key
 * @param defaultValue - default value if nothing is stored
 * @param options - serialization options
 */
export function usePersistedState<T>(
  key: string,
  defaultValue: T,
  options: {
    serialize?: (value: T) => string;
    deserialize?: (raw: string) => T;
  } = {}
): [T, (value: T | ((prev: T) => T)) => void] {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = options;

  const [state, setState] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw !== null) {
        return deserialize(raw);
      }
    } catch {
      // If parsing fails, return default
    }
    return defaultValue;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, serialize(state));
    } catch {
      // localStorage might be full or disabled
    }
  }, [key, state, serialize]);

  return [state, setState];
}

/**
 * Specialized hook for persisted state with simple JSON serialization
 */
export function usePersistedJSONState<T>(key: string, defaultValue: T) {
  return usePersistedState<T>(key, defaultValue);
}

/**
 * Specialized hook for persisted string state
 */
export function usePersistedStringState(key: string, defaultValue: string) {
  return usePersistedState<string>(key, defaultValue, {
    serialize: (v) => v,
    deserialize: (v) => v,
  });
}

/**
 * Specialized hook for persisted number state
 */
export function usePersistedNumberState(key: string, defaultValue: number) {
  return usePersistedState<number>(key, defaultValue, {
    serialize: (v) => String(v),
    deserialize: (v) => parseInt(v, 10) || defaultValue,
  });
}

/**
 * Specialized hook for persisted boolean state
 */
export function usePersistedBooleanState(key: string, defaultValue: boolean) {
  return usePersistedState<boolean>(key, defaultValue, {
    serialize: (v) => String(v),
    deserialize: (v) => v === 'true',
  });
}
