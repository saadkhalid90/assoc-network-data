// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function (modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      var res = localRequire.resolve(x);
      return res === false ? {} : newRequire(res);
    }

    function resolve(x) {
      var id = modules[name][1][x];
      return id != null ? id : x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [
      function (require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function () {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function () {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"km5uZ":[function(require,module,exports) {
var global = arguments[3];
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d6ea1d42532a7575";
var HMR_USE_SSE = false;
module.bundle.HMR_BUNDLE_ID = "0a8ecb283d214d75";
"use strict";
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE, HMR_USE_SSE, chrome, browser, __parcel__import__, __parcel__importScripts__, ServiceWorkerGlobalScope */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: {|[string]: mixed|};
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
interface ExtensionContext {
  runtime: {|
    reload(): void,
    getURL(url: string): string;
    getManifest(): {manifest_version: number, ...};
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
declare var HMR_USE_SSE: boolean;
declare var chrome: ExtensionContext;
declare var browser: ExtensionContext;
declare var __parcel__import__: (string) => Promise<void>;
declare var __parcel__importScripts__: (string) => Promise<void>;
declare var globalThis: typeof self;
declare var ServiceWorkerGlobalScope: Object;
*/ var OVERLAY_ID = "__parcel__error__overlay__";
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData[moduleName],
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {});
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData[moduleName] = undefined;
}
module.bundle.Module = Module;
module.bundle.hotData = {};
var checkedAssets /*: {|[string]: boolean|} */ , assetsToDispose /*: Array<[ParcelRequire, string]> */ , assetsToAccept /*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf("http") === 0 ? location.hostname : "localhost");
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== "undefined") {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == "https:" && ![
        "localhost",
        "127.0.0.1",
        "0.0.0.0"
    ].includes(hostname) ? "wss" : "ws";
    var ws;
    if (HMR_USE_SSE) ws = new EventSource("/__parcel_hmr");
    else try {
        ws = new WebSocket(protocol + "://" + hostname + (port ? ":" + port : "") + "/");
    } catch (err) {
        if (err.message) console.error(err.message);
        ws = {};
    }
    // Web extension context
    var extCtx = typeof browser === "undefined" ? typeof chrome === "undefined" ? null : chrome : browser;
    // Safari doesn't support sourceURL in error stacks.
    // eval may also be disabled via CSP, so do a quick check.
    var supportsSourceURL = false;
    try {
        (0, eval)('throw new Error("test"); //# sourceURL=test.js');
    } catch (err) {
        supportsSourceURL = err.stack.includes("test.js");
    }
    // $FlowFixMe
    ws.onmessage = async function(event /*: {data: string, ...} */ ) {
        checkedAssets = {} /*: {|[string]: boolean|} */ ;
        assetsToAccept = [];
        assetsToDispose = [];
        var data /*: HMRMessage */  = JSON.parse(event.data);
        if (data.type === "update") {
            // Remove error overlay if there is one
            if (typeof document !== "undefined") removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH);
            // Handle HMR Update
            let handled = assets.every((asset)=>{
                return asset.type === "css" || asset.type === "js" && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
            });
            if (handled) {
                console.clear();
                // Dispatch custom event so other runtimes (e.g React Refresh) are aware.
                if (typeof window !== "undefined" && typeof CustomEvent !== "undefined") window.dispatchEvent(new CustomEvent("parcelhmraccept"));
                await hmrApplyUpdates(assets);
                // Dispose all old assets.
                let processedAssets = {} /*: {|[string]: boolean|} */ ;
                for(let i = 0; i < assetsToDispose.length; i++){
                    let id = assetsToDispose[i][1];
                    if (!processedAssets[id]) {
                        hmrDispose(assetsToDispose[i][0], id);
                        processedAssets[id] = true;
                    }
                }
                // Run accept callbacks. This will also re-execute other disposed assets in topological order.
                processedAssets = {};
                for(let i = 0; i < assetsToAccept.length; i++){
                    let id = assetsToAccept[i][1];
                    if (!processedAssets[id]) {
                        hmrAccept(assetsToAccept[i][0], id);
                        processedAssets[id] = true;
                    }
                }
            } else fullReload();
        }
        if (data.type === "error") {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error("\uD83D\uDEA8 [parcel]: " + ansiDiagnostic.message + "\n" + stack + "\n\n" + ansiDiagnostic.hints.join("\n"));
            }
            if (typeof document !== "undefined") {
                // Render the fancy html overlay
                removeErrorOverlay();
                var overlay = createErrorOverlay(data.diagnostics.html);
                // $FlowFixMe
                document.body.appendChild(overlay);
            }
        }
    };
    if (ws instanceof WebSocket) {
        ws.onerror = function(e) {
            if (e.message) console.error(e.message);
        };
        ws.onclose = function() {
            console.warn("[parcel] \uD83D\uDEA8 Connection to the HMR server was lost");
        };
    }
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log("[parcel] \u2728 Error resolved");
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.frames.length ? diagnostic.frames.reduce((p, frame)=>{
            return `${p}
<a href="/__parcel_launch_editor?file=${encodeURIComponent(frame.location)}" style="text-decoration: underline; color: #888" onclick="fetch(this.href); return false">${frame.location}</a>
${frame.code}`;
        }, "") : diagnostic.stack;
        errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          \u{1F6A8} ${diagnostic.message}
        </div>
        <pre>${stack}</pre>
        <div>
          ${diagnostic.hints.map((hint)=>"<div>\uD83D\uDCA1 " + hint + "</div>").join("")}
        </div>
        ${diagnostic.documentation ? `<div>\u{1F4DD} <a style="color: violet" href="${diagnostic.documentation}" target="_blank">Learn more</a></div>` : ""}
      </div>
    `;
    }
    errorHTML += "</div>";
    overlay.innerHTML = errorHTML;
    return overlay;
}
function fullReload() {
    if ("reload" in location) location.reload();
    else if (extCtx && extCtx.runtime && extCtx.runtime.reload) extCtx.runtime.reload();
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var href = link.getAttribute("href");
    if (!href) return;
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute("href", // $FlowFixMe
    href.split("?")[0] + "?" + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href /*: string */  = links[i].getAttribute("href");
            var hostname = getHostname();
            var servedFromHMRServer = hostname === "localhost" ? new RegExp("^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):" + getPort()).test(href) : href.indexOf(hostname + ":" + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrDownload(asset) {
    if (asset.type === "js") {
        if (typeof document !== "undefined") {
            let script = document.createElement("script");
            script.src = asset.url + "?t=" + Date.now();
            if (asset.outputFormat === "esmodule") script.type = "module";
            return new Promise((resolve, reject)=>{
                var _document$head;
                script.onload = ()=>resolve(script);
                script.onerror = reject;
                (_document$head = document.head) === null || _document$head === void 0 || _document$head.appendChild(script);
            });
        } else if (typeof importScripts === "function") {
            // Worker scripts
            if (asset.outputFormat === "esmodule") return import(asset.url + "?t=" + Date.now());
            else return new Promise((resolve, reject)=>{
                try {
                    importScripts(asset.url + "?t=" + Date.now());
                    resolve();
                } catch (err) {
                    reject(err);
                }
            });
        }
    }
}
async function hmrApplyUpdates(assets) {
    global.parcelHotUpdate = Object.create(null);
    let scriptsToRemove;
    try {
        // If sourceURL comments aren't supported in eval, we need to load
        // the update from the dev server over HTTP so that stack traces
        // are correct in errors/logs. This is much slower than eval, so
        // we only do it if needed (currently just Safari).
        // https://bugs.webkit.org/show_bug.cgi?id=137297
        // This path is also taken if a CSP disallows eval.
        if (!supportsSourceURL) {
            let promises = assets.map((asset)=>{
                var _hmrDownload;
                return (_hmrDownload = hmrDownload(asset)) === null || _hmrDownload === void 0 ? void 0 : _hmrDownload.catch((err)=>{
                    // Web extension fix
                    if (extCtx && extCtx.runtime && extCtx.runtime.getManifest().manifest_version == 3 && typeof ServiceWorkerGlobalScope != "undefined" && global instanceof ServiceWorkerGlobalScope) {
                        extCtx.runtime.reload();
                        return;
                    }
                    throw err;
                });
            });
            scriptsToRemove = await Promise.all(promises);
        }
        assets.forEach(function(asset) {
            hmrApply(module.bundle.root, asset);
        });
    } finally{
        delete global.parcelHotUpdate;
        if (scriptsToRemove) scriptsToRemove.forEach((script)=>{
            if (script) {
                var _document$head2;
                (_document$head2 = document.head) === null || _document$head2 === void 0 || _document$head2.removeChild(script);
            }
        });
    }
}
function hmrApply(bundle /*: ParcelRequire */ , asset /*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === "css") reloadCSS();
    else if (asset.type === "js") {
        let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
        if (deps) {
            if (modules[asset.id]) {
                // Remove dependencies that are removed and will become orphaned.
                // This is necessary so that if the asset is added back again, the cache is gone, and we prevent a full page reload.
                let oldDeps = modules[asset.id][1];
                for(let dep in oldDeps)if (!deps[dep] || deps[dep] !== oldDeps[dep]) {
                    let id = oldDeps[dep];
                    let parents = getParents(module.bundle.root, id);
                    if (parents.length === 1) hmrDelete(module.bundle.root, id);
                }
            }
            if (supportsSourceURL) // Global eval. We would use `new Function` here but browser
            // support for source maps is better with eval.
            (0, eval)(asset.output);
            // $FlowFixMe
            let fn = global.parcelHotUpdate[asset.id];
            modules[asset.id] = [
                fn,
                deps
            ];
        } else if (bundle.parent) hmrApply(bundle.parent, asset);
    }
}
function hmrDelete(bundle, id) {
    let modules = bundle.modules;
    if (!modules) return;
    if (modules[id]) {
        // Collect dependencies that will become orphaned when this module is deleted.
        let deps = modules[id][1];
        let orphans = [];
        for(let dep in deps){
            let parents = getParents(module.bundle.root, deps[dep]);
            if (parents.length === 1) orphans.push(deps[dep]);
        }
        // Delete the module. This must be done before deleting dependencies in case of circular dependencies.
        delete modules[id];
        delete bundle.cache[id];
        // Now delete the orphans.
        orphans.forEach((id)=>{
            hmrDelete(module.bundle.root, id);
        });
    } else if (bundle.parent) hmrDelete(bundle.parent, id);
}
function hmrAcceptCheck(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    if (hmrAcceptCheckOne(bundle, id, depsByBundle)) return true;
    // Traverse parents breadth first. All possible ancestries must accept the HMR update, or we'll reload.
    let parents = getParents(module.bundle.root, id);
    let accepted = false;
    while(parents.length > 0){
        let v = parents.shift();
        let a = hmrAcceptCheckOne(v[0], v[1], null);
        if (a) // If this parent accepts, stop traversing upward, but still consider siblings.
        accepted = true;
        else {
            // Otherwise, queue the parents in the next level upward.
            let p = getParents(module.bundle.root, v[1]);
            if (p.length === 0) {
                // If there are no parents, then we've reached an entry without accepting. Reload.
                accepted = false;
                break;
            }
            parents.push(...p);
        }
    }
    return accepted;
}
function hmrAcceptCheckOne(bundle /*: ParcelRequire */ , id /*: string */ , depsByBundle /*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return true;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToDispose.push([
        bundle,
        id
    ]);
    if (!cached || cached.hot && cached.hot._acceptCallbacks.length) {
        assetsToAccept.push([
            bundle,
            id
        ]);
        return true;
    }
}
function hmrDispose(bundle /*: ParcelRequire */ , id /*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData[id] = {};
    if (cached && cached.hot) cached.hot.data = bundle.hotData[id];
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData[id]);
    });
    delete bundle.cache[id];
}
function hmrAccept(bundle /*: ParcelRequire */ , id /*: string */ ) {
    // Execute the module.
    bundle(id);
    // Run the accept callbacks in the new version of the module.
    var cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) {
            assetsToAlsoAccept.forEach(function(a) {
                hmrDispose(a[0], a[1]);
            });
            // $FlowFixMe[method-unbinding]
            assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
        }
    });
}

},{}],"bB7Pu":[function(require,module,exports) {
// @ts-check
var _loadData = require("./loadData");
var _queue = require("./Queue");
/**
 * Structure of each link Tuple
 * @typedef {[string, string]} neighborTuple The first string is NeighborId and the second is concatenated roles
 */ class AssociateNetwork {
    /**
   * defining parameters for the network constructor
   * @param {string} rootID The root to start the network from (id of the associate/ entity)
   * @param {boolean} assoc flag indicating whether the root is an associate (true) or an entity (false)
   * @param {Object<string, Array<neighborTuple>>} linksMap A reference to the Object containing all the data currently loaded into the application
   */ constructor(rootID, assoc, linksMap){
        /** @type {Set<string>} */ const associates = new Set();
        /** @type {Set<string>} */ const expAssociates = new Set();
        /** @type {Set<string>} */ const checkedAssocs = new Set();
        /** @type {Set<string>} */ const entities = new Set();
        /** @type {Set<string>} */ const expandableEntities = new Set();
        /** @type {Object<string, number>} */ const expEntConnCnt = {};
        /** @type {Object<string, string>} */ const links = {};
        this.associates = associates;
        this.expAssociates = expAssociates;
        this.checkedAssocs = checkedAssocs;
        this.entities = entities;
        this.expandableEntities = expandableEntities;
        this.expEntConnCnt = expEntConnCnt;
        this.links = links;
        this.assoc = assoc;
        this.rootID = rootID;
        this.linksMap = linksMap;
    }
    getInitialNetwork() {
        const { associates, entities, expandableEntities, expEntConnCnt, links, rootID, linksMap, assoc: assocFlag } = this;
        /**
     *
     * @param {string} nodeId
     * @param {number} depth
     * @param {Object<string, Array<neighborTuple>>} linksMap
     * @param {'assoc' | 'entity'} type
     */ function BFTrav(nodeId, depth, linksMap, type) {
            const queue = new (0, _queue.Queue)();
            queue.enqueue(new (0, _queue.ListEntry)({
                nodeId,
                depth: 1,
                type
            }));
            while(queue.size > 0){
                const currNode = queue.dequeue();
                if (!currNode) throw new Error("dequeueing node returned undefined in BFLoad");
                const { nodeId: currId, depth: currDepth, type: currType, linkId: currentLinkId, assocRole: currAssocRole } = currNode.value;
                if (currDepth > depth) break;
                const nodeExists = currType === "assoc" ? associates.has(currId) : entities.has(currId) || expandableEntities.has(currId);
                if (!nodeExists) {
                    if (currType === "assoc") associates.add(currId);
                    else currDepth !== depth ? entities.add(currId) : expandableEntities.add(currId);
                    const linkExists = currentLinkId ? links[currentLinkId] : false;
                    if (!linkExists && currentLinkId && currAssocRole) {
                        links[currentLinkId] = currAssocRole;
                        // process only happens for stuff in expandableEntities
                        // we continue to count their connections (compare them with global data)
                        if (expandableEntities.has(currId)) {
                            if (!expEntConnCnt[currId]) expEntConnCnt[currId] = 1;
                            else expEntConnCnt[currId]++;
                            if (expEntConnCnt[currId] === linksMap[currId].length) {
                                expandableEntities.delete(currId);
                                entities.add(currId);
                            }
                        }
                    }
                    const neighbors = linksMap[currId];
                    neighbors.forEach((neighbor)=>{
                        const [connId, role] = neighbor;
                        queue.enqueue(new (0, _queue.ListEntry)({
                            nodeId: connId,
                            depth: currDepth + 1,
                            type: currType === "assoc" ? "entity" : "assoc",
                            linkId: currType === "assoc" ? `${currId}-${connId}` : `${connId}-${currId}`,
                            assocRole: role
                        }));
                    });
                }
            }
        }
        BFTrav(rootID, 4, linksMap, assocFlag ? "assoc" : "entity");
        // Initialize the checked entities
        let checkedAssocs = assocFlag ? this.getSortedAssocList().slice(0, 4) : this.getSortedAssocList().slice(0, 5);
        const checkedAssocIds = checkedAssocs.map((d)=>Object.keys(d)[0]);
        // initializing checked Associates
        this.checkedAssocs = assocFlag ? new Set([
            rootID,
            ...checkedAssocIds
        ]) : new Set(checkedAssocIds);
        return this;
    }
    /**
   *
   * @param {string} assocId
   * @return {Set<string>}
   */ getUnexpAssocs(assocId) {
        const { linksMap } = this;
        const linkedEntites = linksMap[assocId].map((d)=>d[0]);
        const unexpAssocs = new Set();
        linkedEntites.forEach((entityId)=>{
            if (this.expandableEntities.has(entityId)) {
                const linkedAssocs = linksMap[entityId].map((d)=>d[0]);
                linkedAssocs.forEach(/**
           * @param {string} assoc
           * */ (assoc)=>{
                    if (!this.hasAssoc(assoc)) unexpAssocs.add(assoc);
                });
            }
        });
        return unexpAssocs;
    }
    /**
   *
   * @param {string} assocId
   * @returns {boolean}
   */ hasAssoc(assocId) {
        return this.associates.has(assocId) || this.expAssociates.has(assocId);
    }
    /**
   * @param {string} assocId
   * @return {Promise<AssociateNetwork>}
   */ async expandAssoc(assocId) {
        await (0, _loadData.BFLoad)(assocId, 4, "assoc");
        const unexpAssocs = Array.from(this.getUnexpAssocs(assocId));
        const { linksMap } = this;
        unexpAssocs.forEach((assoc)=>{
            const linkedEntites = linksMap[assoc];
            this.expAssociates.add(assoc);
            linkedEntites.forEach(([entity, role])=>{
                if (this.expandableEntities.has(entity)) {
                    this.expEntConnCnt[entity]++;
                    if (linksMap[entity].length === this.expEntConnCnt[entity]) {
                        this.entities.add(entity);
                        this.expandableEntities.delete(entity);
                    }
                } else if (!this.expandableEntities.has(entity) && !this.entities.has(entity)) {
                    this.expandableEntities.add(entity);
                    this.expEntConnCnt[entity] = 1;
                }
                this.links[`${assoc}-${entity}`] = role;
            });
        });
        return this;
    }
    /**
   *
   * @param {string} assocId
   */ checkAssoc(assocId) {
        if (this.hasAssoc(assocId)) this.checkedAssocs.add(assocId);
        else throw new Error(`The specified associate id ${assocId} does not exist in the network and cannot be expanded`);
    }
    /**
   *
   * @param {string} assocId
   */ uncheckAssoc(assocId) {
        if (this.checkedAssocs.has(assocId)) this.checkedAssocs.delete(assocId);
        else throw new Error(`The specified associate id ${assocId} does is not currently checked and hence cannot be unchecked`);
    }
    /** @returns {Array<Object>}  */ getSortedAssocList() {
        const only1stDegAssocs = new Set(this.associates);
        only1stDegAssocs.delete(this.rootID);
        return [
            ...only1stDegAssocs
        ].map((assocId)=>({
                [assocId]: this.linksMap[assocId].length
            })).sort((assoc1, assoc2)=>Object.values(assoc2)[0] - Object.values(assoc1)[0]);
    }
    /** @returns {Array<Object>[1]|undefined}  */ getRootAssocList() {
        if (this.assoc) return [
            this.rootID
        ].map((assocId)=>({
                [assocId]: this.linksMap[assocId].length
            }));
    }
    /** @returns {Array<Object>}  */ getSortedExpAssocList() {
        return [
            ...this.expAssociates
        ].map((assocId)=>({
                [assocId]: this.linksMap[assocId].length
            })).sort((assoc1, assoc2)=>Object.values(assoc2)[0] - Object.values(assoc1)[0]);
    }
    getGroupedNetwork() {
        const entityGrps = {};
        // only filter links that are relevant to checked associates
        const links = Object.entries(this.links).filter(([link, role])=>{
            const [assocId, entId] = link.split("-");
            return this.checkedAssocs.has(assocId);
        });
        links.forEach(([link, role])=>{
            const [assocId, entId] = link.split("-");
            if (!entityGrps[entId]) entityGrps[entId] = [];
            entityGrps[entId].push(assocId);
        });
        for (const [entityId, groupIds] of Object.entries(entityGrps))entityGrps[entityId] = groupIds.sort().join(",");
        const linksArray = links.map(([link, role])=>{
            const [assocId, entId] = link.split("-");
            return {
                assoc: assocId,
                entity: entId,
                entityGrp: entityGrps[entId],
                role: role
            };
        });
        const linksGrp = {};
        // nesting links
        linksArray.forEach((link)=>{
            const { entityGrp, assoc } = link;
            const linkId = `${assoc}|${entityGrp}`;
            if (!linksGrp[linkId]) linksGrp[linkId] = {
                assoc,
                entityGrp,
                sublinks: []
            };
            linksGrp[linkId].sublinks.push(link);
        });
        const linksGrpArr = Object.values(linksGrp);
        const listEntities = (linkGrp)=>{
            const entitiesArr = linkGrp.sublinks.map((d)=>d.entity);
            return entitiesArr.join(",");
        };
        return linksGrpArr.map((d)=>({
                ...d,
                entitiesList: listEntities(d)
            }));
    }
}
async function runStuff() {
    await (0, _loadData.BFLoad)("Alex", 6, "assoc");
    const { loadedData: networkData } = (0, _loadData.getGlobalWindow)();
    console.log(networkData);
    /** @type {AssociateNetwork} */ const network = new AssociateNetwork("Alex", true, networkData);
    network.associates;
    network.getInitialNetwork();
    console.log(network);
    console.log(network.getUnexpAssocs("Meherbano"));
    await network.expandAssoc("Meherbano");
    console.log(network.getUnexpAssocs("John"));
    await network.expandAssoc("John");
    console.log(network);
    // network.checkAssoc("Mahmood");
    // network.checkAssoc("Faheem");
    // network.uncheckAssoc("Faheem");
    console.log(network.getSortedAssocList());
    console.log(network.getSortedExpAssocList());
    console.log(network.getRootAssocList());
    console.log(network.getGroupedNetwork());
}
runStuff();

},{"./loadData":"7aygW","./Queue":"2V09F"}],"7aygW":[function(require,module,exports) {
// @ts-check
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "getGlobalWindow", ()=>getGlobalWindow);
parcelHelpers.export(exports, "BFLoad", ()=>BFLoad);
var _queue = require("./Queue");
/**
 * @param {string} id
 * @returns {string}
 */ const getPartition = (id)=>id.slice(id.length - 3, id.length);
/**
 * @typedef {[string, string]} neighborTuple
 */ /**
 * // define all the global variables to be attached to the window object
 * @typedef {Object} ExtendedWindowObject
 * @property {Object<string, Object>} [partitions]
 * @property {Object<string, Array<neighborTuple>} [loadedData]
 * @typedef {Window & ExtendedWindowObject} ExtendedWindow
 */ /**
 * @returns {ExtendedWindow}
 */ const getGlobalWindow = ()=>{
    /** @type {ExtendedWindow} */ const extWindow = window; // same memory reference as window
    return extWindow;
};
// in the actual application we will need something like this
// because of trailing alphabets and possibly to separate same id entities and associates
/**
 * @param {string} id
 * @returns {{
 *    partition: string,
 *    idType: string,
 *    justTheId: string,
 *    assocEntityFlag: string
 * }}
 */ const getIdMeta = (id)=>{
    const idTypes = [
        "C",
        "N",
        "E",
        "I",
        "S"
    ];
    const assocEntitySep = [
        "+",
        "-"
    ];
    const trailRegExp = RegExp(`[${idTypes.join("")}][${assocEntitySep.join("")}]?$`, "g");
    const idMetaStrArr = id.match(trailRegExp);
    const idMetaStr = idMetaStrArr ? idMetaStrArr[0] : undefined;
    if (!idMetaStr) throw new Error(`The ${id} does not have a valid trailing substring`);
    const justTheId = id.replace(idMetaStr, "");
    if (!(justTheId.length >= 3)) throw new Error(`The ${id} does not have a valid numeric structure`);
    return {
        partition: justTheId.slice(justTheId.length - 3, justTheId.length),
        idType: idMetaStr[0],
        justTheId,
        assocEntityFlag: idMetaStr[1]
    };
};
/**
 *
 * @param {string} srcLink
 * @param {() => void} onLoad
 * @param {(err: ErrorEvent) => void} onError
 */ const loadScript = (srcLink, onLoad, onError)=>{
    const scriptElem = document.createElement("script");
    scriptElem.setAttribute("src", srcLink);
    scriptElem.setAttribute("class", "dyn-loaded-script");
    document.head.appendChild(scriptElem);
    // handling onLoad and onError
    scriptElem.addEventListener("load", ()=>{
        onLoad();
        scriptElem.remove(); // also remove stuff after you have gotten the data
    });
    scriptElem.addEventListener("error", onError);
};
/**
 *
 * @param {string} id
 * @returns
 */ async function loadData(id) {
    const { partitions, loadedData } = getGlobalWindow();
    if (!partitions || !loadedData) throw new Error("Data cannot be loaded without initializing a partitions and a loadedData global variable to an empty object. Make sure to invoke the preparePartitions functions before attempting to load Data");
    return new Promise((res, rej)=>{
        const partition = getPartition(id);
        // console.log(id);
        // console.log(partition);
        const srcLink = `partitions/${partition}.js`;
        if (!partitions[partition] && !loadedData[id]) loadScript(srcLink, ()=>{
            res(true);
            loadedData[id] = partitions[partition][id];
        // console.log(
        //   `The script ${partition}.js has been loaded successfully`
        // );
        //console.log(`Data for id ${id} has been loaded successfully`);
        }, (err)=>{
            rej();
            console.error(`This script ${partition}.js failed to load. ${err}`);
        });
        else {
            res(true);
            // console.log(
            //   `The partition ${partition} is already loaded, so ${id}'s data should be in!`
            // );
            loadedData[id] = partitions[partition][id];
        }
    });
}
const clearPartitons = ()=>{
    getGlobalWindow().partitions = {}; // mutation
};
const prepPartitons = ()=>{
    clearPartitons();
    getGlobalWindow().loadedData = {}; // mutation
};
prepPartitons();
/**
 *
 * @param {string} nodeId
 * @param {number} maxDepth
 * @param {'assoc'|'entity'} role
 */ async function BFLoad(nodeId, maxDepth, role) {
    const { loadedData } = getGlobalWindow();
    const visited = new Set();
    let queue = new (0, _queue.Queue)();
    queue.enqueue(new (0, _queue.ListEntry)({
        nodeId,
        depth: 1,
        role
    }));
    if (!loadedData) throw new Error("Make sure that loadedData property is instantiated in the global window object");
    while(queue.size > 0){
        const currNode = queue.dequeue();
        if (!currNode) throw new Error("dequeueing node returned undefined in BFLoad");
        const { nodeId: currId, depth: currDepth, role: currRole } = currNode.value;
        if (currDepth > maxDepth) break;
        if (!visited.has(currId)) {
            await loadData(currId);
            const neighbors = loadedData[currId].map((d)=>d[0]);
            neighbors.forEach((neighbor)=>queue.enqueue(new (0, _queue.ListEntry)({
                    nodeId: neighbor,
                    depth: currDepth + 1,
                    role: currRole === "assoc" ? "entity" : "assoc"
                })));
            visited.add(currId);
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3","./Queue":"2V09F"}],"gkKU3":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, "__esModule", {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === "default" || key === "__esModule" || Object.prototype.hasOwnProperty.call(dest, key)) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"2V09F":[function(require,module,exports) {
// @ts-check
// an entry of a dingly linked list. stores a pointer to the next object
/**
 * @typedef {{nodeId: string, depth: number, type: 'assoc'|'entity', linkId?: string, assocRole?: string}} NodeValue
 *
 * @typedef {Object} LinkedListNode
 * @property {NodeValue} value
 * @property {LinkedListNode|null} next
 */ var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Queue", ()=>Queue);
parcelHelpers.export(exports, "ListEntry", ()=>ListEntry);
class ListEntry {
    /**
   *
   * @param {NodeValue} value
   */ constructor(value){
        this.value = value;
        /**@type {LinkedListNode|null} */ this.next = null;
    }
}
class Queue {
    constructor(){
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    /**
   *
   * @param {LinkedListNode} entry
   * @returns {number}
   */ enqueue(entry) {
        // enqueue an array?
        if (!this.tail) {
            this.head = entry;
            this.tail = entry;
        } else {
            this.tail.next = entry;
            this.tail = entry;
        }
        return ++this.size; // returns the size of the queue
    }
    /**
   *
   * @returns {LinkedListNode|undefined}
   */ dequeue() {
        if (this.head === null) return undefined;
        else {
            const oldHead = this.head;
            this.head = this.head.next;
            this.size--;
            if (this.size === 0) {
                this.head = null;
                this.tail = null;
            }
            return oldHead;
        }
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["km5uZ","bB7Pu"], "bB7Pu", "parcelRequired854")

//# sourceMappingURL=index.3d214d75.js.map
