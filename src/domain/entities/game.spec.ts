import { DuplicatePlayerAddedError } from "../errors"
import { PlayerAddedToGameEvent } from "../events"
import { Identifier, Name } from "../valueObjects"
import Game from "./game"
import Player from "./player"

describe("game entity", () => {
  describe("player management", () => {
    it("can add a player to the game", () => {
      const game = new Game(new Identifier(), new Name("test game"))
      const player = new Player(new Identifier(), new Name("Davey McDaveson"))

      game.AddPlayer(player)

      const events = game.events
      expect(events).toHaveLength(1)
      expect(events[0]).toBeInstanceOf(PlayerAddedToGameEvent)
      const playerAddedToGameEvent = events[0] as PlayerAddedToGameEvent
      expect(playerAddedToGameEvent.game.id).toEqual(game.id)
      expect(playerAddedToGameEvent.player.id).toEqual(player.id)
    })

    it("cannot add the same player to a game twice", () => {
      const game = new Game(new Identifier(), new Name("test game"))
      const player = new Player(new Identifier(), new Name("Davey McDaveson"))

      game.AddPlayer(player)

      expect(() => game.AddPlayer(player)).toThrowError(
        new DuplicatePlayerAddedError(player),
      )
    })
  })
})
