!function(){function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(e){var r=o();return function(){var n,o=a(e);if(r){var i=a(this).constructor;n=Reflect.construct(o,arguments,i)}else n=o.apply(this,arguments);return function(e,r){if(r&&("object"===t(r)||"function"==typeof r))return r;if(void 0!==r)throw new TypeError("Derived constructors may only return object or undefined");return function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(e)}(this,n)}}function r(t){var e="function"==typeof Map?new Map:void 0;return r=function(t){if(null===t||(r=t,-1===Function.toString.call(r).indexOf("[native code]")))return t;var r;if("function"!=typeof t)throw new TypeError("Super expression must either be null or a function");if(void 0!==e){if(e.has(t))return e.get(t);e.set(t,o)}function o(){return n(t,arguments,a(this).constructor)}return o.prototype=Object.create(t.prototype,{constructor:{value:o,enumerable:!1,writable:!0,configurable:!0}}),i(o,t)},r(t)}function n(t,e,r){return n=o()?Reflect.construct.bind():function(t,e,r){var n=[null];n.push.apply(n,e);var o=new(Function.bind.apply(t,n));return r&&i(o,r.prototype),o},n.apply(null,arguments)}function o(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}function i(t,e){return i=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t},i(t,e)}function a(t){return a=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(t){return t.__proto__||Object.getPrototypeOf(t)},a(t)}function u(){"use strict";/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */u=function(){return e};var e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},i="function"==typeof Symbol?Symbol:{},a=i.iterator||"@@iterator",c=i.asyncIterator||"@@asyncIterator",f=i.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(T){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var i=e&&e.prototype instanceof y?e:y,a=Object.create(i.prototype),u=new S(n||[]);return o(a,"_invoke",{value:j(t,r,u)}),a}function h(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(T){return{type:"throw",arg:T}}}e.wrap=l;var p={};function y(){}function v(){}function d(){}var w={};s(w,a,(function(){return this}));var g=Object.getPrototypeOf,m=g&&g(g(_([])));m&&m!==r&&n.call(m,a)&&(w=m);var b=d.prototype=y.prototype=Object.create(w);function x(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function k(e,r){function i(o,a,u,c){var f=h(e[o],e,a);if("throw"!==f.type){var s=f.arg,l=s.value;return l&&"object"==t(l)&&n.call(l,"__await")?r.resolve(l.__await).then((function(t){i("next",t,u,c)}),(function(t){i("throw",t,u,c)})):r.resolve(l).then((function(t){s.value=t,u(s)}),(function(t){return i("throw",t,u,c)}))}c(f.arg)}var a;o(this,"_invoke",{value:function(t,e){function n(){return new r((function(r,n){i(t,e,r,n)}))}return a=a?a.then(n,n):n()}})}function j(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return P()}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var u=E(a,r);if(u){if(u===p)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var c=h(t,e,r);if("normal"===c.type){if(n=r.done?"completed":"suspendedYield",c.arg===p)continue;return{value:c.arg,done:r.done}}"throw"===c.type&&(n="completed",r.method="throw",r.arg=c.arg)}}}function E(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),p;var o=h(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,p;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,p):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,p)}function O(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function L(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function _(t){if(t){var e=t[a];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,o=function e(){for(;++r<t.length;)if(n.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:P}}function P(){return{value:void 0,done:!0}}return v.prototype=d,o(b,"constructor",{value:d,configurable:!0}),o(d,"constructor",{value:v,configurable:!0}),v.displayName=s(d,f,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,s(t,f,"GeneratorFunction")),t.prototype=Object.create(b),t},e.awrap=function(t){return{__await:t}},x(k.prototype),s(k.prototype,c,(function(){return this})),e.AsyncIterator=k,e.async=function(t,r,n,o,i){void 0===i&&(i=Promise);var a=new k(l(t,r,n,o),i);return e.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(b),s(b,f,"Generator"),s(b,a,(function(){return this})),s(b,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=_,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(L),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),c=n.call(i,"finallyLoc");if(u&&c){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,p):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),p},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),L(r),p}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;L(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:_(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),p}},e}function c(t,e,r,n,o,i,a){try{var u=t[i](a),c=u.value}catch(f){return void r(f)}u.done?e(c):Promise.resolve(c).then(n,o)}function f(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){c(i,n,o,a,u,"next",t)}function u(t){c(i,n,o,a,u,"throw",t)}a(void 0)}))}}function s(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(e,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,(i=o.key,a=void 0,a=function(e,r){if("object"!==t(e)||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var o=n.call(e,r||"default");if("object"!==t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===r?String:Number)(e)}(i,"string"),"symbol"===t(a)?a:String(a)),o)}var i,a}function h(t,e,r){return e&&l(t.prototype,e),r&&l(t,r),Object.defineProperty(t,"prototype",{writable:!1}),t}function p(t,e){v(t,e),e.add(t)}function y(t,e,r){v(t,e),e.set(t,r)}function v(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function d(t,e,r){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return r}function w(t,e){return function(t,e){if(e.get)return e.get.call(t);return e.value}(t,m(t,e,"get"))}function g(t,e,r){return function(t,e,r){if(e.set)e.set.call(t,r);else{if(!e.writable)throw new TypeError("attempted to set read only private field");e.value=r}}(t,m(t,e,"set"),r),r}function m(t,e,r){if(!e.has(t))throw new TypeError("attempted to "+r+" private field on non-instance");return e.get(t)}System.register(["./index-legacy.9da134c3.js"],(function(t,n){"use strict";var o,a;return{setters:[function(t){o=t._,a=t.a}],execute:function(){var c=new WeakMap,l=new WeakMap,v=new WeakMap,m=new WeakMap,b=new WeakMap,x=new WeakMap,k=new WeakMap,j=new WeakSet,E=new WeakSet,O=function(){function t(e){var r=e.save,n=e.load;s(this,t),p(this,E),p(this,j),y(this,c,{writable:!0,value:void 0}),y(this,l,{writable:!0,value:void 0}),y(this,v,{writable:!0,value:void 0}),y(this,m,{writable:!0,value:void 0}),y(this,b,{writable:!0,value:void 0}),y(this,x,{writable:!0,value:void 0}),y(this,k,{writable:!0,value:new Map}),g(this,c,r),g(this,l,n)}var e;return h(t,[{key:"initialize",value:(e=f(u().mark((function t(){var e;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=w(this,l).call(this),t.next=3,d(this,E,_).call(this,e);case 3:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"switch",value:function(t){function e(e){return t.apply(this,arguments)}return e.toString=function(){return t.toString()},e}(function(){var t=f(u().mark((function t(e){return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d(this,E,_).call(this,e);case 2:w(this,c).call(this,e);case 3:case"end":return t.stop()}}),t,this)})));return function(e){return t.apply(this,arguments)}}())},{key:"lang",get:function(){return w(this,x)}},{key:"general",get:function(){return w(this,v)}},{key:"g",get:function(){return w(this,v)}},{key:"tips",get:function(){return w(this,m)}},{key:"t",get:function(){return w(this,m)}},{key:"error",get:function(){return w(this,b)}},{key:"e",get:function(){return w(this,b)}},{key:"f",value:function(t,e){for(var r=arguments.length,n=new Array(r>2?r-2:0),o=2;o<r;o++)n[o-2]=arguments[o];return this.format.apply(this,[t,e].concat(n))}},{key:"format",value:function(t,e){for(var r,n=arguments.length,o=new Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];return(r=$utils).format.apply(r,[w(this,v)[t]||t,e].concat(o))||""}}]),t}();function L(t){return S.apply(this,arguments)}function S(){return(S=f(u().mark((function t(e){var r,i,c,f,s,l,h;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!w(this,k).has(e)){t.next=2;break}return t.abrupt("return",w(this,k).get(e));case 2:return t.next=4,o(Object.assign({"./langs/zh-cn.js":function(){return a((function(){return n.import("./zh-cn-legacy.8f975076.js")}),void 0)}}),"./langs/".concat(e,".js"));case 4:return r=t.sent,i=r.general,c=r.tips,f=r.error,s=r.moment,l=function(t,e){var r=new Map;for(var n in t)r.set(n,new T(t[n]));return new Proxy(r,{get:function(t,r){return t.has(r)?t.get(r):e?e(t,r):new T(r)}})},h={general:l(i),tips:l(c),error:l(f,(function(t){return t.get("unknow")})),moment:s},w(this,k).set(e,h),t.abrupt("return",h);case 13:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}function _(t){return P.apply(this,arguments)}function P(){return(P=f(u().mark((function t(e){var r,n,o,i,a;return u().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d(this,j,L).call(this,e);case 2:r=t.sent,n=r.general,o=r.tips,i=r.error,a=r.moment,g(this,v,n),g(this,m,o),g(this,b,i),g(this,x,e),$moment.updateLocale(e,a),$moment.locale(e);case 13:case"end":return t.stop()}}),t,this)})))).apply(this,arguments)}t("default",O);var T=function(t){!function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),Object.defineProperty(t,"prototype",{writable:!1}),e&&i(t,e)}(n,t);var r=e(n);function n(){return s(this,n),r.apply(this,arguments)}return h(n,[{key:"format",value:function(t){for(var e,r=arguments.length,n=new Array(r>1?r-1:0),o=1;o<r;o++)n[o-1]=arguments[o];return(e=$utils).format.apply(e,[this,t].concat(n))}},{key:"f",value:function(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return this.format.apply(this,[t].concat(r))}}]),n}(r(String))}}}))}();
//# sourceMappingURL=index-legacy.13012122.js.map
