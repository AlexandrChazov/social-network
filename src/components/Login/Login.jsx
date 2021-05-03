import React from "react";
import { Form, Field } from 'react-final-form';
import * as styles from "./Login.module.css"
import {composeValidators, validators} from "../Common/FormValidation/FormValidation";
import {inputCreator} from "./inputCreator";

const Login = ({authorization, loginError}) => {
  return (
      <div>
        <h1>
          Login
        </h1>
        <LoginForm authorization = {authorization} loginError = {loginError} />
      </div>
  )
};

const LoginForm = ({authorization, loginError}) => {
  return (
      <Form
          onSubmit = {(values) => {
            authorization(values.login, values.password, values.rememberMe);
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="login" validate={composeValidators(validators.required, validators.emailValidation)}>
                  { inputCreator("text", "Login", styles.redBorder, styles.errorMessage) }
                </Field>
              </div>
              <div>
                <Field name="password" validate={composeValidators(validators.required, validators.minLength(6))}>
                  { inputCreator("password", "Password", styles.redBorder, styles.errorMessage) }
                </Field>
              </div>
              <div>
                <label>Remember me </label>
                <Field name="rememberMe" component="input" type="checkbox"/>
              </div>
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