const FormSection = ({ name, className, label, detail, errorMessage, handleInputChange, type}) => {
  return (
    <div className={`form__${className} form-section`}>
      <label htmlFor={name} className={`form__${className}--label`}>{label}</label>
      <input type={type} className={`form__${className}--input`} name={name} onChange={handleInputChange} value={detail} />
      {
        errorMessage ?
          <div className={`form__${className}--error`}>
            <span className={`form__${className}--error-message error-message`}>{errorMessage}</span>
          </div>
          :
          null
      }
    </div>
  )
}

export default FormSection;