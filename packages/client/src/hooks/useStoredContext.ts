import { useState, useCallback } from 'react';
import { useLocalStorage } from 'react-use';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';

export type UseStoredContextReturns<T> = [
  T | undefined,
  (value: T | undefined) => void
];

export default function useStoredContext<T>(
  key: string,
  defaultValue: T
): UseStoredContextReturns<T> {
  const [storedValue, setStoredValue] = useLocalStorage(key, defaultValue);
  const [value, setValue] = useState(storedValue);
  const setter = useCallback(
    (values) => {
      setValue((prev) => {
        let newValue = values;
        if (typeof prev === 'object' && typeof values === 'object') {
          // if object, merge and remove empty entries
          newValue = _omitBy(
            {
              ...prev,
              ...values,
            },
            (v) => _isNil(v) || (typeof v === 'string' && v === '')
          );
        }
        setStoredValue(newValue);
        return newValue;
      });
    },
    [setStoredValue]
  );
  return [value, setter];
}
