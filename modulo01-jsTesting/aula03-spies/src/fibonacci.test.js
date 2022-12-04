const Fibonacci = require("./fibonacci");
const sinon = require("sinon");
const assert = require("assert");

// Fibonacci = O proximo valor corresponde a soma dos dois anteriores
// dado 3
// 0,1,1,2
// dado 5
// 0,1,1,2,3
(async () => {
  {
    const fibonacci = new Fibonacci();
    const spy = sinon.spy(fibonacci, "execute");

    // generators retornam funções iteradoras (e tem uma função .next())
    // existem 3 formas de ler os dados
    // usando as funções .next, for await e rest/spread
    for await (const i of fibonacci.execute(3)) {
    }

    // * Algoritmo sempre vai começar do zero!
    const expectedCount = 4;
    assert.deepStrictEqual(spy.callCount, expectedCount);
  }

  {
    const fibonacci = new Fibonacci();

    // * A partir daqui o sinon passa a observar o metodo execute e analizar quantas vezes o mesmo foi chamado
    const spy = sinon.spy(fibonacci, "execute");

    // * Usando REST/SPREAD
    const [...results] = fibonacci.execute(5);
    // [0] input = 5, current = 0, next = 1
    // [1] input = 4, current = 1, next = 1
    // [2] input = 3, current = 1  next = 2
    // [3] input = 2, current = 2  next = 3
    // [4] input = 1, current = 3, next = 5
    // [5] input = 0 ---> PARA A EXECUÇÃO

    const { args } = spy.getCall(2);
    const expectedResult = [0, 1, 1, 2, 3];
    const expectedParams = Object.values({
      input: 3,
      current: 1,
      next: 2,
    });

    assert.deepStrictEqual(args, expectedParams);
    assert.deepStrictEqual(results, expectedResult);
  }
})();
