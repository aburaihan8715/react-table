/* eslint-disable react/prop-types */

import DebouncedInput from './DebouncedInput';

const GlobalFilterInput = ({ globalFilter, setGlobalFilter }) => {
  return (
    <span>
      Search:{' '}
      <DebouncedInput
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        placeholder="Search all columns..."
      />
    </span>
  );
};

export default GlobalFilterInput;
