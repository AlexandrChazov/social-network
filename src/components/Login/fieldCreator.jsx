import {composeValidators} from "../Common/FormValidation/FormValidation";
import {Field} from "react-final-form";
import React from "react";
import * as styles from "./Login.module.css";

export const fieldCreator = (name, validator, type, placeholder, label) => {
  return (
      <Field name={name} validate={composeValidators(...validator)}>
        {({input, meta}) => (
            <div>
              <label>{label}</label>
              {
                meta.error && meta.touched
                    ? <>
                      <input {...input} type={type} placeholder={placeholder} className={styles.redBorder}/>
                      <span className={styles.errorMessage}>{meta.error}</span>
                    </>
                    : <input {...input} type={type} placeholder={placeholder}/>
              }
            </div>)}
      </Field>
  )
}