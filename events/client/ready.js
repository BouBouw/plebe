const { ActivityType } = require("discord.js");
const colors = require('colors');

module.exports = {
	name: 'ready',
	once: false,
execute: async (client) => {
    // await sendMessageDiscord();

    async function sendMessageDiscord() {
        client.channels.cache.get('964309725757980705').send({
            content: `\`[📡]\` Les interférences m'ont fait perdre signal avec les satellites de Discord. **Merci de patienter...**`
        }).then(async (msg) => {
            setTimeout(async () => {
                msg.edit({
                    content: `\`[📡]\` L'antenne détecte à nouveau les satellites de Discord. **Je suis à nouveau opérationnel !**`
                })
            }, 10000)
        }).catch(() => { return; })
    }

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