const fs = require('fs')

function autoTp(bot) {
    const teleportRegEx = /\[Teleport Request\] \[\w+\] \b([\w]{3,16}\b(?!\])) \[Accept\]/
    // [Teleport Request] [Rank] Username [Accept]
    bot.on(`spawn`, () => {
        bot.addChatPattern(`tpRegEx`, teleportRegEx, { repeat: true, parse: true })
    })

    bot.on('chat:tpRegEx', async (matches) => {
        // Extract player name from the correct match group (index 1):
        const playerName = matches[0][0]

        console.log(`PlayerName: ${playerName}`)

        if (await checkWhitelist(playerName)) {
            // Player is whitelisted. Accept Teleport Request.
            console.log(`Accepting Teleport from ${playerName}`)
            bot.chat(`/msg ${playerName} You are cleared for Teleport. Accepting now.`)
            bot.chat(`/tp ${playerName} accept`)
        } else {
            // Player is not whitelisted. Deny Teleport Request.
            // bot.chat(`/msg ${playerName} Sorry. I can't accept right now.`)
            console.log(`${playerName} is not whitelisted for teleports.`)
        }
    })

    async function checkWhitelist(playerName) {
        try {
            const whitelist = await fs.promises.readFile('modules/whitelist.json')
            const whitelistData = JSON.parse(whitelist)

            if (whitelistData.includes(playerName)) {
                return whitelistData.includes(playerName)
            }
            else return false

        } catch (err) {
            console.error('Error reading whitelist:', err)
            // Handle errors gracefully, potentially assuming a default deny behavior
            return false // Deny by default in case of errors
        }
    }
}

module.exports = autoTp
