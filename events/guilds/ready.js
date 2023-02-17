const { ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'ready',
	once: false,
execute: async (client) => {
    await initXP();

    await EconomySystem();

    async function initXP() {
        client.users.cache.forEach(async (user) => {
            let exp = await db.fetch(`guild_964309725757980702_exp_${user.id}`);
            let rank = await db.fetch(`guild_964309725757980702_rank_${user.id}`);

            if(exp === null) {
                await db.set(`guild_964309725757980702_exp_${user.id}`, 1);
                await db.set(`guild_964309725757980702_rank_${user.id}`, 1);
            }

            if(rank === null) {
                await db.set(`guild_964309725757980702_exp_${user.id}`, 1);
                await db.set(`guild_964309725757980702_rank_${user.id}`, 1);
            }
        })
    }

    async function EconomySystem() {
        const channel = client.channels.cache.get('964309725757980705');

        function getTime() {
            let time_init = Math.floor(Math.random() * (24 - 1 + 1) + 1);
            let time = Math.floor(time_init * 3600000);

            channel.send({ content: `\`[⌛]\` Un coffre apparaît dans **${time_init} heure(s)**.` });
            return time;
        }

        let timing = getTime();

        setInterval(async () => {
            const channel = client.channels.cache.get('964309725757980705');

            channel.send({
                embeds: [{
                    color: Colors.Yellow,
                    title: `Un coffre magique !`,
                    description: "Un **coffre magique** vient d'apparaître, cliquez sur le bouton ci-dessous pour le récupérer.",
                    fields: [
                        {
                            name: `Loading...`,
                            value: "Loading...",
                        },
                    ]
                }]
            }).then(async (msg) => {
                const row = await db.get(`client_${client.user.id}_chestId`);

                const random = (length = 8) => {
                    let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                    let str = '';
                    for(let i = 0; i < length; i++) {
                        str += chars.charAt(Math.floor(Math.random() * chars.length))
                    }

                    return str;
                };

                let code = `${random()}`;
                let golds = Math.floor(Math.random() * (650 - 50 + 1) + 1);

                const row_0 = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId(`${code}`)
                        .setLabel(`Ouvrir le coffre.`)
                        .setEmoji('⛏️')
                        .setStyle(ButtonStyle.Secondary)
                )

                msg.edit({
                    embeds: [{
                        color: Colors.Yellow,
                        title: `Un coffre magique !`,
                        fields: [
                            {
                                name: `\u200b`,
                                value: "> **__Butin :__**",
                            },
                            {
                                name: `🪙 Pièces d'or`,
                                value: `${golds}`
                            }
                        ]
                    }],
                    components: [ row_0 ]
                })

                if(!row || row === null) {
                    await db.set(`client_${client.user.id}_chestId`, [`${code}`]);
                } else {
                    await db.push(`client_${client.user.id}_chestId`, code);
                }
            })
            getTime();
        }, timing) // Constante timing pour définir le temps de l'interval
    }

    }
}