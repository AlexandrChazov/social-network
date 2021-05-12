import React from "react";
import { Form, Field } from 'react-final-form';
import * as styles from "./Login.module.css"
import {composeValidators, validators} from "../Common/FormValidation/FormValidation";
import {inputCreator} from "./inputCreator";
import createField from "../Common/createField";

const Login = ({authorization, loginError, captcha}) => {
  return (
      <div>
        <h1>
          Login
        </h1>
        <LoginForm authorization = {authorization} loginError = {loginError} captcha = {captcha}/>
      </div>
  )
};

const LoginForm = ({authorization, loginError, captcha}) => {
  return (
      <Form
          onSubmit = {(values) => {
            authorization(values.email, values.password, values.rememberMe, values.captcha);
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="email" validate={composeValidators(validators.required, validators.emailValidation)}>
                  { inputCreator("text", "email", styles.redBorder, styles.errorMessage, "Login") }
                </Field>
              </div>
              <div>
                <Field name="password" validate={composeValidators(validators.required, validators.minLength(6))}>
                  { inputCreator("password", "Password", styles.redBorder, styles.errorMessage, "Password") }
                </Field>
              </div>
              <div>
                <label>Remember me </label>
                <Field name="rememberMe" component="input" type="checkbox"/>
              </div>
              <img src={captcha} alt="captcha"/>
              {createField("captcha", "input", "text", "type symbols from image")}
              <div>
                <button type="submit" disabled={submitting || pristine}>
                  Submit
                </button>
                <button
                    type="button"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
              {
                loginError &&
                <div className={styles.loginError}>
                  { loginError}
                </div>
              }

            </form>
          )}
      />
  )
}

export default Login;