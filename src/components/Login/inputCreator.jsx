export const inputCreator = (type, placeholder, inputClassName, spanClassName) =>
  ({input, meta}) => {
    return (
      <div>
        <label>Login</label>
        {meta.error && meta.touched
          ? <>
            <input {...input} type={type} placeholder={placeholder} className={inputClassName}/>
            <span className={spanClassName}>{meta.error}</span>
          </>
          : <input {...input} type={type} placeholder={placeholder}/>}
      </div>
  )
}