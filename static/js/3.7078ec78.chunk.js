(this["webpackJsonpsocial-network"]=this["webpackJsonpsocial-network"]||[]).push([[3],{92:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__cnCY8",errorMessage:"Dialogs_errorMessage__30XrS",messages:"Dialogs_messages__s9gqT",redBorder:"Dialogs_redBorder__CGrTC"}},93:function(e,s,a){e.exports={logo:"DialogItem_logo__2NKcN",dialog:"DialogItem_dialog__1FO-Y"}},96:function(e,s,a){"use strict";a.r(s);var t=a(49),n=a(1),r=a(3),c=a(0),i=a.n(c),o=a(92),l=a.n(o),d=a(93),j=a.n(d),u=a(13),g=function(e){var s="/Dialogs/"+e.id;return Object(n.jsx)("div",{className:j.a.dialog,children:Object(n.jsxs)(u.b,{to:s,children:[Object(n.jsx)("img",{className:j.a.logo,src:e.ava,alt:"user"}),e.name]})})},b=function(e){return Object(n.jsx)("div",{className:l.a.dialog,children:e.message})},m=a(34),O=a(39),x=function(e){return Object(n.jsx)(m.b,{onSubmit:function(s){e.onSendMessage(s.myMessage),s.myMessage=""},render:function(e){var s=e.handleSubmit,a=e.values;return Object(n.jsxs)("form",{onSubmit:s,children:[Object(n.jsx)(m.a,{name:"myMessage",validate:O.b.maxLength(50),children:function(e){var s=e.input,a=e.meta;return Object(n.jsx)("div",{children:a.error?Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("textarea",Object(r.a)(Object(r.a)({},s),{},{type:"text",placeholder:"Type your message",rows:"5",cols:"25",className:l.a.redBorder})),Object(n.jsx)("span",{className:l.a.errorMessage,children:a.error})]}):Object(n.jsx)("textarea",Object(r.a)(Object(r.a)({},s),{},{type:"text",placeholder:"Type your message",rows:"5",cols:"25"}))})}}),Object(n.jsx)("button",{type:"submit",disabled:!a.myMessage,children:"Submit"})]})}})},h=function(e){var s=e.dialogsPage.dialogs.map((function(e){return Object(n.jsx)(g,{ava:e.ava,name:e.name,id:e.id},e.id)})),a=e.dialogsPage.messages.map((function(e){return Object(n.jsx)(b,{message:e.message},e.id)}));return Object(n.jsxs)("div",{className:l.a.dialogs,children:[Object(n.jsx)("div",{children:s}),Object(n.jsxs)("div",{children:[Object(n.jsx)("div",{className:l.a.messages,children:a}),Object(n.jsx)(x,{onSendMessage:function(s){e.sendMessage(s)}})]})]})},p=a(9),f=a(18),v=a(19),_=a(21),y=a(20),M=a(5),N=function(e){return{isAuth:e.auth.isAuth}},D=function(e){var s=function(s){Object(_.a)(t,s);var a=Object(y.a)(t);function t(){return Object(f.a)(this,t),a.apply(this,arguments)}return Object(v.a)(t,[{key:"render",value:function(){return this.props.isAuth?Object(n.jsx)(e,Object(r.a)({},this.props)):Object(n.jsx)(M.a,{to:"/Login"})}}]),t}(i.a.Component);return Object(p.b)(N)(s)},S=a(15);s.default=Object(S.d)(Object(p.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{sendMessage:function(s){var a=Object(t.b)(s);e(a)}}})),D)(h)}}]);
//# sourceMappingURL=3.7078ec78.chunk.js.map