const { ApplicationCommandType, ApplicationCommandOptionType, Colors } = require('discord.js');
const { inspect } = require('util');

module.exports = {
    name: 'eval',
    description: '(💞) Developers',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'args',
            description: 'Argument à évaluer',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
execute: async (client, interaction, args) => {
    if(interaction.member.id !== '853261887520505866') return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })
    const arg = interaction.options.getString('args');

    let evaled;
    try {
        evaled = await eval(arg);
        interaction.followUp({ 
            embeds: [{
                color: Colors.Blurple,
                title: `Succès`,
                fields: [
                    {
                        name: `Entrée`,
                        value: `\`\`\`js\n${arg}\n\`\`\``,
                    },
                    {
                        name: `Sortie`,
                        value: `\`\`\`js\n${inspect(evaled)}\n\`\`\``,  
                    }
                ]
            }]
        })
    } catch(err) {
        interaction.followUp({ 
            embeds: [{
                color: Colors.Red,
                title: `Erreur`,
                fields: [
                    {
                        name: `Entrée`,
                        value: `\`\`\`js\n${arg}\n\`\`\``,
                    },
                    {
                        name: `Sortie`,
                        value: `\`\`\`js\nundefined\n\`\`\``,  
                    }
                ]
            }]
        })
    }
    }
}