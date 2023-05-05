const f=new Map;function i(t,n){f.has(t)||f.set(t,new Set),f.get(t).add(n)}function o(t,n){!f.has(t)||f.get(t).delete(n)}function r(t,...n){!f.has(t)||f.get(t).forEach(e=>e(...n))}export{r as emit,o as off,i as on};
//# sourceMappingURL=index.f6125e58.js.map
