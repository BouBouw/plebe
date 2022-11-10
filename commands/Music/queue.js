const { ApplicationCommandType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js');

module.exports = {
    name: 'queue',
    description: '(🎶) Musique',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    const queue = interaction.client.queue.get(interaction.guild.id);

    if(!queue) return interaction.followUp({ content: `:x: • ${interaction.member}, il n'y a aucune liste de lecture.` })

    const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('preview')
                .setEmoji('⬅️')
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('clear')
                .setEmoji('⏺️')
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('next')
                .setEmoji('➡️')
                .setStyle(ButtonStyle.Secondary)
        )

    interaction.followUp({
        content: `${interaction.member}`,
        embeds: [{
            color: Colors.Blurple,
            title: `Liste de lecture`,
            fields: [
                {
                    name: `▶️ Musique en cours`,
                    value: `> [${queue.songs[0].title}](${queue.songs[0].url})`,
                },
                {
                    name: `⏩ Musique à suivre`,
                    value: `> [x]`
                }
            ],
            footer: {
                text: `1/1`
            }
        }],
        components: [ row ]
    }).then(async (msg) => {
        
    })

    }
}