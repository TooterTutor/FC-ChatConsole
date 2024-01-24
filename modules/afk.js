var interval = undefined
// RegEx below checks for a private message sent to the bot.
// var whisperRegEx = /(?:\[[^\[\]]*\]) (\w+) -> (?:\[[^\[\]]*\]) (\w+) (.+)/

function afkInit(bot) {
    bot.once("spawn", () => {
        bot.dashboard.commands.afk = (recipient, time, active) => {
            context: {
                description: `Set a timer of a configurable delay in minutes to send a message to prevent being kicked for afking.`
                syntax: `:afk <username> <time>`
            }
            afkCommand(recipient, time, active)
        }
    })

    function afkCommand(recipient, time, active) {
        if (active == `true`) {
            console.log(`Anti-AFK has been enabled. ${recipient} will be sent a message every ${time} minutes to prevent being kicked from the server and being flagged as AFK.`)
            if (interval !== undefined) {
                clearInterval(interval)
            }
            interval = setInterval(() => {
                bot.chat(`/msg ${recipient} Anti-AFK timer finished. Restarting timer.`)
            }, time * 60000)
        }
        else if (active == `false`) {
            console.log(`Anti-AFK has been disabled. ${recipient} will no longer be sent messages.`)
            bot.chat(`/msg ${recipient} Anti-AFK timer disabled.`)
            clearInterval(interval)

        }
    }
}

module.exports = afkInit