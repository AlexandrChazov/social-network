(this["webpackJsonpsocial-network"]=this["webpackJsonpsocial-network"]||[]).push([[4],{94:function(e,r,t){e.exports={errorMessage:"Login_errorMessage__1OEWS",redBorder:"Login_redBorder__2R5Ja",loginError:"Login_loginError__35ORj"}},97:function(e,r,t){"use strict";t.r(r);var n=t(1),i=t(0),o=t.n(i),c=t(34),s=t(94),a=t(39),b=t(3),j=function(e,r,t,i){return function(o){var c=o.input,s=o.meta;return Object(n.jsxs)("div",{children:[Object(n.jsx)("label",{children:"Login"}),s.error&&s.touched?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("input",Object(b.a)(Object(b.a)({},c),{},{type:e,placeholder:r,className:t})),Object(n.jsx)("span",{className:i,children:s.error})]}):Object(n.jsx)("input",Object(b.a)(Object(b.a)({},c),{},{type:e,placeholder:r}))]})}},u=function(e){var r=e.authorization,t=e.loginError;return Object(n.jsx)(c.b,{onSubmit:function(e){r(e.login,e.password,e.rememberMe)},render:function(e){var r=e.handleSubmit,i=e.form,o=e.submitting,b=e.pristine;e.values;return Object(n.jsxs)("form",{onSubmit:r,children:[Object(n.jsx)("div",{children:Object(n.jsx)(c.a,{name:"login",validate:Object(a.a)(a.b.required,a.b.emailValidation),children:j("text","Login",s.redBorder,s.errorMessage)})}),Object(n.jsx)("div",{children:Object(n.jsx)(c.a,{name:"password",validate:Object(a.a)(a.b.required,a.b.minLength(6)),children:j("password","Password",s.redBorder,s.errorMessage)})}),Object(n.jsxs)("div",{children:[Object(n.jsx)("label",{children:"Remember me "}),Object(n.jsx)(c.a,{name:"rememberMe",component:"input",type:"checkbox"})]}),Object(n.jsxs)("div",{children:[Object(n.jsx)("button",{type:"submit",disabled:o||b,children:"Submit"}),Object(n.jsx)("button",{type:"button",onClick:i.reset,disabled:o||b,children:"Reset"})]}),t&&Object(n.jsx)("div",{className:s.loginError,children:t})]})}})},d=function(e){var r=e.authorization,t=e.loginError;return Object(n.jsxs)("div",{children:[Object(n.jsx)("h1",{children:"Login"}),Object(n.jsx)(u,{authorization:r,loginError:t})]})},l=t(9),h=t(22),O=t(15),p=t(18),m=t(19),x=t(21),g=t(20),f=t(5),v=function(e){return{isAuth:e.auth.isAuth}},E=function(e){var r=function(r){Object(x.a)(i,r);var t=Object(g.a)(i);function i(){return Object(p.a)(this,i),t.apply(this,arguments)}return Object(m.a)(i,[{key:"render",value:function(){return this.props.isAuth?Object(n.jsx)(f.a,{to:"/Profile"}):Object(n.jsx)(e,Object(b.a)({},this.props))}}]),i}(o.a.Component);return Object(l.b)(v)(r)};r.default=Object(O.d)(Object(l.b)((function(e){return{loginError:e.auth.loginError}}),{authorization:h.a}),E)(d)}}]);
//# sourceMappingURL=4.b23f694d.chunk.js.map