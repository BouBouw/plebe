const { ChannelType, PermissionsFlagsBit } = require("discord.js");

module.exports = {
	name: 'voiceStateUpdate',
	once: false,
execute: async (oldState, newState, client) => {
    if(!newState.channel) return;

    if(newState.channel.id === '1037471900525416578') {
        const channelParent = newState.guild.channels.cache.get('1037471900525416578');

        await newState.guild.channels.create({
            type: ChannelType.GuildVoice,
            name: `${newState.member.user.username}`,
            parent: channelParent.parent.id,
            //permissionOverwrites: [
            //    {
            //        id: newState.member.user.id,
            //        allow: []
            //    }
            //]
        }).then(async (channel) => {
            newState.setChannel(channel)

            setInterval(async () => {
                if(!oldState.channel) return;

                if(channel.members === 0) {
                    await channel.delete();
                }
            }, 15000)
        })
    }

    }
}