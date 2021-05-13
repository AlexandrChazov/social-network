import React from "react";
import {Form, Field} from 'react-final-form';
import * as styles from "./Login.module.css"
import {validators} from "../Common/FormValidation/FormValidation";
import {fieldCreator} from "./fieldCreator";
import createField from "../Common/createField";

const Login = ({authorization, loginError, captcha}) => {
  return (
      <div>
        <h1>
          Login
        </h1>
        <LoginForm authorization={authorization} loginError={loginError} captcha={captcha}/>
      </div>
  )
};

const LoginForm = ({authorization, loginError, captcha}) => {
  return (
      <Form
          onSubmit={(values) => {
            authorization(values.email, values.password, values.rememberMe, values.captcha);
          }}
          render={({handleSubmit, form, submitting, pristine, values}) => (
              <form onSubmit={handleSubmit}>
                {fieldCreator("email", [validators.required, validators.emailValidation], "text", "email", "Login")}
                {fieldCreator("password", [validators.required, validators.minLength(6)], "password", "Password", "Password")}
                <div>
                  <label>Remember me </label>
                  <Field name="rememberMe" component="input" type="checkbox"/>
                </div>
                {captcha && <img src={captcha} alt="captcha"/>}
                {captcha && createField("captcha", "input", "text", "type symbols from image", "Image text")}
                <div>
                  <button type="submit" disabled={submitting || pristine}>
                    Submit
                  </button>
                  <button type="button"
                          onClick={form.reset}
                          disabled={submitting || pristine}>
                    Reset
                  </button>
                </div>
                {loginError && <div className={styles.loginError}>{loginError}</div>}
              </form>
          )}
      />
  )
}

export default Login;