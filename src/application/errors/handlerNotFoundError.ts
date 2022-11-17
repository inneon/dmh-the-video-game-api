class HandlerNotFoundError extends Error {
  constructor(commandName: string) {
    super(`A handler to handle ${commandName} could not be found`)
  }
}

export default HandlerNotFoundError
