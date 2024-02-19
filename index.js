import { dummyAssocNetwork } from "./dummyNetwork.js";

function getNthDegreeConns(rootID, nDegree, linksMap, assoc = true) { 
  const associates = assoc ? new Set([rootID]) : new Set();
  const entities = assoc ? new Set() : new Set([rootID]);
  const leafEntities = new Set();
  const leafEntitesConn = {};
  const links = new Set();
  function commulConn(rootID, nDegree, linksMap, currentDegree = 1, assoc) {
    const currentConn = linksMap[rootID] ? linksMap[rootID] : [];
    currentConn.forEach((conn) => {
      const nodeExists = assoc
        ? entities.has(conn) || leafEntities.has(conn)
        : associates.has(conn);
      if (!nodeExists) {
        if (assoc) {
          nDegree !== currentDegree
            ? entities.add(conn)
            : leafEntities.add(conn);
        } else {
          associates.add(conn);
        }
      }
      const linkId = assoc ? `${rootID}-${conn}` : `${conn}-${rootID}`;
      const linkExists = links.has(linkId);
      if (!linkExists) {
        links.add(linkId);
        if (nDegree === currentDegree) {
          if (!leafEntitesConn[conn]) {
            leafEntitesConn[conn] = 1;
          } else {
            leafEntitesConn[conn]++;
          }
        }
      }
    });
    assoc = !assoc; // boolean - whether our layer is associates (or entities)
    currentDegree++;
    if (currentDegree <= nDegree) {
      currentConn.forEach((nodeId) =>
        commulConn(nodeId, nDegree, linksMap, currentDegree, assoc)
      );
    }
  }
  commulConn(rootID, nDegree, linksMap, 1, assoc);
  return {
    associates,
    entities,
    leafEntities,
    leafEntitesConn,
    links,
  };
}

function getUnexploredAssociates(assocId, linksMap, currentNetwork) {
  const linkedEntites = linksMap[assocId];
  const unexpAssocs = new Set();
  linkedEntites.forEach((entityId) => {
    if (currentNetwork.leafEntities.has(entityId)) {
      const linkedAssocs = linksMap[entityId];
      linkedAssocs.forEach((assoc) => {
        if (!currentNetwork.associates.has(assoc)) {
          unexpAssocs.add(assoc);
        }
      });
    }
  });
  return unexpAssocs;
}

function expandAssoc(assocId, linksMap, currentNetwork) {
  const unexpAssocs = Array.from(
    getUnexploredAssociates(assocId, linksMap, currentNetwork)
  );

  unexpAssocs.forEach((assoc) => {
    const linkedEntites = linksMap[assoc];
    currentNetwork.associates.add(assoc);
    linkedEntites.forEach((entity) => {
      if (currentNetwork.leafEntities.has(entity)) {
        currentNetwork.leafEntitesConn[entity]++;
        if (
          linksMap[entity].length === currentNetwork.leafEntitesConn[entity]
        ) {
          currentNetwork.entities.add(entity);
          currentNetwork.leafEntities.delete(entity);
        }
      } else if (
        !currentNetwork.leafEntities.has(entity) &&
        !currentNetwork.entities.has(entity)
      ) {
        currentNetwork.leafEntities.add(entity);
        currentNetwork.leafEntitesConn[entity] = 1;
      }

      currentNetwork.links.add(`${assoc}-${entity}`);
    });
  });

  return currentNetwork;
}

const myNetwork = getNthDegreeConns("Alex", 3, dummyAssocNetwork, true);
console.log(myNetwork.associates);
console.log(myNetwork);

// console.log(getUnexploredAssociates("Meherbano", dummyAssocNetwork, myNetwork));
// console.log(expandAssoc("Meherbano", dummyAssocNetwork, myNetwork));
// console.log(getUnexploredAssociates("Saleem", dummyAssocNetwork, myNetwork));
// console.log(expandAssoc("Saleem", dummyAssocNetwork, myNetwork));
// console.log(getUnexploredAssociates("John", dummyAssocNetwork, myNetwork));
// console.log(expandAssoc("John", dummyAssocNetwork, myNetwork));
