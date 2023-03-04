const { Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

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
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('informations')
                    .setEmoji('💡')
                    .setLabel("Informations sur l'utilisateur")
                    .setStyle(ButtonStyle.Secondary)
            )
        const c = client.channels.cache.get('1076344859369148436');
        c.send({
            embeds: [{
                color: Colors.Yellow,
                title: `Acceuil > Départs`,
                fields: [
                    {
                        name: `${member.user.tag}`,
                        value: `Cet utilisateur vient de quitter le serveur.`
                    },
                    {
                        name: `Identifiant`,
                        value: `${member.user.id}`
                    }
                ]
            }],
            components: [ row ]
        })
    }
    Logs();

    }
}