const InputField = ({ extraClasses ='', label, name, type = 'text', value, onChange, onBlur, disabled, placeholder, error }) => (
  <label className={`form__label | mb-16 ${extraClasses}`}>
    {label}
    <input
      className="form__input"
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      placeholder={placeholder}
    />
    {error && <p className="error-message">{error}</p>}
  </label>
);

export default InputField;
