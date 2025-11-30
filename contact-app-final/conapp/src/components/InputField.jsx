import React from 'react';

function InputField({ label, register, errors, name, type = "text", placeholder }) {
  return (
    <div className="form-group">
      <label>{label}</label>
      <input type={type} placeholder={placeholder} {...register(name)} />
      {errors[name] && <span className="error">{errors[name].message}</span>}
    </div>
  );
}

export default InputField;