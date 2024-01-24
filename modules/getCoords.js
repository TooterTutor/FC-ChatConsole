// Regular expression for detecting private messages to the bot
// [Rank] Username -> [Rank] Username Message 
const targetRegEx = /(?:\[[^\[\]]*\]) (\w+) -> (?:\[[^\[\]]*\]) (\w+) (.+)/

function getPlayerOrBotLocation(bot) {
    bot.once("spawn", () => {
        bot.addChatPattern("targetWhisper", targetRegEx, { repeat: true, parse: true })

        bot.dashboard.commands.getLocation = (commandSender, targetPlayer) => {
            context: {
                description: `Provides the coordinates and dimension of the bot or a specified player.\n- If 'targetPlayer' is provided, sends their coordinates if they are within render distance.\n- If 'targetPlayer' is omitted, sends the bot's current location.`
                Syntax: `:getLocation <recipient> [targetPlayer]`
            }
            if (commandSender && targetPlayer) {
                getPlayerLocation(commandSender, targetPlayer)
            } else {
                getBotLocation(commandSender)
            }
        }
    })

    function getPlayerLocation(commandSender, targetPlayer) {
        try {
            const playerPosition = bot.players[targetPlayer]?.entity.position

            bot.on("chat:targetWhisper", (matches) => {
                const messageTrigger = "Where are you?"
                if (matches[0][0] === commandSender && matches[0][2] == messageTrigger) {
                    bot.chat(`/msg ${commandSender} ${targetPlayer} is at ${playerPosition}`)
                } else if (matches[0][2] == messageTrigger) {
                    bot.chat(`/r That's private info. Sorry.`)
                }
            })
        } catch (error) {
            myConsole.error(error)
        }
    }

    function getBotLocation(commandSender) {
        const botLocation = bot.entity.position
        const botDimension = bot.game.dimension
        bot.chat(`/msg ${commandSender} I am currently at ${botLocation} in dimension ${botDimension}`)
    }
}

module.exports = getPlayerOrBotLocation
