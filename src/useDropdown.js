import React, { useState } from 'react';

const useDropdown = (label, defaultState, options) => {
  const [state, setState] = useState(defaultState);
  const id = `use-dropdown-${label.replace(' ', '').toLowerCase()}`;
  const Dropdown = () => (
    <label htmlFor={id}>
      {label}
      <select
        value={state}
        id={id}
        onChange={e => setState(e.target.value)}
        onBlur={e => setState(e.target.value)}
      >
        <option>ALL</option>
        {options.map(item => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );

  return [state, Dropdown, setState];
};

export default useDropdown;
