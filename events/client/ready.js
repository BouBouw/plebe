const { ActivityType } = require("discord.js");
const colors = require('colors');

module.exports = {
	name: 'ready',
	once: false,
execute: async (client) => {
    // await sendMessageDiscord();

    async function sendMessageDiscord() {
        const guild = await client.guilds.cache.get('964309725757980702')
        const target = await guild.members.cache.get('853261887520505866');
        target.roles.remove('964310022400135219')
    }
    sendMessageDiscord();

    console.log('[!]'.bold.green + ' Connecté à Discord.'.bold.white);

    client.user.setPresence({
        activities: [
            {
                name: `👀 Vous surveille`,
                type: ActivityType.Watching
            }
        ],
        status: "idle"
    })
    }
}