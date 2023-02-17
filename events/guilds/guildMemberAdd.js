const { Colors } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
execute: async (member, client) => {
    const channel = client.channels.cache.get('1040345093812539403');
    if(!channel) return;
    ScanRaid();

    async function ScanRaid() {
        const state = db.get(`client_${client.user.id}_packages.raid`);

        if(state === 'ON') {
            member.kick({ reason: '[AUTO.] Anti-Raid activé' }).then(async () => {
                try {
                    member.send({ 
                        content: `\`[AUTO.]\` • ${member} l'anti-raid est activé sur le serveur **__${member.guild.name}__**. Patientez quelques instants...`
                    })
                } catch(err) {
                    throw err;
                }
            })
        } else {
            channel.send({
                content: `\`[+]\` ${member} vient de rejoindre l'empire Romain !`
            }).then(async () => {
                await member.roles.add('964326274829021284');
            })
        }
    }

    function Logs() {
        const c = client.channels.cache.get('1076016934669258803');
        c.send({
            embeds: [{
                color: Colors.Green,
                title: `Acceuil > Arrivé`,
                fields: [
                    {
                        name: `${member.user.tag}`,
                        value: `Cet utilisateur vient de rejoindre le serveur.`
                    }
                ]
            }]
        })
    }
    Logs();

    }
}