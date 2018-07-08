!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.apprun=e():t.apprun=e()}(this,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var o=e[r]={i:r,l:!1,exports:{}};return t[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:r})},n.r=function(t){Object.defineProperty(t,"__esModule",{value:!0})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=1)}([function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0});var n,r=function(){function t(){this._events={}}return t.prototype.on=function(t,e,n){void 0===n&&(n={}),this._events[t]=this._events[t]||[],this._events[t].push({fn:e,options:n})},t.prototype.run=function(t){for(var e=this,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];var o=this._events[t];console.assert(!!o,"No subscriber for event: "+t),o&&(this._events[t]=o.filter(function(r){var o=r.fn,i=r.options;return i.delay?e.delay(t,o,n,i):o.apply(e,n),!r.options.once}))},t.prototype.once=function(t,e){this.on(t,e)},t.prototype.delay=function(t,e,n,r){var o=this;r._t&&clearTimeout(r._t),r._t=setTimeout(function(){clearTimeout(r._t),e.apply(o,n)},r.delay)},t}();e.App=r;var o=t||window;o.app&&o.app.start?n=o.app:(n=new r,o.app=n),e.default=n}).call(this,n(8))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o=n(7),i=n(5);e.Component=i.Component;var a=n(2);e.on=a.on,e.update=a.update,e.event=a.update;var s=n(4);r.default.createElement=o.createElement,r.default.render=o.render,r.default.Fragment=o.Fragment,r.default.start=function(t,e,n,r,o){var a=Object.assign(o||{},{render:!0,global_event:!0}),s=new i.Component(e,n,r);return o&&o.rendered&&(s.rendered=o.rendered),s.mount(t,a),s},r.default.route||(r.default.route=s.default,r.default.on("//",function(t){}),r.default.on("#",function(t){}),r.default.on("route",function(t){return s.default(t)}),"object"==typeof document&&document.addEventListener("DOMContentLoaded",function(){window.onpopstate=function(){return s.default(location.hash)},s.default(location.hash)})),e.default=r.default,r.default.on("debug",function(t){return 0})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.Reflect={meta:new WeakMap,defineMetadata:function(t,e,n){this.meta.has(n)||this.meta.set(n,{}),this.meta.get(n)[t]=e},getMetadataKeys:function(t){return t=Object.getPrototypeOf(t),this.meta.get(t)?Object.keys(this.meta.get(t)):[]},getMetadata:function(t,e){return e=Object.getPrototypeOf(e),this.meta.get(e)?this.meta.get(e)[t]:null}},e.update=function(t,n){return void 0===n&&(n={}),function(r,o,i){return t=o+(t?","+t:""),e.Reflect.defineMetadata("apprun-update:"+t,{name:t,key:o,options:n},r),i}},e.on=function(t,n){return void 0===n&&(n={}),function(r,o){t=o+(t?","+t:""),e.Reflect.defineMetadata("apprun-update:"+t,{name:t,key:o,options:n},r)}}},function(t,e,n){"use strict";var r=this&&this.__assign||Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t};Object.defineProperty(e,"__esModule",{value:!0});var o=n(6),i="_props";function a(t){var e=[],n=function(t){null!==t&&void 0!==t&&""!==t&&e.push("function"==typeof t||"object"==typeof t?t:""+t)};return t&&t.forEach(function(t){Array.isArray(t)?t.forEach(function(t){return n(t)}):n(t)}),e}e.createElement=function(t,e){for(var n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];var s=a(n);return"string"==typeof t?{tag:t,props:e,children:s}:void 0===t&&n?s:Object.getPrototypeOf(t).__isAppRunComponent?o.default(t,r({},e,{children:n})):t(e,s)};var s={};function u(t,e){if(null!=e&&t)if(Array.isArray(e))d(t,e);else{var n=e;t.firstChild?c(t.firstChild,n):t.appendChild(f(n))}}function c(t,e){console.assert(!!t),function(t,e){return t.nodeName===(""+(e.tag||"")).toUpperCase()}(t,e)?(d(t,e.children),p(t,e.props)):t.parentNode.replaceChild(f(e),t)}function d(t,e){for(var n=Math.min(t.childNodes.length,e.length),r=0;r<n;r++){var o=e[r],i=t.childNodes[r];if("string"==typeof o)i.textContent!==o&&(3===i.nodeType?i.textContent=o:t.replaceChild(l(o),i));else{var a=o.props&&o.props.key;if(a)if(i.key===a)c(t.childNodes[r],o);else{var u=a&&s[a];u?(t.replaceChild(u,i),t.appendChild(i),c(t.childNodes[r],o)):(t.appendChild(f(o),i),c(t.childNodes[r],o))}else c(t.childNodes[r],o)}}for(var d=t.childNodes.length;d>n;)t.removeChild(t.lastChild),d--;if(e.length>n){var p=document.createDocumentFragment();for(r=n;r<e.length;r++)p.appendChild(f(e[r]));t.appendChild(p)}}function l(t){if(0===t.indexOf("_html:")){var e=document.createElement("div");return e.insertAdjacentHTML("afterbegin",t.substring(6)),e}return document.createTextNode(t)}function f(t){if(console.assert(null!==t&&void 0!==t),"string"==typeof t)return l(t);if(!t.tag)return l(JSON.stringify(t));var e="svg"===t.tag?document.createElementNS("http://www.w3.org/2000/svg",t.tag):document.createElement(t.tag);return p(e,t.props),t.children&&t.children.forEach(function(t){return e.appendChild(f(t))}),e}function p(t,e){console.assert(!!t);var n=t[i]||{};for(var r in e=function(t,e){var n={};return t&&Object.keys(t).forEach(function(t){return n[t]=""}),e&&Object.keys(e).forEach(function(t){return n[t]=e[t]}),n}(n,e),t[i]=e,e){var o=e[r];if("style"===r)for(var a in t.style.cssText&&(t.style.cssText=""),o)t.style[a]!==o[a]&&(t.style[a]=o[a]);else if(r.startsWith("data-")){var u=r.substring(5);t.dataset[u]!==o&&(t.dataset[u]=o)}else r.startsWith("role")||r.startsWith("aria-")?t.getAttribute(r)!==o&&t.setAttribute(r,o):(t[r]!==o&&(t[r]=o),"key"===r&&o&&(s[o]=t))}}e.updateElement=u,e.render=u,e.Fragment=function(t){for(var e=[],n=1;n<arguments.length;n++)e[n-1]=arguments[n];return a(e)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o="//";e.default=function(t){if(t||(t="#"),t.startsWith("#")){var e=t.split("/"),n=e[0],i=e.slice(1);r.default.run.apply(r.default,[n].concat(i)),r.default.run.apply(r.default,[o,n].concat(i))}else if(t.startsWith("/")){var a=t.split("/"),s=(a[0],a[1]);i=a.slice(2),r.default.run.apply(r.default,["/"+s].concat(i)),r.default.run.apply(r.default,[o,"/"+s].concat(i))}else r.default.run(t),r.default.run(o,t)}},function(t,e,n){"use strict";var r=this&&this.__assign||Object.assign||function(t){for(var e,n=1,r=arguments.length;n<r;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t};Object.defineProperty(e,"__esModule",{value:!0});var o=n(0),i=n(2),a=function(){function t(t,e,n,i){var a=this;this.state=t,this.view=e,this.update=n,this.options=i,this._app=new o.App,this._history=[],this._history_idx=-1,this.start=function(t,e){return void 0===t&&(t=null),void 0===e&&(e={render:!0}),a.mount(t,r({},e,{render:!0}))}}return t.prototype.renderState=function(t){if(this.view){var e=this.view(t);o.default.run("debug",{component:this,state:t,vdom:e||"[vdom is null - no render]"});var n="string"==typeof this.element?document.getElementById(this.element):this.element;n&&(n._component=this),n&&o.default.render&&(o.default.render(n,e),this.rendered&&this.rendered(this.state))}},t.prototype.setState=function(t,e){var n=this;if(void 0===e&&(e={render:!0,history:!1}),t instanceof Promise)t.then(function(t){n.setState(t,e)}).catch(function(t){throw console.error(t),t});else{if(null==t)return;this.state=t,!1!==e.render&&this.renderState(t),!1!==e.history&&this.enable_history&&(this._history=this._history.concat([t]),this._history_idx=this._history.length-1),"function"==typeof e.callback&&e.callback(this.state)}},t.prototype.mount=function(t,e){var n=this;if(void 0===t&&(t=null),console.assert(!this.element,"Component already mounted."),this.options=e=Object.assign(this.options||{},e),this.element=t,this.global_event=e.global_event,this.enable_history=!!e.history,this.enable_history){this.on(e.history.prev||"history-prev",function(){n._history_idx--,n._history_idx>=0?n.setState(n._history[n._history_idx],{render:!0,history:!1}):n._history_idx=0}),this.on(e.history.next||"history-next",function(){n._history_idx++,n._history_idx<n._history.length?n.setState(n._history[n._history_idx],{render:!0,history:!1}):n._history_idx=n._history.length-1})}return this.add_actions(),void 0===this.state&&(this.state=this.model||{}),e.render?this.setState(this.state,{render:!0,history:!0}):this.setState(this.state,{render:!1,history:!0}),this},t.prototype.is_global_event=function(t){return t&&(t.startsWith("#")||t.startsWith("/"))},t.prototype.add_action=function(t,e,n){var r=this;void 0===n&&(n={}),e&&"function"==typeof e&&this.on(t,function(){for(var i=[],a=0;a<arguments.length;a++)i[a]=arguments[a];var s=e.apply(void 0,[r.state].concat(i));o.default.run("debug",{component:r,event:t,e:i,state:r.state,newState:s,options:n}),r.setState(s,n)},n)},t.prototype.add_actions=function(){var t=this,e=this.update||{};i.Reflect.getMetadataKeys(this).forEach(function(n){if(n.startsWith("apprun-update:")){var r=i.Reflect.getMetadata(n,t);e[r.name]=[t[r.key].bind(t),r.options]}});var n={};Object.keys(e).forEach(function(t){var r=e[t];("function"==typeof r||Array.isArray(r))&&t.split(",").forEach(function(t){return n[t.trim()]=r})}),Object.keys(n).forEach(function(e){var r=n[e];"function"==typeof r?t.add_action(e,r):Array.isArray(r)&&t.add_action(e,r[0],r[1])})},t.prototype.run=function(t){for(var e,n=[],r=1;r<arguments.length;r++)n[r-1]=arguments[r];return this.global_event||this.is_global_event(t)?o.default.run.apply(o.default,[t].concat(n)):(e=this._app).run.apply(e,[t].concat(n))},t.prototype.on=function(t,e,n){return this.global_event||this.is_global_event(t)?o.default.on(t,e,n):this._app.on(t,e,n)},t.__isAppRunComponent=!0,t}();e.Component=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),o={};r.default.on("get-components",function(t){return t.components=o}),e.default=function(t,e){var n=e&&e.id;n||(n="_"+t.name+"_"+performance.now());var i=n&&o[n]?o[n]:o[n]=new t(e).mount(n);return i.mounted&&setTimeout(function(){return i.mounted(e)},0),i.rendered&&setTimeout(function(){return i.rendered(i.state)},0),r.default.createElement("div",{id:n},i.view&&i.view(i.state))}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3);e.createElement=r.createElement,e.Fragment=r.Fragment,e.render=function(t,e){console.assert(!!t),r.updateElement(t,e)}},function(t,e){var n;n=function(){return this}();try{n=n||Function("return this")()||(0,eval)("this")}catch(t){"object"==typeof window&&(n=window)}t.exports=n}])});
//# sourceMappingURL=apprun.js.map