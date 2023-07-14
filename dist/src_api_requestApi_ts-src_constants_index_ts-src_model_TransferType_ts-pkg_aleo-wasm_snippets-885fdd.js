"use strict";
(self["webpackChunkreact_rust_chrome_extension"] = self["webpackChunkreact_rust_chrome_extension"] || []).push([["src_api_requestApi_ts-src_constants_index_ts-src_model_TransferType_ts-pkg_aleo-wasm_snippets-885fdd"],{

/***/ "./src/api/request.ts":
/*!****************************!*\
  !*** ./src/api/request.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// const codeMessage = {
//     200: '服务器成功返回请求的数据。',
//     201: '新建或修改数据成功。',
//     202: '一个请求已经进入后台排队（异步任务）。',
//     204: '删除数据成功。',
//     400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//     401: '用户没有权限（令牌、用户名、密码错误）。',
//     403: '用户得到授权，但是访问是被禁止的。',
//     404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//     406: '请求的格式不可得。',
//     410: '请求的资源被永久删除，且不会再得到的。',
//     422: '当创建一个对象时，发生一个验证错误。',
//     500: '服务器发生错误，请检查服务器。',
//     502: '网关错误。',
//     503: '服务不可用，服务器暂时过载或维护。',
//     504: '网关超时。',
// };
const BaseHeader = {
    'Content-Type': 'application/json',
};
/**
 * 异常处理程序
 */
const errorHandler = (error) => {
    const { response } = error;
    return response;
};
/**
 * 配置request请求时的默认参数
 */
class Request {
    constructor(prefix) {
        this.prefix = prefix;
    }
    get(url, init) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestUrl = url;
            if (!url.startsWith("http")) {
                requestUrl = this.prefix + url;
            }
            const resp = errorHandler({
                response: yield fetch(requestUrl, Object.assign(Object.assign({}, init), { mode: 'cors', credentials: "include", headers: BaseHeader, method: 'GET' })),
            });
            return errorHandler({ response: resp });
        });
    }
    post(url, init) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestUrl = url;
            if (!url.startsWith("http")) {
                requestUrl = this.prefix + url;
            }
            const resp = errorHandler({
                response: yield fetch(requestUrl, Object.assign(Object.assign({}, init), { mode: 'cors', credentials: "include", headers: BaseHeader, method: 'POST' })),
            });
            return errorHandler({ response: resp });
        });
    }
    put(url, init) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestUrl = url;
            if (!url.startsWith("http")) {
                requestUrl = this.prefix + url;
            }
            const resp = errorHandler({
                response: yield fetch(requestUrl, Object.assign(Object.assign({}, init), { mode: 'cors', credentials: "include", headers: BaseHeader, method: 'PUT' })),
            });
            return errorHandler({ response: resp });
        });
    }
    pat(url, init) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestUrl = url;
            if (!url.startsWith("http")) {
                requestUrl = this.prefix + url;
            }
            const resp = errorHandler({
                response: yield fetch(requestUrl, Object.assign(Object.assign({}, init), { mode: 'cors', credentials: "include", headers: BaseHeader, method: 'PATCH' })),
            });
            return errorHandler({ response: resp });
        });
    }
    delete(url, init) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestUrl = url;
            if (!url.startsWith("http")) {
                requestUrl = this.prefix + url;
            }
            const resp = errorHandler({
                response: yield fetch(requestUrl, Object.assign(Object.assign({}, init), { mode: 'cors', credentials: "include", headers: BaseHeader, method: 'DELETE' })),
            });
            return errorHandler({ response: resp });
        });
    }
    /**
     * 封装统一请求  调用时传入method
     * @param url 接口地址
     * @param method 请求方法
     * @param init 参数
     */
    fetchRequest(url, method, init) {
        return __awaiter(this, void 0, void 0, function* () {
            let requestUrl = url;
            if (!url.startsWith("http")) {
                requestUrl = this.prefix + url;
            }
            const resp = errorHandler({
                response: yield fetch(requestUrl, Object.assign(Object.assign({}, init), { mode: 'cors', credentials: "include", headers: BaseHeader, method: method })),
            });
            return errorHandler({ response: resp });
        });
    }
}
const request = new Request("");
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (request);


/***/ }),

/***/ "./src/api/requestApi.ts":
/*!*******************************!*\
  !*** ./src/api/requestApi.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ALEO123BASE_URL: () => (/* binding */ ALEO123BASE_URL),
/* harmony export */   ALEO_PEER_URL: () => (/* binding */ ALEO_PEER_URL),
/* harmony export */   BROADCAST: () => (/* binding */ BROADCAST),
/* harmony export */   FIND_TRANSITION: () => (/* binding */ FIND_TRANSITION),
/* harmony export */   QUERY_FEE: () => (/* binding */ QUERY_FEE),
/* harmony export */   QUERY_TRANSACTION: () => (/* binding */ QUERY_TRANSACTION),
/* harmony export */   RECORDS_ALL: () => (/* binding */ RECORDS_ALL),
/* harmony export */   SEARCH_BLOCKS: () => (/* binding */ SEARCH_BLOCKS),
/* harmony export */   SEARCH_CURRENT_HEIGHT: () => (/* binding */ SEARCH_CURRENT_HEIGHT),
/* harmony export */   SEARCH_PROGRAM: () => (/* binding */ SEARCH_PROGRAM),
/* harmony export */   broadcastTransaction: () => (/* binding */ broadcastTransaction),
/* harmony export */   checkTransactionStatus: () => (/* binding */ checkTransactionStatus),
/* harmony export */   findTransition: () => (/* binding */ findTransition),
/* harmony export */   queryCurrentHeight: () => (/* binding */ queryCurrentHeight),
/* harmony export */   queryFeeByTransactionsID: () => (/* binding */ queryFeeByTransactionsID),
/* harmony export */   queryProgram: () => (/* binding */ queryProgram),
/* harmony export */   queryRecordsAll: () => (/* binding */ queryRecordsAll)
/* harmony export */ });
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./request */ "./src/api/request.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const ALEO123BASE_URL = "https://www.aleo123.io/api/v3/aleo";
const ALEO_PEER_URL = "https://vm.aleo.org/api";
const SEARCH_PROGRAM = ALEO_PEER_URL + "/testnet3/program/";
const SEARCH_BLOCKS = ALEO_PEER_URL + "/testnet3/blocks?start=";
const FIND_TRANSITION = ALEO_PEER_URL + "/testnet3/find/transitionID/";
const BROADCAST = ALEO_PEER_URL + "/testnet3/transaction/broadcast";
// 官方接口
// export const SEARCH_CURRENT_HEIGHT = "https://vm.aleo.org/api/testnet3/latest/height"
// 查询最新高度
const SEARCH_CURRENT_HEIGHT = ALEO123BASE_URL + "/blocks/list?page=0&page_size=1";
const RECORDS_ALL = ALEO123BASE_URL + "/records/range_nomint?start=";
const QUERY_TRANSACTION = ALEO123BASE_URL + "/transactions/transaction/";
const QUERY_FEE = ALEO123BASE_URL + "/transactions/fee/fees?transactions=";
/**
 * 根绝合约名称查询部署合约的源码
 * @param programName 合约名称
 */
function queryProgram(programName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let req = yield _request__WEBPACK_IMPORTED_MODULE_0__["default"].fetchRequest(SEARCH_PROGRAM + programName, "GET");
            return req.json();
        }
        catch (e) {
            // console.log(e)
            return null;
        }
    });
}
/**
 * 查询交易是否使用过
 *
 */
function findTransition(_serialNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        let req = yield _request__WEBPACK_IMPORTED_MODULE_0__["default"].fetchRequest(FIND_TRANSITION + _serialNumber, "GET");
        return req.json();
    });
}
/**
 * 查询所有Records
 */
