const { ActivityType } = require("discord.js");
const colors = require('colors');

module.exports = {
	name: 'ready',
	once: false,
execute: async (client) => {
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