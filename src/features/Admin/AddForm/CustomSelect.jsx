import React from 'react';
import Select from 'react-select';

CustomSelect.propTypes = {};

function CustomSelect(props) {
  const { onChange, options, value, className } = props;
  const defaultValue = (options, value) => {
    return options ? options.find((option) => option.value === value) : '';
  };
  return (
    <div className={className} style={{ marginTop: '1%', marginLeft: '-0.5%' }}>
      <Select
        value={defaultValue(options, value)}
        onChange={(value) => {
          onChange(value);
        }}
        options={options}
        placeholder={className}
      />
    </div>
  );
}

export default CustomSelect;
