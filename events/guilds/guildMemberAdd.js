const { Colors } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'guildMemberAdd',
	once: false,
execute: async (member, client) => {
    const channel = client.channels.cache.get('1040345093812539403');
    if(!channel) return;

    await ScanRaid();

    await AventureTips();

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
        const c = client.channels.cache.get('1076344859369148436');
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

    async function AventureTips() {
        try {
            const user = client.users.cache.get(member.id);

            user.send({
                content: `${member}`,
                embeds: [{
                    color: Colors.Gold,
                    title: `${member.guild.name} > Aventure :`,
                    description: `Bonjour et **bienvenue** sur ${member.guild.name} ! 👋\n> Je suis un **__message automatique__** afin de vous expliquer le module \`aventure\` du serveur.`,
                    fields: [
                        {
                            name: `F.A.Q :`,
                            value: `**1. Qu'est ce que l'aventure ?**\n> L'aventure est un module afin de rajouter une économie au serveur et ainsi ajouter de l'activité. C'est un jeu unique au serveur développer par la modération & l'administration.\n\n**2. Comment démarrer son aventure ?**\n> Pour démarrer son aventure, rien de plus simple. Des **coffres magiques** apparaissent dans le général vous permettant de gagner différentes ressources pour démarrer son aventure sur le serveur.\n\n**3. Ou trouver les explications des commandes d'aventure ?**\n> Un salon vous est mis à disposition oû est répertoriée toutes les commandes d'aventure et les explications de celles-ci. ( ${client.channels.cache.get('1066746594873069648')} )`
                        }
                    ]
                }]
            })
        } catch(err) {
            return;
        }
    }

    }
}