const TeamRepository = require("./../../src/repository/teamRepository");
const TeamService = require("./../../src/service/teamService");

const mocks = {
  validPokemons: require("./valid-pokemons.json"),
  validTeam: require("./valid-team.json"),
  validPokemon1: require("./valid-pokemon1.json"),
  validPokemon2: require("./valid-pokemon2.json"),
  validPokemon3: require("./valid-pokemon3.json"),
};

const urls = {
  base: "https://pokeapi.co/api/v2/pokemon/",
  pokemon1: "https://pokeapi.co/api/v2/pokemon/7/",
  pokemon2: "https://pokeapi.co/api/v2/pokemon/11/",
  pokemon3: "https://pokeapi.co/api/v2/pokemon/9/",
};

const teamRepositoryMock = new TeamRepository();
const teamServiceMock = new TeamService();

module.exports = {
  teamRepositoryMock,
  teamServiceMock,
  urls,
  mocks,
};
