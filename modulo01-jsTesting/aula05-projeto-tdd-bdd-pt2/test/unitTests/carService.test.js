const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { join } = require("path");
const { expect } = require("chai");
const sinon = require("sinon");

const CarService = require("./../../src/service/carService");
const carsDatabase = join(__dirname, "../../database", "cars.json");
const mocks = {
  validCarCategory: require("./../mocks/valid-carCategory.json"),
  validCar: require("./../mocks/valid-car.json"),
  validCustomer: require("./../mocks/valid-customer.json"),
};

describe("CarService Suite Test", () => {
  let carService = {};
  let sandbox = {};

  // * A ideia do before é de executar algo antes dos testes
  before(() => {
    // * Aqui indicamos sempre antes de iniciar os testes limpamos nossa instancia
    // * e passamos o arquivo do banco de dados de Car
    carService = new CarService({
      cars: carsDatabase,
    });
  });

  // * criamos um sandbox que limpa todas as instancias e garante que elas não vão ser corrompidas durante o processo
  beforeEach(() => {
    // * Antes de cada "it" ele cria uma instancia vazia o sinon
    sandbox = sinon.createSandbox();
  });

  // * depois de cada it queremos resetar o objeto
  afterEach(() => {
    // * stubs não ficam sujos ou perdidos
    sandbox.restore();
  });

  // * No TDD pensamos antes de pegar o resultado final
  it("should retrieve a random position from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const result = carService.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.be.gte(0);
  });

  it("should choose the first id from carIds int carCategory", () => {
    const carCategory = mocks.validCarCategory;
    const carIndex = 0;

    // * O stub muda o comportamento da getRandomPositionFromArray para ela sempre retornar o index 0
    sandbox
      .stub(carService, carService.getRandomPositionFromArray.name)
      .returns(carIndex);

    const result = carService.choosenRandomCar(carCategory);
    const expected = carCategory.carIds[carIndex];

    // * como o stub é um spy, garantimos que getRandomPositionFromArray foi chamado só uma vez
    expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;

    expect(result).to.be.equal(expected);
  });

  it("given a carCategory it should return an available car", async () => {
    const car = mocks.validCar;

    // * Para não sujar as instancias usamos o Object.create para crir uma cópia do Objeto pai
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    // * stub para não acessar diretamente nossa base de dados
    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    sandbox.spy(carService, carService.choosenRandomCar.name);

    const result = await carService.getAvailableCar(carCategory);
    const expected = car;

    // * garantir que os spies seguiram as premissas
    expect(carService.choosenRandomCar.calledOnce).to.be.ok;
    expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;

    // * Usamos BDD para criar algo mais semantico
    expect(result).to.be.deep.equal(expected);
  });
});
