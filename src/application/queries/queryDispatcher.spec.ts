import { HandlerNotFoundError } from "../errors"
import { Query } from "./queries"
import { InMemoryQueryDispatcher } from "./queryDispatcher"
import { QueryHandler } from "./queryHandler"

describe("InMemoryQueryDispatcher", () => {
  it("dispatches queries to the right handler", async () => {
    const query: Query<number, "testQuery"> = {
      key: "testQuery",
    }

    const handlerLogic = jest.fn(() => 0)
    const queryHandler: QueryHandler<
      number,
      Query<number, "testQuery">,
      "testQuery"
    > = {
      key: "testQuery",
      handle: async () => handlerLogic(),
    }

    const dispatcher = new InMemoryQueryDispatcher()
    dispatcher.register(queryHandler)

    await dispatcher.handle(query)

    expect(handlerLogic).toBeCalled()
  })

  it("rejects a query that does not have a handler", async () => {
    const query: Query<number, "testQuery"> = {
      key: "testQuery",
    }

    const dispatcher = new InMemoryQueryDispatcher()

    await expect(async () => dispatcher.handle(query)).rejects.toThrowError(
      new HandlerNotFoundError(typeof query),
    )
  })
})