function queryRecordsAll(startHeight, endHeight, exclude) {
    return __awaiter(this, void 0, void 0, function* () {
        let url = RECORDS_ALL + startHeight + "&end=" + endHeight;
        if (exclude) {
            url = url + "&exclude=" + exclude;
        }
        let req = yield _request__WEBPACK_IMPORTED_MODULE_0__["default"].fetchRequest(url, "GET");
        return req.json();
    });
}
/**
 * 查询当前区块高度
 *
 */
function queryCurrentHeight() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let req = yield _request__WEBPACK_IMPORTED_MODULE_0__["default"].fetchRequest(SEARCH_CURRENT_HEIGHT, "GET");
            let data = yield req.json();
            if (data.success && data.block_data && data.block_data.length == 1) {
                return data.block_data[0].height;
            }
            else {
                return 0;
            }
        }
        catch (e) {
            return 0;
        }
    });
}
/**
 * broadcast
 */
function broadcastTransaction(transferTransaction) {
    return __awaiter(this, void 0, void 0, function* () {
        let req = yield _request__WEBPACK_IMPORTED_MODULE_0__["default"].fetchRequest(BROADCAST, "POST", {
            body: transferTransaction
        });
        return req.json();
    });
}
function checkTransactionStatus(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let req = yield _request__WEBPACK_IMPORTED_MODULE_0__["default"].fetchRequest(QUERY_TRANSACTION, "GET");
        return req.json();
    });
}
function queryFeeByTransactionsID(transactionsID) {
    return __awaiter(this, void 0, void 0, function* () {
        let req = yield _request__WEBPACK_IMPORTED_MODULE_0__["default"].fetchRequest(QUERY_FEE + transactionsID, "GET");
        return req.json();
    });
}


/***/ }),

/***/ "./src/constants/index.ts":
/*!********************************!*\
  !*** ./src/constants/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ACTIVE_ADDRESS: () => (/* binding */ ACTIVE_ADDRESS),
/* harmony export */   APP_VERSION: () => (/* binding */ APP_VERSION),
/* harmony export */   ASYNC_COMPILE: () => (/* binding */ ASYNC_COMPILE),
/* harmony export */   ASYNC_CURRENT_HEIGHT: () => (/* binding */ ASYNC_CURRENT_HEIGHT),
/* harmony export */   ASYNC_HAS_RECORDS: () => (/* binding */ ASYNC_HAS_RECORDS),
/* harmony export */   ASYNC_START: () => (/* binding */ ASYNC_START),
/* harmony export */   AUTO_LOCK_TIMER_DEFAULT_INTERVAL_MINUTES: () => (/* binding */ AUTO_LOCK_TIMER_DEFAULT_INTERVAL_MINUTES),
/* harmony export */   AUTO_LOCK_TIMER_STORAGE_KEY: () => (/* binding */ AUTO_LOCK_TIMER_STORAGE_KEY),
/* harmony export */   CHANGE_TRANSFER_STATUS: () => (/* binding */ CHANGE_TRANSFER_STATUS),
/* harmony export */   CHECK_TRANSFER_STATUS: () => (/* binding */ CHECK_TRANSFER_STATUS),
/* harmony export */   EXECUTE_COMPILE: () => (/* binding */ EXECUTE_COMPILE),
/* harmony export */   EXECUTE_FILED: () => (/* binding */ EXECUTE_FILED),
/* harmony export */   EXECUTE_START: () => (/* binding */ EXECUTE_START),
/* harmony export */   JOIN_COMPILE: () => (/* binding */ JOIN_COMPILE),
/* harmony export */   JOIN_FILED: () => (/* binding */ JOIN_FILED),
/* harmony export */   JOIN_START: () => (/* binding */ JOIN_START),
/* harmony export */   SPLIT_COMPILE: () => (/* binding */ SPLIT_COMPILE),
/* harmony export */   SPLIT_FILED: () => (/* binding */ SPLIT_FILED),
/* harmony export */   SPLIT_START: () => (/* binding */ SPLIT_START),
/* harmony export */   STORAGE_ACTIVE_ACCOUNT: () => (/* binding */ STORAGE_ACTIVE_ACCOUNT),
/* harmony export */   STORAGE_KEY_PWD: () => (/* binding */ STORAGE_KEY_PWD),
/* harmony export */   TRANSFER_COMPILE: () => (/* binding */ TRANSFER_COMPILE),
/* harmony export */   TRANSFER_FILED: () => (/* binding */ TRANSFER_FILED),
/* harmony export */   TRANSFER_START: () => (/* binding */ TRANSFER_START),
/* harmony export */   TRANSFER_TYPE_PRIVATE: () => (/* binding */ TRANSFER_TYPE_PRIVATE),
/* harmony export */   UPDATE_TRANSFER_UI: () => (/* binding */ UPDATE_TRANSFER_UI)
/* harmony export */ });
const APP_VERSION = "Version: 1.0.7";
const AUTO_LOCK_TIMER_STORAGE_KEY = 'auto-lock-timer-interval';
const AUTO_LOCK_TIMER_DEFAULT_INTERVAL_MINUTES = 3;
/**
 * 转账开始消息
 */
const TRANSFER_START = "ALEO_TRANSFER_START";
/**
 * 转账完成
 */
const TRANSFER_COMPILE = "ALEO_TRANSFER_COMPILE";
/**
 * 转账失败
 */
const TRANSFER_FILED = "ALEO_TRANSFER_FILED";
/**
 * 开始执行合约
 */
const EXECUTE_START = "ALEO_EXECUTE_START";
/**
 * 执行合约完成
 */
const EXECUTE_COMPILE = "ALEO_EXECUTE_COMPILE";
/**
 * 执行合约失败
 */
const EXECUTE_FILED = "ALEO_EXECUTE_FILED";
/**
 * 拆分record开始
 */
const SPLIT_START = "ALEO_SPLIT_START";
/**
 * 拆分record完成
 */
const SPLIT_COMPILE = "ALEO_SPLIT_COMPILE";
/**
 * 拆分record完成
 */
const SPLIT_FILED = "ALEO_SPLIT_FILED";
/**
 * join start
 */
const JOIN_START = "ALEO_JOIN_START";
/**
 * join compile
 */
const JOIN_COMPILE = "ALEO_JOIN_COMPILE";
/**
 * join filed
 */
const JOIN_FILED = "ALEO_JOIN_FILED";
/**
 * 开始同步
 */
const ASYNC_START = "ALEO_RECORD_ASYNC_START";
/**
 * 查询状态
 */
const CHECK_TRANSFER_STATUS = "CHECK_TRANSFER_STATUS";
/**
 * 发现records
 */
const ASYNC_HAS_RECORDS = "ALEO_ASYNC_HAS_RECORDS";
/**
 * 同步高度最新同步的高度
 */
const ASYNC_CURRENT_HEIGHT = "ALEO_ASYNC_HEIGHT";
/**
 * 同步完成
 */
const ASYNC_COMPILE = "ALEO_RECORD_ASYNC_COMPILE";
const STORAGE_KEY_PWD = "pwd";
const ACTIVE_ADDRESS = "active_address";
const CHANGE_TRANSFER_STATUS = "change_transfer_status";
const UPDATE_TRANSFER_UI = "update_transfer_ui";
const STORAGE_ACTIVE_ACCOUNT = 'active_account';
const TRANSFER_TYPE_PRIVATE = "private";


/***/ }),

/***/ "./src/model/TransferType.ts":
/*!***********************************!*\
  !*** ./src/model/TransferType.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TransactionType: () => (/* binding */ TransactionType),
