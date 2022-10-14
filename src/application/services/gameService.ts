import { Game } from "../../domain"
import { Identifier } from "../../domain/valueObjects"

export interface GameService {
  findByName(name: string, gmId: Identifier): Promise<Game | null>
}
