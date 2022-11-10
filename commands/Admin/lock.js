const { ApplicationCommandType, PermissionsBitField, Colors, ChannelType } = require('discord.js');

module.exports = {
    name: 'lock',
    description: '(❗) Admin',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })

    interaction.followUp({ content: `✅ • ${interaction.member} vous venez de bloquer tous les salons textuels` }).then(async () => {
        interaction.guild.fetchOwner().then(async (own) => {
            const user = client.users.cache.get(own.user.id);
            user.send({
                embeds: [{
                    color: Colors.Red,
                    title: `Sécurité maximale`,
                    description: `L'envois des messages dans tous les salons de ${interaction.guild.name} vient d'être restreint par ${interaction.member}.`
                }]
            }).then(async () => {
                interaction.guild.channels.cache.forEach(async (channel) => {
                    if(channel.type === ChannelType.GuildText) {
                        channel.permissionOverwrites.set([
                            {
                                id: interaction.guild.roles.everyone,
                                deny: [ PermissionsBitField.Flags.SendMessages ]
                            }
                        ])
                    }

                    if(channel.type === ChannelType.GuildVoice) {
                        channel.members.forEach((member) => {
                            member.voice.disconnect();
                        })

                        setTimeout(async () => {
                            channel.permissionOverwrites.set([
                                {
                                    id: interaction.guild.roles.everyone,
                                    deny: [ PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak ]
                                }
                            ])
                        }, 5000)
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