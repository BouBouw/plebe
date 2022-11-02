const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js')

module.exports = {
    name: 'clear',
    description: '(⚙️) Modération',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "nombre",
            description: "Nombre de messages",
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ],
execute: async (client, interaction, args) => {
    const count = interaction.options.getNumber("nombre");

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })

    if(isNaN(count) && !Number(count) || Number(count) > 99) return interaction.followUp({ content: `❓ • ${interaction.member} le nombre fournit n'est pas valide.` })

    await interaction.channel.bulkDelete(Math.floor(count + 1), true).then(async () => {
        return interaction.channel.send({ content: `✅ • ${interaction.member} vous venez de supprimer **${count} messages**.` });
    })
    }
}