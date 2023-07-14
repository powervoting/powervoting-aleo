"use strict";
(self["webpackChunkreact_rust_chrome_extension"] = self["webpackChunkreact_rust_chrome_extension"] || []).push([["pkg_aleo-wasm_aleo_wasm_js"],{

/***/ "./pkg/aleo-wasm/aleo_wasm.js":
/*!************************************!*\
  !*** ./pkg/aleo-wasm/aleo_wasm.js ***!
  \************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Address: () => (/* binding */ Address),
/* harmony export */   ExecutionResponse: () => (/* binding */ ExecutionResponse),
/* harmony export */   KeyPair: () => (/* binding */ KeyPair),
/* harmony export */   PrivateKey: () => (/* binding */ PrivateKey),
/* harmony export */   PrivateKeyCiphertext: () => (/* binding */ PrivateKeyCiphertext),
/* harmony export */   Program: () => (/* binding */ Program),
/* harmony export */   ProgramManager: () => (/* binding */ ProgramManager),
/* harmony export */   ProvingKey: () => (/* binding */ ProvingKey),
/* harmony export */   RecordCiphertext: () => (/* binding */ RecordCiphertext),
/* harmony export */   RecordPlaintext: () => (/* binding */ RecordPlaintext),
/* harmony export */   Signature: () => (/* binding */ Signature),
/* harmony export */   Transaction: () => (/* binding */ Transaction),
/* harmony export */   VerifyingKey: () => (/* binding */ VerifyingKey),
/* harmony export */   ViewKey: () => (/* binding */ ViewKey),
/* harmony export */   base58: () => (/* binding */ base58),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   hashBHP: () => (/* binding */ hashBHP),
/* harmony export */   initSync: () => (/* binding */ initSync),
/* harmony export */   initThreadPool: () => (/* binding */ initThreadPool),
/* harmony export */   wbg_rayon_PoolBuilder: () => (/* binding */ wbg_rayon_PoolBuilder),
/* harmony export */   wbg_rayon_start_worker: () => (/* binding */ wbg_rayon_start_worker)
/* harmony export */ });
/* harmony import */ var _snippets_wasm_bindgen_rayon_7afa899f36665473_src_workerHelpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.js */ "./pkg/aleo-wasm/snippets/wasm-bindgen-rayon-7afa899f36665473/src/workerHelpers.js");
/* module decorator */ module = __webpack_require__.hmd(module);


let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.buffer !== wasm.memory.buffer) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().slice(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
};

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.buffer !== wasm.memory.buffer) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_3.get(state.dtor)(a, state.b);

            } else {
                state.a = a;
            }
        }
    };
    real.original = state;

    return real;
}
function __wbg_adapter_32(arg0, arg1, arg2) {
    wasm._dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__hccb8f2e6b29054d1(arg0, arg1, addHeapObject(arg2));
}

function _assertClass(instance, klass) {
    if (!(instance instanceof klass)) {
        throw new Error(`expected instance of ${klass.name}`);
    }
    return instance.ptr;
}

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* @param {string} input
* @param {string} action
* @returns {string}
*/
function base58(input, action) {
    let deferred4_0;
    let deferred4_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(action, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        wasm.base58(retptr, ptr0, len0, ptr1, len1);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        var ptr3 = r0;
        var len3 = r1;
        if (r3) {
            ptr3 = 0; len3 = 0;
            throw takeObject(r2);
        }
        deferred4_0 = ptr3;
        deferred4_1 = len3;
        return getStringFromWasm0(ptr3, len3);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
    }
}

