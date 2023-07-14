"use strict";
(self["webpackChunkreact_rust_chrome_extension"] = self["webpackChunkreact_rust_chrome_extension"] || []).push([["src_api_record_ts-src_utils_recordsUtils_tsx"],{

/***/ "./src/aleowasm.ts":
/*!*************************!*\
  !*** ./src/aleowasm.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   baseProgramManager: () => (/* binding */ baseProgramManager),
/* harmony export */   "default": () => (/* binding */ AleoWasm)
/* harmony export */ });
/* harmony import */ var _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pkg/aleo-wasm */ "./pkg/aleo-wasm/aleo_wasm.js");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


let inited = false;
let baseProgramManager = {};
function AleoWasm() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!inited) {
            yield (0,_pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_0__["default"])();
            baseProgramManager = new _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_0__.ProgramManager();
            inited = true;
        }
        return _pkg_aleo_wasm__WEBPACK_IMPORTED_MODULE_0__;
    });
}


/***/ }),

/***/ "./src/api/record.ts":
/*!***************************!*\
  !*** ./src/api/record.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   isRecordUsed: () => (/* binding */ isRecordUsed),
/* harmony export */   mapRecord: () => (/* binding */ mapRecord),
/* harmony export */   syncRecord: () => (/* binding */ syncRecord)
/* harmony export */ });
/* harmony import */ var _utils_AleoTools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/AleoTools */ "./src/utils/AleoTools.ts");
/* harmony import */ var _requestApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./requestApi */ "./src/api/requestApi.ts");
/* harmony import */ var _utils_recordsUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/recordsUtils */ "./src/utils/recordsUtils.tsx");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



function syncRecord(key, address, endHeight, currentHeight, callback) {
    return __awaiter(this, void 0, void 0, function* () {
        // chrome.storage.local.set({ loopRunning: true });
        const batchSize = 5000;
        // 当前区块高度
        // const currentHeight = await queryCurrentHeight();
        // const currentHeight = 10000;
        let start = endHeight;
        // let start = 0;
        let end = start + batchSize;
        // 查询所有的endHeight - currentHeight 新的record
        for (let i = start; i <= currentHeight; i += batchSize) {
            end = end > currentHeight ? currentHeight : end;
            // 发送到worker
            let privateKey = yield _utils_AleoTools__WEBPACK_IMPORTED_MODULE_0__["default"].createPrivateKey(key);
            let resp = yield (0,_requestApi__WEBPACK_IMPORTED_MODULE_1__.queryRecordsAll)(start, end, "mint");
            if (resp.records && resp.records.length) {
                for (let i = 0; i < resp.records.length; i++) {
                    const resRecord = yield _utils_AleoTools__WEBPACK_IMPORTED_MODULE_0__["default"].decryptrecords(privateKey, JSON.stringify([resp.records[i]]));
                    if (resRecord && resRecord !== "[]") {
                        // 同步到的数据改变状态并存入
                        // console.log(resRecord);
                        const resp1 = yield mapRecord(JSON.parse(resRecord), address);
                        // await storageRecord(resp1, false, callback);
                        callback(resp1);
                    }
                }
            }
            callback(end);
            start += batchSize;
            end += batchSize;
        }
        // 同步结束后需要遍历所有的数据
        callback('syncEnd');
    });
}
// 遍历record
const mapRecord = (data, address) => __awaiter(void 0, void 0, void 0, function* () {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
        let item = data[i];
        // TODO 判断 是否是当前账户的record
        if (item && item.record && item.record.indexOf(address) != -1) {
            if (!item.spent) {
                let fee = 0;
                let serial_number = item.serial_number;
                const res = yield isRecordUsed(serial_number);
                if (item.function_name === "transfer") {
                    fee = yield _utils_recordsUtils__WEBPACK_IMPORTED_MODULE_2__.RecordsUtils.getRecordFee(item.transaction_id);
                }
                newData.push({
                    record: item.record,
                    transaction_id: item.transaction_id,
                    serial_number: item.serial_number,
                    function_name: item.function_name,
                    output_index: item.output_index,
                    timestamp: item.timestamp,
                    input: item.input,
                    spent: res,
                    fee: fee, height: item.height, program_id: item.program_id
                });
            }
            else {
                newData.push(item);
            }
        }
    }
    return newData;
});
// check record  used
const isRecordUsed = (_serialNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serialRes = yield (0,_requestApi__WEBPACK_IMPORTED_MODULE_1__.findTransition)(_serialNumber);
        if (serialRes) {
            return true;
        }
        return false;
    }
    catch (e) {
        return false;
    }
});


/***/ }),

/***/ "./src/utils/AleoTools.ts":
/*!********************************!*\
  !*** ./src/utils/AleoTools.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   TRANSFER_TYPE_PRIVATE: () => (/* binding */ TRANSFER_TYPE_PRIVATE),
/* harmony export */   TRANSFER_TYPE_PUBLIC: () => (/* binding */ TRANSFER_TYPE_PUBLIC),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _StringUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./StringUtils */ "./src/utils/StringUtils.ts");
/* harmony import */ var _aleowasm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../aleowasm */ "./src/aleowasm.ts");
/* harmony import */ var _api_requestApi__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../api/requestApi */ "./src/api/requestApi.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



const TRANSFER_TYPE_PRIVATE = "private";
const TRANSFER_TYPE_PUBLIC = "public";
const AleoTools = {
    /**
     * Create account
     * @constructor
     */
    createAccount() {
        return __awaiter(this, void 0, void 0, function* () {
            let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
            let account = new aleo.PrivateKey();
            return {
                privateKey: account.to_string(),
                viewKey: account.to_view_key().to_string(),
                address: account.to_address().to_string()
            };
        });
    },
    /**
     * 生成PrivateKey
     * @param privateKey
     */
    createPrivateKey(privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
            return aleo.PrivateKey.from_string(privateKey);
        });
    },
    /**
     * 生成ProgramManager
     */
    createProgramManager() {
        return __awaiter(this, void 0, void 0, function* () {
            let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
            return new aleo.ProgramManager();
        });
    },
    /**
     * load account
     * @param privateKey
     */ loadAccount(privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
            let account = aleo.PrivateKey.from_string(privateKey);
            if (privateKey != null) {
                return {
                    privateKey: account.to_string(),
                    viewKey: account.to_view_key().to_string(),
                    address: account.to_address().to_string()
                };
            }
            return null;
        });
    },
    /**
     * decryptRecord
     * @param recordData
     * @param viewKey
     */ decryptRecord(recordData, viewKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                let req = aleo.ViewKey.from_string(viewKey).decrypt(recordData);
                return req;
            }
            catch (e) {
                return "";
            }
        });
    },
    /**
     * sign message
     * @param privateKey
     * @param message
     */ signMessage(privateKey, message) {
        return __awaiter(this, void 0, void 0, function* () {
            let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
            let signingAccount = aleo.PrivateKey.from_string(privateKey);
            if (signingAccount && message) {
                return signingAccount.sign((new TextEncoder()).encode(message)).to_string();
            }
            return "";
        });
    },
    /**
     * verify message
     * @param address
     * @param message
     * @param signature
     */ verifyMessage(address, message, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                if (address && message && signature) {
                    let messageBytes = _StringUtils__WEBPACK_IMPORTED_MODULE_0__["default"].stringToUint8Array(message);
                    let signatureString = aleo.Signature.from_string(signature);
                    let addressCount = aleo.Address.from_string(address);
                    return addressCount.verify(messageBytes, signatureString);
                }
                return false;
            }
            catch (e) {
                return false;
            }
        });
    },
    /**
     * create account form mnemonic
     * @param seed
     */ fromSeedUnchecked(seed) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                let privateKey = aleo.PrivateKey.from_seed_unchecked(seed).to_string();
                return this.loadAccount(privateKey);
            }
            catch (e) {
                return e;
            }
        });
    },
    fromSeedUncheckedToPrivateKey(seed) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                return aleo.PrivateKey.from_seed_unchecked(seed);
            }
            catch (e) {
                return {};
            }
        });
    },
    /**
     * transfer
     * @param private_key  私钥
     * @param amount_credits 金额
     * @param to 接收地址
     * @param amount_record 转账 record
     * @param fee_credits gas 金额
     * @param fee_record gas record
     */
    transfer(private_key, amount_credits, to, amount_record, fee_credits, fee_record) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                let transferTransaction = yield _aleowasm__WEBPACK_IMPORTED_MODULE_1__.baseProgramManager.transfer(private_key, amount_credits, to, TRANSFER_TYPE_PRIVATE, aleo.RecordPlaintext.fromString(amount_record), fee_credits, aleo.RecordPlaintext.fromString(fee_record), _api_requestApi__WEBPACK_IMPORTED_MODULE_2__.ALEO_PEER_URL, true);
                return transferTransaction.toString();
            }
            catch (e) {
                return "";
            }
        });
    },
    /**
     * 执行合约方法
     * @param program 合约名称
     * @param _function 执行方法名
     * @param inputs inputs
     * @param private_key 私钥
     * @param fee_credits gas 费用
     * @param fee_record gas record
     */
    executeProgram(program, _function, inputs, private_key, fee_credits, fee_record) {
        return __awaiter(this, void 0, void 0, function* () {
            let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
            let executeTransaction = yield _aleowasm__WEBPACK_IMPORTED_MODULE_1__.baseProgramManager.execute(private_key, program, _function, inputs, fee_credits, aleo.RecordPlaintext.fromString(fee_record), _api_requestApi__WEBPACK_IMPORTED_MODULE_2__.ALEO_PEER_URL, true);
            return executeTransaction.toString();
        });
    },
    /**
     * 分割record
     * @param private_key
     * @param split_amount
     * @param amount_record
     * @param url
     * @param cache
     */
    splitRecord(private_key, split_amount, amount_record) {
        return __awaiter(this, void 0, void 0, function* () {
            let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
            let splitTransaction = yield _aleowasm__WEBPACK_IMPORTED_MODULE_1__.baseProgramManager.split(private_key, split_amount, aleo.RecordPlaintext.fromString(amount_record), _api_requestApi__WEBPACK_IMPORTED_MODULE_2__.ALEO_PEER_URL, true);
            return splitTransaction.toString();
        });
    },
    /**
     * 解析records 只能传入一个解析(为了避免出现解析失败的场景)
     * @param privateKey 私钥
     * @param recordstext 要解析的record
     */
    decryptrecords(privateKey, recordstext) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let decryptData = privateKey.decryptrecords(recordstext);
                return decryptData;
            }
            catch (e) {
                // console.log(e);
                return "[]";
            }
        });
    },
    /**
     *
     */
    getAddress(privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                if (privateKey) {
                    return privateKey.to_address().to_string();
                }
                return "";
            }
            catch (e) {
                return "";
            }
        });
    },
    /**
     *
     */
    getAccountData(privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
            if (privateKey) {
                return {
                    privateKey: privateKey.to_string(),
                    viewKey: privateKey.to_view_key().to_string(),
                    address: privateKey.to_address().to_string()
                };
            }
            return null;
        });
    },
    /**
     *
     */
    getPrivateKey(privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                if (privateKey) {
                    return privateKey.to_string();
                }
                return "";
            }
            catch (e) {
                return "";
            }
        });
    },
    /**
     *
     */
    getViewKey(privateKey) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                if (privateKey) {
                    return privateKey.to_view_key().to_string();
                }
                return "";
            }
            catch (e) {
                return "";
            }
        });
    },
    /**
     * stringToField
     */
    stringFiled(input, bhptype, destination_type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("stringFiled start")
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                let hhh = aleo.hashBHP(input, bhptype, destination_type);
                return hhh;
            }
            catch (e) {
                // console.log("stringFiled error ::: " + e)
                return "";
            }
        });
    },
    /**
     *  basea58
     */
    base58(input, action) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("base58 start")
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                let hhh = aleo.base58(input, action);
                return hhh;
            }
            catch (e) {
                // console.log("base58 error ::: " + e)
                return "";
            }
        });
    },
    /**
     *  join
     */
    joinRecords(private_key, record_1, record_2, fee_credits, fee_record) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // console.log("base58 start")
                let aleo = yield (0,_aleowasm__WEBPACK_IMPORTED_MODULE_1__["default"])();
                let hhh = _aleowasm__WEBPACK_IMPORTED_MODULE_1__.baseProgramManager.join(private_key, aleo.RecordPlaintext.fromString(record_1), aleo.RecordPlaintext.fromString(record_2), fee_credits, aleo.RecordPlaintext.fromString(fee_record), _api_requestApi__WEBPACK_IMPORTED_MODULE_2__.ALEO_PEER_URL, true);
                return hhh;
            }
            catch (e) {
                // console.log("base58 error ::: " + e)
                return "";
            }
        });
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AleoTools);


/***/ }),

/***/ "./src/utils/StringUtils.ts":
/*!**********************************!*\
  !*** ./src/utils/StringUtils.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
let reg = /^[0-9]+.?[0-9]*$/;
/**
 * 字符串处理工具
 */
const StringUtils = {
    stringToUint8Array(str) {
        let arr = [];
        for (let i = 0, l = str.length; i < l; i++) {
            let hex = Number(str.charCodeAt(i)).toString(16);
            arr.push(hex);
        }
        return new Uint8Array(arr);
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StringUtils);


/***/ }),

/***/ "./src/utils/myDataBase.ts":
/*!*********************************!*\
  !*** ./src/utils/myDataBase.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MyDB: () => (/* binding */ MyDB),
