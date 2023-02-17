const { ApplicationCommandType, Colors } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'snipe',
    description: '(🧭) Divers',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    const msg = await db.get(`snipe_${client.user.id}`);

    interaction.followUp({
        embeds: [{
            color: Colors.Blue,
            title: 'Dernier message supprimer',
            fields: [
                {
                    name: `${interaction.guild.members.cache.get(msg[0]).user.tag}`,
                    value: `> ${msg[1]}`
                }
            ]
        }]
    })
    }
}