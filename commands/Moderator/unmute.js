const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'unmute',
    description: '(⛔) Moderation',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membre',
            description: 'Membre à unmute',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
execute: async (client, interaction, args) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })

    const target = interaction.options.getMember('membre');
    if(target.id === interaction.member.id) return interaction.followUp({ content: `❓ • ${interaction.member} vous ne pouvez pas vous rendre la parole.` })

    target.timeout(null).then(async () => {
        interaction.followUp({ content: `✅ • ${interaction.member} l'utilisateur ${target} (\`${target.id}\`) n'est plus muet.` })
    })

    }
}