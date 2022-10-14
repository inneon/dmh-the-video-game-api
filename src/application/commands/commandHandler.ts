import { Command as CommandBase } from "./"

interface CommandHandler<Command extends CommandBase> {
  handleRequest(command: Command): Promise<void>
}

export default CommandHandler
