import React from "react";
import {Field} from "react-final-form";
import {composeValidators} from "./FormValidation/FormValidation";
import styles from "../Login/Login.module.css";
import {ValidatorType} from "./FormValidation/FormValidation"

export function fieldCreator<FieldKeysType extends string>(         // generic-функция
                                Component: "input" | "textarea",
                                name: FieldKeysType,
                                validator: Array<ValidatorType>,
                                type: "text" | "password",
                                placeholder: string,
                                label?: string,
                                cols?: number,
                                rows?: number): React.ReactNode {
    return (
      <Field name={name} validate={composeValidators(...validator)}>
        {({input, meta}) => (
            <div>
              <label>{label}</label>
              {
                meta.error && meta.touched
                    ? <>
                      <Component {...input} type={type} placeholder={placeholder} className={styles.redBorder} cols={cols} rows={rows}/>
                      <span className={styles.errorMessage}>{meta.error}</span>
                    </>
                    : <Component {...input} type={type} placeholder={placeholder} cols={cols} rows={rows}/>
              }
            </div>
        )}
      </Field>
  )
}
