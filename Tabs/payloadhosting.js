/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/payload-hosting.ts
/*
Copyright (c) 2025 Vizrt

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

(MIT License)

The payloadhosting.js serves as a reference implementation of how a custom HTML
forms communicate with VDF payload editor hosts. This code can either be
used as-is or be adapted to fulfill specific needs.
*/
/**
 * The namespace for the <code>{@link vizrt.payloadhosting}</code> object.
 * The <code>payloadhosting</code> object is of type <code>{@link vizrt.PayloadHosting}</code>.
 * This class contains the means to observe and modify the payload held by the host of the
 * HTML document using this script file.
 * To get started call <code>vizrt.payloadhosting.{@link PayloadHosting.initialize}()</code>.
 * If you pass a parameterless function to <code>initialize</code> this function will be called when
 * <code>vizrt.payloadhosting</code> has received the payload from the host and is ready for further interaction.
 * By default the payloadhosting will bind HTML document elements to fields in the by matching HTML element IDs with
 * names of fields in the payload.
 * If you don't want this automatic binding call
 * <code>vizrt.payloadhosting.{@link PayloadHosting.setUsesAutomaticBindings}(false)</code>
 * before calling <code>vizrt.payloadhosting.initialize</code>.
 * @see {@link PayloadHosting.initialize} for further information about initialization.
 * @see {@link PayloadHosting.setUsesAutomaticBindings} for further information about automatic binding.
 *
 * @namespace vizrt
 */
const vizNs = "http://www.vizrt.com/types";
const atomNs = "http://www.w3.org/2005/Atom";
const bgfxNs = "http://www.vizrt.com/2011/bgfx";
const mrssNs = "http://search.yahoo.com/mrss/";
const vizmediaNs = "http://www.vizrt.com/opensearch/mediatype";
const safeTypes = "|image/jpeg|image/png|image/gif|image/bmp|image/svg+xml|";
function createEvent(type) {
    const event = document.createEvent("Event");
    event.initEvent(type, false, false);
    return event;
}
function getQueryParameter(name) {
    const query = window.location.search.substring(1);
    const params = query.split("&");
    let i;
    for (i = 0; i < params.length; ++i) {
        const kv = params[i].split("=");
        if (decodeURIComponent(kv[0]) === name) {
            return decodeURIComponent(kv[1]);
        }
    }
    return "*";
    //return null;
}
/**
 * Get the host origin specified by the "payload_host_origin" query
 * parameter.
 */
function getHostOrigin() {
    return getQueryParameter("payload_host_origin");
}
/**
 * Get the guest identifier specified by the "guestid" query
 * parameter.
 */
function getGuestIdentifier() {
    return getQueryParameter("guestid");
}
/**
 * Return the text contained in the text node children of a parent
 * element.
 */
