import {composeValidators} from "../Common/FormValidation/FormValidation";
import {Field} from "react-final-form";
import React from "react";

export const fieldCreator = (name, validator, type, placeholder, inputClassName, spanClassName, label) => {
  return (
      <Field name={name} validate={composeValidators(...validator)}>
        {({input, meta}) => (
            <div>
              <label>{label}</label>
              {
                meta.error && meta.touched
                    ? <>
                      <input {...input} type={type} placeholder={placeholder} className={inputClassName}/>
                      <span className={spanClassName}>{meta.error}</span>
                    </>
                    : <input {...input} type={type} placeholder={placeholder}/>
              }
            </div>)}
      </Field>
  )
}