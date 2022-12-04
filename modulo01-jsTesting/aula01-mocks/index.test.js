const { error } = require("./src/constants");
const File = require("./src/file");

// *REJECTS = Espera uma Promise rejeitada
// *DEEPSTRICTEQUAL = Alem de verifcar o valor ele também ve a referencia do objeto
const { rejects, deepStrictEqual } = require("assert");

(async () => {
  {
    const filePath = "./mocks/emptyFile-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    rejects(result, rejection);
  }
  {
    const filePath = "./mocks/fourItens-invalid.csv";
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    const result = File.csvToJSON(filePath);
    await rejects(result, rejection);
  }
  {
    const filePath = "./mocks/threeItens-valid.csv";
    const result = await File.csvToJSON(filePath);
    const expected = [
      {
        name: "Andre Figueiredo",
        id: 123,
        profession: "JS Instructor",
        birthday: 1987,
      },
      {
        name: "Xuxa da Silva",
        id: 321,
        profession: "JS Tester",
        birthday: 1942,
      },
      {
        name: "Joaozinho",
        id: 232,
        profession: "Java Developer",
        birthday: 1992,
      },
    ];

    deepStrictEqual(JSON.stringify(result), JSON.stringify(expected));
  }
})();