function payload_hosting_text(parent) {
    let result = "";
    const children = parent.childNodes;
    let i;
    for (i = 0; i < children.length; ++i) {
        const node = children.item(i);
        if (node.nodeType !== Node.TEXT_NODE) {
            continue;
        }
        result += node.nodeValue;
    }
    return result;
}
function isLikelyToBeURL(str) {
    const lowerCased = str.toLowerCase();
    return startsWith(lowerCased, "http://") || startsWith(lowerCased, "https://");
}
function getSafeVizImageUrl(contentEl) {
    const value = payload_hosting_text(contentEl);
    return value && isLikelyToBeURL(value) ? value : null;
}
function getTextFromFieldElement(fieldElement) {
    const valueElement = getFirstChildElement(fieldElement, vizNs, "value");
    return valueElement != null ? payload_hosting_text(valueElement) : null;
}
function getXmlFromFieldElement(fieldElement) {
    const valueElement = getFirstChildElement(fieldElement, vizNs, "value");
    return valueElement != null ? getFirstChildElement(valueElement, null, null) : null;
}
function getFieldValueXmlAsString(fieldElement) {
    const element = getXmlFromFieldElement(fieldElement);
    return !element ? null : new XMLSerializer().serializeToString(element);
}
function getAttributeInt(el, name) {
    const attr = el.getAttribute(name);
    const num = attr != null ? parseInt(attr) : NaN;
    return isNaN(num) ? undefined : num;
}
function getAttributeFloat(el, name) {
    const attr = el.getAttribute(name);
    const num = attr != null ? parseFloat(attr) : NaN;
    return isNaN(num) ? undefined : num;
}
class SingleElementIterator {
    constructor(el) {
        this.el = el;
    }
    next() {
        const result = this.el;
        this.el = null;
        return result;
    }
}
function getFirstChildElement(parent, nsUri, name) {
    if (!parent) {
        return null;
    }
    const children = parent.childNodes;
    const c = children.length;
    for (let i = 0; i != c; ++i) {
        const node = children.item(i);
        if (node.nodeType !== Node.ELEMENT_NODE) {
            continue;
        }
        if (nsUri != null && nsUri !== node.namespaceURI) {
            continue;
        }
        if (name != null && name !== node.localName) {
            continue;
        }
        return node;
    }
    return null;
}
function getListDefElement(fieldDefElement, fieldPath) {
    const result = getFirstChildElement(fieldDefElement, vizNs, "listdef");
    if (!result) {
        throw new Error("'" + fieldPath + "' is not a list.");
    }
    return result;
}
class TypedElementIterator {
    constructor(parentsIterator, nsUri, name) {
        this.parentsIterator = parentsIterator;
        this.nsUri = nsUri;
        this.name = name;
        this.parent = null;
        this.index = 0;
    }
    next() {
        // eslint-disable-next-line no-constant-condition
        while (true) {
            if (!this.parent || this.index == this.parent.childNodes.length) {
                this.parent = this.parentsIterator.next();
                if (!this.parent) {
                    return null;
                }
                continue;
            }
            const node = this.parent.childNodes.item(this.index++);
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
    }
}
function findFieldElement(parentElement, fieldName, definition = false) {
    const iterator = new TypedElementIterator(new SingleElementIterator(parentElement), vizNs, definition ? "fielddef" : "field");
    let fieldEl;
    while ((fieldEl = iterator.next()) != null) {
        const curFieldName = fieldEl.getAttribute("name");
        if (fieldName === curFieldName) {
            return fieldEl;
        }
    }
    return null;
}
function findListItem(fieldElement, index) {
    const listEl = getFirstChildElement(fieldElement, vizNs, "list");
    if (!listEl || index < 0) {
        return null;
    }
    const iterator = new TypedElementIterator(new SingleElementIterator(listEl), vizNs, "payload");
    let payloadElement;
    while ((payloadElement = iterator.next()) != null) {
        if (index <= 0) {
            return payloadElement;
        }
        --index;
    }
    return null;
}
function setFieldValueContent(fieldElement, valueChildNode) {
    // fieldElement MUST be a field element within a payload document (meaning it has a document)
    const oldValueEl = getFirstChildElement(fieldElement, vizNs, "value");
    if (!oldValueEl && !valueChildNode) {
        return;
    }
    if (!valueChildNode) {
        if (oldValueEl) {
            fieldElement.removeChild(oldValueEl);
        }
    }
    else {
        const valueElement = fieldElement.ownerDocument.createElementNS(vizNs, "value");
        valueElement.appendChild(valueChildNode);
        if (!oldValueEl) {
            fieldElement.appendChild(valueElement);
        }
        else {
            fieldElement.replaceChild(valueElement, oldValueEl);
        }
    }
}
function setFieldValueAsText(fieldElement, text) {
    // fieldElement MUST be a field element within a payload document (meaning it has a document)
    if (text == null) {
        setFieldValueContent(fieldElement, null);
    }
    else {
        setFieldValueContent(fieldElement, fieldElement.ownerDocument.createTextNode(text));
    }
}
function setFieldValueAsParsedXml(fieldElement, xml) {
    // fieldElement MUST be a field element within a payload document (meaning it has a document)
    if (!xml) {
        setFieldValueContent(fieldElement, null);
    }
    else {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "text/xml");
        const el = getFirstChildElement(doc, null, null);
        const contentElement = el ? fieldElement.ownerDocument.importNode(el, true) : null;
        setFieldValueContent(fieldElement, contentElement);
    }
}
function setFieldAnnotation(fieldElement, annotationType, annotationValue) {
    // fieldElement MUST be a field element within a payload document (meaning it has a document)
    const oldAnnotationEl = getFirstChildElement(fieldElement, vizNs, "annotation");
    if (!oldAnnotationEl && !annotationValue) {
        return false;
    }
    if (annotationValue == null && oldAnnotationEl) {
        const oldValue = oldAnnotationEl.getAttribute(annotationType) || "";
        if (oldValue == null) {
            return false;
        }
        oldAnnotationEl.removeAttribute(annotationType);
        if (oldAnnotationEl.attributes.length == 0) {
            fieldElement.removeChild(oldAnnotationEl);
        }
        return true;
    }
    else if (!oldAnnotationEl) {
        const annotationEl = fieldElement.ownerDocument.createElementNS(vizNs, "annotation");
        annotationEl.setAttribute(annotationType, annotationValue || "");
        fieldElement.appendChild(annotationEl);
        return true;
    }
    else {
        const oldValue = oldAnnotationEl.getAttribute(annotationType) || "";
        if (oldValue === annotationValue) {
            return false;
        }
        oldAnnotationEl.setAttribute(annotationType, annotationValue || "");
        return true;
    }
}
function isNumerical(text) {
    for (let i = 0; i != text.length; ++i) {
        if (text.charAt(i) < "0" || text.charAt(i) > "9") {
            return false;
        }
    }
    return true;
}
function createRemoveListItemRangeError(count) {
    return new RangeError("Delete position out of range (" +
        (!count ? "cannot delete from an empty list" : "" + -count + " to " + (count - 1) + " expected") +
        ").");
}
function createAddListItemRangeError(count) {
    return new RangeError("Insert position out of range (" + (-count - 1) + " to " + count + " expected).");
}
function createListItem(listDefElement) {
    // listDefElement MUST be a field element within a payload or model document (meaning it has a document)
    const doc = listDefElement.ownerDocument;
    const payloadElement = doc.createElementNS(vizNs, "payload");
    const schemaElement = getFirstChildElement(listDefElement, vizNs, "schema");
    const iterator = new TypedElementIterator(new SingleElementIterator(schemaElement), vizNs, "fielddef");
    let fieldDefElement;
    while ((fieldDefElement = iterator.next()) != null) {
        const fieldElement = doc.createElementNS(vizNs, "field");
        const fieldElementName = fieldDefElement.getAttribute("name");
        if (fieldElementName) {
            fieldElement.setAttribute("name", fieldElementName);
        }
        else {
            fieldElement.removeAttribute("name");
        }
        const defaultContent = getFirstChildElement(fieldDefElement, vizNs, "value") || getFirstChildElement(fieldDefElement, vizNs, "list");
        if (defaultContent != null) {
            fieldElement.appendChild(defaultContent.cloneNode(true));
        }
        payloadElement.appendChild(fieldElement);
    }
    return payloadElement;
}
function getListMaxCount(listDefElement) {
    const maxCountEl = getFirstChildElement(listDefElement, vizNs, "maximumcount");
    if (!maxCountEl) {
        return null;
    }
    const maxCountText = payload_hosting_text(maxCountEl);
    return parseInt(maxCountText);
}
function getListMinCount(listDefElement) {
    const minCountEl = getFirstChildElement(listDefElement, vizNs, "minimumcount");
    if (!minCountEl) {
        return 0;
    }
    const minCountText = payload_hosting_text(minCountEl);
    return parseInt(minCountText);
}
function isInputElement(target) {
    if (!(target instanceof HTMLElement)) {
        return false;
    }
    const element = target;
    return element.tagName == "INPUT" || element.isContentEditable || element.tagName == "TEXTAREA";
}
function isSafeMediaType(type) {
    const splitPos = type.indexOf(";");
    if (splitPos >= 0) {
        type = type.substr(0, splitPos);
    }
    return safeTypes.indexOf("|" + type.trim() + "|") >= 0;
}
function startsWith(text, prefix) {
    if (text.length < prefix.length) {
        return false;
    }
    const c = prefix.length;
    for (let i = 0; i != c; ++i) {
        if (text.charAt(i) != prefix.charAt(i)) {
            return false;
        }
    }
    return true;
}
function isVideoType(type, forSure) {
    if (startsWith(type, "video/")) {
        return true;
    }
    if (forSure) {
        return false;
    }
    const splitPos = type.indexOf(";");
    if (splitPos >= 0) {
        type = type.substr(0, splitPos);
    }
    return type == "application/mxf" || type == "application/dash+xml";
}
function isAudioType(type, forSure) {
    if (startsWith(type, "audio/")) {
        return true;
    }
    if (forSure) {
        return false;
    }
    const splitPos = type.indexOf(";");
    if (splitPos >= 0) {
        type = type.substr(0, splitPos);
    }
    return type == "application/mxf" || type == "application/dash+xml";
}
function isAudioOrVideoType(type) {
    return isVideoType(type, true) || isAudioType(type, false);
}
function isImageType(type) {
    return startsWith(type, "image/");
}
class PayloadIFrameHost {
    postMessage(data, hostOrigin) {
        window.parent.postMessage(data, hostOrigin);
    }
    constructor(focusChangeHandler) {
        this._listener = null;
        this._focusChangeHandler = focusChangeHandler;
        if (focusChangeHandler != null) {
            this._windowFocusListener = () => {
                this._focusChangeHandler("focused");
            };
            this._windowBlurListener = () => {
                this._focusChangeHandler("blurred");
            };
            this._docFocusInListener = (event) => {
                if (event.target && isInputElement(event.target)) {
                    this._focusChangeHandler("input-focused");
                }
            };
            this._docFocusOutListener = (event) => {
                if (event.target && isInputElement(event.target)) {
                    this._focusChangeHandler("input-blurred");
                }
            };
        }
        else {
            this._windowFocusListener = this._windowBlurListener = this._docFocusInListener = this._docFocusOutListener = null;
        }
    }
    setMessageEventListener(listener) {
        // We can safely cast listener to EventListener since PayloadHostingMessage only contains an optional member named data
        // which will be contained in the event parameter passed to the event listener if the event is of type MessageEvent.
        if (this._listener) {
            window.removeEventListener("message", this._listener, false);
            if (this._windowFocusListener) {
                window.removeEventListener("focus", this._windowFocusListener);
            }
            if (this._windowBlurListener) {
                window.removeEventListener("blur", this._windowBlurListener);
            }
            if (this._docFocusInListener) {
                document.body.removeEventListener("focusin", this._docFocusInListener);
            }
            if (this._docFocusOutListener) {
                document.body.removeEventListener("focusout", this._docFocusOutListener);
            }
            this._listener = null;
        }
        if (listener) {
            window.addEventListener("message", listener, false);
            if (this._windowFocusListener) {
                window.addEventListener("focus", this._windowFocusListener);
            }
            if (this._windowBlurListener) {
                window.addEventListener("blur", this._windowBlurListener);
            }
            if (this._docFocusInListener) {
                document.body.addEventListener("focusin", this._docFocusInListener);
            }
            if (this._docFocusOutListener) {
                document.body.addEventListener("focusout", this._docFocusOutListener);
            }
            this._listener = listener;
        }
    }
    log(message) {
        window.console.log(message);
    }
}
class ListenerRegistration {
    constructor(el, type, func) {
        this.el = el;
        this.type = type;
        this.func = func;
        el.addEventListener(type, func, false);
    }
    release() {
        this.el.removeEventListener(this.type, this.func);
    }
}
function createFieldDefElement(modelDoc, fieldInfo) {
    const fieldEl = modelDoc.createElementNS(vizNs, "fielddef");
    fieldEl.setAttribute("name", fieldInfo.name);
    if (fieldInfo.label) {
        fieldEl.setAttribute("label", fieldInfo.label);
    }
    let xsdType = null;
    let mediaType = null;
    const assignSame = () => {
        xsdType = fieldInfo.type;
    };
    const typeAssignments = {
        "single-line-text": () => (xsdType = "normalizedString"),
        text: () => (xsdType = "string"),
        boolean: assignSame,
        decimal: assignSame,
        integer: assignSame,
        image: () => (mediaType = "application/atom+xml;type=entry;media=image"),
    };
    if (!fieldInfo.type) {
        xsdType = "normalizedString";
    }
    else if (Object.keys(typeAssignments).indexOf(fieldInfo.type) === -1) {
        // fieldInfo.type was set but it is not supported.
        throw new TypeError([
            "field with name <",
            fieldInfo.name,
            "> has no 'type' matching any of the following: ",
            Object.keys(typeAssignments).join(", "),
        ].join(""));
    }
    else {
        typeAssignments[fieldInfo.type]();
    }
    if (!mediaType && xsdType) {
        mediaType = "text/plain";
    }
    if (mediaType) {
        fieldEl.setAttribute("mediatype", mediaType);
    }
    if (xsdType) {
        fieldEl.setAttribute("xsdtype", xsdType);
    }
    return fieldEl;
}
function createModelXml(modelInfo) {
    const parser = new DOMParser();
    const modelDoc = parser.parseFromString("<model xmlns='http://www.vizrt.com/types'><schema/></model>", "text/xml");
    const modelEl = getFirstChildElement(modelDoc, vizNs, "model");
    const schemaEl = getFirstChildElement(modelEl, vizNs, "schema");
    // Add the fields
    for (const field of modelInfo.fields) {
        schemaEl.appendChild(createFieldDefElement(modelDoc, field));
    }
    // Possibly add duration information
    if (modelInfo.duration) {
        const durationEl = modelDoc.createElementNS(bgfxNs, "duration");
        if (modelInfo.duration.default != undefined) {
            durationEl.setAttribute("default", modelInfo.duration.default.toString());
        }
        if (modelInfo.duration.minimum != undefined) {
            durationEl.setAttribute("min", modelInfo.duration.minimum.toString());
        }
        if (modelInfo.duration.maximum != undefined) {
            durationEl.setAttribute("max", modelInfo.duration.maximum.toString());
        }
        modelEl.appendChild(durationEl);
    }
    return modelDoc;
}
/**
 * Simple class allowing logging of events
 */
