import { HandlerNotFoundError } from "../errors"
import { Query } from "./queries"
import { QueryHandler } from "./queryHandler"

export interface QueryDispatcher {
  handle<Result, Key extends string>(query: Query<Result, Key>): Promise<Result>
}

export class InMemoryQueryDispatcher implements QueryDispatcher {
  private handlers: { [key: string]: QueryHandler<any, any, any> } = {}

  register<Result, Key extends string, TQuery extends Query<Result, Key>>(
    handler: QueryHandler<Result, TQuery, Key>,
  ) {
    this.handlers[handler.key] = handler
  }

  async handle<Result, Key extends string>(
    query: Query<Result, Key>,
  ): Promise<Result> {
    const handler = this.handlers[query.key]

    if (!handler) {
      throw new HandlerNotFoundError(typeof query)
    }

    return await handler.handle(query)
  }
}
