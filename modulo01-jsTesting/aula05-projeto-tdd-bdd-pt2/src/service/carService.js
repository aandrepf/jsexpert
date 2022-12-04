const BaseRepository = require("./../reposotory/base/baseRepository");

class CarService {
  constructor({ cars }) {
    // * A service delega o arquivo para BaseRepository que consegue ler o arquivo
    this.carRepository = new BaseRepository({ file: cars });
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
}

module.exports = CarService;
