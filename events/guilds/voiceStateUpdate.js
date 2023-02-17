const { ChannelType, PermissionsBitField, Colors } = require("discord.js");
const db = require('quick.db');

module.exports = {
	name: 'voiceStateUpdate',
	once: false,
execute: async (oldState, newState, client) => {
    const channel = await client.channels.cache.get('1076016934669258803');

    if(!newState.channel) {
        channel.send({
            embeds: [{
                color: Colors.Red,
                title: `Vocal > Déconnexion`,
                fields: [
                    {
                        name: `${oldState.member.user.tag}`,
                        value: `Cet utilisateur vient de ce déconnecter du salon ${oldState.channel}.`
                    }
                ]
            }]
        }).then(async () => {
            // save disconnect date
        })

        const voicesList = db.get(`client_${client.user.id}_voiceList`);
        console.log(oldState.channel.id);
        if(!voicesList || voicesList === null) {
            return;
        } else {
            if(oldState.channel.members.size <= 0) {
                if(voicesList.includes(oldState.channel.id)) {
                    const filtered = voicesList.filter(id => id !== oldState.channel.id);
                    db.set(`client_${client.user.id}_voiceList`, filtered)
                    await oldState.channel.delete();
                }
            }
        }
    }

    if(newState.channel) {
        if(oldState.channel && newState.channel) {
            channel.send({
                embeds: [{
                    color: Colors.Orange,
                    title: `Vocal > Déplacement`,
                    fields: [
                        {
                            name: `${newState.member.user.tag}`,
                            value: `Cet utilisateur vient de ce déplacer du salon ${oldState.channel} à ${newState.channel}.`
                        }
                    ]
                }]
            })
        } else {
            channel.send({
                embeds: [{
                    color: Colors.Green,
                    title: `Vocal > Connexion`,
                    fields: [
                        {
                            name: `${newState.member.user.tag}`,
                            value: `Cet utilisateur vient de ce connecter au salon ${newState.channel}.`
                        }
                    ]
                }]
            }).then(async () => {
                // save conection date
            })
        }
    }

    if(!newState.channel) return;
    if(newState.channel.id === '1040348599638310954') {
        const channelParent = newState.guild.channels.cache.get('1040348599638310954');

        await newState.guild.channels.create({
            type: ChannelType.GuildVoice,
            name: `${newState.member.user.username}`,
            parent: channelParent.parent.id,
            permissionOverwrites: [
                {
                    id: newState.member.user.id,
                    allow: [ PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.Connect, PermissionsBitField.Flags.Speak, PermissionsBitField.Flags.Stream, PermissionsBitField.Flags.PrioritySpeaker ]
                }
            ],
            userLimit: 1
        }).then(async (channel) => {
            newState.setChannel(channel);

            setInterval(async () => {
                if(channel.members === 0) {
                    await channel.delete();
                }
            }, 15000)

            const voicesList = db.get(`client_${client.user.id}_voiceList`)
            if(voicesList === null && !voicesList) {
                await db.set(`client_${client.user.id}_voiceList`, ['null'])
                await db.push(`client_${client.user.id}_voiceList`, channel.id)
            } else {
                await db.push(`client_${client.user.id}_voiceList`, channel.id)
            }
        })
    }

    }
}