(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[0],{166:function(e,t,n){},167:function(e,t,n){e.exports=n.p+"static/media/Calculator.bb9998c1.png"},168:function(e,t,n){e.exports=n.p+"static/media/Chrome.44b3c5fc.png"},169:function(e,t,n){e.exports=n.p+"static/media/Drawing.336727e0.png"},170:function(e,t,n){e.exports=n.p+"static/media/Finder.e7ddfa6b.png"},171:function(e,t,n){e.exports=n.p+"static/media/Launchpad.dab98b41.png"},172:function(e,t,n){e.exports=n.p+"static/media/PrefApp.64914db7.png"},173:function(e,t,n){e.exports=n.p+"static/media/Terminal.148e3c64.png"},174:function(e,t,n){e.exports=n.p+"static/media/gougu.e314cff8.jpg"},175:function(e,t,n){e.exports=n.p+"static/media/wallpaper.f9f13a3a.jpg"},176:function(e,t,n){e.exports=n.p+"static/media/wallpaper_small.2863d56b.jpg"},177:function(e,t,n){},178:function(e,t,n){},179:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(7),r=n.n(i),o=(n(63),n(2)),l=n(12),s=function(e){var t=e.children,n=e.domEl,i=e.data,r=document.getElementById(i.id),s=document.getElementById(i.moveId),u=localStorage.getItem(i.id)||null,d=u?JSON.parse(u):{x:-1===i.width?0:(window.innerWidth-i.width)/2,y:-1===i.height?0:(window.innerHeight-i.height)/2},f=Object(a.useState)({isDragging:!1,origin:{x:0,y:0},position:d}),g=Object(o.a)(f,2),m=g[0],v=g[1],b=Object(a.useCallback)((function(e){var t=e.clientX,n=e.clientY;v((function(e){return Object(l.a)(Object(l.a)({},e),{},{isDragging:!0,origin:{x:t-e.position.x,y:n-e.position.y}})}))}),[]),p=Object(a.useCallback)((function(e){var t=e.clientX,n=e.clientY,a=e.target;if(m.isDragging&&(!s||a===s)){var c=t-m.origin.x,i=n-m.origin.y;c<=0?c=0:c>window.innerWidth-r.offsetWidth&&(c=window.innerWidth-r.offsetWidth),i<=0?i=0:i>window.innerHeight-r.offsetHeight&&(i=window.innerHeight-r.offsetHeight);var o={x:c,y:i};v((function(e){return Object(l.a)(Object(l.a)({},e),{},{position:o})}))}}),[m.isDragging,m.origin,s,r]),h=Object(a.useCallback)((function(){m.isDragging&&v((function(e){return Object(l.a)(Object(l.a)({},e),{},{isDragging:!1})}))}),[m.isDragging]);Object(a.useEffect)((function(){-1===i.width&&v({isDragging:!1,origin:{x:0,y:0},position:{x:0,y:0}})}),[i.width]),Object(a.useEffect)((function(){if(n)return n.addEventListener("mousemove",p),n.addEventListener("mouseup",h),function(){n.removeEventListener("mousemove",p),n.removeEventListener("mouseup",h),-1!==i.width&&localStorage.setItem(i.id,JSON.stringify(m.position))}}),[n,p,h,i.id,i.width,m.position]);var O=Object(a.useMemo)((function(){return{left:"".concat(m.position.x,"px"),top:i.isShow?"".concat(m.position.y,"px"):"-2000px",zIndex:m.isDragging?2:1,position:"absolute"}}),[m.isDragging,m.position,i.isShow]);return c.a.createElement("div",{id:i.id,style:O,onMouseDown:b},t)},u=c.a.memo((function(e){var t=e.children,n=e.data,a=document.getElementById("main-view");return a?r.a.createPortal(c.a.createElement(s,{domEl:a,data:n},t),a):null})),d=n(17),f=n(56),g=n.n(f),m=(n(166),document.createElement("script"));m.src="//at.alicdn.com/t/font_1919988_ame0oy3sn99.js",document.body.appendChild(m);var v=function(e){var t=e.className,n=e.type,a=e.style,i=e.svgRef,r=e.clickEvent;return c.a.createElement("svg",{ref:i,className:t?"icon-font "+t:"icon-font","aria-hidden":"true",style:a,onClick:r},c.a.createElement("use",{xlinkHref:"#".concat(n)}))},b=n(181),p=(n(55),function(){var e=Object(a.useState)([]),t=Object(o.a)(e,2),i=t[0],r=t[1],l=Object(a.useRef)(null),s=Object(a.useCallback)((function(){if(l.current){var e=l.current.getContext("2d");if(e){var t=new Image;t.src=i[i.length-1],console.log(t),t.addEventListener("load",(function(){e.drawImage(t,0,0)}))}}}),[i]),u=function(e){var t=e.width,s=e.height,u=Object(a.useState)(!1),f=Object(o.a)(u,2),m=f[0],p=f[1],h=Object(a.useState)(void 0),O=Object(o.a)(h,2),j=O[0],w=O[1],E=Object(a.useState)(["pen","eraser"]),k=Object(o.a)(E,1)[0],y=Object(a.useState)(!1),C=Object(o.a)(y,2),x=C[0],D=C[1],L=Object(a.useCallback)((function(e){var t=Object(o.a)(e,2),n=(t[0],t[1]);D("eraser"===n)}),[]),S=Object(a.useState)(!0),N=Object(o.a)(S,2),R=N[0],I=N[1],P=Object(a.useState)(5),M=Object(o.a)(P,2),H=M[0],_=M[1],T=Object(a.useState)("black"),W=Object(o.a)(T,2),z=W[0],F=W[1],B=Object(a.useState)(["black","red","yellow","blue"]),Y=Object(o.a)(B,1)[0],A=Object(a.useRef)(null),J=Object(a.useRef)(null),U=Object(a.useState)(-1),X=Object(o.a)(U,2),q=X[0],V=X[1],$=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),i=t[0],r=t[1];return{openDialog:function(){return r(!0)},closeDialog:function(){return r(!1)},RenderDialog:function(e){var t=e.width,r=e.height,o=e.id,l=e.title,s=e.message,u=e.imgSrc,f=e.onCheck,g=e.onClose,m=Object(a.useMemo)((function(){return{width:t,height:r,display:"fixed",left:"calc(50vw - ".concat(t/2,"px)"),top:"calc(50vh - ".concat(r,"px)"),zIndex:2e3,borderRadius:4}}),[t,r]);return c.a.createElement(c.a.Fragment,null,i&&c.a.createElement("div",{id:o,style:m},c.a.createElement(d.Dialog,{title:l,message:s,icon:function(){if(u)return c.a.createElement("img",{src:n(54)("./"+u),width:"52",height:"52",alt:"tip"})}(),buttons:[c.a.createElement(d.Button,{onClick:g},"\u53d6\u6d88"),c.a.createElement(d.Button,{color:"blue",onClick:f},"\u786e\u8ba4")]})))}}}(),G=$.openDialog,K=$.closeDialog,Q=$.RenderDialog,Z=Object(a.useState)(!1),ee=Object(o.a)(Z,2),te=ee[0],ne=ee[1];Object(a.useEffect)(te?G:K,[te]);var ae=Object(a.useCallback)((function(){ne(!1)}),[]),ce=Object(a.useCallback)((function(e,t){var n="top"===t?e.offsetTop:e.offsetLeft;return null===e.offsetParent?n:n+ce(e.offsetParent,t)}),[]),ie=Object(a.useCallback)((function(e){if(l.current){var t=l.current;return{x:e.pageX-ce(t,"left"),y:e.pageY-ce(t,"top")}}}),[ce]),re=function(e,t){if(l.current){var n=l.current.getContext("2d");n&&(n.strokeStyle=z,n.lineJoin="round",n.lineWidth=H,n.beginPath(),n.moveTo(e.x,e.y),n.lineTo(t.x,t.y),n.closePath(),n.stroke())}},oe=Object(a.useCallback)((function(e,t,n,a,c){var i=n-c,r=Math.sqrt(n*n-i*i),o=e-i,l=t-r,s=2*i,u=2*r;c<=n&&(a.clearRect(o,l,s,u),oe(e,t,n,a,c+=1))}),[]),le=Object(a.useCallback)((function(e){var t=e.x,n=e.y,a=e.width,c=e.height;if(l.current){var i=l.current.getContext("2d");i&&i.clearRect(t,n,a,c)}}),[]),se=Object(a.useCallback)((function(e){var t=e.x,n=e.y,a=e.r;if(l.current){var c=l.current.getContext("2d");if(c){oe(t,n,a,c,1)}}}),[oe]),ue=Object(a.useCallback)((function(e){var t=ie(e);t&&(p(!0),w(t))}),[]),de=Object(a.useCallback)((function(e){if(m){var t=ie(e);if(j&&t)if(x){var n=Number(H/2);se({x:t.x,y:t.y,r:n})}else re(j,t),w(t)}}),[m,x,j,H,re,se]),fe=Object(a.useCallback)((function(){if(V(q+1),l.current){var e=l.current;if(i.push(e.toDataURL()),r(i),A.current&&J.current){var t=A.current,n=J.current;t.classList.add("active"),n.classList.remove("active")}}}),[q,i]),ge=Object(a.useCallback)((function(){p(!1),w(void 0),fe()}),[fe]),me=Object(a.useCallback)((function(){p(!1),w(void 0)}),[]);Object(a.useEffect)((function(){if(l.current){var e=l.current;return e.addEventListener("mousedown",ue),e.addEventListener("mousemove",de),e.addEventListener("mouseup",ge),e.addEventListener("mouseleave",me),function(){e.removeEventListener("mousedown",ue),e.removeEventListener("mousemove",de),e.removeEventListener("mouseup",ge),e.removeEventListener("mouseleave",me)}}}),[ue,de,ge,me]);var ve=Object(a.useCallback)((function(){I(!R),console.log(R)}),[R]),be=Object(a.useCallback)((function(e){_(e.target.value)}),[]),pe=Object(a.useCallback)((function(e,t,n){F(n)}),[]),he=Object(a.useCallback)((function(e){F(e.target.value)}),[]),Oe=Object(a.useCallback)((function(){if(l.current){var e=l.current,n=e.getContext("2d");if(n){var a=n.globalCompositeOperation;n.globalCompositeOperation="destination-over",n.fillStyle="#fff",n.fillRect(0,0,t,s);var c=e.toDataURL("image/png");n.putImageData(n.getImageData(0,0,t,s),0,0),n.globalCompositeOperation=a;var i=document.createElement("a");document.body.appendChild(i),i.href=c;var r=g()().format("YYYY-MM-DD HHmmss");i.download="myPaint "+r,i.target="_blank",console.log("myPainting "+r),i.click()}}}),[t,s]),je=Object(a.useCallback)((function(e){if(l.current&&A.current&&J.current){var n=l.current.getContext("2d"),a=A.current,c=J.current;if(n){var r=-1;if("back"===e&&q>=0)r=q-1,c.classList.add("active"),r<0&&a.classList.remove("active");else{if(!("next"===e&&q<i.length-1))return;r=q+1,a.classList.add("active"),r===i.length-1&&c.classList.remove("active")}n.clearRect(0,0,t,s);var o=new Image;o.src=i[r],o.addEventListener("load",(function(){n.drawImage(o,0,0)})),V(r)}}}),[s,t,q,i]),we=Object(a.useCallback)((function(e){if(le({x:0,y:0,width:t,height:s}),r([]),V(-1),ae(),A.current&&J.current){var n=A.current,a=J.current;n.classList.remove("active"),a.classList.remove("active")}}),[ae,le,t,s]),Ee=Object(a.useCallback)((function(e,t){switch(t){case"delete":ne(!0);break;case"save":Oe();break;case"turn_back":je("back");break;case"turn_next":je("next")}}),[we,Oe,je]);return c.a.createElement(c.a.Fragment,null,c.a.createElement("canvas",{ref:l,height:s,width:t}),c.a.createElement("div",{id:"toolbox-open",style:{borderRadius:R?null:5}},c.a.createElement(v,{type:R?"icon-turn_down":"icon-turn_up",style:{width:"100%",fontSize:32},clickEvent:ve})),c.a.createElement(b.a,{in:R,timeout:300,classNames:"toolbox",unmountOnExit:!0},c.a.createElement("div",{id:"toolbox"},c.a.createElement("span",null,"Options"),c.a.createElement("div",{className:"options"},["save","delete","turn_back","turn_next"].map((function(e,t){return c.a.createElement(v,{svgRef:"turn_back"===e?A:"turn_next"===e?J:void 0,key:t+e,type:"icon-"+e,className:e,style:{fontSize:50},clickEvent:function(t){return Ee(t,e)}})}))),c.a.createElement("span",null,"Toolbox"),c.a.createElement("div",{className:"tools"},k.map((function(e,t){return c.a.createElement(v,{key:t+e,className:"eraser"===e?x?"active":"":x?"":"active",type:"icon-"+e,style:{fontSize:50},clickEvent:function(t){return L([t,e])}})}))),c.a.createElement("div",{className:"sizes"},c.a.createElement("input",{style:{backgroundColor:x?"#ebeff4":z},type:"range",id:"range",name:"range",min:"1",max:"20",value:H,onChange:be})),c.a.createElement("ol",{className:"colors"},Y.map((function(e,t){return c.a.createElement("li",{key:t+e,className:e===z?e+" active":e,onClick:function(t){return pe(t,"li",e)}})})),c.a.createElement("input",{type:"color",value:z,onChange:he,id:"currentColor"})))),c.a.createElement(Q,{width:300,height:120,id:"clear-dialog",title:"\u60a8\u786e\u5b9a\u8981\u6e05\u7a7a\u8be5\u753b\u5e03\u5417\uff1f",message:"\u4e00\u65e6\u6e05\u7a7a\u5c06\u65e0\u6cd5\u64a4\u56de\u3002",imgSrc:"Drawing.png",onCheck:we,onClose:ae}))};return u.defaultProps={width:window.innerWidth,height:window.innerHeight},{Canvas:u,canvasHistory:i,setCanvasHistory:r,loadPic:s}}),h=function(){var e=function(){var e=Object(a.useState)(!1),t=Object(o.a)(e,2),n=t[0],i=t[1],r=function(){i(!1),console.log("closeDrawing")};return{open:function(){i(!0),console.log("openDrawing")},close:r,RenderModal:function(e){var t=e.children,a=e.data;return c.a.createElement(c.a.Fragment,null,n&&c.a.createElement(u,{data:a,closeModal:r},t))}}}(),t=e.open,n=e.close,i=e.RenderModal,r=p(),s=r.Canvas,f=r.canvasHistory,g=r.setCanvasHistory,m=r.loadPic;return{Drawing:function(){var e=Object(a.useContext)(O),r=Object(o.a)(e,4),u=r[0],v=r[1],b=r[2],p=r[3],h=Object(a.useState)({width:1200,height:800}),j=Object(o.a)(h,2),w=j[0],E=j[1],k=Object(a.useState)(!1),y=Object(o.a)(k,2),C=y[0],x=y[1];Object(a.useEffect)(u.type?t:n,[u]);var D=Object(a.useCallback)((function(){E(C?{width:1200,height:800}:{width:-1,height:-1}),x(!C)}),[C]);return c.a.createElement(i,{data:{width:w.width,height:w.height,id:"DrawingView",moveId:"DrawingMove",isShow:b}},c.a.createElement("div",{className:"drawing-wrapper"},c.a.createElement(d.TitleBar,{controls:!0,id:"DrawingMove",isFullscreen:C,onCloseClick:function(){n(),v(Object(l.a)(Object(l.a)({},u),{},{type:!1})),g([])},onMinimizeClick:function(){p(!1),console.log("min"),console.log(f)},onMaximizeClick:function(){D(),console.log(f)},onResizeClick:function(){D(),setTimeout((function(){m()}),50)}}),c.a.createElement(s,{height:C?document.body.clientHeight-120:w.height,width:C?document.body.clientWidth:w.width})))},loadPic:m}},O=(n(177),Object(a.createContext)([])),j=function(){var e=h(),t=e.Drawing,i=e.loadPic,r=Object(a.useState)(76),l=Object(o.a)(r,1)[0],s=Object(a.useRef)(null),u=Object(a.useState)(["Finder.png","Launchpad.png","Chrome.png","PrefApp.png","Terminal.png","Calculator.png","Drawing.png"]),d=Object(o.a)(u,1)[0],f=Object(a.useState)(2),g=Object(o.a)(f,1)[0],m=Object(a.useState)({type:!1,index:6}),v=Object(o.a)(m,2),b=v[0],p=v[1],j=Object(a.useState)(!0),w=Object(o.a)(j,2),E=w[0],k=w[1],y=Object(a.useCallback)((function(e,t){var n="top"===t?e.offsetTop:e.offsetLeft;return null===e.offsetParent?n:n+y(e.offsetParent,t)}),[]),C=Object(a.useCallback)((function(){if(s.current){console.log("leave");for(var e=s.current.childNodes,t=0;t<e.length;t++){var n=e[t];n.style.width=n.style.height=l+"px"}}}),[l]),x=Object(a.useCallback)((function(e){var t=e.clientX,n=e.clientY;if(s.current)for(var a=s.current.childNodes,c=0;c<a.length;c++){var i=a[c],r=i.offsetLeft+i.offsetWidth/2-t,o=i.offsetTop+i.offsetHeight/2+y(s.current,"top")-n,u=1-Math.sqrt(r*r+o*o)/(a.length*l);u<.5&&(u=.5),i.style.width=i.style.height=l*g*u+"px"}}),[y,l,g]),D=Object(a.useCallback)((function(e,t){if(s.current)switch(e){case"Drawing.png":return b.type?(E||setTimeout((function(){i()}),50),void k(!E)):void p({type:!b.type,index:t})}}),[b,E]);return Object(a.useEffect)((function(){C()}),[C]),Object(a.useEffect)((function(){if(s.current){var e=s.current.childNodes;[b].forEach((function(t){if(t.index){var n=e[t.index];t.type?n.classList.add("active"):n.classList.remove("active")}}))}}),[b]),Object(a.useEffect)((function(){if(s.current){var e=s.current;return e.addEventListener("mousemove",x),e.addEventListener("mouseleave",C),function(){e.removeEventListener("mousemove",x),e.removeEventListener("mouseleave",C)}}}),[x,C]),c.a.createElement(c.a.Fragment,null,c.a.createElement(O.Provider,{value:[b,p,E,k]},c.a.createElement(t,null)),c.a.createElement("footer",{id:"AppFooter"},c.a.createElement("div",{ref:s,style:{height:l+10},id:"Docker"},d.map((function(e,t){return c.a.createElement("div",{className:6===t&&b.type?"DockItem active":"DockItem",style:{backgroundImage:"url("+n(54)("./"+e)+")",backgroundPosition:"center",backgroundSize:"cover",backgroundRepeat:"no-repeat"},key:t+e,onClick:function(){return D(e,t)}})})))))};n(178);var w=function(){return c.a.createElement("div",{className:"App"},c.a.createElement("div",{id:"main-view"}),c.a.createElement(j,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(w,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},54:function(e,t,n){var a={"./Calculator.png":167,"./Chrome.png":168,"./Drawing.png":169,"./Finder.png":170,"./Launchpad.png":171,"./PrefApp.png":172,"./Terminal.png":173,"./gougu.jpg":174,"./wallpaper.jpg":175,"./wallpaper_small.jpg":176};function c(e){var t=i(e);return n(t)}function i(e){if(!n.o(a,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return a[e]}c.keys=function(){return Object.keys(a)},c.resolve=i,e.exports=c,c.id=54},55:function(e,t,n){},58:function(e,t,n){e.exports=n(179)},63:function(e,t,n){}},[[58,1,2]]]);
//# sourceMappingURL=main.a08def72.chunk.js.map