module.exports = {
	name: 'guildMemberRemove',
	once: false,
execute: async (member, client) => {
    const channel = client.channels.cache.get('1040345093812539403');
    if(!channel) return;

    channel.send({
        content: `\`[-]\` ${member} vient de quitter l'empire Romain !`
    })

    }
}