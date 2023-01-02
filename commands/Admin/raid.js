const { ApplicationCommandType, PermissionsBitField, Colors, ChannelType } = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'raid',
    description: '(❗) Admin',
    type: ApplicationCommandType.ChatInput,
execute: async (client, interaction, args) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.followUp({ content: `❗️ • ${interaction.member} vous n'avez pas la permission d'utiliser cette commande.` })

    const state = db.get(`client_${client.user.id}_packages.raid`);
    if(state === 'ON') {
        interaction.followUp({
            embeds: [{
                color: Colors.Yellow,
                title: 'Anti-Raid',
                fields: [
                    {
                        name: `[🟡] Statut`,
                        value: `L'anti-raid est en cours de désactivation.`
                    }
                ]
            }]
        }).then(async (msg) => {
            await db.set(`client_${client.user.id}_packages.raid`, 'OFF');

            async function ResetChannels() {
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
            ResetChannels();

            setTimeout(async () => {
                msg.edit({
                    embeds: [{
                        color: Colors.Red,
                        title: 'Anti-Raid',
                        fields: [
                            {
                                name: `[🔴] Statut`,
                                value: `L'anti-raid est désormais désactiver.`
                            }
                        ]
                    }]
                })
            }, 3000)
        })
    } else {
        interaction.followUp({
            embeds: [{
                color: Colors.Yellow,
                title: 'Anti-Raid',
                fields: [
                    {
                        name: `[🟡] Statut`,
                        value: `L'anti-raid est en cours d'activation.`
                    }
                ]
            }]
        }).then(async (msg) => {
            await db.set(`client_${client.user.id}_packages.raid`, 'ON');

            async function ClearChannels() {
                interaction.channel.send({ content: `✅ • ${interaction.member} vous venez de bloquer tous les salons textuels` }).then(async () => {
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
            ClearChannels();

            setTimeout(async () => {
                msg.edit({
                    embeds: [{
                        color: Colors.Green,
                        title: 'Anti-Raid',
                        fields: [
                            {
                                name: `[🟢] Statut`,
                                value: `L'anti-raid est désormais activer.`
                            }
                        ]
                    }]
                })
            }, 3000)
        })
    }
    }
}