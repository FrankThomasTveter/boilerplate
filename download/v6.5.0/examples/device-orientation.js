(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{254:function(e,n,t){"use strict";t.r(n);var a=t(3),r=t(9),o=t(5),i=t(2),c=t(13),w=new i.a({center:[0,0],zoom:2});new a.a({layers:[new o.a({source:new r.b})],target:"map",view:w});function d(e){return document.getElementById(e)}var s=new GyroNorm;s.init().then((function(){s.start((function(e){var n=w.getCenter(),t=w.getResolution(),a=Object(c.j)(e.do.alpha),r=Object(c.j)(e.do.beta),o=Object(c.j)(e.do.gamma);d("alpha").innerText=a+" [rad]",d("beta").innerText=r+" [rad]",d("gamma").innerText=o+" [rad]",n[0]-=t*o*25,n[1]+=t*r*25,w.setCenter(n)}))}))}},[[254,0]]]);
//# sourceMappingURL=device-orientation.js.map