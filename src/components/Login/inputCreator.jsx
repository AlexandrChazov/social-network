export const inputCreator = (type, placeholder, inputClassName, spanClassName, label) =>
  ({input, meta}) => {
    return (
      <div>
        <label>{label}</label>
        {meta.error && meta.touched
          ? <>
            <input {...input} type={type} placeholder={placeholder} className={inputClassName}/>
            <span className={spanClassName}>{meta.error}</span>
          </>
          : <input {...input} type={type} placeholder={placeholder}/>}
      </div>
  )
}