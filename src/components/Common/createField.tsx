import React, {ComponentType} from "react";
import {Field, FieldRenderProps} from "react-final-form";



export function createField<FieldKeysType extends string>(
    name: FieldKeysType,
    component: "input",
    type: "text" | "checkbox",
    placeholder: string | null,
    label: string): React.ReactNode {
  return (
      <div>
        <label><b>{label}: </b></label>
        <Field
            name={name}
            component={component}
            type={type}
            placeholder={placeholder}
        />
      </div>
  )
}