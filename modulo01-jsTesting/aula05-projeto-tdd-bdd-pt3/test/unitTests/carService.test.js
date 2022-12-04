const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { join } = require("path");
const { expect } = require("chai");
const sinon = require("sinon");

const CarService = require("../../src/service/carService");
const Transaction = require("../../src/entities/transaction");

const carsDatabase = join(__dirname, "../../database", "cars.json");
const mocks = {
  validCarCategory: require("../mocks/valid-carCategory.json"),
  validCar: require("../mocks/valid-car.json"),
  validCustomer: require("../mocks/valid-customer.json"),
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

  it("given a carCategory, customer and numberOfDays it should calculate final amount in real", async () => {
    // * para não sujar o mock usamos o Object.create, pois irá haver mudança nos valores
    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const numberOfDays = 5;

    // * Não depender de dados externos
    sandbox
      .stub(carService, "taxesBasedOnAge")
      .get(() => [{ from: 40, to: 50, then: 1.3 }]);

    const expected = carService.currencyFormat.format(244.4);
    const result = carService.calculateFInalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    expect(result).to.be.deep.equal(expected);
  });

  it("given a customer and a car category it should return a transaction receipt", async () => {
    const car = mocks.validCar;

    //* REST/SPREAD para criar um objeto copia e modificar mais de um valor
    const carCategory = {
      ...mocks.validCarCategory,
      price: 37.6,
      carIds: [car.id],
    };

    const customer = Object.create(mocks.validCustomer);
    customer.age = 20;

    const numberOfDays = 5;
    const dueDate = "10 de novembro de 2020";

    const now = new Date(2020, 10, 5);

    // * Modifica o comportamento do objeto Date e toda data vai apontar para a data do now
    sandbox.useFakeTimers(now.getTime());
    // * Mudamos o comportamento de find do repository para não acessar o BD diretamente
    sandbox
      .stub(carService.carRepository, carService.carRepository.find.name)
      .resolves(car);

    // * 37.6 * 1.1 = 41.36 * 5 days = 206.8
    const expectedAmount = carService.currencyFormat.format(206.8);
    const result = await carService.rent(customer, carCategory, numberOfDays);

    const expected = new Transaction({
      customer,
      car,
      dueDate,
      amount: expectedAmount,
    });

    expect(result).to.be.deep.equal(expected);
  });
});
