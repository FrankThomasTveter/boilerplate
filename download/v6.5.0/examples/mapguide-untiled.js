(window.webpackJsonp=window.webpackJsonp||[]).push([[97],{433:function(t,i,e){"use strict";e.r(i);var o=e(69),n=e(14),r=e(106),a=e(120),s=e(104),h=e(12),p=e(1);var u=function(t){function i(i){t.call(this,{imageSmoothing:i.imageSmoothing,projection:i.projection,resolutions:i.resolutions}),this.crossOrigin_=void 0!==i.crossOrigin?i.crossOrigin:null,this.displayDpi_=void 0!==i.displayDpi?i.displayDpi:96,this.params_=i.params||{},this.url_=i.url,this.imageLoadFunction_=void 0!==i.imageLoadFunction?i.imageLoadFunction:r.b,this.hidpi_=void 0===i.hidpi||i.hidpi,this.metersPerUnit_=void 0!==i.metersPerUnit?i.metersPerUnit:1,this.ratio_=void 0!==i.ratio?i.ratio:1,this.useOverlay_=void 0!==i.useOverlay&&i.useOverlay,this.image_=null,this.renderedRevision_=0}return t&&(i.__proto__=t),i.prototype=Object.create(t&&t.prototype),i.prototype.constructor=i,i.prototype.getParams=function(){return this.params_},i.prototype.getImageInternal=function(t,i,e,o){i=this.findNearestResolution(i),e=this.hidpi_?e:1;var r=this.image_;if(r&&this.renderedRevision_==this.getRevision()&&r.getResolution()==i&&r.getPixelRatio()==e&&Object(p.h)(r.getExtent(),t))return r;1!=this.ratio_&&(t=t.slice(),Object(p.K)(t,this.ratio_));var s=[Object(p.F)(t)/i*e,Object(p.B)(t)/i*e];if(void 0!==this.url_){var h=this.getUrl(this.url_,this.params_,t,s,o);(r=new a.a(t,i,e,h,this.crossOrigin_,this.imageLoadFunction_)).addEventListener(n.a.CHANGE,this.handleImageChange.bind(this))}else r=null;return this.image_=r,this.renderedRevision_=this.getRevision(),r},i.prototype.getImageLoadFunction=function(){return this.imageLoadFunction_},i.prototype.updateParams=function(t){Object(h.a)(this.params_,t),this.changed()},i.prototype.getUrl=function(t,i,e,o,n){var r=function(t,i,e,o){var n=Object(p.F)(t),r=Object(p.B)(t),a=i[0],s=i[1],h=.0254/o;return s*n>a*r?n*e/(a*h):r*e/(s*h)}(e,o,this.metersPerUnit_,this.displayDpi_),a=Object(p.y)(e),u={OPERATION:this.useOverlay_?"GETDYNAMICMAPOVERLAYIMAGE":"GETMAPIMAGE",VERSION:"2.0.0",LOCALE:"en",CLIENTAGENT:"ol/source/ImageMapGuide source",CLIP:"1",SETDISPLAYDPI:this.displayDpi_,SETDISPLAYWIDTH:Math.round(o[0]),SETDISPLAYHEIGHT:Math.round(o[1]),SETVIEWSCALE:r,SETVIEWCENTERX:a[0],SETVIEWCENTERY:a[1]};return Object(h.a)(u,i),Object(s.a)(t,u)},i.prototype.setImageLoadFunction=function(t){this.image_=null,this.imageLoadFunction_=t,this.changed()},i}(r.a),c=e(3),d=e(2);new c.a({layers:[new o.a({extent:[-87.86511444236592,43.66506556483793,-87.59539405949707,43.82385256443007],source:new u({projection:"EPSG:4326",url:"http://138.197.230.93:8008/mapguide/mapagent/mapagent.fcgi?",useOverlay:!1,metersPerUnit:111319.4908,params:{MAPDEFINITION:"Library://Samples/Sheboygan/Maps/Sheboygan.MapDefinition",FORMAT:"PNG",VERSION:"3.0.0",USERNAME:"OLGuest",PASSWORD:"olguest"},ratio:2})})],target:"map",view:new d.a({center:[-87.7302542509315,43.744459064634],projection:"EPSG:4326",zoom:12})})}},[[433,0]]]);
//# sourceMappingURL=mapguide-untiled.js.map