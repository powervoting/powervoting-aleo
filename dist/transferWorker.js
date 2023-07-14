/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/worker/worker.js":
/*!******************************!*\
  !*** ./src/worker/worker.js ***!
  \******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../pkg/aleo-wasm */ "./pkg/aleo-wasm/aleo_wasm.js");
/* harmony import */ var _api_requestApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/requestApi */ "./src/api/requestApi.ts");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ "./src/constants/index.ts");
/* harmony import */ var _model_TransferType__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../model/TransferType */ "./src/model/TransferType.ts");





await (0,_pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__["default"])();
await _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.initThreadPool(navigator.hardwareConcurrency ? navigator.hardwareConcurrency : 8);
const aleoProgramManager = new _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.ProgramManager();

/**
 * 开始转账
 */
async function transferStart(privateKey, to, amount, amountRecord, gas, gasRecord) {
    try {
        let transferTransaction = await aleoProgramManager.transfer(
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.PrivateKey.from_string(privateKey),
            amount,
            to,
            (0,_model_TransferType__WEBPACK_IMPORTED_MODULE_2__.toTransferString)(_model_TransferType__WEBPACK_IMPORTED_MODULE_2__.TransferType.PRIVATE),
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.RecordPlaintext.fromString(amountRecord),
            gas,
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.RecordPlaintext.fromString(gasRecord),
            _api_requestApi__WEBPACK_IMPORTED_MODULE_0__.ALEO_PEER_URL,
            true);
        if (transferTransaction) {
            return transferTransaction.toString()
        } else {
            return ""
        }
    } catch (e) {
        return ""
    }
}

/**
 * 开始执行合约
 */
async function executeStart(privateKey, program, inputs, functionName, fee, feeRecord) {
    try {
        let executeTransaction = await aleoProgramManager.execute(
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.PrivateKey.from_string(privateKey),
            program,
            functionName,
            inputs.split(" "),
            fee,
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.RecordPlaintext.fromString(feeRecord),
            _api_requestApi__WEBPACK_IMPORTED_MODULE_0__.ALEO_PEER_URL,
            true);
        if (executeTransaction) {
            return executeTransaction.toString()
        } else {
            return ""
        }
    } catch (e) {
        return ""
    }
}

/**
 * 开始拆分record
 */
async function splitRecordStart(privateKey, splitAmount, record) {
    try {
        let splitTransaction = await aleoProgramManager.split(
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.PrivateKey.from_string(privateKey),
            splitAmount,
            record,
            _api_requestApi__WEBPACK_IMPORTED_MODULE_0__.ALEO_PEER_URL, true
        );
        if (splitTransaction) {
            return splitTransaction.toString()
        } else {
            return ""
        }
    } catch (e) {
        return ""
    }
}

/**
 * join record
 */
async function joinRecordStart(privateKey, record_1, record_2, fee_credits, fee_record,) {
    try {
        // console.log("joinRecordStart: %s, record_1(%s),record_2(%s),fee_record(%s)", privateKey, record_1, record_2,fee_record)
        let joinTransaction = await aleoProgramManager.join(
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.PrivateKey.from_string(privateKey),
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.RecordPlaintext.fromString(record_1),
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.RecordPlaintext.fromString(record_2),
            fee_credits,
            _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.RecordPlaintext.fromString(fee_record),
            _api_requestApi__WEBPACK_IMPORTED_MODULE_0__.ALEO_PEER_URL, true
        );
        if (joinTransaction) {
            return joinTransaction.toString()
        } else {
            return ""
        }
    } catch (e) {
        return ""
    }
}

/**
 * web worker
 */
self.addEventListener("message", ev => {
    if (ev.data.type === _constants__WEBPACK_IMPORTED_MODULE_1__.TRANSFER_START) {
        let {id, privateKey, to, amount, amountRecord, gas, gasRecord,} = ev.data;
        (async function () {
            // console.log("transfer start: %s, amountRecord(%s),gasRecord(%s)", id, amountRecord.record, gasRecord.record)
            // console.time("transfer time:")
            let transaction = await transferStart(privateKey, to, amount, amountRecord.record, gas, gasRecord.record);
            // console.timeEnd("transfer time:")
            // console.log("transaction::::=====:::: ", transaction)
            self.postMessage({
                type: _constants__WEBPACK_IMPORTED_MODULE_1__.TRANSFER_COMPILE, transferTransaction: {
                    id: id,
                    address: _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.PrivateKey.from_string(privateKey).to_address().to_string(),
                    transactionData: transaction,
                    usedRecords: [amountRecord, gasRecord]
                }
            });
        })();
    } else if (ev.data.type === _constants__WEBPACK_IMPORTED_MODULE_1__.EXECUTE_START) {
        let {id, program, functionName, inputs, privateKey, fee, feeRecord} = ev.data;
        (async function () {
            // console.log("execute start: %s, program(%s), functionName(%s),inputs(%s),feeRecord(%s)", id, program, functionName, inputs, feeRecord.record)
            // console.time("execute time:")
            let executeTransaction = await executeStart(privateKey, program, inputs, functionName, fee, feeRecord.record)
            // console.timeEnd("execute time:")
            // console.log("execute :::: executeTransaction ==== ", executeTransaction)
            self.postMessage({
                type: _constants__WEBPACK_IMPORTED_MODULE_1__.EXECUTE_COMPILE, executeTransaction: {
                    id: id,
                    address: _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.PrivateKey.from_string(privateKey).to_address().to_string(),
                    executeTransactionData: executeTransaction,
                    usedRecord: feeRecord
                }
            });
        })();
    } else if (ev.data.type === _constants__WEBPACK_IMPORTED_MODULE_1__.SPLIT_START) {
        let {
            key,
            splitAmount,
            record,
        } = ev.data;
        (async function () {
            try {
                // console.log("split start: %s, splitAmount(%s),record(%s)", key, splitAmount, record)
                // console.time("split time:")
                let splitTransaction = await splitRecordStart()
                // console.timeEnd("split time:")
                // console.log("split :::: splitTransaction ==== ", splitTransaction)
                if (splitTransaction) {
                    self.postMessage({type: _constants__WEBPACK_IMPORTED_MODULE_1__.SPLIT_COMPILE, splitTransaction: splitTransaction});
                }
            } catch (error) {
                self.postMessage({type: _constants__WEBPACK_IMPORTED_MODULE_1__.SPLIT_FILED, errorMessage: error});
            }
        })();
    } else if (ev.data.type === _constants__WEBPACK_IMPORTED_MODULE_1__.JOIN_START) {
        let {
            id,
            privateKey,
            record1,
            record2,
            fee,
            feeRecord,
        } = ev.data;
        (async function () {
            try {
                let joinTransaction = await joinRecordStart(privateKey, record1.record, record2.record, fee, feeRecord.record)
                // console.log(joinTransaction)
                self.postMessage({
                    type: _constants__WEBPACK_IMPORTED_MODULE_1__.JOIN_COMPILE, joinTransaction: {
                        id: id,
                        address: _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_3__.PrivateKey.from_string(privateKey).to_address().to_string(),
                        joinTransactionData: joinTransaction,
                        usedRecord: [record1, record2, feeRecord]
                    }
                });
            } catch (error) {
                self.postMessage({type: _constants__WEBPACK_IMPORTED_MODULE_1__.JOIN_FILED, errorMessage: error});
            }
        })();
    }
});


