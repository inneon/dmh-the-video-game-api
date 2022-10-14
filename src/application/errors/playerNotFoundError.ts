import { Identifier } from "../../domain/valueObjects"

class PlayerNotFoundError extends Error {
  constructor(id: Identifier) {
    super(`The player with id ${id.value} could not be found`)
  }
}
export default PlayerNotFoundError