/* harmony export */   Store: () => (/* binding */ Store)
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
var Store;
(function (Store) {
    Store["ALEOSYNC_STORE_NAME"] = "sync";
    Store["ALEORECORD_STORE_NAME"] = "record";
    Store["TRANSACTION_STORE_NAME"] = "transactions";
    Store["EXECUTE_STORE_NAME"] = "executes";
})(Store || (Store = {}));
class MyDB {
    constructor() {
    }
    // TODO 使用aes加密 privakey加密
    // 打开数据库连接
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let request = indexedDB.open(MyDB.DB_NAME, 1);
                request.onerror = (event) => {
                    // console.error('open db filed');
                    reject(event);
                };
                request.onsuccess = (event) => {
                    this.db = event.target.result;
                    resolve();
                };
                // 创建/当数据库版本不一致时触发该事件，可以在此处更新数据库结构
                request.onupgradeneeded = (event) => {
                    // console.log('数据库版本更新');
                    // todo 判断表是否已经创建
                    let db = event.target.result;
                    let syncStore = db.createObjectStore(MyDB.ALEORECORD_STORE_NAME, { keyPath: 'record' });
                    // 添加索引，以便根据名称进行数据检索
                    syncStore.createIndex('address', 'address', { unique: false });
                    syncStore.createIndex('program_id', 'program_id');
                    // 创建第二个对象存储
                    // TODO 将keypath替换成address
                    let recordStore = db.createObjectStore(MyDB.ALEOSYNC_STORE_NAME, { keyPath: 'id', autoIncrement: true });
                    recordStore.createIndex('address', 'address', { unique: true });
                    // 创建订单记录存储对象
                    let objectStore = db.createObjectStore(MyDB.TRANSACTION_STORE_NAME, { keyPath: 'id' });
                    objectStore.createIndex('type', 'type');
                    objectStore.createIndex('transferStatus', 'transferStatus');
                    objectStore.createIndex('address', 'address');
                };
            });
        });
    }
    /**
     * 在指定store中添加数据
     * @param storeName 对象仓库
     * @param data 添加的数据
     * @returns
     */
    // TODO 替换成put测试
    addData(storeName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = this.db.transaction(storeName, 'readwrite');
            let objectStore = transaction.objectStore(storeName);
            return new Promise((resolve, reject) => {
                // 添加数据
                let request = objectStore.add(data);
                // 添加成功后返回数据id
                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };
                request.onerror = (event) => {
                    // console.error('add data filed');
                    reject(event);
                };
            });
        });
    }
    /**
     * 添加数据数据表内
     * @returns
     */
    addDataToStore(storeName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let transaction = this.db.transaction(storeName, 'readwrite');
                let objectStore = transaction.objectStore(storeName);
                return new Promise((resolve, reject) => {
                    // 添加数据
                    let request = objectStore.add(data);
                    request.onsuccess = (event) => {
                        resolve(true);
                    };
                    request.onerror = (event) => {
                        reject(false);
                    };
                });
            }
            catch (e) {
                return false;
            }
        });
    }
    // 根据id获取指定数据
    getById(id, storeName) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = this.db.transaction(storeName, 'readonly');
            let objectStore = transaction.objectStore(storeName);
            return new Promise((resolve, reject) => {
                // 根据id获取数据
                let request = objectStore.get(id);
                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };
                request.onerror = (event) => {
                    // console.error('获取数据失败');
                    reject(event);
                };
            });
        });
    }
    // 更新指定数据
    update(storeName, key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = this.db.transaction(storeName, 'readwrite');
            let objectStore = transaction.objectStore(storeName);
            return new Promise((resolve, reject) => {
                // 获取指定key对应的数据记录
                // var getRequest = objectStore.get(key);
                var index = objectStore.index("address");
                index.get(key).onerror = (event) => {
                    // console.error('更新时获取数据失败');
                };
                index.get(key).onsuccess = (event) => {
                    var result = event.target.result;
                    result.endHeight = data;
                    // 把更新过的数据放进数据库
                    let request = objectStore.put(result);
                    request.onsuccess = (event) => {
                        resolve();
                    };
                    request.onerror = (event) => {
                        // console.error('更新数据失败');
                        reject(event);
                    };
                };
            });
        });
    }
    // 根据id删除指定数据
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = this.db.transaction(MyDB.ALEORECORD_STORE_NAME, 'readwrite');
            let objectStore = transaction.objectStore(MyDB.ALEORECORD_STORE_NAME);
            return new Promise((resolve, reject) => {
                // 删除数据
                let request = objectStore.delete(id);
                request.onsuccess = (event) => {
                    resolve();
                };
                request.onerror = (event) => {
                    // console.error('删除数据失败');
                    reject(event);
                };
            });
        });
    }
    // 根据address查询数据
    getByName(storeName, name) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log('查询数据中');
            let transaction = this.db.transaction(storeName, 'readonly');
            let objectStore = transaction.objectStore(storeName);
            let index = objectStore.index('address');
            return new Promise((resolve, reject) => {
                // 根据索引查询数据，可以使用openCursor或openKeyCursor方法
                let request = index.openCursor(IDBKeyRange.only(name));
                let result = [];
                request.onsuccess = (event) => {
                    let cursor = event.target.result;
                    if (cursor) {
                        result.push(cursor.value);
                        cursor.continue();
                    }
                    else {
                        resolve(result);
                    }
                };
                request.onerror = (event) => {
                    // console.error('查询数据失败');
                    reject(event);
                };
            });
        });
    }
    /**
     * 查询所有的交易记录
     * @param storeName 表名
     */
    getAllTransferData(storeName) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let transaction = this.db.transaction(storeName, 'readwrite');
                let objectStore = transaction.objectStore(storeName);
                var request = objectStore.getAll();
                request.onsuccess = function (event) {
                    resolve(request.result);
                };
                // 数据获取失败
                request.onerror = function (event) {
                    reject(event);
                };
            });
        });
    }
    /**
     * 更新数据库表内数据
     * @param storeName
     * @param data
     */
    updateData(storeName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let transaction = this.db.transaction(storeName, 'readwrite');
            let objectStore = transaction.objectStore(storeName);
            return new Promise((resolve, reject) => {
                let request = objectStore.put(data);
                request.onsuccess = function (event) {
                    resolve(true);
                };
                request.onerror = function (event) {
                    resolve(false);
                };
            });
        });
    }
    /**
     * 根据ID查询单个交易记录
     * @param storeName 表名
     * @param id id
     */
    getDataById(storeName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let transaction = this.db.transaction(storeName, 'readwrite');
                let objectStore = transaction.objectStore(storeName);
                let objectStoreRequest = objectStore.get(id);
                objectStoreRequest.onsuccess = function (event) {
                    resolve(objectStoreRequest.result);
                };
                // 数据获取失败
                objectStoreRequest.onerror = function (event) {
                    reject(event);
                };
            });
        });
    }
    /**
     * 根据ID删除 表内某条数据
     * @param storeName
     * @param id
     */
    deleteDataById(storeName, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let transaction = this.db.transaction(storeName, 'readwrite');
                let objectStore = transaction.objectStore(storeName);
                let request = objectStore.delete(id);
                request.onsuccess = function (event) {
                    resolve(true);
                };
                request.onerror = function (event) {
                    resolve(false);
                };
            });
        });
    }
    /**
     * search data by index
     * @param storeName table name
     * @param indexKey 索引名称
     * @param indexValue 索引的值
     */
    searchDbDataByIndex(storeName, indexKey, indexValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let request = this.db.transaction(storeName, 'readonly').objectStore(storeName).index(indexKey).openCursor(IDBKeyRange.only(indexValue));
                let dataArray = [];
                request.onsuccess = (event) => {
                    let cursor = event.target.result;
                    if (cursor) {
                        dataArray.push(cursor.value);
                        cursor.continue();
                    }
                    else {
                        resolve(dataArray);
                    }
                };
                request.onerror = function (event) {
                    resolve([]);
                };
            });
        });
    }
}
MyDB.DB_NAME = 'MyDB';
MyDB.ALEOSYNC_STORE_NAME = 'sync';
MyDB.ALEORECORD_STORE_NAME = 'record';
MyDB.TRANSACTION_STORE_NAME = 'transactions';


/***/ }),

/***/ "./src/utils/recordsUtils.tsx":
/*!************************************!*\
  !*** ./src/utils/recordsUtils.tsx ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   RecordsUtils: () => (/* binding */ RecordsUtils)
/* harmony export */ });
/* harmony import */ var _api_requestApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/requestApi */ "./src/api/requestApi.ts");
/* harmony import */ var _api_record__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../api/record */ "./src/api/record.ts");
/* harmony import */ var _myDataBase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./myDataBase */ "./src/utils/myDataBase.ts");
/* harmony import */ var _model_TransferType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../model/TransferType */ "./src/model/TransferType.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




/**
 * records工具类
 */
