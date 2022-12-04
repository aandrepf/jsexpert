const Base = require("./base/base");

class Customer extends Base {
  constructor({ id, name, age }) {
    // * mandamos as infos para classe Base
    super({ id, name });

    this.age = age;
  }
}

module.exports = Customer;
