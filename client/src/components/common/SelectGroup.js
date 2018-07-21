import React from 'react'

export const SelectGroup = ({
  selectLabel,
  options,
  onChange,
  value,
  name
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ))
  return (
    <div className="w-50">
      <label htmlFor={name} className="b mr2">{selectLabel}</label>
      <select name={name} id={name} onChange={onChange} value={value}>
        {selectOptions}
      </select>
    </div>
  )
}
