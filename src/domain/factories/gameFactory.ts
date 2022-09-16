import { Game } from "../entities"
import { Identifier, Name } from "../valueObjects"

class GameFactory {
  createGame(name: Name) {
    return new Game(new Identifier(), name)
  }
}

export default new GameFactory()
