"use strict";var lkModal={getCookie:function(e){var t=void 0,n=void 0;return document.cookie.length>0&&(t=document.cookie.indexOf(e+"="),t!=-1)?(t=t+e.length+1,n=document.cookie.indexOf(";",t),n==-1&&(n=document.cookie.length),unescape(document.cookie.substring(t,n))):""},setCookie:function(e,t,n){var o=new Date;o.setDate(o.getDate()+n),document.cookie=e+"="+escape(t)+(null==n?"":";expires="+o.toGMTString())},checkEqui:function(e,t,n,o,i){var c=$(e),r=navigator.userAgent,u=r.indexOf("Android")>-1||r.indexOf("Linux")>-1||r.indexOf("Adr")>-1,d=!!r.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);if(u){if(o)return void c.click(function(){i()});c.attr("href",t)}d&&c.attr("href",n)}};
//# sourceMappingURL=../../maps/wxV2/utils/utils-index.js.map