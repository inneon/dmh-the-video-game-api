class EmptyNameError extends Error {
  constructor() {
    super("Names cannot be created empty")
  }
}

export default EmptyNameError
