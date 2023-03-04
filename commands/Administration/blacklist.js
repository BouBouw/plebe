const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'blacklist',
    description: '(❗) Admin',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'type',
            description: "Le type d'interaction avec la commande",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: `Add`,
                    value: `add`
                },
                {
                    name: `Remove`,
                    value: `remove`
                },
                {
                    name: `List`,
                    value: `list`
                },
                {
                    name: `Reset`,
                    value: `reset`
                }
            ]
        },
        {
            name: 'input',
            description: 'x',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
execute: async (client, interaction, args) => {
    const type = interaction.options.getString("type");
    const input = interaction.options.getString('input');

    if(!input) {
        switch(type) {
            case 'reset': {
                const array = await db.get(`blacklist_${interaction.guild.id}.bl_users`);
                if(!array || array === null) {
                    interaction.followUp({ content: `\`[❌]\` ${interaction.member} aucune personne dans la liste noire.` })
                } else {
                    array.forEach(async (id) => {
                        await interaction.guild.members.unban(id);
                    })

                    return interaction.followUp({
                        content: `\`[✅]\` ${interaction.member} la liste noire vient d'être réinitialisée.`
                    }).then(async () => {
                        await db.delete(`blacklist_${interaction.guild.id}.bl_users`);
                    })
                }
                break;
            }
        }
    } else {

    }

    }
}