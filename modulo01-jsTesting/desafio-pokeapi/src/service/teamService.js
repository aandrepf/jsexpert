const TeamRepository = require("./../repository/teamRepository");

class TeamService {
  constructor() {
    this.teamRepository = new TeamRepository();
  }

  /**
   * Method that returns itens randomly from an array
   * @param list The Array where the itens will be get randomly generated
   */
  getRandomItemFromArray(list) {
    const listLength = list.length;
    return list[Math.floor(Math.random() * listLength)];
  }

  /**
   * Method that returns a list with a length defined by the quantity
   * @param list The Array where the itens will be get randomly generated
   * @param quantity The defined length of the array will be returned
   */
  getMultipleRandomItemsFromArray(list, quantity) {
    // * Preenche com 0 um array com determinadas quantidades de posições e depois mapeia os itens que serão os dados do array
    return Array(quantity)
      .fill(0)
      .map(() => {
        return this.getRandomItemFromArray(list);
      });
  }

  /**
   * Method that returns the team with pokemon name and moves information
   * @param teamQuantity Quantity for the team list. Default is 3.
   */
  async getTeam(temQuantity = 3) {
    const pokemons = await this.teamRepository.listPokemons();
    const teamRaw = this.getMultipleRandomItemsFromArray(pokemons, temQuantity);

    const team = await Promise.all(
      teamRaw.map(async ({ url }) => {
        const pokemonInfo = await this.teamRepository.findPokemon(url);

        const pokemonMoves = pokemonInfo.moves.splice(0, 3);

        return { name: pokemonInfo.name, moves: pokemonMoves };
      })
    );

    return team;
  }
}

module.exports = TeamService;
