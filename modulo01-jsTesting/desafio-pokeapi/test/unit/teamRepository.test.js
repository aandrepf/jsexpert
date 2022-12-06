const { describe, it } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const {
  teamRepositoryMock,
  urls,
  mocks,
} = require("../mocks/teamRepository.mock");

describe("Team Repository Suite Test", () => {
  it("should call the specified url when makeRequest is called", async () => {
    const expected = mocks.validPokemons;

    const stub = sinon.stub(teamRepositoryMock, "makeRequest");
    stub.withArgs(urls.base).resolves(mocks.validPokemons);

    const result = await teamRepositoryMock.makeRequest(urls.base);

    expect(result).to.be.deep.equal(expected);
    expect(teamRepositoryMock.makeRequest.calledOnce).to.be.ok;
  });

  it("should return a list of pokemons when listPokemons is called", async () => {
    const pokemons = mocks.validPokemons.results;

    const stub = sinon.stub(teamRepositoryMock, "listPokemons");
    stub.resolves(pokemons);

    const result = await teamRepositoryMock.listPokemons();
    const expected = pokemons;

    expect(result).to.be.deep.equal(expected);
    expect(teamRepositoryMock.makeRequest.calledOnce).to.be.ok;
  });

  it("should return an specific pokemon when findPokemon is called", async () => {
    const pokemon = {
      name: mocks.validPokemon1.name,
      moves: mocks.validPokemon1.moves.map((move) => move.move.name),
    };

    const stub = sinon.stub(teamRepositoryMock, "findPokemon");
    stub.withArgs(urls.pokemon1).resolves(pokemon);

    const result = await teamRepositoryMock.findPokemon(urls.pokemon1);
    const expected = pokemon;

    expect(JSON.stringify(result)).to.be.equal(JSON.stringify(expected));
    expect(teamRepositoryMock.makeRequest.calledOnce).to.be.ok;
  });
});
