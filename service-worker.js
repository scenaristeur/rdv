if(!self.define){let e,r={};const s=(s,i)=>(s=new URL(s+".js",i).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,n)=>{const l=e||("document"in self?document.currentScript.src:"")||location.href;if(r[l])return;let c={};const o=e=>s(e,l),d={module:{uri:l},exports:c,require:o};r[l]=Promise.all(i.map((e=>d[e]||o(e)))).then((e=>(n(...e),c)))}}define(["./workbox-5b385ed2"],(function(e){"use strict";e.setCacheNameDetails({prefix:"rdv"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/rdv/404.html",revision:"e743d3ed39e10cc0c23457a3f1cc685f"},{url:"/rdv/css/about.9dcd382b.css",revision:null},{url:"/rdv/css/app.6fab085c.css",revision:null},{url:"/rdv/css/chunk-vendors.d14a837d.css",revision:null},{url:"/rdv/img/here.b7fe6ce7.png",revision:null},{url:"/rdv/img/marker.f58b9982.png",revision:null},{url:"/rdv/index.html",revision:"856046c603cbaf418d6dcf1cb2299a88"},{url:"/rdv/js/about.0db148b7.js",revision:null},{url:"/rdv/js/app.93a7c930.js",revision:null},{url:"/rdv/manifest.json",revision:"01f5b32e0969ea39997dacbd4f3ae064"},{url:"/rdv/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map
