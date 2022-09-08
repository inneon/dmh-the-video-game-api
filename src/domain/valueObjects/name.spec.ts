import { EmptyNameError } from "../errors"
import { Name } from "./"

describe("name value object", () => {
  it("can create a name value object", () => {
    const name = new Name("Davey McDaveson")

    expect(name).toBeDefined()
  })

  it("rejects an empty name", () => {
    expect(() => new Name("")).toThrow(new EmptyNameError())
  })
})
