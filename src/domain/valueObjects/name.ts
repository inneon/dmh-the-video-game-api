import { EmptyNameError } from "../errors"

class Name {
  private _value: string

  public constructor(value: string) {
    if (!value.length) {
      throw new EmptyNameError()
    }

    this._value = value
  }
}

export default Name