/* harmony export */   TransferType: () => (/* binding */ TransferType),
/* harmony export */   toTransactionTypeString: () => (/* binding */ toTransactionTypeString),
/* harmony export */   toTransferString: () => (/* binding */ toTransferString)
/* harmony export */ });
/**
 * 转账类型枚举类
 */
var TransferType;
(function (TransferType) {
    TransferType[TransferType["PRIVATE"] = 0] = "PRIVATE";
    TransferType[TransferType["PUBLIC"] = 1] = "PUBLIC";
    TransferType[TransferType["PRIVATE_TO_PUBLIC"] = 2] = "PRIVATE_TO_PUBLIC";
    TransferType[TransferType["PUBLIC_TO_PRIVATE"] = 3] = "PUBLIC_TO_PRIVATE";
})(TransferType || (TransferType = {}));
function toTransferString(value) {
    switch (value) {
        case TransferType.PRIVATE:
            return 'private';
        case TransferType.PUBLIC:
            return 'public';
        case TransferType.PRIVATE_TO_PUBLIC:
            return 'private_to_public';
        case TransferType.PUBLIC_TO_PRIVATE:
            return 'public_to_private';
        default:
            return "private";
    }
}
/**
 * 转账类型枚举类
 */
var TransactionType;
(function (TransactionType) {
    TransactionType[TransactionType["transfer"] = 0] = "transfer";
    TransactionType[TransactionType["deploy"] = 1] = "deploy";
    TransactionType[TransactionType["execute"] = 2] = "execute";
    TransactionType[TransactionType["split"] = 3] = "split";
    TransactionType[TransactionType["join"] = 4] = "join";
})(TransactionType || (TransactionType = {}));
function toTransactionTypeString(value) {
    switch (value) {
        case TransactionType.transfer:
            return 'transfer';
        case TransactionType.execute:
            return 'execute';
        case TransactionType.split:
            return 'split';
        case TransactionType.join:
            return 'join';
        default:
            return "transfer";
    }
}


