import React from "react";
import { Form, Field } from 'react-final-form'

const Login = (props) => {
  return (
      <div>
        <h1>
          Login
        </h1>
        <LoginForm authorization = {props.authorization} />
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
                  <label>Login</label>
                  <Field
                      name="login"
                      component="input"
                      type="text"
                      placeholder="Login"
                  />
                </div>
                <div>
                  <label>Password</label>
                  <Field
                      name="password"
                      component="input"
                      type="text"
                      placeholder="Password"
                  />
                </div>
                <div>
                  <label>Remember</label>
                  <Field name="rememberMe" component="input" type="checkbox" />
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
              </form>
          )}
      />
  )
}

export default Login;