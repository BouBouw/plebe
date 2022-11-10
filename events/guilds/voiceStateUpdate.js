const { ChannelType, PermissionsBitField } = require("discord.js");
const db = require('quick.db');

module.exports = {
	name: 'voiceStateUpdate',
	once: false,
execute: async (oldState, newState, client) => {
    if(!newState.channel) {
        const voicesList = db.get(`client_${client.user.id}_voiceList`)
        if(!voicesList) {
            return;
        } else {
            if(voicesList.includes(oldState.channel.id)) {
                const filtered = voicesList.filter(id => id !== oldState.channel.id);
                db.set(`client_${client.user.id}_voiceList`, filtered)
                if(oldState.channel.members.size <= 0) await oldState.channel.delete()
            }
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