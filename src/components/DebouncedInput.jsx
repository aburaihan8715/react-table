/* eslint-disable react/prop-types */

import { useEffect, useState } from 'react';

// A debounced input react component
export default function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value, onChange, debounce]);

  return (
    <input
      style={{ padding: '5px' }}
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
