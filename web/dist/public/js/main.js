parcelRequire=function(e,r,n,t){function i(n,t){function o(e){return i(o.resolve(e))}function c(r){return e[n][1][r]||r}if(!r[n]){if(!e[n]){var l="function"==typeof parcelRequire&&parcelRequire;if(!t&&l)return l(n,!0);if(u)return u(n,!0);if(f&&"string"==typeof n)return f(n);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}o.resolve=c;var a=r[n]=new i.Module(n);e[n][0].call(a.exports,o,a,a.exports,this)}return r[n].exports}function o(e){this.id=e,this.bundle=i,this.exports={}}var u="function"==typeof parcelRequire&&parcelRequire,f="function"==typeof require&&require;i.isParcelRequire=!0,i.Module=o,i.modules=e,i.cache=r,i.parent=u;for(var c=0;c<n.length;c++)i(n[c]);if(n.length){var l=i(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):t&&(this[t]=l)}return i}({3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e={ready:function(e){(document.attachEvent?"complete"===document.readyState:"loading"!==document.readyState)?e():document.addEventListener("DOMContentLoaded",e)}};exports.default=e;
},{}],4:[function(require,module,exports) {
var define;
var e,t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};!function(i,n){"object"==("undefined"==typeof exports?"undefined":t(exports))&&"object"==("undefined"==typeof module?"undefined":t(module))?module.exports=n():"function"==typeof e&&e.amd?e([],n):"object"==("undefined"==typeof exports?"undefined":t(exports))?exports.SlimSelect=n():i.SlimSelect=n()}("undefined"!=typeof self?self:this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var s=i[n]={i:n,l:!1,exports:{}};return e[n].call(s.exports,s,s.exports,t),s.l=!0,s.exports}var i={};return t.m=e,t.c=i,t.d=function(e,i,n){t.o(e,i)||Object.defineProperty(e,i,{configurable:!1,enumerable:!0,get:n})},t.n=function(e){var i=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(i,"a",i),i},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=2)}([function(e,t,i){"use strict";t.__esModule=!0,t.hasClassInTree=function(e,t){function i(e,t){return t&&e&&e.classList&&e.classList.contains(t)?e:null}return i(e,t)||function e(t,n){return t&&t!==document?i(t,n)?t:e(t.parentNode,n):null}(e,t)},t.ensureElementInView=function(e,t){var i=e.scrollTop+e.offsetTop,n=i+e.clientHeight,s=t.offsetTop,a=s+t.clientHeight;s<i?e.scrollTop-=i-s:a>n&&(e.scrollTop+=a-n)},t.putContent=function(e,t,i){var n=e.offsetHeight,s=e.getBoundingClientRect(),a=i?s.top:s.top-n,o=i?s.bottom:s.bottom+n;return a<=0?"below":o>=window.innerHeight?"above":i?t:"below"},t.debounce=function(e,t,i){var n;return void 0===t&&(t=100),void 0===i&&(i=!1),function(){var s=this,a=arguments,o=i&&!n;clearTimeout(n),n=setTimeout(function(){n=null,i||e.apply(s,a)},t),o&&e.apply(s,a)}},t.isValueInArrayOfObjects=function(e,t,i){if(!Array.isArray(e))return e[t]===i;for(var n=0;n<e.length;n++)if(e[n]&&e[n][t]&&e[n][t]===i)return!0;return!1},t.highlight=function(e,t,i){var n=(e=e.trim()).trim().toLowerCase();t=t.trim().toLowerCase();var s=n.indexOf(t);return s>=0&&(e=e.substring(0,s)+'<span class="'+i+'">'+e.substring(s,s+t.length)+"</span>"+e.substring(s+t.length)),e}},function(e,t,i){"use strict";function n(e){return void 0!==e.text||(console.error("Data object option must have at least have a text value. Check object: "+JSON.stringify(e)),!1)}t.__esModule=!0;var s=function(){function e(e){this.contentOpen=!1,this.contentPosition="below",this.isOnChangeEnabled=!0,this.main=e.main,this.searchValue="",this.data=[],this.filtered=null,this.parseSelectData(),this.setSelectedFromSelect()}return e.prototype.newOption=function(e){return{id:e.id?e.id:String(Math.floor(1e8*Math.random())),value:e.value?e.value:"",text:e.text?e.text:"",innerHTML:e.innerHTML?e.innerHTML:"",selected:!!e.selected&&e.selected,display:!e.display||e.display,disabled:!!e.disabled&&e.disabled,placeholder:e.placeholder?e.placeholder:"",data:e.data?e.data:{}}},e.prototype.add=function(e){var t={id:String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:"",selected:!1,display:!0,disabled:!1,placeholder:"",data:{}};this.data.push(t)},e.prototype.parseSelectData=function(){this.data=[];for(var e=this.main.select.element.childNodes,t=0;t<e.length;t++)if("OPTGROUP"===e[t].nodeName){for(var i={label:e[t].label,options:[]},n=e[t].childNodes,s=0;s<n.length;s++)"OPTION"===n[s].nodeName&&i.options.push(this.pullOptionData(n[s]));this.data.push(i)}else"OPTION"===e[t].nodeName&&this.data.push(this.pullOptionData(e[t]))},e.prototype.pullOptionData=function(e){return{id:!!e.dataset&&e.dataset.id||String(Math.floor(1e8*Math.random())),value:e.value,text:e.text,innerHTML:e.innerHTML,selected:e.selected,disabled:e.disabled,placeholder:e.dataset.placeholder||null,data:e.dataset}},e.prototype.setSelectedFromSelect=function(){var e=this.main.select.element.options;if(this.main.config.isMultiple){for(var t=[],i=0;i<e.length;i++){(n=e[i]).selected&&t.push(this.getObjectFromData(n.value,"value").id)}this.setSelected(t,"id")}else if(-1!==e.selectedIndex){var n,s=(n=e[e.selectedIndex]).value;this.setSelected(s,"value")}},e.prototype.setSelected=function(e,t){void 0===t&&(t="id");for(var i=0;i<this.data.length;i++)if(this.data[i].hasOwnProperty("label")){if(this.data[i].hasOwnProperty("options"))for(var n=this.data[i].options,s=0;s<n.length;s++)n[s].selected=this.shouldBeSelected(n[s],e,t)}else this.data[i].selected=this.shouldBeSelected(this.data[i],e,t)},e.prototype.shouldBeSelected=function(e,t,i){if(void 0===i&&(i="id"),Array.isArray(t)){for(var n=0;n<t.length;n++)if(String(e[i])===String(t[n]))return!0}else if(String(e[i])===String(t))return!0;return!1},e.prototype.getSelected=function(){for(var e=null,t=[],i=0;i<this.data.length;i++)if(this.data[i].hasOwnProperty("label")){if(this.data[i].hasOwnProperty("options"))for(var n=this.data[i].options,s=0;s<n.length;s++)n[s].selected&&(this.main.config.isMultiple?t.push(n[s]):e=n[s])}else this.data[i].selected&&(this.main.config.isMultiple?t.push(this.data[i]):e=this.data[i]);return this.main.config.isMultiple?t:e},e.prototype.addToSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){for(var i=[],n=this.getSelected(),s=0;s<n.length;s++)i.push(n[s][t]);i.push(e),this.setSelected(i,t)}},e.prototype.removeFromSelected=function(e,t){if(void 0===t&&(t="id"),this.main.config.isMultiple){for(var i=[],n=this.getSelected(),s=0;s<n.length;s++)String(n[s][t])!==String(e)&&i.push(n[s][t]);this.setSelected(i,t)}},e.prototype.onDataChange=function(){this.main.onChange&&this.isOnChangeEnabled&&this.main.onChange(JSON.parse(JSON.stringify(this.getSelected())))},e.prototype.getObjectFromData=function(e,t){void 0===t&&(t="id");for(var i=0;i<this.data.length;i++){if(t in this.data[i]&&String(this.data[i][t])===String(e))return this.data[i];if(this.data[i].hasOwnProperty("options"))for(var n=this.data[i],s=0;s<n.options.length;s++)if(String(n.options[s][t])===String(e))return n.options[s]}return null},e.prototype.search=function(e){if(this.searchValue=e,""!==e.trim()){var t=this.data.slice(0);e=e.trim().toLowerCase();var i=t.map(function(t){if(t.hasOwnProperty("options")){var i=t,n=i.options.filter(function(t){return-1!==t.text.toLowerCase().indexOf(e)});if(0!==n.length){var s=Object.assign({},i);return s.options=n,s}}return t.hasOwnProperty("text")&&-1!==t.text.toLowerCase().indexOf(e)?t:null});this.filtered=i.filter(function(e){return e})}else this.filtered=null},e}();t.default=s,t.validateData=function(e){if(e){for(var t=0,i=0;i<e.length;i++)if(e[i].hasOwnProperty("label")){if(e[i].hasOwnProperty("options"))for(var s=e[i].options,a=0;a<s.length;a++)n(s[a])||t++}else n(e[i])||t++;return 0===t}console.error("Data must be an array of objects")},t.validateOption=n},function(e,t,i){"use strict";t.__esModule=!0,i(3),i(4);var n=i(5),s=i(0),a=i(6),o=i(1),l=i(7),r=function(){function e(e){var t=this;this.ajax=null,this.addable=null,this.beforeOnChange=null,this.onChange=null,this.beforeOpen=null,this.afterOpen=null,this.beforeClose=null,this.afterClose=null,this.validate(e);var i="string"==typeof e.select?document.querySelector(e.select):e.select;i.dataset.ssid&&this.destroy(i.dataset.ssid),e.ajax&&(this.ajax=e.ajax),e.addable&&(this.addable=e.addable),this.config=new n.default({select:i,isAjax:!!e.ajax,showSearch:e.showSearch,searchPlaceholder:e.searchPlaceholder,searchText:e.searchText,searchHighlight:e.searchHighlight,closeOnSelect:e.closeOnSelect,showContent:e.showContent,placeholderText:e.placeholder,allowDeselect:e.allowDeselect,isEnabled:e.isEnabled,valuesUseText:e.valuesUseText}),this.select=new a.default({select:i,main:this}),this.data=new o.default({main:this}),this.slim=new l.default({main:this}),this.select.element.parentNode.insertBefore(this.slim.container,this.select.element.nextSibling),e.data?this.setData(e.data):this.render(),document.addEventListener("click",function(e){s.hasClassInTree(e.target,t.config.id)||t.close()}),window.addEventListener("scroll",s.debounce(function(e){t.data.contentOpen&&"auto"===t.config.showContent&&("above"===s.putContent(t.slim.content,t.data.contentPosition,t.data.contentOpen)?t.moveContentAbove():t.moveContentBelow())}),!1),e.beforeOnChange&&(this.beforeOnChange=e.beforeOnChange),e.onChange&&(this.onChange=e.onChange),e.beforeOpen&&(this.beforeOpen=e.beforeOpen),e.afterOpen&&(this.afterOpen=e.afterOpen),e.beforeClose&&(this.beforeClose=e.beforeClose),e.afterClose&&(this.afterClose=e.afterClose)}return e.prototype.validate=function(e){var t="string"==typeof e.select?document.querySelector(e.select):e.select;if(!t)throw new Error("Could not find select element");if("SELECT"!==t.tagName)throw new Error("Element isnt of type select")},e.prototype.selected=function(){if(this.config.isMultiple){for(var e=this.data.getSelected(),t=[],i=0;i<e.length;i++)t.push(e[i].value);return t}return(e=this.data.getSelected())?e.value:""},e.prototype.set=function(e,t,i,n){void 0===t&&(t="value"),void 0===i&&(i=!0),void 0===n&&(n=!0),this.config.isMultiple&&!Array.isArray(e)?this.data.addToSelected(e,t):this.data.setSelected(e,t),this.select.setValue(),this.data.onDataChange(),this.render(),i&&this.close()},e.prototype.setData=function(e){if(o.validateData(e)){var t=JSON.parse(JSON.stringify(e)),i=this.data.getSelected();if(this.config.isAjax&&i)if(this.config.isMultiple)for(var n=i.reverse(),s=0;s<n.length;s++)t.unshift(n[s]);else t.unshift(this.data.getSelected()),t.unshift({text:"",placeholder:!0});this.select.create(t),this.data.parseSelectData(),this.data.setSelectedFromSelect()}else console.error("Validation problem on: #"+this.select.element.id)},e.prototype.addData=function(e){if(o.validateData([e])){var t=this.data.newOption(e);this.data.add(t),this.select.create(this.data.data),this.data.parseSelectData(),this.data.setSelectedFromSelect(),this.render()}else console.error("Validation problem on: #"+this.select.element.id)},e.prototype.open=function(){var e=this;if(this.config.isEnabled&&!this.data.contentOpen){if(this.slim.search.input.focus(),this.beforeOpen&&this.beforeOpen(),this.config.isMultiple?this.slim.multiSelected.plus.classList.add("ss-cross"):(this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-up")),this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.add("above"===this.data.contentPosition?this.config.openAbove:this.config.openBelow),this.slim.content.classList.add(this.config.open),"up"===this.config.showContent.toLowerCase()?this.moveContentAbove():"down"===this.config.showContent.toLowerCase()?this.moveContentBelow():"above"===s.putContent(this.slim.content,this.data.contentPosition,this.data.contentOpen)?this.moveContentAbove():this.moveContentBelow(),!this.config.isMultiple){var t=this.data.getSelected();if(t){var i=t.id,n=this.slim.list.querySelector('[data-id="'+i+'"]');n&&s.ensureElementInView(this.slim.list,n)}}setTimeout(function(){e.data.contentOpen=!0,e.afterOpen&&e.afterOpen()},300)}},e.prototype.close=function(){var e=this;this.data.contentOpen&&(this.beforeClose&&this.beforeClose(),this.config.isMultiple?(this.slim.multiSelected.container.classList.remove(this.config.openAbove),this.slim.multiSelected.container.classList.remove(this.config.openBelow),this.slim.multiSelected.plus.classList.remove("ss-cross")):(this.slim.singleSelected.container.classList.remove(this.config.openAbove),this.slim.singleSelected.container.classList.remove(this.config.openBelow),this.slim.singleSelected.arrowIcon.arrow.classList.add("arrow-down"),this.slim.singleSelected.arrowIcon.arrow.classList.remove("arrow-up")),this.slim.content.classList.remove(this.config.open),this.data.contentOpen=!1,this.search(""),setTimeout(function(){e.slim.content.removeAttribute("style"),e.data.contentPosition="below",e.slim[e.config.isMultiple?"multiSelected":"singleSelected"].container.classList.remove(e.config.openAbove),e.slim[e.config.isMultiple?"multiSelected":"singleSelected"].container.classList.remove(e.config.openBelow),e.slim.search.input.blur(),e.afterClose&&e.afterClose()},300))},e.prototype.moveContentAbove=function(){var e=this.config.isMultiple?this.slim.multiSelected.container.offsetHeight:this.slim.singleSelected.container.offsetHeight,t=e+this.slim.content.offsetHeight-1;this.slim.content.style.margin="-"+t+"px 0 0 0",this.slim.content.style.height=t-e+1+"px",this.slim.content.style["transform-origin"]="center bottom",this.data.contentPosition="above",this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.remove(this.config.openBelow),this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.add(this.config.openAbove)},e.prototype.moveContentBelow=function(){this.slim.content.removeAttribute("style"),this.data.contentPosition="below",this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.remove(this.config.openAbove),this.slim[this.config.isMultiple?"multiSelected":"singleSelected"].container.classList.add(this.config.openBelow)},e.prototype.enable=function(){this.config.isEnabled=!0,this.config.isMultiple?this.slim.multiSelected.container.classList.remove(this.config.disabled):this.slim.singleSelected.container.classList.remove(this.config.disabled),this.select.disconnectMutationObserver(),this.select.element.disabled=!1,this.slim.search.input.disabled=!1,this.select.observeMutationObserver()},e.prototype.disable=function(){this.config.isEnabled=!1,this.config.isMultiple?this.slim.multiSelected.container.classList.add(this.config.disabled):this.slim.singleSelected.container.classList.add(this.config.disabled),this.select.disconnectMutationObserver(),this.select.element.disabled=!0,this.slim.search.input.disabled=!0,this.select.observeMutationObserver()},e.prototype.search=function(e){if(this.data.searchValue!==e)if(this.slim.search.input.value=e,this.config.isAjax)if(""===e.trim())this.setData([]),this.data.search(""),this.render();else{var t=this;this.config.isSearching=!0,this.render(),this.ajax(e,function(i){t.config.isSearching=!1,Array.isArray(i)?(i.unshift({text:"",placeholder:!0}),t.setData(i),t.data.search(e),t.render()):"string"==typeof i?t.slim.options(i):t.render()})}else this.data.search(e),this.render()},e.prototype.setSearchText=function(e){this.config.searchText=e},e.prototype.render=function(){this.config.isMultiple?this.slim.values():(this.slim.placeholder(),this.slim.deselect()),this.slim.options()},e.prototype.destroy=function(e){void 0===e&&(e=null);var t=e?document.querySelector("."+e):this.slim.container,i=e?document.querySelector("[data-ssid="+e+"]"):this.select.element;t&&i&&(i.style.display=null,delete i.dataset.ssid,t.parentElement&&t.parentElement.removeChild(t))},e}();t.default=r,e.exports=r},function(e,t){},function(e,t){try{var i=new window.CustomEvent("test");if(i.preventDefault(),!0!==i.defaultPrevented)throw new Error("Could not prevent default")}catch(e){var n=function(e,t){var i,n;return t=t||{bubbles:!1,cancelable:!1,detail:void 0},(i=document.createEvent("CustomEvent")).initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n=i.preventDefault,i.preventDefault=function(){n.call(this);try{Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}})}catch(e){this.defaultPrevented=!0}},i};n.prototype=window.Event.prototype,window.CustomEvent=n}},function(e,t,i){"use strict";t.__esModule=!0;var n=function(){return function(e){this.id="",this.isMultiple=!1,this.isAjax=!1,this.isSearching=!1,this.showSearch=!0,this.searchHighlight=!1,this.closeOnSelect=!0,this.showContent="auto",this.searchPlaceholder="Search",this.searchText="No Results",this.placeholderText="Select Value",this.allowDeselect=!1,this.isEnabled=!0,this.valuesUseText=!1,this.main="ss-main",this.singleSelected="ss-single-selected",this.arrow="ss-arrow",this.multiSelected="ss-multi-selected",this.add="ss-add",this.plus="ss-plus",this.values="ss-values",this.value="ss-value",this.valueText="ss-value-text",this.valueDelete="ss-value-delete",this.content="ss-content",this.open="ss-open",this.openAbove="ss-open-above",this.openBelow="ss-open-below",this.search="ss-search",this.searchHighlighter="ss-search-highlight",this.addable="ss-addable",this.list="ss-list",this.optgroup="ss-optgroup",this.optgroupLabel="ss-optgroup-label",this.option="ss-option",this.highlighted="ss-highlighted",this.disabled="ss-disabled",this.hide="ss-hide",this.id="ss-"+Math.floor(1e5*Math.random()),this.style=e.select.style.cssText,this.class=e.select.classList,this.isMultiple=e.select.multiple,this.isAjax=e.isAjax,this.showSearch=!1!==e.showSearch,this.searchHighlight=!0===e.searchHighlight,this.closeOnSelect=!1!==e.closeOnSelect,e.showContent&&(this.showContent=e.showContent),this.isEnabled=!1!==e.isEnabled,e.searchPlaceholder&&(this.searchPlaceholder=e.searchPlaceholder),e.searchText&&(this.searchText=e.searchText),e.placeholderText&&(this.placeholderText=e.placeholderText),this.allowDeselect=!0===e.allowDeselect,e.valuesUseText&&(this.valuesUseText=e.valuesUseText)}}();t.default=n},function(e,i,n){"use strict";i.__esModule=!0;var s=function(){function e(e){this.element=e.select,this.main=e.main,this.element.disabled&&(this.main.config.isEnabled=!1),this.addAttributes(),this.addEventListeners(),this.addMutationObserver()}return e.prototype.setValue=function(){if(this.main.data.getSelected()){if(this.main.config.isMultiple)for(var e=this.main.data.getSelected(),t=this.element.options,i=0;i<t.length;i++){var n=t[i];n.selected=!1;for(var s=0;s<e.length;s++)e[s].value===n.value&&(n.selected=!0)}else{e=this.main.data.getSelected();this.element.value=e?e.value:""}this.main.data.isOnChangeEnabled=!1,this.element.dispatchEvent(new CustomEvent("change")),this.main.data.isOnChangeEnabled=!0}},e.prototype.addAttributes=function(){this.element.tabIndex=-1,this.element.style.display="none",this.element.dataset.ssid=this.main.config.id},e.prototype.addEventListeners=function(){var e=this;this.element.addEventListener("change",function(t){e.main.data.setSelectedFromSelect(),e.main.render()})},e.prototype.addMutationObserver=function(){var e=this;this.main.config.isAjax||(this.mutationObserver=new MutationObserver(function(t){e.main.data.parseSelectData(),e.main.data.setSelectedFromSelect(),e.main.render()}),this.observeMutationObserver())},e.prototype.observeMutationObserver=function(){this.mutationObserver.observe(this.element,{attributes:!0,childList:!0,characterData:!0})},e.prototype.disconnectMutationObserver=function(){this.mutationObserver&&this.mutationObserver.disconnect()},e.prototype.create=function(e){this.element.innerHTML="";for(var t=0;t<e.length;t++)if(e[t].hasOwnProperty("options")){var i=e[t],n=document.createElement("optgroup");n.label=i.label;for(var s=0;s<i.options.length;s++)n.appendChild(this.createOption(i.options[s]));this.element.appendChild(n)}else this.element.appendChild(this.createOption(e[t]))},e.prototype.createOption=function(e){var i=document.createElement("option");return i.value=e.value||e.text,i.innerHTML=e.innerHTML||e.text,e.selected&&(i.selected=e.selected),e.disabled&&(i.disabled=!0),e.placeholder&&i.setAttribute("data-placeholder","true"),e.data&&"object"==t(e.data)&&Object.keys(e.data).forEach(function(t){i.setAttribute("data-"+t,e.data[t])}),i},e}();i.default=s},function(e,i,n){"use strict";i.__esModule=!0;var s=n(0),a=n(1),o=function(){function e(e){this.main=e.main,this.container=this.containerDiv(),this.container.slim=e.main,this.content=this.contentDiv(),this.search=this.searchDiv(),this.list=this.listDiv(),this.options(),this.main.config.isMultiple?(this.multiSelected=this.multiSelectedDiv(),this.container.appendChild(this.multiSelected.container)):(this.singleSelected=this.singleSelectedDiv(),this.container.appendChild(this.singleSelected.container)),this.container.appendChild(this.content),this.content.appendChild(this.search.container),this.content.appendChild(this.list)}return e.prototype.containerDiv=function(){var e=document.createElement("div");e.classList.add(this.main.config.id),e.classList.add(this.main.config.main),e.style.cssText=this.main.config.style;for(var t=0;t<this.main.config.class.length;t++)e.classList.add(this.main.config.class[t]);return e},e.prototype.singleSelectedDiv=function(){var e=this,t=document.createElement("div");t.classList.add(this.main.config.singleSelected);var i=document.createElement("span");i.classList.add("placeholder"),t.appendChild(i);var n=null;(n=document.createElement("span")).innerHTML="X",n.classList.add("ss-deselect"),n.onclick=function(t){e.main.set(""),t.stopPropagation()},t.appendChild(n);var s=document.createElement("span");s.classList.add(this.main.config.arrow);var a=document.createElement("span");return a.classList.add("arrow-down"),s.appendChild(a),t.appendChild(s),t.onclick=function(){e.main.config.isEnabled&&(e.main.data.contentOpen?e.main.close():e.main.open())},{container:t,placeholder:i,deselect:n,arrowIcon:{container:s,arrow:a}}},e.prototype.placeholder=function(){var e=this.main.data.getSelected();if(null===e||e&&e.placeholder){var t=document.createElement("span");t.classList.add(this.main.config.disabled),t.innerHTML=this.main.config.placeholderText,this.singleSelected.placeholder.innerHTML=t.outerHTML}else{var i="";e&&(i=e.innerHTML&&!0!==this.main.config.valuesUseText?e.innerHTML:e.text),this.singleSelected.placeholder.innerHTML=e?i:""}},e.prototype.deselect=function(){this.main.config.allowDeselect?""===this.main.selected()?this.singleSelected.deselect.classList.add("ss-hide"):this.singleSelected.deselect.classList.remove("ss-hide"):this.singleSelected.deselect.classList.add("ss-hide")},e.prototype.multiSelectedDiv=function(){var e=this,t=document.createElement("div");t.classList.add(this.main.config.multiSelected);var i=document.createElement("div");i.classList.add(this.main.config.values),t.appendChild(i);var n=document.createElement("div");n.classList.add(this.main.config.add);var s=document.createElement("span");return s.classList.add(this.main.config.plus),s.onclick=function(t){e.main.data.contentOpen&&(e.main.close(),t.stopPropagation())},n.appendChild(s),t.appendChild(n),t.onclick=function(t){e.main.config.isEnabled&&(t.target.classList.contains(e.main.config.valueDelete)||e.main.open())},{container:t,values:i,add:n,plus:s}},e.prototype.values=function(){if(this.main.config.isMultiple){for(var e,t=this.multiSelected.values.childNodes,i=this.main.data.getSelected(),n=[],s=0;s<t.length;s++){e=!0;for(var a=t[s],o=0;o<i.length;o++)String(i[o].id)===String(a.dataset.id)&&(e=!1);e&&n.push(a)}for(var l=0;l<n.length;l++)n[l].classList.add("ss-out"),this.multiSelected.values.removeChild(n[l]);t=this.multiSelected.values.childNodes;for(o=0;o<i.length;o++){e=!1;for(s=0;s<t.length;s++){a=t[s];String(i[o].id)===String(a.dataset.id)&&(e=!0)}e||(0===t.length?this.multiSelected.values.appendChild(this.valueDiv(i[o])):0===o?this.multiSelected.values.insertBefore(this.valueDiv(i[o]),t[o]):t[o-1].insertAdjacentElement("afterend",this.valueDiv(i[o])))}if(0===i.length){var r=document.createElement("span");r.classList.add(this.main.config.disabled),r.innerHTML=this.main.config.placeholderText,this.multiSelected.values.innerHTML=r.outerHTML}}},e.prototype.valueDiv=function(e){var t=this,i=document.createElement("div");i.classList.add(this.main.config.value),i.dataset.id=e.id;var n=document.createElement("span");n.classList.add(this.main.config.valueText),n.innerHTML=e.innerHTML&&!0!==this.main.config.valuesUseText?e.innerHTML:e.text,i.appendChild(n);var s=document.createElement("span");return s.classList.add(this.main.config.valueDelete),s.innerHTML="x",s.onclick=function(i){if(i.preventDefault(),i.stopPropagation(),t.main.config.isEnabled)if(t.main.beforeOnChange){for(var n=t.main.data.getSelected(),s=JSON.parse(JSON.stringify(n)),a=0;a<s.length;a++)s[a].id===e.id&&s.splice(a,1);!1!==t.main.beforeOnChange(s)&&(t.main.data.removeFromSelected(e.id,"id"),t.main.render(),t.main.select.setValue())}else t.main.data.removeFromSelected(e.id,"id"),t.main.render(),t.main.select.setValue(),t.main.data.onDataChange()},i.appendChild(s),i},e.prototype.contentDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.content),e},e.prototype.searchDiv=function(){var e=this,i=document.createElement("div"),n=document.createElement("input");if(i.classList.add(this.main.config.search),this.main.config.showSearch||(i.classList.add(this.main.config.hide),n.readOnly=!0),n.type="search",n.placeholder=this.main.config.searchPlaceholder,n.tabIndex=0,n.onclick=function(t){setTimeout(function(){""===t.target.value&&e.main.search("")},10)},n.onkeydown=function(t){"ArrowUp"===t.key?(e.main.open(),e.highlightUp(),t.preventDefault()):"ArrowDown"===t.key?(e.main.open(),e.highlightDown(),t.preventDefault()):"Tab"===t.key?e.main.close():"Enter"===t.key&&t.preventDefault()},n.onkeyup=function(t){var i=t.target;if("Enter"===t.key){if(e.main.addable&&t.ctrlKey)return s.click(),t.preventDefault(),void t.stopPropagation();var a=e.list.querySelector("."+e.main.config.highlighted);a&&a.click()}else"ArrowUp"===t.key||"ArrowDown"===t.key||("Escape"===t.key?e.main.close():e.main.config.showSearch&&e.main.data.contentOpen?e.main.search(i.value):n.value="");t.preventDefault(),t.stopPropagation()},n.onfocus=function(){e.main.open()},i.appendChild(n),this.main.addable){var s=document.createElement("div");s.classList.add(this.main.config.addable),s.innerHTML="+",s.onclick=function(i){i.preventDefault(),i.stopPropagation();var n=e.search.input.value;if(""!==n.trim()){var s=e.main.addable(n),o="";s&&("object"==(void 0===s?"undefined":t(s))?a.validateOption(s)&&(e.main.addData(s),o=s.value?s.value:s.text):(e.main.addData(e.main.data.newOption({text:s,value:s})),o=s),e.main.search(""),setTimeout(function(){e.main.set(o,"value",!1,!1)},100),e.main.config.closeOnSelect&&setTimeout(function(){e.main.close()},100))}else e.search.input.focus()},i.appendChild(s)}return{container:i,input:n,addable:s}},e.prototype.highlightUp=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.previousSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.previousSibling;else{var i=this.list.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")");t=i[i.length-1]}if(t&&t.classList.contains(this.main.config.optgroupLabel)&&(t=null),null===t){var n=e.parentNode;if(n.classList.contains(this.main.config.optgroup)&&n.previousSibling){var a=n.previousSibling.querySelectorAll("."+this.main.config.option+":not(."+this.main.config.disabled+")");a.length&&(t=a[a.length-1])}}t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),s.ensureElementInView(this.list,t))},e.prototype.highlightDown=function(){var e=this.list.querySelector("."+this.main.config.highlighted),t=null;if(e)for(t=e.nextSibling;null!==t&&t.classList.contains(this.main.config.disabled);)t=t.nextSibling;else t=this.list.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")");if(null===t&&null!==e){var i=e.parentNode;i.classList.contains(this.main.config.optgroup)&&i.nextSibling&&(t=i.nextSibling.querySelector("."+this.main.config.option+":not(."+this.main.config.disabled+")"))}t&&(e&&e.classList.remove(this.main.config.highlighted),t.classList.add(this.main.config.highlighted),s.ensureElementInView(this.list,t))},e.prototype.listDiv=function(){var e=document.createElement("div");return e.classList.add(this.main.config.list),e.onmousewheel=function(t){var i=e.scrollTop,n=e.scrollHeight,s=e.offsetHeight,a="DOMMouseScroll"==t.type?-40*t.detail:t.wheelDelta,o=a>0,l=function(){return t.stopPropagation(),t.preventDefault(),t.returnValue=!1,!1};return!o&&-a>n-s-i?(e.scrollTop=n,l()):o&&a>i?(e.scrollTop=0,l()):void 0},e},e.prototype.options=function(e){void 0===e&&(e="");var t,i=this.main.data.filtered||this.main.data.data;if(this.list.innerHTML="",""!==e)return(t=document.createElement("div")).classList.add(this.main.config.option),t.classList.add(this.main.config.disabled),t.innerHTML=e,void this.list.appendChild(t);if(this.main.config.isAjax&&this.main.config.isSearching)return(t=document.createElement("div")).classList.add(this.main.config.option),t.classList.add(this.main.config.disabled),t.innerHTML="Searching...",void this.list.appendChild(t);if(0===i.length){var n=document.createElement("div");return n.classList.add(this.main.config.option),n.classList.add(this.main.config.disabled),n.innerHTML=this.main.config.searchText,void this.list.appendChild(n)}for(var s=0;s<i.length;s++)if(i[s].hasOwnProperty("label")){var a=i[s],o=document.createElement("div");o.classList.add(this.main.config.optgroup);var l=document.createElement("div");l.classList.add(this.main.config.optgroupLabel),l.innerHTML=a.label,o.appendChild(l);for(var r=a.options,c=0;c<r.length;c++)o.appendChild(this.option(r[c]));this.list.appendChild(o)}else this.list.appendChild(this.option(i[s]))},e.prototype.option=function(e){if(e.placeholder){var t=document.createElement("div");return t.classList.add(this.main.config.option),t.classList.add(this.main.config.hide),t}var i=document.createElement("div");i.classList.add(this.main.config.option);var n=this.main.data.getSelected();i.dataset.id=e.id,this.main.config.searchHighlight&&this.main.slim&&""!==this.main.slim.search.input.value.trim()?i.innerHTML=s.highlight(e.innerHTML,this.main.slim.search.input.value,this.main.config.searchHighlighter):i.innerHTML=e.innerHTML;var a=this;return i.onclick=function(e){e.preventDefault(),e.stopPropagation();var t=this.dataset.id;if(a.main.beforeOnChange){var i=void 0,s=JSON.parse(JSON.stringify(a.main.data.getObjectFromData(t)));s.selected=!0,a.main.config.isMultiple?(i=JSON.parse(JSON.stringify(n))).push(s):i=JSON.parse(JSON.stringify(s)),!1!==a.main.beforeOnChange(i)&&a.main.set(t,"id",a.main.config.closeOnSelect)}else a.main.set(t,"id",a.main.config.closeOnSelect)},(e.disabled||n&&s.isValueInArrayOfObjects(n,"id",e.id))&&(i.onclick=null,i.classList.add(this.main.config.disabled)),i},e}();i.default=o}])});
},{}],1:[function(require,module,exports) {
"use strict";var e=require("./functions"),t=r(e),a=require("slim-select"),n=r(a);function r(e){return e&&e.__esModule?e:{default:e}}t.default.ready(function(){var e=window.GDPR.lang.toUpperCase(),t=window.GDPR.baseURL;window.frames.eurlex.location="https://eur-lex.europa.eu/legal-content/"+e+"/TXT/?uri=CELEX:32016R0679",function(){var e=document.querySelector("#gdpr-toc .content");e.addEventListener("click",function(t){if("A"===t.target.tagName&&(a="active",e.querySelectorAll("a").forEach(function(e){e.classList.contains("active")&&e.classList.add("visited"),e.classList.remove(a)}),t.target.classList.add("active"),window.innerWidth>1100)){t.target.href.split("#")[1];return window.frames.eurlex.location=t.target.href,t.preventDefault(),!1}var a})}(),new n.default({select:"#languages",onChange:function(a){a.value!==e.toLowerCase()&&window.location.replace(t+a.value)}}).set(e.toLowerCase()),document.getElementById("languages").addEventListener("input",function(e){console.log(e.target.value),window.location.replace(t+e.target.value)})});
},{"./functions":3,"slim-select":4}]},{},[1], null)
//# sourceMappingURL=/main.map