import React from "react";
import {Field} from "react-final-form";

const createField = (name, component, type, placeholder, label) => {
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

export default createField;