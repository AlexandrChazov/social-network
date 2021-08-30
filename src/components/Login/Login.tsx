import React from "react";
import {Form, Field} from 'react-final-form';
import styles from "./Login.module.css"
import {validators} from "../Common/FormValidation/FormValidation";
import {fieldCreator} from "../Common/fieldCreator";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";
import {authorization} from "../../redux/auth-reducer";
import withProfileRedirect from "../../Hoc/withProfileRedirect";

interface FormValues {
  email: string
  password: string
  rememberMe: boolean
  captcha: string
}

export type LoginValuesKeys = Extract<keyof FormValues, string>;  // выбираются только те ключи, которые имеют тип string

const Login: React.FC = () => {

  const dispatch = useDispatch();

  const loginError = useSelector((state: AppStateType) => state.auth.loginError)
  const captcha = useSelector((state: AppStateType) => state.auth.captcha)

  const authorization_ = (email: string, password: string, rememberMe: boolean, captchaUrl: string) => {
    dispatch(authorization(email, password, rememberMe, captchaUrl))
  }

  return (
    <div>
      <h1>
        Login
      </h1>
      <Form
        onSubmit={(values: FormValues) => {
          authorization_(values.email, values.password, values.rememberMe, values.captcha);
        }}
        render={({handleSubmit, form, submitting, pristine, values}) => (
          <form onSubmit={handleSubmit}>
            {fieldCreator<LoginValuesKeys>("input", "email", [validators.required, validators.emailValidation], "text", "email", "Login")}
            {fieldCreator<LoginValuesKeys>("input", "password", [validators.required, validators.minLength(6)], "password", "Password", "Password")}
            <div>
              <label>Remember me </label>
              <Field name="rememberMe" component="input" type="checkbox"/>
            </div>
            {captcha && <img src={captcha} alt="captcha"/>}
            {captcha && fieldCreator<LoginValuesKeys>("input", "captcha", [], "text", "type symbols from image", "Image text")}
            <div>
              <button type="submit" disabled={submitting || pristine}>
                Submit
              </button>
              <button type="button"
                      onClick={form.reset as any}                 // костыль, не знаю как исправить
                      disabled={submitting || pristine}>
                Reset
              </button>
            </div>
            {loginError && <div className={styles.loginError}>{loginError}</div>}
          </form>
        )}
      />
    </div>
  )
};

export default withProfileRedirect(Login) as React.ComponentType;
