const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js')

module.exports = {
    name: 'kick',
    description: '(⛔) Modération',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membre',
            description: 'Membre à kick',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'raison',
            description: 'Raison du kick',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],
execute: async (client, interaction, args) => {
    let reasonValid = '';

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })

    const target = interaction.options.getMember('membre');
    if(target.id === interaction.member.id) return interaction.followUp({ content: `❓ • ${interaction.member} vous ne pouvez pas vous kick.` })

    const reason = interaction.options.getString("raison");
    if(reason) {
        reasonValid = `${reason}`;
    } else {
        reasonValid = `Aucune raison fournie.`
    }

    await target.kick({ reason: reasonValid }).then(async () => {
        interaction.followUp({ content: `\`[✅]\` ${interaction.member}, l'utilisateur ${target} (\`${target.id}\`) vient d'être expulser` });
    })
    .catch((err) => {

    })
    }
}