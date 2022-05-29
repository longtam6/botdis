module.exports = {
    name: "ready",
    run: async(bot) => {
        console.log("logged at " + bot.client.user.tag)
    }
}