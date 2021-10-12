import { useState, useCallback } from 'react';
import { useLocalStorage } from 'react-use';
import _omitBy from 'lodash/omitBy';
import _isNil from 'lodash/isNil';

export function useStoredContext(key, defaultValue) {
  const [storedValue, setStoredValue] = useLocalStorage(key, defaultValue);
  const [value, setValue] = useState(storedValue);
  const setter = useCallback(
    (values) => {
      setValue((prev) => {
        // remove empty entries
        const newValue = _omitBy(
          {
            ...prev,
            ...values,
          },
          (v) => _isNil(v) || v === ''
        );
        setStoredValue(newValue);
        return newValue;
      });
    },
    [setStoredValue]
  );
  return [value, setter];
}
