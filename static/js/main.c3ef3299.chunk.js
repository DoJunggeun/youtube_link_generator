(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){},13:function(e,t,n){"use strict";n.r(t);var i=n(0),l=n.n(i),o=n(3),u=n.n(o);n(9),n(11);var r=function(){function e(){var e=document.getElementById("originallink").value,t=document.querySelectorAll(".input-tooltip");if(""==e)document.getElementById("thumbnail").src="",document.querySelector("#videoInfo").innerText="",t.forEach(function(e){return e.style.opacity=0});else{var n=u(e);n?(t.forEach(function(e){return e.style.opacity=0}),function(e){fetch("https://www.googleapis.com/youtube/v3/videos?part=snippet&id="+e+"&key=AIzaSyDeA2ewnVvPToP8JxgTPaEcTuMr21oCUHY").then(function(e){return e.json()}).then(function(e){var t=JSON.parse(JSON.stringify(e)).items[0];if(void 0!=t){for(var n=(t=t.snippet).title,i=t.channelTitle,l=t.thumbnails,o="",u=0,r=Object.keys(l),c=0;c<r.length;c++){var a=r[c];l[a].width>u&&(u=l[a].width,o=l[a].url)}!function(e){document.getElementById("thumbnail").src=e}(o);var d=document.querySelector("#videoInfo");d.innerText="["+i+"] "+n}else document.querySelector("#videoInfo").innerText="Check your URL"})}(o(n.url,n.urltype))):n||t.forEach(function(e){return e.style.opacity=1})}}function t(){var e=document.getElementById("min"),t=document.getElementById("sec");return r(e.value)||c(e.value)?r(t.value)||c(t.value)?t.value>=60?(alert("sec must be smaller than 60"),void(t.value=t.value.slice(0,1))):void 0:(alert(t.value+" is not a integer"),void(t.value="")):(alert(e.value+" is not a integer"),void(e.value=""))}function n(){var e,t=document.getElementById("originallink").value,n=document.getElementById("min"),l=document.getElementById("sec");if(c(t))alert("Enter your URL");else if(!1!==(e=u(t))){c(n.value)&&(n.value=0),c(l.value)&&(l.value=0),o(e.url,e.urltype);var r=function(e,t,n){var i=o(e.url,e.urltype);return 0==t&&0==n?"https://youtu.be/"+i:"https://youtu.be/"+i+"?t="+(60*t+1*n)}(e,n.value,l.value);i(r),function(e,t){document.getElementById("result").value=e,setTimeout(function(){return alert("URL copied!")},300)}(r),document.querySelectorAll(".submit-tooltip").forEach(function(e){return e.style.opacity=1})}else alert("Check your URL\nYour URL might be wrong")}function i(e){var t=document.createElement("textarea");document.body.appendChild(t),t.value=e,t.select(),document.execCommand("copy"),document.body.removeChild(t)}function o(e,t){var n=e,i=t;if("shortURL"===i)return n.slice(9);if("fullURL"===i){var l=n.indexOf("v=")+2,o=l+11;return n.slice(l,o)}}function u(e){var t=null;if(e.includes("?t=")&&(e=e.slice(0,e.indexOf("?t="))),e.includes("?list=")){var n=e.indexOf("?list=")+6;t=e.slice(n,n+13)}if(e.includes("youtu.be")){var i=e.indexOf("youtu.be")+9,l=i+11;if(e.slice(i,l).length<11)return!1;if("youtu.be"===e.slice(8,16))return{urltype:"shortURL",url:e.slice(8),listcode:t};if("youtu.be"===e.slice(7,15))return{urltype:"shortURL",url:e.slice(7),listcode:t};if("youtu.be"===e.slice(0,8))return{urltype:"shortURL",url:e,listcode:t}}if(!e.includes("youtube.com"))return!1;if(!e.includes("?v="))return!1;var o=e.indexOf("?v=")+3,u=o+11;return!(e.slice(o,u).length<11)&&("youtube.com"===e.slice(0,11)?{urltype:"fullURL",url:e,listcode:t}:"youtube.com"===e.slice(4,15)?{urltype:"fullURL",url:e.slice(4),listcode:t}:"youtube.com"===e.slice(11,22)?{urltype:"fullURL",url:e.slice(11),listcode:t}:"youtube.com"===e.slice(12,23)?{urltype:"fullURL",url:e.slice(12),listcode:t}:void 0)}function r(e){return e==parseInt(e)}function c(e){return null==e||""==e||void 0==e}return l.a.createElement("div",{className:"App"},l.a.createElement("header",{className:"App-header"},l.a.createElement("h1",{id:"title"},"Youtube specific time URL Generator"),l.a.createElement("div",{className:"main"},l.a.createElement("input",{id:"originallink",type:"text",className:"width100",placeholder:"original URL",onChange:function(){return e()}}),l.a.createElement("div",{className:"p-tooltip input-tooltip"},l.a.createElement("div",{className:"p-tooltip-content input-tooltip"},"check your URL"),l.a.createElement("div",{className:"p-tooltip-arrow input-tooltip"})),l.a.createElement("div",{className:"inputs width100"},l.a.createElement("input",{id:"min",type:"text",minLength:"1",maxLength:"4",size:"6",placeholder:"min",onChange:function(){return t()}}),"\xa0\xa0:\xa0\xa0",l.a.createElement("input",{id:"sec",type:"text",minLength:"1",maxLength:"2",size:"6",placeholder:"sec",onChange:function(){return t()}}),l.a.createElement("button",{id:"submit",onClick:function(){return n()}},"submit")),l.a.createElement("input",{id:"result",type:"text",placeholder:"result",readOnly:!0,style:{width:"100%"},onClick:function(){var e;(e=document.querySelector("#result").value)&&(i(e),setTimeout(function(){return alert("URL copied!")},300))}}))),l.a.createElement("div",{id:"videoInfo"}),l.a.createElement("img",{id:"thumbnail",alt:"",onClick:function(){var e,t;e=document.getElementById("result").value,t=document.getElementById("originallink").value,e?window.open(e):window.open(t)}}),l.a.createElement("button",{id:"share",onClick:function(){return e=document.createElement("textarea"),document.body.appendChild(e),e.value=window.location,e.select(),document.execCommand("copy"),document.body.removeChild(e),void setTimeout(function(){return alert("URL copied!\nThanks for sharing")},300);var e}},"share this page"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(l.a.createElement(r,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},4:function(e,t,n){e.exports=n(13)},9:function(e,t,n){}},[[4,2,1]]]);
//# sourceMappingURL=main.c3ef3299.chunk.js.map