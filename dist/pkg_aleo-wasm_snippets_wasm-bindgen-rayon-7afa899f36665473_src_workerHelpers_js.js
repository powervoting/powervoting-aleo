/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./pkg/aleo-wasm/snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.js":
/*!*****************************************************************************************!*\
  !*** ./pkg/aleo-wasm/snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.js ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   startWorkers: () => (/* binding */ startWorkers)
/* harmony export */ });
/**
 * Copyright 2021 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// Note: we use `wasm_bindgen_worker_`-prefixed message types to make sure
// we can handle bundling into other files, which might happen to have their
// own `postMessage`/`onmessage` communication channels.
//
// If we didn't take that into the account, we could send much simpler signals
// like just `0` or whatever, but the code would be less resilient.

function waitForMsgType(target, type) {
  return new Promise(resolve => {
    target.addEventListener('message', function onMsg({ data }) {
      if (data == null || data.type !== type) return;
      target.removeEventListener('message', onMsg);
      resolve(data);
    });
  });
}

waitForMsgType(self, 'wasm_bindgen_worker_init').then(async data => {
  // # Note 1
  // Our JS should have been generated in
  // `[out-dir]/snippets/wasm-bindgen-rayon-[hash]/workerHelpers.js`,
  // resolve the main module via `../../..`.
  //
  // This might need updating if the generated structure changes on wasm-bindgen
  // side ever in the future, but works well with bundlers today. The whole
  // point of this crate, after all, is to abstract away unstable features
  // and temporary bugs so that you don't need to deal with them in your code.
  //
  // # Note 2
  // This could be a regular import, but then some bundlers complain about
  // circular deps.
  //
  // Dynamic import could be cheap if this file was inlined into the parent,
  // which would require us just using `../../..` in `new Worker` below,
  // but that doesn't work because wasm-pack unconditionally adds
  // "sideEffects":false (see below).
  //
  // OTOH, even though it can't be inlined, it should be still reasonably
  // cheap since the requested file is already in cache (it was loaded by
  // the main thread).
  const pkg = await __webpack_require__.e(/*! import() */ "pkg_aleo-wasm_aleo_wasm_js").then(__webpack_require__.bind(__webpack_require__, /*! ../../.. */ "./pkg/aleo-wasm/aleo_wasm.js"));
  await pkg.default(data.module, data.memory);
  postMessage({ type: 'wasm_bindgen_worker_ready' });
  pkg.wbg_rayon_start_worker(data.receiver);
});

// Note: this is never used, but necessary to prevent a bug in Firefox
// (https://bugzilla.mozilla.org/show_bug.cgi?id=1702191) where it collects
// Web Workers that have a shared WebAssembly memory with the main thread,
// but are not explicitly rooted via a `Worker` instance.
//
// By storing them in a variable, we can keep `Worker` objects around and
// prevent them from getting GC-d.
let _workers;

