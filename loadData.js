const getPartition = (id) => id.slice(id.length - 3, id.length);
const loadScript = (srcLink, onLoad, onError) => {
  const scriptElem = document.createElement("script");
  scriptElem.setAttribute("src", srcLink);
  document.head.appendChild(scriptElem);

  // handling onLoad and onError
  scriptElem.addEventListener("load", onLoad);
  scriptElem.addEventListener("error", onError);
};

async function loadData(id) {
  const { partitions, loadedData } = Window;

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
    if (!Window.partitions[partition]){
    loadScript(
      srcLink,
      () => {
        res();
        loadedData[id] = Window.partitions[partition][id];
        // console.log(`The script ${partition}.js has been loaded successfully`);
        // console.log(`Data for id ${id} has been loaded successfully`);
      },
      (err) => {
        rej();
        console.error(`This script ${partition}.js failed to load. ${err}`);
      }
    )
    } else {
      res();
      // console.log(`The partition ${partition} is already loaded!`);
      loadedData[id] = Window.partitions[partition][id];
    }
  });
}

export { loadData };
