export const darkSelectStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    backgroundColor: '#334155',
    borderColor: isFocused ? '#2563EB' : '#475569',
    boxShadow: isFocused ? '0 0 0 1px #2563EB' : 'none',
    '&:hover': {
      borderColor: isFocused ? '#2563EB' : '#475569',
    },
    color: '#e5e7eb',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#1E293B',
    border: '1px solid #334155',
  }),
  option: (styles, { isDisabled, isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected
      ? '#2563EB'
      : isFocused
        ? '#334155'
        : 'transparent',
    color: isSelected ? 'white' : '#e5e7eb',
    cursor: isDisabled ? 'not-allowed' : 'default',
    '&:active': {
      backgroundColor: '#2563EB',
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#2563EB',
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: 'white',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'white',
    ':hover': {
      backgroundColor: '#1D4ED8',
      color: 'white',
    },
  }),
  input: (styles) => ({
    ...styles,
    color: '#e5e7eb',
  }),
  placeholder: (styles) => ({
    ...styles,
    color: '#94A3B8',
  }),
  singleValue: (styles) => ({
    ...styles,
    color: '#e5e7eb',
  }),
  noOptionsMessage: (styles) => ({
    ...styles,
    color: '#94A3B8',
  }),
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999
  }),
};