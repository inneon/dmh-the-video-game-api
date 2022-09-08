import { Player } from "../entities"

class DuplicatePlayerAddedError extends Error {
  constructor(player: Player) {
    super(`Player ${player.id} has been added to the game twice`)
  }
}

export default DuplicatePlayerAddedError
