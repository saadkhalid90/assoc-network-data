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
var _dummyNetworkJs = require("./dummyNetwork.js");
var _loadDataJs = require("./loadData.js");
/**
 * state/ data
 * @typedef {Object} assocNetworkObj
 * @property {Set<string>} associates
 * @property {Set<string>} expAssociates
 * @property {Set<string>} checkedAssocs
 * @property {Set<string>} entities
 * @property {Set<string>} leafEntities
 * @property {Object} leafEntitiesConn
 * @property {Object} links
 * @property {boolean} assoc
 * @property {string} rootID
 * @property {Object} linksMap
 * methods
 * @property {function} getInitialNetwork
 * @property {function} getUnexpAssocs
 * @property {function} expandAssoc
 * @property {function} checkAssoc
 * @property {function} uncheckAssoc
 * @property {function} getGroupedNetwork
 * @property {function} getRootAssocList
 * @property {function} getSortedAssocList
 * @property {function} getSortedExpAssocList
 */ const prepPartitons = ()=>{
    Window.partitions = {};
    Window.loadedData = {};
};
prepPartitons();
Promise.all([
    (0, _loadDataJs.loadData)("Saad"),
    (0, _loadDataJs.loadData)("Hasan"),
    (0, _loadDataJs.loadData)("Junaid"),
    (0, _loadDataJs.loadData)("Entity1"),
    (0, _loadDataJs.loadData)("Entity2")
]).then(()=>console.log("All Promises in Promises.all resolved"));
class AssociateNetwork {
    /**
   * defining parameters for the network constructor
   * @param {string} rootID The root to start the network from (id of the associate/ entity)
   * @param {boolean} assoc flag indicating whether the
   * @param {Object} linksMap
   */ constructor(rootID, assoc, linksMap){
        const associates = assoc ? new Set([
            rootID
        ]) : new Set();
        const expAssociates = new Set();
        const checkedAssocs = new Set();
        const entities = assoc ? new Set() : new Set([
            rootID
        ]);
        const leafEntities = new Set();
        const leafEntitiesConn = {};
        const links = {};
        this.associates = associates;
        this.expAssociates = expAssociates;
        this.checkedAssocs = checkedAssocs;
        this.entities = entities;
        this.leafEntities = leafEntities;
        this.leafEntitiesConn = leafEntitiesConn;
        this.links = links;
        this.assoc = assoc;
        this.rootID = rootID;
        this.linksMap = linksMap;
    }
    getInitialNetwork() {
        const { associates, entities, leafEntities, leafEntitiesConn, links, rootID, linksMap, assoc: assocFlag } = this;
        let { assoc } = this;
        /** @type {3|2} nDegree */ let nDegree = assoc ? 3 : 2;
        /**
     * @param {string} rootID
     * @param {number} nDegree
     * @param {Object} linksMap
     * @param {number} currentDegree
     * @param {boolean} assoc
     */ function depthFirstTrav(rootID, nDegree, linksMap, currentDegree = 1, assoc) {
            const currentConn = linksMap[rootID] ? linksMap[rootID] : [];
            currentConn.forEach((connec)=>{
                const [conn, role] = connec;
                const nodeExists = assoc ? entities.has(conn) || leafEntities.has(conn) : associates.has(conn);
                if (!nodeExists) {
                    if (assoc) nDegree !== currentDegree ? entities.add(conn) : leafEntities.add(conn);
                    else associates.add(conn);
                }
                const linkId = assoc ? `${rootID}-${conn}` : `${conn}-${rootID}`;
                const linkExists = links[linkId];
                if (!linkExists) {
                    links[linkId] = role;
                    if (nDegree === currentDegree) {
                        if (!leafEntitiesConn[conn]) leafEntitiesConn[conn] = 1;
                        else leafEntitiesConn[conn]++;
                    }
                }
            });
            assoc = !assoc; // boolean - whether our layer is associates (or entities)
            currentDegree++;
            if (currentDegree <= nDegree) currentConn.forEach(([nodeId, role])=>depthFirstTrav(nodeId, nDegree, linksMap, currentDegree, assoc));
        }
        depthFirstTrav(rootID, nDegree, linksMap, 1, assoc);
        let checkedAssocs = assocFlag ? this.getSortedAssocList().slice(0, 4) : this.getSortedAssocList().slice(0, 5);
        const checkedAssocIds = checkedAssocs.map((d)=>Object.keys(d)[0]);
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
            if (this.leafEntities.has(entityId)) {
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
   * @return {assocNetworkObj}
   */ expandAssoc(assocId) {
        const unexpAssocs = Array.from(this.getUnexpAssocs(assocId));
        const { linksMap } = this;
        unexpAssocs.forEach((assoc)=>{
            const linkedEntites = linksMap[assoc];
            this.expAssociates.add(assoc);
            linkedEntites.forEach(([entity, role])=>{
                if (this.leafEntities.has(entity)) {
                    this.leafEntitiesConn[entity]++;
                    if (linksMap[entity].length === this.leafEntitiesConn[entity]) {
                        this.entities.add(entity);
                        this.leafEntities.delete(entity);
                    }
                } else if (!this.leafEntities.has(entity) && !this.entities.has(entity)) {
                    this.leafEntities.add(entity);
                    this.leafEntitiesConn[entity] = 1;
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
/**
 * @type {assocNetworkObj} network
 */ const network = new AssociateNetwork("Alex", true, (0, _dummyNetworkJs.dummyAssocNetwork));
network.getInitialNetwork();
console.log(network);
console.log(network.getUnexpAssocs("Meherbano"));
network.expandAssoc("Meherbano");
network.expandAssoc("John");
console.log(network);
// network.checkAssoc("Mahmood");
network.checkAssoc("Faheem");
// network.uncheckAssoc("Faheem");
console.log(network.getSortedAssocList());
console.log(network.getSortedExpAssocList());
console.log(network.getRootAssocList());
console.log(network.getGroupedNetwork());

},{"./dummyNetwork.js":"1Daac","./loadData.js":"7aygW"}],"1Daac":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "dummyAssocNetwork", ()=>dummyAssocNetwork);
parcelHelpers.export(exports, "partitions", ()=>partitions);
const dummyAssocNetwork2 = {
    Alex: [
        "Entity1",
        "Entity2"
    ],
    Entity1: [
        "Alex",
        "Richard",
        "John",
        "Sylvian",
        "Mahmood"
    ],
    Entity2: [
        "Alex",
        "Saleem",
        "Meherbano",
        "John"
    ],
    Richard: [
        "Entity1",
        "Entity3",
        "Entity4"
    ],
    John: [
        "Entity1",
        "Entity5",
        "Entity6",
        "Entity7",
        "Entity2"
    ],
    Sylvian: [
        "Entity1",
        "Entity8"
    ],
    Mahmood: [
        "Entity1"
    ],
    Entity3: [
        "Richard"
    ],
    Entity4: [
        "Richard"
    ],
    Entity5: [
        "John"
    ],
    Entity6: [
        "John",
        "Junaid"
    ],
    Entity7: [
        "John",
        "Omar",
        "Saad",
        "Hasan",
        "Faheem"
    ],
    Junaid: [
        "Entity6",
        "Entity8"
    ],
    Omar: [
        "Entity7"
    ],
    Saad: [
        "Entity7"
    ],
    Hasan: [
        "Entity7"
    ],
    Entity8: [
        "Sylvian",
        "Junaid",
        "Danial",
        "Nadeem"
    ],
    Danial: [
        "Entity8"
    ],
    Nadeem: [
        "Entity8"
    ],
    Saleem: [
        "Entity2",
        "Entity9",
        "Entity10",
        "Entity11"
    ],
    Meherbano: [
        "Entity2",
        "Entity12"
    ],
    Entity9: [
        "Saleem"
    ],
    Entity10: [
        "Saleem",
        "Faheem"
    ],
    Entity11: [
        "Saleem"
    ],
    Faheem: [
        "Entity10",
        "Entity7"
    ],
    Entity12: [
        "Meherbano",
        "Shah"
    ],
    Shah: [
        "Entity12",
        "Entity13"
    ],
    Entity13: [
        "Shah"
    ]
};
const dummyAssocNetwork = {
    Alex: [
        [
            "Entity1",
            "1;2;3"
        ],
        [
            "Entity2",
            "1;2"
        ]
    ],
    Entity1: [
        [
            "Alex",
            "1"
        ],
        [
            "Richard",
            "2;3"
        ],
        [
            "John",
            "3"
        ],
        [
            "Sylvian",
            "2"
        ],
        [
            "Mahmood",
            "1"
        ]
    ],
    Entity2: [
        [
            "Alex",
            "2"
        ],
        [
            "Saleem",
            "1;2;3"
        ],
        [
            "Meherbano",
            "2;3"
        ],
        [
            "John",
            "1;2"
        ]
    ],
    Richard: [
        [
            "Entity1",
            "1;2"
        ],
        [
            "Entity3",
            "2;3"
        ],
        [
            "Entity4",
            "1"
        ]
    ],
    John: [
        [
            "Entity1",
            "1;2;3"
        ],
        [
            "Entity5",
            "3"
        ],
        [
            "Entity6",
            "1"
        ],
        [
            "Entity7",
            "1;2;3"
        ],
        [
            "Entity2",
            "1"
        ]
    ],
    Sylvian: [
        [
            "Entity1",
            "1"
        ],
        [
            "Entity8",
            "2"
        ]
    ],
    Mahmood: [
        [
            "Entity1",
            "1;2;3"
        ]
    ],
    Entity3: [
        [
            "Richard",
            "1;2;3"
        ]
    ],
    Entity4: [
        [
            "Richard",
            "1"
        ]
    ],
    Entity5: [
        [
            "John",
            "2"
        ]
    ],
    Entity6: [
        [
            "John",
            "1"
        ],
        [
            "Junaid",
            "3"
        ]
    ],
    Entity7: [
        [
            "John",
            "2;3"
        ],
        [
            "Omar",
            "1;2"
        ],
        [
            "Saad",
            "1;2;3"
        ],
        [
            "Hasan",
            "2;3"
        ],
        [
            "Faheem",
            "3"
        ]
    ],
    Junaid: [
        [
            "Entity6",
            "2"
        ],
        [
            "Entity8",
            "1;2;3"
        ]
    ],
    Omar: [
        [
            "Entity7",
            "1"
        ]
    ],
    Saad: [
        [
            "Entity7",
            "1;2"
        ]
    ],
    Hasan: [
        [
            "Entity7",
            "3"
        ]
    ],
    Entity8: [
        [
            "Sylvian",
            "1;2"
        ],
        [
            "Junaid",
            "3"
        ],
        [
            "Danial",
            "3"
        ],
        [
            "Nadeem",
            "3"
        ]
    ],
    Danial: [
        [
            "Entity8",
            "1;2"
        ]
    ],
    Nadeem: [
        [
            "Entity8",
            "1"
        ]
    ],
    Saleem: [
        [
            "Entity2",
            "2"
        ],
        [
            "Entity9",
            "2"
        ],
        [
            "Entity10",
            "3"
        ],
        [
            "Entity11",
            "2;3"
        ]
    ],
    Meherbano: [
        [
            "Entity2",
            "1;2;3"
        ],
        [
            "Entity12",
            "3"
        ]
    ],
    Entity9: [
        [
            "Saleem",
            "1;2"
        ]
    ],
    Entity10: [
        [
            "Saleem",
            "1;2"
        ],
        [
            "Faheem",
            "2;3"
        ]
    ],
    Entity11: [
        [
            "Saleem",
            "1;2"
        ]
    ],
    Faheem: [
        [
            "Entity10",
            "1"
        ],
        [
            "Entity7",
            "3"
        ]
    ],
    Entity12: [
        [
            "Meherbano",
            "2;3"
        ],
        [
            "Shah",
            "3"
        ]
    ],
    Shah: [
        [
            "Entity12",
            "2"
        ],
        [
            "Entity13",
            "3"
        ]
    ],
    Entity13: [
        [
            "Shah",
            "1;2"
        ]
    ]
};
const netNodes = Object.keys(dummyAssocNetwork);
const partitions = {};
netNodes.forEach((nodeId)=>{
    const nodeIdLen = nodeId.length;
    const partitId = nodeId.slice(nodeIdLen - 3, nodeIdLen);
    if (!partitions[partitId]) partitions[partitId] = {};
    partitions[partitId][nodeId] = dummyAssocNetwork[nodeId];
});

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}],"gkKU3":[function(require,module,exports) {
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

},{}],"7aygW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "loadData", ()=>loadData);
const getPartition = (id)=>id.slice(id.length - 3, id.length);
const loadScript = (srcLink, onLoad, onError)=>{
    const scriptElem = document.createElement("script");
    scriptElem.setAttribute("src", srcLink);
    document.head.appendChild(scriptElem);
    // handling onLoad and onError
    scriptElem.addEventListener("load", onLoad);
    scriptElem.addEventListener("error", onError);
};
async function loadData(id) {
    const { partitions, loadedData } = Window;
    if (!partitions || !loadedData) throw new Error("Data cannot be loaded without initializing a partitions and a loadedData global variable to an empty object. Make sure to invoke the preparePartitions functions before attempting to load Data");
    return new Promise((res, rej)=>{
        const partition = getPartition(id);
        const srcLink = `partitions/${partition}.js`;
        loadScript(srcLink, ()=>{
            res();
            loadedData[id] = partitions[partition][id];
            console.log(`This script ${partition}.js has been loaded successfully`);
            console.log(`Data for id ${id} has been loaded successfully`);
        }, (err)=>{
            rej();
            console.error(`This script ${partition}.js failed to load. ${err}`);
        });
    });
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"gkKU3"}]},["km5uZ","bB7Pu"], "bB7Pu", "parcelRequired854")

//# sourceMappingURL=index.3d214d75.js.map
