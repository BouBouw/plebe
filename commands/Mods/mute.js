const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField } = require('discord.js');
const ms = require('ms');

module.exports = {
    name: 'mute',
    description: '(⚙️) Moderation',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membre',
            description: 'Membre à mute',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
            name: 'temps',
            description: 'Temps du mute',
            type: ApplicationCommandOptionType.String,
            required: true,
        },
        {
            name: "raison",
            description: "Raison du mute",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
execute: async (client, interaction, args) => {
    let reasonValid = '';

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })

    const target = interaction.options.getMember('membre');
    if(target.id === interaction.member.id) return interaction.followUp({ content: `❓ • ${interaction.member} vous ne pouvez pas vous rendre muet.` })
    if(target.isCommunicationDisabled()) return interaction.followUp({ content: `❓ • ${interaction.member} l'utilisateur ${target} est déjà muet.` })

    const time = interaction.options.getString('temps');
    const duration = ms(time);
    if(duration > 2419200000 || duration < 10000) return interaction.followUp({ content: `` })

    const reason = interaction.options.getString("raison");
    if(reason) {
        reasonValid = `${reason}`;
    } else {
        reasonValid = `Aucune raison fournie.`
    }

    target.disableCommunicationUntil(Date.now() + (duration), `${reasonValid}`).then(async () => {
        return interaction.followUp({ content: `✅ • ${interaction.member} l'utilisateur ${target} (\`${target.id}\`) vient d'être rendu muet.` })
    })

    }
}