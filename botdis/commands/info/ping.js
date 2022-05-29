module.exports = {
    name: "ping",
    category: "info",
    run: async ({client, message, args}) => {
        message.reply("Pong!")
    }
}