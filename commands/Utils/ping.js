const { ApplicationCommandType } = require('discord.js')

module.exports = {
    name: 'ping',
    description: '(🧭) Divers',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    interaction.followUp({ content: `${interaction.member} pong! 🏓` })
    }
}