import { Game, gameFactory, GameRepository, Player } from "../../../domain"
import { GameCreatedEvent, Subscription } from "../../../domain/events"
import { Identifier, Name } from "../../../domain/valueObjects"
import { DuplicateGameNameError, PlayerNotFoundError } from "../../errors"
import { GameService, PlayerService } from "../../services"
import CreateGame from "../createGame"
import CreateGameHandler from "./createGameHandler"

describe("creating a game", () => {
  const gmId = new Identifier()

  const unsubscribes: (() => void)[] = []
  afterEach(() => {
    unsubscribes.forEach((unsubscribe) => unsubscribe())
    unsubscribes.splice(0, unsubscribes.length)
  })

  const fakeGameRepository: GameRepository = {
    get: async () => {
      throw Error("Getting is not supported from this stub")
    },
    add: async () => {
      throw Error("Getting is not supported from this stub")
    },
    update: async () => {
      throw Error("Updating is not supported from this stub")
    },
    delete: async () => {
      throw Error("Deleting is not supported from this stub")
    },
  }

  it("creates a game", async () => {
    const gameRepository: GameRepository = {
      ...fakeGameRepository,
      add: async () => {},
    }
    const gameService: GameService = {
      findByName: async () => null,
    }
    const playerService: PlayerService = {
      getById: async () => new Player(gmId, new Name("Davey McDaveson")),
    }

    const spy: Subscription<GameCreatedEvent> = jest.fn()
    const unsubscribe = gameFactory.subscribe(spy)
    unsubscribes.push(unsubscribe)

    const handler = new CreateGameHandler(
      gameRepository,
      gameService,
      playerService,
    )

    const command = new CreateGame("my new game", gmId)
    await handler.handleRequest(command)

    expect(spy).toHaveBeenCalledWith(new GameCreatedEvent("my new game", gmId))
  })

  it("doesn't create a game with a duplicate name", async () => {
    const gameName = "duplicate game"
    const gameService: GameService = {
      findByName: async () =>
        new Game(
          new Identifier(),
          new Name(gameName),
          new Player(new Identifier(), new Name("Davey McDaveson")),
        ),
    }
    const playerService: PlayerService = {
      getById: async () => new Player(gmId, new Name("Davey McDaveson")),
    }

    const handler = new CreateGameHandler(
      fakeGameRepository,
      gameService,
      playerService,
    )

    const command = new CreateGame(gameName, gmId)

    expect(async () => await handler.handleRequest(command)).rejects.toThrow(
      new DuplicateGameNameError(gameName),
    )
  })

  it("doesn't create a game with if the GM doesn't exist", async () => {
    const nonExistantId = new Identifier()
    const gameName = "duplicate game"
    const gameService: GameService = {
      findByName: async () => null,
    }
    const playerService: PlayerService = {
      getById: async () => null,
    }

    const handler = new CreateGameHandler(
      fakeGameRepository,
      gameService,
      playerService,
    )

    const command = new CreateGame(gameName, nonExistantId)

    expect(async () => await handler.handleRequest(command)).rejects.toThrow(
      new PlayerNotFoundError(nonExistantId),
    )
  })
})
