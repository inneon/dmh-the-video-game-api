import { Command as CommandBase } from "./"

interface CommandDispatcher {
  dispatch<Command extends CommandBase>(command: Command): Promise<void>
}

export default CommandDispatcher
