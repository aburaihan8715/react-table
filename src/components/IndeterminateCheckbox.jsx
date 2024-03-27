/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';

export default function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [indeterminate, rest.checked]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}
