const { ChannelType, PermissionsBitField } = require("discord.js");

module.exports = {
	name: 'voiceStateUpdate',
	once: false,
execute: async (oldState, newState, client) => {
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
        })
    }

    }
}