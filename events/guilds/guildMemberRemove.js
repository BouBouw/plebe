module.exports = {
	name: 'guildMemberRemove',
	once: false,
execute: async (member, client) => {
    const channel = client.channels.cache.get('1040345093812539403');
    if(!channel) return;

    channel.send({
        content: `\`[-]\` ${member} vient de quitter l'empire Romain !`
    })

    function Logs() {
        const c = client.channels.cache.get('1076016934669258803');
        c.send({
            embeds: [{
                color: Colors.Red,
                title: `Acceuil > Départs`,
                fields: [
                    {
                        name: `${member.user.tag}`,
                        value: `Cet utilisateur vient de quitter le serveur.`
                    }
                ]
            }]
        })
    }
    Logs();

    }
}