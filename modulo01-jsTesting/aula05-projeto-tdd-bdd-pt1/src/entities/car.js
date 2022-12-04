const Base = require("./base/base");

class Car extends Base {
  constructor({ id, name, releaseYear, available, gasAvailable }) {
    // * mandamos as infos para classe Base
    super({ id, name });

    this.releaseYear = releaseYear;
    this.available = available;
    this.gasAvailable = gasAvailable;
  }
}

module.exports = Car;