async function startWorkers(module, memory, builder) {
  const workerInit = {
    type: 'wasm_bindgen_worker_init',
    module,
    memory,
    receiver: builder.receiver()
  };

  _workers = await Promise.all(
    Array.from({ length: builder.numThreads() }, async () => {
      // Self-spawn into a new Worker.
      //
      // TODO: while `new URL('...', import.meta.url) becomes a semi-standard
      // way to get asset URLs relative to the module across various bundlers
      // and browser, ideally we should switch to `import.meta.resolve`
      // once it becomes a standard.
      //
      // Note: we could use `../../..` as the URL here to inline workerHelpers.js
      // into the parent entry instead of creating another split point -
      // this would be preferable from optimization perspective -
      // however, Webpack then eliminates all message handler code
      // because wasm-pack produces "sideEffects":false in package.json
      // unconditionally.
      //
      // The only way to work around that is to have side effect code
      // in an entry point such as Worker file itself.
      const worker = new Worker(new URL(/* worker import */ __webpack_require__.p + __webpack_require__.u("pkg_aleo-wasm_snippets_wasm-bindgen-rayon-7afa899f36665473_src_workerHelpers_js"), __webpack_require__.b), {
        type: undefined
      });
      worker.postMessage(workerInit);
      await waitForMsgType(worker, 'wasm_bindgen_worker_ready');
      return worker;
    })
  );
  builder.build();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/ensure chunk */
/******/ 	(() => {
/******/ 		__webpack_require__.f = {};
/******/ 		// This file contains only the entry chunk.
/******/ 		// The chunk loading function for additional chunks
/******/ 		__webpack_require__.e = (chunkId) => {
/******/ 			return Promise.all(Object.keys(__webpack_require__.f).reduce((promises, key) => {
/******/ 				__webpack_require__.f[key](chunkId, promises);
/******/ 				return promises;
/******/ 			}, []));
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get javascript chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference async chunks
/******/ 		__webpack_require__.u = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + ".js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/harmony module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.hmd = (module) => {
/******/ 			module = Object.create(module);
/******/ 			if (!module.children) module.children = [];
/******/ 			Object.defineProperty(module, 'exports', {
/******/ 				enumerable: true,
/******/ 				set: () => {
/******/ 					throw new Error('ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: ' + module.id);
/******/ 				}
/******/ 			});
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/importScripts chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = self.location + "";
/******/ 		
/******/ 		// object to store loaded chunks
/******/ 		// "1" means "already loaded"
/******/ 		var installedChunks = {
/******/ 			"pkg_aleo-wasm_snippets_wasm-bindgen-rayon-7afa899f36665473_src_workerHelpers_js": 1
/******/ 		};
/******/ 		
/******/ 		// importScripts chunk loading
/******/ 		var installChunk = (data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 				}
/******/ 			}
/******/ 			if(runtime) runtime(__webpack_require__);
/******/ 			while(chunkIds.length)
/******/ 				installedChunks[chunkIds.pop()] = 1;
/******/ 			parentChunkLoadingFunction(data);
/******/ 		};
/******/ 		__webpack_require__.f.i = (chunkId, promises) => {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				if(true) { // all chunks have JS
/******/ 					importScripts(__webpack_require__.p + __webpack_require__.u(chunkId));
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkreact_rust_chrome_extension"] = self["webpackChunkreact_rust_chrome_extension"] || [];
/******/ 		var parentChunkLoadingFunction = chunkLoadingGlobal.push.bind(chunkLoadingGlobal);
/******/ 		chunkLoadingGlobal.push = installChunk;
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./pkg/aleo-wasm/snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.js");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtnX2FsZW8td2FzbV9zbmlwcGV0c193YXNtLWJpbmRnZW4tcmF5b24tN2FmYTg5OWYzNjY2NTQ3M19zcmNfd29ya2VySGVscGVyc19qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELE1BQU07QUFDOUQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1S0FBa0I7QUFDdEM7QUFDQSxnQkFBZ0IsbUNBQW1DO0FBQ25EO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhCQUE4QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywyS0FBcUM7QUFDN0UsY0FBYyxTQUFRO0FBQ3RCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOzs7Ozs7O1VDdkdBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOzs7OztXQzVCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsRUFBRTtXQUNGOzs7OztXQ1JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDSkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxHQUFHO1dBQ0g7V0FDQTtXQUNBLENBQUM7Ozs7O1dDUEQ7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLEVBQUU7V0FDRjtXQUNBOzs7OztXQ1ZBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0NsQkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGFBQWE7V0FDYjtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7Ozs7O1VFcENBO1VBQ0E7VUFDQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uLy4vcGtnL2FsZW8td2FzbS9zbmlwcGV0cy93YXNtLWJpbmRnZW4tcmF5b24tN2FmYTg5OWYzNjY2NTQ3My9zcmMvd29ya2VySGVscGVycy5qcyIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2Vuc3VyZSBjaHVuayIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFybW9ueSBtb2R1bGUgZGVjb3JhdG9yIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2ltcG9ydFNjcmlwdHMgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENvcHlyaWdodCAyMDIxIEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqICAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbi8vIE5vdGU6IHdlIHVzZSBgd2FzbV9iaW5kZ2VuX3dvcmtlcl9gLXByZWZpeGVkIG1lc3NhZ2UgdHlwZXMgdG8gbWFrZSBzdXJlXHJcbi8vIHdlIGNhbiBoYW5kbGUgYnVuZGxpbmcgaW50byBvdGhlciBmaWxlcywgd2hpY2ggbWlnaHQgaGFwcGVuIHRvIGhhdmUgdGhlaXJcclxuLy8gb3duIGBwb3N0TWVzc2FnZWAvYG9ubWVzc2FnZWAgY29tbXVuaWNhdGlvbiBjaGFubmVscy5cclxuLy9cclxuLy8gSWYgd2UgZGlkbid0IHRha2UgdGhhdCBpbnRvIHRoZSBhY2NvdW50LCB3ZSBjb3VsZCBzZW5kIG11Y2ggc2ltcGxlciBzaWduYWxzXHJcbi8vIGxpa2UganVzdCBgMGAgb3Igd2hhdGV2ZXIsIGJ1dCB0aGUgY29kZSB3b3VsZCBiZSBsZXNzIHJlc2lsaWVudC5cclxuXHJcbmZ1bmN0aW9uIHdhaXRGb3JNc2dUeXBlKHRhcmdldCwgdHlwZSkge1xyXG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcclxuICAgIHRhcmdldC5hZGRFdmVudExpc3RlbmVyKCdtZXNzYWdlJywgZnVuY3Rpb24gb25Nc2coeyBkYXRhIH0pIHtcclxuICAgICAgaWYgKGRhdGEgPT0gbnVsbCB8fCBkYXRhLnR5cGUgIT09IHR5cGUpIHJldHVybjtcclxuICAgICAgdGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBvbk1zZyk7XHJcbiAgICAgIHJlc29sdmUoZGF0YSk7XHJcbiAgICB9KTtcclxuICB9KTtcclxufVxyXG5cclxud2FpdEZvck1zZ1R5cGUoc2VsZiwgJ3dhc21fYmluZGdlbl93b3JrZXJfaW5pdCcpLnRoZW4oYXN5bmMgZGF0YSA9PiB7XHJcbiAgLy8gIyBOb3RlIDFcclxuICAvLyBPdXIgSlMgc2hvdWxkIGhhdmUgYmVlbiBnZW5lcmF0ZWQgaW5cclxuICAvLyBgW291dC1kaXJdL3NuaXBwZXRzL3dhc20tYmluZGdlbi1yYXlvbi1baGFzaF0vd29ya2VySGVscGVycy5qc2AsXHJcbiAgLy8gcmVzb2x2ZSB0aGUgbWFpbiBtb2R1bGUgdmlhIGAuLi8uLi8uLmAuXHJcbiAgLy9cclxuICAvLyBUaGlzIG1pZ2h0IG5lZWQgdXBkYXRpbmcgaWYgdGhlIGdlbmVyYXRlZCBzdHJ1Y3R1cmUgY2hhbmdlcyBvbiB3YXNtLWJpbmRnZW5cclxuICAvLyBzaWRlIGV2ZXIgaW4gdGhlIGZ1dHVyZSwgYnV0IHdvcmtzIHdlbGwgd2l0aCBidW5kbGVycyB0b2RheS4gVGhlIHdob2xlXHJcbiAgLy8gcG9pbnQgb2YgdGhpcyBjcmF0ZSwgYWZ0ZXIgYWxsLCBpcyB0byBhYnN0cmFjdCBhd2F5IHVuc3RhYmxlIGZlYXR1cmVzXHJcbiAgLy8gYW5kIHRlbXBvcmFyeSBidWdzIHNvIHRoYXQgeW91IGRvbid0IG5lZWQgdG8gZGVhbCB3aXRoIHRoZW0gaW4geW91ciBjb2RlLlxyXG4gIC8vXHJcbiAgLy8gIyBOb3RlIDJcclxuICAvLyBUaGlzIGNvdWxkIGJlIGEgcmVndWxhciBpbXBvcnQsIGJ1dCB0aGVuIHNvbWUgYnVuZGxlcnMgY29tcGxhaW4gYWJvdXRcclxuICAvLyBjaXJjdWxhciBkZXBzLlxyXG4gIC8vXHJcbiAgLy8gRHluYW1pYyBpbXBvcnQgY291bGQgYmUgY2hlYXAgaWYgdGhpcyBmaWxlIHdhcyBpbmxpbmVkIGludG8gdGhlIHBhcmVudCxcclxuICAvLyB3aGljaCB3b3VsZCByZXF1aXJlIHVzIGp1c3QgdXNpbmcgYC4uLy4uLy4uYCBpbiBgbmV3IFdvcmtlcmAgYmVsb3csXHJcbiAgLy8gYnV0IHRoYXQgZG9lc24ndCB3b3JrIGJlY2F1c2Ugd2FzbS1wYWNrIHVuY29uZGl0aW9uYWxseSBhZGRzXHJcbiAgLy8gXCJzaWRlRWZmZWN0c1wiOmZhbHNlIChzZWUgYmVsb3cpLlxyXG4gIC8vXHJcbiAgLy8gT1RPSCwgZXZlbiB0aG91Z2ggaXQgY2FuJ3QgYmUgaW5saW5lZCwgaXQgc2hvdWxkIGJlIHN0aWxsIHJlYXNvbmFibHlcclxuICAvLyBjaGVhcCBzaW5jZSB0aGUgcmVxdWVzdGVkIGZpbGUgaXMgYWxyZWFkeSBpbiBjYWNoZSAoaXQgd2FzIGxvYWRlZCBieVxyXG4gIC8vIHRoZSBtYWluIHRocmVhZCkuXHJcbiAgY29uc3QgcGtnID0gYXdhaXQgaW1wb3J0KCcuLi8uLi8uLicpO1xyXG4gIGF3YWl0IHBrZy5kZWZhdWx0KGRhdGEubW9kdWxlLCBkYXRhLm1lbW9yeSk7XHJcbiAgcG9zdE1lc3NhZ2UoeyB0eXBlOiAnd2FzbV9iaW5kZ2VuX3dvcmtlcl9yZWFkeScgfSk7XHJcbiAgcGtnLndiZ19yYXlvbl9zdGFydF93b3JrZXIoZGF0YS5yZWNlaXZlcik7XHJcbn0pO1xyXG5cclxuLy8gTm90ZTogdGhpcyBpcyBuZXZlciB1c2VkLCBidXQgbmVjZXNzYXJ5IHRvIHByZXZlbnQgYSBidWcgaW4gRmlyZWZveFxyXG4vLyAoaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MTcwMjE5MSkgd2hlcmUgaXQgY29sbGVjdHNcclxuLy8gV2ViIFdvcmtlcnMgdGhhdCBoYXZlIGEgc2hhcmVkIFdlYkFzc2VtYmx5IG1lbW9yeSB3aXRoIHRoZSBtYWluIHRocmVhZCxcclxuLy8gYnV0IGFyZSBub3QgZXhwbGljaXRseSByb290ZWQgdmlhIGEgYFdvcmtlcmAgaW5zdGFuY2UuXHJcbi8vXHJcbi8vIEJ5IHN0b3JpbmcgdGhlbSBpbiBhIHZhcmlhYmxlLCB3ZSBjYW4ga2VlcCBgV29ya2VyYCBvYmplY3RzIGFyb3VuZCBhbmRcclxuLy8gcHJldmVudCB0aGVtIGZyb20gZ2V0dGluZyBHQy1kLlxyXG5sZXQgX3dvcmtlcnM7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnRXb3JrZXJzKG1vZHVsZSwgbWVtb3J5LCBidWlsZGVyKSB7XHJcbiAgY29uc3Qgd29ya2VySW5pdCA9IHtcclxuICAgIHR5cGU6ICd3YXNtX2JpbmRnZW5fd29ya2VyX2luaXQnLFxyXG4gICAgbW9kdWxlLFxyXG4gICAgbWVtb3J5LFxyXG4gICAgcmVjZWl2ZXI6IGJ1aWxkZXIucmVjZWl2ZXIoKVxyXG4gIH07XHJcblxyXG4gIF93b3JrZXJzID0gYXdhaXQgUHJvbWlzZS5hbGwoXHJcbiAgICBBcnJheS5mcm9tKHsgbGVuZ3RoOiBidWlsZGVyLm51bVRocmVhZHMoKSB9LCBhc3luYyAoKSA9PiB7XHJcbiAgICAgIC8vIFNlbGYtc3Bhd24gaW50byBhIG5ldyBXb3JrZXIuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIFRPRE86IHdoaWxlIGBuZXcgVVJMKCcuLi4nLCBpbXBvcnQubWV0YS51cmwpIGJlY29tZXMgYSBzZW1pLXN0YW5kYXJkXHJcbiAgICAgIC8vIHdheSB0byBnZXQgYXNzZXQgVVJMcyByZWxhdGl2ZSB0byB0aGUgbW9kdWxlIGFjcm9zcyB2YXJpb3VzIGJ1bmRsZXJzXHJcbiAgICAgIC8vIGFuZCBicm93c2VyLCBpZGVhbGx5IHdlIHNob3VsZCBzd2l0Y2ggdG8gYGltcG9ydC5tZXRhLnJlc29sdmVgXHJcbiAgICAgIC8vIG9uY2UgaXQgYmVjb21lcyBhIHN0YW5kYXJkLlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBOb3RlOiB3ZSBjb3VsZCB1c2UgYC4uLy4uLy4uYCBhcyB0aGUgVVJMIGhlcmUgdG8gaW5saW5lIHdvcmtlckhlbHBlcnMuanNcclxuICAgICAgLy8gaW50byB0aGUgcGFyZW50IGVudHJ5IGluc3RlYWQgb2YgY3JlYXRpbmcgYW5vdGhlciBzcGxpdCBwb2ludCAtXHJcbiAgICAgIC8vIHRoaXMgd291bGQgYmUgcHJlZmVyYWJsZSBmcm9tIG9wdGltaXphdGlvbiBwZXJzcGVjdGl2ZSAtXHJcbiAgICAgIC8vIGhvd2V2ZXIsIFdlYnBhY2sgdGhlbiBlbGltaW5hdGVzIGFsbCBtZXNzYWdlIGhhbmRsZXIgY29kZVxyXG4gICAgICAvLyBiZWNhdXNlIHdhc20tcGFjayBwcm9kdWNlcyBcInNpZGVFZmZlY3RzXCI6ZmFsc2UgaW4gcGFja2FnZS5qc29uXHJcbiAgICAgIC8vIHVuY29uZGl0aW9uYWxseS5cclxuICAgICAgLy9cclxuICAgICAgLy8gVGhlIG9ubHkgd2F5IHRvIHdvcmsgYXJvdW5kIHRoYXQgaXMgdG8gaGF2ZSBzaWRlIGVmZmVjdCBjb2RlXHJcbiAgICAgIC8vIGluIGFuIGVudHJ5IHBvaW50IHN1Y2ggYXMgV29ya2VyIGZpbGUgaXRzZWxmLlxyXG4gICAgICBjb25zdCB3b3JrZXIgPSBuZXcgV29ya2VyKG5ldyBVUkwoJy4vd29ya2VySGVscGVycy5qcycsIGltcG9ydC5tZXRhLnVybCksIHtcclxuICAgICAgICB0eXBlOiAnbW9kdWxlJ1xyXG4gICAgICB9KTtcclxuICAgICAgd29ya2VyLnBvc3RNZXNzYWdlKHdvcmtlckluaXQpO1xyXG4gICAgICBhd2FpdCB3YWl0Rm9yTXNnVHlwZSh3b3JrZXIsICd3YXNtX2JpbmRnZW5fd29ya2VyX3JlYWR5Jyk7XHJcbiAgICAgIHJldHVybiB3b3JrZXI7XHJcbiAgICB9KVxyXG4gICk7XHJcbiAgYnVpbGRlci5idWlsZCgpO1xyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0aWQ6IG1vZHVsZUlkLFxuXHRcdGxvYWRlZDogZmFsc2UsXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuXHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmYgPSB7fTtcbi8vIFRoaXMgZmlsZSBjb250YWlucyBvbmx5IHRoZSBlbnRyeSBjaHVuay5cbi8vIFRoZSBjaHVuayBsb2FkaW5nIGZ1bmN0aW9uIGZvciBhZGRpdGlvbmFsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5lID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIFByb21pc2UuYWxsKE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uZikucmVkdWNlKChwcm9taXNlcywga2V5KSA9PiB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mW2tleV0oY2h1bmtJZCwgcHJvbWlzZXMpO1xuXHRcdHJldHVybiBwcm9taXNlcztcblx0fSwgW10pKTtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYXN5bmMgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuanNcIjtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtZCA9IChtb2R1bGUpID0+IHtcblx0bW9kdWxlID0gT2JqZWN0LmNyZWF0ZShtb2R1bGUpO1xuXHRpZiAoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsICdleHBvcnRzJywge1xuXHRcdGVudW1lcmFibGU6IHRydWUsXG5cdFx0c2V0OiAoKSA9PiB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoJ0VTIE1vZHVsZXMgbWF5IG5vdCBhc3NpZ24gbW9kdWxlLmV4cG9ydHMgb3IgZXhwb3J0cy4qLCBVc2UgRVNNIGV4cG9ydCBzeW50YXgsIGluc3RlYWQ6ICcgKyBtb2R1bGUuaWQpO1xuXHRcdH1cblx0fSk7XG5cdHJldHVybiBtb2R1bGU7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmM7XG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkge1xuXHRcdFx0dmFyIGkgPSBzY3JpcHRzLmxlbmd0aCAtIDE7XG5cdFx0XHR3aGlsZSAoaSA+IC0xICYmICFzY3JpcHRVcmwpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBzZWxmLmxvY2F0aW9uICsgXCJcIjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBjaHVua3Ncbi8vIFwiMVwiIG1lYW5zIFwiYWxyZWFkeSBsb2FkZWRcIlxudmFyIGluc3RhbGxlZENodW5rcyA9IHtcblx0XCJwa2dfYWxlby13YXNtX3NuaXBwZXRzX3dhc20tYmluZGdlbi1yYXlvbi03YWZhODk5ZjM2NjY1NDczX3NyY193b3JrZXJIZWxwZXJzX2pzXCI6IDFcbn07XG5cbi8vIGltcG9ydFNjcmlwdHMgY2h1bmsgbG9hZGluZ1xudmFyIGluc3RhbGxDaHVuayA9IChkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdGZvcih2YXIgbW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8obW9yZU1vZHVsZXMsIG1vZHVsZUlkKSkge1xuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgcnVudGltZShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0d2hpbGUoY2h1bmtJZHMubGVuZ3RoKVxuXHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkcy5wb3AoKV0gPSAxO1xuXHRwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcbn07XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmYuaSA9IChjaHVua0lkLCBwcm9taXNlcykgPT4ge1xuXHQvLyBcIjFcIiBpcyB0aGUgc2lnbmFsIGZvciBcImFscmVhZHkgbG9hZGVkXCJcblx0aWYoIWluc3RhbGxlZENodW5rc1tjaHVua0lkXSkge1xuXHRcdGlmKHRydWUpIHsgLy8gYWxsIGNodW5rcyBoYXZlIEpTXG5cdFx0XHRpbXBvcnRTY3JpcHRzKF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18udShjaHVua0lkKSk7XG5cdFx0fVxuXHR9XG59O1xuXG52YXIgY2h1bmtMb2FkaW5nR2xvYmFsID0gc2VsZltcIndlYnBhY2tDaHVua3JlYWN0X3J1c3RfY2hyb21lX2V4dGVuc2lvblwiXSA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtyZWFjdF9ydXN0X2Nocm9tZV9leHRlbnNpb25cIl0gfHwgW107XG52YXIgcGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24gPSBjaHVua0xvYWRpbmdHbG9iYWwucHVzaC5iaW5kKGNodW5rTG9hZGluZ0dsb2JhbCk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IGluc3RhbGxDaHVuaztcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdCIsIiIsIi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLy8gVGhpcyBlbnRyeSBtb2R1bGUgaXMgcmVmZXJlbmNlZCBieSBvdGhlciBtb2R1bGVzIHNvIGl0IGNhbid0IGJlIGlubGluZWRcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vcGtnL2FsZW8td2FzbS9zbmlwcGV0cy93YXNtLWJpbmRnZW4tcmF5b24tN2FmYTg5OWYzNjY2NTQ3My9zcmMvd29ya2VySGVscGVycy5qc1wiKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==