import {composeValidators} from "../Common/FormValidation/FormValidation";
import {Field} from "react-final-form";
import React from "react";
import styles from "./Login.module.css";
import {ValidatorType} from "../Common/FormValidation/FormValidation"

export function fieldCreator<FieldKeysType extends string>(name: FieldKeysType,  // generic-функция
                             validator: Array<ValidatorType>,
                             type: string,
                             placeholder: string,
                             label: string): React.ReactNode {
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
            </div>
        )}
      </Field>
  )
}
