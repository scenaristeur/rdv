(function(){"use strict";var e={1827:function(e,o,n){var t=n(9242),r=n(3396);function l(e,o){const n=(0,r.up)("router-link"),t=(0,r.up)("router-view");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("nav",null,[(0,r.Wm)(n,{to:"/"},{default:(0,r.w5)((()=>[(0,r.Uk)("Home")])),_:1}),(0,r.Uk)(" | "),(0,r.Wm)(n,{to:"/about"},{default:(0,r.w5)((()=>[(0,r.Uk)("About")])),_:1})]),(0,r.Wm)(t)],64)}var i=n(89);const u={},a=(0,i.Z)(u,[["render",l]]);var c=a,s=n(5431);(0,s.z)("/syncld/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh.")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var f=n(2483);const d={class:"home"};function m(e,o,n,t,l,i){const u=(0,r.up)("HelloWorld");return(0,r.wg)(),(0,r.iD)("div",d,[(0,r.Wm)(u)])}var p=n(4870),v=n.p+"img/marker.f58b9982.png",g={__name:"HelloWorld",setup(e){const o=(0,p.iH)([40,40]),n=(0,p.iH)("EPSG:4326");let t=(0,p.iH)(15);const l=(0,p.iH)(0),i=(0,p.iH)([]),u=(0,p.iH)(null),a=(0,p.iH)(null),c=(0,r.f3)("ol-feature"),s=(0,r.f3)("ol-geom");let f=[];const d=e=>{f=e.target?.getPosition(),console.log(f),a.value?.setCenter(e.target?.getPosition())};return i.value=[{text:"Center map here",classname:"some-style-class",callback:e=>{a.value.setCenter(e.coordinate)}},{text:"Where am i",classname:"some-style-class",callback:()=>{a.value.setCenter(f),a.value.setZoom(15)}},{text:"Add a Marker",classname:"some-style-class",icon:v,callback:e=>{console.log(e);const o=new c({geometry:new s.Point(e.coordinate)});u.value.source.addFeature(o)}},"-"],(e,c)=>{const s=(0,r.up)("ol-view"),f=(0,r.up)("ol-source-osm"),m=(0,r.up)("ol-tile-layer"),g=(0,r.up)("ol-context-menu-control"),h=(0,r.up)("ol-source-vector"),b=(0,r.up)("ol-style-icon"),w=(0,r.up)("ol-style"),y=(0,r.up)("ol-vector-layer"),k=(0,r.up)("ol-geom-point"),W=(0,r.up)("ol-feature"),_=(0,r.up)("ol-geolocation"),j=(0,r.up)("ol-zoom-control"),O=(0,r.up)("ol-zoomslider-control"),H=(0,r.up)("ol-scaleline-control"),C=(0,r.up)("ol-rotate-control"),P=(0,r.up)("ol-map");return(0,r.wg)(),(0,r.iD)("div",null,[(0,r.Wm)(P,{loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0,style:{height:"85vh"},ref:"map"},{default:(0,r.w5)((()=>[(0,r.Wm)(s,{center:o.value,rotation:l.value,zoom:(0,p.SU)(t),projection:n.value,ref_key:"view",ref:a},null,8,["center","rotation","zoom","projection"]),(0,r.Wm)(m,null,{default:(0,r.w5)((()=>[(0,r.Wm)(f)])),_:1}),(0,r.Wm)(g,{items:i.value},null,8,["items"]),(0,r.Wm)(y,null,{default:(0,r.w5)((()=>[(0,r.Wm)(h,{ref_key:"markers",ref:u},null,512),(0,r.Wm)(w,null,{default:(0,r.w5)((()=>[(0,r.Wm)(b,{src:(0,p.SU)(v),scale:.1},null,8,["src"])])),_:1})])),_:1}),(0,r.Wm)(_,{projection:n.value,"onChange:position":d},{default:(0,r.w5)((e=>[(0,r.Wm)(y,{zIndex:2},{default:(0,r.w5)((()=>[(0,r.Wm)(h,null,{default:(0,r.w5)((()=>[(0,r.Wm)(W,{ref:"positionFeature"},{default:(0,r.w5)((()=>[(0,r.Wm)(k,{coordinates:e.position},null,8,["coordinates"]),(0,r.Wm)(w,null,{default:(0,r.w5)((()=>[(0,r.Wm)(b,{src:"../assets/marker.png",scale:.1})])),_:1})])),_:2},1536)])),_:2},1024)])),_:2},1024)])),_:1},8,["projection"]),(0,r.Wm)(j),(0,r.Wm)(O),(0,r.Wm)(H),(0,r.Wm)(C)])),_:1},512)])}}};const h=g;var b=h,w={name:"HomeView",components:{HelloWorld:b}};const y=(0,i.Z)(w,[["render",m]]);var k=y;const W=[{path:"/",name:"home",component:k},{path:"/about",name:"about",component:()=>n.e(443).then(n.bind(n,833))}],_=(0,f.p7)({history:(0,f.PO)("/syncld/"),routes:W});var j=_,O=n(65),H=(0,O.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}}),C=n(8784);(0,t.ri)(c).use(H).use(j).use(C.ZP).mount("#app")}},o={};function n(t){var r=o[t];if(void 0!==r)return r.exports;var l=o[t]={exports:{}};return e[t].call(l.exports,l,l.exports,n),l.exports}n.m=e,function(){var e=[];n.O=function(o,t,r,l){if(!t){var i=1/0;for(s=0;s<e.length;s++){t=e[s][0],r=e[s][1],l=e[s][2];for(var u=!0,a=0;a<t.length;a++)(!1&l||i>=l)&&Object.keys(n.O).every((function(e){return n.O[e](t[a])}))?t.splice(a--,1):(u=!1,l<i&&(i=l));if(u){e.splice(s--,1);var c=r();void 0!==c&&(o=c)}}return o}l=l||0;for(var s=e.length;s>0&&e[s-1][2]>l;s--)e[s]=e[s-1];e[s]=[t,r,l]}}(),function(){n.n=function(e){var o=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(o,{a:o}),o}}(),function(){n.d=function(e,o){for(var t in o)n.o(o,t)&&!n.o(e,t)&&Object.defineProperty(e,t,{enumerable:!0,get:o[t]})}}(),function(){n.f={},n.e=function(e){return Promise.all(Object.keys(n.f).reduce((function(o,t){return n.f[t](e,o),o}),[]))}}(),function(){n.u=function(e){return"js/about.863216fc.js"}}(),function(){n.miniCssF=function(e){}}(),function(){n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){n.o=function(e,o){return Object.prototype.hasOwnProperty.call(e,o)}}(),function(){var e={},o="rdv:";n.l=function(t,r,l,i){if(e[t])e[t].push(r);else{var u,a;if(void 0!==l)for(var c=document.getElementsByTagName("script"),s=0;s<c.length;s++){var f=c[s];if(f.getAttribute("src")==t||f.getAttribute("data-webpack")==o+l){u=f;break}}u||(a=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,n.nc&&u.setAttribute("nonce",n.nc),u.setAttribute("data-webpack",o+l),u.src=t),e[t]=[r];var d=function(o,n){u.onerror=u.onload=null,clearTimeout(m);var r=e[t];if(delete e[t],u.parentNode&&u.parentNode.removeChild(u),r&&r.forEach((function(e){return e(n)})),o)return o(n)},m=setTimeout(d.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=d.bind(null,u.onerror),u.onload=d.bind(null,u.onload),a&&document.head.appendChild(u)}}}(),function(){n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){n.p="/syncld/"}(),function(){var e={143:0};n.f.j=function(o,t){var r=n.o(e,o)?e[o]:void 0;if(0!==r)if(r)t.push(r[2]);else{var l=new Promise((function(n,t){r=e[o]=[n,t]}));t.push(r[2]=l);var i=n.p+n.u(o),u=new Error,a=function(t){if(n.o(e,o)&&(r=e[o],0!==r&&(e[o]=void 0),r)){var l=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src;u.message="Loading chunk "+o+" failed.\n("+l+": "+i+")",u.name="ChunkLoadError",u.type=l,u.request=i,r[1](u)}};n.l(i,a,"chunk-"+o,o)}},n.O.j=function(o){return 0===e[o]};var o=function(o,t){var r,l,i=t[0],u=t[1],a=t[2],c=0;if(i.some((function(o){return 0!==e[o]}))){for(r in u)n.o(u,r)&&(n.m[r]=u[r]);if(a)var s=a(n)}for(o&&o(t);c<i.length;c++)l=i[c],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(s)},t=self["webpackChunkrdv"]=self["webpackChunkrdv"]||[];t.forEach(o.bind(null,0)),t.push=o.bind(null,t.push.bind(t))}();var t=n.O(void 0,[998],(function(){return n(1827)}));t=n.O(t)})();
//# sourceMappingURL=app.898b710b.js.map