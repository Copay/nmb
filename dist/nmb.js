(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NMB", function() { return NMB; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_view__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__apiLoader__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scss_nmb_scss__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__scss_nmb_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__scss_nmb_scss__);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "apiLoader", function() { return __WEBPACK_IMPORTED_MODULE_1__apiLoader__["a"]; });




const Template = (() => {
    let template = document.createElement("netease-music-board");
    template.innerHTML = `
        <exiter></exiter>
        <search-box>
            <radio-set>
                <radio id="music">Music</radio>
                <radio id="album">Album</radio>
                <radio id="artist">Artist</radio>
                <radio id="playlist">Playlist</radio>
                <radio id="movie">Movie</radio>
                <radio id="lyric">Lyric</radio>
                <radio id="radio">Radio</radio>
            </radio-set>
            <input type="text" id="inputer">
        </search-box>
        <result-list>
        </result-list>
        `;
    return template;
})();
const NMB = class NMB {
    constructor() {
        this.content = document.importNode(Template, true);
        this.RadioSet = new __WEBPACK_IMPORTED_MODULE_0_view__["a" /* RadioSet */](this.content.querySelector("radio-set"));
        this.ResultList = new __WEBPACK_IMPORTED_MODULE_0_view__["b" /* ResultList */](this.content.querySelector("result-list"));
        this.content.querySelector("input")
            .addEventListener("keypress", e => { if (e.keyCode === 13)
            this.search(); });
        this.content.querySelector("exiter")
            .addEventListener("click", e => this.hide());
    }
    search() {
        const searchType = this.RadioSet.maps[this.RadioSet.index].id;
        __WEBPACK_IMPORTED_MODULE_1__apiLoader__["a" /* apiLoader */].search({
            value: this.content.querySelector("input").value,
            type: searchType,
            limit: 25,
            offset: 0
        }).then(json => json.json())
            .then(json => json.result)
            .then(res => (res["songs"] || res["albums"]
            || res["artists"] || res["playlists"]
            || res["djRadios"] || res["mvs"] || [])
            .map((a) => ({
            id: a.id,
            name: res["djRadios"] ? a.desc : a.name,
            artist: res["djRadios"] ? a.name : (res["artists"] ? "" : (a.ar || a.artists || [a.creator] || [a.artistName]).map((x) => (x.name || x.nickname)).join("/ "))
        })))
            .then((w) => this.ResultList.render(w))
            .then(() => this.ResultList.rootElement.dataset["type"] = searchType);
    }
    show() {
        document.body.appendChild(this.content);
    }
    hide() {
        document.body.removeChild(this.content);
    }
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cEmitter__ = __webpack_require__(2);


const ResultTemplate = (() => {
    let template = document.createElement("result");
    let tname = document.createElement("media-name");
    let tartist = document.createElement("media-artist");
    template.appendChild(tname);
    template.appendChild(tartist);
    return ({ id, name, artist }) => {
        template.dataset["id"] = id.toString();
        tname.innerHTML = name;
        tartist.innerHTML = artist;
        return document.importNode(template, true);
    };
})();
class RadioSet {
    constructor(rootElement) {
        this.__index = 0;
        this.maps = Array.from(rootElement.querySelectorAll("radio"));
        this.injectEvents();
        this.setIndex(0);
    }
    injectEvents() {
        this.maps.forEach((element, index) => element.addEventListener("click", () => this.setIndex(index)));
    }
    setIndex(index) {
        this.index = index;
        this.maps.forEach((element, index) => {
            if (index === this.index)
                return element.classList.add("selected");
            element.classList.remove("selected");
        });
    }
    get index() {
        return this.__index;
    }
    set index(number) {
        if (Number.isSafeInteger(number) && number < this.maps.length && number > -1)
            this.__index = number;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RadioSet;

class ResultList extends __WEBPACK_IMPORTED_MODULE_0__cEmitter__["a" /* cEmitter */] {
    constructor(rootElement, MaxRowsPerPage = 10) {
        super({ select: [] });
        this.rootElement = rootElement;
        this.MAX_ROWS_PER_PAGE = MaxRowsPerPage;
        this.point = 0, this.pages = [];
    }
    render(musicList) {
        this.point = 0;
        this.pages = this.slice(musicList, this.MAX_ROWS_PER_PAGE);
        this.renderPage();
    }
    renderPage() {
        this.rootElement.innerHTML = "";
        this.pages[this.point].forEach(({ id, name, artist }, index) => {
            this.rootElement.appendChild(ResultTemplate({ id, name, artist }));
            this.rootElement.children[index].addEventListener("click", () => this.emit("select", { id, name, artist, type: this.rootElement.dataset["type"] }));
        });
        if (this.pages.length > 1)
            this.renderPrevAndNextButton();
    }
    renderPrevAndNextButton() {
        this.rootElement.appendChild((() => {
            let s = document.createElement("div");
            s.innerHTML = `
                <button-set>
                    ${this.point !== 0 ? "<previous></previous>" : ""}
                    ${this.point !== this.pages.length - 1 ? "<next></next>" : ""}
                </button-set>
            `;
            return s.children[0];
        })());
        if (this.point !== 0)
            this.rootElement.querySelector("previous").addEventListener("click", () => {
                this.point--;
                this.renderPage();
            });
        if (this.point !== this.pages.length - 1)
            this.rootElement.querySelector("next").addEventListener("click", () => {
                this.point++;
                this.renderPage();
            });
    }
    slice(arrayList, perLength) {
        let length = getLength(arrayList.length, perLength), result = [];
        for (let i = 0; i < length; i++) {
            result.push(arrayList.slice(i * perLength, (i + 1) * perLength));
        }
        return result;
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = ResultList;

function getLength(a, b) {
    return (a - a % b) / b + 1;
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const cEmitter = class cEmitter {
    constructor(typeList) {
        if (typeList) {
            this.events = typeList;
        }
        else {
            this.events = {};
        }
    }
    on(eventName, func) {
        if (this.events[eventName] && this.events[eventName].push !== undefined && typeof func === "function") {
            this.events[eventName].push(func);
        }
        else if (this.events[eventName] === undefined || this.events[eventName].push === undefined) {
            this.events[eventName] = [];
        }
        else {
            throw new TypeError("Uncaught Unexcepted TypeError.");
        }
        return this;
    }
    emit(eventName, ...args) {
        for (let i = 0; i < this.events[eventName].length; i++) {
            this.events[eventName][i](args);
        }
        return this;
    }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = cEmitter;



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const { api } = __webpack_require__(4);
const searchType = {
    music: "1",
    album: "10",
    artist: "100",
    playlist: "1000",
    movie: "1004",
    lyric: "1006",
    radio: "1009"
};
const type = ["song", "lyric", "comments", "detail",
    "artist", "album", "playlist", "mv",
    "djradio", "dj", "detail_dj", "search"];
//Create API urls
const searchAPIs = (() => {
    let o = {};
    Object.getOwnPropertyNames(searchType).forEach((val) => {
        o[val] = api + "?search_type=" + searchType[val] + "&type=search";
    });
    return o;
})();
const APIs = (() => {
    let o = {};
    type.forEach(val => {
        o[val.replace(/_(.)/gi, e => e.toUpperCase())]
            = api
                + "?type="
                + val;
    });
    return o;
})();
//func Creator
function creator(key) {
    switch (key) {
        case "search":
            return ({ value, type, limit, offset }) => fetch(searchAPIs[type]
                + "&s=" + value
                + "&limit=" + limit
                + "&offset=" + offset);
        case "artist":
        case "comments":
            return ({ limit, offset, id }) => fetch(APIs[key]
                + "&limit=" + limit
                + "&offset=" + offset
                + "&id=" + id);
        case "song":
            return ({ br, id }) => APIs[key] + "&raw=true&br=" + br + "&id=" + id;
        default:
            return ({ id }) => fetch(APIs[key]
                + "&id=" + id);
    }
}
//Create API Functions
const apiLoader = (() => {
    let o = {};
    Object.getOwnPropertyNames(APIs).forEach(key => {
        o[key] = creator(key);
    });
    return o;
})();
/* harmony export (immutable) */ __webpack_exports__["a"] = apiLoader;



/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {"api":"https://api.imjad.cn/cloudmusic/"}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(6);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(8)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/sass-loader/lib/loader.js??ref--0-2!./nmb.scss", function() {
			var newContent = require("!!../../node_modules/css-loader/index.js??ref--0-1!../../node_modules/sass-loader/lib/loader.js??ref--0-2!./nmb.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(7)(true);
// imports


// module
exports.push([module.i, "netease-music-board {\n  display: flex;\n  width: 75vw;\n  flex-direction: column; }\n  netease-music-board {\n    position: fixed;\n    z-index: 9999;\n    margin: 0 auto;\n    top: 50%;\n    left: 0;\n    right: 0;\n    transform: translateY(-50%); }\n  @media screen and (max-width: 760px) {\n    netease-music-board {\n      width: 100vw; } }\n  netease-music-board * {\n    display: flex;\n    flex-direction: column; }\n  netease-music-board exiter {\n    display: block;\n    width: 2em;\n    height: 2em;\n    line-height: 2;\n    text-align: center;\n    margin-left: auto; }\n    netease-music-board exiter::after {\n      content: \"x\"; }\n  netease-music-board search-box {\n    margin-bottom: 1em;\n    box-shadow: 0 1em 3em -1.5em; }\n  netease-music-board radio-set {\n    height: 3em;\n    align-content: center;\n    flex-direction: row; }\n  netease-music-board radio {\n    flex: 1;\n    text-align: center;\n    line-height: 3;\n    font-family: Courier New, Courier, monospace; }\n    netease-music-board radio.selected {\n      border-bottom: solid 2px green; }\n  netease-music-board input#inputer {\n    padding: 0 1em;\n    height: 3em;\n    line-height: 2.5em;\n    border: 0;\n    outline: none; }\n  netease-music-board result {\n    flex-direction: row;\n    height: 2em;\n    line-height: 2em;\n    padding: 0 1em; }\n  netease-music-board media-name {\n    flex: 1; }\n  netease-music-board button-set {\n    line-height: 2.5em;\n    display: block;\n    margin: 1em 0.5em; }\n    netease-music-board button-set * {\n      display: inline-block;\n      font-weight: bold;\n      font-family: Courier New, Courier, monospace;\n      border-bottom: 1.5px black inset;\n      text-transform: uppercase;\n      padding: 0 0.5em; }\n  netease-music-board previous::before {\n    content: \"< Prevent\"; }\n  netease-music-board next {\n    float: right; }\n    netease-music-board next::after {\n      content: \"After >\"; }\n", "", {"version":3,"sources":["D:/nmb/src/scss/src/scss/nmb.scss"],"names":[],"mappings":"AAAA;EACI,cAAY;EACZ,YAAU;EACV,uBAAqB,EAuFxB;EA1FD;IAMQ,gBAAc;IACd,cAAY;IACZ,eAAa;IACb,SAAO;IAAE,QAAM;IAAE,SAAO;IACxB,4BAA2B,EAE9B;EACD;IAbJ;MAcQ,aAAW,EA4ElB,EAAA;EA1FD;IAiBQ,cAAY;IACZ,uBAAsB,EACzB;EAnBL;IAqBQ,eAAa;IACb,WAAS;IACT,YAAU;IACV,eAAa;IACb,mBAAiB;IAKjB,kBAAgB,EACnB;IA/BL;MA2BY,aAAW,EACd;EA5BT;IAiCQ,mBAAiB;IACjB,6BAA2B,EAC9B;EAnCL;IAqCQ,YAAU;IACV,sBAAqB;IACrB,oBAAmB,EACtB;EAxCL;IA0CQ,QAAM;IACN,mBAAiB;IACjB,eAAc;IACd,6CAA2C,EAI9C;IAjDL;MA+CY,+BAA6B,EAChC;EAhDT;IAmDQ,eAAa;IACb,YAAU;IACV,mBAAkB;IAClB,UAAQ;IACR,cAAY,EACf;EAxDL;IA0DQ,oBAAkB;IAClB,YAAU;IACV,iBAAe;IACf,eAAa,EAChB;EA9DL;IAgEQ,QAAM,EACT;EAjEL;IAmEQ,mBAAiB;IACjB,eAAa;IACb,kBAAgB,EASnB;IA9EL;MAuEY,sBAAoB;MACpB,kBAAgB;MAChB,6CAA4C;MAC5C,iCAA+B;MAC/B,0BAAwB;MACxB,iBAAe,EAClB;EA7ET;IAiFY,qBAAmB,EACtB;EAlFT;IAqFQ,aAAW,EAId;IAzFL;MAuFY,mBAAiB,EACpB","file":"nmb.scss","sourcesContent":["netease-music-board{\r\n    display:flex;\r\n    width:75vw;\r\n    flex-direction:column;\r\n    &{\r\n        //元素浮动居中开始\r\n        position:fixed;\r\n        z-index:9999;\r\n        margin:0 auto;\r\n        top:50%;left:0;right:0;\r\n        transform: translateY(-50%);\r\n        //元素浮动居中结束\r\n    }\r\n    @media screen and (max-width:760px){\r\n        width:100vw;\r\n    }\r\n    *{\r\n        display:flex; //令所有子元素成为块元素\r\n        flex-direction: column;\r\n    }\r\n    exiter{\r\n        display:block;\r\n        width:2em;\r\n        height:2em;\r\n        line-height:2;\r\n        text-align:center;\r\n        &::after{ \r\n            content:\"x\";\r\n        }\r\n        //总保持在右上角\r\n        margin-left:auto;\r\n    }\r\n    search-box{\r\n        margin-bottom:1em;\r\n        box-shadow:0 1em 3em -1.5em;\r\n    }\r\n    radio-set{\r\n        height:3em;\r\n        align-content: center;\r\n        flex-direction: row;\r\n    }\r\n    radio{\r\n        flex:1;\r\n        text-align:center;\r\n        line-height: 3;\r\n        font-family:Courier New, Courier, monospace;\r\n        &.selected{\r\n            border-bottom:solid 2px green;\r\n        }\r\n    }\r\n    input#inputer{\r\n        padding:0 1em;\r\n        height:3em;\r\n        line-height: 2.5em;\r\n        border:0;\r\n        outline:none;\r\n    }\r\n    result{\r\n        flex-direction:row;\r\n        height:2em;\r\n        line-height:2em;\r\n        padding:0 1em;\r\n    }\r\n    media-name{\r\n        flex:1;\r\n    }\r\n    button-set{\r\n        line-height:2.5em;\r\n        display:block;\r\n        margin:1em 0.5em;\r\n        * {\r\n            display:inline-block;\r\n            font-weight:bold;\r\n            font-family: Courier New, Courier, monospace;\r\n            border-bottom:1.5px black inset;\r\n            text-transform:uppercase;\r\n            padding:0 0.5em;\r\n        }\r\n    }\r\n    previous{\r\n        &::before{\r\n            content:\"< Prevent\";\r\n        }\r\n    }\r\n    next{\r\n        float:right;\r\n        &::after{\r\n            content:\"After >\";\r\n        }\r\n    }\r\n}"],"sourceRoot":""}]);

// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(9);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 9 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=nmb.js.map