// @ts-check

/**
 * @param {string} id
 * @returns {string}
 */
const getPartition = (id) => id.slice(id.length - 3, id.length);

/**
 * // define all the global variables to be attached to the window object
 * @typedef {Object} ExtendedWindowObject
 * @property {Object<string, Object>} [partitions]
 * @property {Object<string, Object>} [loadedData]
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
          // console.log(`The script ${partition}.js has been loaded successfully`);
          // console.log(`Data for id ${id} has been loaded successfully`);
        },
        (err) => {
          rej();
          console.error(`This script ${partition}.js failed to load. ${err}`);
        }
      );
    } else {
      res(true);
      // console.log(`The partition ${partition} is already loaded!`);
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
 * @param {number} depth
 */

async function DFLoad(nodeId, depth = 6) {
  const visited = new Set();
  /**
   *
   * @param {string} nodeId
   * @param {number} currentDepth
   */
  async function DFLoadInner(nodeId, currentDepth = 1) {
    const { loadedData } = getGlobalWindow();
    if (!loadedData) {
      throw new Error(
        "loadedData property is not defined on the global window object. Please make sure that the prepPartions functions is invoked prior to "
      );
    }
    await loadData(nodeId);
    if (!visited.has(nodeId)) {
      visited.add(nodeId);
    }
    currentDepth++;
    if (currentDepth <= depth) {
      const nreighborData = loadedData[nodeId];
      const neighborIds = nreighborData.map((d) => d[0]);
      for (const nodeId of neighborIds) {
        if (!visited.has(nodeId)) {
          await DFLoadInner(nodeId, currentDepth);
        }
      }
    }
  }
  await DFLoadInner(nodeId);
  clearPartitons();
}

export { DFLoad, getGlobalWindow  };
