module.exports = {
	name: 'guildMemberAdd',
	once: false,
execute: async (member, client) => {
    const channel = client.channels.cache.get('1037468006072193105');
    if(!channel) return;

    channel.send({
        content: `\`[+]\` ${member} vient de rejoindre l'empire Romain !`
    })

    }
}