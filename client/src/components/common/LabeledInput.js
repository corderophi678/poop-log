import React from 'react'

export function LabeledInput({
  type,
  value,
  placeholder,
  onChange,
  name,
  label,
  error
}) {
  return (
    <div className="mt3">
      <label className="db fw6 lh-copy f6" htmlFor={name}>
        {label}
      </label>
      <input
        className="pa2 input-reset ba bg-white b black w-100 measure"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        id={name}
      />
      <div>{error && <small className="red b fw3">{error}</small>}</div>
    </div>
  )
}