class EventDispatcher {
    constructor() {
        this.eventListeners = {};
    }
    /**
     * Add an event listener to this event target
     * @param type The type of event to listen to
     * @param callback The callback to be called when event is dispatched
     * @see EventTarget.removeEventListener
     */
    addEventListener(type, callback) {
        if (!(type in this.eventListeners)) {
            this.eventListeners[type] = [];
        }
        this.eventListeners[type].push(callback);
    }
    /**
     * Remove an event listener registered on this event target
     * @param type The type of event listened to
     * @param callback The registered callback
     * @see EventTarget.addEventListener
     */
    removeEventListener(type, callback) {
        if (!(type in this.eventListeners)) {
            return;
        }
        const array = this.eventListeners[type];
        const c = array.length;
        for (let i = 0; i < c; ++i) {
            if (array[i] === callback) {
                array.splice(i, 1);
                return;
            }
        }
    }
    /**
     * Dispatch an event to the event listeners registered for the type of that event
     * @param event The event to be dispatched
     */
    dispatchEvent(source, event) {
        if (!(event.type in this.eventListeners)) {
            return;
        }
        const array = this.eventListeners[event.type];
        const c = array.length;
        for (let i = 0; i < c; ++i) {
            array[i].call(source, event);
        }
    }
    removeAllListeners() {
        this.eventListeners = {};
    }
}
/**
 * The object dealing with the communication with the payload host granting access to the
 * field values of the hosted payload.
 * @class vizrt.PayloadHosting
 */
