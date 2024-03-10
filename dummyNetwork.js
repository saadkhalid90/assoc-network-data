const dummyAssocNetwork2 = {
  Alex: ["Entity1", "Entity2"],
  Entity1: ["Alex", "Richard", "John", "Sylvian", "Mahmood"],
  Entity2: ["Alex", "Saleem", "Meherbano", "John"],
  Richard: ["Entity1", "Entity3", "Entity4"],
  John: ["Entity1", "Entity5", "Entity6", "Entity7", "Entity2"],
  Sylvian: ["Entity1", "Entity8"],
  Mahmood: ["Entity1"],
  Entity3: ["Richard"],
  Entity4: ["Richard"],
  Entity5: ["John"],
  Entity6: ["John", "Junaid"],
  Entity7: ["John", "Omar", "Saad", "Hasan", "Faheem"],
  Junaid: ["Entity6", "Entity8"],
  Omar: ["Entity7"],
  Saad: ["Entity7"],
  Hasan: ["Entity7"],
  Entity8: ["Sylvian", "Junaid", "Danial", "Nadeem"],
  Danial: ["Entity8"],
  Nadeem: ["Entity8"],
  Saleem: ["Entity2", "Entity9", "Entity10", "Entity11"],
  Meherbano: ["Entity2", "Entity12"],
  Entity9: ["Saleem"],
  Entity10: ["Saleem", "Faheem"],
  Entity11: ["Saleem"],
  Faheem: ["Entity10", "Entity7"],
  Entity12: ["Meherbano", "Shah"],
  Shah: ["Entity12", "Entity13"],
  Entity13: ["Shah"],
};

const dummyAssocNetwork = {
  Alex: [
    ["Entity1", "1;2;3"],
    ["Entity2", "1;2"],
  ],
  Entity1: [
    ["Alex", "1"],
    ["Richard", "2;3"],
    ["John", "3"],
    ["Sylvian", "2"],
    ["Mahmood", "1"],
  ],
  Entity2: [
    ["Alex", "2"],
    ["Saleem", "1;2;3"],
    ["Meherbano", "2;3"],
    ["John", "1;2"],
  ],
  Richard: [
    ["Entity1", "1;2"],
    ["Entity3", "2;3"],
    ["Entity4", "1"],
  ],
  John: [
    ["Entity1", "1;2;3"],
    ["Entity5", "3"],
    ["Entity6", "1"],
    ["Entity7", "1;2;3"],
    ["Entity2", "1"],
  ],
  Sylvian: [
    ["Entity1", "1"],
    ["Entity8", "2"],
  ],
  Mahmood: [["Entity1", "1;2;3"]],
  Entity3: [["Richard", "1;2;3"]],
  Entity4: [["Richard", "1"]],
  Entity5: [["John", "2"]],
  Entity6: [
    ["John", "1"],
    ["Junaid", "3"],
  ],
  Entity7: [
    ["John", "2;3"],
    ["Omar", "1;2"],
    ["Saad", "1;2;3"],
    ["Hasan", "2;3"],
    ["Faheem", "3"],
  ],
  Junaid: [
    ["Entity6", "2"],
    ["Entity8", "1;2;3"],
  ],
  Omar: [["Entity7", "1"]],
  Saad: [["Entity7", "1;2"]],
  Hasan: [["Entity7", "3"]],
  Entity8: [
    ["Sylvian", "1;2"],
    ["Junaid", "3"],
    ["Danial", "3"],
    ["Nadeem", "3"],
  ],
  Danial: [["Entity8", "1;2"]],
  Nadeem: [["Entity8", "1"]],
  Saleem: [
    ["Entity2", "2"],
    ["Entity9", "2"],
    ["Entity10", "3"],
    ["Entity11", "2;3"],
  ],
  Meherbano: [
    ["Entity2", "1;2;3"],
    ["Entity12", "3"],
  ],
  Entity9: [["Saleem", "1;2"]],
  Entity10: [
    ["Saleem", "1;2"],
    ["Faheem", "2;3"],
  ],
  Entity11: [["Saleem", "1;2"]],
  Faheem: [
    ["Entity10", "1"],
    ["Entity7", "3"],
  ],
  Entity12: [
    ["Meherbano", "2;3"],
    ["Shah", "3"],
  ],
  Shah: [
    ["Entity12", "2"],
    ["Entity13", "3"],
  ],
  Entity13: [["Shah", "1;2"]],
};

const netNodes = Object.keys(dummyAssocNetwork);
const partitions = {};

netNodes.forEach((nodeId) => {
  const nodeIdLen = nodeId.length;
  const partitId = nodeId.slice(nodeIdLen - 3, nodeIdLen);

  if (!partitions[partitId]){
    partitions[partitId] = {};
  }
  partitions[partitId][nodeId] = dummyAssocNetwork[nodeId];
})





export { dummyAssocNetwork, partitions };
