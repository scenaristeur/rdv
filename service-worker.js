if(!self.define){let e,r={};const i=(i,n)=>(i=new URL(i+".js",n).href,r[i]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=r,document.head.appendChild(e)}else e=i,importScripts(i),r()})).then((()=>{let e=r[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,s)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(r[l])return;let o={};const d=e=>i(e,l),c={module:{uri:l},exports:o,require:d};r[l]=Promise.all(n.map((e=>c[e]||d(e)))).then((e=>(s(...e),o)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"rdv"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/rdv/404.html",revision:"e743d3ed39e10cc0c23457a3f1cc685f"},{url:"/rdv/css/app.0464f798.css",revision:null},{url:"/rdv/css/chunk-vendors.cb2372b6.css",revision:null},{url:"/rdv/img/here.b7fe6ce7.png",revision:null},{url:"/rdv/img/location-pin.889383ad.png",revision:null},{url:"/rdv/img/marker.f58b9982.png",revision:null},{url:"/rdv/img/marker_selected.9c72dae0.png",revision:null},{url:"/rdv/index.html",revision:"58a2dc21eb3e17d06a9bce58f2e7d184"},{url:"/rdv/js/about.dfe66140.js",revision:null},{url:"/rdv/js/app.aa42567b.js",revision:null},{url:"/rdv/manifest.json",revision:"01f5b32e0969ea39997dacbd4f3ae064"},{url:"/rdv/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
