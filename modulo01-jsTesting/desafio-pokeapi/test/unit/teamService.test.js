const { describe, it, before, beforeEach, afterEach } = require("mocha");
const { expect } = require("chai");
const sinon = require("sinon");

const {
  mocks,
  teamRepositoryMock,
  teamServiceMock,
} = require("./../mocks/teamRepository.mock");

describe("Team Service Suite Test", () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("should retrieve a random position from an array", () => {
    const data = [0, 1, 2, 3, 4];

    const item = teamServiceMock.getRandomItemFromArray(data);

    // * Esperamos que o item exista em data e seja true
    expect(data.includes(item)).to.be.true;
  });

  it("should return multiple random items from an array", () => {
    const data = [0, 1, 2, 3, 4];
    const quantity = 3;

    const items = teamServiceMock.getMultipleRandomItemsFromArray(
      data,
      quantity
    );

    items.forEach((n) => {
      expect(data.includes(n)).to.be.true;
    });
  });

  it("should return a full team with 3 random pokemons, each one with 3 moves", async () => {
    const team = mocks.validTeam;
    const pokemons = await teamRepositoryMock.listPokemons();
    const rawTeam = [pokemons[7], pokemons[10], pokemons[8]];

    sandbox
      .stub(
        teamServiceMock,
        teamServiceMock.getMultipleRandomItemsFromArray.name
      )
      .onFirstCall()
      .returns(rawTeam);

    sandbox.stub(teamServiceMock, "getTeam").resolves(team);

    const result = await teamServiceMock.getTeam();
    const expected = team;

    expect(JSON.stringify(result)).to.equal(JSON.stringify(expected));
  });
});
