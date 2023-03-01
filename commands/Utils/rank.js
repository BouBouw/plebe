const { ApplicationCommandType, ApplicationCommandOptionType, Colors } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'rank',
    description: '(🧭) Divers',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membre',
            description: 'membre à voir son profil',
            type: ApplicationCommandOptionType.User,
            required: false,
        },
    ],
execute: async (client, interaction, args) => {
    const target = interaction.options.getMember('membre');
    if(target) {
        let exp = await db.fetch(`guild_${interaction.guild.id}_exp_${target.user.id}`) || 0;
        let rank = await db.fetch(`guild_${interaction.guild.id}_rank_${target.user.id}`) || 0;

        interaction.followUp({
            embeds: [{
                color: Colors.Green,
                fields: [
                    {
                        name: `Niveau(x) :`,
                        value: `\`${rank}\``,
                        inline: true
                    },
                    {
                        name: `Expérience(s) :`,
                        value: `\`${exp}\``,
                        inline: true
                    }
                ]
            }]
        })
    } else {
        let exp = await db.fetch(`guild_${interaction.guild.id}_exp_${interaction.member.id}`) || 0;
        let rank = await db.fetch(`guild_${interaction.guild.id}_rank_${interaction.member.id}`) || 0;

        interaction.followUp({
            embeds: [{
                color: Colors.Green,
                fields: [
                    {
                        name: `Niveau(x) :`,
                        value: `\`${rank}\``,
                        inline: true
                    },
                    {
                        name: `Expérience(s) :`,
                        value: `\`${exp}\``,
                        inline: true
                    }
                ]
            }]
        })
    }
    
    }
}