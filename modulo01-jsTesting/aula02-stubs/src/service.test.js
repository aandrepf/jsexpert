const Service = require("./service");
const sinon = require("sinon");
const { deepStrictEqual } = require("assert");

const BASE_URL1 = "https://www.swapi.tech/api/planets/1";
const BASE_URL2 = "https://www.swapi.tech/api/planets/2";
const mocks = {
  tatooine: require("./mocks/tatooine.json"),
  alderaan: require("./mocks/alderaan.json"),
};

(async () => {
  /*
    *DESSA FORMA ELE ESTÁ INDO BUSCAR NA INTERNET
  {
    const service = new Service();
    const withoutStub = await service.makeRequest(BASE_URL2);
  }
  */

  const service = new Service();

  // * 1 - AQUI o stub pega o comportamento do metodo makeRequest
  const stub = sinon.stub(service, "makeRequest");

  // * 2 - STUB passa o BASE_URL para o parametro de makeRequest para URL1 TAOOINE
  stub.withArgs(BASE_URL1).resolves(mocks.tatooine);

  // * 3 - STUB passa o BASE_URL para o parametro de makeRequest para URL2 ALDERAAN
  stub.withArgs(BASE_URL2).resolves(mocks.alderaan);

  {
    const expected = {
      name: "Tatooine",
      surfaceWater: "1",
    };

    const results = await service.getPlanets(BASE_URL1);
    deepStrictEqual(results, expected);
  }

  {
    const expected = {
      name: "Alderaan",
      surfaceWater: "40",
    };
    const results = await service.getPlanets(BASE_URL2);
    deepStrictEqual(results, expected);
  }
})();
