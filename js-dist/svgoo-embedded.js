var svgooBundle=function(e){"use strict"
var t={exports:{}}
!function(e){function optimize(e){try{let n=e
return n=n.replace(/<\?xml[^>]*\?>\s*/g,""),n=n.replace(/<!--[\s\S]*?-->/g,""),n=n.replace(/>\s+</g,"><"),n=n.trim(),n=n.replace(/\s+[a-zA-Z-]+=""\s*/g," "),n=n.replace(/\s+/g," "),{data:n,info:{width:parseFloat(t(n,"width"))||null,height:parseFloat(t(n,"height"))||null}}}catch(e){throw new Error(`SVG optimization failed: ${e.message}`)}}function t(e,t){const n=e.match(new RegExp(`\\s${t}="([^"]*)"`,"i"))
return n?n[1]:null}function n(e){return{name:e,enabled:!0,description:`Built-in optimization: ${e}`}}function r(e,t){return t}globalThis.svgoo={optimize:optimize,getPlugin:n,executePlugin:r,version:"1.2.0-mvp"},e.exports&&(e.exports={optimize:optimize,getPlugin:n,executePlugin:r})}(t)
var n=function(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}(t.exports)
return e.default=n,Object.defineProperty(e,"__esModule",{value:!0}),e}({})
