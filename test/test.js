module.exports = (bot) => {
    bot
    .command("test", async ctx => {
        const sortedUsers = ctx.users.sort("is_admin")
        console.log(sortedUsers)
    })
}