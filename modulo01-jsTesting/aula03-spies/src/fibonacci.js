class Fibonacci {
  // GENERATORS = funções de interação
  *execute(input, current = 0, next = 1) {
    if (input === 0) {
      return 0;
    }
    // é tipo um return sob demanda dos generators
    yield current;

    // delega uma execução da função e não executa um retorno
    yield* this.execute(input - 1, next, current + next);
  }
}

module.exports = Fibonacci;
