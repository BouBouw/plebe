const { ActivityType } = require("discord.js");
const colors = require('colors');

module.exports = {
	name: 'ready',
	once: false,
execute: async (client) => {
    await clearCustomChannels();

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

    async function clearCustomChannels() {
        const guild = client.guilds.cache.get('1037033375581614113');
        const category = guild.channels.cache.get('1037470916462002259');

    }
    }
}