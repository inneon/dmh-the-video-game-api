class NegativeIdError extends Error {
  constructor() {
    super("The identifier cannot be negative")
  }
}

export default NegativeIdError