class PayloadHosting {
    constructor() {
        this._eventTarget = new EventDispatcher();
        this._host = null;
        this._payloadDoc = null;
        this._isInUpdatePayload = false;
        this._isAboutToNotifyHost = false;
        this._isInFinishSetPayload = false;
        this._usesAutomaticBindings = true;
        this._blurListener = null;
        this._htmlElementWithPendingIncomingChange = null;
        this._listeners = [];
        this._unknownMessageHandler = null;
        this._controlledFocus = false;
        this._hostListener = null;
        this._fieldValueCallbacks = null;
        this._pendingSetTime = false;
        this._rendererLocks = [];
    }
    /**
     * Initializes the PayloadHosting object.
     * @param readyCallback Function that will be called when payload is ready.
     * It takes two parameters, `initializeType` and `$elementData`:
     *  - `initializeType`. The type of initialization when opening a payload in payloadhosting.
     * It is either `created`, called when a Template is opened (which creates a new Data-Element.)
     * Or it is `loaded`, called when an existing Data-Element is loaded.
     * It will be `undefined` when opening from TemplateBuilder.
     *  - `$elementData`. The custom data associated with the element being opened. See {@link PayloadHosting.setElementData}.
     *
     * During execution of the callback, `this` refers to this `PayloadHosting` object.
     */
    initialize(readyCallback, host) {
        this._readyCallback = readyCallback;
        if (this._host) {
            // Don't initialize multiple times (temporary fix of VST-4763)
            return;
        }
        if (!host) {
            host = new PayloadIFrameHost((type) => {
                if (this._host) {
                    const focusedControlled = this._controlledFocus && type == "focused";
                    this._host.postMessage({
                        type: "focus_changed",
                        event: focusedControlled ? "focused-controlled" : type,
                        guestid: getGuestIdentifier(),
                    }, getHostOrigin());
                }
            });
        }
        this._host = host;
        this._hostListener = (message) => {
            this._onMessageFromHost(message);
        };
        host.setMessageEventListener(this._hostListener);
        host.postMessage({ type: "payload_guest_loaded", guestid: getGuestIdentifier() }, getHostOrigin());
    }
    /**
     * Frees the resources allocated by <code>{@link PayloadHosting.initialize}</code>.
     * Removes bindings and listeners.
     */
    uninitialize() {
        if (this._host == null) {
            return;
        }
        this._host.setMessageEventListener(null);
        this._hostListener = null;
        this._host = null;
        this._payloadDoc = null;
        this._modelUri = null;
        this._modelDoc = null;
        this._modelElement = null;
        this._fieldValueCallbacks = null;
        this._readyCallback = null;
        this._removePreviousListeners();
        this._eventTarget.removeAllListeners();
        this._modelInfoXml = undefined;
    }
    /**
     * Set a custom property to be associated with the currently opened element.
     * This property will be stored together with the data element when saved.
     * @param property The name of the property
     * @param value The new value of the property, or <code>null</code>, to delete the property
     */
    setElementData(property, value) {
        if (!this._host) {
            throw Error("Host not defined");
        }
        if (typeof property !== "string" || (typeof value !== "string" && value !== null)) {
            throw Error("Invalid arguments provided to setElementData");
        }
        this._host.postMessage({
            type: "data_changed",
            changes: [{ path: ["$elementData", property], value }],
            guestid: getGuestIdentifier(),
        }, getHostOrigin());
    }
    /**
     * Add an event listener to this object.
     * The following event types are supported: <br>
     * <b>payloadchange</b> - this event is triggered every time this object receives an updated payload from its host.
     * If the event listener is added before the first payload is received from the host this event will be triggered after
     * the <code>readyCallback</code> of <code>{@link PayloadHosting.initialize}</code> is called.
     * If this event listener is registered in the <code>readyCallback</code> it will be called for the first time immediately
     * after the <code>readyCallback</code>.
     * If changing multiple fields during handling of this event there is no need for using
     * <code>{@link PayloadHosting.updatePayload}</code> (to prevent multiple updates of the host)
     * since the event is always called in the context of <code>updatePayload</code>.
     * @param type The type of event to listen to. The only supported type is currently "payloadchange",
     * @param callback The callback to be called when event is dispatched.
     *                                       During execution of the callback, <code>this</code> refers to this <code>PayloadHosting</code> object.
     * @see {@link PayloadHosting.removeEventListener}
     * @see {@link PayloadHosting.setFieldValueCallbacks}
     */
    addEventListener(type, callback) {
        this._eventTarget.addEventListener(type, callback);
    }
    /**
     * Simply checks if this payloadhosting instance has any field value callbacks registered.
     */
    hasFieldValueCallbacks() {
        return this._fieldValueCallbacks !== null;
    }
    /**
     * Remove an event listener registered in this object.
     * @param type The type of event listened to
     * @param callback The registered callback
     * @see {@link PayloadHosting.addEventListener}
     */
    removeEventListener(type, callback) {
        this._eventTarget.removeEventListener(type, callback);
    }
    getExistingRendererLock(target) {
        let i;
        for (i = 0; i < this._rendererLocks.length; i++) {
            if (this._rendererLocks[i].target === target) {
                return this._rendererLocks[i];
            }
        }
        return null;
    }
    removeRendererLock(o) {
        let i;
        for (i = 0; i < this._rendererLocks.length; i++) {
            if (this._rendererLocks[i] === o) {
                this._rendererLocks.splice(i, 1);
                return;
            }
        }
    }
    /**
     * Seeks to the given time into the given video in a way
     * that will delay the propagation of the "present" message until
     * the seek operation is complete or an error occurred. This will
     * ensure that the rendering process will wait for this operation to
     * be complete before actually burning the frame.
     *
     * @param video The video element to seek
     * @param time The time position to seek to, given in seconds
     */
    safeVideoSeek(video, time) {
        const lock = this.getRendererLock(video);
        const listener = function () {
            lock.unlock();
            video.removeEventListener("seeked", listener);
            video.removeEventListener("error", listener);
        };
        video.addEventListener("seeked", listener);
        video.addEventListener("error", listener);
        video.currentTime = time;
    }
    /**
     * Loads the given url into the given image element in a way
     * that will delay the propagation of the "present" message until
     * the seek operation is complete or an error occurred. This will
     * ensure that the rendering process will wait for this operation to
     * be complete before actually burning the frame.
     *
     * @param image The image element
     * @param url The url to load into the src attribute of the image element
     */
    safeImageLoad(image, url) {
        const lock = this.getRendererLock(image);
        const listener = function () {
            lock.unlock();
            image.removeEventListener("load", listener);
            image.removeEventListener("error", listener);
        };
        image.addEventListener("load", listener);
        image.addEventListener("error", listener);
        image.src = url;
    }
    /**
     * Returns a lock that will prevent the pending processing of the "set_time" message,
     * if any, to reply with the "present" message to the host until the unlock() method is invoked.
     * This mechanism is meant to delay the rendering process of a frame until some asynchronous
     * operation is completed, like for instance loading and image.
     *
     * @param o The object we want a renderer lock for
     * @returns An object whose unlock() method must be invoked to release the lock.
     */
    getRendererLock(o) {
        const l = this.getExistingRendererLock(o);
        if (l !== null) {
            // We don't want to put more than one lock per object
            return l;
        }
        const lock = {};
        lock.target = o;
        lock.unlock = () => {
            this.removeRendererLock(lock);
            if (this._rendererLocks.length == 0) {
                if (this._pendingSetTime) {
                    // If there is no more lock and if there is a pending set_time
                    // operation, it is time to send a "present" message to the host
                    // to give green light to the renderer
                    this._pendingSetTime = false;
                    if (!this._host) {
                        throw Error("Host not defined");
                    }
                    this._host.postMessage({ type: "present" }, getHostOrigin());
                }
            }
        };
        this._rendererLocks.push(lock);
        return lock;
    }
    _onMessageFromHost(message) {
        if (!this._host) {
            throw Error("Host not defined");
        }
        const messageType = message.data ? message.data.type : "<no message data>";
        if (messageType === "set_payload") {
            if (!message.data) {
                throw Error("No message data");
            }
            if (message.data.initializeType && !this._initializeType) {
                this._initializeType = message.data.initializeType;
            }
            if (message.data.$elementData && !this._elementData) {
                this._elementData = message.data.$elementData;
            }
            this._setPayload(message.data.xml || "");
        }
        else if (messageType === "request_model_info" && this._modelInfoXml) {
            this._host.postMessage({ type: "provide_model_info", xml: this._modelInfoXml, guestid: getGuestIdentifier() }, getHostOrigin());
        }
        else {
            if (this._unknownMessageHandler && !this._unknownMessageHandler(message)) {
                this._log("Got unknown message type from host: " + messageType);
            }
            // Check if unknown-message handler has set model info, and in that case provide it to the host
            if (messageType === "request_model_info" && this._modelInfoXml) {
                this._host.postMessage({ type: "provide_model_info", xml: this._modelInfoXml, guestid: getGuestIdentifier() }, getHostOrigin());
            }
            if (messageType === "set_time") {
                if (this._rendererLocks.length != 0) {
                    // If the processing of the set_time message has resulted in the creation
                    // of renderer locks, we need to wait for them to be unlocked before
                    // we can sending the "present" message back to the host
                    this._pendingSetTime = true;
                }
                else {
                    this._host.postMessage({ type: "present" }, getHostOrigin());
                }
            }
        }
    }
    _log(message) {
        if (this._host) {
            this._host.log(message);
        }
    }
    _lookupXmlElement(fieldPath, lookupPayload) {
        if (!this._payloadDoc) {
            throw new Error("PayloadHosting not ready!");
        }
        if (fieldPath == null || fieldPath.length == 0) {
            return null;
        }
        let el = getFirstChildElement(this._payloadDoc, vizNs, "payload");
        let isPayloadEl = true;
        const pathElements = fieldPath.split("/");
        for (let i = 0; i != pathElements.length && el != null; ++i) {
            const pathElm = pathElements[i];
            if (pathElm.length == 0) {
                return null;
            }
            if (!isPayloadEl && pathElm.charAt(0) === "#" && isNumerical(pathElm.substring(1))) {
                el = findListItem(el, parseInt(pathElm.substring(1)));
                isPayloadEl = true;
            }
            else {
                el = findFieldElement(el, pathElm);
                isPayloadEl = false;
            }
        }
        return isPayloadEl === lookupPayload ? el : null;
    }
    _lookupXmlElementStrict(fieldPath, lookupPayload) {
        const result = this._lookupXmlElement(fieldPath, lookupPayload);
        if (!result) {
            throw new Error((lookupPayload ? "List item '" : "Field '") + fieldPath + "' does not exist.");
        }
        return result;
    }
    /**
     * find an XML element representing either a field definition or a row-model.
     * To lookup a row-model the full index (e.g. '#3') can be used. This allows using the
     * field path (e.g. 'my-list/#2/my-column') to lookup the definition for 'my-column'.
     */
    _lookupXmlDefElement(fieldPath, lookupListDef) {
        if (!this._modelElement) {
            throw new Error("PayloadHosting does not have a model.");
        }
        if (fieldPath == null || fieldPath.length == 0) {
            return null;
        }
        let el = this._modelElement;
        let isModelEl = true;
        const pathElements = fieldPath.split("/");
        for (let i = 0; i != pathElements.length && el != null; ++i) {
            const pathElm = pathElements[i];
            if (pathElm.length == 0) {
                return null;
            }
            if (isModelEl) {
                el = getFirstChildElement(el, vizNs, "schema");
            }
            if (!isModelEl && pathElm.charAt(0) === "#") {
                el = getFirstChildElement(el, vizNs, "listdef");
                isModelEl = true; // The list definition is a row-model (and has a schema node where the child fields are located)
            }
            else {
                el = findFieldElement(el, pathElm, true);
                isModelEl = false;
            }
        }
        return isModelEl === lookupListDef ? el : null;
    }
    _lookupXmlDefElementStrict(fieldPath, lookupListDef) {
        const result = this._lookupXmlDefElement(fieldPath, lookupListDef);
        if (!result) {
            throw new Error((lookupListDef ? "List definition for '" : "Field definition for '") + fieldPath + "' does not exist.");
        }
        return result;
    }
    _removePreviousListeners() {
        const c = this._listeners ? this._listeners.length : 0;
        for (let i = 0; i != c; ++i) {
            this._listeners[i].release();
        }
        this._listeners = [];
    }
    _finishAutoSetFieldValue(htmlElement) {
        if (this._blurListener != null && this._htmlElementWithPendingIncomingChange == htmlElement) {
            htmlElement.removeEventListener("blur", this._blurListener);
            this._blurListener = null;
            this._htmlElementWithPendingIncomingChange = null;
        }
        this.notifyHostAboutPayloadChange();
    }
    _createTextInputListener(fieldElement, htmlElement) {
        return () => {
            setFieldValueAsText(fieldElement, htmlElement.value);
            this._finishAutoSetFieldValue(htmlElement);
        };
    }
    _createXmlInputListener(fieldElement, htmlElement) {
        return () => {
            setFieldValueAsParsedXml(fieldElement, htmlElement.value);
            this._finishAutoSetFieldValue(htmlElement);
        };
    }
    _createBlurListenerForElementWithPendingIncomingNewValue(htmlElement, newValue) {
        this._blurListener = function () {
            htmlElement.value = newValue;
            htmlElement.removeEventListener("blur", this._blurListener);
            this._blurListener = null;
            this._htmlElementWithPendingIncomingChange = null;
        };
        this._htmlElementWithPendingIncomingChange = htmlElement;
    }
    _getFieldContent(fieldPath) {
        if (!this.isPayloadReady()) {
            return { cache: "null", value: null };
        } // to ensure that we get a change notification when payload becomes ready (even if value is null)
        const fieldElement = this._lookupXmlElement(fieldPath, false);
        if (!fieldElement) {
            return { cache: "null", value: null };
        }
        const valueElement = getFirstChildElement(fieldElement, vizNs, "value");
        if (valueElement) {
            const xmlElement = getFirstChildElement(valueElement, null, null);
            if (!xmlElement) {
                const textValue = payload_hosting_text(valueElement);
                return { cache: "value:" + textValue, value: textValue };
            }
            else {
                return { cache: "xml-value:" + new XMLSerializer().serializeToString(xmlElement), value: xmlElement };
            }
        }
        const listElement = getFirstChildElement(fieldElement, vizNs, "list");
        if (!listElement) {
            return { cache: "null", value: null };
        }
        // We have a list, count the number of elements
        const iterator = new TypedElementIterator(new SingleElementIterator(listElement), vizNs, "payload");
        let count = 0;
        while (iterator.next() != null) {
            ++count;
        }
        return { cache: "xml-value:" + new XMLSerializer().serializeToString(listElement), value: count };
    }
    _initializeOnFields(fieldElementIterator, parentPath, parentId) {
        parentId = parentId ? parentId + "_" : "field_";
        let fieldElement;
        while ((fieldElement = fieldElementIterator.next()) != null) {
            const fieldName = fieldElement.getAttribute("name");
            const fieldPath = parentPath ? parentPath + "/" + fieldName : fieldName;
            const fieldId = parentId + fieldName;
            if (this._usesAutomaticBindings) {
                const htmlElement = document.getElementById(fieldId);
                if (htmlElement && "value" in htmlElement) {
                    const dataType = htmlElement.getAttribute("data-type");
                    let text;
                    let listener;
                    if (dataType === "text/xml") {
                        text = getFieldValueXmlAsString(fieldElement) || "";
                        listener = this._createXmlInputListener(fieldElement, htmlElement);
                    }
                    else {
                        text = getTextFromFieldElement(fieldElement) || "";
                        listener = this._createTextInputListener(fieldElement, htmlElement);
                    }
                    if (htmlElement.value !== text) {
                        if (document["activeElement"] != htmlElement) {
                            htmlElement.value = text;
                        }
                        else {
                            this._createBlurListenerForElementWithPendingIncomingNewValue(htmlElement, text);
                        }
                    }
                    this._listeners.push(new ListenerRegistration(htmlElement, htmlElement instanceof HTMLSelectElement ? "change" : "input", listener));
                }
            }
            this._initializeOnFields(new TypedElementIterator(new SingleElementIterator(fieldElement), vizNs, "field"), fieldPath || undefined, fieldId);
        }
    }
    _initializeOnPayload() {
        this._removePreviousListeners();
        const payloadElement = getFirstChildElement(this._payloadDoc, vizNs, "payload");
        this._initializeOnFields(new TypedElementIterator(new SingleElementIterator(payloadElement), vizNs, "field"));
    }
    _updateFieldValueCallbacks() {
        if (!this._fieldValueCallbacks) {
            return;
        }
        for (const fieldPath in this._fieldValueCallbacks) {
            const entry = this._fieldValueCallbacks[fieldPath];
            const newContent = this._getFieldContent(fieldPath);
            const oldCacheValue = entry.value;
            entry.value = newContent.cache;
            if (entry.value !== oldCacheValue) {
                // undefined !== null, but undefined == null
                entry.callback(newContent.value);
            }
        }
    }
    _setPayload(payloadXml) {
        const parser = new DOMParser();
        this._payloadDoc = parser.parseFromString(payloadXml, "text/xml");
        const payloadElement = getFirstChildElement(this._payloadDoc, vizNs, "payload");
        const inlineModelElement = getFirstChildElement(payloadElement, vizNs, "model");
        const modelUri = payloadElement ? payloadElement.getAttribute("model") : null;
        if (inlineModelElement != null || modelUri == null) {
            this._modelUri = null;
            this._modelDoc = null;
            this._modelElement = inlineModelElement;
        }
        else {
            if (modelUri !== this._modelUri) {
                this._modelDoc = null;
                this._modelElement = null;
                this._modelUri = null;
                fetch(modelUri)
                    .then(response => response.text())
                    .then(responseXML => new DOMParser().parseFromString(responseXML, "text/xml"))
                    .then(modelDoc => {
                    this._modelElement = getFirstChildElement(modelDoc, vizNs, "model");
                    if (this._modelElement != null) {
                        this._modelDoc = modelDoc;
                        this._modelUri = modelUri;
                    }
                    this._finishSetPayload();
                });
                return;
            }
        }
        this._finishSetPayload();
    }
    _finishSetPayload() {
        this._isInFinishSetPayload = true;
        try {
            this.updatePayload(() => {
                if (this._usesAutomaticBindings) {
                    this._initializeOnPayload();
                }
                if (this._fieldValueCallbacks) {
                    this._updateFieldValueCallbacks();
                }
                if (this._readyCallback) {
                    this._readyCallback(this._initializeType, this._elementData);
                    this._readyCallback = null;
                    this._initializeType = undefined;
                    this._elementData = undefined;
                }
                this._eventTarget.dispatchEvent(this, createEvent("payloadchange"));
                return false;
            });
        }
        finally {
            this._isInFinishSetPayload = false;
        }
    }
    /**
     * Sets whether this payload hosting automatically should connect fields in payload with input elements in current document.
     * It will connect an HTML element with ID "field_x" to a payload field named "x" and an HTML element with
     * ID "field_x_y" to a sub-field named "y" of a field named "x" in the payload.
     * Supported HTML elements are \<input\>, \<textarea\>, and \<select>.
     * To connect to XML fields instead of text fields use the prefix <i>xmlfield_</i> instead of <i>field_</i> in the HTML
     * input element IDs.
     * The default value of this property is 'true'. Setting this property to true causes immediate binding if payload is ready
     * and if payload is not yet ready causes binding when payload becomes ready.
     * Setting the property to false immediately removes bindings if payload is ready and if not cancels binding when payload
     * becomes ready.
     * @param useAutomaticBindings whether to automatically fields in payload with HTML elements in the document.
     * @see {@link PayloadHosting.getUsesAutomaticBindings}
     */
    setUsesAutomaticBindings(useAutomaticBindings) {
        useAutomaticBindings = !!useAutomaticBindings; // Ensure true/false
        if (useAutomaticBindings !== this._usesAutomaticBindings) {
            if (useAutomaticBindings) {
                this._initializeOnPayload();
            }
            else {
                this._removePreviousListeners();
            }
            this._usesAutomaticBindings = useAutomaticBindings;
        }
    }
    /**
     * Gets whether payload fields and HTML input elements are automatically connected.
     * @returns Whether automatic bindings are used.
     * @see {@link PayloadHosting.setUsesAutomaticBindings}
     */
    getUsesAutomaticBindings() {
        return this._usesAutomaticBindings;
    }
    /**
     * <br>Sets callbacks to be called back when the values or lists of a given set of fields change.
     * A callback will be called if the value or list of the associated field changes both if the change is
     * caused by the host or if it is caused by a programmatic change to the field using the
     * payloadhosting API.
     * <br><b>Note!</b> The order of the callbacks is relevant:
     * If the value or list of field <i>y</i> (that has a value-change callback) is changed during execution of the value change callback
     * of field <i>x</i>, the callback of field <i>y</i> will be triggered if and only if field <i>y</i> is after field <i>x</i> in the
     * value callback map. However, if the callback of <i>y</i> is before the callback of <i>x</i> in the map, it will
     * be called next time there is a change to the payload. Therefore, to get a predictable result, it is recommended that, if
     * the value-change callback of a field change the values or lists of other fields with registered value-change callbacks, the callbacks
     * of those other fields are put after the callback of the first field.
     * <br>Also note that when the host changes the payload the field value callbacks are called before the <code>payloadchange</code>
     * event is triggered (see <code>{@link PayloadHosting.addEventListener}</code>).
     * Also, if the values or lists of some fields are changed during handling of the <code>payloadchange</code> event, the value-change
     * callbacks for those fields will not be called.
     * <br> If changing multiple fields during handling of these callbacks there is no need for using
     * <code>{@link PayloadHosting.updatePayload}</code> (to prevent multiple updates of the host)
     * since <code>payloadhosting</code> always executes the callbacks in the context of <code>updatePayload</code>.
     * @param callbacks Map from field paths to {@link FieldValueCallback} functions
     *                           to be called whenever each of those fields change.
     *                           During execution of each of these callbacks, <code>this</code> refers to this <code>PayloadHosting</code> object.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.addEventListener}
     * @example
     * // In this example on01Changed will be called when the field named 01 changes and
     * // on02Changed will be called when the field named 02 changes.
     * function on01Changed() { ... }
     * function on02Changed() { ... }
     * vizrt.payloadhosting.setFieldValueCallbacks({ "01": on01Changed, "02": on02Changed });
     */
    setFieldValueCallbacks(callbacks) {
        if (!callbacks) {
            this._fieldValueCallbacks = null;
        }
        else {
            this._fieldValueCallbacks = {};
            this.addFieldValueCallbacks(callbacks);
        }
    }
    /**
     * @see {@link PayloadHosting.setFieldValueCallbacks} for documentation.
     *
     * @param callbacks
     */
    addFieldValueCallbacks(callbacks) {
        if (!callbacks) {
            return;
        }
        for (const fieldPath in callbacks) {
            if (typeof fieldPath !== "string") {
                throw Error("Field path is not a string: " + {}.toString.call(fieldPath));
            }
            if (typeof callbacks[fieldPath] !== "function") {
                throw Error("Callback value for field '" + fieldPath + "' is not a function, but '" + typeof callbacks[fieldPath] + "'.");
            }
            if (this._fieldValueCallbacks) {
                this._fieldValueCallbacks[fieldPath] = {
                    callback: callbacks[fieldPath],
                    value: this._getFieldContent(fieldPath).cache,
                };
            }
            else {
                throw Error("Field value callbacks are not defined");
            }
        }
    }
    /**
     * Sets the handler to be called when this object receives messages that it does not understand.
     * Return true in this handler to indicate that the handler understood the message.
     * @param handler The new handler function, a function taking one parameter containing the message data from the host.
     */
    setUnknownMessageHandler(handler) {
        this._unknownMessageHandler = handler;
    }
    /**
     * Gets the handler to be called when this object receives messages that it does not understand.
     * @returns The current handler used when unknown message are received from host.
     */
    getUnknownMessageHandler() {
        return this._unknownMessageHandler;
    }
    /**
     * Used to register a URL-based logout hook that will be called when the supporting application exits.
     * If supported, the label and icon will be used to designate the type of logout being performed by the application.
     * @param providerId  Unique identifier for the the domain of the identity provider that has been used to
     *                             authorize access to external services. In most cases, only one active authorization is
     *                             allowed per domain, and this identifier will simply be the identity providers
     *                             host-domain. New requests with the same identifier will be treated with the assumption
     *                             that any previously registered log-out requests have already been serviced by the
     *                             frame, and prior requests will be overwritten.
     * @param label       The label that will be used by the application to specify what logout action is being
     *                             performed (if this feature is supported by the application).
     * @param iconUrl     The URL of the icon that will be used to show a small logo for the publishing agent
     *                             that will be logged out (if this feature is supported by the application). This can be
     *                             a relative URL with respect to the path of the calling frame.
     * @param brokerJsUrl The URL used by the supporting application to log out of the publishing agent that was
     *                             previously logged in by a user action. This can be a relative URL with respect to the
     *                             path of the calling frame.
     * @param logoutData  JSON object holding any additional fields needed by the logout javascript file to
     *                             perform logout operations.
     * @see {@link PayloadHosting.unregisterLogoutHook},
     */
    registerLogoutHook(providerId, label, iconUrl, brokerJsUrl, logoutData) {
        if (!this._host) {
            throw Error("Host is not defined");
        }
        const brokerJsLink = document.createElement("a");
        brokerJsLink.href = brokerJsUrl;
        const iconLink = document.createElement("a");
        iconLink.href = iconUrl;
        this._host.postMessage({
            type: "logged_in",
            providerId: providerId,
            label: label,
            iconUri: iconLink.href,
            brokerJsUri: brokerJsLink.href,
            logoutData: JSON.stringify(logoutData),
            guestid: getGuestIdentifier(),
        }, getHostOrigin());
    }
    /**
     * Used to un-register a logout hook. This can be used if another method of logging out was performed by user action and
     * no longer needs to be repeated by the application. This must also be called in the logout code to let the application
     * know that the logout action has completed. This call does not require a valid guest ID when called from the logout
     * page. The message providerId will be used to uniquely identify the page instead.
     * @param providerId Unique identifier for the the domain of the identity provider that has been previously logged in to.
     * @see {@link PayloadHosting.registerLogoutHook},
     */
    unregisterLogoutHook(providerId) {
        if (!this._host) {
            throw Error("Host is not defined");
        }
        this._host.postMessage({ type: "logged_out", providerId: providerId, guestid: getGuestIdentifier() }, getHostOrigin());
    }
    /**
     * Adds an item to the list of a list field.
     * @param fieldPath The path of the list field
     * @param position The position where to insert the item.
     *                           If omitted the new item will be added at the end of the list.
     *                           If 0 or positive, the zero-based position from the front of the list for the new item.
     *                           If negative, the absolute value is the one-based position from the back of the list for the new item
     *                           (-1 will add at the end, -2 will insert before the last item, etc.).
     * @returns The path of the new item. This path represents a payload, and to get the path of a field in that
     *                  payload, '/' followed by the field path within the list item payload must be added to the returned path.
     * @throws Throws an <code>Error</code> if:
     *                 <ul><li>not <code>{@link PayloadHosting.hasModel}()</code></li>
     *                 <li>the field does not exist or is not a list field</li>
     *                 <li>the list of the list field is already full</li></ul>
     * @throws Throws a <code>RangeError</code> if <code>position</code> is out of range.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.isListField},
     * @see {@link PayloadHosting.removeListFieldItem}
     * @example
     * // In this example an item will be appended to the list of the field named 'my-list',
     * // and the value of the field named 'first-name' in that appended item will be set to "Andreas".
     * // (The schema of the list definition of 'my-list' is assumed to contain a field definition
     * // for a field named 'first-name'.)
     * var insertPath = vizrt.payloadhosting.addListFieldItem("my-list");
     * vizrt.payloadhosting.setFieldText(insertPath + "/first-name", "Andreas")
     */
    addListFieldItem(fieldPath, position) {
        const fieldElement = this._lookupXmlElementStrict(fieldPath, false);
        const fieldDefElement = this._lookupXmlDefElementStrict(fieldPath, false);
        const listDefElement = getListDefElement(fieldDefElement, fieldPath);
        const maxCount = getListMaxCount(listDefElement);
        if (position === undefined) {
            position = -1;
        }
        const count = position < 0 || maxCount != null ? this.getListFieldLength(fieldPath) || 0 : 0;
        if (position < -1) {
            position = count + 1 + position;
            if (position < 0) {
                throw createAddListItemRangeError(count);
            }
        }
        if (maxCount != null && count >= maxCount) {
            throw new Error("The list is already full.");
        }
        const listEl = getFirstChildElement(fieldElement, vizNs, "list") ||
            fieldElement.appendChild(fieldElement.ownerDocument.createElementNS(vizNs, "list"));
        const iterator = new TypedElementIterator(new SingleElementIterator(listEl), vizNs, "payload");
        let refElement = null;
        let refPosition = 0;
        if (position >= 0) {
            while ((refElement = iterator.next()) != null && refPosition < position) {
                ++refPosition;
            }
            if (refElement == null && refPosition < position) {
                throw createAddListItemRangeError(refPosition);
            }
        }
        listEl.insertBefore(createListItem(listDefElement), refElement);
        this.notifyHostAboutPayloadChange();
        return fieldPath + "/#" + (position < 0 ? count : refPosition);
    }
    /**
     * Gets whether a field with a given path exists.
     * The field path is built from the names of field and sub-fields separated with slashes.
     * To address a list element of a list field use &lt;list-field-path&gt;/#&lt;index&gt; where &lt;list-field-path&gt; is the path of the
     * list field and &lt;index&gt; is the zero-based index of the list field. See field path examples below.
     * @example <caption>field path of field named <b>my-field</b></caption>
     * "my-field"
     * @example <caption>field path of sub-field named <b>01</b> in a field named <b>container</b></caption>
     * "container/01"
     * @example <caption>field path of field named <b>age</b> in the second row of a list field named <b>table</b></caption>
     * "table/#1/age"
     * @param fieldPath The path of the field
     * @returns <code>true</code> if the field exists, otherwise <code>false</code>.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>.
     */
    fieldExists(fieldPath) {
        return this._lookupXmlElement(fieldPath, false) != null;
    }
    /**
     * Determines the media type for a scalar field.
     * @param fieldPath The path of the field
     * @returns <code>null</code> if no field definition found for the field or if the field is not a scalar field,
     *                   otherwise the media type for the field.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.hasModel}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.isScalarField}
     */
    getFieldMediaType(fieldPath) {
        const fieldDefElement = this._lookupXmlDefElement(fieldPath, false);
        return fieldDefElement ? fieldDefElement.getAttribute("mediatype") : null;
    }
    /**
     * Gets the text of a scalar field with a given path
     * @param fieldPath The path of the field
     * @returns The text value of the field.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.setFieldText}
     */
    getFieldText(fieldPath) {
        const fieldElement = this._lookupXmlElement(fieldPath, false);
        return fieldElement ? getTextFromFieldElement(fieldElement) : null;
    }
    /**
     * Gets the XML value of a scalar field.
     * @param fieldPath The path of the field
     * @returns The XML element stored as the value of the field or
     *                    <code>null</code> if the field does not exist or if the field value contains no XML element.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.setFieldXml}
     * @see {@link PayloadHosting.getFieldXmlAsString}
     */
    getFieldXml(fieldPath) {
        const fieldElement = this._lookupXmlElement(fieldPath, false);
        return fieldElement ? getXmlFromFieldElement(fieldElement) : null;
    }
    /**
     * Gets the XML value of a scalar field serialized to a string.
     * @param fieldPath The path of the field
     * @returns The XML serialized to string or <code>null</code> if the field does not exist or the field value contains no XML element.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.setFieldXml}
     * @see {@link PayloadHosting.getFieldXml}
     */
    getFieldXmlAsString(fieldPath) {
        const fieldElement = this._lookupXmlElement(fieldPath, false);
        return fieldElement ? getFieldValueXmlAsString(fieldElement) : null;
    }
    /**
     * Extract information about the media from the atom entry value of the field
  
     * @param atomEntry The atom entry value of the field
     * @returns Information about the media found in the atom entry.
     * @see {@link PayloadHosting.getFieldXml}
     * @see {@link PayloadHosting.getFieldMediaInfo}
     */
    getMediaInfoFromAtomEntry(atomEntry, onlySafe) {
        const entryContentEl = getFirstChildElement(atomEntry, atomNs, "content");
        const entryContentType = entryContentEl ? entryContentEl.getAttribute("type") : null;
        const entryContentUrl = entryContentType == "application/vnd.vizrt.viz.image"
            ? getSafeVizImageUrl(entryContentEl)
            : entryContentEl
                ? entryContentEl.getAttribute("src")
                : null;
        let entryContentInfo = entryContentUrl && entryContentType
            ? { isDefault: false, uri: entryContentUrl, type: entryContentType }
            : null;
        if (entryContentInfo && onlySafe && !isSafeMediaType(entryContentInfo.type)) {
            entryContentInfo = null;
        }
        // Determine the main media type of the asset (audio/video/image)
        let isAudio = false;
        let isVideo = false;
        let isImage = false;
        let isAudioOrVideo = false;
        if (entryContentType &&
            (isVideoType(entryContentType, true) || entryContentType == "application/vnd.vizrt.viz.video")) {
            isVideo = true;
            isAudioOrVideo = true;
        }
        else if (entryContentType &&
            (isAudioType(entryContentType, true) || entryContentType == "application/vnd.vizrt.viz.audio")) {
            isAudio = true;
            isAudioOrVideo = true;
        }
        else if (entryContentType &&
            (isImageType(entryContentType) || entryContentType == "application/vnd.vizrt.viz.image")) {
            isImage = true;
        }
        else {
            const mediaTypeEl = getFirstChildElement(atomEntry, vizmediaNs, "media");
            const mediaType = mediaTypeEl ? payload_hosting_text(mediaTypeEl) : null;
            if (mediaType) {
                isAudio = mediaType == "audio";
                isVideo = mediaType == "video";
                isImage = mediaType == "image";
                isAudioOrVideo = isAudio || isVideo;
            }
        }
        const groupEl = getFirstChildElement(atomEntry, mrssNs, "group");
        if (!groupEl) {
            return entryContentInfo ? [entryContentInfo] : [];
        }
        // Loop over the <media:content> elements of the the <media:group> element
        const defaultItems = [];
        const nonDefaultItems = [];
        let contentEl;
        const iterator = new TypedElementIterator(new SingleElementIterator(groupEl), mrssNs, "content");
        while ((contentEl = iterator.next()) != null) {
            // Check if the content element is relevant
            if (!contentEl.getAttribute("url") || !contentEl.getAttribute("type") || contentEl.getAttribute("order")) {
                continue;
            }
            const uri = contentEl.getAttribute("url");
            const type = contentEl.getAttribute("type");
            if (onlySafe && !isSafeMediaType(type)) {
                continue;
            }
            if ((isAudioOrVideo && isImageType(type)) ||
                (isVideo && isAudioType(type, true)) ||
                (isImage && isAudioOrVideoType(type))) {
                continue;
            }
            // Determine "where" to put the content element
            const isDefaultAttr = contentEl.getAttribute("isDefault");
            const isDefault = "true" == isDefaultAttr || "1" == isDefaultAttr;
            let insertFirst = false;
            if (entryContentInfo != null && entryContentInfo.uri == uri) {
                entryContentInfo = null;
                insertFirst = !isDefault;
            }
            // Create the media info object
            const item = { isDefault: isDefault, uri: uri, type: type };
            const width = getAttributeInt(contentEl, "width");
            if (width != undefined) {
                item.width = width;
            }
            const height = getAttributeInt(contentEl, "height");
            if (height != undefined) {
                item.height = height;
            }
            const duration = getAttributeFloat(contentEl, "duration");
            if (duration != undefined) {
                item.duration = duration;
            }
            const size = getAttributeInt(contentEl, "fileSize");
            if (size != undefined) {
                item.size = size;
            }
            // Add it to the relevant position ("where")
            if (isDefault) {
                defaultItems.push(item);
            }
            else if (insertFirst) {
                nonDefaultItems.splice(0, 0, item);
            }
            else {
                nonDefaultItems.push(item);
            }
        }
        if (entryContentInfo != null) {
            nonDefaultItems.splice(0, 0, entryContentInfo);
        }
        return !defaultItems.length
            ? nonDefaultItems
            : !nonDefaultItems.length
                ? defaultItems
                : defaultItems.concat(nonDefaultItems);
    }
    /**
     * Gets information about the media of a field
     * @param fieldPath The path of the field
     * @returns Information about the media of the field or <code>null</code> if the field does not exist.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     */
    getFieldMediaInfo(fieldPath, onlySafe) {
        const fieldValue = this.getFieldXml(fieldPath);
        return fieldValue ? this.getMediaInfoFromAtomEntry(fieldValue, onlySafe) : null;
    }
    /**
     * Determines the media type for a scalar field.
     * @param fieldPath The path of the field
     * @returns <code>null</code> if no field definition found for the field or if no xsd type specified for the field,
     *                   otherwise the XSD type for the field.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.hasModel}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.isScalarField}
     */
    getFieldXsdType(fieldPath) {
        const fieldDefElement = this._lookupXmlDefElement(fieldPath, false);
        return fieldDefElement ? fieldDefElement.getAttribute("xsdtype") : null;
    }
    /**
     * Gets the number of elements in a list field.
     * @param fieldPath The path of the field
     * @returns The number of elements or <code>null</code> if the field does exist or does not contain a list.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     */
    getListFieldLength(fieldPath) {
        const fieldElement = this._lookupXmlElement(fieldPath, false);
        if (!fieldElement) {
            return null;
        }
        const listEl = getFirstChildElement(fieldElement, vizNs, "list");
        if (!listEl) {
            return null;
        }
        const iterator = new TypedElementIterator(new SingleElementIterator(listEl), vizNs, "payload");
        let result = 0;
        while (iterator.next() != null) {
            ++result;
        }
        return result;
    }
    /**
     * Gets the maximum number of elements allowed in a list field.
     * @param fieldPath The path of the field
     * @returns The maximum number of elements or <code>null</code> if the list
     *                   definition does not specify a maximum list length.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.hasModel}()</code>
     *                 or if the field is not a list.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.getListFieldLength}
     * @see {@link PayloadHosting.getListFieldMinimumLength}.
     */
    getListFieldMaximumLength(fieldPath) {
        return getListMaxCount(getListDefElement(this._lookupXmlDefElementStrict(fieldPath, false), fieldPath));
    }
    /**
     * Gets the minimum number of elements allowed in a list field.
     * @param fieldPath The path of the field
     * @returns The minimum number of elements allowed. Note that this function (unlike
     *                   <code>{@link PayloadHosting.getListFieldMaximumLength}()</code>)
     *                   returns 0 also if the list does not specify a minimum list length.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.hasModel}()</code>
     *                 or if the field is not a list.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.getListFieldLength}
     * @see {@link PayloadHosting.getListFieldMaximumLength}.
     */
    getListFieldMinimumLength(fieldPath) {
        return getListMinCount(getListDefElement(this._lookupXmlDefElementStrict(fieldPath, false), fieldPath)) || 0;
    }
    /**
     * Determines whether a field is defined.
  
     * @param fieldPath The path of the field
     * @returns <code>true</code> if the model contains a definition for the field, and <code>false</code> otherwise.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.hasModel}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     */
    isFieldDefined(fieldPath) {
        return !!this._lookupXmlDefElement(fieldPath, false);
    }
    /**
     * Determines whether a field is a list field. A list field is allowed to contain a list.
     * If a field is neither a scalar field nor a list field, it is a void field (probably used to contain sub-fields).
     * @param fieldPath The path of the field
     * @returns <code>null</code> if no field definition found for the field,
     *                   <code>true</code> if the field is a list field, and <code>false</code> otherwise.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.hasModel}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.isScalarField}
     * @see {@link PayloadHosting.getListFieldLength}
     * @see {@link PayloadHosting.addListFieldItem}
     * @see {@link PayloadHosting.removeListFieldItem}
     */
    isListField(fieldPath) {
        const fieldDefElement = this._lookupXmlDefElement(fieldPath, false);
        return fieldDefElement ? !!getFirstChildElement(fieldDefElement, vizNs, "listdef") : null;
    }
    /**
     * Determines whether a field is a scalar field. A scalar field is allowed to contain a value.
     * If a field is neither a scalar field nor a list field, it is a void field (probably used to contain sub-fields).
     * @param fieldPath The path of the field
     * @returns <code>null</code> if no field definition found for the field,
     *                   <code>true</code> if the field is a scalar field, and <code>false</code> otherwise.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.hasModel}()</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.isListField}
     */
    isScalarField(fieldPath) {
        const fieldDefElement = this._lookupXmlDefElement(fieldPath, false);
        return fieldDefElement ? !!fieldDefElement.getAttribute("mediatype") : null;
    }
    /**
     * Removes an item in the list of a list field.
     * @param fieldPath The path of the list field
     * @param position If 0 or positive, the zero-based position from the front of the list for item to be removed.
     *                           If negative, the absolute value is the one-based position from the back of the list for the item to be removed
     *                           (-1 will remove the last item, -2 will remove the item before the last item, etc.).
     * @throws Throws an <code>Error</code> if<ul><li>not <code>{@link PayloadHosting.hasModel}()</code></li>
     *                 <li>the field does not exist, is not a list field or does not have a list</li>
     *                 <li>the list of the list field contains the minimum allowed number of items</li></ul>
     * @throws Throws a <code>RangeError</code> if <code>position</code> is out of range.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.isListField},
     * @see {@link PayloadHosting.addListFieldItem},
     */
    removeListFieldItem(fieldPath, position) {
        const fieldElement = this._lookupXmlElementStrict(fieldPath, false);
        const listEl = getFirstChildElement(fieldElement, vizNs, "list");
        if (!listEl) {
            throw new Error("The field does not have a list.");
        }
        const fieldDefElement = this.hasModel() ? this._lookupXmlDefElementStrict(fieldPath, false) : null;
        const minCount = fieldDefElement ? getListMinCount(getListDefElement(fieldDefElement, fieldPath)) : null;
        const count = position < 0 || minCount ? this.getListFieldLength(fieldPath) || 0 : null;
        // Convert negative index to zero-based index
        if (position < 0) {
            position = (count || 0) + position;
            if (position < 0) {
                throw createRemoveListItemRangeError(count);
            }
        }
        // Find element to be removed
        const iterator = new TypedElementIterator(new SingleElementIterator(listEl), vizNs, "payload");
        let element;
        let elmPosition = 0;
        while ((element = iterator.next()) != null && elmPosition < position) {
            ++elmPosition;
        }
        if (element == null) {
            throw createRemoveListItemRangeError(elmPosition);
        }
        // Check minimum count
        if (minCount && (count || 0) <= (minCount || 0)) {
            throw new Error("Cannot remove list item. The list of '" + fieldPath + "' must contain at least " + minCount + " items.");
        }
        // Remove the XML element corresponding to the list item and notify host about change
        listEl.removeChild(element);
        this.notifyHostAboutPayloadChange();
    }
    /**
     * Sets the field value to a text. Does nothing if the text value of the field does not change.
     * @param fieldPath The path of the field
     * @param text The text to be used as content of the value of the field.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>
     * or not <code>{@link PayloadHosting.fieldExists}(fieldPath)</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.getFieldText}
     */
    setFieldText(fieldPath, text) {
        const fieldElement = this._lookupXmlElementStrict(fieldPath, false);
        if (getTextFromFieldElement(fieldElement) == text) {
            return;
        }
        setFieldValueAsText(fieldElement, text);
        this.notifyHostAboutPayloadChange();
    }
    /**
     * Sets the field value from an XML element. Ensures that the host is notified about the change in the payload.
     * Note that this method will currently send an updated payload to the host even if the field value does not change.
  
     * @param fieldPath The path of the field to be changed
     * @param xml
     *            the XML element to be used as the content of the value of the field or a string to be parsed to an XML element,
     *            or <code>null</code> to remove the value of the field. If an XML element is passed, and the element does not already
     *            belong to the payload document, it will be imported to this document.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>
     * or not <code>{@link PayloadHosting.fieldExists}(fieldPath)</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.getFieldXml}
     */
    setFieldXml(fieldPath, xml) {
        const fieldElement = this._lookupXmlElementStrict(fieldPath, false);
        if (typeof xml === "string") {
            setFieldValueAsParsedXml(fieldElement, xml);
        }
        else if (!xml || xml.ownerDocument === this._payloadDoc) {
            setFieldValueContent(fieldElement, xml);
        }
        else {
            setFieldValueContent(fieldElement, this._payloadDoc ? this._payloadDoc.importNode(xml, true) : null);
        }
        this.notifyHostAboutPayloadChange();
    }
    /**
     * Sets the visibility of a field.
  
     * @param fieldPath The path of the field to change visibility of
     * @param visible <ul>
     *                  <li><code>true</code> to show the field (unless parent field is hidden).</li>
     *                  <li><code>false</code> to hide the field.</li>
     *                  <li><code>null</code> to use default visibility.</li>
     *                </ul>
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>
     * or not <code>{@link PayloadHosting.fieldExists}(fieldPath)</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.setFieldReadOnly}
     */
    setFieldVisibility(fieldPath, visible) {
        const fieldElement = this._lookupXmlElementStrict(fieldPath, false);
        const changed = setFieldAnnotation(fieldElement, "visibility", typeof visible === "boolean" ? (visible ? "visible" : "hidden") : null);
        if (changed) {
            this.notifyHostAboutPayloadChange();
        }
    }
    /**
     * Sets whether a field is read-only.
  
     * @param fieldPath The path of the field to change read-only state of.
     * @param readOnly <ul>
     *                  <li><code>true</code> to make the field read-only.</li>
     *                  <li><code>false</code> to make it possible to edit field content.</li>
     *                  <li><code>null</code> to use default.</li>
     *                </ul>
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>
     * or not <code>{@link PayloadHosting.fieldExists}(fieldPath)</code>.
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     * @see {@link PayloadHosting.setFieldVisibility}
     */
    setFieldReadOnly(fieldPath, readOnly) {
        const fieldElement = this._lookupXmlElementStrict(fieldPath, false);
        const changed = setFieldAnnotation(fieldElement, "contenteditable", typeof readOnly === "boolean" ? (readOnly ? "false" : "true") : null);
        if (changed) {
            this.notifyHostAboutPayloadChange();
        }
    }
    /**
     * Creates an XML element belonging to the XML document used to store the payload.
     * By using this XML element as the second parameter in <code>{@link PayloadHosting.setFieldXml}</code>,
     * setting the field XML becomes slightly more efficient, since the element does not need to
     * be imported to the payload XML document.
  
     * @param namespaceURI The namespace to be used in the new element.
     * @param  name The name of the new element
     * @returns An XML element that may be used as th XML value for fields in the payload of this <code>PayloadHosting</code>.
     * @throws Throws an <code>Error</code> if not <code>{@link PayloadHosting.isPayloadReady}()</code>.
     */
    createElementForFieldXml(namespaceURI, name) {
        if (!this._payloadDoc) {
            throw new Error("PayloadHosting not ready!");
        }
        return this._payloadDoc.createElementNS(namespaceURI, name);
    }
    /**
     * Gets whether the model defining the payload is available.
     * Will never return <code>true</code> unless <code>{@link PayloadHosting.isPayloadReady}()</code>
     * is also <code>true</code>.
     * @returns Whether the the payload is backed up by a model.
     * @see {@link PayloadHosting.isPayloadReady}.
     */
    hasModel() {
        return !!this._modelElement;
    }
    /**
     * Gets whether a payload has been received from the host.
     * @returns Whether the first payload has been received from the host.
     * @see {@link PayloadHosting.hasModel}
     */
    isPayloadReady() {
        return !!this._payloadDoc;
    }
    /**
     * Prevent sending new payload to host more than once if making multiple changes to it.
     * If you intend to make multiple changes to the payload it is smart to create an updater function making those changes
     * call <code>updatePayload</code> with this updater function as the parameter.
     * Doing so ensures that the payload is serialized and sent to the host only once instead of for every change.
     * @param updater
     *                           The callback making changes to the payload. Will be called once during execution of this method,
     *                           and if it makes any changes to the payload during its execution, the host will be notified
     *                           once that the payload has changed afterwards.
     *                           If this function returns true, the payload will be assumed to have been changed by the updater
     *                           even if no field value setter functions (e.g. <code>{@link PayloadHosting.setFieldText}</code>)
     *                           have been called.
     *                           During execution of the callback, <code>this</code> refers to this <code>PayloadHosting</code> object.
     */
    updatePayload(updater) {
        const wasInUpdatePayload = this._isInUpdatePayload;
        this._isInUpdatePayload = true;
        try {
            if (updater.call(this)) {
                this._payloadChangedDuringUpdate = true;
            }
        }
        finally {
            this._isInUpdatePayload = wasInUpdatePayload;
        }
        if (this._payloadChangedDuringUpdate && !this._isInUpdatePayload) {
            this._payloadChangedDuringUpdate = false;
            this.notifyHostAboutPayloadChange();
        }
    }
    /**
     * Request host to let user edit a given field of the payload.
     * @param fieldPath The path of the field to be edited
     * @param editRequestParameters Information about how to edit this field
     * @see {@link PayloadHosting.fieldExists} for further information about field paths.
     */
    editField(fieldPath, editRequestParameters) {
        if (!this._host) {
            throw Error("Host is not defined");
        }
        const data = { type: "edit_field", path: fieldPath, guestid: getGuestIdentifier() };
        if (editRequestParameters) {
            const hints = [];
            if (editRequestParameters.editCurrent) {
                hints.push("edit-current");
            }
            if (editRequestParameters.preferFeedBrowser) {
                hints.push("prefer-feed-browser");
            }
            if (hints.length) {
                data.hints = hints.join(",");
            }
            if (editRequestParameters.searchTerms != null) {
                data.searchTerms = editRequestParameters.searchTerms;
            }
            if (editRequestParameters.searchDate != null) {
                data.searchDate = editRequestParameters.searchDate;
            }
            if (editRequestParameters.searchTag != null) {
                data.searchTag = editRequestParameters.searchTag;
            }
        }
        this._host.postMessage(data, getHostOrigin());
    }
    /**
     * Ensure that the host gets the updated payload.
     * There should be no need to call this function unless you modify the nodes of the payload document
     * without using the helper function of this class.
     * If you for instance use {@link PayloadHosting.getFieldXml} and modify the returned XML element,
     * you must call this function to ensure that the changes reaches the host.
     */
    notifyHostAboutPayloadChange() {
        if (!this._host) {
            throw new Error("Host is not defined");
        }
        if (this._isAboutToNotifyHost) {
            return;
        } // Prevents recursion through field value callbacks.
        if (this._isInUpdatePayload) {
            this._payloadChangedDuringUpdate = true;
            return;
        }
        this._isAboutToNotifyHost = true;
        try {
            if (this._fieldValueCallbacks && !this._isInFinishSetPayload) {
                this._updateFieldValueCallbacks();
            }
            const serializer = new XMLSerializer();
            const newXml = this._payloadDoc ? serializer.serializeToString(this._payloadDoc) : "";
            this._host.postMessage({ type: "payload_changed", xml: newXml, guestid: getGuestIdentifier() }, getHostOrigin());
        }
        finally {
            this._isAboutToNotifyHost = false;
        }
    }
    /**
     * Sets model information to be provided to host using simplified JSON based scheme
     * @param modelInfo Information about the model expected by the
     *     hosted HTML page or <code>null</code> to provide no such information.
     */
    setModelInfo(modelInfo) {
        const modelDoc = modelInfo ? createModelXml(modelInfo) : undefined;
        this._modelInfoXml = modelDoc ? new XMLSerializer().serializeToString(modelDoc) : undefined;
    }
    /**
     * Sets model information to be provided to host using full VDF model XML
     * @param modelXml Information about the model expected by the
     *     hosted HTML page or <code>null</code> to provide no such information.
     */
    setModelInfoXml(modelXml) {
        this._modelInfoXml = modelXml || undefined;
    }
    /**
     * Sets whether the HTML page (guest) wants to keep focus even though none of its inputs has focus.
     * For guests controlling the focus, the host will typically visualize that it is disabled
     * as long as the guest has focus.
     * @param controlled `true` to keep focus in guest even if no inputs have focus, `false` otherwise.
     */
    setControlledFocus(controlled) {
        this._controlledFocus = controlled;
    }
    /**
     * Request the host to take focus back.
     * Typically used when {@link PayloadHosting.setControlledFocus} has been called with `true`.
     */
    yieldFocus() {
        if (!this._host) {
            return;
        }
        this._host.postMessage({
            type: "focus_changed",
            event: "yield_focus",
            guestid: getGuestIdentifier(),
        }, getHostOrigin());
    }
    /**
     * Request the host to jump to a specific preview point name.
     */
    jumpToPreviewPoint(name) {
        if (!this._host) {
            return;
        }
        this._host.postMessage({
            type: "jump_preview_point",
            name,
            guestid: getGuestIdentifier(),
        }, getHostOrigin());
    }
    /**
     * Jumps to a specific field preview point.
     * @param path The path to the field to jump to.
     */
    jumpToFieldPreview(path) {
        if (!this._host) {
            return;
        }
        this._host.postMessage({
            type: "jump_field_preview",
            path,
            guestid: getGuestIdentifier(),
        }, getHostOrigin());
    }
}
const payloadhosting = new PayloadHosting();

;// CONCATENATED MODULE: ./src/payloadhosting.ts
/* eslint-disable @typescript-eslint/no-explicit-any */

// This only exists to be compatible with projects previously using 1.0.0. Allows accessing payloadhosting using the vizrt "namespace"
if (window.vizrt) {
    window.vizrt.payloadhosting = payloadhosting;
    window.vizrt.PayloadHosting = PayloadHosting;
}
else {
    window.vizrt = { payloadhosting: payloadhosting, PayloadHosting: PayloadHosting };
}

/******/ })()
;