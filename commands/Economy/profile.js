const { ApplicationCommandType, Colors } = require('discord.js');
const db = require('quick.db');
const ms = require('pretty-ms');

module.exports = {
    name: 'profile',
    description: '(🪙) Economie',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    const gold = db.get(`guild_${interaction.guild.id}_${interaction.member.id}.golds`) || 0;
    
    const voiceTime = db.get(`guild_${interaction.guild.id}_${interaction.member.id}.voice_time`) || 0;
    let time = ms(voiceTime);

    const msgCount = db.get(`guild_${interaction.guild.id}_${interaction.member.id}.msg_count`) || 0;

    return interaction.followUp({
        content: `${interaction.member}, `,
        embeds: [{
            color: Colors.Green,
            title: `Votre profil > ${interaction.user.tag}`,
            thumbnail: {
                url: `${interaction.user.displayAvatarURL({ dynamic: true })}`
            },
            fields: [
                {
                    name: `\u200B`,
                    value: `> \`[📊]\` **__Statistiques :__**`
                },
                {
                    name: `Activité vocale`,
                    value: `\`${time}\``
                },
                {
                    name: `Activité textuelle`,
                    value: `\`${Number(msgCount)}\``
                },
                {
                    name: `\u200B`,
                    value: `> \`[🪙]\` **__Economie :__**`
                },
                {
                    name: `Argent ( Coins )`,
                    value: `\`${Number(gold)}\``
                },
                {
                    name: `Quêtes`,
                    value: `\`?/?\``
                }
            ]
        }]
    })
    }
}