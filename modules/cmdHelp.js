function cliHelp(bot) {
    bot.once("spawn", () => {
        const availableCommands = Object.keys(bot.dashboard.commands)
        bot.dashboard.commands.cliHelp = (commandName) => {
            context: {
                description: `Displays information about available commands.`
                syntax: `:cliHelp <command>`
            }
            if (commandName == `help`) {
                return getHelpInfo()
            }
            else {
                const command = availableCommands
                if (command) {
                    return `
                    Command: ${commandName}
                    Description: ${command.description}
                    Syntax: ${command.syntax}
                    `
                }
                else {
                    return `Command '${commandName}' not found. Please use the ':help' command to see a list of available commands.`
                }
            }

            function getHelpInfo() {
                // commandName = bot.dashboard.commands.command.context
                let helpInfo = "Available commands:\n"
                for (const commandName in availableCommands) {
                    helpInfo += `\n${commandName}\n`
                    helpInfo == `Description: ${commandName.description}\n`
                    helpInfo == `Syntax: ${commandName.syntax}\n`
                }
                return helpInfo
            }
        }
    })

}

module.exports = cliHelp