const fs = require("fs");

const partitions = {
  lex: {
    Alex: [
      ["Entity1", "1;2;3"],
      ["Entity2", "1;2"],
    ],
  },
  ty1: {
    Entity1: [
      ["Alex", "1"],
      ["Richard", "2;3"],
      ["John", "3"],
      ["Sylvian", "2"],
      ["Mahmood", "1"],
    ],
  },
  ty2: {
    Entity2: [
      ["Alex", "2"],
      ["Saleem", "1;2;3"],
      ["Meherbano", "2;3"],
      ["John", "1;2"],
    ],
  },
  ard: {
    Richard: [
      ["Entity1", "1;2"],
      ["Entity3", "2;3"],
      ["Entity4", "1"],
    ],
  },
  ohn: {
    John: [
      ["Entity1", "1;2;3"],
      ["Entity5", "3"],
      ["Entity6", "1"],
      ["Entity7", "1;2;3"],
      ["Entity2", "1"],
    ],
  },
  ian: {
    Sylvian: [
      ["Entity1", "1"],
      ["Entity8", "2"],
    ],
  },
  ood: { Mahmood: [["Entity1", "1;2;3"]] },
  ty3: { Entity3: [["Richard", "1;2;3"]] },
  ty4: { Entity4: [["Richard", "1"]] },
  ty5: { Entity5: [["John", "2"]] },
  ty6: {
    Entity6: [
      ["John", "1"],
      ["Junaid", "3"],
    ],
  },
  ty7: {
    Entity7: [
      ["John", "2;3"],
      ["Omar", "1;2"],
      ["Saad", "1;2;3"],
      ["Hasan", "2;3"],
      ["Faheem", "3"],
    ],
  },
  aid: {
    Junaid: [
      ["Entity6", "2"],
      ["Entity8", "1;2;3"],
    ],
  },
  mar: { Omar: [["Entity7", "1"]] },
  aad: { Saad: [["Entity7", "1;2"]] },
  san: { Hasan: [["Entity7", "3"]] },
  ty8: {
    Entity8: [
      ["Sylvian", "1;2"],
      ["Junaid", "3"],
      ["Danial", "3"],
      ["Nadeem", "3"],
    ],
  },
  ial: { Danial: [["Entity8", "1;2"]] },
  eem: {
    Nadeem: [["Entity8", "1"]],
    Saleem: [
      ["Entity2", "2"],
      ["Entity9", "2"],
      ["Entity10", "3"],
      ["Entity11", "2;3"],
    ],
    Faheem: [
      ["Entity10", "1"],
      ["Entity7", "3"],
    ],
  },
  ano: {
    Meherbano: [
      ["Entity2", "1;2;3"],
      ["Entity12", "3"],
    ],
  },
  ty9: { Entity9: [["Saleem", "1;2"]] },
  y10: {
    Entity10: [
      ["Saleem", "1;2"],
      ["Faheem", "2;3"],
    ],
  },
  y11: { Entity11: [["Saleem", "1;2"]] },
  y12: {
    Entity12: [
      ["Meherbano", "2;3"],
      ["Shah", "3"],
    ],
  },
  hah: {
    Shah: [
      ["Entity12", "2"],
      ["Entity13", "3"],
    ],
  },
  y13: { Entity13: [["Shah", "1;2"]] },
};

const partitIds = Object.keys(partitions);

partitIds.forEach((id) => {
  fs.writeFileSync(`${id}.js`, `Window.partitions["${id}"] = ${JSON.stringify(partitions[id])};`)
})
