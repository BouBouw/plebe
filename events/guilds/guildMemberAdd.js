module.exports = {
	name: 'guildMemberAdd',
	once: false,
execute: async (member, client) => {
    const channel = client.channels.cache.get('1040345093812539403');
    if(!channel) return;

    channel.send({
        content: `\`[+]\` ${member} vient de rejoindre l'empire Romain !`
    }).then(async () => {
        await member.roles.add('964326274829021284');
    })

    }
}