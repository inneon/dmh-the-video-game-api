import { NegativeIdError } from "../errors"

class Identifier {
  private _value: number

  public constructor(value: number) {
    if (value < 0) {
      throw new NegativeIdError()
    }

    this._value = value
  }
}

export default Identifier
