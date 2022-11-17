import { HandlerAlreadyRegisteredError, HandlerNotFoundError } from "../errors"
import { Query } from "./queries"
import { QueryHandler } from "./queryHandler"

export interface QueryDispatcher {
  dispatch<Result, Key extends string>(
    query: Query<Result, Key>,
  ): Promise<Result>
}

export class InMemoryQueryDispatcher implements QueryDispatcher {
  private handlers: { [key: string]: QueryHandler<any, any> } = {}

  register<Result, Key extends string>(handler: QueryHandler<Result, Key>) {
    if (this.handlers[handler.key]) {
      throw new HandlerAlreadyRegisteredError(handler.key)
    }
    this.handlers[handler.key] = handler
  }

  async dispatch<Result, Key extends string>(
    query: Query<Result, Key>,
  ): Promise<Result> {
    const handler = this.handlers[query.key]

    if (!handler) {
      throw new HandlerNotFoundError(typeof query)
    }

    return await handler.handle(query)
  }
}
