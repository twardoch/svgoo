import e from"os"
import t from"fs/promises"
import n from"path"
import{createRequire as r}from"module"
import s from"string_decoder"
import i from"url"
const o=Symbol(),a=(e,t,n)=>{const r=t[e.type]
if(r?.enter){if(r.enter(e,n)===o)return}if("root"===e.type)for(const n of e.children)a(n,t,e)
if("element"===e.type&&n.children.includes(e))for(const n of e.children)a(n,t,e)
r?.exit&&r.exit(e,n)},l=(e,t,n,r,s)=>{for(const i of n){const n=r?.[i.name]
if(!1===n)continue
const o={...i.params,...s,...n},l=i.fn(e,o,t)
null!=l&&a(e,l)}}
var c
!function(e){e.Root="root",e.Text="text",e.Directive="directive",e.Comment="comment",e.Script="script",e.Style="style",e.Tag="tag",e.CDATA="cdata",e.Doctype="doctype"}(c||(c={}))
const u=c.Root,h=c.Text,f=c.Directive,p=c.Comment,d=c.Script,m=c.Style,g=c.Tag,y=c.CDATA,b=c.Doctype
function k(e){return(t=e).type===c.Tag||t.type===c.Script||t.type===c.Style
var t}function v(e){return e.type===c.CDATA}function S(e){return e.type===c.Text}function w(e){return e.type===c.Comment}function x(e){return Object.prototype.hasOwnProperty.call(e,"children")}const C=/["&'<>$\x80-\uFFFF]/g,A=new Map([[34,"&quot;"],[38,"&amp;"],[39,"&apos;"],[60,"&lt;"],[62,"&gt;"]]),_=null!=String.prototype.codePointAt?(e,t)=>e.codePointAt(t):(e,t)=>0xd800==(0xfc00&e.charCodeAt(t))?0x400*(e.charCodeAt(t)-0xd800)+e.charCodeAt(t+1)-0xdc00+0x10000:e.charCodeAt(t)
function T(e){let t,n="",r=0
for(;null!==(t=C.exec(e));){const s=t.index,i=e.charCodeAt(s),o=A.get(i)
void 0!==o?(n+=e.substring(r,s)+o,r=s+1):(n+=`${e.substring(r,s)}&#x${_(e,s).toString(16)};`,r=C.lastIndex+=Number(0xd800==(0xfc00&i)))}return n+e.substr(r)}function E(e,t){return function(n){let r,s=0,i=""
for(;r=e.exec(n);)s!==r.index&&(i+=n.substring(s,r.index)),i+=t.get(r[0].charCodeAt(0)),s=r.index+1
return i+n.substring(s)}}const O=E(/["&\u00A0]/g,new Map([[34,"&quot;"],[38,"&amp;"],[160,"&nbsp;"]])),P=E(/[&<>\u00A0]/g,new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[160,"&nbsp;"]])),L=new Map(["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","textPath"].map(e=>[e.toLowerCase(),e])),N=new Map(["definitionURL","attributeName","attributeType","baseFrequency","baseProfile","calcMode","clipPathUnits","diffuseConstant","edgeMode","filterUnits","glyphRef","gradientTransform","gradientUnits","kernelMatrix","kernelUnitLength","keyPoints","keySplines","keyTimes","lengthAdjust","limitingConeAngle","markerHeight","markerUnits","markerWidth","maskContentUnits","maskUnits","numOctaves","pathLength","patternContentUnits","patternTransform","patternUnits","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","refX","refY","repeatCount","repeatDur","requiredExtensions","requiredFeatures","specularConstant","specularExponent","spreadMethod","startOffset","stdDeviation","stitchTiles","surfaceScale","systemLanguage","tableValues","targetX","targetY","textLength","viewBox","viewTarget","xChannelSelector","yChannelSelector","zoomAndPan"].map(e=>[e.toLowerCase(),e])),D=new Set(["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])
function M(e){return e.replace(/"/g,"&quot;")}const j=new Set(["area","base","basefont","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr"])
function I(e,t={}){const n="length"in e?e:[e]
let r=""
for(let e=0;e<n.length;e++)r+=R(n[e],t)
return r}function R(e,t){switch(e.type){case u:return I(e.children,t)
case b:case f:return`<${e.data}>`
case p:return function(e){return`\x3c!--${e.data}--\x3e`}(e)
case y:return function(e){return`<![CDATA[${e.children[0].data}]]>`}(e)
case d:case m:case g:return function(e,t){var n
"foreign"===t.xmlMode&&(e.name=null!==(n=L.get(e.name))&&void 0!==n?n:e.name,e.parent&&F.has(e.parent.name)&&(t={...t,xmlMode:!1}))
!t.xmlMode&&z.has(e.name)&&(t={...t,xmlMode:"foreign"})
let r=`<${e.name}`
const s=function(e,t){var n
if(!e)return
const r=!1===(null!==(n=t.encodeEntities)&&void 0!==n?n:t.decodeEntities)?M:t.xmlMode||"utf8"!==t.encodeEntities?T:O
return Object.keys(e).map(n=>{var s,i
const o=null!==(s=e[n])&&void 0!==s?s:""
return"foreign"===t.xmlMode&&(n=null!==(i=N.get(n))&&void 0!==i?i:n),t.emptyAttrs||t.xmlMode||""!==o?`${n}="${r(o)}"`:n}).join(" ")}(e.attribs,t)
s&&(r+=` ${s}`)
0===e.children.length&&(t.xmlMode?!1!==t.selfClosingTags:t.selfClosingTags&&j.has(e.name))?(t.xmlMode||(r+=" "),r+="/>"):(r+=">",e.children.length>0&&(r+=I(e.children,t)),!t.xmlMode&&j.has(e.name)||(r+=`</${e.name}>`))
return r}(e,t)
case h:return function(e,t){var n
let r=e.data||""
!1===(null!==(n=t.encodeEntities)&&void 0!==n?n:t.decodeEntities)||!t.xmlMode&&e.parent&&D.has(e.parent.name)||(r=t.xmlMode||"utf8"!==t.encodeEntities?T(r):P(r))
return r}(e,t)}}const F=new Set(["mi","mo","mn","ms","mtext","annotation-xml","foreignObject","desc","title"]),z=new Set(["svg","math"])
function G(e,t){return I(e,t)}function B(e){return Array.isArray(e)?e.map(B).join(""):x(e)&&!w(e)?B(e.children):S(e)?e.data:""}function U(e){return x(e)?e.children:[]}function q(e){return e.parent||null}function W(e){if(e.prev&&(e.prev.next=e.next),e.next&&(e.next.prev=e.prev),e.parent){const t=e.parent.children,n=t.lastIndexOf(e)
n>=0&&t.splice(n,1)}e.next=null,e.prev=null,e.parent=null}function V(e,t,n=!0,r=1/0){return $(e,Array.isArray(t)?t:[t],n,r)}function $(e,t,n,r){const s=[],i=[Array.isArray(t)?t:[t]],o=[0]
for(;;){if(o[0]>=i[0].length){if(1===o.length)return s
i.shift(),o.shift()
continue}const t=i[0][o[0]++]
if(e(t)&&(s.push(t),--r<=0))return s
n&&x(t)&&t.children.length>0&&(o.unshift(0),i.unshift(t.children))}}function Y(e,t,n=!0){const r=Array.isArray(t)?t:[t]
for(let t=0;t<r.length;t++){const s=r[t]
if(k(s)&&e(s))return s
if(n&&x(s)&&s.children.length>0){const t=Y(e,s.children,!0)
if(t)return t}}return null}const X={tag_name:e=>"function"==typeof e?t=>k(t)&&e(t.name):"*"===e?k:t=>k(t)&&t.name===e,tag_type:e=>"function"==typeof e?t=>e(t.type):t=>t.type===e,tag_contains:e=>"function"==typeof e?t=>S(t)&&e(t.data):t=>S(t)&&t.data===e}
function H(e,t){return"function"==typeof t?n=>k(n)&&t(n.attribs[e]):n=>k(n)&&n.attribs[e]===t}function Q(e,t){return n=>e(n)||t(n)}function K(e){const t=Object.keys(e).map(t=>{const n=e[t]
return Object.prototype.hasOwnProperty.call(X,t)?X[t](n):H(t,n)})
return 0===t.length?null:t.reduce(Q)}function Z(e,t,n=!0,r=1/0){return V(X.tag_name(e),t,n,r)}var J
function ee(e,t){const n=[],r=[]
if(e===t)return 0
let s=x(e)?e:e.parent
for(;s;)n.unshift(s),s=s.parent
for(s=x(t)?t:t.parent;s;)r.unshift(s),s=s.parent
const i=Math.min(n.length,r.length)
let o=0
for(;o<i&&n[o]===r[o];)o++
if(0===o)return J.DISCONNECTED
const a=n[o-1],l=a.children,c=n[o],u=r[o]
return l.indexOf(c)>l.indexOf(u)?a===t?J.FOLLOWING|J.CONTAINED_BY:J.FOLLOWING:a===e?J.PRECEDING|J.CONTAINS:J.PRECEDING}!function(e){e[e.DISCONNECTED=1]="DISCONNECTED",e[e.PRECEDING=2]="PRECEDING",e[e.FOLLOWING=4]="FOLLOWING",e[e.CONTAINS=8]="CONTAINS",e[e.CONTAINED_BY=16]="CONTAINED_BY"}(J||(J={}))
const te=["url","type","lang"],ne=["fileSize","bitrate","framerate","samplingrate","channels","duration","height","width"]
function re(e){return Z("media:content",e).map(e=>{const{attribs:t}=e,n={medium:t.medium,isDefault:!!t.isDefault}
for(const e of te)t[e]&&(n[e]=t[e])
for(const e of ne)t[e]&&(n[e]=parseInt(t[e],10))
return t.expression&&(n.expression=t.expression),n})}function se(e,t){return Z(e,t,!0,1)[0]}function ie(e,t,n=!1){return B(Z(e,t,n,1)).trim()}function oe(e,t,n,r,s=!1){const i=ie(n,r,s)
i&&(e[t]=i)}function ae(e){return"rss"===e||"feed"===e||"rdf:RDF"===e}var le=Object.freeze({__proto__:null,get DocumentPosition(){return J},append:function(e,t){W(t)
const{parent:n}=e,r=e.next
if(t.next=r,t.prev=e,e.next=t,t.parent=n,r){if(r.prev=t,n){const e=n.children
e.splice(e.lastIndexOf(r),0,t)}}else n&&n.children.push(t)},appendChild:function(e,t){if(W(t),t.next=null,t.parent=e,e.children.push(t)>1){const n=e.children[e.children.length-2]
n.next=t,t.prev=n}else t.prev=null},compareDocumentPosition:ee,existsOne:function e(t,n){return(Array.isArray(n)?n:[n]).some(n=>k(n)&&t(n)||x(n)&&e(t,n.children))},filter:V,find:$,findAll:function(e,t){const n=[],r=[Array.isArray(t)?t:[t]],s=[0]
for(;;){if(s[0]>=r[0].length){if(1===r.length)return n
r.shift(),s.shift()
continue}const t=r[0][s[0]++]
k(t)&&e(t)&&n.push(t),x(t)&&t.children.length>0&&(s.unshift(0),r.unshift(t.children))}},findOne:Y,findOneChild:function(e,t){return t.find(e)},getAttributeValue:function(e,t){var n
return null===(n=e.attribs)||void 0===n?void 0:n[t]},getChildren:U,getElementById:function(e,t,n=!0){return Array.isArray(t)||(t=[t]),Y(H("id",e),t,n)},getElements:function(e,t,n,r=1/0){const s=K(e)
return s?V(s,t,n,r):[]},getElementsByClassName:function(e,t,n=!0,r=1/0){return V(H("class",e),t,n,r)},getElementsByTagName:Z,getElementsByTagType:function(e,t,n=!0,r=1/0){return V(X.tag_type(e),t,n,r)},getFeed:function(e){const t=se(ae,e)
return t?"feed"===t.name?function(e){var t
const n=e.children,r={type:"atom",items:Z("entry",n).map(e=>{var t
const{children:n}=e,r={media:re(n)}
oe(r,"id","id",n),oe(r,"title","title",n)
const s=null===(t=se("link",n))||void 0===t?void 0:t.attribs.href
s&&(r.link=s)
const i=ie("summary",n)||ie("content",n)
i&&(r.description=i)
const o=ie("updated",n)
return o&&(r.pubDate=new Date(o)),r})}
oe(r,"id","id",n),oe(r,"title","title",n)
const s=null===(t=se("link",n))||void 0===t?void 0:t.attribs.href
s&&(r.link=s)
oe(r,"description","subtitle",n)
const i=ie("updated",n)
i&&(r.updated=new Date(i))
return oe(r,"author","email",n,!0),r}(t):function(e){var t,n
const r=null!==(n=null===(t=se("channel",e.children))||void 0===t?void 0:t.children)&&void 0!==n?n:[],s={type:e.name.substr(0,3),id:"",items:Z("item",e.children).map(e=>{const{children:t}=e,n={media:re(t)}
oe(n,"id","guid",t),oe(n,"title","title",t),oe(n,"link","link",t),oe(n,"description","description",t)
const r=ie("pubDate",t)||ie("dc:date",t)
return r&&(n.pubDate=new Date(r)),n})}
oe(s,"title","title",r),oe(s,"link","link",r),oe(s,"description","description",r)
const i=ie("lastBuildDate",r)
i&&(s.updated=new Date(i))
return oe(s,"author","managingEditor",r,!0),s}(t):null},getInnerHTML:function(e,t){return x(e)?e.children.map(e=>G(e,t)).join(""):""},getName:function(e){return e.name},getOuterHTML:G,getParent:q,getSiblings:function(e){const t=q(e)
if(null!=t)return U(t)
const n=[e]
let{prev:r,next:s}=e
for(;null!=r;)n.unshift(r),({prev:r}=r)
for(;null!=s;)n.push(s),({next:s}=s)
return n},getText:function e(t){return Array.isArray(t)?t.map(e).join(""):k(t)?"br"===t.name?"\n":e(t.children):v(t)?e(t.children):S(t)?t.data:""},hasAttrib:function(e,t){return null!=e.attribs&&Object.prototype.hasOwnProperty.call(e.attribs,t)&&null!=e.attribs[t]},hasChildren:x,innerText:function e(t){return Array.isArray(t)?t.map(e).join(""):x(t)&&(t.type===c.Tag||v(t))?e(t.children):S(t)?t.data:""},isCDATA:v,isComment:w,isDocument:function(e){return e.type===c.Root},isTag:k,isText:S,nextElementSibling:function(e){let{next:t}=e
for(;null!==t&&!k(t);)({next:t}=t)
return t},prepend:function(e,t){W(t)
const{parent:n}=e
if(n){const r=n.children
r.splice(r.indexOf(e),0,t)}e.prev&&(e.prev.next=t),t.parent=n,t.prev=e.prev,t.next=e,e.prev=t},prependChild:function(e,t){if(W(t),t.parent=e,t.prev=null,1!==e.children.unshift(t)){const n=e.children[1]
n.prev=t,t.next=n}else t.next=null},prevElementSibling:function(e){let{prev:t}=e
for(;null!==t&&!k(t);)({prev:t}=t)
return t},removeElement:W,removeSubsets:function(e){let t=e.length
for(;--t>=0;){const n=e[t]
if(t>0&&e.lastIndexOf(n,t-1)>=0)e.splice(t,1)
else for(let r=n.parent;r;r=r.parent)if(e.includes(r)){e.splice(t,1)
break}}return e},replaceElement:function(e,t){const n=t.prev=e.prev
n&&(n.next=t)
const r=t.next=e.next
r&&(r.prev=t)
const s=t.parent=e.parent
if(s){const n=s.children
n[n.lastIndexOf(e)]=t,e.parent=null}},testElement:function(e,t){const n=K(e)
return!n||n(t)},textContent:B,uniqueSort:function(e){return e=e.filter((e,t,n)=>!n.includes(e,t+1)),e.sort((e,t)=>{const n=ee(e,t)
return n&J.PRECEDING?-1:n&J.FOLLOWING?1:0}),e}})
function ce(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ue,he,fe=ce({trueFunc:function(){return!0},falseFunc:function(){return!1}})
!function(e){e.Attribute="attribute",e.Pseudo="pseudo",e.PseudoElement="pseudo-element",e.Tag="tag",e.Universal="universal",e.Adjacent="adjacent",e.Child="child",e.Descendant="descendant",e.Parent="parent",e.Sibling="sibling",e.ColumnCombinator="column-combinator"}(ue||(ue={})),function(e){e.Any="any",e.Element="element",e.End="end",e.Equals="equals",e.Exists="exists",e.Hyphen="hyphen",e.Not="not",e.Start="start"}(he||(he={}))
const pe=/^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,de=/\\([\da-f]{1,6}\s?|(\s)|.)/gi,me=new Map([[126,he.Element],[94,he.Start],[36,he.End],[42,he.Any],[33,he.Not],[124,he.Hyphen]]),ge=new Set(["has","not","matches","is","where","host","host-context"])
function ye(e){switch(e.type){case ue.Adjacent:case ue.Child:case ue.Descendant:case ue.Parent:case ue.Sibling:case ue.ColumnCombinator:return!0
default:return!1}}const be=new Set(["contains","icontains"])
function ke(e,t,n){const r=parseInt(t,16)-0x10000
return r!=r||n?t:r<0?String.fromCharCode(r+0x10000):String.fromCharCode(r>>10|0xd800,0x3ff&r|0xdc00)}function ve(e){return e.replace(de,ke)}function Se(e){return 39===e||34===e}function we(e){return 32===e||9===e||10===e||12===e||13===e}function xe(e){const t=[],n=Ce(t,`${e}`,0)
if(n<e.length)throw new Error(`Unmatched selector: ${e.slice(n)}`)
return t}function Ce(e,t,n){let r=[]
function s(e){const r=t.slice(n+e).match(pe)
if(!r)throw new Error(`Expected name, found ${t.slice(n)}`)
const[s]=r
return n+=e+s.length,ve(s)}function i(e){for(n+=e;n<t.length&&we(t.charCodeAt(n));)n++}function o(){const e=n+=1
let r=1
for(;r>0&&n<t.length;n++)40!==t.charCodeAt(n)||a(n)?41!==t.charCodeAt(n)||a(n)||r--:r++
if(r)throw new Error("Parenthesis not matched")
return ve(t.slice(e,n-1))}function a(e){let n=0
for(;92===t.charCodeAt(--e);)n++
return!(1&~n)}function l(){if(r.length>0&&ye(r[r.length-1]))throw new Error("Did not expect successive traversals.")}function c(e){if(r.length>0&&r[r.length-1].type===ue.Descendant)return r[r.length-1].type=e,void 0
l(),r.push({type:e})}function u(e,t){r.push({type:ue.Attribute,name:e,action:t,value:s(1),namespace:null,ignoreCase:"quirks"})}function h(){if(r.length&&r[r.length-1].type===ue.Descendant&&r.pop(),0===r.length)throw new Error("Empty sub-selector")
e.push(r)}if(i(0),t.length===n)return n
e:for(;n<t.length;){const e=t.charCodeAt(n)
switch(e){case 32:case 9:case 10:case 12:case 13:0!==r.length&&r[0].type===ue.Descendant||(l(),r.push({type:ue.Descendant})),i(1)
break
case 62:c(ue.Child),i(1)
break
case 60:c(ue.Parent),i(1)
break
case 126:c(ue.Sibling),i(1)
break
case 43:c(ue.Adjacent),i(1)
break
case 46:u("class",he.Element)
break
case 35:u("id",he.Equals)
break
case 91:{let e
i(1)
let o=null
124===t.charCodeAt(n)?e=s(1):t.startsWith("*|",n)?(o="*",e=s(2)):(e=s(0),124===t.charCodeAt(n)&&61!==t.charCodeAt(n+1)&&(o=e,e=s(1))),i(0)
let l=he.Exists
const c=me.get(t.charCodeAt(n))
if(c){if(l=c,61!==t.charCodeAt(n+1))throw new Error("Expected `=`")
i(2)}else 61===t.charCodeAt(n)&&(l=he.Equals,i(1))
let u="",h=null
if("exists"!==l){if(Se(t.charCodeAt(n))){const e=t.charCodeAt(n)
let r=n+1
for(;r<t.length&&(t.charCodeAt(r)!==e||a(r));)r+=1
if(t.charCodeAt(r)!==e)throw new Error("Attribute value didn't end")
u=ve(t.slice(n+1,r)),n=r+1}else{const e=n
for(;n<t.length&&(!we(t.charCodeAt(n))&&93!==t.charCodeAt(n)||a(n));)n+=1
u=ve(t.slice(e,n))}i(0)
const e=0x20|t.charCodeAt(n)
115===e?(h=!1,i(1)):105===e&&(h=!0,i(1))}if(93!==t.charCodeAt(n))throw new Error("Attribute selector didn't terminate")
n+=1
const f={type:ue.Attribute,name:e,action:l,value:u,namespace:o,ignoreCase:h}
r.push(f)
break}case 58:{if(58===t.charCodeAt(n+1)){r.push({type:ue.PseudoElement,name:s(2).toLowerCase(),data:40===t.charCodeAt(n)?o():null})
continue}const e=s(1).toLowerCase()
let i=null
if(40===t.charCodeAt(n))if(ge.has(e)){if(Se(t.charCodeAt(n+1)))throw new Error(`Pseudo-selector ${e} cannot be quoted`)
if(i=[],n=Ce(i,t,n+1),41!==t.charCodeAt(n))throw new Error(`Missing closing parenthesis in :${e} (${t})`)
n+=1}else{if(i=o(),be.has(e)){const e=i.charCodeAt(0)
e===i.charCodeAt(i.length-1)&&Se(e)&&(i=i.slice(1,-1))}i=ve(i)}r.push({type:ue.Pseudo,name:e,data:i})
break}case 44:h(),r=[],i(1)
break
default:{if(t.startsWith("/*",n)){const e=t.indexOf("*/",n+2)
if(e<0)throw new Error("Comment was not terminated")
n=e+2,0===r.length&&i(0)
break}let o,a=null
if(42===e)n+=1,o="*"
else if(124===e){if(o="",124===t.charCodeAt(n+1)){c(ue.ColumnCombinator),i(2)
break}}else{if(!pe.test(t.slice(n)))break e
o=s(0)}124===t.charCodeAt(n)&&124!==t.charCodeAt(n+1)&&(a=o,42===t.charCodeAt(n+1)?(o="*",n+=2):o=s(1)),r.push("*"===o?{type:ue.Universal,namespace:a}:{type:ue.Tag,name:o,namespace:a})}}}return h(),n}const Ae=new Map([[ue.Universal,50],[ue.Tag,30],[ue.Attribute,1],[ue.Pseudo,0]])
function _e(e){return!Ae.has(e.type)}const Te=new Map([[he.Exists,10],[he.Equals,8],[he.Not,7],[he.Start,6],[he.End,6],[he.Any,5]])
function Ee(e){const t=e.map(Oe)
for(let n=1;n<e.length;n++){const r=t[n]
if(!(r<0))for(let s=n-1;s>=0&&r<t[s];s--){const n=e[s+1]
e[s+1]=e[s],e[s]=n,t[s+1]=t[s],t[s]=r}}}function Oe(e){var t,n
let r=null!==(t=Ae.get(e.type))&&void 0!==t?t:-1
return e.type===ue.Attribute?(r=null!==(n=Te.get(e.action))&&void 0!==n?n:4,e.action===he.Equals&&"id"===e.name&&(r=9),e.ignoreCase&&(r>>=1)):e.type===ue.Pseudo&&(e.data?"has"===e.name||"contains"===e.name?r=0:Array.isArray(e.data)?(r=Math.min(...e.data.map(e=>Math.min(...e.map(Oe)))),r<0&&(r=0)):r=2:r=3),r}const Pe=/[-[\]{}()*+?.,\\^$|#\s]/g
function Le(e){return e.replace(Pe,"\\$&")}const Ne=new Set(["accept","accept-charset","align","alink","axis","bgcolor","charset","checked","clear","codetype","color","compact","declare","defer","dir","direction","disabled","enctype","face","frame","hreflang","http-equiv","lang","language","link","media","method","multiple","nohref","noresize","noshade","nowrap","readonly","rel","rev","rules","scope","scrolling","selected","shape","target","text","type","valign","valuetype","vlink"])
function De(e,t){return"boolean"==typeof e.ignoreCase?e.ignoreCase:"quirks"===e.ignoreCase?!!t.quirksMode:!t.xmlMode&&Ne.has(e.name)}const Me={equals(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
return De(t,n)?(i=i.toLowerCase(),t=>{const n=r.getAttributeValue(t,s)
return null!=n&&n.length===i.length&&n.toLowerCase()===i&&e(t)}):t=>r.getAttributeValue(t,s)===i&&e(t)},hyphen(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
const o=i.length
return De(t,n)?(i=i.toLowerCase(),function(t){const n=r.getAttributeValue(t,s)
return null!=n&&(n.length===o||"-"===n.charAt(o))&&n.substr(0,o).toLowerCase()===i&&e(t)}):function(t){const n=r.getAttributeValue(t,s)
return null!=n&&(n.length===o||"-"===n.charAt(o))&&n.substr(0,o)===i&&e(t)}},element(e,t,n){const{adapter:r}=n,{name:s,value:i}=t
if(/\s/.test(i))return fe.falseFunc
const o=new RegExp(`(?:^|\\s)${Le(i)}(?:$|\\s)`,De(t,n)?"i":"")
return function(t){const n=r.getAttributeValue(t,s)
return null!=n&&n.length>=i.length&&o.test(n)&&e(t)}},exists:(e,{name:t},{adapter:n})=>r=>n.hasAttrib(r,t)&&e(r),start(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
const o=i.length
return 0===o?fe.falseFunc:De(t,n)?(i=i.toLowerCase(),t=>{const n=r.getAttributeValue(t,s)
return null!=n&&n.length>=o&&n.substr(0,o).toLowerCase()===i&&e(t)}):t=>{var n
return!!(null===(n=r.getAttributeValue(t,s))||void 0===n?void 0:n.startsWith(i))&&e(t)}},end(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
const o=-i.length
return 0===o?fe.falseFunc:De(t,n)?(i=i.toLowerCase(),t=>{var n
return(null===(n=r.getAttributeValue(t,s))||void 0===n?void 0:n.substr(o).toLowerCase())===i&&e(t)}):t=>{var n
return!!(null===(n=r.getAttributeValue(t,s))||void 0===n?void 0:n.endsWith(i))&&e(t)}},any(e,t,n){const{adapter:r}=n,{name:s,value:i}=t
if(""===i)return fe.falseFunc
if(De(t,n)){const t=new RegExp(Le(i),"i")
return function(n){const o=r.getAttributeValue(n,s)
return null!=o&&o.length>=i.length&&t.test(o)&&e(n)}}return t=>{var n
return!!(null===(n=r.getAttributeValue(t,s))||void 0===n?void 0:n.includes(i))&&e(t)}},not(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
return""===i?t=>!!r.getAttributeValue(t,s)&&e(t):De(t,n)?(i=i.toLowerCase(),t=>{const n=r.getAttributeValue(t,s)
return(null==n||n.length!==i.length||n.toLowerCase()!==i)&&e(t)}):t=>r.getAttributeValue(t,s)!==i&&e(t)}},je=new Set([9,10,12,13,32]),Ie="0".charCodeAt(0),Re="9".charCodeAt(0)
function Fe(e){return function(e){const t=e[0],n=e[1]-1
if(n<0&&t<=0)return fe.falseFunc
if(-1===t)return e=>e<=n
if(0===t)return e=>e===n
if(1===t)return n<0?fe.trueFunc:e=>e>=n
const r=Math.abs(t),s=(n%r+r)%r
return t>1?e=>e>=n&&e%r===s:e=>e<=n&&e%r===s}(function(e){if("even"===(e=e.trim().toLowerCase()))return[2,0]
if("odd"===e)return[2,1]
let t=0,n=0,r=i(),s=o()
if(t<e.length&&"n"===e.charAt(t)&&(t++,n=r*(null!=s?s:1),a(),t<e.length?(r=i(),a(),s=o()):r=s=0),null===s||t<e.length)throw new Error(`n-th rule couldn't be parsed ('${e}')`)
return[n,r*s]
function i(){return"-"===e.charAt(t)?(t++,-1):("+"===e.charAt(t)&&t++,1)}function o(){const n=t
let r=0
for(;t<e.length&&e.charCodeAt(t)>=Ie&&e.charCodeAt(t)<=Re;)r=10*r+(e.charCodeAt(t)-Ie),t++
return t===n?null:r}function a(){for(;t<e.length&&je.has(e.charCodeAt(t));)t++}}(e))}function ze(e,t){return n=>{const r=t.getParent(n)
return null!=r&&t.isTag(r)&&e(n)}}const Ge={contains:(e,t,{adapter:n})=>function(r){return e(r)&&n.getText(r).includes(t)},icontains(e,t,{adapter:n}){const r=t.toLowerCase()
return function(t){return e(t)&&n.getText(t).toLowerCase().includes(r)}},"nth-child"(e,t,{adapter:n,equals:r}){const s=Fe(t)
return s===fe.falseFunc?fe.falseFunc:s===fe.trueFunc?ze(e,n):function(t){const i=n.getSiblings(t)
let o=0
for(let e=0;e<i.length&&!r(t,i[e]);e++)n.isTag(i[e])&&o++
return s(o)&&e(t)}},"nth-last-child"(e,t,{adapter:n,equals:r}){const s=Fe(t)
return s===fe.falseFunc?fe.falseFunc:s===fe.trueFunc?ze(e,n):function(t){const i=n.getSiblings(t)
let o=0
for(let e=i.length-1;e>=0&&!r(t,i[e]);e--)n.isTag(i[e])&&o++
return s(o)&&e(t)}},"nth-of-type"(e,t,{adapter:n,equals:r}){const s=Fe(t)
return s===fe.falseFunc?fe.falseFunc:s===fe.trueFunc?ze(e,n):function(t){const i=n.getSiblings(t)
let o=0
for(let e=0;e<i.length;e++){const s=i[e]
if(r(t,s))break
n.isTag(s)&&n.getName(s)===n.getName(t)&&o++}return s(o)&&e(t)}},"nth-last-of-type"(e,t,{adapter:n,equals:r}){const s=Fe(t)
return s===fe.falseFunc?fe.falseFunc:s===fe.trueFunc?ze(e,n):function(t){const i=n.getSiblings(t)
let o=0
for(let e=i.length-1;e>=0;e--){const s=i[e]
if(r(t,s))break
n.isTag(s)&&n.getName(s)===n.getName(t)&&o++}return s(o)&&e(t)}},root:(e,t,{adapter:n})=>t=>{const r=n.getParent(t)
return(null==r||!n.isTag(r))&&e(t)},scope(e,t,n,r){const{equals:s}=n
return r&&0!==r.length?1===r.length?t=>s(r[0],t)&&e(t):t=>r.includes(t)&&e(t):Ge.root(e,t,n)},hover:Be("isHovered"),visited:Be("isVisited"),active:Be("isActive")}
function Be(e){return function(t,n,{adapter:r}){const s=r[e]
return"function"!=typeof s?fe.falseFunc:function(e){return s(e)&&t(e)}}}const Ue={empty:(e,{adapter:t})=>!t.getChildren(e).some(e=>t.isTag(e)||""!==t.getText(e)),"first-child"(e,{adapter:t,equals:n}){if(t.prevElementSibling)return null==t.prevElementSibling(e)
const r=t.getSiblings(e).find(e=>t.isTag(e))
return null!=r&&n(e,r)},"last-child"(e,{adapter:t,equals:n}){const r=t.getSiblings(e)
for(let s=r.length-1;s>=0;s--){if(n(e,r[s]))return!0
if(t.isTag(r[s]))break}return!1},"first-of-type"(e,{adapter:t,equals:n}){const r=t.getSiblings(e),s=t.getName(e)
for(let i=0;i<r.length;i++){const o=r[i]
if(n(e,o))return!0
if(t.isTag(o)&&t.getName(o)===s)break}return!1},"last-of-type"(e,{adapter:t,equals:n}){const r=t.getSiblings(e),s=t.getName(e)
for(let i=r.length-1;i>=0;i--){const o=r[i]
if(n(e,o))return!0
if(t.isTag(o)&&t.getName(o)===s)break}return!1},"only-of-type"(e,{adapter:t,equals:n}){const r=t.getName(e)
return t.getSiblings(e).every(s=>n(e,s)||!t.isTag(s)||t.getName(s)!==r)},"only-child":(e,{adapter:t,equals:n})=>t.getSiblings(e).every(r=>n(e,r)||!t.isTag(r))}
function qe(e,t,n,r){if(null===n){if(e.length>r)throw new Error(`Pseudo-class :${t} requires an argument`)}else if(e.length===r)throw new Error(`Pseudo-class :${t} doesn't have any arguments`)}const We={"any-link":":is(a, area, link)[href]",link:":any-link:not(:visited)",disabled:":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",enabled:":not(:disabled)",checked:":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",required:":is(input, select, textarea)[required]",optional:":is(input, select, textarea):not([required])",selected:"option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",checkbox:"[type=checkbox]",file:"[type=file]",password:"[type=password]",radio:"[type=radio]",reset:"[type=reset]",image:"[type=image]",submit:"[type=submit]",parent:":not(:empty)",header:":is(h1, h2, h3, h4, h5, h6)",button:":is(button, input[type=button])",input:":is(input, textarea, select, button)",text:"input:is(:not([type!='']), [type=text])"},Ve={}
function $e(e,t){return e===fe.falseFunc?fe.falseFunc:n=>t.isTag(n)&&e(n)}function Ye(e,t){const n=t.getSiblings(e)
if(n.length<=1)return[]
const r=n.indexOf(e)
return r<0||r===n.length-1?[]:n.slice(r+1).filter(t.isTag)}function Xe(e){return{xmlMode:!!e.xmlMode,lowerCaseAttributeNames:!!e.lowerCaseAttributeNames,lowerCaseTags:!!e.lowerCaseTags,quirksMode:!!e.quirksMode,cacheResults:!!e.cacheResults,pseudos:e.pseudos,adapter:e.adapter,equals:e.equals}}const He=(e,t,n,r,s)=>{const i=s(t,Xe(n),r)
return i===fe.trueFunc?e:i===fe.falseFunc?fe.falseFunc:t=>i(t)&&e(t)},Qe={is:He,matches:He,where:He,not(e,t,n,r,s){const i=s(t,Xe(n),r)
return i===fe.falseFunc?e:i===fe.trueFunc?fe.falseFunc:t=>!i(t)&&e(t)},has(e,t,n,r,s){const{adapter:i}=n,o=Xe(n)
o.relativeSelector=!0
const a=t.some(e=>e.some(_e))?[Ve]:void 0,l=s(t,o,a)
if(l===fe.falseFunc)return fe.falseFunc
const c=$e(l,i)
if(a&&l!==fe.trueFunc){const{shouldTestNextSiblings:t=!1}=l
return n=>{if(!e(n))return!1
a[0]=n
const r=i.getChildren(n),s=t?[...r,...Ye(n,i)]:r
return i.existsOne(c,s)}}return t=>e(t)&&i.existsOne(c,i.getChildren(t))}}
function Ke(e,t){const n=t.getParent(e)
return n&&t.isTag(n)?n:null}function Ze(e,t,n,r,s){const{adapter:i,equals:o}=n
switch(t.type){case ue.PseudoElement:throw new Error("Pseudo-elements are not supported by css-select")
case ue.ColumnCombinator:throw new Error("Column combinators are not yet supported by css-select")
case ue.Attribute:if(null!=t.namespace)throw new Error("Namespaced attributes are not yet supported by css-select")
return n.xmlMode&&!n.lowerCaseAttributeNames||(t.name=t.name.toLowerCase()),Me[t.action](e,t,n)
case ue.Pseudo:return function(e,t,n,r,s){var i
const{name:o,data:a}=t
if(Array.isArray(a)){if(!(o in Qe))throw new Error(`Unknown pseudo-class :${o}(${a})`)
return Qe[o](e,a,n,r,s)}const l=null===(i=n.pseudos)||void 0===i?void 0:i[o],c="string"==typeof l?l:We[o]
if("string"==typeof c){if(null!=a)throw new Error(`Pseudo ${o} doesn't have any arguments`)
const t=xe(c)
return Qe.is(e,t,n,r,s)}if("function"==typeof l)return qe(l,o,a,1),t=>l(t,a)&&e(t)
if(o in Ge)return Ge[o](e,a,n,r)
if(o in Ue){const t=Ue[o]
return qe(t,o,a,2),r=>t(r,n,a)&&e(r)}throw new Error(`Unknown pseudo-class :${o}`)}(e,t,n,r,s)
case ue.Tag:{if(null!=t.namespace)throw new Error("Namespaced tag names are not yet supported by css-select")
let{name:r}=t
return n.xmlMode&&!n.lowerCaseTags||(r=r.toLowerCase()),function(t){return i.getName(t)===r&&e(t)}}case ue.Descendant:{if(!1===n.cacheResults||"undefined"==typeof WeakSet)return function(t){let n=t
for(;n=Ke(n,i);)if(e(n))return!0
return!1}
const t=new WeakSet
return function(n){let r=n
for(;r=Ke(r,i);)if(!t.has(r)){if(i.isTag(r)&&e(r))return!0
t.add(r)}return!1}}case"_flexibleDescendant":return function(t){let n=t
do{if(e(n))return!0}while(n=Ke(n,i))
return!1}
case ue.Parent:return function(t){return i.getChildren(t).some(t=>i.isTag(t)&&e(t))}
case ue.Child:return function(t){const n=i.getParent(t)
return null!=n&&i.isTag(n)&&e(n)}
case ue.Sibling:return function(t){const n=i.getSiblings(t)
for(let r=0;r<n.length;r++){const s=n[r]
if(o(t,s))break
if(i.isTag(s)&&e(s))return!0}return!1}
case ue.Adjacent:return i.prevElementSibling?function(t){const n=i.prevElementSibling(t)
return null!=n&&e(n)}:function(t){const n=i.getSiblings(t)
let r
for(let e=0;e<n.length;e++){const s=n[e]
if(o(t,s))break
i.isTag(s)&&(r=s)}return!!r&&e(r)}
case ue.Universal:if(null!=t.namespace&&"*"!==t.namespace)throw new Error("Namespaced universal selectors are not yet supported by css-select")
return e}}function Je(e,t,n){return st("string"==typeof e?xe(e):e,t,n)}function et(e){return e.type===ue.Pseudo&&("scope"===e.name||Array.isArray(e.data)&&e.data.some(e=>e.some(et)))}const tt={type:ue.Descendant},nt={type:"_flexibleDescendant"},rt={type:ue.Pseudo,name:"scope",data:null}
function st(e,t,n){var r
e.forEach(Ee),n=null!==(r=t.context)&&void 0!==r?r:n
const s=Array.isArray(n),i=n&&(Array.isArray(n)?n:[n])
if(!1!==t.relativeSelector)!function(e,{adapter:t},n){const r=!!(null==n?void 0:n.every(e=>{const n=t.isTag(e)&&t.getParent(e)
return e===Ve||n&&t.isTag(n)}))
for(const t of e){if(t.length>0&&_e(t[0])&&t[0].type!==ue.Descendant);else{if(!r||t.some(et))continue
t.unshift(tt)}t.unshift(rt)}}(e,t,i)
else if(e.some(e=>e.length>0&&_e(e[0])))throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled")
let o=!1
const a=e.map(e=>{if(e.length>=2){const[t,n]=e
t.type!==ue.Pseudo||"scope"!==t.name||(s&&n.type===ue.Descendant?e[1]=nt:n.type!==ue.Adjacent&&n.type!==ue.Sibling||(o=!0))}return function(e,t,n){var r
return e.reduce((e,r)=>e===fe.falseFunc?fe.falseFunc:Ze(e,r,t,n,st),null!==(r=t.rootFunc)&&void 0!==r?r:fe.trueFunc)}(e,t,i)}).reduce(it,fe.falseFunc)
return a.shouldTestNextSiblings=o,a}function it(e,t){return t===fe.falseFunc||e===fe.trueFunc?e:e===fe.falseFunc||t===fe.trueFunc?t:function(n){return e(n)||t(n)}}const ot=(e,t)=>e===t,at={adapter:le,equals:ot}
function lt(e){var t,n,r,s
const i=null!=e?e:at
return null!==(t=i.adapter)&&void 0!==t?t:i.adapter=le,null!==(n=i.equals)&&void 0!==n||(i.equals=null!==(s=null===(r=i.adapter)||void 0===r?void 0:r.equals)&&void 0!==s?s:ot),i}function ct(e){return function(t,n,r){const s=lt(r)
"function"!=typeof t&&(t=Je(t,s,n))
const i=function(e,t,n=!1){n&&(e=function(e,t){const n=Array.isArray(e)?e.slice(0):[e],r=n.length
for(let e=0;e<r;e++){const r=Ye(n[e],t)
n.push(...r)}return n}(e,t))
return Array.isArray(e)?t.removeSubsets(e):t.getChildren(e)}(n,s.adapter,t.shouldTestNextSiblings)
return e(t,i,s)}}const ut=ct((e,t,n)=>e!==fe.falseFunc&&t&&0!==t.length?n.adapter.findAll(e,t):[]),ht=ct((e,t,n)=>e!==fe.falseFunc&&t&&0!==t.length?n.adapter.findOne(e,t):null)
function ft(e,t,n){const r=lt(n)
return("function"==typeof t?t:function(e,t,n){return $e(Je(e,t,n),t.adapter)}(t,r))(e)}function pt(e){const t=new Map
for(const n of e.children)t.set(n,e),a(n,{element:{enter:(e,n)=>{t.set(e,n)}}},e)
return t}const dt=e=>"element"===e.type,mt=(e,t)=>t.some(t=>dt(t)&&(e(t)||mt(e,yt(t)))),gt=(e,t)=>e.attributes[t],yt=e=>e.children||[],bt=e=>e.name,kt=e=>"text"===e.children[0].type||"cdata"===e.children[0].type?e.children[0].value:"",vt=(e,t)=>void 0!==e.attributes[t],St=(e,t)=>{const n=[]
for(const r of t)dt(r)&&(e(r)&&n.push(r),n.push(...St(e,yt(r))))
return n},wt=(e,t)=>{for(const n of t)if(dt(n)){if(e(n))return n
const t=wt(e,yt(n))
if(t)return t}return null}
function xt(e,t){const n=n=>(t||(t=pt(e)),t.get(n)||null)
return{isTag:dt,existsOne:mt,getAttributeValue:gt,getChildren:yt,getName:bt,getParent:n,getSiblings:e=>{const t=n(e)
return t?yt(t):[]},getText:kt,hasAttrib:vt,removeSubsets:e=>{let t,r,s,i=e.length
for(;--i>-1;){for(t=r=e[i],e[i]=null,s=!0;r;){if(e.includes(r)){s=!1,e.splice(i,1)
break}r=n(r)}s&&(e[i]=t)}return e},findAll:St,findOne:wt}}function Ct(e,t){return{xmlMode:!0,adapter:xt(e,t)}}const At=(e,t,n)=>ut(t,e,Ct(e,n)),_t=(e,t,n)=>ht(t,e,Ct(e,n)),Tt=(e,t,n)=>ft(e,t,Ct(e,n)),Et=(e,t)=>{t.children=t.children.filter(t=>t!==e)}
var Ot=Object.freeze({__proto__:null,description:"removes doctype declaration",fn:()=>({doctype:{enter:(e,t)=>{Et(e,t)}}}),name:"removeDoctype"})
var Pt=Object.freeze({__proto__:null,description:"removes XML processing instructions",fn:()=>({instruction:{enter:(e,t)=>{"xml"===e.name&&Et(e,t)}}}),name:"removeXMLProcInst"})
const Lt=[/^!/]
var Nt=Object.freeze({__proto__:null,description:"removes comments",fn:(e,t)=>{const{preservePatterns:n=Lt}=t
return{comment:{enter:(e,t)=>{if(n){if(!Array.isArray(n))throw Error(`Expected array in removeComments preservePatterns parameter but received ${n}`)
if(n.some(t=>new RegExp(t).test(e.value)))return}Et(e,t)}}}},name:"removeComments"})
const Dt={animation:new Set(["animate","animateColor","animateMotion","animateTransform","set"]),descriptive:new Set(["desc","metadata","title"]),shape:new Set(["circle","ellipse","line","path","polygon","polyline","rect"]),structural:new Set(["defs","g","svg","symbol","use"]),paintServer:new Set(["hatch","linearGradient","meshGradient","pattern","radialGradient","solidColor"]),nonRendering:new Set(["clipPath","filter","linearGradient","marker","mask","pattern","radialGradient","solidColor","symbol"]),container:new Set(["a","defs","foreignObject","g","marker","mask","missing-glyph","pattern","svg","switch","symbol"]),textContent:new Set(["a","altGlyph","altGlyphDef","altGlyphItem","glyph","glyphRef","text","textPath","tref","tspan"]),textContentChild:new Set(["altGlyph","textPath","tref","tspan"]),lightSource:new Set(["feDiffuseLighting","feDistantLight","fePointLight","feSpecularLighting","feSpotLight"]),filterPrimitive:new Set(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence"])},Mt=new Set([...Dt.textContent,"pre","title"]),jt=new Set(["glyph","missing-glyph","path"]),It={animationAddition:new Set(["additive","accumulate"]),animationAttributeTarget:new Set(["attributeType","attributeName"]),animationEvent:new Set(["onbegin","onend","onrepeat","onload"]),animationTiming:new Set(["begin","dur","end","fill","max","min","repeatCount","repeatDur","restart"]),animationValue:new Set(["by","calcMode","from","keySplines","keyTimes","to","values"]),conditionalProcessing:new Set(["requiredExtensions","requiredFeatures","systemLanguage"]),core:new Set(["id","tabindex","xml:base","xml:lang","xml:space"]),graphicalEvent:new Set(["onactivate","onclick","onfocusin","onfocusout","onload","onmousedown","onmousemove","onmouseout","onmouseover","onmouseup"]),presentation:new Set(["alignment-baseline","baseline-shift","clip-path","clip-rule","clip","color-interpolation-filters","color-interpolation","color-profile","color-rendering","color","cursor","direction","display","dominant-baseline","enable-background","fill-opacity","fill-rule","fill","filter","flood-color","flood-opacity","font-family","font-size-adjust","font-size","font-stretch","font-style","font-variant","font-weight","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","mask","opacity","overflow","paint-order","pointer-events","shape-rendering","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","stroke","text-anchor","text-decoration","text-overflow","text-rendering","transform-origin","transform","unicode-bidi","vector-effect","visibility","word-spacing","writing-mode"]),xlink:new Set(["xlink:actuate","xlink:arcrole","xlink:href","xlink:role","xlink:show","xlink:title","xlink:type"]),documentEvent:new Set(["onabort","onerror","onresize","onscroll","onunload","onzoom"]),documentElementEvent:new Set(["oncopy","oncut","onpaste"]),globalEvent:new Set(["oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onseeked","onseeking","onselect","onshow","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting"]),filterPrimitive:new Set(["x","y","width","height","result"]),transferFunction:new Set(["amplitude","exponent","intercept","offset","slope","tableValues","type"])},Rt={core:{"xml:space":"default"},presentation:{clip:"auto","clip-path":"none","clip-rule":"nonzero",mask:"none",opacity:"1","stop-color":"#000","stop-opacity":"1","fill-opacity":"1","fill-rule":"nonzero",fill:"#000",stroke:"none","stroke-width":"1","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-dashoffset":"0","stroke-opacity":"1","paint-order":"normal","vector-effect":"none",display:"inline",visibility:"visible","marker-start":"none","marker-mid":"none","marker-end":"none","color-interpolation":"sRGB","color-interpolation-filters":"linearRGB","color-rendering":"auto","shape-rendering":"auto","text-rendering":"auto","image-rendering":"auto","font-style":"normal","font-variant":"normal","font-weight":"normal","font-stretch":"normal","font-size":"medium","font-size-adjust":"none",kerning:"auto","letter-spacing":"normal","word-spacing":"normal","text-decoration":"none","text-anchor":"start","text-overflow":"clip","writing-mode":"lr-tb","glyph-orientation-vertical":"auto","glyph-orientation-horizontal":"0deg",direction:"ltr","unicode-bidi":"normal","dominant-baseline":"auto","alignment-baseline":"baseline","baseline-shift":"baseline"},transferFunction:{slope:"1",intercept:"0",amplitude:"1",exponent:"1",offset:"0"}},Ft={animationAttributeTarget:{unsafe:new Set(["attributeType"])},conditionalProcessing:{unsafe:new Set(["requiredFeatures"])},core:{unsafe:new Set(["xml:base","xml:lang","xml:space"])},presentation:{unsafe:new Set(["clip","color-profile","enable-background","glyph-orientation-horizontal","glyph-orientation-vertical","kerning"])}},zt={a:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","style","target","transform"]),defaults:{target:"_self"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view","tspan"])},altGlyph:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","dx","dy","externalResourcesRequired","format","glyphRef","rotate","style","x","y"])},altGlyphDef:{attrsGroups:new Set(["core"]),content:new Set(["glyphRef"])},altGlyphItem:{attrsGroups:new Set(["core"]),content:new Set(["glyphRef","altGlyphItem"])},animate:{attrsGroups:new Set(["animationAddition","animationAttributeTarget","animationEvent","animationTiming","animationValue","conditionalProcessing","core","presentation","xlink"]),attrs:new Set(["externalResourcesRequired"]),contentGroups:new Set(["descriptive"])},animateColor:{attrsGroups:new Set(["animationAddition","animationAttributeTarget","animationEvent","animationTiming","animationValue","conditionalProcessing","core","presentation","xlink"]),attrs:new Set(["externalResourcesRequired"]),contentGroups:new Set(["descriptive"])},animateMotion:{attrsGroups:new Set(["animationAddition","animationEvent","animationTiming","animationValue","conditionalProcessing","core","xlink"]),attrs:new Set(["externalResourcesRequired","keyPoints","origin","path","rotate"]),defaults:{rotate:"0"},contentGroups:new Set(["descriptive"]),content:new Set(["mpath"])},animateTransform:{attrsGroups:new Set(["animationAddition","animationAttributeTarget","animationEvent","animationTiming","animationValue","conditionalProcessing","core","xlink"]),attrs:new Set(["externalResourcesRequired","type"]),contentGroups:new Set(["descriptive"])},circle:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","cx","cy","externalResourcesRequired","r","style","transform"]),defaults:{cx:"0",cy:"0"},contentGroups:new Set(["animation","descriptive"])},clipPath:{attrsGroups:new Set(["conditionalProcessing","core","presentation"]),attrs:new Set(["class","clipPathUnits","externalResourcesRequired","style","transform"]),defaults:{clipPathUnits:"userSpaceOnUse"},contentGroups:new Set(["animation","descriptive","shape"]),content:new Set(["text","use"])},"color-profile":{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["local","name","rendering-intent"]),defaults:{name:"sRGB","rendering-intent":"auto"},deprecated:{unsafe:new Set(["name"])},contentGroups:new Set(["descriptive"])},cursor:{attrsGroups:new Set(["core","conditionalProcessing","xlink"]),attrs:new Set(["externalResourcesRequired","x","y"]),defaults:{x:"0",y:"0"},contentGroups:new Set(["descriptive"])},defs:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform"]),contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},desc:{attrsGroups:new Set(["core"]),attrs:new Set(["class","style"])},ellipse:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","cx","cy","externalResourcesRequired","rx","ry","style","transform"]),defaults:{cx:"0",cy:"0"},contentGroups:new Set(["animation","descriptive"])},feBlend:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","in2","mode"]),defaults:{mode:"normal"},content:new Set(["animate","set"])},feColorMatrix:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","type","values"]),defaults:{type:"matrix"},content:new Set(["animate","set"])},feComponentTransfer:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in"]),content:new Set(["feFuncA","feFuncB","feFuncG","feFuncR"])},feComposite:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","in2","k1","k2","k3","k4","operator","style"]),defaults:{operator:"over",k1:"0",k2:"0",k3:"0",k4:"0"},content:new Set(["animate","set"])},feConvolveMatrix:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","kernelMatrix","order","style","bias","divisor","edgeMode","targetX","targetY","kernelUnitLength","preserveAlpha"]),defaults:{order:"3",bias:"0",edgeMode:"duplicate",preserveAlpha:"false"},content:new Set(["animate","set"])},feDiffuseLighting:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","diffuseConstant","in","kernelUnitLength","style","surfaceScale"]),defaults:{surfaceScale:"1",diffuseConstant:"1"},contentGroups:new Set(["descriptive"]),content:new Set(["feDistantLight","fePointLight","feSpotLight"])},feDisplacementMap:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","in2","scale","style","xChannelSelector","yChannelSelector"]),defaults:{scale:"0",xChannelSelector:"A",yChannelSelector:"A"},content:new Set(["animate","set"])},feDistantLight:{attrsGroups:new Set(["core"]),attrs:new Set(["azimuth","elevation"]),defaults:{azimuth:"0",elevation:"0"},content:new Set(["animate","set"])},feFlood:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style"]),content:new Set(["animate","animateColor","set"])},feFuncA:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feFuncB:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feFuncG:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feFuncR:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feGaussianBlur:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","stdDeviation"]),defaults:{stdDeviation:"0"},content:new Set(["set","animate"])},feImage:{attrsGroups:new Set(["core","presentation","filterPrimitive","xlink"]),attrs:new Set(["class","externalResourcesRequired","href","preserveAspectRatio","style","xlink:href"]),defaults:{preserveAspectRatio:"xMidYMid meet"},content:new Set(["animate","animateTransform","set"])},feMerge:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style"]),content:new Set(["feMergeNode"])},feMergeNode:{attrsGroups:new Set(["core"]),attrs:new Set(["in"]),content:new Set(["animate","set"])},feMorphology:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","operator","radius"]),defaults:{operator:"erode",radius:"0"},content:new Set(["animate","set"])},feOffset:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","dx","dy"]),defaults:{dx:"0",dy:"0"},content:new Set(["animate","set"])},fePointLight:{attrsGroups:new Set(["core"]),attrs:new Set(["x","y","z"]),defaults:{x:"0",y:"0",z:"0"},content:new Set(["animate","set"])},feSpecularLighting:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","kernelUnitLength","specularConstant","specularExponent","style","surfaceScale"]),defaults:{surfaceScale:"1",specularConstant:"1",specularExponent:"1"},contentGroups:new Set(["descriptive","lightSource"])},feSpotLight:{attrsGroups:new Set(["core"]),attrs:new Set(["limitingConeAngle","pointsAtX","pointsAtY","pointsAtZ","specularExponent","x","y","z"]),defaults:{x:"0",y:"0",z:"0",pointsAtX:"0",pointsAtY:"0",pointsAtZ:"0",specularExponent:"1"},content:new Set(["animate","set"])},feTile:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in"]),content:new Set(["animate","set"])},feTurbulence:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["baseFrequency","class","numOctaves","seed","stitchTiles","style","type"]),defaults:{baseFrequency:"0",numOctaves:"1",seed:"0",stitchTiles:"noStitch",type:"turbulence"},content:new Set(["animate","set"])},filter:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","filterRes","filterUnits","height","href","primitiveUnits","style","width","x","xlink:href","y"]),defaults:{primitiveUnits:"userSpaceOnUse",x:"-10%",y:"-10%",width:"120%",height:"120%"},deprecated:{unsafe:new Set(["filterRes"])},contentGroups:new Set(["descriptive","filterPrimitive"]),content:new Set(["animate","set"])},font:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","externalResourcesRequired","horiz-adv-x","horiz-origin-x","horiz-origin-y","style","vert-adv-y","vert-origin-x","vert-origin-y"]),defaults:{"horiz-origin-x":"0","horiz-origin-y":"0"},deprecated:{unsafe:new Set(["horiz-origin-x","horiz-origin-y","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["descriptive"]),content:new Set(["font-face","glyph","hkern","missing-glyph","vkern"])},"font-face":{attrsGroups:new Set(["core"]),attrs:new Set(["font-family","font-style","font-variant","font-weight","font-stretch","font-size","unicode-range","units-per-em","panose-1","stemv","stemh","slope","cap-height","x-height","accent-height","ascent","descent","widths","bbox","ideographic","alphabetic","mathematical","hanging","v-ideographic","v-alphabetic","v-mathematical","v-hanging","underline-position","underline-thickness","strikethrough-position","strikethrough-thickness","overline-position","overline-thickness"]),defaults:{"font-style":"all","font-variant":"normal","font-weight":"all","font-stretch":"normal","unicode-range":"U+0-10FFFF","units-per-em":"1000","panose-1":"0 0 0 0 0 0 0 0 0 0",slope:"0"},deprecated:{unsafe:new Set(["accent-height","alphabetic","ascent","bbox","cap-height","descent","hanging","ideographic","mathematical","panose-1","slope","stemh","stemv","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","widths","x-height"])},contentGroups:new Set(["descriptive"]),content:new Set(["font-face-src"])},"font-face-format":{attrsGroups:new Set(["core"]),attrs:new Set(["string"]),deprecated:{unsafe:new Set(["string"])}},"font-face-name":{attrsGroups:new Set(["core"]),attrs:new Set(["name"]),deprecated:{unsafe:new Set(["name"])}},"font-face-src":{attrsGroups:new Set(["core"]),content:new Set(["font-face-name","font-face-uri"])},"font-face-uri":{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["href","xlink:href"]),content:new Set(["font-face-format"])},foreignObject:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","height","style","transform","width","x","y"]),defaults:{x:"0",y:"0"}},g:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform"]),contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},glyph:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["arabic-form","class","d","glyph-name","horiz-adv-x","lang","orientation","style","unicode","vert-adv-y","vert-origin-x","vert-origin-y"]),defaults:{"arabic-form":"initial"},deprecated:{unsafe:new Set(["arabic-form","glyph-name","horiz-adv-x","orientation","unicode","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},glyphRef:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","d","horiz-adv-x","style","vert-adv-y","vert-origin-x","vert-origin-y"]),deprecated:{unsafe:new Set(["horiz-adv-x","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},hatch:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","hatchContentUnits","hatchUnits","pitch","rotate","style","transform","x","y"]),defaults:{hatchUnits:"objectBoundingBox",hatchContentUnits:"userSpaceOnUse",x:"0",y:"0",pitch:"0",rotate:"0"},contentGroups:new Set(["animation","descriptive"]),content:new Set(["hatchPath"])},hatchPath:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","style","d","offset"]),defaults:{offset:"0"},contentGroups:new Set(["animation","descriptive"])},hkern:{attrsGroups:new Set(["core"]),attrs:new Set(["u1","g1","u2","g2","k"]),deprecated:{unsafe:new Set(["g1","g2","k","u1","u2"])}},image:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","height","href","preserveAspectRatio","style","transform","width","x","xlink:href","y"]),defaults:{x:"0",y:"0",preserveAspectRatio:"xMidYMid meet"},contentGroups:new Set(["animation","descriptive"])},line:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform","x1","x2","y1","y2"]),defaults:{x1:"0",y1:"0",x2:"0",y2:"0"},contentGroups:new Set(["animation","descriptive"])},linearGradient:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","gradientTransform","gradientUnits","href","spreadMethod","style","x1","x2","xlink:href","y1","y2"]),defaults:{x1:"0",y1:"0",x2:"100%",y2:"0",spreadMethod:"pad"},contentGroups:new Set(["descriptive"]),content:new Set(["animate","animateTransform","set","stop"])},marker:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","externalResourcesRequired","markerHeight","markerUnits","markerWidth","orient","preserveAspectRatio","refX","refY","style","viewBox"]),defaults:{markerUnits:"strokeWidth",refX:"0",refY:"0",markerWidth:"3",markerHeight:"3"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},mask:{attrsGroups:new Set(["conditionalProcessing","core","presentation"]),attrs:new Set(["class","externalResourcesRequired","height","mask-type","maskContentUnits","maskUnits","style","width","x","y"]),defaults:{maskUnits:"objectBoundingBox",maskContentUnits:"userSpaceOnUse",x:"-10%",y:"-10%",width:"120%",height:"120%"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},metadata:{attrsGroups:new Set(["core"])},"missing-glyph":{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","d","horiz-adv-x","style","vert-adv-y","vert-origin-x","vert-origin-y"]),deprecated:{unsafe:new Set(["horiz-adv-x","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},mpath:{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["externalResourcesRequired","href","xlink:href"]),contentGroups:new Set(["descriptive"])},path:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","d","externalResourcesRequired","pathLength","style","transform"]),contentGroups:new Set(["animation","descriptive"])},pattern:{attrsGroups:new Set(["conditionalProcessing","core","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","height","href","patternContentUnits","patternTransform","patternUnits","preserveAspectRatio","style","viewBox","width","x","xlink:href","y"]),defaults:{patternUnits:"objectBoundingBox",patternContentUnits:"userSpaceOnUse",x:"0",y:"0",width:"0",height:"0",preserveAspectRatio:"xMidYMid meet"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},polygon:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","points","style","transform"]),contentGroups:new Set(["animation","descriptive"])},polyline:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","points","style","transform"]),contentGroups:new Set(["animation","descriptive"])},radialGradient:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","cx","cy","externalResourcesRequired","fr","fx","fy","gradientTransform","gradientUnits","href","r","spreadMethod","style","xlink:href"]),defaults:{gradientUnits:"objectBoundingBox",cx:"50%",cy:"50%",r:"50%"},contentGroups:new Set(["descriptive"]),content:new Set(["animate","animateTransform","set","stop"])},meshGradient:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","style","x","y","gradientUnits","transform"]),contentGroups:new Set(["descriptive","paintServer","animation"]),content:new Set(["meshRow"])},meshRow:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style"]),contentGroups:new Set(["descriptive"]),content:new Set(["meshPatch"])},meshPatch:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style"]),contentGroups:new Set(["descriptive"]),content:new Set(["stop"])},rect:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","height","rx","ry","style","transform","width","x","y"]),defaults:{x:"0",y:"0"},contentGroups:new Set(["animation","descriptive"])},script:{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["externalResourcesRequired","type","href","xlink:href"])},set:{attrsGroups:new Set(["animation","animationAttributeTarget","animationTiming","conditionalProcessing","core","xlink"]),attrs:new Set(["externalResourcesRequired","to"]),contentGroups:new Set(["descriptive"])},solidColor:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style"]),contentGroups:new Set(["paintServer"])},stop:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style","offset","path"]),content:new Set(["animate","animateColor","set"])},style:{attrsGroups:new Set(["core"]),attrs:new Set(["type","media","title"]),defaults:{type:"text/css"}},svg:{attrsGroups:new Set(["conditionalProcessing","core","documentEvent","graphicalEvent","presentation"]),attrs:new Set(["baseProfile","class","contentScriptType","contentStyleType","height","preserveAspectRatio","style","version","viewBox","width","x","y","zoomAndPan"]),defaults:{x:"0",y:"0",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid meet",zoomAndPan:"magnify",version:"1.1",baseProfile:"none",contentScriptType:"application/ecmascript",contentStyleType:"text/css"},deprecated:{safe:new Set(["version"]),unsafe:new Set(["baseProfile","contentScriptType","contentStyleType","zoomAndPan"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},switch:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform"]),contentGroups:new Set(["animation","descriptive","shape"]),content:new Set(["a","foreignObject","g","image","svg","switch","text","use"])},symbol:{attrsGroups:new Set(["core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","preserveAspectRatio","refX","refY","style","viewBox"]),defaults:{refX:"0",refY:"0"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},text:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","dx","dy","externalResourcesRequired","lengthAdjust","rotate","style","textLength","transform","x","y"]),defaults:{x:"0",y:"0",lengthAdjust:"spacing"},contentGroups:new Set(["animation","descriptive","textContentChild"]),content:new Set(["a"])},textPath:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","d","externalResourcesRequired","href","method","spacing","startOffset","style","xlink:href"]),defaults:{startOffset:"0",method:"align",spacing:"exact"},contentGroups:new Set(["descriptive"]),content:new Set(["a","altGlyph","animate","animateColor","set","tref","tspan"])},title:{attrsGroups:new Set(["core"]),attrs:new Set(["class","style"])},tref:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","href","style","xlink:href"]),contentGroups:new Set(["descriptive"]),content:new Set(["animate","animateColor","set"])},tspan:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","dx","dy","externalResourcesRequired","lengthAdjust","rotate","style","textLength","x","y"]),contentGroups:new Set(["descriptive"]),content:new Set(["a","altGlyph","animate","animateColor","set","tref","tspan"])},use:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","height","href","style","transform","width","x","xlink:href","y"]),defaults:{x:"0",y:"0"},contentGroups:new Set(["animation","descriptive"])},view:{attrsGroups:new Set(["core"]),attrs:new Set(["externalResourcesRequired","preserveAspectRatio","viewBox","viewTarget","zoomAndPan"]),deprecated:{unsafe:new Set(["viewTarget","zoomAndPan"])},contentGroups:new Set(["descriptive"])},vkern:{attrsGroups:new Set(["core"]),attrs:new Set(["u1","g1","u2","g2","k"]),deprecated:{unsafe:new Set(["g1","g2","k","u1","u2"])}}},Gt=new Set(["http://creativecommons.org/ns#","http://inkscape.sourceforge.net/DTD/sodipodi-0.dtd","http://krita.org/namespaces/svg/krita","http://ns.adobe.com/AdobeIllustrator/10.0/","http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/","http://ns.adobe.com/Extensibility/1.0/","http://ns.adobe.com/Flows/1.0/","http://ns.adobe.com/GenericCustomNamespace/1.0/","http://ns.adobe.com/Graphs/1.0/","http://ns.adobe.com/ImageReplacement/1.0/","http://ns.adobe.com/SaveForWeb/1.0/","http://ns.adobe.com/Variables/1.0/","http://ns.adobe.com/XPath/1.0/","http://purl.org/dc/elements/1.1/","http://schemas.microsoft.com/visio/2003/SVGExtensions/","http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd","http://taptrix.com/vectorillustrator/svg_extensions","http://www.bohemiancoding.com/sketch/ns","http://www.figma.com/figma/ns","http://www.inkscape.org/namespaces/inkscape","http://www.serif.com/","http://www.vector.evaxdesign.sk","http://www.w3.org/1999/02/22-rdf-syntax-ns#","https://boxy-svg.com"]),Bt=new Set(["clip-path","color-profile","fill","filter","marker-end","marker-mid","marker-start","mask","stroke","style"]),Ut=new Set(["clip-rule","color-interpolation-filters","color-interpolation","color-profile","color-rendering","color","cursor","direction","dominant-baseline","fill-opacity","fill-rule","fill","font-family","font-size-adjust","font-size","font-stretch","font-style","font-variant","font-weight","font","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","letter-spacing","marker-end","marker-mid","marker-start","marker","paint-order","pointer-events","shape-rendering","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","stroke","text-anchor","text-rendering","transform","visibility","word-spacing","writing-mode"]),qt=new Set(["clip-path","display","filter","mask","opacity","text-decoration","transform","unicode-bidi"]),Wt={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#0ff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000",blanchedalmond:"#ffebcd",blue:"#00f",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#0ff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#f0f",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#789",lightslategrey:"#789",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#0f0",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#f0f",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#639",red:"#f00",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#fff",whitesmoke:"#f5f5f5",yellow:"#ff0",yellowgreen:"#9acd32"},Vt={"#f0ffff":"azure","#f5f5dc":"beige","#ffe4c4":"bisque","#a52a2a":"brown","#ff7f50":"coral","#ffd700":"gold","#808080":"gray","#008000":"green","#4b0082":"indigo","#fffff0":"ivory","#f0e68c":"khaki","#faf0e6":"linen","#800000":"maroon","#000080":"navy","#808000":"olive","#ffa500":"orange","#da70d6":"orchid","#cd853f":"peru","#ffc0cb":"pink","#dda0dd":"plum","#800080":"purple","#f00":"red","#ff0000":"red","#fa8072":"salmon","#a0522d":"sienna","#c0c0c0":"silver","#fffafa":"snow","#d2b48c":"tan","#008080":"teal","#ff6347":"tomato","#ee82ee":"violet","#f5deb3":"wheat"},$t=new Set(["color","fill","flood-color","lighting-color","stop-color","stroke"]),Yt={displayState:new Set(["fullscreen","modal","picture-in-picture"]),input:new Set(["autofill","blank","checked","default","disabled","enabled","in-range","indeterminate","invalid","optional","out-of-range","placeholder-shown","read-only","read-write","required","user-invalid","valid"]),linguistic:new Set(["dir","lang"]),location:new Set(["any-link","link","local-link","scope","target-within","target","visited"]),resourceState:new Set(["playing","paused"]),timeDimensional:new Set(["current","past","future"]),treeStructural:new Set(["empty","first-child","first-of-type","last-child","last-of-type","nth-child","nth-last-child","nth-last-of-type","nth-of-type","only-child","only-of-type","root"]),userAction:new Set(["active","focus-visible","focus-within","focus","hover"]),functional:new Set(["is","not","where","has"])}
var Xt=Object.freeze({__proto__:null,attrsGroups:It,attrsGroupsDefaults:Rt,attrsGroupsDeprecated:Ft,colorsNames:Wt,colorsProps:$t,colorsShortNames:Vt,editorNamespaces:Gt,elems:zt,elemsGroups:Dt,inheritableAttrs:Ut,pathElems:jt,presentationNonInheritableGroupAttrs:qt,pseudoClasses:Yt,referencesProps:Bt,textElems:Mt})
const Ht=10,Qt=11,Kt=12,Zt=13,Jt=15,en=16,tn=17,nn=18,rn=19,sn=20,on=21,an=22,ln=23,cn=24,un=25
function hn(e){return e>=0x0030&&e<=0x0039}function fn(e){return hn(e)||e>=0x0041&&e<=0x0046||e>=0x0061&&e<=0x0066}function pn(e){return e>=0x0041&&e<=0x005A}function dn(e){return function(e){return pn(e)||function(e){return e>=0x0061&&e<=0x007A}(e)}(e)||function(e){return e>=0x0080}(e)||0x005F===e}function mn(e){return dn(e)||hn(e)||0x002D===e}function gn(e){return e>=0x0000&&e<=0x0008||0x000B===e||e>=0x000E&&e<=0x001F||0x007F===e}function yn(e){return 0x000A===e||0x000D===e||0x000C===e}function bn(e){return yn(e)||0x0020===e||0x0009===e}function kn(e,t){return 0x005C===e&&(!yn(t)&&0!==t)}function vn(e,t,n){return 0x002D===e?dn(t)||0x002D===t||kn(t,n):!!dn(e)||0x005C===e&&kn(e,t)}function Sn(e,t,n){return 0x002B===e||0x002D===e?hn(t)?2:0x002E===t&&hn(n)?3:0:0x002E===e?hn(t)?2:0:hn(e)?1:0}function wn(e){return 0xFEFF===e||0xFFFE===e?1:0}const xn=new Array(0x80),Cn=0x82
for(let e=0;e<xn.length;e++)xn[e]=(bn(e)?Cn:hn(e)&&131)||dn(e)&&132||gn(e)&&133||e||128
function An(e){return e<0x80?xn[e]:132}function _n(e,t){return t<e.length?e.charCodeAt(t):0}function Tn(e,t,n){return 13===n&&10===_n(e,t+1)?2:1}function En(e,t,n){let r=e.charCodeAt(t)
return pn(r)&&(r|=32),r===n}function On(e,t,n,r){if(n-t!==r.length)return!1
if(t<0||n>e.length)return!1
for(let s=t;s<n;s++){const n=r.charCodeAt(s-t)
let i=e.charCodeAt(s)
if(pn(i)&&(i|=32),i!==n)return!1}return!0}function Pn(e,t){for(;t<e.length&&bn(e.charCodeAt(t));t++);return t}function Ln(e,t){for(;t<e.length&&hn(e.charCodeAt(t));t++);return t}function Nn(e,t){if(fn(_n(e,(t+=2)-1))){for(const n=Math.min(e.length,t+5);t<n&&fn(_n(e,t));t++);const n=_n(e,t)
bn(n)&&(t+=Tn(e,t,n))}return t}function Dn(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(!mn(n)){if(!kn(n,_n(e,t+1)))break
t=Nn(e,t)-1}}return t}function Mn(e,t){let n=e.charCodeAt(t)
if(0x002B!==n&&0x002D!==n||(n=e.charCodeAt(t+=1)),hn(n)&&(t=Ln(e,t+1),n=e.charCodeAt(t)),0x002E===n&&hn(e.charCodeAt(t+1))&&(t=Ln(e,t+=2)),En(e,t,101)){let r=0
n=e.charCodeAt(t+1),0x002D!==n&&0x002B!==n||(r=1,n=e.charCodeAt(t+2)),hn(n)&&(t=Ln(e,t+1+r+1))}return t}function jn(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(0x0029===n){t++
break}kn(n,_n(e,t+1))&&(t=Nn(e,t))}return t}function In(e){if(1===e.length&&!fn(e.charCodeAt(0)))return e[0]
let t=parseInt(e,16)
return(0===t||t>=0xD800&&t<=0xDFFF||t>0x10FFFF)&&(t=0xFFFD),String.fromCodePoint(t)}var Rn=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"]
function Fn(e=null,t){return null===e||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}function zn(e){const t=e.source,n=t.length,r=t.length>0?wn(t.charCodeAt(0)):0,s=Fn(e.lines,n),i=Fn(e.columns,n)
let o=e.startLine,a=e.startColumn
for(let e=r;e<n;e++){const r=t.charCodeAt(e)
s[e]=o,i[e]=a++,10!==r&&13!==r&&12!==r||(13===r&&e+1<n&&10===t.charCodeAt(e+1)&&(e++,s[e]=o,i[e]=a),o++,a=1)}s[n]=o,i[n]=a,e.lines=s,e.columns=i,e.computed=!0}let Gn=class{constructor(e,t,n,r){this.setSource(e,t,n,r),this.lines=null,this.columns=null}setSource(e="",t=0,n=1,r=1){this.source=e,this.startOffset=t,this.startLine=n,this.startColumn=r,this.computed=!1}getLocation(e,t){return this.computed||zn(this),{source:t,offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]}}getLocationRange(e,t,n){return this.computed||zn(this),{source:n,start:{offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]},end:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}}}
const Bn=0x00FFFFFF,Un=24,qn=new Uint8Array(32)
function Wn(e){return 0!==qn[e]}qn[2]=an,qn[21]=an,qn[19]=sn,qn[23]=cn
let Vn=class{constructor(e,t){this.setSource(e,t)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(e="",t=()=>{}){const n=(e=String(e||"")).length,r=Fn(this.offsetAndType,e.length+1),s=Fn(this.balance,e.length+1)
let i=0,o=-1,a=0,l=e.length
this.offsetAndType=null,this.balance=null,s.fill(0),t(e,(e,t,n)=>{const c=i++
if(r[c]=e<<Un|n,-1===o&&(o=t),s[c]=l,e===a){const e=s[l]
s[l]=c,l=e,a=qn[r[e]>>Un]}else Wn(e)&&(l=c,a=qn[e])}),r[i]=0|n,s[i]=i
for(let e=0;e<i;e++){const t=s[e]
if(t<=e){const n=s[t]
n!==e&&(s[e]=n)}else t>i&&(s[e]=i)}this.source=e,this.firstCharOffset=-1===o?0:o,this.tokenCount=i,this.offsetAndType=r,this.balance=s,this.reset(),this.next()}lookupType(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e]>>Un:0}lookupTypeNonSC(e){for(let t=this.tokenIndex;t<this.tokenCount;t++){const n=this.offsetAndType[t]>>Un
if(n!==Zt&&n!==un&&0===e--)return n}return 0}lookupOffset(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e-1]&Bn:this.source.length}lookupOffsetNonSC(e){for(let t=this.tokenIndex;t<this.tokenCount;t++){const n=this.offsetAndType[t]>>Un
if(n!==Zt&&n!==un&&0===e--)return t-this.tokenIndex}return 0}lookupValue(e,t){return(e+=this.tokenIndex)<this.tokenCount&&On(this.source,this.offsetAndType[e-1]&Bn,this.offsetAndType[e]&Bn,t)}getTokenStart(e){return e===this.tokenIndex?this.tokenStart:e>0?e<this.tokenCount?this.offsetAndType[e-1]&Bn:this.offsetAndType[this.tokenCount]&Bn:this.firstCharOffset}substrToCursor(e){return this.source.substring(e,this.tokenStart)}isBalanceEdge(e){return this.balance[this.tokenIndex]<e}isDelim(e,t){return t?9===this.lookupType(t)&&this.source.charCodeAt(this.lookupOffset(t))===e:9===this.tokenType&&this.source.charCodeAt(this.tokenStart)===e}skip(e){let t=this.tokenIndex+e
t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.offsetAndType[t-1]&Bn,t=this.offsetAndType[t],this.tokenType=t>>Un,this.tokenEnd=t&Bn):(this.tokenIndex=this.tokenCount,this.next())}next(){let e=this.tokenIndex+1
e<this.tokenCount?(this.tokenIndex=e,this.tokenStart=this.tokenEnd,e=this.offsetAndType[e],this.tokenType=e>>Un,this.tokenEnd=e&Bn):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===Zt||this.tokenType===un;)this.next()}skipUntilBalanced(e,t){let n=e,r=0,s=0
e:for(;n<this.tokenCount&&(r=this.balance[n],!(r<e));n++)switch(s=n>0?this.offsetAndType[n-1]&Bn:this.firstCharOffset,t(this.source.charCodeAt(s))){case 1:break e
case 2:n++
break e
default:Wn(this.offsetAndType[n]>>Un)&&(n=r)}this.skip(n-this.tokenIndex)}forEachToken(e){for(let t=0,n=this.firstCharOffset;t<this.tokenCount;t++){const r=n,s=this.offsetAndType[t],i=s&Bn
n=i,e(s>>Un,r,i,t)}}dump(){const e=new Array(this.tokenCount)
return this.forEachToken((t,n,r,s)=>{e[s]={idx:s,type:Rn[t],chunk:this.source.substring(n,r),balance:this.balance[s]}}),e}}
function $n(e,t){function n(t){return t<o?e.charCodeAt(t):0}function r(){return c=Mn(e,c),vn(n(c),n(c+1),n(c+2))?(a=Kt,c=Dn(e,c),void 0):0x0025===n(c)?(a=Qt,c++,void 0):(a=Ht,void 0)}function s(){const t=c
return c=Dn(e,c),On(e,t,c,"url")&&0x0028===n(c)?(c=Pn(e,c+1),0x0022===n(c)||0x0027===n(c)?(a=2,c=t+4,void 0):(!function(){for(a=7,c=Pn(e,c);c<e.length;c++){const t=e.charCodeAt(c)
switch(An(t)){case 0x0029:return c++,void 0
case Cn:return c=Pn(e,c),0x0029===n(c)||c>=e.length?(c<e.length&&c++,void 0):(c=jn(e,c),a=8,void 0)
case 0x0022:case 0x0027:case 0x0028:case 133:return c=jn(e,c),a=8,void 0
case 0x005C:if(kn(t,n(c+1))){c=Nn(e,c)-1
break}return c=jn(e,c),a=8,void 0}}}(),void 0)):0x0028===n(c)?(a=2,c++,void 0):(a=1,void 0)}function i(t){for(t||(t=n(c++)),a=5;c<e.length;c++){const r=e.charCodeAt(c)
switch(An(r)){case t:return c++,void 0
case Cn:if(yn(r))return c+=Tn(e,c,r),a=6,void 0
break
case 0x005C:if(c===e.length-1)break
const s=n(c+1)
yn(s)?c+=Tn(e,c+1,s):kn(r,s)&&(c=Nn(e,c)-1)}}}const o=(e=String(e||"")).length
let a,l=wn(n(0)),c=l
for(;c<o;){const o=e.charCodeAt(c)
switch(An(o)){case Cn:a=Zt,c=Pn(e,c+1)
break
case 0x0022:i()
break
case 0x0023:mn(n(c+1))||kn(n(c+1),n(c+2))?(a=4,c=Dn(e,c+1)):(a=9,c++)
break
case 0x0027:i()
break
case 0x0028:a=on,c++
break
case 0x0029:a=an,c++
break
case 0x002B:Sn(o,n(c+1),n(c+2))?r():(a=9,c++)
break
case 0x002C:a=nn,c++
break
case 0x002D:Sn(o,n(c+1),n(c+2))?r():0x002D===n(c+1)&&0x003E===n(c+2)?(a=Jt,c+=3):vn(o,n(c+1),n(c+2))?s():(a=9,c++)
break
case 0x002E:Sn(o,n(c+1),n(c+2))?r():(a=9,c++)
break
case 0x002F:0x002A===n(c+1)?(a=un,c=e.indexOf("*/",c+2),c=-1===c?e.length:c+2):(a=9,c++)
break
case 0x003A:a=en,c++
break
case 0x003B:a=tn,c++
break
case 0x003C:0x0021===n(c+1)&&0x002D===n(c+2)&&0x002D===n(c+3)?(a=14,c+=4):(a=9,c++)
break
case 0x0040:vn(n(c+1),n(c+2),n(c+3))?(a=3,c=Dn(e,c+1)):(a=9,c++)
break
case 0x005B:a=rn,c++
break
case 0x005C:kn(o,n(c+1))?s():(a=9,c++)
break
case 0x005D:a=sn,c++
break
case 0x007B:a=ln,c++
break
case 0x007D:a=cn,c++
break
case 131:r()
break
case 132:s()
break
default:a=9,c++}t(a,l,l=c)}}let Yn=null,Xn=class e{static createItem(e){return{prev:null,next:null,data:e}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(e,t){let n
return null!==Yn?(n=Yn,Yn=Yn.cursor,n.prev=e,n.next=t,n.cursor=this.cursor):n={prev:e,next:t,cursor:this.cursor},this.cursor=n,n}releaseCursor(){const{cursor:e}=this
this.cursor=e.cursor,e.prev=null,e.next=null,e.cursor=Yn,Yn=e}updateCursors(e,t,n,r){let{cursor:s}=this
for(;null!==s;)s.prev===e&&(s.prev=t),s.next===n&&(s.next=r),s=s.cursor}*[Symbol.iterator](){for(let e=this.head;null!==e;e=e.next)yield e.data}get size(){let e=0
for(let t=this.head;null!==t;t=t.next)e++
return e}get isEmpty(){return null===this.head}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(t){let n=null
this.head=null
for(let r of t){const t=e.createItem(r)
null!==n?n.next=t:this.head=t,t.prev=n,n=t}return this.tail=n,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(e,t=this){const n=this.allocateCursor(null,this.head)
for(;null!==n.next;){const r=n.next
n.next=r.next,e.call(t,r.data,r,this)}this.releaseCursor()}forEachRight(e,t=this){const n=this.allocateCursor(this.tail,null)
for(;null!==n.prev;){const r=n.prev
n.prev=r.prev,e.call(t,r.data,r,this)}this.releaseCursor()}reduce(e,t,n=this){let r,s=this.allocateCursor(null,this.head),i=t
for(;null!==s.next;)r=s.next,s.next=r.next,i=e.call(n,i,r.data,r,this)
return this.releaseCursor(),i}reduceRight(e,t,n=this){let r,s=this.allocateCursor(this.tail,null),i=t
for(;null!==s.prev;)r=s.prev,s.prev=r.prev,i=e.call(n,i,r.data,r,this)
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
function Hn(e,t){const n=Object.create(SyntaxError.prototype),r=new Error
return Object.assign(n,{name:e,message:t,get stack(){return(r.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}\n`)}})}const Qn="    "
function Kn({source:e,line:t,column:n,baseLine:r,baseColumn:s},i){function o(e,t){return a.slice(e,t).map((t,n)=>String(e+n+1).padStart(u)+" |"+t).join("\n")}const a=("\n".repeat(Math.max(r-1,0))+" ".repeat(Math.max(s-1,0))+e).split(/\r\n?|\n|\f/),l=Math.max(1,t-i)-1,c=Math.min(t+i,a.length+1),u=Math.max(4,String(c).length)+1
let h=0;(n+=3*(a[t-1].substr(0,n-1).match(/\t/g)||[]).length)>100&&(h=n-60+3,n=58)
for(let e=l;e<=c;e++)e>=0&&e<a.length&&(a[e]=a[e].replace(/\t/g,Qn),a[e]=(h>0&&a[e].length>h?"…":"")+a[e].substr(h,98)+(a[e].length>h+100-1?"…":""))
return[o(l,t),new Array(n+u+2).join("-")+"^",o(t,c)].filter(Boolean).join("\n").replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function Zn(e,t,n,r,s,i=1,o=1){return Object.assign(Hn("SyntaxError",e),{source:t,offset:n,line:r,column:s,sourceFragment:e=>Kn({source:t,line:r,column:s,baseLine:i,baseColumn:o},isNaN(e)?0:e),get formattedMessage(){return`Parse error: ${e}\n`+Kn({source:t,line:r,column:s,baseLine:i,baseColumn:o},2)}})}function Jn(e){const t=this.createList()
let n=!1
const r={recognizer:e}
for(;!this.eof;){switch(this.tokenType){case un:this.next()
continue
case Zt:n=!0,this.next()
continue}let s=e.getNode.call(this,r)
if(void 0===s)break
n&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,s,t,r),n=!1),t.push(s)}return n&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,r),t}const er=()=>{}
function tr(e){return function(){return this[e]()}}function nr(e){const t=Object.create(null)
for(const n of Object.keys(e)){const r=e[n],s=r.parse||r
s&&(t[n]=s)}return t}function rr(e){let t="",n="<unknown>",r=!1,s=er,i=!1
const o=new Gn,a=Object.assign(new Vn,function(e){const t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:nr(e.atrule),pseudo:nr(e.pseudo),node:nr(e.node)}
for(const[n,r]of Object.entries(e.parseContext))switch(typeof r){case"function":t.context[n]=r
break
case"string":t.context[n]=tr(r)}return{config:t,...t,...t.node}}(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:Jn,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket:e=>123===e?1:0,consumeUntilLeftCurlyBracketOrSemicolon:e=>123===e||59===e?1:0,consumeUntilExclamationMarkOrSemicolon:e=>33===e||59===e?1:0,consumeUntilSemicolonIncluded:e=>59===e?2:0,createList:()=>new Xn,createSingleNodeList:e=>(new Xn).appendData(e),getFirstListNode:e=>e&&e.first,getLastListNode:e=>e&&e.last,parseWithFallback(e,t){const n=this.tokenIndex
try{return e.call(this)}catch(e){if(i)throw e
this.skip(n-this.tokenIndex)
const r=t.call(this)
return i=!0,s(e,r),i=!1,r}},lookupNonWSType(e){let t
do{if(t=this.lookupType(e++),t!==Zt&&t!==un)return t}while(0!==t)
return 0},charCodeAt:e=>e>=0&&e<t.length?t.charCodeAt(e):0,substring:(e,n)=>t.substring(e,n),substrToCursor(e){return this.source.substring(e,this.tokenStart)},cmpChar:(e,n)=>En(t,e,n),cmpStr:(e,n,r)=>On(t,e,n,r),consume(e){const t=this.tokenStart
return this.eat(e),this.substrToCursor(t)},consumeFunctionName(){const e=t.substring(this.tokenStart,this.tokenEnd-1)
return this.eat(2),e},consumeNumber(e){const n=t.substring(this.tokenStart,Mn(t,this.tokenStart))
return this.eat(e),n},eat(e){if(this.tokenType!==e){const t=Rn[e].slice(0,-6).replace(/-/g," ").replace(/^./,e=>e.toUpperCase())
let n=`${/[[\](){}]/.test(t)?`"${t}"`:t} is expected`,r=this.tokenStart
switch(e){case 1:2===this.tokenType||7===this.tokenType?(r=this.tokenEnd-1,n="Identifier is expected but function found"):n="Identifier is expected"
break
case 4:this.isDelim(35)&&(this.next(),r++,n="Name is expected")
break
case Qt:this.tokenType===Ht&&(r=this.tokenEnd,n="Percent sign is expected")}this.error(n,r)}this.next()},eatIdent(e){1===this.tokenType&&!1!==this.lookupValue(0,e)||this.error(`Identifier "${e}" is expected`),this.next()},eatDelim(e){this.isDelim(e)||this.error(`Delim "${String.fromCharCode(e)}" is expected`),this.next()},getLocation:(e,t)=>r?o.getLocationRange(e,t,n):null,getLocationFromList(e){if(r){const t=this.getFirstListNode(e),r=this.getLastListNode(e)
return o.getLocationRange(null!==t?t.loc.start.offset-o.startOffset:this.tokenStart,null!==r?r.loc.end.offset-o.startOffset:this.tokenStart,n)}return null},error(e,n){const r=void 0!==n&&n<t.length?o.getLocation(n):this.eof?o.getLocation(function(e,t){for(;t>=0&&bn(e.charCodeAt(t));t--);return t+1}(t,t.length-1)):o.getLocation(this.tokenStart)
throw new Zn(e||"Unexpected input",t,r.offset,r.line,r.column,o.startLine,o.startColumn)}})
return Object.assign(function(e,l){t=e,l=l||{},a.setSource(t,$n),o.setSource(t,l.offset,l.line,l.column),n=l.filename||"<unknown>",r=Boolean(l.positions),s="function"==typeof l.onParseError?l.onParseError:er,i=!1,a.parseAtrulePrelude=!("parseAtrulePrelude"in l)||Boolean(l.parseAtrulePrelude),a.parseRulePrelude=!("parseRulePrelude"in l)||Boolean(l.parseRulePrelude),a.parseValue=!("parseValue"in l)||Boolean(l.parseValue),a.parseCustomProperty="parseCustomProperty"in l&&Boolean(l.parseCustomProperty)
const{context:c="default",onComment:u}=l
if(c in a.context==!1)throw new Error("Unknown context `"+c+"`")
"function"==typeof u&&a.forEachToken((e,n,r)=>{if(e===un){const e=a.getLocation(n,r),s=On(t,r-2,r,"*/")?t.slice(n+2,r-2):t.slice(n+2,r)
u(s,e)}})
const h=a.context[c].call(a,l)
return a.eof||a.error(),h},{SyntaxError:Zn,config:a.config})}var sr={},ir={},or="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("")
ir.encode=function(e){if(0<=e&&e<or.length)return or[e]
throw new TypeError("Must be between 0 and 63: "+e)},ir.decode=function(e){return 65<=e&&e<=90?e-65:97<=e&&e<=122?e-97+26:48<=e&&e<=57?e-48+52:43==e?62:47==e?63:-1}
var ar=ir
sr.encode=function(e){var t,n="",r=function(e){return e<0?1+(-e<<1):0+(e<<1)}(e)
do{t=31&r,(r>>>=5)>0&&(t|=32),n+=ar.encode(t)}while(r>0)
return n},sr.decode=function(e,t,n){var r,s,i,o,a=e.length,l=0,c=0
do{if(t>=a)throw new Error("Expected more digits in base 64 VLQ value.")
if(-1===(s=ar.decode(e.charCodeAt(t++))))throw new Error("Invalid base64 digit: "+e.charAt(t-1))
r=!!(32&s),l+=(s&=31)<<c,c+=5}while(r)
n.value=(o=(i=l)>>1,1&~i?o:-o),n.rest=t}
var lr={}
!function(e){e.getArg=function(e,t,n){if(t in e)return e[t]
if(3===arguments.length)return n
throw new Error('"'+t+'" is a required argument.')}
var t=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/,n=/^data:.+\,.+$/
function r(e){var n=e.match(t)
return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function s(e){var t=""
return e.scheme&&(t+=e.scheme+":"),t+="//",e.auth&&(t+=e.auth+"@"),e.host&&(t+=e.host),e.port&&(t+=":"+e.port),e.path&&(t+=e.path),t}e.urlParse=r,e.urlGenerate=s
var i,o,a=(i=function(t){var n=t,i=r(t)
if(i){if(!i.path)return t
n=i.path}for(var o=e.isAbsolute(n),a=[],l=0,c=0;;){if(l=c,-1===(c=n.indexOf("/",l))){a.push(n.slice(l))
break}for(a.push(n.slice(l,c));c<n.length&&"/"===n[c];)c++}var u,h=0
for(c=a.length-1;c>=0;c--)"."===(u=a[c])?a.splice(c,1):".."===u?h++:h>0&&(""===u?(a.splice(c+1,h),h=0):(a.splice(c,2),h--))
return""===(n=a.join("/"))&&(n=o?"/":"."),i?(i.path=n,s(i)):n},o=[],function(e){for(var t=0;t<o.length;t++)if(o[t].input===e){var n=o[0]
return o[0]=o[t],o[t]=n,o[0].result}var r=i(e)
return o.unshift({input:e,result:r}),o.length>32&&o.pop(),r})
function l(e,t){""===e&&(e="."),""===t&&(t=".")
var i=r(t),o=r(e)
if(o&&(e=o.path||"/"),i&&!i.scheme)return o&&(i.scheme=o.scheme),s(i)
if(i||t.match(n))return t
if(o&&!o.host&&!o.path)return o.host=t,s(o)
var l="/"===t.charAt(0)?t:a(e.replace(/\/+$/,"")+"/"+t)
return o?(o.path=l,s(o)):l}e.normalize=a,e.join=l,e.isAbsolute=function(e){return"/"===e.charAt(0)||t.test(e)},e.relative=function(e,t){""===e&&(e="."),e=e.replace(/\/$/,"")
for(var n=0;0!==t.indexOf(e+"/");){var r=e.lastIndexOf("/")
if(r<0)return t
if((e=e.slice(0,r)).match(/^([^\/]+:\/)?\/*$/))return t;++n}return Array(n+1).join("../")+t.substr(e.length+1)}
var c=!("__proto__"in Object.create(null))
function u(e){return e}function h(e){if(!e)return!1
var t=e.length
if(t<9)return!1
if(95!==e.charCodeAt(t-1)||95!==e.charCodeAt(t-2)||111!==e.charCodeAt(t-3)||116!==e.charCodeAt(t-4)||111!==e.charCodeAt(t-5)||114!==e.charCodeAt(t-6)||112!==e.charCodeAt(t-7)||95!==e.charCodeAt(t-8)||95!==e.charCodeAt(t-9))return!1
for(var n=t-10;n>=0;n--)if(36!==e.charCodeAt(n))return!1
return!0}function f(e,t){return e===t?0:null===e?1:null===t?-1:e>t?1:-1}e.toSetString=c?u:function(e){return h(e)?"$"+e:e},e.fromSetString=c?u:function(e){return h(e)?e.slice(1):e},e.compareByOriginalPositions=function(e,t,n){var r=f(e.source,t.source)
return 0!==r||0!==(r=e.originalLine-t.originalLine)||0!==(r=e.originalColumn-t.originalColumn)||n||0!==(r=e.generatedColumn-t.generatedColumn)||0!==(r=e.generatedLine-t.generatedLine)?r:f(e.name,t.name)},e.compareByOriginalPositionsNoSource=function(e,t,n){var r
return 0!==(r=e.originalLine-t.originalLine)||0!==(r=e.originalColumn-t.originalColumn)||n||0!==(r=e.generatedColumn-t.generatedColumn)||0!==(r=e.generatedLine-t.generatedLine)?r:f(e.name,t.name)},e.compareByGeneratedPositionsDeflated=function(e,t,n){var r=e.generatedLine-t.generatedLine
return 0!==r||0!==(r=e.generatedColumn-t.generatedColumn)||n||0!==(r=f(e.source,t.source))||0!==(r=e.originalLine-t.originalLine)||0!==(r=e.originalColumn-t.originalColumn)?r:f(e.name,t.name)},e.compareByGeneratedPositionsDeflatedNoLine=function(e,t,n){var r=e.generatedColumn-t.generatedColumn
return 0!==r||n||0!==(r=f(e.source,t.source))||0!==(r=e.originalLine-t.originalLine)||0!==(r=e.originalColumn-t.originalColumn)?r:f(e.name,t.name)},e.compareByGeneratedPositionsInflated=function(e,t){var n=e.generatedLine-t.generatedLine
return 0!==n||0!==(n=e.generatedColumn-t.generatedColumn)||0!==(n=f(e.source,t.source))||0!==(n=e.originalLine-t.originalLine)||0!==(n=e.originalColumn-t.originalColumn)?n:f(e.name,t.name)},e.parseSourceMapInput=function(e){return JSON.parse(e.replace(/^\)]}'[^\n]*\n/,""))},e.computeSourceURL=function(e,t,n){if(t=t||"",e&&("/"!==e[e.length-1]&&"/"!==t[0]&&(e+="/"),t=e+t),n){var i=r(n)
if(!i)throw new Error("sourceMapURL could not be parsed")
if(i.path){var o=i.path.lastIndexOf("/")
o>=0&&(i.path=i.path.substring(0,o+1))}t=l(s(i),t)}return a(t)}}(lr)
var cr={},ur=lr,hr=Object.prototype.hasOwnProperty,fr="undefined"!=typeof Map
function pr(){this._array=[],this._set=fr?new Map:Object.create(null)}pr.fromArray=function(e,t){for(var n=new pr,r=0,s=e.length;r<s;r++)n.add(e[r],t)
return n},pr.prototype.size=function(){return fr?this._set.size:Object.getOwnPropertyNames(this._set).length},pr.prototype.add=function(e,t){var n=fr?e:ur.toSetString(e),r=fr?this.has(e):hr.call(this._set,n),s=this._array.length
r&&!t||this._array.push(e),r||(fr?this._set.set(e,s):this._set[n]=s)},pr.prototype.has=function(e){if(fr)return this._set.has(e)
var t=ur.toSetString(e)
return hr.call(this._set,t)},pr.prototype.indexOf=function(e){if(fr){var t=this._set.get(e)
if(t>=0)return t}else{var n=ur.toSetString(e)
if(hr.call(this._set,n))return this._set[n]}throw new Error('"'+e+'" is not in the set.')},pr.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e]
throw new Error("No element indexed by "+e)},pr.prototype.toArray=function(){return this._array.slice()},cr.ArraySet=pr
var dr={},mr=lr
function gr(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}gr.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)},gr.prototype.add=function(e){var t,n,r,s,i,o
t=this._last,n=e,r=t.generatedLine,s=n.generatedLine,i=t.generatedColumn,o=n.generatedColumn,s>r||s==r&&o>=i||mr.compareByGeneratedPositionsInflated(t,n)<=0?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))},gr.prototype.toArray=function(){return this._sorted||(this._array.sort(mr.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},dr.MappingList=gr
var yr=sr,br=lr,kr=cr.ArraySet,vr=dr.MappingList
function Sr(e){e||(e={}),this._file=br.getArg(e,"file",null),this._sourceRoot=br.getArg(e,"sourceRoot",null),this._skipValidation=br.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=br.getArg(e,"ignoreInvalidMapping",!1),this._sources=new kr,this._names=new kr,this._mappings=new vr,this._sourcesContents=null}Sr.prototype._version=3,Sr.fromSourceMap=function(e,t){var n=e.sourceRoot,r=new Sr(Object.assign(t||{},{file:e.file,sourceRoot:n}))
return e.eachMapping(function(e){var t={generated:{line:e.generatedLine,column:e.generatedColumn}}
null!=e.source&&(t.source=e.source,null!=n&&(t.source=br.relative(n,t.source)),t.original={line:e.originalLine,column:e.originalColumn},null!=e.name&&(t.name=e.name)),r.addMapping(t)}),e.sources.forEach(function(t){var s=t
null!==n&&(s=br.relative(n,t)),r._sources.has(s)||r._sources.add(s)
var i=e.sourceContentFor(t)
null!=i&&r.setSourceContent(t,i)}),r},Sr.prototype.addMapping=function(e){var t=br.getArg(e,"generated"),n=br.getArg(e,"original",null),r=br.getArg(e,"source",null),s=br.getArg(e,"name",null);(this._skipValidation||!1!==this._validateMapping(t,n,r,s))&&(null!=r&&(r=String(r),this._sources.has(r)||this._sources.add(r)),null!=s&&(s=String(s),this._names.has(s)||this._names.add(s)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:null!=n&&n.line,originalColumn:null!=n&&n.column,source:r,name:s}))},Sr.prototype.setSourceContent=function(e,t){var n=e
null!=this._sourceRoot&&(n=br.relative(this._sourceRoot,n)),null!=t?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[br.toSetString(n)]=t):this._sourcesContents&&(delete this._sourcesContents[br.toSetString(n)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))},Sr.prototype.applySourceMap=function(e,t,n){var r=t
if(null==t){if(null==e.file)throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.')
r=e.file}var s=this._sourceRoot
null!=s&&(r=br.relative(s,r))
var i=new kr,o=new kr
this._mappings.unsortedForEach(function(t){if(t.source===r&&null!=t.originalLine){var a=e.originalPositionFor({line:t.originalLine,column:t.originalColumn})
null!=a.source&&(t.source=a.source,null!=n&&(t.source=br.join(n,t.source)),null!=s&&(t.source=br.relative(s,t.source)),t.originalLine=a.line,t.originalColumn=a.column,null!=a.name&&(t.name=a.name))}var l=t.source
null==l||i.has(l)||i.add(l)
var c=t.name
null==c||o.has(c)||o.add(c)},this),this._sources=i,this._names=o,e.sources.forEach(function(t){var r=e.sourceContentFor(t)
null!=r&&(null!=n&&(t=br.join(n,t)),null!=s&&(t=br.relative(s,t)),this.setSourceContent(t,r))},this)},Sr.prototype._validateMapping=function(e,t,n,r){if(t&&"number"!=typeof t.line&&"number"!=typeof t.column){var s="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
if(this._ignoreInvalidMapping)return"undefined"!=typeof console&&console.warn&&console.warn(s),!1
throw new Error(s)}if((!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0)||t||n||r)&&!(e&&"line"in e&&"column"in e&&t&&"line"in t&&"column"in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&n)){s="Invalid mapping: "+JSON.stringify({generated:e,source:n,original:t,name:r})
if(this._ignoreInvalidMapping)return"undefined"!=typeof console&&console.warn&&console.warn(s),!1
throw new Error(s)}},Sr.prototype._serializeMappings=function(){for(var e,t,n,r,s=0,i=1,o=0,a=0,l=0,c=0,u="",h=this._mappings.toArray(),f=0,p=h.length;f<p;f++){if(e="",(t=h[f]).generatedLine!==i)for(s=0;t.generatedLine!==i;)e+=";",i++
else if(f>0){if(!br.compareByGeneratedPositionsInflated(t,h[f-1]))continue
e+=","}e+=yr.encode(t.generatedColumn-s),s=t.generatedColumn,null!=t.source&&(r=this._sources.indexOf(t.source),e+=yr.encode(r-c),c=r,e+=yr.encode(t.originalLine-1-a),a=t.originalLine-1,e+=yr.encode(t.originalColumn-o),o=t.originalColumn,null!=t.name&&(n=this._names.indexOf(t.name),e+=yr.encode(n-l),l=n)),u+=e}return u},Sr.prototype._generateSourcesContent=function(e,t){return e.map(function(e){if(!this._sourcesContents)return null
null!=t&&(e=br.relative(t,e))
var n=br.toSetString(e)
return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)},Sr.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()}
return null!=this._file&&(e.file=this._file),null!=this._sourceRoot&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e},Sr.prototype.toString=function(){return JSON.stringify(this.toJSON())}
var wr=Sr
const xr=new Set(["Atrule","Selector","Declaration"])
const Cr=(e,t)=>{if(9===e&&(e=t),"string"==typeof e){const t=e.charCodeAt(0)
return t>0x7F?0x8000:t<<8}return e},Ar=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,Ht],[1,Qt],[1,Kt],[1,Jt],[1,on],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,Ht],[3,Qt],[3,Kt],[3,Jt],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,Ht],[4,Qt],[4,Kt],[4,Jt],[Kt,1],[Kt,2],[Kt,7],[Kt,8],[Kt,"-"],[Kt,Ht],[Kt,Qt],[Kt,Kt],[Kt,Jt],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",Ht],["#",Qt],["#",Kt],["#",Jt],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",Ht],["-",Qt],["-",Kt],["-",Jt],[Ht,1],[Ht,2],[Ht,7],[Ht,8],[Ht,Ht],[Ht,Qt],[Ht,Kt],[Ht,"%"],[Ht,Jt],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",Jt],[".",Ht],[".",Qt],[".",Kt],["+",Ht],["+",Qt],["+",Kt],["/","*"]],_r=Ar.concat([[1,4],[Kt,4],[4,4],[3,on],[3,5],[3,en],[Qt,Qt],[Qt,Kt],[Qt,2],[Qt,"-"],[an,1],[an,2],[an,Qt],[an,Kt],[an,4],[an,"-"]])
function Tr(e){const t=new Set(e.map(([e,t])=>Cr(e)<<16|Cr(t)))
return function(e,n,r){const s=Cr(n,r),i=r.charCodeAt(0)
return(45===i&&1!==n&&2!==n&&n!==Jt||43===i?t.has(e<<16|i<<8):t.has(e<<16|s))&&this.emit(" ",Zt,!0),s}}const Er=Tr(Ar),Or=Tr(_r)
var Pr=Object.freeze({__proto__:null,safe:Or,spec:Er})
function Lr(e,t){if("function"==typeof t){let n=null
return e.children.forEach(e=>{null!==n&&t.call(this,n),this.node(e),n=e}),void 0}e.children.forEach(this.node,this)}function Nr(e){$n(e,(t,n,r)=>{this.token(t,e.slice(n,r))})}function Dr(e){const t=new Map
for(let[n,r]of Object.entries(e.node)){"function"==typeof(r.generate||r)&&t.set(n,r.generate||r)}return function(e,n){let r="",s=0,i={node(e){if(!t.has(e.type))throw new Error("Unknown node type: "+e.type)
t.get(e.type).call(o,e)},tokenBefore:Or,token(e,t){s=this.tokenBefore(s,e,t),this.emit(t,e,!1),9===e&&92===t.charCodeAt(0)&&this.emit("\n",Zt,!0)},emit(e){r+=e},result:()=>r}
n&&("function"==typeof n.decorator&&(i=n.decorator(i)),n.sourceMap&&(i=function(e){const t=new wr,n={line:1,column:0},r={line:0,column:0},s={line:1,column:0},i={generated:s}
let o=1,a=0,l=!1
const c=e.node
e.node=function(e){if(e.loc&&e.loc.start&&xr.has(e.type)){const c=e.loc.start.line,u=e.loc.start.column-1
r.line===c&&r.column===u||(r.line=c,r.column=u,n.line=o,n.column=a,l&&(l=!1,n.line===s.line&&n.column===s.column||t.addMapping(i)),l=!0,t.addMapping({source:e.loc.source,original:r,generated:n}))}c.call(this,e),l&&xr.has(e.type)&&(s.line=o,s.column=a)}
const u=e.emit
e.emit=function(e,t,n){for(let t=0;t<e.length;t++)10===e.charCodeAt(t)?(o++,a=0):a++
u(e,t,n)}
const h=e.result
return e.result=function(){return l&&t.addMapping(i),{css:h(),map:t}},e}(i)),n.mode in Pr&&(i.tokenBefore=Pr[n.mode]))
const o={node:e=>i.node(e),children:Lr,token:(e,t)=>i.token(e,t),tokenize:Nr}
return i.node(e),i.result()}}const{hasOwnProperty:Mr}=Object.prototype,jr=function(){}
function Ir(e){return"function"==typeof e?e:jr}function Rr(e,t){return function(n,r,s){n.type===t&&e.call(this,n,r,s)}}function Fr(e,t){const n=t.structure,r=[]
for(const e in n){if(!1===Mr.call(n,e))continue
let t=n[e]
const s={name:e,type:!1,nullable:!1}
Array.isArray(t)||(t=[t])
for(const e of t)null===e?s.nullable=!0:"string"==typeof e?s.type="node":Array.isArray(e)&&(s.type="list")
s.type&&r.push(s)}return r.length?{context:t.walkContext,fields:r}:null}function zr(e,t){const n=e.fields.slice(),r=e.context,s="string"==typeof r
return t&&n.reverse(),function(e,i,o,a){let l
s&&(l=i[r],i[r]=e)
for(const r of n){const n=e[r.name]
if(!r.nullable||n)if("list"===r.type){if(t?n.reduceRight(a,!1):n.reduce(a,!1))return!0}else if(o(n))return!0}s&&(i[r]=l)}}function Gr({StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:s}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Rule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Declaration:{StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:s}}}function Br(e){const t=function(e){const t={}
for(const n in e.node)if(Mr.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=Fr(0,r)}return t}(e),n={},r={},s=Symbol("break-walk"),i=Symbol("skip-node")
for(const e in t)Mr.call(t,e)&&null!==t[e]&&(n[e]=zr(t[e],!1),r[e]=zr(t[e],!0))
const o=Gr(n),a=Gr(r),l=function(e,l){function c(e,t,n){const r=u.call(d,e,t,n)
return r===s||r!==i&&(!(!f.hasOwnProperty(e.type)||!f[e.type](e,d,c,p))||h.call(d,e,t,n)===s)}let u=jr,h=jr,f=n,p=(e,t,n,r)=>e||c(t,n,r)
const d={break:s,skip:i,root:e,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null}
if("function"==typeof l)u=l
else if(l&&(u=Ir(l.enter),h=Ir(l.leave),l.reverse&&(f=r),l.visit)){if(o.hasOwnProperty(l.visit))f=l.reverse?a[l.visit]:o[l.visit]
else if(!t.hasOwnProperty(l.visit))throw new Error("Bad value `"+l.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")")
u=Rr(u,l.visit),h=Rr(h,l.visit)}if(u===jr&&h===jr)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
c(e)}
return l.break=s,l.skip=i,l.find=function(e,t){let n=null
return l(e,function(e,r,i){if(t.call(this,e,r,i))return n=e,s}),n},l.findLast=function(e,t){let n=null
return l(e,{reverse:!0,enter(e,r,i){if(t.call(this,e,r,i))return n=e,s}}),n},l.findAll=function(e,t){const n=[]
return l(e,function(e,r,s){t.call(this,e,r,s)&&n.push(e)}),n},l}function Ur(e){return e}function qr(e,t,n,r){let s
switch(e.type){case"Group":s=function(e,t,n,r){const s=" "===e.combinator||r?e.combinator:" "+e.combinator+" ",i=e.terms.map(e=>qr(e,t,n,r)).join(s)
return e.explicit||n?(r||","===i[0]?"[":"[ ")+i+(r?"]":" ]"):i}(e,t,n,r)+(e.disallowEmpty?"!":"")
break
case"Multiplier":return qr(e.term,t,n,r)+t(function(e){const{min:t,max:n,comma:r}=e
return 0===t&&0===n?r?"#?":"*":0===t&&1===n?"?":1===t&&0===n?r?"#":"+":1===t&&1===n?"":(r?"#":"")+(t===n?"{"+t+"}":"{"+t+","+(0!==n?n:"")+"}")}(e),e)
case"Boolean":s="<boolean-expr["+qr(e.term,t,n,r)+"]>"
break
case"Type":s="<"+e.name+(e.opts?t(function(e){if("Range"===e.type)return" ["+(null===e.min?"-∞":e.min)+","+(null===e.max?"∞":e.max)+"]"
throw new Error("Unknown node type `"+e.type+"`")}(e.opts),e.opts):"")+">"
break
case"Property":s="<'"+e.name+"'>"
break
case"Keyword":s=e.name
break
case"AtKeyword":s="@"+e.name
break
case"Function":s=e.name+"("
break
case"String":case"Token":s=e.value
break
case"Comma":s=","
break
default:throw new Error("Unknown node type `"+e.type+"`")}return t(s,e)}function Wr(e,t){let n=Ur,r=!1,s=!1
return"function"==typeof t?n=t:t&&(r=Boolean(t.forceBraces),s=Boolean(t.compact),"function"==typeof t.decorate&&(n=t.decorate)),qr(e,n,r,s)}const Vr={offset:0,line:1,column:1}
function $r(e,t){const n=e&&e.loc&&e.loc[t]
return n?"line"in n?Yr(n):n:null}function Yr({offset:e,line:t,column:n},r){const s={offset:e,line:t,column:n}
if(r){const e=r.split(/\n|\r\n?|\f/)
s.offset+=r.length,s.line+=e.length-1,s.column=1===e.length?s.column+r.length:e.pop().length+1}return s}const Xr=function(e,t){const n=Hn("SyntaxReferenceError",e+(t?" `"+t+"`":""))
return n.reference=t,n},Hr=function(e,t,n,r){const s=Hn("SyntaxMatchError",e),{css:i,mismatchOffset:o,mismatchLength:a,start:l,end:c}=function(e,t){const n=e.tokens,r=e.longestMatch,s=r<n.length&&n[r].node||null,i=s!==t?s:null
let o,a,l=0,c=0,u=0,h=""
for(let e=0;e<n.length;e++){const t=n[e].value
e===r&&(c=t.length,l=h.length),null!==i&&n[e].node===i&&(e<=r?u++:u=0),h+=t}return r===n.length||u>1?(o=$r(i||t,"end")||Yr(Vr,h),a=Yr(o)):(o=$r(i,"start")||Yr($r(t,"start")||Vr,h.slice(0,l)),a=$r(i,"end")||Yr(o,h.substr(l,c))),{css:h,mismatchOffset:l,mismatchLength:c,start:o,end:a}}(r,n)
return s.rawMessage=e,s.syntax=t?Wr(t):"<generic>",s.css=i,s.mismatchOffset=o,s.mismatchLength=a,s.message=e+"\n  syntax: "+s.syntax+"\n   value: "+(i||"<empty string>")+"\n  --------"+new Array(s.mismatchOffset+1).join("-")+"^",Object.assign(s,l),s.loc={source:n&&n.loc&&n.loc.source||"<unknown>",start:l,end:c},s},Qr=new Map,Kr=new Map,Zr=function(e){if(Qr.has(e))return Qr.get(e)
const t=e.toLowerCase()
let n=Qr.get(t)
if(void 0===n){const e=es(t,0),r=e?"":ts(t,0)
n=Object.freeze({basename:t.substr(r.length),name:t,prefix:r,vendor:r,custom:e})}return Qr.set(e,n),n},Jr=function(e){if(Kr.has(e))return Kr.get(e)
let t=e,n=e[0]
"/"===n?n="/"===e[1]?"//":"/":"_"!==n&&"*"!==n&&"$"!==n&&"#"!==n&&"+"!==n&&"&"!==n&&(n="")
const r=es(t,n.length)
if(!r&&(t=t.toLowerCase(),Kr.has(t))){const n=Kr.get(t)
return Kr.set(e,n),n}const s=r?"":ts(t,n.length),i=t.substr(0,n.length+s.length),o=Object.freeze({basename:t.substr(i.length),name:t.substr(n.length),hack:n,vendor:s,prefix:i,custom:r})
return Kr.set(e,o),o}
function es(e,t){return t=t||0,e.length-t>=2&&45===e.charCodeAt(t)&&45===e.charCodeAt(t+1)}function ts(e,t){if(t=t||0,e.length-t>=3&&45===e.charCodeAt(t)&&45!==e.charCodeAt(t+1)){const n=e.indexOf("-",t+2)
if(-1!==n)return e.substring(t,n+1)}return""}const ns=["initial","inherit","unset","revert","revert-layer"],rs=0x002D,ss=!0
function is(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function os(e,t,n){for(;null!==e&&(e.type===Zt||e.type===un);)e=n(++t)
return t}function as(e,t,n,r){if(!e)return 0
const s=e.value.charCodeAt(t)
if(43===s||s===rs){if(n)return 0
t++}for(;t<e.value.length;t++)if(!hn(e.value.charCodeAt(t)))return 0
return r+1}function ls(e,t,n){let r=!1,s=os(e,t,n)
if(null===(e=n(s)))return t
if(e.type!==Ht){if(!is(e,43)&&!is(e,rs))return t
if(r=!0,s=os(n(++s),s,n),null===(e=n(s))||e.type!==Ht)return 0}if(!r){const t=e.value.charCodeAt(0)
if(43!==t&&t!==rs)return 0}return as(e,r?0:1,r,s)}function cs(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function us(e,t,n){let r=0
for(let s=t;s<e.value.length;s++){const i=e.value.charCodeAt(s)
if(45===i&&n&&0!==r)return us(e,t+r+1,!1),6
if(!fn(i))return 0
if(++r>6)return 0}return r}function hs(e,t,n){if(!e)return 0
for(;cs(n(t),63);){if(++e>6)return 0
t++}return t}const fs=["calc(","-moz-calc(","-webkit-calc("],ps=new Map([[2,an],[on,an],[rn,sn],[ln,cn]])
function ds(e,t){return t<e.length?e.charCodeAt(t):0}function ms(e,t){return On(e,0,e.length,t)}function gs(e,t){for(let n=0;n<t.length;n++)if(ms(e,t[n]))return!0
return!1}function ys(e,t){return t===e.length-2&&(0x005C===ds(e,t)&&hn(ds(e,t+1)))}function bs(e,t,n){if(e&&"Range"===e.type){const r=Number(void 0!==n&&n!==t.length?t.substr(0,n):t)
if(isNaN(r))return!0
if(null!==e.min&&r<e.min&&"string"!=typeof e.min)return!0
if(null!==e.max&&r>e.max&&"string"!=typeof e.max)return!0}return!1}function ks(e){return function(t,n,r){return null===t?0:2===t.type&&gs(t.value,fs)?function(e,t){let n=0,r=[],s=0
e:do{switch(e.type){case cn:case an:case sn:if(e.type!==n)break e
if(n=r.pop(),0===r.length){s++
break e}break
case 2:case on:case rn:case ln:r.push(n),n=ps.get(e.type)}s++}while(e=t(s))
return s}(t,n):e(t,n,r)}}function vs(e){return function(t){return null===t||t.type!==e?0:1}}function Ss(e){return null===e||1!==e.type||0x002D!==ds(e.value,0)||0x002D!==ds(e.value,1)?0:1}function ws(e){return e&&(e=new Set(e)),function(t,n,r){if(null===t||t.type!==Kt)return 0
const s=Mn(t.value,0)
if(null!==e){const n=t.value.indexOf("\\",s),r=-1!==n&&ys(t.value,n)?t.value.substring(s,n):t.value.substr(s)
if(!1===e.has(r.toLowerCase()))return 0}return bs(r,t.value,s)?0:1}}function xs(e){return"function"!=typeof e&&(e=function(){return 0}),function(t,n,r){return null!==t&&t.type===Ht&&0===Number(t.value)?1:e(t,n,r)}}const Cs={"ident-token":vs(1),"function-token":vs(2),"at-keyword-token":vs(3),"hash-token":vs(4),"string-token":vs(5),"bad-string-token":vs(6),"url-token":vs(7),"bad-url-token":vs(8),"delim-token":vs(9),"number-token":vs(Ht),"percentage-token":vs(Qt),"dimension-token":vs(Kt),"whitespace-token":vs(Zt),"CDO-token":vs(14),"CDC-token":vs(Jt),"colon-token":vs(en),"semicolon-token":vs(tn),"comma-token":vs(nn),"[-token":vs(rn),"]-token":vs(sn),"(-token":vs(on),")-token":vs(an),"{-token":vs(ln),"}-token":vs(cn)},As={string:vs(5),ident:vs(1),percentage:ks(function(e,t,n){return null===e||e.type!==Qt||bs(n,e.value,e.value.length-1)?0:1}),zero:xs(),number:ks(function(e,t,n){if(null===e)return 0
const r=Mn(e.value,0)
return r===e.value.length||ys(e.value,r)?bs(n,e.value,r)?0:1:0}),integer:ks(function(e,t,n){if(null===e||e.type!==Ht)return 0
let r=0x002B===ds(e.value,0)||0x002D===ds(e.value,0)?1:0
for(;r<e.value.length;r++)if(!hn(ds(e.value,r)))return 0
return bs(n,e.value,r)?0:1}),"custom-ident":function(e){if(null===e||1!==e.type)return 0
const t=e.value.toLowerCase()
return gs(t,ns)||ms(t,"default")?0:1},"dashed-ident":Ss,"custom-property-name":function(e){return Ss(e)?"--"===e.value?0:1:0},"hex-color":function(e){if(null===e||4!==e.type)return 0
const t=e.value.length
if(4!==t&&5!==t&&7!==t&&9!==t)return 0
for(let n=1;n<t;n++)if(!fn(ds(e.value,n)))return 0
return 1},"id-selector":function(e){return null===e||4!==e.type?0:vn(ds(e.value,1),ds(e.value,2),ds(e.value,3))?1:0},"an-plus-b":function(e,t){let n=0
if(!e)return 0
if(e.type===Ht)return as(e,0,false,n)
if(1===e.type&&e.value.charCodeAt(0)===rs){if(!En(e.value,1,110))return 0
switch(e.value.length){case 2:return ls(t(++n),n,t)
case 3:return e.value.charCodeAt(2)!==rs?0:(n=os(t(++n),n,t),as(e=t(n),0,ss,n))
default:return e.value.charCodeAt(2)!==rs?0:as(e,3,ss,n)}}else if(1===e.type||is(e,43)&&1===t(n+1).type){if(1!==e.type&&(e=t(++n)),null===e||!En(e.value,0,110))return 0
switch(e.value.length){case 1:return ls(t(++n),n,t)
case 2:return e.value.charCodeAt(1)!==rs?0:(n=os(t(++n),n,t),as(e=t(n),0,ss,n))
default:return e.value.charCodeAt(1)!==rs?0:as(e,2,ss,n)}}else if(e.type===Kt){let r=e.value.charCodeAt(0),s=43===r||r===rs?1:0,i=s
for(;i<e.value.length&&hn(e.value.charCodeAt(i));i++);return i===s?0:En(e.value,i,110)?i+1===e.value.length?ls(t(++n),n,t):e.value.charCodeAt(i+1)!==rs?0:i+2===e.value.length?(n=os(t(++n),n,t),as(e=t(n),0,ss,n)):as(e,i+2,ss,n):0}return 0},urange:function(e,t){let n=0
if(null===e||1!==e.type||!En(e.value,0,117))return 0
if(null===(e=t(++n)))return 0
if(cs(e,43))return null===(e=t(++n))?0:1===e.type?hs(us(e,0,!0),++n,t):cs(e,63)?hs(1,++n,t):0
if(e.type===Ht){const r=us(e,1,!0)
return 0===r?0:null===(e=t(++n))?n:e.type===Kt||e.type===Ht?function(e,t){return e.value.charCodeAt(0)===t}(e,45)&&us(e,1,!1)?n+1:0:hs(r,n,t)}return e.type===Kt?hs(us(e,1,!0),++n,t):0},"declaration-value":function(e,t){if(!e)return 0
let n=0,r=[],s=0
e:do{switch(e.type){case 6:case 8:break e
case cn:case an:case sn:if(e.type!==n)break e
n=r.pop()
break
case tn:if(0===n)break e
break
case 9:if(0===n&&"!"===e.value)break e
break
case 2:case on:case rn:case ln:r.push(n),n=ps.get(e.type)}s++}while(e=t(s))
return s},"any-value":function(e,t){if(!e)return 0
let n=0,r=[],s=0
e:do{switch(e.type){case 6:case 8:break e
case cn:case an:case sn:if(e.type!==n)break e
n=r.pop()
break
case 2:case on:case rn:case ln:r.push(n),n=ps.get(e.type)}s++}while(e=t(s))
return s}}
function _s(e){const{angle:t,decibel:n,frequency:r,flex:s,length:i,resolution:o,semitones:a,time:l}=e||{}
return{dimension:ks(ws(null)),angle:ks(ws(t)),decibel:ks(ws(n)),frequency:ks(ws(r)),flex:ks(ws(s)),length:ks(xs(ws(i))),resolution:ks(ws(o)),semitones:ks(ws(a)),time:ks(ws(l))}}var Ts=Object.freeze({__proto__:null,angle:["deg","grad","rad","turn"],decibel:["db"],flex:["fr"],frequency:["hz","khz"],length:["cm","mm","q","in","pt","pc","px","em","rem","ex","rex","cap","rcap","ch","rch","ic","ric","lh","rlh","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax","cqw","cqh","cqi","cqb","cqmin","cqmax"],resolution:["dpi","dpcm","dppx","x"],semitones:["st"],time:["s","ms"]})
function Es(e,t,n){return Object.assign(Hn("SyntaxError",e),{input:t,offset:n,rawMessage:e,message:e+"\n  "+t+"\n--"+new Array((n||t.length)+1).join("-")+"^"})}const Os=new Uint8Array(128).map((e,t)=>/[a-zA-Z0-9\-]/.test(String.fromCharCode(t))?1:0)
class Ps{constructor(e){this.str=e,this.pos=0}charCodeAt(e){return e<this.str.length?this.str.charCodeAt(e):0}charCode(){return this.charCodeAt(this.pos)}isNameCharCode(e=this.charCode()){return e<128&&1===Os[e]}nextCharCode(){return this.charCodeAt(this.pos+1)}nextNonWsCode(e){return this.charCodeAt(this.findWsEnd(e))}skipWs(){this.pos=this.findWsEnd(this.pos)}findWsEnd(e){for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(13!==t&&10!==t&&12!==t&&32!==t&&9!==t)break}return e}substringToPos(e){return this.str.substring(this.pos,this.pos=e)}eat(e){this.charCode()!==e&&this.error("Expect `"+String.fromCharCode(e)+"`"),this.pos++}peek(){return this.pos<this.str.length?this.str.charAt(this.pos++):""}error(e){throw new Es(e,this.str,this.pos)}scanSpaces(){return this.substringToPos(this.findWsEnd(this.pos))}scanWord(){let e=this.pos
for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(t>=128||0===Os[t])break}return this.pos===e&&this.error("Expect a keyword"),this.substringToPos(e)}scanNumber(){let e=this.pos
for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(t<48||t>57)break}return this.pos===e&&this.error("Expect a number"),this.substringToPos(e)}scanString(){const e=this.str.indexOf("'",this.pos+1)
return-1===e&&(this.pos=this.str.length,this.error("Expect an apostrophe")),this.substringToPos(e+1)}}const Ls=123,Ns={" ":1,"&&":2,"||":3,"|":4}
function Ds(e){let t=null,n=null
return e.eat(Ls),e.skipWs(),t=e.scanNumber(e),e.skipWs(),44===e.charCode()?(e.pos++,e.skipWs(),125!==e.charCode()&&(n=e.scanNumber(e),e.skipWs())):n=t,e.eat(125),{min:Number(t),max:n?Number(n):0}}function Ms(e,t){const n=function(e){let t=null,n=!1
switch(e.charCode()){case 42:e.pos++,t={min:0,max:0}
break
case 43:e.pos++,t={min:1,max:0}
break
case 63:e.pos++,t={min:0,max:1}
break
case 35:e.pos++,n=!0,e.charCode()===Ls?t=Ds(e):63===e.charCode()?(e.pos++,t={min:0,max:0}):t={min:1,max:0}
break
case Ls:t=Ds(e)
break
default:return null}return{type:"Multiplier",comma:n,min:t.min,max:t.max,term:null}}(e)
return null!==n?(n.term=t,35===e.charCode()&&43===e.charCodeAt(e.pos-1)?Ms(e,n):n):t}function js(e){const t=e.peek()
return""===t?null:Ms(e,{type:"Token",value:t})}function Is(e){let t,n=null
if(e.eat(60),t=e.scanWord(),"boolean-expr"===t){e.eat(91)
const t=Fs(e,93)
return e.eat(93),e.eat(62),Ms(e,{type:"Boolean",term:1===t.terms.length?t.terms[0]:t})}return 40===e.charCode()&&41===e.nextCharCode()&&(e.pos+=2,t+="()"),91===e.charCodeAt(e.findWsEnd(e.pos))&&(e.skipWs(),n=function(e){let t=null,n=null,r=1
return e.eat(91),45===e.charCode()&&(e.peek(),r=-1),-1==r&&8734===e.charCode()?e.peek():(t=r*Number(e.scanNumber(e)),e.isNameCharCode()&&(t+=e.scanWord())),e.skipWs(),e.eat(44),e.skipWs(),8734===e.charCode()?e.peek():(r=1,45===e.charCode()&&(e.peek(),r=-1),n=r*Number(e.scanNumber(e)),e.isNameCharCode()&&(n+=e.scanWord())),e.eat(93),{type:"Range",min:t,max:n}}(e)),e.eat(62),Ms(e,{type:"Type",name:t,opts:n})}function Rs(e,t){function n(e,t){return{type:"Group",terms:e,combinator:t,disallowEmpty:!1,explicit:!1}}let r
for(t=Object.keys(t).sort((e,t)=>Ns[e]-Ns[t]);t.length>0;){r=t.shift()
let s=0,i=0
for(;s<e.length;s++){const t=e[s]
"Combinator"===t.type&&(t.value===r?(-1===i&&(i=s-1),e.splice(s,1),s--):(-1!==i&&s-i>1&&(e.splice(i,s-i,n(e.slice(i,s),r)),s=i+1),i=-1))}-1!==i&&t.length&&e.splice(i,s-i,n(e.slice(i,s),r))}return r}function Fs(e,t){const n=Object.create(null),r=[]
let s,i=null,o=e.pos
for(;e.charCode()!==t&&(s=zs(e,t));)"Spaces"!==s.type&&("Combinator"===s.type?(null!==i&&"Combinator"!==i.type||(e.pos=o,e.error("Unexpected combinator")),n[s.value]=!0):null!==i&&"Combinator"!==i.type&&(n[" "]=!0,r.push({type:"Combinator",value:" "})),r.push(s),i=s,o=e.pos)
return null!==i&&"Combinator"===i.type&&(e.pos-=o,e.error("Unexpected combinator")),{type:"Group",terms:r,combinator:Rs(r,n)||" ",disallowEmpty:!1,explicit:!1}}function zs(e,t){let n=e.charCode()
switch(n){case 93:break
case 91:return Ms(e,function(e,t){let n
return e.eat(91),n=Fs(e,t),e.eat(93),n.explicit=!0,33===e.charCode()&&(e.pos++,n.disallowEmpty=!0),n}(e,t))
case 60:return 39===e.nextCharCode()?function(e){let t
return e.eat(60),e.eat(39),t=e.scanWord(),e.eat(39),e.eat(62),Ms(e,{type:"Property",name:t})}(e):Is(e)
case 124:return{type:"Combinator",value:e.substringToPos(e.pos+(124===e.nextCharCode()?2:1))}
case 38:return e.pos++,e.eat(38),{type:"Combinator",value:"&&"}
case 44:return e.pos++,{type:"Comma"}
case 39:return Ms(e,{type:"String",value:e.scanString()})
case 32:case 9:case 10:case 13:case 12:return{type:"Spaces",value:e.scanSpaces()}
case 64:return n=e.nextCharCode(),e.isNameCharCode(n)?(e.pos++,{type:"AtKeyword",name:e.scanWord()}):js(e)
case 42:case 43:case 63:case 35:case 33:break
case Ls:if(n=e.nextCharCode(),n<48||n>57)return js(e)
break
default:return e.isNameCharCode(n)?function(e){const t=e.scanWord()
return 40===e.charCode()?(e.pos++,{type:"Function",name:t}):Ms(e,{type:"Keyword",name:t})}(e):js(e)}}function Gs(e){const t=new Ps(e),n=Fs(t)
return t.pos!==e.length&&t.error("Unexpected input"),1===n.terms.length&&"Group"===n.terms[0].type?n.terms[0]:n}const Bs=function(){}
function Us(e){return"function"==typeof e?e:Bs}const qs={decorator(e){const t=[]
let n=null
return{...e,node(t){const r=n
n=t,e.node.call(this,t),n=r},emit(e,r,s){t.push({type:r,value:e,node:s?null:n})},result:()=>t}}}
function Ws(e,t){return"string"==typeof e?function(e){const t=[]
return $n(e,(n,r,s)=>t.push({type:n,value:e.slice(r,s),node:null})),t}(e):t.generate(e,qs)}const Vs={type:"Match"},$s={type:"Mismatch"},Ys={type:"DisallowEmpty"}
function Xs(e,t,n){return t===Vs&&n===$s||e===Vs&&t===Vs&&n===Vs?e:("If"===e.type&&e.else===$s&&t===Vs&&(t=e.then,e=e.match),{type:"If",match:e,then:t,else:n})}function Hs(e){return e.length>2&&40===e.charCodeAt(e.length-2)&&41===e.charCodeAt(e.length-1)}function Qs(e){return"Keyword"===e.type||"AtKeyword"===e.type||"Function"===e.type||"Type"===e.type&&Hs(e.name)}function Ks(e,t=" ",n=!1){return{type:"Group",terms:e,combinator:t,disallowEmpty:!1,explicit:n}}function Zs(e,t,n=new Set){if(!n.has(e))switch(n.add(e),e.type){case"If":e.match=Zs(e.match,t,n),e.then=Zs(e.then,t,n),e.else=Zs(e.else,t,n)
break
case"Type":return t[e.name]||e}return e}function Js(e,t,n){switch(e){case" ":{let e=Vs
for(let n=t.length-1;n>=0;n--){e=Xs(t[n],e,$s)}return e}case"|":{let e=$s,n=null
for(let r=t.length-1;r>=0;r--){let s=t[r]
if(Qs(s)&&(null===n&&r>0&&Qs(t[r-1])&&(n=Object.create(null),e=Xs({type:"Enum",map:n},Vs,e)),null!==n)){const e=(Hs(s.name)?s.name.slice(0,-1):s.name).toLowerCase()
if(e in n==!1){n[e]=s
continue}}n=null,e=Xs(s,Vs,e)}return e}case"&&":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!0}
let n=$s
for(let r=t.length-1;r>=0;r--){const s=t[r]
let i
i=t.length>1?Js(e,t.filter(function(e){return e!==s}),!1):Vs,n=Xs(s,i,n)}return n}case"||":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!1}
let r=n?Vs:$s
for(let n=t.length-1;n>=0;n--){const s=t[n]
let i
i=t.length>1?Js(e,t.filter(function(e){return e!==s}),!0):Vs,r=Xs(s,i,r)}return r}}}function ei(e){if("function"==typeof e)return{type:"Generic",fn:e}
switch(e.type){case"Group":{let t=Js(e.combinator,e.terms.map(ei),!1)
return e.disallowEmpty&&(t=Xs(t,Ys,$s)),t}case"Multiplier":return function(e){let t=Vs,n=ei(e.term)
if(0===e.max)n=Xs(n,Ys,$s),t=Xs(n,null,$s),t.then=Xs(Vs,Vs,t),e.comma&&(t.then.else=Xs({type:"Comma",syntax:e},t,$s))
else for(let r=e.min||1;r<=e.max;r++)e.comma&&t!==Vs&&(t=Xs({type:"Comma",syntax:e},t,$s)),t=Xs(n,Xs(Vs,Vs,t),$s)
if(0===e.min)t=Xs(Vs,Vs,t)
else for(let r=0;r<e.min-1;r++)e.comma&&t!==Vs&&(t=Xs({type:"Comma",syntax:e},t,$s)),t=Xs(n,t,$s)
return t}(e)
case"Boolean":{const t=ei(e.term),n=ei(Ks([Ks([{type:"Keyword",name:"not"},{type:"Type",name:"!boolean-group"}]),Ks([{type:"Type",name:"!boolean-group"},Ks([{type:"Multiplier",comma:!1,min:0,max:0,term:Ks([{type:"Keyword",name:"and"},{type:"Type",name:"!boolean-group"}])},{type:"Multiplier",comma:!1,min:0,max:0,term:Ks([{type:"Keyword",name:"or"},{type:"Type",name:"!boolean-group"}])}],"|")])],"|")),r=ei(Ks([{type:"Type",name:"!term"},Ks([{type:"Token",value:"("},{type:"Type",name:"!self"},{type:"Token",value:")"}]),{type:"Type",name:"general-enclosed"}],"|"))
return Zs(r,{"!term":t,"!self":n}),Zs(n,{"!boolean-group":r}),n}case"Type":case"Property":return{type:e.type,name:e.name,syntax:e}
case"Keyword":return{type:e.type,name:e.name.toLowerCase(),syntax:e}
case"AtKeyword":return{type:e.type,name:"@"+e.name.toLowerCase(),syntax:e}
case"Function":return{type:e.type,name:e.name.toLowerCase()+"(",syntax:e}
case"String":return 3===e.value.length?{type:"Token",value:e.value.charAt(1),syntax:e}:{type:e.type,value:e.value.substr(1,e.value.length-2).replace(/\\'/g,"'"),syntax:e}
case"Token":return{type:e.type,value:e.value,syntax:e}
case"Comma":return{type:e.type,syntax:e}
default:throw new Error("Unknown node type:",e.type)}}function ti(e,t){return"string"==typeof e&&(e=Gs(e)),{type:"MatchGraph",match:ei(e),syntax:t||null,source:e}}const{hasOwnProperty:ni}=Object.prototype,ri="Match"
function si(e,t){if(e.length!==t.length)return!1
for(let n=0;n<e.length;n++){const r=t.charCodeAt(n)
let s=e.charCodeAt(n)
if(s>=0x0041&&s<=0x005A&&(s|=32),s!==r)return!1}return!0}function ii(e){return null===e||(e.type===nn||2===e.type||e.type===on||e.type===rn||e.type===ln||function(e){return 9===e.type&&"?"!==e.value}(e))}function oi(e){return null===e||(e.type===an||e.type===sn||e.type===cn||9===e.type&&"/"===e.value)}function ai(e,t,n){const r=function(e,t,n){function r(){do{b++,y=b<e.length?e[b]:null}while(null!==y&&(y.type===Zt||y.type===un))}function s(t){const n=b+t
return n<e.length?e[n]:null}function i(e,t){return{nextState:e,matchStack:v,syntaxStack:h,thenStack:f,tokenIndex:b,prev:t}}function o(e){f={nextState:e,matchStack:v,syntaxStack:h,prev:f}}function a(e){p=i(e,p)}function l(){v={type:1,syntax:t.syntax,token:y,prev:v},r(),d=null,b>k&&(k=b)}function c(){h={syntax:t.syntax,opts:t.syntax.opts||null!==h&&h.opts||null,prev:h},v={type:2,syntax:t.syntax,token:v.token,prev:v}}function u(){v=2===v.type?v.prev:{type:3,syntax:h.syntax,token:v.token,prev:v},h=h.prev}let h=null,f=null,p=null,d=null,m=0,g=null,y=null,b=-1,k=0,v={type:0,syntax:null,token:null,prev:null}
for(r();null===g&&++m<15e3;)switch(t.type){case"Match":if(null===f){if(null!==y&&(b!==e.length-1||"\\0"!==y.value&&"\\9"!==y.value)){t=$s
break}g=ri
break}if((t=f.nextState)===Ys){if(f.matchStack===v){t=$s
break}t=Vs}for(;f.syntaxStack!==h;)u()
f=f.prev
break
case"Mismatch":if(null!==d&&!1!==d)(null===p||b>p.tokenIndex)&&(p=d,d=!1)
else if(null===p){g="Mismatch"
break}t=p.nextState,f=p.thenStack,h=p.syntaxStack,v=p.matchStack,b=p.tokenIndex,y=b<e.length?e[b]:null,p=p.prev
break
case"MatchGraph":t=t.match
break
case"If":t.else!==$s&&a(t.else),t.then!==Vs&&o(t.then),t=t.match
break
case"MatchOnce":t={type:"MatchOnceBuffer",syntax:t,index:0,mask:0}
break
case"MatchOnceBuffer":{const e=t.syntax.terms
if(t.index===e.length){if(0===t.mask||t.syntax.all){t=$s
break}t=Vs
break}if(t.mask===(1<<e.length)-1){t=Vs
break}for(;t.index<e.length;t.index++){const n=1<<t.index
if(0===(t.mask&n)){a(t),o({type:"AddMatchOnce",syntax:t.syntax,mask:t.mask|n}),t=e[t.index++]
break}}break}case"AddMatchOnce":t={type:"MatchOnceBuffer",syntax:t.syntax,index:0,mask:t.mask}
break
case"Enum":if(null!==y){let e=y.value.toLowerCase()
if(-1!==e.indexOf("\\")&&(e=e.replace(/\\[09].*$/,"")),ni.call(t.map,e)){t=t.map[e]
break}}t=$s
break
case"Generic":{const e=null!==h?h.opts:null,n=b+Math.floor(t.fn(y,s,e))
if(!isNaN(n)&&n>b){for(;b<n;)l()
t=Vs}else t=$s
break}case"Type":case"Property":{const e="Type"===t.type?"types":"properties",r=ni.call(n,e)?n[e][t.name]:null
if(!r||!r.match)throw new Error("Bad syntax reference: "+("Type"===t.type?"<"+t.name+">":"<'"+t.name+"'>"))
if(!1!==d&&null!==y&&"Type"===t.type&&("custom-ident"===t.name&&1===y.type||"length"===t.name&&"0"===y.value)){null===d&&(d=i(t,p)),t=$s
break}c(),t=r.matchRef||r.match
break}case"Keyword":{const e=t.name
if(null!==y){let n=y.value
if(-1!==n.indexOf("\\")&&(n=n.replace(/\\[09].*$/,"")),si(n,e)){l(),t=Vs
break}}t=$s
break}case"AtKeyword":case"Function":if(null!==y&&si(y.value,t.name)){l(),t=Vs
break}t=$s
break
case"Token":if(null!==y&&y.value===t.value){l(),t=Vs
break}t=$s
break
case"Comma":null!==y&&y.type===nn?ii(v.token)?t=$s:(l(),t=oi(y)?$s:Vs):t=ii(v.token)||oi(y)?Vs:$s
break
case"String":let r="",m=b
for(;m<e.length&&r.length<t.value.length;m++)r+=e[m].value
if(si(r,t.value)){for(;b<m;)l()
t=Vs}else t=$s
break
default:throw new Error("Unknown node type: "+t.type)}switch(g){case null:console.warn("[csstree-match] BREAK after 15000 iterations"),g="Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)",v=null
break
case ri:for(;null!==h;)u()
break
default:v=null}return{tokens:e,reason:g,iterations:m,match:v,longestMatch:k}}(e,t,n||{})
if(null===r.match)return r
let s=r.match,i=r.match={syntax:t.syntax||null,match:[]}
const o=[i]
for(s=function(e){let t=null,n=null,r=e
for(;null!==r;)n=r.prev,r.prev=t,t=r,r=n
return t}(s).prev;null!==s;){switch(s.type){case 2:i.match.push(i={syntax:s.syntax,match:[]}),o.push(i)
break
case 3:o.pop(),i=o[o.length-1]
break
default:i.match.push({syntax:s.syntax||null,token:s.token.value,node:s.token.node})}s=s.prev}return r}function li(e){function t(e){return null!==e&&("Type"===e.type||"Property"===e.type||"Keyword"===e.type)}let n=null
return null!==this.matched&&!function r(s){if(Array.isArray(s.match)){for(let e=0;e<s.match.length;e++)if(r(s.match[e]))return t(s.syntax)&&n.unshift(s.syntax),!0}else if(s.node===e)return n=t(s.syntax)?[s.syntax]:[],!0
return!1}(this.matched),n}function ci(e,t,n){const r=li.call(e,t)
return null!==r&&r.some(n)}var ui=Object.freeze({__proto__:null,getTrace:li,isKeyword:function(e){return ci(this,e,e=>"Keyword"===e.type)},isProperty:function(e,t){return ci(this,e,e=>"Property"===e.type&&e.name===t)},isType:function(e,t){return ci(this,e,e=>"Type"===e.type&&e.name===t)}})
function hi(e){return"node"in e?e.node:hi(e.match[0])}function fi(e){return"node"in e?e.node:fi(e.match[e.match.length-1])}function pi(e,t,n,r,s){const i=[]
return null!==n.matched&&!function n(o){if(null!==o.syntax&&o.syntax.type===r&&o.syntax.name===s){const n=hi(o),r=fi(o)
e.syntax.walk(t,function(e,t,s){if(e===n){const e=new Xn
do{if(e.appendData(t.data),t.data===r)break
t=t.next}while(null!==t)
i.push({parent:s,nodes:e})}})}Array.isArray(o.match)&&o.match.forEach(n)}(n.matched),i}const{hasOwnProperty:di}=Object.prototype
function mi(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&e>=0}function gi(e){return Boolean(e)&&mi(e.offset)&&mi(e.line)&&mi(e.column)}function yi(e,t){return function(n,r){if(!n||n.constructor!==Object)return r(n,"Type of node should be an Object")
for(let s in n){let i=!0
if(!1!==di.call(n,s)){if("type"===s)n.type!==e&&r(n,"Wrong node type `"+n.type+"`, expected `"+e+"`")
else if("loc"===s){if(null===n.loc)continue
if(n.loc&&n.loc.constructor===Object)if("string"!=typeof n.loc.source)s+=".source"
else if(gi(n.loc.start)){if(gi(n.loc.end))continue
s+=".end"}else s+=".start"
i=!1}else if(t.hasOwnProperty(s)){i=!1
for(let e=0;!i&&e<t[s].length;e++){const r=t[s][e]
switch(r){case String:i="string"==typeof n[s]
break
case Boolean:i="boolean"==typeof n[s]
break
case null:i=null===n[s]
break
default:"string"==typeof r?i=n[s]&&n[s].type===r:Array.isArray(r)&&(i=n[s]instanceof Xn)}}}else r(n,"Unknown field `"+s+"` for "+e+" node type")
i||r(n,"Bad value for `"+e+"."+s+"`")}}for(const s in t)di.call(t,s)&&!1===di.call(n,s)&&r(n,"Field `"+e+"."+s+"` is missed")}}function bi(e,t){const n=[]
for(let r=0;r<e.length;r++){const s=e[r]
if(s===String||s===Boolean)n.push(s.name.toLowerCase())
else if(null===s)n.push("null")
else if("string"==typeof s)n.push(s)
else{if(!Array.isArray(s))throw new Error("Wrong value `"+s+"` in `"+t+"` structure definition")
n.push("List<"+(bi(s,t)||"any")+">")}}return n.join(" | ")}function ki(e,t){const n=t.structure,r={type:String,loc:!0},s={type:'"'+e+'"'}
for(const t in n){if(!1===di.call(n,t))continue
const i=r[t]=Array.isArray(n[t])?n[t].slice():[n[t]]
s[t]=bi(i,e+"."+t)}return{docs:s,check:yi(e,r)}}function vi(e,t,n){const r={}
for(const s in e)e[s].syntax&&(r[s]=n?e[s].syntax:Wr(e[s].syntax,{compact:t}))
return r}function Si(e,t,n){const r={}
for(const[s,i]of Object.entries(e))r[s]={prelude:i.prelude&&(n?i.prelude.syntax:Wr(i.prelude.syntax,{compact:t})),descriptors:i.descriptors&&vi(i.descriptors,t,n)}
return r}function wi(e,t,n){return{matched:e,iterations:n,error:t,...ui}}function xi(e,t,n,r){const s=Ws(n,e.syntax)
let i
return function(e){for(let t=0;t<e.length;t++)if("var("===e[t].value.toLowerCase())return!0
return!1}(s)?wi(null,new Error("Matching for a tree with var() is not supported")):(r&&(i=ai(s,e.cssWideKeywordsSyntax,e)),r&&i.match||(i=ai(s,t.match,e),i.match)?wi(i.match,null,i.iterations):wi(null,new Hr(i.reason,t.syntax,n,i),i.iterations))}let Ci=class{constructor(e,t,n){if(this.cssWideKeywords=ns,this.syntax=t,this.generic=!1,this.units={...Ts},this.atrules=Object.create(null),this.properties=Object.create(null),this.types=Object.create(null),this.structure=n||function(e){const t={}
if(e.node)for(const n in e.node)if(di.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=ki(n,r)}return t}(e),e){if(e.cssWideKeywords&&(this.cssWideKeywords=e.cssWideKeywords),e.units)for(const t of Object.keys(Ts))Array.isArray(e.units[t])&&(this.units[t]=e.units[t])
if(e.types)for(const[t,n]of Object.entries(e.types))this.addType_(t,n)
if(e.generic){this.generic=!0
for(const[e,t]of Object.entries(function(e){return{...Cs,...As,..._s(e)}}(this.units)))this.addType_(e,t)}if(e.atrules)for(const[t,n]of Object.entries(e.atrules))this.addAtrule_(t,n)
if(e.properties)for(const[t,n]of Object.entries(e.properties))this.addProperty_(t,n)}this.cssWideKeywordsSyntax=ti(this.cssWideKeywords.join(" |  "))}checkStructure(e){function t(e,t){r.push({node:e,message:t})}const n=this.structure,r=[]
return this.syntax.walk(e,function(e){n.hasOwnProperty(e.type)?n[e.type].check(e,t):t(e,"Unknown node type `"+e.type+"`")}),!!r.length&&r}createDescriptor(e,t,n,r=null){const s={type:t,name:n},i={type:t,name:n,parent:r,serializable:"string"==typeof e||e&&"string"==typeof e.type,syntax:null,match:null,matchRef:null}
return"function"==typeof e?i.match=ti(e,s):("string"==typeof e?Object.defineProperty(i,"syntax",{get:()=>(Object.defineProperty(i,"syntax",{value:Gs(e)}),i.syntax)}):i.syntax=e,Object.defineProperty(i,"match",{get:()=>(Object.defineProperty(i,"match",{value:ti(i.syntax,s)}),i.match)}),"Property"===t&&Object.defineProperty(i,"matchRef",{get(){const e=i.syntax,t=function(e){const t=e.terms[0]
return!1===e.explicit&&1===e.terms.length&&"Multiplier"===t.type&&!0===t.comma}(e)?ti({...e,terms:[e.terms[0].term]},s):null
return Object.defineProperty(i,"matchRef",{value:t}),t}})),i}addAtrule_(e,t){t&&(this.atrules[e]={type:"Atrule",name:e,prelude:t.prelude?this.createDescriptor(t.prelude,"AtrulePrelude",e):null,descriptors:t.descriptors?Object.keys(t.descriptors).reduce((n,r)=>(n[r]=this.createDescriptor(t.descriptors[r],"AtruleDescriptor",r,e),n),Object.create(null)):null})}addProperty_(e,t){t&&(this.properties[e]=this.createDescriptor(t,"Property",e))}addType_(e,t){t&&(this.types[e]=this.createDescriptor(t,"Type",e))}checkAtruleName(e){if(!this.getAtrule(e))return new Xr("Unknown at-rule","@"+e)}checkAtrulePrelude(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e)
return!r.prelude&&t?new SyntaxError("At-rule `@"+e+"` should not contain a prelude"):!r.prelude||t||xi(this,r.prelude,"",!1).matched?void 0:new SyntaxError("At-rule `@"+e+"` should contain a prelude")}checkAtruleDescriptorName(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e),s=Zr(t)
return r.descriptors?r.descriptors[s.name]||r.descriptors[s.basename]?void 0:new Xr("Unknown at-rule descriptor",t):new SyntaxError("At-rule `@"+e+"` has no known descriptors")}checkPropertyName(e){if(!this.getProperty(e))return new Xr("Unknown property",e)}matchAtrulePrelude(e,t){const n=this.checkAtrulePrelude(e,t)
if(n)return wi(null,n)
const r=this.getAtrule(e)
return r.prelude?xi(this,r.prelude,t||"",!1):wi(null,null)}matchAtruleDescriptor(e,t,n){const r=this.checkAtruleDescriptorName(e,t)
if(r)return wi(null,r)
const s=this.getAtrule(e),i=Zr(t)
return xi(this,s.descriptors[i.name]||s.descriptors[i.basename],n,!1)}matchDeclaration(e){return"Declaration"!==e.type?wi(null,new Error("Not a Declaration node")):this.matchProperty(e.property,e.value)}matchProperty(e,t){if(Jr(e).custom)return wi(null,new Error("Lexer matching doesn't applicable for custom properties"))
const n=this.checkPropertyName(e)
return n?wi(null,n):xi(this,this.getProperty(e),t,!0)}matchType(e,t){const n=this.getType(e)
return n?xi(this,n,t,!1):wi(null,new Xr("Unknown type",e))}match(e,t){return"string"==typeof e||e&&e.type?("string"!=typeof e&&e.match||(e=this.createDescriptor(e,"Type","anonymous")),xi(this,e,t,!1)):wi(null,new Xr("Bad syntax"))}findValueFragments(e,t,n,r){return pi(this,t,this.matchProperty(e,t),n,r)}findDeclarationValueFragments(e,t,n){return pi(this,e.value,this.matchDeclaration(e),t,n)}findAllFragments(e,t,n){const r=[]
return this.syntax.walk(e,{visit:"Declaration",enter:e=>{r.push.apply(r,this.findDeclarationValueFragments(e,t,n))}}),r}getAtrule(e,t=!0){const n=Zr(e)
return(n.vendor&&t?this.atrules[n.name]||this.atrules[n.basename]:this.atrules[n.name])||null}getAtrulePrelude(e,t=!0){const n=this.getAtrule(e,t)
return n&&n.prelude||null}getAtruleDescriptor(e,t){return this.atrules.hasOwnProperty(e)&&this.atrules.declarators&&this.atrules[e].declarators[t]||null}getProperty(e,t=!0){const n=Jr(e)
return(n.vendor&&t?this.properties[n.name]||this.properties[n.basename]:this.properties[n.name])||null}getType(e){return hasOwnProperty.call(this.types,e)?this.types[e]:null}validate(){function e(e,t){return t?`<${e}>`:`<'${e}'>`}function t(i,o,a,l){if(a.has(o))return a.get(o)
a.set(o,!1),null!==l.syntax&&function(e,t,n){let r=Bs,s=Bs
if("function"==typeof t?r=t:t&&(r=Us(t.enter),s=Us(t.leave)),r===Bs&&s===Bs)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
!function e(t){switch(r.call(n,t),t.type){case"Group":t.terms.forEach(e)
break
case"Multiplier":case"Boolean":e(t.term)
break
case"Type":case"Property":case"Keyword":case"AtKeyword":case"Function":case"String":case"Token":case"Comma":break
default:throw new Error("Unknown type: "+t.type)}s.call(n,t)}(e)}(l.syntax,function(l){if("Type"!==l.type&&"Property"!==l.type)return
const c="Type"===l.type?i.types:i.properties,u="Type"===l.type?r:s
hasOwnProperty.call(c,l.name)?t(i,l.name,u,c[l.name])&&(n.push(`${e(o,a===r)} used broken syntax definition ${e(l.name,"Type"===l.type)}`),a.set(o,!0)):(n.push(`${e(o,a===r)} used missed syntax definition ${e(l.name,"Type"===l.type)}`),a.set(o,!0))},this)}const n=[]
let r=new Map,s=new Map
for(const e in this.types)t(this,e,r,this.types[e])
for(const e in this.properties)t(this,e,s,this.properties[e])
const i=[...r.keys()].filter(e=>r.get(e)),o=[...s.keys()].filter(e=>s.get(e))
return i.length||o.length?{errors:n,types:i,properties:o}:null}dump(e,t){return{generic:this.generic,cssWideKeywords:this.cssWideKeywords,units:this.units,types:vi(this.types,!t,e),properties:vi(this.properties,!t,e),atrules:Si(this.atrules,!t,e)}}toString(){return JSON.stringify(this.dump())}}
function Ai(e,t){return"string"==typeof t&&/^\s*\|/.test(t)?"string"==typeof e?e+t:t.replace(/^\s*\|\s*/,""):t||null}function _i(e,t){const n=Object.create(null)
for(const[r,s]of Object.entries(e))if(s){n[r]={}
for(const e of Object.keys(s))t.includes(e)&&(n[r][e]=s[e])}return n}function Ti(e,t){const n={...e}
for(const[r,s]of Object.entries(t))switch(r){case"generic":n[r]=Boolean(s)
break
case"cssWideKeywords":n[r]=e[r]?[...e[r],...s]:s||[]
break
case"units":n[r]={...e[r]}
for(const[e,t]of Object.entries(s))n[r][e]=Array.isArray(t)?t:[]
break
case"atrules":n[r]={...e[r]}
for(const[e,t]of Object.entries(s)){const s=n[r][e]||{},i=n[r][e]={prelude:s.prelude||null,descriptors:{...s.descriptors}}
if(t){i.prelude=t.prelude?Ai(i.prelude,t.prelude):i.prelude||null
for(const[e,n]of Object.entries(t.descriptors||{}))i.descriptors[e]=n?Ai(i.descriptors[e],n):null
Object.keys(i.descriptors).length||(i.descriptors=null)}}break
case"types":case"properties":n[r]={...e[r]}
for(const[e,t]of Object.entries(s))n[r][e]=Ai(n[r][e],t)
break
case"scope":case"features":n[r]={...e[r]}
for(const[e,t]of Object.entries(s))n[r][e]={...n[r][e],...t}
break
case"parseContext":n[r]={...e[r],...s}
break
case"atrule":case"pseudo":n[r]={...e[r],..._i(s,["parse"])}
break
case"node":n[r]={...e[r],..._i(s,["name","structure","parse","generate","walkContext"])}}return n}function Ei(e){const t=rr(e),n=Br(e),r=Dr(e),{fromPlainObject:s,toPlainObject:i}=function(e){return{fromPlainObject:t=>(e(t,{enter(e){e.children&&e.children instanceof Xn==0&&(e.children=(new Xn).fromArray(e.children))}}),t),toPlainObject:t=>(e(t,{leave(e){e.children&&e.children instanceof Xn&&(e.children=e.children.toArray())}}),t)}}(n),o={lexer:null,createLexer:e=>new Ci(e,o,o.lexer.structure),tokenize:$n,parse:t,generate:r,walk:n,find:n.find,findLast:n.findLast,findAll:n.findAll,fromPlainObject:s,toPlainObject:i,fork(t){const n=Ti({},e)
return Ei("function"==typeof t?t(n):Ti(n,t))}}
return o.lexer=new Ci({generic:e.generic,cssWideKeywords:e.cssWideKeywords,units:e.units,types:e.types,atrules:e.atrules,properties:e.properties,node:e.node},o),o}const Oi=r(import.meta.url)("../data/patch.json"),Pi=r(import.meta.url),Li=Pi("mdn-data/css/at-rules.json"),Ni=Pi("mdn-data/css/properties.json"),Di=Pi("mdn-data/css/syntaxes.json"),Mi=Object.hasOwn||((e,t)=>Object.prototype.hasOwnProperty.call(e,t)),ji=/^\s*\|\s*/
function Ii(e,t){const n=Object.create(null)
for(const[t,r]of Object.entries(e))r&&(n[t]=r.syntax||r)
for(const r of Object.keys(t))Mi(e,r)?t[r].syntax?n[r]=ji.test(t[r].syntax)?n[r]+" "+t[r].syntax.trim():t[r].syntax:delete n[r]:t[r].syntax&&(n[r]=t[r].syntax.replace(ji,""))
return n}function Ri(e){const t={}
for(const[n,r]of Object.entries(e||{}))t[n]="string"==typeof r?{syntax:r}:r
return t}var Fi={types:Ii(Di,Oi.types),atrules:function(e,t){const n={}
for(const r in e){if(null===t[r])continue
const s=t[r]||{}
n[r]={prelude:r in t&&"prelude"in s?s.prelude:e[r].prelude||null,descriptors:Ii(e[r].descriptors||{},Ri(s.descriptors))}}for(const[r,s]of Object.entries(t))s&&!Mi(e,r)&&(n[r]={prelude:s.prelude||null,descriptors:s.descriptors?Ii({},Ri(s.descriptors)):null})
return n}(function(e){const t=Object.create(null)
for(const[n,r]of Object.entries(e)){let e=null
if(r.descriptors){e=Object.create(null)
for(const[t,n]of Object.entries(r.descriptors))e[t]=n.syntax}t[n.substr(1)]={prelude:r.syntax.trim().replace(/\{(.|\s)+\}/,"").match(/^@\S+\s+([^;\{]*)/)[1].trim()||null,descriptors:e}}return t}(Li),Oi.atrules),properties:Ii(Ni,Oi.properties)}
const zi=0x002B,Gi=0x002D,Bi=0x006E,Ui=!0
function qi(e,t){let n=this.tokenStart+e
const r=this.charCodeAt(n)
for(r!==zi&&r!==Gi||(t&&this.error("Number sign is not allowed"),n++);n<this.tokenEnd;n++)hn(this.charCodeAt(n))||this.error("Integer is expected",n)}function Wi(e){return qi.call(this,0,e)}function Vi(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let n=""
switch(t){case Bi:n="N is expected"
break
case Gi:n="HyphenMinus is expected"}this.error(n,this.tokenStart+e)}}function $i(){let e=0,t=0,n=this.tokenType
for(;n===Zt||n===un;)n=this.lookupType(++e)
if(n!==Ht){if(!this.isDelim(zi,e)&&!this.isDelim(Gi,e))return null
t=this.isDelim(zi,e)?zi:Gi
do{n=this.lookupType(++e)}while(n===Zt||n===un)
n!==Ht&&(this.skip(e),Wi.call(this,Ui))}return e>0&&this.skip(e),0===t&&(n=this.charCodeAt(this.tokenStart),n!==zi&&n!==Gi&&this.error("Number sign is expected")),Wi.call(this,0!==t),t===Gi?"-"+this.consume(Ht):this.consume(Ht)}const Yi={a:[String,null],b:[String,null]}
function Xi(){const e=this.tokenStart
let t=null,n=null
if(this.tokenType===Ht)Wi.call(this,false),n=this.consume(Ht)
else if(1===this.tokenType&&this.cmpChar(this.tokenStart,Gi))switch(t="-1",Vi.call(this,1,Bi),this.tokenEnd-this.tokenStart){case 2:this.next(),n=$i.call(this)
break
case 3:Vi.call(this,2,Gi),this.next(),this.skipSC(),Wi.call(this,Ui),n="-"+this.consume(Ht)
break
default:Vi.call(this,2,Gi),qi.call(this,3,Ui),this.next(),n=this.substrToCursor(e+2)}else if(1===this.tokenType||this.isDelim(zi)&&1===this.lookupType(1)){let r=0
switch(t="1",this.isDelim(zi)&&(r=1,this.next()),Vi.call(this,0,Bi),this.tokenEnd-this.tokenStart){case 1:this.next(),n=$i.call(this)
break
case 2:Vi.call(this,1,Gi),this.next(),this.skipSC(),Wi.call(this,Ui),n="-"+this.consume(Ht)
break
default:Vi.call(this,1,Gi),qi.call(this,2,Ui),this.next(),n=this.substrToCursor(e+r+1)}}else if(this.tokenType===Kt){const r=this.charCodeAt(this.tokenStart),s=r===zi||r===Gi
let i=this.tokenStart+s
for(;i<this.tokenEnd&&hn(this.charCodeAt(i));i++);i===this.tokenStart+s&&this.error("Integer is expected",this.tokenStart+s),Vi.call(this,i-this.tokenStart,Bi),t=this.substring(e,i),i+1===this.tokenEnd?(this.next(),n=$i.call(this)):(Vi.call(this,i-this.tokenStart+1,Gi),i+2===this.tokenEnd?(this.next(),this.skipSC(),Wi.call(this,Ui),n="-"+this.consume(Ht)):(qi.call(this,i-this.tokenStart+2,Ui),this.next(),n=this.substrToCursor(i+1)))}else this.error()
return null!==t&&t.charCodeAt(0)===zi&&(t=t.substr(1)),null!==n&&n.charCodeAt(0)===zi&&(n=n.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:n}}var Hi=Object.freeze({__proto__:null,generate:function(e){if(e.a){const t=("+1"===e.a||"1"===e.a?"n":"-1"===e.a&&"-n")||e.a+"n"
if(e.b){const n="-"===e.b[0]||"+"===e.b[0]?e.b:"+"+e.b
this.tokenize(t+n)}else this.tokenize(t)}else this.tokenize(e.b)},name:"AnPlusB",parse:Xi,structure:Yi})
function Qi(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Ki(){for(let e,t=1;e=this.lookupType(t);t++){if(e===cn)return!0
if(e===ln||3===e)return!1}return!1}const Zi={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]}
function Ji(e=!1){const t=this.tokenStart
let n,r,s=null,i=null
switch(this.eat(3),n=this.substrToCursor(t+1),r=n.toLowerCase(),this.skipSC(),!1===this.eof&&this.tokenType!==ln&&this.tokenType!==tn&&(s=this.parseAtrulePrelude?this.parseWithFallback(this.AtrulePrelude.bind(this,n,e),Qi):Qi.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case tn:this.next()
break
case ln:i=hasOwnProperty.call(this.atrule,r)&&"function"==typeof this.atrule[r].block?this.atrule[r].block.call(this,e):this.Block(Ki.call(this))}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:n,prelude:s,block:i}}var eo=Object.freeze({__proto__:null,generate:function(e){this.token(3,"@"+e.name),null!==e.prelude&&this.node(e.prelude),e.block?this.node(e.block):this.token(tn,";")},name:"Atrule",parse:Ji,structure:Zi,walkContext:"atrule"})
function to(e){let t=null
return null!==e&&(e=e.toLowerCase()),this.skipSC(),t=hasOwnProperty.call(this.atrule,e)&&"function"==typeof this.atrule[e].prelude?this.atrule[e].prelude.call(this):this.readSequence(this.scope.AtrulePrelude),this.skipSC(),!0!==this.eof&&this.tokenType!==ln&&this.tokenType!==tn&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}var no=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"AtrulePrelude",parse:to,structure:{children:[[]]},walkContext:"atrulePrelude"})
function ro(){this.eof&&this.error("Unexpected end of input")
const e=this.tokenStart
let t=!1
return this.isDelim(42)?(t=!0,this.next()):this.isDelim(124)||this.eat(1),this.isDelim(124)?61!==this.charCodeAt(this.tokenStart+1)?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function so(){const e=this.tokenStart,t=this.charCodeAt(e)
return 61!==t&&126!==t&&94!==t&&36!==t&&42!==t&&124!==t&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),61!==t&&(this.isDelim(61)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}const io={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]}
function oo(){const e=this.tokenStart
let t,n=null,r=null,s=null
return this.eat(rn),this.skipSC(),t=ro.call(this),this.skipSC(),this.tokenType!==sn&&(1!==this.tokenType&&(n=so.call(this),this.skipSC(),r=5===this.tokenType?this.String():this.Identifier(),this.skipSC()),1===this.tokenType&&(s=this.consume(1),this.skipSC())),this.eat(sn),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:n,value:r,flags:s}}var ao=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.node(e.name),null!==e.matcher&&(this.tokenize(e.matcher),this.node(e.value)),null!==e.flags&&this.token(1,e.flags),this.token(9,"]")},name:"AttributeSelector",parse:oo,structure:io})
function lo(){return this.Raw(null,!0)}function co(){return this.parseWithFallback(this.Rule,lo)}function uo(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function ho(){if(this.tokenType===tn)return uo.call(this,this.tokenIndex)
const e=this.parseWithFallback(this.Declaration,uo)
return this.tokenType===tn&&this.next(),e}function fo(e){const t=e?ho:co,n=this.tokenStart
let r=this.createList()
this.eat(ln)
e:for(;!this.eof;)switch(this.tokenType){case cn:break e
case Zt:case un:this.next()
break
case 3:r.push(this.parseWithFallback(this.Atrule.bind(this,e),lo))
break
default:e&&this.isDelim(38)?r.push(co.call(this)):r.push(t.call(this))}return this.eof||this.eat(cn),{type:"Block",loc:this.getLocation(n,this.tokenStart),children:r}}var po=Object.freeze({__proto__:null,generate:function(e){this.token(ln,"{"),this.children(e,e=>{"Declaration"===e.type&&this.token(tn,";")}),this.token(cn,"}")},name:"Block",parse:fo,structure:{children:[["Atrule","Rule","Declaration"]]},walkContext:"block"})
function mo(e,t){const n=this.tokenStart
let r=null
return this.eat(rn),r=e.call(this,t),this.eof||this.eat(sn),{type:"Brackets",loc:this.getLocation(n,this.tokenStart),children:r}}var go=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.children(e),this.token(9,"]")},name:"Brackets",parse:mo,structure:{children:[[]]}})
function yo(){const e=this.tokenStart
return this.eat(Jt),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}var bo=Object.freeze({__proto__:null,generate:function(){this.token(Jt,"--\x3e")},name:"CDC",parse:yo,structure:[]})
function ko(){const e=this.tokenStart
return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}var vo=Object.freeze({__proto__:null,generate:function(){this.token(14,"\x3c!--")},name:"CDO",parse:ko,structure:[]})
const So={name:String}
function wo(){return this.eatDelim(46),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}var xo=Object.freeze({__proto__:null,generate:function(e){this.token(9,"."),this.token(1,e.name)},name:"ClassSelector",parse:wo,structure:So})
const Co={name:String}
function Ao(){const e=this.tokenStart
let t
switch(this.tokenType){case Zt:t=" "
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 62:case 43:case 126:this.next()
break
case 47:this.next(),this.eatIdent("deep"),this.eatDelim(47)
break
default:this.error("Combinator is expected")}t=this.substrToCursor(e)}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}var _o=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"Combinator",parse:Ao,structure:Co})
const To={value:String}
function Eo(){const e=this.tokenStart
let t=this.tokenEnd
return this.eat(un),t-e+2>=2&&42===this.charCodeAt(t-2)&&47===this.charCodeAt(t-1)&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}var Oo=Object.freeze({__proto__:null,generate:function(e){this.token(un,"/*"+e.value+"*/")},name:"Comment",parse:Eo,structure:To})
const Po=new Set([en,an,0]),Lo={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]}
function No(e){return 1===this.lookupTypeNonSC(1)&&Po.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}const Do={media:No,container:No,supports(){return this.SupportsDeclaration()}}
function Mo(e="media"){const t=this.createList()
e:for(;!this.eof;)switch(this.tokenType){case un:case Zt:this.next()
continue
case 1:t.push(this.Identifier())
break
case on:{let n=this.parseWithFallback(()=>Do[e].call(this,e),()=>null)
n||(n=this.parseWithFallback(()=>{this.eat(on)
const t=this.Condition(e)
return this.eat(an),t},()=>this.GeneralEnclosed(e))),t.push(n)
break}case 2:{let n=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null)
n||(n=this.GeneralEnclosed(e)),t.push(n)
break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}var jo=Object.freeze({__proto__:null,generate:function(e){e.children.forEach(e=>{"Condition"===e.type?(this.token(on,"("),this.node(e),this.token(an,")")):this.node(e)})},name:"Condition",parse:Mo,structure:Lo})
function Io(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function Ro(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function Fo(){const e=this.tokenIndex,t=this.Value()
return"Raw"!==t.type&&!1===this.eof&&this.tokenType!==tn&&!1===this.isDelim(33)&&!1===this.isBalanceEdge(e)&&this.error(),t}const zo={important:[Boolean,String],property:String,value:["Value","Raw"]}
function Go(){const e=this.tokenStart,t=this.tokenIndex,n=Bo.call(this),r=es(n),s=r?this.parseCustomProperty:this.parseValue,i=r?Ro:Io
let o,a=!1
this.skipSC(),this.eat(en)
const l=this.tokenIndex
if(r||this.skipSC(),o=s?this.parseWithFallback(Fo,i):i.call(this,this.tokenIndex),r&&"Value"===o.type&&o.children.isEmpty)for(let e=l-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Zt){o.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}return this.isDelim(33)&&(a=Uo.call(this),this.skipSC()),!1===this.eof&&this.tokenType!==tn&&!1===this.isBalanceEdge(t)&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:a,property:n,value:o}}function Bo(){const e=this.tokenStart
if(9===this.tokenType)switch(this.charCodeAt(this.tokenStart)){case 42:case 36:case 43:case 35:case 38:this.next()
break
case 47:this.next(),this.isDelim(47)&&this.next()}return 4===this.tokenType?this.eat(4):this.eat(1),this.substrToCursor(e)}function Uo(){this.eat(9),this.skipSC()
const e=this.consume(1)
return"important"===e||e}var qo=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.property),this.token(en,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,!0===e.important?"important":e.important))},name:"Declaration",parse:Go,structure:zo,walkContext:"declaration"})
function Wo(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function Vo(){const e=this.createList()
for(;!this.eof;)switch(this.tokenType){case Zt:case un:case tn:this.next()
break
case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),Wo))
break
default:this.isDelim(38)?e.push(this.parseWithFallback(this.Rule,Wo)):e.push(this.parseWithFallback(this.Declaration,Wo))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}var $o=Object.freeze({__proto__:null,generate:function(e){this.children(e,e=>{"Declaration"===e.type&&this.token(tn,";")})},name:"DeclarationList",parse:Vo,structure:{children:[["Declaration","Atrule","Rule"]]}})
const Yo={value:String,unit:String}
function Xo(){const e=this.tokenStart,t=this.consumeNumber(Kt)
return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}var Ho=Object.freeze({__proto__:null,generate:function(e){this.token(Kt,e.value+e.unit)},name:"Dimension",parse:Xo,structure:Yo})
const Qo={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]}
function Ko(e){const t=this.tokenStart
let n,r=null
if(this.eat(on),this.skipSC(),n=this.consume(1),this.skipSC(),this.tokenType!==an){switch(this.eat(en),this.skipSC(),this.tokenType){case Ht:r=9===this.lookupNonWSType(1)?this.Ratio():this.Number()
break
case Kt:r=this.Dimension()
break
case 1:r=this.Identifier()
break
case 2:r=this.parseWithFallback(()=>{const e=this.Function(this.readSequence,this.scope.Value)
return this.skipSC(),this.isDelim(47)&&this.error(),e},()=>this.Ratio())
break
default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(an),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:n,value:r}}var Zo=Object.freeze({__proto__:null,generate:function(e){this.token(on,"("),this.token(1,e.name),null!==e.value&&(this.token(en,":"),this.node(e.value)),this.token(an,")")},name:"Feature",parse:Ko,structure:Qo})
const Jo={kind:String,feature:String,value:["Declaration","Selector"]}
function ea(e,t){const n=(this.features[e]||{})[t]
return"function"!=typeof n&&this.error(`Unknown feature ${t}()`),n}function ta(e="unknown"){const t=this.tokenStart,n=this.consumeFunctionName(),r=ea.call(this,e,n.toLowerCase())
this.skipSC()
const s=this.parseWithFallback(()=>{const e=this.tokenIndex,t=r.call(this)
return!1===this.eof&&!1===this.isBalanceEdge(e)&&this.error(),t},()=>this.Raw(null,!1))
return this.eof||this.eat(an),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:n,value:s}}var na=Object.freeze({__proto__:null,generate:function(e){this.token(2,e.feature+"("),this.node(e.value),this.token(an,")")},name:"FeatureFunction",parse:ta,structure:Jo})
const ra={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]}
function sa(){switch(this.skipSC(),this.tokenType){case Ht:return this.isDelim(47,this.lookupOffsetNonSC(1))?this.Ratio():this.Number()
case Kt:return this.Dimension()
case 1:return this.Identifier()
case 2:return this.parseWithFallback(()=>{const e=this.Function(this.readSequence,this.scope.Value)
return this.skipSC(),this.isDelim(47)&&this.error(),e},()=>this.Ratio())
default:this.error("Number, dimension, ratio or identifier is expected")}}function ia(e){if(this.skipSC(),this.isDelim(60)||this.isDelim(62)){const e=this.source[this.tokenStart]
return this.next(),this.isDelim(61)?(this.next(),e+"="):e}if(this.isDelim(61))return"="
this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function oa(e="unknown"){const t=this.tokenStart
this.skipSC(),this.eat(on)
const n=sa.call(this),r=ia.call(this,"Identifier"===n.type),s=sa.call(this)
let i=null,o=null
return this.lookupNonWSType(0)!==an&&(i=ia.call(this),o=sa.call(this)),this.skipSC(),this.eat(an),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:n,leftComparison:r,middle:s,rightComparison:i,right:o}}var aa=Object.freeze({__proto__:null,generate:function(e){this.token(on,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(an,")")},name:"FeatureRange",parse:oa,structure:ra})
const la={name:String,children:[[]]}
function ca(e,t){const n=this.tokenStart,r=this.consumeFunctionName(),s=r.toLowerCase()
let i
return i=t.hasOwnProperty(s)?t[s].call(this,t):e.call(this,t),this.eof||this.eat(an),{type:"Function",loc:this.getLocation(n,this.tokenStart),name:r,children:i}}var ua=Object.freeze({__proto__:null,generate:function(e){this.token(2,e.name+"("),this.children(e),this.token(an,")")},name:"Function",parse:ca,structure:la,walkContext:"function"})
const ha={kind:String,function:[String,null],children:[[]]}
function fa(e){const t=this.tokenStart
let n=null
2===this.tokenType?n=this.consumeFunctionName():this.eat(on)
const r=this.parseWithFallback(()=>{const e=this.tokenIndex,t=this.readSequence(this.scope.Value)
return!1===this.eof&&!1===this.isBalanceEdge(e)&&this.error(),t},()=>this.createSingleNodeList(this.Raw(null,!1)))
return this.eof||this.eat(an),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:n,children:r}}var pa=Object.freeze({__proto__:null,generate:function(e){e.function?this.token(2,e.function+"("):this.token(on,"("),this.children(e),this.token(an,")")},name:"GeneralEnclosed",parse:fa,structure:ha})
const da={value:String}
function ma(){const e=this.tokenStart
return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}var ga=Object.freeze({__proto__:null,generate:function(e){this.token(4,"#"+e.value)},name:"Hash",parse:ma,structure:da,xxx:"XXX"})
const ya={name:String}
function ba(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}var ka=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.name)},name:"Identifier",parse:ba,structure:ya})
const va={name:String}
function Sa(){const e=this.tokenStart
return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}var wa=Object.freeze({__proto__:null,generate:function(e){this.token(9,"#"+e.name)},name:"IdSelector",parse:Sa,structure:va})
const xa={name:String}
function Ca(){let e=this.tokenStart,t=this.consume(1)
for(;this.isDelim(46);)this.eat(9),t+="."+this.consume(1)
return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}var Aa=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"Layer",parse:Ca,structure:xa})
function _a(){const e=this.createList()
for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===nn);)this.skipSC(),this.next(),this.skipSC()
return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}var Ta=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(nn,","))},name:"LayerList",parse:_a,structure:{children:[["Layer"]]}})
const Ea={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]}
function Oa(){const e=this.tokenStart
let t=null,n=null,r=null
if(this.skipSC(),1===this.tokenType&&this.lookupTypeNonSC(1)!==on){const e=this.consume(1),s=e.toLowerCase()
switch("not"===s||"only"===s?(this.skipSC(),t=s,n=this.consume(1)):n=e,this.lookupTypeNonSC(0)){case 1:this.skipSC(),this.eatIdent("and"),r=this.Condition("media")
break
case ln:case tn:case nn:case 0:break
default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case on:case 2:r=this.Condition("media")
break
case ln:case tn:case 0:break
default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:n,condition:r}}var Pa=Object.freeze({__proto__:null,generate:function(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)},name:"MediaQuery",parse:Oa,structure:Ea})
function La(){const e=this.createList()
for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===nn);)this.next()
return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}var Na=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(nn,","))},name:"MediaQueryList",parse:La,structure:{children:[["MediaQuery"]]}})
function Da(){const e=this.tokenStart
return this.eatDelim(38),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}var Ma=Object.freeze({__proto__:null,generate:function(){this.token(9,"&")},name:"NestingSelector",parse:Da,structure:{}})
function ja(){this.skipSC()
const e=this.tokenStart
let t,n=e,r=null
return t=this.lookupValue(0,"odd")||this.lookupValue(0,"even")?this.Identifier():this.AnPlusB(),n=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),r=this.SelectorList(),n=this.tokenStart),{type:"Nth",loc:this.getLocation(e,n),nth:t,selector:r}}var Ia=Object.freeze({__proto__:null,generate:function(e){this.node(e.nth),null!==e.selector&&(this.token(1,"of"),this.node(e.selector))},name:"Nth",parse:ja,structure:{nth:["AnPlusB","Identifier"],selector:["SelectorList",null]}})
const Ra={value:String}
function Fa(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(Ht)}}var za=Object.freeze({__proto__:null,generate:function(e){this.token(Ht,e.value)},name:"Number",parse:Fa,structure:Ra})
const Ga={value:String}
function Ba(){const e=this.tokenStart
return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var Ua=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Operator",parse:Ba,structure:Ga})
function qa(e,t){const n=this.tokenStart
let r=null
return this.eat(on),r=e.call(this,t),this.eof||this.eat(an),{type:"Parentheses",loc:this.getLocation(n,this.tokenStart),children:r}}var Wa=Object.freeze({__proto__:null,generate:function(e){this.token(on,"("),this.children(e),this.token(an,")")},name:"Parentheses",parse:qa,structure:{children:[[]]}})
const Va={value:String}
function $a(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(Qt)}}var Ya=Object.freeze({__proto__:null,generate:function(e){this.token(Qt,e.value+"%")},name:"Percentage",parse:$a,structure:Va})
const Xa={name:String,children:[["Raw"],null]}
function Ha(){const e=this.tokenStart
let t,n,r=null
return this.eat(en),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),this.lookupNonWSType(0)==an?r=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(null,!1))),this.eat(an)):t=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var Qa=Object.freeze({__proto__:null,generate:function(e){this.token(en,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(an,")"))},name:"PseudoClassSelector",parse:Ha,structure:Xa,walkContext:"function"})
const Ka={name:String,children:[["Raw"],null]}
function Za(){const e=this.tokenStart
let t,n,r=null
return this.eat(en),this.eat(en),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),this.lookupNonWSType(0)==an?r=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(null,!1))),this.eat(an)):t=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var Ja=Object.freeze({__proto__:null,generate:function(e){this.token(en,":"),this.token(en,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(an,")"))},name:"PseudoElementSelector",parse:Za,structure:Ka,walkContext:"function"})
function el(){switch(this.skipSC(),this.tokenType){case Ht:return this.Number()
case 2:return this.Function(this.readSequence,this.scope.Value)
default:this.error("Number of function is expected")}}function tl(){const e=this.tokenStart,t=el.call(this)
let n=null
return this.skipSC(),this.isDelim(47)&&(this.eatDelim(47),n=el.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:n}}var nl=Object.freeze({__proto__:null,generate:function(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(Ht,1)},name:"Ratio",parse:tl,structure:{left:["Number","Function"],right:["Number","Function",null]}})
function rl(){return this.tokenIndex>0&&this.lookupType(-1)===Zt?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}const sl={value:String}
function il(e,t){const n=this.getTokenStart(this.tokenIndex)
let r
return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),r=t&&this.tokenStart>n?rl.call(this):this.tokenStart,{type:"Raw",loc:this.getLocation(n,r),value:this.substring(n,r)}}var ol=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Raw",parse:il,structure:sl})
function al(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function ll(){const e=this.SelectorList()
return"Raw"!==e.type&&!1===this.eof&&this.tokenType!==ln&&this.error(),e}function cl(){const e=this.tokenIndex,t=this.tokenStart
let n,r
return n=this.parseRulePrelude?this.parseWithFallback(ll,al):al.call(this,e),r=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:n,block:r}}var ul=Object.freeze({__proto__:null,generate:function(e){this.node(e.prelude),this.node(e.block)},name:"Rule",parse:cl,structure:{prelude:["SelectorList","Raw"],block:["Block"]},walkContext:"rule"})
function hl(){let e=null,t=null
this.skipSC()
const n=this.tokenStart
return this.tokenType===on&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(an)),1===this.lookupNonWSType(0)&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(on),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(an)),{type:"Scope",loc:this.getLocation(n,this.tokenStart),root:e,limit:t}}var fl=Object.freeze({__proto__:null,generate:function(e){e.root&&(this.token(on,"("),this.node(e.root),this.token(an,")")),e.limit&&(this.token(1,"to"),this.token(on,"("),this.node(e.limit),this.token(an,")"))},name:"Scope",parse:hl,structure:{root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]}})
function pl(){const e=this.readSequence(this.scope.Selector)
return null===this.getFirstListNode(e)&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}var dl=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Selector",parse:pl,structure:{children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]}})
function ml(){const e=this.createList()
for(;!this.eof&&(e.push(this.Selector()),this.tokenType===nn);)this.next()
return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}var gl=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(nn,","))},name:"SelectorList",parse:ml,structure:{children:[["Selector","Raw"]]},walkContext:"selector"})
function yl(e){const t=e.length,n=e.charCodeAt(0),r=34===n||39===n?1:0,s=1===r&&t>1&&e.charCodeAt(t-1)===n?t-2:t-1
let i=""
for(let n=r;n<=s;n++){let r=e.charCodeAt(n)
if(92===r){if(n===s){n!==t-1&&(i=e.substr(n+1))
break}if(r=e.charCodeAt(++n),kn(92,r)){const t=n-1,r=Nn(e,t)
n=r-1,i+=In(e.substring(t+1,r))}else 0x000d===r&&0x000a===e.charCodeAt(n+1)&&n++}else i+=e[n]}return i}const bl={value:String}
function kl(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:yl(this.consume(5))}}var vl=Object.freeze({__proto__:null,generate:function(e){this.token(5,function(e){let t="",n=!1
for(let r=0;r<e.length;r++){const s=e.charCodeAt(r)
0x0000!==s?s<=0x001f||0x007F===s?(t+="\\"+s.toString(16),n=!0):34===s||92===s?(t+="\\"+e.charAt(r),n=!1):(n&&(fn(s)||bn(s))&&(t+=" "),t+=e.charAt(r),n=!1):t+="�"}return'"'+t+'"'}(e.value))},name:"String",parse:kl,structure:bl})
function Sl(){return this.Raw(null,!1)}function wl(){const e=this.tokenStart,t=this.createList()
let n
for(;!this.eof;){switch(this.tokenType){case Zt:this.next()
continue
case un:if(33!==this.charCodeAt(this.tokenStart+2)){this.next()
continue}n=this.Comment()
break
case 14:n=this.CDO()
break
case Jt:n=this.CDC()
break
case 3:n=this.parseWithFallback(this.Atrule,Sl)
break
default:n=this.parseWithFallback(this.Rule,Sl)}t.push(n)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}var xl=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"StyleSheet",parse:wl,structure:{children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]},walkContext:"stylesheet"})
function Cl(){const e=this.tokenStart
this.eat(on),this.skipSC()
const t=this.Declaration()
return this.eof||this.eat(an),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}var Al=Object.freeze({__proto__:null,generate:function(e){this.token(on,"("),this.node(e.declaration),this.token(an,")")},name:"SupportsDeclaration",parse:Cl,structure:{declaration:"Declaration"}})
function _l(){1!==this.tokenType&&!1===this.isDelim(42)&&this.error("Identifier or asterisk is expected"),this.next()}const Tl={name:String}
function El(){const e=this.tokenStart
return this.isDelim(124)?(this.next(),_l.call(this)):(_l.call(this),this.isDelim(124)&&(this.next(),_l.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}var Ol=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"TypeSelector",parse:El,structure:Tl})
function Pl(e,t){let n=0
for(let r=this.tokenStart+e;r<this.tokenEnd;r++){const s=this.charCodeAt(r)
if(45===s&&t&&0!==n)return Pl.call(this,e+n+1,!1),-1
fn(s)||this.error(t&&0!==n?"Hyphen minus"+(n<6?" or hex digit":"")+" is expected":n<6?"Hex digit is expected":"Unexpected input",r),++n>6&&this.error("Too many hex digits",r)}return this.next(),n}function Ll(e){let t=0
for(;this.isDelim(63);)++t>e&&this.error("Too many question marks"),this.next()}function Nl(e){this.charCodeAt(this.tokenStart)!==e&&this.error((43===e?"Plus sign":"Hyphen minus")+" is expected")}function Dl(){let e=0
switch(this.tokenType){case Ht:if(e=Pl.call(this,1,!0),this.isDelim(63)){Ll.call(this,6-e)
break}if(this.tokenType===Kt||this.tokenType===Ht){Nl.call(this,45),Pl.call(this,1,!1)
break}break
case Kt:e=Pl.call(this,1,!0),e>0&&Ll.call(this,6-e)
break
default:if(this.eatDelim(43),1===this.tokenType){e=Pl.call(this,0,!0),e>0&&Ll.call(this,6-e)
break}if(this.isDelim(63)){this.next(),Ll.call(this,5)
break}this.error("Hex digit or question mark is expected")}}const Ml={value:String}
function jl(){const e=this.tokenStart
return this.eatIdent("u"),Dl.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var Il=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"UnicodeRange",parse:jl,structure:Ml})
const Rl={value:String}
function Fl(){const e=this.tokenStart
let t
switch(this.tokenType){case 7:t=function(e){const t=e.length
let n=4,r=41===e.charCodeAt(t-1)?t-2:t-1,s=""
for(;n<r&&bn(e.charCodeAt(n));)n++
for(;n<r&&bn(e.charCodeAt(r));)r--
for(let i=n;i<=r;i++){let n=e.charCodeAt(i)
if(92===n){if(i===r){i!==t-1&&(s=e.substr(i+1))
break}if(n=e.charCodeAt(++i),kn(92,n)){const t=i-1,n=Nn(e,t)
i=n-1,s+=In(e.substring(t+1,n))}else 0x000d===n&&0x000a===e.charCodeAt(i+1)&&i++}else s+=e[i]}return s}(this.consume(7))
break
case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=yl(this.consume(5)),this.skipSC(),this.eof||this.eat(an)
break
default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}var zl=Object.freeze({__proto__:null,generate:function(e){this.token(7,function(e){let t="",n=!1
for(let r=0;r<e.length;r++){const s=e.charCodeAt(r)
0x0000!==s?s<=0x001f||0x007F===s?(t+="\\"+s.toString(16),n=!0):32===s||92===s||34===s||39===s||40===s||41===s?(t+="\\"+e.charAt(r),n=!1):(n&&fn(s)&&(t+=" "),t+=e.charAt(r),n=!1):t+="�"}return"url("+t+")"}(e.value))},name:"Url",parse:Fl,structure:Rl})
function Gl(){const e=this.tokenStart,t=this.readSequence(this.scope.Value)
return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}var Bl=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Value",parse:Gl,structure:{children:[[]]}})
const Ul=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),ql={value:String}
function Wl(){return this.eat(Zt),Ul}var Vl=Object.freeze({__proto__:null,generate:function(e){this.token(Zt,e.value)},name:"WhiteSpace",parse:Wl,structure:ql}),$l=Object.freeze({__proto__:null,AnPlusB:Hi,Atrule:eo,AtrulePrelude:no,AttributeSelector:ao,Block:po,Brackets:go,CDC:bo,CDO:vo,ClassSelector:xo,Combinator:_o,Comment:Oo,Condition:jo,Declaration:qo,DeclarationList:$o,Dimension:Ho,Feature:Zo,FeatureFunction:na,FeatureRange:aa,Function:ua,GeneralEnclosed:pa,Hash:ga,IdSelector:wa,Identifier:ka,Layer:Aa,LayerList:Ta,MediaQuery:Pa,MediaQueryList:Na,NestingSelector:Ma,Nth:Ia,Number:za,Operator:Ua,Parentheses:Wa,Percentage:Ya,PseudoClassSelector:Qa,PseudoElementSelector:Ja,Ratio:nl,Raw:ol,Rule:ul,Scope:fl,Selector:dl,SelectorList:gl,String:vl,StyleSheet:xl,SupportsDeclaration:Al,TypeSelector:Ol,UnicodeRange:Il,Url:zl,Value:Bl,WhiteSpace:Vl}),Yl={generic:!0,cssWideKeywords:ns,...Fi,node:$l}
function Xl(e){switch(this.tokenType){case 4:return this.Hash()
case nn:return this.Operator()
case on:return this.Parentheses(this.readSequence,e.recognizer)
case rn:return this.Brackets(this.readSequence,e.recognizer)
case 5:return this.String()
case Kt:return this.Dimension()
case Qt:return this.Percentage()
case Ht:return this.Number()
case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer)
case 7:return this.Url()
case 1:return this.cmpChar(this.tokenStart,117)&&this.cmpChar(this.tokenStart+1,43)?this.UnicodeRange():this.Identifier()
case 9:{const e=this.charCodeAt(this.tokenStart)
if(47===e||42===e||43===e||45===e)return this.Operator()
35===e&&this.error("Hex or identifier is expected",this.tokenStart+1)
break}}}var Hl={getNode:Xl}
var Ql={onWhiteSpace:function(e,t){null!==t.last&&"Combinator"!==t.last.type&&null!==e&&"Combinator"!==e.type&&t.push({type:"Combinator",loc:null,name:" "})},getNode:function(){switch(this.tokenType){case rn:return this.AttributeSelector()
case 4:return this.IdSelector()
case en:return this.lookupType(1)===en?this.PseudoElementSelector():this.PseudoClassSelector()
case 1:return this.TypeSelector()
case Ht:case Qt:return this.Percentage()
case Kt:46===this.charCodeAt(this.tokenStart)&&this.error("Identifier is expected",this.tokenStart+1)
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 43:case 62:case 126:case 47:return this.Combinator()
case 46:return this.ClassSelector()
case 42:case 124:return this.TypeSelector()
case 35:return this.IdSelector()
case 38:return this.NestingSelector()}break}}}
function Kl(e){return null!==e&&"Operator"===e.type&&("-"===e.value[e.value.length-1]||"+"===e.value[e.value.length-1])}var Zl={getNode:Xl,onWhiteSpace(e,t){Kl(e)&&(e.value=" "+e.value),Kl(t.last)&&(t.last.value+=" ")},expression:function(){return this.createSingleNodeList(this.Raw(null,!1))},var:function(){const e=this.createList()
if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===nn){e.push(this.Operator())
const t=this.tokenIndex,n=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)
if("Value"===n.type&&n.children.isEmpty)for(let e=t-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Zt){n.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}e.push(n)}return e}},Jl=Object.freeze({__proto__:null,AtrulePrelude:Hl,Selector:Ql,Value:Zl})
const ec=new Set(["none","and","not","or"])
var tc={parse:{prelude(){const e=this.createList()
if(1===this.tokenType){const t=this.substring(this.tokenStart,this.tokenEnd)
ec.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}},nc={parse:{prelude:null,block(){return this.Block(!0)}}}
function rc(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==an&&this.error()}},t||(()=>this.Raw(null,!0)))}const sc={layer(){this.skipSC()
const e=this.createList(),t=rc.call(this,this.Layer)
return"Raw"===t.type&&""===t.value||e.push(t),e},supports(){this.skipSC()
const e=this.createList(),t=rc.call(this,this.Declaration,()=>rc.call(this,()=>this.Condition("supports")))
return"Raw"===t.type&&""===t.value||e.push(t),e}}
var ic={container:tc,"font-face":nc,import:{parse:{prelude(){const e=this.createList()
switch(this.tokenType){case 5:e.push(this.String())
break
case 7:case 2:e.push(this.Url())
break
default:this.error("String or url() is expected")}return this.skipSC(),1===this.tokenType&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):2===this.tokenType&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,sc)),this.skipSC(),2===this.tokenType&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,sc)),1!==this.lookupNonWSType(0)&&this.lookupNonWSType(0)!==on||e.push(this.MediaQueryList()),e},block:null}},layer:{parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}},media:{parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}},nest:{parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}},page:{parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}},scope:{parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}},"starting-style":{parse:{prelude:null,block(e=!1){return this.Block(e)}}},supports:{parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}}}
const oc={parse(){return this.createSingleNodeList(this.SelectorList())}},ac={parse(){return this.createSingleNodeList(this.Selector())}},lc={parse(){return this.createSingleNodeList(this.Identifier())}},cc={parse:function(){const e=this.createList()
this.skipSC()
e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier())
break
case 5:e.push(this.String())
break
case nn:e.push(this.Operator())
break
case an:break e
default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}},uc={parse(){return this.createSingleNodeList(this.Nth())}}
var hc={dir:lc,has:oc,lang:cc,matches:oc,is:oc,"-moz-any":oc,"-webkit-any":oc,where:oc,not:oc,"nth-child":uc,"nth-last-child":uc,"nth-last-of-type":uc,"nth-of-type":uc,slotted:ac,host:ac,"host-context":ac},fc=Object.freeze({__proto__:null,AnPlusB:Xi,Atrule:Ji,AtrulePrelude:to,AttributeSelector:oo,Block:fo,Brackets:mo,CDC:yo,CDO:ko,ClassSelector:wo,Combinator:Ao,Comment:Eo,Condition:Mo,Declaration:Go,DeclarationList:Vo,Dimension:Xo,Feature:Ko,FeatureFunction:ta,FeatureRange:oa,Function:ca,GeneralEnclosed:fa,Hash:ma,IdSelector:Sa,Identifier:ba,Layer:Ca,LayerList:_a,MediaQuery:Oa,MediaQueryList:La,NestingSelector:Da,Nth:ja,Number:Fa,Operator:Ba,Parentheses:qa,Percentage:$a,PseudoClassSelector:Ha,PseudoElementSelector:Za,Ratio:tl,Raw:il,Rule:cl,Scope:hl,Selector:pl,SelectorList:ml,String:kl,StyleSheet:wl,SupportsDeclaration:Cl,TypeSelector:El,UnicodeRange:jl,Url:Fl,Value:Gl,WhiteSpace:Wl}),pc=(e=>Ei(Ti({},e)))({...Yl,...{parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Jl,atrule:ic,pseudo:hc,node:fc},...{node:$l}})
const dc=r(import.meta.url),{version:mc}=dc("../package.json")
function gc(e){const t={}
for(const n of Object.keys(e)){let r=e[n]
r&&(Array.isArray(r)||r instanceof Xn?r=r.map(gc):r.constructor===Object&&(r=gc(r))),t[n]=r}return t}const{tokenize:yc,parse:bc,generate:kc,lexer:vc,createLexer:Sc,walk:wc,find:xc,findLast:Cc,findAll:Ac,toPlainObject:_c,fromPlainObject:Tc,fork:Ec}=pc,Oc=r(import.meta.url),{version:Pc}=Oc("../package.json"),Lc=10,Nc=11,Dc=12,Mc=13,jc=15,Ic=16,Rc=17,Fc=18,zc=19,Gc=20,Bc=21,Uc=22,qc=23,Wc=24,Vc=25
function $c(e){return e>=0x0030&&e<=0x0039}function Yc(e){return $c(e)||e>=0x0041&&e<=0x0046||e>=0x0061&&e<=0x0066}function Xc(e){return e>=0x0041&&e<=0x005A}function Hc(e){return function(e){return Xc(e)||function(e){return e>=0x0061&&e<=0x007A}(e)}(e)||function(e){return e>=0x0080}(e)||0x005F===e}function Qc(e){return Hc(e)||$c(e)||0x002D===e}function Kc(e){return e>=0x0000&&e<=0x0008||0x000B===e||e>=0x000E&&e<=0x001F||0x007F===e}function Zc(e){return 0x000A===e||0x000D===e||0x000C===e}function Jc(e){return Zc(e)||0x0020===e||0x0009===e}function eu(e,t){return 0x005C===e&&(!Zc(t)&&0!==t)}function tu(e,t,n){return 0x002D===e?Hc(t)||0x002D===t||eu(t,n):!!Hc(e)||0x005C===e&&eu(e,t)}function nu(e,t,n){return 0x002B===e||0x002D===e?$c(t)?2:0x002E===t&&$c(n)?3:0:0x002E===e?$c(t)?2:0:$c(e)?1:0}function ru(e){return 0xFEFF===e||0xFFFE===e?1:0}const su=new Array(0x80),iu=0x82
for(let e=0;e<su.length;e++)su[e]=(Jc(e)?iu:$c(e)&&131)||Hc(e)&&132||Kc(e)&&133||e||128
function ou(e){return e<0x80?su[e]:132}function au(e,t){return t<e.length?e.charCodeAt(t):0}function lu(e,t,n){return 13===n&&10===au(e,t+1)?2:1}function cu(e,t,n){let r=e.charCodeAt(t)
return Xc(r)&&(r|=32),r===n}function uu(e,t,n,r){if(n-t!==r.length)return!1
if(t<0||n>e.length)return!1
for(let s=t;s<n;s++){const n=r.charCodeAt(s-t)
let i=e.charCodeAt(s)
if(Xc(i)&&(i|=32),i!==n)return!1}return!0}function hu(e,t){for(;t<e.length&&Jc(e.charCodeAt(t));t++);return t}function fu(e,t){for(;t<e.length&&$c(e.charCodeAt(t));t++);return t}function pu(e,t){if(Yc(au(e,(t+=2)-1))){for(const n=Math.min(e.length,t+5);t<n&&Yc(au(e,t));t++);const n=au(e,t)
Jc(n)&&(t+=lu(e,t,n))}return t}function du(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(!Qc(n)){if(!eu(n,au(e,t+1)))break
t=pu(e,t)-1}}return t}function mu(e,t){let n=e.charCodeAt(t)
if(0x002B!==n&&0x002D!==n||(n=e.charCodeAt(t+=1)),$c(n)&&(t=fu(e,t+1),n=e.charCodeAt(t)),0x002E===n&&$c(e.charCodeAt(t+1))&&(t=fu(e,t+=2)),cu(e,t,101)){let r=0
n=e.charCodeAt(t+1),0x002D!==n&&0x002B!==n||(r=1,n=e.charCodeAt(t+2)),$c(n)&&(t=fu(e,t+1+r+1))}return t}function gu(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(0x0029===n){t++
break}eu(n,au(e,t+1))&&(t=pu(e,t))}return t}function yu(e){if(1===e.length&&!Yc(e.charCodeAt(0)))return e[0]
let t=parseInt(e,16)
return(0===t||t>=0xD800&&t<=0xDFFF||t>0x10FFFF)&&(t=0xFFFD),String.fromCodePoint(t)}var bu=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token"]
function ku(e=null,t){return null===e||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}function vu(e){const t=e.source,n=t.length,r=t.length>0?ru(t.charCodeAt(0)):0,s=ku(e.lines,n),i=ku(e.columns,n)
let o=e.startLine,a=e.startColumn
for(let e=r;e<n;e++){const r=t.charCodeAt(e)
s[e]=o,i[e]=a++,10!==r&&13!==r&&12!==r||(13===r&&e+1<n&&10===t.charCodeAt(e+1)&&(e++,s[e]=o,i[e]=a),o++,a=1)}s[n]=o,i[n]=a,e.lines=s,e.columns=i,e.computed=!0}class Su{constructor(){this.lines=null,this.columns=null,this.computed=!1}setSource(e,t=0,n=1,r=1){this.source=e,this.startOffset=t,this.startLine=n,this.startColumn=r,this.computed=!1}getLocation(e,t){return this.computed||vu(this),{source:t,offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]}}getLocationRange(e,t,n){return this.computed||vu(this),{source:n,start:{offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]},end:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}}}const wu=0x00FFFFFF,xu=24,Cu=new Map([[2,Uc],[Bc,Uc],[zc,Gc],[qc,Wc]])
class Au{constructor(e,t){this.setSource(e,t)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(e="",t=()=>{}){const n=(e=String(e||"")).length,r=ku(this.offsetAndType,e.length+1),s=ku(this.balance,e.length+1)
let i=0,o=0,a=0,l=-1
for(this.offsetAndType=null,this.balance=null,t(e,(e,t,c)=>{switch(e){default:s[i]=n
break
case o:{let e=a&wu
for(a=s[e],o=a>>xu,s[i]=e,s[e++]=i;e<i;e++)s[e]===n&&(s[e]=i)
break}case Bc:case 2:case zc:case qc:s[i]=a,o=Cu.get(e),a=o<<xu|i}r[i++]=e<<xu|c,-1===l&&(l=t)}),r[i]=0|n,s[i]=n,s[n]=n;0!==a;){const e=a&wu
a=s[e],s[e]=n}this.source=e,this.firstCharOffset=-1===l?0:l,this.tokenCount=i,this.offsetAndType=r,this.balance=s,this.reset(),this.next()}lookupType(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e]>>xu:0}lookupOffset(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e-1]&wu:this.source.length}lookupValue(e,t){return(e+=this.tokenIndex)<this.tokenCount&&uu(this.source,this.offsetAndType[e-1]&wu,this.offsetAndType[e]&wu,t)}getTokenStart(e){return e===this.tokenIndex?this.tokenStart:e>0?e<this.tokenCount?this.offsetAndType[e-1]&wu:this.offsetAndType[this.tokenCount]&wu:this.firstCharOffset}substrToCursor(e){return this.source.substring(e,this.tokenStart)}isBalanceEdge(e){return this.balance[this.tokenIndex]<e}isDelim(e,t){return t?9===this.lookupType(t)&&this.source.charCodeAt(this.lookupOffset(t))===e:9===this.tokenType&&this.source.charCodeAt(this.tokenStart)===e}skip(e){let t=this.tokenIndex+e
t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.offsetAndType[t-1]&wu,t=this.offsetAndType[t],this.tokenType=t>>xu,this.tokenEnd=t&wu):(this.tokenIndex=this.tokenCount,this.next())}next(){let e=this.tokenIndex+1
e<this.tokenCount?(this.tokenIndex=e,this.tokenStart=this.tokenEnd,e=this.offsetAndType[e],this.tokenType=e>>xu,this.tokenEnd=e&wu):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===Mc||this.tokenType===Vc;)this.next()}skipUntilBalanced(e,t){let n,r,s=e
e:for(;s<this.tokenCount&&(n=this.balance[s],!(n<e));s++)switch(r=s>0?this.offsetAndType[s-1]&wu:this.firstCharOffset,t(this.source.charCodeAt(r))){case 1:break e
case 2:s++
break e
default:this.balance[n]===s&&(s=n)}this.skip(s-this.tokenIndex)}forEachToken(e){for(let t=0,n=this.firstCharOffset;t<this.tokenCount;t++){const r=n,s=this.offsetAndType[t],i=s&wu
n=i,e(s>>xu,r,i,t)}}dump(){const e=new Array(this.tokenCount)
return this.forEachToken((t,n,r,s)=>{e[s]={idx:s,type:bu[t],chunk:this.source.substring(n,r),balance:this.balance[s]}}),e}}function _u(e,t){function n(t){return t<o?e.charCodeAt(t):0}function r(){return c=mu(e,c),tu(n(c),n(c+1),n(c+2))?(a=Dc,c=du(e,c),void 0):0x0025===n(c)?(a=Nc,c++,void 0):(a=Lc,void 0)}function s(){const t=c
return c=du(e,c),uu(e,t,c,"url")&&0x0028===n(c)?(c=hu(e,c+1),0x0022===n(c)||0x0027===n(c)?(a=2,c=t+4,void 0):(!function(){for(a=7,c=hu(e,c);c<e.length;c++){const t=e.charCodeAt(c)
switch(ou(t)){case 0x0029:return c++,void 0
case iu:return c=hu(e,c),0x0029===n(c)||c>=e.length?(c<e.length&&c++,void 0):(c=gu(e,c),a=8,void 0)
case 0x0022:case 0x0027:case 0x0028:case 133:return c=gu(e,c),a=8,void 0
case 0x005C:if(eu(t,n(c+1))){c=pu(e,c)-1
break}return c=gu(e,c),a=8,void 0}}}(),void 0)):0x0028===n(c)?(a=2,c++,void 0):(a=1,void 0)}function i(t){for(t||(t=n(c++)),a=5;c<e.length;c++){const r=e.charCodeAt(c)
switch(ou(r)){case t:return c++,void 0
case iu:if(Zc(r))return c+=lu(e,c,r),a=6,void 0
break
case 0x005C:if(c===e.length-1)break
const s=n(c+1)
Zc(s)?c+=lu(e,c+1,s):eu(r,s)&&(c=pu(e,c)-1)}}}const o=(e=String(e||"")).length
let a,l=ru(n(0)),c=l
for(;c<o;){const o=e.charCodeAt(c)
switch(ou(o)){case iu:a=Mc,c=hu(e,c+1)
break
case 0x0022:i()
break
case 0x0023:Qc(n(c+1))||eu(n(c+1),n(c+2))?(a=4,c=du(e,c+1)):(a=9,c++)
break
case 0x0027:i()
break
case 0x0028:a=Bc,c++
break
case 0x0029:a=Uc,c++
break
case 0x002B:nu(o,n(c+1),n(c+2))?r():(a=9,c++)
break
case 0x002C:a=Fc,c++
break
case 0x002D:nu(o,n(c+1),n(c+2))?r():0x002D===n(c+1)&&0x003E===n(c+2)?(a=jc,c+=3):tu(o,n(c+1),n(c+2))?s():(a=9,c++)
break
case 0x002E:nu(o,n(c+1),n(c+2))?r():(a=9,c++)
break
case 0x002F:0x002A===n(c+1)?(a=Vc,c=e.indexOf("*/",c+2),c=-1===c?e.length:c+2):(a=9,c++)
break
case 0x003A:a=Ic,c++
break
case 0x003B:a=Rc,c++
break
case 0x003C:0x0021===n(c+1)&&0x002D===n(c+2)&&0x002D===n(c+3)?(a=14,c+=4):(a=9,c++)
break
case 0x0040:tu(n(c+1),n(c+2),n(c+3))?(a=3,c=du(e,c+1)):(a=9,c++)
break
case 0x005B:a=zc,c++
break
case 0x005C:eu(o,n(c+1))?s():(a=9,c++)
break
case 0x005D:a=Gc,c++
break
case 0x007B:a=qc,c++
break
case 0x007D:a=Wc,c++
break
case 131:r()
break
case 132:s()
break
default:a=9,c++}t(a,l,l=c)}}let Tu=null
class Eu{static createItem(e){return{prev:null,next:null,data:e}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(e){return Eu.createItem(e)}allocateCursor(e,t){let n
return null!==Tu?(n=Tu,Tu=Tu.cursor,n.prev=e,n.next=t,n.cursor=this.cursor):n={prev:e,next:t,cursor:this.cursor},this.cursor=n,n}releaseCursor(){const{cursor:e}=this
this.cursor=e.cursor,e.prev=null,e.next=null,e.cursor=Tu,Tu=e}updateCursors(e,t,n,r){let{cursor:s}=this
for(;null!==s;)s.prev===e&&(s.prev=t),s.next===n&&(s.next=r),s=s.cursor}*[Symbol.iterator](){for(let e=this.head;null!==e;e=e.next)yield e.data}get size(){let e=0
for(let t=this.head;null!==t;t=t.next)e++
return e}get isEmpty(){return null===this.head}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(e){let t=null
this.head=null
for(let n of e){const e=Eu.createItem(n)
null!==t?t.next=e:this.head=e,e.prev=t,t=e}return this.tail=t,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(e,t=this){const n=this.allocateCursor(null,this.head)
for(;null!==n.next;){const r=n.next
n.next=r.next,e.call(t,r.data,r,this)}this.releaseCursor()}forEachRight(e,t=this){const n=this.allocateCursor(this.tail,null)
for(;null!==n.prev;){const r=n.prev
n.prev=r.prev,e.call(t,r.data,r,this)}this.releaseCursor()}reduce(e,t,n=this){let r,s=this.allocateCursor(null,this.head),i=t
for(;null!==s.next;)r=s.next,s.next=r.next,i=e.call(n,i,r.data,r,this)
return this.releaseCursor(),i}reduceRight(e,t,n=this){let r,s=this.allocateCursor(this.tail,null),i=t
for(;null!==s.prev;)r=s.prev,s.prev=r.prev,i=e.call(n,i,r.data,r,this)
return this.releaseCursor(),i}some(e,t=this){for(let n=this.head;null!==n;n=n.next)if(e.call(t,n.data,n,this))return!0
return!1}map(e,t=this){const n=new Eu
for(let r=this.head;null!==r;r=r.next)n.appendData(e.call(t,r.data,r,this))
return n}filter(e,t=this){const n=new Eu
for(let r=this.head;null!==r;r=r.next)e.call(t,r.data,r,this)&&n.appendData(r.data)
return n}nextUntil(e,t,n=this){if(null===e)return
const r=this.allocateCursor(null,e)
for(;null!==r.next;){const e=r.next
if(r.next=e.next,t.call(n,e.data,e,this))break}this.releaseCursor()}prevUntil(e,t,n=this){if(null===e)return
const r=this.allocateCursor(e,null)
for(;null!==r.prev;){const e=r.prev
if(r.prev=e.prev,t.call(n,e.data,e,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){const e=new Eu
for(let t of this)e.appendData(t)
return e}prepend(e){return this.updateCursors(null,e,this.head,e),null!==this.head?(this.head.prev=e,e.next=this.head):this.tail=e,this.head=e,this}prependData(e){return this.prepend(Eu.createItem(e))}append(e){return this.insert(e)}appendData(e){return this.insert(Eu.createItem(e))}insert(e,t=null){if(null!==t)if(this.updateCursors(t.prev,e,t,e),null===t.prev){if(this.head!==t)throw new Error("before doesn't belong to list")
this.head=e,t.prev=e,e.next=t,this.updateCursors(null,e)}else t.prev.next=e,e.prev=t.prev,t.prev=e,e.next=t
else this.updateCursors(this.tail,e,null,e),null!==this.tail?(this.tail.next=e,e.prev=this.tail):this.head=e,this.tail=e
return this}insertData(e,t){return this.insert(Eu.createItem(e),t)}remove(e){if(this.updateCursors(e,e.prev,e,e.next),null!==e.prev)e.prev.next=e.next
else{if(this.head!==e)throw new Error("item doesn't belong to list")
this.head=e.next}if(null!==e.next)e.next.prev=e.prev
else{if(this.tail!==e)throw new Error("item doesn't belong to list")
this.tail=e.prev}return e.prev=null,e.next=null,e}push(e){this.insert(Eu.createItem(e))}pop(){return null!==this.tail?this.remove(this.tail):null}unshift(e){this.prepend(Eu.createItem(e))}shift(){return null!==this.head?this.remove(this.head):null}prependList(e){return this.insertList(e,this.head)}appendList(e){return this.insertList(e)}insertList(e,t){return null===e.head||(null!=t?(this.updateCursors(t.prev,e.tail,t,e.head),null!==t.prev?(t.prev.next=e.head,e.head.prev=t.prev):this.head=e.head,t.prev=e.tail,e.tail.next=t):(this.updateCursors(this.tail,e.tail,null,e.head),null!==this.tail?(this.tail.next=e.head,e.head.prev=this.tail):this.head=e.head,this.tail=e.tail),e.head=null,e.tail=null),this}replace(e,t){"head"in t?this.insertList(t,e):this.insert(t,e),this.remove(e)}}function Ou(e,t){const n=Object.create(SyntaxError.prototype),r=new Error
return Object.assign(n,{name:e,message:t,get stack(){return(r.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}\n`)}})}const Pu="    "
function Lu({source:e,line:t,column:n},r){function s(e,t){return i.slice(e,t).map((t,n)=>String(e+n+1).padStart(l)+" |"+t).join("\n")}const i=e.split(/\r\n?|\n|\f/),o=Math.max(1,t-r)-1,a=Math.min(t+r,i.length+1),l=Math.max(4,String(a).length)+1
let c=0;(n+=3*(i[t-1].substr(0,n-1).match(/\t/g)||[]).length)>100&&(c=n-60+3,n=58)
for(let e=o;e<=a;e++)e>=0&&e<i.length&&(i[e]=i[e].replace(/\t/g,Pu),i[e]=(c>0&&i[e].length>c?"…":"")+i[e].substr(c,98)+(i[e].length>c+100-1?"…":""))
return[s(o,t),new Array(n+l+2).join("-")+"^",s(t,a)].filter(Boolean).join("\n")}function Nu(e,t,n,r,s){return Object.assign(Ou("SyntaxError",e),{source:t,offset:n,line:r,column:s,sourceFragment:e=>Lu({source:t,line:r,column:s},isNaN(e)?0:e),get formattedMessage(){return`Parse error: ${e}\n`+Lu({source:t,line:r,column:s},2)}})}function Du(e){const t=this.createList()
let n=!1
const r={recognizer:e}
for(;!this.eof;){switch(this.tokenType){case Vc:this.next()
continue
case Mc:n=!0,this.next()
continue}let s=e.getNode.call(this,r)
if(void 0===s)break
n&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,s,t,r),n=!1),t.push(s)}return n&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,r),t}const Mu=()=>{}
function ju(e){return function(){return this[e]()}}function Iu(e){const t=Object.create(null)
for(const n in e){const r=e[n],s=r.parse||r
s&&(t[n]=s)}return t}function Ru(e){let t="",n="<unknown>",r=!1,s=Mu,i=!1
const o=new Su,a=Object.assign(new Au,function(e){const t={context:Object.create(null),scope:Object.assign(Object.create(null),e.scope),atrule:Iu(e.atrule),pseudo:Iu(e.pseudo),node:Iu(e.node)}
for(const n in e.parseContext)switch(typeof e.parseContext[n]){case"function":t.context[n]=e.parseContext[n]
break
case"string":t.context[n]=ju(e.parseContext[n])}return{config:t,...t,...t.node}}(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:Du,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket:e=>123===e?1:0,consumeUntilLeftCurlyBracketOrSemicolon:e=>123===e||59===e?1:0,consumeUntilExclamationMarkOrSemicolon:e=>33===e||59===e?1:0,consumeUntilSemicolonIncluded:e=>59===e?2:0,createList:()=>new Eu,createSingleNodeList:e=>(new Eu).appendData(e),getFirstListNode:e=>e&&e.first,getLastListNode:e=>e&&e.last,parseWithFallback(e,t){const n=this.tokenIndex
try{return e.call(this)}catch(e){if(i)throw e
const r=t.call(this,n)
return i=!0,s(e,r),i=!1,r}},lookupNonWSType(e){let t
do{if(t=this.lookupType(e++),t!==Mc)return t}while(0!==t)
return 0},charCodeAt:e=>e>=0&&e<t.length?t.charCodeAt(e):0,substring:(e,n)=>t.substring(e,n),substrToCursor(e){return this.source.substring(e,this.tokenStart)},cmpChar:(e,n)=>cu(t,e,n),cmpStr:(e,n,r)=>uu(t,e,n,r),consume(e){const t=this.tokenStart
return this.eat(e),this.substrToCursor(t)},consumeFunctionName(){const e=t.substring(this.tokenStart,this.tokenEnd-1)
return this.eat(2),e},consumeNumber(e){const n=t.substring(this.tokenStart,mu(t,this.tokenStart))
return this.eat(e),n},eat(e){if(this.tokenType!==e){const t=bu[e].slice(0,-6).replace(/-/g," ").replace(/^./,e=>e.toUpperCase())
let n=`${/[[\](){}]/.test(t)?`"${t}"`:t} is expected`,r=this.tokenStart
switch(e){case 1:2===this.tokenType||7===this.tokenType?(r=this.tokenEnd-1,n="Identifier is expected but function found"):n="Identifier is expected"
break
case 4:this.isDelim(35)&&(this.next(),r++,n="Name is expected")
break
case Nc:this.tokenType===Lc&&(r=this.tokenEnd,n="Percent sign is expected")}this.error(n,r)}this.next()},eatIdent(e){1===this.tokenType&&!1!==this.lookupValue(0,e)||this.error(`Identifier "${e}" is expected`),this.next()},eatDelim(e){this.isDelim(e)||this.error(`Delim "${String.fromCharCode(e)}" is expected`),this.next()},getLocation:(e,t)=>r?o.getLocationRange(e,t,n):null,getLocationFromList(e){if(r){const t=this.getFirstListNode(e),r=this.getLastListNode(e)
return o.getLocationRange(null!==t?t.loc.start.offset-o.startOffset:this.tokenStart,null!==r?r.loc.end.offset-o.startOffset:this.tokenStart,n)}return null},error(e,n){const r=void 0!==n&&n<t.length?o.getLocation(n):this.eof?o.getLocation(function(e,t){for(;t>=0&&Jc(e.charCodeAt(t));t--);return t+1}(t,t.length-1)):o.getLocation(this.tokenStart)
throw new Nu(e||"Unexpected input",t,r.offset,r.line,r.column)}})
return Object.assign(function(e,l){t=e,l=l||{},a.setSource(t,_u),o.setSource(t,l.offset,l.line,l.column),n=l.filename||"<unknown>",r=Boolean(l.positions),s="function"==typeof l.onParseError?l.onParseError:Mu,i=!1,a.parseAtrulePrelude=!("parseAtrulePrelude"in l)||Boolean(l.parseAtrulePrelude),a.parseRulePrelude=!("parseRulePrelude"in l)||Boolean(l.parseRulePrelude),a.parseValue=!("parseValue"in l)||Boolean(l.parseValue),a.parseCustomProperty="parseCustomProperty"in l&&Boolean(l.parseCustomProperty)
const{context:c="default",onComment:u}=l
if(c in a.context==!1)throw new Error("Unknown context `"+c+"`")
"function"==typeof u&&a.forEachToken((e,n,r)=>{if(e===Vc){const e=a.getLocation(n,r),s=uu(t,r-2,r,"*/")?t.slice(n+2,r-2):t.slice(n+2,r)
u(s,e)}})
const h=a.context[c].call(a,l)
return a.eof||a.error(),h},{SyntaxError:Nu,config:a.config})}const Fu=new Set(["Atrule","Selector","Declaration"])
const zu=(e,t)=>{if(9===e&&(e=t),"string"==typeof e){const t=e.charCodeAt(0)
return t>0x7F?0x8000:t<<8}return e},Gu=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,Lc],[1,Nc],[1,Dc],[1,jc],[1,Bc],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,Lc],[3,Nc],[3,Dc],[3,jc],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,Lc],[4,Nc],[4,Dc],[4,jc],[Dc,1],[Dc,2],[Dc,7],[Dc,8],[Dc,"-"],[Dc,Lc],[Dc,Nc],[Dc,Dc],[Dc,jc],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",Lc],["#",Nc],["#",Dc],["#",jc],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",Lc],["-",Nc],["-",Dc],["-",jc],[Lc,1],[Lc,2],[Lc,7],[Lc,8],[Lc,Lc],[Lc,Nc],[Lc,Dc],[Lc,"%"],[Lc,jc],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",jc],[".",Lc],[".",Nc],[".",Dc],["+",Lc],["+",Nc],["+",Dc],["/","*"]],Bu=Gu.concat([[1,4],[Dc,4],[4,4],[3,Bc],[3,5],[3,Ic],[Nc,Nc],[Nc,Dc],[Nc,2],[Nc,"-"],[Uc,1],[Uc,2],[Uc,Nc],[Uc,Dc],[Uc,4],[Uc,"-"]])
function Uu(e){const t=new Set(e.map(([e,t])=>zu(e)<<16|zu(t)))
return function(e,n,r){const s=zu(n,r),i=r.charCodeAt(0)
return(45===i&&1!==n&&2!==n&&n!==jc||43===i?t.has(e<<16|i<<8):t.has(e<<16|s))&&this.emit(" ",Mc,!0),s}}const qu=Uu(Gu),Wu=Uu(Bu)
var Vu=Object.freeze({__proto__:null,safe:Wu,spec:qu})
function $u(e,t){if("function"==typeof t){let n=null
return e.children.forEach(e=>{null!==n&&t.call(this,n),this.node(e),n=e}),void 0}e.children.forEach(this.node,this)}function Yu(e){_u(e,(t,n,r)=>{this.token(t,e.slice(n,r))})}function Xu(e){const t=new Map
for(let n in e.node){const r=e.node[n]
"function"==typeof(r.generate||r)&&t.set(n,r.generate||r)}return function(e,n){let r="",s=0,i={node(e){if(!t.has(e.type))throw new Error("Unknown node type: "+e.type)
t.get(e.type).call(o,e)},tokenBefore:Wu,token(e,t){s=this.tokenBefore(s,e,t),this.emit(t,e,!1),9===e&&92===t.charCodeAt(0)&&this.emit("\n",Mc,!0)},emit(e){r+=e},result:()=>r}
n&&("function"==typeof n.decorator&&(i=n.decorator(i)),n.sourceMap&&(i=function(e){const t=new wr,n={line:1,column:0},r={line:0,column:0},s={line:1,column:0},i={generated:s}
let o=1,a=0,l=!1
const c=e.node
e.node=function(e){if(e.loc&&e.loc.start&&Fu.has(e.type)){const c=e.loc.start.line,u=e.loc.start.column-1
r.line===c&&r.column===u||(r.line=c,r.column=u,n.line=o,n.column=a,l&&(l=!1,n.line===s.line&&n.column===s.column||t.addMapping(i)),l=!0,t.addMapping({source:e.loc.source,original:r,generated:n}))}c.call(this,e),l&&Fu.has(e.type)&&(s.line=o,s.column=a)}
const u=e.emit
e.emit=function(e,t,n){for(let t=0;t<e.length;t++)10===e.charCodeAt(t)?(o++,a=0):a++
u(e,t,n)}
const h=e.result
return e.result=function(){return l&&t.addMapping(i),{css:h(),map:t}},e}(i)),n.mode in Vu&&(i.tokenBefore=Vu[n.mode]))
const o={node:e=>i.node(e),children:$u,token:(e,t)=>i.token(e,t),tokenize:Yu}
return i.node(e),i.result()}}const{hasOwnProperty:Hu}=Object.prototype,Qu=function(){}
function Ku(e){return"function"==typeof e?e:Qu}function Zu(e,t){return function(n,r,s){n.type===t&&e.call(this,n,r,s)}}function Ju(e,t){const n=t.structure,r=[]
for(const e in n){if(!1===Hu.call(n,e))continue
let t=n[e]
const s={name:e,type:!1,nullable:!1}
Array.isArray(t)||(t=[t])
for(const e of t)null===e?s.nullable=!0:"string"==typeof e?s.type="node":Array.isArray(e)&&(s.type="list")
s.type&&r.push(s)}return r.length?{context:t.walkContext,fields:r}:null}function eh(e,t){const n=e.fields.slice(),r=e.context,s="string"==typeof r
return t&&n.reverse(),function(e,i,o,a){let l
s&&(l=i[r],i[r]=e)
for(const r of n){const n=e[r.name]
if(!r.nullable||n)if("list"===r.type){if(t?n.reduceRight(a,!1):n.reduce(a,!1))return!0}else if(o(n))return!0}s&&(i[r]=l)}}function th({StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:s}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Rule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Declaration:{StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:s}}}function nh(e){const t=function(e){const t={}
for(const n in e.node)if(Hu.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=Ju(0,r)}return t}(e),n={},r={},s=Symbol("break-walk"),i=Symbol("skip-node")
for(const e in t)Hu.call(t,e)&&null!==t[e]&&(n[e]=eh(t[e],!1),r[e]=eh(t[e],!0))
const o=th(n),a=th(r),l=function(e,l){function c(e,t,n){const r=u.call(d,e,t,n)
return r===s||r!==i&&(!(!f.hasOwnProperty(e.type)||!f[e.type](e,d,c,p))||h.call(d,e,t,n)===s)}let u=Qu,h=Qu,f=n,p=(e,t,n,r)=>e||c(t,n,r)
const d={break:s,skip:i,root:e,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null}
if("function"==typeof l)u=l
else if(l&&(u=Ku(l.enter),h=Ku(l.leave),l.reverse&&(f=r),l.visit)){if(o.hasOwnProperty(l.visit))f=l.reverse?a[l.visit]:o[l.visit]
else if(!t.hasOwnProperty(l.visit))throw new Error("Bad value `"+l.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")")
u=Zu(u,l.visit),h=Zu(h,l.visit)}if(u===Qu&&h===Qu)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
c(e)}
return l.break=s,l.skip=i,l.find=function(e,t){let n=null
return l(e,function(e,r,i){if(t.call(this,e,r,i))return n=e,s}),n},l.findLast=function(e,t){let n=null
return l(e,{reverse:!0,enter(e,r,i){if(t.call(this,e,r,i))return n=e,s}}),n},l.findAll=function(e,t){const n=[]
return l(e,function(e,r,s){t.call(this,e,r,s)&&n.push(e)}),n},l}function rh(e){return e}function sh(e,t,n,r){let s
switch(e.type){case"Group":s=function(e,t,n,r){const s=" "===e.combinator||r?e.combinator:" "+e.combinator+" ",i=e.terms.map(e=>sh(e,t,n,r)).join(s)
return e.explicit||n?(r||","===i[0]?"[":"[ ")+i+(r?"]":" ]"):i}(e,t,n,r)+(e.disallowEmpty?"!":"")
break
case"Multiplier":return sh(e.term,t,n,r)+t(function(e){const{min:t,max:n,comma:r}=e
return 0===t&&0===n?r?"#?":"*":0===t&&1===n?"?":1===t&&0===n?r?"#":"+":1===t&&1===n?"":(r?"#":"")+(t===n?"{"+t+"}":"{"+t+","+(0!==n?n:"")+"}")}(e),e)
case"Type":s="<"+e.name+(e.opts?t(function(e){if("Range"===e.type)return" ["+(null===e.min?"-∞":e.min)+","+(null===e.max?"∞":e.max)+"]"
throw new Error("Unknown node type `"+e.type+"`")}(e.opts),e.opts):"")+">"
break
case"Property":s="<'"+e.name+"'>"
break
case"Keyword":s=e.name
break
case"AtKeyword":s="@"+e.name
break
case"Function":s=e.name+"("
break
case"String":case"Token":s=e.value
break
case"Comma":s=","
break
default:throw new Error("Unknown node type `"+e.type+"`")}return t(s,e)}function ih(e,t){let n=rh,r=!1,s=!1
return"function"==typeof t?n=t:t&&(r=Boolean(t.forceBraces),s=Boolean(t.compact),"function"==typeof t.decorate&&(n=t.decorate)),sh(e,n,r,s)}const oh={offset:0,line:1,column:1}
function ah(e,t){const n=e&&e.loc&&e.loc[t]
return n?"line"in n?lh(n):n:null}function lh({offset:e,line:t,column:n},r){const s={offset:e,line:t,column:n}
if(r){const e=r.split(/\n|\r\n?|\f/)
s.offset+=r.length,s.line+=e.length-1,s.column=1===e.length?s.column+r.length:e.pop().length+1}return s}const ch=function(e,t){const n=Ou("SyntaxReferenceError",e+(t?" `"+t+"`":""))
return n.reference=t,n},uh=function(e,t,n,r){const s=Ou("SyntaxMatchError",e),{css:i,mismatchOffset:o,mismatchLength:a,start:l,end:c}=function(e,t){const n=e.tokens,r=e.longestMatch,s=r<n.length&&n[r].node||null,i=s!==t?s:null
let o,a,l=0,c=0,u=0,h=""
for(let e=0;e<n.length;e++){const t=n[e].value
e===r&&(c=t.length,l=h.length),null!==i&&n[e].node===i&&(e<=r?u++:u=0),h+=t}return r===n.length||u>1?(o=ah(i||t,"end")||lh(oh,h),a=lh(o)):(o=ah(i,"start")||lh(ah(t,"start")||oh,h.slice(0,l)),a=ah(i,"end")||lh(o,h.substr(l,c))),{css:h,mismatchOffset:l,mismatchLength:c,start:o,end:a}}(r,n)
return s.rawMessage=e,s.syntax=t?ih(t):"<generic>",s.css=i,s.mismatchOffset=o,s.mismatchLength=a,s.message=e+"\n  syntax: "+s.syntax+"\n   value: "+(i||"<empty string>")+"\n  --------"+new Array(s.mismatchOffset+1).join("-")+"^",Object.assign(s,l),s.loc={source:n&&n.loc&&n.loc.source||"<unknown>",start:l,end:c},s},hh=new Map,fh=new Map,ph=function(e){if(hh.has(e))return hh.get(e)
const t=e.toLowerCase()
let n=hh.get(t)
if(void 0===n){const e=mh(t,0),r=e?"":gh(t,0)
n=Object.freeze({basename:t.substr(r.length),name:t,prefix:r,vendor:r,custom:e})}return hh.set(e,n),n},dh=function(e){if(fh.has(e))return fh.get(e)
let t=e,n=e[0]
"/"===n?n="/"===e[1]?"//":"/":"_"!==n&&"*"!==n&&"$"!==n&&"#"!==n&&"+"!==n&&"&"!==n&&(n="")
const r=mh(t,n.length)
if(!r&&(t=t.toLowerCase(),fh.has(t))){const n=fh.get(t)
return fh.set(e,n),n}const s=r?"":gh(t,n.length),i=t.substr(0,n.length+s.length),o=Object.freeze({basename:t.substr(i.length),name:t.substr(n.length),hack:n,vendor:s,prefix:i,custom:r})
return fh.set(e,o),o}
function mh(e,t){return t=t||0,e.length-t>=2&&45===e.charCodeAt(t)&&45===e.charCodeAt(t+1)}function gh(e,t){if(t=t||0,e.length-t>=3&&45===e.charCodeAt(t)&&45!==e.charCodeAt(t+1)){const n=e.indexOf("-",t+2)
if(-1!==n)return e.substring(t,n+1)}return""}const yh=["initial","inherit","unset","revert","revert-layer"],bh=0x002D,kh=!0
function vh(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function Sh(e,t,n){for(;null!==e&&(e.type===Mc||e.type===Vc);)e=n(++t)
return t}function wh(e,t,n,r){if(!e)return 0
const s=e.value.charCodeAt(t)
if(43===s||s===bh){if(n)return 0
t++}for(;t<e.value.length;t++)if(!$c(e.value.charCodeAt(t)))return 0
return r+1}function xh(e,t,n){let r=!1,s=Sh(e,t,n)
if(null===(e=n(s)))return t
if(e.type!==Lc){if(!vh(e,43)&&!vh(e,bh))return t
if(r=!0,s=Sh(n(++s),s,n),null===(e=n(s))||e.type!==Lc)return 0}if(!r){const t=e.value.charCodeAt(0)
if(43!==t&&t!==bh)return 0}return wh(e,r?0:1,r,s)}function Ch(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function Ah(e,t,n){let r=0
for(let s=t;s<e.value.length;s++){const i=e.value.charCodeAt(s)
if(45===i&&n&&0!==r)return Ah(e,t+r+1,!1),6
if(!Yc(i))return 0
if(++r>6)return 0}return r}function _h(e,t,n){if(!e)return 0
for(;Ch(n(t),63);){if(++e>6)return 0
t++}return t}const Th=["calc(","-moz-calc(","-webkit-calc("],Eh=new Map([[2,Uc],[Bc,Uc],[zc,Gc],[qc,Wc]])
function Oh(e,t){return t<e.length?e.charCodeAt(t):0}function Ph(e,t){return uu(e,0,e.length,t)}function Lh(e,t){for(let n=0;n<t.length;n++)if(Ph(e,t[n]))return!0
return!1}function Nh(e,t){return t===e.length-2&&(0x005C===Oh(e,t)&&$c(Oh(e,t+1)))}function Dh(e,t,n){if(e&&"Range"===e.type){const r=Number(void 0!==n&&n!==t.length?t.substr(0,n):t)
if(isNaN(r))return!0
if(null!==e.min&&r<e.min&&"string"!=typeof e.min)return!0
if(null!==e.max&&r>e.max&&"string"!=typeof e.max)return!0}return!1}function Mh(e){return function(t,n,r){return null===t?0:2===t.type&&Lh(t.value,Th)?function(e,t){let n=0,r=[],s=0
e:do{switch(e.type){case Wc:case Uc:case Gc:if(e.type!==n)break e
if(n=r.pop(),0===r.length){s++
break e}break
case 2:case Bc:case zc:case qc:r.push(n),n=Eh.get(e.type)}s++}while(e=t(s))
return s}(t,n):e(t,n,r)}}function jh(e){return function(t){return null===t||t.type!==e?0:1}}function Ih(e){return e&&(e=new Set(e)),function(t,n,r){if(null===t||t.type!==Dc)return 0
const s=mu(t.value,0)
if(null!==e){const n=t.value.indexOf("\\",s),r=-1!==n&&Nh(t.value,n)?t.value.substring(s,n):t.value.substr(s)
if(!1===e.has(r.toLowerCase()))return 0}return Dh(r,t.value,s)?0:1}}function Rh(e){return"function"!=typeof e&&(e=function(){return 0}),function(t,n,r){return null!==t&&t.type===Lc&&0===Number(t.value)?1:e(t,n,r)}}var Fh={"ident-token":jh(1),"function-token":jh(2),"at-keyword-token":jh(3),"hash-token":jh(4),"string-token":jh(5),"bad-string-token":jh(6),"url-token":jh(7),"bad-url-token":jh(8),"delim-token":jh(9),"number-token":jh(Lc),"percentage-token":jh(Nc),"dimension-token":jh(Dc),"whitespace-token":jh(Mc),"CDO-token":jh(14),"CDC-token":jh(jc),"colon-token":jh(Ic),"semicolon-token":jh(Rc),"comma-token":jh(Fc),"[-token":jh(zc),"]-token":jh(Gc),"(-token":jh(Bc),")-token":jh(Uc),"{-token":jh(qc),"}-token":jh(Wc),string:jh(5),ident:jh(1),"custom-ident":function(e){if(null===e||1!==e.type)return 0
const t=e.value.toLowerCase()
return Lh(t,yh)||Ph(t,"default")?0:1},"custom-property-name":function(e){return null===e||1!==e.type||0x002D!==Oh(e.value,0)||0x002D!==Oh(e.value,1)?0:1},"hex-color":function(e){if(null===e||4!==e.type)return 0
const t=e.value.length
if(4!==t&&5!==t&&7!==t&&9!==t)return 0
for(let n=1;n<t;n++)if(!Yc(Oh(e.value,n)))return 0
return 1},"id-selector":function(e){return null===e||4!==e.type?0:tu(Oh(e.value,1),Oh(e.value,2),Oh(e.value,3))?1:0},"an-plus-b":function(e,t){let n=0
if(!e)return 0
if(e.type===Lc)return wh(e,0,false,n)
if(1===e.type&&e.value.charCodeAt(0)===bh){if(!cu(e.value,1,110))return 0
switch(e.value.length){case 2:return xh(t(++n),n,t)
case 3:return e.value.charCodeAt(2)!==bh?0:(n=Sh(t(++n),n,t),wh(e=t(n),0,kh,n))
default:return e.value.charCodeAt(2)!==bh?0:wh(e,3,kh,n)}}else if(1===e.type||vh(e,43)&&1===t(n+1).type){if(1!==e.type&&(e=t(++n)),null===e||!cu(e.value,0,110))return 0
switch(e.value.length){case 1:return xh(t(++n),n,t)
case 2:return e.value.charCodeAt(1)!==bh?0:(n=Sh(t(++n),n,t),wh(e=t(n),0,kh,n))
default:return e.value.charCodeAt(1)!==bh?0:wh(e,2,kh,n)}}else if(e.type===Dc){let r=e.value.charCodeAt(0),s=43===r||r===bh?1:0,i=s
for(;i<e.value.length&&$c(e.value.charCodeAt(i));i++);return i===s?0:cu(e.value,i,110)?i+1===e.value.length?xh(t(++n),n,t):e.value.charCodeAt(i+1)!==bh?0:i+2===e.value.length?(n=Sh(t(++n),n,t),wh(e=t(n),0,kh,n)):wh(e,i+2,kh,n):0}return 0},urange:function(e,t){let n=0
if(null===e||1!==e.type||!cu(e.value,0,117))return 0
if(null===(e=t(++n)))return 0
if(Ch(e,43))return null===(e=t(++n))?0:1===e.type?_h(Ah(e,0,!0),++n,t):Ch(e,63)?_h(1,++n,t):0
if(e.type===Lc){const r=Ah(e,1,!0)
return 0===r?0:null===(e=t(++n))?n:e.type===Dc||e.type===Lc?function(e,t){return e.value.charCodeAt(0)===t}(e,45)&&Ah(e,1,!1)?n+1:0:_h(r,n,t)}return e.type===Dc?_h(Ah(e,1,!0),++n,t):0},"declaration-value":function(e,t){if(!e)return 0
let n=0,r=[],s=0
e:do{switch(e.type){case 6:case 8:break e
case Wc:case Uc:case Gc:if(e.type!==n)break e
n=r.pop()
break
case Rc:if(0===n)break e
break
case 9:if(0===n&&"!"===e.value)break e
break
case 2:case Bc:case zc:case qc:r.push(n),n=Eh.get(e.type)}s++}while(e=t(s))
return s},"any-value":function(e,t){if(!e)return 0
let n=0,r=[],s=0
e:do{switch(e.type){case 6:case 8:break e
case Wc:case Uc:case Gc:if(e.type!==n)break e
n=r.pop()
break
case 2:case Bc:case zc:case qc:r.push(n),n=Eh.get(e.type)}s++}while(e=t(s))
return s},dimension:Mh(Ih(null)),angle:Mh(Ih(["deg","grad","rad","turn"])),decibel:Mh(Ih(["db"])),frequency:Mh(Ih(["hz","khz"])),flex:Mh(Ih(["fr"])),length:Mh(Rh(Ih(["cm","mm","q","in","pt","pc","px","em","rem","ex","rex","cap","rcap","ch","rch","ic","ric","lh","rlh","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax","cqw","cqh","cqi","cqb","cqmin","cqmax"]))),resolution:Mh(Ih(["dpi","dpcm","dppx","x"])),semitones:Mh(Ih(["st"])),time:Mh(Ih(["s","ms"])),percentage:Mh(function(e,t,n){return null===e||e.type!==Nc||Dh(n,e.value,e.value.length-1)?0:1}),zero:Rh(),number:Mh(function(e,t,n){if(null===e)return 0
const r=mu(e.value,0)
return r===e.value.length||Nh(e.value,r)?Dh(n,e.value,r)?0:1:0}),integer:Mh(function(e,t,n){if(null===e||e.type!==Lc)return 0
let r=0x002B===Oh(e.value,0)||0x002D===Oh(e.value,0)?1:0
for(;r<e.value.length;r++)if(!$c(Oh(e.value,r)))return 0
return Dh(n,e.value,r)?0:1})}
function zh(e,t,n){return Object.assign(Ou("SyntaxError",e),{input:t,offset:n,rawMessage:e,message:e+"\n  "+t+"\n--"+new Array((n||t.length)+1).join("-")+"^"})}class Gh{constructor(e){this.str=e,this.pos=0}charCodeAt(e){return e<this.str.length?this.str.charCodeAt(e):0}charCode(){return this.charCodeAt(this.pos)}nextCharCode(){return this.charCodeAt(this.pos+1)}nextNonWsCode(e){return this.charCodeAt(this.findWsEnd(e))}findWsEnd(e){for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(13!==t&&10!==t&&12!==t&&32!==t&&9!==t)break}return e}substringToPos(e){return this.str.substring(this.pos,this.pos=e)}eat(e){this.charCode()!==e&&this.error("Expect `"+String.fromCharCode(e)+"`"),this.pos++}peek(){return this.pos<this.str.length?this.str.charAt(this.pos++):""}error(e){throw new zh(e,this.str,this.pos)}}const Bh=123,Uh=new Uint8Array(128).map((e,t)=>/[a-zA-Z0-9\-]/.test(String.fromCharCode(t))?1:0),qh={" ":1,"&&":2,"||":3,"|":4}
function Wh(e){return e.substringToPos(e.findWsEnd(e.pos))}function Vh(e){let t=e.pos
for(;t<e.str.length;t++){const n=e.str.charCodeAt(t)
if(n>=128||0===Uh[n])break}return e.pos===t&&e.error("Expect a keyword"),e.substringToPos(t)}function $h(e){let t=e.pos
for(;t<e.str.length;t++){const n=e.str.charCodeAt(t)
if(n<48||n>57)break}return e.pos===t&&e.error("Expect a number"),e.substringToPos(t)}function Yh(e){const t=e.str.indexOf("'",e.pos+1)
return-1===t&&(e.pos=e.str.length,e.error("Expect an apostrophe")),e.substringToPos(t+1)}function Xh(e){let t=null,n=null
return e.eat(Bh),t=$h(e),44===e.charCode()?(e.pos++,125!==e.charCode()&&(n=$h(e))):n=t,e.eat(125),{min:Number(t),max:n?Number(n):0}}function Hh(e,t){const n=function(e){let t=null,n=!1
switch(e.charCode()){case 42:e.pos++,t={min:0,max:0}
break
case 43:e.pos++,t={min:1,max:0}
break
case 63:e.pos++,t={min:0,max:1}
break
case 35:e.pos++,n=!0,e.charCode()===Bh?t=Xh(e):63===e.charCode()?(e.pos++,t={min:0,max:0}):t={min:1,max:0}
break
case Bh:t=Xh(e)
break
default:return null}return{type:"Multiplier",comma:n,min:t.min,max:t.max,term:null}}(e)
return null!==n?(n.term=t,35===e.charCode()&&43===e.charCodeAt(e.pos-1)?Hh(e,n):n):t}function Qh(e){const t=e.peek()
return""===t?null:{type:"Token",value:t}}function Kh(e){let t,n=null
return e.eat(60),t=Vh(e),40===e.charCode()&&41===e.nextCharCode()&&(e.pos+=2,t+="()"),91===e.charCodeAt(e.findWsEnd(e.pos))&&(Wh(e),n=function(e){let t=null,n=null,r=1
return e.eat(91),45===e.charCode()&&(e.peek(),r=-1),-1==r&&8734===e.charCode()?e.peek():(t=r*Number($h(e)),0!==Uh[e.charCode()]&&(t+=Vh(e))),Wh(e),e.eat(44),Wh(e),8734===e.charCode()?e.peek():(r=1,45===e.charCode()&&(e.peek(),r=-1),n=r*Number($h(e)),0!==Uh[e.charCode()]&&(n+=Vh(e))),e.eat(93),{type:"Range",min:t,max:n}}(e)),e.eat(62),Hh(e,{type:"Type",name:t,opts:n})}function Zh(e,t){function n(e,t){return{type:"Group",terms:e,combinator:t,disallowEmpty:!1,explicit:!1}}let r
for(t=Object.keys(t).sort((e,t)=>qh[e]-qh[t]);t.length>0;){r=t.shift()
let s=0,i=0
for(;s<e.length;s++){const t=e[s]
"Combinator"===t.type&&(t.value===r?(-1===i&&(i=s-1),e.splice(s,1),s--):(-1!==i&&s-i>1&&(e.splice(i,s-i,n(e.slice(i,s),r)),s=i+1),i=-1))}-1!==i&&t.length&&e.splice(i,s-i,n(e.slice(i,s),r))}return r}function Jh(e){const t=[],n={}
let r,s=null,i=e.pos
for(;r=ef(e);)"Spaces"!==r.type&&("Combinator"===r.type?(null!==s&&"Combinator"!==s.type||(e.pos=i,e.error("Unexpected combinator")),n[r.value]=!0):null!==s&&"Combinator"!==s.type&&(n[" "]=!0,t.push({type:"Combinator",value:" "})),t.push(r),s=r,i=e.pos)
return null!==s&&"Combinator"===s.type&&(e.pos-=i,e.error("Unexpected combinator")),{type:"Group",terms:t,combinator:Zh(t,n)||" ",disallowEmpty:!1,explicit:!1}}function ef(e){let t=e.charCode()
if(t<128&&1===Uh[t])return function(e){const t=Vh(e)
return 40===e.charCode()?(e.pos++,{type:"Function",name:t}):Hh(e,{type:"Keyword",name:t})}(e)
switch(t){case 93:break
case 91:return Hh(e,function(e){let t
return e.eat(91),t=Jh(e),e.eat(93),t.explicit=!0,33===e.charCode()&&(e.pos++,t.disallowEmpty=!0),t}(e))
case 60:return 39===e.nextCharCode()?function(e){let t
return e.eat(60),e.eat(39),t=Vh(e),e.eat(39),e.eat(62),Hh(e,{type:"Property",name:t})}(e):Kh(e)
case 124:return{type:"Combinator",value:e.substringToPos(e.pos+(124===e.nextCharCode()?2:1))}
case 38:return e.pos++,e.eat(38),{type:"Combinator",value:"&&"}
case 44:return e.pos++,{type:"Comma"}
case 39:return Hh(e,{type:"String",value:Yh(e)})
case 32:case 9:case 10:case 13:case 12:return{type:"Spaces",value:Wh(e)}
case 64:return t=e.nextCharCode(),t<128&&1===Uh[t]?(e.pos++,{type:"AtKeyword",name:Vh(e)}):Qh(e)
case 42:case 43:case 63:case 35:case 33:break
case Bh:if(t=e.nextCharCode(),t<48||t>57)return Qh(e)
break
default:return Qh(e)}}function tf(e){const t=new Gh(e),n=Jh(t)
return t.pos!==e.length&&t.error("Unexpected input"),1===n.terms.length&&"Group"===n.terms[0].type?n.terms[0]:n}const nf=function(){}
function rf(e){return"function"==typeof e?e:nf}const sf={decorator(e){const t=[]
let n=null
return{...e,node(t){const r=n
n=t,e.node.call(this,t),n=r},emit(e,r,s){t.push({type:r,value:e,node:s?null:n})},result:()=>t}}}
function of(e,t){return"string"==typeof e?function(e){const t=[]
return _u(e,(n,r,s)=>t.push({type:n,value:e.slice(r,s),node:null})),t}(e):t.generate(e,sf)}const af={type:"Match"},lf={type:"Mismatch"},cf={type:"DisallowEmpty"}
function uf(e,t,n){return t===af&&n===lf||e===af&&t===af&&n===af?e:("If"===e.type&&e.else===lf&&t===af&&(t=e.then,e=e.match),{type:"If",match:e,then:t,else:n})}function hf(e){return e.length>2&&40===e.charCodeAt(e.length-2)&&41===e.charCodeAt(e.length-1)}function ff(e){return"Keyword"===e.type||"AtKeyword"===e.type||"Function"===e.type||"Type"===e.type&&hf(e.name)}function pf(e,t,n){switch(e){case" ":{let e=af
for(let n=t.length-1;n>=0;n--){e=uf(t[n],e,lf)}return e}case"|":{let e=lf,n=null
for(let r=t.length-1;r>=0;r--){let s=t[r]
if(ff(s)&&(null===n&&r>0&&ff(t[r-1])&&(n=Object.create(null),e=uf({type:"Enum",map:n},af,e)),null!==n)){const e=(hf(s.name)?s.name.slice(0,-1):s.name).toLowerCase()
if(e in n==!1){n[e]=s
continue}}n=null,e=uf(s,af,e)}return e}case"&&":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!0}
let n=lf
for(let r=t.length-1;r>=0;r--){const s=t[r]
let i
i=t.length>1?pf(e,t.filter(function(e){return e!==s}),!1):af,n=uf(s,i,n)}return n}case"||":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!1}
let r=n?af:lf
for(let n=t.length-1;n>=0;n--){const s=t[n]
let i
i=t.length>1?pf(e,t.filter(function(e){return e!==s}),!0):af,r=uf(s,i,r)}return r}}}function df(e){if("function"==typeof e)return{type:"Generic",fn:e}
switch(e.type){case"Group":{let t=pf(e.combinator,e.terms.map(df),!1)
return e.disallowEmpty&&(t=uf(t,cf,lf)),t}case"Multiplier":return function(e){let t=af,n=df(e.term)
if(0===e.max)n=uf(n,cf,lf),t=uf(n,null,lf),t.then=uf(af,af,t),e.comma&&(t.then.else=uf({type:"Comma",syntax:e},t,lf))
else for(let r=e.min||1;r<=e.max;r++)e.comma&&t!==af&&(t=uf({type:"Comma",syntax:e},t,lf)),t=uf(n,uf(af,af,t),lf)
if(0===e.min)t=uf(af,af,t)
else for(let r=0;r<e.min-1;r++)e.comma&&t!==af&&(t=uf({type:"Comma",syntax:e},t,lf)),t=uf(n,t,lf)
return t}(e)
case"Type":case"Property":return{type:e.type,name:e.name,syntax:e}
case"Keyword":return{type:e.type,name:e.name.toLowerCase(),syntax:e}
case"AtKeyword":return{type:e.type,name:"@"+e.name.toLowerCase(),syntax:e}
case"Function":return{type:e.type,name:e.name.toLowerCase()+"(",syntax:e}
case"String":return 3===e.value.length?{type:"Token",value:e.value.charAt(1),syntax:e}:{type:e.type,value:e.value.substr(1,e.value.length-2).replace(/\\'/g,"'"),syntax:e}
case"Token":return{type:e.type,value:e.value,syntax:e}
case"Comma":return{type:e.type,syntax:e}
default:throw new Error("Unknown node type:",e.type)}}function mf(e,t){return"string"==typeof e&&(e=tf(e)),{type:"MatchGraph",match:df(e),syntax:t||null,source:e}}const{hasOwnProperty:gf}=Object.prototype,yf="Match"
function bf(e,t){if(e.length!==t.length)return!1
for(let n=0;n<e.length;n++){const r=t.charCodeAt(n)
let s=e.charCodeAt(n)
if(s>=0x0041&&s<=0x005A&&(s|=32),s!==r)return!1}return!0}function kf(e){return null===e||(e.type===Fc||2===e.type||e.type===Bc||e.type===zc||e.type===qc||function(e){return 9===e.type&&"?"!==e.value}(e))}function vf(e){return null===e||(e.type===Uc||e.type===Gc||e.type===Wc||9===e.type&&"/"===e.value)}function Sf(e,t,n){const r=function(e,t,n){function r(){do{b++,y=b<e.length?e[b]:null}while(null!==y&&(y.type===Mc||y.type===Vc))}function s(t){const n=b+t
return n<e.length?e[n]:null}function i(e,t){return{nextState:e,matchStack:v,syntaxStack:h,thenStack:f,tokenIndex:b,prev:t}}function o(e){f={nextState:e,matchStack:v,syntaxStack:h,prev:f}}function a(e){p=i(e,p)}function l(){v={type:1,syntax:t.syntax,token:y,prev:v},r(),d=null,b>k&&(k=b)}function c(){h={syntax:t.syntax,opts:t.syntax.opts||null!==h&&h.opts||null,prev:h},v={type:2,syntax:t.syntax,token:v.token,prev:v}}function u(){v=2===v.type?v.prev:{type:3,syntax:h.syntax,token:v.token,prev:v},h=h.prev}let h=null,f=null,p=null,d=null,m=0,g=null,y=null,b=-1,k=0,v={type:0,syntax:null,token:null,prev:null}
for(r();null===g&&++m<15e3;)switch(t.type){case"Match":if(null===f){if(null!==y&&(b!==e.length-1||"\\0"!==y.value&&"\\9"!==y.value)){t=lf
break}g=yf
break}if((t=f.nextState)===cf){if(f.matchStack===v){t=lf
break}t=af}for(;f.syntaxStack!==h;)u()
f=f.prev
break
case"Mismatch":if(null!==d&&!1!==d)(null===p||b>p.tokenIndex)&&(p=d,d=!1)
else if(null===p){g="Mismatch"
break}t=p.nextState,f=p.thenStack,h=p.syntaxStack,v=p.matchStack,b=p.tokenIndex,y=b<e.length?e[b]:null,p=p.prev
break
case"MatchGraph":t=t.match
break
case"If":t.else!==lf&&a(t.else),t.then!==af&&o(t.then),t=t.match
break
case"MatchOnce":t={type:"MatchOnceBuffer",syntax:t,index:0,mask:0}
break
case"MatchOnceBuffer":{const e=t.syntax.terms
if(t.index===e.length){if(0===t.mask||t.syntax.all){t=lf
break}t=af
break}if(t.mask===(1<<e.length)-1){t=af
break}for(;t.index<e.length;t.index++){const n=1<<t.index
if(0===(t.mask&n)){a(t),o({type:"AddMatchOnce",syntax:t.syntax,mask:t.mask|n}),t=e[t.index++]
break}}break}case"AddMatchOnce":t={type:"MatchOnceBuffer",syntax:t.syntax,index:0,mask:t.mask}
break
case"Enum":if(null!==y){let e=y.value.toLowerCase()
if(-1!==e.indexOf("\\")&&(e=e.replace(/\\[09].*$/,"")),gf.call(t.map,e)){t=t.map[e]
break}}t=lf
break
case"Generic":{const e=null!==h?h.opts:null,n=b+Math.floor(t.fn(y,s,e))
if(!isNaN(n)&&n>b){for(;b<n;)l()
t=af}else t=lf
break}case"Type":case"Property":{const e="Type"===t.type?"types":"properties",r=gf.call(n,e)?n[e][t.name]:null
if(!r||!r.match)throw new Error("Bad syntax reference: "+("Type"===t.type?"<"+t.name+">":"<'"+t.name+"'>"))
if(!1!==d&&null!==y&&"Type"===t.type&&("custom-ident"===t.name&&1===y.type||"length"===t.name&&"0"===y.value)){null===d&&(d=i(t,p)),t=lf
break}c(),t=r.match
break}case"Keyword":{const e=t.name
if(null!==y){let n=y.value
if(-1!==n.indexOf("\\")&&(n=n.replace(/\\[09].*$/,"")),bf(n,e)){l(),t=af
break}}t=lf
break}case"AtKeyword":case"Function":if(null!==y&&bf(y.value,t.name)){l(),t=af
break}t=lf
break
case"Token":if(null!==y&&y.value===t.value){l(),t=af
break}t=lf
break
case"Comma":null!==y&&y.type===Fc?kf(v.token)?t=lf:(l(),t=vf(y)?lf:af):t=kf(v.token)||vf(y)?af:lf
break
case"String":let r="",m=b
for(;m<e.length&&r.length<t.value.length;m++)r+=e[m].value
if(bf(r,t.value)){for(;b<m;)l()
t=af}else t=lf
break
default:throw new Error("Unknown node type: "+t.type)}switch(g){case null:console.warn("[csstree-match] BREAK after 15000 iterations"),g="Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)",v=null
break
case yf:for(;null!==h;)u()
break
default:v=null}return{tokens:e,reason:g,iterations:m,match:v,longestMatch:k}}(e,t,n||{})
if(null===r.match)return r
let s=r.match,i=r.match={syntax:t.syntax||null,match:[]}
const o=[i]
for(s=function(e){let t=null,n=null,r=e
for(;null!==r;)n=r.prev,r.prev=t,t=r,r=n
return t}(s).prev;null!==s;){switch(s.type){case 2:i.match.push(i={syntax:s.syntax,match:[]}),o.push(i)
break
case 3:o.pop(),i=o[o.length-1]
break
default:i.match.push({syntax:s.syntax||null,token:s.token.value,node:s.token.node})}s=s.prev}return r}function wf(e){function t(e){return null!==e&&("Type"===e.type||"Property"===e.type||"Keyword"===e.type)}let n=null
return null!==this.matched&&!function r(s){if(Array.isArray(s.match)){for(let e=0;e<s.match.length;e++)if(r(s.match[e]))return t(s.syntax)&&n.unshift(s.syntax),!0}else if(s.node===e)return n=t(s.syntax)?[s.syntax]:[],!0
return!1}(this.matched),n}function xf(e,t,n){const r=wf.call(e,t)
return null!==r&&r.some(n)}var Cf=Object.freeze({__proto__:null,getTrace:wf,isKeyword:function(e){return xf(this,e,e=>"Keyword"===e.type)},isProperty:function(e,t){return xf(this,e,e=>"Property"===e.type&&e.name===t)},isType:function(e,t){return xf(this,e,e=>"Type"===e.type&&e.name===t)}})
function Af(e){return"node"in e?e.node:Af(e.match[0])}function _f(e){return"node"in e?e.node:_f(e.match[e.match.length-1])}function Tf(e,t,n,r,s){const i=[]
return null!==n.matched&&!function n(o){if(null!==o.syntax&&o.syntax.type===r&&o.syntax.name===s){const n=Af(o),r=_f(o)
e.syntax.walk(t,function(e,t,s){if(e===n){const e=new Eu
do{if(e.appendData(t.data),t.data===r)break
t=t.next}while(null!==t)
i.push({parent:s,nodes:e})}})}Array.isArray(o.match)&&o.match.forEach(n)}(n.matched),i}const{hasOwnProperty:Ef}=Object.prototype
function Of(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&e>=0}function Pf(e){return Boolean(e)&&Of(e.offset)&&Of(e.line)&&Of(e.column)}function Lf(e,t){return function(n,r){if(!n||n.constructor!==Object)return r(n,"Type of node should be an Object")
for(let s in n){let i=!0
if(!1!==Ef.call(n,s)){if("type"===s)n.type!==e&&r(n,"Wrong node type `"+n.type+"`, expected `"+e+"`")
else if("loc"===s){if(null===n.loc)continue
if(n.loc&&n.loc.constructor===Object)if("string"!=typeof n.loc.source)s+=".source"
else if(Pf(n.loc.start)){if(Pf(n.loc.end))continue
s+=".end"}else s+=".start"
i=!1}else if(t.hasOwnProperty(s)){i=!1
for(let e=0;!i&&e<t[s].length;e++){const r=t[s][e]
switch(r){case String:i="string"==typeof n[s]
break
case Boolean:i="boolean"==typeof n[s]
break
case null:i=null===n[s]
break
default:"string"==typeof r?i=n[s]&&n[s].type===r:Array.isArray(r)&&(i=n[s]instanceof Eu)}}}else r(n,"Unknown field `"+s+"` for "+e+" node type")
i||r(n,"Bad value for `"+e+"."+s+"`")}}for(const s in t)Ef.call(t,s)&&!1===Ef.call(n,s)&&r(n,"Field `"+e+"."+s+"` is missed")}}function Nf(e,t){const n=t.structure,r={type:String,loc:!0},s={type:'"'+e+'"'}
for(const t in n){if(!1===Ef.call(n,t))continue
const i=[],o=r[t]=Array.isArray(n[t])?n[t].slice():[n[t]]
for(let n=0;n<o.length;n++){const r=o[n]
if(r===String||r===Boolean)i.push(r.name)
else if(null===r)i.push("null")
else if("string"==typeof r)i.push("<"+r+">")
else{if(!Array.isArray(r))throw new Error("Wrong value `"+r+"` in `"+e+"."+t+"` structure definition")
i.push("List")}}s[t]=i.join(" | ")}return{docs:s,check:Lf(e,r)}}const Df=mf(yh.join(" | "))
function Mf(e,t,n){const r={}
for(const s in e)e[s].syntax&&(r[s]=n?e[s].syntax:ih(e[s].syntax,{compact:t}))
return r}function jf(e,t,n){const r={}
for(const[s,i]of Object.entries(e))r[s]={prelude:i.prelude&&(n?i.prelude.syntax:ih(i.prelude.syntax,{compact:t})),descriptors:i.descriptors&&Mf(i.descriptors,t,n)}
return r}function If(e,t,n){return{matched:e,iterations:n,error:t,...Cf}}function Rf(e,t,n,r){const s=of(n,e.syntax)
let i
return function(e){for(let t=0;t<e.length;t++)if("var("===e[t].value.toLowerCase())return!0
return!1}(s)?If(null,new Error("Matching for a tree with var() is not supported")):(r&&(i=Sf(s,e.cssWideKeywordsSyntax,e)),r&&i.match||(i=Sf(s,t.match,e),i.match)?If(i.match,null,i.iterations):If(null,new uh(i.reason,t.syntax,n,i),i.iterations))}class Ff{constructor(e,t,n){if(this.cssWideKeywordsSyntax=Df,this.syntax=t,this.generic=!1,this.atrules=Object.create(null),this.properties=Object.create(null),this.types=Object.create(null),this.structure=n||function(e){const t={}
if(e.node)for(const n in e.node)if(Ef.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=Nf(n,r)}return t}(e),e){if(e.types)for(const t in e.types)this.addType_(t,e.types[t])
if(e.generic){this.generic=!0
for(const e in Fh)this.addType_(e,Fh[e])}if(e.atrules)for(const t in e.atrules)this.addAtrule_(t,e.atrules[t])
if(e.properties)for(const t in e.properties)this.addProperty_(t,e.properties[t])}}checkStructure(e){function t(e,t){r.push({node:e,message:t})}const n=this.structure,r=[]
return this.syntax.walk(e,function(e){n.hasOwnProperty(e.type)?n[e.type].check(e,t):t(e,"Unknown node type `"+e.type+"`")}),!!r.length&&r}createDescriptor(e,t,n,r=null){const s={type:t,name:n},i={type:t,name:n,parent:r,serializable:"string"==typeof e||e&&"string"==typeof e.type,syntax:null,match:null}
return"function"==typeof e?i.match=mf(e,s):("string"==typeof e?Object.defineProperty(i,"syntax",{get:()=>(Object.defineProperty(i,"syntax",{value:tf(e)}),i.syntax)}):i.syntax=e,Object.defineProperty(i,"match",{get:()=>(Object.defineProperty(i,"match",{value:mf(i.syntax,s)}),i.match)})),i}addAtrule_(e,t){t&&(this.atrules[e]={type:"Atrule",name:e,prelude:t.prelude?this.createDescriptor(t.prelude,"AtrulePrelude",e):null,descriptors:t.descriptors?Object.keys(t.descriptors).reduce((n,r)=>(n[r]=this.createDescriptor(t.descriptors[r],"AtruleDescriptor",r,e),n),Object.create(null)):null})}addProperty_(e,t){t&&(this.properties[e]=this.createDescriptor(t,"Property",e))}addType_(e,t){t&&(this.types[e]=this.createDescriptor(t,"Type",e))}checkAtruleName(e){if(!this.getAtrule(e))return new ch("Unknown at-rule","@"+e)}checkAtrulePrelude(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e)
return!r.prelude&&t?new SyntaxError("At-rule `@"+e+"` should not contain a prelude"):!r.prelude||t||Rf(this,r.prelude,"",!1).matched?void 0:new SyntaxError("At-rule `@"+e+"` should contain a prelude")}checkAtruleDescriptorName(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e),s=ph(t)
return r.descriptors?r.descriptors[s.name]||r.descriptors[s.basename]?void 0:new ch("Unknown at-rule descriptor",t):new SyntaxError("At-rule `@"+e+"` has no known descriptors")}checkPropertyName(e){if(!this.getProperty(e))return new ch("Unknown property",e)}matchAtrulePrelude(e,t){const n=this.checkAtrulePrelude(e,t)
if(n)return If(null,n)
const r=this.getAtrule(e)
return r.prelude?Rf(this,r.prelude,t||"",!1):If(null,null)}matchAtruleDescriptor(e,t,n){const r=this.checkAtruleDescriptorName(e,t)
if(r)return If(null,r)
const s=this.getAtrule(e),i=ph(t)
return Rf(this,s.descriptors[i.name]||s.descriptors[i.basename],n,!1)}matchDeclaration(e){return"Declaration"!==e.type?If(null,new Error("Not a Declaration node")):this.matchProperty(e.property,e.value)}matchProperty(e,t){if(dh(e).custom)return If(null,new Error("Lexer matching doesn't applicable for custom properties"))
const n=this.checkPropertyName(e)
return n?If(null,n):Rf(this,this.getProperty(e),t,!0)}matchType(e,t){const n=this.getType(e)
return n?Rf(this,n,t,!1):If(null,new ch("Unknown type",e))}match(e,t){return"string"==typeof e||e&&e.type?("string"!=typeof e&&e.match||(e=this.createDescriptor(e,"Type","anonymous")),Rf(this,e,t,!1)):If(null,new ch("Bad syntax"))}findValueFragments(e,t,n,r){return Tf(this,t,this.matchProperty(e,t),n,r)}findDeclarationValueFragments(e,t,n){return Tf(this,e.value,this.matchDeclaration(e),t,n)}findAllFragments(e,t,n){const r=[]
return this.syntax.walk(e,{visit:"Declaration",enter:e=>{r.push.apply(r,this.findDeclarationValueFragments(e,t,n))}}),r}getAtrule(e,t=!0){const n=ph(e)
return(n.vendor&&t?this.atrules[n.name]||this.atrules[n.basename]:this.atrules[n.name])||null}getAtrulePrelude(e,t=!0){const n=this.getAtrule(e,t)
return n&&n.prelude||null}getAtruleDescriptor(e,t){return this.atrules.hasOwnProperty(e)&&this.atrules.declarators&&this.atrules[e].declarators[t]||null}getProperty(e,t=!0){const n=dh(e)
return(n.vendor&&t?this.properties[n.name]||this.properties[n.basename]:this.properties[n.name])||null}getType(e){return hasOwnProperty.call(this.types,e)?this.types[e]:null}validate(){function e(r,s,i,o){if(i.has(s))return i.get(s)
i.set(s,!1),null!==o.syntax&&function(e,t,n){let r=nf,s=nf
if("function"==typeof t?r=t:t&&(r=rf(t.enter),s=rf(t.leave)),r===nf&&s===nf)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
!function e(t){switch(r.call(n,t),t.type){case"Group":t.terms.forEach(e)
break
case"Multiplier":e(t.term)
break
case"Type":case"Property":case"Keyword":case"AtKeyword":case"Function":case"String":case"Token":case"Comma":break
default:throw new Error("Unknown type: "+t.type)}s.call(n,t)}(e)}(o.syntax,function(o){if("Type"!==o.type&&"Property"!==o.type)return
const a="Type"===o.type?r.types:r.properties,l="Type"===o.type?t:n
hasOwnProperty.call(a,o.name)&&!e(r,o.name,l,a[o.name])||i.set(s,!0)},this)}let t=new Map,n=new Map
for(const n in this.types)e(this,n,t,this.types[n])
for(const t in this.properties)e(this,t,n,this.properties[t])
return t=[...t.keys()].filter(e=>t.get(e)),n=[...n.keys()].filter(e=>n.get(e)),t.length||n.length?{types:t,properties:n}:null}dump(e,t){return{generic:this.generic,types:Mf(this.types,!t,e),properties:Mf(this.properties,!t,e),atrules:jf(this.atrules,!t,e)}}toString(){return JSON.stringify(this.dump())}}const{hasOwnProperty:zf}=Object.prototype,Gf={generic:!0,types:Wf,atrules:{prelude:Vf,descriptors:Vf},properties:Wf,parseContext:function(e,t){return Object.assign(e,t)},scope:function e(t,n){for(const r in n)zf.call(n,r)&&(Bf(t[r])?e(t[r],n[r]):t[r]=Uf(n[r]))
return t},atrule:["parse"],pseudo:["parse"],node:["name","structure","parse","generate","walkContext"]}
function Bf(e){return e&&e.constructor===Object}function Uf(e){return Bf(e)?{...e}:e}function qf(e,t){return"string"==typeof t&&/^\s*\|/.test(t)?"string"==typeof e?e+t:t.replace(/^\s*\|\s*/,""):t||null}function Wf(e,t){if("string"==typeof t)return qf(e,t)
const n={...e}
for(let r in t)zf.call(t,r)&&(n[r]=qf(zf.call(e,r)?e[r]:void 0,t[r]))
return n}function Vf(e,t){const n=Wf(e,t)
return!Bf(n)||Object.keys(n).length?n:null}function $f(e,t,n){for(const r in n)if(!1!==zf.call(n,r))if(!0===n[r])zf.call(t,r)&&(e[r]=Uf(t[r]))
else if(n[r])if("function"==typeof n[r]){const s=n[r]
e[r]=s({},e[r]),e[r]=s(e[r]||{},t[r])}else if(Bf(n[r])){const s={}
for(let t in e[r])s[t]=$f({},e[r][t],n[r])
for(let e in t[r])s[e]=$f(s[e]||{},t[r][e],n[r])
e[r]=s}else if(Array.isArray(n[r])){const s={},i=n[r].reduce(function(e,t){return e[t]=!0,e},{})
for(const[t,n]of Object.entries(e[r]||{}))s[t]={},n&&$f(s[t],n,i)
for(const e in t[r])zf.call(t[r],e)&&(s[e]||(s[e]={}),t[r]&&t[r][e]&&$f(s[e],t[r][e],i))
e[r]=s}return e}var Yf=(e,t)=>$f(e,t,Gf)
function Xf(e){const t=Ru(e),n=nh(e),r=Xu(e),{fromPlainObject:s,toPlainObject:i}=function(e){return{fromPlainObject:t=>(e(t,{enter(e){e.children&&e.children instanceof Eu==0&&(e.children=(new Eu).fromArray(e.children))}}),t),toPlainObject:t=>(e(t,{leave(e){e.children&&e.children instanceof Eu&&(e.children=e.children.toArray())}}),t)}}(n),o={lexer:null,createLexer:e=>new Ff(e,o,o.lexer.structure),tokenize:_u,parse:t,generate:r,walk:n,find:n.find,findLast:n.findLast,findAll:n.findAll,fromPlainObject:s,toPlainObject:i,fork(t){const n=Yf({},e)
return Xf("function"==typeof t?t(n,Object.assign):Yf(n,t))}}
return o.lexer=new Ff({generic:!0,types:e.types,atrules:e.atrules,properties:e.properties,node:e.node},o),o}const Hf=r(import.meta.url)("../data/patch.json"),Qf=r(import.meta.url),Kf=Qf("mdn-data/css/at-rules.json"),Zf=Qf("mdn-data/css/properties.json"),Jf=Qf("mdn-data/css/syntaxes.json"),ep=/^\s*\|\s*/
function tp(e,t){const n={}
for(const t in e)n[t]=e[t].syntax||e[t]
for(const r in t)r in e?t[r].syntax?n[r]=ep.test(t[r].syntax)?n[r]+" "+t[r].syntax.trim():t[r].syntax:delete n[r]:t[r].syntax&&(n[r]=t[r].syntax.replace(ep,""))
return n}var np={types:tp(Jf,Hf.types),atrules:function(e,t){const n={}
for(const r in e){const s=t[r]&&t[r].descriptors||null
n[r]={prelude:r in t&&"prelude"in t[r]?t[r].prelude:e[r].prelude||null,descriptors:tp(e[r].descriptors||{},s||{})}}for(const r in t)hasOwnProperty.call(e,r)||(n[r]={prelude:t[r].prelude||null,descriptors:t[r].descriptors&&tp({},t[r].descriptors)})
return n}(function(e){const t=Object.create(null)
for(const n in e){const r=e[n]
let s=null
if(r.descriptors){s=Object.create(null)
for(const e in r.descriptors)s[e]=r.descriptors[e].syntax}t[n.substr(1)]={prelude:r.syntax.trim().replace(/\{(.|\s)+\}/,"").match(/^@\S+\s+([^;\{]*)/)[1].trim()||null,descriptors:s}}return t}(Kf),Hf.atrules),properties:tp(Zf,Hf.properties)}
const rp=0x002B,sp=0x002D,ip=0x006E,op=!0
function ap(e,t){let n=this.tokenStart+e
const r=this.charCodeAt(n)
for(r!==rp&&r!==sp||(t&&this.error("Number sign is not allowed"),n++);n<this.tokenEnd;n++)$c(this.charCodeAt(n))||this.error("Integer is expected",n)}function lp(e){return ap.call(this,0,e)}function cp(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let n=""
switch(t){case ip:n="N is expected"
break
case sp:n="HyphenMinus is expected"}this.error(n,this.tokenStart+e)}}function up(){let e=0,t=0,n=this.tokenType
for(;n===Mc||n===Vc;)n=this.lookupType(++e)
if(n!==Lc){if(!this.isDelim(rp,e)&&!this.isDelim(sp,e))return null
t=this.isDelim(rp,e)?rp:sp
do{n=this.lookupType(++e)}while(n===Mc||n===Vc)
n!==Lc&&(this.skip(e),lp.call(this,op))}return e>0&&this.skip(e),0===t&&(n=this.charCodeAt(this.tokenStart),n!==rp&&n!==sp&&this.error("Number sign is expected")),lp.call(this,0!==t),t===sp?"-"+this.consume(Lc):this.consume(Lc)}const hp={a:[String,null],b:[String,null]}
function fp(){const e=this.tokenStart
let t=null,n=null
if(this.tokenType===Lc)lp.call(this,false),n=this.consume(Lc)
else if(1===this.tokenType&&this.cmpChar(this.tokenStart,sp))switch(t="-1",cp.call(this,1,ip),this.tokenEnd-this.tokenStart){case 2:this.next(),n=up.call(this)
break
case 3:cp.call(this,2,sp),this.next(),this.skipSC(),lp.call(this,op),n="-"+this.consume(Lc)
break
default:cp.call(this,2,sp),ap.call(this,3,op),this.next(),n=this.substrToCursor(e+2)}else if(1===this.tokenType||this.isDelim(rp)&&1===this.lookupType(1)){let r=0
switch(t="1",this.isDelim(rp)&&(r=1,this.next()),cp.call(this,0,ip),this.tokenEnd-this.tokenStart){case 1:this.next(),n=up.call(this)
break
case 2:cp.call(this,1,sp),this.next(),this.skipSC(),lp.call(this,op),n="-"+this.consume(Lc)
break
default:cp.call(this,1,sp),ap.call(this,2,op),this.next(),n=this.substrToCursor(e+r+1)}}else if(this.tokenType===Dc){const r=this.charCodeAt(this.tokenStart),s=r===rp||r===sp
let i=this.tokenStart+s
for(;i<this.tokenEnd&&$c(this.charCodeAt(i));i++);i===this.tokenStart+s&&this.error("Integer is expected",this.tokenStart+s),cp.call(this,i-this.tokenStart,ip),t=this.substring(e,i),i+1===this.tokenEnd?(this.next(),n=up.call(this)):(cp.call(this,i-this.tokenStart+1,sp),i+2===this.tokenEnd?(this.next(),this.skipSC(),lp.call(this,op),n="-"+this.consume(Lc)):(ap.call(this,i-this.tokenStart+2,op),this.next(),n=this.substrToCursor(i+1)))}else this.error()
return null!==t&&t.charCodeAt(0)===rp&&(t=t.substr(1)),null!==n&&n.charCodeAt(0)===rp&&(n=n.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:n}}var pp=Object.freeze({__proto__:null,generate:function(e){if(e.a){const t=("+1"===e.a||"1"===e.a?"n":"-1"===e.a&&"-n")||e.a+"n"
if(e.b){const n="-"===e.b[0]||"+"===e.b[0]?e.b:"+"+e.b
this.tokenize(t+n)}else this.tokenize(t)}else this.tokenize(e.b)},name:"AnPlusB",parse:fp,structure:hp})
function dp(e){return this.Raw(e,this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function mp(){for(let e,t=1;e=this.lookupType(t);t++){if(e===Wc)return!0
if(e===qc||3===e)return!1}return!1}const gp={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]}
function yp(){const e=this.tokenStart
let t,n,r=null,s=null
switch(this.eat(3),t=this.substrToCursor(e+1),n=t.toLowerCase(),this.skipSC(),!1===this.eof&&this.tokenType!==qc&&this.tokenType!==Rc&&(r=this.parseAtrulePrelude?this.parseWithFallback(this.AtrulePrelude.bind(this,t),dp):dp.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case Rc:this.next()
break
case qc:s=hasOwnProperty.call(this.atrule,n)&&"function"==typeof this.atrule[n].block?this.atrule[n].block.call(this):this.Block(mp.call(this))}return{type:"Atrule",loc:this.getLocation(e,this.tokenStart),name:t,prelude:r,block:s}}var bp=Object.freeze({__proto__:null,generate:function(e){this.token(3,"@"+e.name),null!==e.prelude&&this.node(e.prelude),e.block?this.node(e.block):this.token(Rc,";")},name:"Atrule",parse:yp,structure:gp,walkContext:"atrule"})
function kp(e){let t=null
return null!==e&&(e=e.toLowerCase()),this.skipSC(),t=hasOwnProperty.call(this.atrule,e)&&"function"==typeof this.atrule[e].prelude?this.atrule[e].prelude.call(this):this.readSequence(this.scope.AtrulePrelude),this.skipSC(),!0!==this.eof&&this.tokenType!==qc&&this.tokenType!==Rc&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}var vp=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"AtrulePrelude",parse:kp,structure:{children:[[]]},walkContext:"atrulePrelude"})
function Sp(){this.eof&&this.error("Unexpected end of input")
const e=this.tokenStart
let t=!1
return this.isDelim(42)?(t=!0,this.next()):this.isDelim(124)||this.eat(1),this.isDelim(124)?61!==this.charCodeAt(this.tokenStart+1)?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function wp(){const e=this.tokenStart,t=this.charCodeAt(e)
return 61!==t&&126!==t&&94!==t&&36!==t&&42!==t&&124!==t&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),61!==t&&(this.isDelim(61)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}const xp={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]}
function Cp(){const e=this.tokenStart
let t,n=null,r=null,s=null
return this.eat(zc),this.skipSC(),t=Sp.call(this),this.skipSC(),this.tokenType!==Gc&&(1!==this.tokenType&&(n=wp.call(this),this.skipSC(),r=5===this.tokenType?this.String():this.Identifier(),this.skipSC()),1===this.tokenType&&(s=this.consume(1),this.skipSC())),this.eat(Gc),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:n,value:r,flags:s}}var Ap=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.node(e.name),null!==e.matcher&&(this.tokenize(e.matcher),this.node(e.value)),null!==e.flags&&this.token(1,e.flags),this.token(9,"]")},name:"AttributeSelector",parse:Cp,structure:xp})
function _p(e){return this.Raw(e,null,!0)}function Tp(){return this.parseWithFallback(this.Rule,_p)}function Ep(e){return this.Raw(e,this.consumeUntilSemicolonIncluded,!0)}function Op(){if(this.tokenType===Rc)return Ep.call(this,this.tokenIndex)
const e=this.parseWithFallback(this.Declaration,Ep)
return this.tokenType===Rc&&this.next(),e}function Pp(e){const t=e?Op:Tp,n=this.tokenStart
let r=this.createList()
this.eat(qc)
e:for(;!this.eof;)switch(this.tokenType){case Wc:break e
case Mc:case Vc:this.next()
break
case 3:r.push(this.parseWithFallback(this.Atrule,_p))
break
default:r.push(t.call(this))}return this.eof||this.eat(Wc),{type:"Block",loc:this.getLocation(n,this.tokenStart),children:r}}var Lp=Object.freeze({__proto__:null,generate:function(e){this.token(qc,"{"),this.children(e,e=>{"Declaration"===e.type&&this.token(Rc,";")}),this.token(Wc,"}")},name:"Block",parse:Pp,structure:{children:[["Atrule","Rule","Declaration"]]},walkContext:"block"})
function Np(e,t){const n=this.tokenStart
let r=null
return this.eat(zc),r=e.call(this,t),this.eof||this.eat(Gc),{type:"Brackets",loc:this.getLocation(n,this.tokenStart),children:r}}var Dp=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.children(e),this.token(9,"]")},name:"Brackets",parse:Np,structure:{children:[[]]}})
function Mp(){const e=this.tokenStart
return this.eat(jc),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}var jp=Object.freeze({__proto__:null,generate:function(){this.token(jc,"--\x3e")},name:"CDC",parse:Mp,structure:[]})
function Ip(){const e=this.tokenStart
return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}var Rp=Object.freeze({__proto__:null,generate:function(){this.token(14,"\x3c!--")},name:"CDO",parse:Ip,structure:[]})
const Fp={name:String}
function zp(){return this.eatDelim(46),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}var Gp=Object.freeze({__proto__:null,generate:function(e){this.token(9,"."),this.token(1,e.name)},name:"ClassSelector",parse:zp,structure:Fp})
const Bp={name:String}
function Up(){const e=this.tokenStart
let t
switch(this.tokenType){case Mc:t=" "
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 62:case 43:case 126:this.next()
break
case 47:this.next(),this.eatIdent("deep"),this.eatDelim(47)
break
default:this.error("Combinator is expected")}t=this.substrToCursor(e)}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}var qp=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"Combinator",parse:Up,structure:Bp})
const Wp={value:String}
function Vp(){const e=this.tokenStart
let t=this.tokenEnd
return this.eat(Vc),t-e+2>=2&&42===this.charCodeAt(t-2)&&47===this.charCodeAt(t-1)&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}var $p=Object.freeze({__proto__:null,generate:function(e){this.token(Vc,"/*"+e.value+"*/")},name:"Comment",parse:Vp,structure:Wp})
function Yp(e){return this.Raw(e,this.consumeUntilExclamationMarkOrSemicolon,!0)}function Xp(e){return this.Raw(e,this.consumeUntilExclamationMarkOrSemicolon,!1)}function Hp(){const e=this.tokenIndex,t=this.Value()
return"Raw"!==t.type&&!1===this.eof&&this.tokenType!==Rc&&!1===this.isDelim(33)&&!1===this.isBalanceEdge(e)&&this.error(),t}const Qp={important:[Boolean,String],property:String,value:["Value","Raw"]}
function Kp(){const e=this.tokenStart,t=this.tokenIndex,n=Zp.call(this),r=mh(n),s=r?this.parseCustomProperty:this.parseValue,i=r?Xp:Yp
let o,a=!1
this.skipSC(),this.eat(Ic)
const l=this.tokenIndex
if(r||this.skipSC(),o=s?this.parseWithFallback(Hp,i):i.call(this,this.tokenIndex),r&&"Value"===o.type&&o.children.isEmpty)for(let e=l-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Mc){o.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}return this.isDelim(33)&&(a=Jp.call(this),this.skipSC()),!1===this.eof&&this.tokenType!==Rc&&!1===this.isBalanceEdge(t)&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:a,property:n,value:o}}function Zp(){const e=this.tokenStart
if(9===this.tokenType)switch(this.charCodeAt(this.tokenStart)){case 42:case 36:case 43:case 35:case 38:this.next()
break
case 47:this.next(),this.isDelim(47)&&this.next()}return 4===this.tokenType?this.eat(4):this.eat(1),this.substrToCursor(e)}function Jp(){this.eat(9),this.skipSC()
const e=this.consume(1)
return"important"===e||e}var ed=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.property),this.token(Ic,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,!0===e.important?"important":e.important))},name:"Declaration",parse:Kp,structure:Qp,walkContext:"declaration"})
function td(e){return this.Raw(e,this.consumeUntilSemicolonIncluded,!0)}function nd(){const e=this.createList()
for(;!this.eof;)switch(this.tokenType){case Mc:case Vc:case Rc:this.next()
break
default:e.push(this.parseWithFallback(this.Declaration,td))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}var rd=Object.freeze({__proto__:null,generate:function(e){this.children(e,e=>{"Declaration"===e.type&&this.token(Rc,";")})},name:"DeclarationList",parse:nd,structure:{children:[["Declaration"]]}})
const sd={value:String,unit:String}
function id(){const e=this.tokenStart,t=this.consumeNumber(Dc)
return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}var od=Object.freeze({__proto__:null,generate:function(e){this.token(Dc,e.value+e.unit)},name:"Dimension",parse:id,structure:sd})
const ad={name:String,children:[[]]}
function ld(e,t){const n=this.tokenStart,r=this.consumeFunctionName(),s=r.toLowerCase()
let i
return i=t.hasOwnProperty(s)?t[s].call(this,t):e.call(this,t),this.eof||this.eat(Uc),{type:"Function",loc:this.getLocation(n,this.tokenStart),name:r,children:i}}var cd=Object.freeze({__proto__:null,generate:function(e){this.token(2,e.name+"("),this.children(e),this.token(Uc,")")},name:"Function",parse:ld,structure:ad,walkContext:"function"})
const ud={value:String}
function hd(){const e=this.tokenStart
return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}var fd=Object.freeze({__proto__:null,generate:function(e){this.token(4,"#"+e.value)},name:"Hash",parse:hd,structure:ud,xxx:"XXX"})
const pd={name:String}
function dd(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}var md=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.name)},name:"Identifier",parse:dd,structure:pd})
const gd={name:String}
function yd(){const e=this.tokenStart
return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}var bd=Object.freeze({__proto__:null,generate:function(e){this.token(9,"#"+e.name)},name:"IdSelector",parse:yd,structure:gd})
const kd={name:String,value:["Identifier","Number","Dimension","Ratio",null]}
function vd(){const e=this.tokenStart
let t,n=null
if(this.eat(Bc),this.skipSC(),t=this.consume(1),this.skipSC(),this.tokenType!==Uc){switch(this.eat(Ic),this.skipSC(),this.tokenType){case Lc:n=9===this.lookupNonWSType(1)?this.Ratio():this.Number()
break
case Dc:n=this.Dimension()
break
case 1:n=this.Identifier()
break
default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eat(Uc),{type:"MediaFeature",loc:this.getLocation(e,this.tokenStart),name:t,value:n}}var Sd=Object.freeze({__proto__:null,generate:function(e){this.token(Bc,"("),this.token(1,e.name),null!==e.value&&(this.token(Ic,":"),this.node(e.value)),this.token(Uc,")")},name:"MediaFeature",parse:vd,structure:kd})
function wd(){const e=this.createList()
let t=null
this.skipSC()
e:for(;!this.eof;){switch(this.tokenType){case Vc:case Mc:this.next()
continue
case 1:t=this.Identifier()
break
case Bc:t=this.MediaFeature()
break
default:break e}e.push(t)}return null===t&&this.error("Identifier or parenthesis is expected"),{type:"MediaQuery",loc:this.getLocationFromList(e),children:e}}var xd=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"MediaQuery",parse:wd,structure:{children:[["Identifier","MediaFeature","WhiteSpace"]]}})
function Cd(){const e=this.createList()
for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===Fc);)this.next()
return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}var Ad=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Fc,","))},name:"MediaQueryList",parse:Cd,structure:{children:[["MediaQuery"]]}})
function _d(){this.skipSC()
const e=this.tokenStart
let t,n=e,r=null
return t=this.lookupValue(0,"odd")||this.lookupValue(0,"even")?this.Identifier():this.AnPlusB(),n=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),r=this.SelectorList(),n=this.tokenStart),{type:"Nth",loc:this.getLocation(e,n),nth:t,selector:r}}var Td=Object.freeze({__proto__:null,generate:function(e){this.node(e.nth),null!==e.selector&&(this.token(1,"of"),this.node(e.selector))},name:"Nth",parse:_d,structure:{nth:["AnPlusB","Identifier"],selector:["SelectorList",null]}})
const Ed={value:String}
function Od(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(Lc)}}var Pd=Object.freeze({__proto__:null,generate:function(e){this.token(Lc,e.value)},name:"Number",parse:Od,structure:Ed})
const Ld={value:String}
function Nd(){const e=this.tokenStart
return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var Dd=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Operator",parse:Nd,structure:Ld})
function Md(e,t){const n=this.tokenStart
let r=null
return this.eat(Bc),r=e.call(this,t),this.eof||this.eat(Uc),{type:"Parentheses",loc:this.getLocation(n,this.tokenStart),children:r}}var jd=Object.freeze({__proto__:null,generate:function(e){this.token(Bc,"("),this.children(e),this.token(Uc,")")},name:"Parentheses",parse:Md,structure:{children:[[]]}})
const Id={value:String}
function Rd(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(Nc)}}var Fd=Object.freeze({__proto__:null,generate:function(e){this.token(Nc,e.value+"%")},name:"Percentage",parse:Rd,structure:Id})
const zd={name:String,children:[["Raw"],null]}
function Gd(){const e=this.tokenStart
let t,n,r=null
return this.eat(Ic),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(this.tokenIndex,null,!1))),this.eat(Uc)):t=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var Bd=Object.freeze({__proto__:null,generate:function(e){this.token(Ic,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(Uc,")"))},name:"PseudoClassSelector",parse:Gd,structure:zd,walkContext:"function"})
const Ud={name:String,children:[["Raw"],null]}
function qd(){const e=this.tokenStart
let t,n,r=null
return this.eat(Ic),this.eat(Ic),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(this.tokenIndex,null,!1))),this.eat(Uc)):t=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var Wd=Object.freeze({__proto__:null,generate:function(e){this.token(Ic,":"),this.token(Ic,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(Uc,")"))},name:"PseudoElementSelector",parse:qd,structure:Ud,walkContext:"function"})
function Vd(){this.skipSC()
const e=this.consume(Lc)
for(let t=0;t<e.length;t++){const n=e.charCodeAt(t)
$c(n)||46===n||this.error("Unsigned number is expected",this.tokenStart-e.length+t)}return 0===Number(e)&&this.error("Zero number is not allowed",this.tokenStart-e.length),e}const $d={left:String,right:String}
function Yd(){const e=this.tokenStart,t=Vd.call(this)
let n
return this.skipSC(),this.eatDelim(47),n=Vd.call(this),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:n}}var Xd=Object.freeze({__proto__:null,generate:function(e){this.token(Lc,e.left),this.token(9,"/"),this.token(Lc,e.right)},name:"Ratio",parse:Yd,structure:$d})
function Hd(){return this.tokenIndex>0&&this.lookupType(-1)===Mc?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}const Qd={value:String}
function Kd(e,t,n){const r=this.getTokenStart(e)
let s
return this.skipUntilBalanced(e,t||this.consumeUntilBalanceEnd),s=n&&this.tokenStart>r?Hd.call(this):this.tokenStart,{type:"Raw",loc:this.getLocation(r,s),value:this.substring(r,s)}}var Zd=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Raw",parse:Kd,structure:Qd})
function Jd(e){return this.Raw(e,this.consumeUntilLeftCurlyBracket,!0)}function em(){const e=this.SelectorList()
return"Raw"!==e.type&&!1===this.eof&&this.tokenType!==qc&&this.error(),e}function tm(){const e=this.tokenIndex,t=this.tokenStart
let n,r
return n=this.parseRulePrelude?this.parseWithFallback(em,Jd):Jd.call(this,e),r=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:n,block:r}}var nm=Object.freeze({__proto__:null,generate:function(e){this.node(e.prelude),this.node(e.block)},name:"Rule",parse:tm,structure:{prelude:["SelectorList","Raw"],block:["Block"]},walkContext:"rule"})
function rm(){const e=this.readSequence(this.scope.Selector)
return null===this.getFirstListNode(e)&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}var sm=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Selector",parse:rm,structure:{children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator","WhiteSpace"]]}})
function im(){const e=this.createList()
for(;!this.eof&&(e.push(this.Selector()),this.tokenType===Fc);)this.next()
return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}var om=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Fc,","))},name:"SelectorList",parse:im,structure:{children:[["Selector","Raw"]]},walkContext:"selector"})
function am(e){const t=e.length,n=e.charCodeAt(0),r=34===n||39===n?1:0,s=1===r&&t>1&&e.charCodeAt(t-1)===n?t-2:t-1
let i=""
for(let n=r;n<=s;n++){let r=e.charCodeAt(n)
if(92===r){if(n===s){n!==t-1&&(i=e.substr(n+1))
break}if(r=e.charCodeAt(++n),eu(92,r)){const t=n-1,r=pu(e,t)
n=r-1,i+=yu(e.substring(t+1,r))}else 0x000d===r&&0x000a===e.charCodeAt(n+1)&&n++}else i+=e[n]}return i}function lm(e,t){const n=t?"'":'"',r=t?39:34
let s="",i=!1
for(let t=0;t<e.length;t++){const n=e.charCodeAt(t)
0x0000!==n?n<=0x001f||0x007F===n?(s+="\\"+n.toString(16),i=!0):n===r||92===n?(s+="\\"+e.charAt(t),i=!1):(i&&(Yc(n)||Jc(n))&&(s+=" "),s+=e.charAt(t),i=!1):s+="�"}return n+s+n}const cm={value:String}
function um(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:am(this.consume(5))}}var hm=Object.freeze({__proto__:null,generate:function(e){this.token(5,lm(e.value))},name:"String",parse:um,structure:cm})
function fm(e){return this.Raw(e,null,!1)}function pm(){const e=this.tokenStart,t=this.createList()
let n
for(;!this.eof;){switch(this.tokenType){case Mc:this.next()
continue
case Vc:if(33!==this.charCodeAt(this.tokenStart+2)){this.next()
continue}n=this.Comment()
break
case 14:n=this.CDO()
break
case jc:n=this.CDC()
break
case 3:n=this.parseWithFallback(this.Atrule,fm)
break
default:n=this.parseWithFallback(this.Rule,fm)}t.push(n)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}var dm=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"StyleSheet",parse:pm,structure:{children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]},walkContext:"stylesheet"})
function mm(){1!==this.tokenType&&!1===this.isDelim(42)&&this.error("Identifier or asterisk is expected"),this.next()}const gm={name:String}
function ym(){const e=this.tokenStart
return this.isDelim(124)?(this.next(),mm.call(this)):(mm.call(this),this.isDelim(124)&&(this.next(),mm.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}var bm=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"TypeSelector",parse:ym,structure:gm})
function km(e,t){let n=0
for(let r=this.tokenStart+e;r<this.tokenEnd;r++){const s=this.charCodeAt(r)
if(45===s&&t&&0!==n)return km.call(this,e+n+1,!1),-1
Yc(s)||this.error(t&&0!==n?"Hyphen minus"+(n<6?" or hex digit":"")+" is expected":n<6?"Hex digit is expected":"Unexpected input",r),++n>6&&this.error("Too many hex digits",r)}return this.next(),n}function vm(e){let t=0
for(;this.isDelim(63);)++t>e&&this.error("Too many question marks"),this.next()}function Sm(e){this.charCodeAt(this.tokenStart)!==e&&this.error((43===e?"Plus sign":"Hyphen minus")+" is expected")}function wm(){let e=0
switch(this.tokenType){case Lc:if(e=km.call(this,1,!0),this.isDelim(63)){vm.call(this,6-e)
break}if(this.tokenType===Dc||this.tokenType===Lc){Sm.call(this,45),km.call(this,1,!1)
break}break
case Dc:e=km.call(this,1,!0),e>0&&vm.call(this,6-e)
break
default:if(this.eatDelim(43),1===this.tokenType){e=km.call(this,0,!0),e>0&&vm.call(this,6-e)
break}if(this.isDelim(63)){this.next(),vm.call(this,5)
break}this.error("Hex digit or question mark is expected")}}const xm={value:String}
function Cm(){const e=this.tokenStart
return this.eatIdent("u"),wm.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var Am=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"UnicodeRange",parse:Cm,structure:xm})
function _m(e){let t="",n=!1
for(let r=0;r<e.length;r++){const s=e.charCodeAt(r)
0x0000!==s?s<=0x001f||0x007F===s?(t+="\\"+s.toString(16),n=!0):32===s||92===s||34===s||39===s||40===s||41===s?(t+="\\"+e.charAt(r),n=!1):(n&&Yc(s)&&(t+=" "),t+=e.charAt(r),n=!1):t+="�"}return"url("+t+")"}const Tm={value:String}
function Em(){const e=this.tokenStart
let t
switch(this.tokenType){case 7:t=function(e){const t=e.length
let n=4,r=41===e.charCodeAt(t-1)?t-2:t-1,s=""
for(;n<r&&Jc(e.charCodeAt(n));)n++
for(;n<r&&Jc(e.charCodeAt(r));)r--
for(let i=n;i<=r;i++){let n=e.charCodeAt(i)
if(92===n){if(i===r){i!==t-1&&(s=e.substr(i+1))
break}if(n=e.charCodeAt(++i),eu(92,n)){const t=i-1,n=pu(e,t)
i=n-1,s+=yu(e.substring(t+1,n))}else 0x000d===n&&0x000a===e.charCodeAt(i+1)&&i++}else s+=e[i]}return s}(this.consume(7))
break
case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=am(this.consume(5)),this.skipSC(),this.eof||this.eat(Uc)
break
default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}var Om=Object.freeze({__proto__:null,generate:function(e){this.token(7,_m(e.value))},name:"Url",parse:Em,structure:Tm})
function Pm(){const e=this.tokenStart,t=this.readSequence(this.scope.Value)
return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}var Lm=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Value",parse:Pm,structure:{children:[[]]}})
const Nm=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),Dm={value:String}
function Mm(){return this.eat(Mc),Nm}var jm=Object.freeze({__proto__:null,generate:function(e){this.token(Mc,e.value)},name:"WhiteSpace",parse:Mm,structure:Dm}),Im=Object.freeze({__proto__:null,AnPlusB:pp,Atrule:bp,AtrulePrelude:vp,AttributeSelector:Ap,Block:Lp,Brackets:Dp,CDC:jp,CDO:Rp,ClassSelector:Gp,Combinator:qp,Comment:$p,Declaration:ed,DeclarationList:rd,Dimension:od,Function:cd,Hash:fd,IdSelector:bd,Identifier:md,MediaFeature:Sd,MediaQuery:xd,MediaQueryList:Ad,Nth:Td,Number:Pd,Operator:Dd,Parentheses:jd,Percentage:Fd,PseudoClassSelector:Bd,PseudoElementSelector:Wd,Ratio:Xd,Raw:Zd,Rule:nm,Selector:sm,SelectorList:om,String:hm,StyleSheet:dm,TypeSelector:bm,UnicodeRange:Am,Url:Om,Value:Lm,WhiteSpace:jm}),Rm={generic:!0,...np,node:Im}
function Fm(e){switch(this.tokenType){case 4:return this.Hash()
case Fc:return this.Operator()
case Bc:return this.Parentheses(this.readSequence,e.recognizer)
case zc:return this.Brackets(this.readSequence,e.recognizer)
case 5:return this.String()
case Dc:return this.Dimension()
case Nc:return this.Percentage()
case Lc:return this.Number()
case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer)
case 7:return this.Url()
case 1:return this.cmpChar(this.tokenStart,117)&&this.cmpChar(this.tokenStart+1,43)?this.UnicodeRange():this.Identifier()
case 9:{const e=this.charCodeAt(this.tokenStart)
if(47===e||42===e||43===e||45===e)return this.Operator()
35===e&&this.error("Hex or identifier is expected",this.tokenStart+1)
break}}}var zm={getNode:Fm}
var Gm={onWhiteSpace:function(e,t){null!==t.last&&"Combinator"!==t.last.type&&null!==e&&"Combinator"!==e.type&&t.push({type:"Combinator",loc:null,name:" "})},getNode:function(){switch(this.tokenType){case zc:return this.AttributeSelector()
case 4:return this.IdSelector()
case Ic:return this.lookupType(1)===Ic?this.PseudoElementSelector():this.PseudoClassSelector()
case 1:return this.TypeSelector()
case Lc:case Nc:return this.Percentage()
case Dc:46===this.charCodeAt(this.tokenStart)&&this.error("Identifier is expected",this.tokenStart+1)
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 43:case 62:case 126:case 47:return this.Combinator()
case 46:return this.ClassSelector()
case 42:case 124:return this.TypeSelector()
case 35:return this.IdSelector()}break}}}
function Bm(e){return null!==e&&"Operator"===e.type&&("-"===e.value[e.value.length-1]||"+"===e.value[e.value.length-1])}var Um={getNode:Fm,onWhiteSpace(e,t){Bm(e)&&(e.value=" "+e.value),Bm(t.last)&&(t.last.value+=" ")},expression:function(){return this.createSingleNodeList(this.Raw(this.tokenIndex,null,!1))},var:function(){const e=this.createList()
if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===Fc){e.push(this.Operator())
const t=this.tokenIndex,n=this.parseCustomProperty?this.Value(null):this.Raw(this.tokenIndex,this.consumeUntilExclamationMarkOrSemicolon,!1)
if("Value"===n.type&&n.children.isEmpty)for(let e=t-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Mc){n.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}e.push(n)}return e}},qm=Object.freeze({__proto__:null,AtrulePrelude:zm,Selector:Gm,Value:Um})
function Wm(){return this.createSingleNodeList(this.Raw(this.tokenIndex,null,!1))}function Vm(){return this.skipSC(),1===this.tokenType&&this.lookupNonWSType(1)===Ic?this.createSingleNodeList(this.Declaration()):$m.call(this)}function $m(){const e=this.createList()
let t
this.skipSC()
e:for(;!this.eof;){switch(this.tokenType){case Vc:case Mc:this.next()
continue
case 2:t=this.Function(Wm,this.scope.AtrulePrelude)
break
case 1:t=this.Identifier()
break
case Bc:t=this.Parentheses(Vm,this.scope.AtrulePrelude)
break
default:break e}e.push(t)}return e}var Ym={"font-face":{parse:{prelude:null,block(){return this.Block(!0)}}},import:{parse:{prelude(){const e=this.createList()
switch(this.skipSC(),this.tokenType){case 5:e.push(this.String())
break
case 7:case 2:e.push(this.Url())
break
default:this.error("String or url() is expected")}return 1!==this.lookupNonWSType(0)&&this.lookupNonWSType(0)!==Bc||e.push(this.MediaQueryList()),e},block:null}},media:{parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(){return this.Block(!1)}}},page:{parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}},supports:{parse:{prelude(){const e=$m.call(this)
return null===this.getFirstListNode(e)&&this.error("Condition is expected"),e},block(){return this.Block(!1)}}}}
const Xm={parse(){return this.createSingleNodeList(this.SelectorList())}},Hm={parse(){return this.createSingleNodeList(this.Selector())}},Qm={parse(){return this.createSingleNodeList(this.Identifier())}},Km={parse(){return this.createSingleNodeList(this.Nth())}}
var Zm={dir:Qm,has:Xm,lang:Qm,matches:Xm,is:Xm,"-moz-any":Xm,"-webkit-any":Xm,where:Xm,not:Xm,"nth-child":Km,"nth-last-child":Km,"nth-last-of-type":Km,"nth-of-type":Km,slotted:Hm},Jm=Object.freeze({__proto__:null,AnPlusB:fp,Atrule:yp,AtrulePrelude:kp,AttributeSelector:Cp,Block:Pp,Brackets:Np,CDC:Mp,CDO:Ip,ClassSelector:zp,Combinator:Up,Comment:Vp,Declaration:Kp,DeclarationList:nd,Dimension:id,Function:ld,Hash:hd,IdSelector:yd,Identifier:dd,MediaFeature:vd,MediaQuery:wd,MediaQueryList:Cd,Nth:_d,Number:Od,Operator:Nd,Parentheses:Md,Percentage:Rd,PseudoClassSelector:Gd,PseudoElementSelector:qd,Ratio:Yd,Raw:Kd,Rule:tm,Selector:rm,SelectorList:im,String:um,StyleSheet:pm,TypeSelector:ym,UnicodeRange:Cm,Url:Em,Value:Pm,WhiteSpace:Mm}),eg=(e=>Xf(Yf({},e)))({...Rm,...{parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},scope:qm,atrule:Ym,pseudo:Zm,node:Jm},...{node:Im}})
const tg=r(import.meta.url),{version:ng}=tg("../package.json")
function rg(e){const t={}
for(const n in e){let r=e[n]
r&&(Array.isArray(r)||r instanceof Eu?r=r.map(rg):r.constructor===Object&&(r=rg(r))),t[n]=r}return t}const{tokenize:sg,parse:ig,generate:og,lexer:ag,createLexer:lg,walk:cg,find:ug,findLast:hg,findAll:fg,toPlainObject:pg,fromPlainObject:dg,fork:mg}=eg,{hasOwnProperty:gg}=Object.prototype
function yg(e,t){const n=Object.create(null)
if(!Array.isArray(e))return null
for(let r of e)t&&(r=r.toLowerCase()),n[r]=!0
return n}function bg(e){if(!e)return null
const t=yg(e.tags,!0),n=yg(e.ids),r=yg(e.classes)
return null===t&&null===n&&null===r?null:{tags:t,ids:n,classes:r}}function kg(e){let t=!1
if(e.scopes&&Array.isArray(e.scopes)){t=Object.create(null)
for(let n=0;n<e.scopes.length;n++){const r=e.scopes[n]
if(!r||!Array.isArray(r))throw new Error("Wrong usage format")
for(const e of r){if(gg.call(t,e))throw new Error(`Class can't be used for several scopes: ${e}`)
t[e]=n+1}}}return{whitelist:bg(e),blacklist:bg(e.blacklist),scopes:t}}function vg(e){return!e||!e.children||e.children.isEmpty}function Sg(e,t){return null!==e&&e.children===t}const{hasOwnProperty:wg}=Object.prototype,xg=new Set(["keyframes"])
function Cg(e,t){return e.children.forEach((n,r,s)=>{let i=!1
cg(n,function(n){if(null===this.selector||this.selector===e)switch(n.type){case"SelectorList":null!==this.function&&"not"===this.function.name.toLowerCase()||Cg(n,t)&&(i=!0)
break
case"ClassSelector":null===t.whitelist||null===t.whitelist.classes||wg.call(t.whitelist.classes,n.name)||(i=!0),null!==t.blacklist&&null!==t.blacklist.classes&&wg.call(t.blacklist.classes,n.name)&&(i=!0)
break
case"IdSelector":null===t.whitelist||null===t.whitelist.ids||wg.call(t.whitelist.ids,n.name)||(i=!0),null!==t.blacklist&&null!==t.blacklist.ids&&wg.call(t.blacklist.ids,n.name)&&(i=!0)
break
case"TypeSelector":"*"!==n.name.charAt(n.name.length-1)&&(null===t.whitelist||null===t.whitelist.tags||wg.call(t.whitelist.tags,n.name.toLowerCase())||(i=!0),null!==t.blacklist&&null!==t.blacklist.tags&&wg.call(t.blacklist.tags,n.name.toLowerCase())&&(i=!0))}}),i&&s.remove(r)}),e.children.isEmpty}const Ag={Atrule:function(e,t,n){if(e.block&&(null!==this.stylesheet&&(this.stylesheet.firstAtrulesAllowed=!1),vg(e.block)))return n.remove(t),void 0
switch(e.name){case"charset":if(vg(e.prelude))return n.remove(t),void 0
if(t.prev)return n.remove(t),void 0
break
case"import":if(null===this.stylesheet||!this.stylesheet.firstAtrulesAllowed)return n.remove(t),void 0
n.prevUntil(t.prev,function(e){if("Atrule"!==e.type||"import"!==e.name&&"charset"!==e.name)return this.root.firstAtrulesAllowed=!1,n.remove(t),!0},this)
break
default:{const r=ph(e.name).basename
"keyframes"!==r&&"media"!==r&&"supports"!==r||(vg(e.prelude)||vg(e.block))&&n.remove(t)}}},Comment:function(e,t,n){n.remove(t)},Declaration:function(e,t,n){if(e.value.children&&e.value.children.isEmpty)return n.remove(t),void 0
dh(e.property).custom&&/\S/.test(e.value.value)&&(e.value.value=e.value.value.trim())},Raw:function(e,t,n){(Sg(this.stylesheet,n)||Sg(this.block,n))&&n.remove(t)},Rule:function(e,t,n,r){if(vg(e.prelude)||vg(e.block))return n.remove(t),void 0
if(this.atrule&&xg.has(ph(this.atrule.name).basename))return
const{usage:s}=r
return s&&(null!==s.whitelist||null!==s.blacklist)&&(Cg(e.prelude,s),vg(e.prelude))?(n.remove(t),void 0):void 0},TypeSelector:function(e,t,n){if("*"!==t.data.name)return
const r=t.next&&t.next.data.type
"IdSelector"!==r&&"ClassSelector"!==r&&"AttributeSelector"!==r&&"PseudoClassSelector"!==r&&"PseudoElementSelector"!==r||n.remove(t)},WhiteSpace:function(e,t,n){n.remove(t)}}
const _g=/^(-?\d|--)|[\u0000-\u002c\u002e\u002f\u003A-\u0040\u005B-\u005E\u0060\u007B-\u009f]/
function Tg(e){e.children.forEach((e,t,n)=>{"Identifier"===e.type&&"none"===e.name.toLowerCase()&&(n.head===n.tail?t.data={type:"Number",loc:e.loc,value:"0"}:n.remove(t))})}const Eg={font:function(e){const t=e.children
t.forEachRight(function(e,t){if("Identifier"===e.type)if("bold"===e.name)t.data={type:"Number",loc:e.loc,value:"700"}
else if("normal"===e.name){const e=t.prev
e&&"Operator"===e.data.type&&"/"===e.data.value&&this.remove(e),this.remove(t)}}),t.isEmpty&&t.insert(t.createItem({type:"Identifier",name:"normal"}))},"font-weight":function(e){const t=e.children.head.data
if("Identifier"===t.type)switch(t.name){case"normal":e.children.head.data={type:"Number",loc:t.loc,value:"400"}
break
case"bold":e.children.head.data={type:"Number",loc:t.loc,value:"700"}}},background:function(e){function t(){r.length||r.unshift({type:"Number",loc:null,value:"0"},{type:"Number",loc:null,value:"0"}),n.push.apply(n,r),r=[]}let n=[],r=[]
e.children.forEach(e=>{if("Operator"===e.type&&","===e.value)return t(),n.push(e),void 0;("Identifier"!==e.type||"transparent"!==e.name&&"none"!==e.name&&"repeat"!==e.name&&"scroll"!==e.name)&&r.push(e)}),t(),e.children=(new Eu).fromArray(n)},border:Tg,outline:Tg}
const Og=/^(?:\+|(-))?0*(\d*)(?:\.0*|(\.\d*?)0*)?$/
function Pg(e){const t=Og
return""!==(e=String(e).replace(t,"$1$2$3"))&&"-"!==e||(e="0"),e}const Lg=new Set(["calc","min","max","clamp"]),Ng=new Set(["px","mm","cm","in","pt","pc","em","ex","ch","rem","vh","vw","vmin","vmax","vm"])
const Dg=new Set(["width","min-width","max-width","height","min-height","max-height","flex","-ms-flex"])
const Mg={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},jg={800000:"maroon",800080:"purple",808000:"olive",808080:"gray","00ffff":"cyan",f0ffff:"azure",f5f5dc:"beige",ffe4c4:"bisque","000000":"black","0000ff":"blue",a52a2a:"brown",ff7f50:"coral",ffd700:"gold","008000":"green","4b0082":"indigo",fffff0:"ivory",f0e68c:"khaki","00ff00":"lime",faf0e6:"linen","000080":"navy",ffa500:"orange",da70d6:"orchid",cd853f:"peru",ffc0cb:"pink",dda0dd:"plum",f00:"red",ff0000:"red",fa8072:"salmon",a0522d:"sienna",c0c0c0:"silver",fffafa:"snow",d2b48c:"tan","008080":"teal",ff6347:"tomato",ee82ee:"violet",f5deb3:"wheat",ffffff:"white",ffff00:"yellow"}
function Ig(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Rg(e,t,n,r){let s,i,o
if(0===t)s=i=o=n
else{const r=n<0.5?n*(1+t):n+t-n*t,a=2*n-r
s=Ig(a,r,e+1/3),i=Ig(a,r,e),o=Ig(a,r,e-1/3)}return[Math.round(255*s),Math.round(255*i),Math.round(255*o),r]}function Fg(e){return 1===(e=e.toString(16)).length?"0"+e:e}function zg(e,t,n){let r=e.head,s=[],i=!1
for(;null!==r;){const{type:e,value:t}=r.data
switch(e){case"Number":case"Percentage":if(i)return
i=!0,s.push({type:e,value:Number(t)})
break
case"Operator":if(","===t){if(!i)return
i=!1}else if(i||"+"!==t)return
break
default:return}r=r.next}if(s.length===t){if(4===s.length){if("Number"!==s[3].type)return
s[3].type="Alpha"}if(n){if(s[0].type!==s[1].type||s[0].type!==s[2].type)return}else{if("Number"!==s[0].type||"Percentage"!==s[1].type||"Percentage"!==s[2].type)return
s[0].type="Angle"}return s.map(function(e){let t=Math.max(0,e.value)
switch(e.type){case"Number":t=Math.min(t,255)
break
case"Percentage":if(t=Math.min(t,100)/100,!n)return t
t*=255
break
case"Angle":return(t%360+360)%360/360
case"Alpha":return Math.min(t,1)}return Math.round(t)})}}function Gg(e,t){let n=e.value.toLowerCase()
6===n.length&&n[0]===n[1]&&n[2]===n[3]&&n[4]===n[5]&&(n=n[0]+n[2]+n[4]),jg[n]?t.data={type:"Identifier",loc:e.loc,name:jg[n]}:e.value=n}const Bg={Atrule:function(e){"keyframes"===ph(e.name).basename&&!function(e){e.block.children.forEach(e=>{e.prelude.children.forEach(e=>{e.children.forEach((e,t)=>{"Percentage"===e.type&&"100"===e.value?t.data={type:"TypeSelector",loc:e.loc,name:"to"}:"TypeSelector"===e.type&&"from"===e.name&&(t.data={type:"Percentage",loc:e.loc,value:"0"})})})})}(e)},AttributeSelector:function(e){const t=e.value
t&&"String"===t.type&&function(e){return""!==e&&"-"!==e&&!_g.test(e)}(t.value)&&(e.value={type:"Identifier",loc:t.loc,name:t.value})},Value:function(e){if(!this.declaration)return
const t=dh(this.declaration.property)
Eg.hasOwnProperty(t.basename)&&Eg[t.basename](e)},Dimension:function(e,t){const n=Pg(e.value)
if(e.value=n,"0"===n&&null!==this.declaration&&null===this.atrulePrelude){const r=e.unit.toLowerCase()
if(!Ng.has(r))return
if("-ms-flex"===this.declaration.property||"flex"===this.declaration.property)return
if(this.function&&Lg.has(this.function.name))return
t.data={type:"Number",loc:e.loc,value:n}}},Percentage:function(e,t){e.value=Pg(e.value),"0"===e.value&&this.declaration&&!Dg.has(this.declaration.property)&&(t.data={type:"Number",loc:e.loc,value:e.value},ag.matchDeclaration(this.declaration).isType(t.data,"length")||(t.data=e))},Number:function(e){e.value=Pg(e.value)},Url:function(e){e.value=e.value.replace(/\\/g,"/")},Hash:Gg,Identifier:function(e,t){if(null===this.declaration)return
let n=e.name.toLowerCase()
if(Mg.hasOwnProperty(n)&&ag.matchDeclaration(this.declaration).isType(e,"color")){const r=Mg[n]
r.length+1<=n.length?t.data={type:"Hash",loc:e.loc,value:r}:("grey"===n&&(n="gray"),e.name=n)}},Function:function(e,t){let n,r=e.name
if("rgba"===r||"hsla"===r){if(n=zg(e.children,4,"rgba"===r),!n)return
if("hsla"===r&&(n=Rg(...n),e.name="rgba"),0===n[3]){const r=this.function&&this.function.name
if(0===n[0]&&0===n[1]&&0===n[2]||!/^(?:to|from|color-stop)$|gradient$/i.test(r))return t.data={type:"Identifier",loc:e.loc,name:"transparent"},void 0}if(1!==n[3])return e.children.forEach((e,t,r)=>{if("Operator"===e.type)return","!==e.value&&r.remove(t),void 0
t.data={type:"Number",loc:e.loc,value:Pg(n.shift())}}),void 0
r="rgb"}if("hsl"===r){if(n=n||zg(e.children,3,!1),!n)return
n=Rg(...n),r="rgb"}if("rgb"===r){if(n=n||zg(e.children,3,!0),!n)return
t.data={type:"Hash",loc:e.loc,value:Fg(n[0])+Fg(n[1])+Fg(n[2])},Gg(t.data,t)}}}
class Ug{constructor(){this.map=new Map}resolve(e){let t=this.map.get(e)
return void 0===t&&(t=this.map.size+1,this.map.set(e,t)),t}}function qg(e){return function(e){return"Raw"===e.type?ig(e.value,{context:"selectorList"}):e}(e).children.reduce((e,t)=>function(e,t){for(let n=0;n<3;n++)if(e[n]!==t[n])return e[n]>t[n]?e:t
return e}(Wg(t),e),[0,0,0])}function Wg(e){let t=0,n=0,r=0
return e.children.forEach(e=>{switch(e.type){case"IdSelector":t++
break
case"ClassSelector":case"AttributeSelector":n++
break
case"PseudoClassSelector":switch(e.name.toLowerCase()){case"not":case"has":case"is":case"matches":case"-webkit-any":case"-moz-any":{const[s,i,o]=qg(e.children.first)
t+=s,n+=i,r+=o
break}case"nth-child":case"nth-last-child":{const s=e.children.first
if("Nth"===s.type&&s.selector){const[e,i,o]=qg(s.selector)
t+=e,n+=i+1,r+=o}else n++
break}case"where":break
case"before":case"after":case"first-line":case"first-letter":r++
break
default:n++}break
case"TypeSelector":e.name.endsWith("*")||r++
break
case"PseudoElementSelector":r++}}),[t,n,r]}const Vg=new Set(["first-letter","first-line","after","before"]),$g=new Set(["link","visited","hover","active","first-letter","first-line","after","before"])
function Yg(e,t){const n=function(){const e=new Ug
return function(t){const n=og(t)
return t.id=e.resolve(n),t.length=n.length,t.fingerprint=null,t}}()
return cg(e,{visit:"Rule",enter(e){e.block.children.forEach(n),function(e,t){const n=new Set
e.prelude.children.forEach(function(e){let r="*",s=0
e.children.forEach(function(i){switch(i.type){case"ClassSelector":if(t&&t.scopes){const n=t.scopes[i.name]||0
if(0!==s&&n!==s)throw new Error("Selector can't has classes from different scopes: "+og(e))
s=n}break
case"PseudoClassSelector":{const e=i.name.toLowerCase()
$g.has(e)||n.add(`:${e}`)
break}case"PseudoElementSelector":{const e=i.name.toLowerCase()
Vg.has(e)||n.add(`::${e}`)
break}case"TypeSelector":r=i.name.toLowerCase()
break
case"AttributeSelector":i.flags&&n.add(`[${i.flags.toLowerCase()}]`)
break
case"Combinator":r="*"}}),e.compareMarker=Wg(e).toString(),e.id=null,e.id=og(e),s&&(e.compareMarker+=":"+s),"*"!==r&&(e.compareMarker+=","+r)}),e.pseudoSignature=n.size>0&&[...n].sort().join(",")}(e,t.usage)}}),cg(e,{visit:"Atrule",enter(e){e.prelude&&(e.prelude.id=null,e.prelude.id=og(e.prelude)),"keyframes"===ph(e.name).basename&&(e.block.avoidRulesMerge=!0,e.block.children.forEach(function(e){e.prelude.children.forEach(function(e){e.compareMarker=e.id})}))}}),{declaration:n}}const{hasOwnProperty:Xg}=Object.prototype
function Hg(e,t,n,r){const s=t.data,i=ph(s.name).basename,o=s.name.toLowerCase()+"/"+(s.prelude?s.prelude.id:null)
Xg.call(e,i)||(e[i]=Object.create(null)),r&&delete e[i][o],Xg.call(e[i],o)||(e[i][o]=new Eu),e[i][o].append(n.remove(t))}function Qg(e){return"Atrule"===e.type&&"media"===e.name}function Kg(e,t,n){if(!Qg(e))return
const r=t.prev&&t.prev.data
r&&Qg(r)&&e.prelude&&r.prelude&&e.prelude.id===r.prelude.id&&(r.block.children.appendList(e.block.children),n.remove(t))}function Zg(e,t){!function(e,t){const n=Object.create(null)
let r=null
e.children.forEach(function(e,s,i){if("Atrule"===e.type){const o=ph(e.name).basename
switch(o){case"keyframes":return Hg(n,s,i,!0),void 0
case"media":if(t.forceMediaMerge)return Hg(n,s,i,!1),void 0}null===r&&"charset"!==o&&"import"!==o&&(r=s)}else null===r&&(r=s)})
for(const t in n)for(const s in n[t])e.children.insertList(n[t][s],"media"===t?null:r)}(e,t),cg(e,{visit:"Atrule",reverse:!0,enter:Kg})}const{hasOwnProperty:Jg}=Object.prototype
function ey(e,t){let n=e.head,r=t.head
for(;null!==n&&null!==r&&n.data.id===r.data.id;)n=n.next,r=r.next
return null===n&&null===r}function ty(e,t){let n=e.head,r=t.head
for(;null!==n&&null!==r&&n.data.id===r.data.id;)n=n.next,r=r.next
return null===n&&null===r}function ny(e,t){return t.forEach(t=>{const n=t.id
let r=e.head
for(;r;){const e=r.data.id
if(e===n)return
if(e>n)break
r=r.next}e.insert(e.createItem(t),r)}),e}function ry(e,t){let n=e.head
for(;null!==n;){let e=t.head
for(;null!==e;){if(n.data.compareMarker===e.data.compareMarker)return!0
e=e.next}n=n.next}return!1}function sy(e){switch(e.type){case"Rule":return ry(e.prelude.children,this)
case"Atrule":if(e.block)return e.block.children.some(sy,this)
break
case"Declaration":return!1}return!0}function iy(e,t,n){const r=e.prelude.children,s=e.block.children
n.prevUntil(t.prev,function(i){if("Rule"!==i.type)return sy.call(r,i)
const o=i.prelude.children,a=i.block.children
if(e.pseudoSignature===i.pseudoSignature){if(ey(o,r))return a.appendList(s),n.remove(t),!0
if(ty(s,a))return ny(o,r),n.remove(t),!0}return ry(r,o)})}function oy(e,t,n){const r=e.prelude.children
for(;r.head!==r.tail;){const s=new Eu
s.insert(r.remove(r.head)),n.insert(n.createItem({type:"Rule",loc:e.loc,prelude:{type:"SelectorList",loc:e.prelude.loc,children:s},block:{type:"Block",loc:e.block.loc,children:e.block.children.copy()},pseudoSignature:e.pseudoSignature}),t)}}const ay=["top","right","bottom","left"],ly={"margin-top":"top","margin-right":"right","margin-bottom":"bottom","margin-left":"left","padding-top":"top","padding-right":"right","padding-bottom":"bottom","padding-left":"left","border-top-color":"top","border-right-color":"right","border-bottom-color":"bottom","border-left-color":"left","border-top-width":"top","border-right-width":"right","border-bottom-width":"bottom","border-left-width":"left","border-top-style":"top","border-right-style":"right","border-bottom-style":"bottom","border-left-style":"left"},cy={margin:"margin","margin-top":"margin","margin-right":"margin","margin-bottom":"margin","margin-left":"margin",padding:"padding","padding-top":"padding","padding-right":"padding","padding-bottom":"padding","padding-left":"padding","border-color":"border-color","border-top-color":"border-color","border-right-color":"border-color","border-bottom-color":"border-color","border-left-color":"border-color","border-width":"border-width","border-top-width":"border-width","border-right-width":"border-width","border-bottom-width":"border-width","border-left-width":"border-width","border-style":"border-style","border-top-style":"border-style","border-right-style":"border-style","border-bottom-style":"border-style","border-left-style":"border-style"}
class uy{constructor(e){this.name=e,this.loc=null,this.iehack=void 0,this.sides={top:null,right:null,bottom:null,left:null}}getValueSequence(e,t){const n=[]
let r=""
return!("Value"!==e.value.type||e.value.children.some(function(t){let s=!1
switch(t.type){case"Identifier":switch(t.name){case"\\0":case"\\9":return r=t.name,void 0
case"inherit":case"initial":case"unset":case"revert":s=t.name}break
case"Dimension":switch(t.unit){case"rem":case"vw":case"vh":case"vmin":case"vmax":case"vm":s=t.unit}break
case"Hash":case"Number":case"Percentage":break
case"Function":if("var"===t.name)return!0
s=t.name
break
default:return!0}n.push({node:t,special:s,important:e.important})})||n.length>t)&&(("string"!=typeof this.iehack||this.iehack===r)&&(this.iehack=r,n))}canOverride(e,t){const n=this.sides[e]
return!n||t.important&&!n.important}add(e,t){return!!function(){const n=this.sides,r=ly[e]
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
for(let t=0;t<4;t++)this.canOverride(ay[t],e[t])&&(n[ay[t]]=e[t])
return!0}}.call(this)&&(this.loc||(this.loc=t.loc),!0)}isOkToMinimize(){const e=this.sides.top,t=this.sides.right,n=this.sides.bottom,r=this.sides.left
if(e&&t&&n&&r){const s=e.important+t.important+n.important+r.important
return 0===s||4===s}return!1}getValue(){const e=new Eu,t=this.sides,n=[t.top,t.right,t.bottom,t.left],r=[og(t.top.node),og(t.right.node),og(t.bottom.node),og(t.left.node)]
r[3]===r[1]&&(n.pop(),r[2]===r[0]&&(n.pop(),r[1]===r[0]&&n.pop()))
for(let t=0;t<n.length;t++)e.appendData(n[t].node)
return this.iehack&&e.appendData({type:"Identifier",loc:null,name:this.iehack}),{type:"Value",loc:null,children:e}}getDeclaration(){return{type:"Declaration",loc:this.loc,important:this.sides.top.important,property:this.name,value:this.getValue()}}}function hy(e,t,n,r){const s=e.block.children,i=e.prelude.children.first.id
return e.block.children.forEachRight(function(e,o){const a=e.property
if(!cy.hasOwnProperty(a))return
const l=cy[a]
let c,u
if(r&&i!==r||l in t&&(u=2,c=t[l]),!(c&&c.add(a,e)||(u=1,c=new uy(l),c.add(a,e))))return r=null,void 0
t[l]=c,n.push({operation:u,block:s,item:o,shorthand:c}),r=i}),r}function fy(e,t){const n={},r=[]
cg(e,{visit:"Rule",reverse:!0,enter(e){const t=this.block||this.stylesheet,s=(e.pseudoSignature||"")+"|"+e.prelude.children.first.id
let i,o
n.hasOwnProperty(t.id)?i=n[t.id]:(i={lastShortSelector:null},n[t.id]=i),i.hasOwnProperty(s)?o=i[s]:(o={},i[s]=o),i.lastShortSelector=hy.call(this,e,o,r,i.lastShortSelector)}}),function(e,t){e.forEach(function(e){const n=e.shorthand
n.isOkToMinimize()&&(1===e.operation?e.item.data=t(n.getDeclaration()):e.block.remove(e.item))})}(r,t.declaration)}let py=1
const dy=new Set(["src"]),my={display:/table|ruby|flex|-(flex)?box$|grid|contents|run-in/i,"text-align":/^(start|end|match-parent|justify-all)$/i},gy={cursor:["auto","crosshair","default","move","text","wait","help","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","pointer","progress","not-allowed","no-drop","vertical-text","all-scroll","col-resize","row-resize"],overflow:["hidden","visible","scroll","auto"],position:["static","relative","absolute","fixed"]},yy={"border-width":["border"],"border-style":["border"],"border-color":["border"],"border-top":["border"],"border-right":["border"],"border-bottom":["border"],"border-left":["border"],"border-top-width":["border-top","border-width","border"],"border-right-width":["border-right","border-width","border"],"border-bottom-width":["border-bottom","border-width","border"],"border-left-width":["border-left","border-width","border"],"border-top-style":["border-top","border-style","border"],"border-right-style":["border-right","border-style","border"],"border-bottom-style":["border-bottom","border-style","border"],"border-left-style":["border-left","border-style","border"],"border-top-color":["border-top","border-color","border"],"border-right-color":["border-right","border-color","border"],"border-bottom-color":["border-bottom","border-color","border"],"border-left-color":["border-left","border-color","border"],"margin-top":["margin"],"margin-right":["margin"],"margin-bottom":["margin"],"margin-left":["margin"],"padding-top":["padding"],"padding-right":["padding"],"padding-bottom":["padding"],"padding-left":["padding"],"font-style":["font"],"font-variant":["font"],"font-weight":["font"],"font-size":["font"],"font-family":["font"],"list-style-type":["list-style"],"list-style-position":["list-style"],"list-style-image":["list-style"]}
function by(e,t,n){const r=dh(e).basename
if("background"===r)return e+":"+og(t.value)
const s=t.id
let i=n[s]
if(!i){switch(t.value.type){case"Value":const e={}
let n="",s="",o=!1
t.value.children.forEach(function t(i){switch(i.type){case"Value":case"Brackets":case"Parentheses":i.children.forEach(t)
break
case"Raw":o=!0
break
case"Identifier":{const{name:t}=i
n||(n=ph(t).vendor),/\\[09]/.test(t)&&(s=RegExp.lastMatch),gy.hasOwnProperty(r)?-1===gy[r].indexOf(t)&&(e[t]=!0):my.hasOwnProperty(r)&&my[r].test(t)&&(e[t]=!0)
break}case"Function":{let{name:r}=i
if(n||(n=ph(r).vendor),"rect"===r){i.children.some(e=>"Operator"===e.type&&","===e.value)||(r="rect-backward")}e[r+"()"]=!0,i.children.forEach(t)
break}case"Dimension":{const{unit:t}=i
switch(/\\[09]/.test(t)&&(s=RegExp.lastMatch),t){case"rem":case"vw":case"vh":case"vmin":case"vmax":case"vm":e[t]=!0}break}}}),i=o?"!"+py++:"!"+Object.keys(e).sort()+"|"+s+n
break
case"Raw":i="!"+t.value.value
break
default:i=og(t.value)}n[s]=i}return e+i}function ky(e,t,n){const r=dh(t.property)
if(yy.hasOwnProperty(r.basename)){const s=yy[r.basename]
for(const i of s){const s=by(r.prefix+i,t,n),o=e.hasOwnProperty(s)?e[s]:null
if(o&&(!t.important||o.item.data.important))return o}}}function vy(e,t,n,r,s){const i=e.block.children
i.forEachRight(function(e,t){const{property:n}=e,o=by(n,e,s),a=r[o]
if(a&&!dy.has(n))e.important&&!a.item.data.important?(r[o]={block:i,item:t},a.block.remove(a.item)):i.remove(t)
else{ky(r,e,s)?i.remove(t):(e.fingerprint=o,r[o]={block:i,item:t})}}),i.isEmpty&&n.remove(t)}function Sy(e){const t={},n=Object.create(null)
cg(e,{visit:"Rule",reverse:!0,enter(e,r,s){const i=this.block||this.stylesheet,o=(e.pseudoSignature||"")+"|"+e.prelude.children.first.id
let a,l
t.hasOwnProperty(i.id)?a=t[i.id]:(a={},t[i.id]=a),a.hasOwnProperty(o)?l=a[o]:(l={},a[o]=l),vy.call(this,e,r,s,l,n)}})}function wy(e,t,n){const r=e.prelude.children,s=e.block.children,i=r.first.compareMarker,o={}
n.nextUntil(t.next,function(t,a){if("Rule"!==t.type)return sy.call(r,t)
if(e.pseudoSignature!==t.pseudoSignature)return!0
const l=t.prelude.children.head,c=t.block.children,u=l.data.compareMarker
if(u in o)return!0
if(r.head===r.tail&&r.first.id===l.data.id)return s.appendList(c),n.remove(a),void 0
if(ty(s,c)){const e=l.data.id
return r.some((t,n)=>{const s=t.id
return e<s?(r.insert(l,n),!0):n.next?void 0:(r.insert(l),!0)}),n.remove(a),void 0}if(u===i)return!0
o[u]=!0})}function xy(e){return e.reduce((e,t)=>e+t.id.length+1,0)-1}function Cy(e){let t=0
for(const n of e)t+=n.length
return t+e.length-1}function Ay(e,t,n){const r=null!==this.block&&this.block.avoidRulesMerge,s=e.prelude.children,i=e.block,o=Object.create(null)
let a=!0,l=!0
n.prevUntil(t.prev,function(c,u){const h=c.block,f=c.type
if("Rule"!==f){const e=sy.call(s,c)
return!e&&"Atrule"===f&&h&&cg(h,{visit:"Rule",enter(e){e.prelude.children.forEach(e=>{o[e.compareMarker]=!0})}}),e}if(e.pseudoSignature!==c.pseudoSignature)return!0
const p=c.prelude.children
if(l=!p.some(e=>e.compareMarker in o),!l&&!a)return!0
if(a&&ey(p,s))return h.children.appendList(i.children),n.remove(t),!0
const d=function(e,t){const n={eq:[],ne1:[],ne2:[],ne2overrided:[]},r=Object.create(null),s=Object.create(null)
for(let e=t.head;e;e=e.next)s[e.data.id]=!0
for(let t=e.head;t;t=t.next){const e=t.data
e.fingerprint&&(r[e.fingerprint]=e.important),s[e.id]?(s[e.id]=!1,n.eq.push(e)):n.ne1.push(e)}for(let e=t.head;e;e=e.next){const t=e.data
s[t.id]&&((!Jg.call(r,t.fingerprint)||!r[t.fingerprint]&&t.important)&&n.ne2.push(t),n.ne2overrided.push(t))}return n}(i.children,h.children)
if(d.eq.length){if(!d.ne1.length&&!d.ne2.length)return l&&(ny(s,p),n.remove(u)),!0
if(!r)if(d.ne1.length&&!d.ne2.length){const e=xy(s),t=Cy(d.eq)
a&&e<t&&(ny(p,s),i.children.fromArray(d.ne1))}else if(!d.ne1.length&&d.ne2.length){const e=xy(p),t=Cy(d.eq)
l&&e<t&&(ny(s,p),h.children.fromArray(d.ne2))}else{const r={type:"SelectorList",loc:null,children:ny(p.copy(),s)},o=xy(r.children)+2
if(Cy(d.eq)>=o){const s=n.createItem({type:"Rule",loc:null,prelude:r,block:{type:"Block",loc:null,children:(new Eu).fromArray(d.eq)},pseudoSignature:e.pseudoSignature})
return i.children.fromArray(d.ne1),h.children.fromArray(d.ne2overrided),a?n.insert(s,u):n.insert(s,t),!0}}}a&&(a=!p.some(e=>s.some(t=>t.compareMarker===e.compareMarker))),p.forEach(e=>{o[e.compareMarker]=!0})})}function _y(e,t){const n=Yg(e,t)
t.logger("prepare",e),Zg(e,t),t.logger("mergeAtrule",e),function(e){cg(e,{visit:"Rule",enter:iy})}(e),t.logger("initialMergeRuleset",e),function(e){cg(e,{visit:"Rule",reverse:!0,enter:oy})}(e),t.logger("disjoinRuleset",e),fy(e,n),t.logger("restructShorthand",e),Sy(e),t.logger("restructBlock",e),function(e){cg(e,{visit:"Rule",enter:wy})}(e),t.logger("mergeRuleset",e),function(e){cg(e,{visit:"Rule",reverse:!0,enter:Ay})}(e),t.logger("restructRuleset",e)}function Ty(e,t){const n=new Eu
let r,s=!1
return e.nextUntil(e.head,(e,i,o)=>{if("Comment"===e.type)return t&&"!"===e.value.charAt(0)?!(!s&&!r)||(o.remove(i),r=e,void 0):(o.remove(i),void 0)
"WhiteSpace"!==e.type&&(s=!0),n.insert(o.remove(i))}),{comment:r,stylesheet:{type:"StyleSheet",loc:null,children:n}}}function Ey(e,t,n,r){r.logger(`Compress block #${n}`,null,!0)
let s=1
return"StyleSheet"===e.type&&(e.firstAtrulesAllowed=t,e.id=s++),cg(e,{visit:"Atrule",enter(e){null!==e.block&&(e.block.id=s++)}}),r.logger("init",e),function(e,t){cg(e,{leave(e,n,r){Ag.hasOwnProperty(e.type)&&Ag[e.type].call(this,e,n,r,t)}})}(e,r),r.logger("clean",e),function(e){cg(e,{leave(e,t,n){Bg.hasOwnProperty(e.type)&&Bg[e.type].call(this,e,t,n)}})}(e),r.logger("replace",e),r.restructuring&&_y(e,r),e}function Oy(e){return"restructure"in e?e.restructure:!("restructuring"in e)||e.restructuring}function Py(e){const t=lm(e,!0),n=lm(e)
return t.length<n.length?t:n}const{lexer:Ly,tokenize:Ny,parse:Dy,generate:My,walk:jy,find:Iy,findLast:Ry,findAll:Fy,fromPlainObject:zy,toPlainObject:Gy}=mg({node:{String:{generate(e){this.token(5,Py(e.value))}},Url:{generate(e){const t=_m(e.value),n=Py(e.value)
this.token(7,t.length<=n.length+5?t:"url("+n+")")}}}})
var By=Object.freeze({__proto__:null,compress:function(e,t){e=e||{type:"StyleSheet",loc:null,children:new Eu}
const n={logger:"function"==typeof(t=t||{}).logger?t.logger:function(){},restructuring:Oy(t),forceMediaMerge:Boolean(t.forceMediaMerge),usage:!!t.usage&&kg(t.usage)},r=new Eu
let s,i,o,a=function(e){let t="comments"in e?e.comments:"exclamation"
return"boolean"==typeof t?t=!!t&&"exclamation":"exclamation"!==t&&"first-exclamation"!==t&&(t=!1),t}(t),l=!0,c=1
var u
t.clone&&(e=rg(e)),"StyleSheet"===e.type?(s=e.children,e.children=r):(u=e,s=(new Eu).appendData({type:"Rule",loc:null,prelude:{type:"SelectorList",loc:null,children:(new Eu).appendData({type:"Selector",loc:null,children:(new Eu).appendData({type:"TypeSelector",loc:null,name:"x"})})},block:u}))
do{if(i=Ty(s,Boolean(a)),Ey(i.stylesheet,l,c++,n),o=i.stylesheet.children,i.comment&&(r.isEmpty||r.insert(Eu.createItem({type:"Raw",value:"\n"})),r.insert(Eu.createItem(i.comment)),o.isEmpty||r.insert(Eu.createItem({type:"Raw",value:"\n"}))),l&&!o.isEmpty){const e=o.last;("Atrule"!==e.type||"import"!==e.name&&"charset"!==e.name)&&(l=!1)}"exclamation"!==a&&(a=!1),r.appendList(o)}while(!s.isEmpty)
return{ast:e}},find:Iy,findAll:Fy,findLast:Ry,fromPlainObject:zy,generate:My,lexer:Ly,parse:Dy,specificity:Wg,toPlainObject:Gy,tokenize:Ny,walk:jy})
const{parse:Uy,generate:qy,compress:Wy}=By
function Vy(e,t,n,r){return t.debug&&console.error(`## ${e} done in %d ms\n`,Date.now()-n),r}function $y(e){return"function"!=typeof(e={...e}).logger&&e.debug&&(e.logger=function(e){let t
return function(n,r){let s=n
if(r&&(s=`[${((Date.now()-t)/1000).toFixed(3)}s] ${s}`),e>1&&r){let t=qy(r)
2===e&&t.length>256&&(t=t.substr(0,256)+"..."),s+=`\n  ${t}\n`}console.error(s),t=Date.now()}}(e.debug)),e}function Yy(e,t,n){Array.isArray(n)||(n=[n]),n.forEach(n=>n(e,t))}function Xy(e,t,n){const r=(n=n||{}).filename||"<unknown>"
let s
const i=Vy("parsing",n,Date.now(),Uy(t,{context:e,filename:r,positions:Boolean(n.sourceMap)}))
n.beforeCompress&&Vy("beforeCompress",n,Date.now(),Yy(i,n,n.beforeCompress))
const o=Vy("compress",n,Date.now(),Wy(i,$y(n)))
return n.afterCompress&&Vy("afterCompress",n,Date.now(),Yy(o,n,n.afterCompress)),s=n.sourceMap?Vy("generate(sourceMap: true)",n,Date.now(),(()=>{const e=qy(o.ast,{sourceMap:!0})
return e.map._file=r,e.map.setSourceContent(r,t),e})()):Vy("generate",n,Date.now(),{css:qy(o.ast),map:null}),s}function Hy(e,t){return Xy("stylesheet",e,t)}function Qy(e,t){return Xy("declarationList",e,t)}const Ky=wc.skip,Zy=(e,t)=>{const n=[]
e.block.children.forEach(e=>{"Declaration"===e.type&&n.push({name:e.property,value:kc(e.value),important:!0===e.important})})
const r=[]
return wc(e.prelude,e=>{if("Selector"===e.type){const s=gc(e)
let i=!1
wc(s,(e,t,n)=>{"PseudoClassSelector"===e.type&&(i=!0,n.remove(t))}),r.push({specificity:Wg(e),dynamic:i||t,selector:kc(s),declarations:n})}}),r},Jy=(e,t)=>{const n=[],r=bc(e,{parseValue:!1,parseAtrulePrelude:!1})
return wc(r,e=>"Rule"===e.type?(n.push(...Zy(e,t||!1)),Ky):"Atrule"===e.type?(["keyframes","-webkit-keyframes","-o-keyframes","-moz-keyframes"].includes(e.name)||wc(e,e=>{if("Rule"===e.type)return n.push(...Zy(e,t||!0)),Ky}),Ky):void 0),n},eb=(e,t,n)=>{const r={},s=new Map
for(const[e,n]of Object.entries(t.attributes))It.presentation.has(e)&&(r[e]={type:"static",inherited:!1,value:n},s.set(e,!1))
for(const{selector:i,declarations:o,dynamic:a}of e.rules)if(Tt(t,i,n))for(const{name:e,value:t,important:n}of o){const i=r[e]
i&&"dynamic"===i.type||(a?r[e]={type:"dynamic",inherited:!1}:null!=i&&!0!==n&&!1!==s.get(e)||(r[e]={type:"static",inherited:!1,value:t},s.set(e,n)))}const i=null==t.attributes.style?[]:(e=>{const t=[],n=bc(e,{context:"declarationList",parseValue:!1})
return wc(n,e=>{"Declaration"===e.type&&t.push({name:e.property,value:kc(e.value),important:!0===e.important})}),t})(t.attributes.style)
for(const{name:e,value:t,important:n}of i){const i=r[e]
i&&"dynamic"===i.type||(null!=i&&!0!==n&&!1!==s.get(e)||(r[e]={type:"static",inherited:!1,value:t},s.set(e,n)))}return r},tb=(e,t)=>{for(let n=0;n<4;n+=1){if(e[n]<t[n])return-1
if(e[n]>t[n])return 1}return 0},nb=e=>{const t=[],n=new Map
return a(e,{element:{enter:(e,r)=>{if(n.set(e,r),"style"===e.name&&(null==e.attributes.type||""===e.attributes.type||"text/css"===e.attributes.type)){const n=null!=e.attributes.media&&"all"!==e.attributes.media
for(const r of e.children)"text"!==r.type&&"cdata"!==r.type||t.push(...Jy(r.value,n))}}}}),t.sort((e,t)=>tb(e.specificity,t.specificity)),{rules:t,parents:n}},rb=(e,t)=>{const{parents:n}=e,r=eb(e,t,n)
let s=n.get(t)
for(;null!=s&&"root"!==s.type;){const t=eb(e,s,n)
for(const[e,n]of Object.entries(t))null==r[e]&&Ut.has(e)&&!qt.has(e)&&(r[e]={...n,inherited:!0})
s=n.get(s)}return r},sb=(e,t,n=null,r=!1)=>{const s=xe("string"==typeof e?e:kc(e.data))
for(const e of s){if(e.some((s,i)=>{if(r){if(i===e.length-1)return!1
if(!ye(e[i+1]))return!1}return"attribute"===s.type&&s.name===t&&(null==n||s.value===n)}))return!0}return!1}
function ib(e,t,n,r){t&&(t.safe&&t.safe.forEach(t=>{r.has(t)||delete e.attributes[t]}),n.removeUnsafe&&t.unsafe&&t.unsafe.forEach(t=>{r.has(t)||delete e.attributes[t]}))}var ob=Object.freeze({__proto__:null,description:"removes deprecated attributes",fn:function(e,t){const n=function(e){const t=new Set
return e.rules.forEach(e=>{xe(e.selector).forEach(e=>{e.forEach(e=>{"attribute"===e.type&&t.add(e.name)})})}),t}(nb(e))
return{element:{enter:e=>{const r=zt[e.name]
r&&(r.attrsGroups.has("core")&&e.attributes["xml:lang"]&&!n.has("xml:lang")&&e.attributes.lang&&delete e.attributes["xml:lang"],r.attrsGroups.forEach(r=>{ib(e,Ft[r],t,n)}),ib(e,r.deprecated,t,n))}}}},name:"removeDeprecatedAttrs"})
var ab=Object.freeze({__proto__:null,description:"removes <metadata>",fn:()=>({element:{enter:(e,t)=>{"metadata"===e.name&&Et(e,t)}}}),name:"removeMetadata"})
var lb=Object.freeze({__proto__:null,description:"removes editors namespaces, elements and attributes",fn:(e,t)=>{let n=[...Gt]
Array.isArray(t.additionalNamespaces)&&(n=[...Gt,...t.additionalNamespaces])
const r=[]
return{element:{enter:(e,t)=>{if("svg"===e.name)for(const[t,s]of Object.entries(e.attributes))t.startsWith("xmlns:")&&n.includes(s)&&(r.push(t.slice(6)),delete e.attributes[t])
for(const t of Object.keys(e.attributes))if(t.includes(":")){const[n]=t.split(":")
r.includes(n)&&delete e.attributes[t]}if(e.name.includes(":")){const[n]=e.name.split(":")
r.includes(n)&&Et(e,t)}}}}},name:"removeEditorsNSData"})
const cb=/(\S)\r?\n(\S)/g,ub=/\r?\n/g,hb=/\s{2,}/g
var fb=Object.freeze({__proto__:null,description:"cleanups attributes from newlines, trailing and repeating spaces",fn:(e,t)=>{const{newlines:n=!0,trim:r=!0,spaces:s=!0}=t
return{element:{enter:e=>{for(const t of Object.keys(e.attributes))n&&(e.attributes[t]=e.attributes[t].replace(cb,(e,t,n)=>t+" "+n),e.attributes[t]=e.attributes[t].replace(ub,"")),r&&(e.attributes[t]=e.attributes[t].trim()),s&&(e.attributes[t]=e.attributes[t].replace(hb," "))}}}},name:"cleanupAttrs"})
var pb=Object.freeze({__proto__:null,description:"merge multiple style elements into one",fn:()=>{let e=null,t="",n="text"
return{element:{enter:(r,s)=>{if("foreignObject"===r.name)return o
if("style"!==r.name)return
if(null!=r.attributes.type&&""!==r.attributes.type&&"text/css"!==r.attributes.type)return
let i=""
for(const e of r.children)"text"===e.type&&(i+=e.value),"cdata"===e.type&&(n="cdata",i+=e.value)
if(0===i.trim().length)return Et(r,s),void 0
if(null==r.attributes.media?t+=i:(t+=`@media ${r.attributes.media}{${i}}`,delete r.attributes.media),null==e)e=r
else{Et(r,s)
const i={type:n,value:t}
e.children=[i]}}}}},name:"mergeStyles"})
const db=[...Yt.functional,...Yt.treeStructural]
var mb=Object.freeze({__proto__:null,description:"inline styles (additional options)",fn:(e,t)=>{const{onlyMatchedOnce:n=!0,removeMatchedSelectors:r=!0,useMqs:s=["","screen"],usePseudos:i=[""]}=t,a=[],l=[]
return{element:{enter:(e,t)=>{if("foreignObject"===e.name)return o
if("style"!==e.name||0===e.children.length)return
if(null!=e.attributes.type&&""!==e.attributes.type&&"text/css"!==e.attributes.type)return
const n=e.children.filter(e=>"text"===e.type||"cdata"===e.type).map(e=>e.value).join("")
let r=null
try{r=bc(n,{parseValue:!1,parseCustomProperty:!1})}catch{return}"StyleSheet"===r.type&&a.push({node:e,parentNode:t,cssAst:r}),wc(r,{visit:"Rule",enter(e){const t=this.atrule
let n=""
null!=t&&(n=t.name,null!=t.prelude&&(n+=` ${kc(t.prelude)}`)),s.includes(n)&&"SelectorList"===e.prelude.type&&e.prelude.children.forEach((t,n)=>{if("Selector"===t.type){const r=[]
t.children.forEach((e,t,n)=>{("PseudoClassSelector"===e.type||"PseudoElementSelector"===e.type)&&!db.includes(e.name)&&r.push({item:t,list:n})})
const s=kc({type:"Selector",children:(new Xn).fromArray(r.map(e=>e.item.data))})
if(i.includes(s))for(const e of r)e.list.remove(e.item)
l.push({node:t,rule:e,item:n})}})}})}},root:{exit:()=>{if(0===a.length)return
const t=l.slice().sort((e,t)=>{const n=Wg(e.item.data),r=Wg(t.item.data)
return tb(n,r)}).reverse()
for(const s of t){const t=kc(s.item.data),i=[]
try{for(const n of At(e,t))"element"===n.type&&i.push(n)}catch{continue}if(0!==i.length&&!(n&&i.length>1)){for(const e of i){const t=bc(e.attributes.style??"",{context:"declarationList",parseValue:!1})
if("DeclarationList"!==t.type)continue
const n=new Map
let r
wc(t,{visit:"Declaration",enter(e,t){null==r&&(r=t),n.set(e.property.toLowerCase(),t)}}),wc(s.rule,{visit:"Declaration",enter(s){const i=s.property
It.presentation.has(i)&&!l.some(e=>sb(e.item,i))&&delete e.attributes[i]
const o=n.get(i),a=t.children.createItem(s)
null==o?t.children.insert(a,r):!0!==o.data.important&&!0===s.important&&(t.children.replace(o,a),n.set(i,a))}})
const i=kc(t)
0!==i.length&&(e.attributes.style=i)}r&&0!==i.length&&"SelectorList"===s.rule.prelude.type&&s.rule.prelude.children.remove(s.item),s.matchedElements=i}}if(r){for(const e of t)if(null!=e.matchedElements&&!(n&&e.matchedElements.length>1))for(const t of e.matchedElements){const n=new Set(null==t.attributes.class?null:t.attributes.class.split(" "))
for(const t of e.node.children)"ClassSelector"!==t.type||l.some(e=>sb(e.item,"class",t.name,!0))||n.delete(t.name)
0===n.size?delete t.attributes.class:t.attributes.class=Array.from(n).join(" ")
const r=e.node.children.first
"IdSelector"!==r?.type||t.attributes.id!==r.name||l.some(e=>sb(e.item,"id",r.name,!0))||delete t.attributes.id}for(const e of a)if(wc(e.cssAst,{visit:"Rule",enter:function(e,t,n){"Rule"===e.type&&"SelectorList"===e.prelude.type&&e.prelude.children.isEmpty&&n.remove(t)}}),e.cssAst.children.isEmpty)Et(e.node,e.parentNode)
else{const t=e.node.children[0]
"text"!==t.type&&"cdata"!==t.type||(t.value=kc(e.cssAst))}}}}}},name:"inlineStyles"})
const gb=/\burl\((["'])?#(.+?)\1\)/g,yb=/^#(.+?)$/,bb=/(\w+)\.[a-zA-Z]/,kb=(e,t)=>{let n,r,s=""
return e.forEach((e,i)=>{n=" ",0==i&&(n=""),t.noSpaceAfterFlags
const o=t.leadingZero?vb(e):e.toString()
t.negativeExtraSpace&&""!=n&&(e<0||"."===o.charAt(0)&&r%1!=0)&&(n=""),r=e,s+=n+o}),s},vb=e=>{const t=e.toString()
return 0<e&&e<1&&t.startsWith("0")?t.slice(1):-1<e&&e<0&&"0"===t[1]?t[0]+t.slice(2):t},Sb=e=>{if("script"===e.name&&0!==e.children.length)return!0
if("a"===e.name){if(Object.entries(e.attributes).some(([e,t])=>("href"===e||e.endsWith(":href"))&&null!=t&&t.trimStart().startsWith("javascript:")))return!0}return[...It.animationEvent,...It.documentEvent,...It.documentElementEvent,...It.globalEvent,...It.graphicalEvent].some(t=>null!=e.attributes[t])},wb=e=>new RegExp(gb).test(e),xb=(e,t)=>{const n=[]
if(Bt.has(e)){const e=t.matchAll(gb)
for(const t of e)n.push(t[2])}if("href"===e||e.endsWith(":href")){const e=yb.exec(t)
null!=e&&n.push(e[1])}if("begin"===e){const e=bb.exec(t)
null!=e&&n.push(e[1])}return n.map(e=>decodeURI(e))},Cb=(e,t)=>{const n=10**t
return Math.round(e*n)/n}
var Ab=Object.freeze({__proto__:null,description:"minifies styles and removes unused styles",fn:(e,{usage:t,...n})=>{const r=new Map,s=[],i=new Set,o=new Set,a=new Set
let l=!0,c=!0,u=!0,h=!1
"boolean"==typeof t?(l=t,c=t,u=t):t&&(l=null==t.tags||t.tags,c=null==t.ids||t.ids,u=null==t.classes||t.classes,h=null!=t.force&&t.force)
let f=!1
return{element:{enter:(e,t)=>{if(Sb(e)&&(f=!0),i.add(e.name),null!=e.attributes.id&&o.add(e.attributes.id),null!=e.attributes.class)for(const t of e.attributes.class.split(/\s+/))a.add(t)
"style"===e.name&&0!==e.children.length?r.set(e,t):null!=e.attributes.style&&s.push(e)}},root:{exit:()=>{const e={}
f&&!h||(l&&(e.tags=Array.from(i)),c&&(e.ids=Array.from(o)),u&&(e.classes=Array.from(a)))
for(const[t,s]of r.entries())if("text"===t.children[0].type||"cdata"===t.children[0].type){const r=t.children[0].value,i=Hy(r,{...n,usage:e}).css
if(0===i.length){Et(t,s)
continue}r.indexOf(">")>=0||r.indexOf("<")>=0?(t.children[0].type="cdata",t.children[0].value=i):(t.children[0].type="text",t.children[0].value=i)}for(const e of s){const t=e.attributes.style
e.attributes.style=Qy(t,{...n}).css}}}}},name:"minifyStyles"})
const _b=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],Tb=_b.length-1,Eb=e=>{if(null==e)return[0]
e[e.length-1]+=1
for(let t=e.length-1;t>0;t--)e[t]>Tb&&(e[t]=0,void 0!==e[t-1]&&e[t-1]++)
return e[0]>Tb&&(e[0]=0,e.unshift(0)),e},Ob=e=>e.map(e=>_b[e]).join("")
var Pb=Object.freeze({__proto__:null,description:"removes unused IDs and minifies used",fn:(e,t)=>{const{remove:n=!0,minify:r=!0,preserve:s=[],preservePrefixes:i=[],force:a=!1}=t,l=new Set(Array.isArray(s)?s:s?[s]:[]),c=Array.isArray(i)?i:i?[i]:[],u=new Map,h=new Map
let f=!1
return{element:{enter:e=>{if(!a){if("style"===e.name&&0!==e.children.length||Sb(e))return f=!0,void 0
if("svg"===e.name){let t=!0
for(const n of e.children)if("element"!==n.type||"defs"!==n.name){t=!1
break}if(t)return o}}for(const[t,n]of Object.entries(e.attributes))if("id"===t){const t=n
u.has(t)?delete e.attributes.id:u.set(t,e)}else{const r=xb(t,n)
for(const n of r){let r=h.get(n)
null==r&&(r=[],h.set(n,r)),r.push({element:e,name:t})}}}},root:{exit:()=>{if(f)return
const e=e=>l.has(e)||((e,t)=>{for(const n of t)if(e.startsWith(n))return!0
return!1})(e,c)
let t=null
for(const[n,s]of h){const i=u.get(n)
if(null!=i){if(r&&!1===e(n)){let r
do{t=Eb(t),r=Ob(t)}while(e(r)||h.has(r)&&null==u.get(r))
i.attributes.id=r
for(const{element:e,name:t}of s){const s=e.attributes[t]
s.includes("#")?e.attributes[t]=s.replace(`#${encodeURI(n)}`,`#${r}`).replace(`#${n}`,`#${r}`):e.attributes[t]=s.replace(`${n}.`,`${r}.`)}}u.delete(n)}}if(n)for(const[t,n]of u)!1===e(t)&&delete n.attributes.id}}}},name:"cleanupIds"})
const Lb=(e,t)=>{for(const n of e.children)"element"===n.type&&(null!=n.attributes.id||"style"===n.name?t.push(n):Lb(n,t))}
var Nb=Object.freeze({__proto__:null,description:"removes elements in <defs> without id",fn:()=>({element:{enter:(e,t)=>{if("defs"===e.name||Dt.nonRendering.has(e.name)&&null==e.attributes.id){const n=[]
Lb(e,n),0===n.length&&Et(e,t),e.children=n}}}}),name:"removeUselessDefs"})
const Db=/^([-+]?\d*\.?\d+([eE][-+]?\d+)?)(px|pt|pc|mm|cm|m|in|ft|em|ex|%)?$/,Mb={cm:96/2.54,mm:96/25.4,in:96,pt:4/3,pc:16,px:1}
var jb=Object.freeze({__proto__:null,description:'rounds numeric values to the fixed precision, removes default "px" units',fn:(e,t)=>{const{floatPrecision:n=3,leadingZero:r=!0,defaultPx:s=!0,convertToPx:i=!0}=t
return{element:{enter:e=>{if(null!=e.attributes.viewBox){const t=e.attributes.viewBox.trim().split(/(?:\s,?|,)\s*/g)
e.attributes.viewBox=t.map(e=>{const t=Number(e)
return Number.isNaN(t)?e:Number(t.toFixed(n))}).join(" ")}for(const[t,o]of Object.entries(e.attributes)){if("version"===t)continue
const a=Db.exec(o)
if(a){let o=Number(Number(a[1]).toFixed(n))
let l,c=a[3]||""
if(i&&""!==c&&c in Mb){const e=Number((Mb[c]*Number(a[1])).toFixed(n))
e.toString().length<a[0].length&&(o=e,c="px")}l=r?vb(o):o.toString(),s&&"px"===c&&(c=""),e.attributes[t]=l+c}}}}}},name:"cleanupNumericValues"})
const Ib="([+-]?(?:\\d*\\.\\d+|\\d+\\.?)%?)",Rb="(?:\\s*,\\s*|\\s+)",Fb=new RegExp("^rgb\\(\\s*"+Ib+Rb+Ib+Rb+Ib+"\\s*\\)$"),zb=/^#(([a-fA-F0-9])\2){3}$/,Gb=([e,t,n])=>"#"+((256+e<<8|t)<<8|n).toString(16).slice(1).toUpperCase()
var Bb=Object.freeze({__proto__:null,description:"converts colors: rgb() to #rrggbb and #rrggbb to #rgb",fn:(e,t)=>{const{currentColor:n=!1,names2hex:r=!0,rgb2hex:s=!0,convertCase:i="lower",shorthex:o=!0,shortname:a=!0}=t
let l=0
return{element:{enter:e=>{"mask"===e.name&&l++
for(const[t,c]of Object.entries(e.attributes))if($t.has(t)){let u=c
if(n&&0===l){let e
e="string"==typeof n?u===n:n instanceof RegExp?null!=n.exec(u):"none"!==u,e&&(u="currentColor")}if(r){const e=u.toLowerCase()
null!=Wt[e]&&(u=Wt[e])}if(s){const e=u.match(Fb)
if(null!=e){const t=e.slice(1,4).map(e=>{let t
return t=e.indexOf("%")>-1?Math.round(2.55*parseFloat(e)):Number(e),Math.max(0,Math.min(t,255))})
u=Gb(t)}}if(i&&!wb(u)&&"currentColor"!==u&&("lower"===i?u=u.toLowerCase():"upper"===i&&(u=u.toUpperCase())),o){const e=zb.exec(u)
null!=e&&(u="#"+e[0][1]+e[0][3]+e[0][5])}if(a){const e=u.toLowerCase()
null!=Vt[e]&&(u=Vt[e])}e.attributes[t]=u}},exit:e=>{"mask"===e.name&&l--}}}},name:"convertColors"})
const Ub=new Map,qb=new Map,Wb=new Map
for(const[e,t]of Object.entries(zt)){const n=new Set
if(t.content)for(const e of t.content)n.add(e)
if(t.contentGroups)for(const e of t.contentGroups){const t=Dt[e]
if(t)for(const e of t)n.add(e)}const r=new Set
if(t.attrs)for(const e of t.attrs)r.add(e)
const s=new Map
if(t.defaults)for(const[e,n]of Object.entries(t.defaults))s.set(e,n)
for(const e of t.attrsGroups){const t=It[e]
if(t)for(const e of t)r.add(e)
const n=Rt[e]
if(n)for(const[e,t]of Object.entries(n))s.set(e,t)}Ub.set(e,n),qb.set(e,r),Wb.set(e,s)}var Vb=Object.freeze({__proto__:null,description:"removes unknown elements content and attributes, removes attrs with default values",fn:(e,t)=>{const{unknownContent:n=!0,unknownAttrs:r=!0,defaultAttrs:s=!0,defaultMarkupDeclarations:i=!0,uselessOverrides:a=!0,keepDataAttrs:l=!0,keepAriaAttrs:c=!0,keepRoleAttr:u=!1}=t,h=nb(e)
return{instruction:{enter:e=>{i&&(e.value=e.value.replace(/\s*standalone\s*=\s*(["'])no\1/,""))}},element:{enter:(e,t)=>{if(e.name.includes(":"))return
if("foreignObject"===e.name)return o
if(n&&"element"===t.type){const n=Ub.get(t.name)
if(null==n||0===n.size){if(null==Ub.get(e.name))return Et(e,t),void 0}else if(!1===n.has(e.name))return Et(e,t),void 0}const i=qb.get(e.name),f=Wb.get(e.name),p="element"===t.type?rb(h,t):null
for(const[t,n]of Object.entries(e.attributes))if(!(l&&t.startsWith("data-")||c&&t.startsWith("aria-")||u&&"role"===t||"xmlns"===t)){if(t.includes(":")){const[e]=t.split(":")
if("xml"!==e&&"xlink"!==e)continue}if(r&&i&&!1===i.has(t)&&delete e.attributes[t],s&&null==e.attributes.id&&f&&f.get(t)===n&&null==p?.[t]&&delete e.attributes[t],a&&null==e.attributes.id){const r=p?.[t]
!1===qt.has(t)&&null!=r&&"static"===r.type&&r.value===n&&delete e.attributes[t]}}}}}},name:"removeUnknownsAndDefaults"})
var $b=Object.freeze({__proto__:null,description:"removes non-inheritable group's presentational attributes",fn:()=>({element:{enter:e=>{if("g"===e.name)for(const t of Object.keys(e.attributes))!It.presentation.has(t)||Ut.has(t)||qt.has(t)||delete e.attributes[t]}}}),name:"removeNonInheritableGroupAttrs"})
var Yb=Object.freeze({__proto__:null,description:"removes useless stroke and fill attributes",fn:(e,t)=>{const{stroke:n=!0,fill:r=!0,removeNone:s=!1}=t
let i=!1
if(a(e,{element:{enter:e=>{("style"===e.name||Sb(e))&&(i=!0)}}}),i)return null
const l=nb(e)
return{element:{enter:(e,t)=>{if(null!=e.attributes.id)return o
if(!Dt.shape.has(e.name))return
const i=rb(l,e),a=i.stroke,c=i["stroke-opacity"],u=i["stroke-width"],h=i["marker-end"],f=i.fill,p=i["fill-opacity"],d="element"===t.type?rb(l,t):null,m=null==d?null:d.stroke
if(n&&(null==a||"static"===a.type&&"none"==a.value||null!=c&&"static"===c.type&&"0"===c.value||null!=u&&"static"===u.type&&"0"===u.value)&&(null!=u&&"static"===u.type&&"0"===u.value||null==h)){for(const t of Object.keys(e.attributes))t.startsWith("stroke")&&delete e.attributes[t]
null!=m&&"static"===m.type&&"none"!==m.value&&(e.attributes.stroke="none")}if(r&&(null!=f&&"static"===f.type&&"none"===f.value||null!=p&&"static"===p.type&&"0"===p.value)){for(const t of Object.keys(e.attributes))t.startsWith("fill-")&&delete e.attributes[t];(null==f||"static"===f.type&&"none"!==f.value)&&(e.attributes.fill="none")}s&&(null!=a&&"none"!==e.attributes.stroke||(null==f||"static"!==f.type||"none"!==f.value)&&"none"!==e.attributes.fill||Et(e,t))}}}},name:"removeUselessStrokeAndFill"})
const Xb=/^new\s0\s0\s([-+]?\d*\.?\d+([eE][-+]?\d+)?)\s([-+]?\d*\.?\d+([eE][-+]?\d+)?)$/,Hb=(e,t,n,r)=>{const s=Xb.exec(e)
return null!=s&&n===s[1]&&r===s[3]?"svg"===t?void 0:"new":e}
var Qb=Object.freeze({__proto__:null,description:"remove or cleanup enable-background attribute when possible",fn:e=>{let t=!1
return a(e,{element:{enter:e=>{"filter"===e.name&&(t=!0)}}}),{element:{enter:e=>{let n=null,r=null
if(null!=e.attributes.style&&(n=bc(e.attributes.style,{context:"declarationList"}),"DeclarationList"===n.type)){const e=[]
wc(n,(t,n)=>{"Declaration"===t.type&&"enable-background"===t.property&&(e.push(n),r=n)})
for(let t=0;t<e.length-1;t++)n.children.remove(e[t])}if(!t)return delete e.attributes["enable-background"],"DeclarationList"===n?.type&&(r&&n.children.remove(r),n.children.isEmpty?delete e.attributes.style:e.attributes.style=kc(n)),void 0
const s=null!=e.attributes.width&&null!=e.attributes.height
if(("svg"===e.name||"mask"===e.name||"pattern"===e.name)&&s){const t=e.attributes["enable-background"],s=Hb(t,e.name,e.attributes.width,e.attributes.height)
if(s?e.attributes["enable-background"]=s:delete e.attributes["enable-background"],"DeclarationList"===n?.type&&r){const t=kc(r.data.value),s=Hb(t,e.name,e.attributes.width,e.attributes.height)
s?r.data.value={type:"Raw",value:s}:n.children.remove(r)}}"DeclarationList"===n?.type&&(n.children.isEmpty?delete e.attributes.style:e.attributes.style=kc(n))}}}},name:"cleanupEnableBackground"})
const Kb={M:2,m:2,Z:0,z:0,L:2,l:2,H:1,h:1,V:1,v:1,C:6,c:6,S:4,s:4,Q:4,q:4,T:2,t:2,A:7,a:7},Zb=e=>e in Kb,Jb=e=>" "===e||"\t"===e||"\r"===e||"\n"===e,ek=e=>{const t=e.codePointAt(0)
return null!=t&&(48<=t&&t<=57)},tk=(e,t)=>{let n=t,r="",s="none"
for(;n<e.length;n+=1){const t=e[n]
if("+"===t||"-"===t){if("none"===s){s="sign",r+=t
continue}if("e"===s){s="exponent_sign",r+=t
continue}}if(ek(t)){if("none"===s||"sign"===s||"whole"===s){s="whole",r+=t
continue}if("decimal_point"===s||"decimal"===s){s="decimal",r+=t
continue}if("e"===s||"exponent_sign"===s||"exponent"===s){s="exponent",r+=t
continue}}if("."!==t||"none"!==s&&"sign"!==s&&"whole"!==s){if("E"!==t&&"e"!=t||"whole"!==s&&"decimal_point"!==s&&"decimal"!==s)break
s="e",r+=t}else s="decimal_point",r+=t}const i=Number.parseFloat(r)
return Number.isNaN(i)?[t,null]:[n-1,i]},nk=e=>{const t=[]
let n=null,r=[],s=0,i=!1,o=!1
for(let a=0;a<e.length;a+=1){const l=e.charAt(a)
if(Jb(l))continue
if(i&&","===l){if(o)break
o=!0
continue}if(Zb(l)){if(o)return t
if(null==n){if("M"!==l&&"m"!==l)return t}else if(0!==r.length)return t
n=l,r=[],s=Kb[n],i=!1,0===s&&t.push({command:n,args:r})
continue}if(null==n)return t
let c=a,u=null
if("A"===n||"a"===n){const t=r.length
0!==t&&1!==t||"+"!==l&&"-"!==l&&([c,u]=tk(e,a)),2!==t&&5!==t&&6!==t||([c,u]=tk(e,a)),3!==t&&4!==t||("0"===l&&(u=0),"1"===l&&(u=1))}else[c,u]=tk(e,a)
if(null==u)return t
r.push(u),i=!0,o=!1,a=c,r.length===s&&(t.push({command:n,args:r}),"M"===n&&(n="L"),"m"===n&&(n="l"),r=[])}return t},rk=(e,t)=>(null!=t&&(e=Cb(e,t)),{roundedStr:vb(e),rounded:e}),sk=(e,t,n,r)=>{let s,i=""
for(let o=0;o<t.length;o++){const{roundedStr:a,rounded:l}=rk(t[o],n)
!r||"A"!==e&&"a"!==e||o%7!=4&&o%7!=5?0===o||l<0?i+=a:Number.isInteger(s)||ek(a[0])?i+=` ${a}`:i+=a:i+=a,s=l}return i},ik=({pathData:e,precision:t,disableSpaceAfterFlags:n})=>{if(1===e.length){const{command:r,args:s}=e[0]
return r+sk(r,s,t,n)}let r="",s={...e[0]}
"L"===e[1].command?s.command="M":"l"===e[1].command&&(s.command="m")
for(let i=1;i<e.length;i++){const{command:o,args:a}=e[i]
s.command===o&&"M"!==s.command&&"m"!==s.command||"M"===s.command&&"L"===o||"m"===s.command&&"l"===o?(s.args=[...s.args,...a],i===e.length-1&&(r+=s.command+sk(s.command,s.args,t,n))):(r+=s.command+sk(s.command,s.args,t,n),i===e.length-1?r+=o+sk(o,a,t,n):s={command:o,args:a})}return r},ok=Dt.nonRendering
var ak=Object.freeze({__proto__:null,description:"removes hidden elements (zero sized, with absent attributes)",fn:(e,t)=>{const{isHidden:n=!0,displayNone:r=!0,opacity0:s=!0,circleR0:i=!0,ellipseRX0:l=!0,ellipseRY0:c=!0,rectWidth0:u=!0,rectHeight0:h=!0,patternWidth0:f=!0,patternHeight0:p=!0,imageWidth0:d=!0,imageHeight0:m=!0,pathEmptyD:g=!0,polylineEmptyPoints:y=!0,polygonEmptyPoints:b=!0}=t,k=nb(e),v=new Map,S=new Set,w=new Map,x=new Set,C=new Map
let A=!1
function _(e){if(x.has(e.attributes.id))return!1
for(const t of e.children)if("element"===t.type&&!_(t))return!1
return!0}function T(e,t){"element"===e.type&&null!=e.attributes.id&&"element"===t.type&&"defs"===t.name&&S.add(e.attributes.id),Et(e,t)}return a(e,{element:{enter:(e,t)=>{if(ok.has(e.name))return v.set(e,t),o
const n=rb(k,e)
if(s&&n.opacity&&"static"===n.opacity.type&&"0"===n.opacity.value){if("path"===e.name)return v.set(e,t),o
T(e,t)}}}}),{element:{enter:(e,t)=>{if("style"===e.name&&0!==e.children.length||Sb(e))return A=!0,void 0
if("defs"===e.name&&w.set(e,t),"use"===e.name)for(const n of Object.keys(e.attributes)){if("href"!==n&&!n.endsWith(":href"))continue
const r=e.attributes[n].slice(1)
let s=C.get(r)
s||(s=[],C.set(r,s)),s.push({node:e,parentNode:t})}const s=rb(k,e)
if(n&&s.visibility&&"static"===s.visibility.type&&"hidden"===s.visibility.value&&null==_t(e,"[visibility=visible]"))return T(e,t),void 0
if(r&&s.display&&"static"===s.display.type&&"none"===s.display.value&&"marker"!==e.name)return T(e,t),void 0
if(i&&"circle"===e.name&&0===e.children.length&&"0"===e.attributes.r)return T(e,t),void 0
if(l&&"ellipse"===e.name&&0===e.children.length&&"0"===e.attributes.rx)return T(e,t),void 0
if(c&&"ellipse"===e.name&&0===e.children.length&&"0"===e.attributes.ry)return T(e,t),void 0
if(u&&"rect"===e.name&&0===e.children.length&&"0"===e.attributes.width)return T(e,t),void 0
if(h&&u&&"rect"===e.name&&0===e.children.length&&"0"===e.attributes.height)return T(e,t),void 0
if(f&&"pattern"===e.name&&"0"===e.attributes.width)return T(e,t),void 0
if(p&&"pattern"===e.name&&"0"===e.attributes.height)return T(e,t),void 0
if(d&&"image"===e.name&&"0"===e.attributes.width)return T(e,t),void 0
if(m&&"image"===e.name&&"0"===e.attributes.height)return T(e,t),void 0
if(g&&"path"===e.name){if(null==e.attributes.d)return T(e,t),void 0
const n=nk(e.attributes.d)
if(0===n.length)return T(e,t),void 0
if(1===n.length&&null==s["marker-start"]&&null==s["marker-end"])return T(e,t),void 0}if(y&&"polyline"===e.name&&null==e.attributes.points)return T(e,t),void 0
if(b&&"polygon"===e.name&&null==e.attributes.points)return T(e,t),void 0
for(const[t,n]of Object.entries(e.attributes)){const e=xb(t,n)
for(const t of e)x.add(t)}}},root:{exit:()=>{for(const e of S){const t=C.get(e)
if(t)for(const{node:e,parentNode:n}of t)Et(e,n)}if(!A)for(const[e,t]of v.entries())_(e)&&Et(e,t)
for(const[e,t]of w.entries())0===e.children.length&&Et(e,t)}}}},name:"removeHiddenElems"})
var lk=Object.freeze({__proto__:null,description:"removes empty <text> elements",fn:(e,t)=>{const{text:n=!0,tspan:r=!0,tref:s=!0}=t
return{element:{enter:(e,t)=>{n&&"text"===e.name&&0===e.children.length&&Et(e,t),r&&"tspan"===e.name&&0===e.children.length&&Et(e,t),s&&"tref"===e.name&&null==e.attributes["xlink:href"]&&Et(e,t)}}}},name:"removeEmptyText"})
const ck=/[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g
var uk=Object.freeze({__proto__:null,description:"converts basic shapes to more compact path form",fn:(e,t)=>{const{convertArcs:n=!1,floatPrecision:r}=t
return{element:{enter:(e,t)=>{if("rect"===e.name&&null!=e.attributes.width&&null!=e.attributes.height&&null==e.attributes.rx&&null==e.attributes.ry){const t=Number(e.attributes.x||"0"),n=Number(e.attributes.y||"0"),s=Number(e.attributes.width),i=Number(e.attributes.height)
if(Number.isNaN(t-n+s-i))return
const o=[{command:"M",args:[t,n]},{command:"H",args:[t+s]},{command:"V",args:[n+i]},{command:"H",args:[t]},{command:"z",args:[]}]
e.name="path",e.attributes.d=ik({pathData:o,precision:r}),delete e.attributes.x,delete e.attributes.y,delete e.attributes.width,delete e.attributes.height}if("line"===e.name){const t=Number(e.attributes.x1||"0"),n=Number(e.attributes.y1||"0"),s=Number(e.attributes.x2||"0"),i=Number(e.attributes.y2||"0")
if(Number.isNaN(t-n+s-i))return
const o=[{command:"M",args:[t,n]},{command:"L",args:[s,i]}]
e.name="path",e.attributes.d=ik({pathData:o,precision:r}),delete e.attributes.x1,delete e.attributes.y1,delete e.attributes.x2,delete e.attributes.y2}if(("polyline"===e.name||"polygon"===e.name)&&null!=e.attributes.points){const n=(e.attributes.points.match(ck)||[]).map(Number)
if(n.length<4)return Et(e,t),void 0
const s=[]
for(let e=0;e<n.length;e+=2)s.push({command:0===e?"M":"L",args:n.slice(e,e+2)})
"polygon"===e.name&&s.push({command:"z",args:[]}),e.name="path",e.attributes.d=ik({pathData:s,precision:r}),delete e.attributes.points}if("circle"===e.name&&n){const t=Number(e.attributes.cx||"0"),n=Number(e.attributes.cy||"0"),s=Number(e.attributes.r||"0")
if(Number.isNaN(t-n+s))return
const i=[{command:"M",args:[t,n-s]},{command:"A",args:[s,s,0,1,0,t,n+s]},{command:"A",args:[s,s,0,1,0,t,n-s]},{command:"z",args:[]}]
e.name="path",e.attributes.d=ik({pathData:i,precision:r}),delete e.attributes.cx,delete e.attributes.cy,delete e.attributes.r}if("ellipse"===e.name&&n){const t=Number(e.attributes.cx||"0"),n=Number(e.attributes.cy||"0"),s=Number(e.attributes.rx||"0"),i=Number(e.attributes.ry||"0")
if(Number.isNaN(t-n+s-i))return
const o=[{command:"M",args:[t,n-i]},{command:"A",args:[s,i,0,1,0,t,n+i]},{command:"A",args:[s,i,0,1,0,t,n-i]},{command:"z",args:[]}]
e.name="path",e.attributes.d=ik({pathData:o,precision:r}),delete e.attributes.cx,delete e.attributes.cy,delete e.attributes.rx,delete e.attributes.ry}}}}},name:"convertShapeToPath"})
var hk=Object.freeze({__proto__:null,description:"converts non-eccentric <ellipse>s to <circle>s",fn:()=>({element:{enter:e=>{if("ellipse"===e.name){const t=e.attributes.rx||"0",n=e.attributes.ry||"0"
if(t===n||"auto"===t||"auto"===n){e.name="circle"
const r="auto"===t?n:t
delete e.attributes.rx,delete e.attributes.ry,e.attributes.r=r}}}}}),name:"convertEllipseToCircle"})
var fk=Object.freeze({__proto__:null,description:"Move common attributes of group children to the group",fn:e=>{let t=!1
return a(e,{element:{enter:e=>{"style"===e.name&&(t=!0)}}}),{element:{exit:e=>{if("g"!==e.name||e.children.length<=1)return
if(t)return
const n=new Map
let r=!0,s=!0
for(const t of e.children)if("element"===t.type)if(jt.has(t.name)||(s=!1),r){r=!1
for(const[e,r]of Object.entries(t.attributes))Ut.has(e)&&n.set(e,r)}else for(const[e,r]of n)t.attributes[e]!==r&&n.delete(e)
null==e.attributes.filter&&null==e.attributes["clip-path"]&&null==e.attributes.mask||n.delete("transform"),s&&n.delete("transform")
for(const[t,r]of n)"transform"===t?null!=e.attributes.transform?e.attributes.transform=`${e.attributes.transform} ${r}`:e.attributes.transform=r:e.attributes[t]=r
for(const t of e.children)if("element"===t.type)for(const[e]of n)delete t.attributes[e]}}}},name:"moveElemsAttrsToGroup"})
const pk=[...jt,"g","text"]
var dk=Object.freeze({__proto__:null,description:"moves some group attributes to the content elements",fn:()=>({element:{enter:e=>{if("g"===e.name&&0!==e.children.length&&null!=e.attributes.transform&&!1===Object.entries(e.attributes).some(([e,t])=>Bt.has(e)&&wb(t))&&e.children.every(e=>"element"===e.type&&pk.includes(e.name)&&null==e.attributes.id)){for(const t of e.children){const n=e.attributes.transform
"element"===t.type&&(null!=t.attributes.transform?t.attributes.transform=`${n} ${t.attributes.transform}`:t.attributes.transform=n)}delete e.attributes.transform}}}}),name:"moveGroupAttrsToElems"})
const mk=(e,t)=>{if("element"===e.type){if(Dt.animation.has(e.name)&&e.attributes.attributeName===t)return!0
for(const n of e.children)if(mk(n,t))return!0}return!1}
var gk=Object.freeze({__proto__:null,description:"collapses useless groups",fn:e=>{const t=nb(e)
return{element:{exit:(e,n)=>{if("root"!==n.type&&"switch"!==n.name&&"g"===e.name&&0!==e.children.length){if(0!==Object.keys(e.attributes).length&&1===e.children.length){const n=e.children[0],r=!(!e.attributes.filter&&!rb(t,e).filter)
if("element"===n.type&&null==n.attributes.id&&!r&&(null==e.attributes.class||null==n.attributes.class)&&(null==e.attributes["clip-path"]&&null==e.attributes.mask||"g"===n.name&&null==e.attributes.transform&&null==n.attributes.transform)){const t={...n.attributes}
for(const[r,s]of Object.entries(e.attributes)){if(mk(n,r))return
if(null==t[r])t[r]=s
else if("transform"===r)t[r]=s+" "+t[r]
else if("inherit"===t[r])t[r]=s
else if(!Ut.has(r)&&t[r]!==s)return}e.attributes={},n.attributes=t}}if(0===Object.keys(e.attributes).length){for(const t of e.children)if("element"===t.type&&Dt.animation.has(t.name))return
const t=n.children.indexOf(e)
n.children.splice(t,1,...e.children)}}}}}},name:"collapseGroups"})
let yk
const bk=e=>{if(e.pathJS)return e.pathJS
const t=[],n=nk(e.attributes.d)
for(const{command:e,args:r}of n)t.push({command:e,args:r})
return t.length&&"m"==t[0].command&&(t[0].command="M"),e.pathJS=t,t},kk=e=>{const t=[],n=[0,0],r=[0,0]
for(let{command:s,args:i}of e)i=i.slice(),"m"===s&&(i[0]+=r[0],i[1]+=r[1],s="M"),"M"===s&&(r[0]=i[0],r[1]=i[1],n[0]=r[0],n[1]=r[1]),"h"===s&&(i[0]+=r[0],s="H"),"H"===s&&(r[0]=i[0]),"v"===s&&(i[0]+=r[1],s="V"),"V"===s&&(r[1]=i[0]),"l"===s&&(i[0]+=r[0],i[1]+=r[1],s="L"),"L"===s&&(r[0]=i[0],r[1]=i[1]),"c"===s&&(i[0]+=r[0],i[1]+=r[1],i[2]+=r[0],i[3]+=r[1],i[4]+=r[0],i[5]+=r[1],s="C"),"C"===s&&(r[0]=i[4],r[1]=i[5]),"s"===s&&(i[0]+=r[0],i[1]+=r[1],i[2]+=r[0],i[3]+=r[1],s="S"),"S"===s&&(r[0]=i[2],r[1]=i[3]),"q"===s&&(i[0]+=r[0],i[1]+=r[1],i[2]+=r[0],i[3]+=r[1],s="Q"),"Q"===s&&(r[0]=i[2],r[1]=i[3]),"t"===s&&(i[0]+=r[0],i[1]+=r[1],s="T"),"T"===s&&(r[0]=i[0],r[1]=i[1]),"a"===s&&(i[5]+=r[0],i[6]+=r[1],s="A"),"A"===s&&(r[0]=i[5],r[1]=i[6]),"z"!==s&&"Z"!==s||(r[0]=n[0],r[1]=n[1],s="z"),t.push({command:s,args:i})
return t},vk=function(e,t,n){e.pathJS=t
const r=[]
for(const e of t){if(0!==r.length&&("M"===e.command||"m"===e.command)){const e=r[r.length-1]
"M"!==e.command&&"m"!==e.command||r.pop()}r.push({command:e.command,args:e.args})}e.attributes.d=ik({pathData:r,precision:n.floatPrecision,disableSpaceAfterFlags:n.noSpaceAfterFlags})}
function Sk(e,t){return e[0]=t[t.length-2],e[1]=t[t.length-1],e}const wk=function(e,t){const n=Ek(kk(e)),r=Ek(kk(t))
if(n.maxX<=r.minX||r.maxX<=n.minX||n.maxY<=r.minY||r.maxY<=n.minY||n.list.every(e=>r.list.every(t=>e.list[e.maxX][0]<=t.list[t.minX][0]||t.list[t.maxX][0]<=e.list[e.minX][0]||e.list[e.maxY][1]<=t.list[t.minY][1]||t.list[t.maxY][1]<=e.list[e.minY][1])))return!1
const s=n.list.map(Ok),i=r.list.map(Ok)
return s.some(function(e){return!(e.list.length<3)&&i.some(function(t){if(t.list.length<3)return!1
const n=[o(e,t,[1,0])],r=Ck(n[0])
let s=1e4
for(;;){if(0==s--)return console.error("Error: infinite loop while processing mergePaths plugin."),!0
if(n.push(o(e,t,r)),_k(r,n[n.length-1])<=0)return!1
if(xk(n,r))return!0}})})
function o(e,t,n){return Ak(a(e,n),a(t,Ck(n)))}function a(e,t){let n,r=t[1]>=0?t[0]<0?e.maxY:e.maxX:t[0]<0?e.minX:e.minY,s=-1/0
for(;(n=_k(e.list[r],t))>s;)s=n,r=++r%e.list.length
return e.list[(r||e.list.length)-1]}}
function xk(e,t){if(2==e.length){const n=e[1],r=e[0],s=Ck(e[1]),i=Ak(r,n)
_k(s,i)>0?Sk(t,Tk(i,n)):(Sk(t,s),e.shift())}else{const n=e[2],r=e[1],s=e[0],i=Ak(r,n),o=Ak(s,n),a=Ck(n),l=Tk(i,o),c=Tk(o,i)
if(_k(l,a)>0)_k(i,a)>0?(Sk(t,l),e.shift()):(Sk(t,a),e.splice(0,2))
else{if(!(_k(c,a)>0))return!0
_k(o,a)>0?(Sk(t,c),e.splice(1,1)):(Sk(t,a),e.splice(0,2))}}return!1}function Ck(e){return[-e[0],-e[1]]}function Ak(e,t){return[e[0]-t[0],e[1]-t[1]]}function _k(e,t){return e[0]*t[0]+e[1]*t[1]}function Tk(e,t){const n=[-e[1],e[0]]
return _k(n,Ck(t))<0?Ck(n):n}function Ek(e){const t={list:[],minX:0,minY:0,maxX:0,maxY:0},n=(e,n)=>{(!e.list.length||n[1]>e.list[e.maxY][1])&&(e.maxY=e.list.length,t.maxY=t.list.length?Math.max(n[1],t.maxY):n[1]),(!e.list.length||n[0]>e.list[e.maxX][0])&&(e.maxX=e.list.length,t.maxX=t.list.length?Math.max(n[0],t.maxX):n[0]),(!e.list.length||n[1]<e.list[e.minY][1])&&(e.minY=e.list.length,t.minY=t.list.length?Math.min(n[1],t.minY):n[1]),(!e.list.length||n[0]<e.list[e.minX][0])&&(e.minX=e.list.length,t.minX=t.list.length?Math.min(n[0],t.minX):n[0]),e.list.push(n)}
for(let s=0;s<e.length;s+=1){const i=e[s]
let o=0===t.list.length?{list:[],minX:0,minY:0,maxX:0,maxY:0}:t.list[t.list.length-1]
const a=0===s?null:e[s-1]
let l=0===o.list.length?null:o.list[o.list.length-1]
const c=i.args
let u=l
const h=(e,t)=>e+(null==l?0:l[t%2])
switch(i.command){case"M":o={list:[],minX:0,minY:0,maxX:0,maxY:0},t.list.push(o)
break
case"H":null!=l&&n(o,[c[0],l[1]])
break
case"V":null!=l&&n(o,[l[0],c[0]])
break
case"Q":n(o,c.slice(0,2)),yk=[c[2]-c[0],c[3]-c[1]]
break
case"T":null==l||null==a||"Q"!=a.command&&"T"!=a.command||(u=[l[0]+yk[0],l[1]+yk[1]],n(o,u),yk=[c[0]-u[0],c[1]-u[1]])
break
case"C":null!=l&&n(o,[0.5*(l[0]+c[0]),0.5*(l[1]+c[1])]),n(o,[0.5*(c[0]+c[2]),0.5*(c[1]+c[3])]),n(o,[0.5*(c[2]+c[4]),0.5*(c[3]+c[5])]),yk=[c[4]-c[2],c[5]-c[3]]
break
case"S":null==l||null==a||"C"!=a.command&&"S"!=a.command||(n(o,[l[0]+0.5*yk[0],l[1]+0.5*yk[1]]),u=[l[0]+yk[0],l[1]+yk[1]]),null!=u&&n(o,[0.5*(u[0]+c[0]),0.5*(u[1]+c[1])]),n(o,[0.5*(c[0]+c[2]),0.5*(c[1]+c[3])]),yk=[c[2]-c[0],c[3]-c[1]]
break
case"A":if(null!=l){const e=Lk.apply(0,l.concat(c))
for(var r;(r=e.splice(0,6).map(h)).length;)null!=l&&n(o,[0.5*(l[0]+r[0]),0.5*(l[1]+r[1])]),n(o,[0.5*(r[0]+r[2]),0.5*(r[1]+r[3])]),n(o,[0.5*(r[2]+r[4]),0.5*(r[3]+r[5])]),e.length&&n(o,l=r.slice(-2))}}c.length>=2&&n(o,c.slice(-2))}return t}function Ok(e){e.list.sort(function(e,t){return e[0]==t[0]?e[1]-t[1]:e[0]-t[0]})
const t=[]
let n=0,r=0
for(let s=0;s<e.list.length;s++){for(;t.length>=2&&Pk(t[t.length-2],t[t.length-1],e.list[s])<=0;)t.pop()
e.list[s][1]<e.list[n][1]&&(n=s,r=t.length),t.push(e.list[s])}const s=[]
let i=e.list.length-1,o=0
for(let t=e.list.length;t--;){for(;s.length>=2&&Pk(s[s.length-2],s[s.length-1],e.list[t])<=0;)s.pop()
e.list[t][1]>e.list[i][1]&&(i=t,o=s.length),s.push(e.list[t])}s.pop(),t.pop()
const a=t.concat(s)
return{list:a,minX:0,maxX:t.length,minY:r,maxY:(t.length+o)%a.length}}function Pk(e,t,n){return(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0])}const Lk=(e,t,n,r,s,i,o,a,l,c)=>{const u=120*Math.PI/180,h=Math.PI/180*(+s||0)
let f=[]
const p=(e,t,n)=>e*Math.cos(n)-t*Math.sin(n),d=(e,t,n)=>e*Math.sin(n)+t*Math.cos(n)
if(c)y=c[0],b=c[1],m=c[2],g=c[3]
else{t=d(e=p(e,t,-h),t,-h)
const s=(e-(a=p(a,l,-h)))/2,c=(t-(l=d(a,l,-h)))/2
let u=s*s/(n*n)+c*c/(r*r)
u>1&&(u=Math.sqrt(u),n*=u,r*=u)
const f=n*n,k=r*r,v=(i==o?-1:1)*Math.sqrt(Math.abs((f*k-f*c*c-k*s*s)/(f*c*c+k*s*s)))
var m=v*n*c/r+(e+a)/2,g=v*-r*s/n+(t+l)/2,y=Math.asin(Number(((t-g)/r).toFixed(9))),b=Math.asin(Number(((l-g)/r).toFixed(9)))
y=e<m?Math.PI-y:y,b=a<m?Math.PI-b:b,y<0&&(y=2*Math.PI+y),b<0&&(b=2*Math.PI+b),o&&y>b&&(y-=2*Math.PI),!o&&b>y&&(b-=2*Math.PI)}let k=b-y
if(Math.abs(k)>u){const e=b,t=a,i=l
b=y+u*(o&&b>y?1:-1),a=m+n*Math.cos(b),l=g+r*Math.sin(b),f=Lk(a,l,n,r,s,0,o,t,i,[b,e,m,g])}k=b-y
const v=Math.cos(y),S=Math.sin(y),w=Math.cos(b),x=Math.sin(b),C=Math.tan(k/4),A=4/3*n*C,_=4/3*r*C,T=[-A*S,_*v,a+A*x-e,l-_*w-t,a-e,l-t]
if(c)return T.concat(f)
{f=T.concat(f)
const e=[]
for(let t=0,n=f.length;t<n;t++)e[t]=t%2?d(f[t-1],f[t],h):p(f[t],f[t+1],h)
return e}},Nk=new Set(["matrix","rotate","scale","skewX","skewY","translate"]),Dk=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,Mk=/[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g,jk=e=>{const t=[]
let n=null
for(const r of e.split(Dk))if(r)if(Nk.has(r))n={name:r,data:[]},t.push(n)
else{let e
for(;e=Mk.exec(r);)e=Number(e),null!=n&&n.data.push(e)}return null==n||0==n.data.length?[]:t},Ik=e=>{const t=e.map(e=>"matrix"===e.name?e.data:Vk(e))
return{name:"matrix",data:t.length>0?t.reduce(Yk):[]}},Rk={rad:e=>e*Math.PI/180,deg:e=>180*e/Math.PI,cos:e=>Math.cos(Rk.rad(e)),acos:(e,t)=>Cb(Rk.deg(Math.acos(e)),t),sin:e=>Math.sin(Rk.rad(e)),asin:(e,t)=>Cb(Rk.deg(Math.asin(e)),t),tan:e=>Math.tan(Rk.rad(e)),atan:(e,t)=>Cb(Rk.deg(Math.atan(e)),t)},Fk=e=>{const t=e.data,[n,r,s,i,o,a]=t,l=n*i-r*s
if(0===l)return
const c=Math.hypot(n,r)
if(0===c)return
const u=[],h=n/c
if((o||a)&&u.push({name:"translate",data:[o,a]}),1!==h){const e=Math.acos(h)
u.push({name:"rotate",data:[Rk.deg(r<0?-e:e),0,0]})}const f=c,p=l/f
1===f&&1===p||u.push({name:"scale",data:[f,p]})
const d=n*s+r*i
return d&&u.push({name:"skewX",data:[Rk.deg(Math.atan(d/(n*n+r*r)))]}),u},zk=e=>{const t=e.data,[n,r,s,i,o,a]=t,l=n*i-r*s
if(0===l)return
const c=Math.hypot(s,i)
if(0===c)return
const u=[];(o||a)&&u.push({name:"translate",data:[o,a]})
const h=Math.PI/2-(i<0?-1:1)*Math.acos(-s/c)
u.push({name:"rotate",data:[Rk.deg(h),0,0]})
const f=l/c,p=c
1===f&&1===p||u.push({name:"scale",data:[f,p]})
const d=n*s+r*i
return d&&u.push({name:"skewY",data:[Rk.deg(Math.atan(d/(s*s+i*i)))]}),u},Gk=(e,t,n)=>{const r=Rk.rad(n),s=1-Math.cos(r),i=Math.sin(r),o=(s*t+i*e)/(s*s+i*i)
return{name:"rotate",data:[n,(e-i*o)/s,o]}},Bk=e=>{switch(e.name){case"rotate":case"skewX":case"skewY":return 0===e.data[0]
case"scale":return 1===e.data[0]&&1===e.data[1]
case"translate":return 0===e.data[0]&&0===e.data[1]}return!1},Uk=(e,t)=>{const n=[]
for(let r=0;r<e.length;r++){const s=e[r]
if(Bk(s))continue
const i=s.data
switch(s.name){case"rotate":switch(i[0]){case 180:case-180:{const t=e[r+1]
t&&"scale"===t.name?(n.push(qk(t.data.map(e=>-e))),r++):n.push({name:"scale",data:[-1]})}continue}n.push({name:"rotate",data:i.slice(0,i[1]||i[2]?3:1)})
break
case"scale":n.push(qk(i))
break
case"skewX":case"skewY":n.push({name:s.name,data:[i[0]]})
break
case"translate":{const s=e[r+1]
if(s&&"rotate"===s.name&&180!==s.data[0]&&-180!==s.data[0]&&0!==s.data[0]&&0===s.data[1]&&0===s.data[2]){const e=t[r].data
n.push(Gk(e[0],e[1],t[r+1].data[0])),r++
continue}}n.push({name:"translate",data:i.slice(0,i[1]?2:1)})}}return n.length?n:[{name:"scale",data:[1]}]},qk=e=>({name:"scale",data:e.slice(0,e[0]===e[1]?1:2)}),Wk=(e,t)=>{const n=(e=>{const t=[],n=Fk(e),r=zk(e)
return n&&t.push(n),r&&t.push(r),t})(e)
let r,s=Number.MAX_VALUE
for(const e of n){const n=e.map(e=>{const n={name:e.name,data:[...e.data]}
return Xk(n,t)}),i=Uk(n,e),o=ev(i,t).length
o<s&&(r=i,s=o)}return r??[e]},Vk=e=>{if("matrix"===e.name)return e.data
switch(e.name){case"translate":return[1,0,0,1,e.data[0],e.data[1]||0]
case"scale":return[e.data[0],0,0,e.data[1]??e.data[0],0,0]
case"rotate":var t=Rk.cos(e.data[0]),n=Rk.sin(e.data[0]),r=e.data[1]||0,s=e.data[2]||0
return[t,n,-n,t,(1-t)*r+n*s,(1-t)*s-n*r]
case"skewX":return[1,0,Rk.tan(e.data[0]),1,0,0]
case"skewY":return[1,Rk.tan(e.data[0]),0,1,0,0]
default:throw Error(`Unknown transform ${e.name}`)}},$k=(e,t,n)=>{const r=t[5]-e[0],s=t[6]-e[1]
let i=t[0],o=t[1]
const a=t[2]*Math.PI/180,l=Math.cos(a),c=Math.sin(a)
if(i>0&&o>0){let e=Math.pow(r*l+s*c,2)/(4*i*i)+Math.pow(s*l-r*c,2)/(4*o*o)
e>1&&(e=Math.sqrt(e),i*=e,o*=e)}const u=Yk(n,[i*l,i*c,-o*c,o*l,0,0]),h=u[2]*u[2]+u[3]*u[3],f=u[0]*u[0]+u[1]*u[1]+h,p=Math.hypot(u[0]-u[3],u[1]+u[2])*Math.hypot(u[0]+u[3],u[1]-u[2])
if(p){const e=(f+p)/2,n=(f-p)/2,r=Math.abs(e-h)>1e-6,s=(r?e:n)-h,i=u[0]*u[2]+u[1]*u[3],o=u[0]*s+u[2]*i,a=u[1]*s+u[3]*i
t[0]=Math.sqrt(e),t[1]=Math.sqrt(n),t[2]=((r?a<0:o>0)?-1:1)*Math.acos((r?o:a)/Math.hypot(o,a))*180/Math.PI}else t[0]=t[1]=Math.sqrt(f/2),t[2]=0
return n[0]<0!=n[3]<0&&(t[4]=1-t[4]),t},Yk=(e,t)=>[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]],Xk=(e,t)=>{switch(e.name){case"translate":e.data=Qk(e.data,t)
break
case"rotate":e.data=[...Hk(e.data.slice(0,1),t),...Qk(e.data.slice(1),t)]
break
case"skewX":case"skewY":e.data=Hk(e.data,t)
break
case"scale":e.data=Kk(e.data,t)
break
case"matrix":e.data=[...Kk(e.data.slice(0,4),t),...Qk(e.data.slice(4),t)]}return e},Hk=(e,t)=>null!=t.degPrecision&&t.degPrecision>=1&&t.floatPrecision<20?Jk(t.degPrecision,e):Zk(e),Qk=(e,t)=>t.floatPrecision>=1&&t.floatPrecision<20?Jk(t.floatPrecision,e):Zk(e),Kk=(e,t)=>t.transformPrecision>=1&&t.floatPrecision<20?Jk(t.transformPrecision,e):Zk(e),Zk=e=>e.map(Math.round),Jk=(e,t)=>{for(let n=t.length,r=+Math.pow(0.1,e).toFixed(e);n--;)if(Cb(t[n],e)!==t[n]){const s=+t[n].toFixed(e-1)
t[n]=+Math.abs(s-t[n]).toFixed(e+1)>=r?+t[n].toFixed(e):s}return t},ev=(e,t)=>e.map(e=>(Xk(e,t),`${e.name}(${kb(e.data,t)})`)).join(""),tv=/[-+]?(\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g,nv=(e,t,n)=>[e[0]*t+e[2]*n+e[4],e[1]*t+e[3]*n+e[5]],rv=(e,t,n)=>[e[0]*t+e[2]*n,e[1]*t+e[3]*n],sv=(e,t)=>{const n=[0,0],r=[0,0]
for(const s of e){let{command:e,args:i}=s
if("M"===e){r[0]=i[0],r[1]=i[1],n[0]=r[0],n[1]=r[1]
const[e,s]=nv(t,i[0],i[1])
i[0]=e,i[1]=s}if("m"===e){r[0]+=i[0],r[1]+=i[1],n[0]=r[0],n[1]=r[1]
const[e,s]=rv(t,i[0],i[1])
i[0]=e,i[1]=s}if("H"===e&&(e="L",i=[i[0],r[1]]),"h"===e&&(e="l",i=[i[0],0]),"V"===e&&(e="L",i=[r[0],i[0]]),"v"===e&&(e="l",i=[0,i[0]]),"L"===e){r[0]=i[0],r[1]=i[1]
const[e,n]=nv(t,i[0],i[1])
i[0]=e,i[1]=n}if("l"===e){r[0]+=i[0],r[1]+=i[1]
const[e,n]=rv(t,i[0],i[1])
i[0]=e,i[1]=n}if("C"===e){r[0]=i[4],r[1]=i[5]
const[e,n]=nv(t,i[0],i[1]),[s,o]=nv(t,i[2],i[3]),[a,l]=nv(t,i[4],i[5])
i[0]=e,i[1]=n,i[2]=s,i[3]=o,i[4]=a,i[5]=l}if("c"===e){r[0]+=i[4],r[1]+=i[5]
const[e,n]=rv(t,i[0],i[1]),[s,o]=rv(t,i[2],i[3]),[a,l]=rv(t,i[4],i[5])
i[0]=e,i[1]=n,i[2]=s,i[3]=o,i[4]=a,i[5]=l}if("S"===e){r[0]=i[2],r[1]=i[3]
const[e,n]=nv(t,i[0],i[1]),[s,o]=nv(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=s,i[3]=o}if("s"===e){r[0]+=i[2],r[1]+=i[3]
const[e,n]=rv(t,i[0],i[1]),[s,o]=rv(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=s,i[3]=o}if("Q"===e){r[0]=i[2],r[1]=i[3]
const[e,n]=nv(t,i[0],i[1]),[s,o]=nv(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=s,i[3]=o}if("q"===e){r[0]+=i[2],r[1]+=i[3]
const[e,n]=rv(t,i[0],i[1]),[s,o]=rv(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=s,i[3]=o}if("T"===e){r[0]=i[0],r[1]=i[1]
const[e,n]=nv(t,i[0],i[1])
i[0]=e,i[1]=n}if("t"===e){r[0]+=i[0],r[1]+=i[1]
const[e,n]=rv(t,i[0],i[1])
i[0]=e,i[1]=n}if("A"===e){if($k(r,i,t),r[0]=i[5],r[1]=i[6],Math.abs(i[2])>80){const e=i[0],t=i[2]
i[0]=i[1],i[1]=e,i[2]=t+(t>0?-90:90)}const[e,n]=nv(t,i[5],i[6])
i[5]=e,i[6]=n}if("a"===e){if($k([0,0],i,t),r[0]+=i[5],r[1]+=i[6],Math.abs(i[2])>80){const e=i[0],t=i[2]
i[0]=i[1],i[1]=e,i[2]=t+(t>0?-90:90)}const[e,n]=rv(t,i[5],i[6])
i[5]=e,i[6]=n}"z"!==e&&"Z"!==e||(r[0]=n[0],r[1]=n[1]),s.command=e,s.args=i}}
let iv,ov,av,lv,cv
const uv=e=>{const t=[0,0],n=[0,0]
let r=[0,0]
for(let s=0;s<e.length;s+=1){const i=e[s]
let{command:o,args:a}=i
"m"===o&&(n[0]+=a[0],n[1]+=a[1],t[0]=n[0],t[1]=n[1]),"M"===o&&(0!==s&&(o="m"),a[0]-=n[0],a[1]-=n[1],n[0]+=a[0],n[1]+=a[1],t[0]=n[0],t[1]=n[1]),"l"===o&&(n[0]+=a[0],n[1]+=a[1]),"L"===o&&(o="l",a[0]-=n[0],a[1]-=n[1],n[0]+=a[0],n[1]+=a[1]),"h"===o&&(n[0]+=a[0]),"H"===o&&(o="h",a[0]-=n[0],n[0]+=a[0]),"v"===o&&(n[1]+=a[0]),"V"===o&&(o="v",a[0]-=n[1],n[1]+=a[0]),"c"===o&&(n[0]+=a[4],n[1]+=a[5]),"C"===o&&(o="c",a[0]-=n[0],a[1]-=n[1],a[2]-=n[0],a[3]-=n[1],a[4]-=n[0],a[5]-=n[1],n[0]+=a[4],n[1]+=a[5]),"s"===o&&(n[0]+=a[2],n[1]+=a[3]),"S"===o&&(o="s",a[0]-=n[0],a[1]-=n[1],a[2]-=n[0],a[3]-=n[1],n[0]+=a[2],n[1]+=a[3]),"q"===o&&(n[0]+=a[2],n[1]+=a[3]),"Q"===o&&(o="q",a[0]-=n[0],a[1]-=n[1],a[2]-=n[0],a[3]-=n[1],n[0]+=a[2],n[1]+=a[3]),"t"===o&&(n[0]+=a[0],n[1]+=a[1]),"T"===o&&(o="t",a[0]-=n[0],a[1]-=n[1],n[0]+=a[0],n[1]+=a[1]),"a"===o&&(n[0]+=a[5],n[1]+=a[6]),"A"===o&&(o="a",a[5]-=n[0],a[6]-=n[1],n[0]+=a[5],n[1]+=a[6]),"Z"!==o&&"z"!==o||(n[0]=t[0],n[1]=t[1]),i.command=o,i.args=a,i.base=r,i.coords=[n[0],n[1]],r=i.coords}return e}
function hv(e){const t=fv([0,0,e[2],e[3],e[0],e[1],e[4],e[5]])
return null!=t&&e[2]<t[0]==t[0]<0&&e[3]<t[1]==t[1]<0&&e[4]<t[0]==t[0]<e[0]&&e[5]<t[1]==t[1]<e[1]}function fv(e){const t=e[1]-e[3],n=e[2]-e[0],r=e[0]*e[3]-e[2]*e[1],s=e[5]-e[7],i=e[6]-e[4],o=e[4]*e[7]-e[5]*e[6],a=t*i-s*n
if(!a)return
const l=[(n*o-i*r)/a,(t*o-s*r)/-a]
return!isNaN(l[0])&&!isNaN(l[1])&&isFinite(l[0])&&isFinite(l[1])?l:void 0}function pv(e){const t=ov||0
for(let n=e.length;n-- >0;){const r=Cb(e[n],t)
if(r!==e[n]){const s=Cb(e[n],t-1)
e[n]=Cb(Math.abs(s-e[n]),t+1)>=av?r:s}}return e}function dv(e){for(let t=e.length;t-- >0;)e[t]=Math.round(e[t])
return e}function mv(e){let t=e.length-2
const n=-e[t+1],r=e[t],s=1/(n*n+r*r)
if(t<=1||!isFinite(s))return!1
for(;(t-=2)>=0;)if(Math.sqrt(Math.pow(n*e[t]+r*e[t+1],2)*s)>av)return!1
return!0}function gv(e){if(1===e[3])return
const[t,n]=e
if(Math.abs(t-n)>av)return
const r=Math.hypot(e[5],e[6])
return r>2*t?void 0:t-Math.sqrt(t**2-0.25*r**2)}function yv(e,t){switch(e.command){case"s":e.command="c"
break
case"t":e.command="q"}return e.args.unshift(t[t.length-2]-t[t.length-4],t[t.length-1]-t[t.length-3]),e}function bv(e,t){return Math.hypot(e[0]-t[0],e[1]-t[1])}function kv(e,t){return[2*t[0]-e[0],2*t[1]-e[1]]}function vv(e,t){const n=t*t,r=n*t,s=1-t,i=s*s
return[3*i*t*e[0]+3*s*n*e[2]+r*e[4],3*i*t*e[1]+3*s*n*e[3]+r*e[5]]}function Sv(e,t){const n=Math.min(lv*av,cv*t.radius/100)
return[0,1/4,.5,3/4,1].every(function(r){return Math.abs(bv(vv(e,r),t.center)-t.radius)<=n})}function wv(e,t){return Sv(e,{center:[t.center[0]+e[4],t.center[1]+e[5]],radius:t.radius})}function xv(e,t){const n=-t.center[0],r=-t.center[1],s=e[4]-t.center[0],i=e[5]-t.center[1]
return Math.acos((n*s+r*i)/Math.sqrt((n*n+r*r)*(s*s+i*i)))}function Cv(e,t){return t.reduce(function(t,n){let r=""
return n.args&&(r=kb(iv(n.args.slice()),e)),t+n.command+r},"")}var Av=Object.freeze({__proto__:null,description:"optimizes path data: writes in shorter form, applies transformations",fn:(e,t)=>{const{applyTransforms:n=!0,applyTransformsStroked:r=!0,makeArcs:s={threshold:2.5,tolerance:0.5},straightCurves:i=!0,convertToQ:o=!0,lineShorthands:l=!0,convertToZ:c=!0,curveSmoothShorthands:u=!0,floatPrecision:h=3,transformPrecision:f=5,smartArcRounding:p=!0,removeUseless:d=!0,collapseRepeated:m=!0,utilizeAbsolute:g=!0,leadingZero:y=!0,negativeExtraSpace:b=!0,noSpaceAfterFlags:k=!1,forceAbsolutePath:v=!1}=t,S={applyTransforms:n,applyTransformsStroked:r,makeArcs:s,straightCurves:i,convertToQ:o,lineShorthands:l,convertToZ:c,curveSmoothShorthands:u,floatPrecision:h,transformPrecision:f,smartArcRounding:p,removeUseless:d,collapseRepeated:m,utilizeAbsolute:g,leadingZero:y,negativeExtraSpace:b,noSpaceAfterFlags:k,forceAbsolutePath:v}
n&&a(e,((e,t)=>{const n=nb(e)
return{element:{enter:e=>{if(null==e.attributes.d)return
if(null!=e.attributes.id)return
if(null==e.attributes.transform||""===e.attributes.transform||null!=e.attributes.style||Object.entries(e.attributes).some(([e,t])=>Bt.has(e)&&wb(t)))return
const r=rb(n,e),s=r.transform
if("static"===s.type&&s.value!==e.attributes.transform)return
const i=Ik(jk(e.attributes.transform)),o="static"===r.stroke?.type?r.stroke.value:null,a="static"===r["stroke-width"]?.type?r["stroke-width"].value:null,l=t.transformPrecision
if("dynamic"===r.stroke?.type||"dynamic"===r["stroke-width"]?.type)return
const c=Number(Math.hypot(i.data[0],i.data[1]).toFixed(l))
if(o&&"none"!=o){if(!t.applyTransformsStroked)return
if(!(i.data[0]===i.data[3]&&i.data[1]===-i.data[2]||i.data[0]===-i.data[3]&&i.data[1]===i.data[2]))return
1!==c&&"non-scaling-stroke"!==e.attributes["vector-effect"]&&(e.attributes["stroke-width"]=(a||Rt.presentation["stroke-width"]).trim().replace(tv,e=>vb(Number(e)*c)),null!=e.attributes["stroke-dashoffset"]&&(e.attributes["stroke-dashoffset"]=e.attributes["stroke-dashoffset"].trim().replace(tv,e=>vb(Number(e)*c))),null!=e.attributes["stroke-dasharray"]&&(e.attributes["stroke-dasharray"]=e.attributes["stroke-dasharray"].trim().replace(tv,e=>vb(Number(e)*c))))}const u=bk(e)
sv(u,i.data),delete e.attributes.transform}}}})(e,{transformPrecision:f,applyTransformsStroked:r}))
const w=nb(e)
return{element:{enter:e=>{if(jt.has(e.name)&&null!=e.attributes.d){const t=rb(w,e)
ov=h,av=!1!==ov?+Math.pow(0.1,ov).toFixed(ov):1e-2,iv=ov&&ov>0&&ov<20?pv:dv,s&&(lv=s.threshold,cv=s.tolerance)
const n=null!=t["marker-mid"],r=t.stroke&&("dynamic"===t.stroke.type||"none"!==t.stroke.value),i=t["stroke-linecap"]&&("dynamic"===t["stroke-linecap"].type||"butt"!==t["stroke-linecap"].value),o=r&&i,a=!r||"static"===t["stroke-linecap"]?.type&&"round"===t["stroke-linecap"].value&&"static"===t["stroke-linejoin"]?.type&&"round"===t["stroke-linejoin"].value
let l=bk(e)
if(l.length){const t=l.some(e=>"m"!==e.command&&"M"!==e.command)
uv(l),l=function(e,t,{isSafeToUseZ:n,maybeHasStrokeAndLinecap:r,hasMarkerMid:s}){const i=Cv.bind(null,t),o=[0,0],a=[0,0]
let l,c={}
return e=e.filter(function(e,u,h){const f=l
let p=e.command,d=e.args,m=h[u+1]
if("Z"!==p&&"z"!==p){let l,y=d
if("s"===p){y=[0,0].concat(d)
const e=c.args,t=e.length
y[0]=e[t-2]-e[t-4],y[1]=e[t-1]-e[t-3]}if(t.makeArcs&&("c"==p||"s"==p)&&hv(y)&&(l=function(e){const t=vv(e,.5),n=[t[0]/2,t[1]/2],r=[(t[0]+e[4])/2,(t[1]+e[5])/2],s=fv([n[0],n[1],n[0]+n[1],n[1]-n[0],r[0],r[1],r[0]+(r[1]-t[1]),r[1]-(r[0]-t[0])]),i=s&&bv([0,0],s),o=Math.min(lv*av,cv*i/100)
if(s&&i<1e15&&[1/4,3/4].every(function(t){return Math.abs(bv(vv(e,t),s)-i)<=o}))return{center:s,radius:i}}(y))){const t=iv([l.radius])[0]
let n=xv(y,l)
const r=y[5]*y[0]-y[4]*y[1]>0?1:0
let s={command:"a",args:[t,t,0,0,r,y[4],y[5]],coords:e.coords.slice(),base:e.base}
const a=[s],f=[l.center[0]-y[4],l.center[1]-y[5]],b={center:f,radius:l.radius},k=[e]
let v,S=0,w=""
if("c"==c.command&&hv(c.args)&&wv(c.args,l)||"a"==c.command&&c.sdata&&wv(c.sdata,l)){k.unshift(c),s.base=c.base,s.args[5]=s.coords[0]-s.base[0],s.args[6]=s.coords[1]-s.base[1]
const e="a"==c.command?c.sdata:c.args
n+=xv(e,{center:[e[4]+l.center[0],e[5]+l.center[1]],radius:l.radius}),n>Math.PI&&(s.args[3]=1),S=1}for(var g=u;(m=h[++g])&&("c"===m.command||"s"===m.command);){let e=m.args
if("s"==m.command&&(v=yv({command:"s",args:m.args.slice()},h[g-1].args),e=v.args,v.args=e.slice(0,2),w=i([v])),!hv(e)||!Sv(e,b))break
if(n+=xv(e,b),n-2*Math.PI>1e-3)break
if(n>Math.PI&&(s.args[3]=1),k.push(m),!(2*Math.PI-n>1e-3)){s.args[5]=2*(b.center[0]-e[4]),s.args[6]=2*(b.center[1]-e[5]),s.coords=[s.base[0]+s.args[5],s.base[1]+s.args[6]],s={command:"a",args:[t,t,0,0,r,m.coords[0]-s.coords[0],m.coords[1]-s.coords[1]],coords:m.coords,base:s.coords},a.push(s),g++
break}s.coords=m.coords,s.args[5]=s.coords[0]-s.base[0],s.args[6]=s.coords[1]-s.base[1],f[0]-=e[4],f[1]-=e[5]}if((i(a)+w).length<i(k).length){if(h[g]&&"s"==h[g].command&&yv(h[g],h[g-1].args),S){const t=a.shift()
iv(t.args),o[0]+=t.args[5]-c.args[c.args.length-2],o[1]+=t.args[6]-c.args[c.args.length-1],c.command="a",c.args=t.args,e.base=c.coords=t.coords}if(s=a.shift(),1==k.length?e.sdata=y.slice():k.length-1-S>0&&h.splice(u+1,k.length-1-S,...a),!s)return!1
p="a",d=s.args,e.coords=s.coords}}if(!1!==ov){if("m"===p||"l"===p||"t"===p||"q"===p||"s"===p||"c"===p)for(let t=d.length;t--;)d[t]+=e.base[t%2]-o[t%2]
else"h"==p?d[0]+=e.base[0]-o[0]:"v"==p?d[0]+=e.base[1]-o[1]:"a"==p&&(d[5]+=e.base[0]-o[0],d[6]+=e.base[1]-o[1])
iv(d),"h"==p?o[0]+=d[0]:"v"==p?o[1]+=d[0]:(o[0]+=d[d.length-2],o[1]+=d[d.length-1]),iv(o),"M"!==p&&"m"!==p||(a[0]=o[0],a[1]=o[1])}const b="a"===p?gv(d):void 0
if(t.smartArcRounding&&void 0!==b&&ov)for(let e=ov;e>=0;e--){const t=Cb(d[0],e),n=gv([t,t,...d.slice(2)])
if(!(Math.abs(b-n)<av))break
d[0]=t,d[1]=t}if(t.straightCurves&&("c"===p&&mv(d)||"s"===p&&mv(y)?(m&&"s"==m.command&&yv(m,d),p="l",d=d.slice(-2)):"q"===p&&mv(d)?(m&&"t"==m.command&&yv(m,d),p="l",d=d.slice(-2)):("t"===p&&"q"!==c.command&&"t"!==c.command||"a"===p&&(0===d[0]||0===d[1]||void 0!==b&&b<av))&&(p="l",d=d.slice(-2))),t.convertToQ&&"c"==p){const n=0.75*(e.base[0]+d[0])-0.25*e.base[0],r=0.75*(e.base[0]+d[2])-0.25*(e.base[0]+d[4])
if(Math.abs(n-r)<2*av){const s=0.75*(e.base[1]+d[1])-0.25*e.base[1],i=0.75*(e.base[1]+d[3])-0.25*(e.base[1]+d[5])
if(Math.abs(s-i)<2*av){const o=d.slice()
o.splice(0,4,n+r-e.base[0],s+i-e.base[1]),iv(o)
const a=kb(d,t).length
kb(o,t).length<a&&(p="q",d=o,m&&"s"==m.command&&yv(m,d))}}}if(t.lineShorthands&&"l"===p&&(0===d[1]?(p="h",d.pop()):0===d[0]&&(p="v",d.shift())),t.collapseRepeated&&!1===s&&("m"===p||"h"===p||"v"===p)&&c.command&&p==c.command.toLowerCase()&&("h"!=p&&"v"!=p||c.args[0]>=0==d[0]>=0))return c.args[0]+=d[0],"h"!=p&&"v"!=p&&(c.args[1]+=d[1]),c.coords=e.coords,h[u]=c,!1
if(t.curveSmoothShorthands&&c.command)if("c"===p)("c"===c.command&&Math.abs(d[0]- -(c.args[2]-c.args[4]))<av&&Math.abs(d[1]- -(c.args[3]-c.args[5]))<av||"s"===c.command&&Math.abs(d[0]- -(c.args[0]-c.args[2]))<av&&Math.abs(d[1]- -(c.args[1]-c.args[3]))<av||"c"!==c.command&&"s"!==c.command&&Math.abs(d[0])<av&&Math.abs(d[1])<av)&&(p="s",d=d.slice(2))
else if("q"===p)if("q"===c.command&&Math.abs(d[0]-(c.args[2]-c.args[0]))<av&&Math.abs(d[1]-(c.args[3]-c.args[1]))<av)p="t",d=d.slice(2)
else if("t"===c.command){const t=kv(f,e.base),n=[d[0]+e.base[0],d[1]+e.base[1]]
Math.abs(t[0]-n[0])<av&&Math.abs(t[1]-n[1])<av&&(p="t",d=d.slice(2))}if(t.removeUseless&&!r){if(("l"===p||"h"===p||"v"===p||"q"===p||"t"===p||"c"===p||"s"===p)&&d.every(function(e){return 0===e}))return h[u]=c,!1
if("a"===p&&0===d[5]&&0===d[6])return h[u]=c,!1}!t.convertToZ||!n&&"Z"!==m?.command&&"z"!==m?.command||"l"!==p&&"h"!==p&&"v"!==p||Math.abs(a[0]-e.coords[0])<av&&Math.abs(a[1]-e.coords[1])<av&&(p="z",d=[]),e.command=p,e.args=d}else if(o[0]=a[0],o[1]=a[1],"Z"===c.command||"z"===c.command)return!1
return!(("Z"===p||"z"===p)&&t.removeUseless&&n&&Math.abs(e.base[0]-e.coords[0])<av/10&&Math.abs(e.base[1]-e.coords[1])<av/10)&&(l="q"===p?[d[0]+e.base[0],d[1]+e.base[1]]:"t"===p?f?kv(f,e.base):e.coords:void 0,c=e,!0)}),e}(l,S,{isSafeToUseZ:a,maybeHasStrokeAndLinecap:o,hasMarkerMid:n}),g&&(l=function(e,t){let n=e[0]
return e=e.filter(function(e,r){if(0==r)return!0
if("Z"===e.command||"z"===e.command)return n=e,!0
const s=e.command,i=e.args,o=i.slice(),a=i.slice()
if("m"===s||"l"===s||"t"===s||"q"===s||"s"===s||"c"===s)for(let t=o.length;t--;)o[t]+=e.base[t%2]
else"h"==s?o[0]+=e.base[0]:"v"==s?o[0]+=e.base[1]:"a"==s&&(o[5]+=e.base[0],o[6]+=e.base[1])
iv(o),iv(a)
const l=kb(o,t),c=kb(a,t)
return(t.forceAbsolutePath||l.length<c.length&&!(t.negativeExtraSpace&&s==n.command&&n.command.charCodeAt(0)>96&&l.length==c.length-1&&(i[0]<0||0===Math.floor(i[0])&&!Number.isInteger(i[0])&&n.args[n.args.length-1]%1)))&&(e.command=s.toUpperCase(),e.args=o),n=e,!0}),e}(l,S));(null!=e.attributes["marker-start"]||null!=e.attributes["marker-end"])&&t&&l.every(e=>"m"===e.command||"M"===e.command)&&l.push({command:"z",args:[]}),vk(e,l,S)}}}}}},name:"convertPathData"})
const _v=(e,t,n)=>{let r=jk(e.attributes[t]);(n=Tv(r,n)).collapseIntoOne&&r.length>1&&(r=[Ik(r)]),n.convertToShorts?r=Ov(r,n):r.forEach(e=>Xk(e,n)),n.removeUseless&&(r=Pv(r)),r.length?e.attributes[t]=ev(r,n):delete e.attributes[t]},Tv=(e,{...t})=>{const n=[]
for(const t of e)"matrix"==t.name&&n.push(...t.data.slice(0,4))
let r=t.transformPrecision
return n.length&&(t.transformPrecision=Math.min(t.transformPrecision,Math.max.apply(Math,n.map(Ev))||t.transformPrecision),r=Math.max.apply(Math,n.map(e=>e.toString().replace(/\D+/g,"").length))),null==t.degPrecision&&(t.degPrecision=Math.max(0,Math.min(t.floatPrecision,r-2))),t},Ev=e=>{const t=e.toString()
return t.slice(t.indexOf(".")).length-1},Ov=(e,t)=>{for(let n=0;n<e.length;n++){let r=e[n]
if(t.matrixToTransform&&"matrix"===r.name){const s=Wk(r,t)
ev(s,t).length<=ev([r],t).length&&e.splice(n,1,...s),r=e[n]}Xk(r,t),t.shortTranslate&&"translate"===r.name&&2===r.data.length&&!r.data[1]&&r.data.pop(),t.shortScale&&"scale"===r.name&&2===r.data.length&&r.data[0]===r.data[1]&&r.data.pop(),t.shortRotate&&"translate"===e[n-2]?.name&&"rotate"===e[n-1].name&&"translate"===e[n].name&&e[n-2].data[0]===-e[n].data[0]&&e[n-2].data[1]===-e[n].data[1]&&(e.splice(n-2,3,{name:"rotate",data:[e[n-1].data[0],e[n-2].data[0],e[n-2].data[1]]}),n-=2)}return e},Pv=e=>e.filter(e=>!(["translate","rotate","skewX","skewY"].indexOf(e.name)>-1&&(1==e.data.length||"rotate"==e.name)&&!e.data[0]||"translate"==e.name&&!e.data[0]&&!e.data[1]||"scale"==e.name&&1==e.data[0]&&(e.data.length<2||1==e.data[1])||"matrix"==e.name&&1==e.data[0]&&1==e.data[3]&&!(e.data[1]||e.data[2]||e.data[4]||e.data[5])))
var Lv=Object.freeze({__proto__:null,description:"collapses multiple transformations and optimizes it",fn:(e,t)=>{const{convertToShorts:n=!0,degPrecision:r,floatPrecision:s=3,transformPrecision:i=5,matrixToTransform:o=!0,shortTranslate:a=!0,shortScale:l=!0,shortRotate:c=!0,removeUseless:u=!0,collapseIntoOne:h=!0,leadingZero:f=!0,negativeExtraSpace:p=!1}=t,d={convertToShorts:n,degPrecision:r,floatPrecision:s,transformPrecision:i,matrixToTransform:o,shortTranslate:a,shortScale:l,shortRotate:c,removeUseless:u,collapseIntoOne:h,leadingZero:f,negativeExtraSpace:p}
return{element:{enter:e=>{null!=e.attributes.transform&&_v(e,"transform",d),null!=e.attributes.gradientTransform&&_v(e,"gradientTransform",d),null!=e.attributes.patternTransform&&_v(e,"patternTransform",d)}}}},name:"convertTransform"})
var Nv=Object.freeze({__proto__:null,description:"removes empty attributes",fn:()=>({element:{enter:e=>{for(const[t,n]of Object.entries(e.attributes))""!==n||It.conditionalProcessing.has(t)||delete e.attributes[t]}}}),name:"removeEmptyAttrs"})
var Dv=Object.freeze({__proto__:null,description:"removes empty container elements",fn:e=>{const t=nb(e)
return{element:{exit:(e,n)=>{"svg"!==e.name&&Dt.container.has(e.name)&&0===e.children.length&&("pattern"===e.name&&0!==Object.keys(e.attributes).length||"mask"===e.name&&null!=e.attributes.id||"element"===n.type&&"switch"===n.name||("g"!==e.name||null==e.attributes.filter&&!rb(t,e).filter)&&Et(e,n))}}}},name:"removeEmptyContainers"})
function Mv(e,t){const n=e[t]
return"static"===n?.type&&wb(n.value)}var jv=Object.freeze({__proto__:null,description:"merges multiple paths in one if possible",fn:(e,t)=>{const{force:n=!1,floatPrecision:r=3,noSpaceAfterFlags:s=!1}=t,i=nb(e)
return{element:{enter:e=>{if(e.children.length<=1)return
const t=[]
let o=e.children[0],a=null
const l=(e,t)=>{vk(e,t,{floatPrecision:r,noSpaceAfterFlags:s}),a=null}
for(let r=1;r<e.children.length;r++){const s=e.children[r]
if("element"!==o.type||"path"!==o.name||0!==o.children.length||null==o.attributes.d){a&&"element"===o.type&&l(o,a),o=s
continue}if("element"!==s.type||"path"!==s.name||0!==s.children.length||null==s.attributes.d){a&&l(o,a),o=s
continue}const c=rb(i,s)
if(c["marker-start"]||c["marker-mid"]||c["marker-end"]||c["clip-path"]||c.mask||c["mask-image"]||["fill","filter","stroke"].some(e=>Mv(c,e))){a&&l(o,a),o=s
continue}const u=Object.keys(s.attributes)
if(u.length!==Object.keys(o.attributes).length){a&&l(o,a),o=s
continue}if(u.some(e=>"d"!==e&&"element"===o.type&&o.attributes[e]!==s.attributes[e])){a&&l(o,a),o=s
continue}const h=null!=a,f=bk(s)
a=a??bk(o),!n&&wk(a,f)?(h&&l(o,a),o=s,a=null):(a.push(...f),t.push(s))}a&&"element"===o.type&&l(o,a),e.children=e.children.filter(e=>!t.includes(e))}}}},name:"mergePaths"})
var Iv=Object.freeze({__proto__:null,description:"removes unused namespaces declaration",fn:()=>{const e=new Set
return{element:{enter:(t,n)=>{if("svg"===t.name&&"root"===n.type)for(const n of Object.keys(t.attributes))if(n.startsWith("xmlns:")){const t=n.slice(6)
e.add(t)}if(0!==e.size){if(t.name.includes(":")){const[n]=t.name.split(":")
e.has(n)&&e.delete(n)}for(const n of Object.keys(t.attributes))if(n.includes(":")){const[t]=n.split(":")
e.delete(t)}}},exit:(t,n)=>{if("svg"===t.name&&"root"===n.type)for(const n of e)delete t.attributes[`xmlns:${n}`]}}}},name:"removeUnusedNS"})
var Rv=Object.freeze({__proto__:null,description:"Sort element attributes for better compression",fn:(e,t)=>{const{order:n=["id","width","height","x","x1","x2","y","y1","y2","cx","cy","r","fill","stroke","marker","d","points"],xmlnsOrder:r="front"}=t,s=e=>{if("front"===r){if("xmlns"===e)return 3
if(e.startsWith("xmlns:"))return 2}return e.includes(":")?1:0},i=([e],[t])=>{const r=s(e),i=s(t)-r
if(0!==i)return i
const[o]=e.split("-"),[a]=t.split("-")
if(o!==a){const e=n.includes(o)?1:0,t=n.includes(a)?1:0
if(1===e&&1===t)return n.indexOf(o)-n.indexOf(a)
const r=t-e
if(0!==r)return r}return e<t?-1:1}
return{element:{enter:e=>{const t=Object.entries(e.attributes)
t.sort(i)
const n={}
for(const[e,r]of t)n[e]=r
e.attributes=n}}}},name:"sortAttrs"})
var Fv=Object.freeze({__proto__:null,description:"Sorts children of <defs> to improve compression",fn:()=>({element:{enter:e=>{if("defs"===e.name){const t=new Map
for(const n of e.children)if("element"===n.type){const e=t.get(n.name)
null==e?t.set(n.name,1):t.set(n.name,e+1)}e.children.sort((e,n)=>{if("element"!==e.type||"element"!==n.type)return 0
const r=t.get(e.name),s=t.get(n.name)
if(null!=r&&null!=s){const e=s-r
if(0!==e)return e}const i=n.name.length-e.name.length
return 0!==i?i:e.name!==n.name?e.name>n.name?-1:1:0})}}}}),name:"sortDefsChildren"})
const zv=/^(Created with|Created using)/
var Gv=Object.freeze({__proto__:null,description:"removes <desc>",fn:(e,t)=>{const{removeAny:n=!1}=t
return{element:{enter:(e,t)=>{"desc"===e.name&&(n||0===e.children.length||"text"===e.children[0].type&&zv.test(e.children[0].value))&&Et(e,t)}}}},name:"removeDesc"})
const Bv=(({name:e,plugins:t})=>({name:e,isPreset:!0,plugins:Object.freeze(t),fn:(n,r,s)=>{const{floatPrecision:i,overrides:o}=r,a={}
if(null!=i&&(a.floatPrecision=i),o){const n=t.map(({name:e})=>e)
for(const t of Object.keys(o))n.includes(t)||console.warn(`You are trying to configure ${t} which is not part of ${e}.\nTry to put it before or after, for example\n\nplugins: [\n  {\n    name: '${e}',\n  },\n  '${t}'\n]\n`)}l(n,s,t,o,a)}}))({name:"preset-default",plugins:[Ot,Pt,Nt,ob,ab,lb,fb,pb,mb,Ab,Pb,Nb,jb,Bb,Vb,$b,Yb,Qb,ak,lk,uk,hk,fk,dk,gk,Av,Lv,Nv,Dv,jv,Iv,Rv,Fv,Gv]})
var Uv=Object.freeze({__proto__:null,description:"adds attributes to an outer <svg> element",fn:(e,t)=>{if(!Array.isArray(t.attributes)&&!t.attribute)return console.error('Error in plugin "addAttributesToSVGElement": absent parameters.\nIt should have a list of "attributes" or one "attribute".\nConfig example:\n\nplugins: [\n  {\n    name: \'addAttributesToSVGElement\',\n    params: {\n      attribute: "mySvg"\n    }\n  }\n]\n\nplugins: [\n  {\n    name: \'addAttributesToSVGElement\',\n    params: {\n      attributes: ["mySvg", "size-big"]\n    }\n  }\n]\n\nplugins: [\n  {\n    name: \'addAttributesToSVGElement\',\n    params: {\n      attributes: [\n        {\n          focusable: false\n        },\n        {\n          \'data-image\': icon\n        }\n      ]\n    }\n  }\n]\n'),null
const n=t.attributes||[t.attribute]
return{element:{enter:(e,t)=>{if("svg"===e.name&&"root"===t.type)for(const t of n)if("string"==typeof t&&null==e.attributes[t]&&(e.attributes[t]=void 0),"object"==typeof t)for(const n of Object.keys(t))null==e.attributes[n]&&(e.attributes[n]=t[n])}}}},name:"addAttributesToSVGElement"})
var qv=Object.freeze({__proto__:null,description:"adds classnames to an outer <svg> element",fn:(e,t,n)=>{if(!(Array.isArray(t.classNames)&&0!==t.classNames.length||t.className))return console.error('Error in plugin "addClassesToSVGElement": absent parameters.\nIt should have a list of classes in "classNames" or one "className".\nConfig example:\n\nplugins: [\n  {\n    name: "addClassesToSVGElement",\n    params: {\n      className: "mySvg"\n    }\n  }\n]\n\nplugins: [\n  {\n    name: "addClassesToSVGElement",\n    params: {\n      classNames: ["mySvg", "size-big"]\n    }\n  }\n]\n'),null
const r=t.classNames||[t.className]
return{element:{enter:(e,t)=>{if("svg"===e.name&&"root"===t.type){const t=new Set(null==e.attributes.class?null:e.attributes.class.split(" "))
for(const s of r)if(null!=s){const r="string"==typeof s?s:s(e,n)
t.add(r)}e.attributes.class=Array.from(t).join(" ")}}}}},name:"addClassesToSVGElement"})
const Wv=/^([-+]?\d*\.?\d+([eE][-+]?\d+)?)(px|pt|pc|mm|cm|m|in|ft|em|ex|%)?$/,Vv=/\s+,?\s*|,\s*/,$v={cm:96/2.54,mm:96/25.4,in:96,pt:4/3,pc:16,px:1}
var Yv=Object.freeze({__proto__:null,description:"rounds list of values to the fixed precision",fn:(e,t)=>{const{floatPrecision:n=3,leadingZero:r=!0,defaultPx:s=!0,convertToPx:i=!0}=t,o=e=>{const t=[]
for(const o of e.split(Vv)){const e=o.match(Wv),a=o.match(/new/)
if(e){let o=Number(Number(e[1]).toFixed(n))
let a,l=e[3]||""
if(i&&l&&l in $v){const t=Number(($v[l]*Number(e[1])).toFixed(n))
t.toString().length<e[0].length&&(o=t,l="px")}a=r?vb(o):o.toString(),s&&"px"===l&&(l=""),t.push(a+l)}else a?t.push("new"):o&&t.push(o)}return t.join(" ")}
return{element:{enter:e=>{null!=e.attributes.points&&(e.attributes.points=o(e.attributes.points)),null!=e.attributes["enable-background"]&&(e.attributes["enable-background"]=o(e.attributes["enable-background"])),null!=e.attributes.viewBox&&(e.attributes.viewBox=o(e.attributes.viewBox)),null!=e.attributes["stroke-dasharray"]&&(e.attributes["stroke-dasharray"]=o(e.attributes["stroke-dasharray"])),null!=e.attributes.dx&&(e.attributes.dx=o(e.attributes.dx)),null!=e.attributes.dy&&(e.attributes.dy=o(e.attributes.dy)),null!=e.attributes.x&&(e.attributes.x=o(e.attributes.x)),null!=e.attributes.y&&(e.attributes.y=o(e.attributes.y))}}}},name:"cleanupListOfValues"})
var Xv=Object.freeze({__proto__:null,description:"converts one-stop (single color) gradients to a plain color",fn:e=>{const t=nb(e),n=new Set,r=new Map,s=new Map
let i=0
return{element:{enter:(o,a)=>{if(null!=o.attributes["xlink:href"]&&i++,"defs"===o.name)return r.set(o,a),void 0
if("linearGradient"!==o.name&&"radialGradient"!==o.name)return
const l=o.children.filter(e=>"element"===e.type&&"stop"===e.name),c=o.attributes["xlink:href"]||o.attributes.href,u=0===l.length&&null!=c&&c.startsWith("#")?_t(e,c):o
if(null==u||"element"!==u.type)return s.set(o,a),void 0
const h=u.children.filter(e=>"element"===e.type&&"stop"===e.name)
if(1!==h.length||"element"!==h[0].type)return
let f
"element"===a.type&&"defs"===a.name&&n.add(a),s.set(o,a)
const p=rb(t,h[0])["stop-color"]
null!=p&&"static"===p.type&&(f=p.value)
const d=`url(#${o.attributes.id})`,m=[...$t].map(e=>`[${e}="${d}"]`).join(","),g=At(e,m)
for(const e of g)if("element"===e.type)for(const t of $t)e.attributes[t]===d&&(null!=f?e.attributes[t]=f:delete e.attributes[t])
const y=At(e,`[style*=${d}]`)
for(const e of y)"element"===e.type&&(e.attributes.style=e.attributes.style.replace(d,f||Rt.presentation["stop-color"]))},exit:e=>{if("svg"===e.name){for(const[e,t]of s.entries())null!=e.attributes["xlink:href"]&&i--,Et(e,t)
0===i&&delete e.attributes["xmlns:xlink"]
for(const[e,t]of r.entries())n.has(e)&&0===e.children.length&&Et(e,t)}}}}},name:"convertOneStopGradients"})
const Hv=(...e)=>"(?:"+e.join("|")+")",Qv=It.presentation,Kv="\\\\(?:[0-9a-f]{1,6}\\s?|\\r\\n|.)",Zv="\\s*("+Hv("[^:;\\\\]",Kv)+"*?)\\s*",Jv="'(?:[^'\\n\\r\\\\]|"+Kv+")*?(?:'|$)",eS='"(?:[^"\\n\\r\\\\]|'+Kv+')*?(?:"|$)',tS=new RegExp("^"+Hv(Jv,eS)+"$"),nS="\\("+Hv("[^'\"()\\\\]+",Kv,Jv,eS)+"*?\\)",rS="\\s*("+Hv("[^!'\"();\\\\]+?",Kv,Jv,eS,nS,"[^;]*?")+"*?)",sS=new RegExp(Zv+":"+rS+"(\\s*!important(?![-(\\w]))?\\s*(?:;\\s*|$)","ig"),iS=new RegExp(Hv(Kv,Jv,eS,"/\\*[^]*?\\*/"),"ig")
var oS=Object.freeze({__proto__:null,description:"converts style to attributes",fn:(e,t)=>{const{keepImportant:n=!1}=t
return{element:{enter:e=>{if(null!=e.attributes.style){let r=[]
const s={},i=e.attributes.style.replace(iS,e=>"/"==e[0]?"":"\\"==e[0]&&/[-g-z]/i.test(e[1])?e[1]:e)
sS.lastIndex=0
for(var t;t=sS.exec(i);)n&&t[3]||r.push([t[1],t[2]])
r.length&&(r=r.filter(function(e){if(e[0]){const t=e[0].toLowerCase()
let n=e[1]
if(tS.test(n)&&(n=n.slice(1,-1)),Qv.has(t))return s[t]=n,!1}return!0}),Object.assign(e.attributes,s),r.length?e.attributes.style=r.map(e=>e.join(":")).join(";"):delete e.attributes.style)}}}}},name:"convertStyleToAttrs"})
const aS=(e,t)=>{const n=e(t)
return t.startsWith(n)?t:n+t},lS=(e,t)=>t.startsWith("#")?"#"+aS(e,t.slice(1)):null
var cS=Object.freeze({__proto__:null,description:"prefix IDs",fn:(e,t,n)=>{const{delim:r="__",prefix:s,prefixIds:i=!0,prefixClassNames:o=!0}=t,a=new Map
return{element:{enter:e=>{const t=t=>((e,t,n,r,s,i)=>{if("function"==typeof r){let o=i.get(e)
return null!=o||(o=r(t,n)+s,i.set(e,o)),o}return"string"==typeof r?r+s:!1===r?"":null!=n.path&&n.path.length>0?(o=(e=>{const t=/[/\\]?([^/\\]+)$/.exec(e)
return t?t[1]:""})(n.path),o.replace(/[. ]/g,"_")+s):"prefix"+s
var o})(t,e,n,s,r,a)
if("style"===e.name){if(0===e.children.length)return
for(const n of e.children){if("text"!==n.type&&"cdata"!==n.type)continue
const e=n.value
let r
try{r=bc(e,{parseValue:!0,parseCustomProperty:!1})}catch{return}wc(r,e=>{if(i&&"IdSelector"===e.type||o&&"ClassSelector"===e.type)return e.name=aS(t,e.name),void 0
if("Url"===e.type&&e.value.length>0){const r=lS(t,(n=e.value).startsWith('"')&&n.endsWith('"')||n.startsWith("'")&&n.endsWith("'")?n.slice(1,-1):n)
null!=r&&(e.value=r)}var n}),n.value=kc(r)}}i&&null!=e.attributes.id&&0!==e.attributes.id.length&&(e.attributes.id=aS(t,e.attributes.id)),o&&null!=e.attributes.class&&0!==e.attributes.class.length&&(e.attributes.class=e.attributes.class.split(/\s+/).map(e=>aS(t,e)).join(" "))
for(const n of["href","xlink:href"])if(null!=e.attributes[n]&&0!==e.attributes[n].length){const r=lS(t,e.attributes[n])
null!=r&&(e.attributes[n]=r)}for(const n of Bt)null!=e.attributes[n]&&0!==e.attributes[n].length&&(e.attributes[n]=e.attributes[n].replace(/\burl\((["'])?(#.+?)\1\)/gi,(e,n,r)=>{const s=lS(t,r)
return null==s?e:`url(${s})`}))
for(const n of["begin","end"])if(null!=e.attributes[n]&&0!==e.attributes[n].length){const r=e.attributes[n].split(/\s*;\s+/).map(e=>{if(e.endsWith(".end")||e.endsWith(".start")){const[n,r]=e.split(".")
return`${aS(t,n)}.${r}`}return e})
e.attributes[n]=r.join("; ")}}}}},name:"prefixIds"})
var uS=Object.freeze({__proto__:null,description:"removes attributes of elements that match a css selector",fn:(e,t)=>{const n=Array.isArray(t.selectors)?t.selectors:[t]
for(const{selector:t,attributes:r}of n){const n=At(e,t)
for(const e of n)if("element"===e.type)if(Array.isArray(r))for(const t of r)delete e.attributes[t]
else delete e.attributes[r]}return{}},name:"removeAttributesBySelector"})
var hS=Object.freeze({__proto__:null,description:"removes specified attributes",fn:(e,t)=>{if(void 0===t.attrs)return console.warn('Warning: The plugin "removeAttrs" requires the "attrs" parameter.\nIt should have a pattern to remove, otherwise the plugin is a noop.\nConfig example:\n\nplugins: [\n  {\n    name: "removeAttrs",\n    params: {\n      attrs: "(fill|stroke)"\n    }\n  }\n]\n'),null
const n="string"==typeof t.elemSeparator?t.elemSeparator:":",r="boolean"==typeof t.preserveCurrentColor&&t.preserveCurrentColor,s=Array.isArray(t.attrs)?t.attrs:[t.attrs]
return{element:{enter:e=>{for(let t of s){t.includes(n)?t.split(n).length<3&&(t=[t,".*"].join(n)):t=[".*",t,".*"].join(n)
const s=t.split(n).map(e=>("*"===e&&(e=".*"),new RegExp(["^",e,"$"].join(""),"i")))
if(s[0].test(e.name))for(const[t,n]of Object.entries(e.attributes)){const i="currentcolor"===n.toLowerCase()
!(r&&"fill"==t&&i)&&!(r&&"stroke"==t&&i)&&s[1].test(t)&&s[2].test(n)&&delete e.attributes[t]}}}}}},name:"removeAttrs"})
var fS=Object.freeze({__proto__:null,description:"removes width and height in presence of viewBox (opposite to removeViewBox)",fn:()=>({element:{enter:e=>{if("svg"===e.name)if(null!=e.attributes.viewBox)delete e.attributes.width,delete e.attributes.height
else if(null!=e.attributes.width&&null!=e.attributes.height&&!1===Number.isNaN(Number(e.attributes.width))&&!1===Number.isNaN(Number(e.attributes.height))){const t=Number(e.attributes.width),n=Number(e.attributes.height)
e.attributes.viewBox=`0 0 ${t} ${n}`,delete e.attributes.width,delete e.attributes.height}}}}),name:"removeDimensions"})
var pS=Object.freeze({__proto__:null,description:"removes arbitrary elements by ID or className (disabled by default)",fn:(e,t)=>{const n=null==t.id?[]:Array.isArray(t.id)?t.id:[t.id],r=null==t.class?[]:Array.isArray(t.class)?t.class:[t.class]
return{element:{enter:(e,t)=>{if(null!=e.attributes.id&&0!==n.length&&n.includes(e.attributes.id)&&Et(e,t),e.attributes.class&&0!==r.length){const n=e.attributes.class.split(" ")
for(const s of r)if(n.includes(s)){Et(e,t)
break}}}}}},name:"removeElementsByAttr"})
var dS=Object.freeze({__proto__:null,description:"removes elements that are drawn outside of the viewBox (disabled by default)",fn:()=>{let e=null
return{element:{enter:(t,n)=>{if("svg"===t.name&&"root"===n.type){let n=""
null!=t.attributes.viewBox?n=t.attributes.viewBox:null!=t.attributes.height&&null!=t.attributes.width&&(n=`0 0 ${t.attributes.width} ${t.attributes.height}`),n=n.replace(/[,+]|px/g," ").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")
const r=/^(-?\d*\.?\d+) (-?\d*\.?\d+) (\d*\.?\d+) (\d*\.?\d+)$/.exec(n)
if(null==r)return
const s=Number.parseFloat(r[1]),i=Number.parseFloat(r[2]),o=Number.parseFloat(r[3]),a=Number.parseFloat(r[4])
e={left:s,top:i,right:s+o,bottom:i+a,width:o,height:a}}if(null!=t.attributes.transform)return o
if("path"===t.name&&null!=t.attributes.d&&null!=e){const r=nk(t.attributes.d)
let s=!1
for(const t of r)if("M"===t.command){const[n,r]=t.args
n>=e.left&&n<=e.right&&r>=e.top&&r<=e.bottom&&(s=!0)}if(s)return
2===r.length&&r.push({command:"z",args:[]})
const{left:i,top:o,width:a,height:l}=e
!1===wk([{command:"M",args:[i,o]},{command:"h",args:[a]},{command:"v",args:[l]},{command:"H",args:[i]},{command:"z",args:[]}],r)&&Et(t,n)}}}}},name:"removeOffCanvasPaths"})
var mS=Object.freeze({__proto__:null,description:"removes raster images (disabled by default)",fn:()=>({element:{enter:(e,t)=>{"image"===e.name&&null!=e.attributes["xlink:href"]&&/(\.|image\/)(jpe?g|png|gif)/.test(e.attributes["xlink:href"])&&Et(e,t)}}}),name:"removeRasterImages"})
const gS=[...It.animationEvent,...It.documentEvent,...It.documentElementEvent,...It.globalEvent,...It.graphicalEvent]
var yS=Object.freeze({__proto__:null,description:"removes scripts (disabled by default)",fn:()=>({element:{enter:(e,t)=>{if("script"===e.name)return Et(e,t),void 0
for(const t of gS)null!=e.attributes[t]&&delete e.attributes[t]},exit:(e,t)=>{if("a"===e.name)for(const n of Object.keys(e.attributes))if("href"===n||n.endsWith(":href")){if(null==e.attributes[n]||!e.attributes[n].trimStart().startsWith("javascript:"))continue
const r=t.children.indexOf(e),s=e.children.filter(e=>"text"!==e.type)
t.children.splice(r,1,...s)}}}}),name:"removeScripts"})
var bS=Object.freeze({__proto__:null,description:"removes <style> element (disabled by default)",fn:()=>({element:{enter:(e,t)=>{"style"===e.name&&Et(e,t)}}}),name:"removeStyleElement"})
var kS=Object.freeze({__proto__:null,description:"removes <title>",fn:()=>({element:{enter:(e,t)=>{"title"===e.name&&Et(e,t)}}}),name:"removeTitle"})
const vS=new Set(["pattern","svg","symbol"])
var SS=Object.freeze({__proto__:null,description:"removes viewBox attribute when possible",fn:()=>({element:{enter:(e,t)=>{if(vS.has(e.name)&&null!=e.attributes.viewBox&&null!=e.attributes.width&&null!=e.attributes.height){if("svg"===e.name&&"root"!==t.type)return
const n=e.attributes.viewBox.split(/[ ,]+/g)
"0"===n[0]&&"0"===n[1]&&e.attributes.width.replace(/px$/,"")===n[2]&&e.attributes.height.replace(/px$/,"")===n[3]&&delete e.attributes.viewBox}}}}),name:"removeViewBox"})
const wS="http://www.w3.org/1999/xlink",xS={new:"_blank",replace:"_self"},CS=new Set(["cursor","filter","font-face-uri","glyphRef","tref"]),AS=(e,t,n)=>t.map(e=>`${e}:${n}`).filter(t=>null!=e.attributes[t])
var _S=Object.freeze({__proto__:null,description:"remove xlink namespace and replaces attributes with the SVG 2 equivalent where applicable",fn:(e,t)=>{const{includeLegacy:n}=t,r=[],s=[],i=[]
return{element:{enter:e=>{for(const[t,n]of Object.entries(e.attributes))if(t.startsWith("xmlns:")){const e=t.split(":",2)[1]
if(n===wS){r.push(e)
continue}r.includes(e)&&s.push(e)}if(s.some(e=>r.includes(e)))return
const t=AS(e,r,"show")
let o=null!=e.attributes.target
for(let n=t.length-1;n>=0;n--){const r=t[n],s=e.attributes[r],i=xS[s]
o||null==i?delete e.attributes[r]:(i!==zt[e.name]?.defaults?.target&&(e.attributes.target=i),delete e.attributes[r],o=!0)}const a=AS(e,r,"title")
for(let t=a.length-1;t>=0;t--){const n=a[t],r=e.attributes[n]
if(e.children.filter(e=>"element"===e.type&&"title"===e.name).length>0){delete e.attributes[n]
continue}const s={type:"element",name:"title",attributes:{},children:[{type:"text",value:r}]}
Object.defineProperty(s,"parentNode",{writable:!0,value:e}),e.children.unshift(s),delete e.attributes[n]}const l=AS(e,r,"href")
if(l.length>0&&CS.has(e.name)&&!n)return l.map(e=>e.split(":",1)[0]).forEach(e=>i.push(e)),void 0
for(let t=l.length-1;t>=0;t--){const n=l[t],r=e.attributes[n]
null==e.attributes.href?(e.attributes.href=r,delete e.attributes[n]):delete e.attributes[n]}},exit:e=>{for(const[t,o]of Object.entries(e.attributes)){const[a,l]=t.split(":",2)
if(!r.includes(a)||s.includes(a)||i.includes(a)||n){if(t.startsWith("xmlns:")&&!i.includes(l)){if(o===wS){const n=r.indexOf(l)
r.splice(n,1),delete e.attributes[t]
continue}if(s.includes(a)){const e=s.indexOf(l)
s.splice(e,1)}}}else delete e.attributes[t]}}}}},name:"removeXlink"})
var TS=Object.freeze({__proto__:null,description:"removes xmlns attribute (for inline svg, disabled by default)",fn:()=>({element:{enter:e=>{"svg"===e.name&&delete e.attributes.xmlns}}}),name:"removeXMLNS"})
var ES=Object.freeze({__proto__:null,description:"Finds <path> elements with the same d, fill, and stroke, and converts them to <use> elements referencing a single <path> def.",fn:e=>{const t=nb(e),n=new Map
let r
const s=new Set
return{element:{enter:(e,t)=>{if("path"===e.name&&null!=e.attributes.d){const t=e.attributes.d,r=e.attributes.fill||"",s=t+";s:"+(e.attributes.stroke||"")+";f:"+r
let i=n.get(s)
null==i&&(i=[],n.set(s,i)),i.push(e)}if(null==r&&"defs"===e.name&&"element"===t.type&&"svg"===t.name&&(r=e),"use"===e.name)for(const t of["href","xlink:href"]){const n=e.attributes[t]
null!=n&&n.startsWith("#")&&n.length>1&&s.add(n.slice(1))}},exit:(e,i)=>{if("svg"===e.name&&"root"===i.type){let i=r
null==i&&(i={type:"element",name:"defs",attributes:{},children:[]})
let o=0
for(const r of n.values())if(r.length>1){const n={type:"element",name:"path",attributes:{},children:[]}
for(const e of["fill","stroke","d"])null!=r[0].attributes[e]&&(n.attributes[e]=r[0].attributes[e])
const a=r[0].attributes.id
null==a||s.has(a)||t.rules.some(e=>e.selector===`#${a}`)?n.attributes.id="reuse-"+o++:(n.attributes.id=a,delete r[0].attributes.id),i.children.push(n)
for(const t of r){if(delete t.attributes.d,delete t.attributes.stroke,delete t.attributes.fill,i.children.includes(t)&&0===t.children.length){if(0===Object.keys(t.attributes).length){Et(t,i)
continue}if(1===Object.keys(t.attributes).length&&null!=t.attributes.id){Et(t,i)
const r=`[xlink\\:href=#${t.attributes.id}], [href=#${t.attributes.id}]`
for(const t of At(e,r))if("element"===t.type)for(const e of["href","xlink:href"])null!=t.attributes[e]&&(t.attributes[e]="#"+n.attributes.id)
continue}}t.name="use",t.attributes["xlink:href"]="#"+n.attributes.id}}0!==i.children.length&&(null==e.attributes["xmlns:xlink"]&&(e.attributes["xmlns:xlink"]="http://www.w3.org/1999/xlink"),null==r&&e.children.unshift(i))}}}}},name:"reusePaths"})
const OS=Object.freeze([Bv,Uv,qv,fb,Qb,Pb,Yv,jb,gk,Bb,hk,Xv,Av,uk,oS,Lv,mb,jv,pb,Ab,fk,dk,cS,uS,hS,Nt,ob,Gv,fS,Ot,lb,pS,Nv,Dv,lk,ak,ab,$b,dS,mS,yS,bS,kS,Vb,Iv,Nb,Yb,SS,_S,TS,Pt,ES,Rv,Fv])
var PS={}
void!function(e){e.parser=function(e,t){return new r(e,t)},e.SAXParser=r,e.SAXStream=o,e.createStream=function(e,t){return new o(e,t)},e.MAX_BUFFER_LENGTH=65536
var t,n=["comment","sgmlDecl","textNode","tagName","doctype","procInstName","procInstBody","entity","attribName","attribValue","cdata","script"]
function r(t,s){if(!(this instanceof r))return new r(t,s)
var i=this
!function(e){for(var t=0,r=n.length;t<r;t++)e[n[t]]=""}(i),i.q=i.c="",i.bufferCheckPosition=e.MAX_BUFFER_LENGTH,i.opt=s||{},i.opt.lowercase=i.opt.lowercase||i.opt.lowercasetags,i.looseCase=i.opt.lowercase?"toLowerCase":"toUpperCase",i.tags=[],i.closed=i.closedRoot=i.sawRoot=!1,i.tag=i.error=null,i.strict=!!t,i.noscript=!(!t&&!i.opt.noscript),i.state=C.BEGIN,i.strictEntities=i.opt.strictEntities,i.ENTITIES=i.strictEntities?Object.create(e.XML_ENTITIES):Object.create(e.ENTITIES),i.attribList=[],i.opt.xmlns&&(i.ns=Object.create(h)),void 0===i.opt.unquotedAttributeValues&&(i.opt.unquotedAttributeValues=!t),i.trackPosition=!1!==i.opt.position,i.trackPosition&&(i.position=i.line=i.column=0),_(i,"onready")}e.EVENTS=["text","processinginstruction","sgmldeclaration","doctype","comment","opentagstart","attribute","opentag","closetag","opencdata","cdata","closecdata","error","end","ready","script","opennamespace","closenamespace"],Object.create||(Object.create=function(e){function t(){}return t.prototype=e,new t}),Object.keys||(Object.keys=function(e){var t=[]
for(var n in e)e.hasOwnProperty(n)&&t.push(n)
return t}),r.prototype={end:function(){L(this)},write:function(t){var r=this
if(this.error)throw this.error
if(r.closed)return P(r,"Cannot write after close. Assign an onready handler.")
if(null===t)return L(r)
"object"==typeof t&&(t=t.toString())
for(var s=0,i="";i=G(t,s++),r.c=i,i;)switch(r.trackPosition&&(r.position++,"\n"===i?(r.line++,r.column=0):r.column++),r.state){case C.BEGIN:if(r.state=C.BEGIN_WHITESPACE,"\ufeff"===i)continue
z(r,i)
continue
case C.BEGIN_WHITESPACE:z(r,i)
continue
case C.TEXT:if(r.sawRoot&&!r.closedRoot){for(var o=s-1;i&&"<"!==i&&"&"!==i;)(i=G(t,s++))&&r.trackPosition&&(r.position++,"\n"===i?(r.line++,r.column=0):r.column++)
r.textNode+=t.substring(o,s-1)}"<"!==i||r.sawRoot&&r.closedRoot&&!r.strict?(g(i)||r.sawRoot&&!r.closedRoot||N(r,"Text data outside of root node."),"&"===i?r.state=C.TEXT_ENTITY:r.textNode+=i):(r.state=C.OPEN_WAKA,r.startTagPosition=r.position)
continue
case C.SCRIPT:"<"===i?r.state=C.SCRIPT_ENDING:r.script+=i
continue
case C.SCRIPT_ENDING:"/"===i?r.state=C.CLOSE_TAG:(r.script+="<"+i,r.state=C.SCRIPT)
continue
case C.OPEN_WAKA:if("!"===i)r.state=C.SGML_DECL,r.sgmlDecl=""
else if(g(i));else if(k(f,i))r.state=C.OPEN_TAG,r.tagName=i
else if("/"===i)r.state=C.CLOSE_TAG,r.tagName=""
else if("?"===i)r.state=C.PROC_INST,r.procInstName=r.procInstBody=""
else{if(N(r,"Unencoded <"),r.startTagPosition+1<r.position){var c=r.position-r.startTagPosition
i=new Array(c).join(" ")+i}r.textNode+="<"+i,r.state=C.TEXT}continue
case C.SGML_DECL:if(r.sgmlDecl+i==="--"){r.state=C.COMMENT,r.comment="",r.sgmlDecl=""
continue}r.doctype&&!0!==r.doctype&&r.sgmlDecl?(r.state=C.DOCTYPE_DTD,r.doctype+="<!"+r.sgmlDecl+i,r.sgmlDecl=""):(r.sgmlDecl+i).toUpperCase()===a?(T(r,"onopencdata"),r.state=C.CDATA,r.sgmlDecl="",r.cdata=""):(r.sgmlDecl+i).toUpperCase()===l?(r.state=C.DOCTYPE,(r.doctype||r.sawRoot)&&N(r,"Inappropriately located doctype declaration"),r.doctype="",r.sgmlDecl=""):">"===i?(T(r,"onsgmldeclaration",r.sgmlDecl),r.sgmlDecl="",r.state=C.TEXT):y(i)?(r.state=C.SGML_DECL_QUOTED,r.sgmlDecl+=i):r.sgmlDecl+=i
continue
case C.SGML_DECL_QUOTED:i===r.q&&(r.state=C.SGML_DECL,r.q=""),r.sgmlDecl+=i
continue
case C.DOCTYPE:">"===i?(r.state=C.TEXT,T(r,"ondoctype",r.doctype),r.doctype=!0):(r.doctype+=i,"["===i?r.state=C.DOCTYPE_DTD:y(i)&&(r.state=C.DOCTYPE_QUOTED,r.q=i))
continue
case C.DOCTYPE_QUOTED:r.doctype+=i,i===r.q&&(r.q="",r.state=C.DOCTYPE)
continue
case C.DOCTYPE_DTD:"]"===i?(r.doctype+=i,r.state=C.DOCTYPE):"<"===i?(r.state=C.OPEN_WAKA,r.startTagPosition=r.position):y(i)?(r.doctype+=i,r.state=C.DOCTYPE_DTD_QUOTED,r.q=i):r.doctype+=i
continue
case C.DOCTYPE_DTD_QUOTED:r.doctype+=i,i===r.q&&(r.state=C.DOCTYPE_DTD,r.q="")
continue
case C.COMMENT:"-"===i?r.state=C.COMMENT_ENDING:r.comment+=i
continue
case C.COMMENT_ENDING:"-"===i?(r.state=C.COMMENT_ENDED,r.comment=O(r.opt,r.comment),r.comment&&T(r,"oncomment",r.comment),r.comment=""):(r.comment+="-"+i,r.state=C.COMMENT)
continue
case C.COMMENT_ENDED:">"!==i?(N(r,"Malformed comment"),r.comment+="--"+i,r.state=C.COMMENT):r.doctype&&!0!==r.doctype?r.state=C.DOCTYPE_DTD:r.state=C.TEXT
continue
case C.CDATA:"]"===i?r.state=C.CDATA_ENDING:r.cdata+=i
continue
case C.CDATA_ENDING:"]"===i?r.state=C.CDATA_ENDING_2:(r.cdata+="]"+i,r.state=C.CDATA)
continue
case C.CDATA_ENDING_2:">"===i?(r.cdata&&T(r,"oncdata",r.cdata),T(r,"onclosecdata"),r.cdata="",r.state=C.TEXT):"]"===i?r.cdata+="]":(r.cdata+="]]"+i,r.state=C.CDATA)
continue
case C.PROC_INST:"?"===i?r.state=C.PROC_INST_ENDING:g(i)?r.state=C.PROC_INST_BODY:r.procInstName+=i
continue
case C.PROC_INST_BODY:if(!r.procInstBody&&g(i))continue
"?"===i?r.state=C.PROC_INST_ENDING:r.procInstBody+=i
continue
case C.PROC_INST_ENDING:">"===i?(T(r,"onprocessinginstruction",{name:r.procInstName,body:r.procInstBody}),r.procInstName=r.procInstBody="",r.state=C.TEXT):(r.procInstBody+="?"+i,r.state=C.PROC_INST_BODY)
continue
case C.OPEN_TAG:k(p,i)?r.tagName+=i:(D(r),">"===i?I(r):"/"===i?r.state=C.OPEN_TAG_SLASH:(g(i)||N(r,"Invalid character in tag name"),r.state=C.ATTRIB))
continue
case C.OPEN_TAG_SLASH:">"===i?(I(r,!0),R(r)):(N(r,"Forward-slash in opening tag not followed by >"),r.state=C.ATTRIB)
continue
case C.ATTRIB:if(g(i))continue
">"===i?I(r):"/"===i?r.state=C.OPEN_TAG_SLASH:k(f,i)?(r.attribName=i,r.attribValue="",r.state=C.ATTRIB_NAME):N(r,"Invalid attribute name")
continue
case C.ATTRIB_NAME:"="===i?r.state=C.ATTRIB_VALUE:">"===i?(N(r,"Attribute without value"),r.attribValue=r.attribName,j(r),I(r)):g(i)?r.state=C.ATTRIB_NAME_SAW_WHITE:k(p,i)?r.attribName+=i:N(r,"Invalid attribute name")
continue
case C.ATTRIB_NAME_SAW_WHITE:if("="===i)r.state=C.ATTRIB_VALUE
else{if(g(i))continue
N(r,"Attribute without value"),r.tag.attributes[r.attribName]="",r.attribValue="",T(r,"onattribute",{name:r.attribName,value:""}),r.attribName="",">"===i?I(r):k(f,i)?(r.attribName=i,r.state=C.ATTRIB_NAME):(N(r,"Invalid attribute name"),r.state=C.ATTRIB)}continue
case C.ATTRIB_VALUE:if(g(i))continue
y(i)?(r.q=i,r.state=C.ATTRIB_VALUE_QUOTED):(r.opt.unquotedAttributeValues||P(r,"Unquoted attribute value"),r.state=C.ATTRIB_VALUE_UNQUOTED,r.attribValue=i)
continue
case C.ATTRIB_VALUE_QUOTED:if(i!==r.q){"&"===i?r.state=C.ATTRIB_VALUE_ENTITY_Q:r.attribValue+=i
continue}j(r),r.q="",r.state=C.ATTRIB_VALUE_CLOSED
continue
case C.ATTRIB_VALUE_CLOSED:g(i)?r.state=C.ATTRIB:">"===i?I(r):"/"===i?r.state=C.OPEN_TAG_SLASH:k(f,i)?(N(r,"No whitespace between attributes"),r.attribName=i,r.attribValue="",r.state=C.ATTRIB_NAME):N(r,"Invalid attribute name")
continue
case C.ATTRIB_VALUE_UNQUOTED:if(!b(i)){"&"===i?r.state=C.ATTRIB_VALUE_ENTITY_U:r.attribValue+=i
continue}j(r),">"===i?I(r):r.state=C.ATTRIB
continue
case C.CLOSE_TAG:if(r.tagName)">"===i?R(r):k(p,i)?r.tagName+=i:r.script?(r.script+="</"+r.tagName,r.tagName="",r.state=C.SCRIPT):(g(i)||N(r,"Invalid tagname in closing tag"),r.state=C.CLOSE_TAG_SAW_WHITE)
else{if(g(i))continue
v(f,i)?r.script?(r.script+="</"+i,r.state=C.SCRIPT):N(r,"Invalid tagname in closing tag."):r.tagName=i}continue
case C.CLOSE_TAG_SAW_WHITE:if(g(i))continue
">"===i?R(r):N(r,"Invalid characters in closing tag")
continue
case C.TEXT_ENTITY:case C.ATTRIB_VALUE_ENTITY_Q:case C.ATTRIB_VALUE_ENTITY_U:var u,h
switch(r.state){case C.TEXT_ENTITY:u=C.TEXT,h="textNode"
break
case C.ATTRIB_VALUE_ENTITY_Q:u=C.ATTRIB_VALUE_QUOTED,h="attribValue"
break
case C.ATTRIB_VALUE_ENTITY_U:u=C.ATTRIB_VALUE_UNQUOTED,h="attribValue"}if(";"===i){var S=F(r)
r.opt.unparsedEntities&&!Object.values(e.XML_ENTITIES).includes(S)?(r.entity="",r.state=u,r.write(S)):(r[h]+=S,r.entity="",r.state=u)}else k(r.entity.length?m:d,i)?r.entity+=i:(N(r,"Invalid character in entity name"),r[h]+="&"+r.entity+i,r.entity="",r.state=u)
continue
default:throw new Error(r,"Unknown state: "+r.state)}return r.position>=r.bufferCheckPosition&&!function(t){for(var r=Math.max(e.MAX_BUFFER_LENGTH,10),s=0,i=0,o=n.length;i<o;i++){var a=t[n[i]].length
if(a>r)switch(n[i]){case"textNode":E(t)
break
case"cdata":T(t,"oncdata",t.cdata),t.cdata=""
break
case"script":T(t,"onscript",t.script),t.script=""
break
default:P(t,"Max buffer length exceeded: "+n[i])}s=Math.max(s,a)}var l=e.MAX_BUFFER_LENGTH-s
t.bufferCheckPosition=l+t.position}(r),r},resume:function(){return this.error=null,this},close:function(){return this.write(null)},flush:function(){var e
E(e=this),""!==e.cdata&&(T(e,"oncdata",e.cdata),e.cdata=""),void(""!==e.script&&(T(e,"onscript",e.script),e.script=""))}}
try{t=require("stream").Stream}catch(e){t=function(){}}t||(t=function(){})
var i=e.EVENTS.filter(function(e){return"error"!==e&&"end"!==e})
function o(e,n){if(!(this instanceof o))return new o(e,n)
t.apply(this),this._parser=new r(e,n),this.writable=!0,this.readable=!0
var s=this
this._parser.onend=function(){s.emit("end")},this._parser.onerror=function(e){s.emit("error",e),s._parser.error=null},this._decoder=null,i.forEach(function(e){Object.defineProperty(s,"on"+e,{get:function(){return s._parser["on"+e]},set:function(t){if(!t)return s.removeAllListeners(e),s._parser["on"+e]=t,t
s.on(e,t)},enumerable:!0,configurable:!1})})}o.prototype=Object.create(t.prototype,{constructor:{value:o}}),o.prototype.write=function(e){if("function"==typeof Buffer&&"function"==typeof Buffer.isBuffer&&Buffer.isBuffer(e)){if(!this._decoder){var t=s.StringDecoder
this._decoder=new t("utf8")}e=this._decoder.write(e)}return this._parser.write(e.toString()),this.emit("data",e),!0},o.prototype.end=function(e){return e&&e.length&&this.write(e),this._parser.end(),!0},o.prototype.on=function(e,n){var r=this
return r._parser["on"+e]||-1===i.indexOf(e)||(r._parser["on"+e]=function(){var t=1===arguments.length?[arguments[0]]:Array.apply(null,arguments)
t.splice(0,0,e),r.emit.apply(r,t)}),t.prototype.on.call(r,e,n)}
var a="[CDATA[",l="DOCTYPE",c="http://www.w3.org/XML/1998/namespace",u="http://www.w3.org/2000/xmlns/",h={xml:c,xmlns:u},f=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,p=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,d=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,m=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/
function g(e){return" "===e||"\n"===e||"\r"===e||"\t"===e}function y(e){return'"'===e||"'"===e}function b(e){return">"===e||g(e)}function k(e,t){return e.test(t)}function v(e,t){return!k(e,t)}var S,w,x,C=0
for(var A in e.STATE={BEGIN:C++,BEGIN_WHITESPACE:C++,TEXT:C++,TEXT_ENTITY:C++,OPEN_WAKA:C++,SGML_DECL:C++,SGML_DECL_QUOTED:C++,DOCTYPE:C++,DOCTYPE_QUOTED:C++,DOCTYPE_DTD:C++,DOCTYPE_DTD_QUOTED:C++,COMMENT_STARTING:C++,COMMENT:C++,COMMENT_ENDING:C++,COMMENT_ENDED:C++,CDATA:C++,CDATA_ENDING:C++,CDATA_ENDING_2:C++,PROC_INST:C++,PROC_INST_BODY:C++,PROC_INST_ENDING:C++,OPEN_TAG:C++,OPEN_TAG_SLASH:C++,ATTRIB:C++,ATTRIB_NAME:C++,ATTRIB_NAME_SAW_WHITE:C++,ATTRIB_VALUE:C++,ATTRIB_VALUE_QUOTED:C++,ATTRIB_VALUE_CLOSED:C++,ATTRIB_VALUE_UNQUOTED:C++,ATTRIB_VALUE_ENTITY_Q:C++,ATTRIB_VALUE_ENTITY_U:C++,CLOSE_TAG:C++,CLOSE_TAG_SAW_WHITE:C++,SCRIPT:C++,SCRIPT_ENDING:C++},e.XML_ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'"},e.ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'",AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,aelig:230,agrave:224,aring:229,atilde:227,auml:228,ccedil:231,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,iacute:237,icirc:238,igrave:236,iuml:239,ntilde:241,oacute:243,ocirc:244,ograve:242,oslash:248,otilde:245,ouml:246,szlig:223,thorn:254,uacute:250,ucirc:251,ugrave:249,uuml:252,yacute:253,yuml:255,copy:169,reg:174,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,ordf:170,laquo:171,not:172,shy:173,macr:175,deg:176,plusmn:177,sup1:185,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,int:8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},Object.keys(e.ENTITIES).forEach(function(t){var n=e.ENTITIES[t],r="number"==typeof n?String.fromCharCode(n):n
e.ENTITIES[t]=r}),e.STATE)e.STATE[e.STATE[A]]=A
function _(e,t,n){e[t]&&e[t](n)}function T(e,t,n){e.textNode&&E(e),_(e,t,n)}function E(e){e.textNode=O(e.opt,e.textNode),e.textNode&&_(e,"ontext",e.textNode),e.textNode=""}function O(e,t){return e.trim&&(t=t.trim()),e.normalize&&(t=t.replace(/\s+/g," ")),t}function P(e,t){return E(e),e.trackPosition&&(t+="\nLine: "+e.line+"\nColumn: "+e.column+"\nChar: "+e.c),t=new Error(t),e.error=t,_(e,"onerror",t),e}function L(e){return e.sawRoot&&!e.closedRoot&&N(e,"Unclosed root tag"),e.state!==C.BEGIN&&e.state!==C.BEGIN_WHITESPACE&&e.state!==C.TEXT&&P(e,"Unexpected end"),E(e),e.c="",e.closed=!0,_(e,"onend"),r.call(e,e.strict,e.opt),e}function N(e,t){if("object"!=typeof e||!(e instanceof r))throw new Error("bad call to strictFail")
e.strict&&P(e,t)}function D(e){e.strict||(e.tagName=e.tagName[e.looseCase]())
var t=e.tags[e.tags.length-1]||e,n=e.tag={name:e.tagName,attributes:{}}
e.opt.xmlns&&(n.ns=t.ns),e.attribList.length=0,T(e,"onopentagstart",n)}function M(e,t){var n=e.indexOf(":")<0?["",e]:e.split(":"),r=n[0],s=n[1]
return t&&"xmlns"===e&&(r="xmlns",s=""),{prefix:r,local:s}}function j(e){if(e.strict||(e.attribName=e.attribName[e.looseCase]()),-1!==e.attribList.indexOf(e.attribName)||e.tag.attributes.hasOwnProperty(e.attribName))return e.attribName=e.attribValue="",void 0
if(e.opt.xmlns){var t=M(e.attribName,!0),n=t.prefix,r=t.local
if("xmlns"===n)if("xml"===r&&e.attribValue!==c)N(e,"xml: prefix must be bound to "+c+"\nActual: "+e.attribValue)
else if("xmlns"===r&&e.attribValue!==u)N(e,"xmlns: prefix must be bound to "+u+"\nActual: "+e.attribValue)
else{var s=e.tag,i=e.tags[e.tags.length-1]||e
s.ns===i.ns&&(s.ns=Object.create(i.ns)),s.ns[r]=e.attribValue}e.attribList.push([e.attribName,e.attribValue])}else e.tag.attributes[e.attribName]=e.attribValue,T(e,"onattribute",{name:e.attribName,value:e.attribValue})
e.attribName=e.attribValue=""}function I(e,t){if(e.opt.xmlns){var n=e.tag,r=M(e.tagName)
n.prefix=r.prefix,n.local=r.local,n.uri=n.ns[r.prefix]||"",n.prefix&&!n.uri&&(N(e,"Unbound namespace prefix: "+JSON.stringify(e.tagName)),n.uri=r.prefix)
var s=e.tags[e.tags.length-1]||e
n.ns&&s.ns!==n.ns&&Object.keys(n.ns).forEach(function(t){T(e,"onopennamespace",{prefix:t,uri:n.ns[t]})})
for(var i=0,o=e.attribList.length;i<o;i++){var a=e.attribList[i],l=a[0],c=a[1],u=M(l,!0),h=u.prefix,f=u.local,p=""===h?"":n.ns[h]||"",d={name:l,value:c,prefix:h,local:f,uri:p}
h&&"xmlns"!==h&&!p&&(N(e,"Unbound namespace prefix: "+JSON.stringify(h)),d.uri=h),e.tag.attributes[l]=d,T(e,"onattribute",d)}e.attribList.length=0}e.tag.isSelfClosing=!!t,e.sawRoot=!0,e.tags.push(e.tag),T(e,"onopentag",e.tag),t||(e.noscript||"script"!==e.tagName.toLowerCase()?e.state=C.TEXT:e.state=C.SCRIPT,e.tag=null,e.tagName=""),e.attribName=e.attribValue="",e.attribList.length=0}function R(e){if(!e.tagName)return N(e,"Weird empty close tag."),e.textNode+="</>",e.state=C.TEXT,void 0
if(e.script){if("script"!==e.tagName)return e.script+="</"+e.tagName+">",e.tagName="",e.state=C.SCRIPT,void 0
T(e,"onscript",e.script),e.script=""}var t=e.tags.length,n=e.tagName
e.strict||(n=n[e.looseCase]())
for(var r=n;t--&&e.tags[t].name!==r;)N(e,"Unexpected close tag")
if(t<0)return N(e,"Unmatched closing tag: "+e.tagName),e.textNode+="</"+e.tagName+">",e.state=C.TEXT,void 0
e.tagName=n
for(var s=e.tags.length;s-- >t;){var i=e.tag=e.tags.pop()
e.tagName=e.tag.name,T(e,"onclosetag",e.tagName)
var o={}
for(var a in i.ns)o[a]=i.ns[a]
var l=e.tags[e.tags.length-1]||e
e.opt.xmlns&&i.ns!==l.ns&&Object.keys(i.ns).forEach(function(t){var n=i.ns[t]
T(e,"onclosenamespace",{prefix:t,uri:n})})}0===t&&(e.closedRoot=!0),e.tagName=e.attribValue=e.attribName="",e.attribList.length=0,e.state=C.TEXT}function F(e){var t,n=e.entity,r=n.toLowerCase(),s=""
return e.ENTITIES[n]?e.ENTITIES[n]:e.ENTITIES[r]?e.ENTITIES[r]:("#"===(n=r).charAt(0)&&("x"===n.charAt(1)?(n=n.slice(2),s=(t=parseInt(n,16)).toString(16)):(n=n.slice(1),s=(t=parseInt(n,10)).toString(10))),n=n.replace(/^0+/,""),isNaN(t)||s.toLowerCase()!==n?(N(e,"Invalid character entity"),"&"+e.entity+";"):String.fromCodePoint(t))}function z(e,t){"<"===t?(e.state=C.OPEN_WAKA,e.startTagPosition=e.position):g(t)||(N(e,"Non-whitespace before first tag."),e.textNode=t,e.state=C.TEXT)}function G(e,t){var n=""
return t<e.length&&(n=e.charAt(t)),n}C=e.STATE,String.fromCodePoint||(S=String.fromCharCode,w=Math.floor,x=function(){var e,t,n=[],r=-1,s=arguments.length
if(!s)return""
for(var i="";++r<s;){var o=Number(arguments[r])
if(!isFinite(o)||o<0||o>0x10FFFF||w(o)!==o)throw RangeError("Invalid code point: "+o)
o<=0xFFFF?n.push(o):(e=0xD800+((o-=0x10000)>>10),t=o%0x400+0xDC00,n.push(e,t)),(r+1===s||n.length>16384)&&(i+=S.apply(null,n),n.length=0)}return i},Object.defineProperty?Object.defineProperty(String,"fromCodePoint",{value:x,configurable:!0,writable:!0}):String.fromCodePoint=x)}(PS)
var LS=ce(PS)
class NS extends Error{constructor(e,t,n,r,s){super(e),this.name="SvgoParserError",this.message=`${s||"<input>"}:${t}:${n}: ${e}`,this.reason=e,this.line=t,this.column=n,this.source=r,Error.captureStackTrace&&Error.captureStackTrace(this,NS)}toString(){const e=this.source.split(/\r?\n/),t=Math.max(this.line-3,0),n=Math.min(this.line+2,e.length),r=String(n).length,s=Math.max(this.column-54,0),i=Math.max(this.column+20,80),o=e.slice(t,n).map((e,n)=>{const o=e.slice(s,i)
let a="",l=""
0!==s&&(a=s>e.length-1?" ":"…"),i<e.length-1&&(l="…")
const c=t+1+n,u=` ${c.toString().padStart(r)} | `
if(c===this.line){const t=u.replace(/[^|]/g," ")
return`>${u}${a}${o}${l}\n ${t+(a+e.slice(s,this.column-1)).replace(/[^\t]/g," ")}^`}return` ${u}${a}${o}${l}`}).join("\n")
return`${this.name}: ${this.message}\n\n${o}\n`}}const DS=/<!ENTITY\s+(\S+)\s+(?:'([^']+)'|"([^"]+)")\s*>/g,MS={strict:!0,trim:!1,normalize:!1,lowercase:!0,xmlns:!0,position:!0,unparsedEntities:!0},jS=(e,t)=>{const n=LS.parser(MS.strict,MS),r={type:"root",children:[]}
let s=r
const i=[r],o=e=>{s.children.push(e)}
return n.ondoctype=t=>{o({type:"doctype",name:"svg",data:{doctype:t}})
const r=t.indexOf("[")
if(r>=0){DS.lastIndex=r
let t=DS.exec(e)
for(;null!=t;)n.ENTITIES[t[1]]=t[2]||t[3],t=DS.exec(e)}},n.onprocessinginstruction=e=>{const t={type:"instruction",name:e.name,value:e.body}
o(t)},n.oncomment=e=>{const t={type:"comment",value:e.trim()}
o(t)},n.oncdata=e=>{o({type:"cdata",value:e})},n.onopentag=e=>{const t={type:"element",name:e.name,attributes:{},children:[]}
for(const[n,r]of Object.entries(e.attributes))t.attributes[n]=r.value
o(t),s=t,i.push(t)},n.ontext=e=>{if("element"===s.type)if(Mt.has(s.name)){o({type:"text",value:e})}else{const t=e.trim()
if(""!==t){o({type:"text",value:t})}}},n.onclosetag=()=>{i.pop(),s=i[i.length-1]},n.onerror=r=>{const s=r.message.split("\n")[0],i=new NS(s,n.line+1,n.column,e,t)
if(-1===r.message.indexOf("Unexpected end"))throw i},n.write(e).close(),r},IS={doctypeStart:"<!DOCTYPE",doctypeEnd:">",procInstStart:"<?",procInstEnd:"?>",tagOpenStart:"<",tagOpenEnd:">",tagCloseStart:"</",tagCloseEnd:">",tagShortStart:"<",tagShortEnd:"/>",attrStart:'="',attrEnd:'"',commentStart:"\x3c!--",commentEnd:"--\x3e",cdataStart:"<![CDATA[",cdataEnd:"]]>",textStart:"",textEnd:"",indent:4,regEntities:/[&'"<>]/g,regValEntities:/[&"<>]/g,encodeEntity:e=>RS[e],pretty:!1,useShortTags:!0,eol:"lf",finalNewline:!1},RS={"&":"&amp;","'":"&apos;",'"':"&quot;",">":"&gt;","<":"&lt;"},FS=(e,t={})=>{const n={...IS,...t},r=n.indent
let s="    "
"number"==typeof r&&!1===Number.isNaN(r)?s=r<0?"\t":" ".repeat(r):"string"==typeof r&&(s=r)
const i={indent:s,textContext:null,indentLevel:0},o="crlf"===n.eol?"\r\n":"\n"
n.pretty&&(n.doctypeEnd+=o,n.procInstEnd+=o,n.commentEnd+=o,n.cdataEnd+=o,n.tagShortEnd+=o,n.tagOpenEnd+=o,n.tagCloseEnd+=o,n.textEnd+=o)
let a=zS(e,n,i)
return n.finalNewline&&a.length>0&&!a.endsWith("\n")&&(a+=o),a},zS=(e,t,n)=>{let r=""
n.indentLevel++
for(const s of e.children)switch(s.type){case"element":r+=VS(s,t,n)
break
case"text":r+=YS(s,t,n)
break
case"doctype":r+=BS(s,t)
break
case"instruction":r+=US(s,t)
break
case"comment":r+=qS(s,t)
break
case"cdata":r+=WS(s,t,n)}return n.indentLevel--,r},GS=(e,t)=>{let n=""
return e.pretty&&null==t.textContext&&(n=t.indent.repeat(t.indentLevel-1)),n},BS=(e,t)=>t.doctypeStart+e.data.doctype+t.doctypeEnd,US=(e,t)=>t.procInstStart+e.name+" "+e.value+t.procInstEnd,qS=(e,t)=>t.commentStart+e.value+t.commentEnd,WS=(e,t,n)=>GS(t,n)+t.cdataStart+e.value+t.cdataEnd,VS=(e,t,n)=>{if(0===e.children.length)return t.useShortTags?GS(t,n)+t.tagShortStart+e.name+$S(e,t)+t.tagShortEnd:GS(t,n)+t.tagShortStart+e.name+$S(e,t)+t.tagOpenEnd+t.tagCloseStart+e.name+t.tagCloseEnd
let r=t.tagOpenStart,s=t.tagOpenEnd,i=t.tagCloseStart,o=t.tagCloseEnd,a=GS(t,n),l=GS(t,n)
n.textContext?(r=IS.tagOpenStart,s=IS.tagOpenEnd,i=IS.tagCloseStart,o=IS.tagCloseEnd,a=""):Mt.has(e.name)&&(s=IS.tagOpenEnd,i=IS.tagCloseStart,l="",n.textContext=e)
const c=zS(e,t,n)
return n.textContext===e&&(n.textContext=null),a+r+e.name+$S(e,t)+s+c+l+i+e.name+o},$S=(e,t)=>{let n=""
for(const[r,s]of Object.entries(e.attributes))if(n+=" "+r,void 0!==s){const e=s.toString().replace(t.regValEntities,t.encodeEntity)
n+=t.attrStart+e+t.attrEnd}return n},YS=(e,t,n)=>GS(t,n)+t.textStart+e.value.replace(t.regEntities,t.encodeEntity)+(n.textContext?"":t.textEnd),VERSION="4.0.0-rc.5",XS=new Map
for(const e of OS)XS.set(e.name,e)
function HS(e){return"removeScriptElement"===e?(console.warn("Warning: removeScriptElement has been renamed to removeScripts, please update your SVGO config"),XS.get("removeScripts")):XS.get(e)}const QS=e=>{if("string"==typeof e){const t=HS(e)
if(null==t)throw Error(`Unknown builtin plugin "${e}" specified.`)
return{name:e,params:{},fn:t.fn}}if("object"==typeof e&&null!=e){if(null==e.name)throw Error("Plugin name must be specified")
let t=e.fn
if(null==t){const n=HS(e.name)
if(null==n)throw Error(`Unknown builtin plugin "${e.name}" specified.`)
t=n.fn}return{name:e.name,params:e.params,fn:t}}return null},KS=(e,t)=>{if(null==t&&(t={}),"object"!=typeof t)throw Error("Config should be an object")
const n=t.multipass?10:1
let r=Number.POSITIVE_INFINITY,s=""
const i={}
null!=t.path&&(i.path=t.path)
for(let o=0;o<n;o+=1){i.multipassCount=o
const n=jS(e,t.path),a=t.plugins||["preset-default"]
if(!Array.isArray(a))throw Error("malformed config, `plugins` property must be an array.\nSee more info here: https://github.com/svg/svgo#configuration")
const c=a.filter(e=>null!=e).map(QS)
c.length<a.length&&console.warn("Warning: plugins list includes null or undefined elements, these will be ignored.")
const u={}
if(null!=t.floatPrecision&&(u.floatPrecision=t.floatPrecision),l(n,i,c,null,u),s=FS(n,t.js2svg),!(s.length<r))break
e=s,r=s.length}return t.datauri&&(s=((e,t)=>{let n="data:image/svg+xml"
return t&&"base64"!==t?"enc"===t?e=n+","+encodeURIComponent(e):"unenc"===t&&(e=n+","+e):(n+=";base64,",e=n+Buffer.from(e).toString("base64")),e})(s,t.datauri)),{data:s}},ZS=async e=>{const t=n.resolve(e),r=(await import(i.pathToFileURL(t).toString())).default
if(null==r||"object"!=typeof r||Array.isArray(r))throw Error(`Invalid config file "${e}"`)
return r},JS=async e=>{try{return(await t.stat(e)).isFile()}catch{return!1}},loadConfig=async(e,t=process.cwd())=>{if(null!=e)return n.isAbsolute(e)?ZS(e):ZS(n.join(t,e))
let r=t
for(;;){const e=n.join(r,"svgo.config.js")
if(await JS(e))return ZS(e)
const t=n.join(r,"svgo.config.mjs")
if(await JS(t))return ZS(t)
const s=n.join(r,"svgo.config.cjs")
if(await JS(s))return ZS(s)
const i=n.dirname(r)
if(r===i)return null
r=i}},optimize=(t,n)=>{if(null==n&&(n={}),"object"!=typeof n)throw Error("Config should be an object")
return KS(t,{...n,js2svg:{eol:"\r\n"===e.EOL?"crlf":"lf",...n.js2svg}})}
export{VERSION,Xt as _collections,OS as builtinPlugins,loadConfig,pt as mapNodesToParents,optimize,_t as querySelector,At as querySelectorAll}
