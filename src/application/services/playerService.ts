import { Player } from "../../domain"
import { Identifier } from "../../domain/valueObjects"

export interface PlayerService {
  getById(id: Identifier): Promise<Player | null>
}
