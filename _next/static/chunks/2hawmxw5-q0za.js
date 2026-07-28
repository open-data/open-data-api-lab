(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,61592,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"LoadableContext",{enumerable:!0,get:function(){return r}});let r=e.r(41705)._(e.r(91788)).default.createContext(null)},52414,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0}),Object.defineProperty(a,"default",{enumerable:!0,get:function(){return m}});let r=e.r(41705)._(e.r(91788)),l=e.r(61592),n=[],s=[],i=!1;function o(e){let t=e(),a={loading:!0,loaded:null,error:null};return a.promise=t.then(e=>(a.loading=!1,a.loaded=e,e)).catch(e=>{throw a.loading=!1,a.error=e,e}),a}class c{constructor(e,t){this._loadFn=e,this._opts=t,this._callbacks=new Set,this._delay=null,this._timeout=null,this.retry()}promise(){return this._res.promise}retry(){this._clearTimeouts(),this._res=this._loadFn(this._opts.loader),this._state={pastDelay:!1,timedOut:!1};let{_res:e,_opts:t}=this;e.loading&&("number"==typeof t.delay&&(0===t.delay?this._state.pastDelay=!0:this._delay=setTimeout(()=>{this._update({pastDelay:!0})},t.delay)),"number"==typeof t.timeout&&(this._timeout=setTimeout(()=>{this._update({timedOut:!0})},t.timeout))),this._res.promise.then(()=>{this._update({}),this._clearTimeouts()}).catch(e=>{this._update({}),this._clearTimeouts()}),this._update({})}_update(e){this._state={...this._state,error:this._res.error,loaded:this._res.loaded,loading:this._res.loading,...e},this._callbacks.forEach(e=>e())}_clearTimeouts(){clearTimeout(this._delay),clearTimeout(this._timeout)}getCurrentValue(){return this._state}subscribe(e){return this._callbacks.add(e),()=>{this._callbacks.delete(e)}}}function d(t){return function(t,a){let o=Object.assign({loader:null,loading:null,delay:200,timeout:null,webpack:null,modules:null},a),d=null;function u(){if(!d){let e=new c(t,o);d={getCurrentValue:e.getCurrentValue.bind(e),subscribe:e.subscribe.bind(e),retry:e.retry.bind(e),promise:e.promise.bind(e)}}return d.promise()}if("u"<typeof window&&n.push(u),!i&&"u">typeof window){let t=o.webpack&&"function"==typeof e.t.resolveWeak?o.webpack():o.modules;t&&s.push(e=>{for(let a of t)if(e.includes(a))return u()})}function m(e,t){let a;u(),(a=r.default.useContext(l.LoadableContext))&&Array.isArray(o.modules)&&o.modules.forEach(e=>{a(e)});let n=r.default.useSyncExternalStore(d.subscribe,d.getCurrentValue,d.getCurrentValue);return r.default.useImperativeHandle(t,()=>({retry:d.retry}),[]),r.default.useMemo(()=>{var t;return n.loading||n.error?r.default.createElement(o.loading,{isLoading:n.loading,pastDelay:n.pastDelay,timedOut:n.timedOut,error:n.error,retry:d.retry}):n.loaded?r.default.createElement((t=n.loaded)&&t.default?t.default:t,e):null},[e,n])}return m.preload=()=>u(),m.displayName="LoadableComponent",r.default.forwardRef(m)}(o,t)}function u(e,t){let a=[];for(;e.length;){let r=e.pop();a.push(r(t))}return Promise.all(a).then(()=>{if(e.length)return u(e,t)})}d.preloadAll=()=>new Promise((e,t)=>{u(n).then(e,t)}),d.preloadReady=(e=[])=>new Promise(t=>{let a=()=>(i=!0,t());u(s,e).then(a,a)}),"u">typeof window&&(window.__NEXT_PRELOADREADY=d.preloadReady);let m=d},25167,(e,t,a)=>{"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r={default:function(){return u},noSSR:function(){return d}};for(var l in r)Object.defineProperty(a,l,{enumerable:!0,get:r[l]});let n=e.r(41705),s=e.r(91398);e.r(91788);let i=n._(e.r(52414)),o="u"<typeof window;function c(e){return{default:e?.default||e}}function d(e,t){if(delete t.webpack,delete t.modules,!o)return e(t);let a=t.loading;return()=>(0,s.jsx)(a,{error:null,isLoading:!0,pastDelay:!1,timedOut:!1})}function u(e,t){let a=i.default,r={loading:({error:e,isLoading:t,pastDelay:a})=>null};e instanceof Promise?r.loader=()=>e:"function"==typeof e?r.loader=e:"object"==typeof e&&(r={...r,...e});let l=(r={...r,...t}).loader;return(r.loadableGenerated&&(r={...r,...r.loadableGenerated},delete r.loadableGenerated),"boolean"!=typeof r.ssr||r.ssr)?a({...r,loader:()=>null!=l?l().then(c):Promise.resolve(c(()=>null))}):(delete r.webpack,delete r.modules,d(a,r))}("function"==typeof a.default||"object"==typeof a.default&&null!==a.default)&&void 0===a.default.__esModule&&(Object.defineProperty(a.default,"__esModule",{value:!0}),Object.assign(a.default,a),t.exports=a.default)},68489,(e,t,a)=>{t.exports=e.r(25167)},4304,e=>{"use strict";var t=e.i(91398),a=e.i(56206);let r=(0,e.i(68489).default)(()=>e.A(28477),{loadableGenerated:{modules:[76487]},ssr:!1});var l=e.i(91788),n=e.i(81912),s=e.i(57712),i=e.i(98817),o=e.i(8228),c=e.i(41158),d=e.i(84122),u=e.i(7230),m=e.i(71481);let h=new Map([["bold",l.createElement(l.Fragment,null,l.createElement("path",{d:"M117.18,188.74a12,12,0,0,1,0,17l-5.12,5.12A58.26,58.26,0,0,1,70.6,228h0A58.62,58.62,0,0,1,29.14,127.92L63.89,93.17a58.64,58.64,0,0,1,98.56,28.11,12,12,0,1,1-23.37,5.44,34.65,34.65,0,0,0-58.22-16.58L46.11,144.89A34.62,34.62,0,0,0,70.57,204h0a34.41,34.41,0,0,0,24.49-10.14l5.11-5.12A12,12,0,0,1,117.18,188.74ZM226.83,45.17a58.65,58.65,0,0,0-82.93,0l-5.11,5.11a12,12,0,0,0,17,17l5.12-5.12a34.63,34.63,0,1,1,49,49L175.1,145.86A34.39,34.39,0,0,1,150.61,156h0a34.63,34.63,0,0,1-33.69-26.72,12,12,0,0,0-23.38,5.44A58.64,58.64,0,0,0,150.56,180h.05a58.28,58.28,0,0,0,41.47-17.17l34.75-34.75a58.62,58.62,0,0,0,0-82.91Z"}))],["duotone",l.createElement(l.Fragment,null,l.createElement("path",{d:"M218.34,119.6,183.6,154.34a46.58,46.58,0,0,1-44.31,12.26c-.31.34-.62.67-.95,1L103.6,202.34A46.63,46.63,0,1,1,37.66,136.4L72.4,101.66A46.6,46.6,0,0,1,116.71,89.4c.31-.34.62-.67,1-1L152.4,53.66a46.63,46.63,0,0,1,65.94,65.94Z",opacity:"0.2"}),l.createElement("path",{d:"M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,7.78,8.22H152a8,8,0,0,0,8-7.78A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"}))],["fill",l.createElement(l.Fragment,null,l.createElement("path",{d:"M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM115.7,192.49a43.31,43.31,0,0,1-55-66.43l25.37-25.37a43.35,43.35,0,0,1,61.25,0,42.9,42.9,0,0,1,9.95,15.43,8,8,0,1,1-15,5.6A27.33,27.33,0,0,0,97.37,112L72,137.37a27.32,27.32,0,0,0,34.68,41.91,8,8,0,1,1,9,13.21Zm79.61-62.55-25.37,25.37A43,43,0,0,1,139.32,168h0a43.35,43.35,0,0,1-40.53-28.12,8,8,0,1,1,15-5.6A27.35,27.35,0,0,0,139.28,152h0a27.14,27.14,0,0,0,19.32-8L184,118.63a27.32,27.32,0,0,0-34.68-41.91,8,8,0,1,1-9-13.21,43.32,43.32,0,0,1,55,66.43Z"}))],["light",l.createElement(l.Fragment,null,l.createElement("path",{d:"M238,88.18a52.42,52.42,0,0,1-15.4,35.66l-34.75,34.75A52.28,52.28,0,0,1,150.62,174h-.05A52.63,52.63,0,0,1,98,119.9a6,6,0,0,1,6-5.84h.17a6,6,0,0,1,5.83,6.16A40.62,40.62,0,0,0,150.58,162h0a40.4,40.4,0,0,0,28.73-11.9l34.75-34.74A40.63,40.63,0,0,0,156.63,57.9l-11,11a6,6,0,0,1-8.49-8.49l11-11a52.62,52.62,0,0,1,74.43,0A52.83,52.83,0,0,1,238,88.18Zm-127.62,98.9-11,11A40.36,40.36,0,0,1,70.6,210h0a40.63,40.63,0,0,1-28.7-69.36L76.62,105.9A40.63,40.63,0,0,1,146,135.77a6,6,0,0,0,5.83,6.16H152a6,6,0,0,0,6-5.84A52.63,52.63,0,0,0,68.14,97.42L33.38,132.16A52.63,52.63,0,0,0,70.56,222h0a52.26,52.26,0,0,0,37.22-15.42l11-11a6,6,0,1,0-8.49-8.48Z"}))],["regular",l.createElement(l.Fragment,null,l.createElement("path",{d:"M240,88.23a54.43,54.43,0,0,1-16,37L189.25,160a54.27,54.27,0,0,1-38.63,16h-.05A54.63,54.63,0,0,1,96,119.84a8,8,0,0,1,16,.45A38.62,38.62,0,0,0,150.58,160h0a38.39,38.39,0,0,0,27.31-11.31l34.75-34.75a38.63,38.63,0,0,0-54.63-54.63l-11,11A8,8,0,0,1,135.7,59l11-11A54.65,54.65,0,0,1,224,48,54.86,54.86,0,0,1,240,88.23ZM109,185.66l-11,11A38.41,38.41,0,0,1,70.6,208h0a38.63,38.63,0,0,1-27.29-65.94L78,107.31A38.63,38.63,0,0,1,144,135.71a8,8,0,0,0,16,.45A54.86,54.86,0,0,0,144,96a54.65,54.65,0,0,0-77.27,0L32,130.75A54.62,54.62,0,0,0,70.56,224h0a54.28,54.28,0,0,0,38.64-16l11-11A8,8,0,0,0,109,185.66Z"}))],["thin",l.createElement(l.Fragment,null,l.createElement("path",{d:"M236,88.12a50.44,50.44,0,0,1-14.81,34.31l-34.75,34.74A50.33,50.33,0,0,1,150.62,172h-.05A50.63,50.63,0,0,1,100,120a4,4,0,0,1,4-3.89h.11a4,4,0,0,1,3.89,4.11A42.64,42.64,0,0,0,150.58,164h0a42.32,42.32,0,0,0,30.14-12.49l34.75-34.74a42.63,42.63,0,1,0-60.29-60.28l-11,11a4,4,0,0,1-5.66-5.65l11-11A50.64,50.64,0,0,1,236,88.12ZM111.78,188.49l-11,11A42.33,42.33,0,0,1,70.6,212h0a42.63,42.63,0,0,1-30.11-72.77l34.75-34.74A42.63,42.63,0,0,1,148,135.82a4,4,0,0,0,8,.23A50.64,50.64,0,0,0,69.55,98.83L34.8,133.57A50.63,50.63,0,0,0,70.56,220h0a50.33,50.33,0,0,0,35.81-14.83l11-11a4,4,0,1,0-5.65-5.66Z"}))]]),p=l.forwardRef((e,t)=>l.createElement(m.default,{ref:t,...e,weights:h}));p.displayName="LinkIcon";let f=new Map([["bold",l.createElement(l.Fragment,null,l.createElement("path",{d:"M144,180a16,16,0,1,1-16-16A16,16,0,0,1,144,180Zm92-52A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM128,64c-24.26,0-44,17.94-44,40v4a12,12,0,0,0,24,0v-4c0-8.82,9-16,20-16s20,7.18,20,16-9,16-20,16a12,12,0,0,0-12,12v8a12,12,0,0,0,23.73,2.56C158.31,137.88,172,122.37,172,104,172,81.94,152.26,64,128,64Z"}))],["duotone",l.createElement(l.Fragment,null,l.createElement("path",{d:"M224,128a96,96,0,1,1-96-96A96,96,0,0,1,224,128Z",opacity:"0.2"}),l.createElement("path",{d:"M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["fill",l.createElement(l.Fragment,null,l.createElement("path",{d:"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8c13.23,0,24-9,24-20s-10.77-20-24-20-24,9-24,20v4a8,8,0,0,1-16,0v-4c0-19.85,17.94-36,40-36s40,16.15,40,36C168,125.38,154.24,139.93,136,143.28Z"}))],["light",l.createElement(l.Fragment,null,l.createElement("path",{d:"M138,180a10,10,0,1,1-10-10A10,10,0,0,1,138,180ZM128,74c-21,0-38,15.25-38,34v4a6,6,0,0,0,12,0v-4c0-12.13,11.66-22,26-22s26,9.87,26,22-11.66,22-26,22a6,6,0,0,0-6,6v8a6,6,0,0,0,12,0v-2.42c18.11-2.58,32-16.66,32-33.58C166,89.25,149,74,128,74Zm102,54A102,102,0,1,1,128,26,102.12,102.12,0,0,1,230,128Zm-12,0a90,90,0,1,0-90,90A90.1,90.1,0,0,0,218,128Z"}))],["regular",l.createElement(l.Fragment,null,l.createElement("path",{d:"M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"}))],["thin",l.createElement(l.Fragment,null,l.createElement("path",{d:"M136,180a8,8,0,1,1-8-8A8,8,0,0,1,136,180ZM128,76c-19.85,0-36,14.36-36,32v4a4,4,0,0,0,8,0v-4c0-13.23,12.56-24,28-24s28,10.77,28,24-12.56,24-28,24a4,4,0,0,0-4,4v8a4,4,0,0,0,8,0v-4.2c18-1.77,32-15.36,32-31.8C164,90.36,147.85,76,128,76Zm100,52A100,100,0,1,1,128,28,100.11,100.11,0,0,1,228,128Zm-8,0a92,92,0,1,0-92,92A92.1,92.1,0,0,0,220,128Z"}))]]),g=l.forwardRef((e,t)=>l.createElement(m.default,{ref:t,...e,weights:f}));g.displayName="QuestionIcon";var b=e.i(20285);let y=new Map([["bold",l.createElement(l.Fragment,null,l.createElement("path",{d:"M240.26,186.1,152.81,34.23h0a28.74,28.74,0,0,0-49.62,0L15.74,186.1a27.45,27.45,0,0,0,0,27.71A28.31,28.31,0,0,0,40.55,228h174.9a28.31,28.31,0,0,0,24.79-14.19A27.45,27.45,0,0,0,240.26,186.1Zm-20.8,15.7a4.46,4.46,0,0,1-4,2.2H40.55a4.46,4.46,0,0,1-4-2.2,3.56,3.56,0,0,1,0-3.73L124,46.2a4.77,4.77,0,0,1,8,0l87.44,151.87A3.56,3.56,0,0,1,219.46,201.8ZM116,136V104a12,12,0,0,1,24,0v32a12,12,0,0,1-24,0Zm28,40a16,16,0,1,1-16-16A16,16,0,0,1,144,176Z"}))],["duotone",l.createElement(l.Fragment,null,l.createElement("path",{d:"M215.46,216H40.54C27.92,216,20,202.79,26.13,192.09L113.59,40.22c6.3-11,22.52-11,28.82,0l87.46,151.87C236,202.79,228.08,216,215.46,216Z",opacity:"0.2"}),l.createElement("path",{d:"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"}))],["fill",l.createElement(l.Fragment,null,l.createElement("path",{d:"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"}))],["light",l.createElement(l.Fragment,null,l.createElement("path",{d:"M235.07,189.09,147.61,37.22h0a22.75,22.75,0,0,0-39.22,0L20.93,189.09a21.53,21.53,0,0,0,0,21.72A22.35,22.35,0,0,0,40.55,222h174.9a22.35,22.35,0,0,0,19.6-11.19A21.53,21.53,0,0,0,235.07,189.09ZM224.66,204.8a10.46,10.46,0,0,1-9.21,5.2H40.55a10.46,10.46,0,0,1-9.21-5.2,9.51,9.51,0,0,1,0-9.72L118.79,43.21a10.75,10.75,0,0,1,18.42,0l87.46,151.87A9.51,9.51,0,0,1,224.66,204.8ZM122,144V104a6,6,0,0,1,12,0v40a6,6,0,0,1-12,0Zm16,36a10,10,0,1,1-10-10A10,10,0,0,1,138,180Z"}))],["regular",l.createElement(l.Fragment,null,l.createElement("path",{d:"M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM222.93,203.8a8.5,8.5,0,0,1-7.48,4.2H40.55a8.5,8.5,0,0,1-7.48-4.2,7.59,7.59,0,0,1,0-7.72L120.52,44.21a8.75,8.75,0,0,1,15,0l87.45,151.87A7.59,7.59,0,0,1,222.93,203.8ZM120,144V104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,180Z"}))],["thin",l.createElement(l.Fragment,null,l.createElement("path",{d:"M233.34,190.09,145.88,38.22h0a20.75,20.75,0,0,0-35.76,0L22.66,190.09a19.52,19.52,0,0,0,0,19.71A20.36,20.36,0,0,0,40.54,220H215.46a20.36,20.36,0,0,0,17.86-10.2A19.52,19.52,0,0,0,233.34,190.09ZM226.4,205.8a12.47,12.47,0,0,1-10.94,6.2H40.54a12.47,12.47,0,0,1-10.94-6.2,11.45,11.45,0,0,1,0-11.72L117.05,42.21a12.76,12.76,0,0,1,21.9,0L226.4,194.08A11.45,11.45,0,0,1,226.4,205.8ZM124,144V104a4,4,0,0,1,8,0v40a4,4,0,0,1-8,0Zm12,36a8,8,0,1,1-8-8A8,8,0,0,1,136,180Z"}))]]),x=l.forwardRef((e,t)=>l.createElement(m.default,{ref:t,...e,weights:y}));x.displayName="WarningIcon";var v=e.i(23631),_=e.i(9373),w=e.i(58030);e.s(["default",0,function(e){let m=[{label:"JavaScript",language:"javascript",code:`
<table id="example" class="display table table-striped" style="width:100%"></table>

<script>
  fetch('${v.API_BASE_URI}/data/api/action/datastore_search?resource_id=04cbec5c-5a3d-4d34-927d-e41c9e6e3736&limit=32000')
    .then(r => r.json())
    .then(data => {
      const columns = data.result.fields.filter(_f => _f.id !== '_id').map(_f => ({
        title: _f.id,
        data: _f.id
      }));
      new DataTable('#example', {
        data: data.result.records,
        columns: columns,
        processing: false,
        serverSide: false,
        search: {return: true},
        scrollX: true,
        scrollY: '448px',
      });
    }).catch(err => {
      console.error(err);
    });
</script>
  `.trim()}],[h,f]=(0,l.useState)({data:[],columns:[]});(0,l.useEffect)(()=>{!async function(){try{let e=await (0,w.ckan_action_api)("datastore_search",{resource_id:"04cbec5c-5a3d-4d34-927d-e41c9e6e3736",limit:32e3});f({data:e.json.result.records,columns:e.json.result.fields.filter(e=>"_id"!==e.id).map(e=>({title:e.id,data:e.id}))})}catch(e){console.error(e)}}()},[]);let y=(0,l.useRef)(null),[A,j]=(0,l.useState)(null);(0,l.useEffect)(()=>{let e=y.current;if(!e)return;let t=()=>{j(e.getBoundingClientRect().height-196)},a=new ResizeObserver(t);return a.observe(e),t(),()=>{a.disconnect()}},[]);let S=[{label:"JavaScript",language:"javascript",code:`
<style>
  /* disable ColumnControl advance selections as DataStore only supports exact matches for filters */
  .dtcc-search-type-icon{display: none !important; pointer-events: none !important;}
  .dtcc-search-type-icon+select{display: none !important; pointer-events: none !important;}
  mark, span.highlight{background: yellow; color: #1f1f1f; padding: 0;}
</style>

<table id="example" class="display table table-striped" style="width:100%"></table>

<script>
  fetch('${v.API_BASE_URI}/data/api/action/datastore_search?resource_id=fac950c0-00d5-4ec1-a4d3-9cbebf98a305&limit=0')
    .then(r => r.json())
    .then(data => {
      const columns = data.result.fields.filter(_f => _f.id !== '_id').map(_f => ({
        title: _f.id,
        data: _f.id,

      }));
      // disable ColumnControl search on keypress, see initComplete for Enter key binding
      DataTable.ColumnControl.SearchInput.prototype.runSearch = function(){ return; }
      const table = new DataTable('#example', {
        columns: columns,
        columnControl: [
          {
            'target': 'thead',
            'content': ['order']
          },
          {
            'target': 'tfoot',
            'content': ['search']
          }
        ],
        processing: true,
        serverSide: true,
        searching: false,  // source has too many records for full-text search
        scrollX: true,
        scrollY: '448px',
        ajax: (_data, _callback) => {
          // convert DataTables components to DataStore parameters
          const limit = _data.length || 10;
          const offset = _data.start || 0;
          const search = encodeURIComponent(_data?.search?.value ?? '');
          const order = _data.order?.[0];
          const sort = order && columns[order.column] ? \`\${columns[order.column].data} \${order.dir}\` : '';  // datastore sort does not support %20 URI encoding for spaces
          const filters = {};
          _data.columns?.forEach((_c) => {
            if (_c.search.value) { filters[_c.data] = _c.search.value; }
          });
          const url = new URL('${v.API_BASE_URI}/data/api/action/datastore_search');
          url.searchParams.set('resource_id', 'fac950c0-00d5-4ec1-a4d3-9cbebf98a305');
          url.searchParams.set('limit', limit);
          url.searchParams.set('offset', offset);
          if (sort) {
            url.searchParams.set('sort', sort);
          }
          if (Object.keys(filters).length) {
            url.searchParams.set('filters', JSON.stringify(filters));
          }
          if (search) {
            url.searchParams.set('q', search);
          }
          fetch(url)
            .then(r => r.json())
            .then(json => _callback({
              data: json.result.records,
              recordsTotal: json.result.total,
              recordsFiltered: json.result.total
            }));
        },
        initComplete: (_settings, _data) => {
          // add custom Enter key binding for column filter inputs
          const bindColumnSearch = (_column, _input) => {
            $(_input).off('keyup.filterCol');
            $(_input).on('keyup.filterCol', (_event) => {
              const _fVal = $(_input).val();
              if( _event.keyCode == 13 && _column.search() !== _fVal ){
                _column.search(_fVal).draw();
              }
            });
          }
          table.columns().every(function(_i){
            const columnFilter = $(this.footer()).find('input');
            if( columnFilter.length > 0 ){
              bindColumnSearch(this, columnFilter);
              return;
            }
            // re-attempt to bind, due to ColumnControl plugin painting
            const maxTries = 35;
            let interval = false;
            let tries = 0;
            interval = setInterval(() => {
              const columnFilter = $(this.footer()).find('input');
              if( columnFilter.length > 0 || tries > maxTries ){
                clearInterval(interval);
                interval = false;
                bindColumnSearch(this, columnFilter);
                return;
              }
              tries++;
            }, 150);
          });
        },
        drawCallback: (_settings) => {
          // highlight column searches
          if( ! $.fn.unhighlight ){
            return;
          }
          const body = $('#example tbody');
          body.unhighlight();
          table.columns().every(function(_i){
            const search = this.search();
            if( search ){
              $(this.nodes()).highlight(search);
            }
          });
        }
      });
    }).catch(err => {
      console.error(err);
    });
</script>
  `.trim()}],[C,E]=(0,l.useState)([]);(0,l.useEffect)(()=>{!async function(){try{let e=await (0,w.ckan_action_api)("datastore_search",{resource_id:"fac950c0-00d5-4ec1-a4d3-9cbebf98a305",limit:0});E(e.json.result.fields.filter(e=>"_id"!==e.id).map(e=>({title:e.id,data:e.id})))}catch(e){console.error(e)}}()},[]);let N=(0,l.useRef)(null),[k,T]=(0,l.useState)(null);(0,l.useEffect)(()=>{let e=N.current;if(!e)return;let t=()=>{T(e.getBoundingClientRect().height-196)},a=new ResizeObserver(t);return a.observe(e),t(),()=>{a.disconnect()}},[]);let M=[{label:"JavaScript",language:"javascript",code:`
<table id="example" class="display table table-striped" style="width:100%"></table>

<script>
  const language = document.documentElement.lang || 'en';
  const numberTypes = [
    'year',
    'month',
    'int',
    'int8',
    'int16',
    'bigint',
    'numeric',
    'float',
    'double',
    'money',
  ];
  const alphaTypes = ['text', '_text'];
  const dateTypes = ['timestamp', 'date'];
  fetch('${v.API_BASE_URI}/data/api/action/datastore_search?resource_id=02a92b0f-b26d-4fbd-9601-d27651703715&limit=32000')
    .then(r => r.json())
    .then(data => {
      const columns = data.result.fields.filter(
        (f) => f.id !== '_id',
      );
      columns.forEach((_c) => {
        _c['data'] = _c.id;
        _c['title'] = _c?.info[\`label_\${language}\`] || _c.id;
        _c['description'] = _c?.info[\`notes_\${language}\`] || null;
        const dsType = _c?.info?.type_override || _c.type;
        if (numberTypes.includes(dsType)) {
          _c['type'] = 'num';
          if( ! ['year_annee', 'month_mois'].includes(_c.id) ){
            _c['render'] = language == 'fr' ? DataTable.render.number(' ', ',', null, null) : DataTable.render.number(',', '.', null, null);
          }
          return;
        }
        if (alphaTypes.includes(dsType)) {
          _c['type'] = 'string';
          return;
        }
        if (dateTypes.includes(dsType)) {
          _c['type'] = 'date';
          return;
        }
      });
      new DataTable('#example', {
        data: data.result.records,
        columns: columns,
        processing: false,
        serverSide: false,
        search: {return: true},
        scrollX: true,
        scrollY: '448px',
        headerCallback: function(_thead){
          this.api().columns().every(function () {
            const columnConfig = columns[this.index()];
            if (!columnConfig?.description) {
              return;
            }
            const th = this.header();
            const title = th.querySelector('.dt-column-title');
            if (!title) {
              return;
            }
            title.querySelector('.column-description-icon')?.remove();
            const icon = document.createElement('i');
            icon.className = 'fa-solid fa-circle-question column-description-icon ms-1';
            icon.setAttribute('aria-label', columnConfig.description);
            icon.setAttribute('title', columnConfig.description);
            title.appendChild(icon);
          });
        }
      });
    }).catch(err => {
      console.error(err);
    });
</script>
  `.trim()}],L=["year","month","int","int8","int16","bigint","numeric","float","double","money"],P=["text","_text"],D=["timestamp","date"],[Z,R]=(0,l.useState)({data:[],columns:[]});(0,l.useEffect)(()=>{let e=document.documentElement.lang||"en",t="fr"===e?new Intl.NumberFormat("fr-CA",{useGrouping:!0,maximumFractionDigits:20}):new Intl.NumberFormat("en-CA",{useGrouping:!0,maximumFractionDigits:20});!async function(){try{let a=await (0,w.ckan_action_api)("datastore_search",{resource_id:"02a92b0f-b26d-4fbd-9601-d27651703715",limit:32e3}),r=a.json.result.fields.filter(e=>"_id"!==e.id);r.forEach(a=>{a.data=a.id,a.title=a?.info[`label_${e}`]||a.id,a.description=a?.info[`notes_${e}`]||null;let r=a?.info?.type_override||a.type;if(L.includes(r)){a.type="num",["year_annee","month_mois"].includes(a.id)||(a.render=(e,a)=>"display"!==a&&"filter"!==a?e:null==e||""===e?"":t.format(Number(e)));return}if(P.includes(r)){a.type="string";return}if(D.includes(r)){a.type="date";return}}),R({data:a.json.result.records,columns:r})}catch(e){console.error(e)}}()},[]);let $=(0,l.useRef)(null),[F,I]=(0,l.useState)(null);(0,l.useEffect)(()=>{let e=$.current;if(!e)return;let t=()=>{I(e.getBoundingClientRect().height-196)},a=new ResizeObserver(t);return a.observe(e),t(),()=>{a.disconnect()}},[]);let O=[{label:"JavaScript",language:"javascript",code:`
<style>
  .group-header td{ background-color: #335075 !important; color: white !important; box-shadow: none !important; }
  .group-summary td{ background-color: #38414d !important; color: white !important; box-shadow: none !important; }
</style>

<table id="example" class="display table table-striped" style="width:100%"></table>

<script>
  const language = document.documentElement.lang || 'en';

  async function retrieveAllRecords(){
    const limit = 10000;
    let offset = 0;
    let records = [];
    let fields;
    while (true) {
      const url = new URL('${v.API_BASE_URI}/data/api/action/datastore_search');
      url.searchParams.set('resource_id', '15eeafa2-c331-44e7-b37f-d0d54a51d2eb');
      url.searchParams.set('limit', limit);
      url.searchParams.set('offset', offset);
      url.searchParams.set('filters', JSON.stringify({'owner_org': 'ec'}));
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(
          data.error?.message || \`Request failed: \${response.status}\`,
        );
      }
      fields ??= data.result.fields;
      const batch = data.result.records;
      records = records.concat(batch);
      if (batch.length < limit) {
        break;
      }
      offset += limit;
    }
    return { fields, records };
  }

  retrieveAllRecords()
    .then(({ fields, records }) => {
      const columns = fields.filter(_f => _f.id !== '_id' )
        .filter(_f => ! _f.id.endsWith(language == 'en' ? '_fr' : '_en') )  // only show current language columns
        .map((_f) => {
          const column = {
            data: _f.id,
            name: _f.id,  // add name for DataTables API column ":name" selections
            title: _f.id,
          };
          if (_f.id == 'org_name') {
            column.render = (data, type, row) => {
              return data?.split('|')[language === 'en' ? 0 : 1].trim();  // only show current language org name
            };
          }
          return column;
        });
      const html_table = document.querySelector('#example');
      const tfoot = document.createElement('tfoot');
      const footerRow = document.createElement('tr');
      const footer = document.createElement('th');
      footer.setAttribute('colSpan', columns.length);
      footerRow.appendChild(footer);
      tfoot.appendChild(footerRow);
      html_table.appendChild(tfoot);
      const expandedGroups = new Set();
      const table = new DataTable('#example', {
        data: records,
        responsive: false,
        autoWidth: true,
        columns: columns,
        processing: true,
        serverSide: false,
        search: {return: true},
        order: [[0, 'desc']],  // always sort by year descending
        scrollX: true,
        scrollY: '448px',
        pageLength: -1,  // show all results
        lengthChange: false,  // disable "entries per page"
        paging: false,
        ordering: false,
        rowGroup: {
          dataSrc: ['year'],
          startRender: function (rows, group) {
            const expanded = expandedGroups.has(Number(group));
            const columnCount = rows.columns().count();

            const tr = document.createElement('tr');
            tr.className = 'group-header';
            tr.dataset.group = group;

            const td = document.createElement('td');
            td.colSpan = columnCount;

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'group-toggle';
            button.setAttribute('aria-expanded', String(expanded));
            button.setAttribute('aria-label', \`\${expanded ? 'Collapse' : 'Expand'} \${group} group\`);

            const icon = document.createElement('span');
            icon.className = 'group-toggle-icon';
            icon.setAttribute('aria-hidden', 'true');
            icon.textContent = expanded ? '−' : '+';

            const label = document.createElement('strong');
            label.textContent = group;

            button.append(icon, label);
            td.appendChild(button);
            tr.appendChild(td);

            return tr;
          },
          endRender: function (rows, group) {
            const values = rows.data().pluck('pageviews').toArray().map(Number).filter(Number.isFinite);
            const total = values.reduce((sum, value) => sum + value, 0);
            const average = values.length > 0 ? total / values.length : 0;
            const maximum = values.length > 0 ? Math.max(...values) : 0;

            const columnCount = rows.columns().count();

            const tr = document.createElement('tr');
            tr.className = 'group-summary';

            const labelCell = document.createElement('td');
            labelCell.colSpan = 2;

            const label = document.createElement('strong');
            label.textContent = \`\${group} Summary\`;
            labelCell.appendChild(label);

            const summaryCell = document.createElement('td');
            summaryCell.colSpan = Math.max(columnCount - 2, 1);
            summaryCell.setAttribute('aria-label', \`\${group} summary statistics\`);

            summaryCell.innerHTML = \`
              <span>Total: \${total.toLocaleString()}</span><br>
              <span>Average: \${average.toLocaleString(undefined, {maximumFractionDigits: 2})}</span><br>
              <span>Max: \${maximum.toLocaleString()}</span>
            \`;

            tr.append(labelCell, summaryCell);

            return tr;
          },
        },
        rowCallback: function (row, data) {
          const group = Number(data.year);
          const expanded = expandedGroups.has(group);
          row.hidden = !expanded;
          row.setAttribute('aria-hidden', String(!expanded));
        },
        footerCallback: function () {
          const api = this.api();
          const values = api.column('pageviews:name', { search: 'applied' }).data().toArray().map(Number).filter(Number.isFinite);
          const total = values.reduce((sum, value) => sum + value, 0);
          const average = values.length ? total / values.length : 0;
          const maximum = values.length ? Math.max(...values) : 0;

          const footer = api.table().footer().querySelector('th');

          footer.innerHTML = \`
            <span>Total: \${total.toLocaleString()}</span><br>
            <span>Average: \${average.toLocaleString(undefined, {maximumFractionDigits: 2})}</span><br>
            <span>Max: \${maximum.toLocaleString()}</span>
          \`;
        },
      });
      table.on('click', 'tbody .group-toggle', function (){
        const group = Number(this.closest('tr').dataset.group);
        if (expandedGroups.has(group)) {
          expandedGroups.delete(group);
        } else {
          expandedGroups.add(group);
        }
        table.draw(false);
      });
  }).catch(err => {
    console.error(err);
  });
</script>
  `.trim()}],H=(0,l.useRef)(new Set),[G,q]=(0,l.useState)({data:[],columns:[]});(0,l.useEffect)(()=>{let e=document.documentElement.lang||"en";async function t(){let e,t=0,a=[];for(;;)try{let r=await (0,w.ckan_action_api)("datastore_search",{resource_id:"15eeafa2-c331-44e7-b37f-d0d54a51d2eb",limit:1e4,offset:t,filters:JSON.stringify({owner_org:"ec"})});e??=r.json.result.fields;let l=r.json.result.records;if(a=a.concat(l),l.length<1e4)break;t+=1e4}catch(e){console.error(e)}return{fields:e,records:a}}!async function(){t().then(({fields:t,records:a})=>{q({data:a,columns:t.filter(e=>"_id"!==e.id).filter(t=>!t.id.endsWith("en"==e?"_fr":"_en")).map(t=>{let a={data:t.id,name:t.id,title:t.info?.label||t.id};return"org_name"==t.id&&(a.render=(t,a,r)=>t?.split("|")[+("en"!==e)].trim()),a})})}).catch(e=>{console.error(e)})}()},[]);let B=(0,l.useRef)(null),[V,U]=(0,l.useState)(null);return(0,l.useEffect)(()=>{let e=B.current;if(!e)return;let t=()=>{U(e.getBoundingClientRect().height-196)},a=new ResizeObserver(t);return a.observe(e),t(),()=>{a.disconnect()}},[]),(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(o.default,{title:"DataStore DataTables | Canadian Open Data API Lab",description:"Use case examples for the Government of Canada Open Data Portal API"}),(0,t.jsxs)(i.AnimatePresence,{children:[(0,t.jsx)(s.motion.div,{className:(0,a.default)(b.PageMainStyle,"pb-0!"),variants:_.animationWrapper,initial:"hidden",animate:"show",children:(0,t.jsxs)(s.motion.div,{className:b.ContainerMainStyle,variants:_.splashTextAnimation,id:"datatables-overview",children:[(0,t.jsxs)("div",{className:b.ContentMainStyle,children:[(0,t.jsx)("h1",{children:"DataTables with DataStore Source"}),(0,t.jsxs)("div",{className:(0,a.default)("flex","items-center","px-4","py-2","rounded-xl","border-2","border-ui-white"),children:[(0,t.jsx)(x,{size:32}),"  ",(0,t.jsxs)("span",{className:(0,a.default)("text-lg"),children:[(0,t.jsx)("strong",{children:"Disclaimer:"})," only canada.ca and gc.ca domains are allowed to make cross origin requests."]})]}),(0,t.jsx)("h2",{children:"Overview"}),(0,t.jsxs)("p",{children:[(0,t.jsx)(c.default,{className:b.PageLinkStyle,href:"https://datatables.net",target:"_blank",children:"DataTables"})," ","is a popular open-source JavaScript library that enhances standard HTML tables with powerful interactive features. It allows for displaying large datasets in a user-friendly way without having to build table functionality from scratch. It turns a basic HTML table into a feature-rich, interactive data grid with minimal configuration."]}),(0,t.jsx)("p",{children:"DataTables can populate a table by making AJAX requests to a remote API instead of relying on data already present in the HTML. This allows it to display dynamic data from a database or web service and is especially useful for large or frequently changing datasets. The two common approaches are client-side processing and server-side processing."}),(0,t.jsx)("h3",{children:"Download & Install"}),(0,t.jsxs)("p",{children:["DataTables offers a"," ",(0,t.jsx)(c.default,{className:b.PageLinkStyle,href:"https://datatables.net/download/",target:"_blank",children:"package builder"})," ","which will help you gather all of the dependencies you need in your webpage."]}),(0,t.jsx)("h3",{children:"DataTables Options"}),(0,t.jsxs)("p",{children:["For detailed descriptions of the DataTables options, read their"," ",(0,t.jsx)(c.default,{className:b.PageLinkStyle,href:"https://datatables.net/manual/options",target:"_blank",children:"official Options guide,"})," ","which will help you determine the settings for your desired table output. Note that different Plugins may add more options."]})]}),(0,t.jsx)(d.default,{})]})}),(0,t.jsx)(s.motion.div,{className:(0,a.default)(b.PageMainStyle,"pt-0!","pb-0!"),variants:_.animationWrapper,initial:"hidden",animate:"show",children:(0,t.jsxs)(s.motion.div,{className:b.ContainerMainStyle,variants:_.splashTextAnimation,id:"datatables-client-side",children:[(0,t.jsxs)("div",{className:(0,a.default)(b.ContentMainStyle,"w-[calc(66.6667%-128px)]","min-w-[calc(66.6667%-128px)]","max-w-[calc(66.6667%-128px)]"),ref:y,children:[(0,t.jsx)("div",{className:b.PageBreakStyle}),(0,t.jsx)("h3",{className:(0,a.default)("flex","items-center"),children:(0,t.jsxs)(c.default,{href:"#datatables-client-side",className:(0,a.default)("inline","group"),children:["Client-side Processing ",(0,t.jsx)(p,{className:b.LinkIconStyle})]})}),(0,t.jsx)("p",{children:"With client-side processing, DataTables requests the data once from a remote API. After the data is downloaded, all searching, sorting, and pagination are performed in the user's browser. This approach is ideal when the dataset is relatively small (hundreds or a few thousand rows) and the API can return the entire dataset efficiently."}),(0,t.jsxs)("p",{children:["Resource:"," ",(0,t.jsx)(c.default,{className:b.PageLinkStyle,href:"https://open.canada.ca/data/dataset/933c7f9d-deb0-4367-940d-06c38f494153/resource/04cbec5c-5a3d-4d34-927d-e41c9e6e3736",target:"_blank",children:"Open Government Portal Department List - Government of Canada Department List"})]}),h.columns.length>0?(0,t.jsx)("div",{className:(0,a.default)("w-full","min-w-full","max-w-full","block","relative"),children:(0,t.jsx)(r,{data:h.data,columns:h.columns,options:{autoWidth:!0,searchHighlight:!0,responsive:!1,scrollX:!0,scrollY:"448px",scrollCollapse:!0,search:{return:!0},paging:!0},className:(0,a.default)("table","table-striped","table-hover","dark","w-full")},h.columns.map(e=>e.data).join("-"))}):(0,t.jsx)("div",{className:(0,a.default)("min-h-112","flex","items-center","justify-center"),children:(0,t.jsx)(u.default,{})})]}),(0,t.jsx)(d.default,{className:(0,a.default)("mt-24"),codeBlockStyle:{maxHeight:A?`${A}px`:void 0},examples:m,label:"Client Side DataTables w/ DataStore Search"})]})}),(0,t.jsx)(s.motion.div,{className:(0,a.default)(b.PageMainStyle,"pt-0!"),variants:_.animationWrapper,initial:"hidden",animate:"show",children:(0,t.jsxs)(s.motion.div,{className:b.ContainerMainStyle,variants:_.splashTextAnimation,id:"datatables-server-side",children:[(0,t.jsxs)("div",{className:(0,a.default)(b.ContentMainStyle,"w-[calc(66.6667%-128px)]","min-w-[calc(66.6667%-128px)]","max-w-[calc(66.6667%-128px)]"),ref:N,children:[(0,t.jsx)("div",{className:b.PageBreakStyle}),(0,t.jsx)("h3",{className:(0,a.default)("flex","items-center"),children:(0,t.jsxs)(c.default,{href:"#datatables-server-side",className:(0,a.default)("inline","group"),children:["Server-side Processing ",(0,t.jsx)(p,{className:b.LinkIconStyle})]})}),(0,t.jsx)("p",{children:"For very large datasets, DataTables can operate with server-side processing. Instead of downloading every record on page load, DataTables sends a request every time the user interacts with the table, such as paging, column ordering, or searching. This allows DataTables to efficiently work with datasets containing millions of records while transferring only a small amount of data for each interaction."}),(0,t.jsx)("h4",{children:"Known Limitations"}),(0,t.jsx)("p",{children:"Though the DataTables library is robust and offers a lot of functionality and plugins, not all of these are supported in the Open Data API. Here are some of the common limitations to the datastore_search API endpoint:"}),(0,t.jsxs)("ul",{className:(0,a.default)("list-disc"),children:[(0,t.jsx)("li",{children:"Maximum records per page is 32,000"}),(0,t.jsx)("li",{children:"Full text search is disabled for data over 100,000 records (q parameter in datastore_search, search parameter in DataTables)"}),(0,t.jsx)("li",{children:"Column filters are only exact match (filters parameter in datastore_search, ColumnControl search in DataTables)"}),(0,t.jsx)("li",{children:'Does not support querying like "greater than" or "less than", date ranges, or "starts with" or "ends with"'}),(0,t.jsx)("li",{children:'Does not support boolean querying like "does not contain"'})]}),(0,t.jsxs)("p",{children:["Resource:"," ",(0,t.jsx)(c.default,{className:b.PageLinkStyle,href:"https://open.canada.ca/data/en/dataset/d8f85d91-7dec-4fd1-8055-483b77225d8b/resource/fac950c0-00d5-4ec1-a4d3-9cbebf98a305",target:"_blank",children:"Proactive Publication - Contracts - Contracts over $10,000"})]}),C.length>0?(0,t.jsx)("div",{className:(0,a.default)("w-full","min-w-full","max-w-full","block"),children:(0,t.jsx)(r,{columns:C,options:{autoWidth:!0,searchHighlight:!0,responsive:!1,processing:!0,serverSide:!0,scrollX:!0,scrollY:"448px",scrollCollapse:!0,searching:!1,paging:!0,columnControl:[{target:"thead",content:["order"]},{target:"tfoot",content:["search"]}],ajax:(e,t)=>{let a=e.length||10,r=e.start||0,l=encodeURIComponent(e?.search?.value??""),n=e.order?.[0],s=n&&C[n.column]?`${C[n.column].data} ${n.dir}`:"",i={};e.columns?.forEach(e=>{e.search.value&&(i[e.data]=e.search.value)});let o=new URL(`${v.API_BASE_URI}/data/api/action/datastore_search`);o.searchParams.set("resource_id","fac950c0-00d5-4ec1-a4d3-9cbebf98a305"),o.searchParams.set("limit",a),o.searchParams.set("offset",r),s&&o.searchParams.set("sort",s),Object.keys(i).length&&o.searchParams.set("filters",JSON.stringify(i)),l&&o.searchParams.set("q",l),fetch(o,v.API_KEY?{headers:{Authorization:v.API_KEY}}:{}).then(e=>e.json()).then(e=>t({data:e.result.records,recordsTotal:e.result.total,recordsFiltered:e.result.total}))},initComplete(e){this.api().columns().every(function(){let e,t,a=this;e=0,t=setInterval(()=>{let r=a.footer()?.querySelector("input");(r||e>=30)&&(clearInterval(t),r&&(e=>{e.addEventListener("keyup",t=>{"Enter"===t.key&&a.search()!==e.value&&a.search(e.value).draw()})})(r)),e++},100)})},drawCallback(){document.querySelectorAll("#datatables-server-side tbody mark.dt-highlight").forEach(e=>{e.replaceWith(document.createTextNode(e.textContent))}),this.api().columns().every(function(){let e=this.search();e&&this.nodes().each(t=>{!function(e,t){let a=e.textContent;if(!a||!t)return;let r=RegExp(t.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"gi");e.innerHTML=a.replace(r,e=>`<mark class="dt-highlight">${e}</mark>`)}(t,e)})})}},className:(0,a.default)("table","table-striped","table-hover","dark","w-full")},C.map(e=>e.data).join("-"))}):(0,t.jsx)("div",{className:(0,a.default)("min-h-112","flex","items-center","justify-center"),children:(0,t.jsx)(u.default,{})})]}),(0,t.jsx)(d.default,{className:(0,a.default)("mt-24"),codeBlockStyle:{maxHeight:k?`${k}px`:void 0},examples:S,label:"Server Side DataTables w/ DataStore Filters"})]})}),(0,t.jsx)(s.motion.div,{className:(0,a.default)(b.PageMainStyle,"pt-0!"),variants:_.animationWrapper,initial:"hidden",animate:"show",children:(0,t.jsxs)(s.motion.div,{className:b.ContainerMainStyle,variants:_.splashTextAnimation,id:"datatables-data-dictionary",children:[(0,t.jsxs)("div",{className:(0,a.default)(b.ContentMainStyle,"w-[calc(66.6667%-128px)]","min-w-[calc(66.6667%-128px)]","max-w-[calc(66.6667%-128px)]"),ref:$,children:[(0,t.jsx)("div",{className:b.PageBreakStyle}),(0,t.jsx)("h3",{className:(0,a.default)("flex","items-center"),children:(0,t.jsxs)(c.default,{href:"#datatables-data-dictionary",className:(0,a.default)("inline","group"),children:["Data Dictionary, Cell Types, & Cell Renderers ",(0,t.jsx)(p,{className:b.LinkIconStyle})]})}),(0,t.jsx)("p",{children:"DataStore resources may include a Data Dictionary that describes the fields in a dataset, including each field's name, labels, and data type. If a Data Dictionary has been added to a resource, this metadata can be used to determine how each column should be handled when displaying the data in DataTables."}),(0,t.jsx)("p",{children:"By mapping the field types to DataTables column types, the table can apply appropriate sorting and searching behaviour. For example, treating integers and decimals as numeric values, dates as dates, and text fields as strings."}),(0,t.jsx)("p",{children:"The field metadata can also be used to determine cell renderers. For example, URL fields can be rendered as clickable links, boolean values can be displayed as readable labels or icons, and date fields can be formatted into a more user-friendly format."}),(0,t.jsx)("p",{children:"This allows a DataTables implementation to be dynamically generated from the DataStore schema, rather than requiring each dataset's columns and rendering rules to be manually configured."}),(0,t.jsxs)("p",{children:["For all of the supported data types in DataTables, view"," ",(0,t.jsx)(c.default,{className:b.PageLinkStyle,href:"https://datatables.net/ref/core/option/columns.type",target:"_blank",children:"their official documentation."})]}),(0,t.jsxs)("p",{children:["Resource:"," ",(0,t.jsx)(c.default,{className:b.PageLinkStyle,href:"https://open.canada.ca/data/dataset/2916fad5-ebcc-4c86-b0f3-4f619b29f412/resource/02a92b0f-b26d-4fbd-9601-d27651703715",target:"_blank",children:"Open Government Analytics - Number of Visits, Downloads"})]}),Z.columns.length>0?(0,t.jsx)("div",{className:(0,a.default)("w-full","min-w-full","max-w-full","block","relative"),children:(0,t.jsx)(r,{data:Z.data,columns:Z.columns,options:{autoWidth:!0,searchHighlight:!0,responsive:!1,scrollX:!0,scrollY:"448px",scrollCollapse:!0,search:{return:!0},paging:!0,headerCallback:function(e){this.api().columns().every(function(){let e=Z.columns[this.index()];if(!e?.description)return;let a=this.header().querySelector(".dt-column-title");if(!a)return;let r=a.querySelector(".column-description-icon");r||((r=document.createElement("span")).className="column-description-icon inline ml-1",r.setAttribute("aria-label",e.description),r.setAttribute("title",e.description),a.appendChild(r)),(0,n.createRoot)(r).render((0,t.jsx)(g,{size:14,weight:"fill"}))})}},className:(0,a.default)("table","table-striped","table-hover","dark","w-full")},Z.columns.map(e=>e.data).join("-"))}):(0,t.jsx)("div",{className:(0,a.default)("min-h-112","flex","items-center","justify-center"),children:(0,t.jsx)(u.default,{})})]}),(0,t.jsx)(d.default,{className:(0,a.default)("mt-24"),codeBlockStyle:{maxHeight:F?`${F}px`:void 0},examples:M,label:"Client Side DataTables w/ Data Dictionary"})]})}),(0,t.jsx)(s.motion.div,{className:(0,a.default)(b.PageMainStyle,"pt-0!"),variants:_.animationWrapper,initial:"hidden",animate:"show",children:(0,t.jsxs)(s.motion.div,{className:b.ContainerMainStyle,variants:_.splashTextAnimation,id:"datatables-grouping",children:[(0,t.jsxs)("div",{className:(0,a.default)(b.ContentMainStyle,"w-[calc(66.6667%-128px)]","min-w-[calc(66.6667%-128px)]","max-w-[calc(66.6667%-128px)]"),ref:B,children:[(0,t.jsx)("div",{className:b.PageBreakStyle}),(0,t.jsx)("h3",{className:(0,a.default)("flex","items-center"),children:(0,t.jsxs)(c.default,{href:"#datatables-grouping",className:(0,a.default)("inline","group"),children:["Row Grouping & Summary Statistics Row ",(0,t.jsx)(p,{className:b.LinkIconStyle})]})}),(0,t.jsx)("p",{children:"The DataTables RowGroup extension adds the ability to organize table rows into groups based on the values of one or more columns. Instead of displaying a flat list of records, related rows can be visually grouped under a shared heading."}),(0,t.jsx)("p",{children:"For example, a dataset could be grouped by Province, with each province displayed as a separate section containing its corresponding records."}),(0,t.jsx)("p",{children:"RowGroup can also be used to add group headers and footers, allowing additional information such as group labels, counts, or summaries to be displayed."}),(0,t.jsx)("p",{children:"It is particularly useful for datasets where records naturally belong to categories or hierarchical groups, making large tables easier to scan and understand."}),(0,t.jsxs)("p",{children:["Resource:"," ",(0,t.jsx)(c.default,{className:b.PageLinkStyle,href:"https://open.canada.ca/data/en/dataset/2916fad5-ebcc-4c86-b0f3-4f619b29f412/resource/15eeafa2-c331-44e7-b37f-d0d54a51d2eb",target:"_blank",children:"Open Government Analytics - Open Maps Views"}),(0,t.jsx)("br",{}),"Filtered to show"," ",(0,t.jsx)("em",{children:'"Environment and Climate Change Canada"'})," records, grouped by year. Has customized RowGroup renderers to render expand sections and summary rows for the groups."]}),G.columns.length>0?(0,t.jsx)("div",{className:(0,a.default)("w-full","min-w-full","max-w-full","block","relative"),children:(0,t.jsx)(r,{data:G.data,columns:G.columns,options:{autoWidth:!0,searchHighlight:!0,responsive:!1,processing:!0,serverSide:!1,order:[[0,"desc"]],pageLength:-1,lengthChange:!1,scrollX:!0,scrollY:"448px",scrollCollapse:!0,search:{return:!0},paging:!1,ordering:!1,rowGroup:{dataSrc:["year"],startRender:function(e,t){let a=H.current.has(Number(t)),r=e.columns().count(),l=document.createElement("tr");l.className="group-header",l.dataset.group=t;let n=document.createElement("td");n.colSpan=r;let s=document.createElement("button");s.type="button",s.className="group-toggle",s.setAttribute("aria-expanded",String(a)),s.setAttribute("aria-label",`${a?"Collapse":"Expand"} ${t} group`);let i=document.createElement("span");i.className="group-toggle-icon",i.setAttribute("aria-hidden","true"),i.textContent=a?"−":"+";let o=document.createElement("strong");return o.textContent=t,s.append(i,o),s.addEventListener("click",()=>{console.log("GROUP CLICKED",t),H.current.has(t)?H.current.delete(t):H.current.add(t),e.table().draw(!1)}),n.appendChild(s),l.appendChild(n),l},endRender:function(e,t){let a=e.data().pluck("pageviews").toArray().map(Number).filter(Number.isFinite),r=a.reduce((e,t)=>e+t,0),l=a.length>0?r/a.length:0,n=a.length>0?Math.max(...a):0,s=e.columns().count(),i=document.createElement("tr");i.className="group-summary";let o=document.createElement("td");o.colSpan=2;let c=document.createElement("strong");c.textContent=`${t} Summary`,o.appendChild(c);let d=document.createElement("td");return d.colSpan=Math.max(s-2,1),d.setAttribute("aria-label",`${t} summary statistics`),d.innerHTML=`
                            <span>Total: ${r.toLocaleString()}</span><br>
                            <span>Average: ${l.toLocaleString(void 0,{maximumFractionDigits:2})}</span><br>
                            <span>Max: ${n.toLocaleString()}</span>
                          `,i.append(o,d),i}},rowCallback:function(e,t){let a=Number(t.year),r=H.current.has(a);e.hidden=!r,e.setAttribute("aria-hidden",String(!r))},footerCallback:function(){let e=this.api(),t=e.column("pageviews:name",{search:"applied"}).data().toArray().map(Number).filter(Number.isFinite),a=t.reduce((e,t)=>e+t,0),r=t.length?a/t.length:0,l=t.length?Math.max(...t):0;e.table().footer().querySelector("th").innerHTML=`
                          <span>Total: ${a.toLocaleString()}</span><br>
                          <span>Average: ${r.toLocaleString(void 0,{maximumFractionDigits:2})}</span><br>
                          <span>Max: ${l.toLocaleString()}</span>
                        `}},className:(0,a.default)("table","table-striped","table-hover","dark","w-full"),children:(0,t.jsx)("tfoot",{children:(0,t.jsx)("tr",{children:(0,t.jsx)("th",{colspan:G.columns.length||1})})})},G.columns.map(e=>e.data).join("-"))}):(0,t.jsx)("div",{className:(0,a.default)("min-h-112","flex","items-center","justify-center"),children:(0,t.jsx)(u.default,{})})]}),(0,t.jsx)(d.default,{className:(0,a.default)("mt-24"),codeBlockStyle:{maxHeight:V?`${V}px`:void 0},examples:O,label:"Client Side DataTables w/ RowGroup & Custom Summaries"})]})})]})]})}],4304)},59794,(e,t,a)=>{let r="/datastore-datatables";(window.__NEXT_P=window.__NEXT_P||[]).push([r,()=>e.r(4304)]),t.hot&&t.hot.dispose(function(){window.__NEXT_P.push([r])})}]);