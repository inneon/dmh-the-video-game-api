class DuplicateGameNameError extends Error {
  constructor(name: string) {
    super(`The game with name ${name} already exists`)
  }
}
export default DuplicateGameNameError
