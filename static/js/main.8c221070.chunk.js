(this["webpackJsonpsafe-simulator-sapp"]=this["webpackJsonpsafe-simulator-sapp"]||[]).push([[0],{1043:function(e,t){},1050:function(e,t){},1054:function(e,t){},1106:function(e,t){},1186:function(e,t){},1192:function(e,t){},1200:function(e,t){},1202:function(e,t){},1278:function(e,t){},1280:function(e,t){},1288:function(e,t){},1290:function(e,t){},1448:function(e,t){},1519:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(137),s=n.n(c),i=(n(708),n(709),n(46)),o=n(19),u=n(5),j=n.n(u),l=n(680),d=n.n(l),b=n(683),f=new d.a,x=function(e,t){return new Promise((function(n){return setTimeout((function(){return n(t)}),e)}))},h=function(){var e=Object(i.a)(j.a.mark((function e(){var t;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.any([f.safe.getInfo(),x(1e3,!1)]);case 2:return t=e.sent,e.abrupt("return",!1!==t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),O=function(){return f.safe.getInfo()},p=function(){var e=Object(i.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O();case 2:return e.abrupt("return",e.sent.chainId);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),g=function(e){return new b.SafeAppProvider({safeAddress:"",chainId:parseInt(e),threshold:0,owners:[]},f)},v=n(54),m=function(){return window.ethereum},w=void 0,S=function(){var e=Object(i.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(w||(w=new v.ethers.providers.Web3Provider(m())),w).getNetwork();case 2:return e.abrupt("return",e.sent.chainId);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),k=n(34),T=n(684),y=n.n(T),C=n(685),F=n.n(C),E=n(69),A=n.n(E),H={db_path:"/",gasLimit:1e8,gasPrice:"0x0",vmErrorsOnRPCResponse:!1,logging:{quiet:!0,verbose:!1,debug:!1}},I=function(e){var t=H;t.db=y()(),t.fork=e;var n=F.a.provider(t),r=new E.GanacheCoreConnector(n);return{connector:r,simulator:new A.a(r)}},P=function(){var e=new E.CallHandler,t=new E.StorageHandler,n=[e,t];return{analyzer:new E.HandlerAnalyzer(n),callHandler:e,storageHandler:t}},D=function(){var e=Object(i.a)(j.a.mark((function e(t,n,r){var a,c,s,i,o,u,l,d,b,f;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log({safeTx:n}),a=r||I(t),c=new v.ethers.providers.Web3Provider(a.connector),s=new E.SafeInfoProvider(c),e.next=6,s.loadInfo(n.safe);case 6:return i=e.sent,o=P(),u=o.analyzer,l=o.callHandler,d=o.storageHandler,e.next=10,a.simulator.simulateMultiSigTransaction(i,n,u);case 10:return b=e.sent,e.next=13,c.getTransactionReceipt(b);case 13:return f=e.sent,e.abrupt("return",{simulationEnv:a,success:0!==f.status,logs:f.logs,callTree:l.roots,calls:l.calls,storageChanges:d.storageChanges,safeAddress:n.safe,safeInfo:i});case 15:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),R=n(220),G=n.n(R),L={1:"https://safe-transaction.mainnet.gnosis.io",4:"https://safe-transaction.rinkeby.gnosis.io",5:"https://safe-transaction.goerli.gnosis.io",10:"https://safe-transaction.optimism.gnosis.io",100:"https://safe-transaction.xdai.gnosis.io",137:"https://safe-transaction.polygon.gnosis.io",42161:"https://safe-transaction.arbitrum.gnosis.io",43114:"https://safe-transaction.avalanche.gnosis.io",1313161554:"https://safe-transaction.aurora.gnosis.io"},N=function(e){var t=L[e.toString()];if(!t)throw Error("No service available");return t},W=function(){var e=Object(i.a)(j.a.mark((function e(t,n){var r,a;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=N(t),e.next=3,G.a.get("".concat(r,"/api/v1/multisig-transactions/").concat(n,"/"));case 3:if(200===(a=e.sent).status){e.next=6;break}throw Error("Could not load details");case 6:return e.abrupt("return",a.data);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),B=n(225),z=n(1555),_=n(1568),J=n(1571),M=n(1572),V=n(2),q=function(e){var t=e.logs,n=Object(r.useState)([]),a=Object(o.a)(n,2),c=a[0],s=a[1];return Object(r.useEffect)((function(){Object(i.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Promise.all(t.map(function(){var e=Object(i.a)(j.a.mark((function e(t){var n,r;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.decodeLog)(t,E.loadEventSignatures);case 2:if(0!==(n=e.sent).length){e.next=5;break}return e.abrupt("return",{address:t.address,description:"Unknown event"});case 5:return r=n[0],e.abrupt("return",{address:t.address,description:r.signature,params:r.decoded.map((function(e){return e.toString()}))});case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()));case 2:n=e.sent,s(n);case 4:case"end":return e.stop()}}),e)})))()}),[t,s]),Object(V.jsxs)(z.a,{children:[0===c.length&&Object(V.jsx)("h4",{children:"No events have been emitted"}),c.map((function(e){var t;return Object(V.jsxs)(_.a,{children:[Object(V.jsx)(J.a,{children:e.description}),Object(V.jsxs)(M.a,{sx:{textAlign:"left"},children:["emitted by",Object(V.jsx)("br",{}),Object(V.jsx)("b",{children:e.address}),Object(V.jsx)("br",{}),Object(V.jsx)("br",{}),"Parameters:",Object(V.jsx)("br",{}),null===(t=e.params)||void 0===t?void 0:t.map((function(e){return Object(V.jsxs)(V.Fragment,{children:[e,Object(V.jsx)("br",{})]})}))]})]})}))]})},U=n(1573),K=function(){var e=Object(i.a)(j.a.mark((function e(t){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,Object(E.decodeFunctionData)(t,E.loadFunctionSignatures);case 3:if(0!==(n=e.sent).length){e.next=6;break}return e.abrupt("return",t);case 6:return e.abrupt("return",n[0].decoded.join(","));case 9:return e.prev=9,e.t0=e.catch(0),e.abrupt("return",t);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(t){return e.apply(this,arguments)}}(),Q=function(e){var t=e.label,n=e.call,a=e.children,c=Object(r.useState)(void 0),s=Object(o.a)(c,2),u=s[0],l=s[1];return Object(r.useEffect)((function(){try{Object(i.a)(j.a.mark((function e(){var t,r,a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(E.decodeFunctionData)(n.data,E.loadFunctionSignatures);case 2:if(0!==(t=e.sent).length){e.next=5;break}return e.abrupt("return",{description:n.data.slice(0,10),details:n});case 5:if(r=t[0],!n.returnData){e.next=12;break}return e.next=9,K(n.returnData);case 9:e.t0=e.sent,e.next=13;break;case 12:e.t0=void 0;case 13:a=e.t0,c={description:r.signature,details:n,returnData:a,params:r.decoded.map((function(e){return e.toString()}))},l(c);case 16:case"end":return e.stop()}}),e)})))()}catch(e){console.error(e)}}),[n,l]),u?Object(V.jsxs)(_.a,{children:[Object(V.jsxs)(J.a,{children:[t&&Object(V.jsxs)(V.Fragment,{children:[t," - "]}),u.description]}),Object(V.jsxs)(M.a,{children:["To: ",u.details.to,Object(V.jsx)("br",{}),Object(V.jsx)("br",{}),"Value: ",v.ethers.utils.formatEther(u.details.value),Object(V.jsx)("br",{}),Object(V.jsx)("br",{}),u.params&&Object(V.jsxs)(V.Fragment,{children:["Parameters:",Object(V.jsx)("br",{}),u.params.map((function(e){return Object(V.jsxs)(U.a,{sx:{width:"100%",textAlign:"start",wordWrap:"break-word"},children:[e,Object(V.jsx)("br",{})]})}))]}),Object(V.jsx)("br",{}),"Raw data:",Object(V.jsx)("br",{}),Object(V.jsx)(U.a,{sx:{width:"100%",textAlign:"start",wordWrap:"break-word"},children:u.details.data}),Object(V.jsx)("br",{}),u.returnData&&Object(V.jsxs)(V.Fragment,{children:["Return data:",Object(V.jsx)("br",{}),Object(V.jsx)(U.a,{sx:{width:"100%",textAlign:"start",wordWrap:"break-word"},children:u.returnData}),Object(V.jsx)("br",{})]}),a]})]}):Object(V.jsx)(V.Fragment,{})},X=function(e){var t=e.calls;return Object(V.jsx)(z.a,{children:t.map((function(e){return Object(V.jsx)(Q,{call:e})}))})},Y=n(1566),Z=function(e){var t=e.changes,n=e.decode,c=Object(r.useState)([]),s=Object(o.a)(c,2),i=s[0],u=s[1];return Object(r.useEffect)((function(){var e=[],r={};try{t.forEach((function(t){var a=!1===n?t:Object(E.decodeSafeStorageChange)(t);if(r[a.slot]){var c,s=r[a.slot];s.history.push(s.value),s.value=(null===(c=a.valueDecoded)||void 0===c?void 0:c.toString())||a.value}else{var i;e.push(a.slot),r[a.slot]={description:a.slotName||a.slot,value:(null===(i=a.valueDecoded)||void 0===i?void 0:i.toString())||a.value,history:[]}}}))}catch(a){console.error(a)}u(e.map((function(e){return r[e]})))}),[t,u]),Object(V.jsx)(z.a,{children:i.map((function(e){return Object(V.jsxs)(_.a,{children:[Object(V.jsx)(J.a,{children:e.description}),Object(V.jsxs)(M.a,{children:["New value ",e.history.length>0&&Object(V.jsx)(Y.a,{title:Object(V.jsx)(a.a.Fragment,{children:e.history.map((function(e){return Object(V.jsxs)(V.Fragment,{children:[e,Object(V.jsx)("br",{})]})}))}),children:Object(V.jsxs)("i",{children:["(",e.history.length," more changes)"]})}),":",Object(V.jsx)("br",{}),Object(V.jsx)("b",{children:e.value})]})]})}))})},$=function e(t){var n=t.tree;return 0===n.length?Object(V.jsx)(V.Fragment,{}):Object(V.jsx)(z.a,{children:n.map((function(t){return Object(V.jsx)(Q,{label:t.type,call:t.params,children:Object(V.jsx)(e,{tree:t.children})})}))})},ee=function(e){var t,n=e.results,r=n.calls.get(n.safeAddress),a=[],c=Object(B.a)(n.calls);try{for(c.s();!(t=c.n()).done;){var s=Object(o.a)(t.value,2),i=s[0],u=s[1];i!==n.safeAddress&&a.push({target:i,calls:u})}}catch(O){c.e(O)}finally{c.f()}var j,l=n.storageChanges.get(n.safeAddress),d=[],b=Object(B.a)(n.storageChanges);try{for(b.s();!(j=b.n()).done;){var f=Object(o.a)(j.value,2),x=f[0],h=f[1];x!==n.safeAddress&&d.push({target:x,changes:h})}}catch(O){b.e(O)}finally{b.f()}return Object(V.jsxs)(V.Fragment,{children:[Object(V.jsxs)(z.a,{sx:{paddingTop:"8px"},children:[Object(V.jsx)("h3",{children:"Status:"}),n.success?Object(V.jsx)(U.a,{sx:{color:"green"},children:"Success"}):Object(V.jsx)(U.a,{sx:{color:"red"},children:"Failure"})]}),r&&Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(z.a,{sx:{paddingTop:"8px"},children:Object(V.jsx)("h3",{children:"Calls from target Safe"})}),Object(V.jsx)(X,{calls:r})]}),l&&Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(z.a,{sx:{paddingTop:"8px"},children:Object(V.jsx)("h3",{children:"Storage Changes on target Safe"})}),Object(V.jsx)(Z,{changes:l})]}),Object(V.jsx)(z.a,{sx:{paddingTop:"8px"},children:Object(V.jsx)("h3",{children:"Logs"})}),Object(V.jsx)(q,{logs:n.logs}),Object(V.jsx)("h3",{children:"Advanced Information"}),Object(V.jsxs)(_.a,{children:[Object(V.jsx)(J.a,{children:"Click to show"}),Object(V.jsxs)(M.a,{children:[a.length>0&&Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(z.a,{sx:{paddingTop:"8px"},children:Object(V.jsx)("h3",{children:"Calls from other contracts"})}),a.map((function(e){return Object(V.jsxs)(_.a,{children:[Object(V.jsx)(J.a,{children:e.target}),Object(V.jsx)(M.a,{children:Object(V.jsx)(X,{calls:e.calls})})]})}))]}),Object(V.jsx)(z.a,{sx:{paddingTop:"8px"},children:Object(V.jsx)("h3",{children:"Call Tree"})}),Object(V.jsx)($,{tree:n.callTree}),d.length>0&&Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(z.a,{sx:{paddingTop:"8px"},children:Object(V.jsx)("h3",{children:"Storage Changes on other contracts"})}),d.map((function(e){return Object(V.jsxs)(_.a,{children:[Object(V.jsx)(J.a,{children:e.target}),Object(V.jsx)(M.a,{children:Object(V.jsx)(Z,{changes:e.changes,decode:!1})})]})}))]})]})]})]})},te=n(1563),ne=n(1569),re=function(e){var t=e.details,n=e.onSelected;return Object(V.jsxs)(_.a,{children:[Object(V.jsx)(J.a,{children:Object(V.jsxs)(te.a,{sx:{justifyContent:"space-between",flexDirection:"row",display:"flex",width:"100%",alignItems:"center"},children:[Object(V.jsxs)(U.a,{children:[t.nonce," - ",t.safeTxHash.slice(0,10),t.isExecuted&&" (Executed)"]}),n&&Object(V.jsx)(ne.a,{onClick:function(){return n(t.safeTxHash)},children:"Simulate"})]})}),Object(V.jsxs)(M.a,{children:["Hash: ",t.safeTxHash,Object(V.jsx)("br",{}),"To: ",t.to,Object(V.jsx)("br",{}),"Value: ",v.ethers.utils.formatEther(t.value),Object(V.jsx)("br",{}),"Data: ",Object(V.jsx)(U.a,{sx:{width:"100%",textAlign:"start",wordWrap:"break-word"},children:t.data}),"Operation: ",t.operation,Object(V.jsx)("br",{}),"Nonce: ",t.nonce,Object(V.jsx)("br",{}),"SafeTxGas: ",t.safeTxGas,Object(V.jsx)("br",{}),"BaseGas: ",t.baseGas,Object(V.jsx)("br",{}),"Gas Token: ",t.gasToken,Object(V.jsx)("br",{}),"Gas Price: ",t.gasPrice,Object(V.jsx)("br",{}),"Refund Receiver: ",t.refundReceiver,Object(V.jsx)("br",{}),"Gas Token: ",t.refundReceiver,Object(V.jsx)("br",{})]})]})},ae=n(1574),ce=function(e){var t=e.safeTxHash,n=e.connectedToSafe,a=Object(r.useState)(!1),c=Object(o.a)(a,2),s=c[0],u=c[1],l=Object(r.useState)(void 0),d=Object(o.a)(l,2),b=d[0],f=d[1],x=Object(r.useState)(void 0),h=Object(o.a)(x,2),O=h[0],v=h[1],w=Object(r.useCallback)(function(){var e=Object(i.a)(j.a.mark((function e(t){var r,a,c,s;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,u(!0),v(void 0),f(void 0),!n){e.next=10;break}return e.next=7,p();case 7:e.t0=e.sent,e.next=13;break;case 10:return e.next=12,S();case 12:e.t0=e.sent;case 13:return r=e.t0,a=n?g(r.toString()):m(),e.next=17,W(r.toString(),t);case 17:return c=e.sent,f(c),e.next=21,D(a,c);case 21:s=e.sent,v({target:c.safe,simulationResults:s}),e.next=28;break;case 25:e.prev=25,e.t1=e.catch(0),console.error(e.t1);case 28:return e.prev=28,u(!1),e.finish(28);case 31:case"end":return e.stop()}}),e,null,[[0,25,28,31]])})));return function(t){return e.apply(this,arguments)}}(),[n,O,v,u,f]);return Object(r.useEffect)((function(){w(t)}),[t]),Object(V.jsxs)(V.Fragment,{children:[b&&Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)("h3",{children:"Safe"}),null===b||void 0===b?void 0:b.safe,Object(V.jsx)("h3",{children:"Transaction"}),Object(V.jsx)(re,{details:b})]}),O&&Object(V.jsx)(ee,{results:O.simulationResults}),s&&Object(V.jsx)(ae.a,{sx:{marginTop:"24px"}})]})},se=function(e){var t=e.connectedToSafe,n=Object(k.g)(),r=Object(k.f)();return n.safeTxHash?Object(V.jsxs)(V.Fragment,{children:[Object(V.jsx)(ne.a,{onClick:function(){return r("/")},children:"< Back"}),Object(V.jsx)("br",{}),Object(V.jsx)(ce,{safeTxHash:n.safeTxHash,connectedToSafe:t})]}):(r("/"),Object(V.jsx)(V.Fragment,{}))},ie=n(1565),oe=function(){var e=Object(i.a)(j.a.mark((function e(t,n,r){var a,c;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=N(t),e.next=3,G.a.get(r||"".concat(a,"/api/v1/safes/").concat(n,"/multisig-transactions/?limit=20"));case 3:if(200===(c=e.sent).status){e.next=6;break}throw Error("Could not load details");case 6:return e.abrupt("return",c.data);case 7:case"end":return e.stop()}}),e)})));return function(t,n,r){return e.apply(this,arguments)}}(),ue=function(e){var t=e.safe,n=e.connectedToSafe,a=Object(k.f)(),c=Object(r.useState)(null),s=Object(o.a)(c,2),u=s[0],l=s[1],d=Object(r.useState)(!1),b=Object(o.a)(d,2),f=b[0],x=b[1],h=Object(r.useState)([]),O=Object(o.a)(h,2),g=O[0],m=O[1],w=Object(r.useCallback)(function(){var e=Object(i.a)(j.a.mark((function e(t,r,a){var c,s,i,o;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(x(!0),e.prev=1,a||m([]),!n){e.next=9;break}return e.next=6,p();case 6:e.t0=e.sent,e.next=12;break;case 9:return e.next=11,S();case 11:e.t0=e.sent;case 12:return c=e.t0,s=t.split(":"),i=v.ethers.utils.getAddress(s[s.length-1]),e.next=17,oe(c.toString(),i,r);case 17:o=e.sent,l(o.next),m(a?a.concat(o.results):o.results),e.next=25;break;case 22:e.prev=22,e.t1=e.catch(1),console.error(e.t1);case 25:return e.prev=25,x(!1),e.finish(25);case 28:case"end":return e.stop()}}),e,null,[[1,22,25,28]])})));return function(t,n,r){return e.apply(this,arguments)}}(),[n,m,l,x]);return Object(r.useEffect)((function(){w(t)}),[t,w]),Object(V.jsxs)(te.a,{children:[g.map((function(e){return Object(V.jsx)(re,{details:e,onSelected:function(e){return a("/"+e)}})})),!f&&u&&Object(V.jsx)(ne.a,{variant:"text",onClick:function(){return w(t,u,g)},children:"Load more"}),f&&Object(V.jsx)(ae.a,{sx:{marginTop:"24px"}})]})},je="SafeSimulator_Dashboard_LastSafe",le=function(e){var t=e.connectedToSafe,n=Object(r.useState)(localStorage.getItem(je)),a=Object(o.a)(n,2),c=a[0],s=a[1],u=Object(r.useState)(""),l=Object(o.a)(u,2),d=l[0],b=l[1],f=Object(k.f)();Object(r.useEffect)((function(){Object(i.a)(j.a.mark((function e(){var n;return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t){e.next=2;break}return e.abrupt("return");case 2:return e.next=4,O();case 4:n=e.sent,s(n.safeAddress);case 6:case"end":return e.stop()}}),e)})))()}),[t,s]);return Object(V.jsxs)(te.a,{children:[Object(V.jsxs)(te.a,{sx:{flexDirection:"row",display:"flex",alignItems:"center"},children:[!t&&Object(V.jsx)(ie.a,{label:"Safe",variant:"standard",value:c,onChange:function(e){return function(e){localStorage.setItem(je,e),s(e)}(e.target.value)},sx:{marginRight:"16px"}}),Object(V.jsx)(ie.a,{label:"SafeTx Hash",variant:"standard",value:d,onChange:function(e){return b(e.target.value)}}),Object(V.jsx)(ne.a,{onClick:function(){return f("/"+d)},children:"Simulate"})]}),c&&Object(V.jsx)(ue,{connectedToSafe:t,safe:c})]})};var de=function(){var e=function(){var e=Object(r.useState)(),t=Object(o.a)(e,2),n=t[0],a=t[1],c=Object(r.useCallback)(Object(i.a)(j.a.mark((function e(){return j.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.t0=a,e.next=3,h();case 3:e.t1=e.sent,(0,e.t0)(e.t1);case 5:case"end":return e.stop()}}),e)}))),[a]);return Object(r.useEffect)((function(){c()}),[c]),n}(),t=!!window.ethereum;return void 0===e?Object(V.jsx)(V.Fragment,{children:"Loading..."}):e||t?Object(V.jsx)("div",{className:"App",children:Object(V.jsxs)(k.c,{children:[Object(V.jsx)(k.a,{path:":safeTxHash",element:Object(V.jsx)(se,{connectedToSafe:e})}),Object(V.jsx)(k.a,{path:"*",element:Object(V.jsx)(le,{connectedToSafe:e})})]})}):Object(V.jsx)(V.Fragment,{children:"Only supported as Safe app or with injected provider"})},be=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,1576)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))},fe=n(178);s.a.render(Object(V.jsx)(a.a.StrictMode,{children:Object(V.jsx)(fe.a,{children:Object(V.jsx)(de,{})})}),document.getElementById("root")),be()},708:function(e,t,n){},709:function(e,t,n){},717:function(e,t){},769:function(e,t){},771:function(e,t){},783:function(e,t){},799:function(e,t){},801:function(e,t){},803:function(e,t){},812:function(e,t){},814:function(e,t){},935:function(e,t){},975:function(e,t){},977:function(e,t){},984:function(e,t){},985:function(e,t){}},[[1519,1,2]]]);
//# sourceMappingURL=main.8c221070.chunk.js.map