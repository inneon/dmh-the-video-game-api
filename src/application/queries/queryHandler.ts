import { Query } from "./queries"

export interface QueryHandler<
  Result,
  TQuery extends Query<Result, Key>,
  Key extends string,
> {
  handle(query: TQuery): Promise<Result>
  key: Key
}
