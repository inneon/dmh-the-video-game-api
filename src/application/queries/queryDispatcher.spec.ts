import { HandlerAlreadyRegisteredError, HandlerNotFoundError } from "../errors"
import { Query } from "./queries"
import { InMemoryQueryDispatcher } from "./queryDispatcher"
import { QueryHandler } from "./queryHandler"

describe("InMemoryQueryDispatcher", () => {
  it("dispatches queries to the right handler", async () => {
    const query: Query<number, "testQuery"> = {
      key: "testQuery",
    }

    const handlerLogic = jest.fn(() => 0)
    const queryHandler: QueryHandler<number, "testQuery"> = {
      key: "testQuery",
      handle: async () => handlerLogic(),
    }

    const dispatcher = new InMemoryQueryDispatcher()
    dispatcher.register(queryHandler)

    await dispatcher.dispatch(query)

    expect(handlerLogic).toBeCalled()
  })

  it("rejects a query that does not have a handler", async () => {
    const query: Query<number, "testQuery"> = {
      key: "testQuery",
    }

    const dispatcher = new InMemoryQueryDispatcher()

    await expect(async () => dispatcher.dispatch(query)).rejects.toThrowError(
      new HandlerNotFoundError(typeof query),
    )
  })

  it("rejects registering a handler where one is already assigned", () => {
    const dispatcher = new InMemoryQueryDispatcher()

    const originalHander: QueryHandler<number, "testQuery"> = {
      key: "testQuery",
      handle: async () => jest.fn()(),
    }
    dispatcher.register(originalHander)

    const duplicateHandler: QueryHandler<number, "testQuery"> = {
      key: "testQuery",
      handle: async () => jest.fn()(),
    }

    expect(() => dispatcher.register(duplicateHandler)).toThrow(
      new HandlerAlreadyRegisteredError("testQuery"),
    )
  })
})
