class EntityBase {
  #name;
  #age;
  #gender;

  constructor({ name, age, gender }) {
    this.#name = name;
    this.#age = age;
    this.#gender = gender;
  }

  get name() {
    const preffix = this.#gender === "male" ? "Mr." : "Ms.";
    return `${preffix} ${this.#name}`;
  }

  get birthday() {
    if (!this.#age) throw new Error("You must define age first!");
    return new Date().getFullYear() - this.#age;
  }

  set age(value) {
    this.#age = value;
  }
}

module.exports = EntityBase;
