const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js')

module.exports = {
    name: 'ban',
    description: '(⛔) Modération',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membre',
            description: 'Membre à ban',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'raison',
            description: 'Raison du ban',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
execute: async (client, interaction, args) => {
    let reasonValid = '';

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })

    const target = interaction.options.getMember('membre');
    if(target.id === interaction.member.id) return interaction.followUp({ content: `❓ • ${interaction.member} vous ne pouvez pas vous ban.` })

    const reason = interaction.options.getString("raison");
    if(reason) {
        reasonValid = `${reason}`;
    } else {
        reasonValid = `Aucune raison fournie.`
    }

    await target.ban({ reason: reasonValid }).then(async () => {
        interaction.followUp({ content: `\`[✅]\` ${interaction.member}, l'utilisateur ${target} (\`${target.id}\`) vient d'être bannît` });
    })
    .catch((err) => {

    })
    }
}