let n=!1;const t={};function s(){return{on:n}}function u(){return{search:t}}window.location.search.substring(1).split("&").forEach(o=>{const[e,r]=o.split("=");if(!!e){if(e==="debug"&&r){n=!!JSON.parse(r);return}t[e]=r}});export{u as core,s as debug};
//# sourceMappingURL=configure.search.e7a0686e.js.map
