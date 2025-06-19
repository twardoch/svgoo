import{createRequire as e}from"module"
import t from"string_decoder"
const n=Symbol(),r=(e,t,s)=>{const i=t[e.type]
if(i?.enter){if(i.enter(e,s)===n)return}if("root"===e.type)for(const n of e.children)r(n,t,e)
if("element"===e.type&&s.children.includes(e))for(const n of e.children)r(n,t,e)
i?.exit&&i.exit(e,s)},s=(e,t,n,s,i)=>{for(const o of n){const n=s?.[o.name]
if(!1===n)continue
const a={...o.params,...i,...n},l=o.fn(e,a,t)
null!=l&&r(e,l)}}
var i
!function(e){e.Root="root",e.Text="text",e.Directive="directive",e.Comment="comment",e.Script="script",e.Style="style",e.Tag="tag",e.CDATA="cdata",e.Doctype="doctype"}(i||(i={}))
const o=i.Root,a=i.Text,l=i.Directive,c=i.Comment,u=i.Script,h=i.Style,f=i.Tag,p=i.CDATA,d=i.Doctype
function m(e){return(t=e).type===i.Tag||t.type===i.Script||t.type===i.Style
var t}function g(e){return e.type===i.CDATA}function y(e){return e.type===i.Text}function b(e){return e.type===i.Comment}function k(e){return Object.prototype.hasOwnProperty.call(e,"children")}const v=/["&'<>$\x80-\uFFFF]/g,S=new Map([[34,"&quot;"],[38,"&amp;"],[39,"&apos;"],[60,"&lt;"],[62,"&gt;"]]),w=null!=String.prototype.codePointAt?(e,t)=>e.codePointAt(t):(e,t)=>0xd800==(0xfc00&e.charCodeAt(t))?0x400*(e.charCodeAt(t)-0xd800)+e.charCodeAt(t+1)-0xdc00+0x10000:e.charCodeAt(t)
function x(e){let t,n="",r=0
for(;null!==(t=v.exec(e));){const s=t.index,i=e.charCodeAt(s),o=S.get(i)
void 0!==o?(n+=e.substring(r,s)+o,r=s+1):(n+=`${e.substring(r,s)}&#x${w(e,s).toString(16)};`,r=v.lastIndex+=Number(0xd800==(0xfc00&i)))}return n+e.substr(r)}function C(e,t){return function(n){let r,s=0,i=""
for(;r=e.exec(n);)s!==r.index&&(i+=n.substring(s,r.index)),i+=t.get(r[0].charCodeAt(0)),s=r.index+1
return i+n.substring(s)}}const A=C(/["&\u00A0]/g,new Map([[34,"&quot;"],[38,"&amp;"],[160,"&nbsp;"]])),_=C(/[&<>\u00A0]/g,new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[160,"&nbsp;"]])),T=new Map(["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","textPath"].map(e=>[e.toLowerCase(),e])),E=new Map(["definitionURL","attributeName","attributeType","baseFrequency","baseProfile","calcMode","clipPathUnits","diffuseConstant","edgeMode","filterUnits","glyphRef","gradientTransform","gradientUnits","kernelMatrix","kernelUnitLength","keyPoints","keySplines","keyTimes","lengthAdjust","limitingConeAngle","markerHeight","markerUnits","markerWidth","maskContentUnits","maskUnits","numOctaves","pathLength","patternContentUnits","patternTransform","patternUnits","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","refX","refY","repeatCount","repeatDur","requiredExtensions","requiredFeatures","specularConstant","specularExponent","spreadMethod","startOffset","stdDeviation","stitchTiles","surfaceScale","systemLanguage","tableValues","targetX","targetY","textLength","viewBox","viewTarget","xChannelSelector","yChannelSelector","zoomAndPan"].map(e=>[e.toLowerCase(),e])),O=new Set(["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])
function P(e){return e.replace(/"/g,"&quot;")}const L=new Set(["area","base","basefont","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr"])
function N(e,t={}){const n="length"in e?e:[e]
let r=""
for(let e=0;e<n.length;e++)r+=D(n[e],t)
return r}function D(e,t){switch(e.type){case o:return N(e.children,t)
case d:case l:return`<${e.data}>`
case c:return function(e){return`\x3c!--${e.data}--\x3e`}(e)
case p:return function(e){return`<![CDATA[${e.children[0].data}]]>`}(e)
case u:case h:case f:return function(e,t){var n
"foreign"===t.xmlMode&&(e.name=null!==(n=T.get(e.name))&&void 0!==n?n:e.name,e.parent&&M.has(e.parent.name)&&(t={...t,xmlMode:!1}))
!t.xmlMode&&j.has(e.name)&&(t={...t,xmlMode:"foreign"})
let r=`<${e.name}`
const s=function(e,t){var n
if(!e)return
const r=!1===(null!==(n=t.encodeEntities)&&void 0!==n?n:t.decodeEntities)?P:t.xmlMode||"utf8"!==t.encodeEntities?x:A
return Object.keys(e).map(n=>{var s,i
const o=null!==(s=e[n])&&void 0!==s?s:""
return"foreign"===t.xmlMode&&(n=null!==(i=E.get(n))&&void 0!==i?i:n),t.emptyAttrs||t.xmlMode||""!==o?`${n}="${r(o)}"`:n}).join(" ")}(e.attribs,t)
s&&(r+=` ${s}`)
0===e.children.length&&(t.xmlMode?!1!==t.selfClosingTags:t.selfClosingTags&&L.has(e.name))?(t.xmlMode||(r+=" "),r+="/>"):(r+=">",e.children.length>0&&(r+=N(e.children,t)),!t.xmlMode&&L.has(e.name)||(r+=`</${e.name}>`))
return r}(e,t)
case a:return function(e,t){var n
let r=e.data||""
!1===(null!==(n=t.encodeEntities)&&void 0!==n?n:t.decodeEntities)||!t.xmlMode&&e.parent&&O.has(e.parent.name)||(r=t.xmlMode||"utf8"!==t.encodeEntities?x(r):_(r))
return r}(e,t)}}const M=new Set(["mi","mo","mn","ms","mtext","annotation-xml","foreignObject","desc","title"]),j=new Set(["svg","math"])
function I(e,t){return N(e,t)}function R(e){return Array.isArray(e)?e.map(R).join(""):k(e)&&!b(e)?R(e.children):y(e)?e.data:""}function F(e){return k(e)?e.children:[]}function z(e){return e.parent||null}function G(e){if(e.prev&&(e.prev.next=e.next),e.next&&(e.next.prev=e.prev),e.parent){const t=e.parent.children,n=t.lastIndexOf(e)
n>=0&&t.splice(n,1)}e.next=null,e.prev=null,e.parent=null}function B(e,t,n=!0,r=1/0){return U(e,Array.isArray(t)?t:[t],n,r)}function U(e,t,n,r){const s=[],i=[Array.isArray(t)?t:[t]],o=[0]
for(;;){if(o[0]>=i[0].length){if(1===o.length)return s
i.shift(),o.shift()
continue}const t=i[0][o[0]++]
if(e(t)&&(s.push(t),--r<=0))return s
n&&k(t)&&t.children.length>0&&(o.unshift(0),i.unshift(t.children))}}function q(e,t,n=!0){const r=Array.isArray(t)?t:[t]
for(let t=0;t<r.length;t++){const s=r[t]
if(m(s)&&e(s))return s
if(n&&k(s)&&s.children.length>0){const t=q(e,s.children,!0)
if(t)return t}}return null}const W={tag_name:e=>"function"==typeof e?t=>m(t)&&e(t.name):"*"===e?m:t=>m(t)&&t.name===e,tag_type:e=>"function"==typeof e?t=>e(t.type):t=>t.type===e,tag_contains:e=>"function"==typeof e?t=>y(t)&&e(t.data):t=>y(t)&&t.data===e}
function V(e,t){return"function"==typeof t?n=>m(n)&&t(n.attribs[e]):n=>m(n)&&n.attribs[e]===t}function $(e,t){return n=>e(n)||t(n)}function Y(e){const t=Object.keys(e).map(t=>{const n=e[t]
return Object.prototype.hasOwnProperty.call(W,t)?W[t](n):V(t,n)})
return 0===t.length?null:t.reduce($)}function X(e,t,n=!0,r=1/0){return B(W.tag_name(e),t,n,r)}var H
function Q(e,t){const n=[],r=[]
if(e===t)return 0
let s=k(e)?e:e.parent
for(;s;)n.unshift(s),s=s.parent
for(s=k(t)?t:t.parent;s;)r.unshift(s),s=s.parent
const i=Math.min(n.length,r.length)
let o=0
for(;o<i&&n[o]===r[o];)o++
if(0===o)return H.DISCONNECTED
const a=n[o-1],l=a.children,c=n[o],u=r[o]
return l.indexOf(c)>l.indexOf(u)?a===t?H.FOLLOWING|H.CONTAINED_BY:H.FOLLOWING:a===e?H.PRECEDING|H.CONTAINS:H.PRECEDING}!function(e){e[e.DISCONNECTED=1]="DISCONNECTED",e[e.PRECEDING=2]="PRECEDING",e[e.FOLLOWING=4]="FOLLOWING",e[e.CONTAINS=8]="CONTAINS",e[e.CONTAINED_BY=16]="CONTAINED_BY"}(H||(H={}))
const K=["url","type","lang"],Z=["fileSize","bitrate","framerate","samplingrate","channels","duration","height","width"]
function J(e){return X("media:content",e).map(e=>{const{attribs:t}=e,n={medium:t.medium,isDefault:!!t.isDefault}
for(const e of K)t[e]&&(n[e]=t[e])
for(const e of Z)t[e]&&(n[e]=parseInt(t[e],10))
return t.expression&&(n.expression=t.expression),n})}function ee(e,t){return X(e,t,!0,1)[0]}function te(e,t,n=!1){return R(X(e,t,n,1)).trim()}function ne(e,t,n,r,s=!1){const i=te(n,r,s)
i&&(e[t]=i)}function re(e){return"rss"===e||"feed"===e||"rdf:RDF"===e}var se=Object.freeze({__proto__:null,get DocumentPosition(){return H},append:function(e,t){G(t)
const{parent:n}=e,r=e.next
if(t.next=r,t.prev=e,e.next=t,t.parent=n,r){if(r.prev=t,n){const e=n.children
e.splice(e.lastIndexOf(r),0,t)}}else n&&n.children.push(t)},appendChild:function(e,t){if(G(t),t.next=null,t.parent=e,e.children.push(t)>1){const n=e.children[e.children.length-2]
n.next=t,t.prev=n}else t.prev=null},compareDocumentPosition:Q,existsOne:function e(t,n){return(Array.isArray(n)?n:[n]).some(n=>m(n)&&t(n)||k(n)&&e(t,n.children))},filter:B,find:U,findAll:function(e,t){const n=[],r=[Array.isArray(t)?t:[t]],s=[0]
for(;;){if(s[0]>=r[0].length){if(1===r.length)return n
r.shift(),s.shift()
continue}const t=r[0][s[0]++]
m(t)&&e(t)&&n.push(t),k(t)&&t.children.length>0&&(s.unshift(0),r.unshift(t.children))}},findOne:q,findOneChild:function(e,t){return t.find(e)},getAttributeValue:function(e,t){var n
return null===(n=e.attribs)||void 0===n?void 0:n[t]},getChildren:F,getElementById:function(e,t,n=!0){return Array.isArray(t)||(t=[t]),q(V("id",e),t,n)},getElements:function(e,t,n,r=1/0){const s=Y(e)
return s?B(s,t,n,r):[]},getElementsByClassName:function(e,t,n=!0,r=1/0){return B(V("class",e),t,n,r)},getElementsByTagName:X,getElementsByTagType:function(e,t,n=!0,r=1/0){return B(W.tag_type(e),t,n,r)},getFeed:function(e){const t=ee(re,e)
return t?"feed"===t.name?function(e){var t
const n=e.children,r={type:"atom",items:X("entry",n).map(e=>{var t
const{children:n}=e,r={media:J(n)}
ne(r,"id","id",n),ne(r,"title","title",n)
const s=null===(t=ee("link",n))||void 0===t?void 0:t.attribs.href
s&&(r.link=s)
const i=te("summary",n)||te("content",n)
i&&(r.description=i)
const o=te("updated",n)
return o&&(r.pubDate=new Date(o)),r})}
ne(r,"id","id",n),ne(r,"title","title",n)
const s=null===(t=ee("link",n))||void 0===t?void 0:t.attribs.href
s&&(r.link=s)
ne(r,"description","subtitle",n)
const i=te("updated",n)
i&&(r.updated=new Date(i))
return ne(r,"author","email",n,!0),r}(t):function(e){var t,n
const r=null!==(n=null===(t=ee("channel",e.children))||void 0===t?void 0:t.children)&&void 0!==n?n:[],s={type:e.name.substr(0,3),id:"",items:X("item",e.children).map(e=>{const{children:t}=e,n={media:J(t)}
ne(n,"id","guid",t),ne(n,"title","title",t),ne(n,"link","link",t),ne(n,"description","description",t)
const r=te("pubDate",t)||te("dc:date",t)
return r&&(n.pubDate=new Date(r)),n})}
ne(s,"title","title",r),ne(s,"link","link",r),ne(s,"description","description",r)
const i=te("lastBuildDate",r)
i&&(s.updated=new Date(i))
return ne(s,"author","managingEditor",r,!0),s}(t):null},getInnerHTML:function(e,t){return k(e)?e.children.map(e=>I(e,t)).join(""):""},getName:function(e){return e.name},getOuterHTML:I,getParent:z,getSiblings:function(e){const t=z(e)
if(null!=t)return F(t)
const n=[e]
let{prev:r,next:s}=e
for(;null!=r;)n.unshift(r),({prev:r}=r)
for(;null!=s;)n.push(s),({next:s}=s)
return n},getText:function e(t){return Array.isArray(t)?t.map(e).join(""):m(t)?"br"===t.name?"\n":e(t.children):g(t)?e(t.children):y(t)?t.data:""},hasAttrib:function(e,t){return null!=e.attribs&&Object.prototype.hasOwnProperty.call(e.attribs,t)&&null!=e.attribs[t]},hasChildren:k,innerText:function e(t){return Array.isArray(t)?t.map(e).join(""):k(t)&&(t.type===i.Tag||g(t))?e(t.children):y(t)?t.data:""},isCDATA:g,isComment:b,isDocument:function(e){return e.type===i.Root},isTag:m,isText:y,nextElementSibling:function(e){let{next:t}=e
for(;null!==t&&!m(t);)({next:t}=t)
return t},prepend:function(e,t){G(t)
const{parent:n}=e
if(n){const r=n.children
r.splice(r.indexOf(e),0,t)}e.prev&&(e.prev.next=t),t.parent=n,t.prev=e.prev,t.next=e,e.prev=t},prependChild:function(e,t){if(G(t),t.parent=e,t.prev=null,1!==e.children.unshift(t)){const n=e.children[1]
n.prev=t,t.next=n}else t.next=null},prevElementSibling:function(e){let{prev:t}=e
for(;null!==t&&!m(t);)({prev:t}=t)
return t},removeElement:G,removeSubsets:function(e){let t=e.length
for(;--t>=0;){const n=e[t]
if(t>0&&e.lastIndexOf(n,t-1)>=0)e.splice(t,1)
else for(let r=n.parent;r;r=r.parent)if(e.includes(r)){e.splice(t,1)
break}}return e},replaceElement:function(e,t){const n=t.prev=e.prev
n&&(n.next=t)
const r=t.next=e.next
r&&(r.prev=t)
const s=t.parent=e.parent
if(s){const n=s.children
n[n.lastIndexOf(e)]=t,e.parent=null}},testElement:function(e,t){const n=Y(e)
return!n||n(t)},textContent:R,uniqueSort:function(e){return e=e.filter((e,t,n)=>!n.includes(e,t+1)),e.sort((e,t)=>{const n=Q(e,t)
return n&H.PRECEDING?-1:n&H.FOLLOWING?1:0}),e}})
function ie(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var oe,ae,le=ie({trueFunc:function(){return!0},falseFunc:function(){return!1}})
!function(e){e.Attribute="attribute",e.Pseudo="pseudo",e.PseudoElement="pseudo-element",e.Tag="tag",e.Universal="universal",e.Adjacent="adjacent",e.Child="child",e.Descendant="descendant",e.Parent="parent",e.Sibling="sibling",e.ColumnCombinator="column-combinator"}(oe||(oe={})),function(e){e.Any="any",e.Element="element",e.End="end",e.Equals="equals",e.Exists="exists",e.Hyphen="hyphen",e.Not="not",e.Start="start"}(ae||(ae={}))
const ce=/^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,ue=/\\([\da-f]{1,6}\s?|(\s)|.)/gi,he=new Map([[126,ae.Element],[94,ae.Start],[36,ae.End],[42,ae.Any],[33,ae.Not],[124,ae.Hyphen]]),fe=new Set(["has","not","matches","is","where","host","host-context"])
function pe(e){switch(e.type){case oe.Adjacent:case oe.Child:case oe.Descendant:case oe.Parent:case oe.Sibling:case oe.ColumnCombinator:return!0
default:return!1}}const de=new Set(["contains","icontains"])
function me(e,t,n){const r=parseInt(t,16)-0x10000
return r!=r||n?t:r<0?String.fromCharCode(r+0x10000):String.fromCharCode(r>>10|0xd800,0x3ff&r|0xdc00)}function ge(e){return e.replace(ue,me)}function ye(e){return 39===e||34===e}function be(e){return 32===e||9===e||10===e||12===e||13===e}function ke(e){const t=[],n=ve(t,`${e}`,0)
if(n<e.length)throw new Error(`Unmatched selector: ${e.slice(n)}`)
return t}function ve(e,t,n){let r=[]
function s(e){const r=t.slice(n+e).match(ce)
if(!r)throw new Error(`Expected name, found ${t.slice(n)}`)
const[s]=r
return n+=e+s.length,ge(s)}function i(e){for(n+=e;n<t.length&&be(t.charCodeAt(n));)n++}function o(){const e=n+=1
let r=1
for(;r>0&&n<t.length;n++)40!==t.charCodeAt(n)||a(n)?41!==t.charCodeAt(n)||a(n)||r--:r++
if(r)throw new Error("Parenthesis not matched")
return ge(t.slice(e,n-1))}function a(e){let n=0
for(;92===t.charCodeAt(--e);)n++
return!(1&~n)}function l(){if(r.length>0&&pe(r[r.length-1]))throw new Error("Did not expect successive traversals.")}function c(e){if(r.length>0&&r[r.length-1].type===oe.Descendant)return r[r.length-1].type=e,void 0
l(),r.push({type:e})}function u(e,t){r.push({type:oe.Attribute,name:e,action:t,value:s(1),namespace:null,ignoreCase:"quirks"})}function h(){if(r.length&&r[r.length-1].type===oe.Descendant&&r.pop(),0===r.length)throw new Error("Empty sub-selector")
e.push(r)}if(i(0),t.length===n)return n
e:for(;n<t.length;){const e=t.charCodeAt(n)
switch(e){case 32:case 9:case 10:case 12:case 13:0!==r.length&&r[0].type===oe.Descendant||(l(),r.push({type:oe.Descendant})),i(1)
break
case 62:c(oe.Child),i(1)
break
case 60:c(oe.Parent),i(1)
break
case 126:c(oe.Sibling),i(1)
break
case 43:c(oe.Adjacent),i(1)
break
case 46:u("class",ae.Element)
break
case 35:u("id",ae.Equals)
break
case 91:{let e
i(1)
let o=null
124===t.charCodeAt(n)?e=s(1):t.startsWith("*|",n)?(o="*",e=s(2)):(e=s(0),124===t.charCodeAt(n)&&61!==t.charCodeAt(n+1)&&(o=e,e=s(1))),i(0)
let l=ae.Exists
const c=he.get(t.charCodeAt(n))
if(c){if(l=c,61!==t.charCodeAt(n+1))throw new Error("Expected `=`")
i(2)}else 61===t.charCodeAt(n)&&(l=ae.Equals,i(1))
let u="",h=null
if("exists"!==l){if(ye(t.charCodeAt(n))){const e=t.charCodeAt(n)
let r=n+1
for(;r<t.length&&(t.charCodeAt(r)!==e||a(r));)r+=1
if(t.charCodeAt(r)!==e)throw new Error("Attribute value didn't end")
u=ge(t.slice(n+1,r)),n=r+1}else{const e=n
for(;n<t.length&&(!be(t.charCodeAt(n))&&93!==t.charCodeAt(n)||a(n));)n+=1
u=ge(t.slice(e,n))}i(0)
const e=0x20|t.charCodeAt(n)
115===e?(h=!1,i(1)):105===e&&(h=!0,i(1))}if(93!==t.charCodeAt(n))throw new Error("Attribute selector didn't terminate")
n+=1
const f={type:oe.Attribute,name:e,action:l,value:u,namespace:o,ignoreCase:h}
r.push(f)
break}case 58:{if(58===t.charCodeAt(n+1)){r.push({type:oe.PseudoElement,name:s(2).toLowerCase(),data:40===t.charCodeAt(n)?o():null})
continue}const e=s(1).toLowerCase()
let i=null
if(40===t.charCodeAt(n))if(fe.has(e)){if(ye(t.charCodeAt(n+1)))throw new Error(`Pseudo-selector ${e} cannot be quoted`)
if(i=[],n=ve(i,t,n+1),41!==t.charCodeAt(n))throw new Error(`Missing closing parenthesis in :${e} (${t})`)
n+=1}else{if(i=o(),de.has(e)){const e=i.charCodeAt(0)
e===i.charCodeAt(i.length-1)&&ye(e)&&(i=i.slice(1,-1))}i=ge(i)}r.push({type:oe.Pseudo,name:e,data:i})
break}case 44:h(),r=[],i(1)
break
default:{if(t.startsWith("/*",n)){const e=t.indexOf("*/",n+2)
if(e<0)throw new Error("Comment was not terminated")
n=e+2,0===r.length&&i(0)
break}let o,a=null
if(42===e)n+=1,o="*"
else if(124===e){if(o="",124===t.charCodeAt(n+1)){c(oe.ColumnCombinator),i(2)
break}}else{if(!ce.test(t.slice(n)))break e
o=s(0)}124===t.charCodeAt(n)&&124!==t.charCodeAt(n+1)&&(a=o,42===t.charCodeAt(n+1)?(o="*",n+=2):o=s(1)),r.push("*"===o?{type:oe.Universal,namespace:a}:{type:oe.Tag,name:o,namespace:a})}}}return h(),n}const Se=new Map([[oe.Universal,50],[oe.Tag,30],[oe.Attribute,1],[oe.Pseudo,0]])
function we(e){return!Se.has(e.type)}const xe=new Map([[ae.Exists,10],[ae.Equals,8],[ae.Not,7],[ae.Start,6],[ae.End,6],[ae.Any,5]])
function Ce(e){const t=e.map(Ae)
for(let n=1;n<e.length;n++){const r=t[n]
if(!(r<0))for(let s=n-1;s>=0&&r<t[s];s--){const n=e[s+1]
e[s+1]=e[s],e[s]=n,t[s+1]=t[s],t[s]=r}}}function Ae(e){var t,n
let r=null!==(t=Se.get(e.type))&&void 0!==t?t:-1
return e.type===oe.Attribute?(r=null!==(n=xe.get(e.action))&&void 0!==n?n:4,e.action===ae.Equals&&"id"===e.name&&(r=9),e.ignoreCase&&(r>>=1)):e.type===oe.Pseudo&&(e.data?"has"===e.name||"contains"===e.name?r=0:Array.isArray(e.data)?(r=Math.min(...e.data.map(e=>Math.min(...e.map(Ae)))),r<0&&(r=0)):r=2:r=3),r}const _e=/[-[\]{}()*+?.,\\^$|#\s]/g
function Te(e){return e.replace(_e,"\\$&")}const Ee=new Set(["accept","accept-charset","align","alink","axis","bgcolor","charset","checked","clear","codetype","color","compact","declare","defer","dir","direction","disabled","enctype","face","frame","hreflang","http-equiv","lang","language","link","media","method","multiple","nohref","noresize","noshade","nowrap","readonly","rel","rev","rules","scope","scrolling","selected","shape","target","text","type","valign","valuetype","vlink"])
function Oe(e,t){return"boolean"==typeof e.ignoreCase?e.ignoreCase:"quirks"===e.ignoreCase?!!t.quirksMode:!t.xmlMode&&Ee.has(e.name)}const Pe={equals(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
return Oe(t,n)?(i=i.toLowerCase(),t=>{const n=r.getAttributeValue(t,s)
return null!=n&&n.length===i.length&&n.toLowerCase()===i&&e(t)}):t=>r.getAttributeValue(t,s)===i&&e(t)},hyphen(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
const o=i.length
return Oe(t,n)?(i=i.toLowerCase(),function(t){const n=r.getAttributeValue(t,s)
return null!=n&&(n.length===o||"-"===n.charAt(o))&&n.substr(0,o).toLowerCase()===i&&e(t)}):function(t){const n=r.getAttributeValue(t,s)
return null!=n&&(n.length===o||"-"===n.charAt(o))&&n.substr(0,o)===i&&e(t)}},element(e,t,n){const{adapter:r}=n,{name:s,value:i}=t
if(/\s/.test(i))return le.falseFunc
const o=new RegExp(`(?:^|\\s)${Te(i)}(?:$|\\s)`,Oe(t,n)?"i":"")
return function(t){const n=r.getAttributeValue(t,s)
return null!=n&&n.length>=i.length&&o.test(n)&&e(t)}},exists:(e,{name:t},{adapter:n})=>r=>n.hasAttrib(r,t)&&e(r),start(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
const o=i.length
return 0===o?le.falseFunc:Oe(t,n)?(i=i.toLowerCase(),t=>{const n=r.getAttributeValue(t,s)
return null!=n&&n.length>=o&&n.substr(0,o).toLowerCase()===i&&e(t)}):t=>{var n
return!!(null===(n=r.getAttributeValue(t,s))||void 0===n?void 0:n.startsWith(i))&&e(t)}},end(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
const o=-i.length
return 0===o?le.falseFunc:Oe(t,n)?(i=i.toLowerCase(),t=>{var n
return(null===(n=r.getAttributeValue(t,s))||void 0===n?void 0:n.substr(o).toLowerCase())===i&&e(t)}):t=>{var n
return!!(null===(n=r.getAttributeValue(t,s))||void 0===n?void 0:n.endsWith(i))&&e(t)}},any(e,t,n){const{adapter:r}=n,{name:s,value:i}=t
if(""===i)return le.falseFunc
if(Oe(t,n)){const t=new RegExp(Te(i),"i")
return function(n){const o=r.getAttributeValue(n,s)
return null!=o&&o.length>=i.length&&t.test(o)&&e(n)}}return t=>{var n
return!!(null===(n=r.getAttributeValue(t,s))||void 0===n?void 0:n.includes(i))&&e(t)}},not(e,t,n){const{adapter:r}=n,{name:s}=t
let{value:i}=t
return""===i?t=>!!r.getAttributeValue(t,s)&&e(t):Oe(t,n)?(i=i.toLowerCase(),t=>{const n=r.getAttributeValue(t,s)
return(null==n||n.length!==i.length||n.toLowerCase()!==i)&&e(t)}):t=>r.getAttributeValue(t,s)!==i&&e(t)}},Le=new Set([9,10,12,13,32]),Ne="0".charCodeAt(0),De="9".charCodeAt(0)
function Me(e){return function(e){const t=e[0],n=e[1]-1
if(n<0&&t<=0)return le.falseFunc
if(-1===t)return e=>e<=n
if(0===t)return e=>e===n
if(1===t)return n<0?le.trueFunc:e=>e>=n
const r=Math.abs(t),s=(n%r+r)%r
return t>1?e=>e>=n&&e%r===s:e=>e<=n&&e%r===s}(function(e){if("even"===(e=e.trim().toLowerCase()))return[2,0]
if("odd"===e)return[2,1]
let t=0,n=0,r=i(),s=o()
if(t<e.length&&"n"===e.charAt(t)&&(t++,n=r*(null!=s?s:1),a(),t<e.length?(r=i(),a(),s=o()):r=s=0),null===s||t<e.length)throw new Error(`n-th rule couldn't be parsed ('${e}')`)
return[n,r*s]
function i(){return"-"===e.charAt(t)?(t++,-1):("+"===e.charAt(t)&&t++,1)}function o(){const n=t
let r=0
for(;t<e.length&&e.charCodeAt(t)>=Ne&&e.charCodeAt(t)<=De;)r=10*r+(e.charCodeAt(t)-Ne),t++
return t===n?null:r}function a(){for(;t<e.length&&Le.has(e.charCodeAt(t));)t++}}(e))}function je(e,t){return n=>{const r=t.getParent(n)
return null!=r&&t.isTag(r)&&e(n)}}const Ie={contains:(e,t,{adapter:n})=>function(r){return e(r)&&n.getText(r).includes(t)},icontains(e,t,{adapter:n}){const r=t.toLowerCase()
return function(t){return e(t)&&n.getText(t).toLowerCase().includes(r)}},"nth-child"(e,t,{adapter:n,equals:r}){const s=Me(t)
return s===le.falseFunc?le.falseFunc:s===le.trueFunc?je(e,n):function(t){const i=n.getSiblings(t)
let o=0
for(let e=0;e<i.length&&!r(t,i[e]);e++)n.isTag(i[e])&&o++
return s(o)&&e(t)}},"nth-last-child"(e,t,{adapter:n,equals:r}){const s=Me(t)
return s===le.falseFunc?le.falseFunc:s===le.trueFunc?je(e,n):function(t){const i=n.getSiblings(t)
let o=0
for(let e=i.length-1;e>=0&&!r(t,i[e]);e--)n.isTag(i[e])&&o++
return s(o)&&e(t)}},"nth-of-type"(e,t,{adapter:n,equals:r}){const s=Me(t)
return s===le.falseFunc?le.falseFunc:s===le.trueFunc?je(e,n):function(t){const i=n.getSiblings(t)
let o=0
for(let e=0;e<i.length;e++){const s=i[e]
if(r(t,s))break
n.isTag(s)&&n.getName(s)===n.getName(t)&&o++}return s(o)&&e(t)}},"nth-last-of-type"(e,t,{adapter:n,equals:r}){const s=Me(t)
return s===le.falseFunc?le.falseFunc:s===le.trueFunc?je(e,n):function(t){const i=n.getSiblings(t)
let o=0
for(let e=i.length-1;e>=0;e--){const s=i[e]
if(r(t,s))break
n.isTag(s)&&n.getName(s)===n.getName(t)&&o++}return s(o)&&e(t)}},root:(e,t,{adapter:n})=>t=>{const r=n.getParent(t)
return(null==r||!n.isTag(r))&&e(t)},scope(e,t,n,r){const{equals:s}=n
return r&&0!==r.length?1===r.length?t=>s(r[0],t)&&e(t):t=>r.includes(t)&&e(t):Ie.root(e,t,n)},hover:Re("isHovered"),visited:Re("isVisited"),active:Re("isActive")}
function Re(e){return function(t,n,{adapter:r}){const s=r[e]
return"function"!=typeof s?le.falseFunc:function(e){return s(e)&&t(e)}}}const Fe={empty:(e,{adapter:t})=>!t.getChildren(e).some(e=>t.isTag(e)||""!==t.getText(e)),"first-child"(e,{adapter:t,equals:n}){if(t.prevElementSibling)return null==t.prevElementSibling(e)
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
function ze(e,t,n,r){if(null===n){if(e.length>r)throw new Error(`Pseudo-class :${t} requires an argument`)}else if(e.length===r)throw new Error(`Pseudo-class :${t} doesn't have any arguments`)}const Ge={"any-link":":is(a, area, link)[href]",link:":any-link:not(:visited)",disabled:":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",enabled:":not(:disabled)",checked:":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",required:":is(input, select, textarea)[required]",optional:":is(input, select, textarea):not([required])",selected:"option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",checkbox:"[type=checkbox]",file:"[type=file]",password:"[type=password]",radio:"[type=radio]",reset:"[type=reset]",image:"[type=image]",submit:"[type=submit]",parent:":not(:empty)",header:":is(h1, h2, h3, h4, h5, h6)",button:":is(button, input[type=button])",input:":is(input, textarea, select, button)",text:"input:is(:not([type!='']), [type=text])"},Be={}
function Ue(e,t){return e===le.falseFunc?le.falseFunc:n=>t.isTag(n)&&e(n)}function qe(e,t){const n=t.getSiblings(e)
if(n.length<=1)return[]
const r=n.indexOf(e)
return r<0||r===n.length-1?[]:n.slice(r+1).filter(t.isTag)}function We(e){return{xmlMode:!!e.xmlMode,lowerCaseAttributeNames:!!e.lowerCaseAttributeNames,lowerCaseTags:!!e.lowerCaseTags,quirksMode:!!e.quirksMode,cacheResults:!!e.cacheResults,pseudos:e.pseudos,adapter:e.adapter,equals:e.equals}}const Ve=(e,t,n,r,s)=>{const i=s(t,We(n),r)
return i===le.trueFunc?e:i===le.falseFunc?le.falseFunc:t=>i(t)&&e(t)},$e={is:Ve,matches:Ve,where:Ve,not(e,t,n,r,s){const i=s(t,We(n),r)
return i===le.falseFunc?e:i===le.trueFunc?le.falseFunc:t=>!i(t)&&e(t)},has(e,t,n,r,s){const{adapter:i}=n,o=We(n)
o.relativeSelector=!0
const a=t.some(e=>e.some(we))?[Be]:void 0,l=s(t,o,a)
if(l===le.falseFunc)return le.falseFunc
const c=Ue(l,i)
if(a&&l!==le.trueFunc){const{shouldTestNextSiblings:t=!1}=l
return n=>{if(!e(n))return!1
a[0]=n
const r=i.getChildren(n),s=t?[...r,...qe(n,i)]:r
return i.existsOne(c,s)}}return t=>e(t)&&i.existsOne(c,i.getChildren(t))}}
function Ye(e,t){const n=t.getParent(e)
return n&&t.isTag(n)?n:null}function Xe(e,t,n,r,s){const{adapter:i,equals:o}=n
switch(t.type){case oe.PseudoElement:throw new Error("Pseudo-elements are not supported by css-select")
case oe.ColumnCombinator:throw new Error("Column combinators are not yet supported by css-select")
case oe.Attribute:if(null!=t.namespace)throw new Error("Namespaced attributes are not yet supported by css-select")
return n.xmlMode&&!n.lowerCaseAttributeNames||(t.name=t.name.toLowerCase()),Pe[t.action](e,t,n)
case oe.Pseudo:return function(e,t,n,r,s){var i
const{name:o,data:a}=t
if(Array.isArray(a)){if(!(o in $e))throw new Error(`Unknown pseudo-class :${o}(${a})`)
return $e[o](e,a,n,r,s)}const l=null===(i=n.pseudos)||void 0===i?void 0:i[o],c="string"==typeof l?l:Ge[o]
if("string"==typeof c){if(null!=a)throw new Error(`Pseudo ${o} doesn't have any arguments`)
const t=ke(c)
return $e.is(e,t,n,r,s)}if("function"==typeof l)return ze(l,o,a,1),t=>l(t,a)&&e(t)
if(o in Ie)return Ie[o](e,a,n,r)
if(o in Fe){const t=Fe[o]
return ze(t,o,a,2),r=>t(r,n,a)&&e(r)}throw new Error(`Unknown pseudo-class :${o}`)}(e,t,n,r,s)
case oe.Tag:{if(null!=t.namespace)throw new Error("Namespaced tag names are not yet supported by css-select")
let{name:r}=t
return n.xmlMode&&!n.lowerCaseTags||(r=r.toLowerCase()),function(t){return i.getName(t)===r&&e(t)}}case oe.Descendant:{if(!1===n.cacheResults||"undefined"==typeof WeakSet)return function(t){let n=t
for(;n=Ye(n,i);)if(e(n))return!0
return!1}
const t=new WeakSet
return function(n){let r=n
for(;r=Ye(r,i);)if(!t.has(r)){if(i.isTag(r)&&e(r))return!0
t.add(r)}return!1}}case"_flexibleDescendant":return function(t){let n=t
do{if(e(n))return!0}while(n=Ye(n,i))
return!1}
case oe.Parent:return function(t){return i.getChildren(t).some(t=>i.isTag(t)&&e(t))}
case oe.Child:return function(t){const n=i.getParent(t)
return null!=n&&i.isTag(n)&&e(n)}
case oe.Sibling:return function(t){const n=i.getSiblings(t)
for(let r=0;r<n.length;r++){const s=n[r]
if(o(t,s))break
if(i.isTag(s)&&e(s))return!0}return!1}
case oe.Adjacent:return i.prevElementSibling?function(t){const n=i.prevElementSibling(t)
return null!=n&&e(n)}:function(t){const n=i.getSiblings(t)
let r
for(let e=0;e<n.length;e++){const s=n[e]
if(o(t,s))break
i.isTag(s)&&(r=s)}return!!r&&e(r)}
case oe.Universal:if(null!=t.namespace&&"*"!==t.namespace)throw new Error("Namespaced universal selectors are not yet supported by css-select")
return e}}function He(e,t,n){return et("string"==typeof e?ke(e):e,t,n)}function Qe(e){return e.type===oe.Pseudo&&("scope"===e.name||Array.isArray(e.data)&&e.data.some(e=>e.some(Qe)))}const Ke={type:oe.Descendant},Ze={type:"_flexibleDescendant"},Je={type:oe.Pseudo,name:"scope",data:null}
function et(e,t,n){var r
e.forEach(Ce),n=null!==(r=t.context)&&void 0!==r?r:n
const s=Array.isArray(n),i=n&&(Array.isArray(n)?n:[n])
if(!1!==t.relativeSelector)!function(e,{adapter:t},n){const r=!!(null==n?void 0:n.every(e=>{const n=t.isTag(e)&&t.getParent(e)
return e===Be||n&&t.isTag(n)}))
for(const t of e){if(t.length>0&&we(t[0])&&t[0].type!==oe.Descendant);else{if(!r||t.some(Qe))continue
t.unshift(Ke)}t.unshift(Je)}}(e,t,i)
else if(e.some(e=>e.length>0&&we(e[0])))throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled")
let o=!1
const a=e.map(e=>{if(e.length>=2){const[t,n]=e
t.type!==oe.Pseudo||"scope"!==t.name||(s&&n.type===oe.Descendant?e[1]=Ze:n.type!==oe.Adjacent&&n.type!==oe.Sibling||(o=!0))}return function(e,t,n){var r
return e.reduce((e,r)=>e===le.falseFunc?le.falseFunc:Xe(e,r,t,n,et),null!==(r=t.rootFunc)&&void 0!==r?r:le.trueFunc)}(e,t,i)}).reduce(tt,le.falseFunc)
return a.shouldTestNextSiblings=o,a}function tt(e,t){return t===le.falseFunc||e===le.trueFunc?e:e===le.falseFunc||t===le.trueFunc?t:function(n){return e(n)||t(n)}}const nt=(e,t)=>e===t,rt={adapter:se,equals:nt}
function st(e){var t,n,r,s
const i=null!=e?e:rt
return null!==(t=i.adapter)&&void 0!==t?t:i.adapter=se,null!==(n=i.equals)&&void 0!==n||(i.equals=null!==(s=null===(r=i.adapter)||void 0===r?void 0:r.equals)&&void 0!==s?s:nt),i}function it(e){return function(t,n,r){const s=st(r)
"function"!=typeof t&&(t=He(t,s,n))
const i=function(e,t,n=!1){n&&(e=function(e,t){const n=Array.isArray(e)?e.slice(0):[e],r=n.length
for(let e=0;e<r;e++){const r=qe(n[e],t)
n.push(...r)}return n}(e,t))
return Array.isArray(e)?t.removeSubsets(e):t.getChildren(e)}(n,s.adapter,t.shouldTestNextSiblings)
return e(t,i,s)}}const ot=it((e,t,n)=>e!==le.falseFunc&&t&&0!==t.length?n.adapter.findAll(e,t):[]),at=it((e,t,n)=>e!==le.falseFunc&&t&&0!==t.length?n.adapter.findOne(e,t):null)
function lt(e,t,n){const r=st(n)
return("function"==typeof t?t:function(e,t,n){return Ue(He(e,t,n),t.adapter)}(t,r))(e)}function ct(e){const t=new Map
for(const n of e.children)t.set(n,e),r(n,{element:{enter:(e,n)=>{t.set(e,n)}}},e)
return t}const ut=e=>"element"===e.type,ht=(e,t)=>t.some(t=>ut(t)&&(e(t)||ht(e,pt(t)))),ft=(e,t)=>e.attributes[t],pt=e=>e.children||[],dt=e=>e.name,mt=e=>"text"===e.children[0].type||"cdata"===e.children[0].type?e.children[0].value:"",gt=(e,t)=>void 0!==e.attributes[t],yt=(e,t)=>{const n=[]
for(const r of t)ut(r)&&(e(r)&&n.push(r),n.push(...yt(e,pt(r))))
return n},bt=(e,t)=>{for(const n of t)if(ut(n)){if(e(n))return n
const t=bt(e,pt(n))
if(t)return t}return null}
function kt(e,t){const n=n=>(t||(t=ct(e)),t.get(n)||null)
return{isTag:ut,existsOne:ht,getAttributeValue:ft,getChildren:pt,getName:dt,getParent:n,getSiblings:e=>{const t=n(e)
return t?pt(t):[]},getText:mt,hasAttrib:gt,removeSubsets:e=>{let t,r,s,i=e.length
for(;--i>-1;){for(t=r=e[i],e[i]=null,s=!0;r;){if(e.includes(r)){s=!1,e.splice(i,1)
break}r=n(r)}s&&(e[i]=t)}return e},findAll:yt,findOne:bt}}function vt(e,t){return{xmlMode:!0,adapter:kt(e,t)}}const St=(e,t,n)=>ot(t,e,vt(e,n)),wt=(e,t,n)=>at(t,e,vt(e,n)),xt=(e,t,n)=>lt(e,t,vt(e,n)),Ct=(e,t)=>{t.children=t.children.filter(t=>t!==e)}
var At=Object.freeze({__proto__:null,description:"removes doctype declaration",fn:()=>({doctype:{enter:(e,t)=>{Ct(e,t)}}}),name:"removeDoctype"})
var _t=Object.freeze({__proto__:null,description:"removes XML processing instructions",fn:()=>({instruction:{enter:(e,t)=>{"xml"===e.name&&Ct(e,t)}}}),name:"removeXMLProcInst"})
const Tt=[/^!/]
var Et=Object.freeze({__proto__:null,description:"removes comments",fn:(e,t)=>{const{preservePatterns:n=Tt}=t
return{comment:{enter:(e,t)=>{if(n){if(!Array.isArray(n))throw Error(`Expected array in removeComments preservePatterns parameter but received ${n}`)
if(n.some(t=>new RegExp(t).test(e.value)))return}Ct(e,t)}}}},name:"removeComments"})
const Ot={animation:new Set(["animate","animateColor","animateMotion","animateTransform","set"]),descriptive:new Set(["desc","metadata","title"]),shape:new Set(["circle","ellipse","line","path","polygon","polyline","rect"]),structural:new Set(["defs","g","svg","symbol","use"]),paintServer:new Set(["hatch","linearGradient","meshGradient","pattern","radialGradient","solidColor"]),nonRendering:new Set(["clipPath","filter","linearGradient","marker","mask","pattern","radialGradient","solidColor","symbol"]),container:new Set(["a","defs","foreignObject","g","marker","mask","missing-glyph","pattern","svg","switch","symbol"]),textContent:new Set(["a","altGlyph","altGlyphDef","altGlyphItem","glyph","glyphRef","text","textPath","tref","tspan"]),textContentChild:new Set(["altGlyph","textPath","tref","tspan"]),lightSource:new Set(["feDiffuseLighting","feDistantLight","fePointLight","feSpecularLighting","feSpotLight"]),filterPrimitive:new Set(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","feSpecularLighting","feTile","feTurbulence"])},Pt=new Set([...Ot.textContent,"pre","title"]),Lt=new Set(["glyph","missing-glyph","path"]),Nt={animationAddition:new Set(["additive","accumulate"]),animationAttributeTarget:new Set(["attributeType","attributeName"]),animationEvent:new Set(["onbegin","onend","onrepeat","onload"]),animationTiming:new Set(["begin","dur","end","fill","max","min","repeatCount","repeatDur","restart"]),animationValue:new Set(["by","calcMode","from","keySplines","keyTimes","to","values"]),conditionalProcessing:new Set(["requiredExtensions","requiredFeatures","systemLanguage"]),core:new Set(["id","tabindex","xml:base","xml:lang","xml:space"]),graphicalEvent:new Set(["onactivate","onclick","onfocusin","onfocusout","onload","onmousedown","onmousemove","onmouseout","onmouseover","onmouseup"]),presentation:new Set(["alignment-baseline","baseline-shift","clip-path","clip-rule","clip","color-interpolation-filters","color-interpolation","color-profile","color-rendering","color","cursor","direction","display","dominant-baseline","enable-background","fill-opacity","fill-rule","fill","filter","flood-color","flood-opacity","font-family","font-size-adjust","font-size","font-stretch","font-style","font-variant","font-weight","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","letter-spacing","lighting-color","marker-end","marker-mid","marker-start","mask","opacity","overflow","paint-order","pointer-events","shape-rendering","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","stroke","text-anchor","text-decoration","text-overflow","text-rendering","transform-origin","transform","unicode-bidi","vector-effect","visibility","word-spacing","writing-mode"]),xlink:new Set(["xlink:actuate","xlink:arcrole","xlink:href","xlink:role","xlink:show","xlink:title","xlink:type"]),documentEvent:new Set(["onabort","onerror","onresize","onscroll","onunload","onzoom"]),documentElementEvent:new Set(["oncopy","oncut","onpaste"]),globalEvent:new Set(["oncancel","oncanplay","oncanplaythrough","onchange","onclick","onclose","oncuechange","ondblclick","ondrag","ondragend","ondragenter","ondragleave","ondragover","ondragstart","ondrop","ondurationchange","onemptied","onended","onerror","onfocus","oninput","oninvalid","onkeydown","onkeypress","onkeyup","onload","onloadeddata","onloadedmetadata","onloadstart","onmousedown","onmouseenter","onmouseleave","onmousemove","onmouseout","onmouseover","onmouseup","onmousewheel","onpause","onplay","onplaying","onprogress","onratechange","onreset","onresize","onscroll","onseeked","onseeking","onselect","onshow","onstalled","onsubmit","onsuspend","ontimeupdate","ontoggle","onvolumechange","onwaiting"]),filterPrimitive:new Set(["x","y","width","height","result"]),transferFunction:new Set(["amplitude","exponent","intercept","offset","slope","tableValues","type"])},Dt={core:{"xml:space":"default"},presentation:{clip:"auto","clip-path":"none","clip-rule":"nonzero",mask:"none",opacity:"1","stop-color":"#000","stop-opacity":"1","fill-opacity":"1","fill-rule":"nonzero",fill:"#000",stroke:"none","stroke-width":"1","stroke-linecap":"butt","stroke-linejoin":"miter","stroke-miterlimit":"4","stroke-dasharray":"none","stroke-dashoffset":"0","stroke-opacity":"1","paint-order":"normal","vector-effect":"none",display:"inline",visibility:"visible","marker-start":"none","marker-mid":"none","marker-end":"none","color-interpolation":"sRGB","color-interpolation-filters":"linearRGB","color-rendering":"auto","shape-rendering":"auto","text-rendering":"auto","image-rendering":"auto","font-style":"normal","font-variant":"normal","font-weight":"normal","font-stretch":"normal","font-size":"medium","font-size-adjust":"none",kerning:"auto","letter-spacing":"normal","word-spacing":"normal","text-decoration":"none","text-anchor":"start","text-overflow":"clip","writing-mode":"lr-tb","glyph-orientation-vertical":"auto","glyph-orientation-horizontal":"0deg",direction:"ltr","unicode-bidi":"normal","dominant-baseline":"auto","alignment-baseline":"baseline","baseline-shift":"baseline"},transferFunction:{slope:"1",intercept:"0",amplitude:"1",exponent:"1",offset:"0"}},Mt={animationAttributeTarget:{unsafe:new Set(["attributeType"])},conditionalProcessing:{unsafe:new Set(["requiredFeatures"])},core:{unsafe:new Set(["xml:base","xml:lang","xml:space"])},presentation:{unsafe:new Set(["clip","color-profile","enable-background","glyph-orientation-horizontal","glyph-orientation-vertical","kerning"])}},jt={a:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","style","target","transform"]),defaults:{target:"_self"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view","tspan"])},altGlyph:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","dx","dy","externalResourcesRequired","format","glyphRef","rotate","style","x","y"])},altGlyphDef:{attrsGroups:new Set(["core"]),content:new Set(["glyphRef"])},altGlyphItem:{attrsGroups:new Set(["core"]),content:new Set(["glyphRef","altGlyphItem"])},animate:{attrsGroups:new Set(["animationAddition","animationAttributeTarget","animationEvent","animationTiming","animationValue","conditionalProcessing","core","presentation","xlink"]),attrs:new Set(["externalResourcesRequired"]),contentGroups:new Set(["descriptive"])},animateColor:{attrsGroups:new Set(["animationAddition","animationAttributeTarget","animationEvent","animationTiming","animationValue","conditionalProcessing","core","presentation","xlink"]),attrs:new Set(["externalResourcesRequired"]),contentGroups:new Set(["descriptive"])},animateMotion:{attrsGroups:new Set(["animationAddition","animationEvent","animationTiming","animationValue","conditionalProcessing","core","xlink"]),attrs:new Set(["externalResourcesRequired","keyPoints","origin","path","rotate"]),defaults:{rotate:"0"},contentGroups:new Set(["descriptive"]),content:new Set(["mpath"])},animateTransform:{attrsGroups:new Set(["animationAddition","animationAttributeTarget","animationEvent","animationTiming","animationValue","conditionalProcessing","core","xlink"]),attrs:new Set(["externalResourcesRequired","type"]),contentGroups:new Set(["descriptive"])},circle:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","cx","cy","externalResourcesRequired","r","style","transform"]),defaults:{cx:"0",cy:"0"},contentGroups:new Set(["animation","descriptive"])},clipPath:{attrsGroups:new Set(["conditionalProcessing","core","presentation"]),attrs:new Set(["class","clipPathUnits","externalResourcesRequired","style","transform"]),defaults:{clipPathUnits:"userSpaceOnUse"},contentGroups:new Set(["animation","descriptive","shape"]),content:new Set(["text","use"])},"color-profile":{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["local","name","rendering-intent"]),defaults:{name:"sRGB","rendering-intent":"auto"},deprecated:{unsafe:new Set(["name"])},contentGroups:new Set(["descriptive"])},cursor:{attrsGroups:new Set(["core","conditionalProcessing","xlink"]),attrs:new Set(["externalResourcesRequired","x","y"]),defaults:{x:"0",y:"0"},contentGroups:new Set(["descriptive"])},defs:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform"]),contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},desc:{attrsGroups:new Set(["core"]),attrs:new Set(["class","style"])},ellipse:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","cx","cy","externalResourcesRequired","rx","ry","style","transform"]),defaults:{cx:"0",cy:"0"},contentGroups:new Set(["animation","descriptive"])},feBlend:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","in2","mode"]),defaults:{mode:"normal"},content:new Set(["animate","set"])},feColorMatrix:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","type","values"]),defaults:{type:"matrix"},content:new Set(["animate","set"])},feComponentTransfer:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in"]),content:new Set(["feFuncA","feFuncB","feFuncG","feFuncR"])},feComposite:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","in2","k1","k2","k3","k4","operator","style"]),defaults:{operator:"over",k1:"0",k2:"0",k3:"0",k4:"0"},content:new Set(["animate","set"])},feConvolveMatrix:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","kernelMatrix","order","style","bias","divisor","edgeMode","targetX","targetY","kernelUnitLength","preserveAlpha"]),defaults:{order:"3",bias:"0",edgeMode:"duplicate",preserveAlpha:"false"},content:new Set(["animate","set"])},feDiffuseLighting:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","diffuseConstant","in","kernelUnitLength","style","surfaceScale"]),defaults:{surfaceScale:"1",diffuseConstant:"1"},contentGroups:new Set(["descriptive"]),content:new Set(["feDistantLight","fePointLight","feSpotLight"])},feDisplacementMap:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","in2","scale","style","xChannelSelector","yChannelSelector"]),defaults:{scale:"0",xChannelSelector:"A",yChannelSelector:"A"},content:new Set(["animate","set"])},feDistantLight:{attrsGroups:new Set(["core"]),attrs:new Set(["azimuth","elevation"]),defaults:{azimuth:"0",elevation:"0"},content:new Set(["animate","set"])},feFlood:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style"]),content:new Set(["animate","animateColor","set"])},feFuncA:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feFuncB:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feFuncG:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feFuncR:{attrsGroups:new Set(["core","transferFunction"]),content:new Set(["set","animate"])},feGaussianBlur:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","stdDeviation"]),defaults:{stdDeviation:"0"},content:new Set(["set","animate"])},feImage:{attrsGroups:new Set(["core","presentation","filterPrimitive","xlink"]),attrs:new Set(["class","externalResourcesRequired","href","preserveAspectRatio","style","xlink:href"]),defaults:{preserveAspectRatio:"xMidYMid meet"},content:new Set(["animate","animateTransform","set"])},feMerge:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style"]),content:new Set(["feMergeNode"])},feMergeNode:{attrsGroups:new Set(["core"]),attrs:new Set(["in"]),content:new Set(["animate","set"])},feMorphology:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","operator","radius"]),defaults:{operator:"erode",radius:"0"},content:new Set(["animate","set"])},feOffset:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in","dx","dy"]),defaults:{dx:"0",dy:"0"},content:new Set(["animate","set"])},fePointLight:{attrsGroups:new Set(["core"]),attrs:new Set(["x","y","z"]),defaults:{x:"0",y:"0",z:"0"},content:new Set(["animate","set"])},feSpecularLighting:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","in","kernelUnitLength","specularConstant","specularExponent","style","surfaceScale"]),defaults:{surfaceScale:"1",specularConstant:"1",specularExponent:"1"},contentGroups:new Set(["descriptive","lightSource"])},feSpotLight:{attrsGroups:new Set(["core"]),attrs:new Set(["limitingConeAngle","pointsAtX","pointsAtY","pointsAtZ","specularExponent","x","y","z"]),defaults:{x:"0",y:"0",z:"0",pointsAtX:"0",pointsAtY:"0",pointsAtZ:"0",specularExponent:"1"},content:new Set(["animate","set"])},feTile:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["class","style","in"]),content:new Set(["animate","set"])},feTurbulence:{attrsGroups:new Set(["core","presentation","filterPrimitive"]),attrs:new Set(["baseFrequency","class","numOctaves","seed","stitchTiles","style","type"]),defaults:{baseFrequency:"0",numOctaves:"1",seed:"0",stitchTiles:"noStitch",type:"turbulence"},content:new Set(["animate","set"])},filter:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","filterRes","filterUnits","height","href","primitiveUnits","style","width","x","xlink:href","y"]),defaults:{primitiveUnits:"userSpaceOnUse",x:"-10%",y:"-10%",width:"120%",height:"120%"},deprecated:{unsafe:new Set(["filterRes"])},contentGroups:new Set(["descriptive","filterPrimitive"]),content:new Set(["animate","set"])},font:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","externalResourcesRequired","horiz-adv-x","horiz-origin-x","horiz-origin-y","style","vert-adv-y","vert-origin-x","vert-origin-y"]),defaults:{"horiz-origin-x":"0","horiz-origin-y":"0"},deprecated:{unsafe:new Set(["horiz-origin-x","horiz-origin-y","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["descriptive"]),content:new Set(["font-face","glyph","hkern","missing-glyph","vkern"])},"font-face":{attrsGroups:new Set(["core"]),attrs:new Set(["font-family","font-style","font-variant","font-weight","font-stretch","font-size","unicode-range","units-per-em","panose-1","stemv","stemh","slope","cap-height","x-height","accent-height","ascent","descent","widths","bbox","ideographic","alphabetic","mathematical","hanging","v-ideographic","v-alphabetic","v-mathematical","v-hanging","underline-position","underline-thickness","strikethrough-position","strikethrough-thickness","overline-position","overline-thickness"]),defaults:{"font-style":"all","font-variant":"normal","font-weight":"all","font-stretch":"normal","unicode-range":"U+0-10FFFF","units-per-em":"1000","panose-1":"0 0 0 0 0 0 0 0 0 0",slope:"0"},deprecated:{unsafe:new Set(["accent-height","alphabetic","ascent","bbox","cap-height","descent","hanging","ideographic","mathematical","panose-1","slope","stemh","stemv","unicode-range","units-per-em","v-alphabetic","v-hanging","v-ideographic","v-mathematical","widths","x-height"])},contentGroups:new Set(["descriptive"]),content:new Set(["font-face-src"])},"font-face-format":{attrsGroups:new Set(["core"]),attrs:new Set(["string"]),deprecated:{unsafe:new Set(["string"])}},"font-face-name":{attrsGroups:new Set(["core"]),attrs:new Set(["name"]),deprecated:{unsafe:new Set(["name"])}},"font-face-src":{attrsGroups:new Set(["core"]),content:new Set(["font-face-name","font-face-uri"])},"font-face-uri":{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["href","xlink:href"]),content:new Set(["font-face-format"])},foreignObject:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","height","style","transform","width","x","y"]),defaults:{x:"0",y:"0"}},g:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform"]),contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},glyph:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["arabic-form","class","d","glyph-name","horiz-adv-x","lang","orientation","style","unicode","vert-adv-y","vert-origin-x","vert-origin-y"]),defaults:{"arabic-form":"initial"},deprecated:{unsafe:new Set(["arabic-form","glyph-name","horiz-adv-x","orientation","unicode","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},glyphRef:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","d","horiz-adv-x","style","vert-adv-y","vert-origin-x","vert-origin-y"]),deprecated:{unsafe:new Set(["horiz-adv-x","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},hatch:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","hatchContentUnits","hatchUnits","pitch","rotate","style","transform","x","y"]),defaults:{hatchUnits:"objectBoundingBox",hatchContentUnits:"userSpaceOnUse",x:"0",y:"0",pitch:"0",rotate:"0"},contentGroups:new Set(["animation","descriptive"]),content:new Set(["hatchPath"])},hatchPath:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","style","d","offset"]),defaults:{offset:"0"},contentGroups:new Set(["animation","descriptive"])},hkern:{attrsGroups:new Set(["core"]),attrs:new Set(["u1","g1","u2","g2","k"]),deprecated:{unsafe:new Set(["g1","g2","k","u1","u2"])}},image:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","height","href","preserveAspectRatio","style","transform","width","x","xlink:href","y"]),defaults:{x:"0",y:"0",preserveAspectRatio:"xMidYMid meet"},contentGroups:new Set(["animation","descriptive"])},line:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform","x1","x2","y1","y2"]),defaults:{x1:"0",y1:"0",x2:"0",y2:"0"},contentGroups:new Set(["animation","descriptive"])},linearGradient:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","gradientTransform","gradientUnits","href","spreadMethod","style","x1","x2","xlink:href","y1","y2"]),defaults:{x1:"0",y1:"0",x2:"100%",y2:"0",spreadMethod:"pad"},contentGroups:new Set(["descriptive"]),content:new Set(["animate","animateTransform","set","stop"])},marker:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","externalResourcesRequired","markerHeight","markerUnits","markerWidth","orient","preserveAspectRatio","refX","refY","style","viewBox"]),defaults:{markerUnits:"strokeWidth",refX:"0",refY:"0",markerWidth:"3",markerHeight:"3"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},mask:{attrsGroups:new Set(["conditionalProcessing","core","presentation"]),attrs:new Set(["class","externalResourcesRequired","height","mask-type","maskContentUnits","maskUnits","style","width","x","y"]),defaults:{maskUnits:"objectBoundingBox",maskContentUnits:"userSpaceOnUse",x:"-10%",y:"-10%",width:"120%",height:"120%"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},metadata:{attrsGroups:new Set(["core"])},"missing-glyph":{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","d","horiz-adv-x","style","vert-adv-y","vert-origin-x","vert-origin-y"]),deprecated:{unsafe:new Set(["horiz-adv-x","vert-adv-y","vert-origin-x","vert-origin-y"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},mpath:{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["externalResourcesRequired","href","xlink:href"]),contentGroups:new Set(["descriptive"])},path:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","d","externalResourcesRequired","pathLength","style","transform"]),contentGroups:new Set(["animation","descriptive"])},pattern:{attrsGroups:new Set(["conditionalProcessing","core","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","height","href","patternContentUnits","patternTransform","patternUnits","preserveAspectRatio","style","viewBox","width","x","xlink:href","y"]),defaults:{patternUnits:"objectBoundingBox",patternContentUnits:"userSpaceOnUse",x:"0",y:"0",width:"0",height:"0",preserveAspectRatio:"xMidYMid meet"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},polygon:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","points","style","transform"]),contentGroups:new Set(["animation","descriptive"])},polyline:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","points","style","transform"]),contentGroups:new Set(["animation","descriptive"])},radialGradient:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","cx","cy","externalResourcesRequired","fr","fx","fy","gradientTransform","gradientUnits","href","r","spreadMethod","style","xlink:href"]),defaults:{gradientUnits:"objectBoundingBox",cx:"50%",cy:"50%",r:"50%"},contentGroups:new Set(["descriptive"]),content:new Set(["animate","animateTransform","set","stop"])},meshGradient:{attrsGroups:new Set(["core","presentation","xlink"]),attrs:new Set(["class","style","x","y","gradientUnits","transform"]),contentGroups:new Set(["descriptive","paintServer","animation"]),content:new Set(["meshRow"])},meshRow:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style"]),contentGroups:new Set(["descriptive"]),content:new Set(["meshPatch"])},meshPatch:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style"]),contentGroups:new Set(["descriptive"]),content:new Set(["stop"])},rect:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","height","rx","ry","style","transform","width","x","y"]),defaults:{x:"0",y:"0"},contentGroups:new Set(["animation","descriptive"])},script:{attrsGroups:new Set(["core","xlink"]),attrs:new Set(["externalResourcesRequired","type","href","xlink:href"])},set:{attrsGroups:new Set(["animation","animationAttributeTarget","animationTiming","conditionalProcessing","core","xlink"]),attrs:new Set(["externalResourcesRequired","to"]),contentGroups:new Set(["descriptive"])},solidColor:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style"]),contentGroups:new Set(["paintServer"])},stop:{attrsGroups:new Set(["core","presentation"]),attrs:new Set(["class","style","offset","path"]),content:new Set(["animate","animateColor","set"])},style:{attrsGroups:new Set(["core"]),attrs:new Set(["type","media","title"]),defaults:{type:"text/css"}},svg:{attrsGroups:new Set(["conditionalProcessing","core","documentEvent","graphicalEvent","presentation"]),attrs:new Set(["baseProfile","class","contentScriptType","contentStyleType","height","preserveAspectRatio","style","version","viewBox","width","x","y","zoomAndPan"]),defaults:{x:"0",y:"0",width:"100%",height:"100%",preserveAspectRatio:"xMidYMid meet",zoomAndPan:"magnify",version:"1.1",baseProfile:"none",contentScriptType:"application/ecmascript",contentStyleType:"text/css"},deprecated:{safe:new Set(["version"]),unsafe:new Set(["baseProfile","contentScriptType","contentStyleType","zoomAndPan"])},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},switch:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","style","transform"]),contentGroups:new Set(["animation","descriptive","shape"]),content:new Set(["a","foreignObject","g","image","svg","switch","text","use"])},symbol:{attrsGroups:new Set(["core","graphicalEvent","presentation"]),attrs:new Set(["class","externalResourcesRequired","preserveAspectRatio","refX","refY","style","viewBox"]),defaults:{refX:"0",refY:"0"},contentGroups:new Set(["animation","descriptive","paintServer","shape","structural"]),content:new Set(["a","altGlyphDef","clipPath","color-profile","cursor","filter","font-face","font","foreignObject","image","marker","mask","pattern","script","style","switch","text","view"])},text:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","dx","dy","externalResourcesRequired","lengthAdjust","rotate","style","textLength","transform","x","y"]),defaults:{x:"0",y:"0",lengthAdjust:"spacing"},contentGroups:new Set(["animation","descriptive","textContentChild"]),content:new Set(["a"])},textPath:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","d","externalResourcesRequired","href","method","spacing","startOffset","style","xlink:href"]),defaults:{startOffset:"0",method:"align",spacing:"exact"},contentGroups:new Set(["descriptive"]),content:new Set(["a","altGlyph","animate","animateColor","set","tref","tspan"])},title:{attrsGroups:new Set(["core"]),attrs:new Set(["class","style"])},tref:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","href","style","xlink:href"]),contentGroups:new Set(["descriptive"]),content:new Set(["animate","animateColor","set"])},tspan:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation"]),attrs:new Set(["class","dx","dy","externalResourcesRequired","lengthAdjust","rotate","style","textLength","x","y"]),contentGroups:new Set(["descriptive"]),content:new Set(["a","altGlyph","animate","animateColor","set","tref","tspan"])},use:{attrsGroups:new Set(["conditionalProcessing","core","graphicalEvent","presentation","xlink"]),attrs:new Set(["class","externalResourcesRequired","height","href","style","transform","width","x","xlink:href","y"]),defaults:{x:"0",y:"0"},contentGroups:new Set(["animation","descriptive"])},view:{attrsGroups:new Set(["core"]),attrs:new Set(["externalResourcesRequired","preserveAspectRatio","viewBox","viewTarget","zoomAndPan"]),deprecated:{unsafe:new Set(["viewTarget","zoomAndPan"])},contentGroups:new Set(["descriptive"])},vkern:{attrsGroups:new Set(["core"]),attrs:new Set(["u1","g1","u2","g2","k"]),deprecated:{unsafe:new Set(["g1","g2","k","u1","u2"])}}},It=new Set(["http://creativecommons.org/ns#","http://inkscape.sourceforge.net/DTD/sodipodi-0.dtd","http://krita.org/namespaces/svg/krita","http://ns.adobe.com/AdobeIllustrator/10.0/","http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/","http://ns.adobe.com/Extensibility/1.0/","http://ns.adobe.com/Flows/1.0/","http://ns.adobe.com/GenericCustomNamespace/1.0/","http://ns.adobe.com/Graphs/1.0/","http://ns.adobe.com/ImageReplacement/1.0/","http://ns.adobe.com/SaveForWeb/1.0/","http://ns.adobe.com/Variables/1.0/","http://ns.adobe.com/XPath/1.0/","http://purl.org/dc/elements/1.1/","http://schemas.microsoft.com/visio/2003/SVGExtensions/","http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd","http://taptrix.com/vectorillustrator/svg_extensions","http://www.bohemiancoding.com/sketch/ns","http://www.figma.com/figma/ns","http://www.inkscape.org/namespaces/inkscape","http://www.serif.com/","http://www.vector.evaxdesign.sk","http://www.w3.org/1999/02/22-rdf-syntax-ns#","https://boxy-svg.com"]),Rt=new Set(["clip-path","color-profile","fill","filter","marker-end","marker-mid","marker-start","mask","stroke","style"]),Ft=new Set(["clip-rule","color-interpolation-filters","color-interpolation","color-profile","color-rendering","color","cursor","direction","dominant-baseline","fill-opacity","fill-rule","fill","font-family","font-size-adjust","font-size","font-stretch","font-style","font-variant","font-weight","font","glyph-orientation-horizontal","glyph-orientation-vertical","image-rendering","letter-spacing","marker-end","marker-mid","marker-start","marker","paint-order","pointer-events","shape-rendering","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","stroke","text-anchor","text-rendering","transform","visibility","word-spacing","writing-mode"]),zt=new Set(["clip-path","display","filter","mask","opacity","text-decoration","transform","unicode-bidi"]),Gt={aliceblue:"#f0f8ff",antiquewhite:"#faebd7",aqua:"#0ff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000",blanchedalmond:"#ffebcd",blue:"#00f",blueviolet:"#8a2be2",brown:"#a52a2a",burlywood:"#deb887",cadetblue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerblue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#0ff",darkblue:"#00008b",darkcyan:"#008b8b",darkgoldenrod:"#b8860b",darkgray:"#a9a9a9",darkgreen:"#006400",darkgrey:"#a9a9a9",darkkhaki:"#bdb76b",darkmagenta:"#8b008b",darkolivegreen:"#556b2f",darkorange:"#ff8c00",darkorchid:"#9932cc",darkred:"#8b0000",darksalmon:"#e9967a",darkseagreen:"#8fbc8f",darkslateblue:"#483d8b",darkslategray:"#2f4f4f",darkslategrey:"#2f4f4f",darkturquoise:"#00ced1",darkviolet:"#9400d3",deeppink:"#ff1493",deepskyblue:"#00bfff",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1e90ff",firebrick:"#b22222",floralwhite:"#fffaf0",forestgreen:"#228b22",fuchsia:"#f0f",gainsboro:"#dcdcdc",ghostwhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenyellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotpink:"#ff69b4",indianred:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderblush:"#fff0f5",lawngreen:"#7cfc00",lemonchiffon:"#fffacd",lightblue:"#add8e6",lightcoral:"#f08080",lightcyan:"#e0ffff",lightgoldenrodyellow:"#fafad2",lightgray:"#d3d3d3",lightgreen:"#90ee90",lightgrey:"#d3d3d3",lightpink:"#ffb6c1",lightsalmon:"#ffa07a",lightseagreen:"#20b2aa",lightskyblue:"#87cefa",lightslategray:"#789",lightslategrey:"#789",lightsteelblue:"#b0c4de",lightyellow:"#ffffe0",lime:"#0f0",limegreen:"#32cd32",linen:"#faf0e6",magenta:"#f0f",maroon:"#800000",mediumaquamarine:"#66cdaa",mediumblue:"#0000cd",mediumorchid:"#ba55d3",mediumpurple:"#9370db",mediumseagreen:"#3cb371",mediumslateblue:"#7b68ee",mediumspringgreen:"#00fa9a",mediumturquoise:"#48d1cc",mediumvioletred:"#c71585",midnightblue:"#191970",mintcream:"#f5fffa",mistyrose:"#ffe4e1",moccasin:"#ffe4b5",navajowhite:"#ffdead",navy:"#000080",oldlace:"#fdf5e6",olive:"#808000",olivedrab:"#6b8e23",orange:"#ffa500",orangered:"#ff4500",orchid:"#da70d6",palegoldenrod:"#eee8aa",palegreen:"#98fb98",paleturquoise:"#afeeee",palevioletred:"#db7093",papayawhip:"#ffefd5",peachpuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderblue:"#b0e0e6",purple:"#800080",rebeccapurple:"#639",red:"#f00",rosybrown:"#bc8f8f",royalblue:"#4169e1",saddlebrown:"#8b4513",salmon:"#fa8072",sandybrown:"#f4a460",seagreen:"#2e8b57",seashell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyblue:"#87ceeb",slateblue:"#6a5acd",slategray:"#708090",slategrey:"#708090",snow:"#fffafa",springgreen:"#00ff7f",steelblue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#fff",whitesmoke:"#f5f5f5",yellow:"#ff0",yellowgreen:"#9acd32"},Bt={"#f0ffff":"azure","#f5f5dc":"beige","#ffe4c4":"bisque","#a52a2a":"brown","#ff7f50":"coral","#ffd700":"gold","#808080":"gray","#008000":"green","#4b0082":"indigo","#fffff0":"ivory","#f0e68c":"khaki","#faf0e6":"linen","#800000":"maroon","#000080":"navy","#808000":"olive","#ffa500":"orange","#da70d6":"orchid","#cd853f":"peru","#ffc0cb":"pink","#dda0dd":"plum","#800080":"purple","#f00":"red","#ff0000":"red","#fa8072":"salmon","#a0522d":"sienna","#c0c0c0":"silver","#fffafa":"snow","#d2b48c":"tan","#008080":"teal","#ff6347":"tomato","#ee82ee":"violet","#f5deb3":"wheat"},Ut=new Set(["color","fill","flood-color","lighting-color","stop-color","stroke"]),qt={displayState:new Set(["fullscreen","modal","picture-in-picture"]),input:new Set(["autofill","blank","checked","default","disabled","enabled","in-range","indeterminate","invalid","optional","out-of-range","placeholder-shown","read-only","read-write","required","user-invalid","valid"]),linguistic:new Set(["dir","lang"]),location:new Set(["any-link","link","local-link","scope","target-within","target","visited"]),resourceState:new Set(["playing","paused"]),timeDimensional:new Set(["current","past","future"]),treeStructural:new Set(["empty","first-child","first-of-type","last-child","last-of-type","nth-child","nth-last-child","nth-last-of-type","nth-of-type","only-child","only-of-type","root"]),userAction:new Set(["active","focus-visible","focus-within","focus","hover"]),functional:new Set(["is","not","where","has"])}
var Wt=Object.freeze({__proto__:null,attrsGroups:Nt,attrsGroupsDefaults:Dt,attrsGroupsDeprecated:Mt,colorsNames:Gt,colorsProps:Ut,colorsShortNames:Bt,editorNamespaces:It,elems:jt,elemsGroups:Ot,inheritableAttrs:Ft,pathElems:Lt,presentationNonInheritableGroupAttrs:zt,pseudoClasses:qt,referencesProps:Rt,textElems:Pt})
const Vt=10,$t=11,Yt=12,Xt=13,Ht=15,Qt=16,Kt=17,Zt=18,Jt=19,en=20,tn=21,nn=22,rn=23,sn=24,on=25
function an(e){return e>=0x0030&&e<=0x0039}function ln(e){return an(e)||e>=0x0041&&e<=0x0046||e>=0x0061&&e<=0x0066}function cn(e){return e>=0x0041&&e<=0x005A}function un(e){return function(e){return cn(e)||function(e){return e>=0x0061&&e<=0x007A}(e)}(e)||function(e){return e>=0x0080}(e)||0x005F===e}function hn(e){return un(e)||an(e)||0x002D===e}function fn(e){return e>=0x0000&&e<=0x0008||0x000B===e||e>=0x000E&&e<=0x001F||0x007F===e}function pn(e){return 0x000A===e||0x000D===e||0x000C===e}function dn(e){return pn(e)||0x0020===e||0x0009===e}function mn(e,t){return 0x005C===e&&(!pn(t)&&0!==t)}function gn(e,t,n){return 0x002D===e?un(t)||0x002D===t||mn(t,n):!!un(e)||0x005C===e&&mn(e,t)}function yn(e,t,n){return 0x002B===e||0x002D===e?an(t)?2:0x002E===t&&an(n)?3:0:0x002E===e?an(t)?2:0:an(e)?1:0}function bn(e){return 0xFEFF===e||0xFFFE===e?1:0}const kn=new Array(0x80),vn=0x82
for(let e=0;e<kn.length;e++)kn[e]=(dn(e)?vn:an(e)&&131)||un(e)&&132||fn(e)&&133||e||128
function Sn(e){return e<0x80?kn[e]:132}function wn(e,t){return t<e.length?e.charCodeAt(t):0}function xn(e,t,n){return 13===n&&10===wn(e,t+1)?2:1}function Cn(e,t,n){let r=e.charCodeAt(t)
return cn(r)&&(r|=32),r===n}function An(e,t,n,r){if(n-t!==r.length)return!1
if(t<0||n>e.length)return!1
for(let s=t;s<n;s++){const n=r.charCodeAt(s-t)
let i=e.charCodeAt(s)
if(cn(i)&&(i|=32),i!==n)return!1}return!0}function _n(e,t){for(;t<e.length&&dn(e.charCodeAt(t));t++);return t}function Tn(e,t){for(;t<e.length&&an(e.charCodeAt(t));t++);return t}function En(e,t){if(ln(wn(e,(t+=2)-1))){for(const n=Math.min(e.length,t+5);t<n&&ln(wn(e,t));t++);const n=wn(e,t)
dn(n)&&(t+=xn(e,t,n))}return t}function On(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(!hn(n)){if(!mn(n,wn(e,t+1)))break
t=En(e,t)-1}}return t}function Pn(e,t){let n=e.charCodeAt(t)
if(0x002B!==n&&0x002D!==n||(n=e.charCodeAt(t+=1)),an(n)&&(t=Tn(e,t+1),n=e.charCodeAt(t)),0x002E===n&&an(e.charCodeAt(t+1))&&(t=Tn(e,t+=2)),Cn(e,t,101)){let r=0
n=e.charCodeAt(t+1),0x002D!==n&&0x002B!==n||(r=1,n=e.charCodeAt(t+2)),an(n)&&(t=Tn(e,t+1+r+1))}return t}function Ln(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(0x0029===n){t++
break}mn(n,wn(e,t+1))&&(t=En(e,t))}return t}function Nn(e){if(1===e.length&&!ln(e.charCodeAt(0)))return e[0]
let t=parseInt(e,16)
return(0===t||t>=0xD800&&t<=0xDFFF||t>0x10FFFF)&&(t=0xFFFD),String.fromCodePoint(t)}var Dn=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token","comment-token"]
function Mn(e=null,t){return null===e||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}function jn(e){const t=e.source,n=t.length,r=t.length>0?bn(t.charCodeAt(0)):0,s=Mn(e.lines,n),i=Mn(e.columns,n)
let o=e.startLine,a=e.startColumn
for(let e=r;e<n;e++){const r=t.charCodeAt(e)
s[e]=o,i[e]=a++,10!==r&&13!==r&&12!==r||(13===r&&e+1<n&&10===t.charCodeAt(e+1)&&(e++,s[e]=o,i[e]=a),o++,a=1)}s[n]=o,i[n]=a,e.lines=s,e.columns=i,e.computed=!0}let In=class{constructor(e,t,n,r){this.setSource(e,t,n,r),this.lines=null,this.columns=null}setSource(e="",t=0,n=1,r=1){this.source=e,this.startOffset=t,this.startLine=n,this.startColumn=r,this.computed=!1}getLocation(e,t){return this.computed||jn(this),{source:t,offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]}}getLocationRange(e,t,n){return this.computed||jn(this),{source:n,start:{offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]},end:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}}}
const Rn=0x00FFFFFF,Fn=24,zn=new Uint8Array(32)
function Gn(e){return 0!==zn[e]}zn[2]=nn,zn[21]=nn,zn[19]=en,zn[23]=sn
let Bn=class{constructor(e,t){this.setSource(e,t)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(e="",t=()=>{}){const n=(e=String(e||"")).length,r=Mn(this.offsetAndType,e.length+1),s=Mn(this.balance,e.length+1)
let i=0,o=-1,a=0,l=e.length
this.offsetAndType=null,this.balance=null,s.fill(0),t(e,(e,t,n)=>{const c=i++
if(r[c]=e<<Fn|n,-1===o&&(o=t),s[c]=l,e===a){const e=s[l]
s[l]=c,l=e,a=zn[r[e]>>Fn]}else Gn(e)&&(l=c,a=zn[e])}),r[i]=0|n,s[i]=i
for(let e=0;e<i;e++){const t=s[e]
if(t<=e){const n=s[t]
n!==e&&(s[e]=n)}else t>i&&(s[e]=i)}this.source=e,this.firstCharOffset=-1===o?0:o,this.tokenCount=i,this.offsetAndType=r,this.balance=s,this.reset(),this.next()}lookupType(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e]>>Fn:0}lookupTypeNonSC(e){for(let t=this.tokenIndex;t<this.tokenCount;t++){const n=this.offsetAndType[t]>>Fn
if(n!==Xt&&n!==on&&0===e--)return n}return 0}lookupOffset(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e-1]&Rn:this.source.length}lookupOffsetNonSC(e){for(let t=this.tokenIndex;t<this.tokenCount;t++){const n=this.offsetAndType[t]>>Fn
if(n!==Xt&&n!==on&&0===e--)return t-this.tokenIndex}return 0}lookupValue(e,t){return(e+=this.tokenIndex)<this.tokenCount&&An(this.source,this.offsetAndType[e-1]&Rn,this.offsetAndType[e]&Rn,t)}getTokenStart(e){return e===this.tokenIndex?this.tokenStart:e>0?e<this.tokenCount?this.offsetAndType[e-1]&Rn:this.offsetAndType[this.tokenCount]&Rn:this.firstCharOffset}substrToCursor(e){return this.source.substring(e,this.tokenStart)}isBalanceEdge(e){return this.balance[this.tokenIndex]<e}isDelim(e,t){return t?9===this.lookupType(t)&&this.source.charCodeAt(this.lookupOffset(t))===e:9===this.tokenType&&this.source.charCodeAt(this.tokenStart)===e}skip(e){let t=this.tokenIndex+e
t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.offsetAndType[t-1]&Rn,t=this.offsetAndType[t],this.tokenType=t>>Fn,this.tokenEnd=t&Rn):(this.tokenIndex=this.tokenCount,this.next())}next(){let e=this.tokenIndex+1
e<this.tokenCount?(this.tokenIndex=e,this.tokenStart=this.tokenEnd,e=this.offsetAndType[e],this.tokenType=e>>Fn,this.tokenEnd=e&Rn):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===Xt||this.tokenType===on;)this.next()}skipUntilBalanced(e,t){let n=e,r=0,s=0
e:for(;n<this.tokenCount&&(r=this.balance[n],!(r<e));n++)switch(s=n>0?this.offsetAndType[n-1]&Rn:this.firstCharOffset,t(this.source.charCodeAt(s))){case 1:break e
case 2:n++
break e
default:Gn(this.offsetAndType[n]>>Fn)&&(n=r)}this.skip(n-this.tokenIndex)}forEachToken(e){for(let t=0,n=this.firstCharOffset;t<this.tokenCount;t++){const r=n,s=this.offsetAndType[t],i=s&Rn
n=i,e(s>>Fn,r,i,t)}}dump(){const e=new Array(this.tokenCount)
return this.forEachToken((t,n,r,s)=>{e[s]={idx:s,type:Dn[t],chunk:this.source.substring(n,r),balance:this.balance[s]}}),e}}
function Un(e,t){function n(t){return t<o?e.charCodeAt(t):0}function r(){return c=Pn(e,c),gn(n(c),n(c+1),n(c+2))?(a=Yt,c=On(e,c),void 0):0x0025===n(c)?(a=$t,c++,void 0):(a=Vt,void 0)}function s(){const t=c
return c=On(e,c),An(e,t,c,"url")&&0x0028===n(c)?(c=_n(e,c+1),0x0022===n(c)||0x0027===n(c)?(a=2,c=t+4,void 0):(!function(){for(a=7,c=_n(e,c);c<e.length;c++){const t=e.charCodeAt(c)
switch(Sn(t)){case 0x0029:return c++,void 0
case vn:return c=_n(e,c),0x0029===n(c)||c>=e.length?(c<e.length&&c++,void 0):(c=Ln(e,c),a=8,void 0)
case 0x0022:case 0x0027:case 0x0028:case 133:return c=Ln(e,c),a=8,void 0
case 0x005C:if(mn(t,n(c+1))){c=En(e,c)-1
break}return c=Ln(e,c),a=8,void 0}}}(),void 0)):0x0028===n(c)?(a=2,c++,void 0):(a=1,void 0)}function i(t){for(t||(t=n(c++)),a=5;c<e.length;c++){const r=e.charCodeAt(c)
switch(Sn(r)){case t:return c++,void 0
case vn:if(pn(r))return c+=xn(e,c,r),a=6,void 0
break
case 0x005C:if(c===e.length-1)break
const s=n(c+1)
pn(s)?c+=xn(e,c+1,s):mn(r,s)&&(c=En(e,c)-1)}}}const o=(e=String(e||"")).length
let a,l=bn(n(0)),c=l
for(;c<o;){const o=e.charCodeAt(c)
switch(Sn(o)){case vn:a=Xt,c=_n(e,c+1)
break
case 0x0022:i()
break
case 0x0023:hn(n(c+1))||mn(n(c+1),n(c+2))?(a=4,c=On(e,c+1)):(a=9,c++)
break
case 0x0027:i()
break
case 0x0028:a=tn,c++
break
case 0x0029:a=nn,c++
break
case 0x002B:yn(o,n(c+1),n(c+2))?r():(a=9,c++)
break
case 0x002C:a=Zt,c++
break
case 0x002D:yn(o,n(c+1),n(c+2))?r():0x002D===n(c+1)&&0x003E===n(c+2)?(a=Ht,c+=3):gn(o,n(c+1),n(c+2))?s():(a=9,c++)
break
case 0x002E:yn(o,n(c+1),n(c+2))?r():(a=9,c++)
break
case 0x002F:0x002A===n(c+1)?(a=on,c=e.indexOf("*/",c+2),c=-1===c?e.length:c+2):(a=9,c++)
break
case 0x003A:a=Qt,c++
break
case 0x003B:a=Kt,c++
break
case 0x003C:0x0021===n(c+1)&&0x002D===n(c+2)&&0x002D===n(c+3)?(a=14,c+=4):(a=9,c++)
break
case 0x0040:gn(n(c+1),n(c+2),n(c+3))?(a=3,c=On(e,c+1)):(a=9,c++)
break
case 0x005B:a=Jt,c++
break
case 0x005C:mn(o,n(c+1))?s():(a=9,c++)
break
case 0x005D:a=en,c++
break
case 0x007B:a=rn,c++
break
case 0x007D:a=sn,c++
break
case 131:r()
break
case 132:s()
break
default:a=9,c++}t(a,l,l=c)}}let qn=null,Wn=class e{static createItem(e){return{prev:null,next:null,data:e}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(t){return e.createItem(t)}allocateCursor(e,t){let n
return null!==qn?(n=qn,qn=qn.cursor,n.prev=e,n.next=t,n.cursor=this.cursor):n={prev:e,next:t,cursor:this.cursor},this.cursor=n,n}releaseCursor(){const{cursor:e}=this
this.cursor=e.cursor,e.prev=null,e.next=null,e.cursor=qn,qn=e}updateCursors(e,t,n,r){let{cursor:s}=this
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
function Vn(e,t){const n=Object.create(SyntaxError.prototype),r=new Error
return Object.assign(n,{name:e,message:t,get stack(){return(r.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}\n`)}})}const $n="    "
function Yn({source:e,line:t,column:n,baseLine:r,baseColumn:s},i){function o(e,t){return a.slice(e,t).map((t,n)=>String(e+n+1).padStart(u)+" |"+t).join("\n")}const a=("\n".repeat(Math.max(r-1,0))+" ".repeat(Math.max(s-1,0))+e).split(/\r\n?|\n|\f/),l=Math.max(1,t-i)-1,c=Math.min(t+i,a.length+1),u=Math.max(4,String(c).length)+1
let h=0;(n+=3*(a[t-1].substr(0,n-1).match(/\t/g)||[]).length)>100&&(h=n-60+3,n=58)
for(let e=l;e<=c;e++)e>=0&&e<a.length&&(a[e]=a[e].replace(/\t/g,$n),a[e]=(h>0&&a[e].length>h?"…":"")+a[e].substr(h,98)+(a[e].length>h+100-1?"…":""))
return[o(l,t),new Array(n+u+2).join("-")+"^",o(t,c)].filter(Boolean).join("\n").replace(/^(\s+\d+\s+\|\n)+/,"").replace(/\n(\s+\d+\s+\|)+$/,"")}function Xn(e,t,n,r,s,i=1,o=1){return Object.assign(Vn("SyntaxError",e),{source:t,offset:n,line:r,column:s,sourceFragment:e=>Yn({source:t,line:r,column:s,baseLine:i,baseColumn:o},isNaN(e)?0:e),get formattedMessage(){return`Parse error: ${e}\n`+Yn({source:t,line:r,column:s,baseLine:i,baseColumn:o},2)}})}function Hn(e){const t=this.createList()
let n=!1
const r={recognizer:e}
for(;!this.eof;){switch(this.tokenType){case on:this.next()
continue
case Xt:n=!0,this.next()
continue}let s=e.getNode.call(this,r)
if(void 0===s)break
n&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,s,t,r),n=!1),t.push(s)}return n&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,r),t}const Qn=()=>{}
function Kn(e){return function(){return this[e]()}}function Zn(e){const t=Object.create(null)
for(const n of Object.keys(e)){const r=e[n],s=r.parse||r
s&&(t[n]=s)}return t}function Jn(e){let t="",n="<unknown>",r=!1,s=Qn,i=!1
const o=new In,a=Object.assign(new Bn,function(e){const t={context:Object.create(null),features:Object.assign(Object.create(null),e.features),scope:Object.assign(Object.create(null),e.scope),atrule:Zn(e.atrule),pseudo:Zn(e.pseudo),node:Zn(e.node)}
for(const[n,r]of Object.entries(e.parseContext))switch(typeof r){case"function":t.context[n]=r
break
case"string":t.context[n]=Kn(r)}return{config:t,...t,...t.node}}(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:Hn,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket:e=>123===e?1:0,consumeUntilLeftCurlyBracketOrSemicolon:e=>123===e||59===e?1:0,consumeUntilExclamationMarkOrSemicolon:e=>33===e||59===e?1:0,consumeUntilSemicolonIncluded:e=>59===e?2:0,createList:()=>new Wn,createSingleNodeList:e=>(new Wn).appendData(e),getFirstListNode:e=>e&&e.first,getLastListNode:e=>e&&e.last,parseWithFallback(e,t){const n=this.tokenIndex
try{return e.call(this)}catch(e){if(i)throw e
this.skip(n-this.tokenIndex)
const r=t.call(this)
return i=!0,s(e,r),i=!1,r}},lookupNonWSType(e){let t
do{if(t=this.lookupType(e++),t!==Xt&&t!==on)return t}while(0!==t)
return 0},charCodeAt:e=>e>=0&&e<t.length?t.charCodeAt(e):0,substring:(e,n)=>t.substring(e,n),substrToCursor(e){return this.source.substring(e,this.tokenStart)},cmpChar:(e,n)=>Cn(t,e,n),cmpStr:(e,n,r)=>An(t,e,n,r),consume(e){const t=this.tokenStart
return this.eat(e),this.substrToCursor(t)},consumeFunctionName(){const e=t.substring(this.tokenStart,this.tokenEnd-1)
return this.eat(2),e},consumeNumber(e){const n=t.substring(this.tokenStart,Pn(t,this.tokenStart))
return this.eat(e),n},eat(e){if(this.tokenType!==e){const t=Dn[e].slice(0,-6).replace(/-/g," ").replace(/^./,e=>e.toUpperCase())
let n=`${/[[\](){}]/.test(t)?`"${t}"`:t} is expected`,r=this.tokenStart
switch(e){case 1:2===this.tokenType||7===this.tokenType?(r=this.tokenEnd-1,n="Identifier is expected but function found"):n="Identifier is expected"
break
case 4:this.isDelim(35)&&(this.next(),r++,n="Name is expected")
break
case $t:this.tokenType===Vt&&(r=this.tokenEnd,n="Percent sign is expected")}this.error(n,r)}this.next()},eatIdent(e){1===this.tokenType&&!1!==this.lookupValue(0,e)||this.error(`Identifier "${e}" is expected`),this.next()},eatDelim(e){this.isDelim(e)||this.error(`Delim "${String.fromCharCode(e)}" is expected`),this.next()},getLocation:(e,t)=>r?o.getLocationRange(e,t,n):null,getLocationFromList(e){if(r){const t=this.getFirstListNode(e),r=this.getLastListNode(e)
return o.getLocationRange(null!==t?t.loc.start.offset-o.startOffset:this.tokenStart,null!==r?r.loc.end.offset-o.startOffset:this.tokenStart,n)}return null},error(e,n){const r=void 0!==n&&n<t.length?o.getLocation(n):this.eof?o.getLocation(function(e,t){for(;t>=0&&dn(e.charCodeAt(t));t--);return t+1}(t,t.length-1)):o.getLocation(this.tokenStart)
throw new Xn(e||"Unexpected input",t,r.offset,r.line,r.column,o.startLine,o.startColumn)}})
return Object.assign(function(e,l){t=e,l=l||{},a.setSource(t,Un),o.setSource(t,l.offset,l.line,l.column),n=l.filename||"<unknown>",r=Boolean(l.positions),s="function"==typeof l.onParseError?l.onParseError:Qn,i=!1,a.parseAtrulePrelude=!("parseAtrulePrelude"in l)||Boolean(l.parseAtrulePrelude),a.parseRulePrelude=!("parseRulePrelude"in l)||Boolean(l.parseRulePrelude),a.parseValue=!("parseValue"in l)||Boolean(l.parseValue),a.parseCustomProperty="parseCustomProperty"in l&&Boolean(l.parseCustomProperty)
const{context:c="default",onComment:u}=l
if(c in a.context==!1)throw new Error("Unknown context `"+c+"`")
"function"==typeof u&&a.forEachToken((e,n,r)=>{if(e===on){const e=a.getLocation(n,r),s=An(t,r-2,r,"*/")?t.slice(n+2,r-2):t.slice(n+2,r)
u(s,e)}})
const h=a.context[c].call(a,l)
return a.eof||a.error(),h},{SyntaxError:Xn,config:a.config})}var er={},tr={},nr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("")
tr.encode=function(e){if(0<=e&&e<nr.length)return nr[e]
throw new TypeError("Must be between 0 and 63: "+e)},tr.decode=function(e){return 65<=e&&e<=90?e-65:97<=e&&e<=122?e-97+26:48<=e&&e<=57?e-48+52:43==e?62:47==e?63:-1}
var rr=tr
er.encode=function(e){var t,n="",r=function(e){return e<0?1+(-e<<1):0+(e<<1)}(e)
do{t=31&r,(r>>>=5)>0&&(t|=32),n+=rr.encode(t)}while(r>0)
return n},er.decode=function(e,t,n){var r,s,i,o,a=e.length,l=0,c=0
do{if(t>=a)throw new Error("Expected more digits in base 64 VLQ value.")
if(-1===(s=rr.decode(e.charCodeAt(t++))))throw new Error("Invalid base64 digit: "+e.charAt(t-1))
r=!!(32&s),l+=(s&=31)<<c,c+=5}while(r)
n.value=(o=(i=l)>>1,1&~i?o:-o),n.rest=t}
var sr={}
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
o>=0&&(i.path=i.path.substring(0,o+1))}t=l(s(i),t)}return a(t)}}(sr)
var ir={},or=sr,ar=Object.prototype.hasOwnProperty,lr="undefined"!=typeof Map
function cr(){this._array=[],this._set=lr?new Map:Object.create(null)}cr.fromArray=function(e,t){for(var n=new cr,r=0,s=e.length;r<s;r++)n.add(e[r],t)
return n},cr.prototype.size=function(){return lr?this._set.size:Object.getOwnPropertyNames(this._set).length},cr.prototype.add=function(e,t){var n=lr?e:or.toSetString(e),r=lr?this.has(e):ar.call(this._set,n),s=this._array.length
r&&!t||this._array.push(e),r||(lr?this._set.set(e,s):this._set[n]=s)},cr.prototype.has=function(e){if(lr)return this._set.has(e)
var t=or.toSetString(e)
return ar.call(this._set,t)},cr.prototype.indexOf=function(e){if(lr){var t=this._set.get(e)
if(t>=0)return t}else{var n=or.toSetString(e)
if(ar.call(this._set,n))return this._set[n]}throw new Error('"'+e+'" is not in the set.')},cr.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e]
throw new Error("No element indexed by "+e)},cr.prototype.toArray=function(){return this._array.slice()},ir.ArraySet=cr
var ur={},hr=sr
function fr(){this._array=[],this._sorted=!0,this._last={generatedLine:-1,generatedColumn:0}}fr.prototype.unsortedForEach=function(e,t){this._array.forEach(e,t)},fr.prototype.add=function(e){var t,n,r,s,i,o
t=this._last,n=e,r=t.generatedLine,s=n.generatedLine,i=t.generatedColumn,o=n.generatedColumn,s>r||s==r&&o>=i||hr.compareByGeneratedPositionsInflated(t,n)<=0?(this._last=e,this._array.push(e)):(this._sorted=!1,this._array.push(e))},fr.prototype.toArray=function(){return this._sorted||(this._array.sort(hr.compareByGeneratedPositionsInflated),this._sorted=!0),this._array},ur.MappingList=fr
var pr=er,dr=sr,mr=ir.ArraySet,gr=ur.MappingList
function yr(e){e||(e={}),this._file=dr.getArg(e,"file",null),this._sourceRoot=dr.getArg(e,"sourceRoot",null),this._skipValidation=dr.getArg(e,"skipValidation",!1),this._ignoreInvalidMapping=dr.getArg(e,"ignoreInvalidMapping",!1),this._sources=new mr,this._names=new mr,this._mappings=new gr,this._sourcesContents=null}yr.prototype._version=3,yr.fromSourceMap=function(e,t){var n=e.sourceRoot,r=new yr(Object.assign(t||{},{file:e.file,sourceRoot:n}))
return e.eachMapping(function(e){var t={generated:{line:e.generatedLine,column:e.generatedColumn}}
null!=e.source&&(t.source=e.source,null!=n&&(t.source=dr.relative(n,t.source)),t.original={line:e.originalLine,column:e.originalColumn},null!=e.name&&(t.name=e.name)),r.addMapping(t)}),e.sources.forEach(function(t){var s=t
null!==n&&(s=dr.relative(n,t)),r._sources.has(s)||r._sources.add(s)
var i=e.sourceContentFor(t)
null!=i&&r.setSourceContent(t,i)}),r},yr.prototype.addMapping=function(e){var t=dr.getArg(e,"generated"),n=dr.getArg(e,"original",null),r=dr.getArg(e,"source",null),s=dr.getArg(e,"name",null);(this._skipValidation||!1!==this._validateMapping(t,n,r,s))&&(null!=r&&(r=String(r),this._sources.has(r)||this._sources.add(r)),null!=s&&(s=String(s),this._names.has(s)||this._names.add(s)),this._mappings.add({generatedLine:t.line,generatedColumn:t.column,originalLine:null!=n&&n.line,originalColumn:null!=n&&n.column,source:r,name:s}))},yr.prototype.setSourceContent=function(e,t){var n=e
null!=this._sourceRoot&&(n=dr.relative(this._sourceRoot,n)),null!=t?(this._sourcesContents||(this._sourcesContents=Object.create(null)),this._sourcesContents[dr.toSetString(n)]=t):this._sourcesContents&&(delete this._sourcesContents[dr.toSetString(n)],0===Object.keys(this._sourcesContents).length&&(this._sourcesContents=null))},yr.prototype.applySourceMap=function(e,t,n){var r=t
if(null==t){if(null==e.file)throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map\'s "file" property. Both were omitted.')
r=e.file}var s=this._sourceRoot
null!=s&&(r=dr.relative(s,r))
var i=new mr,o=new mr
this._mappings.unsortedForEach(function(t){if(t.source===r&&null!=t.originalLine){var a=e.originalPositionFor({line:t.originalLine,column:t.originalColumn})
null!=a.source&&(t.source=a.source,null!=n&&(t.source=dr.join(n,t.source)),null!=s&&(t.source=dr.relative(s,t.source)),t.originalLine=a.line,t.originalColumn=a.column,null!=a.name&&(t.name=a.name))}var l=t.source
null==l||i.has(l)||i.add(l)
var c=t.name
null==c||o.has(c)||o.add(c)},this),this._sources=i,this._names=o,e.sources.forEach(function(t){var r=e.sourceContentFor(t)
null!=r&&(null!=n&&(t=dr.join(n,t)),null!=s&&(t=dr.relative(s,t)),this.setSourceContent(t,r))},this)},yr.prototype._validateMapping=function(e,t,n,r){if(t&&"number"!=typeof t.line&&"number"!=typeof t.column){var s="original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values."
if(this._ignoreInvalidMapping)return"undefined"!=typeof console&&console.warn&&console.warn(s),!1
throw new Error(s)}if((!(e&&"line"in e&&"column"in e&&e.line>0&&e.column>=0)||t||n||r)&&!(e&&"line"in e&&"column"in e&&t&&"line"in t&&"column"in t&&e.line>0&&e.column>=0&&t.line>0&&t.column>=0&&n)){s="Invalid mapping: "+JSON.stringify({generated:e,source:n,original:t,name:r})
if(this._ignoreInvalidMapping)return"undefined"!=typeof console&&console.warn&&console.warn(s),!1
throw new Error(s)}},yr.prototype._serializeMappings=function(){for(var e,t,n,r,s=0,i=1,o=0,a=0,l=0,c=0,u="",h=this._mappings.toArray(),f=0,p=h.length;f<p;f++){if(e="",(t=h[f]).generatedLine!==i)for(s=0;t.generatedLine!==i;)e+=";",i++
else if(f>0){if(!dr.compareByGeneratedPositionsInflated(t,h[f-1]))continue
e+=","}e+=pr.encode(t.generatedColumn-s),s=t.generatedColumn,null!=t.source&&(r=this._sources.indexOf(t.source),e+=pr.encode(r-c),c=r,e+=pr.encode(t.originalLine-1-a),a=t.originalLine-1,e+=pr.encode(t.originalColumn-o),o=t.originalColumn,null!=t.name&&(n=this._names.indexOf(t.name),e+=pr.encode(n-l),l=n)),u+=e}return u},yr.prototype._generateSourcesContent=function(e,t){return e.map(function(e){if(!this._sourcesContents)return null
null!=t&&(e=dr.relative(t,e))
var n=dr.toSetString(e)
return Object.prototype.hasOwnProperty.call(this._sourcesContents,n)?this._sourcesContents[n]:null},this)},yr.prototype.toJSON=function(){var e={version:this._version,sources:this._sources.toArray(),names:this._names.toArray(),mappings:this._serializeMappings()}
return null!=this._file&&(e.file=this._file),null!=this._sourceRoot&&(e.sourceRoot=this._sourceRoot),this._sourcesContents&&(e.sourcesContent=this._generateSourcesContent(e.sources,e.sourceRoot)),e},yr.prototype.toString=function(){return JSON.stringify(this.toJSON())}
var br=yr
const kr=new Set(["Atrule","Selector","Declaration"])
const vr=(e,t)=>{if(9===e&&(e=t),"string"==typeof e){const t=e.charCodeAt(0)
return t>0x7F?0x8000:t<<8}return e},Sr=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,Vt],[1,$t],[1,Yt],[1,Ht],[1,tn],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,Vt],[3,$t],[3,Yt],[3,Ht],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,Vt],[4,$t],[4,Yt],[4,Ht],[Yt,1],[Yt,2],[Yt,7],[Yt,8],[Yt,"-"],[Yt,Vt],[Yt,$t],[Yt,Yt],[Yt,Ht],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",Vt],["#",$t],["#",Yt],["#",Ht],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",Vt],["-",$t],["-",Yt],["-",Ht],[Vt,1],[Vt,2],[Vt,7],[Vt,8],[Vt,Vt],[Vt,$t],[Vt,Yt],[Vt,"%"],[Vt,Ht],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",Ht],[".",Vt],[".",$t],[".",Yt],["+",Vt],["+",$t],["+",Yt],["/","*"]],wr=Sr.concat([[1,4],[Yt,4],[4,4],[3,tn],[3,5],[3,Qt],[$t,$t],[$t,Yt],[$t,2],[$t,"-"],[nn,1],[nn,2],[nn,$t],[nn,Yt],[nn,4],[nn,"-"]])
function xr(e){const t=new Set(e.map(([e,t])=>vr(e)<<16|vr(t)))
return function(e,n,r){const s=vr(n,r),i=r.charCodeAt(0)
return(45===i&&1!==n&&2!==n&&n!==Ht||43===i?t.has(e<<16|i<<8):t.has(e<<16|s))&&this.emit(" ",Xt,!0),s}}const Cr=xr(Sr),Ar=xr(wr)
var _r=Object.freeze({__proto__:null,safe:Ar,spec:Cr})
function Tr(e,t){if("function"==typeof t){let n=null
return e.children.forEach(e=>{null!==n&&t.call(this,n),this.node(e),n=e}),void 0}e.children.forEach(this.node,this)}function Er(e){Un(e,(t,n,r)=>{this.token(t,e.slice(n,r))})}function Or(e){const t=new Map
for(let[n,r]of Object.entries(e.node)){"function"==typeof(r.generate||r)&&t.set(n,r.generate||r)}return function(e,n){let r="",s=0,i={node(e){if(!t.has(e.type))throw new Error("Unknown node type: "+e.type)
t.get(e.type).call(o,e)},tokenBefore:Ar,token(e,t){s=this.tokenBefore(s,e,t),this.emit(t,e,!1),9===e&&92===t.charCodeAt(0)&&this.emit("\n",Xt,!0)},emit(e){r+=e},result:()=>r}
n&&("function"==typeof n.decorator&&(i=n.decorator(i)),n.sourceMap&&(i=function(e){const t=new br,n={line:1,column:0},r={line:0,column:0},s={line:1,column:0},i={generated:s}
let o=1,a=0,l=!1
const c=e.node
e.node=function(e){if(e.loc&&e.loc.start&&kr.has(e.type)){const c=e.loc.start.line,u=e.loc.start.column-1
r.line===c&&r.column===u||(r.line=c,r.column=u,n.line=o,n.column=a,l&&(l=!1,n.line===s.line&&n.column===s.column||t.addMapping(i)),l=!0,t.addMapping({source:e.loc.source,original:r,generated:n}))}c.call(this,e),l&&kr.has(e.type)&&(s.line=o,s.column=a)}
const u=e.emit
e.emit=function(e,t,n){for(let t=0;t<e.length;t++)10===e.charCodeAt(t)?(o++,a=0):a++
u(e,t,n)}
const h=e.result
return e.result=function(){return l&&t.addMapping(i),{css:h(),map:t}},e}(i)),n.mode in _r&&(i.tokenBefore=_r[n.mode]))
const o={node:e=>i.node(e),children:Tr,token:(e,t)=>i.token(e,t),tokenize:Er}
return i.node(e),i.result()}}const{hasOwnProperty:Pr}=Object.prototype,Lr=function(){}
function Nr(e){return"function"==typeof e?e:Lr}function Dr(e,t){return function(n,r,s){n.type===t&&e.call(this,n,r,s)}}function Mr(e,t){const n=t.structure,r=[]
for(const e in n){if(!1===Pr.call(n,e))continue
let t=n[e]
const s={name:e,type:!1,nullable:!1}
Array.isArray(t)||(t=[t])
for(const e of t)null===e?s.nullable=!0:"string"==typeof e?s.type="node":Array.isArray(e)&&(s.type="list")
s.type&&r.push(s)}return r.length?{context:t.walkContext,fields:r}:null}function jr(e,t){const n=e.fields.slice(),r=e.context,s="string"==typeof r
return t&&n.reverse(),function(e,i,o,a){let l
s&&(l=i[r],i[r]=e)
for(const r of n){const n=e[r.name]
if(!r.nullable||n)if("list"===r.type){if(t?n.reduceRight(a,!1):n.reduce(a,!1))return!0}else if(o(n))return!0}s&&(i[r]=l)}}function Ir({StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:s}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Rule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Declaration:{StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:s}}}function Rr(e){const t=function(e){const t={}
for(const n in e.node)if(Pr.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=Mr(0,r)}return t}(e),n={},r={},s=Symbol("break-walk"),i=Symbol("skip-node")
for(const e in t)Pr.call(t,e)&&null!==t[e]&&(n[e]=jr(t[e],!1),r[e]=jr(t[e],!0))
const o=Ir(n),a=Ir(r),l=function(e,l){function c(e,t,n){const r=u.call(d,e,t,n)
return r===s||r!==i&&(!(!f.hasOwnProperty(e.type)||!f[e.type](e,d,c,p))||h.call(d,e,t,n)===s)}let u=Lr,h=Lr,f=n,p=(e,t,n,r)=>e||c(t,n,r)
const d={break:s,skip:i,root:e,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null}
if("function"==typeof l)u=l
else if(l&&(u=Nr(l.enter),h=Nr(l.leave),l.reverse&&(f=r),l.visit)){if(o.hasOwnProperty(l.visit))f=l.reverse?a[l.visit]:o[l.visit]
else if(!t.hasOwnProperty(l.visit))throw new Error("Bad value `"+l.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")")
u=Dr(u,l.visit),h=Dr(h,l.visit)}if(u===Lr&&h===Lr)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
c(e)}
return l.break=s,l.skip=i,l.find=function(e,t){let n=null
return l(e,function(e,r,i){if(t.call(this,e,r,i))return n=e,s}),n},l.findLast=function(e,t){let n=null
return l(e,{reverse:!0,enter(e,r,i){if(t.call(this,e,r,i))return n=e,s}}),n},l.findAll=function(e,t){const n=[]
return l(e,function(e,r,s){t.call(this,e,r,s)&&n.push(e)}),n},l}function Fr(e){return e}function zr(e,t,n,r){let s
switch(e.type){case"Group":s=function(e,t,n,r){const s=" "===e.combinator||r?e.combinator:" "+e.combinator+" ",i=e.terms.map(e=>zr(e,t,n,r)).join(s)
return e.explicit||n?(r||","===i[0]?"[":"[ ")+i+(r?"]":" ]"):i}(e,t,n,r)+(e.disallowEmpty?"!":"")
break
case"Multiplier":return zr(e.term,t,n,r)+t(function(e){const{min:t,max:n,comma:r}=e
return 0===t&&0===n?r?"#?":"*":0===t&&1===n?"?":1===t&&0===n?r?"#":"+":1===t&&1===n?"":(r?"#":"")+(t===n?"{"+t+"}":"{"+t+","+(0!==n?n:"")+"}")}(e),e)
case"Boolean":s="<boolean-expr["+zr(e.term,t,n,r)+"]>"
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
default:throw new Error("Unknown node type `"+e.type+"`")}return t(s,e)}function Gr(e,t){let n=Fr,r=!1,s=!1
return"function"==typeof t?n=t:t&&(r=Boolean(t.forceBraces),s=Boolean(t.compact),"function"==typeof t.decorate&&(n=t.decorate)),zr(e,n,r,s)}const Br={offset:0,line:1,column:1}
function Ur(e,t){const n=e&&e.loc&&e.loc[t]
return n?"line"in n?qr(n):n:null}function qr({offset:e,line:t,column:n},r){const s={offset:e,line:t,column:n}
if(r){const e=r.split(/\n|\r\n?|\f/)
s.offset+=r.length,s.line+=e.length-1,s.column=1===e.length?s.column+r.length:e.pop().length+1}return s}const Wr=function(e,t){const n=Vn("SyntaxReferenceError",e+(t?" `"+t+"`":""))
return n.reference=t,n},Vr=function(e,t,n,r){const s=Vn("SyntaxMatchError",e),{css:i,mismatchOffset:o,mismatchLength:a,start:l,end:c}=function(e,t){const n=e.tokens,r=e.longestMatch,s=r<n.length&&n[r].node||null,i=s!==t?s:null
let o,a,l=0,c=0,u=0,h=""
for(let e=0;e<n.length;e++){const t=n[e].value
e===r&&(c=t.length,l=h.length),null!==i&&n[e].node===i&&(e<=r?u++:u=0),h+=t}return r===n.length||u>1?(o=Ur(i||t,"end")||qr(Br,h),a=qr(o)):(o=Ur(i,"start")||qr(Ur(t,"start")||Br,h.slice(0,l)),a=Ur(i,"end")||qr(o,h.substr(l,c))),{css:h,mismatchOffset:l,mismatchLength:c,start:o,end:a}}(r,n)
return s.rawMessage=e,s.syntax=t?Gr(t):"<generic>",s.css=i,s.mismatchOffset=o,s.mismatchLength=a,s.message=e+"\n  syntax: "+s.syntax+"\n   value: "+(i||"<empty string>")+"\n  --------"+new Array(s.mismatchOffset+1).join("-")+"^",Object.assign(s,l),s.loc={source:n&&n.loc&&n.loc.source||"<unknown>",start:l,end:c},s},$r=new Map,Yr=new Map,Xr=function(e){if($r.has(e))return $r.get(e)
const t=e.toLowerCase()
let n=$r.get(t)
if(void 0===n){const e=Qr(t,0),r=e?"":Kr(t,0)
n=Object.freeze({basename:t.substr(r.length),name:t,prefix:r,vendor:r,custom:e})}return $r.set(e,n),n},Hr=function(e){if(Yr.has(e))return Yr.get(e)
let t=e,n=e[0]
"/"===n?n="/"===e[1]?"//":"/":"_"!==n&&"*"!==n&&"$"!==n&&"#"!==n&&"+"!==n&&"&"!==n&&(n="")
const r=Qr(t,n.length)
if(!r&&(t=t.toLowerCase(),Yr.has(t))){const n=Yr.get(t)
return Yr.set(e,n),n}const s=r?"":Kr(t,n.length),i=t.substr(0,n.length+s.length),o=Object.freeze({basename:t.substr(i.length),name:t.substr(n.length),hack:n,vendor:s,prefix:i,custom:r})
return Yr.set(e,o),o}
function Qr(e,t){return t=t||0,e.length-t>=2&&45===e.charCodeAt(t)&&45===e.charCodeAt(t+1)}function Kr(e,t){if(t=t||0,e.length-t>=3&&45===e.charCodeAt(t)&&45!==e.charCodeAt(t+1)){const n=e.indexOf("-",t+2)
if(-1!==n)return e.substring(t,n+1)}return""}const Zr=["initial","inherit","unset","revert","revert-layer"],Jr=0x002D,es=!0
function ts(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function ns(e,t,n){for(;null!==e&&(e.type===Xt||e.type===on);)e=n(++t)
return t}function rs(e,t,n,r){if(!e)return 0
const s=e.value.charCodeAt(t)
if(43===s||s===Jr){if(n)return 0
t++}for(;t<e.value.length;t++)if(!an(e.value.charCodeAt(t)))return 0
return r+1}function ss(e,t,n){let r=!1,s=ns(e,t,n)
if(null===(e=n(s)))return t
if(e.type!==Vt){if(!ts(e,43)&&!ts(e,Jr))return t
if(r=!0,s=ns(n(++s),s,n),null===(e=n(s))||e.type!==Vt)return 0}if(!r){const t=e.value.charCodeAt(0)
if(43!==t&&t!==Jr)return 0}return rs(e,r?0:1,r,s)}function is(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function os(e,t,n){let r=0
for(let s=t;s<e.value.length;s++){const i=e.value.charCodeAt(s)
if(45===i&&n&&0!==r)return os(e,t+r+1,!1),6
if(!ln(i))return 0
if(++r>6)return 0}return r}function as(e,t,n){if(!e)return 0
for(;is(n(t),63);){if(++e>6)return 0
t++}return t}const ls=["calc(","-moz-calc(","-webkit-calc("],cs=new Map([[2,nn],[tn,nn],[Jt,en],[rn,sn]])
function us(e,t){return t<e.length?e.charCodeAt(t):0}function hs(e,t){return An(e,0,e.length,t)}function fs(e,t){for(let n=0;n<t.length;n++)if(hs(e,t[n]))return!0
return!1}function ps(e,t){return t===e.length-2&&(0x005C===us(e,t)&&an(us(e,t+1)))}function ds(e,t,n){if(e&&"Range"===e.type){const r=Number(void 0!==n&&n!==t.length?t.substr(0,n):t)
if(isNaN(r))return!0
if(null!==e.min&&r<e.min&&"string"!=typeof e.min)return!0
if(null!==e.max&&r>e.max&&"string"!=typeof e.max)return!0}return!1}function ms(e){return function(t,n,r){return null===t?0:2===t.type&&fs(t.value,ls)?function(e,t){let n=0,r=[],s=0
e:do{switch(e.type){case sn:case nn:case en:if(e.type!==n)break e
if(n=r.pop(),0===r.length){s++
break e}break
case 2:case tn:case Jt:case rn:r.push(n),n=cs.get(e.type)}s++}while(e=t(s))
return s}(t,n):e(t,n,r)}}function gs(e){return function(t){return null===t||t.type!==e?0:1}}function ys(e){return null===e||1!==e.type||0x002D!==us(e.value,0)||0x002D!==us(e.value,1)?0:1}function bs(e){return e&&(e=new Set(e)),function(t,n,r){if(null===t||t.type!==Yt)return 0
const s=Pn(t.value,0)
if(null!==e){const n=t.value.indexOf("\\",s),r=-1!==n&&ps(t.value,n)?t.value.substring(s,n):t.value.substr(s)
if(!1===e.has(r.toLowerCase()))return 0}return ds(r,t.value,s)?0:1}}function ks(e){return"function"!=typeof e&&(e=function(){return 0}),function(t,n,r){return null!==t&&t.type===Vt&&0===Number(t.value)?1:e(t,n,r)}}const vs={"ident-token":gs(1),"function-token":gs(2),"at-keyword-token":gs(3),"hash-token":gs(4),"string-token":gs(5),"bad-string-token":gs(6),"url-token":gs(7),"bad-url-token":gs(8),"delim-token":gs(9),"number-token":gs(Vt),"percentage-token":gs($t),"dimension-token":gs(Yt),"whitespace-token":gs(Xt),"CDO-token":gs(14),"CDC-token":gs(Ht),"colon-token":gs(Qt),"semicolon-token":gs(Kt),"comma-token":gs(Zt),"[-token":gs(Jt),"]-token":gs(en),"(-token":gs(tn),")-token":gs(nn),"{-token":gs(rn),"}-token":gs(sn)},Ss={string:gs(5),ident:gs(1),percentage:ms(function(e,t,n){return null===e||e.type!==$t||ds(n,e.value,e.value.length-1)?0:1}),zero:ks(),number:ms(function(e,t,n){if(null===e)return 0
const r=Pn(e.value,0)
return r===e.value.length||ps(e.value,r)?ds(n,e.value,r)?0:1:0}),integer:ms(function(e,t,n){if(null===e||e.type!==Vt)return 0
let r=0x002B===us(e.value,0)||0x002D===us(e.value,0)?1:0
for(;r<e.value.length;r++)if(!an(us(e.value,r)))return 0
return ds(n,e.value,r)?0:1}),"custom-ident":function(e){if(null===e||1!==e.type)return 0
const t=e.value.toLowerCase()
return fs(t,Zr)||hs(t,"default")?0:1},"dashed-ident":ys,"custom-property-name":function(e){return ys(e)?"--"===e.value?0:1:0},"hex-color":function(e){if(null===e||4!==e.type)return 0
const t=e.value.length
if(4!==t&&5!==t&&7!==t&&9!==t)return 0
for(let n=1;n<t;n++)if(!ln(us(e.value,n)))return 0
return 1},"id-selector":function(e){return null===e||4!==e.type?0:gn(us(e.value,1),us(e.value,2),us(e.value,3))?1:0},"an-plus-b":function(e,t){let n=0
if(!e)return 0
if(e.type===Vt)return rs(e,0,false,n)
if(1===e.type&&e.value.charCodeAt(0)===Jr){if(!Cn(e.value,1,110))return 0
switch(e.value.length){case 2:return ss(t(++n),n,t)
case 3:return e.value.charCodeAt(2)!==Jr?0:(n=ns(t(++n),n,t),rs(e=t(n),0,es,n))
default:return e.value.charCodeAt(2)!==Jr?0:rs(e,3,es,n)}}else if(1===e.type||ts(e,43)&&1===t(n+1).type){if(1!==e.type&&(e=t(++n)),null===e||!Cn(e.value,0,110))return 0
switch(e.value.length){case 1:return ss(t(++n),n,t)
case 2:return e.value.charCodeAt(1)!==Jr?0:(n=ns(t(++n),n,t),rs(e=t(n),0,es,n))
default:return e.value.charCodeAt(1)!==Jr?0:rs(e,2,es,n)}}else if(e.type===Yt){let r=e.value.charCodeAt(0),s=43===r||r===Jr?1:0,i=s
for(;i<e.value.length&&an(e.value.charCodeAt(i));i++);return i===s?0:Cn(e.value,i,110)?i+1===e.value.length?ss(t(++n),n,t):e.value.charCodeAt(i+1)!==Jr?0:i+2===e.value.length?(n=ns(t(++n),n,t),rs(e=t(n),0,es,n)):rs(e,i+2,es,n):0}return 0},urange:function(e,t){let n=0
if(null===e||1!==e.type||!Cn(e.value,0,117))return 0
if(null===(e=t(++n)))return 0
if(is(e,43))return null===(e=t(++n))?0:1===e.type?as(os(e,0,!0),++n,t):is(e,63)?as(1,++n,t):0
if(e.type===Vt){const r=os(e,1,!0)
return 0===r?0:null===(e=t(++n))?n:e.type===Yt||e.type===Vt?function(e,t){return e.value.charCodeAt(0)===t}(e,45)&&os(e,1,!1)?n+1:0:as(r,n,t)}return e.type===Yt?as(os(e,1,!0),++n,t):0},"declaration-value":function(e,t){if(!e)return 0
let n=0,r=[],s=0
e:do{switch(e.type){case 6:case 8:break e
case sn:case nn:case en:if(e.type!==n)break e
n=r.pop()
break
case Kt:if(0===n)break e
break
case 9:if(0===n&&"!"===e.value)break e
break
case 2:case tn:case Jt:case rn:r.push(n),n=cs.get(e.type)}s++}while(e=t(s))
return s},"any-value":function(e,t){if(!e)return 0
let n=0,r=[],s=0
e:do{switch(e.type){case 6:case 8:break e
case sn:case nn:case en:if(e.type!==n)break e
n=r.pop()
break
case 2:case tn:case Jt:case rn:r.push(n),n=cs.get(e.type)}s++}while(e=t(s))
return s}}
function ws(e){const{angle:t,decibel:n,frequency:r,flex:s,length:i,resolution:o,semitones:a,time:l}=e||{}
return{dimension:ms(bs(null)),angle:ms(bs(t)),decibel:ms(bs(n)),frequency:ms(bs(r)),flex:ms(bs(s)),length:ms(ks(bs(i))),resolution:ms(bs(o)),semitones:ms(bs(a)),time:ms(bs(l))}}var xs=Object.freeze({__proto__:null,angle:["deg","grad","rad","turn"],decibel:["db"],flex:["fr"],frequency:["hz","khz"],length:["cm","mm","q","in","pt","pc","px","em","rem","ex","rex","cap","rcap","ch","rch","ic","ric","lh","rlh","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax","cqw","cqh","cqi","cqb","cqmin","cqmax"],resolution:["dpi","dpcm","dppx","x"],semitones:["st"],time:["s","ms"]})
function Cs(e,t,n){return Object.assign(Vn("SyntaxError",e),{input:t,offset:n,rawMessage:e,message:e+"\n  "+t+"\n--"+new Array((n||t.length)+1).join("-")+"^"})}const As=new Uint8Array(128).map((e,t)=>/[a-zA-Z0-9\-]/.test(String.fromCharCode(t))?1:0)
class _s{constructor(e){this.str=e,this.pos=0}charCodeAt(e){return e<this.str.length?this.str.charCodeAt(e):0}charCode(){return this.charCodeAt(this.pos)}isNameCharCode(e=this.charCode()){return e<128&&1===As[e]}nextCharCode(){return this.charCodeAt(this.pos+1)}nextNonWsCode(e){return this.charCodeAt(this.findWsEnd(e))}skipWs(){this.pos=this.findWsEnd(this.pos)}findWsEnd(e){for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(13!==t&&10!==t&&12!==t&&32!==t&&9!==t)break}return e}substringToPos(e){return this.str.substring(this.pos,this.pos=e)}eat(e){this.charCode()!==e&&this.error("Expect `"+String.fromCharCode(e)+"`"),this.pos++}peek(){return this.pos<this.str.length?this.str.charAt(this.pos++):""}error(e){throw new Cs(e,this.str,this.pos)}scanSpaces(){return this.substringToPos(this.findWsEnd(this.pos))}scanWord(){let e=this.pos
for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(t>=128||0===As[t])break}return this.pos===e&&this.error("Expect a keyword"),this.substringToPos(e)}scanNumber(){let e=this.pos
for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(t<48||t>57)break}return this.pos===e&&this.error("Expect a number"),this.substringToPos(e)}scanString(){const e=this.str.indexOf("'",this.pos+1)
return-1===e&&(this.pos=this.str.length,this.error("Expect an apostrophe")),this.substringToPos(e+1)}}const Ts=123,Es={" ":1,"&&":2,"||":3,"|":4}
function Os(e){let t=null,n=null
return e.eat(Ts),e.skipWs(),t=e.scanNumber(e),e.skipWs(),44===e.charCode()?(e.pos++,e.skipWs(),125!==e.charCode()&&(n=e.scanNumber(e),e.skipWs())):n=t,e.eat(125),{min:Number(t),max:n?Number(n):0}}function Ps(e,t){const n=function(e){let t=null,n=!1
switch(e.charCode()){case 42:e.pos++,t={min:0,max:0}
break
case 43:e.pos++,t={min:1,max:0}
break
case 63:e.pos++,t={min:0,max:1}
break
case 35:e.pos++,n=!0,e.charCode()===Ts?t=Os(e):63===e.charCode()?(e.pos++,t={min:0,max:0}):t={min:1,max:0}
break
case Ts:t=Os(e)
break
default:return null}return{type:"Multiplier",comma:n,min:t.min,max:t.max,term:null}}(e)
return null!==n?(n.term=t,35===e.charCode()&&43===e.charCodeAt(e.pos-1)?Ps(e,n):n):t}function Ls(e){const t=e.peek()
return""===t?null:Ps(e,{type:"Token",value:t})}function Ns(e){let t,n=null
if(e.eat(60),t=e.scanWord(),"boolean-expr"===t){e.eat(91)
const t=Ms(e,93)
return e.eat(93),e.eat(62),Ps(e,{type:"Boolean",term:1===t.terms.length?t.terms[0]:t})}return 40===e.charCode()&&41===e.nextCharCode()&&(e.pos+=2,t+="()"),91===e.charCodeAt(e.findWsEnd(e.pos))&&(e.skipWs(),n=function(e){let t=null,n=null,r=1
return e.eat(91),45===e.charCode()&&(e.peek(),r=-1),-1==r&&8734===e.charCode()?e.peek():(t=r*Number(e.scanNumber(e)),e.isNameCharCode()&&(t+=e.scanWord())),e.skipWs(),e.eat(44),e.skipWs(),8734===e.charCode()?e.peek():(r=1,45===e.charCode()&&(e.peek(),r=-1),n=r*Number(e.scanNumber(e)),e.isNameCharCode()&&(n+=e.scanWord())),e.eat(93),{type:"Range",min:t,max:n}}(e)),e.eat(62),Ps(e,{type:"Type",name:t,opts:n})}function Ds(e,t){function n(e,t){return{type:"Group",terms:e,combinator:t,disallowEmpty:!1,explicit:!1}}let r
for(t=Object.keys(t).sort((e,t)=>Es[e]-Es[t]);t.length>0;){r=t.shift()
let s=0,i=0
for(;s<e.length;s++){const t=e[s]
"Combinator"===t.type&&(t.value===r?(-1===i&&(i=s-1),e.splice(s,1),s--):(-1!==i&&s-i>1&&(e.splice(i,s-i,n(e.slice(i,s),r)),s=i+1),i=-1))}-1!==i&&t.length&&e.splice(i,s-i,n(e.slice(i,s),r))}return r}function Ms(e,t){const n=Object.create(null),r=[]
let s,i=null,o=e.pos
for(;e.charCode()!==t&&(s=js(e,t));)"Spaces"!==s.type&&("Combinator"===s.type?(null!==i&&"Combinator"!==i.type||(e.pos=o,e.error("Unexpected combinator")),n[s.value]=!0):null!==i&&"Combinator"!==i.type&&(n[" "]=!0,r.push({type:"Combinator",value:" "})),r.push(s),i=s,o=e.pos)
return null!==i&&"Combinator"===i.type&&(e.pos-=o,e.error("Unexpected combinator")),{type:"Group",terms:r,combinator:Ds(r,n)||" ",disallowEmpty:!1,explicit:!1}}function js(e,t){let n=e.charCode()
switch(n){case 93:break
case 91:return Ps(e,function(e,t){let n
return e.eat(91),n=Ms(e,t),e.eat(93),n.explicit=!0,33===e.charCode()&&(e.pos++,n.disallowEmpty=!0),n}(e,t))
case 60:return 39===e.nextCharCode()?function(e){let t
return e.eat(60),e.eat(39),t=e.scanWord(),e.eat(39),e.eat(62),Ps(e,{type:"Property",name:t})}(e):Ns(e)
case 124:return{type:"Combinator",value:e.substringToPos(e.pos+(124===e.nextCharCode()?2:1))}
case 38:return e.pos++,e.eat(38),{type:"Combinator",value:"&&"}
case 44:return e.pos++,{type:"Comma"}
case 39:return Ps(e,{type:"String",value:e.scanString()})
case 32:case 9:case 10:case 13:case 12:return{type:"Spaces",value:e.scanSpaces()}
case 64:return n=e.nextCharCode(),e.isNameCharCode(n)?(e.pos++,{type:"AtKeyword",name:e.scanWord()}):Ls(e)
case 42:case 43:case 63:case 35:case 33:break
case Ts:if(n=e.nextCharCode(),n<48||n>57)return Ls(e)
break
default:return e.isNameCharCode(n)?function(e){const t=e.scanWord()
return 40===e.charCode()?(e.pos++,{type:"Function",name:t}):Ps(e,{type:"Keyword",name:t})}(e):Ls(e)}}function Is(e){const t=new _s(e),n=Ms(t)
return t.pos!==e.length&&t.error("Unexpected input"),1===n.terms.length&&"Group"===n.terms[0].type?n.terms[0]:n}const Rs=function(){}
function Fs(e){return"function"==typeof e?e:Rs}const zs={decorator(e){const t=[]
let n=null
return{...e,node(t){const r=n
n=t,e.node.call(this,t),n=r},emit(e,r,s){t.push({type:r,value:e,node:s?null:n})},result:()=>t}}}
function Gs(e,t){return"string"==typeof e?function(e){const t=[]
return Un(e,(n,r,s)=>t.push({type:n,value:e.slice(r,s),node:null})),t}(e):t.generate(e,zs)}const Bs={type:"Match"},Us={type:"Mismatch"},qs={type:"DisallowEmpty"}
function Ws(e,t,n){return t===Bs&&n===Us||e===Bs&&t===Bs&&n===Bs?e:("If"===e.type&&e.else===Us&&t===Bs&&(t=e.then,e=e.match),{type:"If",match:e,then:t,else:n})}function Vs(e){return e.length>2&&40===e.charCodeAt(e.length-2)&&41===e.charCodeAt(e.length-1)}function $s(e){return"Keyword"===e.type||"AtKeyword"===e.type||"Function"===e.type||"Type"===e.type&&Vs(e.name)}function Ys(e,t=" ",n=!1){return{type:"Group",terms:e,combinator:t,disallowEmpty:!1,explicit:n}}function Xs(e,t,n=new Set){if(!n.has(e))switch(n.add(e),e.type){case"If":e.match=Xs(e.match,t,n),e.then=Xs(e.then,t,n),e.else=Xs(e.else,t,n)
break
case"Type":return t[e.name]||e}return e}function Hs(e,t,n){switch(e){case" ":{let e=Bs
for(let n=t.length-1;n>=0;n--){e=Ws(t[n],e,Us)}return e}case"|":{let e=Us,n=null
for(let r=t.length-1;r>=0;r--){let s=t[r]
if($s(s)&&(null===n&&r>0&&$s(t[r-1])&&(n=Object.create(null),e=Ws({type:"Enum",map:n},Bs,e)),null!==n)){const e=(Vs(s.name)?s.name.slice(0,-1):s.name).toLowerCase()
if(e in n==!1){n[e]=s
continue}}n=null,e=Ws(s,Bs,e)}return e}case"&&":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!0}
let n=Us
for(let r=t.length-1;r>=0;r--){const s=t[r]
let i
i=t.length>1?Hs(e,t.filter(function(e){return e!==s}),!1):Bs,n=Ws(s,i,n)}return n}case"||":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!1}
let r=n?Bs:Us
for(let n=t.length-1;n>=0;n--){const s=t[n]
let i
i=t.length>1?Hs(e,t.filter(function(e){return e!==s}),!0):Bs,r=Ws(s,i,r)}return r}}}function Qs(e){if("function"==typeof e)return{type:"Generic",fn:e}
switch(e.type){case"Group":{let t=Hs(e.combinator,e.terms.map(Qs),!1)
return e.disallowEmpty&&(t=Ws(t,qs,Us)),t}case"Multiplier":return function(e){let t=Bs,n=Qs(e.term)
if(0===e.max)n=Ws(n,qs,Us),t=Ws(n,null,Us),t.then=Ws(Bs,Bs,t),e.comma&&(t.then.else=Ws({type:"Comma",syntax:e},t,Us))
else for(let r=e.min||1;r<=e.max;r++)e.comma&&t!==Bs&&(t=Ws({type:"Comma",syntax:e},t,Us)),t=Ws(n,Ws(Bs,Bs,t),Us)
if(0===e.min)t=Ws(Bs,Bs,t)
else for(let r=0;r<e.min-1;r++)e.comma&&t!==Bs&&(t=Ws({type:"Comma",syntax:e},t,Us)),t=Ws(n,t,Us)
return t}(e)
case"Boolean":{const t=Qs(e.term),n=Qs(Ys([Ys([{type:"Keyword",name:"not"},{type:"Type",name:"!boolean-group"}]),Ys([{type:"Type",name:"!boolean-group"},Ys([{type:"Multiplier",comma:!1,min:0,max:0,term:Ys([{type:"Keyword",name:"and"},{type:"Type",name:"!boolean-group"}])},{type:"Multiplier",comma:!1,min:0,max:0,term:Ys([{type:"Keyword",name:"or"},{type:"Type",name:"!boolean-group"}])}],"|")])],"|")),r=Qs(Ys([{type:"Type",name:"!term"},Ys([{type:"Token",value:"("},{type:"Type",name:"!self"},{type:"Token",value:")"}]),{type:"Type",name:"general-enclosed"}],"|"))
return Xs(r,{"!term":t,"!self":n}),Xs(n,{"!boolean-group":r}),n}case"Type":case"Property":return{type:e.type,name:e.name,syntax:e}
case"Keyword":return{type:e.type,name:e.name.toLowerCase(),syntax:e}
case"AtKeyword":return{type:e.type,name:"@"+e.name.toLowerCase(),syntax:e}
case"Function":return{type:e.type,name:e.name.toLowerCase()+"(",syntax:e}
case"String":return 3===e.value.length?{type:"Token",value:e.value.charAt(1),syntax:e}:{type:e.type,value:e.value.substr(1,e.value.length-2).replace(/\\'/g,"'"),syntax:e}
case"Token":return{type:e.type,value:e.value,syntax:e}
case"Comma":return{type:e.type,syntax:e}
default:throw new Error("Unknown node type:",e.type)}}function Ks(e,t){return"string"==typeof e&&(e=Is(e)),{type:"MatchGraph",match:Qs(e),syntax:t||null,source:e}}const{hasOwnProperty:Zs}=Object.prototype,Js="Match"
function ei(e,t){if(e.length!==t.length)return!1
for(let n=0;n<e.length;n++){const r=t.charCodeAt(n)
let s=e.charCodeAt(n)
if(s>=0x0041&&s<=0x005A&&(s|=32),s!==r)return!1}return!0}function ti(e){return null===e||(e.type===Zt||2===e.type||e.type===tn||e.type===Jt||e.type===rn||function(e){return 9===e.type&&"?"!==e.value}(e))}function ni(e){return null===e||(e.type===nn||e.type===en||e.type===sn||9===e.type&&"/"===e.value)}function ri(e,t,n){const r=function(e,t,n){function r(){do{b++,y=b<e.length?e[b]:null}while(null!==y&&(y.type===Xt||y.type===on))}function s(t){const n=b+t
return n<e.length?e[n]:null}function i(e,t){return{nextState:e,matchStack:v,syntaxStack:h,thenStack:f,tokenIndex:b,prev:t}}function o(e){f={nextState:e,matchStack:v,syntaxStack:h,prev:f}}function a(e){p=i(e,p)}function l(){v={type:1,syntax:t.syntax,token:y,prev:v},r(),d=null,b>k&&(k=b)}function c(){h={syntax:t.syntax,opts:t.syntax.opts||null!==h&&h.opts||null,prev:h},v={type:2,syntax:t.syntax,token:v.token,prev:v}}function u(){v=2===v.type?v.prev:{type:3,syntax:h.syntax,token:v.token,prev:v},h=h.prev}let h=null,f=null,p=null,d=null,m=0,g=null,y=null,b=-1,k=0,v={type:0,syntax:null,token:null,prev:null}
for(r();null===g&&++m<15e3;)switch(t.type){case"Match":if(null===f){if(null!==y&&(b!==e.length-1||"\\0"!==y.value&&"\\9"!==y.value)){t=Us
break}g=Js
break}if((t=f.nextState)===qs){if(f.matchStack===v){t=Us
break}t=Bs}for(;f.syntaxStack!==h;)u()
f=f.prev
break
case"Mismatch":if(null!==d&&!1!==d)(null===p||b>p.tokenIndex)&&(p=d,d=!1)
else if(null===p){g="Mismatch"
break}t=p.nextState,f=p.thenStack,h=p.syntaxStack,v=p.matchStack,b=p.tokenIndex,y=b<e.length?e[b]:null,p=p.prev
break
case"MatchGraph":t=t.match
break
case"If":t.else!==Us&&a(t.else),t.then!==Bs&&o(t.then),t=t.match
break
case"MatchOnce":t={type:"MatchOnceBuffer",syntax:t,index:0,mask:0}
break
case"MatchOnceBuffer":{const e=t.syntax.terms
if(t.index===e.length){if(0===t.mask||t.syntax.all){t=Us
break}t=Bs
break}if(t.mask===(1<<e.length)-1){t=Bs
break}for(;t.index<e.length;t.index++){const n=1<<t.index
if(0===(t.mask&n)){a(t),o({type:"AddMatchOnce",syntax:t.syntax,mask:t.mask|n}),t=e[t.index++]
break}}break}case"AddMatchOnce":t={type:"MatchOnceBuffer",syntax:t.syntax,index:0,mask:t.mask}
break
case"Enum":if(null!==y){let e=y.value.toLowerCase()
if(-1!==e.indexOf("\\")&&(e=e.replace(/\\[09].*$/,"")),Zs.call(t.map,e)){t=t.map[e]
break}}t=Us
break
case"Generic":{const e=null!==h?h.opts:null,n=b+Math.floor(t.fn(y,s,e))
if(!isNaN(n)&&n>b){for(;b<n;)l()
t=Bs}else t=Us
break}case"Type":case"Property":{const e="Type"===t.type?"types":"properties",r=Zs.call(n,e)?n[e][t.name]:null
if(!r||!r.match)throw new Error("Bad syntax reference: "+("Type"===t.type?"<"+t.name+">":"<'"+t.name+"'>"))
if(!1!==d&&null!==y&&"Type"===t.type&&("custom-ident"===t.name&&1===y.type||"length"===t.name&&"0"===y.value)){null===d&&(d=i(t,p)),t=Us
break}c(),t=r.matchRef||r.match
break}case"Keyword":{const e=t.name
if(null!==y){let n=y.value
if(-1!==n.indexOf("\\")&&(n=n.replace(/\\[09].*$/,"")),ei(n,e)){l(),t=Bs
break}}t=Us
break}case"AtKeyword":case"Function":if(null!==y&&ei(y.value,t.name)){l(),t=Bs
break}t=Us
break
case"Token":if(null!==y&&y.value===t.value){l(),t=Bs
break}t=Us
break
case"Comma":null!==y&&y.type===Zt?ti(v.token)?t=Us:(l(),t=ni(y)?Us:Bs):t=ti(v.token)||ni(y)?Bs:Us
break
case"String":let r="",m=b
for(;m<e.length&&r.length<t.value.length;m++)r+=e[m].value
if(ei(r,t.value)){for(;b<m;)l()
t=Bs}else t=Us
break
default:throw new Error("Unknown node type: "+t.type)}switch(g){case null:console.warn("[csstree-match] BREAK after 15000 iterations"),g="Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)",v=null
break
case Js:for(;null!==h;)u()
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
default:i.match.push({syntax:s.syntax||null,token:s.token.value,node:s.token.node})}s=s.prev}return r}function si(e){function t(e){return null!==e&&("Type"===e.type||"Property"===e.type||"Keyword"===e.type)}let n=null
return null!==this.matched&&!function r(s){if(Array.isArray(s.match)){for(let e=0;e<s.match.length;e++)if(r(s.match[e]))return t(s.syntax)&&n.unshift(s.syntax),!0}else if(s.node===e)return n=t(s.syntax)?[s.syntax]:[],!0
return!1}(this.matched),n}function ii(e,t,n){const r=si.call(e,t)
return null!==r&&r.some(n)}var oi=Object.freeze({__proto__:null,getTrace:si,isKeyword:function(e){return ii(this,e,e=>"Keyword"===e.type)},isProperty:function(e,t){return ii(this,e,e=>"Property"===e.type&&e.name===t)},isType:function(e,t){return ii(this,e,e=>"Type"===e.type&&e.name===t)}})
function ai(e){return"node"in e?e.node:ai(e.match[0])}function li(e){return"node"in e?e.node:li(e.match[e.match.length-1])}function ci(e,t,n,r,s){const i=[]
return null!==n.matched&&!function n(o){if(null!==o.syntax&&o.syntax.type===r&&o.syntax.name===s){const n=ai(o),r=li(o)
e.syntax.walk(t,function(e,t,s){if(e===n){const e=new Wn
do{if(e.appendData(t.data),t.data===r)break
t=t.next}while(null!==t)
i.push({parent:s,nodes:e})}})}Array.isArray(o.match)&&o.match.forEach(n)}(n.matched),i}const{hasOwnProperty:ui}=Object.prototype
function hi(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&e>=0}function fi(e){return Boolean(e)&&hi(e.offset)&&hi(e.line)&&hi(e.column)}function pi(e,t){return function(n,r){if(!n||n.constructor!==Object)return r(n,"Type of node should be an Object")
for(let s in n){let i=!0
if(!1!==ui.call(n,s)){if("type"===s)n.type!==e&&r(n,"Wrong node type `"+n.type+"`, expected `"+e+"`")
else if("loc"===s){if(null===n.loc)continue
if(n.loc&&n.loc.constructor===Object)if("string"!=typeof n.loc.source)s+=".source"
else if(fi(n.loc.start)){if(fi(n.loc.end))continue
s+=".end"}else s+=".start"
i=!1}else if(t.hasOwnProperty(s)){i=!1
for(let e=0;!i&&e<t[s].length;e++){const r=t[s][e]
switch(r){case String:i="string"==typeof n[s]
break
case Boolean:i="boolean"==typeof n[s]
break
case null:i=null===n[s]
break
default:"string"==typeof r?i=n[s]&&n[s].type===r:Array.isArray(r)&&(i=n[s]instanceof Wn)}}}else r(n,"Unknown field `"+s+"` for "+e+" node type")
i||r(n,"Bad value for `"+e+"."+s+"`")}}for(const s in t)ui.call(t,s)&&!1===ui.call(n,s)&&r(n,"Field `"+e+"."+s+"` is missed")}}function di(e,t){const n=[]
for(let r=0;r<e.length;r++){const s=e[r]
if(s===String||s===Boolean)n.push(s.name.toLowerCase())
else if(null===s)n.push("null")
else if("string"==typeof s)n.push(s)
else{if(!Array.isArray(s))throw new Error("Wrong value `"+s+"` in `"+t+"` structure definition")
n.push("List<"+(di(s,t)||"any")+">")}}return n.join(" | ")}function mi(e,t){const n=t.structure,r={type:String,loc:!0},s={type:'"'+e+'"'}
for(const t in n){if(!1===ui.call(n,t))continue
const i=r[t]=Array.isArray(n[t])?n[t].slice():[n[t]]
s[t]=di(i,e+"."+t)}return{docs:s,check:pi(e,r)}}function gi(e,t,n){const r={}
for(const s in e)e[s].syntax&&(r[s]=n?e[s].syntax:Gr(e[s].syntax,{compact:t}))
return r}function yi(e,t,n){const r={}
for(const[s,i]of Object.entries(e))r[s]={prelude:i.prelude&&(n?i.prelude.syntax:Gr(i.prelude.syntax,{compact:t})),descriptors:i.descriptors&&gi(i.descriptors,t,n)}
return r}function bi(e,t,n){return{matched:e,iterations:n,error:t,...oi}}function ki(e,t,n,r){const s=Gs(n,e.syntax)
let i
return function(e){for(let t=0;t<e.length;t++)if("var("===e[t].value.toLowerCase())return!0
return!1}(s)?bi(null,new Error("Matching for a tree with var() is not supported")):(r&&(i=ri(s,e.cssWideKeywordsSyntax,e)),r&&i.match||(i=ri(s,t.match,e),i.match)?bi(i.match,null,i.iterations):bi(null,new Vr(i.reason,t.syntax,n,i),i.iterations))}let vi=class{constructor(e,t,n){if(this.cssWideKeywords=Zr,this.syntax=t,this.generic=!1,this.units={...xs},this.atrules=Object.create(null),this.properties=Object.create(null),this.types=Object.create(null),this.structure=n||function(e){const t={}
if(e.node)for(const n in e.node)if(ui.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=mi(n,r)}return t}(e),e){if(e.cssWideKeywords&&(this.cssWideKeywords=e.cssWideKeywords),e.units)for(const t of Object.keys(xs))Array.isArray(e.units[t])&&(this.units[t]=e.units[t])
if(e.types)for(const[t,n]of Object.entries(e.types))this.addType_(t,n)
if(e.generic){this.generic=!0
for(const[e,t]of Object.entries(function(e){return{...vs,...Ss,...ws(e)}}(this.units)))this.addType_(e,t)}if(e.atrules)for(const[t,n]of Object.entries(e.atrules))this.addAtrule_(t,n)
if(e.properties)for(const[t,n]of Object.entries(e.properties))this.addProperty_(t,n)}this.cssWideKeywordsSyntax=Ks(this.cssWideKeywords.join(" |  "))}checkStructure(e){function t(e,t){r.push({node:e,message:t})}const n=this.structure,r=[]
return this.syntax.walk(e,function(e){n.hasOwnProperty(e.type)?n[e.type].check(e,t):t(e,"Unknown node type `"+e.type+"`")}),!!r.length&&r}createDescriptor(e,t,n,r=null){const s={type:t,name:n},i={type:t,name:n,parent:r,serializable:"string"==typeof e||e&&"string"==typeof e.type,syntax:null,match:null,matchRef:null}
return"function"==typeof e?i.match=Ks(e,s):("string"==typeof e?Object.defineProperty(i,"syntax",{get:()=>(Object.defineProperty(i,"syntax",{value:Is(e)}),i.syntax)}):i.syntax=e,Object.defineProperty(i,"match",{get:()=>(Object.defineProperty(i,"match",{value:Ks(i.syntax,s)}),i.match)}),"Property"===t&&Object.defineProperty(i,"matchRef",{get(){const e=i.syntax,t=function(e){const t=e.terms[0]
return!1===e.explicit&&1===e.terms.length&&"Multiplier"===t.type&&!0===t.comma}(e)?Ks({...e,terms:[e.terms[0].term]},s):null
return Object.defineProperty(i,"matchRef",{value:t}),t}})),i}addAtrule_(e,t){t&&(this.atrules[e]={type:"Atrule",name:e,prelude:t.prelude?this.createDescriptor(t.prelude,"AtrulePrelude",e):null,descriptors:t.descriptors?Object.keys(t.descriptors).reduce((n,r)=>(n[r]=this.createDescriptor(t.descriptors[r],"AtruleDescriptor",r,e),n),Object.create(null)):null})}addProperty_(e,t){t&&(this.properties[e]=this.createDescriptor(t,"Property",e))}addType_(e,t){t&&(this.types[e]=this.createDescriptor(t,"Type",e))}checkAtruleName(e){if(!this.getAtrule(e))return new Wr("Unknown at-rule","@"+e)}checkAtrulePrelude(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e)
return!r.prelude&&t?new SyntaxError("At-rule `@"+e+"` should not contain a prelude"):!r.prelude||t||ki(this,r.prelude,"",!1).matched?void 0:new SyntaxError("At-rule `@"+e+"` should contain a prelude")}checkAtruleDescriptorName(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e),s=Xr(t)
return r.descriptors?r.descriptors[s.name]||r.descriptors[s.basename]?void 0:new Wr("Unknown at-rule descriptor",t):new SyntaxError("At-rule `@"+e+"` has no known descriptors")}checkPropertyName(e){if(!this.getProperty(e))return new Wr("Unknown property",e)}matchAtrulePrelude(e,t){const n=this.checkAtrulePrelude(e,t)
if(n)return bi(null,n)
const r=this.getAtrule(e)
return r.prelude?ki(this,r.prelude,t||"",!1):bi(null,null)}matchAtruleDescriptor(e,t,n){const r=this.checkAtruleDescriptorName(e,t)
if(r)return bi(null,r)
const s=this.getAtrule(e),i=Xr(t)
return ki(this,s.descriptors[i.name]||s.descriptors[i.basename],n,!1)}matchDeclaration(e){return"Declaration"!==e.type?bi(null,new Error("Not a Declaration node")):this.matchProperty(e.property,e.value)}matchProperty(e,t){if(Hr(e).custom)return bi(null,new Error("Lexer matching doesn't applicable for custom properties"))
const n=this.checkPropertyName(e)
return n?bi(null,n):ki(this,this.getProperty(e),t,!0)}matchType(e,t){const n=this.getType(e)
return n?ki(this,n,t,!1):bi(null,new Wr("Unknown type",e))}match(e,t){return"string"==typeof e||e&&e.type?("string"!=typeof e&&e.match||(e=this.createDescriptor(e,"Type","anonymous")),ki(this,e,t,!1)):bi(null,new Wr("Bad syntax"))}findValueFragments(e,t,n,r){return ci(this,t,this.matchProperty(e,t),n,r)}findDeclarationValueFragments(e,t,n){return ci(this,e.value,this.matchDeclaration(e),t,n)}findAllFragments(e,t,n){const r=[]
return this.syntax.walk(e,{visit:"Declaration",enter:e=>{r.push.apply(r,this.findDeclarationValueFragments(e,t,n))}}),r}getAtrule(e,t=!0){const n=Xr(e)
return(n.vendor&&t?this.atrules[n.name]||this.atrules[n.basename]:this.atrules[n.name])||null}getAtrulePrelude(e,t=!0){const n=this.getAtrule(e,t)
return n&&n.prelude||null}getAtruleDescriptor(e,t){return this.atrules.hasOwnProperty(e)&&this.atrules.declarators&&this.atrules[e].declarators[t]||null}getProperty(e,t=!0){const n=Hr(e)
return(n.vendor&&t?this.properties[n.name]||this.properties[n.basename]:this.properties[n.name])||null}getType(e){return hasOwnProperty.call(this.types,e)?this.types[e]:null}validate(){function e(e,t){return t?`<${e}>`:`<'${e}'>`}function t(i,o,a,l){if(a.has(o))return a.get(o)
a.set(o,!1),null!==l.syntax&&function(e,t,n){let r=Rs,s=Rs
if("function"==typeof t?r=t:t&&(r=Fs(t.enter),s=Fs(t.leave)),r===Rs&&s===Rs)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
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
return i.length||o.length?{errors:n,types:i,properties:o}:null}dump(e,t){return{generic:this.generic,cssWideKeywords:this.cssWideKeywords,units:this.units,types:gi(this.types,!t,e),properties:gi(this.properties,!t,e),atrules:yi(this.atrules,!t,e)}}toString(){return JSON.stringify(this.dump())}}
function Si(e,t){return"string"==typeof t&&/^\s*\|/.test(t)?"string"==typeof e?e+t:t.replace(/^\s*\|\s*/,""):t||null}function wi(e,t){const n=Object.create(null)
for(const[r,s]of Object.entries(e))if(s){n[r]={}
for(const e of Object.keys(s))t.includes(e)&&(n[r][e]=s[e])}return n}function xi(e,t){const n={...e}
for(const[r,s]of Object.entries(t))switch(r){case"generic":n[r]=Boolean(s)
break
case"cssWideKeywords":n[r]=e[r]?[...e[r],...s]:s||[]
break
case"units":n[r]={...e[r]}
for(const[e,t]of Object.entries(s))n[r][e]=Array.isArray(t)?t:[]
break
case"atrules":n[r]={...e[r]}
for(const[e,t]of Object.entries(s)){const s=n[r][e]||{},i=n[r][e]={prelude:s.prelude||null,descriptors:{...s.descriptors}}
if(t){i.prelude=t.prelude?Si(i.prelude,t.prelude):i.prelude||null
for(const[e,n]of Object.entries(t.descriptors||{}))i.descriptors[e]=n?Si(i.descriptors[e],n):null
Object.keys(i.descriptors).length||(i.descriptors=null)}}break
case"types":case"properties":n[r]={...e[r]}
for(const[e,t]of Object.entries(s))n[r][e]=Si(n[r][e],t)
break
case"scope":case"features":n[r]={...e[r]}
for(const[e,t]of Object.entries(s))n[r][e]={...n[r][e],...t}
break
case"parseContext":n[r]={...e[r],...s}
break
case"atrule":case"pseudo":n[r]={...e[r],...wi(s,["parse"])}
break
case"node":n[r]={...e[r],...wi(s,["name","structure","parse","generate","walkContext"])}}return n}function Ci(e){const t=Jn(e),n=Rr(e),r=Or(e),{fromPlainObject:s,toPlainObject:i}=function(e){return{fromPlainObject:t=>(e(t,{enter(e){e.children&&e.children instanceof Wn==0&&(e.children=(new Wn).fromArray(e.children))}}),t),toPlainObject:t=>(e(t,{leave(e){e.children&&e.children instanceof Wn&&(e.children=e.children.toArray())}}),t)}}(n),o={lexer:null,createLexer:e=>new vi(e,o,o.lexer.structure),tokenize:Un,parse:t,generate:r,walk:n,find:n.find,findLast:n.findLast,findAll:n.findAll,fromPlainObject:s,toPlainObject:i,fork(t){const n=xi({},e)
return Ci("function"==typeof t?t(n):xi(n,t))}}
return o.lexer=new vi({generic:e.generic,cssWideKeywords:e.cssWideKeywords,units:e.units,types:e.types,atrules:e.atrules,properties:e.properties,node:e.node},o),o}const Ai=e(import.meta.url)("../data/patch.json"),_i=e(import.meta.url),Ti=_i("mdn-data/css/at-rules.json"),Ei=_i("mdn-data/css/properties.json"),Oi=_i("mdn-data/css/syntaxes.json"),Pi=Object.hasOwn||((e,t)=>Object.prototype.hasOwnProperty.call(e,t)),Li=/^\s*\|\s*/
function Ni(e,t){const n=Object.create(null)
for(const[t,r]of Object.entries(e))r&&(n[t]=r.syntax||r)
for(const r of Object.keys(t))Pi(e,r)?t[r].syntax?n[r]=Li.test(t[r].syntax)?n[r]+" "+t[r].syntax.trim():t[r].syntax:delete n[r]:t[r].syntax&&(n[r]=t[r].syntax.replace(Li,""))
return n}function Di(e){const t={}
for(const[n,r]of Object.entries(e||{}))t[n]="string"==typeof r?{syntax:r}:r
return t}var Mi={types:Ni(Oi,Ai.types),atrules:function(e,t){const n={}
for(const r in e){if(null===t[r])continue
const s=t[r]||{}
n[r]={prelude:r in t&&"prelude"in s?s.prelude:e[r].prelude||null,descriptors:Ni(e[r].descriptors||{},Di(s.descriptors))}}for(const[r,s]of Object.entries(t))s&&!Pi(e,r)&&(n[r]={prelude:s.prelude||null,descriptors:s.descriptors?Ni({},Di(s.descriptors)):null})
return n}(function(e){const t=Object.create(null)
for(const[n,r]of Object.entries(e)){let e=null
if(r.descriptors){e=Object.create(null)
for(const[t,n]of Object.entries(r.descriptors))e[t]=n.syntax}t[n.substr(1)]={prelude:r.syntax.trim().replace(/\{(.|\s)+\}/,"").match(/^@\S+\s+([^;\{]*)/)[1].trim()||null,descriptors:e}}return t}(Ti),Ai.atrules),properties:Ni(Ei,Ai.properties)}
const ji=0x002B,Ii=0x002D,Ri=0x006E,Fi=!0
function zi(e,t){let n=this.tokenStart+e
const r=this.charCodeAt(n)
for(r!==ji&&r!==Ii||(t&&this.error("Number sign is not allowed"),n++);n<this.tokenEnd;n++)an(this.charCodeAt(n))||this.error("Integer is expected",n)}function Gi(e){return zi.call(this,0,e)}function Bi(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let n=""
switch(t){case Ri:n="N is expected"
break
case Ii:n="HyphenMinus is expected"}this.error(n,this.tokenStart+e)}}function Ui(){let e=0,t=0,n=this.tokenType
for(;n===Xt||n===on;)n=this.lookupType(++e)
if(n!==Vt){if(!this.isDelim(ji,e)&&!this.isDelim(Ii,e))return null
t=this.isDelim(ji,e)?ji:Ii
do{n=this.lookupType(++e)}while(n===Xt||n===on)
n!==Vt&&(this.skip(e),Gi.call(this,Fi))}return e>0&&this.skip(e),0===t&&(n=this.charCodeAt(this.tokenStart),n!==ji&&n!==Ii&&this.error("Number sign is expected")),Gi.call(this,0!==t),t===Ii?"-"+this.consume(Vt):this.consume(Vt)}const qi={a:[String,null],b:[String,null]}
function Wi(){const e=this.tokenStart
let t=null,n=null
if(this.tokenType===Vt)Gi.call(this,false),n=this.consume(Vt)
else if(1===this.tokenType&&this.cmpChar(this.tokenStart,Ii))switch(t="-1",Bi.call(this,1,Ri),this.tokenEnd-this.tokenStart){case 2:this.next(),n=Ui.call(this)
break
case 3:Bi.call(this,2,Ii),this.next(),this.skipSC(),Gi.call(this,Fi),n="-"+this.consume(Vt)
break
default:Bi.call(this,2,Ii),zi.call(this,3,Fi),this.next(),n=this.substrToCursor(e+2)}else if(1===this.tokenType||this.isDelim(ji)&&1===this.lookupType(1)){let r=0
switch(t="1",this.isDelim(ji)&&(r=1,this.next()),Bi.call(this,0,Ri),this.tokenEnd-this.tokenStart){case 1:this.next(),n=Ui.call(this)
break
case 2:Bi.call(this,1,Ii),this.next(),this.skipSC(),Gi.call(this,Fi),n="-"+this.consume(Vt)
break
default:Bi.call(this,1,Ii),zi.call(this,2,Fi),this.next(),n=this.substrToCursor(e+r+1)}}else if(this.tokenType===Yt){const r=this.charCodeAt(this.tokenStart),s=r===ji||r===Ii
let i=this.tokenStart+s
for(;i<this.tokenEnd&&an(this.charCodeAt(i));i++);i===this.tokenStart+s&&this.error("Integer is expected",this.tokenStart+s),Bi.call(this,i-this.tokenStart,Ri),t=this.substring(e,i),i+1===this.tokenEnd?(this.next(),n=Ui.call(this)):(Bi.call(this,i-this.tokenStart+1,Ii),i+2===this.tokenEnd?(this.next(),this.skipSC(),Gi.call(this,Fi),n="-"+this.consume(Vt)):(zi.call(this,i-this.tokenStart+2,Fi),this.next(),n=this.substrToCursor(i+1)))}else this.error()
return null!==t&&t.charCodeAt(0)===ji&&(t=t.substr(1)),null!==n&&n.charCodeAt(0)===ji&&(n=n.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:n}}var Vi=Object.freeze({__proto__:null,generate:function(e){if(e.a){const t=("+1"===e.a||"1"===e.a?"n":"-1"===e.a&&"-n")||e.a+"n"
if(e.b){const n="-"===e.b[0]||"+"===e.b[0]?e.b:"+"+e.b
this.tokenize(t+n)}else this.tokenize(t)}else this.tokenize(e.b)},name:"AnPlusB",parse:Wi,structure:qi})
function $i(){return this.Raw(this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function Yi(){for(let e,t=1;e=this.lookupType(t);t++){if(e===sn)return!0
if(e===rn||3===e)return!1}return!1}const Xi={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]}
function Hi(e=!1){const t=this.tokenStart
let n,r,s=null,i=null
switch(this.eat(3),n=this.substrToCursor(t+1),r=n.toLowerCase(),this.skipSC(),!1===this.eof&&this.tokenType!==rn&&this.tokenType!==Kt&&(s=this.parseAtrulePrelude?this.parseWithFallback(this.AtrulePrelude.bind(this,n,e),$i):$i.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case Kt:this.next()
break
case rn:i=hasOwnProperty.call(this.atrule,r)&&"function"==typeof this.atrule[r].block?this.atrule[r].block.call(this,e):this.Block(Yi.call(this))}return{type:"Atrule",loc:this.getLocation(t,this.tokenStart),name:n,prelude:s,block:i}}var Qi=Object.freeze({__proto__:null,generate:function(e){this.token(3,"@"+e.name),null!==e.prelude&&this.node(e.prelude),e.block?this.node(e.block):this.token(Kt,";")},name:"Atrule",parse:Hi,structure:Xi,walkContext:"atrule"})
function Ki(e){let t=null
return null!==e&&(e=e.toLowerCase()),this.skipSC(),t=hasOwnProperty.call(this.atrule,e)&&"function"==typeof this.atrule[e].prelude?this.atrule[e].prelude.call(this):this.readSequence(this.scope.AtrulePrelude),this.skipSC(),!0!==this.eof&&this.tokenType!==rn&&this.tokenType!==Kt&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}var Zi=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"AtrulePrelude",parse:Ki,structure:{children:[[]]},walkContext:"atrulePrelude"})
function Ji(){this.eof&&this.error("Unexpected end of input")
const e=this.tokenStart
let t=!1
return this.isDelim(42)?(t=!0,this.next()):this.isDelim(124)||this.eat(1),this.isDelim(124)?61!==this.charCodeAt(this.tokenStart+1)?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function eo(){const e=this.tokenStart,t=this.charCodeAt(e)
return 61!==t&&126!==t&&94!==t&&36!==t&&42!==t&&124!==t&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),61!==t&&(this.isDelim(61)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}const to={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]}
function no(){const e=this.tokenStart
let t,n=null,r=null,s=null
return this.eat(Jt),this.skipSC(),t=Ji.call(this),this.skipSC(),this.tokenType!==en&&(1!==this.tokenType&&(n=eo.call(this),this.skipSC(),r=5===this.tokenType?this.String():this.Identifier(),this.skipSC()),1===this.tokenType&&(s=this.consume(1),this.skipSC())),this.eat(en),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:n,value:r,flags:s}}var ro=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.node(e.name),null!==e.matcher&&(this.tokenize(e.matcher),this.node(e.value)),null!==e.flags&&this.token(1,e.flags),this.token(9,"]")},name:"AttributeSelector",parse:no,structure:to})
function so(){return this.Raw(null,!0)}function io(){return this.parseWithFallback(this.Rule,so)}function oo(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function ao(){if(this.tokenType===Kt)return oo.call(this,this.tokenIndex)
const e=this.parseWithFallback(this.Declaration,oo)
return this.tokenType===Kt&&this.next(),e}function lo(e){const t=e?ao:io,n=this.tokenStart
let r=this.createList()
this.eat(rn)
e:for(;!this.eof;)switch(this.tokenType){case sn:break e
case Xt:case on:this.next()
break
case 3:r.push(this.parseWithFallback(this.Atrule.bind(this,e),so))
break
default:e&&this.isDelim(38)?r.push(io.call(this)):r.push(t.call(this))}return this.eof||this.eat(sn),{type:"Block",loc:this.getLocation(n,this.tokenStart),children:r}}var co=Object.freeze({__proto__:null,generate:function(e){this.token(rn,"{"),this.children(e,e=>{"Declaration"===e.type&&this.token(Kt,";")}),this.token(sn,"}")},name:"Block",parse:lo,structure:{children:[["Atrule","Rule","Declaration"]]},walkContext:"block"})
function uo(e,t){const n=this.tokenStart
let r=null
return this.eat(Jt),r=e.call(this,t),this.eof||this.eat(en),{type:"Brackets",loc:this.getLocation(n,this.tokenStart),children:r}}var ho=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.children(e),this.token(9,"]")},name:"Brackets",parse:uo,structure:{children:[[]]}})
function fo(){const e=this.tokenStart
return this.eat(Ht),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}var po=Object.freeze({__proto__:null,generate:function(){this.token(Ht,"--\x3e")},name:"CDC",parse:fo,structure:[]})
function mo(){const e=this.tokenStart
return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}var go=Object.freeze({__proto__:null,generate:function(){this.token(14,"\x3c!--")},name:"CDO",parse:mo,structure:[]})
const yo={name:String}
function bo(){return this.eatDelim(46),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}var ko=Object.freeze({__proto__:null,generate:function(e){this.token(9,"."),this.token(1,e.name)},name:"ClassSelector",parse:bo,structure:yo})
const vo={name:String}
function So(){const e=this.tokenStart
let t
switch(this.tokenType){case Xt:t=" "
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 62:case 43:case 126:this.next()
break
case 47:this.next(),this.eatIdent("deep"),this.eatDelim(47)
break
default:this.error("Combinator is expected")}t=this.substrToCursor(e)}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}var wo=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"Combinator",parse:So,structure:vo})
const xo={value:String}
function Co(){const e=this.tokenStart
let t=this.tokenEnd
return this.eat(on),t-e+2>=2&&42===this.charCodeAt(t-2)&&47===this.charCodeAt(t-1)&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}var Ao=Object.freeze({__proto__:null,generate:function(e){this.token(on,"/*"+e.value+"*/")},name:"Comment",parse:Co,structure:xo})
const _o=new Set([Qt,nn,0]),To={kind:String,children:[["Identifier","Feature","FeatureFunction","FeatureRange","SupportsDeclaration"]]}
function Eo(e){return 1===this.lookupTypeNonSC(1)&&_o.has(this.lookupTypeNonSC(2))?this.Feature(e):this.FeatureRange(e)}const Oo={media:Eo,container:Eo,supports(){return this.SupportsDeclaration()}}
function Po(e="media"){const t=this.createList()
e:for(;!this.eof;)switch(this.tokenType){case on:case Xt:this.next()
continue
case 1:t.push(this.Identifier())
break
case tn:{let n=this.parseWithFallback(()=>Oo[e].call(this,e),()=>null)
n||(n=this.parseWithFallback(()=>{this.eat(tn)
const t=this.Condition(e)
return this.eat(nn),t},()=>this.GeneralEnclosed(e))),t.push(n)
break}case 2:{let n=this.parseWithFallback(()=>this.FeatureFunction(e),()=>null)
n||(n=this.GeneralEnclosed(e)),t.push(n)
break}default:break e}return t.isEmpty&&this.error("Condition is expected"),{type:"Condition",loc:this.getLocationFromList(t),kind:e,children:t}}var Lo=Object.freeze({__proto__:null,generate:function(e){e.children.forEach(e=>{"Condition"===e.type?(this.token(tn,"("),this.node(e),this.token(nn,")")):this.node(e)})},name:"Condition",parse:Po,structure:To})
function No(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!0)}function Do(){return this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)}function Mo(){const e=this.tokenIndex,t=this.Value()
return"Raw"!==t.type&&!1===this.eof&&this.tokenType!==Kt&&!1===this.isDelim(33)&&!1===this.isBalanceEdge(e)&&this.error(),t}const jo={important:[Boolean,String],property:String,value:["Value","Raw"]}
function Io(){const e=this.tokenStart,t=this.tokenIndex,n=Ro.call(this),r=Qr(n),s=r?this.parseCustomProperty:this.parseValue,i=r?Do:No
let o,a=!1
this.skipSC(),this.eat(Qt)
const l=this.tokenIndex
if(r||this.skipSC(),o=s?this.parseWithFallback(Mo,i):i.call(this,this.tokenIndex),r&&"Value"===o.type&&o.children.isEmpty)for(let e=l-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Xt){o.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}return this.isDelim(33)&&(a=Fo.call(this),this.skipSC()),!1===this.eof&&this.tokenType!==Kt&&!1===this.isBalanceEdge(t)&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:a,property:n,value:o}}function Ro(){const e=this.tokenStart
if(9===this.tokenType)switch(this.charCodeAt(this.tokenStart)){case 42:case 36:case 43:case 35:case 38:this.next()
break
case 47:this.next(),this.isDelim(47)&&this.next()}return 4===this.tokenType?this.eat(4):this.eat(1),this.substrToCursor(e)}function Fo(){this.eat(9),this.skipSC()
const e=this.consume(1)
return"important"===e||e}var zo=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.property),this.token(Qt,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,!0===e.important?"important":e.important))},name:"Declaration",parse:Io,structure:jo,walkContext:"declaration"})
function Go(){return this.Raw(this.consumeUntilSemicolonIncluded,!0)}function Bo(){const e=this.createList()
for(;!this.eof;)switch(this.tokenType){case Xt:case on:case Kt:this.next()
break
case 3:e.push(this.parseWithFallback(this.Atrule.bind(this,!0),Go))
break
default:this.isDelim(38)?e.push(this.parseWithFallback(this.Rule,Go)):e.push(this.parseWithFallback(this.Declaration,Go))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}var Uo=Object.freeze({__proto__:null,generate:function(e){this.children(e,e=>{"Declaration"===e.type&&this.token(Kt,";")})},name:"DeclarationList",parse:Bo,structure:{children:[["Declaration","Atrule","Rule"]]}})
const qo={value:String,unit:String}
function Wo(){const e=this.tokenStart,t=this.consumeNumber(Yt)
return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}var Vo=Object.freeze({__proto__:null,generate:function(e){this.token(Yt,e.value+e.unit)},name:"Dimension",parse:Wo,structure:qo})
const $o={kind:String,name:String,value:["Identifier","Number","Dimension","Ratio","Function",null]}
function Yo(e){const t=this.tokenStart
let n,r=null
if(this.eat(tn),this.skipSC(),n=this.consume(1),this.skipSC(),this.tokenType!==nn){switch(this.eat(Qt),this.skipSC(),this.tokenType){case Vt:r=9===this.lookupNonWSType(1)?this.Ratio():this.Number()
break
case Yt:r=this.Dimension()
break
case 1:r=this.Identifier()
break
case 2:r=this.parseWithFallback(()=>{const e=this.Function(this.readSequence,this.scope.Value)
return this.skipSC(),this.isDelim(47)&&this.error(),e},()=>this.Ratio())
break
default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eof||this.eat(nn),{type:"Feature",loc:this.getLocation(t,this.tokenStart),kind:e,name:n,value:r}}var Xo=Object.freeze({__proto__:null,generate:function(e){this.token(tn,"("),this.token(1,e.name),null!==e.value&&(this.token(Qt,":"),this.node(e.value)),this.token(nn,")")},name:"Feature",parse:Yo,structure:$o})
const Ho={kind:String,feature:String,value:["Declaration","Selector"]}
function Qo(e,t){const n=(this.features[e]||{})[t]
return"function"!=typeof n&&this.error(`Unknown feature ${t}()`),n}function Ko(e="unknown"){const t=this.tokenStart,n=this.consumeFunctionName(),r=Qo.call(this,e,n.toLowerCase())
this.skipSC()
const s=this.parseWithFallback(()=>{const e=this.tokenIndex,t=r.call(this)
return!1===this.eof&&!1===this.isBalanceEdge(e)&&this.error(),t},()=>this.Raw(null,!1))
return this.eof||this.eat(nn),{type:"FeatureFunction",loc:this.getLocation(t,this.tokenStart),kind:e,feature:n,value:s}}var Zo=Object.freeze({__proto__:null,generate:function(e){this.token(2,e.feature+"("),this.node(e.value),this.token(nn,")")},name:"FeatureFunction",parse:Ko,structure:Ho})
const Jo={kind:String,left:["Identifier","Number","Dimension","Ratio","Function"],leftComparison:String,middle:["Identifier","Number","Dimension","Ratio","Function"],rightComparison:[String,null],right:["Identifier","Number","Dimension","Ratio","Function",null]}
function ea(){switch(this.skipSC(),this.tokenType){case Vt:return this.isDelim(47,this.lookupOffsetNonSC(1))?this.Ratio():this.Number()
case Yt:return this.Dimension()
case 1:return this.Identifier()
case 2:return this.parseWithFallback(()=>{const e=this.Function(this.readSequence,this.scope.Value)
return this.skipSC(),this.isDelim(47)&&this.error(),e},()=>this.Ratio())
default:this.error("Number, dimension, ratio or identifier is expected")}}function ta(e){if(this.skipSC(),this.isDelim(60)||this.isDelim(62)){const e=this.source[this.tokenStart]
return this.next(),this.isDelim(61)?(this.next(),e+"="):e}if(this.isDelim(61))return"="
this.error(`Expected ${e?'":", ':""}"<", ">", "=" or ")"`)}function na(e="unknown"){const t=this.tokenStart
this.skipSC(),this.eat(tn)
const n=ea.call(this),r=ta.call(this,"Identifier"===n.type),s=ea.call(this)
let i=null,o=null
return this.lookupNonWSType(0)!==nn&&(i=ta.call(this),o=ea.call(this)),this.skipSC(),this.eat(nn),{type:"FeatureRange",loc:this.getLocation(t,this.tokenStart),kind:e,left:n,leftComparison:r,middle:s,rightComparison:i,right:o}}var ra=Object.freeze({__proto__:null,generate:function(e){this.token(tn,"("),this.node(e.left),this.tokenize(e.leftComparison),this.node(e.middle),e.right&&(this.tokenize(e.rightComparison),this.node(e.right)),this.token(nn,")")},name:"FeatureRange",parse:na,structure:Jo})
const sa={name:String,children:[[]]}
function ia(e,t){const n=this.tokenStart,r=this.consumeFunctionName(),s=r.toLowerCase()
let i
return i=t.hasOwnProperty(s)?t[s].call(this,t):e.call(this,t),this.eof||this.eat(nn),{type:"Function",loc:this.getLocation(n,this.tokenStart),name:r,children:i}}var oa=Object.freeze({__proto__:null,generate:function(e){this.token(2,e.name+"("),this.children(e),this.token(nn,")")},name:"Function",parse:ia,structure:sa,walkContext:"function"})
const aa={kind:String,function:[String,null],children:[[]]}
function la(e){const t=this.tokenStart
let n=null
2===this.tokenType?n=this.consumeFunctionName():this.eat(tn)
const r=this.parseWithFallback(()=>{const e=this.tokenIndex,t=this.readSequence(this.scope.Value)
return!1===this.eof&&!1===this.isBalanceEdge(e)&&this.error(),t},()=>this.createSingleNodeList(this.Raw(null,!1)))
return this.eof||this.eat(nn),{type:"GeneralEnclosed",loc:this.getLocation(t,this.tokenStart),kind:e,function:n,children:r}}var ca=Object.freeze({__proto__:null,generate:function(e){e.function?this.token(2,e.function+"("):this.token(tn,"("),this.children(e),this.token(nn,")")},name:"GeneralEnclosed",parse:la,structure:aa})
const ua={value:String}
function ha(){const e=this.tokenStart
return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}var fa=Object.freeze({__proto__:null,generate:function(e){this.token(4,"#"+e.value)},name:"Hash",parse:ha,structure:ua,xxx:"XXX"})
const pa={name:String}
function da(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}var ma=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.name)},name:"Identifier",parse:da,structure:pa})
const ga={name:String}
function ya(){const e=this.tokenStart
return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}var ba=Object.freeze({__proto__:null,generate:function(e){this.token(9,"#"+e.name)},name:"IdSelector",parse:ya,structure:ga})
const ka={name:String}
function va(){let e=this.tokenStart,t=this.consume(1)
for(;this.isDelim(46);)this.eat(9),t+="."+this.consume(1)
return{type:"Layer",loc:this.getLocation(e,this.tokenStart),name:t}}var Sa=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"Layer",parse:va,structure:ka})
function wa(){const e=this.createList()
for(this.skipSC();!this.eof&&(e.push(this.Layer()),this.lookupTypeNonSC(0)===Zt);)this.skipSC(),this.next(),this.skipSC()
return{type:"LayerList",loc:this.getLocationFromList(e),children:e}}var xa=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Zt,","))},name:"LayerList",parse:wa,structure:{children:[["Layer"]]}})
const Ca={modifier:[String,null],mediaType:[String,null],condition:["Condition",null]}
function Aa(){const e=this.tokenStart
let t=null,n=null,r=null
if(this.skipSC(),1===this.tokenType&&this.lookupTypeNonSC(1)!==tn){const e=this.consume(1),s=e.toLowerCase()
switch("not"===s||"only"===s?(this.skipSC(),t=s,n=this.consume(1)):n=e,this.lookupTypeNonSC(0)){case 1:this.skipSC(),this.eatIdent("and"),r=this.Condition("media")
break
case rn:case Kt:case Zt:case 0:break
default:this.error("Identifier or parenthesis is expected")}}else switch(this.tokenType){case 1:case tn:case 2:r=this.Condition("media")
break
case rn:case Kt:case 0:break
default:this.error("Identifier or parenthesis is expected")}return{type:"MediaQuery",loc:this.getLocation(e,this.tokenStart),modifier:t,mediaType:n,condition:r}}var _a=Object.freeze({__proto__:null,generate:function(e){e.mediaType?(e.modifier&&this.token(1,e.modifier),this.token(1,e.mediaType),e.condition&&(this.token(1,"and"),this.node(e.condition))):e.condition&&this.node(e.condition)},name:"MediaQuery",parse:Aa,structure:Ca})
function Ta(){const e=this.createList()
for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===Zt);)this.next()
return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}var Ea=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Zt,","))},name:"MediaQueryList",parse:Ta,structure:{children:[["MediaQuery"]]}})
function Oa(){const e=this.tokenStart
return this.eatDelim(38),{type:"NestingSelector",loc:this.getLocation(e,this.tokenStart)}}var Pa=Object.freeze({__proto__:null,generate:function(){this.token(9,"&")},name:"NestingSelector",parse:Oa,structure:{}})
function La(){this.skipSC()
const e=this.tokenStart
let t,n=e,r=null
return t=this.lookupValue(0,"odd")||this.lookupValue(0,"even")?this.Identifier():this.AnPlusB(),n=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),r=this.SelectorList(),n=this.tokenStart),{type:"Nth",loc:this.getLocation(e,n),nth:t,selector:r}}var Na=Object.freeze({__proto__:null,generate:function(e){this.node(e.nth),null!==e.selector&&(this.token(1,"of"),this.node(e.selector))},name:"Nth",parse:La,structure:{nth:["AnPlusB","Identifier"],selector:["SelectorList",null]}})
const Da={value:String}
function Ma(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(Vt)}}var ja=Object.freeze({__proto__:null,generate:function(e){this.token(Vt,e.value)},name:"Number",parse:Ma,structure:Da})
const Ia={value:String}
function Ra(){const e=this.tokenStart
return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var Fa=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Operator",parse:Ra,structure:Ia})
function za(e,t){const n=this.tokenStart
let r=null
return this.eat(tn),r=e.call(this,t),this.eof||this.eat(nn),{type:"Parentheses",loc:this.getLocation(n,this.tokenStart),children:r}}var Ga=Object.freeze({__proto__:null,generate:function(e){this.token(tn,"("),this.children(e),this.token(nn,")")},name:"Parentheses",parse:za,structure:{children:[[]]}})
const Ba={value:String}
function Ua(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber($t)}}var qa=Object.freeze({__proto__:null,generate:function(e){this.token($t,e.value+"%")},name:"Percentage",parse:Ua,structure:Ba})
const Wa={name:String,children:[["Raw"],null]}
function Va(){const e=this.tokenStart
let t,n,r=null
return this.eat(Qt),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),this.lookupNonWSType(0)==nn?r=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(null,!1))),this.eat(nn)):t=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var $a=Object.freeze({__proto__:null,generate:function(e){this.token(Qt,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(nn,")"))},name:"PseudoClassSelector",parse:Va,structure:Wa,walkContext:"function"})
const Ya={name:String,children:[["Raw"],null]}
function Xa(){const e=this.tokenStart
let t,n,r=null
return this.eat(Qt),this.eat(Qt),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),this.lookupNonWSType(0)==nn?r=this.createList():hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(null,!1))),this.eat(nn)):t=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var Ha=Object.freeze({__proto__:null,generate:function(e){this.token(Qt,":"),this.token(Qt,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(nn,")"))},name:"PseudoElementSelector",parse:Xa,structure:Ya,walkContext:"function"})
function Qa(){switch(this.skipSC(),this.tokenType){case Vt:return this.Number()
case 2:return this.Function(this.readSequence,this.scope.Value)
default:this.error("Number of function is expected")}}function Ka(){const e=this.tokenStart,t=Qa.call(this)
let n=null
return this.skipSC(),this.isDelim(47)&&(this.eatDelim(47),n=Qa.call(this)),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:n}}var Za=Object.freeze({__proto__:null,generate:function(e){this.node(e.left),this.token(9,"/"),e.right?this.node(e.right):this.node(Vt,1)},name:"Ratio",parse:Ka,structure:{left:["Number","Function"],right:["Number","Function",null]}})
function Ja(){return this.tokenIndex>0&&this.lookupType(-1)===Xt?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}const el={value:String}
function tl(e,t){const n=this.getTokenStart(this.tokenIndex)
let r
return this.skipUntilBalanced(this.tokenIndex,e||this.consumeUntilBalanceEnd),r=t&&this.tokenStart>n?Ja.call(this):this.tokenStart,{type:"Raw",loc:this.getLocation(n,r),value:this.substring(n,r)}}var nl=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Raw",parse:tl,structure:el})
function rl(){return this.Raw(this.consumeUntilLeftCurlyBracket,!0)}function sl(){const e=this.SelectorList()
return"Raw"!==e.type&&!1===this.eof&&this.tokenType!==rn&&this.error(),e}function il(){const e=this.tokenIndex,t=this.tokenStart
let n,r
return n=this.parseRulePrelude?this.parseWithFallback(sl,rl):rl.call(this,e),r=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:n,block:r}}var ol=Object.freeze({__proto__:null,generate:function(e){this.node(e.prelude),this.node(e.block)},name:"Rule",parse:il,structure:{prelude:["SelectorList","Raw"],block:["Block"]},walkContext:"rule"})
function al(){let e=null,t=null
this.skipSC()
const n=this.tokenStart
return this.tokenType===tn&&(this.next(),this.skipSC(),e=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(nn)),1===this.lookupNonWSType(0)&&(this.skipSC(),this.eatIdent("to"),this.skipSC(),this.eat(tn),this.skipSC(),t=this.parseWithFallback(this.SelectorList,()=>this.Raw(!1,!0)),this.skipSC(),this.eat(nn)),{type:"Scope",loc:this.getLocation(n,this.tokenStart),root:e,limit:t}}var ll=Object.freeze({__proto__:null,generate:function(e){e.root&&(this.token(tn,"("),this.node(e.root),this.token(nn,")")),e.limit&&(this.token(1,"to"),this.token(tn,"("),this.node(e.limit),this.token(nn,")"))},name:"Scope",parse:al,structure:{root:["SelectorList","Raw",null],limit:["SelectorList","Raw",null]}})
function cl(){const e=this.readSequence(this.scope.Selector)
return null===this.getFirstListNode(e)&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}var ul=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Selector",parse:cl,structure:{children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator"]]}})
function hl(){const e=this.createList()
for(;!this.eof&&(e.push(this.Selector()),this.tokenType===Zt);)this.next()
return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}var fl=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Zt,","))},name:"SelectorList",parse:hl,structure:{children:[["Selector","Raw"]]},walkContext:"selector"})
function pl(e){const t=e.length,n=e.charCodeAt(0),r=34===n||39===n?1:0,s=1===r&&t>1&&e.charCodeAt(t-1)===n?t-2:t-1
let i=""
for(let n=r;n<=s;n++){let r=e.charCodeAt(n)
if(92===r){if(n===s){n!==t-1&&(i=e.substr(n+1))
break}if(r=e.charCodeAt(++n),mn(92,r)){const t=n-1,r=En(e,t)
n=r-1,i+=Nn(e.substring(t+1,r))}else 0x000d===r&&0x000a===e.charCodeAt(n+1)&&n++}else i+=e[n]}return i}const dl={value:String}
function ml(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:pl(this.consume(5))}}var gl=Object.freeze({__proto__:null,generate:function(e){this.token(5,function(e){let t="",n=!1
for(let r=0;r<e.length;r++){const s=e.charCodeAt(r)
0x0000!==s?s<=0x001f||0x007F===s?(t+="\\"+s.toString(16),n=!0):34===s||92===s?(t+="\\"+e.charAt(r),n=!1):(n&&(ln(s)||dn(s))&&(t+=" "),t+=e.charAt(r),n=!1):t+="�"}return'"'+t+'"'}(e.value))},name:"String",parse:ml,structure:dl})
function yl(){return this.Raw(null,!1)}function bl(){const e=this.tokenStart,t=this.createList()
let n
for(;!this.eof;){switch(this.tokenType){case Xt:this.next()
continue
case on:if(33!==this.charCodeAt(this.tokenStart+2)){this.next()
continue}n=this.Comment()
break
case 14:n=this.CDO()
break
case Ht:n=this.CDC()
break
case 3:n=this.parseWithFallback(this.Atrule,yl)
break
default:n=this.parseWithFallback(this.Rule,yl)}t.push(n)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}var kl=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"StyleSheet",parse:bl,structure:{children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]},walkContext:"stylesheet"})
function vl(){const e=this.tokenStart
this.eat(tn),this.skipSC()
const t=this.Declaration()
return this.eof||this.eat(nn),{type:"SupportsDeclaration",loc:this.getLocation(e,this.tokenStart),declaration:t}}var Sl=Object.freeze({__proto__:null,generate:function(e){this.token(tn,"("),this.node(e.declaration),this.token(nn,")")},name:"SupportsDeclaration",parse:vl,structure:{declaration:"Declaration"}})
function wl(){1!==this.tokenType&&!1===this.isDelim(42)&&this.error("Identifier or asterisk is expected"),this.next()}const xl={name:String}
function Cl(){const e=this.tokenStart
return this.isDelim(124)?(this.next(),wl.call(this)):(wl.call(this),this.isDelim(124)&&(this.next(),wl.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}var Al=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"TypeSelector",parse:Cl,structure:xl})
function _l(e,t){let n=0
for(let r=this.tokenStart+e;r<this.tokenEnd;r++){const s=this.charCodeAt(r)
if(45===s&&t&&0!==n)return _l.call(this,e+n+1,!1),-1
ln(s)||this.error(t&&0!==n?"Hyphen minus"+(n<6?" or hex digit":"")+" is expected":n<6?"Hex digit is expected":"Unexpected input",r),++n>6&&this.error("Too many hex digits",r)}return this.next(),n}function Tl(e){let t=0
for(;this.isDelim(63);)++t>e&&this.error("Too many question marks"),this.next()}function El(e){this.charCodeAt(this.tokenStart)!==e&&this.error((43===e?"Plus sign":"Hyphen minus")+" is expected")}function Ol(){let e=0
switch(this.tokenType){case Vt:if(e=_l.call(this,1,!0),this.isDelim(63)){Tl.call(this,6-e)
break}if(this.tokenType===Yt||this.tokenType===Vt){El.call(this,45),_l.call(this,1,!1)
break}break
case Yt:e=_l.call(this,1,!0),e>0&&Tl.call(this,6-e)
break
default:if(this.eatDelim(43),1===this.tokenType){e=_l.call(this,0,!0),e>0&&Tl.call(this,6-e)
break}if(this.isDelim(63)){this.next(),Tl.call(this,5)
break}this.error("Hex digit or question mark is expected")}}const Pl={value:String}
function Ll(){const e=this.tokenStart
return this.eatIdent("u"),Ol.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var Nl=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"UnicodeRange",parse:Ll,structure:Pl})
const Dl={value:String}
function Ml(){const e=this.tokenStart
let t
switch(this.tokenType){case 7:t=function(e){const t=e.length
let n=4,r=41===e.charCodeAt(t-1)?t-2:t-1,s=""
for(;n<r&&dn(e.charCodeAt(n));)n++
for(;n<r&&dn(e.charCodeAt(r));)r--
for(let i=n;i<=r;i++){let n=e.charCodeAt(i)
if(92===n){if(i===r){i!==t-1&&(s=e.substr(i+1))
break}if(n=e.charCodeAt(++i),mn(92,n)){const t=i-1,n=En(e,t)
i=n-1,s+=Nn(e.substring(t+1,n))}else 0x000d===n&&0x000a===e.charCodeAt(i+1)&&i++}else s+=e[i]}return s}(this.consume(7))
break
case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=pl(this.consume(5)),this.skipSC(),this.eof||this.eat(nn)
break
default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}var jl=Object.freeze({__proto__:null,generate:function(e){this.token(7,function(e){let t="",n=!1
for(let r=0;r<e.length;r++){const s=e.charCodeAt(r)
0x0000!==s?s<=0x001f||0x007F===s?(t+="\\"+s.toString(16),n=!0):32===s||92===s||34===s||39===s||40===s||41===s?(t+="\\"+e.charAt(r),n=!1):(n&&ln(s)&&(t+=" "),t+=e.charAt(r),n=!1):t+="�"}return"url("+t+")"}(e.value))},name:"Url",parse:Ml,structure:Dl})
function Il(){const e=this.tokenStart,t=this.readSequence(this.scope.Value)
return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}var Rl=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Value",parse:Il,structure:{children:[[]]}})
const Fl=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),zl={value:String}
function Gl(){return this.eat(Xt),Fl}var Bl=Object.freeze({__proto__:null,generate:function(e){this.token(Xt,e.value)},name:"WhiteSpace",parse:Gl,structure:zl}),Ul=Object.freeze({__proto__:null,AnPlusB:Vi,Atrule:Qi,AtrulePrelude:Zi,AttributeSelector:ro,Block:co,Brackets:ho,CDC:po,CDO:go,ClassSelector:ko,Combinator:wo,Comment:Ao,Condition:Lo,Declaration:zo,DeclarationList:Uo,Dimension:Vo,Feature:Xo,FeatureFunction:Zo,FeatureRange:ra,Function:oa,GeneralEnclosed:ca,Hash:fa,IdSelector:ba,Identifier:ma,Layer:Sa,LayerList:xa,MediaQuery:_a,MediaQueryList:Ea,NestingSelector:Pa,Nth:Na,Number:ja,Operator:Fa,Parentheses:Ga,Percentage:qa,PseudoClassSelector:$a,PseudoElementSelector:Ha,Ratio:Za,Raw:nl,Rule:ol,Scope:ll,Selector:ul,SelectorList:fl,String:gl,StyleSheet:kl,SupportsDeclaration:Sl,TypeSelector:Al,UnicodeRange:Nl,Url:jl,Value:Rl,WhiteSpace:Bl}),ql={generic:!0,cssWideKeywords:Zr,...Mi,node:Ul}
function Wl(e){switch(this.tokenType){case 4:return this.Hash()
case Zt:return this.Operator()
case tn:return this.Parentheses(this.readSequence,e.recognizer)
case Jt:return this.Brackets(this.readSequence,e.recognizer)
case 5:return this.String()
case Yt:return this.Dimension()
case $t:return this.Percentage()
case Vt:return this.Number()
case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer)
case 7:return this.Url()
case 1:return this.cmpChar(this.tokenStart,117)&&this.cmpChar(this.tokenStart+1,43)?this.UnicodeRange():this.Identifier()
case 9:{const e=this.charCodeAt(this.tokenStart)
if(47===e||42===e||43===e||45===e)return this.Operator()
35===e&&this.error("Hex or identifier is expected",this.tokenStart+1)
break}}}var Vl={getNode:Wl}
var $l={onWhiteSpace:function(e,t){null!==t.last&&"Combinator"!==t.last.type&&null!==e&&"Combinator"!==e.type&&t.push({type:"Combinator",loc:null,name:" "})},getNode:function(){switch(this.tokenType){case Jt:return this.AttributeSelector()
case 4:return this.IdSelector()
case Qt:return this.lookupType(1)===Qt?this.PseudoElementSelector():this.PseudoClassSelector()
case 1:return this.TypeSelector()
case Vt:case $t:return this.Percentage()
case Yt:46===this.charCodeAt(this.tokenStart)&&this.error("Identifier is expected",this.tokenStart+1)
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 43:case 62:case 126:case 47:return this.Combinator()
case 46:return this.ClassSelector()
case 42:case 124:return this.TypeSelector()
case 35:return this.IdSelector()
case 38:return this.NestingSelector()}break}}}
function Yl(e){return null!==e&&"Operator"===e.type&&("-"===e.value[e.value.length-1]||"+"===e.value[e.value.length-1])}var Xl={getNode:Wl,onWhiteSpace(e,t){Yl(e)&&(e.value=" "+e.value),Yl(t.last)&&(t.last.value+=" ")},expression:function(){return this.createSingleNodeList(this.Raw(null,!1))},var:function(){const e=this.createList()
if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===Zt){e.push(this.Operator())
const t=this.tokenIndex,n=this.parseCustomProperty?this.Value(null):this.Raw(this.consumeUntilExclamationMarkOrSemicolon,!1)
if("Value"===n.type&&n.children.isEmpty)for(let e=t-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Xt){n.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}e.push(n)}return e}},Hl=Object.freeze({__proto__:null,AtrulePrelude:Vl,Selector:$l,Value:Xl})
const Ql=new Set(["none","and","not","or"])
var Kl={parse:{prelude(){const e=this.createList()
if(1===this.tokenType){const t=this.substring(this.tokenStart,this.tokenEnd)
Ql.has(t.toLowerCase())||e.push(this.Identifier())}return e.push(this.Condition("container")),e},block(e=!1){return this.Block(e)}}},Zl={parse:{prelude:null,block(){return this.Block(!0)}}}
function Jl(e,t){return this.parseWithFallback(()=>{try{return e.call(this)}finally{this.skipSC(),this.lookupNonWSType(0)!==nn&&this.error()}},t||(()=>this.Raw(null,!0)))}const ec={layer(){this.skipSC()
const e=this.createList(),t=Jl.call(this,this.Layer)
return"Raw"===t.type&&""===t.value||e.push(t),e},supports(){this.skipSC()
const e=this.createList(),t=Jl.call(this,this.Declaration,()=>Jl.call(this,()=>this.Condition("supports")))
return"Raw"===t.type&&""===t.value||e.push(t),e}}
var tc={container:Kl,"font-face":Zl,import:{parse:{prelude(){const e=this.createList()
switch(this.tokenType){case 5:e.push(this.String())
break
case 7:case 2:e.push(this.Url())
break
default:this.error("String or url() is expected")}return this.skipSC(),1===this.tokenType&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer")?e.push(this.Identifier()):2===this.tokenType&&this.cmpStr(this.tokenStart,this.tokenEnd,"layer(")&&e.push(this.Function(null,ec)),this.skipSC(),2===this.tokenType&&this.cmpStr(this.tokenStart,this.tokenEnd,"supports(")&&e.push(this.Function(null,ec)),1!==this.lookupNonWSType(0)&&this.lookupNonWSType(0)!==tn||e.push(this.MediaQueryList()),e},block:null}},layer:{parse:{prelude(){return this.createSingleNodeList(this.LayerList())},block(){return this.Block(!1)}}},media:{parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(e=!1){return this.Block(e)}}},nest:{parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}},page:{parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}},scope:{parse:{prelude(){return this.createSingleNodeList(this.Scope())},block(e=!1){return this.Block(e)}}},"starting-style":{parse:{prelude:null,block(e=!1){return this.Block(e)}}},supports:{parse:{prelude(){return this.createSingleNodeList(this.Condition("supports"))},block(e=!1){return this.Block(e)}}}}
const nc={parse(){return this.createSingleNodeList(this.SelectorList())}},rc={parse(){return this.createSingleNodeList(this.Selector())}},sc={parse(){return this.createSingleNodeList(this.Identifier())}},ic={parse:function(){const e=this.createList()
this.skipSC()
e:for(;!this.eof;){switch(this.tokenType){case 1:e.push(this.Identifier())
break
case 5:e.push(this.String())
break
case Zt:e.push(this.Operator())
break
case nn:break e
default:this.error("Identifier, string or comma is expected")}this.skipSC()}return e}},oc={parse(){return this.createSingleNodeList(this.Nth())}}
var ac={dir:sc,has:nc,lang:ic,matches:nc,is:nc,"-moz-any":nc,"-webkit-any":nc,where:nc,not:nc,"nth-child":oc,"nth-last-child":oc,"nth-last-of-type":oc,"nth-of-type":oc,slotted:rc,host:rc,"host-context":rc},lc=Object.freeze({__proto__:null,AnPlusB:Wi,Atrule:Hi,AtrulePrelude:Ki,AttributeSelector:no,Block:lo,Brackets:uo,CDC:fo,CDO:mo,ClassSelector:bo,Combinator:So,Comment:Co,Condition:Po,Declaration:Io,DeclarationList:Bo,Dimension:Wo,Feature:Yo,FeatureFunction:Ko,FeatureRange:na,Function:ia,GeneralEnclosed:la,Hash:ha,IdSelector:ya,Identifier:da,Layer:va,LayerList:wa,MediaQuery:Aa,MediaQueryList:Ta,NestingSelector:Oa,Nth:La,Number:Ma,Operator:Ra,Parentheses:za,Percentage:Ua,PseudoClassSelector:Va,PseudoElementSelector:Xa,Ratio:Ka,Raw:tl,Rule:il,Scope:al,Selector:cl,SelectorList:hl,String:ml,StyleSheet:bl,SupportsDeclaration:vl,TypeSelector:Cl,UnicodeRange:Ll,Url:Ml,Value:Il,WhiteSpace:Gl}),cc=(e=>Ci(xi({},e)))({...ql,...{parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",condition(e){return this.Condition(e.kind)},rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},features:{supports:{selector(){return this.Selector()}},container:{style(){return this.Declaration()}}},scope:Hl,atrule:tc,pseudo:ac,node:lc},...{node:Ul}})
const uc=e(import.meta.url),{version:hc}=uc("../package.json")
function fc(e){const t={}
for(const n of Object.keys(e)){let r=e[n]
r&&(Array.isArray(r)||r instanceof Wn?r=r.map(fc):r.constructor===Object&&(r=fc(r))),t[n]=r}return t}const{tokenize:pc,parse:dc,generate:mc,lexer:gc,createLexer:yc,walk:bc,find:kc,findLast:vc,findAll:Sc,toPlainObject:wc,fromPlainObject:xc,fork:Cc}=cc,Ac=e(import.meta.url),{version:_c}=Ac("../package.json"),Tc=10,Ec=11,Oc=12,Pc=13,Lc=15,Nc=16,Dc=17,Mc=18,jc=19,Ic=20,Rc=21,Fc=22,zc=23,Gc=24,Bc=25
function Uc(e){return e>=0x0030&&e<=0x0039}function qc(e){return Uc(e)||e>=0x0041&&e<=0x0046||e>=0x0061&&e<=0x0066}function Wc(e){return e>=0x0041&&e<=0x005A}function Vc(e){return function(e){return Wc(e)||function(e){return e>=0x0061&&e<=0x007A}(e)}(e)||function(e){return e>=0x0080}(e)||0x005F===e}function $c(e){return Vc(e)||Uc(e)||0x002D===e}function Yc(e){return e>=0x0000&&e<=0x0008||0x000B===e||e>=0x000E&&e<=0x001F||0x007F===e}function Xc(e){return 0x000A===e||0x000D===e||0x000C===e}function Hc(e){return Xc(e)||0x0020===e||0x0009===e}function Qc(e,t){return 0x005C===e&&(!Xc(t)&&0!==t)}function Kc(e,t,n){return 0x002D===e?Vc(t)||0x002D===t||Qc(t,n):!!Vc(e)||0x005C===e&&Qc(e,t)}function Zc(e,t,n){return 0x002B===e||0x002D===e?Uc(t)?2:0x002E===t&&Uc(n)?3:0:0x002E===e?Uc(t)?2:0:Uc(e)?1:0}function Jc(e){return 0xFEFF===e||0xFFFE===e?1:0}const eu=new Array(0x80),tu=0x82
for(let e=0;e<eu.length;e++)eu[e]=(Hc(e)?tu:Uc(e)&&131)||Vc(e)&&132||Yc(e)&&133||e||128
function nu(e){return e<0x80?eu[e]:132}function ru(e,t){return t<e.length?e.charCodeAt(t):0}function su(e,t,n){return 13===n&&10===ru(e,t+1)?2:1}function iu(e,t,n){let r=e.charCodeAt(t)
return Wc(r)&&(r|=32),r===n}function ou(e,t,n,r){if(n-t!==r.length)return!1
if(t<0||n>e.length)return!1
for(let s=t;s<n;s++){const n=r.charCodeAt(s-t)
let i=e.charCodeAt(s)
if(Wc(i)&&(i|=32),i!==n)return!1}return!0}function au(e,t){for(;t<e.length&&Hc(e.charCodeAt(t));t++);return t}function lu(e,t){for(;t<e.length&&Uc(e.charCodeAt(t));t++);return t}function cu(e,t){if(qc(ru(e,(t+=2)-1))){for(const n=Math.min(e.length,t+5);t<n&&qc(ru(e,t));t++);const n=ru(e,t)
Hc(n)&&(t+=su(e,t,n))}return t}function uu(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(!$c(n)){if(!Qc(n,ru(e,t+1)))break
t=cu(e,t)-1}}return t}function hu(e,t){let n=e.charCodeAt(t)
if(0x002B!==n&&0x002D!==n||(n=e.charCodeAt(t+=1)),Uc(n)&&(t=lu(e,t+1),n=e.charCodeAt(t)),0x002E===n&&Uc(e.charCodeAt(t+1))&&(t=lu(e,t+=2)),iu(e,t,101)){let r=0
n=e.charCodeAt(t+1),0x002D!==n&&0x002B!==n||(r=1,n=e.charCodeAt(t+2)),Uc(n)&&(t=lu(e,t+1+r+1))}return t}function fu(e,t){for(;t<e.length;t++){const n=e.charCodeAt(t)
if(0x0029===n){t++
break}Qc(n,ru(e,t+1))&&(t=cu(e,t))}return t}function pu(e){if(1===e.length&&!qc(e.charCodeAt(0)))return e[0]
let t=parseInt(e,16)
return(0===t||t>=0xD800&&t<=0xDFFF||t>0x10FFFF)&&(t=0xFFFD),String.fromCodePoint(t)}var du=["EOF-token","ident-token","function-token","at-keyword-token","hash-token","string-token","bad-string-token","url-token","bad-url-token","delim-token","number-token","percentage-token","dimension-token","whitespace-token","CDO-token","CDC-token","colon-token","semicolon-token","comma-token","[-token","]-token","(-token",")-token","{-token","}-token"]
function mu(e=null,t){return null===e||e.length<t?new Uint32Array(Math.max(t+1024,16384)):e}function gu(e){const t=e.source,n=t.length,r=t.length>0?Jc(t.charCodeAt(0)):0,s=mu(e.lines,n),i=mu(e.columns,n)
let o=e.startLine,a=e.startColumn
for(let e=r;e<n;e++){const r=t.charCodeAt(e)
s[e]=o,i[e]=a++,10!==r&&13!==r&&12!==r||(13===r&&e+1<n&&10===t.charCodeAt(e+1)&&(e++,s[e]=o,i[e]=a),o++,a=1)}s[n]=o,i[n]=a,e.lines=s,e.columns=i,e.computed=!0}class yu{constructor(){this.lines=null,this.columns=null,this.computed=!1}setSource(e,t=0,n=1,r=1){this.source=e,this.startOffset=t,this.startLine=n,this.startColumn=r,this.computed=!1}getLocation(e,t){return this.computed||gu(this),{source:t,offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]}}getLocationRange(e,t,n){return this.computed||gu(this),{source:n,start:{offset:this.startOffset+e,line:this.lines[e],column:this.columns[e]},end:{offset:this.startOffset+t,line:this.lines[t],column:this.columns[t]}}}}const bu=0x00FFFFFF,ku=24,vu=new Map([[2,Fc],[Rc,Fc],[jc,Ic],[zc,Gc]])
class Su{constructor(e,t){this.setSource(e,t)}reset(){this.eof=!1,this.tokenIndex=-1,this.tokenType=0,this.tokenStart=this.firstCharOffset,this.tokenEnd=this.firstCharOffset}setSource(e="",t=()=>{}){const n=(e=String(e||"")).length,r=mu(this.offsetAndType,e.length+1),s=mu(this.balance,e.length+1)
let i=0,o=0,a=0,l=-1
for(this.offsetAndType=null,this.balance=null,t(e,(e,t,c)=>{switch(e){default:s[i]=n
break
case o:{let e=a&bu
for(a=s[e],o=a>>ku,s[i]=e,s[e++]=i;e<i;e++)s[e]===n&&(s[e]=i)
break}case Rc:case 2:case jc:case zc:s[i]=a,o=vu.get(e),a=o<<ku|i}r[i++]=e<<ku|c,-1===l&&(l=t)}),r[i]=0|n,s[i]=n,s[n]=n;0!==a;){const e=a&bu
a=s[e],s[e]=n}this.source=e,this.firstCharOffset=-1===l?0:l,this.tokenCount=i,this.offsetAndType=r,this.balance=s,this.reset(),this.next()}lookupType(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e]>>ku:0}lookupOffset(e){return(e+=this.tokenIndex)<this.tokenCount?this.offsetAndType[e-1]&bu:this.source.length}lookupValue(e,t){return(e+=this.tokenIndex)<this.tokenCount&&ou(this.source,this.offsetAndType[e-1]&bu,this.offsetAndType[e]&bu,t)}getTokenStart(e){return e===this.tokenIndex?this.tokenStart:e>0?e<this.tokenCount?this.offsetAndType[e-1]&bu:this.offsetAndType[this.tokenCount]&bu:this.firstCharOffset}substrToCursor(e){return this.source.substring(e,this.tokenStart)}isBalanceEdge(e){return this.balance[this.tokenIndex]<e}isDelim(e,t){return t?9===this.lookupType(t)&&this.source.charCodeAt(this.lookupOffset(t))===e:9===this.tokenType&&this.source.charCodeAt(this.tokenStart)===e}skip(e){let t=this.tokenIndex+e
t<this.tokenCount?(this.tokenIndex=t,this.tokenStart=this.offsetAndType[t-1]&bu,t=this.offsetAndType[t],this.tokenType=t>>ku,this.tokenEnd=t&bu):(this.tokenIndex=this.tokenCount,this.next())}next(){let e=this.tokenIndex+1
e<this.tokenCount?(this.tokenIndex=e,this.tokenStart=this.tokenEnd,e=this.offsetAndType[e],this.tokenType=e>>ku,this.tokenEnd=e&bu):(this.eof=!0,this.tokenIndex=this.tokenCount,this.tokenType=0,this.tokenStart=this.tokenEnd=this.source.length)}skipSC(){for(;this.tokenType===Pc||this.tokenType===Bc;)this.next()}skipUntilBalanced(e,t){let n,r,s=e
e:for(;s<this.tokenCount&&(n=this.balance[s],!(n<e));s++)switch(r=s>0?this.offsetAndType[s-1]&bu:this.firstCharOffset,t(this.source.charCodeAt(r))){case 1:break e
case 2:s++
break e
default:this.balance[n]===s&&(s=n)}this.skip(s-this.tokenIndex)}forEachToken(e){for(let t=0,n=this.firstCharOffset;t<this.tokenCount;t++){const r=n,s=this.offsetAndType[t],i=s&bu
n=i,e(s>>ku,r,i,t)}}dump(){const e=new Array(this.tokenCount)
return this.forEachToken((t,n,r,s)=>{e[s]={idx:s,type:du[t],chunk:this.source.substring(n,r),balance:this.balance[s]}}),e}}function wu(e,t){function n(t){return t<o?e.charCodeAt(t):0}function r(){return c=hu(e,c),Kc(n(c),n(c+1),n(c+2))?(a=Oc,c=uu(e,c),void 0):0x0025===n(c)?(a=Ec,c++,void 0):(a=Tc,void 0)}function s(){const t=c
return c=uu(e,c),ou(e,t,c,"url")&&0x0028===n(c)?(c=au(e,c+1),0x0022===n(c)||0x0027===n(c)?(a=2,c=t+4,void 0):(!function(){for(a=7,c=au(e,c);c<e.length;c++){const t=e.charCodeAt(c)
switch(nu(t)){case 0x0029:return c++,void 0
case tu:return c=au(e,c),0x0029===n(c)||c>=e.length?(c<e.length&&c++,void 0):(c=fu(e,c),a=8,void 0)
case 0x0022:case 0x0027:case 0x0028:case 133:return c=fu(e,c),a=8,void 0
case 0x005C:if(Qc(t,n(c+1))){c=cu(e,c)-1
break}return c=fu(e,c),a=8,void 0}}}(),void 0)):0x0028===n(c)?(a=2,c++,void 0):(a=1,void 0)}function i(t){for(t||(t=n(c++)),a=5;c<e.length;c++){const r=e.charCodeAt(c)
switch(nu(r)){case t:return c++,void 0
case tu:if(Xc(r))return c+=su(e,c,r),a=6,void 0
break
case 0x005C:if(c===e.length-1)break
const s=n(c+1)
Xc(s)?c+=su(e,c+1,s):Qc(r,s)&&(c=cu(e,c)-1)}}}const o=(e=String(e||"")).length
let a,l=Jc(n(0)),c=l
for(;c<o;){const o=e.charCodeAt(c)
switch(nu(o)){case tu:a=Pc,c=au(e,c+1)
break
case 0x0022:i()
break
case 0x0023:$c(n(c+1))||Qc(n(c+1),n(c+2))?(a=4,c=uu(e,c+1)):(a=9,c++)
break
case 0x0027:i()
break
case 0x0028:a=Rc,c++
break
case 0x0029:a=Fc,c++
break
case 0x002B:Zc(o,n(c+1),n(c+2))?r():(a=9,c++)
break
case 0x002C:a=Mc,c++
break
case 0x002D:Zc(o,n(c+1),n(c+2))?r():0x002D===n(c+1)&&0x003E===n(c+2)?(a=Lc,c+=3):Kc(o,n(c+1),n(c+2))?s():(a=9,c++)
break
case 0x002E:Zc(o,n(c+1),n(c+2))?r():(a=9,c++)
break
case 0x002F:0x002A===n(c+1)?(a=Bc,c=e.indexOf("*/",c+2),c=-1===c?e.length:c+2):(a=9,c++)
break
case 0x003A:a=Nc,c++
break
case 0x003B:a=Dc,c++
break
case 0x003C:0x0021===n(c+1)&&0x002D===n(c+2)&&0x002D===n(c+3)?(a=14,c+=4):(a=9,c++)
break
case 0x0040:Kc(n(c+1),n(c+2),n(c+3))?(a=3,c=uu(e,c+1)):(a=9,c++)
break
case 0x005B:a=jc,c++
break
case 0x005C:Qc(o,n(c+1))?s():(a=9,c++)
break
case 0x005D:a=Ic,c++
break
case 0x007B:a=zc,c++
break
case 0x007D:a=Gc,c++
break
case 131:r()
break
case 132:s()
break
default:a=9,c++}t(a,l,l=c)}}let xu=null
class Cu{static createItem(e){return{prev:null,next:null,data:e}}constructor(){this.head=null,this.tail=null,this.cursor=null}createItem(e){return Cu.createItem(e)}allocateCursor(e,t){let n
return null!==xu?(n=xu,xu=xu.cursor,n.prev=e,n.next=t,n.cursor=this.cursor):n={prev:e,next:t,cursor:this.cursor},this.cursor=n,n}releaseCursor(){const{cursor:e}=this
this.cursor=e.cursor,e.prev=null,e.next=null,e.cursor=xu,xu=e}updateCursors(e,t,n,r){let{cursor:s}=this
for(;null!==s;)s.prev===e&&(s.prev=t),s.next===n&&(s.next=r),s=s.cursor}*[Symbol.iterator](){for(let e=this.head;null!==e;e=e.next)yield e.data}get size(){let e=0
for(let t=this.head;null!==t;t=t.next)e++
return e}get isEmpty(){return null===this.head}get first(){return this.head&&this.head.data}get last(){return this.tail&&this.tail.data}fromArray(e){let t=null
this.head=null
for(let n of e){const e=Cu.createItem(n)
null!==t?t.next=e:this.head=e,e.prev=t,t=e}return this.tail=t,this}toArray(){return[...this]}toJSON(){return[...this]}forEach(e,t=this){const n=this.allocateCursor(null,this.head)
for(;null!==n.next;){const r=n.next
n.next=r.next,e.call(t,r.data,r,this)}this.releaseCursor()}forEachRight(e,t=this){const n=this.allocateCursor(this.tail,null)
for(;null!==n.prev;){const r=n.prev
n.prev=r.prev,e.call(t,r.data,r,this)}this.releaseCursor()}reduce(e,t,n=this){let r,s=this.allocateCursor(null,this.head),i=t
for(;null!==s.next;)r=s.next,s.next=r.next,i=e.call(n,i,r.data,r,this)
return this.releaseCursor(),i}reduceRight(e,t,n=this){let r,s=this.allocateCursor(this.tail,null),i=t
for(;null!==s.prev;)r=s.prev,s.prev=r.prev,i=e.call(n,i,r.data,r,this)
return this.releaseCursor(),i}some(e,t=this){for(let n=this.head;null!==n;n=n.next)if(e.call(t,n.data,n,this))return!0
return!1}map(e,t=this){const n=new Cu
for(let r=this.head;null!==r;r=r.next)n.appendData(e.call(t,r.data,r,this))
return n}filter(e,t=this){const n=new Cu
for(let r=this.head;null!==r;r=r.next)e.call(t,r.data,r,this)&&n.appendData(r.data)
return n}nextUntil(e,t,n=this){if(null===e)return
const r=this.allocateCursor(null,e)
for(;null!==r.next;){const e=r.next
if(r.next=e.next,t.call(n,e.data,e,this))break}this.releaseCursor()}prevUntil(e,t,n=this){if(null===e)return
const r=this.allocateCursor(e,null)
for(;null!==r.prev;){const e=r.prev
if(r.prev=e.prev,t.call(n,e.data,e,this))break}this.releaseCursor()}clear(){this.head=null,this.tail=null}copy(){const e=new Cu
for(let t of this)e.appendData(t)
return e}prepend(e){return this.updateCursors(null,e,this.head,e),null!==this.head?(this.head.prev=e,e.next=this.head):this.tail=e,this.head=e,this}prependData(e){return this.prepend(Cu.createItem(e))}append(e){return this.insert(e)}appendData(e){return this.insert(Cu.createItem(e))}insert(e,t=null){if(null!==t)if(this.updateCursors(t.prev,e,t,e),null===t.prev){if(this.head!==t)throw new Error("before doesn't belong to list")
this.head=e,t.prev=e,e.next=t,this.updateCursors(null,e)}else t.prev.next=e,e.prev=t.prev,t.prev=e,e.next=t
else this.updateCursors(this.tail,e,null,e),null!==this.tail?(this.tail.next=e,e.prev=this.tail):this.head=e,this.tail=e
return this}insertData(e,t){return this.insert(Cu.createItem(e),t)}remove(e){if(this.updateCursors(e,e.prev,e,e.next),null!==e.prev)e.prev.next=e.next
else{if(this.head!==e)throw new Error("item doesn't belong to list")
this.head=e.next}if(null!==e.next)e.next.prev=e.prev
else{if(this.tail!==e)throw new Error("item doesn't belong to list")
this.tail=e.prev}return e.prev=null,e.next=null,e}push(e){this.insert(Cu.createItem(e))}pop(){return null!==this.tail?this.remove(this.tail):null}unshift(e){this.prepend(Cu.createItem(e))}shift(){return null!==this.head?this.remove(this.head):null}prependList(e){return this.insertList(e,this.head)}appendList(e){return this.insertList(e)}insertList(e,t){return null===e.head||(null!=t?(this.updateCursors(t.prev,e.tail,t,e.head),null!==t.prev?(t.prev.next=e.head,e.head.prev=t.prev):this.head=e.head,t.prev=e.tail,e.tail.next=t):(this.updateCursors(this.tail,e.tail,null,e.head),null!==this.tail?(this.tail.next=e.head,e.head.prev=this.tail):this.head=e.head,this.tail=e.tail),e.head=null,e.tail=null),this}replace(e,t){"head"in t?this.insertList(t,e):this.insert(t,e),this.remove(e)}}function Au(e,t){const n=Object.create(SyntaxError.prototype),r=new Error
return Object.assign(n,{name:e,message:t,get stack(){return(r.stack||"").replace(/^(.+\n){1,3}/,`${e}: ${t}\n`)}})}const _u="    "
function Tu({source:e,line:t,column:n},r){function s(e,t){return i.slice(e,t).map((t,n)=>String(e+n+1).padStart(l)+" |"+t).join("\n")}const i=e.split(/\r\n?|\n|\f/),o=Math.max(1,t-r)-1,a=Math.min(t+r,i.length+1),l=Math.max(4,String(a).length)+1
let c=0;(n+=3*(i[t-1].substr(0,n-1).match(/\t/g)||[]).length)>100&&(c=n-60+3,n=58)
for(let e=o;e<=a;e++)e>=0&&e<i.length&&(i[e]=i[e].replace(/\t/g,_u),i[e]=(c>0&&i[e].length>c?"…":"")+i[e].substr(c,98)+(i[e].length>c+100-1?"…":""))
return[s(o,t),new Array(n+l+2).join("-")+"^",s(t,a)].filter(Boolean).join("\n")}function Eu(e,t,n,r,s){return Object.assign(Au("SyntaxError",e),{source:t,offset:n,line:r,column:s,sourceFragment:e=>Tu({source:t,line:r,column:s},isNaN(e)?0:e),get formattedMessage(){return`Parse error: ${e}\n`+Tu({source:t,line:r,column:s},2)}})}function Ou(e){const t=this.createList()
let n=!1
const r={recognizer:e}
for(;!this.eof;){switch(this.tokenType){case Bc:this.next()
continue
case Pc:n=!0,this.next()
continue}let s=e.getNode.call(this,r)
if(void 0===s)break
n&&(e.onWhiteSpace&&e.onWhiteSpace.call(this,s,t,r),n=!1),t.push(s)}return n&&e.onWhiteSpace&&e.onWhiteSpace.call(this,null,t,r),t}const Pu=()=>{}
function Lu(e){return function(){return this[e]()}}function Nu(e){const t=Object.create(null)
for(const n in e){const r=e[n],s=r.parse||r
s&&(t[n]=s)}return t}function Du(e){let t="",n="<unknown>",r=!1,s=Pu,i=!1
const o=new yu,a=Object.assign(new Su,function(e){const t={context:Object.create(null),scope:Object.assign(Object.create(null),e.scope),atrule:Nu(e.atrule),pseudo:Nu(e.pseudo),node:Nu(e.node)}
for(const n in e.parseContext)switch(typeof e.parseContext[n]){case"function":t.context[n]=e.parseContext[n]
break
case"string":t.context[n]=Lu(e.parseContext[n])}return{config:t,...t,...t.node}}(e||{}),{parseAtrulePrelude:!0,parseRulePrelude:!0,parseValue:!0,parseCustomProperty:!1,readSequence:Ou,consumeUntilBalanceEnd:()=>0,consumeUntilLeftCurlyBracket:e=>123===e?1:0,consumeUntilLeftCurlyBracketOrSemicolon:e=>123===e||59===e?1:0,consumeUntilExclamationMarkOrSemicolon:e=>33===e||59===e?1:0,consumeUntilSemicolonIncluded:e=>59===e?2:0,createList:()=>new Cu,createSingleNodeList:e=>(new Cu).appendData(e),getFirstListNode:e=>e&&e.first,getLastListNode:e=>e&&e.last,parseWithFallback(e,t){const n=this.tokenIndex
try{return e.call(this)}catch(e){if(i)throw e
const r=t.call(this,n)
return i=!0,s(e,r),i=!1,r}},lookupNonWSType(e){let t
do{if(t=this.lookupType(e++),t!==Pc)return t}while(0!==t)
return 0},charCodeAt:e=>e>=0&&e<t.length?t.charCodeAt(e):0,substring:(e,n)=>t.substring(e,n),substrToCursor(e){return this.source.substring(e,this.tokenStart)},cmpChar:(e,n)=>iu(t,e,n),cmpStr:(e,n,r)=>ou(t,e,n,r),consume(e){const t=this.tokenStart
return this.eat(e),this.substrToCursor(t)},consumeFunctionName(){const e=t.substring(this.tokenStart,this.tokenEnd-1)
return this.eat(2),e},consumeNumber(e){const n=t.substring(this.tokenStart,hu(t,this.tokenStart))
return this.eat(e),n},eat(e){if(this.tokenType!==e){const t=du[e].slice(0,-6).replace(/-/g," ").replace(/^./,e=>e.toUpperCase())
let n=`${/[[\](){}]/.test(t)?`"${t}"`:t} is expected`,r=this.tokenStart
switch(e){case 1:2===this.tokenType||7===this.tokenType?(r=this.tokenEnd-1,n="Identifier is expected but function found"):n="Identifier is expected"
break
case 4:this.isDelim(35)&&(this.next(),r++,n="Name is expected")
break
case Ec:this.tokenType===Tc&&(r=this.tokenEnd,n="Percent sign is expected")}this.error(n,r)}this.next()},eatIdent(e){1===this.tokenType&&!1!==this.lookupValue(0,e)||this.error(`Identifier "${e}" is expected`),this.next()},eatDelim(e){this.isDelim(e)||this.error(`Delim "${String.fromCharCode(e)}" is expected`),this.next()},getLocation:(e,t)=>r?o.getLocationRange(e,t,n):null,getLocationFromList(e){if(r){const t=this.getFirstListNode(e),r=this.getLastListNode(e)
return o.getLocationRange(null!==t?t.loc.start.offset-o.startOffset:this.tokenStart,null!==r?r.loc.end.offset-o.startOffset:this.tokenStart,n)}return null},error(e,n){const r=void 0!==n&&n<t.length?o.getLocation(n):this.eof?o.getLocation(function(e,t){for(;t>=0&&Hc(e.charCodeAt(t));t--);return t+1}(t,t.length-1)):o.getLocation(this.tokenStart)
throw new Eu(e||"Unexpected input",t,r.offset,r.line,r.column)}})
return Object.assign(function(e,l){t=e,l=l||{},a.setSource(t,wu),o.setSource(t,l.offset,l.line,l.column),n=l.filename||"<unknown>",r=Boolean(l.positions),s="function"==typeof l.onParseError?l.onParseError:Pu,i=!1,a.parseAtrulePrelude=!("parseAtrulePrelude"in l)||Boolean(l.parseAtrulePrelude),a.parseRulePrelude=!("parseRulePrelude"in l)||Boolean(l.parseRulePrelude),a.parseValue=!("parseValue"in l)||Boolean(l.parseValue),a.parseCustomProperty="parseCustomProperty"in l&&Boolean(l.parseCustomProperty)
const{context:c="default",onComment:u}=l
if(c in a.context==!1)throw new Error("Unknown context `"+c+"`")
"function"==typeof u&&a.forEachToken((e,n,r)=>{if(e===Bc){const e=a.getLocation(n,r),s=ou(t,r-2,r,"*/")?t.slice(n+2,r-2):t.slice(n+2,r)
u(s,e)}})
const h=a.context[c].call(a,l)
return a.eof||a.error(),h},{SyntaxError:Eu,config:a.config})}const Mu=new Set(["Atrule","Selector","Declaration"])
const ju=(e,t)=>{if(9===e&&(e=t),"string"==typeof e){const t=e.charCodeAt(0)
return t>0x7F?0x8000:t<<8}return e},Iu=[[1,1],[1,2],[1,7],[1,8],[1,"-"],[1,Tc],[1,Ec],[1,Oc],[1,Lc],[1,Rc],[3,1],[3,2],[3,7],[3,8],[3,"-"],[3,Tc],[3,Ec],[3,Oc],[3,Lc],[4,1],[4,2],[4,7],[4,8],[4,"-"],[4,Tc],[4,Ec],[4,Oc],[4,Lc],[Oc,1],[Oc,2],[Oc,7],[Oc,8],[Oc,"-"],[Oc,Tc],[Oc,Ec],[Oc,Oc],[Oc,Lc],["#",1],["#",2],["#",7],["#",8],["#","-"],["#",Tc],["#",Ec],["#",Oc],["#",Lc],["-",1],["-",2],["-",7],["-",8],["-","-"],["-",Tc],["-",Ec],["-",Oc],["-",Lc],[Tc,1],[Tc,2],[Tc,7],[Tc,8],[Tc,Tc],[Tc,Ec],[Tc,Oc],[Tc,"%"],[Tc,Lc],["@",1],["@",2],["@",7],["@",8],["@","-"],["@",Lc],[".",Tc],[".",Ec],[".",Oc],["+",Tc],["+",Ec],["+",Oc],["/","*"]],Ru=Iu.concat([[1,4],[Oc,4],[4,4],[3,Rc],[3,5],[3,Nc],[Ec,Ec],[Ec,Oc],[Ec,2],[Ec,"-"],[Fc,1],[Fc,2],[Fc,Ec],[Fc,Oc],[Fc,4],[Fc,"-"]])
function Fu(e){const t=new Set(e.map(([e,t])=>ju(e)<<16|ju(t)))
return function(e,n,r){const s=ju(n,r),i=r.charCodeAt(0)
return(45===i&&1!==n&&2!==n&&n!==Lc||43===i?t.has(e<<16|i<<8):t.has(e<<16|s))&&this.emit(" ",Pc,!0),s}}const zu=Fu(Iu),Gu=Fu(Ru)
var Bu=Object.freeze({__proto__:null,safe:Gu,spec:zu})
function Uu(e,t){if("function"==typeof t){let n=null
return e.children.forEach(e=>{null!==n&&t.call(this,n),this.node(e),n=e}),void 0}e.children.forEach(this.node,this)}function qu(e){wu(e,(t,n,r)=>{this.token(t,e.slice(n,r))})}function Wu(e){const t=new Map
for(let n in e.node){const r=e.node[n]
"function"==typeof(r.generate||r)&&t.set(n,r.generate||r)}return function(e,n){let r="",s=0,i={node(e){if(!t.has(e.type))throw new Error("Unknown node type: "+e.type)
t.get(e.type).call(o,e)},tokenBefore:Gu,token(e,t){s=this.tokenBefore(s,e,t),this.emit(t,e,!1),9===e&&92===t.charCodeAt(0)&&this.emit("\n",Pc,!0)},emit(e){r+=e},result:()=>r}
n&&("function"==typeof n.decorator&&(i=n.decorator(i)),n.sourceMap&&(i=function(e){const t=new br,n={line:1,column:0},r={line:0,column:0},s={line:1,column:0},i={generated:s}
let o=1,a=0,l=!1
const c=e.node
e.node=function(e){if(e.loc&&e.loc.start&&Mu.has(e.type)){const c=e.loc.start.line,u=e.loc.start.column-1
r.line===c&&r.column===u||(r.line=c,r.column=u,n.line=o,n.column=a,l&&(l=!1,n.line===s.line&&n.column===s.column||t.addMapping(i)),l=!0,t.addMapping({source:e.loc.source,original:r,generated:n}))}c.call(this,e),l&&Mu.has(e.type)&&(s.line=o,s.column=a)}
const u=e.emit
e.emit=function(e,t,n){for(let t=0;t<e.length;t++)10===e.charCodeAt(t)?(o++,a=0):a++
u(e,t,n)}
const h=e.result
return e.result=function(){return l&&t.addMapping(i),{css:h(),map:t}},e}(i)),n.mode in Bu&&(i.tokenBefore=Bu[n.mode]))
const o={node:e=>i.node(e),children:Uu,token:(e,t)=>i.token(e,t),tokenize:qu}
return i.node(e),i.result()}}const{hasOwnProperty:Vu}=Object.prototype,$u=function(){}
function Yu(e){return"function"==typeof e?e:$u}function Xu(e,t){return function(n,r,s){n.type===t&&e.call(this,n,r,s)}}function Hu(e,t){const n=t.structure,r=[]
for(const e in n){if(!1===Vu.call(n,e))continue
let t=n[e]
const s={name:e,type:!1,nullable:!1}
Array.isArray(t)||(t=[t])
for(const e of t)null===e?s.nullable=!0:"string"==typeof e?s.type="node":Array.isArray(e)&&(s.type="list")
s.type&&r.push(s)}return r.length?{context:t.walkContext,fields:r}:null}function Qu(e,t){const n=e.fields.slice(),r=e.context,s="string"==typeof r
return t&&n.reverse(),function(e,i,o,a){let l
s&&(l=i[r],i[r]=e)
for(const r of n){const n=e[r.name]
if(!r.nullable||n)if("list"===r.type){if(t?n.reduceRight(a,!1):n.reduce(a,!1))return!0}else if(o(n))return!0}s&&(i[r]=l)}}function Ku({StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:s}){return{Atrule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Rule:{StyleSheet:e,Atrule:t,Rule:n,Block:r},Declaration:{StyleSheet:e,Atrule:t,Rule:n,Block:r,DeclarationList:s}}}function Zu(e){const t=function(e){const t={}
for(const n in e.node)if(Vu.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=Hu(0,r)}return t}(e),n={},r={},s=Symbol("break-walk"),i=Symbol("skip-node")
for(const e in t)Vu.call(t,e)&&null!==t[e]&&(n[e]=Qu(t[e],!1),r[e]=Qu(t[e],!0))
const o=Ku(n),a=Ku(r),l=function(e,l){function c(e,t,n){const r=u.call(d,e,t,n)
return r===s||r!==i&&(!(!f.hasOwnProperty(e.type)||!f[e.type](e,d,c,p))||h.call(d,e,t,n)===s)}let u=$u,h=$u,f=n,p=(e,t,n,r)=>e||c(t,n,r)
const d={break:s,skip:i,root:e,stylesheet:null,atrule:null,atrulePrelude:null,rule:null,selector:null,block:null,declaration:null,function:null}
if("function"==typeof l)u=l
else if(l&&(u=Yu(l.enter),h=Yu(l.leave),l.reverse&&(f=r),l.visit)){if(o.hasOwnProperty(l.visit))f=l.reverse?a[l.visit]:o[l.visit]
else if(!t.hasOwnProperty(l.visit))throw new Error("Bad value `"+l.visit+"` for `visit` option (should be: "+Object.keys(t).sort().join(", ")+")")
u=Xu(u,l.visit),h=Xu(h,l.visit)}if(u===$u&&h===$u)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
c(e)}
return l.break=s,l.skip=i,l.find=function(e,t){let n=null
return l(e,function(e,r,i){if(t.call(this,e,r,i))return n=e,s}),n},l.findLast=function(e,t){let n=null
return l(e,{reverse:!0,enter(e,r,i){if(t.call(this,e,r,i))return n=e,s}}),n},l.findAll=function(e,t){const n=[]
return l(e,function(e,r,s){t.call(this,e,r,s)&&n.push(e)}),n},l}function Ju(e){return e}function eh(e,t,n,r){let s
switch(e.type){case"Group":s=function(e,t,n,r){const s=" "===e.combinator||r?e.combinator:" "+e.combinator+" ",i=e.terms.map(e=>eh(e,t,n,r)).join(s)
return e.explicit||n?(r||","===i[0]?"[":"[ ")+i+(r?"]":" ]"):i}(e,t,n,r)+(e.disallowEmpty?"!":"")
break
case"Multiplier":return eh(e.term,t,n,r)+t(function(e){const{min:t,max:n,comma:r}=e
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
default:throw new Error("Unknown node type `"+e.type+"`")}return t(s,e)}function th(e,t){let n=Ju,r=!1,s=!1
return"function"==typeof t?n=t:t&&(r=Boolean(t.forceBraces),s=Boolean(t.compact),"function"==typeof t.decorate&&(n=t.decorate)),eh(e,n,r,s)}const nh={offset:0,line:1,column:1}
function rh(e,t){const n=e&&e.loc&&e.loc[t]
return n?"line"in n?sh(n):n:null}function sh({offset:e,line:t,column:n},r){const s={offset:e,line:t,column:n}
if(r){const e=r.split(/\n|\r\n?|\f/)
s.offset+=r.length,s.line+=e.length-1,s.column=1===e.length?s.column+r.length:e.pop().length+1}return s}const ih=function(e,t){const n=Au("SyntaxReferenceError",e+(t?" `"+t+"`":""))
return n.reference=t,n},oh=function(e,t,n,r){const s=Au("SyntaxMatchError",e),{css:i,mismatchOffset:o,mismatchLength:a,start:l,end:c}=function(e,t){const n=e.tokens,r=e.longestMatch,s=r<n.length&&n[r].node||null,i=s!==t?s:null
let o,a,l=0,c=0,u=0,h=""
for(let e=0;e<n.length;e++){const t=n[e].value
e===r&&(c=t.length,l=h.length),null!==i&&n[e].node===i&&(e<=r?u++:u=0),h+=t}return r===n.length||u>1?(o=rh(i||t,"end")||sh(nh,h),a=sh(o)):(o=rh(i,"start")||sh(rh(t,"start")||nh,h.slice(0,l)),a=rh(i,"end")||sh(o,h.substr(l,c))),{css:h,mismatchOffset:l,mismatchLength:c,start:o,end:a}}(r,n)
return s.rawMessage=e,s.syntax=t?th(t):"<generic>",s.css=i,s.mismatchOffset=o,s.mismatchLength=a,s.message=e+"\n  syntax: "+s.syntax+"\n   value: "+(i||"<empty string>")+"\n  --------"+new Array(s.mismatchOffset+1).join("-")+"^",Object.assign(s,l),s.loc={source:n&&n.loc&&n.loc.source||"<unknown>",start:l,end:c},s},ah=new Map,lh=new Map,ch=function(e){if(ah.has(e))return ah.get(e)
const t=e.toLowerCase()
let n=ah.get(t)
if(void 0===n){const e=hh(t,0),r=e?"":fh(t,0)
n=Object.freeze({basename:t.substr(r.length),name:t,prefix:r,vendor:r,custom:e})}return ah.set(e,n),n},uh=function(e){if(lh.has(e))return lh.get(e)
let t=e,n=e[0]
"/"===n?n="/"===e[1]?"//":"/":"_"!==n&&"*"!==n&&"$"!==n&&"#"!==n&&"+"!==n&&"&"!==n&&(n="")
const r=hh(t,n.length)
if(!r&&(t=t.toLowerCase(),lh.has(t))){const n=lh.get(t)
return lh.set(e,n),n}const s=r?"":fh(t,n.length),i=t.substr(0,n.length+s.length),o=Object.freeze({basename:t.substr(i.length),name:t.substr(n.length),hack:n,vendor:s,prefix:i,custom:r})
return lh.set(e,o),o}
function hh(e,t){return t=t||0,e.length-t>=2&&45===e.charCodeAt(t)&&45===e.charCodeAt(t+1)}function fh(e,t){if(t=t||0,e.length-t>=3&&45===e.charCodeAt(t)&&45!==e.charCodeAt(t+1)){const n=e.indexOf("-",t+2)
if(-1!==n)return e.substring(t,n+1)}return""}const ph=["initial","inherit","unset","revert","revert-layer"],dh=0x002D,mh=!0
function gh(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function yh(e,t,n){for(;null!==e&&(e.type===Pc||e.type===Bc);)e=n(++t)
return t}function bh(e,t,n,r){if(!e)return 0
const s=e.value.charCodeAt(t)
if(43===s||s===dh){if(n)return 0
t++}for(;t<e.value.length;t++)if(!Uc(e.value.charCodeAt(t)))return 0
return r+1}function kh(e,t,n){let r=!1,s=yh(e,t,n)
if(null===(e=n(s)))return t
if(e.type!==Tc){if(!gh(e,43)&&!gh(e,dh))return t
if(r=!0,s=yh(n(++s),s,n),null===(e=n(s))||e.type!==Tc)return 0}if(!r){const t=e.value.charCodeAt(0)
if(43!==t&&t!==dh)return 0}return bh(e,r?0:1,r,s)}function vh(e,t){return null!==e&&9===e.type&&e.value.charCodeAt(0)===t}function Sh(e,t,n){let r=0
for(let s=t;s<e.value.length;s++){const i=e.value.charCodeAt(s)
if(45===i&&n&&0!==r)return Sh(e,t+r+1,!1),6
if(!qc(i))return 0
if(++r>6)return 0}return r}function wh(e,t,n){if(!e)return 0
for(;vh(n(t),63);){if(++e>6)return 0
t++}return t}const xh=["calc(","-moz-calc(","-webkit-calc("],Ch=new Map([[2,Fc],[Rc,Fc],[jc,Ic],[zc,Gc]])
function Ah(e,t){return t<e.length?e.charCodeAt(t):0}function _h(e,t){return ou(e,0,e.length,t)}function Th(e,t){for(let n=0;n<t.length;n++)if(_h(e,t[n]))return!0
return!1}function Eh(e,t){return t===e.length-2&&(0x005C===Ah(e,t)&&Uc(Ah(e,t+1)))}function Oh(e,t,n){if(e&&"Range"===e.type){const r=Number(void 0!==n&&n!==t.length?t.substr(0,n):t)
if(isNaN(r))return!0
if(null!==e.min&&r<e.min&&"string"!=typeof e.min)return!0
if(null!==e.max&&r>e.max&&"string"!=typeof e.max)return!0}return!1}function Ph(e){return function(t,n,r){return null===t?0:2===t.type&&Th(t.value,xh)?function(e,t){let n=0,r=[],s=0
e:do{switch(e.type){case Gc:case Fc:case Ic:if(e.type!==n)break e
if(n=r.pop(),0===r.length){s++
break e}break
case 2:case Rc:case jc:case zc:r.push(n),n=Ch.get(e.type)}s++}while(e=t(s))
return s}(t,n):e(t,n,r)}}function Lh(e){return function(t){return null===t||t.type!==e?0:1}}function Nh(e){return e&&(e=new Set(e)),function(t,n,r){if(null===t||t.type!==Oc)return 0
const s=hu(t.value,0)
if(null!==e){const n=t.value.indexOf("\\",s),r=-1!==n&&Eh(t.value,n)?t.value.substring(s,n):t.value.substr(s)
if(!1===e.has(r.toLowerCase()))return 0}return Oh(r,t.value,s)?0:1}}function Dh(e){return"function"!=typeof e&&(e=function(){return 0}),function(t,n,r){return null!==t&&t.type===Tc&&0===Number(t.value)?1:e(t,n,r)}}var Mh={"ident-token":Lh(1),"function-token":Lh(2),"at-keyword-token":Lh(3),"hash-token":Lh(4),"string-token":Lh(5),"bad-string-token":Lh(6),"url-token":Lh(7),"bad-url-token":Lh(8),"delim-token":Lh(9),"number-token":Lh(Tc),"percentage-token":Lh(Ec),"dimension-token":Lh(Oc),"whitespace-token":Lh(Pc),"CDO-token":Lh(14),"CDC-token":Lh(Lc),"colon-token":Lh(Nc),"semicolon-token":Lh(Dc),"comma-token":Lh(Mc),"[-token":Lh(jc),"]-token":Lh(Ic),"(-token":Lh(Rc),")-token":Lh(Fc),"{-token":Lh(zc),"}-token":Lh(Gc),string:Lh(5),ident:Lh(1),"custom-ident":function(e){if(null===e||1!==e.type)return 0
const t=e.value.toLowerCase()
return Th(t,ph)||_h(t,"default")?0:1},"custom-property-name":function(e){return null===e||1!==e.type||0x002D!==Ah(e.value,0)||0x002D!==Ah(e.value,1)?0:1},"hex-color":function(e){if(null===e||4!==e.type)return 0
const t=e.value.length
if(4!==t&&5!==t&&7!==t&&9!==t)return 0
for(let n=1;n<t;n++)if(!qc(Ah(e.value,n)))return 0
return 1},"id-selector":function(e){return null===e||4!==e.type?0:Kc(Ah(e.value,1),Ah(e.value,2),Ah(e.value,3))?1:0},"an-plus-b":function(e,t){let n=0
if(!e)return 0
if(e.type===Tc)return bh(e,0,false,n)
if(1===e.type&&e.value.charCodeAt(0)===dh){if(!iu(e.value,1,110))return 0
switch(e.value.length){case 2:return kh(t(++n),n,t)
case 3:return e.value.charCodeAt(2)!==dh?0:(n=yh(t(++n),n,t),bh(e=t(n),0,mh,n))
default:return e.value.charCodeAt(2)!==dh?0:bh(e,3,mh,n)}}else if(1===e.type||gh(e,43)&&1===t(n+1).type){if(1!==e.type&&(e=t(++n)),null===e||!iu(e.value,0,110))return 0
switch(e.value.length){case 1:return kh(t(++n),n,t)
case 2:return e.value.charCodeAt(1)!==dh?0:(n=yh(t(++n),n,t),bh(e=t(n),0,mh,n))
default:return e.value.charCodeAt(1)!==dh?0:bh(e,2,mh,n)}}else if(e.type===Oc){let r=e.value.charCodeAt(0),s=43===r||r===dh?1:0,i=s
for(;i<e.value.length&&Uc(e.value.charCodeAt(i));i++);return i===s?0:iu(e.value,i,110)?i+1===e.value.length?kh(t(++n),n,t):e.value.charCodeAt(i+1)!==dh?0:i+2===e.value.length?(n=yh(t(++n),n,t),bh(e=t(n),0,mh,n)):bh(e,i+2,mh,n):0}return 0},urange:function(e,t){let n=0
if(null===e||1!==e.type||!iu(e.value,0,117))return 0
if(null===(e=t(++n)))return 0
if(vh(e,43))return null===(e=t(++n))?0:1===e.type?wh(Sh(e,0,!0),++n,t):vh(e,63)?wh(1,++n,t):0
if(e.type===Tc){const r=Sh(e,1,!0)
return 0===r?0:null===(e=t(++n))?n:e.type===Oc||e.type===Tc?function(e,t){return e.value.charCodeAt(0)===t}(e,45)&&Sh(e,1,!1)?n+1:0:wh(r,n,t)}return e.type===Oc?wh(Sh(e,1,!0),++n,t):0},"declaration-value":function(e,t){if(!e)return 0
let n=0,r=[],s=0
e:do{switch(e.type){case 6:case 8:break e
case Gc:case Fc:case Ic:if(e.type!==n)break e
n=r.pop()
break
case Dc:if(0===n)break e
break
case 9:if(0===n&&"!"===e.value)break e
break
case 2:case Rc:case jc:case zc:r.push(n),n=Ch.get(e.type)}s++}while(e=t(s))
return s},"any-value":function(e,t){if(!e)return 0
let n=0,r=[],s=0
e:do{switch(e.type){case 6:case 8:break e
case Gc:case Fc:case Ic:if(e.type!==n)break e
n=r.pop()
break
case 2:case Rc:case jc:case zc:r.push(n),n=Ch.get(e.type)}s++}while(e=t(s))
return s},dimension:Ph(Nh(null)),angle:Ph(Nh(["deg","grad","rad","turn"])),decibel:Ph(Nh(["db"])),frequency:Ph(Nh(["hz","khz"])),flex:Ph(Nh(["fr"])),length:Ph(Dh(Nh(["cm","mm","q","in","pt","pc","px","em","rem","ex","rex","cap","rcap","ch","rch","ic","ric","lh","rlh","vw","svw","lvw","dvw","vh","svh","lvh","dvh","vi","svi","lvi","dvi","vb","svb","lvb","dvb","vmin","svmin","lvmin","dvmin","vmax","svmax","lvmax","dvmax","cqw","cqh","cqi","cqb","cqmin","cqmax"]))),resolution:Ph(Nh(["dpi","dpcm","dppx","x"])),semitones:Ph(Nh(["st"])),time:Ph(Nh(["s","ms"])),percentage:Ph(function(e,t,n){return null===e||e.type!==Ec||Oh(n,e.value,e.value.length-1)?0:1}),zero:Dh(),number:Ph(function(e,t,n){if(null===e)return 0
const r=hu(e.value,0)
return r===e.value.length||Eh(e.value,r)?Oh(n,e.value,r)?0:1:0}),integer:Ph(function(e,t,n){if(null===e||e.type!==Tc)return 0
let r=0x002B===Ah(e.value,0)||0x002D===Ah(e.value,0)?1:0
for(;r<e.value.length;r++)if(!Uc(Ah(e.value,r)))return 0
return Oh(n,e.value,r)?0:1})}
function jh(e,t,n){return Object.assign(Au("SyntaxError",e),{input:t,offset:n,rawMessage:e,message:e+"\n  "+t+"\n--"+new Array((n||t.length)+1).join("-")+"^"})}class Ih{constructor(e){this.str=e,this.pos=0}charCodeAt(e){return e<this.str.length?this.str.charCodeAt(e):0}charCode(){return this.charCodeAt(this.pos)}nextCharCode(){return this.charCodeAt(this.pos+1)}nextNonWsCode(e){return this.charCodeAt(this.findWsEnd(e))}findWsEnd(e){for(;e<this.str.length;e++){const t=this.str.charCodeAt(e)
if(13!==t&&10!==t&&12!==t&&32!==t&&9!==t)break}return e}substringToPos(e){return this.str.substring(this.pos,this.pos=e)}eat(e){this.charCode()!==e&&this.error("Expect `"+String.fromCharCode(e)+"`"),this.pos++}peek(){return this.pos<this.str.length?this.str.charAt(this.pos++):""}error(e){throw new jh(e,this.str,this.pos)}}const Rh=123,Fh=new Uint8Array(128).map((e,t)=>/[a-zA-Z0-9\-]/.test(String.fromCharCode(t))?1:0),zh={" ":1,"&&":2,"||":3,"|":4}
function Gh(e){return e.substringToPos(e.findWsEnd(e.pos))}function Bh(e){let t=e.pos
for(;t<e.str.length;t++){const n=e.str.charCodeAt(t)
if(n>=128||0===Fh[n])break}return e.pos===t&&e.error("Expect a keyword"),e.substringToPos(t)}function Uh(e){let t=e.pos
for(;t<e.str.length;t++){const n=e.str.charCodeAt(t)
if(n<48||n>57)break}return e.pos===t&&e.error("Expect a number"),e.substringToPos(t)}function qh(e){const t=e.str.indexOf("'",e.pos+1)
return-1===t&&(e.pos=e.str.length,e.error("Expect an apostrophe")),e.substringToPos(t+1)}function Wh(e){let t=null,n=null
return e.eat(Rh),t=Uh(e),44===e.charCode()?(e.pos++,125!==e.charCode()&&(n=Uh(e))):n=t,e.eat(125),{min:Number(t),max:n?Number(n):0}}function Vh(e,t){const n=function(e){let t=null,n=!1
switch(e.charCode()){case 42:e.pos++,t={min:0,max:0}
break
case 43:e.pos++,t={min:1,max:0}
break
case 63:e.pos++,t={min:0,max:1}
break
case 35:e.pos++,n=!0,e.charCode()===Rh?t=Wh(e):63===e.charCode()?(e.pos++,t={min:0,max:0}):t={min:1,max:0}
break
case Rh:t=Wh(e)
break
default:return null}return{type:"Multiplier",comma:n,min:t.min,max:t.max,term:null}}(e)
return null!==n?(n.term=t,35===e.charCode()&&43===e.charCodeAt(e.pos-1)?Vh(e,n):n):t}function $h(e){const t=e.peek()
return""===t?null:{type:"Token",value:t}}function Yh(e){let t,n=null
return e.eat(60),t=Bh(e),40===e.charCode()&&41===e.nextCharCode()&&(e.pos+=2,t+="()"),91===e.charCodeAt(e.findWsEnd(e.pos))&&(Gh(e),n=function(e){let t=null,n=null,r=1
return e.eat(91),45===e.charCode()&&(e.peek(),r=-1),-1==r&&8734===e.charCode()?e.peek():(t=r*Number(Uh(e)),0!==Fh[e.charCode()]&&(t+=Bh(e))),Gh(e),e.eat(44),Gh(e),8734===e.charCode()?e.peek():(r=1,45===e.charCode()&&(e.peek(),r=-1),n=r*Number(Uh(e)),0!==Fh[e.charCode()]&&(n+=Bh(e))),e.eat(93),{type:"Range",min:t,max:n}}(e)),e.eat(62),Vh(e,{type:"Type",name:t,opts:n})}function Xh(e,t){function n(e,t){return{type:"Group",terms:e,combinator:t,disallowEmpty:!1,explicit:!1}}let r
for(t=Object.keys(t).sort((e,t)=>zh[e]-zh[t]);t.length>0;){r=t.shift()
let s=0,i=0
for(;s<e.length;s++){const t=e[s]
"Combinator"===t.type&&(t.value===r?(-1===i&&(i=s-1),e.splice(s,1),s--):(-1!==i&&s-i>1&&(e.splice(i,s-i,n(e.slice(i,s),r)),s=i+1),i=-1))}-1!==i&&t.length&&e.splice(i,s-i,n(e.slice(i,s),r))}return r}function Hh(e){const t=[],n={}
let r,s=null,i=e.pos
for(;r=Qh(e);)"Spaces"!==r.type&&("Combinator"===r.type?(null!==s&&"Combinator"!==s.type||(e.pos=i,e.error("Unexpected combinator")),n[r.value]=!0):null!==s&&"Combinator"!==s.type&&(n[" "]=!0,t.push({type:"Combinator",value:" "})),t.push(r),s=r,i=e.pos)
return null!==s&&"Combinator"===s.type&&(e.pos-=i,e.error("Unexpected combinator")),{type:"Group",terms:t,combinator:Xh(t,n)||" ",disallowEmpty:!1,explicit:!1}}function Qh(e){let t=e.charCode()
if(t<128&&1===Fh[t])return function(e){const t=Bh(e)
return 40===e.charCode()?(e.pos++,{type:"Function",name:t}):Vh(e,{type:"Keyword",name:t})}(e)
switch(t){case 93:break
case 91:return Vh(e,function(e){let t
return e.eat(91),t=Hh(e),e.eat(93),t.explicit=!0,33===e.charCode()&&(e.pos++,t.disallowEmpty=!0),t}(e))
case 60:return 39===e.nextCharCode()?function(e){let t
return e.eat(60),e.eat(39),t=Bh(e),e.eat(39),e.eat(62),Vh(e,{type:"Property",name:t})}(e):Yh(e)
case 124:return{type:"Combinator",value:e.substringToPos(e.pos+(124===e.nextCharCode()?2:1))}
case 38:return e.pos++,e.eat(38),{type:"Combinator",value:"&&"}
case 44:return e.pos++,{type:"Comma"}
case 39:return Vh(e,{type:"String",value:qh(e)})
case 32:case 9:case 10:case 13:case 12:return{type:"Spaces",value:Gh(e)}
case 64:return t=e.nextCharCode(),t<128&&1===Fh[t]?(e.pos++,{type:"AtKeyword",name:Bh(e)}):$h(e)
case 42:case 43:case 63:case 35:case 33:break
case Rh:if(t=e.nextCharCode(),t<48||t>57)return $h(e)
break
default:return $h(e)}}function Kh(e){const t=new Ih(e),n=Hh(t)
return t.pos!==e.length&&t.error("Unexpected input"),1===n.terms.length&&"Group"===n.terms[0].type?n.terms[0]:n}const Zh=function(){}
function Jh(e){return"function"==typeof e?e:Zh}const ef={decorator(e){const t=[]
let n=null
return{...e,node(t){const r=n
n=t,e.node.call(this,t),n=r},emit(e,r,s){t.push({type:r,value:e,node:s?null:n})},result:()=>t}}}
function tf(e,t){return"string"==typeof e?function(e){const t=[]
return wu(e,(n,r,s)=>t.push({type:n,value:e.slice(r,s),node:null})),t}(e):t.generate(e,ef)}const nf={type:"Match"},rf={type:"Mismatch"},sf={type:"DisallowEmpty"}
function of(e,t,n){return t===nf&&n===rf||e===nf&&t===nf&&n===nf?e:("If"===e.type&&e.else===rf&&t===nf&&(t=e.then,e=e.match),{type:"If",match:e,then:t,else:n})}function af(e){return e.length>2&&40===e.charCodeAt(e.length-2)&&41===e.charCodeAt(e.length-1)}function lf(e){return"Keyword"===e.type||"AtKeyword"===e.type||"Function"===e.type||"Type"===e.type&&af(e.name)}function cf(e,t,n){switch(e){case" ":{let e=nf
for(let n=t.length-1;n>=0;n--){e=of(t[n],e,rf)}return e}case"|":{let e=rf,n=null
for(let r=t.length-1;r>=0;r--){let s=t[r]
if(lf(s)&&(null===n&&r>0&&lf(t[r-1])&&(n=Object.create(null),e=of({type:"Enum",map:n},nf,e)),null!==n)){const e=(af(s.name)?s.name.slice(0,-1):s.name).toLowerCase()
if(e in n==!1){n[e]=s
continue}}n=null,e=of(s,nf,e)}return e}case"&&":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!0}
let n=rf
for(let r=t.length-1;r>=0;r--){const s=t[r]
let i
i=t.length>1?cf(e,t.filter(function(e){return e!==s}),!1):nf,n=of(s,i,n)}return n}case"||":{if(t.length>5)return{type:"MatchOnce",terms:t,all:!1}
let r=n?nf:rf
for(let n=t.length-1;n>=0;n--){const s=t[n]
let i
i=t.length>1?cf(e,t.filter(function(e){return e!==s}),!0):nf,r=of(s,i,r)}return r}}}function uf(e){if("function"==typeof e)return{type:"Generic",fn:e}
switch(e.type){case"Group":{let t=cf(e.combinator,e.terms.map(uf),!1)
return e.disallowEmpty&&(t=of(t,sf,rf)),t}case"Multiplier":return function(e){let t=nf,n=uf(e.term)
if(0===e.max)n=of(n,sf,rf),t=of(n,null,rf),t.then=of(nf,nf,t),e.comma&&(t.then.else=of({type:"Comma",syntax:e},t,rf))
else for(let r=e.min||1;r<=e.max;r++)e.comma&&t!==nf&&(t=of({type:"Comma",syntax:e},t,rf)),t=of(n,of(nf,nf,t),rf)
if(0===e.min)t=of(nf,nf,t)
else for(let r=0;r<e.min-1;r++)e.comma&&t!==nf&&(t=of({type:"Comma",syntax:e},t,rf)),t=of(n,t,rf)
return t}(e)
case"Type":case"Property":return{type:e.type,name:e.name,syntax:e}
case"Keyword":return{type:e.type,name:e.name.toLowerCase(),syntax:e}
case"AtKeyword":return{type:e.type,name:"@"+e.name.toLowerCase(),syntax:e}
case"Function":return{type:e.type,name:e.name.toLowerCase()+"(",syntax:e}
case"String":return 3===e.value.length?{type:"Token",value:e.value.charAt(1),syntax:e}:{type:e.type,value:e.value.substr(1,e.value.length-2).replace(/\\'/g,"'"),syntax:e}
case"Token":return{type:e.type,value:e.value,syntax:e}
case"Comma":return{type:e.type,syntax:e}
default:throw new Error("Unknown node type:",e.type)}}function hf(e,t){return"string"==typeof e&&(e=Kh(e)),{type:"MatchGraph",match:uf(e),syntax:t||null,source:e}}const{hasOwnProperty:ff}=Object.prototype,pf="Match"
function df(e,t){if(e.length!==t.length)return!1
for(let n=0;n<e.length;n++){const r=t.charCodeAt(n)
let s=e.charCodeAt(n)
if(s>=0x0041&&s<=0x005A&&(s|=32),s!==r)return!1}return!0}function mf(e){return null===e||(e.type===Mc||2===e.type||e.type===Rc||e.type===jc||e.type===zc||function(e){return 9===e.type&&"?"!==e.value}(e))}function gf(e){return null===e||(e.type===Fc||e.type===Ic||e.type===Gc||9===e.type&&"/"===e.value)}function yf(e,t,n){const r=function(e,t,n){function r(){do{b++,y=b<e.length?e[b]:null}while(null!==y&&(y.type===Pc||y.type===Bc))}function s(t){const n=b+t
return n<e.length?e[n]:null}function i(e,t){return{nextState:e,matchStack:v,syntaxStack:h,thenStack:f,tokenIndex:b,prev:t}}function o(e){f={nextState:e,matchStack:v,syntaxStack:h,prev:f}}function a(e){p=i(e,p)}function l(){v={type:1,syntax:t.syntax,token:y,prev:v},r(),d=null,b>k&&(k=b)}function c(){h={syntax:t.syntax,opts:t.syntax.opts||null!==h&&h.opts||null,prev:h},v={type:2,syntax:t.syntax,token:v.token,prev:v}}function u(){v=2===v.type?v.prev:{type:3,syntax:h.syntax,token:v.token,prev:v},h=h.prev}let h=null,f=null,p=null,d=null,m=0,g=null,y=null,b=-1,k=0,v={type:0,syntax:null,token:null,prev:null}
for(r();null===g&&++m<15e3;)switch(t.type){case"Match":if(null===f){if(null!==y&&(b!==e.length-1||"\\0"!==y.value&&"\\9"!==y.value)){t=rf
break}g=pf
break}if((t=f.nextState)===sf){if(f.matchStack===v){t=rf
break}t=nf}for(;f.syntaxStack!==h;)u()
f=f.prev
break
case"Mismatch":if(null!==d&&!1!==d)(null===p||b>p.tokenIndex)&&(p=d,d=!1)
else if(null===p){g="Mismatch"
break}t=p.nextState,f=p.thenStack,h=p.syntaxStack,v=p.matchStack,b=p.tokenIndex,y=b<e.length?e[b]:null,p=p.prev
break
case"MatchGraph":t=t.match
break
case"If":t.else!==rf&&a(t.else),t.then!==nf&&o(t.then),t=t.match
break
case"MatchOnce":t={type:"MatchOnceBuffer",syntax:t,index:0,mask:0}
break
case"MatchOnceBuffer":{const e=t.syntax.terms
if(t.index===e.length){if(0===t.mask||t.syntax.all){t=rf
break}t=nf
break}if(t.mask===(1<<e.length)-1){t=nf
break}for(;t.index<e.length;t.index++){const n=1<<t.index
if(0===(t.mask&n)){a(t),o({type:"AddMatchOnce",syntax:t.syntax,mask:t.mask|n}),t=e[t.index++]
break}}break}case"AddMatchOnce":t={type:"MatchOnceBuffer",syntax:t.syntax,index:0,mask:t.mask}
break
case"Enum":if(null!==y){let e=y.value.toLowerCase()
if(-1!==e.indexOf("\\")&&(e=e.replace(/\\[09].*$/,"")),ff.call(t.map,e)){t=t.map[e]
break}}t=rf
break
case"Generic":{const e=null!==h?h.opts:null,n=b+Math.floor(t.fn(y,s,e))
if(!isNaN(n)&&n>b){for(;b<n;)l()
t=nf}else t=rf
break}case"Type":case"Property":{const e="Type"===t.type?"types":"properties",r=ff.call(n,e)?n[e][t.name]:null
if(!r||!r.match)throw new Error("Bad syntax reference: "+("Type"===t.type?"<"+t.name+">":"<'"+t.name+"'>"))
if(!1!==d&&null!==y&&"Type"===t.type&&("custom-ident"===t.name&&1===y.type||"length"===t.name&&"0"===y.value)){null===d&&(d=i(t,p)),t=rf
break}c(),t=r.match
break}case"Keyword":{const e=t.name
if(null!==y){let n=y.value
if(-1!==n.indexOf("\\")&&(n=n.replace(/\\[09].*$/,"")),df(n,e)){l(),t=nf
break}}t=rf
break}case"AtKeyword":case"Function":if(null!==y&&df(y.value,t.name)){l(),t=nf
break}t=rf
break
case"Token":if(null!==y&&y.value===t.value){l(),t=nf
break}t=rf
break
case"Comma":null!==y&&y.type===Mc?mf(v.token)?t=rf:(l(),t=gf(y)?rf:nf):t=mf(v.token)||gf(y)?nf:rf
break
case"String":let r="",m=b
for(;m<e.length&&r.length<t.value.length;m++)r+=e[m].value
if(df(r,t.value)){for(;b<m;)l()
t=nf}else t=rf
break
default:throw new Error("Unknown node type: "+t.type)}switch(g){case null:console.warn("[csstree-match] BREAK after 15000 iterations"),g="Maximum iteration number exceeded (please fill an issue on https://github.com/csstree/csstree/issues)",v=null
break
case pf:for(;null!==h;)u()
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
default:i.match.push({syntax:s.syntax||null,token:s.token.value,node:s.token.node})}s=s.prev}return r}function bf(e){function t(e){return null!==e&&("Type"===e.type||"Property"===e.type||"Keyword"===e.type)}let n=null
return null!==this.matched&&!function r(s){if(Array.isArray(s.match)){for(let e=0;e<s.match.length;e++)if(r(s.match[e]))return t(s.syntax)&&n.unshift(s.syntax),!0}else if(s.node===e)return n=t(s.syntax)?[s.syntax]:[],!0
return!1}(this.matched),n}function kf(e,t,n){const r=bf.call(e,t)
return null!==r&&r.some(n)}var vf=Object.freeze({__proto__:null,getTrace:bf,isKeyword:function(e){return kf(this,e,e=>"Keyword"===e.type)},isProperty:function(e,t){return kf(this,e,e=>"Property"===e.type&&e.name===t)},isType:function(e,t){return kf(this,e,e=>"Type"===e.type&&e.name===t)}})
function Sf(e){return"node"in e?e.node:Sf(e.match[0])}function wf(e){return"node"in e?e.node:wf(e.match[e.match.length-1])}function xf(e,t,n,r,s){const i=[]
return null!==n.matched&&!function n(o){if(null!==o.syntax&&o.syntax.type===r&&o.syntax.name===s){const n=Sf(o),r=wf(o)
e.syntax.walk(t,function(e,t,s){if(e===n){const e=new Cu
do{if(e.appendData(t.data),t.data===r)break
t=t.next}while(null!==t)
i.push({parent:s,nodes:e})}})}Array.isArray(o.match)&&o.match.forEach(n)}(n.matched),i}const{hasOwnProperty:Cf}=Object.prototype
function Af(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e&&e>=0}function _f(e){return Boolean(e)&&Af(e.offset)&&Af(e.line)&&Af(e.column)}function Tf(e,t){return function(n,r){if(!n||n.constructor!==Object)return r(n,"Type of node should be an Object")
for(let s in n){let i=!0
if(!1!==Cf.call(n,s)){if("type"===s)n.type!==e&&r(n,"Wrong node type `"+n.type+"`, expected `"+e+"`")
else if("loc"===s){if(null===n.loc)continue
if(n.loc&&n.loc.constructor===Object)if("string"!=typeof n.loc.source)s+=".source"
else if(_f(n.loc.start)){if(_f(n.loc.end))continue
s+=".end"}else s+=".start"
i=!1}else if(t.hasOwnProperty(s)){i=!1
for(let e=0;!i&&e<t[s].length;e++){const r=t[s][e]
switch(r){case String:i="string"==typeof n[s]
break
case Boolean:i="boolean"==typeof n[s]
break
case null:i=null===n[s]
break
default:"string"==typeof r?i=n[s]&&n[s].type===r:Array.isArray(r)&&(i=n[s]instanceof Cu)}}}else r(n,"Unknown field `"+s+"` for "+e+" node type")
i||r(n,"Bad value for `"+e+"."+s+"`")}}for(const s in t)Cf.call(t,s)&&!1===Cf.call(n,s)&&r(n,"Field `"+e+"."+s+"` is missed")}}function Ef(e,t){const n=t.structure,r={type:String,loc:!0},s={type:'"'+e+'"'}
for(const t in n){if(!1===Cf.call(n,t))continue
const i=[],o=r[t]=Array.isArray(n[t])?n[t].slice():[n[t]]
for(let n=0;n<o.length;n++){const r=o[n]
if(r===String||r===Boolean)i.push(r.name)
else if(null===r)i.push("null")
else if("string"==typeof r)i.push("<"+r+">")
else{if(!Array.isArray(r))throw new Error("Wrong value `"+r+"` in `"+e+"."+t+"` structure definition")
i.push("List")}}s[t]=i.join(" | ")}return{docs:s,check:Tf(e,r)}}const Of=hf(ph.join(" | "))
function Pf(e,t,n){const r={}
for(const s in e)e[s].syntax&&(r[s]=n?e[s].syntax:th(e[s].syntax,{compact:t}))
return r}function Lf(e,t,n){const r={}
for(const[s,i]of Object.entries(e))r[s]={prelude:i.prelude&&(n?i.prelude.syntax:th(i.prelude.syntax,{compact:t})),descriptors:i.descriptors&&Pf(i.descriptors,t,n)}
return r}function Nf(e,t,n){return{matched:e,iterations:n,error:t,...vf}}function Df(e,t,n,r){const s=tf(n,e.syntax)
let i
return function(e){for(let t=0;t<e.length;t++)if("var("===e[t].value.toLowerCase())return!0
return!1}(s)?Nf(null,new Error("Matching for a tree with var() is not supported")):(r&&(i=yf(s,e.cssWideKeywordsSyntax,e)),r&&i.match||(i=yf(s,t.match,e),i.match)?Nf(i.match,null,i.iterations):Nf(null,new oh(i.reason,t.syntax,n,i),i.iterations))}class Mf{constructor(e,t,n){if(this.cssWideKeywordsSyntax=Of,this.syntax=t,this.generic=!1,this.atrules=Object.create(null),this.properties=Object.create(null),this.types=Object.create(null),this.structure=n||function(e){const t={}
if(e.node)for(const n in e.node)if(Cf.call(e.node,n)){const r=e.node[n]
if(!r.structure)throw new Error("Missed `structure` field in `"+n+"` node type definition")
t[n]=Ef(n,r)}return t}(e),e){if(e.types)for(const t in e.types)this.addType_(t,e.types[t])
if(e.generic){this.generic=!0
for(const e in Mh)this.addType_(e,Mh[e])}if(e.atrules)for(const t in e.atrules)this.addAtrule_(t,e.atrules[t])
if(e.properties)for(const t in e.properties)this.addProperty_(t,e.properties[t])}}checkStructure(e){function t(e,t){r.push({node:e,message:t})}const n=this.structure,r=[]
return this.syntax.walk(e,function(e){n.hasOwnProperty(e.type)?n[e.type].check(e,t):t(e,"Unknown node type `"+e.type+"`")}),!!r.length&&r}createDescriptor(e,t,n,r=null){const s={type:t,name:n},i={type:t,name:n,parent:r,serializable:"string"==typeof e||e&&"string"==typeof e.type,syntax:null,match:null}
return"function"==typeof e?i.match=hf(e,s):("string"==typeof e?Object.defineProperty(i,"syntax",{get:()=>(Object.defineProperty(i,"syntax",{value:Kh(e)}),i.syntax)}):i.syntax=e,Object.defineProperty(i,"match",{get:()=>(Object.defineProperty(i,"match",{value:hf(i.syntax,s)}),i.match)})),i}addAtrule_(e,t){t&&(this.atrules[e]={type:"Atrule",name:e,prelude:t.prelude?this.createDescriptor(t.prelude,"AtrulePrelude",e):null,descriptors:t.descriptors?Object.keys(t.descriptors).reduce((n,r)=>(n[r]=this.createDescriptor(t.descriptors[r],"AtruleDescriptor",r,e),n),Object.create(null)):null})}addProperty_(e,t){t&&(this.properties[e]=this.createDescriptor(t,"Property",e))}addType_(e,t){t&&(this.types[e]=this.createDescriptor(t,"Type",e))}checkAtruleName(e){if(!this.getAtrule(e))return new ih("Unknown at-rule","@"+e)}checkAtrulePrelude(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e)
return!r.prelude&&t?new SyntaxError("At-rule `@"+e+"` should not contain a prelude"):!r.prelude||t||Df(this,r.prelude,"",!1).matched?void 0:new SyntaxError("At-rule `@"+e+"` should contain a prelude")}checkAtruleDescriptorName(e,t){const n=this.checkAtruleName(e)
if(n)return n
const r=this.getAtrule(e),s=ch(t)
return r.descriptors?r.descriptors[s.name]||r.descriptors[s.basename]?void 0:new ih("Unknown at-rule descriptor",t):new SyntaxError("At-rule `@"+e+"` has no known descriptors")}checkPropertyName(e){if(!this.getProperty(e))return new ih("Unknown property",e)}matchAtrulePrelude(e,t){const n=this.checkAtrulePrelude(e,t)
if(n)return Nf(null,n)
const r=this.getAtrule(e)
return r.prelude?Df(this,r.prelude,t||"",!1):Nf(null,null)}matchAtruleDescriptor(e,t,n){const r=this.checkAtruleDescriptorName(e,t)
if(r)return Nf(null,r)
const s=this.getAtrule(e),i=ch(t)
return Df(this,s.descriptors[i.name]||s.descriptors[i.basename],n,!1)}matchDeclaration(e){return"Declaration"!==e.type?Nf(null,new Error("Not a Declaration node")):this.matchProperty(e.property,e.value)}matchProperty(e,t){if(uh(e).custom)return Nf(null,new Error("Lexer matching doesn't applicable for custom properties"))
const n=this.checkPropertyName(e)
return n?Nf(null,n):Df(this,this.getProperty(e),t,!0)}matchType(e,t){const n=this.getType(e)
return n?Df(this,n,t,!1):Nf(null,new ih("Unknown type",e))}match(e,t){return"string"==typeof e||e&&e.type?("string"!=typeof e&&e.match||(e=this.createDescriptor(e,"Type","anonymous")),Df(this,e,t,!1)):Nf(null,new ih("Bad syntax"))}findValueFragments(e,t,n,r){return xf(this,t,this.matchProperty(e,t),n,r)}findDeclarationValueFragments(e,t,n){return xf(this,e.value,this.matchDeclaration(e),t,n)}findAllFragments(e,t,n){const r=[]
return this.syntax.walk(e,{visit:"Declaration",enter:e=>{r.push.apply(r,this.findDeclarationValueFragments(e,t,n))}}),r}getAtrule(e,t=!0){const n=ch(e)
return(n.vendor&&t?this.atrules[n.name]||this.atrules[n.basename]:this.atrules[n.name])||null}getAtrulePrelude(e,t=!0){const n=this.getAtrule(e,t)
return n&&n.prelude||null}getAtruleDescriptor(e,t){return this.atrules.hasOwnProperty(e)&&this.atrules.declarators&&this.atrules[e].declarators[t]||null}getProperty(e,t=!0){const n=uh(e)
return(n.vendor&&t?this.properties[n.name]||this.properties[n.basename]:this.properties[n.name])||null}getType(e){return hasOwnProperty.call(this.types,e)?this.types[e]:null}validate(){function e(r,s,i,o){if(i.has(s))return i.get(s)
i.set(s,!1),null!==o.syntax&&function(e,t,n){let r=Zh,s=Zh
if("function"==typeof t?r=t:t&&(r=Jh(t.enter),s=Jh(t.leave)),r===Zh&&s===Zh)throw new Error("Neither `enter` nor `leave` walker handler is set or both aren't a function")
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
return t=[...t.keys()].filter(e=>t.get(e)),n=[...n.keys()].filter(e=>n.get(e)),t.length||n.length?{types:t,properties:n}:null}dump(e,t){return{generic:this.generic,types:Pf(this.types,!t,e),properties:Pf(this.properties,!t,e),atrules:Lf(this.atrules,!t,e)}}toString(){return JSON.stringify(this.dump())}}const{hasOwnProperty:jf}=Object.prototype,If={generic:!0,types:Gf,atrules:{prelude:Bf,descriptors:Bf},properties:Gf,parseContext:function(e,t){return Object.assign(e,t)},scope:function e(t,n){for(const r in n)jf.call(n,r)&&(Rf(t[r])?e(t[r],n[r]):t[r]=Ff(n[r]))
return t},atrule:["parse"],pseudo:["parse"],node:["name","structure","parse","generate","walkContext"]}
function Rf(e){return e&&e.constructor===Object}function Ff(e){return Rf(e)?{...e}:e}function zf(e,t){return"string"==typeof t&&/^\s*\|/.test(t)?"string"==typeof e?e+t:t.replace(/^\s*\|\s*/,""):t||null}function Gf(e,t){if("string"==typeof t)return zf(e,t)
const n={...e}
for(let r in t)jf.call(t,r)&&(n[r]=zf(jf.call(e,r)?e[r]:void 0,t[r]))
return n}function Bf(e,t){const n=Gf(e,t)
return!Rf(n)||Object.keys(n).length?n:null}function Uf(e,t,n){for(const r in n)if(!1!==jf.call(n,r))if(!0===n[r])jf.call(t,r)&&(e[r]=Ff(t[r]))
else if(n[r])if("function"==typeof n[r]){const s=n[r]
e[r]=s({},e[r]),e[r]=s(e[r]||{},t[r])}else if(Rf(n[r])){const s={}
for(let t in e[r])s[t]=Uf({},e[r][t],n[r])
for(let e in t[r])s[e]=Uf(s[e]||{},t[r][e],n[r])
e[r]=s}else if(Array.isArray(n[r])){const s={},i=n[r].reduce(function(e,t){return e[t]=!0,e},{})
for(const[t,n]of Object.entries(e[r]||{}))s[t]={},n&&Uf(s[t],n,i)
for(const e in t[r])jf.call(t[r],e)&&(s[e]||(s[e]={}),t[r]&&t[r][e]&&Uf(s[e],t[r][e],i))
e[r]=s}return e}var qf=(e,t)=>Uf(e,t,If)
function Wf(e){const t=Du(e),n=Zu(e),r=Wu(e),{fromPlainObject:s,toPlainObject:i}=function(e){return{fromPlainObject:t=>(e(t,{enter(e){e.children&&e.children instanceof Cu==0&&(e.children=(new Cu).fromArray(e.children))}}),t),toPlainObject:t=>(e(t,{leave(e){e.children&&e.children instanceof Cu&&(e.children=e.children.toArray())}}),t)}}(n),o={lexer:null,createLexer:e=>new Mf(e,o,o.lexer.structure),tokenize:wu,parse:t,generate:r,walk:n,find:n.find,findLast:n.findLast,findAll:n.findAll,fromPlainObject:s,toPlainObject:i,fork(t){const n=qf({},e)
return Wf("function"==typeof t?t(n,Object.assign):qf(n,t))}}
return o.lexer=new Mf({generic:!0,types:e.types,atrules:e.atrules,properties:e.properties,node:e.node},o),o}const Vf=e(import.meta.url)("../data/patch.json"),$f=e(import.meta.url),Yf=$f("mdn-data/css/at-rules.json"),Xf=$f("mdn-data/css/properties.json"),Hf=$f("mdn-data/css/syntaxes.json"),Qf=/^\s*\|\s*/
function Kf(e,t){const n={}
for(const t in e)n[t]=e[t].syntax||e[t]
for(const r in t)r in e?t[r].syntax?n[r]=Qf.test(t[r].syntax)?n[r]+" "+t[r].syntax.trim():t[r].syntax:delete n[r]:t[r].syntax&&(n[r]=t[r].syntax.replace(Qf,""))
return n}var Zf={types:Kf(Hf,Vf.types),atrules:function(e,t){const n={}
for(const r in e){const s=t[r]&&t[r].descriptors||null
n[r]={prelude:r in t&&"prelude"in t[r]?t[r].prelude:e[r].prelude||null,descriptors:Kf(e[r].descriptors||{},s||{})}}for(const r in t)hasOwnProperty.call(e,r)||(n[r]={prelude:t[r].prelude||null,descriptors:t[r].descriptors&&Kf({},t[r].descriptors)})
return n}(function(e){const t=Object.create(null)
for(const n in e){const r=e[n]
let s=null
if(r.descriptors){s=Object.create(null)
for(const e in r.descriptors)s[e]=r.descriptors[e].syntax}t[n.substr(1)]={prelude:r.syntax.trim().replace(/\{(.|\s)+\}/,"").match(/^@\S+\s+([^;\{]*)/)[1].trim()||null,descriptors:s}}return t}(Yf),Vf.atrules),properties:Kf(Xf,Vf.properties)}
const Jf=0x002B,ep=0x002D,tp=0x006E,np=!0
function rp(e,t){let n=this.tokenStart+e
const r=this.charCodeAt(n)
for(r!==Jf&&r!==ep||(t&&this.error("Number sign is not allowed"),n++);n<this.tokenEnd;n++)Uc(this.charCodeAt(n))||this.error("Integer is expected",n)}function sp(e){return rp.call(this,0,e)}function ip(e,t){if(!this.cmpChar(this.tokenStart+e,t)){let n=""
switch(t){case tp:n="N is expected"
break
case ep:n="HyphenMinus is expected"}this.error(n,this.tokenStart+e)}}function op(){let e=0,t=0,n=this.tokenType
for(;n===Pc||n===Bc;)n=this.lookupType(++e)
if(n!==Tc){if(!this.isDelim(Jf,e)&&!this.isDelim(ep,e))return null
t=this.isDelim(Jf,e)?Jf:ep
do{n=this.lookupType(++e)}while(n===Pc||n===Bc)
n!==Tc&&(this.skip(e),sp.call(this,np))}return e>0&&this.skip(e),0===t&&(n=this.charCodeAt(this.tokenStart),n!==Jf&&n!==ep&&this.error("Number sign is expected")),sp.call(this,0!==t),t===ep?"-"+this.consume(Tc):this.consume(Tc)}const ap={a:[String,null],b:[String,null]}
function lp(){const e=this.tokenStart
let t=null,n=null
if(this.tokenType===Tc)sp.call(this,false),n=this.consume(Tc)
else if(1===this.tokenType&&this.cmpChar(this.tokenStart,ep))switch(t="-1",ip.call(this,1,tp),this.tokenEnd-this.tokenStart){case 2:this.next(),n=op.call(this)
break
case 3:ip.call(this,2,ep),this.next(),this.skipSC(),sp.call(this,np),n="-"+this.consume(Tc)
break
default:ip.call(this,2,ep),rp.call(this,3,np),this.next(),n=this.substrToCursor(e+2)}else if(1===this.tokenType||this.isDelim(Jf)&&1===this.lookupType(1)){let r=0
switch(t="1",this.isDelim(Jf)&&(r=1,this.next()),ip.call(this,0,tp),this.tokenEnd-this.tokenStart){case 1:this.next(),n=op.call(this)
break
case 2:ip.call(this,1,ep),this.next(),this.skipSC(),sp.call(this,np),n="-"+this.consume(Tc)
break
default:ip.call(this,1,ep),rp.call(this,2,np),this.next(),n=this.substrToCursor(e+r+1)}}else if(this.tokenType===Oc){const r=this.charCodeAt(this.tokenStart),s=r===Jf||r===ep
let i=this.tokenStart+s
for(;i<this.tokenEnd&&Uc(this.charCodeAt(i));i++);i===this.tokenStart+s&&this.error("Integer is expected",this.tokenStart+s),ip.call(this,i-this.tokenStart,tp),t=this.substring(e,i),i+1===this.tokenEnd?(this.next(),n=op.call(this)):(ip.call(this,i-this.tokenStart+1,ep),i+2===this.tokenEnd?(this.next(),this.skipSC(),sp.call(this,np),n="-"+this.consume(Tc)):(rp.call(this,i-this.tokenStart+2,np),this.next(),n=this.substrToCursor(i+1)))}else this.error()
return null!==t&&t.charCodeAt(0)===Jf&&(t=t.substr(1)),null!==n&&n.charCodeAt(0)===Jf&&(n=n.substr(1)),{type:"AnPlusB",loc:this.getLocation(e,this.tokenStart),a:t,b:n}}var cp=Object.freeze({__proto__:null,generate:function(e){if(e.a){const t=("+1"===e.a||"1"===e.a?"n":"-1"===e.a&&"-n")||e.a+"n"
if(e.b){const n="-"===e.b[0]||"+"===e.b[0]?e.b:"+"+e.b
this.tokenize(t+n)}else this.tokenize(t)}else this.tokenize(e.b)},name:"AnPlusB",parse:lp,structure:ap})
function up(e){return this.Raw(e,this.consumeUntilLeftCurlyBracketOrSemicolon,!0)}function hp(){for(let e,t=1;e=this.lookupType(t);t++){if(e===Gc)return!0
if(e===zc||3===e)return!1}return!1}const fp={name:String,prelude:["AtrulePrelude","Raw",null],block:["Block",null]}
function pp(){const e=this.tokenStart
let t,n,r=null,s=null
switch(this.eat(3),t=this.substrToCursor(e+1),n=t.toLowerCase(),this.skipSC(),!1===this.eof&&this.tokenType!==zc&&this.tokenType!==Dc&&(r=this.parseAtrulePrelude?this.parseWithFallback(this.AtrulePrelude.bind(this,t),up):up.call(this,this.tokenIndex),this.skipSC()),this.tokenType){case Dc:this.next()
break
case zc:s=hasOwnProperty.call(this.atrule,n)&&"function"==typeof this.atrule[n].block?this.atrule[n].block.call(this):this.Block(hp.call(this))}return{type:"Atrule",loc:this.getLocation(e,this.tokenStart),name:t,prelude:r,block:s}}var dp=Object.freeze({__proto__:null,generate:function(e){this.token(3,"@"+e.name),null!==e.prelude&&this.node(e.prelude),e.block?this.node(e.block):this.token(Dc,";")},name:"Atrule",parse:pp,structure:fp,walkContext:"atrule"})
function mp(e){let t=null
return null!==e&&(e=e.toLowerCase()),this.skipSC(),t=hasOwnProperty.call(this.atrule,e)&&"function"==typeof this.atrule[e].prelude?this.atrule[e].prelude.call(this):this.readSequence(this.scope.AtrulePrelude),this.skipSC(),!0!==this.eof&&this.tokenType!==zc&&this.tokenType!==Dc&&this.error("Semicolon or block is expected"),{type:"AtrulePrelude",loc:this.getLocationFromList(t),children:t}}var gp=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"AtrulePrelude",parse:mp,structure:{children:[[]]},walkContext:"atrulePrelude"})
function yp(){this.eof&&this.error("Unexpected end of input")
const e=this.tokenStart
let t=!1
return this.isDelim(42)?(t=!0,this.next()):this.isDelim(124)||this.eat(1),this.isDelim(124)?61!==this.charCodeAt(this.tokenStart+1)?(this.next(),this.eat(1)):t&&this.error("Identifier is expected",this.tokenEnd):t&&this.error("Vertical line is expected"),{type:"Identifier",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}function bp(){const e=this.tokenStart,t=this.charCodeAt(e)
return 61!==t&&126!==t&&94!==t&&36!==t&&42!==t&&124!==t&&this.error("Attribute selector (=, ~=, ^=, $=, *=, |=) is expected"),this.next(),61!==t&&(this.isDelim(61)||this.error("Equal sign is expected"),this.next()),this.substrToCursor(e)}const kp={name:"Identifier",matcher:[String,null],value:["String","Identifier",null],flags:[String,null]}
function vp(){const e=this.tokenStart
let t,n=null,r=null,s=null
return this.eat(jc),this.skipSC(),t=yp.call(this),this.skipSC(),this.tokenType!==Ic&&(1!==this.tokenType&&(n=bp.call(this),this.skipSC(),r=5===this.tokenType?this.String():this.Identifier(),this.skipSC()),1===this.tokenType&&(s=this.consume(1),this.skipSC())),this.eat(Ic),{type:"AttributeSelector",loc:this.getLocation(e,this.tokenStart),name:t,matcher:n,value:r,flags:s}}var Sp=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.node(e.name),null!==e.matcher&&(this.tokenize(e.matcher),this.node(e.value)),null!==e.flags&&this.token(1,e.flags),this.token(9,"]")},name:"AttributeSelector",parse:vp,structure:kp})
function wp(e){return this.Raw(e,null,!0)}function xp(){return this.parseWithFallback(this.Rule,wp)}function Cp(e){return this.Raw(e,this.consumeUntilSemicolonIncluded,!0)}function Ap(){if(this.tokenType===Dc)return Cp.call(this,this.tokenIndex)
const e=this.parseWithFallback(this.Declaration,Cp)
return this.tokenType===Dc&&this.next(),e}function _p(e){const t=e?Ap:xp,n=this.tokenStart
let r=this.createList()
this.eat(zc)
e:for(;!this.eof;)switch(this.tokenType){case Gc:break e
case Pc:case Bc:this.next()
break
case 3:r.push(this.parseWithFallback(this.Atrule,wp))
break
default:r.push(t.call(this))}return this.eof||this.eat(Gc),{type:"Block",loc:this.getLocation(n,this.tokenStart),children:r}}var Tp=Object.freeze({__proto__:null,generate:function(e){this.token(zc,"{"),this.children(e,e=>{"Declaration"===e.type&&this.token(Dc,";")}),this.token(Gc,"}")},name:"Block",parse:_p,structure:{children:[["Atrule","Rule","Declaration"]]},walkContext:"block"})
function Ep(e,t){const n=this.tokenStart
let r=null
return this.eat(jc),r=e.call(this,t),this.eof||this.eat(Ic),{type:"Brackets",loc:this.getLocation(n,this.tokenStart),children:r}}var Op=Object.freeze({__proto__:null,generate:function(e){this.token(9,"["),this.children(e),this.token(9,"]")},name:"Brackets",parse:Ep,structure:{children:[[]]}})
function Pp(){const e=this.tokenStart
return this.eat(Lc),{type:"CDC",loc:this.getLocation(e,this.tokenStart)}}var Lp=Object.freeze({__proto__:null,generate:function(){this.token(Lc,"--\x3e")},name:"CDC",parse:Pp,structure:[]})
function Np(){const e=this.tokenStart
return this.eat(14),{type:"CDO",loc:this.getLocation(e,this.tokenStart)}}var Dp=Object.freeze({__proto__:null,generate:function(){this.token(14,"\x3c!--")},name:"CDO",parse:Np,structure:[]})
const Mp={name:String}
function jp(){return this.eatDelim(46),{type:"ClassSelector",loc:this.getLocation(this.tokenStart-1,this.tokenEnd),name:this.consume(1)}}var Ip=Object.freeze({__proto__:null,generate:function(e){this.token(9,"."),this.token(1,e.name)},name:"ClassSelector",parse:jp,structure:Mp})
const Rp={name:String}
function Fp(){const e=this.tokenStart
let t
switch(this.tokenType){case Pc:t=" "
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 62:case 43:case 126:this.next()
break
case 47:this.next(),this.eatIdent("deep"),this.eatDelim(47)
break
default:this.error("Combinator is expected")}t=this.substrToCursor(e)}return{type:"Combinator",loc:this.getLocation(e,this.tokenStart),name:t}}var zp=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"Combinator",parse:Fp,structure:Rp})
const Gp={value:String}
function Bp(){const e=this.tokenStart
let t=this.tokenEnd
return this.eat(Bc),t-e+2>=2&&42===this.charCodeAt(t-2)&&47===this.charCodeAt(t-1)&&(t-=2),{type:"Comment",loc:this.getLocation(e,this.tokenStart),value:this.substring(e+2,t)}}var Up=Object.freeze({__proto__:null,generate:function(e){this.token(Bc,"/*"+e.value+"*/")},name:"Comment",parse:Bp,structure:Gp})
function qp(e){return this.Raw(e,this.consumeUntilExclamationMarkOrSemicolon,!0)}function Wp(e){return this.Raw(e,this.consumeUntilExclamationMarkOrSemicolon,!1)}function Vp(){const e=this.tokenIndex,t=this.Value()
return"Raw"!==t.type&&!1===this.eof&&this.tokenType!==Dc&&!1===this.isDelim(33)&&!1===this.isBalanceEdge(e)&&this.error(),t}const $p={important:[Boolean,String],property:String,value:["Value","Raw"]}
function Yp(){const e=this.tokenStart,t=this.tokenIndex,n=Xp.call(this),r=hh(n),s=r?this.parseCustomProperty:this.parseValue,i=r?Wp:qp
let o,a=!1
this.skipSC(),this.eat(Nc)
const l=this.tokenIndex
if(r||this.skipSC(),o=s?this.parseWithFallback(Vp,i):i.call(this,this.tokenIndex),r&&"Value"===o.type&&o.children.isEmpty)for(let e=l-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Pc){o.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}return this.isDelim(33)&&(a=Hp.call(this),this.skipSC()),!1===this.eof&&this.tokenType!==Dc&&!1===this.isBalanceEdge(t)&&this.error(),{type:"Declaration",loc:this.getLocation(e,this.tokenStart),important:a,property:n,value:o}}function Xp(){const e=this.tokenStart
if(9===this.tokenType)switch(this.charCodeAt(this.tokenStart)){case 42:case 36:case 43:case 35:case 38:this.next()
break
case 47:this.next(),this.isDelim(47)&&this.next()}return 4===this.tokenType?this.eat(4):this.eat(1),this.substrToCursor(e)}function Hp(){this.eat(9),this.skipSC()
const e=this.consume(1)
return"important"===e||e}var Qp=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.property),this.token(Nc,":"),this.node(e.value),e.important&&(this.token(9,"!"),this.token(1,!0===e.important?"important":e.important))},name:"Declaration",parse:Yp,structure:$p,walkContext:"declaration"})
function Kp(e){return this.Raw(e,this.consumeUntilSemicolonIncluded,!0)}function Zp(){const e=this.createList()
for(;!this.eof;)switch(this.tokenType){case Pc:case Bc:case Dc:this.next()
break
default:e.push(this.parseWithFallback(this.Declaration,Kp))}return{type:"DeclarationList",loc:this.getLocationFromList(e),children:e}}var Jp=Object.freeze({__proto__:null,generate:function(e){this.children(e,e=>{"Declaration"===e.type&&this.token(Dc,";")})},name:"DeclarationList",parse:Zp,structure:{children:[["Declaration"]]}})
const ed={value:String,unit:String}
function td(){const e=this.tokenStart,t=this.consumeNumber(Oc)
return{type:"Dimension",loc:this.getLocation(e,this.tokenStart),value:t,unit:this.substring(e+t.length,this.tokenStart)}}var nd=Object.freeze({__proto__:null,generate:function(e){this.token(Oc,e.value+e.unit)},name:"Dimension",parse:td,structure:ed})
const rd={name:String,children:[[]]}
function sd(e,t){const n=this.tokenStart,r=this.consumeFunctionName(),s=r.toLowerCase()
let i
return i=t.hasOwnProperty(s)?t[s].call(this,t):e.call(this,t),this.eof||this.eat(Fc),{type:"Function",loc:this.getLocation(n,this.tokenStart),name:r,children:i}}var id=Object.freeze({__proto__:null,generate:function(e){this.token(2,e.name+"("),this.children(e),this.token(Fc,")")},name:"Function",parse:sd,structure:rd,walkContext:"function"})
const od={value:String}
function ad(){const e=this.tokenStart
return this.eat(4),{type:"Hash",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e+1)}}var ld=Object.freeze({__proto__:null,generate:function(e){this.token(4,"#"+e.value)},name:"Hash",parse:ad,structure:od,xxx:"XXX"})
const cd={name:String}
function ud(){return{type:"Identifier",loc:this.getLocation(this.tokenStart,this.tokenEnd),name:this.consume(1)}}var hd=Object.freeze({__proto__:null,generate:function(e){this.token(1,e.name)},name:"Identifier",parse:ud,structure:cd})
const fd={name:String}
function pd(){const e=this.tokenStart
return this.eat(4),{type:"IdSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e+1)}}var dd=Object.freeze({__proto__:null,generate:function(e){this.token(9,"#"+e.name)},name:"IdSelector",parse:pd,structure:fd})
const md={name:String,value:["Identifier","Number","Dimension","Ratio",null]}
function gd(){const e=this.tokenStart
let t,n=null
if(this.eat(Rc),this.skipSC(),t=this.consume(1),this.skipSC(),this.tokenType!==Fc){switch(this.eat(Nc),this.skipSC(),this.tokenType){case Tc:n=9===this.lookupNonWSType(1)?this.Ratio():this.Number()
break
case Oc:n=this.Dimension()
break
case 1:n=this.Identifier()
break
default:this.error("Number, dimension, ratio or identifier is expected")}this.skipSC()}return this.eat(Fc),{type:"MediaFeature",loc:this.getLocation(e,this.tokenStart),name:t,value:n}}var yd=Object.freeze({__proto__:null,generate:function(e){this.token(Rc,"("),this.token(1,e.name),null!==e.value&&(this.token(Nc,":"),this.node(e.value)),this.token(Fc,")")},name:"MediaFeature",parse:gd,structure:md})
function bd(){const e=this.createList()
let t=null
this.skipSC()
e:for(;!this.eof;){switch(this.tokenType){case Bc:case Pc:this.next()
continue
case 1:t=this.Identifier()
break
case Rc:t=this.MediaFeature()
break
default:break e}e.push(t)}return null===t&&this.error("Identifier or parenthesis is expected"),{type:"MediaQuery",loc:this.getLocationFromList(e),children:e}}var kd=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"MediaQuery",parse:bd,structure:{children:[["Identifier","MediaFeature","WhiteSpace"]]}})
function vd(){const e=this.createList()
for(this.skipSC();!this.eof&&(e.push(this.MediaQuery()),this.tokenType===Mc);)this.next()
return{type:"MediaQueryList",loc:this.getLocationFromList(e),children:e}}var Sd=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Mc,","))},name:"MediaQueryList",parse:vd,structure:{children:[["MediaQuery"]]}})
function wd(){this.skipSC()
const e=this.tokenStart
let t,n=e,r=null
return t=this.lookupValue(0,"odd")||this.lookupValue(0,"even")?this.Identifier():this.AnPlusB(),n=this.tokenStart,this.skipSC(),this.lookupValue(0,"of")&&(this.next(),r=this.SelectorList(),n=this.tokenStart),{type:"Nth",loc:this.getLocation(e,n),nth:t,selector:r}}var xd=Object.freeze({__proto__:null,generate:function(e){this.node(e.nth),null!==e.selector&&(this.token(1,"of"),this.node(e.selector))},name:"Nth",parse:wd,structure:{nth:["AnPlusB","Identifier"],selector:["SelectorList",null]}})
const Cd={value:String}
function Ad(){return{type:"Number",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consume(Tc)}}var _d=Object.freeze({__proto__:null,generate:function(e){this.token(Tc,e.value)},name:"Number",parse:Ad,structure:Cd})
const Td={value:String}
function Ed(){const e=this.tokenStart
return this.next(),{type:"Operator",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var Od=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Operator",parse:Ed,structure:Td})
function Pd(e,t){const n=this.tokenStart
let r=null
return this.eat(Rc),r=e.call(this,t),this.eof||this.eat(Fc),{type:"Parentheses",loc:this.getLocation(n,this.tokenStart),children:r}}var Ld=Object.freeze({__proto__:null,generate:function(e){this.token(Rc,"("),this.children(e),this.token(Fc,")")},name:"Parentheses",parse:Pd,structure:{children:[[]]}})
const Nd={value:String}
function Dd(){return{type:"Percentage",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:this.consumeNumber(Ec)}}var Md=Object.freeze({__proto__:null,generate:function(e){this.token(Ec,e.value+"%")},name:"Percentage",parse:Dd,structure:Nd})
const jd={name:String,children:[["Raw"],null]}
function Id(){const e=this.tokenStart
let t,n,r=null
return this.eat(Nc),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(this.tokenIndex,null,!1))),this.eat(Fc)):t=this.consume(1),{type:"PseudoClassSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var Rd=Object.freeze({__proto__:null,generate:function(e){this.token(Nc,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(Fc,")"))},name:"PseudoClassSelector",parse:Id,structure:jd,walkContext:"function"})
const Fd={name:String,children:[["Raw"],null]}
function zd(){const e=this.tokenStart
let t,n,r=null
return this.eat(Nc),this.eat(Nc),2===this.tokenType?(t=this.consumeFunctionName(),n=t.toLowerCase(),hasOwnProperty.call(this.pseudo,n)?(this.skipSC(),r=this.pseudo[n].call(this),this.skipSC()):(r=this.createList(),r.push(this.Raw(this.tokenIndex,null,!1))),this.eat(Fc)):t=this.consume(1),{type:"PseudoElementSelector",loc:this.getLocation(e,this.tokenStart),name:t,children:r}}var Gd=Object.freeze({__proto__:null,generate:function(e){this.token(Nc,":"),this.token(Nc,":"),null===e.children?this.token(1,e.name):(this.token(2,e.name+"("),this.children(e),this.token(Fc,")"))},name:"PseudoElementSelector",parse:zd,structure:Fd,walkContext:"function"})
function Bd(){this.skipSC()
const e=this.consume(Tc)
for(let t=0;t<e.length;t++){const n=e.charCodeAt(t)
Uc(n)||46===n||this.error("Unsigned number is expected",this.tokenStart-e.length+t)}return 0===Number(e)&&this.error("Zero number is not allowed",this.tokenStart-e.length),e}const Ud={left:String,right:String}
function qd(){const e=this.tokenStart,t=Bd.call(this)
let n
return this.skipSC(),this.eatDelim(47),n=Bd.call(this),{type:"Ratio",loc:this.getLocation(e,this.tokenStart),left:t,right:n}}var Wd=Object.freeze({__proto__:null,generate:function(e){this.token(Tc,e.left),this.token(9,"/"),this.token(Tc,e.right)},name:"Ratio",parse:qd,structure:Ud})
function Vd(){return this.tokenIndex>0&&this.lookupType(-1)===Pc?this.tokenIndex>1?this.getTokenStart(this.tokenIndex-1):this.firstCharOffset:this.tokenStart}const $d={value:String}
function Yd(e,t,n){const r=this.getTokenStart(e)
let s
return this.skipUntilBalanced(e,t||this.consumeUntilBalanceEnd),s=n&&this.tokenStart>r?Vd.call(this):this.tokenStart,{type:"Raw",loc:this.getLocation(r,s),value:this.substring(r,s)}}var Xd=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"Raw",parse:Yd,structure:$d})
function Hd(e){return this.Raw(e,this.consumeUntilLeftCurlyBracket,!0)}function Qd(){const e=this.SelectorList()
return"Raw"!==e.type&&!1===this.eof&&this.tokenType!==zc&&this.error(),e}function Kd(){const e=this.tokenIndex,t=this.tokenStart
let n,r
return n=this.parseRulePrelude?this.parseWithFallback(Qd,Hd):Hd.call(this,e),r=this.Block(!0),{type:"Rule",loc:this.getLocation(t,this.tokenStart),prelude:n,block:r}}var Zd=Object.freeze({__proto__:null,generate:function(e){this.node(e.prelude),this.node(e.block)},name:"Rule",parse:Kd,structure:{prelude:["SelectorList","Raw"],block:["Block"]},walkContext:"rule"})
function Jd(){const e=this.readSequence(this.scope.Selector)
return null===this.getFirstListNode(e)&&this.error("Selector is expected"),{type:"Selector",loc:this.getLocationFromList(e),children:e}}var em=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Selector",parse:Jd,structure:{children:[["TypeSelector","IdSelector","ClassSelector","AttributeSelector","PseudoClassSelector","PseudoElementSelector","Combinator","WhiteSpace"]]}})
function tm(){const e=this.createList()
for(;!this.eof&&(e.push(this.Selector()),this.tokenType===Mc);)this.next()
return{type:"SelectorList",loc:this.getLocationFromList(e),children:e}}var nm=Object.freeze({__proto__:null,generate:function(e){this.children(e,()=>this.token(Mc,","))},name:"SelectorList",parse:tm,structure:{children:[["Selector","Raw"]]},walkContext:"selector"})
function rm(e){const t=e.length,n=e.charCodeAt(0),r=34===n||39===n?1:0,s=1===r&&t>1&&e.charCodeAt(t-1)===n?t-2:t-1
let i=""
for(let n=r;n<=s;n++){let r=e.charCodeAt(n)
if(92===r){if(n===s){n!==t-1&&(i=e.substr(n+1))
break}if(r=e.charCodeAt(++n),Qc(92,r)){const t=n-1,r=cu(e,t)
n=r-1,i+=pu(e.substring(t+1,r))}else 0x000d===r&&0x000a===e.charCodeAt(n+1)&&n++}else i+=e[n]}return i}function sm(e,t){const n=t?"'":'"',r=t?39:34
let s="",i=!1
for(let t=0;t<e.length;t++){const n=e.charCodeAt(t)
0x0000!==n?n<=0x001f||0x007F===n?(s+="\\"+n.toString(16),i=!0):n===r||92===n?(s+="\\"+e.charAt(t),i=!1):(i&&(qc(n)||Hc(n))&&(s+=" "),s+=e.charAt(t),i=!1):s+="�"}return n+s+n}const im={value:String}
function om(){return{type:"String",loc:this.getLocation(this.tokenStart,this.tokenEnd),value:rm(this.consume(5))}}var am=Object.freeze({__proto__:null,generate:function(e){this.token(5,sm(e.value))},name:"String",parse:om,structure:im})
function lm(e){return this.Raw(e,null,!1)}function cm(){const e=this.tokenStart,t=this.createList()
let n
for(;!this.eof;){switch(this.tokenType){case Pc:this.next()
continue
case Bc:if(33!==this.charCodeAt(this.tokenStart+2)){this.next()
continue}n=this.Comment()
break
case 14:n=this.CDO()
break
case Lc:n=this.CDC()
break
case 3:n=this.parseWithFallback(this.Atrule,lm)
break
default:n=this.parseWithFallback(this.Rule,lm)}t.push(n)}return{type:"StyleSheet",loc:this.getLocation(e,this.tokenStart),children:t}}var um=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"StyleSheet",parse:cm,structure:{children:[["Comment","CDO","CDC","Atrule","Rule","Raw"]]},walkContext:"stylesheet"})
function hm(){1!==this.tokenType&&!1===this.isDelim(42)&&this.error("Identifier or asterisk is expected"),this.next()}const fm={name:String}
function pm(){const e=this.tokenStart
return this.isDelim(124)?(this.next(),hm.call(this)):(hm.call(this),this.isDelim(124)&&(this.next(),hm.call(this))),{type:"TypeSelector",loc:this.getLocation(e,this.tokenStart),name:this.substrToCursor(e)}}var dm=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.name)},name:"TypeSelector",parse:pm,structure:fm})
function mm(e,t){let n=0
for(let r=this.tokenStart+e;r<this.tokenEnd;r++){const s=this.charCodeAt(r)
if(45===s&&t&&0!==n)return mm.call(this,e+n+1,!1),-1
qc(s)||this.error(t&&0!==n?"Hyphen minus"+(n<6?" or hex digit":"")+" is expected":n<6?"Hex digit is expected":"Unexpected input",r),++n>6&&this.error("Too many hex digits",r)}return this.next(),n}function gm(e){let t=0
for(;this.isDelim(63);)++t>e&&this.error("Too many question marks"),this.next()}function ym(e){this.charCodeAt(this.tokenStart)!==e&&this.error((43===e?"Plus sign":"Hyphen minus")+" is expected")}function bm(){let e=0
switch(this.tokenType){case Tc:if(e=mm.call(this,1,!0),this.isDelim(63)){gm.call(this,6-e)
break}if(this.tokenType===Oc||this.tokenType===Tc){ym.call(this,45),mm.call(this,1,!1)
break}break
case Oc:e=mm.call(this,1,!0),e>0&&gm.call(this,6-e)
break
default:if(this.eatDelim(43),1===this.tokenType){e=mm.call(this,0,!0),e>0&&gm.call(this,6-e)
break}if(this.isDelim(63)){this.next(),gm.call(this,5)
break}this.error("Hex digit or question mark is expected")}}const km={value:String}
function vm(){const e=this.tokenStart
return this.eatIdent("u"),bm.call(this),{type:"UnicodeRange",loc:this.getLocation(e,this.tokenStart),value:this.substrToCursor(e)}}var Sm=Object.freeze({__proto__:null,generate:function(e){this.tokenize(e.value)},name:"UnicodeRange",parse:vm,structure:km})
function wm(e){let t="",n=!1
for(let r=0;r<e.length;r++){const s=e.charCodeAt(r)
0x0000!==s?s<=0x001f||0x007F===s?(t+="\\"+s.toString(16),n=!0):32===s||92===s||34===s||39===s||40===s||41===s?(t+="\\"+e.charAt(r),n=!1):(n&&qc(s)&&(t+=" "),t+=e.charAt(r),n=!1):t+="�"}return"url("+t+")"}const xm={value:String}
function Cm(){const e=this.tokenStart
let t
switch(this.tokenType){case 7:t=function(e){const t=e.length
let n=4,r=41===e.charCodeAt(t-1)?t-2:t-1,s=""
for(;n<r&&Hc(e.charCodeAt(n));)n++
for(;n<r&&Hc(e.charCodeAt(r));)r--
for(let i=n;i<=r;i++){let n=e.charCodeAt(i)
if(92===n){if(i===r){i!==t-1&&(s=e.substr(i+1))
break}if(n=e.charCodeAt(++i),Qc(92,n)){const t=i-1,n=cu(e,t)
i=n-1,s+=pu(e.substring(t+1,n))}else 0x000d===n&&0x000a===e.charCodeAt(i+1)&&i++}else s+=e[i]}return s}(this.consume(7))
break
case 2:this.cmpStr(this.tokenStart,this.tokenEnd,"url(")||this.error("Function name must be `url`"),this.eat(2),this.skipSC(),t=rm(this.consume(5)),this.skipSC(),this.eof||this.eat(Fc)
break
default:this.error("Url or Function is expected")}return{type:"Url",loc:this.getLocation(e,this.tokenStart),value:t}}var Am=Object.freeze({__proto__:null,generate:function(e){this.token(7,wm(e.value))},name:"Url",parse:Cm,structure:xm})
function _m(){const e=this.tokenStart,t=this.readSequence(this.scope.Value)
return{type:"Value",loc:this.getLocation(e,this.tokenStart),children:t}}var Tm=Object.freeze({__proto__:null,generate:function(e){this.children(e)},name:"Value",parse:_m,structure:{children:[[]]}})
const Em=Object.freeze({type:"WhiteSpace",loc:null,value:" "}),Om={value:String}
function Pm(){return this.eat(Pc),Em}var Lm=Object.freeze({__proto__:null,generate:function(e){this.token(Pc,e.value)},name:"WhiteSpace",parse:Pm,structure:Om}),Nm=Object.freeze({__proto__:null,AnPlusB:cp,Atrule:dp,AtrulePrelude:gp,AttributeSelector:Sp,Block:Tp,Brackets:Op,CDC:Lp,CDO:Dp,ClassSelector:Ip,Combinator:zp,Comment:Up,Declaration:Qp,DeclarationList:Jp,Dimension:nd,Function:id,Hash:ld,IdSelector:dd,Identifier:hd,MediaFeature:yd,MediaQuery:kd,MediaQueryList:Sd,Nth:xd,Number:_d,Operator:Od,Parentheses:Ld,Percentage:Md,PseudoClassSelector:Rd,PseudoElementSelector:Gd,Ratio:Wd,Raw:Xd,Rule:Zd,Selector:em,SelectorList:nm,String:am,StyleSheet:um,TypeSelector:dm,UnicodeRange:Sm,Url:Am,Value:Tm,WhiteSpace:Lm}),Dm={generic:!0,...Zf,node:Nm}
function Mm(e){switch(this.tokenType){case 4:return this.Hash()
case Mc:return this.Operator()
case Rc:return this.Parentheses(this.readSequence,e.recognizer)
case jc:return this.Brackets(this.readSequence,e.recognizer)
case 5:return this.String()
case Oc:return this.Dimension()
case Ec:return this.Percentage()
case Tc:return this.Number()
case 2:return this.cmpStr(this.tokenStart,this.tokenEnd,"url(")?this.Url():this.Function(this.readSequence,e.recognizer)
case 7:return this.Url()
case 1:return this.cmpChar(this.tokenStart,117)&&this.cmpChar(this.tokenStart+1,43)?this.UnicodeRange():this.Identifier()
case 9:{const e=this.charCodeAt(this.tokenStart)
if(47===e||42===e||43===e||45===e)return this.Operator()
35===e&&this.error("Hex or identifier is expected",this.tokenStart+1)
break}}}var jm={getNode:Mm}
var Im={onWhiteSpace:function(e,t){null!==t.last&&"Combinator"!==t.last.type&&null!==e&&"Combinator"!==e.type&&t.push({type:"Combinator",loc:null,name:" "})},getNode:function(){switch(this.tokenType){case jc:return this.AttributeSelector()
case 4:return this.IdSelector()
case Nc:return this.lookupType(1)===Nc?this.PseudoElementSelector():this.PseudoClassSelector()
case 1:return this.TypeSelector()
case Tc:case Ec:return this.Percentage()
case Oc:46===this.charCodeAt(this.tokenStart)&&this.error("Identifier is expected",this.tokenStart+1)
break
case 9:switch(this.charCodeAt(this.tokenStart)){case 43:case 62:case 126:case 47:return this.Combinator()
case 46:return this.ClassSelector()
case 42:case 124:return this.TypeSelector()
case 35:return this.IdSelector()}break}}}
function Rm(e){return null!==e&&"Operator"===e.type&&("-"===e.value[e.value.length-1]||"+"===e.value[e.value.length-1])}var Fm={getNode:Mm,onWhiteSpace(e,t){Rm(e)&&(e.value=" "+e.value),Rm(t.last)&&(t.last.value+=" ")},expression:function(){return this.createSingleNodeList(this.Raw(this.tokenIndex,null,!1))},var:function(){const e=this.createList()
if(this.skipSC(),e.push(this.Identifier()),this.skipSC(),this.tokenType===Mc){e.push(this.Operator())
const t=this.tokenIndex,n=this.parseCustomProperty?this.Value(null):this.Raw(this.tokenIndex,this.consumeUntilExclamationMarkOrSemicolon,!1)
if("Value"===n.type&&n.children.isEmpty)for(let e=t-this.tokenIndex;e<=0;e++)if(this.lookupType(e)===Pc){n.children.appendData({type:"WhiteSpace",loc:null,value:" "})
break}e.push(n)}return e}},zm=Object.freeze({__proto__:null,AtrulePrelude:jm,Selector:Im,Value:Fm})
function Gm(){return this.createSingleNodeList(this.Raw(this.tokenIndex,null,!1))}function Bm(){return this.skipSC(),1===this.tokenType&&this.lookupNonWSType(1)===Nc?this.createSingleNodeList(this.Declaration()):Um.call(this)}function Um(){const e=this.createList()
let t
this.skipSC()
e:for(;!this.eof;){switch(this.tokenType){case Bc:case Pc:this.next()
continue
case 2:t=this.Function(Gm,this.scope.AtrulePrelude)
break
case 1:t=this.Identifier()
break
case Rc:t=this.Parentheses(Bm,this.scope.AtrulePrelude)
break
default:break e}e.push(t)}return e}var qm={"font-face":{parse:{prelude:null,block(){return this.Block(!0)}}},import:{parse:{prelude(){const e=this.createList()
switch(this.skipSC(),this.tokenType){case 5:e.push(this.String())
break
case 7:case 2:e.push(this.Url())
break
default:this.error("String or url() is expected")}return 1!==this.lookupNonWSType(0)&&this.lookupNonWSType(0)!==Rc||e.push(this.MediaQueryList()),e},block:null}},media:{parse:{prelude(){return this.createSingleNodeList(this.MediaQueryList())},block(){return this.Block(!1)}}},page:{parse:{prelude(){return this.createSingleNodeList(this.SelectorList())},block(){return this.Block(!0)}}},supports:{parse:{prelude(){const e=Um.call(this)
return null===this.getFirstListNode(e)&&this.error("Condition is expected"),e},block(){return this.Block(!1)}}}}
const Wm={parse(){return this.createSingleNodeList(this.SelectorList())}},Vm={parse(){return this.createSingleNodeList(this.Selector())}},$m={parse(){return this.createSingleNodeList(this.Identifier())}},Ym={parse(){return this.createSingleNodeList(this.Nth())}}
var Xm={dir:$m,has:Wm,lang:$m,matches:Wm,is:Wm,"-moz-any":Wm,"-webkit-any":Wm,where:Wm,not:Wm,"nth-child":Ym,"nth-last-child":Ym,"nth-last-of-type":Ym,"nth-of-type":Ym,slotted:Vm},Hm=Object.freeze({__proto__:null,AnPlusB:lp,Atrule:pp,AtrulePrelude:mp,AttributeSelector:vp,Block:_p,Brackets:Ep,CDC:Pp,CDO:Np,ClassSelector:jp,Combinator:Fp,Comment:Bp,Declaration:Yp,DeclarationList:Zp,Dimension:td,Function:sd,Hash:ad,IdSelector:pd,Identifier:ud,MediaFeature:gd,MediaQuery:bd,MediaQueryList:vd,Nth:wd,Number:Ad,Operator:Ed,Parentheses:Pd,Percentage:Dd,PseudoClassSelector:Id,PseudoElementSelector:zd,Ratio:qd,Raw:Yd,Rule:Kd,Selector:Jd,SelectorList:tm,String:om,StyleSheet:cm,TypeSelector:pm,UnicodeRange:vm,Url:Cm,Value:_m,WhiteSpace:Pm}),Qm=(e=>Wf(qf({},e)))({...Dm,...{parseContext:{default:"StyleSheet",stylesheet:"StyleSheet",atrule:"Atrule",atrulePrelude(e){return this.AtrulePrelude(e.atrule?String(e.atrule):null)},mediaQueryList:"MediaQueryList",mediaQuery:"MediaQuery",rule:"Rule",selectorList:"SelectorList",selector:"Selector",block(){return this.Block(!0)},declarationList:"DeclarationList",declaration:"Declaration",value:"Value"},scope:zm,atrule:qm,pseudo:Xm,node:Hm},...{node:Nm}})
const Km=e(import.meta.url),{version:Zm}=Km("../package.json")
function Jm(e){const t={}
for(const n in e){let r=e[n]
r&&(Array.isArray(r)||r instanceof Cu?r=r.map(Jm):r.constructor===Object&&(r=Jm(r))),t[n]=r}return t}const{tokenize:eg,parse:tg,generate:ng,lexer:rg,createLexer:sg,walk:ig,find:og,findLast:ag,findAll:lg,toPlainObject:cg,fromPlainObject:ug,fork:hg}=Qm,{hasOwnProperty:fg}=Object.prototype
function pg(e,t){const n=Object.create(null)
if(!Array.isArray(e))return null
for(let r of e)t&&(r=r.toLowerCase()),n[r]=!0
return n}function dg(e){if(!e)return null
const t=pg(e.tags,!0),n=pg(e.ids),r=pg(e.classes)
return null===t&&null===n&&null===r?null:{tags:t,ids:n,classes:r}}function mg(e){let t=!1
if(e.scopes&&Array.isArray(e.scopes)){t=Object.create(null)
for(let n=0;n<e.scopes.length;n++){const r=e.scopes[n]
if(!r||!Array.isArray(r))throw new Error("Wrong usage format")
for(const e of r){if(fg.call(t,e))throw new Error(`Class can't be used for several scopes: ${e}`)
t[e]=n+1}}}return{whitelist:dg(e),blacklist:dg(e.blacklist),scopes:t}}function gg(e){return!e||!e.children||e.children.isEmpty}function yg(e,t){return null!==e&&e.children===t}const{hasOwnProperty:bg}=Object.prototype,kg=new Set(["keyframes"])
function vg(e,t){return e.children.forEach((n,r,s)=>{let i=!1
ig(n,function(n){if(null===this.selector||this.selector===e)switch(n.type){case"SelectorList":null!==this.function&&"not"===this.function.name.toLowerCase()||vg(n,t)&&(i=!0)
break
case"ClassSelector":null===t.whitelist||null===t.whitelist.classes||bg.call(t.whitelist.classes,n.name)||(i=!0),null!==t.blacklist&&null!==t.blacklist.classes&&bg.call(t.blacklist.classes,n.name)&&(i=!0)
break
case"IdSelector":null===t.whitelist||null===t.whitelist.ids||bg.call(t.whitelist.ids,n.name)||(i=!0),null!==t.blacklist&&null!==t.blacklist.ids&&bg.call(t.blacklist.ids,n.name)&&(i=!0)
break
case"TypeSelector":"*"!==n.name.charAt(n.name.length-1)&&(null===t.whitelist||null===t.whitelist.tags||bg.call(t.whitelist.tags,n.name.toLowerCase())||(i=!0),null!==t.blacklist&&null!==t.blacklist.tags&&bg.call(t.blacklist.tags,n.name.toLowerCase())&&(i=!0))}}),i&&s.remove(r)}),e.children.isEmpty}const Sg={Atrule:function(e,t,n){if(e.block&&(null!==this.stylesheet&&(this.stylesheet.firstAtrulesAllowed=!1),gg(e.block)))return n.remove(t),void 0
switch(e.name){case"charset":if(gg(e.prelude))return n.remove(t),void 0
if(t.prev)return n.remove(t),void 0
break
case"import":if(null===this.stylesheet||!this.stylesheet.firstAtrulesAllowed)return n.remove(t),void 0
n.prevUntil(t.prev,function(e){if("Atrule"!==e.type||"import"!==e.name&&"charset"!==e.name)return this.root.firstAtrulesAllowed=!1,n.remove(t),!0},this)
break
default:{const r=ch(e.name).basename
"keyframes"!==r&&"media"!==r&&"supports"!==r||(gg(e.prelude)||gg(e.block))&&n.remove(t)}}},Comment:function(e,t,n){n.remove(t)},Declaration:function(e,t,n){if(e.value.children&&e.value.children.isEmpty)return n.remove(t),void 0
uh(e.property).custom&&/\S/.test(e.value.value)&&(e.value.value=e.value.value.trim())},Raw:function(e,t,n){(yg(this.stylesheet,n)||yg(this.block,n))&&n.remove(t)},Rule:function(e,t,n,r){if(gg(e.prelude)||gg(e.block))return n.remove(t),void 0
if(this.atrule&&kg.has(ch(this.atrule.name).basename))return
const{usage:s}=r
return s&&(null!==s.whitelist||null!==s.blacklist)&&(vg(e.prelude,s),gg(e.prelude))?(n.remove(t),void 0):void 0},TypeSelector:function(e,t,n){if("*"!==t.data.name)return
const r=t.next&&t.next.data.type
"IdSelector"!==r&&"ClassSelector"!==r&&"AttributeSelector"!==r&&"PseudoClassSelector"!==r&&"PseudoElementSelector"!==r||n.remove(t)},WhiteSpace:function(e,t,n){n.remove(t)}}
const wg=/^(-?\d|--)|[\u0000-\u002c\u002e\u002f\u003A-\u0040\u005B-\u005E\u0060\u007B-\u009f]/
function xg(e){e.children.forEach((e,t,n)=>{"Identifier"===e.type&&"none"===e.name.toLowerCase()&&(n.head===n.tail?t.data={type:"Number",loc:e.loc,value:"0"}:n.remove(t))})}const Cg={font:function(e){const t=e.children
t.forEachRight(function(e,t){if("Identifier"===e.type)if("bold"===e.name)t.data={type:"Number",loc:e.loc,value:"700"}
else if("normal"===e.name){const e=t.prev
e&&"Operator"===e.data.type&&"/"===e.data.value&&this.remove(e),this.remove(t)}}),t.isEmpty&&t.insert(t.createItem({type:"Identifier",name:"normal"}))},"font-weight":function(e){const t=e.children.head.data
if("Identifier"===t.type)switch(t.name){case"normal":e.children.head.data={type:"Number",loc:t.loc,value:"400"}
break
case"bold":e.children.head.data={type:"Number",loc:t.loc,value:"700"}}},background:function(e){function t(){r.length||r.unshift({type:"Number",loc:null,value:"0"},{type:"Number",loc:null,value:"0"}),n.push.apply(n,r),r=[]}let n=[],r=[]
e.children.forEach(e=>{if("Operator"===e.type&&","===e.value)return t(),n.push(e),void 0;("Identifier"!==e.type||"transparent"!==e.name&&"none"!==e.name&&"repeat"!==e.name&&"scroll"!==e.name)&&r.push(e)}),t(),e.children=(new Cu).fromArray(n)},border:xg,outline:xg}
const Ag=/^(?:\+|(-))?0*(\d*)(?:\.0*|(\.\d*?)0*)?$/
function _g(e){const t=Ag
return""!==(e=String(e).replace(t,"$1$2$3"))&&"-"!==e||(e="0"),e}const Tg=new Set(["calc","min","max","clamp"]),Eg=new Set(["px","mm","cm","in","pt","pc","em","ex","ch","rem","vh","vw","vmin","vmax","vm"])
const Og=new Set(["width","min-width","max-width","height","min-height","max-height","flex","-ms-flex"])
const Pg={aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370db",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"db7093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32"},Lg={800000:"maroon",800080:"purple",808000:"olive",808080:"gray","00ffff":"cyan",f0ffff:"azure",f5f5dc:"beige",ffe4c4:"bisque","000000":"black","0000ff":"blue",a52a2a:"brown",ff7f50:"coral",ffd700:"gold","008000":"green","4b0082":"indigo",fffff0:"ivory",f0e68c:"khaki","00ff00":"lime",faf0e6:"linen","000080":"navy",ffa500:"orange",da70d6:"orchid",cd853f:"peru",ffc0cb:"pink",dda0dd:"plum",f00:"red",ff0000:"red",fa8072:"salmon",a0522d:"sienna",c0c0c0:"silver",fffafa:"snow",d2b48c:"tan","008080":"teal",ff6347:"tomato",ee82ee:"violet",f5deb3:"wheat",ffffff:"white",ffff00:"yellow"}
function Ng(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e}function Dg(e,t,n,r){let s,i,o
if(0===t)s=i=o=n
else{const r=n<0.5?n*(1+t):n+t-n*t,a=2*n-r
s=Ng(a,r,e+1/3),i=Ng(a,r,e),o=Ng(a,r,e-1/3)}return[Math.round(255*s),Math.round(255*i),Math.round(255*o),r]}function Mg(e){return 1===(e=e.toString(16)).length?"0"+e:e}function jg(e,t,n){let r=e.head,s=[],i=!1
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
case"Alpha":return Math.min(t,1)}return Math.round(t)})}}function Ig(e,t){let n=e.value.toLowerCase()
6===n.length&&n[0]===n[1]&&n[2]===n[3]&&n[4]===n[5]&&(n=n[0]+n[2]+n[4]),Lg[n]?t.data={type:"Identifier",loc:e.loc,name:Lg[n]}:e.value=n}const Rg={Atrule:function(e){"keyframes"===ch(e.name).basename&&!function(e){e.block.children.forEach(e=>{e.prelude.children.forEach(e=>{e.children.forEach((e,t)=>{"Percentage"===e.type&&"100"===e.value?t.data={type:"TypeSelector",loc:e.loc,name:"to"}:"TypeSelector"===e.type&&"from"===e.name&&(t.data={type:"Percentage",loc:e.loc,value:"0"})})})})}(e)},AttributeSelector:function(e){const t=e.value
t&&"String"===t.type&&function(e){return""!==e&&"-"!==e&&!wg.test(e)}(t.value)&&(e.value={type:"Identifier",loc:t.loc,name:t.value})},Value:function(e){if(!this.declaration)return
const t=uh(this.declaration.property)
Cg.hasOwnProperty(t.basename)&&Cg[t.basename](e)},Dimension:function(e,t){const n=_g(e.value)
if(e.value=n,"0"===n&&null!==this.declaration&&null===this.atrulePrelude){const r=e.unit.toLowerCase()
if(!Eg.has(r))return
if("-ms-flex"===this.declaration.property||"flex"===this.declaration.property)return
if(this.function&&Tg.has(this.function.name))return
t.data={type:"Number",loc:e.loc,value:n}}},Percentage:function(e,t){e.value=_g(e.value),"0"===e.value&&this.declaration&&!Og.has(this.declaration.property)&&(t.data={type:"Number",loc:e.loc,value:e.value},rg.matchDeclaration(this.declaration).isType(t.data,"length")||(t.data=e))},Number:function(e){e.value=_g(e.value)},Url:function(e){e.value=e.value.replace(/\\/g,"/")},Hash:Ig,Identifier:function(e,t){if(null===this.declaration)return
let n=e.name.toLowerCase()
if(Pg.hasOwnProperty(n)&&rg.matchDeclaration(this.declaration).isType(e,"color")){const r=Pg[n]
r.length+1<=n.length?t.data={type:"Hash",loc:e.loc,value:r}:("grey"===n&&(n="gray"),e.name=n)}},Function:function(e,t){let n,r=e.name
if("rgba"===r||"hsla"===r){if(n=jg(e.children,4,"rgba"===r),!n)return
if("hsla"===r&&(n=Dg(...n),e.name="rgba"),0===n[3]){const r=this.function&&this.function.name
if(0===n[0]&&0===n[1]&&0===n[2]||!/^(?:to|from|color-stop)$|gradient$/i.test(r))return t.data={type:"Identifier",loc:e.loc,name:"transparent"},void 0}if(1!==n[3])return e.children.forEach((e,t,r)=>{if("Operator"===e.type)return","!==e.value&&r.remove(t),void 0
t.data={type:"Number",loc:e.loc,value:_g(n.shift())}}),void 0
r="rgb"}if("hsl"===r){if(n=n||jg(e.children,3,!1),!n)return
n=Dg(...n),r="rgb"}if("rgb"===r){if(n=n||jg(e.children,3,!0),!n)return
t.data={type:"Hash",loc:e.loc,value:Mg(n[0])+Mg(n[1])+Mg(n[2])},Ig(t.data,t)}}}
class Fg{constructor(){this.map=new Map}resolve(e){let t=this.map.get(e)
return void 0===t&&(t=this.map.size+1,this.map.set(e,t)),t}}function zg(e){return function(e){return"Raw"===e.type?tg(e.value,{context:"selectorList"}):e}(e).children.reduce((e,t)=>function(e,t){for(let n=0;n<3;n++)if(e[n]!==t[n])return e[n]>t[n]?e:t
return e}(Gg(t),e),[0,0,0])}function Gg(e){let t=0,n=0,r=0
return e.children.forEach(e=>{switch(e.type){case"IdSelector":t++
break
case"ClassSelector":case"AttributeSelector":n++
break
case"PseudoClassSelector":switch(e.name.toLowerCase()){case"not":case"has":case"is":case"matches":case"-webkit-any":case"-moz-any":{const[s,i,o]=zg(e.children.first)
t+=s,n+=i,r+=o
break}case"nth-child":case"nth-last-child":{const s=e.children.first
if("Nth"===s.type&&s.selector){const[e,i,o]=zg(s.selector)
t+=e,n+=i+1,r+=o}else n++
break}case"where":break
case"before":case"after":case"first-line":case"first-letter":r++
break
default:n++}break
case"TypeSelector":e.name.endsWith("*")||r++
break
case"PseudoElementSelector":r++}}),[t,n,r]}const Bg=new Set(["first-letter","first-line","after","before"]),Ug=new Set(["link","visited","hover","active","first-letter","first-line","after","before"])
function qg(e,t){const n=function(){const e=new Fg
return function(t){const n=ng(t)
return t.id=e.resolve(n),t.length=n.length,t.fingerprint=null,t}}()
return ig(e,{visit:"Rule",enter(e){e.block.children.forEach(n),function(e,t){const n=new Set
e.prelude.children.forEach(function(e){let r="*",s=0
e.children.forEach(function(i){switch(i.type){case"ClassSelector":if(t&&t.scopes){const n=t.scopes[i.name]||0
if(0!==s&&n!==s)throw new Error("Selector can't has classes from different scopes: "+ng(e))
s=n}break
case"PseudoClassSelector":{const e=i.name.toLowerCase()
Ug.has(e)||n.add(`:${e}`)
break}case"PseudoElementSelector":{const e=i.name.toLowerCase()
Bg.has(e)||n.add(`::${e}`)
break}case"TypeSelector":r=i.name.toLowerCase()
break
case"AttributeSelector":i.flags&&n.add(`[${i.flags.toLowerCase()}]`)
break
case"Combinator":r="*"}}),e.compareMarker=Gg(e).toString(),e.id=null,e.id=ng(e),s&&(e.compareMarker+=":"+s),"*"!==r&&(e.compareMarker+=","+r)}),e.pseudoSignature=n.size>0&&[...n].sort().join(",")}(e,t.usage)}}),ig(e,{visit:"Atrule",enter(e){e.prelude&&(e.prelude.id=null,e.prelude.id=ng(e.prelude)),"keyframes"===ch(e.name).basename&&(e.block.avoidRulesMerge=!0,e.block.children.forEach(function(e){e.prelude.children.forEach(function(e){e.compareMarker=e.id})}))}}),{declaration:n}}const{hasOwnProperty:Wg}=Object.prototype
function Vg(e,t,n,r){const s=t.data,i=ch(s.name).basename,o=s.name.toLowerCase()+"/"+(s.prelude?s.prelude.id:null)
Wg.call(e,i)||(e[i]=Object.create(null)),r&&delete e[i][o],Wg.call(e[i],o)||(e[i][o]=new Cu),e[i][o].append(n.remove(t))}function $g(e){return"Atrule"===e.type&&"media"===e.name}function Yg(e,t,n){if(!$g(e))return
const r=t.prev&&t.prev.data
r&&$g(r)&&e.prelude&&r.prelude&&e.prelude.id===r.prelude.id&&(r.block.children.appendList(e.block.children),n.remove(t))}function Xg(e,t){!function(e,t){const n=Object.create(null)
let r=null
e.children.forEach(function(e,s,i){if("Atrule"===e.type){const o=ch(e.name).basename
switch(o){case"keyframes":return Vg(n,s,i,!0),void 0
case"media":if(t.forceMediaMerge)return Vg(n,s,i,!1),void 0}null===r&&"charset"!==o&&"import"!==o&&(r=s)}else null===r&&(r=s)})
for(const t in n)for(const s in n[t])e.children.insertList(n[t][s],"media"===t?null:r)}(e,t),ig(e,{visit:"Atrule",reverse:!0,enter:Yg})}const{hasOwnProperty:Hg}=Object.prototype
function Qg(e,t){let n=e.head,r=t.head
for(;null!==n&&null!==r&&n.data.id===r.data.id;)n=n.next,r=r.next
return null===n&&null===r}function Kg(e,t){let n=e.head,r=t.head
for(;null!==n&&null!==r&&n.data.id===r.data.id;)n=n.next,r=r.next
return null===n&&null===r}function Zg(e,t){return t.forEach(t=>{const n=t.id
let r=e.head
for(;r;){const e=r.data.id
if(e===n)return
if(e>n)break
r=r.next}e.insert(e.createItem(t),r)}),e}function Jg(e,t){let n=e.head
for(;null!==n;){let e=t.head
for(;null!==e;){if(n.data.compareMarker===e.data.compareMarker)return!0
e=e.next}n=n.next}return!1}function ey(e){switch(e.type){case"Rule":return Jg(e.prelude.children,this)
case"Atrule":if(e.block)return e.block.children.some(ey,this)
break
case"Declaration":return!1}return!0}function ty(e,t,n){const r=e.prelude.children,s=e.block.children
n.prevUntil(t.prev,function(i){if("Rule"!==i.type)return ey.call(r,i)
const o=i.prelude.children,a=i.block.children
if(e.pseudoSignature===i.pseudoSignature){if(Qg(o,r))return a.appendList(s),n.remove(t),!0
if(Kg(s,a))return Zg(o,r),n.remove(t),!0}return Jg(r,o)})}function ny(e,t,n){const r=e.prelude.children
for(;r.head!==r.tail;){const s=new Cu
s.insert(r.remove(r.head)),n.insert(n.createItem({type:"Rule",loc:e.loc,prelude:{type:"SelectorList",loc:e.prelude.loc,children:s},block:{type:"Block",loc:e.block.loc,children:e.block.children.copy()},pseudoSignature:e.pseudoSignature}),t)}}const ry=["top","right","bottom","left"],sy={"margin-top":"top","margin-right":"right","margin-bottom":"bottom","margin-left":"left","padding-top":"top","padding-right":"right","padding-bottom":"bottom","padding-left":"left","border-top-color":"top","border-right-color":"right","border-bottom-color":"bottom","border-left-color":"left","border-top-width":"top","border-right-width":"right","border-bottom-width":"bottom","border-left-width":"left","border-top-style":"top","border-right-style":"right","border-bottom-style":"bottom","border-left-style":"left"},iy={margin:"margin","margin-top":"margin","margin-right":"margin","margin-bottom":"margin","margin-left":"margin",padding:"padding","padding-top":"padding","padding-right":"padding","padding-bottom":"padding","padding-left":"padding","border-color":"border-color","border-top-color":"border-color","border-right-color":"border-color","border-bottom-color":"border-color","border-left-color":"border-color","border-width":"border-width","border-top-width":"border-width","border-right-width":"border-width","border-bottom-width":"border-width","border-left-width":"border-width","border-style":"border-style","border-top-style":"border-style","border-right-style":"border-style","border-bottom-style":"border-style","border-left-style":"border-style"}
class oy{constructor(e){this.name=e,this.loc=null,this.iehack=void 0,this.sides={top:null,right:null,bottom:null,left:null}}getValueSequence(e,t){const n=[]
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
return!n||t.important&&!n.important}add(e,t){return!!function(){const n=this.sides,r=sy[e]
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
for(let t=0;t<4;t++)this.canOverride(ry[t],e[t])&&(n[ry[t]]=e[t])
return!0}}.call(this)&&(this.loc||(this.loc=t.loc),!0)}isOkToMinimize(){const e=this.sides.top,t=this.sides.right,n=this.sides.bottom,r=this.sides.left
if(e&&t&&n&&r){const s=e.important+t.important+n.important+r.important
return 0===s||4===s}return!1}getValue(){const e=new Cu,t=this.sides,n=[t.top,t.right,t.bottom,t.left],r=[ng(t.top.node),ng(t.right.node),ng(t.bottom.node),ng(t.left.node)]
r[3]===r[1]&&(n.pop(),r[2]===r[0]&&(n.pop(),r[1]===r[0]&&n.pop()))
for(let t=0;t<n.length;t++)e.appendData(n[t].node)
return this.iehack&&e.appendData({type:"Identifier",loc:null,name:this.iehack}),{type:"Value",loc:null,children:e}}getDeclaration(){return{type:"Declaration",loc:this.loc,important:this.sides.top.important,property:this.name,value:this.getValue()}}}function ay(e,t,n,r){const s=e.block.children,i=e.prelude.children.first.id
return e.block.children.forEachRight(function(e,o){const a=e.property
if(!iy.hasOwnProperty(a))return
const l=iy[a]
let c,u
if(r&&i!==r||l in t&&(u=2,c=t[l]),!(c&&c.add(a,e)||(u=1,c=new oy(l),c.add(a,e))))return r=null,void 0
t[l]=c,n.push({operation:u,block:s,item:o,shorthand:c}),r=i}),r}function ly(e,t){const n={},r=[]
ig(e,{visit:"Rule",reverse:!0,enter(e){const t=this.block||this.stylesheet,s=(e.pseudoSignature||"")+"|"+e.prelude.children.first.id
let i,o
n.hasOwnProperty(t.id)?i=n[t.id]:(i={lastShortSelector:null},n[t.id]=i),i.hasOwnProperty(s)?o=i[s]:(o={},i[s]=o),i.lastShortSelector=ay.call(this,e,o,r,i.lastShortSelector)}}),function(e,t){e.forEach(function(e){const n=e.shorthand
n.isOkToMinimize()&&(1===e.operation?e.item.data=t(n.getDeclaration()):e.block.remove(e.item))})}(r,t.declaration)}let cy=1
const uy=new Set(["src"]),hy={display:/table|ruby|flex|-(flex)?box$|grid|contents|run-in/i,"text-align":/^(start|end|match-parent|justify-all)$/i},fy={cursor:["auto","crosshair","default","move","text","wait","help","n-resize","e-resize","s-resize","w-resize","ne-resize","nw-resize","se-resize","sw-resize","pointer","progress","not-allowed","no-drop","vertical-text","all-scroll","col-resize","row-resize"],overflow:["hidden","visible","scroll","auto"],position:["static","relative","absolute","fixed"]},py={"border-width":["border"],"border-style":["border"],"border-color":["border"],"border-top":["border"],"border-right":["border"],"border-bottom":["border"],"border-left":["border"],"border-top-width":["border-top","border-width","border"],"border-right-width":["border-right","border-width","border"],"border-bottom-width":["border-bottom","border-width","border"],"border-left-width":["border-left","border-width","border"],"border-top-style":["border-top","border-style","border"],"border-right-style":["border-right","border-style","border"],"border-bottom-style":["border-bottom","border-style","border"],"border-left-style":["border-left","border-style","border"],"border-top-color":["border-top","border-color","border"],"border-right-color":["border-right","border-color","border"],"border-bottom-color":["border-bottom","border-color","border"],"border-left-color":["border-left","border-color","border"],"margin-top":["margin"],"margin-right":["margin"],"margin-bottom":["margin"],"margin-left":["margin"],"padding-top":["padding"],"padding-right":["padding"],"padding-bottom":["padding"],"padding-left":["padding"],"font-style":["font"],"font-variant":["font"],"font-weight":["font"],"font-size":["font"],"font-family":["font"],"list-style-type":["list-style"],"list-style-position":["list-style"],"list-style-image":["list-style"]}
function dy(e,t,n){const r=uh(e).basename
if("background"===r)return e+":"+ng(t.value)
const s=t.id
let i=n[s]
if(!i){switch(t.value.type){case"Value":const e={}
let n="",s="",o=!1
t.value.children.forEach(function t(i){switch(i.type){case"Value":case"Brackets":case"Parentheses":i.children.forEach(t)
break
case"Raw":o=!0
break
case"Identifier":{const{name:t}=i
n||(n=ch(t).vendor),/\\[09]/.test(t)&&(s=RegExp.lastMatch),fy.hasOwnProperty(r)?-1===fy[r].indexOf(t)&&(e[t]=!0):hy.hasOwnProperty(r)&&hy[r].test(t)&&(e[t]=!0)
break}case"Function":{let{name:r}=i
if(n||(n=ch(r).vendor),"rect"===r){i.children.some(e=>"Operator"===e.type&&","===e.value)||(r="rect-backward")}e[r+"()"]=!0,i.children.forEach(t)
break}case"Dimension":{const{unit:t}=i
switch(/\\[09]/.test(t)&&(s=RegExp.lastMatch),t){case"rem":case"vw":case"vh":case"vmin":case"vmax":case"vm":e[t]=!0}break}}}),i=o?"!"+cy++:"!"+Object.keys(e).sort()+"|"+s+n
break
case"Raw":i="!"+t.value.value
break
default:i=ng(t.value)}n[s]=i}return e+i}function my(e,t,n){const r=uh(t.property)
if(py.hasOwnProperty(r.basename)){const s=py[r.basename]
for(const i of s){const s=dy(r.prefix+i,t,n),o=e.hasOwnProperty(s)?e[s]:null
if(o&&(!t.important||o.item.data.important))return o}}}function gy(e,t,n,r,s){const i=e.block.children
i.forEachRight(function(e,t){const{property:n}=e,o=dy(n,e,s),a=r[o]
if(a&&!uy.has(n))e.important&&!a.item.data.important?(r[o]={block:i,item:t},a.block.remove(a.item)):i.remove(t)
else{my(r,e,s)?i.remove(t):(e.fingerprint=o,r[o]={block:i,item:t})}}),i.isEmpty&&n.remove(t)}function yy(e){const t={},n=Object.create(null)
ig(e,{visit:"Rule",reverse:!0,enter(e,r,s){const i=this.block||this.stylesheet,o=(e.pseudoSignature||"")+"|"+e.prelude.children.first.id
let a,l
t.hasOwnProperty(i.id)?a=t[i.id]:(a={},t[i.id]=a),a.hasOwnProperty(o)?l=a[o]:(l={},a[o]=l),gy.call(this,e,r,s,l,n)}})}function by(e,t,n){const r=e.prelude.children,s=e.block.children,i=r.first.compareMarker,o={}
n.nextUntil(t.next,function(t,a){if("Rule"!==t.type)return ey.call(r,t)
if(e.pseudoSignature!==t.pseudoSignature)return!0
const l=t.prelude.children.head,c=t.block.children,u=l.data.compareMarker
if(u in o)return!0
if(r.head===r.tail&&r.first.id===l.data.id)return s.appendList(c),n.remove(a),void 0
if(Kg(s,c)){const e=l.data.id
return r.some((t,n)=>{const s=t.id
return e<s?(r.insert(l,n),!0):n.next?void 0:(r.insert(l),!0)}),n.remove(a),void 0}if(u===i)return!0
o[u]=!0})}function ky(e){return e.reduce((e,t)=>e+t.id.length+1,0)-1}function vy(e){let t=0
for(const n of e)t+=n.length
return t+e.length-1}function Sy(e,t,n){const r=null!==this.block&&this.block.avoidRulesMerge,s=e.prelude.children,i=e.block,o=Object.create(null)
let a=!0,l=!0
n.prevUntil(t.prev,function(c,u){const h=c.block,f=c.type
if("Rule"!==f){const e=ey.call(s,c)
return!e&&"Atrule"===f&&h&&ig(h,{visit:"Rule",enter(e){e.prelude.children.forEach(e=>{o[e.compareMarker]=!0})}}),e}if(e.pseudoSignature!==c.pseudoSignature)return!0
const p=c.prelude.children
if(l=!p.some(e=>e.compareMarker in o),!l&&!a)return!0
if(a&&Qg(p,s))return h.children.appendList(i.children),n.remove(t),!0
const d=function(e,t){const n={eq:[],ne1:[],ne2:[],ne2overrided:[]},r=Object.create(null),s=Object.create(null)
for(let e=t.head;e;e=e.next)s[e.data.id]=!0
for(let t=e.head;t;t=t.next){const e=t.data
e.fingerprint&&(r[e.fingerprint]=e.important),s[e.id]?(s[e.id]=!1,n.eq.push(e)):n.ne1.push(e)}for(let e=t.head;e;e=e.next){const t=e.data
s[t.id]&&((!Hg.call(r,t.fingerprint)||!r[t.fingerprint]&&t.important)&&n.ne2.push(t),n.ne2overrided.push(t))}return n}(i.children,h.children)
if(d.eq.length){if(!d.ne1.length&&!d.ne2.length)return l&&(Zg(s,p),n.remove(u)),!0
if(!r)if(d.ne1.length&&!d.ne2.length){const e=ky(s),t=vy(d.eq)
a&&e<t&&(Zg(p,s),i.children.fromArray(d.ne1))}else if(!d.ne1.length&&d.ne2.length){const e=ky(p),t=vy(d.eq)
l&&e<t&&(Zg(s,p),h.children.fromArray(d.ne2))}else{const r={type:"SelectorList",loc:null,children:Zg(p.copy(),s)},o=ky(r.children)+2
if(vy(d.eq)>=o){const s=n.createItem({type:"Rule",loc:null,prelude:r,block:{type:"Block",loc:null,children:(new Cu).fromArray(d.eq)},pseudoSignature:e.pseudoSignature})
return i.children.fromArray(d.ne1),h.children.fromArray(d.ne2overrided),a?n.insert(s,u):n.insert(s,t),!0}}}a&&(a=!p.some(e=>s.some(t=>t.compareMarker===e.compareMarker))),p.forEach(e=>{o[e.compareMarker]=!0})})}function wy(e,t){const n=qg(e,t)
t.logger("prepare",e),Xg(e,t),t.logger("mergeAtrule",e),function(e){ig(e,{visit:"Rule",enter:ty})}(e),t.logger("initialMergeRuleset",e),function(e){ig(e,{visit:"Rule",reverse:!0,enter:ny})}(e),t.logger("disjoinRuleset",e),ly(e,n),t.logger("restructShorthand",e),yy(e),t.logger("restructBlock",e),function(e){ig(e,{visit:"Rule",enter:by})}(e),t.logger("mergeRuleset",e),function(e){ig(e,{visit:"Rule",reverse:!0,enter:Sy})}(e),t.logger("restructRuleset",e)}function xy(e,t){const n=new Cu
let r,s=!1
return e.nextUntil(e.head,(e,i,o)=>{if("Comment"===e.type)return t&&"!"===e.value.charAt(0)?!(!s&&!r)||(o.remove(i),r=e,void 0):(o.remove(i),void 0)
"WhiteSpace"!==e.type&&(s=!0),n.insert(o.remove(i))}),{comment:r,stylesheet:{type:"StyleSheet",loc:null,children:n}}}function Cy(e,t,n,r){r.logger(`Compress block #${n}`,null,!0)
let s=1
return"StyleSheet"===e.type&&(e.firstAtrulesAllowed=t,e.id=s++),ig(e,{visit:"Atrule",enter(e){null!==e.block&&(e.block.id=s++)}}),r.logger("init",e),function(e,t){ig(e,{leave(e,n,r){Sg.hasOwnProperty(e.type)&&Sg[e.type].call(this,e,n,r,t)}})}(e,r),r.logger("clean",e),function(e){ig(e,{leave(e,t,n){Rg.hasOwnProperty(e.type)&&Rg[e.type].call(this,e,t,n)}})}(e),r.logger("replace",e),r.restructuring&&wy(e,r),e}function Ay(e){return"restructure"in e?e.restructure:!("restructuring"in e)||e.restructuring}function _y(e){const t=sm(e,!0),n=sm(e)
return t.length<n.length?t:n}const{lexer:Ty,tokenize:Ey,parse:Oy,generate:Py,walk:Ly,find:Ny,findLast:Dy,findAll:My,fromPlainObject:jy,toPlainObject:Iy}=hg({node:{String:{generate(e){this.token(5,_y(e.value))}},Url:{generate(e){const t=wm(e.value),n=_y(e.value)
this.token(7,t.length<=n.length+5?t:"url("+n+")")}}}})
var Ry=Object.freeze({__proto__:null,compress:function(e,t){e=e||{type:"StyleSheet",loc:null,children:new Cu}
const n={logger:"function"==typeof(t=t||{}).logger?t.logger:function(){},restructuring:Ay(t),forceMediaMerge:Boolean(t.forceMediaMerge),usage:!!t.usage&&mg(t.usage)},r=new Cu
let s,i,o,a=function(e){let t="comments"in e?e.comments:"exclamation"
return"boolean"==typeof t?t=!!t&&"exclamation":"exclamation"!==t&&"first-exclamation"!==t&&(t=!1),t}(t),l=!0,c=1
var u
t.clone&&(e=Jm(e)),"StyleSheet"===e.type?(s=e.children,e.children=r):(u=e,s=(new Cu).appendData({type:"Rule",loc:null,prelude:{type:"SelectorList",loc:null,children:(new Cu).appendData({type:"Selector",loc:null,children:(new Cu).appendData({type:"TypeSelector",loc:null,name:"x"})})},block:u}))
do{if(i=xy(s,Boolean(a)),Cy(i.stylesheet,l,c++,n),o=i.stylesheet.children,i.comment&&(r.isEmpty||r.insert(Cu.createItem({type:"Raw",value:"\n"})),r.insert(Cu.createItem(i.comment)),o.isEmpty||r.insert(Cu.createItem({type:"Raw",value:"\n"}))),l&&!o.isEmpty){const e=o.last;("Atrule"!==e.type||"import"!==e.name&&"charset"!==e.name)&&(l=!1)}"exclamation"!==a&&(a=!1),r.appendList(o)}while(!s.isEmpty)
return{ast:e}},find:Ny,findAll:My,findLast:Dy,fromPlainObject:jy,generate:Py,lexer:Ty,parse:Oy,specificity:Gg,toPlainObject:Iy,tokenize:Ey,walk:Ly})
const{parse:Fy,generate:zy,compress:Gy}=Ry
function By(e,t,n,r){return t.debug&&console.error(`## ${e} done in %d ms\n`,Date.now()-n),r}function Uy(e){return"function"!=typeof(e={...e}).logger&&e.debug&&(e.logger=function(e){let t
return function(n,r){let s=n
if(r&&(s=`[${((Date.now()-t)/1000).toFixed(3)}s] ${s}`),e>1&&r){let t=zy(r)
2===e&&t.length>256&&(t=t.substr(0,256)+"..."),s+=`\n  ${t}\n`}console.error(s),t=Date.now()}}(e.debug)),e}function qy(e,t,n){Array.isArray(n)||(n=[n]),n.forEach(n=>n(e,t))}function Wy(e,t,n){const r=(n=n||{}).filename||"<unknown>"
let s
const i=By("parsing",n,Date.now(),Fy(t,{context:e,filename:r,positions:Boolean(n.sourceMap)}))
n.beforeCompress&&By("beforeCompress",n,Date.now(),qy(i,n,n.beforeCompress))
const o=By("compress",n,Date.now(),Gy(i,Uy(n)))
return n.afterCompress&&By("afterCompress",n,Date.now(),qy(o,n,n.afterCompress)),s=n.sourceMap?By("generate(sourceMap: true)",n,Date.now(),(()=>{const e=zy(o.ast,{sourceMap:!0})
return e.map._file=r,e.map.setSourceContent(r,t),e})()):By("generate",n,Date.now(),{css:zy(o.ast),map:null}),s}function Vy(e,t){return Wy("stylesheet",e,t)}function $y(e,t){return Wy("declarationList",e,t)}const Yy=bc.skip,Xy=(e,t)=>{const n=[]
e.block.children.forEach(e=>{"Declaration"===e.type&&n.push({name:e.property,value:mc(e.value),important:!0===e.important})})
const r=[]
return bc(e.prelude,e=>{if("Selector"===e.type){const s=fc(e)
let i=!1
bc(s,(e,t,n)=>{"PseudoClassSelector"===e.type&&(i=!0,n.remove(t))}),r.push({specificity:Gg(e),dynamic:i||t,selector:mc(s),declarations:n})}}),r},Hy=(e,t)=>{const n=[],r=dc(e,{parseValue:!1,parseAtrulePrelude:!1})
return bc(r,e=>"Rule"===e.type?(n.push(...Xy(e,t||!1)),Yy):"Atrule"===e.type?(["keyframes","-webkit-keyframes","-o-keyframes","-moz-keyframes"].includes(e.name)||bc(e,e=>{if("Rule"===e.type)return n.push(...Xy(e,t||!0)),Yy}),Yy):void 0),n},Qy=(e,t,n)=>{const r={},s=new Map
for(const[e,n]of Object.entries(t.attributes))Nt.presentation.has(e)&&(r[e]={type:"static",inherited:!1,value:n},s.set(e,!1))
for(const{selector:i,declarations:o,dynamic:a}of e.rules)if(xt(t,i,n))for(const{name:e,value:t,important:n}of o){const i=r[e]
i&&"dynamic"===i.type||(a?r[e]={type:"dynamic",inherited:!1}:null!=i&&!0!==n&&!1!==s.get(e)||(r[e]={type:"static",inherited:!1,value:t},s.set(e,n)))}const i=null==t.attributes.style?[]:(e=>{const t=[],n=dc(e,{context:"declarationList",parseValue:!1})
return bc(n,e=>{"Declaration"===e.type&&t.push({name:e.property,value:mc(e.value),important:!0===e.important})}),t})(t.attributes.style)
for(const{name:e,value:t,important:n}of i){const i=r[e]
i&&"dynamic"===i.type||(null!=i&&!0!==n&&!1!==s.get(e)||(r[e]={type:"static",inherited:!1,value:t},s.set(e,n)))}return r},Ky=(e,t)=>{for(let n=0;n<4;n+=1){if(e[n]<t[n])return-1
if(e[n]>t[n])return 1}return 0},Zy=e=>{const t=[],n=new Map
return r(e,{element:{enter:(e,r)=>{if(n.set(e,r),"style"===e.name&&(null==e.attributes.type||""===e.attributes.type||"text/css"===e.attributes.type)){const n=null!=e.attributes.media&&"all"!==e.attributes.media
for(const r of e.children)"text"!==r.type&&"cdata"!==r.type||t.push(...Hy(r.value,n))}}}}),t.sort((e,t)=>Ky(e.specificity,t.specificity)),{rules:t,parents:n}},Jy=(e,t)=>{const{parents:n}=e,r=Qy(e,t,n)
let s=n.get(t)
for(;null!=s&&"root"!==s.type;){const t=Qy(e,s,n)
for(const[e,n]of Object.entries(t))null==r[e]&&Ft.has(e)&&!zt.has(e)&&(r[e]={...n,inherited:!0})
s=n.get(s)}return r},eb=(e,t,n=null,r=!1)=>{const s=ke("string"==typeof e?e:mc(e.data))
for(const e of s){if(e.some((s,i)=>{if(r){if(i===e.length-1)return!1
if(!pe(e[i+1]))return!1}return"attribute"===s.type&&s.name===t&&(null==n||s.value===n)}))return!0}return!1}
function tb(e,t,n,r){t&&(t.safe&&t.safe.forEach(t=>{r.has(t)||delete e.attributes[t]}),n.removeUnsafe&&t.unsafe&&t.unsafe.forEach(t=>{r.has(t)||delete e.attributes[t]}))}var nb=Object.freeze({__proto__:null,description:"removes deprecated attributes",fn:function(e,t){const n=function(e){const t=new Set
return e.rules.forEach(e=>{ke(e.selector).forEach(e=>{e.forEach(e=>{"attribute"===e.type&&t.add(e.name)})})}),t}(Zy(e))
return{element:{enter:e=>{const r=jt[e.name]
r&&(r.attrsGroups.has("core")&&e.attributes["xml:lang"]&&!n.has("xml:lang")&&e.attributes.lang&&delete e.attributes["xml:lang"],r.attrsGroups.forEach(r=>{tb(e,Mt[r],t,n)}),tb(e,r.deprecated,t,n))}}}},name:"removeDeprecatedAttrs"})
var rb=Object.freeze({__proto__:null,description:"removes <metadata>",fn:()=>({element:{enter:(e,t)=>{"metadata"===e.name&&Ct(e,t)}}}),name:"removeMetadata"})
var sb=Object.freeze({__proto__:null,description:"removes editors namespaces, elements and attributes",fn:(e,t)=>{let n=[...It]
Array.isArray(t.additionalNamespaces)&&(n=[...It,...t.additionalNamespaces])
const r=[]
return{element:{enter:(e,t)=>{if("svg"===e.name)for(const[t,s]of Object.entries(e.attributes))t.startsWith("xmlns:")&&n.includes(s)&&(r.push(t.slice(6)),delete e.attributes[t])
for(const t of Object.keys(e.attributes))if(t.includes(":")){const[n]=t.split(":")
r.includes(n)&&delete e.attributes[t]}if(e.name.includes(":")){const[n]=e.name.split(":")
r.includes(n)&&Ct(e,t)}}}}},name:"removeEditorsNSData"})
const ib=/(\S)\r?\n(\S)/g,ob=/\r?\n/g,ab=/\s{2,}/g
var lb=Object.freeze({__proto__:null,description:"cleanups attributes from newlines, trailing and repeating spaces",fn:(e,t)=>{const{newlines:n=!0,trim:r=!0,spaces:s=!0}=t
return{element:{enter:e=>{for(const t of Object.keys(e.attributes))n&&(e.attributes[t]=e.attributes[t].replace(ib,(e,t,n)=>t+" "+n),e.attributes[t]=e.attributes[t].replace(ob,"")),r&&(e.attributes[t]=e.attributes[t].trim()),s&&(e.attributes[t]=e.attributes[t].replace(ab," "))}}}},name:"cleanupAttrs"})
var cb=Object.freeze({__proto__:null,description:"merge multiple style elements into one",fn:()=>{let e=null,t="",r="text"
return{element:{enter:(s,i)=>{if("foreignObject"===s.name)return n
if("style"!==s.name)return
if(null!=s.attributes.type&&""!==s.attributes.type&&"text/css"!==s.attributes.type)return
let o=""
for(const e of s.children)"text"===e.type&&(o+=e.value),"cdata"===e.type&&(r="cdata",o+=e.value)
if(0===o.trim().length)return Ct(s,i),void 0
if(null==s.attributes.media?t+=o:(t+=`@media ${s.attributes.media}{${o}}`,delete s.attributes.media),null==e)e=s
else{Ct(s,i)
const n={type:r,value:t}
e.children=[n]}}}}},name:"mergeStyles"})
const ub=[...qt.functional,...qt.treeStructural]
var hb=Object.freeze({__proto__:null,description:"inline styles (additional options)",fn:(e,t)=>{const{onlyMatchedOnce:r=!0,removeMatchedSelectors:s=!0,useMqs:i=["","screen"],usePseudos:o=[""]}=t,a=[],l=[]
return{element:{enter:(e,t)=>{if("foreignObject"===e.name)return n
if("style"!==e.name||0===e.children.length)return
if(null!=e.attributes.type&&""!==e.attributes.type&&"text/css"!==e.attributes.type)return
const r=e.children.filter(e=>"text"===e.type||"cdata"===e.type).map(e=>e.value).join("")
let s=null
try{s=dc(r,{parseValue:!1,parseCustomProperty:!1})}catch{return}"StyleSheet"===s.type&&a.push({node:e,parentNode:t,cssAst:s}),bc(s,{visit:"Rule",enter(e){const t=this.atrule
let n=""
null!=t&&(n=t.name,null!=t.prelude&&(n+=` ${mc(t.prelude)}`)),i.includes(n)&&"SelectorList"===e.prelude.type&&e.prelude.children.forEach((t,n)=>{if("Selector"===t.type){const r=[]
t.children.forEach((e,t,n)=>{("PseudoClassSelector"===e.type||"PseudoElementSelector"===e.type)&&!ub.includes(e.name)&&r.push({item:t,list:n})})
const s=mc({type:"Selector",children:(new Wn).fromArray(r.map(e=>e.item.data))})
if(o.includes(s))for(const e of r)e.list.remove(e.item)
l.push({node:t,rule:e,item:n})}})}})}},root:{exit:()=>{if(0===a.length)return
const t=l.slice().sort((e,t)=>{const n=Gg(e.item.data),r=Gg(t.item.data)
return Ky(n,r)}).reverse()
for(const n of t){const t=mc(n.item.data),i=[]
try{for(const n of St(e,t))"element"===n.type&&i.push(n)}catch{continue}if(0!==i.length&&!(r&&i.length>1)){for(const e of i){const t=dc(e.attributes.style??"",{context:"declarationList",parseValue:!1})
if("DeclarationList"!==t.type)continue
const r=new Map
let s
bc(t,{visit:"Declaration",enter(e,t){null==s&&(s=t),r.set(e.property.toLowerCase(),t)}}),bc(n.rule,{visit:"Declaration",enter(n){const i=n.property
Nt.presentation.has(i)&&!l.some(e=>eb(e.item,i))&&delete e.attributes[i]
const o=r.get(i),a=t.children.createItem(n)
null==o?t.children.insert(a,s):!0!==o.data.important&&!0===n.important&&(t.children.replace(o,a),r.set(i,a))}})
const i=mc(t)
0!==i.length&&(e.attributes.style=i)}s&&0!==i.length&&"SelectorList"===n.rule.prelude.type&&n.rule.prelude.children.remove(n.item),n.matchedElements=i}}if(s){for(const e of t)if(null!=e.matchedElements&&!(r&&e.matchedElements.length>1))for(const t of e.matchedElements){const n=new Set(null==t.attributes.class?null:t.attributes.class.split(" "))
for(const t of e.node.children)"ClassSelector"!==t.type||l.some(e=>eb(e.item,"class",t.name,!0))||n.delete(t.name)
0===n.size?delete t.attributes.class:t.attributes.class=Array.from(n).join(" ")
const r=e.node.children.first
"IdSelector"!==r?.type||t.attributes.id!==r.name||l.some(e=>eb(e.item,"id",r.name,!0))||delete t.attributes.id}for(const e of a)if(bc(e.cssAst,{visit:"Rule",enter:function(e,t,n){"Rule"===e.type&&"SelectorList"===e.prelude.type&&e.prelude.children.isEmpty&&n.remove(t)}}),e.cssAst.children.isEmpty)Ct(e.node,e.parentNode)
else{const t=e.node.children[0]
"text"!==t.type&&"cdata"!==t.type||(t.value=mc(e.cssAst))}}}}}},name:"inlineStyles"})
const fb=/\burl\((["'])?#(.+?)\1\)/g,pb=/^#(.+?)$/,db=/(\w+)\.[a-zA-Z]/,mb=(e,t)=>{let n,r,s=""
return e.forEach((e,i)=>{n=" ",0==i&&(n=""),t.noSpaceAfterFlags
const o=t.leadingZero?gb(e):e.toString()
t.negativeExtraSpace&&""!=n&&(e<0||"."===o.charAt(0)&&r%1!=0)&&(n=""),r=e,s+=n+o}),s},gb=e=>{const t=e.toString()
return 0<e&&e<1&&t.startsWith("0")?t.slice(1):-1<e&&e<0&&"0"===t[1]?t[0]+t.slice(2):t},yb=e=>{if("script"===e.name&&0!==e.children.length)return!0
if("a"===e.name){if(Object.entries(e.attributes).some(([e,t])=>("href"===e||e.endsWith(":href"))&&null!=t&&t.trimStart().startsWith("javascript:")))return!0}return[...Nt.animationEvent,...Nt.documentEvent,...Nt.documentElementEvent,...Nt.globalEvent,...Nt.graphicalEvent].some(t=>null!=e.attributes[t])},bb=e=>new RegExp(fb).test(e),kb=(e,t)=>{const n=[]
if(Rt.has(e)){const e=t.matchAll(fb)
for(const t of e)n.push(t[2])}if("href"===e||e.endsWith(":href")){const e=pb.exec(t)
null!=e&&n.push(e[1])}if("begin"===e){const e=db.exec(t)
null!=e&&n.push(e[1])}return n.map(e=>decodeURI(e))},vb=(e,t)=>{const n=10**t
return Math.round(e*n)/n}
var Sb=Object.freeze({__proto__:null,description:"minifies styles and removes unused styles",fn:(e,{usage:t,...n})=>{const r=new Map,s=[],i=new Set,o=new Set,a=new Set
let l=!0,c=!0,u=!0,h=!1
"boolean"==typeof t?(l=t,c=t,u=t):t&&(l=null==t.tags||t.tags,c=null==t.ids||t.ids,u=null==t.classes||t.classes,h=null!=t.force&&t.force)
let f=!1
return{element:{enter:(e,t)=>{if(yb(e)&&(f=!0),i.add(e.name),null!=e.attributes.id&&o.add(e.attributes.id),null!=e.attributes.class)for(const t of e.attributes.class.split(/\s+/))a.add(t)
"style"===e.name&&0!==e.children.length?r.set(e,t):null!=e.attributes.style&&s.push(e)}},root:{exit:()=>{const e={}
f&&!h||(l&&(e.tags=Array.from(i)),c&&(e.ids=Array.from(o)),u&&(e.classes=Array.from(a)))
for(const[t,s]of r.entries())if("text"===t.children[0].type||"cdata"===t.children[0].type){const r=t.children[0].value,i=Vy(r,{...n,usage:e}).css
if(0===i.length){Ct(t,s)
continue}r.indexOf(">")>=0||r.indexOf("<")>=0?(t.children[0].type="cdata",t.children[0].value=i):(t.children[0].type="text",t.children[0].value=i)}for(const e of s){const t=e.attributes.style
e.attributes.style=$y(t,{...n}).css}}}}},name:"minifyStyles"})
const wb=["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],xb=wb.length-1,Cb=e=>{if(null==e)return[0]
e[e.length-1]+=1
for(let t=e.length-1;t>0;t--)e[t]>xb&&(e[t]=0,void 0!==e[t-1]&&e[t-1]++)
return e[0]>xb&&(e[0]=0,e.unshift(0)),e},Ab=e=>e.map(e=>wb[e]).join("")
var _b=Object.freeze({__proto__:null,description:"removes unused IDs and minifies used",fn:(e,t)=>{const{remove:r=!0,minify:s=!0,preserve:i=[],preservePrefixes:o=[],force:a=!1}=t,l=new Set(Array.isArray(i)?i:i?[i]:[]),c=Array.isArray(o)?o:o?[o]:[],u=new Map,h=new Map
let f=!1
return{element:{enter:e=>{if(!a){if("style"===e.name&&0!==e.children.length||yb(e))return f=!0,void 0
if("svg"===e.name){let t=!0
for(const n of e.children)if("element"!==n.type||"defs"!==n.name){t=!1
break}if(t)return n}}for(const[t,n]of Object.entries(e.attributes))if("id"===t){const t=n
u.has(t)?delete e.attributes.id:u.set(t,e)}else{const r=kb(t,n)
for(const n of r){let r=h.get(n)
null==r&&(r=[],h.set(n,r)),r.push({element:e,name:t})}}}},root:{exit:()=>{if(f)return
const e=e=>l.has(e)||((e,t)=>{for(const n of t)if(e.startsWith(n))return!0
return!1})(e,c)
let t=null
for(const[n,r]of h){const i=u.get(n)
if(null!=i){if(s&&!1===e(n)){let s
do{t=Cb(t),s=Ab(t)}while(e(s)||h.has(s)&&null==u.get(s))
i.attributes.id=s
for(const{element:e,name:t}of r){const r=e.attributes[t]
r.includes("#")?e.attributes[t]=r.replace(`#${encodeURI(n)}`,`#${s}`).replace(`#${n}`,`#${s}`):e.attributes[t]=r.replace(`${n}.`,`${s}.`)}}u.delete(n)}}if(r)for(const[t,n]of u)!1===e(t)&&delete n.attributes.id}}}},name:"cleanupIds"})
const Tb=(e,t)=>{for(const n of e.children)"element"===n.type&&(null!=n.attributes.id||"style"===n.name?t.push(n):Tb(n,t))}
var Eb=Object.freeze({__proto__:null,description:"removes elements in <defs> without id",fn:()=>({element:{enter:(e,t)=>{if("defs"===e.name||Ot.nonRendering.has(e.name)&&null==e.attributes.id){const n=[]
Tb(e,n),0===n.length&&Ct(e,t),e.children=n}}}}),name:"removeUselessDefs"})
const Ob=/^([-+]?\d*\.?\d+([eE][-+]?\d+)?)(px|pt|pc|mm|cm|m|in|ft|em|ex|%)?$/,Pb={cm:96/2.54,mm:96/25.4,in:96,pt:4/3,pc:16,px:1}
var Lb=Object.freeze({__proto__:null,description:'rounds numeric values to the fixed precision, removes default "px" units',fn:(e,t)=>{const{floatPrecision:n=3,leadingZero:r=!0,defaultPx:s=!0,convertToPx:i=!0}=t
return{element:{enter:e=>{if(null!=e.attributes.viewBox){const t=e.attributes.viewBox.trim().split(/(?:\s,?|,)\s*/g)
e.attributes.viewBox=t.map(e=>{const t=Number(e)
return Number.isNaN(t)?e:Number(t.toFixed(n))}).join(" ")}for(const[t,o]of Object.entries(e.attributes)){if("version"===t)continue
const a=Ob.exec(o)
if(a){let o=Number(Number(a[1]).toFixed(n))
let l,c=a[3]||""
if(i&&""!==c&&c in Pb){const e=Number((Pb[c]*Number(a[1])).toFixed(n))
e.toString().length<a[0].length&&(o=e,c="px")}l=r?gb(o):o.toString(),s&&"px"===c&&(c=""),e.attributes[t]=l+c}}}}}},name:"cleanupNumericValues"})
const Nb="([+-]?(?:\\d*\\.\\d+|\\d+\\.?)%?)",Db="(?:\\s*,\\s*|\\s+)",Mb=new RegExp("^rgb\\(\\s*"+Nb+Db+Nb+Db+Nb+"\\s*\\)$"),jb=/^#(([a-fA-F0-9])\2){3}$/,Ib=([e,t,n])=>"#"+((256+e<<8|t)<<8|n).toString(16).slice(1).toUpperCase()
var Rb=Object.freeze({__proto__:null,description:"converts colors: rgb() to #rrggbb and #rrggbb to #rgb",fn:(e,t)=>{const{currentColor:n=!1,names2hex:r=!0,rgb2hex:s=!0,convertCase:i="lower",shorthex:o=!0,shortname:a=!0}=t
let l=0
return{element:{enter:e=>{"mask"===e.name&&l++
for(const[t,c]of Object.entries(e.attributes))if(Ut.has(t)){let u=c
if(n&&0===l){let e
e="string"==typeof n?u===n:n instanceof RegExp?null!=n.exec(u):"none"!==u,e&&(u="currentColor")}if(r){const e=u.toLowerCase()
null!=Gt[e]&&(u=Gt[e])}if(s){const e=u.match(Mb)
if(null!=e){const t=e.slice(1,4).map(e=>{let t
return t=e.indexOf("%")>-1?Math.round(2.55*parseFloat(e)):Number(e),Math.max(0,Math.min(t,255))})
u=Ib(t)}}if(i&&!bb(u)&&"currentColor"!==u&&("lower"===i?u=u.toLowerCase():"upper"===i&&(u=u.toUpperCase())),o){const e=jb.exec(u)
null!=e&&(u="#"+e[0][1]+e[0][3]+e[0][5])}if(a){const e=u.toLowerCase()
null!=Bt[e]&&(u=Bt[e])}e.attributes[t]=u}},exit:e=>{"mask"===e.name&&l--}}}},name:"convertColors"})
const Fb=new Map,zb=new Map,Gb=new Map
for(const[e,t]of Object.entries(jt)){const n=new Set
if(t.content)for(const e of t.content)n.add(e)
if(t.contentGroups)for(const e of t.contentGroups){const t=Ot[e]
if(t)for(const e of t)n.add(e)}const r=new Set
if(t.attrs)for(const e of t.attrs)r.add(e)
const s=new Map
if(t.defaults)for(const[e,n]of Object.entries(t.defaults))s.set(e,n)
for(const e of t.attrsGroups){const t=Nt[e]
if(t)for(const e of t)r.add(e)
const n=Dt[e]
if(n)for(const[e,t]of Object.entries(n))s.set(e,t)}Fb.set(e,n),zb.set(e,r),Gb.set(e,s)}var Bb=Object.freeze({__proto__:null,description:"removes unknown elements content and attributes, removes attrs with default values",fn:(e,t)=>{const{unknownContent:r=!0,unknownAttrs:s=!0,defaultAttrs:i=!0,defaultMarkupDeclarations:o=!0,uselessOverrides:a=!0,keepDataAttrs:l=!0,keepAriaAttrs:c=!0,keepRoleAttr:u=!1}=t,h=Zy(e)
return{instruction:{enter:e=>{o&&(e.value=e.value.replace(/\s*standalone\s*=\s*(["'])no\1/,""))}},element:{enter:(e,t)=>{if(e.name.includes(":"))return
if("foreignObject"===e.name)return n
if(r&&"element"===t.type){const n=Fb.get(t.name)
if(null==n||0===n.size){if(null==Fb.get(e.name))return Ct(e,t),void 0}else if(!1===n.has(e.name))return Ct(e,t),void 0}const o=zb.get(e.name),f=Gb.get(e.name),p="element"===t.type?Jy(h,t):null
for(const[t,n]of Object.entries(e.attributes))if(!(l&&t.startsWith("data-")||c&&t.startsWith("aria-")||u&&"role"===t||"xmlns"===t)){if(t.includes(":")){const[e]=t.split(":")
if("xml"!==e&&"xlink"!==e)continue}if(s&&o&&!1===o.has(t)&&delete e.attributes[t],i&&null==e.attributes.id&&f&&f.get(t)===n&&null==p?.[t]&&delete e.attributes[t],a&&null==e.attributes.id){const r=p?.[t]
!1===zt.has(t)&&null!=r&&"static"===r.type&&r.value===n&&delete e.attributes[t]}}}}}},name:"removeUnknownsAndDefaults"})
var Ub=Object.freeze({__proto__:null,description:"removes non-inheritable group's presentational attributes",fn:()=>({element:{enter:e=>{if("g"===e.name)for(const t of Object.keys(e.attributes))!Nt.presentation.has(t)||Ft.has(t)||zt.has(t)||delete e.attributes[t]}}}),name:"removeNonInheritableGroupAttrs"})
var qb=Object.freeze({__proto__:null,description:"removes useless stroke and fill attributes",fn:(e,t)=>{const{stroke:s=!0,fill:i=!0,removeNone:o=!1}=t
let a=!1
if(r(e,{element:{enter:e=>{("style"===e.name||yb(e))&&(a=!0)}}}),a)return null
const l=Zy(e)
return{element:{enter:(e,t)=>{if(null!=e.attributes.id)return n
if(!Ot.shape.has(e.name))return
const r=Jy(l,e),a=r.stroke,c=r["stroke-opacity"],u=r["stroke-width"],h=r["marker-end"],f=r.fill,p=r["fill-opacity"],d="element"===t.type?Jy(l,t):null,m=null==d?null:d.stroke
if(s&&(null==a||"static"===a.type&&"none"==a.value||null!=c&&"static"===c.type&&"0"===c.value||null!=u&&"static"===u.type&&"0"===u.value)&&(null!=u&&"static"===u.type&&"0"===u.value||null==h)){for(const t of Object.keys(e.attributes))t.startsWith("stroke")&&delete e.attributes[t]
null!=m&&"static"===m.type&&"none"!==m.value&&(e.attributes.stroke="none")}if(i&&(null!=f&&"static"===f.type&&"none"===f.value||null!=p&&"static"===p.type&&"0"===p.value)){for(const t of Object.keys(e.attributes))t.startsWith("fill-")&&delete e.attributes[t];(null==f||"static"===f.type&&"none"!==f.value)&&(e.attributes.fill="none")}o&&(null!=a&&"none"!==e.attributes.stroke||(null==f||"static"!==f.type||"none"!==f.value)&&"none"!==e.attributes.fill||Ct(e,t))}}}},name:"removeUselessStrokeAndFill"})
const Wb=/^new\s0\s0\s([-+]?\d*\.?\d+([eE][-+]?\d+)?)\s([-+]?\d*\.?\d+([eE][-+]?\d+)?)$/,Vb=(e,t,n,r)=>{const s=Wb.exec(e)
return null!=s&&n===s[1]&&r===s[3]?"svg"===t?void 0:"new":e}
var $b=Object.freeze({__proto__:null,description:"remove or cleanup enable-background attribute when possible",fn:e=>{let t=!1
return r(e,{element:{enter:e=>{"filter"===e.name&&(t=!0)}}}),{element:{enter:e=>{let n=null,r=null
if(null!=e.attributes.style&&(n=dc(e.attributes.style,{context:"declarationList"}),"DeclarationList"===n.type)){const e=[]
bc(n,(t,n)=>{"Declaration"===t.type&&"enable-background"===t.property&&(e.push(n),r=n)})
for(let t=0;t<e.length-1;t++)n.children.remove(e[t])}if(!t)return delete e.attributes["enable-background"],"DeclarationList"===n?.type&&(r&&n.children.remove(r),n.children.isEmpty?delete e.attributes.style:e.attributes.style=mc(n)),void 0
const s=null!=e.attributes.width&&null!=e.attributes.height
if(("svg"===e.name||"mask"===e.name||"pattern"===e.name)&&s){const t=e.attributes["enable-background"],s=Vb(t,e.name,e.attributes.width,e.attributes.height)
if(s?e.attributes["enable-background"]=s:delete e.attributes["enable-background"],"DeclarationList"===n?.type&&r){const t=mc(r.data.value),s=Vb(t,e.name,e.attributes.width,e.attributes.height)
s?r.data.value={type:"Raw",value:s}:n.children.remove(r)}}"DeclarationList"===n?.type&&(n.children.isEmpty?delete e.attributes.style:e.attributes.style=mc(n))}}}},name:"cleanupEnableBackground"})
const Yb={M:2,m:2,Z:0,z:0,L:2,l:2,H:1,h:1,V:1,v:1,C:6,c:6,S:4,s:4,Q:4,q:4,T:2,t:2,A:7,a:7},Xb=e=>e in Yb,Hb=e=>" "===e||"\t"===e||"\r"===e||"\n"===e,Qb=e=>{const t=e.codePointAt(0)
return null!=t&&(48<=t&&t<=57)},Kb=(e,t)=>{let n=t,r="",s="none"
for(;n<e.length;n+=1){const t=e[n]
if("+"===t||"-"===t){if("none"===s){s="sign",r+=t
continue}if("e"===s){s="exponent_sign",r+=t
continue}}if(Qb(t)){if("none"===s||"sign"===s||"whole"===s){s="whole",r+=t
continue}if("decimal_point"===s||"decimal"===s){s="decimal",r+=t
continue}if("e"===s||"exponent_sign"===s||"exponent"===s){s="exponent",r+=t
continue}}if("."!==t||"none"!==s&&"sign"!==s&&"whole"!==s){if("E"!==t&&"e"!=t||"whole"!==s&&"decimal_point"!==s&&"decimal"!==s)break
s="e",r+=t}else s="decimal_point",r+=t}const i=Number.parseFloat(r)
return Number.isNaN(i)?[t,null]:[n-1,i]},Zb=e=>{const t=[]
let n=null,r=[],s=0,i=!1,o=!1
for(let a=0;a<e.length;a+=1){const l=e.charAt(a)
if(Hb(l))continue
if(i&&","===l){if(o)break
o=!0
continue}if(Xb(l)){if(o)return t
if(null==n){if("M"!==l&&"m"!==l)return t}else if(0!==r.length)return t
n=l,r=[],s=Yb[n],i=!1,0===s&&t.push({command:n,args:r})
continue}if(null==n)return t
let c=a,u=null
if("A"===n||"a"===n){const t=r.length
0!==t&&1!==t||"+"!==l&&"-"!==l&&([c,u]=Kb(e,a)),2!==t&&5!==t&&6!==t||([c,u]=Kb(e,a)),3!==t&&4!==t||("0"===l&&(u=0),"1"===l&&(u=1))}else[c,u]=Kb(e,a)
if(null==u)return t
r.push(u),i=!0,o=!1,a=c,r.length===s&&(t.push({command:n,args:r}),"M"===n&&(n="L"),"m"===n&&(n="l"),r=[])}return t},Jb=(e,t)=>(null!=t&&(e=vb(e,t)),{roundedStr:gb(e),rounded:e}),ek=(e,t,n,r)=>{let s,i=""
for(let o=0;o<t.length;o++){const{roundedStr:a,rounded:l}=Jb(t[o],n)
!r||"A"!==e&&"a"!==e||o%7!=4&&o%7!=5?0===o||l<0?i+=a:Number.isInteger(s)||Qb(a[0])?i+=` ${a}`:i+=a:i+=a,s=l}return i},tk=({pathData:e,precision:t,disableSpaceAfterFlags:n})=>{if(1===e.length){const{command:r,args:s}=e[0]
return r+ek(r,s,t,n)}let r="",s={...e[0]}
"L"===e[1].command?s.command="M":"l"===e[1].command&&(s.command="m")
for(let i=1;i<e.length;i++){const{command:o,args:a}=e[i]
s.command===o&&"M"!==s.command&&"m"!==s.command||"M"===s.command&&"L"===o||"m"===s.command&&"l"===o?(s.args=[...s.args,...a],i===e.length-1&&(r+=s.command+ek(s.command,s.args,t,n))):(r+=s.command+ek(s.command,s.args,t,n),i===e.length-1?r+=o+ek(o,a,t,n):s={command:o,args:a})}return r},nk=Ot.nonRendering
var rk=Object.freeze({__proto__:null,description:"removes hidden elements (zero sized, with absent attributes)",fn:(e,t)=>{const{isHidden:s=!0,displayNone:i=!0,opacity0:o=!0,circleR0:a=!0,ellipseRX0:l=!0,ellipseRY0:c=!0,rectWidth0:u=!0,rectHeight0:h=!0,patternWidth0:f=!0,patternHeight0:p=!0,imageWidth0:d=!0,imageHeight0:m=!0,pathEmptyD:g=!0,polylineEmptyPoints:y=!0,polygonEmptyPoints:b=!0}=t,k=Zy(e),v=new Map,S=new Set,w=new Map,x=new Set,C=new Map
let A=!1
function _(e){if(x.has(e.attributes.id))return!1
for(const t of e.children)if("element"===t.type&&!_(t))return!1
return!0}function T(e,t){"element"===e.type&&null!=e.attributes.id&&"element"===t.type&&"defs"===t.name&&S.add(e.attributes.id),Ct(e,t)}return r(e,{element:{enter:(e,t)=>{if(nk.has(e.name))return v.set(e,t),n
const r=Jy(k,e)
if(o&&r.opacity&&"static"===r.opacity.type&&"0"===r.opacity.value){if("path"===e.name)return v.set(e,t),n
T(e,t)}}}}),{element:{enter:(e,t)=>{if("style"===e.name&&0!==e.children.length||yb(e))return A=!0,void 0
if("defs"===e.name&&w.set(e,t),"use"===e.name)for(const n of Object.keys(e.attributes)){if("href"!==n&&!n.endsWith(":href"))continue
const r=e.attributes[n].slice(1)
let s=C.get(r)
s||(s=[],C.set(r,s)),s.push({node:e,parentNode:t})}const n=Jy(k,e)
if(s&&n.visibility&&"static"===n.visibility.type&&"hidden"===n.visibility.value&&null==wt(e,"[visibility=visible]"))return T(e,t),void 0
if(i&&n.display&&"static"===n.display.type&&"none"===n.display.value&&"marker"!==e.name)return T(e,t),void 0
if(a&&"circle"===e.name&&0===e.children.length&&"0"===e.attributes.r)return T(e,t),void 0
if(l&&"ellipse"===e.name&&0===e.children.length&&"0"===e.attributes.rx)return T(e,t),void 0
if(c&&"ellipse"===e.name&&0===e.children.length&&"0"===e.attributes.ry)return T(e,t),void 0
if(u&&"rect"===e.name&&0===e.children.length&&"0"===e.attributes.width)return T(e,t),void 0
if(h&&u&&"rect"===e.name&&0===e.children.length&&"0"===e.attributes.height)return T(e,t),void 0
if(f&&"pattern"===e.name&&"0"===e.attributes.width)return T(e,t),void 0
if(p&&"pattern"===e.name&&"0"===e.attributes.height)return T(e,t),void 0
if(d&&"image"===e.name&&"0"===e.attributes.width)return T(e,t),void 0
if(m&&"image"===e.name&&"0"===e.attributes.height)return T(e,t),void 0
if(g&&"path"===e.name){if(null==e.attributes.d)return T(e,t),void 0
const r=Zb(e.attributes.d)
if(0===r.length)return T(e,t),void 0
if(1===r.length&&null==n["marker-start"]&&null==n["marker-end"])return T(e,t),void 0}if(y&&"polyline"===e.name&&null==e.attributes.points)return T(e,t),void 0
if(b&&"polygon"===e.name&&null==e.attributes.points)return T(e,t),void 0
for(const[t,n]of Object.entries(e.attributes)){const e=kb(t,n)
for(const t of e)x.add(t)}}},root:{exit:()=>{for(const e of S){const t=C.get(e)
if(t)for(const{node:e,parentNode:n}of t)Ct(e,n)}if(!A)for(const[e,t]of v.entries())_(e)&&Ct(e,t)
for(const[e,t]of w.entries())0===e.children.length&&Ct(e,t)}}}},name:"removeHiddenElems"})
var sk=Object.freeze({__proto__:null,description:"removes empty <text> elements",fn:(e,t)=>{const{text:n=!0,tspan:r=!0,tref:s=!0}=t
return{element:{enter:(e,t)=>{n&&"text"===e.name&&0===e.children.length&&Ct(e,t),r&&"tspan"===e.name&&0===e.children.length&&Ct(e,t),s&&"tref"===e.name&&null==e.attributes["xlink:href"]&&Ct(e,t)}}}},name:"removeEmptyText"})
const ik=/[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g
var ok=Object.freeze({__proto__:null,description:"converts basic shapes to more compact path form",fn:(e,t)=>{const{convertArcs:n=!1,floatPrecision:r}=t
return{element:{enter:(e,t)=>{if("rect"===e.name&&null!=e.attributes.width&&null!=e.attributes.height&&null==e.attributes.rx&&null==e.attributes.ry){const t=Number(e.attributes.x||"0"),n=Number(e.attributes.y||"0"),s=Number(e.attributes.width),i=Number(e.attributes.height)
if(Number.isNaN(t-n+s-i))return
const o=[{command:"M",args:[t,n]},{command:"H",args:[t+s]},{command:"V",args:[n+i]},{command:"H",args:[t]},{command:"z",args:[]}]
e.name="path",e.attributes.d=tk({pathData:o,precision:r}),delete e.attributes.x,delete e.attributes.y,delete e.attributes.width,delete e.attributes.height}if("line"===e.name){const t=Number(e.attributes.x1||"0"),n=Number(e.attributes.y1||"0"),s=Number(e.attributes.x2||"0"),i=Number(e.attributes.y2||"0")
if(Number.isNaN(t-n+s-i))return
const o=[{command:"M",args:[t,n]},{command:"L",args:[s,i]}]
e.name="path",e.attributes.d=tk({pathData:o,precision:r}),delete e.attributes.x1,delete e.attributes.y1,delete e.attributes.x2,delete e.attributes.y2}if(("polyline"===e.name||"polygon"===e.name)&&null!=e.attributes.points){const n=(e.attributes.points.match(ik)||[]).map(Number)
if(n.length<4)return Ct(e,t),void 0
const s=[]
for(let e=0;e<n.length;e+=2)s.push({command:0===e?"M":"L",args:n.slice(e,e+2)})
"polygon"===e.name&&s.push({command:"z",args:[]}),e.name="path",e.attributes.d=tk({pathData:s,precision:r}),delete e.attributes.points}if("circle"===e.name&&n){const t=Number(e.attributes.cx||"0"),n=Number(e.attributes.cy||"0"),s=Number(e.attributes.r||"0")
if(Number.isNaN(t-n+s))return
const i=[{command:"M",args:[t,n-s]},{command:"A",args:[s,s,0,1,0,t,n+s]},{command:"A",args:[s,s,0,1,0,t,n-s]},{command:"z",args:[]}]
e.name="path",e.attributes.d=tk({pathData:i,precision:r}),delete e.attributes.cx,delete e.attributes.cy,delete e.attributes.r}if("ellipse"===e.name&&n){const t=Number(e.attributes.cx||"0"),n=Number(e.attributes.cy||"0"),s=Number(e.attributes.rx||"0"),i=Number(e.attributes.ry||"0")
if(Number.isNaN(t-n+s-i))return
const o=[{command:"M",args:[t,n-i]},{command:"A",args:[s,i,0,1,0,t,n+i]},{command:"A",args:[s,i,0,1,0,t,n-i]},{command:"z",args:[]}]
e.name="path",e.attributes.d=tk({pathData:o,precision:r}),delete e.attributes.cx,delete e.attributes.cy,delete e.attributes.rx,delete e.attributes.ry}}}}},name:"convertShapeToPath"})
var ak=Object.freeze({__proto__:null,description:"converts non-eccentric <ellipse>s to <circle>s",fn:()=>({element:{enter:e=>{if("ellipse"===e.name){const t=e.attributes.rx||"0",n=e.attributes.ry||"0"
if(t===n||"auto"===t||"auto"===n){e.name="circle"
const r="auto"===t?n:t
delete e.attributes.rx,delete e.attributes.ry,e.attributes.r=r}}}}}),name:"convertEllipseToCircle"})
var lk=Object.freeze({__proto__:null,description:"Move common attributes of group children to the group",fn:e=>{let t=!1
return r(e,{element:{enter:e=>{"style"===e.name&&(t=!0)}}}),{element:{exit:e=>{if("g"!==e.name||e.children.length<=1)return
if(t)return
const n=new Map
let r=!0,s=!0
for(const t of e.children)if("element"===t.type)if(Lt.has(t.name)||(s=!1),r){r=!1
for(const[e,r]of Object.entries(t.attributes))Ft.has(e)&&n.set(e,r)}else for(const[e,r]of n)t.attributes[e]!==r&&n.delete(e)
null==e.attributes.filter&&null==e.attributes["clip-path"]&&null==e.attributes.mask||n.delete("transform"),s&&n.delete("transform")
for(const[t,r]of n)"transform"===t?null!=e.attributes.transform?e.attributes.transform=`${e.attributes.transform} ${r}`:e.attributes.transform=r:e.attributes[t]=r
for(const t of e.children)if("element"===t.type)for(const[e]of n)delete t.attributes[e]}}}},name:"moveElemsAttrsToGroup"})
const ck=[...Lt,"g","text"]
var uk=Object.freeze({__proto__:null,description:"moves some group attributes to the content elements",fn:()=>({element:{enter:e=>{if("g"===e.name&&0!==e.children.length&&null!=e.attributes.transform&&!1===Object.entries(e.attributes).some(([e,t])=>Rt.has(e)&&bb(t))&&e.children.every(e=>"element"===e.type&&ck.includes(e.name)&&null==e.attributes.id)){for(const t of e.children){const n=e.attributes.transform
"element"===t.type&&(null!=t.attributes.transform?t.attributes.transform=`${n} ${t.attributes.transform}`:t.attributes.transform=n)}delete e.attributes.transform}}}}),name:"moveGroupAttrsToElems"})
const hk=(e,t)=>{if("element"===e.type){if(Ot.animation.has(e.name)&&e.attributes.attributeName===t)return!0
for(const n of e.children)if(hk(n,t))return!0}return!1}
var fk=Object.freeze({__proto__:null,description:"collapses useless groups",fn:e=>{const t=Zy(e)
return{element:{exit:(e,n)=>{if("root"!==n.type&&"switch"!==n.name&&"g"===e.name&&0!==e.children.length){if(0!==Object.keys(e.attributes).length&&1===e.children.length){const n=e.children[0],r=!(!e.attributes.filter&&!Jy(t,e).filter)
if("element"===n.type&&null==n.attributes.id&&!r&&(null==e.attributes.class||null==n.attributes.class)&&(null==e.attributes["clip-path"]&&null==e.attributes.mask||"g"===n.name&&null==e.attributes.transform&&null==n.attributes.transform)){const t={...n.attributes}
for(const[r,s]of Object.entries(e.attributes)){if(hk(n,r))return
if(null==t[r])t[r]=s
else if("transform"===r)t[r]=s+" "+t[r]
else if("inherit"===t[r])t[r]=s
else if(!Ft.has(r)&&t[r]!==s)return}e.attributes={},n.attributes=t}}if(0===Object.keys(e.attributes).length){for(const t of e.children)if("element"===t.type&&Ot.animation.has(t.name))return
const t=n.children.indexOf(e)
n.children.splice(t,1,...e.children)}}}}}},name:"collapseGroups"})
let pk
const dk=e=>{if(e.pathJS)return e.pathJS
const t=[],n=Zb(e.attributes.d)
for(const{command:e,args:r}of n)t.push({command:e,args:r})
return t.length&&"m"==t[0].command&&(t[0].command="M"),e.pathJS=t,t},mk=e=>{const t=[],n=[0,0],r=[0,0]
for(let{command:s,args:i}of e)i=i.slice(),"m"===s&&(i[0]+=r[0],i[1]+=r[1],s="M"),"M"===s&&(r[0]=i[0],r[1]=i[1],n[0]=r[0],n[1]=r[1]),"h"===s&&(i[0]+=r[0],s="H"),"H"===s&&(r[0]=i[0]),"v"===s&&(i[0]+=r[1],s="V"),"V"===s&&(r[1]=i[0]),"l"===s&&(i[0]+=r[0],i[1]+=r[1],s="L"),"L"===s&&(r[0]=i[0],r[1]=i[1]),"c"===s&&(i[0]+=r[0],i[1]+=r[1],i[2]+=r[0],i[3]+=r[1],i[4]+=r[0],i[5]+=r[1],s="C"),"C"===s&&(r[0]=i[4],r[1]=i[5]),"s"===s&&(i[0]+=r[0],i[1]+=r[1],i[2]+=r[0],i[3]+=r[1],s="S"),"S"===s&&(r[0]=i[2],r[1]=i[3]),"q"===s&&(i[0]+=r[0],i[1]+=r[1],i[2]+=r[0],i[3]+=r[1],s="Q"),"Q"===s&&(r[0]=i[2],r[1]=i[3]),"t"===s&&(i[0]+=r[0],i[1]+=r[1],s="T"),"T"===s&&(r[0]=i[0],r[1]=i[1]),"a"===s&&(i[5]+=r[0],i[6]+=r[1],s="A"),"A"===s&&(r[0]=i[5],r[1]=i[6]),"z"!==s&&"Z"!==s||(r[0]=n[0],r[1]=n[1],s="z"),t.push({command:s,args:i})
return t},gk=function(e,t,n){e.pathJS=t
const r=[]
for(const e of t){if(0!==r.length&&("M"===e.command||"m"===e.command)){const e=r[r.length-1]
"M"!==e.command&&"m"!==e.command||r.pop()}r.push({command:e.command,args:e.args})}e.attributes.d=tk({pathData:r,precision:n.floatPrecision,disableSpaceAfterFlags:n.noSpaceAfterFlags})}
function yk(e,t){return e[0]=t[t.length-2],e[1]=t[t.length-1],e}const bk=function(e,t){const n=Ck(mk(e)),r=Ck(mk(t))
if(n.maxX<=r.minX||r.maxX<=n.minX||n.maxY<=r.minY||r.maxY<=n.minY||n.list.every(e=>r.list.every(t=>e.list[e.maxX][0]<=t.list[t.minX][0]||t.list[t.maxX][0]<=e.list[e.minX][0]||e.list[e.maxY][1]<=t.list[t.minY][1]||t.list[t.maxY][1]<=e.list[e.minY][1])))return!1
const s=n.list.map(Ak),i=r.list.map(Ak)
return s.some(function(e){return!(e.list.length<3)&&i.some(function(t){if(t.list.length<3)return!1
const n=[o(e,t,[1,0])],r=vk(n[0])
let s=1e4
for(;;){if(0==s--)return console.error("Error: infinite loop while processing mergePaths plugin."),!0
if(n.push(o(e,t,r)),wk(r,n[n.length-1])<=0)return!1
if(kk(n,r))return!0}})})
function o(e,t,n){return Sk(a(e,n),a(t,vk(n)))}function a(e,t){let n,r=t[1]>=0?t[0]<0?e.maxY:e.maxX:t[0]<0?e.minX:e.minY,s=-1/0
for(;(n=wk(e.list[r],t))>s;)s=n,r=++r%e.list.length
return e.list[(r||e.list.length)-1]}}
function kk(e,t){if(2==e.length){const n=e[1],r=e[0],s=vk(e[1]),i=Sk(r,n)
wk(s,i)>0?yk(t,xk(i,n)):(yk(t,s),e.shift())}else{const n=e[2],r=e[1],s=e[0],i=Sk(r,n),o=Sk(s,n),a=vk(n),l=xk(i,o),c=xk(o,i)
if(wk(l,a)>0)wk(i,a)>0?(yk(t,l),e.shift()):(yk(t,a),e.splice(0,2))
else{if(!(wk(c,a)>0))return!0
wk(o,a)>0?(yk(t,c),e.splice(1,1)):(yk(t,a),e.splice(0,2))}}return!1}function vk(e){return[-e[0],-e[1]]}function Sk(e,t){return[e[0]-t[0],e[1]-t[1]]}function wk(e,t){return e[0]*t[0]+e[1]*t[1]}function xk(e,t){const n=[-e[1],e[0]]
return wk(n,vk(t))<0?vk(n):n}function Ck(e){const t={list:[],minX:0,minY:0,maxX:0,maxY:0},n=(e,n)=>{(!e.list.length||n[1]>e.list[e.maxY][1])&&(e.maxY=e.list.length,t.maxY=t.list.length?Math.max(n[1],t.maxY):n[1]),(!e.list.length||n[0]>e.list[e.maxX][0])&&(e.maxX=e.list.length,t.maxX=t.list.length?Math.max(n[0],t.maxX):n[0]),(!e.list.length||n[1]<e.list[e.minY][1])&&(e.minY=e.list.length,t.minY=t.list.length?Math.min(n[1],t.minY):n[1]),(!e.list.length||n[0]<e.list[e.minX][0])&&(e.minX=e.list.length,t.minX=t.list.length?Math.min(n[0],t.minX):n[0]),e.list.push(n)}
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
case"Q":n(o,c.slice(0,2)),pk=[c[2]-c[0],c[3]-c[1]]
break
case"T":null==l||null==a||"Q"!=a.command&&"T"!=a.command||(u=[l[0]+pk[0],l[1]+pk[1]],n(o,u),pk=[c[0]-u[0],c[1]-u[1]])
break
case"C":null!=l&&n(o,[0.5*(l[0]+c[0]),0.5*(l[1]+c[1])]),n(o,[0.5*(c[0]+c[2]),0.5*(c[1]+c[3])]),n(o,[0.5*(c[2]+c[4]),0.5*(c[3]+c[5])]),pk=[c[4]-c[2],c[5]-c[3]]
break
case"S":null==l||null==a||"C"!=a.command&&"S"!=a.command||(n(o,[l[0]+0.5*pk[0],l[1]+0.5*pk[1]]),u=[l[0]+pk[0],l[1]+pk[1]]),null!=u&&n(o,[0.5*(u[0]+c[0]),0.5*(u[1]+c[1])]),n(o,[0.5*(c[0]+c[2]),0.5*(c[1]+c[3])]),pk=[c[2]-c[0],c[3]-c[1]]
break
case"A":if(null!=l){const e=Tk.apply(0,l.concat(c))
for(var r;(r=e.splice(0,6).map(h)).length;)null!=l&&n(o,[0.5*(l[0]+r[0]),0.5*(l[1]+r[1])]),n(o,[0.5*(r[0]+r[2]),0.5*(r[1]+r[3])]),n(o,[0.5*(r[2]+r[4]),0.5*(r[3]+r[5])]),e.length&&n(o,l=r.slice(-2))}}c.length>=2&&n(o,c.slice(-2))}return t}function Ak(e){e.list.sort(function(e,t){return e[0]==t[0]?e[1]-t[1]:e[0]-t[0]})
const t=[]
let n=0,r=0
for(let s=0;s<e.list.length;s++){for(;t.length>=2&&_k(t[t.length-2],t[t.length-1],e.list[s])<=0;)t.pop()
e.list[s][1]<e.list[n][1]&&(n=s,r=t.length),t.push(e.list[s])}const s=[]
let i=e.list.length-1,o=0
for(let t=e.list.length;t--;){for(;s.length>=2&&_k(s[s.length-2],s[s.length-1],e.list[t])<=0;)s.pop()
e.list[t][1]>e.list[i][1]&&(i=t,o=s.length),s.push(e.list[t])}s.pop(),t.pop()
const a=t.concat(s)
return{list:a,minX:0,maxX:t.length,minY:r,maxY:(t.length+o)%a.length}}function _k(e,t,n){return(t[0]-e[0])*(n[1]-e[1])-(t[1]-e[1])*(n[0]-e[0])}const Tk=(e,t,n,r,s,i,o,a,l,c)=>{const u=120*Math.PI/180,h=Math.PI/180*(+s||0)
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
b=y+u*(o&&b>y?1:-1),a=m+n*Math.cos(b),l=g+r*Math.sin(b),f=Tk(a,l,n,r,s,0,o,t,i,[b,e,m,g])}k=b-y
const v=Math.cos(y),S=Math.sin(y),w=Math.cos(b),x=Math.sin(b),C=Math.tan(k/4),A=4/3*n*C,_=4/3*r*C,T=[-A*S,_*v,a+A*x-e,l-_*w-t,a-e,l-t]
if(c)return T.concat(f)
{f=T.concat(f)
const e=[]
for(let t=0,n=f.length;t<n;t++)e[t]=t%2?d(f[t-1],f[t],h):p(f[t],f[t+1],h)
return e}},Ek=new Set(["matrix","rotate","scale","skewX","skewY","translate"]),Ok=/\s*(matrix|translate|scale|rotate|skewX|skewY)\s*\(\s*(.+?)\s*\)[\s,]*/,Pk=/[-+]?(?:\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g,Lk=e=>{const t=[]
let n=null
for(const r of e.split(Ok))if(r)if(Ek.has(r))n={name:r,data:[]},t.push(n)
else{let e
for(;e=Pk.exec(r);)e=Number(e),null!=n&&n.data.push(e)}return null==n||0==n.data.length?[]:t},Nk=e=>{const t=e.map(e=>"matrix"===e.name?e.data:Bk(e))
return{name:"matrix",data:t.length>0?t.reduce(qk):[]}},Dk={rad:e=>e*Math.PI/180,deg:e=>180*e/Math.PI,cos:e=>Math.cos(Dk.rad(e)),acos:(e,t)=>vb(Dk.deg(Math.acos(e)),t),sin:e=>Math.sin(Dk.rad(e)),asin:(e,t)=>vb(Dk.deg(Math.asin(e)),t),tan:e=>Math.tan(Dk.rad(e)),atan:(e,t)=>vb(Dk.deg(Math.atan(e)),t)},Mk=e=>{const t=e.data,[n,r,s,i,o,a]=t,l=n*i-r*s
if(0===l)return
const c=Math.hypot(n,r)
if(0===c)return
const u=[],h=n/c
if((o||a)&&u.push({name:"translate",data:[o,a]}),1!==h){const e=Math.acos(h)
u.push({name:"rotate",data:[Dk.deg(r<0?-e:e),0,0]})}const f=c,p=l/f
1===f&&1===p||u.push({name:"scale",data:[f,p]})
const d=n*s+r*i
return d&&u.push({name:"skewX",data:[Dk.deg(Math.atan(d/(n*n+r*r)))]}),u},jk=e=>{const t=e.data,[n,r,s,i,o,a]=t,l=n*i-r*s
if(0===l)return
const c=Math.hypot(s,i)
if(0===c)return
const u=[];(o||a)&&u.push({name:"translate",data:[o,a]})
const h=Math.PI/2-(i<0?-1:1)*Math.acos(-s/c)
u.push({name:"rotate",data:[Dk.deg(h),0,0]})
const f=l/c,p=c
1===f&&1===p||u.push({name:"scale",data:[f,p]})
const d=n*s+r*i
return d&&u.push({name:"skewY",data:[Dk.deg(Math.atan(d/(s*s+i*i)))]}),u},Ik=(e,t,n)=>{const r=Dk.rad(n),s=1-Math.cos(r),i=Math.sin(r),o=(s*t+i*e)/(s*s+i*i)
return{name:"rotate",data:[n,(e-i*o)/s,o]}},Rk=e=>{switch(e.name){case"rotate":case"skewX":case"skewY":return 0===e.data[0]
case"scale":return 1===e.data[0]&&1===e.data[1]
case"translate":return 0===e.data[0]&&0===e.data[1]}return!1},Fk=(e,t)=>{const n=[]
for(let r=0;r<e.length;r++){const s=e[r]
if(Rk(s))continue
const i=s.data
switch(s.name){case"rotate":switch(i[0]){case 180:case-180:{const t=e[r+1]
t&&"scale"===t.name?(n.push(zk(t.data.map(e=>-e))),r++):n.push({name:"scale",data:[-1]})}continue}n.push({name:"rotate",data:i.slice(0,i[1]||i[2]?3:1)})
break
case"scale":n.push(zk(i))
break
case"skewX":case"skewY":n.push({name:s.name,data:[i[0]]})
break
case"translate":{const s=e[r+1]
if(s&&"rotate"===s.name&&180!==s.data[0]&&-180!==s.data[0]&&0!==s.data[0]&&0===s.data[1]&&0===s.data[2]){const e=t[r].data
n.push(Ik(e[0],e[1],t[r+1].data[0])),r++
continue}}n.push({name:"translate",data:i.slice(0,i[1]?2:1)})}}return n.length?n:[{name:"scale",data:[1]}]},zk=e=>({name:"scale",data:e.slice(0,e[0]===e[1]?1:2)}),Gk=(e,t)=>{const n=(e=>{const t=[],n=Mk(e),r=jk(e)
return n&&t.push(n),r&&t.push(r),t})(e)
let r,s=Number.MAX_VALUE
for(const e of n){const n=e.map(e=>{const n={name:e.name,data:[...e.data]}
return Wk(n,t)}),i=Fk(n,e),o=Qk(i,t).length
o<s&&(r=i,s=o)}return r??[e]},Bk=e=>{if("matrix"===e.name)return e.data
switch(e.name){case"translate":return[1,0,0,1,e.data[0],e.data[1]||0]
case"scale":return[e.data[0],0,0,e.data[1]??e.data[0],0,0]
case"rotate":var t=Dk.cos(e.data[0]),n=Dk.sin(e.data[0]),r=e.data[1]||0,s=e.data[2]||0
return[t,n,-n,t,(1-t)*r+n*s,(1-t)*s-n*r]
case"skewX":return[1,0,Dk.tan(e.data[0]),1,0,0]
case"skewY":return[1,Dk.tan(e.data[0]),0,1,0,0]
default:throw Error(`Unknown transform ${e.name}`)}},Uk=(e,t,n)=>{const r=t[5]-e[0],s=t[6]-e[1]
let i=t[0],o=t[1]
const a=t[2]*Math.PI/180,l=Math.cos(a),c=Math.sin(a)
if(i>0&&o>0){let e=Math.pow(r*l+s*c,2)/(4*i*i)+Math.pow(s*l-r*c,2)/(4*o*o)
e>1&&(e=Math.sqrt(e),i*=e,o*=e)}const u=qk(n,[i*l,i*c,-o*c,o*l,0,0]),h=u[2]*u[2]+u[3]*u[3],f=u[0]*u[0]+u[1]*u[1]+h,p=Math.hypot(u[0]-u[3],u[1]+u[2])*Math.hypot(u[0]+u[3],u[1]-u[2])
if(p){const e=(f+p)/2,n=(f-p)/2,r=Math.abs(e-h)>1e-6,s=(r?e:n)-h,i=u[0]*u[2]+u[1]*u[3],o=u[0]*s+u[2]*i,a=u[1]*s+u[3]*i
t[0]=Math.sqrt(e),t[1]=Math.sqrt(n),t[2]=((r?a<0:o>0)?-1:1)*Math.acos((r?o:a)/Math.hypot(o,a))*180/Math.PI}else t[0]=t[1]=Math.sqrt(f/2),t[2]=0
return n[0]<0!=n[3]<0&&(t[4]=1-t[4]),t},qk=(e,t)=>[e[0]*t[0]+e[2]*t[1],e[1]*t[0]+e[3]*t[1],e[0]*t[2]+e[2]*t[3],e[1]*t[2]+e[3]*t[3],e[0]*t[4]+e[2]*t[5]+e[4],e[1]*t[4]+e[3]*t[5]+e[5]],Wk=(e,t)=>{switch(e.name){case"translate":e.data=$k(e.data,t)
break
case"rotate":e.data=[...Vk(e.data.slice(0,1),t),...$k(e.data.slice(1),t)]
break
case"skewX":case"skewY":e.data=Vk(e.data,t)
break
case"scale":e.data=Yk(e.data,t)
break
case"matrix":e.data=[...Yk(e.data.slice(0,4),t),...$k(e.data.slice(4),t)]}return e},Vk=(e,t)=>null!=t.degPrecision&&t.degPrecision>=1&&t.floatPrecision<20?Hk(t.degPrecision,e):Xk(e),$k=(e,t)=>t.floatPrecision>=1&&t.floatPrecision<20?Hk(t.floatPrecision,e):Xk(e),Yk=(e,t)=>t.transformPrecision>=1&&t.floatPrecision<20?Hk(t.transformPrecision,e):Xk(e),Xk=e=>e.map(Math.round),Hk=(e,t)=>{for(let n=t.length,r=+Math.pow(0.1,e).toFixed(e);n--;)if(vb(t[n],e)!==t[n]){const s=+t[n].toFixed(e-1)
t[n]=+Math.abs(s-t[n]).toFixed(e+1)>=r?+t[n].toFixed(e):s}return t},Qk=(e,t)=>e.map(e=>(Wk(e,t),`${e.name}(${mb(e.data,t)})`)).join(""),Kk=/[-+]?(\d*\.\d+|\d+\.?)(?:[eE][-+]?\d+)?/g,Zk=(e,t,n)=>[e[0]*t+e[2]*n+e[4],e[1]*t+e[3]*n+e[5]],Jk=(e,t,n)=>[e[0]*t+e[2]*n,e[1]*t+e[3]*n],ev=(e,t)=>{const n=[0,0],r=[0,0]
for(const s of e){let{command:e,args:i}=s
if("M"===e){r[0]=i[0],r[1]=i[1],n[0]=r[0],n[1]=r[1]
const[e,s]=Zk(t,i[0],i[1])
i[0]=e,i[1]=s}if("m"===e){r[0]+=i[0],r[1]+=i[1],n[0]=r[0],n[1]=r[1]
const[e,s]=Jk(t,i[0],i[1])
i[0]=e,i[1]=s}if("H"===e&&(e="L",i=[i[0],r[1]]),"h"===e&&(e="l",i=[i[0],0]),"V"===e&&(e="L",i=[r[0],i[0]]),"v"===e&&(e="l",i=[0,i[0]]),"L"===e){r[0]=i[0],r[1]=i[1]
const[e,n]=Zk(t,i[0],i[1])
i[0]=e,i[1]=n}if("l"===e){r[0]+=i[0],r[1]+=i[1]
const[e,n]=Jk(t,i[0],i[1])
i[0]=e,i[1]=n}if("C"===e){r[0]=i[4],r[1]=i[5]
const[e,n]=Zk(t,i[0],i[1]),[s,o]=Zk(t,i[2],i[3]),[a,l]=Zk(t,i[4],i[5])
i[0]=e,i[1]=n,i[2]=s,i[3]=o,i[4]=a,i[5]=l}if("c"===e){r[0]+=i[4],r[1]+=i[5]
const[e,n]=Jk(t,i[0],i[1]),[s,o]=Jk(t,i[2],i[3]),[a,l]=Jk(t,i[4],i[5])
i[0]=e,i[1]=n,i[2]=s,i[3]=o,i[4]=a,i[5]=l}if("S"===e){r[0]=i[2],r[1]=i[3]
const[e,n]=Zk(t,i[0],i[1]),[s,o]=Zk(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=s,i[3]=o}if("s"===e){r[0]+=i[2],r[1]+=i[3]
const[e,n]=Jk(t,i[0],i[1]),[s,o]=Jk(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=s,i[3]=o}if("Q"===e){r[0]=i[2],r[1]=i[3]
const[e,n]=Zk(t,i[0],i[1]),[s,o]=Zk(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=s,i[3]=o}if("q"===e){r[0]+=i[2],r[1]+=i[3]
const[e,n]=Jk(t,i[0],i[1]),[s,o]=Jk(t,i[2],i[3])
i[0]=e,i[1]=n,i[2]=s,i[3]=o}if("T"===e){r[0]=i[0],r[1]=i[1]
const[e,n]=Zk(t,i[0],i[1])
i[0]=e,i[1]=n}if("t"===e){r[0]+=i[0],r[1]+=i[1]
const[e,n]=Jk(t,i[0],i[1])
i[0]=e,i[1]=n}if("A"===e){if(Uk(r,i,t),r[0]=i[5],r[1]=i[6],Math.abs(i[2])>80){const e=i[0],t=i[2]
i[0]=i[1],i[1]=e,i[2]=t+(t>0?-90:90)}const[e,n]=Zk(t,i[5],i[6])
i[5]=e,i[6]=n}if("a"===e){if(Uk([0,0],i,t),r[0]+=i[5],r[1]+=i[6],Math.abs(i[2])>80){const e=i[0],t=i[2]
i[0]=i[1],i[1]=e,i[2]=t+(t>0?-90:90)}const[e,n]=Jk(t,i[5],i[6])
i[5]=e,i[6]=n}"z"!==e&&"Z"!==e||(r[0]=n[0],r[1]=n[1]),s.command=e,s.args=i}}
let tv,nv,rv,sv,iv
const ov=e=>{const t=[0,0],n=[0,0]
let r=[0,0]
for(let s=0;s<e.length;s+=1){const i=e[s]
let{command:o,args:a}=i
"m"===o&&(n[0]+=a[0],n[1]+=a[1],t[0]=n[0],t[1]=n[1]),"M"===o&&(0!==s&&(o="m"),a[0]-=n[0],a[1]-=n[1],n[0]+=a[0],n[1]+=a[1],t[0]=n[0],t[1]=n[1]),"l"===o&&(n[0]+=a[0],n[1]+=a[1]),"L"===o&&(o="l",a[0]-=n[0],a[1]-=n[1],n[0]+=a[0],n[1]+=a[1]),"h"===o&&(n[0]+=a[0]),"H"===o&&(o="h",a[0]-=n[0],n[0]+=a[0]),"v"===o&&(n[1]+=a[0]),"V"===o&&(o="v",a[0]-=n[1],n[1]+=a[0]),"c"===o&&(n[0]+=a[4],n[1]+=a[5]),"C"===o&&(o="c",a[0]-=n[0],a[1]-=n[1],a[2]-=n[0],a[3]-=n[1],a[4]-=n[0],a[5]-=n[1],n[0]+=a[4],n[1]+=a[5]),"s"===o&&(n[0]+=a[2],n[1]+=a[3]),"S"===o&&(o="s",a[0]-=n[0],a[1]-=n[1],a[2]-=n[0],a[3]-=n[1],n[0]+=a[2],n[1]+=a[3]),"q"===o&&(n[0]+=a[2],n[1]+=a[3]),"Q"===o&&(o="q",a[0]-=n[0],a[1]-=n[1],a[2]-=n[0],a[3]-=n[1],n[0]+=a[2],n[1]+=a[3]),"t"===o&&(n[0]+=a[0],n[1]+=a[1]),"T"===o&&(o="t",a[0]-=n[0],a[1]-=n[1],n[0]+=a[0],n[1]+=a[1]),"a"===o&&(n[0]+=a[5],n[1]+=a[6]),"A"===o&&(o="a",a[5]-=n[0],a[6]-=n[1],n[0]+=a[5],n[1]+=a[6]),"Z"!==o&&"z"!==o||(n[0]=t[0],n[1]=t[1]),i.command=o,i.args=a,i.base=r,i.coords=[n[0],n[1]],r=i.coords}return e}
function av(e){const t=lv([0,0,e[2],e[3],e[0],e[1],e[4],e[5]])
return null!=t&&e[2]<t[0]==t[0]<0&&e[3]<t[1]==t[1]<0&&e[4]<t[0]==t[0]<e[0]&&e[5]<t[1]==t[1]<e[1]}function lv(e){const t=e[1]-e[3],n=e[2]-e[0],r=e[0]*e[3]-e[2]*e[1],s=e[5]-e[7],i=e[6]-e[4],o=e[4]*e[7]-e[5]*e[6],a=t*i-s*n
if(!a)return
const l=[(n*o-i*r)/a,(t*o-s*r)/-a]
return!isNaN(l[0])&&!isNaN(l[1])&&isFinite(l[0])&&isFinite(l[1])?l:void 0}function cv(e){const t=nv||0
for(let n=e.length;n-- >0;){const r=vb(e[n],t)
if(r!==e[n]){const s=vb(e[n],t-1)
e[n]=vb(Math.abs(s-e[n]),t+1)>=rv?r:s}}return e}function uv(e){for(let t=e.length;t-- >0;)e[t]=Math.round(e[t])
return e}function hv(e){let t=e.length-2
const n=-e[t+1],r=e[t],s=1/(n*n+r*r)
if(t<=1||!isFinite(s))return!1
for(;(t-=2)>=0;)if(Math.sqrt(Math.pow(n*e[t]+r*e[t+1],2)*s)>rv)return!1
return!0}function fv(e){if(1===e[3])return
const[t,n]=e
if(Math.abs(t-n)>rv)return
const r=Math.hypot(e[5],e[6])
return r>2*t?void 0:t-Math.sqrt(t**2-0.25*r**2)}function pv(e,t){switch(e.command){case"s":e.command="c"
break
case"t":e.command="q"}return e.args.unshift(t[t.length-2]-t[t.length-4],t[t.length-1]-t[t.length-3]),e}function dv(e,t){return Math.hypot(e[0]-t[0],e[1]-t[1])}function mv(e,t){return[2*t[0]-e[0],2*t[1]-e[1]]}function gv(e,t){const n=t*t,r=n*t,s=1-t,i=s*s
return[3*i*t*e[0]+3*s*n*e[2]+r*e[4],3*i*t*e[1]+3*s*n*e[3]+r*e[5]]}function yv(e,t){const n=Math.min(sv*rv,iv*t.radius/100)
return[0,1/4,.5,3/4,1].every(function(r){return Math.abs(dv(gv(e,r),t.center)-t.radius)<=n})}function bv(e,t){return yv(e,{center:[t.center[0]+e[4],t.center[1]+e[5]],radius:t.radius})}function kv(e,t){const n=-t.center[0],r=-t.center[1],s=e[4]-t.center[0],i=e[5]-t.center[1]
return Math.acos((n*s+r*i)/Math.sqrt((n*n+r*r)*(s*s+i*i)))}function vv(e,t){return t.reduce(function(t,n){let r=""
return n.args&&(r=mb(tv(n.args.slice()),e)),t+n.command+r},"")}var Sv=Object.freeze({__proto__:null,description:"optimizes path data: writes in shorter form, applies transformations",fn:(e,t)=>{const{applyTransforms:n=!0,applyTransformsStroked:s=!0,makeArcs:i={threshold:2.5,tolerance:0.5},straightCurves:o=!0,convertToQ:a=!0,lineShorthands:l=!0,convertToZ:c=!0,curveSmoothShorthands:u=!0,floatPrecision:h=3,transformPrecision:f=5,smartArcRounding:p=!0,removeUseless:d=!0,collapseRepeated:m=!0,utilizeAbsolute:g=!0,leadingZero:y=!0,negativeExtraSpace:b=!0,noSpaceAfterFlags:k=!1,forceAbsolutePath:v=!1}=t,S={applyTransforms:n,applyTransformsStroked:s,makeArcs:i,straightCurves:o,convertToQ:a,lineShorthands:l,convertToZ:c,curveSmoothShorthands:u,floatPrecision:h,transformPrecision:f,smartArcRounding:p,removeUseless:d,collapseRepeated:m,utilizeAbsolute:g,leadingZero:y,negativeExtraSpace:b,noSpaceAfterFlags:k,forceAbsolutePath:v}
n&&r(e,((e,t)=>{const n=Zy(e)
return{element:{enter:e=>{if(null==e.attributes.d)return
if(null!=e.attributes.id)return
if(null==e.attributes.transform||""===e.attributes.transform||null!=e.attributes.style||Object.entries(e.attributes).some(([e,t])=>Rt.has(e)&&bb(t)))return
const r=Jy(n,e),s=r.transform
if("static"===s.type&&s.value!==e.attributes.transform)return
const i=Nk(Lk(e.attributes.transform)),o="static"===r.stroke?.type?r.stroke.value:null,a="static"===r["stroke-width"]?.type?r["stroke-width"].value:null,l=t.transformPrecision
if("dynamic"===r.stroke?.type||"dynamic"===r["stroke-width"]?.type)return
const c=Number(Math.hypot(i.data[0],i.data[1]).toFixed(l))
if(o&&"none"!=o){if(!t.applyTransformsStroked)return
if(!(i.data[0]===i.data[3]&&i.data[1]===-i.data[2]||i.data[0]===-i.data[3]&&i.data[1]===i.data[2]))return
1!==c&&"non-scaling-stroke"!==e.attributes["vector-effect"]&&(e.attributes["stroke-width"]=(a||Dt.presentation["stroke-width"]).trim().replace(Kk,e=>gb(Number(e)*c)),null!=e.attributes["stroke-dashoffset"]&&(e.attributes["stroke-dashoffset"]=e.attributes["stroke-dashoffset"].trim().replace(Kk,e=>gb(Number(e)*c))),null!=e.attributes["stroke-dasharray"]&&(e.attributes["stroke-dasharray"]=e.attributes["stroke-dasharray"].trim().replace(Kk,e=>gb(Number(e)*c))))}const u=dk(e)
ev(u,i.data),delete e.attributes.transform}}}})(e,{transformPrecision:f,applyTransformsStroked:s}))
const w=Zy(e)
return{element:{enter:e=>{if(Lt.has(e.name)&&null!=e.attributes.d){const t=Jy(w,e)
nv=h,rv=!1!==nv?+Math.pow(0.1,nv).toFixed(nv):1e-2,tv=nv&&nv>0&&nv<20?cv:uv,i&&(sv=i.threshold,iv=i.tolerance)
const n=null!=t["marker-mid"],r=t.stroke&&("dynamic"===t.stroke.type||"none"!==t.stroke.value),s=t["stroke-linecap"]&&("dynamic"===t["stroke-linecap"].type||"butt"!==t["stroke-linecap"].value),o=r&&s,a=!r||"static"===t["stroke-linecap"]?.type&&"round"===t["stroke-linecap"].value&&"static"===t["stroke-linejoin"]?.type&&"round"===t["stroke-linejoin"].value
let l=dk(e)
if(l.length){const t=l.some(e=>"m"!==e.command&&"M"!==e.command)
ov(l),l=function(e,t,{isSafeToUseZ:n,maybeHasStrokeAndLinecap:r,hasMarkerMid:s}){const i=vv.bind(null,t),o=[0,0],a=[0,0]
let l,c={}
return e=e.filter(function(e,u,h){const f=l
let p=e.command,d=e.args,m=h[u+1]
if("Z"!==p&&"z"!==p){let l,y=d
if("s"===p){y=[0,0].concat(d)
const e=c.args,t=e.length
y[0]=e[t-2]-e[t-4],y[1]=e[t-1]-e[t-3]}if(t.makeArcs&&("c"==p||"s"==p)&&av(y)&&(l=function(e){const t=gv(e,.5),n=[t[0]/2,t[1]/2],r=[(t[0]+e[4])/2,(t[1]+e[5])/2],s=lv([n[0],n[1],n[0]+n[1],n[1]-n[0],r[0],r[1],r[0]+(r[1]-t[1]),r[1]-(r[0]-t[0])]),i=s&&dv([0,0],s),o=Math.min(sv*rv,iv*i/100)
if(s&&i<1e15&&[1/4,3/4].every(function(t){return Math.abs(dv(gv(e,t),s)-i)<=o}))return{center:s,radius:i}}(y))){const t=tv([l.radius])[0]
let n=kv(y,l)
const r=y[5]*y[0]-y[4]*y[1]>0?1:0
let s={command:"a",args:[t,t,0,0,r,y[4],y[5]],coords:e.coords.slice(),base:e.base}
const a=[s],f=[l.center[0]-y[4],l.center[1]-y[5]],b={center:f,radius:l.radius},k=[e]
let v,S=0,w=""
if("c"==c.command&&av(c.args)&&bv(c.args,l)||"a"==c.command&&c.sdata&&bv(c.sdata,l)){k.unshift(c),s.base=c.base,s.args[5]=s.coords[0]-s.base[0],s.args[6]=s.coords[1]-s.base[1]
const e="a"==c.command?c.sdata:c.args
n+=kv(e,{center:[e[4]+l.center[0],e[5]+l.center[1]],radius:l.radius}),n>Math.PI&&(s.args[3]=1),S=1}for(var g=u;(m=h[++g])&&("c"===m.command||"s"===m.command);){let e=m.args
if("s"==m.command&&(v=pv({command:"s",args:m.args.slice()},h[g-1].args),e=v.args,v.args=e.slice(0,2),w=i([v])),!av(e)||!yv(e,b))break
if(n+=kv(e,b),n-2*Math.PI>1e-3)break
if(n>Math.PI&&(s.args[3]=1),k.push(m),!(2*Math.PI-n>1e-3)){s.args[5]=2*(b.center[0]-e[4]),s.args[6]=2*(b.center[1]-e[5]),s.coords=[s.base[0]+s.args[5],s.base[1]+s.args[6]],s={command:"a",args:[t,t,0,0,r,m.coords[0]-s.coords[0],m.coords[1]-s.coords[1]],coords:m.coords,base:s.coords},a.push(s),g++
break}s.coords=m.coords,s.args[5]=s.coords[0]-s.base[0],s.args[6]=s.coords[1]-s.base[1],f[0]-=e[4],f[1]-=e[5]}if((i(a)+w).length<i(k).length){if(h[g]&&"s"==h[g].command&&pv(h[g],h[g-1].args),S){const t=a.shift()
tv(t.args),o[0]+=t.args[5]-c.args[c.args.length-2],o[1]+=t.args[6]-c.args[c.args.length-1],c.command="a",c.args=t.args,e.base=c.coords=t.coords}if(s=a.shift(),1==k.length?e.sdata=y.slice():k.length-1-S>0&&h.splice(u+1,k.length-1-S,...a),!s)return!1
p="a",d=s.args,e.coords=s.coords}}if(!1!==nv){if("m"===p||"l"===p||"t"===p||"q"===p||"s"===p||"c"===p)for(let t=d.length;t--;)d[t]+=e.base[t%2]-o[t%2]
else"h"==p?d[0]+=e.base[0]-o[0]:"v"==p?d[0]+=e.base[1]-o[1]:"a"==p&&(d[5]+=e.base[0]-o[0],d[6]+=e.base[1]-o[1])
tv(d),"h"==p?o[0]+=d[0]:"v"==p?o[1]+=d[0]:(o[0]+=d[d.length-2],o[1]+=d[d.length-1]),tv(o),"M"!==p&&"m"!==p||(a[0]=o[0],a[1]=o[1])}const b="a"===p?fv(d):void 0
if(t.smartArcRounding&&void 0!==b&&nv)for(let e=nv;e>=0;e--){const t=vb(d[0],e),n=fv([t,t,...d.slice(2)])
if(!(Math.abs(b-n)<rv))break
d[0]=t,d[1]=t}if(t.straightCurves&&("c"===p&&hv(d)||"s"===p&&hv(y)?(m&&"s"==m.command&&pv(m,d),p="l",d=d.slice(-2)):"q"===p&&hv(d)?(m&&"t"==m.command&&pv(m,d),p="l",d=d.slice(-2)):("t"===p&&"q"!==c.command&&"t"!==c.command||"a"===p&&(0===d[0]||0===d[1]||void 0!==b&&b<rv))&&(p="l",d=d.slice(-2))),t.convertToQ&&"c"==p){const n=0.75*(e.base[0]+d[0])-0.25*e.base[0],r=0.75*(e.base[0]+d[2])-0.25*(e.base[0]+d[4])
if(Math.abs(n-r)<2*rv){const s=0.75*(e.base[1]+d[1])-0.25*e.base[1],i=0.75*(e.base[1]+d[3])-0.25*(e.base[1]+d[5])
if(Math.abs(s-i)<2*rv){const o=d.slice()
o.splice(0,4,n+r-e.base[0],s+i-e.base[1]),tv(o)
const a=mb(d,t).length
mb(o,t).length<a&&(p="q",d=o,m&&"s"==m.command&&pv(m,d))}}}if(t.lineShorthands&&"l"===p&&(0===d[1]?(p="h",d.pop()):0===d[0]&&(p="v",d.shift())),t.collapseRepeated&&!1===s&&("m"===p||"h"===p||"v"===p)&&c.command&&p==c.command.toLowerCase()&&("h"!=p&&"v"!=p||c.args[0]>=0==d[0]>=0))return c.args[0]+=d[0],"h"!=p&&"v"!=p&&(c.args[1]+=d[1]),c.coords=e.coords,h[u]=c,!1
if(t.curveSmoothShorthands&&c.command)if("c"===p)("c"===c.command&&Math.abs(d[0]- -(c.args[2]-c.args[4]))<rv&&Math.abs(d[1]- -(c.args[3]-c.args[5]))<rv||"s"===c.command&&Math.abs(d[0]- -(c.args[0]-c.args[2]))<rv&&Math.abs(d[1]- -(c.args[1]-c.args[3]))<rv||"c"!==c.command&&"s"!==c.command&&Math.abs(d[0])<rv&&Math.abs(d[1])<rv)&&(p="s",d=d.slice(2))
else if("q"===p)if("q"===c.command&&Math.abs(d[0]-(c.args[2]-c.args[0]))<rv&&Math.abs(d[1]-(c.args[3]-c.args[1]))<rv)p="t",d=d.slice(2)
else if("t"===c.command){const t=mv(f,e.base),n=[d[0]+e.base[0],d[1]+e.base[1]]
Math.abs(t[0]-n[0])<rv&&Math.abs(t[1]-n[1])<rv&&(p="t",d=d.slice(2))}if(t.removeUseless&&!r){if(("l"===p||"h"===p||"v"===p||"q"===p||"t"===p||"c"===p||"s"===p)&&d.every(function(e){return 0===e}))return h[u]=c,!1
if("a"===p&&0===d[5]&&0===d[6])return h[u]=c,!1}!t.convertToZ||!n&&"Z"!==m?.command&&"z"!==m?.command||"l"!==p&&"h"!==p&&"v"!==p||Math.abs(a[0]-e.coords[0])<rv&&Math.abs(a[1]-e.coords[1])<rv&&(p="z",d=[]),e.command=p,e.args=d}else if(o[0]=a[0],o[1]=a[1],"Z"===c.command||"z"===c.command)return!1
return!(("Z"===p||"z"===p)&&t.removeUseless&&n&&Math.abs(e.base[0]-e.coords[0])<rv/10&&Math.abs(e.base[1]-e.coords[1])<rv/10)&&(l="q"===p?[d[0]+e.base[0],d[1]+e.base[1]]:"t"===p?f?mv(f,e.base):e.coords:void 0,c=e,!0)}),e}(l,S,{isSafeToUseZ:a,maybeHasStrokeAndLinecap:o,hasMarkerMid:n}),g&&(l=function(e,t){let n=e[0]
return e=e.filter(function(e,r){if(0==r)return!0
if("Z"===e.command||"z"===e.command)return n=e,!0
const s=e.command,i=e.args,o=i.slice(),a=i.slice()
if("m"===s||"l"===s||"t"===s||"q"===s||"s"===s||"c"===s)for(let t=o.length;t--;)o[t]+=e.base[t%2]
else"h"==s?o[0]+=e.base[0]:"v"==s?o[0]+=e.base[1]:"a"==s&&(o[5]+=e.base[0],o[6]+=e.base[1])
tv(o),tv(a)
const l=mb(o,t),c=mb(a,t)
return(t.forceAbsolutePath||l.length<c.length&&!(t.negativeExtraSpace&&s==n.command&&n.command.charCodeAt(0)>96&&l.length==c.length-1&&(i[0]<0||0===Math.floor(i[0])&&!Number.isInteger(i[0])&&n.args[n.args.length-1]%1)))&&(e.command=s.toUpperCase(),e.args=o),n=e,!0}),e}(l,S));(null!=e.attributes["marker-start"]||null!=e.attributes["marker-end"])&&t&&l.every(e=>"m"===e.command||"M"===e.command)&&l.push({command:"z",args:[]}),gk(e,l,S)}}}}}},name:"convertPathData"})
const wv=(e,t,n)=>{let r=Lk(e.attributes[t]);(n=xv(r,n)).collapseIntoOne&&r.length>1&&(r=[Nk(r)]),n.convertToShorts?r=Av(r,n):r.forEach(e=>Wk(e,n)),n.removeUseless&&(r=_v(r)),r.length?e.attributes[t]=Qk(r,n):delete e.attributes[t]},xv=(e,{...t})=>{const n=[]
for(const t of e)"matrix"==t.name&&n.push(...t.data.slice(0,4))
let r=t.transformPrecision
return n.length&&(t.transformPrecision=Math.min(t.transformPrecision,Math.max.apply(Math,n.map(Cv))||t.transformPrecision),r=Math.max.apply(Math,n.map(e=>e.toString().replace(/\D+/g,"").length))),null==t.degPrecision&&(t.degPrecision=Math.max(0,Math.min(t.floatPrecision,r-2))),t},Cv=e=>{const t=e.toString()
return t.slice(t.indexOf(".")).length-1},Av=(e,t)=>{for(let n=0;n<e.length;n++){let r=e[n]
if(t.matrixToTransform&&"matrix"===r.name){const s=Gk(r,t)
Qk(s,t).length<=Qk([r],t).length&&e.splice(n,1,...s),r=e[n]}Wk(r,t),t.shortTranslate&&"translate"===r.name&&2===r.data.length&&!r.data[1]&&r.data.pop(),t.shortScale&&"scale"===r.name&&2===r.data.length&&r.data[0]===r.data[1]&&r.data.pop(),t.shortRotate&&"translate"===e[n-2]?.name&&"rotate"===e[n-1].name&&"translate"===e[n].name&&e[n-2].data[0]===-e[n].data[0]&&e[n-2].data[1]===-e[n].data[1]&&(e.splice(n-2,3,{name:"rotate",data:[e[n-1].data[0],e[n-2].data[0],e[n-2].data[1]]}),n-=2)}return e},_v=e=>e.filter(e=>!(["translate","rotate","skewX","skewY"].indexOf(e.name)>-1&&(1==e.data.length||"rotate"==e.name)&&!e.data[0]||"translate"==e.name&&!e.data[0]&&!e.data[1]||"scale"==e.name&&1==e.data[0]&&(e.data.length<2||1==e.data[1])||"matrix"==e.name&&1==e.data[0]&&1==e.data[3]&&!(e.data[1]||e.data[2]||e.data[4]||e.data[5])))
var Tv=Object.freeze({__proto__:null,description:"collapses multiple transformations and optimizes it",fn:(e,t)=>{const{convertToShorts:n=!0,degPrecision:r,floatPrecision:s=3,transformPrecision:i=5,matrixToTransform:o=!0,shortTranslate:a=!0,shortScale:l=!0,shortRotate:c=!0,removeUseless:u=!0,collapseIntoOne:h=!0,leadingZero:f=!0,negativeExtraSpace:p=!1}=t,d={convertToShorts:n,degPrecision:r,floatPrecision:s,transformPrecision:i,matrixToTransform:o,shortTranslate:a,shortScale:l,shortRotate:c,removeUseless:u,collapseIntoOne:h,leadingZero:f,negativeExtraSpace:p}
return{element:{enter:e=>{null!=e.attributes.transform&&wv(e,"transform",d),null!=e.attributes.gradientTransform&&wv(e,"gradientTransform",d),null!=e.attributes.patternTransform&&wv(e,"patternTransform",d)}}}},name:"convertTransform"})
var Ev=Object.freeze({__proto__:null,description:"removes empty attributes",fn:()=>({element:{enter:e=>{for(const[t,n]of Object.entries(e.attributes))""!==n||Nt.conditionalProcessing.has(t)||delete e.attributes[t]}}}),name:"removeEmptyAttrs"})
var Ov=Object.freeze({__proto__:null,description:"removes empty container elements",fn:e=>{const t=Zy(e)
return{element:{exit:(e,n)=>{"svg"!==e.name&&Ot.container.has(e.name)&&0===e.children.length&&("pattern"===e.name&&0!==Object.keys(e.attributes).length||"mask"===e.name&&null!=e.attributes.id||"element"===n.type&&"switch"===n.name||("g"!==e.name||null==e.attributes.filter&&!Jy(t,e).filter)&&Ct(e,n))}}}},name:"removeEmptyContainers"})
function Pv(e,t){const n=e[t]
return"static"===n?.type&&bb(n.value)}var Lv=Object.freeze({__proto__:null,description:"merges multiple paths in one if possible",fn:(e,t)=>{const{force:n=!1,floatPrecision:r=3,noSpaceAfterFlags:s=!1}=t,i=Zy(e)
return{element:{enter:e=>{if(e.children.length<=1)return
const t=[]
let o=e.children[0],a=null
const l=(e,t)=>{gk(e,t,{floatPrecision:r,noSpaceAfterFlags:s}),a=null}
for(let r=1;r<e.children.length;r++){const s=e.children[r]
if("element"!==o.type||"path"!==o.name||0!==o.children.length||null==o.attributes.d){a&&"element"===o.type&&l(o,a),o=s
continue}if("element"!==s.type||"path"!==s.name||0!==s.children.length||null==s.attributes.d){a&&l(o,a),o=s
continue}const c=Jy(i,s)
if(c["marker-start"]||c["marker-mid"]||c["marker-end"]||c["clip-path"]||c.mask||c["mask-image"]||["fill","filter","stroke"].some(e=>Pv(c,e))){a&&l(o,a),o=s
continue}const u=Object.keys(s.attributes)
if(u.length!==Object.keys(o.attributes).length){a&&l(o,a),o=s
continue}if(u.some(e=>"d"!==e&&"element"===o.type&&o.attributes[e]!==s.attributes[e])){a&&l(o,a),o=s
continue}const h=null!=a,f=dk(s)
a=a??dk(o),!n&&bk(a,f)?(h&&l(o,a),o=s,a=null):(a.push(...f),t.push(s))}a&&"element"===o.type&&l(o,a),e.children=e.children.filter(e=>!t.includes(e))}}}},name:"mergePaths"})
var Nv=Object.freeze({__proto__:null,description:"removes unused namespaces declaration",fn:()=>{const e=new Set
return{element:{enter:(t,n)=>{if("svg"===t.name&&"root"===n.type)for(const n of Object.keys(t.attributes))if(n.startsWith("xmlns:")){const t=n.slice(6)
e.add(t)}if(0!==e.size){if(t.name.includes(":")){const[n]=t.name.split(":")
e.has(n)&&e.delete(n)}for(const n of Object.keys(t.attributes))if(n.includes(":")){const[t]=n.split(":")
e.delete(t)}}},exit:(t,n)=>{if("svg"===t.name&&"root"===n.type)for(const n of e)delete t.attributes[`xmlns:${n}`]}}}},name:"removeUnusedNS"})
var Dv=Object.freeze({__proto__:null,description:"Sort element attributes for better compression",fn:(e,t)=>{const{order:n=["id","width","height","x","x1","x2","y","y1","y2","cx","cy","r","fill","stroke","marker","d","points"],xmlnsOrder:r="front"}=t,s=e=>{if("front"===r){if("xmlns"===e)return 3
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
var Mv=Object.freeze({__proto__:null,description:"Sorts children of <defs> to improve compression",fn:()=>({element:{enter:e=>{if("defs"===e.name){const t=new Map
for(const n of e.children)if("element"===n.type){const e=t.get(n.name)
null==e?t.set(n.name,1):t.set(n.name,e+1)}e.children.sort((e,n)=>{if("element"!==e.type||"element"!==n.type)return 0
const r=t.get(e.name),s=t.get(n.name)
if(null!=r&&null!=s){const e=s-r
if(0!==e)return e}const i=n.name.length-e.name.length
return 0!==i?i:e.name!==n.name?e.name>n.name?-1:1:0})}}}}),name:"sortDefsChildren"})
const jv=/^(Created with|Created using)/
var Iv=Object.freeze({__proto__:null,description:"removes <desc>",fn:(e,t)=>{const{removeAny:n=!1}=t
return{element:{enter:(e,t)=>{"desc"===e.name&&(n||0===e.children.length||"text"===e.children[0].type&&jv.test(e.children[0].value))&&Ct(e,t)}}}},name:"removeDesc"})
const Rv=(({name:e,plugins:t})=>({name:e,isPreset:!0,plugins:Object.freeze(t),fn:(n,r,i)=>{const{floatPrecision:o,overrides:a}=r,l={}
if(null!=o&&(l.floatPrecision=o),a){const n=t.map(({name:e})=>e)
for(const t of Object.keys(a))n.includes(t)||console.warn(`You are trying to configure ${t} which is not part of ${e}.\nTry to put it before or after, for example\n\nplugins: [\n  {\n    name: '${e}',\n  },\n  '${t}'\n]\n`)}s(n,i,t,a,l)}}))({name:"preset-default",plugins:[At,_t,Et,nb,rb,sb,lb,cb,hb,Sb,_b,Eb,Lb,Rb,Bb,Ub,qb,$b,rk,sk,ok,ak,lk,uk,fk,Sv,Tv,Ev,Ov,Lv,Nv,Dv,Mv,Iv]})
var Fv=Object.freeze({__proto__:null,description:"adds attributes to an outer <svg> element",fn:(e,t)=>{if(!Array.isArray(t.attributes)&&!t.attribute)return console.error('Error in plugin "addAttributesToSVGElement": absent parameters.\nIt should have a list of "attributes" or one "attribute".\nConfig example:\n\nplugins: [\n  {\n    name: \'addAttributesToSVGElement\',\n    params: {\n      attribute: "mySvg"\n    }\n  }\n]\n\nplugins: [\n  {\n    name: \'addAttributesToSVGElement\',\n    params: {\n      attributes: ["mySvg", "size-big"]\n    }\n  }\n]\n\nplugins: [\n  {\n    name: \'addAttributesToSVGElement\',\n    params: {\n      attributes: [\n        {\n          focusable: false\n        },\n        {\n          \'data-image\': icon\n        }\n      ]\n    }\n  }\n]\n'),null
const n=t.attributes||[t.attribute]
return{element:{enter:(e,t)=>{if("svg"===e.name&&"root"===t.type)for(const t of n)if("string"==typeof t&&null==e.attributes[t]&&(e.attributes[t]=void 0),"object"==typeof t)for(const n of Object.keys(t))null==e.attributes[n]&&(e.attributes[n]=t[n])}}}},name:"addAttributesToSVGElement"})
var zv=Object.freeze({__proto__:null,description:"adds classnames to an outer <svg> element",fn:(e,t,n)=>{if(!(Array.isArray(t.classNames)&&0!==t.classNames.length||t.className))return console.error('Error in plugin "addClassesToSVGElement": absent parameters.\nIt should have a list of classes in "classNames" or one "className".\nConfig example:\n\nplugins: [\n  {\n    name: "addClassesToSVGElement",\n    params: {\n      className: "mySvg"\n    }\n  }\n]\n\nplugins: [\n  {\n    name: "addClassesToSVGElement",\n    params: {\n      classNames: ["mySvg", "size-big"]\n    }\n  }\n]\n'),null
const r=t.classNames||[t.className]
return{element:{enter:(e,t)=>{if("svg"===e.name&&"root"===t.type){const t=new Set(null==e.attributes.class?null:e.attributes.class.split(" "))
for(const s of r)if(null!=s){const r="string"==typeof s?s:s(e,n)
t.add(r)}e.attributes.class=Array.from(t).join(" ")}}}}},name:"addClassesToSVGElement"})
const Gv=/^([-+]?\d*\.?\d+([eE][-+]?\d+)?)(px|pt|pc|mm|cm|m|in|ft|em|ex|%)?$/,Bv=/\s+,?\s*|,\s*/,Uv={cm:96/2.54,mm:96/25.4,in:96,pt:4/3,pc:16,px:1}
var qv=Object.freeze({__proto__:null,description:"rounds list of values to the fixed precision",fn:(e,t)=>{const{floatPrecision:n=3,leadingZero:r=!0,defaultPx:s=!0,convertToPx:i=!0}=t,o=e=>{const t=[]
for(const o of e.split(Bv)){const e=o.match(Gv),a=o.match(/new/)
if(e){let o=Number(Number(e[1]).toFixed(n))
let a,l=e[3]||""
if(i&&l&&l in Uv){const t=Number((Uv[l]*Number(e[1])).toFixed(n))
t.toString().length<e[0].length&&(o=t,l="px")}a=r?gb(o):o.toString(),s&&"px"===l&&(l=""),t.push(a+l)}else a?t.push("new"):o&&t.push(o)}return t.join(" ")}
return{element:{enter:e=>{null!=e.attributes.points&&(e.attributes.points=o(e.attributes.points)),null!=e.attributes["enable-background"]&&(e.attributes["enable-background"]=o(e.attributes["enable-background"])),null!=e.attributes.viewBox&&(e.attributes.viewBox=o(e.attributes.viewBox)),null!=e.attributes["stroke-dasharray"]&&(e.attributes["stroke-dasharray"]=o(e.attributes["stroke-dasharray"])),null!=e.attributes.dx&&(e.attributes.dx=o(e.attributes.dx)),null!=e.attributes.dy&&(e.attributes.dy=o(e.attributes.dy)),null!=e.attributes.x&&(e.attributes.x=o(e.attributes.x)),null!=e.attributes.y&&(e.attributes.y=o(e.attributes.y))}}}},name:"cleanupListOfValues"})
var Wv=Object.freeze({__proto__:null,description:"converts one-stop (single color) gradients to a plain color",fn:e=>{const t=Zy(e),n=new Set,r=new Map,s=new Map
let i=0
return{element:{enter:(o,a)=>{if(null!=o.attributes["xlink:href"]&&i++,"defs"===o.name)return r.set(o,a),void 0
if("linearGradient"!==o.name&&"radialGradient"!==o.name)return
const l=o.children.filter(e=>"element"===e.type&&"stop"===e.name),c=o.attributes["xlink:href"]||o.attributes.href,u=0===l.length&&null!=c&&c.startsWith("#")?wt(e,c):o
if(null==u||"element"!==u.type)return s.set(o,a),void 0
const h=u.children.filter(e=>"element"===e.type&&"stop"===e.name)
if(1!==h.length||"element"!==h[0].type)return
let f
"element"===a.type&&"defs"===a.name&&n.add(a),s.set(o,a)
const p=Jy(t,h[0])["stop-color"]
null!=p&&"static"===p.type&&(f=p.value)
const d=`url(#${o.attributes.id})`,m=[...Ut].map(e=>`[${e}="${d}"]`).join(","),g=St(e,m)
for(const e of g)if("element"===e.type)for(const t of Ut)e.attributes[t]===d&&(null!=f?e.attributes[t]=f:delete e.attributes[t])
const y=St(e,`[style*=${d}]`)
for(const e of y)"element"===e.type&&(e.attributes.style=e.attributes.style.replace(d,f||Dt.presentation["stop-color"]))},exit:e=>{if("svg"===e.name){for(const[e,t]of s.entries())null!=e.attributes["xlink:href"]&&i--,Ct(e,t)
0===i&&delete e.attributes["xmlns:xlink"]
for(const[e,t]of r.entries())n.has(e)&&0===e.children.length&&Ct(e,t)}}}}},name:"convertOneStopGradients"})
const Vv=(...e)=>"(?:"+e.join("|")+")",$v=Nt.presentation,Yv="\\\\(?:[0-9a-f]{1,6}\\s?|\\r\\n|.)",Xv="\\s*("+Vv("[^:;\\\\]",Yv)+"*?)\\s*",Hv="'(?:[^'\\n\\r\\\\]|"+Yv+")*?(?:'|$)",Qv='"(?:[^"\\n\\r\\\\]|'+Yv+')*?(?:"|$)',Kv=new RegExp("^"+Vv(Hv,Qv)+"$"),Zv="\\("+Vv("[^'\"()\\\\]+",Yv,Hv,Qv)+"*?\\)",Jv="\\s*("+Vv("[^!'\"();\\\\]+?",Yv,Hv,Qv,Zv,"[^;]*?")+"*?)",eS=new RegExp(Xv+":"+Jv+"(\\s*!important(?![-(\\w]))?\\s*(?:;\\s*|$)","ig"),tS=new RegExp(Vv(Yv,Hv,Qv,"/\\*[^]*?\\*/"),"ig")
var nS=Object.freeze({__proto__:null,description:"converts style to attributes",fn:(e,t)=>{const{keepImportant:n=!1}=t
return{element:{enter:e=>{if(null!=e.attributes.style){let r=[]
const s={},i=e.attributes.style.replace(tS,e=>"/"==e[0]?"":"\\"==e[0]&&/[-g-z]/i.test(e[1])?e[1]:e)
eS.lastIndex=0
for(var t;t=eS.exec(i);)n&&t[3]||r.push([t[1],t[2]])
r.length&&(r=r.filter(function(e){if(e[0]){const t=e[0].toLowerCase()
let n=e[1]
if(Kv.test(n)&&(n=n.slice(1,-1)),$v.has(t))return s[t]=n,!1}return!0}),Object.assign(e.attributes,s),r.length?e.attributes.style=r.map(e=>e.join(":")).join(";"):delete e.attributes.style)}}}}},name:"convertStyleToAttrs"})
const rS=(e,t)=>{const n=e(t)
return t.startsWith(n)?t:n+t},sS=(e,t)=>t.startsWith("#")?"#"+rS(e,t.slice(1)):null
var iS=Object.freeze({__proto__:null,description:"prefix IDs",fn:(e,t,n)=>{const{delim:r="__",prefix:s,prefixIds:i=!0,prefixClassNames:o=!0}=t,a=new Map
return{element:{enter:e=>{const t=t=>((e,t,n,r,s,i)=>{if("function"==typeof r){let o=i.get(e)
return null!=o||(o=r(t,n)+s,i.set(e,o)),o}return"string"==typeof r?r+s:!1===r?"":null!=n.path&&n.path.length>0?(e=>{const t=/[/\\]?([^/\\]+)$/.exec(e)
return t?t[1]:""})(n.path).replace(/[. ]/g,"_")+s:"prefix"+s})(t,e,n,s,r,a)
if("style"===e.name){if(0===e.children.length)return
for(const n of e.children){if("text"!==n.type&&"cdata"!==n.type)continue
const e=n.value
let r
try{r=dc(e,{parseValue:!0,parseCustomProperty:!1})}catch{return}bc(r,e=>{if(i&&"IdSelector"===e.type||o&&"ClassSelector"===e.type)return e.name=rS(t,e.name),void 0
if("Url"===e.type&&e.value.length>0){const r=sS(t,(n=e.value).startsWith('"')&&n.endsWith('"')||n.startsWith("'")&&n.endsWith("'")?n.slice(1,-1):n)
null!=r&&(e.value=r)}var n}),n.value=mc(r)}}i&&null!=e.attributes.id&&0!==e.attributes.id.length&&(e.attributes.id=rS(t,e.attributes.id)),o&&null!=e.attributes.class&&0!==e.attributes.class.length&&(e.attributes.class=e.attributes.class.split(/\s+/).map(e=>rS(t,e)).join(" "))
for(const n of["href","xlink:href"])if(null!=e.attributes[n]&&0!==e.attributes[n].length){const r=sS(t,e.attributes[n])
null!=r&&(e.attributes[n]=r)}for(const n of Rt)null!=e.attributes[n]&&0!==e.attributes[n].length&&(e.attributes[n]=e.attributes[n].replace(/\burl\((["'])?(#.+?)\1\)/gi,(e,n,r)=>{const s=sS(t,r)
return null==s?e:`url(${s})`}))
for(const n of["begin","end"])if(null!=e.attributes[n]&&0!==e.attributes[n].length){const r=e.attributes[n].split(/\s*;\s+/).map(e=>{if(e.endsWith(".end")||e.endsWith(".start")){const[n,r]=e.split(".")
return`${rS(t,n)}.${r}`}return e})
e.attributes[n]=r.join("; ")}}}}},name:"prefixIds"})
var oS=Object.freeze({__proto__:null,description:"removes attributes of elements that match a css selector",fn:(e,t)=>{const n=Array.isArray(t.selectors)?t.selectors:[t]
for(const{selector:t,attributes:r}of n){const n=St(e,t)
for(const e of n)if("element"===e.type)if(Array.isArray(r))for(const t of r)delete e.attributes[t]
else delete e.attributes[r]}return{}},name:"removeAttributesBySelector"})
var aS=Object.freeze({__proto__:null,description:"removes specified attributes",fn:(e,t)=>{if(void 0===t.attrs)return console.warn('Warning: The plugin "removeAttrs" requires the "attrs" parameter.\nIt should have a pattern to remove, otherwise the plugin is a noop.\nConfig example:\n\nplugins: [\n  {\n    name: "removeAttrs",\n    params: {\n      attrs: "(fill|stroke)"\n    }\n  }\n]\n'),null
const n="string"==typeof t.elemSeparator?t.elemSeparator:":",r="boolean"==typeof t.preserveCurrentColor&&t.preserveCurrentColor,s=Array.isArray(t.attrs)?t.attrs:[t.attrs]
return{element:{enter:e=>{for(let t of s){t.includes(n)?t.split(n).length<3&&(t=[t,".*"].join(n)):t=[".*",t,".*"].join(n)
const s=t.split(n).map(e=>("*"===e&&(e=".*"),new RegExp(["^",e,"$"].join(""),"i")))
if(s[0].test(e.name))for(const[t,n]of Object.entries(e.attributes)){const i="currentcolor"===n.toLowerCase()
!(r&&"fill"==t&&i)&&!(r&&"stroke"==t&&i)&&s[1].test(t)&&s[2].test(n)&&delete e.attributes[t]}}}}}},name:"removeAttrs"})
var lS=Object.freeze({__proto__:null,description:"removes width and height in presence of viewBox (opposite to removeViewBox)",fn:()=>({element:{enter:e=>{if("svg"===e.name)if(null!=e.attributes.viewBox)delete e.attributes.width,delete e.attributes.height
else if(null!=e.attributes.width&&null!=e.attributes.height&&!1===Number.isNaN(Number(e.attributes.width))&&!1===Number.isNaN(Number(e.attributes.height))){const t=Number(e.attributes.width),n=Number(e.attributes.height)
e.attributes.viewBox=`0 0 ${t} ${n}`,delete e.attributes.width,delete e.attributes.height}}}}),name:"removeDimensions"})
var cS=Object.freeze({__proto__:null,description:"removes arbitrary elements by ID or className (disabled by default)",fn:(e,t)=>{const n=null==t.id?[]:Array.isArray(t.id)?t.id:[t.id],r=null==t.class?[]:Array.isArray(t.class)?t.class:[t.class]
return{element:{enter:(e,t)=>{if(null!=e.attributes.id&&0!==n.length&&n.includes(e.attributes.id)&&Ct(e,t),e.attributes.class&&0!==r.length){const n=e.attributes.class.split(" ")
for(const s of r)if(n.includes(s)){Ct(e,t)
break}}}}}},name:"removeElementsByAttr"})
var uS=Object.freeze({__proto__:null,description:"removes elements that are drawn outside of the viewBox (disabled by default)",fn:()=>{let e=null
return{element:{enter:(t,r)=>{if("svg"===t.name&&"root"===r.type){let n=""
null!=t.attributes.viewBox?n=t.attributes.viewBox:null!=t.attributes.height&&null!=t.attributes.width&&(n=`0 0 ${t.attributes.width} ${t.attributes.height}`),n=n.replace(/[,+]|px/g," ").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")
const r=/^(-?\d*\.?\d+) (-?\d*\.?\d+) (\d*\.?\d+) (\d*\.?\d+)$/.exec(n)
if(null==r)return
const s=Number.parseFloat(r[1]),i=Number.parseFloat(r[2]),o=Number.parseFloat(r[3]),a=Number.parseFloat(r[4])
e={left:s,top:i,right:s+o,bottom:i+a,width:o,height:a}}if(null!=t.attributes.transform)return n
if("path"===t.name&&null!=t.attributes.d&&null!=e){const n=Zb(t.attributes.d)
let s=!1
for(const t of n)if("M"===t.command){const[n,r]=t.args
n>=e.left&&n<=e.right&&r>=e.top&&r<=e.bottom&&(s=!0)}if(s)return
2===n.length&&n.push({command:"z",args:[]})
const{left:i,top:o,width:a,height:l}=e
!1===bk([{command:"M",args:[i,o]},{command:"h",args:[a]},{command:"v",args:[l]},{command:"H",args:[i]},{command:"z",args:[]}],n)&&Ct(t,r)}}}}},name:"removeOffCanvasPaths"})
var hS=Object.freeze({__proto__:null,description:"removes raster images (disabled by default)",fn:()=>({element:{enter:(e,t)=>{"image"===e.name&&null!=e.attributes["xlink:href"]&&/(\.|image\/)(jpe?g|png|gif)/.test(e.attributes["xlink:href"])&&Ct(e,t)}}}),name:"removeRasterImages"})
const fS=[...Nt.animationEvent,...Nt.documentEvent,...Nt.documentElementEvent,...Nt.globalEvent,...Nt.graphicalEvent]
var pS=Object.freeze({__proto__:null,description:"removes scripts (disabled by default)",fn:()=>({element:{enter:(e,t)=>{if("script"===e.name)return Ct(e,t),void 0
for(const t of fS)null!=e.attributes[t]&&delete e.attributes[t]},exit:(e,t)=>{if("a"===e.name)for(const n of Object.keys(e.attributes))if("href"===n||n.endsWith(":href")){if(null==e.attributes[n]||!e.attributes[n].trimStart().startsWith("javascript:"))continue
const r=t.children.indexOf(e),s=e.children.filter(e=>"text"!==e.type)
t.children.splice(r,1,...s)}}}}),name:"removeScripts"})
var dS=Object.freeze({__proto__:null,description:"removes <style> element (disabled by default)",fn:()=>({element:{enter:(e,t)=>{"style"===e.name&&Ct(e,t)}}}),name:"removeStyleElement"})
var mS=Object.freeze({__proto__:null,description:"removes <title>",fn:()=>({element:{enter:(e,t)=>{"title"===e.name&&Ct(e,t)}}}),name:"removeTitle"})
const gS=new Set(["pattern","svg","symbol"])
var yS=Object.freeze({__proto__:null,description:"removes viewBox attribute when possible",fn:()=>({element:{enter:(e,t)=>{if(gS.has(e.name)&&null!=e.attributes.viewBox&&null!=e.attributes.width&&null!=e.attributes.height){if("svg"===e.name&&"root"!==t.type)return
const n=e.attributes.viewBox.split(/[ ,]+/g)
"0"===n[0]&&"0"===n[1]&&e.attributes.width.replace(/px$/,"")===n[2]&&e.attributes.height.replace(/px$/,"")===n[3]&&delete e.attributes.viewBox}}}}),name:"removeViewBox"})
const bS="http://www.w3.org/1999/xlink",kS={new:"_blank",replace:"_self"},vS=new Set(["cursor","filter","font-face-uri","glyphRef","tref"]),SS=(e,t,n)=>t.map(e=>`${e}:${n}`).filter(t=>null!=e.attributes[t])
var wS=Object.freeze({__proto__:null,description:"remove xlink namespace and replaces attributes with the SVG 2 equivalent where applicable",fn:(e,t)=>{const{includeLegacy:n}=t,r=[],s=[],i=[]
return{element:{enter:e=>{for(const[t,n]of Object.entries(e.attributes))if(t.startsWith("xmlns:")){const e=t.split(":",2)[1]
if(n===bS){r.push(e)
continue}r.includes(e)&&s.push(e)}if(s.some(e=>r.includes(e)))return
const t=SS(e,r,"show")
let o=null!=e.attributes.target
for(let n=t.length-1;n>=0;n--){const r=t[n],s=e.attributes[r],i=kS[s]
o||null==i?delete e.attributes[r]:(i!==jt[e.name]?.defaults?.target&&(e.attributes.target=i),delete e.attributes[r],o=!0)}const a=SS(e,r,"title")
for(let t=a.length-1;t>=0;t--){const n=a[t],r=e.attributes[n]
if(e.children.filter(e=>"element"===e.type&&"title"===e.name).length>0){delete e.attributes[n]
continue}const s={type:"element",name:"title",attributes:{},children:[{type:"text",value:r}]}
Object.defineProperty(s,"parentNode",{writable:!0,value:e}),e.children.unshift(s),delete e.attributes[n]}const l=SS(e,r,"href")
if(l.length>0&&vS.has(e.name)&&!n)return l.map(e=>e.split(":",1)[0]).forEach(e=>i.push(e)),void 0
for(let t=l.length-1;t>=0;t--){const n=l[t],r=e.attributes[n]
null==e.attributes.href?(e.attributes.href=r,delete e.attributes[n]):delete e.attributes[n]}},exit:e=>{for(const[t,o]of Object.entries(e.attributes)){const[a,l]=t.split(":",2)
if(!r.includes(a)||s.includes(a)||i.includes(a)||n){if(t.startsWith("xmlns:")&&!i.includes(l)){if(o===bS){const n=r.indexOf(l)
r.splice(n,1),delete e.attributes[t]
continue}if(s.includes(a)){const e=s.indexOf(l)
s.splice(e,1)}}}else delete e.attributes[t]}}}}},name:"removeXlink"})
var xS=Object.freeze({__proto__:null,description:"removes xmlns attribute (for inline svg, disabled by default)",fn:()=>({element:{enter:e=>{"svg"===e.name&&delete e.attributes.xmlns}}}),name:"removeXMLNS"})
var CS=Object.freeze({__proto__:null,description:"Finds <path> elements with the same d, fill, and stroke, and converts them to <use> elements referencing a single <path> def.",fn:e=>{const t=Zy(e),n=new Map
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
for(const t of r){if(delete t.attributes.d,delete t.attributes.stroke,delete t.attributes.fill,i.children.includes(t)&&0===t.children.length){if(0===Object.keys(t.attributes).length){Ct(t,i)
continue}if(1===Object.keys(t.attributes).length&&null!=t.attributes.id){Ct(t,i)
const r=`[xlink\\:href=#${t.attributes.id}], [href=#${t.attributes.id}]`
for(const t of St(e,r))if("element"===t.type)for(const e of["href","xlink:href"])null!=t.attributes[e]&&(t.attributes[e]="#"+n.attributes.id)
continue}}t.name="use",t.attributes["xlink:href"]="#"+n.attributes.id}}0!==i.children.length&&(null==e.attributes["xmlns:xlink"]&&(e.attributes["xmlns:xlink"]="http://www.w3.org/1999/xlink"),null==r&&e.children.unshift(i))}}}}},name:"reusePaths"})
const AS=Object.freeze([Rv,Fv,zv,lb,$b,_b,qv,Lb,fk,Rb,ak,Wv,Sv,ok,nS,Tv,hb,Lv,cb,Sb,lk,uk,iS,oS,aS,Et,nb,Iv,lS,At,sb,cS,Ev,Ov,sk,rk,rb,Ub,uS,hS,pS,dS,mS,Bb,Nv,Eb,qb,yS,wS,xS,_t,CS,Dv,Mv])
var _S={}
void!function(e){e.parser=function(e,t){return new s(e,t)},e.SAXParser=s,e.SAXStream=o,e.createStream=function(e,t){return new o(e,t)},e.MAX_BUFFER_LENGTH=65536
var n,r=["comment","sgmlDecl","textNode","tagName","doctype","procInstName","procInstBody","entity","attribName","attribValue","cdata","script"]
function s(t,n){if(!(this instanceof s))return new s(t,n)
var i=this
!function(e){for(var t=0,n=r.length;t<n;t++)e[r[t]]=""}(i),i.q=i.c="",i.bufferCheckPosition=e.MAX_BUFFER_LENGTH,i.opt=n||{},i.opt.lowercase=i.opt.lowercase||i.opt.lowercasetags,i.looseCase=i.opt.lowercase?"toLowerCase":"toUpperCase",i.tags=[],i.closed=i.closedRoot=i.sawRoot=!1,i.tag=i.error=null,i.strict=!!t,i.noscript=!(!t&&!i.opt.noscript),i.state=C.BEGIN,i.strictEntities=i.opt.strictEntities,i.ENTITIES=i.strictEntities?Object.create(e.XML_ENTITIES):Object.create(e.ENTITIES),i.attribList=[],i.opt.xmlns&&(i.ns=Object.create(h)),void 0===i.opt.unquotedAttributeValues&&(i.opt.unquotedAttributeValues=!t),i.trackPosition=!1!==i.opt.position,i.trackPosition&&(i.position=i.line=i.column=0),_(i,"onready")}e.EVENTS=["text","processinginstruction","sgmldeclaration","doctype","comment","opentagstart","attribute","opentag","closetag","opencdata","cdata","closecdata","error","end","ready","script","opennamespace","closenamespace"],Object.create||(Object.create=function(e){function t(){}return t.prototype=e,new t}),Object.keys||(Object.keys=function(e){var t=[]
for(var n in e)e.hasOwnProperty(n)&&t.push(n)
return t}),s.prototype={end:function(){L(this)},write:function(t){var n=this
if(this.error)throw this.error
if(n.closed)return P(n,"Cannot write after close. Assign an onready handler.")
if(null===t)return L(n)
"object"==typeof t&&(t=t.toString())
for(var s=0,i="";i=G(t,s++),n.c=i,i;)switch(n.trackPosition&&(n.position++,"\n"===i?(n.line++,n.column=0):n.column++),n.state){case C.BEGIN:if(n.state=C.BEGIN_WHITESPACE,"\ufeff"===i)continue
z(n,i)
continue
case C.BEGIN_WHITESPACE:z(n,i)
continue
case C.TEXT:if(n.sawRoot&&!n.closedRoot){for(var o=s-1;i&&"<"!==i&&"&"!==i;)(i=G(t,s++))&&n.trackPosition&&(n.position++,"\n"===i?(n.line++,n.column=0):n.column++)
n.textNode+=t.substring(o,s-1)}"<"!==i||n.sawRoot&&n.closedRoot&&!n.strict?(g(i)||n.sawRoot&&!n.closedRoot||N(n,"Text data outside of root node."),"&"===i?n.state=C.TEXT_ENTITY:n.textNode+=i):(n.state=C.OPEN_WAKA,n.startTagPosition=n.position)
continue
case C.SCRIPT:"<"===i?n.state=C.SCRIPT_ENDING:n.script+=i
continue
case C.SCRIPT_ENDING:"/"===i?n.state=C.CLOSE_TAG:(n.script+="<"+i,n.state=C.SCRIPT)
continue
case C.OPEN_WAKA:if("!"===i)n.state=C.SGML_DECL,n.sgmlDecl=""
else if(g(i));else if(k(f,i))n.state=C.OPEN_TAG,n.tagName=i
else if("/"===i)n.state=C.CLOSE_TAG,n.tagName=""
else if("?"===i)n.state=C.PROC_INST,n.procInstName=n.procInstBody=""
else{if(N(n,"Unencoded <"),n.startTagPosition+1<n.position){var c=n.position-n.startTagPosition
i=new Array(c).join(" ")+i}n.textNode+="<"+i,n.state=C.TEXT}continue
case C.SGML_DECL:if(n.sgmlDecl+i==="--"){n.state=C.COMMENT,n.comment="",n.sgmlDecl=""
continue}n.doctype&&!0!==n.doctype&&n.sgmlDecl?(n.state=C.DOCTYPE_DTD,n.doctype+="<!"+n.sgmlDecl+i,n.sgmlDecl=""):(n.sgmlDecl+i).toUpperCase()===a?(T(n,"onopencdata"),n.state=C.CDATA,n.sgmlDecl="",n.cdata=""):(n.sgmlDecl+i).toUpperCase()===l?(n.state=C.DOCTYPE,(n.doctype||n.sawRoot)&&N(n,"Inappropriately located doctype declaration"),n.doctype="",n.sgmlDecl=""):">"===i?(T(n,"onsgmldeclaration",n.sgmlDecl),n.sgmlDecl="",n.state=C.TEXT):y(i)?(n.state=C.SGML_DECL_QUOTED,n.sgmlDecl+=i):n.sgmlDecl+=i
continue
case C.SGML_DECL_QUOTED:i===n.q&&(n.state=C.SGML_DECL,n.q=""),n.sgmlDecl+=i
continue
case C.DOCTYPE:">"===i?(n.state=C.TEXT,T(n,"ondoctype",n.doctype),n.doctype=!0):(n.doctype+=i,"["===i?n.state=C.DOCTYPE_DTD:y(i)&&(n.state=C.DOCTYPE_QUOTED,n.q=i))
continue
case C.DOCTYPE_QUOTED:n.doctype+=i,i===n.q&&(n.q="",n.state=C.DOCTYPE)
continue
case C.DOCTYPE_DTD:"]"===i?(n.doctype+=i,n.state=C.DOCTYPE):"<"===i?(n.state=C.OPEN_WAKA,n.startTagPosition=n.position):y(i)?(n.doctype+=i,n.state=C.DOCTYPE_DTD_QUOTED,n.q=i):n.doctype+=i
continue
case C.DOCTYPE_DTD_QUOTED:n.doctype+=i,i===n.q&&(n.state=C.DOCTYPE_DTD,n.q="")
continue
case C.COMMENT:"-"===i?n.state=C.COMMENT_ENDING:n.comment+=i
continue
case C.COMMENT_ENDING:"-"===i?(n.state=C.COMMENT_ENDED,n.comment=O(n.opt,n.comment),n.comment&&T(n,"oncomment",n.comment),n.comment=""):(n.comment+="-"+i,n.state=C.COMMENT)
continue
case C.COMMENT_ENDED:">"!==i?(N(n,"Malformed comment"),n.comment+="--"+i,n.state=C.COMMENT):n.doctype&&!0!==n.doctype?n.state=C.DOCTYPE_DTD:n.state=C.TEXT
continue
case C.CDATA:"]"===i?n.state=C.CDATA_ENDING:n.cdata+=i
continue
case C.CDATA_ENDING:"]"===i?n.state=C.CDATA_ENDING_2:(n.cdata+="]"+i,n.state=C.CDATA)
continue
case C.CDATA_ENDING_2:">"===i?(n.cdata&&T(n,"oncdata",n.cdata),T(n,"onclosecdata"),n.cdata="",n.state=C.TEXT):"]"===i?n.cdata+="]":(n.cdata+="]]"+i,n.state=C.CDATA)
continue
case C.PROC_INST:"?"===i?n.state=C.PROC_INST_ENDING:g(i)?n.state=C.PROC_INST_BODY:n.procInstName+=i
continue
case C.PROC_INST_BODY:if(!n.procInstBody&&g(i))continue
"?"===i?n.state=C.PROC_INST_ENDING:n.procInstBody+=i
continue
case C.PROC_INST_ENDING:">"===i?(T(n,"onprocessinginstruction",{name:n.procInstName,body:n.procInstBody}),n.procInstName=n.procInstBody="",n.state=C.TEXT):(n.procInstBody+="?"+i,n.state=C.PROC_INST_BODY)
continue
case C.OPEN_TAG:k(p,i)?n.tagName+=i:(D(n),">"===i?I(n):"/"===i?n.state=C.OPEN_TAG_SLASH:(g(i)||N(n,"Invalid character in tag name"),n.state=C.ATTRIB))
continue
case C.OPEN_TAG_SLASH:">"===i?(I(n,!0),R(n)):(N(n,"Forward-slash in opening tag not followed by >"),n.state=C.ATTRIB)
continue
case C.ATTRIB:if(g(i))continue
">"===i?I(n):"/"===i?n.state=C.OPEN_TAG_SLASH:k(f,i)?(n.attribName=i,n.attribValue="",n.state=C.ATTRIB_NAME):N(n,"Invalid attribute name")
continue
case C.ATTRIB_NAME:"="===i?n.state=C.ATTRIB_VALUE:">"===i?(N(n,"Attribute without value"),n.attribValue=n.attribName,j(n),I(n)):g(i)?n.state=C.ATTRIB_NAME_SAW_WHITE:k(p,i)?n.attribName+=i:N(n,"Invalid attribute name")
continue
case C.ATTRIB_NAME_SAW_WHITE:if("="===i)n.state=C.ATTRIB_VALUE
else{if(g(i))continue
N(n,"Attribute without value"),n.tag.attributes[n.attribName]="",n.attribValue="",T(n,"onattribute",{name:n.attribName,value:""}),n.attribName="",">"===i?I(n):k(f,i)?(n.attribName=i,n.state=C.ATTRIB_NAME):(N(n,"Invalid attribute name"),n.state=C.ATTRIB)}continue
case C.ATTRIB_VALUE:if(g(i))continue
y(i)?(n.q=i,n.state=C.ATTRIB_VALUE_QUOTED):(n.opt.unquotedAttributeValues||P(n,"Unquoted attribute value"),n.state=C.ATTRIB_VALUE_UNQUOTED,n.attribValue=i)
continue
case C.ATTRIB_VALUE_QUOTED:if(i!==n.q){"&"===i?n.state=C.ATTRIB_VALUE_ENTITY_Q:n.attribValue+=i
continue}j(n),n.q="",n.state=C.ATTRIB_VALUE_CLOSED
continue
case C.ATTRIB_VALUE_CLOSED:g(i)?n.state=C.ATTRIB:">"===i?I(n):"/"===i?n.state=C.OPEN_TAG_SLASH:k(f,i)?(N(n,"No whitespace between attributes"),n.attribName=i,n.attribValue="",n.state=C.ATTRIB_NAME):N(n,"Invalid attribute name")
continue
case C.ATTRIB_VALUE_UNQUOTED:if(!b(i)){"&"===i?n.state=C.ATTRIB_VALUE_ENTITY_U:n.attribValue+=i
continue}j(n),">"===i?I(n):n.state=C.ATTRIB
continue
case C.CLOSE_TAG:if(n.tagName)">"===i?R(n):k(p,i)?n.tagName+=i:n.script?(n.script+="</"+n.tagName,n.tagName="",n.state=C.SCRIPT):(g(i)||N(n,"Invalid tagname in closing tag"),n.state=C.CLOSE_TAG_SAW_WHITE)
else{if(g(i))continue
v(f,i)?n.script?(n.script+="</"+i,n.state=C.SCRIPT):N(n,"Invalid tagname in closing tag."):n.tagName=i}continue
case C.CLOSE_TAG_SAW_WHITE:if(g(i))continue
">"===i?R(n):N(n,"Invalid characters in closing tag")
continue
case C.TEXT_ENTITY:case C.ATTRIB_VALUE_ENTITY_Q:case C.ATTRIB_VALUE_ENTITY_U:var u,h
switch(n.state){case C.TEXT_ENTITY:u=C.TEXT,h="textNode"
break
case C.ATTRIB_VALUE_ENTITY_Q:u=C.ATTRIB_VALUE_QUOTED,h="attribValue"
break
case C.ATTRIB_VALUE_ENTITY_U:u=C.ATTRIB_VALUE_UNQUOTED,h="attribValue"}if(";"===i){var S=F(n)
n.opt.unparsedEntities&&!Object.values(e.XML_ENTITIES).includes(S)?(n.entity="",n.state=u,n.write(S)):(n[h]+=S,n.entity="",n.state=u)}else k(n.entity.length?m:d,i)?n.entity+=i:(N(n,"Invalid character in entity name"),n[h]+="&"+n.entity+i,n.entity="",n.state=u)
continue
default:throw new Error(n,"Unknown state: "+n.state)}return n.position>=n.bufferCheckPosition&&!function(t){for(var n=Math.max(e.MAX_BUFFER_LENGTH,10),s=0,i=0,o=r.length;i<o;i++){var a=t[r[i]].length
if(a>n)switch(r[i]){case"textNode":E(t)
break
case"cdata":T(t,"oncdata",t.cdata),t.cdata=""
break
case"script":T(t,"onscript",t.script),t.script=""
break
default:P(t,"Max buffer length exceeded: "+r[i])}s=Math.max(s,a)}var l=e.MAX_BUFFER_LENGTH-s
t.bufferCheckPosition=l+t.position}(n),n},resume:function(){return this.error=null,this},close:function(){return this.write(null)},flush:function(){var e
E(e=this),""!==e.cdata&&(T(e,"oncdata",e.cdata),e.cdata=""),void(""!==e.script&&(T(e,"onscript",e.script),e.script=""))}}
try{n=require("stream").Stream}catch(e){n=function(){}}n||(n=function(){})
var i=e.EVENTS.filter(function(e){return"error"!==e&&"end"!==e})
function o(e,t){if(!(this instanceof o))return new o(e,t)
n.apply(this),this._parser=new s(e,t),this.writable=!0,this.readable=!0
var r=this
this._parser.onend=function(){r.emit("end")},this._parser.onerror=function(e){r.emit("error",e),r._parser.error=null},this._decoder=null,i.forEach(function(e){Object.defineProperty(r,"on"+e,{get:function(){return r._parser["on"+e]},set:function(t){if(!t)return r.removeAllListeners(e),r._parser["on"+e]=t,t
r.on(e,t)},enumerable:!0,configurable:!1})})}o.prototype=Object.create(n.prototype,{constructor:{value:o}}),o.prototype.write=function(e){if("function"==typeof Buffer&&"function"==typeof Buffer.isBuffer&&Buffer.isBuffer(e)){if(!this._decoder){var n=t.StringDecoder
this._decoder=new n("utf8")}e=this._decoder.write(e)}return this._parser.write(e.toString()),this.emit("data",e),!0},o.prototype.end=function(e){return e&&e.length&&this.write(e),this._parser.end(),!0},o.prototype.on=function(e,t){var r=this
return r._parser["on"+e]||-1===i.indexOf(e)||(r._parser["on"+e]=function(){var t=1===arguments.length?[arguments[0]]:Array.apply(null,arguments)
t.splice(0,0,e),r.emit.apply(r,t)}),n.prototype.on.call(r,e,t)}
var a="[CDATA[",l="DOCTYPE",c="http://www.w3.org/XML/1998/namespace",u="http://www.w3.org/2000/xmlns/",h={xml:c,xmlns:u},f=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,p=/[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/,d=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/,m=/[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/
function g(e){return" "===e||"\n"===e||"\r"===e||"\t"===e}function y(e){return'"'===e||"'"===e}function b(e){return">"===e||g(e)}function k(e,t){return e.test(t)}function v(e,t){return!k(e,t)}var S,w,x,C=0
for(var A in e.STATE={BEGIN:C++,BEGIN_WHITESPACE:C++,TEXT:C++,TEXT_ENTITY:C++,OPEN_WAKA:C++,SGML_DECL:C++,SGML_DECL_QUOTED:C++,DOCTYPE:C++,DOCTYPE_QUOTED:C++,DOCTYPE_DTD:C++,DOCTYPE_DTD_QUOTED:C++,COMMENT_STARTING:C++,COMMENT:C++,COMMENT_ENDING:C++,COMMENT_ENDED:C++,CDATA:C++,CDATA_ENDING:C++,CDATA_ENDING_2:C++,PROC_INST:C++,PROC_INST_BODY:C++,PROC_INST_ENDING:C++,OPEN_TAG:C++,OPEN_TAG_SLASH:C++,ATTRIB:C++,ATTRIB_NAME:C++,ATTRIB_NAME_SAW_WHITE:C++,ATTRIB_VALUE:C++,ATTRIB_VALUE_QUOTED:C++,ATTRIB_VALUE_CLOSED:C++,ATTRIB_VALUE_UNQUOTED:C++,ATTRIB_VALUE_ENTITY_Q:C++,ATTRIB_VALUE_ENTITY_U:C++,CLOSE_TAG:C++,CLOSE_TAG_SAW_WHITE:C++,SCRIPT:C++,SCRIPT_ENDING:C++},e.XML_ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'"},e.ENTITIES={amp:"&",gt:">",lt:"<",quot:'"',apos:"'",AElig:198,Aacute:193,Acirc:194,Agrave:192,Aring:197,Atilde:195,Auml:196,Ccedil:199,ETH:208,Eacute:201,Ecirc:202,Egrave:200,Euml:203,Iacute:205,Icirc:206,Igrave:204,Iuml:207,Ntilde:209,Oacute:211,Ocirc:212,Ograve:210,Oslash:216,Otilde:213,Ouml:214,THORN:222,Uacute:218,Ucirc:219,Ugrave:217,Uuml:220,Yacute:221,aacute:225,acirc:226,aelig:230,agrave:224,aring:229,atilde:227,auml:228,ccedil:231,eacute:233,ecirc:234,egrave:232,eth:240,euml:235,iacute:237,icirc:238,igrave:236,iuml:239,ntilde:241,oacute:243,ocirc:244,ograve:242,oslash:248,otilde:245,ouml:246,szlig:223,thorn:254,uacute:250,ucirc:251,ugrave:249,uuml:252,yacute:253,yuml:255,copy:169,reg:174,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,ordf:170,laquo:171,not:172,shy:173,macr:175,deg:176,plusmn:177,sup1:185,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,times:215,divide:247,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,fnof:402,circ:710,tilde:732,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,bull:8226,hellip:8230,permil:8240,prime:8242,Prime:8243,lsaquo:8249,rsaquo:8250,oline:8254,frasl:8260,euro:8364,image:8465,weierp:8472,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,int:8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830},Object.keys(e.ENTITIES).forEach(function(t){var n=e.ENTITIES[t],r="number"==typeof n?String.fromCharCode(n):n
e.ENTITIES[t]=r}),e.STATE)e.STATE[e.STATE[A]]=A
function _(e,t,n){e[t]&&e[t](n)}function T(e,t,n){e.textNode&&E(e),_(e,t,n)}function E(e){e.textNode=O(e.opt,e.textNode),e.textNode&&_(e,"ontext",e.textNode),e.textNode=""}function O(e,t){return e.trim&&(t=t.trim()),e.normalize&&(t=t.replace(/\s+/g," ")),t}function P(e,t){return E(e),e.trackPosition&&(t+="\nLine: "+e.line+"\nColumn: "+e.column+"\nChar: "+e.c),t=new Error(t),e.error=t,_(e,"onerror",t),e}function L(e){return e.sawRoot&&!e.closedRoot&&N(e,"Unclosed root tag"),e.state!==C.BEGIN&&e.state!==C.BEGIN_WHITESPACE&&e.state!==C.TEXT&&P(e,"Unexpected end"),E(e),e.c="",e.closed=!0,_(e,"onend"),s.call(e,e.strict,e.opt),e}function N(e,t){if("object"!=typeof e||!(e instanceof s))throw new Error("bad call to strictFail")
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
o<=0xFFFF?n.push(o):(e=0xD800+((o-=0x10000)>>10),t=o%0x400+0xDC00,n.push(e,t)),(r+1===s||n.length>16384)&&(i+=S.apply(null,n),n.length=0)}return i},Object.defineProperty?Object.defineProperty(String,"fromCodePoint",{value:x,configurable:!0,writable:!0}):String.fromCodePoint=x)}(_S)
var TS=ie(_S)
class ES extends Error{constructor(e,t,n,r,s){super(e),this.name="SvgoParserError",this.message=`${s||"<input>"}:${t}:${n}: ${e}`,this.reason=e,this.line=t,this.column=n,this.source=r,Error.captureStackTrace&&Error.captureStackTrace(this,ES)}toString(){const e=this.source.split(/\r?\n/),t=Math.max(this.line-3,0),n=Math.min(this.line+2,e.length),r=String(n).length,s=Math.max(this.column-54,0),i=Math.max(this.column+20,80),o=e.slice(t,n).map((e,n)=>{const o=e.slice(s,i)
let a="",l=""
0!==s&&(a=s>e.length-1?" ":"…"),i<e.length-1&&(l="…")
const c=t+1+n,u=` ${c.toString().padStart(r)} | `
if(c===this.line){const t=u.replace(/[^|]/g," ")
return`>${u}${a}${o}${l}\n ${t+(a+e.slice(s,this.column-1)).replace(/[^\t]/g," ")}^`}return` ${u}${a}${o}${l}`}).join("\n")
return`${this.name}: ${this.message}\n\n${o}\n`}}const OS=/<!ENTITY\s+(\S+)\s+(?:'([^']+)'|"([^"]+)")\s*>/g,PS={strict:!0,trim:!1,normalize:!1,lowercase:!0,xmlns:!0,position:!0,unparsedEntities:!0},LS=(e,t)=>{const n=TS.parser(PS.strict,PS),r={type:"root",children:[]}
let s=r
const i=[r],o=e=>{s.children.push(e)}
return n.ondoctype=t=>{o({type:"doctype",name:"svg",data:{doctype:t}})
const r=t.indexOf("[")
if(r>=0){OS.lastIndex=r
let t=OS.exec(e)
for(;null!=t;)n.ENTITIES[t[1]]=t[2]||t[3],t=OS.exec(e)}},n.onprocessinginstruction=e=>{const t={type:"instruction",name:e.name,value:e.body}
o(t)},n.oncomment=e=>{const t={type:"comment",value:e.trim()}
o(t)},n.oncdata=e=>{o({type:"cdata",value:e})},n.onopentag=e=>{const t={type:"element",name:e.name,attributes:{},children:[]}
for(const[n,r]of Object.entries(e.attributes))t.attributes[n]=r.value
o(t),s=t,i.push(t)},n.ontext=e=>{if("element"===s.type)if(Pt.has(s.name)){o({type:"text",value:e})}else{const t=e.trim()
if(""!==t){o({type:"text",value:t})}}},n.onclosetag=()=>{i.pop(),s=i[i.length-1]},n.onerror=r=>{const s=r.message.split("\n")[0],i=new ES(s,n.line+1,n.column,e,t)
if(-1===r.message.indexOf("Unexpected end"))throw i},n.write(e).close(),r},NS={doctypeStart:"<!DOCTYPE",doctypeEnd:">",procInstStart:"<?",procInstEnd:"?>",tagOpenStart:"<",tagOpenEnd:">",tagCloseStart:"</",tagCloseEnd:">",tagShortStart:"<",tagShortEnd:"/>",attrStart:'="',attrEnd:'"',commentStart:"\x3c!--",commentEnd:"--\x3e",cdataStart:"<![CDATA[",cdataEnd:"]]>",textStart:"",textEnd:"",indent:4,regEntities:/[&'"<>]/g,regValEntities:/[&"<>]/g,encodeEntity:e=>DS[e],pretty:!1,useShortTags:!0,eol:"lf",finalNewline:!1},DS={"&":"&amp;","'":"&apos;",'"':"&quot;",">":"&gt;","<":"&lt;"},MS=(e,t={})=>{const n={...NS,...t},r=n.indent
let s="    "
"number"==typeof r&&!1===Number.isNaN(r)?s=r<0?"\t":" ".repeat(r):"string"==typeof r&&(s=r)
const i={indent:s,textContext:null,indentLevel:0},o="crlf"===n.eol?"\r\n":"\n"
n.pretty&&(n.doctypeEnd+=o,n.procInstEnd+=o,n.commentEnd+=o,n.cdataEnd+=o,n.tagShortEnd+=o,n.tagOpenEnd+=o,n.tagCloseEnd+=o,n.textEnd+=o)
let a=jS(e,n,i)
return n.finalNewline&&a.length>0&&!a.endsWith("\n")&&(a+=o),a},jS=(e,t,n)=>{let r=""
n.indentLevel++
for(const s of e.children)switch(s.type){case"element":r+=BS(s,t,n)
break
case"text":r+=qS(s,t,n)
break
case"doctype":r+=RS(s,t)
break
case"instruction":r+=FS(s,t)
break
case"comment":r+=zS(s,t)
break
case"cdata":r+=GS(s,t,n)}return n.indentLevel--,r},IS=(e,t)=>{let n=""
return e.pretty&&null==t.textContext&&(n=t.indent.repeat(t.indentLevel-1)),n},RS=(e,t)=>t.doctypeStart+e.data.doctype+t.doctypeEnd,FS=(e,t)=>t.procInstStart+e.name+" "+e.value+t.procInstEnd,zS=(e,t)=>t.commentStart+e.value+t.commentEnd,GS=(e,t,n)=>IS(t,n)+t.cdataStart+e.value+t.cdataEnd,BS=(e,t,n)=>{if(0===e.children.length)return t.useShortTags?IS(t,n)+t.tagShortStart+e.name+US(e,t)+t.tagShortEnd:IS(t,n)+t.tagShortStart+e.name+US(e,t)+t.tagOpenEnd+t.tagCloseStart+e.name+t.tagCloseEnd
let r=t.tagOpenStart,s=t.tagOpenEnd,i=t.tagCloseStart,o=t.tagCloseEnd,a=IS(t,n),l=IS(t,n)
n.textContext?(r=NS.tagOpenStart,s=NS.tagOpenEnd,i=NS.tagCloseStart,o=NS.tagCloseEnd,a=""):Pt.has(e.name)&&(s=NS.tagOpenEnd,i=NS.tagCloseStart,l="",n.textContext=e)
const c=jS(e,t,n)
return n.textContext===e&&(n.textContext=null),a+r+e.name+US(e,t)+s+c+l+i+e.name+o},US=(e,t)=>{let n=""
for(const[r,s]of Object.entries(e.attributes))if(n+=" "+r,void 0!==s){const e=s.toString().replace(t.regValEntities,t.encodeEntity)
n+=t.attrStart+e+t.attrEnd}return n},qS=(e,t,n)=>IS(t,n)+t.textStart+e.value.replace(t.regEntities,t.encodeEntity)+(n.textContext?"":t.textEnd),VERSION="4.0.0-rc.5",WS=new Map
for(const e of AS)WS.set(e.name,e)
function VS(e){return"removeScriptElement"===e?(console.warn("Warning: removeScriptElement has been renamed to removeScripts, please update your SVGO config"),WS.get("removeScripts")):WS.get(e)}const $S=e=>{if("string"==typeof e){const t=VS(e)
if(null==t)throw Error(`Unknown builtin plugin "${e}" specified.`)
return{name:e,params:{},fn:t.fn}}if("object"==typeof e&&null!=e){if(null==e.name)throw Error("Plugin name must be specified")
let t=e.fn
if(null==t){const n=VS(e.name)
if(null==n)throw Error(`Unknown builtin plugin "${e.name}" specified.`)
t=n.fn}return{name:e.name,params:e.params,fn:t}}return null},optimize=(e,t)=>{if(null==t&&(t={}),"object"!=typeof t)throw Error("Config should be an object")
const n=t.multipass?10:1
let r=Number.POSITIVE_INFINITY,i=""
const o={}
null!=t.path&&(o.path=t.path)
for(let a=0;a<n;a+=1){o.multipassCount=a
const n=LS(e,t.path),l=t.plugins||["preset-default"]
if(!Array.isArray(l))throw Error("malformed config, `plugins` property must be an array.\nSee more info here: https://github.com/svg/svgo#configuration")
const c=l.filter(e=>null!=e).map($S)
c.length<l.length&&console.warn("Warning: plugins list includes null or undefined elements, these will be ignored.")
const u={}
if(null!=t.floatPrecision&&(u.floatPrecision=t.floatPrecision),s(n,o,c,null,u),i=MS(n,t.js2svg),!(i.length<r))break
e=i,r=i.length}return t.datauri&&(i=((e,t)=>{let n="data:image/svg+xml"
return t&&"base64"!==t?"enc"===t?e=n+","+encodeURIComponent(e):"unenc"===t&&(e=n+","+e):(n+=";base64,",e=n+Buffer.from(e).toString("base64")),e})(i,t.datauri)),{data:i}}
export{VERSION,Wt as _collections,AS as builtinPlugins,ct as mapNodesToParents,optimize,wt as querySelector,St as querySelectorAll}
