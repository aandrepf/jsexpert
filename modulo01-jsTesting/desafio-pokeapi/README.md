# Story: Seu primeiro time pokemon

A idéia é testar os fundamentos de `testing`, aplicando o que foi visto no
`JS Expert - Módulo 02` num projeto simples.

Consumindo a [PokeAPI](https://pokeapi.co/), faça uma API que retorne 3 pokemóns aleatórios para formar seu time inicial numa jornada pokemon.

## Requisitos

### Funcionalidades

1. `GET /`

Deve ser a rota padrão da aplicação ao tentar acessar qualquer rota inexistente. (ex.: `/hi`, `/hello`)

2. `GET /team`

Deve retornar um array com 3 pokemóns aleatórios, contendo seus respectivos `name` e `moves`, (mostrando apenas um array de strings com os 3 primeiros `moves` presentes na API. ex.: `["mega-punch","fire-punch","thunder-punch"]`).

### Testes

- [x] mocks
- [x] stubs
- [x] spies
- [x] testes end-2-end
- [x] testes unitários
- [x] 100% de code coverage

### Extras

- [x] TDD e BDD, será que rola? Acho que vale a tentativa!
- [x] Que tal consumir a API sem usar libs externas? o módulo `https` do node pode ser bem interessante!

## Dicas

Sinta-se livre pra desenvolver sua solução da melhor maneira possível, e caso já queira uma ajuda nos patterns e em como organizar as idéias, aqui vai:

### Arquitetura esperada

```
project
│   README.md
│   .nycrc.json
│   package.json
│
└───src
│   │   api.js
│   │
│   └───repository
│   │   │   teamRepository.js
│   │
│   └───service
│       │   teamService.js
│
└───test
│   └───e2e
│   │   │   api.test.js
│   │
│   └───mocks
│   │   │   valid-team.json
│   │   │   ...
│   │
│   └───unit
│       │   teamRepository.test.js
│       │   teamService.test.js
│
└───coverage
│   │   ...
```

### Entendendo a PokeAPI

URLs Úteis ao desafio:

- https://pokeapi.co/api/v2/pokemon
- https://pokeapi.co/api/v2/pokemon/7

### Checklist features

- Web API

  - [x] Deve ter uma rota raiz usada como _fallback_.
  - [x] Deve ter uma rota de `/team`, onde:
    - [x] Deve consumir a PokeAPI e selecionar 3 pokemóns aleatórios
    - [x] Deve consumir a PokeAPI para obter mais informações sobre os pokemóns escolhidos
    - [x] Deve retornar um objeto JSON conetendo um array com 3 pokemóns, cada um com seus respectivos `name (String)` e `moves (String[])`

- Testes

  - [x] Deve ter cobertura de testes end-2-end e unitários
  - [x] 100% de code coverage

- Coverage Result

![image](https://raw.githubusercontent.com/aandrepf/jsexpert/main/modulo01-jsTesting/desafio-pokeapi/coverage.png)
