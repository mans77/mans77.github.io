(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{343:function(e,n,t){"use strict";t.r(n);t(33),t(43);var a=t(10),r=t.n(a),l=t(0),c=t.n(l),i=t(24),u=t.n(i);var o=function(){var e=Object(l.useState)(!0),n=r()(e,2),t=n[0],a=n[1];return function(){return a(!t)}},d=Object(l.lazy)((function(){return Promise.all([t.e(0),t.e(36)]).then(t.bind(null,338))})),s=Object(l.lazy)((function(){return Promise.all([t.e(0),t.e(37)]).then(t.bind(null,339))})),w=Object(l.lazy)((function(){return t.e(44).then(t.bind(null,346))}));n.default=function(){var e=document.getElementById("mbrs-darkmode-switch"),n=Object(l.useState)(window.innerWidth<16*window.app.sizes.contentSizeSM),t=r()(n,2),a=t[0],i=t[1],m=o();return window.onresize=function(){window.innerWidth<16*window.app.sizes.contentSizeSM&&i(!0)},Object(l.useEffect)((function(){window.app&&window.app.drawerReady?m():document.addEventListener("mbrs-drawer-ready",m)}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement(l.Suspense,{fallback:null},c.a.createElement(d,null),document.getElementById("mbrs-connectButtonInline")&&a&&u.a.createPortal(c.a.createElement(c.a.Fragment,null,c.a.createElement(s,null),c.a.createElement(w,{switchClass:"mbrs-btnSwitch-fullwidth icon-inline"})),document.getElementById("mbrs-connectButtonInline")),e&&u.a.createPortal(c.a.createElement(w,null),e)))}}}]);