(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{100:function(e,t,a){"use strict";a(152);var n=a(0),r=a.n(n),s=a(2),i=a.n(s);function o(e){var t=e.name,a=e.className,n=e.width,s=e.height;return r.a.createElement("svg",{className:a,width:n,height:s},r.a.createElement("use",{xlinkHref:"#".concat(t)}))}o.propTypes={name:i.a.string,className:i.a.string,width:i.a.string,height:i.a.string},o.defaultProps={name:"",className:"",width:"16",height:"16"},t.a=Object(n.memo)(o)},153:function(e,t,a){"use strict";a.d(t,"a",(function(){return u})),a.d(t,"b",(function(){return C})),a.d(t,"c",(function(){return x}));var n=a(0),r=a.n(n),s=a(2),i=a.n(s),o=a(194),c=a(100);function l(e){var t=e.id,a=e.title,n=e.type,s=e.className,i=e.disabled,l=e.isLoading,u=e.svgIcon,m=e.onClick,d=e.children;return l?r.a.createElement(o.a,{className:"mbrs-loading mbrs-loading-small mbrs-mt1"}):r.a.createElement("button",{id:t,type:n,className:s,disabled:i,onClick:m},d,u&&r.a.createElement(c.a,{name:u}),a)}l.propTypes={id:i.a.string,title:i.a.string,type:i.a.oneOf(["button","submit","reset"]),className:i.a.string,disabled:i.a.bool,isLoading:i.a.bool,svgIcon:i.a.string,onClick:i.a.func,children:i.a.any},l.defaultProps={id:"",title:"",type:"submit",className:"",disabled:!1,isLoading:!1,svgIcon:"",onClick:function(){},children:""};var u=Object(n.memo)(l);a(152);function m(e){var t=e.id,a=e.name,n=e.wrapperClassName,s=e.textLabel,i=e.isRequired,o=e.className,c=e.onChange,l=e.value,u=e.defaultChecked,m=t;return document.getElementById(t)&&(m+="-2"),r.a.createElement("div",{className:n},r.a.createElement("input",{type:"checkbox",id:m,name:a,className:o,onChange:c,required:i,value:l,defaultChecked:u}),r.a.createElement("label",{htmlFor:m},s,i?r.a.createElement("abbr",{className:"mbrs-required",title:"(ce champ est obligatoire)"}," *"):""))}m.propTypes={id:i.a.string,name:i.a.string,wrapperClassName:i.a.string,className:i.a.string,textLabel:i.a.string,isRequired:i.a.bool,value:i.a.bool,onChange:i.a.func,defaultChecked:i.a.bool},m.defaultProps={id:"",name:"",wrapperClassName:"",className:"",textLabel:"",isRequired:!1,value:!1,onChange:function(){},defaultChecked:!1};a(70),a(103),a(72),a(33),a(157);function d(e){var t=e.name,a=e.legend,n=e.idPrefix,s=e.radioElements,i=e.radioValue,o=e.divClassName,c=e.ulClassName,l=e.className,u=e.legendClassName,m=e.onChange;return r.a.createElement("fieldset",{className:o},r.a.createElement("legend",{className:u},a),r.a.createElement("ul",{className:c},Object.keys(s).map((function(e){return r.a.createElement("li",{className:l,key:e.toString()},r.a.createElement("input",{id:"".concat(n,"-").concat(e),name:t,type:"radio",value:e,checked:i===e,onChange:m}),r.a.createElement("label",{htmlFor:"".concat(n,"-").concat(e)},s[e]))}))))}d.propTypes={name:i.a.string,radioElements:i.a.objectOf(i.a.string),radioValue:i.a.string,divClassName:i.a.string,legendClassName:i.a.string,ulClassName:i.a.string,legend:i.a.string,className:i.a.string,idPrefix:i.a.string,onChange:i.a.func},d.defaultProps={name:"",radioElements:[],radioValue:"",divClassName:"",legendClassName:"",ulClassName:"",legend:"",className:"",idPrefix:"",onChange:function(){}};var p=a(10),f=a.n(p),b=a(196),v=a(197);function g(e){var t=e.id,a=e.name,s=e.className,i=e.value,o=e.onChange,l=e.label,u=e.type,m=e.divClassName,d=e.isRequired,p=e.errorMsg,g=e.formHelp,h=e.autoComplete,y=e.placeholder,w=e.max,C=e.isSuccessField,E=Object(n.useState)(u),_=f()(E,2),O=_[0],N=_[1],x=s;C&&i&&(x="".concat(s," mbrs-form-field-success")),i&&p&&(x="".concat(s," mbrs-form-field-error"));var j=r.a.createElement("input",{id:t,className:x,type:O,autoComplete:h,name:a,onChange:o,value:i||"",placeholder:y,required:d,max:w,maxLength:"tel"===u?"10":null});return"hidden"===u?j:r.a.createElement("div",{className:"mbrs-form-field ".concat(m)},r.a.createElement("label",{htmlFor:t},l,d?r.a.createElement("abbr",{className:"mbrs-required",title:"(ce champ est obligatoire)"}," *"):""),j,"password"===u&&r.a.createElement("button",{type:"button",className:"mbrs-passwordfield-btn",onClick:function(){return N("password"===O?"text":"password")}},r.a.createElement(c.a,{name:"password"===O?b.a.id:v.a.id})),g&&r.a.createElement("p",{className:"mbrs-form-help",role:"alert"},g),i&&p&&r.a.createElement("p",{className:"mbrs-form-help mbrs-form-help-error",role:"alert",name:"".concat(a,"-validation-error")},p))}g.propTypes={id:i.a.string,name:i.a.string,type:i.a.string,label:i.a.string,divClassName:i.a.string,className:i.a.string,value:i.a.string,onChange:i.a.func,isRequired:i.a.bool,errorMsg:i.a.string,formHelp:i.a.string,autoComplete:i.a.string,placeholder:i.a.string,max:i.a.string,isSuccessField:i.a.bool},g.defaultProps={id:"",name:"",type:"text",label:"",divClassName:"",className:"",value:"",onChange:function(){},isRequired:!1,errorMsg:"",formHelp:"",autoComplete:"",placeholder:"",max:"",isSuccessField:!1};var h=a(199),y=a.n(h);function w(e){var t=e.id,a=e.name,n=e.title,s=e.autoComplete,i=e.divClassName,o=e.selectClass,c=e.items,l=e.onChange,u=e.isRequired,m=e.value;return r.a.createElement("div",{className:"mbrs-form-field ".concat(i)},r.a.createElement("label",{htmlFor:t},n,u?r.a.createElement("abbr",{className:"mbrs-required",title:"(ce champ est obligatoire)"}," *"):""),r.a.createElement("select",{id:t,name:a,value:m||"",autoComplete:s,onChange:l,required:u,className:o},Object.keys(c).map((function(e){return e||"object"!==y()(c[e])?r.a.createElement("option",{key:e,value:e},c[e]):r.a.createElement("option",{key:e,value:e,disabled:c[e].disabled},c[e].value)}))))}w.propTypes={id:i.a.string,name:i.a.string,value:i.a.string,title:i.a.string,divClassName:i.a.string,selectClass:i.a.string,autoComplete:i.a.string,items:i.a.object,onChange:i.a.func,isRequired:i.a.bool},w.defaultProps={id:"",name:"",value:"",title:"",divClassName:i.a.string,selectClass:"",autoComplete:i.a.string,items:{},onChange:function(){},isRequired:!1};var C=Object(n.memo)(w),E=a(154),_=a.n(E),O=a(193);function N(e){var t=e.id,a=e.name,n=e.title,s=e.divClassName,i=e.rows,o=e.cols,c=e.className,l=e.isRequired,u=e.formHelp,m=e.placeholder,d=e.isSuccessField,p=e.maxLength,f=c;return r.a.createElement(O.a,{name:a,parse:function(e){return e},render:function(e){var b=e.input,v=e.meta,g=v.error,h=v.submitError,y=!v.dirtySinceLastSubmit&&h||g;return y&&b.value||(f=c),b.value&&(d&&!y&&(f="".concat(c," mbrs-form-field-success")),y&&(f="".concat(c," mbrs-form-field-error"))),r.a.createElement("div",{className:"mbrs-form-field ".concat(s)},r.a.createElement("label",{htmlFor:t},n,l?r.a.createElement("abbr",{className:"mbrs-required",title:"(ce champ est obligatoire)"}," *"):""),r.a.createElement("textarea",_()({id:t,className:f,required:l,"aria-required":l?"true":"",placeholder:m||"",rows:i||"",cols:o||"",maxLength:p},b)),u&&r.a.createElement("p",{className:"mbrs-form-help",role:"alert"},u),y&&r.a.createElement("p",{className:"mbrs-form-help mbrs-form-help-error",role:"alert",name:"".concat(a,"-validation-error")},y))}})}N.propTypes={id:i.a.string,name:i.a.string,title:i.a.string,rows:i.a.string,cols:i.a.string,formHelp:i.a.string,divClassName:i.a.string,className:i.a.string,placeholder:i.a.string,isRequired:i.a.bool,isSuccessField:i.a.bool,maxLength:i.a.number},N.defaultProps={id:"",name:"",title:"",rows:"",cols:"",formHelp:"",divClassName:"",className:"",placeholder:"",isRequired:!1,isSuccessField:!1,maxLength:void 0};var x=Object(n.memo)(N)},191:function(e,t,a){(function(t){var a=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,n=/^\w*$/,r=/^\./,s=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,i=/\\(\\)?/g,o=/^\[object .+?Constructor\]$/,c="object"==typeof t&&t&&t.Object===Object&&t,l="object"==typeof self&&self&&self.Object===Object&&self,u=c||l||Function("return this")();var m,d=Array.prototype,p=Function.prototype,f=Object.prototype,b=u["__core-js_shared__"],v=(m=/[^.]+$/.exec(b&&b.keys&&b.keys.IE_PROTO||""))?"Symbol(src)_1."+m:"",g=p.toString,h=f.hasOwnProperty,y=f.toString,w=RegExp("^"+g.call(h).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),C=u.Symbol,E=d.splice,_=L(u,"Map"),O=L(Object,"create"),N=C?C.prototype:void 0,x=N?N.toString:void 0;function j(e){var t=-1,a=e?e.length:0;for(this.clear();++t<a;){var n=e[t];this.set(n[0],n[1])}}function k(e){var t=-1,a=e?e.length:0;for(this.clear();++t<a;){var n=e[t];this.set(n[0],n[1])}}function M(e){var t=-1,a=e?e.length:0;for(this.clear();++t<a;){var n=e[t];this.set(n[0],n[1])}}function P(e,t){for(var a,n,r=e.length;r--;)if((a=e[r][0])===(n=t)||a!=a&&n!=n)return r;return-1}function S(e,t){for(var r,s=0,i=(t=function(e,t){if(D(e))return!1;var r=typeof e;if("number"==r||"symbol"==r||"boolean"==r||null==e||A(e))return!0;return n.test(e)||!a.test(e)||null!=t&&e in Object(t)}(t,e)?[t]:D(r=t)?r:F(r)).length;null!=e&&s<i;)e=e[I(t[s++])];return s&&s==i?e:void 0}function q(e){return!(!z(e)||(t=e,v&&v in t))&&(function(e){var t=z(e)?y.call(e):"";return"[object Function]"==t||"[object GeneratorFunction]"==t}(e)||function(e){var t=!1;if(null!=e&&"function"!=typeof e.toString)try{t=!!(e+"")}catch(e){}return t}(e)?w:o).test(function(e){if(null!=e){try{return g.call(e)}catch(e){}try{return e+""}catch(e){}}return""}(e));var t}function R(e,t){var a,n,r=e.__data__;return("string"==(n=typeof(a=t))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==a:null===a)?r["string"==typeof t?"string":"hash"]:r.map}function L(e,t){var a=function(e,t){return null==e?void 0:e[t]}(e,t);return q(a)?a:void 0}j.prototype.clear=function(){this.__data__=O?O(null):{}},j.prototype.delete=function(e){return this.has(e)&&delete this.__data__[e]},j.prototype.get=function(e){var t=this.__data__;if(O){var a=t[e];return"__lodash_hash_undefined__"===a?void 0:a}return h.call(t,e)?t[e]:void 0},j.prototype.has=function(e){var t=this.__data__;return O?void 0!==t[e]:h.call(t,e)},j.prototype.set=function(e,t){return this.__data__[e]=O&&void 0===t?"__lodash_hash_undefined__":t,this},k.prototype.clear=function(){this.__data__=[]},k.prototype.delete=function(e){var t=this.__data__,a=P(t,e);return!(a<0)&&(a==t.length-1?t.pop():E.call(t,a,1),!0)},k.prototype.get=function(e){var t=this.__data__,a=P(t,e);return a<0?void 0:t[a][1]},k.prototype.has=function(e){return P(this.__data__,e)>-1},k.prototype.set=function(e,t){var a=this.__data__,n=P(a,e);return n<0?a.push([e,t]):a[n][1]=t,this},M.prototype.clear=function(){this.__data__={hash:new j,map:new(_||k),string:new j}},M.prototype.delete=function(e){return R(this,e).delete(e)},M.prototype.get=function(e){return R(this,e).get(e)},M.prototype.has=function(e){return R(this,e).has(e)},M.prototype.set=function(e,t){return R(this,e).set(e,t),this};var F=T((function(e){var t;e=null==(t=e)?"":function(e){if("string"==typeof e)return e;if(A(e))return x?x.call(e):"";var t=e+"";return"0"==t&&1/e==-1/0?"-0":t}(t);var a=[];return r.test(e)&&a.push(""),e.replace(s,(function(e,t,n,r){a.push(n?r.replace(i,"$1"):t||e)})),a}));function I(e){if("string"==typeof e||A(e))return e;var t=e+"";return"0"==t&&1/e==-1/0?"-0":t}function T(e,t){if("function"!=typeof e||t&&"function"!=typeof t)throw new TypeError("Expected a function");var a=function(){var n=arguments,r=t?t.apply(this,n):n[0],s=a.cache;if(s.has(r))return s.get(r);var i=e.apply(this,n);return a.cache=s.set(r,i),i};return a.cache=new(T.Cache||M),a}T.Cache=M;var D=Array.isArray;function z(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function A(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&"[object Symbol]"==y.call(e)}e.exports=function(e,t,a){var n=null==e?void 0:S(e,t);return void 0===n?a:n}}).call(this,a(52))},194:function(e,t,a){"use strict";var n=a(0),r=a.n(n),s=a(2),i=a.n(s);function o(e){var t=e.className;return r.a.createElement("div",{className:t},r.a.createElement("span",{className:"mbrs-mask"},"Veuillez patienter…"))}o.propTypes={className:i.a.string},o.defaultProps={className:""},t.a=o},196:function(e,t,a){"use strict";var n=a(101),r=a.n(n),s=a(102),i=a.n(s),o=new r.a({id:"view",use:"view-usage",viewBox:"0 0 32 32",content:'<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="view">\n  <path d="M29.714 17.143q-2.714-4.214-6.804-6.304 1.089 1.857 1.089 4.018 0 3.304-2.348 5.652t-5.652 2.348-5.652-2.348-2.348-5.652q0-2.161 1.089-4.018-4.089 2.089-6.804 6.304 2.375 3.661 5.955 5.83t7.759 2.17 7.759-2.17 5.955-5.83zM16.857 10.286q0-0.357-0.25-0.607t-0.607-0.25q-2.232 0-3.83 1.598t-1.598 3.83q0 0.357 0.25 0.607t0.607 0.25 0.607-0.25 0.25-0.607q0-1.536 1.089-2.625t2.625-1.089q0.357 0 0.607-0.25t0.25-0.607zM32 17.143q0 0.607-0.357 1.232-2.5 4.107-6.723 6.58t-8.92 2.473-8.92-2.482-6.723-6.571q-0.357-0.625-0.357-1.232t0.357-1.232q2.5-4.089 6.723-6.571t8.92-2.482 8.92 2.482 6.723 6.571q0.357 0.625 0.357 1.232z" />\n</symbol>'});i.a.add(o);t.a=o},197:function(e,t,a){"use strict";var n=a(101),r=a.n(n),s=a(102),i=a.n(s),o=new r.a({id:"noview",use:"noview-usage",viewBox:"0 0 32 32",content:'<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="noview">\n  <path d="M31.64,15.91a18.89,18.89,0,0,0-6.72-6.57l-.3-.16L30,3.69,28.21,2,22.24,8A17.11,17.11,0,0,0,16,6.86,17.39,17.39,0,0,0,7.08,9.34,18.89,18.89,0,0,0,.36,15.91a2.3,2.3,0,0,0,0,2.47,19,19,0,0,0,6,6.06L1.67,29.25,3.46,31l5.11-5.27A17.19,17.19,0,0,0,16,27.43,17.48,17.48,0,0,0,24.92,25a18.92,18.92,0,0,0,6.72-6.58,2.3,2.3,0,0,0,0-2.47ZM12.17,11A5.21,5.21,0,0,1,16,9.43a.82.82,0,0,1,.61.25.86.86,0,0,1,.25.61.84.84,0,0,1-.25.6.82.82,0,0,1-.61.25,3.72,3.72,0,0,0-3.71,3.72.84.84,0,0,1-.25.6.87.87,0,0,1-1.22,0,.84.84,0,0,1-.25-.6A5.2,5.2,0,0,1,12.17,11ZM2.28,17.14a17.51,17.51,0,0,1,6.81-6.3,7.78,7.78,0,0,0-1.09,4,7.66,7.66,0,0,0,2.25,5.54L8,22.77A18.45,18.45,0,0,1,2.28,17.14Zm27.43,0A18.39,18.39,0,0,1,23.76,23,14.7,14.7,0,0,1,16,25.14,14.54,14.54,0,0,1,10.25,24l2-2a7.78,7.78,0,0,0,3.76.92,7.72,7.72,0,0,0,5.65-2.35A7.7,7.7,0,0,0,24,14.86a7.83,7.83,0,0,0-1.06-4l0,0a17.62,17.62,0,0,1,6.74,6.27Z" />\n</symbol>'});i.a.add(o);t.a=o},198:function(e,t,a){"use strict";a(70);var n=a(10),r=a.n(n),s=a(0),i=a.n(s),o=a(2),c=a.n(o),l=a(200),u=a.n(l),m=a(204),d=a(100),p=a(50),f=a(97),b=a(98),v=a(39),g=a(19),h=a(16),y=a(5);function w(e){var t=e.identifier,a=e.title,n=e.children,o=e.size,c=e.closeLabel,l=e.closeOutside,w=e.content,C=e.fixedHeight,E=Object(s.useContext)(p.a),_=E.closeModal,O=E.activeModals,N=E.onCloseModal,x=E.initContext,j=E.infoModal,k=Object(s.useState)(!1),M=r()(k,2),P=M[0],S=M[1],q=function(){S(!0),_(t),N()},R=o?"mbrs-modal-window-".concat(o):"";return i.a.createElement(u.a,{isOpen:O[t],onRequestClose:j.isOnClose?q:function(){return _(t)},contentLabel:a,portalClassName:"mbrs",className:"mbrs-modal-window ".concat(R," ").concat(l?"mbrs-modal-window-closeOutside":""," ").concat(C?"mbrs-modal-window-fixedHeight":""),overlayClassName:"mbrs-modal",ariaHideApp:!1,onAfterOpen:function(){Object(f.a)(),Object(b.a)(!0)},onAfterClose:function(){"login"===t&&P&&(Object(v.b)()&&(j.is2MinBooksSignup?window.location.assign("".concat("https://contributeur.20minutes.fr","/").concat(j.isEnabled?"profil":"")):window.location.assign(Object(g.a)("profile"))),S(!1)),j.origin&&j.origin===h.a.JEUX_CONCOURS&&document.dispatchEvent(new CustomEvent("closeModalQualifio",{detail:{userId:y.a.getUserId()}})),x()}},i.a.createElement("button",{type:"button",className:"mbrs-modal-close mbrs-btnIcon mbrs-btnSkin-base",onClick:j.isOnClose?q:function(){return _(t)}},i.a.createElement(d.a,{name:m.a.id}),i.a.createElement("span",{className:"mbrs-mask"},c)),"function"==typeof w?w(q,"mbrs-modal-content",n):i.a.createElement("div",{className:"mbrs-modal-content mbrs-box mbrs-pa2"},"function"==typeof n?n(q):n))}w.propTypes={identifier:c.a.string.isRequired,children:c.a.any,closeLabel:c.a.string,closeOutside:c.a.bool,content:c.a.func,size:c.a.oneOf(["","small","medium"]),title:c.a.string.isRequired,fixedHeight:c.a.bool},w.defaultProps={children:null,closeLabel:"Fermer la popin",closeOutside:!1,content:null,size:"",fixedHeight:!1},t.a=w},205:function(e,t,a){"use strict";var n=a(101),r=a.n(n),s=a(102),i=a.n(s),o=new r.a({id:"passmedia",use:"passmedia-usage",viewBox:"0 0 32 32",content:'<symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="passmedia">\n  <path d="M15.95 1.41V.01l3.07 2.96-3.07 2.98v-1.9s-5.47-.36-9.63 4.71c0 0-2.55 2.92-2.67 7.41 0 0-.49 6.38 5.1 10.33 0 0 4.62 3.89 11.2 1.8 0 0 5.42-1.4 7.81-7.54 0 0 .72-1.7.77-4.28h2.63s.16 2.03-.87 5.04c0 0-1.95 6.92-9.9 9.41 0 0-7.32 2.68-14.16-3.03 0 0-5.47-4.22-5.22-12.18 0 0 .09-5.22 4-9.5 0 0 3.78-4.63 10.94-4.8" />\n  <path d="M11.27 24.97l.02-13.38s-.1-3.3 4.98-3.46c0 0 2.54-.2 4.46 1.02 0 0 1.68.89 2.1 3.02a8 8 0 00.04 3.23s-.16 1.47-1.22 2.59c0 0-1.07 1.37-3.59 1.46 0 0-1.27.1-2.44-.02v-2.31s3.31.58 4.26-1.25c0 0 .55-.8.46-2.38 0 0-.07-1.48-1.2-2.36 0 0-.84-.8-2.86-.64 0 0-1.32.14-1.9.9 0 0-.22.29-.24.66l.04 12.92h-2.9" />\n</symbol>'});i.a.add(o);t.a=o},207:function(e,t,a){"use strict";t.a=a.p+"93a152773d03235843fae3da11125db3.png"},215:function(e,t,a){"use strict";a.r(t);a(33),a(43);var n=a(0),r=a.n(n),s=a(2),i=a.n(s),o=a(24),c=a.n(o),l=(a(217),a(1)),u=a.n(l),m=(a(21),a(3)),d=a.n(m),p=a(10),f=a.n(p),b=a(71),v=a(5),g=a(49),h=a(39),y=a(19),w=a(198),C=a(207),E=a(153),_=a(50),O=function(e){var t=e.email,a=e.setPassmediaEmail,s=Object(n.useContext)(b.a).resendVerificationCode,i=Object(n.useContext)(_.a),o=i.openModal,c=i.closeModal,l=Object(n.useState)(!1),u=f()(l,2),m=u[0],d=u[1],p=Object(n.useCallback)((function(){s(t,(function(){c("passmedia-email-verify"),a(void 0),d(!1)}))}),[s,t]),v=Object(n.useCallback)((function(e){e(),o("login")}),[o]);return Object(n.useEffect)((function(){!0===m&&p()}),[m]),r.a.createElement(w.a,{title:"Verify PassMedia email",identifier:"passmedia-email-verify",size:"small",closeOutside:!0},(function(e){return r.a.createElement("div",null,r.a.createElement("img",{src:C.a,alt:"PassMedia logo"}),r.a.createElement("div",{className:"mbrs-align-center mbrs-mt2"},r.a.createElement("p",{className:"mbrs-bold"},"Session PassMedia détectée"),r.a.createElement("p",{className:"mbrs-mt1"},"Vous disposez déjà d’un compte 20 Minutes avec l’adresse email"," ".concat(t)),r.a.createElement("p",{className:"mbrs-mt1"},"Pour associer votre compte PassMedia avec votre compte 20 Minutes en toute sécurité, validez votre adresse email"),r.a.createElement(E.a,{className:"mbrs-mt1 mbrs-btn mbrs-btnSkin-passmedia",type:"button",id:"passmedia-resend-email",onClick:function(){return d(!0)}},"Recevoir un nouvel email de vérification")),r.a.createElement("div",{className:"mbrs-bts mbrs-pt2 mbrs-mt2 mbrs-align-center"},r.a.createElement("p",null,"Connectez-vous manuellement à votre compte 20 Minutes"),r.a.createElement(E.a,{className:"mbrs-btn mbrs-mt1",type:"button",onClick:function(){return v(e)}},"Me connecter")))}))};O.propTypes={email:i.a.string,setPassmediaEmail:i.a.func.isRequired},O.defaultProps={email:void 0};var N=O,x=a(159),j=a.n(x),k=a(191),M=a.n(k),P=a(4),S="\n  fragment PassMediaConsentFragment on PassMediaConsent {\n    id\n    has_opt_out\n    exposures_count\n    first_notification_date\n    first_month_exposures_count\n    next_exposure_date\n  }\n",q={getConsent:function(e){var t=this;return d()(u.a.mark((function a(){var n,r,s,i;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n={brandId:"QnJhbmQ6MjBtaW51dGVz",passmediaUid:e},r="\n      ".concat(S,"\n\n      query passMediaConsent($brandId: ID!, $passmediaUid: String!) {\n        brand(id: $brandId) {\n          node {\n            passMediaConsent(passmedia_uid: $passmediaUid) {\n              node {\n                ...PassMediaConsentFragment\n              }\n              resolveInfo {\n                status\n              }\n            }\n          }\n        }\n      }\n    "),a.next=4,Object(P.a)(r,n,void 0,!1);case 4:return s=a.sent,(i=M()(s,"brand.node.passMediaConsent.node"))&&(t.passmediaOptoutCookie=i),a.abrupt("return",i);case 8:case"end":return a.stop()}}),a)})))()},canExposeNotification:function(){if(!this.passmediaOptoutCookie)return!0;var e=this.passmediaOptoutCookie,t=e.has_opt_out,a=void 0!==t&&t,n=e.exposures_count,r=void 0===n?0:n,s=e.first_notification_date,i=e.first_month_exposures_count,o=void 0===i?0:i,c=e.next_exposure_date;if(!a){if(r>=5)return!1;var l=j()(Date.now());if(!s)return!0;if(l.isBefore(j()(s).add(1,"month")))return o<3&&(l.valueOf()>c||!c);if(l.valueOf()>c)return!0}return!1},setNotificationDisplayed:function(e){var t=this;return d()(u.a.mark((function a(){var n,r,s,i,o,c,l,m,d,p,f,b,v,g,h,y,w,C;return u.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return n=e.passmediaJwt,r=e.didOptOut,s=void 0!==r&&r,i=t.passmediaOptoutCookie||{},o=i.exposuresCount,c=void 0===o?0:o,l=i.firstNotificationDate,m=i.firstMonthExposuresCount,d=void 0===m?0:m,p=i.nextExposureDate,f=d,b=c,v=p,g=j()(Date.now()),!l||g.isBefore(j()(l).add(1,"month"))?(f+=1,v=g.add(1,"week")):v=g.add(1,"month"),h={input:{brand_id:"QnJhbmQ6MjBtaW51dGVz",jwToken:n,has_opt_out:s,exposures_count:b+=1,first_notification_date:l||g.format("YYYY-MM-DDTHH:mm:ssZ"),first_month_exposures_count:f,next_exposure_date:v.format("YYYY-MM-DDTHH:mm:ssZ")}},y="\n      ".concat(S,"\n\n      mutation savePassMediaConsent($input: savePassMediaConsentType) {\n        savePassMediaConsent(input: $input) {\n          passMediaConsent {\n            ...PassMediaConsentFragment\n          }\n          resolveInfo {\n            status\n          }\n        }\n      }\n    "),a.next=12,Object(P.a)(y,h,"savePassMediaConsent");case 12:w=a.sent,(C=M()(w,"savePassMediaConsent.passMediaConsent"))&&(t.passmediaOptoutCookie=C);case 15:case"end":return a.stop()}}),a)})))()}},R=Object(n.forwardRef)((function(e,t){var a=e.duration,s=e.elem,i=e.children,c=e.className,l=e.onDismiss,u=Object(n.useState)(!1),m=f()(u,2),d=m[0],p=m[1],b=Object(n.useRef)(),v=Object(n.useRef)(a),g=Object(n.useRef)(),h=Object(n.useCallback)((function(){p(!1),l()}),[l]);return Object(n.useImperativeHandle)(t,(function(){return{open:function(){return p(!0)},close:function(){return p(!1)},pause:function(){clearTimeout(b.current),v.current-=Date.now()-g.current},resume:function(){g.current=Date.now(),clearTimeout(b.current),b.current=setTimeout(h,v.current)}}})),Object(n.useEffect)((function(){if(d)return g.current=Date.now(),b.current=setTimeout(h,a),function(){v.current=a,clearTimeout(b.current)}}),[d]),d?Object(o.createPortal)(r.a.createElement("div",{className:"mbrs"},r.a.createElement("div",{className:"mbrs-notification ".concat(c)},i)),s):null}));R.propTypes={duration:i.a.number,elem:i.a.instanceOf(Element),children:i.a.oneOfType([i.a.node,i.a.arrayOf(i.a.node)]).isRequired,className:i.a.string,onDismiss:i.a.func},R.defaultProps={duration:3e3,elem:document.body,className:"mbrs-notification-top mbrs-notification-right",onDismiss:function(){return null}};var L=R,F=a(205),I=a(100),T=a.p+"87beb080059908c33c7848693cab79ff.png",D=Object(n.forwardRef)((function(e,t){var a=e.onAccept,s=e.onDecline,i=Object(n.useContext)(_.a).openModal,o=Object(n.useRef)(null),c=Object(n.useState)(1e4),l=f()(c,2),m=l[0],p=l[1];Object(n.useEffect)((function(){return function(){clearInterval(o.current)}}),[]);var b=function(){var e=d()(u.a.mark((function e(t){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),p(2e4),i("cgu");case 3:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement(L,{ref:t,duration:m,onDismiss:a,className:"mbrs-notification-top mbrs-notification-right mbrs-notification-withPicto mbrs-notificationSkin-passmedia"},r.a.createElement("div",{className:"mbrs-notification-picto"},r.a.createElement("span",{className:"mbrs-mask"},"PassMedia"),r.a.createElement(I.a,{name:F.a.id})),r.a.createElement("div",{className:"mbrs-notification-body mbrs-passmediaBlock"},r.a.createElement("button",{type:"button",onClick:s,className:"mbrs-notification-close"},r.a.createElement("img",{alt:"Fermer",width:"15px",src:T})),r.a.createElement("p",null,"Félicitations,",r.a.createElement("br",null),"Vous bénéficiez dès à présent d’un accès connecté à 20minutes.fr"),r.a.createElement("div",null,r.a.createElement(E.a,{type:"button",className:"mbrs-btn mbrs-btnSkin-passmedia-notif mbrs-btnSkin-passmedia-notif-outline",onClick:s,id:"passmedia-optout-decline"},"Ne pas me connecter"),r.a.createElement(E.a,{type:"button",className:"mbrs-btn mbrs-btnSkin-passmedia-notif mbrs-btnSkin-passmedia-notif-primary",onClick:a,id:"passmedia-optout-accept"},"Ok")),r.a.createElement("div",{className:"mbrs-notification-footer"},"Consulter les ",r.a.createElement("a",{href:"".concat("https://www.20minutes.fr","/cgu"),onClick:b},"CGU de 20minutes.fr"))))}));D.propTypes={onAccept:i.a.func.isRequired,onDecline:i.a.func.isRequired};var z=D,A=a(8),H=a(16),B=function(){var e=Object(n.useContext)(b.a),t=e.addEventHandler,a=e.getJWT,s=Object(n.useContext)(g.a),i=s.updateAuth,o=s.isLogged,c=Object(n.useContext)(_.a).openModal,l=Object(n.useState)(void 0),m=f()(l,2),p=m[0],w=m[1],C=Object(n.useRef)(),E=Object(n.useRef)(null),O=Object(n.useCallback)(function(){var e=d()(u.a.mark((function e(t){var a,n,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return E.current=t.id_token,a=Object(h.a)(t.id_token),e.next=4,q.getConsent(a.sub);case 4:if(!(n=e.sent)||n.has_opt_out||q.canExposeNotification()){e.next=7;break}return e.abrupt("return");case 7:return e.next=9,v.a.loginPassMediaJWT(t.id_token,H.a.MEMBRE);case 9:(r=e.sent).fieldsErrors&&r.fieldsErrors.isVerified?w(a["profile.email"]):o||(q.canExposeNotification()&&(localStorage.setItem("autoLoginFromPassMedia",!0),localStorage.setItem("passmediaJwt",E.current)),Object(h.b)()?window.location.assign(Object(y.a)("personalInfo")):i());case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[]),x=Object(n.useCallback)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:O;a({callback:e,fields:"profile.email,data.mailVerified"})}),[a]),j=Object(n.useCallback)(function(){var e=d()(u.a.mark((function e(t){var a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("mbrsPassMediaEmailVerification"!==t.data){e.next=4;break}x(w("détectée")),e.next=10;break;case 4:if("mbrsPassMediaAuthSuccess"!==t.data){e.next=10;break}return e.next=7,q.getConsent(Object(A.getPassmediaUid)());case 7:(a=e.sent)&&a.has_opt_out||localStorage.setItem("autoLoginFromPassMedia",!0),window.location.reload();case 10:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),[x]),k=Object(n.useCallback)(d()(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q.setNotificationDisplayed({passmediaJwt:localStorage.getItem("passmediaJwt"),didOptOut:!0});case 2:localStorage.removeItem("passmediaJwt"),C.current.close();case 4:case"end":return e.stop()}}),e)}))),[C.current]),M=Object(n.useCallback)(d()(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:x();case 1:case"end":return e.stop()}}),e)}))),[x]),P=Object(n.useCallback)(d()(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q.setNotificationDisplayed({passmediaJwt:localStorage.getItem("passmediaJwt"),didOptOut:!1});case 2:return localStorage.removeItem("passmediaJwt"),C.current.close(),e.next=6,v.a.deletePassMediaUser();case 6:Object(h.b)()&&window.location.assign(Object(y.a)("login")),i();case 8:case"end":return e.stop()}}),e)}))),[C.current]);return Object(n.useEffect)((function(){return o||i(),t({onLogin:function(){return M()}}),o&&localStorage.getItem("autoLoginFromPassMedia")&&(localStorage.removeItem("autoLoginFromPassMedia"),C.current.open()),window.addEventListener("message",j),function(){window.removeEventListener("message",j)}}),[o]),Object(n.useEffect)((function(){var e;p&&c("passmedia-email-verify",{onClose:(e=d()(u.a.mark((function e(){return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return w(void 0),e.next=3,q.setNotificationDisplayed({passmediaJwt:E.current,didOptOut:!1});case 3:case"end":return e.stop()}}),e)}))),function(){return e.apply(this,arguments)})})}),[p]),r.a.createElement(r.a.Fragment,null,r.a.createElement(N,{email:p,setPassmediaEmail:w}),r.a.createElement(z,{ref:C,onAccept:k,onDecline:P}))},J=Object(n.lazy)((function(){return Promise.all([a.e(7),a.e(18),a.e(10),a.e(45)]).then(a.bind(null,331))})),$=Object(n.lazy)((function(){return a.e(5).then(a.bind(null,290))})),V=Object(n.lazy)((function(){return a.e(39).then(a.bind(null,332))})),U=Object(n.lazy)((function(){return a.e(42).then(a.bind(null,333))}));function Y(e){var t=e.children,a=document.getElementById("mbrs-headermini-notificationBell");return r.a.createElement(r.a.Fragment,null,a&&c.a.createPortal(r.a.createElement(n.Suspense,{fallback:null},r.a.createElement($,null)),a),t,r.a.createElement(B,null),r.a.createElement(n.Suspense,{fallback:null},r.a.createElement(J,null),r.a.createElement(V,null),r.a.createElement(U,null)))}Y.propTypes={children:i.a.any},Y.defaultProps={children:""};t.default=Y},217:function(e,t,a){"use strict";var n=a(13),r=a(218);n({target:"String",proto:!0,forced:a(219)("sub")},{sub:function(){return r(this,"sub","","")}})},218:function(e,t,a){var n=a(25),r=/"/g;e.exports=function(e,t,a,s){var i=String(n(e)),o="<"+t;return""!==a&&(o+=" "+a+'="'+String(s).replace(r,"&quot;")+'"'),o+">"+i+"</"+t+">"}},219:function(e,t,a){var n=a(11);e.exports=function(e){return n((function(){var t=""[e]('"');return t!==t.toLowerCase()||t.split('"').length>3}))}},32:function(e,t,a){"use strict";function n(e,t){if(null==e)return{};var a,n,r={},s=Object.keys(e);for(n=0;n<s.length;n++)a=s[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}a.d(t,"a",(function(){return n}))},9:function(e,t,a){"use strict";function n(){return(n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e}).apply(this,arguments)}a.d(t,"a",(function(){return n}))}}]);