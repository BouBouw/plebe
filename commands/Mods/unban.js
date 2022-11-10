const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'unban',
    description: '(⛔) Moderation',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'id',
            description: 'ID',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
    ],
execute: async (client, interaction, args) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })

    const target = interaction.options.getNumber('id');
    interaction.guild.members.unban(target).then(async () => {
        interaction.followUp({ content: `\`[✅]\` ${interaction.member}, l'utilisateur ${client.members.cache.get(target)} (\`${target}\`) vient d'être débanni.` })
    })
    .catch((err) => {
        interaction.followUp({ content: `\`[❌]\` ${interaction.member}, l'utilisateur ${client.members.cache.get(target)} (\`${target}\`) n'est pas banni ou introuvable.` })
    })
    }
}