import Login from "./Login";
import {connect} from "react-redux";
import {authorization} from "../../redux/auth-reducer";
import {compose} from "redux";
import withProfileRedirect from "../../Hoc/withProfileRedirect";

const mapStateToProps = (state) => ({
  loginError: state.auth.loginError,
  captcha: state.auth.captcha
})

export default compose(
    connect(mapStateToProps, {authorization}),
    withProfileRedirect
)(Login)



