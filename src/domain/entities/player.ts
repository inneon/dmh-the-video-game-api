import { Identifier, Name } from "../valueObjects"

class Player {
  private _id: Identifier
  private _name: Name

  public get id() {
    return this._id
  }

  constructor(id: Identifier, name: Name) {
    this._id = id
    this._name = name
  }
}

export default Player
