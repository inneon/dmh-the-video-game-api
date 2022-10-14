import { Identifier } from "../valueObjects"
import DomainEvent from "./domainEvent"

class GameCreatedEvent implements DomainEvent {
  private readonly _name: string
  private readonly _gmId: Identifier

  public get name() {
    return this._name
  }

  public get gmId() {
    return this._gmId
  }

  constructor(name: string, gmId: Identifier) {
    this._name = name
    this._gmId = gmId
  }
}

export default GameCreatedEvent
