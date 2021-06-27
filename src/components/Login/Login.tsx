import React from "react";
import {Form, Field} from 'react-final-form';
import styles from "./Login.module.css"
import {validators} from "../Common/FormValidation/FormValidation";
import {fieldCreator} from "../Common/fieldCreator";
import {LoginMapDispatchPropsType, LoginMapStatePropsType} from "./LoginContainer";

interface FormValues {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}

export type LoginValuesKeys = Extract<keyof FormValues, string>;  // выбираются только те ключи, которые имеют тип string

const Login: React.FC<LoginMapStatePropsType & LoginMapDispatchPropsType>
    = ({authorization, loginError, captcha}) => {
    return (
        <div>
            <h1>
                Login
            </h1>
            <Form
                onSubmit={(values: FormValues) => {
                    authorization(values.email, values.password, values.rememberMe, values.captcha);
                }}
                render={({handleSubmit, form, submitting, pristine, values}) => (
                    <form onSubmit={handleSubmit}>
                        {fieldCreator<LoginValuesKeys>("input","email", [validators.required, validators.emailValidation], "text", "email", "Login")}
                        {fieldCreator<LoginValuesKeys>("input","password", [validators.required, validators.minLength(6)], "password", "Password", "Password")}
                        <div>
                            <label>Remember me </label>
                            <Field name="rememberMe" component="input" type="checkbox"/>
                        </div>
                        {captcha && <img src={captcha} alt="captcha"/>}
                        {captcha && fieldCreator<LoginValuesKeys>("input","captcha", [] ,"text", "type symbols from image", "Image text")}
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

export default Login;
