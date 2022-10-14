import * as crypto from "crypto"

class Identifier {
  private _value: string

  public constructor() {
    this._value = crypto.randomUUID()
  }

  public equals(other: Identifier) {
    return this._value === other._value
  }

  public get value() {
    return this._value
  }
}

export default Identifier
