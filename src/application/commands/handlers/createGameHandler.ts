import { CommandHandler, CreateGame } from ".."
import { GameRepository, gameFactory } from "../../../domain"
import { DuplicateGameNameError, PlayerNotFoundError } from "../../errors"
import { GameService, PlayerService } from "../../services"

class CreateGameHandler implements CommandHandler<CreateGame> {
  private readonly _gameRepository: GameRepository
  private readonly _gameService: GameService
  private readonly _playerService: PlayerService

  constructor(
    gameRepository: GameRepository,
    gameService: GameService,
    playerService: PlayerService,
  ) {
    this._gameRepository = gameRepository
    this._gameService = gameService
    this._playerService = playerService
  }

  async handleRequest(command: CreateGame): Promise<void> {
    const matchingGames = await this._gameService.findByName(
      command.name,
      command.gmId,
    )
    if (!!matchingGames) {
      throw new DuplicateGameNameError(command.name)
    }

    const gm = await this._playerService.getById(command.gmId)
    if (!gm) {
      throw new PlayerNotFoundError(command.gmId)
    }

    const game = gameFactory.createGame(command.name, gm)
    await this._gameRepository.add(game)
  }
}

export default CreateGameHandler
