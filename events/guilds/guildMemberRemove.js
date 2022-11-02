module.exports = {
	name: 'guildMemberRemove',
	once: false,
execute: async (member, client) => {
    const channel = client.channels.cache.get('1037468006072193105');
    if(!channel) return;

    channel.send({
        content: `\`[-]\` ${member} vient de quiiter l'empire Romain !`
    })

    }
}