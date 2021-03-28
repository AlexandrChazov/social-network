import React from "react";

const Login = (props) => {
  return (
      <div>
        <h1>
          Login
        </h1>
        <LoginForm />
      </div>
  )
};

const LoginForm = (props) => {
  return (
      <form>
        <div>
          <input placeholder="Login"></input>
        </div>
        <div>
          <input placeholder="Password"/>
        </div>
        <div>
          <input type="checkbox"/> remember
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
  )
}

export default Login;