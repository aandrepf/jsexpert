const BaseRepository = require("../reposotory/base/baseRepository");
const Tax = require("./../entities/tax");
const Transaction = require("./../entities/transaction");

class CarService {
  constructor({ cars }) {
    // * A service delega o arquivo para BaseRepository que consegue ler o arquivo
    this.carRepository = new BaseRepository({ file: cars });

    // * Por ser statica não precisamos instanciar Tax
    this.taxesBasedOnAge = Tax.taxesBasedOnAge;

    this.currencyFormat = new Intl.NumberFormat("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  }

  getRandomPositionFromArray(list) {
    const listLength = list.length;

    // Retorna o arredondamento de acordo com o tamanho da lista
    return Math.floor(Math.random() * listLength);
  }

  choosenRandomCar(carCategory) {
    const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
    const carId = carCategory.carIds[randomCarIndex];
    return carId;
  }

  async getAvailableCar(carCategory) {
    const carId = this.choosenRandomCar(carCategory);
    const car = await this.carRepository.find(carId);
    return car;
  }

  calculateFInalPrice(customer, carCategory, numberOfDays) {
    const { age } = customer;
    const price = carCategory.price;

    //* tax é um apelido para a const then
    const { then: tax } = this.taxesBasedOnAge.find(
      (tax) => age >= tax.from && age <= tax.to
    );

    const finalPrice = tax * price * numberOfDays;

    // * formatando pro formato brasileiro
    const fomattedPrice = this.currencyFormat.format(finalPrice);

    return fomattedPrice;
  }

  async rent(customer, carCategory, numberOfDays) {
    const car = await this.getAvailableCar(carCategory);
    const finalPrice = await this.calculateFInalPrice(
      customer,
      carCategory,
      numberOfDays
    );

    const today = new Date();
    today.setDate(today.getDate() + numberOfDays);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const dueDate = today.toLocaleDateString("pt-br", options);

    const transaction = new Transaction({
      customer,
      car,
      dueDate,
      amount: finalPrice,
    });

    return transaction;
  }
}

module.exports = CarService;
