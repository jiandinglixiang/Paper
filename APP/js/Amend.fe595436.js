(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["Amend","chunk-3d7296d5"],{"3c35":function(t,e){(function(e){t.exports=e}).call(this,{})},4694:function(t,e,i){"use strict";i.r(e);var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("nv-header",{attrs:{title:"资料修改"}}),i("mt-cell",{attrs:{title:"头像"}},[i("input",{ref:"input",staticClass:"mint-field-core",attrs:{type:"file",accept:"image/*"},on:{change:t.imgSubmit}}),t.info.portrait?i("img",{attrs:{src:t.info.portrait,height:"45px",width:"45px"}}):t._e()]),i("mt-field",{attrs:{type:"text",label:"昵称",placeholder:t.info.name?t.info.name:"请输入昵称"},model:{value:t.modifiedAmend.name,callback:function(e){t.$set(t.modifiedAmend,"name",e)},expression:"modifiedAmend.name"}}),i("mt-field",{attrs:{type:"number",label:"身份证号码",placeholder:t.info.identity?t.info.identity:"身份证号码"},model:{value:t.modifiedAmend.identity,callback:function(e){t.$set(t.modifiedAmend,"identity",e)},expression:"modifiedAmend.identity"}}),i("mt-field",{attrs:{type:"textarea",rows:"4",label:"收货地址",placeholder:t.info.location?t.info.location:"请输入收货地址"},model:{value:t.modifiedAmend.location,callback:function(e){t.$set(t.modifiedAmend,"location",e)},expression:"modifiedAmend.location"}}),i("mt-field",{attrs:{type:"password",label:"密码",placeholder:"不修改则不填"},model:{value:t.modifiedAmend.password,callback:function(e){t.$set(t.modifiedAmend,"password",e)},expression:"modifiedAmend.password"}}),t.modifiedAmend.password?i("mt-field",{attrs:{type:"password",label:"密码",placeholder:"再次输入密码"},model:{value:t.modifiedAmend.password2,callback:function(e){t.$set(t.modifiedAmend,"password2",e)},expression:"modifiedAmend.password2"}}):t._e(),i("div",{staticClass:"Amend-button"},[i("p",{staticStyle:{color:"red"}},[t._v("注:不填则不修改")]),i("mt-button",{attrs:{type:"danger",size:"large"},nativeOn:{click:function(e){return t.submit()}}},[t._v("修改提交")])],1)],1)},o=[],s=i("2f62"),n=i("2dee"),a=i("f9fa"),d=i("d5db"),f=i("7f34"),h=i("8237"),c=i.n(h);function u(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},r=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),r.forEach(function(e){l(t,e,i[e])})}return t}function l(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var A={name:"Amend",data:function(){return{modifiedAmend:{password:"",password2:"",portrait:"",name:"",location:"",identity:""}}},computed:u({},Object(s["c"])({info:function(t){return t.user.info}})),methods:u({},Object(s["b"])({getInfo:f["a"]}),{imgSubmit:function(t){var e=this;console.log(t),t.target.files[0]&&d["a"].post("/pushFile",{file:t.target.files[0]}).then(function(t){return t.data&&t.data[0]?e.submit(t.data[0]):(Object(a["a"])("头像上传错误"),null)})},verify:function(t){var e={};if(t&&(e.portrait=t),this.modifiedAmend.name){if(!n["b"].isName(this.modifiedAmend.name))return void Object(a["a"])("昵称输入错误");if(this.modifiedAmend.name===this.info.name)return void Object(a["a"])("昵称与当前一样");e.name=this.modifiedAmend.name}if(this.modifiedAmend.identity){if(!n["b"].identityValid(this.modifiedAmend.identity))return void Object(a["a"])("身份证输入错误");if(this.modifiedAmend.identity===this.info.identity)return void Object(a["a"])("身份证与当前一样");e.identity=c()(this.modifiedAmend.identity)}if(this.modifiedAmend.location){if(!n["b"].isName(this.modifiedAmend.location))return void Object(a["a"])("地址不能有特殊字符");if(this.modifiedAmend.location===this.info.location)return void Object(a["a"])("地址与当前一样");e.location=this.modifiedAmend.location}if(this.modifiedAmend.password){if(!n["b"].passwordValid(this.modifiedAmend.password))return void Object(a["a"])("密码输入错误");if(!n["b"].passwordValid(this.modifiedAmend.password2))return void Object(a["a"])("再次输入密码错误");if(this.modifiedAmend.password2!==this.modifiedAmend.password)return void Object(a["a"])("两次密码输入不一致");e.password=c()(this.modifiedAmend.password)}return e},submit:function(t){var e=this,i=this.verify(t);if(i){var r=Object.keys(i);r.length?d["a"].post("/modifiedAmend",i).then(function(t){e.$refs.input.value="",e.modifiedAmend={password:"",password2:"",portrait:"",name:"",location:"",identity:""},e.getInfo(),Object(a["a"])("修改成功")}):Object(a["a"])("没有修改内容")}}})},_=A,p=(i("bdf6"),i("2877")),m=Object(p["a"])(_,r,o,!1,null,"3b5e156b",null);e["default"]=m.exports},8237:function(module,exports,__webpack_require__){(function(process,global){var __WEBPACK_AMD_DEFINE_RESULT__;
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
/**
 * [js-md5]{@link https://github.com/emn178/js-md5}
 *
 * @namespace md5
 * @version 0.7.3
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2014-2017
 * @license MIT
 */
(function(){"use strict";var ERROR="input is invalid type",WINDOW="object"===typeof window,root=WINDOW?window:{};root.JS_MD5_NO_WINDOW&&(WINDOW=!1);var WEB_WORKER=!WINDOW&&"object"===typeof self,NODE_JS=!root.JS_MD5_NO_NODE_JS&&"object"===typeof process&&process.versions&&process.versions.node;NODE_JS?root=global:WEB_WORKER&&(root=self);var COMMON_JS=!root.JS_MD5_NO_COMMON_JS&&"object"===typeof module&&module.exports,AMD=__webpack_require__("3c35"),ARRAY_BUFFER=!root.JS_MD5_NO_ARRAY_BUFFER&&"undefined"!==typeof ArrayBuffer,HEX_CHARS="0123456789abcdef".split(""),EXTRA=[128,32768,8388608,-2147483648],SHIFT=[0,8,16,24],OUTPUT_TYPES=["hex","array","digest","buffer","arrayBuffer","base64"],BASE64_ENCODE_CHAR="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(""),blocks=[],buffer8;if(ARRAY_BUFFER){var buffer=new ArrayBuffer(68);buffer8=new Uint8Array(buffer),blocks=new Uint32Array(buffer)}!root.JS_MD5_NO_NODE_JS&&Array.isArray||(Array.isArray=function(t){return"[object Array]"===Object.prototype.toString.call(t)}),!ARRAY_BUFFER||!root.JS_MD5_NO_ARRAY_BUFFER_IS_VIEW&&ArrayBuffer.isView||(ArrayBuffer.isView=function(t){return"object"===typeof t&&t.buffer&&t.buffer.constructor===ArrayBuffer});var createOutputMethod=function(t){return function(e){return new Md5(!0).update(e)[t]()}},createMethod=function(){var t=createOutputMethod("hex");NODE_JS&&(t=nodeWrap(t)),t.create=function(){return new Md5},t.update=function(e){return t.create().update(e)};for(var e=0;e<OUTPUT_TYPES.length;++e){var i=OUTPUT_TYPES[e];t[i]=createOutputMethod(i)}return t},nodeWrap=function(method){var crypto=eval("require('crypto')"),Buffer=eval("require('buffer').Buffer"),nodeMethod=function(t){if("string"===typeof t)return crypto.createHash("md5").update(t,"utf8").digest("hex");if(null===t||void 0===t)throw ERROR;return t.constructor===ArrayBuffer&&(t=new Uint8Array(t)),Array.isArray(t)||ArrayBuffer.isView(t)||t.constructor===Buffer?crypto.createHash("md5").update(new Buffer(t)).digest("hex"):method(t)};return nodeMethod};function Md5(t){if(t)blocks[0]=blocks[16]=blocks[1]=blocks[2]=blocks[3]=blocks[4]=blocks[5]=blocks[6]=blocks[7]=blocks[8]=blocks[9]=blocks[10]=blocks[11]=blocks[12]=blocks[13]=blocks[14]=blocks[15]=0,this.blocks=blocks,this.buffer8=buffer8;else if(ARRAY_BUFFER){var e=new ArrayBuffer(68);this.buffer8=new Uint8Array(e),this.blocks=new Uint32Array(e)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=this.hBytes=0,this.finalized=this.hashed=!1,this.first=!0}Md5.prototype.update=function(t){if(!this.finalized){var e,i=typeof t;if("string"!==i){if("object"!==i)throw ERROR;if(null===t)throw ERROR;if(ARRAY_BUFFER&&t.constructor===ArrayBuffer)t=new Uint8Array(t);else if(!Array.isArray(t)&&(!ARRAY_BUFFER||!ArrayBuffer.isView(t)))throw ERROR;e=!0}var r,o,s=0,n=t.length,a=this.blocks,d=this.buffer8;while(s<n){if(this.hashed&&(this.hashed=!1,a[0]=a[16],a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),e)if(ARRAY_BUFFER)for(o=this.start;s<n&&o<64;++s)d[o++]=t[s];else for(o=this.start;s<n&&o<64;++s)a[o>>2]|=t[s]<<SHIFT[3&o++];else if(ARRAY_BUFFER)for(o=this.start;s<n&&o<64;++s)r=t.charCodeAt(s),r<128?d[o++]=r:r<2048?(d[o++]=192|r>>6,d[o++]=128|63&r):r<55296||r>=57344?(d[o++]=224|r>>12,d[o++]=128|r>>6&63,d[o++]=128|63&r):(r=65536+((1023&r)<<10|1023&t.charCodeAt(++s)),d[o++]=240|r>>18,d[o++]=128|r>>12&63,d[o++]=128|r>>6&63,d[o++]=128|63&r);else for(o=this.start;s<n&&o<64;++s)r=t.charCodeAt(s),r<128?a[o>>2]|=r<<SHIFT[3&o++]:r<2048?(a[o>>2]|=(192|r>>6)<<SHIFT[3&o++],a[o>>2]|=(128|63&r)<<SHIFT[3&o++]):r<55296||r>=57344?(a[o>>2]|=(224|r>>12)<<SHIFT[3&o++],a[o>>2]|=(128|r>>6&63)<<SHIFT[3&o++],a[o>>2]|=(128|63&r)<<SHIFT[3&o++]):(r=65536+((1023&r)<<10|1023&t.charCodeAt(++s)),a[o>>2]|=(240|r>>18)<<SHIFT[3&o++],a[o>>2]|=(128|r>>12&63)<<SHIFT[3&o++],a[o>>2]|=(128|r>>6&63)<<SHIFT[3&o++],a[o>>2]|=(128|63&r)<<SHIFT[3&o++]);this.lastByteIndex=o,this.bytes+=o-this.start,o>=64?(this.start=o-64,this.hash(),this.hashed=!0):this.start=o}return this.bytes>4294967295&&(this.hBytes+=this.bytes/4294967296<<0,this.bytes=this.bytes%4294967296),this}},Md5.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,e=this.lastByteIndex;t[e>>2]|=EXTRA[3&e],e>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,t[15]=this.hBytes<<3|this.bytes>>>29,this.hash()}},Md5.prototype.hash=function(){var t,e,i,r,o,s,n=this.blocks;this.first?(t=n[0]-680876937,t=(t<<7|t>>>25)-271733879<<0,r=(-1732584194^2004318071&t)+n[1]-117830708,r=(r<<12|r>>>20)+t<<0,i=(-271733879^r&(-271733879^t))+n[2]-1126478375,i=(i<<17|i>>>15)+r<<0,e=(t^i&(r^t))+n[3]-1316259209,e=(e<<22|e>>>10)+i<<0):(t=this.h0,e=this.h1,i=this.h2,r=this.h3,t+=(r^e&(i^r))+n[0]-680876936,t=(t<<7|t>>>25)+e<<0,r+=(i^t&(e^i))+n[1]-389564586,r=(r<<12|r>>>20)+t<<0,i+=(e^r&(t^e))+n[2]+606105819,i=(i<<17|i>>>15)+r<<0,e+=(t^i&(r^t))+n[3]-1044525330,e=(e<<22|e>>>10)+i<<0),t+=(r^e&(i^r))+n[4]-176418897,t=(t<<7|t>>>25)+e<<0,r+=(i^t&(e^i))+n[5]+1200080426,r=(r<<12|r>>>20)+t<<0,i+=(e^r&(t^e))+n[6]-1473231341,i=(i<<17|i>>>15)+r<<0,e+=(t^i&(r^t))+n[7]-45705983,e=(e<<22|e>>>10)+i<<0,t+=(r^e&(i^r))+n[8]+1770035416,t=(t<<7|t>>>25)+e<<0,r+=(i^t&(e^i))+n[9]-1958414417,r=(r<<12|r>>>20)+t<<0,i+=(e^r&(t^e))+n[10]-42063,i=(i<<17|i>>>15)+r<<0,e+=(t^i&(r^t))+n[11]-1990404162,e=(e<<22|e>>>10)+i<<0,t+=(r^e&(i^r))+n[12]+1804603682,t=(t<<7|t>>>25)+e<<0,r+=(i^t&(e^i))+n[13]-40341101,r=(r<<12|r>>>20)+t<<0,i+=(e^r&(t^e))+n[14]-1502002290,i=(i<<17|i>>>15)+r<<0,e+=(t^i&(r^t))+n[15]+1236535329,e=(e<<22|e>>>10)+i<<0,t+=(i^r&(e^i))+n[1]-165796510,t=(t<<5|t>>>27)+e<<0,r+=(e^i&(t^e))+n[6]-1069501632,r=(r<<9|r>>>23)+t<<0,i+=(t^e&(r^t))+n[11]+643717713,i=(i<<14|i>>>18)+r<<0,e+=(r^t&(i^r))+n[0]-373897302,e=(e<<20|e>>>12)+i<<0,t+=(i^r&(e^i))+n[5]-701558691,t=(t<<5|t>>>27)+e<<0,r+=(e^i&(t^e))+n[10]+38016083,r=(r<<9|r>>>23)+t<<0,i+=(t^e&(r^t))+n[15]-660478335,i=(i<<14|i>>>18)+r<<0,e+=(r^t&(i^r))+n[4]-405537848,e=(e<<20|e>>>12)+i<<0,t+=(i^r&(e^i))+n[9]+568446438,t=(t<<5|t>>>27)+e<<0,r+=(e^i&(t^e))+n[14]-1019803690,r=(r<<9|r>>>23)+t<<0,i+=(t^e&(r^t))+n[3]-187363961,i=(i<<14|i>>>18)+r<<0,e+=(r^t&(i^r))+n[8]+1163531501,e=(e<<20|e>>>12)+i<<0,t+=(i^r&(e^i))+n[13]-1444681467,t=(t<<5|t>>>27)+e<<0,r+=(e^i&(t^e))+n[2]-51403784,r=(r<<9|r>>>23)+t<<0,i+=(t^e&(r^t))+n[7]+1735328473,i=(i<<14|i>>>18)+r<<0,e+=(r^t&(i^r))+n[12]-1926607734,e=(e<<20|e>>>12)+i<<0,o=e^i,t+=(o^r)+n[5]-378558,t=(t<<4|t>>>28)+e<<0,r+=(o^t)+n[8]-2022574463,r=(r<<11|r>>>21)+t<<0,s=r^t,i+=(s^e)+n[11]+1839030562,i=(i<<16|i>>>16)+r<<0,e+=(s^i)+n[14]-35309556,e=(e<<23|e>>>9)+i<<0,o=e^i,t+=(o^r)+n[1]-1530992060,t=(t<<4|t>>>28)+e<<0,r+=(o^t)+n[4]+1272893353,r=(r<<11|r>>>21)+t<<0,s=r^t,i+=(s^e)+n[7]-155497632,i=(i<<16|i>>>16)+r<<0,e+=(s^i)+n[10]-1094730640,e=(e<<23|e>>>9)+i<<0,o=e^i,t+=(o^r)+n[13]+681279174,t=(t<<4|t>>>28)+e<<0,r+=(o^t)+n[0]-358537222,r=(r<<11|r>>>21)+t<<0,s=r^t,i+=(s^e)+n[3]-722521979,i=(i<<16|i>>>16)+r<<0,e+=(s^i)+n[6]+76029189,e=(e<<23|e>>>9)+i<<0,o=e^i,t+=(o^r)+n[9]-640364487,t=(t<<4|t>>>28)+e<<0,r+=(o^t)+n[12]-421815835,r=(r<<11|r>>>21)+t<<0,s=r^t,i+=(s^e)+n[15]+530742520,i=(i<<16|i>>>16)+r<<0,e+=(s^i)+n[2]-995338651,e=(e<<23|e>>>9)+i<<0,t+=(i^(e|~r))+n[0]-198630844,t=(t<<6|t>>>26)+e<<0,r+=(e^(t|~i))+n[7]+1126891415,r=(r<<10|r>>>22)+t<<0,i+=(t^(r|~e))+n[14]-1416354905,i=(i<<15|i>>>17)+r<<0,e+=(r^(i|~t))+n[5]-57434055,e=(e<<21|e>>>11)+i<<0,t+=(i^(e|~r))+n[12]+1700485571,t=(t<<6|t>>>26)+e<<0,r+=(e^(t|~i))+n[3]-1894986606,r=(r<<10|r>>>22)+t<<0,i+=(t^(r|~e))+n[10]-1051523,i=(i<<15|i>>>17)+r<<0,e+=(r^(i|~t))+n[1]-2054922799,e=(e<<21|e>>>11)+i<<0,t+=(i^(e|~r))+n[8]+1873313359,t=(t<<6|t>>>26)+e<<0,r+=(e^(t|~i))+n[15]-30611744,r=(r<<10|r>>>22)+t<<0,i+=(t^(r|~e))+n[6]-1560198380,i=(i<<15|i>>>17)+r<<0,e+=(r^(i|~t))+n[13]+1309151649,e=(e<<21|e>>>11)+i<<0,t+=(i^(e|~r))+n[4]-145523070,t=(t<<6|t>>>26)+e<<0,r+=(e^(t|~i))+n[11]-1120210379,r=(r<<10|r>>>22)+t<<0,i+=(t^(r|~e))+n[2]+718787259,i=(i<<15|i>>>17)+r<<0,e+=(r^(i|~t))+n[9]-343485551,e=(e<<21|e>>>11)+i<<0,this.first?(this.h0=t+1732584193<<0,this.h1=e-271733879<<0,this.h2=i-1732584194<<0,this.h3=r+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+e<<0,this.h2=this.h2+i<<0,this.h3=this.h3+r<<0)},Md5.prototype.hex=function(){this.finalize();var t=this.h0,e=this.h1,i=this.h2,r=this.h3;return HEX_CHARS[t>>4&15]+HEX_CHARS[15&t]+HEX_CHARS[t>>12&15]+HEX_CHARS[t>>8&15]+HEX_CHARS[t>>20&15]+HEX_CHARS[t>>16&15]+HEX_CHARS[t>>28&15]+HEX_CHARS[t>>24&15]+HEX_CHARS[e>>4&15]+HEX_CHARS[15&e]+HEX_CHARS[e>>12&15]+HEX_CHARS[e>>8&15]+HEX_CHARS[e>>20&15]+HEX_CHARS[e>>16&15]+HEX_CHARS[e>>28&15]+HEX_CHARS[e>>24&15]+HEX_CHARS[i>>4&15]+HEX_CHARS[15&i]+HEX_CHARS[i>>12&15]+HEX_CHARS[i>>8&15]+HEX_CHARS[i>>20&15]+HEX_CHARS[i>>16&15]+HEX_CHARS[i>>28&15]+HEX_CHARS[i>>24&15]+HEX_CHARS[r>>4&15]+HEX_CHARS[15&r]+HEX_CHARS[r>>12&15]+HEX_CHARS[r>>8&15]+HEX_CHARS[r>>20&15]+HEX_CHARS[r>>16&15]+HEX_CHARS[r>>28&15]+HEX_CHARS[r>>24&15]},Md5.prototype.toString=Md5.prototype.hex,Md5.prototype.digest=function(){this.finalize();var t=this.h0,e=this.h1,i=this.h2,r=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255]},Md5.prototype.array=Md5.prototype.digest,Md5.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),e=new Uint32Array(t);return e[0]=this.h0,e[1]=this.h1,e[2]=this.h2,e[3]=this.h3,t},Md5.prototype.buffer=Md5.prototype.arrayBuffer,Md5.prototype.base64=function(){for(var t,e,i,r="",o=this.array(),s=0;s<15;)t=o[s++],e=o[s++],i=o[s++],r+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[63&(t<<4|e>>>4)]+BASE64_ENCODE_CHAR[63&(e<<2|i>>>6)]+BASE64_ENCODE_CHAR[63&i];return t=o[s],r+=BASE64_ENCODE_CHAR[t>>>2]+BASE64_ENCODE_CHAR[t<<4&63]+"==",r};var exports=createMethod();COMMON_JS?module.exports=exports:(root.md5=exports,AMD&&(__WEBPACK_AMD_DEFINE_RESULT__=function(){return exports}.call(exports,__webpack_require__,exports,module),void 0===__WEBPACK_AMD_DEFINE_RESULT__||(module.exports=__WEBPACK_AMD_DEFINE_RESULT__)))})()}).call(this,__webpack_require__("4362"),__webpack_require__("c8ba"))},bdf6:function(t,e,i){"use strict";var r=i("cc30"),o=i.n(r);o.a},cc30:function(t,e,i){}}]);
//# sourceMappingURL=Amend.fe595436.js.map