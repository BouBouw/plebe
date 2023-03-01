const { ChannelType, PermissionsBitField, Colors } = require("discord.js");
const db = require('quick.db');

module.exports = {
	name: 'voiceStateUpdate',
	once: false,
execute: async (oldState, newState, client) => {
    await customVoices();
    await systemCoins();
    await systemTime();

    await sendLogs();

    async function customVoices() {
        if(!newState.channel) {
            const voicesList = db.get(`client_${client.user.id}_voiceList`);
            if(!voicesList || voicesList === null) {
                return;
            } else {
                 try {
                    if(voicesList.includes(oldState.channel.id)) {
                        if(oldState.channel.members.size <= 0) {
                            const filtered = voicesList.filter(id => id !== oldState.channel.id);
                            db.set(`client_${client.user.id}_voiceList`, filtered)
                            await oldState.channel.delete();
                        }
                    }
                 } catch(err) {
                    console.log(err);
                 }
            }
        } else {
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
            } else {
                const voicesList = db.get(`client_${client.user.id}_voiceList`);
                if(!voicesList || voicesList === null) return;
                try {
                    if(voicesList.includes(oldState.channel.id)) {
                        if(oldState.channel.members.size <= 0) {
                            const filtered = voicesList.filter(id => id !== oldState.channel.id);
                            db.set(`client_${client.user.id}_voiceList`, filtered)
                            await oldState.channel.delete();
                        }
                    }
                 } catch(err) {
                    return;
                 }
            }
        }
    }

    async function systemCoins() {
        const interval = setInterval(checkVoice, 60000);
        
        function checkVoice() {
            if(!newState.channel) {
                clearInterval(interval);
            }
    
            if(newState.channel) {
                const row = db.get(`guild_${newState.guild.id}_${newState.member.id}.ressources`);
                if(!row || row === null) {
                    db.set(`guild_${newState.guild.id}_${newState.member.id}.ressources`, [`100`, '0', '0']);
                } else {
                    row[0] = Math.floor(row[0] + 100);

                    db.set(`guild_${newState.guild.id}_${newState.member.id}.ressources`, row);
                }
            }
        }
    }

    async function systemTime() {
        const interval_ = setInterval(checkTime, 30000);

        function checkTime() {
            if(!newState.channel) {
                clearInterval(interval_);
            }

            if(newState.channel) {
                const row = db.get(`guild_${newState.guild.id}_${newState.member.id}.voice_time`);
                if(!row || row === null) {
                    db.set(`guild_${newState.guild.id}_${newState.member.id}.voice_time`, 30000);
                } else {
                    db.add(`guild_${newState.guild.id}_${newState.member.id}.voice_time`, 30000)
                }
            }
        }
    }

    async function sendLogs() {
        const channel = await client.channels.cache.get('1076344859369148436');

        if(!oldState.channel && newState.channel) {
            return channel.send({
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
                if(!newState.member.roles.cache.has('1076555488675774586')) {
                    await newState.member.roles.add('1076555488675774586');
                }
            })
        };

        if(oldState.channel && newState.channel) {
            // console.log(newState);
            if(newState.streaming === true && oldState.streaming === false) {
                return channel.send({
                    embeds: [{
                        color: Colors.Blue,
                        title: `Vocal > Streaming`,
                        fields: [
                            {
                                name: `${newState.member.user.tag}`,
                                value: `Cet utilisateur vient de démarrer un streaming dans ${newState.channel}.`
                            }
                        ]
                    }]
                })
            } else if(newState.streaming === false && oldState.streaming === true) {
                return channel.send({
                    embeds: [{
                        color: Colors.Blue,
                        title: `Vocal > Streaming`,
                        fields: [
                            {
                                name: `${newState.member.user.tag}`,
                                value: `Cet utilisateur vient de stopper un streaming dans ${newState.channel}.`
                            }
                        ]
                    }]
                })
            }

            if(newState.selfVideo === true && oldState.selfVideo === false) {
                return channel.send({
                    embeds: [{
                        color: Colors.Blue,
                        title: `Vocal > Video`,
                        fields: [
                            {
                                name: `${newState.member.user.tag}`,
                                value: `Cet utilisateur vient d'activer sa caméra dans ${newState.channel}.`
                            }
                        ]
                    }]
                })
            } else if(newState.selfVideo === false && oldState.selfVideo === true) {
                return channel.send({
                    embeds: [{
                        color: Colors.Blue,
                        title: `Vocal > Video`,
                        fields: [
                            {
                                name: `${newState.member.user.tag}`,
                                value: `Cet utilisateur vient de désactiver sa caméra dans ${newState.channel}.`
                            }
                        ]
                    }]
                })
            }

            if(oldState.channel.id === newState.channel.id) return;
            return channel.send({
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
        };

        if(oldState.channel && !newState.channel) {
            return channel.send({
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
                if(oldState.member.roles.cache.has('1076555488675774586')) {
                    await oldState.member.roles.remove('1076555488675774586');
                }
            })
        };
    }

    }
}