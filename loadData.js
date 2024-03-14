// @ts-check
import { Queue, ListEntry } from "./Queue";

/**
 * @param {string} id
 * @returns {string}
 */
const getPartition = (id) => id.slice(id.length - 3, id.length);

/**
 * @typedef {[string, string]} neighborTuple
 */
/**
 * // define all the global variables to be attached to the window object
 * @typedef {Object} ExtendedWindowObject
 * @property {Object<string, Object>} [partitions]
 * @property {Object<string, Array<neighborTuple>} [loadedData]
 * @typedef {Window & ExtendedWindowObject} ExtendedWindow
 */

/**
 * @returns {ExtendedWindow}
 */
const getGlobalWindow = () => {
  /** @type {ExtendedWindow} */
  const extWindow = window; // same memory reference as window
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
 */
const getIdMeta = (id) => {
  const idTypes = ["C", "N", "E", "I", "S"];
  const assocEntitySep = ["+", "-"];

  const trailRegExp = RegExp(
    `[${idTypes.join("")}][${assocEntitySep.join("")}]?$`,
    "g"
  );
  const idMetaStrArr = id.match(trailRegExp);
  const idMetaStr = idMetaStrArr ? idMetaStrArr[0] : undefined;
  if (!idMetaStr) {
    throw new Error(`The ${id} does not have a valid trailing substring`);
  }
  const justTheId = id.replace(idMetaStr, "");
  if (!(justTheId.length >= 3)) {
    throw new Error(`The ${id} does not have a valid numeric structure`);
  }
  return {
    partition: justTheId.slice(justTheId.length - 3, justTheId.length),
    idType: idMetaStr[0],
    justTheId,
    assocEntityFlag: idMetaStr[1],
  };
};

/**
 *
 * @param {string} srcLink
 * @param {() => void} onLoad
 * @param {(err: ErrorEvent) => void} onError
 */
const loadScript = (srcLink, onLoad, onError) => {
  const scriptElem = document.createElement("script");
  scriptElem.setAttribute("src", srcLink);
  scriptElem.setAttribute("class", "dyn-loaded-script");
  document.head.appendChild(scriptElem);

  // handling onLoad and onError
  scriptElem.addEventListener("load", () => {
    onLoad();
    scriptElem.remove(); // also remove stuff after you have gotten the data
  });
  scriptElem.addEventListener("error", onError);
};

/**
 *
 * @param {string} id
 * @returns
 */
async function loadData(id) {
  const { partitions, loadedData } = getGlobalWindow();

  if (!partitions || !loadedData) {
    throw new Error(
      "Data cannot be loaded without initializing a partitions and a loadedData global variable to an empty object. Make sure to invoke the preparePartitions functions before attempting to load Data"
    );
  }
  return new Promise((res, rej) => {
    const partition = getPartition(id);
    // console.log(id);
    // console.log(partition);
    const srcLink = `partitions/${partition}.js`;
    if (!partitions[partition] && !loadedData[id]) {
      loadScript(
        srcLink,
        () => {
          res(true);
          loadedData[id] = partitions[partition][id];
          // console.log(
          //   `The script ${partition}.js has been loaded successfully`
          // );
          //console.log(`Data for id ${id} has been loaded successfully`);
        },
        (err) => {
          rej();
          console.error(`This script ${partition}.js failed to load. ${err}`);
        }
      );
    } else {
      res(true);
      // console.log(
      //   `The partition ${partition} is already loaded, so ${id}'s data should be in!`
      // );
      loadedData[id] = partitions[partition][id];
    }
  });
}

const clearPartitons = () => {
  getGlobalWindow().partitions = {}; // mutation
};

const prepPartitons = () => {
  clearPartitons();
  getGlobalWindow().loadedData = {}; // mutation
};

prepPartitons();

/**
 *
 * @param {string} nodeId
 * @param {number} maxDepth
 * @param {'assoc'|'entity'} role
 */
async function BFLoad(nodeId, maxDepth, role) {
  const { loadedData } = getGlobalWindow();
  const visited = new Set();
  let queue = new Queue();
  queue.enqueue(new ListEntry({ nodeId, depth: 1, role }));

  if (!loadedData) {
    throw new Error(
      "Make sure that loadedData property is instantiated in the global window object"
    );
  }

  while (queue.size > 0) {
    const currNode = queue.dequeue();
    if (!currNode) {
      throw new Error("dequeueing node returned undefined in BFLoad");
    }
    const { nodeId: currId, depth: currDepth, role: currRole } = currNode.value;
    if (currDepth > maxDepth) {
      break;
    }
    if (!visited.has(currId)) {
      await loadData(currId);
      const neighbors = loadedData[currId].map((d) => d[0]);
      neighbors.forEach((neighbor) =>
        queue.enqueue(
          new ListEntry({
            nodeId: neighbor,
            depth: currDepth + 1,
            role: currRole === "assoc" ? "entity" : "assoc",
          })
        )
      );
      visited.add(currId);
    }
  }
}

export { getGlobalWindow, BFLoad };
