import { dummyAssocNetwork } from "./dummyNetwork.js";

class AssociateNetwork {
  constructor(rootID, assoc, linksMap) {
    const associates = assoc ? new Set([rootID]) : new Set();
    const entities = assoc ? new Set() : new Set([rootID]);
    const leafEntities = new Set();
    const leafEntitesConn = {};
    const links = new Set();

    Object.assign(this, {
      associates,
      entities,
      leafEntities,
      leafEntitesConn,
      links,
      assoc,
      rootID,
      linksMap,
    });
  }

  getInitialNetwork() {
    const {
      associates,
      entities,
      leafEntities,
      leafEntitesConn,
      links,
      rootID,
      linksMap,
    } = this;
    let { assoc } = this;
    const nDegree = assoc ? 3 : 2;
    function depthFirstTrav(
      rootID,
      nDegree,
      linksMap,
      currentDegree = 1,
      assoc
    ) {
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
          depthFirstTrav(nodeId, nDegree, linksMap, currentDegree, assoc)
        );
      }
    }
    depthFirstTrav(rootID, nDegree, linksMap, 1, assoc);
    return this;
  }

  getUnexpAssocs(assocId) {
    const { linksMap } = this;
    const linkedEntites = linksMap[assocId];
    const unexpAssocs = new Set();
    linkedEntites.forEach((entityId) => {
      if (this.leafEntities.has(entityId)) {
        const linkedAssocs = linksMap[entityId];
        linkedAssocs.forEach((assoc) => {
          if (!this.associates.has(assoc)) {
            unexpAssocs.add(assoc);
          }
        });
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
      linkedEntites.forEach((entity) => {
        if (this.leafEntities.has(entity)) {
          this.leafEntitesConn[entity]++;
          if (linksMap[entity].length === this.leafEntitesConn[entity]) {
            this.entities.add(entity);
            this.leafEntities.delete(entity);
          }
        } else if (
          !this.leafEntities.has(entity) &&
          !this.entities.has(entity)
        ) {
          this.leafEntities.add(entity);
          this.leafEntitesConn[entity] = 1;
        }

        this.links.add(`${assoc}-${entity}`);
      });
    });

    return this;
  }

  getGroupedNetwork() {
    const entityGrps = {};
    const links = Array.from(this.links);

    console.log(this);
    links.forEach((link) => {
      const [assocId, entId] = link.split("-");
      if (!entityGrps[entId]) {
        entityGrps[entId] = [];
      }
      entityGrps[entId].push(assocId);
    });

    for (const [entityId, groupIds] of Object.entries(entityGrps)) {
      entityGrps[entityId] = groupIds.sort().join(",");
    }

    const linksArray = links.map((link) => {
      const [assocId, entId] = link.split("-");
      return {
        assoc: assocId,
        entity: entId,
        entityGrp: entityGrps[entId],
      };
    });

    //console.log(linksArray);

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

const network = new AssociateNetwork("Alex", true, dummyAssocNetwork);
network.getInitialNetwork();
network.getGroupedNetwork();
