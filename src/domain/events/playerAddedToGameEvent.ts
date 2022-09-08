import { Game, Player } from "../entities"
import DomainEvent from "./domainEvent"

class PlayerAddedToGameEvent implements DomainEvent {
  private _game: Game
  private _player: Player

  public get game() {
    return this._game
  }
  public get player() {
    return this._player
  }

  constructor(game: Game, player: Player) {
    this._game = game
    this._player = player
  }
}

export default PlayerAddedToGameEvent
