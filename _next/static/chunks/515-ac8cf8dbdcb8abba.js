(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[515],{4558:function(e,t,r){"use strict";r.d(t,{d:function(){return x},K:function(){return j}});var n=r(5893),l=r(7294),c=r(9664);function a(e){var t=e.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g);return(0,c.hu)((0,c.JG)(t),"No matches found for "+e),t.join("-").toLowerCase()}var s=r(1151),o=r(1664);function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function u(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function m(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{},n=Object.keys(r);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(r).filter((function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable})))),n.forEach((function(t){u(e,t,r[t])}))}return e}function d(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var r=null==e?null:"undefined"!==typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,l,c=[],a=!0,s=!1;try{for(r=r.call(e);!(a=(n=r.next()).done)&&(c.push(n.value),!t||c.length!==t);a=!0);}catch(o){s=!0,l=o}finally{try{a||null==r.return||r.return()}finally{if(s)throw l}}return c}}(e,t)||function(e,t){if(!e)return;if("string"===typeof e)return i(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);"Object"===r&&e.constructor&&(r=e.constructor.name);if("Map"===r||"Set"===r)return Array.from(r);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return i(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function x(e){var t=e.children;return(0,n.jsx)(s.Zo,{components:f,children:(0,n.jsx)("div",{className:"wrapper mt-sm laptop:pt-xl",children:t})})}var f={theme:{text:function(e){return(0,n.jsx)("span",m({style:{color:"red"}},e))},lead:function(e){return(0,n.jsx)("p",m({className:"mx-auto mb-md mt-md w-full max-w-2xl text-lg tablet:text-xl"},e))}},wrapper:function(e){var t=e.children;return(0,n.jsx)("article",{children:t})},a:function(e){var t=e.children,r=e.href;return(0,n.jsx)(o.default,{href:r||"/",scroll:!1,children:(0,n.jsx)("a",{className:"border-b",children:t})})},table:function(e){var t=e.children;return(0,n.jsx)("table",{className:"mx-auto mt-lg w-full max-w-2xl table-fixed",children:t})},th:function(e){var t=e.children;return(0,n.jsx)("th",{className:"flex flex-1 py-sm pr-gutter text-left text-sm font-semibold uppercase last-of-type:pr-0",children:t})},tbody:function(e){var t=e.children;return(0,n.jsx)("tbody",{children:t})},tr:function(e){var t=e.children;return(0,n.jsx)("tr",{className:"flex border-b border-white/10",children:t})},td:function(e){var t=e.children;return(0,n.jsx)("td",{className:"flex-1 items-start py-sm pr-gutter text-sm last-of-type:pr-0",children:t})},img:function(e){var t=e.alt,r=e.src;return(0,n.jsx)("img",{src:r,alt:t,className:"my-xl mx-auto block w-full max-w-4xl"})},h1:function(e){var t=e.children;return(0,n.jsx)("h1",{id:a(t),className:"mx-auto mb-md w-full max-w-2xl text-2xl font-bold uppercase tablet:text-3xl",children:(0,n.jsx)("span",{className:"relative",children:t})})},h2:function(e){var t=e.children;return(0,n.jsx)("h2",{id:a(t),className:"mx-auto mt-xl mb-md w-full max-w-2xl text-xl font-bold uppercase tablet:text-2xl",children:t})},h3:function(e){var t=e.children;return(0,n.jsx)("h3",{id:a(t),className:"mx-auto mt-lg mb-sm w-full max-w-2xl text-lg font-semibold uppercase",children:t})},h4:function(e){var t=e.children;return(0,n.jsx)("h3",{id:a(t),className:"mx-auto mt-lg mb-sm w-full max-w-2xl text-lg font-semibold uppercase",children:t})},p:function(e){var t=e.children;return(0,n.jsx)("p",{className:"mx-auto mb-sm w-full max-w-2xl text-base",children:t})},blockquote:function(e){var t=e.children,r=d(l.Children.toArray(t).filter((function(e){return"\n"!==e})),1)[0];return(0,n.jsx)("p",{className:"mx-auto mt-md mb-lg w-full max-w-2xl text-xs italic text-white/50",children:r.props.children})},ol:function(e){var t=e.children;return(0,n.jsx)("ol",{className:"mx-auto mt-md mb-md w-full max-w-2xl list-decimal pl-lg",children:t})},ul:function(e){var t=e.children;return(0,n.jsx)("ul",{className:"mx-auto mb-md w-full max-w-2xl list-disc pl-sm",children:t})},li:function(e){var t=e.children;return(0,n.jsx)("li",{className:"mb-xs pl-sm",children:t})}},h=r(9864),p=r(7055),b=r(7095),v=r.n(b);function w(e){var t=e.children.reduce((function(e,t){if((0,h.isElement)(t)&&(0,c.HD)(t.type)&&["h1","h2","h3","h4","h5"].includes(t.type)){var r=t.props.children,n="#".concat(a(r)),l=Number(t.type.charAt(1));e.push({text:r,href:n,depth:l})}return e}),[]);return(0,n.jsxs)("nav",{"aria-label":"Table of Contents",className:(0,p.A)(v().toc_sidebar,"sticky top-header overflow-y-auto border-t border-white/10 pt-md"),children:[(0,n.jsx)("div",{className:"mb-md text-xs font-semibold uppercase",children:"Table of Contents"}),(0,n.jsx)("ul",{className:"toc",children:t.map((function(e,t){return 1===e.depth?(0,n.jsx)("li",{className:(0,p.A)(v().counter,v().toc_counter,"mt-sm flex items-center border-t border-white/10 py-xs"),children:(0,n.jsx)("a",{href:e.href,className:"text-[14px] font-semibold uppercase",children:e.text})},t):2===e.depth?(0,n.jsx)("li",{className:(0,p.A)(v().l_decorator,"ml-[2.3334rem] mb-[0.25em] flex items-center text-[12px]"),children:(0,n.jsx)("a",{href:e.href,className:"text-white/70 hover:text-white/90",children:e.text})},e.href):void 0}))})]})}function j(e){var t=e.children,r=t.type;return(0,n.jsxs)("article",{className:"wrapper gap-x-gutter tablet:grid tablet:grid-cols-12 laptop:pt-xl",children:[(0,n.jsx)("div",{className:"hidden tablet:col-span-4 tablet:block desktop:col-span-3",children:(0,n.jsx)(w,{children:r().props.children})}),(0,n.jsx)("div",{className:"tablet:col-span-8 desktop:col-span-9",children:(0,n.jsx)(s.Zo,{components:y,children:t})})]})}var y={h1:function(e){var t=e.children;return(0,n.jsx)("h1",{id:a(t),className:(0,p.A)(v().section_counter,"peer relative mb-sm mt-xl border-t border-white/10 pt-xl text-2xl font-bold uppercase first:mt-0 tablet:text-3xl"),children:(0,n.jsx)("span",{className:(0,p.A)(v().counter,v().section_counter_attach,"relative max-w-2xl"),children:t})})},h2:function(e){var t=e.children;return(0,n.jsx)("h2",{id:a(t),className:"mt-xl mb-sm max-w-2xl border-t border-white/10 pt-md text-xl font-black uppercase tablet:text-2xl",children:(0,n.jsxs)("span",{className:v().l_decorator,children:[" ",t]})})},h3:function(e){var t=e.children;return(0,n.jsx)("h3",{id:a(t),className:"mt-lg mb-sm w-full max-w-2xl border-t border-white/10 pt-md text-lg font-semibold uppercase",children:t})},p:function(e){var t=e.children;return(0,n.jsx)("p",{className:"mb-sm w-full max-w-2xl text-base",children:t})},hr:function(){return(0,n.jsx)("hr",{className:"mb-md border-t-white/20"})},ol:function(e){var t=e.children;return(0,n.jsx)("ol",{className:"mt-md mb-md w-full max-w-2xl list-decimal pl-md",children:t})},ul:function(e){var t=e.children;return(0,n.jsx)("ul",{className:"mt-md mb-md w-full max-w-2xl list-disc pl-md",children:t})},li:function(e){var t=e.children;return(0,n.jsx)("li",{className:"mb-xs",children:t})}}},3239:function(e,t,r){"use strict";r.d(t,{e:function(){return c}});var n=r(5893),l=r(2962);function c(e){var t=e.default;return function(){return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(l.PB,{title:e.title,description:e.description}),(0,n.jsx)(t,{})]})}}},7095:function(e){e.exports={toc_sidebar:"articles_toc_sidebar__F4fbz",counter:"articles_counter__joUem",section_counter:"articles_section_counter__X8tln",toc_counter:"articles_toc_counter__w0CT9",section_counter_attach:"articles_section_counter_attach__eOkps",l_decorator:"articles_l_decorator__pJVL_"}},9921:function(e,t){"use strict";var r=60103,n=60106,l=60107,c=60108,a=60114,s=60109,o=60110,i=60112,u=60113,m=60120,d=60115,x=60116,f=60121,h=60122,p=60117,b=60129,v=60131;if("function"===typeof Symbol&&Symbol.for){var w=Symbol.for;r=w("react.element"),n=w("react.portal"),l=w("react.fragment"),c=w("react.strict_mode"),a=w("react.profiler"),s=w("react.provider"),o=w("react.context"),i=w("react.forward_ref"),u=w("react.suspense"),m=w("react.suspense_list"),d=w("react.memo"),x=w("react.lazy"),f=w("react.block"),h=w("react.server.block"),p=w("react.fundamental"),b=w("react.debug_trace_mode"),v=w("react.legacy_hidden")}function j(e){if("object"===typeof e&&null!==e){var t=e.$$typeof;switch(t){case r:switch(e=e.type){case l:case a:case c:case u:case m:return e;default:switch(e=e&&e.$$typeof){case o:case i:case x:case d:case s:return e;default:return t}}case n:return t}}}t.isElement=function(e){return"object"===typeof e&&null!==e&&e.$$typeof===r}},9864:function(e,t,r){"use strict";e.exports=r(9921)},1151:function(e,t,r){"use strict";r.d(t,{ah:function(){return c},Zo:function(){return s}});var n=r(7294);const l=n.createContext({});function c(e){const t=n.useContext(l);return n.useMemo((()=>"function"===typeof e?e(t):{...t,...e}),[t,e])}const a={};function s({components:e,children:t,disableParentContext:r}){let s=c(e);return r&&(s=e||a),n.createElement(l.Provider,{value:s},t)}}}]);