function readPlayers(bot) {
    bot.once("spawn", () => {
        bot.dashboard.commands.listPlayers = (listType) => {
            context: {
                description: `Lists players currently online. Can be either the current number of online players (list), or the usernames of everyone online (map).`
                syntax: `:listPlayers <map|list>`
            }
            listPlayers(listType)
        }
    })

    function listPlayers(type) {
        const listed = Object.keys(bot.players).length
        const sayPlayers = Object.keys(bot.players).join(", ")
        // const afkPlayers = Object.keys(bot.players[player].displayName)

        if (type == `list`) {
            console.log(`${listed} Players are currently online`)
        }
        else if (type == `map`) {
            console.log(`${sayPlayers}`)
        }
        // else if (type == `areAfk`) {
        //     console.log(`${afkPlayers}`)
        // }
    }
}

module.exports = readPlayers