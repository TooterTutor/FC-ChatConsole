const mineflayer = require('mineflayer')
const fs = require('node:fs')
const path = require('node:path')

const output = fs.createWriteStream('logs/chatlog-T.log')
const errors = fs.createWriteStream('logs/chaterrors-T.log')
const myConsole = new console.Console(output, errors)

require('console-stamp')(myConsole, {
    stdout: output,
    stderr: errors,
    format: ':date(HH:MM:ss)'
})

var defaultRegEx = new RegExp("[^$]+")

if (process.argv.length > 4) {
    console.log('Usage : node example.js [<host>] [<port>]')
    process.exit(1)
}

const userCredentials = fs.readFileSync("credentials/credentials-T.json")
const mcAuth = JSON.parse(userCredentials)

const bot = mineflayer.createBot({
    host: process.argv[2] || "",
    port: parseInt(process.argv[3]) || "",
    username: mcAuth.login,
    password: mcAuth.password,
    auth: "microsoft",
    version: '1.20.1',
    hideErrors: false,
    defaultChatPatterns: true
})

bot.once('inject_allowed', () => {
    global.console.log = bot.dashboard.log
    global.console.error = myConsole.error
})

bot.loadPlugin(require('mineflayer-dashboard')({
    chatPattern: defaultRegEx
}))

const modulePath = path.join(__dirname, 'modules')
const moduleFiles = fs.readdirSync(modulePath).filter(file => file.endsWith('.js'))

for (const file of moduleFiles) {
    const filePath = path.join(modulePath, file)
    const command = require(filePath)
    command(bot)
}

bot.on("message", (jsonMsg) => {
    myConsole.log(`${jsonMsg}`)
})