__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } }, 1);

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
/******/ 	// the startup function
/******/ 	__webpack_require__.x = () => {
/******/ 		// Load entry module and return exports
/******/ 		// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 		var __webpack_exports__ = __webpack_require__.O(undefined, ["pkg_aleo-wasm_aleo_wasm_js","src_api_requestApi_ts-src_constants_index_ts-src_model_TransferType_ts-pkg_aleo-wasm_snippets-885fdd"], () => (__webpack_require__("./src/worker/worker.js")))
/******/ 		__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 		return __webpack_exports__;
/******/ 	};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/async module */
/******/ 	(() => {
/******/ 		var webpackQueues = typeof Symbol === "function" ? Symbol("webpack queues") : "__webpack_queues__";
/******/ 		var webpackExports = typeof Symbol === "function" ? Symbol("webpack exports") : "__webpack_exports__";
/******/ 		var webpackError = typeof Symbol === "function" ? Symbol("webpack error") : "__webpack_error__";
/******/ 		var resolveQueue = (queue) => {
/******/ 			if(queue && queue.d < 1) {
/******/ 				queue.d = 1;
/******/ 				queue.forEach((fn) => (fn.r--));
/******/ 				queue.forEach((fn) => (fn.r-- ? fn.r++ : fn()));
/******/ 			}
/******/ 		}
/******/ 		var wrapDeps = (deps) => (deps.map((dep) => {
/******/ 			if(dep !== null && typeof dep === "object") {
/******/ 				if(dep[webpackQueues]) return dep;
/******/ 				if(dep.then) {
/******/ 					var queue = [];
/******/ 					queue.d = 0;
/******/ 					dep.then((r) => {
/******/ 						obj[webpackExports] = r;
/******/ 						resolveQueue(queue);
/******/ 					}, (e) => {
/******/ 						obj[webpackError] = e;
/******/ 						resolveQueue(queue);
/******/ 					});
/******/ 					var obj = {};
/******/ 					obj[webpackQueues] = (fn) => (fn(queue));
/******/ 					return obj;
/******/ 				}
/******/ 			}
/******/ 			var ret = {};
/******/ 			ret[webpackQueues] = x => {};
/******/ 			ret[webpackExports] = dep;
/******/ 			return ret;
/******/ 		}));
/******/ 		__webpack_require__.a = (module, body, hasAwait) => {
/******/ 			var queue;
/******/ 			hasAwait && ((queue = []).d = -1);
/******/ 			var depQueues = new Set();
/******/ 			var exports = module.exports;
/******/ 			var currentDeps;
/******/ 			var outerResolve;
/******/ 			var reject;
/******/ 			var promise = new Promise((resolve, rej) => {
/******/ 				reject = rej;
/******/ 				outerResolve = resolve;
/******/ 			});
/******/ 			promise[webpackExports] = exports;
/******/ 			promise[webpackQueues] = (fn) => (queue && fn(queue), depQueues.forEach(fn), promise["catch"](x => {}));
/******/ 			module.exports = promise;
/******/ 			body((deps) => {
/******/ 				currentDeps = wrapDeps(deps);
/******/ 				var fn;
/******/ 				var getResult = () => (currentDeps.map((d) => {
/******/ 					if(d[webpackError]) throw d[webpackError];
/******/ 					return d[webpackExports];
/******/ 				}))
/******/ 				var promise = new Promise((resolve) => {
/******/ 					fn = () => (resolve(getResult));
/******/ 					fn.r = 0;
/******/ 					var fnQueue = (q) => (q !== queue && !depQueues.has(q) && (depQueues.add(q), q && !q.d && (fn.r++, q.push(fn))));
/******/ 					currentDeps.map((dep) => (dep[webpackQueues](fnQueue)));
/******/ 				});
/******/ 				return fn.r ? promise : getResult();
/******/ 			}, (err) => ((err ? reject(promise[webpackError] = err) : outerResolve(exports)), resolveQueue(queue)));
/******/ 			queue && queue.d < 0 && (queue.d = 0);
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 		// This function allow to reference async chunks and sibling chunks for the entrypoint
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
/******/ 			"transferWorker": 1
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
/******/ 	/* webpack/runtime/startup chunk dependencies */
/******/ 	(() => {
/******/ 		var next = __webpack_require__.x;
/******/ 		__webpack_require__.x = () => {
/******/ 			return Promise.all([
/******/ 				__webpack_require__.e("pkg_aleo-wasm_aleo_wasm_js"),
/******/ 				__webpack_require__.e("src_api_requestApi_ts-src_constants_index_ts-src_model_TransferType_ts-pkg_aleo-wasm_snippets-885fdd")
/******/ 			]).then(next);
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// run startup
/******/ 	var __webpack_exports__ = __webpack_require__.x();
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O1dDTkE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDbEJBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxhQUFhO1dBQ2I7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOztXQUVBOztXQUVBOzs7OztXQ3BDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7VUVOQTtVQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL3dvcmtlci93b3JrZXIuanMiLCJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvYXN5bmMgbW9kdWxlIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9lbnN1cmUgY2h1bmsiLCJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9nZXQgamF2YXNjcmlwdCBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2dsb2JhbCIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhcm1vbnkgbW9kdWxlIGRlY29yYXRvciIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9pbXBvcnRTY3JpcHRzIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uL3dlYnBhY2svcnVudGltZS9zdGFydHVwIGNodW5rIGRlcGVuZGVuY2llcyIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGluaXQsICogYXMgYWxlbyBmcm9tICcuLi8uLi9wa2cvYWxlby13YXNtJ1xyXG5pbXBvcnQge0FMRU9fUEVFUl9VUkx9IGZyb20gXCIuLi9hcGkvcmVxdWVzdEFwaVwiO1xyXG5pbXBvcnQge1xyXG4gICAgRVhFQ1VURV9DT01QSUxFLFxyXG4gICAgRVhFQ1VURV9TVEFSVCwgSk9JTl9DT01QSUxFLCBKT0lOX0ZJTEVELCBKT0lOX1NUQVJULFxyXG4gICAgU1BMSVRfQ09NUElMRSxcclxuICAgIFNQTElUX0ZJTEVELFxyXG4gICAgU1BMSVRfU1RBUlQsXHJcbiAgICBUUkFOU0ZFUl9DT01QSUxFLFxyXG4gICAgVFJBTlNGRVJfU1RBUlRcclxufSBmcm9tIFwiLi4vY29uc3RhbnRzXCI7XHJcbmltcG9ydCB7dG9UcmFuc2ZlclN0cmluZywgVHJhbnNmZXJUeXBlfSBmcm9tIFwiLi4vbW9kZWwvVHJhbnNmZXJUeXBlXCI7XHJcblxyXG5hd2FpdCBpbml0KCk7XHJcbmF3YWl0IGFsZW8uaW5pdFRocmVhZFBvb2wobmF2aWdhdG9yLmhhcmR3YXJlQ29uY3VycmVuY3kgPyBuYXZpZ2F0b3IuaGFyZHdhcmVDb25jdXJyZW5jeSA6IDgpO1xyXG5jb25zdCBhbGVvUHJvZ3JhbU1hbmFnZXIgPSBuZXcgYWxlby5Qcm9ncmFtTWFuYWdlcigpO1xyXG5cclxuLyoqXHJcbiAqIOW8gOWni+i9rOi0plxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gdHJhbnNmZXJTdGFydChwcml2YXRlS2V5LCB0bywgYW1vdW50LCBhbW91bnRSZWNvcmQsIGdhcywgZ2FzUmVjb3JkKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCB0cmFuc2ZlclRyYW5zYWN0aW9uID0gYXdhaXQgYWxlb1Byb2dyYW1NYW5hZ2VyLnRyYW5zZmVyKFxyXG4gICAgICAgICAgICBhbGVvLlByaXZhdGVLZXkuZnJvbV9zdHJpbmcocHJpdmF0ZUtleSksXHJcbiAgICAgICAgICAgIGFtb3VudCxcclxuICAgICAgICAgICAgdG8sXHJcbiAgICAgICAgICAgIHRvVHJhbnNmZXJTdHJpbmcoVHJhbnNmZXJUeXBlLlBSSVZBVEUpLFxyXG4gICAgICAgICAgICBhbGVvLlJlY29yZFBsYWludGV4dC5mcm9tU3RyaW5nKGFtb3VudFJlY29yZCksXHJcbiAgICAgICAgICAgIGdhcyxcclxuICAgICAgICAgICAgYWxlby5SZWNvcmRQbGFpbnRleHQuZnJvbVN0cmluZyhnYXNSZWNvcmQpLFxyXG4gICAgICAgICAgICBBTEVPX1BFRVJfVVJMLFxyXG4gICAgICAgICAgICB0cnVlKTtcclxuICAgICAgICBpZiAodHJhbnNmZXJUcmFuc2FjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNmZXJUcmFuc2FjdGlvbi50b1N0cmluZygpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIOW8gOWni+aJp+ihjOWQiOe6plxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gZXhlY3V0ZVN0YXJ0KHByaXZhdGVLZXksIHByb2dyYW0sIGlucHV0cywgZnVuY3Rpb25OYW1lLCBmZWUsIGZlZVJlY29yZCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBsZXQgZXhlY3V0ZVRyYW5zYWN0aW9uID0gYXdhaXQgYWxlb1Byb2dyYW1NYW5hZ2VyLmV4ZWN1dGUoXHJcbiAgICAgICAgICAgIGFsZW8uUHJpdmF0ZUtleS5mcm9tX3N0cmluZyhwcml2YXRlS2V5KSxcclxuICAgICAgICAgICAgcHJvZ3JhbSxcclxuICAgICAgICAgICAgZnVuY3Rpb25OYW1lLFxyXG4gICAgICAgICAgICBpbnB1dHMuc3BsaXQoXCIgXCIpLFxyXG4gICAgICAgICAgICBmZWUsXHJcbiAgICAgICAgICAgIGFsZW8uUmVjb3JkUGxhaW50ZXh0LmZyb21TdHJpbmcoZmVlUmVjb3JkKSxcclxuICAgICAgICAgICAgQUxFT19QRUVSX1VSTCxcclxuICAgICAgICAgICAgdHJ1ZSk7XHJcbiAgICAgICAgaWYgKGV4ZWN1dGVUcmFuc2FjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gZXhlY3V0ZVRyYW5zYWN0aW9uLnRvU3RyaW5nKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICog5byA5aeL5ouG5YiGcmVjb3JkXHJcbiAqL1xyXG5hc3luYyBmdW5jdGlvbiBzcGxpdFJlY29yZFN0YXJ0KHByaXZhdGVLZXksIHNwbGl0QW1vdW50LCByZWNvcmQpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHNwbGl0VHJhbnNhY3Rpb24gPSBhd2FpdCBhbGVvUHJvZ3JhbU1hbmFnZXIuc3BsaXQoXHJcbiAgICAgICAgICAgIGFsZW8uUHJpdmF0ZUtleS5mcm9tX3N0cmluZyhwcml2YXRlS2V5KSxcclxuICAgICAgICAgICAgc3BsaXRBbW91bnQsXHJcbiAgICAgICAgICAgIHJlY29yZCxcclxuICAgICAgICAgICAgQUxFT19QRUVSX1VSTCwgdHJ1ZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKHNwbGl0VHJhbnNhY3Rpb24pIHtcclxuICAgICAgICAgICAgcmV0dXJuIHNwbGl0VHJhbnNhY3Rpb24udG9TdHJpbmcoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIHJldHVybiBcIlwiXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBqb2luIHJlY29yZFxyXG4gKi9cclxuYXN5bmMgZnVuY3Rpb24gam9pblJlY29yZFN0YXJ0KHByaXZhdGVLZXksIHJlY29yZF8xLCByZWNvcmRfMiwgZmVlX2NyZWRpdHMsIGZlZV9yZWNvcmQsKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKFwiam9pblJlY29yZFN0YXJ0OiAlcywgcmVjb3JkXzEoJXMpLHJlY29yZF8yKCVzKSxmZWVfcmVjb3JkKCVzKVwiLCBwcml2YXRlS2V5LCByZWNvcmRfMSwgcmVjb3JkXzIsZmVlX3JlY29yZClcclxuICAgICAgICBsZXQgam9pblRyYW5zYWN0aW9uID0gYXdhaXQgYWxlb1Byb2dyYW1NYW5hZ2VyLmpvaW4oXHJcbiAgICAgICAgICAgIGFsZW8uUHJpdmF0ZUtleS5mcm9tX3N0cmluZyhwcml2YXRlS2V5KSxcclxuICAgICAgICAgICAgYWxlby5SZWNvcmRQbGFpbnRleHQuZnJvbVN0cmluZyhyZWNvcmRfMSksXHJcbiAgICAgICAgICAgIGFsZW8uUmVjb3JkUGxhaW50ZXh0LmZyb21TdHJpbmcocmVjb3JkXzIpLFxyXG4gICAgICAgICAgICBmZWVfY3JlZGl0cyxcclxuICAgICAgICAgICAgYWxlby5SZWNvcmRQbGFpbnRleHQuZnJvbVN0cmluZyhmZWVfcmVjb3JkKSxcclxuICAgICAgICAgICAgQUxFT19QRUVSX1VSTCwgdHJ1ZVxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKGpvaW5UcmFuc2FjdGlvbikge1xyXG4gICAgICAgICAgICByZXR1cm4gam9pblRyYW5zYWN0aW9uLnRvU3RyaW5nKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogd2ViIHdvcmtlclxyXG4gKi9cclxuc2VsZi5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBldiA9PiB7XHJcbiAgICBpZiAoZXYuZGF0YS50eXBlID09PSBUUkFOU0ZFUl9TVEFSVCkge1xyXG4gICAgICAgIGxldCB7aWQsIHByaXZhdGVLZXksIHRvLCBhbW91bnQsIGFtb3VudFJlY29yZCwgZ2FzLCBnYXNSZWNvcmQsfSA9IGV2LmRhdGE7XHJcbiAgICAgICAgKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJ0cmFuc2ZlciBzdGFydDogJXMsIGFtb3VudFJlY29yZCglcyksZ2FzUmVjb3JkKCVzKVwiLCBpZCwgYW1vdW50UmVjb3JkLnJlY29yZCwgZ2FzUmVjb3JkLnJlY29yZClcclxuICAgICAgICAgICAgLy8gY29uc29sZS50aW1lKFwidHJhbnNmZXIgdGltZTpcIilcclxuICAgICAgICAgICAgbGV0IHRyYW5zYWN0aW9uID0gYXdhaXQgdHJhbnNmZXJTdGFydChwcml2YXRlS2V5LCB0bywgYW1vdW50LCBhbW91bnRSZWNvcmQucmVjb3JkLCBnYXMsIGdhc1JlY29yZC5yZWNvcmQpO1xyXG4gICAgICAgICAgICAvLyBjb25zb2xlLnRpbWVFbmQoXCJ0cmFuc2ZlciB0aW1lOlwiKVxyXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhcInRyYW5zYWN0aW9uOjo6Oj09PT09Ojo6OiBcIiwgdHJhbnNhY3Rpb24pXHJcbiAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogVFJBTlNGRVJfQ09NUElMRSwgdHJhbnNmZXJUcmFuc2FjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhbGVvLlByaXZhdGVLZXkuZnJvbV9zdHJpbmcocHJpdmF0ZUtleSkudG9fYWRkcmVzcygpLnRvX3N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zYWN0aW9uRGF0YTogdHJhbnNhY3Rpb24sXHJcbiAgICAgICAgICAgICAgICAgICAgdXNlZFJlY29yZHM6IFthbW91bnRSZWNvcmQsIGdhc1JlY29yZF1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH0gZWxzZSBpZiAoZXYuZGF0YS50eXBlID09PSBFWEVDVVRFX1NUQVJUKSB7XHJcbiAgICAgICAgbGV0IHtpZCwgcHJvZ3JhbSwgZnVuY3Rpb25OYW1lLCBpbnB1dHMsIHByaXZhdGVLZXksIGZlZSwgZmVlUmVjb3JkfSA9IGV2LmRhdGE7XHJcbiAgICAgICAgKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJleGVjdXRlIHN0YXJ0OiAlcywgcHJvZ3JhbSglcyksIGZ1bmN0aW9uTmFtZSglcyksaW5wdXRzKCVzKSxmZWVSZWNvcmQoJXMpXCIsIGlkLCBwcm9ncmFtLCBmdW5jdGlvbk5hbWUsIGlucHV0cywgZmVlUmVjb3JkLnJlY29yZClcclxuICAgICAgICAgICAgLy8gY29uc29sZS50aW1lKFwiZXhlY3V0ZSB0aW1lOlwiKVxyXG4gICAgICAgICAgICBsZXQgZXhlY3V0ZVRyYW5zYWN0aW9uID0gYXdhaXQgZXhlY3V0ZVN0YXJ0KHByaXZhdGVLZXksIHByb2dyYW0sIGlucHV0cywgZnVuY3Rpb25OYW1lLCBmZWUsIGZlZVJlY29yZC5yZWNvcmQpXHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUudGltZUVuZChcImV4ZWN1dGUgdGltZTpcIilcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJleGVjdXRlIDo6OjogZXhlY3V0ZVRyYW5zYWN0aW9uID09PT0gXCIsIGV4ZWN1dGVUcmFuc2FjdGlvbilcclxuICAgICAgICAgICAgc2VsZi5wb3N0TWVzc2FnZSh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBFWEVDVVRFX0NPTVBJTEUsIGV4ZWN1dGVUcmFuc2FjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgIGlkOiBpZCxcclxuICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBhbGVvLlByaXZhdGVLZXkuZnJvbV9zdHJpbmcocHJpdmF0ZUtleSkudG9fYWRkcmVzcygpLnRvX3N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgICAgIGV4ZWN1dGVUcmFuc2FjdGlvbkRhdGE6IGV4ZWN1dGVUcmFuc2FjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICB1c2VkUmVjb3JkOiBmZWVSZWNvcmRcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSkoKTtcclxuICAgIH0gZWxzZSBpZiAoZXYuZGF0YS50eXBlID09PSBTUExJVF9TVEFSVCkge1xyXG4gICAgICAgIGxldCB7XHJcbiAgICAgICAgICAgIGtleSxcclxuICAgICAgICAgICAgc3BsaXRBbW91bnQsXHJcbiAgICAgICAgICAgIHJlY29yZCxcclxuICAgICAgICB9ID0gZXYuZGF0YTtcclxuICAgICAgICAoYXN5bmMgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJzcGxpdCBzdGFydDogJXMsIHNwbGl0QW1vdW50KCVzKSxyZWNvcmQoJXMpXCIsIGtleSwgc3BsaXRBbW91bnQsIHJlY29yZClcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUudGltZShcInNwbGl0IHRpbWU6XCIpXHJcbiAgICAgICAgICAgICAgICBsZXQgc3BsaXRUcmFuc2FjdGlvbiA9IGF3YWl0IHNwbGl0UmVjb3JkU3RhcnQoKVxyXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS50aW1lRW5kKFwic3BsaXQgdGltZTpcIilcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3BsaXQgOjo6OiBzcGxpdFRyYW5zYWN0aW9uID09PT0gXCIsIHNwbGl0VHJhbnNhY3Rpb24pXHJcbiAgICAgICAgICAgICAgICBpZiAoc3BsaXRUcmFuc2FjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IFNQTElUX0NPTVBJTEUsIHNwbGl0VHJhbnNhY3Rpb246IHNwbGl0VHJhbnNhY3Rpb259KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IFNQTElUX0ZJTEVELCBlcnJvck1lc3NhZ2U6IGVycm9yfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KSgpO1xyXG4gICAgfSBlbHNlIGlmIChldi5kYXRhLnR5cGUgPT09IEpPSU5fU1RBUlQpIHtcclxuICAgICAgICBsZXQge1xyXG4gICAgICAgICAgICBpZCxcclxuICAgICAgICAgICAgcHJpdmF0ZUtleSxcclxuICAgICAgICAgICAgcmVjb3JkMSxcclxuICAgICAgICAgICAgcmVjb3JkMixcclxuICAgICAgICAgICAgZmVlLFxyXG4gICAgICAgICAgICBmZWVSZWNvcmQsXHJcbiAgICAgICAgfSA9IGV2LmRhdGE7XHJcbiAgICAgICAgKGFzeW5jIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIGxldCBqb2luVHJhbnNhY3Rpb24gPSBhd2FpdCBqb2luUmVjb3JkU3RhcnQocHJpdmF0ZUtleSwgcmVjb3JkMS5yZWNvcmQsIHJlY29yZDIucmVjb3JkLCBmZWUsIGZlZVJlY29yZC5yZWNvcmQpXHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhqb2luVHJhbnNhY3Rpb24pXHJcbiAgICAgICAgICAgICAgICBzZWxmLnBvc3RNZXNzYWdlKHtcclxuICAgICAgICAgICAgICAgICAgICB0eXBlOiBKT0lOX0NPTVBJTEUsIGpvaW5UcmFuc2FjdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZDogaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGFsZW8uUHJpdmF0ZUtleS5mcm9tX3N0cmluZyhwcml2YXRlS2V5KS50b19hZGRyZXNzKCkudG9fc3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGpvaW5UcmFuc2FjdGlvbkRhdGE6IGpvaW5UcmFuc2FjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgdXNlZFJlY29yZDogW3JlY29yZDEsIHJlY29yZDIsIGZlZVJlY29yZF1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucG9zdE1lc3NhZ2Uoe3R5cGU6IEpPSU5fRklMRUQsIGVycm9yTWVzc2FnZTogZXJyb3J9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pKCk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IHt9IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0bG9hZGVkOiBmYWxzZSxcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG5cdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuLy8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbl9fd2VicGFja19yZXF1aXJlX18ubSA9IF9fd2VicGFja19tb2R1bGVzX187XG5cbi8vIHRoZSBzdGFydHVwIGZ1bmN0aW9uXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuXHQvLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcblx0dmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLk8odW5kZWZpbmVkLCBbXCJwa2dfYWxlby13YXNtX2FsZW9fd2FzbV9qc1wiLFwic3JjX2FwaV9yZXF1ZXN0QXBpX3RzLXNyY19jb25zdGFudHNfaW5kZXhfdHMtc3JjX21vZGVsX1RyYW5zZmVyVHlwZV90cy1wa2dfYWxlby13YXNtX3NuaXBwZXRzLTg4NWZkZFwiXSwgKCkgPT4gKF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy93b3JrZXIvd29ya2VyLmpzXCIpKSlcblx0X193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcblx0cmV0dXJuIF9fd2VicGFja19leHBvcnRzX187XG59O1xuXG4iLCJ2YXIgd2VicGFja1F1ZXVlcyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgcXVldWVzXCIpIDogXCJfX3dlYnBhY2tfcXVldWVzX19cIjtcbnZhciB3ZWJwYWNrRXhwb3J0cyA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXhwb3J0c1wiKSA6IFwiX193ZWJwYWNrX2V4cG9ydHNfX1wiO1xudmFyIHdlYnBhY2tFcnJvciA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiA/IFN5bWJvbChcIndlYnBhY2sgZXJyb3JcIikgOiBcIl9fd2VicGFja19lcnJvcl9fXCI7XG52YXIgcmVzb2x2ZVF1ZXVlID0gKHF1ZXVlKSA9PiB7XG5cdGlmKHF1ZXVlICYmIHF1ZXVlLmQgPCAxKSB7XG5cdFx0cXVldWUuZCA9IDE7XG5cdFx0cXVldWUuZm9yRWFjaCgoZm4pID0+IChmbi5yLS0pKTtcblx0XHRxdWV1ZS5mb3JFYWNoKChmbikgPT4gKGZuLnItLSA/IGZuLnIrKyA6IGZuKCkpKTtcblx0fVxufVxudmFyIHdyYXBEZXBzID0gKGRlcHMpID0+IChkZXBzLm1hcCgoZGVwKSA9PiB7XG5cdGlmKGRlcCAhPT0gbnVsbCAmJiB0eXBlb2YgZGVwID09PSBcIm9iamVjdFwiKSB7XG5cdFx0aWYoZGVwW3dlYnBhY2tRdWV1ZXNdKSByZXR1cm4gZGVwO1xuXHRcdGlmKGRlcC50aGVuKSB7XG5cdFx0XHR2YXIgcXVldWUgPSBbXTtcblx0XHRcdHF1ZXVlLmQgPSAwO1xuXHRcdFx0ZGVwLnRoZW4oKHIpID0+IHtcblx0XHRcdFx0b2JqW3dlYnBhY2tFeHBvcnRzXSA9IHI7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9LCAoZSkgPT4ge1xuXHRcdFx0XHRvYmpbd2VicGFja0Vycm9yXSA9IGU7XG5cdFx0XHRcdHJlc29sdmVRdWV1ZShxdWV1ZSk7XG5cdFx0XHR9KTtcblx0XHRcdHZhciBvYmogPSB7fTtcblx0XHRcdG9ialt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKGZuKHF1ZXVlKSk7XG5cdFx0XHRyZXR1cm4gb2JqO1xuXHRcdH1cblx0fVxuXHR2YXIgcmV0ID0ge307XG5cdHJldFt3ZWJwYWNrUXVldWVzXSA9IHggPT4ge307XG5cdHJldFt3ZWJwYWNrRXhwb3J0c10gPSBkZXA7XG5cdHJldHVybiByZXQ7XG59KSk7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmEgPSAobW9kdWxlLCBib2R5LCBoYXNBd2FpdCkgPT4ge1xuXHR2YXIgcXVldWU7XG5cdGhhc0F3YWl0ICYmICgocXVldWUgPSBbXSkuZCA9IC0xKTtcblx0dmFyIGRlcFF1ZXVlcyA9IG5ldyBTZXQoKTtcblx0dmFyIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cztcblx0dmFyIGN1cnJlbnREZXBzO1xuXHR2YXIgb3V0ZXJSZXNvbHZlO1xuXHR2YXIgcmVqZWN0O1xuXHR2YXIgcHJvbWlzZSA9IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWopID0+IHtcblx0XHRyZWplY3QgPSByZWo7XG5cdFx0b3V0ZXJSZXNvbHZlID0gcmVzb2x2ZTtcblx0fSk7XG5cdHByb21pc2Vbd2VicGFja0V4cG9ydHNdID0gZXhwb3J0cztcblx0cHJvbWlzZVt3ZWJwYWNrUXVldWVzXSA9IChmbikgPT4gKHF1ZXVlICYmIGZuKHF1ZXVlKSwgZGVwUXVldWVzLmZvckVhY2goZm4pLCBwcm9taXNlW1wiY2F0Y2hcIl0oeCA9PiB7fSkpO1xuXHRtb2R1bGUuZXhwb3J0cyA9IHByb21pc2U7XG5cdGJvZHkoKGRlcHMpID0+IHtcblx0XHRjdXJyZW50RGVwcyA9IHdyYXBEZXBzKGRlcHMpO1xuXHRcdHZhciBmbjtcblx0XHR2YXIgZ2V0UmVzdWx0ID0gKCkgPT4gKGN1cnJlbnREZXBzLm1hcCgoZCkgPT4ge1xuXHRcdFx0aWYoZFt3ZWJwYWNrRXJyb3JdKSB0aHJvdyBkW3dlYnBhY2tFcnJvcl07XG5cdFx0XHRyZXR1cm4gZFt3ZWJwYWNrRXhwb3J0c107XG5cdFx0fSkpXG5cdFx0dmFyIHByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4ge1xuXHRcdFx0Zm4gPSAoKSA9PiAocmVzb2x2ZShnZXRSZXN1bHQpKTtcblx0XHRcdGZuLnIgPSAwO1xuXHRcdFx0dmFyIGZuUXVldWUgPSAocSkgPT4gKHEgIT09IHF1ZXVlICYmICFkZXBRdWV1ZXMuaGFzKHEpICYmIChkZXBRdWV1ZXMuYWRkKHEpLCBxICYmICFxLmQgJiYgKGZuLnIrKywgcS5wdXNoKGZuKSkpKTtcblx0XHRcdGN1cnJlbnREZXBzLm1hcCgoZGVwKSA9PiAoZGVwW3dlYnBhY2tRdWV1ZXNdKGZuUXVldWUpKSk7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIGZuLnIgPyBwcm9taXNlIDogZ2V0UmVzdWx0KCk7XG5cdH0sIChlcnIpID0+ICgoZXJyID8gcmVqZWN0KHByb21pc2Vbd2VicGFja0Vycm9yXSA9IGVycikgOiBvdXRlclJlc29sdmUoZXhwb3J0cykpLCByZXNvbHZlUXVldWUocXVldWUpKSk7XG5cdHF1ZXVlICYmIHF1ZXVlLmQgPCAwICYmIChxdWV1ZS5kID0gMCk7XG59OyIsInZhciBkZWZlcnJlZCA9IFtdO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5PID0gKHJlc3VsdCwgY2h1bmtJZHMsIGZuLCBwcmlvcml0eSkgPT4ge1xuXHRpZihjaHVua0lkcykge1xuXHRcdHByaW9yaXR5ID0gcHJpb3JpdHkgfHwgMDtcblx0XHRmb3IodmFyIGkgPSBkZWZlcnJlZC5sZW5ndGg7IGkgPiAwICYmIGRlZmVycmVkW2kgLSAxXVsyXSA+IHByaW9yaXR5OyBpLS0pIGRlZmVycmVkW2ldID0gZGVmZXJyZWRbaSAtIDFdO1xuXHRcdGRlZmVycmVkW2ldID0gW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldO1xuXHRcdHJldHVybjtcblx0fVxuXHR2YXIgbm90RnVsZmlsbGVkID0gSW5maW5pdHk7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgZGVmZXJyZWQubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgW2NodW5rSWRzLCBmbiwgcHJpb3JpdHldID0gZGVmZXJyZWRbaV07XG5cdFx0dmFyIGZ1bGZpbGxlZCA9IHRydWU7XG5cdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBjaHVua0lkcy5sZW5ndGg7IGorKykge1xuXHRcdFx0aWYgKChwcmlvcml0eSAmIDEgPT09IDAgfHwgbm90RnVsZmlsbGVkID49IHByaW9yaXR5KSAmJiBPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLk8pLmV2ZXJ5KChrZXkpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fLk9ba2V5XShjaHVua0lkc1tqXSkpKSkge1xuXHRcdFx0XHRjaHVua0lkcy5zcGxpY2Uoai0tLCAxKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGZ1bGZpbGxlZCA9IGZhbHNlO1xuXHRcdFx0XHRpZihwcmlvcml0eSA8IG5vdEZ1bGZpbGxlZCkgbm90RnVsZmlsbGVkID0gcHJpb3JpdHk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKGZ1bGZpbGxlZCkge1xuXHRcdFx0ZGVmZXJyZWQuc3BsaWNlKGktLSwgMSlcblx0XHRcdHZhciByID0gZm4oKTtcblx0XHRcdGlmIChyICE9PSB1bmRlZmluZWQpIHJlc3VsdCA9IHI7XG5cdFx0fVxuXHR9XG5cdHJldHVybiByZXN1bHQ7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZiA9IHt9O1xuLy8gVGhpcyBmaWxlIGNvbnRhaW5zIG9ubHkgdGhlIGVudHJ5IGNodW5rLlxuLy8gVGhlIGNodW5rIGxvYWRpbmcgZnVuY3Rpb24gZm9yIGFkZGl0aW9uYWwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmUgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gUHJvbWlzZS5hbGwoT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5mKS5yZWR1Y2UoKHByb21pc2VzLCBrZXkpID0+IHtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmZba2V5XShjaHVua0lkLCBwcm9taXNlcyk7XG5cdFx0cmV0dXJuIHByb21pc2VzO1xuXHR9LCBbXSkpO1xufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhc3luYyBjaHVua3MgYW5kIHNpYmxpbmcgY2h1bmtzIGZvciB0aGUgZW50cnlwb2ludFxuX193ZWJwYWNrX3JlcXVpcmVfXy51ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLmpzXCI7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18uZyA9IChmdW5jdGlvbigpIHtcblx0aWYgKHR5cGVvZiBnbG9iYWxUaGlzID09PSAnb2JqZWN0JykgcmV0dXJuIGdsb2JhbFRoaXM7XG5cdHRyeSB7XG5cdFx0cmV0dXJuIHRoaXMgfHwgbmV3IEZ1bmN0aW9uKCdyZXR1cm4gdGhpcycpKCk7XG5cdH0gY2F0Y2ggKGUpIHtcblx0XHRpZiAodHlwZW9mIHdpbmRvdyA9PT0gJ29iamVjdCcpIHJldHVybiB3aW5kb3c7XG5cdH1cbn0pKCk7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obWQgPSAobW9kdWxlKSA9PiB7XG5cdG1vZHVsZSA9IE9iamVjdC5jcmVhdGUobW9kdWxlKTtcblx0aWYgKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCAnZXhwb3J0cycsIHtcblx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdHNldDogKCkgPT4ge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKCdFUyBNb2R1bGVzIG1heSBub3QgYXNzaWduIG1vZHVsZS5leHBvcnRzIG9yIGV4cG9ydHMuKiwgVXNlIEVTTSBleHBvcnQgc3ludGF4LCBpbnN0ZWFkOiAnICsgbW9kdWxlLmlkKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gbW9kdWxlO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAhc2NyaXB0VXJsKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5iID0gc2VsZi5sb2NhdGlvbiArIFwiXCI7XG5cbi8vIG9iamVjdCB0byBzdG9yZSBsb2FkZWQgY2h1bmtzXG4vLyBcIjFcIiBtZWFucyBcImFscmVhZHkgbG9hZGVkXCJcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwidHJhbnNmZXJXb3JrZXJcIjogMVxufTtcblxuLy8gaW1wb3J0U2NyaXB0cyBjaHVuayBsb2FkaW5nXG52YXIgaW5zdGFsbENodW5rID0gKGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdH1cblx0fVxuXHRpZihydW50aW1lKSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR3aGlsZShjaHVua0lkcy5sZW5ndGgpXG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRzLnBvcCgpXSA9IDE7XG5cdHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xufTtcbl9fd2VicGFja19yZXF1aXJlX18uZi5pID0gKGNodW5rSWQsIHByb21pc2VzKSA9PiB7XG5cdC8vIFwiMVwiIGlzIHRoZSBzaWduYWwgZm9yIFwiYWxyZWFkeSBsb2FkZWRcIlxuXHRpZighaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0aWYodHJ1ZSkgeyAvLyBhbGwgY2h1bmtzIGhhdmUgSlNcblx0XHRcdGltcG9ydFNjcmlwdHMoX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy51KGNodW5rSWQpKTtcblx0XHR9XG5cdH1cbn07XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rcmVhY3RfcnVzdF9jaHJvbWVfZXh0ZW5zaW9uXCJdID0gc2VsZltcIndlYnBhY2tDaHVua3JlYWN0X3J1c3RfY2hyb21lX2V4dGVuc2lvblwiXSB8fCBbXTtcbnZhciBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbiA9IGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKTtcbmNodW5rTG9hZGluZ0dsb2JhbC5wdXNoID0gaW5zdGFsbENodW5rO1xuXG4vLyBubyBITVJcblxuLy8gbm8gSE1SIG1hbmlmZXN0IiwidmFyIG5leHQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLng7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnggPSAoKSA9PiB7XG5cdHJldHVybiBQcm9taXNlLmFsbChbXG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lKFwicGtnX2FsZW8td2FzbV9hbGVvX3dhc21fanNcIiksXG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5lKFwic3JjX2FwaV9yZXF1ZXN0QXBpX3RzLXNyY19jb25zdGFudHNfaW5kZXhfdHMtc3JjX21vZGVsX1RyYW5zZmVyVHlwZV90cy1wa2dfYWxlby13YXNtX3NuaXBwZXRzLTg4NWZkZFwiKVxuXHRdKS50aGVuKG5leHQpO1xufTsiLCIiLCIvLyBydW4gc3RhcnR1cFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLngoKTtcbiIsIiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==