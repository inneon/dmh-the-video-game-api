import { Game } from "../entities"
import { Identifier } from "../valueObjects"

export interface ReadonlyGameRepository {
  get(id: Identifier): Promise<Game>
}

export interface GameRepository extends ReadonlyGameRepository {
  add(game: Game): Promise<void>
  update(game: Game): Promise<void>
  delete(id: Identifier): Promise<void>
}
