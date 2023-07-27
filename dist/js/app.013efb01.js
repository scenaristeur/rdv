(function(){"use strict";var e={4877:function(e,t,o){var n=o(9242),l=o(3396);function r(e,t){const o=(0,l.up)("router-view");return(0,l.wg)(),(0,l.j4)(o)}var a=o(89);const i={},u=(0,a.Z)(i,[["render",r]]);var s=u,c=o(5431);(0,c.z)("/rdv/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(){console.log("New content is available; please refresh."),alert("This app has been updated, please close the app & re-open")},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var d=o(2483);const f={class:"home"};function m(e,t,o,n,r,a){const i=(0,l.up)("HelloWorld");return(0,l.wg)(),(0,l.iD)("div",f,[(0,l.Wm)(i)])}var v=o(4870),p=o(7139),g=o.p+"img/here.b7fe6ce7.png",w=o.p+"img/marker.f58b9982.png",h=o(6866),y=o(5288),_=o(9373),b=o(2213),k=o(114);const W={rdvs:{}},S=(0,y.wI)(W),D=(0,y.ms)(S),H=new k.GL(D),I=new _.x$("rdv",D,{awareness:H,signaling:["wss://noosld-webrtc.glitch.me"]}),T=new b.VU("wss://yjs-leveldb.glitch.me/rdv","rdv",D,{awareness:H});I.on("status",(e=>{console.log("** webrtcProvider in y_store",e.status)})),T.on("status",(e=>{console.log("## websocketProvider in y_store",e.status)}));var x=o(3029),O=o(5144);const j=e=>((0,l.dD)("data-v-c6198af4"),e=e(),(0,l.Cn)(),e),F=j((()=>(0,l._)("label",{for:"checkbox"},"Fake",-1))),U=j((()=>(0,l._)("label",{for:"follow_me"},"Follow me",-1))),P=["for"],C=j((()=>(0,l._)("hr",null,null,-1))),E=j((()=>(0,l._)("small",null,[(0,l._)("i",null,"right-click or long tap on the map to add a rdv")],-1)));var V={__name:"HelloWorld",setup(e){(0,y.QB)(h);const t=(0,v.iH)([2.2945009486790244,48.858287635592696]),o=(0,v.iH)("EPSG:4326"),r=(0,v.iH)(17),a=(0,v.iH)(0),i=(0,v.iH)(),u=(0,v.iH)(null),s=(0,v.iH)([]),c=(0,v.iH)([]),d=(0,v.iH)([]),f=(0,v.iH)([]),m=(0,v.iH)(!1),_=(0,v.iH)(!0);let b=!1,k=!0;const W=(0,v.iH)(5),D=(0,v.iH)(1),I=(0,v.iH)("red"),T=(0,v.iH)("white"),j=(0,l.f3)("ol-feature"),V=(0,l.f3)("ol-geom"),A=(0,v.iH)(!1),Z=(0,v.iH)(!1),B=(0,v.iH)(new O.Z),M=(0,l.f3)("ol-selectconditions"),N=M.click;function z(e){if(console.log(e),e.selected.length>0){let t=e.selected[0].get("uuid");console.log("selected",e.selected[0],e.selected[0].get("uuid")),q.value=S.rdvs[t],console.log(q.value.author,"if author = clientID, edit = true"),Z.value=!1,A.value=!0}}const L=[{id:"title",name:"Title",type:"text"},{id:"desc",name:"Description",type:"text"},{id:"start_date",name:"Start Date",type:"date",min:(new Date).toISOString().split("T")[0]},{id:"start_time",name:"Start Time",type:"time"},{id:"end_date",name:"End Date",type:"date",min:(new Date).toISOString().split("T")[0]},{id:"end_time",name:"End Time",type:"time"}];let q=(0,v.iH)({});c.value=[{text:"Center map here",classname:"some-style-class",callback:e=>{i.value.setCenter(e.coordinate)}},{text:"Add a rdv",classname:"some-style-class",icon:w,callback:e=>{q.value={uuid:(0,x.Z)(),author:H.clientID,coordinates:e.coordinate,start_date:(new Date).toISOString().split("T")[0],end_date:(new Date).toISOString().split("T")[0],start_time:"00:00",end_time:"23:59"},Z.value=!0,A.value=!0}},"-"];const G=()=>{console.log(q.value),q.value.updated=Date.now();const e=new j({geometry:new V.Point(q.value.coordinates),data:q.value});1==Z.value&&(d.value.source.addFeature(e),S.rdvs[q.value.uuid]=q.value)},$=(e,t)=>{let o=e.get("color");void 0!=t.getImage().getFill&&t.getImage().getFill().setColor(o);let n=e.get("name");t.getText().setText(n)};H.setLocalStateField("user",{name:"user_"+Date.now(),color:"#ffb61e",clientID:H.clientID});const Q=e=>{console.log(H.clientID,e);let t=e.target.getPosition();m.value.checked&&(t[0]+=.02*Math.random()-.01,t[1]+=.02*Math.random()-.01),s.value=t,console.log("follow_me.value.checked",_.value.checked),_.value.checked&&i.value?.setCenter(t),H.setLocalStateField("position",{coordinates:t,updated:Date.now()})},K=e=>{e.forEach((e=>{if(void 0!=e.position&&null!=f.value&&e.user.clientID!=H.clientID&&void 0!=f.value.source){let t=f.value.source.getFeatures().find((t=>t.get("clientID")==e.user.clientID));if(void 0==t){const t=new j({geometry:new V.Point(e.position.coordinates),name:e.user.name,color:e.user.color,clientID:e.user.clientID});f.value.source.addFeature(t)}else t.getGeometry().setCoordinates(e.position.coordinates)}}))};H.on("change",(()=>{K(Array.from(H.getStates().values()))}));const R=e=>{if(console.log(e),null!=d.value)for(let[t,o]of Object.entries(S.rdvs))if(t!=H.clientID){console.log("coordin",t,o.coordinates[0],o.coordinates[1],o.title),console.log("dates",t,o.end_date,o.end_time);let e=o.end_date+"T"+o.end_time+":00Z",n=new Date(e),l=Date.now();console.log(l,n);let r=n.getTime()-l;if(r<0)return void delete S.rdvs[t];if(void 0!=o.end_date&&void 0!=o.end_time){const e=new j({geometry:new V.Point(o.coordinates),name:o.title,uuid:t});d.value.source.addFeature(e)}else console.log(t,"no end_date"),delete S.rdvs[t]}};return(0,y.QT)(S.rdvs,R),R(),(e,h)=>{const y=(0,l.up)("ol-view"),S=(0,l.up)("ol-source-osm"),H=(0,l.up)("ol-tile-layer"),x=(0,l.up)("ol-context-menu-control"),O=(0,l.up)("ol-source-vector"),j=(0,l.up)("ol-style-icon"),V=(0,l.up)("ol-style-text"),M=(0,l.up)("ol-style"),K=(0,l.up)("ol-vector-layer"),R=(0,l.up)("ol-interaction-select"),Y=(0,l.up)("ol-style-fill"),J=(0,l.up)("ol-style-stroke"),X=(0,l.up)("ol-style-circle"),ee=(0,l.up)("ol-geom-point"),te=(0,l.up)("ol-feature"),oe=(0,l.up)("ol-geolocation"),ne=(0,l.up)("ol-map"),le=(0,l.up)("BCol"),re=(0,l.up)("BFormInput"),ae=(0,l.up)("BRow"),ie=(0,l.up)("BModal");return(0,l.wg)(),(0,l.iD)("div",null,[(0,l.Wm)(ne,{loadTilesWhileAnimating:!0,loadTilesWhileInteracting:!0,style:{height:"80vh"},ref_key:"map",ref:u},{default:(0,l.w5)((()=>[(0,l.Wm)(y,{ref_key:"view",ref:i,center:t.value,rotation:a.value,zoom:r.value,projection:o.value},null,8,["center","rotation","zoom","projection"]),(0,l.Wm)(H,null,{default:(0,l.w5)((()=>[(0,l.Wm)(S)])),_:1}),(0,l.Wm)(x,{items:c.value},null,8,["items"]),(0,l.Wm)(K,null,{default:(0,l.w5)((()=>[(0,l.Wm)(O,{ref_key:"markers",ref:d},null,512),(0,l.Wm)(M,{overrideStyleFunction:$},{default:(0,l.w5)((()=>[(0,l.Wm)(j,{src:(0,v.SU)(w),scale:.05},null,8,["src"]),(0,l.Wm)(V,{text:"Hellooooo"})])),_:1})])),_:1}),(0,l.Wm)(R,{onSelect:z,condition:(0,v.SU)(N),features:B.value},{default:(0,l.w5)((()=>[(0,l.Wm)(M,{overrideStyleFunction:$},{default:(0,l.w5)((()=>[(0,l.Wm)(j,{src:(0,v.SU)(w),scale:.1},null,8,["src"]),(0,l.Wm)(V,{color:"white",text:"Hellooooo"})])),_:1})])),_:1},8,["condition","features"]),(0,l.Wm)(K,null,{default:(0,l.w5)((()=>[(0,l.Wm)(O,{ref_key:"users",ref:f},null,512),(0,l.Wm)(M,{overrideStyleFunction:$},{default:(0,l.w5)((()=>[(0,l.Wm)(X,{radius:W.value},{default:(0,l.w5)((()=>[(0,l.Wm)(Y,{color:T.value},null,8,["color"]),(0,l.Wm)(J,{color:I.value,width:D.value},null,8,["color","width"]),(0,l.Wm)(V,{text:"Hellooooo"})])),_:1},8,["radius"])])),_:1})])),_:1}),(0,l.Wm)(oe,{projection:o.value,"onChange:position":Q},{default:(0,l.w5)((()=>[(0,l._)("template",null,[(0,l.Wm)(K,{zIndex:2},{default:(0,l.w5)((()=>[(0,l.Wm)(O,null,{default:(0,l.w5)((()=>[(0,l.Wm)(te,{ref:"positionFeature"},{default:(0,l.w5)((()=>[(0,l.Wm)(ee,{coordinates:s.value},null,8,["coordinates"]),(0,l.Wm)(M,null,{default:(0,l.w5)((()=>[(0,l.Wm)(j,{src:(0,v.SU)(g),scale:.1},null,8,["src"])])),_:1})])),_:1},512)])),_:1})])),_:1})])])),_:1},8,["projection"])])),_:1},512),(0,l.wy)((0,l._)("input",{type:"checkbox",id:"checkbox",ref_key:"faking",ref:m,"onUpdate:modelValue":h[0]||(h[0]=e=>(0,v.dq)(b)?b.value=e:b=e)},null,512),[[n.e8,(0,v.SU)(b)]]),F,(0,l.Uk)("    "),(0,l.wy)((0,l._)("input",{type:"checkbox",id:"follow_me",ref_key:"follow_me",ref:_,checked:"","onUpdate:modelValue":h[1]||(h[1]=e=>(0,v.dq)(k)?k.value=e:k=e)},null,512),[[n.e8,(0,v.SU)(k)]]),U,(0,l.Wm)(ie,{modelValue:A.value,"onUpdate:modelValue":h[2]||(h[2]=e=>A.value=e),onOk:G},{default:(0,l.w5)((()=>[((0,l.wg)(),(0,l.iD)(l.HY,null,(0,l.Ko)(L,(e=>(0,l.Wm)(ae,{class:"my-1",key:e.id},{default:(0,l.w5)((()=>[(0,l.Wm)(le,{sm:"3"},{default:(0,l.w5)((()=>[(0,l._)("label",{for:`type-${e.name}`},[(0,l._)("code",null,(0,p.zw)(e.name),1),(0,l.Uk)(":")],8,P)])),_:2},1024),(0,l.Wm)(le,{sm:"9"},{default:(0,l.w5)((()=>[(0,l.Wm)(re,{disabled:!Z.value,id:`type-${e.name}`,type:e.type,modelValue:(0,v.SU)(q)[e.id],"onUpdate:modelValue":t=>(0,v.SU)(q)[e.id]=t,min:e.min},null,8,["disabled","id","type","modelValue","onUpdate:modelValue","min"])])),_:2},1024)])),_:2},1024))),64))])),_:1},8,["modelValue"]),C,E,(0,l.Uk)(" 0.0.1 ")])}}};const A=(0,a.Z)(V,[["__scopeId","data-v-c6198af4"]]);var Z=A,B={name:"HomeView",components:{HelloWorld:Z}};const M=(0,a.Z)(B,[["render",m]]);var N=M;const z=[{path:"/",name:"home",component:N},{path:"/about",name:"about",component:()=>o.e(443).then(o.bind(o,1576))}],L=(0,d.p7)({history:(0,d.PO)("/rdv/"),routes:z});var q=L,G=o(65),$=(0,G.MT)({state:{},getters:{},mutations:{},actions:{},modules:{}}),Q=o(2026),K=o(7474);(0,n.ri)(s).use($).use(q).use(Q.ZP).use(S).use(K.ZP).mount("#app")}},t={};function o(n){var l=t[n];if(void 0!==l)return l.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,o),r.exports}o.m=e,function(){var e=[];o.O=function(t,n,l,r){if(!n){var a=1/0;for(c=0;c<e.length;c++){n=e[c][0],l=e[c][1],r=e[c][2];for(var i=!0,u=0;u<n.length;u++)(!1&r||a>=r)&&Object.keys(o.O).every((function(e){return o.O[e](n[u])}))?n.splice(u--,1):(i=!1,r<a&&(a=r));if(i){e.splice(c--,1);var s=l();void 0!==s&&(t=s)}}return t}r=r||0;for(var c=e.length;c>0&&e[c-1][2]>r;c--)e[c]=e[c-1];e[c]=[n,l,r]}}(),function(){o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,{a:t}),t}}(),function(){o.d=function(e,t){for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}}(),function(){o.f={},o.e=function(e){return Promise.all(Object.keys(o.f).reduce((function(t,n){return o.f[n](e,t),t}),[]))}}(),function(){o.u=function(e){return"js/about.f98cebf4.js"}}(),function(){o.miniCssF=function(e){}}(),function(){o.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){var e={},t="rdv:";o.l=function(n,l,r,a){if(e[n])e[n].push(l);else{var i,u;if(void 0!==r)for(var s=document.getElementsByTagName("script"),c=0;c<s.length;c++){var d=s[c];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==t+r){i=d;break}}i||(u=!0,i=document.createElement("script"),i.charset="utf-8",i.timeout=120,o.nc&&i.setAttribute("nonce",o.nc),i.setAttribute("data-webpack",t+r),i.src=n),e[n]=[l];var f=function(t,o){i.onerror=i.onload=null,clearTimeout(m);var l=e[n];if(delete e[n],i.parentNode&&i.parentNode.removeChild(i),l&&l.forEach((function(e){return e(o)})),t)return t(o)},m=setTimeout(f.bind(null,void 0,{type:"timeout",target:i}),12e4);i.onerror=f.bind(null,i.onerror),i.onload=f.bind(null,i.onload),u&&document.head.appendChild(i)}}}(),function(){o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}}(),function(){o.p="/rdv/"}(),function(){var e={143:0};o.f.j=function(t,n){var l=o.o(e,t)?e[t]:void 0;if(0!==l)if(l)n.push(l[2]);else{var r=new Promise((function(o,n){l=e[t]=[o,n]}));n.push(l[2]=r);var a=o.p+o.u(t),i=new Error,u=function(n){if(o.o(e,t)&&(l=e[t],0!==l&&(e[t]=void 0),l)){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;i.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",i.name="ChunkLoadError",i.type=r,i.request=a,l[1](i)}};o.l(a,u,"chunk-"+t,t)}},o.O.j=function(t){return 0===e[t]};var t=function(t,n){var l,r,a=n[0],i=n[1],u=n[2],s=0;if(a.some((function(t){return 0!==e[t]}))){for(l in i)o.o(i,l)&&(o.m[l]=i[l]);if(u)var c=u(o)}for(t&&t(n);s<a.length;s++)r=a[s],o.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return o.O(c)},n=self["webpackChunkrdv"]=self["webpackChunkrdv"]||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}();var n=o.O(void 0,[998],(function(){return o(4877)}));n=o.O(n)})();
//# sourceMappingURL=app.013efb01.js.map