const RecordsUtils = {
    /**
     * 获取当前records列表
     * @param currentAccount
     */ getCurrentRecords(currentAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let availableRecords = [];
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            if (recordAll && recordAll.length) {
                recordAll.forEach((record, index) => {
                    if (!record.spent && record.program_id === "credits.aleo") {
                        availableRecords.push(record);
                    }
                });
            }
            return availableRecords;
        });
    },
    isTransferFunction(function_name) {
        return function_name === "transfer_private";
    },
    handleActivity(currentAddress, recordAll, activityList) {
        return __awaiter(this, void 0, void 0, function* () {
            if (recordAll && recordAll.length) {
                for (const item of recordAll) {
                    if (item.function_name === "fee") {
                        let exeProgramData = yield RecordsUtils.getTransitionData(item.transaction_id);
                        if (exeProgramData.timestamp) {
                            console.log("exeProgramData", exeProgramData);
                            if (exeProgramData.type === "deploy") { // deploy program
                                let activity = {
                                    fee: exeProgramData.fee / 1000000,
                                    method: item.output_index,
                                    value: exeProgramData.functionName,
                                    timestamp: item.timestamp,
                                    id: item.transaction_id,
                                    type: item.type,
                                    message: `Deployed ${exeProgramData.program}`,
                                    activityType: _model_TransferType__WEBPACK_IMPORTED_MODULE_3__.TransactionType.deploy
                                };
                                activityList.push(activity);
                            }
                            else {
                                let activity = {
                                    fee: exeProgramData.fee / 1000000,
                                    method: item.output_index,
                                    value: exeProgramData.functionName,
                                    timestamp: item.timestamp,
                                    id: item.transaction_id,
                                    type: item.type,
                                    message: `Executed ${exeProgramData.functionName} on ${exeProgramData.program}`,
                                    activityType: _model_TransferType__WEBPACK_IMPORTED_MODULE_3__.TransactionType.execute
                                };
                                activityList.push(activity);
                            }
                        }
                    }
                    else {
                        let credits = this.analyzeCredits(item.record);
                        let amount = credits;
                        if (this.isTransferFunction(item.function_name) && item.output_index === 1) { //  send value
                            amount = yield RecordsUtils.getSendCredits(currentAddress, item.input, credits);
                            let fee = yield RecordsUtils.getRecordFee(item.transaction_id);
                            let activity = {
                                fee: fee / 1000000,
                                method: item.output_index,
                                value: amount / 1000000,
                                timestamp: item.timestamp,
                                id: item.transaction_id,
                                type: item.type,
                                message: `Send ${amount / 1000000} Aleo`,
                                activityType: _model_TransferType__WEBPACK_IMPORTED_MODULE_3__.TransactionType.transfer
                            };
                            activityList.push(activity);
                        }
                        else if (this.isTransferFunction(item.function_name) && item.output_index === 0) {
                            // Received
                            let fee = yield RecordsUtils.getRecordFee(item.transaction_id);
                            let activity = {
                                fee: fee / 1000000,
                                method: item.output_index,
                                value: amount !== -1 ? amount / 1000000 : item.function_name,
                                timestamp: item.timestamp,
                                id: item.transaction_id,
                                type: item.type,
                                message: `Received ${amount / 1000000} Aleo`,
                                activityType: _model_TransferType__WEBPACK_IMPORTED_MODULE_3__.TransactionType.transfer
                            };
                            activityList.push(activity);
                        }
                        else if (item.type === "execute" && item.output_index === 0) {
                            let activity = {
                                fee: item.fee / 1000000,
                                method: item.output_index,
                                value: item.function_name,
                                timestamp: item.timestamp,
                                id: item.transaction_id,
                                type: item.type,
                                message: `Executed ${item.function_name} on ${item.program_id}`,
                                activityType: _model_TransferType__WEBPACK_IMPORTED_MODULE_3__.TransactionType.execute
                            };
                            activityList.push(activity);
                        }
                    }
                }
            }
        });
    },
    /**
     * refresh activity and balance
     */
    refreshActivityAndBalance(currentAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let activityList = [];
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            let balance = this.calculateBalance1(currentAddress, recordAll);
            yield this.handleActivity(currentAddress, recordAll, activityList);
            // if (recordAll && recordAll.length) {
            //     for (const item of recordAll) {
            //         // console.log(item.function_name)
            //         if (item.function_name !== "fee") {
            //             let credits = this.analyzeCredits(item.record);
            //             let amount = credits;
            //             if (item.type === "transfer" && item.output_index === 1) {
            //                 // Send value
            //                 amount = await RecordsUtils.getSendCredits(currentAddress, item.input, credits);
            //                 let activity = {
            //                     fee: item.fee,
            //                     method: item.output_index,
            //                     value: amount / 1000000,
            //                     timestamp: item.timestamp,
            //                     id: item.transaction_id,
            //                     type: item.type,
            //                     message: `Send ${amount / 1000000} Aleo`,
            //                     activityType: TransactionType.transfer
            //                 } as ActivityList;
            //                 activityList.push(activity);
            //             } else if (item.type === "transfer" && item.output_index === 0) {
            //                 // Received
            //                 let activity = {
            //                     fee: item.fee,
            //                     method: item.output_index,
            //                     value: amount !== -1 ? amount / 1000000 : item.function_name,
            //                     timestamp: item.timestamp,
            //                     id: item.transaction_id,
            //                     type: item.type,
            //                     message: `Received ${amount / 1000000} Aleo`,
            //                     activityType: TransactionType.transfer
            //                 } as ActivityList;
            //                 activityList.push(activity);
            //             } else if (item.type === "deploy") { // 执行或者deploy
            //                 let activity = {
            //                     fee: item.fee,
            //                     method: item.output_index,
            //                     value: item.function_name,
            //                     timestamp: item.timestamp,
            //                     id: item.transaction_id,
            //                     type: item.type,
            //                     message: `Deployed ${item.function_name}`,
            //                     activityType: TransactionType.deploy
            //                 } as ActivityList;
            //                 activityList.push(activity);
            //             } else if (item.type === "execute" && item.output_index === 0) {
            //                 let activity = {
            //                     fee: item.fee,
            //                     method: item.output_index,
            //                     value: item.function_name,
            //                     timestamp: item.timestamp,
            //                     id: item.transaction_id,
            //                     type: item.type,
            //                     message: `Executed ${item.function_name} on ${item.program_id}`,
            //                     activityType: TransactionType.execute
            //                 } as ActivityList;
            //                 activityList.push(activity);
            //             }
            //
            //         }
            //     }
            // }
            if (activityList.length > 0) {
                activityList.sort((a, b) => {
                    return b.timestamp - a.timestamp;
                });
            }
            return { activityList, balance };
        });
    },
    /**
     * map records
     */
    mapRecord(data, address) {
        return __awaiter(this, void 0, void 0, function* () {
            let newData = [];
            for (let i = 0; i < data.length; i++) {
                let item = data[i];
                if (item && item.record && item.record.indexOf(address) != -1) { // current address's records
                    newData.push(Object.assign(Object.assign({}, item), { spent: yield (0,_api_record__WEBPACK_IMPORTED_MODULE_1__.isRecordUsed)(item.serial_number) }));
                }
            }
            return newData;
        });
    },
    /**
     * calculate balance to aleo
     */
    calculateBalance(currentAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            let balance = 0;
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            if (recordAll && recordAll.length) {
                recordAll.forEach((record) => {
                    if (!record.spent && record.program_id == "credits.aleo") {
                        balance += this.analyzeCredits(record.record);
                    }
                });
            }
            return balance / 1000000;
        });
    },
    calculateBalance1(currentAddress, recordAll) {
        let balance = 0;
        if (recordAll && recordAll.length) {
            recordAll.forEach((record) => {
                if (!record.spent && record.program_id == "credits.aleo") {
                    balance += this.analyzeCredits(record.record);
                }
            });
        }
        return balance / 1000000;
    },
    /**
     * Maximum Usable Amount
     */
    calculateMaxBalance(currentAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            if (recordAll && recordAll.length) {
                const values = recordAll.map((item) => {
                    if (!item.spent) {
                        return this.analyzeCredits(item.record);
                    }
                    else {
                        return 0;
                    }
                });
                const max = Math.max(...values);
                return max == 0 ? max : max / 1000000;
            }
            return 0;
        });
    },
    /**
     * 解析record金额
     * @param record
     */
    analyzeCredits(record) {
        let credits = 0;
        // 使用正则表达式提取键值对
        const regex = /(\w+):\s*([\w\.]+)/g;
        const matches = record.matchAll(regex);
        // 将键值对转换为对象
        const obj = {};
        for (const match of matches) {
            obj[match[1]] = match[2];
        }
        try {
            credits = this.stringToCredits(obj.microcredits);
        }
        catch (e) {
            // console.log(e);
        }
        return credits;
    },
    stringToCredits(value) {
        return Number(value.split("u")[0]);
    },
    /**
     * 判断有效records数量
     * @param currentAddress
     * @param minSize
     */
    checkRecords(currentAddress, minSize) {
        return __awaiter(this, void 0, void 0, function* () {
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            let spendSize = 0;
            recordAll && recordAll.forEach((record, index) => {
                if (!record.spent) {
                    spendSize++;
                }
            });
            return spendSize >= minSize;
        });
    },
    /**
     * 获取转账需要用的record
     * @param amount 转账金额
     * @param gas gas金额
     */
    obtainTransferRecord(currentAddress, amount, gas) {
        return __awaiter(this, void 0, void 0, function* () {
            let amountRecord = {};
            let gasRecord = {};
            // console.log("obtainTransferRecord")
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            if (recordAll && recordAll.length >= 2) {
                recordAll.forEach((record, index) => {
                    if (!record.spent) {
                        let credits = this.analyzeCredits(record.record);
                        if (credits >= amount * 1000000 && !amountRecord.record) {
                            amountRecord = record;
                        }
                        else if (credits >= gas * 1000000 && !gasRecord.record) {
                            gasRecord = record;
                        }
                    }
                });
            }
            return { amountRecord, gasRecord };
        });
    },
    /**
     * 获取gas使用的record
     * @param currentAccount
     * @param gas
     */
    obtainExecuteRecord(currentAddress, gas) {
        return __awaiter(this, void 0, void 0, function* () {
            let gasRecord = {};
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            if (recordAll && recordAll.length) {
                recordAll.forEach((record, index) => {
                    if (!record.spent) {
                        let credits = this.analyzeCredits(record.record);
                        if (credits >= gas * 1000000 && !gasRecord.record) {
                            gasRecord = record;
                        }
                    }
                });
            }
            return gasRecord;
        });
    },
    /**
     * get join gas record
     */
    obtainJoinRecord(currentAddress, gas, joins) {
        return __awaiter(this, void 0, void 0, function* () {
            let gasRecord = {};
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            if (recordAll && recordAll.length) {
                recordAll.forEach((record, index) => {
                    let find = joins.find((item) => item === record.record);
                    if (!record.spent && !find) {
                        let credits = this.analyzeCredits(record.record);
                        if (credits >= gas * 1000000 && !gasRecord.record) {
                            gasRecord = record;
                        }
                    }
                });
            }
            return gasRecord;
        });
    },
    findRecordDBdByRecord(record, currentAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            if (recordAll) {
                let find = recordAll.find((item) => item.record === record);
                if (find) {
                    return find;
                }
            }
            return {};
        });
    },
    /**
     * 根据交易记录获取gas费用
     * @param transactionId
     */
    getRecordFee(transactionId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let fee = 0;
                let req = yield (0,_api_requestApi__WEBPACK_IMPORTED_MODULE_0__.queryFeeByTransactionsID)(transactionId);
                if (req && req.fees && req.fees.length > 0) {
                    req.fees.forEach(item => {
                        if (item.transaction === transactionId && item.transition.inputs && item.transition.inputs.length > 1) {
                            fee = this.stringToCredits(item.transition.inputs[1].value);
                        }
                    });
                }
                resolve(fee);
            }
            catch (e) {
                resolve(0);
            }
        }));
    },
    /**
     * 查询 Transition 对象
     * @param transactionId
     */
    getTransitionData(transactionId) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let data = {};
                let fee = 0;
                let req = yield (0,_api_requestApi__WEBPACK_IMPORTED_MODULE_0__.queryFeeByTransactionsID)(transactionId);
                if (req && req.fees && req.fees.length > 0) {
                    req.fees.forEach(item => {
                        if (item.transaction === transactionId && !this.isTransferFunction(item.transition.function)) {
                            if (item.transition.inputs.length > 1) {
                                fee = this.stringToCredits(item.transition.inputs[1].value);
                            }
                            if (!this.isTransferFunction(item.function)) {
                                data = {
                                    transactionId: item.transaction,
                                    timestamp: item.timestamp,
                                    transitionId: item.transition.id,
                                    program: item.program,
                                    functionName: item.function,
                                    fee: fee,
                                    type: item.type
                                };
                            }
                        }
                    });
                }
                resolve(data);
            }
            catch (e) {
                resolve({});
            }
        }));
    },
    /**
     * query records by programID
     * @param programId
     * @param all whether query all
     */
    queryRecordsByProgramId(programId, currentAddress, all) {
        return __awaiter(this, void 0, void 0, function* () {
            let queryRecords = [];
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            if (recordAll && recordAll.length) {
                recordAll.forEach((item) => {
                    if (item.program_id === programId) {
                        if (all) {
                            queryRecords.push({
                                address: item.address,
                                programID: item.program_id,
                                record: item.record
                            });
                        }
                        else if (!item.spent) {
                            queryRecords.push({
                                address: item.address,
                                programID: item.program_id,
                                record: item.record
                            });
                        }
                    }
                });
            }
            // console.log(queryRecords)
            return queryRecords;
        });
    },
    /**
     * get send Credits
     */
    getSendCredits(currentAddress, input, credits) {
        return __awaiter(this, void 0, void 0, function* () {
            let sendCredits = 0;
            const recordAll = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEORECORD_STORE_NAME, currentAddress);
            if (recordAll && recordAll.length) {
                recordAll.forEach((item) => {
                    if (item.spent && input && input.find((value) => value === item.serial_number)) {
                        let totalCredits = this.analyzeCredits(item.record);
                        sendCredits = totalCredits - credits;
                    }
                });
            }
            return sendCredits;
        });
    },
    getDataWithOpen(storeName, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const myDB = new _myDataBase__WEBPACK_IMPORTED_MODULE_2__.MyDB();
            yield myDB.open();
            return yield myDB.getByName(storeName, key);
        });
    },
    addDataWithOpen(storeName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const myDB = new _myDataBase__WEBPACK_IMPORTED_MODULE_2__.MyDB();
            yield myDB.open();
            return yield myDB.addData(storeName, data);
        });
    },
    updateDataWithOpen(storeName, key, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const myDB = new _myDataBase__WEBPACK_IMPORTED_MODULE_2__.MyDB();
            yield myDB.open();
            return yield myDB.update(storeName, key, data);
        });
    },
    newUpdateDataWithOpen(storeName, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const myDB = new _myDataBase__WEBPACK_IMPORTED_MODULE_2__.MyDB();
            yield myDB.open();
            return yield myDB.updateData(storeName, data);
        });
    },
    syncHeight(address) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield RecordsUtils.getDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEOSYNC_STORE_NAME, address);
            if (res.length) {
                return res[0];
            }
            else {
                const data = {
                    address,
                    endHeight: 0,
                };
                yield RecordsUtils.addDataWithOpen(_myDataBase__WEBPACK_IMPORTED_MODULE_2__.Store.ALEOSYNC_STORE_NAME, data);
                return data;
            }
        });
    },
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjX2FwaV9yZWNvcmRfdHMtc3JjX3V0aWxzX3JlY29yZHNVdGlsc190c3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXFEO0FBQ2I7QUFFeEMsSUFBSSxNQUFNLEdBQUcsS0FBSztBQUVYLElBQUksa0JBQWtCLEdBQUcsRUFBb0IsQ0FBQztBQUV0QyxTQUFlLFFBQVE7O1FBQ2xDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxNQUFNLDBEQUFJLEVBQUU7WUFDWixrQkFBa0IsR0FBRyxJQUFJLDBEQUFtQixFQUFFO1lBQzlDLE1BQU0sR0FBRyxJQUFJO1NBQ2hCO1FBQ0QsT0FBTywyQ0FBSTtJQUNmLENBQUM7Q0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiMEM7QUFFc0M7QUFDOUI7QUFFNUMsU0FBZSxVQUFVLENBQUMsR0FBVyxFQUFFLE9BQWUsRUFBRSxTQUFpQixFQUFFLGFBQXFCLEVBQUUsUUFBMkU7O1FBQ2hMLG1EQUFtRDtRQUNuRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDdkIsU0FBUztRQUNULG9EQUFvRDtRQUNwRCwrQkFBK0I7UUFDL0IsSUFBSSxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQ3RCLGlCQUFpQjtRQUNqQixJQUFJLEdBQUcsR0FBRyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBQzVCLDBDQUEwQztRQUMxQyxLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLElBQUksYUFBYSxFQUFFLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDcEQsR0FBRyxHQUFHLEdBQUcsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDO1lBQ2hELFlBQVk7WUFDWixJQUFJLFVBQVUsR0FBRyxNQUFNLHdEQUFTLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDdkQsSUFBSSxJQUFJLEdBQUcsTUFBTSw0REFBZSxDQUFDLEtBQUssRUFBRSxH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O1FBQy9DLENBQUM7S0FBQTtJQUNLLGtCQUFrQixDQUFDLFNBQWlCLEVBQUUsR0FBVyxFQUFFLElBQVM7O1lBQzlELE1BQU0sSUFBSSxHQUFHLElBQUksNkNBQUksRUFBRSxDQUFDO1lBQ3hCLE1BQU0sSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQ2xCLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztLQUFBO0lBRUsscUJBQXFCLENBQUMsU0FBaUIsRUFBRSxJQUFTOztZQUNwRCxNQUFNLElBQUksR0FBRyxJQUFJLDZDQUFJLEVBQUUsQ0FBQztZQUN4QixNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNsQixPQUFPLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDbEQsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLE9BQWU7O1lBQzVCLE1BQU0sR0FBRyxHQUFHLE1BQU0sWUFBWSxDQUFDLGVBQWUsQ0FBQyw4Q0FBSyxDQUFDLG1CQUFtQixFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ25GLElBQUksR0FBRyxDQUFDLE1BQU0sRUFBRTtnQkFDWixPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNqQjtpQkFBTTtnQkFDSCxNQUFNLElBQUksR0FBRztvQkFDVCxPQUFPO29CQUNQLFNBQVMsRUFBRSxDQUFDO2lCQUNmLENBQUM7Z0JBQ0YsTUFBTSxZQUFZLENBQUMsZUFBZSxDQUFDLDhDQUFLLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BFLE9BQU8sSUFBSSxDQUFDO2FBQ2Y7UUFDTCxDQUFDO0tBQUE7Q0FDSixDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL2FsZW93YXNtLnRzIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy9hcGkvcmVjb3JkLnRzIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9BbGVvVG9vbHMudHMiLCJ3ZWJwYWNrOi8vcmVhY3QtcnVzdC1jaHJvbWUtZXh0ZW5zaW9uLy4vc3JjL3V0aWxzL1N0cmluZ1V0aWxzLnRzIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9teURhdGFCYXNlLnRzIiwid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi8uL3NyYy91dGlscy9yZWNvcmRzVXRpbHMudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBpbml0LCB7UHJvZ3JhbU1hbmFnZXJ9IGZyb20gJy4uL3BrZy9hbGVvLXdhc20nXHJcbmltcG9ydCAqIGFzIGFsZW8gZnJvbSAnLi4vcGtnL2FsZW8td2FzbSdcclxuXHJcbmxldCBpbml0ZWQgPSBmYWxzZVxyXG5cclxuZXhwb3J0IGxldCBiYXNlUHJvZ3JhbU1hbmFnZXIgPSB7fSBhcyBQcm9ncmFtTWFuYWdlcjtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIEFsZW9XYXNtKCkge1xyXG4gICAgaWYgKCFpbml0ZWQpIHtcclxuICAgICAgICBhd2FpdCBpbml0KClcclxuICAgICAgICBiYXNlUHJvZ3JhbU1hbmFnZXIgPSBuZXcgYWxlby5Qcm9ncmFtTWFuYWdlcigpXHJcbiAgICAgICAgaW5pdGVkID0gdHJ1ZVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFsZW9cclxufSIsImltcG9ydCB7UmVjb3JkQWxsfSBmcm9tIFwiLi4vbW9kZWxcIjtcclxuaW1wb3J0IEFsZW9Ub29scyBmcm9tIFwiLi4vdXRpbHMvQWxlb1Rvb2xzXCI7XHJcbmltcG9ydCB7bG9jYWxTdG9yYWdlVXRpbHN9IGZyb20gXCIuLi91dGlscy9sb2NhbFN0b3JhZ2VVdGlsc1wiO1xyXG5pbXBvcnQge2ZpbmRUcmFuc2l0aW9uLCBxdWVyeUN1cnJlbnRIZWlnaHQsIHF1ZXJ5UmVjb3Jkc0FsbH0gZnJvbSBcIi4vcmVxdWVzdEFwaVwiO1xyXG5pbXBvcnQge1JlY29yZHNVdGlsc30gZnJvbSBcIi4uL3V0aWxzL3JlY29yZHNVdGlsc1wiO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHN5bmNSZWNvcmQoa2V5OiBzdHJpbmcsIGFkZHJlc3M6IHN0cmluZywgZW5kSGVpZ2h0OiBudW1iZXIsIGN1cnJlbnRIZWlnaHQ6IG51bWJlciwgY2FsbGJhY2s6IChwYXJhbXM6IFJlY29yZEFsbFtdIHwgbnVtYmVyIHwgc3RyaW5nLCBzdGF0dXM/OiBib29sZWFuKSA9PiB2b2lkKSB7XHJcbiAgICAvLyBjaHJvbWUuc3RvcmFnZS5sb2NhbC5zZXQoeyBsb29wUnVubmluZzogdHJ1ZSB9KTtcclxuICAgIGNvbnN0IGJhdGNoU2l6ZSA9IDUwMDA7XHJcbiAgICAvLyDlvZPliY3ljLrlnZfpq5jluqZcclxuICAgIC8vIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSBhd2FpdCBxdWVyeUN1cnJlbnRIZWlnaHQoKTtcclxuICAgIC8vIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSAxMDAwMDtcclxuICAgIGxldCBzdGFydCA9IGVuZEhlaWdodDtcclxuICAgIC8vIGxldCBzdGFydCA9IDA7XHJcbiAgICBsZXQgZW5kID0gc3RhcnQgKyBiYXRjaFNpemU7XHJcbiAgICAvLyDmn6Xor6LmiYDmnInnmoRlbmRIZWlnaHQgLSBjdXJyZW50SGVpZ2h0IOaWsOeahHJlY29yZFxyXG4gICAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGN1cnJlbnRIZWlnaHQ7IGkgKz0gYmF0Y2hTaXplKSB7XHJcbiAgICAgICAgZW5kID0gZW5kID4gY3VycmVudEhlaWdodCA/IGN1cnJlbnRIZWlnaHQgOiBlbmQ7XHJcbiAgICAgICAgLy8g5Y+R6YCB5Yiwd29ya2VyXHJcbiAgICAgICAgbGV0IHByaXZhdGVLZXkgPSBhd2FpdCBBbGVvVG9vbHMuY3JlYXRlUHJpdmF0ZUtleShrZXkpO1xyXG4gICAgICAgIGxldCByZXNwID0gYXdhaXQgcXVlcnlSZWNvcmRzQWxsKHN0YXJ0LCBlbmQsIFwibWludFwiKTtcclxuICAgICAgICBpZiAocmVzcC5yZWNvcmRzICYmIHJlc3AucmVjb3Jkcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByZXNwLnJlY29yZHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlc1JlY29yZCA9IGF3YWl0IEFsZW9Ub29scy5kZWNyeXB0cmVjb3Jkcyhwcml2YXRlS2V5LCBKU09OLnN0cmluZ2lmeShbcmVzcC5yZWNvcmRzW2ldXSkpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc1JlY29yZCAmJiByZXNSZWNvcmQgIT09IFwiW11cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIOWQjOatpeWIsOeahOaVsOaNruaUueWPmOeKtuaAgeW5tuWtmOWFpVxyXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc1JlY29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzcDEgPSBhd2FpdCBtYXBSZWNvcmQoSlNPTi5wYXJzZShyZXNSZWNvcmQpLCBhZGRyZXNzKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBhd2FpdCBzdG9yYWdlUmVjb3JkKHJlc3AxLCBmYWxzZSwgY2FsbGJhY2spO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHJlc3AxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBjYWxsYmFjayhlbmQpO1xyXG4gICAgICAgIHN0YXJ0ICs9IGJhdGNoU2l6ZTtcclxuICAgICAgICBlbmQgKz0gYmF0Y2hTaXplO1xyXG4gICAgfVxyXG4gICAgLy8g5ZCM5q2l57uT5p2f5ZCO6ZyA6KaB6YGN5Y6G5omA5pyJ55qE5pWw5o2uXHJcbiAgICBjYWxsYmFjaygnc3luY0VuZCcpO1xyXG59XHJcblxyXG4vLyDpgY3ljoZyZWNvcmRcclxuZXhwb3J0IGNvbnN0IG1hcFJlY29yZCA9IGFzeW5jIChkYXRhOiBSZWNvcmRBbGxbXSwgYWRkcmVzczogc3RyaW5nKSA9PiB7XHJcbiAgICBsZXQgbmV3RGF0YSA9IFtdIGFzIFJlY29yZEFsbFtdO1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgbGV0IGl0ZW0gPSBkYXRhW2ldXHJcbiAgICAgICAgLy8gVE9ETyDliKTmlq0g5piv5ZCm5piv5b2T5YmN6LSm5oi355qEcmVjb3JkXHJcbiAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5yZWNvcmQgJiYgaXRlbS5yZWNvcmQuaW5kZXhPZihhZGRyZXNzKSAhPSAtMSkge1xyXG4gICAgICAgICAgICBpZiAoIWl0ZW0uc3BlbnQpIHtcclxuICAgICAgICAgICAgICAgIGxldCBmZWUgPSAwXHJcbiAgICAgICAgICAgICAgICBsZXQgc2VyaWFsX251bWJlciA9IGl0ZW0uc2VyaWFsX251bWJlcjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IGF3YWl0IGlzUmVjb3JkVXNlZChzZXJpYWxfbnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmZ1bmN0aW9uX25hbWUgPT09IFwidHJhbnNmZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGZlZSA9IGF3YWl0IFJlY29yZHNVdGlscy5nZXRSZWNvcmRGZWUoaXRlbS50cmFuc2FjdGlvbl9pZClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ld0RhdGEucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVjb3JkOiBpdGVtLnJlY29yZCxcclxuICAgICAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbl9pZDogaXRlbS50cmFuc2FjdGlvbl9pZCxcclxuICAgICAgICAgICAgICAgICAgICBzZXJpYWxfbnVtYmVyOiBpdGVtLnNlcmlhbF9udW1iZXIsXHJcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25fbmFtZTogaXRlbS5mdW5jdGlvbl9uYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dF9pbmRleDogaXRlbS5vdXRwdXRfaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBpdGVtLnRpbWVzdGFtcCxcclxuICAgICAgICAgICAgICAgICAgICBpbnB1dDogaXRlbS5pbnB1dCxcclxuICAgICAgICAgICAgICAgICAgICBzcGVudDogcmVzLFxyXG4gICAgICAgICAgICAgICAgICAgIGZlZTogZmVlLCBoZWlnaHQ6IGl0ZW0uaGVpZ2h0LCBwcm9ncmFtX2lkOiBpdGVtLnByb2dyYW1faWRcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbmV3RGF0YS5wdXNoKGl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIG5ld0RhdGE7XHJcbn07XHJcbi8vIGNoZWNrIHJlY29yZCAgdXNlZFxyXG5leHBvcnQgY29uc3QgaXNSZWNvcmRVc2VkID0gYXN5bmMgKF9zZXJpYWxOdW1iZXI6IHN0cmluZykgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCBzZXJpYWxSZXMgPSBhd2FpdCBmaW5kVHJhbnNpdGlvbihfc2VyaWFsTnVtYmVyKTtcclxuICAgICAgICBpZiAoc2VyaWFsUmVzKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG59O1xyXG5cclxuXHJcbiIsImltcG9ydCB7QWxlb0FjY291bnR9IGZyb20gXCIuLi9tb2RlbFwiO1xyXG5pbXBvcnQgU3RyaW5nVXRpbHMgZnJvbSAnLi9TdHJpbmdVdGlscyc7XHJcbmltcG9ydCBBbGVvV2FzbSwge2Jhc2VQcm9ncmFtTWFuYWdlcn0gZnJvbSBcIi4uL2FsZW93YXNtXCI7XHJcbmltcG9ydCB7UHJpdmF0ZUtleSwgUmVjb3JkUGxhaW50ZXh0fSBmcm9tIFwiLi4vLi4vcGtnL2FsZW8td2FzbVwiO1xyXG5pbXBvcnQge0FMRU9fUEVFUl9VUkx9IGZyb20gXCIuLi9hcGkvcmVxdWVzdEFwaVwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IFRSQU5TRkVSX1RZUEVfUFJJVkFURSA9IFwicHJpdmF0ZVwiXHJcbmV4cG9ydCBjb25zdCBUUkFOU0ZFUl9UWVBFX1BVQkxJQyA9IFwicHVibGljXCJcclxuXHJcbmNvbnN0IEFsZW9Ub29scyA9IHtcclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGFjY291bnRcclxuICAgICAqIEBjb25zdHJ1Y3RvclxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGVBY2NvdW50KCkge1xyXG4gICAgICAgIGxldCBhbGVvID0gYXdhaXQgQWxlb1dhc20oKVxyXG4gICAgICAgIGxldCBhY2NvdW50ID0gbmV3IGFsZW8uUHJpdmF0ZUtleSgpO1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIHByaXZhdGVLZXk6IGFjY291bnQudG9fc3RyaW5nKCksXHJcbiAgICAgICAgICAgIHZpZXdLZXk6IGFjY291bnQudG9fdmlld19rZXkoKS50b19zdHJpbmcoKSxcclxuICAgICAgICAgICAgYWRkcmVzczogYWNjb3VudC50b19hZGRyZXNzKCkudG9fc3RyaW5nKClcclxuICAgICAgICB9IGFzIEFsZW9BY2NvdW50XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/miJBQcml2YXRlS2V5XHJcbiAgICAgKiBAcGFyYW0gcHJpdmF0ZUtleVxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGVQcml2YXRlS2V5KHByaXZhdGVLZXk6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBhbGVvID0gYXdhaXQgQWxlb1dhc20oKVxyXG4gICAgICAgIHJldHVybiBhbGVvLlByaXZhdGVLZXkuZnJvbV9zdHJpbmcocHJpdmF0ZUtleSk7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDnlJ/miJBQcm9ncmFtTWFuYWdlclxyXG4gICAgICovXHJcbiAgICBhc3luYyBjcmVhdGVQcm9ncmFtTWFuYWdlcigpIHtcclxuICAgICAgICBsZXQgYWxlbyA9IGF3YWl0IEFsZW9XYXNtKClcclxuICAgICAgICByZXR1cm4gbmV3IGFsZW8uUHJvZ3JhbU1hbmFnZXIoKTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIGxvYWQgYWNjb3VudFxyXG4gICAgICogQHBhcmFtIHByaXZhdGVLZXlcclxuICAgICAqLyBhc3luYyBsb2FkQWNjb3VudChwcml2YXRlS2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgYWxlbyA9IGF3YWl0IEFsZW9XYXNtKClcclxuICAgICAgICBsZXQgYWNjb3VudCA9IGFsZW8uUHJpdmF0ZUtleS5mcm9tX3N0cmluZyhwcml2YXRlS2V5KTtcclxuICAgICAgICBpZiAocHJpdmF0ZUtleSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgICAgICBwcml2YXRlS2V5OiBhY2NvdW50LnRvX3N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgdmlld0tleTogYWNjb3VudC50b192aWV3X2tleSgpLnRvX3N0cmluZygpLFxyXG4gICAgICAgICAgICAgICAgYWRkcmVzczogYWNjb3VudC50b19hZGRyZXNzKCkudG9fc3RyaW5nKClcclxuICAgICAgICAgICAgfSBhcyBBbGVvQWNjb3VudFxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbFxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogZGVjcnlwdFJlY29yZFxyXG4gICAgICogQHBhcmFtIHJlY29yZERhdGFcclxuICAgICAqIEBwYXJhbSB2aWV3S2V5XHJcbiAgICAgKi8gYXN5bmMgZGVjcnlwdFJlY29yZChyZWNvcmREYXRhOiBzdHJpbmcsIHZpZXdLZXk6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBhbGVvID0gYXdhaXQgQWxlb1dhc20oKVxyXG4gICAgICAgICAgICBsZXQgcmVxID0gYWxlby5WaWV3S2V5LmZyb21fc3RyaW5nKHZpZXdLZXkpLmRlY3J5cHQocmVjb3JkRGF0YSlcclxuICAgICAgICAgICAgcmV0dXJuIHJlcVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc2lnbiBtZXNzYWdlXHJcbiAgICAgKiBAcGFyYW0gcHJpdmF0ZUtleVxyXG4gICAgICogQHBhcmFtIG1lc3NhZ2VcclxuICAgICAqLyBhc3luYyBzaWduTWVzc2FnZShwcml2YXRlS2V5OiBzdHJpbmcsIG1lc3NhZ2U6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBhbGVvID0gYXdhaXQgQWxlb1dhc20oKVxyXG4gICAgICAgIGxldCBzaWduaW5nQWNjb3VudCA9IGFsZW8uUHJpdmF0ZUtleS5mcm9tX3N0cmluZyhwcml2YXRlS2V5KVxyXG4gICAgICAgIGlmIChzaWduaW5nQWNjb3VudCAmJiBtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzaWduaW5nQWNjb3VudC5zaWduKChuZXcgVGV4dEVuY29kZXIoKSkuZW5jb2RlKG1lc3NhZ2UpKS50b19zdHJpbmcoKVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICogdmVyaWZ5IG1lc3NhZ2VcclxuICAgICAqIEBwYXJhbSBhZGRyZXNzXHJcbiAgICAgKiBAcGFyYW0gbWVzc2FnZVxyXG4gICAgICogQHBhcmFtIHNpZ25hdHVyZVxyXG4gICAgICovIGFzeW5jIHZlcmlmeU1lc3NhZ2UoYWRkcmVzczogc3RyaW5nLCBtZXNzYWdlOiBzdHJpbmcsIHNpZ25hdHVyZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGFsZW8gPSBhd2FpdCBBbGVvV2FzbSgpXHJcbiAgICAgICAgICAgIGlmIChhZGRyZXNzICYmIG1lc3NhZ2UgJiYgc2lnbmF0dXJlKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbWVzc2FnZUJ5dGVzID0gU3RyaW5nVXRpbHMuc3RyaW5nVG9VaW50OEFycmF5KG1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNpZ25hdHVyZVN0cmluZyA9IGFsZW8uU2lnbmF0dXJlLmZyb21fc3RyaW5nKHNpZ25hdHVyZSlcclxuICAgICAgICAgICAgICAgIGxldCBhZGRyZXNzQ291bnQgPSBhbGVvLkFkZHJlc3MuZnJvbV9zdHJpbmcoYWRkcmVzcylcclxuICAgICAgICAgICAgICAgIHJldHVybiBhZGRyZXNzQ291bnQudmVyaWZ5KG1lc3NhZ2VCeXRlcywgc2lnbmF0dXJlU3RyaW5nKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIGNyZWF0ZSBhY2NvdW50IGZvcm0gbW5lbW9uaWNcclxuICAgICAqIEBwYXJhbSBzZWVkXHJcbiAgICAgKi8gYXN5bmMgZnJvbVNlZWRVbmNoZWNrZWQoc2VlZDogVWludDhBcnJheSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBhbGVvID0gYXdhaXQgQWxlb1dhc20oKVxyXG4gICAgICAgICAgICBsZXQgcHJpdmF0ZUtleSA9IGFsZW8uUHJpdmF0ZUtleS5mcm9tX3NlZWRfdW5jaGVja2VkKHNlZWQpLnRvX3N0cmluZygpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5sb2FkQWNjb3VudChwcml2YXRlS2V5KVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGVcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgYXN5bmMgZnJvbVNlZWRVbmNoZWNrZWRUb1ByaXZhdGVLZXkoc2VlZDogVWludDhBcnJheSk6IFByb21pc2U8UHJpdmF0ZUtleT4ge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBhbGVvID0gYXdhaXQgQWxlb1dhc20oKVxyXG4gICAgICAgICAgICByZXR1cm4gYWxlby5Qcml2YXRlS2V5LmZyb21fc2VlZF91bmNoZWNrZWQoc2VlZClcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7fSBhcyBQcml2YXRlS2V5XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIHRyYW5zZmVyXHJcbiAgICAgKiBAcGFyYW0gcHJpdmF0ZV9rZXkgIOengemSpVxyXG4gICAgICogQHBhcmFtIGFtb3VudF9jcmVkaXRzIOmHkeminVxyXG4gICAgICogQHBhcmFtIHRvIOaOpeaUtuWcsOWdgFxyXG4gICAgICogQHBhcmFtIGFtb3VudF9yZWNvcmQg6L2s6LSmIHJlY29yZFxyXG4gICAgICogQHBhcmFtIGZlZV9jcmVkaXRzIGdhcyDph5Hpop1cclxuICAgICAqIEBwYXJhbSBmZWVfcmVjb3JkIGdhcyByZWNvcmRcclxuICAgICAqL1xyXG4gICAgYXN5bmMgdHJhbnNmZXIocHJpdmF0ZV9rZXk6IFByaXZhdGVLZXksIGFtb3VudF9jcmVkaXRzOiBudW1iZXIsIHRvOiBzdHJpbmcsIGFtb3VudF9yZWNvcmQ6IHN0cmluZywgZmVlX2NyZWRpdHM6IG51bWJlciwgZmVlX3JlY29yZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGFsZW8gPSBhd2FpdCBBbGVvV2FzbSgpXHJcbiAgICAgICAgICAgIGxldCB0cmFuc2ZlclRyYW5zYWN0aW9uID0gYXdhaXQgYmFzZVByb2dyYW1NYW5hZ2VyLnRyYW5zZmVyKHByaXZhdGVfa2V5LCBhbW91bnRfY3JlZGl0cywgdG8sIFRSQU5TRkVSX1RZUEVfUFJJVkFURSwgYWxlby5SZWNvcmRQbGFpbnRleHQuZnJvbVN0cmluZyhhbW91bnRfcmVjb3JkKSwgZmVlX2NyZWRpdHMsIGFsZW8uUmVjb3JkUGxhaW50ZXh0LmZyb21TdHJpbmcoZmVlX3JlY29yZCksIEFMRU9fUEVFUl9VUkwsIHRydWUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdHJhbnNmZXJUcmFuc2FjdGlvbi50b1N0cmluZygpXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmiafooYzlkIjnuqbmlrnms5VcclxuICAgICAqIEBwYXJhbSBwcm9ncmFtIOWQiOe6puWQjeensFxyXG4gICAgICogQHBhcmFtIF9mdW5jdGlvbiDmiafooYzmlrnms5XlkI1cclxuICAgICAqIEBwYXJhbSBpbnB1dHMgaW5wdXRzXHJcbiAgICAgKiBAcGFyYW0gcHJpdmF0ZV9rZXkg56eB6ZKlXHJcbiAgICAgKiBAcGFyYW0gZmVlX2NyZWRpdHMgZ2FzIOi0ueeUqFxyXG4gICAgICogQHBhcmFtIGZlZV9yZWNvcmQgZ2FzIHJlY29yZFxyXG4gICAgICovXHJcbiAgICBhc3luYyBleGVjdXRlUHJvZ3JhbShwcm9ncmFtOiBzdHJpbmcsIF9mdW5jdGlvbjogc3RyaW5nLCBpbnB1dHM6IEFycmF5PGFueT4sIHByaXZhdGVfa2V5OiBQcml2YXRlS2V5LCBmZWVfY3JlZGl0czogbnVtYmVyLCBmZWVfcmVjb3JkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgYWxlbyA9IGF3YWl0IEFsZW9XYXNtKClcclxuICAgICAgICBsZXQgZXhlY3V0ZVRyYW5zYWN0aW9uID0gYXdhaXQgYmFzZVByb2dyYW1NYW5hZ2VyLmV4ZWN1dGUocHJpdmF0ZV9rZXksIHByb2dyYW0sIF9mdW5jdGlvbiwgaW5wdXRzLCBmZWVfY3JlZGl0cywgYWxlby5SZWNvcmRQbGFpbnRleHQuZnJvbVN0cmluZyhmZWVfcmVjb3JkKSwgQUxFT19QRUVSX1VSTCwgdHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGV4ZWN1dGVUcmFuc2FjdGlvbi50b1N0cmluZygpXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5YiG5YmycmVjb3JkXHJcbiAgICAgKiBAcGFyYW0gcHJpdmF0ZV9rZXlcclxuICAgICAqIEBwYXJhbSBzcGxpdF9hbW91bnRcclxuICAgICAqIEBwYXJhbSBhbW91bnRfcmVjb3JkXHJcbiAgICAgKiBAcGFyYW0gdXJsXHJcbiAgICAgKiBAcGFyYW0gY2FjaGVcclxuICAgICAqL1xyXG4gICAgYXN5bmMgc3BsaXRSZWNvcmQocHJpdmF0ZV9rZXk6IFByaXZhdGVLZXksIHNwbGl0X2Ftb3VudDogbnVtYmVyLCBhbW91bnRfcmVjb3JkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgYWxlbyA9IGF3YWl0IEFsZW9XYXNtKClcclxuICAgICAgICBsZXQgc3BsaXRUcmFuc2FjdGlvbiA9IGF3YWl0IGJhc2VQcm9ncmFtTWFuYWdlci5zcGxpdChwcml2YXRlX2tleSwgc3BsaXRfYW1vdW50LCBhbGVvLlJlY29yZFBsYWludGV4dC5mcm9tU3RyaW5nKGFtb3VudF9yZWNvcmQpLCBBTEVPX1BFRVJfVVJMLCB0cnVlKVxyXG4gICAgICAgIHJldHVybiBzcGxpdFRyYW5zYWN0aW9uLnRvU3RyaW5nKClcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDop6PmnpByZWNvcmRzIOWPquiDveS8oOWFpeS4gOS4quino+aekCjkuLrkuobpgb/lhY3lh7rnjrDop6PmnpDlpLHotKXnmoTlnLrmma8pXHJcbiAgICAgKiBAcGFyYW0gcHJpdmF0ZUtleSDnp4HpkqVcclxuICAgICAqIEBwYXJhbSByZWNvcmRzdGV4dCDopoHop6PmnpDnmoRyZWNvcmRcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZGVjcnlwdHJlY29yZHMocHJpdmF0ZUtleTogUHJpdmF0ZUtleSwgcmVjb3Jkc3RleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBkZWNyeXB0RGF0YSA9IHByaXZhdGVLZXkuZGVjcnlwdHJlY29yZHMocmVjb3Jkc3RleHQpXHJcbiAgICAgICAgICAgIHJldHVybiBkZWNyeXB0RGF0YVxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBcIltdXCI7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZ2V0QWRkcmVzcyhwcml2YXRlS2V5OiBQcml2YXRlS2V5IHwgbnVsbCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGxldCBhbGVvID0gYXdhaXQgQWxlb1dhc20oKVxyXG4gICAgICAgICAgICBpZiAocHJpdmF0ZUtleSkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHByaXZhdGVLZXkudG9fYWRkcmVzcygpLnRvX3N0cmluZygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIC8qKlxyXG4gICAgICpcclxuICAgICAqL1xyXG4gICAgYXN5bmMgZ2V0QWNjb3VudERhdGEocHJpdmF0ZUtleTogUHJpdmF0ZUtleSB8IG51bGwpIHtcclxuXHJcbiAgICAgICAgbGV0IGFsZW8gPSBhd2FpdCBBbGVvV2FzbSgpXHJcbiAgICAgICAgaWYgKHByaXZhdGVLZXkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgIHByaXZhdGVLZXk6IHByaXZhdGVLZXkudG9fc3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICB2aWV3S2V5OiBwcml2YXRlS2V5LnRvX3ZpZXdfa2V5KCkudG9fc3RyaW5nKCksXHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzOiBwcml2YXRlS2V5LnRvX2FkZHJlc3MoKS50b19zdHJpbmcoKVxyXG4gICAgICAgICAgICB9IGFzIEFsZW9BY2NvdW50XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsXHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKlxyXG4gICAgICovXHJcbiAgICBhc3luYyBnZXRQcml2YXRlS2V5KHByaXZhdGVLZXk6IFByaXZhdGVLZXkgfCBudWxsKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgbGV0IGFsZW8gPSBhd2FpdCBBbGVvV2FzbSgpXHJcbiAgICAgICAgICAgIGlmIChwcml2YXRlS2V5KSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJpdmF0ZUtleS50b19zdHJpbmcoKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBcIlwiXHJcbiAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGdldFZpZXdLZXkocHJpdmF0ZUtleTogUHJpdmF0ZUtleSB8IG51bGwpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBsZXQgYWxlbyA9IGF3YWl0IEFsZW9XYXNtKClcclxuICAgICAgICAgICAgaWYgKHByaXZhdGVLZXkpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcml2YXRlS2V5LnRvX3ZpZXdfa2V5KCkudG9fc3RyaW5nKClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gXCJcIlxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogc3RyaW5nVG9GaWVsZFxyXG4gICAgICovXHJcbiAgICBhc3luYyBzdHJpbmdGaWxlZChpbnB1dDogc3RyaW5nLCBiaHB0eXBlOiBzdHJpbmcsIGRlc3RpbmF0aW9uX3R5cGU6IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RyaW5nRmlsZWQgc3RhcnRcIilcclxuICAgICAgICAgICAgbGV0IGFsZW8gPSBhd2FpdCBBbGVvV2FzbSgpXHJcbiAgICAgICAgICAgIGxldCBoaGggPSBhbGVvLmhhc2hCSFAoaW5wdXQsIGJocHR5cGUsIGRlc3RpbmF0aW9uX3R5cGUpXHJcbiAgICAgICAgICAgIHJldHVybiBoaGhcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwic3RyaW5nRmlsZWQgZXJyb3IgOjo6IFwiICsgZSlcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9XHJcblxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqICBiYXNlYTU4XHJcbiAgICAgKi9cclxuICAgIGFzeW5jIGJhc2U1OChpbnB1dDogc3RyaW5nLCBhY3Rpb246IHN0cmluZykge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKFwiYmFzZTU4IHN0YXJ0XCIpXHJcbiAgICAgICAgICAgIGxldCBhbGVvID0gYXdhaXQgQWxlb1dhc20oKVxyXG4gICAgICAgICAgICBsZXQgaGhoID0gYWxlby5iYXNlNTgoaW5wdXQsIGFjdGlvbilcclxuICAgICAgICAgICAgcmV0dXJuIGhoaFxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXNlNTggZXJyb3IgOjo6IFwiICsgZSlcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiAgam9pblxyXG4gICAgICovXHJcbiAgICBhc3luYyBqb2luUmVjb3Jkcyhwcml2YXRlX2tleTogUHJpdmF0ZUtleSwgcmVjb3JkXzE6IHN0cmluZywgcmVjb3JkXzI6IHN0cmluZywgZmVlX2NyZWRpdHM6IG51bWJlciwgZmVlX3JlY29yZDogc3RyaW5nKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXNlNTggc3RhcnRcIilcclxuICAgICAgICAgICAgbGV0IGFsZW8gPSBhd2FpdCBBbGVvV2FzbSgpXHJcbiAgICAgICAgICAgIGxldCBoaGggPSBiYXNlUHJvZ3JhbU1hbmFnZXIuam9pbihwcml2YXRlX2tleSwgYWxlby5SZWNvcmRQbGFpbnRleHQuZnJvbVN0cmluZyhyZWNvcmRfMSksIGFsZW8uUmVjb3JkUGxhaW50ZXh0LmZyb21TdHJpbmcocmVjb3JkXzIpLCBmZWVfY3JlZGl0cywgYWxlby5SZWNvcmRQbGFpbnRleHQuZnJvbVN0cmluZyhmZWVfcmVjb3JkKSwgQUxFT19QRUVSX1VSTCwgdHJ1ZSlcclxuICAgICAgICAgICAgcmV0dXJuIGhoaFxyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coXCJiYXNlNTggZXJyb3IgOjo6IFwiICsgZSlcclxuICAgICAgICAgICAgcmV0dXJuIFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgQWxlb1Rvb2xzOyIsImxldCByZWcgPSAvXlswLTldKy4/WzAtOV0qJC87XHJcbi8qKlxyXG4gKiDlrZfnrKbkuLLlpITnkIblt6XlhbdcclxuICovXHJcbmNvbnN0IFN0cmluZ1V0aWxzID0ge1xyXG4gICAgc3RyaW5nVG9VaW50OEFycmF5KHN0cjogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGFyciA9IFtdIGFzIGFueVtdO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsID0gc3RyLmxlbmd0aDsgaSA8IGw7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgaGV4ID0gTnVtYmVyKHN0ci5jaGFyQ29kZUF0KGkpKS50b1N0cmluZygxNik7XHJcbiAgICAgICAgICAgIGFyci5wdXNoKGhleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXcgVWludDhBcnJheShhcnIpO1xyXG4gICAgfSxcclxufVxyXG5leHBvcnQgZGVmYXVsdCBTdHJpbmdVdGlscyIsImltcG9ydCB7UmVjb3JkREJ9IGZyb20gXCIuLi9tb2RlbFwiO1xyXG5pbXBvcnQge0luZGV4REJUcmFuc2ZlckRhdGF9IGZyb20gXCIuLi9tb2RlbC9pbmRleERCXCI7XHJcblxyXG5pbnRlcmZhY2UgUmVjb3JkQWxsIHtcclxuICByZWNvcmQ6IHN0cmluZztcclxuICB0cmFuc2FjdGlvbl9pZDogc3RyaW5nO1xyXG4gIHNlcmlhbF9udW1iZXI6IHN0cmluZztcclxuICBzcGVudD86IGJvb2xlYW47XHJcbiAgZnVuY3Rpb25fbmFtZTogc3RyaW5nO1xyXG4gIG91dHB1dF9pbmRleDogbnVtYmVyO1xyXG4gIHRpbWVzdGFtcDogbnVtYmVyO1xyXG4gIGlucHV0OiBzdHJpbmc7XHJcbiAgZmVlOiBudW1iZXJcclxufVxyXG5cclxuZXhwb3J0IGVudW0gU3RvcmUge1xyXG4gIEFMRU9TWU5DX1NUT1JFX05BTUUgPSAnc3luYycsXHJcbiAgQUxFT1JFQ09SRF9TVE9SRV9OQU1FID0gJ3JlY29yZCcsXHJcbiAgVFJBTlNBQ1RJT05fU1RPUkVfTkFNRSA9ICd0cmFuc2FjdGlvbnMnLFxyXG4gIEVYRUNVVEVfU1RPUkVfTkFNRSA9ICdleGVjdXRlcydcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE15REIge1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IERCX05BTUUgPSAnTXlEQic7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgcmVhZG9ubHkgQUxFT1NZTkNfU1RPUkVfTkFNRSA9ICdzeW5jJztcclxuICBwcml2YXRlIHN0YXRpYyByZWFkb25seSBBTEVPUkVDT1JEX1NUT1JFX05BTUUgPSAncmVjb3JkJ1xyXG4gIHByaXZhdGUgc3RhdGljIHJlYWRvbmx5IFRSQU5TQUNUSU9OX1NUT1JFX05BTUUgPSAndHJhbnNhY3Rpb25zJ1xyXG5cclxuICBwcml2YXRlIGRiITogSURCRGF0YWJhc2U7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gIH1cclxuICAvLyBUT0RPIOS9v+eUqGFlc+WKoOWvhiBwcml2YWtleeWKoOWvhlxyXG4gIC8vIOaJk+W8gOaVsOaNruW6k+i/nuaOpVxyXG4gIHB1YmxpYyBhc3luYyBvcGVuKCk6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgbGV0IHJlcXVlc3QgPSBpbmRleGVkREIub3BlbihNeURCLkRCX05BTUUsIDEpO1xyXG5cclxuICAgICAgcmVxdWVzdC5vbmVycm9yID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ29wZW4gZGIgZmlsZWQnKTtcclxuICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICB9O1xyXG5cclxuICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgdGhpcy5kYiA9IChldmVudC50YXJnZXQgYXMgSURCT3BlbkRCUmVxdWVzdCkucmVzdWx0O1xyXG4gICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIOWIm+W7ui/lvZPmlbDmja7lupPniYjmnKzkuI3kuIDoh7Tml7bop6blj5Hor6Xkuovku7bvvIzlj6/ku6XlnKjmraTlpITmm7TmlrDmlbDmja7lupPnu5PmnoRcclxuICAgICAgcmVxdWVzdC5vbnVwZ3JhZGVuZWVkZWQgPSAoZXZlbnQ6IElEQlZlcnNpb25DaGFuZ2VFdmVudCkgPT4ge1xyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCfmlbDmja7lupPniYjmnKzmm7TmlrAnKTtcclxuICAgICAgICAvLyB0b2RvIOWIpOaWreihqOaYr+WQpuW3sue7j+WIm+W7ulxyXG4gICAgICAgIGxldCBkYiA9IChldmVudC50YXJnZXQgYXMgSURCT3BlbkRCUmVxdWVzdCkucmVzdWx0O1xyXG4gICAgICAgIGxldCBzeW5jU3RvcmUgPSBkYi5jcmVhdGVPYmplY3RTdG9yZShNeURCLkFMRU9SRUNPUkRfU1RPUkVfTkFNRSwgIHsga2V5UGF0aDogJ3JlY29yZCd9KTtcclxuICAgICAgICAvLyDmt7vliqDntKLlvJXvvIzku6Xkvr/moLnmja7lkI3np7Dov5vooYzmlbDmja7mo4DntKJcclxuICAgICAgICBzeW5jU3RvcmUuY3JlYXRlSW5kZXgoJ2FkZHJlc3MnLCAnYWRkcmVzcycsIHsgdW5pcXVlOiBmYWxzZSB9KTtcclxuICAgICAgICBzeW5jU3RvcmUuY3JlYXRlSW5kZXgoJ3Byb2dyYW1faWQnLCAncHJvZ3JhbV9pZCcpO1xyXG5cclxuICAgICAgICAvLyDliJvlu7rnrKzkuozkuKrlr7nosaHlrZjlgqhcclxuICAgICAgICAvLyBUT0RPIOWwhmtleXBhdGjmm7/mjaLmiJBhZGRyZXNzXHJcbiAgICAgICAgbGV0IHJlY29yZFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoTXlEQi5BTEVPU1lOQ19TVE9SRV9OQU1FLCB7IGtleVBhdGg6ICdpZCcsIGF1dG9JbmNyZW1lbnQ6IHRydWUgfSk7XHJcbiAgICAgICAgcmVjb3JkU3RvcmUuY3JlYXRlSW5kZXgoJ2FkZHJlc3MnLCAnYWRkcmVzcycsIHsgdW5pcXVlOiB0cnVlIH0pO1xyXG5cclxuICAgICAgICAgIC8vIOWIm+W7uuiuouWNleiusOW9leWtmOWCqOWvueixoVxyXG4gICAgICAgICAgbGV0IG9iamVjdFN0b3JlID0gZGIuY3JlYXRlT2JqZWN0U3RvcmUoTXlEQi5UUkFOU0FDVElPTl9TVE9SRV9OQU1FLCB7a2V5UGF0aDogJ2lkJ30pO1xyXG4gICAgICAgICAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoJ3R5cGUnLCAndHlwZScpO1xyXG4gICAgICAgICAgb2JqZWN0U3RvcmUuY3JlYXRlSW5kZXgoJ3RyYW5zZmVyU3RhdHVzJywgJ3RyYW5zZmVyU3RhdHVzJyk7XHJcbiAgICAgICAgICBvYmplY3RTdG9yZS5jcmVhdGVJbmRleCgnYWRkcmVzcycsICdhZGRyZXNzJyk7XHJcbiAgICAgIH07XHJcbiAgICB9KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIOWcqOaMh+WumnN0b3Jl5Lit5re75Yqg5pWw5o2uXHJcbiAgICogQHBhcmFtIHN0b3JlTmFtZSDlr7nosaHku5PlupNcclxuICAgKiBAcGFyYW0gZGF0YSDmt7vliqDnmoTmlbDmja5cclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIC8vIFRPRE8g5pu/5o2i5oiQcHV05rWL6K+VXHJcbiAgcHVibGljIGFzeW5jIGFkZERhdGEoc3RvcmVOYW1lOiBzdHJpbmcsIGRhdGE6IGFueSk6IFByb21pc2U8bnVtYmVyPiB7XHJcbiAgICBsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xyXG4gICAgbGV0IG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyDmt7vliqDmlbDmja5cclxuICAgICAgbGV0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5hZGQoZGF0YSk7XHJcblxyXG4gICAgICAvLyDmt7vliqDmiJDlip/lkI7ov5Tlm57mlbDmja5pZFxyXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICByZXNvbHZlKChldmVudC50YXJnZXQgYXMgSURCUmVxdWVzdCkucmVzdWx0KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ2FkZCBkYXRhIGZpbGVkJyk7XHJcbiAgICAgICAgICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAvKipcclxuICAgKiDmt7vliqDmlbDmja7mlbDmja7ooajlhoVcclxuICAgKiBAcmV0dXJuc1xyXG4gICAqL1xyXG4gIHB1YmxpYyBhc3luYyBhZGREYXRhVG9TdG9yZShzdG9yZU5hbWU6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTxib29sZWFuPiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xyXG4gICAgICBsZXQgb2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG4gICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIC8vIOa3u+WKoOaVsOaNrlxyXG4gICAgICAgIGxldCByZXF1ZXN0ID0gb2JqZWN0U3RvcmUuYWRkKGRhdGEpO1xyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICByZWplY3QoZmFsc2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxuXHJcbiAgfVxyXG5cclxuXHJcbiAgLy8g5qC55o2uaWTojrflj5bmjIflrprmlbDmja5cclxuICBwdWJsaWMgYXN5bmMgZ2V0QnlJZChpZDogbnVtYmVyLCBzdG9yZU5hbWU6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICBsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWRvbmx5Jyk7XHJcbiAgICBsZXQgb2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG5cclxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgICAvLyDmoLnmja5pZOiOt+WPluaVsOaNrlxyXG4gICAgICBsZXQgcmVxdWVzdCA9IG9iamVjdFN0b3JlLmdldChpZCk7XHJcblxyXG4gICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICByZXNvbHZlKChldmVudC50YXJnZXQgYXMgSURCUmVxdWVzdCkucmVzdWx0KTtcclxuICAgICAgfTtcclxuXHJcbiAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmVycm9yKCfojrflj5bmlbDmja7lpLHotKUnKTtcclxuICAgICAgICByZWplY3QoZXZlbnQpO1xyXG4gICAgICB9O1xyXG4gICAgfSk7XHJcbiAgfVxyXG5cclxuICAvLyDmm7TmlrDmjIflrprmlbDmja5cclxuICBwdWJsaWMgYXN5bmMgdXBkYXRlKHN0b3JlTmFtZTogc3RyaW5nLCBrZXk6IHN0cmluZywgZGF0YTogYW55KTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xyXG4gICAgbGV0IG9iamVjdFN0b3JlID0gdHJhbnNhY3Rpb24ub2JqZWN0U3RvcmUoc3RvcmVOYW1lKTtcclxuXHJcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAvLyDojrflj5bmjIflrpprZXnlr7nlupTnmoTmlbDmja7orrDlvZVcclxuICAgICAgLy8gdmFyIGdldFJlcXVlc3QgPSBvYmplY3RTdG9yZS5nZXQoa2V5KTtcclxuICAgICAgdmFyIGluZGV4ID0gb2JqZWN0U3RvcmUuaW5kZXgoXCJhZGRyZXNzXCIpO1xyXG5cclxuICAgICAgaW5kZXguZ2V0KGtleSkub25lcnJvciA9IChldmVudDogYW55KSA9PiB7XHJcbiAgICAgICAgLy8gY29uc29sZS5lcnJvcign5pu05paw5pe26I635Y+W5pWw5o2u5aSx6LSlJyk7XHJcbiAgICAgIH1cclxuICAgICAgaW5kZXguZ2V0KGtleSkub25zdWNjZXNzID0gKGV2ZW50OiBhbnkpID0+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gZXZlbnQudGFyZ2V0LnJlc3VsdDtcclxuICAgICAgICByZXN1bHQuZW5kSGVpZ2h0ID0gZGF0YTtcclxuICAgICAgICAvLyDmiormm7TmlrDov4fnmoTmlbDmja7mlL7ov5vmlbDmja7lupNcclxuICAgICAgICBsZXQgcmVxdWVzdCA9IG9iamVjdFN0b3JlLnB1dChyZXN1bHQpO1xyXG4gICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgICAgcmVzb2x2ZSgpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIHJlcXVlc3Qub25lcnJvciA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICAgIC8vIGNvbnNvbGUuZXJyb3IoJ+abtOaWsOaVsOaNruWksei0pScpO1xyXG4gICAgICAgICAgcmVqZWN0KGV2ZW50KTtcclxuICAgICAgICB9O1xyXG5cclxuXHJcbiAgICAgICAgICAgIH07XHJcblxyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyDmoLnmja5pZOWIoOmZpOaMh+WumuaVsOaNrlxyXG4gICAgcHVibGljIGFzeW5jIGRlbGV0ZUJ5SWQoaWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xyXG4gICAgICAgIGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24oTXlEQi5BTEVPUkVDT1JEX1NUT1JFX05BTUUsICdyZWFkd3JpdGUnKTtcclxuICAgICAgICBsZXQgb2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShNeURCLkFMRU9SRUNPUkRfU1RPUkVfTkFNRSk7XHJcblxyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAvLyDliKDpmaTmlbDmja5cclxuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5kZWxldGUoaWQpO1xyXG5cclxuICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCfliKDpmaTmlbDmja7lpLHotKUnKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8g5qC55o2uYWRkcmVzc+afpeivouaVsOaNrlxyXG4gICAgcHVibGljIGFzeW5jIGdldEJ5TmFtZShzdG9yZU5hbWU6IHN0cmluZywgbmFtZTogc3RyaW5nKTogUHJvbWlzZTxhbnk+IHtcclxuICAgICAgICAvLyBjb25zb2xlLmxvZygn5p+l6K+i5pWw5o2u5LitJyk7XHJcbiAgICAgICAgbGV0IHRyYW5zYWN0aW9uID0gdGhpcy5kYi50cmFuc2FjdGlvbihzdG9yZU5hbWUsICdyZWFkb25seScpO1xyXG4gICAgICAgIGxldCBvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgbGV0IGluZGV4ID0gb2JqZWN0U3RvcmUuaW5kZXgoJ2FkZHJlc3MnKTtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8g5qC55o2u57Si5byV5p+l6K+i5pWw5o2u77yM5Y+v5Lul5L2/55Sob3BlbkN1cnNvcuaIlm9wZW5LZXlDdXJzb3Lmlrnms5VcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBpbmRleC5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkobmFtZSkpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlc3VsdDogUmVjb3JkREJbXSA9IFtdO1xyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uc3VjY2VzcyA9IChldmVudDogRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBjdXJzb3IgPSAoZXZlbnQudGFyZ2V0IGFzIElEQlJlcXVlc3QpLnJlc3VsdDtcclxuICAgICAgICAgICAgICAgIGlmIChjdXJzb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjdXJzb3IudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGN1cnNvci5jb250aW51ZSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSAoZXZlbnQ6IEV2ZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmVycm9yKCfmn6Xor6LmlbDmja7lpLHotKUnKTtcclxuICAgICAgICAgICAgICAgIHJlamVjdChldmVudCk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmn6Xor6LmiYDmnInnmoTkuqTmmJPorrDlvZVcclxuICAgICAqIEBwYXJhbSBzdG9yZU5hbWUg6KGo5ZCNXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyBnZXRBbGxUcmFuc2ZlckRhdGEoc3RvcmVOYW1lOiBzdHJpbmcpOiBQcm9taXNlPEluZGV4REJUcmFuc2ZlckRhdGFbXT4ge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XHJcbiAgICAgICAgICAgIGxldCB0cmFuc2FjdGlvbiA9IHRoaXMuZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZHdyaXRlJyk7XHJcbiAgICAgICAgICAgIGxldCBvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgICAgIHZhciByZXF1ZXN0ID0gb2JqZWN0U3RvcmUuZ2V0QWxsKClcclxuICAgICAgICAgICAgcmVxdWVzdC5vbnN1Y2Nlc3MgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUocmVxdWVzdC5yZXN1bHQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIOaVsOaNruiOt+WPluWksei0pVxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHJlamVjdChldmVudClcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmm7TmlrDmlbDmja7lupPooajlhoXmlbDmja5cclxuICAgICAqIEBwYXJhbSBzdG9yZU5hbWVcclxuICAgICAqIEBwYXJhbSBkYXRhXHJcbiAgICAgKi9cclxuICAgIHB1YmxpYyBhc3luYyB1cGRhdGVEYXRhKHN0b3JlTmFtZTogc3RyaW5nLCBkYXRhOiBhbnkpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICBsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xyXG4gICAgICAgIGxldCBvYmplY3RTdG9yZSA9IHRyYW5zYWN0aW9uLm9iamVjdFN0b3JlKHN0b3JlTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcclxuICAgICAgICAgICAgbGV0IHJlcXVlc3QgPSBvYmplY3RTdG9yZS5wdXQoZGF0YSk7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZhbHNlKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja5JROafpeivouWNleS4quS6pOaYk+iusOW9lVxyXG4gICAgICogQHBhcmFtIHN0b3JlTmFtZSDooajlkI1cclxuICAgICAqIEBwYXJhbSBpZCBpZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZ2V0RGF0YUJ5SWQoc3RvcmVOYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBQcm9taXNlPEluZGV4REJUcmFuc2ZlckRhdGE+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0U3RvcmVSZXF1ZXN0ID0gb2JqZWN0U3RvcmUuZ2V0KGlkKVxyXG4gICAgICAgICAgICBvYmplY3RTdG9yZVJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKG9iamVjdFN0b3JlUmVxdWVzdC5yZXN1bHQpXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIC8vIOaVsOaNruiOt+WPluWksei0pVxyXG4gICAgICAgICAgICBvYmplY3RTdG9yZVJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgcmVqZWN0KGV2ZW50KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmoLnmja5JROWIoOmZpCDooajlhoXmn5DmnaHmlbDmja5cclxuICAgICAqIEBwYXJhbSBzdG9yZU5hbWVcclxuICAgICAqIEBwYXJhbSBpZFxyXG4gICAgICovXHJcbiAgICBwdWJsaWMgYXN5bmMgZGVsZXRlRGF0YUJ5SWQoc3RvcmVOYW1lOiBzdHJpbmcsIGlkOiBzdHJpbmcpOiBQcm9taXNlPGJvb2xlYW4+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgdHJhbnNhY3Rpb24gPSB0aGlzLmRiLnRyYW5zYWN0aW9uKHN0b3JlTmFtZSwgJ3JlYWR3cml0ZScpO1xyXG4gICAgICAgICAgICBsZXQgb2JqZWN0U3RvcmUgPSB0cmFuc2FjdGlvbi5vYmplY3RTdG9yZShzdG9yZU5hbWUpO1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IG9iamVjdFN0b3JlLmRlbGV0ZShpZCk7XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gZnVuY3Rpb24gKGV2ZW50KSB7XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKHRydWUpXHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICByZXF1ZXN0Lm9uZXJyb3IgPSBmdW5jdGlvbiAoZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoZmFsc2UpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBzZWFyY2ggZGF0YSBieSBpbmRleFxyXG4gICAgICogQHBhcmFtIHN0b3JlTmFtZSB0YWJsZSBuYW1lXHJcbiAgICAgKiBAcGFyYW0gaW5kZXhLZXkg57Si5byV5ZCN56ewXHJcbiAgICAgKiBAcGFyYW0gaW5kZXhWYWx1ZSDntKLlvJXnmoTlgLxcclxuICAgICAqL1xyXG4gICAgcHVibGljIGFzeW5jIHNlYXJjaERiRGF0YUJ5SW5kZXgoc3RvcmVOYW1lOiBzdHJpbmcsIGluZGV4S2V5OiBzdHJpbmcsIGluZGV4VmFsdWU6IHN0cmluZyk6IFByb21pc2U8YW55W10+IHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBsZXQgcmVxdWVzdCA9IHRoaXMuZGIudHJhbnNhY3Rpb24oc3RvcmVOYW1lLCAncmVhZG9ubHknKS5vYmplY3RTdG9yZShzdG9yZU5hbWUpLmluZGV4KGluZGV4S2V5KS5vcGVuQ3Vyc29yKElEQktleVJhbmdlLm9ubHkoaW5kZXhWYWx1ZSkpO1xyXG4gICAgICAgICAgICBsZXQgZGF0YUFycmF5ID0gW10gYXMgYW55W107XHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25zdWNjZXNzID0gKGV2ZW50OiBFdmVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IGN1cnNvciA9IChldmVudC50YXJnZXQgYXMgSURCUmVxdWVzdCkucmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnNvcikge1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFBcnJheS5wdXNoKGN1cnNvci52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgY3Vyc29yLmNvbnRpbnVlKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoZGF0YUFycmF5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHJlcXVlc3Qub25lcnJvciA9IGZ1bmN0aW9uIChldmVudCkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShbXSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbn1cclxuIiwiaW1wb3J0IHtBY3Rpdml0eUxpc3QsIEV4ZVByb2dyYW1EYXRhLCBRdWVyeVByb2dyYW1SZWNvcmQsIFJlY29yZEFsbCwgUmVjb3JkREJ9IGZyb20gXCIuLi9tb2RlbFwiO1xyXG5pbXBvcnQge3F1ZXJ5RmVlQnlUcmFuc2FjdGlvbnNJRH0gZnJvbSBcIi4uL2FwaS9yZXF1ZXN0QXBpXCI7XHJcbmltcG9ydCB7aXNSZWNvcmRVc2VkfSBmcm9tIFwiLi4vYXBpL3JlY29yZFwiO1xyXG5pbXBvcnQge015REIsIFN0b3JlfSBmcm9tIFwiLi9teURhdGFCYXNlXCI7XHJcbmltcG9ydCB7VHJhbnNhY3Rpb25UeXBlfSBmcm9tIFwiLi4vbW9kZWwvVHJhbnNmZXJUeXBlXCI7XHJcblxyXG4vKipcclxuICogcmVjb3Jkc+W3peWFt+exu1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IFJlY29yZHNVdGlscyA9IHtcclxuICAgIC8qKlxyXG4gICAgICog6I635Y+W5b2T5YmNcmVjb3Jkc+WIl+ihqFxyXG4gICAgICogQHBhcmFtIGN1cnJlbnRBY2NvdW50XHJcbiAgICAgKi8gYXN5bmMgZ2V0Q3VycmVudFJlY29yZHMoY3VycmVudEFkZHJlc3M6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBhdmFpbGFibGVSZWNvcmRzID0gW10gYXMgUmVjb3JkQWxsW107XHJcbiAgICAgICAgY29uc3QgcmVjb3JkQWxsID0gYXdhaXQgUmVjb3Jkc1V0aWxzLmdldERhdGFXaXRoT3BlbihTdG9yZS5BTEVPUkVDT1JEX1NUT1JFX05BTUUsIGN1cnJlbnRBZGRyZXNzKTtcclxuICAgICAgICBpZiAocmVjb3JkQWxsICYmIHJlY29yZEFsbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVjb3JkQWxsLmZvckVhY2goKHJlY29yZDogUmVjb3JkREIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVjb3JkLnNwZW50ICYmIHJlY29yZC5wcm9ncmFtX2lkID09PSBcImNyZWRpdHMuYWxlb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXZhaWxhYmxlUmVjb3Jkcy5wdXNoKHJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXZhaWxhYmxlUmVjb3JkcztcclxuICAgIH0sXHJcbiAgICBpc1RyYW5zZmVyRnVuY3Rpb24oZnVuY3Rpb25fbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uX25hbWUgPT09IFwidHJhbnNmZXJfcHJpdmF0ZVwiXHJcbiAgICB9LFxyXG4gICAgYXN5bmMgaGFuZGxlQWN0aXZpdHkoY3VycmVudEFkZHJlc3M6IHN0cmluZywgcmVjb3JkQWxsOiBSZWNvcmREQltdLCBhY3Rpdml0eUxpc3Q6IEFjdGl2aXR5TGlzdFtdKSB7XHJcbiAgICAgICAgaWYgKHJlY29yZEFsbCAmJiByZWNvcmRBbGwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWNvcmRBbGwpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpdGVtLmZ1bmN0aW9uX25hbWUgPT09IFwiZmVlXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgZXhlUHJvZ3JhbURhdGEgPSBhd2FpdCBSZWNvcmRzVXRpbHMuZ2V0VHJhbnNpdGlvbkRhdGEoaXRlbS50cmFuc2FjdGlvbl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGV4ZVByb2dyYW1EYXRhLnRpbWVzdGFtcCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImV4ZVByb2dyYW1EYXRhXCIsZXhlUHJvZ3JhbURhdGEpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleGVQcm9ncmFtRGF0YS50eXBlID09PSBcImRlcGxveVwiKSB7IC8vIGRlcGxveSBwcm9ncmFtXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aXZpdHkgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlOiBleGVQcm9ncmFtRGF0YS5mZWUgLyAxMDAwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogaXRlbS5vdXRwdXRfaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV4ZVByb2dyYW1EYXRhLmZ1bmN0aW9uTmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGl0ZW0udGltZXN0YW1wLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlkOiBpdGVtLnRyYW5zYWN0aW9uX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGl0ZW0udHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRGVwbG95ZWQgJHtleGVQcm9ncmFtRGF0YS5wcm9ncmFtfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlUeXBlOiBUcmFuc2FjdGlvblR5cGUuZGVwbG95XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGFzIEFjdGl2aXR5TGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5TGlzdC5wdXNoKGFjdGl2aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWU6IGV4ZVByb2dyYW1EYXRhLmZlZSAvIDEwMDAwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBpdGVtLm91dHB1dF9pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXhlUHJvZ3JhbURhdGEuZnVuY3Rpb25OYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogaXRlbS50aW1lc3RhbXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0udHJhbnNhY3Rpb25faWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogaXRlbS50eXBlLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBFeGVjdXRlZCAke2V4ZVByb2dyYW1EYXRhLmZ1bmN0aW9uTmFtZX0gb24gJHtleGVQcm9ncmFtRGF0YS5wcm9ncmFtfWAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlUeXBlOiBUcmFuc2FjdGlvblR5cGUuZXhlY3V0ZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBBY3Rpdml0eUxpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eUxpc3QucHVzaChhY3Rpdml0eSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjcmVkaXRzID0gdGhpcy5hbmFseXplQ3JlZGl0cyhpdGVtLnJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGFtb3VudCA9IGNyZWRpdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUcmFuc2ZlckZ1bmN0aW9uKGl0ZW0uZnVuY3Rpb25fbmFtZSkgJiYgaXRlbS5vdXRwdXRfaW5kZXggPT09IDEpIHsgLy8gIHNlbmQgdmFsdWVcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50ID0gYXdhaXQgUmVjb3Jkc1V0aWxzLmdldFNlbmRDcmVkaXRzKGN1cnJlbnRBZGRyZXNzLCBpdGVtLmlucHV0LCBjcmVkaXRzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZlZSA9IGF3YWl0IFJlY29yZHNVdGlscy5nZXRSZWNvcmRGZWUoaXRlbS50cmFuc2FjdGlvbl9pZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlZTogZmVlIC8gMTAwMDAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZDogaXRlbS5vdXRwdXRfaW5kZXgsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogYW1vdW50IC8gMTAwMDAwMCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogaXRlbS50aW1lc3RhbXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS50cmFuc2FjdGlvbl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGl0ZW0udHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBTZW5kICR7YW1vdW50IC8gMTAwMDAwMH0gQWxlb2AsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eVR5cGU6IFRyYW5zYWN0aW9uVHlwZS50cmFuc2ZlclxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGFzIEFjdGl2aXR5TGlzdDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlMaXN0LnB1c2goYWN0aXZpdHkpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1RyYW5zZmVyRnVuY3Rpb24oaXRlbS5mdW5jdGlvbl9uYW1lKSAmJiBpdGVtLm91dHB1dF9pbmRleCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWNlaXZlZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmVlID0gYXdhaXQgUmVjb3Jkc1V0aWxzLmdldFJlY29yZEZlZShpdGVtLnRyYW5zYWN0aW9uX2lkKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGl2aXR5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlOiBmZWUgLyAxMDAwMDAwLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBpdGVtLm91dHB1dF9pbmRleCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBhbW91bnQgIT09IC0xID8gYW1vdW50IC8gMTAwMDAwMCA6IGl0ZW0uZnVuY3Rpb25fbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogaXRlbS50aW1lc3RhbXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS50cmFuc2FjdGlvbl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGl0ZW0udHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBSZWNlaXZlZCAke2Ftb3VudCAvIDEwMDAwMDB9IEFsZW9gLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlUeXBlOiBUcmFuc2FjdGlvblR5cGUudHJhbnNmZXJcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBBY3Rpdml0eUxpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5TGlzdC5wdXNoKGFjdGl2aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gXCJleGVjdXRlXCIgJiYgaXRlbS5vdXRwdXRfaW5kZXggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGl2aXR5ID0ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlOiBpdGVtLmZlZSAvIDEwMDAwMDAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IGl0ZW0ub3V0cHV0X2luZGV4LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGl0ZW0uZnVuY3Rpb25fbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogaXRlbS50aW1lc3RhbXAsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZDogaXRlbS50cmFuc2FjdGlvbl9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IGl0ZW0udHlwZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IGBFeGVjdXRlZCAke2l0ZW0uZnVuY3Rpb25fbmFtZX0gb24gJHtpdGVtLnByb2dyYW1faWR9YCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5VHlwZTogVHJhbnNhY3Rpb25UeXBlLmV4ZWN1dGVcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBhcyBBY3Rpdml0eUxpc3Q7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5TGlzdC5wdXNoKGFjdGl2aXR5KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIHJlZnJlc2ggYWN0aXZpdHkgYW5kIGJhbGFuY2VcclxuICAgICAqL1xyXG4gICAgYXN5bmMgcmVmcmVzaEFjdGl2aXR5QW5kQmFsYW5jZShjdXJyZW50QWRkcmVzczogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGFjdGl2aXR5TGlzdCA9IFtdIGFzIEFjdGl2aXR5TGlzdFtdO1xyXG4gICAgICAgIGNvbnN0IHJlY29yZEFsbCA9IGF3YWl0IFJlY29yZHNVdGlscy5nZXREYXRhV2l0aE9wZW4oU3RvcmUuQUxFT1JFQ09SRF9TVE9SRV9OQU1FLCBjdXJyZW50QWRkcmVzcykgYXMgUmVjb3JkREJbXTtcclxuICAgICAgICBsZXQgYmFsYW5jZSA9IHRoaXMuY2FsY3VsYXRlQmFsYW5jZTEoY3VycmVudEFkZHJlc3MsIHJlY29yZEFsbClcclxuICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZUFjdGl2aXR5KGN1cnJlbnRBZGRyZXNzLHJlY29yZEFsbCxhY3Rpdml0eUxpc3QpXHJcbiAgICAgICAgLy8gaWYgKHJlY29yZEFsbCAmJiByZWNvcmRBbGwubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gICAgIGZvciAoY29uc3QgaXRlbSBvZiByZWNvcmRBbGwpIHtcclxuICAgICAgICAvLyAgICAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0uZnVuY3Rpb25fbmFtZSlcclxuICAgICAgICAvLyAgICAgICAgIGlmIChpdGVtLmZ1bmN0aW9uX25hbWUgIT09IFwiZmVlXCIpIHtcclxuICAgICAgICAvLyAgICAgICAgICAgICBsZXQgY3JlZGl0cyA9IHRoaXMuYW5hbHl6ZUNyZWRpdHMoaXRlbS5yZWNvcmQpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGxldCBhbW91bnQgPSBjcmVkaXRzO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGlmIChpdGVtLnR5cGUgPT09IFwidHJhbnNmZXJcIiAmJiBpdGVtLm91dHB1dF9pbmRleCA9PT0gMSkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAvLyBTZW5kIHZhbHVlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGFtb3VudCA9IGF3YWl0IFJlY29yZHNVdGlscy5nZXRTZW5kQ3JlZGl0cyhjdXJyZW50QWRkcmVzcywgaXRlbS5pbnB1dCwgY3JlZGl0cyk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eSA9IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZlZTogaXRlbS5mZWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IGl0ZW0ub3V0cHV0X2luZGV4LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGFtb3VudCAvIDEwMDAwMDAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGl0ZW0udGltZXN0YW1wLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0udHJhbnNhY3Rpb25faWQsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0eXBlOiBpdGVtLnR5cGUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgU2VuZCAke2Ftb3VudCAvIDEwMDAwMDB9IEFsZW9gLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgYWN0aXZpdHlUeXBlOiBUcmFuc2FjdGlvblR5cGUudHJhbnNmZXJcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgfSBhcyBBY3Rpdml0eUxpc3Q7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGFjdGl2aXR5TGlzdC5wdXNoKGFjdGl2aXR5KTtcclxuICAgICAgICAvLyAgICAgICAgICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gXCJ0cmFuc2ZlclwiICYmIGl0ZW0ub3V0cHV0X2luZGV4ID09PSAwKSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC8vIFJlY2VpdmVkXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGxldCBhY3Rpdml0eSA9IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZlZTogaXRlbS5mZWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IGl0ZW0ub3V0cHV0X2luZGV4LFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGFtb3VudCAhPT0gLTEgPyBhbW91bnQgLyAxMDAwMDAwIDogaXRlbS5mdW5jdGlvbl9uYW1lLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBpdGVtLnRpbWVzdGFtcCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGlkOiBpdGVtLnRyYW5zYWN0aW9uX2lkLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgdHlwZTogaXRlbS50eXBlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogYFJlY2VpdmVkICR7YW1vdW50IC8gMTAwMDAwMH0gQWxlb2AsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eVR5cGU6IFRyYW5zYWN0aW9uVHlwZS50cmFuc2ZlclxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9IGFzIEFjdGl2aXR5TGlzdDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgYWN0aXZpdHlMaXN0LnB1c2goYWN0aXZpdHkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBcImRlcGxveVwiKSB7IC8vIOaJp+ihjOaIluiAhWRlcGxveVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgYWN0aXZpdHkgPSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBmZWU6IGl0ZW0uZmVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBpdGVtLm91dHB1dF9pbmRleCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLmZ1bmN0aW9uX25hbWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGl0ZW0udGltZXN0YW1wLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0udHJhbnNhY3Rpb25faWQsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0eXBlOiBpdGVtLnR5cGUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRGVwbG95ZWQgJHtpdGVtLmZ1bmN0aW9uX25hbWV9YCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGFjdGl2aXR5VHlwZTogVHJhbnNhY3Rpb25UeXBlLmRlcGxveVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9IGFzIEFjdGl2aXR5TGlzdDtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgYWN0aXZpdHlMaXN0LnB1c2goYWN0aXZpdHkpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSBcImV4ZWN1dGVcIiAmJiBpdGVtLm91dHB1dF9pbmRleCA9PT0gMCkge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBsZXQgYWN0aXZpdHkgPSB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBmZWU6IGl0ZW0uZmVlLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBpdGVtLm91dHB1dF9pbmRleCxcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBpdGVtLmZ1bmN0aW9uX25hbWUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IGl0ZW0udGltZXN0YW1wLFxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgaWQ6IGl0ZW0udHJhbnNhY3Rpb25faWQsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICB0eXBlOiBpdGVtLnR5cGUsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBgRXhlY3V0ZWQgJHtpdGVtLmZ1bmN0aW9uX25hbWV9IG9uICR7aXRlbS5wcm9ncmFtX2lkfWAsXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgICAgICBhY3Rpdml0eVR5cGU6IFRyYW5zYWN0aW9uVHlwZS5leGVjdXRlXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0gYXMgQWN0aXZpdHlMaXN0O1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBhY3Rpdml0eUxpc3QucHVzaChhY3Rpdml0eSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgfVxyXG4gICAgICAgIC8vXHJcbiAgICAgICAgLy8gICAgICAgICB9XHJcbiAgICAgICAgLy8gICAgIH1cclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgaWYgKGFjdGl2aXR5TGlzdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGFjdGl2aXR5TGlzdC5zb3J0KChhOiBBY3Rpdml0eUxpc3QsIGI6IEFjdGl2aXR5TGlzdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGIudGltZXN0YW1wIC0gYS50aW1lc3RhbXA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge2FjdGl2aXR5TGlzdCwgYmFsYW5jZX07XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiBtYXAgcmVjb3Jkc1xyXG4gICAgICovXHJcbiAgICBhc3luYyBtYXBSZWNvcmQoZGF0YTogUmVjb3JkQWxsW10sIGFkZHJlc3M6IHN0cmluZykge1xyXG4gICAgICAgIGxldCBuZXdEYXRhID0gW10gYXMgUmVjb3JkQWxsW107XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBpdGVtID0gZGF0YVtpXTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0gJiYgaXRlbS5yZWNvcmQgJiYgaXRlbS5yZWNvcmQuaW5kZXhPZihhZGRyZXNzKSAhPSAtMSkgeyAvLyBjdXJyZW50IGFkZHJlc3MncyByZWNvcmRzXHJcbiAgICAgICAgICAgICAgICBuZXdEYXRhLnB1c2goe1xyXG4gICAgICAgICAgICAgICAgICAgIC4uLml0ZW0sXHJcbiAgICAgICAgICAgICAgICAgICAgc3BlbnQ6IGF3YWl0IGlzUmVjb3JkVXNlZChpdGVtLnNlcmlhbF9udW1iZXIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdEYXRhO1xyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIGNhbGN1bGF0ZSBiYWxhbmNlIHRvIGFsZW9cclxuICAgICAqL1xyXG4gICAgYXN5bmMgY2FsY3VsYXRlQmFsYW5jZShjdXJyZW50QWRkcmVzczogc3RyaW5nKSB7XHJcbiAgICAgICAgbGV0IGJhbGFuY2UgPSAwO1xyXG4gICAgICAgIGNvbnN0IHJlY29yZEFsbCA9IGF3YWl0IFJlY29yZHNVdGlscy5nZXREYXRhV2l0aE9wZW4oU3RvcmUuQUxFT1JFQ09SRF9TVE9SRV9OQU1FLCBjdXJyZW50QWRkcmVzcyk7XHJcbiAgICAgICAgaWYgKHJlY29yZEFsbCAmJiByZWNvcmRBbGwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlY29yZEFsbC5mb3JFYWNoKChyZWNvcmQ6IFJlY29yZERCKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXJlY29yZC5zcGVudCAmJiByZWNvcmQucHJvZ3JhbV9pZCA9PSBcImNyZWRpdHMuYWxlb1wiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYmFsYW5jZSArPSB0aGlzLmFuYWx5emVDcmVkaXRzKHJlY29yZC5yZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGJhbGFuY2UgLyAxMDAwMDAwO1xyXG4gICAgfSwgLyoqXHJcbiAgICAgKiBjYWxjdWxhdGUgYWRkcmVzcyBiYWxhbmNlIHRvIGFsZW9cclxuICAgICAqL1xyXG4gICAgY2FsY3VsYXRlQmFsYW5jZTEoY3VycmVudEFkZHJlc3M6IHN0cmluZywgcmVjb3JkQWxsOiBSZWNvcmREQltdKSB7XHJcbiAgICAgICAgbGV0IGJhbGFuY2UgPSAwO1xyXG4gICAgICAgIGlmIChyZWNvcmRBbGwgJiYgcmVjb3JkQWxsLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZWNvcmRBbGwuZm9yRWFjaCgocmVjb3JkOiBSZWNvcmREQikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFyZWNvcmQuc3BlbnQgJiYgcmVjb3JkLnByb2dyYW1faWQgPT0gXCJjcmVkaXRzLmFsZW9cIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGJhbGFuY2UgKz0gdGhpcy5hbmFseXplQ3JlZGl0cyhyZWNvcmQucmVjb3JkKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBiYWxhbmNlIC8gMTAwMDAwMDtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNYXhpbXVtIFVzYWJsZSBBbW91bnRcclxuICAgICAqL1xyXG4gICAgYXN5bmMgY2FsY3VsYXRlTWF4QmFsYW5jZShjdXJyZW50QWRkcmVzczogc3RyaW5nKSB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkQWxsID0gYXdhaXQgUmVjb3Jkc1V0aWxzLmdldERhdGFXaXRoT3BlbihTdG9yZS5BTEVPUkVDT1JEX1NUT1JFX05BTUUsIGN1cnJlbnRBZGRyZXNzKTtcclxuICAgICAgICBpZiAocmVjb3JkQWxsICYmIHJlY29yZEFsbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgdmFsdWVzID0gcmVjb3JkQWxsLm1hcCgoaXRlbTogUmVjb3JkREIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghaXRlbS5zcGVudCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmFuYWx5emVDcmVkaXRzKGl0ZW0ucmVjb3JkKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGNvbnN0IG1heCA9IE1hdGgubWF4KC4uLnZhbHVlcyk7XHJcbiAgICAgICAgICAgIHJldHVybiBtYXggPT0gMCA/IG1heCA6IG1heCAvIDEwMDAwMDBcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIDA7XHJcbiAgICB9LFxyXG4gICAgLyoqXHJcbiAgICAgKiDop6PmnpByZWNvcmTph5Hpop1cclxuICAgICAqIEBwYXJhbSByZWNvcmRcclxuICAgICAqL1xyXG4gICAgYW5hbHl6ZUNyZWRpdHMocmVjb3JkOiBzdHJpbmcpIHtcclxuICAgICAgICBsZXQgY3JlZGl0cyA9IDA7XHJcbiAgICAgICAgLy8g5L2/55So5q2j5YiZ6KGo6L6+5byP5o+Q5Y+W6ZSu5YC85a+5XHJcbiAgICAgICAgY29uc3QgcmVnZXggPSAvKFxcdyspOlxccyooW1xcd1xcLl0rKS9nO1xyXG4gICAgICAgIGNvbnN0IG1hdGNoZXMgPSByZWNvcmQubWF0Y2hBbGwocmVnZXgpO1xyXG4gICAgICAgIC8vIOWwhumUruWAvOWvuei9rOaNouS4uuWvueixoVxyXG4gICAgICAgIGNvbnN0IG9iajogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHt9O1xyXG4gICAgICAgIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xyXG4gICAgICAgICAgICBvYmpbbWF0Y2hbMV1dID0gbWF0Y2hbMl07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNyZWRpdHMgPSB0aGlzLnN0cmluZ1RvQ3JlZGl0cyhvYmoubWljcm9jcmVkaXRzKTtcclxuICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY3JlZGl0cztcclxuICAgIH0sXHJcblxyXG4gICAgc3RyaW5nVG9DcmVkaXRzKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gTnVtYmVyKHZhbHVlLnNwbGl0KFwidVwiKVswXSk7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5Yik5pat5pyJ5pWIcmVjb3Jkc+aVsOmHj1xyXG4gICAgICogQHBhcmFtIGN1cnJlbnRBZGRyZXNzXHJcbiAgICAgKiBAcGFyYW0gbWluU2l6ZVxyXG4gICAgICovXHJcbiAgICBhc3luYyBjaGVja1JlY29yZHMoY3VycmVudEFkZHJlc3M6IHN0cmluZywgbWluU2l6ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkQWxsID0gYXdhaXQgUmVjb3Jkc1V0aWxzLmdldERhdGFXaXRoT3BlbihTdG9yZS5BTEVPUkVDT1JEX1NUT1JFX05BTUUsIGN1cnJlbnRBZGRyZXNzKTtcclxuICAgICAgICBsZXQgc3BlbmRTaXplID0gMFxyXG4gICAgICAgIHJlY29yZEFsbCAmJiByZWNvcmRBbGwuZm9yRWFjaCgocmVjb3JkOiBSZWNvcmREQiwgaW5kZXg6IG51bWJlcikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXJlY29yZC5zcGVudCkge1xyXG4gICAgICAgICAgICAgICAgc3BlbmRTaXplKytcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiBzcGVuZFNpemUgPj0gbWluU2l6ZVxyXG4gICAgfSxcclxuXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlui9rOi0pumcgOimgeeUqOeahHJlY29yZFxyXG4gICAgICogQHBhcmFtIGFtb3VudCDovazotKbph5Hpop1cclxuICAgICAqIEBwYXJhbSBnYXMgZ2Fz6YeR6aKdXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIG9idGFpblRyYW5zZmVyUmVjb3JkKGN1cnJlbnRBZGRyZXNzOiBzdHJpbmcsIGFtb3VudDogbnVtYmVyLCBnYXM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBhbW91bnRSZWNvcmQgPSB7fSBhcyBSZWNvcmREQjtcclxuICAgICAgICBsZXQgZ2FzUmVjb3JkID0ge30gYXMgUmVjb3JkREI7XHJcbiAgICAgICAgLy8gY29uc29sZS5sb2coXCJvYnRhaW5UcmFuc2ZlclJlY29yZFwiKVxyXG4gICAgICAgIGNvbnN0IHJlY29yZEFsbCA9IGF3YWl0IFJlY29yZHNVdGlscy5nZXREYXRhV2l0aE9wZW4oU3RvcmUuQUxFT1JFQ09SRF9TVE9SRV9OQU1FLCBjdXJyZW50QWRkcmVzcyk7XHJcbiAgICAgICAgaWYgKHJlY29yZEFsbCAmJiByZWNvcmRBbGwubGVuZ3RoID49IDIpIHtcclxuICAgICAgICAgICAgcmVjb3JkQWxsLmZvckVhY2goKHJlY29yZDogUmVjb3JkREIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVjb3JkLnNwZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNyZWRpdHMgPSB0aGlzLmFuYWx5emVDcmVkaXRzKHJlY29yZC5yZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjcmVkaXRzID49IGFtb3VudCAqIDEwMDAwMDAgJiYgIWFtb3VudFJlY29yZC5yZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYW1vdW50UmVjb3JkID0gcmVjb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoY3JlZGl0cyA+PSBnYXMgKiAxMDAwMDAwICYmICFnYXNSZWNvcmQucmVjb3JkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdhc1JlY29yZCA9IHJlY29yZDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4ge2Ftb3VudFJlY29yZCwgZ2FzUmVjb3JkfTtcclxuICAgIH0sXHJcbiAgICAvKipcclxuICAgICAqIOiOt+WPlmdhc+S9v+eUqOeahHJlY29yZFxyXG4gICAgICogQHBhcmFtIGN1cnJlbnRBY2NvdW50XHJcbiAgICAgKiBAcGFyYW0gZ2FzXHJcbiAgICAgKi9cclxuICAgIGFzeW5jIG9idGFpbkV4ZWN1dGVSZWNvcmQoY3VycmVudEFkZHJlc3M6IHN0cmluZywgZ2FzOiBudW1iZXIpIHtcclxuICAgICAgICBsZXQgZ2FzUmVjb3JkID0ge30gYXMgUmVjb3JkREI7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkQWxsID0gYXdhaXQgUmVjb3Jkc1V0aWxzLmdldERhdGFXaXRoT3BlbihTdG9yZS5BTEVPUkVDT1JEX1NUT1JFX05BTUUsIGN1cnJlbnRBZGRyZXNzKTtcclxuICAgICAgICBpZiAocmVjb3JkQWxsICYmIHJlY29yZEFsbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVjb3JkQWxsLmZvckVhY2goKHJlY29yZDogUmVjb3JkREIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghcmVjb3JkLnNwZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNyZWRpdHMgPSB0aGlzLmFuYWx5emVDcmVkaXRzKHJlY29yZC5yZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjcmVkaXRzID49IGdhcyAqIDEwMDAwMDAgJiYgIWdhc1JlY29yZC5yZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FzUmVjb3JkID0gcmVjb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYXNSZWNvcmQ7XHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IGpvaW4gZ2FzIHJlY29yZFxyXG4gICAgICovXHJcbiAgICBhc3luYyBvYnRhaW5Kb2luUmVjb3JkKGN1cnJlbnRBZGRyZXNzOiBzdHJpbmcsIGdhczogbnVtYmVyLCBqb2luczogc3RyaW5nW10pIHtcclxuICAgICAgICBsZXQgZ2FzUmVjb3JkID0ge30gYXMgUmVjb3JkREI7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkQWxsID0gYXdhaXQgUmVjb3Jkc1V0aWxzLmdldERhdGFXaXRoT3BlbihTdG9yZS5BTEVPUkVDT1JEX1NUT1JFX05BTUUsIGN1cnJlbnRBZGRyZXNzKTtcclxuICAgICAgICBpZiAocmVjb3JkQWxsICYmIHJlY29yZEFsbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVjb3JkQWxsLmZvckVhY2goKHJlY29yZDogUmVjb3JkREIsIGluZGV4OiBudW1iZXIpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBmaW5kID0gam9pbnMuZmluZCgoaXRlbSkgPT4gaXRlbSA9PT0gcmVjb3JkLnJlY29yZClcclxuICAgICAgICAgICAgICAgIGlmICghcmVjb3JkLnNwZW50ICYmICFmaW5kKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGNyZWRpdHMgPSB0aGlzLmFuYWx5emVDcmVkaXRzKHJlY29yZC5yZWNvcmQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjcmVkaXRzID49IGdhcyAqIDEwMDAwMDAgJiYgIWdhc1JlY29yZC5yZWNvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2FzUmVjb3JkID0gcmVjb3JkO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBnYXNSZWNvcmQ7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIGZpbmRSZWNvcmREQmRCeVJlY29yZChyZWNvcmQ6IHN0cmluZywgY3VycmVudEFkZHJlc3M6IHN0cmluZykge1xyXG4gICAgICAgIGNvbnN0IHJlY29yZEFsbCA9IGF3YWl0IFJlY29yZHNVdGlscy5nZXREYXRhV2l0aE9wZW4oU3RvcmUuQUxFT1JFQ09SRF9TVE9SRV9OQU1FLCBjdXJyZW50QWRkcmVzcyk7XHJcbiAgICAgICAgaWYgKHJlY29yZEFsbCkge1xyXG4gICAgICAgICAgICBsZXQgZmluZCA9IHJlY29yZEFsbC5maW5kKChpdGVtOiBSZWNvcmREQikgPT4gaXRlbS5yZWNvcmQgPT09IHJlY29yZClcclxuICAgICAgICAgICAgaWYgKGZpbmQpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBmaW5kXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHt9IGFzIFJlY29yZERCXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICog5qC55o2u5Lqk5piT6K6w5b2V6I635Y+WZ2Fz6LS555SoXHJcbiAgICAgKiBAcGFyYW0gdHJhbnNhY3Rpb25JZFxyXG4gICAgICovXHJcbiAgICBnZXRSZWNvcmRGZWUodHJhbnNhY3Rpb25JZDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPG51bWJlcj4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGZlZSA9IDA7XHJcbiAgICAgICAgICAgICAgICBsZXQgcmVxID0gYXdhaXQgcXVlcnlGZWVCeVRyYW5zYWN0aW9uc0lEKHRyYW5zYWN0aW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcSAmJiByZXEuZmVlcyAmJiByZXEuZmVlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxLmZlZXMuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0udHJhbnNhY3Rpb24gPT09IHRyYW5zYWN0aW9uSWQgJiYgaXRlbS50cmFuc2l0aW9uLmlucHV0cyAmJiBpdGVtLnRyYW5zaXRpb24uaW5wdXRzLmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZlZSA9IHRoaXMuc3RyaW5nVG9DcmVkaXRzKGl0ZW0udHJhbnNpdGlvbi5pbnB1dHNbMV0udmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXNvbHZlKGZlZSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIHJlc29sdmUoMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiDmn6Xor6IgVHJhbnNpdGlvbiDlr7nosaFcclxuICAgICAqIEBwYXJhbSB0cmFuc2FjdGlvbklkXHJcbiAgICAgKi9cclxuICAgIGdldFRyYW5zaXRpb25EYXRhKHRyYW5zYWN0aW9uSWQ6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTxFeGVQcm9ncmFtRGF0YT4oYXN5bmMgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7fSBhcyBFeGVQcm9ncmFtRGF0YTtcclxuICAgICAgICAgICAgICAgIGxldCBmZWUgPSAwO1xyXG4gICAgICAgICAgICAgICAgbGV0IHJlcSA9IGF3YWl0IHF1ZXJ5RmVlQnlUcmFuc2FjdGlvbnNJRCh0cmFuc2FjdGlvbklkKTtcclxuICAgICAgICAgICAgICAgIGlmIChyZXEgJiYgcmVxLmZlZXMgJiYgcmVxLmZlZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcS5mZWVzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLnRyYW5zYWN0aW9uID09PSB0cmFuc2FjdGlvbklkICYmICF0aGlzLmlzVHJhbnNmZXJGdW5jdGlvbihpdGVtLnRyYW5zaXRpb24uZnVuY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS50cmFuc2l0aW9uLmlucHV0cy5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmVlID0gdGhpcy5zdHJpbmdUb0NyZWRpdHMoaXRlbS50cmFuc2l0aW9uLmlucHV0c1sxXS52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNUcmFuc2ZlckZ1bmN0aW9uKGl0ZW0uZnVuY3Rpb24pKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YSA9IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNhY3Rpb25JZDogaXRlbS50cmFuc2FjdGlvbixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBpdGVtLnRpbWVzdGFtcCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbklkOiBpdGVtLnRyYW5zaXRpb24uaWQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW06IGl0ZW0ucHJvZ3JhbSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb25OYW1lOiBpdGVtLmZ1bmN0aW9uLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmZWU6IGZlZSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogaXRlbS50eXBlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSh7fSBhcyBFeGVQcm9ncmFtRGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBxdWVyeSByZWNvcmRzIGJ5IHByb2dyYW1JRFxyXG4gICAgICogQHBhcmFtIHByb2dyYW1JZFxyXG4gICAgICogQHBhcmFtIGFsbCB3aGV0aGVyIHF1ZXJ5IGFsbFxyXG4gICAgICovXHJcbiAgICBhc3luYyBxdWVyeVJlY29yZHNCeVByb2dyYW1JZChwcm9ncmFtSWQ6IHN0cmluZywgY3VycmVudEFkZHJlc3M6IHN0cmluZywgYWxsPzogYm9vbGVhbikge1xyXG4gICAgICAgIGxldCBxdWVyeVJlY29yZHMgPSBbXSBhcyBRdWVyeVByb2dyYW1SZWNvcmRbXVxyXG4gICAgICAgIGNvbnN0IHJlY29yZEFsbCA9IGF3YWl0IFJlY29yZHNVdGlscy5nZXREYXRhV2l0aE9wZW4oU3RvcmUuQUxFT1JFQ09SRF9TVE9SRV9OQU1FLCBjdXJyZW50QWRkcmVzcyk7XHJcbiAgICAgICAgaWYgKHJlY29yZEFsbCAmJiByZWNvcmRBbGwubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlY29yZEFsbC5mb3JFYWNoKChpdGVtOiBSZWNvcmREQikgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGl0ZW0ucHJvZ3JhbV9pZCA9PT0gcHJvZ3JhbUlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFsbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBxdWVyeVJlY29yZHMucHVzaCh7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhZGRyZXNzOiBpdGVtLmFkZHJlc3MsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmFtSUQ6IGl0ZW0ucHJvZ3JhbV9pZCxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlY29yZDogaXRlbS5yZWNvcmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCFpdGVtLnNwZW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHF1ZXJ5UmVjb3Jkcy5wdXNoKHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFkZHJlc3M6IGl0ZW0uYWRkcmVzcyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyYW1JRDogaXRlbS5wcm9ncmFtX2lkLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVjb3JkOiBpdGVtLnJlY29yZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHF1ZXJ5UmVjb3JkcylcclxuICAgICAgICByZXR1cm4gcXVlcnlSZWNvcmRzXHJcbiAgICB9LFxyXG5cclxuICAgIC8qKlxyXG4gICAgICogZ2V0IHNlbmQgQ3JlZGl0c1xyXG4gICAgICovXHJcbiAgICBhc3luYyBnZXRTZW5kQ3JlZGl0cyhjdXJyZW50QWRkcmVzczogc3RyaW5nLCBpbnB1dDogc3RyaW5nW10sIGNyZWRpdHM6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBzZW5kQ3JlZGl0cyA9IDA7XHJcbiAgICAgICAgY29uc3QgcmVjb3JkQWxsID0gYXdhaXQgUmVjb3Jkc1V0aWxzLmdldERhdGFXaXRoT3BlbihTdG9yZS5BTEVPUkVDT1JEX1NUT1JFX05BTUUsIGN1cnJlbnRBZGRyZXNzKTtcclxuICAgICAgICBpZiAocmVjb3JkQWxsICYmIHJlY29yZEFsbC5sZW5ndGgpIHtcclxuICAgICAgICAgICAgcmVjb3JkQWxsLmZvckVhY2goKGl0ZW06IFJlY29yZERCKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXRlbS5zcGVudCAmJiBpbnB1dCAmJiBpbnB1dC5maW5kKCh2YWx1ZSkgPT4gdmFsdWUgPT09IGl0ZW0uc2VyaWFsX251bWJlcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgdG90YWxDcmVkaXRzID0gdGhpcy5hbmFseXplQ3JlZGl0cyhpdGVtLnJlY29yZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VuZENyZWRpdHMgPSB0b3RhbENyZWRpdHMgLSBjcmVkaXRzO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNlbmRDcmVkaXRzO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGdldERhdGFXaXRoT3BlbihzdG9yZU5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcpIHtcclxuICAgICAgICBjb25zdCBteURCID0gbmV3IE15REIoKTtcclxuICAgICAgICBhd2FpdCBteURCLm9wZW4oKTtcclxuICAgICAgICByZXR1cm4gYXdhaXQgbXlEQi5nZXRCeU5hbWUoc3RvcmVOYW1lLCBrZXkpO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIGFkZERhdGFXaXRoT3BlbihzdG9yZU5hbWU6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgbXlEQiA9IG5ldyBNeURCKCk7XHJcbiAgICAgICAgYXdhaXQgbXlEQi5vcGVuKCk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IG15REIuYWRkRGF0YShzdG9yZU5hbWUsIGRhdGEpO1xyXG4gICAgfSxcclxuICAgIGFzeW5jIHVwZGF0ZURhdGFXaXRoT3BlbihzdG9yZU5hbWU6IHN0cmluZywga2V5OiBzdHJpbmcsIGRhdGE6IGFueSkge1xyXG4gICAgICAgIGNvbnN0IG15REIgPSBuZXcgTXlEQigpO1xyXG4gICAgICAgIGF3YWl0IG15REIub3BlbigpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBteURCLnVwZGF0ZShzdG9yZU5hbWUsIGtleSwgZGF0YSk7XHJcbiAgICB9LFxyXG5cclxuICAgIGFzeW5jIG5ld1VwZGF0ZURhdGFXaXRoT3BlbihzdG9yZU5hbWU6IHN0cmluZywgZGF0YTogYW55KSB7XHJcbiAgICAgICAgY29uc3QgbXlEQiA9IG5ldyBNeURCKCk7XHJcbiAgICAgICAgYXdhaXQgbXlEQi5vcGVuKCk7XHJcbiAgICAgICAgcmV0dXJuIGF3YWl0IG15REIudXBkYXRlRGF0YShzdG9yZU5hbWUsIGRhdGEpO1xyXG4gICAgfSxcclxuXHJcbiAgICBhc3luYyBzeW5jSGVpZ2h0KGFkZHJlc3M6IHN0cmluZyk6IFByb21pc2U8YW55PiB7XHJcbiAgICAgICAgY29uc3QgcmVzID0gYXdhaXQgUmVjb3Jkc1V0aWxzLmdldERhdGFXaXRoT3BlbihTdG9yZS5BTEVPU1lOQ19TVE9SRV9OQU1FLCBhZGRyZXNzKTtcclxuICAgICAgICBpZiAocmVzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzWzBdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB7XHJcbiAgICAgICAgICAgICAgICBhZGRyZXNzLFxyXG4gICAgICAgICAgICAgICAgZW5kSGVpZ2h0OiAwLFxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBhd2FpdCBSZWNvcmRzVXRpbHMuYWRkRGF0YVdpdGhPcGVuKFN0b3JlLkFMRU9TWU5DX1NUT1JFX05BTUUsIGRhdGEpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YTtcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG59O1xyXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=