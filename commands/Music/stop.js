const { ApplicationCommandType, Colors } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

module.exports = {
    name: 'stop',
    description: '(🎶) Musique',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    const serverQueue = interaction.client.queue.get(interaction.guild.id);
    const { channel } = interaction.member.voice;

    if(!channel) return interaction.followUp({ content: `❓ • ${interaction.member} vous devez être dans un salon vocal.` });
    if(serverQueue && serverQueue.connection.joinConfig.channelId !== interaction.member.voice.channelId) return interaction.followUp({ content: `:x: • ${interaction.member}, je suis déjà en train de jouer dans un autre salon.` })

    const connection = joinVoiceChannel({
        channelId: channel.id,
        guildId: channel.guild.id,
        adapterCreator: channel.guild.voiceAdapterCreator,
    });

    await connection.destroy();
    await interaction.client.queue.delete(interaction.guild.id);

    interaction.followUp({
        content: `${interaction.member}`,
        embeds: [{
            color: Colors.Blurple,
            title: `⏹️ Arrêt`,
            description: `La musique vient d'être arretée.`
        }]
    })

    }
}