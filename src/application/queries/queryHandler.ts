import { Query } from "./queries"

export interface QueryHandler<Result, Key extends string> {
  handle(query: Query<Result, Key>): Promise<Result>
  key: Key
}
