// @ts-check
import { dummyAssocNetwork } from "./dummyNetwork.js";
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
 */

class AssociateNetwork {
  /**
   * defining parameters for the network constructor
   * @param {string} rootID The root to start the network from (id of the associate/ entity)
   * @param {boolean} assoc flag indicating whether the
   * @param {Object} linksMap
   */

  constructor(rootID, assoc, linksMap) {
    const associates = assoc ? new Set([rootID]) : new Set();
    const expAssociates = new Set();
    const checkedAssocs = new Set();
    const entities = assoc ? new Set() : new Set([rootID]);
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
    const {
      associates,
      entities,
      leafEntities,
      leafEntitiesConn,
      links,
      rootID,
      linksMap,
      assoc: assocFlag,
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

    let checkedAssocs = assocFlag
      ? this.getSortedAssocList().slice(0, 4)
      : this.getSortedAssocList().slice(0, 5);

    const checkedAssocIds = checkedAssocs.map((d) => Object.keys(d)[0]);

    this.checkedAssocs = assocFlag
      ? new Set([rootID, ...checkedAssocIds])
      : new Set(checkedAssocIds);

    return this;
  }

  /**
   *
   * @param {string} assocId
   * @return {Set<string>}
   */
  getUnexpAssocs(assocId) {
    const { linksMap } = this;
    const linkedEntites = linksMap[assocId].map((d) => d[0]);
    const unexpAssocs = new Set();
    linkedEntites.forEach((entityId) => {
      if (this.leafEntities.has(entityId)) {
        const linkedAssocs = linksMap[entityId].map((d) => d[0]);

        linkedAssocs.forEach(
          /**
           * @param {string} assoc
           * */
          (assoc) => {
            if (!this.hasAssoc(assoc)) {
              unexpAssocs.add(assoc);
            }
          }
        );
      }
    });
    return unexpAssocs;
  }

  /**
   *
   * @param {string} assocId
   * @returns {boolean}
   */
  hasAssoc(assocId) {
    return this.associates.has(assocId) || this.expAssociates.has(assocId);
  }

  /**
   * @param {string} assocId
   * @return {assocNetworkObj}
   */
  expandAssoc(assocId) {
    const unexpAssocs = Array.from(this.getUnexpAssocs(assocId));
    const { linksMap } = this;

    unexpAssocs.forEach((assoc) => {
      const linkedEntites = linksMap[assoc];
      this.expAssociates.add(assoc);
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
  /**
   *
   * @param {string} assocId
   */
  checkAssoc(assocId) {
    if (this.hasAssoc(assocId)) {
      this.checkedAssocs.add(assocId);
    } else {
      throw new Error(
        `The specified associate id ${assocId} does not exist in the network and cannot be expanded`
      );
    }
  }

  /**
   *
   * @param {string} assocId
   */
  uncheckAssoc(assocId) {
    if (this.checkedAssocs.has(assocId)) {
      this.checkedAssocs.delete(assocId);
    } else {
      throw new Error(
        `The specified associate id ${assocId} does is not currently checked and hence cannot be unchecked`
      );
    }
  }

  /** @returns {Array<Object>}  */
  getSortedAssocList() {
    const only1stDegAssocs = new Set(this.associates);
    only1stDegAssocs.delete(this.rootID);

    return [...only1stDegAssocs]
      .map((assocId) => ({
        [assocId]: this.linksMap[assocId].length,
      }))
      .sort(
        (assoc1, assoc2) => Object.values(assoc2)[0] - Object.values(assoc1)[0]
      );
  }

  /** @returns {Array<Object>[1]|undefined}  */
  getRootAssocList() {
    if (this.assoc){
      return [this.rootID]
      .map((assocId) => ({
        [assocId]: this.linksMap[assocId].length,
      }));
    }
  }
  
  /** @returns {Array<Object>}  */
  getSortedExpAssocList() {
    return [...this.expAssociates]
      .map((assocId) => ({
        [assocId]: this.linksMap[assocId].length,
      }))
      .sort(
        (assoc1, assoc2) => Object.values(assoc2)[0] - Object.values(assoc1)[0]
      );
  }

  getGroupedNetwork() {
    const entityGrps = {};
    // only filter links that are relevant to checked associates
    const links = Object.entries(this.links).filter(([link, role]) => {
      const [assocId, entId] = link.split("-");
      return this.checkedAssocs.has(assocId);
    });

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
// network.checkAssoc("Mahmood");
network.checkAssoc("Faheem");
// network.uncheckAssoc("Faheem");
console.log(network.getSortedAssocList());
console.log(network.getSortedExpAssocList());
console.log(network.getRootAssocList());
console.log(network.getGroupedNetwork());