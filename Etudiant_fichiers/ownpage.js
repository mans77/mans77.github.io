Ownpage=function(){var e="v1";var n="https://api.ownpage.fr";var o="https://recos.ownpage.fr";var r=n+"/"+e+"/collect/hits";var t="ownpage_fp";var i="ownpage_fp2";function a(){var e,n,o="ownpage_tmp=cookie",r=document.location.hostname.split(".");for(e=r.length-1;e>=0;e--){n=r.slice(e).join(".");document.cookie=o+";domain=."+n+";";if(document.cookie.indexOf(o)>-1){document.cookie=o.split("=")[0]+"=;domain=."+n+";expires=Thu, 01 Jan 1970 00:00:01 GMT;";return n}}}function c(){function e(e){return n(Math.random()*(1<<(e<<2))^Date.now()).slice(-e)}function n(e){return(e|0).toString(16)}var o=[e(4)+e(4),Date.now().toString(16).slice(-8)];return o.join("")}function u(e){var n=new RegExp("(^|;)[ ]*"+e+"=([^;]*)");var o=n.exec(document.cookie);return o?window.decodeURIComponent(o[2]):0}function f(e,n){var o=new Date;o.setTime(o.getTime()+31536e6);document.cookie=e+"="+window.encodeURIComponent(n)+";expires="+o.toGMTString()+";path=/;domain=."+a()}function d(){var e="_pk_id";var n=document.cookie.split(";");var o=undefined;for(var r=0;r<n.length;r++){var t=n[r];t=t.replace(/^\s+|\s+$/g,"");if(t.indexOf(e)===0){var i=t.split("=")[1];o=i.split(".")[0]}}return o}function s(){var e=u(i);if(e){return e}else{var n=u(t);if(n){return n}else{var o=d();if(o){return o}else{return c()}}}}function p(e){if(!e||e==""||e=="0"){return h()}else{return e}}function v(e){var n=[];for(var o in e){if(e[o]){n.push(o+"="+e[o])}}return n.join("&")}function l(e,n){if(n){var o=[];for(var r=0;r<n.length;r++){o.push("excluded[]="+n[r])}return e+"&"+o.join("&")}else{return e}}function m(e,n){new Image(1,1).src=e+(e.indexOf("?")<0?"?":"&")+n}function g(n,r,t,i,a){var c=p(r);var u=document.createElement("script");var f={callback:t,rows:i,_:(new Date).getTime()};var d=v(f);d=l(d,a);u.src=o+"/"+e+"/clients/"+n+"/users/"+c+"/recommendations.js?"+d;document.body.appendChild(u)}function w(e,n){var o=s();f(i,o);if(!n){n=""}var t={client_key:e,guid:n,url:window.encodeURIComponent(window.location.href),cookie_id:o};m(r,v(t))}function h(){return"cookie_"+s()}return{getRecommendations:g,trackPage:w,getAnonymousUserId:h}}();