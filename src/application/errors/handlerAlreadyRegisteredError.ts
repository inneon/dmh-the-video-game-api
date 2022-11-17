class HandlerAlreadyRegisteredError extends Error {
  constructor(key: string) {
    super(
      `A handler is already registered to handle queries with a key of ${key}`,
    )
  }
}

export default HandlerAlreadyRegisteredError
