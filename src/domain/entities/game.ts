import { Identifier, Name } from "../valueObjects"
import AggregateRoot from "./aggregateRoot"
import { Player } from "./"
import { PlayerAddedToGameEvent } from "../events"
import { DuplicatePlayerAddedError } from "../errors"

class Game extends AggregateRoot<Identifier> {
  private _name: Name
  private _gm: Player
  private _players: Player[] = []

  public constructor(id: Identifier, name: Name, gm: Player) {
    super(id)
    this._name = name
    this._gm = gm
  }

  public AddPlayer(player: Player) {
    if (this._players.some(({ id }) => id.equals(player.id))) {
      throw new DuplicatePlayerAddedError(player)
    }

    this._players.push(player)

    this.AddEvent(new PlayerAddedToGameEvent(this, player))
  }
}

export default Game
