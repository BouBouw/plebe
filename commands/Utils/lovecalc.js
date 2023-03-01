const { ApplicationCommandType, ApplicationCommandOptionType, Colors } = require('discord.js');

module.exports = {
    name: 'lovecalc',
    description: '(🧭) Divers',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membre',
            description: 'Membre a calculer le taux d\'amour.',
            type: ApplicationCommandOptionType.User,
            required: true,
        }
    ],
execute: async (client, interaction, args) => {
    const target = interaction.options.getMember('membre');

    const randomInt = Math.floor(Math.random() * 100) + 1;
    return interaction.followUp({
        embeds: [{
            color: Colors.Green,
            description: `${interaction.member}, vous avez **${randomInt}%** d'amour avec ${target}.`,
        }]
    })

    }
}