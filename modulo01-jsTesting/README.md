# Javascript Testing

Usando a versão do NodeJS **v14.0.0**

## Mocks

Os **mocks** sao usados em testes de unidade. Testes em geral sáo como um jogo testando de um ponto A para o B.
Mas para testar de um ponto B para C, criamos mocks dos testes de A para B e em seguida usamos os resultados
para testar o comportamento entre B e C.

Antes de ir para o codigo precisamos entender o cenario e os comportamentos que a aplicação precisa ter.

O interessante é pensar em testar tudo que vai dar problema e depois testar a forma correta

_Criar diversos cenários possíveis usamos mocks e eveitamos testes repetitivos_

## Stubs

Usados os **stubs** para mudar um comportamento do sistema por objetos estaticos onde criamos diferentes mocks para cada
cenário especifico

Aqui no caso quando queremos testar uma função, por exemplo, de CEP, ao ivés de olhar para a API na internet mudamos o foco
dela para o objeto mockado desse cenário

_Os testes não devem depender de serviços externos ou internet_

Para esse estudo usamos a API do Star Wars [SWAPI](https://swapi.tech/)

Com o **sinon** definimos uma função e por baixo dos panos ela muda o comportamento padrão
da função. E assim mesmo sem internet ela ainda consegue mapear os resultados

## Spies

Os spies observam as funcoes validando a quantidade de vezes que as funcoes foram chamadas com quais parametros e quais resultados retornaram. Util para funcoes recursivas ou lógicas complexa. Usamos o **sinon** para fazer o spy de uma função generator para executar uma regra de fibonacci.

## Testes e2e e Code Coverage

Um **teste E2E**, ou _End-to-End_, é um método de teste utilizado para testar um fluxo da aplicação desde o começo até o fim. Seu intuito é replicar cenários reais feitos pelos usuários com a intenção de validar que o sistema esteja funcionando como o esperado.

Usamos a lib **mocha** para executar os testes e **supertest** para subir um servidor em uma determinada porta e requisita a api na porta

O **Istanbul** é um pacote que ajuda onde faltou testar o codigo e validar as métricas

```js
    // -w = (watch) para ficar observando o test
    // --parallel = eveita que fiquem gerando erros e melhora a resposta dos testes
    "test": "npx mocha -w --parallel *.test.js", // somente teste
    "test:cov": "npx nyc npx mocha --parallel *.test.js" // esse é teste e coverage
```

## Sobre TDD e BDD

A metodologia **Test Driven Development** prega que devemos seguir um ciclo de processos. Primeiro escrevemos um teste que falha, adicionamos a implementação, o teste então passa e depois refatoramos o código e assim se repete o fluxo para que a aplicação fique totalmente interdependente.

O **Behaviour Driven Development** é um conjunto de praticas que deveria ser usado junto com o TDD e teste unitários. Ele tem uma relação mais proxima com a area de negócios. A semantica é mais baseada em um vocabulário de usuário.

## Projeto TDD & BDD - Parte 1

O projeto se trata de um processo de aluguel de carro com backend envolvido, padrão repo, camadas como service, camadas de apresentação onde roda o BDD e o TDD validando toda aplicação nos testes. Ainda iremos usar um gerador de massa de dados segundo o padrão _cinder_.

Usaremos a lib **faker@5.1.0** para simular banco de dados
