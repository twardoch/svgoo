import e from"string_decoder"
const t=Symbol(),n=(e,r,o)=>{const i=r[e.type]
if(i?.enter){if(i.enter(e,o)===t)return}if("root"===e.type)for(const t of e.children)n(t,r,e)
if("element"===e.type&&o.children.includes(e))for(const t of e.children)n(t,r,e)
i?.exit&&i.exit(e,o)},r=(e,t,r,o,i)=>{for(const a of r){const r=o?.[a.name]
if(!1===r)continue
const s={...a.params,...i,...r},l=a.fn(e,s,t)
null!=l&&n(e,l)}}
var o
!function(e){e.Root="root",e.Text="text",e.Directive="directive",e.Comment="comment",e.Script="script",e.Style="style",e.Tag="tag",e.CDATA="cdata",e.Doctype="doctype"}(o||(o={}))
const i=o.Root,a=o.Text,s=o.Directive,l=o.Comment,c=o.Script,u=o.Style,h=o.Tag,d=o.CDATA,p=o.Doctype
function m(e){return(t=e).type===o.Tag||t.type===o.Script||t.type===o.Style
var t}function f(e){return e.type===o.CDATA}function g(e){return e.type===o.Text}function b(e){return e.type===o.Comment}function y(e){return Object.prototype.hasOwnProperty.call(e,"children")}const k=/["&'<>$\x80-\uFFFF]/g,v=new Map([[34,"&quot;"],[38,"&amp;"],[39,"&apos;"],[60,"&lt;"],[62,"&gt;"]]),w=null!=String.prototype.codePointAt?(e,t)=>e.codePointAt(t):(e,t)=>0xd800==(0xfc00&e.charCodeAt(t))?0x400*(e.charCodeAt(t)-0xd800)+e.charCodeAt(t+1)-0xdc00+0x10000:e.charCodeAt(t)
function x(e){let t,n="",r=0
for(;null!==(t=k.exec(e));){const o=t.index,i=e.charCodeAt(o),a=v.get(i)
void 0!==a?(n+=e.substring(r,o)+a,r=o+1):(n+=`${e.substring(r,o)}&#x${w(e,o).toString(16)};`,r=k.lastIndex+=Number(0xd800==(0xfc00&i)))}return n+e.substr(r)}function S(e,t){return function(n){let r,o=0,i=""
for(;r=e.exec(n);)o!==r.index&&(i+=n.substring(o,r.index)),i+=t.get(r[0].charCodeAt(0)),o=r.index+1
return i+n.substring(o)}}const C=S(/["&\u00A0]/g,new Map([[34,"&quot;"],[38,"&amp;"],[160,"&nbsp;"]])),A=S(/[&<>\u00A0]/g,new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[160,"&nbsp;"]])),_=new Map(["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","textPath"].map(e=>[e.toLowerCase(),e])),z=new Map(["definitionURL","attributeName","attributeType","baseFrequency","baseProfile","calcMode","clipPathUnits","diffuseConstant","edgeMode","filterUnits","glyphRef","gradientTransform","gradientUnits","kernelMatrix","kernelUnitLength","keyPoints","keySplines","keyTimes","lengthAdjust","limitingConeAngle","markerHeight","markerUnits","markerWidth","maskContentUnits","maskUnits","numOctaves","pathLength","patternContentUnits","patternTransform","patternUnits","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","refX","refY","repeatCount","repeatDur","requiredExtensions","requiredFeatures","specularConstant","specularExponent","spreadMethod","startOffset","stdDeviation","stitchTiles","surfaceScale","systemLanguage","tableValues","targetX","targetY","textLength","viewBox","viewTarget","xChannelSelector","yChannelSelector","zoomAndPan"].map(e=>[e.toLowerCase(),e])),T=new Set(["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])
function E(e){return e.replace(/"/g,"&quot;")}const O=new Set(["area","base","basefont","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr"])
function P(e,t={}){const n="length"in e?e:[e]
let r=""
for(let e=0;e<n.length;e++)r+=L(n[e],t)
return r}function L(e,t){switch(e.type){case i:return P(e.children,t)
case p:case s:return`<${e.data}>`
case l:return function(e){return`\x3c!--${e.data}--\x3e`}(e)
case d:return function(e){return`<![CDATA[${e.children[0].data}]]>`}(e)
case c:case u:case h:return function(e,t){var n
"foreign"===t.xmlMode&&(e.name=null!==(n=_.get(e.name))&&void 0!==n?n:e.name,e.parent&&N.has(e.parent.name)&&(t={...t,xmlMode:!1}))
!t.xmlMode&&D.has(e.name)&&(t={...t,xmlMode:"foreign"})
let r=`<${e.name}`
const o=function(e,t){var n
if(!e)return
const r=!1===(null!==(n=t.encodeEntities)&&void 0!==n?n:t.decodeEntities)?E:t.xmlMode||"utf8"!==t.encodeEntities?x:C
return Object.keys(e).map(n=>{var o,i
const a=null!==(o=e[n])&&void 0!==o?o:""
return"foreign"===t.xmlMode&&(n=null!==(i=z.get(n))&&void 0!==i?i:n),t.emptyAttrs||t.xmlMode||""!==a?`${n}="${r(a)}"`:n}).join(" ")}(e.attribs,t)
o&&(r+=` ${o}`)
0===e.children.length&&(t.xmlMode?!1!==t.selfClosingTags:t.selfClosingTags&&O.has(e.name))?(t.xmlMode||(r+=" "),r+="/>"):(r+=">",e.children.length>0&&(r+=P(e.children,t)),!t.xmlMode&&O.has(e.name)||(r+=`</${e.name}>`))
return r}(e,t)
case a:return function(e,t){var n
let r=e.data||""
!1===(null!==(n=t.encodeEntities)&&void 0!==n?n:t.decodeEntities)||!t.xmlMode&&e.parent&&T.has(e.parent.name)||(r=t.xmlMode||"utf8"!==t.encodeEntities?x(r):A(r))
return r}(e,t)}}const N=new Set(["mi","mo","mn","ms","mtext","annotation-xml","foreignObject","desc","title"]),D=new Set(["svg","math"])
function j(e,t){return P(e,t)}function M(e){return Array.isArray(e)?e.map(M).join(""):y(e)&&!b(e)?M(e.children):g(e)?e.data:""}function I(e){return y(e)?e.children:[]}function R(e){return e.parent||null}function F(e){if(e.prev&&(e.prev.next=e.next),e.next&&(e.next.prev=e.prev),e.parent){const t=e.parent.children,n=t.lastIndexOf(e)
n>=0&&t.splice(n,1)}e.next=null,e.prev=null,e.parent=null}function B(e,t,n=!0,r=1/0){return q(e,Array.isArray(t)?t:[t],n,r)}function q(e,t,n,r){const o=[],i=[Array.isArray(t)?t:[t]],a=[0]
for(;;){if(a[0]>=i[0].length){if(1===a.length)return o
i.shift(),a.shift()
continue}const t=i[0][a[0]++]
if(e(t)&&(o.push(t),--r<=0))return o
n&&y(t)&&t.children.length>0&&(a.unshift(0),i.unshift(t.children))}}function G(e,t,n=!0){const r=Array.isArray(t)?t:[t]
for(let t=0;t<r.length;t++){const o=r[t]
if(m(o)&&e(o))return o
if(n&&y(o)&&o.children.length>0){const t=G(e,o.children,!0)
if(t)return t}}return null}const U={tag_name:e=>"function"==typeof e?t=>m(t)&&e(t.name):"*"===e?m:t=>m(t)&&t.name===e,tag_type:e=>"function"==typeof e?t=>e(t.type):t=>t.type===e,tag_contains:e=>"function"==typeof e?t=>g(t)&&e(t.data):t=>g(t)&&t.data===e}
function W(e,t){return"function"==typeof t?n=>m(n)&&t(n.attribs[e]):n=>m(n)&&n.attribs[e]===t}function V(e,t){return n=>e(n)||t(n)}function $(e){const t=Object.keys(e).map(t=>{const n=e[t]
return Object.prototype.hasOwnProperty.call(U,t)?U[t](n):W(t,n)})
return 0===t.length?null:t.reduce(V)}function Y(e,t,n=!0,r=1/0){return B(U.tag_name(e),t,n,r)}var X
function H(e,t){const n=[],r=[]
if(e===t)return 0
let o=y(e)?e:e.parent
for(;o;)n.unshift(o),o=o.parent
for(o=y(t)?t:t.parent;o;)r.unshift(o),o=o.parent
const i=Math.min(n.length,r.length)
let a=0
for(;a<i&&n[a]===r[a];)a++
if(0===a)return X.DISCONNECTED
const s=n[a-1],l=s.children,c=n[a],u=r[a]
return l.indexOf(c)>l.indexOf(u)?s===t?X.FOLLOWING|X.CONTAINED_BY:X.FOLLOWING:s===e?X.PRECEDING|X.CONTAINS:X.PRECEDING}!function(e){e[e.DISCONNECTED=1]="DISCONNECTED",e[e.PRECEDING=2]="PRECEDING",e[e.FOLLOWING=4]="FOLLOWING",e[e.CONTAINS=8]="CONTAINS",e[e.CONTAINED_BY=16]="CONTAINED_BY"}(X||(X={}))
const Q=["url","type","lang"],K=["fileSize","bitrate","framerate","samplingrate","channels","duration","height","width"]
function Z(e){return Y("media:content",e).map(e=>{const{attribs:t}=e,n={medium:t.medium,isDefault:!!t.isDefault}
for(const e of Q)t[e]&&(n[e]=t[e])
for(const e of K)t[e]&&(n[e]=parseInt(t[e],10))
return t.expression&&(n.expression=t.expression),n})}function J(e,t){return Y(e,t,!0,1)[0]}function ee(e,t,n=!1){return M(Y(e,t,n,1)).trim()}function te(e,t,n,r,o=!1){const i=ee(n,r,o)
i&&(e[t]=i)}function ne(e){return"rss"===e||"feed"===e||"rdf:RDF"===e}var re=Object.freeze({__proto__:null,get DocumentPosition(){return X},append:function(e,t){F(t)
const{parent:n}=e,r=e.next
if(t.next=r,t.prev=e,e.next=t,t.parent=n,r){if(r.prev=t,n){const e=n.children
e.splice(e.lastIndexOf(r),0,t)}}else n&&n.children.push(t)},appendChild:function(e,t){if(F(t),t.next=null,t.parent=e,e.children.push(t)>1){const n=e.children[e.children.length-2]
n.next=t,t.prev=n}else t.prev=null},compareDocumentPosition:H,existsOne:function e(t,n){return(Array.isArray(n)?n:[n]).some(n=>m(n)&&t(n)||y(n)&&e(t,n.children))},filter:B,find:q,findAll:function(e,t){const n=[],r=[Array.isArray(t)?t:[t]],o=[0]
for(;;){if(o[0]>=r[0].length){if(1===r.length)return n
r.shift(),o.shift()
continue}const t=r[0][o[0]++]
m(t)&&e(t)&&n.push(t),y(t)&&t.children.length>0&&(o.unshift(0),r.unshift(t.children))}},findOne:G,findOneChild:function(e,t){return t.find(e)},getAttributeValue:function(e,t){var n
return null===(n=e.attribs)||void 0===n?void 0:n[t]},getChildren:I,getElementById:function(e,t,n=!0){return Array.isArray(t)||(t=[t]),G(W("id",e),t,n)},getElements:function(e,t,n,r=1/0){const o=$(e)
return o?B(o,t,n,r):[]},getElementsByClassName:function(e,t,n=!0,r=1/0){return B(W("class",e),t,n,r)},getElementsByTagName:Y,getElementsByTagType:function(e,t,n=!0,r=1/0){return B(U.tag_type(e),t,n,r)},getFeed:function(e){const t=J(ne,e)
return t?"feed"===t.name?function(e){var t
const n=e.children,r={type:"atom",items:Y("entry",n).map(e=>{var t
const{children:n}=e,r={media:Z(n)}
te(r,"id","id",n),te(r,"title","title",n)
const o=null===(t=J("link",n))||void 0===t?void 0:t.attribs.href
o&&(r.link=o)
const i=ee("summary",n)||ee("content",n)
i&&(r.description=i)
const a=ee("updated",n)
return a&&(r.pubDate=new Date(a)),r})}
te(r,"id","id",n),te(r,"title","title",n)
const o=null===(t=J("link",n))||void 0===t?void 0:t.attribs.href
o&&(r.link=o)
te(r,"description","subtitle",n)
const i=ee("updated",n)
i&&(r.updated=new Date(i))
return te(r,"author","email",n,!0),r}(t):function(e){var t,n
const r=null!==(n=null===(t=J("channel",e.children))||void 0===t?void 0:t.children)&&void 0!==n?n:[],o={type:e.name.substr(0,3),id:"",items:Y("item",e.children).map(e=>{const{children:t}=e,n={media:Z(t)}
te(n,"id","guid",t),te(n,"title","title",t),te(n,"link","link",t),te(n,"description","description",t)
const r=ee("pubDate",t)||ee("dc:date",t)
return r&&(n.pubDate=new Date(r)),n})}
te(o,"title","title",r),te(o,"link","link",r),te(o,"description","description",r)
const i=ee("lastBuildDate",r)
i&&(o.updated=new Date(i))
return te(o,"author","managingEditor",r,!0),o}(t):null},getInnerHTML:function(e,t){return y(e)?e.children.map(e=>j(e,t)).join(""):""},getName:function(e){return e.name},getOuterHTML:j,getParent:R,getSiblings:function(e){const t=R(e)
if(null!=t)return I(t)
const n=[e]
let{prev:r,next:o}=e
for(;null!=r;)n.unshift(r),({prev:r}=r)
for(;null!=o;)n.push(o),({next:o}=o)
return n},getText:function e(t){return Array.isArray(t)?t.map(e).join(""):m(t)?"br"===t.name?"\n":e(t.children):f(t)?e(t.children):g(t)?t.data:""},hasAttrib:function(e,t){return null!=e.attribs&&Object.prototype.hasOwnProperty.call(e.attribs,t)&&null!=e.attribs[t]},hasChildren:y,innerText:function e(t){return Array.isArray(t)?t.map(e).join(""):y(t)&&(t.type===o.Tag||f(t))?e(t.children):g(t)?t.data:""},isCDATA:f,isComment:b,isDocument:function(e){return e.type===o.Root},isTag:m,isText:g,nextElementSibling:function(e){let{next:t}=e
for(;null!==t&&!m(t);)({next:t}=t)
return t},prepend:function(e,t){F(t)
const{parent:n}=e
if(n){const r=n.children
r.splice(r.indexOf(e),0,t)}e.prev&&(e.prev.next=t),t.parent=n,t.prev=e.prev,t.next=e,e.prev=t},prependChild:function(e,t){if(F(t),t.parent=e,t.prev=null,1!==e.children.unshift(t)){const n=e.children[1]
n.prev=t,t.next=n}else t.next=null},prevElementSibling:function(e){let{prev:t}=e
for(;null!==t&&!m(t);)({prev:t}=t)
return t},removeElement:F,removeSubsets:function(e){let t=e.length
for(;--t>=0;){const n=e[t]
if(t>0&&e.lastIndexOf(n,t-1)>=0)e.splice(t,1)
else for(let r=n.parent;r;r=r.parent)if(e.includes(r)){e.splice(t,1)
break}}return e},replaceElement:function(e,t){const n=t.prev=e.prev
n&&(n.next=t)
const r=t.next=e.next
r&&(r.prev=t)
const o=t.parent=e.parent
if(o){const n=o.children
n[n.lastIndexOf(e)]=t,e.parent=null}},testElement:function(e,t){const n=$(e)
return!n||n(t)},textContent:M,uniqueSort:function(e){return e=e.filter((e,t,n)=>!n.includes(e,t+1)),e.sort((e,t)=>{const n=H(e,t)
return n&X.PRECEDING?-1:n&X.FOLLOWING?1:0}),e}})
function oe(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ie,ae,se=oe({trueFunc:function(){return!0},falseFunc:function(){return!1}})
!function(e){e.Attribute="attribute",e.Pseudo="pseudo",e.PseudoElement="pseudo-element",e.Tag="tag",e.Universal="universal",e.Adjacent="adjacent",e.Child="child",e.Descendant="descendant",e.Parent="parent",e.Sibling="sibling",e.ColumnCombinator="column-combinator"}(ie||(ie={})),function(e){e.Any="any",e.Element="element",e.End="end",e.Equals="equals",e.Exists="exists",e.Hyphen="hyphen",e.Not="not",e.Start="start"}(ae||(ae={}))
const le=/^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,ce=/\\([\da-f]{1,6}\s?|(\s)|.)/gi,ue=new Map([[126,ae.Element],[94,ae.Start],[36,ae.End],[42,ae.Any],[33,ae.Not],[124,ae.Hyphen]]),he=new Set(["has","not","matches","is","where","host","host-context"])
function de(e){switch(e.type){case ie.Adjacent:case ie.Child:case ie.Descendant:case ie.Parent:case ie.Sibling:case ie.ColumnCombinator:return!0
default:return!1}}const pe=new Set(["contains","icontains"])
function me(e,t,n){const r=parseInt(t,16)-0x10000
return r!=r||n?t:r<0?String.fromCharCode(r+0x10000):String.fromCharCode(r>>10|0xd800,0x3ff&r|0xdc00)}function fe(e){return e.replace(ce,me)}function ge(e){return 39===e||34===e}function be(e){return 32===e||9===e||10===e||12===e||13===e}function ye(e){const t=[],n=ke(t,`${e}`,0)
if(n<e.length)throw new Error(`Unmatched selector: ${e.slice(n)}`)
return t}function ke(e,t,n){let r=[]
function o(e){const r=t.slice(n+e).match(le)
if(!r)throw new Error(`Expected name, found ${t.slice(n)}`)
const[o]=r
return n+=e+o.length,fe(o)}function i(e){for(n+=e;n<t.length&&be(t.charCodeAt(n));)n++}function a(){const e=n+=1
let r=1
for(;r>0&&n<t.length;n++)40!==t.charCodeAt(n)||s(n)?41!==t.charCodeAt(n)||s(n)||r--:r++
if(r)throw new Error("Parenthesis not matched")
return fe(t.slice(e,n-1))}function s(e){let n=0
for(;92===t.charCodeAt(--e);)n++
return!(1&~n)}function l(){if(r.length>0&&de(r[r.length-1]))throw new Error("Did not expect successive traversals.")}function c(e){if(r.length>0&&r[r.length-1].type===ie.Descendant)return r[r.length-1].type=e,void 0
l(),r.push({type:e})}function u(e,t){r.push({type:ie.Attribute,name:e,action:t,value:o(1),namespace:null,ignoreCase:"quirks"})}function h(){if(r.length&&r[r.length-1].type===ie.Descendant&&r.pop(),0===r.length)throw new Error("Empty sub-selector")
e.push(r)}if(i(0),t.length===n)return n
e:for(;n<t.length;){const e=t.charCodeAt(n)
switch(e){case 32:case 9:case 10:case 12:case 13:0!==r.length&&r[0].type===ie.Descendant||(l(),r.push({type:ie.Descendant})),i(1)
break
case 62:c(ie.Child),i(1)
break
case 60:c(ie.Parent),i(1)
break
case 126:c(ie.Sibling),i(1)
break
case 43:c(ie.Adjacent),i(1)
break
case 46:u("class",ae.Element)
break
case 35:u("id",ae.Equals)
break
case 91:{let e
i(1)
let a=null
124===t.charCodeAt(n)?e=o(1):t.startsWith("*|",n)?(a="*",e=o(2)):(e=o(0),124===t.charCodeAt(n)&&61!==t.charCodeAt(n+1)&&(a=e,e=o(1))),i(0)
let l=ae.Exists
const c=ue.get(t.charCodeAt(n))
if(c){if(l=c,61!==t.charCodeAt(n+1))throw new Error("Expected `=`")
i(2)}else 61===t.charCodeAt(n)&&(l=ae.Equals,i(1))
let u="",h=null
if("exists"!==l){if(ge(t.charCodeAt(n))){const e=t.charCodeAt(n)
let r=n+1
for(;r<t.length&&(t.charCodeAt(r)!==e||s(r));)r+=1
if(t.charCodeAt(r)!==e)throw new Error("Attribute value didn't end")
u=fe(t.slice(n+1,r)),n=r+1}else{const e=n
for(;n<t.length&&(!be(t.charCodeAt(n))&&93!==t.charCodeAt(n)||s(n));)n+=1
u=fe(t.slice(e,n))}i(0)
const e=0x20|t.charCodeAt(n)
115===e?(h=!1,i(1)):105===e&&(h=!0,i(1))}if(93!==t.charCodeAt(n))throw new Error("Attribute selector didn't terminate")
n+=1
const d={type:ie.Attribute,name:e,action:l,value:u,namespace:a,ignoreCase:h}
r.push(d)
break}case 58:{if(58===t.charCodeAt(n+1)){r.push({type:ie.PseudoElement,name:o(2).toLowerCase(),data:40===t.charCodeAt(n)?a():null})
continue}const e=o(1).toLowerCase()
let i=null
if(40===t.charCodeAt(n))if(he.has(e)){if(ge(t.charCodeAt(n+1)))throw new Error(`Pseudo-selector ${e} cannot be quoted`)
if(i=[],n=ke(i,t,n+1),41!==t.charCodeAt(n))throw new Error(`Missing closing parenthesis in :${e} (${t})`)
n+=1}else{if(i=a(),pe.has(e)){const e=i.charCodeAt(0)
e===i.charCodeAt(i.length-1)&&ge(e)&&(i=i.slice(1,-1))}i=fe(i)}r.push({type:ie.Pseudo,name:e,data:i})
break}case 44:h(),r=[],i(1)
break
default:{if(t.startsWith("/*",n)){const e=t.indexOf("*/",n+2)
if(e<0)throw new Error("Comment was not terminated")
n=e+2,0===r.length&&i(0)
break}let a,s=null
if(42===e)n+=1,a="*"
else if(124===e){if(a="",124===t.charCodeAt(n+1)){c(ie.ColumnCombinator),i(2)
break}}else{if(!le.test(t.slice(n)))break e
a=o(0)}124===t.charCodeAt(n)&&124!==t.charCodeAt(n+1)&&(s=a,42===t.charCodeAt(n+1)?(a="*",n+=2):a=o(1)),r.push("*"===a?{type:ie.Universal,namespace:s}:{type:ie.Tag,name:a,namespace:s})}}}return h(),n}const ve=new Map([[ie.Universal,50],[ie.Tag,30],[ie.Attribute,1],[ie.Pseudo,0]])
function we(e){return!ve.has(e.type)}const xe=new Map([[ae.Exists,10],[ae.Equals,8],[ae.Not,7],[ae.Start,6],[ae.End,6],[ae.Any,5]])
function Se(e){const t=e.map(Ce)
for(let n=1;n<e.length;n++){const r=t[n]
if(!(r<0))for(let o=n-1;o>=0&&r<t[o];o--){const n=e[o+1]
e[o+1]=e[o],e[o]=n,t[o+1]=t[o],t[o]=r}}}function Ce(e){var t,n
let r=null!==(t=ve.get(e.type))&&void 0!==t?t:-1
return e.type===ie.Attribute?(r=null!==(n=xe.get(e.action))&&void 0!==n?n:4,e.action===ae.Equals&&"id"===e.name&&(r=9),e.ignoreCase&&(r>>=1)):e.type===ie.Pseudo&&(e.data?"has"===e.name||"contains"===e.name?r=0:Array.isArray(e.data)?(r=Math.min(...e.data.map(e=>Math.min(...e.map(Ce)))),r<0&&(r=0)):r=2:r=3),r}const Ae=/[-[\]{}()*+?.,\\^$|#\s]/g
function _e(e){return e.replace(Ae,"\\$&")}const ze=new Set(["accept","accept-charset","align","alink","axis","bgcolor","charset","checked","clear","codetype","color","compact","declare","defer","dir","direction","disabled","enctype","face","frame","hreflang","http-equiv","lang","language","link","media","method","multiple","nohref","noresize","noshade","nowrap","readonly","rel","rev","rules","scope","scrolling","selected","shape","target","text","type","valign","valuetype","vlink"])
function Te(e,t){return"boolean"==typeof e.ignoreCase?e.ignoreCase:"quirks"===e.ignoreCase?!!t.quirksMode:!t.xmlMode&&ze.has(e.name)}const Ee={equals(e,t,n){const{adapter:r}=n,{name:o}=t
let{value:i}=t
return Te(t,n)?(i=i.toLowerCase(),t=>{const n=r.getAttributeValue(t,o)
return null!=n&&n.length===i.length&&n.toLowerCase()===i&&e(t)}):t=>r.getAttributeValue(t,o)===i&&e(t)},hyphen(e,t,n){const{adapter:r}=n,{name:o}=t
let{value:i}=t
const a=i.length
return Te(t,n)?(i=i.toLowerCase(),function(t){const n=r.getAttributeValue(t,o)
return null!=n&&(n.length===a||"-"===n.charAt(a))&&n.substr(0,a).toLowerCase()===i&&e(t)}):function(t){const n=r.getAttributeValue(t,o)
return null!=n&&(n.length===a||"-"===n.charAt(a))&&n.substr(0,a)===i&&e(t)}},element(e,t,n){const{adapter:r}=n,{name:o,value:i}=t
if(/\s/.test(i))return se.falseFunc
const a=new RegExp(`(?:^|\\s)${_e(i)}(?:$|\\s)`,Te(t,n)?"i":"")
return function(t){const n=r.getAttributeValue(t,o)
return null!=n&&n.length>=i.length&&a.test(n)&&e(t)}},exists:(e,{name:t},{adapter:n})=>r=>n.hasAttrib(r,t)&&e(r),start(e,t,n){const{adapter:r}=n,{name:o}=t
let{value:i}=t
const a=i.length
return 0===a?se.falseFunc:Te(t,n)?(i=i.toLowerCase(),t=>{const n=r.getAttributeValue(t,o)
return null!=n&&n.length>=a&&n.substr(0,a).toLowerCase()===i&&e(t)}):t=>{var n
return!!(null===(n=r.getAttributeValue(t,o))||void 0===n?void 0:n.startsWith(i))&&e(t)}},end(e,t,n){const{adapter:r}=n,{name:o}=t
let{value:i}=t
const a=-i.length
return 0===a?se.falseFunc:Te(t,n)?(i=i.toLowerCase(),t=>{var n
return(null===(n=r.getAttributeValue(t,o))||void 0===n?void 0:n.substr(a).toLowerCase())===i&&e(t)}):t=>{var n
return!!(null===(n=r.getAttributeValue(t,o))||void 0===n?void 0:n.endsWith(i))&&e(t)}},any(e,t,n){const{adapter:r}=n,{name:o,value:i}=t
if(""===i)return se.falseFunc
if(Te(t,n)){const t=new RegExp(_e(i),"i")
return function(n){const a=r.getAttributeValue(n,o)
return null!=a&&a.length>=i.length&&t.test(a)&&e(n)}}return t=>{var n
return!!(null===(n=r.getAttributeValue(t,o))||void 0===n?void 0:n.includes(i))&&e(t)}},not(e,t,n){const{adapter:r}=n,{name:o}=t
let{value:i}=t
return""===i?t=>!!r.getAttributeValue(t,o)&&e(t):Te(t,n)?(i=i.toLowerCase(),t=>{const n=r.getAttributeValue(t,o)
return(null==n||n.length!==i.length||n.toLowerCase()!==i)&&e(t)}):t=>r.getAttributeValue(t,o)!==i&&e(t)}},Oe=new Set([9,10,12,13,32]),Pe="0".charCodeAt(0),Le="9".charCodeAt(0)
function Ne(e){return function(e){const t=e[0],n=e[1]-1
if(n<0&&t<=0)return se.falseFunc
if(-1===t)return e=>e<=n
if(0===t)return e=>e===n
if(1===t)return n<0?se.trueFunc:e=>e>=n
const r=Math.abs(t),o=(n%r+r)%r
return t>1?e=>e>=n&&e%r===o:e=>e<=n&&e%r===o}(function(e){if("even"===(e=e.trim().toLowerCase()))return[2,0]
if("odd"===e)return[2,1]
let t=0,n=0,r=i(),o=a()
if(t<e.length&&"n"===e.charAt(t)&&(t++,n=r*(null!=o?o:1),s(),t<e.length?(r=i(),s(),o=a()):r=o=0),null===o||t<e.length)throw new Error(`n-th rule couldn't be parsed ('${e}')`)
return[n,r*o]
function i(){return"-"===e.charAt(t)?(t++,-1):("+"===e.charAt(t)&&t++,1)}function a(){const n=t
let r=0
for(;t<e.length&&e.charCodeAt(t)>=Pe&&e.charCodeAt(t)<=Le;)r=10*r+(e.charCodeAt(t)-Pe),t++
return t===n?null:r}function s(){for(;t<e.length&&Oe.has(e.charCodeAt(t));)t++}}(e))}function De(e,t){return n=>{const r=t.getParent(n)
return null!=r&&t.isTag(r)&&e(n)}}const je={contains:(e,t,{adapter:n})=>function(r){return e(r)&&n.getText(r).includes(t)},icontains(e,t,{adapter:n}){const r=t.toLowerCase()
return function(t){return e(t)&&n.getText(t).toLowerCase().includes(r)}},"nth-child"(e,t,{adapter:n,equals:r}){const o=Ne(t)
return o===se.falseFunc?se.falseFunc:o===se.trueFunc?De(e,n):function(t){const i=n.getSiblings(t)
let a=0
for(let e=0;e<i.length&&!r(t,i[e]);e++)n.isTag(i[e])&&a++
return o(a)&&e(t)}},"nth-last-child"(e,t,{adapter:n,equals:r}){const o=Ne(t)
return o===se.falseFunc?se.falseFunc:o===se.trueFunc?De(e,n):function(t){const i=n.getSiblings(t)
let a=0
for(let e=i.length-1;e>=0&&!r(t,i[e]);e--)n.isTag(i[e])&&a++
return o(a)&&e(t)}},"nth-of-type"(e,t,{adapter:n,equals:r}){const o=Ne(t)
return o===se.falseFunc?se.falseFunc:o===se.trueFunc?De(e,n):function(t){const i=n.getSiblings(t)
let a=0
for(let e=0;e<i.length;e++){const o=i[e]
if(r(t,o))break
n.isTag(o)&&n.getName(o)===n.getName(t)&&a++}return o(a)&&e(t)}},"nth-last-of-type"(e,t,{adapter:n,equals:r}){const o=Ne(t)
return o===se.falseFunc?se.falseFunc:o===se.trueFunc?De(e,n):function(t){const i=n.getSiblings(t)
let a=0
for(let e=i.length-1;e>=0;e--){const o=i[e]
if(r(t,o))break
n.isTag(o)&&n.getName(o)===n.getName(t)&&a++}return o(a)&&e(t)}},root:(e,t,{adapter:n})=>t=>{const r=n.getParent(t)
return(null==r||!n.isTag(r))&&e(t)},scope(e,t,n,r){const{equals:o}=n
return r&&0!==r.length?1===r.length?t=>o(r[0],t)&&e(t):t=>r.includes(t)&&e(t):je.root(e,t,n)},hover:Me("isHovered"),visited:Me("isVisited"),active:Me("isActive")}
function Me(e){return function(t,n,{adapter:r}){const o=r[e]
return"function"!=typeof o?se.falseFunc:function(e){return o(e)&&t(e)}}}const Ie={empty:(e,{adapter:t})=>!t.getChildren(e).some(e=>t.isTag(e)||""!==t.getText(e)),"first-child"(e,{adapter:t,equals:n}){if(t.prevElementSibling)return null==t.prevElementSibling(e)
const r=t.getSiblings(e).find(e=>t.isTag(e))
return null!=r&&n(e,r)},"last-child"(e,{adapter:t,equals:n}){const r=t.getSiblings(e)
for(let o=r.length-1;o>=0;o--){if(n(e,r[o]))return!0
if(t.isTag(r[o]))break}return!1},"first-of-type"(e,{adapter:t,equals:n}){const r=t.getSiblings(e),o=t.getName(e)
for(let i=0;i<r.length;i++){const a=r[i]
if(n(e,a))return!0
if(t.isTag(a)&&t.getName(a)===o)break}return!1},"last-of-type"(e,{adapter:t,equals:n}){const r=t.getSiblings(e),o=t.getName(e)
for(let i=r.length-1;i>=0;i--){const a=r[i]
if(n(e,a))return!0
if(t.isTag(a)&&t.getName(a)===o)break}return!1},"only-of-type"(e,{adapter:t,equals:n}){const r=t.getName(e)
return t.getSiblings(e).every(o=>n(e,o)||!t.isTag(o)||t.getName(o)!==r)},"only-child":(e,{adapter:t,equals:n})=>t.getSiblings(e).every(r=>n(e,r)||!t.isTag(r))}
function Re(e,t,n,r){if(null===n){if(e.length>r)throw new Error(`Pseudo-class :${t} requires an argument`)}else if(e.length===r)throw new Error(`Pseudo-class :${t} doesn't have any arguments`)}const Fe={"any-link":":is(a, area, link)[href]",link:":any-link:not(:visited)",disabled:":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",enabled:":not(:disabled)",checked:":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",required:":is(input, select, textarea)[required]",optional:":is(input, select, textarea):not([required])",selected:"option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",checkbox:"[type=checkbox]",file:"[type=file]",password:"[type=password]",radio:"[type=radio]",reset:"[type=reset]",image:"[type=image]",submit:"[type=submit]",parent:":not(:empty)",header:":is(h1, h2, h3, h4, h5, h6)",button:":is(button, input[type=button])",input:":is(input, textarea, select, button)",text:"input:is(:not([type!='']), [type=text])"},Be={}
function qe(e,t){return e===se.falseFunc?se.falseFunc:n=>t.isTag(n)&&e(n)}function Ge(e,t){const n=t.getSiblings(e)
if(n.length<=1)return[]
const r=n.indexOf(e)
return r<0||r===n.length-1?[]:n.slice(r+1).filter(t.isTag)}function Ue(e){return{xmlMode:!!e.xmlMode,lowerCaseAttributeNames:!!e.lowerCaseAttributeNames,lowerCaseTags:!!e.lowerCaseTags,quirksMode:!!e.quirksMode,cacheResults:!!e.cacheResults,pseudos:e.pseudos,adapter:e.adapter,equals:e.equals}}const We=(e,t,n,r,o)=>{const i=o(t,Ue(n),r)
return i===se.trueFunc?e:i===se.falseFunc?se.falseFunc:t=>i(t)&&e(t)},Ve={is:We,matches:We,where:We,not(e,t,n,r,o){const i=o(t,Ue(n),r)
return i===se.falseFunc?e:i===se.trueFunc?se.falseFunc:t=>!i(t)&&e(t)},has(e,t,n,r,o){const{adapter:i}=n,a=Ue(n)
a.relativeSelector=!0
const s=t.some(e=>e.some(we))?[Be]:void 0,l=o(t,a,s)
if(l===se.falseFunc)return se.falseFunc
const c=qe(l,i)
if(s&&l!==se.trueFunc){const{shouldTestNextSiblings:t=!1}=l
return n=>{if(!e(n))return!1
s[0]=n
const r=i.getChildren(n),o=t?[...r,...Ge(n,i)]:r
return i.existsOne(c,o)}}return t=>e(t)&&i.existsOne(c,i.getChildren(t))}}
function $e(e,t){const n=t.getParent(e)
return n&&t.isTag(n)?n:null}function Ye(e,t,n,r,o){const{adapter:i,equals:a}=n
switch(t.type){case ie.PseudoElement:throw new Error("Pseudo-elements are not supported by css-select")
case ie.ColumnCombinator:throw new Error("Column combinators are not yet supported by css-select")
case ie.Attribute:if(null!=t.namespace)throw new Error("Namespaced attributes are not yet supported by css-select")
return n.xmlMode&&!n.lowerCaseAttributeNames||(t.name=t.name.toLowerCase()),Ee[t.action](e,t,n)
case ie.Pseudo:return function(e,t,n,r,o){var i
const{name:a,data:s}=t
if(Array.isArray(s)){if(!(a in Ve))throw new Error(`Unknown pseudo-class :${a}(${s})`)
return Ve[a](e,s,n,r,o)}const l=null===(i=n.pseudos)||void 0===i?void 0:i[a],c="string"==typeof l?l:Fe[a]
if("string"==typeof c){if(null!=s)throw new Error(`Pseudo ${a} doesn't have any arguments`)
const t=ye(c)
return Ve.is(e,t,n,r,o)}if("function"==typeof l)return Re(l,a,s,1),t=>l(t,s)&&e(t)
if(a in je)return je[a](e,s,n,r)
if(a in Ie){const t=Ie[a]
return Re(t,a,s,2),r=>t(r,n,s)&&e(r)}throw new Error(`Unknown pseudo-class :${a}`)}(e,t,n,r,o)
case ie.Tag:{if(null!=t.namespace)throw new Error("Namespaced tag names are not yet supported by css-select")
let{name:r}=t
return n.xmlMode&&!n.lowerCaseTags||(r=r.toLowerCase()),function(t){return i.getName(t)===r&&e(t)}}case ie.Descendant:{if(!1===n.cacheResults||"undefined"==typeof WeakSet)return function(t){let n=t
for(;n=$e(n,i);)if(e(n))return!0
return!1}
const t=new WeakSet
return function(n){let r=n
for(;r=$e(r,i);)if(!t.has(r)){if(i.isTag(r)&&e(r))return!0
t.add(r)}return!1}}case"_flexibleDescendant":return function(t){let n=t
do{if(e(n))return!0}while(n=$e(n,i))
return!1}
case ie.Parent:return function(t){return i.getChildren(t).some(t=>i.isTag(t)&&e(t))}
case ie.Child:return function(t){const n=i.getParent(t)
return null!=n&&i.isTag(n)&&e(n)}
case ie.Sibling:return function(t){const n=i.getSiblings(t)
for(let r=0;r<n.length;r++){const o=n[r]
if(a(t,o))break
if(i.isTag(o)&&e(o))return!0}return!1}
case ie.Adjacent:return i.prevElementSibling?function(t){const n=i.prevElementSibling(t)
return null!=n&&e(n)}:function(t){const n=i.getSiblings(t)
let r
for(let e=0;e<n.length;e++){const o=n[e]
if(a(t,o))break
i.isTag(o)&&(r=o)}return!!r&&e(r)}
case ie.Universal:if(null!=t.namespace&&"*"!==t.namespace)throw new Error("Namespaced universal selectors are not yet supported by css-select")
return e}}function Xe(e,t,n){return Je("string"==typeof e?ye(e):e,t,n)}function He(e){return e.type===ie.Pseudo&&("scope"===e.name||Array.isArray(e.data)&&e.data.some(e=>e.some(He)))}const Qe={type:ie.Descendant},Ke={type:"_flexibleDescendant"},Ze={type:ie.Pseudo,name:"scope",data:null}
function Je(e,t,n){var r
e.forEach(Se),n=null!==(r=t.context)&&void 0!==r?r:n
const o=Array.isArray(n),i=n&&(Array.isArray(n)?n:[n])
if(!1!==t.relativeSelector)!function(e,{adapter:t},n){const r=!!(null==n?void 0:n.every(e=>{const n=t.isTag(e)&&t.getParent(e)
return e===Be||n&&t.isTag(n)}))
for(const t of e){if(t.length>0&&we(t[0])&&t[0].type!==ie.Descendant);else{if(!r||t.some(He))continue
t.unshift(Qe)}t.unshift(Ze)}}(e,t,i)
else if(e.some(e=>e.length>0&&we(e[0])))throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled")
let a=!1
const s=e.map(e=>{if(e.length>=2){const[t,n]=e
t.type!==ie.Pseudo||"scope"!==t.name||(o&&n.type===ie.Descendant?e[1]=Ke:n.type!==ie.Adjacent&&n.type!==ie.Sibling||(a=!0))}return function(e,t,n){var r
return e.reduce((e,r)=>e===se.falseFunc?se.falseFunc:Ye(e,r,t,n,Je),null!==(r=t.rootFunc)&&void 0!==r?r:se.trueFunc)}(e,t,i)}).reduce(et,se.falseFunc)
return s.shouldTestNextSiblings=a,s}function et(e,t){return t===se.falseFunc||e===se.trueFunc?e:e===se.falseFunc||t===se.trueFunc?t:function(n){return e(n)||t(n)}}const tt=(e,t)=>e===t,nt={adapter:re,equals:tt}
function rt(e){var t,n,r,o
const i=null!=e?e:nt
return null!==(t=i.adapter)&&void 0!==t?t:i.adapter=re,null!==(n=i.equals)&&void 0!==n||(i.equals=null!==(o=null===(r=i.adapter)||void 0===r?void 0:r.equals)&&void 0!==o?o:tt),i}function ot(e){return function(t,n,r){const o=rt(r)
"function"!=typeof t&&(t=Xe(t,o,n))
const i=function(e,t,n=!1){n&&(e=function(e,t){const n=Array.isArray(e)?e.slice(0):[e],r=n.length
for(let e=0;e<r;e++){const r=Ge(n[e],t)
n.push(...r)}return n}(e,t))
return Array.isArray(e)?t.removeSubsets(e):t.getChildren(e)}(n,o.adapter,t.shouldTestNextSiblings)
return e(t,i,o)}}const it=ot((e,t,n)=>e!==se.falseFunc&&t&&0!==t.length?n.adapter.findAll(e,t):[]),at=ot((e,t,n)=>e!==se.falseFunc&&t&&0!==t.length?n.adapter.findOne(e,t):null)
function st(e,t,n){const r=rt(n)
return("function"==typeof t?t:function(e,t,n){return qe(Xe(e,t,n),t.adapter)}(t,r))(e)}function lt(e){const t=new Map
for(const r of e.children)t.set(r,e),n(r,{element:{enter:(e,n)=>{t.set(e,n)}}},e)
return t}const ct=e=>"element"===e.type,ut=(e,t)=>t.some(t=>ct(t)&&(e(t)||ut(e,dt(t)))),ht=(e,t)=>e.attributes[t],dt=e=>e.children||[],pt=e=>e.name,mt=e=>"text"===e.children[0].type||"cdata"===e.children[0].type?e.children[0].value:"",ft=(e,t)=>void 0!==e.attributes[t],gt=(e,t)=>{const n=[]
for(const r of t)ct(r)&&(e(r)&&n.push(r),n.push(...gt(e,dt(r))))
return n},bt=(e,t)=>{for(const n of t)if(ct(n)){if(e(n))return n
const t=bt(e,dt(n))
if(t)return t}return null}
function yt(e,t){const n=n=>(t||(t=lt(e)),t.get(n)||null)
return{isTag:ct,existsOne:ut,getAttributeValue:ht,getChildren:dt,getName:pt,getParent:n,getSiblings:e=>{const t=n(e)
return t?dt(t):[]},getText:mt,hasAttrib:ft,removeSubsets:e=>{let t,r,o,i=e.length
for(;--i>-1;){for(t=r=e[i],e[i]=null,o=!0;r;){if(e.includes(r)){o=!1,e.splice(i,1)
break}r=n(r)}o&&(e[i]=t)}return e},findAll:gt,findOne:bt}}function kt(e,t){return{xmlMode:!0,adapter:yt(e,t)}}const vt=(e,t,n)=>it(t,e,kt(e,n)),wt=(e,t,n)=>at(t,e,kt(e,n)),xt=(e,t,n)=>st(e,t,kt(e,n)),St=(e,t)=>{t.children=t.children.filter(t=>t!==e)}
var Ct=Object.freeze({__proto__:null,description:"removes doctype declaration",fn:()=>({doctype:{enter:(e,t)=>{St(e,t)}}}),name:"removeDoctype"})
var At=Object.freeze({__proto__:null,description:"removes XML processing instructions",fn:()=>({instruction:{enter:(e,t)=>{"xml"===e.name&&St(e,t)}}}),name:"removeXMLProcInst"})
const _t=[/^!/]
var zt=Object.freeze({__proto__:null,description:"removes comments",fn:(e,t)=>{const{preservePatterns:n=_t}=t
return{comment:{enter:(e,t)=>{if(n){if(!Array.isArray(n))throw Error(`Expected array in removeComments preservePatterns parameter but received ${n}`)
if(n.some(t=>new RegExp(t).test(e.value)))return}St(e,t)}}}},name:"removeComments"})
const Tt={animation:new Set(["animate","animateColor","animateMotion","animateTransform","set"]),descriptive:new Set(["desc","metadata","title"]),shape:new Set(["circle","ellipse","line","path","polygon","polyline","rect"]),structural:new Set(["defs","g","svg","symbol","use"]),paintServer:new Set(["hatch","linearGradient","meshGradient","pattern","radialGradient","solidColor"]),nonRendering:new Set(["clipPath","filter","linearGradient","marker","mask","pattern","radialGradient","solidColor","symbol"]),container:new Set(["a","defs","foreignObject","g","marker","mask","missing-glyph","pattern","svg","switch","symbol"]),textContent:new Set(["a","altGlyph","altGlyphDef","altGlyphItem","glyph","glyphRef","text","textPath","tref","tspan"]),textContentChild:new Set(["altGlyph","textPath","tref","tspan"]),lightSource:new Set(["feDiffuseLighting","feDistantLight","fePointLight","feSpecularLighting","feSpotLight"]),filterPrimitive:new Set(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence"])},Et=new Set([...Tt.textContent,"pre","title"]),Ot=new Set(["glyph","missing-glyph","path"]),Pt={animationAddition:new Set(["additive","accumulate"]),animationAttributeTarget:new Set(["attributeType","attributeName"]),animationEvent:new Set(["onbegin","onend","onrepeat","onload"]),animationTiming:new Set(["begin","dur","end","fill","max","min","repeatCount","repeatDur","restart"]),animationValue:new Set(["by","calcMode","from","keySplines","keyTimes","to","values"]),conditionalProcessing:new Set(["requiredExtensions","requiredFeatures","systemLanguage"]),core:new Set(["id","tabindex","xml:base","xml:lang","xml:space"]),graphicalEvent:new Set(["onactivate","onclick","onfocusin","onfocusout","onload","onmousedown","onmousemove","onmouseout","onmouseover","onmouseup"]),presentation:new Set(["alignment-baseline","baseline-shift","clip-path","clip-rule","clip","color-interpolation-filters","color-interpolation","color-profile","color-rendering","color","cursor","direction","display","dominant-baseline","enable-background","fill-opacity","fill-rule","fill","filter","flood-color","flood-opacity","font-family","font-size-adjust","font-size","font-stretch","font-style","font-variant","font-weight","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","mask","opacity","overflow","paint-order","pointer-events","shape-rendering","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","stroke","text-anchor","text-decoration","text-overflow","text-rendering","transform-origin","transform","unicode-bidi","vector-effect","visibility","word-spacing","writing-mode"]),xlink:new Set(["xlink:actuate","xlink:arcrole","xlink:href","xlink:role","xlink:show","xlink:title","xlink:type"]),documentEvent:new Set(["onabort","onerror","onresize","onscroll","onunload","onzoom"]),documentElementEvent:new Set(["oncopy","oncut","onpaste"]),globalEvent:new Set(["oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onseeked","onseeking","onselect","onshow","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting"]),filterPrimitive:new Set(["x","y","width","height","result"]),transferFunction:new Set(["amplitude","exponent","intercept","offset","slope","tableValues","type"])},Lt={core:{"xml:space":"default"},presentation:{clip:"auto","clip-path":"none","clip-rule":"nonzero",mask:"none",opacity:"1","stop-color":"#000","stop-opacity":"1","fill-opacity":"1","fill-rule":"nonzero",fill:"#000",stroke:"none","stroke-width":"1","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-dashoffset":"0","stroke-opacity":"1","paint-order":"normal","vector-effect":"none",display:"inline",visibility:"visible","marker-start":"none","marker-mid":"none","marker-end":"none","color-interpolation":"sRGB","color-interpolation-filters":"linearRGB","color-rendering":"auto","shape-rendering":"auto","text-rendering":"auto","image-rendering":"auto","font-style":"normal","font-variant":"normal","font-weight":"normal","font-stretch":"normal","font-size":"medium","font-size-adjust":"none",kerning:"auto","letter-spacing":"normal","word-spacing":"normal","text-decoration":"none","text-anchor":"start","text-overflow":"clip","writing-mode":"lr-tb","glyph-orientation-vertical":"auto","glyph-orientation-horizontal":"0deg",direction:"ltr","unicode-bidi":"normal","dominant-baseline":"auto","alignment-baseline":"baseline","baseline-shift":"baseline"},transferFunction:{slope:"1",intercept:"0",amplitude:"1",exponent:"1",offset:"0"}},Nt={animationAttributeTarget:{unsafe:new Set(["attributeType"])},conditionalProcessing:{unsafe:new Set(["requiredFeatures"])},core:{unsafe:new Set(["xml:base","xml:lang","xml:space"])},presentation:{unsafe:new Set(["clip","color-profile","enable-background","glyph-orientation-horizontal","glyph-orientation-vertical","kerning"])}},Dt={a:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","style","target","transform"]),defaults:{target:"_self"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view","tspan"])},altGlyph:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","dx","dy","externalResourcesRequired","format","glyphRef","rotate","style","x","y"])},altGlyphDef:{attrsGroups:new Set(["core"]),content:new Set(["glyphRef"])},altGlyphItem:{attrsGroups:new Set(["core"]),content:new Set(["glyphRef","altGlyphItem"])},animate:{attrsGroups:new Set(["animationAddition","animationAttributeTarget","animationEvent","animationTiming","animationValue","conditionalProcessing","core","presentation","xlink"]),attrs:new Set(["externalResourcesRequired"]),contentGroups:new Set(["descriptive"])},animateColor:{attrsGroups:new Set(["animationAddition","animationAttributeTarget","animationEvent","animationTiming","animationValue","conditionalProcessing","core","presentation","xlink"]),attrs:new Set(["externalResourcesRequired"]),contentGroups:new Set(["descriptive"])},animateMotion:{attrsGroups:new Set(["animationAddition","animationEvent","animationTiming","animationValue","conditionalProcessing","core","xlink"]),attrs:new Set(["externalResourcesRequired","keyPoints","origin","path","rotate"]),defaults:{rotate:"0"},contentGroups:new Set(["descriptive"]),content:new Set(["mpath"])},animateTransform:{attrsGroups:new Set(["animationAddition","animationAttributeTarget","animationEvent","animationTiming","animationValue","conditionalProcessing","core","xlink"]),attrs:new Set(["externalResourcesRequired","type"]),contentGroups:new Set(["descriptive"])},circle:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","cx","cy","externalResourcesRequired","r","style","transform"]),defaults:{cx:"0",cy:"0"},contentGroups:new Set(["animation","descriptive"])},clipPath:{attrsGroups:new Set(["conditionalProcessing","core","presentation"]),attrs:new Set(["class","clipPathUnits","externalResourcesRequired","style","transform"]),defaults:{clipPathUnits:"userSpaceOnUse"},contentGroups:new Set(["animation","descriptive","shape"]),content:new Set(["text","use"])},"color-profile":{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["local","name","rendering-intent"]),defaults:{name:"sRGB","rendering-intent":"auto"},deprecated:{unsafe:new Set(["name"])},contentGroups:new Set(["descriptive"])},cursor:{attrsGroups:new Set(["core","conditionalProcessing","xlink"]),attrs:new Set(["externalResourcesRequired","x","y"]),defaults:{x:"0",y:"0"},contentGroups:new Set(["descriptive"])},defs:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform"]),contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},desc:{attrsGroups:new Set(["core"]),attrs:new Set(["class","style"])},ellipse:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","cx","cy","externalResourcesRequired","rx","ry","style","transform"]),defaults:{cx:"0",cy:"0"},contentGroups:new Set(["animation","descriptive"])},feBlend:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","in2","mode"]),defaults:{mode:"normal"},content:new Set(["animate","set"])},feColorMatrix:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","type","values"]),defaults:{type:"matrix"},content:new Set(["animate","set"])},feComponentTransfer:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in"]),content:new Set(["feFuncA","feFuncB","feFuncG","feFuncR"])},feComposite:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","in2","k1","k2","k3","k4","operator","style"]),defaults:{operator:"over",k1:"0",k2:"0",k3:"0",k4:"0"},content:new Set(["animate","set"])},feConvolveMatrix:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","kernelMatrix","order","style","bias","divisor","edgeMode","targetX","targetY","kernelUnitLength","preserveAlpha"]),defaults:{order:"3",bias:"0",edgeMode:"duplicate",preserveAlpha:"false"},content:new Set(["animate","set"])},feDiffuseLighting:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","diffuseConstant","in","kernelUnitLength","style","surfaceScale"]),defaults:{surfaceScale:"1",diffuseConstant:"1"},contentGroups:new Set(["descriptive"]),content:new Set(["feDistantLight","fePointLight","feSpotLight"])},feDisplacementMap:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","in2","scale","style","xChannelSelector","yChannelSelector"]),defaults:{scale:"0",xChannelSelector:"A",yChannelSelector:"A"},content:new Set(["animate","set"])},feDistantLight:{attrsGroups:new Set(["core"]),attrs:new Set(["azimuth","elevation"]),defaults:{azimuth:"0",elevation:"0"},content:new Set(["animate","set"])},feFlood:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style"]),content:new Set(["animate","animateColor","set"])},feFuncA:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feFuncB:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feFuncG:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feFuncR:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feGaussianBlur:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","stdDeviation"]),defaults:{stdDeviation:"0"},content:new Set(["set","animate"])},feImage:{attrsGroups:new Set(["core","presentation","filterPrimitive","xlink"]),attrs:new Set(["class","externalResourcesRequired","href","preserveAspectRatio","style","xlink:href"]),defaults:{preserveAspectRatio:"xMidYMid meet"},content:new Set(["animate","animateTransform","set"])},feMerge:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style"]),content:new Set(["feMergeNode"])},feMergeNode:{attrsGroups:new Set(["core"]),attrs:new Set(["in"]),content:new Set(["animate","set"])},feMorphology:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","operator","radius"]),defaults:{operator:"erode",radius:"0"},content:new Set(["animate","set"])},feOffset:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","dx","dy"]),defaults:{dx:"0",dy:"0"},content:new Set(["animate","set"])},fePointLight:{attrsGroups:new Set(["core"]),attrs:new Set(["x","y","z"]),defaults:{x:"0",y:"0",z:"0"},content:new Set(["animate","set"])},feSpecularLighting:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","kernelUnitLength","specularConstant","specularExponent","style","surfaceScale"]),defaults:{surfaceScale:"1",specularConstant:"1",specularExponent:"1"},contentGroups:new Set(["descriptive","lightSource"])},feSpotLight:{attrsGroups:new Set(["core"]),attrs:new Set(["limitingConeAngle","pointsAtX","pointsAtY","pointsAtZ","specularExponent","x","y","z"]),defaults:{x:"0",y:"0",z:"0",pointsAtX:"0",pointsAtY:"0",pointsAtZ:"0",specularExponent:"1"},content:new Set(["animate","set"])},feTile:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in"]),content:new Set(["animate","set"])},feTurbulence:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["baseFrequency","class","numOctaves","seed","stitchTiles","style","type"]),defaults:{baseFrequency:"0",numOctaves:"1",seed:"0",stitchTiles:"noStitch",type:"turbulence"},content:new Set(["animate","set"])},filter:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","filterRes","filterUnits","height","href","primitiveUnits","style","width","x","xlink:href","y"]),defaults:{primitiveUnits:"userSpaceOnUse",x:"-10%",y:"-10%",width:"120%",height:"120%"},deprecated:{unsafe:new Set(["filterRes"])},contentGroups:new Set(["descriptive","filterPrimitive"]),content:new Set(["animate","set"])},font:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","externalResourcesRequired","horiz-adv-x","horiz-origin-x","horiz-origin-y","style","vert-adv-y","vert-origin-x","vert-origin-y"]),defaults:{"horiz-origin-x":"0","horiz-origin-y":"0"},deprecated:{unsafe:new Set(["horiz-origin-x","horiz-origin-y","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["descriptive"]),content:new Set(["font-face","glyph","hkern","missing-glyph","vkern"])},"font-face":{attrsGroups:new Set(["core"]),attrs:new Set(["font-family","font-style","font-variant","font-weight","font-stretch","font-size","unicode-range","units-per-em","panose-1","stemv","stemh","slope","cap-height","x-height","accent-height","ascent","descent","widths","bbox","ideographic","alphabetic","mathematical","hanging","v-ideographic","v-alphabetic","v-mathematical","v-hanging","underline-position","underline-thickness","strikethrough-position","strikethrough-thickness","overline-position","overline-thickness"]),defaults:{"font-style":"all","font-variant":"normal","font-weight":"all","font-stretch":"normal","unicode-range":"U+0-10FFFF","units-per-em":"1000","panose-1":"0 0 0 0 0 0 0 0 0 0",slope:"0"},deprecated:{unsafe:new Set(["accent-height","alphabetic","ascent","bbox","cap-height","descent","hanging","ideographic","mathematical","panose-1","slope","stemh","stemv","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","widths","x-height"])},contentGroups:new Set(["descriptive"]),content:new Set(["font-face-src"])},"font-face-format":{attrsGroups:new Set(["core"]),attrs:new Set(["string"]),deprecated:{unsafe:new Set(["string"])}},"font-face-name":{attrsGroups:new Set(["core"]),attrs:new Set(["name"]),deprecated:{unsafe:new Set(["name"])}},"font-face-src":{attrsGroups:new Set(["core"]),content:new Set(["font-face-name","font-face-uri"])},"font-face-uri":{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["href","xlink:href"]),content:new Set(["font-face-format"])},foreignObject:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","height","style","transform","width","x","y"]),defaults:{x:"0",y:"0"}},g:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform"]),contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},glyph:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["arabic-form","class","d","glyph-name","horiz-adv-x","lang","orientation","style","unicode","vert-adv-y","vert-origin-x","vert-origin-y"]),defaults:{"arabic-form":"initial"},deprecated:{unsafe:new Set(["arabic-form","glyph-name","horiz-adv-x","orientation","unicode","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},glyphRef:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","d","horiz-adv-x","style","vert-adv-y","vert-origin-x","vert-origin-y"]),deprecated:{unsafe:new Set(["horiz-adv-x","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},hatch:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","hatchContentUnits","hatchUnits","pitch","rotate","style","transform","x","y"]),defaults:{hatchUnits:"objectBoundingBox",hatchContentUnits:"userSpaceOnUse",x:"0",y:"0",pitch:"0",rotate:"0"},contentGroups:new Set(["animation","descriptive"]),content:new Set(["hatchPath"])},hatchPath:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","style","d","offset"]),defaults:{offset:"0"},contentGroups:new Set(["animation","descriptive"])},hkern:{attrsGroups:new Set(["core"]),attrs:new Set(["u1","g1","u2","g2","k"]),deprecated:{unsafe:new Set(["g1","g2","k","u1","u2"])}},image:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","height","href","preserveAspectRatio","style","transform","width","x","xlink:href","y"]),defaults:{x:"0",y:"0",preserveAspectRatio:"xMidYMid meet"},contentGroups:new Set(["animation","descriptive"])},line:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform","x1","x2","y1","y2"]),defaults:{x1:"0",y1:"0",x2:"0",y2:"0"},contentGroups:new Set(["animation","descriptive"])},linearGradient:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","gradientTransform","gradientUnits","href","spreadMethod","style","x1","x2","xlink:href","y1","y2"]),defaults:{x1:"0",y1:"0",x2:"100%",y2:"0",spreadMethod:"pad"},contentGroups:new Set(["descriptive"]),content:new Set(["animate","animateTransform","set","stop"])},marker:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","externalResourcesRequired","markerHeight","markerUnits","markerWidth","orient","preserveAspectRatio","refX","refY","style","viewBox"]),defaults:{markerUnits:"strokeWidth",refX:"0",refY:"0",markerWidth:"3",markerHeight:"3"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},mask:{attrsGroups:new Set(["conditionalProcessing","core","presentation"]),attrs:new Set(["class","externalResourcesRequired","height","mask-type","maskContentUnits","maskUnits","style","width","x","y"]),defaults:{maskUnits:"objectBoundingBox",maskContentUnits:"userSpaceOnUse",x:"-10%",y:"-10%",width:"120%",height:"120%"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},metadata:{attrsGroups:new Set(["core"])},"missing-glyph":{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","d","horiz-adv-x","style","vert-adv-y","vert-origin-x","vert-origin-y"]),deprecated:{unsafe:new Set(["horiz-adv-x","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},mpath:{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["externalResourcesRequired","href","xlink:href"]),contentGroups:new Set(["descriptive"])},path:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","d","externalResourcesRequired","pathLength","style","transform"]),contentGroups:new Set(["animation","descriptive"])},pattern:{attrsGroups:new Set(["conditionalProcessing","core","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","height","href","patternContentUnits","patternTransform","patternUnits","preserveAspectRatio","style","viewBox","width","x","xlink:href","y"]),defaults:{patternUnits:"objectBoundingBox",patternContentUnits:"userSpaceOnUse",x:"0",y:"0",width:"0",height:"0",preserveAspectRatio:"xMidYMid meet"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},polygon:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","points","style","transform"]),contentGroups:new Set(["animation","descriptive"])},polyline:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","points","style","transform"]),contentGroups:new Set(["animation","descriptive"])},radialGradient:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","cx","cy","externalResourcesRequired","fr","fx","fy","gradientTransform","gradientUnits","href","r","spreadMethod","style","xlink:href"]),defaults:{gradientUnits:"objectBoundingBox",cx:"50%",cy:"50%",r:"50%"},contentGroups:new Set(["descriptive"]),content:new Set(["animate","animateTransform","set","stop"])},meshGradient:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","style","x","y","gradientUnits","transform"]),contentGroups:new Set(["descriptive","paintServer","animation"]),content:new Set(["meshRow"])},meshRow:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style"]),contentGroups:new Set(["descriptive"]),content:new Set(["meshPatch"])},meshPatch:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style"]),contentGroups:new Set(["descriptive"]),content:new Set(["stop"])},rect:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","height","rx","ry","style","transform","width","x","y"]),defaults:{x:"0",y:"0"},contentGroups:new Set(["animation","descriptive"])},script:{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["externalResourcesRequired","type","href","xlink:href"])},set:{attrsGroups:new Set(["animation","animationAttributeTarget","animationTiming","conditionalProcessing","core","xlink"]),attrs:new Set(["externalResourcesRequired","to"]),contentGroups:new Set(["descriptive"])},solidColor:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style"]),contentGroups:new Set(["paintServer"])},stop:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style","offset","path"]),content:new Set(["animate","animateColor","set"])},style:{attrsGroups:new Set(["core"]),attrs:new Set(["type","media","title"]),defaults:{type:"text/css"}},svg:{attrsGroups:new Set(["conditionalProcessing","core","documentEvent","graphicalEvent","presentation"]),attrs:new Set(["baseProfile","class","contentScriptType","contentStyleType","height","preserveAspectRatio","style","version","viewBox","width","x","y","zoomAndPan"]),defaults:{x:"0",y:"0",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid meet",zoomAndPan:"magnify",version:"1.1",baseProfile:"none",contentScriptType:"application/ecmascript",contentStyleType:"text/css"},deprecated:{safe:new Set(["version"]),unsafe:new Set(["baseProfile","contentScriptType","contentStyleType","zoomAndPan"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},switch:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform"]),contentGroups:new Set(["animation","descriptive","shape"]),content:new Set(["a","foreignObject","g","image","svg","switch","text","use"])},symbol:{attrsGroups:new Set(["core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","preserveAspectRatio","refX","refY","style","viewBox"]),defaults:{refX:"0",refY:"0"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},text:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","dx","dy","externalResourcesRequired","lengthAdjust","rotate","style","textLength","transform","x","y"]),defaults:{x:"0",y:"0",lengthAdjust:"spacing"},contentGroups:new Set(["animation","descriptive","textContentChild"]),content:new Set(["a"])},textPath:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","d","externalResourcesRequired","href","method","spacing","startOffset","style","xlink:href"]),defaults:{startOffset:"0",method:"align",spacing:"exact"},contentGroups:new Set(["descriptive"]),content:new Set(["a","altGlyph","animate","animateColor","set","tref","tspan"])},title:{attrsGroups:new Set(["core"]),attrs:new Set(["class","style"])},tref:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","href","style","xlink:href"]),contentGroups:new Set(["descriptive"]),content:new Set(["animate","animateColor","set"])},tspan:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","dx","dy","externalResourcesRequired","lengthAdjust","rotate","style","textLength","x","y"]),contentGroups:new Set(["descriptive"]),content:new Set(["a","altGlyph","animate","animateColor","set","tref","tspan"])},use:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","height","href","style","transform","width","x","xlink:href","y"]),defaults:{x:"0",y:"0"},contentGroups:new Set(["animation","descriptive"])},view:{attrsGroups:new Set(["core"]),attrs:new Set(["externalResourcesRequired","preserveAspectRatio","viewBox","viewTarget","zoomAndPan"]),deprecated:{unsafe:new Set(["viewTarget","zoomAndPan"])},contentGroups:new Set(["descriptive"])},vkern:{attrsGroups:new Set(["core"]),attrs:new Set(["u1","g1","u2","g2","k"]),deprecated:{unsafe:new Set(["g1","g2","k","u1","u2"])}}},jt=new Set(["http://creativecommons.org/ns#","http://inkscape.sourceforge.net/DTD/sodipodi-0.dtd","http://krita.org/namespaces/svg/krita","http://ns.adobe.com/AdobeIllustrator/10.0/","http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/","http://ns.adobe.com/Extensibility/1.0/","http://ns.adobe.com/Flows/1.0/","http://ns.adobe.com/GenericCustomNamespace/1.0/","http://ns.adobe.com/Graphs/1.0/","http://ns.adobe.com/ImageReplacement/1.0/","http://ns.adobe.com/SaveForWeb/1.0/","http://ns.adobe.com/Variables/1.0/","http://ns.adobe.com/XPath/1.0/","http://purl.org/dc/elements/1.1/","http://schemas.microsoft.com/visio/2003/SVGExtensions/","http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd","http://taptrix.com/vectorillustrator/svg_extensions","http://www.bohemiancoding.com/sketch/ns","http://www.figma.com/figma/ns","http://www.inkscape.org/namespaces/inkscape","http://www.serif.com/","http://www.vector.evaxdesign.sk","http://www.w3.org/1999/02/22-rdf-syntax-ns#","https://boxy-svg.com"]),Mt=new Set(["clip-path","color-profile","fill","filter","marker-end","marker-mid","marker-start","mask","stroke","style"]),It=new Set(["clip-rule","color-interpolation-filters","color-interpolation","color-profile","color-rendering","color","cursor","direction","dominant-baseline","fill-opacity","fill-rule","fill","font-family","font-size-adjust","font-size","font-stretch","font-style","font-variant","font-weight","font","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","letter-spacing","marker-end","marker-mid","marker-start","marker","paint-order","pointer-events","shape-rendering","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","stroke","text-anchor","text-rendering","transform","visibility","word-spacing","writing-mode"]),Rt=new Set(["clip-path","display","filter","mask","opacity","text-decoration","transform","unicode-bidi"]),Ft={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#0ff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000",blanchedalmond:"#ffebcd",blue:"#00f",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#0ff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#f0f",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#789",lightslategrey:"#789",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#0f0",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#f0f",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#639",red:"#f00",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#fff",whitesmoke:"#f5f5f5",yellow:"#ff0",yellowgreen:"#9acd32"},Bt={"#f0ffff":"azure","#f5f5dc":"beige","#ffe4c4":"bisque","#a52a2a":"brown","#ff7f50":"coral","#ffd700":"gold","#808080":"gray","#008000":"green","#4b0082":"indigo","#fffff0":"ivory","#f0e68c":"khaki","#faf0e6":"linen","#800000":"maroon","#000080":"navy","#808000":"olive","#ffa500":"orange","#da70d6":"orchid","#cd853f":"peru","#ffc0cb":"pink","#dda0dd":"plum","#800080":"purple","#f00":"red","#ff0000":"red","#fa8072":"salmon","#a0522d":"sienna","#c0c0c0":"silver","#fffafa":"snow","#d2b48c":"tan","#008080":"teal","#ff6347":"tomato","#ee82ee":"violet","#f5deb3":"wheat"},qt=new Set(["color","fill","flood-color","lighting-color","stop-color","stroke"]),Gt={displayState:new Set(["fullscreen","modal","picture-in-picture"]),input:new Set(["autofill","blank","checked","default","disabled","enabled","in-range","indeterminate","invalid","optional","out-of-range","placeholder-shown","read-only","read-write","required","user-invalid","valid"]),linguistic:new Set(["dir","lang"]),location:new Set(["any-link","link","local-link","scope","target-within","target","visited"]),resourceState:new Set(["playing","paused"]),timeDimensional:new Set(["current","past","future"]),treeStructural:new Set(["empty","first-child","first-of-type","last-child","last-of-type","nth-child","nth-last-child","nth-last-of-type","nth-of-type","only-child","only-of-type","root"]),userAction:new Set(["active","focus-visible","focus-within","focus","hover"]),functional:new Set(["is","not","where","has"])}
var Ut=Object.freeze({__proto__:null,attrsGroups:Pt,attrsGroupsDefaults:Lt,attrsGroupsDeprecated:Nt,colorsNames:Ft,colorsProps:qt,colorsShortNames:Bt,editorNamespaces:jt,elems:Dt,elemsGroups:Tt,inheritableAttrs:It,pathElems:Ot,presentationNonInheritableGroupAttrs:Rt,pseudoClasses:Gt,referencesProps:Mt,textElems:Et})
const Wt=10,Vt=11,$t=12,Yt=13,Xt=15,Ht=16,Qt=17,Kt=18,Zt=19,Jt=20,en=21,tn=22,nn=23,rn=24,on=25
function an(e){return e>=0x0030&&e<=0x0039}function sn(e){return an(e)||e>=0x0041&&e<=0x0046||e>=0x0061&&e<=0x0066}function ln(e){return e>=0x0041&&e<=0x005A}function cn(e){return function(e){return ln(e)||function(e){return e>=0x0061&&e<=0x007A}(e)}(e)||function(e){return e>=0x0080}(e)||0x005F===e}function un(e){return cn(e)||an(e)||0x002D===e}function hn(e){return e>=0x0000&&e<=0x0008||0x000B===e||e>=0x000E&&e<=0x001F||0x007F===e}function dn(e){return 0x000A===e||0x000D===e||0x000C===e}function pn(e){return dn(e)||0x0020===e||0x0009===e}function mn(e,t){return 0x005C===e&&(!dn(t)&&0!==t)}function fn(e,t,n){return 0x002D===e?cn(t)||0x002D===t||mn(t,n):!!cn(e)||0x005C===e&&mn(e,t)}function gn(e,t,n){return 0x002B===e||0x002D===e?an(t)?2:0x002E===t&&an(n)?3:0:0x002E===e?an(t)?2:0:an(e)?1:0}function bn(e){return 0xFEFF===e||0xFFFE===e?1:0}const yn=new Array(0x80),kn=0x82
for(let e=0;e<yn.length;e++)yn[e]=(pn(e)?kn:an(e)&&131)||cn(e)&&132||hn(e)&&133||e||128
function vn(e){return e<0x80?yn[e]:132}function wn(e,t){return t<e.length?e.charCodeAt(t):0}function xn(e,t,n){return 13===n&&10===wn(e,t+1)?2:1}function Sn(e,t,n){let r=e.charCodeAt(t)
return ln(r)&&(r|=32),r===n}function Cn(e,t,n,r){if(n-t!==r.length)return!1
if(t<0||n>e.length)return!1
for(let o=t;o<n;o++){const n=r.charCodeAt(o-t)
let i=e.charCodeAt(o)
if(ln(i)&&(i|=32),i!==n)return!1}return!0}function An(e,t){for(;t<e.length&&pn(e.charCodeAt(t));t++);return t}function _n(e,t){for(;t<e.length&&an(e.charCodeAt(t));t++);return t}function zn(e,t){if(sn(wn(e,(t+=2)-1))){for(const n=Math.min(e.length,t+5);t<n&&sn(wn(e,t));t++);const n=wn(e,t)
pn(n)&&(t+=xn(e,t,n))}return t}function Tn(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(!un(n)){if(!mn(n,wn(e,t+1)))break
t=zn(e,t)-1}}return t}function En(e,t){let n=e.charCodeAt(t)
if(0x002B!==n&&0x002D!==n||(n=e.charCodeAt(t+=1)),an(n)&&(t=_n(e,t+1),n=e.charCodeAt(t)),0x002E===n&&an(e.charCodeAt(t+1))&&(t=_n(e,t+=2)),Sn(e,t,101)){let r=0
n=e.charCodeAt(t+1),0x002D!==n&&0x002B!==n||(r=1,n=e.charCodeAt(t+2)),an(n)&&(t=_n(e,t+1+r+1))}return t}function On(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(0x0029===n){t++
break}mn(n,wn(e,t+1))&&(t=zn(e,t))}return t}function Pn(e){if(1===e.length&&!sn(e.charCodeAt(0)))return e[0]
let t=parseInt(e,16)
return(0===t||t>=0xD800&&t<=0xDFFF||t>0x10FFFF)&&(t=0xFFFD),String.fromCodePoint(t)}var Ln=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"]
function Nn(e=null,t){return null===e||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}function Dn(e){const t=e.source,n=t.length,r=t.length>0?bn(t.charCodeAt(0)):0,o=Nn(e.lines,n),i=Nn(e.columns,n)
let a=e.startLine,s=e.startColumn
for(let e=r;e<n;e++){const r=t.charCodeAt(e)
o[e]=a,i[e]=s++,10!==r&&13!==r&&12!==r||(13===r&&e+1<n&&10===t.charCodeAt(e+1)&&(e++,o[e]=a,i[e]=s),a++,s=1)}o[n]=a,i[n]=s,e.lines=o,e.columns=i,e.computed=!0}let jn=class{constructor(e,t,n,r){this.setSource(e,t,n,r),this.lines=null,this.columns=null}setSource(e="",t=0,n=1,r=1){this.source=e,this.startOffset=t,this.startLine=n,this.startColumn=r,this.computed=!1}getLocation(e,t){return this.computed||Dn(this),{source:t,offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]}}getLocationRange(e,t,n){return this.computed||Dn(this),{source:n,start:{offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]},end:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}}}
const Mn=0x00FFFFFF,In=24,Rn=new Uint8Array(32)
function Fn(e){return 0!==Rn[e]}Rn[2]=tn,Rn[21]=tn,Rn[19]=Jt,Rn[23]=rn
let Bn=class{constructor(e,t){this.setSource(e,t)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(e="",t=()=>{}){const n=(e=String(e||"")).length,r=Nn(this.offsetAndType,e.length+1),o=Nn(this.balance,e.length+1)
let i=0,a=-1,s=0,l=e.length
this.offsetAndType=null,this.balance=null,o.fill(0),t(e,(e,t,n)=>{const c=i++
if(r[c]=e<<In|n,-1===a&&(a=t),o[c]=l,e===s){const e=o[l]
o[l]=c,l=e,s=Rn[r[e]>>In]}else Fn(e)&&(l=c,s=Rn[e])}),r[i]=0|n,o[i]=i
for(let e=0;e<i;e++){const t=o[e]
if(t<=e){const n=o[t]
n!==e&&(o[e]=n)}else t>i&&(o[e]=i)}this.source=e,this.firstCharOffset=-1===a?0:a,this.tokenCount=i,this.offsetAndType=r,this.balance=o,this.reset(),this.next()}lookupType(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e]>>In:0}lookupTypeNonSC(e){for(let t=this.tokenIndex;t<this.tokenCount;t++){const n=this.offsetAndType[t]>>In
if(n!==Yt&&n!==on&&0===e--)return n}return 0}lookupOffset(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e-1]&Mn:this.source.length}lookupOffsetNonSC(e){for(let t=this.tokenIndex;t<this.tokenCount;t++){const n=this.offsetAndType[t]>>In
if(n!==Yt&&n!==on&&0===e--)return t-this.tokenIndex}return 0}lookupValue(e,t){return(e+=this.tokenIndex)<this.tokenCount&&Cn(this.source,this.offsetAndType[e-1]&Mn,this.offsetAndType[e]&Mn,t)}getTokenStart(e){return e===this.tokenIndex?this.tokenStart:e>0?e<this.tokenCount?this.offsetAndType[e-1]&Mn:this.offsetAndType[this.tokenCount]&Mn:this.firstCharOffset}substrToCursor(e){return this.source.substring(e,this.tokenStart)}isBalanceEdge(e){return this.balance[this.tokenIndex]<e}isDelim(e,t){return t?9===this.lookupType(t)&&this.source.charCodeAt(this.lookupOffset(t))===e:9===this.tokenType&&this.source.charCodeAt(this.tokenStart)===e}skip(e){let t=this.tokenIndex+e
t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.offsetAndType[t-1]&Mn,t=this.offsetAndType[t],this.tokenType=t>>In,this.tokenEnd=t&Mn):(this.tokenIndex=this.tokenCount,this.next())}next(){let e=this.tokenIndex+1
e<this.tokenCount?(this.tokenIndex=e,this.tokenStart=this.tokenEnd,e=this.offsetAndType[e],this.tokenType=e>>In,this.tokenEnd=e&Mn):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===Yt||this.tokenType===on;)this.next()}skipUntilBalanced(e,t){let n=e,r=0,o=0
e:for(;n<this.tokenCount&&(r=this.balance[n],!(r<e));n++)switch(o=n>0?this.offsetAndType[n-1]&Mn:this.firstCharOffset,t(this.source.charCodeAt(o))){case 1:break e
case 2:n++
break e
default:Fn(this.offsetAndType[n]>>In)&&(n=r)}this.skip(n-this.tokenIndex)}forEachToken(e){for(let t=0,n=this.firstCharOffset;t<this.tokenCount;t++){const r=n,o=this.offsetAndType[t],i=o&Mn
n=i,e(o>>In,r,i,t)}}dump(){const e=new Array(this.tokenCount)
return this.forEachToken((t,n,r,o)=>{e[o]={idx:o,type:Ln[t],chunk:this.source.substring(n,r),balance:this.balance[o]}}),e}}
function qn(e,t){function n(t){return t<a?e.charCodeAt(t):0}function r(){return c=En(e,c),fn(n(c),n(c+1),n(c+2))?(s=$t,c=Tn(e,c),void 0):0x0025===n(c)?(s=Vt,c++,void 0):(s=Wt,void 0)}function o(){const t=c
return c=Tn(e,c),Cn(e,t,c,"url")&&0x0028===n(c)?(c=An(e,c+1),0x0022===n(c)||0x0027===n(c)?(s=2,c=t+4,void 0):(!function(){for(s=7,c=An(e,c);c<e.length;c++){const t=e.charCodeAt(c)
switch(vn(t)){case 0x0029:return c++,void 0
case kn:return c=An(e,c),0x0029===n(c)||c>=e.length?(c<e.length&&c++,void 0):(c=On(e,c),s=8,void 0)
case 0x0022:case 0x0027:case 0x0028:case 133:return c=On(e,c),s=8,void 0
case 0x005C:if(mn(t,n(c+1))){c=zn(e,c)-1
break}return c=On(e,c),s=8,void 0}}}(),void 0)):0x0028===n(c)?(s=2,c++,void 0):(s=1,void 0)}function i(t){for(t||(t=n(c++)),s=5;c<e.length;c++){const r=e.charCodeAt(c)
switch(vn(r)){case t:return c++,void 0
case kn:if(dn(r))return c+=xn(e,c,r),s=6,void 0
break
case 0x005C:if(c===e.length-1)break
const o=n(c+1)
dn(o)?c+=xn(e,c+1,o):mn(r,o)&&(c=zn(e,c)-1)}}}const a=(e=String(e||"")).length
let s,l=bn(n(0)),c=l
for(;c<a;){const a=e.charCodeAt(c)
switch(vn(a)){case kn:s=Yt,c=An(e,c+1)
break
case 0x0022:i()
break
case 0x0023:un(n(c+1))||mn(n(c+1),n(c+2))?(s=4,c=Tn(e,c+1)):(s=9,c++)
break
case 0x0027:i()
break
case 0x0028:s=en,c++
break
case 0x0029:s=tn,c++
break
case 0x002B:gn(a,n(c+1),n(c+2))?r():(s=9,c++)
break
case 0x002C:s=Kt,c++
break
case 0x002D:gn(a,n(c+1),n(c+2))?r():0x002D===n(c+1)&&0x003E===n(c+2)?(s=Xt,c+=3):fn(a,n(c+1),n(c+2))?o():(s=9,c++)
break
case 0x002E:gn(a,n(c+1),n(c+2))?r():(s=9,c++)
break
case 0x002F:0x002A===n(c+1)?(s=on,c=e.indexOf("*/",c+2),c=-1===c?e.length:c+2):(s=9,c++)
break
case 0x003A:s=Ht,c++
break
case 0x003B:s=Qt,c++
break
case 0x003C:0x0021===n(c+1)&&0x002D===n(c+2)&&0x002D===n(c+3)?(s=14,c+=4):(s=9,c++)
break
case 0x0040:fn(n(c+1),n(c+2),n(c+3))?(s=3,c=Tn(e,c+1)):(s=9,c++)
break
case 0x005B:s=Zt,c++
break
case 0x005C:mn(a,n(c+1))?o():(s=9,c++)
break
case 0x005D:s=Jt,c++
break
case 0x007B:s=nn,c++
break
case 0x007D:s=rn,c++
break
case 131:r()
break
case 132:o()
break
default:s=9,c++}t(s,l,l=c)}}let Gn=null,Un=class e{static createItem(e){return{prev:null,next:null,data:e}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(e,t){let n
return null!==Gn?(n=Gn,Gn=Gn.cursor,n.prev=e,n.next=t,n.cursor=this.cursor):n={prev:e,next:t,cursor:this.cursor},this.cursor=n,n}releaseCursor(){const{cursor:e}=this
this.cursor=e.cursor,e.prev=null,e.next=null,e.cursor=Gn,Gn=e}updateCursors(e,t,n,r){let{cursor:o}=this
for(;null!==o;)o.prev===e&&(o.prev=t),o.next===n&&(o.next=r),o=o.cursor}*[Symbol.iterator](){for(let e=this.head;null!==e;e=e.next)yield e.data}get size(){let e=0
for(let t=this.head;null!==t;t=t.next)e++
return e}get isEmpty(){return null===this.head}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let n=null
this.head=null
for(let r of t){const t=e.createItem(r)
null!==n?n.next=t:this.head=t,t.prev=n,n=t}return this.tail=n,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(e,t=this){const n=this.allocateCursor(null,this.head)
for(;null!==n.next;){const r=n.next
n.next=r.next,e.call(t,r.data,r,this)}this.releaseCursor()}forEachRight(e,t=this){const n=this.allocateCursor(this.tail,null)
for(;null!==n.prev;){const r=n.prev
n.prev=r.prev,e.call(t,r.data,r,this)}this.releaseCursor()}reduce(e,t,n=this){let r,o=this.allocateCursor(null,this.head),i=t
for(;null!==o.next;)r=o.next,o.next=r.next,i=e.call(n,i,r.data,r,this)
return this.releaseCursor(),i}reduceRight(e,t,n=this){let r,o=this.allocateCursor(this.tail,null),i=t
for(;null!==o.prev;)r=o.prev,o.prev=r.prev,i=e.call(n,i,r.data,r,this)
return this.releaseCursor(),i}some(e,t=this){for(let n=this.head;null!==n;n=n.next)if(e.call(t,n.data,n,this))return!0
return!1}map(t,n=this){const r=new e
for(let e=this.head;null!==e;e=e.next)r.appendData(t.call(n,e.data,e,this))
return r}filter(t,n=this){const r=new e
for(let e=this.head;null!==e;e=e.next)t.call(n,e.data,e,this)&&r.appendData(e.data)
return r}nextUntil(e,t,n=this){if(null===e)return
const r=this.allocateCursor(null,e)
for(;null!==r.next;){const e=r.next
if(r.next=e.next,t.call(n,e.data,e,this))break}this.releaseCursor()}prevUntil(e,t,n=this){if(null===e)return
const r=this.allocateCursor(e,null)
for(;null!==r.prev;){const e=r.prev
if(r.prev=e.prev,t.call(n,e.data,e,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){const t=new e
for(let e of this)t.appendData(e)
return t}prepend(e){return this.updateCursors(null,e,this.head,e),null!==this.head?(this.head.prev=e,e.next=this.head):this.tail=e,this.head=e,this}prependData(t){return this.prepend(e.createItem(t))}append(e){return this.insert(e)}appendData(t){return this.insert(e.createItem(t))}insert(e,t=null){if(null!==t)if(this.updateCursors(t.prev,e,t,e),null===t.prev){if(this.head!==t)throw new Error("before doesn't belong to list")
this.head=e,t.prev=e,e.next=t,this.updateCursors(null,e)}else t.prev.next=e,e.prev=t.prev,t.prev=e,e.next=t
else this.updateCursors(this.tail,e,null,e),null!==this.tail?(this.tail.next=e,e.prev=this.tail):this.head=e,this.tail=e
return this}insertData(t,n){return this.insert(e.createItem(t),n)}remove(e){if(this.updateCursors(e,e.prev,e,e.next),null!==e.prev)e.prev.next=e.next
else{if(this.head!==e)throw new Error("item doesn't belong to list")
this.head=e.next}if(null!==e.next)e.next.prev=e.prev
else{if(this.tail!==e)throw new Error("item doesn't belong to list")
this.tail=e.prev}return e.prev=null,e.next=null,e}push(t){this.insert(e.createItem(t))}pop(){return null!==this.tail?this.remove(this.tail):null}unshift(t){this.prepend(e.createItem(t))}shift(){return null!==this.head?this.remove(this.head):null}prependList(e){return this.insertList(e,this.head)}appendList(e){return this.insertList(e)}insertList(e,t){return null===e.head||(null!=t?(this.updateCursors(t.prev,e.tail,t,e.head),null!==t.prev?(t.prev.next=e.head,e.head.prev=t.prev):this.head=e.head,t.prev=e.tail,e.tail.next=t):(this.updateCursors(this.tail,e.tail,null,e.head),null!==this.tail?(this.tail.next=e.head,e.head.prev=this.tail):this.head=e.head,this.tail=e.tail),e.head=null,e.tail=null),this}replace(e,t){"head"in t?this.insertList(t,e):this.insert(t,e),this.remove(e)}}
function Wn(e,t){const n=Object.create(SyntaxError.prototype),r=new Error
return Object.assign(n,{name:e,message:t,get stack(){return(r.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}\n`)}})}const Vn="    "
function $n({source:e,line:t,column:n,baseLine:r,baseColumn:o},i){function a(e,t){return s.slice(e,t).map((t,n)=>String(e+n+1).padStart(u)+" |"+t).join("\n")}const s=("\n".repeat(Math.max(r-1,0))+" ".repeat(Math.max(o-1,0))+e).split(/\r\n?|\n|\f/),l=Math.max(1,t-i)-1,c=Math.min(t+i,s.length+1),u=Math.max(4,String(c).length)+1
let h=0;(n+=3*(s[t-1].substr(0,n-1).match(/\t/g)||[]).length)>100&&(h=n-60+3,n=58)
for(let e=l;e<=c;e++)e>=0&&e<s.length&&(s[e]=s[e].replace(/\t/g,Vn),s[e]=(h>0&&s[e].length>h?"…":"")+s[e].substr(h,98)+(s[e].length>h+100-1?"…":""))
return[a(l,t),new Array(n+u+2).join("-")+"^",a(t,c)].filter(Boolean).join("\n").replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function Yn(e,t,n,r,o,i=1,a=1){return Object.assign(Wn("SyntaxError",e),{source:t,offset:n,line:r,column:o,sourceFragment:e=>$n({source:t,line:r,column:o,baseLine:i,baseColumn:a},isNaN(e)?0:e),get formattedMessage(){return`Parse error: ${e}\n`+$n({source:t,line:r,column:o,baseLine:i,baseColumn:a},2)}})}function Xn(e){const t=this.createList()
let n=!1
const r={recognizer:e}
for(;!this.eof;){switch(this.tokenType){case on:this.next()
continue
case Yt:n=!0,this.next()
continue}let o=e.getNode.call(this,r)
if(void 0===o)break
n&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,o,t,r),n=!1),t.push(o)}return n&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,r),t}const Hn=()=>{}
function Qn(e){return function(){return this[e]()}}function Kn(e){const t=Object.create(null)
for(const n of Object.keys(e)){const r=e[n],o=r.parse||r
o&&(t[n]=o)}return t}function Zn(e){let t="",n="<unknown>",r=!1,o=Hn,i=!1
const a=new jn,s=Object.assign(new Bn,function(e){const t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:Kn(e.atrule),pseudo:Kn(e.pseudo),node:Kn(e.node)}
for(const[n,r]of Object.entries(e.parseContext))switch(typeof r){case"function":t.context[n]=r
break
case"string":t.context[n]=Qn(r)}return{config:t,...t,...t.node}}(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:Xn,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket:e=>123===e?1:0,consumeUntilLeftCurlyBracketOrSemicolon:e=>123===e||59===e?1:0,consumeUntilExclamationMarkOrSemicolon:e=>33===e||59===e?1:0,consumeUntilSemicolonIncluded:e=>59===e?2:0,createList:()=>new Un,createSingleNodeList:e=>(new Un).appendData(e),getFirstListNode:e=>e&&e.first,getLastListNode:e=>e&&e.last,parseWithFallback(e,t){const n=this.tokenIndex
try{return e.call(this)}catch(e){if(i)throw e
this.skip(n-this.tokenIndex)
const r=t.call(this)
return i=!0,o(e,r),i=!1,r}},lookupNonWSType(e){let t
do{if(t=this.lookupType(e++),t!==Yt&&t!==on)return t}while(0!==t)
return 0},charCodeAt:e=>e>=0&&e<t.length?t.charCodeAt(e):0,substring:(e,n)=>t.substring(e,n),substrToCursor(e){return this.source.substring(e,this.tokenStart)},cmpChar:(e,n)=>Sn(t,e,n),cmpStr:(e,n,r)=>Cn(t,e,n,r),consume(e){const t=this.tokenStart
return this.eat(e),this.substrToCursor(t)},consumeFunctionName(){const e=t.substring(this.tokenStart,this.tokenEnd-1)
return this.eat(2),e},consumeNumber(e){const n=t.substring(this.tokenStart,En(t,this.tokenStart))
return this.eat(e),n},eat(e){if(this.tokenType!==e){const t=Ln[e].slice(0,-6).replace(/-/g," ").replace(/^./,e=>e.toUpperCase())
let n=`${/[[\](){}]/.test(t)?`"${t}"`:t} is expected`,r=this.tokenStart
switch(e){case 1:2===this.tokenType||7===this.tokenType?(r=this.tokenEnd-1,n="Identifier is expected but function found"):n="Identifier is expected"
break
case 4:this.isDelim(35)&&(this.next(),r++,n="Name is expected")
break
case Vt:this.tokenType===Wt&&(r=this.tokenEnd,n="Percent sign is expected")}this.error(n,r)}this.next()},eatIdent(e){1===this.tokenType&&!1!==this.lookupValue(0,e)||this.error(`Identifier "${e}" is expected`),this.next()},eatDelim(e){this.isDelim(e)||this.error(`Delim "${String.fromCharCode(e)}" is expected`),this.next()},getLocation:(e,t)=>r?a.getLocationRange(e,t,n):null,getLocationFromList(e){if(r){const t=this.getFirstListNode(e),r=this.getLastListNode(e)
return a.getLocationRange(null!==t?t.loc.start.offset-a.startOffset:this.tokenStart,null!==r?r.loc.end.offset-a.startOffset:this.tokenStart,n)}return null},error(e,n){const r=void 0!==n&&n<t.length?a.getLocation(n):this.eof?a.getLocation(function(e,t){for(;t>=0&&pn(e.charCodeAt(t));t--);return t+1}(t,t.length-1)):a.getLocation(this.tokenStart)
throw new Yn(e||"Unexpected input",t,r.offset,r.line,r.column,a.startLine,a.startColumn)}})
return Object.assign(function(e,l){t=e,l=l||{},s.setSource(t,qn),a.setSource(t,l.offset,l.line,l.column),n=l.filename||"<unknown>",r=Boolean(l.positions),o="function"==typeof l.onParseError?l.onParseError:Hn,i=!1,s.parseAtrulePrelude=!("parseAtrulePrelude"in l)||Boolean(l.parseAtrulePrelude),s.parseRulePrelude=!("parseRulePrelude"in l)||Boolean(l.parseRulePrelude),s.parseValue=!("parseValue"in l)||Boolean(l.parseValue),s.parseCustomProperty="parseCustomProperty"in l&&Boolean(l.parseCustomProperty)
const{context:c="default",onComment:u}=l
if(c in s.context==!1)throw new Error("Unknown context `"+c+"`")
"function"==typeof u&&s.forEachToken((e,n,r)=>{if(e===on){const e=s.getLocation(n,r),o=Cn(t,r-2,r,"*/")?t.slice(n+2,r-2):t.slice(n+2,r)
u(o,e)}})
const h=s.context[c].call(s,l)
return s.eof||s.error(),h},{SyntaxError:Yn,config:s.config})}var Jn={},er={},tr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("")
er.encode=function(e){if(0<=e&&e<tr.length)return tr[e]
throw new TypeError("Must be between 0 and 63: "+e)},er.decode=function(e){return 65<=e&&e<=90?e-65:97<=e&&e<=122?e-97+26:48<=e&&e<=57?e-48+52:43==e?62:47==e?63:-1}
var nr=er
Jn.encode=function(e){var t,n="",r=function(e){return e<0?1+(-e<<1):0+(e<<1)}(e)
do{t=31&r,(r>>>=5)>0&&(t|=32),n+=nr.encode(t)}while(r>0)
return n},Jn.decode=function(e,t,n){var r,o,i,a,s=e.length,l=0,c=0
do{if(t>=s)throw new Error("Expected more digits in base 64 VLQ value.")
if(-1===(o=nr.decode(e.charCodeAt(t++))))throw new Error("Invalid base64 digit: "+e.charAt(t-1))
r=!!(32&o),l+=(o&=31)<<c,c+=5}while(r)
n.value=(a=(i=l)>>1,1&~i?a:-a),n.rest=t}
var rr={}
!function(e){e.getArg=function(e,t,n){if(t in e)return e[t]
if(3===arguments.length)return n
throw new Error('"'+t+'" is a required argument.')}
var t=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,n=/^data:.+\,.+$/
function r(e){var n=e.match(t)
return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function o(e){var t=""
return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}e.urlParse=r,e.urlGenerate=o
var i,a,s=(i=function(t){var n=t,i=r(t)
if(i){if(!i.path)return t
n=i.path}for(var a=e.isAbsolute(n),s=[],l=0,c=0;;){if(l=c,-1===(c=n.indexOf("/",l))){s.push(n.slice(l))
break}for(s.push(n.slice(l,c));c<n.length&&"/"===n[c];)c++}var u,h=0
for(c=s.length-1;c>=0;c--)"."===(u=s[c])?s.splice(c,1):".."===u?h++:h>0&&(""===u?(s.splice(c+1,h),h=0):(s.splice(c,2),h--))
return""===(n=s.join("/"))&&(n=a?"/":"."),i?(i.path=n,o(i)):n},a=[],function(e){for(var t=0;t<a.length;t++)if(a[t].input===e){var n=a[0]
return a[0]=a[t],a[t]=n,a[0].result}var r=i(e)
return a.unshift({input:e,result:r}),a.length>32&&a.pop(),r})
function l(e,t){""===e&&(e="."),""===t&&(t=".")
var i=r(t),a=r(e)
if(a&&(e=a.path||"/"),i&&!i.scheme)return a&&(i.scheme=a.scheme),o(i)
if(i||t.match(n))return t
if(a&&!a.host&&!a.path)return a.host=t,o(a)
var l="/"===t.charAt(0)?t:s(e.replace(/\/+$/,"")+"/"+t)
return a?(a.path=l,o(a)):l}e.normalize=s,e.join=l,e.isAbsolute=function(e){return"/"===e.charAt(0)||t.test(e)},e.relative=function(e,t){""===e&&(e="."),e=e.replace(/\/$/,"")
for(var n=0;0!==t.indexOf(e+"/");){var r=e.lastIndexOf("/")
if(r<0)return t
if((e=e.slice(0,r)).match(/^([^\/]+:\/)?\/*$/))return t;++n}return Array(n+1).join("../")+t.substr(e.length+1)}
var c=!("__proto__"in Object.create(null))
function u(e){return e}function h(e){if(!e)return!1
var t=e.length
if(t<9)return!1
if(95!==e.charCodeAt(t-1)||95!==e.charCodeAt(t-2)||111!==e.charCodeAt(t-3)||116!==e.charCodeAt(t-4)||111!==e.charCodeAt(t-5)||114!==e.charCodeAt(t-6)||112!==e.charCodeAt(t-7)||95!==e.charCodeAt(t-8)||95!==e.charCodeAt(t-9))return!1
for(var n=t-10;n>=0;n--)if(36!==e.charCodeAt(n))return!1
return!0}function d(e,t){return e===t?0:null===e?1:null===t?-1:e>t?1:-1}e.toSetString=c?u:function(e){return h(e)?"$"+e:e},e.fromSetString=c?u:function(e){return h(e)?e.slice(1):e},e.compareByOriginalPositions=function(e,t,n){var r=d(e.source,t.source)
return 0!==r||0!==(r=e.originalLine-t.originalLine)||0!==(r=e.originalColumn-t.originalColumn)||n||0!==(r=e.generatedColumn-t.generatedColumn)||0!==(r=e.generatedLine-t.generatedLine)?r:d(e.name,t.name)},e.compareByOriginalPositionsNoSource=function(e,t,n){var r
return 0!==(r=e.originalLine-t.originalLine)||0!==(r=e.originalColumn-t.originalColumn)||n||0!==(r=e.generatedColumn-t.generatedColumn)||0!==(r=e.generatedLine-t.generatedLine)?r:d(e.name,t.name)},e.compareByGeneratedPositionsDeflated=function(e,t,n){var r=e.generatedLine-t.generatedLine
return 0!==r||0!==(r=e.generatedColumn-t.generatedColumn)||n||0!==(r=d(e.source,t.source))||0!==(r=e.originalLine-t.originalLine)||0!==(r=e.originalColumn-t.originalColumn)?r:d(e.name,t.name)},e.compareByGeneratedPositionsDeflatedNoLine=function(e,t,n){var r=e.generatedColumn-t.generatedColumn
return 0!==r||n||0!==(r=d(e.source,t.source))||0!==(r=e.originalLine-t.originalLine)||0!==(r=e.originalColumn-t.originalColumn)?r:d(e.name,t.name)},e.compareByGeneratedPositionsInflated=function(e,t){var n=e.generatedLine-t.generatedLine
return 0!==n||0!==(n=e.generatedColumn-t.generatedColumn)||0!==(n=d(e.source,t.source))||0!==(n=e.originalLine-t.originalLine)||0!==(n=e.originalColumn-t.originalColumn)?n:d(e.name,t.name)},e.parseSourceMapInput=function(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))},e.computeSourceURL=function(e,t,n){if(t=t||"",e&&("/"!==e[e.length-1]&&"/"!==t[0]&&(e+="/"),t=e+t),n){var i=r(n)
if(!i)throw new Error("sourceMapURL could not be parsed")
if(i.path){var a=i.path.lastIndexOf("/")
a>=0&&(i.path=i.path.substring(0,a+1))}t=l(o(i),t)}return s(t)}}(rr)
var or={},ir=rr,ar=Object.prototype.hasOwnProperty,sr="undefined"!=typeof Map
function lr(){this._array=[],this._set=sr?new Map:Object.create(null)}lr.fromArray=function(e,t){for(var n=new lr,r=0,o=e.length;r<o;r++)n.add(e[r],t)
return n},lr.prototype.size=function(){return sr?this._set.size:Object.getOwnPropertyNames(this._set).length},lr.prototype.add=function(e,t){var n=sr?e:ir.toSetString(e),r=sr?this.has(e):ar.call(this._set,n),o=this._array.length
r&&!t||this._array.push(e),r||(sr?this._set.set(e,o):this._set[n]=o)},lr.prototype.has=function(e){if(sr)return this._set.has(e)
var t=ir.toSetString(e)
return ar.call(this._set,t)},lr.prototype.indexOf=function(e){if(sr){var t=this._set.get(e)
if(t>=0)return t}else{var n=ir.toSetString(e)
if(ar.call(this._set,n))return this._set[n]}throw new Error('"'+e+'" is not in the set.')},lr.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e]
throw new Error("No element indexed by "+e)},lr.prototype.toArray=function(){return this._array.slice()},or.ArraySet=lr
var cr={},ur=rr
function hr(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}hr.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)},hr.prototype.add=function(e){var t,n,r,o,i,a
t=this._last,n=e,r=t.generatedLine,o=n.generatedLine,i=t.generatedColumn,a=n.generatedColumn,o>r||o==r&&a>=i||ur.compareByGeneratedPositionsInflated(t,n)<=0?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))},hr.prototype.toArray=function(){return this._sorted||(this._array.sort(ur.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},cr.MappingList=hr
var dr=Jn,pr=rr,mr=or.ArraySet,fr=cr.MappingList
function gr(e){e||(e={}),this._file=pr.getArg(e,"file",null),this._sourceRoot=pr.getArg(e,"sourceRoot",null),this._skipValidation=pr.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=pr.getArg(e,"ignoreInvalidMapping",!1),this._sources=new mr,this._names=new mr,this._mappings=new fr,this._sourcesContents=null}gr.prototype._version=3,gr.fromSourceMap=function(e,t){var n=e.sourceRoot,r=new gr(Object.assign(t||{},{file:e.file,sourceRoot:n}))
return e.eachMapping(function(e){var t={generated:{line:e.generatedLine,column:e.generatedColumn}}
null!=e.source&&(t.source=e.source,null!=n&&(t.source=pr.relative(n,t.source)),t.original={line:e.originalLine,column:e.originalColumn},null!=e.name&&(t.name=e.name)),r.addMapping(t)}),e.sources.forEach(function(t){var o=t
null!==n&&(o=pr.relative(n,t)),r._sources.has(o)||r._sources.add(o)
var i=e.sourceContentFor(t)
null!=i&&r.setSourceContent(t,i)}),r},gr.prototype.addMapping=function(e){var t=pr.getArg(e,"generated"),n=pr.getArg(e,"original",null),r=pr.getArg(e,"source",null),o=pr.getArg(e,"name",null);(this._skipValidation||!1!==this._validateMapping(t,n,r,o))&&(null!=r&&(r=String(r),this._sources.has(r)||this._sources.add(r)),null!=o&&(o=String(o),this._names.has(o)||this._names.add(o)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:null!=n&&n.line,originalColumn:null!=n&&n.column,source:r,name:o}))},gr.prototype.setSourceContent=function(e,t){var n=e
null!=this._sourceRoot&&(n=pr.relative(this._sourceRoot,n)),null!=t?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[pr.toSetString(n)]=t):this._sourcesContents&&(delete this._sourcesContents[pr.toSetString(n)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))},gr.prototype.applySourceMap=function(e,t,n){var r=t
if(null==t){if(null==e.file)throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.')
r=e.file}var o=this._sourceRoot
null!=o&&(r=pr.relative(o,r))
var i=new mr,a=new mr
this._mappings.unsortedForEach(function(t){if(t.source===r&&null!=t.originalLine){var s=e.originalPositionFor({line:t.originalLine,column:t.originalColumn})
null!=s.source&&(t.source=s.source,null!=n&&(t.source=pr.join(n,t.source)),null!=o&&(t.source=pr.relative(o,t.source)),t.originalLine=s.line,t.originalColumn=s.column,null!=s.name&&(t.name=s.name))}var l=t.source
null==l||i.has(l)||i.add(l)
var c=t.name
null==c||a.has(c)||a.add(c)},this),this._sources=i,this._names=a,e.sources.forEach(function(t){var r=e.sourceContentFor(t)
null!=r&&(null!=n&&(t=pr.join(n,t)),null!=o&&(t=pr.relative(o,t)),this.setSourceContent(t,r))},this)},gr.prototype._validateMapping=function(e,t,n,r){if(t&&"number"!=typeof t.line&&"number"!=typeof t.column){var o="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
if(this._ignoreInvalidMapping)return"undefined"!=typeof console&&console.warn&&console.warn(o),!1
throw new Error(o)}if((!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0)||t||n||r)&&!(e&&"line"in e&&"column"in e&&t&&"line"in t&&"column"in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&n)){o="Invalid mapping: "+JSON.stringify({generated:e,source:n,original:t,name:r})
if(this._ignoreInvalidMapping)return"undefined"!=typeof console&&console.warn&&console.warn(o),!1
throw new Error(o)}},gr.prototype._serializeMappings=function(){for(var e,t,n,r,o=0,i=1,a=0,s=0,l=0,c=0,u="",h=this._mappings.toArray(),d=0,p=h.length;d<p;d++){if(e="",(t=h[d]).generatedLine!==i)for(o=0;t.generatedLine!==i;)e+=";",i++
else if(d>0){if(!pr.compareByGeneratedPositionsInflated(t,h[d-1]))continue
e+=","}e+=dr.encode(t.generatedColumn-o),o=t.generatedColumn,null!=t.source&&(r=this._sources.indexOf(t.source),e+=dr.encode(r-c),c=r,e+=dr.encode(t.originalLine-1-s),s=t.originalLine-1,e+=dr.encode(t.originalColumn-a),a=t.originalColumn,null!=t.name&&(n=this._names.indexOf(t.name),e+=dr.encode(n-l),l=n)),u+=e}return u},gr.prototype._generateSourcesContent=function(e,t){return e.map(function(e){if(!this._sourcesContents)return null
null!=t&&(e=pr.relative(t,e))
var n=pr.toSetString(e)
return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)},gr.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()}
return null!=this._file&&(e.file=this._file),null!=this._sourceRoot&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e},gr.prototype.toString=function(){return JSON.stringify(this.toJSON())}
var br=gr
const yr=new Set(["Atrule","Selector","Declaration"])
const kr=(e,t)=>{if(9===e&&(e=t),"string"==typeof e){const t=e.charCodeAt(0)
return t>0x7F?0x8000:t<<8}return e},vr=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,Wt],[1,Vt],[1,$t],[1,Xt],[1,en],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,Wt],[3,Vt],[3,$t],[3,Xt],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,Wt],[4,Vt],[4,$t],[4,Xt],[$t,1],[$t,2],[$t,7],[$t,8],[$t,"-"],[$t,Wt],[$t,Vt],[$t,$t],[$t,Xt],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",Wt],["#",Vt],["#",$t],["#",Xt],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",Wt],["-",Vt],["-",$t],["-",Xt],[Wt,1],[Wt,2],[Wt,7],[Wt,8],[Wt,Wt],[Wt,Vt],[Wt,$t],[Wt,"%"],[Wt,Xt],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",Xt],[".",Wt],[".",Vt],[".",$t],["+",Wt],["+",Vt],["+",$t],["/","*"]],wr=vr.concat([[1,4],[$t,4],[4,4],[3,en],[3,5],[3,Ht],[Vt,Vt],[Vt,$t],[Vt,2],[Vt,"-"],[tn,1],[tn,2],[tn,Vt],[tn,$t],[tn,4],[tn,"-"]])
function xr(e){const t=new Set(e.map(([e,t])=>kr(e)<<16|kr(t)))
return function(e,n,r){const o=kr(n,r),i=r.charCodeAt(0)
return(45===i&&1!==n&&2!==n&&n!==Xt||43===i?t.has(e<<16|i<<8):t.has(e<<16|o))&&this.emit(" ",Yt,!0),o}}const Sr=xr(vr),Cr=xr(wr)
var Ar=Object.freeze({__proto__:null,safe:Cr,spec:Sr})
function _r(e,t){if("function"==typeof t){let n=null
return e.children.forEach(e=>{null!==n&&t.call(this,n),this.node(e),n=e}),void 0}e.children.forEach(this.node,this)}function zr(e){qn(e,(t,n,r)=>{this.token(t,e.slice(n,r))})}function Tr(e){const t=new Map
for(let[n,r]of Object.entries(e.node)){"function"==typeof(r.generate||r)&&t.set(n,r.generate||r)}return function(e,n){let r="",o=0,i={node(e){if(!t.has(e.type))throw new Error("Unknown node type: "+e.type)
t.get(e.type).call(a,e)},tokenBefore:Cr,token(e,t){o=this.tokenBefore(o,e,t),this.emit(t,e,!1),9===e&&92===t.charCodeAt(0)&&this.emit("\n",Yt,!0)},emit(e){r+=e},result:()=>r}
n&&("function"==typeof n.decorator&&(i=n.decorator(i)),n.sourceMap&&(i=function(e){const t=new br,n={line:1,column:0},r={line:0,column:0},o={line:1,column:0},i={generated:o}
let a=1,s=0,l=!1
const c=e.node
e.node=function(e){if(e.loc&&e.loc.start&&yr.has(e.type)){const c=e.loc.start.line,u=e.loc.start.column-1
r.line===c&&r.column===u||(r.line=c,r.column=u,n.line=a,n.column=s,l&&(l=!1,n.line===o.line&&n.column===o.column||t.addMapping(i)),l=!0,t.addMapping({source:e.loc.source,original:r,generated:n}))}c.call(this,e),l&&yr.has(e.type)&&(o.line=a,o.column=s)}
const u=e.emit
e.emit=function(e,t,n){for(let t=0;t<e.length;t++)10===e.charCodeAt(t)?(a++,s=0):s++
u(e,t,n)}
const h=e.result
return e.result=function(){return l&&t.addMapping(i),{css:h(),map:t}},e}(i)),n.mode in Ar&&(i.tokenBefore=Ar[n.mode]))
const a={node:e=>i.node(e),children:_r,token:(e,t)=>i.token(e,t),tokenize:zr}
return i.node(e),i.result()}}const{hasOwnProperty:Er}=Object.prototype,Or=function(){}
function Pr(e){return"function"==typeof e?e:Or}function Lr(e,t){return function(n,r,o){n.type===t&&e.call(this,n,r,o)}}function Nr(e,t){const n=t.structure,r=[]
for(const e in n){if(!1===Er.call(n,e))continue
let t=n[e]
const o={name:e,type:!1,nullable:!1}
Array.isArray(t)||(t=[t])
for(const e of t)null===e?o.nullable=!0:"string"==typeof e?o.type="node":Array.isArray(e)&&(o.type="list")
o.type&&r.push(o)}return r.length?{context:t.walkContext,fields:r}:null}function Dr(e,t){const n=e.fields.slice(),r=e.context,o="string"==typeof r
return t&&n.reverse(),function(e,i,a,s){let l
o&&(l=i[r],i[r]=e)
for(const r of n){const n=e[r.name]
if(!r.nullable||n)if("list"===r.type){if(t?n.reduceRight(s,!1):n.reduce(s,!1))return!0}else if(a(n))return!0}o&&(i[r]=l)}}function jr({StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:o}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Rule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Declaration:{StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:o}}}function Mr(e){const t=function(e){const t={}
for(const n in e.node)if(Er.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=Nr(0,r)}return t}(e),n={},r={},o=Symbol("break-walk"),i=Symbol("skip-node")
for(const e in t)Er.call(t,e)&&null!==t[e]&&(n[e]=Dr(t[e],!1),r[e]=Dr(t[e],!0))
const a=jr(n),s=jr(r),l=function(e,l){function c(e,t,n){const r=u.call(m,e,t,n)
return r===o||r!==i&&(!(!d.hasOwnProperty(e.type)||!d[e.type](e,m,c,p))||h.call(m,e,t,n)===o)}let u=Or,h=Or,d=n,p=(e,t,n,r)=>e||c(t,n,r)
const m={break:o,skip:i,root:e,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null}
if("function"==typeof l)u=l
else if(l&&(u=Pr(l.enter),h=Pr(l.leave),l.reverse&&(d=r),l.visit)){if(a.hasOwnProperty(l.visit))d=l.reverse?s[l.visit]:a[l.visit]
else if(!t.hasOwnProperty(l.visit))throw new Error("Bad value `"+l.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")")
u=Lr(u,l.visit),h=Lr(h,l.visit)}if(u===Or&&h===Or)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
c(e)}
return l.break=o,l.skip=i,l.find=function(e,t){let n=null
return l(e,function(e,r,i){if(t.call(this,e,r,i))return n=e,o}),n},l.findLast=function(e,t){let n=null
return l(e,{reverse:!0,enter(e,r,i){if(t.call(this,e,r,i))return n=e,o}}),n},l.findAll=function(e,t){const n=[]
return l(e,function(e,r,o){t.call(this,e,r,o)&&n.push(e)}),n},l}function Ir(e){return e}function Rr(e,t,n,r){let o
switch(e.type){case"Group":o=function(e,t,n,r){const o=" "===e.combinator||r?e.combinator:" "+e.combinator+" ",i=e.terms.map(e=>Rr(e,t,n,r)).join(o)
return e.explicit||n?(r||","===i[0]?"[":"[ ")+i+(r?"]":" ]"):i}(e,t,n,r)+(e.disallowEmpty?"!":"")
break
case"Multiplier":return Rr(e.term,t,n,r)+t(function(e){const{min:t,max:n,comma:r}=e
return 0===t&&0===n?r?"#?":"*":0===t&&1===n?"?":1===t&&0===n?r?"#":"+":1===t&&1===n?"":(r?"#":"")+(t===n?"{"+t+"}":"{"+t+","+(0!==n?n:"")+"}")}(e),e)
case"Boolean":o="<boolean-expr["+Rr(e.term,t,n,r)+"]>"
break
case"Type":o="<"+e.name+(e.opts?t(function(e){if("Range"===e.type)return" ["+(null===e.min?"-∞":e.min)+","+(null===e.max?"∞":e.max)+"]"
throw new Error("Unknown node type `"+e.type+"`")}(e.opts),e.opts):"")+">"
break
case"Property":o="<'"+e.name+"'>"
break
case"Keyword":o=e.name
break
case"AtKeyword":o="@"+e.name
break
case"Function":o=e.name+"("
break
case"String":case"Token":o=e.value
break
case"Comma":o=","
break
default:throw new Error("Unknown node type `"+e.type+"`")}return t(o,e)}function Fr(e,t){let n=Ir,r=!1,o=!1
return"function"==typeof t?n=t:t&&(r=Boolean(t.forceBraces),o=Boolean(t.compact),"function"==typeof t.decorate&&(n=t.decorate)),Rr(e,n,r,o)}const Br={offset:0,line:1,column:1}
function qr(e,t){const n=e&&e.loc&&e.loc[t]
return n?"line"in n?Gr(n):n:null}function Gr({offset:e,line:t,column:n},r){const o={offset:e,line:t,column:n}
if(r){const e=r.split(/\n|\r\n?|\f/)
o.offset+=r.length,o.line+=e.length-1,o.column=1===e.length?o.column+r.length:e.pop().length+1}return o}const Ur=function(e,t){const n=Wn("SyntaxReferenceError",e+(t?" `"+t+"`":""))
return n.reference=t,n},Wr=function(e,t,n,r){const o=Wn("SyntaxMatchError",e),{css:i,mismatchOffset:a,mismatchLength:s,start:l,end:c}=function(e,t){const n=e.tokens,r=e.longestMatch,o=r<n.length&&n[r].node||null,i=o!==t?o:null
let a,s,l=0,c=0,u=0,h=""
for(let e=0;e<n.length;e++){const t=n[e].value
e===r&&(c=t.length,l=h.length),null!==i&&n[e].node===i&&(e<=r?u++:u=0),h+=t}return r===n.length||u>1?(a=qr(i||t,"end")||Gr(Br,h),s=Gr(a)):(a=qr(i,"start")||Gr(qr(t,"start")||Br,h.slice(0,l)),s=qr(i,"end")||Gr(a,h.substr(l,c))),{css:h,mismatchOffset:l,mismatchLength:c,start:a,end:s}}(r,n)
return o.rawMessage=e,o.syntax=t?Fr(t):"<generic>",o.css=i,o.mismatchOffset=a,o.mismatchLength=s,o.message=e+"\n  syntax: "+o.syntax+"\n   value: "+(i||"<empty string>")+"\n  --------"+new Array(o.mismatchOffset+1).join("-")+"^",Object.assign(o,l),o.loc={source:n&&n.loc&&n.loc.source||"<unknown>",start:l,end:c},o},Vr=new Map,$r=new Map,Yr=function(e){if(Vr.has(e))return Vr.get(e)
const t=e.toLowerCase()
let n=Vr.get(t)
if(void 0===n){const e=Hr(t,0),r=e?"":Qr(t,0)
n=Object.freeze({basename:t.substr(r.length),name:t,prefix:r,vendor:r,custom:e})}return Vr.set(e,n),n},Xr=function(e){if($r.has(e))return $r.get(e)
let t=e,n=e[0]
"/"===n?n="/"===e[1]?"//":"/":"_"!==n&&"*"!==n&&"$"!==n&&"#"!==n&&"+"!==n&&"&"!==n&&(n="")
const r=Hr(t,n.length)
if(!r&&(t=t.toLowerCase(),$r.has(t))){const n=$r.get(t)
return $r.set(e,n),n}const o=r?"":Qr(t,n.length),i=t.substr(0,n.length+o.length),a=Object.freeze({basename:t.substr(i.length),name:t.substr(n.length),hack:n,vendor:o,prefix:i,custom:r})
return $r.set(e,a),a}
function Hr(e,t){return t=t||0,e.length-t>=2&&45===e.charCodeAt(t)&&45===e.charCodeAt(t+1)}function Qr(e,t){if(t=t||0,e.length-t>=3&&45===e.charCodeAt(t)&&45!==e.charCodeAt(t+1)){const n=e.indexOf("-",t+2)
if(-1!==n)return e.substring(t,n+1)}return""}const Kr=["initial","inherit","unset","revert","revert-layer"],Zr=0x002D,Jr=!0
function eo(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function to(e,t,n){for(;null!==e&&(e.type===Yt||e.type===on);)e=n(++t)
return t}function no(e,t,n,r){if(!e)return 0
const o=e.value.charCodeAt(t)
if(43===o||o===Zr){if(n)return 0
t++}for(;t<e.value.length;t++)if(!an(e.value.charCodeAt(t)))return 0
return r+1}function ro(e,t,n){let r=!1,o=to(e,t,n)
if(null===(e=n(o)))return t
if(e.type!==Wt){if(!eo(e,43)&&!eo(e,Zr))return t
if(r=!0,o=to(n(++o),o,n),null===(e=n(o))||e.type!==Wt)return 0}if(!r){const t=e.value.charCodeAt(0)
if(43!==t&&t!==Zr)return 0}return no(e,r?0:1,r,o)}function oo(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function io(e,t,n){let r=0
for(let o=t;o<e.value.length;o++){const i=e.value.charCodeAt(o)
if(45===i&&n&&0!==r)return io(e,t+r+1,!1),6
if(!sn(i))return 0
if(++r>6)return 0}return r}function ao(e,t,n){if(!e)return 0
for(;oo(n(t),63);){if(++e>6)return 0
t++}return t}const so=["calc(","-moz-calc(","-webkit-calc("],lo=new Map([[2,tn],[en,tn],[Zt,Jt],[nn,rn]])
function co(e,t){return t<e.length?e.charCodeAt(t):0}function uo(e,t){return Cn(e,0,e.length,t)}function ho(e,t){for(let n=0;n<t.length;n++)if(uo(e,t[n]))return!0
return!1}function po(e,t){return t===e.length-2&&(0x005C===co(e,t)&&an(co(e,t+1)))}function mo(e,t,n){if(e&&"Range"===e.type){const r=Number(void 0!==n&&n!==t.length?t.substr(0,n):t)
if(isNaN(r))return!0
if(null!==e.min&&r<e.min&&"string"!=typeof e.min)return!0
if(null!==e.max&&r>e.max&&"string"!=typeof e.max)return!0}return!1}function fo(e){return function(t,n,r){return null===t?0:2===t.type&&ho(t.value,so)?function(e,t){let n=0,r=[],o=0
e:do{switch(e.type){case rn:case tn:case Jt:if(e.type!==n)break e
if(n=r.pop(),0===r.length){o++
break e}break
case 2:case en:case Zt:case nn:r.push(n),n=lo.get(e.type)}o++}while(e=t(o))
return o}(t,n):e(t,n,r)}}function go(e){return function(t){return null===t||t.type!==e?0:1}}function bo(e){return null===e||1!==e.type||0x002D!==co(e.value,0)||0x002D!==co(e.value,1)?0:1}function yo(e){return e&&(e=new Set(e)),function(t,n,r){if(null===t||t.type!==$t)return 0
const o=En(t.value,0)
if(null!==e){const n=t.value.indexOf("\\",o),r=-1!==n&&po(t.value,n)?t.value.substring(o,n):t.value.substr(o)
if(!1===e.has(r.toLowerCase()))return 0}return mo(r,t.value,o)?0:1}}function ko(e){return"function"!=typeof e&&(e=function(){return 0}),function(t,n,r){return null!==t&&t.type===Wt&&0===Number(t.value)?1:e(t,n,r)}}const vo={"ident-token":go(1),"function-token":go(2),"at-keyword-token":go(3),"hash-token":go(4),"string-token":go(5),"bad-string-token":go(6),"url-token":go(7),"bad-url-token":go(8),"delim-token":go(9),"number-token":go(Wt),"percentage-token":go(Vt),"dimension-token":go($t),"whitespace-token":go(Yt),"CDO-token":go(14),"CDC-token":go(Xt),"colon-token":go(Ht),"semicolon-token":go(Qt),"comma-token":go(Kt),"[-token":go(Zt),"]-token":go(Jt),"(-token":go(en),")-token":go(tn),"{-token":go(nn),"}-token":go(rn)},wo={string:go(5),ident:go(1),percentage:fo(function(e,t,n){return null===e||e.type!==Vt||mo(n,e.value,e.value.length-1)?0:1}),zero:ko(),number:fo(function(e,t,n){if(null===e)return 0
const r=En(e.value,0)
return r===e.value.length||po(e.value,r)?mo(n,e.value,r)?0:1:0}),integer:fo(function(e,t,n){if(null===e||e.type!==Wt)return 0
let r=0x002B===co(e.value,0)||0x002D===co(e.value,0)?1:0
for(;r<e.value.length;r++)if(!an(co(e.value,r)))return 0
return mo(n,e.value,r)?0:1}),"custom-ident":function(e){if(null===e||1!==e.type)return 0
const t=e.value.toLowerCase()
return ho(t,Kr)||uo(t,"default")?0:1},"dashed-ident":bo,"custom-property-name":function(e){return bo(e)?"--"===e.value?0:1:0},"hex-color":function(e){if(null===e||4!==e.type)return 0
const t=e.value.length
if(4!==t&&5!==t&&7!==t&&9!==t)return 0
for(let n=1;n<t;n++)if(!sn(co(e.value,n)))return 0
return 1},"id-selector":function(e){return null===e||4!==e.type?0:fn(co(e.value,1),co(e.value,2),co(e.value,3))?1:0},"an-plus-b":function(e,t){let n=0
if(!e)return 0
if(e.type===Wt)return no(e,0,false,n)
if(1===e.type&&e.value.charCodeAt(0)===Zr){if(!Sn(e.value,1,110))return 0
switch(e.value.length){case 2:return ro(t(++n),n,t)
case 3:return e.value.charCodeAt(2)!==Zr?0:(n=to(t(++n),n,t),no(e=t(n),0,Jr,n))
default:return e.value.charCodeAt(2)!==Zr?0:no(e,3,Jr,n)}}else if(1===e.type||eo(e,43)&&1===t(n+1).type){if(1!==e.type&&(e=t(++n)),null===e||!Sn(e.value,0,110))return 0
switch(e.value.length){case 1:return ro(t(++n),n,t)
case 2:return e.value.charCodeAt(1)!==Zr?0:(n=to(t(++n),n,t),no(e=t(n),0,Jr,n))
default:return e.value.charCodeAt(1)!==Zr?0:no(e,2,Jr,n)}}else if(e.type===$t){let r=e.value.charCodeAt(0),o=43===r||r===Zr?1:0,i=o
for(;i<e.value.length&&an(e.value.charCodeAt(i));i++);return i===o?0:Sn(e.value,i,110)?i+1===e.value.length?ro(t(++n),n,t):e.value.charCodeAt(i+1)!==Zr?0:i+2===e.value.length?(n=to(t(++n),n,t),no(e=t(n),0,Jr,n)):no(e,i+2,Jr,n):0}return 0},urange:function(e,t){let n=0
if(null===e||1!==e.type||!Sn(e.value,0,117))return 0
if(null===(e=t(++n)))return 0
if(oo(e,43))return null===(e=t(++n))?0:1===e.type?ao(io(e,0,!0),++n,t):oo(e,63)?ao(1,++n,t):0
if(e.type===Wt){const r=io(e,1,!0)
return 0===r?0:null===(e=t(++n))?n:e.type===$t||e.type===Wt?function(e,t){return e.value.charCodeAt(0)===t}(e,45)&&io(e,1,!1)?n+1:0:ao(r,n,t)}return e.type===$t?ao(io(e,1,!0),++n,t):0},"declaration-value":function(e,t){if(!e)return 0
let n=0,r=[],o=0
e:do{switch(e.type){case 6:case 8:break e
case rn:case tn:case Jt:if(e.type!==n)break e
n=r.pop()
break
case Qt:if(0===n)break e
break
case 9:if(0===n&&"!"===e.value)break e
break
case 2:case en:case Zt:case nn:r.push(n),n=lo.get(e.type)}o++}while(e=t(o))
return o},"any-value":function(e,t){if(!e)return 0
let n=0,r=[],o=0
e:do{switch(e.type){case 6:case 8:break e
case rn:case tn:case Jt:if(e.type!==n)break e
n=r.pop()
break
case 2:case en:case Zt:case nn:r.push(n),n=lo.get(e.type)}o++}while(e=t(o))
return o}}
function xo(e){const{angle:t,decibel:n,frequency:r,flex:o,length:i,resolution:a,semitones:s,time:l}=e||{}
return{dimension:fo(yo(null)),angle:fo(yo(t)),decibel:fo(yo(n)),frequency:fo(yo(r)),flex:fo(yo(o)),length:fo(ko(yo(i))),resolution:fo(yo(a)),semitones:fo(yo(s)),time:fo(yo(l))}}var So=Object.freeze({__proto__:null,angle:["deg","grad","rad","turn"],decibel:["db"],flex:["fr"],frequency:["hz","khz"],length:["cm","mm","q","in","pt","pc","px","em","rem","ex","rex","cap","rcap","ch","rch","ic","ric","lh","rlh","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax","cqw","cqh","cqi","cqb","cqmin","cqmax"],resolution:["dpi","dpcm","dppx","x"],semitones:["st"],time:["s","ms"]})
function Co(e,t,n){return Object.assign(Wn("SyntaxError",e),{input:t,offset:n,rawMessage:e,message:e+"\n  "+t+"\n--"+new Array((n||t.length)+1).join("-")+"^"})}const Ao=new Uint8Array(128).map((e,t)=>/[a-zA-Z0-9\-]/.test(String.fromCharCode(t))?1:0)
class _o{constructor(e){this.str=e,this.pos=0}charCodeAt(e){return e<this.str.length?this.str.charCodeAt(e):0}charCode(){return this.charCodeAt(this.pos)}isNameCharCode(e=this.charCode()){return e<128&&1===Ao[e]}nextCharCode(){return this.charCodeAt(this.pos+1)}nextNonWsCode(e){return this.charCodeAt(this.findWsEnd(e))}skipWs(){this.pos=this.findWsEnd(this.pos)}findWsEnd(e){for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(13!==t&&10!==t&&12!==t&&32!==t&&9!==t)break}return e}substringToPos(e){return this.str.substring(this.pos,this.pos=e)}eat(e){this.charCode()!==e&&this.error("Expect `"+String.fromCharCode(e)+"`"),this.pos++}peek(){return this.pos<this.str.length?this.str.charAt(this.pos++):""}error(e){throw new Co(e,this.str,this.pos)}scanSpaces(){return this.substringToPos(this.findWsEnd(this.pos))}scanWord(){let e=this.pos
for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(t>=128||0===Ao[t])break}return this.pos===e&&this.error("Expect a keyword"),this.substringToPos(e)}scanNumber(){let e=this.pos
for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(t<48||t>57)break}return this.pos===e&&this.error("Expect a number"),this.substringToPos(e)}scanString(){const e=this.str.indexOf("'",this.pos+1)
return-1===e&&(this.pos=this.str.length,this.error("Expect an apostrophe")),this.substringToPos(e+1)}}const zo=123,To={" ":1,"&&":2,"||":3,"|":4}
function Eo(e){let t=null,n=null
return e.eat(zo),e.skipWs(),t=e.scanNumber(e),e.skipWs(),44===e.charCode()?(e.pos++,e.skipWs(),125!==e.charCode()&&(n=e.scanNumber(e),e.skipWs())):n=t,e.eat(125),{min:Number(t),max:n?Number(n):0}}function Oo(e,t){const n=function(e){let t=null,n=!1
switch(e.charCode()){case 42:e.pos++,t={min:0,max:0}
break
case 43:e.pos++,t={min:1,max:0}
break
case 63:e.pos++,t={min:0,max:1}
break
case 35:e.pos++,n=!0,e.charCode()===zo?t=Eo(e):63===e.charCode()?(e.pos++,t={min:0,max:0}):t={min:1,max:0}
break
case zo:t=Eo(e)
break
default:return null}return{type:"Multiplier",comma:n,min:t.min,max:t.max,term:null}}(e)
return null!==n?(n.term=t,35===e.charCode()&&43===e.charCodeAt(e.pos-1)?Oo(e,n):n):t}function Po(e){const t=e.peek()
return""===t?null:Oo(e,{type:"Token",value:t})}function Lo(e){let t,n=null
if(e.eat(60),t=e.scanWord(),"boolean-expr"===t){e.eat(91)
const t=Do(e,93)
return e.eat(93),e.eat(62),Oo(e,{type:"Boolean",term:1===t.terms.length?t.terms[0]:t})}return 40===e.charCode()&&41===e.nextCharCode()&&(e.pos+=2,t+="()"),91===e.charCodeAt(e.findWsEnd(e.pos))&&(e.skipWs(),n=function(e){let t=null,n=null,r=1
return e.eat(91),45===e.charCode()&&(e.peek(),r=-1),-1==r&&8734===e.charCode()?e.peek():(t=r*Number(e.scanNumber(e)),e.isNameCharCode()&&(t+=e.scanWord())),e.skipWs(),e.eat(44),e.skipWs(),8734===e.charCode()?e.peek():(r=1,45===e.charCode()&&(e.peek(),r=-1),n=r*Number(e.scanNumber(e)),e.isNameCharCode()&&(n+=e.scanWord())),e.eat(93),{type:"Range",min:t,max:n}}(e)),e.eat(62),Oo(e,{type:"Type",name:t,opts:n})}function No(e,t){function n(e,t){return{type:"Group",terms:e,combinator:t,disallowEmpty:!1,explicit:!1}}let r
for(t=Object.keys(t).sort((e,t)=>To[e]-To[t]);t.length>0;){r=t.shift()
let o=0,i=0
for(;o<e.length;o++){const t=e[o]
"Combinator"===t.type&&(t.value===r?(-1===i&&(i=o-1),e.splice(o,1),o--):(-1!==i&&o-i>1&&(e.splice(i,o-i,n(e.slice(i,o),r)),o=i+1),i=-1))}-1!==i&&t.length&&e.splice(i,o-i,n(e.slice(i,o),r))}return r}function Do(e,t){const n=Object.create(null),r=[]
let o,i=null,a=e.pos
for(;e.charCode()!==t&&(o=jo(e,t));)"Spaces"!==o.type&&("Combinator"===o.type?(null!==i&&"Combinator"!==i.type||(e.pos=a,e.error("Unexpected combinator")),n[o.value]=!0):null!==i&&"Combinator"!==i.type&&(n[" "]=!0,r.push({type:"Combinator",value:" "})),r.push(o),i=o,a=e.pos)
return null!==i&&"Combinator"===i.type&&(e.pos-=a,e.error("Unexpected combinator")),{type:"Group",terms:r,combinator:No(r,n)||" ",disallowEmpty:!1,explicit:!1}}function jo(e,t){let n=e.charCode()
switch(n){case 93:break
case 91:return Oo(e,function(e,t){let n
return e.eat(91),n=Do(e,t),e.eat(93),n.explicit=!0,33===e.charCode()&&(e.pos++,n.disallowEmpty=!0),n}(e,t))
case 60:return 39===e.nextCharCode()?function(e){let t
return e.eat(60),e.eat(39),t=e.scanWord(),e.eat(39),e.eat(62),Oo(e,{type:"Property",name:t})}(e):Lo(e)
case 124:return{type:"Combinator",value:e.substringToPos(e.pos+(124===e.nextCharCode()?2:1))}
case 38:return e.pos++,e.eat(38),{type:"Combinator",value:"&&"}
case 44:return e.pos++,{type:"Comma"}
case 39:return Oo(e,{type:"String",value:e.scanString()})
case 32:case 9:case 10:case 13:case 12:return{type:"Spaces",value:e.scanSpaces()}
case 64:return n=e.nextCharCode(),e.isNameCharCode(n)?(e.pos++,{type:"AtKeyword",name:e.scanWord()}):Po(e)
case 42:case 43:case 63:case 35:case 33:break
case zo:if(n=e.nextCharCode(),n<48||n>57)return Po(e)
break
default:return e.isNameCharCode(n)?function(e){const t=e.scanWord()
return 40===e.charCode()?(e.pos++,{type:"Function",name:t}):Oo(e,{type:"Keyword",name:t})}(e):Po(e)}}function Mo(e){const t=new _o(e),n=Do(t)
return t.pos!==e.length&&t.error("Unexpected input"),1===n.terms.length&&"Group"===n.terms[0].type?n.terms[0]:n}const Io=function(){}
function Ro(e){return"function"==typeof e?e:Io}const Fo={decorator(e){const t=[]
let n=null
return{...e,node(t){const r=n
n=t,e.node.call(this,t),n=r},emit(e,r,o){t.push({type:r,value:e,node:o?null:n})},result:()=>t}}}
function Bo(e,t){return"string"==typeof e?function(e){const t=[]
return qn(e,(n,r,o)=>t.push({type:n,value:e.slice(r,o),node:null})),t}(e):t.generate(e,Fo)}const qo={type:"Match"},Go={type:"Mismatch"},Uo={type:"DisallowEmpty"}
function Wo(e,t,n){return t===qo&&n===Go||e===qo&&t===qo&&n===qo?e:("If"===e.type&&e.else===Go&&t===qo&&(t=e.then,e=e.match),{type:"If",match:e,then:t,else:n})}function Vo(e){return e.length>2&&40===e.charCodeAt(e.length-2)&&41===e.charCodeAt(e.length-1)}function $o(e){return"Keyword"===e.type||"AtKeyword"===e.type||"Function"===e.type||"Type"===e.type&&Vo(e.name)}function Yo(e,t=" ",n=!1){return{type:"Group",terms:e,combinator:t,disallowEmpty:!1,explicit:n}}function Xo(e,t,n=new Set){if(!n.has(e))switch(n.add(e),e.type){case"If":e.match=Xo(e.match,t,n),e.then=Xo(e.then,t,n),e.else=Xo(e.else,t,n)
break
case"Type":return t[e.name]||e}return e}function Ho(e,t,n){switch(e){case" ":{let e=qo
for(let n=t.length-1;n>=0;n--){e=Wo(t[n],e,Go)}return e}case"|":{let e=Go,n=null
for(let r=t.length-1;r>=0;r--){let o=t[r]
if($o(o)&&(null===n&&r>0&&$o(t[r-1])&&(n=Object.create(null),e=Wo({type:"Enum",map:n},qo,e)),null!==n)){const e=(Vo(o.name)?o.name.slice(0,-1):o.name).toLowerCase()
if(e in n==!1){n[e]=o
continue}}n=null,e=Wo(o,qo,e)}return e}case"&&":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!0}
let n=Go
for(let r=t.length-1;r>=0;r--){const o=t[r]
let i
i=t.length>1?Ho(e,t.filter(function(e){return e!==o}),!1):qo,n=Wo(o,i,n)}return n}case"||":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!1}
let r=n?qo:Go
for(let n=t.length-1;n>=0;n--){const o=t[n]
let i
i=t.length>1?Ho(e,t.filter(function(e){return e!==o}),!0):qo,r=Wo(o,i,r)}return r}}}function Qo(e){if("function"==typeof e)return{type:"Generic",fn:e}
switch(e.type){case"Group":{let t=Ho(e.combinator,e.terms.map(Qo),!1)
return e.disallowEmpty&&(t=Wo(t,Uo,Go)),t}case"Multiplier":return function(e){let t=qo,n=Qo(e.term)
if(0===e.max)n=Wo(n,Uo,Go),t=Wo(n,null,Go),t.then=Wo(qo,qo,t),e.comma&&(t.then.else=Wo({type:"Comma",syntax:e},t,Go))
else for(let r=e.min||1;r<=e.max;r++)e.comma&&t!==qo&&(t=Wo({type:"Comma",syntax:e},t,Go)),t=Wo(n,Wo(qo,qo,t),Go)
if(0===e.min)t=Wo(qo,qo,t)
else for(let r=0;r<e.min-1;r++)e.comma&&t!==qo&&(t=Wo({type:"Comma",syntax:e},t,Go)),t=Wo(n,t,Go)
return t}(e)
case"Boolean":{const t=Qo(e.term),n=Qo(Yo([Yo([{type:"Keyword",name:"not"},{type:"Type",name:"!boolean-group"}]),Yo([{type:"Type",name:"!boolean-group"},Yo([{type:"Multiplier",comma:!1,min:0,max:0,term:Yo([{type:"Keyword",name:"and"},{type:"Type",name:"!boolean-group"}])},{type:"Multiplier",comma:!1,min:0,max:0,term:Yo([{type:"Keyword",name:"or"},{type:"Type",name:"!boolean-group"}])}],"|")])],"|")),r=Qo(Yo([{type:"Type",name:"!term"},Yo([{type:"Token",value:"("},{type:"Type",name:"!self"},{type:"Token",value:")"}]),{type:"Type",name:"general-enclosed"}],"|"))
return Xo(r,{"!term":t,"!self":n}),Xo(n,{"!boolean-group":r}),n}case"Type":case"Property":return{type:e.type,name:e.name,syntax:e}
case"Keyword":return{type:e.type,name:e.name.toLowerCase(),syntax:e}
case"AtKeyword":return{type:e.type,name:"@"+e.name.toLowerCase(),syntax:e}
case"Function":return{type:e.type,name:e.name.toLowerCase()+"(",syntax:e}
case"String":return 3===e.value.length?{type:"Token",value:e.value.charAt(1),syntax:e}:{type:e.type,value:e.value.substr(1,e.value.length-2).replace(/\\'/g,"'"),syntax:e}
case"Token":return{type:e.type,value:e.value,syntax:e}
case"Comma":return{type:e.type,syntax:e}
default:throw new Error("Unknown node type:",e.type)}}function Ko(e,t){return"string"==typeof e&&(e=Mo(e)),{type:"MatchGraph",match:Qo(e),syntax:t||null,source:e}}const{hasOwnProperty:Zo}=Object.prototype,Jo="Match"
function ei(e,t){if(e.length!==t.length)return!1
for(let n=0;n<e.length;n++){const r=t.charCodeAt(n)
let o=e.charCodeAt(n)
if(o>=0x0041&&o<=0x005A&&(o|=32),o!==r)return!1}return!0}function ti(e){return null===e||(e.type===Kt||2===e.type||e.type===en||e.type===Zt||e.type===nn||function(e){return 9===e.type&&"?"!==e.value}(e))}function ni(e){return null===e||(e.type===tn||e.type===Jt||e.type===rn||9===e.type&&"/"===e.value)}function ri(e,t,n){const r=function(e,t,n){function r(){do{y++,b=y<e.length?e[y]:null}while(null!==b&&(b.type===Yt||b.type===on))}function o(t){const n=y+t
return n<e.length?e[n]:null}function i(e,t){return{nextState:e,matchStack:v,syntaxStack:h,thenStack:d,tokenIndex:y,prev:t}}function a(e){d={nextState:e,matchStack:v,syntaxStack:h,prev:d}}function s(e){p=i(e,p)}function l(){v={type:1,syntax:t.syntax,token:b,prev:v},r(),m=null,y>k&&(k=y)}function c(){h={syntax:t.syntax,opts:t.syntax.opts||null!==h&&h.opts||null,prev:h},v={type:2,syntax:t.syntax,token:v.token,prev:v}}function u(){v=2===v.type?v.prev:{type:3,syntax:h.syntax,token:v.token,prev:v},h=h.prev}let h=null,d=null,p=null,m=null,f=0,g=null,b=null,y=-1,k=0,v={type:0,syntax:null,token:null,prev:null}
for(r();null===g&&++f<15e3;)switch(t.type){case"Match":if(null===d){if(null!==b&&(y!==e.length-1||"\\0"!==b.value&&"\\9"!==b.value)){t=Go
break}g=Jo
break}if((t=d.nextState)===Uo){if(d.matchStack===v){t=Go
break}t=qo}for(;d.syntaxStack!==h;)u()
d=d.prev
break
case"Mismatch":if(null!==m&&!1!==m)(null===p||y>p.tokenIndex)&&(p=m,m=!1)
else if(null===p){g="Mismatch"
break}t=p.nextState,d=p.thenStack,h=p.syntaxStack,v=p.matchStack,y=p.tokenIndex,b=y<e.length?e[y]:null,p=p.prev
break
case"MatchGraph":t=t.match
break
case"If":t.else!==Go&&s(t.else),t.then!==qo&&a(t.then),t=t.match
break
case"MatchOnce":t={type:"MatchOnceBuffer",syntax:t,index:0,mask:0}
break
case"MatchOnceBuffer":{const e=t.syntax.terms
if(t.index===e.length){if(0===t.mask||t.syntax.all){t=Go
break}t=qo
break}if(t.mask===(1<<e.length)-1){t=qo
break}for(;t.index<e.length;t.index++){const n=1<<t.index
if(0===(t.mask&n)){s(t),a({type:"AddMatchOnce",syntax:t.syntax,mask:t.mask|n}),t=e[t.index++]
break}}break}case"AddMatchOnce":t={type:"MatchOnceBuffer",syntax:t.syntax,index:0,mask:t.mask}
break
case"Enum":if(null!==b){let e=b.value.toLowerCase()
if(-1!==e.indexOf("\\")&&(e=e.replace(/\\[09].*$/,"")),Zo.call(t.map,e)){t=t.map[e]
break}}t=Go
break
case"Generic":{const e=null!==h?h.opts:null,n=y+Math.floor(t.fn(b,o,e))
if(!isNaN(n)&&n>y){for(;y<n;)l()
t=qo}else t=Go
break}case"Type":case"Property":{const e="Type"===t.type?"types":"properties",r=Zo.call(n,e)?n[e][t.name]:null
if(!r||!r.match)throw new Error("Bad syntax reference: "+("Type"===t.type?"<"+t.name+">":"<'"+t.name+"'>"))
if(!1!==m&&null!==b&&"Type"===t.type&&("custom-ident"===t.name&&1===b.type||"length"===t.name&&"0"===b.value)){null===m&&(m=i(t,p)),t=Go
break}c(),t=r.matchRef||r.match
break}case"Keyword":{const e=t.name
if(null!==b){let n=b.value
if(-1!==n.indexOf("\\")&&(n=n.replace(/\\[09].*$/,"")),ei(n,e)){l(),t=qo
break}}t=Go
break}case"AtKeyword":case"Function":if(null!==b&&ei(b.value,t.name)){l(),t=qo
break}t=Go
break
case"Token":if(null!==b&&b.value===t.value){l(),t=qo
break}t=Go
break
case"Comma":null!==b&&b.type===Kt?ti(v.token)?t=Go:(l(),t=ni(b)?Go:qo):t=ti(v.token)||ni(b)?qo:Go
break
case"String":let r="",f=y
for(;f<e.length&&r.length<t.value.length;f++)r+=e[f].value
if(ei(r,t.value)){for(;y<f;)l()
t=qo}else t=Go
break
default:throw new Error("Unknown node type: "+t.type)}switch(g){case null:console.warn("[csstree-match] BREAK after 15000 iterations"),g="Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)",v=null
break
case Jo:for(;null!==h;)u()
break
default:v=null}return{tokens:e,reason:g,iterations:f,match:v,longestMatch:k}}(e,t,n||{})
if(null===r.match)return r
let o=r.match,i=r.match={syntax:t.syntax||null,match:[]}
const a=[i]
for(o=function(e){let t=null,n=null,r=e
for(;null!==r;)n=r.prev,r.prev=t,t=r,r=n
return t}(o).prev;null!==o;){switch(o.type){case 2:i.match.push(i={syntax:o.syntax,match:[]}),a.push(i)
break
case 3:a.pop(),i=a[a.length-1]
break
default:i.match.push({syntax:o.syntax||null,token:o.token.value,node:o.token.node})}o=o.prev}return r}function oi(e){function t(e){return null!==e&&("Type"===e.type||"Property"===e.type||"Keyword"===e.type)}let n=null
return null!==this.matched&&!function r(o){if(Array.isArray(o.match)){for(let e=0;e<o.match.length;e++)if(r(o.match[e]))return t(o.syntax)&&n.unshift(o.syntax),!0}else if(o.node===e)return n=t(o.syntax)?[o.syntax]:[],!0
return!1}(this.matched),n}function ii(e,t,n){const r=oi.call(e,t)
return null!==r&&r.some(n)}var ai=Object.freeze({__proto__:null,getTrace:oi,isKeyword:function(e){return ii(this,e,e=>"Keyword"===e.type)},isProperty:function(e,t){return ii(this,e,e=>"Property"===e.type&&e.name===t)},isType:function(e,t){return ii(this,e,e=>"Type"===e.type&&e.name===t)}})
function si(e){return"node"in e?e.node:si(e.match[0])}function li(e){return"node"in e?e.node:li(e.match[e.match.length-1])}function ci(e,t,n,r,o){const i=[]
return null!==n.matched&&!function n(a){if(null!==a.syntax&&a.syntax.type===r&&a.syntax.name===o){const n=si(a),r=li(a)
e.syntax.walk(t,function(e,t,o){if(e===n){const e=new Un
do{if(e.appendData(t.data),t.data===r)break
t=t.next}while(null!==t)
i.push({parent:o,nodes:e})}})}Array.isArray(a.match)&&a.match.forEach(n)}(n.matched),i}const{hasOwnProperty:ui}=Object.prototype
function hi(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&e>=0}function di(e){return Boolean(e)&&hi(e.offset)&&hi(e.line)&&hi(e.column)}function pi(e,t){return function(n,r){if(!n||n.constructor!==Object)return r(n,"Type of node should be an Object")
for(let o in n){let i=!0
if(!1!==ui.call(n,o)){if("type"===o)n.type!==e&&r(n,"Wrong node type `"+n.type+"`, expected `"+e+"`")
else if("loc"===o){if(null===n.loc)continue
if(n.loc&&n.loc.constructor===Object)if("string"!=typeof n.loc.source)o+=".source"
else if(di(n.loc.start)){if(di(n.loc.end))continue
o+=".end"}else o+=".start"
i=!1}else if(t.hasOwnProperty(o)){i=!1
for(let e=0;!i&&e<t[o].length;e++){const r=t[o][e]
switch(r){case String:i="string"==typeof n[o]
break
case Boolean:i="boolean"==typeof n[o]
break
case null:i=null===n[o]
break
default:"string"==typeof r?i=n[o]&&n[o].type===r:Array.isArray(r)&&(i=n[o]instanceof Un)}}}else r(n,"Unknown field `"+o+"` for "+e+" node type")
i||r(n,"Bad value for `"+e+"."+o+"`")}}for(const o in t)ui.call(t,o)&&!1===ui.call(n,o)&&r(n,"Field `"+e+"."+o+"` is missed")}}function mi(e,t){const n=[]
for(let r=0;r<e.length;r++){const o=e[r]
if(o===String||o===Boolean)n.push(o.name.toLowerCase())
else if(null===o)n.push("null")
else if("string"==typeof o)n.push(o)
else{if(!Array.isArray(o))throw new Error("Wrong value `"+o+"` in `"+t+"` structure definition")
n.push("List<"+(mi(o,t)||"any")+">")}}return n.join(" | ")}function fi(e,t){const n=t.structure,r={type:String,loc:!0},o={type:'"'+e+'"'}
for(const t in n){if(!1===ui.call(n,t))continue
const i=r[t]=Array.isArray(n[t])?n[t].slice():[n[t]]
o[t]=mi(i,e+"."+t)}return{docs:o,check:pi(e,r)}}function gi(e,t,n){const r={}
for(const o in e)e[o].syntax&&(r[o]=n?e[o].syntax:Fr(e[o].syntax,{compact:t}))
return r}function bi(e,t,n){const r={}
for(const[o,i]of Object.entries(e))r[o]={prelude:i.prelude&&(n?i.prelude.syntax:Fr(i.prelude.syntax,{compact:t})),descriptors:i.descriptors&&gi(i.descriptors,t,n)}
return r}function yi(e,t,n){return{matched:e,iterations:n,error:t,...ai}}function ki(e,t,n,r){const o=Bo(n,e.syntax)
let i
return function(e){for(let t=0;t<e.length;t++)if("var("===e[t].value.toLowerCase())return!0
return!1}(o)?yi(null,new Error("Matching for a tree with var() is not supported")):(r&&(i=ri(o,e.cssWideKeywordsSyntax,e)),r&&i.match||(i=ri(o,t.match,e),i.match)?yi(i.match,null,i.iterations):yi(null,new Wr(i.reason,t.syntax,n,i),i.iterations))}let vi=class{constructor(e,t,n){if(this.cssWideKeywords=Kr,this.syntax=t,this.generic=!1,this.units={...So},this.atrules=Object.create(null),this.properties=Object.create(null),this.types=Object.create(null),this.structure=n||function(e){const t={}
if(e.node)for(const n in e.node)if(ui.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=fi(n,r)}return t}(e),e){if(e.cssWideKeywords&&(this.cssWideKeywords=e.cssWideKeywords),e.units)for(const t of Object.keys(So))Array.isArray(e.units[t])&&(this.units[t]=e.units[t])
if(e.types)for(const[t,n]of Object.entries(e.types))this.addType_(t,n)
if(e.generic){this.generic=!0
for(const[e,t]of Object.entries(function(e){return{...vo,...wo,...xo(e)}}(this.units)))this.addType_(e,t)}if(e.atrules)for(const[t,n]of Object.entries(e.atrules))this.addAtrule_(t,n)
if(e.properties)for(const[t,n]of Object.entries(e.properties))this.addProperty_(t,n)}this.cssWideKeywordsSyntax=Ko(this.cssWideKeywords.join(" |  "))}checkStructure(e){function t(e,t){r.push({node:e,message:t})}const n=this.structure,r=[]
return this.syntax.walk(e,function(e){n.hasOwnProperty(e.type)?n[e.type].check(e,t):t(e,"Unknown node type `"+e.type+"`")}),!!r.length&&r}createDescriptor(e,t,n,r=null){const o={type:t,name:n},i={type:t,name:n,parent:r,serializable:"string"==typeof e||e&&"string"==typeof e.type,syntax:null,match:null,matchRef:null}
return"function"==typeof e?i.match=Ko(e,o):("string"==typeof e?Object.defineProperty(i,"syntax",{get:()=>(Object.defineProperty(i,"syntax",{value:Mo(e)}),i.syntax)}):i.syntax=e,Object.defineProperty(i,"match",{get:()=>(Object.defineProperty(i,"match",{value:Ko(i.syntax,o)}),i.match)}),"Property"===t&&Object.defineProperty(i,"matchRef",{get(){const e=i.syntax,t=function(e){const t=e.terms[0]
return!1===e.explicit&&1===e.terms.length&&"Multiplier"===t.type&&!0===t.comma}(e)?Ko({...e,terms:[e.terms[0].term]},o):null
return Object.defineProperty(i,"matchRef",{value:t}),t}})),i}addAtrule_(e,t){t&&(this.atrules[e]={type:"Atrule",name:e,prelude:t.prelude?this.createDescriptor(t.prelude,"AtrulePrelude",e):null,descriptors:t.descriptors?Object.keys(t.descriptors).reduce((n,r)=>(n[r]=this.createDescriptor(t.descriptors[r],"AtruleDescriptor",r,e),n),Object.create(null)):null})}addProperty_(e,t){t&&(this.properties[e]=this.createDescriptor(t,"Property",e))}addType_(e,t){t&&(this.types[e]=this.createDescriptor(t,"Type",e))}checkAtruleName(e){if(!this.getAtrule(e))return new Ur("Unknown at-rule","@"+e)}checkAtrulePrelude(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e)
return!r.prelude&&t?new SyntaxError("At-rule `@"+e+"` should not contain a prelude"):!r.prelude||t||ki(this,r.prelude,"",!1).matched?void 0:new SyntaxError("At-rule `@"+e+"` should contain a prelude")}checkAtruleDescriptorName(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e),o=Yr(t)
return r.descriptors?r.descriptors[o.name]||r.descriptors[o.basename]?void 0:new Ur("Unknown at-rule descriptor",t):new SyntaxError("At-rule `@"+e+"` has no known descriptors")}checkPropertyName(e){if(!this.getProperty(e))return new Ur("Unknown property",e)}matchAtrulePrelude(e,t){const n=this.checkAtrulePrelude(e,t)
if(n)return yi(null,n)
const r=this.getAtrule(e)
return r.prelude?ki(this,r.prelude,t||"",!1):yi(null,null)}matchAtruleDescriptor(e,t,n){const r=this.checkAtruleDescriptorName(e,t)
if(r)return yi(null,r)
const o=this.getAtrule(e),i=Yr(t)
return ki(this,o.descriptors[i.name]||o.descriptors[i.basename],n,!1)}matchDeclaration(e){return"Declaration"!==e.type?yi(null,new Error("Not a Declaration node")):this.matchProperty(e.property,e.value)}matchProperty(e,t){if(Xr(e).custom)return yi(null,new Error("Lexer matching doesn't applicable for custom properties"))
const n=this.checkPropertyName(e)
return n?yi(null,n):ki(this,this.getProperty(e),t,!0)}matchType(e,t){const n=this.getType(e)
return n?ki(this,n,t,!1):yi(null,new Ur("Unknown type",e))}match(e,t){return"string"==typeof e||e&&e.type?("string"!=typeof e&&e.match||(e=this.createDescriptor(e,"Type","anonymous")),ki(this,e,t,!1)):yi(null,new Ur("Bad syntax"))}findValueFragments(e,t,n,r){return ci(this,t,this.matchProperty(e,t),n,r)}findDeclarationValueFragments(e,t,n){return ci(this,e.value,this.matchDeclaration(e),t,n)}findAllFragments(e,t,n){const r=[]
return this.syntax.walk(e,{visit:"Declaration",enter:e=>{r.push.apply(r,this.findDeclarationValueFragments(e,t,n))}}),r}getAtrule(e,t=!0){const n=Yr(e)
return(n.vendor&&t?this.atrules[n.name]||this.atrules[n.basename]:this.atrules[n.name])||null}getAtrulePrelude(e,t=!0){const n=this.getAtrule(e,t)
return n&&n.prelude||null}getAtruleDescriptor(e,t){return this.atrules.hasOwnProperty(e)&&this.atrules.declarators&&this.atrules[e].declarators[t]||null}getProperty(e,t=!0){const n=Xr(e)
return(n.vendor&&t?this.properties[n.name]||this.properties[n.basename]:this.properties[n.name])||null}getType(e){return hasOwnProperty.call(this.types,e)?this.types[e]:null}validate(){function e(e,t){return t?`<${e}>`:`<'${e}'>`}function t(i,a,s,l){if(s.has(a))return s.get(a)
s.set(a,!1),null!==l.syntax&&function(e,t,n){let r=Io,o=Io
if("function"==typeof t?r=t:t&&(r=Ro(t.enter),o=Ro(t.leave)),r===Io&&o===Io)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
!function e(t){switch(r.call(n,t),t.type){case"Group":t.terms.forEach(e)
break
case"Multiplier":case"Boolean":e(t.term)
break
case"Type":case"Property":case"Keyword":case"AtKeyword":case"Function":case"String":case"Token":case"Comma":break
default:throw new Error("Unknown type: "+t.type)}o.call(n,t)}(e)}(l.syntax,function(l){if("Type"!==l.type&&"Property"!==l.type)return
const c="Type"===l.type?i.types:i.properties,u="Type"===l.type?r:o
hasOwnProperty.call(c,l.name)?t(i,l.name,u,c[l.name])&&(n.push(`${e(a,s===r)} used broken syntax definition ${e(l.name,"Type"===l.type)}`),s.set(a,!0)):(n.push(`${e(a,s===r)} used missed syntax definition ${e(l.name,"Type"===l.type)}`),s.set(a,!0))},this)}const n=[]
let r=new Map,o=new Map
for(const e in this.types)t(this,e,r,this.types[e])
for(const e in this.properties)t(this,e,o,this.properties[e])
const i=[...r.keys()].filter(e=>r.get(e)),a=[...o.keys()].filter(e=>o.get(e))
return i.length||a.length?{errors:n,types:i,properties:a}:null}dump(e,t){return{generic:this.generic,cssWideKeywords:this.cssWideKeywords,units:this.units,types:gi(this.types,!t,e),properties:gi(this.properties,!t,e),atrules:bi(this.atrules,!t,e)}}toString(){return JSON.stringify(this.dump())}}
function wi(e,t){return"string"==typeof t&&/^\s*\|/.test(t)?"string"==typeof e?e+t:t.replace(/^\s*\|\s*/,""):t||null}function xi(e,t){const n=Object.create(null)
for(const[r,o]of Object.entries(e))if(o){n[r]={}
for(const e of Object.keys(o))t.includes(e)&&(n[r][e]=o[e])}return n}function Si(e,t){const n={...e}
for(const[r,o]of Object.entries(t))switch(r){case"generic":n[r]=Boolean(o)
break
case"cssWideKeywords":n[r]=e[r]?[...e[r],...o]:o||[]
break
case"units":n[r]={...e[r]}
for(const[e,t]of Object.entries(o))n[r][e]=Array.isArray(t)?t:[]
break
case"atrules":n[r]={...e[r]}
for(const[e,t]of Object.entries(o)){const o=n[r][e]||{},i=n[r][e]={prelude:o.prelude||null,descriptors:{...o.descriptors}}
if(t){i.prelude=t.prelude?wi(i.prelude,t.prelude):i.prelude||null
for(const[e,n]of Object.entries(t.descriptors||{}))i.descriptors[e]=n?wi(i.descriptors[e],n):null
Object.keys(i.descriptors).length||(i.descriptors=null)}}break
case"types":case"properties":n[r]={...e[r]}
for(const[e,t]of Object.entries(o))n[r][e]=wi(n[r][e],t)
break
case"scope":case"features":n[r]={...e[r]}
for(const[e,t]of Object.entries(o))n[r][e]={...n[r][e],...t}
break
case"parseContext":n[r]={...e[r],...o}
break
case"atrule":case"pseudo":n[r]={...e[r],...xi(o,["parse"])}
break
case"node":n[r]={...e[r],...xi(o,["name","structure","parse","generate","walkContext"])}}return n}function Ci(e){const t=Zn(e),n=Mr(e),r=Tr(e),{fromPlainObject:o,toPlainObject:i}=function(e){return{fromPlainObject:t=>(e(t,{enter(e){e.children&&e.children instanceof Un==0&&(e.children=(new Un).fromArray(e.children))}}),t),toPlainObject:t=>(e(t,{leave(e){e.children&&e.children instanceof Un&&(e.children=e.children.toArray())}}),t)}}(n),a={lexer:null,createLexer:e=>new vi(e,a,a.lexer.structure),tokenize:qn,parse:t,generate:r,walk:n,find:n.find,findLast:n.findLast,findAll:n.findAll,fromPlainObject:o,toPlainObject:i,fork(t){const n=Si({},e)
return Ci("function"==typeof t?t(n):Si(n,t))}}
return a.lexer=new vi({generic:e.generic,cssWideKeywords:e.cssWideKeywords,units:e.units,types:e.types,atrules:e.atrules,properties:e.properties,node:e.node},a),a}const Ai=0x002B,_i=0x002D,zi=0x006E,Ti=!0
function Ei(e,t){let n=this.tokenStart+e
const r=this.charCodeAt(n)
for(r!==Ai&&r!==_i||(t&&this.error("Number sign is not allowed"),n++);n<this.tokenEnd;n++)an(this.charCodeAt(n))||this.error("Integer is expected",n)}function Oi(e){return Ei.call(this,0,e)}function Pi(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let n=""
switch(t){case zi:n="N is expected"
break
case _i:n="HyphenMinus is expected"}this.error(n,this.tokenStart+e)}}function Li(){let e=0,t=0,n=this.tokenType
for(;n===Yt||n===on;)n=this.lookupType(++e)
if(n!==Wt){if(!this.isDelim(Ai,e)&&!this.isDelim(_i,e))return null
t=this.isDelim(Ai,e)?Ai:_i
do{n=this.lookupType(++e)}while(n===Yt||n===on)
n!==Wt&&(this.skip(e),Oi.call(this,Ti))}return e>0&&this.skip(e),0===t&&(n=this.charCodeAt(this.tokenStart),n!==Ai&&n!==_i&&this.error("Number sign is expected")),Oi.call(this,0!==t),t===_i?"-"+this.consume(Wt):this.consume(Wt)}const Ni={a:[String,null],b:[String,null]}
function Di(){const e=this.tokenStart
let t=null,n=null
if(this.tokenType===Wt)Oi.call(this,false),n=this.consume(Wt)
else if(1===this.tokenType&&this.cmpChar(this.tokenStart,_i))switch(t="-1",Pi.call(this,1,zi),this.tokenEnd-this.tokenStart){case 2:this.next(),n=Li.call(this)
break
case 3:Pi.call(this,2,_i),this.next(),this.skipSC(),Oi.call(this,Ti),n="-"+this.consume(Wt)
break
default:Pi.call(this,2,_i),Ei.call(this,3,Ti),this.next(),n=this.substrToCursor(e+2)}else if(1===this.tokenType||this.isDelim(Ai)&&1===this.lookupType(1)){let r=0
switch(t="1",this.isDelim(Ai)&&(r=1,this.next()),Pi.call(this,0,zi),this.tokenEnd-this.tokenStart){case 1:this.next(),n=Li.call(this)
break
case 2:Pi.call(this,1,_i),this.next(),this.skipSC(),Oi.call(this,Ti),n="-"+this.consume(Wt)
break
default:Pi.call(this,1,_i),Ei.call(this,2,Ti),this.next(),n=this.substrToCursor(e+r+1)}}else if(this.tokenType===$t){const r=this.charCodeAt(this.tokenStart),o=r===Ai||r===_i
let i=this.tokenStart+o
for(;i<this.tokenEnd&&an(this.charCodeAt(i));i++);i===this.tokenStart+o&&this.error("Integer is expected",this.tokenStart+o),Pi.call(this,i-this.tokenStart,zi),t=this.substring(e,i),i+1===this.tokenEnd?(this.next(),n=Li.call(this)):(Pi.call(this,i-this.tokenStart+1,_i),i+2===this.tokenEnd?(this.next(),this.skipSC(),Oi.call(this,Ti),n="-"+this.consume(Wt)):(Ei.call(this,i-this.tokenStart+2,Ti),this.next(),n=this.substrToCursor(i+1)))}else this.error()
return null!==t&&t.charCodeAt(0)===Ai&&(t=t.substr(1)),null!==n&&n.charCodeAt(0)===Ai&&(n=n.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:n}}var ji=Object.freeze({__proto__:null,generate:function(e){if(e.a){const t=("+1"===e.a||"1"===e.a?"n":"-1"===e.a&&"-n")||e.a+"n"
if(e.b){const n="-"===e.b[0]||"+"===e.b[0]?e.b:"+"+e.b
this.tokenize(t+n)}else this.tokenize(t)}else this.tokenize(e.b)},name:"AnPlusB",parse:Di,structure:Ni})
function Mi(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Ii(){for(let e,t=1;e=this.lookupType(t);t++){if(e===rn)return!0
if(e===nn||3===e)return!1}return!1}const Ri={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]}
function Fi(e=!1){const t=this.tokenStart
let n,r,o=null,i=null
switch(this.eat(3),n=this.substrToCursor(t+1),r=n.toLowerCase(),this.skipSC(),!1===this.eof&&this.tokenType!==nn&&this.tokenType!==Qt&&(o=this.parseAtrulePrelude?this.parseWithFallback(this.AtrulePrelude.bind(this,n,e),Mi):Mi.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case Qt:this.next()
break
case nn:i=hasOwnProperty.call(this.atrule,r)&&"function"==typeof this.atrule[r].block?this.atrule[r].block.call(this,e):this.Block(Ii.call(this))}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:n,prelude:o,block:i}}var Bi=Object.freeze({__proto__:null,generate:function(e){this.token(3,"@"+e.name),null!==e.prelude&&this.node(e.prelude),e.block?this.node(e.block):this.token(Qt,";")},name:"Atrule",parse:Fi,structure:Ri,walkContext:"atrule"})
function qi(e){let t=null
return null!==e&&(e=e.toLowerCase()),this.skipSC(),t=hasOwnProperty.call(this.atrule,e)&&"function"==typeof this.atrule[e].prelude?this.atrule[e].prelude.call(this):this.readSequence(this.scope.AtrulePrelude),this.skipSC(),!0!==this.eof&&this.tokenType!==nn&&this.tokenType!==Qt&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}var Gi=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"AtrulePrelude",parse:qi,structure:{children:[[]]},walkContext:"atrulePrelude"})
function Ui(){this.eof&&this.error("Unexpected end of input")
const e=this.tokenStart
let t=!1
return this.isDelim(42)?(t=!0,this.next()):this.isDelim(124)||this.eat(1),this.isDelim(124)?61!==this.charCodeAt(this.tokenStart+1)?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Wi(){const e=this.tokenStart,t=this.charCodeAt(e)
return 61!==t&&126!==t&&94!==t&&36!==t&&42!==t&&124!==t&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),61!==t&&(this.isDelim(61)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}const Vi={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]}
function $i(){const e=this.tokenStart
let t,n=null,r=null,o=null
return this.eat(Zt),this.skipSC(),t=Ui.call(this),this.skipSC(),this.tokenType!==Jt&&(1!==this.tokenType&&(n=Wi.call(this),this.skipSC(),r=5===this.tokenType?this.String():this.Identifier(),this.skipSC()),1===this.tokenType&&(o=this.consume(1),this.skipSC())),this.eat(Jt),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:n,value:r,flags:o}}var Yi=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.node(e.name),null!==e.matcher&&(this.tokenize(e.matcher),this.node(e.value)),null!==e.flags&&this.token(1,e.flags),this.token(9,"]")},name:"AttributeSelector",parse:$i,structure:Vi})
function Xi(){return this.Raw(null,!0)}function Hi(){return this.parseWithFallback(this.Rule,Xi)}function Qi(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function Ki(){if(this.tokenType===Qt)return Qi.call(this,this.tokenIndex)
const e=this.parseWithFallback(this.Declaration,Qi)
return this.tokenType===Qt&&this.next(),e}function Zi(e){const t=e?Ki:Hi,n=this.tokenStart
let r=this.createList()
this.eat(nn)
e:for(;!this.eof;)switch(this.tokenType){case rn:break e
case Yt:case on:this.next()
break
case 3:r.push(this.parseWithFallback(this.Atrule.bind(this,e),Xi))
break
default:e&&this.isDelim(38)?r.push(Hi.call(this)):r.push(t.call(this))}return this.eof||this.eat(rn),{type:"Block",loc:this.getLocation(n,this.tokenStart),children:r}}var Ji=Object.freeze({__proto__:null,generate:function(e){this.token(nn,"{"),this.children(e,e=>{"Declaration"===e.type&&this.token(Qt,";")}),this.token(rn,"}")},name:"Block",parse:Zi,structure:{children:[["Atrule","Rule","Declaration"]]},walkContext:"block"})
function ea(e,t){const n=this.tokenStart
let r=null
return this.eat(Zt),r=e.call(this,t),this.eof||this.eat(Jt),{type:"Brackets",loc:this.getLocation(n,this.tokenStart),children:r}}var ta=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.children(e),this.token(9,"]")},name:"Brackets",parse:ea,structure:{children:[[]]}})
function na(){const e=this.tokenStart
return this.eat(Xt),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}var ra=Object.freeze({__proto__:null,generate:function(){this.token(Xt,"--\x3e")},name:"CDC",parse:na,structure:[]})
function oa(){const e=this.tokenStart
return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}var ia=Object.freeze({__proto__:null,generate:function(){this.token(14,"\x3c!--")},name:"CDO",parse:oa,structure:[]})
const aa={name:String}
function sa(){return this.eatDelim(46),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}var la=Object.freeze({__proto__:null,generate:function(e){this.token(9,"."),this.token(1,e.name)},name:"ClassSelector",parse:sa,structure:aa})
const ca={name:String}
function ua(){const e=this.tokenStart
let t
switch(this.tokenType){case Yt:t=" "
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 62:case 43:case 126:this.next()
break
case 47:this.next(),this.eatIdent("deep"),this.eatDelim(47)
break
default:this.error("Combinator is expected")}t=this.substrToCursor(e)}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}var ha=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"Combinator",parse:ua,structure:ca})
const da={value:String}
function pa(){const e=this.tokenStart
let t=this.tokenEnd
return this.eat(on),t-e+2>=2&&42===this.charCodeAt(t-2)&&47===this.charCodeAt(t-1)&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}var ma=Object.freeze({__proto__:null,generate:function(e){this.token(on,"/*"+e.value+"*/")},name:"Comment",parse:pa,structure:da})
const fa=new Set([Ht,tn,0]),ga={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]}
function ba(e){return 1===this.lookupTypeNonSC(1)&&fa.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}const ya={media:ba,container:ba,supports(){return this.SupportsDeclaration()}}
function ka(e="media"){const t=this.createList()
e:for(;!this.eof;)switch(this.tokenType){case on:case Yt:this.next()
continue
case 1:t.push(this.Identifier())
break
case en:{let n=this.parseWithFallback(()=>ya[e].call(this,e),()=>null)
n||(n=this.parseWithFallback(()=>{this.eat(en)
const t=this.Condition(e)
return this.eat(tn),t},()=>this.GeneralEnclosed(e))),t.push(n)
break}case 2:{let n=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null)
n||(n=this.GeneralEnclosed(e)),t.push(n)
break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}var va=Object.freeze({__proto__:null,generate:function(e){e.children.forEach(e=>{"Condition"===e.type?(this.token(en,"("),this.node(e),this.token(tn,")")):this.node(e)})},name:"Condition",parse:ka,structure:ga})
function wa(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function xa(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function Sa(){const e=this.tokenIndex,t=this.Value()
return"Raw"!==t.type&&!1===this.eof&&this.tokenType!==Qt&&!1===this.isDelim(33)&&!1===this.isBalanceEdge(e)&&this.error(),t}const Ca={important:[Boolean,String],property:String,value:["Value","Raw"]}
function Aa(){const e=this.tokenStart,t=this.tokenIndex,n=_a.call(this),r=Hr(n),o=r?this.parseCustomProperty:this.parseValue,i=r?xa:wa
let a,s=!1
this.skipSC(),this.eat(Ht)
const l=this.tokenIndex
if(r||this.skipSC(),a=o?this.parseWithFallback(Sa,i):i.call(this,this.tokenIndex),r&&"Value"===a.type&&a.children.isEmpty)for(let e=l-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Yt){a.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}return this.isDelim(33)&&(s=za.call(this),this.skipSC()),!1===this.eof&&this.tokenType!==Qt&&!1===this.isBalanceEdge(t)&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:s,property:n,value:a}}function _a(){const e=this.tokenStart
if(9===this.tokenType)switch(this.charCodeAt(this.tokenStart)){case 42:case 36:case 43:case 35:case 38:this.next()
break
case 47:this.next(),this.isDelim(47)&&this.next()}return 4===this.tokenType?this.eat(4):this.eat(1),this.substrToCursor(e)}function za(){this.eat(9),this.skipSC()
const e=this.consume(1)
return"important"===e||e}var Ta=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.property),this.token(Ht,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,!0===e.important?"important":e.important))},name:"Declaration",parse:Aa,structure:Ca,walkContext:"declaration"})
function Ea(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function Oa(){const e=this.createList()
for(;!this.eof;)switch(this.tokenType){case Yt:case on:case Qt:this.next()
break
case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),Ea))
break
default:this.isDelim(38)?e.push(this.parseWithFallback(this.Rule,Ea)):e.push(this.parseWithFallback(this.Declaration,Ea))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}var Pa=Object.freeze({__proto__:null,generate:function(e){this.children(e,e=>{"Declaration"===e.type&&this.token(Qt,";")})},name:"DeclarationList",parse:Oa,structure:{children:[["Declaration","Atrule","Rule"]]}})
const La={value:String,unit:String}
function Na(){const e=this.tokenStart,t=this.consumeNumber($t)
return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}var Da=Object.freeze({__proto__:null,generate:function(e){this.token($t,e.value+e.unit)},name:"Dimension",parse:Na,structure:La})
const ja={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]}
function Ma(e){const t=this.tokenStart
let n,r=null
if(this.eat(en),this.skipSC(),n=this.consume(1),this.skipSC(),this.tokenType!==tn){switch(this.eat(Ht),this.skipSC(),this.tokenType){case Wt:r=9===this.lookupNonWSType(1)?this.Ratio():this.Number()
break
case $t:r=this.Dimension()
break
case 1:r=this.Identifier()
break
case 2:r=this.parseWithFallback(()=>{const e=this.Function(this.readSequence,this.scope.Value)
return this.skipSC(),this.isDelim(47)&&this.error(),e},()=>this.Ratio())
break
default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(tn),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:n,value:r}}var Ia=Object.freeze({__proto__:null,generate:function(e){this.token(en,"("),this.token(1,e.name),null!==e.value&&(this.token(Ht,":"),this.node(e.value)),this.token(tn,")")},name:"Feature",parse:Ma,structure:ja})
const Ra={kind:String,feature:String,value:["Declaration","Selector"]}
function Fa(e,t){const n=(this.features[e]||{})[t]
return"function"!=typeof n&&this.error(`Unknown feature ${t}()`),n}function Ba(e="unknown"){const t=this.tokenStart,n=this.consumeFunctionName(),r=Fa.call(this,e,n.toLowerCase())
this.skipSC()
const o=this.parseWithFallback(()=>{const e=this.tokenIndex,t=r.call(this)
return!1===this.eof&&!1===this.isBalanceEdge(e)&&this.error(),t},()=>this.Raw(null,!1))
return this.eof||this.eat(tn),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:n,value:o}}var qa=Object.freeze({__proto__:null,generate:function(e){this.token(2,e.feature+"("),this.node(e.value),this.token(tn,")")},name:"FeatureFunction",parse:Ba,structure:Ra})
const Ga={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]}
function Ua(){switch(this.skipSC(),this.tokenType){case Wt:return this.isDelim(47,this.lookupOffsetNonSC(1))?this.Ratio():this.Number()
case $t:return this.Dimension()
case 1:return this.Identifier()
case 2:return this.parseWithFallback(()=>{const e=this.Function(this.readSequence,this.scope.Value)
return this.skipSC(),this.isDelim(47)&&this.error(),e},()=>this.Ratio())
default:this.error("Number, dimension, ratio or identifier is expected")}}function Wa(e){if(this.skipSC(),this.isDelim(60)||this.isDelim(62)){const e=this.source[this.tokenStart]
return this.next(),this.isDelim(61)?(this.next(),e+"="):e}if(this.isDelim(61))return"="
this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function Va(e="unknown"){const t=this.tokenStart
this.skipSC(),this.eat(en)
const n=Ua.call(this),r=Wa.call(this,"Identifier"===n.type),o=Ua.call(this)
let i=null,a=null
return this.lookupNonWSType(0)!==tn&&(i=Wa.call(this),a=Ua.call(this)),this.skipSC(),this.eat(tn),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:n,leftComparison:r,middle:o,rightComparison:i,right:a}}var $a=Object.freeze({__proto__:null,generate:function(e){this.token(en,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(tn,")")},name:"FeatureRange",parse:Va,structure:Ga})
const Ya={name:String,children:[[]]}
function Xa(e,t){const n=this.tokenStart,r=this.consumeFunctionName(),o=r.toLowerCase()
let i
return i=t.hasOwnProperty(o)?t[o].call(this,t):e.call(this,t),this.eof||this.eat(tn),{type:"Function",loc:this.getLocation(n,this.tokenStart),name:r,children:i}}var Ha=Object.freeze({__proto__:null,generate:function(e){this.token(2,e.name+"("),this.children(e),this.token(tn,")")},name:"Function",parse:Xa,structure:Ya,walkContext:"function"})
const Qa={kind:String,function:[String,null],children:[[]]}
function Ka(e){const t=this.tokenStart
let n=null
2===this.tokenType?n=this.consumeFunctionName():this.eat(en)
const r=this.parseWithFallback(()=>{const e=this.tokenIndex,t=this.readSequence(this.scope.Value)
return!1===this.eof&&!1===this.isBalanceEdge(e)&&this.error(),t},()=>this.createSingleNodeList(this.Raw(null,!1)))
return this.eof||this.eat(tn),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:n,children:r}}var Za=Object.freeze({__proto__:null,generate:function(e){e.function?this.token(2,e.function+"("):this.token(en,"("),this.children(e),this.token(tn,")")},name:"GeneralEnclosed",parse:Ka,structure:Qa})
const Ja={value:String}
function es(){const e=this.tokenStart
return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}var ts=Object.freeze({__proto__:null,generate:function(e){this.token(4,"#"+e.value)},name:"Hash",parse:es,structure:Ja,xxx:"XXX"})
const ns={name:String}
function rs(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}var os=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.name)},name:"Identifier",parse:rs,structure:ns})
const is={name:String}
function as(){const e=this.tokenStart
return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}var ss=Object.freeze({__proto__:null,generate:function(e){this.token(9,"#"+e.name)},name:"IdSelector",parse:as,structure:is})
const ls={name:String}
function cs(){let e=this.tokenStart,t=this.consume(1)
for(;this.isDelim(46);)this.eat(9),t+="."+this.consume(1)
return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}var us=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"Layer",parse:cs,structure:ls})
function hs(){const e=this.createList()
for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===Kt);)this.skipSC(),this.next(),this.skipSC()
return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}var ds=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Kt,","))},name:"LayerList",parse:hs,structure:{children:[["Layer"]]}})
const ps={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]}
function ms(){const e=this.tokenStart
let t=null,n=null,r=null
if(this.skipSC(),1===this.tokenType&&this.lookupTypeNonSC(1)!==en){const e=this.consume(1),o=e.toLowerCase()
switch("not"===o||"only"===o?(this.skipSC(),t=o,n=this.consume(1)):n=e,this.lookupTypeNonSC(0)){case 1:this.skipSC(),this.eatIdent("and"),r=this.Condition("media")
break
case nn:case Qt:case Kt:case 0:break
default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case en:case 2:r=this.Condition("media")
break
case nn:case Qt:case 0:break
default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:n,condition:r}}var fs=Object.freeze({__proto__:null,generate:function(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)},name:"MediaQuery",parse:ms,structure:ps})
function gs(){const e=this.createList()
for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===Kt);)this.next()
return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}var bs=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Kt,","))},name:"MediaQueryList",parse:gs,structure:{children:[["MediaQuery"]]}})
function ys(){const e=this.tokenStart
return this.eatDelim(38),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}var ks=Object.freeze({__proto__:null,generate:function(){this.token(9,"&")},name:"NestingSelector",parse:ys,structure:{}})
function vs(){this.skipSC()
const e=this.tokenStart
let t,n=e,r=null
return t=this.lookupValue(0,"odd")||this.lookupValue(0,"even")?this.Identifier():this.AnPlusB(),n=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),r=this.SelectorList(),n=this.tokenStart),{type:"Nth",loc:this.getLocation(e,n),nth:t,selector:r}}var ws=Object.freeze({__proto__:null,generate:function(e){this.node(e.nth),null!==e.selector&&(this.token(1,"of"),this.node(e.selector))},name:"Nth",parse:vs,structure:{nth:["AnPlusB","Identifier"],selector:["SelectorList",null]}})
const xs={value:String}
function Ss(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(Wt)}}var Cs=Object.freeze({__proto__:null,generate:function(e){this.token(Wt,e.value)},name:"Number",parse:Ss,structure:xs})
const As={value:String}
function _s(){const e=this.tokenStart
return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var zs=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Operator",parse:_s,structure:As})
function Ts(e,t){const n=this.tokenStart
let r=null
return this.eat(en),r=e.call(this,t),this.eof||this.eat(tn),{type:"Parentheses",loc:this.getLocation(n,this.tokenStart),children:r}}var Es=Object.freeze({__proto__:null,generate:function(e){this.token(en,"("),this.children(e),this.token(tn,")")},name:"Parentheses",parse:Ts,structure:{children:[[]]}})
const Os={value:String}
function Ps(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(Vt)}}var Ls=Object.freeze({__proto__:null,generate:function(e){this.token(Vt,e.value+"%")},name:"Percentage",parse:Ps,structure:Os})
const Ns={name:String,children:[["Raw"],null]}
function Ds(){const e=this.tokenStart
let t,n,r=null
return this.eat(Ht),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),this.lookupNonWSType(0)==tn?r=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(null,!1))),this.eat(tn)):t=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var js=Object.freeze({__proto__:null,generate:function(e){this.token(Ht,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(tn,")"))},name:"PseudoClassSelector",parse:Ds,structure:Ns,walkContext:"function"})
const Ms={name:String,children:[["Raw"],null]}
function Is(){const e=this.tokenStart
let t,n,r=null
return this.eat(Ht),this.eat(Ht),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),this.lookupNonWSType(0)==tn?r=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(null,!1))),this.eat(tn)):t=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var Rs=Object.freeze({__proto__:null,generate:function(e){this.token(Ht,":"),this.token(Ht,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(tn,")"))},name:"PseudoElementSelector",parse:Is,structure:Ms,walkContext:"function"})
function Fs(){switch(this.skipSC(),this.tokenType){case Wt:return this.Number()
case 2:return this.Function(this.readSequence,this.scope.Value)
default:this.error("Number of function is expected")}}function Bs(){const e=this.tokenStart,t=Fs.call(this)
let n=null
return this.skipSC(),this.isDelim(47)&&(this.eatDelim(47),n=Fs.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:n}}var qs=Object.freeze({__proto__:null,generate:function(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(Wt,1)},name:"Ratio",parse:Bs,structure:{left:["Number","Function"],right:["Number","Function",null]}})
function Gs(){return this.tokenIndex>0&&this.lookupType(-1)===Yt?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}const Us={value:String}
function Ws(e,t){const n=this.getTokenStart(this.tokenIndex)
let r
return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),r=t&&this.tokenStart>n?Gs.call(this):this.tokenStart,{type:"Raw",loc:this.getLocation(n,r),value:this.substring(n,r)}}var Vs=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Raw",parse:Ws,structure:Us})
function $s(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function Ys(){const e=this.SelectorList()
return"Raw"!==e.type&&!1===this.eof&&this.tokenType!==nn&&this.error(),e}function Xs(){const e=this.tokenIndex,t=this.tokenStart
let n,r
return n=this.parseRulePrelude?this.parseWithFallback(Ys,$s):$s.call(this,e),r=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:n,block:r}}var Hs=Object.freeze({__proto__:null,generate:function(e){this.node(e.prelude),this.node(e.block)},name:"Rule",parse:Xs,structure:{prelude:["SelectorList","Raw"],block:["Block"]},walkContext:"rule"})
function Qs(){let e=null,t=null
this.skipSC()
const n=this.tokenStart
return this.tokenType===en&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(tn)),1===this.lookupNonWSType(0)&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(en),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(tn)),{type:"Scope",loc:this.getLocation(n,this.tokenStart),root:e,limit:t}}var Ks=Object.freeze({__proto__:null,generate:function(e){e.root&&(this.token(en,"("),this.node(e.root),this.token(tn,")")),e.limit&&(this.token(1,"to"),this.token(en,"("),this.node(e.limit),this.token(tn,")"))},name:"Scope",parse:Qs,structure:{root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]}})
function Zs(){const e=this.readSequence(this.scope.Selector)
return null===this.getFirstListNode(e)&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}var Js=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Selector",parse:Zs,structure:{children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]}})
function el(){const e=this.createList()
for(;!this.eof&&(e.push(this.Selector()),this.tokenType===Kt);)this.next()
return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}var tl=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Kt,","))},name:"SelectorList",parse:el,structure:{children:[["Selector","Raw"]]},walkContext:"selector"})
function nl(e){const t=e.length,n=e.charCodeAt(0),r=34===n||39===n?1:0,o=1===r&&t>1&&e.charCodeAt(t-1)===n?t-2:t-1
let i=""
for(let n=r;n<=o;n++){let r=e.charCodeAt(n)
if(92===r){if(n===o){n!==t-1&&(i=e.substr(n+1))
break}if(r=e.charCodeAt(++n),mn(92,r)){const t=n-1,r=zn(e,t)
n=r-1,i+=Pn(e.substring(t+1,r))}else 0x000d===r&&0x000a===e.charCodeAt(n+1)&&n++}else i+=e[n]}return i}const rl={value:String}
function ol(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:nl(this.consume(5))}}var il=Object.freeze({__proto__:null,generate:function(e){this.token(5,function(e){let t="",n=!1
for(let r=0;r<e.length;r++){const o=e.charCodeAt(r)
0x0000!==o?o<=0x001f||0x007F===o?(t+="\\"+o.toString(16),n=!0):34===o||92===o?(t+="\\"+e.charAt(r),n=!1):(n&&(sn(o)||pn(o))&&(t+=" "),t+=e.charAt(r),n=!1):t+="�"}return'"'+t+'"'}(e.value))},name:"String",parse:ol,structure:rl})
function al(){return this.Raw(null,!1)}function sl(){const e=this.tokenStart,t=this.createList()
let n
for(;!this.eof;){switch(this.tokenType){case Yt:this.next()
continue
case on:if(33!==this.charCodeAt(this.tokenStart+2)){this.next()
continue}n=this.Comment()
break
case 14:n=this.CDO()
break
case Xt:n=this.CDC()
break
case 3:n=this.parseWithFallback(this.Atrule,al)
break
default:n=this.parseWithFallback(this.Rule,al)}t.push(n)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}var ll=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"StyleSheet",parse:sl,structure:{children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]},walkContext:"stylesheet"})
function cl(){const e=this.tokenStart
this.eat(en),this.skipSC()
const t=this.Declaration()
return this.eof||this.eat(tn),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}var ul=Object.freeze({__proto__:null,generate:function(e){this.token(en,"("),this.node(e.declaration),this.token(tn,")")},name:"SupportsDeclaration",parse:cl,structure:{declaration:"Declaration"}})
function hl(){1!==this.tokenType&&!1===this.isDelim(42)&&this.error("Identifier or asterisk is expected"),this.next()}const dl={name:String}
function pl(){const e=this.tokenStart
return this.isDelim(124)?(this.next(),hl.call(this)):(hl.call(this),this.isDelim(124)&&(this.next(),hl.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}var ml=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"TypeSelector",parse:pl,structure:dl})
function fl(e,t){let n=0
for(let r=this.tokenStart+e;r<this.tokenEnd;r++){const o=this.charCodeAt(r)
if(45===o&&t&&0!==n)return fl.call(this,e+n+1,!1),-1
sn(o)||this.error(t&&0!==n?"Hyphen minus"+(n<6?" or hex digit":"")+" is expected":n<6?"Hex digit is expected":"Unexpected input",r),++n>6&&this.error("Too many hex digits",r)}return this.next(),n}function gl(e){let t=0
for(;this.isDelim(63);)++t>e&&this.error("Too many question marks"),this.next()}function bl(e){this.charCodeAt(this.tokenStart)!==e&&this.error((43===e?"Plus sign":"Hyphen minus")+" is expected")}function yl(){let e=0
switch(this.tokenType){case Wt:if(e=fl.call(this,1,!0),this.isDelim(63)){gl.call(this,6-e)
break}if(this.tokenType===$t||this.tokenType===Wt){bl.call(this,45),fl.call(this,1,!1)
break}break
case $t:e=fl.call(this,1,!0),e>0&&gl.call(this,6-e)
break
default:if(this.eatDelim(43),1===this.tokenType){e=fl.call(this,0,!0),e>0&&gl.call(this,6-e)
break}if(this.isDelim(63)){this.next(),gl.call(this,5)
break}this.error("Hex digit or question mark is expected")}}const kl={value:String}
function vl(){const e=this.tokenStart
return this.eatIdent("u"),yl.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var wl=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"UnicodeRange",parse:vl,structure:kl})
const xl={value:String}
function Sl(){const e=this.tokenStart
let t
switch(this.tokenType){case 7:t=function(e){const t=e.length
let n=4,r=41===e.charCodeAt(t-1)?t-2:t-1,o=""
for(;n<r&&pn(e.charCodeAt(n));)n++
for(;n<r&&pn(e.charCodeAt(r));)r--
for(let i=n;i<=r;i++){let n=e.charCodeAt(i)
if(92===n){if(i===r){i!==t-1&&(o=e.substr(i+1))
break}if(n=e.charCodeAt(++i),mn(92,n)){const t=i-1,n=zn(e,t)
i=n-1,o+=Pn(e.substring(t+1,n))}else 0x000d===n&&0x000a===e.charCodeAt(i+1)&&i++}else o+=e[i]}return o}(this.consume(7))
break
case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=nl(this.consume(5)),this.skipSC(),this.eof||this.eat(tn)
break
default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}var Cl=Object.freeze({__proto__:null,generate:function(e){this.token(7,function(e){let t="",n=!1
for(let r=0;r<e.length;r++){const o=e.charCodeAt(r)
0x0000!==o?o<=0x001f||0x007F===o?(t+="\\"+o.toString(16),n=!0):32===o||92===o||34===o||39===o||40===o||41===o?(t+="\\"+e.charAt(r),n=!1):(n&&sn(o)&&(t+=" "),t+=e.charAt(r),n=!1):t+="�"}return"url("+t+")"}(e.value))},name:"Url",parse:Sl,structure:xl})
function Al(){const e=this.tokenStart,t=this.readSequence(this.scope.Value)
return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}var _l=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Value",parse:Al,structure:{children:[[]]}})
const zl=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),Tl={value:String}
function El(){return this.eat(Yt),zl}var Ol=Object.freeze({__proto__:null,generate:function(e){this.token(Yt,e.value)},name:"WhiteSpace",parse:El,structure:Tl}),Pl=Object.freeze({__proto__:null,AnPlusB:ji,Atrule:Bi,AtrulePrelude:Gi,AttributeSelector:Yi,Block:Ji,Brackets:ta,CDC:ra,CDO:ia,ClassSelector:la,Combinator:ha,Comment:ma,Condition:va,Declaration:Ta,DeclarationList:Pa,Dimension:Da,Feature:Ia,FeatureFunction:qa,FeatureRange:$a,Function:Ha,GeneralEnclosed:Za,Hash:ts,IdSelector:ss,Identifier:os,Layer:us,LayerList:ds,MediaQuery:fs,MediaQueryList:bs,NestingSelector:ks,Nth:ws,Number:Cs,Operator:zs,Parentheses:Es,Percentage:Ls,PseudoClassSelector:js,PseudoElementSelector:Rs,Ratio:qs,Raw:Vs,Rule:Hs,Scope:Ks,Selector:Js,SelectorList:tl,String:il,StyleSheet:ll,SupportsDeclaration:ul,TypeSelector:ml,UnicodeRange:wl,Url:Cl,Value:_l,WhiteSpace:Ol}),Ll={generic:!0,cssWideKeywords:Kr,generic:!0,cssWideKeywords:["initial","inherit","unset","revert","revert-layer"],units:{angle:["deg","grad","rad","turn"],decibel:["db"],flex:["fr"],frequency:["hz","khz"],length:["cm","mm","q","in","pt","pc","px","em","rem","ex","rex","cap","rcap","ch","rch","ic","ric","lh","rlh","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax","cqw","cqh","cqi","cqb","cqmin","cqmax"],resolution:["dpi","dpcm","dppx","x"],semitones:["st"],time:["s","ms"]},types:{"abs()":"abs( <calc-sum> )","absolute-size":"xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large","acos()":"acos( <calc-sum> )","alpha-value":"<number>|<percentage>","angle-percentage":"<angle>|<percentage>","angular-color-hint":"<angle-percentage>","angular-color-stop":"<color>&&<color-stop-angle>?","angular-color-stop-list":"[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>","animateable-feature":"scroll-position|contents|<custom-ident>","asin()":"asin( <calc-sum> )","atan()":"atan( <calc-sum> )","atan2()":"atan2( <calc-sum> , <calc-sum> )",attachment:"scroll|fixed|local","attr()":"attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )","attr-matcher":"['~'|'|'|'^'|'$'|'*']? '='","attr-modifier":"i|s","attribute-selector":"'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'","auto-repeat":"repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )","auto-track-list":"[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?",axis:"block|inline|x|y","baseline-position":"[first|last]? baseline","basic-shape":"<inset()>|<xywh()>|<rect()>|<circle()>|<ellipse()>|<polygon()>|<path()>","bg-image":"none|<image>","bg-layer":"<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>","bg-position":"[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]","bg-size":"[<length-percentage>|auto]{1,2}|cover|contain","blur()":"blur( <length> )","blend-mode":"normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",box:"border-box|padding-box|content-box","brightness()":"brightness( <number-percentage> )","calc()":"calc( <calc-sum> )","calc-sum":"<calc-product> [['+'|'-'] <calc-product>]*","calc-product":"<calc-value> ['*' <calc-value>|'/' <number>]*","calc-value":"<number>|<dimension>|<percentage>|<calc-constant>|( <calc-sum> )","calc-constant":"e|pi|infinity|-infinity|NaN","cf-final-image":"<image>|<color>","cf-mixing-image":"<percentage>?&&<image>","circle()":"circle( [<shape-radius>]? [at <position>]? )","clamp()":"clamp( <calc-sum>#{3} )","class-selector":"'.' <ident-token>","clip-source":"<url>",color:"<color-base>|currentColor|<system-color>|<device-cmyk()>|<light-dark()>|<-non-standard-color>","color-stop":"<color-stop-length>|<color-stop-angle>","color-stop-angle":"<angle-percentage>{1,2}","color-stop-length":"<length-percentage>{1,2}","color-stop-list":"[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>","color-interpolation-method":"in [<rectangular-color-space>|<polar-color-space> <hue-interpolation-method>?|<custom-color-space>]",combinator:"'>'|'+'|'~'|['|' '|']","common-lig-values":"[common-ligatures|no-common-ligatures]","compat-auto":"searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button","composite-style":"clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor","compositing-operator":"add|subtract|intersect|exclude","compound-selector":"[<type-selector>? <subclass-selector>*]!","compound-selector-list":"<compound-selector>#","complex-selector":"<complex-selector-unit> [<combinator>? <complex-selector-unit>]*","complex-selector-list":"<complex-selector>#","conic-gradient()":"conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )","contextual-alt-values":"[contextual|no-contextual]","content-distribution":"space-between|space-around|space-evenly|stretch","content-list":"[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+","content-position":"center|start|end|flex-start|flex-end","content-replacement":"<image>","contrast()":"contrast( [<number-percentage>] )","cos()":"cos( <calc-sum> )",counter:"<counter()>|<counters()>","counter()":"counter( <counter-name> , <counter-style>? )","counter-name":"<custom-ident>","counter-style":"<counter-style-name>|symbols( )","counter-style-name":"<custom-ident>","counters()":"counters( <counter-name> , <string> , <counter-style>? )","cross-fade()":"cross-fade( <cf-mixing-image> , <cf-final-image>? )","cubic-bezier-timing-function":"ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )","deprecated-system-color":"ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText","discretionary-lig-values":"[discretionary-ligatures|no-discretionary-ligatures]","display-box":"contents|none","display-inside":"flow|flow-root|table|flex|grid|ruby","display-internal":"table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container","display-legacy":"inline-block|inline-list-item|inline-table|inline-flex|inline-grid","display-listitem":"<display-outside>?&&[flow|flow-root]?&&list-item","display-outside":"block|inline|run-in","drop-shadow()":"drop-shadow( <length>{2,3} <color>? )","east-asian-variant-values":"[jis78|jis83|jis90|jis04|simplified|traditional]","east-asian-width-values":"[full-width|proportional-width]","element()":"element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )","ellipse()":"ellipse( [<shape-radius>{2}]? [at <position>]? )","ending-shape":"circle|ellipse","env()":"env( <custom-ident> , <declaration-value>? )","exp()":"exp( <calc-sum> )","explicit-track-list":"[<line-names>? <track-size>]+ <line-names>?","family-name":"<string>|<custom-ident>+","feature-tag-value":"<string> [<integer>|on|off]?","feature-type":"@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation","feature-value-block":"<feature-type> '{' <feature-value-declaration-list> '}'","feature-value-block-list":"<feature-value-block>+","feature-value-declaration":"<custom-ident> : <integer>+ ;","feature-value-declaration-list":"<feature-value-declaration>","feature-value-name":"<custom-ident>","fill-rule":"nonzero|evenodd","filter-function":"<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>","filter-function-list":"[<filter-function>|<url>]+","final-bg-layer":"<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>","fixed-breadth":"<length-percentage>","fixed-repeat":"repeat( [<integer [1,∞]>] , [<line-names>? <fixed-size>]+ <line-names>? )","fixed-size":"<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )","font-stretch-absolute":"normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>","font-variant-css21":"[normal|small-caps]","font-weight-absolute":"normal|bold|<number [1,1000]>","frequency-percentage":"<frequency>|<percentage>","general-enclosed":"[<function-token> <any-value>? )]|[( <any-value>? )]","generic-family":"<generic-script-specific>|<generic-complete>|<generic-incomplete>|<-non-standard-generic-family>","generic-name":"serif|sans-serif|cursive|fantasy|monospace","geometry-box":"<shape-box>|fill-box|stroke-box|view-box",gradient:"<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>","grayscale()":"grayscale( <number-percentage> )","grid-line":"auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]","historical-lig-values":"[historical-ligatures|no-historical-ligatures]","hsl()":"hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )","hsla()":"hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )",hue:"<number>|<angle>","hue-rotate()":"hue-rotate( <angle> )","hue-interpolation-method":"[shorter|longer|increasing|decreasing] hue","hwb()":"hwb( [<hue>|none] [<percentage>|none] [<percentage>|none] [/ [<alpha-value>|none]]? )","hypot()":"hypot( <calc-sum># )",image:"<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>","image()":"image( <image-tags>? [<image-src>? , <color>?]! )","image-set()":"image-set( <image-set-option># )","image-set-option":"[<image>|<string>] [<resolution>||type( <string> )]","image-src":"<url>|<string>","image-tags":"ltr|rtl","inflexible-breadth":"<length-percentage>|min-content|max-content|auto","inset()":"inset( <length-percentage>{1,4} [round <'border-radius'>]? )","invert()":"invert( <number-percentage> )","keyframes-name":"<custom-ident>|<string>","keyframe-block":"<keyframe-selector># { <declaration-list> }","keyframe-block-list":"<keyframe-block>+","keyframe-selector":"from|to|<percentage>|<timeline-range-name> <percentage>","lab()":"lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )","layer()":"layer( <layer-name> )","layer-name":"<ident> ['.' <ident>]*","lch()":"lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )","leader()":"leader( <leader-type> )","leader-type":"dotted|solid|space|<string>","length-percentage":"<length>|<percentage>","light-dark()":"light-dark( <color> , <color> )","line-names":"'[' <custom-ident>* ']'","line-name-list":"[<line-names>|<name-repeat>]+","line-style":"none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset","line-width":"<length>|thin|medium|thick","linear-color-hint":"<length-percentage>","linear-color-stop":"<color> <color-stop-length>?","linear-gradient()":"linear-gradient( [[<angle>|to <side-or-corner>]||<color-interpolation-method>]? , <color-stop-list> )","log()":"log( <calc-sum> , <calc-sum>? )","mask-layer":"<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>","mask-position":"[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?","mask-reference":"none|<image>|<mask-source>","mask-source":"<url>","masking-mode":"alpha|luminance|match-source","matrix()":"matrix( <number>#{6} )","matrix3d()":"matrix3d( <number>#{16} )","max()":"max( <calc-sum># )","media-and":"<media-in-parens> [and <media-in-parens>]+","media-condition":"<media-not>|<media-and>|<media-or>|<media-in-parens>","media-condition-without-or":"<media-not>|<media-and>|<media-in-parens>","media-feature":"( [<mf-plain>|<mf-boolean>|<mf-range>] )","media-in-parens":"( <media-condition> )|<media-feature>|<general-enclosed>","media-not":"not <media-in-parens>","media-or":"<media-in-parens> [or <media-in-parens>]+","media-query":"<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?","media-query-list":"<media-query>#","media-type":"<ident>","mf-boolean":"<mf-name>","mf-name":"<ident>","mf-plain":"<mf-name> : <mf-value>","mf-range":"<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>","mf-value":"<number>|<dimension>|<ident>|<ratio>","min()":"min( <calc-sum># )","minmax()":"minmax( [<length-percentage>|min-content|max-content|auto] , [<length-percentage>|<flex>|min-content|max-content|auto] )","mod()":"mod( <calc-sum> , <calc-sum> )","name-repeat":"repeat( [<integer [1,∞]>|auto-fill] , <line-names>+ )","named-color":"transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen","namespace-prefix":"<ident>","ns-prefix":"[<ident-token>|'*']? '|'","number-percentage":"<number>|<percentage>","numeric-figure-values":"[lining-nums|oldstyle-nums]","numeric-fraction-values":"[diagonal-fractions|stacked-fractions]","numeric-spacing-values":"[proportional-nums|tabular-nums]",nth:"<an-plus-b>|even|odd","opacity()":"opacity( [<number-percentage>] )","overflow-position":"unsafe|safe","outline-radius":"<length>|<percentage>","page-body":"<declaration>? [; <page-body>]?|<page-margin-box> <page-body>","page-margin-box":"<page-margin-box-type> '{' <declaration-list> '}'","page-margin-box-type":"@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom","page-selector-list":"[<page-selector>#]?","page-selector":"<pseudo-page>+|<ident> <pseudo-page>*","page-size":"A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger","path()":"path( [<fill-rule> ,]? <string> )","paint()":"paint( <ident> , <declaration-value>? )","perspective()":"perspective( [<length [0,∞]>|none] )","polygon()":"polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )","polar-color-space":"hsl|hwb|lch|oklch",position:"[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]","pow()":"pow( <calc-sum> , <calc-sum> )","pseudo-class-selector":"':' <ident-token>|':' <function-token> <any-value> ')'","pseudo-element-selector":"':' <pseudo-class-selector>|<legacy-pseudo-element-selector>","pseudo-page":": [left|right|first|blank]",quote:"open-quote|close-quote|no-open-quote|no-close-quote","radial-gradient()":"radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )",ratio:"<number [0,∞]> [/ <number [0,∞]>]?","ray()":"ray( <angle>&&<ray-size>?&&contain?&&[at <position>]? )","ray-size":"closest-side|closest-corner|farthest-side|farthest-corner|sides","rectangular-color-space":"srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020|lab|oklab|xyz|xyz-d50|xyz-d65","relative-selector":"<combinator>? <complex-selector>","relative-selector-list":"<relative-selector>#","relative-size":"larger|smaller","rem()":"rem( <calc-sum> , <calc-sum> )","repeat-style":"repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}","repeating-conic-gradient()":"repeating-conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )","repeating-linear-gradient()":"repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )","repeating-radial-gradient()":"repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )","reversed-counter-name":"reversed( <counter-name> )","rgb()":"rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )","rgba()":"rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )","rotate()":"rotate( [<angle>|<zero>] )","rotate3d()":"rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )","rotateX()":"rotateX( [<angle>|<zero>] )","rotateY()":"rotateY( [<angle>|<zero>] )","rotateZ()":"rotateZ( [<angle>|<zero>] )","round()":"round( <rounding-strategy>? , <calc-sum> , <calc-sum> )","rounding-strategy":"nearest|up|down|to-zero","saturate()":"saturate( <number-percentage> )","scale()":"scale( [<number>|<percentage>]#{1,2} )","scale3d()":"scale3d( [<number>|<percentage>]#{3} )","scaleX()":"scaleX( [<number>|<percentage>] )","scaleY()":"scaleY( [<number>|<percentage>] )","scaleZ()":"scaleZ( [<number>|<percentage>] )","scroll()":"scroll( [<axis>||<scroller>]? )",scroller:"root|nearest|self","self-position":"center|start|end|self-start|self-end|flex-start|flex-end","shape-radius":"<length-percentage>|closest-side|farthest-side","sign()":"sign( <calc-sum> )","skew()":"skew( [<angle>|<zero>] , [<angle>|<zero>]? )","skewX()":"skewX( [<angle>|<zero>] )","skewY()":"skewY( [<angle>|<zero>] )","sepia()":"sepia( <number-percentage> )",shadow:"inset?&&<length>{2,4}&&<color>?","shadow-t":"[<length>{2,3}&&<color>?]",shape:"rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )","shape-box":"<box>|margin-box","side-or-corner":"[left|right]||[top|bottom]","sin()":"sin( <calc-sum> )","single-animation":"<'animation-duration'>||<easing-function>||<'animation-delay'>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]||<single-animation-timeline>","single-animation-direction":"normal|reverse|alternate|alternate-reverse","single-animation-fill-mode":"none|forwards|backwards|both","single-animation-iteration-count":"infinite|<number>","single-animation-play-state":"running|paused","single-animation-timeline":"auto|none|<dashed-ident>|<scroll()>|<view()>","single-transition":"[none|<single-transition-property>]||<time>||<easing-function>||<time>||<transition-behavior-value>","single-transition-property":"all|<custom-ident>",size:"closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}","sqrt()":"sqrt( <calc-sum> )","step-position":"jump-start|jump-end|jump-none|jump-both|start|end","step-timing-function":"step-start|step-end|steps( <integer> [, <step-position>]? )","subclass-selector":"<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>","supports-condition":"not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*","supports-in-parens":"( <supports-condition> )|<supports-feature>|<general-enclosed>","supports-feature":"<supports-decl>|<supports-selector-fn>","supports-decl":"( <declaration> )","supports-selector-fn":"selector( <complex-selector> )",symbol:"<string>|<image>|<custom-ident>","system-color":"AccentColor|AccentColorText|ActiveText|ButtonBorder|ButtonFace|ButtonText|Canvas|CanvasText|Field|FieldText|GrayText|Highlight|HighlightText|LinkText|Mark|MarkText|SelectedItem|SelectedItemText|VisitedText","tan()":"tan( <calc-sum> )",target:"<target-counter()>|<target-counters()>|<target-text()>","target-counter()":"target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )","target-counters()":"target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )","target-text()":"target-text( [<string>|<url>] , [content|before|after|first-letter]? )","time-percentage":"<time>|<percentage>","timeline-range-name":"cover|contain|entry|exit|entry-crossing|exit-crossing","easing-function":"linear|<cubic-bezier-timing-function>|<step-timing-function>","track-breadth":"<length-percentage>|<flex>|min-content|max-content|auto","track-list":"[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?","track-repeat":"repeat( [<integer [1,∞]>] , [<line-names>? <track-size>]+ <line-names>? )","track-size":"<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( <length-percentage> )","transform-function":"<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>","transform-list":"<transform-function>+","transition-behavior-value":"normal|allow-discrete","translate()":"translate( <length-percentage> , <length-percentage>? )","translate3d()":"translate3d( <length-percentage> , <length-percentage> , <length> )","translateX()":"translateX( <length-percentage> )","translateY()":"translateY( <length-percentage> )","translateZ()":"translateZ( <length> )","type-or-unit":"string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%","type-selector":"<wq-name>|<ns-prefix>? '*'","var()":"var( <custom-property-name> , <declaration-value>? )","view()":"view( [<axis>||<'view-timeline-inset'>]? )","viewport-length":"auto|<length-percentage>","visual-box":"content-box|padding-box|border-box","wq-name":"<ns-prefix>? <ident-token>","-legacy-gradient":"<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>","-legacy-linear-gradient":"-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )","-legacy-repeating-linear-gradient":"-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )","-legacy-linear-gradient-arguments":"[<angle>|<side-or-corner>]? , <color-stop-list>","-legacy-radial-gradient":"-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )","-legacy-repeating-radial-gradient":"-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )","-legacy-radial-gradient-arguments":"[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>","-legacy-radial-gradient-size":"closest-side|closest-corner|farthest-side|farthest-corner|contain|cover","-legacy-radial-gradient-shape":"circle|ellipse","-non-standard-font":"-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body","-non-standard-color":"-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text","-non-standard-image-rendering":"optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast","-non-standard-overflow":"overlay|-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable","-non-standard-size":"intrinsic|min-intrinsic|-webkit-fill-available|-webkit-fit-content|-webkit-min-content|-webkit-max-content|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content","-webkit-gradient()":"-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )","-webkit-gradient-color-stop":"from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )","-webkit-gradient-point":"[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]","-webkit-gradient-radius":"<length>|<percentage>","-webkit-gradient-type":"linear|radial","-webkit-mask-box-repeat":"repeat|stretch|round","-ms-filter-function-list":"<-ms-filter-function>+","-ms-filter-function":"<-ms-filter-function-progid>|<-ms-filter-function-legacy>","-ms-filter-function-progid":"'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]","-ms-filter-function-legacy":"<ident-token>|<function-token> <any-value>? )","absolute-color-base":"<hex-color>|<absolute-color-function>|<named-color>|transparent","absolute-color-function":"<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>",age:"child|young|old","anchor-name":"<dashed-ident>","attr-name":"<wq-name>","attr-fallback":"<any-value>","bg-clip":"<box>|border|text",bottom:"<length>|auto","container-name":"<custom-ident>","container-condition":"not <query-in-parens>|<query-in-parens> [[and <query-in-parens>]*|[or <query-in-parens>]*]","coord-box":"content-box|padding-box|border-box|fill-box|stroke-box|view-box","generic-voice":"[<age>? <gender> <integer>?]",gender:"male|female|neutral","generic-script-specific":"generic( kai )|generic( fangsong )|generic( nastaliq )","generic-complete":"serif|sans-serif|system-ui|cursive|fantasy|math|monospace","generic-incomplete":"ui-serif|ui-sans-serif|ui-monospace|ui-rounded","-non-standard-generic-family":"-apple-system|BlinkMacSystemFont",left:"<length>|auto","color-base":"<hex-color>|<color-function>|<named-color>|<color-mix()>|transparent","color-function":"<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<oklab()>|<oklch()>|<color()>","device-cmyk()":"<legacy-device-cmyk-syntax>|<modern-device-cmyk-syntax>","legacy-device-cmyk-syntax":"device-cmyk( <number>#{4} )","modern-device-cmyk-syntax":"device-cmyk( <cmyk-component>{4} [/ [<alpha-value>|none]]? )","cmyk-component":"<number>|<percentage>|none","color-mix()":"color-mix( <color-interpolation-method> , [<color>&&<percentage [0,100]>?]#{2} )","color-space":"<rectangular-color-space>|<polar-color-space>|<custom-color-space>","custom-color-space":"<dashed-ident>",paint:"none|<color>|<url> [none|<color>]?|context-fill|context-stroke","palette-identifier":"<dashed-ident>",right:"<length>|auto","scope-start":"<forgiving-selector-list>","scope-end":"<forgiving-selector-list>","forgiving-selector-list":"<complex-real-selector-list>","forgiving-relative-selector-list":"<relative-real-selector-list>","selector-list":"<complex-selector-list>","complex-real-selector-list":"<complex-real-selector>#","simple-selector-list":"<simple-selector>#","relative-real-selector-list":"<relative-real-selector>#","complex-selector-unit":"[<compound-selector>? <pseudo-compound-selector>*]!","complex-real-selector":"<compound-selector> [<combinator>? <compound-selector>]*","relative-real-selector":"<combinator>? <complex-real-selector>","pseudo-compound-selector":"<pseudo-element-selector> <pseudo-class-selector>*","simple-selector":"<type-selector>|<subclass-selector>","legacy-pseudo-element-selector":"':' [before|after|first-line|first-letter]","single-animation-composition":"replace|add|accumulate","svg-length":"<percentage>|<length>|<number>","svg-writing-mode":"lr-tb|rl-tb|tb-rl|lr|rl|tb",top:"<length>|auto",x:"<number>",y:"<number>",declaration:"<ident-token> : <declaration-value>? ['!' important]?","declaration-list":"[<declaration>? ';']* <declaration>?",url:"url( <string> <url-modifier>* )|<url-token>","url-modifier":"<ident>|<function-token> <any-value> )","number-zero-one":"<number [0,1]>","number-one-or-greater":"<number [1,∞]>","color()":"color( <colorspace-params> [/ [<alpha-value>|none]]? )","colorspace-params":"[<predefined-rgb-params>|<xyz-params>]","predefined-rgb-params":"<predefined-rgb> [<number>|<percentage>|none]{3}","predefined-rgb":"srgb|srgb-linear|display-p3|a98-rgb|prophoto-rgb|rec2020","xyz-params":"<xyz-space> [<number>|<percentage>|none]{3}","xyz-space":"xyz|xyz-d50|xyz-d65","oklab()":"oklab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )","oklch()":"oklch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )","offset-path":"<ray()>|<url>|<basic-shape>","rect()":"rect( [<length-percentage>|auto]{4} [round <'border-radius'>]? )","xywh()":"xywh( <length-percentage>{2} <length-percentage [0,∞]>{2} [round <'border-radius'>]? )","query-in-parens":"( <container-condition> )|( <size-feature> )|style( <style-query> )|<general-enclosed>","size-feature":"<mf-plain>|<mf-boolean>|<mf-range>","style-feature":"<declaration>","style-query":"<style-condition>|<style-feature>","style-condition":"not <style-in-parens>|<style-in-parens> [[and <style-in-parens>]*|[or <style-in-parens>]*]","style-in-parens":"( <style-condition> )|( <style-feature> )|<general-enclosed>","-non-standard-display":"-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box","inset-area":"[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]","position-area":"[[left|center|right|span-left|span-right|x-start|x-end|span-x-start|span-x-end|x-self-start|x-self-end|span-x-self-start|span-x-self-end|span-all]||[top|center|bottom|span-top|span-bottom|y-start|y-end|span-y-start|span-y-end|y-self-start|y-self-end|span-y-self-start|span-y-self-end|span-all]|[block-start|center|block-end|span-block-start|span-block-end|span-all]||[inline-start|center|inline-end|span-inline-start|span-inline-end|span-all]|[self-block-start|center|self-block-end|span-self-block-start|span-self-block-end|span-all]||[self-inline-start|center|self-inline-end|span-self-inline-start|span-self-inline-end|span-all]|[start|center|end|span-start|span-end|span-all]{1,2}|[self-start|center|self-end|span-self-start|span-self-end|span-all]{1,2}]","anchor()":"anchor( <anchor-element>?&&<anchor-side> , <length-percentage>? )","anchor-side":"inside|outside|top|left|right|bottom|start|end|self-start|self-end|<percentage>|center","anchor-size()":"anchor-size( [<anchor-element>||<anchor-size>]? , <length-percentage>? )","anchor-size":"width|height|block|inline|self-block|self-inline","anchor-element":"<dashed-ident>","try-size":"most-width|most-height|most-block-size|most-inline-size","try-tactic":"flip-block||flip-inline||flip-start","font-variant-css2":"normal|small-caps","font-width-css3":"normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded","system-family-name":"caption|icon|menu|message-box|small-caption|status-bar"},properties:{"--*":"<declaration-value>","-ms-accelerator":"false|true","-ms-block-progression":"tb|rl|bt|lr","-ms-content-zoom-chaining":"none|chained","-ms-content-zooming":"none|zoom","-ms-content-zoom-limit":"<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>","-ms-content-zoom-limit-max":"<percentage>","-ms-content-zoom-limit-min":"<percentage>","-ms-content-zoom-snap":"<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>","-ms-content-zoom-snap-points":"snapInterval( <percentage> , <percentage> )|snapList( <percentage># )","-ms-content-zoom-snap-type":"none|proximity|mandatory","-ms-filter":"<string>","-ms-flow-from":"[none|<custom-ident>]#","-ms-flow-into":"[none|<custom-ident>]#","-ms-grid-columns":"none|<track-list>|<auto-track-list>","-ms-grid-rows":"none|<track-list>|<auto-track-list>","-ms-high-contrast-adjust":"auto|none","-ms-hyphenate-limit-chars":"auto|<integer>{1,3}","-ms-hyphenate-limit-lines":"no-limit|<integer>","-ms-hyphenate-limit-zone":"<percentage>|<length>","-ms-ime-align":"auto|after","-ms-overflow-style":"auto|none|scrollbar|-ms-autohiding-scrollbar","-ms-scrollbar-3dlight-color":"<color>","-ms-scrollbar-arrow-color":"<color>","-ms-scrollbar-base-color":"<color>","-ms-scrollbar-darkshadow-color":"<color>","-ms-scrollbar-face-color":"<color>","-ms-scrollbar-highlight-color":"<color>","-ms-scrollbar-shadow-color":"<color>","-ms-scrollbar-track-color":"<color>","-ms-scroll-chaining":"chained|none","-ms-scroll-limit":"<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>","-ms-scroll-limit-x-max":"auto|<length>","-ms-scroll-limit-x-min":"<length>","-ms-scroll-limit-y-max":"auto|<length>","-ms-scroll-limit-y-min":"<length>","-ms-scroll-rails":"none|railed","-ms-scroll-snap-points-x":"snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )","-ms-scroll-snap-points-y":"snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )","-ms-scroll-snap-type":"none|proximity|mandatory","-ms-scroll-snap-x":"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>","-ms-scroll-snap-y":"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>","-ms-scroll-translation":"none|vertical-to-horizontal","-ms-text-autospace":"none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space","-ms-touch-select":"grippers|none","-ms-user-select":"none|element|text","-ms-wrap-flow":"auto|both|start|end|maximum|clear","-ms-wrap-margin":"<length>","-ms-wrap-through":"wrap|none","-moz-appearance":"none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized","-moz-binding":"<url>|none","-moz-border-bottom-colors":"<color>+|none","-moz-border-left-colors":"<color>+|none","-moz-border-right-colors":"<color>+|none","-moz-border-top-colors":"<color>+|none","-moz-context-properties":"none|[fill|fill-opacity|stroke|stroke-opacity]#","-moz-float-edge":"border-box|content-box|margin-box|padding-box","-moz-force-broken-image-icon":"0|1","-moz-image-region":"<shape>|auto","-moz-orient":"inline|block|horizontal|vertical","-moz-outline-radius":"<outline-radius>{1,4} [/ <outline-radius>{1,4}]?","-moz-outline-radius-bottomleft":"<outline-radius>","-moz-outline-radius-bottomright":"<outline-radius>","-moz-outline-radius-topleft":"<outline-radius>","-moz-outline-radius-topright":"<outline-radius>","-moz-stack-sizing":"ignore|stretch-to-fit","-moz-text-blink":"none|blink","-moz-user-focus":"ignore|normal|select-after|select-before|select-menu|select-same|select-all|none","-moz-user-input":"auto|none|enabled|disabled","-moz-user-modify":"read-only|read-write|write-only","-moz-window-dragging":"drag|no-drag","-moz-window-shadow":"default|menu|tooltip|sheet|none","-webkit-appearance":"none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button","-webkit-border-before":"<'border-width'>||<'border-style'>||<color>","-webkit-border-before-color":"<color>","-webkit-border-before-style":"<'border-style'>","-webkit-border-before-width":"<'border-width'>","-webkit-box-reflect":"[above|below|right|left]? <length>? <image>?","-webkit-line-clamp":"none|<integer>","-webkit-mask":"[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#","-webkit-mask-attachment":"<attachment>#","-webkit-mask-clip":"[<box>|border|padding|content|text]#","-webkit-mask-composite":"<composite-style>#","-webkit-mask-image":"<mask-reference>#","-webkit-mask-origin":"[<box>|border|padding|content]#","-webkit-mask-position":"<position>#","-webkit-mask-position-x":"[<length-percentage>|left|center|right]#","-webkit-mask-position-y":"[<length-percentage>|top|center|bottom]#","-webkit-mask-repeat":"<repeat-style>#","-webkit-mask-repeat-x":"repeat|no-repeat|space|round","-webkit-mask-repeat-y":"repeat|no-repeat|space|round","-webkit-mask-size":"<bg-size>#","-webkit-overflow-scrolling":"auto|touch","-webkit-tap-highlight-color":"<color>","-webkit-text-fill-color":"<color>","-webkit-text-stroke":"<length>||<color>","-webkit-text-stroke-color":"<color>","-webkit-text-stroke-width":"<length>","-webkit-touch-callout":"default|none","-webkit-user-modify":"read-only|read-write|read-write-plaintext-only","accent-color":"auto|<color>","align-content":"normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>","align-items":"normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]","align-self":"auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>","align-tracks":"[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",all:"initial|inherit|unset|revert|revert-layer","anchor-name":"none|<dashed-ident>#","anchor-scope":"none|all|<dashed-ident>#",animation:"<single-animation>#","animation-composition":"<single-animation-composition>#","animation-delay":"<time>#","animation-direction":"<single-animation-direction>#","animation-duration":"<time>#","animation-fill-mode":"<single-animation-fill-mode>#","animation-iteration-count":"<single-animation-iteration-count>#","animation-name":"[none|<keyframes-name>]#","animation-play-state":"<single-animation-play-state>#","animation-range":"[<'animation-range-start'> <'animation-range-end'>?]#","animation-range-end":"[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#","animation-range-start":"[normal|<length-percentage>|<timeline-range-name> <length-percentage>?]#","animation-timing-function":"<easing-function>#","animation-timeline":"<single-animation-timeline>#",appearance:"none|auto|textfield|menulist-button|<compat-auto>","aspect-ratio":"auto||<ratio>",azimuth:"<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards","backdrop-filter":"none|<filter-function-list>","backface-visibility":"visible|hidden",background:"[<bg-layer> ,]* <final-bg-layer>","background-attachment":"<attachment>#","background-blend-mode":"<blend-mode>#","background-clip":"<bg-clip>#","background-color":"<color>","background-image":"<bg-image>#","background-origin":"<box>#","background-position":"<bg-position>#","background-position-x":"[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#","background-position-y":"[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#","background-repeat":"<repeat-style>#","background-size":"<bg-size>#","block-size":"<'width'>",border:"<line-width>||<line-style>||<color>","border-block":"<'border-top-width'>||<'border-top-style'>||<color>","border-block-color":"<'border-top-color'>{1,2}","border-block-style":"<'border-top-style'>","border-block-width":"<'border-top-width'>","border-block-end":"<'border-top-width'>||<'border-top-style'>||<color>","border-block-end-color":"<'border-top-color'>","border-block-end-style":"<'border-top-style'>","border-block-end-width":"<'border-top-width'>","border-block-start":"<'border-top-width'>||<'border-top-style'>||<color>","border-block-start-color":"<'border-top-color'>","border-block-start-style":"<'border-top-style'>","border-block-start-width":"<'border-top-width'>","border-bottom":"<line-width>||<line-style>||<color>","border-bottom-color":"<'border-top-color'>","border-bottom-left-radius":"<length-percentage>{1,2}","border-bottom-right-radius":"<length-percentage>{1,2}","border-bottom-style":"<line-style>","border-bottom-width":"<line-width>","border-collapse":"collapse|separate","border-color":"<color>{1,4}","border-end-end-radius":"<length-percentage>{1,2}","border-end-start-radius":"<length-percentage>{1,2}","border-image":"<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>","border-image-outset":"[<length>|<number>]{1,4}","border-image-repeat":"[stretch|repeat|round|space]{1,2}","border-image-slice":"<number-percentage>{1,4}&&fill?","border-image-source":"none|<image>","border-image-width":"[<length-percentage>|<number>|auto]{1,4}","border-inline":"<'border-top-width'>||<'border-top-style'>||<color>","border-inline-end":"<'border-top-width'>||<'border-top-style'>||<color>","border-inline-color":"<'border-top-color'>{1,2}","border-inline-style":"<'border-top-style'>","border-inline-width":"<'border-top-width'>","border-inline-end-color":"<'border-top-color'>","border-inline-end-style":"<'border-top-style'>","border-inline-end-width":"<'border-top-width'>","border-inline-start":"<'border-top-width'>||<'border-top-style'>||<color>","border-inline-start-color":"<'border-top-color'>","border-inline-start-style":"<'border-top-style'>","border-inline-start-width":"<'border-top-width'>","border-left":"<line-width>||<line-style>||<color>","border-left-color":"<color>","border-left-style":"<line-style>","border-left-width":"<line-width>","border-radius":"<length-percentage>{1,4} [/ <length-percentage>{1,4}]?","border-right":"<line-width>||<line-style>||<color>","border-right-color":"<color>","border-right-style":"<line-style>","border-right-width":"<line-width>","border-spacing":"<length> <length>?","border-start-end-radius":"<length-percentage>{1,2}","border-start-start-radius":"<length-percentage>{1,2}","border-style":"<line-style>{1,4}","border-top":"<line-width>||<line-style>||<color>","border-top-color":"<color>","border-top-left-radius":"<length-percentage>{1,2}","border-top-right-radius":"<length-percentage>{1,2}","border-top-style":"<line-style>","border-top-width":"<line-width>","border-width":"<line-width>{1,4}",bottom:"<length>|<percentage>|auto","box-align":"start|center|end|baseline|stretch","box-decoration-break":"slice|clone","box-direction":"normal|reverse|inherit","box-flex":"<number>","box-flex-group":"<integer>","box-lines":"single|multiple","box-ordinal-group":"<integer>","box-orient":"horizontal|vertical|inline-axis|block-axis|inherit","box-pack":"start|center|end|justify","box-shadow":"none|<shadow>#","box-sizing":"content-box|border-box","break-after":"auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region","break-before":"auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region","break-inside":"auto|avoid|avoid-page|avoid-column|avoid-region","caption-side":"top|bottom|block-start|block-end|inline-start|inline-end",caret:"<'caret-color'>||<'caret-shape'>","caret-color":"auto|<color>","caret-shape":"auto|bar|block|underscore",clear:"none|left|right|both|inline-start|inline-end",clip:"<shape>|auto","clip-path":"<clip-source>|[<basic-shape>||<geometry-box>]|none","clip-rule":"nonzero|evenodd",color:"<color>","color-interpolation-filters":"auto|sRGB|linearRGB","color-scheme":"normal|[light|dark|<custom-ident>]+&&only?","column-count":"<integer>|auto","column-fill":"auto|balance","column-gap":"normal|<length-percentage>","column-rule":"<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>","column-rule-color":"<color>","column-rule-style":"<'border-style'>","column-rule-width":"<'border-width'>","column-span":"none|all","column-width":"<length>|auto",columns:"<'column-width'>||<'column-count'>",contain:"none|strict|content|[[size||inline-size]||layout||style||paint]","contain-intrinsic-size":"[auto? [none|<length>]]{1,2}","contain-intrinsic-block-size":"auto? [none|<length>]","contain-intrinsic-height":"auto? [none|<length>]","contain-intrinsic-inline-size":"auto? [none|<length>]","contain-intrinsic-width":"auto? [none|<length>]",container:"<'container-name'> [/ <'container-type'>]?","container-name":"none|<custom-ident>+","container-type":"normal||[size|inline-size]",content:"normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?","content-visibility":"visible|auto|hidden","counter-increment":"[<counter-name> <integer>?]+|none","counter-reset":"[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none","counter-set":"[<counter-name> <integer>?]+|none",cursor:"[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",d:"none|path( <string> )",cx:"<length>|<percentage>",cy:"<length>|<percentage>",direction:"ltr|rtl",display:"[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>","dominant-baseline":"auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge","empty-cells":"show|hide","field-sizing":"content|fixed",fill:"<paint>","fill-opacity":"<number-zero-one>","fill-rule":"nonzero|evenodd",filter:"none|<filter-function-list>|<-ms-filter-function-list>",flex:"none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]","flex-basis":"content|<'width'>","flex-direction":"row|row-reverse|column|column-reverse","flex-flow":"<'flex-direction'>||<'flex-wrap'>","flex-grow":"<number>","flex-shrink":"<number>","flex-wrap":"nowrap|wrap|wrap-reverse",float:"left|right|none|inline-start|inline-end",font:"[[<'font-style'>||<font-variant-css2>||<'font-weight'>||<font-width-css3>]? <'font-size'> [/ <'line-height'>]? <'font-family'>#]|<system-family-name>|<-non-standard-font>","font-family":"[<family-name>|<generic-family>]#","font-feature-settings":"normal|<feature-tag-value>#","font-kerning":"auto|normal|none","font-language-override":"normal|<string>","font-optical-sizing":"auto|none","font-palette":"normal|light|dark|<palette-identifier>","font-variation-settings":"normal|[<string> <number>]#","font-size":"<absolute-size>|<relative-size>|<length-percentage>","font-size-adjust":"none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]","font-smooth":"auto|never|always|<absolute-size>|<length>","font-stretch":"<font-stretch-absolute>","font-style":"normal|italic|oblique <angle>?","font-synthesis":"none|[weight||style||small-caps||position]","font-synthesis-position":"auto|none","font-synthesis-small-caps":"auto|none","font-synthesis-style":"auto|none","font-synthesis-weight":"auto|none","font-variant":"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]","font-variant-alternates":"normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]","font-variant-caps":"normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps","font-variant-east-asian":"normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]","font-variant-emoji":"normal|text|emoji|unicode","font-variant-ligatures":"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]","font-variant-numeric":"normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]","font-variant-position":"normal|sub|super","font-weight":"<font-weight-absolute>|bolder|lighter","forced-color-adjust":"auto|none|preserve-parent-color",gap:"<'row-gap'> <'column-gap'>?",grid:"<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>","grid-area":"<grid-line> [/ <grid-line>]{0,3}","grid-auto-columns":"<track-size>+","grid-auto-flow":"[row|column]||dense","grid-auto-rows":"<track-size>+","grid-column":"<grid-line> [/ <grid-line>]?","grid-column-end":"<grid-line>","grid-column-gap":"<length-percentage>","grid-column-start":"<grid-line>","grid-gap":"<'grid-row-gap'> <'grid-column-gap'>?","grid-row":"<grid-line> [/ <grid-line>]?","grid-row-end":"<grid-line>","grid-row-gap":"<length-percentage>","grid-row-start":"<grid-line>","grid-template":"none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?","grid-template-areas":"none|<string>+","grid-template-columns":"none|<track-list>|<auto-track-list>|subgrid <line-name-list>?","grid-template-rows":"none|<track-list>|<auto-track-list>|subgrid <line-name-list>?","hanging-punctuation":"none|[first||[force-end|allow-end]||last]",height:"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>","hyphenate-character":"auto|<string>","hyphenate-limit-chars":"[auto|<integer>]{1,3}",hyphens:"none|manual|auto","image-orientation":"from-image|<angle>|[<angle>? flip]","image-rendering":"auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>","image-resolution":"[from-image||<resolution>]&&snap?","ime-mode":"auto|normal|active|inactive|disabled","initial-letter":"normal|[<number> <integer>?]","initial-letter-align":"[auto|alphabetic|hanging|ideographic]","inline-size":"<'width'>","input-security":"auto|none",inset:"<'top'>{1,4}","inset-block":"<'top'>{1,2}","inset-block-end":"<'top'>","inset-block-start":"<'top'>","inset-inline":"<'top'>{1,2}","inset-inline-end":"<'top'>","inset-inline-start":"<'top'>","interpolate-size":"numeric-only|allow-keywords",isolation:"auto|isolate","justify-content":"normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]","justify-items":"normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]","justify-self":"auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]","justify-tracks":"[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",left:"<length>|<percentage>|auto","letter-spacing":"normal|<length-percentage>","line-break":"auto|loose|normal|strict|anywhere","line-clamp":"none|<integer>","line-height":"normal|<number>|<length>|<percentage>","line-height-step":"<length>","list-style":"<'list-style-type'>||<'list-style-position'>||<'list-style-image'>","list-style-image":"<image>|none","list-style-position":"inside|outside","list-style-type":"<counter-style>|<string>|none",margin:"[<length>|<percentage>|auto]{1,4}","margin-block":"<'margin-left'>{1,2}","margin-block-end":"<'margin-left'>","margin-block-start":"<'margin-left'>","margin-bottom":"<length>|<percentage>|auto","margin-inline":"<'margin-left'>{1,2}","margin-inline-end":"<'margin-left'>","margin-inline-start":"<'margin-left'>","margin-left":"<length>|<percentage>|auto","margin-right":"<length>|<percentage>|auto","margin-top":"<length>|<percentage>|auto","margin-trim":"none|in-flow|all",marker:"none|<url>","marker-end":"none|<url>","marker-mid":"none|<url>","marker-start":"none|<url>",mask:"<mask-layer>#","mask-border":"<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>","mask-border-mode":"luminance|alpha","mask-border-outset":"[<length>|<number>]{1,4}","mask-border-repeat":"[stretch|repeat|round|space]{1,2}","mask-border-slice":"<number-percentage>{1,4} fill?","mask-border-source":"none|<image>","mask-border-width":"[<length-percentage>|<number>|auto]{1,4}","mask-clip":"[<geometry-box>|no-clip]#","mask-composite":"<compositing-operator>#","mask-image":"<mask-reference>#","mask-mode":"<masking-mode>#","mask-origin":"<geometry-box>#","mask-position":"<position>#","mask-repeat":"<repeat-style>#","mask-size":"<bg-size>#","mask-type":"luminance|alpha","masonry-auto-flow":"[pack|next]||[definite-first|ordered]","math-depth":"auto-add|add( <integer> )|<integer>","math-shift":"normal|compact","math-style":"normal|compact","max-block-size":"<'max-width'>","max-height":"none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>","max-inline-size":"<'max-width'>","max-lines":"none|<integer>","max-width":"none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>","min-block-size":"<'min-width'>","min-height":"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>","min-inline-size":"<'min-width'>","min-width":"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>","mix-blend-mode":"<blend-mode>|plus-lighter","object-fit":"fill|contain|cover|none|scale-down","object-position":"<position>",offset:"[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?","offset-anchor":"auto|<position>","offset-distance":"<length-percentage>","offset-path":"none|<offset-path>||<coord-box>","offset-position":"normal|auto|<position>","offset-rotate":"[auto|reverse]||<angle>",opacity:"<alpha-value>",order:"<integer>",orphans:"<integer>",outline:"[<'outline-width'>||<'outline-style'>||<'outline-color'>]","outline-color":"auto|<color>","outline-offset":"<length>","outline-style":"auto|<'border-style'>","outline-width":"<line-width>",overflow:"[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>","overflow-anchor":"auto|none","overflow-block":"visible|hidden|clip|scroll|auto","overflow-clip-box":"padding-box|content-box","overflow-clip-margin":"<visual-box>||<length [0,∞]>","overflow-inline":"visible|hidden|clip|scroll|auto","overflow-wrap":"normal|break-word|anywhere","overflow-x":"visible|hidden|clip|scroll|auto","overflow-y":"visible|hidden|clip|scroll|auto",overlay:"none|auto","overscroll-behavior":"[contain|none|auto]{1,2}","overscroll-behavior-block":"contain|none|auto","overscroll-behavior-inline":"contain|none|auto","overscroll-behavior-x":"contain|none|auto","overscroll-behavior-y":"contain|none|auto",padding:"[<length>|<percentage>]{1,4}","padding-block":"<'padding-left'>{1,2}","padding-block-end":"<'padding-left'>","padding-block-start":"<'padding-left'>","padding-bottom":"<length>|<percentage>","padding-inline":"<'padding-left'>{1,2}","padding-inline-end":"<'padding-left'>","padding-inline-start":"<'padding-left'>","padding-left":"<length>|<percentage>","padding-right":"<length>|<percentage>","padding-top":"<length>|<percentage>",page:"auto|<custom-ident>","page-break-after":"auto|always|avoid|left|right|recto|verso","page-break-before":"auto|always|avoid|left|right|recto|verso","page-break-inside":"auto|avoid","paint-order":"normal|[fill||stroke||markers]",perspective:"none|<length>","perspective-origin":"<position>","place-content":"<'align-content'> <'justify-content'>?","place-items":"<'align-items'> <'justify-items'>?","place-self":"<'align-self'> <'justify-self'>?","pointer-events":"auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",position:"static|relative|absolute|sticky|fixed|-webkit-sticky","position-anchor":"auto|<anchor-name>","position-area":"none|<position-area>","position-try":"<'position-try-order'>? <'position-try-fallbacks'>","position-try-fallbacks":"none|[[<dashed-ident>||<try-tactic>]|<'position-area'>]#","position-try-order":"normal|<try-size>","position-visibility":"always|[anchors-valid||anchors-visible||no-overflow]","print-color-adjust":"economy|exact",quotes:"none|auto|[<string> <string>]+",r:"<length>|<percentage>",resize:"none|both|horizontal|vertical|block|inline",right:"<length>|<percentage>|auto",rotate:"none|<angle>|[x|y|z|<number>{3}]&&<angle>","row-gap":"normal|<length-percentage>","ruby-align":"start|center|space-between|space-around","ruby-merge":"separate|collapse|auto","ruby-position":"[alternate||[over|under]]|inter-character",rx:"<length>|<percentage>",ry:"<length>|<percentage>",scale:"none|[<number>|<percentage>]{1,3}","scrollbar-color":"auto|<color>{2}","scrollbar-gutter":"auto|stable&&both-edges?","scrollbar-width":"auto|thin|none","scroll-behavior":"auto|smooth","scroll-margin":"<length>{1,4}","scroll-margin-block":"<length>{1,2}","scroll-margin-block-start":"<length>","scroll-margin-block-end":"<length>","scroll-margin-bottom":"<length>","scroll-margin-inline":"<length>{1,2}","scroll-margin-inline-start":"<length>","scroll-margin-inline-end":"<length>","scroll-margin-left":"<length>","scroll-margin-right":"<length>","scroll-margin-top":"<length>","scroll-padding":"[auto|<length-percentage>]{1,4}","scroll-padding-block":"[auto|<length-percentage>]{1,2}","scroll-padding-block-start":"auto|<length-percentage>","scroll-padding-block-end":"auto|<length-percentage>","scroll-padding-bottom":"auto|<length-percentage>","scroll-padding-inline":"[auto|<length-percentage>]{1,2}","scroll-padding-inline-start":"auto|<length-percentage>","scroll-padding-inline-end":"auto|<length-percentage>","scroll-padding-left":"auto|<length-percentage>","scroll-padding-right":"auto|<length-percentage>","scroll-padding-top":"auto|<length-percentage>","scroll-snap-align":"[none|start|end|center]{1,2}","scroll-snap-coordinate":"none|<position>#","scroll-snap-destination":"<position>","scroll-snap-points-x":"none|repeat( <length-percentage> )","scroll-snap-points-y":"none|repeat( <length-percentage> )","scroll-snap-stop":"normal|always","scroll-snap-type":"none|[x|y|block|inline|both] [mandatory|proximity]?","scroll-snap-type-x":"none|mandatory|proximity","scroll-snap-type-y":"none|mandatory|proximity","scroll-timeline":"[<'scroll-timeline-name'>||<'scroll-timeline-axis'>]#","scroll-timeline-axis":"[block|inline|x|y]#","scroll-timeline-name":"[none|<dashed-ident>]#","shape-image-threshold":"<alpha-value>","shape-margin":"<length-percentage>","shape-outside":"none|[<shape-box>||<basic-shape>]|<image>","shape-rendering":"auto|optimizeSpeed|crispEdges|geometricPrecision",stroke:"<paint>","stroke-dasharray":"none|[<svg-length>+]#","stroke-dashoffset":"<svg-length>","stroke-linecap":"butt|round|square","stroke-linejoin":"miter|round|bevel","stroke-miterlimit":"<number-one-or-greater>","stroke-opacity":"<'opacity'>","stroke-width":"<svg-length>","tab-size":"<integer>|<length>","table-layout":"auto|fixed","text-align":"start|end|left|right|center|justify|match-parent","text-align-last":"auto|start|end|left|right|center|justify","text-anchor":"start|middle|end","text-combine-upright":"none|all|[digits <integer>?]","text-decoration":"<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>","text-decoration-color":"<color>","text-decoration-line":"none|[underline||overline||line-through||blink]|spelling-error|grammar-error","text-decoration-skip":"none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]","text-decoration-skip-ink":"auto|all|none","text-decoration-style":"solid|double|dotted|dashed|wavy","text-decoration-thickness":"auto|from-font|<length>|<percentage>","text-emphasis":"<'text-emphasis-style'>||<'text-emphasis-color'>","text-emphasis-color":"<color>","text-emphasis-position":"auto|[over|under]&&[right|left]?","text-emphasis-style":"none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>","text-indent":"<length-percentage>&&hanging?&&each-line?","text-justify":"auto|inter-character|inter-word|none","text-orientation":"mixed|upright|sideways","text-overflow":"[clip|ellipsis|<string>]{1,2}","text-rendering":"auto|optimizeSpeed|optimizeLegibility|geometricPrecision","text-shadow":"none|<shadow-t>#","text-size-adjust":"none|auto|<percentage>","text-spacing-trim":"space-all|normal|space-first|trim-start|trim-both|trim-all|auto","text-transform":"none|capitalize|uppercase|lowercase|full-width|full-size-kana","text-underline-offset":"auto|<length>|<percentage>","text-underline-position":"auto|from-font|[under||[left|right]]","text-wrap":"<'text-wrap-mode'>||<'text-wrap-style'>","text-wrap-mode":"auto|wrap|nowrap","text-wrap-style":"auto|balance|stable|pretty","timeline-scope":"none|<dashed-ident>#",top:"<length>|<percentage>|auto","touch-action":"auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",transform:"none|<transform-list>","transform-box":"content-box|border-box|fill-box|stroke-box|view-box","transform-origin":"[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?","transform-style":"flat|preserve-3d",transition:"<single-transition>#","transition-behavior":"<transition-behavior-value>#","transition-delay":"<time>#","transition-duration":"<time>#","transition-property":"none|<single-transition-property>#","transition-timing-function":"<easing-function>#",translate:"none|<length-percentage> [<length-percentage> <length>?]?","unicode-bidi":"normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext","user-select":"auto|text|none|contain|all","vector-effect":"none|non-scaling-stroke|non-scaling-size|non-rotation|fixed-position","vertical-align":"baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>","view-timeline":"[<'view-timeline-name'> <'view-timeline-axis'>?]#","view-timeline-axis":"[block|inline|x|y]#","view-timeline-inset":"[[auto|<length-percentage>]{1,2}]#","view-timeline-name":"none|<dashed-ident>#","view-transition-name":"none|<custom-ident>",visibility:"visible|hidden|collapse","white-space":"normal|pre|nowrap|pre-wrap|pre-line|break-spaces|[<'white-space-collapse'>||<'text-wrap'>||<'white-space-trim'>]","white-space-collapse":"collapse|discard|preserve|preserve-breaks|preserve-spaces|break-spaces",widows:"<integer>",width:"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|stretch|<-non-standard-size>","will-change":"auto|<animateable-feature>#","word-break":"normal|break-all|keep-all|break-word|auto-phrase","word-spacing":"normal|<length>","word-wrap":"normal|break-word","writing-mode":"horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>",x:"<length>|<percentage>",y:"<length>|<percentage>","z-index":"auto|<integer>",zoom:"normal|reset|<number>|<percentage>","-moz-background-clip":"padding|border","-moz-border-radius-bottomleft":"<'border-bottom-left-radius'>","-moz-border-radius-bottomright":"<'border-bottom-right-radius'>","-moz-border-radius-topleft":"<'border-top-left-radius'>","-moz-border-radius-topright":"<'border-bottom-right-radius'>","-moz-control-character-visibility":"visible|hidden","-moz-osx-font-smoothing":"auto|grayscale","-moz-user-select":"none|text|all|-moz-none","-ms-flex-align":"start|end|center|baseline|stretch","-ms-flex-item-align":"auto|start|end|center|baseline|stretch","-ms-flex-line-pack":"start|end|center|justify|distribute|stretch","-ms-flex-negative":"<'flex-shrink'>","-ms-flex-pack":"start|end|center|justify|distribute","-ms-flex-order":"<integer>","-ms-flex-positive":"<'flex-grow'>","-ms-flex-preferred-size":"<'flex-basis'>","-ms-interpolation-mode":"nearest-neighbor|bicubic","-ms-grid-column-align":"start|end|center|stretch","-ms-grid-row-align":"start|end|center|stretch","-ms-hyphenate-limit-last":"none|always|column|page|spread","-webkit-background-clip":"[<box>|border|padding|content|text]#","-webkit-column-break-after":"always|auto|avoid","-webkit-column-break-before":"always|auto|avoid","-webkit-column-break-inside":"always|auto|avoid","-webkit-font-smoothing":"auto|none|antialiased|subpixel-antialiased","-webkit-mask-box-image":"[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?","-webkit-print-color-adjust":"economy|exact","-webkit-text-security":"none|circle|disc|square","-webkit-user-drag":"none|element|auto","-webkit-user-select":"auto|none|text|all","alignment-baseline":"auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical","baseline-shift":"baseline|sub|super|<svg-length>",behavior:"<url>+",cue:"<'cue-before'> <'cue-after'>?","cue-after":"<url> <decibel>?|none","cue-before":"<url> <decibel>?|none","glyph-orientation-horizontal":"<angle>","glyph-orientation-vertical":"<angle>",kerning:"auto|<svg-length>",pause:"<'pause-before'> <'pause-after'>?","pause-after":"<time>|none|x-weak|weak|medium|strong|x-strong","pause-before":"<time>|none|x-weak|weak|medium|strong|x-strong",rest:"<'rest-before'> <'rest-after'>?","rest-after":"<time>|none|x-weak|weak|medium|strong|x-strong","rest-before":"<time>|none|x-weak|weak|medium|strong|x-strong",src:"[<url> [format( <string># )]?|local( <family-name> )]#",speak:"auto|never|always","speak-as":"normal|spell-out||digits||[literal-punctuation|no-punctuation]","unicode-range":"<urange>#","voice-balance":"<number>|left|center|right|leftwards|rightwards","voice-duration":"auto|<time>","voice-family":"[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve","voice-pitch":"<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]","voice-range":"<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]","voice-rate":"[normal|x-slow|slow|medium|fast|x-fast]||<percentage>","voice-stress":"normal|strong|moderate|none|reduced","voice-volume":"silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]","white-space-trim":"none|discard-before||discard-after||discard-inner"},atrules:{charset:{prelude:"<string>",descriptors:null},"counter-style":{prelude:"<counter-style-name>",descriptors:{"additive-symbols":"[<integer>&&<symbol>]#",fallback:"<counter-style-name>",negative:"<symbol> <symbol>?",pad:"<integer>&&<symbol>",prefix:"<symbol>",range:"[[<integer>|infinite]{2}]#|auto","speak-as":"auto|bullets|numbers|words|spell-out|<counter-style-name>",suffix:"<symbol>",symbols:"<symbol>+",system:"cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"}},document:{prelude:"[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",descriptors:null},"font-palette-values":{prelude:"<dashed-ident>",descriptors:{"base-palette":"light|dark|<integer [0,∞]>","font-family":"<family-name>#","override-colors":"[<integer [0,∞]> <absolute-color-base>]#"}},"font-face":{prelude:null,descriptors:{"ascent-override":"normal|<percentage>","descent-override":"normal|<percentage>","font-display":"[auto|block|swap|fallback|optional]","font-family":"<family-name>","font-feature-settings":"normal|<feature-tag-value>#","font-variation-settings":"normal|[<string> <number>]#","font-stretch":"<font-stretch-absolute>{1,2}","font-style":"normal|italic|oblique <angle>{0,2}","font-weight":"<font-weight-absolute>{1,2}","line-gap-override":"normal|<percentage>","size-adjust":"<percentage>",src:"[<url> [format( <string># )]?|local( <family-name> )]#","unicode-range":"<urange>#"}},"font-feature-values":{prelude:"<family-name>#",descriptors:null},import:{prelude:"[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",descriptors:null},keyframes:{prelude:"<keyframes-name>",descriptors:null},layer:{prelude:"[<layer-name>#|<layer-name>?]",descriptors:null},media:{prelude:"<media-query-list>",descriptors:null},namespace:{prelude:"<namespace-prefix>? [<string>|<url>]",descriptors:null},page:{prelude:"<page-selector-list>",descriptors:{bleed:"auto|<length>",marks:"none|[crop||cross]","page-orientation":"upright|rotate-left|rotate-right",size:"<length>{1,2}|auto|[<page-size>||[portrait|landscape]]"}},"position-try":{prelude:"<dashed-ident>",descriptors:{top:"<'top'>",left:"<'left'>",bottom:"<'bottom'>",right:"<'right'>","inset-block-start":"<'inset-block-start'>","inset-block-end":"<'inset-block-end'>","inset-inline-start":"<'inset-inline-start'>","inset-inline-end":"<'inset-inline-end'>","inset-block":"<'inset-block'>","inset-inline":"<'inset-inline'>",inset:"<'inset'>","margin-top":"<'margin-top'>","margin-left":"<'margin-left'>","margin-bottom":"<'margin-bottom'>","margin-right":"<'margin-right'>","margin-block-start":"<'margin-block-start'>","margin-block-end":"<'margin-block-end'>","margin-inline-start":"<'margin-inline-start'>","margin-inline-end":"<'margin-inline-end'>",margin:"<'margin'>","margin-block":"<'margin-block'>","margin-inline":"<'margin-inline'>",width:"<'width'>",height:"<'height'>","min-width":"<'min-width'>","min-height":"<'min-height'>","max-width":"<'max-width'>","max-height":"<'max-height'>","block-size":"<'block-size'>","inline-size":"<'inline-size'>","min-block-size":"<'min-block-size'>","min-inline-size":"<'min-inline-size'>","max-block-size":"<'max-block-size'>","max-inline-size":"<'max-inline-size'>","align-self":"<'align-self'>|anchor-center","justify-self":"<'justify-self'>|anchor-center"}},property:{prelude:"<custom-property-name>",descriptors:{syntax:"<string>",inherits:"true|false","initial-value":"<declaration-value>?"}},scope:{prelude:"[( <scope-start> )]? [to ( <scope-end> )]?",descriptors:null},"starting-style":{prelude:null,descriptors:null},supports:{prelude:"<supports-condition>",descriptors:null},container:{prelude:"[<container-name>]? <container-condition>",descriptors:null},nest:{prelude:"<complex-selector-list>",descriptors:null}},node:Pl}
function Nl(e){switch(this.tokenType){case 4:return this.Hash()
case Kt:return this.Operator()
case en:return this.Parentheses(this.readSequence,e.recognizer)
case Zt:return this.Brackets(this.readSequence,e.recognizer)
case 5:return this.String()
case $t:return this.Dimension()
case Vt:return this.Percentage()
case Wt:return this.Number()
case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer)
case 7:return this.Url()
case 1:return this.cmpChar(this.tokenStart,117)&&this.cmpChar(this.tokenStart+1,43)?this.UnicodeRange():this.Identifier()
case 9:{const e=this.charCodeAt(this.tokenStart)
if(47===e||42===e||43===e||45===e)return this.Operator()
35===e&&this.error("Hex or identifier is expected",this.tokenStart+1)
break}}}var Dl={getNode:Nl}
var jl={onWhiteSpace:function(e,t){null!==t.last&&"Combinator"!==t.last.type&&null!==e&&"Combinator"!==e.type&&t.push({type:"Combinator",loc:null,name:" "})},getNode:function(){switch(this.tokenType){case Zt:return this.AttributeSelector()
case 4:return this.IdSelector()
case Ht:return this.lookupType(1)===Ht?this.PseudoElementSelector():this.PseudoClassSelector()
case 1:return this.TypeSelector()
case Wt:case Vt:return this.Percentage()
case $t:46===this.charCodeAt(this.tokenStart)&&this.error("Identifier is expected",this.tokenStart+1)
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 43:case 62:case 126:case 47:return this.Combinator()
case 46:return this.ClassSelector()
case 42:case 124:return this.TypeSelector()
case 35:return this.IdSelector()
case 38:return this.NestingSelector()}break}}}
function Ml(e){return null!==e&&"Operator"===e.type&&("-"===e.value[e.value.length-1]||"+"===e.value[e.value.length-1])}var Il={getNode:Nl,onWhiteSpace(e,t){Ml(e)&&(e.value=" "+e.value),Ml(t.last)&&(t.last.value+=" ")},expression:function(){return this.createSingleNodeList(this.Raw(null,!1))},var:function(){const e=this.createList()
if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===Kt){e.push(this.Operator())
const t=this.tokenIndex,n=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)
if("Value"===n.type&&n.children.isEmpty)for(let e=t-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Yt){n.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}e.push(n)}return e}},Rl=Object.freeze({__proto__:null,AtrulePrelude:Dl,Selector:jl,Value:Il})
const Fl=new Set(["none","and","not","or"])
var Bl={parse:{prelude(){const e=this.createList()
if(1===this.tokenType){const t=this.substring(this.tokenStart,this.tokenEnd)
Fl.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}},ql={parse:{prelude:null,block(){return this.Block(!0)}}}
function Gl(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==tn&&this.error()}},t||(()=>this.Raw(null,!0)))}const Ul={layer(){this.skipSC()
const e=this.createList(),t=Gl.call(this,this.Layer)
return"Raw"===t.type&&""===t.value||e.push(t),e},supports(){this.skipSC()
const e=this.createList(),t=Gl.call(this,this.Declaration,()=>Gl.call(this,()=>this.Condition("supports")))
return"Raw"===t.type&&""===t.value||e.push(t),e}}
var Wl={container:Bl,"font-face":ql,import:{parse:{prelude(){const e=this.createList()
switch(this.tokenType){case 5:e.push(this.String())
break
case 7:case 2:e.push(this.Url())
break
default:this.error("String or url() is expected")}return this.skipSC(),1===this.tokenType&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):2===this.tokenType&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,Ul)),this.skipSC(),2===this.tokenType&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,Ul)),1!==this.lookupNonWSType(0)&&this.lookupNonWSType(0)!==en||e.push(this.MediaQueryList()),e},block:null}},layer:{parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}},media:{parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}},nest:{parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}},page:{parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}},scope:{parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}},"starting-style":{parse:{prelude:null,block(e=!1){return this.Block(e)}}},supports:{parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}}}
const Vl={parse(){return this.createSingleNodeList(this.SelectorList())}},$l={parse(){return this.createSingleNodeList(this.Selector())}},Yl={parse(){return this.createSingleNodeList(this.Identifier())}},Xl={parse:function(){const e=this.createList()
this.skipSC()
e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier())
break
case 5:e.push(this.String())
break
case Kt:e.push(this.Operator())
break
case tn:break e
default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}},Hl={parse(){return this.createSingleNodeList(this.Nth())}}
var Ql={dir:Yl,has:Vl,lang:Xl,matches:Vl,is:Vl,"-moz-any":Vl,"-webkit-any":Vl,where:Vl,not:Vl,"nth-child":Hl,"nth-last-child":Hl,"nth-last-of-type":Hl,"nth-of-type":Hl,slotted:$l,host:$l,"host-context":$l},Kl=Object.freeze({__proto__:null,AnPlusB:Di,Atrule:Fi,AtrulePrelude:qi,AttributeSelector:$i,Block:Zi,Brackets:ea,CDC:na,CDO:oa,ClassSelector:sa,Combinator:ua,Comment:pa,Condition:ka,Declaration:Aa,DeclarationList:Oa,Dimension:Na,Feature:Ma,FeatureFunction:Ba,FeatureRange:Va,Function:Xa,GeneralEnclosed:Ka,Hash:es,IdSelector:as,Identifier:rs,Layer:cs,LayerList:hs,MediaQuery:ms,MediaQueryList:gs,NestingSelector:ys,Nth:vs,Number:Ss,Operator:_s,Parentheses:Ts,Percentage:Ps,PseudoClassSelector:Ds,PseudoElementSelector:Is,Ratio:Bs,Raw:Ws,Rule:Xs,Scope:Qs,Selector:Zs,SelectorList:el,String:ol,StyleSheet:sl,SupportsDeclaration:cl,TypeSelector:pl,UnicodeRange:vl,Url:Sl,Value:Al,WhiteSpace:El}),Zl=(e=>Ci(Si({},e)))({...Ll,...{parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Rl,atrule:Wl,pseudo:Ql,node:Kl},...{node:Pl}})
function Jl(e){const t={}
for(const n of Object.keys(e)){let r=e[n]
r&&(Array.isArray(r)||r instanceof Un?r=r.map(Jl):r.constructor===Object&&(r=Jl(r))),t[n]=r}return t}const{tokenize:ec,parse:tc,generate:nc,lexer:rc,createLexer:oc,walk:ic,find:ac,findLast:sc,findAll:lc,toPlainObject:cc,fromPlainObject:uc,fork:hc}=Zl,dc=10,pc=11,mc=12,fc=13,gc=15,bc=16,yc=17,kc=18,vc=19,wc=20,xc=21,Sc=22,Cc=23,Ac=24,_c=25
function zc(e){return e>=0x0030&&e<=0x0039}function Tc(e){return zc(e)||e>=0x0041&&e<=0x0046||e>=0x0061&&e<=0x0066}function Ec(e){return e>=0x0041&&e<=0x005A}function Oc(e){return function(e){return Ec(e)||function(e){return e>=0x0061&&e<=0x007A}(e)}(e)||function(e){return e>=0x0080}(e)||0x005F===e}function Pc(e){return Oc(e)||zc(e)||0x002D===e}function Lc(e){return e>=0x0000&&e<=0x0008||0x000B===e||e>=0x000E&&e<=0x001F||0x007F===e}function Nc(e){return 0x000A===e||0x000D===e||0x000C===e}function Dc(e){return Nc(e)||0x0020===e||0x0009===e}function jc(e,t){return 0x005C===e&&(!Nc(t)&&0!==t)}function Mc(e,t,n){return 0x002D===e?Oc(t)||0x002D===t||jc(t,n):!!Oc(e)||0x005C===e&&jc(e,t)}function Ic(e,t,n){return 0x002B===e||0x002D===e?zc(t)?2:0x002E===t&&zc(n)?3:0:0x002E===e?zc(t)?2:0:zc(e)?1:0}function Rc(e){return 0xFEFF===e||0xFFFE===e?1:0}const Fc=new Array(0x80),Bc=0x82
for(let e=0;e<Fc.length;e++)Fc[e]=(Dc(e)?Bc:zc(e)&&131)||Oc(e)&&132||Lc(e)&&133||e||128
function qc(e){return e<0x80?Fc[e]:132}function Gc(e,t){return t<e.length?e.charCodeAt(t):0}function Uc(e,t,n){return 13===n&&10===Gc(e,t+1)?2:1}function Wc(e,t,n){let r=e.charCodeAt(t)
return Ec(r)&&(r|=32),r===n}function Vc(e,t,n,r){if(n-t!==r.length)return!1
if(t<0||n>e.length)return!1
for(let o=t;o<n;o++){const n=r.charCodeAt(o-t)
let i=e.charCodeAt(o)
if(Ec(i)&&(i|=32),i!==n)return!1}return!0}function $c(e,t){for(;t<e.length&&Dc(e.charCodeAt(t));t++);return t}function Yc(e,t){for(;t<e.length&&zc(e.charCodeAt(t));t++);return t}function Xc(e,t){if(Tc(Gc(e,(t+=2)-1))){for(const n=Math.min(e.length,t+5);t<n&&Tc(Gc(e,t));t++);const n=Gc(e,t)
Dc(n)&&(t+=Uc(e,t,n))}return t}function Hc(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(!Pc(n)){if(!jc(n,Gc(e,t+1)))break
t=Xc(e,t)-1}}return t}function Qc(e,t){let n=e.charCodeAt(t)
if(0x002B!==n&&0x002D!==n||(n=e.charCodeAt(t+=1)),zc(n)&&(t=Yc(e,t+1),n=e.charCodeAt(t)),0x002E===n&&zc(e.charCodeAt(t+1))&&(t=Yc(e,t+=2)),Wc(e,t,101)){let r=0
n=e.charCodeAt(t+1),0x002D!==n&&0x002B!==n||(r=1,n=e.charCodeAt(t+2)),zc(n)&&(t=Yc(e,t+1+r+1))}return t}function Kc(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(0x0029===n){t++
break}jc(n,Gc(e,t+1))&&(t=Xc(e,t))}return t}function Zc(e){if(1===e.length&&!Tc(e.charCodeAt(0)))return e[0]
let t=parseInt(e,16)
return(0===t||t>=0xD800&&t<=0xDFFF||t>0x10FFFF)&&(t=0xFFFD),String.fromCodePoint(t)}var Jc=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token"]
function eu(e=null,t){return null===e||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}function tu(e){const t=e.source,n=t.length,r=t.length>0?Rc(t.charCodeAt(0)):0,o=eu(e.lines,n),i=eu(e.columns,n)
let a=e.startLine,s=e.startColumn
for(let e=r;e<n;e++){const r=t.charCodeAt(e)
o[e]=a,i[e]=s++,10!==r&&13!==r&&12!==r||(13===r&&e+1<n&&10===t.charCodeAt(e+1)&&(e++,o[e]=a,i[e]=s),a++,s=1)}o[n]=a,i[n]=s,e.lines=o,e.columns=i,e.computed=!0}class nu{constructor(){this.lines=null,this.columns=null,this.computed=!1}setSource(e,t=0,n=1,r=1){this.source=e,this.startOffset=t,this.startLine=n,this.startColumn=r,this.computed=!1}getLocation(e,t){return this.computed||tu(this),{source:t,offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]}}getLocationRange(e,t,n){return this.computed||tu(this),{source:n,start:{offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]},end:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}}}const ru=0x00FFFFFF,ou=24,iu=new Map([[2,Sc],[xc,Sc],[vc,wc],[Cc,Ac]])
class au{constructor(e,t){this.setSource(e,t)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(e="",t=()=>{}){const n=(e=String(e||"")).length,r=eu(this.offsetAndType,e.length+1),o=eu(this.balance,e.length+1)
let i=0,a=0,s=0,l=-1
for(this.offsetAndType=null,this.balance=null,t(e,(e,t,c)=>{switch(e){default:o[i]=n
break
case a:{let e=s&ru
for(s=o[e],a=s>>ou,o[i]=e,o[e++]=i;e<i;e++)o[e]===n&&(o[e]=i)
break}case xc:case 2:case vc:case Cc:o[i]=s,a=iu.get(e),s=a<<ou|i}r[i++]=e<<ou|c,-1===l&&(l=t)}),r[i]=0|n,o[i]=n,o[n]=n;0!==s;){const e=s&ru
s=o[e],o[e]=n}this.source=e,this.firstCharOffset=-1===l?0:l,this.tokenCount=i,this.offsetAndType=r,this.balance=o,this.reset(),this.next()}lookupType(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e]>>ou:0}lookupOffset(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e-1]&ru:this.source.length}lookupValue(e,t){return(e+=this.tokenIndex)<this.tokenCount&&Vc(this.source,this.offsetAndType[e-1]&ru,this.offsetAndType[e]&ru,t)}getTokenStart(e){return e===this.tokenIndex?this.tokenStart:e>0?e<this.tokenCount?this.offsetAndType[e-1]&ru:this.offsetAndType[this.tokenCount]&ru:this.firstCharOffset}substrToCursor(e){return this.source.substring(e,this.tokenStart)}isBalanceEdge(e){return this.balance[this.tokenIndex]<e}isDelim(e,t){return t?9===this.lookupType(t)&&this.source.charCodeAt(this.lookupOffset(t))===e:9===this.tokenType&&this.source.charCodeAt(this.tokenStart)===e}skip(e){let t=this.tokenIndex+e
t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.offsetAndType[t-1]&ru,t=this.offsetAndType[t],this.tokenType=t>>ou,this.tokenEnd=t&ru):(this.tokenIndex=this.tokenCount,this.next())}next(){let e=this.tokenIndex+1
e<this.tokenCount?(this.tokenIndex=e,this.tokenStart=this.tokenEnd,e=this.offsetAndType[e],this.tokenType=e>>ou,this.tokenEnd=e&ru):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===fc||this.tokenType===_c;)this.next()}skipUntilBalanced(e,t){let n,r,o=e
e:for(;o<this.tokenCount&&(n=this.balance[o],!(n<e));o++)switch(r=o>0?this.offsetAndType[o-1]&ru:this.firstCharOffset,t(this.source.charCodeAt(r))){case 1:break e
case 2:o++
break e
default:this.balance[n]===o&&(o=n)}this.skip(o-this.tokenIndex)}forEachToken(e){for(let t=0,n=this.firstCharOffset;t<this.tokenCount;t++){const r=n,o=this.offsetAndType[t],i=o&ru
n=i,e(o>>ou,r,i,t)}}dump(){const e=new Array(this.tokenCount)
return this.forEachToken((t,n,r,o)=>{e[o]={idx:o,type:Jc[t],chunk:this.source.substring(n,r),balance:this.balance[o]}}),e}}function su(e,t){function n(t){return t<a?e.charCodeAt(t):0}function r(){return c=Qc(e,c),Mc(n(c),n(c+1),n(c+2))?(s=mc,c=Hc(e,c),void 0):0x0025===n(c)?(s=pc,c++,void 0):(s=dc,void 0)}function o(){const t=c
return c=Hc(e,c),Vc(e,t,c,"url")&&0x0028===n(c)?(c=$c(e,c+1),0x0022===n(c)||0x0027===n(c)?(s=2,c=t+4,void 0):(!function(){for(s=7,c=$c(e,c);c<e.length;c++){const t=e.charCodeAt(c)
switch(qc(t)){case 0x0029:return c++,void 0
case Bc:return c=$c(e,c),0x0029===n(c)||c>=e.length?(c<e.length&&c++,void 0):(c=Kc(e,c),s=8,void 0)
case 0x0022:case 0x0027:case 0x0028:case 133:return c=Kc(e,c),s=8,void 0
case 0x005C:if(jc(t,n(c+1))){c=Xc(e,c)-1
break}return c=Kc(e,c),s=8,void 0}}}(),void 0)):0x0028===n(c)?(s=2,c++,void 0):(s=1,void 0)}function i(t){for(t||(t=n(c++)),s=5;c<e.length;c++){const r=e.charCodeAt(c)
switch(qc(r)){case t:return c++,void 0
case Bc:if(Nc(r))return c+=Uc(e,c,r),s=6,void 0
break
case 0x005C:if(c===e.length-1)break
const o=n(c+1)
Nc(o)?c+=Uc(e,c+1,o):jc(r,o)&&(c=Xc(e,c)-1)}}}const a=(e=String(e||"")).length
let s,l=Rc(n(0)),c=l
for(;c<a;){const a=e.charCodeAt(c)
switch(qc(a)){case Bc:s=fc,c=$c(e,c+1)
break
case 0x0022:i()
break
case 0x0023:Pc(n(c+1))||jc(n(c+1),n(c+2))?(s=4,c=Hc(e,c+1)):(s=9,c++)
break
case 0x0027:i()
break
case 0x0028:s=xc,c++
break
case 0x0029:s=Sc,c++
break
case 0x002B:Ic(a,n(c+1),n(c+2))?r():(s=9,c++)
break
case 0x002C:s=kc,c++
break
case 0x002D:Ic(a,n(c+1),n(c+2))?r():0x002D===n(c+1)&&0x003E===n(c+2)?(s=gc,c+=3):Mc(a,n(c+1),n(c+2))?o():(s=9,c++)
break
case 0x002E:Ic(a,n(c+1),n(c+2))?r():(s=9,c++)
break
case 0x002F:0x002A===n(c+1)?(s=_c,c=e.indexOf("*/",c+2),c=-1===c?e.length:c+2):(s=9,c++)
break
case 0x003A:s=bc,c++
break
case 0x003B:s=yc,c++
break
case 0x003C:0x0021===n(c+1)&&0x002D===n(c+2)&&0x002D===n(c+3)?(s=14,c+=4):(s=9,c++)
break
case 0x0040:Mc(n(c+1),n(c+2),n(c+3))?(s=3,c=Hc(e,c+1)):(s=9,c++)
break
case 0x005B:s=vc,c++
break
case 0x005C:jc(a,n(c+1))?o():(s=9,c++)
break
case 0x005D:s=wc,c++
break
case 0x007B:s=Cc,c++
break
case 0x007D:s=Ac,c++
break
case 131:r()
break
case 132:o()
break
default:s=9,c++}t(s,l,l=c)}}let lu=null
class cu{static createItem(e){return{prev:null,next:null,data:e}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(e){return cu.createItem(e)}allocateCursor(e,t){let n
return null!==lu?(n=lu,lu=lu.cursor,n.prev=e,n.next=t,n.cursor=this.cursor):n={prev:e,next:t,cursor:this.cursor},this.cursor=n,n}releaseCursor(){const{cursor:e}=this
this.cursor=e.cursor,e.prev=null,e.next=null,e.cursor=lu,lu=e}updateCursors(e,t,n,r){let{cursor:o}=this
for(;null!==o;)o.prev===e&&(o.prev=t),o.next===n&&(o.next=r),o=o.cursor}*[Symbol.iterator](){for(let e=this.head;null!==e;e=e.next)yield e.data}get size(){let e=0
for(let t=this.head;null!==t;t=t.next)e++
return e}get isEmpty(){return null===this.head}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(e){let t=null
this.head=null
for(let n of e){const e=cu.createItem(n)
null!==t?t.next=e:this.head=e,e.prev=t,t=e}return this.tail=t,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(e,t=this){const n=this.allocateCursor(null,this.head)
for(;null!==n.next;){const r=n.next
n.next=r.next,e.call(t,r.data,r,this)}this.releaseCursor()}forEachRight(e,t=this){const n=this.allocateCursor(this.tail,null)
for(;null!==n.prev;){const r=n.prev
n.prev=r.prev,e.call(t,r.data,r,this)}this.releaseCursor()}reduce(e,t,n=this){let r,o=this.allocateCursor(null,this.head),i=t
for(;null!==o.next;)r=o.next,o.next=r.next,i=e.call(n,i,r.data,r,this)
return this.releaseCursor(),i}reduceRight(e,t,n=this){let r,o=this.allocateCursor(this.tail,null),i=t
for(;null!==o.prev;)r=o.prev,o.prev=r.prev,i=e.call(n,i,r.data,r,this)
return this.releaseCursor(),i}some(e,t=this){for(let n=this.head;null!==n;n=n.next)if(e.call(t,n.data,n,this))return!0
return!1}map(e,t=this){const n=new cu
for(let r=this.head;null!==r;r=r.next)n.appendData(e.call(t,r.data,r,this))
return n}filter(e,t=this){const n=new cu
for(let r=this.head;null!==r;r=r.next)e.call(t,r.data,r,this)&&n.appendData(r.data)
return n}nextUntil(e,t,n=this){if(null===e)return
const r=this.allocateCursor(null,e)
for(;null!==r.next;){const e=r.next
if(r.next=e.next,t.call(n,e.data,e,this))break}this.releaseCursor()}prevUntil(e,t,n=this){if(null===e)return
const r=this.allocateCursor(e,null)
for(;null!==r.prev;){const e=r.prev
if(r.prev=e.prev,t.call(n,e.data,e,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){const e=new cu
for(let t of this)e.appendData(t)
return e}prepend(e){return this.updateCursors(null,e,this.head,e),null!==this.head?(this.head.prev=e,e.next=this.head):this.tail=e,this.head=e,this}prependData(e){return this.prepend(cu.createItem(e))}append(e){return this.insert(e)}appendData(e){return this.insert(cu.createItem(e))}insert(e,t=null){if(null!==t)if(this.updateCursors(t.prev,e,t,e),null===t.prev){if(this.head!==t)throw new Error("before doesn't belong to list")
this.head=e,t.prev=e,e.next=t,this.updateCursors(null,e)}else t.prev.next=e,e.prev=t.prev,t.prev=e,e.next=t
else this.updateCursors(this.tail,e,null,e),null!==this.tail?(this.tail.next=e,e.prev=this.tail):this.head=e,this.tail=e
return this}insertData(e,t){return this.insert(cu.createItem(e),t)}remove(e){if(this.updateCursors(e,e.prev,e,e.next),null!==e.prev)e.prev.next=e.next
else{if(this.head!==e)throw new Error("item doesn't belong to list")
this.head=e.next}if(null!==e.next)e.next.prev=e.prev
else{if(this.tail!==e)throw new Error("item doesn't belong to list")
this.tail=e.prev}return e.prev=null,e.next=null,e}push(e){this.insert(cu.createItem(e))}pop(){return null!==this.tail?this.remove(this.tail):null}unshift(e){this.prepend(cu.createItem(e))}shift(){return null!==this.head?this.remove(this.head):null}prependList(e){return this.insertList(e,this.head)}appendList(e){return this.insertList(e)}insertList(e,t){return null===e.head||(null!=t?(this.updateCursors(t.prev,e.tail,t,e.head),null!==t.prev?(t.prev.next=e.head,e.head.prev=t.prev):this.head=e.head,t.prev=e.tail,e.tail.next=t):(this.updateCursors(this.tail,e.tail,null,e.head),null!==this.tail?(this.tail.next=e.head,e.head.prev=this.tail):this.head=e.head,this.tail=e.tail),e.head=null,e.tail=null),this}replace(e,t){"head"in t?this.insertList(t,e):this.insert(t,e),this.remove(e)}}function uu(e,t){const n=Object.create(SyntaxError.prototype),r=new Error
return Object.assign(n,{name:e,message:t,get stack(){return(r.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}\n`)}})}const hu="    "
function du({source:e,line:t,column:n},r){function o(e,t){return i.slice(e,t).map((t,n)=>String(e+n+1).padStart(l)+" |"+t).join("\n")}const i=e.split(/\r\n?|\n|\f/),a=Math.max(1,t-r)-1,s=Math.min(t+r,i.length+1),l=Math.max(4,String(s).length)+1
let c=0;(n+=3*(i[t-1].substr(0,n-1).match(/\t/g)||[]).length)>100&&(c=n-60+3,n=58)
for(let e=a;e<=s;e++)e>=0&&e<i.length&&(i[e]=i[e].replace(/\t/g,hu),i[e]=(c>0&&i[e].length>c?"…":"")+i[e].substr(c,98)+(i[e].length>c+100-1?"…":""))
return[o(a,t),new Array(n+l+2).join("-")+"^",o(t,s)].filter(Boolean).join("\n")}function pu(e,t,n,r,o){return Object.assign(uu("SyntaxError",e),{source:t,offset:n,line:r,column:o,sourceFragment:e=>du({source:t,line:r,column:o},isNaN(e)?0:e),get formattedMessage(){return`Parse error: ${e}\n`+du({source:t,line:r,column:o},2)}})}function mu(e){const t=this.createList()
let n=!1
const r={recognizer:e}
for(;!this.eof;){switch(this.tokenType){case _c:this.next()
continue
case fc:n=!0,this.next()
continue}let o=e.getNode.call(this,r)
if(void 0===o)break
n&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,o,t,r),n=!1),t.push(o)}return n&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,r),t}const fu=()=>{}
function gu(e){return function(){return this[e]()}}function bu(e){const t=Object.create(null)
for(const n in e){const r=e[n],o=r.parse||r
o&&(t[n]=o)}return t}function yu(e){let t="",n="<unknown>",r=!1,o=fu,i=!1
const a=new nu,s=Object.assign(new au,function(e){const t={context:Object.create(null),scope:Object.assign(Object.create(null),e.scope),atrule:bu(e.atrule),pseudo:bu(e.pseudo),node:bu(e.node)}
for(const n in e.parseContext)switch(typeof e.parseContext[n]){case"function":t.context[n]=e.parseContext[n]
break
case"string":t.context[n]=gu(e.parseContext[n])}return{config:t,...t,...t.node}}(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:mu,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket:e=>123===e?1:0,consumeUntilLeftCurlyBracketOrSemicolon:e=>123===e||59===e?1:0,consumeUntilExclamationMarkOrSemicolon:e=>33===e||59===e?1:0,consumeUntilSemicolonIncluded:e=>59===e?2:0,createList:()=>new cu,createSingleNodeList:e=>(new cu).appendData(e),getFirstListNode:e=>e&&e.first,getLastListNode:e=>e&&e.last,parseWithFallback(e,t){const n=this.tokenIndex
try{return e.call(this)}catch(e){if(i)throw e
const r=t.call(this,n)
return i=!0,o(e,r),i=!1,r}},lookupNonWSType(e){let t
do{if(t=this.lookupType(e++),t!==fc)return t}while(0!==t)
return 0},charCodeAt:e=>e>=0&&e<t.length?t.charCodeAt(e):0,substring:(e,n)=>t.substring(e,n),substrToCursor(e){return this.source.substring(e,this.tokenStart)},cmpChar:(e,n)=>Wc(t,e,n),cmpStr:(e,n,r)=>Vc(t,e,n,r),consume(e){const t=this.tokenStart
return this.eat(e),this.substrToCursor(t)},consumeFunctionName(){const e=t.substring(this.tokenStart,this.tokenEnd-1)
return this.eat(2),e},consumeNumber(e){const n=t.substring(this.tokenStart,Qc(t,this.tokenStart))
return this.eat(e),n},eat(e){if(this.tokenType!==e){const t=Jc[e].slice(0,-6).replace(/-/g," ").replace(/^./,e=>e.toUpperCase())
let n=`${/[[\](){}]/.test(t)?`"${t}"`:t} is expected`,r=this.tokenStart
switch(e){case 1:2===this.tokenType||7===this.tokenType?(r=this.tokenEnd-1,n="Identifier is expected but function found"):n="Identifier is expected"
break
case 4:this.isDelim(35)&&(this.next(),r++,n="Name is expected")
break
case pc:this.tokenType===dc&&(r=this.tokenEnd,n="Percent sign is expected")}this.error(n,r)}this.next()},eatIdent(e){1===this.tokenType&&!1!==this.lookupValue(0,e)||this.error(`Identifier "${e}" is expected`),this.next()},eatDelim(e){this.isDelim(e)||this.error(`Delim "${String.fromCharCode(e)}" is expected`),this.next()},getLocation:(e,t)=>r?a.getLocationRange(e,t,n):null,getLocationFromList(e){if(r){const t=this.getFirstListNode(e),r=this.getLastListNode(e)
return a.getLocationRange(null!==t?t.loc.start.offset-a.startOffset:this.tokenStart,null!==r?r.loc.end.offset-a.startOffset:this.tokenStart,n)}return null},error(e,n){const r=void 0!==n&&n<t.length?a.getLocation(n):this.eof?a.getLocation(function(e,t){for(;t>=0&&Dc(e.charCodeAt(t));t--);return t+1}(t,t.length-1)):a.getLocation(this.tokenStart)
throw new pu(e||"Unexpected input",t,r.offset,r.line,r.column)}})
return Object.assign(function(e,l){t=e,l=l||{},s.setSource(t,su),a.setSource(t,l.offset,l.line,l.column),n=l.filename||"<unknown>",r=Boolean(l.positions),o="function"==typeof l.onParseError?l.onParseError:fu,i=!1,s.parseAtrulePrelude=!("parseAtrulePrelude"in l)||Boolean(l.parseAtrulePrelude),s.parseRulePrelude=!("parseRulePrelude"in l)||Boolean(l.parseRulePrelude),s.parseValue=!("parseValue"in l)||Boolean(l.parseValue),s.parseCustomProperty="parseCustomProperty"in l&&Boolean(l.parseCustomProperty)
const{context:c="default",onComment:u}=l
if(c in s.context==!1)throw new Error("Unknown context `"+c+"`")
"function"==typeof u&&s.forEachToken((e,n,r)=>{if(e===_c){const e=s.getLocation(n,r),o=Vc(t,r-2,r,"*/")?t.slice(n+2,r-2):t.slice(n+2,r)
u(o,e)}})
const h=s.context[c].call(s,l)
return s.eof||s.error(),h},{SyntaxError:pu,config:s.config})}const ku=new Set(["Atrule","Selector","Declaration"])
const vu=(e,t)=>{if(9===e&&(e=t),"string"==typeof e){const t=e.charCodeAt(0)
return t>0x7F?0x8000:t<<8}return e},wu=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,dc],[1,pc],[1,mc],[1,gc],[1,xc],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,dc],[3,pc],[3,mc],[3,gc],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,dc],[4,pc],[4,mc],[4,gc],[mc,1],[mc,2],[mc,7],[mc,8],[mc,"-"],[mc,dc],[mc,pc],[mc,mc],[mc,gc],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",dc],["#",pc],["#",mc],["#",gc],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",dc],["-",pc],["-",mc],["-",gc],[dc,1],[dc,2],[dc,7],[dc,8],[dc,dc],[dc,pc],[dc,mc],[dc,"%"],[dc,gc],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",gc],[".",dc],[".",pc],[".",mc],["+",dc],["+",pc],["+",mc],["/","*"]],xu=wu.concat([[1,4],[mc,4],[4,4],[3,xc],[3,5],[3,bc],[pc,pc],[pc,mc],[pc,2],[pc,"-"],[Sc,1],[Sc,2],[Sc,pc],[Sc,mc],[Sc,4],[Sc,"-"]])
function Su(e){const t=new Set(e.map(([e,t])=>vu(e)<<16|vu(t)))
return function(e,n,r){const o=vu(n,r),i=r.charCodeAt(0)
return(45===i&&1!==n&&2!==n&&n!==gc||43===i?t.has(e<<16|i<<8):t.has(e<<16|o))&&this.emit(" ",fc,!0),o}}const Cu=Su(wu),Au=Su(xu)
var _u=Object.freeze({__proto__:null,safe:Au,spec:Cu})
function zu(e,t){if("function"==typeof t){let n=null
return e.children.forEach(e=>{null!==n&&t.call(this,n),this.node(e),n=e}),void 0}e.children.forEach(this.node,this)}function Tu(e){su(e,(t,n,r)=>{this.token(t,e.slice(n,r))})}function Eu(e){const t=new Map
for(let n in e.node){const r=e.node[n]
"function"==typeof(r.generate||r)&&t.set(n,r.generate||r)}return function(e,n){let r="",o=0,i={node(e){if(!t.has(e.type))throw new Error("Unknown node type: "+e.type)
t.get(e.type).call(a,e)},tokenBefore:Au,token(e,t){o=this.tokenBefore(o,e,t),this.emit(t,e,!1),9===e&&92===t.charCodeAt(0)&&this.emit("\n",fc,!0)},emit(e){r+=e},result:()=>r}
n&&("function"==typeof n.decorator&&(i=n.decorator(i)),n.sourceMap&&(i=function(e){const t=new br,n={line:1,column:0},r={line:0,column:0},o={line:1,column:0},i={generated:o}
let a=1,s=0,l=!1
const c=e.node
e.node=function(e){if(e.loc&&e.loc.start&&ku.has(e.type)){const c=e.loc.start.line,u=e.loc.start.column-1
r.line===c&&r.column===u||(r.line=c,r.column=u,n.line=a,n.column=s,l&&(l=!1,n.line===o.line&&n.column===o.column||t.addMapping(i)),l=!0,t.addMapping({source:e.loc.source,original:r,generated:n}))}c.call(this,e),l&&ku.has(e.type)&&(o.line=a,o.column=s)}
const u=e.emit
e.emit=function(e,t,n){for(let t=0;t<e.length;t++)10===e.charCodeAt(t)?(a++,s=0):s++
u(e,t,n)}
const h=e.result
return e.result=function(){return l&&t.addMapping(i),{css:h(),map:t}},e}(i)),n.mode in _u&&(i.tokenBefore=_u[n.mode]))
const a={node:e=>i.node(e),children:zu,token:(e,t)=>i.token(e,t),tokenize:Tu}
return i.node(e),i.result()}}const{hasOwnProperty:Ou}=Object.prototype,Pu=function(){}
function Lu(e){return"function"==typeof e?e:Pu}function Nu(e,t){return function(n,r,o){n.type===t&&e.call(this,n,r,o)}}function Du(e,t){const n=t.structure,r=[]
for(const e in n){if(!1===Ou.call(n,e))continue
let t=n[e]
const o={name:e,type:!1,nullable:!1}
Array.isArray(t)||(t=[t])
for(const e of t)null===e?o.nullable=!0:"string"==typeof e?o.type="node":Array.isArray(e)&&(o.type="list")
o.type&&r.push(o)}return r.length?{context:t.walkContext,fields:r}:null}function ju(e,t){const n=e.fields.slice(),r=e.context,o="string"==typeof r
return t&&n.reverse(),function(e,i,a,s){let l
o&&(l=i[r],i[r]=e)
for(const r of n){const n=e[r.name]
if(!r.nullable||n)if("list"===r.type){if(t?n.reduceRight(s,!1):n.reduce(s,!1))return!0}else if(a(n))return!0}o&&(i[r]=l)}}function Mu({StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:o}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Rule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Declaration:{StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:o}}}function Iu(e){const t=function(e){const t={}
for(const n in e.node)if(Ou.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=Du(0,r)}return t}(e),n={},r={},o=Symbol("break-walk"),i=Symbol("skip-node")
for(const e in t)Ou.call(t,e)&&null!==t[e]&&(n[e]=ju(t[e],!1),r[e]=ju(t[e],!0))
const a=Mu(n),s=Mu(r),l=function(e,l){function c(e,t,n){const r=u.call(m,e,t,n)
return r===o||r!==i&&(!(!d.hasOwnProperty(e.type)||!d[e.type](e,m,c,p))||h.call(m,e,t,n)===o)}let u=Pu,h=Pu,d=n,p=(e,t,n,r)=>e||c(t,n,r)
const m={break:o,skip:i,root:e,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null}
if("function"==typeof l)u=l
else if(l&&(u=Lu(l.enter),h=Lu(l.leave),l.reverse&&(d=r),l.visit)){if(a.hasOwnProperty(l.visit))d=l.reverse?s[l.visit]:a[l.visit]
else if(!t.hasOwnProperty(l.visit))throw new Error("Bad value `"+l.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")")
u=Nu(u,l.visit),h=Nu(h,l.visit)}if(u===Pu&&h===Pu)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
c(e)}
return l.break=o,l.skip=i,l.find=function(e,t){let n=null
return l(e,function(e,r,i){if(t.call(this,e,r,i))return n=e,o}),n},l.findLast=function(e,t){let n=null
return l(e,{reverse:!0,enter(e,r,i){if(t.call(this,e,r,i))return n=e,o}}),n},l.findAll=function(e,t){const n=[]
return l(e,function(e,r,o){t.call(this,e,r,o)&&n.push(e)}),n},l}function Ru(e){return e}function Fu(e,t,n,r){let o
switch(e.type){case"Group":o=function(e,t,n,r){const o=" "===e.combinator||r?e.combinator:" "+e.combinator+" ",i=e.terms.map(e=>Fu(e,t,n,r)).join(o)
return e.explicit||n?(r||","===i[0]?"[":"[ ")+i+(r?"]":" ]"):i}(e,t,n,r)+(e.disallowEmpty?"!":"")
break
case"Multiplier":return Fu(e.term,t,n,r)+t(function(e){const{min:t,max:n,comma:r}=e
return 0===t&&0===n?r?"#?":"*":0===t&&1===n?"?":1===t&&0===n?r?"#":"+":1===t&&1===n?"":(r?"#":"")+(t===n?"{"+t+"}":"{"+t+","+(0!==n?n:"")+"}")}(e),e)
case"Type":o="<"+e.name+(e.opts?t(function(e){if("Range"===e.type)return" ["+(null===e.min?"-∞":e.min)+","+(null===e.max?"∞":e.max)+"]"
throw new Error("Unknown node type `"+e.type+"`")}(e.opts),e.opts):"")+">"
break
case"Property":o="<'"+e.name+"'>"
break
case"Keyword":o=e.name
break
case"AtKeyword":o="@"+e.name
break
case"Function":o=e.name+"("
break
case"String":case"Token":o=e.value
break
case"Comma":o=","
break
default:throw new Error("Unknown node type `"+e.type+"`")}return t(o,e)}function Bu(e,t){let n=Ru,r=!1,o=!1
return"function"==typeof t?n=t:t&&(r=Boolean(t.forceBraces),o=Boolean(t.compact),"function"==typeof t.decorate&&(n=t.decorate)),Fu(e,n,r,o)}const qu={offset:0,line:1,column:1}
function Gu(e,t){const n=e&&e.loc&&e.loc[t]
return n?"line"in n?Uu(n):n:null}function Uu({offset:e,line:t,column:n},r){const o={offset:e,line:t,column:n}
if(r){const e=r.split(/\n|\r\n?|\f/)
o.offset+=r.length,o.line+=e.length-1,o.column=1===e.length?o.column+r.length:e.pop().length+1}return o}const Wu=function(e,t){const n=uu("SyntaxReferenceError",e+(t?" `"+t+"`":""))
return n.reference=t,n},Vu=function(e,t,n,r){const o=uu("SyntaxMatchError",e),{css:i,mismatchOffset:a,mismatchLength:s,start:l,end:c}=function(e,t){const n=e.tokens,r=e.longestMatch,o=r<n.length&&n[r].node||null,i=o!==t?o:null
let a,s,l=0,c=0,u=0,h=""
for(let e=0;e<n.length;e++){const t=n[e].value
e===r&&(c=t.length,l=h.length),null!==i&&n[e].node===i&&(e<=r?u++:u=0),h+=t}return r===n.length||u>1?(a=Gu(i||t,"end")||Uu(qu,h),s=Uu(a)):(a=Gu(i,"start")||Uu(Gu(t,"start")||qu,h.slice(0,l)),s=Gu(i,"end")||Uu(a,h.substr(l,c))),{css:h,mismatchOffset:l,mismatchLength:c,start:a,end:s}}(r,n)
return o.rawMessage=e,o.syntax=t?Bu(t):"<generic>",o.css=i,o.mismatchOffset=a,o.mismatchLength=s,o.message=e+"\n  syntax: "+o.syntax+"\n   value: "+(i||"<empty string>")+"\n  --------"+new Array(o.mismatchOffset+1).join("-")+"^",Object.assign(o,l),o.loc={source:n&&n.loc&&n.loc.source||"<unknown>",start:l,end:c},o},$u=new Map,Yu=new Map,Xu=function(e){if($u.has(e))return $u.get(e)
const t=e.toLowerCase()
let n=$u.get(t)
if(void 0===n){const e=Qu(t,0),r=e?"":Ku(t,0)
n=Object.freeze({basename:t.substr(r.length),name:t,prefix:r,vendor:r,custom:e})}return $u.set(e,n),n},Hu=function(e){if(Yu.has(e))return Yu.get(e)
let t=e,n=e[0]
"/"===n?n="/"===e[1]?"//":"/":"_"!==n&&"*"!==n&&"$"!==n&&"#"!==n&&"+"!==n&&"&"!==n&&(n="")
const r=Qu(t,n.length)
if(!r&&(t=t.toLowerCase(),Yu.has(t))){const n=Yu.get(t)
return Yu.set(e,n),n}const o=r?"":Ku(t,n.length),i=t.substr(0,n.length+o.length),a=Object.freeze({basename:t.substr(i.length),name:t.substr(n.length),hack:n,vendor:o,prefix:i,custom:r})
return Yu.set(e,a),a}
function Qu(e,t){return t=t||0,e.length-t>=2&&45===e.charCodeAt(t)&&45===e.charCodeAt(t+1)}function Ku(e,t){if(t=t||0,e.length-t>=3&&45===e.charCodeAt(t)&&45!==e.charCodeAt(t+1)){const n=e.indexOf("-",t+2)
if(-1!==n)return e.substring(t,n+1)}return""}const Zu=["initial","inherit","unset","revert","revert-layer"],Ju=0x002D,eh=!0
function th(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function nh(e,t,n){for(;null!==e&&(e.type===fc||e.type===_c);)e=n(++t)
return t}function rh(e,t,n,r){if(!e)return 0
const o=e.value.charCodeAt(t)
if(43===o||o===Ju){if(n)return 0
t++}for(;t<e.value.length;t++)if(!zc(e.value.charCodeAt(t)))return 0
return r+1}function oh(e,t,n){let r=!1,o=nh(e,t,n)
if(null===(e=n(o)))return t
if(e.type!==dc){if(!th(e,43)&&!th(e,Ju))return t
if(r=!0,o=nh(n(++o),o,n),null===(e=n(o))||e.type!==dc)return 0}if(!r){const t=e.value.charCodeAt(0)
if(43!==t&&t!==Ju)return 0}return rh(e,r?0:1,r,o)}function ih(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function ah(e,t,n){let r=0
for(let o=t;o<e.value.length;o++){const i=e.value.charCodeAt(o)
if(45===i&&n&&0!==r)return ah(e,t+r+1,!1),6
if(!Tc(i))return 0
if(++r>6)return 0}return r}function sh(e,t,n){if(!e)return 0
for(;ih(n(t),63);){if(++e>6)return 0
t++}return t}const lh=["calc(","-moz-calc(","-webkit-calc("],ch=new Map([[2,Sc],[xc,Sc],[vc,wc],[Cc,Ac]])
function uh(e,t){return t<e.length?e.charCodeAt(t):0}function hh(e,t){return Vc(e,0,e.length,t)}function dh(e,t){for(let n=0;n<t.length;n++)if(hh(e,t[n]))return!0
return!1}function ph(e,t){return t===e.length-2&&(0x005C===uh(e,t)&&zc(uh(e,t+1)))}function mh(e,t,n){if(e&&"Range"===e.type){const r=Number(void 0!==n&&n!==t.length?t.substr(0,n):t)
if(isNaN(r))return!0
if(null!==e.min&&r<e.min&&"string"!=typeof e.min)return!0
if(null!==e.max&&r>e.max&&"string"!=typeof e.max)return!0}return!1}function fh(e){return function(t,n,r){return null===t?0:2===t.type&&dh(t.value,lh)?function(e,t){let n=0,r=[],o=0
e:do{switch(e.type){case Ac:case Sc:case wc:if(e.type!==n)break e
if(n=r.pop(),0===r.length){o++
break e}break
case 2:case xc:case vc:case Cc:r.push(n),n=ch.get(e.type)}o++}while(e=t(o))
return o}(t,n):e(t,n,r)}}function gh(e){return function(t){return null===t||t.type!==e?0:1}}function bh(e){return e&&(e=new Set(e)),function(t,n,r){if(null===t||t.type!==mc)return 0
const o=Qc(t.value,0)
if(null!==e){const n=t.value.indexOf("\\",o),r=-1!==n&&ph(t.value,n)?t.value.substring(o,n):t.value.substr(o)
if(!1===e.has(r.toLowerCase()))return 0}return mh(r,t.value,o)?0:1}}function yh(e){return"function"!=typeof e&&(e=function(){return 0}),function(t,n,r){return null!==t&&t.type===dc&&0===Number(t.value)?1:e(t,n,r)}}var kh={"ident-token":gh(1),"function-token":gh(2),"at-keyword-token":gh(3),"hash-token":gh(4),"string-token":gh(5),"bad-string-token":gh(6),"url-token":gh(7),"bad-url-token":gh(8),"delim-token":gh(9),"number-token":gh(dc),"percentage-token":gh(pc),"dimension-token":gh(mc),"whitespace-token":gh(fc),"CDO-token":gh(14),"CDC-token":gh(gc),"colon-token":gh(bc),"semicolon-token":gh(yc),"comma-token":gh(kc),"[-token":gh(vc),"]-token":gh(wc),"(-token":gh(xc),")-token":gh(Sc),"{-token":gh(Cc),"}-token":gh(Ac),string:gh(5),ident:gh(1),"custom-ident":function(e){if(null===e||1!==e.type)return 0
const t=e.value.toLowerCase()
return dh(t,Zu)||hh(t,"default")?0:1},"custom-property-name":function(e){return null===e||1!==e.type||0x002D!==uh(e.value,0)||0x002D!==uh(e.value,1)?0:1},"hex-color":function(e){if(null===e||4!==e.type)return 0
const t=e.value.length
if(4!==t&&5!==t&&7!==t&&9!==t)return 0
for(let n=1;n<t;n++)if(!Tc(uh(e.value,n)))return 0
return 1},"id-selector":function(e){return null===e||4!==e.type?0:Mc(uh(e.value,1),uh(e.value,2),uh(e.value,3))?1:0},"an-plus-b":function(e,t){let n=0
if(!e)return 0
if(e.type===dc)return rh(e,0,false,n)
if(1===e.type&&e.value.charCodeAt(0)===Ju){if(!Wc(e.value,1,110))return 0
switch(e.value.length){case 2:return oh(t(++n),n,t)
case 3:return e.value.charCodeAt(2)!==Ju?0:(n=nh(t(++n),n,t),rh(e=t(n),0,eh,n))
default:return e.value.charCodeAt(2)!==Ju?0:rh(e,3,eh,n)}}else if(1===e.type||th(e,43)&&1===t(n+1).type){if(1!==e.type&&(e=t(++n)),null===e||!Wc(e.value,0,110))return 0
switch(e.value.length){case 1:return oh(t(++n),n,t)
case 2:return e.value.charCodeAt(1)!==Ju?0:(n=nh(t(++n),n,t),rh(e=t(n),0,eh,n))
default:return e.value.charCodeAt(1)!==Ju?0:rh(e,2,eh,n)}}else if(e.type===mc){let r=e.value.charCodeAt(0),o=43===r||r===Ju?1:0,i=o
for(;i<e.value.length&&zc(e.value.charCodeAt(i));i++);return i===o?0:Wc(e.value,i,110)?i+1===e.value.length?oh(t(++n),n,t):e.value.charCodeAt(i+1)!==Ju?0:i+2===e.value.length?(n=nh(t(++n),n,t),rh(e=t(n),0,eh,n)):rh(e,i+2,eh,n):0}return 0},urange:function(e,t){let n=0
if(null===e||1!==e.type||!Wc(e.value,0,117))return 0
if(null===(e=t(++n)))return 0
if(ih(e,43))return null===(e=t(++n))?0:1===e.type?sh(ah(e,0,!0),++n,t):ih(e,63)?sh(1,++n,t):0
if(e.type===dc){const r=ah(e,1,!0)
return 0===r?0:null===(e=t(++n))?n:e.type===mc||e.type===dc?function(e,t){return e.value.charCodeAt(0)===t}(e,45)&&ah(e,1,!1)?n+1:0:sh(r,n,t)}return e.type===mc?sh(ah(e,1,!0),++n,t):0},"declaration-value":function(e,t){if(!e)return 0
let n=0,r=[],o=0
e:do{switch(e.type){case 6:case 8:break e
case Ac:case Sc:case wc:if(e.type!==n)break e
n=r.pop()
break
case yc:if(0===n)break e
break
case 9:if(0===n&&"!"===e.value)break e
break
case 2:case xc:case vc:case Cc:r.push(n),n=ch.get(e.type)}o++}while(e=t(o))
return o},"any-value":function(e,t){if(!e)return 0
let n=0,r=[],o=0
e:do{switch(e.type){case 6:case 8:break e
case Ac:case Sc:case wc:if(e.type!==n)break e
n=r.pop()
break
case 2:case xc:case vc:case Cc:r.push(n),n=ch.get(e.type)}o++}while(e=t(o))
return o},dimension:fh(bh(null)),angle:fh(bh(["deg","grad","rad","turn"])),decibel:fh(bh(["db"])),frequency:fh(bh(["hz","khz"])),flex:fh(bh(["fr"])),length:fh(yh(bh(["cm","mm","q","in","pt","pc","px","em","rem","ex","rex","cap","rcap","ch","rch","ic","ric","lh","rlh","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax","cqw","cqh","cqi","cqb","cqmin","cqmax"]))),resolution:fh(bh(["dpi","dpcm","dppx","x"])),semitones:fh(bh(["st"])),time:fh(bh(["s","ms"])),percentage:fh(function(e,t,n){return null===e||e.type!==pc||mh(n,e.value,e.value.length-1)?0:1}),zero:yh(),number:fh(function(e,t,n){if(null===e)return 0
const r=Qc(e.value,0)
return r===e.value.length||ph(e.value,r)?mh(n,e.value,r)?0:1:0}),integer:fh(function(e,t,n){if(null===e||e.type!==dc)return 0
let r=0x002B===uh(e.value,0)||0x002D===uh(e.value,0)?1:0
for(;r<e.value.length;r++)if(!zc(uh(e.value,r)))return 0
return mh(n,e.value,r)?0:1})}
function vh(e,t,n){return Object.assign(uu("SyntaxError",e),{input:t,offset:n,rawMessage:e,message:e+"\n  "+t+"\n--"+new Array((n||t.length)+1).join("-")+"^"})}class wh{constructor(e){this.str=e,this.pos=0}charCodeAt(e){return e<this.str.length?this.str.charCodeAt(e):0}charCode(){return this.charCodeAt(this.pos)}nextCharCode(){return this.charCodeAt(this.pos+1)}nextNonWsCode(e){return this.charCodeAt(this.findWsEnd(e))}findWsEnd(e){for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(13!==t&&10!==t&&12!==t&&32!==t&&9!==t)break}return e}substringToPos(e){return this.str.substring(this.pos,this.pos=e)}eat(e){this.charCode()!==e&&this.error("Expect `"+String.fromCharCode(e)+"`"),this.pos++}peek(){return this.pos<this.str.length?this.str.charAt(this.pos++):""}error(e){throw new vh(e,this.str,this.pos)}}const xh=123,Sh=new Uint8Array(128).map((e,t)=>/[a-zA-Z0-9\-]/.test(String.fromCharCode(t))?1:0),Ch={" ":1,"&&":2,"||":3,"|":4}
function Ah(e){return e.substringToPos(e.findWsEnd(e.pos))}function _h(e){let t=e.pos
for(;t<e.str.length;t++){const n=e.str.charCodeAt(t)
if(n>=128||0===Sh[n])break}return e.pos===t&&e.error("Expect a keyword"),e.substringToPos(t)}function zh(e){let t=e.pos
for(;t<e.str.length;t++){const n=e.str.charCodeAt(t)
if(n<48||n>57)break}return e.pos===t&&e.error("Expect a number"),e.substringToPos(t)}function Th(e){const t=e.str.indexOf("'",e.pos+1)
return-1===t&&(e.pos=e.str.length,e.error("Expect an apostrophe")),e.substringToPos(t+1)}function Eh(e){let t=null,n=null
return e.eat(xh),t=zh(e),44===e.charCode()?(e.pos++,125!==e.charCode()&&(n=zh(e))):n=t,e.eat(125),{min:Number(t),max:n?Number(n):0}}function Oh(e,t){const n=function(e){let t=null,n=!1
switch(e.charCode()){case 42:e.pos++,t={min:0,max:0}
break
case 43:e.pos++,t={min:1,max:0}
break
case 63:e.pos++,t={min:0,max:1}
break
case 35:e.pos++,n=!0,e.charCode()===xh?t=Eh(e):63===e.charCode()?(e.pos++,t={min:0,max:0}):t={min:1,max:0}
break
case xh:t=Eh(e)
break
default:return null}return{type:"Multiplier",comma:n,min:t.min,max:t.max,term:null}}(e)
return null!==n?(n.term=t,35===e.charCode()&&43===e.charCodeAt(e.pos-1)?Oh(e,n):n):t}function Ph(e){const t=e.peek()
return""===t?null:{type:"Token",value:t}}function Lh(e){let t,n=null
return e.eat(60),t=_h(e),40===e.charCode()&&41===e.nextCharCode()&&(e.pos+=2,t+="()"),91===e.charCodeAt(e.findWsEnd(e.pos))&&(Ah(e),n=function(e){let t=null,n=null,r=1
return e.eat(91),45===e.charCode()&&(e.peek(),r=-1),-1==r&&8734===e.charCode()?e.peek():(t=r*Number(zh(e)),0!==Sh[e.charCode()]&&(t+=_h(e))),Ah(e),e.eat(44),Ah(e),8734===e.charCode()?e.peek():(r=1,45===e.charCode()&&(e.peek(),r=-1),n=r*Number(zh(e)),0!==Sh[e.charCode()]&&(n+=_h(e))),e.eat(93),{type:"Range",min:t,max:n}}(e)),e.eat(62),Oh(e,{type:"Type",name:t,opts:n})}function Nh(e,t){function n(e,t){return{type:"Group",terms:e,combinator:t,disallowEmpty:!1,explicit:!1}}let r
for(t=Object.keys(t).sort((e,t)=>Ch[e]-Ch[t]);t.length>0;){r=t.shift()
let o=0,i=0
for(;o<e.length;o++){const t=e[o]
"Combinator"===t.type&&(t.value===r?(-1===i&&(i=o-1),e.splice(o,1),o--):(-1!==i&&o-i>1&&(e.splice(i,o-i,n(e.slice(i,o),r)),o=i+1),i=-1))}-1!==i&&t.length&&e.splice(i,o-i,n(e.slice(i,o),r))}return r}function Dh(e){const t=[],n={}
let r,o=null,i=e.pos
for(;r=jh(e);)"Spaces"!==r.type&&("Combinator"===r.type?(null!==o&&"Combinator"!==o.type||(e.pos=i,e.error("Unexpected combinator")),n[r.value]=!0):null!==o&&"Combinator"!==o.type&&(n[" "]=!0,t.push({type:"Combinator",value:" "})),t.push(r),o=r,i=e.pos)
return null!==o&&"Combinator"===o.type&&(e.pos-=i,e.error("Unexpected combinator")),{type:"Group",terms:t,combinator:Nh(t,n)||" ",disallowEmpty:!1,explicit:!1}}function jh(e){let t=e.charCode()
if(t<128&&1===Sh[t])return function(e){const t=_h(e)
return 40===e.charCode()?(e.pos++,{type:"Function",name:t}):Oh(e,{type:"Keyword",name:t})}(e)
switch(t){case 93:break
case 91:return Oh(e,function(e){let t
return e.eat(91),t=Dh(e),e.eat(93),t.explicit=!0,33===e.charCode()&&(e.pos++,t.disallowEmpty=!0),t}(e))
case 60:return 39===e.nextCharCode()?function(e){let t
return e.eat(60),e.eat(39),t=_h(e),e.eat(39),e.eat(62),Oh(e,{type:"Property",name:t})}(e):Lh(e)
case 124:return{type:"Combinator",value:e.substringToPos(e.pos+(124===e.nextCharCode()?2:1))}
case 38:return e.pos++,e.eat(38),{type:"Combinator",value:"&&"}
case 44:return e.pos++,{type:"Comma"}
case 39:return Oh(e,{type:"String",value:Th(e)})
case 32:case 9:case 10:case 13:case 12:return{type:"Spaces",value:Ah(e)}
case 64:return t=e.nextCharCode(),t<128&&1===Sh[t]?(e.pos++,{type:"AtKeyword",name:_h(e)}):Ph(e)
case 42:case 43:case 63:case 35:case 33:break
case xh:if(t=e.nextCharCode(),t<48||t>57)return Ph(e)
break
default:return Ph(e)}}function Mh(e){const t=new wh(e),n=Dh(t)
return t.pos!==e.length&&t.error("Unexpected input"),1===n.terms.length&&"Group"===n.terms[0].type?n.terms[0]:n}const Ih=function(){}
function Rh(e){return"function"==typeof e?e:Ih}const Fh={decorator(e){const t=[]
let n=null
return{...e,node(t){const r=n
n=t,e.node.call(this,t),n=r},emit(e,r,o){t.push({type:r,value:e,node:o?null:n})},result:()=>t}}}
function Bh(e,t){return"string"==typeof e?function(e){const t=[]
return su(e,(n,r,o)=>t.push({type:n,value:e.slice(r,o),node:null})),t}(e):t.generate(e,Fh)}const qh={type:"Match"},Gh={type:"Mismatch"},Uh={type:"DisallowEmpty"}
function Wh(e,t,n){return t===qh&&n===Gh||e===qh&&t===qh&&n===qh?e:("If"===e.type&&e.else===Gh&&t===qh&&(t=e.then,e=e.match),{type:"If",match:e,then:t,else:n})}function Vh(e){return e.length>2&&40===e.charCodeAt(e.length-2)&&41===e.charCodeAt(e.length-1)}function $h(e){return"Keyword"===e.type||"AtKeyword"===e.type||"Function"===e.type||"Type"===e.type&&Vh(e.name)}function Yh(e,t,n){switch(e){case" ":{let e=qh
for(let n=t.length-1;n>=0;n--){e=Wh(t[n],e,Gh)}return e}case"|":{let e=Gh,n=null
for(let r=t.length-1;r>=0;r--){let o=t[r]
if($h(o)&&(null===n&&r>0&&$h(t[r-1])&&(n=Object.create(null),e=Wh({type:"Enum",map:n},qh,e)),null!==n)){const e=(Vh(o.name)?o.name.slice(0,-1):o.name).toLowerCase()
if(e in n==!1){n[e]=o
continue}}n=null,e=Wh(o,qh,e)}return e}case"&&":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!0}
let n=Gh
for(let r=t.length-1;r>=0;r--){const o=t[r]
let i
i=t.length>1?Yh(e,t.filter(function(e){return e!==o}),!1):qh,n=Wh(o,i,n)}return n}case"||":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!1}
let r=n?qh:Gh
for(let n=t.length-1;n>=0;n--){const o=t[n]
let i
i=t.length>1?Yh(e,t.filter(function(e){return e!==o}),!0):qh,r=Wh(o,i,r)}return r}}}function Xh(e){if("function"==typeof e)return{type:"Generic",fn:e}
switch(e.type){case"Group":{let t=Yh(e.combinator,e.terms.map(Xh),!1)
return e.disallowEmpty&&(t=Wh(t,Uh,Gh)),t}case"Multiplier":return function(e){let t=qh,n=Xh(e.term)
if(0===e.max)n=Wh(n,Uh,Gh),t=Wh(n,null,Gh),t.then=Wh(qh,qh,t),e.comma&&(t.then.else=Wh({type:"Comma",syntax:e},t,Gh))
else for(let r=e.min||1;r<=e.max;r++)e.comma&&t!==qh&&(t=Wh({type:"Comma",syntax:e},t,Gh)),t=Wh(n,Wh(qh,qh,t),Gh)
if(0===e.min)t=Wh(qh,qh,t)
else for(let r=0;r<e.min-1;r++)e.comma&&t!==qh&&(t=Wh({type:"Comma",syntax:e},t,Gh)),t=Wh(n,t,Gh)
return t}(e)
case"Type":case"Property":return{type:e.type,name:e.name,syntax:e}
case"Keyword":return{type:e.type,name:e.name.toLowerCase(),syntax:e}
case"AtKeyword":return{type:e.type,name:"@"+e.name.toLowerCase(),syntax:e}
case"Function":return{type:e.type,name:e.name.toLowerCase()+"(",syntax:e}
case"String":return 3===e.value.length?{type:"Token",value:e.value.charAt(1),syntax:e}:{type:e.type,value:e.value.substr(1,e.value.length-2).replace(/\\'/g,"'"),syntax:e}
case"Token":return{type:e.type,value:e.value,syntax:e}
case"Comma":return{type:e.type,syntax:e}
default:throw new Error("Unknown node type:",e.type)}}function Hh(e,t){return"string"==typeof e&&(e=Mh(e)),{type:"MatchGraph",match:Xh(e),syntax:t||null,source:e}}const{hasOwnProperty:Qh}=Object.prototype,Kh="Match"
function Zh(e,t){if(e.length!==t.length)return!1
for(let n=0;n<e.length;n++){const r=t.charCodeAt(n)
let o=e.charCodeAt(n)
if(o>=0x0041&&o<=0x005A&&(o|=32),o!==r)return!1}return!0}function Jh(e){return null===e||(e.type===kc||2===e.type||e.type===xc||e.type===vc||e.type===Cc||function(e){return 9===e.type&&"?"!==e.value}(e))}function ed(e){return null===e||(e.type===Sc||e.type===wc||e.type===Ac||9===e.type&&"/"===e.value)}function td(e,t,n){const r=function(e,t,n){function r(){do{y++,b=y<e.length?e[y]:null}while(null!==b&&(b.type===fc||b.type===_c))}function o(t){const n=y+t
return n<e.length?e[n]:null}function i(e,t){return{nextState:e,matchStack:v,syntaxStack:h,thenStack:d,tokenIndex:y,prev:t}}function a(e){d={nextState:e,matchStack:v,syntaxStack:h,prev:d}}function s(e){p=i(e,p)}function l(){v={type:1,syntax:t.syntax,token:b,prev:v},r(),m=null,y>k&&(k=y)}function c(){h={syntax:t.syntax,opts:t.syntax.opts||null!==h&&h.opts||null,prev:h},v={type:2,syntax:t.syntax,token:v.token,prev:v}}function u(){v=2===v.type?v.prev:{type:3,syntax:h.syntax,token:v.token,prev:v},h=h.prev}let h=null,d=null,p=null,m=null,f=0,g=null,b=null,y=-1,k=0,v={type:0,syntax:null,token:null,prev:null}
for(r();null===g&&++f<15e3;)switch(t.type){case"Match":if(null===d){if(null!==b&&(y!==e.length-1||"\\0"!==b.value&&"\\9"!==b.value)){t=Gh
break}g=Kh
break}if((t=d.nextState)===Uh){if(d.matchStack===v){t=Gh
break}t=qh}for(;d.syntaxStack!==h;)u()
d=d.prev
break
case"Mismatch":if(null!==m&&!1!==m)(null===p||y>p.tokenIndex)&&(p=m,m=!1)
else if(null===p){g="Mismatch"
break}t=p.nextState,d=p.thenStack,h=p.syntaxStack,v=p.matchStack,y=p.tokenIndex,b=y<e.length?e[y]:null,p=p.prev
break
case"MatchGraph":t=t.match
break
case"If":t.else!==Gh&&s(t.else),t.then!==qh&&a(t.then),t=t.match
break
case"MatchOnce":t={type:"MatchOnceBuffer",syntax:t,index:0,mask:0}
break
case"MatchOnceBuffer":{const e=t.syntax.terms
if(t.index===e.length){if(0===t.mask||t.syntax.all){t=Gh
break}t=qh
break}if(t.mask===(1<<e.length)-1){t=qh
break}for(;t.index<e.length;t.index++){const n=1<<t.index
if(0===(t.mask&n)){s(t),a({type:"AddMatchOnce",syntax:t.syntax,mask:t.mask|n}),t=e[t.index++]
break}}break}case"AddMatchOnce":t={type:"MatchOnceBuffer",syntax:t.syntax,index:0,mask:t.mask}
break
case"Enum":if(null!==b){let e=b.value.toLowerCase()
if(-1!==e.indexOf("\\")&&(e=e.replace(/\\[09].*$/,"")),Qh.call(t.map,e)){t=t.map[e]
break}}t=Gh
break
case"Generic":{const e=null!==h?h.opts:null,n=y+Math.floor(t.fn(b,o,e))
if(!isNaN(n)&&n>y){for(;y<n;)l()
t=qh}else t=Gh
break}case"Type":case"Property":{const e="Type"===t.type?"types":"properties",r=Qh.call(n,e)?n[e][t.name]:null
if(!r||!r.match)throw new Error("Bad syntax reference: "+("Type"===t.type?"<"+t.name+">":"<'"+t.name+"'>"))
if(!1!==m&&null!==b&&"Type"===t.type&&("custom-ident"===t.name&&1===b.type||"length"===t.name&&"0"===b.value)){null===m&&(m=i(t,p)),t=Gh
break}c(),t=r.match
break}case"Keyword":{const e=t.name
if(null!==b){let n=b.value
if(-1!==n.indexOf("\\")&&(n=n.replace(/\\[09].*$/,"")),Zh(n,e)){l(),t=qh
break}}t=Gh
break}case"AtKeyword":case"Function":if(null!==b&&Zh(b.value,t.name)){l(),t=qh
break}t=Gh
break
case"Token":if(null!==b&&b.value===t.value){l(),t=qh
break}t=Gh
break
case"Comma":null!==b&&b.type===kc?Jh(v.token)?t=Gh:(l(),t=ed(b)?Gh:qh):t=Jh(v.token)||ed(b)?qh:Gh
break
case"String":let r="",f=y
for(;f<e.length&&r.length<t.value.length;f++)r+=e[f].value
if(Zh(r,t.value)){for(;y<f;)l()
t=qh}else t=Gh
break
default:throw new Error("Unknown node type: "+t.type)}switch(g){case null:console.warn("[csstree-match] BREAK after 15000 iterations"),g="Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)",v=null
break
case Kh:for(;null!==h;)u()
break
default:v=null}return{tokens:e,reason:g,iterations:f,match:v,longestMatch:k}}(e,t,n||{})
if(null===r.match)return r
let o=r.match,i=r.match={syntax:t.syntax||null,match:[]}
const a=[i]
for(o=function(e){let t=null,n=null,r=e
for(;null!==r;)n=r.prev,r.prev=t,t=r,r=n
return t}(o).prev;null!==o;){switch(o.type){case 2:i.match.push(i={syntax:o.syntax,match:[]}),a.push(i)
break
case 3:a.pop(),i=a[a.length-1]
break
default:i.match.push({syntax:o.syntax||null,token:o.token.value,node:o.token.node})}o=o.prev}return r}function nd(e){function t(e){return null!==e&&("Type"===e.type||"Property"===e.type||"Keyword"===e.type)}let n=null
return null!==this.matched&&!function r(o){if(Array.isArray(o.match)){for(let e=0;e<o.match.length;e++)if(r(o.match[e]))return t(o.syntax)&&n.unshift(o.syntax),!0}else if(o.node===e)return n=t(o.syntax)?[o.syntax]:[],!0
return!1}(this.matched),n}function rd(e,t,n){const r=nd.call(e,t)
return null!==r&&r.some(n)}var od=Object.freeze({__proto__:null,getTrace:nd,isKeyword:function(e){return rd(this,e,e=>"Keyword"===e.type)},isProperty:function(e,t){return rd(this,e,e=>"Property"===e.type&&e.name===t)},isType:function(e,t){return rd(this,e,e=>"Type"===e.type&&e.name===t)}})
function id(e){return"node"in e?e.node:id(e.match[0])}function ad(e){return"node"in e?e.node:ad(e.match[e.match.length-1])}function sd(e,t,n,r,o){const i=[]
return null!==n.matched&&!function n(a){if(null!==a.syntax&&a.syntax.type===r&&a.syntax.name===o){const n=id(a),r=ad(a)
e.syntax.walk(t,function(e,t,o){if(e===n){const e=new cu
do{if(e.appendData(t.data),t.data===r)break
t=t.next}while(null!==t)
i.push({parent:o,nodes:e})}})}Array.isArray(a.match)&&a.match.forEach(n)}(n.matched),i}const{hasOwnProperty:ld}=Object.prototype
function cd(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&e>=0}function ud(e){return Boolean(e)&&cd(e.offset)&&cd(e.line)&&cd(e.column)}function hd(e,t){return function(n,r){if(!n||n.constructor!==Object)return r(n,"Type of node should be an Object")
for(let o in n){let i=!0
if(!1!==ld.call(n,o)){if("type"===o)n.type!==e&&r(n,"Wrong node type `"+n.type+"`, expected `"+e+"`")
else if("loc"===o){if(null===n.loc)continue
if(n.loc&&n.loc.constructor===Object)if("string"!=typeof n.loc.source)o+=".source"
else if(ud(n.loc.start)){if(ud(n.loc.end))continue
o+=".end"}else o+=".start"
i=!1}else if(t.hasOwnProperty(o)){i=!1
for(let e=0;!i&&e<t[o].length;e++){const r=t[o][e]
switch(r){case String:i="string"==typeof n[o]
break
case Boolean:i="boolean"==typeof n[o]
break
case null:i=null===n[o]
break
default:"string"==typeof r?i=n[o]&&n[o].type===r:Array.isArray(r)&&(i=n[o]instanceof cu)}}}else r(n,"Unknown field `"+o+"` for "+e+" node type")
i||r(n,"Bad value for `"+e+"."+o+"`")}}for(const o in t)ld.call(t,o)&&!1===ld.call(n,o)&&r(n,"Field `"+e+"."+o+"` is missed")}}function dd(e,t){const n=t.structure,r={type:String,loc:!0},o={type:'"'+e+'"'}
for(const t in n){if(!1===ld.call(n,t))continue
const i=[],a=r[t]=Array.isArray(n[t])?n[t].slice():[n[t]]
for(let n=0;n<a.length;n++){const r=a[n]
if(r===String||r===Boolean)i.push(r.name)
else if(null===r)i.push("null")
else if("string"==typeof r)i.push("<"+r+">")
else{if(!Array.isArray(r))throw new Error("Wrong value `"+r+"` in `"+e+"."+t+"` structure definition")
i.push("List")}}o[t]=i.join(" | ")}return{docs:o,check:hd(e,r)}}const pd=Hh(Zu.join(" | "))
function md(e,t,n){const r={}
for(const o in e)e[o].syntax&&(r[o]=n?e[o].syntax:Bu(e[o].syntax,{compact:t}))
return r}function fd(e,t,n){const r={}
for(const[o,i]of Object.entries(e))r[o]={prelude:i.prelude&&(n?i.prelude.syntax:Bu(i.prelude.syntax,{compact:t})),descriptors:i.descriptors&&md(i.descriptors,t,n)}
return r}function gd(e,t,n){return{matched:e,iterations:n,error:t,...od}}function bd(e,t,n,r){const o=Bh(n,e.syntax)
let i
return function(e){for(let t=0;t<e.length;t++)if("var("===e[t].value.toLowerCase())return!0
return!1}(o)?gd(null,new Error("Matching for a tree with var() is not supported")):(r&&(i=td(o,e.cssWideKeywordsSyntax,e)),r&&i.match||(i=td(o,t.match,e),i.match)?gd(i.match,null,i.iterations):gd(null,new Vu(i.reason,t.syntax,n,i),i.iterations))}class yd{constructor(e,t,n){if(this.cssWideKeywordsSyntax=pd,this.syntax=t,this.generic=!1,this.atrules=Object.create(null),this.properties=Object.create(null),this.types=Object.create(null),this.structure=n||function(e){const t={}
if(e.node)for(const n in e.node)if(ld.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=dd(n,r)}return t}(e),e){if(e.types)for(const t in e.types)this.addType_(t,e.types[t])
if(e.generic){this.generic=!0
for(const e in kh)this.addType_(e,kh[e])}if(e.atrules)for(const t in e.atrules)this.addAtrule_(t,e.atrules[t])
if(e.properties)for(const t in e.properties)this.addProperty_(t,e.properties[t])}}checkStructure(e){function t(e,t){r.push({node:e,message:t})}const n=this.structure,r=[]
return this.syntax.walk(e,function(e){n.hasOwnProperty(e.type)?n[e.type].check(e,t):t(e,"Unknown node type `"+e.type+"`")}),!!r.length&&r}createDescriptor(e,t,n,r=null){const o={type:t,name:n},i={type:t,name:n,parent:r,serializable:"string"==typeof e||e&&"string"==typeof e.type,syntax:null,match:null}
return"function"==typeof e?i.match=Hh(e,o):("string"==typeof e?Object.defineProperty(i,"syntax",{get:()=>(Object.defineProperty(i,"syntax",{value:Mh(e)}),i.syntax)}):i.syntax=e,Object.defineProperty(i,"match",{get:()=>(Object.defineProperty(i,"match",{value:Hh(i.syntax,o)}),i.match)})),i}addAtrule_(e,t){t&&(this.atrules[e]={type:"Atrule",name:e,prelude:t.prelude?this.createDescriptor(t.prelude,"AtrulePrelude",e):null,descriptors:t.descriptors?Object.keys(t.descriptors).reduce((n,r)=>(n[r]=this.createDescriptor(t.descriptors[r],"AtruleDescriptor",r,e),n),Object.create(null)):null})}addProperty_(e,t){t&&(this.properties[e]=this.createDescriptor(t,"Property",e))}addType_(e,t){t&&(this.types[e]=this.createDescriptor(t,"Type",e))}checkAtruleName(e){if(!this.getAtrule(e))return new Wu("Unknown at-rule","@"+e)}checkAtrulePrelude(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e)
return!r.prelude&&t?new SyntaxError("At-rule `@"+e+"` should not contain a prelude"):!r.prelude||t||bd(this,r.prelude,"",!1).matched?void 0:new SyntaxError("At-rule `@"+e+"` should contain a prelude")}checkAtruleDescriptorName(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e),o=Xu(t)
return r.descriptors?r.descriptors[o.name]||r.descriptors[o.basename]?void 0:new Wu("Unknown at-rule descriptor",t):new SyntaxError("At-rule `@"+e+"` has no known descriptors")}checkPropertyName(e){if(!this.getProperty(e))return new Wu("Unknown property",e)}matchAtrulePrelude(e,t){const n=this.checkAtrulePrelude(e,t)
if(n)return gd(null,n)
const r=this.getAtrule(e)
return r.prelude?bd(this,r.prelude,t||"",!1):gd(null,null)}matchAtruleDescriptor(e,t,n){const r=this.checkAtruleDescriptorName(e,t)
if(r)return gd(null,r)
const o=this.getAtrule(e),i=Xu(t)
return bd(this,o.descriptors[i.name]||o.descriptors[i.basename],n,!1)}matchDeclaration(e){return"Declaration"!==e.type?gd(null,new Error("Not a Declaration node")):this.matchProperty(e.property,e.value)}matchProperty(e,t){if(Hu(e).custom)return gd(null,new Error("Lexer matching doesn't applicable for custom properties"))
const n=this.checkPropertyName(e)
return n?gd(null,n):bd(this,this.getProperty(e),t,!0)}matchType(e,t){const n=this.getType(e)
return n?bd(this,n,t,!1):gd(null,new Wu("Unknown type",e))}match(e,t){return"string"==typeof e||e&&e.type?("string"!=typeof e&&e.match||(e=this.createDescriptor(e,"Type","anonymous")),bd(this,e,t,!1)):gd(null,new Wu("Bad syntax"))}findValueFragments(e,t,n,r){return sd(this,t,this.matchProperty(e,t),n,r)}findDeclarationValueFragments(e,t,n){return sd(this,e.value,this.matchDeclaration(e),t,n)}findAllFragments(e,t,n){const r=[]
return this.syntax.walk(e,{visit:"Declaration",enter:e=>{r.push.apply(r,this.findDeclarationValueFragments(e,t,n))}}),r}getAtrule(e,t=!0){const n=Xu(e)
return(n.vendor&&t?this.atrules[n.name]||this.atrules[n.basename]:this.atrules[n.name])||null}getAtrulePrelude(e,t=!0){const n=this.getAtrule(e,t)
return n&&n.prelude||null}getAtruleDescriptor(e,t){return this.atrules.hasOwnProperty(e)&&this.atrules.declarators&&this.atrules[e].declarators[t]||null}getProperty(e,t=!0){const n=Hu(e)
return(n.vendor&&t?this.properties[n.name]||this.properties[n.basename]:this.properties[n.name])||null}getType(e){return hasOwnProperty.call(this.types,e)?this.types[e]:null}validate(){function e(r,o,i,a){if(i.has(o))return i.get(o)
i.set(o,!1),null!==a.syntax&&function(e,t,n){let r=Ih,o=Ih
if("function"==typeof t?r=t:t&&(r=Rh(t.enter),o=Rh(t.leave)),r===Ih&&o===Ih)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
!function e(t){switch(r.call(n,t),t.type){case"Group":t.terms.forEach(e)
break
case"Multiplier":e(t.term)
break
case"Type":case"Property":case"Keyword":case"AtKeyword":case"Function":case"String":case"Token":case"Comma":break
default:throw new Error("Unknown type: "+t.type)}o.call(n,t)}(e)}(a.syntax,function(a){if("Type"!==a.type&&"Property"!==a.type)return
const s="Type"===a.type?r.types:r.properties,l="Type"===a.type?t:n
hasOwnProperty.call(s,a.name)&&!e(r,a.name,l,s[a.name])||i.set(o,!0)},this)}let t=new Map,n=new Map
for(const n in this.types)e(this,n,t,this.types[n])
for(const t in this.properties)e(this,t,n,this.properties[t])
return t=[...t.keys()].filter(e=>t.get(e)),n=[...n.keys()].filter(e=>n.get(e)),t.length||n.length?{types:t,properties:n}:null}dump(e,t){return{generic:this.generic,types:md(this.types,!t,e),properties:md(this.properties,!t,e),atrules:fd(this.atrules,!t,e)}}toString(){return JSON.stringify(this.dump())}}const{hasOwnProperty:kd}=Object.prototype,vd={generic:!0,types:Cd,atrules:{prelude:Ad,descriptors:Ad},properties:Cd,parseContext:function(e,t){return Object.assign(e,t)},scope:function e(t,n){for(const r in n)kd.call(n,r)&&(wd(t[r])?e(t[r],n[r]):t[r]=xd(n[r]))
return t},atrule:["parse"],pseudo:["parse"],node:["name","structure","parse","generate","walkContext"]}
function wd(e){return e&&e.constructor===Object}function xd(e){return wd(e)?{...e}:e}function Sd(e,t){return"string"==typeof t&&/^\s*\|/.test(t)?"string"==typeof e?e+t:t.replace(/^\s*\|\s*/,""):t||null}function Cd(e,t){if("string"==typeof t)return Sd(e,t)
const n={...e}
for(let r in t)kd.call(t,r)&&(n[r]=Sd(kd.call(e,r)?e[r]:void 0,t[r]))
return n}function Ad(e,t){const n=Cd(e,t)
return!wd(n)||Object.keys(n).length?n:null}function _d(e,t,n){for(const r in n)if(!1!==kd.call(n,r))if(!0===n[r])kd.call(t,r)&&(e[r]=xd(t[r]))
else if(n[r])if("function"==typeof n[r]){const o=n[r]
e[r]=o({},e[r]),e[r]=o(e[r]||{},t[r])}else if(wd(n[r])){const o={}
for(let t in e[r])o[t]=_d({},e[r][t],n[r])
for(let e in t[r])o[e]=_d(o[e]||{},t[r][e],n[r])
e[r]=o}else if(Array.isArray(n[r])){const o={},i=n[r].reduce(function(e,t){return e[t]=!0,e},{})
for(const[t,n]of Object.entries(e[r]||{}))o[t]={},n&&_d(o[t],n,i)
for(const e in t[r])kd.call(t[r],e)&&(o[e]||(o[e]={}),t[r]&&t[r][e]&&_d(o[e],t[r][e],i))
e[r]=o}return e}var zd=(e,t)=>_d(e,t,vd)
function Td(e){const t=yu(e),n=Iu(e),r=Eu(e),{fromPlainObject:o,toPlainObject:i}=function(e){return{fromPlainObject:t=>(e(t,{enter(e){e.children&&e.children instanceof cu==0&&(e.children=(new cu).fromArray(e.children))}}),t),toPlainObject:t=>(e(t,{leave(e){e.children&&e.children instanceof cu&&(e.children=e.children.toArray())}}),t)}}(n),a={lexer:null,createLexer:e=>new yd(e,a,a.lexer.structure),tokenize:su,parse:t,generate:r,walk:n,find:n.find,findLast:n.findLast,findAll:n.findAll,fromPlainObject:o,toPlainObject:i,fork(t){const n=zd({},e)
return Td("function"==typeof t?t(n,Object.assign):zd(n,t))}}
return a.lexer=new yd({generic:!0,types:e.types,atrules:e.atrules,properties:e.properties,node:e.node},a),a}const Ed=0x002B,Od=0x002D,Pd=0x006E,Ld=!0
function Nd(e,t){let n=this.tokenStart+e
const r=this.charCodeAt(n)
for(r!==Ed&&r!==Od||(t&&this.error("Number sign is not allowed"),n++);n<this.tokenEnd;n++)zc(this.charCodeAt(n))||this.error("Integer is expected",n)}function Dd(e){return Nd.call(this,0,e)}function jd(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let n=""
switch(t){case Pd:n="N is expected"
break
case Od:n="HyphenMinus is expected"}this.error(n,this.tokenStart+e)}}function Md(){let e=0,t=0,n=this.tokenType
for(;n===fc||n===_c;)n=this.lookupType(++e)
if(n!==dc){if(!this.isDelim(Ed,e)&&!this.isDelim(Od,e))return null
t=this.isDelim(Ed,e)?Ed:Od
do{n=this.lookupType(++e)}while(n===fc||n===_c)
n!==dc&&(this.skip(e),Dd.call(this,Ld))}return e>0&&this.skip(e),0===t&&(n=this.charCodeAt(this.tokenStart),n!==Ed&&n!==Od&&this.error("Number sign is expected")),Dd.call(this,0!==t),t===Od?"-"+this.consume(dc):this.consume(dc)}const Id={a:[String,null],b:[String,null]}
function Rd(){const e=this.tokenStart
let t=null,n=null
if(this.tokenType===dc)Dd.call(this,false),n=this.consume(dc)
else if(1===this.tokenType&&this.cmpChar(this.tokenStart,Od))switch(t="-1",jd.call(this,1,Pd),this.tokenEnd-this.tokenStart){case 2:this.next(),n=Md.call(this)
break
case 3:jd.call(this,2,Od),this.next(),this.skipSC(),Dd.call(this,Ld),n="-"+this.consume(dc)
break
default:jd.call(this,2,Od),Nd.call(this,3,Ld),this.next(),n=this.substrToCursor(e+2)}else if(1===this.tokenType||this.isDelim(Ed)&&1===this.lookupType(1)){let r=0
switch(t="1",this.isDelim(Ed)&&(r=1,this.next()),jd.call(this,0,Pd),this.tokenEnd-this.tokenStart){case 1:this.next(),n=Md.call(this)
break
case 2:jd.call(this,1,Od),this.next(),this.skipSC(),Dd.call(this,Ld),n="-"+this.consume(dc)
break
default:jd.call(this,1,Od),Nd.call(this,2,Ld),this.next(),n=this.substrToCursor(e+r+1)}}else if(this.tokenType===mc){const r=this.charCodeAt(this.tokenStart),o=r===Ed||r===Od
let i=this.tokenStart+o
for(;i<this.tokenEnd&&zc(this.charCodeAt(i));i++);i===this.tokenStart+o&&this.error("Integer is expected",this.tokenStart+o),jd.call(this,i-this.tokenStart,Pd),t=this.substring(e,i),i+1===this.tokenEnd?(this.next(),n=Md.call(this)):(jd.call(this,i-this.tokenStart+1,Od),i+2===this.tokenEnd?(this.next(),this.skipSC(),Dd.call(this,Ld),n="-"+this.consume(dc)):(Nd.call(this,i-this.tokenStart+2,Ld),this.next(),n=this.substrToCursor(i+1)))}else this.error()
return null!==t&&t.charCodeAt(0)===Ed&&(t=t.substr(1)),null!==n&&n.charCodeAt(0)===Ed&&(n=n.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:n}}var Fd=Object.freeze({__proto__:null,generate:function(e){if(e.a){const t=("+1"===e.a||"1"===e.a?"n":"-1"===e.a&&"-n")||e.a+"n"
if(e.b){const n="-"===e.b[0]||"+"===e.b[0]?e.b:"+"+e.b
this.tokenize(t+n)}else this.tokenize(t)}else this.tokenize(e.b)},name:"AnPlusB",parse:Rd,structure:Id})
function Bd(e){return this.Raw(e,this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function qd(){for(let e,t=1;e=this.lookupType(t);t++){if(e===Ac)return!0
if(e===Cc||3===e)return!1}return!1}const Gd={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]}
function Ud(){const e=this.tokenStart
let t,n,r=null,o=null
switch(this.eat(3),t=this.substrToCursor(e+1),n=t.toLowerCase(),this.skipSC(),!1===this.eof&&this.tokenType!==Cc&&this.tokenType!==yc&&(r=this.parseAtrulePrelude?this.parseWithFallback(this.AtrulePrelude.bind(this,t),Bd):Bd.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case yc:this.next()
break
case Cc:o=hasOwnProperty.call(this.atrule,n)&&"function"==typeof this.atrule[n].block?this.atrule[n].block.call(this):this.Block(qd.call(this))}return{type:"Atrule",loc:this.getLocation(e,this.tokenStart),name:t,prelude:r,block:o}}var Wd=Object.freeze({__proto__:null,generate:function(e){this.token(3,"@"+e.name),null!==e.prelude&&this.node(e.prelude),e.block?this.node(e.block):this.token(yc,";")},name:"Atrule",parse:Ud,structure:Gd,walkContext:"atrule"})
function Vd(e){let t=null
return null!==e&&(e=e.toLowerCase()),this.skipSC(),t=hasOwnProperty.call(this.atrule,e)&&"function"==typeof this.atrule[e].prelude?this.atrule[e].prelude.call(this):this.readSequence(this.scope.AtrulePrelude),this.skipSC(),!0!==this.eof&&this.tokenType!==Cc&&this.tokenType!==yc&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}var $d=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"AtrulePrelude",parse:Vd,structure:{children:[[]]},walkContext:"atrulePrelude"})
function Yd(){this.eof&&this.error("Unexpected end of input")
const e=this.tokenStart
let t=!1
return this.isDelim(42)?(t=!0,this.next()):this.isDelim(124)||this.eat(1),this.isDelim(124)?61!==this.charCodeAt(this.tokenStart+1)?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function Xd(){const e=this.tokenStart,t=this.charCodeAt(e)
return 61!==t&&126!==t&&94!==t&&36!==t&&42!==t&&124!==t&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),61!==t&&(this.isDelim(61)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}const Hd={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]}
function Qd(){const e=this.tokenStart
let t,n=null,r=null,o=null
return this.eat(vc),this.skipSC(),t=Yd.call(this),this.skipSC(),this.tokenType!==wc&&(1!==this.tokenType&&(n=Xd.call(this),this.skipSC(),r=5===this.tokenType?this.String():this.Identifier(),this.skipSC()),1===this.tokenType&&(o=this.consume(1),this.skipSC())),this.eat(wc),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:n,value:r,flags:o}}var Kd=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.node(e.name),null!==e.matcher&&(this.tokenize(e.matcher),this.node(e.value)),null!==e.flags&&this.token(1,e.flags),this.token(9,"]")},name:"AttributeSelector",parse:Qd,structure:Hd})
function Zd(e){return this.Raw(e,null,!0)}function Jd(){return this.parseWithFallback(this.Rule,Zd)}function ep(e){return this.Raw(e,this.consumeUntilSemicolonIncluded,!0)}function tp(){if(this.tokenType===yc)return ep.call(this,this.tokenIndex)
const e=this.parseWithFallback(this.Declaration,ep)
return this.tokenType===yc&&this.next(),e}function np(e){const t=e?tp:Jd,n=this.tokenStart
let r=this.createList()
this.eat(Cc)
e:for(;!this.eof;)switch(this.tokenType){case Ac:break e
case fc:case _c:this.next()
break
case 3:r.push(this.parseWithFallback(this.Atrule,Zd))
break
default:r.push(t.call(this))}return this.eof||this.eat(Ac),{type:"Block",loc:this.getLocation(n,this.tokenStart),children:r}}var rp=Object.freeze({__proto__:null,generate:function(e){this.token(Cc,"{"),this.children(e,e=>{"Declaration"===e.type&&this.token(yc,";")}),this.token(Ac,"}")},name:"Block",parse:np,structure:{children:[["Atrule","Rule","Declaration"]]},walkContext:"block"})
function op(e,t){const n=this.tokenStart
let r=null
return this.eat(vc),r=e.call(this,t),this.eof||this.eat(wc),{type:"Brackets",loc:this.getLocation(n,this.tokenStart),children:r}}var ip=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.children(e),this.token(9,"]")},name:"Brackets",parse:op,structure:{children:[[]]}})
function ap(){const e=this.tokenStart
return this.eat(gc),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}var sp=Object.freeze({__proto__:null,generate:function(){this.token(gc,"--\x3e")},name:"CDC",parse:ap,structure:[]})
function lp(){const e=this.tokenStart
return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}var cp=Object.freeze({__proto__:null,generate:function(){this.token(14,"\x3c!--")},name:"CDO",parse:lp,structure:[]})
const up={name:String}
function hp(){return this.eatDelim(46),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}var dp=Object.freeze({__proto__:null,generate:function(e){this.token(9,"."),this.token(1,e.name)},name:"ClassSelector",parse:hp,structure:up})
const pp={name:String}
function mp(){const e=this.tokenStart
let t
switch(this.tokenType){case fc:t=" "
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 62:case 43:case 126:this.next()
break
case 47:this.next(),this.eatIdent("deep"),this.eatDelim(47)
break
default:this.error("Combinator is expected")}t=this.substrToCursor(e)}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}var fp=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"Combinator",parse:mp,structure:pp})
const gp={value:String}
function bp(){const e=this.tokenStart
let t=this.tokenEnd
return this.eat(_c),t-e+2>=2&&42===this.charCodeAt(t-2)&&47===this.charCodeAt(t-1)&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}var yp=Object.freeze({__proto__:null,generate:function(e){this.token(_c,"/*"+e.value+"*/")},name:"Comment",parse:bp,structure:gp})
function kp(e){return this.Raw(e,this.consumeUntilExclamationMarkOrSemicolon,!0)}function vp(e){return this.Raw(e,this.consumeUntilExclamationMarkOrSemicolon,!1)}function wp(){const e=this.tokenIndex,t=this.Value()
return"Raw"!==t.type&&!1===this.eof&&this.tokenType!==yc&&!1===this.isDelim(33)&&!1===this.isBalanceEdge(e)&&this.error(),t}const xp={important:[Boolean,String],property:String,value:["Value","Raw"]}
function Sp(){const e=this.tokenStart,t=this.tokenIndex,n=Cp.call(this),r=Qu(n),o=r?this.parseCustomProperty:this.parseValue,i=r?vp:kp
let a,s=!1
this.skipSC(),this.eat(bc)
const l=this.tokenIndex
if(r||this.skipSC(),a=o?this.parseWithFallback(wp,i):i.call(this,this.tokenIndex),r&&"Value"===a.type&&a.children.isEmpty)for(let e=l-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===fc){a.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}return this.isDelim(33)&&(s=Ap.call(this),this.skipSC()),!1===this.eof&&this.tokenType!==yc&&!1===this.isBalanceEdge(t)&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:s,property:n,value:a}}function Cp(){const e=this.tokenStart
if(9===this.tokenType)switch(this.charCodeAt(this.tokenStart)){case 42:case 36:case 43:case 35:case 38:this.next()
break
case 47:this.next(),this.isDelim(47)&&this.next()}return 4===this.tokenType?this.eat(4):this.eat(1),this.substrToCursor(e)}function Ap(){this.eat(9),this.skipSC()
const e=this.consume(1)
return"important"===e||e}var _p=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.property),this.token(bc,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,!0===e.important?"important":e.important))},name:"Declaration",parse:Sp,structure:xp,walkContext:"declaration"})
function zp(e){return this.Raw(e,this.consumeUntilSemicolonIncluded,!0)}function Tp(){const e=this.createList()
for(;!this.eof;)switch(this.tokenType){case fc:case _c:case yc:this.next()
break
default:e.push(this.parseWithFallback(this.Declaration,zp))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}var Ep=Object.freeze({__proto__:null,generate:function(e){this.children(e,e=>{"Declaration"===e.type&&this.token(yc,";")})},name:"DeclarationList",parse:Tp,structure:{children:[["Declaration"]]}})
const Op={value:String,unit:String}
function Pp(){const e=this.tokenStart,t=this.consumeNumber(mc)
return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}var Lp=Object.freeze({__proto__:null,generate:function(e){this.token(mc,e.value+e.unit)},name:"Dimension",parse:Pp,structure:Op})
const Np={name:String,children:[[]]}
function Dp(e,t){const n=this.tokenStart,r=this.consumeFunctionName(),o=r.toLowerCase()
let i
return i=t.hasOwnProperty(o)?t[o].call(this,t):e.call(this,t),this.eof||this.eat(Sc),{type:"Function",loc:this.getLocation(n,this.tokenStart),name:r,children:i}}var jp=Object.freeze({__proto__:null,generate:function(e){this.token(2,e.name+"("),this.children(e),this.token(Sc,")")},name:"Function",parse:Dp,structure:Np,walkContext:"function"})
const Mp={value:String}
function Ip(){const e=this.tokenStart
return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}var Rp=Object.freeze({__proto__:null,generate:function(e){this.token(4,"#"+e.value)},name:"Hash",parse:Ip,structure:Mp,xxx:"XXX"})
const Fp={name:String}
function Bp(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}var qp=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.name)},name:"Identifier",parse:Bp,structure:Fp})
const Gp={name:String}
function Up(){const e=this.tokenStart
return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}var Wp=Object.freeze({__proto__:null,generate:function(e){this.token(9,"#"+e.name)},name:"IdSelector",parse:Up,structure:Gp})
const Vp={name:String,value:["Identifier","Number","Dimension","Ratio",null]}
function $p(){const e=this.tokenStart
let t,n=null
if(this.eat(xc),this.skipSC(),t=this.consume(1),this.skipSC(),this.tokenType!==Sc){switch(this.eat(bc),this.skipSC(),this.tokenType){case dc:n=9===this.lookupNonWSType(1)?this.Ratio():this.Number()
break
case mc:n=this.Dimension()
break
case 1:n=this.Identifier()
break
default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eat(Sc),{type:"MediaFeature",loc:this.getLocation(e,this.tokenStart),name:t,value:n}}var Yp=Object.freeze({__proto__:null,generate:function(e){this.token(xc,"("),this.token(1,e.name),null!==e.value&&(this.token(bc,":"),this.node(e.value)),this.token(Sc,")")},name:"MediaFeature",parse:$p,structure:Vp})
function Xp(){const e=this.createList()
let t=null
this.skipSC()
e:for(;!this.eof;){switch(this.tokenType){case _c:case fc:this.next()
continue
case 1:t=this.Identifier()
break
case xc:t=this.MediaFeature()
break
default:break e}e.push(t)}return null===t&&this.error("Identifier or parenthesis is expected"),{type:"MediaQuery",loc:this.getLocationFromList(e),children:e}}var Hp=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"MediaQuery",parse:Xp,structure:{children:[["Identifier","MediaFeature","WhiteSpace"]]}})
function Qp(){const e=this.createList()
for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===kc);)this.next()
return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}var Kp=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(kc,","))},name:"MediaQueryList",parse:Qp,structure:{children:[["MediaQuery"]]}})
function Zp(){this.skipSC()
const e=this.tokenStart
let t,n=e,r=null
return t=this.lookupValue(0,"odd")||this.lookupValue(0,"even")?this.Identifier():this.AnPlusB(),n=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),r=this.SelectorList(),n=this.tokenStart),{type:"Nth",loc:this.getLocation(e,n),nth:t,selector:r}}var Jp=Object.freeze({__proto__:null,generate:function(e){this.node(e.nth),null!==e.selector&&(this.token(1,"of"),this.node(e.selector))},name:"Nth",parse:Zp,structure:{nth:["AnPlusB","Identifier"],selector:["SelectorList",null]}})
const em={value:String}
function tm(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(dc)}}var nm=Object.freeze({__proto__:null,generate:function(e){this.token(dc,e.value)},name:"Number",parse:tm,structure:em})
const rm={value:String}
function om(){const e=this.tokenStart
return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var im=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Operator",parse:om,structure:rm})
function am(e,t){const n=this.tokenStart
let r=null
return this.eat(xc),r=e.call(this,t),this.eof||this.eat(Sc),{type:"Parentheses",loc:this.getLocation(n,this.tokenStart),children:r}}var sm=Object.freeze({__proto__:null,generate:function(e){this.token(xc,"("),this.children(e),this.token(Sc,")")},name:"Parentheses",parse:am,structure:{children:[[]]}})
const lm={value:String}
function cm(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(pc)}}var um=Object.freeze({__proto__:null,generate:function(e){this.token(pc,e.value+"%")},name:"Percentage",parse:cm,structure:lm})
const hm={name:String,children:[["Raw"],null]}
function dm(){const e=this.tokenStart
let t,n,r=null
return this.eat(bc),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(this.tokenIndex,null,!1))),this.eat(Sc)):t=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var pm=Object.freeze({__proto__:null,generate:function(e){this.token(bc,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(Sc,")"))},name:"PseudoClassSelector",parse:dm,structure:hm,walkContext:"function"})
const mm={name:String,children:[["Raw"],null]}
function fm(){const e=this.tokenStart
let t,n,r=null
return this.eat(bc),this.eat(bc),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(this.tokenIndex,null,!1))),this.eat(Sc)):t=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var gm=Object.freeze({__proto__:null,generate:function(e){this.token(bc,":"),this.token(bc,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(Sc,")"))},name:"PseudoElementSelector",parse:fm,structure:mm,walkContext:"function"})
function bm(){this.skipSC()
const e=this.consume(dc)
for(let t=0;t<e.length;t++){const n=e.charCodeAt(t)
zc(n)||46===n||this.error("Unsigned number is expected",this.tokenStart-e.length+t)}return 0===Number(e)&&this.error("Zero number is not allowed",this.tokenStart-e.length),e}const ym={left:String,right:String}
function km(){const e=this.tokenStart,t=bm.call(this)
let n
return this.skipSC(),this.eatDelim(47),n=bm.call(this),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:n}}var vm=Object.freeze({__proto__:null,generate:function(e){this.token(dc,e.left),this.token(9,"/"),this.token(dc,e.right)},name:"Ratio",parse:km,structure:ym})
function wm(){return this.tokenIndex>0&&this.lookupType(-1)===fc?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}const xm={value:String}
function Sm(e,t,n){const r=this.getTokenStart(e)
let o
return this.skipUntilBalanced(e,t||this.consumeUntilBalanceEnd),o=n&&this.tokenStart>r?wm.call(this):this.tokenStart,{type:"Raw",loc:this.getLocation(r,o),value:this.substring(r,o)}}var Cm=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Raw",parse:Sm,structure:xm})
function Am(e){return this.Raw(e,this.consumeUntilLeftCurlyBracket,!0)}function _m(){const e=this.SelectorList()
return"Raw"!==e.type&&!1===this.eof&&this.tokenType!==Cc&&this.error(),e}function zm(){const e=this.tokenIndex,t=this.tokenStart
let n,r
return n=this.parseRulePrelude?this.parseWithFallback(_m,Am):Am.call(this,e),r=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:n,block:r}}var Tm=Object.freeze({__proto__:null,generate:function(e){this.node(e.prelude),this.node(e.block)},name:"Rule",parse:zm,structure:{prelude:["SelectorList","Raw"],block:["Block"]},walkContext:"rule"})
function Em(){const e=this.readSequence(this.scope.Selector)
return null===this.getFirstListNode(e)&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}var Om=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Selector",parse:Em,structure:{children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator","WhiteSpace"]]}})
function Pm(){const e=this.createList()
for(;!this.eof&&(e.push(this.Selector()),this.tokenType===kc);)this.next()
return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}var Lm=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(kc,","))},name:"SelectorList",parse:Pm,structure:{children:[["Selector","Raw"]]},walkContext:"selector"})
function Nm(e){const t=e.length,n=e.charCodeAt(0),r=34===n||39===n?1:0,o=1===r&&t>1&&e.charCodeAt(t-1)===n?t-2:t-1
let i=""
for(let n=r;n<=o;n++){let r=e.charCodeAt(n)
if(92===r){if(n===o){n!==t-1&&(i=e.substr(n+1))
break}if(r=e.charCodeAt(++n),jc(92,r)){const t=n-1,r=Xc(e,t)
n=r-1,i+=Zc(e.substring(t+1,r))}else 0x000d===r&&0x000a===e.charCodeAt(n+1)&&n++}else i+=e[n]}return i}function Dm(e,t){const n=t?"'":'"',r=t?39:34
let o="",i=!1
for(let t=0;t<e.length;t++){const n=e.charCodeAt(t)
0x0000!==n?n<=0x001f||0x007F===n?(o+="\\"+n.toString(16),i=!0):n===r||92===n?(o+="\\"+e.charAt(t),i=!1):(i&&(Tc(n)||Dc(n))&&(o+=" "),o+=e.charAt(t),i=!1):o+="�"}return n+o+n}const jm={value:String}
function Mm(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:Nm(this.consume(5))}}var Im=Object.freeze({__proto__:null,generate:function(e){this.token(5,Dm(e.value))},name:"String",parse:Mm,structure:jm})
function Rm(e){return this.Raw(e,null,!1)}function Fm(){const e=this.tokenStart,t=this.createList()
let n
for(;!this.eof;){switch(this.tokenType){case fc:this.next()
continue
case _c:if(33!==this.charCodeAt(this.tokenStart+2)){this.next()
continue}n=this.Comment()
break
case 14:n=this.CDO()
break
case gc:n=this.CDC()
break
case 3:n=this.parseWithFallback(this.Atrule,Rm)
break
default:n=this.parseWithFallback(this.Rule,Rm)}t.push(n)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}var Bm=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"StyleSheet",parse:Fm,structure:{children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]},walkContext:"stylesheet"})
function qm(){1!==this.tokenType&&!1===this.isDelim(42)&&this.error("Identifier or asterisk is expected"),this.next()}const Gm={name:String}
function Um(){const e=this.tokenStart
return this.isDelim(124)?(this.next(),qm.call(this)):(qm.call(this),this.isDelim(124)&&(this.next(),qm.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}var Wm=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"TypeSelector",parse:Um,structure:Gm})
function Vm(e,t){let n=0
for(let r=this.tokenStart+e;r<this.tokenEnd;r++){const o=this.charCodeAt(r)
if(45===o&&t&&0!==n)return Vm.call(this,e+n+1,!1),-1
Tc(o)||this.error(t&&0!==n?"Hyphen minus"+(n<6?" or hex digit":"")+" is expected":n<6?"Hex digit is expected":"Unexpected input",r),++n>6&&this.error("Too many hex digits",r)}return this.next(),n}function $m(e){let t=0
for(;this.isDelim(63);)++t>e&&this.error("Too many question marks"),this.next()}function Ym(e){this.charCodeAt(this.tokenStart)!==e&&this.error((43===e?"Plus sign":"Hyphen minus")+" is expected")}function Xm(){let e=0
switch(this.tokenType){case dc:if(e=Vm.call(this,1,!0),this.isDelim(63)){$m.call(this,6-e)
break}if(this.tokenType===mc||this.tokenType===dc){Ym.call(this,45),Vm.call(this,1,!1)
break}break
case mc:e=Vm.call(this,1,!0),e>0&&$m.call(this,6-e)
break
default:if(this.eatDelim(43),1===this.tokenType){e=Vm.call(this,0,!0),e>0&&$m.call(this,6-e)
break}if(this.isDelim(63)){this.next(),$m.call(this,5)
break}this.error("Hex digit or question mark is expected")}}const Hm={value:String}
function Qm(){const e=this.tokenStart
return this.eatIdent("u"),Xm.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var Km=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"UnicodeRange",parse:Qm,structure:Hm})
function Zm(e){let t="",n=!1
for(let r=0;r<e.length;r++){const o=e.charCodeAt(r)
0x0000!==o?o<=0x001f||0x007F===o?(t+="\\"+o.toString(16),n=!0):32===o||92===o||34===o||39===o||40===o||41===o?(t+="\\"+e.charAt(r),n=!1):(n&&Tc(o)&&(t+=" "),t+=e.charAt(r),n=!1):t+="�"}return"url("+t+")"}const Jm={value:String}
function ef(){const e=this.tokenStart
let t
switch(this.tokenType){case 7:t=function(e){const t=e.length
let n=4,r=41===e.charCodeAt(t-1)?t-2:t-1,o=""
for(;n<r&&Dc(e.charCodeAt(n));)n++
for(;n<r&&Dc(e.charCodeAt(r));)r--
for(let i=n;i<=r;i++){let n=e.charCodeAt(i)
if(92===n){if(i===r){i!==t-1&&(o=e.substr(i+1))
break}if(n=e.charCodeAt(++i),jc(92,n)){const t=i-1,n=Xc(e,t)
i=n-1,o+=Zc(e.substring(t+1,n))}else 0x000d===n&&0x000a===e.charCodeAt(i+1)&&i++}else o+=e[i]}return o}(this.consume(7))
break
case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=Nm(this.consume(5)),this.skipSC(),this.eof||this.eat(Sc)
break
default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}var tf=Object.freeze({__proto__:null,generate:function(e){this.token(7,Zm(e.value))},name:"Url",parse:ef,structure:Jm})
function nf(){const e=this.tokenStart,t=this.readSequence(this.scope.Value)
return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}var rf=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Value",parse:nf,structure:{children:[[]]}})
const of=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),af={value:String}
function sf(){return this.eat(fc),of}var lf=Object.freeze({__proto__:null,generate:function(e){this.token(fc,e.value)},name:"WhiteSpace",parse:sf,structure:af}),cf=Object.freeze({__proto__:null,AnPlusB:Fd,Atrule:Wd,AtrulePrelude:$d,AttributeSelector:Kd,Block:rp,Brackets:ip,CDC:sp,CDO:cp,ClassSelector:dp,Combinator:fp,Comment:yp,Declaration:_p,DeclarationList:Ep,Dimension:Lp,Function:jp,Hash:Rp,IdSelector:Wp,Identifier:qp,MediaFeature:Yp,MediaQuery:Hp,MediaQueryList:Kp,Nth:Jp,Number:nm,Operator:im,Parentheses:sm,Percentage:um,PseudoClassSelector:pm,PseudoElementSelector:gm,Ratio:vm,Raw:Cm,Rule:Tm,Selector:Om,SelectorList:Lm,String:Im,StyleSheet:Bm,TypeSelector:Wm,UnicodeRange:Km,Url:tf,Value:rf,WhiteSpace:lf}),uf={generic:!0,generic:!0,types:{"absolute-size":"xx-small|x-small|small|medium|large|x-large|xx-large|xxx-large","alpha-value":"<number>|<percentage>","angle-percentage":"<angle>|<percentage>","angular-color-hint":"<angle-percentage>","angular-color-stop":"<color>&&<color-stop-angle>?","angular-color-stop-list":"[<angular-color-stop> [, <angular-color-hint>]?]# , <angular-color-stop>","animateable-feature":"scroll-position|contents|<custom-ident>",attachment:"scroll|fixed|local","attr()":"attr( <attr-name> <type-or-unit>? [, <attr-fallback>]? )","attr-matcher":"['~'|'|'|'^'|'$'|'*']? '='","attr-modifier":"i|s","attribute-selector":"'[' <wq-name> ']'|'[' <wq-name> <attr-matcher> [<string-token>|<ident-token>] <attr-modifier>? ']'","auto-repeat":"repeat( [auto-fill|auto-fit] , [<line-names>? <fixed-size>]+ <line-names>? )","auto-track-list":"[<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>? <auto-repeat> [<line-names>? [<fixed-size>|<fixed-repeat>]]* <line-names>?","baseline-position":"[first|last]? baseline","basic-shape":"<inset()>|<circle()>|<ellipse()>|<polygon()>|<path()>","bg-image":"none|<image>","bg-layer":"<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>","bg-position":"[[left|center|right|top|bottom|<length-percentage>]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]|[center|[left|right] <length-percentage>?]&&[center|[top|bottom] <length-percentage>?]]","bg-size":"[<length-percentage>|auto]{1,2}|cover|contain","blur()":"blur( <length> )","blend-mode":"normal|multiply|screen|overlay|darken|lighten|color-dodge|color-burn|hard-light|soft-light|difference|exclusion|hue|saturation|color|luminosity",box:"border-box|padding-box|content-box","brightness()":"brightness( <number-percentage> )","calc()":"calc( <calc-sum> )","calc-sum":"<calc-product> [['+'|'-'] <calc-product>]*","calc-product":"<calc-value> ['*' <calc-value>|'/' <number>]*","calc-value":"<number>|<dimension>|<percentage>|( <calc-sum> )","cf-final-image":"<image>|<color>","cf-mixing-image":"<percentage>?&&<image>","circle()":"circle( [<shape-radius>]? [at <position>]? )","clamp()":"clamp( <calc-sum>#{3} )","class-selector":"'.' <ident-token>","clip-source":"<url>",color:"<rgb()>|<rgba()>|<hsl()>|<hsla()>|<hwb()>|<lab()>|<lch()>|<hex-color>|<named-color>|currentcolor|<deprecated-system-color>","color-stop":"<color-stop-length>|<color-stop-angle>","color-stop-angle":"<angle-percentage>{1,2}","color-stop-length":"<length-percentage>{1,2}","color-stop-list":"[<linear-color-stop> [, <linear-color-hint>]?]# , <linear-color-stop>",combinator:"'>'|'+'|'~'|['||']","common-lig-values":"[common-ligatures|no-common-ligatures]","compat-auto":"searchfield|textarea|push-button|slider-horizontal|checkbox|radio|square-button|menulist|listbox|meter|progress-bar|button","composite-style":"clear|copy|source-over|source-in|source-out|source-atop|destination-over|destination-in|destination-out|destination-atop|xor","compositing-operator":"add|subtract|intersect|exclude","compound-selector":"[<type-selector>? <subclass-selector>* [<pseudo-element-selector> <pseudo-class-selector>*]*]!","compound-selector-list":"<compound-selector>#","complex-selector":"<compound-selector> [<combinator>? <compound-selector>]*","complex-selector-list":"<complex-selector>#","conic-gradient()":"conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )","contextual-alt-values":"[contextual|no-contextual]","content-distribution":"space-between|space-around|space-evenly|stretch","content-list":"[<string>|contents|<image>|<counter>|<quote>|<target>|<leader()>|<attr()>]+","content-position":"center|start|end|flex-start|flex-end","content-replacement":"<image>","contrast()":"contrast( [<number-percentage>] )",counter:"<counter()>|<counters()>","counter()":"counter( <counter-name> , <counter-style>? )","counter-name":"<custom-ident>","counter-style":"<counter-style-name>|symbols( )","counter-style-name":"<custom-ident>","counters()":"counters( <counter-name> , <string> , <counter-style>? )","cross-fade()":"cross-fade( <cf-mixing-image> , <cf-final-image>? )","cubic-bezier-timing-function":"ease|ease-in|ease-out|ease-in-out|cubic-bezier( <number [0,1]> , <number> , <number [0,1]> , <number> )","deprecated-system-color":"ActiveBorder|ActiveCaption|AppWorkspace|Background|ButtonFace|ButtonHighlight|ButtonShadow|ButtonText|CaptionText|GrayText|Highlight|HighlightText|InactiveBorder|InactiveCaption|InactiveCaptionText|InfoBackground|InfoText|Menu|MenuText|Scrollbar|ThreeDDarkShadow|ThreeDFace|ThreeDHighlight|ThreeDLightShadow|ThreeDShadow|Window|WindowFrame|WindowText","discretionary-lig-values":"[discretionary-ligatures|no-discretionary-ligatures]","display-box":"contents|none","display-inside":"flow|flow-root|table|flex|grid|ruby","display-internal":"table-row-group|table-header-group|table-footer-group|table-row|table-cell|table-column-group|table-column|table-caption|ruby-base|ruby-text|ruby-base-container|ruby-text-container","display-legacy":"inline-block|inline-list-item|inline-table|inline-flex|inline-grid","display-listitem":"<display-outside>?&&[flow|flow-root]?&&list-item","display-outside":"block|inline|run-in","drop-shadow()":"drop-shadow( <length>{2,3} <color>? )","east-asian-variant-values":"[jis78|jis83|jis90|jis04|simplified|traditional]","east-asian-width-values":"[full-width|proportional-width]","element()":"element( <custom-ident> , [first|start|last|first-except]? )|element( <id-selector> )","ellipse()":"ellipse( [<shape-radius>{2}]? [at <position>]? )","ending-shape":"circle|ellipse","env()":"env( <custom-ident> , <declaration-value>? )","explicit-track-list":"[<line-names>? <track-size>]+ <line-names>?","family-name":"<string>|<custom-ident>+","feature-tag-value":"<string> [<integer>|on|off]?","feature-type":"@stylistic|@historical-forms|@styleset|@character-variant|@swash|@ornaments|@annotation","feature-value-block":"<feature-type> '{' <feature-value-declaration-list> '}'","feature-value-block-list":"<feature-value-block>+","feature-value-declaration":"<custom-ident> : <integer>+ ;","feature-value-declaration-list":"<feature-value-declaration>","feature-value-name":"<custom-ident>","fill-rule":"nonzero|evenodd","filter-function":"<blur()>|<brightness()>|<contrast()>|<drop-shadow()>|<grayscale()>|<hue-rotate()>|<invert()>|<opacity()>|<saturate()>|<sepia()>","filter-function-list":"[<filter-function>|<url>]+","final-bg-layer":"<'background-color'>||<bg-image>||<bg-position> [/ <bg-size>]?||<repeat-style>||<attachment>||<box>||<box>","fit-content()":"fit-content( [<length>|<percentage>] )","fixed-breadth":"<length-percentage>","fixed-repeat":"repeat( [<integer [1,∞]>] , [<line-names>? <fixed-size>]+ <line-names>? )","fixed-size":"<fixed-breadth>|minmax( <fixed-breadth> , <track-breadth> )|minmax( <inflexible-breadth> , <fixed-breadth> )","font-stretch-absolute":"normal|ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded|<percentage>","font-variant-css21":"[normal|small-caps]","font-weight-absolute":"normal|bold|<number [1,1000]>","frequency-percentage":"<frequency>|<percentage>","general-enclosed":"[<function-token> <any-value> )]|( <ident> <any-value> )","generic-family":"serif|sans-serif|cursive|fantasy|monospace|-apple-system","generic-name":"serif|sans-serif|cursive|fantasy|monospace","geometry-box":"<shape-box>|fill-box|stroke-box|view-box",gradient:"<linear-gradient()>|<repeating-linear-gradient()>|<radial-gradient()>|<repeating-radial-gradient()>|<conic-gradient()>|<repeating-conic-gradient()>|<-legacy-gradient>","grayscale()":"grayscale( <number-percentage> )","grid-line":"auto|<custom-ident>|[<integer>&&<custom-ident>?]|[span&&[<integer>||<custom-ident>]]","historical-lig-values":"[historical-ligatures|no-historical-ligatures]","hsl()":"hsl( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsl( <hue> , <percentage> , <percentage> , <alpha-value>? )","hsla()":"hsla( <hue> <percentage> <percentage> [/ <alpha-value>]? )|hsla( <hue> , <percentage> , <percentage> , <alpha-value>? )",hue:"<number>|<angle>","hue-rotate()":"hue-rotate( <angle> )","hwb()":"hwb( [<hue>|none] [<percentage>|none] [<percentage>|none] [/ [<alpha-value>|none]]? )",image:"<url>|<image()>|<image-set()>|<element()>|<paint()>|<cross-fade()>|<gradient>","image()":"image( <image-tags>? [<image-src>? , <color>?]! )","image-set()":"image-set( <image-set-option># )","image-set-option":"[<image>|<string>] [<resolution>||type( <string> )]","image-src":"<url>|<string>","image-tags":"ltr|rtl","inflexible-breadth":"<length>|<percentage>|min-content|max-content|auto","inset()":"inset( <length-percentage>{1,4} [round <'border-radius'>]? )","invert()":"invert( <number-percentage> )","keyframes-name":"<custom-ident>|<string>","keyframe-block":"<keyframe-selector># { <declaration-list> }","keyframe-block-list":"<keyframe-block>+","keyframe-selector":"from|to|<percentage>","layer()":"layer( <layer-name> )","layer-name":"<ident> ['.' <ident>]*","leader()":"leader( <leader-type> )","leader-type":"dotted|solid|space|<string>","length-percentage":"<length>|<percentage>","line-names":"'[' <custom-ident>* ']'","line-name-list":"[<line-names>|<name-repeat>]+","line-style":"none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset","line-width":"<length>|thin|medium|thick","linear-color-hint":"<length-percentage>","linear-color-stop":"<color> <color-stop-length>?","linear-gradient()":"linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )","mask-layer":"<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||<geometry-box>||[<geometry-box>|no-clip]||<compositing-operator>||<masking-mode>","mask-position":"[<length-percentage>|left|center|right] [<length-percentage>|top|center|bottom]?","mask-reference":"none|<image>|<mask-source>","mask-source":"<url>","masking-mode":"alpha|luminance|match-source","matrix()":"matrix( <number>#{6} )","matrix3d()":"matrix3d( <number>#{16} )","max()":"max( <calc-sum># )","media-and":"<media-in-parens> [and <media-in-parens>]+","media-condition":"<media-not>|<media-and>|<media-or>|<media-in-parens>","media-condition-without-or":"<media-not>|<media-and>|<media-in-parens>","media-feature":"( [<mf-plain>|<mf-boolean>|<mf-range>] )","media-in-parens":"( <media-condition> )|<media-feature>|<general-enclosed>","media-not":"not <media-in-parens>","media-or":"<media-in-parens> [or <media-in-parens>]+","media-query":"<media-condition>|[not|only]? <media-type> [and <media-condition-without-or>]?","media-query-list":"<media-query>#","media-type":"<ident>","mf-boolean":"<mf-name>","mf-name":"<ident>","mf-plain":"<mf-name> : <mf-value>","mf-range":"<mf-name> ['<'|'>']? '='? <mf-value>|<mf-value> ['<'|'>']? '='? <mf-name>|<mf-value> '<' '='? <mf-name> '<' '='? <mf-value>|<mf-value> '>' '='? <mf-name> '>' '='? <mf-value>","mf-value":"<number>|<dimension>|<ident>|<ratio>","min()":"min( <calc-sum># )","minmax()":"minmax( [<length>|<percentage>|min-content|max-content|auto] , [<length>|<percentage>|<flex>|min-content|max-content|auto] )","name-repeat":"repeat( [<integer [1,∞]>|auto-fill] , <line-names>+ )","named-color":"transparent|aliceblue|antiquewhite|aqua|aquamarine|azure|beige|bisque|black|blanchedalmond|blue|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|cyan|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|fuchsia|gainsboro|ghostwhite|gold|goldenrod|gray|green|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavender|lavenderblush|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|lime|limegreen|linen|magenta|maroon|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|navy|oldlace|olive|olivedrab|orange|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|purple|rebeccapurple|red|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|silver|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|teal|thistle|tomato|turquoise|violet|wheat|white|whitesmoke|yellow|yellowgreen|<-non-standard-color>","namespace-prefix":"<ident>","ns-prefix":"[<ident-token>|'*']? '|'","number-percentage":"<number>|<percentage>","numeric-figure-values":"[lining-nums|oldstyle-nums]","numeric-fraction-values":"[diagonal-fractions|stacked-fractions]","numeric-spacing-values":"[proportional-nums|tabular-nums]",nth:"<an-plus-b>|even|odd","opacity()":"opacity( [<number-percentage>] )","overflow-position":"unsafe|safe","outline-radius":"<length>|<percentage>","page-body":"<declaration>? [; <page-body>]?|<page-margin-box> <page-body>","page-margin-box":"<page-margin-box-type> '{' <declaration-list> '}'","page-margin-box-type":"@top-left-corner|@top-left|@top-center|@top-right|@top-right-corner|@bottom-left-corner|@bottom-left|@bottom-center|@bottom-right|@bottom-right-corner|@left-top|@left-middle|@left-bottom|@right-top|@right-middle|@right-bottom","page-selector-list":"[<page-selector>#]?","page-selector":"<pseudo-page>+|<ident> <pseudo-page>*","page-size":"A5|A4|A3|B5|B4|JIS-B5|JIS-B4|letter|legal|ledger","path()":"path( [<fill-rule> ,]? <string> )","paint()":"paint( <ident> , <declaration-value>? )","perspective()":"perspective( <length> )","polygon()":"polygon( <fill-rule>? , [<length-percentage> <length-percentage>]# )",position:"[[left|center|right]||[top|center|bottom]|[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]?|[[left|right] <length-percentage>]&&[[top|bottom] <length-percentage>]]","pseudo-class-selector":"':' <ident-token>|':' <function-token> <any-value> ')'","pseudo-element-selector":"':' <pseudo-class-selector>","pseudo-page":": [left|right|first|blank]",quote:"open-quote|close-quote|no-open-quote|no-close-quote","radial-gradient()":"radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )","relative-selector":"<combinator>? <complex-selector>","relative-selector-list":"<relative-selector>#","relative-size":"larger|smaller","repeat-style":"repeat-x|repeat-y|[repeat|space|round|no-repeat]{1,2}","repeating-conic-gradient()":"repeating-conic-gradient( [from <angle>]? [at <position>]? , <angular-color-stop-list> )","repeating-linear-gradient()":"repeating-linear-gradient( [<angle>|to <side-or-corner>]? , <color-stop-list> )","repeating-radial-gradient()":"repeating-radial-gradient( [<ending-shape>||<size>]? [at <position>]? , <color-stop-list> )","rgb()":"rgb( <percentage>{3} [/ <alpha-value>]? )|rgb( <number>{3} [/ <alpha-value>]? )|rgb( <percentage>#{3} , <alpha-value>? )|rgb( <number>#{3} , <alpha-value>? )","rgba()":"rgba( <percentage>{3} [/ <alpha-value>]? )|rgba( <number>{3} [/ <alpha-value>]? )|rgba( <percentage>#{3} , <alpha-value>? )|rgba( <number>#{3} , <alpha-value>? )","rotate()":"rotate( [<angle>|<zero>] )","rotate3d()":"rotate3d( <number> , <number> , <number> , [<angle>|<zero>] )","rotateX()":"rotateX( [<angle>|<zero>] )","rotateY()":"rotateY( [<angle>|<zero>] )","rotateZ()":"rotateZ( [<angle>|<zero>] )","saturate()":"saturate( <number-percentage> )","scale()":"scale( <number> , <number>? )","scale3d()":"scale3d( <number> , <number> , <number> )","scaleX()":"scaleX( <number> )","scaleY()":"scaleY( <number> )","scaleZ()":"scaleZ( <number> )","self-position":"center|start|end|self-start|self-end|flex-start|flex-end","shape-radius":"<length-percentage>|closest-side|farthest-side","skew()":"skew( [<angle>|<zero>] , [<angle>|<zero>]? )","skewX()":"skewX( [<angle>|<zero>] )","skewY()":"skewY( [<angle>|<zero>] )","sepia()":"sepia( <number-percentage> )",shadow:"inset?&&<length>{2,4}&&<color>?","shadow-t":"[<length>{2,3}&&<color>?]",shape:"rect( <top> , <right> , <bottom> , <left> )|rect( <top> <right> <bottom> <left> )","shape-box":"<box>|margin-box","side-or-corner":"[left|right]||[top|bottom]","single-animation":"<time>||<easing-function>||<time>||<single-animation-iteration-count>||<single-animation-direction>||<single-animation-fill-mode>||<single-animation-play-state>||[none|<keyframes-name>]","single-animation-direction":"normal|reverse|alternate|alternate-reverse","single-animation-fill-mode":"none|forwards|backwards|both","single-animation-iteration-count":"infinite|<number>","single-animation-play-state":"running|paused","single-animation-timeline":"auto|none|<timeline-name>","single-transition":"[none|<single-transition-property>]||<time>||<easing-function>||<time>","single-transition-property":"all|<custom-ident>",size:"closest-side|farthest-side|closest-corner|farthest-corner|<length>|<length-percentage>{2}","step-position":"jump-start|jump-end|jump-none|jump-both|start|end","step-timing-function":"step-start|step-end|steps( <integer> [, <step-position>]? )","subclass-selector":"<id-selector>|<class-selector>|<attribute-selector>|<pseudo-class-selector>","supports-condition":"not <supports-in-parens>|<supports-in-parens> [and <supports-in-parens>]*|<supports-in-parens> [or <supports-in-parens>]*","supports-in-parens":"( <supports-condition> )|<supports-feature>|<general-enclosed>","supports-feature":"<supports-decl>|<supports-selector-fn>","supports-decl":"( <declaration> )","supports-selector-fn":"selector( <complex-selector> )",symbol:"<string>|<image>|<custom-ident>",target:"<target-counter()>|<target-counters()>|<target-text()>","target-counter()":"target-counter( [<string>|<url>] , <custom-ident> , <counter-style>? )","target-counters()":"target-counters( [<string>|<url>] , <custom-ident> , <string> , <counter-style>? )","target-text()":"target-text( [<string>|<url>] , [content|before|after|first-letter]? )","time-percentage":"<time>|<percentage>","timeline-name":"<custom-ident>|<string>","easing-function":"linear|<cubic-bezier-timing-function>|<step-timing-function>","track-breadth":"<length-percentage>|<flex>|min-content|max-content|auto","track-list":"[<line-names>? [<track-size>|<track-repeat>]]+ <line-names>?","track-repeat":"repeat( [<integer [1,∞]>] , [<line-names>? <track-size>]+ <line-names>? )","track-size":"<track-breadth>|minmax( <inflexible-breadth> , <track-breadth> )|fit-content( [<length>|<percentage>] )","transform-function":"<matrix()>|<translate()>|<translateX()>|<translateY()>|<scale()>|<scaleX()>|<scaleY()>|<rotate()>|<skew()>|<skewX()>|<skewY()>|<matrix3d()>|<translate3d()>|<translateZ()>|<scale3d()>|<scaleZ()>|<rotate3d()>|<rotateX()>|<rotateY()>|<rotateZ()>|<perspective()>","transform-list":"<transform-function>+","translate()":"translate( <length-percentage> , <length-percentage>? )","translate3d()":"translate3d( <length-percentage> , <length-percentage> , <length> )","translateX()":"translateX( <length-percentage> )","translateY()":"translateY( <length-percentage> )","translateZ()":"translateZ( <length> )","type-or-unit":"string|color|url|integer|number|length|angle|time|frequency|cap|ch|em|ex|ic|lh|rlh|rem|vb|vi|vw|vh|vmin|vmax|mm|Q|cm|in|pt|pc|px|deg|grad|rad|turn|ms|s|Hz|kHz|%","type-selector":"<wq-name>|<ns-prefix>? '*'","var()":"var( <custom-property-name> , <declaration-value>? )","viewport-length":"auto|<length-percentage>","visual-box":"content-box|padding-box|border-box","wq-name":"<ns-prefix>? <ident-token>","-legacy-gradient":"<-webkit-gradient()>|<-legacy-linear-gradient>|<-legacy-repeating-linear-gradient>|<-legacy-radial-gradient>|<-legacy-repeating-radial-gradient>","-legacy-linear-gradient":"-moz-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-linear-gradient( <-legacy-linear-gradient-arguments> )","-legacy-repeating-linear-gradient":"-moz-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-webkit-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )|-o-repeating-linear-gradient( <-legacy-linear-gradient-arguments> )","-legacy-linear-gradient-arguments":"[<angle>|<side-or-corner>]? , <color-stop-list>","-legacy-radial-gradient":"-moz-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-radial-gradient( <-legacy-radial-gradient-arguments> )","-legacy-repeating-radial-gradient":"-moz-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-webkit-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )|-o-repeating-radial-gradient( <-legacy-radial-gradient-arguments> )","-legacy-radial-gradient-arguments":"[<position> ,]? [[[<-legacy-radial-gradient-shape>||<-legacy-radial-gradient-size>]|[<length>|<percentage>]{2}] ,]? <color-stop-list>","-legacy-radial-gradient-size":"closest-side|closest-corner|farthest-side|farthest-corner|contain|cover","-legacy-radial-gradient-shape":"circle|ellipse","-non-standard-font":"-apple-system-body|-apple-system-headline|-apple-system-subheadline|-apple-system-caption1|-apple-system-caption2|-apple-system-footnote|-apple-system-short-body|-apple-system-short-headline|-apple-system-short-subheadline|-apple-system-short-caption1|-apple-system-short-footnote|-apple-system-tall-body","-non-standard-color":"-moz-ButtonDefault|-moz-ButtonHoverFace|-moz-ButtonHoverText|-moz-CellHighlight|-moz-CellHighlightText|-moz-Combobox|-moz-ComboboxText|-moz-Dialog|-moz-DialogText|-moz-dragtargetzone|-moz-EvenTreeRow|-moz-Field|-moz-FieldText|-moz-html-CellHighlight|-moz-html-CellHighlightText|-moz-mac-accentdarkestshadow|-moz-mac-accentdarkshadow|-moz-mac-accentface|-moz-mac-accentlightesthighlight|-moz-mac-accentlightshadow|-moz-mac-accentregularhighlight|-moz-mac-accentregularshadow|-moz-mac-chrome-active|-moz-mac-chrome-inactive|-moz-mac-focusring|-moz-mac-menuselect|-moz-mac-menushadow|-moz-mac-menutextselect|-moz-MenuHover|-moz-MenuHoverText|-moz-MenuBarText|-moz-MenuBarHoverText|-moz-nativehyperlinktext|-moz-OddTreeRow|-moz-win-communicationstext|-moz-win-mediatext|-moz-activehyperlinktext|-moz-default-background-color|-moz-default-color|-moz-hyperlinktext|-moz-visitedhyperlinktext|-webkit-activelink|-webkit-focus-ring-color|-webkit-link|-webkit-text","-non-standard-image-rendering":"optimize-contrast|-moz-crisp-edges|-o-crisp-edges|-webkit-optimize-contrast","-non-standard-overflow":"-moz-scrollbars-none|-moz-scrollbars-horizontal|-moz-scrollbars-vertical|-moz-hidden-unscrollable","-non-standard-width":"fill-available|min-intrinsic|intrinsic|-moz-available|-moz-fit-content|-moz-min-content|-moz-max-content|-webkit-min-content|-webkit-max-content","-webkit-gradient()":"-webkit-gradient( <-webkit-gradient-type> , <-webkit-gradient-point> [, <-webkit-gradient-point>|, <-webkit-gradient-radius> , <-webkit-gradient-point>] [, <-webkit-gradient-radius>]? [, <-webkit-gradient-color-stop>]* )","-webkit-gradient-color-stop":"from( <color> )|color-stop( [<number-zero-one>|<percentage>] , <color> )|to( <color> )","-webkit-gradient-point":"[left|center|right|<length-percentage>] [top|center|bottom|<length-percentage>]","-webkit-gradient-radius":"<length>|<percentage>","-webkit-gradient-type":"linear|radial","-webkit-mask-box-repeat":"repeat|stretch|round","-webkit-mask-clip-style":"border|border-box|padding|padding-box|content|content-box|text","-ms-filter-function-list":"<-ms-filter-function>+","-ms-filter-function":"<-ms-filter-function-progid>|<-ms-filter-function-legacy>","-ms-filter-function-progid":"'progid:' [<ident-token> '.']* [<ident-token>|<function-token> <any-value>? )]","-ms-filter-function-legacy":"<ident-token>|<function-token> <any-value>? )","-ms-filter":"<string>",age:"child|young|old","attr-name":"<wq-name>","attr-fallback":"<any-value>","bg-clip":"<box>|border|text","border-radius":"<length-percentage>{1,2}",bottom:"<length>|auto","generic-voice":"[<age>? <gender> <integer>?]",gender:"male|female|neutral","lab()":"lab( [<percentage>|<number>|none] [<percentage>|<number>|none] [<percentage>|<number>|none] [/ [<alpha-value>|none]]? )","lch()":"lch( [<percentage>|<number>|none] [<percentage>|<number>|none] [<hue>|none] [/ [<alpha-value>|none]]? )",left:"<length>|auto","mask-image":"<mask-reference>#",paint:"none|<color>|<url> [none|<color>]?|context-fill|context-stroke",ratio:"<number [0,∞]> [/ <number [0,∞]>]?","reversed-counter-name":"reversed( <counter-name> )",right:"<length>|auto","svg-length":"<percentage>|<length>|<number>","svg-writing-mode":"lr-tb|rl-tb|tb-rl|lr|rl|tb",top:"<length>|auto","track-group":"'(' [<string>* <track-minmax> <string>*]+ ')' ['[' <positive-integer> ']']?|<track-minmax>","track-list-v0":"[<string>* <track-group> <string>*]+|none","track-minmax":"minmax( <track-breadth> , <track-breadth> )|auto|<track-breadth>|fit-content",x:"<number>",y:"<number>",declaration:"<ident-token> : <declaration-value>? ['!' important]?","declaration-list":"[<declaration>? ';']* <declaration>?",url:"url( <string> <url-modifier>* )|<url-token>","url-modifier":"<ident>|<function-token> <any-value> )","number-zero-one":"<number [0,1]>","number-one-or-greater":"<number [1,∞]>","positive-integer":"<integer [0,∞]>","-non-standard-display":"-ms-inline-flexbox|-ms-grid|-ms-inline-grid|-webkit-flex|-webkit-inline-flex|-webkit-box|-webkit-inline-box|-moz-inline-stack|-moz-box|-moz-inline-box"},properties:{"--*":"<declaration-value>","-ms-accelerator":"false|true","-ms-block-progression":"tb|rl|bt|lr","-ms-content-zoom-chaining":"none|chained","-ms-content-zooming":"none|zoom","-ms-content-zoom-limit":"<'-ms-content-zoom-limit-min'> <'-ms-content-zoom-limit-max'>","-ms-content-zoom-limit-max":"<percentage>","-ms-content-zoom-limit-min":"<percentage>","-ms-content-zoom-snap":"<'-ms-content-zoom-snap-type'>||<'-ms-content-zoom-snap-points'>","-ms-content-zoom-snap-points":"snapInterval( <percentage> , <percentage> )|snapList( <percentage># )","-ms-content-zoom-snap-type":"none|proximity|mandatory","-ms-filter":"<string>","-ms-flow-from":"[none|<custom-ident>]#","-ms-flow-into":"[none|<custom-ident>]#","-ms-grid-columns":"none|<track-list>|<auto-track-list>","-ms-grid-rows":"none|<track-list>|<auto-track-list>","-ms-high-contrast-adjust":"auto|none","-ms-hyphenate-limit-chars":"auto|<integer>{1,3}","-ms-hyphenate-limit-lines":"no-limit|<integer>","-ms-hyphenate-limit-zone":"<percentage>|<length>","-ms-ime-align":"auto|after","-ms-overflow-style":"auto|none|scrollbar|-ms-autohiding-scrollbar","-ms-scrollbar-3dlight-color":"<color>","-ms-scrollbar-arrow-color":"<color>","-ms-scrollbar-base-color":"<color>","-ms-scrollbar-darkshadow-color":"<color>","-ms-scrollbar-face-color":"<color>","-ms-scrollbar-highlight-color":"<color>","-ms-scrollbar-shadow-color":"<color>","-ms-scrollbar-track-color":"<color>","-ms-scroll-chaining":"chained|none","-ms-scroll-limit":"<'-ms-scroll-limit-x-min'> <'-ms-scroll-limit-y-min'> <'-ms-scroll-limit-x-max'> <'-ms-scroll-limit-y-max'>","-ms-scroll-limit-x-max":"auto|<length>","-ms-scroll-limit-x-min":"<length>","-ms-scroll-limit-y-max":"auto|<length>","-ms-scroll-limit-y-min":"<length>","-ms-scroll-rails":"none|railed","-ms-scroll-snap-points-x":"snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )","-ms-scroll-snap-points-y":"snapInterval( <length-percentage> , <length-percentage> )|snapList( <length-percentage># )","-ms-scroll-snap-type":"none|proximity|mandatory","-ms-scroll-snap-x":"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-x'>","-ms-scroll-snap-y":"<'-ms-scroll-snap-type'> <'-ms-scroll-snap-points-y'>","-ms-scroll-translation":"none|vertical-to-horizontal","-ms-text-autospace":"none|ideograph-alpha|ideograph-numeric|ideograph-parenthesis|ideograph-space","-ms-touch-select":"grippers|none","-ms-user-select":"none|element|text","-ms-wrap-flow":"auto|both|start|end|maximum|clear","-ms-wrap-margin":"<length>","-ms-wrap-through":"wrap|none","-moz-appearance":"none|button|button-arrow-down|button-arrow-next|button-arrow-previous|button-arrow-up|button-bevel|button-focus|caret|checkbox|checkbox-container|checkbox-label|checkmenuitem|dualbutton|groupbox|listbox|listitem|menuarrow|menubar|menucheckbox|menuimage|menuitem|menuitemtext|menulist|menulist-button|menulist-text|menulist-textfield|menupopup|menuradio|menuseparator|meterbar|meterchunk|progressbar|progressbar-vertical|progresschunk|progresschunk-vertical|radio|radio-container|radio-label|radiomenuitem|range|range-thumb|resizer|resizerpanel|scale-horizontal|scalethumbend|scalethumb-horizontal|scalethumbstart|scalethumbtick|scalethumb-vertical|scale-vertical|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|separator|sheet|spinner|spinner-downbutton|spinner-textfield|spinner-upbutton|splitter|statusbar|statusbarpanel|tab|tabpanel|tabpanels|tab-scroll-arrow-back|tab-scroll-arrow-forward|textfield|textfield-multiline|toolbar|toolbarbutton|toolbarbutton-dropdown|toolbargripper|toolbox|tooltip|treeheader|treeheadercell|treeheadersortarrow|treeitem|treeline|treetwisty|treetwistyopen|treeview|-moz-mac-unified-toolbar|-moz-win-borderless-glass|-moz-win-browsertabbar-toolbox|-moz-win-communicationstext|-moz-win-communications-toolbox|-moz-win-exclude-glass|-moz-win-glass|-moz-win-mediatext|-moz-win-media-toolbox|-moz-window-button-box|-moz-window-button-box-maximized|-moz-window-button-close|-moz-window-button-maximize|-moz-window-button-minimize|-moz-window-button-restore|-moz-window-frame-bottom|-moz-window-frame-left|-moz-window-frame-right|-moz-window-titlebar|-moz-window-titlebar-maximized","-moz-binding":"<url>|none","-moz-border-bottom-colors":"<color>+|none","-moz-border-left-colors":"<color>+|none","-moz-border-right-colors":"<color>+|none","-moz-border-top-colors":"<color>+|none","-moz-context-properties":"none|[fill|fill-opacity|stroke|stroke-opacity]#","-moz-float-edge":"border-box|content-box|margin-box|padding-box","-moz-force-broken-image-icon":"0|1","-moz-image-region":"<shape>|auto","-moz-orient":"inline|block|horizontal|vertical","-moz-outline-radius":"<outline-radius>{1,4} [/ <outline-radius>{1,4}]?","-moz-outline-radius-bottomleft":"<outline-radius>","-moz-outline-radius-bottomright":"<outline-radius>","-moz-outline-radius-topleft":"<outline-radius>","-moz-outline-radius-topright":"<outline-radius>","-moz-stack-sizing":"ignore|stretch-to-fit","-moz-text-blink":"none|blink","-moz-user-focus":"ignore|normal|select-after|select-before|select-menu|select-same|select-all|none","-moz-user-input":"auto|none|enabled|disabled","-moz-user-modify":"read-only|read-write|write-only","-moz-window-dragging":"drag|no-drag","-moz-window-shadow":"default|menu|tooltip|sheet|none","-webkit-appearance":"none|button|button-bevel|caps-lock-indicator|caret|checkbox|default-button|inner-spin-button|listbox|listitem|media-controls-background|media-controls-fullscreen-background|media-current-time-display|media-enter-fullscreen-button|media-exit-fullscreen-button|media-fullscreen-button|media-mute-button|media-overlay-play-button|media-play-button|media-seek-back-button|media-seek-forward-button|media-slider|media-sliderthumb|media-time-remaining-display|media-toggle-closed-captions-button|media-volume-slider|media-volume-slider-container|media-volume-sliderthumb|menulist|menulist-button|menulist-text|menulist-textfield|meter|progress-bar|progress-bar-value|push-button|radio|scrollbarbutton-down|scrollbarbutton-left|scrollbarbutton-right|scrollbarbutton-up|scrollbargripper-horizontal|scrollbargripper-vertical|scrollbarthumb-horizontal|scrollbarthumb-vertical|scrollbartrack-horizontal|scrollbartrack-vertical|searchfield|searchfield-cancel-button|searchfield-decoration|searchfield-results-button|searchfield-results-decoration|slider-horizontal|slider-vertical|sliderthumb-horizontal|sliderthumb-vertical|square-button|textarea|textfield|-apple-pay-button","-webkit-border-before":"<'border-width'>||<'border-style'>||<color>","-webkit-border-before-color":"<color>","-webkit-border-before-style":"<'border-style'>","-webkit-border-before-width":"<'border-width'>","-webkit-box-reflect":"[above|below|right|left]? <length>? <image>?","-webkit-line-clamp":"none|<integer>","-webkit-mask":"[<mask-reference>||<position> [/ <bg-size>]?||<repeat-style>||[<box>|border|padding|content|text]||[<box>|border|padding|content]]#","-webkit-mask-attachment":"<attachment>#","-webkit-mask-clip":"[<box>|border|padding|content|text]#","-webkit-mask-composite":"<composite-style>#","-webkit-mask-image":"<mask-reference>#","-webkit-mask-origin":"[<box>|border|padding|content]#","-webkit-mask-position":"<position>#","-webkit-mask-position-x":"[<length-percentage>|left|center|right]#","-webkit-mask-position-y":"[<length-percentage>|top|center|bottom]#","-webkit-mask-repeat":"<repeat-style>#","-webkit-mask-repeat-x":"repeat|no-repeat|space|round","-webkit-mask-repeat-y":"repeat|no-repeat|space|round","-webkit-mask-size":"<bg-size>#","-webkit-overflow-scrolling":"auto|touch","-webkit-tap-highlight-color":"<color>","-webkit-text-fill-color":"<color>","-webkit-text-stroke":"<length>||<color>","-webkit-text-stroke-color":"<color>","-webkit-text-stroke-width":"<length>","-webkit-touch-callout":"default|none","-webkit-user-modify":"read-only|read-write|read-write-plaintext-only","accent-color":"auto|<color>","align-content":"normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>","align-items":"normal|stretch|<baseline-position>|[<overflow-position>? <self-position>]","align-self":"auto|normal|stretch|<baseline-position>|<overflow-position>? <self-position>","align-tracks":"[normal|<baseline-position>|<content-distribution>|<overflow-position>? <content-position>]#",all:"initial|inherit|unset|revert|revert-layer",animation:"<single-animation>#","animation-delay":"<time>#","animation-direction":"<single-animation-direction>#","animation-duration":"<time>#","animation-fill-mode":"<single-animation-fill-mode>#","animation-iteration-count":"<single-animation-iteration-count>#","animation-name":"[none|<keyframes-name>]#","animation-play-state":"<single-animation-play-state>#","animation-timing-function":"<easing-function>#","animation-timeline":"<single-animation-timeline>#",appearance:"none|auto|textfield|menulist-button|<compat-auto>","aspect-ratio":"auto|<ratio>",azimuth:"<angle>|[[left-side|far-left|left|center-left|center|center-right|right|far-right|right-side]||behind]|leftwards|rightwards","backdrop-filter":"none|<filter-function-list>","backface-visibility":"visible|hidden",background:"[<bg-layer> ,]* <final-bg-layer>","background-attachment":"<attachment>#","background-blend-mode":"<blend-mode>#","background-clip":"<bg-clip>#","background-color":"<color>","background-image":"<bg-image>#","background-origin":"<box>#","background-position":"<bg-position>#","background-position-x":"[center|[[left|right|x-start|x-end]? <length-percentage>?]!]#","background-position-y":"[center|[[top|bottom|y-start|y-end]? <length-percentage>?]!]#","background-repeat":"<repeat-style>#","background-size":"<bg-size>#","block-overflow":"clip|ellipsis|<string>","block-size":"<'width'>",border:"<line-width>||<line-style>||<color>","border-block":"<'border-top-width'>||<'border-top-style'>||<color>","border-block-color":"<'border-top-color'>{1,2}","border-block-style":"<'border-top-style'>","border-block-width":"<'border-top-width'>","border-block-end":"<'border-top-width'>||<'border-top-style'>||<color>","border-block-end-color":"<'border-top-color'>","border-block-end-style":"<'border-top-style'>","border-block-end-width":"<'border-top-width'>","border-block-start":"<'border-top-width'>||<'border-top-style'>||<color>","border-block-start-color":"<'border-top-color'>","border-block-start-style":"<'border-top-style'>","border-block-start-width":"<'border-top-width'>","border-bottom":"<line-width>||<line-style>||<color>","border-bottom-color":"<'border-top-color'>","border-bottom-left-radius":"<length-percentage>{1,2}","border-bottom-right-radius":"<length-percentage>{1,2}","border-bottom-style":"<line-style>","border-bottom-width":"<line-width>","border-collapse":"collapse|separate","border-color":"<color>{1,4}","border-end-end-radius":"<length-percentage>{1,2}","border-end-start-radius":"<length-percentage>{1,2}","border-image":"<'border-image-source'>||<'border-image-slice'> [/ <'border-image-width'>|/ <'border-image-width'>? / <'border-image-outset'>]?||<'border-image-repeat'>","border-image-outset":"[<length>|<number>]{1,4}","border-image-repeat":"[stretch|repeat|round|space]{1,2}","border-image-slice":"<number-percentage>{1,4}&&fill?","border-image-source":"none|<image>","border-image-width":"[<length-percentage>|<number>|auto]{1,4}","border-inline":"<'border-top-width'>||<'border-top-style'>||<color>","border-inline-end":"<'border-top-width'>||<'border-top-style'>||<color>","border-inline-color":"<'border-top-color'>{1,2}","border-inline-style":"<'border-top-style'>","border-inline-width":"<'border-top-width'>","border-inline-end-color":"<'border-top-color'>","border-inline-end-style":"<'border-top-style'>","border-inline-end-width":"<'border-top-width'>","border-inline-start":"<'border-top-width'>||<'border-top-style'>||<color>","border-inline-start-color":"<'border-top-color'>","border-inline-start-style":"<'border-top-style'>","border-inline-start-width":"<'border-top-width'>","border-left":"<line-width>||<line-style>||<color>","border-left-color":"<color>","border-left-style":"<line-style>","border-left-width":"<line-width>","border-radius":"<length-percentage>{1,4} [/ <length-percentage>{1,4}]?","border-right":"<line-width>||<line-style>||<color>","border-right-color":"<color>","border-right-style":"<line-style>","border-right-width":"<line-width>","border-spacing":"<length> <length>?","border-start-end-radius":"<length-percentage>{1,2}","border-start-start-radius":"<length-percentage>{1,2}","border-style":"<line-style>{1,4}","border-top":"<line-width>||<line-style>||<color>","border-top-color":"<color>","border-top-left-radius":"<length-percentage>{1,2}","border-top-right-radius":"<length-percentage>{1,2}","border-top-style":"<line-style>","border-top-width":"<line-width>","border-width":"<line-width>{1,4}",bottom:"<length>|<percentage>|auto","box-align":"start|center|end|baseline|stretch","box-decoration-break":"slice|clone","box-direction":"normal|reverse|inherit","box-flex":"<number>","box-flex-group":"<integer>","box-lines":"single|multiple","box-ordinal-group":"<integer>","box-orient":"horizontal|vertical|inline-axis|block-axis|inherit","box-pack":"start|center|end|justify","box-shadow":"none|<shadow>#","box-sizing":"content-box|border-box","break-after":"auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region","break-before":"auto|avoid|always|all|avoid-page|page|left|right|recto|verso|avoid-column|column|avoid-region|region","break-inside":"auto|avoid|avoid-page|avoid-column|avoid-region","caption-side":"top|bottom|block-start|block-end|inline-start|inline-end","caret-color":"auto|<color>",clear:"none|left|right|both|inline-start|inline-end",clip:"<shape>|auto","clip-path":"<clip-source>|[<basic-shape>||<geometry-box>]|none",color:"<color>","print-color-adjust":"economy|exact","color-scheme":"normal|[light|dark|<custom-ident>]+&&only?","column-count":"<integer>|auto","column-fill":"auto|balance|balance-all","column-gap":"normal|<length-percentage>","column-rule":"<'column-rule-width'>||<'column-rule-style'>||<'column-rule-color'>","column-rule-color":"<color>","column-rule-style":"<'border-style'>","column-rule-width":"<'border-width'>","column-span":"none|all","column-width":"<length>|auto",columns:"<'column-width'>||<'column-count'>",contain:"none|strict|content|[size||layout||style||paint]",content:"normal|none|[<content-replacement>|<content-list>] [/ [<string>|<counter>]+]?","content-visibility":"visible|auto|hidden","counter-increment":"[<counter-name> <integer>?]+|none","counter-reset":"[<counter-name> <integer>?|<reversed-counter-name> <integer>?]+|none","counter-set":"[<counter-name> <integer>?]+|none",cursor:"[[<url> [<x> <y>]? ,]* [auto|default|none|context-menu|help|pointer|progress|wait|cell|crosshair|text|vertical-text|alias|copy|move|no-drop|not-allowed|e-resize|n-resize|ne-resize|nw-resize|s-resize|se-resize|sw-resize|w-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|col-resize|row-resize|all-scroll|zoom-in|zoom-out|grab|grabbing|hand|-webkit-grab|-webkit-grabbing|-webkit-zoom-in|-webkit-zoom-out|-moz-grab|-moz-grabbing|-moz-zoom-in|-moz-zoom-out]]",direction:"ltr|rtl",display:"[<display-outside>||<display-inside>]|<display-listitem>|<display-internal>|<display-box>|<display-legacy>|<-non-standard-display>","empty-cells":"show|hide",filter:"none|<filter-function-list>|<-ms-filter-function-list>",flex:"none|[<'flex-grow'> <'flex-shrink'>?||<'flex-basis'>]","flex-basis":"content|<'width'>","flex-direction":"row|row-reverse|column|column-reverse","flex-flow":"<'flex-direction'>||<'flex-wrap'>","flex-grow":"<number>","flex-shrink":"<number>","flex-wrap":"nowrap|wrap|wrap-reverse",float:"left|right|none|inline-start|inline-end",font:"[[<'font-style'>||<font-variant-css21>||<'font-weight'>||<'font-stretch'>]? <'font-size'> [/ <'line-height'>]? <'font-family'>]|caption|icon|menu|message-box|small-caption|status-bar","font-family":"[<family-name>|<generic-family>]#","font-feature-settings":"normal|<feature-tag-value>#","font-kerning":"auto|normal|none","font-language-override":"normal|<string>","font-optical-sizing":"auto|none","font-variation-settings":"normal|[<string> <number>]#","font-size":"<absolute-size>|<relative-size>|<length-percentage>","font-size-adjust":"none|[ex-height|cap-height|ch-width|ic-width|ic-height]? [from-font|<number>]","font-smooth":"auto|never|always|<absolute-size>|<length>","font-stretch":"<font-stretch-absolute>","font-style":"normal|italic|oblique <angle>?","font-synthesis":"none|[weight||style||small-caps]","font-variant":"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]","font-variant-alternates":"normal|[stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )]","font-variant-caps":"normal|small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps","font-variant-east-asian":"normal|[<east-asian-variant-values>||<east-asian-width-values>||ruby]","font-variant-ligatures":"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>]","font-variant-numeric":"normal|[<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero]","font-variant-position":"normal|sub|super","font-weight":"<font-weight-absolute>|bolder|lighter","forced-color-adjust":"auto|none",gap:"<'row-gap'> <'column-gap'>?",grid:"<'grid-template'>|<'grid-template-rows'> / [auto-flow&&dense?] <'grid-auto-columns'>?|[auto-flow&&dense?] <'grid-auto-rows'>? / <'grid-template-columns'>","grid-area":"<grid-line> [/ <grid-line>]{0,3}","grid-auto-columns":"<track-size>+","grid-auto-flow":"[row|column]||dense","grid-auto-rows":"<track-size>+","grid-column":"<grid-line> [/ <grid-line>]?","grid-column-end":"<grid-line>","grid-column-gap":"<length-percentage>","grid-column-start":"<grid-line>","grid-gap":"<'grid-row-gap'> <'grid-column-gap'>?","grid-row":"<grid-line> [/ <grid-line>]?","grid-row-end":"<grid-line>","grid-row-gap":"<length-percentage>","grid-row-start":"<grid-line>","grid-template":"none|[<'grid-template-rows'> / <'grid-template-columns'>]|[<line-names>? <string> <track-size>? <line-names>?]+ [/ <explicit-track-list>]?","grid-template-areas":"none|<string>+","grid-template-columns":"none|<track-list>|<auto-track-list>|subgrid <line-name-list>?","grid-template-rows":"none|<track-list>|<auto-track-list>|subgrid <line-name-list>?","hanging-punctuation":"none|[first||[force-end|allow-end]||last]",height:"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )","hyphenate-character":"auto|<string>",hyphens:"none|manual|auto","image-orientation":"from-image|<angle>|[<angle>? flip]","image-rendering":"auto|crisp-edges|pixelated|optimizeSpeed|optimizeQuality|<-non-standard-image-rendering>","image-resolution":"[from-image||<resolution>]&&snap?","ime-mode":"auto|normal|active|inactive|disabled","initial-letter":"normal|[<number> <integer>?]","initial-letter-align":"[auto|alphabetic|hanging|ideographic]","inline-size":"<'width'>","input-security":"auto|none",inset:"<'top'>{1,4}","inset-block":"<'top'>{1,2}","inset-block-end":"<'top'>","inset-block-start":"<'top'>","inset-inline":"<'top'>{1,2}","inset-inline-end":"<'top'>","inset-inline-start":"<'top'>",isolation:"auto|isolate","justify-content":"normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]","justify-items":"normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]|legacy|legacy&&[left|right|center]","justify-self":"auto|normal|stretch|<baseline-position>|<overflow-position>? [<self-position>|left|right]","justify-tracks":"[normal|<content-distribution>|<overflow-position>? [<content-position>|left|right]]#",left:"<length>|<percentage>|auto","letter-spacing":"normal|<length-percentage>","line-break":"auto|loose|normal|strict|anywhere","line-clamp":"none|<integer>","line-height":"normal|<number>|<length>|<percentage>","line-height-step":"<length>","list-style":"<'list-style-type'>||<'list-style-position'>||<'list-style-image'>","list-style-image":"<image>|none","list-style-position":"inside|outside","list-style-type":"<counter-style>|<string>|none",margin:"[<length>|<percentage>|auto]{1,4}","margin-block":"<'margin-left'>{1,2}","margin-block-end":"<'margin-left'>","margin-block-start":"<'margin-left'>","margin-bottom":"<length>|<percentage>|auto","margin-inline":"<'margin-left'>{1,2}","margin-inline-end":"<'margin-left'>","margin-inline-start":"<'margin-left'>","margin-left":"<length>|<percentage>|auto","margin-right":"<length>|<percentage>|auto","margin-top":"<length>|<percentage>|auto","margin-trim":"none|in-flow|all",mask:"<mask-layer>#","mask-border":"<'mask-border-source'>||<'mask-border-slice'> [/ <'mask-border-width'>? [/ <'mask-border-outset'>]?]?||<'mask-border-repeat'>||<'mask-border-mode'>","mask-border-mode":"luminance|alpha","mask-border-outset":"[<length>|<number>]{1,4}","mask-border-repeat":"[stretch|repeat|round|space]{1,2}","mask-border-slice":"<number-percentage>{1,4} fill?","mask-border-source":"none|<image>","mask-border-width":"[<length-percentage>|<number>|auto]{1,4}","mask-clip":"[<geometry-box>|no-clip]#","mask-composite":"<compositing-operator>#","mask-image":"<mask-reference>#","mask-mode":"<masking-mode>#","mask-origin":"<geometry-box>#","mask-position":"<position>#","mask-repeat":"<repeat-style>#","mask-size":"<bg-size>#","mask-type":"luminance|alpha","masonry-auto-flow":"[pack|next]||[definite-first|ordered]","math-style":"normal|compact","max-block-size":"<'max-width'>","max-height":"none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )","max-inline-size":"<'max-width'>","max-lines":"none|<integer>","max-width":"none|<length-percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>","min-block-size":"<'min-width'>","min-height":"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )","min-inline-size":"<'min-width'>","min-width":"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|<-non-standard-width>","mix-blend-mode":"<blend-mode>|plus-lighter","object-fit":"fill|contain|cover|none|scale-down","object-position":"<position>",offset:"[<'offset-position'>? [<'offset-path'> [<'offset-distance'>||<'offset-rotate'>]?]?]! [/ <'offset-anchor'>]?","offset-anchor":"auto|<position>","offset-distance":"<length-percentage>","offset-path":"none|ray( [<angle>&&<size>&&contain?] )|<path()>|<url>|[<basic-shape>||<geometry-box>]","offset-position":"auto|<position>","offset-rotate":"[auto|reverse]||<angle>",opacity:"<alpha-value>",order:"<integer>",orphans:"<integer>",outline:"[<'outline-color'>||<'outline-style'>||<'outline-width'>]","outline-color":"<color>|invert","outline-offset":"<length>","outline-style":"auto|<'border-style'>","outline-width":"<line-width>",overflow:"[visible|hidden|clip|scroll|auto]{1,2}|<-non-standard-overflow>","overflow-anchor":"auto|none","overflow-block":"visible|hidden|clip|scroll|auto","overflow-clip-box":"padding-box|content-box","overflow-clip-margin":"<visual-box>||<length [0,∞]>","overflow-inline":"visible|hidden|clip|scroll|auto","overflow-wrap":"normal|break-word|anywhere","overflow-x":"visible|hidden|clip|scroll|auto","overflow-y":"visible|hidden|clip|scroll|auto","overscroll-behavior":"[contain|none|auto]{1,2}","overscroll-behavior-block":"contain|none|auto","overscroll-behavior-inline":"contain|none|auto","overscroll-behavior-x":"contain|none|auto","overscroll-behavior-y":"contain|none|auto",padding:"[<length>|<percentage>]{1,4}","padding-block":"<'padding-left'>{1,2}","padding-block-end":"<'padding-left'>","padding-block-start":"<'padding-left'>","padding-bottom":"<length>|<percentage>","padding-inline":"<'padding-left'>{1,2}","padding-inline-end":"<'padding-left'>","padding-inline-start":"<'padding-left'>","padding-left":"<length>|<percentage>","padding-right":"<length>|<percentage>","padding-top":"<length>|<percentage>","page-break-after":"auto|always|avoid|left|right|recto|verso","page-break-before":"auto|always|avoid|left|right|recto|verso","page-break-inside":"auto|avoid","paint-order":"normal|[fill||stroke||markers]",perspective:"none|<length>","perspective-origin":"<position>","place-content":"<'align-content'> <'justify-content'>?","place-items":"<'align-items'> <'justify-items'>?","place-self":"<'align-self'> <'justify-self'>?","pointer-events":"auto|none|visiblePainted|visibleFill|visibleStroke|visible|painted|fill|stroke|all|inherit",position:"static|relative|absolute|sticky|fixed|-webkit-sticky",quotes:"none|auto|[<string> <string>]+",resize:"none|both|horizontal|vertical|block|inline",right:"<length>|<percentage>|auto",rotate:"none|<angle>|[x|y|z|<number>{3}]&&<angle>","row-gap":"normal|<length-percentage>","ruby-align":"start|center|space-between|space-around","ruby-merge":"separate|collapse|auto","ruby-position":"[alternate||[over|under]]|inter-character",scale:"none|<number>{1,3}","scrollbar-color":"auto|<color>{2}","scrollbar-gutter":"auto|stable&&both-edges?","scrollbar-width":"auto|thin|none","scroll-behavior":"auto|smooth","scroll-margin":"<length>{1,4}","scroll-margin-block":"<length>{1,2}","scroll-margin-block-start":"<length>","scroll-margin-block-end":"<length>","scroll-margin-bottom":"<length>","scroll-margin-inline":"<length>{1,2}","scroll-margin-inline-start":"<length>","scroll-margin-inline-end":"<length>","scroll-margin-left":"<length>","scroll-margin-right":"<length>","scroll-margin-top":"<length>","scroll-padding":"[auto|<length-percentage>]{1,4}","scroll-padding-block":"[auto|<length-percentage>]{1,2}","scroll-padding-block-start":"auto|<length-percentage>","scroll-padding-block-end":"auto|<length-percentage>","scroll-padding-bottom":"auto|<length-percentage>","scroll-padding-inline":"[auto|<length-percentage>]{1,2}","scroll-padding-inline-start":"auto|<length-percentage>","scroll-padding-inline-end":"auto|<length-percentage>","scroll-padding-left":"auto|<length-percentage>","scroll-padding-right":"auto|<length-percentage>","scroll-padding-top":"auto|<length-percentage>","scroll-snap-align":"[none|start|end|center]{1,2}","scroll-snap-coordinate":"none|<position>#","scroll-snap-destination":"<position>","scroll-snap-points-x":"none|repeat( <length-percentage> )","scroll-snap-points-y":"none|repeat( <length-percentage> )","scroll-snap-stop":"normal|always","scroll-snap-type":"none|[x|y|block|inline|both] [mandatory|proximity]?","scroll-snap-type-x":"none|mandatory|proximity","scroll-snap-type-y":"none|mandatory|proximity","shape-image-threshold":"<alpha-value>","shape-margin":"<length-percentage>","shape-outside":"none|[<shape-box>||<basic-shape>]|<image>","tab-size":"<integer>|<length>","table-layout":"auto|fixed","text-align":"start|end|left|right|center|justify|match-parent","text-align-last":"auto|start|end|left|right|center|justify","text-combine-upright":"none|all|[digits <integer>?]","text-decoration":"<'text-decoration-line'>||<'text-decoration-style'>||<'text-decoration-color'>||<'text-decoration-thickness'>","text-decoration-color":"<color>","text-decoration-line":"none|[underline||overline||line-through||blink]|spelling-error|grammar-error","text-decoration-skip":"none|[objects||[spaces|[leading-spaces||trailing-spaces]]||edges||box-decoration]","text-decoration-skip-ink":"auto|all|none","text-decoration-style":"solid|double|dotted|dashed|wavy","text-decoration-thickness":"auto|from-font|<length>|<percentage>","text-emphasis":"<'text-emphasis-style'>||<'text-emphasis-color'>","text-emphasis-color":"<color>","text-emphasis-position":"[over|under]&&[right|left]","text-emphasis-style":"none|[[filled|open]||[dot|circle|double-circle|triangle|sesame]]|<string>","text-indent":"<length-percentage>&&hanging?&&each-line?","text-justify":"auto|inter-character|inter-word|none","text-orientation":"mixed|upright|sideways","text-overflow":"[clip|ellipsis|<string>]{1,2}","text-rendering":"auto|optimizeSpeed|optimizeLegibility|geometricPrecision","text-shadow":"none|<shadow-t>#","text-size-adjust":"none|auto|<percentage>","text-transform":"none|capitalize|uppercase|lowercase|full-width|full-size-kana","text-underline-offset":"auto|<length>|<percentage>","text-underline-position":"auto|from-font|[under||[left|right]]",top:"<length>|<percentage>|auto","touch-action":"auto|none|[[pan-x|pan-left|pan-right]||[pan-y|pan-up|pan-down]||pinch-zoom]|manipulation",transform:"none|<transform-list>","transform-box":"content-box|border-box|fill-box|stroke-box|view-box","transform-origin":"[<length-percentage>|left|center|right|top|bottom]|[[<length-percentage>|left|center|right]&&[<length-percentage>|top|center|bottom]] <length>?","transform-style":"flat|preserve-3d",transition:"<single-transition>#","transition-delay":"<time>#","transition-duration":"<time>#","transition-property":"none|<single-transition-property>#","transition-timing-function":"<easing-function>#",translate:"none|<length-percentage> [<length-percentage> <length>?]?","unicode-bidi":"normal|embed|isolate|bidi-override|isolate-override|plaintext|-moz-isolate|-moz-isolate-override|-moz-plaintext|-webkit-isolate|-webkit-isolate-override|-webkit-plaintext","user-select":"auto|text|none|contain|all","vertical-align":"baseline|sub|super|text-top|text-bottom|middle|top|bottom|<percentage>|<length>",visibility:"visible|hidden|collapse","white-space":"normal|pre|nowrap|pre-wrap|pre-line|break-spaces",widows:"<integer>",width:"auto|<length>|<percentage>|min-content|max-content|fit-content|fit-content( <length-percentage> )|fill|stretch|intrinsic|-moz-max-content|-webkit-max-content|-moz-fit-content|-webkit-fit-content","will-change":"auto|<animateable-feature>#","word-break":"normal|break-all|keep-all|break-word","word-spacing":"normal|<length>","word-wrap":"normal|break-word","writing-mode":"horizontal-tb|vertical-rl|vertical-lr|sideways-rl|sideways-lr|<svg-writing-mode>","z-index":"auto|<integer>",zoom:"normal|reset|<number>|<percentage>","-moz-background-clip":"padding|border","-moz-border-radius-bottomleft":"<'border-bottom-left-radius'>","-moz-border-radius-bottomright":"<'border-bottom-right-radius'>","-moz-border-radius-topleft":"<'border-top-left-radius'>","-moz-border-radius-topright":"<'border-bottom-right-radius'>","-moz-control-character-visibility":"visible|hidden","-moz-osx-font-smoothing":"auto|grayscale","-moz-user-select":"none|text|all|-moz-none","-ms-flex-align":"start|end|center|baseline|stretch","-ms-flex-item-align":"auto|start|end|center|baseline|stretch","-ms-flex-line-pack":"start|end|center|justify|distribute|stretch","-ms-flex-negative":"<'flex-shrink'>","-ms-flex-pack":"start|end|center|justify|distribute","-ms-flex-order":"<integer>","-ms-flex-positive":"<'flex-grow'>","-ms-flex-preferred-size":"<'flex-basis'>","-ms-interpolation-mode":"nearest-neighbor|bicubic","-ms-grid-column-align":"start|end|center|stretch","-ms-grid-row-align":"start|end|center|stretch","-ms-hyphenate-limit-last":"none|always|column|page|spread","-webkit-background-clip":"[<box>|border|padding|content|text]#","-webkit-column-break-after":"always|auto|avoid","-webkit-column-break-before":"always|auto|avoid","-webkit-column-break-inside":"always|auto|avoid","-webkit-font-smoothing":"auto|none|antialiased|subpixel-antialiased","-webkit-mask-box-image":"[<url>|<gradient>|none] [<length-percentage>{4} <-webkit-mask-box-repeat>{2}]?","-webkit-print-color-adjust":"economy|exact","-webkit-text-security":"none|circle|disc|square","-webkit-user-drag":"none|element|auto","-webkit-user-select":"auto|none|text|all","alignment-baseline":"auto|baseline|before-edge|text-before-edge|middle|central|after-edge|text-after-edge|ideographic|alphabetic|hanging|mathematical","baseline-shift":"baseline|sub|super|<svg-length>",behavior:"<url>+","clip-rule":"nonzero|evenodd",cue:"<'cue-before'> <'cue-after'>?","cue-after":"<url> <decibel>?|none","cue-before":"<url> <decibel>?|none","dominant-baseline":"auto|use-script|no-change|reset-size|ideographic|alphabetic|hanging|mathematical|central|middle|text-after-edge|text-before-edge",fill:"<paint>","fill-opacity":"<number-zero-one>","fill-rule":"nonzero|evenodd","glyph-orientation-horizontal":"<angle>","glyph-orientation-vertical":"<angle>",kerning:"auto|<svg-length>",marker:"none|<url>","marker-end":"none|<url>","marker-mid":"none|<url>","marker-start":"none|<url>",pause:"<'pause-before'> <'pause-after'>?","pause-after":"<time>|none|x-weak|weak|medium|strong|x-strong","pause-before":"<time>|none|x-weak|weak|medium|strong|x-strong",rest:"<'rest-before'> <'rest-after'>?","rest-after":"<time>|none|x-weak|weak|medium|strong|x-strong","rest-before":"<time>|none|x-weak|weak|medium|strong|x-strong","shape-rendering":"auto|optimizeSpeed|crispEdges|geometricPrecision",src:"[<url> [format( <string># )]?|local( <family-name> )]#",speak:"auto|none|normal","speak-as":"normal|spell-out||digits||[literal-punctuation|no-punctuation]",stroke:"<paint>","stroke-dasharray":"none|[<svg-length>+]#","stroke-dashoffset":"<svg-length>","stroke-linecap":"butt|round|square","stroke-linejoin":"miter|round|bevel","stroke-miterlimit":"<number-one-or-greater>","stroke-opacity":"<number-zero-one>","stroke-width":"<svg-length>","text-anchor":"start|middle|end","unicode-range":"<urange>#","voice-balance":"<number>|left|center|right|leftwards|rightwards","voice-duration":"auto|<time>","voice-family":"[[<family-name>|<generic-voice>] ,]* [<family-name>|<generic-voice>]|preserve","voice-pitch":"<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]","voice-range":"<frequency>&&absolute|[[x-low|low|medium|high|x-high]||[<frequency>|<semitones>|<percentage>]]","voice-rate":"[normal|x-slow|slow|medium|fast|x-fast]||<percentage>","voice-stress":"normal|strong|moderate|none|reduced","voice-volume":"silent|[[x-soft|soft|medium|loud|x-loud]||<decibel>]"},atrules:{charset:{prelude:"<string>",descriptors:null},"counter-style":{prelude:"<counter-style-name>",descriptors:{"additive-symbols":"[<integer>&&<symbol>]#",fallback:"<counter-style-name>",negative:"<symbol> <symbol>?",pad:"<integer>&&<symbol>",prefix:"<symbol>",range:"[[<integer>|infinite]{2}]#|auto","speak-as":"auto|bullets|numbers|words|spell-out|<counter-style-name>",suffix:"<symbol>",symbols:"<symbol>+",system:"cyclic|numeric|alphabetic|symbolic|additive|[fixed <integer>?]|[extends <counter-style-name>]"}},document:{prelude:"[<url>|url-prefix( <string> )|domain( <string> )|media-document( <string> )|regexp( <string> )]#",descriptors:null},"font-face":{prelude:null,descriptors:{"ascent-override":"normal|<percentage>","descent-override":"normal|<percentage>","font-display":"[auto|block|swap|fallback|optional]","font-family":"<family-name>","font-feature-settings":"normal|<feature-tag-value>#","font-variation-settings":"normal|[<string> <number>]#","font-stretch":"<font-stretch-absolute>{1,2}","font-style":"normal|italic|oblique <angle>{0,2}","font-weight":"<font-weight-absolute>{1,2}","font-variant":"normal|none|[<common-lig-values>||<discretionary-lig-values>||<historical-lig-values>||<contextual-alt-values>||stylistic( <feature-value-name> )||historical-forms||styleset( <feature-value-name># )||character-variant( <feature-value-name># )||swash( <feature-value-name> )||ornaments( <feature-value-name> )||annotation( <feature-value-name> )||[small-caps|all-small-caps|petite-caps|all-petite-caps|unicase|titling-caps]||<numeric-figure-values>||<numeric-spacing-values>||<numeric-fraction-values>||ordinal||slashed-zero||<east-asian-variant-values>||<east-asian-width-values>||ruby]","line-gap-override":"normal|<percentage>","size-adjust":"<percentage>",src:"[<url> [format( <string># )]?|local( <family-name> )]#","unicode-range":"<urange>#"}},"font-feature-values":{prelude:"<family-name>#",descriptors:null},import:{prelude:"[<string>|<url>] [layer|layer( <layer-name> )]? [supports( [<supports-condition>|<declaration>] )]? <media-query-list>?",descriptors:null},keyframes:{prelude:"<keyframes-name>",descriptors:null},layer:{prelude:"[<layer-name>#|<layer-name>?]",descriptors:null},media:{prelude:"<media-query-list>",descriptors:null},namespace:{prelude:"<namespace-prefix>? [<string>|<url>]",descriptors:null},page:{prelude:"<page-selector-list>",descriptors:{bleed:"auto|<length>",marks:"none|[crop||cross]",size:"<length>{1,2}|auto|[<page-size>||[portrait|landscape]]"}},property:{prelude:"<custom-property-name>",descriptors:{syntax:"<string>",inherits:"true|false","initial-value":"<string>"}},"scroll-timeline":{prelude:"<timeline-name>",descriptors:null},supports:{prelude:"<supports-condition>",descriptors:null},viewport:{prelude:null,descriptors:{height:"<viewport-length>{1,2}","max-height":"<viewport-length>","max-width":"<viewport-length>","max-zoom":"auto|<number>|<percentage>","min-height":"<viewport-length>","min-width":"<viewport-length>","min-zoom":"auto|<number>|<percentage>",orientation:"auto|portrait|landscape","user-zoom":"zoom|fixed","viewport-fit":"auto|contain|cover",width:"<viewport-length>{1,2}",zoom:"auto|<number>|<percentage>"}}},node:cf}
function hf(e){switch(this.tokenType){case 4:return this.Hash()
case kc:return this.Operator()
case xc:return this.Parentheses(this.readSequence,e.recognizer)
case vc:return this.Brackets(this.readSequence,e.recognizer)
case 5:return this.String()
case mc:return this.Dimension()
case pc:return this.Percentage()
case dc:return this.Number()
case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer)
case 7:return this.Url()
case 1:return this.cmpChar(this.tokenStart,117)&&this.cmpChar(this.tokenStart+1,43)?this.UnicodeRange():this.Identifier()
case 9:{const e=this.charCodeAt(this.tokenStart)
if(47===e||42===e||43===e||45===e)return this.Operator()
35===e&&this.error("Hex or identifier is expected",this.tokenStart+1)
break}}}var df={getNode:hf}
var pf={onWhiteSpace:function(e,t){null!==t.last&&"Combinator"!==t.last.type&&null!==e&&"Combinator"!==e.type&&t.push({type:"Combinator",loc:null,name:" "})},getNode:function(){switch(this.tokenType){case vc:return this.AttributeSelector()
case 4:return this.IdSelector()
case bc:return this.lookupType(1)===bc?this.PseudoElementSelector():this.PseudoClassSelector()
case 1:return this.TypeSelector()
case dc:case pc:return this.Percentage()
case mc:46===this.charCodeAt(this.tokenStart)&&this.error("Identifier is expected",this.tokenStart+1)
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 43:case 62:case 126:case 47:return this.Combinator()
case 46:return this.ClassSelector()
case 42:case 124:return this.TypeSelector()
case 35:return this.IdSelector()}break}}}
function mf(e){return null!==e&&"Operator"===e.type&&("-"===e.value[e.value.length-1]||"+"===e.value[e.value.length-1])}var ff={getNode:hf,onWhiteSpace(e,t){mf(e)&&(e.value=" "+e.value),mf(t.last)&&(t.last.value+=" ")},expression:function(){return this.createSingleNodeList(this.Raw(this.tokenIndex,null,!1))},var:function(){const e=this.createList()
if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===kc){e.push(this.Operator())
const t=this.tokenIndex,n=this.parseCustomProperty?this.Value(null):this.Raw(this.tokenIndex,this.consumeUntilExclamationMarkOrSemicolon,!1)
if("Value"===n.type&&n.children.isEmpty)for(let e=t-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===fc){n.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}e.push(n)}return e}},gf=Object.freeze({__proto__:null,AtrulePrelude:df,Selector:pf,Value:ff})
function bf(){return this.createSingleNodeList(this.Raw(this.tokenIndex,null,!1))}function yf(){return this.skipSC(),1===this.tokenType&&this.lookupNonWSType(1)===bc?this.createSingleNodeList(this.Declaration()):kf.call(this)}function kf(){const e=this.createList()
let t
this.skipSC()
e:for(;!this.eof;){switch(this.tokenType){case _c:case fc:this.next()
continue
case 2:t=this.Function(bf,this.scope.AtrulePrelude)
break
case 1:t=this.Identifier()
break
case xc:t=this.Parentheses(yf,this.scope.AtrulePrelude)
break
default:break e}e.push(t)}return e}var vf={"font-face":{parse:{prelude:null,block(){return this.Block(!0)}}},import:{parse:{prelude(){const e=this.createList()
switch(this.skipSC(),this.tokenType){case 5:e.push(this.String())
break
case 7:case 2:e.push(this.Url())
break
default:this.error("String or url() is expected")}return 1!==this.lookupNonWSType(0)&&this.lookupNonWSType(0)!==xc||e.push(this.MediaQueryList()),e},block:null}},media:{parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(){return this.Block(!1)}}},page:{parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}},supports:{parse:{prelude(){const e=kf.call(this)
return null===this.getFirstListNode(e)&&this.error("Condition is expected"),e},block(){return this.Block(!1)}}}}
const wf={parse(){return this.createSingleNodeList(this.SelectorList())}},xf={parse(){return this.createSingleNodeList(this.Selector())}},Sf={parse(){return this.createSingleNodeList(this.Identifier())}},Cf={parse(){return this.createSingleNodeList(this.Nth())}}
var Af={dir:Sf,has:wf,lang:Sf,matches:wf,is:wf,"-moz-any":wf,"-webkit-any":wf,where:wf,not:wf,"nth-child":Cf,"nth-last-child":Cf,"nth-last-of-type":Cf,"nth-of-type":Cf,slotted:xf},_f=Object.freeze({__proto__:null,AnPlusB:Rd,Atrule:Ud,AtrulePrelude:Vd,AttributeSelector:Qd,Block:np,Brackets:op,CDC:ap,CDO:lp,ClassSelector:hp,Combinator:mp,Comment:bp,Declaration:Sp,DeclarationList:Tp,Dimension:Pp,Function:Dp,Hash:Ip,IdSelector:Up,Identifier:Bp,MediaFeature:$p,MediaQuery:Xp,MediaQueryList:Qp,Nth:Zp,Number:tm,Operator:om,Parentheses:am,Percentage:cm,PseudoClassSelector:dm,PseudoElementSelector:fm,Ratio:km,Raw:Sm,Rule:zm,Selector:Em,SelectorList:Pm,String:Mm,StyleSheet:Fm,TypeSelector:Um,UnicodeRange:Qm,Url:ef,Value:nf,WhiteSpace:sf}),zf=(e=>Td(zd({},e)))({...uf,...{parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},scope:gf,atrule:vf,pseudo:Af,node:_f},...{node:cf}})
function Tf(e){const t={}
for(const n in e){let r=e[n]
r&&(Array.isArray(r)||r instanceof cu?r=r.map(Tf):r.constructor===Object&&(r=Tf(r))),t[n]=r}return t}const{tokenize:Ef,parse:Of,generate:Pf,lexer:Lf,createLexer:Nf,walk:Df,find:jf,findLast:Mf,findAll:If,toPlainObject:Rf,fromPlainObject:Ff,fork:Bf}=zf,{hasOwnProperty:qf}=Object.prototype
function Gf(e,t){const n=Object.create(null)
if(!Array.isArray(e))return null
for(let r of e)t&&(r=r.toLowerCase()),n[r]=!0
return n}function Uf(e){if(!e)return null
const t=Gf(e.tags,!0),n=Gf(e.ids),r=Gf(e.classes)
return null===t&&null===n&&null===r?null:{tags:t,ids:n,classes:r}}function Wf(e){let t=!1
if(e.scopes&&Array.isArray(e.scopes)){t=Object.create(null)
for(let n=0;n<e.scopes.length;n++){const r=e.scopes[n]
if(!r||!Array.isArray(r))throw new Error("Wrong usage format")
for(const e of r){if(qf.call(t,e))throw new Error(`Class can't be used for several scopes: ${e}`)
t[e]=n+1}}}return{whitelist:Uf(e),blacklist:Uf(e.blacklist),scopes:t}}function Vf(e){return!e||!e.children||e.children.isEmpty}function $f(e,t){return null!==e&&e.children===t}const{hasOwnProperty:Yf}=Object.prototype,Xf=new Set(["keyframes"])
function Hf(e,t){return e.children.forEach((n,r,o)=>{let i=!1
Df(n,function(n){if(null===this.selector||this.selector===e)switch(n.type){case"SelectorList":null!==this.function&&"not"===this.function.name.toLowerCase()||Hf(n,t)&&(i=!0)
break
case"ClassSelector":null===t.whitelist||null===t.whitelist.classes||Yf.call(t.whitelist.classes,n.name)||(i=!0),null!==t.blacklist&&null!==t.blacklist.classes&&Yf.call(t.blacklist.classes,n.name)&&(i=!0)
break
case"IdSelector":null===t.whitelist||null===t.whitelist.ids||Yf.call(t.whitelist.ids,n.name)||(i=!0),null!==t.blacklist&&null!==t.blacklist.ids&&Yf.call(t.blacklist.ids,n.name)&&(i=!0)
break
case"TypeSelector":"*"!==n.name.charAt(n.name.length-1)&&(null===t.whitelist||null===t.whitelist.tags||Yf.call(t.whitelist.tags,n.name.toLowerCase())||(i=!0),null!==t.blacklist&&null!==t.blacklist.tags&&Yf.call(t.blacklist.tags,n.name.toLowerCase())&&(i=!0))}}),i&&o.remove(r)}),e.children.isEmpty}const Qf={Atrule:function(e,t,n){if(e.block&&(null!==this.stylesheet&&(this.stylesheet.firstAtrulesAllowed=!1),Vf(e.block)))return n.remove(t),void 0
switch(e.name){case"charset":if(Vf(e.prelude))return n.remove(t),void 0
if(t.prev)return n.remove(t),void 0
break
case"import":if(null===this.stylesheet||!this.stylesheet.firstAtrulesAllowed)return n.remove(t),void 0
n.prevUntil(t.prev,function(e){if("Atrule"!==e.type||"import"!==e.name&&"charset"!==e.name)return this.root.firstAtrulesAllowed=!1,n.remove(t),!0},this)
break
default:{const r=Xu(e.name).basename
"keyframes"!==r&&"media"!==r&&"supports"!==r||(Vf(e.prelude)||Vf(e.block))&&n.remove(t)}}},Comment:function(e,t,n){n.remove(t)},Declaration:function(e,t,n){if(e.value.children&&e.value.children.isEmpty)return n.remove(t),void 0
Hu(e.property).custom&&/\S/.test(e.value.value)&&(e.value.value=e.value.value.trim())},Raw:function(e,t,n){($f(this.stylesheet,n)||$f(this.block,n))&&n.remove(t)},Rule:function(e,t,n,r){if(Vf(e.prelude)||Vf(e.block))return n.remove(t),void 0
if(this.atrule&&Xf.has(Xu(this.atrule.name).basename))return
const{usage:o}=r
return o&&(null!==o.whitelist||null!==o.blacklist)&&(Hf(e.prelude,o),Vf(e.prelude))?(n.remove(t),void 0):void 0},TypeSelector:function(e,t,n){if("*"!==t.data.name)return
const r=t.next&&t.next.data.type
"IdSelector"!==r&&"ClassSelector"!==r&&"AttributeSelector"!==r&&"PseudoClassSelector"!==r&&"PseudoElementSelector"!==r||n.remove(t)},WhiteSpace:function(e,t,n){n.remove(t)}}
const Kf=/^(-?\d|--)|[\u0000-\u002c\u002e\u002f\u003A-\u0040\u005B-\u005E\u0060\u007B-\u009f]/
function Zf(e){e.children.forEach((e,t,n)=>{"Identifier"===e.type&&"none"===e.name.toLowerCase()&&(n.head===n.tail?t.data={type:"Number",loc:e.loc,value:"0"}:n.remove(t))})}const Jf={font:function(e){const t=e.children
t.forEachRight(function(e,t){if("Identifier"===e.type)if("bold"===e.name)t.data={type:"Number",loc:e.loc,value:"700"}
else if("normal"===e.name){const e=t.prev
e&&"Operator"===e.data.type&&"/"===e.data.value&&this.remove(e),this.remove(t)}}),t.isEmpty&&t.insert(t.createItem({type:"Identifier",name:"normal"}))},"font-weight":function(e){const t=e.children.head.data
if("Identifier"===t.type)switch(t.name){case"normal":e.children.head.data={type:"Number",loc:t.loc,value:"400"}
break
case"bold":e.children.head.data={type:"Number",loc:t.loc,value:"700"}}},background:function(e){function t(){r.length||r.unshift({type:"Number",loc:null,value:"0"},{type:"Number",loc:null,value:"0"}),n.push.apply(n,r),r=[]}let n=[],r=[]
e.children.forEach(e=>{if("Operator"===e.type&&","===e.value)return t(),n.push(e),void 0;("Identifier"!==e.type||"transparent"!==e.name&&"none"!==e.name&&"repeat"!==e.name&&"scroll"!==e.name)&&r.push(e)}),t(),e.children=(new cu).fromArray(n)},border:Zf,outline:Zf}
const eg=/^(?:\+|(-))?0*(\d*)(?:\.0*|(\.\d*?)0*)?$/
function tg(e){const t=eg
return""!==(e=String(e).replace(t,"$1$2$3"))&&"-"!==e||(e="0"),e}const ng=new Set(["calc","min","max","clamp"]),rg=new Set(["px","mm","cm","in","pt","pc","em","ex","ch","rem","vh","vw","vmin","vmax","vm"])
const og=new Set(["width","min-width","max-width","height","min-height","max-height","flex","-ms-flex"])
const ig={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},ag={800000:"maroon",800080:"purple",808000:"olive",808080:"gray","00ffff":"cyan",f0ffff:"azure",f5f5dc:"beige",ffe4c4:"bisque","000000":"black","0000ff":"blue",a52a2a:"brown",ff7f50:"coral",ffd700:"gold","008000":"green","4b0082":"indigo",fffff0:"ivory",f0e68c:"khaki","00ff00":"lime",faf0e6:"linen","000080":"navy",ffa500:"orange",da70d6:"orchid",cd853f:"peru",ffc0cb:"pink",dda0dd:"plum",f00:"red",ff0000:"red",fa8072:"salmon",a0522d:"sienna",c0c0c0:"silver",fffafa:"snow",d2b48c:"tan","008080":"teal",ff6347:"tomato",ee82ee:"violet",f5deb3:"wheat",ffffff:"white",ffff00:"yellow"}
function sg(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function lg(e,t,n,r){let o,i,a
if(0===t)o=i=a=n
else{const r=n<0.5?n*(1+t):n+t-n*t,s=2*n-r
o=sg(s,r,e+1/3),i=sg(s,r,e),a=sg(s,r,e-1/3)}return[Math.round(255*o),Math.round(255*i),Math.round(255*a),r]}function cg(e){return 1===(e=e.toString(16)).length?"0"+e:e}function ug(e,t,n){let r=e.head,o=[],i=!1
for(;null!==r;){const{type:e,value:t}=r.data
switch(e){case"Number":case"Percentage":if(i)return
i=!0,o.push({type:e,value:Number(t)})
break
case"Operator":if(","===t){if(!i)return
i=!1}else if(i||"+"!==t)return
break
default:return}r=r.next}if(o.length===t){if(4===o.length){if("Number"!==o[3].type)return
o[3].type="Alpha"}if(n){if(o[0].type!==o[1].type||o[0].type!==o[2].type)return}else{if("Number"!==o[0].type||"Percentage"!==o[1].type||"Percentage"!==o[2].type)return
o[0].type="Angle"}return o.map(function(e){let t=Math.max(0,e.value)
switch(e.type){case"Number":t=Math.min(t,255)
break
case"Percentage":if(t=Math.min(t,100)/100,!n)return t
t*=255
break
case"Angle":return(t%360+360)%360/360
case"Alpha":return Math.min(t,1)}return Math.round(t)})}}function hg(e,t){let n=e.value.toLowerCase()
6===n.length&&n[0]===n[1]&&n[2]===n[3]&&n[4]===n[5]&&(n=n[0]+n[2]+n[4]),ag[n]?t.data={type:"Identifier",loc:e.loc,name:ag[n]}:e.value=n}const dg={Atrule:function(e){"keyframes"===Xu(e.name).basename&&!function(e){e.block.children.forEach(e=>{e.prelude.children.forEach(e=>{e.children.forEach((e,t)=>{"Percentage"===e.type&&"100"===e.value?t.data={type:"TypeSelector",loc:e.loc,name:"to"}:"TypeSelector"===e.type&&"from"===e.name&&(t.data={type:"Percentage",loc:e.loc,value:"0"})})})})}(e)},AttributeSelector:function(e){const t=e.value
t&&"String"===t.type&&function(e){return""!==e&&"-"!==e&&!Kf.test(e)}(t.value)&&(e.value={type:"Identifier",loc:t.loc,name:t.value})},Value:function(e){if(!this.declaration)return
const t=Hu(this.declaration.property)
Jf.hasOwnProperty(t.basename)&&Jf[t.basename](e)},Dimension:function(e,t){const n=tg(e.value)
if(e.value=n,"0"===n&&null!==this.declaration&&null===this.atrulePrelude){const r=e.unit.toLowerCase()
if(!rg.has(r))return
if("-ms-flex"===this.declaration.property||"flex"===this.declaration.property)return
if(this.function&&ng.has(this.function.name))return
t.data={type:"Number",loc:e.loc,value:n}}},Percentage:function(e,t){e.value=tg(e.value),"0"===e.value&&this.declaration&&!og.has(this.declaration.property)&&(t.data={type:"Number",loc:e.loc,value:e.value},Lf.matchDeclaration(this.declaration).isType(t.data,"length")||(t.data=e))},Number:function(e){e.value=tg(e.value)},Url:function(e){e.value=e.value.replace(/\\/g,"/")},Hash:hg,Identifier:function(e,t){if(null===this.declaration)return
let n=e.name.toLowerCase()
if(ig.hasOwnProperty(n)&&Lf.matchDeclaration(this.declaration).isType(e,"color")){const r=ig[n]
r.length+1<=n.length?t.data={type:"Hash",loc:e.loc,value:r}:("grey"===n&&(n="gray"),e.name=n)}},Function:function(e,t){let n,r=e.name
if("rgba"===r||"hsla"===r){if(n=ug(e.children,4,"rgba"===r),!n)return
if("hsla"===r&&(n=lg(...n),e.name="rgba"),0===n[3]){const r=this.function&&this.function.name
if(0===n[0]&&0===n[1]&&0===n[2]||!/^(?:to|from|color-stop)$|gradient$/i.test(r))return t.data={type:"Identifier",loc:e.loc,name:"transparent"},void 0}if(1!==n[3])return e.children.forEach((e,t,r)=>{if("Operator"===e.type)return","!==e.value&&r.remove(t),void 0
t.data={type:"Number",loc:e.loc,value:tg(n.shift())}}),void 0
r="rgb"}if("hsl"===r){if(n=n||ug(e.children,3,!1),!n)return
n=lg(...n),r="rgb"}if("rgb"===r){if(n=n||ug(e.children,3,!0),!n)return
t.data={type:"Hash",loc:e.loc,value:cg(n[0])+cg(n[1])+cg(n[2])},hg(t.data,t)}}}
class pg{constructor(){this.map=new Map}resolve(e){let t=this.map.get(e)
return void 0===t&&(t=this.map.size+1,this.map.set(e,t)),t}}function mg(e){return function(e){return"Raw"===e.type?Of(e.value,{context:"selectorList"}):e}(e).children.reduce((e,t)=>function(e,t){for(let n=0;n<3;n++)if(e[n]!==t[n])return e[n]>t[n]?e:t
return e}(fg(t),e),[0,0,0])}function fg(e){let t=0,n=0,r=0
return e.children.forEach(e=>{switch(e.type){case"IdSelector":t++
break
case"ClassSelector":case"AttributeSelector":n++
break
case"PseudoClassSelector":switch(e.name.toLowerCase()){case"not":case"has":case"is":case"matches":case"-webkit-any":case"-moz-any":{const[o,i,a]=mg(e.children.first)
t+=o,n+=i,r+=a
break}case"nth-child":case"nth-last-child":{const o=e.children.first
if("Nth"===o.type&&o.selector){const[e,i,a]=mg(o.selector)
t+=e,n+=i+1,r+=a}else n++
break}case"where":break
case"before":case"after":case"first-line":case"first-letter":r++
break
default:n++}break
case"TypeSelector":e.name.endsWith("*")||r++
break
case"PseudoElementSelector":r++}}),[t,n,r]}const gg=new Set(["first-letter","first-line","after","before"]),bg=new Set(["link","visited","hover","active","first-letter","first-line","after","before"])
function yg(e,t){const n=function(){const e=new pg
return function(t){const n=Pf(t)
return t.id=e.resolve(n),t.length=n.length,t.fingerprint=null,t}}()
return Df(e,{visit:"Rule",enter(e){e.block.children.forEach(n),function(e,t){const n=new Set
e.prelude.children.forEach(function(e){let r="*",o=0
e.children.forEach(function(i){switch(i.type){case"ClassSelector":if(t&&t.scopes){const n=t.scopes[i.name]||0
if(0!==o&&n!==o)throw new Error("Selector can't has classes from different scopes: "+Pf(e))
o=n}break
case"PseudoClassSelector":{const e=i.name.toLowerCase()
bg.has(e)||n.add(`:${e}`)
break}case"PseudoElementSelector":{const e=i.name.toLowerCase()
gg.has(e)||n.add(`::${e}`)
break}case"TypeSelector":r=i.name.toLowerCase()
break
case"AttributeSelector":i.flags&&n.add(`[${i.flags.toLowerCase()}]`)
break
case"Combinator":r="*"}}),e.compareMarker=fg(e).toString(),e.id=null,e.id=Pf(e),o&&(e.compareMarker+=":"+o),"*"!==r&&(e.compareMarker+=","+r)}),e.pseudoSignature=n.size>0&&[...n].sort().join(",")}(e,t.usage)}}),Df(e,{visit:"Atrule",enter(e){e.prelude&&(e.prelude.id=null,e.prelude.id=Pf(e.prelude)),"keyframes"===Xu(e.name).basename&&(e.block.avoidRulesMerge=!0,e.block.children.forEach(function(e){e.prelude.children.forEach(function(e){e.compareMarker=e.id})}))}}),{declaration:n}}const{hasOwnProperty:kg}=Object.prototype
function vg(e,t,n,r){const o=t.data,i=Xu(o.name).basename,a=o.name.toLowerCase()+"/"+(o.prelude?o.prelude.id:null)
kg.call(e,i)||(e[i]=Object.create(null)),r&&delete e[i][a],kg.call(e[i],a)||(e[i][a]=new cu),e[i][a].append(n.remove(t))}function wg(e){return"Atrule"===e.type&&"media"===e.name}function xg(e,t,n){if(!wg(e))return
const r=t.prev&&t.prev.data
r&&wg(r)&&e.prelude&&r.prelude&&e.prelude.id===r.prelude.id&&(r.block.children.appendList(e.block.children),n.remove(t))}function Sg(e,t){!function(e,t){const n=Object.create(null)
let r=null
e.children.forEach(function(e,o,i){if("Atrule"===e.type){const a=Xu(e.name).basename
switch(a){case"keyframes":return vg(n,o,i,!0),void 0
case"media":if(t.forceMediaMerge)return vg(n,o,i,!1),void 0}null===r&&"charset"!==a&&"import"!==a&&(r=o)}else null===r&&(r=o)})
for(const t in n)for(const o in n[t])e.children.insertList(n[t][o],"media"===t?null:r)}(e,t),Df(e,{visit:"Atrule",reverse:!0,enter:xg})}const{hasOwnProperty:Cg}=Object.prototype
function Ag(e,t){let n=e.head,r=t.head
for(;null!==n&&null!==r&&n.data.id===r.data.id;)n=n.next,r=r.next
return null===n&&null===r}function _g(e,t){let n=e.head,r=t.head
for(;null!==n&&null!==r&&n.data.id===r.data.id;)n=n.next,r=r.next
return null===n&&null===r}function zg(e,t){return t.forEach(t=>{const n=t.id
let r=e.head
for(;r;){const e=r.data.id
if(e===n)return
if(e>n)break
r=r.next}e.insert(e.createItem(t),r)}),e}function Tg(e,t){let n=e.head
for(;null!==n;){let e=t.head
for(;null!==e;){if(n.data.compareMarker===e.data.compareMarker)return!0
e=e.next}n=n.next}return!1}function Eg(e){switch(e.type){case"Rule":return Tg(e.prelude.children,this)
case"Atrule":if(e.block)return e.block.children.some(Eg,this)
break
case"Declaration":return!1}return!0}function Og(e,t,n){const r=e.prelude.children,o=e.block.children
n.prevUntil(t.prev,function(i){if("Rule"!==i.type)return Eg.call(r,i)
const a=i.prelude.children,s=i.block.children
if(e.pseudoSignature===i.pseudoSignature){if(Ag(a,r))return s.appendList(o),n.remove(t),!0
if(_g(o,s))return zg(a,r),n.remove(t),!0}return Tg(r,a)})}function Pg(e,t,n){const r=e.prelude.children
for(;r.head!==r.tail;){const o=new cu
o.insert(r.remove(r.head)),n.insert(n.createItem({type:"Rule",loc:e.loc,prelude:{type:"SelectorList",loc:e.prelude.loc,children:o},block:{type:"Block",loc:e.block.loc,children:e.block.children.copy()},pseudoSignature:e.pseudoSignature}),t)}}const Lg=["top","right","bottom","left"],Ng={"margin-top":"top","margin-right":"right","margin-bottom":"bottom","margin-left":"left","padding-top":"top","padding-right":"right","padding-bottom":"bottom","padding-left":"left","border-top-color":"top","border-right-color":"right","border-bottom-color":"bottom","border-left-color":"left","border-top-width":"top","border-right-width":"right","border-bottom-width":"bottom","border-left-width":"left","border-top-style":"top","border-right-style":"right","border-bottom-style":"bottom","border-left-style":"left"},Dg={margin:"margin","margin-top":"margin","margin-right":"margin","margin-bottom":"margin","margin-left":"margin",padding:"padding","padding-top":"padding","padding-right":"padding","padding-bottom":"padding","padding-left":"padding","border-color":"border-color","border-top-color":"border-color","border-right-color":"border-color","border-bottom-color":"border-color","border-left-color":"border-color","border-width":"border-width","border-top-width":"border-width","border-right-width":"border-width","border-bottom-width":"border-width","border-left-width":"border-width","border-style":"border-style","border-top-style":"border-style","border-right-style":"border-style","border-bottom-style":"border-style","border-left-style":"border-style"}
class jg{constructor(e){this.name=e,this.loc=null,this.iehack=void 0,this.sides={top:null,right:null,bottom:null,left:null}}getValueSequence(e,t){const n=[]
let r=""
return!("Value"!==e.value.type||e.value.children.some(function(t){let o=!1
switch(t.type){case"Identifier":switch(t.name){case"\\0":case"\\9":return r=t.name,void 0
case"inherit":case"initial":case"unset":case"revert":o=t.name}break
case"Dimension":switch(t.unit){case"rem":case"vw":case"vh":case"vmin":case"vmax":case"vm":o=t.unit}break
case"Hash":case"Number":case"Percentage":break
case"Function":if("var"===t.name)return!0
o=t.name
break
default:return!0}n.push({node:t,special:o,important:e.important})})||n.length>t)&&(("string"!=typeof this.iehack||this.iehack===r)&&(this.iehack=r,n))}canOverride(e,t){const n=this.sides[e]
return!n||t.important&&!n.important}add(e,t){return!!function(){const n=this.sides,r=Ng[e]
if(r){if(r in n==!1)return!1
const e=this.getValueSequence(t,1)
if(!e||!e.length)return!1
for(const t in n)if(null!==n[t]&&n[t].special!==e[0].special)return!1
return!this.canOverride(r,e[0])||(n[r]=e[0],!0)}if(e===this.name){const e=this.getValueSequence(t,4)
if(!e||!e.length)return!1
switch(e.length){case 1:e[1]=e[0],e[2]=e[0],e[3]=e[0]
break
case 2:e[2]=e[0],e[3]=e[1]
break
case 3:e[3]=e[1]}for(let t=0;t<4;t++)for(const r in n)if(null!==n[r]&&n[r].special!==e[t].special)return!1
for(let t=0;t<4;t++)this.canOverride(Lg[t],e[t])&&(n[Lg[t]]=e[t])
return!0}}.call(this)&&(this.loc||(this.loc=t.loc),!0)}isOkToMinimize(){const e=this.sides.top,t=this.sides.right,n=this.sides.bottom,r=this.sides.left
if(e&&t&&n&&r){const o=e.important+t.important+n.important+r.important
return 0===o||4===o}return!1}getValue(){const e=new cu,t=this.sides,n=[t.top,t.right,t.bottom,t.left],r=[Pf(t.top.node),Pf(t.right.node),Pf(t.bottom.node),Pf(t.left.node)]
r[3]===r[1]&&(n.pop(),r[2]===r[0]&&(n.pop(),r[1]===r[0]&&n.pop()))
for(let t=0;t<n.length;t++)e.appendData(n[t].node)
return this.iehack&&e.appendData({type:"Identifier",loc:null,name:this.iehack}),{type:"Value",loc:null,children:e}}getDeclaration(){return{type:"Declaration",loc:this.loc,important:this.sides.top.important,property:this.name,value:this.getValue()}}}function Mg(e,t,n,r){const o=e.block.children,i=e.prelude.children.first.id
return e.block.children.forEachRight(function(e,a){const s=e.property
if(!Dg.hasOwnProperty(s))return
const l=Dg[s]
let c,u
if(r&&i!==r||l in t&&(u=2,c=t[l]),!(c&&c.add(s,e)||(u=1,c=new jg(l),c.add(s,e))))return r=null,void 0
t[l]=c,n.push({operation:u,block:o,item:a,shorthand:c}),r=i}),r}function Ig(e,t){const n={},r=[]
Df(e,{visit:"Rule",reverse:!0,enter(e){const t=this.block||this.stylesheet,o=(e.pseudoSignature||"")+"|"+e.prelude.children.first.id
let i,a
n.hasOwnProperty(t.id)?i=n[t.id]:(i={lastShortSelector:null},n[t.id]=i),i.hasOwnProperty(o)?a=i[o]:(a={},i[o]=a),i.lastShortSelector=Mg.call(this,e,a,r,i.lastShortSelector)}}),function(e,t){e.forEach(function(e){const n=e.shorthand
n.isOkToMinimize()&&(1===e.operation?e.item.data=t(n.getDeclaration()):e.block.remove(e.item))})}(r,t.declaration)}let Rg=1
const Fg=new Set(["src"]),Bg={display:/table|ruby|flex|-(flex)?box$|grid|contents|run-in/i,"text-align":/^(start|end|match-parent|justify-all)$/i},qg={cursor:["auto","crosshair","default","move","text","wait","help","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","pointer","progress","not-allowed","no-drop","vertical-text","all-scroll","col-resize","row-resize"],overflow:["hidden","visible","scroll","auto"],position:["static","relative","absolute","fixed"]},Gg={"border-width":["border"],"border-style":["border"],"border-color":["border"],"border-top":["border"],"border-right":["border"],"border-bottom":["border"],"border-left":["border"],"border-top-width":["border-top","border-width","border"],"border-right-width":["border-right","border-width","border"],"border-bottom-width":["border-bottom","border-width","border"],"border-left-width":["border-left","border-width","border"],"border-top-style":["border-top","border-style","border"],"border-right-style":["border-right","border-style","border"],"border-bottom-style":["border-bottom","border-style","border"],"border-left-style":["border-left","border-style","border"],"border-top-color":["border-top","border-color","border"],"border-right-color":["border-right","border-color","border"],"border-bottom-color":["border-bottom","border-color","border"],"border-left-color":["border-left","border-color","border"],"margin-top":["margin"],"margin-right":["margin"],"margin-bottom":["margin"],"margin-left":["margin"],"padding-top":["padding"],"padding-right":["padding"],"padding-bottom":["padding"],"padding-left":["padding"],"font-style":["font"],"font-variant":["font"],"font-weight":["font"],"font-size":["font"],"font-family":["font"],"list-style-type":["list-style"],"list-style-position":["list-style"],"list-style-image":["list-style"]}
function Ug(e,t,n){const r=Hu(e).basename
if("background"===r)return e+":"+Pf(t.value)
const o=t.id
let i=n[o]
if(!i){switch(t.value.type){case"Value":const e={}
let n="",o="",a=!1
t.value.children.forEach(function t(i){switch(i.type){case"Value":case"Brackets":case"Parentheses":i.children.forEach(t)
break
case"Raw":a=!0
break
case"Identifier":{const{name:t}=i
n||(n=Xu(t).vendor),/\\[09]/.test(t)&&(o=RegExp.lastMatch),qg.hasOwnProperty(r)?-1===qg[r].indexOf(t)&&(e[t]=!0):Bg.hasOwnProperty(r)&&Bg[r].test(t)&&(e[t]=!0)
break}case"Function":{let{name:r}=i
if(n||(n=Xu(r).vendor),"rect"===r){i.children.some(e=>"Operator"===e.type&&","===e.value)||(r="rect-backward")}e[r+"()"]=!0,i.children.forEach(t)
break}case"Dimension":{const{unit:t}=i
switch(/\\[09]/.test(t)&&(o=RegExp.lastMatch),t){case"rem":case"vw":case"vh":case"vmin":case"vmax":case"vm":e[t]=!0}break}}}),i=a?"!"+Rg++:"!"+Object.keys(e).sort()+"|"+o+n
break
case"Raw":i="!"+t.value.value
break
default:i=Pf(t.value)}n[o]=i}return e+i}function Wg(e,t,n){const r=Hu(t.property)
if(Gg.hasOwnProperty(r.basename)){const o=Gg[r.basename]
for(const i of o){const o=Ug(r.prefix+i,t,n),a=e.hasOwnProperty(o)?e[o]:null
if(a&&(!t.important||a.item.data.important))return a}}}function Vg(e,t,n,r,o){const i=e.block.children
i.forEachRight(function(e,t){const{property:n}=e,a=Ug(n,e,o),s=r[a]
if(s&&!Fg.has(n))e.important&&!s.item.data.important?(r[a]={block:i,item:t},s.block.remove(s.item)):i.remove(t)
else{Wg(r,e,o)?i.remove(t):(e.fingerprint=a,r[a]={block:i,item:t})}}),i.isEmpty&&n.remove(t)}function $g(e){const t={},n=Object.create(null)
Df(e,{visit:"Rule",reverse:!0,enter(e,r,o){const i=this.block||this.stylesheet,a=(e.pseudoSignature||"")+"|"+e.prelude.children.first.id
let s,l
t.hasOwnProperty(i.id)?s=t[i.id]:(s={},t[i.id]=s),s.hasOwnProperty(a)?l=s[a]:(l={},s[a]=l),Vg.call(this,e,r,o,l,n)}})}function Yg(e,t,n){const r=e.prelude.children,o=e.block.children,i=r.first.compareMarker,a={}
n.nextUntil(t.next,function(t,s){if("Rule"!==t.type)return Eg.call(r,t)
if(e.pseudoSignature!==t.pseudoSignature)return!0
const l=t.prelude.children.head,c=t.block.children,u=l.data.compareMarker
if(u in a)return!0
if(r.head===r.tail&&r.first.id===l.data.id)return o.appendList(c),n.remove(s),void 0
if(_g(o,c)){const e=l.data.id
return r.some((t,n)=>{const o=t.id
return e<o?(r.insert(l,n),!0):n.next?void 0:(r.insert(l),!0)}),n.remove(s),void 0}if(u===i)return!0
a[u]=!0})}function Xg(e){return e.reduce((e,t)=>e+t.id.length+1,0)-1}function Hg(e){let t=0
for(const n of e)t+=n.length
return t+e.length-1}function Qg(e,t,n){const r=null!==this.block&&this.block.avoidRulesMerge,o=e.prelude.children,i=e.block,a=Object.create(null)
let s=!0,l=!0
n.prevUntil(t.prev,function(c,u){const h=c.block,d=c.type
if("Rule"!==d){const e=Eg.call(o,c)
return!e&&"Atrule"===d&&h&&Df(h,{visit:"Rule",enter(e){e.prelude.children.forEach(e=>{a[e.compareMarker]=!0})}}),e}if(e.pseudoSignature!==c.pseudoSignature)return!0
const p=c.prelude.children
if(l=!p.some(e=>e.compareMarker in a),!l&&!s)return!0
if(s&&Ag(p,o))return h.children.appendList(i.children),n.remove(t),!0
const m=function(e,t){const n={eq:[],ne1:[],ne2:[],ne2overrided:[]},r=Object.create(null),o=Object.create(null)
for(let e=t.head;e;e=e.next)o[e.data.id]=!0
for(let t=e.head;t;t=t.next){const e=t.data
e.fingerprint&&(r[e.fingerprint]=e.important),o[e.id]?(o[e.id]=!1,n.eq.push(e)):n.ne1.push(e)}for(let e=t.head;e;e=e.next){const t=e.data
o[t.id]&&((!Cg.call(r,t.fingerprint)||!r[t.fingerprint]&&t.important)&&n.ne2.push(t),n.ne2overrided.push(t))}return n}(i.children,h.children)
if(m.eq.length){if(!m.ne1.length&&!m.ne2.length)return l&&(zg(o,p),n.remove(u)),!0
if(!r)if(m.ne1.length&&!m.ne2.length){const e=Xg(o),t=Hg(m.eq)
s&&e<t&&(zg(p,o),i.children.fromArray(m.ne1))}else if(!m.ne1.length&&m.ne2.length){const e=Xg(p),t=Hg(m.eq)
l&&e<t&&(zg(o,p),h.children.fromArray(m.ne2))}else{const r={type:"SelectorList",loc:null,children:zg(p.copy(),o)},a=Xg(r.children)+2
if(Hg(m.eq)>=a){const o=n.createItem({type:"Rule",loc:null,prelude:r,block:{type:"Block",loc:null,children:(new cu).fromArray(m.eq)},pseudoSignature:e.pseudoSignature})
return i.children.fromArray(m.ne1),h.children.fromArray(m.ne2overrided),s?n.insert(o,u):n.insert(o,t),!0}}}s&&(s=!p.some(e=>o.some(t=>t.compareMarker===e.compareMarker))),p.forEach(e=>{a[e.compareMarker]=!0})})}function Kg(e,t){const n=yg(e,t)
t.logger("prepare",e),Sg(e,t),t.logger("mergeAtrule",e),function(e){Df(e,{visit:"Rule",enter:Og})}(e),t.logger("initialMergeRuleset",e),function(e){Df(e,{visit:"Rule",reverse:!0,enter:Pg})}(e),t.logger("disjoinRuleset",e),Ig(e,n),t.logger("restructShorthand",e),$g(e),t.logger("restructBlock",e),function(e){Df(e,{visit:"Rule",enter:Yg})}(e),t.logger("mergeRuleset",e),function(e){Df(e,{visit:"Rule",reverse:!0,enter:Qg})}(e),t.logger("restructRuleset",e)}function Zg(e,t){const n=new cu
let r,o=!1
return e.nextUntil(e.head,(e,i,a)=>{if("Comment"===e.type)return t&&"!"===e.value.charAt(0)?!(!o&&!r)||(a.remove(i),r=e,void 0):(a.remove(i),void 0)
"WhiteSpace"!==e.type&&(o=!0),n.insert(a.remove(i))}),{comment:r,stylesheet:{type:"StyleSheet",loc:null,children:n}}}function Jg(e,t,n,r){r.logger(`Compress block #${n}`,null,!0)
let o=1
return"StyleSheet"===e.type&&(e.firstAtrulesAllowed=t,e.id=o++),Df(e,{visit:"Atrule",enter(e){null!==e.block&&(e.block.id=o++)}}),r.logger("init",e),function(e,t){Df(e,{leave(e,n,r){Qf.hasOwnProperty(e.type)&&Qf[e.type].call(this,e,n,r,t)}})}(e,r),r.logger("clean",e),function(e){Df(e,{leave(e,t,n){dg.hasOwnProperty(e.type)&&dg[e.type].call(this,e,t,n)}})}(e),r.logger("replace",e),r.restructuring&&Kg(e,r),e}function eb(e){return"restructure"in e?e.restructure:!("restructuring"in e)||e.restructuring}function tb(e){const t=Dm(e,!0),n=Dm(e)
return t.length<n.length?t:n}const{lexer:nb,tokenize:rb,parse:ob,generate:ib,walk:ab,find:sb,findLast:lb,findAll:cb,fromPlainObject:ub,toPlainObject:hb}=Bf({node:{String:{generate(e){this.token(5,tb(e.value))}},Url:{generate(e){const t=Zm(e.value),n=tb(e.value)
this.token(7,t.length<=n.length+5?t:"url("+n+")")}}}})
var db=Object.freeze({__proto__:null,compress:function(e,t){e=e||{type:"StyleSheet",loc:null,children:new cu}
const n={logger:"function"==typeof(t=t||{}).logger?t.logger:function(){},restructuring:eb(t),forceMediaMerge:Boolean(t.forceMediaMerge),usage:!!t.usage&&Wf(t.usage)},r=new cu
let o,i,a,s=function(e){let t="comments"in e?e.comments:"exclamation"
return"boolean"==typeof t?t=!!t&&"exclamation":"exclamation"!==t&&"first-exclamation"!==t&&(t=!1),t}(t),l=!0,c=1
var u
t.clone&&(e=Tf(e)),"StyleSheet"===e.type?(o=e.children,e.children=r):(u=e,o=(new cu).appendData({type:"Rule",loc:null,prelude:{type:"SelectorList",loc:null,children:(new cu).appendData({type:"Selector",loc:null,children:(new cu).appendData({type:"TypeSelector",loc:null,name:"x"})})},block:u}))
do{if(i=Zg(o,Boolean(s)),Jg(i.stylesheet,l,c++,n),a=i.stylesheet.children,i.comment&&(r.isEmpty||r.insert(cu.createItem({type:"Raw",value:"\n"})),r.insert(cu.createItem(i.comment)),a.isEmpty||r.insert(cu.createItem({type:"Raw",value:"\n"}))),l&&!a.isEmpty){const e=a.last;("Atrule"!==e.type||"import"!==e.name&&"charset"!==e.name)&&(l=!1)}"exclamation"!==s&&(s=!1),r.appendList(a)}while(!o.isEmpty)
return{ast:e}},find:sb,findAll:cb,findLast:lb,fromPlainObject:ub,generate:ib,lexer:nb,parse:ob,specificity:fg,toPlainObject:hb,tokenize:rb,walk:ab})
const{parse:pb,generate:mb,compress:fb}=db
function gb(e,t,n,r){return t.debug&&console.error(`## ${e} done in %d ms\n`,Date.now()-n),r}function bb(e){return"function"!=typeof(e={...e}).logger&&e.debug&&(e.logger=function(e){let t
return function(n,r){let o=n
if(r&&(o=`[${((Date.now()-t)/1000).toFixed(3)}s] ${o}`),e>1&&r){let t=mb(r)
2===e&&t.length>256&&(t=t.substr(0,256)+"..."),o+=`\n  ${t}\n`}console.error(o),t=Date.now()}}(e.debug)),e}function yb(e,t,n){Array.isArray(n)||(n=[n]),n.forEach(n=>n(e,t))}function kb(e,t,n){const r=(n=n||{}).filename||"<unknown>"
let o
const i=gb("parsing",n,Date.now(),pb(t,{context:e,filename:r,positions:Boolean(n.sourceMap)}))
n.beforeCompress&&gb("beforeCompress",n,Date.now(),yb(i,n,n.beforeCompress))
const a=gb("compress",n,Date.now(),fb(i,bb(n)))
return n.afterCompress&&gb("afterCompress",n,Date.now(),yb(a,n,n.afterCompress)),o=n.sourceMap?gb("generate(sourceMap: true)",n,Date.now(),(()=>{const e=mb(a.ast,{sourceMap:!0})
return e.map._file=r,e.map.setSourceContent(r,t),e})()):gb("generate",n,Date.now(),{css:mb(a.ast),map:null}),o}function vb(e,t){return kb("stylesheet",e,t)}function wb(e,t){return kb("declarationList",e,t)}const xb=ic.skip,Sb=(e,t)=>{const n=[]
e.block.children.forEach(e=>{"Declaration"===e.type&&n.push({name:e.property,value:nc(e.value),important:!0===e.important})})
const r=[]
return ic(e.prelude,e=>{if("Selector"===e.type){const o=Jl(e)
let i=!1
ic(o,(e,t,n)=>{"PseudoClassSelector"===e.type&&(i=!0,n.remove(t))}),r.push({specificity:fg(e),dynamic:i||t,selector:nc(o),declarations:n})}}),r},Cb=(e,t)=>{const n=[],r=tc(e,{parseValue:!1,parseAtrulePrelude:!1})
return ic(r,e=>"Rule"===e.type?(n.push(...Sb(e,t||!1)),xb):"Atrule"===e.type?(["keyframes","-webkit-keyframes","-o-keyframes","-moz-keyframes"].includes(e.name)||ic(e,e=>{if("Rule"===e.type)return n.push(...Sb(e,t||!0)),xb}),xb):void 0),n},Ab=(e,t,n)=>{const r={},o=new Map
for(const[e,n]of Object.entries(t.attributes))Pt.presentation.has(e)&&(r[e]={type:"static",inherited:!1,value:n},o.set(e,!1))
for(const{selector:i,declarations:a,dynamic:s}of e.rules)if(xt(t,i,n))for(const{name:e,value:t,important:n}of a){const i=r[e]
i&&"dynamic"===i.type||(s?r[e]={type:"dynamic",inherited:!1}:null!=i&&!0!==n&&!1!==o.get(e)||(r[e]={type:"static",inherited:!1,value:t},o.set(e,n)))}const i=null==t.attributes.style?[]:(e=>{const t=[],n=tc(e,{context:"declarationList",parseValue:!1})
return ic(n,e=>{"Declaration"===e.type&&t.push({name:e.property,value:nc(e.value),important:!0===e.important})}),t})(t.attributes.style)
for(const{name:e,value:t,important:n}of i){const i=r[e]
i&&"dynamic"===i.type||(null!=i&&!0!==n&&!1!==o.get(e)||(r[e]={type:"static",inherited:!1,value:t},o.set(e,n)))}return r},_b=(e,t)=>{for(let n=0;n<4;n+=1){if(e[n]<t[n])return-1
if(e[n]>t[n])return 1}return 0},zb=e=>{const t=[],r=new Map
return n(e,{element:{enter:(e,n)=>{if(r.set(e,n),"style"===e.name&&(null==e.attributes.type||""===e.attributes.type||"text/css"===e.attributes.type)){const n=null!=e.attributes.media&&"all"!==e.attributes.media
for(const r of e.children)"text"!==r.type&&"cdata"!==r.type||t.push(...Cb(r.value,n))}}}}),t.sort((e,t)=>_b(e.specificity,t.specificity)),{rules:t,parents:r}},Tb=(e,t)=>{const{parents:n}=e,r=Ab(e,t,n)
let o=n.get(t)
for(;null!=o&&"root"!==o.type;){const t=Ab(e,o,n)
for(const[e,n]of Object.entries(t))null==r[e]&&It.has(e)&&!Rt.has(e)&&(r[e]={...n,inherited:!0})
o=n.get(o)}return r},Eb=(e,t,n=null,r=!1)=>{const o=ye("string"==typeof e?e:nc(e.data))
for(const e of o){if(e.some((o,i)=>{if(r){if(i===e.length-1)return!1
if(!de(e[i+1]))return!1}return"attribute"===o.type&&o.name===t&&(null==n||o.value===n)}))return!0}return!1}
function Ob(e,t,n,r){t&&(t.safe&&t.safe.forEach(t=>{r.has(t)||delete e.attributes[t]}),n.removeUnsafe&&t.unsafe&&t.unsafe.forEach(t=>{r.has(t)||delete e.attributes[t]}))}var Pb=Object.freeze({__proto__:null,description:"removes deprecated attributes",fn:function(e,t){const n=function(e){const t=new Set
return e.rules.forEach(e=>{ye(e.selector).forEach(e=>{e.forEach(e=>{"attribute"===e.type&&t.add(e.name)})})}),t}(zb(e))
return{element:{enter:e=>{const r=Dt[e.name]
r&&(r.attrsGroups.has("core")&&e.attributes["xml:lang"]&&!n.has("xml:lang")&&e.attributes.lang&&delete e.attributes["xml:lang"],r.attrsGroups.forEach(r=>{Ob(e,Nt[r],t,n)}),Ob(e,r.deprecated,t,n))}}}},name:"removeDeprecatedAttrs"})
var Lb=Object.freeze({__proto__:null,description:"removes <metadata>",fn:()=>({element:{enter:(e,t)=>{"metadata"===e.name&&St(e,t)}}}),name:"removeMetadata"})
var Nb=Object.freeze({__proto__:null,description:"removes editors namespaces, elements and attributes",fn:(e,t)=>{let n=[...jt]
Array.isArray(t.additionalNamespaces)&&(n=[...jt,...t.additionalNamespaces])
const r=[]
return{element:{enter:(e,t)=>{if("svg"===e.name)for(const[t,o]of Object.entries(e.attributes))t.startsWith("xmlns:")&&n.includes(o)&&(r.push(t.slice(6)),delete e.attributes[t])
for(const t of Object.keys(e.attributes))if(t.includes(":")){const[n]=t.split(":")
r.includes(n)&&delete e.attributes[t]}if(e.name.includes(":")){const[n]=e.name.split(":")
r.includes(n)&&St(e,t)}}}}},name:"removeEditorsNSData"})
const Db=/(\S)\r?\n(\S)/g,jb=/\r?\n/g,Mb=/\s{2,}/g
var Ib=Object.freeze({__proto__:null,description:"cleanups attributes from newlines, trailing and repeating spaces",fn:(e,t)=>{const{newlines:n=!0,trim:r=!0,spaces:o=!0}=t
return{element:{enter:e=>{for(const t of Object.keys(e.attributes))n&&(e.attributes[t]=e.attributes[t].replace(Db,(e,t,n)=>t+" "+n),e.attributes[t]=e.attributes[t].replace(jb,"")),r&&(e.attributes[t]=e.attributes[t].trim()),o&&(e.attributes[t]=e.attributes[t].replace(Mb," "))}}}},name:"cleanupAttrs"})
var Rb=Object.freeze({__proto__:null,description:"merge multiple style elements into one",fn:()=>{let e=null,n="",r="text"
return{element:{enter:(o,i)=>{if("foreignObject"===o.name)return t
if("style"!==o.name)return
if(null!=o.attributes.type&&""!==o.attributes.type&&"text/css"!==o.attributes.type)return
let a=""
for(const e of o.children)"text"===e.type&&(a+=e.value),"cdata"===e.type&&(r="cdata",a+=e.value)
if(0===a.trim().length)return St(o,i),void 0
if(null==o.attributes.media?n+=a:(n+=`@media ${o.attributes.media}{${a}}`,delete o.attributes.media),null==e)e=o
else{St(o,i)
const t={type:r,value:n}
e.children=[t]}}}}},name:"mergeStyles"})
const Fb=[...Gt.functional,...Gt.treeStructural]
var Bb=Object.freeze({__proto__:null,description:"inline styles (additional options)",fn:(e,n)=>{const{onlyMatchedOnce:r=!0,removeMatchedSelectors:o=!0,useMqs:i=["","screen"],usePseudos:a=[""]}=n,s=[],l=[]
return{element:{enter:(e,n)=>{if("foreignObject"===e.name)return t
if("style"!==e.name||0===e.children.length)return
if(null!=e.attributes.type&&""!==e.attributes.type&&"text/css"!==e.attributes.type)return
const r=e.children.filter(e=>"text"===e.type||"cdata"===e.type).map(e=>e.value).join("")
let o=null
try{o=tc(r,{parseValue:!1,parseCustomProperty:!1})}catch{return}"StyleSheet"===o.type&&s.push({node:e,parentNode:n,cssAst:o}),ic(o,{visit:"Rule",enter(e){const t=this.atrule
let n=""
null!=t&&(n=t.name,null!=t.prelude&&(n+=` ${nc(t.prelude)}`)),i.includes(n)&&"SelectorList"===e.prelude.type&&e.prelude.children.forEach((t,n)=>{if("Selector"===t.type){const r=[]
t.children.forEach((e,t,n)=>{("PseudoClassSelector"===e.type||"PseudoElementSelector"===e.type)&&!Fb.includes(e.name)&&r.push({item:t,list:n})})
const o=nc({type:"Selector",children:(new Un).fromArray(r.map(e=>e.item.data))})
if(a.includes(o))for(const e of r)e.list.remove(e.item)
l.push({node:t,rule:e,item:n})}})}})}},root:{exit:()=>{if(0===s.length)return
const t=l.slice().sort((e,t)=>{const n=fg(e.item.data),r=fg(t.item.data)
return _b(n,r)}).reverse()
for(const n of t){const t=nc(n.item.data),i=[]
try{for(const n of vt(e,t))"element"===n.type&&i.push(n)}catch{continue}if(0!==i.length&&!(r&&i.length>1)){for(const e of i){const t=tc(e.attributes.style??"",{context:"declarationList",parseValue:!1})
if("DeclarationList"!==t.type)continue
const r=new Map
let o
ic(t,{visit:"Declaration",enter(e,t){null==o&&(o=t),r.set(e.property.toLowerCase(),t)}}),ic(n.rule,{visit:"Declaration",enter(n){const i=n.property
Pt.presentation.has(i)&&!l.some(e=>Eb(e.item,i))&&delete e.attributes[i]
const a=r.get(i),s=t.children.createItem(n)
null==a?t.children.insert(s,o):!0!==a.data.important&&!0===n.important&&(t.children.replace(a,s),r.set(i,s))}})
const i=nc(t)
0!==i.length&&(e.attributes.style=i)}o&&0!==i.length&&"SelectorList"===n.rule.prelude.type&&n.rule.prelude.children.remove(n.item),n.matchedElements=i}}if(o){for(const e of t)if(null!=e.matchedElements&&!(r&&e.matchedElements.length>1))for(const t of e.matchedElements){const n=new Set(null==t.attributes.class?null:t.attributes.class.split(" "))
for(const t of e.node.children)"ClassSelector"!==t.type||l.some(e=>Eb(e.item,"class",t.name,!0))||n.delete(t.name)
0===n.size?delete t.attributes.class:t.attributes.class=Array.from(n).join(" ")
const r=e.node.children.first
"IdSelector"!==r?.type||t.attributes.id!==r.name||l.some(e=>Eb(e.item,"id",r.name,!0))||delete t.attributes.id}for(const e of s)if(ic(e.cssAst,{visit:"Rule",enter:function(e,t,n){"Rule"===e.type&&"SelectorList"===e.prelude.type&&e.prelude.children.isEmpty&&n.remove(t)}}),e.cssAst.children.isEmpty)St(e.node,e.parentNode)
else{const t=e.node.children[0]
"text"!==t.type&&"cdata"!==t.type||(t.value=nc(e.cssAst))}}}}}},name:"inlineStyles"})
const qb=/\burl\((["'])?#(.+?)\1\)/g,Gb=/^#(.+?)$/,Ub=/(\w+)\.[a-zA-Z]/,Wb=(e,t)=>{let n,r,o=""
return e.forEach((e,i)=>{n=" ",0==i&&(n=""),t.noSpaceAfterFlags
const a=t.leadingZero?Vb(e):e.toString()
t.negativeExtraSpace&&""!=n&&(e<0||"."===a.charAt(0)&&r%1!=0)&&(n=""),r=e,o+=n+a}),o},Vb=e=>{const t=e.toString()
return 0<e&&e<1&&t.startsWith("0")?t.slice(1):-1<e&&e<0&&"0"===t[1]?t[0]+t.slice(2):t},$b=e=>{if("script"===e.name&&0!==e.children.length)return!0
if("a"===e.name){if(Object.entries(e.attributes).some(([e,t])=>("href"===e||e.endsWith(":href"))&&null!=t&&t.trimStart().startsWith("javascript:")))return!0}return[...Pt.animationEvent,...Pt.documentEvent,...Pt.documentElementEvent,...Pt.globalEvent,...Pt.graphicalEvent].some(t=>null!=e.attributes[t])},Yb=e=>new RegExp(qb).test(e),Xb=(e,t)=>{const n=[]
if(Mt.has(e)){const e=t.matchAll(qb)
for(const t of e)n.push(t[2])}if("href"===e||e.endsWith(":href")){const e=Gb.exec(t)
null!=e&&n.push(e[1])}if("begin"===e){const e=Ub.exec(t)
null!=e&&n.push(e[1])}return n.map(e=>decodeURI(e))},Hb=(e,t)=>{const n=10**t
return Math.round(e*n)/n}
var Qb=Object.freeze({__proto__:null,description:"minifies styles and removes unused styles",fn:(e,{usage:t,...n})=>{const r=new Map,o=[],i=new Set,a=new Set,s=new Set
let l=!0,c=!0,u=!0,h=!1
"boolean"==typeof t?(l=t,c=t,u=t):t&&(l=null==t.tags||t.tags,c=null==t.ids||t.ids,u=null==t.classes||t.classes,h=null!=t.force&&t.force)
let d=!1
return{element:{enter:(e,t)=>{if($b(e)&&(d=!0),i.add(e.name),null!=e.attributes.id&&a.add(e.attributes.id),null!=e.attributes.class)for(const t of e.attributes.class.split(/\s+/))s.add(t)
"style"===e.name&&0!==e.children.length?r.set(e,t):null!=e.attributes.style&&o.push(e)}},root:{exit:()=>{const e={}
d&&!h||(l&&(e.tags=Array.from(i)),c&&(e.ids=Array.from(a)),u&&(e.classes=Array.from(s)))
for(const[t,o]of r.entries())if("text"===t.children[0].type||"cdata"===t.children[0].type){const r=t.children[0].value,i=vb(r,{...n,usage:e}).css
if(0===i.length){St(t,o)
continue}r.indexOf(">")>=0||r.indexOf("<")>=0?(t.children[0].type="cdata",t.children[0].value=i):(t.children[0].type="text",t.children[0].value=i)}for(const e of o){const t=e.attributes.style
e.attributes.style=wb(t,{...n}).css}}}}},name:"minifyStyles"})
const Kb=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],Zb=Kb.length-1,Jb=e=>{if(null==e)return[0]
e[e.length-1]+=1
for(let t=e.length-1;t>0;t--)e[t]>Zb&&(e[t]=0,void 0!==e[t-1]&&e[t-1]++)
return e[0]>Zb&&(e[0]=0,e.unshift(0)),e},ey=e=>e.map(e=>Kb[e]).join("")
var ty=Object.freeze({__proto__:null,description:"removes unused IDs and minifies used",fn:(e,n)=>{const{remove:r=!0,minify:o=!0,preserve:i=[],preservePrefixes:a=[],force:s=!1}=n,l=new Set(Array.isArray(i)?i:i?[i]:[]),c=Array.isArray(a)?a:a?[a]:[],u=new Map,h=new Map
let d=!1
return{element:{enter:e=>{if(!s){if("style"===e.name&&0!==e.children.length||$b(e))return d=!0,void 0
if("svg"===e.name){let n=!0
for(const t of e.children)if("element"!==t.type||"defs"!==t.name){n=!1
break}if(n)return t}}for(const[t,n]of Object.entries(e.attributes))if("id"===t){const t=n
u.has(t)?delete e.attributes.id:u.set(t,e)}else{const r=Xb(t,n)
for(const n of r){let r=h.get(n)
null==r&&(r=[],h.set(n,r)),r.push({element:e,name:t})}}}},root:{exit:()=>{if(d)return
const e=e=>l.has(e)||((e,t)=>{for(const n of t)if(e.startsWith(n))return!0
return!1})(e,c)
let t=null
for(const[n,r]of h){const i=u.get(n)
if(null!=i){if(o&&!1===e(n)){let o
do{t=Jb(t),o=ey(t)}while(e(o)||h.has(o)&&null==u.get(o))
i.attributes.id=o
for(const{element:e,name:t}of r){const r=e.attributes[t]
r.includes("#")?e.attributes[t]=r.replace(`#${encodeURI(n)}`,`#${o}`).replace(`#${n}`,`#${o}`):e.attributes[t]=r.replace(`${n}.`,`${o}.`)}}u.delete(n)}}if(r)for(const[t,n]of u)!1===e(t)&&delete n.attributes.id}}}},name:"cleanupIds"})
const ny=(e,t)=>{for(const n of e.children)"element"===n.type&&(null!=n.attributes.id||"style"===n.name?t.push(n):ny(n,t))}
var ry=Object.freeze({__proto__:null,description:"removes elements in <defs> without id",fn:()=>({element:{enter:(e,t)=>{if("defs"===e.name||Tt.nonRendering.has(e.name)&&null==e.attributes.id){const n=[]
ny(e,n),0===n.length&&St(e,t),e.children=n}}}}),name:"removeUselessDefs"})
const oy=/^([-+]?\d*\.?\d+([eE][-+]?\d+)?)(px|pt|pc|mm|cm|m|in|ft|em|ex|%)?$/,iy={cm:96/2.54,mm:96/25.4,in:96,pt:4/3,pc:16,px:1}
var ay=Object.freeze({__proto__:null,description:'rounds numeric values to the fixed precision, removes default "px" units',fn:(e,t)=>{const{floatPrecision:n=3,leadingZero:r=!0,defaultPx:o=!0,convertToPx:i=!0}=t
return{element:{enter:e=>{if(null!=e.attributes.viewBox){const t=e.attributes.viewBox.trim().split(/(?:\s,?|,)\s*/g)
e.attributes.viewBox=t.map(e=>{const t=Number(e)
return Number.isNaN(t)?e:Number(t.toFixed(n))}).join(" ")}for(const[t,a]of Object.entries(e.attributes)){if("version"===t)continue
const s=oy.exec(a)
if(s){let a=Number(Number(s[1]).toFixed(n))
let l,c=s[3]||""
if(i&&""!==c&&c in iy){const e=Number((iy[c]*Number(s[1])).toFixed(n))
e.toString().length<s[0].length&&(a=e,c="px")}l=r?Vb(a):a.toString(),o&&"px"===c&&(c=""),e.attributes[t]=l+c}}}}}},name:"cleanupNumericValues"})
const sy="([+-]?(?:\\d*\\.\\d+|\\d+\\.?)%?)",ly="(?:\\s*,\\s*|\\s+)",cy=new RegExp("^rgb\\(\\s*"+sy+ly+sy+ly+sy+"\\s*\\)$"),uy=/^#(([a-fA-F0-9])\2){3}$/,hy=([e,t,n])=>"#"+((256+e<<8|t)<<8|n).toString(16).slice(1).toUpperCase()
var dy=Object.freeze({__proto__:null,description:"converts colors: rgb() to #rrggbb and #rrggbb to #rgb",fn:(e,t)=>{const{currentColor:n=!1,names2hex:r=!0,rgb2hex:o=!0,convertCase:i="lower",shorthex:a=!0,shortname:s=!0}=t
let l=0
return{element:{enter:e=>{"mask"===e.name&&l++
for(const[t,c]of Object.entries(e.attributes))if(qt.has(t)){let u=c
if(n&&0===l){let e
e="string"==typeof n?u===n:n instanceof RegExp?null!=n.exec(u):"none"!==u,e&&(u="currentColor")}if(r){const e=u.toLowerCase()
null!=Ft[e]&&(u=Ft[e])}if(o){const e=u.match(cy)
if(null!=e){const t=e.slice(1,4).map(e=>{let t
return t=e.indexOf("%")>-1?Math.round(2.55*parseFloat(e)):Number(e),Math.max(0,Math.min(t,255))})
u=hy(t)}}if(i&&!Yb(u)&&"currentColor"!==u&&("lower"===i?u=u.toLowerCase():"upper"===i&&(u=u.toUpperCase())),a){const e=uy.exec(u)
null!=e&&(u="#"+e[0][1]+e[0][3]+e[0][5])}if(s){const e=u.toLowerCase()
null!=Bt[e]&&(u=Bt[e])}e.attributes[t]=u}},exit:e=>{"mask"===e.name&&l--}}}},name:"convertColors"})
const py=new Map,my=new Map,fy=new Map
for(const[e,t]of Object.entries(Dt)){const n=new Set
if(t.content)for(const e of t.content)n.add(e)
if(t.contentGroups)for(const e of t.contentGroups){const t=Tt[e]
if(t)for(const e of t)n.add(e)}const r=new Set
if(t.attrs)for(const e of t.attrs)r.add(e)
const o=new Map
if(t.defaults)for(const[e,n]of Object.entries(t.defaults))o.set(e,n)
for(const e of t.attrsGroups){const t=Pt[e]
if(t)for(const e of t)r.add(e)
const n=Lt[e]
if(n)for(const[e,t]of Object.entries(n))o.set(e,t)}py.set(e,n),my.set(e,r),fy.set(e,o)}var gy=Object.freeze({__proto__:null,description:"removes unknown elements content and attributes, removes attrs with default values",fn:(e,n)=>{const{unknownContent:r=!0,unknownAttrs:o=!0,defaultAttrs:i=!0,defaultMarkupDeclarations:a=!0,uselessOverrides:s=!0,keepDataAttrs:l=!0,keepAriaAttrs:c=!0,keepRoleAttr:u=!1}=n,h=zb(e)
return{instruction:{enter:e=>{a&&(e.value=e.value.replace(/\s*standalone\s*=\s*(["'])no\1/,""))}},element:{enter:(e,n)=>{if(e.name.includes(":"))return
if("foreignObject"===e.name)return t
if(r&&"element"===n.type){const t=py.get(n.name)
if(null==t||0===t.size){if(null==py.get(e.name))return St(e,n),void 0}else if(!1===t.has(e.name))return St(e,n),void 0}const a=my.get(e.name),d=fy.get(e.name),p="element"===n.type?Tb(h,n):null
for(const[t,n]of Object.entries(e.attributes))if(!(l&&t.startsWith("data-")||c&&t.startsWith("aria-")||u&&"role"===t||"xmlns"===t)){if(t.includes(":")){const[e]=t.split(":")
if("xml"!==e&&"xlink"!==e)continue}if(o&&a&&!1===a.has(t)&&delete e.attributes[t],i&&null==e.attributes.id&&d&&d.get(t)===n&&null==p?.[t]&&delete e.attributes[t],s&&null==e.attributes.id){const r=p?.[t]
!1===Rt.has(t)&&null!=r&&"static"===r.type&&r.value===n&&delete e.attributes[t]}}}}}},name:"removeUnknownsAndDefaults"})
var by=Object.freeze({__proto__:null,description:"removes non-inheritable group's presentational attributes",fn:()=>({element:{enter:e=>{if("g"===e.name)for(const t of Object.keys(e.attributes))!Pt.presentation.has(t)||It.has(t)||Rt.has(t)||delete e.attributes[t]}}}),name:"removeNonInheritableGroupAttrs"})
var yy=Object.freeze({__proto__:null,description:"removes useless stroke and fill attributes",fn:(e,r)=>{const{stroke:o=!0,fill:i=!0,removeNone:a=!1}=r
let s=!1
if(n(e,{element:{enter:e=>{("style"===e.name||$b(e))&&(s=!0)}}}),s)return null
const l=zb(e)
return{element:{enter:(e,n)=>{if(null!=e.attributes.id)return t
if(!Tt.shape.has(e.name))return
const r=Tb(l,e),s=r.stroke,c=r["stroke-opacity"],u=r["stroke-width"],h=r["marker-end"],d=r.fill,p=r["fill-opacity"],m="element"===n.type?Tb(l,n):null,f=null==m?null:m.stroke
if(o&&(null==s||"static"===s.type&&"none"==s.value||null!=c&&"static"===c.type&&"0"===c.value||null!=u&&"static"===u.type&&"0"===u.value)&&(null!=u&&"static"===u.type&&"0"===u.value||null==h)){for(const t of Object.keys(e.attributes))t.startsWith("stroke")&&delete e.attributes[t]
null!=f&&"static"===f.type&&"none"!==f.value&&(e.attributes.stroke="none")}if(i&&(null!=d&&"static"===d.type&&"none"===d.value||null!=p&&"static"===p.type&&"0"===p.value)){for(const t of Object.keys(e.attributes))t.startsWith("fill-")&&delete e.attributes[t];(null==d||"static"===d.type&&"none"!==d.value)&&(e.attributes.fill="none")}a&&(null!=s&&"none"!==e.attributes.stroke||(null==d||"static"!==d.type||"none"!==d.value)&&"none"!==e.attributes.fill||St(e,n))}}}},name:"removeUselessStrokeAndFill"})
const ky=/^new\s0\s0\s([-+]?\d*\.?\d+([eE][-+]?\d+)?)\s([-+]?\d*\.?\d+([eE][-+]?\d+)?)$/,vy=(e,t,n,r)=>{const o=ky.exec(e)
return null!=o&&n===o[1]&&r===o[3]?"svg"===t?void 0:"new":e}
var wy=Object.freeze({__proto__:null,description:"remove or cleanup enable-background attribute when possible",fn:e=>{let t=!1
return n(e,{element:{enter:e=>{"filter"===e.name&&(t=!0)}}}),{element:{enter:e=>{let n=null,r=null
if(null!=e.attributes.style&&(n=tc(e.attributes.style,{context:"declarationList"}),"DeclarationList"===n.type)){const e=[]
ic(n,(t,n)=>{"Declaration"===t.type&&"enable-background"===t.property&&(e.push(n),r=n)})
for(let t=0;t<e.length-1;t++)n.children.remove(e[t])}if(!t)return delete e.attributes["enable-background"],"DeclarationList"===n?.type&&(r&&n.children.remove(r),n.children.isEmpty?delete e.attributes.style:e.attributes.style=nc(n)),void 0
const o=null!=e.attributes.width&&null!=e.attributes.height
if(("svg"===e.name||"mask"===e.name||"pattern"===e.name)&&o){const t=e.attributes["enable-background"],o=vy(t,e.name,e.attributes.width,e.attributes.height)
if(o?e.attributes["enable-background"]=o:delete e.attributes["enable-background"],"DeclarationList"===n?.type&&r){const t=nc(r.data.value),o=vy(t,e.name,e.attributes.width,e.attributes.height)
o?r.data.value={type:"Raw",value:o}:n.children.remove(r)}}"DeclarationList"===n?.type&&(n.children.isEmpty?delete e.attributes.style:e.attributes.style=nc(n))}}}},name:"cleanupEnableBackground"})
const xy={M:2,m:2,Z:0,z:0,L:2,l:2,H:1,h:1,V:1,v:1,C:6,c:6,S:4,s:4,Q:4,q:4,T:2,t:2,A:7,a:7},Sy=e=>e in xy,Cy=e=>" "===e||"\t"===e||"\r"===e||"\n"===e,Ay=e=>{const t=e.codePointAt(0)
return null!=t&&(48<=t&&t<=57)},_y=(e,t)=>{let n=t,r="",o="none"
for(;n<e.length;n+=1){const t=e[n]
if("+"===t||"-"===t){if("none"===o){o="sign",r+=t
continue}if("e"===o){o="exponent_sign",r+=t
continue}}if(Ay(t)){if("none"===o||"sign"===o||"whole"===o){o="whole",r+=t
continue}if("decimal_point"===o||"decimal"===o){o="decimal",r+=t
continue}if("e"===o||"exponent_sign"===o||"exponent"===o){o="exponent",r+=t
continue}}if("."!==t||"none"!==o&&"sign"!==o&&"whole"!==o){if("E"!==t&&"e"!=t||"whole"!==o&&"decimal_point"!==o&&"decimal"!==o)break
o="e",r+=t}else o="decimal_point",r+=t}const i=Number.parseFloat(r)
return Number.isNaN(i)?[t,null]:[n-1,i]},zy=e=>{const t=[]
let n=null,r=[],o=0,i=!1,a=!1
for(let s=0;s<e.length;s+=1){const l=e.charAt(s)
if(Cy(l))continue
if(i&&","===l){if(a)break
a=!0
continue}if(Sy(l)){if(a)return t
if(null==n){if("M"!==l&&"m"!==l)return t}else if(0!==r.length)return t
n=l,r=[],o=xy[n],i=!1,0===o&&t.push({command:n,args:r})
continue}if(null==n)return t
let c=s,u=null
if("A"===n||"a"===n){const t=r.length
0!==t&&1!==t||"+"!==l&&"-"!==l&&([c,u]=_y(e,s)),2!==t&&5!==t&&6!==t||([c,u]=_y(e,s)),3!==t&&4!==t||("0"===l&&(u=0),"1"===l&&(u=1))}else[c,u]=_y(e,s)
if(null==u)return t
r.push(u),i=!0,a=!1,s=c,r.length===o&&(t.push({command:n,args:r}),"M"===n&&(n="L"),"m"===n&&(n="l"),r=[])}return t},Ty=(e,t)=>(null!=t&&(e=Hb(e,t)),{roundedStr:Vb(e),rounded:e}),Ey=(e,t,n,r)=>{let o,i=""
for(let a=0;a<t.length;a++){const{roundedStr:s,rounded:l}=Ty(t[a],n)
!r||"A"!==e&&"a"!==e||a%7!=4&&a%7!=5?0===a||l<0?i+=s:Number.isInteger(o)||Ay(s[0])?i+=` ${s}`:i+=s:i+=s,o=l}return i},Oy=({pathData:e,precision:t,disableSpaceAfterFlags:n})=>{if(1===e.length){const{command:r,args:o}=e[0]
return r+Ey(r,o,t,n)}let r="",o={...e[0]}
"L"===e[1].command?o.command="M":"l"===e[1].command&&(o.command="m")
for(let i=1;i<e.length;i++){const{command:a,args:s}=e[i]
o.command===a&&"M"!==o.command&&"m"!==o.command||"M"===o.command&&"L"===a||"m"===o.command&&"l"===a?(o.args=[...o.args,...s],i===e.length-1&&(r+=o.command+Ey(o.command,o.args,t,n))):(r+=o.command+Ey(o.command,o.args,t,n),i===e.length-1?r+=a+Ey(a,s,t,n):o={command:a,args:s})}return r},Py=Tt.nonRendering
var Ly=Object.freeze({__proto__:null,description:"removes hidden elements (zero sized, with absent attributes)",fn:(e,r)=>{const{isHidden:o=!0,displayNone:i=!0,opacity0:a=!0,circleR0:s=!0,ellipseRX0:l=!0,ellipseRY0:c=!0,rectWidth0:u=!0,rectHeight0:h=!0,patternWidth0:d=!0,patternHeight0:p=!0,imageWidth0:m=!0,imageHeight0:f=!0,pathEmptyD:g=!0,polylineEmptyPoints:b=!0,polygonEmptyPoints:y=!0}=r,k=zb(e),v=new Map,w=new Set,x=new Map,S=new Set,C=new Map
let A=!1
function _(e){if(S.has(e.attributes.id))return!1
for(const t of e.children)if("element"===t.type&&!_(t))return!1
return!0}function z(e,t){"element"===e.type&&null!=e.attributes.id&&"element"===t.type&&"defs"===t.name&&w.add(e.attributes.id),St(e,t)}return n(e,{element:{enter:(e,n)=>{if(Py.has(e.name))return v.set(e,n),t
const r=Tb(k,e)
if(a&&r.opacity&&"static"===r.opacity.type&&"0"===r.opacity.value){if("path"===e.name)return v.set(e,n),t
z(e,n)}}}}),{element:{enter:(e,t)=>{if("style"===e.name&&0!==e.children.length||$b(e))return A=!0,void 0
if("defs"===e.name&&x.set(e,t),"use"===e.name)for(const n of Object.keys(e.attributes)){if("href"!==n&&!n.endsWith(":href"))continue
const r=e.attributes[n].slice(1)
let o=C.get(r)
o||(o=[],C.set(r,o)),o.push({node:e,parentNode:t})}const n=Tb(k,e)
if(o&&n.visibility&&"static"===n.visibility.type&&"hidden"===n.visibility.value&&null==wt(e,"[visibility=visible]"))return z(e,t),void 0
if(i&&n.display&&"static"===n.display.type&&"none"===n.display.value&&"marker"!==e.name)return z(e,t),void 0
if(s&&"circle"===e.name&&0===e.children.length&&"0"===e.attributes.r)return z(e,t),void 0
if(l&&"ellipse"===e.name&&0===e.children.length&&"0"===e.attributes.rx)return z(e,t),void 0
if(c&&"ellipse"===e.name&&0===e.children.length&&"0"===e.attributes.ry)return z(e,t),void 0
if(u&&"rect"===e.name&&0===e.children.length&&"0"===e.attributes.width)return z(e,t),void 0
if(h&&u&&"rect"===e.name&&0===e.children.length&&"0"===e.attributes.height)return z(e,t),void 0
if(d&&"pattern"===e.name&&"0"===e.attributes.width)return z(e,t),void 0
if(p&&"pattern"===e.name&&"0"===e.attributes.height)return z(e,t),void 0
if(m&&"image"===e.name&&"0"===e.attributes.width)return z(e,t),void 0
if(f&&"image"===e.name&&"0"===e.attributes.height)return z(e,t),void 0
if(g&&"path"===e.name){if(null==e.attributes.d)return z(e,t),void 0
const r=zy(e.attributes.d)
if(0===r.length)return z(e,t),void 0
if(1===r.length&&null==n["marker-start"]&&null==n["marker-end"])return z(e,t),void 0}if(b&&"polyline"===e.name&&null==e.attributes.points)return z(e,t),void 0
if(y&&"polygon"===e.name&&null==e.attributes.points)return z(e,t),void 0
for(const[t,n]of Object.entries(e.attributes)){const e=Xb(t,n)
for(const t of e)S.add(t)}}},root:{exit:()=>{for(const e of w){const t=C.get(e)
if(t)for(const{node:e,parentNode:n}of t)St(e,n)}if(!A)for(const[e,t]of v.entries())_(e)&&St(e,t)
for(const[e,t]of x.entries())0===e.children.length&&St(e,t)}}}},name:"removeHiddenElems"})
var Ny=Object.freeze({__proto__:null,description:"removes empty <text> elements",fn:(e,t)=>{const{text:n=!0,tspan:r=!0,tref:o=!0}=t
return{element:{enter:(e,t)=>{n&&"text"===e.name&&0===e.children.length&&St(e,t),r&&"tspan"===e.name&&0===e.children.length&&St(e,t),o&&"tref"===e.name&&null==e.attributes["xlink:href"]&&St(e,t)}}}},name:"removeEmptyText"})
const Dy=/[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g
var jy=Object.freeze({__proto__:null,description:"converts basic shapes to more compact path form",fn:(e,t)=>{const{convertArcs:n=!1,floatPrecision:r}=t
return{element:{enter:(e,t)=>{if("rect"===e.name&&null!=e.attributes.width&&null!=e.attributes.height&&null==e.attributes.rx&&null==e.attributes.ry){const t=Number(e.attributes.x||"0"),n=Number(e.attributes.y||"0"),o=Number(e.attributes.width),i=Number(e.attributes.height)
if(Number.isNaN(t-n+o-i))return
const a=[{command:"M",args:[t,n]},{command:"H",args:[t+o]},{command:"V",args:[n+i]},{command:"H",args:[t]},{command:"z",args:[]}]
e.name="path",e.attributes.d=Oy({pathData:a,precision:r}),delete e.attributes.x,delete e.attributes.y,delete e.attributes.width,delete e.attributes.height}if("line"===e.name){const t=Number(e.attributes.x1||"0"),n=Number(e.attributes.y1||"0"),o=Number(e.attributes.x2||"0"),i=Number(e.attributes.y2||"0")
if(Number.isNaN(t-n+o-i))return
const a=[{command:"M",args:[t,n]},{command:"L",args:[o,i]}]
e.name="path",e.attributes.d=Oy({pathData:a,precision:r}),delete e.attributes.x1,delete e.attributes.y1,delete e.attributes.x2,delete e.attributes.y2}if(("polyline"===e.name||"polygon"===e.name)&&null!=e.attributes.points){const n=(e.attributes.points.match(Dy)||[]).map(Number)
if(n.length<4)return St(e,t),void 0
const o=[]
for(let e=0;e<n.length;e+=2)o.push({command:0===e?"M":"L",args:n.slice(e,e+2)})
"polygon"===e.name&&o.push({command:"z",args:[]}),e.name="path",e.attributes.d=Oy({pathData:o,precision:r}),delete e.attributes.points}if("circle"===e.name&&n){const t=Number(e.attributes.cx||"0"),n=Number(e.attributes.cy||"0"),o=Number(e.attributes.r||"0")
if(Number.isNaN(t-n+o))return
const i=[{command:"M",args:[t,n-o]},{command:"A",args:[o,o,0,1,0,t,n+o]},{command:"A",args:[o,o,0,1,0,t,n-o]},{command:"z",args:[]}]
e.name="path",e.attributes.d=Oy({pathData:i,precision:r}),delete e.attributes.cx,delete e.attributes.cy,delete e.attributes.r}if("ellipse"===e.name&&n){const t=Number(e.attributes.cx||"0"),n=Number(e.attributes.cy||"0"),o=Number(e.attributes.rx||"0"),i=Number(e.attributes.ry||"0")
if(Number.isNaN(t-n+o-i))return
const a=[{command:"M",args:[t,n-i]},{command:"A",args:[o,i,0,1,0,t,n+i]},{command:"A",args:[o,i,0,1,0,t,n-i]},{command:"z",args:[]}]
e.name="path",e.attributes.d=Oy({pathData:a,precision:r}),delete e.attributes.cx,delete e.attributes.cy,delete e.attributes.rx,delete e.attributes.ry}}}}},name:"convertShapeToPath"})
var My=Object.freeze({__proto__:null,description:"converts non-eccentric <ellipse>s to <circle>s",fn:()=>({element:{enter:e=>{if("ellipse"===e.name){const t=e.attributes.rx||"0",n=e.attributes.ry||"0"
if(t===n||"auto"===t||"auto"===n){e.name="circle"
const r="auto"===t?n:t
delete e.attributes.rx,delete e.attributes.ry,e.attributes.r=r}}}}}),name:"convertEllipseToCircle"})
var Iy=Object.freeze({__proto__:null,description:"Move common attributes of group children to the group",fn:e=>{let t=!1
return n(e,{element:{enter:e=>{"style"===e.name&&(t=!0)}}}),{element:{exit:e=>{if("g"!==e.name||e.children.length<=1)return
if(t)return
const n=new Map
let r=!0,o=!0
for(const t of e.children)if("element"===t.type)if(Ot.has(t.name)||(o=!1),r){r=!1
for(const[e,r]of Object.entries(t.attributes))It.has(e)&&n.set(e,r)}else for(const[e,r]of n)t.attributes[e]!==r&&n.delete(e)
null==e.attributes.filter&&null==e.attributes["clip-path"]&&null==e.attributes.mask||n.delete("transform"),o&&n.delete("transform")
for(const[t,r]of n)"transform"===t?null!=e.attributes.transform?e.attributes.transform=`${e.attributes.transform} ${r}`:e.attributes.transform=r:e.attributes[t]=r
for(const t of e.children)if("element"===t.type)for(const[e]of n)delete t.attributes[e]}}}},name:"moveElemsAttrsToGroup"})
const Ry=[...Ot,"g","text"]
var Fy=Object.freeze({__proto__:null,description:"moves some group attributes to the content elements",fn:()=>({element:{enter:e=>{if("g"===e.name&&0!==e.children.length&&null!=e.attributes.transform&&!1===Object.entries(e.attributes).some(([e,t])=>Mt.has(e)&&Yb(t))&&e.children.every(e=>"element"===e.type&&Ry.includes(e.name)&&null==e.attributes.id)){for(const t of e.children){const n=e.attributes.transform
"element"===t.type&&(null!=t.attributes.transform?t.attributes.transform=`${n} ${t.attributes.transform}`:t.attributes.transform=n)}delete e.attributes.transform}}}}),name:"moveGroupAttrsToElems"})
const By=(e,t)=>{if("element"===e.type){if(Tt.animation.has(e.name)&&e.attributes.attributeName===t)return!0
for(const n of e.children)if(By(n,t))return!0}return!1}
var qy=Object.freeze({__proto__:null,description:"collapses useless groups",fn:e=>{const t=zb(e)
return{element:{exit:(e,n)=>{if("root"!==n.type&&"switch"!==n.name&&"g"===e.name&&0!==e.children.length){if(0!==Object.keys(e.attributes).length&&1===e.children.length){const n=e.children[0],r=!(!e.attributes.filter&&!Tb(t,e).filter)
if("element"===n.type&&null==n.attributes.id&&!r&&(null==e.attributes.class||null==n.attributes.class)&&(null==e.attributes["clip-path"]&&null==e.attributes.mask||"g"===n.name&&null==e.attributes.transform&&null==n.attributes.transform)){const t={...n.attributes}
for(const[r,o]of Object.entries(e.attributes)){if(By(n,r))return
if(null==t[r])t[r]=o
else if("transform"===r)t[r]=o+" "+t[r]
else if("inherit"===t[r])t[r]=o
else if(!It.has(r)&&t[r]!==o)return}e.attributes={},n.attributes=t}}if(0===Object.keys(e.attributes).length){for(const t of e.children)if("element"===t.type&&Tt.animation.has(t.name))return
const t=n.children.indexOf(e)
n.children.splice(t,1,...e.children)}}}}}},name:"collapseGroups"})
let Gy
const Uy=e=>{if(e.pathJS)return e.pathJS
const t=[],n=zy(e.attributes.d)
for(const{command:e,args:r}of n)t.push({command:e,args:r})
return t.length&&"m"==t[0].command&&(t[0].command="M"),e.pathJS=t,t},Wy=e=>{const t=[],n=[0,0],r=[0,0]
for(let{command:o,args:i}of e)i=i.slice(),"m"===o&&(i[0]+=r[0],i[1]+=r[1],o="M"),"M"===o&&(r[0]=i[0],r[1]=i[1],n[0]=r[0],n[1]=r[1]),"h"===o&&(i[0]+=r[0],o="H"),"H"===o&&(r[0]=i[0]),"v"===o&&(i[0]+=r[1],o="V"),"V"===o&&(r[1]=i[0]),"l"===o&&(i[0]+=r[0],i[1]+=r[1],o="L"),"L"===o&&(r[0]=i[0],r[1]=i[1]),"c"===o&&(i[0]+=r[0],i[1]+=r[1],i[2]+=r[0],i[3]+=r[1],i[4]+=r[0],i[5]+=r[1],o="C"),"C"===o&&(r[0]=i[4],r[1]=i[5]),"s"===o&&(i[0]+=r[0],i[1]+=r[1],i[2]+=r[0],i[3]+=r[1],o="S"),"S"===o&&(r[0]=i[2],r[1]=i[3]),"q"===o&&(i[0]+=r[0],i[1]+=r[1],i[2]+=r[0],i[3]+=r[1],o="Q"),"Q"===o&&(r[0]=i[2],r[1]=i[3]),"t"===o&&(i[0]+=r[0],i[1]+=r[1],o="T"),"T"===o&&(r[0]=i[0],r[1]=i[1]),"a"===o&&(i[5]+=r[0],i[6]+=r[1],o="A"),"A"===o&&(r[0]=i[5],r[1]=i[6]),"z"!==o&&"Z"!==o||(r[0]=n[0],r[1]=n[1],o="z"),t.push({command:o,args:i})
return t},Vy=function(e,t,n){e.pathJS=t
const r=[]
for(const e of t){if(0!==r.length&&("M"===e.command||"m"===e.command)){const e=r[r.length-1]
"M"!==e.command&&"m"!==e.command||r.pop()}r.push({command:e.command,args:e.args})}e.attributes.d=Oy({pathData:r,precision:n.floatPrecision,disableSpaceAfterFlags:n.noSpaceAfterFlags})}
function $y(e,t){return e[0]=t[t.length-2],e[1]=t[t.length-1],e}const Yy=function(e,t){const n=Jy(Wy(e)),r=Jy(Wy(t))
if(n.maxX<=r.minX||r.maxX<=n.minX||n.maxY<=r.minY||r.maxY<=n.minY||n.list.every(e=>r.list.every(t=>e.list[e.maxX][0]<=t.list[t.minX][0]||t.list[t.maxX][0]<=e.list[e.minX][0]||e.list[e.maxY][1]<=t.list[t.minY][1]||t.list[t.maxY][1]<=e.list[e.minY][1])))return!1
const o=n.list.map(ek),i=r.list.map(ek)
return o.some(function(e){return!(e.list.length<3)&&i.some(function(t){if(t.list.length<3)return!1
const n=[a(e,t,[1,0])],r=Hy(n[0])
let o=1e4
for(;;){if(0==o--)return console.error("Error: infinite loop while processing mergePaths plugin."),!0
if(n.push(a(e,t,r)),Ky(r,n[n.length-1])<=0)return!1
if(Xy(n,r))return!0}})})
function a(e,t,n){return Qy(s(e,n),s(t,Hy(n)))}function s(e,t){let n,r=t[1]>=0?t[0]<0?e.maxY:e.maxX:t[0]<0?e.minX:e.minY,o=-1/0
for(;(n=Ky(e.list[r],t))>o;)o=n,r=++r%e.list.length
return e.list[(r||e.list.length)-1]}}
function Xy(e,t){if(2==e.length){const n=e[1],r=e[0],o=Hy(e[1]),i=Qy(r,n)
Ky(o,i)>0?$y(t,Zy(i,n)):($y(t,o),e.shift())}else{const n=e[2],r=e[1],o=e[0],i=Qy(r,n),a=Qy(o,n),s=Hy(n),l=Zy(i,a),c=Zy(a,i)
if(Ky(l,s)>0)Ky(i,s)>0?($y(t,l),e.shift()):($y(t,s),e.splice(0,2))
else{if(!(Ky(c,s)>0))return!0
Ky(a,s)>0?($y(t,c),e.splice(1,1)):($y(t,s),e.splice(0,2))}}return!1}function Hy(e){return[-e[0],-e[1]]}function Qy(e,t){return[e[0]-t[0],e[1]-t[1]]}function Ky(e,t){return e[0]*t[0]+e[1]*t[1]}function Zy(e,t){const n=[-e[1],e[0]]
return Ky(n,Hy(t))<0?Hy(n):n}function Jy(e){const t={list:[],minX:0,minY:0,maxX:0,maxY:0},n=(e,n)=>{(!e.list.length||n[1]>e.list[e.maxY][1])&&(e.maxY=e.list.length,t.maxY=t.list.length?Math.max(n[1],t.maxY):n[1]),(!e.list.length||n[0]>e.list[e.maxX][0])&&(e.maxX=e.list.length,t.maxX=t.list.length?Math.max(n[0],t.maxX):n[0]),(!e.list.length||n[1]<e.list[e.minY][1])&&(e.minY=e.list.length,t.minY=t.list.length?Math.min(n[1],t.minY):n[1]),(!e.list.length||n[0]<e.list[e.minX][0])&&(e.minX=e.list.length,t.minX=t.list.length?Math.min(n[0],t.minX):n[0]),e.list.push(n)}
for(let o=0;o<e.length;o+=1){const i=e[o]
let a=0===t.list.length?{list:[],minX:0,minY:0,maxX:0,maxY:0}:t.list[t.list.length-1]
const s=0===o?null:e[o-1]
let l=0===a.list.length?null:a.list[a.list.length-1]
const c=i.args
let u=l
const h=(e,t)=>e+(null==l?0:l[t%2])
switch(i.command){case"M":a={list:[],minX:0,minY:0,maxX:0,maxY:0},t.list.push(a)
break
case"H":null!=l&&n(a,[c[0],l[1]])
break
case"V":null!=l&&n(a,[l[0],c[0]])
break
case"Q":n(a,c.slice(0,2)),Gy=[c[2]-c[0],c[3]-c[1]]
break
case"T":null==l||null==s||"Q"!=s.command&&"T"!=s.command||(u=[l[0]+Gy[0],l[1]+Gy[1]],n(a,u),Gy=[c[0]-u[0],c[1]-u[1]])
break
case"C":null!=l&&n(a,[0.5*(l[0]+c[0]),0.5*(l[1]+c[1])]),n(a,[0.5*(c[0]+c[2]),0.5*(c[1]+c[3])]),n(a,[0.5*(c[2]+c[4]),0.5*(c[3]+c[5])]),Gy=[c[4]-c[2],c[5]-c[3]]
break
case"S":null==l||null==s||"C"!=s.command&&"S"!=s.command||(n(a,[l[0]+0.5*Gy[0],l[1]+0.5*Gy[1]]),u=[l[0]+Gy[0],l[1]+Gy[1]]),null!=u&&n(a,[0.5*(u[0]+c[0]),0.5*(u[1]+c[1])]),n(a,[0.5*(c[0]+c[2]),0.5*(c[1]+c[3])]),Gy=[c[2]-c[0],c[3]-c[1]]
break
case"A":if(null!=l){const e=nk.apply(0,l.concat(c))
for(var r;(r=e.splice(0,6).map(h)).length;)null!=l&&n(a,[0.5*(l[0]+r[0]),0.5*(l[1]+r[1])]),n(a,[0.5*(r[0]+r[2]),0.5*(r[1]+r[3])]),n(a,[0.5*(r[2]+r[4]),0.5*(r[3]+r[5])]),e.length&&n(a,l=r.slice(-2))}}c.length>=2&&n(a,c.slice(-2))}return t}function ek(e){e.list.sort(function(e,t){return e[0]==t[0]?e[1]-t[1]:e[0]-t[0]})
const t=[]
let n=0,r=0
for(let o=0;o<e.list.length;o++){for(;t.length>=2&&tk(t[t.length-2],t[t.length-1],e.list[o])<=0;)t.pop()
e.list[o][1]<e.list[n][1]&&(n=o,r=t.length),t.push(e.list[o])}const o=[]
let i=e.list.length-1,a=0
for(let t=e.list.length;t--;){for(;o.length>=2&&tk(o[o.length-2],o[o.length-1],e.list[t])<=0;)o.pop()
e.list[t][1]>e.list[i][1]&&(i=t,a=o.length),o.push(e.list[t])}o.pop(),t.pop()
const s=t.concat(o)
return{list:s,minX:0,maxX:t.length,minY:r,maxY:(t.length+a)%s.length}}function tk(e,t,n){return(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0])}const nk=(e,t,n,r,o,i,a,s,l,c)=>{const u=120*Math.PI/180,h=Math.PI/180*(+o||0)
let d=[]
const p=(e,t,n)=>e*Math.cos(n)-t*Math.sin(n),m=(e,t,n)=>e*Math.sin(n)+t*Math.cos(n)
if(c)b=c[0],y=c[1],f=c[2],g=c[3]
else{t=m(e=p(e,t,-h),t,-h)
const o=(e-(s=p(s,l,-h)))/2,c=(t-(l=m(s,l,-h)))/2
let u=o*o/(n*n)+c*c/(r*r)
u>1&&(u=Math.sqrt(u),n*=u,r*=u)
const d=n*n,k=r*r,v=(i==a?-1:1)*Math.sqrt(Math.abs((d*k-d*c*c-k*o*o)/(d*c*c+k*o*o)))
var f=v*n*c/r+(e+s)/2,g=v*-r*o/n+(t+l)/2,b=Math.asin(Number(((t-g)/r).toFixed(9))),y=Math.asin(Number(((l-g)/r).toFixed(9)))
b=e<f?Math.PI-b:b,y=s<f?Math.PI-y:y,b<0&&(b=2*Math.PI+b),y<0&&(y=2*Math.PI+y),a&&b>y&&(b-=2*Math.PI),!a&&y>b&&(y-=2*Math.PI)}let k=y-b
if(Math.abs(k)>u){const e=y,t=s,i=l
y=b+u*(a&&y>b?1:-1),s=f+n*Math.cos(y),l=g+r*Math.sin(y),d=nk(s,l,n,r,o,0,a,t,i,[y,e,f,g])}k=y-b
const v=Math.cos(b),w=Math.sin(b),x=Math.cos(y),S=Math.sin(y),C=Math.tan(k/4),A=4/3*n*C,_=4/3*r*C,z=[-A*w,_*v,s+A*S-e,l-_*x-t,s-e,l-t]
if(c)return z.concat(d)
{d=z.concat(d)
const e=[]
for(let t=0,n=d.length;t<n;t++)e[t]=t%2?m(d[t-1],d[t],h):p(d[t],d[t+1],h)
return e}},rk=new Set(["matrix","rotate","scale","skewX","skewY","translate"]),ok=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,ik=/[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g,ak=e=>{const t=[]
let n=null
for(const r of e.split(ok))if(r)if(rk.has(r))n={name:r,data:[]},t.push(n)
else{let e
for(;e=ik.exec(r);)e=Number(e),null!=n&&n.data.push(e)}return null==n||0==n.data.length?[]:t},sk=e=>{const t=e.map(e=>"matrix"===e.name?e.data:gk(e))
return{name:"matrix",data:t.length>0?t.reduce(yk):[]}},lk={rad:e=>e*Math.PI/180,deg:e=>180*e/Math.PI,cos:e=>Math.cos(lk.rad(e)),acos:(e,t)=>Hb(lk.deg(Math.acos(e)),t),sin:e=>Math.sin(lk.rad(e)),asin:(e,t)=>Hb(lk.deg(Math.asin(e)),t),tan:e=>Math.tan(lk.rad(e)),atan:(e,t)=>Hb(lk.deg(Math.atan(e)),t)},ck=e=>{const t=e.data,[n,r,o,i,a,s]=t,l=n*i-r*o
if(0===l)return
const c=Math.hypot(n,r)
if(0===c)return
const u=[],h=n/c
if((a||s)&&u.push({name:"translate",data:[a,s]}),1!==h){const e=Math.acos(h)
u.push({name:"rotate",data:[lk.deg(r<0?-e:e),0,0]})}const d=c,p=l/d
1===d&&1===p||u.push({name:"scale",data:[d,p]})
const m=n*o+r*i
return m&&u.push({name:"skewX",data:[lk.deg(Math.atan(m/(n*n+r*r)))]}),u},uk=e=>{const t=e.data,[n,r,o,i,a,s]=t,l=n*i-r*o
if(0===l)return
const c=Math.hypot(o,i)
if(0===c)return
const u=[];(a||s)&&u.push({name:"translate",data:[a,s]})
const h=Math.PI/2-(i<0?-1:1)*Math.acos(-o/c)
u.push({name:"rotate",data:[lk.deg(h),0,0]})
const d=l/c,p=c
1===d&&1===p||u.push({name:"scale",data:[d,p]})
const m=n*o+r*i
return m&&u.push({name:"skewY",data:[lk.deg(Math.atan(m/(o*o+i*i)))]}),u},hk=(e,t,n)=>{const r=lk.rad(n),o=1-Math.cos(r),i=Math.sin(r),a=(o*t+i*e)/(o*o+i*i)
return{name:"rotate",data:[n,(e-i*a)/o,a]}},dk=e=>{switch(e.name){case"rotate":case"skewX":case"skewY":return 0===e.data[0]
case"scale":return 1===e.data[0]&&1===e.data[1]
case"translate":return 0===e.data[0]&&0===e.data[1]}return!1},pk=(e,t)=>{const n=[]
for(let r=0;r<e.length;r++){const o=e[r]
if(dk(o))continue
const i=o.data
switch(o.name){case"rotate":switch(i[0]){case 180:case-180:{const t=e[r+1]
t&&"scale"===t.name?(n.push(mk(t.data.map(e=>-e))),r++):n.push({name:"scale",data:[-1]})}continue}n.push({name:"rotate",data:i.slice(0,i[1]||i[2]?3:1)})
break
case"scale":n.push(mk(i))
break
case"skewX":case"skewY":n.push({name:o.name,data:[i[0]]})
break
case"translate":{const o=e[r+1]
if(o&&"rotate"===o.name&&180!==o.data[0]&&-180!==o.data[0]&&0!==o.data[0]&&0===o.data[1]&&0===o.data[2]){const e=t[r].data
n.push(hk(e[0],e[1],t[r+1].data[0])),r++
continue}}n.push({name:"translate",data:i.slice(0,i[1]?2:1)})}}return n.length?n:[{name:"scale",data:[1]}]},mk=e=>({name:"scale",data:e.slice(0,e[0]===e[1]?1:2)}),fk=(e,t)=>{const n=(e=>{const t=[],n=ck(e),r=uk(e)
return n&&t.push(n),r&&t.push(r),t})(e)
let r,o=Number.MAX_VALUE
for(const e of n){const n=e.map(e=>{const n={name:e.name,data:[...e.data]}
return kk(n,t)}),i=pk(n,e),a=Ak(i,t).length
a<o&&(r=i,o=a)}return r??[e]},gk=e=>{if("matrix"===e.name)return e.data
switch(e.name){case"translate":return[1,0,0,1,e.data[0],e.data[1]||0]
case"scale":return[e.data[0],0,0,e.data[1]??e.data[0],0,0]
case"rotate":var t=lk.cos(e.data[0]),n=lk.sin(e.data[0]),r=e.data[1]||0,o=e.data[2]||0
return[t,n,-n,t,(1-t)*r+n*o,(1-t)*o-n*r]
case"skewX":return[1,0,lk.tan(e.data[0]),1,0,0]
case"skewY":return[1,lk.tan(e.data[0]),0,1,0,0]
default:throw Error(`Unknown transform ${e.name}`)}},bk=(e,t,n)=>{const r=t[5]-e[0],o=t[6]-e[1]
let i=t[0],a=t[1]
const s=t[2]*Math.PI/180,l=Math.cos(s),c=Math.sin(s)
if(i>0&&a>0){let e=Math.pow(r*l+o*c,2)/(4*i*i)+Math.pow(o*l-r*c,2)/(4*a*a)
e>1&&(e=Math.sqrt(e),i*=e,a*=e)}const u=yk(n,[i*l,i*c,-a*c,a*l,0,0]),h=u[2]*u[2]+u[3]*u[3],d=u[0]*u[0]+u[1]*u[1]+h,p=Math.hypot(u[0]-u[3],u[1]+u[2])*Math.hypot(u[0]+u[3],u[1]-u[2])
if(p){const e=(d+p)/2,n=(d-p)/2,r=Math.abs(e-h)>1e-6,o=(r?e:n)-h,i=u[0]*u[2]+u[1]*u[3],a=u[0]*o+u[2]*i,s=u[1]*o+u[3]*i
t[0]=Math.sqrt(e),t[1]=Math.sqrt(n),t[2]=((r?s<0:a>0)?-1:1)*Math.acos((r?a:s)/Math.hypot(a,s))*180/Math.PI}else t[0]=t[1]=Math.sqrt(d/2),t[2]=0
return n[0]<0!=n[3]<0&&(t[4]=1-t[4]),t},yk=(e,t)=>[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]],kk=(e,t)=>{switch(e.name){case"translate":e.data=wk(e.data,t)
break
case"rotate":e.data=[...vk(e.data.slice(0,1),t),...wk(e.data.slice(1),t)]
break
case"skewX":case"skewY":e.data=vk(e.data,t)
break
case"scale":e.data=xk(e.data,t)
break
case"matrix":e.data=[...xk(e.data.slice(0,4),t),...wk(e.data.slice(4),t)]}return e},vk=(e,t)=>null!=t.degPrecision&&t.degPrecision>=1&&t.floatPrecision<20?Ck(t.degPrecision,e):Sk(e),wk=(e,t)=>t.floatPrecision>=1&&t.floatPrecision<20?Ck(t.floatPrecision,e):Sk(e),xk=(e,t)=>t.transformPrecision>=1&&t.floatPrecision<20?Ck(t.transformPrecision,e):Sk(e),Sk=e=>e.map(Math.round),Ck=(e,t)=>{for(let n=t.length,r=+Math.pow(0.1,e).toFixed(e);n--;)if(Hb(t[n],e)!==t[n]){const o=+t[n].toFixed(e-1)
t[n]=+Math.abs(o-t[n]).toFixed(e+1)>=r?+t[n].toFixed(e):o}return t},Ak=(e,t)=>e.map(e=>(kk(e,t),`${e.name}(${Wb(e.data,t)})`)).join(""),_k=/[-+]?(\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g,zk=(e,t,n)=>[e[0]*t+e[2]*n+e[4],e[1]*t+e[3]*n+e[5]],Tk=(e,t,n)=>[e[0]*t+e[2]*n,e[1]*t+e[3]*n],Ek=(e,t)=>{const n=[0,0],r=[0,0]
for(const o of e){let{command:e,args:i}=o
if("M"===e){r[0]=i[0],r[1]=i[1],n[0]=r[0],n[1]=r[1]
const[e,o]=zk(t,i[0],i[1])
i[0]=e,i[1]=o}if("m"===e){r[0]+=i[0],r[1]+=i[1],n[0]=r[0],n[1]=r[1]
const[e,o]=Tk(t,i[0],i[1])
i[0]=e,i[1]=o}if("H"===e&&(e="L",i=[i[0],r[1]]),"h"===e&&(e="l",i=[i[0],0]),"V"===e&&(e="L",i=[r[0],i[0]]),"v"===e&&(e="l",i=[0,i[0]]),"L"===e){r[0]=i[0],r[1]=i[1]
const[e,n]=zk(t,i[0],i[1])
i[0]=e,i[1]=n}if("l"===e){r[0]+=i[0],r[1]+=i[1]
const[e,n]=Tk(t,i[0],i[1])
i[0]=e,i[1]=n}if("C"===e){r[0]=i[4],r[1]=i[5]
const[e,n]=zk(t,i[0],i[1]),[o,a]=zk(t,i[2],i[3]),[s,l]=zk(t,i[4],i[5])
i[0]=e,i[1]=n,i[2]=o,i[3]=a,i[4]=s,i[5]=l}if("c"===e){r[0]+=i[4],r[1]+=i[5]
const[e,n]=Tk(t,i[0],i[1]),[o,a]=Tk(t,i[2],i[3]),[s,l]=Tk(t,i[4],i[5])
i[0]=e,i[1]=n,i[2]=o,i[3]=a,i[4]=s,i[5]=l}if("S"===e){r[0]=i[2],r[1]=i[3]
const[e,n]=zk(t,i[0],i[1]),[o,a]=zk(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=o,i[3]=a}if("s"===e){r[0]+=i[2],r[1]+=i[3]
const[e,n]=Tk(t,i[0],i[1]),[o,a]=Tk(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=o,i[3]=a}if("Q"===e){r[0]=i[2],r[1]=i[3]
const[e,n]=zk(t,i[0],i[1]),[o,a]=zk(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=o,i[3]=a}if("q"===e){r[0]+=i[2],r[1]+=i[3]
const[e,n]=Tk(t,i[0],i[1]),[o,a]=Tk(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=o,i[3]=a}if("T"===e){r[0]=i[0],r[1]=i[1]
const[e,n]=zk(t,i[0],i[1])
i[0]=e,i[1]=n}if("t"===e){r[0]+=i[0],r[1]+=i[1]
const[e,n]=Tk(t,i[0],i[1])
i[0]=e,i[1]=n}if("A"===e){if(bk(r,i,t),r[0]=i[5],r[1]=i[6],Math.abs(i[2])>80){const e=i[0],t=i[2]
i[0]=i[1],i[1]=e,i[2]=t+(t>0?-90:90)}const[e,n]=zk(t,i[5],i[6])
i[5]=e,i[6]=n}if("a"===e){if(bk([0,0],i,t),r[0]+=i[5],r[1]+=i[6],Math.abs(i[2])>80){const e=i[0],t=i[2]
i[0]=i[1],i[1]=e,i[2]=t+(t>0?-90:90)}const[e,n]=Tk(t,i[5],i[6])
i[5]=e,i[6]=n}"z"!==e&&"Z"!==e||(r[0]=n[0],r[1]=n[1]),o.command=e,o.args=i}}
let Ok,Pk,Lk,Nk,Dk
const jk=e=>{const t=[0,0],n=[0,0]
let r=[0,0]
for(let o=0;o<e.length;o+=1){const i=e[o]
let{command:a,args:s}=i
"m"===a&&(n[0]+=s[0],n[1]+=s[1],t[0]=n[0],t[1]=n[1]),"M"===a&&(0!==o&&(a="m"),s[0]-=n[0],s[1]-=n[1],n[0]+=s[0],n[1]+=s[1],t[0]=n[0],t[1]=n[1]),"l"===a&&(n[0]+=s[0],n[1]+=s[1]),"L"===a&&(a="l",s[0]-=n[0],s[1]-=n[1],n[0]+=s[0],n[1]+=s[1]),"h"===a&&(n[0]+=s[0]),"H"===a&&(a="h",s[0]-=n[0],n[0]+=s[0]),"v"===a&&(n[1]+=s[0]),"V"===a&&(a="v",s[0]-=n[1],n[1]+=s[0]),"c"===a&&(n[0]+=s[4],n[1]+=s[5]),"C"===a&&(a="c",s[0]-=n[0],s[1]-=n[1],s[2]-=n[0],s[3]-=n[1],s[4]-=n[0],s[5]-=n[1],n[0]+=s[4],n[1]+=s[5]),"s"===a&&(n[0]+=s[2],n[1]+=s[3]),"S"===a&&(a="s",s[0]-=n[0],s[1]-=n[1],s[2]-=n[0],s[3]-=n[1],n[0]+=s[2],n[1]+=s[3]),"q"===a&&(n[0]+=s[2],n[1]+=s[3]),"Q"===a&&(a="q",s[0]-=n[0],s[1]-=n[1],s[2]-=n[0],s[3]-=n[1],n[0]+=s[2],n[1]+=s[3]),"t"===a&&(n[0]+=s[0],n[1]+=s[1]),"T"===a&&(a="t",s[0]-=n[0],s[1]-=n[1],n[0]+=s[0],n[1]+=s[1]),"a"===a&&(n[0]+=s[5],n[1]+=s[6]),"A"===a&&(a="a",s[5]-=n[0],s[6]-=n[1],n[0]+=s[5],n[1]+=s[6]),"Z"!==a&&"z"!==a||(n[0]=t[0],n[1]=t[1]),i.command=a,i.args=s,i.base=r,i.coords=[n[0],n[1]],r=i.coords}return e}
function Mk(e){const t=Ik([0,0,e[2],e[3],e[0],e[1],e[4],e[5]])
return null!=t&&e[2]<t[0]==t[0]<0&&e[3]<t[1]==t[1]<0&&e[4]<t[0]==t[0]<e[0]&&e[5]<t[1]==t[1]<e[1]}function Ik(e){const t=e[1]-e[3],n=e[2]-e[0],r=e[0]*e[3]-e[2]*e[1],o=e[5]-e[7],i=e[6]-e[4],a=e[4]*e[7]-e[5]*e[6],s=t*i-o*n
if(!s)return
const l=[(n*a-i*r)/s,(t*a-o*r)/-s]
return!isNaN(l[0])&&!isNaN(l[1])&&isFinite(l[0])&&isFinite(l[1])?l:void 0}function Rk(e){const t=Pk||0
for(let n=e.length;n-- >0;){const r=Hb(e[n],t)
if(r!==e[n]){const o=Hb(e[n],t-1)
e[n]=Hb(Math.abs(o-e[n]),t+1)>=Lk?r:o}}return e}function Fk(e){for(let t=e.length;t-- >0;)e[t]=Math.round(e[t])
return e}function Bk(e){let t=e.length-2
const n=-e[t+1],r=e[t],o=1/(n*n+r*r)
if(t<=1||!isFinite(o))return!1
for(;(t-=2)>=0;)if(Math.sqrt(Math.pow(n*e[t]+r*e[t+1],2)*o)>Lk)return!1
return!0}function qk(e){if(1===e[3])return
const[t,n]=e
if(Math.abs(t-n)>Lk)return
const r=Math.hypot(e[5],e[6])
return r>2*t?void 0:t-Math.sqrt(t**2-0.25*r**2)}function Gk(e,t){switch(e.command){case"s":e.command="c"
break
case"t":e.command="q"}return e.args.unshift(t[t.length-2]-t[t.length-4],t[t.length-1]-t[t.length-3]),e}function Uk(e,t){return Math.hypot(e[0]-t[0],e[1]-t[1])}function Wk(e,t){return[2*t[0]-e[0],2*t[1]-e[1]]}function Vk(e,t){const n=t*t,r=n*t,o=1-t,i=o*o
return[3*i*t*e[0]+3*o*n*e[2]+r*e[4],3*i*t*e[1]+3*o*n*e[3]+r*e[5]]}function $k(e,t){const n=Math.min(Nk*Lk,Dk*t.radius/100)
return[0,1/4,.5,3/4,1].every(function(r){return Math.abs(Uk(Vk(e,r),t.center)-t.radius)<=n})}function Yk(e,t){return $k(e,{center:[t.center[0]+e[4],t.center[1]+e[5]],radius:t.radius})}function Xk(e,t){const n=-t.center[0],r=-t.center[1],o=e[4]-t.center[0],i=e[5]-t.center[1]
return Math.acos((n*o+r*i)/Math.sqrt((n*n+r*r)*(o*o+i*i)))}function Hk(e,t){return t.reduce(function(t,n){let r=""
return n.args&&(r=Wb(Ok(n.args.slice()),e)),t+n.command+r},"")}var Qk=Object.freeze({__proto__:null,description:"optimizes path data: writes in shorter form, applies transformations",fn:(e,t)=>{const{applyTransforms:r=!0,applyTransformsStroked:o=!0,makeArcs:i={threshold:2.5,tolerance:0.5},straightCurves:a=!0,convertToQ:s=!0,lineShorthands:l=!0,convertToZ:c=!0,curveSmoothShorthands:u=!0,floatPrecision:h=3,transformPrecision:d=5,smartArcRounding:p=!0,removeUseless:m=!0,collapseRepeated:f=!0,utilizeAbsolute:g=!0,leadingZero:b=!0,negativeExtraSpace:y=!0,noSpaceAfterFlags:k=!1,forceAbsolutePath:v=!1}=t,w={applyTransforms:r,applyTransformsStroked:o,makeArcs:i,straightCurves:a,convertToQ:s,lineShorthands:l,convertToZ:c,curveSmoothShorthands:u,floatPrecision:h,transformPrecision:d,smartArcRounding:p,removeUseless:m,collapseRepeated:f,utilizeAbsolute:g,leadingZero:b,negativeExtraSpace:y,noSpaceAfterFlags:k,forceAbsolutePath:v}
r&&n(e,((e,t)=>{const n=zb(e)
return{element:{enter:e=>{if(null==e.attributes.d)return
if(null!=e.attributes.id)return
if(null==e.attributes.transform||""===e.attributes.transform||null!=e.attributes.style||Object.entries(e.attributes).some(([e,t])=>Mt.has(e)&&Yb(t)))return
const r=Tb(n,e),o=r.transform
if("static"===o.type&&o.value!==e.attributes.transform)return
const i=sk(ak(e.attributes.transform)),a="static"===r.stroke?.type?r.stroke.value:null,s="static"===r["stroke-width"]?.type?r["stroke-width"].value:null,l=t.transformPrecision
if("dynamic"===r.stroke?.type||"dynamic"===r["stroke-width"]?.type)return
const c=Number(Math.hypot(i.data[0],i.data[1]).toFixed(l))
if(a&&"none"!=a){if(!t.applyTransformsStroked)return
if(!(i.data[0]===i.data[3]&&i.data[1]===-i.data[2]||i.data[0]===-i.data[3]&&i.data[1]===i.data[2]))return
1!==c&&"non-scaling-stroke"!==e.attributes["vector-effect"]&&(e.attributes["stroke-width"]=(s||Lt.presentation["stroke-width"]).trim().replace(_k,e=>Vb(Number(e)*c)),null!=e.attributes["stroke-dashoffset"]&&(e.attributes["stroke-dashoffset"]=e.attributes["stroke-dashoffset"].trim().replace(_k,e=>Vb(Number(e)*c))),null!=e.attributes["stroke-dasharray"]&&(e.attributes["stroke-dasharray"]=e.attributes["stroke-dasharray"].trim().replace(_k,e=>Vb(Number(e)*c))))}const u=Uy(e)
Ek(u,i.data),delete e.attributes.transform}}}})(e,{transformPrecision:d,applyTransformsStroked:o}))
const x=zb(e)
return{element:{enter:e=>{if(Ot.has(e.name)&&null!=e.attributes.d){const t=Tb(x,e)
Pk=h,Lk=!1!==Pk?+Math.pow(0.1,Pk).toFixed(Pk):1e-2,Ok=Pk&&Pk>0&&Pk<20?Rk:Fk,i&&(Nk=i.threshold,Dk=i.tolerance)
const n=null!=t["marker-mid"],r=t.stroke&&("dynamic"===t.stroke.type||"none"!==t.stroke.value),o=t["stroke-linecap"]&&("dynamic"===t["stroke-linecap"].type||"butt"!==t["stroke-linecap"].value),a=r&&o,s=!r||"static"===t["stroke-linecap"]?.type&&"round"===t["stroke-linecap"].value&&"static"===t["stroke-linejoin"]?.type&&"round"===t["stroke-linejoin"].value
let l=Uy(e)
if(l.length){const t=l.some(e=>"m"!==e.command&&"M"!==e.command)
jk(l),l=function(e,t,{isSafeToUseZ:n,maybeHasStrokeAndLinecap:r,hasMarkerMid:o}){const i=Hk.bind(null,t),a=[0,0],s=[0,0]
let l,c={}
return e=e.filter(function(e,u,h){const d=l
let p=e.command,m=e.args,f=h[u+1]
if("Z"!==p&&"z"!==p){let l,b=m
if("s"===p){b=[0,0].concat(m)
const e=c.args,t=e.length
b[0]=e[t-2]-e[t-4],b[1]=e[t-1]-e[t-3]}if(t.makeArcs&&("c"==p||"s"==p)&&Mk(b)&&(l=function(e){const t=Vk(e,.5),n=[t[0]/2,t[1]/2],r=[(t[0]+e[4])/2,(t[1]+e[5])/2],o=Ik([n[0],n[1],n[0]+n[1],n[1]-n[0],r[0],r[1],r[0]+(r[1]-t[1]),r[1]-(r[0]-t[0])]),i=o&&Uk([0,0],o),a=Math.min(Nk*Lk,Dk*i/100)
if(o&&i<1e15&&[1/4,3/4].every(function(t){return Math.abs(Uk(Vk(e,t),o)-i)<=a}))return{center:o,radius:i}}(b))){const t=Ok([l.radius])[0]
let n=Xk(b,l)
const r=b[5]*b[0]-b[4]*b[1]>0?1:0
let o={command:"a",args:[t,t,0,0,r,b[4],b[5]],coords:e.coords.slice(),base:e.base}
const s=[o],d=[l.center[0]-b[4],l.center[1]-b[5]],y={center:d,radius:l.radius},k=[e]
let v,w=0,x=""
if("c"==c.command&&Mk(c.args)&&Yk(c.args,l)||"a"==c.command&&c.sdata&&Yk(c.sdata,l)){k.unshift(c),o.base=c.base,o.args[5]=o.coords[0]-o.base[0],o.args[6]=o.coords[1]-o.base[1]
const e="a"==c.command?c.sdata:c.args
n+=Xk(e,{center:[e[4]+l.center[0],e[5]+l.center[1]],radius:l.radius}),n>Math.PI&&(o.args[3]=1),w=1}for(var g=u;(f=h[++g])&&("c"===f.command||"s"===f.command);){let e=f.args
if("s"==f.command&&(v=Gk({command:"s",args:f.args.slice()},h[g-1].args),e=v.args,v.args=e.slice(0,2),x=i([v])),!Mk(e)||!$k(e,y))break
if(n+=Xk(e,y),n-2*Math.PI>1e-3)break
if(n>Math.PI&&(o.args[3]=1),k.push(f),!(2*Math.PI-n>1e-3)){o.args[5]=2*(y.center[0]-e[4]),o.args[6]=2*(y.center[1]-e[5]),o.coords=[o.base[0]+o.args[5],o.base[1]+o.args[6]],o={command:"a",args:[t,t,0,0,r,f.coords[0]-o.coords[0],f.coords[1]-o.coords[1]],coords:f.coords,base:o.coords},s.push(o),g++
break}o.coords=f.coords,o.args[5]=o.coords[0]-o.base[0],o.args[6]=o.coords[1]-o.base[1],d[0]-=e[4],d[1]-=e[5]}if((i(s)+x).length<i(k).length){if(h[g]&&"s"==h[g].command&&Gk(h[g],h[g-1].args),w){const t=s.shift()
Ok(t.args),a[0]+=t.args[5]-c.args[c.args.length-2],a[1]+=t.args[6]-c.args[c.args.length-1],c.command="a",c.args=t.args,e.base=c.coords=t.coords}if(o=s.shift(),1==k.length?e.sdata=b.slice():k.length-1-w>0&&h.splice(u+1,k.length-1-w,...s),!o)return!1
p="a",m=o.args,e.coords=o.coords}}if(!1!==Pk){if("m"===p||"l"===p||"t"===p||"q"===p||"s"===p||"c"===p)for(let t=m.length;t--;)m[t]+=e.base[t%2]-a[t%2]
else"h"==p?m[0]+=e.base[0]-a[0]:"v"==p?m[0]+=e.base[1]-a[1]:"a"==p&&(m[5]+=e.base[0]-a[0],m[6]+=e.base[1]-a[1])
Ok(m),"h"==p?a[0]+=m[0]:"v"==p?a[1]+=m[0]:(a[0]+=m[m.length-2],a[1]+=m[m.length-1]),Ok(a),"M"!==p&&"m"!==p||(s[0]=a[0],s[1]=a[1])}const y="a"===p?qk(m):void 0
if(t.smartArcRounding&&void 0!==y&&Pk)for(let e=Pk;e>=0;e--){const t=Hb(m[0],e),n=qk([t,t,...m.slice(2)])
if(!(Math.abs(y-n)<Lk))break
m[0]=t,m[1]=t}if(t.straightCurves&&("c"===p&&Bk(m)||"s"===p&&Bk(b)?(f&&"s"==f.command&&Gk(f,m),p="l",m=m.slice(-2)):"q"===p&&Bk(m)?(f&&"t"==f.command&&Gk(f,m),p="l",m=m.slice(-2)):("t"===p&&"q"!==c.command&&"t"!==c.command||"a"===p&&(0===m[0]||0===m[1]||void 0!==y&&y<Lk))&&(p="l",m=m.slice(-2))),t.convertToQ&&"c"==p){const n=0.75*(e.base[0]+m[0])-0.25*e.base[0],r=0.75*(e.base[0]+m[2])-0.25*(e.base[0]+m[4])
if(Math.abs(n-r)<2*Lk){const o=0.75*(e.base[1]+m[1])-0.25*e.base[1],i=0.75*(e.base[1]+m[3])-0.25*(e.base[1]+m[5])
if(Math.abs(o-i)<2*Lk){const a=m.slice()
a.splice(0,4,n+r-e.base[0],o+i-e.base[1]),Ok(a)
const s=Wb(m,t).length
Wb(a,t).length<s&&(p="q",m=a,f&&"s"==f.command&&Gk(f,m))}}}if(t.lineShorthands&&"l"===p&&(0===m[1]?(p="h",m.pop()):0===m[0]&&(p="v",m.shift())),t.collapseRepeated&&!1===o&&("m"===p||"h"===p||"v"===p)&&c.command&&p==c.command.toLowerCase()&&("h"!=p&&"v"!=p||c.args[0]>=0==m[0]>=0))return c.args[0]+=m[0],"h"!=p&&"v"!=p&&(c.args[1]+=m[1]),c.coords=e.coords,h[u]=c,!1
if(t.curveSmoothShorthands&&c.command)if("c"===p)("c"===c.command&&Math.abs(m[0]- -(c.args[2]-c.args[4]))<Lk&&Math.abs(m[1]- -(c.args[3]-c.args[5]))<Lk||"s"===c.command&&Math.abs(m[0]- -(c.args[0]-c.args[2]))<Lk&&Math.abs(m[1]- -(c.args[1]-c.args[3]))<Lk||"c"!==c.command&&"s"!==c.command&&Math.abs(m[0])<Lk&&Math.abs(m[1])<Lk)&&(p="s",m=m.slice(2))
else if("q"===p)if("q"===c.command&&Math.abs(m[0]-(c.args[2]-c.args[0]))<Lk&&Math.abs(m[1]-(c.args[3]-c.args[1]))<Lk)p="t",m=m.slice(2)
else if("t"===c.command){const t=Wk(d,e.base),n=[m[0]+e.base[0],m[1]+e.base[1]]
Math.abs(t[0]-n[0])<Lk&&Math.abs(t[1]-n[1])<Lk&&(p="t",m=m.slice(2))}if(t.removeUseless&&!r){if(("l"===p||"h"===p||"v"===p||"q"===p||"t"===p||"c"===p||"s"===p)&&m.every(function(e){return 0===e}))return h[u]=c,!1
if("a"===p&&0===m[5]&&0===m[6])return h[u]=c,!1}!t.convertToZ||!n&&"Z"!==f?.command&&"z"!==f?.command||"l"!==p&&"h"!==p&&"v"!==p||Math.abs(s[0]-e.coords[0])<Lk&&Math.abs(s[1]-e.coords[1])<Lk&&(p="z",m=[]),e.command=p,e.args=m}else if(a[0]=s[0],a[1]=s[1],"Z"===c.command||"z"===c.command)return!1
return!(("Z"===p||"z"===p)&&t.removeUseless&&n&&Math.abs(e.base[0]-e.coords[0])<Lk/10&&Math.abs(e.base[1]-e.coords[1])<Lk/10)&&(l="q"===p?[m[0]+e.base[0],m[1]+e.base[1]]:"t"===p?d?Wk(d,e.base):e.coords:void 0,c=e,!0)}),e}(l,w,{isSafeToUseZ:s,maybeHasStrokeAndLinecap:a,hasMarkerMid:n}),g&&(l=function(e,t){let n=e[0]
return e=e.filter(function(e,r){if(0==r)return!0
if("Z"===e.command||"z"===e.command)return n=e,!0
const o=e.command,i=e.args,a=i.slice(),s=i.slice()
if("m"===o||"l"===o||"t"===o||"q"===o||"s"===o||"c"===o)for(let t=a.length;t--;)a[t]+=e.base[t%2]
else"h"==o?a[0]+=e.base[0]:"v"==o?a[0]+=e.base[1]:"a"==o&&(a[5]+=e.base[0],a[6]+=e.base[1])
Ok(a),Ok(s)
const l=Wb(a,t),c=Wb(s,t)
return(t.forceAbsolutePath||l.length<c.length&&!(t.negativeExtraSpace&&o==n.command&&n.command.charCodeAt(0)>96&&l.length==c.length-1&&(i[0]<0||0===Math.floor(i[0])&&!Number.isInteger(i[0])&&n.args[n.args.length-1]%1)))&&(e.command=o.toUpperCase(),e.args=a),n=e,!0}),e}(l,w));(null!=e.attributes["marker-start"]||null!=e.attributes["marker-end"])&&t&&l.every(e=>"m"===e.command||"M"===e.command)&&l.push({command:"z",args:[]}),Vy(e,l,w)}}}}}},name:"convertPathData"})
const Kk=(e,t,n)=>{let r=ak(e.attributes[t]);(n=Zk(r,n)).collapseIntoOne&&r.length>1&&(r=[sk(r)]),n.convertToShorts?r=ev(r,n):r.forEach(e=>kk(e,n)),n.removeUseless&&(r=tv(r)),r.length?e.attributes[t]=Ak(r,n):delete e.attributes[t]},Zk=(e,{...t})=>{const n=[]
for(const t of e)"matrix"==t.name&&n.push(...t.data.slice(0,4))
let r=t.transformPrecision
return n.length&&(t.transformPrecision=Math.min(t.transformPrecision,Math.max.apply(Math,n.map(Jk))||t.transformPrecision),r=Math.max.apply(Math,n.map(e=>e.toString().replace(/\D+/g,"").length))),null==t.degPrecision&&(t.degPrecision=Math.max(0,Math.min(t.floatPrecision,r-2))),t},Jk=e=>{const t=e.toString()
return t.slice(t.indexOf(".")).length-1},ev=(e,t)=>{for(let n=0;n<e.length;n++){let r=e[n]
if(t.matrixToTransform&&"matrix"===r.name){const o=fk(r,t)
Ak(o,t).length<=Ak([r],t).length&&e.splice(n,1,...o),r=e[n]}kk(r,t),t.shortTranslate&&"translate"===r.name&&2===r.data.length&&!r.data[1]&&r.data.pop(),t.shortScale&&"scale"===r.name&&2===r.data.length&&r.data[0]===r.data[1]&&r.data.pop(),t.shortRotate&&"translate"===e[n-2]?.name&&"rotate"===e[n-1].name&&"translate"===e[n].name&&e[n-2].data[0]===-e[n].data[0]&&e[n-2].data[1]===-e[n].data[1]&&(e.splice(n-2,3,{name:"rotate",data:[e[n-1].data[0],e[n-2].data[0],e[n-2].data[1]]}),n-=2)}return e},tv=e=>e.filter(e=>!(["translate","rotate","skewX","skewY"].indexOf(e.name)>-1&&(1==e.data.length||"rotate"==e.name)&&!e.data[0]||"translate"==e.name&&!e.data[0]&&!e.data[1]||"scale"==e.name&&1==e.data[0]&&(e.data.length<2||1==e.data[1])||"matrix"==e.name&&1==e.data[0]&&1==e.data[3]&&!(e.data[1]||e.data[2]||e.data[4]||e.data[5])))
var nv=Object.freeze({__proto__:null,description:"collapses multiple transformations and optimizes it",fn:(e,t)=>{const{convertToShorts:n=!0,degPrecision:r,floatPrecision:o=3,transformPrecision:i=5,matrixToTransform:a=!0,shortTranslate:s=!0,shortScale:l=!0,shortRotate:c=!0,removeUseless:u=!0,collapseIntoOne:h=!0,leadingZero:d=!0,negativeExtraSpace:p=!1}=t,m={convertToShorts:n,degPrecision:r,floatPrecision:o,transformPrecision:i,matrixToTransform:a,shortTranslate:s,shortScale:l,shortRotate:c,removeUseless:u,collapseIntoOne:h,leadingZero:d,negativeExtraSpace:p}
return{element:{enter:e=>{null!=e.attributes.transform&&Kk(e,"transform",m),null!=e.attributes.gradientTransform&&Kk(e,"gradientTransform",m),null!=e.attributes.patternTransform&&Kk(e,"patternTransform",m)}}}},name:"convertTransform"})
var rv=Object.freeze({__proto__:null,description:"removes empty attributes",fn:()=>({element:{enter:e=>{for(const[t,n]of Object.entries(e.attributes))""!==n||Pt.conditionalProcessing.has(t)||delete e.attributes[t]}}}),name:"removeEmptyAttrs"})
var ov=Object.freeze({__proto__:null,description:"removes empty container elements",fn:e=>{const t=zb(e)
return{element:{exit:(e,n)=>{"svg"!==e.name&&Tt.container.has(e.name)&&0===e.children.length&&("pattern"===e.name&&0!==Object.keys(e.attributes).length||"mask"===e.name&&null!=e.attributes.id||"element"===n.type&&"switch"===n.name||("g"!==e.name||null==e.attributes.filter&&!Tb(t,e).filter)&&St(e,n))}}}},name:"removeEmptyContainers"})
function iv(e,t){const n=e[t]
return"static"===n?.type&&Yb(n.value)}var av=Object.freeze({__proto__:null,description:"merges multiple paths in one if possible",fn:(e,t)=>{const{force:n=!1,floatPrecision:r=3,noSpaceAfterFlags:o=!1}=t,i=zb(e)
return{element:{enter:e=>{if(e.children.length<=1)return
const t=[]
let a=e.children[0],s=null
const l=(e,t)=>{Vy(e,t,{floatPrecision:r,noSpaceAfterFlags:o}),s=null}
for(let r=1;r<e.children.length;r++){const o=e.children[r]
if("element"!==a.type||"path"!==a.name||0!==a.children.length||null==a.attributes.d){s&&"element"===a.type&&l(a,s),a=o
continue}if("element"!==o.type||"path"!==o.name||0!==o.children.length||null==o.attributes.d){s&&l(a,s),a=o
continue}const c=Tb(i,o)
if(c["marker-start"]||c["marker-mid"]||c["marker-end"]||c["clip-path"]||c.mask||c["mask-image"]||["fill","filter","stroke"].some(e=>iv(c,e))){s&&l(a,s),a=o
continue}const u=Object.keys(o.attributes)
if(u.length!==Object.keys(a.attributes).length){s&&l(a,s),a=o
continue}if(u.some(e=>"d"!==e&&"element"===a.type&&a.attributes[e]!==o.attributes[e])){s&&l(a,s),a=o
continue}const h=null!=s,d=Uy(o)
s=s??Uy(a),!n&&Yy(s,d)?(h&&l(a,s),a=o,s=null):(s.push(...d),t.push(o))}s&&"element"===a.type&&l(a,s),e.children=e.children.filter(e=>!t.includes(e))}}}},name:"mergePaths"})
var sv=Object.freeze({__proto__:null,description:"removes unused namespaces declaration",fn:()=>{const e=new Set
return{element:{enter:(t,n)=>{if("svg"===t.name&&"root"===n.type)for(const n of Object.keys(t.attributes))if(n.startsWith("xmlns:")){const t=n.slice(6)
e.add(t)}if(0!==e.size){if(t.name.includes(":")){const[n]=t.name.split(":")
e.has(n)&&e.delete(n)}for(const n of Object.keys(t.attributes))if(n.includes(":")){const[t]=n.split(":")
e.delete(t)}}},exit:(t,n)=>{if("svg"===t.name&&"root"===n.type)for(const n of e)delete t.attributes[`xmlns:${n}`]}}}},name:"removeUnusedNS"})
var lv=Object.freeze({__proto__:null,description:"Sort element attributes for better compression",fn:(e,t)=>{const{order:n=["id","width","height","x","x1","x2","y","y1","y2","cx","cy","r","fill","stroke","marker","d","points"],xmlnsOrder:r="front"}=t,o=e=>{if("front"===r){if("xmlns"===e)return 3
if(e.startsWith("xmlns:"))return 2}return e.includes(":")?1:0},i=([e],[t])=>{const r=o(e),i=o(t)-r
if(0!==i)return i
const[a]=e.split("-"),[s]=t.split("-")
if(a!==s){const e=n.includes(a)?1:0,t=n.includes(s)?1:0
if(1===e&&1===t)return n.indexOf(a)-n.indexOf(s)
const r=t-e
if(0!==r)return r}return e<t?-1:1}
return{element:{enter:e=>{const t=Object.entries(e.attributes)
t.sort(i)
const n={}
for(const[e,r]of t)n[e]=r
e.attributes=n}}}},name:"sortAttrs"})
var cv=Object.freeze({__proto__:null,description:"Sorts children of <defs> to improve compression",fn:()=>({element:{enter:e=>{if("defs"===e.name){const t=new Map
for(const n of e.children)if("element"===n.type){const e=t.get(n.name)
null==e?t.set(n.name,1):t.set(n.name,e+1)}e.children.sort((e,n)=>{if("element"!==e.type||"element"!==n.type)return 0
const r=t.get(e.name),o=t.get(n.name)
if(null!=r&&null!=o){const e=o-r
if(0!==e)return e}const i=n.name.length-e.name.length
return 0!==i?i:e.name!==n.name?e.name>n.name?-1:1:0})}}}}),name:"sortDefsChildren"})
const uv=/^(Created with|Created using)/
var hv=Object.freeze({__proto__:null,description:"removes <desc>",fn:(e,t)=>{const{removeAny:n=!1}=t
return{element:{enter:(e,t)=>{"desc"===e.name&&(n||0===e.children.length||"text"===e.children[0].type&&uv.test(e.children[0].value))&&St(e,t)}}}},name:"removeDesc"})
const dv=(({name:e,plugins:t})=>({name:e,isPreset:!0,plugins:Object.freeze(t),fn:(n,o,i)=>{const{floatPrecision:a,overrides:s}=o,l={}
if(null!=a&&(l.floatPrecision=a),s){const n=t.map(({name:e})=>e)
for(const t of Object.keys(s))n.includes(t)||console.warn(`You are trying to configure ${t} which is not part of ${e}.\nTry to put it before or after, for example\n\nplugins: [\n  {\n    name: '${e}',\n  },\n  '${t}'\n]\n`)}r(n,i,t,s,l)}}))({name:"preset-default",plugins:[Ct,At,zt,Pb,Lb,Nb,Ib,Rb,Bb,Qb,ty,ry,ay,dy,gy,by,yy,wy,Ly,Ny,jy,My,Iy,Fy,qy,Qk,nv,rv,ov,av,sv,lv,cv,hv]})
var pv=Object.freeze({__proto__:null,description:"adds attributes to an outer <svg> element",fn:(e,t)=>{if(!Array.isArray(t.attributes)&&!t.attribute)return console.error('Error in plugin "addAttributesToSVGElement": absent parameters.\nIt should have a list of "attributes" or one "attribute".\nConfig example:\n\nplugins: [\n  {\n    name: \'addAttributesToSVGElement\',\n    params: {\n      attribute: "mySvg"\n    }\n  }\n]\n\nplugins: [\n  {\n    name: \'addAttributesToSVGElement\',\n    params: {\n      attributes: ["mySvg", "size-big"]\n    }\n  }\n]\n\nplugins: [\n  {\n    name: \'addAttributesToSVGElement\',\n    params: {\n      attributes: [\n        {\n          focusable: false\n        },\n        {\n          \'data-image\': icon\n        }\n      ]\n    }\n  }\n]\n'),null
const n=t.attributes||[t.attribute]
return{element:{enter:(e,t)=>{if("svg"===e.name&&"root"===t.type)for(const t of n)if("string"==typeof t&&null==e.attributes[t]&&(e.attributes[t]=void 0),"object"==typeof t)for(const n of Object.keys(t))null==e.attributes[n]&&(e.attributes[n]=t[n])}}}},name:"addAttributesToSVGElement"})
var mv=Object.freeze({__proto__:null,description:"adds classnames to an outer <svg> element",fn:(e,t,n)=>{if(!(Array.isArray(t.classNames)&&0!==t.classNames.length||t.className))return console.error('Error in plugin "addClassesToSVGElement": absent parameters.\nIt should have a list of classes in "classNames" or one "className".\nConfig example:\n\nplugins: [\n  {\n    name: "addClassesToSVGElement",\n    params: {\n      className: "mySvg"\n    }\n  }\n]\n\nplugins: [\n  {\n    name: "addClassesToSVGElement",\n    params: {\n      classNames: ["mySvg", "size-big"]\n    }\n  }\n]\n'),null
const r=t.classNames||[t.className]
return{element:{enter:(e,t)=>{if("svg"===e.name&&"root"===t.type){const t=new Set(null==e.attributes.class?null:e.attributes.class.split(" "))
for(const o of r)if(null!=o){const r="string"==typeof o?o:o(e,n)
t.add(r)}e.attributes.class=Array.from(t).join(" ")}}}}},name:"addClassesToSVGElement"})
const fv=/^([-+]?\d*\.?\d+([eE][-+]?\d+)?)(px|pt|pc|mm|cm|m|in|ft|em|ex|%)?$/,gv=/\s+,?\s*|,\s*/,bv={cm:96/2.54,mm:96/25.4,in:96,pt:4/3,pc:16,px:1}
var yv=Object.freeze({__proto__:null,description:"rounds list of values to the fixed precision",fn:(e,t)=>{const{floatPrecision:n=3,leadingZero:r=!0,defaultPx:o=!0,convertToPx:i=!0}=t,a=e=>{const t=[]
for(const a of e.split(gv)){const e=a.match(fv),s=a.match(/new/)
if(e){let a=Number(Number(e[1]).toFixed(n))
let s,l=e[3]||""
if(i&&l&&l in bv){const t=Number((bv[l]*Number(e[1])).toFixed(n))
t.toString().length<e[0].length&&(a=t,l="px")}s=r?Vb(a):a.toString(),o&&"px"===l&&(l=""),t.push(s+l)}else s?t.push("new"):a&&t.push(a)}return t.join(" ")}
return{element:{enter:e=>{null!=e.attributes.points&&(e.attributes.points=a(e.attributes.points)),null!=e.attributes["enable-background"]&&(e.attributes["enable-background"]=a(e.attributes["enable-background"])),null!=e.attributes.viewBox&&(e.attributes.viewBox=a(e.attributes.viewBox)),null!=e.attributes["stroke-dasharray"]&&(e.attributes["stroke-dasharray"]=a(e.attributes["stroke-dasharray"])),null!=e.attributes.dx&&(e.attributes.dx=a(e.attributes.dx)),null!=e.attributes.dy&&(e.attributes.dy=a(e.attributes.dy)),null!=e.attributes.x&&(e.attributes.x=a(e.attributes.x)),null!=e.attributes.y&&(e.attributes.y=a(e.attributes.y))}}}},name:"cleanupListOfValues"})
var kv=Object.freeze({__proto__:null,description:"converts one-stop (single color) gradients to a plain color",fn:e=>{const t=zb(e),n=new Set,r=new Map,o=new Map
let i=0
return{element:{enter:(a,s)=>{if(null!=a.attributes["xlink:href"]&&i++,"defs"===a.name)return r.set(a,s),void 0
if("linearGradient"!==a.name&&"radialGradient"!==a.name)return
const l=a.children.filter(e=>"element"===e.type&&"stop"===e.name),c=a.attributes["xlink:href"]||a.attributes.href,u=0===l.length&&null!=c&&c.startsWith("#")?wt(e,c):a
if(null==u||"element"!==u.type)return o.set(a,s),void 0
const h=u.children.filter(e=>"element"===e.type&&"stop"===e.name)
if(1!==h.length||"element"!==h[0].type)return
let d
"element"===s.type&&"defs"===s.name&&n.add(s),o.set(a,s)
const p=Tb(t,h[0])["stop-color"]
null!=p&&"static"===p.type&&(d=p.value)
const m=`url(#${a.attributes.id})`,f=[...qt].map(e=>`[${e}="${m}"]`).join(","),g=vt(e,f)
for(const e of g)if("element"===e.type)for(const t of qt)e.attributes[t]===m&&(null!=d?e.attributes[t]=d:delete e.attributes[t])
const b=vt(e,`[style*=${m}]`)
for(const e of b)"element"===e.type&&(e.attributes.style=e.attributes.style.replace(m,d||Lt.presentation["stop-color"]))},exit:e=>{if("svg"===e.name){for(const[e,t]of o.entries())null!=e.attributes["xlink:href"]&&i--,St(e,t)
0===i&&delete e.attributes["xmlns:xlink"]
for(const[e,t]of r.entries())n.has(e)&&0===e.children.length&&St(e,t)}}}}},name:"convertOneStopGradients"})
const vv=(...e)=>"(?:"+e.join("|")+")",wv=Pt.presentation,xv="\\\\(?:[0-9a-f]{1,6}\\s?|\\r\\n|.)",Sv="\\s*("+vv("[^:;\\\\]",xv)+"*?)\\s*",Cv="'(?:[^'\\n\\r\\\\]|"+xv+")*?(?:'|$)",Av='"(?:[^"\\n\\r\\\\]|'+xv+')*?(?:"|$)',_v=new RegExp("^"+vv(Cv,Av)+"$"),zv="\\("+vv("[^'\"()\\\\]+",xv,Cv,Av)+"*?\\)",Tv="\\s*("+vv("[^!'\"();\\\\]+?",xv,Cv,Av,zv,"[^;]*?")+"*?)",Ev=new RegExp(Sv+":"+Tv+"(\\s*!important(?![-(\\w]))?\\s*(?:;\\s*|$)","ig"),Ov=new RegExp(vv(xv,Cv,Av,"/\\*[^]*?\\*/"),"ig")
var Pv=Object.freeze({__proto__:null,description:"converts style to attributes",fn:(e,t)=>{const{keepImportant:n=!1}=t
return{element:{enter:e=>{if(null!=e.attributes.style){let r=[]
const o={},i=e.attributes.style.replace(Ov,e=>"/"==e[0]?"":"\\"==e[0]&&/[-g-z]/i.test(e[1])?e[1]:e)
Ev.lastIndex=0
for(var t;t=Ev.exec(i);)n&&t[3]||r.push([t[1],t[2]])
r.length&&(r=r.filter(function(e){if(e[0]){const t=e[0].toLowerCase()
let n=e[1]
if(_v.test(n)&&(n=n.slice(1,-1)),wv.has(t))return o[t]=n,!1}return!0}),Object.assign(e.attributes,o),r.length?e.attributes.style=r.map(e=>e.join(":")).join(";"):delete e.attributes.style)}}}}},name:"convertStyleToAttrs"})
const Lv=(e,t)=>{const n=e(t)
return t.startsWith(n)?t:n+t},Nv=(e,t)=>t.startsWith("#")?"#"+Lv(e,t.slice(1)):null
var Dv=Object.freeze({__proto__:null,description:"prefix IDs",fn:(e,t,n)=>{const{delim:r="__",prefix:o,prefixIds:i=!0,prefixClassNames:a=!0}=t,s=new Map
return{element:{enter:e=>{const t=t=>((e,t,n,r,o,i)=>{if("function"==typeof r){let a=i.get(e)
return null!=a||(a=r(t,n)+o,i.set(e,a)),a}return"string"==typeof r?r+o:!1===r?"":null!=n.path&&n.path.length>0?(e=>{const t=/[/\\]?([^/\\]+)$/.exec(e)
return t?t[1]:""})(n.path).replace(/[. ]/g,"_")+o:"prefix"+o})(t,e,n,o,r,s)
if("style"===e.name){if(0===e.children.length)return
for(const n of e.children){if("text"!==n.type&&"cdata"!==n.type)continue
const e=n.value
let r
try{r=tc(e,{parseValue:!0,parseCustomProperty:!1})}catch{return}ic(r,e=>{if(i&&"IdSelector"===e.type||a&&"ClassSelector"===e.type)return e.name=Lv(t,e.name),void 0
if("Url"===e.type&&e.value.length>0){const r=Nv(t,(n=e.value).startsWith('"')&&n.endsWith('"')||n.startsWith("'")&&n.endsWith("'")?n.slice(1,-1):n)
null!=r&&(e.value=r)}var n}),n.value=nc(r)}}i&&null!=e.attributes.id&&0!==e.attributes.id.length&&(e.attributes.id=Lv(t,e.attributes.id)),a&&null!=e.attributes.class&&0!==e.attributes.class.length&&(e.attributes.class=e.attributes.class.split(/\s+/).map(e=>Lv(t,e)).join(" "))
for(const n of["href","xlink:href"])if(null!=e.attributes[n]&&0!==e.attributes[n].length){const r=Nv(t,e.attributes[n])
null!=r&&(e.attributes[n]=r)}for(const n of Mt)null!=e.attributes[n]&&0!==e.attributes[n].length&&(e.attributes[n]=e.attributes[n].replace(/\burl\((["'])?(#.+?)\1\)/gi,(e,n,r)=>{const o=Nv(t,r)
return null==o?e:`url(${o})`}))
for(const n of["begin","end"])if(null!=e.attributes[n]&&0!==e.attributes[n].length){const r=e.attributes[n].split(/\s*;\s+/).map(e=>{if(e.endsWith(".end")||e.endsWith(".start")){const[n,r]=e.split(".")
return`${Lv(t,n)}.${r}`}return e})
e.attributes[n]=r.join("; ")}}}}},name:"prefixIds"})
var jv=Object.freeze({__proto__:null,description:"removes attributes of elements that match a css selector",fn:(e,t)=>{const n=Array.isArray(t.selectors)?t.selectors:[t]
for(const{selector:t,attributes:r}of n){const n=vt(e,t)
for(const e of n)if("element"===e.type)if(Array.isArray(r))for(const t of r)delete e.attributes[t]
else delete e.attributes[r]}return{}},name:"removeAttributesBySelector"})
var Mv=Object.freeze({__proto__:null,description:"removes specified attributes",fn:(e,t)=>{if(void 0===t.attrs)return console.warn('Warning: The plugin "removeAttrs" requires the "attrs" parameter.\nIt should have a pattern to remove, otherwise the plugin is a noop.\nConfig example:\n\nplugins: [\n  {\n    name: "removeAttrs",\n    params: {\n      attrs: "(fill|stroke)"\n    }\n  }\n]\n'),null
const n="string"==typeof t.elemSeparator?t.elemSeparator:":",r="boolean"==typeof t.preserveCurrentColor&&t.preserveCurrentColor,o=Array.isArray(t.attrs)?t.attrs:[t.attrs]
return{element:{enter:e=>{for(let t of o){t.includes(n)?t.split(n).length<3&&(t=[t,".*"].join(n)):t=[".*",t,".*"].join(n)
const o=t.split(n).map(e=>("*"===e&&(e=".*"),new RegExp(["^",e,"$"].join(""),"i")))
if(o[0].test(e.name))for(const[t,n]of Object.entries(e.attributes)){const i="currentcolor"===n.toLowerCase()
!(r&&"fill"==t&&i)&&!(r&&"stroke"==t&&i)&&o[1].test(t)&&o[2].test(n)&&delete e.attributes[t]}}}}}},name:"removeAttrs"})
var Iv=Object.freeze({__proto__:null,description:"removes width and height in presence of viewBox (opposite to removeViewBox)",fn:()=>({element:{enter:e=>{if("svg"===e.name)if(null!=e.attributes.viewBox)delete e.attributes.width,delete e.attributes.height
else if(null!=e.attributes.width&&null!=e.attributes.height&&!1===Number.isNaN(Number(e.attributes.width))&&!1===Number.isNaN(Number(e.attributes.height))){const t=Number(e.attributes.width),n=Number(e.attributes.height)
e.attributes.viewBox=`0 0 ${t} ${n}`,delete e.attributes.width,delete e.attributes.height}}}}),name:"removeDimensions"})
var Rv=Object.freeze({__proto__:null,description:"removes arbitrary elements by ID or className (disabled by default)",fn:(e,t)=>{const n=null==t.id?[]:Array.isArray(t.id)?t.id:[t.id],r=null==t.class?[]:Array.isArray(t.class)?t.class:[t.class]
return{element:{enter:(e,t)=>{if(null!=e.attributes.id&&0!==n.length&&n.includes(e.attributes.id)&&St(e,t),e.attributes.class&&0!==r.length){const n=e.attributes.class.split(" ")
for(const o of r)if(n.includes(o)){St(e,t)
break}}}}}},name:"removeElementsByAttr"})
var Fv=Object.freeze({__proto__:null,description:"removes elements that are drawn outside of the viewBox (disabled by default)",fn:()=>{let e=null
return{element:{enter:(n,r)=>{if("svg"===n.name&&"root"===r.type){let t=""
null!=n.attributes.viewBox?t=n.attributes.viewBox:null!=n.attributes.height&&null!=n.attributes.width&&(t=`0 0 ${n.attributes.width} ${n.attributes.height}`),t=t.replace(/[,+]|px/g," ").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")
const r=/^(-?\d*\.?\d+) (-?\d*\.?\d+) (\d*\.?\d+) (\d*\.?\d+)$/.exec(t)
if(null==r)return
const o=Number.parseFloat(r[1]),i=Number.parseFloat(r[2]),a=Number.parseFloat(r[3]),s=Number.parseFloat(r[4])
e={left:o,top:i,right:o+a,bottom:i+s,width:a,height:s}}if(null!=n.attributes.transform)return t
if("path"===n.name&&null!=n.attributes.d&&null!=e){const t=zy(n.attributes.d)
let o=!1
for(const n of t)if("M"===n.command){const[t,r]=n.args
t>=e.left&&t<=e.right&&r>=e.top&&r<=e.bottom&&(o=!0)}if(o)return
2===t.length&&t.push({command:"z",args:[]})
const{left:i,top:a,width:s,height:l}=e
!1===Yy([{command:"M",args:[i,a]},{command:"h",args:[s]},{command:"v",args:[l]},{command:"H",args:[i]},{command:"z",args:[]}],t)&&St(n,r)}}}}},name:"removeOffCanvasPaths"})
var Bv=Object.freeze({__proto__:null,description:"removes raster images (disabled by default)",fn:()=>({element:{enter:(e,t)=>{"image"===e.name&&null!=e.attributes["xlink:href"]&&/(\.|image\/)(jpe?g|png|gif)/.test(e.attributes["xlink:href"])&&St(e,t)}}}),name:"removeRasterImages"})
const qv=[...Pt.animationEvent,...Pt.documentEvent,...Pt.documentElementEvent,...Pt.globalEvent,...Pt.graphicalEvent]
var Gv=Object.freeze({__proto__:null,description:"removes scripts (disabled by default)",fn:()=>({element:{enter:(e,t)=>{if("script"===e.name)return St(e,t),void 0
for(const t of qv)null!=e.attributes[t]&&delete e.attributes[t]},exit:(e,t)=>{if("a"===e.name)for(const n of Object.keys(e.attributes))if("href"===n||n.endsWith(":href")){if(null==e.attributes[n]||!e.attributes[n].trimStart().startsWith("javascript:"))continue
const r=t.children.indexOf(e),o=e.children.filter(e=>"text"!==e.type)
t.children.splice(r,1,...o)}}}}),name:"removeScripts"})
var Uv=Object.freeze({__proto__:null,description:"removes <style> element (disabled by default)",fn:()=>({element:{enter:(e,t)=>{"style"===e.name&&St(e,t)}}}),name:"removeStyleElement"})
var Wv=Object.freeze({__proto__:null,description:"removes <title>",fn:()=>({element:{enter:(e,t)=>{"title"===e.name&&St(e,t)}}}),name:"removeTitle"})
const Vv=new Set(["pattern","svg","symbol"])
var $v=Object.freeze({__proto__:null,description:"removes viewBox attribute when possible",fn:()=>({element:{enter:(e,t)=>{if(Vv.has(e.name)&&null!=e.attributes.viewBox&&null!=e.attributes.width&&null!=e.attributes.height){if("svg"===e.name&&"root"!==t.type)return
const n=e.attributes.viewBox.split(/[ ,]+/g)
"0"===n[0]&&"0"===n[1]&&e.attributes.width.replace(/px$/,"")===n[2]&&e.attributes.height.replace(/px$/,"")===n[3]&&delete e.attributes.viewBox}}}}),name:"removeViewBox"})
const Yv="http://www.w3.org/1999/xlink",Xv={new:"_blank",replace:"_self"},Hv=new Set(["cursor","filter","font-face-uri","glyphRef","tref"]),Qv=(e,t,n)=>t.map(e=>`${e}:${n}`).filter(t=>null!=e.attributes[t])
var Kv=Object.freeze({__proto__:null,description:"remove xlink namespace and replaces attributes with the SVG 2 equivalent where applicable",fn:(e,t)=>{const{includeLegacy:n}=t,r=[],o=[],i=[]
return{element:{enter:e=>{for(const[t,n]of Object.entries(e.attributes))if(t.startsWith("xmlns:")){const e=t.split(":",2)[1]
if(n===Yv){r.push(e)
continue}r.includes(e)&&o.push(e)}if(o.some(e=>r.includes(e)))return
const t=Qv(e,r,"show")
let a=null!=e.attributes.target
for(let n=t.length-1;n>=0;n--){const r=t[n],o=e.attributes[r],i=Xv[o]
a||null==i?delete e.attributes[r]:(i!==Dt[e.name]?.defaults?.target&&(e.attributes.target=i),delete e.attributes[r],a=!0)}const s=Qv(e,r,"title")
for(let t=s.length-1;t>=0;t--){const n=s[t],r=e.attributes[n]
if(e.children.filter(e=>"element"===e.type&&"title"===e.name).length>0){delete e.attributes[n]
continue}const o={type:"element",name:"title",attributes:{},children:[{type:"text",value:r}]}
Object.defineProperty(o,"parentNode",{writable:!0,value:e}),e.children.unshift(o),delete e.attributes[n]}const l=Qv(e,r,"href")
if(l.length>0&&Hv.has(e.name)&&!n)return l.map(e=>e.split(":",1)[0]).forEach(e=>i.push(e)),void 0
for(let t=l.length-1;t>=0;t--){const n=l[t],r=e.attributes[n]
null==e.attributes.href?(e.attributes.href=r,delete e.attributes[n]):delete e.attributes[n]}},exit:e=>{for(const[t,a]of Object.entries(e.attributes)){const[s,l]=t.split(":",2)
if(!r.includes(s)||o.includes(s)||i.includes(s)||n){if(t.startsWith("xmlns:")&&!i.includes(l)){if(a===Yv){const n=r.indexOf(l)
r.splice(n,1),delete e.attributes[t]
continue}if(o.includes(s)){const e=o.indexOf(l)
o.splice(e,1)}}}else delete e.attributes[t]}}}}},name:"removeXlink"})
var Zv=Object.freeze({__proto__:null,description:"removes xmlns attribute (for inline svg, disabled by default)",fn:()=>({element:{enter:e=>{"svg"===e.name&&delete e.attributes.xmlns}}}),name:"removeXMLNS"})
var Jv=Object.freeze({__proto__:null,description:"Finds <path> elements with the same d, fill, and stroke, and converts them to <use> elements referencing a single <path> def.",fn:e=>{const t=zb(e),n=new Map
let r
const o=new Set
return{element:{enter:(e,t)=>{if("path"===e.name&&null!=e.attributes.d){const t=e.attributes.d,r=e.attributes.fill||"",o=t+";s:"+(e.attributes.stroke||"")+";f:"+r
let i=n.get(o)
null==i&&(i=[],n.set(o,i)),i.push(e)}if(null==r&&"defs"===e.name&&"element"===t.type&&"svg"===t.name&&(r=e),"use"===e.name)for(const t of["href","xlink:href"]){const n=e.attributes[t]
null!=n&&n.startsWith("#")&&n.length>1&&o.add(n.slice(1))}},exit:(e,i)=>{if("svg"===e.name&&"root"===i.type){let i=r
null==i&&(i={type:"element",name:"defs",attributes:{},children:[]})
let a=0
for(const r of n.values())if(r.length>1){const n={type:"element",name:"path",attributes:{},children:[]}
for(const e of["fill","stroke","d"])null!=r[0].attributes[e]&&(n.attributes[e]=r[0].attributes[e])
const s=r[0].attributes.id
null==s||o.has(s)||t.rules.some(e=>e.selector===`#${s}`)?n.attributes.id="reuse-"+a++:(n.attributes.id=s,delete r[0].attributes.id),i.children.push(n)
for(const t of r){if(delete t.attributes.d,delete t.attributes.stroke,delete t.attributes.fill,i.children.includes(t)&&0===t.children.length){if(0===Object.keys(t.attributes).length){St(t,i)
continue}if(1===Object.keys(t.attributes).length&&null!=t.attributes.id){St(t,i)
const r=`[xlink\\:href=#${t.attributes.id}], [href=#${t.attributes.id}]`
for(const t of vt(e,r))if("element"===t.type)for(const e of["href","xlink:href"])null!=t.attributes[e]&&(t.attributes[e]="#"+n.attributes.id)
continue}}t.name="use",t.attributes["xlink:href"]="#"+n.attributes.id}}0!==i.children.length&&(null==e.attributes["xmlns:xlink"]&&(e.attributes["xmlns:xlink"]="http://www.w3.org/1999/xlink"),null==r&&e.children.unshift(i))}}}}},name:"reusePaths"})
const ew=Object.freeze([dv,pv,mv,Ib,wy,ty,yv,ay,qy,dy,My,kv,Qk,jy,Pv,nv,Bb,av,Rb,Qb,Iy,Fy,Dv,jv,Mv,zt,Pb,hv,Iv,Ct,Nb,Rv,rv,ov,Ny,Ly,Lb,by,Fv,Bv,Gv,Uv,Wv,gy,sv,ry,yy,$v,Kv,Zv,At,Jv,lv,cv])
var tw={}
void!function(t){t.parser=function(e,t){return new o(e,t)},t.SAXParser=o,t.SAXStream=a,t.createStream=function(e,t){return new a(e,t)},t.MAX_BUFFER_LENGTH=65536
var n,r=["comment","sgmlDecl","textNode","tagName","doctype","procInstName","procInstBody","entity","attribName","attribValue","cdata","script"]
function o(e,n){if(!(this instanceof o))return new o(e,n)
var i=this
!function(e){for(var t=0,n=r.length;t<n;t++)e[r[t]]=""}(i),i.q=i.c="",i.bufferCheckPosition=t.MAX_BUFFER_LENGTH,i.opt=n||{},i.opt.lowercase=i.opt.lowercase||i.opt.lowercasetags,i.looseCase=i.opt.lowercase?"toLowerCase":"toUpperCase",i.tags=[],i.closed=i.closedRoot=i.sawRoot=!1,i.tag=i.error=null,i.strict=!!e,i.noscript=!(!e&&!i.opt.noscript),i.state=C.BEGIN,i.strictEntities=i.opt.strictEntities,i.ENTITIES=i.strictEntities?Object.create(t.XML_ENTITIES):Object.create(t.ENTITIES),i.attribList=[],i.opt.xmlns&&(i.ns=Object.create(h)),void 0===i.opt.unquotedAttributeValues&&(i.opt.unquotedAttributeValues=!e),i.trackPosition=!1!==i.opt.position,i.trackPosition&&(i.position=i.line=i.column=0),_(i,"onready")}t.EVENTS=["text","processinginstruction","sgmldeclaration","doctype","comment","opentagstart","attribute","opentag","closetag","opencdata","cdata","closecdata","error","end","ready","script","opennamespace","closenamespace"],Object.create||(Object.create=function(e){function t(){}return t.prototype=e,new t}),Object.keys||(Object.keys=function(e){var t=[]
for(var n in e)e.hasOwnProperty(n)&&t.push(n)
return t}),o.prototype={end:function(){P(this)},write:function(e){var n=this
if(this.error)throw this.error
if(n.closed)return O(n,"Cannot write after close. Assign an onready handler.")
if(null===e)return P(n)
"object"==typeof e&&(e=e.toString())
for(var o=0,i="";i=B(e,o++),n.c=i,i;)switch(n.trackPosition&&(n.position++,"\n"===i?(n.line++,n.column=0):n.column++),n.state){case C.BEGIN:if(n.state=C.BEGIN_WHITESPACE,"\ufeff"===i)continue
F(n,i)
continue
case C.BEGIN_WHITESPACE:F(n,i)
continue
case C.TEXT:if(n.sawRoot&&!n.closedRoot){for(var a=o-1;i&&"<"!==i&&"&"!==i;)(i=B(e,o++))&&n.trackPosition&&(n.position++,"\n"===i?(n.line++,n.column=0):n.column++)
n.textNode+=e.substring(a,o-1)}"<"!==i||n.sawRoot&&n.closedRoot&&!n.strict?(g(i)||n.sawRoot&&!n.closedRoot||L(n,"Text data outside of root node."),"&"===i?n.state=C.TEXT_ENTITY:n.textNode+=i):(n.state=C.OPEN_WAKA,n.startTagPosition=n.position)
continue
case C.SCRIPT:"<"===i?n.state=C.SCRIPT_ENDING:n.script+=i
continue
case C.SCRIPT_ENDING:"/"===i?n.state=C.CLOSE_TAG:(n.script+="<"+i,n.state=C.SCRIPT)
continue
case C.OPEN_WAKA:if("!"===i)n.state=C.SGML_DECL,n.sgmlDecl=""
else if(g(i));else if(k(d,i))n.state=C.OPEN_TAG,n.tagName=i
else if("/"===i)n.state=C.CLOSE_TAG,n.tagName=""
else if("?"===i)n.state=C.PROC_INST,n.procInstName=n.procInstBody=""
else{if(L(n,"Unencoded <"),n.startTagPosition+1<n.position){var c=n.position-n.startTagPosition
i=new Array(c).join(" ")+i}n.textNode+="<"+i,n.state=C.TEXT}continue
case C.SGML_DECL:if(n.sgmlDecl+i==="--"){n.state=C.COMMENT,n.comment="",n.sgmlDecl=""
continue}n.doctype&&!0!==n.doctype&&n.sgmlDecl?(n.state=C.DOCTYPE_DTD,n.doctype+="<!"+n.sgmlDecl+i,n.sgmlDecl=""):(n.sgmlDecl+i).toUpperCase()===s?(z(n,"onopencdata"),n.state=C.CDATA,n.sgmlDecl="",n.cdata=""):(n.sgmlDecl+i).toUpperCase()===l?(n.state=C.DOCTYPE,(n.doctype||n.sawRoot)&&L(n,"Inappropriately located doctype declaration"),n.doctype="",n.sgmlDecl=""):">"===i?(z(n,"onsgmldeclaration",n.sgmlDecl),n.sgmlDecl="",n.state=C.TEXT):b(i)?(n.state=C.SGML_DECL_QUOTED,n.sgmlDecl+=i):n.sgmlDecl+=i
continue
case C.SGML_DECL_QUOTED:i===n.q&&(n.state=C.SGML_DECL,n.q=""),n.sgmlDecl+=i
continue
case C.DOCTYPE:">"===i?(n.state=C.TEXT,z(n,"ondoctype",n.doctype),n.doctype=!0):(n.doctype+=i,"["===i?n.state=C.DOCTYPE_DTD:b(i)&&(n.state=C.DOCTYPE_QUOTED,n.q=i))
continue
case C.DOCTYPE_QUOTED:n.doctype+=i,i===n.q&&(n.q="",n.state=C.DOCTYPE)
continue
case C.DOCTYPE_DTD:"]"===i?(n.doctype+=i,n.state=C.DOCTYPE):"<"===i?(n.state=C.OPEN_WAKA,n.startTagPosition=n.position):b(i)?(n.doctype+=i,n.state=C.DOCTYPE_DTD_QUOTED,n.q=i):n.doctype+=i
continue
case C.DOCTYPE_DTD_QUOTED:n.doctype+=i,i===n.q&&(n.state=C.DOCTYPE_DTD,n.q="")
continue
case C.COMMENT:"-"===i?n.state=C.COMMENT_ENDING:n.comment+=i
continue
case C.COMMENT_ENDING:"-"===i?(n.state=C.COMMENT_ENDED,n.comment=E(n.opt,n.comment),n.comment&&z(n,"oncomment",n.comment),n.comment=""):(n.comment+="-"+i,n.state=C.COMMENT)
continue
case C.COMMENT_ENDED:">"!==i?(L(n,"Malformed comment"),n.comment+="--"+i,n.state=C.COMMENT):n.doctype&&!0!==n.doctype?n.state=C.DOCTYPE_DTD:n.state=C.TEXT
continue
case C.CDATA:"]"===i?n.state=C.CDATA_ENDING:n.cdata+=i
continue
case C.CDATA_ENDING:"]"===i?n.state=C.CDATA_ENDING_2:(n.cdata+="]"+i,n.state=C.CDATA)
continue
case C.CDATA_ENDING_2:">"===i?(n.cdata&&z(n,"oncdata",n.cdata),z(n,"onclosecdata"),n.cdata="",n.state=C.TEXT):"]"===i?n.cdata+="]":(n.cdata+="]]"+i,n.state=C.CDATA)
continue
case C.PROC_INST:"?"===i?n.state=C.PROC_INST_ENDING:g(i)?n.state=C.PROC_INST_BODY:n.procInstName+=i
continue
case C.PROC_INST_BODY:if(!n.procInstBody&&g(i))continue
"?"===i?n.state=C.PROC_INST_ENDING:n.procInstBody+=i
continue
case C.PROC_INST_ENDING:">"===i?(z(n,"onprocessinginstruction",{name:n.procInstName,body:n.procInstBody}),n.procInstName=n.procInstBody="",n.state=C.TEXT):(n.procInstBody+="?"+i,n.state=C.PROC_INST_BODY)
continue
case C.OPEN_TAG:k(p,i)?n.tagName+=i:(N(n),">"===i?M(n):"/"===i?n.state=C.OPEN_TAG_SLASH:(g(i)||L(n,"Invalid character in tag name"),n.state=C.ATTRIB))
continue
case C.OPEN_TAG_SLASH:">"===i?(M(n,!0),I(n)):(L(n,"Forward-slash in opening tag not followed by >"),n.state=C.ATTRIB)
continue
case C.ATTRIB:if(g(i))continue
">"===i?M(n):"/"===i?n.state=C.OPEN_TAG_SLASH:k(d,i)?(n.attribName=i,n.attribValue="",n.state=C.ATTRIB_NAME):L(n,"Invalid attribute name")
continue
case C.ATTRIB_NAME:"="===i?n.state=C.ATTRIB_VALUE:">"===i?(L(n,"Attribute without value"),n.attribValue=n.attribName,j(n),M(n)):g(i)?n.state=C.ATTRIB_NAME_SAW_WHITE:k(p,i)?n.attribName+=i:L(n,"Invalid attribute name")
continue
case C.ATTRIB_NAME_SAW_WHITE:if("="===i)n.state=C.ATTRIB_VALUE
else{if(g(i))continue
L(n,"Attribute without value"),n.tag.attributes[n.attribName]="",n.attribValue="",z(n,"onattribute",{name:n.attribName,value:""}),n.attribName="",">"===i?M(n):k(d,i)?(n.attribName=i,n.state=C.ATTRIB_NAME):(L(n,"Invalid attribute name"),n.state=C.ATTRIB)}continue
case C.ATTRIB_VALUE:if(g(i))continue
b(i)?(n.q=i,n.state=C.ATTRIB_VALUE_QUOTED):(n.opt.unquotedAttributeValues||O(n,"Unquoted attribute value"),n.state=C.ATTRIB_VALUE_UNQUOTED,n.attribValue=i)
continue
case C.ATTRIB_VALUE_QUOTED:if(i!==n.q){"&"===i?n.state=C.ATTRIB_VALUE_ENTITY_Q:n.attribValue+=i
continue}j(n),n.q="",n.state=C.ATTRIB_VALUE_CLOSED
continue
case C.ATTRIB_VALUE_CLOSED:g(i)?n.state=C.ATTRIB:">"===i?M(n):"/"===i?n.state=C.OPEN_TAG_SLASH:k(d,i)?(L(n,"No whitespace between attributes"),n.attribName=i,n.attribValue="",n.state=C.ATTRIB_NAME):L(n,"Invalid attribute name")
continue
case C.ATTRIB_VALUE_UNQUOTED:if(!y(i)){"&"===i?n.state=C.ATTRIB_VALUE_ENTITY_U:n.attribValue+=i
continue}j(n),">"===i?M(n):n.state=C.ATTRIB
continue
case C.CLOSE_TAG:if(n.tagName)">"===i?I(n):k(p,i)?n.tagName+=i:n.script?(n.script+="</"+n.tagName,n.tagName="",n.state=C.SCRIPT):(g(i)||L(n,"Invalid tagname in closing tag"),n.state=C.CLOSE_TAG_SAW_WHITE)
else{if(g(i))continue
v(d,i)?n.script?(n.script+="</"+i,n.state=C.SCRIPT):L(n,"Invalid tagname in closing tag."):n.tagName=i}continue
case C.CLOSE_TAG_SAW_WHITE:if(g(i))continue
">"===i?I(n):L(n,"Invalid characters in closing tag")
continue
case C.TEXT_ENTITY:case C.ATTRIB_VALUE_ENTITY_Q:case C.ATTRIB_VALUE_ENTITY_U:var u,h
switch(n.state){case C.TEXT_ENTITY:u=C.TEXT,h="textNode"
break
case C.ATTRIB_VALUE_ENTITY_Q:u=C.ATTRIB_VALUE_QUOTED,h="attribValue"
break
case C.ATTRIB_VALUE_ENTITY_U:u=C.ATTRIB_VALUE_UNQUOTED,h="attribValue"}if(";"===i){var w=R(n)
n.opt.unparsedEntities&&!Object.values(t.XML_ENTITIES).includes(w)?(n.entity="",n.state=u,n.write(w)):(n[h]+=w,n.entity="",n.state=u)}else k(n.entity.length?f:m,i)?n.entity+=i:(L(n,"Invalid character in entity name"),n[h]+="&"+n.entity+i,n.entity="",n.state=u)
continue
default:throw new Error(n,"Unknown state: "+n.state)}return n.position>=n.bufferCheckPosition&&!function(e){for(var n=Math.max(t.MAX_BUFFER_LENGTH,10),o=0,i=0,a=r.length;i<a;i++){var s=e[r[i]].length
if(s>n)switch(r[i]){case"textNode":T(e)
break
case"cdata":z(e,"oncdata",e.cdata),e.cdata=""
break
case"script":z(e,"onscript",e.script),e.script=""
break
default:O(e,"Max buffer length exceeded: "+r[i])}o=Math.max(o,s)}var l=t.MAX_BUFFER_LENGTH-o
e.bufferCheckPosition=l+e.position}(n),n},resume:function(){return this.error=null,this},close:function(){return this.write(null)},flush:function(){var e
T(e=this),""!==e.cdata&&(z(e,"oncdata",e.cdata),e.cdata=""),void(""!==e.script&&(z(e,"onscript",e.script),e.script=""))}}
try{n=require("stream").Stream}catch(e){n=function(){}}n||(n=function(){})
var i=t.EVENTS.filter(function(e){return"error"!==e&&"end"!==e})
function a(e,t){if(!(this instanceof a))return new a(e,t)
n.apply(this),this._parser=new o(e,t),this.writable=!0,this.readable=!0
var r=this
this._parser.onend=function(){r.emit("end")},this._parser.onerror=function(e){r.emit("error",e),r._parser.error=null},this._decoder=null,i.forEach(function(e){Object.defineProperty(r,"on"+e,{get:function(){return r._parser["on"+e]},set:function(t){if(!t)return r.removeAllListeners(e),r._parser["on"+e]=t,t
r.on(e,t)},enumerable:!0,configurable:!1})})}a.prototype=Object.create(n.prototype,{constructor:{value:a}}),a.prototype.write=function(t){if("function"==typeof Buffer&&"function"==typeof Buffer.isBuffer&&Buffer.isBuffer(t)){if(!this._decoder){var n=e.StringDecoder
this._decoder=new n("utf8")}t=this._decoder.write(t)}return this._parser.write(t.toString()),this.emit("data",t),!0},a.prototype.end=function(e){return e&&e.length&&this.write(e),this._parser.end(),!0},a.prototype.on=function(e,t){var r=this
return r._parser["on"+e]||-1===i.indexOf(e)||(r._parser["on"+e]=function(){var t=1===arguments.length?[arguments[0]]:Array.apply(null,arguments)
t.splice(0,0,e),r.emit.apply(r,t)}),n.prototype.on.call(r,e,t)}
var s="[CDATA[",l="DOCTYPE",c="http://www.w3.org/XML/1998/namespace",u="http://www.w3.org/2000/xmlns/",h={xml:c,xmlns:u},d=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,p=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,m=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,f=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/
function g(e){return" "===e||"\n"===e||"\r"===e||"\t"===e}function b(e){return'"'===e||"'"===e}function y(e){return">"===e||g(e)}function k(e,t){return e.test(t)}function v(e,t){return!k(e,t)}var w,x,S,C=0
for(var A in t.STATE={BEGIN:C++,BEGIN_WHITESPACE:C++,TEXT:C++,TEXT_ENTITY:C++,OPEN_WAKA:C++,SGML_DECL:C++,SGML_DECL_QUOTED:C++,DOCTYPE:C++,DOCTYPE_QUOTED:C++,DOCTYPE_DTD:C++,DOCTYPE_DTD_QUOTED:C++,COMMENT_STARTING:C++,COMMENT:C++,COMMENT_ENDING:C++,COMMENT_ENDED:C++,CDATA:C++,CDATA_ENDING:C++,CDATA_ENDING_2:C++,PROC_INST:C++,PROC_INST_BODY:C++,PROC_INST_ENDING:C++,OPEN_TAG:C++,OPEN_TAG_SLASH:C++,ATTRIB:C++,ATTRIB_NAME:C++,ATTRIB_NAME_SAW_WHITE:C++,ATTRIB_VALUE:C++,ATTRIB_VALUE_QUOTED:C++,ATTRIB_VALUE_CLOSED:C++,ATTRIB_VALUE_UNQUOTED:C++,ATTRIB_VALUE_ENTITY_Q:C++,ATTRIB_VALUE_ENTITY_U:C++,CLOSE_TAG:C++,CLOSE_TAG_SAW_WHITE:C++,SCRIPT:C++,SCRIPT_ENDING:C++},t.XML_ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'"},t.ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'",AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,aelig:230,agrave:224,aring:229,atilde:227,auml:228,ccedil:231,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,iacute:237,icirc:238,igrave:236,iuml:239,ntilde:241,oacute:243,ocirc:244,ograve:242,oslash:248,otilde:245,ouml:246,szlig:223,thorn:254,uacute:250,ucirc:251,ugrave:249,uuml:252,yacute:253,yuml:255,copy:169,reg:174,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,ordf:170,laquo:171,not:172,shy:173,macr:175,deg:176,plusmn:177,sup1:185,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,int:8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},Object.keys(t.ENTITIES).forEach(function(e){var n=t.ENTITIES[e],r="number"==typeof n?String.fromCharCode(n):n
t.ENTITIES[e]=r}),t.STATE)t.STATE[t.STATE[A]]=A
function _(e,t,n){e[t]&&e[t](n)}function z(e,t,n){e.textNode&&T(e),_(e,t,n)}function T(e){e.textNode=E(e.opt,e.textNode),e.textNode&&_(e,"ontext",e.textNode),e.textNode=""}function E(e,t){return e.trim&&(t=t.trim()),e.normalize&&(t=t.replace(/\s+/g," ")),t}function O(e,t){return T(e),e.trackPosition&&(t+="\nLine: "+e.line+"\nColumn: "+e.column+"\nChar: "+e.c),t=new Error(t),e.error=t,_(e,"onerror",t),e}function P(e){return e.sawRoot&&!e.closedRoot&&L(e,"Unclosed root tag"),e.state!==C.BEGIN&&e.state!==C.BEGIN_WHITESPACE&&e.state!==C.TEXT&&O(e,"Unexpected end"),T(e),e.c="",e.closed=!0,_(e,"onend"),o.call(e,e.strict,e.opt),e}function L(e,t){if("object"!=typeof e||!(e instanceof o))throw new Error("bad call to strictFail")
e.strict&&O(e,t)}function N(e){e.strict||(e.tagName=e.tagName[e.looseCase]())
var t=e.tags[e.tags.length-1]||e,n=e.tag={name:e.tagName,attributes:{}}
e.opt.xmlns&&(n.ns=t.ns),e.attribList.length=0,z(e,"onopentagstart",n)}function D(e,t){var n=e.indexOf(":")<0?["",e]:e.split(":"),r=n[0],o=n[1]
return t&&"xmlns"===e&&(r="xmlns",o=""),{prefix:r,local:o}}function j(e){if(e.strict||(e.attribName=e.attribName[e.looseCase]()),-1!==e.attribList.indexOf(e.attribName)||e.tag.attributes.hasOwnProperty(e.attribName))return e.attribName=e.attribValue="",void 0
if(e.opt.xmlns){var t=D(e.attribName,!0),n=t.prefix,r=t.local
if("xmlns"===n)if("xml"===r&&e.attribValue!==c)L(e,"xml: prefix must be bound to "+c+"\nActual: "+e.attribValue)
else if("xmlns"===r&&e.attribValue!==u)L(e,"xmlns: prefix must be bound to "+u+"\nActual: "+e.attribValue)
else{var o=e.tag,i=e.tags[e.tags.length-1]||e
o.ns===i.ns&&(o.ns=Object.create(i.ns)),o.ns[r]=e.attribValue}e.attribList.push([e.attribName,e.attribValue])}else e.tag.attributes[e.attribName]=e.attribValue,z(e,"onattribute",{name:e.attribName,value:e.attribValue})
e.attribName=e.attribValue=""}function M(e,t){if(e.opt.xmlns){var n=e.tag,r=D(e.tagName)
n.prefix=r.prefix,n.local=r.local,n.uri=n.ns[r.prefix]||"",n.prefix&&!n.uri&&(L(e,"Unbound namespace prefix: "+JSON.stringify(e.tagName)),n.uri=r.prefix)
var o=e.tags[e.tags.length-1]||e
n.ns&&o.ns!==n.ns&&Object.keys(n.ns).forEach(function(t){z(e,"onopennamespace",{prefix:t,uri:n.ns[t]})})
for(var i=0,a=e.attribList.length;i<a;i++){var s=e.attribList[i],l=s[0],c=s[1],u=D(l,!0),h=u.prefix,d=u.local,p=""===h?"":n.ns[h]||"",m={name:l,value:c,prefix:h,local:d,uri:p}
h&&"xmlns"!==h&&!p&&(L(e,"Unbound namespace prefix: "+JSON.stringify(h)),m.uri=h),e.tag.attributes[l]=m,z(e,"onattribute",m)}e.attribList.length=0}e.tag.isSelfClosing=!!t,e.sawRoot=!0,e.tags.push(e.tag),z(e,"onopentag",e.tag),t||(e.noscript||"script"!==e.tagName.toLowerCase()?e.state=C.TEXT:e.state=C.SCRIPT,e.tag=null,e.tagName=""),e.attribName=e.attribValue="",e.attribList.length=0}function I(e){if(!e.tagName)return L(e,"Weird empty close tag."),e.textNode+="</>",e.state=C.TEXT,void 0
if(e.script){if("script"!==e.tagName)return e.script+="</"+e.tagName+">",e.tagName="",e.state=C.SCRIPT,void 0
z(e,"onscript",e.script),e.script=""}var t=e.tags.length,n=e.tagName
e.strict||(n=n[e.looseCase]())
for(var r=n;t--&&e.tags[t].name!==r;)L(e,"Unexpected close tag")
if(t<0)return L(e,"Unmatched closing tag: "+e.tagName),e.textNode+="</"+e.tagName+">",e.state=C.TEXT,void 0
e.tagName=n
for(var o=e.tags.length;o-- >t;){var i=e.tag=e.tags.pop()
e.tagName=e.tag.name,z(e,"onclosetag",e.tagName)
var a={}
for(var s in i.ns)a[s]=i.ns[s]
var l=e.tags[e.tags.length-1]||e
e.opt.xmlns&&i.ns!==l.ns&&Object.keys(i.ns).forEach(function(t){var n=i.ns[t]
z(e,"onclosenamespace",{prefix:t,uri:n})})}0===t&&(e.closedRoot=!0),e.tagName=e.attribValue=e.attribName="",e.attribList.length=0,e.state=C.TEXT}function R(e){var t,n=e.entity,r=n.toLowerCase(),o=""
return e.ENTITIES[n]?e.ENTITIES[n]:e.ENTITIES[r]?e.ENTITIES[r]:("#"===(n=r).charAt(0)&&("x"===n.charAt(1)?(n=n.slice(2),o=(t=parseInt(n,16)).toString(16)):(n=n.slice(1),o=(t=parseInt(n,10)).toString(10))),n=n.replace(/^0+/,""),isNaN(t)||o.toLowerCase()!==n?(L(e,"Invalid character entity"),"&"+e.entity+";"):String.fromCodePoint(t))}function F(e,t){"<"===t?(e.state=C.OPEN_WAKA,e.startTagPosition=e.position):g(t)||(L(e,"Non-whitespace before first tag."),e.textNode=t,e.state=C.TEXT)}function B(e,t){var n=""
return t<e.length&&(n=e.charAt(t)),n}C=t.STATE,String.fromCodePoint||(w=String.fromCharCode,x=Math.floor,S=function(){var e,t,n=[],r=-1,o=arguments.length
if(!o)return""
for(var i="";++r<o;){var a=Number(arguments[r])
if(!isFinite(a)||a<0||a>0x10FFFF||x(a)!==a)throw RangeError("Invalid code point: "+a)
a<=0xFFFF?n.push(a):(e=0xD800+((a-=0x10000)>>10),t=a%0x400+0xDC00,n.push(e,t)),(r+1===o||n.length>16384)&&(i+=w.apply(null,n),n.length=0)}return i},Object.defineProperty?Object.defineProperty(String,"fromCodePoint",{value:S,configurable:!0,writable:!0}):String.fromCodePoint=S)}(tw)
var nw=oe(tw)
class rw extends Error{constructor(e,t,n,r,o){super(e),this.name="SvgoParserError",this.message=`${o||"<input>"}:${t}:${n}: ${e}`,this.reason=e,this.line=t,this.column=n,this.source=r,Error.captureStackTrace&&Error.captureStackTrace(this,rw)}toString(){const e=this.source.split(/\r?\n/),t=Math.max(this.line-3,0),n=Math.min(this.line+2,e.length),r=String(n).length,o=Math.max(this.column-54,0),i=Math.max(this.column+20,80),a=e.slice(t,n).map((e,n)=>{const a=e.slice(o,i)
let s="",l=""
0!==o&&(s=o>e.length-1?" ":"…"),i<e.length-1&&(l="…")
const c=t+1+n,u=` ${c.toString().padStart(r)} | `
if(c===this.line){const t=u.replace(/[^|]/g," ")
return`>${u}${s}${a}${l}\n ${t+(s+e.slice(o,this.column-1)).replace(/[^\t]/g," ")}^`}return` ${u}${s}${a}${l}`}).join("\n")
return`${this.name}: ${this.message}\n\n${a}\n`}}const ow=/<!ENTITY\s+(\S+)\s+(?:'([^']+)'|"([^"]+)")\s*>/g,iw={strict:!0,trim:!1,normalize:!1,lowercase:!0,xmlns:!0,position:!0,unparsedEntities:!0},aw=(e,t)=>{const n=nw.parser(iw.strict,iw),r={type:"root",children:[]}
let o=r
const i=[r],a=e=>{o.children.push(e)}
return n.ondoctype=t=>{a({type:"doctype",name:"svg",data:{doctype:t}})
const r=t.indexOf("[")
if(r>=0){ow.lastIndex=r
let t=ow.exec(e)
for(;null!=t;)n.ENTITIES[t[1]]=t[2]||t[3],t=ow.exec(e)}},n.onprocessinginstruction=e=>{const t={type:"instruction",name:e.name,value:e.body}
a(t)},n.oncomment=e=>{const t={type:"comment",value:e.trim()}
a(t)},n.oncdata=e=>{a({type:"cdata",value:e})},n.onopentag=e=>{const t={type:"element",name:e.name,attributes:{},children:[]}
for(const[n,r]of Object.entries(e.attributes))t.attributes[n]=r.value
a(t),o=t,i.push(t)},n.ontext=e=>{if("element"===o.type)if(Et.has(o.name)){a({type:"text",value:e})}else{const t=e.trim()
if(""!==t){a({type:"text",value:t})}}},n.onclosetag=()=>{i.pop(),o=i[i.length-1]},n.onerror=r=>{const o=r.message.split("\n")[0],i=new rw(o,n.line+1,n.column,e,t)
if(-1===r.message.indexOf("Unexpected end"))throw i},n.write(e).close(),r},sw={doctypeStart:"<!DOCTYPE",doctypeEnd:">",procInstStart:"<?",procInstEnd:"?>",tagOpenStart:"<",tagOpenEnd:">",tagCloseStart:"</",tagCloseEnd:">",tagShortStart:"<",tagShortEnd:"/>",attrStart:'="',attrEnd:'"',commentStart:"\x3c!--",commentEnd:"--\x3e",cdataStart:"<![CDATA[",cdataEnd:"]]>",textStart:"",textEnd:"",indent:4,regEntities:/[&'"<>]/g,regValEntities:/[&"<>]/g,encodeEntity:e=>lw[e],pretty:!1,useShortTags:!0,eol:"lf",finalNewline:!1},lw={"&":"&amp;","'":"&apos;",'"':"&quot;",">":"&gt;","<":"&lt;"},cw=(e,t={})=>{const n={...sw,...t},r=n.indent
let o="    "
"number"==typeof r&&!1===Number.isNaN(r)?o=r<0?"\t":" ".repeat(r):"string"==typeof r&&(o=r)
const i={indent:o,textContext:null,indentLevel:0},a="crlf"===n.eol?"\r\n":"\n"
n.pretty&&(n.doctypeEnd+=a,n.procInstEnd+=a,n.commentEnd+=a,n.cdataEnd+=a,n.tagShortEnd+=a,n.tagOpenEnd+=a,n.tagCloseEnd+=a,n.textEnd+=a)
let s=uw(e,n,i)
return n.finalNewline&&s.length>0&&!s.endsWith("\n")&&(s+=a),s},uw=(e,t,n)=>{let r=""
n.indentLevel++
for(const o of e.children)switch(o.type){case"element":r+=gw(o,t,n)
break
case"text":r+=yw(o,t,n)
break
case"doctype":r+=dw(o,t)
break
case"instruction":r+=pw(o,t)
break
case"comment":r+=mw(o,t)
break
case"cdata":r+=fw(o,t,n)}return n.indentLevel--,r},hw=(e,t)=>{let n=""
return e.pretty&&null==t.textContext&&(n=t.indent.repeat(t.indentLevel-1)),n},dw=(e,t)=>t.doctypeStart+e.data.doctype+t.doctypeEnd,pw=(e,t)=>t.procInstStart+e.name+" "+e.value+t.procInstEnd,mw=(e,t)=>t.commentStart+e.value+t.commentEnd,fw=(e,t,n)=>hw(t,n)+t.cdataStart+e.value+t.cdataEnd,gw=(e,t,n)=>{if(0===e.children.length)return t.useShortTags?hw(t,n)+t.tagShortStart+e.name+bw(e,t)+t.tagShortEnd:hw(t,n)+t.tagShortStart+e.name+bw(e,t)+t.tagOpenEnd+t.tagCloseStart+e.name+t.tagCloseEnd
let r=t.tagOpenStart,o=t.tagOpenEnd,i=t.tagCloseStart,a=t.tagCloseEnd,s=hw(t,n),l=hw(t,n)
n.textContext?(r=sw.tagOpenStart,o=sw.tagOpenEnd,i=sw.tagCloseStart,a=sw.tagCloseEnd,s=""):Et.has(e.name)&&(o=sw.tagOpenEnd,i=sw.tagCloseStart,l="",n.textContext=e)
const c=uw(e,t,n)
return n.textContext===e&&(n.textContext=null),s+r+e.name+bw(e,t)+o+c+l+i+e.name+a},bw=(e,t)=>{let n=""
for(const[r,o]of Object.entries(e.attributes))if(n+=" "+r,void 0!==o){const e=o.toString().replace(t.regValEntities,t.encodeEntity)
n+=t.attrStart+e+t.attrEnd}return n},yw=(e,t,n)=>hw(t,n)+t.textStart+e.value.replace(t.regEntities,t.encodeEntity)+(n.textContext?"":t.textEnd),VERSION="4.0.0-rc.5",kw=new Map
for(const e of ew)kw.set(e.name,e)
function vw(e){return"removeScriptElement"===e?(console.warn("Warning: removeScriptElement has been renamed to removeScripts, please update your SVGO config"),kw.get("removeScripts")):kw.get(e)}const ww=e=>{if("string"==typeof e){const t=vw(e)
if(null==t)throw Error(`Unknown builtin plugin "${e}" specified.`)
return{name:e,params:{},fn:t.fn}}if("object"==typeof e&&null!=e){if(null==e.name)throw Error("Plugin name must be specified")
let t=e.fn
if(null==t){const n=vw(e.name)
if(null==n)throw Error(`Unknown builtin plugin "${e.name}" specified.`)
t=n.fn}return{name:e.name,params:e.params,fn:t}}return null},xw=(e,t)=>{if(null==t&&(t={}),"object"!=typeof t)throw Error("Config should be an object")
const n=t.multipass?10:1
let o=Number.POSITIVE_INFINITY,i=""
const a={}
null!=t.path&&(a.path=t.path)
for(let s=0;s<n;s+=1){a.multipassCount=s
const n=aw(e,t.path),l=t.plugins||["preset-default"]
if(!Array.isArray(l))throw Error("malformed config, `plugins` property must be an array.\nSee more info here: https://github.com/svg/svgo#configuration")
const c=l.filter(e=>null!=e).map(ww)
c.length<l.length&&console.warn("Warning: plugins list includes null or undefined elements, these will be ignored.")
const u={}
if(null!=t.floatPrecision&&(u.floatPrecision=t.floatPrecision),r(n,a,c,null,u),i=cw(n,t.js2svg),!(i.length<o))break
e=i,o=i.length}return t.datauri&&(i=((e,t)=>{let n="data:image/svg+xml"
return t&&"base64"!==t?"enc"===t?e=n+","+encodeURIComponent(e):"unenc"===t&&(e=n+","+e):(n+=";base64,",e=n+Buffer.from(e).toString("base64")),e})(i,t.datauri)),{data:i}}
function optimize(e,t={}){try{const n={...t,js2svg:{eol:"lf",...t.js2svg}},r=xw(e,n)
return{data:r.data,info:r.info||{}}}catch(e){throw new Error(`SVG optimization failed: ${e.message}`)}}function Sw(){return VERSION}function Cw(){return ew.map(e=>({name:e.name,description:e.description||""}))}function Aw(e){if("string"!=typeof e)return!1
const t=e.trim()
return t.startsWith("<svg")||t.startsWith("<?xml")}globalThis.svgoo={optimize:optimize,getVersion:Sw,getPlugins:Cw,validateSvg:Aw,VERSION:VERSION}
export{VERSION,Ut as _collections,ew as builtinPlugins,Cw as getPlugins,Sw as getVersion,lt as mapNodesToParents,optimize,wt as querySelector,vt as querySelectorAll,Aw as validateSvg}
