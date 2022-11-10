const { ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js')

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

    } else {

    }
    
    }
}