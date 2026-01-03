(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTsInterface = exports.CustomDataKey = void 0;
/** Name of the custom data (expected to not be persisted by PilotEdge/TemplateBuilder) */
exports.CustomDataKey = "$data";
var vdf_pilot_scripting_support_1 = require("./vdf-pilot-scripting-support");
Object.defineProperty(exports, "generateTsInterface", { enumerable: true, get: function () { return vdf_pilot_scripting_support_1.generateTsInterface; } });
__exportStar(require("./pilot-variables"), exports);

},{"./pilot-variables":5,"./vdf-pilot-scripting-support":8}],2:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var xmldom_1 = require("@xmldom/xmldom");
var api_1 = require("./api");
var mem_access_1 = require("./mem-access");
var metadata_map_1 = require("./metadata-map");
var proxy_utils_1 = require("./proxy-utils");
var vdf_pilot_proxy_minimal_1 = require("./vdf-pilot-proxy-minimal");
var media_asset_1 = require("./vdfaccess/media-asset");
var vdf_utilities_1 = require("./vdfaccess/vdf-utilities");
var vdfaccess_1 = require("./vdfaccess/vdfaccess");
var xml_utils_1 = require("./vdfaccess/xml-utils");
// Overwriting console logs
if (!self.noConsoleOverride) {
    console.info = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        postMessageToHost({ type: "console", logLevel: "INFO", params: params });
    };
    console.log = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        postMessageToHost({ type: "console", logLevel: "LOG", params: params });
    };
    console.warn = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        postMessageToHost({ type: "console", logLevel: "WARN", params: params });
    };
    console.error = function () {
        var params = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            params[_i] = arguments[_i];
        }
        postMessageToHost({ type: "console", logLevel: "ERROR", params: params });
    };
}
// Polyfill for String.endsWidth
if (!String.prototype.endsWith) {
    // eslint-disable-next-line no-extend-native
    String.prototype.endsWith = function (search, length) {
        if (length === undefined || length > this.length) {
            length = this.length;
        }
        return this.substring(length - search.length, length) === search;
    };
}
// Polyfill for DOM stuff
self.DOMParser = xmldom_1.DOMParser;
self.Node = {
    ELEMENT_NODE: 1,
    TEXT_NODE: 3,
};
self.XMLSerializer = xmldom_1.XMLSerializer;
// Exposing scripting functions
self.createPilotScriptingProxy = vdf_pilot_proxy_minimal_1.createPilotScriptingProxy;
self.createVdfModelInfo = vdfaccess_1.createVdfModelInfo;
self.createRichText = vdfaccess_1.createRichText;
self.createImageAsset = media_asset_1.createImageAsset;
self.createVideoAsset = media_asset_1.createVideoAsset;
self.Duplet = vdfaccess_1.Duplet;
self.Triplet = vdfaccess_1.Triplet;
self.VizMap = vdfaccess_1.VizMap;
// Type guard to check if a value is a valid FieldDecoration object
function isValidDecorationObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
// Utility function to normalize decoration values
function normalizeDecoration(value) {
    try {
        var parsed = JSON.parse(value);
        if (isValidDecorationObject(parsed)) {
            return parsed;
        }
        throw new Error("Invalid decoration object structure");
    }
    catch (error) {
        throw new Error("Failed to parse decoration JSON: ".concat(error instanceof Error ? error.message : String(error)));
    }
}
var proxy;
var payload;
var decorationMap;
var $data = {};
var $pilot = undefined;
var memData = {};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var logger = console.log;
function postMessageToHost(msg) {
    // @ts-ignore
    self.postMessage(msg);
}
var fieldCallbacks = {
    onFieldChangedByScript: function (fieldPath, propertyName, propertyValue) {
        // For all changes (including decoration), send fieldUpdate message to host
        postMessageToHost({
            type: "fieldUpdate",
            fieldPath: fieldPath,
            propertyName: propertyName,
            propertyValue: propertyValue,
        });
    },
    triggerMetadataRequest: function (fieldPath) {
        postMessageToHost({ type: "requestMetadata", fieldPath: fieldPath });
    },
};
/**
 * Internal function to request host to jump to a preview point name
 * @param name the name of the preview point
 */
function jumpToPreviewPoint(name) {
    postMessageToHost({ type: "jumpToPreviewPoint", name: name });
}
function runUpdateScriptAsync(onUpdate, fields, action) {
    return __awaiter(this, void 0, void 0, function () {
        var e_1, error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, onUpdate(fields, action)];
                case 1:
                    _a.sent();
                    postMessageToHost({ type: "updatePayload", payload: new xmldom_1.XMLSerializer().serializeToString(payload) });
                    return [3 /*break*/, 3];
                case 2:
                    e_1 = _a.sent();
                    error = !e_1
                        ? "unknown error"
                        : e_1 instanceof Error
                            ? e_1.message
                            : typeof e_1 === "object" && "message" in e_1 && typeof e_1.message === "string"
                                ? e_1.message
                                : typeof e_1 === "string"
                                    ? e_1
                                    : "unknown error";
                    postMessageToHost({ type: "updatePayloadError", error: error });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
/**
 * To avoid modifying the scripting api commands sent to pilot edge/ template builder now,
 * In the script mimic having an mse connection instance, but under the hood, execute the
 * exact same commands as before (i.e. the extremely general app-trigger commands).
 * In addition, add a script-only convenience function for checking the url of an MSE
 */
function createMseConnectionInstance(url) {
    var _this = this;
    /* Inject the url into the playout config argument provided - if any. */
    function injectUrlIntoPlayoutConfig(playoutConfig) {
        if (!!playoutConfig && typeof playoutConfig === "object") {
            return __assign(__assign({}, playoutConfig), { url: url });
        }
        // If unable to inject it, we fallback to the original object and PE/TB will report the error.
        return playoutConfig;
    }
    function createPlayoutCommandFunction(playoutCommand) {
        return function (mseConfig) {
            return postMessageToHost({
                type: "app-trigger",
                name: "runPlayoutCommand",
                args: [injectUrlIntoPlayoutConfig(mseConfig), playoutCommand],
            });
        };
    }
    return Object.freeze({
        sendVizCommand: function (playoutConfig) {
            var commands = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                commands[_i - 1] = arguments[_i];
            }
            postMessageToHost({
                type: "app-trigger",
                name: "executeVizCommand",
                args: __spreadArray([injectUrlIntoPlayoutConfig(playoutConfig)], commands, true),
            });
        },
        take: createPlayoutCommandFunction("take"),
        update: createPlayoutCommandFunction("update"),
        out: createPlayoutCommandFunction("out"),
        continue: createPlayoutCommandFunction("continue"),
        checkConnection: function () { return __awaiter(_this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 3, , 4]);
                        _a = typeof url === "string";
                        if (!_a) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(url)];
                    case 1:
                        _a = (_c.sent()).ok;
                        _c.label = 2;
                    case 2: return [2 /*return*/, _a];
                    case 3:
                        _b = _c.sent();
                        return [2 /*return*/, false];
                    case 4: return [2 /*return*/];
                }
            });
        }); },
    });
}
/**
 * Checks if the given value is a valid data value.
 *
 * @param value The value to check
 * @returns `true` if the value is a valid data value, otherwise `false`
 */
function isDataValueValid(value) {
    return value === undefined || typeof value === "string";
}
/**
 * A wrapper of {@link self.reportErrors} that works on both async and synchronous functions
 * @param f The function to run and report errors for
 * @param stage The stage associated with the function. This will be part of the error report
 */
function reportAsyncError(f, stage) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, f()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    self.reportErrors(function () {
                        throw error_1;
                    }, stage);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
self.runInWorker = function (f) {
    self.onmessage = function (msg) {
        var _a;
        if (msg.data != null) {
            if (msg.data.type === "setPayload" && msg.data.payload != null && msg.data.model != null) {
                logger = msg.data.silent ? function () { return undefined; } : console.log;
                // Payload received, create the proxy and expose it as vizrt.fields
                payload = new xmldom_1.DOMParser().parseFromString(msg.data.payload, "text/xml");
                if (proxy == null) {
                    logger("Initializing");
                    var modelString = msg.data.model.trim();
                    var model = modelString.startsWith("{")
                        ? JSON.parse(modelString)
                        : new xmldom_1.DOMParser().parseFromString(modelString, "text/xml");
                    decorationMap = new Map();
                    if (msg.data.decorationMap) {
                        for (var _i = 0, _b = Object.entries(msg.data.decorationMap); _i < _b.length; _i++) {
                            var _c = _b[_i], key = _c[0], value = _c[1];
                            decorationMap.set(key, { decoration: value });
                        }
                    }
                    proxy = (0, vdf_pilot_proxy_minimal_1.createPilotScriptingProxy)(payload, (0, vdfaccess_1.createVdfModelInfo)(model), fieldCallbacks, decorationMap);
                    var d = msg.data[api_1.CustomDataKey];
                    $data = typeof d === "object" && d !== null ? d : {};
                    /* Create a proxy on top of the data object to be used in place of the original data object,
                       restricting what modifications are allowed, and posting a dataUpdate message on each and every such modification */
                    var dataProxy = (0, proxy_utils_1.createProxyObject)($data, "", function (path, value) {
                        if (isDataValueValid(value)) {
                            postMessageToHost({
                                target: "data",
                                type: "dataUpdate",
                                key: path,
                                value: value !== null && value !== void 0 ? value : null,
                            });
                            return true;
                        }
                        return false;
                    });
                    var env = msg.data["$env"];
                    var $env = Object.freeze(env && typeof env === "object" ? env : {});
                    var pilot = msg.data["$pilot"];
                    $pilot = typeof pilot === "object" && pilot !== null ? pilot : undefined;
                    // Extract MEM data and create MEM access object OUTSIDE the proxy system
                    memData = {};
                    if ($pilot && typeof $pilot.mos === "object" && $pilot.mos !== null) {
                        // Type the mos object as a mutable record allowing us to replace the mem property.
                        // We use Record<string, unknown> for all other MOS properties (mosart, continueCount, etc.)
                        // since we don't modify them here and don't need to import the full MOS type from the host repository.
                        var mosData = $pilot.mos;
                        memData = (mosData.mem && typeof mosData.mem === "object" ? mosData.mem : {});
                        var memAccessObject = (0, mem_access_1.createMemAccess)(memData, postMessageToHost);
                        // Replace mem data with the access object directly
                        mosData.mem = memAccessObject;
                    }
                    var pilotProxy = $pilot &&
                        (0, proxy_utils_1.createProxyObject)($pilot, "", function (path, value) {
                            if (new RegExp("^".concat(mem_access_1.MEM_PATH_PREFIX, "($|/)")).test(path)) {
                                // Don't allow direct editing of the mos.mem-object. All edits should go through the mem.set/mem.delete methods
                                return false;
                            }
                            postMessageToHost({
                                type: "pilotUpdate",
                                target: "pilot",
                                path: path,
                                value: value,
                            });
                            return true;
                        });
                    var app = new Proxy({}, {
                        get: function (_, property) {
                            if (property === "createMseConnection") {
                                return createMseConnectionInstance;
                            }
                            if (typeof property !== "string") {
                                throw new Error("Invalid app accessor ".concat(String(property)));
                            }
                            return function () {
                                var args = [];
                                for (var _i = 0; _i < arguments.length; _i++) {
                                    args[_i] = arguments[_i];
                                }
                                postMessageToHost({
                                    type: "app-trigger",
                                    name: property,
                                    args: args,
                                });
                            };
                        },
                    });
                    self.vizrt = (_a = {
                            fields: proxy,
                            jumpToPreviewPoint: jumpToPreviewPoint
                        },
                        _a[api_1.CustomDataKey] = dataProxy,
                        _a.$env = $env,
                        _a.$pilot = pilotProxy,
                        _a);
                    self.app = app;
                    var initType_1 = msg.data.initType;
                    var updateAction_1 = msg.data.updateAction;
                    reportAsyncError(f, "script initialization").finally(function () {
                        if (initType_1 === "create" && self.vizrt.onCreate) {
                            logger("TRIGGERING ON CREATE");
                            self.reportErrors(self.vizrt.onCreate, "onCreate handler");
                        }
                        else if (initType_1 === "load" && self.vizrt.onLoad) {
                            logger("TRIGGERING ON LOAD");
                            self.reportErrors(self.vizrt.onLoad, "onLoad handler");
                        }
                        else if (initType_1 === "update") {
                            if (!self.vizrt.onUpdate) {
                                postMessageToHost({
                                    type: "updatePayloadError",
                                    error: "No onUpdate handler specified in the script!",
                                });
                            }
                            else {
                                logger("TRIGGERING ON UPDATE");
                                runUpdateScriptAsync(self.vizrt.onUpdate, proxy, updateAction_1);
                            }
                        }
                        self.notifyComplete({ hasUpdateScript: !!self.vizrt.onUpdate, hasOnAfterSave: !!self.vizrt.onAfterSave });
                    });
                }
                else {
                    self.notifyComplete({ hasUpdateScript: !!self.vizrt.onUpdate, hasOnAfterSave: !!self.vizrt.onAfterSave });
                }
            }
            else if (msg.data.type === "fieldUpdate" &&
                msg.data.fieldPath != null &&
                typeof msg.data.fieldValue != "undefined") {
                // Field update received, update the proxy value and call onChanged if necessary
                var field_1 = resolvePath(msg.data.fieldPath, proxy);
                var oldValue = field_1.value;
                var newValue_1 = field_1._valueConverter.toJs(msg.data.fieldValue);
                self.reportErrors(function () {
                    field_1.silentSetValue(newValue_1);
                }, "value assignment");
                var changeHandler_1 = field_1.onChanged;
                if (field_1.value != oldValue && changeHandler_1) {
                    logger("TRIGGERING ON CHANGE", field_1.value);
                    self.reportErrors(function () {
                        changeHandler_1(field_1.value);
                    }, "change handler");
                }
                self.notifyComplete();
            }
            else if (msg.data.type === "multiFieldUpdate" && Array.isArray(msg.data.changes)) {
                var changeHandlers = [];
                var _loop_1 = function (change) {
                    if (change.target === "data") {
                        // Update $data changes
                        if (typeof change.value === "string") {
                            $data[change.key] = change.value;
                        }
                        else {
                            delete $data[change.key];
                        }
                        return "continue";
                    }
                    if (change.target === "pilot") {
                        if (change.path === mem_access_1.MEM_PATH_PREFIX) {
                            return "continue";
                        }
                        if (change.path.startsWith("".concat(mem_access_1.MEM_PATH_PREFIX, "/"))) {
                            // Handle MEM block updates: path format is "${MEM_PATH_PREFIX}/${schema}"
                            var schema = change.path.slice("".concat(mem_access_1.MEM_PATH_PREFIX, "/").length);
                            if (change.value) {
                                // Update or create the MEM block (freeze to prevent mutations)
                                memData[schema] = Object.freeze(change.value);
                            }
                            else {
                                // Delete the MEM block if value is falsy
                                delete memData[schema];
                            }
                            return "continue";
                        }
                        var targetObj = $pilot;
                        var propertyNames = change.path.split("/");
                        if (!targetObj || propertyNames.length === 0) {
                            return { value: void 0 };
                        }
                        (0, api_1.setProperty)(targetObj, change.path, change.value);
                        return "continue";
                    }
                    if (change.target === "fields") {
                        var field_2 = resolvePath(change.path, proxy);
                        // Update proxy state for all changed fields
                        if (change.type === "value") {
                            var oldValue = field_2.value;
                            var newValue_2 = field_2._valueConverter.toJs(change.value);
                            self.reportErrors(function () {
                                field_2.silentSetValue(newValue_2);
                            }, "value assignment");
                            field_2._metadata = change.metadata ? (0, metadata_map_1.createMetadataMapFromRecord)(change.metadata) : change.metadata;
                            var changeHandler_2 = field_2.onChanged;
                            // Trigger onChanged when the value actually changed
                            // This ensures onChanged handlers work for all fields including -title and -auto-generated-title
                            if (field_2.value !== oldValue) {
                                if (changeHandler_2) {
                                    changeHandlers.push(function () {
                                        logger("TRIGGERING ON CHANGE", field_2.value);
                                        self.reportErrors(function () { return changeHandler_2(field_2.value); }, "change handler");
                                    });
                                }
                                // If the changed field is part of a list, also trigger change handlers for the list fields
                                if (change.path.includes("#")) {
                                    resolveListsInPath(change.path).forEach(function (f) {
                                        if (f.onChanged) {
                                            self.reportErrors(function () { return f.onChanged && f.onChanged(f.value); }, "change handler");
                                        }
                                    });
                                }
                            }
                        }
                        else if (!change.value) {
                            field_2.clearAnnotation(change.type);
                        }
                        else if (change.type === "error" || change.type === "tip") {
                            field_2[change.type] = change.value;
                        }
                        else if (change.type === "contenteditable") {
                            field_2.readOnly = change.value === "false";
                        }
                        else if (change.type === "visibility") {
                            field_2.hidden = change.value === "hidden";
                        }
                        else if (change.type === "decoration") {
                            // Handle decoration as a special case since it's an object, not a string
                            // Update the decoration map directly to avoid triggering callbacks to host
                            self.reportErrors(function () {
                                var newDecoration = normalizeDecoration(change.value);
                                var decorationWrapper = decorationMap.get(change.path) || { decoration: {} };
                                decorationMap.set(change.path, decorationWrapper);
                                decorationWrapper.decoration = newDecoration;
                            }, "decoration normalization");
                        }
                        // Call change handlers
                        changeHandlers.forEach(function (h) { return h(); });
                    }
                };
                for (var _d = 0, _e = msg.data.changes; _d < _e.length; _d++) {
                    var change = _e[_d];
                    var state_1 = _loop_1(change);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                self.notifyComplete();
            }
            else if (msg.data.type === "customEvent") {
                if (msg.data.eventType === "click" && self.vizrt.onClick) {
                    var messageName_1 = msg.data.name;
                    var messageData_1 = msg.data.data;
                    self.reportErrors(function () {
                        self.vizrt.onClick && self.vizrt.onClick(messageName_1, messageData_1);
                    }, "click handler");
                }
                else if (msg.data.eventType === "afterSave" && self.vizrt.onAfterSave) {
                    self.reportErrors(function () {
                        self.vizrt.onAfterSave && self.vizrt.onAfterSave();
                    }, "afterSave handler");
                }
                self.notifyComplete();
            }
            else if (msg.data.type === "provideMetadata" && typeof msg.data.fieldPath === "string") {
                var metadataMap = typeof msg.data.metadata === "object" ? (0, metadata_map_1.createMetadataMapFromRecord)(msg.data.metadata) : undefined;
                var field_3 = resolvePath(msg.data.fieldPath, proxy);
                var unreadyMetadataHasBeenAccessed = field_3._metadata === true;
                field_3._metadata = metadataMap;
                var changeHandler_3 = field_3.onChanged;
                if (!!changeHandler_3 && unreadyMetadataHasBeenAccessed) {
                    self.reportErrors(function () {
                        changeHandler_3(field_3.value);
                    }, "change handler");
                }
                // We don't send notifyComplete here since this is the response to a call from here
            }
            else if ((msg.data.type === "metadata" || msg.data.type === "metadataUpdate") &&
                msg.data.fieldPath != null &&
                typeof msg.data.metadata != "undefined") {
                var metadataMap_1 = (0, xml_utils_1.stringToMapConverter)(msg.data.metadata);
                var field_4 = resolvePath(msg.data.fieldPath, proxy);
                self.reportErrors(function () {
                    field_4._metadata = metadataMap_1;
                }, "image metadata assignment");
                var changeHandler_4 = field_4.onChanged;
                if (msg.data.type === "metadataUpdate" && changeHandler_4) {
                    self.reportErrors(function () {
                        changeHandler_4(field_4.value);
                    }, "change handler");
                }
                self.notifyComplete();
            }
            else if (msg.data.type === "runScript") {
                reportAsyncError(f, "Received message to run the script").finally(self.notifyComplete);
            }
        }
    };
};
function isRowIndex(index) {
    return index.startsWith("#");
}
/**
 * Follows a path in obj and returns the targeted property
 * @param path  the field path separated by slashes
 * @param obj   the {@link PilotScriptingProxy}
 * @return      the field proxy
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
var resolvePath = function (path, obj) {
    var properties = path.split("/");
    return properties.reduce(function (prev, curr) {
        if (isRowIndex(curr) && "_value" in prev) {
            var listIndex = parseInt(curr.substring(1));
            if (isNaN(listIndex)) {
                throw Error("Invalid row index");
            }
            return prev._value[listIndex];
        }
        return prev && prev["$" + curr];
    }, obj);
};
/**
 * Resolves all list fields in a given path
 * @param path The field path to resolve
 * @returns An array of resolved list field proxies
 */
var resolveListsInPath = function (path) {
    var listFieldPaths = (0, vdf_utilities_1.getListFieldPaths)(path);
    return listFieldPaths.map(function (p) { return resolvePath(p, proxy); });
};
/**
 * Runs a function while catching exceptions and reports them to PilotScriptingHost.java
 * @param f      the function to run
 * @param stage  the current step name
 */
self.reportErrors = function (f, stage) {
    try {
        f();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }
    catch (err) {
        postMessageToHost({
            type: "payloadError",
            payload: "Error during " + stage + ": " + err.message,
        });
        console.error("Error during " + stage, err);
    }
};
self.notifyComplete = function (extraInfo) {
    postMessageToHost(extraInfo ? __assign(__assign({}, extraInfo), { type: "complete" }) : { type: "complete" });
};

},{"./api":1,"./mem-access":3,"./metadata-map":4,"./proxy-utils":6,"./vdf-pilot-proxy-minimal":7,"./vdfaccess/media-asset":10,"./vdfaccess/vdf-utilities":20,"./vdfaccess/vdfaccess":22,"./vdfaccess/xml-utils":23,"@xmldom/xmldom":29}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMemAccess = exports.MEM_PATH_PREFIX = void 0;
// Restricted Vizrt internal schema prefix
var RESTRICTED_SCHEMA_PREFIX = "http://www.vizrt.com/mosObj/";
// MEM block path prefix for pilot updates
var MEM_PATH_PREFIX = "mos/mem";
exports.MEM_PATH_PREFIX = MEM_PATH_PREFIX;
function isRestrictedSchema(schema) {
    return schema.startsWith(RESTRICTED_SCHEMA_PREFIX);
}
/**
 * Creates a simple object for MEM operations with methods that send
 * pilotUpdate messages to the host for write operations.
 */
function createMemAccess(memData, postMessageToHost) {
    return Object.freeze({
        get: function (schema) {
            if (isRestrictedSchema(schema)) {
                throw new Error("Cannot access restricted MEM block '".concat(schema, "'. ") +
                    "This schema is reserved for internal Vizrt use. Please use the $pilot.mos API to access MOS data.");
            }
            // All MEM blocks are already present in memData, no host communication needed
            var block = memData[schema];
            // Freeze the block to prevent mutations that won't propagate to the host
            return block ? Object.freeze(block) : undefined;
        },
        set: function (block) {
            // Validate required fields
            if (!block || typeof block !== "object") {
                throw new Error("MEM set requires a MEMBlock object");
            }
            if (typeof block.schema !== "string") {
                throw new Error("MEM block schema must be a string");
            }
            if (typeof block.payload !== "string") {
                throw new Error("MEM block payload must be a string");
            }
            if (isRestrictedSchema(block.schema)) {
                throw new Error("Cannot modify restricted MEM block '".concat(block.schema, "'. ") +
                    "This schema is reserved for internal Vizrt use. To modify MOS data, use the $pilot.mos API instead " +
                    "(e.g., $pilot.mos.mosart for timing data or $pilot.mos.continueCount for continue count).");
            }
            // Freeze the block to prevent mutations that won't propagate to the host
            var frozenBlock = Object.freeze(block);
            memData[block.schema] = frozenBlock;
            postMessageToHost({
                type: "pilotUpdate",
                target: "pilot",
                path: "".concat(MEM_PATH_PREFIX, "/").concat(block.schema),
                value: frozenBlock,
            });
        },
        delete: function (schema) {
            if (isRestrictedSchema(schema)) {
                throw new Error("Cannot remove restricted MEM block '".concat(schema, "'. ") +
                    "This schema is reserved for internal Vizrt use. To modify MOS data, use the $pilot.mos API instead.");
            }
            delete memData[schema];
            postMessageToHost({
                type: "pilotUpdate",
                target: "pilot",
                path: "".concat(MEM_PATH_PREFIX, "/").concat(schema),
                value: undefined,
            });
        },
        list: function () {
            return Object.keys(memData);
        },
    });
}
exports.createMemAccess = createMemAccess;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMetadataMapFromRecord = void 0;
function isDigit(charCode) {
    return charCode >= 48 && charCode <= 57;
}
/**
 * Creates a metadata map as for the metadata property of a scalar field.
 * Since we used a very strange way of representing lists in metadata in 2.4, we add values from list fields
 * both with the legacy key, e.g. `"list/firstName"`, `"list/firstName(2)"` and the standard way that we use
 * elsewhere: `"list/#0/firstName"`, `"list/#1/firstName"`.
 * @param metadata The metadata as received from Pilot Edge 3.0 and up.
 * @returns        A map that can be used as value for the metadata property of a scalar field
 */
function createMetadataMapFromRecord(metadata) {
    function getLegacyKey(key) {
        key = key.replace(/\/#0/g, "");
        var listIndexPos = key.lastIndexOf("/#");
        if (listIndexPos >= 0) {
            var numEnd = listIndexPos + 2;
            while (numEnd < key.length && isDigit(key.charCodeAt(numEnd))) {
                ++numEnd;
            }
            if (numEnd > listIndexPos + 2) {
                var index = parseInt(key.substring(listIndexPos + 2, numEnd));
                key = "".concat(key.substring(0, listIndexPos)).concat(key.substring(numEnd), "(").concat(index + 1, ")");
            }
        }
        return key;
    }
    var map = new Map();
    Object.keys(metadata).forEach(function (key) {
        var legacyKey = getLegacyKey(key);
        map.set(key, metadata[key]);
        if (key !== legacyKey && !(legacyKey in metadata)) {
            map.set(legacyKey, metadata[key]);
        }
    });
    return map;
}
exports.createMetadataMapFromRecord = createMetadataMapFromRecord;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setProperty = exports.getProperty = void 0;
/**
 * Gets a property from the given object at the specified path.
 * @param target The target object
 * @param path The path to the property
 * @returns The value of the property or undefined if it does not exist
 */
function getProperty(target, path) {
    var properties = path.split("/");
    var obj = target;
    for (var i = 0; i < properties.length - 1; i++) {
        var prop = properties[i];
        if (typeof obj === "object" && obj !== null && prop in obj) {
            obj = obj[prop];
        }
        else {
            return undefined;
        }
    }
    return obj;
}
exports.getProperty = getProperty;
/**
 * Sets a value in the given object at the specified path.
 *
 * @param target The target object
 * @param path The path to the property
 * @param value The value to set
 */
function setProperty(target, path, value) {
    var obj = getProperty(target, path);
    if (!obj) {
        throw new Error("Property ".concat(path, " does not exist in the target object"));
    }
    var properties = path.split("/");
    obj[properties[properties.length - 1]] = value;
}
exports.setProperty = setProperty;

},{}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProxyObject = void 0;
/** Freezes all occurences of arrays found in the provided item, including itself if that is an array */
function recursivelyFreezeArrays(value) {
    if (Array.isArray(value)) {
        Object.freeze(value);
    }
    for (var key in value) {
        var item = value[key];
        if (typeof item === "object" && item) {
            recursivelyFreezeArrays(item);
        }
    }
}
/** Prepares a value to be applied to the proxy, by cloning it and freezing all arrays found within it */
function prepareValue(value) {
    if (typeof value === "object" && value) {
        var clone = JSON.parse(JSON.stringify(value));
        recursivelyFreezeArrays(clone);
        return clone;
    }
    else {
        return value;
    }
}
/**
 * Creates a proxy object that intercepts property modifications.
 *
 * @template O - The type of the original object.
 * @template R - The type used in the callback.
 * @param {O} original - The original object to wrap.
 * @param {string} path - The current path in the object hierarchy.
 * @param {ValidationCallback<R>} [onValidate] - Optional callback invoked to validate property changes.
 * @param {ChangedCallback<R>} [onChanged] - Optional callback invoked after property changes.
 * @returns {O} The proxied object.
 */
function createProxyObject(original, path, onValidate, onChanged) {
    var childProxyCache = new WeakMap();
    // Default validation function that always returns true
    var defaultValidate = function () { return true; };
    var changeValidator = onValidate || defaultValidate;
    var handler = {
        get: function (target, key) {
            var stringKey = String(key);
            var fullPath = path ? "".concat(path, "/").concat(stringKey) : stringKey;
            var value = target[key];
            if (typeof value === "object" && value !== null) {
                var proxies = childProxyCache.get(value);
                if (!proxies) {
                    proxies = {};
                    childProxyCache.set(value, proxies);
                }
                var childProxy = proxies[fullPath];
                if (typeof childProxy === "undefined") {
                    childProxy = createProxyObject(value, fullPath, onValidate, onChanged);
                    proxies[fullPath] = childProxy;
                }
                return childProxy;
            }
            return value;
        },
        defineProperty: function (target, property, attributes) {
            if (typeof property === "symbol") {
                throw new Error("symbol properties not supported");
            }
            var fullPath = path ? "".concat(path, "/").concat(String(property)) : String(property);
            var valid = changeValidator(fullPath, attributes.value);
            if (!valid) {
                return false;
            }
            target[property] = prepareValue(attributes.value);
            if (onChanged) {
                onChanged();
            }
            return true;
        },
        deleteProperty: function (target, key) {
            var fullPath = path ? "".concat(path, "/").concat(String(key)) : String(key);
            var valid = changeValidator(fullPath, undefined);
            if (!valid) {
                return false;
            }
            var result = Reflect.deleteProperty(target, key);
            if (onChanged) {
                onChanged();
            }
            return result;
        },
    };
    return new Proxy(original, handler);
}
exports.createProxyObject = createProxyObject;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPilotScriptingProxy = void 0;
var vdf_name_utils_1 = require("./vdfaccess/vdf-name-utils");
var vdf_payload_proxy_1 = require("./vdfaccess/vdf-payload-proxy");
var vdf_ts_model_info_1 = require("./vdfaccess/vdf-ts-model-info");
var vdf_xml_utils_1 = require("./vdfaccess/vdf-xml-utils");
var xml_utils_1 = require("./vdfaccess/xml-utils");
/**
 * Creates a {@link PilotScriptingProxy} for use in the worker thread to access the payload.
 * @param payloadDoc              The initial payload document to create the proxy for
 * @param modelInfo               Information about the model to be used to create the proxy
 * @param callbacks               Callbacks that the field can call
 * @param decorationMap           Map to store decoration information separately from XML
 * @returns                       The created {@link PilotScriptingProxy}
 */
function createPilotScriptingProxy(payloadDoc, modelInfo, callbacks, decorationMap) {
    var payloadElement = (0, xml_utils_1.getFirstChildElement)(payloadDoc, vdf_xml_utils_1.vizNs, "payload");
    var payloadProxy = {};
    var finalDecorationMap = decorationMap || new Map();
    addFields(payloadProxy, function () { return payloadElement; }, modelInfo.fields, "", callbacks, finalDecorationMap);
    return payloadProxy;
}
exports.createPilotScriptingProxy = createPilotScriptingProxy;
/**
 * Adds fields proxies to a payload proxy, as well as the subfields proxies recursively
 * @param proxy                  The payload or field to fill
 * @param fieldInfoCollection    The fields to process
 * @param path                   The current path within recursion
 * @param callbacks              A callback to be called after value changes
 * @param decorationMap          Map to store decoration information
 */
function addFields(
// eslint-disable-next-line @typescript-eslint/no-explicit-any
proxy, container, fieldInfoCollection, path, callbacks, decorationMap) {
    var _loop_1 = function (fieldName) {
        var originalName = (0, vdf_name_utils_1.convertJsNameToVdfName)(fieldName);
        var fieldPath = path + originalName;
        var fieldInfo = fieldInfoCollection[fieldName];
        var fieldElementProvider = function () {
            var providedContainer = container();
            return providedContainer && (0, vdf_xml_utils_1.findVdfFieldElement)(providedContainer, originalName);
        };
        var fieldDefAnnotations = fieldInfo.annotations;
        var accessors = vdf_payload_proxy_1.DIRECT_ACCESSORS;
        if (!fieldInfo.vdfType) {
            proxy[fieldName] = new vdf_payload_proxy_1.EmptyFieldProxy(fieldElementProvider, fieldDefAnnotations, accessors.annotationAccess, fieldPath, callbacks, decorationMap);
        }
        else if ((0, vdf_ts_model_info_1.isListType)(fieldInfo.vdfType)) {
            proxy[fieldName] = new vdf_payload_proxy_1.ListFieldProxy(fieldElementProvider, fieldDefAnnotations, accessors.annotationAccess, accessors.valueAccess, fieldPath, callbacks, decorationMap, fieldInfo.vdfType);
        }
        else {
            var vdfValueType = fieldInfo.vdfType;
            var valueConverter = (0, vdf_payload_proxy_1.getValueConverter)(vdfValueType, fieldElementProvider, fieldInfo.nullable == true);
            // addChangeAndUpdateHandling unnecessary as we call onChanged from main.ts
            proxy[fieldName] = new vdf_payload_proxy_1.ScalarFieldProxy(fieldElementProvider, fieldDefAnnotations, accessors.annotationAccess, accessors.valueAccess, valueConverter, fieldPath, callbacks, decorationMap);
        }
        if (fieldInfo.children) {
            addFields(proxy[fieldName], fieldElementProvider, fieldInfo.children, fieldPath + "/", callbacks, decorationMap);
        }
    };
    for (var fieldName in fieldInfoCollection) {
        _loop_1(fieldName);
    }
}

},{"./vdfaccess/vdf-name-utils":13,"./vdfaccess/vdf-payload-proxy":14,"./vdfaccess/vdf-ts-model-info":18,"./vdfaccess/vdf-xml-utils":21,"./vdfaccess/xml-utils":23}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTsInterface = exports.VizMap = exports.Triplet = exports.Duplet = void 0;
var vdfaccess_1 = require("./vdfaccess/vdfaccess");
var vdf_ts_types_1 = require("./vdfaccess/vdf-ts-types");
Object.defineProperty(exports, "Duplet", { enumerable: true, get: function () { return vdf_ts_types_1.Duplet; } });
Object.defineProperty(exports, "Triplet", { enumerable: true, get: function () { return vdf_ts_types_1.Triplet; } });
Object.defineProperty(exports, "VizMap", { enumerable: true, get: function () { return vdf_ts_types_1.VizMap; } });
/**
 * Generates content of a TypeScript file containing an interface of a VDF payload
 * @param model             The VDF model XML or vdf model
 * @param forceInlinedTypes Vdf types that should be included in the type interface regardless of whether they are needed by the payload
 * @returns                 The generated TypeScript code
 */
function generateTsInterface(model, forceInlinedTypes) {
    var modelInfo = (0, vdfaccess_1.createVdfModelInfo)(model);
    var payloadInterface = (0, vdfaccess_1.generateTsPayloadInterface)(modelInfo, forceInlinedTypes);
    return payloadInterface;
}
exports.generateTsInterface = generateTsInterface;

},{"./vdfaccess/vdf-ts-types":19,"./vdfaccess/vdfaccess":22}],9:[function(require,module,exports){
"use strict";
// THIS IS A GENERATED FILE! //
// DON'T EDIT IT MANUALLY!   //
Object.defineProperty(exports, "__esModule", { value: true });
exports.INLINE_TYPE_INFO_MAP = void 0;
exports.INLINE_TYPE_INFO_MAP = {
    '@vizrt/pilot-scripting-support': {
        Duplet: {
            fragment: '/**\n * TypeScript representation of the media type `"application/vnd.vizrt.duplet"`.\n * Contains two read-only number fields: `x` and `y`.\n * Note that the `Duplet` object is immutable.\n */\nclass Duplet {\n  /** The x-value of the duplet */\n  x: number\n  /** The y-value of the duplet */\n  y: number\n\n  /** Creates the duplet */\n  public constructor(x: number, y: number) {\n    this.x = x\n    this.y = y\n  }\n}\n',
            dependencies: []
        },
        Triplet: {
            fragment: '/**\n * TypeScript representation of the media type `"application/vnd.vizrt.triplet"`.\n * Contains three read-only number fields: `x`, `y`, and `z`.\n * Note that the `Triplet` object is immutable.\n */\nclass Triplet {\n  /** The x-value of the triplet */\n  x: number\n  /** The y-value of the triplet */\n  y: number\n  /** The z-value of the triplet */\n  z: number\n\n  /** Creates the triplet */\n  public constructor(x: number, y: number, z: number) {\n    this.x = x\n    this.y = y\n    this.z = z\n  }\n}\n',
            dependencies: []
        },
        VizMap: {
            fragment: '/**\n * TypeScript representation of the map type `"application/vnd.vizrt.curious.map"`.\n * Contains a read-only string that contains semicolon delimited data.\n * Note that the object is immutable.\n */\nclass VizMap {\n  readonly mapString: string\n\n  public constructor(mapString: string) {\n    this.mapString = mapString\n    Object.freeze(this)\n  }\n}\n',
            dependencies: []
        },
        RichText: {
            fragment: '/**\n * TypeScript representation of the media type `"application/vnd.vizrt.richtext+xml"`.<br/>\n * **Note!** The `RichText` object is immutable and that it is only valid for use with\n * {@link ScalarField.value} if it has been created with {@link createRichText}.\n */\ninterface RichText {\n  /** The text without formatting (as "text/plain") */\n  readonly plainText: string\n}\n',
            dependencies: []
        },
        MediaType: {
            fragment: '/**\n * Holds the available types for media assets\n */\ntype MediaType = "image" | "video"\n',
            dependencies: []
        },
        MediaAsset: {
            fragment: '/**\n * Holds information about the value of a media field.\n * This information is typically stored an an `atom:entry`\n */\ninterface MediaAsset {\n  /** The type of the media (\'image\' or \'video\') */\n  readonly mediaType: MediaType\n  /** The title of the media */\n  readonly title: string | undefined\n  /** When the asset was last updated */\n  readonly updated: Readonly<Date> | undefined\n  /** The URL to a thumbnail representing the media */\n  readonly thumbnailUrl?: string | undefined\n  /** The path to the media */\n  readonly path: string\n}\n',
            dependencies: ['MediaType@@vizrt/pilot-scripting-support']
        },
        ImageAsset: {
            fragment: '/**\n * Stores information about an image asset\n */\ninterface ImageAsset extends MediaAsset {\n  /** The width of the image in pixels if available */\n  readonly width: number | undefined\n  /** The height of the image in pixels if available */\n  readonly height: number | undefined\n}\n',
            dependencies: ['MediaAsset@@vizrt/pilot-scripting-support']
        },
        VideoAsset: {
            fragment: 'interface VideoAsset extends MediaAsset {\n  /** The width of the frames in the video (in pixels) if available */\n  readonly width: number | undefined\n  /** The height of the frames in the video (in pixels) if available */\n  readonly height: number | undefined\n  /** The duration of the video (in seconds) if available */\n  readonly duration: number | undefined\n}\n',
            dependencies: ['MediaAsset@@vizrt/pilot-scripting-support']
        },
        BaseDecoration: {
            fragment: '/**\n * Base decoration interface with common properties for all field types.\n */\ninterface BaseDecoration {\n  /** Display label for the field in the UI */\n  label?: string\n}\n',
            dependencies: []
        },
        TextDecoration: {
            fragment: '/**\n * Decoration interface for text fields with additional text-specific properties.\n */\ninterface TextDecoration extends BaseDecoration {\n  /** Maximum number of characters allowed in the text field */\n  maxlength?: number\n}\n',
            dependencies: ['BaseDecoration@@vizrt/pilot-scripting-support']
        },
        EmptyField: {
            fragment: '/**\n * The interface towards a VDF field with no value and no list.\n *\n * **Inheritance note:** If the [hidden](#hidden),\n * [readOnly](#readOnly),\n * or [tip](#tip) property is `undefined`,\n * the property will use corresponding value from in the definition of the field (e.g. specified in Template Builder).\n * If not defined in the field definition the property value will be inherited from the parent field.\n */\ninterface EmptyField {\n  /** Provides access to the visibility of the field (includes inheritance from parent and field definition). */\n  hidden: boolean\n  /** Provides access to whether the field should be read-only (includes inheritance from parent and field definition). */\n  readOnly: boolean\n  /** Provides access to the tool-tip of the field (includes inheritance from field definition). */\n  tip: string\n  /** Provides access to the error of the field. Is not inherited. */\n  error: string\n  /** Provides access to the decoration object of the field. */\n  decoration: BaseDecoration\n}\n',
            dependencies: ['BaseDecoration@@vizrt/pilot-scripting-support']
        },
        ScalarField: {
            fragment: '/**\n * The interface towards a VDF field with a value.\n * @template T The type of the value of the field.\n */\ninterface ScalarField<T> extends EmptyField {\n  /**\n   * Provides read and write access to the value of the field.\n   * If the value type is `Element`, make sure to set the value after changing the contents of the element.\n   */\n  value: T\n\n  /**\n   * Can be assigned a handler function that will be called when the value is changed from outside the script.\n   */\n  onChanged?: (value: T) => void\n\n  /**\n   * Provides access to the metadata map from the script editor.\n   */\n  readonly metadata: Readonly<Map<string, string>> | undefined\n}\n',
            dependencies: ['EmptyField@@vizrt/pilot-scripting-support']
        },
        TextScalarField: {
            fragment: '/**\n * The interface towards a VDF text field with enhanced decoration support.\n * @template T The type of the text field value (string or RichText)\n */\ninterface TextScalarField<T = string> extends ScalarField<T> {\n  /** Provides access to the decoration object with text-specific properties. */\n  decoration: TextDecoration\n}\n',
            dependencies: ['ScalarField@@vizrt/pilot-scripting-support', 'TextDecoration@@vizrt/pilot-scripting-support']
        },
        VdfListItem: {
            fragment: '/**\n * Type of a field item in a list.\n * @template T The type of the field item.\n */\ntype VdfListItem<T> = T extends EmptyField ? { [K in Extract<keyof T, `$${string}` | "value">]: VdfListItem<T[K]> } : T\n',
            dependencies: ['EmptyField@@vizrt/pilot-scripting-support', 'VdfListItem@@vizrt/pilot-scripting-support']
        },
        VdfList: {
            fragment: '/**\n * The interface towards a VDF field with a list of values.\n * @template Columns The type of the columns in the list.\n */\ntype VdfList<Columns extends object> = ReadonlyArray<{ [Col in keyof Columns]: VdfListItem<Columns[Col]> }>\n',
            dependencies: ['VdfListItem@@vizrt/pilot-scripting-support', 'VdfList@@vizrt/pilot-scripting-support']
        },
        FieldContainer: {
            fragment: '/**\n * Recursive nature of fields.\n */\ntype FieldContainer = { [key: string]: EmptyField | (EmptyField & FieldContainer) }\n',
            dependencies: ['EmptyField@@vizrt/pilot-scripting-support', 'FieldContainer@@vizrt/pilot-scripting-support']
        },
        GenericPayload: {
            fragment: '/**\n * A generic payload is just a container for the root level fields\n */\ntype GenericPayload = FieldContainer\n',
            dependencies: ['FieldContainer@@vizrt/pilot-scripting-support']
        }
    }
};

},{}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoAsset = exports.createImageAsset = exports.isMediaAsset = void 0;
var xml_utils_1 = require("./xml-utils");
var xsd_conversion_1 = require("./xsd-conversion");
var ATOM_NS = "http://www.w3.org/2005/Atom";
var MEDIA_NS = "http://search.yahoo.com/mrss/";
var BGFX_NS = "http://www.vizrt.com/2011/bgfx";
// eslint-disable-next-line no-use-before-define
var CACHED_UPDATED = new WeakMap();
var ImmutableAtomEntry = /** @class */ (function () {
    function ImmutableAtomEntry(entry) {
        this.entry = entry;
    }
    Object.defineProperty(ImmutableAtomEntry.prototype, "title", {
        get: function () {
            var _a;
            return ((_a = (0, xml_utils_1.getFirstChildElement)(this.entry, ATOM_NS, "title")) === null || _a === void 0 ? void 0 : _a.textContent) || undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImmutableAtomEntry.prototype, "updated", {
        get: function () {
            var _a;
            var cached = CACHED_UPDATED.get(this);
            if (cached !== undefined) {
                return cached || undefined;
            }
            var text = ((_a = (0, xml_utils_1.getFirstChildElement)(this.entry, ATOM_NS, "updated")) === null || _a === void 0 ? void 0 : _a.textContent) || undefined;
            var msSince1970 = text ? Date.parse(text) : NaN;
            var result = isNaN(msSince1970) ? undefined : Object.freeze(new Date(msSince1970));
            CACHED_UPDATED.set(this, result || null);
            return result;
        },
        enumerable: false,
        configurable: true
    });
    return ImmutableAtomEntry;
}());
function safeParseInt(numText) {
    return numText === undefined ? undefined : (0, xsd_conversion_1.parseXsdInteger)(numText) || undefined;
}
function safeParseDecimal(numText) {
    return numText === undefined ? undefined : (0, xsd_conversion_1.parseXsdDecimal)(numText) || undefined;
}
var MediaAssetImpl = /** @class */ (function (_super) {
    __extends(MediaAssetImpl, _super);
    function MediaAssetImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MediaAssetImpl.prototype, "thumbnailUrl", {
        get: function () {
            var _a;
            return ((_a = (0, xml_utils_1.getFirstChildElement)(this.entry, MEDIA_NS, "thumbnail")) === null || _a === void 0 ? void 0 : _a.getAttribute("url")) || undefined;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MediaAssetImpl.prototype, "path", {
        get: function () {
            var _a;
            return (((_a = (0, xml_utils_1.getFirstChildElement)(this.entry, ATOM_NS, "content")) === null || _a === void 0 ? void 0 : _a.getAttribute("src")) ||
                this.getMainMediaUrl() ||
                this.getGHPath() ||
                "");
        },
        enumerable: false,
        configurable: true
    });
    MediaAssetImpl.prototype.getMainMediaUrl = function () {
        var _a;
        return ((_a = this.getMainMediaContentElement()) === null || _a === void 0 ? void 0 : _a.getAttribute("url")) || undefined;
    };
    MediaAssetImpl.prototype.getGHPath = function () {
        var contentType = this.getContentType();
        if ("application/vnd.vizrt.viz." + this.mediaType === contentType) {
            return (0, xml_utils_1.getFirstChildElement)(this.entry, ATOM_NS, "content").textContent || "";
        }
        else {
            return undefined;
        }
    };
    MediaAssetImpl.prototype.getMainMediaContentElement = function () {
        var childElements = this.entry.getElementsByTagNameNS(MEDIA_NS, "content");
        var count = childElements.length;
        if (!count) {
            return null;
        }
        else if (count === 1) {
            return childElements.item(0);
        }
        for (var index = 0; index < count; ++index) {
            var element = childElements.item(index);
            if ((element === null || element === void 0 ? void 0 : element.getAttribute("isDefault")) === "1") {
                return element;
            }
        }
        return null;
    };
    MediaAssetImpl.prototype.getContentType = function () {
        var _a;
        return ((_a = (0, xml_utils_1.getFirstChildElement)(this.entry, ATOM_NS, "content")) === null || _a === void 0 ? void 0 : _a.getAttribute("type")) || undefined;
    };
    return MediaAssetImpl;
}(ImmutableAtomEntry));
function getAssetTitleFromPath(path) {
    var asteriskIndex = path.indexOf("*");
    if (asteriskIndex >= 0) {
        path = path.substring(asteriskIndex + 1);
    }
    return path.substring(path.lastIndexOf("/") + 1);
}
function createWrapper(path, mediaType, title) {
    /*
    Following " if (path.includes("<")) " condition is added to avoid the wrong msg "internal server error 500".
    The bug is only generated because of the character "<" .Check my comment in the ticket for more detailed explanation.
    */
    if (path.includes("<")) {
        path = "invalid_image_URL_provided";
    }
    var xmlText = "<atom:entry xmlns:atom=\"http://www.w3.org/2005/Atom\" xmlns:media=\"http://search.yahoo.com/mrss/\">\n  <atom:title>".concat(title || getAssetTitleFromPath(path), "</atom:title>\n  <atom:content type=\"application/vnd.vizrt.viz.").concat(mediaType, "\">").concat(path, "</atom:content>\n</atom:entry>");
    return new DOMParser().parseFromString(xmlText, "application/xml").documentElement;
}
var ImageAssetImpl = /** @class */ (function (_super) {
    __extends(ImageAssetImpl, _super);
    function ImageAssetImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(ImageAssetImpl.prototype, "mediaType", {
        get: function () {
            return "image";
        },
        enumerable: false,
        configurable: true
    });
    ImageAssetImpl.prototype.getGHPath = function () {
        var _a;
        var superPath = _super.prototype.getGHPath.call(this);
        if (superPath) {
            return superPath;
        }
        var uuid = (_a = (0, xml_utils_1.getFirstChildElement)(this.entry, BGFX_NS, "image")) === null || _a === void 0 ? void 0 : _a.getAttribute("uuid");
        return uuid ? "IMAGE*" + uuid : undefined;
    };
    Object.defineProperty(ImageAssetImpl.prototype, "width", {
        get: function () {
            var el = this.getMainMediaContentElement();
            return safeParseInt((el === null || el === void 0 ? void 0 : el.getAttribute("width")) || undefined);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ImageAssetImpl.prototype, "height", {
        get: function () {
            var el = this.getMainMediaContentElement();
            return safeParseInt((el === null || el === void 0 ? void 0 : el.getAttribute("height")) || undefined);
        },
        enumerable: false,
        configurable: true
    });
    return ImageAssetImpl;
}(MediaAssetImpl));
var VideoAssetImpl = /** @class */ (function (_super) {
    __extends(VideoAssetImpl, _super);
    function VideoAssetImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(VideoAssetImpl.prototype, "mediaType", {
        get: function () {
            return "video";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoAssetImpl.prototype, "width", {
        get: function () {
            var el = this.getMainMediaContentElement();
            return safeParseInt((el === null || el === void 0 ? void 0 : el.getAttribute("width")) || undefined);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoAssetImpl.prototype, "height", {
        get: function () {
            var el = this.getMainMediaContentElement();
            return safeParseInt((el === null || el === void 0 ? void 0 : el.getAttribute("height")) || undefined);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VideoAssetImpl.prototype, "duration", {
        get: function () {
            var el = this.getMainMediaContentElement();
            return safeParseDecimal((el === null || el === void 0 ? void 0 : el.getAttribute("duration")) || undefined);
        },
        enumerable: false,
        configurable: true
    });
    return VideoAssetImpl;
}(MediaAssetImpl));
function isMediaAsset(value, mediaType) {
    if (typeof value === "string") {
        // Consider string values coming from messages update to always be valid.
        // (It should perhaps be changed if writing back media values from script)
        return true;
    }
    return typeof value === "object" && value instanceof MediaAssetImpl && value.mediaType === mediaType;
}
exports.isMediaAsset = isMediaAsset;
/**
 * Creates an {@link ImageAsset} from an XML `Element` storing the atom:entry representing the asset.
 * @param image The atom:entry XML `Element` or a text representing the graphic HUB path to the image
 * @param title A title to be used for the image. Not needed for GH images
 * @returns The created {@link ImageAsset}
 */
function createImageAsset(image, title) {
    if (typeof image == "string") {
        return Object.freeze(new ImageAssetImpl(createWrapper(image, "image", title)));
    }
    else {
        return Object.freeze(new ImageAssetImpl(image));
    }
}
exports.createImageAsset = createImageAsset;
/**
 * Creates an {@link VideoAsset} from an XML `Element` storing the atom:entry representing the asset.
 * @param video The atom:entry XML `Element` or a text representing the graphic HUB path to the video
 * @param title A title to be used for the video. Not needed for GH videos
 * @returns The created {@link VideoAsset}
 */
function createVideoAsset(video, title) {
    if (typeof video == "string") {
        return Object.freeze(new VideoAssetImpl(createWrapper(video, "video", title)));
    }
    else {
        return Object.freeze(new VideoAssetImpl(video));
    }
}
exports.createVideoAsset = createVideoAsset;

},{"./xml-utils":23,"./xsd-conversion":24}],11:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createControllableReactiveSupplier = void 0;
/**
 * Creates a {@link ReactiveSupplier} and a consumer that can be used to provide the value of the supplier
 * @param initialValue The initial value for the returned supplier
 * @returns a tuple containing the {@link ReactiveSupplier} and a {@link Consumer} that can change the value of the supplier.
 */
function createControllableReactiveSupplier(initialValue) {
    var value = initialValue;
    var changeHandlers = [];
    var supplier = {
        get: function () {
            return value;
        },
        addChangeHandler: function (handler) {
            if (changeHandlers.indexOf(handler) < 0) {
                changeHandlers.push(handler);
            }
        },
        removeChangeHandler: function (handler) {
            var pos = changeHandlers.indexOf(handler);
            if (pos >= 0) {
                changeHandlers.splice(pos, 1);
            }
        },
    };
    var consumer = {
        set: function (newValue) {
            var oldValue = value;
            value = newValue;
            for (var _i = 0, changeHandlers_1 = changeHandlers; _i < changeHandlers_1.length; _i++) {
                var handler = changeHandlers_1[_i];
                handler(newValue, oldValue);
            }
        },
    };
    return [supplier, consumer];
}
exports.createControllableReactiveSupplier = createControllableReactiveSupplier;

},{}],12:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vdf_name_utils_1 = require("./vdf-name-utils");
function lowercaseCompare(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
}
/**
 * Generates TypeScript code
 */
var TsGenerator = /** @class */ (function () {
    function TsGenerator(inlineResources) {
        /** Contains the characters to use for one indent level */
        this.oneLevelIndent = "  ";
        /** Contains the start and stop character to use when generating strings */
        this.quote = "'";
        /** Whether to export with JSON format */
        this.json = false;
        /** Contains a mapping from module to the names imported from that module */
        this.imports = {};
        /** Contains the current indentation level */
        this._indent = "";
        this._topLevelItems = [];
        this.inlineResources = inlineResources || {};
        this.interfaceOverrides = {
            ScalarField: {
                _valueConverter: undefined,
            },
        };
    }
    Object.defineProperty(TsGenerator.prototype, "indent", {
        /**
         * Gets the current indentation level for the generator.
         */
        get: function () {
            return this._indent;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Ensures that a type is available for the generated script
     * @param name      The name to ensure is imported
     * @param module    The module from which to import it
     * @param isDefault Whether the required name is the default export of the module
     * @returns `name`
     */
    TsGenerator.prototype.required = function (name, module) {
        if (!this.imports[module]) {
            this.imports[module] = { items: [] };
        }
        var moduleImports = this.imports[module];
        var names = moduleImports.items;
        if (names.indexOf(name) < 0) {
            names.push(name);
        }
        return name;
    };
    /**
     * Executes a function with an increased indentation level in the generator.
     * @param fn The callback function
     * @returns The result of the callback function
     */
    TsGenerator.prototype.indented = function (fn) {
        this._indent = this._indent + this.oneLevelIndent;
        try {
            return fn();
        }
        finally {
            this._indent = this._indent.substring(0, this._indent.length - this.oneLevelIndent.length);
        }
    };
    /**
     * Executes a function with an indentation level temporarily reset in the generator.
     * @param fn The callback function
     * @returns  The result of the callback function
     */
    TsGenerator.prototype.unIndented = function (fn) {
        var origIndent = this._indent;
        this._indent = "";
        try {
            return fn();
        }
        finally {
            this._indent = origIndent;
        }
    };
    /**
     * Returns the quoted version of the text.
     *
     * **Note!** Does not do any escaping of neither special characters or the quote character itself
     * (since this is not relevant for VDF model generation)
     * @param text The text to be put in quotes
     * @returns    The quoted text using the correct single/double quote
     */
    TsGenerator.prototype.quoted = function (text) {
        return this.quote + text + this.quote;
    };
    /**
     * Puts the result of a function (content) inside curly braces or returns empty braces `{ }`
     * if there is no content. If the content contains line-feed(s) the a linefeed will be following the opening
     * curly brace and it will also be ensured that the closing curly brace is on a new line.
     * During generation of content and extra level of indentation is provided.
     * @param fn The function that generates the content
     * @returns The embraced content
     */
    TsGenerator.prototype.embraced = function (fn) {
        var inner = this.indented(fn);
        if (!inner) {
            return "{ }";
        }
        if (inner.indexOf("\n") < 0) {
            return "{ " + inner + " }";
        }
        return ("{\n" +
            (inner[0] === this.oneLevelIndent[0] ? inner : this.indent + this.oneLevelIndent + inner) +
            (!inner.endsWith("\n") ? "\n" : "") +
            this.indent +
            "}");
    };
    /**
     * Gets the text to emit for the key of a property
     * @param name The name of the property
     * @returns The resulting key
     */
    TsGenerator.prototype.getPropertyKey = function (name) {
        return this.json || !(0, vdf_name_utils_1.isOkJsIdentifier)(name) ? this.quoted(name) : name;
    };
    /**
     * Gets the import statements for the required types registered during generation.
     *
     * **Note!** If there are any import statements the result will contain an empty line
     * after the import statements.
     * @returns The import statements
     */
    TsGenerator.prototype.getImportStatements = function () {
        var modules = Object.keys(this.imports).sort(lowercaseCompare);
        var result = "";
        var _loop_1 = function (module_1) {
            var moduleImports = this_1.imports[module_1];
            var inlineModuleInfo = this_1.inlineResources[module_1] || {};
            var moduleImportItems = moduleImports.items.filter(function (typeName) { return inlineModuleInfo[typeName] === undefined; });
            var joinedNames = moduleImportItems.length
                ? "{ " + moduleImportItems.sort(lowercaseCompare).join(", ") + " }"
                : "";
            if (!joinedNames) {
                return "continue";
            }
            result += "import " + joinedNames + " from " + this_1.quoted(module_1) + "\n";
        };
        var this_1 = this;
        for (var _i = 0, modules_1 = modules; _i < modules_1.length; _i++) {
            var module_1 = modules_1[_i];
            _loop_1(module_1);
        }
        if (result.length) {
            result += "\n";
        }
        return result;
    };
    /**
     * Gets the imported types to be inlined. **Note:** default exports are not candidates for inlining.
     * @returns A set containing the qualified name (TYPE@MODULE) of all types that should be inlined.
     */
    TsGenerator.prototype.getInlinedQualifiedTypes = function () {
        var result = new Set();
        var resources = this.inlineResources;
        function add(qualifiedType) {
            if (result.has(qualifiedType)) {
                return;
            }
            var atPos = qualifiedType.indexOf("@");
            var module = qualifiedType.substring(atPos + 1);
            var typeName = qualifiedType.substring(0, atPos);
            var inlineModuleInfo = resources[module] || {};
            if (!inlineModuleInfo || !inlineModuleInfo[typeName]) {
                return;
            }
            result.add(qualifiedType);
            for (var _i = 0, _a = inlineModuleInfo[typeName].dependencies; _i < _a.length; _i++) {
                var dep = _a[_i];
                add(dep);
            }
        }
        for (var _i = 0, _a = Object.keys(this.imports); _i < _a.length; _i++) {
            var module_2 = _a[_i];
            if (!resources[module_2]) {
                continue;
            }
            for (var _b = 0, _c = this.imports[module_2].items; _b < _c.length; _b++) {
                var typeName = _c[_b];
                add(typeName + "@" + module_2);
            }
        }
        return result;
    };
    TsGenerator.prototype.interfaceOverrideToString = function (fieldName, override) {
        if (!override.type) {
            throw "An interface field must have a type";
        }
        return ((override.readonly ? "readonly " : "") +
            fieldName +
            (override.required ? "" : "?") +
            (override.args ? "(".concat(override.args.join(", "), ")") : "") +
            (override.type ? ": ".concat(override.type) : ""));
    };
    TsGenerator.prototype.getInlinedTypesCode = function () {
        var types = this.getInlinedQualifiedTypes();
        var result = "";
        for (var module_3 in this.inlineResources) {
            var moduleResources = this.inlineResources[module_3];
            for (var typeName in moduleResources) {
                if (types.has(typeName + "@" + module_3)) {
                    var info = moduleResources[typeName];
                    var fragment = info.fragment;
                    if (this.interfaceOverrides && this.interfaceOverrides[typeName]) {
                        // Split fragment into lines
                        var lines = info.fragment.split("\n");
                        // If this is an interface, apply any overrides
                        if (lines.find(function (line) { return line.startsWith("interface"); }) !== undefined) {
                            // Find the first line on the inside of the interface
                            var startLine = 0;
                            var trimmed = lines[startLine].trimLeft();
                            while (trimmed.startsWith("/**") || trimmed.startsWith("*")) {
                                startLine++;
                                trimmed = lines[startLine].trim();
                            }
                            if (lines[startLine++].startsWith("interface")) {
                                var handledFields = new Set();
                                // Store the indent
                                var line = lines[startLine];
                                var indent = line.substr(0, line.search(/[^\s]/));
                                // Go through the remaining lines
                                for (var i = startLine; i < lines.length; ++i) {
                                    var trimmedLine = lines[i].trim();
                                    if (trimmedLine.startsWith("/**") || trimmedLine.startsWith("}")) {
                                        continue;
                                    }
                                    var lineInfo = trimmedLine.match(/^(readonly)?\s*([^?():]*)(\?)?(\(([^()]*)\))?(:\s*(.*))?$/);
                                    if (lineInfo) {
                                        var readonly = lineInfo[1], fieldName = lineInfo[2], optional = lineInfo[3], args = lineInfo[5], type = lineInfo[7];
                                        if (fieldName in this.interfaceOverrides[typeName]) {
                                            handledFields.add(fieldName);
                                            if (this.interfaceOverrides[typeName][fieldName] === undefined) {
                                                // Override says to remove - set line to undefined
                                                lines[i] = undefined;
                                                // If the line was documented, remove that as well
                                                var trimmedPrevLine = lines[i - 1].trim();
                                                if (trimmedPrevLine.startsWith("/**")) {
                                                    lines[i - 1] = undefined;
                                                }
                                            }
                                            else {
                                                // Combine what we know about the line with the override
                                                var prevLine = lines[i - 1];
                                                var doc = prevLine && prevLine.trim().startsWith("/**")
                                                    ? prevLine.match(/\/\*\*\s*(.*?)\s*\*\//)[1]
                                                    : undefined;
                                                var updated = Object.assign({
                                                    type: type,
                                                    required: !optional,
                                                    readonly: !!readonly,
                                                    args: args === null || args === void 0 ? void 0 : args.split(/,\s*/),
                                                    doc: doc,
                                                }, this.interfaceOverrides[typeName][fieldName]);
                                                var newLine = this.interfaceOverrideToString(fieldName, updated);
                                                if ("doc" in updated) {
                                                    if (doc !== undefined) {
                                                        if (updated.doc !== undefined) {
                                                            // Replace existing doc with new doc
                                                            lines[i - 1] = lines[i - 1].replace(doc, updated.doc);
                                                        }
                                                        else {
                                                            // Replace existing doc with no doc
                                                            lines.splice(--i, 1);
                                                        }
                                                    }
                                                    else if (updated.doc !== undefined) {
                                                        // Add doc that didn't already exist
                                                        lines.splice(i++, 0, "/** ".concat(updated.doc, " */"));
                                                    }
                                                }
                                                lines[i] = lines[i].replace(trimmedLine, newLine);
                                            }
                                        }
                                    }
                                }
                                // Go through any overrides that didn't match a line, and add them
                                for (var fieldName in this.interfaceOverrides[typeName]) {
                                    if (handledFields.has(fieldName)) {
                                        continue;
                                    }
                                    var fieldInfo = this.interfaceOverrides[typeName][fieldName];
                                    if (!fieldInfo) {
                                        continue;
                                    }
                                    if (fieldInfo.doc) {
                                        lines.splice(lines.length - 2, 0, "".concat(indent, "/** ").concat(fieldInfo.doc, " */"));
                                    }
                                    var newLine = indent + this.interfaceOverrideToString(fieldName, fieldInfo);
                                    lines.splice(lines.length - 2, 0, newLine);
                                }
                                fragment = lines.filter(function (o) { return o !== undefined; }).join("\n");
                            }
                        }
                    }
                    result += fragment + "\n";
                }
            }
        }
        return result;
    };
    TsGenerator.prototype.addTopLevelItem = function (item) {
        this._topLevelItems.push(item.endsWith("\n") ? item : item + "\n");
        return this;
    };
    TsGenerator.prototype.build = function () {
        return this.getImportStatements() + this.getInlinedTypesCode() + this._topLevelItems.join("\n");
    };
    return TsGenerator;
}());
exports.default = TsGenerator;

},{"./vdf-name-utils":13}],13:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertJsNameToVdfName = exports.convertVdfNameToJsName = exports.isOkJsIdentifier = exports.ConstFieldPrefix = void 0;
/**
 * Definition of the headers used to convert VDF <> JS names
 */
var ConstFieldPrefix = /** @class */ (function () {
    function ConstFieldPrefix() {
    }
    // Defines requirements for field prefixes correctness
    // used in tests only (should be tested at compilation time instead if possible)
    ConstFieldPrefix.isCorrectlyDefined = function () {
        return ConstFieldPrefix.HEADER.length !== 0 && isOkJsIdentifier(ConstFieldPrefix.HEADER);
    };
    /** Prefix used on a field name converted to a valid JS identifier */
    ConstFieldPrefix.HEADER = "$";
    return ConstFieldPrefix;
}());
exports.ConstFieldPrefix = ConstFieldPrefix;
/**
 * Checks whether a name is OK to use as a JavaScript identifier.
 * Especially, A JavaScript identifier cannot start with a digit, and cannot use dots or dashes.
 * (To simplify implementation, international alphabetical characters are not considered to be OK
 * since they are not relevant in VDF.)
 * @param name The name to be checked
 * @returns    `true` if name is OK, otherwise `false`
 */
function isOkJsIdentifier(name) {
    if (!name || name.length === 0) {
        return false;
    }
    if (name[0] >= "0" && name[0] <= "9") {
        return false;
    }
    for (var i = 0; i < name.length; ++i) {
        var c = name[i];
        if (c !== "$" && c !== "_" && (c < "a" || c > "z") && (c < "A" || c > "Z") && (c < "0" || c > "9")) {
            return false;
        }
    }
    return true;
}
exports.isOkJsIdentifier = isOkJsIdentifier;
/**
 * "Converts" VDF field name to a name used in JavaScript.
 * Conversion chosen consist on adding the systematic prefix {@link ConstFieldPrefix.HEADER} to the unchanged name.
 * @param vdfName The VDF field name to be converted
 * @returns The associated JavaScript name. If it is not valid as JS identifier, access will be made via dictionary syntax ['...']
 */
function convertVdfNameToJsName(vdfName) {
    return ConstFieldPrefix.HEADER + vdfName;
}
exports.convertVdfNameToJsName = convertVdfNameToJsName;
/**
 * Converts back a JavaScript identifier, previously generated by {@link convertVdfNameToJsName}, to a VDF name.
 * @param jsName The JavaScript identifier to be converted
 * @returns The associated VDF name or `undefined` if `jsName` was not created by {@link convertVdfNameToJsName}
 */
function convertJsNameToVdfName(jsName) {
    if (jsName) {
        if (jsName.startsWith(ConstFieldPrefix.HEADER) && jsName.length > ConstFieldPrefix.HEADER.length) {
            return jsName.substring(ConstFieldPrefix.HEADER.length);
        }
    }
    // other cases
    return undefined;
}
exports.convertJsNameToVdfName = convertJsNameToVdfName;

},{}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListFieldProxy = exports.ScalarFieldProxy = exports.EmptyFieldProxy = exports.DIRECT_ACCESSORS = exports.getValueConverter = exports.VDFLIST_CONVERTER = exports.DUPLET_CONVERTER = exports.isValidDateTime = exports.isValidDate = exports.MIN_MAX_SAFE_NUMBER_ERROR_MESSAGE = void 0;
var xmldom_1 = require("@xmldom/xmldom");
var proxy_utils_1 = require("../proxy-utils");
var media_asset_1 = require("./media-asset");
var vdf_rich_text_1 = require("./vdf-rich-text");
var vdf_ts_model_info_1 = require("./vdf-ts-model-info");
var vdf_ts_types_1 = require("./vdf-ts-types");
var vdf_xml_utils_1 = require("./vdf-xml-utils");
var xml_utils_1 = require("./xml-utils");
var xsd_conversion_1 = require("./xsd-conversion");
exports.MIN_MAX_SAFE_NUMBER_ERROR_MESSAGE = "Invalid number provided";
function parseFloatStrict(floatText) {
    if (isNaN(floatText)) {
        return undefined;
    }
    var result = parseFloat(floatText);
    return isFinite(result) ? result : undefined;
}
var STRING_CONVERTER = {
    toJs: function (vdfValue) {
        return typeof vdfValue === "string" ? (0, xml_utils_1.xmlUnescape)(vdfValue) : "";
    },
    toVdf: function (jsValue) {
        return (0, xml_utils_1.xmlEscape)(jsValue);
    },
    isJsValueOk: function (jsValue) {
        return typeof jsValue === "string";
    },
};
var DECIMAL_CONVERTER = {
    toJs: function (vdfValue) {
        var _a;
        return typeof vdfValue === "string" ? (_a = (0, xsd_conversion_1.parseXsdDecimal)(vdfValue)) !== null && _a !== void 0 ? _a : 0 : 0;
    },
    toVdf: function (jsValue) {
        return jsValue != null ? (0, xsd_conversion_1.stringifyXsdDecimal)(jsValue) : null;
    },
    isJsValueOk: function (jsValue) {
        return typeof jsValue === "number" && Math.abs(jsValue) < Number.MAX_SAFE_INTEGER;
    },
    errorMessage: exports.MIN_MAX_SAFE_NUMBER_ERROR_MESSAGE,
};
var INTEGER_CONVERTER = {
    toJs: function (vdfValue) {
        var _a;
        return typeof vdfValue === "string" ? (_a = (0, xsd_conversion_1.parseXsdInteger)(vdfValue)) !== null && _a !== void 0 ? _a : 0 : 0;
    },
    toVdf: function (jsValue) {
        return jsValue != null ? (0, xsd_conversion_1.stringifyXsdInteger)(jsValue) : null;
    },
    isJsValueOk: function (jsValue) {
        return typeof jsValue === "number" && Number.isInteger(jsValue) && Math.abs(jsValue) < Math.pow(2, 31);
    },
    errorMessage: exports.MIN_MAX_SAFE_NUMBER_ERROR_MESSAGE,
};
var BOOLEAN_CONVERTER = {
    toJs: function (vdfValue) {
        if (typeof vdfValue === "string") {
            var val = (0, xsd_conversion_1.parseXsdBoolean)(vdfValue);
            if (val !== null) {
                return val;
            }
        }
        return false;
    },
    toVdf: function (jsValue) {
        if (typeof jsValue === "string") {
            return jsValue;
        }
        return jsValue != null ? (0, xsd_conversion_1.stringifyXsdBoolean)(jsValue) : null;
    },
    isJsValueOk: function (jsValue) {
        return typeof jsValue === "boolean";
    },
};
/**
 * Checks if date is valid for VDF: expects "yyyy-MM-dd" format
 * @param date a string containing a date
 * @return true if the date is ISO compliant and valid. cf. https://www.geeksforgeeks.org/javascript-date-gettime-method/
 */
var isValidDate = function (date) {
    return /^\d+-\d{1,2}-\d{1,2}$/g.test(date) && !isNaN(new Date(date).getTime());
};
exports.isValidDate = isValidDate;
var NULLABLE_DATE_CONVERTER = {
    toJs: function (vdfValue) {
        return typeof vdfValue === "string" ? vdfValue : null;
    },
    toVdf: function (jsValue) {
        return jsValue;
    },
    isJsValueOk: function (jsValue) {
        return jsValue === null || (0, exports.isValidDate)(jsValue);
    },
    errorMessage: 'Invalid date provided: expecting "yyyy-MM-dd" format',
};
/**
 * Checks if date+time  is valid for VDF: expects "yyyy-MM-dd'T'HH:mm:ss'Z'" format
 * @param date a string containing a date + time
 * @return true if the date + time is ISO compliant and valid. cf. https://www.geeksforgeeks.org/javascript-date-gettime-method/
 */
var isValidDateTime = function (date) {
    return /^\d+-\d{1,2}-\d{1,2}T\d{1,2}:\d{1,2}:\d{1,2}Z$/g.test(date) && !isNaN(new Date(date).getTime());
};
exports.isValidDateTime = isValidDateTime;
var NULLABLE_DATETIME_CONVERTER = {
    toJs: function (vdfValue) {
        return typeof vdfValue === "string" ? vdfValue : null;
    },
    toVdf: function (jsValue) {
        return jsValue;
    },
    isJsValueOk: function (jsValue) {
        return jsValue === null || (0, exports.isValidDateTime)(jsValue);
    },
    errorMessage: "Invalid date-time provided: Expecting \"yyyy-MM-dd'T'HH:mm:ss'Z'\" format",
};
function getTupleParts(vdfValue, expectedPartCount) {
    if (typeof vdfValue !== "string") {
        return undefined;
    }
    var parts = vdfValue.split(" ");
    if (parts.length !== expectedPartCount) {
        return undefined;
    }
    var result = [];
    for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
        var part = parts_1[_i];
        var float = parseFloatStrict(part);
        if (float === undefined) {
            return undefined;
        }
        result.push(float);
    }
    return result;
}
exports.DUPLET_CONVERTER = {
    toJs: function (vdfValue) {
        var parts = getTupleParts(vdfValue, 2);
        if (!parts) {
            return new vdf_ts_types_1.Duplet(0, 0);
        }
        return new vdf_ts_types_1.Duplet(parts[0], parts[1]);
    },
    toVdf: function (jsValue) {
        if (typeof jsValue === "string") {
            return jsValue;
        }
        return jsValue ? "".concat(jsValue.x, " ").concat(jsValue.y) : null;
    },
    isJsValueOk: function (jsValue) {
        return jsValue instanceof vdf_ts_types_1.Duplet;
    },
};
var TRIPLET_CONVERTER = {
    toJs: function (vdfValue) {
        var parts = getTupleParts(vdfValue, 3);
        if (!parts) {
            return new vdf_ts_types_1.Triplet(0, 0, 0);
        }
        return new vdf_ts_types_1.Triplet(parts[0], parts[1], parts[2]);
    },
    toVdf: function (jsValue) {
        if (typeof jsValue === "string") {
            return jsValue;
        }
        return jsValue ? "".concat(jsValue.x, " ").concat(jsValue.y, " ").concat(jsValue.z) : null;
    },
    isJsValueOk: function (jsValue) {
        return jsValue instanceof vdf_ts_types_1.Triplet;
    },
};
var VIZMAP_CONVERTER = {
    toJs: function (vdfValue) {
        if (typeof vdfValue !== "string") {
            return new vdf_ts_types_1.VizMap("");
        }
        return new vdf_ts_types_1.VizMap(vdfValue);
    },
    toVdf: function (jsValue) {
        if (typeof jsValue === "string") {
            return jsValue;
        }
        return jsValue.mapString;
    },
    isJsValueOk: function (jsValue) {
        return jsValue instanceof vdf_ts_types_1.VizMap;
    },
};
exports.VDFLIST_CONVERTER = {
    toJs: function (vdfValue) {
        if (!vdfValue) {
            return "";
        }
        if (typeof vdfValue === "string") {
            return vdfValue;
        }
        return new xmldom_1.XMLSerializer().serializeToString(vdfValue);
    },
    toVdf: function (jsValue) {
        if (!this.isJsValueOk(jsValue)) {
            return "";
        }
        return new DOMParser().parseFromString(jsValue, "text/xml").documentElement;
    },
    isJsValueOk: function (jsValue) {
        return typeof jsValue === "string";
    },
};
function isElement(jsValue) {
    return typeof jsValue === "object" && jsValue !== null && "getElementsByTagName" in jsValue;
}
var NO_OP_CONVERTER = {
    toJs: function (vdfValue) {
        return vdfValue;
    },
    toVdf: function (jsValue) {
        return jsValue;
    },
    isJsValueOk: function (jsValue) {
        return jsValue === null || typeof jsValue === "string" || isElement(jsValue);
    },
};
var NULLABLE_XML_CONVERTER = {
    toJs: function (vdfValue) {
        return vdfValue && typeof vdfValue !== "string" ? vdfValue : null;
    },
    toVdf: function (jsValue) {
        return jsValue;
    },
    isJsValueOk: function (jsValue) {
        return jsValue === null || isElement(jsValue);
    },
};
function createRichTextConverter(fieldElementProvider) {
    return {
        toJs: function (vdfValue) {
            var _a;
            return (_a = (0, vdf_rich_text_1.createRichTextFromFieldValue)(vdfValue)) !== null && _a !== void 0 ? _a : (0, vdf_rich_text_1.createRichTextFromFieldValue)("");
        },
        toVdf: function (jsValue) {
            if (typeof jsValue === "string") {
                return jsValue;
            }
            return jsValue.getVdfValue(hasXmlValue(fieldElementProvider()));
        },
        isJsValueOk: function (jsValue) {
            return (jsValue !== null &&
                (typeof jsValue === "object" || typeof jsValue === "string" || jsValue instanceof vdf_rich_text_1.RichTextBase));
        },
    };
}
function hasXmlValue(element) {
    return (0, xml_utils_1.getFirstChildElement)((0, xml_utils_1.getFirstChildElement)(element, vdf_xml_utils_1.vizNs, "value"), undefined, undefined) !== undefined;
}
function createNullableImageAssetConverter() {
    return {
        toJs: function (vdfValue) {
            if (typeof vdfValue == "string" && vdfValue != "") {
                var element = new DOMParser().parseFromString(vdfValue, "application/xml").documentElement;
                return (0, media_asset_1.createImageAsset)(element);
            }
            else {
                return vdfValue ? (0, media_asset_1.createImageAsset)(vdfValue) : null;
            }
        },
        toVdf: function (jsValue) {
            return jsValue ? toElement(jsValue) : null;
        },
        isJsValueOk: function (jsValue) {
            return jsValue === null || (0, media_asset_1.isMediaAsset)(jsValue, "image");
        },
    };
}
function toElement(asset) {
    return Object.freeze(new DOMParser().parseFromString(toString(asset), "application/xml").documentElement);
}
function toString(asset) {
    var mediaContentParts = [];
    // Build media:content element with all available attributes
    if (asset.width !== undefined || asset.height !== undefined || asset.path) {
        var attributes = [
            asset.path && "url=\"".concat(asset.path, "\""),
            "type=\"application/vnd.vizrt.viz.".concat(asset.mediaType, "\""),
            asset.width !== undefined && "width=\"".concat(asset.width, "\""),
            asset.height !== undefined && "height=\"".concat(asset.height, "\""),
            asset.mediaType === "video" &&
                "duration" in asset &&
                asset.duration !== undefined &&
                "duration=\"".concat(asset.duration, "\""),
        ]
            .filter(Boolean)
            .join(" ");
        mediaContentParts.push("<media:content xmlns:media=\"http://search.yahoo.com/mrss/\" ".concat(attributes, " />"));
    }
    return "<entry xmlns=\"http://www.w3.org/2005/Atom\">\n            <title>".concat(asset.title || "N/A", "</title>\n            <content type=\"application/vnd.vizrt.viz.").concat(asset.mediaType, "\">").concat(asset.path || "", "</content>\n            ").concat(mediaContentParts.join(""), "\n            ").concat(asset.thumbnailUrl
        ? "<thumbnail xmlns='http://search.yahoo.com/mrss/' url='" + asset.thumbnailUrl + "'/>"
        : "", "\n          </entry>");
}
function createNullableVideoAssetConverter() {
    return {
        toJs: function (vdfValue) {
            if (typeof vdfValue == "string" && vdfValue != "") {
                var element = new DOMParser().parseFromString(vdfValue, "application/xml").documentElement;
                return (0, media_asset_1.createVideoAsset)(element);
            }
            else {
                return vdfValue ? (0, media_asset_1.createVideoAsset)(vdfValue) : null;
            }
        },
        toVdf: function (jsValue) {
            return jsValue ? toElement(jsValue) : null;
        },
        isJsValueOk: function (jsValue) {
            return jsValue === null || (0, media_asset_1.isMediaAsset)(jsValue, "video");
        },
    };
}
/**
 * This map holds the JavaScript value that an `Element` has been associated with.
 * This is just to avoid having to convert to string (to get something we can compare)
 * more than once per `Element`.
 * It assumes that we don't allow modifying the element after it has been assigned as
 * the field value.
 */
var cachedElementToJsValueMap = new WeakMap();
/**
 * Creates a value converter that caches the last value to be used in JavaScript so that it
 * returns the same object as long as the underlying VDF value does not change.
 *
 * It caches JavaScript values for both `Element` and `string` VDF values.
 * When the VDF value is XML, the `comparableVdfValue` contains the XML `Element` serialized to string
 * so that it is easy to compare it.
 * @param baseConverter The converter doing the value conversion.
 *                      The `toJs` method in this converter MUST return frozen objects.
 * @returns             The requested caching converter
 */
function createCachingConverter(baseConverter) {
    /** Holds a string that can be used to check whether the VDF value is unchanged so that we can return the cached js-value */
    var comparableVdfValue = null;
    /** The previous returned (or set) JavaScript value */
    var cachedJsValue;
    /** Whether comparable VDF value is an XML `Element` serialized to `string` */
    var comparableWasXml = false;
    return {
        toJs: function (vdfValue, propertiesUpdater) {
            if (vdfValue === null) {
                return baseConverter.toJs(vdfValue, propertiesUpdater);
            }
            if (typeof vdfValue === "string") {
                if (comparableWasXml || vdfValue !== comparableVdfValue) {
                    cachedJsValue = baseConverter.toJs(vdfValue, propertiesUpdater);
                    comparableVdfValue = vdfValue;
                    comparableWasXml = false;
                }
            }
            else if (cachedJsValue === undefined || cachedElementToJsValueMap.get(vdfValue) !== cachedJsValue) {
                var comparable = new xmldom_1.XMLSerializer().serializeToString(vdfValue);
                if (comparable === comparableVdfValue) {
                    cachedElementToJsValueMap.set(vdfValue, cachedJsValue);
                }
                else {
                    cachedJsValue = baseConverter.toJs(vdfValue, propertiesUpdater);
                    comparableVdfValue = comparable;
                    comparableWasXml = true;
                }
            }
            return cachedJsValue;
        },
        toVdf: function (jsValue) {
            var vdfValue = baseConverter.toVdf(jsValue);
            if (vdfValue !== null && Object.isFrozen(jsValue)) {
                var comparable = typeof vdfValue === "object" ? new xmldom_1.XMLSerializer().serializeToString(vdfValue) : vdfValue;
                if (typeof vdfValue === "string" && vdfValue !== comparableVdfValue) {
                    cachedJsValue = jsValue;
                    comparableVdfValue = comparable;
                    comparableWasXml = typeof vdfValue === "object";
                    if (typeof vdfValue === "object") {
                        cachedElementToJsValueMap.set(vdfValue, cachedJsValue);
                    }
                }
            }
            return vdfValue;
        },
        isJsValueOk: function (jsValue) {
            return baseConverter.isJsValueOk(jsValue);
        },
    };
}
function getValueConverter(type, fieldElementProvider, nullable) {
    if (!type) {
        return NO_OP_CONVERTER;
    }
    if (typeof type !== "string") {
        var xsdType = type.xsdType;
        switch (xsdType) {
            case "boolean" /* XsdType.BOOLEAN */:
                return BOOLEAN_CONVERTER;
            case "integer" /* XsdType.INTEGER */:
                return INTEGER_CONVERTER;
            case "decimal" /* XsdType.DECIMAL */:
                return DECIMAL_CONVERTER;
            case "date" /* XsdType.DATE */:
                return NULLABLE_DATE_CONVERTER;
            case "dateTime" /* XsdType.DATETIME */:
                return NULLABLE_DATETIME_CONVERTER;
            case "string" /* XsdType.MULTI_LINE_TEXT */:
            case "normalizedString" /* XsdType.SINGLE_LINE_TEXT */:
            default:
                return STRING_CONVERTER;
        }
    }
    var mediaType = type;
    if (mediaType === "application/vnd.vizrt.duplet") {
        return createCachingConverter(exports.DUPLET_CONVERTER);
    }
    if (mediaType === "application/vnd.vizrt.triplet") {
        return createCachingConverter(TRIPLET_CONVERTER);
    }
    if (mediaType === "application/vnd.vizrt.richtext+xml") {
        if (nullable) {
            throw new Error("RichText type should not be nullable");
        }
        return createCachingConverter(createRichTextConverter(fieldElementProvider));
    }
    if (mediaType === "application/atom+xml;type=entry;media=image" ||
        mediaType === "application/vnd.vizrt.viz-entry+json;media=image") {
        if (!nullable) {
            throw new Error("Only nullable image types are currently supported");
        }
        return createCachingConverter(createNullableImageAssetConverter());
    }
    if (mediaType === "application/atom+xml;type=entry;media=video" ||
        mediaType === "application/vnd.vizrt.viz-entry+json;media=video") {
        if (!nullable) {
            throw new Error("Only nullable video types are currently supported");
        }
        return createCachingConverter(createNullableVideoAssetConverter());
    }
    if (mediaType === "application/vnd.vizrt.curious.map") {
        return createCachingConverter(VIZMAP_CONVERTER);
    }
    var isXml = (0, vdf_ts_types_1.isXmlType)(mediaType);
    if (isXml) {
        if (!nullable) {
            throw new Error("Only nullable xml types are currently supported");
        }
        return NULLABLE_XML_CONVERTER;
    }
    return STRING_CONVERTER;
}
exports.getValueConverter = getValueConverter;
exports.DIRECT_ACCESSORS = {
    annotationAccess: {
        get: vdf_xml_utils_1.getVdfFieldAnnotation,
        set: vdf_xml_utils_1.setVdfFieldAnnotation,
        get parentAccess() {
            return this;
        },
    },
    valueAccess: { get: vdf_xml_utils_1.getVdfFieldValue, set: vdf_xml_utils_1.setVdfFieldValue },
};
function getDefinitionAnnotation(fieldElement, fieldDefAnnotations, annotationType) {
    return (fieldDefAnnotations === null || fieldDefAnnotations === void 0 ? void 0 : fieldDefAnnotations[annotationType]) || undefined;
}
function getInheritedAnnotation(fieldElement, fieldDefAnnotations, annotationAccess, annotationType) {
    var defAnnotation = getDefinitionAnnotation(fieldElement, fieldDefAnnotations, annotationType);
    if (defAnnotation !== undefined) {
        return defAnnotation;
    }
    var parentElement = (fieldElement === null || fieldElement === void 0 ? void 0 : fieldElement.parentNode) || undefined;
    if (!parentElement || parentElement.tagName !== "field" || parentElement.namespaceURI !== vdf_xml_utils_1.vizNs) {
        return undefined;
    }
    var parentAnnotationAccess = annotationAccess.parentAccess;
    if (!parentAnnotationAccess) {
        return undefined;
    }
    var parentAnnotation = parentAnnotationAccess.get(parentElement, annotationType);
    return parentAnnotation !== undefined
        ? parentAnnotation
        : getInheritedAnnotation(parentElement, fieldDefAnnotations, parentAnnotationAccess, annotationType);
}
/**
 * Provides access to a void VDF field. (Contains only the annotations)
 */
var EmptyFieldProxy = /** @class */ (function () {
    function EmptyFieldProxy(fieldElementProvider, fieldDefAnnotations, annotationAccess, fieldPath, callbacks, decorationMap) {
        var _this = this;
        this._fieldElementProvider = fieldElementProvider;
        this._fieldDefAnnotations = fieldDefAnnotations;
        this._annotationAccess = annotationAccess;
        this._fieldPath = fieldPath;
        this._callbacks = callbacks;
        this._decorationMap = decorationMap;
        // Initialize encapsulated decoration wrapper immediately
        var decorationWrapper = decorationMap.get(fieldPath) || { decoration: {} };
        decorationMap.set(fieldPath, decorationWrapper);
        this._encapsulatedDecorationProxy = (0, proxy_utils_1.createProxyObject)(decorationWrapper, fieldPath + "/decoration", undefined, function () {
            var currentWrapper = _this._decorationMap.get(_this._fieldPath);
            if (currentWrapper) {
                _this._notifyDecorationChange(currentWrapper.decoration);
            }
        });
    }
    EmptyFieldProxy.prototype._notifyDecorationChange = function (decorationToNotify) {
        this._callbacks.onFieldChangedByScript(this._fieldPath, "decoration", JSON.stringify(decorationToNotify));
    };
    Object.defineProperty(EmptyFieldProxy.prototype, "hidden", {
        get: function () {
            var fieldElement = this._fieldElementProvider();
            var visibility = this._annotationAccess.get(fieldElement, "visibility");
            if (visibility === undefined) {
                visibility = getInheritedAnnotation(fieldElement, this._fieldDefAnnotations, this._annotationAccess, "visibility");
            }
            return visibility === "hidden";
        },
        set: function (hidden) {
            var fieldElement = this._fieldElementProvider();
            if (!fieldElement) {
                throw new Error("No field XML element available for specifying visibility.");
            }
            this._setAnnotation("visibility", hidden ? "hidden" : "visible");
            this._callbacks.onFieldChangedByScript(this._fieldPath, "visibility", hidden ? "hidden" : "visible");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmptyFieldProxy.prototype, "readOnly", {
        get: function () {
            var fieldElement = this._fieldElementProvider();
            var editable = this._annotationAccess.get(fieldElement, "contenteditable");
            if (editable === undefined) {
                editable = getInheritedAnnotation(fieldElement, this._fieldDefAnnotations, this._annotationAccess, "contenteditable");
            }
            return editable === "false";
        },
        set: function (readOnly) {
            this._setAnnotation("contenteditable", readOnly ? "false" : "true");
            this._callbacks.onFieldChangedByScript(this._fieldPath, "contenteditable", readOnly ? "false" : "true");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmptyFieldProxy.prototype, "error", {
        get: function () {
            return this._annotationAccess.get(this._fieldElementProvider(), "error") || "";
        },
        set: function (error) {
            this._setAnnotation("error", error || undefined);
            this._callbacks.onFieldChangedByScript(this._fieldPath, "error", error);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmptyFieldProxy.prototype, "tip", {
        get: function () {
            var _a, _b;
            var fieldElement = this._fieldElementProvider();
            var tip = this._annotationAccess.get(fieldElement, "tip");
            return tip !== undefined ? tip : (_b = (_a = this._fieldDefAnnotations) === null || _a === void 0 ? void 0 : _a["tip"]) !== null && _b !== void 0 ? _b : "";
        },
        set: function (tip) {
            this._setAnnotation("tip", tip || undefined);
            this._callbacks.onFieldChangedByScript(this._fieldPath, "tip", tip);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EmptyFieldProxy.prototype, "decoration", {
        get: function () {
            return this._encapsulatedDecorationProxy.decoration;
        },
        set: function (decoration) {
            var decorationWrapper = this._decorationMap.get(this._fieldPath);
            decorationWrapper.decoration = decoration;
            this._notifyDecorationChange(decoration);
        },
        enumerable: false,
        configurable: true
    });
    EmptyFieldProxy.prototype._getFieldElementStrict = function () {
        var el = this._fieldElementProvider();
        if (!el) {
            throw new Error("No field element available in XML document");
        }
        return el;
    };
    EmptyFieldProxy.prototype.clearAnnotation = function (annotationType) {
        this._setAnnotation(annotationType, undefined);
    };
    EmptyFieldProxy.prototype._setAnnotation = function (annotationType, annotationValue) {
        var fieldElement = this._fieldElementProvider();
        if (!fieldElement) {
            throw new Error("No field XML element available for specifying the ".concat(annotationType, " annotation."));
        }
        this._annotationAccess.set(fieldElement, annotationType, annotationValue);
    };
    return EmptyFieldProxy;
}());
exports.EmptyFieldProxy = EmptyFieldProxy;
/**
 * Provides access to a scalar VDF field
 */
var ScalarFieldProxy = /** @class */ (function (_super) {
    __extends(ScalarFieldProxy, _super);
    function ScalarFieldProxy(fieldElementProvider, fieldDefAnnotations, annotationAccess, valueAccess, valueConverter, fieldPath, callbacks, decorationMap) {
        var _this = _super.call(this, fieldElementProvider, fieldDefAnnotations, annotationAccess, fieldPath, callbacks, decorationMap) || this;
        _this._valueAccess = valueAccess;
        _this._valueConverter = valueConverter;
        _this._metadata = null; // We don't know about metadata yet
        return _this;
    }
    ScalarFieldProxy.prototype.silentSetValue = function (value) {
        var fieldElement = this._fieldElementProvider();
        if (!fieldElement) {
            throw new Error("No field XML element available for holding the value.");
        }
        if (!this._valueConverter.isJsValueOk(value)) {
            var strval = String(value);
            var maxcharval = 50; // avoid ui flooding in case of large strings
            var formattedReceivedValue = "'" + (strval.length < maxcharval ? strval + "'" : strval.substring(0, maxcharval) + " ...'");
            var fieldType = this.getFieldType(value);
            if (this._valueConverter.errorMessage) {
                throw new Error(this._valueConverter.errorMessage +
                    " for field '" +
                    this._fieldPath +
                    "' (received " +
                    formattedReceivedValue +
                    ")");
            }
            else {
                throw new Error("Invalid field value provided for field '" +
                    this._fieldPath +
                    "' (received a " +
                    typeof value +
                    (fieldType ? " for " + fieldType + " field " : "") +
                    " = " +
                    formattedReceivedValue +
                    ")");
            }
        }
        var vdfValue = this._valueConverter.toVdf(value);
        this._valueAccess.set(fieldElement, vdfValue);
        return vdfValue;
    };
    Object.defineProperty(ScalarFieldProxy.prototype, "value", {
        get: function () {
            var _this = this;
            var value = this._valueConverter.toJs(this._valueAccess.get(this._fieldElementProvider()), function (v) {
                _this.value = v;
            });
            if (!Object.isFrozen(value) && value && typeof value === "object") {
                // Setup child proxies to update the value when they are changed
                var proxiedObject = (0, proxy_utils_1.createProxyObject)(value, this._fieldPath, function (path, childValue) {
                    // Extract the property name from the path (should be just the property name for direct properties)
                    var propertyName = path.split("/").pop() || path;
                    if (!(propertyName in value)) {
                        return false;
                    }
                    var key = propertyName;
                    // If the property exists, we can set it directly
                    value[key] = childValue;
                    var isValid = _this._valueConverter.isJsValueOk(value);
                    if (isValid) {
                        _this.value = value;
                    }
                    return isValid;
                });
                return proxiedObject;
            }
            return value;
        },
        set: function (value) {
            var vdfValue = this.silentSetValue(value);
            if (vdfValue && typeof vdfValue !== "string") {
                this._callbacks.onFieldChangedByScript(this._fieldPath, "value", new xmldom_1.XMLSerializer().serializeToString(vdfValue));
            }
            else {
                this._callbacks.onFieldChangedByScript(this._fieldPath, "value", vdfValue || "");
            }
            if (typeof value !== "string" && (0, media_asset_1.isMediaAsset)(value, "image")) {
                // We must invalidate the metadata
                this._metadata = null;
            }
        },
        enumerable: false,
        configurable: true
    });
    ScalarFieldProxy.prototype.getFieldType = function (value) {
        if (value instanceof vdf_ts_types_1.Duplet) {
            return "a Duplet";
        }
        if (value instanceof vdf_rich_text_1.RichTextBase) {
            return "a RichText";
        }
        if (value instanceof vdf_ts_types_1.Triplet) {
            return "a Triplet";
        }
        if (value instanceof vdf_ts_types_1.VizMap) {
            return "a Map";
        }
        if (!(typeof value === "string") && (0, media_asset_1.isMediaAsset)(value, "image")) {
            return "an Image";
        }
        if (!(typeof value === "string") && (0, media_asset_1.isMediaAsset)(value, "video")) {
            return "a Video";
        }
        // check empty last
        if (value instanceof EmptyFieldProxy) {
            return "an Empty";
        }
        return undefined;
    };
    Object.defineProperty(ScalarFieldProxy.prototype, "metadata", {
        get: function () {
            var current = this._metadata;
            if (current !== null) {
                return current !== true ? current : undefined;
            }
            var value = this.value;
            if (typeof value !== "object" || !(0, media_asset_1.isMediaAsset)(value, "image")) {
                this._metadata = undefined;
                return undefined;
            }
            // It is an image field, so there should be metadata, but we don't have them yet.
            this._metadata = true;
            this._callbacks.triggerMetadataRequest(this._fieldPath);
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    return ScalarFieldProxy;
}(EmptyFieldProxy));
exports.ScalarFieldProxy = ScalarFieldProxy;
/**
 * Provides access to a list VDF field
 */
var ListFieldProxy = /** @class */ (function (_super) {
    __extends(ListFieldProxy, _super);
    function ListFieldProxy(fieldElementProvider, fieldDefAnnotations, annotationAccess, valueAccess, fieldPath, callbacks, decorationMap, listInfo) {
        var _this = _super.call(this, fieldElementProvider, fieldDefAnnotations, annotationAccess, valueAccess, exports.VDFLIST_CONVERTER, fieldPath, callbacks, decorationMap) || this;
        _this.fieldElementProvider = fieldElementProvider;
        _this.fieldDefAnnotations = fieldDefAnnotations;
        _this.annotationAccess = annotationAccess;
        _this.valueAccess = valueAccess;
        _this.fieldPath = fieldPath;
        _this.callbacks = callbacks;
        _this.listInfo = listInfo;
        _this._value = _this.createListItems(_this.listInfo.columns);
        return _this;
    }
    ListFieldProxy.prototype.createListItems = function (itemInfos) {
        var _this = this;
        var _a, _b;
        var fieldElement = this.fieldElementProvider();
        var elementChildren = Array.from((_a = fieldElement === null || fieldElement === void 0 ? void 0 : fieldElement.childNodes) !== null && _a !== void 0 ? _a : []).filter(function (node) { return node.nodeType === 1; });
        var listElement = elementChildren.find(function (child) { return child.localName === "list"; });
        var listChildren = Array.from((_b = listElement === null || listElement === void 0 ? void 0 : listElement.childNodes) !== null && _b !== void 0 ? _b : []).filter(function (node) { return node.nodeType === 1; });
        var items = Array.from(listChildren !== null && listChildren !== void 0 ? listChildren : [])
            .filter(function (child) { return child.localName === "payload"; })
            .map(function (itemPayload, index) {
            var itemPath = "".concat(_this.fieldPath, "/#").concat(index);
            return _this.createListItem(itemInfos, index, itemPath, itemPayload);
        });
        return Object.freeze(items);
    };
    ListFieldProxy.prototype.createListItem = function (listInfo, index, path, itemElement) {
        var _this = this;
        var _a;
        var fields = Array.from((_a = itemElement === null || itemElement === void 0 ? void 0 : itemElement.childNodes) !== null && _a !== void 0 ? _a : []).filter(function (node) { return node.nodeType === 1 && node.localName === "field"; });
        var item = Object.entries(listInfo).reduce(function (acc, _a) {
            var itemName = _a[0], itemInfo = _a[1];
            var fieldName = itemInfo.vdfName;
            var fieldElement = fields.find(function (fieldEl) { return fieldEl.getAttribute("name") === fieldName; });
            var fieldPath = "".concat(path, "/").concat(fieldName);
            if (!(itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.vdfType)) {
                var emptyField = new EmptyFieldProxy(function () { return fieldElement; }, _this._fieldDefAnnotations, _this.annotationAccess, fieldPath, _this.callbacks, _this._decorationMap);
                acc[itemName] = emptyField;
            }
            else {
                var valueConverter = getValueConverter(itemInfo.vdfType, _this.fieldElementProvider, true);
                var scalarField = (0, vdf_ts_model_info_1.isListType)(itemInfo.vdfType)
                    ? new ListFieldProxy(function () { return fieldElement; }, _this._fieldDefAnnotations, _this.annotationAccess, _this.valueAccess, fieldPath, _this.callbacks, _this._decorationMap, itemInfo.vdfType)
                    : new ScalarFieldProxy(function () { return fieldElement; }, _this._fieldDefAnnotations, _this.annotationAccess, _this.valueAccess, valueConverter, fieldPath, _this.callbacks, _this._decorationMap);
                acc[itemName] = scalarField;
            }
            if (itemInfo === null || itemInfo === void 0 ? void 0 : itemInfo.children) {
                var childItems = _this.createListItem(itemInfo.children, index, fieldPath, fieldElement);
                Object.entries(childItems).forEach(function (_a) {
                    var childName = _a[0], childItem = _a[1];
                    Object.defineProperty(acc[itemName], childName, {
                        value: childItem,
                        writable: false,
                        enumerable: true,
                        configurable: false,
                    });
                });
            }
            return acc;
        }, {});
        return Object.freeze(item);
    };
    Object.defineProperty(ListFieldProxy.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (_) {
            throw new Error("Setting the value property is not supported for vdf list field " + this._fieldPath);
        },
        enumerable: false,
        configurable: true
    });
    ListFieldProxy.prototype.silentSetValue = function (value) {
        var returnValue = _super.prototype.silentSetValue.call(this, value);
        this._value = this.createListItems(this.listInfo.columns);
        return returnValue;
    };
    return ListFieldProxy;
}(ScalarFieldProxy));
exports.ListFieldProxy = ListFieldProxy;

},{"../proxy-utils":6,"./media-asset":10,"./vdf-rich-text":15,"./vdf-ts-model-info":18,"./vdf-ts-types":19,"./vdf-xml-utils":21,"./xml-utils":23,"./xsd-conversion":24,"@xmldom/xmldom":29}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRichTextFromFieldValue = exports.createRichText = exports.RichTextBase = void 0;
var xml_utils_1 = require("./xml-utils");
function wrap(plainText) {
    return "<fo:wrapper xmlns:fo=\"http://www.w3.org/1999/XSL/Format\">".concat((0, xml_utils_1.xmlEscape)(plainText), "</fo:wrapper>");
}
/**
 * Search for the end of a tag that starts at a given position in a string
 * @param fragment The XML fragment to search in
 * @param tagStart The zero-based index in `fragment` of the start of the tag, &lt;.
 * @returns The zero-based index of the first character after the end of the tag, &gt;, or -1 if not found
 */
function scanForTagEnd(fragment, tagStart) {
    var pos = tagStart + 1;
    var length = fragment.length;
    var searchFor = ">";
    while (pos < length) {
        var ch = fragment.charAt(pos++);
        if (ch === searchFor) {
            if (ch === ">") {
                return pos;
            }
            else {
                searchFor = ">";
                continue;
            }
        }
        else if (searchFor !== ">") {
            continue;
        }
        if (ch === "'") {
            searchFor = "'";
        }
        else if (ch === '"') {
            searchFor = '"';
        }
    }
    return -1;
}
/**
 * Scans an XML fragment represented as a `string`
 * @param fragment The XML fragment to scan (as a `string`)
 * @param callback Callback to be called on each tag (both start tags, `<name ...>` and end tags `</name>`)
 *                 and on each text in the string.
 */
function scanXmlFragment(fragment, callback) {
    var pos = 0;
    var tagStart = fragment.indexOf("<");
    while (tagStart >= 0) {
        if (pos < tagStart) {
            callback.onText((0, xml_utils_1.xmlUnescape)(fragment.substring(pos, tagStart)));
        }
        var tagEnd = scanForTagEnd(fragment, tagStart);
        if (tagEnd < 0) {
            pos = tagStart;
            break;
        }
        callback.onTag(fragment, tagStart, tagEnd);
        pos = tagEnd;
        tagStart = fragment.indexOf("<", pos);
    }
    if (pos < fragment.length) {
        callback.onText((0, xml_utils_1.xmlUnescape)(fragment.substring(pos)));
    }
}
/**
 * Gets the resulting plain text that will be displayed by the text control plug-in
 * from a rich-text value stored as a string (the XML fragment)
 * @param xmlFragment The XML fragment that is the value with formatting
 * @returns           The resulting plain text
 */
function getPlainTextFromXmlFragment(xmlFragment) {
    var result = "";
    scanXmlFragment(xmlFragment, {
        onTag: function () { },
        onText: function (text) {
            result += text;
        },
    });
    return result;
}
/**
 * This is the exported (and thus public in this package) version of `RichText`
 */
var RichTextBase = /** @class */ (function () {
    /**
     * Creates the `RichText` object from one of:
     * * `string` - The plain-text (unformatted) to fill the `RichText` object with
     * * `Element` - The XML `Element` that holds the VDF value of the `RichText` field
     * * `EscapedXml` - The `string` VDF value of the `RichText` field
     * @param data The data of the value
     */
    function RichTextBase(data) {
        this._data = data;
    }
    return RichTextBase;
}());
exports.RichTextBase = RichTextBase;
var RichTextImpl = /** @class */ (function (_super) {
    __extends(RichTextImpl, _super);
    function RichTextImpl() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(RichTextImpl.prototype, "plainText", {
        get: function () {
            if (this._plainText !== undefined) {
                return this._plainText;
            }
            this._plainText = this._getPlainText();
            return this._plainText;
        },
        enumerable: false,
        configurable: true
    });
    RichTextImpl.prototype._getPlainText = function () {
        var data = this._data;
        if (typeof data === "string") {
            return data;
        }
        return "xmlAsString" in data ? getPlainTextFromXmlFragment(data.xmlAsString) : data.textContent || "";
    };
    RichTextImpl.prototype.getVdfValue = function (preferXml) {
        var data = this._data;
        if (typeof data === "string") {
            return preferXml ? new DOMParser().parseFromString(wrap(data), "text/xml").documentElement : (0, xml_utils_1.xmlEscape)(data);
        }
        return "xmlAsString" in data ? data.xmlAsString : data;
    };
    return RichTextImpl;
}(RichTextBase));
/**
 * Creates a {@link RichText} with no formatting from a plain text `string`
 * @param plainText The plain text for the created object
 * @param escape if true (default), escapes the given text when creating the RichText (it is necessary to have <> characters properly displayed.)
 * @returns A {@link RichText} object where {@link RichText.plainText} is `plainText`
 */
function createRichText(plainText, escape) {
    return new RichTextImpl(escape === undefined || escape === true ? (0, xml_utils_1.xmlEscape)(plainText) : plainText);
}
exports.createRichText = createRichText;
/**
 * Creates a `RichText` from the value of a field as stored in a VDF payload
 * @param vdfValue The value of the VDF rich-text field
 * @returns The corresponding `RichText` object
 */
function createRichTextFromFieldValue(vdfValue) {
    if (vdfValue === null) {
        vdfValue = "";
    }
    return new RichTextImpl(typeof vdfValue === "string" ? { xmlAsString: vdfValue } : vdfValue);
}
exports.createRichTextFromFieldValue = createRichTextFromFieldValue;

},{"./xml-utils":23}],16:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTsModelInfo = exports.generateTsPayloadInterface = void 0;
var inline_type_info_map_1 = require("./inline-type-info-map");
var ts_generator_1 = require("./ts-generator");
var vdf_ts_model_info_1 = require("./vdf-ts-model-info");
var VdfTsGenerator = /** @class */ (function (_super) {
    __extends(VdfTsGenerator, _super);
    function VdfTsGenerator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.SCALARFIELDREADONLY = "ScalarFieldReadOnly";
        _this.listOfTypesToSetToReadOnly = ["Duplet", "Triplet", "VizMap", "VdfList"];
        _this.isScalarFieldReadOnlyUsed = false;
        return _this;
    }
    VdfTsGenerator.prototype.ensureImported = function (tsType) {
        switch (tsType) {
            case "number":
            case "boolean":
            case "string":
            case "Element":
            case "Date":
            case this.SCALARFIELDREADONLY:
                return tsType;
            default:
                return this.required(tsType, "@vizrt/pilot-scripting-support");
        }
    };
    VdfTsGenerator.prototype.buildType = function (type) {
        return typeof type === "string" ? this.quoted(type) : "{ xsdType: " + this.quoted(type.xsdType) + " }";
    };
    VdfTsGenerator.prototype.addNullableModifier = function (fieldInfo) {
        if (fieldInfo.nullable === true) {
            return " | null";
        }
        return "";
    };
    VdfTsGenerator.prototype.supportsMaxLengthDecoration = function (fieldInfo) {
        if (fieldInfo.valueType === "RichText") {
            return true;
        }
        else if (fieldInfo.vdfType &&
            typeof fieldInfo.vdfType === "object" &&
            "xsdType" in fieldInfo.vdfType &&
            typeof fieldInfo.vdfType.xsdType === "string") {
            return (fieldInfo.vdfType.xsdType === "string" || // multiline
                fieldInfo.vdfType.xsdType === "normalizedString" // single line
            );
        }
        return false;
    };
    VdfTsGenerator.prototype.buildFields = function (fieldInfoCollection, context) {
        var _this = this;
        return this.indented(function () {
            var result = "";
            for (var fieldName in fieldInfoCollection) {
                var fieldInfo = fieldInfoCollection[fieldName];
                result += _this.indent + "readonly " + _this.getPropertyKey(fieldName) + ": ";
                var valueType = fieldInfo.valueType || ((0, vdf_ts_model_info_1.isListType)(fieldInfo.vdfType) ? "VdfList" : undefined);
                if (valueType) {
                    var scalarType = "ScalarField";
                    if (_this.supportsMaxLengthDecoration(fieldInfo)) {
                        scalarType = "TextScalarField";
                    }
                    else if (_this.listOfTypesToSetToReadOnly.includes(valueType)) {
                        _this.isScalarFieldReadOnlyUsed = true;
                        scalarType = _this.SCALARFIELDREADONLY;
                    }
                    if ((0, vdf_ts_model_info_1.isListType)(fieldInfo.vdfType)) {
                        _this.ensureImported("VdfListItem");
                    }
                    result +=
                        _this.ensureImported(scalarType) +
                            "<" +
                            _this.ensureImported(valueType) +
                            ((0, vdf_ts_model_info_1.isListType)(fieldInfo.vdfType)
                                ? "<{\n" + _this.getListFieldGenerics(fieldInfo.vdfType) + _this.indent + "}>"
                                : "") +
                            _this.addNullableModifier(fieldInfo) +
                            ">";
                }
                else {
                    result += _this.ensureImported("EmptyField");
                }
                if (fieldInfo.children) {
                    var subFieldsCode = _this.buildFields(fieldInfo.children, __spreadArray(__spreadArray([], context, true), [fieldInfo.vdfName], false));
                    if (subFieldsCode) {
                        result += " & {\n" + subFieldsCode + _this.indent + "}";
                    }
                }
                result += ";\n";
            }
            return result;
        });
    };
    VdfTsGenerator.prototype.buildFieldProperties = function (fieldInfo, prefix, suffix, lastSuffix) {
        var result = "";
        if (fieldInfo.valueType) {
            result += prefix + this.getPropertyKey("valueType") + ": " + this.quoted(fieldInfo.valueType) + suffix;
        }
        result += prefix + this.getPropertyKey("vdfName") + ": " + this.quoted(fieldInfo.vdfName);
        var vdfValueType = (0, vdf_ts_model_info_1.getVdfValueType)(fieldInfo.vdfType);
        if (vdfValueType) {
            result += suffix;
            result += prefix + this.getPropertyKey("vdfType") + ": " + this.buildType(vdfValueType) + lastSuffix;
        }
        else {
            result += lastSuffix;
        }
        return result;
    };
    VdfTsGenerator.prototype.append = function (itemGenerator) {
        _super.prototype.addTopLevelItem.call(this, itemGenerator(this));
        return this;
    };
    VdfTsGenerator.prototype.buildFieldsInfo = function (fieldInfoCollection) {
        var _this = this;
        var result = "";
        var fieldNames = Object.keys(fieldInfoCollection);
        var _loop_1 = function (i) {
            var fieldName = fieldNames[i];
            var isLastField = i === fieldNames.length - 1;
            var fieldInfo = fieldInfoCollection[fieldName];
            result +=
                this_1.indent +
                    this_1.getPropertyKey(fieldName) +
                    ": " +
                    this_1.embraced(function () {
                        var children = fieldInfo.children;
                        var isList = (0, vdf_ts_model_info_1.isListType)(fieldInfo.vdfType);
                        var hasChildren = children && Object.keys(children).length;
                        if (hasChildren || isList) {
                            var r = _this.buildFieldProperties(fieldInfo, _this.indent, ",\n", ",\n");
                            if (isList) {
                                var columns_1 = fieldInfo.vdfType.columns;
                                r +=
                                    _this.indent +
                                        _this.getPropertyKey("vdfType") +
                                        ": " +
                                        _this.embraced(function () {
                                            return _this.indent +
                                                _this.getPropertyKey("columns") +
                                                ": " +
                                                _this.embraced(function () { return _this.buildFieldsInfo(columns_1); });
                                        }) +
                                        (hasChildren ? ",\n" : "\n");
                            }
                            if (children && Object.keys(children).length) {
                                r +=
                                    _this.indent +
                                        _this.getPropertyKey("children") +
                                        ": " +
                                        _this.embraced(function () { return _this.buildFieldsInfo(children); }) +
                                        "\n";
                            }
                            return r;
                        }
                        else {
                            return _this.buildFieldProperties(fieldInfo, "", ", ", "");
                        }
                    }) +
                    (isLastField ? "\n" : ",\n");
        };
        var this_1 = this;
        for (var i = 0; i < fieldNames.length; ++i) {
            _loop_1(i);
        }
        return result;
    };
    /**
     * Builds the interface for accessing the VDF payload for the model which information was provided in the constructor
     */
    VdfTsGenerator.prototype.buildPayloadInterface = function (modelInfo) {
        return ("interface Payload {\n" + this.buildFields(modelInfo.fields, []) + "}\n" + this.addScalarFieldReadOnlyInterface());
    };
    VdfTsGenerator.prototype.buildModelInfo = function (modelInfo) {
        var _this = this;
        return ("const MODEL_INFO: " +
            this.required("ModelInfo", "@vizrt/pilot-scripting-support") +
            " = " +
            this.embraced(function () { return _this.getPropertyKey("fields") + ": " + _this.embraced(function () { return _this.buildFieldsInfo(modelInfo.fields); }); }));
    };
    VdfTsGenerator.prototype.buildProxyCreator = function () {
        var proxyCreatorFunction = this.required("createVdfPayloadProxy", "@vizrt/pilot-scripting-support");
        var payloadAccessInterface = this.required("PayloadAccess", "@vizrt/pilot-scripting-support");
        return ("function createPayloadProxy (payloadXml : string | Document | ".concat(payloadAccessInterface, "): Payload ") +
            this.embraced(function () { return "return " + proxyCreatorFunction + "(payloadXml, MODEL_INFO) as Payload\n"; }) +
            "\n");
    };
    VdfTsGenerator.prototype.addScalarFieldReadOnlyInterface = function () {
        if (this.isScalarFieldReadOnlyUsed) {
            return "\n//The override interface that sets values to be readonly\ninterface ScalarFieldReadOnly<T> extends EmptyField {\n\n  /** Provides read-only access to the field value. */\n  readonly value: T\n\n  // Can be assigned a handler function that will be called when the value is changed from outside the script.\n  onChanged?: (value: T) => void\n}\n";
        }
        return "";
    };
    /**
     * Generates the TypeScript generics for a list field.
     * @param listInfo The information about the list field.
     * @param level The current indentation level.
     * @returns The generated TypeScript generics.
     */
    VdfTsGenerator.prototype.getListFieldGenerics = function (listInfo) {
        var result = this.buildFields(listInfo.columns, []);
        return result;
    };
    return VdfTsGenerator;
}(ts_generator_1.default));
var scriptingSupportModule = "@vizrt/pilot-scripting-support";
/**
 * Generates content of a TypeScript file containing an interface of a VDF payload
 * @param modelInfo         Information about the model for which payloads to create an interface for (possibly built using
 *                          `createVdfModelInfo` available in the `vdf-ts-model-info-builder`).
 * @param forceInlinedTypes Vdf types that should be included in the type interface regardless of whether they are needed by the payload
 * @returns                 The generated TypeScript code
 */
function generateTsPayloadInterface(modelInfo, forceInlinedTypes) {
    var generator = new VdfTsGenerator(inline_type_info_map_1.INLINE_TYPE_INFO_MAP);
    if (forceInlinedTypes === null || forceInlinedTypes === void 0 ? void 0 : forceInlinedTypes.length) {
        for (var _i = 0, forceInlinedTypes_1 = forceInlinedTypes; _i < forceInlinedTypes_1.length; _i++) {
            var type = forceInlinedTypes_1[_i];
            generator.required(type, scriptingSupportModule);
        }
    }
    return generator.append(function (g) { return g.buildPayloadInterface(modelInfo); }).build();
}
exports.generateTsPayloadInterface = generateTsPayloadInterface;
/**
 * Generates content of a TypeScript file containing information about a VDF model
 * @param modelInfo    Information about the VDF model of interest (possibly built using
 *                     `createVdfModelInfo` available in the `vdf-ts-model-info-builder`).
 * @returns            The generated TypeScript code
 */
function generateTsModelInfo(modelInfo) {
    return new VdfTsGenerator(undefined).append(function (g) { return g.buildModelInfo(modelInfo); }).build();
}
exports.generateTsModelInfo = generateTsModelInfo;

},{"./inline-type-info-map":9,"./ts-generator":12,"./vdf-ts-model-info":18}],17:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVdfModelInfo = void 0;
var vdf_name_utils_1 = require("./vdf-name-utils");
var vdf_ts_types_1 = require("./vdf-ts-types");
var vdf_xml_utils_1 = require("./vdf-xml-utils");
var xml_utils_1 = require("./xml-utils");
function getTypeIdFromXsdType(xsdType) {
    return xsdType === "boolean" /* XsdType.BOOLEAN */
        ? "boolean"
        : xsdType === "decimal" /* XsdType.DECIMAL */ || xsdType === "integer" /* XsdType.INTEGER */
            ? "number"
            : "string";
}
var mediaTypeMap = {
    "application/vnd.vizrt.duplet": "Duplet",
    "application/vnd.vizrt.triplet": "Triplet",
    "application/vnd.vizrt.richtext+xml": "RichText",
    "application/atom+xml;type=entry;media=image": "ImageAsset",
    "application/vnd.vizrt.viz-entry+json;media=image": "ImageAsset",
    "application/atom+xml;type=entry;media=video": "VideoAsset",
    "application/vnd.vizrt.viz-entry+json;media=video": "VideoAsset",
    "application/vnd.vizrt.curious.map": "VizMap",
};
function getTypeIdFromMediaType(mediaType) {
    var mappedValue = mediaTypeMap[mediaType];
    return mappedValue || ((0, vdf_ts_types_1.isXmlType)(mediaType) ? "Element" : "string");
}
function getIsNullable(valueType, xsdType, mediaType) {
    if (["RichText", "boolean", "number", "Duplet", "Triplet", "VizMap"].includes(valueType)) {
        return false;
    }
    if (valueType == "string" && mediaType == "text/plain" && ["string", "normalizedString"].includes(xsdType !== null && xsdType !== void 0 ? xsdType : "")) {
        return false;
    }
    return true;
}
function createFields(parentElement) {
    var result = null;
    var iterator = (0, vdf_xml_utils_1.createVdfFieldIterator)(parentElement, true);
    var fieldEl;
    while ((fieldEl = iterator.next()) != null) {
        var vdfName = fieldEl.getAttribute("name");
        if (!vdfName) {
            continue;
        }
        var jsName = (0, vdf_name_utils_1.convertVdfNameToJsName)(vdfName);
        var item = void 0;
        var mediaType = fieldEl.getAttribute("mediatype");
        if (mediaType) {
            var xsdType = mediaType !== "text/plain" ? undefined : fieldEl.getAttribute("xsdtype") || "string";
            var valueType = xsdType ? getTypeIdFromXsdType(xsdType) : getTypeIdFromMediaType(mediaType);
            var nullable = getIsNullable(valueType, xsdType, mediaType);
            item = {
                valueType: valueType,
                vdfName: vdfName,
                vdfType: !xsdType ? mediaType : { xsdType: xsdType },
                nullable: nullable,
            };
        }
        else {
            item = { vdfName: vdfName, nullable: true };
            var listEl = (0, xml_utils_1.getFirstChildElement)(fieldEl, vdf_xml_utils_1.vizNs, "listdef");
            var schemaEl = listEl ? (0, xml_utils_1.getFirstChildElement)(listEl, vdf_xml_utils_1.vizNs, "schema") : undefined;
            var list = !schemaEl ? undefined : createFields(schemaEl) || {};
            if (list) {
                item.vdfType = { columns: list };
                item.nullable = false;
            }
        }
        var keys = ["tip", "visibility", "contenteditable"];
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var annotation = fieldEl.getAttribute(key);
            if (annotation) {
                if (!item.annotations) {
                    item.annotations = {};
                }
                item.annotations[key] = annotation;
            }
        }
        var children = createFields(fieldEl);
        if (children) {
            item.children = children;
        }
        if (!result) {
            result = {};
        }
        result[jsName] = item;
    }
    return result;
}
function createFieldsFromJson(fieldDefs) {
    var result = null;
    for (var _i = 0, fieldDefs_1 = fieldDefs; _i < fieldDefs_1.length; _i++) {
        var f = fieldDefs_1[_i];
        var vdfName = f.name;
        if (!f.name) {
            continue;
        }
        var jsName = (0, vdf_name_utils_1.convertVdfNameToJsName)(vdfName);
        var item = void 0;
        var mediaType = f.mediaType;
        if (mediaType) {
            var xsdType = mediaType !== "text/plain" ? undefined : f.xsdType || "string";
            var valueType = xsdType ? getTypeIdFromXsdType(xsdType) : getTypeIdFromMediaType(mediaType);
            var nullable = getIsNullable(valueType, xsdType, mediaType);
            var vdfType = !xsdType ? mediaType : { xsdType: xsdType };
            item = { valueType: valueType, vdfName: vdfName, vdfType: vdfType, nullable: nullable };
        }
        else {
            item = { vdfName: vdfName, nullable: true };
            if (f.listDef) {
                var list = f.listDef ? createFieldsFromJson(f.listDef.schema.items.filter(function (i) { return !("pane" in i); })) : undefined;
                item.vdfType = { columns: list !== null && list !== void 0 ? list : {} };
                item.nullable = false;
            }
        }
        if (f.annotations) {
            item.annotations = {};
            if (f.annotations.tip !== undefined) {
                item.annotations.tip = f.annotations.tip;
            }
            if (f.annotations.visibility !== undefined) {
                item.annotations.visibility = f.annotations.visibility;
            }
            if (f.annotations.contentEditable !== undefined) {
                item.annotations.contenteditable = String(f.annotations.contentEditable);
            }
        }
        var children = f.children ? createFieldsFromJson(f.children) : undefined;
        if (children) {
            item.children = children;
        }
        if (!result) {
            result = {};
        }
        result[jsName] = item;
    }
    return result;
}
/**
 * Creates information for how to implement the typescript interface for a VDF model. Some fields in the model
 * require a payload to determine the characteristics of the field (e.g. number of rows in a list) because they don't
 * exist on the model when 'setPayload' is called.
 * @param model The VDF XML or JSON model
 * @returns the requested information
 * @throws Error if the model is not a valid VDF model
 */
function createVdfModelInfo(model) {
    if (typeof model === "object" && !("firstChild" in model)) {
        if (typeof model.schema !== "object") {
            throw new Error("The root object of the provided JSON does not contain a schema object.");
        }
        return {
            fields: createFieldsFromJson(model.schema.items.filter(function (i) { return !("pane" in i); })) || {},
        };
    }
    else {
        var modelEl = (0, vdf_xml_utils_1.getVdfModelElement)(model);
        var schemaEl = (0, xml_utils_1.getFirstChildElement)(modelEl, vdf_xml_utils_1.vizNs, "schema");
        if (!schemaEl) {
            throw new Error("The root model element of the provided XML does not contain a schema element.");
        }
        return { fields: createFields(schemaEl) || {} };
    }
}
exports.createVdfModelInfo = createVdfModelInfo;
exports.default = createVdfModelInfo;

},{"./vdf-name-utils":13,"./vdf-ts-types":19,"./vdf-xml-utils":21,"./xml-utils":23}],18:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVdfValueType = exports.lookupFieldCollectionItem = exports.isListType = void 0;
/**
 * Checks whether a VDF type defines a list
 * @param vdfType The VDF type to be checked
 * @returns `true` if it represents a list, otherwise `false`
 */
function isListType(vdfType) {
    return typeof vdfType === "object" && "columns" in vdfType;
}
exports.isListType = isListType;
/**
 * Performs a lookup in a {@link FieldCollection} and returns information about the returned field or `undefined` if not found
 * @param fieldCollection The field collection to search for field in
 * @param name            The name of the field to retrieve field-information for
 * @returns               The found field-information or `undefined` if not found
 */
/* eslint-disable-next-line no-use-before-define */ // Note: necessary due to circular dependency
function lookupFieldCollectionItem(fieldCollection, name) {
    var item = fieldCollection[name];
    return item ? item : undefined;
}
exports.lookupFieldCollectionItem = lookupFieldCollectionItem;
/**
 * Gets the {@link VdfValueType} of {@link VdfType} | `undefined`
 * @param vdfType The VDF type to check
 * @returns `vdfType` as{@link VdfValueType} or `undefined` if `vdfType` is not a `VdfValueType`
 */
function getVdfValueType(vdfType) {
    if (!vdfType) {
        return undefined;
    }
    if (typeof vdfType === "string") {
        return vdfType;
    }
    if ("xsdType" in vdfType) {
        return vdfType;
    }
    return undefined;
}
exports.getVdfValueType = getVdfValueType;

},{}],19:[function(require,module,exports){
"use strict";
/*  We need to ensure the values we allow into the local model are frozen,
    otherwise the data will get out of sync if an object is modified from the
    script without telling the model.
    The internal propertiesUpdater in the objects below is used to transmit a new
    object when directly modifying a property from the script through its setter, so that it is properly
    replaced in the scalarfield.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isXmlType = exports.VizMap = exports.Triplet = exports.Duplet = void 0;
/**
 * TypeScript representation of the media type `"application/vnd.vizrt.duplet"`.
 * Contains two read-only number fields: `x` and `y`.
 * Note that the `Duplet` object is immutable.
 */
var Duplet = /** @class */ (function () {
    /** Creates the duplet */
    function Duplet(x, y) {
        this.x = x;
        this.y = y;
    }
    return Duplet;
}());
exports.Duplet = Duplet;
/**
 * TypeScript representation of the media type `"application/vnd.vizrt.triplet"`.
 * Contains three read-only number fields: `x`, `y`, and `z`.
 * Note that the `Triplet` object is immutable.
 */
var Triplet = /** @class */ (function () {
    /** Creates the triplet */
    function Triplet(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    return Triplet;
}());
exports.Triplet = Triplet;
/**
 * TypeScript representation of the map type `"application/vnd.vizrt.curious.map"`.
 * Contains a read-only string that contains semicolon delimited data.
 * Note that the object is immutable.
 */
var VizMap = /** @class */ (function () {
    function VizMap(mapString) {
        this.mapString = mapString;
        Object.freeze(this);
    }
    return VizMap;
}());
exports.VizMap = VizMap;
/**
 * Gets whether a given media type represents XML so that the [ScalarField.value] returns an `Element`.
 * @param mediaType The media type of interest
 * @returns `true` if the media type represents XML, `false` if it is not XML, `undefined` if it is possibly XML
 */
function isXmlType(mediaType) {
    mediaType = mediaType.trim();
    var slashPos = mediaType.indexOf("/");
    if (slashPos < 0) {
        return false;
    }
    if (mediaType === "application/vnd.vizrt.richtext+xml") {
        return undefined;
    }
    var mainType = mediaType.substring(0, slashPos);
    if (mainType !== "text" && mainType !== "application") {
        return false;
    }
    var fullSubType = mediaType.substring(slashPos + 1);
    var subType = fullSubType.split(";")[0].trim();
    return subType === "xml" || subType.endsWith("+xml");
}
exports.isXmlType = isXmlType;

},{}],20:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListFieldPaths = exports.createPayloadDoc = void 0;
var vdf_xml_utils_1 = require("./vdf-xml-utils");
var xml_utils_1 = require("./xml-utils");
function createFields(fieldParentEl, fielddefParentEl) {
    var doc = fieldParentEl.ownerDocument;
    var iterator = (0, vdf_xml_utils_1.createVdfFieldIterator)(fielddefParentEl, true);
    var fielddefEl;
    while ((fielddefEl = iterator.next()) != null) {
        var vdfName = fielddefEl.getAttribute("name");
        if (!vdfName) {
            continue;
        }
        // Create field
        var fieldEl = doc.createElementNS(vdf_xml_utils_1.vizNs, "field");
        fieldEl.setAttribute("name", vdfName);
        // Apply default value or default list
        var defaultTag = fielddefEl.getAttribute("mediatype")
            ? "value"
            : (0, xml_utils_1.getFirstChildElement)(fielddefEl, vdf_xml_utils_1.vizNs, "listdef")
                ? "list"
                : undefined;
        if (defaultTag) {
            var defaultContent = (0, xml_utils_1.getFirstChildElement)(fielddefEl, vdf_xml_utils_1.vizNs, defaultTag);
            if (defaultContent) {
                fieldEl.appendChild(doc.importNode(defaultContent, true));
            }
        }
        // Create sub fields
        createFields(fieldEl, fielddefEl);
        // Append created field to parent field
        fieldParentEl.appendChild(fieldEl);
    }
}
/**
 * Creates a default VDF payload from a given VDF model. (The result contains all the fields (and subfields) of
 * the model, each containing the correct default value or list if it exists.
 * @param modelXml The model XML to create a payload from
 * @param modelUrl The URL to the VDF model or `undefined` to inline it
 * @returns        The created payload
 * @throws         Error if modelXml does not represent a VDF model or if the model is corrupt.
 */
function createPayloadDoc(modelXml, modelUrl) {
    var modelEl = (0, vdf_xml_utils_1.getVdfModelElement)(modelXml);
    var schemaEl = (0, xml_utils_1.getFirstChildElement)(modelEl, vdf_xml_utils_1.vizNs, "schema");
    if (!schemaEl) {
        throw new Error("The root model element of the provided XML does not contain a schema element.");
    }
    var payloadDoc = new DOMParser().parseFromString('<payload xmlns="http://www.vizrt.com/types"/>', "text/xml");
    var payloadEl = (0, xml_utils_1.getFirstChildElement)(payloadDoc, vdf_xml_utils_1.vizNs, "payload");
    if (modelUrl) {
        payloadEl.setAttribute("model", modelUrl);
    }
    else {
        payloadEl.appendChild(payloadDoc.importNode(modelEl, true));
    }
    createFields(payloadEl, schemaEl);
    return payloadDoc;
}
exports.createPayloadDoc = createPayloadDoc;
/**
 * Get all list field paths from a given path.
 *
 * @example
 * splitPath("element/#0/element");
 * // → ["element"]
 *
 * @example
 * splitPath("element/element/#1/element/element/#2/element");
 * // → ["element/element", "element/element/#1/element/element"]
 *
 * @param path The input path string
 * @returns An array of list field paths
 */
function getListFieldPaths(path) {
    var parts = path.split("/");
    var results = [];
    var current = [];
    for (var i = 0; i < parts.length; i++) {
        current.push(parts[i]);
        if (parts[i].startsWith("#")) {
            results.push(current.slice(0, -1).join("/"));
        }
    }
    return results;
}
exports.getListFieldPaths = getListFieldPaths;

},{"./vdf-xml-utils":21,"./xml-utils":23}],21:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVdfFieldAnnotation = exports.setVdfFieldAnnotation = exports.getVdfListFieldLength = exports.getVdfFieldValue = exports.setVdfFieldValue = exports.setVdfFieldValueAsText = exports.getVdfModelElement = exports.getFieldDefElement = exports.findVdfFieldElement = exports.createVdfFieldIterator = exports.annotationsNodeName = exports.vizNs = void 0;
var xml_utils_1 = require("./xml-utils");
exports.vizNs = "http://www.vizrt.com/types";
exports.annotationsNodeName = "annotation";
/**
 * Return the text contained in the text node children of a parent
 * element.
 */
function getTextContent(parent) {
    var result = "";
    var children = parent.childNodes;
    var i;
    for (i = 0; i < children.length; ++i) {
        var node = children.item(i);
        if (node.nodeType !== Node.TEXT_NODE) {
            continue;
        }
        result += node.nodeValue;
    }
    return result;
}
/**
 * Creates an iterator that runs over all the fields or field definitions under an `Element`
 * @param parentElement The `Element` containing the fields or field definitions to loop over
 * @param definition    * `true` to loop over `viz:fielddef` elements (field definitions in the VDF model)
 *                      * `false` to loop over `viz:field` elements (fields in the VDF payload)
 * @returns             The requested iterator
 */
function createVdfFieldIterator(parentElement, definition) {
    return new xml_utils_1.TypedElementIterator(new xml_utils_1.SingleElementIterator(parentElement), exports.vizNs, definition ? "fielddef" : "field");
}
exports.createVdfFieldIterator = createVdfFieldIterator;
/**
 * Finds a field `Element` under a parent `Element`
 * @param parentElement The `Element` under which to find the field
 * @param fieldName     The name of the field
 * @param definition    * `true` to search for a `viz:fielddef` (a field definition in the VDF model)
 *                      * `false` to search for a `viz:field` (a field in the VDF payload)
 * @returns             The `Element` representing the field or the field definition
 */
function findVdfFieldElement(parentElement, fieldName, definition) {
    if (definition === void 0) { definition = false; }
    var iterator = createVdfFieldIterator(parentElement || null, definition);
    var fieldEl;
    while ((fieldEl = iterator.next()) != null) {
        var curFieldName = fieldEl.getAttribute("name");
        if (fieldName === curFieldName) {
            return fieldEl;
        }
    }
    return undefined;
}
exports.findVdfFieldElement = findVdfFieldElement;
/**
 * Gets a fielddef `Element` for a given field `element` provided the scheme where it is stored
 * @param fieldElement  The field `Element`
 * @param schemeElement The root scheme `Element`
 * @returns             The fielddef `Element` that corresponds to the field `Element` or `undefined` if unavailable
 */
function getFieldDefElement(fieldElement, schemeElement) {
    var _a;
    if (!fieldElement || !schemeElement) {
        return undefined;
    }
    var vdfPath = [];
    var element = fieldElement;
    while ((element === null || element === void 0 ? void 0 : element.tagName) === "field") {
        vdfPath.unshift(element.getAttribute("name"));
        element = element.parentNode;
        if ((element === null || element === void 0 ? void 0 : element.tagName) === "payload" &&
            element.parentNode.tagName === "list" &&
            ((_a = element.parentNode.parentNode) === null || _a === void 0 ? void 0 : _a.tagName) === "field") {
            vdfPath.unshift("#");
            element = element.parentNode.parentNode;
        }
    }
    var defElement = schemeElement;
    for (var _i = 0, vdfPath_1 = vdfPath; _i < vdfPath_1.length; _i++) {
        var vdfName = vdfPath_1[_i];
        if (vdfName === "#") {
            defElement = (0, xml_utils_1.getInnerElement)(defElement, exports.vizNs, ["listdef", "schema"]);
        }
        else {
            defElement = findVdfFieldElement(defElement, vdfName, true);
        }
    }
    return defElement;
}
exports.getFieldDefElement = getFieldDefElement;
/**
 * Gets a model `Element` for the VDF model XML, either from a XML `Document` an XML document `string` or from an XML `Element`.
 * In the case of a `Document` or a string the model element is expected to be the root element.
 * @param modelXml The XML for the VDF model
 * @returns        The VDF model `Element`
 * @throws         `Error` if the passed in `Element` is not a VDF model element
 *                 or the root of the XML document (`Document` or `string`) is not a VDF model element
 *                 (A VDF model element is an XML element with the name `model` in the namespace `http://www.vizrt.com/types`.)
 */
function getVdfModelElement(modelXml) {
    var docOrModelEl = typeof modelXml === "string" ? new DOMParser().parseFromString(modelXml, "text/xml") : modelXml;
    var el = (0, xml_utils_1.getSelfOrRoot)(docOrModelEl, exports.vizNs, "model");
    if (!el) {
        throw new Error("The provided XML does not contain an outer model element.");
    }
    return el;
}
exports.getVdfModelElement = getVdfModelElement;
/**
 * Sets the content of a field
 * @param fieldElement   The field to have its content changed
 * @param valueChildNode The child node to put inside the value element of a field or `null` to clear the value
 */
function setFieldValueContent(fieldElement, valueChildNode) {
    // fieldElement MUST be a field element within a payload document (meaning it has a document)
    var oldValueEl = (0, xml_utils_1.getFirstChildElement)(fieldElement, exports.vizNs, "value");
    if (!oldValueEl && !valueChildNode) {
        return;
    }
    if (!valueChildNode) {
        if (oldValueEl) {
            fieldElement.removeChild(oldValueEl);
        }
    }
    else {
        var valueElement = fieldElement.ownerDocument.createElementNS(exports.vizNs, "value");
        valueElement.appendChild(valueChildNode);
        if (!oldValueEl) {
            fieldElement.appendChild(valueElement);
        }
        else {
            fieldElement.replaceChild(valueElement, oldValueEl);
        }
    }
}
/**
 * Sets the value of a VDF field to a text
 * @param fieldElement The `viz:field` element to have its value set
 * @param text         The text to assign to the field or `null`
 */
function setVdfFieldValueAsText(fieldElement, text) {
    // fieldElement MUST be a field element within a payload document (meaning it has a document)
    if (text == null) {
        setFieldValueContent(fieldElement, null);
    }
    else {
        setFieldValueContent(fieldElement, fieldElement.ownerDocument.createTextNode(text));
    }
}
exports.setVdfFieldValueAsText = setVdfFieldValueAsText;
/**
 * Sets the value of a field `Element` in a VDF payload document
 * @param fieldElement The field `Element` to have its value assigned
 * @param value        The new Value for the field
 * @param checkChange  `true` to try to check if value has changed. Optional defaults to `false`
 */
function setVdfFieldValue(fieldElement, value, checkChange) {
    var valueElement = (0, xml_utils_1.getFirstChildElement)(fieldElement, exports.vizNs, "value");
    if (value === null) {
        if (checkChange && !valueElement) {
            return false;
        }
        setVdfFieldValueAsText(fieldElement, null);
    }
    else if (typeof value === "string") {
        if (checkChange && valueElement && getTextContent(valueElement) === value) {
            return false;
        }
        setVdfFieldValueAsText(fieldElement, value);
    }
    else if (value.ownerDocument === fieldElement.ownerDocument && !value.parentNode) {
        setFieldValueContent(fieldElement, value);
    }
    else if (isListElement(fieldElement)) {
        var oldList = fieldElement.firstChild;
        if (oldList) {
            fieldElement.replaceChild(value, oldList);
        }
        else {
            fieldElement.appendChild(value);
        }
    }
    else {
        setFieldValueContent(fieldElement, fieldElement.ownerDocument.importNode(value, true));
    }
    return true;
}
exports.setVdfFieldValue = setVdfFieldValue;
function isListElement(fieldElement) {
    return Array.from(fieldElement.childNodes)
        .filter(function (node) { return node.nodeType === 1; })
        .some(function (child) { return child.localName === "list"; });
}
/**
 * Gets the value of a VDF field
 * @param fieldElement The element representing the field to get the value of
 * @returns            The value of the field or `null` if the field does no have a value
 */
function getVdfFieldValue(fieldElement) {
    var valueElement = (0, xml_utils_1.getFirstChildElement)(fieldElement, exports.vizNs, "value");
    if (valueElement) {
        var xmlElement = (0, xml_utils_1.getFirstChildElement)(valueElement, undefined, undefined);
        return xmlElement || getTextContent(valueElement);
    }
    else {
        return null;
    }
}
exports.getVdfFieldValue = getVdfFieldValue;
function getVdfListFieldLength(fieldElement) {
    var listEl = (0, xml_utils_1.getFirstChildElement)(fieldElement, exports.vizNs, "list");
    if (!listEl) {
        return undefined;
    }
    var iterator = new xml_utils_1.TypedElementIterator(new xml_utils_1.SingleElementIterator(listEl), exports.vizNs, "payload");
    var result = 0;
    while (iterator.next() != null) {
        ++result;
    }
    return result;
}
exports.getVdfListFieldLength = getVdfListFieldLength;
/**
 * Sets the annotation value for a given annotation type
 * @param fieldElement    The field `Element` to have its value assigned
 * @param annotationType  The type of annotation to be specified
 * @param annotationValue The new value for the annotation
 * @returns               `true` if the annotation value changed, otherwise `false`
 */
function setVdfFieldAnnotation(fieldElement, annotationType, annotationValue) {
    // fieldElement MUST be a field element within a payload document (meaning it has a document)
    var oldAnnotationEl = (0, xml_utils_1.getFirstChildElement)(fieldElement, exports.vizNs, exports.annotationsNodeName);
    if (!oldAnnotationEl && !annotationValue) {
        return false;
    }
    if (annotationValue === undefined && oldAnnotationEl) {
        var oldValue = oldAnnotationEl.getAttribute(annotationType) || "";
        if (!oldValue) {
            return false;
        }
        oldAnnotationEl.removeAttribute(annotationType);
        if (oldAnnotationEl.attributes.length === 0) {
            fieldElement.removeChild(oldAnnotationEl);
        }
        return true;
    }
    else if (!oldAnnotationEl) {
        var annotationEl = fieldElement.ownerDocument.createElementNS(exports.vizNs, exports.annotationsNodeName);
        annotationEl.setAttribute(annotationType, annotationValue || "");
        fieldElement.appendChild(annotationEl);
        return true;
    }
    else {
        var oldValue = oldAnnotationEl.getAttribute(annotationType) || "";
        if (oldValue === annotationValue) {
            return false;
        }
        oldAnnotationEl.setAttribute(annotationType, annotationValue || "");
        return true;
    }
}
exports.setVdfFieldAnnotation = setVdfFieldAnnotation;
/**
 * Gets a field annotation
 * @param fieldElement   The XML `Element` representing the field of interest
 * @param annotationType The type of the annotation to retrieve
 * @returns              The value of the annotation or `undefined` if annotation not specified on the field
 */
function getVdfFieldAnnotation(fieldElement, annotationType) {
    var annotationEl = (0, xml_utils_1.getFirstChildElement)(fieldElement, exports.vizNs, exports.annotationsNodeName);
    return (annotationEl === null || annotationEl === void 0 ? void 0 : annotationEl.getAttribute(annotationType)) || undefined;
}
exports.getVdfFieldAnnotation = getVdfFieldAnnotation;

},{"./xml-utils":23}],22:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayloadDoc = exports.setupXmlSupport = exports.VizMap = exports.Triplet = exports.Duplet = exports.createVdfModelInfo = exports.generateTsPayloadInterface = exports.generateTsModelInfo = exports.createRichText = exports.createControllableReactiveSupplier = void 0;
var reactive_supplier_1 = require("./reactive-supplier");
Object.defineProperty(exports, "createControllableReactiveSupplier", { enumerable: true, get: function () { return reactive_supplier_1.createControllableReactiveSupplier; } });
var vdf_rich_text_1 = require("./vdf-rich-text");
Object.defineProperty(exports, "createRichText", { enumerable: true, get: function () { return vdf_rich_text_1.createRichText; } });
var vdf_ts_generator_1 = require("./vdf-ts-generator");
Object.defineProperty(exports, "generateTsModelInfo", { enumerable: true, get: function () { return vdf_ts_generator_1.generateTsModelInfo; } });
Object.defineProperty(exports, "generateTsPayloadInterface", { enumerable: true, get: function () { return vdf_ts_generator_1.generateTsPayloadInterface; } });
var vdf_ts_model_info_builder_1 = require("./vdf-ts-model-info-builder");
Object.defineProperty(exports, "createVdfModelInfo", { enumerable: true, get: function () { return vdf_ts_model_info_builder_1.createVdfModelInfo; } });
var vdf_ts_types_1 = require("./vdf-ts-types");
Object.defineProperty(exports, "Duplet", { enumerable: true, get: function () { return vdf_ts_types_1.Duplet; } });
Object.defineProperty(exports, "Triplet", { enumerable: true, get: function () { return vdf_ts_types_1.Triplet; } });
Object.defineProperty(exports, "VizMap", { enumerable: true, get: function () { return vdf_ts_types_1.VizMap; } });
var xml_utils_1 = require("./xml-utils");
Object.defineProperty(exports, "setupXmlSupport", { enumerable: true, get: function () { return xml_utils_1.setupXmlSupport; } });
var vdf_utilities_1 = require("./vdf-utilities");
Object.defineProperty(exports, "createPayloadDoc", { enumerable: true, get: function () { return vdf_utilities_1.createPayloadDoc; } });

},{"./reactive-supplier":11,"./vdf-rich-text":15,"./vdf-ts-generator":16,"./vdf-ts-model-info-builder":17,"./vdf-ts-types":19,"./vdf-utilities":20,"./xml-utils":23}],23:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToMapConverter = exports.xmlUnescape = exports.fullXmlEscape = exports.xmlEscape = exports.setupXmlSupport = exports.getNamedDocumentElement = exports.getSelfOrRoot = exports.getTextContent = exports.getInnerElement = exports.getFirstChildElement = exports.TypedElementIterator = exports.SingleElementIterator = void 0;
var SingleElementIterator = /** @class */ (function () {
    function SingleElementIterator(el) {
        this.el = el;
    }
    SingleElementIterator.prototype.next = function () {
        var result = this.el;
        this.el = null;
        return result;
    };
    return SingleElementIterator;
}());
exports.SingleElementIterator = SingleElementIterator;
var TypedElementIterator = /** @class */ (function () {
    function TypedElementIterator(parentsIterator, nsUri, name) {
        this.parentsIterator = parentsIterator;
        this.nsUri = nsUri;
        this.name = name;
        this.parent = null;
        this.index = 0;
    }
    TypedElementIterator.prototype.next = function () {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (!this.parent || this.index === this.parent.childNodes.length) {
                this.parent = this.parentsIterator.next();
                if (!this.parent) {
                    return null;
                }
                continue;
            }
            var node = this.parent.childNodes.item(this.index++);
            if (node.nodeType !== Node.ELEMENT_NODE) {
                continue;
            }
            if (this.nsUri != null && this.nsUri !== node.namespaceURI) {
                continue;
            }
            if (this.name != null && this.name !== node.localName) {
                continue;
            }
            return node;
        }
    };
    return TypedElementIterator;
}());
exports.TypedElementIterator = TypedElementIterator;
/**
 * Gets the first child element of a parent element with a given namespace and name.
 * @param parent          The parent element to search within.
 * @param nsUri           The namespace URI to match.
 * @param name            The local name to match.
 * @param matchTagName    If true, the node tag name will be matched - otherwise the search will look at attribute 'name' (default: true).
 * @returns               The first matching child element, or undefined if not found.
 */
function getFirstChildElement(parent, nsUri, name, matchTagName) {
    if (matchTagName === void 0) { matchTagName = true; }
    if (!parent) {
        return undefined;
    }
    var children = parent.childNodes;
    var c = children.length;
    for (var i = 0; i !== c; ++i) {
        var node = children.item(i);
        if (node.nodeType !== Node.ELEMENT_NODE) {
            continue;
        }
        if (nsUri && nsUri !== node.namespaceURI) {
            continue;
        }
        if (matchTagName &&
            name &&
            name !== node.localName &&
            name !== node.getAttribute("name")) {
            continue;
        }
        if (!matchTagName && name && name !== node.getAttribute("name")) {
            continue;
        }
        return node;
    }
    return undefined;
}
exports.getFirstChildElement = getFirstChildElement;
/**
 * Gets an `Element` with a given path inside another `Element` (the parent element)
 * @param parent The parent `Element`
 * @param nsUri  The namespace URI for the elements in the path
 * @param path   The path of the tag names of the elements
 * @returns      The requested `Element` if found
 */
function getInnerElement(parent, nsUri, path) {
    var candidate = parent;
    for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
        var name_1 = path_1[_i];
        candidate = getFirstChildElement(candidate, nsUri, name_1);
    }
    return candidate;
}
exports.getInnerElement = getInnerElement;
/**
 * Gets the text content of an `Element`
 * @param element The element to get content of
 * @returns The contained text nodes concatenated
 */
function getTextContent(element) {
    var result = "";
    var children = element.childNodes;
    var i;
    for (i = 0; i < children.length; ++i) {
        var node = children.item(i);
        if (node.nodeType !== Node.TEXT_NODE) {
            continue;
        }
        result += node.nodeValue;
    }
    return result;
}
exports.getTextContent = getTextContent;
/**
 * Gets either the root element of an XML doc or the element that is passed in.
 * If an element is returned, it is guarantied to have the name and namespace passed in.
 * @param docOrEl   The document to get the root node from or the element itself
 * @param nsUri     The namespace of the element of interest
 * @param localName The name (without namespace) of the element of interest
 * @returns         Either the root element of the document or `docOrEl` or `undefined` if this element does not match
 *                  the name and namespace passed in in `nsUri` and `localName`
 */
function getSelfOrRoot(docOrEl, nsUri, localName) {
    if (docOrEl.nodeType === Node.ELEMENT_NODE) {
        var el = docOrEl;
        return el.namespaceURI === nsUri && el.localName === localName ? el : undefined;
    }
    else {
        return getFirstChildElement(docOrEl, nsUri, localName);
    }
}
exports.getSelfOrRoot = getSelfOrRoot;
/**
 * Gets the document element of an XML `Document` ensuring it has an expected name (and namespace)
 * @param doc       The XML document to get the document `Element` from
 * @param nsUri     The expected namespace for the document element (or `undefined` if namespace should not be considered)
 * @param localName The expected name of the document element
 * @returns         The root element of the document provided it has the expected name (and namespace)
 *                  or `undefined` otherwise
 */
function getNamedDocumentElement(doc, nsUri, localName) {
    var el = doc.documentElement;
    return (el === null || el === void 0 ? void 0 : el.localName) === localName && (!nsUri || nsUri === el.namespaceURI) ? el : undefined;
}
exports.getNamedDocumentElement = getNamedDocumentElement;
/**
 * Sets up the XML functionality needed by this library (to be used in environments where XML parsing/serializing is not available).
 * This function can be used with the @xmldom/xmldom package to make the vdfaccess library use the `DOMParser` and `XMLSerializer`
 * implemented by that package:
 * ```
 * import { DOMParser as XmldomDOMParser, XMLSerializer as XmldomXMLSerializer } from "@xmldom/xmldom"
 * setupXmlSupport(GLOBAL, XmldomDOMParser, XmldomXMLSerializer)
 * ```
 * Where `GLOBAL` is the environment where to define the "DOMParser" and "XMLSerializer" properties.
 * (In a node.js environment this would typically be `global as unknown as Record<string, unknown>`)
 * @param env           The environment where to inject the `DOMParser` and the `XMLSerializer` (required by this lib)
 * @param domParser     The `DOMParser` to be used by the vdfaccess library
 * @param xmlSerializer The `XMLSerializer` to be used by the vdfaccess library
 */
function setupXmlSupport(env, domParser, xmlSerializer) {
    env.DOMParser = domParser;
    env.XMLSerializer = xmlSerializer;
    env.Node = {
        ELEMENT_NODE: 1,
        TEXT_NODE: 3,
    };
}
exports.setupXmlSupport = setupXmlSupport;
/**
 * Escapes characters < > & from a string.
 * Note: Engine <= 4.4 does not unescape ' and " correctly in richtext. It should be fixed with VIZENG-25885 = VIZPL-1521 (marked has fixed for VizEngine-5.0.0)
 * @param unescaped the string to escape. Should not be already escaped
 * @returns the escaped string
 */
function xmlEscape(unescaped) {
    return (unescaped
        // ' and " are not always unescaped correctly afterwards (or are expected to be NOT escaped.) Since this is not compulsory in an xml text value, we keep them unescaped.
        // Even with VIZPL-1521 fix, we should keep them untouched here.
        // .replace(/'/g, '&apos;')
        // .replace(/"/g, "&quot;")
        .replace(/&/g, "&amp;")
        .replace(/>/g, "&gt;")
        .replace(/</g, "&lt;"));
}
exports.xmlEscape = xmlEscape;
/**
 * Escapes all special characters from a string. Used specifically for the stringToMapConverter
 * @param unescaped the string to escape. Should not be already escaped
 * @returns the escaped string
 */
function fullXmlEscape(unescaped) {
    return unescaped
        .replace(/'/g, "&apos;")
        .replace(/"/g, "&quot;")
        .replace(/&/g, "&amp;")
        .replace(/>/g, "&gt;")
        .replace(/</g, "&lt;");
}
exports.fullXmlEscape = fullXmlEscape;
/**
 * Un-escapes (already escaped) characters < > & " ' from a string
 * @param escaped the escaped string to un-escape
 * @returns the result string, with the restored characters
 */
function xmlUnescape(escaped) {
    return escaped
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&")
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'");
}
exports.xmlUnescape = xmlUnescape;
/**
 * A method that converts a string input that is in a specific format, to a string-string map
 * The string input format consists of comma delimited key-value pairs that are contained within square brackets as follows "[abc,qwe123],["b,nm","bnm"],[rty,"ghj"],["fds",cvb]"  "description &amp;ABCD&amp;", "ABCD""
 * @param stringMap a string input that is in an expected specific format
 * @returns a string-string key-value pair map
 */
function stringToMapConverter(stringMap) {
    stringMap = stringMap.replace(/[\r\n]/gm, "");
    stringMap = fullXmlEscape(stringMap);
    var map = new Map();
    if (typeof stringMap == "undefined") {
        return map;
    }
    var charCounter = 0;
    var startBracket = false;
    var endBracket = false;
    var currentData = "";
    var addCharacter = false;
    var checkQuotes = 0;
    stringMap = stringMap.startsWith('"') ? stringMap.substring(1, stringMap.length) : stringMap;
    stringMap = stringMap.endsWith('"') ? stringMap.substring(0, stringMap.length - 1) : stringMap;
    while (charCounter < stringMap.length) {
        // find the start bracket and end bracket
        addCharacter = true;
        if (stringMap.charAt(charCounter) === "[") {
            startBracket = true;
            addCharacter = false;
        }
        // find the ending bracket
        if (stringMap.charAt(charCounter) === "]") {
            addCharacter = false;
            endBracket = true;
        }
        if ((startBracket && endBracket && stringMap.charAt(charCounter) === ",") || charCounter === stringMap.length - 1) {
            if (checkQuotes % 2 == 1) {
                console.error("[ERROR] There are an odd number of quotation marks in this line:", currentData);
            }
            checkQuotes = 0;
            startBracket = false;
            endBracket = false;
            var valueCounter = 0;
            var startQuote = false;
            var endQuote = false;
            var hasSeparator = false;
            var isKey = true;
            var keyvalue = "";
            var quoteCounter = 0;
            var key = "";
            var hasBeenAdded = false;
            while (valueCounter < currentData.length) {
                if (currentData.charAt(valueCounter) === '"') {
                    quoteCounter++;
                }
                if (quoteCounter % 2 == 0) {
                    startQuote = true;
                    endQuote = true;
                    startQuote = true;
                    endQuote = true;
                }
                else {
                    startQuote = true;
                    endQuote = false;
                    startQuote = true;
                    endQuote = false;
                }
                if (quoteCounter == 0) {
                    startQuote = false;
                    endQuote = false;
                    startQuote = false;
                    endQuote = false;
                }
                if ((currentData.charAt(valueCounter) === "," && startQuote && endQuote) ||
                    (valueCounter === currentData.length - 1 && currentData.charAt(valueCounter) !== ",")) {
                    // value is ready for the scenario where the key/value is a string
                    if (valueCounter === currentData.length - 1) {
                        keyvalue += currentData.charAt(valueCounter);
                    }
                    hasSeparator = true;
                    if (isKey) {
                        key = xmlUnescape(keyvalue).trim();
                    }
                    else {
                        map.set(key, xmlUnescape(keyvalue).trim());
                        hasBeenAdded = true;
                    }
                    if (valueCounter === currentData.length - 1 && currentData.charAt(valueCounter) !== ",") {
                        if (!hasBeenAdded) {
                            console.warn("Key ".concat(key.slice(0, key.length - 1), " has no value. Adding empty value "));
                            map.set(key.slice(0, key.length - 1), "");
                        }
                    }
                    isKey = !isKey;
                    keyvalue = "";
                    startQuote = false;
                    endQuote = false;
                    quoteCounter = 0;
                }
                else if (currentData.charAt(valueCounter) === "," && !hasSeparator && !startQuote) {
                    // section is for when there are no quotation marks
                    if (valueCounter === currentData.length - 1) {
                        keyvalue += currentData.charAt(valueCounter);
                    }
                    hasSeparator = true;
                    if (isKey) {
                        key = xmlUnescape(keyvalue).trim();
                    }
                    else {
                        map.set(key, xmlUnescape(keyvalue).trim());
                        hasBeenAdded = true;
                    }
                    if (valueCounter === currentData.length - 1 && currentData.charAt(valueCounter) === ",") {
                        if (!hasBeenAdded) {
                            console.warn("Key ".concat(key.slice(0, key.length - 1), " has no value. Adding empty value "));
                            map.set(key.slice(0, key.length - 1), "");
                        }
                    }
                    isKey = !isKey;
                    keyvalue = "";
                    quoteCounter = 0;
                }
                else {
                    keyvalue += currentData.charAt(valueCounter);
                }
                valueCounter++;
            }
            currentData = "";
        }
        else {
            if (addCharacter) {
                currentData += stringMap.charAt(charCounter);
                if (stringMap.charAt(charCounter) === '"') {
                    checkQuotes++;
                }
            }
        }
        charCounter++;
    }
    return map;
}
exports.stringToMapConverter = stringToMapConverter;

},{}],24:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringifyXsdBoolean = exports.parseXsdBoolean = exports.stringifyXsdInteger = exports.parseXsdInteger = exports.stringifyXsdDecimal = exports.parseXsdDecimal = void 0;
/**
 * Converts an XSD decimal text to a number
 * @param num The decimal in a `string` representation
 * @returns The resulting number or `null` if the `string` is not an XSD decimal
 */
function parseXsdDecimal(num) {
    num = num.trim();
    if (num === "") {
        return null;
    }
    if (num === "INF") {
        return Infinity;
    }
    if (num === "-INF") {
        return -Infinity;
    }
    if (num === "NaN") {
        return NaN;
    }
    var result = Number(num);
    return isFinite(result) ? result : null;
}
exports.parseXsdDecimal = parseXsdDecimal;
/**
 * Converts a number to a `string` following the XSD decimal constraints
 * @param num The `number` to convert to `string`
 * @returns   The resulting XSD decimal `string`
 */
function stringifyXsdDecimal(num) {
    return isNaN(num) ? "NaN" : isFinite(num) ? num.toString() : num > 0 ? "INF" : "-INF";
}
exports.stringifyXsdDecimal = stringifyXsdDecimal;
/**
 * Converts an XSD integer text to a `number`
 * @param num The integer represented as a `string`
 * @returns The resulting number or `null` if the `string` is not an XSD integer
 */
function parseXsdInteger(num) {
    num = num.trim();
    if (num === "") {
        return null;
    }
    var isSigned = num.charAt(0) === "-";
    for (var i = isSigned ? 1 : 0; i !== num.length; ++i) {
        var ch = num.charAt(i);
        if (ch < "0" || ch > "9") {
            return null;
        }
    }
    return parseInt(num);
}
exports.parseXsdInteger = parseXsdInteger;
/**
 * Converts a `number` to a `string` following the XSD integer constraints
 * @param num The `number` to convert to `string`
 * @returns   The resulting XSD integer `string` or `null` if `num` is not finite (decimal numbers will be rounded)
 */
function stringifyXsdInteger(num) {
    return isFinite(num) ? stringifyXsdDecimal(Math.round(num)) : null;
}
exports.stringifyXsdInteger = stringifyXsdInteger;
/**
 * Converts an XSD boolean text to a `boolean`
 * @param num The integer represented as a `string`
 * @returns The resulting `boolean` or `null` if the `string` is not an XSD boolean
 */
function parseXsdBoolean(b) {
    b = b.trim().toLowerCase();
    return b === "true" ? true : b === "false" ? false : null;
}
exports.parseXsdBoolean = parseXsdBoolean;
/**
 * Converts a `boolean` to a `string` following the XSD boolean constraints
 * @param num The `boolean` to convert to `string`
 * @returns   The resulting XSD boolean `string`
 */
function stringifyXsdBoolean(b) {
    return b ? "true" : "false";
}
exports.stringifyXsdBoolean = stringifyXsdBoolean;

},{}],25:[function(require,module,exports){
'use strict'

/**
 * Ponyfill for `Array.prototype.find` which is only available in ES6 runtimes.
 *
 * Works with anything that has a `length` property and index access properties, including NodeList.
 *
 * @template {unknown} T
 * @param {Array<T> | ({length:number, [number]: T})} list
 * @param {function (item: T, index: number, list:Array<T> | ({length:number, [number]: T})):boolean} predicate
 * @param {Partial<Pick<ArrayConstructor['prototype'], 'find'>>?} ac `Array.prototype` by default,
 * 				allows injecting a custom implementation in tests
 * @returns {T | undefined}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find
 * @see https://tc39.es/ecma262/multipage/indexed-collections.html#sec-array.prototype.find
 */
function find(list, predicate, ac) {
	if (ac === undefined) {
		ac = Array.prototype;
	}
	if (list && typeof ac.find === 'function') {
		return ac.find.call(list, predicate);
	}
	for (var i = 0; i < list.length; i++) {
		if (Object.prototype.hasOwnProperty.call(list, i)) {
			var item = list[i];
			if (predicate.call(undefined, item, i, list)) {
				return item;
			}
		}
	}
}

/**
 * "Shallow freezes" an object to render it immutable.
 * Uses `Object.freeze` if available,
 * otherwise the immutability is only in the type.
 *
 * Is used to create "enum like" objects.
 *
 * @template T
 * @param {T} object the object to freeze
 * @param {Pick<ObjectConstructor, 'freeze'> = Object} oc `Object` by default,
 * 				allows to inject custom object constructor for tests
 * @returns {Readonly<T>}
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
 */
function freeze(object, oc) {
	if (oc === undefined) {
		oc = Object
	}
	return oc && typeof oc.freeze === 'function' ? oc.freeze(object) : object
}

/**
 * Since we can not rely on `Object.assign` we provide a simplified version
 * that is sufficient for our needs.
 *
 * @param {Object} target
 * @param {Object | null | undefined} source
 *
 * @returns {Object} target
 * @throws TypeError if target is not an object
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
 * @see https://tc39.es/ecma262/multipage/fundamental-objects.html#sec-object.assign
 */
function assign(target, source) {
	if (target === null || typeof target !== 'object') {
		throw new TypeError('target is not an object')
	}
	for (var key in source) {
		if (Object.prototype.hasOwnProperty.call(source, key)) {
			target[key] = source[key]
		}
	}
	return target
}

/**
 * All mime types that are allowed as input to `DOMParser.parseFromString`
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString#Argument02 MDN
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#domparsersupportedtype WHATWG HTML Spec
 * @see DOMParser.prototype.parseFromString
 */
var MIME_TYPE = freeze({
	/**
	 * `text/html`, the only mime type that triggers treating an XML document as HTML.
	 *
	 * @see DOMParser.SupportedType.isHTML
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring WHATWG HTML Spec
	 */
	HTML: 'text/html',

	/**
	 * Helper method to check a mime type if it indicates an HTML document
	 *
	 * @param {string} [value]
	 * @returns {boolean}
	 *
	 * @see https://www.iana.org/assignments/media-types/text/html IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/HTML Wikipedia
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser/parseFromString MDN
	 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-domparser-parsefromstring 	 */
	isHTML: function (value) {
		return value === MIME_TYPE.HTML
	},

	/**
	 * `application/xml`, the standard mime type for XML documents.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xml IANA MimeType registration
	 * @see https://tools.ietf.org/html/rfc7303#section-9.1 RFC 7303
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_APPLICATION: 'application/xml',

	/**
	 * `text/html`, an alias for `application/xml`.
	 *
	 * @see https://tools.ietf.org/html/rfc7303#section-9.2 RFC 7303
	 * @see https://www.iana.org/assignments/media-types/text/xml IANA MimeType registration
	 * @see https://en.wikipedia.org/wiki/XML_and_MIME Wikipedia
	 */
	XML_TEXT: 'text/xml',

	/**
	 * `application/xhtml+xml`, indicates an XML document that has the default HTML namespace,
	 * but is parsed as an XML document.
	 *
	 * @see https://www.iana.org/assignments/media-types/application/xhtml+xml IANA MimeType registration
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument WHATWG DOM Spec
	 * @see https://en.wikipedia.org/wiki/XHTML Wikipedia
	 */
	XML_XHTML_APPLICATION: 'application/xhtml+xml',

	/**
	 * `image/svg+xml`,
	 *
	 * @see https://www.iana.org/assignments/media-types/image/svg+xml IANA MimeType registration
	 * @see https://www.w3.org/TR/SVG11/ W3C SVG 1.1
	 * @see https://en.wikipedia.org/wiki/Scalable_Vector_Graphics Wikipedia
	 */
	XML_SVG_IMAGE: 'image/svg+xml',
})

/**
 * Namespaces that are used in this code base.
 *
 * @see http://www.w3.org/TR/REC-xml-names
 */
var NAMESPACE = freeze({
	/**
	 * The XHTML namespace.
	 *
	 * @see http://www.w3.org/1999/xhtml
	 */
	HTML: 'http://www.w3.org/1999/xhtml',

	/**
	 * Checks if `uri` equals `NAMESPACE.HTML`.
	 *
	 * @param {string} [uri]
	 *
	 * @see NAMESPACE.HTML
	 */
	isHTML: function (uri) {
		return uri === NAMESPACE.HTML
	},

	/**
	 * The SVG namespace.
	 *
	 * @see http://www.w3.org/2000/svg
	 */
	SVG: 'http://www.w3.org/2000/svg',

	/**
	 * The `xml:` namespace.
	 *
	 * @see http://www.w3.org/XML/1998/namespace
	 */
	XML: 'http://www.w3.org/XML/1998/namespace',

	/**
	 * The `xmlns:` namespace
	 *
	 * @see https://www.w3.org/2000/xmlns/
	 */
	XMLNS: 'http://www.w3.org/2000/xmlns/',
})

exports.assign = assign;
exports.find = find;
exports.freeze = freeze;
exports.MIME_TYPE = MIME_TYPE;
exports.NAMESPACE = NAMESPACE;

},{}],26:[function(require,module,exports){
var conventions = require("./conventions");
var dom = require('./dom')
var entities = require('./entities');
var sax = require('./sax');

var DOMImplementation = dom.DOMImplementation;

var NAMESPACE = conventions.NAMESPACE;

var ParseError = sax.ParseError;
var XMLReader = sax.XMLReader;

/**
 * Normalizes line ending according to https://www.w3.org/TR/xml11/#sec-line-ends:
 *
 * > XML parsed entities are often stored in computer files which,
 * > for editing convenience, are organized into lines.
 * > These lines are typically separated by some combination
 * > of the characters CARRIAGE RETURN (#xD) and LINE FEED (#xA).
 * >
 * > To simplify the tasks of applications, the XML processor must behave
 * > as if it normalized all line breaks in external parsed entities (including the document entity)
 * > on input, before parsing, by translating all of the following to a single #xA character:
 * >
 * > 1. the two-character sequence #xD #xA
 * > 2. the two-character sequence #xD #x85
 * > 3. the single character #x85
 * > 4. the single character #x2028
 * > 5. any #xD character that is not immediately followed by #xA or #x85.
 *
 * @param {string} input
 * @returns {string}
 */
function normalizeLineEndings(input) {
	return input
		.replace(/\r[\n\u0085]/g, '\n')
		.replace(/[\r\u0085\u2028]/g, '\n')
}

/**
 * @typedef Locator
 * @property {number} [columnNumber]
 * @property {number} [lineNumber]
 */

/**
 * @typedef DOMParserOptions
 * @property {DOMHandler} [domBuilder]
 * @property {Function} [errorHandler]
 * @property {(string) => string} [normalizeLineEndings] used to replace line endings before parsing
 * 						defaults to `normalizeLineEndings`
 * @property {Locator} [locator]
 * @property {Record<string, string>} [xmlns]
 *
 * @see normalizeLineEndings
 */

/**
 * The DOMParser interface provides the ability to parse XML or HTML source code
 * from a string into a DOM `Document`.
 *
 * _xmldom is different from the spec in that it allows an `options` parameter,
 * to override the default behavior._
 *
 * @param {DOMParserOptions} [options]
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMParser
 * @see https://html.spec.whatwg.org/multipage/dynamic-markup-insertion.html#dom-parsing-and-serialization
 */
function DOMParser(options){
	this.options = options ||{locator:{}};
}

DOMParser.prototype.parseFromString = function(source,mimeType){
	var options = this.options;
	var sax =  new XMLReader();
	var domBuilder = options.domBuilder || new DOMHandler();//contentHandler and LexicalHandler
	var errorHandler = options.errorHandler;
	var locator = options.locator;
	var defaultNSMap = options.xmlns||{};
	var isHTML = /\/x?html?$/.test(mimeType);//mimeType.toLowerCase().indexOf('html') > -1;
  	var entityMap = isHTML ? entities.HTML_ENTITIES : entities.XML_ENTITIES;
	if(locator){
		domBuilder.setDocumentLocator(locator)
	}

	sax.errorHandler = buildErrorHandler(errorHandler,domBuilder,locator);
	sax.domBuilder = options.domBuilder || domBuilder;
	if(isHTML){
		defaultNSMap[''] = NAMESPACE.HTML;
	}
	defaultNSMap.xml = defaultNSMap.xml || NAMESPACE.XML;
	var normalize = options.normalizeLineEndings || normalizeLineEndings;
	if (source && typeof source === 'string') {
		sax.parse(
			normalize(source),
			defaultNSMap,
			entityMap
		)
	} else {
		sax.errorHandler.error('invalid doc source')
	}
	return domBuilder.doc;
}
function buildErrorHandler(errorImpl,domBuilder,locator){
	if(!errorImpl){
		if(domBuilder instanceof DOMHandler){
			return domBuilder;
		}
		errorImpl = domBuilder ;
	}
	var errorHandler = {}
	var isCallback = errorImpl instanceof Function;
	locator = locator||{}
	function build(key){
		var fn = errorImpl[key];
		if(!fn && isCallback){
			fn = errorImpl.length == 2?function(msg){errorImpl(key,msg)}:errorImpl;
		}
		errorHandler[key] = fn && function(msg){
			fn('[xmldom '+key+']\t'+msg+_locator(locator));
		}||function(){};
	}
	build('warning');
	build('error');
	build('fatalError');
	return errorHandler;
}

//console.log('#\n\n\n\n\n\n\n####')
/**
 * +ContentHandler+ErrorHandler
 * +LexicalHandler+EntityResolver2
 * -DeclHandler-DTDHandler
 *
 * DefaultHandler:EntityResolver, DTDHandler, ContentHandler, ErrorHandler
 * DefaultHandler2:DefaultHandler,LexicalHandler, DeclHandler, EntityResolver2
 * @link http://www.saxproject.org/apidoc/org/xml/sax/helpers/DefaultHandler.html
 */
function DOMHandler() {
    this.cdata = false;
}
function position(locator,node){
	node.lineNumber = locator.lineNumber;
	node.columnNumber = locator.columnNumber;
}
/**
 * @see org.xml.sax.ContentHandler#startDocument
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ContentHandler.html
 */
DOMHandler.prototype = {
	startDocument : function() {
    	this.doc = new DOMImplementation().createDocument(null, null, null);
    	if (this.locator) {
        	this.doc.documentURI = this.locator.systemId;
    	}
	},
	startElement:function(namespaceURI, localName, qName, attrs) {
		var doc = this.doc;
	    var el = doc.createElementNS(namespaceURI, qName||localName);
	    var len = attrs.length;
	    appendElement(this, el);
	    this.currentElement = el;

		this.locator && position(this.locator,el)
	    for (var i = 0 ; i < len; i++) {
	        var namespaceURI = attrs.getURI(i);
	        var value = attrs.getValue(i);
	        var qName = attrs.getQName(i);
			var attr = doc.createAttributeNS(namespaceURI, qName);
			this.locator &&position(attrs.getLocator(i),attr);
			attr.value = attr.nodeValue = value;
			el.setAttributeNode(attr)
	    }
	},
	endElement:function(namespaceURI, localName, qName) {
		var current = this.currentElement
		var tagName = current.tagName;
		this.currentElement = current.parentNode;
	},
	startPrefixMapping:function(prefix, uri) {
	},
	endPrefixMapping:function(prefix) {
	},
	processingInstruction:function(target, data) {
	    var ins = this.doc.createProcessingInstruction(target, data);
	    this.locator && position(this.locator,ins)
	    appendElement(this, ins);
	},
	ignorableWhitespace:function(ch, start, length) {
	},
	characters:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
		//console.log(chars)
		if(chars){
			if (this.cdata) {
				var charNode = this.doc.createCDATASection(chars);
			} else {
				var charNode = this.doc.createTextNode(chars);
			}
			if(this.currentElement){
				this.currentElement.appendChild(charNode);
			}else if(/^\s*$/.test(chars)){
				this.doc.appendChild(charNode);
				//process xml
			}
			this.locator && position(this.locator,charNode)
		}
	},
	skippedEntity:function(name) {
	},
	endDocument:function() {
		this.doc.normalize();
	},
	setDocumentLocator:function (locator) {
	    if(this.locator = locator){// && !('lineNumber' in locator)){
	    	locator.lineNumber = 0;
	    }
	},
	//LexicalHandler
	comment:function(chars, start, length) {
		chars = _toString.apply(this,arguments)
	    var comm = this.doc.createComment(chars);
	    this.locator && position(this.locator,comm)
	    appendElement(this, comm);
	},

	startCDATA:function() {
	    //used in characters() methods
	    this.cdata = true;
	},
	endCDATA:function() {
	    this.cdata = false;
	},

	startDTD:function(name, publicId, systemId) {
		var impl = this.doc.implementation;
	    if (impl && impl.createDocumentType) {
	        var dt = impl.createDocumentType(name, publicId, systemId);
	        this.locator && position(this.locator,dt)
	        appendElement(this, dt);
					this.doc.doctype = dt;
	    }
	},
	/**
	 * @see org.xml.sax.ErrorHandler
	 * @link http://www.saxproject.org/apidoc/org/xml/sax/ErrorHandler.html
	 */
	warning:function(error) {
		console.warn('[xmldom warning]\t'+error,_locator(this.locator));
	},
	error:function(error) {
		console.error('[xmldom error]\t'+error,_locator(this.locator));
	},
	fatalError:function(error) {
		throw new ParseError(error, this.locator);
	}
}
function _locator(l){
	if(l){
		return '\n@'+(l.systemId ||'')+'#[line:'+l.lineNumber+',col:'+l.columnNumber+']'
	}
}
function _toString(chars,start,length){
	if(typeof chars == 'string'){
		return chars.substr(start,length)
	}else{//java sax connect width xmldom on rhino(what about: "? && !(chars instanceof String)")
		if(chars.length >= start+length || start){
			return new java.lang.String(chars,start,length)+'';
		}
		return chars;
	}
}

/*
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/LexicalHandler.html
 * used method of org.xml.sax.ext.LexicalHandler:
 *  #comment(chars, start, length)
 *  #startCDATA()
 *  #endCDATA()
 *  #startDTD(name, publicId, systemId)
 *
 *
 * IGNORED method of org.xml.sax.ext.LexicalHandler:
 *  #endDTD()
 *  #startEntity(name)
 *  #endEntity(name)
 *
 *
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/DeclHandler.html
 * IGNORED method of org.xml.sax.ext.DeclHandler
 * 	#attributeDecl(eName, aName, type, mode, value)
 *  #elementDecl(name, model)
 *  #externalEntityDecl(name, publicId, systemId)
 *  #internalEntityDecl(name, value)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/ext/EntityResolver2.html
 * IGNORED method of org.xml.sax.EntityResolver2
 *  #resolveEntity(String name,String publicId,String baseURI,String systemId)
 *  #resolveEntity(publicId, systemId)
 *  #getExternalSubset(name, baseURI)
 * @link http://www.saxproject.org/apidoc/org/xml/sax/DTDHandler.html
 * IGNORED method of org.xml.sax.DTDHandler
 *  #notationDecl(name, publicId, systemId) {};
 *  #unparsedEntityDecl(name, publicId, systemId, notationName) {};
 */
"endDTD,startEntity,endEntity,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,resolveEntity,getExternalSubset,notationDecl,unparsedEntityDecl".replace(/\w+/g,function(key){
	DOMHandler.prototype[key] = function(){return null}
})

/* Private static helpers treated below as private instance methods, so don't need to add these to the public API; we might use a Relator to also get rid of non-standard public properties */
function appendElement (hander,node) {
    if (!hander.currentElement) {
        hander.doc.appendChild(node);
    } else {
        hander.currentElement.appendChild(node);
    }
}//appendChild and setAttributeNS are preformance key

exports.__DOMHandler = DOMHandler;
exports.normalizeLineEndings = normalizeLineEndings;
exports.DOMParser = DOMParser;

},{"./conventions":25,"./dom":27,"./entities":28,"./sax":30}],27:[function(require,module,exports){
var conventions = require("./conventions");

var find = conventions.find;
var NAMESPACE = conventions.NAMESPACE;

/**
 * A prerequisite for `[].filter`, to drop elements that are empty
 * @param {string} input
 * @returns {boolean}
 */
function notEmptyString (input) {
	return input !== ''
}
/**
 * @see https://infra.spec.whatwg.org/#split-on-ascii-whitespace
 * @see https://infra.spec.whatwg.org/#ascii-whitespace
 *
 * @param {string} input
 * @returns {string[]} (can be empty)
 */
function splitOnASCIIWhitespace(input) {
	// U+0009 TAB, U+000A LF, U+000C FF, U+000D CR, U+0020 SPACE
	return input ? input.split(/[\t\n\f\r ]+/).filter(notEmptyString) : []
}

/**
 * Adds element as a key to current if it is not already present.
 *
 * @param {Record<string, boolean | undefined>} current
 * @param {string} element
 * @returns {Record<string, boolean | undefined>}
 */
function orderedSetReducer (current, element) {
	if (!current.hasOwnProperty(element)) {
		current[element] = true;
	}
	return current;
}

/**
 * @see https://infra.spec.whatwg.org/#ordered-set
 * @param {string} input
 * @returns {string[]}
 */
function toOrderedSet(input) {
	if (!input) return [];
	var list = splitOnASCIIWhitespace(input);
	return Object.keys(list.reduce(orderedSetReducer, {}))
}

/**
 * Uses `list.indexOf` to implement something like `Array.prototype.includes`,
 * which we can not rely on being available.
 *
 * @param {any[]} list
 * @returns {function(any): boolean}
 */
function arrayIncludes (list) {
	return function(element) {
		return list && list.indexOf(element) !== -1;
	}
}

function copy(src,dest){
	for(var p in src){
		if (Object.prototype.hasOwnProperty.call(src, p)) {
			dest[p] = src[p];
		}
	}
}

/**
^\w+\.prototype\.([_\w]+)\s*=\s*((?:.*\{\s*?[\r\n][\s\S]*?^})|\S.*?(?=[;\r\n]));?
^\w+\.prototype\.([_\w]+)\s*=\s*(\S.*?(?=[;\r\n]));?
 */
function _extends(Class,Super){
	var pt = Class.prototype;
	if(!(pt instanceof Super)){
		function t(){};
		t.prototype = Super.prototype;
		t = new t();
		copy(pt,t);
		Class.prototype = pt = t;
	}
	if(pt.constructor != Class){
		if(typeof Class != 'function'){
			console.error("unknown Class:"+Class)
		}
		pt.constructor = Class
	}
}

// Node Types
var NodeType = {}
var ELEMENT_NODE                = NodeType.ELEMENT_NODE                = 1;
var ATTRIBUTE_NODE              = NodeType.ATTRIBUTE_NODE              = 2;
var TEXT_NODE                   = NodeType.TEXT_NODE                   = 3;
var CDATA_SECTION_NODE          = NodeType.CDATA_SECTION_NODE          = 4;
var ENTITY_REFERENCE_NODE       = NodeType.ENTITY_REFERENCE_NODE       = 5;
var ENTITY_NODE                 = NodeType.ENTITY_NODE                 = 6;
var PROCESSING_INSTRUCTION_NODE = NodeType.PROCESSING_INSTRUCTION_NODE = 7;
var COMMENT_NODE                = NodeType.COMMENT_NODE                = 8;
var DOCUMENT_NODE               = NodeType.DOCUMENT_NODE               = 9;
var DOCUMENT_TYPE_NODE          = NodeType.DOCUMENT_TYPE_NODE          = 10;
var DOCUMENT_FRAGMENT_NODE      = NodeType.DOCUMENT_FRAGMENT_NODE      = 11;
var NOTATION_NODE               = NodeType.NOTATION_NODE               = 12;

// ExceptionCode
var ExceptionCode = {}
var ExceptionMessage = {};
var INDEX_SIZE_ERR              = ExceptionCode.INDEX_SIZE_ERR              = ((ExceptionMessage[1]="Index size error"),1);
var DOMSTRING_SIZE_ERR          = ExceptionCode.DOMSTRING_SIZE_ERR          = ((ExceptionMessage[2]="DOMString size error"),2);
var HIERARCHY_REQUEST_ERR       = ExceptionCode.HIERARCHY_REQUEST_ERR       = ((ExceptionMessage[3]="Hierarchy request error"),3);
var WRONG_DOCUMENT_ERR          = ExceptionCode.WRONG_DOCUMENT_ERR          = ((ExceptionMessage[4]="Wrong document"),4);
var INVALID_CHARACTER_ERR       = ExceptionCode.INVALID_CHARACTER_ERR       = ((ExceptionMessage[5]="Invalid character"),5);
var NO_DATA_ALLOWED_ERR         = ExceptionCode.NO_DATA_ALLOWED_ERR         = ((ExceptionMessage[6]="No data allowed"),6);
var NO_MODIFICATION_ALLOWED_ERR = ExceptionCode.NO_MODIFICATION_ALLOWED_ERR = ((ExceptionMessage[7]="No modification allowed"),7);
var NOT_FOUND_ERR               = ExceptionCode.NOT_FOUND_ERR               = ((ExceptionMessage[8]="Not found"),8);
var NOT_SUPPORTED_ERR           = ExceptionCode.NOT_SUPPORTED_ERR           = ((ExceptionMessage[9]="Not supported"),9);
var INUSE_ATTRIBUTE_ERR         = ExceptionCode.INUSE_ATTRIBUTE_ERR         = ((ExceptionMessage[10]="Attribute in use"),10);
//level2
var INVALID_STATE_ERR        	= ExceptionCode.INVALID_STATE_ERR        	= ((ExceptionMessage[11]="Invalid state"),11);
var SYNTAX_ERR               	= ExceptionCode.SYNTAX_ERR               	= ((ExceptionMessage[12]="Syntax error"),12);
var INVALID_MODIFICATION_ERR 	= ExceptionCode.INVALID_MODIFICATION_ERR 	= ((ExceptionMessage[13]="Invalid modification"),13);
var NAMESPACE_ERR            	= ExceptionCode.NAMESPACE_ERR           	= ((ExceptionMessage[14]="Invalid namespace"),14);
var INVALID_ACCESS_ERR       	= ExceptionCode.INVALID_ACCESS_ERR      	= ((ExceptionMessage[15]="Invalid access"),15);

/**
 * DOM Level 2
 * Object DOMException
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/ecma-script-binding.html
 * @see http://www.w3.org/TR/REC-DOM-Level-1/ecma-script-language-binding.html
 */
function DOMException(code, message) {
	if(message instanceof Error){
		var error = message;
	}else{
		error = this;
		Error.call(this, ExceptionMessage[code]);
		this.message = ExceptionMessage[code];
		if(Error.captureStackTrace) Error.captureStackTrace(this, DOMException);
	}
	error.code = code;
	if(message) this.message = this.message + ": " + message;
	return error;
};
DOMException.prototype = Error.prototype;
copy(ExceptionCode,DOMException)

/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-536297177
 * The NodeList interface provides the abstraction of an ordered collection of nodes, without defining or constraining how this collection is implemented. NodeList objects in the DOM are live.
 * The items in the NodeList are accessible via an integral index, starting from 0.
 */
function NodeList() {
};
NodeList.prototype = {
	/**
	 * The number of nodes in the list. The range of valid child node indices is 0 to length-1 inclusive.
	 * @standard level1
	 */
	length:0,
	/**
	 * Returns the indexth item in the collection. If index is greater than or equal to the number of nodes in the list, this returns null.
	 * @standard level1
	 * @param index  unsigned long
	 *   Index into the collection.
	 * @return Node
	 * 	The node at the indexth position in the NodeList, or null if that is not a valid index.
	 */
	item: function(index) {
		return index >= 0 && index < this.length ? this[index] : null;
	},
	toString:function(isHTML,nodeFilter){
		for(var buf = [], i = 0;i<this.length;i++){
			serializeToString(this[i],buf,isHTML,nodeFilter);
		}
		return buf.join('');
	},
	/**
	 * @private
	 * @param {function (Node):boolean} predicate
	 * @returns {Node[]}
	 */
	filter: function (predicate) {
		return Array.prototype.filter.call(this, predicate);
	},
	/**
	 * @private
	 * @param {Node} item
	 * @returns {number}
	 */
	indexOf: function (item) {
		return Array.prototype.indexOf.call(this, item);
	},
};

function LiveNodeList(node,refresh){
	this._node = node;
	this._refresh = refresh
	_updateLiveList(this);
}
function _updateLiveList(list){
	var inc = list._node._inc || list._node.ownerDocument._inc;
	if (list._inc !== inc) {
		var ls = list._refresh(list._node);
		__set__(list,'length',ls.length);
		if (!list.$$length || ls.length < list.$$length) {
			for (var i = ls.length; i in list; i++) {
				if (Object.prototype.hasOwnProperty.call(list, i)) {
					delete list[i];
				}
			}
		}
		copy(ls,list);
		list._inc = inc;
	}
}
LiveNodeList.prototype.item = function(i){
	_updateLiveList(this);
	return this[i] || null;
}

_extends(LiveNodeList,NodeList);

/**
 * Objects implementing the NamedNodeMap interface are used
 * to represent collections of nodes that can be accessed by name.
 * Note that NamedNodeMap does not inherit from NodeList;
 * NamedNodeMaps are not maintained in any particular order.
 * Objects contained in an object implementing NamedNodeMap may also be accessed by an ordinal index,
 * but this is simply to allow convenient enumeration of the contents of a NamedNodeMap,
 * and does not imply that the DOM specifies an order to these Nodes.
 * NamedNodeMap objects in the DOM are live.
 * used for attributes or DocumentType entities
 */
function NamedNodeMap() {
};

function _findNodeIndex(list,node){
	var i = list.length;
	while(i--){
		if(list[i] === node){return i}
	}
}

function _addNamedNode(el,list,newAttr,oldAttr){
	if(oldAttr){
		list[_findNodeIndex(list,oldAttr)] = newAttr;
	}else{
		list[list.length++] = newAttr;
	}
	if(el){
		newAttr.ownerElement = el;
		var doc = el.ownerDocument;
		if(doc){
			oldAttr && _onRemoveAttribute(doc,el,oldAttr);
			_onAddAttribute(doc,el,newAttr);
		}
	}
}
function _removeNamedNode(el,list,attr){
	//console.log('remove attr:'+attr)
	var i = _findNodeIndex(list,attr);
	if(i>=0){
		var lastIndex = list.length-1
		while(i<lastIndex){
			list[i] = list[++i]
		}
		list.length = lastIndex;
		if(el){
			var doc = el.ownerDocument;
			if(doc){
				_onRemoveAttribute(doc,el,attr);
				attr.ownerElement = null;
			}
		}
	}else{
		throw new DOMException(NOT_FOUND_ERR,new Error(el.tagName+'@'+attr))
	}
}
NamedNodeMap.prototype = {
	length:0,
	item:NodeList.prototype.item,
	getNamedItem: function(key) {
//		if(key.indexOf(':')>0 || key == 'xmlns'){
//			return null;
//		}
		//console.log()
		var i = this.length;
		while(i--){
			var attr = this[i];
			//console.log(attr.nodeName,key)
			if(attr.nodeName == key){
				return attr;
			}
		}
	},
	setNamedItem: function(attr) {
		var el = attr.ownerElement;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		var oldAttr = this.getNamedItem(attr.nodeName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},
	/* returns Node */
	setNamedItemNS: function(attr) {// raises: WRONG_DOCUMENT_ERR,NO_MODIFICATION_ALLOWED_ERR,INUSE_ATTRIBUTE_ERR
		var el = attr.ownerElement, oldAttr;
		if(el && el!=this._ownerElement){
			throw new DOMException(INUSE_ATTRIBUTE_ERR);
		}
		oldAttr = this.getNamedItemNS(attr.namespaceURI,attr.localName);
		_addNamedNode(this._ownerElement,this,attr,oldAttr);
		return oldAttr;
	},

	/* returns Node */
	removeNamedItem: function(key) {
		var attr = this.getNamedItem(key);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;


	},// raises: NOT_FOUND_ERR,NO_MODIFICATION_ALLOWED_ERR

	//for level2
	removeNamedItemNS:function(namespaceURI,localName){
		var attr = this.getNamedItemNS(namespaceURI,localName);
		_removeNamedNode(this._ownerElement,this,attr);
		return attr;
	},
	getNamedItemNS: function(namespaceURI, localName) {
		var i = this.length;
		while(i--){
			var node = this[i];
			if(node.localName == localName && node.namespaceURI == namespaceURI){
				return node;
			}
		}
		return null;
	}
};

/**
 * The DOMImplementation interface represents an object providing methods
 * which are not dependent on any particular document.
 * Such an object is returned by the `Document.implementation` property.
 *
 * __The individual methods describe the differences compared to the specs.__
 *
 * @constructor
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation MDN
 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-102161490 DOM Level 1 Core (Initial)
 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#ID-102161490 DOM Level 2 Core
 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-102161490 DOM Level 3 Core
 * @see https://dom.spec.whatwg.org/#domimplementation DOM Living Standard
 */
function DOMImplementation() {
}

DOMImplementation.prototype = {
	/**
	 * The DOMImplementation.hasFeature() method returns a Boolean flag indicating if a given feature is supported.
	 * The different implementations fairly diverged in what kind of features were reported.
	 * The latest version of the spec settled to force this method to always return true, where the functionality was accurate and in use.
	 *
	 * @deprecated It is deprecated and modern browsers return true in all cases.
	 *
	 * @param {string} feature
	 * @param {string} [version]
	 * @returns {boolean} always true
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/hasFeature MDN
	 * @see https://www.w3.org/TR/REC-DOM-Level-1/level-one-core.html#ID-5CED94D7 DOM Level 1 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-hasfeature DOM Living Standard
	 */
	hasFeature: function(feature, version) {
			return true;
	},
	/**
	 * Creates an XML Document object of the specified type with its document element.
	 *
	 * __It behaves slightly different from the description in the living standard__:
	 * - There is no interface/class `XMLDocument`, it returns a `Document` instance.
	 * - `contentType`, `encoding`, `mode`, `origin`, `url` fields are currently not declared.
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string|null} namespaceURI
	 * @param {string} qualifiedName
	 * @param {DocumentType=null} doctype
	 * @returns {Document}
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocument MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocument DOM Level 2 Core (initial)
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocument  DOM Level 2 Core
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocument: function(namespaceURI,  qualifiedName, doctype){
		var doc = new Document();
		doc.implementation = this;
		doc.childNodes = new NodeList();
		doc.doctype = doctype || null;
		if (doctype){
			doc.appendChild(doctype);
		}
		if (qualifiedName){
			var root = doc.createElementNS(namespaceURI, qualifiedName);
			doc.appendChild(root);
		}
		return doc;
	},
	/**
	 * Returns a doctype, with the given `qualifiedName`, `publicId`, and `systemId`.
	 *
	 * __This behavior is slightly different from the in the specs__:
	 * - this implementation is not validating names or qualified names
	 *   (when parsing XML strings, the SAX parser takes care of that)
	 *
	 * @param {string} qualifiedName
	 * @param {string} [publicId]
	 * @param {string} [systemId]
	 * @returns {DocumentType} which can either be used with `DOMImplementation.createDocument` upon document creation
	 * 				  or can be put into the document via methods like `Node.insertBefore()` or `Node.replaceChild()`
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/DOMImplementation/createDocumentType MDN
	 * @see https://www.w3.org/TR/DOM-Level-2-Core/core.html#Level-2-Core-DOM-createDocType DOM Level 2 Core
	 * @see https://dom.spec.whatwg.org/#dom-domimplementation-createdocumenttype DOM Living Standard
	 *
	 * @see https://dom.spec.whatwg.org/#validate-and-extract DOM: Validate and extract
	 * @see https://www.w3.org/TR/xml/#NT-NameStartChar XML Spec: Names
	 * @see https://www.w3.org/TR/xml-names/#ns-qualnames XML Namespaces: Qualified names
	 */
	createDocumentType: function(qualifiedName, publicId, systemId){
		var node = new DocumentType();
		node.name = qualifiedName;
		node.nodeName = qualifiedName;
		node.publicId = publicId || '';
		node.systemId = systemId || '';

		return node;
	}
};


/**
 * @see http://www.w3.org/TR/2000/REC-DOM-Level-2-Core-20001113/core.html#ID-1950641247
 */

function Node() {
};

Node.prototype = {
	firstChild : null,
	lastChild : null,
	previousSibling : null,
	nextSibling : null,
	attributes : null,
	parentNode : null,
	childNodes : null,
	ownerDocument : null,
	nodeValue : null,
	namespaceURI : null,
	prefix : null,
	localName : null,
	// Modified in DOM Level 2:
	insertBefore:function(newChild, refChild){//raises
		return _insertBefore(this,newChild,refChild);
	},
	replaceChild:function(newChild, oldChild){//raises
		_insertBefore(this, newChild,oldChild, assertPreReplacementValidityInDocument);
		if(oldChild){
			this.removeChild(oldChild);
		}
	},
	removeChild:function(oldChild){
		return _removeChild(this,oldChild);
	},
	appendChild:function(newChild){
		return this.insertBefore(newChild,null);
	},
	hasChildNodes:function(){
		return this.firstChild != null;
	},
	cloneNode:function(deep){
		return cloneNode(this.ownerDocument||this,this,deep);
	},
	// Modified in DOM Level 2:
	normalize:function(){
		var child = this.firstChild;
		while(child){
			var next = child.nextSibling;
			if(next && next.nodeType == TEXT_NODE && child.nodeType == TEXT_NODE){
				this.removeChild(next);
				child.appendData(next.data);
			}else{
				child.normalize();
				child = next;
			}
		}
	},
  	// Introduced in DOM Level 2:
	isSupported:function(feature, version){
		return this.ownerDocument.implementation.hasFeature(feature,version);
	},
    // Introduced in DOM Level 2:
    hasAttributes:function(){
    	return this.attributes.length>0;
    },
	/**
	 * Look up the prefix associated to the given namespace URI, starting from this node.
	 * **The default namespace declarations are ignored by this method.**
	 * See Namespace Prefix Lookup for details on the algorithm used by this method.
	 *
	 * _Note: The implementation seems to be incomplete when compared to the algorithm described in the specs._
	 *
	 * @param {string | null} namespaceURI
	 * @returns {string | null}
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespacePrefix
	 * @see https://www.w3.org/TR/DOM-Level-3-Core/namespaces-algorithms.html#lookupNamespacePrefixAlgo
	 * @see https://dom.spec.whatwg.org/#dom-node-lookupprefix
	 * @see https://github.com/xmldom/xmldom/issues/322
	 */
    lookupPrefix:function(namespaceURI){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			for(var n in map){
						if (Object.prototype.hasOwnProperty.call(map, n) && map[n] === namespaceURI) {
							return n;
						}
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    lookupNamespaceURI:function(prefix){
    	var el = this;
    	while(el){
    		var map = el._nsMap;
    		//console.dir(map)
    		if(map){
    			if(Object.prototype.hasOwnProperty.call(map, prefix)){
    				return map[prefix] ;
    			}
    		}
    		el = el.nodeType == ATTRIBUTE_NODE?el.ownerDocument : el.parentNode;
    	}
    	return null;
    },
    // Introduced in DOM Level 3:
    isDefaultNamespace:function(namespaceURI){
    	var prefix = this.lookupPrefix(namespaceURI);
    	return prefix == null;
    }
};


function _xmlEncoder(c){
	return c == '<' && '&lt;' ||
         c == '>' && '&gt;' ||
         c == '&' && '&amp;' ||
         c == '"' && '&quot;' ||
         '&#'+c.charCodeAt()+';'
}


copy(NodeType,Node);
copy(NodeType,Node.prototype);

/**
 * @param callback return true for continue,false for break
 * @return boolean true: break visit;
 */
function _visitNode(node,callback){
	if(callback(node)){
		return true;
	}
	if(node = node.firstChild){
		do{
			if(_visitNode(node,callback)){return true}
        }while(node=node.nextSibling)
    }
}



function Document(){
	this.ownerDocument = this;
}

function _onAddAttribute(doc,el,newAttr){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE.XMLNS){
		//update namespace
		el._nsMap[newAttr.prefix?newAttr.localName:''] = newAttr.value
	}
}

function _onRemoveAttribute(doc,el,newAttr,remove){
	doc && doc._inc++;
	var ns = newAttr.namespaceURI ;
	if(ns === NAMESPACE.XMLNS){
		//update namespace
		delete el._nsMap[newAttr.prefix?newAttr.localName:'']
	}
}

/**
 * Updates `el.childNodes`, updating the indexed items and it's `length`.
 * Passing `newChild` means it will be appended.
 * Otherwise it's assumed that an item has been removed,
 * and `el.firstNode` and it's `.nextSibling` are used
 * to walk the current list of child nodes.
 *
 * @param {Document} doc
 * @param {Node} el
 * @param {Node} [newChild]
 * @private
 */
function _onUpdateChild (doc, el, newChild) {
	if(doc && doc._inc){
		doc._inc++;
		//update childNodes
		var cs = el.childNodes;
		if (newChild) {
			cs[cs.length++] = newChild;
		} else {
			var child = el.firstChild;
			var i = 0;
			while (child) {
				cs[i++] = child;
				child = child.nextSibling;
			}
			cs.length = i;
			delete cs[cs.length];
		}
	}
}

/**
 * Removes the connections between `parentNode` and `child`
 * and any existing `child.previousSibling` or `child.nextSibling`.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 *
 * @param {Node} parentNode
 * @param {Node} child
 * @returns {Node} the child that was removed.
 * @private
 */
function _removeChild (parentNode, child) {
	var previous = child.previousSibling;
	var next = child.nextSibling;
	if (previous) {
		previous.nextSibling = next;
	} else {
		parentNode.firstChild = next;
	}
	if (next) {
		next.previousSibling = previous;
	} else {
		parentNode.lastChild = previous;
	}
	child.parentNode = null;
	child.previousSibling = null;
	child.nextSibling = null;
	_onUpdateChild(parentNode.ownerDocument, parentNode);
	return child;
}

/**
 * Returns `true` if `node` can be a parent for insertion.
 * @param {Node} node
 * @returns {boolean}
 */
function hasValidParentNodeType(node) {
	return (
		node &&
		(node.nodeType === Node.DOCUMENT_NODE || node.nodeType === Node.DOCUMENT_FRAGMENT_NODE || node.nodeType === Node.ELEMENT_NODE)
	);
}

/**
 * Returns `true` if `node` can be inserted according to it's `nodeType`.
 * @param {Node} node
 * @returns {boolean}
 */
function hasInsertableNodeType(node) {
	return (
		node &&
		(isElementNode(node) ||
			isTextNode(node) ||
			isDocTypeNode(node) ||
			node.nodeType === Node.DOCUMENT_FRAGMENT_NODE ||
			node.nodeType === Node.COMMENT_NODE ||
			node.nodeType === Node.PROCESSING_INSTRUCTION_NODE)
	);
}

/**
 * Returns true if `node` is a DOCTYPE node
 * @param {Node} node
 * @returns {boolean}
 */
function isDocTypeNode(node) {
	return node && node.nodeType === Node.DOCUMENT_TYPE_NODE;
}

/**
 * Returns true if the node is an element
 * @param {Node} node
 * @returns {boolean}
 */
function isElementNode(node) {
	return node && node.nodeType === Node.ELEMENT_NODE;
}
/**
 * Returns true if `node` is a text node
 * @param {Node} node
 * @returns {boolean}
 */
function isTextNode(node) {
	return node && node.nodeType === Node.TEXT_NODE;
}

/**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Document} doc The document node
 * @param {Node} child the node that would become the nextSibling if the element would be inserted
 * @returns {boolean} `true` if an element can be inserted before child
 * @private
 * https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function isElementInsertionPossible(doc, child) {
	var parentChildNodes = doc.childNodes || [];
	if (find(parentChildNodes, isElementNode) || isDocTypeNode(child)) {
		return false;
	}
	var docTypeNode = find(parentChildNodes, isDocTypeNode);
	return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}

/**
 * Check if en element node can be inserted before `child`, or at the end if child is falsy,
 * according to the presence and position of a doctype node on the same level.
 *
 * @param {Node} doc The document node
 * @param {Node} child the node that would become the nextSibling if the element would be inserted
 * @returns {boolean} `true` if an element can be inserted before child
 * @private
 * https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function isElementReplacementPossible(doc, child) {
	var parentChildNodes = doc.childNodes || [];

	function hasElementChildThatIsNotChild(node) {
		return isElementNode(node) && node !== child;
	}

	if (find(parentChildNodes, hasElementChildThatIsNotChild)) {
		return false;
	}
	var docTypeNode = find(parentChildNodes, isDocTypeNode);
	return !(child && docTypeNode && parentChildNodes.indexOf(docTypeNode) > parentChildNodes.indexOf(child));
}

/**
 * @private
 * Steps 1-5 of the checks before inserting and before replacing a child are the same.
 *
 * @param {Node} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node=} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreInsertionValidity1to5(parent, node, child) {
	// 1. If `parent` is not a Document, DocumentFragment, or Element node, then throw a "HierarchyRequestError" DOMException.
	if (!hasValidParentNodeType(parent)) {
		throw new DOMException(HIERARCHY_REQUEST_ERR, 'Unexpected parent node type ' + parent.nodeType);
	}
	// 2. If `node` is a host-including inclusive ancestor of `parent`, then throw a "HierarchyRequestError" DOMException.
	// not implemented!
	// 3. If `child` is non-null and its parent is not `parent`, then throw a "NotFoundError" DOMException.
	if (child && child.parentNode !== parent) {
		throw new DOMException(NOT_FOUND_ERR, 'child not in parent');
	}
	if (
		// 4. If `node` is not a DocumentFragment, DocumentType, Element, or CharacterData node, then throw a "HierarchyRequestError" DOMException.
		!hasInsertableNodeType(node) ||
		// 5. If either `node` is a Text node and `parent` is a document,
		// the sax parser currently adds top level text nodes, this will be fixed in 0.9.0
		// || (node.nodeType === Node.TEXT_NODE && parent.nodeType === Node.DOCUMENT_NODE)
		// or `node` is a doctype and `parent` is not a document, then throw a "HierarchyRequestError" DOMException.
		(isDocTypeNode(node) && parent.nodeType !== Node.DOCUMENT_NODE)
	) {
		throw new DOMException(
			HIERARCHY_REQUEST_ERR,
			'Unexpected node type ' + node.nodeType + ' for parent node type ' + parent.nodeType
		);
	}
}

/**
 * @private
 * Step 6 of the checks before inserting and before replacing a child are different.
 *
 * @param {Document} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node | undefined} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreInsertionValidityInDocument(parent, node, child) {
	var parentChildNodes = parent.childNodes || [];
	var nodeChildNodes = node.childNodes || [];

	// DocumentFragment
	if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		var nodeChildElements = nodeChildNodes.filter(isElementNode);
		// If node has more than one element child or has a Text node child.
		if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'More than one element or text in fragment');
		}
		// Otherwise, if `node` has one element child and either `parent` has an element child,
		// `child` is a doctype, or `child` is non-null and a doctype is following `child`.
		if (nodeChildElements.length === 1 && !isElementInsertionPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Element in fragment can not be inserted before doctype');
		}
	}
	// Element
	if (isElementNode(node)) {
		// `parent` has an element child, `child` is a doctype,
		// or `child` is non-null and a doctype is following `child`.
		if (!isElementInsertionPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one element can be added and only after doctype');
		}
	}
	// DocumentType
	if (isDocTypeNode(node)) {
		// `parent` has a doctype child,
		if (find(parentChildNodes, isDocTypeNode)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one doctype is allowed');
		}
		var parentElementChild = find(parentChildNodes, isElementNode);
		// `child` is non-null and an element is preceding `child`,
		if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Doctype can only be inserted before an element');
		}
		// or `child` is null and `parent` has an element child.
		if (!child && parentElementChild) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Doctype can not be appended since element is present');
		}
	}
}

/**
 * @private
 * Step 6 of the checks before inserting and before replacing a child are different.
 *
 * @param {Document} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node | undefined} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 * @see https://dom.spec.whatwg.org/#concept-node-replace
 */
function assertPreReplacementValidityInDocument(parent, node, child) {
	var parentChildNodes = parent.childNodes || [];
	var nodeChildNodes = node.childNodes || [];

	// DocumentFragment
	if (node.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
		var nodeChildElements = nodeChildNodes.filter(isElementNode);
		// If `node` has more than one element child or has a Text node child.
		if (nodeChildElements.length > 1 || find(nodeChildNodes, isTextNode)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'More than one element or text in fragment');
		}
		// Otherwise, if `node` has one element child and either `parent` has an element child that is not `child` or a doctype is following `child`.
		if (nodeChildElements.length === 1 && !isElementReplacementPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Element in fragment can not be inserted before doctype');
		}
	}
	// Element
	if (isElementNode(node)) {
		// `parent` has an element child that is not `child` or a doctype is following `child`.
		if (!isElementReplacementPossible(parent, child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one element can be added and only after doctype');
		}
	}
	// DocumentType
	if (isDocTypeNode(node)) {
		function hasDoctypeChildThatIsNotChild(node) {
			return isDocTypeNode(node) && node !== child;
		}

		// `parent` has a doctype child that is not `child`,
		if (find(parentChildNodes, hasDoctypeChildThatIsNotChild)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Only one doctype is allowed');
		}
		var parentElementChild = find(parentChildNodes, isElementNode);
		// or an element is preceding `child`.
		if (child && parentChildNodes.indexOf(parentElementChild) < parentChildNodes.indexOf(child)) {
			throw new DOMException(HIERARCHY_REQUEST_ERR, 'Doctype can only be inserted before an element');
		}
	}
}

/**
 * @private
 * @param {Node} parent the parent node to insert `node` into
 * @param {Node} node the node to insert
 * @param {Node=} child the node that should become the `nextSibling` of `node`
 * @returns {Node}
 * @throws DOMException for several node combinations that would create a DOM that is not well-formed.
 * @throws DOMException if `child` is provided but is not a child of `parent`.
 * @see https://dom.spec.whatwg.org/#concept-node-ensure-pre-insertion-validity
 */
function _insertBefore(parent, node, child, _inDocumentAssertion) {
	// To ensure pre-insertion validity of a node into a parent before a child, run these steps:
	assertPreInsertionValidity1to5(parent, node, child);

	// If parent is a document, and any of the statements below, switched on the interface node implements,
	// are true, then throw a "HierarchyRequestError" DOMException.
	if (parent.nodeType === Node.DOCUMENT_NODE) {
		(_inDocumentAssertion || assertPreInsertionValidityInDocument)(parent, node, child);
	}

	var cp = node.parentNode;
	if(cp){
		cp.removeChild(node);//remove and update
	}
	if(node.nodeType === DOCUMENT_FRAGMENT_NODE){
		var newFirst = node.firstChild;
		if (newFirst == null) {
			return node;
		}
		var newLast = node.lastChild;
	}else{
		newFirst = newLast = node;
	}
	var pre = child ? child.previousSibling : parent.lastChild;

	newFirst.previousSibling = pre;
	newLast.nextSibling = child;


	if(pre){
		pre.nextSibling = newFirst;
	}else{
		parent.firstChild = newFirst;
	}
	if(child == null){
		parent.lastChild = newLast;
	}else{
		child.previousSibling = newLast;
	}
	do{
		newFirst.parentNode = parent;
	}while(newFirst !== newLast && (newFirst= newFirst.nextSibling))
	_onUpdateChild(parent.ownerDocument||parent, parent);
	//console.log(parent.lastChild.nextSibling == null)
	if (node.nodeType == DOCUMENT_FRAGMENT_NODE) {
		node.firstChild = node.lastChild = null;
	}
	return node;
}

/**
 * Appends `newChild` to `parentNode`.
 * If `newChild` is already connected to a `parentNode` it is first removed from it.
 *
 * @see https://github.com/xmldom/xmldom/issues/135
 * @see https://github.com/xmldom/xmldom/issues/145
 * @param {Node} parentNode
 * @param {Node} newChild
 * @returns {Node}
 * @private
 */
function _appendSingleChild (parentNode, newChild) {
	if (newChild.parentNode) {
		newChild.parentNode.removeChild(newChild);
	}
	newChild.parentNode = parentNode;
	newChild.previousSibling = parentNode.lastChild;
	newChild.nextSibling = null;
	if (newChild.previousSibling) {
		newChild.previousSibling.nextSibling = newChild;
	} else {
		parentNode.firstChild = newChild;
	}
	parentNode.lastChild = newChild;
	_onUpdateChild(parentNode.ownerDocument, parentNode, newChild);
	return newChild;
}

Document.prototype = {
	//implementation : null,
	nodeName :  '#document',
	nodeType :  DOCUMENT_NODE,
	/**
	 * The DocumentType node of the document.
	 *
	 * @readonly
	 * @type DocumentType
	 */
	doctype :  null,
	documentElement :  null,
	_inc : 1,

	insertBefore :  function(newChild, refChild){//raises
		if(newChild.nodeType == DOCUMENT_FRAGMENT_NODE){
			var child = newChild.firstChild;
			while(child){
				var next = child.nextSibling;
				this.insertBefore(child,refChild);
				child = next;
			}
			return newChild;
		}
		_insertBefore(this, newChild, refChild);
		newChild.ownerDocument = this;
		if (this.documentElement === null && newChild.nodeType === ELEMENT_NODE) {
			this.documentElement = newChild;
		}

		return newChild;
	},
	removeChild :  function(oldChild){
		if(this.documentElement == oldChild){
			this.documentElement = null;
		}
		return _removeChild(this,oldChild);
	},
	replaceChild: function (newChild, oldChild) {
		//raises
		_insertBefore(this, newChild, oldChild, assertPreReplacementValidityInDocument);
		newChild.ownerDocument = this;
		if (oldChild) {
			this.removeChild(oldChild);
		}
		if (isElementNode(newChild)) {
			this.documentElement = newChild;
		}
	},
	// Introduced in DOM Level 2:
	importNode : function(importedNode,deep){
		return importNode(this,importedNode,deep);
	},
	// Introduced in DOM Level 2:
	getElementById :	function(id){
		var rtv = null;
		_visitNode(this.documentElement,function(node){
			if(node.nodeType == ELEMENT_NODE){
				if(node.getAttribute('id') == id){
					rtv = node;
					return true;
				}
			}
		})
		return rtv;
	},

	/**
	 * The `getElementsByClassName` method of `Document` interface returns an array-like object
	 * of all child elements which have **all** of the given class name(s).
	 *
	 * Returns an empty list if `classeNames` is an empty string or only contains HTML white space characters.
	 *
	 *
	 * Warning: This is a live LiveNodeList.
	 * Changes in the DOM will reflect in the array as the changes occur.
	 * If an element selected by this array no longer qualifies for the selector,
	 * it will automatically be removed. Be aware of this for iteration purposes.
	 *
	 * @param {string} classNames is a string representing the class name(s) to match; multiple class names are separated by (ASCII-)whitespace
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName
	 * @see https://dom.spec.whatwg.org/#concept-getelementsbyclassname
	 */
	getElementsByClassName: function(classNames) {
		var classNamesSet = toOrderedSet(classNames)
		return new LiveNodeList(this, function(base) {
			var ls = [];
			if (classNamesSet.length > 0) {
				_visitNode(base.documentElement, function(node) {
					if(node !== base && node.nodeType === ELEMENT_NODE) {
						var nodeClassNames = node.getAttribute('class')
						// can be null if the attribute does not exist
						if (nodeClassNames) {
							// before splitting and iterating just compare them for the most common case
							var matches = classNames === nodeClassNames;
							if (!matches) {
								var nodeClassNamesSet = toOrderedSet(nodeClassNames)
								matches = classNamesSet.every(arrayIncludes(nodeClassNamesSet))
							}
							if(matches) {
								ls.push(node);
							}
						}
					}
				});
			}
			return ls;
		});
	},

	//document factory method:
	createElement :	function(tagName){
		var node = new Element();
		node.ownerDocument = this;
		node.nodeName = tagName;
		node.tagName = tagName;
		node.localName = tagName;
		node.childNodes = new NodeList();
		var attrs	= node.attributes = new NamedNodeMap();
		attrs._ownerElement = node;
		return node;
	},
	createDocumentFragment :	function(){
		var node = new DocumentFragment();
		node.ownerDocument = this;
		node.childNodes = new NodeList();
		return node;
	},
	createTextNode :	function(data){
		var node = new Text();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createComment :	function(data){
		var node = new Comment();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createCDATASection :	function(data){
		var node = new CDATASection();
		node.ownerDocument = this;
		node.appendData(data)
		return node;
	},
	createProcessingInstruction :	function(target,data){
		var node = new ProcessingInstruction();
		node.ownerDocument = this;
		node.tagName = node.nodeName = node.target = target;
		node.nodeValue = node.data = data;
		return node;
	},
	createAttribute :	function(name){
		var node = new Attr();
		node.ownerDocument	= this;
		node.name = name;
		node.nodeName	= name;
		node.localName = name;
		node.specified = true;
		return node;
	},
	createEntityReference :	function(name){
		var node = new EntityReference();
		node.ownerDocument	= this;
		node.nodeName	= name;
		return node;
	},
	// Introduced in DOM Level 2:
	createElementNS :	function(namespaceURI,qualifiedName){
		var node = new Element();
		var pl = qualifiedName.split(':');
		var attrs	= node.attributes = new NamedNodeMap();
		node.childNodes = new NodeList();
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.tagName = qualifiedName;
		node.namespaceURI = namespaceURI;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		attrs._ownerElement = node;
		return node;
	},
	// Introduced in DOM Level 2:
	createAttributeNS :	function(namespaceURI,qualifiedName){
		var node = new Attr();
		var pl = qualifiedName.split(':');
		node.ownerDocument = this;
		node.nodeName = qualifiedName;
		node.name = qualifiedName;
		node.namespaceURI = namespaceURI;
		node.specified = true;
		if(pl.length == 2){
			node.prefix = pl[0];
			node.localName = pl[1];
		}else{
			//el.prefix = null;
			node.localName = qualifiedName;
		}
		return node;
	}
};
_extends(Document,Node);


function Element() {
	this._nsMap = {};
};
Element.prototype = {
	nodeType : ELEMENT_NODE,
	hasAttribute : function(name){
		return this.getAttributeNode(name)!=null;
	},
	getAttribute : function(name){
		var attr = this.getAttributeNode(name);
		return attr && attr.value || '';
	},
	getAttributeNode : function(name){
		return this.attributes.getNamedItem(name);
	},
	setAttribute : function(name, value){
		var attr = this.ownerDocument.createAttribute(name);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	removeAttribute : function(name){
		var attr = this.getAttributeNode(name)
		attr && this.removeAttributeNode(attr);
	},

	//four real opeartion method
	appendChild:function(newChild){
		if(newChild.nodeType === DOCUMENT_FRAGMENT_NODE){
			return this.insertBefore(newChild,null);
		}else{
			return _appendSingleChild(this,newChild);
		}
	},
	setAttributeNode : function(newAttr){
		return this.attributes.setNamedItem(newAttr);
	},
	setAttributeNodeNS : function(newAttr){
		return this.attributes.setNamedItemNS(newAttr);
	},
	removeAttributeNode : function(oldAttr){
		//console.log(this == oldAttr.ownerElement)
		return this.attributes.removeNamedItem(oldAttr.nodeName);
	},
	//get real attribute name,and remove it by removeAttributeNode
	removeAttributeNS : function(namespaceURI, localName){
		var old = this.getAttributeNodeNS(namespaceURI, localName);
		old && this.removeAttributeNode(old);
	},

	hasAttributeNS : function(namespaceURI, localName){
		return this.getAttributeNodeNS(namespaceURI, localName)!=null;
	},
	getAttributeNS : function(namespaceURI, localName){
		var attr = this.getAttributeNodeNS(namespaceURI, localName);
		return attr && attr.value || '';
	},
	setAttributeNS : function(namespaceURI, qualifiedName, value){
		var attr = this.ownerDocument.createAttributeNS(namespaceURI, qualifiedName);
		attr.value = attr.nodeValue = "" + value;
		this.setAttributeNode(attr)
	},
	getAttributeNodeNS : function(namespaceURI, localName){
		return this.attributes.getNamedItemNS(namespaceURI, localName);
	},

	getElementsByTagName : function(tagName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType == ELEMENT_NODE && (tagName === '*' || node.tagName == tagName)){
					ls.push(node);
				}
			});
			return ls;
		});
	},
	getElementsByTagNameNS : function(namespaceURI, localName){
		return new LiveNodeList(this,function(base){
			var ls = [];
			_visitNode(base,function(node){
				if(node !== base && node.nodeType === ELEMENT_NODE && (namespaceURI === '*' || node.namespaceURI === namespaceURI) && (localName === '*' || node.localName == localName)){
					ls.push(node);
				}
			});
			return ls;

		});
	}
};
Document.prototype.getElementsByTagName = Element.prototype.getElementsByTagName;
Document.prototype.getElementsByTagNameNS = Element.prototype.getElementsByTagNameNS;


_extends(Element,Node);
function Attr() {
};
Attr.prototype.nodeType = ATTRIBUTE_NODE;
_extends(Attr,Node);


function CharacterData() {
};
CharacterData.prototype = {
	data : '',
	substringData : function(offset, count) {
		return this.data.substring(offset, offset+count);
	},
	appendData: function(text) {
		text = this.data+text;
		this.nodeValue = this.data = text;
		this.length = text.length;
	},
	insertData: function(offset,text) {
		this.replaceData(offset,0,text);

	},
	appendChild:function(newChild){
		throw new Error(ExceptionMessage[HIERARCHY_REQUEST_ERR])
	},
	deleteData: function(offset, count) {
		this.replaceData(offset,count,"");
	},
	replaceData: function(offset, count, text) {
		var start = this.data.substring(0,offset);
		var end = this.data.substring(offset+count);
		text = start + text + end;
		this.nodeValue = this.data = text;
		this.length = text.length;
	}
}
_extends(CharacterData,Node);
function Text() {
};
Text.prototype = {
	nodeName : "#text",
	nodeType : TEXT_NODE,
	splitText : function(offset) {
		var text = this.data;
		var newText = text.substring(offset);
		text = text.substring(0, offset);
		this.data = this.nodeValue = text;
		this.length = text.length;
		var newNode = this.ownerDocument.createTextNode(newText);
		if(this.parentNode){
			this.parentNode.insertBefore(newNode, this.nextSibling);
		}
		return newNode;
	}
}
_extends(Text,CharacterData);
function Comment() {
};
Comment.prototype = {
	nodeName : "#comment",
	nodeType : COMMENT_NODE
}
_extends(Comment,CharacterData);

function CDATASection() {
};
CDATASection.prototype = {
	nodeName : "#cdata-section",
	nodeType : CDATA_SECTION_NODE
}
_extends(CDATASection,CharacterData);


function DocumentType() {
};
DocumentType.prototype.nodeType = DOCUMENT_TYPE_NODE;
_extends(DocumentType,Node);

function Notation() {
};
Notation.prototype.nodeType = NOTATION_NODE;
_extends(Notation,Node);

function Entity() {
};
Entity.prototype.nodeType = ENTITY_NODE;
_extends(Entity,Node);

function EntityReference() {
};
EntityReference.prototype.nodeType = ENTITY_REFERENCE_NODE;
_extends(EntityReference,Node);

function DocumentFragment() {
};
DocumentFragment.prototype.nodeName =	"#document-fragment";
DocumentFragment.prototype.nodeType =	DOCUMENT_FRAGMENT_NODE;
_extends(DocumentFragment,Node);


function ProcessingInstruction() {
}
ProcessingInstruction.prototype.nodeType = PROCESSING_INSTRUCTION_NODE;
_extends(ProcessingInstruction,Node);
function XMLSerializer(){}
XMLSerializer.prototype.serializeToString = function(node,isHtml,nodeFilter){
	return nodeSerializeToString.call(node,isHtml,nodeFilter);
}
Node.prototype.toString = nodeSerializeToString;
function nodeSerializeToString(isHtml,nodeFilter){
	var buf = [];
	var refNode = this.nodeType == 9 && this.documentElement || this;
	var prefix = refNode.prefix;
	var uri = refNode.namespaceURI;

	if(uri && prefix == null){
		//console.log(prefix)
		var prefix = refNode.lookupPrefix(uri);
		if(prefix == null){
			//isHTML = true;
			var visibleNamespaces=[
			{namespace:uri,prefix:null}
			//{namespace:uri,prefix:''}
			]
		}
	}
	serializeToString(this,buf,isHtml,nodeFilter,visibleNamespaces);
	//console.log('###',this.nodeType,uri,prefix,buf.join(''))
	return buf.join('');
}

function needNamespaceDefine(node, isHTML, visibleNamespaces) {
	var prefix = node.prefix || '';
	var uri = node.namespaceURI;
	// According to [Namespaces in XML 1.0](https://www.w3.org/TR/REC-xml-names/#ns-using) ,
	// and more specifically https://www.w3.org/TR/REC-xml-names/#nsc-NoPrefixUndecl :
	// > In a namespace declaration for a prefix [...], the attribute value MUST NOT be empty.
	// in a similar manner [Namespaces in XML 1.1](https://www.w3.org/TR/xml-names11/#ns-using)
	// and more specifically https://www.w3.org/TR/xml-names11/#nsc-NSDeclared :
	// > [...] Furthermore, the attribute value [...] must not be an empty string.
	// so serializing empty namespace value like xmlns:ds="" would produce an invalid XML document.
	if (!uri) {
		return false;
	}
	if (prefix === "xml" && uri === NAMESPACE.XML || uri === NAMESPACE.XMLNS) {
		return false;
	}

	var i = visibleNamespaces.length
	while (i--) {
		var ns = visibleNamespaces[i];
		// get namespace prefix
		if (ns.prefix === prefix) {
			return ns.namespace !== uri;
		}
	}
	return true;
}
/**
 * Well-formed constraint: No < in Attribute Values
 * > The replacement text of any entity referred to directly or indirectly
 * > in an attribute value must not contain a <.
 * @see https://www.w3.org/TR/xml11/#CleanAttrVals
 * @see https://www.w3.org/TR/xml11/#NT-AttValue
 *
 * Literal whitespace other than space that appear in attribute values
 * are serialized as their entity references, so they will be preserved.
 * (In contrast to whitespace literals in the input which are normalized to spaces)
 * @see https://www.w3.org/TR/xml11/#AVNormalize
 * @see https://w3c.github.io/DOM-Parsing/#serializing-an-element-s-attributes
 */
function addSerializedAttribute(buf, qualifiedName, value) {
	buf.push(' ', qualifiedName, '="', value.replace(/[<>&"\t\n\r]/g, _xmlEncoder), '"')
}

function serializeToString(node,buf,isHTML,nodeFilter,visibleNamespaces){
	if (!visibleNamespaces) {
		visibleNamespaces = [];
	}

	if(nodeFilter){
		node = nodeFilter(node);
		if(node){
			if(typeof node == 'string'){
				buf.push(node);
				return;
			}
		}else{
			return;
		}
		//buf.sort.apply(attrs, attributeSorter);
	}

	switch(node.nodeType){
	case ELEMENT_NODE:
		var attrs = node.attributes;
		var len = attrs.length;
		var child = node.firstChild;
		var nodeName = node.tagName;

		isHTML = NAMESPACE.isHTML(node.namespaceURI) || isHTML

		var prefixedNodeName = nodeName
		if (!isHTML && !node.prefix && node.namespaceURI) {
			var defaultNS
			// lookup current default ns from `xmlns` attribute
			for (var ai = 0; ai < attrs.length; ai++) {
				if (attrs.item(ai).name === 'xmlns') {
					defaultNS = attrs.item(ai).value
					break
				}
			}
			if (!defaultNS) {
				// lookup current default ns in visibleNamespaces
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi]
					if (namespace.prefix === '' && namespace.namespace === node.namespaceURI) {
						defaultNS = namespace.namespace
						break
					}
				}
			}
			if (defaultNS !== node.namespaceURI) {
				for (var nsi = visibleNamespaces.length - 1; nsi >= 0; nsi--) {
					var namespace = visibleNamespaces[nsi]
					if (namespace.namespace === node.namespaceURI) {
						if (namespace.prefix) {
							prefixedNodeName = namespace.prefix + ':' + nodeName
						}
						break
					}
				}
			}
		}

		buf.push('<', prefixedNodeName);

		for(var i=0;i<len;i++){
			// add namespaces for attributes
			var attr = attrs.item(i);
			if (attr.prefix == 'xmlns') {
				visibleNamespaces.push({ prefix: attr.localName, namespace: attr.value });
			}else if(attr.nodeName == 'xmlns'){
				visibleNamespaces.push({ prefix: '', namespace: attr.value });
			}
		}

		for(var i=0;i<len;i++){
			var attr = attrs.item(i);
			if (needNamespaceDefine(attr,isHTML, visibleNamespaces)) {
				var prefix = attr.prefix||'';
				var uri = attr.namespaceURI;
				addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
				visibleNamespaces.push({ prefix: prefix, namespace:uri });
			}
			serializeToString(attr,buf,isHTML,nodeFilter,visibleNamespaces);
		}

		// add namespace for current node
		if (nodeName === prefixedNodeName && needNamespaceDefine(node, isHTML, visibleNamespaces)) {
			var prefix = node.prefix||'';
			var uri = node.namespaceURI;
			addSerializedAttribute(buf, prefix ? 'xmlns:' + prefix : "xmlns", uri);
			visibleNamespaces.push({ prefix: prefix, namespace:uri });
		}

		if(child || isHTML && !/^(?:meta|link|img|br|hr|input)$/i.test(nodeName)){
			buf.push('>');
			//if is cdata child node
			if(isHTML && /^script$/i.test(nodeName)){
				while(child){
					if(child.data){
						buf.push(child.data);
					}else{
						serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					}
					child = child.nextSibling;
				}
			}else
			{
				while(child){
					serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
					child = child.nextSibling;
				}
			}
			buf.push('</',prefixedNodeName,'>');
		}else{
			buf.push('/>');
		}
		// remove added visible namespaces
		//visibleNamespaces.length = startVisibleNamespaces;
		return;
	case DOCUMENT_NODE:
	case DOCUMENT_FRAGMENT_NODE:
		var child = node.firstChild;
		while(child){
			serializeToString(child, buf, isHTML, nodeFilter, visibleNamespaces.slice());
			child = child.nextSibling;
		}
		return;
	case ATTRIBUTE_NODE:
		return addSerializedAttribute(buf, node.name, node.value);
	case TEXT_NODE:
		/**
		 * The ampersand character (&) and the left angle bracket (<) must not appear in their literal form,
		 * except when used as markup delimiters, or within a comment, a processing instruction, or a CDATA section.
		 * If they are needed elsewhere, they must be escaped using either numeric character references or the strings
		 * `&amp;` and `&lt;` respectively.
		 * The right angle bracket (>) may be represented using the string " &gt; ", and must, for compatibility,
		 * be escaped using either `&gt;` or a character reference when it appears in the string `]]>` in content,
		 * when that string is not marking the end of a CDATA section.
		 *
		 * In the content of elements, character data is any string of characters
		 * which does not contain the start-delimiter of any markup
		 * and does not include the CDATA-section-close delimiter, `]]>`.
		 *
		 * @see https://www.w3.org/TR/xml/#NT-CharData
		 * @see https://w3c.github.io/DOM-Parsing/#xml-serializing-a-text-node
		 */
		return buf.push(node.data
			.replace(/[<&>]/g,_xmlEncoder)
		);
	case CDATA_SECTION_NODE:
		return buf.push( '<![CDATA[',node.data,']]>');
	case COMMENT_NODE:
		return buf.push( "<!--",node.data,"-->");
	case DOCUMENT_TYPE_NODE:
		var pubid = node.publicId;
		var sysid = node.systemId;
		buf.push('<!DOCTYPE ',node.name);
		if(pubid){
			buf.push(' PUBLIC ', pubid);
			if (sysid && sysid!='.') {
				buf.push(' ', sysid);
			}
			buf.push('>');
		}else if(sysid && sysid!='.'){
			buf.push(' SYSTEM ', sysid, '>');
		}else{
			var sub = node.internalSubset;
			if(sub){
				buf.push(" [",sub,"]");
			}
			buf.push(">");
		}
		return;
	case PROCESSING_INSTRUCTION_NODE:
		return buf.push( "<?",node.target," ",node.data,"?>");
	case ENTITY_REFERENCE_NODE:
		return buf.push( '&',node.nodeName,';');
	//case ENTITY_NODE:
	//case NOTATION_NODE:
	default:
		buf.push('??',node.nodeName);
	}
}
function importNode(doc,node,deep){
	var node2;
	switch (node.nodeType) {
	case ELEMENT_NODE:
		node2 = node.cloneNode(false);
		node2.ownerDocument = doc;
		//var attrs = node2.attributes;
		//var len = attrs.length;
		//for(var i=0;i<len;i++){
			//node2.setAttributeNodeNS(importNode(doc,attrs.item(i),deep));
		//}
	case DOCUMENT_FRAGMENT_NODE:
		break;
	case ATTRIBUTE_NODE:
		deep = true;
		break;
	//case ENTITY_REFERENCE_NODE:
	//case PROCESSING_INSTRUCTION_NODE:
	////case TEXT_NODE:
	//case CDATA_SECTION_NODE:
	//case COMMENT_NODE:
	//	deep = false;
	//	break;
	//case DOCUMENT_NODE:
	//case DOCUMENT_TYPE_NODE:
	//cannot be imported.
	//case ENTITY_NODE:
	//case NOTATION_NODE：
	//can not hit in level3
	//default:throw e;
	}
	if(!node2){
		node2 = node.cloneNode(false);//false
	}
	node2.ownerDocument = doc;
	node2.parentNode = null;
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(importNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}
//
//var _relationMap = {firstChild:1,lastChild:1,previousSibling:1,nextSibling:1,
//					attributes:1,childNodes:1,parentNode:1,documentElement:1,doctype,};
function cloneNode(doc,node,deep){
	var node2 = new node.constructor();
	for (var n in node) {
		if (Object.prototype.hasOwnProperty.call(node, n)) {
			var v = node[n];
			if (typeof v != "object") {
				if (v != node2[n]) {
					node2[n] = v;
				}
			}
		}
	}
	if(node.childNodes){
		node2.childNodes = new NodeList();
	}
	node2.ownerDocument = doc;
	switch (node2.nodeType) {
	case ELEMENT_NODE:
		var attrs	= node.attributes;
		var attrs2	= node2.attributes = new NamedNodeMap();
		var len = attrs.length
		attrs2._ownerElement = node2;
		for(var i=0;i<len;i++){
			node2.setAttributeNode(cloneNode(doc,attrs.item(i),true));
		}
		break;;
	case ATTRIBUTE_NODE:
		deep = true;
	}
	if(deep){
		var child = node.firstChild;
		while(child){
			node2.appendChild(cloneNode(doc,child,deep));
			child = child.nextSibling;
		}
	}
	return node2;
}

function __set__(object,key,value){
	object[key] = value
}
//do dynamic
try{
	if(Object.defineProperty){
		Object.defineProperty(LiveNodeList.prototype,'length',{
			get:function(){
				_updateLiveList(this);
				return this.$$length;
			}
		});

		Object.defineProperty(Node.prototype,'textContent',{
			get:function(){
				return getTextContent(this);
			},

			set:function(data){
				switch(this.nodeType){
				case ELEMENT_NODE:
				case DOCUMENT_FRAGMENT_NODE:
					while(this.firstChild){
						this.removeChild(this.firstChild);
					}
					if(data || String(data)){
						this.appendChild(this.ownerDocument.createTextNode(data));
					}
					break;

				default:
					this.data = data;
					this.value = data;
					this.nodeValue = data;
				}
			}
		})

		function getTextContent(node){
			switch(node.nodeType){
			case ELEMENT_NODE:
			case DOCUMENT_FRAGMENT_NODE:
				var buf = [];
				node = node.firstChild;
				while(node){
					if(node.nodeType!==7 && node.nodeType !==8){
						buf.push(getTextContent(node));
					}
					node = node.nextSibling;
				}
				return buf.join('');
			default:
				return node.nodeValue;
			}
		}

		__set__ = function(object,key,value){
			//console.log(value)
			object['$$'+key] = value
		}
	}
}catch(e){//ie8
}

//if(typeof require == 'function'){
	exports.DocumentType = DocumentType;
	exports.DOMException = DOMException;
	exports.DOMImplementation = DOMImplementation;
	exports.Element = Element;
	exports.Node = Node;
	exports.NodeList = NodeList;
	exports.XMLSerializer = XMLSerializer;
//}

},{"./conventions":25}],28:[function(require,module,exports){
'use strict';

var freeze = require('./conventions').freeze;

/**
 * The entities that are predefined in every XML document.
 *
 * @see https://www.w3.org/TR/2006/REC-xml11-20060816/#sec-predefined-ent W3C XML 1.1
 * @see https://www.w3.org/TR/2008/REC-xml-20081126/#sec-predefined-ent W3C XML 1.0
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Predefined_entities_in_XML Wikipedia
 */
exports.XML_ENTITIES = freeze({
	amp: '&',
	apos: "'",
	gt: '>',
	lt: '<',
	quot: '"',
});

/**
 * A map of all entities that are detected in an HTML document.
 * They contain all entries from `XML_ENTITIES`.
 *
 * @see XML_ENTITIES
 * @see DOMParser.parseFromString
 * @see DOMImplementation.prototype.createHTMLDocument
 * @see https://html.spec.whatwg.org/#named-character-references WHATWG HTML(5) Spec
 * @see https://html.spec.whatwg.org/entities.json JSON
 * @see https://www.w3.org/TR/xml-entity-names/ W3C XML Entity Names
 * @see https://www.w3.org/TR/html4/sgml/entities.html W3C HTML4/SGML
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Character_entity_references_in_HTML Wikipedia (HTML)
 * @see https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references#Entities_representing_special_characters_in_XHTML Wikpedia (XHTML)
 */
exports.HTML_ENTITIES = freeze({
	Aacute: '\u00C1',
	aacute: '\u00E1',
	Abreve: '\u0102',
	abreve: '\u0103',
	ac: '\u223E',
	acd: '\u223F',
	acE: '\u223E\u0333',
	Acirc: '\u00C2',
	acirc: '\u00E2',
	acute: '\u00B4',
	Acy: '\u0410',
	acy: '\u0430',
	AElig: '\u00C6',
	aelig: '\u00E6',
	af: '\u2061',
	Afr: '\uD835\uDD04',
	afr: '\uD835\uDD1E',
	Agrave: '\u00C0',
	agrave: '\u00E0',
	alefsym: '\u2135',
	aleph: '\u2135',
	Alpha: '\u0391',
	alpha: '\u03B1',
	Amacr: '\u0100',
	amacr: '\u0101',
	amalg: '\u2A3F',
	AMP: '\u0026',
	amp: '\u0026',
	And: '\u2A53',
	and: '\u2227',
	andand: '\u2A55',
	andd: '\u2A5C',
	andslope: '\u2A58',
	andv: '\u2A5A',
	ang: '\u2220',
	ange: '\u29A4',
	angle: '\u2220',
	angmsd: '\u2221',
	angmsdaa: '\u29A8',
	angmsdab: '\u29A9',
	angmsdac: '\u29AA',
	angmsdad: '\u29AB',
	angmsdae: '\u29AC',
	angmsdaf: '\u29AD',
	angmsdag: '\u29AE',
	angmsdah: '\u29AF',
	angrt: '\u221F',
	angrtvb: '\u22BE',
	angrtvbd: '\u299D',
	angsph: '\u2222',
	angst: '\u00C5',
	angzarr: '\u237C',
	Aogon: '\u0104',
	aogon: '\u0105',
	Aopf: '\uD835\uDD38',
	aopf: '\uD835\uDD52',
	ap: '\u2248',
	apacir: '\u2A6F',
	apE: '\u2A70',
	ape: '\u224A',
	apid: '\u224B',
	apos: '\u0027',
	ApplyFunction: '\u2061',
	approx: '\u2248',
	approxeq: '\u224A',
	Aring: '\u00C5',
	aring: '\u00E5',
	Ascr: '\uD835\uDC9C',
	ascr: '\uD835\uDCB6',
	Assign: '\u2254',
	ast: '\u002A',
	asymp: '\u2248',
	asympeq: '\u224D',
	Atilde: '\u00C3',
	atilde: '\u00E3',
	Auml: '\u00C4',
	auml: '\u00E4',
	awconint: '\u2233',
	awint: '\u2A11',
	backcong: '\u224C',
	backepsilon: '\u03F6',
	backprime: '\u2035',
	backsim: '\u223D',
	backsimeq: '\u22CD',
	Backslash: '\u2216',
	Barv: '\u2AE7',
	barvee: '\u22BD',
	Barwed: '\u2306',
	barwed: '\u2305',
	barwedge: '\u2305',
	bbrk: '\u23B5',
	bbrktbrk: '\u23B6',
	bcong: '\u224C',
	Bcy: '\u0411',
	bcy: '\u0431',
	bdquo: '\u201E',
	becaus: '\u2235',
	Because: '\u2235',
	because: '\u2235',
	bemptyv: '\u29B0',
	bepsi: '\u03F6',
	bernou: '\u212C',
	Bernoullis: '\u212C',
	Beta: '\u0392',
	beta: '\u03B2',
	beth: '\u2136',
	between: '\u226C',
	Bfr: '\uD835\uDD05',
	bfr: '\uD835\uDD1F',
	bigcap: '\u22C2',
	bigcirc: '\u25EF',
	bigcup: '\u22C3',
	bigodot: '\u2A00',
	bigoplus: '\u2A01',
	bigotimes: '\u2A02',
	bigsqcup: '\u2A06',
	bigstar: '\u2605',
	bigtriangledown: '\u25BD',
	bigtriangleup: '\u25B3',
	biguplus: '\u2A04',
	bigvee: '\u22C1',
	bigwedge: '\u22C0',
	bkarow: '\u290D',
	blacklozenge: '\u29EB',
	blacksquare: '\u25AA',
	blacktriangle: '\u25B4',
	blacktriangledown: '\u25BE',
	blacktriangleleft: '\u25C2',
	blacktriangleright: '\u25B8',
	blank: '\u2423',
	blk12: '\u2592',
	blk14: '\u2591',
	blk34: '\u2593',
	block: '\u2588',
	bne: '\u003D\u20E5',
	bnequiv: '\u2261\u20E5',
	bNot: '\u2AED',
	bnot: '\u2310',
	Bopf: '\uD835\uDD39',
	bopf: '\uD835\uDD53',
	bot: '\u22A5',
	bottom: '\u22A5',
	bowtie: '\u22C8',
	boxbox: '\u29C9',
	boxDL: '\u2557',
	boxDl: '\u2556',
	boxdL: '\u2555',
	boxdl: '\u2510',
	boxDR: '\u2554',
	boxDr: '\u2553',
	boxdR: '\u2552',
	boxdr: '\u250C',
	boxH: '\u2550',
	boxh: '\u2500',
	boxHD: '\u2566',
	boxHd: '\u2564',
	boxhD: '\u2565',
	boxhd: '\u252C',
	boxHU: '\u2569',
	boxHu: '\u2567',
	boxhU: '\u2568',
	boxhu: '\u2534',
	boxminus: '\u229F',
	boxplus: '\u229E',
	boxtimes: '\u22A0',
	boxUL: '\u255D',
	boxUl: '\u255C',
	boxuL: '\u255B',
	boxul: '\u2518',
	boxUR: '\u255A',
	boxUr: '\u2559',
	boxuR: '\u2558',
	boxur: '\u2514',
	boxV: '\u2551',
	boxv: '\u2502',
	boxVH: '\u256C',
	boxVh: '\u256B',
	boxvH: '\u256A',
	boxvh: '\u253C',
	boxVL: '\u2563',
	boxVl: '\u2562',
	boxvL: '\u2561',
	boxvl: '\u2524',
	boxVR: '\u2560',
	boxVr: '\u255F',
	boxvR: '\u255E',
	boxvr: '\u251C',
	bprime: '\u2035',
	Breve: '\u02D8',
	breve: '\u02D8',
	brvbar: '\u00A6',
	Bscr: '\u212C',
	bscr: '\uD835\uDCB7',
	bsemi: '\u204F',
	bsim: '\u223D',
	bsime: '\u22CD',
	bsol: '\u005C',
	bsolb: '\u29C5',
	bsolhsub: '\u27C8',
	bull: '\u2022',
	bullet: '\u2022',
	bump: '\u224E',
	bumpE: '\u2AAE',
	bumpe: '\u224F',
	Bumpeq: '\u224E',
	bumpeq: '\u224F',
	Cacute: '\u0106',
	cacute: '\u0107',
	Cap: '\u22D2',
	cap: '\u2229',
	capand: '\u2A44',
	capbrcup: '\u2A49',
	capcap: '\u2A4B',
	capcup: '\u2A47',
	capdot: '\u2A40',
	CapitalDifferentialD: '\u2145',
	caps: '\u2229\uFE00',
	caret: '\u2041',
	caron: '\u02C7',
	Cayleys: '\u212D',
	ccaps: '\u2A4D',
	Ccaron: '\u010C',
	ccaron: '\u010D',
	Ccedil: '\u00C7',
	ccedil: '\u00E7',
	Ccirc: '\u0108',
	ccirc: '\u0109',
	Cconint: '\u2230',
	ccups: '\u2A4C',
	ccupssm: '\u2A50',
	Cdot: '\u010A',
	cdot: '\u010B',
	cedil: '\u00B8',
	Cedilla: '\u00B8',
	cemptyv: '\u29B2',
	cent: '\u00A2',
	CenterDot: '\u00B7',
	centerdot: '\u00B7',
	Cfr: '\u212D',
	cfr: '\uD835\uDD20',
	CHcy: '\u0427',
	chcy: '\u0447',
	check: '\u2713',
	checkmark: '\u2713',
	Chi: '\u03A7',
	chi: '\u03C7',
	cir: '\u25CB',
	circ: '\u02C6',
	circeq: '\u2257',
	circlearrowleft: '\u21BA',
	circlearrowright: '\u21BB',
	circledast: '\u229B',
	circledcirc: '\u229A',
	circleddash: '\u229D',
	CircleDot: '\u2299',
	circledR: '\u00AE',
	circledS: '\u24C8',
	CircleMinus: '\u2296',
	CirclePlus: '\u2295',
	CircleTimes: '\u2297',
	cirE: '\u29C3',
	cire: '\u2257',
	cirfnint: '\u2A10',
	cirmid: '\u2AEF',
	cirscir: '\u29C2',
	ClockwiseContourIntegral: '\u2232',
	CloseCurlyDoubleQuote: '\u201D',
	CloseCurlyQuote: '\u2019',
	clubs: '\u2663',
	clubsuit: '\u2663',
	Colon: '\u2237',
	colon: '\u003A',
	Colone: '\u2A74',
	colone: '\u2254',
	coloneq: '\u2254',
	comma: '\u002C',
	commat: '\u0040',
	comp: '\u2201',
	compfn: '\u2218',
	complement: '\u2201',
	complexes: '\u2102',
	cong: '\u2245',
	congdot: '\u2A6D',
	Congruent: '\u2261',
	Conint: '\u222F',
	conint: '\u222E',
	ContourIntegral: '\u222E',
	Copf: '\u2102',
	copf: '\uD835\uDD54',
	coprod: '\u2210',
	Coproduct: '\u2210',
	COPY: '\u00A9',
	copy: '\u00A9',
	copysr: '\u2117',
	CounterClockwiseContourIntegral: '\u2233',
	crarr: '\u21B5',
	Cross: '\u2A2F',
	cross: '\u2717',
	Cscr: '\uD835\uDC9E',
	cscr: '\uD835\uDCB8',
	csub: '\u2ACF',
	csube: '\u2AD1',
	csup: '\u2AD0',
	csupe: '\u2AD2',
	ctdot: '\u22EF',
	cudarrl: '\u2938',
	cudarrr: '\u2935',
	cuepr: '\u22DE',
	cuesc: '\u22DF',
	cularr: '\u21B6',
	cularrp: '\u293D',
	Cup: '\u22D3',
	cup: '\u222A',
	cupbrcap: '\u2A48',
	CupCap: '\u224D',
	cupcap: '\u2A46',
	cupcup: '\u2A4A',
	cupdot: '\u228D',
	cupor: '\u2A45',
	cups: '\u222A\uFE00',
	curarr: '\u21B7',
	curarrm: '\u293C',
	curlyeqprec: '\u22DE',
	curlyeqsucc: '\u22DF',
	curlyvee: '\u22CE',
	curlywedge: '\u22CF',
	curren: '\u00A4',
	curvearrowleft: '\u21B6',
	curvearrowright: '\u21B7',
	cuvee: '\u22CE',
	cuwed: '\u22CF',
	cwconint: '\u2232',
	cwint: '\u2231',
	cylcty: '\u232D',
	Dagger: '\u2021',
	dagger: '\u2020',
	daleth: '\u2138',
	Darr: '\u21A1',
	dArr: '\u21D3',
	darr: '\u2193',
	dash: '\u2010',
	Dashv: '\u2AE4',
	dashv: '\u22A3',
	dbkarow: '\u290F',
	dblac: '\u02DD',
	Dcaron: '\u010E',
	dcaron: '\u010F',
	Dcy: '\u0414',
	dcy: '\u0434',
	DD: '\u2145',
	dd: '\u2146',
	ddagger: '\u2021',
	ddarr: '\u21CA',
	DDotrahd: '\u2911',
	ddotseq: '\u2A77',
	deg: '\u00B0',
	Del: '\u2207',
	Delta: '\u0394',
	delta: '\u03B4',
	demptyv: '\u29B1',
	dfisht: '\u297F',
	Dfr: '\uD835\uDD07',
	dfr: '\uD835\uDD21',
	dHar: '\u2965',
	dharl: '\u21C3',
	dharr: '\u21C2',
	DiacriticalAcute: '\u00B4',
	DiacriticalDot: '\u02D9',
	DiacriticalDoubleAcute: '\u02DD',
	DiacriticalGrave: '\u0060',
	DiacriticalTilde: '\u02DC',
	diam: '\u22C4',
	Diamond: '\u22C4',
	diamond: '\u22C4',
	diamondsuit: '\u2666',
	diams: '\u2666',
	die: '\u00A8',
	DifferentialD: '\u2146',
	digamma: '\u03DD',
	disin: '\u22F2',
	div: '\u00F7',
	divide: '\u00F7',
	divideontimes: '\u22C7',
	divonx: '\u22C7',
	DJcy: '\u0402',
	djcy: '\u0452',
	dlcorn: '\u231E',
	dlcrop: '\u230D',
	dollar: '\u0024',
	Dopf: '\uD835\uDD3B',
	dopf: '\uD835\uDD55',
	Dot: '\u00A8',
	dot: '\u02D9',
	DotDot: '\u20DC',
	doteq: '\u2250',
	doteqdot: '\u2251',
	DotEqual: '\u2250',
	dotminus: '\u2238',
	dotplus: '\u2214',
	dotsquare: '\u22A1',
	doublebarwedge: '\u2306',
	DoubleContourIntegral: '\u222F',
	DoubleDot: '\u00A8',
	DoubleDownArrow: '\u21D3',
	DoubleLeftArrow: '\u21D0',
	DoubleLeftRightArrow: '\u21D4',
	DoubleLeftTee: '\u2AE4',
	DoubleLongLeftArrow: '\u27F8',
	DoubleLongLeftRightArrow: '\u27FA',
	DoubleLongRightArrow: '\u27F9',
	DoubleRightArrow: '\u21D2',
	DoubleRightTee: '\u22A8',
	DoubleUpArrow: '\u21D1',
	DoubleUpDownArrow: '\u21D5',
	DoubleVerticalBar: '\u2225',
	DownArrow: '\u2193',
	Downarrow: '\u21D3',
	downarrow: '\u2193',
	DownArrowBar: '\u2913',
	DownArrowUpArrow: '\u21F5',
	DownBreve: '\u0311',
	downdownarrows: '\u21CA',
	downharpoonleft: '\u21C3',
	downharpoonright: '\u21C2',
	DownLeftRightVector: '\u2950',
	DownLeftTeeVector: '\u295E',
	DownLeftVector: '\u21BD',
	DownLeftVectorBar: '\u2956',
	DownRightTeeVector: '\u295F',
	DownRightVector: '\u21C1',
	DownRightVectorBar: '\u2957',
	DownTee: '\u22A4',
	DownTeeArrow: '\u21A7',
	drbkarow: '\u2910',
	drcorn: '\u231F',
	drcrop: '\u230C',
	Dscr: '\uD835\uDC9F',
	dscr: '\uD835\uDCB9',
	DScy: '\u0405',
	dscy: '\u0455',
	dsol: '\u29F6',
	Dstrok: '\u0110',
	dstrok: '\u0111',
	dtdot: '\u22F1',
	dtri: '\u25BF',
	dtrif: '\u25BE',
	duarr: '\u21F5',
	duhar: '\u296F',
	dwangle: '\u29A6',
	DZcy: '\u040F',
	dzcy: '\u045F',
	dzigrarr: '\u27FF',
	Eacute: '\u00C9',
	eacute: '\u00E9',
	easter: '\u2A6E',
	Ecaron: '\u011A',
	ecaron: '\u011B',
	ecir: '\u2256',
	Ecirc: '\u00CA',
	ecirc: '\u00EA',
	ecolon: '\u2255',
	Ecy: '\u042D',
	ecy: '\u044D',
	eDDot: '\u2A77',
	Edot: '\u0116',
	eDot: '\u2251',
	edot: '\u0117',
	ee: '\u2147',
	efDot: '\u2252',
	Efr: '\uD835\uDD08',
	efr: '\uD835\uDD22',
	eg: '\u2A9A',
	Egrave: '\u00C8',
	egrave: '\u00E8',
	egs: '\u2A96',
	egsdot: '\u2A98',
	el: '\u2A99',
	Element: '\u2208',
	elinters: '\u23E7',
	ell: '\u2113',
	els: '\u2A95',
	elsdot: '\u2A97',
	Emacr: '\u0112',
	emacr: '\u0113',
	empty: '\u2205',
	emptyset: '\u2205',
	EmptySmallSquare: '\u25FB',
	emptyv: '\u2205',
	EmptyVerySmallSquare: '\u25AB',
	emsp: '\u2003',
	emsp13: '\u2004',
	emsp14: '\u2005',
	ENG: '\u014A',
	eng: '\u014B',
	ensp: '\u2002',
	Eogon: '\u0118',
	eogon: '\u0119',
	Eopf: '\uD835\uDD3C',
	eopf: '\uD835\uDD56',
	epar: '\u22D5',
	eparsl: '\u29E3',
	eplus: '\u2A71',
	epsi: '\u03B5',
	Epsilon: '\u0395',
	epsilon: '\u03B5',
	epsiv: '\u03F5',
	eqcirc: '\u2256',
	eqcolon: '\u2255',
	eqsim: '\u2242',
	eqslantgtr: '\u2A96',
	eqslantless: '\u2A95',
	Equal: '\u2A75',
	equals: '\u003D',
	EqualTilde: '\u2242',
	equest: '\u225F',
	Equilibrium: '\u21CC',
	equiv: '\u2261',
	equivDD: '\u2A78',
	eqvparsl: '\u29E5',
	erarr: '\u2971',
	erDot: '\u2253',
	Escr: '\u2130',
	escr: '\u212F',
	esdot: '\u2250',
	Esim: '\u2A73',
	esim: '\u2242',
	Eta: '\u0397',
	eta: '\u03B7',
	ETH: '\u00D0',
	eth: '\u00F0',
	Euml: '\u00CB',
	euml: '\u00EB',
	euro: '\u20AC',
	excl: '\u0021',
	exist: '\u2203',
	Exists: '\u2203',
	expectation: '\u2130',
	ExponentialE: '\u2147',
	exponentiale: '\u2147',
	fallingdotseq: '\u2252',
	Fcy: '\u0424',
	fcy: '\u0444',
	female: '\u2640',
	ffilig: '\uFB03',
	fflig: '\uFB00',
	ffllig: '\uFB04',
	Ffr: '\uD835\uDD09',
	ffr: '\uD835\uDD23',
	filig: '\uFB01',
	FilledSmallSquare: '\u25FC',
	FilledVerySmallSquare: '\u25AA',
	fjlig: '\u0066\u006A',
	flat: '\u266D',
	fllig: '\uFB02',
	fltns: '\u25B1',
	fnof: '\u0192',
	Fopf: '\uD835\uDD3D',
	fopf: '\uD835\uDD57',
	ForAll: '\u2200',
	forall: '\u2200',
	fork: '\u22D4',
	forkv: '\u2AD9',
	Fouriertrf: '\u2131',
	fpartint: '\u2A0D',
	frac12: '\u00BD',
	frac13: '\u2153',
	frac14: '\u00BC',
	frac15: '\u2155',
	frac16: '\u2159',
	frac18: '\u215B',
	frac23: '\u2154',
	frac25: '\u2156',
	frac34: '\u00BE',
	frac35: '\u2157',
	frac38: '\u215C',
	frac45: '\u2158',
	frac56: '\u215A',
	frac58: '\u215D',
	frac78: '\u215E',
	frasl: '\u2044',
	frown: '\u2322',
	Fscr: '\u2131',
	fscr: '\uD835\uDCBB',
	gacute: '\u01F5',
	Gamma: '\u0393',
	gamma: '\u03B3',
	Gammad: '\u03DC',
	gammad: '\u03DD',
	gap: '\u2A86',
	Gbreve: '\u011E',
	gbreve: '\u011F',
	Gcedil: '\u0122',
	Gcirc: '\u011C',
	gcirc: '\u011D',
	Gcy: '\u0413',
	gcy: '\u0433',
	Gdot: '\u0120',
	gdot: '\u0121',
	gE: '\u2267',
	ge: '\u2265',
	gEl: '\u2A8C',
	gel: '\u22DB',
	geq: '\u2265',
	geqq: '\u2267',
	geqslant: '\u2A7E',
	ges: '\u2A7E',
	gescc: '\u2AA9',
	gesdot: '\u2A80',
	gesdoto: '\u2A82',
	gesdotol: '\u2A84',
	gesl: '\u22DB\uFE00',
	gesles: '\u2A94',
	Gfr: '\uD835\uDD0A',
	gfr: '\uD835\uDD24',
	Gg: '\u22D9',
	gg: '\u226B',
	ggg: '\u22D9',
	gimel: '\u2137',
	GJcy: '\u0403',
	gjcy: '\u0453',
	gl: '\u2277',
	gla: '\u2AA5',
	glE: '\u2A92',
	glj: '\u2AA4',
	gnap: '\u2A8A',
	gnapprox: '\u2A8A',
	gnE: '\u2269',
	gne: '\u2A88',
	gneq: '\u2A88',
	gneqq: '\u2269',
	gnsim: '\u22E7',
	Gopf: '\uD835\uDD3E',
	gopf: '\uD835\uDD58',
	grave: '\u0060',
	GreaterEqual: '\u2265',
	GreaterEqualLess: '\u22DB',
	GreaterFullEqual: '\u2267',
	GreaterGreater: '\u2AA2',
	GreaterLess: '\u2277',
	GreaterSlantEqual: '\u2A7E',
	GreaterTilde: '\u2273',
	Gscr: '\uD835\uDCA2',
	gscr: '\u210A',
	gsim: '\u2273',
	gsime: '\u2A8E',
	gsiml: '\u2A90',
	Gt: '\u226B',
	GT: '\u003E',
	gt: '\u003E',
	gtcc: '\u2AA7',
	gtcir: '\u2A7A',
	gtdot: '\u22D7',
	gtlPar: '\u2995',
	gtquest: '\u2A7C',
	gtrapprox: '\u2A86',
	gtrarr: '\u2978',
	gtrdot: '\u22D7',
	gtreqless: '\u22DB',
	gtreqqless: '\u2A8C',
	gtrless: '\u2277',
	gtrsim: '\u2273',
	gvertneqq: '\u2269\uFE00',
	gvnE: '\u2269\uFE00',
	Hacek: '\u02C7',
	hairsp: '\u200A',
	half: '\u00BD',
	hamilt: '\u210B',
	HARDcy: '\u042A',
	hardcy: '\u044A',
	hArr: '\u21D4',
	harr: '\u2194',
	harrcir: '\u2948',
	harrw: '\u21AD',
	Hat: '\u005E',
	hbar: '\u210F',
	Hcirc: '\u0124',
	hcirc: '\u0125',
	hearts: '\u2665',
	heartsuit: '\u2665',
	hellip: '\u2026',
	hercon: '\u22B9',
	Hfr: '\u210C',
	hfr: '\uD835\uDD25',
	HilbertSpace: '\u210B',
	hksearow: '\u2925',
	hkswarow: '\u2926',
	hoarr: '\u21FF',
	homtht: '\u223B',
	hookleftarrow: '\u21A9',
	hookrightarrow: '\u21AA',
	Hopf: '\u210D',
	hopf: '\uD835\uDD59',
	horbar: '\u2015',
	HorizontalLine: '\u2500',
	Hscr: '\u210B',
	hscr: '\uD835\uDCBD',
	hslash: '\u210F',
	Hstrok: '\u0126',
	hstrok: '\u0127',
	HumpDownHump: '\u224E',
	HumpEqual: '\u224F',
	hybull: '\u2043',
	hyphen: '\u2010',
	Iacute: '\u00CD',
	iacute: '\u00ED',
	ic: '\u2063',
	Icirc: '\u00CE',
	icirc: '\u00EE',
	Icy: '\u0418',
	icy: '\u0438',
	Idot: '\u0130',
	IEcy: '\u0415',
	iecy: '\u0435',
	iexcl: '\u00A1',
	iff: '\u21D4',
	Ifr: '\u2111',
	ifr: '\uD835\uDD26',
	Igrave: '\u00CC',
	igrave: '\u00EC',
	ii: '\u2148',
	iiiint: '\u2A0C',
	iiint: '\u222D',
	iinfin: '\u29DC',
	iiota: '\u2129',
	IJlig: '\u0132',
	ijlig: '\u0133',
	Im: '\u2111',
	Imacr: '\u012A',
	imacr: '\u012B',
	image: '\u2111',
	ImaginaryI: '\u2148',
	imagline: '\u2110',
	imagpart: '\u2111',
	imath: '\u0131',
	imof: '\u22B7',
	imped: '\u01B5',
	Implies: '\u21D2',
	in: '\u2208',
	incare: '\u2105',
	infin: '\u221E',
	infintie: '\u29DD',
	inodot: '\u0131',
	Int: '\u222C',
	int: '\u222B',
	intcal: '\u22BA',
	integers: '\u2124',
	Integral: '\u222B',
	intercal: '\u22BA',
	Intersection: '\u22C2',
	intlarhk: '\u2A17',
	intprod: '\u2A3C',
	InvisibleComma: '\u2063',
	InvisibleTimes: '\u2062',
	IOcy: '\u0401',
	iocy: '\u0451',
	Iogon: '\u012E',
	iogon: '\u012F',
	Iopf: '\uD835\uDD40',
	iopf: '\uD835\uDD5A',
	Iota: '\u0399',
	iota: '\u03B9',
	iprod: '\u2A3C',
	iquest: '\u00BF',
	Iscr: '\u2110',
	iscr: '\uD835\uDCBE',
	isin: '\u2208',
	isindot: '\u22F5',
	isinE: '\u22F9',
	isins: '\u22F4',
	isinsv: '\u22F3',
	isinv: '\u2208',
	it: '\u2062',
	Itilde: '\u0128',
	itilde: '\u0129',
	Iukcy: '\u0406',
	iukcy: '\u0456',
	Iuml: '\u00CF',
	iuml: '\u00EF',
	Jcirc: '\u0134',
	jcirc: '\u0135',
	Jcy: '\u0419',
	jcy: '\u0439',
	Jfr: '\uD835\uDD0D',
	jfr: '\uD835\uDD27',
	jmath: '\u0237',
	Jopf: '\uD835\uDD41',
	jopf: '\uD835\uDD5B',
	Jscr: '\uD835\uDCA5',
	jscr: '\uD835\uDCBF',
	Jsercy: '\u0408',
	jsercy: '\u0458',
	Jukcy: '\u0404',
	jukcy: '\u0454',
	Kappa: '\u039A',
	kappa: '\u03BA',
	kappav: '\u03F0',
	Kcedil: '\u0136',
	kcedil: '\u0137',
	Kcy: '\u041A',
	kcy: '\u043A',
	Kfr: '\uD835\uDD0E',
	kfr: '\uD835\uDD28',
	kgreen: '\u0138',
	KHcy: '\u0425',
	khcy: '\u0445',
	KJcy: '\u040C',
	kjcy: '\u045C',
	Kopf: '\uD835\uDD42',
	kopf: '\uD835\uDD5C',
	Kscr: '\uD835\uDCA6',
	kscr: '\uD835\uDCC0',
	lAarr: '\u21DA',
	Lacute: '\u0139',
	lacute: '\u013A',
	laemptyv: '\u29B4',
	lagran: '\u2112',
	Lambda: '\u039B',
	lambda: '\u03BB',
	Lang: '\u27EA',
	lang: '\u27E8',
	langd: '\u2991',
	langle: '\u27E8',
	lap: '\u2A85',
	Laplacetrf: '\u2112',
	laquo: '\u00AB',
	Larr: '\u219E',
	lArr: '\u21D0',
	larr: '\u2190',
	larrb: '\u21E4',
	larrbfs: '\u291F',
	larrfs: '\u291D',
	larrhk: '\u21A9',
	larrlp: '\u21AB',
	larrpl: '\u2939',
	larrsim: '\u2973',
	larrtl: '\u21A2',
	lat: '\u2AAB',
	lAtail: '\u291B',
	latail: '\u2919',
	late: '\u2AAD',
	lates: '\u2AAD\uFE00',
	lBarr: '\u290E',
	lbarr: '\u290C',
	lbbrk: '\u2772',
	lbrace: '\u007B',
	lbrack: '\u005B',
	lbrke: '\u298B',
	lbrksld: '\u298F',
	lbrkslu: '\u298D',
	Lcaron: '\u013D',
	lcaron: '\u013E',
	Lcedil: '\u013B',
	lcedil: '\u013C',
	lceil: '\u2308',
	lcub: '\u007B',
	Lcy: '\u041B',
	lcy: '\u043B',
	ldca: '\u2936',
	ldquo: '\u201C',
	ldquor: '\u201E',
	ldrdhar: '\u2967',
	ldrushar: '\u294B',
	ldsh: '\u21B2',
	lE: '\u2266',
	le: '\u2264',
	LeftAngleBracket: '\u27E8',
	LeftArrow: '\u2190',
	Leftarrow: '\u21D0',
	leftarrow: '\u2190',
	LeftArrowBar: '\u21E4',
	LeftArrowRightArrow: '\u21C6',
	leftarrowtail: '\u21A2',
	LeftCeiling: '\u2308',
	LeftDoubleBracket: '\u27E6',
	LeftDownTeeVector: '\u2961',
	LeftDownVector: '\u21C3',
	LeftDownVectorBar: '\u2959',
	LeftFloor: '\u230A',
	leftharpoondown: '\u21BD',
	leftharpoonup: '\u21BC',
	leftleftarrows: '\u21C7',
	LeftRightArrow: '\u2194',
	Leftrightarrow: '\u21D4',
	leftrightarrow: '\u2194',
	leftrightarrows: '\u21C6',
	leftrightharpoons: '\u21CB',
	leftrightsquigarrow: '\u21AD',
	LeftRightVector: '\u294E',
	LeftTee: '\u22A3',
	LeftTeeArrow: '\u21A4',
	LeftTeeVector: '\u295A',
	leftthreetimes: '\u22CB',
	LeftTriangle: '\u22B2',
	LeftTriangleBar: '\u29CF',
	LeftTriangleEqual: '\u22B4',
	LeftUpDownVector: '\u2951',
	LeftUpTeeVector: '\u2960',
	LeftUpVector: '\u21BF',
	LeftUpVectorBar: '\u2958',
	LeftVector: '\u21BC',
	LeftVectorBar: '\u2952',
	lEg: '\u2A8B',
	leg: '\u22DA',
	leq: '\u2264',
	leqq: '\u2266',
	leqslant: '\u2A7D',
	les: '\u2A7D',
	lescc: '\u2AA8',
	lesdot: '\u2A7F',
	lesdoto: '\u2A81',
	lesdotor: '\u2A83',
	lesg: '\u22DA\uFE00',
	lesges: '\u2A93',
	lessapprox: '\u2A85',
	lessdot: '\u22D6',
	lesseqgtr: '\u22DA',
	lesseqqgtr: '\u2A8B',
	LessEqualGreater: '\u22DA',
	LessFullEqual: '\u2266',
	LessGreater: '\u2276',
	lessgtr: '\u2276',
	LessLess: '\u2AA1',
	lesssim: '\u2272',
	LessSlantEqual: '\u2A7D',
	LessTilde: '\u2272',
	lfisht: '\u297C',
	lfloor: '\u230A',
	Lfr: '\uD835\uDD0F',
	lfr: '\uD835\uDD29',
	lg: '\u2276',
	lgE: '\u2A91',
	lHar: '\u2962',
	lhard: '\u21BD',
	lharu: '\u21BC',
	lharul: '\u296A',
	lhblk: '\u2584',
	LJcy: '\u0409',
	ljcy: '\u0459',
	Ll: '\u22D8',
	ll: '\u226A',
	llarr: '\u21C7',
	llcorner: '\u231E',
	Lleftarrow: '\u21DA',
	llhard: '\u296B',
	lltri: '\u25FA',
	Lmidot: '\u013F',
	lmidot: '\u0140',
	lmoust: '\u23B0',
	lmoustache: '\u23B0',
	lnap: '\u2A89',
	lnapprox: '\u2A89',
	lnE: '\u2268',
	lne: '\u2A87',
	lneq: '\u2A87',
	lneqq: '\u2268',
	lnsim: '\u22E6',
	loang: '\u27EC',
	loarr: '\u21FD',
	lobrk: '\u27E6',
	LongLeftArrow: '\u27F5',
	Longleftarrow: '\u27F8',
	longleftarrow: '\u27F5',
	LongLeftRightArrow: '\u27F7',
	Longleftrightarrow: '\u27FA',
	longleftrightarrow: '\u27F7',
	longmapsto: '\u27FC',
	LongRightArrow: '\u27F6',
	Longrightarrow: '\u27F9',
	longrightarrow: '\u27F6',
	looparrowleft: '\u21AB',
	looparrowright: '\u21AC',
	lopar: '\u2985',
	Lopf: '\uD835\uDD43',
	lopf: '\uD835\uDD5D',
	loplus: '\u2A2D',
	lotimes: '\u2A34',
	lowast: '\u2217',
	lowbar: '\u005F',
	LowerLeftArrow: '\u2199',
	LowerRightArrow: '\u2198',
	loz: '\u25CA',
	lozenge: '\u25CA',
	lozf: '\u29EB',
	lpar: '\u0028',
	lparlt: '\u2993',
	lrarr: '\u21C6',
	lrcorner: '\u231F',
	lrhar: '\u21CB',
	lrhard: '\u296D',
	lrm: '\u200E',
	lrtri: '\u22BF',
	lsaquo: '\u2039',
	Lscr: '\u2112',
	lscr: '\uD835\uDCC1',
	Lsh: '\u21B0',
	lsh: '\u21B0',
	lsim: '\u2272',
	lsime: '\u2A8D',
	lsimg: '\u2A8F',
	lsqb: '\u005B',
	lsquo: '\u2018',
	lsquor: '\u201A',
	Lstrok: '\u0141',
	lstrok: '\u0142',
	Lt: '\u226A',
	LT: '\u003C',
	lt: '\u003C',
	ltcc: '\u2AA6',
	ltcir: '\u2A79',
	ltdot: '\u22D6',
	lthree: '\u22CB',
	ltimes: '\u22C9',
	ltlarr: '\u2976',
	ltquest: '\u2A7B',
	ltri: '\u25C3',
	ltrie: '\u22B4',
	ltrif: '\u25C2',
	ltrPar: '\u2996',
	lurdshar: '\u294A',
	luruhar: '\u2966',
	lvertneqq: '\u2268\uFE00',
	lvnE: '\u2268\uFE00',
	macr: '\u00AF',
	male: '\u2642',
	malt: '\u2720',
	maltese: '\u2720',
	Map: '\u2905',
	map: '\u21A6',
	mapsto: '\u21A6',
	mapstodown: '\u21A7',
	mapstoleft: '\u21A4',
	mapstoup: '\u21A5',
	marker: '\u25AE',
	mcomma: '\u2A29',
	Mcy: '\u041C',
	mcy: '\u043C',
	mdash: '\u2014',
	mDDot: '\u223A',
	measuredangle: '\u2221',
	MediumSpace: '\u205F',
	Mellintrf: '\u2133',
	Mfr: '\uD835\uDD10',
	mfr: '\uD835\uDD2A',
	mho: '\u2127',
	micro: '\u00B5',
	mid: '\u2223',
	midast: '\u002A',
	midcir: '\u2AF0',
	middot: '\u00B7',
	minus: '\u2212',
	minusb: '\u229F',
	minusd: '\u2238',
	minusdu: '\u2A2A',
	MinusPlus: '\u2213',
	mlcp: '\u2ADB',
	mldr: '\u2026',
	mnplus: '\u2213',
	models: '\u22A7',
	Mopf: '\uD835\uDD44',
	mopf: '\uD835\uDD5E',
	mp: '\u2213',
	Mscr: '\u2133',
	mscr: '\uD835\uDCC2',
	mstpos: '\u223E',
	Mu: '\u039C',
	mu: '\u03BC',
	multimap: '\u22B8',
	mumap: '\u22B8',
	nabla: '\u2207',
	Nacute: '\u0143',
	nacute: '\u0144',
	nang: '\u2220\u20D2',
	nap: '\u2249',
	napE: '\u2A70\u0338',
	napid: '\u224B\u0338',
	napos: '\u0149',
	napprox: '\u2249',
	natur: '\u266E',
	natural: '\u266E',
	naturals: '\u2115',
	nbsp: '\u00A0',
	nbump: '\u224E\u0338',
	nbumpe: '\u224F\u0338',
	ncap: '\u2A43',
	Ncaron: '\u0147',
	ncaron: '\u0148',
	Ncedil: '\u0145',
	ncedil: '\u0146',
	ncong: '\u2247',
	ncongdot: '\u2A6D\u0338',
	ncup: '\u2A42',
	Ncy: '\u041D',
	ncy: '\u043D',
	ndash: '\u2013',
	ne: '\u2260',
	nearhk: '\u2924',
	neArr: '\u21D7',
	nearr: '\u2197',
	nearrow: '\u2197',
	nedot: '\u2250\u0338',
	NegativeMediumSpace: '\u200B',
	NegativeThickSpace: '\u200B',
	NegativeThinSpace: '\u200B',
	NegativeVeryThinSpace: '\u200B',
	nequiv: '\u2262',
	nesear: '\u2928',
	nesim: '\u2242\u0338',
	NestedGreaterGreater: '\u226B',
	NestedLessLess: '\u226A',
	NewLine: '\u000A',
	nexist: '\u2204',
	nexists: '\u2204',
	Nfr: '\uD835\uDD11',
	nfr: '\uD835\uDD2B',
	ngE: '\u2267\u0338',
	nge: '\u2271',
	ngeq: '\u2271',
	ngeqq: '\u2267\u0338',
	ngeqslant: '\u2A7E\u0338',
	nges: '\u2A7E\u0338',
	nGg: '\u22D9\u0338',
	ngsim: '\u2275',
	nGt: '\u226B\u20D2',
	ngt: '\u226F',
	ngtr: '\u226F',
	nGtv: '\u226B\u0338',
	nhArr: '\u21CE',
	nharr: '\u21AE',
	nhpar: '\u2AF2',
	ni: '\u220B',
	nis: '\u22FC',
	nisd: '\u22FA',
	niv: '\u220B',
	NJcy: '\u040A',
	njcy: '\u045A',
	nlArr: '\u21CD',
	nlarr: '\u219A',
	nldr: '\u2025',
	nlE: '\u2266\u0338',
	nle: '\u2270',
	nLeftarrow: '\u21CD',
	nleftarrow: '\u219A',
	nLeftrightarrow: '\u21CE',
	nleftrightarrow: '\u21AE',
	nleq: '\u2270',
	nleqq: '\u2266\u0338',
	nleqslant: '\u2A7D\u0338',
	nles: '\u2A7D\u0338',
	nless: '\u226E',
	nLl: '\u22D8\u0338',
	nlsim: '\u2274',
	nLt: '\u226A\u20D2',
	nlt: '\u226E',
	nltri: '\u22EA',
	nltrie: '\u22EC',
	nLtv: '\u226A\u0338',
	nmid: '\u2224',
	NoBreak: '\u2060',
	NonBreakingSpace: '\u00A0',
	Nopf: '\u2115',
	nopf: '\uD835\uDD5F',
	Not: '\u2AEC',
	not: '\u00AC',
	NotCongruent: '\u2262',
	NotCupCap: '\u226D',
	NotDoubleVerticalBar: '\u2226',
	NotElement: '\u2209',
	NotEqual: '\u2260',
	NotEqualTilde: '\u2242\u0338',
	NotExists: '\u2204',
	NotGreater: '\u226F',
	NotGreaterEqual: '\u2271',
	NotGreaterFullEqual: '\u2267\u0338',
	NotGreaterGreater: '\u226B\u0338',
	NotGreaterLess: '\u2279',
	NotGreaterSlantEqual: '\u2A7E\u0338',
	NotGreaterTilde: '\u2275',
	NotHumpDownHump: '\u224E\u0338',
	NotHumpEqual: '\u224F\u0338',
	notin: '\u2209',
	notindot: '\u22F5\u0338',
	notinE: '\u22F9\u0338',
	notinva: '\u2209',
	notinvb: '\u22F7',
	notinvc: '\u22F6',
	NotLeftTriangle: '\u22EA',
	NotLeftTriangleBar: '\u29CF\u0338',
	NotLeftTriangleEqual: '\u22EC',
	NotLess: '\u226E',
	NotLessEqual: '\u2270',
	NotLessGreater: '\u2278',
	NotLessLess: '\u226A\u0338',
	NotLessSlantEqual: '\u2A7D\u0338',
	NotLessTilde: '\u2274',
	NotNestedGreaterGreater: '\u2AA2\u0338',
	NotNestedLessLess: '\u2AA1\u0338',
	notni: '\u220C',
	notniva: '\u220C',
	notnivb: '\u22FE',
	notnivc: '\u22FD',
	NotPrecedes: '\u2280',
	NotPrecedesEqual: '\u2AAF\u0338',
	NotPrecedesSlantEqual: '\u22E0',
	NotReverseElement: '\u220C',
	NotRightTriangle: '\u22EB',
	NotRightTriangleBar: '\u29D0\u0338',
	NotRightTriangleEqual: '\u22ED',
	NotSquareSubset: '\u228F\u0338',
	NotSquareSubsetEqual: '\u22E2',
	NotSquareSuperset: '\u2290\u0338',
	NotSquareSupersetEqual: '\u22E3',
	NotSubset: '\u2282\u20D2',
	NotSubsetEqual: '\u2288',
	NotSucceeds: '\u2281',
	NotSucceedsEqual: '\u2AB0\u0338',
	NotSucceedsSlantEqual: '\u22E1',
	NotSucceedsTilde: '\u227F\u0338',
	NotSuperset: '\u2283\u20D2',
	NotSupersetEqual: '\u2289',
	NotTilde: '\u2241',
	NotTildeEqual: '\u2244',
	NotTildeFullEqual: '\u2247',
	NotTildeTilde: '\u2249',
	NotVerticalBar: '\u2224',
	npar: '\u2226',
	nparallel: '\u2226',
	nparsl: '\u2AFD\u20E5',
	npart: '\u2202\u0338',
	npolint: '\u2A14',
	npr: '\u2280',
	nprcue: '\u22E0',
	npre: '\u2AAF\u0338',
	nprec: '\u2280',
	npreceq: '\u2AAF\u0338',
	nrArr: '\u21CF',
	nrarr: '\u219B',
	nrarrc: '\u2933\u0338',
	nrarrw: '\u219D\u0338',
	nRightarrow: '\u21CF',
	nrightarrow: '\u219B',
	nrtri: '\u22EB',
	nrtrie: '\u22ED',
	nsc: '\u2281',
	nsccue: '\u22E1',
	nsce: '\u2AB0\u0338',
	Nscr: '\uD835\uDCA9',
	nscr: '\uD835\uDCC3',
	nshortmid: '\u2224',
	nshortparallel: '\u2226',
	nsim: '\u2241',
	nsime: '\u2244',
	nsimeq: '\u2244',
	nsmid: '\u2224',
	nspar: '\u2226',
	nsqsube: '\u22E2',
	nsqsupe: '\u22E3',
	nsub: '\u2284',
	nsubE: '\u2AC5\u0338',
	nsube: '\u2288',
	nsubset: '\u2282\u20D2',
	nsubseteq: '\u2288',
	nsubseteqq: '\u2AC5\u0338',
	nsucc: '\u2281',
	nsucceq: '\u2AB0\u0338',
	nsup: '\u2285',
	nsupE: '\u2AC6\u0338',
	nsupe: '\u2289',
	nsupset: '\u2283\u20D2',
	nsupseteq: '\u2289',
	nsupseteqq: '\u2AC6\u0338',
	ntgl: '\u2279',
	Ntilde: '\u00D1',
	ntilde: '\u00F1',
	ntlg: '\u2278',
	ntriangleleft: '\u22EA',
	ntrianglelefteq: '\u22EC',
	ntriangleright: '\u22EB',
	ntrianglerighteq: '\u22ED',
	Nu: '\u039D',
	nu: '\u03BD',
	num: '\u0023',
	numero: '\u2116',
	numsp: '\u2007',
	nvap: '\u224D\u20D2',
	nVDash: '\u22AF',
	nVdash: '\u22AE',
	nvDash: '\u22AD',
	nvdash: '\u22AC',
	nvge: '\u2265\u20D2',
	nvgt: '\u003E\u20D2',
	nvHarr: '\u2904',
	nvinfin: '\u29DE',
	nvlArr: '\u2902',
	nvle: '\u2264\u20D2',
	nvlt: '\u003C\u20D2',
	nvltrie: '\u22B4\u20D2',
	nvrArr: '\u2903',
	nvrtrie: '\u22B5\u20D2',
	nvsim: '\u223C\u20D2',
	nwarhk: '\u2923',
	nwArr: '\u21D6',
	nwarr: '\u2196',
	nwarrow: '\u2196',
	nwnear: '\u2927',
	Oacute: '\u00D3',
	oacute: '\u00F3',
	oast: '\u229B',
	ocir: '\u229A',
	Ocirc: '\u00D4',
	ocirc: '\u00F4',
	Ocy: '\u041E',
	ocy: '\u043E',
	odash: '\u229D',
	Odblac: '\u0150',
	odblac: '\u0151',
	odiv: '\u2A38',
	odot: '\u2299',
	odsold: '\u29BC',
	OElig: '\u0152',
	oelig: '\u0153',
	ofcir: '\u29BF',
	Ofr: '\uD835\uDD12',
	ofr: '\uD835\uDD2C',
	ogon: '\u02DB',
	Ograve: '\u00D2',
	ograve: '\u00F2',
	ogt: '\u29C1',
	ohbar: '\u29B5',
	ohm: '\u03A9',
	oint: '\u222E',
	olarr: '\u21BA',
	olcir: '\u29BE',
	olcross: '\u29BB',
	oline: '\u203E',
	olt: '\u29C0',
	Omacr: '\u014C',
	omacr: '\u014D',
	Omega: '\u03A9',
	omega: '\u03C9',
	Omicron: '\u039F',
	omicron: '\u03BF',
	omid: '\u29B6',
	ominus: '\u2296',
	Oopf: '\uD835\uDD46',
	oopf: '\uD835\uDD60',
	opar: '\u29B7',
	OpenCurlyDoubleQuote: '\u201C',
	OpenCurlyQuote: '\u2018',
	operp: '\u29B9',
	oplus: '\u2295',
	Or: '\u2A54',
	or: '\u2228',
	orarr: '\u21BB',
	ord: '\u2A5D',
	order: '\u2134',
	orderof: '\u2134',
	ordf: '\u00AA',
	ordm: '\u00BA',
	origof: '\u22B6',
	oror: '\u2A56',
	orslope: '\u2A57',
	orv: '\u2A5B',
	oS: '\u24C8',
	Oscr: '\uD835\uDCAA',
	oscr: '\u2134',
	Oslash: '\u00D8',
	oslash: '\u00F8',
	osol: '\u2298',
	Otilde: '\u00D5',
	otilde: '\u00F5',
	Otimes: '\u2A37',
	otimes: '\u2297',
	otimesas: '\u2A36',
	Ouml: '\u00D6',
	ouml: '\u00F6',
	ovbar: '\u233D',
	OverBar: '\u203E',
	OverBrace: '\u23DE',
	OverBracket: '\u23B4',
	OverParenthesis: '\u23DC',
	par: '\u2225',
	para: '\u00B6',
	parallel: '\u2225',
	parsim: '\u2AF3',
	parsl: '\u2AFD',
	part: '\u2202',
	PartialD: '\u2202',
	Pcy: '\u041F',
	pcy: '\u043F',
	percnt: '\u0025',
	period: '\u002E',
	permil: '\u2030',
	perp: '\u22A5',
	pertenk: '\u2031',
	Pfr: '\uD835\uDD13',
	pfr: '\uD835\uDD2D',
	Phi: '\u03A6',
	phi: '\u03C6',
	phiv: '\u03D5',
	phmmat: '\u2133',
	phone: '\u260E',
	Pi: '\u03A0',
	pi: '\u03C0',
	pitchfork: '\u22D4',
	piv: '\u03D6',
	planck: '\u210F',
	planckh: '\u210E',
	plankv: '\u210F',
	plus: '\u002B',
	plusacir: '\u2A23',
	plusb: '\u229E',
	pluscir: '\u2A22',
	plusdo: '\u2214',
	plusdu: '\u2A25',
	pluse: '\u2A72',
	PlusMinus: '\u00B1',
	plusmn: '\u00B1',
	plussim: '\u2A26',
	plustwo: '\u2A27',
	pm: '\u00B1',
	Poincareplane: '\u210C',
	pointint: '\u2A15',
	Popf: '\u2119',
	popf: '\uD835\uDD61',
	pound: '\u00A3',
	Pr: '\u2ABB',
	pr: '\u227A',
	prap: '\u2AB7',
	prcue: '\u227C',
	prE: '\u2AB3',
	pre: '\u2AAF',
	prec: '\u227A',
	precapprox: '\u2AB7',
	preccurlyeq: '\u227C',
	Precedes: '\u227A',
	PrecedesEqual: '\u2AAF',
	PrecedesSlantEqual: '\u227C',
	PrecedesTilde: '\u227E',
	preceq: '\u2AAF',
	precnapprox: '\u2AB9',
	precneqq: '\u2AB5',
	precnsim: '\u22E8',
	precsim: '\u227E',
	Prime: '\u2033',
	prime: '\u2032',
	primes: '\u2119',
	prnap: '\u2AB9',
	prnE: '\u2AB5',
	prnsim: '\u22E8',
	prod: '\u220F',
	Product: '\u220F',
	profalar: '\u232E',
	profline: '\u2312',
	profsurf: '\u2313',
	prop: '\u221D',
	Proportion: '\u2237',
	Proportional: '\u221D',
	propto: '\u221D',
	prsim: '\u227E',
	prurel: '\u22B0',
	Pscr: '\uD835\uDCAB',
	pscr: '\uD835\uDCC5',
	Psi: '\u03A8',
	psi: '\u03C8',
	puncsp: '\u2008',
	Qfr: '\uD835\uDD14',
	qfr: '\uD835\uDD2E',
	qint: '\u2A0C',
	Qopf: '\u211A',
	qopf: '\uD835\uDD62',
	qprime: '\u2057',
	Qscr: '\uD835\uDCAC',
	qscr: '\uD835\uDCC6',
	quaternions: '\u210D',
	quatint: '\u2A16',
	quest: '\u003F',
	questeq: '\u225F',
	QUOT: '\u0022',
	quot: '\u0022',
	rAarr: '\u21DB',
	race: '\u223D\u0331',
	Racute: '\u0154',
	racute: '\u0155',
	radic: '\u221A',
	raemptyv: '\u29B3',
	Rang: '\u27EB',
	rang: '\u27E9',
	rangd: '\u2992',
	range: '\u29A5',
	rangle: '\u27E9',
	raquo: '\u00BB',
	Rarr: '\u21A0',
	rArr: '\u21D2',
	rarr: '\u2192',
	rarrap: '\u2975',
	rarrb: '\u21E5',
	rarrbfs: '\u2920',
	rarrc: '\u2933',
	rarrfs: '\u291E',
	rarrhk: '\u21AA',
	rarrlp: '\u21AC',
	rarrpl: '\u2945',
	rarrsim: '\u2974',
	Rarrtl: '\u2916',
	rarrtl: '\u21A3',
	rarrw: '\u219D',
	rAtail: '\u291C',
	ratail: '\u291A',
	ratio: '\u2236',
	rationals: '\u211A',
	RBarr: '\u2910',
	rBarr: '\u290F',
	rbarr: '\u290D',
	rbbrk: '\u2773',
	rbrace: '\u007D',
	rbrack: '\u005D',
	rbrke: '\u298C',
	rbrksld: '\u298E',
	rbrkslu: '\u2990',
	Rcaron: '\u0158',
	rcaron: '\u0159',
	Rcedil: '\u0156',
	rcedil: '\u0157',
	rceil: '\u2309',
	rcub: '\u007D',
	Rcy: '\u0420',
	rcy: '\u0440',
	rdca: '\u2937',
	rdldhar: '\u2969',
	rdquo: '\u201D',
	rdquor: '\u201D',
	rdsh: '\u21B3',
	Re: '\u211C',
	real: '\u211C',
	realine: '\u211B',
	realpart: '\u211C',
	reals: '\u211D',
	rect: '\u25AD',
	REG: '\u00AE',
	reg: '\u00AE',
	ReverseElement: '\u220B',
	ReverseEquilibrium: '\u21CB',
	ReverseUpEquilibrium: '\u296F',
	rfisht: '\u297D',
	rfloor: '\u230B',
	Rfr: '\u211C',
	rfr: '\uD835\uDD2F',
	rHar: '\u2964',
	rhard: '\u21C1',
	rharu: '\u21C0',
	rharul: '\u296C',
	Rho: '\u03A1',
	rho: '\u03C1',
	rhov: '\u03F1',
	RightAngleBracket: '\u27E9',
	RightArrow: '\u2192',
	Rightarrow: '\u21D2',
	rightarrow: '\u2192',
	RightArrowBar: '\u21E5',
	RightArrowLeftArrow: '\u21C4',
	rightarrowtail: '\u21A3',
	RightCeiling: '\u2309',
	RightDoubleBracket: '\u27E7',
	RightDownTeeVector: '\u295D',
	RightDownVector: '\u21C2',
	RightDownVectorBar: '\u2955',
	RightFloor: '\u230B',
	rightharpoondown: '\u21C1',
	rightharpoonup: '\u21C0',
	rightleftarrows: '\u21C4',
	rightleftharpoons: '\u21CC',
	rightrightarrows: '\u21C9',
	rightsquigarrow: '\u219D',
	RightTee: '\u22A2',
	RightTeeArrow: '\u21A6',
	RightTeeVector: '\u295B',
	rightthreetimes: '\u22CC',
	RightTriangle: '\u22B3',
	RightTriangleBar: '\u29D0',
	RightTriangleEqual: '\u22B5',
	RightUpDownVector: '\u294F',
	RightUpTeeVector: '\u295C',
	RightUpVector: '\u21BE',
	RightUpVectorBar: '\u2954',
	RightVector: '\u21C0',
	RightVectorBar: '\u2953',
	ring: '\u02DA',
	risingdotseq: '\u2253',
	rlarr: '\u21C4',
	rlhar: '\u21CC',
	rlm: '\u200F',
	rmoust: '\u23B1',
	rmoustache: '\u23B1',
	rnmid: '\u2AEE',
	roang: '\u27ED',
	roarr: '\u21FE',
	robrk: '\u27E7',
	ropar: '\u2986',
	Ropf: '\u211D',
	ropf: '\uD835\uDD63',
	roplus: '\u2A2E',
	rotimes: '\u2A35',
	RoundImplies: '\u2970',
	rpar: '\u0029',
	rpargt: '\u2994',
	rppolint: '\u2A12',
	rrarr: '\u21C9',
	Rrightarrow: '\u21DB',
	rsaquo: '\u203A',
	Rscr: '\u211B',
	rscr: '\uD835\uDCC7',
	Rsh: '\u21B1',
	rsh: '\u21B1',
	rsqb: '\u005D',
	rsquo: '\u2019',
	rsquor: '\u2019',
	rthree: '\u22CC',
	rtimes: '\u22CA',
	rtri: '\u25B9',
	rtrie: '\u22B5',
	rtrif: '\u25B8',
	rtriltri: '\u29CE',
	RuleDelayed: '\u29F4',
	ruluhar: '\u2968',
	rx: '\u211E',
	Sacute: '\u015A',
	sacute: '\u015B',
	sbquo: '\u201A',
	Sc: '\u2ABC',
	sc: '\u227B',
	scap: '\u2AB8',
	Scaron: '\u0160',
	scaron: '\u0161',
	sccue: '\u227D',
	scE: '\u2AB4',
	sce: '\u2AB0',
	Scedil: '\u015E',
	scedil: '\u015F',
	Scirc: '\u015C',
	scirc: '\u015D',
	scnap: '\u2ABA',
	scnE: '\u2AB6',
	scnsim: '\u22E9',
	scpolint: '\u2A13',
	scsim: '\u227F',
	Scy: '\u0421',
	scy: '\u0441',
	sdot: '\u22C5',
	sdotb: '\u22A1',
	sdote: '\u2A66',
	searhk: '\u2925',
	seArr: '\u21D8',
	searr: '\u2198',
	searrow: '\u2198',
	sect: '\u00A7',
	semi: '\u003B',
	seswar: '\u2929',
	setminus: '\u2216',
	setmn: '\u2216',
	sext: '\u2736',
	Sfr: '\uD835\uDD16',
	sfr: '\uD835\uDD30',
	sfrown: '\u2322',
	sharp: '\u266F',
	SHCHcy: '\u0429',
	shchcy: '\u0449',
	SHcy: '\u0428',
	shcy: '\u0448',
	ShortDownArrow: '\u2193',
	ShortLeftArrow: '\u2190',
	shortmid: '\u2223',
	shortparallel: '\u2225',
	ShortRightArrow: '\u2192',
	ShortUpArrow: '\u2191',
	shy: '\u00AD',
	Sigma: '\u03A3',
	sigma: '\u03C3',
	sigmaf: '\u03C2',
	sigmav: '\u03C2',
	sim: '\u223C',
	simdot: '\u2A6A',
	sime: '\u2243',
	simeq: '\u2243',
	simg: '\u2A9E',
	simgE: '\u2AA0',
	siml: '\u2A9D',
	simlE: '\u2A9F',
	simne: '\u2246',
	simplus: '\u2A24',
	simrarr: '\u2972',
	slarr: '\u2190',
	SmallCircle: '\u2218',
	smallsetminus: '\u2216',
	smashp: '\u2A33',
	smeparsl: '\u29E4',
	smid: '\u2223',
	smile: '\u2323',
	smt: '\u2AAA',
	smte: '\u2AAC',
	smtes: '\u2AAC\uFE00',
	SOFTcy: '\u042C',
	softcy: '\u044C',
	sol: '\u002F',
	solb: '\u29C4',
	solbar: '\u233F',
	Sopf: '\uD835\uDD4A',
	sopf: '\uD835\uDD64',
	spades: '\u2660',
	spadesuit: '\u2660',
	spar: '\u2225',
	sqcap: '\u2293',
	sqcaps: '\u2293\uFE00',
	sqcup: '\u2294',
	sqcups: '\u2294\uFE00',
	Sqrt: '\u221A',
	sqsub: '\u228F',
	sqsube: '\u2291',
	sqsubset: '\u228F',
	sqsubseteq: '\u2291',
	sqsup: '\u2290',
	sqsupe: '\u2292',
	sqsupset: '\u2290',
	sqsupseteq: '\u2292',
	squ: '\u25A1',
	Square: '\u25A1',
	square: '\u25A1',
	SquareIntersection: '\u2293',
	SquareSubset: '\u228F',
	SquareSubsetEqual: '\u2291',
	SquareSuperset: '\u2290',
	SquareSupersetEqual: '\u2292',
	SquareUnion: '\u2294',
	squarf: '\u25AA',
	squf: '\u25AA',
	srarr: '\u2192',
	Sscr: '\uD835\uDCAE',
	sscr: '\uD835\uDCC8',
	ssetmn: '\u2216',
	ssmile: '\u2323',
	sstarf: '\u22C6',
	Star: '\u22C6',
	star: '\u2606',
	starf: '\u2605',
	straightepsilon: '\u03F5',
	straightphi: '\u03D5',
	strns: '\u00AF',
	Sub: '\u22D0',
	sub: '\u2282',
	subdot: '\u2ABD',
	subE: '\u2AC5',
	sube: '\u2286',
	subedot: '\u2AC3',
	submult: '\u2AC1',
	subnE: '\u2ACB',
	subne: '\u228A',
	subplus: '\u2ABF',
	subrarr: '\u2979',
	Subset: '\u22D0',
	subset: '\u2282',
	subseteq: '\u2286',
	subseteqq: '\u2AC5',
	SubsetEqual: '\u2286',
	subsetneq: '\u228A',
	subsetneqq: '\u2ACB',
	subsim: '\u2AC7',
	subsub: '\u2AD5',
	subsup: '\u2AD3',
	succ: '\u227B',
	succapprox: '\u2AB8',
	succcurlyeq: '\u227D',
	Succeeds: '\u227B',
	SucceedsEqual: '\u2AB0',
	SucceedsSlantEqual: '\u227D',
	SucceedsTilde: '\u227F',
	succeq: '\u2AB0',
	succnapprox: '\u2ABA',
	succneqq: '\u2AB6',
	succnsim: '\u22E9',
	succsim: '\u227F',
	SuchThat: '\u220B',
	Sum: '\u2211',
	sum: '\u2211',
	sung: '\u266A',
	Sup: '\u22D1',
	sup: '\u2283',
	sup1: '\u00B9',
	sup2: '\u00B2',
	sup3: '\u00B3',
	supdot: '\u2ABE',
	supdsub: '\u2AD8',
	supE: '\u2AC6',
	supe: '\u2287',
	supedot: '\u2AC4',
	Superset: '\u2283',
	SupersetEqual: '\u2287',
	suphsol: '\u27C9',
	suphsub: '\u2AD7',
	suplarr: '\u297B',
	supmult: '\u2AC2',
	supnE: '\u2ACC',
	supne: '\u228B',
	supplus: '\u2AC0',
	Supset: '\u22D1',
	supset: '\u2283',
	supseteq: '\u2287',
	supseteqq: '\u2AC6',
	supsetneq: '\u228B',
	supsetneqq: '\u2ACC',
	supsim: '\u2AC8',
	supsub: '\u2AD4',
	supsup: '\u2AD6',
	swarhk: '\u2926',
	swArr: '\u21D9',
	swarr: '\u2199',
	swarrow: '\u2199',
	swnwar: '\u292A',
	szlig: '\u00DF',
	Tab: '\u0009',
	target: '\u2316',
	Tau: '\u03A4',
	tau: '\u03C4',
	tbrk: '\u23B4',
	Tcaron: '\u0164',
	tcaron: '\u0165',
	Tcedil: '\u0162',
	tcedil: '\u0163',
	Tcy: '\u0422',
	tcy: '\u0442',
	tdot: '\u20DB',
	telrec: '\u2315',
	Tfr: '\uD835\uDD17',
	tfr: '\uD835\uDD31',
	there4: '\u2234',
	Therefore: '\u2234',
	therefore: '\u2234',
	Theta: '\u0398',
	theta: '\u03B8',
	thetasym: '\u03D1',
	thetav: '\u03D1',
	thickapprox: '\u2248',
	thicksim: '\u223C',
	ThickSpace: '\u205F\u200A',
	thinsp: '\u2009',
	ThinSpace: '\u2009',
	thkap: '\u2248',
	thksim: '\u223C',
	THORN: '\u00DE',
	thorn: '\u00FE',
	Tilde: '\u223C',
	tilde: '\u02DC',
	TildeEqual: '\u2243',
	TildeFullEqual: '\u2245',
	TildeTilde: '\u2248',
	times: '\u00D7',
	timesb: '\u22A0',
	timesbar: '\u2A31',
	timesd: '\u2A30',
	tint: '\u222D',
	toea: '\u2928',
	top: '\u22A4',
	topbot: '\u2336',
	topcir: '\u2AF1',
	Topf: '\uD835\uDD4B',
	topf: '\uD835\uDD65',
	topfork: '\u2ADA',
	tosa: '\u2929',
	tprime: '\u2034',
	TRADE: '\u2122',
	trade: '\u2122',
	triangle: '\u25B5',
	triangledown: '\u25BF',
	triangleleft: '\u25C3',
	trianglelefteq: '\u22B4',
	triangleq: '\u225C',
	triangleright: '\u25B9',
	trianglerighteq: '\u22B5',
	tridot: '\u25EC',
	trie: '\u225C',
	triminus: '\u2A3A',
	TripleDot: '\u20DB',
	triplus: '\u2A39',
	trisb: '\u29CD',
	tritime: '\u2A3B',
	trpezium: '\u23E2',
	Tscr: '\uD835\uDCAF',
	tscr: '\uD835\uDCC9',
	TScy: '\u0426',
	tscy: '\u0446',
	TSHcy: '\u040B',
	tshcy: '\u045B',
	Tstrok: '\u0166',
	tstrok: '\u0167',
	twixt: '\u226C',
	twoheadleftarrow: '\u219E',
	twoheadrightarrow: '\u21A0',
	Uacute: '\u00DA',
	uacute: '\u00FA',
	Uarr: '\u219F',
	uArr: '\u21D1',
	uarr: '\u2191',
	Uarrocir: '\u2949',
	Ubrcy: '\u040E',
	ubrcy: '\u045E',
	Ubreve: '\u016C',
	ubreve: '\u016D',
	Ucirc: '\u00DB',
	ucirc: '\u00FB',
	Ucy: '\u0423',
	ucy: '\u0443',
	udarr: '\u21C5',
	Udblac: '\u0170',
	udblac: '\u0171',
	udhar: '\u296E',
	ufisht: '\u297E',
	Ufr: '\uD835\uDD18',
	ufr: '\uD835\uDD32',
	Ugrave: '\u00D9',
	ugrave: '\u00F9',
	uHar: '\u2963',
	uharl: '\u21BF',
	uharr: '\u21BE',
	uhblk: '\u2580',
	ulcorn: '\u231C',
	ulcorner: '\u231C',
	ulcrop: '\u230F',
	ultri: '\u25F8',
	Umacr: '\u016A',
	umacr: '\u016B',
	uml: '\u00A8',
	UnderBar: '\u005F',
	UnderBrace: '\u23DF',
	UnderBracket: '\u23B5',
	UnderParenthesis: '\u23DD',
	Union: '\u22C3',
	UnionPlus: '\u228E',
	Uogon: '\u0172',
	uogon: '\u0173',
	Uopf: '\uD835\uDD4C',
	uopf: '\uD835\uDD66',
	UpArrow: '\u2191',
	Uparrow: '\u21D1',
	uparrow: '\u2191',
	UpArrowBar: '\u2912',
	UpArrowDownArrow: '\u21C5',
	UpDownArrow: '\u2195',
	Updownarrow: '\u21D5',
	updownarrow: '\u2195',
	UpEquilibrium: '\u296E',
	upharpoonleft: '\u21BF',
	upharpoonright: '\u21BE',
	uplus: '\u228E',
	UpperLeftArrow: '\u2196',
	UpperRightArrow: '\u2197',
	Upsi: '\u03D2',
	upsi: '\u03C5',
	upsih: '\u03D2',
	Upsilon: '\u03A5',
	upsilon: '\u03C5',
	UpTee: '\u22A5',
	UpTeeArrow: '\u21A5',
	upuparrows: '\u21C8',
	urcorn: '\u231D',
	urcorner: '\u231D',
	urcrop: '\u230E',
	Uring: '\u016E',
	uring: '\u016F',
	urtri: '\u25F9',
	Uscr: '\uD835\uDCB0',
	uscr: '\uD835\uDCCA',
	utdot: '\u22F0',
	Utilde: '\u0168',
	utilde: '\u0169',
	utri: '\u25B5',
	utrif: '\u25B4',
	uuarr: '\u21C8',
	Uuml: '\u00DC',
	uuml: '\u00FC',
	uwangle: '\u29A7',
	vangrt: '\u299C',
	varepsilon: '\u03F5',
	varkappa: '\u03F0',
	varnothing: '\u2205',
	varphi: '\u03D5',
	varpi: '\u03D6',
	varpropto: '\u221D',
	vArr: '\u21D5',
	varr: '\u2195',
	varrho: '\u03F1',
	varsigma: '\u03C2',
	varsubsetneq: '\u228A\uFE00',
	varsubsetneqq: '\u2ACB\uFE00',
	varsupsetneq: '\u228B\uFE00',
	varsupsetneqq: '\u2ACC\uFE00',
	vartheta: '\u03D1',
	vartriangleleft: '\u22B2',
	vartriangleright: '\u22B3',
	Vbar: '\u2AEB',
	vBar: '\u2AE8',
	vBarv: '\u2AE9',
	Vcy: '\u0412',
	vcy: '\u0432',
	VDash: '\u22AB',
	Vdash: '\u22A9',
	vDash: '\u22A8',
	vdash: '\u22A2',
	Vdashl: '\u2AE6',
	Vee: '\u22C1',
	vee: '\u2228',
	veebar: '\u22BB',
	veeeq: '\u225A',
	vellip: '\u22EE',
	Verbar: '\u2016',
	verbar: '\u007C',
	Vert: '\u2016',
	vert: '\u007C',
	VerticalBar: '\u2223',
	VerticalLine: '\u007C',
	VerticalSeparator: '\u2758',
	VerticalTilde: '\u2240',
	VeryThinSpace: '\u200A',
	Vfr: '\uD835\uDD19',
	vfr: '\uD835\uDD33',
	vltri: '\u22B2',
	vnsub: '\u2282\u20D2',
	vnsup: '\u2283\u20D2',
	Vopf: '\uD835\uDD4D',
	vopf: '\uD835\uDD67',
	vprop: '\u221D',
	vrtri: '\u22B3',
	Vscr: '\uD835\uDCB1',
	vscr: '\uD835\uDCCB',
	vsubnE: '\u2ACB\uFE00',
	vsubne: '\u228A\uFE00',
	vsupnE: '\u2ACC\uFE00',
	vsupne: '\u228B\uFE00',
	Vvdash: '\u22AA',
	vzigzag: '\u299A',
	Wcirc: '\u0174',
	wcirc: '\u0175',
	wedbar: '\u2A5F',
	Wedge: '\u22C0',
	wedge: '\u2227',
	wedgeq: '\u2259',
	weierp: '\u2118',
	Wfr: '\uD835\uDD1A',
	wfr: '\uD835\uDD34',
	Wopf: '\uD835\uDD4E',
	wopf: '\uD835\uDD68',
	wp: '\u2118',
	wr: '\u2240',
	wreath: '\u2240',
	Wscr: '\uD835\uDCB2',
	wscr: '\uD835\uDCCC',
	xcap: '\u22C2',
	xcirc: '\u25EF',
	xcup: '\u22C3',
	xdtri: '\u25BD',
	Xfr: '\uD835\uDD1B',
	xfr: '\uD835\uDD35',
	xhArr: '\u27FA',
	xharr: '\u27F7',
	Xi: '\u039E',
	xi: '\u03BE',
	xlArr: '\u27F8',
	xlarr: '\u27F5',
	xmap: '\u27FC',
	xnis: '\u22FB',
	xodot: '\u2A00',
	Xopf: '\uD835\uDD4F',
	xopf: '\uD835\uDD69',
	xoplus: '\u2A01',
	xotime: '\u2A02',
	xrArr: '\u27F9',
	xrarr: '\u27F6',
	Xscr: '\uD835\uDCB3',
	xscr: '\uD835\uDCCD',
	xsqcup: '\u2A06',
	xuplus: '\u2A04',
	xutri: '\u25B3',
	xvee: '\u22C1',
	xwedge: '\u22C0',
	Yacute: '\u00DD',
	yacute: '\u00FD',
	YAcy: '\u042F',
	yacy: '\u044F',
	Ycirc: '\u0176',
	ycirc: '\u0177',
	Ycy: '\u042B',
	ycy: '\u044B',
	yen: '\u00A5',
	Yfr: '\uD835\uDD1C',
	yfr: '\uD835\uDD36',
	YIcy: '\u0407',
	yicy: '\u0457',
	Yopf: '\uD835\uDD50',
	yopf: '\uD835\uDD6A',
	Yscr: '\uD835\uDCB4',
	yscr: '\uD835\uDCCE',
	YUcy: '\u042E',
	yucy: '\u044E',
	Yuml: '\u0178',
	yuml: '\u00FF',
	Zacute: '\u0179',
	zacute: '\u017A',
	Zcaron: '\u017D',
	zcaron: '\u017E',
	Zcy: '\u0417',
	zcy: '\u0437',
	Zdot: '\u017B',
	zdot: '\u017C',
	zeetrf: '\u2128',
	ZeroWidthSpace: '\u200B',
	Zeta: '\u0396',
	zeta: '\u03B6',
	Zfr: '\u2128',
	zfr: '\uD835\uDD37',
	ZHcy: '\u0416',
	zhcy: '\u0436',
	zigrarr: '\u21DD',
	Zopf: '\u2124',
	zopf: '\uD835\uDD6B',
	Zscr: '\uD835\uDCB5',
	zscr: '\uD835\uDCCF',
	zwj: '\u200D',
	zwnj: '\u200C',
});

/**
 * @deprecated use `HTML_ENTITIES` instead
 * @see HTML_ENTITIES
 */
exports.entityMap = exports.HTML_ENTITIES;

},{"./conventions":25}],29:[function(require,module,exports){
var dom = require('./dom')
exports.DOMImplementation = dom.DOMImplementation
exports.XMLSerializer = dom.XMLSerializer
exports.DOMParser = require('./dom-parser').DOMParser

},{"./dom":27,"./dom-parser":26}],30:[function(require,module,exports){
var NAMESPACE = require("./conventions").NAMESPACE;

//[4]   	NameStartChar	   ::=   	":" | [A-Z] | "_" | [a-z] | [#xC0-#xD6] | [#xD8-#xF6] | [#xF8-#x2FF] | [#x370-#x37D] | [#x37F-#x1FFF] | [#x200C-#x200D] | [#x2070-#x218F] | [#x2C00-#x2FEF] | [#x3001-#xD7FF] | [#xF900-#xFDCF] | [#xFDF0-#xFFFD] | [#x10000-#xEFFFF]
//[4a]   	NameChar	   ::=   	NameStartChar | "-" | "." | [0-9] | #xB7 | [#x0300-#x036F] | [#x203F-#x2040]
//[5]   	Name	   ::=   	NameStartChar (NameChar)*
var nameStartChar = /[A-Z_a-z\xC0-\xD6\xD8-\xF6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]///\u10000-\uEFFFF
var nameChar = new RegExp("[\\-\\.0-9"+nameStartChar.source.slice(1,-1)+"\\u00B7\\u0300-\\u036F\\u203F-\\u2040]");
var tagNamePattern = new RegExp('^'+nameStartChar.source+nameChar.source+'*(?:\:'+nameStartChar.source+nameChar.source+'*)?$');
//var tagNamePattern = /^[a-zA-Z_][\w\-\.]*(?:\:[a-zA-Z_][\w\-\.]*)?$/
//var handlers = 'resolveEntity,getExternalSubset,characters,endDocument,endElement,endPrefixMapping,ignorableWhitespace,processingInstruction,setDocumentLocator,skippedEntity,startDocument,startElement,startPrefixMapping,notationDecl,unparsedEntityDecl,error,fatalError,warning,attributeDecl,elementDecl,externalEntityDecl,internalEntityDecl,comment,endCDATA,endDTD,endEntity,startCDATA,startDTD,startEntity'.split(',')

//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
var S_TAG = 0;//tag name offerring
var S_ATTR = 1;//attr name offerring
var S_ATTR_SPACE=2;//attr name end and space offer
var S_EQ = 3;//=space?
var S_ATTR_NOQUOT_VALUE = 4;//attr value(no quot value only)
var S_ATTR_END = 5;//attr value end and no space(quot end)
var S_TAG_SPACE = 6;//(attr value end || tag end ) && (space offer)
var S_TAG_CLOSE = 7;//closed el<el />

/**
 * Creates an error that will not be caught by XMLReader aka the SAX parser.
 *
 * @param {string} message
 * @param {any?} locator Optional, can provide details about the location in the source
 * @constructor
 */
function ParseError(message, locator) {
	this.message = message
	this.locator = locator
	if(Error.captureStackTrace) Error.captureStackTrace(this, ParseError);
}
ParseError.prototype = new Error();
ParseError.prototype.name = ParseError.name

function XMLReader(){

}

XMLReader.prototype = {
	parse:function(source,defaultNSMap,entityMap){
		var domBuilder = this.domBuilder;
		domBuilder.startDocument();
		_copy(defaultNSMap ,defaultNSMap = {})
		parse(source,defaultNSMap,entityMap,
				domBuilder,this.errorHandler);
		domBuilder.endDocument();
	}
}
function parse(source,defaultNSMapCopy,entityMap,domBuilder,errorHandler){
	function fixedFromCharCode(code) {
		// String.prototype.fromCharCode does not supports
		// > 2 bytes unicode chars directly
		if (code > 0xffff) {
			code -= 0x10000;
			var surrogate1 = 0xd800 + (code >> 10)
				, surrogate2 = 0xdc00 + (code & 0x3ff);

			return String.fromCharCode(surrogate1, surrogate2);
		} else {
			return String.fromCharCode(code);
		}
	}
	function entityReplacer(a){
		var k = a.slice(1,-1);
		if (Object.hasOwnProperty.call(entityMap, k)) {
			return entityMap[k];
		}else if(k.charAt(0) === '#'){
			return fixedFromCharCode(parseInt(k.substr(1).replace('x','0x')))
		}else{
			errorHandler.error('entity not found:'+a);
			return a;
		}
	}
	function appendText(end){//has some bugs
		if(end>start){
			var xt = source.substring(start,end).replace(/&#?\w+;/g,entityReplacer);
			locator&&position(start);
			domBuilder.characters(xt,0,end-start);
			start = end
		}
	}
	function position(p,m){
		while(p>=lineEnd && (m = linePattern.exec(source))){
			lineStart = m.index;
			lineEnd = lineStart + m[0].length;
			locator.lineNumber++;
			//console.log('line++:',locator,startPos,endPos)
		}
		locator.columnNumber = p-lineStart+1;
	}
	var lineStart = 0;
	var lineEnd = 0;
	var linePattern = /.*(?:\r\n?|\n)|.*$/g
	var locator = domBuilder.locator;

	var parseStack = [{currentNSMap:defaultNSMapCopy}]
	var closeMap = {};
	var start = 0;
	while(true){
		try{
			var tagStart = source.indexOf('<',start);
			if(tagStart<0){
				if(!source.substr(start).match(/^\s*$/)){
					var doc = domBuilder.doc;
	    			var text = doc.createTextNode(source.substr(start));
	    			doc.appendChild(text);
	    			domBuilder.currentElement = text;
				}
				return;
			}
			if(tagStart>start){
				appendText(tagStart);
			}
			switch(source.charAt(tagStart+1)){
			case '/':
				var end = source.indexOf('>',tagStart+3);
				var tagName = source.substring(tagStart + 2, end).replace(/[ \t\n\r]+$/g, '');
				var config = parseStack.pop();
				if(end<0){

	        		tagName = source.substring(tagStart+2).replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' is not complete:'+config.tagName);
	        		end = tagStart+1+tagName.length;
	        	}else if(tagName.match(/\s</)){
	        		tagName = tagName.replace(/[\s<].*/,'');
	        		errorHandler.error("end tag name: "+tagName+' maybe not complete');
	        		end = tagStart+1+tagName.length;
				}
				var localNSMap = config.localNSMap;
				var endMatch = config.tagName == tagName;
				var endIgnoreCaseMach = endMatch || config.tagName&&config.tagName.toLowerCase() == tagName.toLowerCase()
		        if(endIgnoreCaseMach){
		        	domBuilder.endElement(config.uri,config.localName,tagName);
					if(localNSMap){
						for (var prefix in localNSMap) {
							if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
								domBuilder.endPrefixMapping(prefix);
							}
						}
					}
					if(!endMatch){
		            	errorHandler.fatalError("end tag name: "+tagName+' is not match the current start tagName:'+config.tagName ); // No known test case
					}
		        }else{
		        	parseStack.push(config)
		        }

				end++;
				break;
				// end elment
			case '?':// <?...?>
				locator&&position(tagStart);
				end = parseInstruction(source,tagStart,domBuilder);
				break;
			case '!':// <!doctype,<![CDATA,<!--
				locator&&position(tagStart);
				end = parseDCC(source,tagStart,domBuilder,errorHandler);
				break;
			default:
				locator&&position(tagStart);
				var el = new ElementAttributes();
				var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
				//elStartEnd
				var end = parseElementStartPart(source,tagStart,el,currentNSMap,entityReplacer,errorHandler);
				var len = el.length;


				if(!el.closed && fixSelfClosed(source,end,el.tagName,closeMap)){
					el.closed = true;
					if(!entityMap.nbsp){
						errorHandler.warning('unclosed xml attribute');
					}
				}
				if(locator && len){
					var locator2 = copyLocator(locator,{});
					//try{//attribute position fixed
					for(var i = 0;i<len;i++){
						var a = el[i];
						position(a.offset);
						a.locator = copyLocator(locator,{});
					}
					domBuilder.locator = locator2
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
					domBuilder.locator = locator;
				}else{
					if(appendElement(el,domBuilder,currentNSMap)){
						parseStack.push(el)
					}
				}

				if (NAMESPACE.isHTML(el.uri) && !el.closed) {
					end = parseHtmlSpecialContent(source,end,el.tagName,entityReplacer,domBuilder)
				} else {
					end++;
				}
			}
		}catch(e){
			if (e instanceof ParseError) {
				throw e;
			}
			errorHandler.error('element parse error: '+e)
			end = -1;
		}
		if(end>start){
			start = end;
		}else{
			//TODO: 这里有可能sax回退，有位置错误风险
			appendText(Math.max(tagStart,start)+1);
		}
	}
}
function copyLocator(f,t){
	t.lineNumber = f.lineNumber;
	t.columnNumber = f.columnNumber;
	return t;
}

/**
 * @see #appendElement(source,elStartEnd,el,selfClosed,entityReplacer,domBuilder,parseStack);
 * @return end of the elementStartPart(end of elementEndPart for selfClosed el)
 */
function parseElementStartPart(source,start,el,currentNSMap,entityReplacer,errorHandler){

	/**
	 * @param {string} qname
	 * @param {string} value
	 * @param {number} startIndex
	 */
	function addAttribute(qname, value, startIndex) {
		if (el.attributeNames.hasOwnProperty(qname)) {
			errorHandler.fatalError('Attribute ' + qname + ' redefined')
		}
		el.addValue(
			qname,
			// @see https://www.w3.org/TR/xml/#AVNormalize
			// since the xmldom sax parser does not "interpret" DTD the following is not implemented:
			// - recursive replacement of (DTD) entity references
			// - trimming and collapsing multiple spaces into a single one for attributes that are not of type CDATA
			value.replace(/[\t\n\r]/g, ' ').replace(/&#?\w+;/g, entityReplacer),
			startIndex
		)
	}
	var attrName;
	var value;
	var p = ++start;
	var s = S_TAG;//status
	while(true){
		var c = source.charAt(p);
		switch(c){
		case '=':
			if(s === S_ATTR){//attrName
				attrName = source.slice(start,p);
				s = S_EQ;
			}else if(s === S_ATTR_SPACE){
				s = S_EQ;
			}else{
				//fatalError: equal must after attrName or space after attrName
				throw new Error('attribute equal must after attrName'); // No known test case
			}
			break;
		case '\'':
		case '"':
			if(s === S_EQ || s === S_ATTR //|| s == S_ATTR_SPACE
				){//equal
				if(s === S_ATTR){
					errorHandler.warning('attribute value must after "="')
					attrName = source.slice(start,p)
				}
				start = p+1;
				p = source.indexOf(c,start)
				if(p>0){
					value = source.slice(start, p);
					addAttribute(attrName, value, start-1);
					s = S_ATTR_END;
				}else{
					//fatalError: no end quot match
					throw new Error('attribute value no end \''+c+'\' match');
				}
			}else if(s == S_ATTR_NOQUOT_VALUE){
				value = source.slice(start, p);
				addAttribute(attrName, value, start);
				errorHandler.warning('attribute "'+attrName+'" missed start quot('+c+')!!');
				start = p+1;
				s = S_ATTR_END
			}else{
				//fatalError: no equal before
				throw new Error('attribute value must after "="'); // No known test case
			}
			break;
		case '/':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				s =S_TAG_CLOSE;
				el.closed = true;
			case S_ATTR_NOQUOT_VALUE:
			case S_ATTR:
				break;
				case S_ATTR_SPACE:
					el.closed = true;
				break;
			//case S_EQ:
			default:
				throw new Error("attribute invalid close char('/')") // No known test case
			}
			break;
		case ''://end document
			errorHandler.error('unexpected end of input');
			if(s == S_TAG){
				el.setTagName(source.slice(start,p));
			}
			return p;
		case '>':
			switch(s){
			case S_TAG:
				el.setTagName(source.slice(start,p));
			case S_ATTR_END:
			case S_TAG_SPACE:
			case S_TAG_CLOSE:
				break;//normal
			case S_ATTR_NOQUOT_VALUE://Compatible state
			case S_ATTR:
				value = source.slice(start,p);
				if(value.slice(-1) === '/'){
					el.closed  = true;
					value = value.slice(0,-1)
				}
			case S_ATTR_SPACE:
				if(s === S_ATTR_SPACE){
					value = attrName;
				}
				if(s == S_ATTR_NOQUOT_VALUE){
					errorHandler.warning('attribute "'+value+'" missed quot(")!');
					addAttribute(attrName, value, start)
				}else{
					if(!NAMESPACE.isHTML(currentNSMap['']) || !value.match(/^(?:disabled|checked|selected)$/i)){
						errorHandler.warning('attribute "'+value+'" missed value!! "'+value+'" instead!!')
					}
					addAttribute(value, value, start)
				}
				break;
			case S_EQ:
				throw new Error('attribute value missed!!');
			}
//			console.log(tagName,tagNamePattern,tagNamePattern.test(tagName))
			return p;
		/*xml space '\x20' | #x9 | #xD | #xA; */
		case '\u0080':
			c = ' ';
		default:
			if(c<= ' '){//space
				switch(s){
				case S_TAG:
					el.setTagName(source.slice(start,p));//tagName
					s = S_TAG_SPACE;
					break;
				case S_ATTR:
					attrName = source.slice(start,p)
					s = S_ATTR_SPACE;
					break;
				case S_ATTR_NOQUOT_VALUE:
					var value = source.slice(start, p);
					errorHandler.warning('attribute "'+value+'" missed quot(")!!');
					addAttribute(attrName, value, start)
				case S_ATTR_END:
					s = S_TAG_SPACE;
					break;
				//case S_TAG_SPACE:
				//case S_EQ:
				//case S_ATTR_SPACE:
				//	void();break;
				//case S_TAG_CLOSE:
					//ignore warning
				}
			}else{//not space
//S_TAG,	S_ATTR,	S_EQ,	S_ATTR_NOQUOT_VALUE
//S_ATTR_SPACE,	S_ATTR_END,	S_TAG_SPACE, S_TAG_CLOSE
				switch(s){
				//case S_TAG:void();break;
				//case S_ATTR:void();break;
				//case S_ATTR_NOQUOT_VALUE:void();break;
				case S_ATTR_SPACE:
					var tagName =  el.tagName;
					if (!NAMESPACE.isHTML(currentNSMap['']) || !attrName.match(/^(?:disabled|checked|selected)$/i)) {
						errorHandler.warning('attribute "'+attrName+'" missed value!! "'+attrName+'" instead2!!')
					}
					addAttribute(attrName, attrName, start);
					start = p;
					s = S_ATTR;
					break;
				case S_ATTR_END:
					errorHandler.warning('attribute space is required"'+attrName+'"!!')
				case S_TAG_SPACE:
					s = S_ATTR;
					start = p;
					break;
				case S_EQ:
					s = S_ATTR_NOQUOT_VALUE;
					start = p;
					break;
				case S_TAG_CLOSE:
					throw new Error("elements closed character '/' and '>' must be connected to");
				}
			}
		}//end outer switch
		//console.log('p++',p)
		p++;
	}
}
/**
 * @return true if has new namespace define
 */
function appendElement(el,domBuilder,currentNSMap){
	var tagName = el.tagName;
	var localNSMap = null;
	//var currentNSMap = parseStack[parseStack.length-1].currentNSMap;
	var i = el.length;
	while(i--){
		var a = el[i];
		var qName = a.qName;
		var value = a.value;
		var nsp = qName.indexOf(':');
		if(nsp>0){
			var prefix = a.prefix = qName.slice(0,nsp);
			var localName = qName.slice(nsp+1);
			var nsPrefix = prefix === 'xmlns' && localName
		}else{
			localName = qName;
			prefix = null
			nsPrefix = qName === 'xmlns' && ''
		}
		//can not set prefix,because prefix !== ''
		a.localName = localName ;
		//prefix == null for no ns prefix attribute
		if(nsPrefix !== false){//hack!!
			if(localNSMap == null){
				localNSMap = {}
				//console.log(currentNSMap,0)
				_copy(currentNSMap,currentNSMap={})
				//console.log(currentNSMap,1)
			}
			currentNSMap[nsPrefix] = localNSMap[nsPrefix] = value;
			a.uri = NAMESPACE.XMLNS
			domBuilder.startPrefixMapping(nsPrefix, value)
		}
	}
	var i = el.length;
	while(i--){
		a = el[i];
		var prefix = a.prefix;
		if(prefix){//no prefix attribute has no namespace
			if(prefix === 'xml'){
				a.uri = NAMESPACE.XML;
			}if(prefix !== 'xmlns'){
				a.uri = currentNSMap[prefix || '']

				//{console.log('###'+a.qName,domBuilder.locator.systemId+'',currentNSMap,a.uri)}
			}
		}
	}
	var nsp = tagName.indexOf(':');
	if(nsp>0){
		prefix = el.prefix = tagName.slice(0,nsp);
		localName = el.localName = tagName.slice(nsp+1);
	}else{
		prefix = null;//important!!
		localName = el.localName = tagName;
	}
	//no prefix element has default namespace
	var ns = el.uri = currentNSMap[prefix || ''];
	domBuilder.startElement(ns,localName,tagName,el);
	//endPrefixMapping and startPrefixMapping have not any help for dom builder
	//localNSMap = null
	if(el.closed){
		domBuilder.endElement(ns,localName,tagName);
		if(localNSMap){
			for (prefix in localNSMap) {
				if (Object.prototype.hasOwnProperty.call(localNSMap, prefix)) {
					domBuilder.endPrefixMapping(prefix);
				}
			}
		}
	}else{
		el.currentNSMap = currentNSMap;
		el.localNSMap = localNSMap;
		//parseStack.push(el);
		return true;
	}
}
function parseHtmlSpecialContent(source,elStartEnd,tagName,entityReplacer,domBuilder){
	if(/^(?:script|textarea)$/i.test(tagName)){
		var elEndStart =  source.indexOf('</'+tagName+'>',elStartEnd);
		var text = source.substring(elStartEnd+1,elEndStart);
		if(/[&<]/.test(text)){
			if(/^script$/i.test(tagName)){
				//if(!/\]\]>/.test(text)){
					//lexHandler.startCDATA();
					domBuilder.characters(text,0,text.length);
					//lexHandler.endCDATA();
					return elEndStart;
				//}
			}//}else{//text area
				text = text.replace(/&#?\w+;/g,entityReplacer);
				domBuilder.characters(text,0,text.length);
				return elEndStart;
			//}

		}
	}
	return elStartEnd+1;
}
function fixSelfClosed(source,elStartEnd,tagName,closeMap){
	//if(tagName in closeMap){
	var pos = closeMap[tagName];
	if(pos == null){
		//console.log(tagName)
		pos =  source.lastIndexOf('</'+tagName+'>')
		if(pos<elStartEnd){//忘记闭合
			pos = source.lastIndexOf('</'+tagName)
		}
		closeMap[tagName] =pos
	}
	return pos<elStartEnd;
	//}
}

function _copy (source, target) {
	for (var n in source) {
		if (Object.prototype.hasOwnProperty.call(source, n)) {
			target[n] = source[n];
		}
	}
}

function parseDCC(source,start,domBuilder,errorHandler){//sure start with '<!'
	var next= source.charAt(start+2)
	switch(next){
	case '-':
		if(source.charAt(start + 3) === '-'){
			var end = source.indexOf('-->',start+4);
			//append comment source.substring(4,end)//<!--
			if(end>start){
				domBuilder.comment(source,start+4,end-start-4);
				return end+3;
			}else{
				errorHandler.error("Unclosed comment");
				return -1;
			}
		}else{
			//error
			return -1;
		}
	default:
		if(source.substr(start+3,6) == 'CDATA['){
			var end = source.indexOf(']]>',start+9);
			domBuilder.startCDATA();
			domBuilder.characters(source,start+9,end-start-9);
			domBuilder.endCDATA()
			return end+3;
		}
		//<!DOCTYPE
		//startDTD(java.lang.String name, java.lang.String publicId, java.lang.String systemId)
		var matchs = split(source,start);
		var len = matchs.length;
		if(len>1 && /!doctype/i.test(matchs[0][0])){
			var name = matchs[1][0];
			var pubid = false;
			var sysid = false;
			if(len>3){
				if(/^public$/i.test(matchs[2][0])){
					pubid = matchs[3][0];
					sysid = len>4 && matchs[4][0];
				}else if(/^system$/i.test(matchs[2][0])){
					sysid = matchs[3][0];
				}
			}
			var lastMatch = matchs[len-1]
			domBuilder.startDTD(name, pubid, sysid);
			domBuilder.endDTD();

			return lastMatch.index+lastMatch[0].length
		}
	}
	return -1;
}



function parseInstruction(source,start,domBuilder){
	var end = source.indexOf('?>',start);
	if(end){
		var match = source.substring(start,end).match(/^<\?(\S*)\s*([\s\S]*?)\s*$/);
		if(match){
			var len = match[0].length;
			domBuilder.processingInstruction(match[1], match[2]) ;
			return end+2;
		}else{//error
			return -1;
		}
	}
	return -1;
}

function ElementAttributes(){
	this.attributeNames = {}
}
ElementAttributes.prototype = {
	setTagName:function(tagName){
		if(!tagNamePattern.test(tagName)){
			throw new Error('invalid tagName:'+tagName)
		}
		this.tagName = tagName
	},
	addValue:function(qName, value, offset) {
		if(!tagNamePattern.test(qName)){
			throw new Error('invalid attribute:'+qName)
		}
		this.attributeNames[qName] = this.length;
		this[this.length++] = {qName:qName,value:value,offset:offset}
	},
	length:0,
	getLocalName:function(i){return this[i].localName},
	getLocator:function(i){return this[i].locator},
	getQName:function(i){return this[i].qName},
	getURI:function(i){return this[i].uri},
	getValue:function(i){return this[i].value}
//	,getIndex:function(uri, localName)){
//		if(localName){
//
//		}else{
//			var qName = uri
//		}
//	},
//	getValue:function(){return this.getValue(this.getIndex.apply(this,arguments))},
//	getType:function(uri,localName){}
//	getType:function(i){},
}



function split(source,start){
	var match;
	var buf = [];
	var reg = /'[^']+'|"[^"]+"|[^\s<>\/=]+=?|(\/?\s*>|<)/g;
	reg.lastIndex = start;
	reg.exec(source);//skip <
	while(match = reg.exec(source)){
		buf.push(match);
		if(match[1])return buf;
	}
}

exports.XMLReader = XMLReader;
exports.ParseError = ParseError;

},{"./conventions":25}]},{},[2]);
