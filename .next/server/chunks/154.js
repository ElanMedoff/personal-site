"use strict";
exports.id = 154;
exports.ids = [154];
exports.modules = {

/***/ 4723:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ BlogCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9003);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);



function BlogCard({ metadata  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
        href: `/blog/${metadata.slug}`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: classnames__WEBPACK_IMPORTED_MODULE_1___default()("max-w-[500px] cursor-pointer rounded-2xl flex items-center p-3 gap-3", "border-base-100 border-2 hover:border-primary"),
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                        className: "font-semibold mb-1",
                        children: metadata.title
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-xs italic mb-2",
                        children: metadata.lastUpdated
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "text-xs mb-2",
                        children: metadata.abstract
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: metadata.tags.map((tag, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "bg-secondary text-secondary-content rounded-full px-4 py-1 text-xs mr-1",
                                children: tag
                            }, index))
                    })
                ]
            })
        })
    });
};


/***/ }),

/***/ 6416:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C3": () => (/* binding */ fetchPostBySlug),
/* harmony export */   "R2": () => (/* binding */ fetchAllMetadata),
/* harmony export */   "mh": () => (/* binding */ fetchPostSlugs)
/* harmony export */ });
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1017);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8076);
/* harmony import */ var gray_matter__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(gray_matter__WEBPACK_IMPORTED_MODULE_2__);



const postsDirectory = (0,path__WEBPACK_IMPORTED_MODULE_1__.join)(process.cwd(), "_posts");
function fetchAllPaths() {
    const paths = (0,fs__WEBPACK_IMPORTED_MODULE_0__.readdirSync)(postsDirectory);
    return paths.filter((path)=>path !== ".DS_Store");
}
function fetchPostSlugs() {
    const paths = fetchAllPaths();
    return paths.map((path)=>({
            params: {
                slug: path.replace(".md", "")
            }
        }));
}
async function fetchPostBySlug(slugToFetch) {
    const path = `${slugToFetch}.md`;
    const rawPost = (0,fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync)((0,path__WEBPACK_IMPORTED_MODULE_1__.join)(postsDirectory, path));
    const { content , data  } = gray_matter__WEBPACK_IMPORTED_MODULE_2___default()(rawPost);
    const allMetadata = fetchAllMetadata();
    const relatedPaths = allMetadata.filter((metadata)=>{
        if (metadata.slug === slugToFetch) return false;
        return metadata.tags.filter((tag)=>data.tags.includes(tag)).length > 0;
    }).map((metadata)=>`${metadata.slug}.md`);
    const relatedPath = relatedPaths[Math.floor(Math.random() * relatedPaths.length)];
    const rawRelatedPost = (0,fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync)((0,path__WEBPACK_IMPORTED_MODULE_1__.join)(postsDirectory, relatedPath));
    const { data: relatedData  } = gray_matter__WEBPACK_IMPORTED_MODULE_2___default()(rawRelatedPost);
    return {
        post: {
            content,
            metadata: {
                ...data
            }
        },
        relatedPostMetadata: {
            ...relatedData
        }
    };
}
function fetchAllMetadata() {
    const paths = fetchAllPaths();
    return paths.map((path)=>{
        const rawPost = (0,fs__WEBPACK_IMPORTED_MODULE_0__.readFileSync)((0,path__WEBPACK_IMPORTED_MODULE_1__.join)(postsDirectory, path));
        const { data: metadata  } = gray_matter__WEBPACK_IMPORTED_MODULE_2___default()(rawPost);
        return metadata;
    });
}


/***/ })

};
;