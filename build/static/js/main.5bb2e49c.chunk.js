(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{112:function(e,n,t){e.exports=t(177)},175:function(e,n,t){},177:function(e,n,t){"use strict";t.r(n);var a=t(1),o=t.n(a),r=t(6),c=t.n(r),l=t(178),i=t(54),u=t(24);var m=function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Se connecter"))};var s=[{name:"Accueil",path:"/",exact:!0,component:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Bienvenue sur IUT Notes !"),o.a.createElement("p",null,"Page en cours de construction..."))},icon:"home"},{name:"Se connecter",path:"/login",component:m,icon:"login"},{name:"Se d\xe9connecter",path:"/logout",component:m,icon:"logout"},{name:"Mon compte",path:"/account",component:m,icon:"user"},{name:"Notes",path:"/notes",exact:!0,component:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Liste des notes"))},icon:"file-search"},{name:"Nouvelle note",path:"/notes/new",component:function(){return o.a.createElement("div",null,o.a.createElement("h1",null,"Cr\xe9er une note"))},icon:"form"}],p=t(75),h=t(179),d=t(39),f=t(76);function E(){var e=Object(p.a)(["\n  height: 32px;\n  color: #FFF;\n  margin: 16px;\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center;\n"]);return E=function(){return e},e}function v(){var e=Object(p.a)(["\n  @media (max-width: 992px) {\n    position: absolute !important;\n    min-height: 100vh !important;\n  }\n"]);return v=function(){return e},e}var g=Object(f.a)(l.a.Sider)(v()),x=f.a.h3(E());var w=Object(u.f)(function(e){var n=e.location,t=e.routes;return o.a.createElement(g,{breakpoint:"lg",collapsedWidth:"0"},o.a.createElement(x,null,"IUT Notes"),o.a.createElement(h.b,{theme:"dark",mode:"inline",style:{lineHeight:"64px"}},t.map(function(e){return o.a.createElement(h.b.Item,{key:e.path,className:n.pathname===e.path?"ant-menu-item-selected":""},o.a.createElement(i.b,{to:e.path},e.icon&&o.a.createElement(d.a,{type:e.icon}),o.a.createElement("span",null,e.name)))})))}),b=l.a.Footer,y=l.a.Content;var k=function(){return o.a.createElement(i.a,null,o.a.createElement(l.a,null,o.a.createElement(w,{routes:s}),o.a.createElement("div",{style:{minHeight:"100vh",display:"flex",flexDirection:"column"}},o.a.createElement(y,{style:{padding:"10px 50px",flexGrow:1}},o.a.createElement(u.c,null,s.map(function(e){return o.a.createElement(u.a,Object.assign({key:"route-".concat(e.path)},e))}))),o.a.createElement(b,{style:{textAlign:"center",flexShrink:1}},"Paul Laborderie - 2019"))))};t(175),t(176),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(o.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[112,1,2]]]);
//# sourceMappingURL=main.5bb2e49c.chunk.js.map