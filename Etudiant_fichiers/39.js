(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{236:function(e,t,r){e.exports=function(e){"use strict";function t(e){return e.replace(/(-|:)(.)/g,(function(e,t,r){return r.toUpperCase()}))}e=e&&e.hasOwnProperty("default")?e.default:e;var r={for:"htmlFor",class:"className",acceptcharset:"acceptCharset",accesskey:"accessKey",allowfullscreen:"allowFullScreen",allowtransparency:"allowTransparency",autocomplete:"autoComplete",autofocus:"autoFocus",autoplay:"autoPlay",cellpadding:"cellPadding",cellspacing:"cellSpacing",charset:"charSet",classid:"classID",classname:"className",colspan:"colSpan",contenteditable:"contentEditable",contextmenu:"contextMenu",crossorigin:"crossOrigin",datetime:"dateTime",enctype:"encType",formaction:"formAction",formenctype:"formEncType",formmethod:"formMethod",formnovalidate:"formNoValidate",formtarget:"formTarget",frameborder:"frameBorder",hreflang:"hrefLang",htmlfor:"htmlFor",httpequiv:"httpEquiv",inputmode:"inputMode",keyparams:"keyParams",keytype:"keyType",marginheight:"marginHeight",marginwidth:"marginWidth",maxlength:"maxLength",mediagroup:"mediaGroup",minlength:"minLength",novalidate:"noValidate",radiogroup:"radioGroup",readonly:"readOnly",rowspan:"rowSpan",spellcheck:"spellCheck",srcdoc:"srcDoc",srclang:"srcLang",srcset:"srcSet",tabindex:"tabIndex",usemap:"useMap",viewbox:"viewBox"},n=3,a=8,o=["table","tbody","thead","tfoot","tr"];function i(c,l,s){var u=s.transform._;if(c.nodeType===a)return null;if(c.nodeType===n){var d=c.textContent;return u?u(d):d}for(var f=c.tagName.toLowerCase(),m=s.transform[f],p={},g=0;g<c.attributes.length;g++){var h=c.attributes[g].name,v=c.attributes[g].value;p[h]=v}p.key=l.toString();var y=function(e,n){return void 0===e&&(e={}),Object.keys(e).reduce((function(a,o){if(/^on.*/.test(o))return a;var i=o;/^(data|aria)-/.test(o)||0===n.filter((function(e){return e instanceof RegExp?e.test(o):e===o})).length&&(i=t(o));var c=r[i]||i;if("style"===c)a[c]=function(e){var r={};return e.split(";").filter((function(e){return""!==e.trim()})).forEach((function(e){var n,a=e.split(":");if(a.length>1){var o=function(e){return/^-ms-/.test(e)&&(e=e.substr(1)),t(e)}(a[0].trim()),i=(n=a.slice(1).join(":").trim(),/^\d+$/.test(n)?Number(n):n.replace(/'/g,'"'));r[o]=i}})),r}(e.style);else{var l=e[o],s=""===l||String(l).toLowerCase()===i.toLowerCase();a[c]=!!s||l}return a}),{})}(p,s.preserveAttributes),b=[];for(g=0;g<c.childNodes.length;g++){var w=c.childNodes[g],x=l+"."+g;if(!(o.indexOf(f)>-1&&w.nodeType===n&&(w.textContent=w.textContent.trim(),""===w.textContent))){var S=i(w,x,s);null!==S&&b.push(S)}}if(s.dangerouslySetChildren.indexOf(f)>-1){var C=c.innerHTML;return C&&("style"!==f&&(C=C.replace(/"/g,"&quot;")),y.dangerouslySetInnerHTML={__html:C.trim()}),m?e.createElement(m,y,null):u?u(f,y,null):e.createElement(f,y,null)}var E=0===b.length?null:b;return m?e.createElement(m,y,E):u?u(f,y,E):e.createElement(f,y,E)}return function(e,t){if(void 0===t&&(t={}),"string"!=typeof e)throw new TypeError("Expected HTML string");var r={transform:t.transform||{},preserveAttributes:t.preserveAttributes||[],dangerouslySetChildren:t.dangerouslySetChildren||["style"]},n=document.createElement("div");n.innerHTML=e.trim();for(var a=[],o=0;o<n.childNodes.length;o++)a.push(n.childNodes[o]);var c=a.map((function(e,t){return i(e,String(t),r)})).filter((function(e){return null!==e}));return 1===c.length?c[0]:c}}(r(0))},332:function(e,t,r){"use strict";r.r(t);var n=r(1),a=r.n(n),o=(r(21),r(3)),i=r.n(o),c=r(10),l=r.n(c),s=r(0),u=r.n(s),d=r(120),f=r.n(d),m=r(236),p=r.n(m),g=r(198),h=r(50),v=r(5),y=r(194);t.default=function(){var e=Object(s.useContext)(h.a).activeModals,t=Object(s.useState)(""),r=l()(t,2),n=r[0],o=r[1],c=Object(s.useState)(!0),d=l()(c,2),m=d[0],b=d[1],w=function(){var e=i()(a.a.mark((function e(){var t,r;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v.a.getPlainFileBySlug("cgu");case 2:t=e.sent,r=t.node,o(r.content),b(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(s.useEffect)((function(){f()(e,"cgu")&&!n&&e.cgu&&w()}),[e.cgu]),u.a.createElement(g.a,{title:"cgu",identifier:"cgu",size:"medium",closeOutside:!0,fixedHeight:!0},m?u.a.createElement(y.a,{className:"mbrs-loading mbrs-loading-small"}):p()(n))}}}]);