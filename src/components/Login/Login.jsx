import React from "react";
import { Form, Field } from 'react-final-form';
import * as styles from "./Login.module.css"
import {composeValidators, validators} from "../Common/FormValidation/FormValidation";

const Login = (props) => {
  return (
      <div>
        <h1>
          Login
        </h1>
        <LoginForm authorization = {props.authorization} loginError = {props.loginError} />
      </div>
  )
};

const LoginForm = (props) => {
  return (
      <Form
          onSubmit = {(values) => {
            props.authorization(values.login, values.password, values.rememberMe);
          }}
          render={({ handleSubmit, form, submitting, pristine, values }) => (
            <form onSubmit={handleSubmit}>
              <div>
                <Field name="login" validate={composeValidators(validators.required, validators.emailValidation)}>
                  {({input, meta}) => {
                    return (
                        <div>
                          <label>Login</label>
                          {meta.error && meta.touched
                              ? <>
                                <input {...input} type="text" placeholder="Login" className={styles.redBorder}/>
                                <span className={styles.errorMessage}>{meta.error}</span>
                              </>
                              : <input {...input} type="text" placeholder="Login"/>}
                        </div>
                    )
                  }}
                </Field>
              </div>
              <div>
                <Field name="password" validate={composeValidators(validators.required, validators.minLength(6))}>
                  {({input, meta}) => {
                    return (
                        <div>
                          <label>Password</label>

                          {meta.error && meta.touched
                              ? <>
                                <input {...input} type="password" placeholder="Password" className={styles.redBorder}/>
                                <span className={styles.errorMessage}>{meta.error}</span>
                              </>
                              : <input {...input} type="password" placeholder="Password"/>
                          }
                        </div>
                    )
                  }}
                </Field>
              </div>
              <div>
                <label>Remember</label>
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
                props.loginError &&
                <div className={styles.loginError}>
                  { props.loginError}
                </div>
              }

            </form>
          )}
      />
  )
}

export default Login;