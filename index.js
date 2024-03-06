// @ts-check
import { dummyAssocNetwork } from "./dummyNetwork.js";
/**
 * state/ data
 * @typedef {Object} assocNetworkObj
 * @property {Set} associates
 * @property {Set} entities
 * @property {Set} leafEntities
 * @property {Object} leafEntitiesConn
 * @property {Object} links
 * @property {boolean} assoc
 * @property {string} rootID
 * @property {Object} linksMap
 * methods
 * @property {function} getInitialNetwork
 * @property {function} getUnexpAssocs
 * @property {function} expandAssoc
 * @property {function} getGroupedNetwork
 */

class AssociateNetwork {
  /**
   * defining parameters for the network constructor
   * @param {string} rootID The root to start the network from (id of the associate/ entity)
   * @param {boolean} assoc flag indicating whether the
   * @param {any} linksMap
   */

  constructor(rootID, assoc, linksMap) {
    const associates = assoc ? new Set([rootID]) : new Set();
    const entities = assoc ? new Set() : new Set([rootID]);
    const leafEntities = new Set();
    const leafEntitiesConn = {};
    const links = {};

    this.associates = associates;
    this.entities = entities;
    this.leafEntities = leafEntities;
    this.leafEntitiesConn = leafEntitiesConn;
    this.links = links;
    this.assoc = assoc;
    this.rootID = rootID;
    this.linksMap = linksMap;
  }

  getInitialNetwork() {
    const {
      associates,
      entities,
      leafEntities,
      leafEntitiesConn,
      links,
      rootID,
      linksMap,
    } = this;
    let { assoc } = this;

    /** @type {3|2} nDegree */
    let nDegree = assoc ? 3 : 2;

    /**
     * @param {string} rootID
     * @param {number} nDegree
     * @param {Object} linksMap
     * @param {number} currentDegree
     * @param {boolean} assoc
     */

    function depthFirstTrav(
      rootID,
      nDegree,
      linksMap,
      currentDegree = 1,
      assoc
    ) {
      const currentConn = linksMap[rootID] ? linksMap[rootID] : [];
      currentConn.forEach((connec) => {
        const [conn, role] = connec;
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
        const linkExists = links[linkId];
        if (!linkExists) {
          links[linkId] = role;
          if (nDegree === currentDegree) {
            if (!leafEntitiesConn[conn]) {
              leafEntitiesConn[conn] = 1;
            } else {
              leafEntitiesConn[conn]++;
            }
          }
        }
      });
      assoc = !assoc; // boolean - whether our layer is associates (or entities)
      currentDegree++;
      if (currentDegree <= nDegree) {
        currentConn.forEach(([nodeId, role]) =>
          depthFirstTrav(nodeId, nDegree, linksMap, currentDegree, assoc)
        );
      }
    }
    depthFirstTrav(rootID, nDegree, linksMap, 1, assoc);
    return this;
  }

  getUnexpAssocs(assocId) {
    const { linksMap } = this;
    const linkedEntites = linksMap[assocId].map((d) => d[0]);
    const unexpAssocs = new Set();
    linkedEntites.forEach((entityId) => {
      if (this.leafEntities.has(entityId)) {
        const linkedAssocs = linksMap[entityId].map((d) => d[0]);

        linkedAssocs.forEach(
          /**
           * @callback
           * @params {string} assoc
           */
          (assoc) => {
            if (!this.associates.has(assoc)) {
              unexpAssocs.add(assoc);
            }
          }
        );
      }
    });
    return unexpAssocs;
  }

  expandAssoc(assocId) {
    const unexpAssocs = Array.from(this.getUnexpAssocs(assocId));
    const { linksMap } = this;

    unexpAssocs.forEach((assoc) => {
      const linkedEntites = linksMap[assoc];
      this.associates.add(assoc);
      linkedEntites.forEach(([entity, role]) => {
        if (this.leafEntities.has(entity)) {
          this.leafEntitiesConn[entity]++;
          if (linksMap[entity].length === this.leafEntitiesConn[entity]) {
            this.entities.add(entity);
            this.leafEntities.delete(entity);
          }
        } else if (
          !this.leafEntities.has(entity) &&
          !this.entities.has(entity)
        ) {
          this.leafEntities.add(entity);
          this.leafEntitiesConn[entity] = 1;
        }

        this.links[`${assoc}-${entity}`] = role;
      });
    });

    return this;
  }

  getGroupedNetwork() {
    const entityGrps = {};
    const links = Object.entries(this.links);

    links.forEach(([link, role]) => {
      const [assocId, entId] = link.split("-");
      if (!entityGrps[entId]) {
        entityGrps[entId] = [];
      }
      entityGrps[entId].push(assocId);
    });

    for (const [entityId, groupIds] of Object.entries(entityGrps)) {
      entityGrps[entityId] = groupIds.sort().join(",");
    }

    const linksArray = links.map(([link, role]) => {
      const [assocId, entId] = link.split("-");
      return {
        assoc: assocId,
        entity: entId,
        entityGrp: entityGrps[entId],
        role: role,
      };
    });

    const linksGrp = {};

    // nesting links
    linksArray.forEach((link) => {
      const { entityGrp, assoc } = link;

      const linkId = `${assoc}|${entityGrp}`;
      if (!linksGrp[linkId]) {
        linksGrp[linkId] = {
          assoc,
          entityGrp,
          sublinks: [],
        };
      }
      linksGrp[linkId].sublinks.push(link);
    });

    const linksGrpArr = Object.values(linksGrp);

    const listEntities = (linkGrp) => {
      const entitiesArr = linkGrp.sublinks.map((d) => d.entity);
      return entitiesArr.join(",");
    };

    return linksGrpArr.map((d) => ({
      ...d,
      entitiesList: listEntities(d),
    }));
  }
}

/**
 * @type {assocNetworkObj} network
 */

const network = new AssociateNetwork("Alex", true, dummyAssocNetwork);

network.getInitialNetwork();
console.log(network);
console.log(network.getUnexpAssocs("Meherbano"));
network.expandAssoc("Meherbano");
network.expandAssoc("John");
console.log(network);
console.log(Object.entries(network.links));
console.log(network.getGroupedNetwork());
