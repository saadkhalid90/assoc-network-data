// @ts-check
import { getGlobalWindow, BFLoad } from "./loadData";
import { Queue, ListEntry } from "./Queue";

/**
 * Structure of each link Tuple
 * @typedef {[string, string]} neighborTuple The first string is NeighborId and the second is concatenated roles
 */

class AssociateNetwork {
  /**
   * defining parameters for the network constructor
   * @param {string} rootID The root to start the network from (id of the associate/ entity)
   * @param {boolean} assoc flag indicating whether the root is an associate (true) or an entity (false)
   * @param {Object<string, Array<neighborTuple>>} linksMap A reference to the Object containing all the data currently loaded into the application
   */

  constructor(rootID, assoc, linksMap) {
    /** @type {Set<string>} */
    const associates = new Set();
    /** @type {Set<string>} */
    const expAssociates = new Set();
    /** @type {Set<string>} */
    const checkedAssocs = new Set();
    /** @type {Set<string>} */
    const entities = new Set();
    /** @type {Set<string>} */
    const expandableEntities = new Set();
    /** @type {Object<string, number>} */
    const expEntConnCnt = {};
    /** @type {Object<string, string>} */
    const links = {};

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
    const {
      associates,
      entities,
      expandableEntities,
      expEntConnCnt,
      links,
      rootID,
      linksMap,
      assoc: assocFlag,
    } = this;

    /**
     *
     * @param {string} nodeId
     * @param {number} depth
     * @param {Object<string, Array<neighborTuple>>} linksMap
     * @param {'assoc' | 'entity'} type
     */
    function BFTrav(nodeId, depth, linksMap, type) {
      const queue = new Queue();
      queue.enqueue(new ListEntry({ nodeId, depth: 1, type }));

      while (queue.size > 0) {
        const currNode = queue.dequeue();
        if (!currNode) {
          throw new Error("dequeueing node returned undefined in BFLoad");
        }
        const {
          nodeId: currId,
          depth: currDepth,
          type: currType,
          linkId: currentLinkId,
          assocRole: currAssocRole,
        } = currNode.value;

        if (currDepth > depth) {
          break;
        }
        const nodeExists =
          currType === "assoc"
            ? associates.has(currId)
            : entities.has(currId) || expandableEntities.has(currId);

        if (!nodeExists) {
          if (currType === "assoc") {
            associates.add(currId);
          } else {
            currDepth !== depth
              ? entities.add(currId)
              : expandableEntities.add(currId);
          }

          const linkExists = currentLinkId ? links[currentLinkId] : false;
          if (!linkExists && currentLinkId && currAssocRole) {
            links[currentLinkId] = currAssocRole;
            // process only happens for stuff in expandableEntities
            // we continue to count their connections (compare them with global data)
            if (expandableEntities.has(currId)) {
              if (!expEntConnCnt[currId]) {
                expEntConnCnt[currId] = 1;
              } else {
                expEntConnCnt[currId]++;
              }

              if (expEntConnCnt[currId] === linksMap[currId].length) {
                expandableEntities.delete(currId);
                entities.add(currId);
              }
            }
          }

          const neighbors = linksMap[currId];
          neighbors.forEach((neighbor) => {
            const [connId, role] = neighbor;
            queue.enqueue(
              new ListEntry({
                nodeId: connId,
                depth: currDepth + 1,
                type: currType === "assoc" ? "entity" : "assoc",
                linkId:
                  currType === "assoc"
                    ? `${currId}-${connId}`
                    : `${connId}-${currId}`,
                assocRole: role,
              })
            );
          });
        }
      }
    }

    BFTrav(rootID, 4, linksMap, assocFlag ? "assoc" : "entity");

    // Initialize the checked entities
    let checkedAssocs = assocFlag
      ? this.getSortedAssocList().slice(0, 4)
      : this.getSortedAssocList().slice(0, 5);

    const checkedAssocIds = checkedAssocs.map((d) => Object.keys(d)[0]);

    // initializing checked Associates
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
      if (this.expandableEntities.has(entityId)) {
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
   * @return {Promise<AssociateNetwork>}
   */
  async expandAssoc(assocId) {
    await BFLoad(assocId, 4, "assoc");
    const unexpAssocs = Array.from(this.getUnexpAssocs(assocId));
    const { linksMap } = this;

    unexpAssocs.forEach((assoc) => {
      const linkedEntites = linksMap[assoc];
      this.expAssociates.add(assoc);
      linkedEntites.forEach(([entity, role]) => {
        if (this.expandableEntities.has(entity)) {
          this.expEntConnCnt[entity]++;
          if (linksMap[entity].length === this.expEntConnCnt[entity]) {
            this.entities.add(entity);
            this.expandableEntities.delete(entity);
          }
        } else if (
          !this.expandableEntities.has(entity) &&
          !this.entities.has(entity)
        ) {
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
    if (this.assoc) {
      return [this.rootID].map((assocId) => ({
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

async function runStuff() {
  await BFLoad("Alex", 6, "assoc");
  const { loadedData: networkData } = getGlobalWindow();
  console.log(networkData);

  /** @type {AssociateNetwork} */
  const network = new AssociateNetwork("Alex", true, networkData);
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
