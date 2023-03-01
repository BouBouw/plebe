const { ApplicationCommandType, PermissionsBitField, Colors, ChannelType } = require('discord.js');

module.exports = {
    name: 'unlock',
    description: '(❗) Admin',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })

    interaction.followUp({ content: `✅ • ${interaction.member} vous venez de débloquer tous les salons textuels` }).then(async () => {
        interaction.guild.fetchOwner().then(async (own) => {
            const user = client.users.cache.get(own.user.id);
            user.send({
                embeds: [{
                    color: Colors.Red,
                    title: `Sécurité minimum`,
                    description: `L'envois des messages dans tous les salons de ${interaction.guild.name} vient d'être remis à la normal par ${interaction.member}.`
                }]
            }).then(async () => {
                interaction.guild.channels.cache.forEach(async (channel) => {
                    if(channel.type === ChannelType.GuildText) {
                        channel.lockPermissions();
                    }

                    if(channel.type === ChannelType.GuildVoice) {
                        channel.lockPermissions();
                    }
                })
            })
            .catch((err) => {
                console.log('cannot send message to this user.')
            })
            
        });
    })
    }
}