/**
* @param {string} input
* @param {string} bhptype
* @param {string} destination_type
* @returns {string}
*/
function hashBHP(input, bhptype, destination_type) {
    let deferred5_0;
    let deferred5_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(input, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passStringToWasm0(bhptype, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(destination_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        wasm.hashBHP(retptr, ptr0, len0, ptr1, len1, ptr2, len2);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var r2 = getInt32Memory0()[retptr / 4 + 2];
        var r3 = getInt32Memory0()[retptr / 4 + 3];
        var ptr4 = r0;
        var len4 = r1;
        if (r3) {
            ptr4 = 0; len4 = 0;
            throw takeObject(r2);
        }
        deferred5_0 = ptr4;
        deferred5_1 = len4;
        return getStringFromWasm0(ptr4, len4);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_free(deferred5_0, deferred5_1, 1);
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_exn_store(addHeapObject(e));
    }
}
function __wbg_adapter_219(arg0, arg1, arg2, arg3) {
    wasm.wasm_bindgen__convert__closures__invoke2_mut__h31ab11b692b77438(arg0, arg1, addHeapObject(arg2), addHeapObject(arg3));
}

/**
* @param {number} num_threads
* @returns {Promise<any>}
*/
function initThreadPool(num_threads) {
    const ret = wasm.initThreadPool(num_threads);
    return takeObject(ret);
}

/**
* @param {number} receiver
*/
function wbg_rayon_start_worker(receiver) {
    wasm.wbg_rayon_start_worker(receiver);
}

/**
*/
class Address {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Address.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_address_free(ptr);
    }
    /**
    * @param {PrivateKey} private_key
    * @returns {Address}
    */
    static from_private_key(private_key) {
        _assertClass(private_key, PrivateKey);
        const ret = wasm.address_from_private_key(private_key.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
    * @param {ViewKey} view_key
    * @returns {Address}
    */
    static from_view_key(view_key) {
        _assertClass(view_key, ViewKey);
        const ret = wasm.address_from_view_key(view_key.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
    * @param {string} address
    * @returns {Address}
    */
    static from_string(address) {
        const ptr0 = passStringToWasm0(address, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.address_from_string(ptr0, len0);
        return Address.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    to_string() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.address_to_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @param {Uint8Array} message
    * @param {Signature} signature
    * @returns {boolean}
    */
    verify(message, signature) {
        const ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        _assertClass(signature, Signature);
        const ret = wasm.address_verify(this.__wbg_ptr, ptr0, len0, signature.__wbg_ptr);
        return ret !== 0;
    }
}
/**
* Webassembly Representation of an Aleo function execution response
*
* This object is returned by the execution of an Aleo function off-chain. It provides methods for
* retrieving the outputs of the function execution.
*/
class ExecutionResponse {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ExecutionResponse.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_executionresponse_free(ptr);
    }
    /**
    * Get the outputs of the executed function
    * @returns {Array<any>}
    */
    getOutputs() {
        const ret = wasm.executionresponse_getOutputs(this.__wbg_ptr);
        return takeObject(ret);
    }
}
/**
*/
class KeyPair {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(KeyPair.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_keypair_free(ptr);
    }
    /**
    * Create new key pair from proving and verifying keys
    * @param {ProvingKey} proving_key
    * @param {VerifyingKey} verifying_key
    */
    constructor(proving_key, verifying_key) {
        _assertClass(proving_key, ProvingKey);
        var ptr0 = proving_key.__destroy_into_raw();
        _assertClass(verifying_key, VerifyingKey);
        var ptr1 = verifying_key.__destroy_into_raw();
        const ret = wasm.keypair_new(ptr0, ptr1);
        return KeyPair.__wrap(ret);
    }
    /**
    * Get the proving key
    * @returns {ProvingKey}
    */
    provingKey() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.keypair_provingKey(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ProvingKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Get the verifying key
    * @returns {VerifyingKey}
    */
    verifyingKey() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.keypair_verifyingKey(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return VerifyingKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class PrivateKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PrivateKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_privatekey_free(ptr);
    }
    /**
    * Generate a new private key
    */
    constructor() {
        const ret = wasm.privatekey_new();
        return PrivateKey.__wrap(ret);
    }
    /**
    * Get a private key from a series of unchecked bytes
    * @param {Uint8Array} seed
    * @returns {PrivateKey}
    */
    static from_seed_unchecked(seed) {
        const ptr0 = passArray8ToWasm0(seed, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.privatekey_from_seed_unchecked(ptr0, len0);
        return PrivateKey.__wrap(ret);
    }
    /**
    * Create a private key from a string representation
    *
    * This function will fail if the text is not a valid private key
    * @param {string} private_key
    * @returns {PrivateKey}
    */
    static from_string(private_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(private_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.privatekey_from_string(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PrivateKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Get a string representation of the private key
    *
    * This function should be used very carefully as it exposes the private key plaintext
    * @returns {string}
    */
    to_string() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.privatekey_to_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Get the view key corresponding to the private key
    * @returns {ViewKey}
    */
    to_view_key() {
        const ret = wasm.privatekey_to_view_key(this.__wbg_ptr);
        return ViewKey.__wrap(ret);
    }
    /**
    * Get the address corresponding to the private key
    * @returns {Address}
    */
    to_address() {
        const ret = wasm.privatekey_to_address(this.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
    * Sign a message with the private key
    * @param {Uint8Array} message
    * @returns {Signature}
    */
    sign(message) {
        const ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.privatekey_sign(this.__wbg_ptr, ptr0, len0);
        return Signature.__wrap(ret);
    }
    /**
    * Get a private key ciphertext using a secret.
    *
    * The secret is sensitive and will be needed to decrypt the private key later, so it should be stored securely
    * @param {string} secret
    * @returns {PrivateKeyCiphertext}
    */
    static newEncrypted(secret) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(secret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.privatekey_newEncrypted(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PrivateKeyCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Encrypt the private key with a secret.
    *
    * The secret is sensitive and will be needed to decrypt the private key later, so it should be stored securely
    * @param {string} secret
    * @returns {PrivateKeyCiphertext}
    */
    toCiphertext(secret) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(secret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.privatekey_toCiphertext(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PrivateKeyCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Get private key from a private key ciphertext using a secret.
    * @param {PrivateKeyCiphertext} ciphertext
    * @param {string} secret
    * @returns {PrivateKey}
    */
    static fromPrivateKeyCiphertext(ciphertext, secret) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(ciphertext, PrivateKeyCiphertext);
            const ptr0 = passStringToWasm0(secret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.privatekey_fromPrivateKeyCiphertext(retptr, ciphertext.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PrivateKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @param {string} recordstext
    * @returns {string}
    */
    decryptrecords(recordstext) {
        let deferred3_0;
        let deferred3_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(recordstext, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.privatekey_decryptrecords(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr2 = r0;
            var len2 = r1;
            if (r3) {
                ptr2 = 0; len2 = 0;
                throw takeObject(r2);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
}
/**
* Private Key in ciphertext form
*/
class PrivateKeyCiphertext {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(PrivateKeyCiphertext.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_privatekeyciphertext_free(ptr);
    }
    /**
    * Encrypt a private key using a secret string.
    *
    * The secret is sensitive and will be needed to decrypt the private key later, so it should be stored securely.
    * @param {PrivateKey} private_key
    * @param {string} secret
    * @returns {PrivateKeyCiphertext}
    */
    static encryptPrivateKey(private_key, secret) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(private_key, PrivateKey);
            const ptr0 = passStringToWasm0(secret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.privatekeyciphertext_encryptPrivateKey(retptr, private_key.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PrivateKeyCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Decrypts a private ciphertext using a secret string.
    *
    * This must be the same secret used to encrypt the private key
    * @param {string} secret
    * @returns {PrivateKey}
    */
    decryptToPrivateKey(secret) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(secret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.privatekeyciphertext_decryptToPrivateKey(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PrivateKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Returns the ciphertext string
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.privatekeyciphertext_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Creates a PrivateKeyCiphertext from a string
    * @param {string} ciphertext
    * @returns {PrivateKeyCiphertext}
    */
    static fromString(ciphertext) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(ciphertext, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.privatekeyciphertext_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return PrivateKeyCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
* Webassembly Representation of an Aleo program
*
* This object is required to create an Execution or Deployment transaction. It includes several
* convenience methods for enumerating available functions and each functions' inputs in a
* javascript object for usage in creation of web forms for input capture.
*/
class Program {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Program.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_program_free(ptr);
    }
    /**
    * Create a program from a program string
    * @param {string} program
    * @returns {Program}
    */
    static fromString(program) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(program, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.program_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Program.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Get a string representation of the program
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.program_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Get javascript array of functions names in the program
    * @returns {Array<any>}
    */
    getFunctions() {
        const ret = wasm.program_getFunctions(this.__wbg_ptr);
        return takeObject(ret);
    }
    /**
    * Get a javascript object representation of the function inputs and types. This can be used
    * to generate a webform to capture user inputs for an execution of a function.
    * @param {string} function_name
    * @returns {Array<any>}
    */
    getFunctionInputs(function_name) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(function_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.program_getFunctionInputs(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Get a javascript object representation of a program record and its types
    * @param {string} record_name
    * @returns {object}
    */
    getRecordMembers(record_name) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(record_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.program_getRecordMembers(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Get a javascript object representation of a program struct and its types
    * @param {string} struct_name
    * @returns {Array<any>}
    */
    getStructMembers(struct_name) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(struct_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.program_getStructMembers(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return takeObject(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Get the credits.aleo program
    * @returns {Program}
    */
    static getCreditsProgram() {
        const ret = wasm.program_getCreditsProgram();
        return Program.__wrap(ret);
    }
    /**
    * Get the id of the program
    * @returns {string}
    */
    id() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.program_id(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Determine equality with another program
    * @param {Program} other
    * @returns {boolean}
    */
    isEqual(other) {
        _assertClass(other, Program);
        const ret = wasm.program_isEqual(this.__wbg_ptr, other.__wbg_ptr);
        return ret !== 0;
    }
}
/**
*/
class ProgramManager {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ProgramManager.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_programmanager_free(ptr);
    }
    /**
    * Split an Aleo credits record into two separate records. This function does not require a fee.
    *
    * @param private_key The private key of the sender
    * @param split_amount The amount of the credit split. This amount will be subtracted from the
    * value of the record and two new records will be created with the split amount and the remainder
    * @param amount_record The record to split
    * @param url The url of the Aleo network node to send the transaction to
    * @param cache Cache the proving and verifying keys in the ProgramManager memory. If this is
    * set to `true` the keys synthesized (or passed in as optional parameters via the
    * `split_proving_key` and `split_verifying_key` arguments) will be stored in the
    * ProgramManager's memory and used for subsequent transactions. If this is set to `false` the
    * proving and verifying keys will be deallocated from memory after the transaction is executed
    * @param split_proving_key (optional) Provide a proving key to use for the split function
    * @param split_verifying_key (optional) Provide a verifying key to use for the split function
    * @param {PrivateKey} private_key
    * @param {number} split_amount
    * @param {RecordPlaintext} amount_record
    * @param {string} url
    * @param {boolean} cache
    * @param {ProvingKey | undefined} split_proving_key
    * @param {VerifyingKey | undefined} split_verifying_key
    * @returns {Promise<Transaction>}
    */
    split(private_key, split_amount, amount_record, url, cache, split_proving_key, split_verifying_key) {
        _assertClass(private_key, PrivateKey);
        var ptr0 = private_key.__destroy_into_raw();
        _assertClass(amount_record, RecordPlaintext);
        var ptr1 = amount_record.__destroy_into_raw();
        const ptr2 = passStringToWasm0(url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        let ptr3 = 0;
        if (!isLikeNone(split_proving_key)) {
            _assertClass(split_proving_key, ProvingKey);
            ptr3 = split_proving_key.__destroy_into_raw();
        }
        let ptr4 = 0;
        if (!isLikeNone(split_verifying_key)) {
            _assertClass(split_verifying_key, VerifyingKey);
            ptr4 = split_verifying_key.__destroy_into_raw();
        }
        const ret = wasm.programmanager_split(this.__wbg_ptr, ptr0, split_amount, ptr1, ptr2, len2, cache, ptr3, ptr4);
        return takeObject(ret);
    }
    /**
    * Join two records together to create a new record with an amount of credits equal to the sum
    * of the credits of the two original records
    *
    * @param private_key The private key of the sender
    * @param record_1 The first record to combine
    * @param record_2 The second record to combine
    * @param fee_credits The amount of credits to pay as a fee
    * @param fee_record The record to spend the fee from
    * @param url The url of the Aleo network node to send the transaction to
    * @param cache Cache the proving and verifying keys in the ProgramManager memory. If this is
    * set to `true` the keys synthesized (or passed in as optional parameters via the
    * `join_proving_key` and `join_verifying_key` arguments) will be stored in the
    * ProgramManager's memory and used for subsequent transactions. If this is set to `false` the
    * proving and verifying keys will be deallocated from memory after the transaction is executed
    * @param join_proving_key (optional) Provide a proving key to use for the join function
    * @param join_verifying_key (optional) Provide a verifying key to use for the join function
    * @param fee_proving_key (optional) Provide a proving key to use for the fee execution
    * @param fee_verifying_key (optional) Provide a verifying key to use for the fee execution
    * @param {PrivateKey} private_key
    * @param {RecordPlaintext} record_1
    * @param {RecordPlaintext} record_2
    * @param {number} fee_credits
    * @param {RecordPlaintext} fee_record
    * @param {string} url
    * @param {boolean} cache
    * @param {ProvingKey | undefined} join_proving_key
    * @param {VerifyingKey | undefined} join_verifying_key
    * @param {ProvingKey | undefined} fee_proving_key
    * @param {VerifyingKey | undefined} fee_verifying_key
    * @returns {Promise<Transaction>}
    */
    join(private_key, record_1, record_2, fee_credits, fee_record, url, cache, join_proving_key, join_verifying_key, fee_proving_key, fee_verifying_key) {
        _assertClass(private_key, PrivateKey);
        var ptr0 = private_key.__destroy_into_raw();
        _assertClass(record_1, RecordPlaintext);
        var ptr1 = record_1.__destroy_into_raw();
        _assertClass(record_2, RecordPlaintext);
        var ptr2 = record_2.__destroy_into_raw();
        _assertClass(fee_record, RecordPlaintext);
        var ptr3 = fee_record.__destroy_into_raw();
        const ptr4 = passStringToWasm0(url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        let ptr5 = 0;
        if (!isLikeNone(join_proving_key)) {
            _assertClass(join_proving_key, ProvingKey);
            ptr5 = join_proving_key.__destroy_into_raw();
        }
        let ptr6 = 0;
        if (!isLikeNone(join_verifying_key)) {
            _assertClass(join_verifying_key, VerifyingKey);
            ptr6 = join_verifying_key.__destroy_into_raw();
        }
        let ptr7 = 0;
        if (!isLikeNone(fee_proving_key)) {
            _assertClass(fee_proving_key, ProvingKey);
            ptr7 = fee_proving_key.__destroy_into_raw();
        }
        let ptr8 = 0;
        if (!isLikeNone(fee_verifying_key)) {
            _assertClass(fee_verifying_key, VerifyingKey);
            ptr8 = fee_verifying_key.__destroy_into_raw();
        }
        const ret = wasm.programmanager_join(this.__wbg_ptr, ptr0, ptr1, ptr2, fee_credits, ptr3, ptr4, len4, cache, ptr5, ptr6, ptr7, ptr8);
        return takeObject(ret);
    }
    /**
    * Send credits from one Aleo account to another
    *
    * @param private_key The private key of the sender
    * @param amount_credits The amount of credits to send
    * @param recipient The recipient of the transaction
    * @param transfer_type The type of the transfer (options: "private", "public", "private_to_public", "public_to_private")
    * @param amount_record The record to fund the amount from
    * @param fee_credits The amount of credits to pay as a fee
    * @param fee_record The record to spend the fee from
    * @param url The url of the Aleo network node to send the transaction to
    * @param cache Cache the proving and verifying keys in the ProgramManager memory. If this is
    * set to `true` the keys synthesized (or passed in as optional parameters via the
    * `transfer_proving_key` and `transfer_verifying_key` arguments) will be stored in the
    * ProgramManager's memory and used for subsequent transactions. If this is set to `false` the
    * proving and verifying keys will be deallocated from memory after the transaction is executed
    * @param transfer_proving_key (optional) Provide a proving key to use for the transfer
    * function
    * @param transfer_verifying_key (optional) Provide a verifying key to use for the transfer
    * function
    * @param fee_proving_key (optional) Provide a proving key to use for the fee execution
    * @param fee_verifying_key (optional) Provide a verifying key to use for the fee execution
    * @param {PrivateKey} private_key
    * @param {number} amount_credits
    * @param {string} recipient
    * @param {string} transfer_type
    * @param {RecordPlaintext | undefined} amount_record
    * @param {number} fee_credits
    * @param {RecordPlaintext} fee_record
    * @param {string} url
    * @param {boolean} cache
    * @param {ProvingKey | undefined} transfer_proving_key
    * @param {VerifyingKey | undefined} transfer_verifying_key
    * @param {ProvingKey | undefined} fee_proving_key
    * @param {VerifyingKey | undefined} fee_verifying_key
    * @returns {Promise<Transaction>}
    */
    transfer(private_key, amount_credits, recipient, transfer_type, amount_record, fee_credits, fee_record, url, cache, transfer_proving_key, transfer_verifying_key, fee_proving_key, fee_verifying_key) {
        _assertClass(private_key, PrivateKey);
        var ptr0 = private_key.__destroy_into_raw();
        const ptr1 = passStringToWasm0(recipient, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(transfer_type, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        let ptr3 = 0;
        if (!isLikeNone(amount_record)) {
            _assertClass(amount_record, RecordPlaintext);
            ptr3 = amount_record.__destroy_into_raw();
        }
        _assertClass(fee_record, RecordPlaintext);
        var ptr4 = fee_record.__destroy_into_raw();
        const ptr5 = passStringToWasm0(url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len5 = WASM_VECTOR_LEN;
        let ptr6 = 0;
        if (!isLikeNone(transfer_proving_key)) {
            _assertClass(transfer_proving_key, ProvingKey);
            ptr6 = transfer_proving_key.__destroy_into_raw();
        }
        let ptr7 = 0;
        if (!isLikeNone(transfer_verifying_key)) {
            _assertClass(transfer_verifying_key, VerifyingKey);
            ptr7 = transfer_verifying_key.__destroy_into_raw();
        }
        let ptr8 = 0;
        if (!isLikeNone(fee_proving_key)) {
            _assertClass(fee_proving_key, ProvingKey);
            ptr8 = fee_proving_key.__destroy_into_raw();
        }
        let ptr9 = 0;
        if (!isLikeNone(fee_verifying_key)) {
            _assertClass(fee_verifying_key, VerifyingKey);
            ptr9 = fee_verifying_key.__destroy_into_raw();
        }
        const ret = wasm.programmanager_transfer(this.__wbg_ptr, ptr0, amount_credits, ptr1, len1, ptr2, len2, ptr3, fee_credits, ptr4, ptr5, len5, cache, ptr6, ptr7, ptr8, ptr9);
        return takeObject(ret);
    }
    /**
    * Execute an arbitrary function locally
    *
    * @param private_key The private key of the sender
    * @param program The source code of the program being executed
    * @param function The name of the function to execute
    * @param inputs A javascript array of inputs to the function
    * @param amount_record The record to fund the amount from
    * @param fee_credits The amount of credits to pay as a fee
    * @param fee_record The record to spend the fee from
    * @param url The url of the Aleo network node to send the transaction to
    * @param cache Cache the proving and verifying keys in the ProgramManager's memory.
    * If this is set to 'true' the keys synthesized (or passed in as optional parameters via the
    * `proving_key` and `verifying_key` arguments) will be stored in the ProgramManager's memory
    * and used for subsequent transactions. If this is set to 'false' the proving and verifying
    * keys will be deallocated from memory after the transaction is executed.
    * @param proving_key (optional) Provide a verifying key to use for the function execution
    * @param verifying_key (optional) Provide a verifying key to use for the function execution
    * @param {PrivateKey} private_key
    * @param {string} program
    * @param {string} _function
    * @param {Array<any>} inputs
    * @param {boolean} cache
    * @param {ProvingKey | undefined} proving_key
    * @param {VerifyingKey | undefined} verifying_key
    * @returns {ExecutionResponse}
    */
    execute_local(private_key, program, _function, inputs, cache, proving_key, verifying_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(private_key, PrivateKey);
            var ptr0 = private_key.__destroy_into_raw();
            const ptr1 = passStringToWasm0(program, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            const ptr2 = passStringToWasm0(_function, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len2 = WASM_VECTOR_LEN;
            let ptr3 = 0;
            if (!isLikeNone(proving_key)) {
                _assertClass(proving_key, ProvingKey);
                ptr3 = proving_key.__destroy_into_raw();
            }
            let ptr4 = 0;
            if (!isLikeNone(verifying_key)) {
                _assertClass(verifying_key, VerifyingKey);
                ptr4 = verifying_key.__destroy_into_raw();
            }
            wasm.programmanager_execute_local(retptr, this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, addHeapObject(inputs), cache, ptr3, ptr4);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ExecutionResponse.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Execute Aleo function and create an Aleo execution transaction
    *
    * @param private_key The private key of the sender
    * @param program The source code of the program being executed
    * @param function The name of the function to execute
    * @param inputs A javascript array of inputs to the function
    * @param fee_credits The amount of credits to pay as a fee
    * @param fee_record The record to spend the fee from
    * @param url The url of the Aleo network node to send the transaction to
    * @param cache Cache the proving and verifying keys in the ProgramManager's memory.
    * If this is set to 'true' the keys synthesized (or passed in as optional parameters via the
    * `proving_key` and `verifying_key` arguments) will be stored in the ProgramManager's memory
    * and used for subsequent transactions. If this is set to 'false' the proving and verifying
    * keys will be deallocated from memory after the transaction is executed.
    * @param proving_key (optional) Provide a verifying key to use for the function execution
    * @param verifying_key (optional) Provide a verifying key to use for the function execution
    * @param fee_proving_key (optional) Provide a proving key to use for the fee execution
    * @param fee_verifying_key (optional) Provide a verifying key to use for the fee execution
    * @param {PrivateKey} private_key
    * @param {string} program
    * @param {string} _function
    * @param {Array<any>} inputs
    * @param {number} fee_credits
    * @param {RecordPlaintext} fee_record
    * @param {string} url
    * @param {boolean} cache
    * @param {ProvingKey | undefined} proving_key
    * @param {VerifyingKey | undefined} verifying_key
    * @param {ProvingKey | undefined} fee_proving_key
    * @param {VerifyingKey | undefined} fee_verifying_key
    * @returns {Promise<Transaction>}
    */
    execute(private_key, program, _function, inputs, fee_credits, fee_record, url, cache, proving_key, verifying_key, fee_proving_key, fee_verifying_key) {
        _assertClass(private_key, PrivateKey);
        var ptr0 = private_key.__destroy_into_raw();
        const ptr1 = passStringToWasm0(program, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passStringToWasm0(_function, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len2 = WASM_VECTOR_LEN;
        _assertClass(fee_record, RecordPlaintext);
        var ptr3 = fee_record.__destroy_into_raw();
        const ptr4 = passStringToWasm0(url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len4 = WASM_VECTOR_LEN;
        let ptr5 = 0;
        if (!isLikeNone(proving_key)) {
            _assertClass(proving_key, ProvingKey);
            ptr5 = proving_key.__destroy_into_raw();
        }
        let ptr6 = 0;
        if (!isLikeNone(verifying_key)) {
            _assertClass(verifying_key, VerifyingKey);
            ptr6 = verifying_key.__destroy_into_raw();
        }
        let ptr7 = 0;
        if (!isLikeNone(fee_proving_key)) {
            _assertClass(fee_proving_key, ProvingKey);
            ptr7 = fee_proving_key.__destroy_into_raw();
        }
        let ptr8 = 0;
        if (!isLikeNone(fee_verifying_key)) {
            _assertClass(fee_verifying_key, VerifyingKey);
            ptr8 = fee_verifying_key.__destroy_into_raw();
        }
        const ret = wasm.programmanager_execute(this.__wbg_ptr, ptr0, ptr1, len1, ptr2, len2, addHeapObject(inputs), fee_credits, ptr3, ptr4, len4, cache, ptr5, ptr6, ptr7, ptr8);
        return takeObject(ret);
    }
    /**
    * Deploy an Aleo program
    *
    * @param private_key The private key of the sender
    * @param program The source code of the program being deployed
    * @param imports A javascript object holding the source code of any imported programs in the
    * form {"program_name1": "program_source_code", "program_name2": "program_source_code", ..}.
    * Note that all imported programs must be deployed on chain before the main program in order
    * for the deployment to succeed
    * @param fee_credits The amount of credits to pay as a fee
    * @param fee_record The record to spend the fee from
    * @param url The url of the Aleo network node to send the transaction to
    * @param fee_proving_key (optional) Provide a proving key to use for the fee execution
    * @param fee_verifying_key (optional) Provide a verifying key to use for the fee execution
    * @param {PrivateKey} private_key
    * @param {string} program
    * @param {object | undefined} imports
    * @param {number} fee_credits
    * @param {RecordPlaintext} fee_record
    * @param {string} url
    * @param {boolean} cache
    * @param {ProvingKey | undefined} fee_proving_key
    * @param {VerifyingKey | undefined} fee_verifying_key
    * @returns {Promise<Transaction>}
    */
    deploy(private_key, program, imports, fee_credits, fee_record, url, cache, fee_proving_key, fee_verifying_key) {
        _assertClass(private_key, PrivateKey);
        var ptr0 = private_key.__destroy_into_raw();
        const ptr1 = passStringToWasm0(program, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        _assertClass(fee_record, RecordPlaintext);
        var ptr2 = fee_record.__destroy_into_raw();
        const ptr3 = passStringToWasm0(url, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len3 = WASM_VECTOR_LEN;
        let ptr4 = 0;
        if (!isLikeNone(fee_proving_key)) {
            _assertClass(fee_proving_key, ProvingKey);
            ptr4 = fee_proving_key.__destroy_into_raw();
        }
        let ptr5 = 0;
        if (!isLikeNone(fee_verifying_key)) {
            _assertClass(fee_verifying_key, VerifyingKey);
            ptr5 = fee_verifying_key.__destroy_into_raw();
        }
        const ret = wasm.programmanager_deploy(this.__wbg_ptr, ptr0, ptr1, len1, isLikeNone(imports) ? 0 : addHeapObject(imports), fee_credits, ptr2, ptr3, len3, cache, ptr4, ptr5);
        return takeObject(ret);
    }
    /**
    */
    constructor() {
        const ret = wasm.programmanager_new();
        return ProgramManager.__wrap(ret);
    }
    /**
    * Cache the proving and verifying keys for a program function in WASM memory. This method
    * will take a verifying and proving key and store them in the program manager's internal
    * in-memory cache. This memory is allocated in WebAssembly, so it is important to be mindful
    * of the amount of memory being used. This method will return an error if the keys are already
    * cached in memory.
    *
    * @param program_id The name of the program containing the desired function
    * @param function The name of the function to store the keys for
    * @param proving_key The proving key of the function
    * @param verifying_key The verifying key of the function
    * @param {string} program
    * @param {string} _function
    * @param {ProvingKey} proving_key
    * @param {VerifyingKey} verifying_key
    */
    cacheKeypairInWasmMemory(program, _function, proving_key, verifying_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(program, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(_function, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            _assertClass(proving_key, ProvingKey);
            var ptr2 = proving_key.__destroy_into_raw();
            _assertClass(verifying_key, VerifyingKey);
            var ptr3 = verifying_key.__destroy_into_raw();
            wasm.programmanager_cacheKeypairInWasmMemory(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, ptr2, ptr3);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            if (r1) {
                throw takeObject(r0);
            }
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Get the proving & verifying keys cached in WASM memory for a specific function
    *
    * @param program_id The name of the program containing the desired function
    * @param function_id The name of the function to retrieve the keys for
    * @param {string} program_id
    * @param {string} _function
    * @returns {KeyPair}
    */
    getCachedKeypair(program_id, _function) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(program_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(_function, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            wasm.programmanager_getCachedKeypair(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return KeyPair.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Synthesize a proving and verifying key for a program function. This method should be used
    * when there is a need to pre-synthesize keys (i.e. for caching purposes, etc.)
    *
    * @param program The source code of the program containing the desired function
    * @param function The name of the function to synthesize the key for
    * @param {string} program
    * @param {string} _function
    * @returns {KeyPair}
    */
    synthesizeKeypair(program, _function) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(program, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(_function, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            wasm.programmanager_synthesizeKeypair(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return KeyPair.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Clear key cache in wasm memory.
    *
    * This method will clear the key cache in wasm memory. It is important to note that this will
    * not DE-allocate the memory assigned to wasm as wasm memory cannot be shrunk. The total
    * memory allocated to wasm will remain constant but will be available for other usage after
    * calling this method.
    */
    clearKeyCache() {
        wasm.programmanager_clearKeyCache(this.__wbg_ptr);
    }
    /**
    * Check if the cache contains a keypair for a specific function
    *
    * @param program_id The name of the program containing the desired function
    * @param function_id The name of the function to retrieve the keys for
    * @param {string} program_id
    * @param {string} function_id
    * @returns {boolean}
    */
    keyExists(program_id, function_id) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(program_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(function_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            wasm.programmanager_keyExists(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return r0 !== 0;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class ProvingKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ProvingKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_provingkey_free(ptr);
    }
    /**
    * Construct a new proving key from a byte array
    * @param {Uint8Array} bytes
    * @returns {ProvingKey}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.provingkey_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return ProvingKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Create a byte array from a proving key
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.provingkey_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
* Encrypted Aleo record
*/
class RecordCiphertext {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RecordCiphertext.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_recordciphertext_free(ptr);
    }
    /**
    * Return a record ciphertext from a string.
    * @param {string} record
    * @returns {RecordCiphertext}
    */
    static fromString(record) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(record, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.recordciphertext_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return RecordCiphertext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Return the record ciphertext string.
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.recordciphertext_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Decrypt the record ciphertext into plaintext using the view key.
    * @param {ViewKey} view_key
    * @returns {RecordPlaintext}
    */
    decrypt(view_key) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(view_key, ViewKey);
            wasm.recordciphertext_decrypt(retptr, this.__wbg_ptr, view_key.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return RecordPlaintext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Returns `true` if the view key can decrypt the record ciphertext.
    * @param {ViewKey} view_key
    * @returns {boolean}
    */
    isOwner(view_key) {
        _assertClass(view_key, ViewKey);
        const ret = wasm.recordciphertext_isOwner(this.__wbg_ptr, view_key.__wbg_ptr);
        return ret !== 0;
    }
}
/**
* Aleo record plaintext
*/
class RecordPlaintext {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RecordPlaintext.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_recordplaintext_free(ptr);
    }
    /**
    * Return a record plaintext from a string.
    * @param {string} record
    * @returns {RecordPlaintext}
    */
    static fromString(record) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(record, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.recordplaintext_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return RecordPlaintext.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Returns the record plaintext string
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.recordplaintext_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Returns the amount of microcredits in the record
    * @returns {bigint}
    */
    microcredits() {
        const ret = wasm.recordplaintext_microcredits(this.__wbg_ptr);
        return BigInt.asUintN(64, ret);
    }
    /**
    * Attempt to get the serial number of a record to determine whether or not is has been spent
    * @param {PrivateKey} private_key
    * @param {string} program_id
    * @param {string} record_name
    * @returns {string}
    */
    serialNumberString(private_key, program_id, record_name) {
        let deferred4_0;
        let deferred4_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            _assertClass(private_key, PrivateKey);
            const ptr0 = passStringToWasm0(program_id, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passStringToWasm0(record_name, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            wasm.recordplaintext_serialNumberString(retptr, this.__wbg_ptr, private_key.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr3 = r0;
            var len3 = r1;
            if (r3) {
                ptr3 = 0; len3 = 0;
                throw takeObject(r2);
            }
            deferred4_0 = ptr3;
            deferred4_1 = len3;
            return getStringFromWasm0(ptr3, len3);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred4_0, deferred4_1, 1);
        }
    }
}
/**
*/
class Signature {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Signature.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_signature_free(ptr);
    }
    /**
    * @param {PrivateKey} private_key
    * @param {Uint8Array} message
    * @returns {Signature}
    */
    static sign(private_key, message) {
        _assertClass(private_key, PrivateKey);
        const ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signature_sign(private_key.__wbg_ptr, ptr0, len0);
        return Signature.__wrap(ret);
    }
    /**
    * @param {Address} address
    * @param {Uint8Array} message
    * @returns {boolean}
    */
    verify(address, message) {
        _assertClass(address, Address);
        const ptr0 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signature_verify(this.__wbg_ptr, address.__wbg_ptr, ptr0, len0);
        return ret !== 0;
    }
    /**
    * @param {string} signature
    * @returns {Signature}
    */
    static from_string(signature) {
        const ptr0 = passStringToWasm0(signature, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.signature_from_string(ptr0, len0);
        return Signature.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    to_string() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.signature_to_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
/**
* Webassembly Representation of an Aleo transaction
*
* This object is created when generating an on-chain function deployment or execution and is the
* object that should be submitted to the Aleo Network in order to deploy or execute a function.
*/
class Transaction {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Transaction.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_transaction_free(ptr);
    }
    /**
    * Create a transaction from a string
    * @param {string} transaction
    * @returns {Transaction}
    */
    static fromString(transaction) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(transaction, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.transaction_fromString(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return Transaction.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Get the transaction as a string. If you want to submit this transaction to the Aleo Network
    * this function will create the string that should be submitted in the `POST` data.
    * @returns {string}
    */
    toString() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_toString(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Get the id of the transaction. This is the merkle root of the transaction's inclusion proof.
    *
    * This value can be used to query the status of the transaction on the Aleo Network to see
    * if it was successful. If successful, the transaction will be included in a block and this
    * value can be used to lookup the transaction data on-chain.
    * @returns {string}
    */
    transactionId() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_transactionId(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Get the type of the transaction (will return "deploy" or "execute")
    * @returns {string}
    */
    transactionType() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.transaction_transactionType(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
}
/**
*/
class VerifyingKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(VerifyingKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_verifyingkey_free(ptr);
    }
    /**
    * Construct a new verifying key from a byte array
    * @param {Uint8Array} bytes
    * @returns {VerifyingKey}
    */
    static fromBytes(bytes) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(bytes, wasm.__wbindgen_malloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.verifyingkey_fromBytes(retptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            if (r2) {
                throw takeObject(r1);
            }
            return VerifyingKey.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * Create a byte array from a verifying key
    * @returns {Uint8Array}
    */
    toBytes() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.verifyingkey_toBytes(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            if (r3) {
                throw takeObject(r2);
            }
            var v1 = getArrayU8FromWasm0(r0, r1).slice();
            wasm.__wbindgen_free(r0, r1 * 1);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
/**
*/
class ViewKey {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(ViewKey.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_viewkey_free(ptr);
    }
    /**
    * @param {PrivateKey} private_key
    * @returns {ViewKey}
    */
    static from_private_key(private_key) {
        _assertClass(private_key, PrivateKey);
        const ret = wasm.viewkey_from_private_key(private_key.__wbg_ptr);
        return ViewKey.__wrap(ret);
    }
    /**
    * @param {string} view_key
    * @returns {ViewKey}
    */
    static from_string(view_key) {
        const ptr0 = passStringToWasm0(view_key, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.viewkey_from_string(ptr0, len0);
        return ViewKey.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    to_string() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.viewkey_to_string(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {Address}
    */
    to_address() {
        const ret = wasm.viewkey_to_address(this.__wbg_ptr);
        return Address.__wrap(ret);
    }
    /**
    * @param {string} ciphertext
    * @returns {string}
    */
    decrypt(ciphertext) {
        let deferred3_0;
        let deferred3_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passStringToWasm0(ciphertext, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            wasm.viewkey_decrypt(retptr, this.__wbg_ptr, ptr0, len0);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var r2 = getInt32Memory0()[retptr / 4 + 2];
            var r3 = getInt32Memory0()[retptr / 4 + 3];
            var ptr2 = r0;
            var len2 = r1;
            if (r3) {
                ptr2 = 0; len2 = 0;
                throw takeObject(r2);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
}
/**
*/
class wbg_rayon_PoolBuilder {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(wbg_rayon_PoolBuilder.prototype);
        obj.__wbg_ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wbg_rayon_poolbuilder_free(ptr);
    }
    /**
    * @returns {number}
    */
    numThreads() {
        const ret = wasm.wbg_rayon_poolbuilder_numThreads(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {number}
    */
    receiver() {
        const ret = wasm.wbg_rayon_poolbuilder_receiver(this.__wbg_ptr);
        return ret;
    }
    /**
    */
    build() {
        wasm.wbg_rayon_poolbuilder_build(this.__wbg_ptr);
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_transaction_new = function(arg0) {
        const ret = Transaction.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_log_38c939a5213b1be2 = function(arg0, arg1) {
        console.log(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = takeObject(arg0).original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_fetch_57429b87be3dcc33 = function(arg0) {
        const ret = fetch(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_link_22046963fe0b707a = function(arg0) {
        const ret = "data:application/javascript," + encodeURIComponent(`onmessage = function (ev) {
            let [ia, index, value] = ev.data;
            ia = new Int32Array(ia.buffer);
            let result = Atomics.wait(ia, index, value);
            postMessage(result);
        };
        `);
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_waitAsync_60fb5e2e86467e31 = function() {
        const ret = Atomics.waitAsync;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbg_waitAsync_73fd6eb3bace0a8d = function(arg0, arg1, arg2) {
        const ret = Atomics.waitAsync(getObject(arg0), arg1, arg2);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_async_e1a2a669aacf35ff = function(arg0) {
        const ret = getObject(arg0).async;
        return ret;
    };
    imports.wbg.__wbg_value_555e4f564193db05 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_fetch_8eaf01857a5bb21f = function(arg0, arg1) {
        const ret = getObject(arg0).fetch(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_signal_4bd18fb489af2d4c = function(arg0) {
        const ret = getObject(arg0).signal;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_55c9955722952374 = function() { return handleError(function () {
        const ret = new AbortController();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_abort_654b796176d117aa = function(arg0) {
        getObject(arg0).abort();
    };
    imports.wbg.__wbg_new_1eead62f64ca15ce = function() { return handleError(function () {
        const ret = new Headers();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_append_fda9e3432e3e88da = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4) {
        getObject(arg0).append(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4));
    }, arguments) };
    imports.wbg.__wbg_status_114ef6fe27fb8b00 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).status;
        return ret;
    }, arguments) };
    imports.wbg.__wbg_response_f2acf2ecbe021710 = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).response;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_responseText_da275667251fd153 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg1).responseText;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    }, arguments) };
    imports.wbg.__wbg_new_daafff584c71593b = function() { return handleError(function () {
        const ret = new XMLHttpRequest();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_open_56fa1eb95989f6a5 = function() { return handleError(function (arg0, arg1, arg2, arg3, arg4, arg5) {
        getObject(arg0).open(getStringFromWasm0(arg1, arg2), getStringFromWasm0(arg3, arg4), arg5 !== 0);
    }, arguments) };
    imports.wbg.__wbg_overrideMimeType_1a661d17da5f8baf = function() { return handleError(function (arg0, arg1, arg2) {
        getObject(arg0).overrideMimeType(getStringFromWasm0(arg1, arg2));
    }, arguments) };
    imports.wbg.__wbg_send_9f5007eae908c72e = function() { return handleError(function (arg0) {
        getObject(arg0).send();
    }, arguments) };
    imports.wbg.__wbg_instanceof_Response_fc4327dbfcdf5ced = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Response;
        } catch {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_url_8503de97f69da463 = function(arg0, arg1) {
        const ret = getObject(arg1).url;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_status_ac85a3142a84caa2 = function(arg0) {
        const ret = getObject(arg0).status;
        return ret;
    };
    imports.wbg.__wbg_headers_b70de86b8e989bc0 = function(arg0) {
        const ret = getObject(arg0).headers;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_arrayBuffer_288fb3538806e85c = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).arrayBuffer();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_data_ab99ae4a2e1e8bc9 = function(arg0) {
        const ret = getObject(arg0).data;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithstrandinit_cad5cd6038c7ff5d = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = new Request(getStringFromWasm0(arg0, arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_setonmessage_f0bd0280573b7084 = function(arg0, arg1) {
        getObject(arg0).onmessage = getObject(arg1);
    };
    imports.wbg.__wbg_new_8e7322f46d5d019c = function() { return handleError(function (arg0, arg1) {
        const ret = new Worker(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_postMessage_8c609e2bde333d9c = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).postMessage(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_getRandomValues_37fa2ca9e4e07fab = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).getRandomValues(getObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_randomFillSync_dc1e9a60c158336d = function() { return handleError(function (arg0, arg1) {
        getObject(arg0).randomFillSync(takeObject(arg1));
    }, arguments) };
    imports.wbg.__wbg_crypto_c48a774b022d20ac = function(arg0) {
        const ret = getObject(arg0).crypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_process_298734cf255a885d = function(arg0) {
        const ret = getObject(arg0).process;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_versions_e2e78e134e3e5d01 = function(arg0) {
        const ret = getObject(arg0).versions;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_node_1cd7a5d853dbea79 = function(arg0) {
        const ret = getObject(arg0).node;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_is_string = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'string';
        return ret;
    };
    imports.wbg.__wbg_msCrypto_bcb970640f50a1e8 = function(arg0) {
        const ret = getObject(arg0).msCrypto;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_require_8f08ceecec0f4fee = function() { return handleError(function () {
        const ret = module.require;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbindgen_is_function = function(arg0) {
        const ret = typeof(getObject(arg0)) === 'function';
        return ret;
    };
    imports.wbg.__wbg_get_44be0491f933a435 = function(arg0, arg1) {
        const ret = getObject(arg0)[arg1 >>> 0];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_length_fff51ee6522a1a18 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newnoargs_581967eacc0e2604 = function(arg0, arg1) {
        const ret = new Function(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_526fc47e980da008 = function(arg0) {
        const ret = getObject(arg0).next;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_next_ddb3312ca1c4e32a = function() { return handleError(function (arg0) {
        const ret = getObject(arg0).next();
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_done_5c1f01fb660d73b5 = function(arg0) {
        const ret = getObject(arg0).done;
        return ret;
    };
    imports.wbg.__wbg_value_1695675138684bd5 = function(arg0) {
        const ret = getObject(arg0).value;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_iterator_97f0c81209c6c35a = function() {
        const ret = Symbol.iterator;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_get_97b561fb56f034b5 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.get(getObject(arg0), getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_call_cb65541d95d71282 = function() { return handleError(function (arg0, arg1) {
        const ret = getObject(arg0).call(getObject(arg1));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_b51585de1b234aff = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_self_1ff1d729e9aae938 = function() { return handleError(function () {
        const ret = self.self;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_window_5f4faef6c12b79ec = function() { return handleError(function () {
        const ret = window.window;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_globalThis_1d39714405582d3c = function() { return handleError(function () {
        const ret = globalThis.globalThis;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_global_651f05c6a0944d1c = function() { return handleError(function () {
        const ret = __webpack_require__.g.global;
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_newwithlength_3ec098a360da1909 = function(arg0) {
        const ret = new Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_502d29070ea18557 = function(arg0, arg1, arg2) {
        getObject(arg0)[arg1 >>> 0] = takeObject(arg2);
    };
    imports.wbg.__wbg_of_3f69007bb4eeae65 = function(arg0, arg1, arg2) {
        const ret = Array.of(getObject(arg0), getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_call_01734de55d61e11d = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = getObject(arg0).call(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_new_43f1b47c28813cbd = function(arg0, arg1) {
        try {
            var state0 = {a: arg0, b: arg1};
            var cb0 = (arg0, arg1) => {
                const a = state0.a;
                state0.a = 0;
                try {
                    return __wbg_adapter_219(a, state0.b, arg0, arg1);
                } finally {
                    state0.a = a;
                }
            };
            const ret = new Promise(cb0);
            return addHeapObject(ret);
        } finally {
            state0.a = state0.b = 0;
        }
    };
    imports.wbg.__wbg_resolve_53698b95aaf7fcf8 = function(arg0) {
        const ret = Promise.resolve(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_f7e06ee3c11698eb = function(arg0, arg1) {
        const ret = getObject(arg0).then(getObject(arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_then_b2267541e2a73865 = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).then(getObject(arg1), getObject(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_buffer_085ec1f694018c4f = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_a0af68041688e8fd = function(arg0) {
        const ret = new Int32Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_newwithbyteoffsetandlength_6da8e527659b86aa = function(arg0, arg1, arg2) {
        const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_8125e318e6245eed = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_5cf90238115182c3 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_72e2208bbc0efc61 = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_newwithlength_e5d69174d6984cd7 = function(arg0) {
        const ret = new Uint8Array(arg0 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_subarray_13db269f57aa838d = function(arg0, arg1, arg2) {
        const ret = getObject(arg0).subarray(arg1 >>> 0, arg2 >>> 0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stringify_e25465938f3f611f = function() { return handleError(function (arg0) {
        const ret = JSON.stringify(getObject(arg0));
        return addHeapObject(ret);
    }, arguments) };
    imports.wbg.__wbg_has_c5fcd020291e56b8 = function() { return handleError(function (arg0, arg1) {
        const ret = Reflect.has(getObject(arg0), getObject(arg1));
        return ret;
    }, arguments) };
    imports.wbg.__wbg_set_092e06b0f9d71865 = function() { return handleError(function (arg0, arg1, arg2) {
        const ret = Reflect.set(getObject(arg0), getObject(arg1), getObject(arg2));
        return ret;
    }, arguments) };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_rethrow = function(arg0) {
        throw takeObject(arg0);
    };
    imports.wbg.__wbindgen_module = function() {
        const ret = __wbg_init.__wbindgen_wasm_module;
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_startWorkers_6fd3af285ea11136 = function(arg0, arg1, arg2) {
        const ret = (0,_snippets_wasm_bindgen_rayon_7afa899f36665473_src_workerHelpers_js__WEBPACK_IMPORTED_MODULE_0__.startWorkers)(takeObject(arg0), takeObject(arg1), wbg_rayon_PoolBuilder.__wrap(arg2));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper6226 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 968, __wbg_adapter_32);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_closure_wrapper6227 = function(arg0, arg1, arg2) {
        const ret = makeMutClosure(arg0, arg1, 968, __wbg_adapter_32);
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_init_memory(imports, maybe_memory) {
    imports.wbg.memory = maybe_memory || new WebAssembly.Memory({initial:122,maximum:65536,shared:true});
}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedInt32Memory0 = null;
    cachedUint8Memory0 = null;

    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module, maybe_memory) {
    if (wasm !== undefined) return wasm;

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports, maybe_memory);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(input, maybe_memory) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL(/* asset import */ __webpack_require__(/*! aleo_wasm_bg.wasm */ "./pkg/aleo-wasm/aleo_wasm_bg.wasm"), __webpack_require__.b);
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    __wbg_init_memory(imports, maybe_memory);

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__wbg_init);


/***/ }),

/***/ "./pkg/aleo-wasm/aleo_wasm_bg.wasm":
/*!*****************************************!*\
  !*** ./pkg/aleo-wasm/aleo_wasm_bg.wasm ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "ccaacfd0eb09cfa154b0.wasm";

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGtnX2FsZW8td2FzbV9hbGVvX3dhc21fanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBbUc7QUFDbkc7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkZBQTJGLDhCQUE4QixNQUFNLGdCQUFnQiw2Q0FBNkM7QUFDNUw7QUFDQSwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDZGQUE2RixnQkFBZ0IsNkNBQTZDO0FBQzFKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsY0FBYztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixJQUFJO0FBQ3ZCO0FBQ0E7QUFDQSxtQkFBbUIsSUFBSTtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLDZCQUE2QixZQUFZO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsS0FBSztBQUNwQyxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsWUFBWTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixTQUFTLElBQUksWUFBWSxJQUFJLFVBQVU7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxXQUFXO0FBQzNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLFVBQVUsUUFBUTtBQUNsQixZQUFZO0FBQ1o7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCLFVBQVUsUUFBUTtBQUNsQixVQUFVLFFBQVE7QUFDbEIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLFFBQVE7QUFDbEIsWUFBWTtBQUNaO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxRQUFRO0FBQ2xCO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxTQUFTO0FBQ3ZCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQixjQUFjLFdBQVc7QUFDekIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsY0FBYyxjQUFjO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZO0FBQzFCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLHNCQUFzQjtBQUNwQyxjQUFjLFFBQVE7QUFDdEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixjQUFjLHdCQUF3QjtBQUN0QyxjQUFjLDBCQUEwQjtBQUN4QyxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsaUJBQWlCO0FBQy9CLGNBQWMsUUFBUTtBQUN0QixjQUFjLFNBQVM7QUFDdkIsY0FBYyx3QkFBd0I7QUFDdEMsY0FBYywwQkFBMEI7QUFDeEMsY0FBYyx3QkFBd0I7QUFDdEMsY0FBYywwQkFBMEI7QUFDeEMsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLDZCQUE2QjtBQUMzQyxjQUFjLFFBQVE7QUFDdEIsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixjQUFjLHdCQUF3QjtBQUN0QyxjQUFjLDBCQUEwQjtBQUN4QyxjQUFjLHdCQUF3QjtBQUN0QyxjQUFjLDBCQUEwQjtBQUN4QyxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsUUFBUTtBQUN0QixjQUFjLFlBQVk7QUFDMUIsY0FBYyxTQUFTO0FBQ3ZCLGNBQWMsd0JBQXdCO0FBQ3RDLGNBQWMsMEJBQTBCO0FBQ3hDLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsWUFBWTtBQUMxQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixjQUFjLHdCQUF3QjtBQUN0QyxjQUFjLDBCQUEwQjtBQUN4QyxjQUFjLHdCQUF3QjtBQUN0QyxjQUFjLDBCQUEwQjtBQUN4QyxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksbUZBQW1GO0FBQy9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZO0FBQzFCLGNBQWMsUUFBUTtBQUN0QixjQUFjLG9CQUFvQjtBQUNsQyxjQUFjLFFBQVE7QUFDdEIsY0FBYyxpQkFBaUI7QUFDL0IsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsU0FBUztBQUN2QixjQUFjLHdCQUF3QjtBQUN0QyxjQUFjLDBCQUEwQjtBQUN4QyxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGNBQWMsWUFBWTtBQUMxQixjQUFjLGNBQWM7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixjQUFjLFFBQVE7QUFDdEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsU0FBUztBQUN2QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsWUFBWTtBQUMxQixjQUFjLFFBQVE7QUFDdEIsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFlBQVk7QUFDMUIsY0FBYyxZQUFZO0FBQzFCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFNBQVM7QUFDdkIsY0FBYyxZQUFZO0FBQzFCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxRQUFRO0FBQ3RCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZO0FBQzFCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZO0FBQzFCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsUUFBUTtBQUN0QixnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFFBQVE7QUFDdEIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0EsS0FBSztBQUNMLDZEQUE2RDtBQUM3RDtBQUNBLEtBQUs7QUFDTCw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBLEtBQUs7QUFDTCwrREFBK0Q7QUFDL0Q7QUFDQTtBQUNBLEtBQUs7QUFDTCxtRUFBbUU7QUFDbkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBLEtBQUs7QUFDTCwyREFBMkQ7QUFDM0Q7QUFDQSxLQUFLO0FBQ0wsdUVBQXVFO0FBQ3ZFO0FBQ0EsS0FBSztBQUNMLDJEQUEyRDtBQUMzRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWtFO0FBQ2xFO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0U7QUFDeEU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBLEtBQUs7QUFDTCxrRUFBa0U7QUFDbEU7QUFDQSxLQUFLO0FBQ0wsc0VBQXNFO0FBQ3RFO0FBQ0EsS0FBSztBQUNMLHFFQUFxRTtBQUNyRTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOERBQThEO0FBQzlEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBEQUEwRDtBQUMxRDtBQUNBO0FBQ0EsS0FBSztBQUNMLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsNkRBQTZEO0FBQzdEO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsaUVBQWlFO0FBQ2pFO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsNkRBQTZEO0FBQzdELG9CQUFvQixxQkFBTTtBQUMxQjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkRBQTJEO0FBQzNEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEU7QUFDQTtBQUNBLEtBQUs7QUFDTCwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBLEtBQUs7QUFDTCwwREFBMEQ7QUFDMUQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixnSEFBWTtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsc0NBQXNDO0FBQ3ZHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkhBQW9DO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksbUJBQW1CO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ21CO0FBQ25CLGlFQUFlLFVBQVUsRUFBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3JlYWN0LXJ1c3QtY2hyb21lLWV4dGVuc2lvbi8uL3BrZy9hbGVvLXdhc20vYWxlb193YXNtLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHN0YXJ0V29ya2VycyB9IGZyb20gJy4vc25pcHBldHMvd2FzbS1iaW5kZ2VuLXJheW9uLTdhZmE4OTlmMzY2NjU0NzMvc3JjL3dvcmtlckhlbHBlcnMuanMnO1xyXG5cclxubGV0IHdhc207XHJcblxyXG5jb25zdCBoZWFwID0gbmV3IEFycmF5KDEyOCkuZmlsbCh1bmRlZmluZWQpO1xyXG5cclxuaGVhcC5wdXNoKHVuZGVmaW5lZCwgbnVsbCwgdHJ1ZSwgZmFsc2UpO1xyXG5cclxuZnVuY3Rpb24gZ2V0T2JqZWN0KGlkeCkgeyByZXR1cm4gaGVhcFtpZHhdOyB9XHJcblxyXG5sZXQgaGVhcF9uZXh0ID0gaGVhcC5sZW5ndGg7XHJcblxyXG5mdW5jdGlvbiBkcm9wT2JqZWN0KGlkeCkge1xyXG4gICAgaWYgKGlkeCA8IDEzMikgcmV0dXJuO1xyXG4gICAgaGVhcFtpZHhdID0gaGVhcF9uZXh0O1xyXG4gICAgaGVhcF9uZXh0ID0gaWR4O1xyXG59XHJcblxyXG5mdW5jdGlvbiB0YWtlT2JqZWN0KGlkeCkge1xyXG4gICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGlkeCk7XHJcbiAgICBkcm9wT2JqZWN0KGlkeCk7XHJcbiAgICByZXR1cm4gcmV0O1xyXG59XHJcblxyXG5jb25zdCBjYWNoZWRUZXh0RGVjb2RlciA9ICh0eXBlb2YgVGV4dERlY29kZXIgIT09ICd1bmRlZmluZWQnID8gbmV3IFRleHREZWNvZGVyKCd1dGYtOCcsIHsgaWdub3JlQk9NOiB0cnVlLCBmYXRhbDogdHJ1ZSB9KSA6IHsgZGVjb2RlOiAoKSA9PiB7IHRocm93IEVycm9yKCdUZXh0RGVjb2RlciBub3QgYXZhaWxhYmxlJykgfSB9ICk7XHJcblxyXG5pZiAodHlwZW9mIFRleHREZWNvZGVyICE9PSAndW5kZWZpbmVkJykgeyBjYWNoZWRUZXh0RGVjb2Rlci5kZWNvZGUoKTsgfTtcclxuXHJcbmxldCBjYWNoZWRVaW50OE1lbW9yeTAgPSBudWxsO1xyXG5cclxuZnVuY3Rpb24gZ2V0VWludDhNZW1vcnkwKCkge1xyXG4gICAgaWYgKGNhY2hlZFVpbnQ4TWVtb3J5MCA9PT0gbnVsbCB8fCBjYWNoZWRVaW50OE1lbW9yeTAuYnVmZmVyICE9PSB3YXNtLm1lbW9yeS5idWZmZXIpIHtcclxuICAgICAgICBjYWNoZWRVaW50OE1lbW9yeTAgPSBuZXcgVWludDhBcnJheSh3YXNtLm1lbW9yeS5idWZmZXIpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGNhY2hlZFVpbnQ4TWVtb3J5MDtcclxufVxyXG5cclxuZnVuY3Rpb24gZ2V0U3RyaW5nRnJvbVdhc20wKHB0ciwgbGVuKSB7XHJcbiAgICBwdHIgPSBwdHIgPj4+IDA7XHJcbiAgICByZXR1cm4gY2FjaGVkVGV4dERlY29kZXIuZGVjb2RlKGdldFVpbnQ4TWVtb3J5MCgpLnNsaWNlKHB0ciwgcHRyICsgbGVuKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGFkZEhlYXBPYmplY3Qob2JqKSB7XHJcbiAgICBpZiAoaGVhcF9uZXh0ID09PSBoZWFwLmxlbmd0aCkgaGVhcC5wdXNoKGhlYXAubGVuZ3RoICsgMSk7XHJcbiAgICBjb25zdCBpZHggPSBoZWFwX25leHQ7XHJcbiAgICBoZWFwX25leHQgPSBoZWFwW2lkeF07XHJcblxyXG4gICAgaGVhcFtpZHhdID0gb2JqO1xyXG4gICAgcmV0dXJuIGlkeDtcclxufVxyXG5cclxubGV0IFdBU01fVkVDVE9SX0xFTiA9IDA7XHJcblxyXG5jb25zdCBjYWNoZWRUZXh0RW5jb2RlciA9ICh0eXBlb2YgVGV4dEVuY29kZXIgIT09ICd1bmRlZmluZWQnID8gbmV3IFRleHRFbmNvZGVyKCd1dGYtOCcpIDogeyBlbmNvZGU6ICgpID0+IHsgdGhyb3cgRXJyb3IoJ1RleHRFbmNvZGVyIG5vdCBhdmFpbGFibGUnKSB9IH0gKTtcclxuXHJcbmNvbnN0IGVuY29kZVN0cmluZyA9IGZ1bmN0aW9uIChhcmcsIHZpZXcpIHtcclxuICAgIGNvbnN0IGJ1ZiA9IGNhY2hlZFRleHRFbmNvZGVyLmVuY29kZShhcmcpO1xyXG4gICAgdmlldy5zZXQoYnVmKTtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVhZDogYXJnLmxlbmd0aCxcclxuICAgICAgICB3cml0dGVuOiBidWYubGVuZ3RoXHJcbiAgICB9O1xyXG59O1xyXG5cclxuZnVuY3Rpb24gcGFzc1N0cmluZ1RvV2FzbTAoYXJnLCBtYWxsb2MsIHJlYWxsb2MpIHtcclxuXHJcbiAgICBpZiAocmVhbGxvYyA9PT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgY29uc3QgYnVmID0gY2FjaGVkVGV4dEVuY29kZXIuZW5jb2RlKGFyZyk7XHJcbiAgICAgICAgY29uc3QgcHRyID0gbWFsbG9jKGJ1Zi5sZW5ndGgsIDEpID4+PiAwO1xyXG4gICAgICAgIGdldFVpbnQ4TWVtb3J5MCgpLnN1YmFycmF5KHB0ciwgcHRyICsgYnVmLmxlbmd0aCkuc2V0KGJ1Zik7XHJcbiAgICAgICAgV0FTTV9WRUNUT1JfTEVOID0gYnVmLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gcHRyO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBsZW4gPSBhcmcubGVuZ3RoO1xyXG4gICAgbGV0IHB0ciA9IG1hbGxvYyhsZW4sIDEpID4+PiAwO1xyXG5cclxuICAgIGNvbnN0IG1lbSA9IGdldFVpbnQ4TWVtb3J5MCgpO1xyXG5cclxuICAgIGxldCBvZmZzZXQgPSAwO1xyXG5cclxuICAgIGZvciAoOyBvZmZzZXQgPCBsZW47IG9mZnNldCsrKSB7XHJcbiAgICAgICAgY29uc3QgY29kZSA9IGFyZy5jaGFyQ29kZUF0KG9mZnNldCk7XHJcbiAgICAgICAgaWYgKGNvZGUgPiAweDdGKSBicmVhaztcclxuICAgICAgICBtZW1bcHRyICsgb2Zmc2V0XSA9IGNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG9mZnNldCAhPT0gbGVuKSB7XHJcbiAgICAgICAgaWYgKG9mZnNldCAhPT0gMCkge1xyXG4gICAgICAgICAgICBhcmcgPSBhcmcuc2xpY2Uob2Zmc2V0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcHRyID0gcmVhbGxvYyhwdHIsIGxlbiwgbGVuID0gb2Zmc2V0ICsgYXJnLmxlbmd0aCAqIDMsIDEpID4+PiAwO1xyXG4gICAgICAgIGNvbnN0IHZpZXcgPSBnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIgKyBvZmZzZXQsIHB0ciArIGxlbik7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZW5jb2RlU3RyaW5nKGFyZywgdmlldyk7XHJcblxyXG4gICAgICAgIG9mZnNldCArPSByZXQud3JpdHRlbjtcclxuICAgIH1cclxuXHJcbiAgICBXQVNNX1ZFQ1RPUl9MRU4gPSBvZmZzZXQ7XHJcbiAgICByZXR1cm4gcHRyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBpc0xpa2VOb25lKHgpIHtcclxuICAgIHJldHVybiB4ID09PSB1bmRlZmluZWQgfHwgeCA9PT0gbnVsbDtcclxufVxyXG5cclxubGV0IGNhY2hlZEludDMyTWVtb3J5MCA9IG51bGw7XHJcblxyXG5mdW5jdGlvbiBnZXRJbnQzMk1lbW9yeTAoKSB7XHJcbiAgICBpZiAoY2FjaGVkSW50MzJNZW1vcnkwID09PSBudWxsIHx8IGNhY2hlZEludDMyTWVtb3J5MC5idWZmZXIgIT09IHdhc20ubWVtb3J5LmJ1ZmZlcikge1xyXG4gICAgICAgIGNhY2hlZEludDMyTWVtb3J5MCA9IG5ldyBJbnQzMkFycmF5KHdhc20ubWVtb3J5LmJ1ZmZlcik7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gY2FjaGVkSW50MzJNZW1vcnkwO1xyXG59XHJcblxyXG5mdW5jdGlvbiBkZWJ1Z1N0cmluZyh2YWwpIHtcclxuICAgIC8vIHByaW1pdGl2ZSB0eXBlc1xyXG4gICAgY29uc3QgdHlwZSA9IHR5cGVvZiB2YWw7XHJcbiAgICBpZiAodHlwZSA9PSAnbnVtYmVyJyB8fCB0eXBlID09ICdib29sZWFuJyB8fCB2YWwgPT0gbnVsbCkge1xyXG4gICAgICAgIHJldHVybiAgYCR7dmFsfWA7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZSA9PSAnc3RyaW5nJykge1xyXG4gICAgICAgIHJldHVybiBgXCIke3ZhbH1cImA7XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZSA9PSAnc3ltYm9sJykge1xyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gdmFsLmRlc2NyaXB0aW9uO1xyXG4gICAgICAgIGlmIChkZXNjcmlwdGlvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnU3ltYm9sJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gYFN5bWJvbCgke2Rlc2NyaXB0aW9ufSlgO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGlmICh0eXBlID09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICBjb25zdCBuYW1lID0gdmFsLm5hbWU7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBuYW1lID09ICdzdHJpbmcnICYmIG5hbWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByZXR1cm4gYEZ1bmN0aW9uKCR7bmFtZX0pYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXR1cm4gJ0Z1bmN0aW9uJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLyBvYmplY3RzXHJcbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWwpKSB7XHJcbiAgICAgICAgY29uc3QgbGVuZ3RoID0gdmFsLmxlbmd0aDtcclxuICAgICAgICBsZXQgZGVidWcgPSAnWyc7XHJcbiAgICAgICAgaWYgKGxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgZGVidWcgKz0gZGVidWdTdHJpbmcodmFsWzBdKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yKGxldCBpID0gMTsgaSA8IGxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGRlYnVnICs9ICcsICcgKyBkZWJ1Z1N0cmluZyh2YWxbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWJ1ZyArPSAnXSc7XHJcbiAgICAgICAgcmV0dXJuIGRlYnVnO1xyXG4gICAgfVxyXG4gICAgLy8gVGVzdCBmb3IgYnVpbHQtaW5cclxuICAgIGNvbnN0IGJ1aWx0SW5NYXRjaGVzID0gL1xcW29iamVjdCAoW15cXF1dKylcXF0vLmV4ZWModG9TdHJpbmcuY2FsbCh2YWwpKTtcclxuICAgIGxldCBjbGFzc05hbWU7XHJcbiAgICBpZiAoYnVpbHRJbk1hdGNoZXMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgIGNsYXNzTmFtZSA9IGJ1aWx0SW5NYXRjaGVzWzFdO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBGYWlsZWQgdG8gbWF0Y2ggdGhlIHN0YW5kYXJkICdbb2JqZWN0IENsYXNzTmFtZV0nXHJcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKTtcclxuICAgIH1cclxuICAgIGlmIChjbGFzc05hbWUgPT0gJ09iamVjdCcpIHtcclxuICAgICAgICAvLyB3ZSdyZSBhIHVzZXIgZGVmaW5lZCBjbGFzcyBvciBPYmplY3RcclxuICAgICAgICAvLyBKU09OLnN0cmluZ2lmeSBhdm9pZHMgcHJvYmxlbXMgd2l0aCBjeWNsZXMsIGFuZCBpcyBnZW5lcmFsbHkgbXVjaFxyXG4gICAgICAgIC8vIGVhc2llciB0aGFuIGxvb3BpbmcgdGhyb3VnaCBvd25Qcm9wZXJ0aWVzIG9mIGB2YWxgLlxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiAnT2JqZWN0KCcgKyBKU09OLnN0cmluZ2lmeSh2YWwpICsgJyknO1xyXG4gICAgICAgIH0gY2F0Y2ggKF8pIHtcclxuICAgICAgICAgICAgcmV0dXJuICdPYmplY3QnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8vIGVycm9yc1xyXG4gICAgaWYgKHZhbCBpbnN0YW5jZW9mIEVycm9yKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3ZhbC5uYW1lfTogJHt2YWwubWVzc2FnZX1cXG4ke3ZhbC5zdGFja31gO1xyXG4gICAgfVxyXG4gICAgLy8gVE9ETyB3ZSBjb3VsZCB0ZXN0IGZvciBtb3JlIHRoaW5ncyBoZXJlLCBsaWtlIGBTZXRgcyBhbmQgYE1hcGBzLlxyXG4gICAgcmV0dXJuIGNsYXNzTmFtZTtcclxufVxyXG5cclxuZnVuY3Rpb24gbWFrZU11dENsb3N1cmUoYXJnMCwgYXJnMSwgZHRvciwgZikge1xyXG4gICAgY29uc3Qgc3RhdGUgPSB7IGE6IGFyZzAsIGI6IGFyZzEsIGNudDogMSwgZHRvciB9O1xyXG4gICAgY29uc3QgcmVhbCA9ICguLi5hcmdzKSA9PiB7XHJcbiAgICAgICAgLy8gRmlyc3QgdXAgd2l0aCBhIGNsb3N1cmUgd2UgaW5jcmVtZW50IHRoZSBpbnRlcm5hbCByZWZlcmVuY2VcclxuICAgICAgICAvLyBjb3VudC4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIFJ1c3QgY2xvc3VyZSBlbnZpcm9ubWVudCB3b24ndFxyXG4gICAgICAgIC8vIGJlIGRlYWxsb2NhdGVkIHdoaWxlIHdlJ3JlIGludm9raW5nIGl0LlxyXG4gICAgICAgIHN0YXRlLmNudCsrO1xyXG4gICAgICAgIGNvbnN0IGEgPSBzdGF0ZS5hO1xyXG4gICAgICAgIHN0YXRlLmEgPSAwO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmKGEsIHN0YXRlLmIsIC4uLmFyZ3MpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIGlmICgtLXN0YXRlLmNudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2V4cG9ydF8zLmdldChzdGF0ZS5kdG9yKShhLCBzdGF0ZS5iKTtcclxuXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS5hID0gYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICByZWFsLm9yaWdpbmFsID0gc3RhdGU7XHJcblxyXG4gICAgcmV0dXJuIHJlYWw7XHJcbn1cclxuZnVuY3Rpb24gX193YmdfYWRhcHRlcl8zMihhcmcwLCBhcmcxLCBhcmcyKSB7XHJcbiAgICB3YXNtLl9keW5fY29yZV9fb3BzX19mdW5jdGlvbl9fRm5NdXRfX0FfX19fT3V0cHV0X19fUl9hc193YXNtX2JpbmRnZW5fX2Nsb3N1cmVfX1dhc21DbG9zdXJlX19fZGVzY3JpYmVfX2ludm9rZV9faGNjYjhmMmU2YjI5MDU0ZDEoYXJnMCwgYXJnMSwgYWRkSGVhcE9iamVjdChhcmcyKSk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9hc3NlcnRDbGFzcyhpbnN0YW5jZSwga2xhc3MpIHtcclxuICAgIGlmICghKGluc3RhbmNlIGluc3RhbmNlb2Yga2xhc3MpKSB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBleHBlY3RlZCBpbnN0YW5jZSBvZiAke2tsYXNzLm5hbWV9YCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gaW5zdGFuY2UucHRyO1xyXG59XHJcblxyXG5mdW5jdGlvbiBwYXNzQXJyYXk4VG9XYXNtMChhcmcsIG1hbGxvYykge1xyXG4gICAgY29uc3QgcHRyID0gbWFsbG9jKGFyZy5sZW5ndGggKiAxLCAxKSA+Pj4gMDtcclxuICAgIGdldFVpbnQ4TWVtb3J5MCgpLnNldChhcmcsIHB0ciAvIDEpO1xyXG4gICAgV0FTTV9WRUNUT1JfTEVOID0gYXJnLmxlbmd0aDtcclxuICAgIHJldHVybiBwdHI7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGdldEFycmF5VThGcm9tV2FzbTAocHRyLCBsZW4pIHtcclxuICAgIHB0ciA9IHB0ciA+Pj4gMDtcclxuICAgIHJldHVybiBnZXRVaW50OE1lbW9yeTAoKS5zdWJhcnJheShwdHIgLyAxLCBwdHIgLyAxICsgbGVuKTtcclxufVxyXG4vKipcclxuKiBAcGFyYW0ge3N0cmluZ30gaW5wdXRcclxuKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uXHJcbiogQHJldHVybnMge3N0cmluZ31cclxuKi9cclxuZXhwb3J0IGZ1bmN0aW9uIGJhc2U1OChpbnB1dCwgYWN0aW9uKSB7XHJcbiAgICBsZXQgZGVmZXJyZWQ0XzA7XHJcbiAgICBsZXQgZGVmZXJyZWQ0XzE7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChpbnB1dCwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgY29uc3QgcHRyMSA9IHBhc3NTdHJpbmdUb1dhc20wKGFjdGlvbiwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjEgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgd2FzbS5iYXNlNTgocmV0cHRyLCBwdHIwLCBsZW4wLCBwdHIxLCBsZW4xKTtcclxuICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgIHZhciByMiA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAyXTtcclxuICAgICAgICB2YXIgcjMgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgM107XHJcbiAgICAgICAgdmFyIHB0cjMgPSByMDtcclxuICAgICAgICB2YXIgbGVuMyA9IHIxO1xyXG4gICAgICAgIGlmIChyMykge1xyXG4gICAgICAgICAgICBwdHIzID0gMDsgbGVuMyA9IDA7XHJcbiAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZlcnJlZDRfMCA9IHB0cjM7XHJcbiAgICAgICAgZGVmZXJyZWQ0XzEgPSBsZW4zO1xyXG4gICAgICAgIHJldHVybiBnZXRTdHJpbmdGcm9tV2FzbTAocHRyMywgbGVuMyk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUoZGVmZXJyZWQ0XzAsIGRlZmVycmVkNF8xLCAxKTtcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiogQHBhcmFtIHtzdHJpbmd9IGlucHV0XHJcbiogQHBhcmFtIHtzdHJpbmd9IGJocHR5cGVcclxuKiBAcGFyYW0ge3N0cmluZ30gZGVzdGluYXRpb25fdHlwZVxyXG4qIEByZXR1cm5zIHtzdHJpbmd9XHJcbiovXHJcbmV4cG9ydCBmdW5jdGlvbiBoYXNoQkhQKGlucHV0LCBiaHB0eXBlLCBkZXN0aW5hdGlvbl90eXBlKSB7XHJcbiAgICBsZXQgZGVmZXJyZWQ1XzA7XHJcbiAgICBsZXQgZGVmZXJyZWQ1XzE7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChpbnB1dCwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgY29uc3QgcHRyMSA9IHBhc3NTdHJpbmdUb1dhc20wKGJocHR5cGUsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICBjb25zdCBsZW4xID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgIGNvbnN0IHB0cjIgPSBwYXNzU3RyaW5nVG9XYXNtMChkZXN0aW5hdGlvbl90eXBlLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgY29uc3QgbGVuMiA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICB3YXNtLmhhc2hCSFAocmV0cHRyLCBwdHIwLCBsZW4wLCBwdHIxLCBsZW4xLCBwdHIyLCBsZW4yKTtcclxuICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgIHZhciByMiA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAyXTtcclxuICAgICAgICB2YXIgcjMgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgM107XHJcbiAgICAgICAgdmFyIHB0cjQgPSByMDtcclxuICAgICAgICB2YXIgbGVuNCA9IHIxO1xyXG4gICAgICAgIGlmIChyMykge1xyXG4gICAgICAgICAgICBwdHI0ID0gMDsgbGVuNCA9IDA7XHJcbiAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBkZWZlcnJlZDVfMCA9IHB0cjQ7XHJcbiAgICAgICAgZGVmZXJyZWQ1XzEgPSBsZW40O1xyXG4gICAgICAgIHJldHVybiBnZXRTdHJpbmdGcm9tV2FzbTAocHRyNCwgbGVuNCk7XHJcbiAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUoZGVmZXJyZWQ1XzAsIGRlZmVycmVkNV8xLCAxKTtcclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gaGFuZGxlRXJyb3IoZiwgYXJncykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICByZXR1cm4gZi5hcHBseSh0aGlzLCBhcmdzKTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZXhuX3N0b3JlKGFkZEhlYXBPYmplY3QoZSkpO1xyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIF9fd2JnX2FkYXB0ZXJfMjE5KGFyZzAsIGFyZzEsIGFyZzIsIGFyZzMpIHtcclxuICAgIHdhc20ud2FzbV9iaW5kZ2VuX19jb252ZXJ0X19jbG9zdXJlc19faW52b2tlMl9tdXRfX2gzMWFiMTFiNjkyYjc3NDM4KGFyZzAsIGFyZzEsIGFkZEhlYXBPYmplY3QoYXJnMiksIGFkZEhlYXBPYmplY3QoYXJnMykpO1xyXG59XHJcblxyXG4vKipcclxuKiBAcGFyYW0ge251bWJlcn0gbnVtX3RocmVhZHNcclxuKiBAcmV0dXJucyB7UHJvbWlzZTxhbnk+fVxyXG4qL1xyXG5leHBvcnQgZnVuY3Rpb24gaW5pdFRocmVhZFBvb2wobnVtX3RocmVhZHMpIHtcclxuICAgIGNvbnN0IHJldCA9IHdhc20uaW5pdFRocmVhZFBvb2wobnVtX3RocmVhZHMpO1xyXG4gICAgcmV0dXJuIHRha2VPYmplY3QocmV0KTtcclxufVxyXG5cclxuLyoqXHJcbiogQHBhcmFtIHtudW1iZXJ9IHJlY2VpdmVyXHJcbiovXHJcbmV4cG9ydCBmdW5jdGlvbiB3YmdfcmF5b25fc3RhcnRfd29ya2VyKHJlY2VpdmVyKSB7XHJcbiAgICB3YXNtLndiZ19yYXlvbl9zdGFydF93b3JrZXIocmVjZWl2ZXIpO1xyXG59XHJcblxyXG4vKipcclxuKi9cclxuZXhwb3J0IGNsYXNzIEFkZHJlc3Mge1xyXG5cclxuICAgIHN0YXRpYyBfX3dyYXAocHRyKSB7XHJcbiAgICAgICAgcHRyID0gcHRyID4+PiAwO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUoQWRkcmVzcy5wcm90b3R5cGUpO1xyXG4gICAgICAgIG9iai5fX3diZ19wdHIgPSBwdHI7XHJcblxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX193YmdfcHRyO1xyXG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHB0cjtcclxuICAgIH1cclxuXHJcbiAgICBmcmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgd2FzbS5fX3diZ19hZGRyZXNzX2ZyZWUocHRyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBAcGFyYW0ge1ByaXZhdGVLZXl9IHByaXZhdGVfa2V5XHJcbiAgICAqIEByZXR1cm5zIHtBZGRyZXNzfVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBmcm9tX3ByaXZhdGVfa2V5KHByaXZhdGVfa2V5KSB7XHJcbiAgICAgICAgX2Fzc2VydENsYXNzKHByaXZhdGVfa2V5LCBQcml2YXRlS2V5KTtcclxuICAgICAgICBjb25zdCByZXQgPSB3YXNtLmFkZHJlc3NfZnJvbV9wcml2YXRlX2tleShwcml2YXRlX2tleS5fX3diZ19wdHIpO1xyXG4gICAgICAgIHJldHVybiBBZGRyZXNzLl9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEBwYXJhbSB7Vmlld0tleX0gdmlld19rZXlcclxuICAgICogQHJldHVybnMge0FkZHJlc3N9XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGZyb21fdmlld19rZXkodmlld19rZXkpIHtcclxuICAgICAgICBfYXNzZXJ0Q2xhc3Modmlld19rZXksIFZpZXdLZXkpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20uYWRkcmVzc19mcm9tX3ZpZXdfa2V5KHZpZXdfa2V5Ll9fd2JnX3B0cik7XHJcbiAgICAgICAgcmV0dXJuIEFkZHJlc3MuX193cmFwKHJldCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGFkZHJlc3NcclxuICAgICogQHJldHVybnMge0FkZHJlc3N9XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGZyb21fc3RyaW5nKGFkZHJlc3MpIHtcclxuICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAoYWRkcmVzcywgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5hZGRyZXNzX2Zyb21fc3RyaW5nKHB0cjAsIGxlbjApO1xyXG4gICAgICAgIHJldHVybiBBZGRyZXNzLl9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgdG9fc3RyaW5nKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDFfMDtcclxuICAgICAgICBsZXQgZGVmZXJyZWQxXzE7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIHdhc20uYWRkcmVzc190b19zdHJpbmcocmV0cHRyLCB0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDFfMCA9IHIwO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDFfMSA9IHIxO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0U3RyaW5nRnJvbVdhc20wKHIwLCByMSk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUoZGVmZXJyZWQxXzAsIGRlZmVycmVkMV8xLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtVaW50OEFycmF5fSBtZXNzYWdlXHJcbiAgICAqIEBwYXJhbSB7U2lnbmF0dXJlfSBzaWduYXR1cmVcclxuICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAqL1xyXG4gICAgdmVyaWZ5KG1lc3NhZ2UsIHNpZ25hdHVyZSkge1xyXG4gICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzQXJyYXk4VG9XYXNtMChtZXNzYWdlLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jKTtcclxuICAgICAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgIF9hc3NlcnRDbGFzcyhzaWduYXR1cmUsIFNpZ25hdHVyZSk7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5hZGRyZXNzX3ZlcmlmeSh0aGlzLl9fd2JnX3B0ciwgcHRyMCwgbGVuMCwgc2lnbmF0dXJlLl9fd2JnX3B0cik7XHJcbiAgICAgICAgcmV0dXJuIHJldCAhPT0gMDtcclxuICAgIH1cclxufVxyXG4vKipcclxuKiBXZWJhc3NlbWJseSBSZXByZXNlbnRhdGlvbiBvZiBhbiBBbGVvIGZ1bmN0aW9uIGV4ZWN1dGlvbiByZXNwb25zZVxyXG4qXHJcbiogVGhpcyBvYmplY3QgaXMgcmV0dXJuZWQgYnkgdGhlIGV4ZWN1dGlvbiBvZiBhbiBBbGVvIGZ1bmN0aW9uIG9mZi1jaGFpbi4gSXQgcHJvdmlkZXMgbWV0aG9kcyBmb3JcclxuKiByZXRyaWV2aW5nIHRoZSBvdXRwdXRzIG9mIHRoZSBmdW5jdGlvbiBleGVjdXRpb24uXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBFeGVjdXRpb25SZXNwb25zZSB7XHJcblxyXG4gICAgc3RhdGljIF9fd3JhcChwdHIpIHtcclxuICAgICAgICBwdHIgPSBwdHIgPj4+IDA7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShFeGVjdXRpb25SZXNwb25zZS5wcm90b3R5cGUpO1xyXG4gICAgICAgIG9iai5fX3diZ19wdHIgPSBwdHI7XHJcblxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX193YmdfcHRyO1xyXG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHB0cjtcclxuICAgIH1cclxuXHJcbiAgICBmcmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgd2FzbS5fX3diZ19leGVjdXRpb25yZXNwb25zZV9mcmVlKHB0cik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBvdXRwdXRzIG9mIHRoZSBleGVjdXRlZCBmdW5jdGlvblxyXG4gICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICovXHJcbiAgICBnZXRPdXRwdXRzKCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20uZXhlY3V0aW9ucmVzcG9uc2VfZ2V0T3V0cHV0cyh0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgcmV0dXJuIHRha2VPYmplY3QocmV0KTtcclxuICAgIH1cclxufVxyXG4vKipcclxuKi9cclxuZXhwb3J0IGNsYXNzIEtleVBhaXIge1xyXG5cclxuICAgIHN0YXRpYyBfX3dyYXAocHRyKSB7XHJcbiAgICAgICAgcHRyID0gcHRyID4+PiAwO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUoS2V5UGFpci5wcm90b3R5cGUpO1xyXG4gICAgICAgIG9iai5fX3diZ19wdHIgPSBwdHI7XHJcblxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX193YmdfcHRyO1xyXG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHB0cjtcclxuICAgIH1cclxuXHJcbiAgICBmcmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgd2FzbS5fX3diZ19rZXlwYWlyX2ZyZWUocHRyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBDcmVhdGUgbmV3IGtleSBwYWlyIGZyb20gcHJvdmluZyBhbmQgdmVyaWZ5aW5nIGtleXNcclxuICAgICogQHBhcmFtIHtQcm92aW5nS2V5fSBwcm92aW5nX2tleVxyXG4gICAgKiBAcGFyYW0ge1ZlcmlmeWluZ0tleX0gdmVyaWZ5aW5nX2tleVxyXG4gICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKHByb3Zpbmdfa2V5LCB2ZXJpZnlpbmdfa2V5KSB7XHJcbiAgICAgICAgX2Fzc2VydENsYXNzKHByb3Zpbmdfa2V5LCBQcm92aW5nS2V5KTtcclxuICAgICAgICB2YXIgcHRyMCA9IHByb3Zpbmdfa2V5Ll9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIF9hc3NlcnRDbGFzcyh2ZXJpZnlpbmdfa2V5LCBWZXJpZnlpbmdLZXkpO1xyXG4gICAgICAgIHZhciBwdHIxID0gdmVyaWZ5aW5nX2tleS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICBjb25zdCByZXQgPSB3YXNtLmtleXBhaXJfbmV3KHB0cjAsIHB0cjEpO1xyXG4gICAgICAgIHJldHVybiBLZXlQYWlyLl9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgcHJvdmluZyBrZXlcclxuICAgICogQHJldHVybnMge1Byb3ZpbmdLZXl9XHJcbiAgICAqL1xyXG4gICAgcHJvdmluZ0tleSgpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgd2FzbS5rZXlwYWlyX3Byb3ZpbmdLZXkocmV0cHRyLCB0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIGlmIChyMikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByb3ZpbmdLZXkuX193cmFwKHIwKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHZlcmlmeWluZyBrZXlcclxuICAgICogQHJldHVybnMge1ZlcmlmeWluZ0tleX1cclxuICAgICovXHJcbiAgICB2ZXJpZnlpbmdLZXkoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIHdhc20ua2V5cGFpcl92ZXJpZnlpbmdLZXkocmV0cHRyLCB0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIGlmIChyMikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFZlcmlmeWluZ0tleS5fX3dyYXAocjApO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4qL1xyXG5leHBvcnQgY2xhc3MgUHJpdmF0ZUtleSB7XHJcblxyXG4gICAgc3RhdGljIF9fd3JhcChwdHIpIHtcclxuICAgICAgICBwdHIgPSBwdHIgPj4+IDA7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShQcml2YXRlS2V5LnByb3RvdHlwZSk7XHJcbiAgICAgICAgb2JqLl9fd2JnX3B0ciA9IHB0cjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX3diZ19wdHI7XHJcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gcHRyO1xyXG4gICAgfVxyXG5cclxuICAgIGZyZWUoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICB3YXNtLl9fd2JnX3ByaXZhdGVrZXlfZnJlZShwdHIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdlbmVyYXRlIGEgbmV3IHByaXZhdGUga2V5XHJcbiAgICAqL1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5wcml2YXRla2V5X25ldygpO1xyXG4gICAgICAgIHJldHVybiBQcml2YXRlS2V5Ll9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCBhIHByaXZhdGUga2V5IGZyb20gYSBzZXJpZXMgb2YgdW5jaGVja2VkIGJ5dGVzXHJcbiAgICAqIEBwYXJhbSB7VWludDhBcnJheX0gc2VlZFxyXG4gICAgKiBAcmV0dXJucyB7UHJpdmF0ZUtleX1cclxuICAgICovXHJcbiAgICBzdGF0aWMgZnJvbV9zZWVkX3VuY2hlY2tlZChzZWVkKSB7XHJcbiAgICAgICAgY29uc3QgcHRyMCA9IHBhc3NBcnJheThUb1dhc20wKHNlZWQsIHdhc20uX193YmluZGdlbl9tYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5wcml2YXRla2V5X2Zyb21fc2VlZF91bmNoZWNrZWQocHRyMCwgbGVuMCk7XHJcbiAgICAgICAgcmV0dXJuIFByaXZhdGVLZXkuX193cmFwKHJldCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQ3JlYXRlIGEgcHJpdmF0ZSBrZXkgZnJvbSBhIHN0cmluZyByZXByZXNlbnRhdGlvblxyXG4gICAgKlxyXG4gICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgZmFpbCBpZiB0aGUgdGV4dCBpcyBub3QgYSB2YWxpZCBwcml2YXRlIGtleVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcHJpdmF0ZV9rZXlcclxuICAgICogQHJldHVybnMge1ByaXZhdGVLZXl9XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGZyb21fc3RyaW5nKHByaXZhdGVfa2V5KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChwcml2YXRlX2tleSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgICAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgICAgICB3YXNtLnByaXZhdGVrZXlfZnJvbV9zdHJpbmcocmV0cHRyLCBwdHIwLCBsZW4wKTtcclxuICAgICAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xyXG4gICAgICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XHJcbiAgICAgICAgICAgIHZhciByMiA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAyXTtcclxuICAgICAgICAgICAgaWYgKHIyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0YWtlT2JqZWN0KHIxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJpdmF0ZUtleS5fX3dyYXAocjApO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgcHJpdmF0ZSBrZXlcclxuICAgICpcclxuICAgICogVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgdXNlZCB2ZXJ5IGNhcmVmdWxseSBhcyBpdCBleHBvc2VzIHRoZSBwcml2YXRlIGtleSBwbGFpbnRleHRcclxuICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICovXHJcbiAgICB0b19zdHJpbmcoKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkMV8wO1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDFfMTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgd2FzbS5wcml2YXRla2V5X3RvX3N0cmluZyhyZXRwdHIsIHRoaXMuX193YmdfcHRyKTtcclxuICAgICAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xyXG4gICAgICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XHJcbiAgICAgICAgICAgIGRlZmVycmVkMV8wID0gcjA7XHJcbiAgICAgICAgICAgIGRlZmVycmVkMV8xID0gcjE7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRTdHJpbmdGcm9tV2FzbTAocjAsIHIxKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShkZWZlcnJlZDFfMCwgZGVmZXJyZWQxXzEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHZpZXcga2V5IGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByaXZhdGUga2V5XHJcbiAgICAqIEByZXR1cm5zIHtWaWV3S2V5fVxyXG4gICAgKi9cclxuICAgIHRvX3ZpZXdfa2V5KCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ucHJpdmF0ZWtleV90b192aWV3X2tleSh0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgcmV0dXJuIFZpZXdLZXkuX193cmFwKHJldCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSBhZGRyZXNzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIHByaXZhdGUga2V5XHJcbiAgICAqIEByZXR1cm5zIHtBZGRyZXNzfVxyXG4gICAgKi9cclxuICAgIHRvX2FkZHJlc3MoKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5wcml2YXRla2V5X3RvX2FkZHJlc3ModGhpcy5fX3diZ19wdHIpO1xyXG4gICAgICAgIHJldHVybiBBZGRyZXNzLl9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIFNpZ24gYSBtZXNzYWdlIHdpdGggdGhlIHByaXZhdGUga2V5XHJcbiAgICAqIEBwYXJhbSB7VWludDhBcnJheX0gbWVzc2FnZVxyXG4gICAgKiBAcmV0dXJucyB7U2lnbmF0dXJlfVxyXG4gICAgKi9cclxuICAgIHNpZ24obWVzc2FnZSkge1xyXG4gICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzQXJyYXk4VG9XYXNtMChtZXNzYWdlLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jKTtcclxuICAgICAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ucHJpdmF0ZWtleV9zaWduKHRoaXMuX193YmdfcHRyLCBwdHIwLCBsZW4wKTtcclxuICAgICAgICByZXR1cm4gU2lnbmF0dXJlLl9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCBhIHByaXZhdGUga2V5IGNpcGhlcnRleHQgdXNpbmcgYSBzZWNyZXQuXHJcbiAgICAqXHJcbiAgICAqIFRoZSBzZWNyZXQgaXMgc2Vuc2l0aXZlIGFuZCB3aWxsIGJlIG5lZWRlZCB0byBkZWNyeXB0IHRoZSBwcml2YXRlIGtleSBsYXRlciwgc28gaXQgc2hvdWxkIGJlIHN0b3JlZCBzZWN1cmVseVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc2VjcmV0XHJcbiAgICAqIEByZXR1cm5zIHtQcml2YXRlS2V5Q2lwaGVydGV4dH1cclxuICAgICovXHJcbiAgICBzdGF0aWMgbmV3RW5jcnlwdGVkKHNlY3JldCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAoc2VjcmV0LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgICAgIHdhc20ucHJpdmF0ZWtleV9uZXdFbmNyeXB0ZWQocmV0cHRyLCBwdHIwLCBsZW4wKTtcclxuICAgICAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xyXG4gICAgICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XHJcbiAgICAgICAgICAgIHZhciByMiA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAyXTtcclxuICAgICAgICAgICAgaWYgKHIyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0YWtlT2JqZWN0KHIxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJpdmF0ZUtleUNpcGhlcnRleHQuX193cmFwKHIwKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBFbmNyeXB0IHRoZSBwcml2YXRlIGtleSB3aXRoIGEgc2VjcmV0LlxyXG4gICAgKlxyXG4gICAgKiBUaGUgc2VjcmV0IGlzIHNlbnNpdGl2ZSBhbmQgd2lsbCBiZSBuZWVkZWQgdG8gZGVjcnlwdCB0aGUgcHJpdmF0ZSBrZXkgbGF0ZXIsIHNvIGl0IHNob3VsZCBiZSBzdG9yZWQgc2VjdXJlbHlcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3JldFxyXG4gICAgKiBAcmV0dXJucyB7UHJpdmF0ZUtleUNpcGhlcnRleHR9XHJcbiAgICAqL1xyXG4gICAgdG9DaXBoZXJ0ZXh0KHNlY3JldCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAoc2VjcmV0LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgICAgIHdhc20ucHJpdmF0ZWtleV90b0NpcGhlcnRleHQocmV0cHRyLCB0aGlzLl9fd2JnX3B0ciwgcHRyMCwgbGVuMCk7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIGlmIChyMikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByaXZhdGVLZXlDaXBoZXJ0ZXh0Ll9fd3JhcChyMCk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogR2V0IHByaXZhdGUga2V5IGZyb20gYSBwcml2YXRlIGtleSBjaXBoZXJ0ZXh0IHVzaW5nIGEgc2VjcmV0LlxyXG4gICAgKiBAcGFyYW0ge1ByaXZhdGVLZXlDaXBoZXJ0ZXh0fSBjaXBoZXJ0ZXh0XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWNyZXRcclxuICAgICogQHJldHVybnMge1ByaXZhdGVLZXl9XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGZyb21Qcml2YXRlS2V5Q2lwaGVydGV4dChjaXBoZXJ0ZXh0LCBzZWNyZXQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgX2Fzc2VydENsYXNzKGNpcGhlcnRleHQsIFByaXZhdGVLZXlDaXBoZXJ0ZXh0KTtcclxuICAgICAgICAgICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20wKHNlY3JldCwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgICAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgICAgICB3YXNtLnByaXZhdGVrZXlfZnJvbVByaXZhdGVLZXlDaXBoZXJ0ZXh0KHJldHB0ciwgY2lwaGVydGV4dC5fX3diZ19wdHIsIHB0cjAsIGxlbjApO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICBpZiAocjIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcml2YXRlS2V5Ll9fd3JhcChyMCk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZHN0ZXh0XHJcbiAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZGVjcnlwdHJlY29yZHMocmVjb3Jkc3RleHQpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQzXzA7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkM18xO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAocmVjb3Jkc3RleHQsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5wcml2YXRla2V5X2RlY3J5cHRyZWNvcmRzKHJldHB0ciwgdGhpcy5fX3diZ19wdHIsIHB0cjAsIGxlbjApO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICB2YXIgcjMgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgM107XHJcbiAgICAgICAgICAgIHZhciBwdHIyID0gcjA7XHJcbiAgICAgICAgICAgIHZhciBsZW4yID0gcjE7XHJcbiAgICAgICAgICAgIGlmIChyMykge1xyXG4gICAgICAgICAgICAgICAgcHRyMiA9IDA7IGxlbjIgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmZXJyZWQzXzAgPSBwdHIyO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDNfMSA9IGxlbjI7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRTdHJpbmdGcm9tV2FzbTAocHRyMiwgbGVuMik7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUoZGVmZXJyZWQzXzAsIGRlZmVycmVkM18xLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiogUHJpdmF0ZSBLZXkgaW4gY2lwaGVydGV4dCBmb3JtXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBQcml2YXRlS2V5Q2lwaGVydGV4dCB7XHJcblxyXG4gICAgc3RhdGljIF9fd3JhcChwdHIpIHtcclxuICAgICAgICBwdHIgPSBwdHIgPj4+IDA7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShQcml2YXRlS2V5Q2lwaGVydGV4dC5wcm90b3R5cGUpO1xyXG4gICAgICAgIG9iai5fX3diZ19wdHIgPSBwdHI7XHJcblxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX193YmdfcHRyO1xyXG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHB0cjtcclxuICAgIH1cclxuXHJcbiAgICBmcmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgd2FzbS5fX3diZ19wcml2YXRla2V5Y2lwaGVydGV4dF9mcmVlKHB0cik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogRW5jcnlwdCBhIHByaXZhdGUga2V5IHVzaW5nIGEgc2VjcmV0IHN0cmluZy5cclxuICAgICpcclxuICAgICogVGhlIHNlY3JldCBpcyBzZW5zaXRpdmUgYW5kIHdpbGwgYmUgbmVlZGVkIHRvIGRlY3J5cHQgdGhlIHByaXZhdGUga2V5IGxhdGVyLCBzbyBpdCBzaG91bGQgYmUgc3RvcmVkIHNlY3VyZWx5LlxyXG4gICAgKiBAcGFyYW0ge1ByaXZhdGVLZXl9IHByaXZhdGVfa2V5XHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZWNyZXRcclxuICAgICogQHJldHVybnMge1ByaXZhdGVLZXlDaXBoZXJ0ZXh0fVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBlbmNyeXB0UHJpdmF0ZUtleShwcml2YXRlX2tleSwgc2VjcmV0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIF9hc3NlcnRDbGFzcyhwcml2YXRlX2tleSwgUHJpdmF0ZUtleSk7XHJcbiAgICAgICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChzZWNyZXQsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5wcml2YXRla2V5Y2lwaGVydGV4dF9lbmNyeXB0UHJpdmF0ZUtleShyZXRwdHIsIHByaXZhdGVfa2V5Ll9fd2JnX3B0ciwgcHRyMCwgbGVuMCk7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIGlmIChyMikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFByaXZhdGVLZXlDaXBoZXJ0ZXh0Ll9fd3JhcChyMCk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogRGVjcnlwdHMgYSBwcml2YXRlIGNpcGhlcnRleHQgdXNpbmcgYSBzZWNyZXQgc3RyaW5nLlxyXG4gICAgKlxyXG4gICAgKiBUaGlzIG11c3QgYmUgdGhlIHNhbWUgc2VjcmV0IHVzZWQgdG8gZW5jcnlwdCB0aGUgcHJpdmF0ZSBrZXlcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHNlY3JldFxyXG4gICAgKiBAcmV0dXJucyB7UHJpdmF0ZUtleX1cclxuICAgICovXHJcbiAgICBkZWNyeXB0VG9Qcml2YXRlS2V5KHNlY3JldCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAoc2VjcmV0LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgICAgIHdhc20ucHJpdmF0ZWtleWNpcGhlcnRleHRfZGVjcnlwdFRvUHJpdmF0ZUtleShyZXRwdHIsIHRoaXMuX193YmdfcHRyLCBwdHIwLCBsZW4wKTtcclxuICAgICAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xyXG4gICAgICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XHJcbiAgICAgICAgICAgIHZhciByMiA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAyXTtcclxuICAgICAgICAgICAgaWYgKHIyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0YWtlT2JqZWN0KHIxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJpdmF0ZUtleS5fX3dyYXAocjApO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIFJldHVybnMgdGhlIGNpcGhlcnRleHQgc3RyaW5nXHJcbiAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkMV8wO1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDFfMTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgd2FzbS5wcml2YXRla2V5Y2lwaGVydGV4dF90b1N0cmluZyhyZXRwdHIsIHRoaXMuX193YmdfcHRyKTtcclxuICAgICAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xyXG4gICAgICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XHJcbiAgICAgICAgICAgIGRlZmVycmVkMV8wID0gcjA7XHJcbiAgICAgICAgICAgIGRlZmVycmVkMV8xID0gcjE7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRTdHJpbmdGcm9tV2FzbTAocjAsIHIxKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShkZWZlcnJlZDFfMCwgZGVmZXJyZWQxXzEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBDcmVhdGVzIGEgUHJpdmF0ZUtleUNpcGhlcnRleHQgZnJvbSBhIHN0cmluZ1xyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gY2lwaGVydGV4dFxyXG4gICAgKiBAcmV0dXJucyB7UHJpdmF0ZUtleUNpcGhlcnRleHR9XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGZyb21TdHJpbmcoY2lwaGVydGV4dCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAoY2lwaGVydGV4dCwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgICAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgICAgICB3YXNtLnByaXZhdGVrZXljaXBoZXJ0ZXh0X2Zyb21TdHJpbmcocmV0cHRyLCBwdHIwLCBsZW4wKTtcclxuICAgICAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xyXG4gICAgICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XHJcbiAgICAgICAgICAgIHZhciByMiA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAyXTtcclxuICAgICAgICAgICAgaWYgKHIyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0YWtlT2JqZWN0KHIxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gUHJpdmF0ZUtleUNpcGhlcnRleHQuX193cmFwKHIwKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vKipcclxuKiBXZWJhc3NlbWJseSBSZXByZXNlbnRhdGlvbiBvZiBhbiBBbGVvIHByb2dyYW1cclxuKlxyXG4qIFRoaXMgb2JqZWN0IGlzIHJlcXVpcmVkIHRvIGNyZWF0ZSBhbiBFeGVjdXRpb24gb3IgRGVwbG95bWVudCB0cmFuc2FjdGlvbi4gSXQgaW5jbHVkZXMgc2V2ZXJhbFxyXG4qIGNvbnZlbmllbmNlIG1ldGhvZHMgZm9yIGVudW1lcmF0aW5nIGF2YWlsYWJsZSBmdW5jdGlvbnMgYW5kIGVhY2ggZnVuY3Rpb25zJyBpbnB1dHMgaW4gYVxyXG4qIGphdmFzY3JpcHQgb2JqZWN0IGZvciB1c2FnZSBpbiBjcmVhdGlvbiBvZiB3ZWIgZm9ybXMgZm9yIGlucHV0IGNhcHR1cmUuXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBQcm9ncmFtIHtcclxuXHJcbiAgICBzdGF0aWMgX193cmFwKHB0cikge1xyXG4gICAgICAgIHB0ciA9IHB0ciA+Pj4gMDtcclxuICAgICAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKFByb2dyYW0ucHJvdG90eXBlKTtcclxuICAgICAgICBvYmouX193YmdfcHRyID0gcHRyO1xyXG5cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG5cclxuICAgIF9fZGVzdHJveV9pbnRvX3JhdygpIHtcclxuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fd2JnX3B0cjtcclxuICAgICAgICB0aGlzLl9fd2JnX3B0ciA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBwdHI7XHJcbiAgICB9XHJcblxyXG4gICAgZnJlZSgpIHtcclxuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIHdhc20uX193YmdfcHJvZ3JhbV9mcmVlKHB0cik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQ3JlYXRlIGEgcHJvZ3JhbSBmcm9tIGEgcHJvZ3JhbSBzdHJpbmdcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2dyYW1cclxuICAgICogQHJldHVybnMge1Byb2dyYW19XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGZyb21TdHJpbmcocHJvZ3JhbSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAocHJvZ3JhbSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgICAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgICAgICB3YXNtLnByb2dyYW1fZnJvbVN0cmluZyhyZXRwdHIsIHB0cjAsIGxlbjApO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICBpZiAocjIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm9ncmFtLl9fd3JhcChyMCk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogR2V0IGEgc3RyaW5nIHJlcHJlc2VudGF0aW9uIG9mIHRoZSBwcm9ncmFtXHJcbiAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgdG9TdHJpbmcoKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkMV8wO1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDFfMTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgd2FzbS5wcm9ncmFtX3RvU3RyaW5nKHJldHB0ciwgdGhpcy5fX3diZ19wdHIpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzAgPSByMDtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzEgPSByMTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFN0cmluZ0Zyb21XYXNtMChyMCwgcjEpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKGRlZmVycmVkMV8wLCBkZWZlcnJlZDFfMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCBqYXZhc2NyaXB0IGFycmF5IG9mIGZ1bmN0aW9ucyBuYW1lcyBpbiB0aGUgcHJvZ3JhbVxyXG4gICAgKiBAcmV0dXJucyB7QXJyYXk8YW55Pn1cclxuICAgICovXHJcbiAgICBnZXRGdW5jdGlvbnMoKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5wcm9ncmFtX2dldEZ1bmN0aW9ucyh0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgcmV0dXJuIHRha2VPYmplY3QocmV0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgYSBqYXZhc2NyaXB0IG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiB0aGUgZnVuY3Rpb24gaW5wdXRzIGFuZCB0eXBlcy4gVGhpcyBjYW4gYmUgdXNlZFxyXG4gICAgKiB0byBnZW5lcmF0ZSBhIHdlYmZvcm0gdG8gY2FwdHVyZSB1c2VyIGlucHV0cyBmb3IgYW4gZXhlY3V0aW9uIG9mIGEgZnVuY3Rpb24uXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBmdW5jdGlvbl9uYW1lXHJcbiAgICAqIEByZXR1cm5zIHtBcnJheTxhbnk+fVxyXG4gICAgKi9cclxuICAgIGdldEZ1bmN0aW9uSW5wdXRzKGZ1bmN0aW9uX25hbWUpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20wKGZ1bmN0aW9uX25hbWUsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5wcm9ncmFtX2dldEZ1bmN0aW9uSW5wdXRzKHJldHB0ciwgdGhpcy5fX3diZ19wdHIsIHB0cjAsIGxlbjApO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICBpZiAocjIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiB0YWtlT2JqZWN0KHIwKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgYSBqYXZhc2NyaXB0IG9iamVjdCByZXByZXNlbnRhdGlvbiBvZiBhIHByb2dyYW0gcmVjb3JkIGFuZCBpdHMgdHlwZXNcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHJlY29yZF9uYW1lXHJcbiAgICAqIEByZXR1cm5zIHtvYmplY3R9XHJcbiAgICAqL1xyXG4gICAgZ2V0UmVjb3JkTWVtYmVycyhyZWNvcmRfbmFtZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAocmVjb3JkX25hbWUsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5wcm9ncmFtX2dldFJlY29yZE1lbWJlcnMocmV0cHRyLCB0aGlzLl9fd2JnX3B0ciwgcHRyMCwgbGVuMCk7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIGlmIChyMikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRha2VPYmplY3QocjApO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCBhIGphdmFzY3JpcHQgb2JqZWN0IHJlcHJlc2VudGF0aW9uIG9mIGEgcHJvZ3JhbSBzdHJ1Y3QgYW5kIGl0cyB0eXBlc1xyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gc3RydWN0X25hbWVcclxuICAgICogQHJldHVybnMge0FycmF5PGFueT59XHJcbiAgICAqL1xyXG4gICAgZ2V0U3RydWN0TWVtYmVycyhzdHJ1Y3RfbmFtZSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAoc3RydWN0X25hbWUsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5wcm9ncmFtX2dldFN0cnVjdE1lbWJlcnMocmV0cHRyLCB0aGlzLl9fd2JnX3B0ciwgcHRyMCwgbGVuMCk7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIGlmIChyMikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRha2VPYmplY3QocjApO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgY3JlZGl0cy5hbGVvIHByb2dyYW1cclxuICAgICogQHJldHVybnMge1Byb2dyYW19XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGdldENyZWRpdHNQcm9ncmFtKCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ucHJvZ3JhbV9nZXRDcmVkaXRzUHJvZ3JhbSgpO1xyXG4gICAgICAgIHJldHVybiBQcm9ncmFtLl9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgaWQgb2YgdGhlIHByb2dyYW1cclxuICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICovXHJcbiAgICBpZCgpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQxXzA7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkMV8xO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICB3YXNtLnByb2dyYW1faWQocmV0cHRyLCB0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDFfMCA9IHIwO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDFfMSA9IHIxO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0U3RyaW5nRnJvbVdhc20wKHIwLCByMSk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUoZGVmZXJyZWQxXzAsIGRlZmVycmVkMV8xLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogRGV0ZXJtaW5lIGVxdWFsaXR5IHdpdGggYW5vdGhlciBwcm9ncmFtXHJcbiAgICAqIEBwYXJhbSB7UHJvZ3JhbX0gb3RoZXJcclxuICAgICogQHJldHVybnMge2Jvb2xlYW59XHJcbiAgICAqL1xyXG4gICAgaXNFcXVhbChvdGhlcikge1xyXG4gICAgICAgIF9hc3NlcnRDbGFzcyhvdGhlciwgUHJvZ3JhbSk7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5wcm9ncmFtX2lzRXF1YWwodGhpcy5fX3diZ19wdHIsIG90aGVyLl9fd2JnX3B0cik7XHJcbiAgICAgICAgcmV0dXJuIHJldCAhPT0gMDtcclxuICAgIH1cclxufVxyXG4vKipcclxuKi9cclxuZXhwb3J0IGNsYXNzIFByb2dyYW1NYW5hZ2VyIHtcclxuXHJcbiAgICBzdGF0aWMgX193cmFwKHB0cikge1xyXG4gICAgICAgIHB0ciA9IHB0ciA+Pj4gMDtcclxuICAgICAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKFByb2dyYW1NYW5hZ2VyLnByb3RvdHlwZSk7XHJcbiAgICAgICAgb2JqLl9fd2JnX3B0ciA9IHB0cjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX3diZ19wdHI7XHJcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gcHRyO1xyXG4gICAgfVxyXG5cclxuICAgIGZyZWUoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICB3YXNtLl9fd2JnX3Byb2dyYW1tYW5hZ2VyX2ZyZWUocHRyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBTcGxpdCBhbiBBbGVvIGNyZWRpdHMgcmVjb3JkIGludG8gdHdvIHNlcGFyYXRlIHJlY29yZHMuIFRoaXMgZnVuY3Rpb24gZG9lcyBub3QgcmVxdWlyZSBhIGZlZS5cclxuICAgICpcclxuICAgICogQHBhcmFtIHByaXZhdGVfa2V5IFRoZSBwcml2YXRlIGtleSBvZiB0aGUgc2VuZGVyXHJcbiAgICAqIEBwYXJhbSBzcGxpdF9hbW91bnQgVGhlIGFtb3VudCBvZiB0aGUgY3JlZGl0IHNwbGl0LiBUaGlzIGFtb3VudCB3aWxsIGJlIHN1YnRyYWN0ZWQgZnJvbSB0aGVcclxuICAgICogdmFsdWUgb2YgdGhlIHJlY29yZCBhbmQgdHdvIG5ldyByZWNvcmRzIHdpbGwgYmUgY3JlYXRlZCB3aXRoIHRoZSBzcGxpdCBhbW91bnQgYW5kIHRoZSByZW1haW5kZXJcclxuICAgICogQHBhcmFtIGFtb3VudF9yZWNvcmQgVGhlIHJlY29yZCB0byBzcGxpdFxyXG4gICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgb2YgdGhlIEFsZW8gbmV0d29yayBub2RlIHRvIHNlbmQgdGhlIHRyYW5zYWN0aW9uIHRvXHJcbiAgICAqIEBwYXJhbSBjYWNoZSBDYWNoZSB0aGUgcHJvdmluZyBhbmQgdmVyaWZ5aW5nIGtleXMgaW4gdGhlIFByb2dyYW1NYW5hZ2VyIG1lbW9yeS4gSWYgdGhpcyBpc1xyXG4gICAgKiBzZXQgdG8gYHRydWVgIHRoZSBrZXlzIHN5bnRoZXNpemVkIChvciBwYXNzZWQgaW4gYXMgb3B0aW9uYWwgcGFyYW1ldGVycyB2aWEgdGhlXHJcbiAgICAqIGBzcGxpdF9wcm92aW5nX2tleWAgYW5kIGBzcGxpdF92ZXJpZnlpbmdfa2V5YCBhcmd1bWVudHMpIHdpbGwgYmUgc3RvcmVkIGluIHRoZVxyXG4gICAgKiBQcm9ncmFtTWFuYWdlcidzIG1lbW9yeSBhbmQgdXNlZCBmb3Igc3Vic2VxdWVudCB0cmFuc2FjdGlvbnMuIElmIHRoaXMgaXMgc2V0IHRvIGBmYWxzZWAgdGhlXHJcbiAgICAqIHByb3ZpbmcgYW5kIHZlcmlmeWluZyBrZXlzIHdpbGwgYmUgZGVhbGxvY2F0ZWQgZnJvbSBtZW1vcnkgYWZ0ZXIgdGhlIHRyYW5zYWN0aW9uIGlzIGV4ZWN1dGVkXHJcbiAgICAqIEBwYXJhbSBzcGxpdF9wcm92aW5nX2tleSAob3B0aW9uYWwpIFByb3ZpZGUgYSBwcm92aW5nIGtleSB0byB1c2UgZm9yIHRoZSBzcGxpdCBmdW5jdGlvblxyXG4gICAgKiBAcGFyYW0gc3BsaXRfdmVyaWZ5aW5nX2tleSAob3B0aW9uYWwpIFByb3ZpZGUgYSB2ZXJpZnlpbmcga2V5IHRvIHVzZSBmb3IgdGhlIHNwbGl0IGZ1bmN0aW9uXHJcbiAgICAqIEBwYXJhbSB7UHJpdmF0ZUtleX0gcHJpdmF0ZV9rZXlcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IHNwbGl0X2Ftb3VudFxyXG4gICAgKiBAcGFyYW0ge1JlY29yZFBsYWludGV4dH0gYW1vdW50X3JlY29yZFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2FjaGVcclxuICAgICogQHBhcmFtIHtQcm92aW5nS2V5IHwgdW5kZWZpbmVkfSBzcGxpdF9wcm92aW5nX2tleVxyXG4gICAgKiBAcGFyYW0ge1ZlcmlmeWluZ0tleSB8IHVuZGVmaW5lZH0gc3BsaXRfdmVyaWZ5aW5nX2tleVxyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUcmFuc2FjdGlvbj59XHJcbiAgICAqL1xyXG4gICAgc3BsaXQocHJpdmF0ZV9rZXksIHNwbGl0X2Ftb3VudCwgYW1vdW50X3JlY29yZCwgdXJsLCBjYWNoZSwgc3BsaXRfcHJvdmluZ19rZXksIHNwbGl0X3ZlcmlmeWluZ19rZXkpIHtcclxuICAgICAgICBfYXNzZXJ0Q2xhc3MocHJpdmF0ZV9rZXksIFByaXZhdGVLZXkpO1xyXG4gICAgICAgIHZhciBwdHIwID0gcHJpdmF0ZV9rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgX2Fzc2VydENsYXNzKGFtb3VudF9yZWNvcmQsIFJlY29yZFBsYWludGV4dCk7XHJcbiAgICAgICAgdmFyIHB0cjEgPSBhbW91bnRfcmVjb3JkLl9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIGNvbnN0IHB0cjIgPSBwYXNzU3RyaW5nVG9XYXNtMCh1cmwsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICBjb25zdCBsZW4yID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgIGxldCBwdHIzID0gMDtcclxuICAgICAgICBpZiAoIWlzTGlrZU5vbmUoc3BsaXRfcHJvdmluZ19rZXkpKSB7XHJcbiAgICAgICAgICAgIF9hc3NlcnRDbGFzcyhzcGxpdF9wcm92aW5nX2tleSwgUHJvdmluZ0tleSk7XHJcbiAgICAgICAgICAgIHB0cjMgPSBzcGxpdF9wcm92aW5nX2tleS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHB0cjQgPSAwO1xyXG4gICAgICAgIGlmICghaXNMaWtlTm9uZShzcGxpdF92ZXJpZnlpbmdfa2V5KSkge1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3Moc3BsaXRfdmVyaWZ5aW5nX2tleSwgVmVyaWZ5aW5nS2V5KTtcclxuICAgICAgICAgICAgcHRyNCA9IHNwbGl0X3ZlcmlmeWluZ19rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ucHJvZ3JhbW1hbmFnZXJfc3BsaXQodGhpcy5fX3diZ19wdHIsIHB0cjAsIHNwbGl0X2Ftb3VudCwgcHRyMSwgcHRyMiwgbGVuMiwgY2FjaGUsIHB0cjMsIHB0cjQpO1xyXG4gICAgICAgIHJldHVybiB0YWtlT2JqZWN0KHJldCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogSm9pbiB0d28gcmVjb3JkcyB0b2dldGhlciB0byBjcmVhdGUgYSBuZXcgcmVjb3JkIHdpdGggYW4gYW1vdW50IG9mIGNyZWRpdHMgZXF1YWwgdG8gdGhlIHN1bVxyXG4gICAgKiBvZiB0aGUgY3JlZGl0cyBvZiB0aGUgdHdvIG9yaWdpbmFsIHJlY29yZHNcclxuICAgICpcclxuICAgICogQHBhcmFtIHByaXZhdGVfa2V5IFRoZSBwcml2YXRlIGtleSBvZiB0aGUgc2VuZGVyXHJcbiAgICAqIEBwYXJhbSByZWNvcmRfMSBUaGUgZmlyc3QgcmVjb3JkIHRvIGNvbWJpbmVcclxuICAgICogQHBhcmFtIHJlY29yZF8yIFRoZSBzZWNvbmQgcmVjb3JkIHRvIGNvbWJpbmVcclxuICAgICogQHBhcmFtIGZlZV9jcmVkaXRzIFRoZSBhbW91bnQgb2YgY3JlZGl0cyB0byBwYXkgYXMgYSBmZWVcclxuICAgICogQHBhcmFtIGZlZV9yZWNvcmQgVGhlIHJlY29yZCB0byBzcGVuZCB0aGUgZmVlIGZyb21cclxuICAgICogQHBhcmFtIHVybCBUaGUgdXJsIG9mIHRoZSBBbGVvIG5ldHdvcmsgbm9kZSB0byBzZW5kIHRoZSB0cmFuc2FjdGlvbiB0b1xyXG4gICAgKiBAcGFyYW0gY2FjaGUgQ2FjaGUgdGhlIHByb3ZpbmcgYW5kIHZlcmlmeWluZyBrZXlzIGluIHRoZSBQcm9ncmFtTWFuYWdlciBtZW1vcnkuIElmIHRoaXMgaXNcclxuICAgICogc2V0IHRvIGB0cnVlYCB0aGUga2V5cyBzeW50aGVzaXplZCAob3IgcGFzc2VkIGluIGFzIG9wdGlvbmFsIHBhcmFtZXRlcnMgdmlhIHRoZVxyXG4gICAgKiBgam9pbl9wcm92aW5nX2tleWAgYW5kIGBqb2luX3ZlcmlmeWluZ19rZXlgIGFyZ3VtZW50cykgd2lsbCBiZSBzdG9yZWQgaW4gdGhlXHJcbiAgICAqIFByb2dyYW1NYW5hZ2VyJ3MgbWVtb3J5IGFuZCB1c2VkIGZvciBzdWJzZXF1ZW50IHRyYW5zYWN0aW9ucy4gSWYgdGhpcyBpcyBzZXQgdG8gYGZhbHNlYCB0aGVcclxuICAgICogcHJvdmluZyBhbmQgdmVyaWZ5aW5nIGtleXMgd2lsbCBiZSBkZWFsbG9jYXRlZCBmcm9tIG1lbW9yeSBhZnRlciB0aGUgdHJhbnNhY3Rpb24gaXMgZXhlY3V0ZWRcclxuICAgICogQHBhcmFtIGpvaW5fcHJvdmluZ19rZXkgKG9wdGlvbmFsKSBQcm92aWRlIGEgcHJvdmluZyBrZXkgdG8gdXNlIGZvciB0aGUgam9pbiBmdW5jdGlvblxyXG4gICAgKiBAcGFyYW0gam9pbl92ZXJpZnlpbmdfa2V5IChvcHRpb25hbCkgUHJvdmlkZSBhIHZlcmlmeWluZyBrZXkgdG8gdXNlIGZvciB0aGUgam9pbiBmdW5jdGlvblxyXG4gICAgKiBAcGFyYW0gZmVlX3Byb3Zpbmdfa2V5IChvcHRpb25hbCkgUHJvdmlkZSBhIHByb3Zpbmcga2V5IHRvIHVzZSBmb3IgdGhlIGZlZSBleGVjdXRpb25cclxuICAgICogQHBhcmFtIGZlZV92ZXJpZnlpbmdfa2V5IChvcHRpb25hbCkgUHJvdmlkZSBhIHZlcmlmeWluZyBrZXkgdG8gdXNlIGZvciB0aGUgZmVlIGV4ZWN1dGlvblxyXG4gICAgKiBAcGFyYW0ge1ByaXZhdGVLZXl9IHByaXZhdGVfa2V5XHJcbiAgICAqIEBwYXJhbSB7UmVjb3JkUGxhaW50ZXh0fSByZWNvcmRfMVxyXG4gICAgKiBAcGFyYW0ge1JlY29yZFBsYWludGV4dH0gcmVjb3JkXzJcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGZlZV9jcmVkaXRzXHJcbiAgICAqIEBwYXJhbSB7UmVjb3JkUGxhaW50ZXh0fSBmZWVfcmVjb3JkXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcclxuICAgICogQHBhcmFtIHtib29sZWFufSBjYWNoZVxyXG4gICAgKiBAcGFyYW0ge1Byb3ZpbmdLZXkgfCB1bmRlZmluZWR9IGpvaW5fcHJvdmluZ19rZXlcclxuICAgICogQHBhcmFtIHtWZXJpZnlpbmdLZXkgfCB1bmRlZmluZWR9IGpvaW5fdmVyaWZ5aW5nX2tleVxyXG4gICAgKiBAcGFyYW0ge1Byb3ZpbmdLZXkgfCB1bmRlZmluZWR9IGZlZV9wcm92aW5nX2tleVxyXG4gICAgKiBAcGFyYW0ge1ZlcmlmeWluZ0tleSB8IHVuZGVmaW5lZH0gZmVlX3ZlcmlmeWluZ19rZXlcclxuICAgICogQHJldHVybnMge1Byb21pc2U8VHJhbnNhY3Rpb24+fVxyXG4gICAgKi9cclxuICAgIGpvaW4ocHJpdmF0ZV9rZXksIHJlY29yZF8xLCByZWNvcmRfMiwgZmVlX2NyZWRpdHMsIGZlZV9yZWNvcmQsIHVybCwgY2FjaGUsIGpvaW5fcHJvdmluZ19rZXksIGpvaW5fdmVyaWZ5aW5nX2tleSwgZmVlX3Byb3Zpbmdfa2V5LCBmZWVfdmVyaWZ5aW5nX2tleSkge1xyXG4gICAgICAgIF9hc3NlcnRDbGFzcyhwcml2YXRlX2tleSwgUHJpdmF0ZUtleSk7XHJcbiAgICAgICAgdmFyIHB0cjAgPSBwcml2YXRlX2tleS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICBfYXNzZXJ0Q2xhc3MocmVjb3JkXzEsIFJlY29yZFBsYWludGV4dCk7XHJcbiAgICAgICAgdmFyIHB0cjEgPSByZWNvcmRfMS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICBfYXNzZXJ0Q2xhc3MocmVjb3JkXzIsIFJlY29yZFBsYWludGV4dCk7XHJcbiAgICAgICAgdmFyIHB0cjIgPSByZWNvcmRfMi5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICBfYXNzZXJ0Q2xhc3MoZmVlX3JlY29yZCwgUmVjb3JkUGxhaW50ZXh0KTtcclxuICAgICAgICB2YXIgcHRyMyA9IGZlZV9yZWNvcmQuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgY29uc3QgcHRyNCA9IHBhc3NTdHJpbmdUb1dhc20wKHVybCwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjQgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgbGV0IHB0cjUgPSAwO1xyXG4gICAgICAgIGlmICghaXNMaWtlTm9uZShqb2luX3Byb3Zpbmdfa2V5KSkge1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3Moam9pbl9wcm92aW5nX2tleSwgUHJvdmluZ0tleSk7XHJcbiAgICAgICAgICAgIHB0cjUgPSBqb2luX3Byb3Zpbmdfa2V5Ll9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHRyNiA9IDA7XHJcbiAgICAgICAgaWYgKCFpc0xpa2VOb25lKGpvaW5fdmVyaWZ5aW5nX2tleSkpIHtcclxuICAgICAgICAgICAgX2Fzc2VydENsYXNzKGpvaW5fdmVyaWZ5aW5nX2tleSwgVmVyaWZ5aW5nS2V5KTtcclxuICAgICAgICAgICAgcHRyNiA9IGpvaW5fdmVyaWZ5aW5nX2tleS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHB0cjcgPSAwO1xyXG4gICAgICAgIGlmICghaXNMaWtlTm9uZShmZWVfcHJvdmluZ19rZXkpKSB7XHJcbiAgICAgICAgICAgIF9hc3NlcnRDbGFzcyhmZWVfcHJvdmluZ19rZXksIFByb3ZpbmdLZXkpO1xyXG4gICAgICAgICAgICBwdHI3ID0gZmVlX3Byb3Zpbmdfa2V5Ll9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHRyOCA9IDA7XHJcbiAgICAgICAgaWYgKCFpc0xpa2VOb25lKGZlZV92ZXJpZnlpbmdfa2V5KSkge1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3MoZmVlX3ZlcmlmeWluZ19rZXksIFZlcmlmeWluZ0tleSk7XHJcbiAgICAgICAgICAgIHB0cjggPSBmZWVfdmVyaWZ5aW5nX2tleS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5wcm9ncmFtbWFuYWdlcl9qb2luKHRoaXMuX193YmdfcHRyLCBwdHIwLCBwdHIxLCBwdHIyLCBmZWVfY3JlZGl0cywgcHRyMywgcHRyNCwgbGVuNCwgY2FjaGUsIHB0cjUsIHB0cjYsIHB0cjcsIHB0cjgpO1xyXG4gICAgICAgIHJldHVybiB0YWtlT2JqZWN0KHJldCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogU2VuZCBjcmVkaXRzIGZyb20gb25lIEFsZW8gYWNjb3VudCB0byBhbm90aGVyXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSBwcml2YXRlX2tleSBUaGUgcHJpdmF0ZSBrZXkgb2YgdGhlIHNlbmRlclxyXG4gICAgKiBAcGFyYW0gYW1vdW50X2NyZWRpdHMgVGhlIGFtb3VudCBvZiBjcmVkaXRzIHRvIHNlbmRcclxuICAgICogQHBhcmFtIHJlY2lwaWVudCBUaGUgcmVjaXBpZW50IG9mIHRoZSB0cmFuc2FjdGlvblxyXG4gICAgKiBAcGFyYW0gdHJhbnNmZXJfdHlwZSBUaGUgdHlwZSBvZiB0aGUgdHJhbnNmZXIgKG9wdGlvbnM6IFwicHJpdmF0ZVwiLCBcInB1YmxpY1wiLCBcInByaXZhdGVfdG9fcHVibGljXCIsIFwicHVibGljX3RvX3ByaXZhdGVcIilcclxuICAgICogQHBhcmFtIGFtb3VudF9yZWNvcmQgVGhlIHJlY29yZCB0byBmdW5kIHRoZSBhbW91bnQgZnJvbVxyXG4gICAgKiBAcGFyYW0gZmVlX2NyZWRpdHMgVGhlIGFtb3VudCBvZiBjcmVkaXRzIHRvIHBheSBhcyBhIGZlZVxyXG4gICAgKiBAcGFyYW0gZmVlX3JlY29yZCBUaGUgcmVjb3JkIHRvIHNwZW5kIHRoZSBmZWUgZnJvbVxyXG4gICAgKiBAcGFyYW0gdXJsIFRoZSB1cmwgb2YgdGhlIEFsZW8gbmV0d29yayBub2RlIHRvIHNlbmQgdGhlIHRyYW5zYWN0aW9uIHRvXHJcbiAgICAqIEBwYXJhbSBjYWNoZSBDYWNoZSB0aGUgcHJvdmluZyBhbmQgdmVyaWZ5aW5nIGtleXMgaW4gdGhlIFByb2dyYW1NYW5hZ2VyIG1lbW9yeS4gSWYgdGhpcyBpc1xyXG4gICAgKiBzZXQgdG8gYHRydWVgIHRoZSBrZXlzIHN5bnRoZXNpemVkIChvciBwYXNzZWQgaW4gYXMgb3B0aW9uYWwgcGFyYW1ldGVycyB2aWEgdGhlXHJcbiAgICAqIGB0cmFuc2Zlcl9wcm92aW5nX2tleWAgYW5kIGB0cmFuc2Zlcl92ZXJpZnlpbmdfa2V5YCBhcmd1bWVudHMpIHdpbGwgYmUgc3RvcmVkIGluIHRoZVxyXG4gICAgKiBQcm9ncmFtTWFuYWdlcidzIG1lbW9yeSBhbmQgdXNlZCBmb3Igc3Vic2VxdWVudCB0cmFuc2FjdGlvbnMuIElmIHRoaXMgaXMgc2V0IHRvIGBmYWxzZWAgdGhlXHJcbiAgICAqIHByb3ZpbmcgYW5kIHZlcmlmeWluZyBrZXlzIHdpbGwgYmUgZGVhbGxvY2F0ZWQgZnJvbSBtZW1vcnkgYWZ0ZXIgdGhlIHRyYW5zYWN0aW9uIGlzIGV4ZWN1dGVkXHJcbiAgICAqIEBwYXJhbSB0cmFuc2Zlcl9wcm92aW5nX2tleSAob3B0aW9uYWwpIFByb3ZpZGUgYSBwcm92aW5nIGtleSB0byB1c2UgZm9yIHRoZSB0cmFuc2ZlclxyXG4gICAgKiBmdW5jdGlvblxyXG4gICAgKiBAcGFyYW0gdHJhbnNmZXJfdmVyaWZ5aW5nX2tleSAob3B0aW9uYWwpIFByb3ZpZGUgYSB2ZXJpZnlpbmcga2V5IHRvIHVzZSBmb3IgdGhlIHRyYW5zZmVyXHJcbiAgICAqIGZ1bmN0aW9uXHJcbiAgICAqIEBwYXJhbSBmZWVfcHJvdmluZ19rZXkgKG9wdGlvbmFsKSBQcm92aWRlIGEgcHJvdmluZyBrZXkgdG8gdXNlIGZvciB0aGUgZmVlIGV4ZWN1dGlvblxyXG4gICAgKiBAcGFyYW0gZmVlX3ZlcmlmeWluZ19rZXkgKG9wdGlvbmFsKSBQcm92aWRlIGEgdmVyaWZ5aW5nIGtleSB0byB1c2UgZm9yIHRoZSBmZWUgZXhlY3V0aW9uXHJcbiAgICAqIEBwYXJhbSB7UHJpdmF0ZUtleX0gcHJpdmF0ZV9rZXlcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGFtb3VudF9jcmVkaXRzXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSByZWNpcGllbnRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zZmVyX3R5cGVcclxuICAgICogQHBhcmFtIHtSZWNvcmRQbGFpbnRleHQgfCB1bmRlZmluZWR9IGFtb3VudF9yZWNvcmRcclxuICAgICogQHBhcmFtIHtudW1iZXJ9IGZlZV9jcmVkaXRzXHJcbiAgICAqIEBwYXJhbSB7UmVjb3JkUGxhaW50ZXh0fSBmZWVfcmVjb3JkXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB1cmxcclxuICAgICogQHBhcmFtIHtib29sZWFufSBjYWNoZVxyXG4gICAgKiBAcGFyYW0ge1Byb3ZpbmdLZXkgfCB1bmRlZmluZWR9IHRyYW5zZmVyX3Byb3Zpbmdfa2V5XHJcbiAgICAqIEBwYXJhbSB7VmVyaWZ5aW5nS2V5IHwgdW5kZWZpbmVkfSB0cmFuc2Zlcl92ZXJpZnlpbmdfa2V5XHJcbiAgICAqIEBwYXJhbSB7UHJvdmluZ0tleSB8IHVuZGVmaW5lZH0gZmVlX3Byb3Zpbmdfa2V5XHJcbiAgICAqIEBwYXJhbSB7VmVyaWZ5aW5nS2V5IHwgdW5kZWZpbmVkfSBmZWVfdmVyaWZ5aW5nX2tleVxyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUcmFuc2FjdGlvbj59XHJcbiAgICAqL1xyXG4gICAgdHJhbnNmZXIocHJpdmF0ZV9rZXksIGFtb3VudF9jcmVkaXRzLCByZWNpcGllbnQsIHRyYW5zZmVyX3R5cGUsIGFtb3VudF9yZWNvcmQsIGZlZV9jcmVkaXRzLCBmZWVfcmVjb3JkLCB1cmwsIGNhY2hlLCB0cmFuc2Zlcl9wcm92aW5nX2tleSwgdHJhbnNmZXJfdmVyaWZ5aW5nX2tleSwgZmVlX3Byb3Zpbmdfa2V5LCBmZWVfdmVyaWZ5aW5nX2tleSkge1xyXG4gICAgICAgIF9hc3NlcnRDbGFzcyhwcml2YXRlX2tleSwgUHJpdmF0ZUtleSk7XHJcbiAgICAgICAgdmFyIHB0cjAgPSBwcml2YXRlX2tleS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICBjb25zdCBwdHIxID0gcGFzc1N0cmluZ1RvV2FzbTAocmVjaXBpZW50LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgY29uc3QgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICBjb25zdCBwdHIyID0gcGFzc1N0cmluZ1RvV2FzbTAodHJhbnNmZXJfdHlwZSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjIgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgbGV0IHB0cjMgPSAwO1xyXG4gICAgICAgIGlmICghaXNMaWtlTm9uZShhbW91bnRfcmVjb3JkKSkge1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3MoYW1vdW50X3JlY29yZCwgUmVjb3JkUGxhaW50ZXh0KTtcclxuICAgICAgICAgICAgcHRyMyA9IGFtb3VudF9yZWNvcmQuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIF9hc3NlcnRDbGFzcyhmZWVfcmVjb3JkLCBSZWNvcmRQbGFpbnRleHQpO1xyXG4gICAgICAgIHZhciBwdHI0ID0gZmVlX3JlY29yZC5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICBjb25zdCBwdHI1ID0gcGFzc1N0cmluZ1RvV2FzbTAodXJsLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgY29uc3QgbGVuNSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICBsZXQgcHRyNiA9IDA7XHJcbiAgICAgICAgaWYgKCFpc0xpa2VOb25lKHRyYW5zZmVyX3Byb3Zpbmdfa2V5KSkge1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3ModHJhbnNmZXJfcHJvdmluZ19rZXksIFByb3ZpbmdLZXkpO1xyXG4gICAgICAgICAgICBwdHI2ID0gdHJhbnNmZXJfcHJvdmluZ19rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwdHI3ID0gMDtcclxuICAgICAgICBpZiAoIWlzTGlrZU5vbmUodHJhbnNmZXJfdmVyaWZ5aW5nX2tleSkpIHtcclxuICAgICAgICAgICAgX2Fzc2VydENsYXNzKHRyYW5zZmVyX3ZlcmlmeWluZ19rZXksIFZlcmlmeWluZ0tleSk7XHJcbiAgICAgICAgICAgIHB0cjcgPSB0cmFuc2Zlcl92ZXJpZnlpbmdfa2V5Ll9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHRyOCA9IDA7XHJcbiAgICAgICAgaWYgKCFpc0xpa2VOb25lKGZlZV9wcm92aW5nX2tleSkpIHtcclxuICAgICAgICAgICAgX2Fzc2VydENsYXNzKGZlZV9wcm92aW5nX2tleSwgUHJvdmluZ0tleSk7XHJcbiAgICAgICAgICAgIHB0cjggPSBmZWVfcHJvdmluZ19rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwdHI5ID0gMDtcclxuICAgICAgICBpZiAoIWlzTGlrZU5vbmUoZmVlX3ZlcmlmeWluZ19rZXkpKSB7XHJcbiAgICAgICAgICAgIF9hc3NlcnRDbGFzcyhmZWVfdmVyaWZ5aW5nX2tleSwgVmVyaWZ5aW5nS2V5KTtcclxuICAgICAgICAgICAgcHRyOSA9IGZlZV92ZXJpZnlpbmdfa2V5Ll9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZXQgPSB3YXNtLnByb2dyYW1tYW5hZ2VyX3RyYW5zZmVyKHRoaXMuX193YmdfcHRyLCBwdHIwLCBhbW91bnRfY3JlZGl0cywgcHRyMSwgbGVuMSwgcHRyMiwgbGVuMiwgcHRyMywgZmVlX2NyZWRpdHMsIHB0cjQsIHB0cjUsIGxlbjUsIGNhY2hlLCBwdHI2LCBwdHI3LCBwdHI4LCBwdHI5KTtcclxuICAgICAgICByZXR1cm4gdGFrZU9iamVjdChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEV4ZWN1dGUgYW4gYXJiaXRyYXJ5IGZ1bmN0aW9uIGxvY2FsbHlcclxuICAgICpcclxuICAgICogQHBhcmFtIHByaXZhdGVfa2V5IFRoZSBwcml2YXRlIGtleSBvZiB0aGUgc2VuZGVyXHJcbiAgICAqIEBwYXJhbSBwcm9ncmFtIFRoZSBzb3VyY2UgY29kZSBvZiB0aGUgcHJvZ3JhbSBiZWluZyBleGVjdXRlZFxyXG4gICAgKiBAcGFyYW0gZnVuY3Rpb24gVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIGV4ZWN1dGVcclxuICAgICogQHBhcmFtIGlucHV0cyBBIGphdmFzY3JpcHQgYXJyYXkgb2YgaW5wdXRzIHRvIHRoZSBmdW5jdGlvblxyXG4gICAgKiBAcGFyYW0gYW1vdW50X3JlY29yZCBUaGUgcmVjb3JkIHRvIGZ1bmQgdGhlIGFtb3VudCBmcm9tXHJcbiAgICAqIEBwYXJhbSBmZWVfY3JlZGl0cyBUaGUgYW1vdW50IG9mIGNyZWRpdHMgdG8gcGF5IGFzIGEgZmVlXHJcbiAgICAqIEBwYXJhbSBmZWVfcmVjb3JkIFRoZSByZWNvcmQgdG8gc3BlbmQgdGhlIGZlZSBmcm9tXHJcbiAgICAqIEBwYXJhbSB1cmwgVGhlIHVybCBvZiB0aGUgQWxlbyBuZXR3b3JrIG5vZGUgdG8gc2VuZCB0aGUgdHJhbnNhY3Rpb24gdG9cclxuICAgICogQHBhcmFtIGNhY2hlIENhY2hlIHRoZSBwcm92aW5nIGFuZCB2ZXJpZnlpbmcga2V5cyBpbiB0aGUgUHJvZ3JhbU1hbmFnZXIncyBtZW1vcnkuXHJcbiAgICAqIElmIHRoaXMgaXMgc2V0IHRvICd0cnVlJyB0aGUga2V5cyBzeW50aGVzaXplZCAob3IgcGFzc2VkIGluIGFzIG9wdGlvbmFsIHBhcmFtZXRlcnMgdmlhIHRoZVxyXG4gICAgKiBgcHJvdmluZ19rZXlgIGFuZCBgdmVyaWZ5aW5nX2tleWAgYXJndW1lbnRzKSB3aWxsIGJlIHN0b3JlZCBpbiB0aGUgUHJvZ3JhbU1hbmFnZXIncyBtZW1vcnlcclxuICAgICogYW5kIHVzZWQgZm9yIHN1YnNlcXVlbnQgdHJhbnNhY3Rpb25zLiBJZiB0aGlzIGlzIHNldCB0byAnZmFsc2UnIHRoZSBwcm92aW5nIGFuZCB2ZXJpZnlpbmdcclxuICAgICoga2V5cyB3aWxsIGJlIGRlYWxsb2NhdGVkIGZyb20gbWVtb3J5IGFmdGVyIHRoZSB0cmFuc2FjdGlvbiBpcyBleGVjdXRlZC5cclxuICAgICogQHBhcmFtIHByb3Zpbmdfa2V5IChvcHRpb25hbCkgUHJvdmlkZSBhIHZlcmlmeWluZyBrZXkgdG8gdXNlIGZvciB0aGUgZnVuY3Rpb24gZXhlY3V0aW9uXHJcbiAgICAqIEBwYXJhbSB2ZXJpZnlpbmdfa2V5IChvcHRpb25hbCkgUHJvdmlkZSBhIHZlcmlmeWluZyBrZXkgdG8gdXNlIGZvciB0aGUgZnVuY3Rpb24gZXhlY3V0aW9uXHJcbiAgICAqIEBwYXJhbSB7UHJpdmF0ZUtleX0gcHJpdmF0ZV9rZXlcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2dyYW1cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IF9mdW5jdGlvblxyXG4gICAgKiBAcGFyYW0ge0FycmF5PGFueT59IGlucHV0c1xyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNhY2hlXHJcbiAgICAqIEBwYXJhbSB7UHJvdmluZ0tleSB8IHVuZGVmaW5lZH0gcHJvdmluZ19rZXlcclxuICAgICogQHBhcmFtIHtWZXJpZnlpbmdLZXkgfCB1bmRlZmluZWR9IHZlcmlmeWluZ19rZXlcclxuICAgICogQHJldHVybnMge0V4ZWN1dGlvblJlc3BvbnNlfVxyXG4gICAgKi9cclxuICAgIGV4ZWN1dGVfbG9jYWwocHJpdmF0ZV9rZXksIHByb2dyYW0sIF9mdW5jdGlvbiwgaW5wdXRzLCBjYWNoZSwgcHJvdmluZ19rZXksIHZlcmlmeWluZ19rZXkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgX2Fzc2VydENsYXNzKHByaXZhdGVfa2V5LCBQcml2YXRlS2V5KTtcclxuICAgICAgICAgICAgdmFyIHB0cjAgPSBwcml2YXRlX2tleS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICAgICAgY29uc3QgcHRyMSA9IHBhc3NTdHJpbmdUb1dhc20wKHByb2dyYW0sIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgY29uc3QgcHRyMiA9IHBhc3NTdHJpbmdUb1dhc20wKF9mdW5jdGlvbiwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgICAgICBjb25zdCBsZW4yID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgICAgICBsZXQgcHRyMyA9IDA7XHJcbiAgICAgICAgICAgIGlmICghaXNMaWtlTm9uZShwcm92aW5nX2tleSkpIHtcclxuICAgICAgICAgICAgICAgIF9hc3NlcnRDbGFzcyhwcm92aW5nX2tleSwgUHJvdmluZ0tleSk7XHJcbiAgICAgICAgICAgICAgICBwdHIzID0gcHJvdmluZ19rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0IHB0cjQgPSAwO1xyXG4gICAgICAgICAgICBpZiAoIWlzTGlrZU5vbmUodmVyaWZ5aW5nX2tleSkpIHtcclxuICAgICAgICAgICAgICAgIF9hc3NlcnRDbGFzcyh2ZXJpZnlpbmdfa2V5LCBWZXJpZnlpbmdLZXkpO1xyXG4gICAgICAgICAgICAgICAgcHRyNCA9IHZlcmlmeWluZ19rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgd2FzbS5wcm9ncmFtbWFuYWdlcl9leGVjdXRlX2xvY2FsKHJldHB0ciwgdGhpcy5fX3diZ19wdHIsIHB0cjAsIHB0cjEsIGxlbjEsIHB0cjIsIGxlbjIsIGFkZEhlYXBPYmplY3QoaW5wdXRzKSwgY2FjaGUsIHB0cjMsIHB0cjQpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICBpZiAocjIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBFeGVjdXRpb25SZXNwb25zZS5fX3dyYXAocjApO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEV4ZWN1dGUgQWxlbyBmdW5jdGlvbiBhbmQgY3JlYXRlIGFuIEFsZW8gZXhlY3V0aW9uIHRyYW5zYWN0aW9uXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSBwcml2YXRlX2tleSBUaGUgcHJpdmF0ZSBrZXkgb2YgdGhlIHNlbmRlclxyXG4gICAgKiBAcGFyYW0gcHJvZ3JhbSBUaGUgc291cmNlIGNvZGUgb2YgdGhlIHByb2dyYW0gYmVpbmcgZXhlY3V0ZWRcclxuICAgICogQHBhcmFtIGZ1bmN0aW9uIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBleGVjdXRlXHJcbiAgICAqIEBwYXJhbSBpbnB1dHMgQSBqYXZhc2NyaXB0IGFycmF5IG9mIGlucHV0cyB0byB0aGUgZnVuY3Rpb25cclxuICAgICogQHBhcmFtIGZlZV9jcmVkaXRzIFRoZSBhbW91bnQgb2YgY3JlZGl0cyB0byBwYXkgYXMgYSBmZWVcclxuICAgICogQHBhcmFtIGZlZV9yZWNvcmQgVGhlIHJlY29yZCB0byBzcGVuZCB0aGUgZmVlIGZyb21cclxuICAgICogQHBhcmFtIHVybCBUaGUgdXJsIG9mIHRoZSBBbGVvIG5ldHdvcmsgbm9kZSB0byBzZW5kIHRoZSB0cmFuc2FjdGlvbiB0b1xyXG4gICAgKiBAcGFyYW0gY2FjaGUgQ2FjaGUgdGhlIHByb3ZpbmcgYW5kIHZlcmlmeWluZyBrZXlzIGluIHRoZSBQcm9ncmFtTWFuYWdlcidzIG1lbW9yeS5cclxuICAgICogSWYgdGhpcyBpcyBzZXQgdG8gJ3RydWUnIHRoZSBrZXlzIHN5bnRoZXNpemVkIChvciBwYXNzZWQgaW4gYXMgb3B0aW9uYWwgcGFyYW1ldGVycyB2aWEgdGhlXHJcbiAgICAqIGBwcm92aW5nX2tleWAgYW5kIGB2ZXJpZnlpbmdfa2V5YCBhcmd1bWVudHMpIHdpbGwgYmUgc3RvcmVkIGluIHRoZSBQcm9ncmFtTWFuYWdlcidzIG1lbW9yeVxyXG4gICAgKiBhbmQgdXNlZCBmb3Igc3Vic2VxdWVudCB0cmFuc2FjdGlvbnMuIElmIHRoaXMgaXMgc2V0IHRvICdmYWxzZScgdGhlIHByb3ZpbmcgYW5kIHZlcmlmeWluZ1xyXG4gICAgKiBrZXlzIHdpbGwgYmUgZGVhbGxvY2F0ZWQgZnJvbSBtZW1vcnkgYWZ0ZXIgdGhlIHRyYW5zYWN0aW9uIGlzIGV4ZWN1dGVkLlxyXG4gICAgKiBAcGFyYW0gcHJvdmluZ19rZXkgKG9wdGlvbmFsKSBQcm92aWRlIGEgdmVyaWZ5aW5nIGtleSB0byB1c2UgZm9yIHRoZSBmdW5jdGlvbiBleGVjdXRpb25cclxuICAgICogQHBhcmFtIHZlcmlmeWluZ19rZXkgKG9wdGlvbmFsKSBQcm92aWRlIGEgdmVyaWZ5aW5nIGtleSB0byB1c2UgZm9yIHRoZSBmdW5jdGlvbiBleGVjdXRpb25cclxuICAgICogQHBhcmFtIGZlZV9wcm92aW5nX2tleSAob3B0aW9uYWwpIFByb3ZpZGUgYSBwcm92aW5nIGtleSB0byB1c2UgZm9yIHRoZSBmZWUgZXhlY3V0aW9uXHJcbiAgICAqIEBwYXJhbSBmZWVfdmVyaWZ5aW5nX2tleSAob3B0aW9uYWwpIFByb3ZpZGUgYSB2ZXJpZnlpbmcga2V5IHRvIHVzZSBmb3IgdGhlIGZlZSBleGVjdXRpb25cclxuICAgICogQHBhcmFtIHtQcml2YXRlS2V5fSBwcml2YXRlX2tleVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZ3JhbVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gX2Z1bmN0aW9uXHJcbiAgICAqIEBwYXJhbSB7QXJyYXk8YW55Pn0gaW5wdXRzXHJcbiAgICAqIEBwYXJhbSB7bnVtYmVyfSBmZWVfY3JlZGl0c1xyXG4gICAgKiBAcGFyYW0ge1JlY29yZFBsYWludGV4dH0gZmVlX3JlY29yZFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gdXJsXHJcbiAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gY2FjaGVcclxuICAgICogQHBhcmFtIHtQcm92aW5nS2V5IHwgdW5kZWZpbmVkfSBwcm92aW5nX2tleVxyXG4gICAgKiBAcGFyYW0ge1ZlcmlmeWluZ0tleSB8IHVuZGVmaW5lZH0gdmVyaWZ5aW5nX2tleVxyXG4gICAgKiBAcGFyYW0ge1Byb3ZpbmdLZXkgfCB1bmRlZmluZWR9IGZlZV9wcm92aW5nX2tleVxyXG4gICAgKiBAcGFyYW0ge1ZlcmlmeWluZ0tleSB8IHVuZGVmaW5lZH0gZmVlX3ZlcmlmeWluZ19rZXlcclxuICAgICogQHJldHVybnMge1Byb21pc2U8VHJhbnNhY3Rpb24+fVxyXG4gICAgKi9cclxuICAgIGV4ZWN1dGUocHJpdmF0ZV9rZXksIHByb2dyYW0sIF9mdW5jdGlvbiwgaW5wdXRzLCBmZWVfY3JlZGl0cywgZmVlX3JlY29yZCwgdXJsLCBjYWNoZSwgcHJvdmluZ19rZXksIHZlcmlmeWluZ19rZXksIGZlZV9wcm92aW5nX2tleSwgZmVlX3ZlcmlmeWluZ19rZXkpIHtcclxuICAgICAgICBfYXNzZXJ0Q2xhc3MocHJpdmF0ZV9rZXksIFByaXZhdGVLZXkpO1xyXG4gICAgICAgIHZhciBwdHIwID0gcHJpdmF0ZV9rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgY29uc3QgcHRyMSA9IHBhc3NTdHJpbmdUb1dhc20wKHByb2dyYW0sIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICBjb25zdCBsZW4xID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgIGNvbnN0IHB0cjIgPSBwYXNzU3RyaW5nVG9XYXNtMChfZnVuY3Rpb24sIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICBjb25zdCBsZW4yID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgIF9hc3NlcnRDbGFzcyhmZWVfcmVjb3JkLCBSZWNvcmRQbGFpbnRleHQpO1xyXG4gICAgICAgIHZhciBwdHIzID0gZmVlX3JlY29yZC5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICBjb25zdCBwdHI0ID0gcGFzc1N0cmluZ1RvV2FzbTAodXJsLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgY29uc3QgbGVuNCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICBsZXQgcHRyNSA9IDA7XHJcbiAgICAgICAgaWYgKCFpc0xpa2VOb25lKHByb3Zpbmdfa2V5KSkge1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3MocHJvdmluZ19rZXksIFByb3ZpbmdLZXkpO1xyXG4gICAgICAgICAgICBwdHI1ID0gcHJvdmluZ19rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwdHI2ID0gMDtcclxuICAgICAgICBpZiAoIWlzTGlrZU5vbmUodmVyaWZ5aW5nX2tleSkpIHtcclxuICAgICAgICAgICAgX2Fzc2VydENsYXNzKHZlcmlmeWluZ19rZXksIFZlcmlmeWluZ0tleSk7XHJcbiAgICAgICAgICAgIHB0cjYgPSB2ZXJpZnlpbmdfa2V5Ll9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBsZXQgcHRyNyA9IDA7XHJcbiAgICAgICAgaWYgKCFpc0xpa2VOb25lKGZlZV9wcm92aW5nX2tleSkpIHtcclxuICAgICAgICAgICAgX2Fzc2VydENsYXNzKGZlZV9wcm92aW5nX2tleSwgUHJvdmluZ0tleSk7XHJcbiAgICAgICAgICAgIHB0cjcgPSBmZWVfcHJvdmluZ19rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBwdHI4ID0gMDtcclxuICAgICAgICBpZiAoIWlzTGlrZU5vbmUoZmVlX3ZlcmlmeWluZ19rZXkpKSB7XHJcbiAgICAgICAgICAgIF9hc3NlcnRDbGFzcyhmZWVfdmVyaWZ5aW5nX2tleSwgVmVyaWZ5aW5nS2V5KTtcclxuICAgICAgICAgICAgcHRyOCA9IGZlZV92ZXJpZnlpbmdfa2V5Ll9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZXQgPSB3YXNtLnByb2dyYW1tYW5hZ2VyX2V4ZWN1dGUodGhpcy5fX3diZ19wdHIsIHB0cjAsIHB0cjEsIGxlbjEsIHB0cjIsIGxlbjIsIGFkZEhlYXBPYmplY3QoaW5wdXRzKSwgZmVlX2NyZWRpdHMsIHB0cjMsIHB0cjQsIGxlbjQsIGNhY2hlLCBwdHI1LCBwdHI2LCBwdHI3LCBwdHI4KTtcclxuICAgICAgICByZXR1cm4gdGFrZU9iamVjdChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIERlcGxveSBhbiBBbGVvIHByb2dyYW1cclxuICAgICpcclxuICAgICogQHBhcmFtIHByaXZhdGVfa2V5IFRoZSBwcml2YXRlIGtleSBvZiB0aGUgc2VuZGVyXHJcbiAgICAqIEBwYXJhbSBwcm9ncmFtIFRoZSBzb3VyY2UgY29kZSBvZiB0aGUgcHJvZ3JhbSBiZWluZyBkZXBsb3llZFxyXG4gICAgKiBAcGFyYW0gaW1wb3J0cyBBIGphdmFzY3JpcHQgb2JqZWN0IGhvbGRpbmcgdGhlIHNvdXJjZSBjb2RlIG9mIGFueSBpbXBvcnRlZCBwcm9ncmFtcyBpbiB0aGVcclxuICAgICogZm9ybSB7XCJwcm9ncmFtX25hbWUxXCI6IFwicHJvZ3JhbV9zb3VyY2VfY29kZVwiLCBcInByb2dyYW1fbmFtZTJcIjogXCJwcm9ncmFtX3NvdXJjZV9jb2RlXCIsIC4ufS5cclxuICAgICogTm90ZSB0aGF0IGFsbCBpbXBvcnRlZCBwcm9ncmFtcyBtdXN0IGJlIGRlcGxveWVkIG9uIGNoYWluIGJlZm9yZSB0aGUgbWFpbiBwcm9ncmFtIGluIG9yZGVyXHJcbiAgICAqIGZvciB0aGUgZGVwbG95bWVudCB0byBzdWNjZWVkXHJcbiAgICAqIEBwYXJhbSBmZWVfY3JlZGl0cyBUaGUgYW1vdW50IG9mIGNyZWRpdHMgdG8gcGF5IGFzIGEgZmVlXHJcbiAgICAqIEBwYXJhbSBmZWVfcmVjb3JkIFRoZSByZWNvcmQgdG8gc3BlbmQgdGhlIGZlZSBmcm9tXHJcbiAgICAqIEBwYXJhbSB1cmwgVGhlIHVybCBvZiB0aGUgQWxlbyBuZXR3b3JrIG5vZGUgdG8gc2VuZCB0aGUgdHJhbnNhY3Rpb24gdG9cclxuICAgICogQHBhcmFtIGZlZV9wcm92aW5nX2tleSAob3B0aW9uYWwpIFByb3ZpZGUgYSBwcm92aW5nIGtleSB0byB1c2UgZm9yIHRoZSBmZWUgZXhlY3V0aW9uXHJcbiAgICAqIEBwYXJhbSBmZWVfdmVyaWZ5aW5nX2tleSAob3B0aW9uYWwpIFByb3ZpZGUgYSB2ZXJpZnlpbmcga2V5IHRvIHVzZSBmb3IgdGhlIGZlZSBleGVjdXRpb25cclxuICAgICogQHBhcmFtIHtQcml2YXRlS2V5fSBwcml2YXRlX2tleVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZ3JhbVxyXG4gICAgKiBAcGFyYW0ge29iamVjdCB8IHVuZGVmaW5lZH0gaW1wb3J0c1xyXG4gICAgKiBAcGFyYW0ge251bWJlcn0gZmVlX2NyZWRpdHNcclxuICAgICogQHBhcmFtIHtSZWNvcmRQbGFpbnRleHR9IGZlZV9yZWNvcmRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHVybFxyXG4gICAgKiBAcGFyYW0ge2Jvb2xlYW59IGNhY2hlXHJcbiAgICAqIEBwYXJhbSB7UHJvdmluZ0tleSB8IHVuZGVmaW5lZH0gZmVlX3Byb3Zpbmdfa2V5XHJcbiAgICAqIEBwYXJhbSB7VmVyaWZ5aW5nS2V5IHwgdW5kZWZpbmVkfSBmZWVfdmVyaWZ5aW5nX2tleVxyXG4gICAgKiBAcmV0dXJucyB7UHJvbWlzZTxUcmFuc2FjdGlvbj59XHJcbiAgICAqL1xyXG4gICAgZGVwbG95KHByaXZhdGVfa2V5LCBwcm9ncmFtLCBpbXBvcnRzLCBmZWVfY3JlZGl0cywgZmVlX3JlY29yZCwgdXJsLCBjYWNoZSwgZmVlX3Byb3Zpbmdfa2V5LCBmZWVfdmVyaWZ5aW5nX2tleSkge1xyXG4gICAgICAgIF9hc3NlcnRDbGFzcyhwcml2YXRlX2tleSwgUHJpdmF0ZUtleSk7XHJcbiAgICAgICAgdmFyIHB0cjAgPSBwcml2YXRlX2tleS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICBjb25zdCBwdHIxID0gcGFzc1N0cmluZ1RvV2FzbTAocHJvZ3JhbSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjEgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgX2Fzc2VydENsYXNzKGZlZV9yZWNvcmQsIFJlY29yZFBsYWludGV4dCk7XHJcbiAgICAgICAgdmFyIHB0cjIgPSBmZWVfcmVjb3JkLl9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIGNvbnN0IHB0cjMgPSBwYXNzU3RyaW5nVG9XYXNtMCh1cmwsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICBjb25zdCBsZW4zID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgIGxldCBwdHI0ID0gMDtcclxuICAgICAgICBpZiAoIWlzTGlrZU5vbmUoZmVlX3Byb3Zpbmdfa2V5KSkge1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3MoZmVlX3Byb3Zpbmdfa2V5LCBQcm92aW5nS2V5KTtcclxuICAgICAgICAgICAgcHRyNCA9IGZlZV9wcm92aW5nX2tleS5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbGV0IHB0cjUgPSAwO1xyXG4gICAgICAgIGlmICghaXNMaWtlTm9uZShmZWVfdmVyaWZ5aW5nX2tleSkpIHtcclxuICAgICAgICAgICAgX2Fzc2VydENsYXNzKGZlZV92ZXJpZnlpbmdfa2V5LCBWZXJpZnlpbmdLZXkpO1xyXG4gICAgICAgICAgICBwdHI1ID0gZmVlX3ZlcmlmeWluZ19rZXkuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ucHJvZ3JhbW1hbmFnZXJfZGVwbG95KHRoaXMuX193YmdfcHRyLCBwdHIwLCBwdHIxLCBsZW4xLCBpc0xpa2VOb25lKGltcG9ydHMpID8gMCA6IGFkZEhlYXBPYmplY3QoaW1wb3J0cyksIGZlZV9jcmVkaXRzLCBwdHIyLCBwdHIzLCBsZW4zLCBjYWNoZSwgcHRyNCwgcHRyNSk7XHJcbiAgICAgICAgcmV0dXJuIHRha2VPYmplY3QocmV0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKi9cclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ucHJvZ3JhbW1hbmFnZXJfbmV3KCk7XHJcbiAgICAgICAgcmV0dXJuIFByb2dyYW1NYW5hZ2VyLl9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIENhY2hlIHRoZSBwcm92aW5nIGFuZCB2ZXJpZnlpbmcga2V5cyBmb3IgYSBwcm9ncmFtIGZ1bmN0aW9uIGluIFdBU00gbWVtb3J5LiBUaGlzIG1ldGhvZFxyXG4gICAgKiB3aWxsIHRha2UgYSB2ZXJpZnlpbmcgYW5kIHByb3Zpbmcga2V5IGFuZCBzdG9yZSB0aGVtIGluIHRoZSBwcm9ncmFtIG1hbmFnZXIncyBpbnRlcm5hbFxyXG4gICAgKiBpbi1tZW1vcnkgY2FjaGUuIFRoaXMgbWVtb3J5IGlzIGFsbG9jYXRlZCBpbiBXZWJBc3NlbWJseSwgc28gaXQgaXMgaW1wb3J0YW50IHRvIGJlIG1pbmRmdWxcclxuICAgICogb2YgdGhlIGFtb3VudCBvZiBtZW1vcnkgYmVpbmcgdXNlZC4gVGhpcyBtZXRob2Qgd2lsbCByZXR1cm4gYW4gZXJyb3IgaWYgdGhlIGtleXMgYXJlIGFscmVhZHlcclxuICAgICogY2FjaGVkIGluIG1lbW9yeS5cclxuICAgICpcclxuICAgICogQHBhcmFtIHByb2dyYW1faWQgVGhlIG5hbWUgb2YgdGhlIHByb2dyYW0gY29udGFpbmluZyB0aGUgZGVzaXJlZCBmdW5jdGlvblxyXG4gICAgKiBAcGFyYW0gZnVuY3Rpb24gVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIHN0b3JlIHRoZSBrZXlzIGZvclxyXG4gICAgKiBAcGFyYW0gcHJvdmluZ19rZXkgVGhlIHByb3Zpbmcga2V5IG9mIHRoZSBmdW5jdGlvblxyXG4gICAgKiBAcGFyYW0gdmVyaWZ5aW5nX2tleSBUaGUgdmVyaWZ5aW5nIGtleSBvZiB0aGUgZnVuY3Rpb25cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2dyYW1cclxuICAgICogQHBhcmFtIHtzdHJpbmd9IF9mdW5jdGlvblxyXG4gICAgKiBAcGFyYW0ge1Byb3ZpbmdLZXl9IHByb3Zpbmdfa2V5XHJcbiAgICAqIEBwYXJhbSB7VmVyaWZ5aW5nS2V5fSB2ZXJpZnlpbmdfa2V5XHJcbiAgICAqL1xyXG4gICAgY2FjaGVLZXlwYWlySW5XYXNtTWVtb3J5KHByb2dyYW0sIF9mdW5jdGlvbiwgcHJvdmluZ19rZXksIHZlcmlmeWluZ19rZXkpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20wKHByb2dyYW0sIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgY29uc3QgcHRyMSA9IHBhc3NTdHJpbmdUb1dhc20wKF9mdW5jdGlvbiwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgICAgICBjb25zdCBsZW4xID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3MocHJvdmluZ19rZXksIFByb3ZpbmdLZXkpO1xyXG4gICAgICAgICAgICB2YXIgcHRyMiA9IHByb3Zpbmdfa2V5Ll9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3ModmVyaWZ5aW5nX2tleSwgVmVyaWZ5aW5nS2V5KTtcclxuICAgICAgICAgICAgdmFyIHB0cjMgPSB2ZXJpZnlpbmdfa2V5Ll9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgICAgICB3YXNtLnByb2dyYW1tYW5hZ2VyX2NhY2hlS2V5cGFpckluV2FzbU1lbW9yeShyZXRwdHIsIHRoaXMuX193YmdfcHRyLCBwdHIwLCBsZW4wLCBwdHIxLCBsZW4xLCBwdHIyLCBwdHIzKTtcclxuICAgICAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xyXG4gICAgICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XHJcbiAgICAgICAgICAgIGlmIChyMSkge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBHZXQgdGhlIHByb3ZpbmcgJiB2ZXJpZnlpbmcga2V5cyBjYWNoZWQgaW4gV0FTTSBtZW1vcnkgZm9yIGEgc3BlY2lmaWMgZnVuY3Rpb25cclxuICAgICpcclxuICAgICogQHBhcmFtIHByb2dyYW1faWQgVGhlIG5hbWUgb2YgdGhlIHByb2dyYW0gY29udGFpbmluZyB0aGUgZGVzaXJlZCBmdW5jdGlvblxyXG4gICAgKiBAcGFyYW0gZnVuY3Rpb25faWQgVGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHRvIHJldHJpZXZlIHRoZSBrZXlzIGZvclxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZ3JhbV9pZFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gX2Z1bmN0aW9uXHJcbiAgICAqIEByZXR1cm5zIHtLZXlQYWlyfVxyXG4gICAgKi9cclxuICAgIGdldENhY2hlZEtleXBhaXIocHJvZ3JhbV9pZCwgX2Z1bmN0aW9uKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChwcm9ncmFtX2lkLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgICAgIGNvbnN0IHB0cjEgPSBwYXNzU3RyaW5nVG9XYXNtMChfZnVuY3Rpb24sIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5wcm9ncmFtbWFuYWdlcl9nZXRDYWNoZWRLZXlwYWlyKHJldHB0ciwgdGhpcy5fX3diZ19wdHIsIHB0cjAsIGxlbjAsIHB0cjEsIGxlbjEpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICBpZiAocjIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBLZXlQYWlyLl9fd3JhcChyMCk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogU3ludGhlc2l6ZSBhIHByb3ZpbmcgYW5kIHZlcmlmeWluZyBrZXkgZm9yIGEgcHJvZ3JhbSBmdW5jdGlvbi4gVGhpcyBtZXRob2Qgc2hvdWxkIGJlIHVzZWRcclxuICAgICogd2hlbiB0aGVyZSBpcyBhIG5lZWQgdG8gcHJlLXN5bnRoZXNpemUga2V5cyAoaS5lLiBmb3IgY2FjaGluZyBwdXJwb3NlcywgZXRjLilcclxuICAgICpcclxuICAgICogQHBhcmFtIHByb2dyYW0gVGhlIHNvdXJjZSBjb2RlIG9mIHRoZSBwcm9ncmFtIGNvbnRhaW5pbmcgdGhlIGRlc2lyZWQgZnVuY3Rpb25cclxuICAgICogQHBhcmFtIGZ1bmN0aW9uIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byBzeW50aGVzaXplIHRoZSBrZXkgZm9yXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9ncmFtXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBfZnVuY3Rpb25cclxuICAgICogQHJldHVybnMge0tleVBhaXJ9XHJcbiAgICAqL1xyXG4gICAgc3ludGhlc2l6ZUtleXBhaXIocHJvZ3JhbSwgX2Z1bmN0aW9uKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChwcm9ncmFtLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgICAgIGNvbnN0IHB0cjEgPSBwYXNzU3RyaW5nVG9XYXNtMChfZnVuY3Rpb24sIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5wcm9ncmFtbWFuYWdlcl9zeW50aGVzaXplS2V5cGFpcihyZXRwdHIsIHRoaXMuX193YmdfcHRyLCBwdHIwLCBsZW4wLCBwdHIxLCBsZW4xKTtcclxuICAgICAgICAgICAgdmFyIHIwID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDBdO1xyXG4gICAgICAgICAgICB2YXIgcjEgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMV07XHJcbiAgICAgICAgICAgIHZhciByMiA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAyXTtcclxuICAgICAgICAgICAgaWYgKHIyKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0YWtlT2JqZWN0KHIxKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gS2V5UGFpci5fX3dyYXAocjApO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIENsZWFyIGtleSBjYWNoZSBpbiB3YXNtIG1lbW9yeS5cclxuICAgICpcclxuICAgICogVGhpcyBtZXRob2Qgd2lsbCBjbGVhciB0aGUga2V5IGNhY2hlIGluIHdhc20gbWVtb3J5LiBJdCBpcyBpbXBvcnRhbnQgdG8gbm90ZSB0aGF0IHRoaXMgd2lsbFxyXG4gICAgKiBub3QgREUtYWxsb2NhdGUgdGhlIG1lbW9yeSBhc3NpZ25lZCB0byB3YXNtIGFzIHdhc20gbWVtb3J5IGNhbm5vdCBiZSBzaHJ1bmsuIFRoZSB0b3RhbFxyXG4gICAgKiBtZW1vcnkgYWxsb2NhdGVkIHRvIHdhc20gd2lsbCByZW1haW4gY29uc3RhbnQgYnV0IHdpbGwgYmUgYXZhaWxhYmxlIGZvciBvdGhlciB1c2FnZSBhZnRlclxyXG4gICAgKiBjYWxsaW5nIHRoaXMgbWV0aG9kLlxyXG4gICAgKi9cclxuICAgIGNsZWFyS2V5Q2FjaGUoKSB7XHJcbiAgICAgICAgd2FzbS5wcm9ncmFtbWFuYWdlcl9jbGVhcktleUNhY2hlKHRoaXMuX193YmdfcHRyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBDaGVjayBpZiB0aGUgY2FjaGUgY29udGFpbnMgYSBrZXlwYWlyIGZvciBhIHNwZWNpZmljIGZ1bmN0aW9uXHJcbiAgICAqXHJcbiAgICAqIEBwYXJhbSBwcm9ncmFtX2lkIFRoZSBuYW1lIG9mIHRoZSBwcm9ncmFtIGNvbnRhaW5pbmcgdGhlIGRlc2lyZWQgZnVuY3Rpb25cclxuICAgICogQHBhcmFtIGZ1bmN0aW9uX2lkIFRoZSBuYW1lIG9mIHRoZSBmdW5jdGlvbiB0byByZXRyaWV2ZSB0aGUga2V5cyBmb3JcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHByb2dyYW1faWRcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IGZ1bmN0aW9uX2lkXHJcbiAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgKi9cclxuICAgIGtleUV4aXN0cyhwcm9ncmFtX2lkLCBmdW5jdGlvbl9pZCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAocHJvZ3JhbV9pZCwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgICAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIxID0gcGFzc1N0cmluZ1RvV2FzbTAoZnVuY3Rpb25faWQsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5wcm9ncmFtbWFuYWdlcl9rZXlFeGlzdHMocmV0cHRyLCB0aGlzLl9fd2JnX3B0ciwgcHRyMCwgbGVuMCwgcHRyMSwgbGVuMSk7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIGlmIChyMikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHIwICE9PSAwO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4qL1xyXG5leHBvcnQgY2xhc3MgUHJvdmluZ0tleSB7XHJcblxyXG4gICAgc3RhdGljIF9fd3JhcChwdHIpIHtcclxuICAgICAgICBwdHIgPSBwdHIgPj4+IDA7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZShQcm92aW5nS2V5LnByb3RvdHlwZSk7XHJcbiAgICAgICAgb2JqLl9fd2JnX3B0ciA9IHB0cjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX3diZ19wdHI7XHJcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gcHRyO1xyXG4gICAgfVxyXG5cclxuICAgIGZyZWUoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICB3YXNtLl9fd2JnX3Byb3ZpbmdrZXlfZnJlZShwdHIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIENvbnN0cnVjdCBhIG5ldyBwcm92aW5nIGtleSBmcm9tIGEgYnl0ZSBhcnJheVxyXG4gICAgKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IGJ5dGVzXHJcbiAgICAqIEByZXR1cm5zIHtQcm92aW5nS2V5fVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBmcm9tQnl0ZXMoYnl0ZXMpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgY29uc3QgcHRyMCA9IHBhc3NBcnJheThUb1dhc20wKGJ5dGVzLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5wcm92aW5na2V5X2Zyb21CeXRlcyhyZXRwdHIsIHB0cjAsIGxlbjApO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICBpZiAocjIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBQcm92aW5nS2V5Ll9fd3JhcChyMCk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQ3JlYXRlIGEgYnl0ZSBhcnJheSBmcm9tIGEgcHJvdmluZyBrZXlcclxuICAgICogQHJldHVybnMge1VpbnQ4QXJyYXl9XHJcbiAgICAqL1xyXG4gICAgdG9CeXRlcygpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgd2FzbS5wcm92aW5na2V5X3RvQnl0ZXMocmV0cHRyLCB0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIHZhciByMyA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAzXTtcclxuICAgICAgICAgICAgaWYgKHIzKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0YWtlT2JqZWN0KHIyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdjEgPSBnZXRBcnJheVU4RnJvbVdhc20wKHIwLCByMSkuc2xpY2UoKTtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocjAsIHIxICogMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2MTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vKipcclxuKiBFbmNyeXB0ZWQgQWxlbyByZWNvcmRcclxuKi9cclxuZXhwb3J0IGNsYXNzIFJlY29yZENpcGhlcnRleHQge1xyXG5cclxuICAgIHN0YXRpYyBfX3dyYXAocHRyKSB7XHJcbiAgICAgICAgcHRyID0gcHRyID4+PiAwO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUoUmVjb3JkQ2lwaGVydGV4dC5wcm90b3R5cGUpO1xyXG4gICAgICAgIG9iai5fX3diZ19wdHIgPSBwdHI7XHJcblxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX193YmdfcHRyO1xyXG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHB0cjtcclxuICAgIH1cclxuXHJcbiAgICBmcmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgd2FzbS5fX3diZ19yZWNvcmRjaXBoZXJ0ZXh0X2ZyZWUocHRyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm4gYSByZWNvcmQgY2lwaGVydGV4dCBmcm9tIGEgc3RyaW5nLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVjb3JkXHJcbiAgICAqIEByZXR1cm5zIHtSZWNvcmRDaXBoZXJ0ZXh0fVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBmcm9tU3RyaW5nKHJlY29yZCkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAocmVjb3JkLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgICAgIHdhc20ucmVjb3JkY2lwaGVydGV4dF9mcm9tU3RyaW5nKHJldHB0ciwgcHRyMCwgbGVuMCk7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIGlmIChyMikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFJlY29yZENpcGhlcnRleHQuX193cmFwKHIwKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm4gdGhlIHJlY29yZCBjaXBoZXJ0ZXh0IHN0cmluZy5cclxuICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICovXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQxXzA7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkMV8xO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICB3YXNtLnJlY29yZGNpcGhlcnRleHRfdG9TdHJpbmcocmV0cHRyLCB0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDFfMCA9IHIwO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDFfMSA9IHIxO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0U3RyaW5nRnJvbVdhc20wKHIwLCByMSk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUoZGVmZXJyZWQxXzAsIGRlZmVycmVkMV8xLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogRGVjcnlwdCB0aGUgcmVjb3JkIGNpcGhlcnRleHQgaW50byBwbGFpbnRleHQgdXNpbmcgdGhlIHZpZXcga2V5LlxyXG4gICAgKiBAcGFyYW0ge1ZpZXdLZXl9IHZpZXdfa2V5XHJcbiAgICAqIEByZXR1cm5zIHtSZWNvcmRQbGFpbnRleHR9XHJcbiAgICAqL1xyXG4gICAgZGVjcnlwdCh2aWV3X2tleSkge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBfYXNzZXJ0Q2xhc3Modmlld19rZXksIFZpZXdLZXkpO1xyXG4gICAgICAgICAgICB3YXNtLnJlY29yZGNpcGhlcnRleHRfZGVjcnlwdChyZXRwdHIsIHRoaXMuX193YmdfcHRyLCB2aWV3X2tleS5fX3diZ19wdHIpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICBpZiAocjIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBSZWNvcmRQbGFpbnRleHQuX193cmFwKHIwKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgdmlldyBrZXkgY2FuIGRlY3J5cHQgdGhlIHJlY29yZCBjaXBoZXJ0ZXh0LlxyXG4gICAgKiBAcGFyYW0ge1ZpZXdLZXl9IHZpZXdfa2V5XHJcbiAgICAqIEByZXR1cm5zIHtib29sZWFufVxyXG4gICAgKi9cclxuICAgIGlzT3duZXIodmlld19rZXkpIHtcclxuICAgICAgICBfYXNzZXJ0Q2xhc3Modmlld19rZXksIFZpZXdLZXkpO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ucmVjb3JkY2lwaGVydGV4dF9pc093bmVyKHRoaXMuX193YmdfcHRyLCB2aWV3X2tleS5fX3diZ19wdHIpO1xyXG4gICAgICAgIHJldHVybiByZXQgIT09IDA7XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiogQWxlbyByZWNvcmQgcGxhaW50ZXh0XHJcbiovXHJcbmV4cG9ydCBjbGFzcyBSZWNvcmRQbGFpbnRleHQge1xyXG5cclxuICAgIHN0YXRpYyBfX3dyYXAocHRyKSB7XHJcbiAgICAgICAgcHRyID0gcHRyID4+PiAwO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUoUmVjb3JkUGxhaW50ZXh0LnByb3RvdHlwZSk7XHJcbiAgICAgICAgb2JqLl9fd2JnX3B0ciA9IHB0cjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX3diZ19wdHI7XHJcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gcHRyO1xyXG4gICAgfVxyXG5cclxuICAgIGZyZWUoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICB3YXNtLl9fd2JnX3JlY29yZHBsYWludGV4dF9mcmVlKHB0cik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogUmV0dXJuIGEgcmVjb3JkIHBsYWludGV4dCBmcm9tIGEgc3RyaW5nLlxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVjb3JkXHJcbiAgICAqIEByZXR1cm5zIHtSZWNvcmRQbGFpbnRleHR9XHJcbiAgICAqL1xyXG4gICAgc3RhdGljIGZyb21TdHJpbmcocmVjb3JkKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzU3RyaW5nVG9XYXNtMChyZWNvcmQsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS5yZWNvcmRwbGFpbnRleHRfZnJvbVN0cmluZyhyZXRwdHIsIHB0cjAsIGxlbjApO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICBpZiAocjIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBSZWNvcmRQbGFpbnRleHQuX193cmFwKHIwKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBSZXR1cm5zIHRoZSByZWNvcmQgcGxhaW50ZXh0IHN0cmluZ1xyXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgKi9cclxuICAgIHRvU3RyaW5nKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDFfMDtcclxuICAgICAgICBsZXQgZGVmZXJyZWQxXzE7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIHdhc20ucmVjb3JkcGxhaW50ZXh0X3RvU3RyaW5nKHJldHB0ciwgdGhpcy5fX3diZ19wdHIpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzAgPSByMDtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzEgPSByMTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFN0cmluZ0Zyb21XYXNtMChyMCwgcjEpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKGRlZmVycmVkMV8wLCBkZWZlcnJlZDFfMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIFJldHVybnMgdGhlIGFtb3VudCBvZiBtaWNyb2NyZWRpdHMgaW4gdGhlIHJlY29yZFxyXG4gICAgKiBAcmV0dXJucyB7YmlnaW50fVxyXG4gICAgKi9cclxuICAgIG1pY3JvY3JlZGl0cygpIHtcclxuICAgICAgICBjb25zdCByZXQgPSB3YXNtLnJlY29yZHBsYWludGV4dF9taWNyb2NyZWRpdHModGhpcy5fX3diZ19wdHIpO1xyXG4gICAgICAgIHJldHVybiBCaWdJbnQuYXNVaW50Tig2NCwgcmV0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBBdHRlbXB0IHRvIGdldCB0aGUgc2VyaWFsIG51bWJlciBvZiBhIHJlY29yZCB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3QgaXMgaGFzIGJlZW4gc3BlbnRcclxuICAgICogQHBhcmFtIHtQcml2YXRlS2V5fSBwcml2YXRlX2tleVxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvZ3JhbV9pZFxyXG4gICAgKiBAcGFyYW0ge3N0cmluZ30gcmVjb3JkX25hbWVcclxuICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICovXHJcbiAgICBzZXJpYWxOdW1iZXJTdHJpbmcocHJpdmF0ZV9rZXksIHByb2dyYW1faWQsIHJlY29yZF9uYW1lKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkNF8wO1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDRfMTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgX2Fzc2VydENsYXNzKHByaXZhdGVfa2V5LCBQcml2YXRlS2V5KTtcclxuICAgICAgICAgICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20wKHByb2dyYW1faWQsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgY29uc3QgcHRyMSA9IHBhc3NTdHJpbmdUb1dhc20wKHJlY29yZF9uYW1lLCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbjEgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgICAgIHdhc20ucmVjb3JkcGxhaW50ZXh0X3NlcmlhbE51bWJlclN0cmluZyhyZXRwdHIsIHRoaXMuX193YmdfcHRyLCBwcml2YXRlX2tleS5fX3diZ19wdHIsIHB0cjAsIGxlbjAsIHB0cjEsIGxlbjEpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICB2YXIgcjMgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgM107XHJcbiAgICAgICAgICAgIHZhciBwdHIzID0gcjA7XHJcbiAgICAgICAgICAgIHZhciBsZW4zID0gcjE7XHJcbiAgICAgICAgICAgIGlmIChyMykge1xyXG4gICAgICAgICAgICAgICAgcHRyMyA9IDA7IGxlbjMgPSAwO1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZGVmZXJyZWQ0XzAgPSBwdHIzO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDRfMSA9IGxlbjM7XHJcbiAgICAgICAgICAgIHJldHVybiBnZXRTdHJpbmdGcm9tV2FzbTAocHRyMywgbGVuMyk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUoZGVmZXJyZWQ0XzAsIGRlZmVycmVkNF8xLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiovXHJcbmV4cG9ydCBjbGFzcyBTaWduYXR1cmUge1xyXG5cclxuICAgIHN0YXRpYyBfX3dyYXAocHRyKSB7XHJcbiAgICAgICAgcHRyID0gcHRyID4+PiAwO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUoU2lnbmF0dXJlLnByb3RvdHlwZSk7XHJcbiAgICAgICAgb2JqLl9fd2JnX3B0ciA9IHB0cjtcclxuXHJcbiAgICAgICAgcmV0dXJuIG9iajtcclxuICAgIH1cclxuXHJcbiAgICBfX2Rlc3Ryb3lfaW50b19yYXcoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX3diZ19wdHI7XHJcbiAgICAgICAgdGhpcy5fX3diZ19wdHIgPSAwO1xyXG5cclxuICAgICAgICByZXR1cm4gcHRyO1xyXG4gICAgfVxyXG5cclxuICAgIGZyZWUoKSB7XHJcbiAgICAgICAgY29uc3QgcHRyID0gdGhpcy5fX2Rlc3Ryb3lfaW50b19yYXcoKTtcclxuICAgICAgICB3YXNtLl9fd2JnX3NpZ25hdHVyZV9mcmVlKHB0cik7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtQcml2YXRlS2V5fSBwcml2YXRlX2tleVxyXG4gICAgKiBAcGFyYW0ge1VpbnQ4QXJyYXl9IG1lc3NhZ2VcclxuICAgICogQHJldHVybnMge1NpZ25hdHVyZX1cclxuICAgICovXHJcbiAgICBzdGF0aWMgc2lnbihwcml2YXRlX2tleSwgbWVzc2FnZSkge1xyXG4gICAgICAgIF9hc3NlcnRDbGFzcyhwcml2YXRlX2tleSwgUHJpdmF0ZUtleSk7XHJcbiAgICAgICAgY29uc3QgcHRyMCA9IHBhc3NBcnJheThUb1dhc20wKG1lc3NhZ2UsIHdhc20uX193YmluZGdlbl9tYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5zaWduYXR1cmVfc2lnbihwcml2YXRlX2tleS5fX3diZ19wdHIsIHB0cjAsIGxlbjApO1xyXG4gICAgICAgIHJldHVybiBTaWduYXR1cmUuX193cmFwKHJldCk7XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogQHBhcmFtIHtBZGRyZXNzfSBhZGRyZXNzXHJcbiAgICAqIEBwYXJhbSB7VWludDhBcnJheX0gbWVzc2FnZVxyXG4gICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cclxuICAgICovXHJcbiAgICB2ZXJpZnkoYWRkcmVzcywgbWVzc2FnZSkge1xyXG4gICAgICAgIF9hc3NlcnRDbGFzcyhhZGRyZXNzLCBBZGRyZXNzKTtcclxuICAgICAgICBjb25zdCBwdHIwID0gcGFzc0FycmF5OFRvV2FzbTAobWVzc2FnZSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYyk7XHJcbiAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICBjb25zdCByZXQgPSB3YXNtLnNpZ25hdHVyZV92ZXJpZnkodGhpcy5fX3diZ19wdHIsIGFkZHJlc3MuX193YmdfcHRyLCBwdHIwLCBsZW4wKTtcclxuICAgICAgICByZXR1cm4gcmV0ICE9PSAwO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBzaWduYXR1cmVcclxuICAgICogQHJldHVybnMge1NpZ25hdHVyZX1cclxuICAgICovXHJcbiAgICBzdGF0aWMgZnJvbV9zdHJpbmcoc2lnbmF0dXJlKSB7XHJcbiAgICAgICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20wKHNpZ25hdHVyZSwgd2FzbS5fX3diaW5kZ2VuX21hbGxvYywgd2FzbS5fX3diaW5kZ2VuX3JlYWxsb2MpO1xyXG4gICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS5zaWduYXR1cmVfZnJvbV9zdHJpbmcocHRyMCwgbGVuMCk7XHJcbiAgICAgICAgcmV0dXJuIFNpZ25hdHVyZS5fX3dyYXAocmV0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgKi9cclxuICAgIHRvX3N0cmluZygpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQxXzA7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkMV8xO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICB3YXNtLnNpZ25hdHVyZV90b19zdHJpbmcocmV0cHRyLCB0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDFfMCA9IHIwO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDFfMSA9IHIxO1xyXG4gICAgICAgICAgICByZXR1cm4gZ2V0U3RyaW5nRnJvbVdhc20wKHIwLCByMSk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUoZGVmZXJyZWQxXzAsIGRlZmVycmVkMV8xLCAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuLyoqXHJcbiogV2ViYXNzZW1ibHkgUmVwcmVzZW50YXRpb24gb2YgYW4gQWxlbyB0cmFuc2FjdGlvblxyXG4qXHJcbiogVGhpcyBvYmplY3QgaXMgY3JlYXRlZCB3aGVuIGdlbmVyYXRpbmcgYW4gb24tY2hhaW4gZnVuY3Rpb24gZGVwbG95bWVudCBvciBleGVjdXRpb24gYW5kIGlzIHRoZVxyXG4qIG9iamVjdCB0aGF0IHNob3VsZCBiZSBzdWJtaXR0ZWQgdG8gdGhlIEFsZW8gTmV0d29yayBpbiBvcmRlciB0byBkZXBsb3kgb3IgZXhlY3V0ZSBhIGZ1bmN0aW9uLlxyXG4qL1xyXG5leHBvcnQgY2xhc3MgVHJhbnNhY3Rpb24ge1xyXG5cclxuICAgIHN0YXRpYyBfX3dyYXAocHRyKSB7XHJcbiAgICAgICAgcHRyID0gcHRyID4+PiAwO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUoVHJhbnNhY3Rpb24ucHJvdG90eXBlKTtcclxuICAgICAgICBvYmouX193YmdfcHRyID0gcHRyO1xyXG5cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG5cclxuICAgIF9fZGVzdHJveV9pbnRvX3JhdygpIHtcclxuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fd2JnX3B0cjtcclxuICAgICAgICB0aGlzLl9fd2JnX3B0ciA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBwdHI7XHJcbiAgICB9XHJcblxyXG4gICAgZnJlZSgpIHtcclxuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIHdhc20uX193YmdfdHJhbnNhY3Rpb25fZnJlZShwdHIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIENyZWF0ZSBhIHRyYW5zYWN0aW9uIGZyb20gYSBzdHJpbmdcclxuICAgICogQHBhcmFtIHtzdHJpbmd9IHRyYW5zYWN0aW9uXHJcbiAgICAqIEByZXR1cm5zIHtUcmFuc2FjdGlvbn1cclxuICAgICovXHJcbiAgICBzdGF0aWMgZnJvbVN0cmluZyh0cmFuc2FjdGlvbikge1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAodHJhbnNhY3Rpb24sIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS50cmFuc2FjdGlvbl9mcm9tU3RyaW5nKHJldHB0ciwgcHRyMCwgbGVuMCk7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIGlmIChyMikge1xyXG4gICAgICAgICAgICAgICAgdGhyb3cgdGFrZU9iamVjdChyMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIFRyYW5zYWN0aW9uLl9fd3JhcChyMCk7XHJcbiAgICAgICAgfSBmaW5hbGx5IHtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKDE2KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvKipcclxuICAgICogR2V0IHRoZSB0cmFuc2FjdGlvbiBhcyBhIHN0cmluZy4gSWYgeW91IHdhbnQgdG8gc3VibWl0IHRoaXMgdHJhbnNhY3Rpb24gdG8gdGhlIEFsZW8gTmV0d29ya1xyXG4gICAgKiB0aGlzIGZ1bmN0aW9uIHdpbGwgY3JlYXRlIHRoZSBzdHJpbmcgdGhhdCBzaG91bGQgYmUgc3VibWl0dGVkIGluIHRoZSBgUE9TVGAgZGF0YS5cclxuICAgICogQHJldHVybnMge3N0cmluZ31cclxuICAgICovXHJcbiAgICB0b1N0cmluZygpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQxXzA7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkMV8xO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICB3YXNtLnRyYW5zYWN0aW9uX3RvU3RyaW5nKHJldHB0ciwgdGhpcy5fX3diZ19wdHIpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzAgPSByMDtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzEgPSByMTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFN0cmluZ0Zyb21XYXNtMChyMCwgcjEpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKGRlZmVycmVkMV8wLCBkZWZlcnJlZDFfMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgaWQgb2YgdGhlIHRyYW5zYWN0aW9uLiBUaGlzIGlzIHRoZSBtZXJrbGUgcm9vdCBvZiB0aGUgdHJhbnNhY3Rpb24ncyBpbmNsdXNpb24gcHJvb2YuXHJcbiAgICAqXHJcbiAgICAqIFRoaXMgdmFsdWUgY2FuIGJlIHVzZWQgdG8gcXVlcnkgdGhlIHN0YXR1cyBvZiB0aGUgdHJhbnNhY3Rpb24gb24gdGhlIEFsZW8gTmV0d29yayB0byBzZWVcclxuICAgICogaWYgaXQgd2FzIHN1Y2Nlc3NmdWwuIElmIHN1Y2Nlc3NmdWwsIHRoZSB0cmFuc2FjdGlvbiB3aWxsIGJlIGluY2x1ZGVkIGluIGEgYmxvY2sgYW5kIHRoaXNcclxuICAgICogdmFsdWUgY2FuIGJlIHVzZWQgdG8gbG9va3VwIHRoZSB0cmFuc2FjdGlvbiBkYXRhIG9uLWNoYWluLlxyXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgKi9cclxuICAgIHRyYW5zYWN0aW9uSWQoKSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkMV8wO1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDFfMTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgd2FzbS50cmFuc2FjdGlvbl90cmFuc2FjdGlvbklkKHJldHB0ciwgdGhpcy5fX3diZ19wdHIpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzAgPSByMDtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzEgPSByMTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFN0cmluZ0Zyb21XYXNtMChyMCwgcjEpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKGRlZmVycmVkMV8wLCBkZWZlcnJlZDFfMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEdldCB0aGUgdHlwZSBvZiB0aGUgdHJhbnNhY3Rpb24gKHdpbGwgcmV0dXJuIFwiZGVwbG95XCIgb3IgXCJleGVjdXRlXCIpXHJcbiAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgdHJhbnNhY3Rpb25UeXBlKCkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDFfMDtcclxuICAgICAgICBsZXQgZGVmZXJyZWQxXzE7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIHdhc20udHJhbnNhY3Rpb25fdHJhbnNhY3Rpb25UeXBlKHJldHB0ciwgdGhpcy5fX3diZ19wdHIpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzAgPSByMDtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzEgPSByMTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFN0cmluZ0Zyb21XYXNtMChyMCwgcjEpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKGRlZmVycmVkMV8wLCBkZWZlcnJlZDFfMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbi8qKlxyXG4qL1xyXG5leHBvcnQgY2xhc3MgVmVyaWZ5aW5nS2V5IHtcclxuXHJcbiAgICBzdGF0aWMgX193cmFwKHB0cikge1xyXG4gICAgICAgIHB0ciA9IHB0ciA+Pj4gMDtcclxuICAgICAgICBjb25zdCBvYmogPSBPYmplY3QuY3JlYXRlKFZlcmlmeWluZ0tleS5wcm90b3R5cGUpO1xyXG4gICAgICAgIG9iai5fX3diZ19wdHIgPSBwdHI7XHJcblxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX193YmdfcHRyO1xyXG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHB0cjtcclxuICAgIH1cclxuXHJcbiAgICBmcmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgd2FzbS5fX3diZ192ZXJpZnlpbmdrZXlfZnJlZShwdHIpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIENvbnN0cnVjdCBhIG5ldyB2ZXJpZnlpbmcga2V5IGZyb20gYSBieXRlIGFycmF5XHJcbiAgICAqIEBwYXJhbSB7VWludDhBcnJheX0gYnl0ZXNcclxuICAgICogQHJldHVybnMge1ZlcmlmeWluZ0tleX1cclxuICAgICovXHJcbiAgICBzdGF0aWMgZnJvbUJ5dGVzKGJ5dGVzKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIGNvbnN0IHB0cjAgPSBwYXNzQXJyYXk4VG9XYXNtMChieXRlcywgd2FzbS5fX3diaW5kZ2VuX21hbGxvYyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxlbjAgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgICAgIHdhc20udmVyaWZ5aW5na2V5X2Zyb21CeXRlcyhyZXRwdHIsIHB0cjAsIGxlbjApO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgdmFyIHIyID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDJdO1xyXG4gICAgICAgICAgICBpZiAocjIpIHtcclxuICAgICAgICAgICAgICAgIHRocm93IHRha2VPYmplY3QocjEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBWZXJpZnlpbmdLZXkuX193cmFwKHIwKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBDcmVhdGUgYSBieXRlIGFycmF5IGZyb20gYSB2ZXJpZnlpbmcga2V5XHJcbiAgICAqIEByZXR1cm5zIHtVaW50OEFycmF5fVxyXG4gICAgKi9cclxuICAgIHRvQnl0ZXMoKSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgY29uc3QgcmV0cHRyID0gd2FzbS5fX3diaW5kZ2VuX2FkZF90b19zdGFja19wb2ludGVyKC0xNik7XHJcbiAgICAgICAgICAgIHdhc20udmVyaWZ5aW5na2V5X3RvQnl0ZXMocmV0cHRyLCB0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIHZhciByMyA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAzXTtcclxuICAgICAgICAgICAgaWYgKHIzKSB7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0YWtlT2JqZWN0KHIyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgdjEgPSBnZXRBcnJheVU4RnJvbVdhc20wKHIwLCByMSkuc2xpY2UoKTtcclxuICAgICAgICAgICAgd2FzbS5fX3diaW5kZ2VuX2ZyZWUocjAsIHIxICogMSk7XHJcbiAgICAgICAgICAgIHJldHVybiB2MTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vKipcclxuKi9cclxuZXhwb3J0IGNsYXNzIFZpZXdLZXkge1xyXG5cclxuICAgIHN0YXRpYyBfX3dyYXAocHRyKSB7XHJcbiAgICAgICAgcHRyID0gcHRyID4+PiAwO1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IE9iamVjdC5jcmVhdGUoVmlld0tleS5wcm90b3R5cGUpO1xyXG4gICAgICAgIG9iai5fX3diZ19wdHIgPSBwdHI7XHJcblxyXG4gICAgICAgIHJldHVybiBvYmo7XHJcbiAgICB9XHJcblxyXG4gICAgX19kZXN0cm95X2ludG9fcmF3KCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX193YmdfcHRyO1xyXG4gICAgICAgIHRoaXMuX193YmdfcHRyID0gMDtcclxuXHJcbiAgICAgICAgcmV0dXJuIHB0cjtcclxuICAgIH1cclxuXHJcbiAgICBmcmVlKCkge1xyXG4gICAgICAgIGNvbnN0IHB0ciA9IHRoaXMuX19kZXN0cm95X2ludG9fcmF3KCk7XHJcbiAgICAgICAgd2FzbS5fX3diZ192aWV3a2V5X2ZyZWUocHRyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBAcGFyYW0ge1ByaXZhdGVLZXl9IHByaXZhdGVfa2V5XHJcbiAgICAqIEByZXR1cm5zIHtWaWV3S2V5fVxyXG4gICAgKi9cclxuICAgIHN0YXRpYyBmcm9tX3ByaXZhdGVfa2V5KHByaXZhdGVfa2V5KSB7XHJcbiAgICAgICAgX2Fzc2VydENsYXNzKHByaXZhdGVfa2V5LCBQcml2YXRlS2V5KTtcclxuICAgICAgICBjb25zdCByZXQgPSB3YXNtLnZpZXdrZXlfZnJvbV9wcml2YXRlX2tleShwcml2YXRlX2tleS5fX3diZ19wdHIpO1xyXG4gICAgICAgIHJldHVybiBWaWV3S2V5Ll9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3X2tleVxyXG4gICAgKiBAcmV0dXJucyB7Vmlld0tleX1cclxuICAgICovXHJcbiAgICBzdGF0aWMgZnJvbV9zdHJpbmcodmlld19rZXkpIHtcclxuICAgICAgICBjb25zdCBwdHIwID0gcGFzc1N0cmluZ1RvV2FzbTAodmlld19rZXksIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICBjb25zdCBsZW4wID0gV0FTTV9WRUNUT1JfTEVOO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20udmlld2tleV9mcm9tX3N0cmluZyhwdHIwLCBsZW4wKTtcclxuICAgICAgICByZXR1cm4gVmlld0tleS5fX3dyYXAocmV0KTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBAcmV0dXJucyB7c3RyaW5nfVxyXG4gICAgKi9cclxuICAgIHRvX3N0cmluZygpIHtcclxuICAgICAgICBsZXQgZGVmZXJyZWQxXzA7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkMV8xO1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJldHB0ciA9IHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigtMTYpO1xyXG4gICAgICAgICAgICB3YXNtLnZpZXdrZXlfdG9fc3RyaW5nKHJldHB0ciwgdGhpcy5fX3diZ19wdHIpO1xyXG4gICAgICAgICAgICB2YXIgcjAgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMF07XHJcbiAgICAgICAgICAgIHZhciByMSA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAxXTtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzAgPSByMDtcclxuICAgICAgICAgICAgZGVmZXJyZWQxXzEgPSByMTtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFN0cmluZ0Zyb21XYXNtMChyMCwgcjEpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9hZGRfdG9fc3RhY2tfcG9pbnRlcigxNik7XHJcbiAgICAgICAgICAgIHdhc20uX193YmluZGdlbl9mcmVlKGRlZmVycmVkMV8wLCBkZWZlcnJlZDFfMSwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEByZXR1cm5zIHtBZGRyZXNzfVxyXG4gICAgKi9cclxuICAgIHRvX2FkZHJlc3MoKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS52aWV3a2V5X3RvX2FkZHJlc3ModGhpcy5fX3diZ19wdHIpO1xyXG4gICAgICAgIHJldHVybiBBZGRyZXNzLl9fd3JhcChyZXQpO1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqIEBwYXJhbSB7c3RyaW5nfSBjaXBoZXJ0ZXh0XHJcbiAgICAqIEByZXR1cm5zIHtzdHJpbmd9XHJcbiAgICAqL1xyXG4gICAgZGVjcnlwdChjaXBoZXJ0ZXh0KSB7XHJcbiAgICAgICAgbGV0IGRlZmVycmVkM18wO1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDNfMTtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICBjb25zdCByZXRwdHIgPSB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoLTE2KTtcclxuICAgICAgICAgICAgY29uc3QgcHRyMCA9IHBhc3NTdHJpbmdUb1dhc20wKGNpcGhlcnRleHQsIHdhc20uX193YmluZGdlbl9tYWxsb2MsIHdhc20uX193YmluZGdlbl9yZWFsbG9jKTtcclxuICAgICAgICAgICAgY29uc3QgbGVuMCA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICAgICAgd2FzbS52aWV3a2V5X2RlY3J5cHQocmV0cHRyLCB0aGlzLl9fd2JnX3B0ciwgcHRyMCwgbGVuMCk7XHJcbiAgICAgICAgICAgIHZhciByMCA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAwXTtcclxuICAgICAgICAgICAgdmFyIHIxID0gZ2V0SW50MzJNZW1vcnkwKClbcmV0cHRyIC8gNCArIDFdO1xyXG4gICAgICAgICAgICB2YXIgcjIgPSBnZXRJbnQzMk1lbW9yeTAoKVtyZXRwdHIgLyA0ICsgMl07XHJcbiAgICAgICAgICAgIHZhciByMyA9IGdldEludDMyTWVtb3J5MCgpW3JldHB0ciAvIDQgKyAzXTtcclxuICAgICAgICAgICAgdmFyIHB0cjIgPSByMDtcclxuICAgICAgICAgICAgdmFyIGxlbjIgPSByMTtcclxuICAgICAgICAgICAgaWYgKHIzKSB7XHJcbiAgICAgICAgICAgICAgICBwdHIyID0gMDsgbGVuMiA9IDA7XHJcbiAgICAgICAgICAgICAgICB0aHJvdyB0YWtlT2JqZWN0KHIyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBkZWZlcnJlZDNfMCA9IHB0cjI7XHJcbiAgICAgICAgICAgIGRlZmVycmVkM18xID0gbGVuMjtcclxuICAgICAgICAgICAgcmV0dXJuIGdldFN0cmluZ0Zyb21XYXNtMChwdHIyLCBsZW4yKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fYWRkX3RvX3N0YWNrX3BvaW50ZXIoMTYpO1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShkZWZlcnJlZDNfMCwgZGVmZXJyZWQzXzEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4vKipcclxuKi9cclxuZXhwb3J0IGNsYXNzIHdiZ19yYXlvbl9Qb29sQnVpbGRlciB7XHJcblxyXG4gICAgc3RhdGljIF9fd3JhcChwdHIpIHtcclxuICAgICAgICBwdHIgPSBwdHIgPj4+IDA7XHJcbiAgICAgICAgY29uc3Qgb2JqID0gT2JqZWN0LmNyZWF0ZSh3YmdfcmF5b25fUG9vbEJ1aWxkZXIucHJvdG90eXBlKTtcclxuICAgICAgICBvYmouX193YmdfcHRyID0gcHRyO1xyXG5cclxuICAgICAgICByZXR1cm4gb2JqO1xyXG4gICAgfVxyXG5cclxuICAgIF9fZGVzdHJveV9pbnRvX3JhdygpIHtcclxuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fd2JnX3B0cjtcclxuICAgICAgICB0aGlzLl9fd2JnX3B0ciA9IDA7XHJcblxyXG4gICAgICAgIHJldHVybiBwdHI7XHJcbiAgICB9XHJcblxyXG4gICAgZnJlZSgpIHtcclxuICAgICAgICBjb25zdCBwdHIgPSB0aGlzLl9fZGVzdHJveV9pbnRvX3JhdygpO1xyXG4gICAgICAgIHdhc20uX193Ymdfd2JnX3JheW9uX3Bvb2xidWlsZGVyX2ZyZWUocHRyKTtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgKi9cclxuICAgIG51bVRocmVhZHMoKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2FzbS53YmdfcmF5b25fcG9vbGJ1aWxkZXJfbnVtVGhyZWFkcyh0aGlzLl9fd2JnX3B0cik7XHJcbiAgICAgICAgcmV0dXJuIHJldCA+Pj4gMDtcclxuICAgIH1cclxuICAgIC8qKlxyXG4gICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAgKi9cclxuICAgIHJlY2VpdmVyKCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHdhc20ud2JnX3JheW9uX3Bvb2xidWlsZGVyX3JlY2VpdmVyKHRoaXMuX193YmdfcHRyKTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfVxyXG4gICAgLyoqXHJcbiAgICAqL1xyXG4gICAgYnVpbGQoKSB7XHJcbiAgICAgICAgd2FzbS53YmdfcmF5b25fcG9vbGJ1aWxkZXJfYnVpbGQodGhpcy5fX3diZ19wdHIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBfX3diZ19sb2FkKG1vZHVsZSwgaW1wb3J0cykge1xyXG4gICAgaWYgKHR5cGVvZiBSZXNwb25zZSA9PT0gJ2Z1bmN0aW9uJyAmJiBtb2R1bGUgaW5zdGFuY2VvZiBSZXNwb25zZSkge1xyXG4gICAgICAgIGlmICh0eXBlb2YgV2ViQXNzZW1ibHkuaW5zdGFudGlhdGVTdHJlYW1pbmcgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZVN0cmVhbWluZyhtb2R1bGUsIGltcG9ydHMpO1xyXG5cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKG1vZHVsZS5oZWFkZXJzLmdldCgnQ29udGVudC1UeXBlJykgIT0gJ2FwcGxpY2F0aW9uL3dhc20nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiYFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlU3RyZWFtaW5nYCBmYWlsZWQgYmVjYXVzZSB5b3VyIHNlcnZlciBkb2VzIG5vdCBzZXJ2ZSB3YXNtIHdpdGggYGFwcGxpY2F0aW9uL3dhc21gIE1JTUUgdHlwZS4gRmFsbGluZyBiYWNrIHRvIGBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZWAgd2hpY2ggaXMgc2xvd2VyLiBPcmlnaW5hbCBlcnJvcjpcXG5cIiwgZSk7XHJcblxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBieXRlcyA9IGF3YWl0IG1vZHVsZS5hcnJheUJ1ZmZlcigpO1xyXG4gICAgICAgIHJldHVybiBhd2FpdCBXZWJBc3NlbWJseS5pbnN0YW50aWF0ZShieXRlcywgaW1wb3J0cyk7XHJcblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBpbnN0YW5jZSA9IGF3YWl0IFdlYkFzc2VtYmx5Lmluc3RhbnRpYXRlKG1vZHVsZSwgaW1wb3J0cyk7XHJcblxyXG4gICAgICAgIGlmIChpbnN0YW5jZSBpbnN0YW5jZW9mIFdlYkFzc2VtYmx5Lkluc3RhbmNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB7IGluc3RhbmNlLCBtb2R1bGUgfTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcmV0dXJuIGluc3RhbmNlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZnVuY3Rpb24gX193YmdfZ2V0X2ltcG9ydHMoKSB7XHJcbiAgICBjb25zdCBpbXBvcnRzID0ge307XHJcbiAgICBpbXBvcnRzLndiZyA9IHt9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9vYmplY3RfZHJvcF9yZWYgPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgdGFrZU9iamVjdChhcmcwKTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diaW5kZ2VuX3N0cmluZ19uZXcgPSBmdW5jdGlvbihhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzAsIGFyZzEpO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfdHJhbnNhY3Rpb25fbmV3ID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IFRyYW5zYWN0aW9uLl9fd3JhcChhcmcwKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX2xvZ18zOGM5MzlhNTIxM2IxYmUyID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGdldFN0cmluZ0Zyb21XYXNtMChhcmcwLCBhcmcxKSk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9zdHJpbmdfZ2V0ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IGdldE9iamVjdChhcmcxKTtcclxuICAgICAgICBjb25zdCByZXQgPSB0eXBlb2Yob2JqKSA9PT0gJ3N0cmluZycgPyBvYmogOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgdmFyIHB0cjEgPSBpc0xpa2VOb25lKHJldCkgPyAwIDogcGFzc1N0cmluZ1RvV2FzbTAocmV0LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgdmFyIGxlbjEgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgZ2V0SW50MzJNZW1vcnkwKClbYXJnMCAvIDQgKyAxXSA9IGxlbjE7XHJcbiAgICAgICAgZ2V0SW50MzJNZW1vcnkwKClbYXJnMCAvIDQgKyAwXSA9IHB0cjE7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9jYl9kcm9wID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IG9iaiA9IHRha2VPYmplY3QoYXJnMCkub3JpZ2luYWw7XHJcbiAgICAgICAgaWYgKG9iai5jbnQtLSA9PSAxKSB7XHJcbiAgICAgICAgICAgIG9iai5hID0gMDtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IHJldCA9IGZhbHNlO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9vYmplY3RfY2xvbmVfcmVmID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcwKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX25ld19hYmRhNzZlODgzYmE4YTVmID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gbmV3IEVycm9yKCk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19zdGFja182NTgyNzlmZTQ0NTQxY2Y2ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcxKS5zdGFjaztcclxuICAgICAgICBjb25zdCBwdHIxID0gcGFzc1N0cmluZ1RvV2FzbTAocmV0LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgY29uc3QgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICBnZXRJbnQzMk1lbW9yeTAoKVthcmcwIC8gNCArIDFdID0gbGVuMTtcclxuICAgICAgICBnZXRJbnQzMk1lbW9yeTAoKVthcmcwIC8gNCArIDBdID0gcHRyMTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19lcnJvcl9mODUxNjY3YWY3MWJjZmM2ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xyXG4gICAgICAgIGxldCBkZWZlcnJlZDBfMDtcclxuICAgICAgICBsZXQgZGVmZXJyZWQwXzE7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgZGVmZXJyZWQwXzAgPSBhcmcwO1xyXG4gICAgICAgICAgICBkZWZlcnJlZDBfMSA9IGFyZzE7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzAsIGFyZzEpKTtcclxuICAgICAgICB9IGZpbmFsbHkge1xyXG4gICAgICAgICAgICB3YXNtLl9fd2JpbmRnZW5fZnJlZShkZWZlcnJlZDBfMCwgZGVmZXJyZWQwXzEsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19mZXRjaF81NzQyOWI4N2JlM2RjYzMzID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGZldGNoKGdldE9iamVjdChhcmcwKSk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diaW5kZ2VuX2xpbmtfMjIwNDY5NjNmZTBiNzA3YSA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBcImRhdGE6YXBwbGljYXRpb24vamF2YXNjcmlwdCxcIiArIGVuY29kZVVSSUNvbXBvbmVudChgb25tZXNzYWdlID0gZnVuY3Rpb24gKGV2KSB7XHJcbiAgICAgICAgICAgIGxldCBbaWEsIGluZGV4LCB2YWx1ZV0gPSBldi5kYXRhO1xyXG4gICAgICAgICAgICBpYSA9IG5ldyBJbnQzMkFycmF5KGlhLmJ1ZmZlcik7XHJcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBBdG9taWNzLndhaXQoaWEsIGluZGV4LCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHBvc3RNZXNzYWdlKHJlc3VsdCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICBgKTtcclxuICAgICAgICBjb25zdCBwdHIxID0gcGFzc1N0cmluZ1RvV2FzbTAocmV0LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgY29uc3QgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICBnZXRJbnQzMk1lbW9yeTAoKVthcmcwIC8gNCArIDFdID0gbGVuMTtcclxuICAgICAgICBnZXRJbnQzMk1lbW9yeTAoKVthcmcwIC8gNCArIDBdID0gcHRyMTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ193YWl0QXN5bmNfNjBmYjVlMmU4NjQ2N2UzMSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IEF0b21pY3Mud2FpdEFzeW5jO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9pc191bmRlZmluZWQgPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApID09PSB1bmRlZmluZWQ7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ193YWl0QXN5bmNfNzNmZDZlYjNiYWNlMGE4ZCA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEsIGFyZzIpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBBdG9taWNzLndhaXRBc3luYyhnZXRPYmplY3QoYXJnMCksIGFyZzEsIGFyZzIpO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfYXN5bmNfZTFhMmE2NjlhYWNmMzVmZiA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkuYXN5bmM7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ192YWx1ZV81NTVlNGY1NjQxOTNkYjA1ID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcwKS52YWx1ZTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JpbmRnZW5fbnVtYmVyX25ldyA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBhcmcwO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfZmV0Y2hfOGVhZjAxODU3YTViYjIxZiA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkuZmV0Y2goZ2V0T2JqZWN0KGFyZzEpKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX3NpZ25hbF80YmQxOGZiNDg5YWYyZDRjID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcwKS5zaWduYWw7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19uZXdfNTVjOTk1NTcyMjk1MjM3NCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfYWJvcnRfNjU0Yjc5NjE3NmQxMTdhYSA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBnZXRPYmplY3QoYXJnMCkuYWJvcnQoKTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19uZXdfMWVlYWQ2MmY2NGNhMTVjZSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IG5ldyBIZWFkZXJzKCk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH0sIGFyZ3VtZW50cykgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX2FwcGVuZF9mZGE5ZTM0MzJlM2U4OGRhID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoYXJnMCwgYXJnMSwgYXJnMiwgYXJnMywgYXJnNCkge1xyXG4gICAgICAgIGdldE9iamVjdChhcmcwKS5hcHBlbmQoZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzEsIGFyZzIpLCBnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMywgYXJnNCkpO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193Ymdfc3RhdHVzXzExNGVmNmZlMjdmYjhiMDAgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLnN0YXR1cztcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfcmVzcG9uc2VfZjJhY2YyZWNiZTAyMTcxMCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkucmVzcG9uc2U7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH0sIGFyZ3VtZW50cykgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX3Jlc3BvbnNlVGV4dF9kYTI3NTY2NzI1MWZkMTUzID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoYXJnMCwgYXJnMSkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcxKS5yZXNwb25zZVRleHQ7XHJcbiAgICAgICAgdmFyIHB0cjEgPSBpc0xpa2VOb25lKHJldCkgPyAwIDogcGFzc1N0cmluZ1RvV2FzbTAocmV0LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgdmFyIGxlbjEgPSBXQVNNX1ZFQ1RPUl9MRU47XHJcbiAgICAgICAgZ2V0SW50MzJNZW1vcnkwKClbYXJnMCAvIDQgKyAxXSA9IGxlbjE7XHJcbiAgICAgICAgZ2V0SW50MzJNZW1vcnkwKClbYXJnMCAvIDQgKyAwXSA9IHB0cjE7XHJcbiAgICB9LCBhcmd1bWVudHMpIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19uZXdfZGFhZmZmNTg0YzcxNTkzYiA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9LCBhcmd1bWVudHMpIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19vcGVuXzU2ZmExZWI5NTk4OWY2YTUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwLCBhcmcxLCBhcmcyLCBhcmczLCBhcmc0LCBhcmc1KSB7XHJcbiAgICAgICAgZ2V0T2JqZWN0KGFyZzApLm9wZW4oZ2V0U3RyaW5nRnJvbVdhc20wKGFyZzEsIGFyZzIpLCBnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMywgYXJnNCksIGFyZzUgIT09IDApO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193Ymdfb3ZlcnJpZGVNaW1lVHlwZV8xYTY2MWQxN2RhNWY4YmFmID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoYXJnMCwgYXJnMSwgYXJnMikge1xyXG4gICAgICAgIGdldE9iamVjdChhcmcwKS5vdmVycmlkZU1pbWVUeXBlKGdldFN0cmluZ0Zyb21XYXNtMChhcmcxLCBhcmcyKSk7XHJcbiAgICB9LCBhcmd1bWVudHMpIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19zZW5kXzlmNTAwN2VhZTkwOGM3MmUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwKSB7XHJcbiAgICAgICAgZ2V0T2JqZWN0KGFyZzApLnNlbmQoKTtcclxuICAgIH0sIGFyZ3VtZW50cykgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX2luc3RhbmNlb2ZfUmVzcG9uc2VfZmM0MzI3ZGJmY2RmNWNlZCA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBsZXQgcmVzdWx0O1xyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IGdldE9iamVjdChhcmcwKSBpbnN0YW5jZW9mIFJlc3BvbnNlO1xyXG4gICAgICAgIH0gY2F0Y2gge1xyXG4gICAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcmV0ID0gcmVzdWx0O1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfdXJsXzg1MDNkZTk3ZjY5ZGE0NjMgPSBmdW5jdGlvbihhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzEpLnVybDtcclxuICAgICAgICBjb25zdCBwdHIxID0gcGFzc1N0cmluZ1RvV2FzbTAocmV0LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgY29uc3QgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICBnZXRJbnQzMk1lbW9yeTAoKVthcmcwIC8gNCArIDFdID0gbGVuMTtcclxuICAgICAgICBnZXRJbnQzMk1lbW9yeTAoKVthcmcwIC8gNCArIDBdID0gcHRyMTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19zdGF0dXNfYWM4NWEzMTQyYTg0Y2FhMiA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkuc3RhdHVzO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfaGVhZGVyc19iNzBkZTg2YjhlOTg5YmMwID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcwKS5oZWFkZXJzO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfYXJyYXlCdWZmZXJfMjg4ZmIzNTM4ODA2ZTg1YyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkuYXJyYXlCdWZmZXIoKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfZGF0YV9hYjk5YWU0YTJlMWU4YmM5ID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcwKS5kYXRhO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfbmV3d2l0aHN0cmFuZGluaXRfY2FkNWNkNjAzOGM3ZmY1ZCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKGFyZzAsIGFyZzEsIGFyZzIpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBuZXcgUmVxdWVzdChnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMCwgYXJnMSksIGdldE9iamVjdChhcmcyKSk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH0sIGFyZ3VtZW50cykgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX3NldG9ubWVzc2FnZV9mMGJkMDI4MDU3M2I3MDg0ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xyXG4gICAgICAgIGdldE9iamVjdChhcmcwKS5vbm1lc3NhZ2UgPSBnZXRPYmplY3QoYXJnMSk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfbmV3XzhlNzMyMmY0NmQ1ZDAxOWMgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gbmV3IFdvcmtlcihnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMCwgYXJnMSkpO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9LCBhcmd1bWVudHMpIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19wb3N0TWVzc2FnZV84YzYwOWUyYmRlMzMzZDljID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoYXJnMCwgYXJnMSkge1xyXG4gICAgICAgIGdldE9iamVjdChhcmcwKS5wb3N0TWVzc2FnZShnZXRPYmplY3QoYXJnMSkpO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfZ2V0UmFuZG9tVmFsdWVzXzM3ZmEyY2E5ZTRlMDdmYWIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgZ2V0T2JqZWN0KGFyZzApLmdldFJhbmRvbVZhbHVlcyhnZXRPYmplY3QoYXJnMSkpO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfcmFuZG9tRmlsbFN5bmNfZGMxZTlhNjBjMTU4MzM2ZCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKGFyZzAsIGFyZzEpIHtcclxuICAgICAgICBnZXRPYmplY3QoYXJnMCkucmFuZG9tRmlsbFN5bmModGFrZU9iamVjdChhcmcxKSk7XHJcbiAgICB9LCBhcmd1bWVudHMpIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19jcnlwdG9fYzQ4YTc3NGIwMjJkMjBhYyA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkuY3J5cHRvO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9pc19vYmplY3QgPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgdmFsID0gZ2V0T2JqZWN0KGFyZzApO1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHR5cGVvZih2YWwpID09PSAnb2JqZWN0JyAmJiB2YWwgIT09IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19wcm9jZXNzXzI5ODczNGNmMjU1YTg4NWQgPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLnByb2Nlc3M7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ192ZXJzaW9uc19lMmU3OGUxMzRlM2U1ZDAxID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcwKS52ZXJzaW9ucztcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX25vZGVfMWNkN2E1ZDg1M2RiZWE3OSA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkubm9kZTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JpbmRnZW5faXNfc3RyaW5nID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHR5cGVvZihnZXRPYmplY3QoYXJnMCkpID09PSAnc3RyaW5nJztcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX21zQ3J5cHRvX2JjYjk3MDY0MGY1MGExZTggPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLm1zQ3J5cHRvO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfcmVxdWlyZV84ZjA4Y2VlY2VjMGY0ZmVlID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gbW9kdWxlLnJlcXVpcmU7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH0sIGFyZ3VtZW50cykgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JpbmRnZW5faXNfZnVuY3Rpb24gPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gdHlwZW9mKGdldE9iamVjdChhcmcwKSkgPT09ICdmdW5jdGlvbic7XHJcbiAgICAgICAgcmV0dXJuIHJldDtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19nZXRfNDRiZTA0OTFmOTMzYTQzNSA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMClbYXJnMSA+Pj4gMF07XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19sZW5ndGhfZmZmNTFlZTY1MjJhMWExOCA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkubGVuZ3RoO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfbmV3bm9hcmdzXzU4MTk2N2VhY2MwZTI2MDQgPSBmdW5jdGlvbihhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gbmV3IEZ1bmN0aW9uKGdldFN0cmluZ0Zyb21XYXNtMChhcmcwLCBhcmcxKSk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19uZXh0XzUyNmZjNDdlOTgwZGEwMDggPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLm5leHQ7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19uZXh0X2RkYjMzMTJjYTFjNGUzMmEgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLm5leHQoKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfZG9uZV81YzFmMDFmYjY2MGQ3M2I1ID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdldE9iamVjdChhcmcwKS5kb25lO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfdmFsdWVfMTY5NTY3NTEzODY4NGJkNSA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkudmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19pdGVyYXRvcl85N2YwYzgxMjA5YzZjMzVhID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gU3ltYm9sLml0ZXJhdG9yO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfZ2V0Xzk3YjU2MWZiNTZmMDM0YjUgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gUmVmbGVjdC5nZXQoZ2V0T2JqZWN0KGFyZzApLCBnZXRPYmplY3QoYXJnMSkpO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9LCBhcmd1bWVudHMpIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19jYWxsX2NiNjU1NDFkOTVkNzEyODIgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLmNhbGwoZ2V0T2JqZWN0KGFyZzEpKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfbmV3X2I1MTU4NWRlMWIyMzRhZmYgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBuZXcgT2JqZWN0KCk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19zZWxmXzFmZjFkNzI5ZTlhYWU5MzggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBzZWxmLnNlbGY7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH0sIGFyZ3VtZW50cykgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX3dpbmRvd181ZjRmYWVmNmMxMmI3OWVjID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gd2luZG93LndpbmRvdztcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfZ2xvYmFsVGhpc18xZDM5NzE0NDA1NTgyZDNjID0gZnVuY3Rpb24oKSB7IHJldHVybiBoYW5kbGVFcnJvcihmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2xvYmFsVGhpcy5nbG9iYWxUaGlzO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9LCBhcmd1bWVudHMpIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19nbG9iYWxfNjUxZjA1YzZhMDk0NGQxYyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IGdsb2JhbC5nbG9iYWw7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH0sIGFyZ3VtZW50cykgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX25ld3dpdGhsZW5ndGhfM2VjMDk4YTM2MGRhMTkwOSA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBuZXcgQXJyYXkoYXJnMCA+Pj4gMCk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19zZXRfNTAyZDI5MDcwZWExODU1NyA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEsIGFyZzIpIHtcclxuICAgICAgICBnZXRPYmplY3QoYXJnMClbYXJnMSA+Pj4gMF0gPSB0YWtlT2JqZWN0KGFyZzIpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX29mXzNmNjkwMDdiYjRlZWFlNjUgPSBmdW5jdGlvbihhcmcwLCBhcmcxLCBhcmcyKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gQXJyYXkub2YoZ2V0T2JqZWN0KGFyZzApLCBnZXRPYmplY3QoYXJnMSksIGdldE9iamVjdChhcmcyKSk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19jYWxsXzAxNzM0ZGU1NWQ2MWUxMWQgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwLCBhcmcxLCBhcmcyKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLmNhbGwoZ2V0T2JqZWN0KGFyZzEpLCBnZXRPYmplY3QoYXJnMikpO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9LCBhcmd1bWVudHMpIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19uZXdfNDNmMWI0N2MyODgxM2NiZCA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICB2YXIgc3RhdGUwID0ge2E6IGFyZzAsIGI6IGFyZzF9O1xyXG4gICAgICAgICAgICB2YXIgY2IwID0gKGFyZzAsIGFyZzEpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGEgPSBzdGF0ZTAuYTtcclxuICAgICAgICAgICAgICAgIHN0YXRlMC5hID0gMDtcclxuICAgICAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9fd2JnX2FkYXB0ZXJfMjE5KGEsIHN0YXRlMC5iLCBhcmcwLCBhcmcxKTtcclxuICAgICAgICAgICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUwLmEgPSBhO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb25zdCByZXQgPSBuZXcgUHJvbWlzZShjYjApO1xyXG4gICAgICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgICAgIH0gZmluYWxseSB7XHJcbiAgICAgICAgICAgIHN0YXRlMC5hID0gc3RhdGUwLmIgPSAwO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19yZXNvbHZlXzUzNjk4Yjk1YWFmN2ZjZjggPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gUHJvbWlzZS5yZXNvbHZlKGdldE9iamVjdChhcmcwKSk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ190aGVuX2Y3ZTA2ZWUzYzExNjk4ZWIgPSBmdW5jdGlvbihhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLnRoZW4oZ2V0T2JqZWN0KGFyZzEpKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX3RoZW5fYjIyNjc1NDFlMmE3Mzg2NSA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEsIGFyZzIpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkudGhlbihnZXRPYmplY3QoYXJnMSksIGdldE9iamVjdChhcmcyKSk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19idWZmZXJfMDg1ZWMxZjY5NDAxOGM0ZiA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBnZXRPYmplY3QoYXJnMCkuYnVmZmVyO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfbmV3X2EwYWY2ODA0MTY4OGU4ZmQgPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gbmV3IEludDMyQXJyYXkoZ2V0T2JqZWN0KGFyZzApKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX25ld3dpdGhieXRlb2Zmc2V0YW5kbGVuZ3RoXzZkYThlNTI3NjU5Yjg2YWEgPSBmdW5jdGlvbihhcmcwLCBhcmcxLCBhcmcyKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gbmV3IFVpbnQ4QXJyYXkoZ2V0T2JqZWN0KGFyZzApLCBhcmcxID4+PiAwLCBhcmcyID4+PiAwKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX25ld184MTI1ZTMxOGU2MjQ1ZWVkID0gZnVuY3Rpb24oYXJnMCkge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IG5ldyBVaW50OEFycmF5KGdldE9iamVjdChhcmcwKSk7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19zZXRfNWNmOTAyMzgxMTUxODJjMyA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEsIGFyZzIpIHtcclxuICAgICAgICBnZXRPYmplY3QoYXJnMCkuc2V0KGdldE9iamVjdChhcmcxKSwgYXJnMiA+Pj4gMCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfbGVuZ3RoXzcyZTIyMDhiYmMwZWZjNjEgPSBmdW5jdGlvbihhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLmxlbmd0aDtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX25ld3dpdGhsZW5ndGhfZTVkNjkxNzRkNjk4NGNkNyA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICBjb25zdCByZXQgPSBuZXcgVWludDhBcnJheShhcmcwID4+PiAwKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX3N1YmFycmF5XzEzZGIyNjlmNTdhYTgzOGQgPSBmdW5jdGlvbihhcmcwLCBhcmcxLCBhcmcyKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZ2V0T2JqZWN0KGFyZzApLnN1YmFycmF5KGFyZzEgPj4+IDAsIGFyZzIgPj4+IDApO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193Ymdfc3RyaW5naWZ5X2UyNTQ2NTkzOGYzZjYxMWYgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gSlNPTi5zdHJpbmdpZnkoZ2V0T2JqZWN0KGFyZzApKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmdfaGFzX2M1ZmNkMDIwMjkxZTU2YjggPSBmdW5jdGlvbigpIHsgcmV0dXJuIGhhbmRsZUVycm9yKGZ1bmN0aW9uIChhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gUmVmbGVjdC5oYXMoZ2V0T2JqZWN0KGFyZzApLCBnZXRPYmplY3QoYXJnMSkpO1xyXG4gICAgICAgIHJldHVybiByZXQ7XHJcbiAgICB9LCBhcmd1bWVudHMpIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diZ19zZXRfMDkyZTA2YjBmOWQ3MTg2NSA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gaGFuZGxlRXJyb3IoZnVuY3Rpb24gKGFyZzAsIGFyZzEsIGFyZzIpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBSZWZsZWN0LnNldChnZXRPYmplY3QoYXJnMCksIGdldE9iamVjdChhcmcxKSwgZ2V0T2JqZWN0KGFyZzIpKTtcclxuICAgICAgICByZXR1cm4gcmV0O1xyXG4gICAgfSwgYXJndW1lbnRzKSB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9kZWJ1Z19zdHJpbmcgPSBmdW5jdGlvbihhcmcwLCBhcmcxKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gZGVidWdTdHJpbmcoZ2V0T2JqZWN0KGFyZzEpKTtcclxuICAgICAgICBjb25zdCBwdHIxID0gcGFzc1N0cmluZ1RvV2FzbTAocmV0LCB3YXNtLl9fd2JpbmRnZW5fbWFsbG9jLCB3YXNtLl9fd2JpbmRnZW5fcmVhbGxvYyk7XHJcbiAgICAgICAgY29uc3QgbGVuMSA9IFdBU01fVkVDVE9SX0xFTjtcclxuICAgICAgICBnZXRJbnQzMk1lbW9yeTAoKVthcmcwIC8gNCArIDFdID0gbGVuMTtcclxuICAgICAgICBnZXRJbnQzMk1lbW9yeTAoKVthcmcwIC8gNCArIDBdID0gcHRyMTtcclxuICAgIH07XHJcbiAgICBpbXBvcnRzLndiZy5fX3diaW5kZ2VuX3Rocm93ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSkge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcihnZXRTdHJpbmdGcm9tV2FzbTAoYXJnMCwgYXJnMSkpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JpbmRnZW5fcmV0aHJvdyA9IGZ1bmN0aW9uKGFyZzApIHtcclxuICAgICAgICB0aHJvdyB0YWtlT2JqZWN0KGFyZzApO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JpbmRnZW5fbW9kdWxlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc3QgcmV0ID0gX193YmdfaW5pdC5fX3diaW5kZ2VuX3dhc21fbW9kdWxlO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9tZW1vcnkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICBjb25zdCByZXQgPSB3YXNtLm1lbW9yeTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JnX3N0YXJ0V29ya2Vyc182ZmQzYWYyODVlYTExMTM2ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSwgYXJnMikge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IHN0YXJ0V29ya2Vycyh0YWtlT2JqZWN0KGFyZzApLCB0YWtlT2JqZWN0KGFyZzEpLCB3YmdfcmF5b25fUG9vbEJ1aWxkZXIuX193cmFwKGFyZzIpKTtcclxuICAgICAgICByZXR1cm4gYWRkSGVhcE9iamVjdChyZXQpO1xyXG4gICAgfTtcclxuICAgIGltcG9ydHMud2JnLl9fd2JpbmRnZW5fY2xvc3VyZV93cmFwcGVyNjIyNiA9IGZ1bmN0aW9uKGFyZzAsIGFyZzEsIGFyZzIpIHtcclxuICAgICAgICBjb25zdCByZXQgPSBtYWtlTXV0Q2xvc3VyZShhcmcwLCBhcmcxLCA5NjgsIF9fd2JnX2FkYXB0ZXJfMzIpO1xyXG4gICAgICAgIHJldHVybiBhZGRIZWFwT2JqZWN0KHJldCk7XHJcbiAgICB9O1xyXG4gICAgaW1wb3J0cy53YmcuX193YmluZGdlbl9jbG9zdXJlX3dyYXBwZXI2MjI3ID0gZnVuY3Rpb24oYXJnMCwgYXJnMSwgYXJnMikge1xyXG4gICAgICAgIGNvbnN0IHJldCA9IG1ha2VNdXRDbG9zdXJlKGFyZzAsIGFyZzEsIDk2OCwgX193YmdfYWRhcHRlcl8zMik7XHJcbiAgICAgICAgcmV0dXJuIGFkZEhlYXBPYmplY3QocmV0KTtcclxuICAgIH07XHJcblxyXG4gICAgcmV0dXJuIGltcG9ydHM7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIF9fd2JnX2luaXRfbWVtb3J5KGltcG9ydHMsIG1heWJlX21lbW9yeSkge1xyXG4gICAgaW1wb3J0cy53YmcubWVtb3J5ID0gbWF5YmVfbWVtb3J5IHx8IG5ldyBXZWJBc3NlbWJseS5NZW1vcnkoe2luaXRpYWw6MTIyLG1heGltdW06NjU1MzYsc2hhcmVkOnRydWV9KTtcclxufVxyXG5cclxuZnVuY3Rpb24gX193YmdfZmluYWxpemVfaW5pdChpbnN0YW5jZSwgbW9kdWxlKSB7XHJcbiAgICB3YXNtID0gaW5zdGFuY2UuZXhwb3J0cztcclxuICAgIF9fd2JnX2luaXQuX193YmluZGdlbl93YXNtX21vZHVsZSA9IG1vZHVsZTtcclxuICAgIGNhY2hlZEludDMyTWVtb3J5MCA9IG51bGw7XHJcbiAgICBjYWNoZWRVaW50OE1lbW9yeTAgPSBudWxsO1xyXG5cclxuICAgIHdhc20uX193YmluZGdlbl9zdGFydCgpO1xyXG4gICAgcmV0dXJuIHdhc207XHJcbn1cclxuXHJcbmZ1bmN0aW9uIGluaXRTeW5jKG1vZHVsZSwgbWF5YmVfbWVtb3J5KSB7XHJcbiAgICBpZiAod2FzbSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gd2FzbTtcclxuXHJcbiAgICBjb25zdCBpbXBvcnRzID0gX193YmdfZ2V0X2ltcG9ydHMoKTtcclxuXHJcbiAgICBfX3diZ19pbml0X21lbW9yeShpbXBvcnRzLCBtYXliZV9tZW1vcnkpO1xyXG5cclxuICAgIGlmICghKG1vZHVsZSBpbnN0YW5jZW9mIFdlYkFzc2VtYmx5Lk1vZHVsZSkpIHtcclxuICAgICAgICBtb2R1bGUgPSBuZXcgV2ViQXNzZW1ibHkuTW9kdWxlKG1vZHVsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5zdGFuY2UgPSBuZXcgV2ViQXNzZW1ibHkuSW5zdGFuY2UobW9kdWxlLCBpbXBvcnRzKTtcclxuXHJcbiAgICByZXR1cm4gX193YmdfZmluYWxpemVfaW5pdChpbnN0YW5jZSwgbW9kdWxlKTtcclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gX193YmdfaW5pdChpbnB1dCwgbWF5YmVfbWVtb3J5KSB7XHJcbiAgICBpZiAod2FzbSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gd2FzbTtcclxuXHJcbiAgICBpZiAodHlwZW9mIGlucHV0ID09PSAndW5kZWZpbmVkJykge1xyXG4gICAgICAgIGlucHV0ID0gbmV3IFVSTCgnYWxlb193YXNtX2JnLndhc20nLCBpbXBvcnQubWV0YS51cmwpO1xyXG4gICAgfVxyXG4gICAgY29uc3QgaW1wb3J0cyA9IF9fd2JnX2dldF9pbXBvcnRzKCk7XHJcblxyXG4gICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycgfHwgKHR5cGVvZiBSZXF1ZXN0ID09PSAnZnVuY3Rpb24nICYmIGlucHV0IGluc3RhbmNlb2YgUmVxdWVzdCkgfHwgKHR5cGVvZiBVUkwgPT09ICdmdW5jdGlvbicgJiYgaW5wdXQgaW5zdGFuY2VvZiBVUkwpKSB7XHJcbiAgICAgICAgaW5wdXQgPSBmZXRjaChpbnB1dCk7XHJcbiAgICB9XHJcblxyXG4gICAgX193YmdfaW5pdF9tZW1vcnkoaW1wb3J0cywgbWF5YmVfbWVtb3J5KTtcclxuXHJcbiAgICBjb25zdCB7IGluc3RhbmNlLCBtb2R1bGUgfSA9IGF3YWl0IF9fd2JnX2xvYWQoYXdhaXQgaW5wdXQsIGltcG9ydHMpO1xyXG5cclxuICAgIHJldHVybiBfX3diZ19maW5hbGl6ZV9pbml0KGluc3RhbmNlLCBtb2R1bGUpO1xyXG59XHJcblxyXG5leHBvcnQgeyBpbml0U3luYyB9XHJcbmV4cG9ydCBkZWZhdWx0IF9fd2JnX2luaXQ7XHJcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==