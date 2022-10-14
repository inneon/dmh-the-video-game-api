import { Game, Player } from "../entities"
import { GameCreatedEvent, Subscribable, Subscription } from "../events"
import { Identifier, Name } from "../valueObjects"

class GameFactory implements Subscribable<GameCreatedEvent> {
  private _handlers: Subscription<GameCreatedEvent>[] = []

  createGame(name: string, gm: Player) {
    const game = new Game(new Identifier(), new Name(name), gm)
    this._handlers.forEach((handler) =>
      handler(new GameCreatedEvent(name, gm.id)),
    )
    return game
  }

  subscribe(handler: Subscription<GameCreatedEvent>) {
    this._handlers.push(handler)

    const unsubscribe = () => {
      const deleteIndex = this._handlers.indexOf(handler)
      this._handlers.splice(deleteIndex, 1)
    }
    return unsubscribe
  }
}

const singleton = new GameFactory()

export default singleton
