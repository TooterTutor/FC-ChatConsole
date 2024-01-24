const https = require('https')

function queryServer(bot) {
    bot.on('spawn', () => {
        bot.dashboard.commands.query = (server) => {
            context: {
                description: `Requests how many players are online on a given Minecraft Server.`
                syntax: `:query serverIP`
            }
            query(server)
        }
    })

    function query(url) {
        const server = `https://api.mcsrvstat.us/3/` + url
        https.get(server, res => {

            let rawData = ''

            res.on('data', chunk => {
                rawData += chunk
            })

            res.on('end', () => {
                const parsedData = JSON.parse(rawData)
                const players = parsedData.players
                console.log(players)
            })

        })

    }
}

module.exports = queryServer