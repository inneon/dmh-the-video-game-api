import { Identifier } from "../../domain/valueObjects"
import { Command } from "./"

class CreateGame implements Command {
  private readonly _name: string
  private readonly _gmId: Identifier

  get name() {
    return this._name
  }

  get gmId() {
    return this._gmId
  }

  constructor(name: string, gmId: Identifier) {
    this._name = name
    this._gmId = gmId
  }
}

export default CreateGame
