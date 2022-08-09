"use strict";
(() => {
var exports = {};
exports.id = 195;
exports.ids = [195];
exports.modules = {

/***/ 8010:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Blog),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_BlogCard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4723);
/* harmony import */ var _utils_postHelpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6416);





function Blog({ allMetadata  }) {
    const { 0: selectedTags , 1: setSelectedTags  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]);
    const { 0: filterMethod , 1: setFilterMethod  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)("union");
    const allTags = Array.from(new Set(allMetadata.map(({ tags  })=>tags).flat()));
    let filteredPosts;
    if (filterMethod === "union") {
        filteredPosts = allMetadata.filter((metadata)=>{
            return metadata.tags.filter((tag)=>selectedTags.includes(tag)).length > 0;
        });
    } else {
        filteredPosts = allMetadata.filter((metadata)=>{
            return metadata.tags.filter((tag)=>selectedTags.includes(tag)).length === selectedTags.length;
        });
    }
    const orderedPosts = filteredPosts.sort((a, b)=>a.priority - b.priority);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                className: "p-3 text-2xl",
                children: "blog posts"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "flex flex-wrap-reverse gap-5",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
                        className: "flex flex-col gap-4 flex-grow-[3] flex-shrink-[3] basis-[300px]",
                        children: selectedTags.length > 0 ? orderedPosts.map((metadata, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_BlogCard__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                metadata: metadata
                            }, index)) : allMetadata.sort((a, b)=>a.priority - b.priority).map((metadata, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_BlogCard__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                metadata: metadata
                            }, index))
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                        className: "flex-grow-[2] flex-shrink-[2] basis-[200px]",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "m-3 text-lg border-b-2 w-max border-b-base-300",
                                children: "tags"
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "flex flex-wrap pl-3 gap-2",
                                children: allTags.map((filter, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("cursor-pointer select-none rounded-full px-4 py-1 text-xs bg-base-200 transition", "hover:bg-base-300", {
                                            "bg-secondary hover:bg-secondary": selectedTags.includes(filter)
                                        }),
                                        onClick: ()=>{
                                            setSelectedTags((prevSelectedTags)=>{
                                                if (prevSelectedTags.includes(filter)) {
                                                    return prevSelectedTags.filter((prevFilter)=>prevFilter !== filter);
                                                } else {
                                                    return prevSelectedTags.concat(filter);
                                                }
                                            });
                                        },
                                        children: filter
                                    }, index))
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                className: "m-3 mt-6 text-xs border-b-2 w-max border-b-base-300",
                                children: "sort method"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "flex flex-wrap pl-3 gap-2",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("cursor-pointer select-none rounded-full px-4 py-1 text-xs bg-base-200 transition", "hover:bg-base-300", {
                                            "bg-primary hover:bg-primary": filterMethod === "union"
                                        }),
                                        onClick: ()=>setFilterMethod("union"),
                                        children: "union"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("cursor-pointer select-none rounded-full px-4 py-1 text-xs bg-base-200 transition", "hover:bg-base-300", {
                                            "bg-primary hover:bg-primary": filterMethod === "intersection"
                                        }),
                                        onClick: ()=>setFilterMethod("intersection"),
                                        children: "intersection"
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
async function getStaticProps() {
    return {
        props: {
            allMetadata: (0,_utils_postHelpers__WEBPACK_IMPORTED_MODULE_4__/* .fetchAllMetadata */ .R2)()
        }
    };
}


/***/ }),

/***/ 9003:
/***/ ((module) => {

module.exports = require("classnames");

/***/ }),

/***/ 8076:
/***/ ((module) => {

module.exports = require("gray-matter");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 1017:
/***/ ((module) => {

module.exports = require("path");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [952,664,154], () => (__webpack_exec__(8010)));
module.exports = __webpack_exports__;

})();