/***/ }),

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

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwaV9yZXF1ZXN0QXBpX3RzLXNyY19jb25zdGFudHNfaW5kZXhfdHMtc3JjX21vZGVsX1RyYW5zZmVyVHlwZV90cy1wa2dfYWxlby13YXNtX3NuaXBwZXRzLTg4NWZkZC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsd0JBQXdCO0FBQ3hCLDRCQUE0QjtBQUM1Qix5QkFBeUI7QUFDekIsa0NBQWtDO0FBQ2xDLHNCQUFzQjtBQUN0QiwwQ0FBMEM7QUFDMUMsbUNBQW1DO0FBQ25DLGdDQUFnQztBQUNoQyx5Q0FBeUM7QUFDekMsd0JBQXdCO0FBQ3hCLGtDQUFrQztBQUNsQyxpQ0FBaUM7QUFDakMsOEJBQThCO0FBQzlCLG9CQUFvQjtBQUNwQixnQ0FBZ0M7QUFDaEMsb0JBQW9CO0FBQ3BCLEtBQUs7QUFDTCxNQUFNLFVBQVUsR0FBRztJQUNmLGNBQWMsRUFBRSxrQkFBa0I7Q0FDckM7QUFHRDs7R0FFRztBQUNILE1BQU0sWUFBWSxHQUFHLENBQUMsS0FBNkIsRUFBRSxFQUFFO0lBQ25ELE1BQU0sRUFBQyxRQUFRLEVBQUMsR0FBRyxLQUFLLENBQUM7SUFDekIsT0FBTyxRQUFRLENBQUM7QUFDcEIsQ0FBQyxDQUFDO0FBR0Y7O0dBRUc7QUFFSCxNQUFNLE9BQU87SUFHVCxZQUFZLE1BQWM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDekIsQ0FBQztJQUVLLEdBQUcsQ0FBQyxHQUFXLEVBQUUsSUFBOEI7O1lBQ2pELElBQUksVUFBVSxHQUFHLEdBQUcsQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDekIsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDO2FBQ2xDO1lBQ0QsTUFBTSxJQUFJLEdBQUcsWUFBWSxDQUFDO2dCQUN0QixRQUFRLEVBQUUsTUFBTSxLQUFLLENBQUMsVUFBVSxrQ0FDekIsSUFBSSxLQUNQLElBQUks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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELE1BQU07QUFDOUQ7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQix1S0FBa0I7QUFDdEM7QUFDQSxnQkFBZ0IsbUNBQW1DO0FBQ25EO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDhCQUE4QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QywyS0FBcUM7QUFDN0UsY0FBYyxTQUFRO0FBQ3RCLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2FwaS9yZXF1ZXN0LnRzIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy9hcGkvcmVxdWVzdEFwaS50cyIsIndlYnBhY2s6Ly9yZWFjdC1ydXN0LWNocm9tZS1leHRlbnNpb24vLi9zcmMvY29uc3RhbnRzL2luZGV4LnRzIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy9tb2RlbC9UcmFuc2ZlclR5cGUudHMiLCJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uLy4vcGtnL2FsZW8td2FzbS9zbmlwcGV0cy93YXNtLWJpbmRnZW4tcmF5b24tN2FmYTg5OWYzNjY2NTQ3My9zcmMvd29ya2VySGVscGVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBjb25zdCBjb2RlTWVzc2FnZSA9IHtcclxuLy8gICAgIDIwMDogJ+acjeWKoeWZqOaIkOWKn+i/lOWbnuivt+axgueahOaVsOaNruOAgicsXHJcbi8vICAgICAyMDE6ICfmlrDlu7rmiJbkv67mlLnmlbDmja7miJDlip/jgIInLFxyXG4vLyAgICAgMjAyOiAn5LiA5Liq6K+35rGC5bey57uP6L+b5YWl5ZCO5Y+w5o6S6Zif77yI5byC5q2l5Lu75Yqh77yJ44CCJyxcclxuLy8gICAgIDIwNDogJ+WIoOmZpOaVsOaNruaIkOWKn+OAgicsXHJcbi8vICAgICA0MDA6ICflj5Hlh7rnmoTor7fmsYLmnInplJnor6/vvIzmnI3liqHlmajmsqHmnInov5vooYzmlrDlu7rmiJbkv67mlLnmlbDmja7nmoTmk43kvZzjgIInLFxyXG4vLyAgICAgNDAxOiAn55So5oi35rKh5pyJ5p2D6ZmQ77yI5Luk54mM44CB55So5oi35ZCN44CB5a+G56CB6ZSZ6K+v77yJ44CCJyxcclxuLy8gICAgIDQwMzogJ+eUqOaIt+W+l+WIsOaOiOadg++8jOS9huaYr+iuv+mXruaYr+iiq+emgeatoueahOOAgicsXHJcbi8vICAgICA0MDQ6ICflj5Hlh7rnmoTor7fmsYLpkojlr7nnmoTmmK/kuI3lrZjlnKjnmoTorrDlvZXvvIzmnI3liqHlmajmsqHmnInov5vooYzmk43kvZzjgIInLFxyXG4vLyAgICAgNDA2OiAn6K+35rGC55qE5qC85byP5LiN5Y+v5b6X44CCJyxcclxuLy8gICAgIDQxMDogJ+ivt+axgueahOi1hOa6kOiiq+awuOS5heWIoOmZpO+8jOS4lOS4jeS8muWGjeW+l+WIsOeahOOAgicsXHJcbi8vICAgICA0MjI6ICflvZPliJvlu7rkuIDkuKrlr7nosaHml7bvvIzlj5HnlJ/kuIDkuKrpqozor4HplJnor6/jgIInLFxyXG4vLyAgICAgNTAwOiAn5pyN5Yqh5Zmo5Y+R55Sf6ZSZ6K+v77yM6K+35qOA5p+l5pyN5Yqh5Zmo44CCJyxcclxuLy8gICAgIDUwMjogJ+e9keWFs+mUmeivr+OAgicsXHJcbi8vICAgICA1MDM6ICfmnI3liqHkuI3lj6/nlKjvvIzmnI3liqHlmajmmoLml7bov4fovb3miJbnu7TmiqTjgIInLFxyXG4vLyAgICAgNTA0OiAn572R5YWz6LaF5pe244CCJyxcclxuLy8gfTtcclxuY29uc3QgQmFzZUhlYWRlciA9IHtcclxuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbn1cclxuXHJcblxyXG4vKipcclxuICog5byC5bi45aSE55CG56iL5bqPXHJcbiAqL1xyXG5jb25zdCBlcnJvckhhbmRsZXIgPSAoZXJyb3I6IHsgcmVzcG9uc2U6IFJlc3BvbnNlIH0pID0+IHtcclxuICAgIGNvbnN0IHtyZXNwb25zZX0gPSBlcnJvcjtcclxuICAgIHJldHVybiByZXNwb25zZTtcclxufTtcclxuXHJcblxyXG4vKipcclxuICog6YWN572ucmVxdWVzdOivt+axguaXtueahOm7mOiupOWPguaVsFxyXG4gKi9cclxuXHJcbmNsYXNzIFJlcXVlc3Qge1xyXG4gICAgcHJlZml4OiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJlZml4OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnByZWZpeCA9IHByZWZpeDtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBnZXQodXJsOiBzdHJpbmcsIGluaXQ/OiBSZXF1ZXN0SW5pdCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCByZXF1ZXN0VXJsID0gdXJsO1xyXG4gICAgICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RVcmwgPSB0aGlzLnByZWZpeCArIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVzcCA9IGVycm9ySGFuZGxlcih7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBhd2FpdCBmZXRjaChyZXF1ZXN0VXJsLCB7XHJcbiAgICAgICAgICAgICAgICAuLi5pbml0LFxyXG4gICAgICAgICAgICAgICAgbW9kZTogJ2NvcnMnLCBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBCYXNlSGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnR0VUJ1xyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHtyZXNwb25zZTogcmVzcH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwb3N0KHVybDogc3RyaW5nLCBpbml0PzogUmVxdWVzdEluaXQgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgcmVxdWVzdFVybCA9IHVybDtcclxuICAgICAgICBpZiAoIXVybC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xyXG4gICAgICAgICAgICByZXF1ZXN0VXJsID0gdGhpcy5wcmVmaXggKyB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlc3AgPSBlcnJvckhhbmRsZXIoe1xyXG4gICAgICAgICAgICByZXNwb25zZTogYXdhaXQgZmV0Y2gocmVxdWVzdFVybCwge1xyXG4gICAgICAgICAgICAgICAgLi4uaW5pdCxcclxuICAgICAgICAgICAgICAgIG1vZGU6ICdjb3JzJywgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogQmFzZUhlYWRlcixcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICB9KSxcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZXJyb3JIYW5kbGVyKHtyZXNwb25zZTogcmVzcH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwdXQodXJsOiBzdHJpbmcsIGluaXQ/OiBSZXF1ZXN0SW5pdCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCByZXF1ZXN0VXJsID0gdXJsO1xyXG4gICAgICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RVcmwgPSB0aGlzLnByZWZpeCArIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVzcCA9IGVycm9ySGFuZGxlcih7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBhd2FpdCBmZXRjaChyZXF1ZXN0VXJsLCB7XHJcbiAgICAgICAgICAgICAgICAuLi5pbml0LFxyXG4gICAgICAgICAgICAgICAgbW9kZTogJ2NvcnMnLCBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBCYXNlSGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUFVUJyxcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcih7cmVzcG9uc2U6IHJlc3B9KTtcclxuICAgIH1cclxuXHJcbiAgICBhc3luYyBwYXQodXJsOiBzdHJpbmcsIGluaXQ/OiBSZXF1ZXN0SW5pdCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCByZXF1ZXN0VXJsID0gdXJsO1xyXG4gICAgICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RVcmwgPSB0aGlzLnByZWZpeCArIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVzcCA9IGVycm9ySGFuZGxlcih7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBhd2FpdCBmZXRjaChyZXF1ZXN0VXJsLCB7XHJcbiAgICAgICAgICAgICAgICAuLi5pbml0LFxyXG4gICAgICAgICAgICAgICAgbW9kZTogJ2NvcnMnLCBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBCYXNlSGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUEFUQ0gnXHJcbiAgICAgICAgICAgIH0pLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBlcnJvckhhbmRsZXIoe3Jlc3BvbnNlOiByZXNwfSk7XHJcbiAgICB9XHJcblxyXG4gICAgYXN5bmMgZGVsZXRlKHVybDogc3RyaW5nLCBpbml0PzogUmVxdWVzdEluaXQgfCB1bmRlZmluZWQpIHtcclxuICAgICAgICBsZXQgcmVxdWVzdFVybCA9IHVybDtcclxuICAgICAgICBpZiAoIXVybC5zdGFydHNXaXRoKFwiaHR0cFwiKSkge1xyXG4gICAgICAgICAgICByZXF1ZXN0VXJsID0gdGhpcy5wcmVmaXggKyB1cmw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJlc3AgPSBlcnJvckhhbmRsZXIoe1xyXG4gICAgICAgICAgICByZXNwb25zZTogYXdhaXQgZmV0Y2gocmVxdWVzdFVybCwge1xyXG4gICAgICAgICAgICAgICAgLi4uaW5pdCxcclxuICAgICAgICAgICAgICAgIG1vZGU6ICdjb3JzJywgY3JlZGVudGlhbHM6IFwiaW5jbHVkZVwiLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogQmFzZUhlYWRlcixcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURSdcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcih7cmVzcG9uc2U6IHJlc3B9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIOWwgeijhee7n+S4gOivt+axgiAg6LCD55So5pe25Lyg5YWlbWV0aG9kXHJcbiAgICAgKiBAcGFyYW0gdXJsIOaOpeWPo+WcsOWdgFxyXG4gICAgICogQHBhcmFtIG1ldGhvZCDor7fmsYLmlrnms5VcclxuICAgICAqIEBwYXJhbSBpbml0IOWPguaVsFxyXG4gICAgICovXHJcbiAgICBhc3luYyBmZXRjaFJlcXVlc3QodXJsOiBzdHJpbmcsIG1ldGhvZDogXCJHRVRcIiB8IFwiREVMRVRFXCIgfCBcIlBVVFwiIHwgXCJQQVRDSFwiIHwgXCJQT1NUXCIsIGluaXQ/OiBSZXF1ZXN0SW5pdCB8IHVuZGVmaW5lZCkge1xyXG4gICAgICAgIGxldCByZXF1ZXN0VXJsID0gdXJsO1xyXG4gICAgICAgIGlmICghdXJsLnN0YXJ0c1dpdGgoXCJodHRwXCIpKSB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RVcmwgPSB0aGlzLnByZWZpeCArIHVybDtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmVzcCA9IGVycm9ySGFuZGxlcih7XHJcbiAgICAgICAgICAgIHJlc3BvbnNlOiBhd2FpdCBmZXRjaChyZXF1ZXN0VXJsLCB7XHJcbiAgICAgICAgICAgICAgICAuLi5pbml0LFxyXG4gICAgICAgICAgICAgICAgbW9kZTogJ2NvcnMnLCBjcmVkZW50aWFsczogXCJpbmNsdWRlXCIsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiBCYXNlSGVhZGVyLFxyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiBtZXRob2RcclxuICAgICAgICAgICAgfSksXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGVycm9ySGFuZGxlcih7cmVzcG9uc2U6IHJlc3B9KTtcclxuICAgIH1cclxufVxyXG5cclxuXHJcbmNvbnN0IHJlcXVlc3QgPSBuZXcgUmVxdWVzdChcIlwiKTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHJlcXVlc3Q7IiwiaW1wb3J0IHtRdWVyeUZlZVJlc3BvbnNlLCBSZWNvcmRzUmFuZ2V9IGZyb20gXCIuLi9tb2RlbFwiO1xyXG5pbXBvcnQgcmVxdWVzdCBmcm9tIFwiLi9yZXF1ZXN0XCI7XHJcblxyXG5leHBvcnQgY29uc3QgQUxFTzEyM0JBU0VfVVJMID0gXCJodHRwczovL3d3dy5hbGVvMTIzLmlvL2FwaS92My9hbGVvXCJcclxuXHJcbmV4cG9ydCBjb25zdCBBTEVPX1BFRVJfVVJMID0gXCJodHRwczovL3ZtLmFsZW8ub3JnL2FwaVwiXHJcblxyXG5leHBvcnQgY29uc3QgU0VBUkNIX1BST0dSQU0gPSBBTEVPX1BFRVJfVVJMICsgXCIvdGVzdG5ldDMvcHJvZ3JhbS9cIlxyXG5cclxuZXhwb3J0IGNvbnN0IFNFQVJDSF9CTE9DS1MgPSBBTEVPX1BFRVJfVVJMICsgXCIvdGVzdG5ldDMvYmxvY2tzP3N0YXJ0PVwiXHJcbmV4cG9ydCBjb25zdCBGSU5EX1RSQU5TSVRJT04gPSBBTEVPX1BFRVJfVVJMICsgXCIvdGVzdG5ldDMvZmluZC90cmFuc2l0aW9uSUQvXCJcclxuXHJcbmV4cG9ydCBjb25zdCBCUk9BRENBU1QgPSBBTEVPX1BFRVJfVVJMICsgXCIvdGVzdG5ldDMvdHJhbnNhY3Rpb24vYnJvYWRjYXN0XCJcclxuXHJcbi8vIOWumOaWueaOpeWPo1xyXG4vLyBleHBvcnQgY29uc3QgU0VBUkNIX0NVUlJFTlRfSEVJR0hUID0gXCJodHRwczovL3ZtLmFsZW8ub3JnL2FwaS90ZXN0bmV0My9sYXRlc3QvaGVpZ2h0XCJcclxuXHJcbi8vIOafpeivouacgOaWsOmrmOW6plxyXG5leHBvcnQgY29uc3QgU0VBUkNIX0NVUlJFTlRfSEVJR0hUID0gQUxFTzEyM0JBU0VfVVJMICsgXCIvYmxvY2tzL2xpc3Q/cGFnZT0wJnBhZ2Vfc2l6ZT0xXCJcclxuXHJcbmV4cG9ydCBjb25zdCBSRUNPUkRTX0FMTCA9IEFMRU8xMjNCQVNFX1VSTCArIFwiL3JlY29yZHMvcmFuZ2Vfbm9taW50P3N0YXJ0PVwiXHJcblxyXG5leHBvcnQgY29uc3QgUVVFUllfVFJBTlNBQ1RJT04gPSBBTEVPMTIzQkFTRV9VUkwgKyBcIi90cmFuc2FjdGlvbnMvdHJhbnNhY3Rpb24vXCJcclxuXHJcbmV4cG9ydCBjb25zdCBRVUVSWV9GRUUgPSBBTEVPMTIzQkFTRV9VUkwgKyBcIi90cmFuc2FjdGlvbnMvZmVlL2ZlZXM/dHJhbnNhY3Rpb25zPVwiXHJcblxyXG5cclxuLyoqXHJcbiAqIOaguee7neWQiOe6puWQjeensOafpeivoumDqOe9suWQiOe6pueahOa6kOeggVxyXG4gKiBAcGFyYW0gcHJvZ3JhbU5hbWUg5ZCI57qm5ZCN56ewXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcXVlcnlQcm9ncmFtKHByb2dyYW1OYW1lOiBzdHJpbmcpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgbGV0IHJlcSA9IGF3YWl0IHJlcXVlc3QuZmV0Y2hSZXF1ZXN0KFNFQVJDSF9QUk9HUkFNICsgcHJvZ3JhbU5hbWUsIFwiR0VUXCIpXHJcbiAgICAgICAgcmV0dXJuIHJlcS5qc29uKClcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZyhlKVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9XHJcblxyXG59XHJcblxyXG4vKipcclxuICog5p+l6K+i5Lqk5piT5piv5ZCm5L2/55So6L+HXHJcbiAqXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmluZFRyYW5zaXRpb24oX3NlcmlhbE51bWJlcjogc3RyaW5nKSB7XHJcbiAgICBsZXQgcmVxID0gYXdhaXQgcmVxdWVzdC5mZXRjaFJlcXVlc3QoRklORF9UUkFOU0lUSU9OICsgX3NlcmlhbE51bWJlciwgXCJHRVRcIilcclxuICAgIHJldHVybiByZXEuanNvbigpXHJcbn1cclxuXHJcbi8qKlxyXG4gKiDmn6Xor6LmiYDmnIlSZWNvcmRzXHJcbiAqL1xyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcXVlcnlSZWNvcmRzQWxsKHN0YXJ0SGVpZ2h0OiBudW1iZXIsIGVuZEhlaWdodDogbnVtYmVyLCBleGNsdWRlPzogc3RyaW5nKTogUHJvbWlzZTxSZWNvcmRzUmFuZ2U+IHtcclxuICAgIGxldCB1cmwgPSBSRUNPUkRTX0FMTCArIHN0YXJ0SGVpZ2h0ICsgXCImZW5kPVwiICsgZW5kSGVpZ2h0XHJcbiAgICBpZiAoZXhjbHVkZSkge1xyXG4gICAgICAgIHVybCA9IHVybCArIFwiJmV4Y2x1ZGU9XCIgKyBleGNsdWRlXHJcbiAgICB9XHJcbiAgICBsZXQgcmVxID0gYXdhaXQgcmVxdWVzdC5mZXRjaFJlcXVlc3QodXJsLCBcIkdFVFwiKVxyXG4gICAgcmV0dXJuIHJlcS5qc29uKClcclxufVxyXG5cclxuXHJcbi8qKlxyXG4gKiDmn6Xor6LlvZPliY3ljLrlnZfpq5jluqZcclxuICpcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBxdWVyeUN1cnJlbnRIZWlnaHQoKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGxldCByZXEgPSBhd2FpdCByZXF1ZXN0LmZldGNoUmVxdWVzdChTRUFSQ0hfQ1VSUkVOVF9IRUlHSFQsIFwiR0VUXCIpXHJcbiAgICAgICAgbGV0IGRhdGEgPSBhd2FpdCByZXEuanNvbigpXHJcbiAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLmJsb2NrX2RhdGEgJiYgZGF0YS5ibG9ja19kYXRhLmxlbmd0aCA9PSAxKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBkYXRhLmJsb2NrX2RhdGFbMF0uaGVpZ2h0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICB9XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIDBcclxuICAgIH1cclxuXHJcbn1cclxuXHJcbi8qKlxyXG4gKiBicm9hZGNhc3RcclxuICovXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBicm9hZGNhc3RUcmFuc2FjdGlvbih0cmFuc2ZlclRyYW5zYWN0aW9uOiBhbnkpIHtcclxuICAgIGxldCByZXEgPSBhd2FpdCByZXF1ZXN0LmZldGNoUmVxdWVzdChCUk9BRENBU1QsIFwiUE9TVFwiLCB7XHJcbiAgICAgICAgYm9keTogdHJhbnNmZXJUcmFuc2FjdGlvblxyXG4gICAgfSlcclxuICAgIHJldHVybiByZXEuanNvbigpXHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1RyYW5zYWN0aW9uU3RhdHVzKGlkOiBzdHJpbmcpIHtcclxuICAgIGxldCByZXEgPSBhd2FpdCByZXF1ZXN0LmZldGNoUmVxdWVzdChRVUVSWV9UUkFOU0FDVElPTiwgXCJHRVRcIik7XHJcbiAgICByZXR1cm4gcmVxLmpzb24oKVxyXG59XHJcblxyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHF1ZXJ5RmVlQnlUcmFuc2FjdGlvbnNJRCh0cmFuc2FjdGlvbnNJRDogc3RyaW5nKTogUHJvbWlzZTxRdWVyeUZlZVJlc3BvbnNlPiB7XHJcbiAgICBsZXQgcmVxID0gYXdhaXQgcmVxdWVzdC5mZXRjaFJlcXVlc3QoUVVFUllfRkVFICsgdHJhbnNhY3Rpb25zSUQsIFwiR0VUXCIpXHJcbiAgICByZXR1cm4gcmVxLmpzb24oKVxyXG59IiwiXHJcbmV4cG9ydCBjb25zdCBBUFBfVkVSU0lPTiA9IFwiVmVyc2lvbjogMS4wLjdcIlxyXG5cclxuZXhwb3J0IGNvbnN0IEFVVE9fTE9DS19USU1FUl9TVE9SQUdFX0tFWSA9ICdhdXRvLWxvY2stdGltZXItaW50ZXJ2YWwnO1xyXG5leHBvcnQgY29uc3QgQVVUT19MT0NLX1RJTUVSX0RFRkFVTFRfSU5URVJWQUxfTUlOVVRFUyA9IDM7XHJcblxyXG5cclxuLyoqXHJcbiAqIOi9rOi0puW8gOWni+a2iOaBr1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX1NUQVJUID0gXCJBTEVPX1RSQU5TRkVSX1NUQVJUXCJcclxuXHJcbi8qKlxyXG4gKiDovazotKblrozmiJBcclxuICovXHJcbmV4cG9ydCBjb25zdCBUUkFOU0ZFUl9DT01QSUxFID0gXCJBTEVPX1RSQU5TRkVSX0NPTVBJTEVcIlxyXG5cclxuLyoqXHJcbiAqIOi9rOi0puWksei0pVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX0ZJTEVEID0gXCJBTEVPX1RSQU5TRkVSX0ZJTEVEXCJcclxuXHJcbi8qKlxyXG4gKiDlvIDlp4vmiafooYzlkIjnuqZcclxuICovXHJcbmV4cG9ydCBjb25zdCBFWEVDVVRFX1NUQVJUID0gXCJBTEVPX0VYRUNVVEVfU1RBUlRcIlxyXG5cclxuLyoqXHJcbiAqIOaJp+ihjOWQiOe6puWujOaIkFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEVYRUNVVEVfQ09NUElMRSA9IFwiQUxFT19FWEVDVVRFX0NPTVBJTEVcIlxyXG5cclxuLyoqXHJcbiAqIOaJp+ihjOWQiOe6puWksei0pVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEVYRUNVVEVfRklMRUQgPSBcIkFMRU9fRVhFQ1VURV9GSUxFRFwiXHJcblxyXG4vKipcclxuICog5ouG5YiGcmVjb3Jk5byA5aeLXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgU1BMSVRfU1RBUlQgPSBcIkFMRU9fU1BMSVRfU1RBUlRcIlxyXG5cclxuLyoqXHJcbiAqIOaLhuWIhnJlY29yZOWujOaIkFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFNQTElUX0NPTVBJTEUgPSBcIkFMRU9fU1BMSVRfQ09NUElMRVwiXHJcblxyXG4vKipcclxuICog5ouG5YiGcmVjb3Jk5a6M5oiQXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgU1BMSVRfRklMRUQgPSBcIkFMRU9fU1BMSVRfRklMRURcIlxyXG5cclxuLyoqXHJcbiAqIGpvaW4gc3RhcnRcclxuICovXHJcbmV4cG9ydCBjb25zdCBKT0lOX1NUQVJUID0gXCJBTEVPX0pPSU5fU1RBUlRcIlxyXG5cclxuLyoqXHJcbiAqIGpvaW4gY29tcGlsZVxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEpPSU5fQ09NUElMRSA9IFwiQUxFT19KT0lOX0NPTVBJTEVcIlxyXG5cclxuXHJcbi8qKlxyXG4gKiBqb2luIGZpbGVkXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgSk9JTl9GSUxFRCA9IFwiQUxFT19KT0lOX0ZJTEVEXCJcclxuXHJcblxyXG4vKipcclxuICog5byA5aeL5ZCM5q2lXHJcbiAqL1xyXG5leHBvcnQgY29uc3QgQVNZTkNfU1RBUlQgPSBcIkFMRU9fUkVDT1JEX0FTWU5DX1NUQVJUXCJcclxuXHJcbi8qKlxyXG4gKiDmn6Xor6LnirbmgIFcclxuICovXHJcbmV4cG9ydCBjb25zdCBDSEVDS19UUkFOU0ZFUl9TVEFUVVMgPSBcIkNIRUNLX1RSQU5TRkVSX1NUQVRVU1wiXHJcblxyXG4vKipcclxuICog5Y+R546wcmVjb3Jkc1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEFTWU5DX0hBU19SRUNPUkRTID0gXCJBTEVPX0FTWU5DX0hBU19SRUNPUkRTXCJcclxuXHJcbi8qKlxyXG4gKiDlkIzmraXpq5jluqbmnIDmlrDlkIzmraXnmoTpq5jluqZcclxuICovXHJcbmV4cG9ydCBjb25zdCBBU1lOQ19DVVJSRU5UX0hFSUdIVCA9IFwiQUxFT19BU1lOQ19IRUlHSFRcIlxyXG5cclxuLyoqXHJcbiAqIOWQjOatpeWujOaIkFxyXG4gKi9cclxuZXhwb3J0IGNvbnN0IEFTWU5DX0NPTVBJTEUgPSBcIkFMRU9fUkVDT1JEX0FTWU5DX0NPTVBJTEVcIlxyXG5cclxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfS0VZX1BXRCA9IFwicHdkXCJcclxuXHJcbmV4cG9ydCBjb25zdCBBQ1RJVkVfQUREUkVTUyA9IFwiYWN0aXZlX2FkZHJlc3NcIlxyXG5cclxuXHJcbmV4cG9ydCBjb25zdCBDSEFOR0VfVFJBTlNGRVJfU1RBVFVTID0gXCJjaGFuZ2VfdHJhbnNmZXJfc3RhdHVzXCJcclxuXHJcblxyXG5leHBvcnQgY29uc3QgVVBEQVRFX1RSQU5TRkVSX1VJID0gXCJ1cGRhdGVfdHJhbnNmZXJfdWlcIlxyXG5cclxuZXhwb3J0IGNvbnN0IFNUT1JBR0VfQUNUSVZFX0FDQ09VTlQgPSAnYWN0aXZlX2FjY291bnQnO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX1RZUEVfUFJJVkFURSA9IFwicHJpdmF0ZVwiIiwiLyoqXHJcbiAqIOi9rOi0puexu+Wei+aemuS4vuexu1xyXG4gKi9cclxuZXhwb3J0IGVudW0gVHJhbnNmZXJUeXBlIHtcclxuICAgIFBSSVZBVEUsXHJcbiAgICBQVUJMSUMsXHJcbiAgICBQUklWQVRFX1RPX1BVQkxJQyxcclxuICAgIFBVQkxJQ19UT19QUklWQVRFXHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiB0b1RyYW5zZmVyU3RyaW5nKHZhbHVlOiBUcmFuc2ZlclR5cGUpIHtcclxuICAgIHN3aXRjaCAodmFsdWUpIHtcclxuICAgICAgICBjYXNlIFRyYW5zZmVyVHlwZS5QUklWQVRFOlxyXG4gICAgICAgICAgICByZXR1cm4gJ3ByaXZhdGUnO1xyXG4gICAgICAgIGNhc2UgVHJhbnNmZXJUeXBlLlBVQkxJQzpcclxuICAgICAgICAgICAgcmV0dXJuICdwdWJsaWMnO1xyXG4gICAgICAgIGNhc2UgVHJhbnNmZXJUeXBlLlBSSVZBVEVfVE9fUFVCTElDOlxyXG4gICAgICAgICAgICByZXR1cm4gJ3ByaXZhdGVfdG9fcHVibGljJztcclxuICAgICAgICBjYXNlIFRyYW5zZmVyVHlwZS5QVUJMSUNfVE9fUFJJVkFURTpcclxuICAgICAgICAgICAgcmV0dXJuICdwdWJsaWNfdG9fcHJpdmF0ZSc7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuIFwicHJpdmF0ZVwiXHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiDovazotKbnsbvlnovmnprkuL7nsbtcclxuICovXHJcbmV4cG9ydCBlbnVtIFRyYW5zYWN0aW9uVHlwZSB7XHJcbiAgICB0cmFuc2ZlcixcclxuICAgIGRlcGxveSxcclxuICAgIGV4ZWN1dGUsXHJcbiAgICBzcGxpdCxcclxuICAgIGpvaW5cclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIHRvVHJhbnNhY3Rpb25UeXBlU3RyaW5nKHZhbHVlOiBUcmFuc2FjdGlvblR5cGUpIHtcclxuICAgIHN3aXRjaCAodmFsdWUpIHtcclxuICAgICAgICBjYXNlIFRyYW5zYWN0aW9uVHlwZS50cmFuc2ZlcjpcclxuICAgICAgICAgICAgcmV0dXJuICd0cmFuc2Zlcic7XHJcbiAgICAgICAgY2FzZSBUcmFuc2FjdGlvblR5cGUuZXhlY3V0ZTpcclxuICAgICAgICAgICAgcmV0dXJuICdleGVjdXRlJztcclxuICAgICAgICBjYXNlIFRyYW5zYWN0aW9uVHlwZS5zcGxpdDpcclxuICAgICAgICAgICAgcmV0dXJuICdzcGxpdCc7XHJcbiAgICAgICAgY2FzZSBUcmFuc2FjdGlvblR5cGUuam9pbjpcclxuICAgICAgICAgICAgcmV0dXJuICdqb2luJztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm4gXCJ0cmFuc2ZlclwiXHJcbiAgICB9XHJcbn0iLCIvKipcclxuICogQ29weXJpZ2h0IDIwMjEgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICogICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuLy8gTm90ZTogd2UgdXNlIGB3YXNtX2JpbmRnZW5fd29ya2VyX2AtcHJlZml4ZWQgbWVzc2FnZSB0eXBlcyB0byBtYWtlIHN1cmVcclxuLy8gd2UgY2FuIGhhbmRsZSBidW5kbGluZyBpbnRvIG90aGVyIGZpbGVzLCB3aGljaCBtaWdodCBoYXBwZW4gdG8gaGF2ZSB0aGVpclxyXG4vLyBvd24gYHBvc3RNZXNzYWdlYC9gb25tZXNzYWdlYCBjb21tdW5pY2F0aW9uIGNoYW5uZWxzLlxyXG4vL1xyXG4vLyBJZiB3ZSBkaWRuJ3QgdGFrZSB0aGF0IGludG8gdGhlIGFjY291bnQsIHdlIGNvdWxkIHNlbmQgbXVjaCBzaW1wbGVyIHNpZ25hbHNcclxuLy8gbGlrZSBqdXN0IGAwYCBvciB3aGF0ZXZlciwgYnV0IHRoZSBjb2RlIHdvdWxkIGJlIGxlc3MgcmVzaWxpZW50LlxyXG5cclxuZnVuY3Rpb24gd2FpdEZvck1zZ1R5cGUodGFyZ2V0LCB0eXBlKSB7XHJcbiAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xyXG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoJ21lc3NhZ2UnLCBmdW5jdGlvbiBvbk1zZyh7IGRhdGEgfSkge1xyXG4gICAgICBpZiAoZGF0YSA9PSBudWxsIHx8IGRhdGEudHlwZSAhPT0gdHlwZSkgcmV0dXJuO1xyXG4gICAgICB0YXJnZXQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIG9uTXNnKTtcclxuICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgIH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG53YWl0Rm9yTXNnVHlwZShzZWxmLCAnd2FzbV9iaW5kZ2VuX3dvcmtlcl9pbml0JykudGhlbihhc3luYyBkYXRhID0+IHtcclxuICAvLyAjIE5vdGUgMVxyXG4gIC8vIE91ciBKUyBzaG91bGQgaGF2ZSBiZWVuIGdlbmVyYXRlZCBpblxyXG4gIC8vIGBbb3V0LWRpcl0vc25pcHBldHMvd2FzbS1iaW5kZ2VuLXJheW9uLVtoYXNoXS93b3JrZXJIZWxwZXJzLmpzYCxcclxuICAvLyByZXNvbHZlIHRoZSBtYWluIG1vZHVsZSB2aWEgYC4uLy4uLy4uYC5cclxuICAvL1xyXG4gIC8vIFRoaXMgbWlnaHQgbmVlZCB1cGRhdGluZyBpZiB0aGUgZ2VuZXJhdGVkIHN0cnVjdHVyZSBjaGFuZ2VzIG9uIHdhc20tYmluZGdlblxyXG4gIC8vIHNpZGUgZXZlciBpbiB0aGUgZnV0dXJlLCBidXQgd29ya3Mgd2VsbCB3aXRoIGJ1bmRsZXJzIHRvZGF5LiBUaGUgd2hvbGVcclxuICAvLyBwb2ludCBvZiB0aGlzIGNyYXRlLCBhZnRlciBhbGwsIGlzIHRvIGFic3RyYWN0IGF3YXkgdW5zdGFibGUgZmVhdHVyZXNcclxuICAvLyBhbmQgdGVtcG9yYXJ5IGJ1Z3Mgc28gdGhhdCB5b3UgZG9uJ3QgbmVlZCB0byBkZWFsIHdpdGggdGhlbSBpbiB5b3VyIGNvZGUuXHJcbiAgLy9cclxuICAvLyAjIE5vdGUgMlxyXG4gIC8vIFRoaXMgY291bGQgYmUgYSByZWd1bGFyIGltcG9ydCwgYnV0IHRoZW4gc29tZSBidW5kbGVycyBjb21wbGFpbiBhYm91dFxyXG4gIC8vIGNpcmN1bGFyIGRlcHMuXHJcbiAgLy9cclxuICAvLyBEeW5hbWljIGltcG9ydCBjb3VsZCBiZSBjaGVhcCBpZiB0aGlzIGZpbGUgd2FzIGlubGluZWQgaW50byB0aGUgcGFyZW50LFxyXG4gIC8vIHdoaWNoIHdvdWxkIHJlcXVpcmUgdXMganVzdCB1c2luZyBgLi4vLi4vLi5gIGluIGBuZXcgV29ya2VyYCBiZWxvdyxcclxuICAvLyBidXQgdGhhdCBkb2Vzbid0IHdvcmsgYmVjYXVzZSB3YXNtLXBhY2sgdW5jb25kaXRpb25hbGx5IGFkZHNcclxuICAvLyBcInNpZGVFZmZlY3RzXCI6ZmFsc2UgKHNlZSBiZWxvdykuXHJcbiAgLy9cclxuICAvLyBPVE9ILCBldmVuIHRob3VnaCBpdCBjYW4ndCBiZSBpbmxpbmVkLCBpdCBzaG91bGQgYmUgc3RpbGwgcmVhc29uYWJseVxyXG4gIC8vIGNoZWFwIHNpbmNlIHRoZSByZXF1ZXN0ZWQgZmlsZSBpcyBhbHJlYWR5IGluIGNhY2hlIChpdCB3YXMgbG9hZGVkIGJ5XHJcbiAgLy8gdGhlIG1haW4gdGhyZWFkKS5cclxuICBjb25zdCBwa2cgPSBhd2FpdCBpbXBvcnQoJy4uLy4uLy4uJyk7XHJcbiAgYXdhaXQgcGtnLmRlZmF1bHQoZGF0YS5tb2R1bGUsIGRhdGEubWVtb3J5KTtcclxuICBwb3N0TWVzc2FnZSh7IHR5cGU6ICd3YXNtX2JpbmRnZW5fd29ya2VyX3JlYWR5JyB9KTtcclxuICBwa2cud2JnX3JheW9uX3N0YXJ0X3dvcmtlcihkYXRhLnJlY2VpdmVyKTtcclxufSk7XHJcblxyXG4vLyBOb3RlOiB0aGlzIGlzIG5ldmVyIHVzZWQsIGJ1dCBuZWNlc3NhcnkgdG8gcHJldmVudCBhIGJ1ZyBpbiBGaXJlZm94XHJcbi8vIChodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xNzAyMTkxKSB3aGVyZSBpdCBjb2xsZWN0c1xyXG4vLyBXZWIgV29ya2VycyB0aGF0IGhhdmUgYSBzaGFyZWQgV2ViQXNzZW1ibHkgbWVtb3J5IHdpdGggdGhlIG1haW4gdGhyZWFkLFxyXG4vLyBidXQgYXJlIG5vdCBleHBsaWNpdGx5IHJvb3RlZCB2aWEgYSBgV29ya2VyYCBpbnN0YW5jZS5cclxuLy9cclxuLy8gQnkgc3RvcmluZyB0aGVtIGluIGEgdmFyaWFibGUsIHdlIGNhbiBrZWVwIGBXb3JrZXJgIG9iamVjdHMgYXJvdW5kIGFuZFxyXG4vLyBwcmV2ZW50IHRoZW0gZnJvbSBnZXR0aW5nIEdDLWQuXHJcbmxldCBfd29ya2VycztcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzdGFydFdvcmtlcnMobW9kdWxlLCBtZW1vcnksIGJ1aWxkZXIpIHtcclxuICBjb25zdCB3b3JrZXJJbml0ID0ge1xyXG4gICAgdHlwZTogJ3dhc21fYmluZGdlbl93b3JrZXJfaW5pdCcsXHJcbiAgICBtb2R1bGUsXHJcbiAgICBtZW1vcnksXHJcbiAgICByZWNlaXZlcjogYnVpbGRlci5yZWNlaXZlcigpXHJcbiAgfTtcclxuXHJcbiAgX3dvcmtlcnMgPSBhd2FpdCBQcm9taXNlLmFsbChcclxuICAgIEFycmF5LmZyb20oeyBsZW5ndGg6IGJ1aWxkZXIubnVtVGhyZWFkcygpIH0sIGFzeW5jICgpID0+IHtcclxuICAgICAgLy8gU2VsZi1zcGF3biBpbnRvIGEgbmV3IFdvcmtlci5cclxuICAgICAgLy9cclxuICAgICAgLy8gVE9ETzogd2hpbGUgYG5ldyBVUkwoJy4uLicsIGltcG9ydC5tZXRhLnVybCkgYmVjb21lcyBhIHNlbWktc3RhbmRhcmRcclxuICAgICAgLy8gd2F5IHRvIGdldCBhc3NldCBVUkxzIHJlbGF0aXZlIHRvIHRoZSBtb2R1bGUgYWNyb3NzIHZhcmlvdXMgYnVuZGxlcnNcclxuICAgICAgLy8gYW5kIGJyb3dzZXIsIGlkZWFsbHkgd2Ugc2hvdWxkIHN3aXRjaCB0byBgaW1wb3J0Lm1ldGEucmVzb2x2ZWBcclxuICAgICAgLy8gb25jZSBpdCBiZWNvbWVzIGEgc3RhbmRhcmQuXHJcbiAgICAgIC8vXHJcbiAgICAgIC8vIE5vdGU6IHdlIGNvdWxkIHVzZSBgLi4vLi4vLi5gIGFzIHRoZSBVUkwgaGVyZSB0byBpbmxpbmUgd29ya2VySGVscGVycy5qc1xyXG4gICAgICAvLyBpbnRvIHRoZSBwYXJlbnQgZW50cnkgaW5zdGVhZCBvZiBjcmVhdGluZyBhbm90aGVyIHNwbGl0IHBvaW50IC1cclxuICAgICAgLy8gdGhpcyB3b3VsZCBiZSBwcmVmZXJhYmxlIGZyb20gb3B0aW1pemF0aW9uIHBlcnNwZWN0aXZlIC1cclxuICAgICAgLy8gaG93ZXZlciwgV2VicGFjayB0aGVuIGVsaW1pbmF0ZXMgYWxsIG1lc3NhZ2UgaGFuZGxlciBjb2RlXHJcbiAgICAgIC8vIGJlY2F1c2Ugd2FzbS1wYWNrIHByb2R1Y2VzIFwic2lkZUVmZmVjdHNcIjpmYWxzZSBpbiBwYWNrYWdlLmpzb25cclxuICAgICAgLy8gdW5jb25kaXRpb25hbGx5LlxyXG4gICAgICAvL1xyXG4gICAgICAvLyBUaGUgb25seSB3YXkgdG8gd29yayBhcm91bmQgdGhhdCBpcyB0byBoYXZlIHNpZGUgZWZmZWN0IGNvZGVcclxuICAgICAgLy8gaW4gYW4gZW50cnkgcG9pbnQgc3VjaCBhcyBXb3JrZXIgZmlsZSBpdHNlbGYuXHJcbiAgICAgIGNvbnN0IHdvcmtlciA9IG5ldyBXb3JrZXIobmV3IFVSTCgnLi93b3JrZXJIZWxwZXJzLmpzJywgaW1wb3J0Lm1ldGEudXJsKSwge1xyXG4gICAgICAgIHR5cGU6ICdtb2R1bGUnXHJcbiAgICAgIH0pO1xyXG4gICAgICB3b3JrZXIucG9zdE1lc3NhZ2Uod29ya2VySW5pdCk7XHJcbiAgICAgIGF3YWl0IHdhaXRGb3JNc2dUeXBlKHdvcmtlciwgJ3dhc21fYmluZGdlbl93b3JrZXJfcmVhZHknKTtcclxuICAgICAgcmV0dXJuIHdvcmtlcjtcclxuICAgIH0pXHJcbiAgKTtcclxuICBidWlsZGVyLmJ1aWxkKCk7XHJcbn1cclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9