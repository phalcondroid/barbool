(()=>{"use strict";class e{constructor(e){return e instanceof HTMLElement?(this.element=e,this):void 0!==e.target?(this.element=e.target,this):"string"==typeof e?(this.element=this.convertToElement(e),this):(this.element=this.convertToElement(this.getNameOfClass(e)),this)}convertToElement(e){if(e instanceof HTMLElement)return e;let t=document.createElement(e);return"Button"===e&&t.setAttribute("type","button"),t}getNameOfClass(e){let t=/function (.{1,})\(/.exec(e.constructor.toString());return t&&t.length>1?t[1]:""}getElement(){return this.element}}class t{constructor(t){this.deny=["Table","Td","Div","Thead","Tbody","Tfoot","Tr","Td","Th","Label","Span","I","A"],this.element=new e(t)}css(e,t=null){let n=this.element.getElement().style;switch(typeof e){case"object":for(const t in e)n[t]=e[t];break;case"string":if(null===t)return n[e];n[e]=t}return this}html(e=null){return null!=e?(this.removeChildNodes(),this.append(e),this):this.element.getElement().innerHTML}verifyElement(e,t="append"){if(this.element instanceof HTMLCollection)for(let t in this.element)void 0!==this.element[t].nodeType&&1==this.element[t].nodeType&&this.element[t].appendChild(e);else this.element.getElement().appendChild(e)}checkAppendValue(e){switch(typeof e){case"string":this.element.getElement().appendChild(document.createTextNode(e));break;case"number":this.element.getElement().appendChild(document.createTextNode(e.toString()));break;case"object":void 0!==e?this.verifyElement(e.getElement()):this.verifyElement(e)}}append(e){if(Array.isArray(e)||e instanceof HTMLCollection)for(let t in e)this.checkAppendValue(e[t]);else this.checkAppendValue(e);return this}removeChildNodes(){const e=this.element.getElement();if(e instanceof HTMLCollection)for(let t in e)this.removeChilds(e[t],e[t].childNodes);return this.removeChilds(e,e.childNodes),this}removeChilds(e,t){for(;e.firstChild;)e.removeChild(e.firstChild)}attr(e,t=!1){if("object"==typeof e&&0==t)for(let t in e)this.element.getElement().setAttribute(t,e[t]);else if("string"==typeof e&&0!=t)this.element.getElement().setAttribute(e,t);else if("string"==typeof e&&0==t)return this.element.getElement().getAttribute(e);return this}getText(e=!1){return e?(this.element.getElement().innerHTML=e,this):this.element.getElement().innerHTML}empty(){return this.removeChildNodes(),this}val(e=!1){return e||"string"==typeof e?(this.attr("value",e),this):this.attr("value")}class(e){return this.element.getElement().setAttribute("class",e),this}addClass(e){let t=this.element.getElement().getAttribute("class");return t+=" "+e,this.element.getElement().setAttribute("class",null!=t?t:""),this}text(e=!1){return e?(this.element.getElement().innerHTML=e,this):this.element.getElement().innerHTML}setInnerHtml(e){return this.element.getElement().innerHTML=e,this}getChilds(){let e=this.element.getElement().childNodes,n=[];for(let r in e)if(1==e[r].nodeType){let r=new t(e);n.push(r)}return n}remove(e=null){if(e instanceof Node)return this.element.getElement().removeChild(e),this;const t=this.element.getElement().parentElement;return t instanceof Node&&t.removeChild(this.element.getElement()),this}getSiblings(){let e=[];if(e.length>0){let t=new Array;for(let n of e)n.getElement()!=this.element.getElement()&&t.push(n);return t}return!1}getParent(){const e=this.element.getElement().parentElement;return e&&1==e.nodeType?new t(e):null}getElement(){return this.element.getElement()}}var n;!function(e){e.blue="blue",e.red="red",e.black="black",e.white="white",e.amber="amber",e.indigo="indigo",e.cyan="cyan"}(n||(n={}));class r{subscribe(e){if(void 0===this.events)return this.events={},void(this.events[e.eventName]=[e.action]);this.events[e.eventName].push(e.action)}fire(e){if(void 0===this.events||void 0===this.events[e.eventName])throw Error(`Don't exist events attached to '${e.eventName}'`);this.events[e.eventName].forEach((t=>{t(e.data)}))}}class s{constructor(e,t=new r){this.tag=e,this.eventManager=t}click(e){this.tag.getElement().addEventListener("click",e)}}class i{constructor(e){this.params=e}render(){const e=new t("button"),n=new s(e);return e.append(this.params.child.render()),n.click(this.params.onPressed),e}}class l{constructor(e){this.params=e}render(){const e=new t("div");return e.css({width:"100%",height:"100%",display:"flex","justify-content":"center","align-items":"center"}),e.append(this.params.child.render()),e}}class o{constructor(e){this.data=e}render(){const e=new t("div");return e.css({width:"100%",height:"100%",display:"flex","flex-direction":"column"}),e.append(this.data.children.map((e=>e.render()))),e}}class a{constructor(e){this.params=e}render(){var e,n;const r=new t("div"),s={width:"100%",height:"100%"};return(null===(e=this.params)||void 0===e?void 0:e.color)&&(s["background-color"]=this.params.color),(null===(n=this.params)||void 0===n?void 0:n.child)&&(r.css(s),r.append(this.params.child.render())),r}}class c{constructor(e){this.params=e}render(){var e;const n=new t("div"),r=null!==(e=this.params.flex)&&void 0!==e?e:1;return n.css({flex:`${r} auto`}),n.append(this.params.child.render()),n}}class h{constructor(e){this.params=e}render(){var e;const t=new a({child:null!==(e=this.params.inProgress)&&void 0!==e?e:new a}).render();return this.params.manager.subscribe({eventName:this.params.listener,action:e=>{t.empty(),t.append(this.params.builder(e).render())}}),t}}class d{constructor(e,t){this.text=e,this.params=t}render(){const e=new t("span");return e.append(this.text),e}}class m extends r{constructor(){super()}}let u=class{onConstruct(e){console.log("el eleme",e)}render(e){return new o({children:[new c({child:new a({color:n.indigo,child:new d("Row 1")}),flex:1}),new c({child:new a({color:n.red,child:new d("Row 2")}),flex:3}),new c({child:new a({color:n.cyan,child:new l({child:new i({child:new d("wtf button"),onPressed:()=>{e.wtfButton()}})})}),flex:5}),new c({child:new a({child:new h({listener:"anie",manager:e,inProgress:new d("mientras execute!"),builder:e=>new d(`jajajjajajaja texto ${e}`)}),color:n.amber}),flex:1})]})}};var p;u=function(e,t,n,r){var s,i=arguments.length,l=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)l=Reflect.decorate(e,t,n,r);else for(var o=e.length-1;o>=0;o--)(s=e[o])&&(l=(i<3?s(l):i>3?s(t,n,l):s(t,n))||l);return i>3&&l&&Object.defineProperty(t,n,l),l}([(p={id:"square",stateManager:class extends m{constructor(){super()}wtfButton(){fetch("https://rickandmortyapi.com/api/character/17").then((e=>{this.fire({eventName:"anie",data:e})}))}}},function(e){const n=function(...n){const r=function(){return new e(...n)};r.prototype=e.prototype;const s=document.getElementById(p.id),i=new t(s);r.prototype.onConstruct(i);const l=new p.stateManager;return i.append(r.prototype.render(l).render()),new r};return n.prototype=e.prototype,n})],u),new u})();