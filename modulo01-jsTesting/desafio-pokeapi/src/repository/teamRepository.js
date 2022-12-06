const https = require("https");

const API_BASE_URL = "https://pokeapi.co/api/v2";

class TeamRepository {
  /**
   * Method to make all requests
   * @url The url to make the request
   */
  async makeRequest(url) {
    const chunks = [];
    return new Promise((resolve, reject) => {
      https.get(url, (response) => {
        response.on("data", (data) => {
          chunks.push(data);
        });
        response.on("error", reject);
        response.on("end", () => {
          const data = Buffer.concat(chunks);
          resolve(JSON.parse(data));
        });
      });
    });
  }

  /**
   * List all pokemons from the Poke API
   */
  async listPokemons() {
    const data = await this.makeRequest(`${API_BASE_URL}/pokemon`);
    return data.results;
  }

  /**
   * Method that returns an object containing name and moves from an pokemon
   * @param  pokemonUrl The url where have the details of the pokemon
   */
  async findPokemon(pokemonUrl) {
    const pokemonRaw = await this.makeRequest(pokemonUrl);

    const pokemon = {
      name: pokemonRaw.name,
      moves: pokemonRaw.moves.map((move) => move.move.name),
    };

    return pokemon;
  }
}

module.exports = TeamRepository;
