import { NegativeIdError } from "../errors"
import { Identifier } from "./"

describe("identifier value object", () => {
  it("can create a identifier value object", () => {
    const identifier = new Identifier(1)

    expect(identifier).toBeDefined()
  })

  it("rejects an negative identifier", () => {
    expect(() => new Identifier(-100)).toThrow(new NegativeIdError())
  })
})
