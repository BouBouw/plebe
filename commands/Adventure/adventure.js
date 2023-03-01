const { ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, ButtonStyle, Colors } = require('discord.js');
const db = require('quick.db');
const ms = require("parse-ms");

module.exports = {
    name: 'adventure',
    description: '(🗺️) Aventure',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'type',
            description: "Le type d'interaction avec la commande",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'Profile',
                    value: 'profile'
                },
                {
                    name: 'Jobs',
                    value: 'jobs'
                },
                {
                    name: 'Boutique',
                    value: 'shop'
                },
                {
                    name: 'Trade',
                    value: 'trade'
                },
                {
                    name: 'Construction',
                    value: 'construct'
                },
                {
                    name: 'Navigation',
                    value: 'navigation'
                },
                {
                    name: 'Spawn',
                    value: 'spawn'
                }
            ]
        },
        {
            name: 'input',
            description: 'x',
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
execute: async (client, interaction, args) => {
    const type = interaction.options.getString("type");
    const input = interaction.options.getString('input');

    if(!input) {
        switch(type) {
            case 'construct': {
                interaction.followUp({
                    content: `${interaction.member}`,
                    embeds: [{
                        color: Colors.Green,
                        title: `Aventure > Construction`,
                        description: `Que voulez-vous construire ?`,
                        fields: [
                            {
                                name: "Déplacement :",
                                value: "> ⛵ **Bateau** [`boat`]"
                            }
                        ]
                    }]
                }).then(async (msg) => {
    
                })
                break;
            }

            case 'navigation': {
                interaction.followUp({
                    content: `${interaction.member}`,
                    embeds: [{
                        color: Colors.Green,
                        title: `Aventure > Navigation`,
                        description: `Ou voulez-vous naviguer ?`,
                        fields: [
                            {
                                name: "Les îles disponibles :",
                                value: "> `Utopia`; `Avalon`; `Baltia`; `Brittia`; `Alcatraz`; `Pyrallis`"
                            }
                        ]
                    }]
                }).then(async (msg) => {
    
                })
                break;
            }

            case 'profile': {
                let ressources = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                let tools = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.tools`);
                let jobs = await db.get(`guild_${interaction.guild.id}_${interaction.member.id}.jobs`);
                let islands = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.islands`);
                let current_island = await db.get(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`);

                let data = await db.get(`guild_${interaction.guild.id}_${interaction.member.id}.adv.data`);

                if(!data || data == null) {
                    await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.adv.data`, ['100', '100', '0']);
                    
                    interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vos données de profile sont en chargement.. Merci de patienter.` }).then(async (msg) => {
                        setTimeout(async () => {
                            let new_data = await db.get(`guild_${interaction.guild.id}_${interaction.member.id}.adv.data`);

                            msg.edit({
                                content: `${interaction.member}`,
                                embeds: [{
                                    color: Colors.Green,
                                    title: `Aventure > Profile`,
                                    description: `L'aventurier **__${interaction.user.tag}__** ...`,
                                    thumbnail: {
                                        url: `${interaction.user.displayAvatarURL({ dynamic: true })}`
                                    },
                                    fields: [
                                        {
                                            name: `\u200b`,
                                            value: `> **__Détails: __**`
                                        },
                                        {
                                            name: `<:adv_heart:1080193933587517540>`,
                                            value: `${new_data[0]}`,
                                            inline: true
                                        },
                                        {
                                            name: `<:adv_hunger:1080195573522632704>`,
                                            value: `${new_data[1]}`,
                                            inline: true
                                        },
                                        {
                                            name: `<:adv_armor:1080196351561838652>`,
                                            value: `${new_data[2]}`,
                                            inline: true
                                        },
                                        {
                                            name: `\u200b`,
                                            value: `> **__Métier: __**`
                                        },
                                        {
                                            name: "\u200b",
                                            value: `${jobs ? `\`[✅]\` ${jobs}` : `\`[❌]\` Aucun métier`}`
                                        },
                                        {
                                            name: `\u200b`,
                                            value: `> **__Ressources: __**`
                                        },
                                        {
                                            name: "`🪙`",
                                            value: `${ressources ? `${ressources[0]}` : '0'}`,
                                            inline: true
                                        },
                                        {
                                            name: "`🪵`",
                                            value: `${ressources ? `${ressources[1]}` : '0'}`,
                                            inline: true
                                        },
                                        {
                                            name: "`🪨`",
                                            value: `${ressources ? `${ressources[2]}` : '0'}`,
                                            inline: true
                                        },
                                        {
                                            name: `\u200b`,
                                            value: `> **__Outils: __**`
                                        },
                                        {
                                            name: "`⛵` Bateau",
                                            value: `${tools ? '\`[✅]\` Bateau (\`Niv. 1\`)' : '\`[❌]\` Aucun bateau'}`
                                        },
                                        {
                                            name: `\u200b`,
                                            value: `> **__Ile actuelle: __**`
                                        },
                                        {
                                            name: "`🏝️` Nom",
                                            value: `${current_island ? `${current_island === 'classic' ? `Ile de départ`: `${current_island}`}` : `Ile de départ`}`
                                        },
                                        {
                                            name: `\u200b`,
                                            value: `> **__Iles découvertes: __**`
                                        },
                                        {
                                            name: "`🏝️` Liste",
                                            value: `${islands ? `\`${islands.join('; ')}\`` : `\`[❌]\` Aucune île découverte`}`
                                        }
                                    ]
                                }]
                            })
                    }, 3000)
                    })
                } else {
                    interaction.followUp({
                        content: `${interaction.member}`,
                        embeds: [{
                            color: Colors.Green,
                            title: `Aventure > Profile`,
                            description: `L'aventurier **__${interaction.user.tag}__** ...`,
                            thumbnail: {
                                url: `${interaction.user.displayAvatarURL({ dynamic: true })}`
                            },
                            fields: [
                                {
                                    name: `\u200b`,
                                    value: `> **__Détails: __**`
                                },
                                {
                                    name: `<:adv_heart:1080193933587517540>`,
                                    value: `${data[0]}`,
                                    inline: true
                                },
                                {
                                    name: `<:adv_hunger:1080195573522632704>`,
                                    value: `${data[1]}`,
                                    inline: true
                                },
                                {
                                    name: `<:adv_armor:1080196351561838652>`,
                                    value: `${data[2]}`,
                                    inline: true
                                },
                                {
                                    name: `\u200b`,
                                    value: `> **__Métier: __**`
                                },
                                {
                                    name: "\u200b",
                                    value: `${jobs ? `\`[✅]\` ${jobs}` : `\`[❌]\` Aucun métier`}`
                                },
                                {
                                    name: `\u200b`,
                                    value: `> **__Ressources: __**`
                                },
                                {
                                    name: "`🪙`",
                                    value: `${ressources ? `${ressources[0]}` : '0'}`,
                                    inline: true
                                },
                                {
                                    name: "`🪵`",
                                    value: `${ressources ? `${ressources[1]}` : '0'}`,
                                    inline: true
                                },
                                {
                                    name: "`🪨`",
                                    value: `${ressources ? `${ressources[2]}` : '0'}`,
                                    inline: true
                                },
                                {
                                    name: `\u200b`,
                                    value: `> **__Outils: __**`
                                },
                                {
                                    name: "`⛵` Bateau",
                                    value: `${tools ? '\`[✅]\` Bateau (\`Niv. 1\`)' : '\`[❌]\` Aucun bateau'}`
                                },
                                {
                                    name: `\u200b`,
                                    value: `> **__Ile actuelle: __**`
                                },
                                {
                                    name: "`🏝️` Nom",
                                    value: `${current_island ? `${current_island === 'classic' ? `Ile de départ`: `${current_island}`}` : `Ile de départ`}`
                                },
                                {
                                    name: `\u200b`,
                                    value: `> **__Iles découvertes: __**`
                                },
                                {
                                    name: "`🏝️` Liste",
                                    value: `${islands ? `\`${islands.join('; ')}\`` : `\`[❌]\` Aucune île découverte`}`
                                }
                            ]
                        }]
                    })
                }
                break;
            }

            case 'shop': {
                let ressources = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);

                interaction.followUp({
                    content: `${interaction.member}`,
                    embeds: [{
                        color: Colors.Green,
                        title: `Aventure > Boutique`,
                        description: `\`[??/??/????]\` **Voici la boutique quotidienne.**`
                    }]
                })
                break;
            }

            case 'spawn': {
                let current_island = db.get(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`);
                if(!current_island || current_island == null) {
                    interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île de départ.` });

                    db.set(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`, 'classic');
                } else {
                    if(current_island === 'classic') {
                        interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île de départ.` });
                    } else {
                        interaction.followUp({
                            content: `\`[🗺️]\` ${interaction.member} vous naviguez jusqu'a l'île de départ.`
                        }).then(async (msg) => {
                            msg.edit({ content: `\`[🗺️]\` ${interaction.member} vous êtes de retour sur l'île de **__${interaction.guild.name}__** !` });
                            await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`, 'classic');

                            if(interaction.member.roles.cache.has('1080209246337122308')) {
                                await interaction.member.roles.remove('1080209246337122308');
                            } else if(interaction.member.roles.cache.has('1080209302800846922')) {
                                await interaction.member.roles.remove('1080209302800846922');
                            } else if(interaction.member.roles.cache.has('1080209364801032233')) {
                                await interaction.member.roles.remove('1080209364801032233');
                            } else if(interaction.member.roles.cache.has('1080209404818894898')) {
                                await interaction.member.roles.remove('1080209404818894898');
                            } else if(interaction.member.roles.cache.has('1080209444438282270')) {
                                await interaction.member.roles.remove('1080209444438282270');
                            } else if(interaction.member.roles.cache.has('1080209477984338011')) {
                                await interaction.member.roles.remove('1080209477984338011');
                            }
                        })
                    }
                }
                break;
            }

            case 'jobs': {
                let jobs = await db.get(`guild_${interaction.guild.id}_${interaction.member.id}.jobs`);
                if(!jobs || jobs === null) {
                    interaction.followUp({
                        content: `\`[🗺️]\` ${interaction.member} vous n'avez pas encore de travail. Vous pouvez en choisir un avec la commande \`/adventure jobs <name>\`.`,
                        embeds: [{
                            color: Colors.Green,
                            title: `Aventure > Jobs`,
                            fields: [
                                {
                                    name: `Les métiers disponibles :`,
                                    value: "> `miner`, `hunter`, `lumberjack`"
                                },
                                {
                                    name: `Descriptions & Avantages :`,
                                    value: "Les métiers vous permettent de recevoir un salaire quotidien. Selon votre métier vous obtiendrez d'avantage une ressource particulière.\n\n**Mineur :**\n> Vous obtiendrez un pourcentage de \`15%\` de chutes de pierres toutes les 24 heures et vous avez \`10%\` en moins sur vos dégats reçus par les créatures.\n\n**Chasseur :**\n> Vous obtiendez un pourcentage de \`15%\` de pièces d'or toutes les 24 heures et vous avez \`15%\` de dégats d'attaque en plus contre les créatures.\n\n**Bûcherons :**\n> Vous obtiendrez un pourcentage de \`15%\` de planches de bois toutes les 24 heures et \`20%\` de santé bonus."
                                }
                            ]
                        }]
                    })
                } else {
                    await interaction.channel.send({
                        content: `${interaction.member}`,
                        embeds: [{
                            color: Colors.Green,
                            title: `Aventure > Jobs`,
                            fields: [
                                {
                                    name: `Les métiers disponibles :`,
                                    value: "> `miner`, `hunter`, `lumberjack`"
                                },
                                {
                                    name: `Descriptions & Avantages :`,
                                    value: "Les métiers vous permettent de recevoir un salaire quotidien. Selon votre métier vous obtiendrez d'avantage une ressource particulière.\n\n**Mineur :**\n> Vous obtiendrez un pourcentage de \`15%\` de chutes de pierres toutes les 24 heures et vous avez \`10%\` en moins sur vos dégats reçus par les créatures.\n\n**Chasseur :**\n> Vous obtiendez un pourcentage de \`15%\` de pièces d'or toutes les 24 heures et vous avez \`15%\` de dégats d'attaque en plus contre les créatures.\n\n**Bûcherons :**\n> Vous obtiendrez un pourcentage de \`15%\` de planches de bois toutes les 24 heures et \`20%\` de santé bonus."
                                }
                            ]
                        }]
                    });

                    let timeout = 86400000;
                    let init_amount = 150;

                    let timer = await db.get(`guild_${interaction.guild.id}_${interaction.member.id}.timer_jobs`)

                    switch(jobs) {
                        case 'miner': {
                            if(timer !== null && timeout - (Date.now() - timer) > 0) {
                                let time = ms(timeout - (Date.now() - timer));
                                return interaction.followUp({
                                    content: `\`[🗺️]\` ${interaction.member} vous devez patienter **${time.hours}** heure(s), **${time.minutes}** minute(s) et **${time.seconds}** avant de récupérer votre salaire quotidien.`
                                })
                            } else {
                                return interaction.followUp({
                                    content: `\`[🗺️]\` ${interaction.member} vous venez de récupérer votre salaire quotidien.`,
                                    embeds: [{
                                        color: Colors.Green,
                                        title: `Aventure > Jobs`,
                                        fields: [
                                            {
                                                name: `Récompenses :`,
                                                value: `\`[x]\``
                                            }
                                        ]
                                    }]
                                }).then(async () => {
                                    await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.timer_jobs`, Date.now())
                                })
                            }
                            break;
                        }

                        case 'hunter': {
                            break;
                        }

                        case 'lumberjack': {
                            break;
                        }
                    }
                }
                break;
            }

            case 'trade': {
                interaction.followUp({
                    content: `${interaction.member} avec qui voulez-vous échanger des ressources ou un objets ?`
                })
                break;
            }
        }
    } else {
        switch(type) {
            case 'construct': {

                switch(input) {
                    case 'boat': {
                        const row = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('accept')
                                    .setLabel('Accepter')
                                    .setStyle(ButtonStyle.Success),
                                new ButtonBuilder()
                                    .setCustomId('decline')
                                    .setLabel('Refuser')
                                    .setStyle(ButtonStyle.Danger)
                            )

                        interaction.followUp({
                            content: `${interaction.member}`,
                            embeds: [{
                                color: Colors.Green,
                                title: 'Aventure > Construction > Bateau',
                                description: `Confirmez-vous la création du bateau ?`,
                                fields: [
                                    {
                                        name: `Coûts :`,
                                        value: `> 🪙 **Coins :** \`500\`\n> 🪵 **Bois :** \`150\`\n> 🪨 **Pierres:** \`150\``,
                                    }
                                ]
                            }],
                            components: [ row ]
                        }).then(async (msg) => {
                            const filter = (interaction) => interaction.user.id === interaction.member.id && interaction.isButton();
                            await Buttons();

                            async function Buttons() {
                                let collected;
                                try {
                                    collected = await msg.awaitMessageComponent({ filter: filter, time: 0 });
                                } catch(err) {
                                    if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                        return msg.delete();
                                    }
                                }

                                if(!collected.deffered) await collected.deferUpdate();

                                switch(collected.customId) {
                                    case 'accept': {
                                        let ressources = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                        let tools = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.tools`);

                                        if(!tools || tools === null) {
                                            if(Number(ressources[0]) <= Number(500)) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de **pièces d'or** afin de construire le bateau (**manquant(s) :** \`${Math.floor(500 - Number(ressources[0]))}\`).` });
                                            if(Number(ressources[1]) <= Number(150)) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de **planches de bois** afin de construire le bateau (**manquant(s) :** \`${Math.floor(150 - Number(ressources[1]))}\`).` });
                                            if(Number(ressources[2]) <= Number(150)) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de **chutes de pierre** afin de construire le bateau (**manquant(s) :** \`${Math.floor(150 - Number(ressources[2]))}\`).` });

                                            interaction.channel.send({
                                                content: `\`[🗺️]\` ${interaction.member} vous venez de construire un bateau! Utilisez la commande \`/adventure navigation <island>\` pour commencer a naviguer.`
                                            }).then(async () => {
                                                const row = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                                const tools = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.tools`);
    
                                                row[0] = Math.floor(Number(ressources[0]) - 500);
                                                row[1] = Math.floor(Number(ressources[1]) - 150);
                                                row[2] = Math.floor(Number(ressources[2]) - 150);
    
                                                await db.set(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`, row);
    
                                                if(!tools || tools === null) {
                                                    await db.set(`guild_${interaction.guild.id}_${interaction.user.id}.tools`, [`boat`]);
                                                } else {
                                                    await db.push(`guild_${interaction.guild.id}_${interaction.user.id}.tools`, 'boat')
                                                }
                                            })
                                        } else {
                                            if(tools.includes('boat')) {
                                                return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous avez déjà un bateau dans votre inventaire.` })
                                            } else {
                                                if(Number(ressources[0]) <= Number(500)) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de **pièces d'or** afin de construire le bateau (**manquant(s) :** \`${Math.floor(500 - Number(ressources[0]))}\`).` });
                                                if(Number(ressources[1]) <= Number(150)) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de **planches de bois** afin de construire le bateau (**manquant(s) :** \`${Math.floor(150 - Number(ressources[1]))}\`).` });
                                                if(Number(ressources[2]) <= Number(150)) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de **chutes de pierre** afin de construire le bateau (**manquant(s) :** \`${Math.floor(150 - Number(ressources[2]))}\`).` });
    
                                                interaction.channel.send({
                                                    content: `\`[🗺️]\` ${interaction.member} vous venez de construire un bateau! Utilisez la commande \`/adventure navigation <island>\` pour commencer a naviguer.`
                                                }).then(async () => {
                                                    const row = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                                    const tools = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.tools`);
        
                                                    row[0] = Math.floor(Number(ressources[0]) - 500);
                                                    row[1] = Math.floor(Number(ressources[1]) - 150);
                                                    row[2] = Math.floor(Number(ressources[2]) - 150);
        
                                                    await db.set(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`, row);
        
                                                    if(!tools || tools === null) {
                                                        await db.set(`guild_${interaction.guild.id}_${interaction.user.id}.tools`, [`boat`]);
                                                    } else {
                                                        await db.push(`guild_${interaction.guild.id}_${interaction.user.id}.tools`, 'boat')
                                                    }
                                                })
                                            } 
                                        }
                                        break;
                                    }

                                    case 'decline': {
                                        interaction.channel.send({
                                            content: `\`[🗺️]\` ${interaction.member} la création du bateau à été annulée.`
                                        })
                                        break;
                                    }
                                }
                            }
                        })
                        break;
                    }
                }

                break;
            }

            case 'navigation': {
                let rank = await db.get(`guild_${interaction.guild.id}_rank_${interaction.member.id}`);

                const tools = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.tools`);
                if(!tools || tools === null) {
                    return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas naviguer pour le moment, vous n'avez pas de bateau. Construisez en un avec la commande \`/adventure construct boat\`.` });
                } else {
                    if(!tools.includes('boat')) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas naviguer pour le moment, vous n'avez pas de bateau. Construisez en un avec la commande \`/adventure construct boat\`.` });
                }

                let array = ['utopia', 'avalon', 'baltia', 'brittia', 'alcatraz', 'pyrallis'];
                if(!array.includes(input)) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} aucune île trouvée a ce nom. Serait-ce une nouvelle île ?!` })

                let islands = await db.get(`guild_${interaction.guild.id}_${interaction.member.id}.islands`);
                if(!islands.includes(input)) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} cette île n'est pas encore découverte sur votre carte.` })

                let current_island = await db.get(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`)

                switch(input) {
                    case 'utopia': {
                        if(current_island === input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${input}__**.` });
                        if(current_island !== 'classic' && current_island !== input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${current_island}__**.` });

                        if(Number(rank) <= 1) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez d'experiences afin de naviguer sur cette île, cela peut être dangereux !` });

                        interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} **chargement de l'île __${input}__ en cours...**` }).then(async (m) => {
                            await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`, `${input}`);

                            await interaction.member.roles.add('1080209246337122308');

                            setTimeout(async () => {
                                await m.edit({
                                    content: `\`[🗺️]\` ${interaction.member} de retour sur l'île **__${input}__** !`
                                }).then(async (msg) => {
                                    
                                })
                            }, 5000)
                        })
                        break;
                    }

                    case 'avalon': {
                        if(current_island === input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${input}__**.` });
                        if(current_island !== 'classic' && current_island !== input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${current_island}__**.` });

                        if(Number(rank) <= 3) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez d'experiences afin de naviguer sur cette île, cela peut être dangereux !` });

                        interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} **chargement de l'île __${input}__ en cours...**` }).then(async (m) => {
                            await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`, `${input}`);

                            await interaction.member.roles.add('1080209302800846922');

                            setTimeout(async () => {
                                await m.edit({
                                    content: `\`[🗺️]\` ${interaction.member} de retour sur l'île **__${input}__** !`
                                }).then(async (msg) => {
                                    
                                })
                            }, 5000)
                        })
                        break;
                    }

                    case 'baltia': {
                        if(current_island === input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${input}__**.` });
                        if(current_island !== 'classic' && current_island !== input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${current_island}__**.` });

                        if(Number(rank) <= 10) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez d'experiences afin de naviguer sur cette île, cela peut être dangereux !` });

                        interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} **chargement de l'île __${input}__ en cours...**` }).then(async (m) => {
                            await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`, `${input}`);

                            await interaction.member.roles.add('1080209364801032233');

                            setTimeout(async () => {
                                await m.edit({
                                    content: `\`[🗺️]\` ${interaction.member} de retour sur l'île **__${input}__** !`
                                }).then(async (msg) => {
                                    
                                })
                            }, 5000)
                        })
                        break;
                    }

                    case 'brittia': {
                        if(current_island === input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${input}__**.` });
                        if(current_island !== 'classic' && current_island !== input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${current_island}__**.` });

                        if(Number(rank) <= 15) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez d'experiences afin de naviguer sur cette île, cela peut être dangereux !` });

                        interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} **chargement de l'île __${input}__ en cours...**` }).then(async (m) => {
                            await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`, `${input}`);

                            await interaction.member.roles.add('1080209404818894898');

                            setTimeout(async () => {
                                await m.edit({
                                    content: `\`[🗺️]\` ${interaction.member} de retour sur l'île **__${input}__** !`
                                }).then(async (msg) => {
                                    
                                })
                            }, 5000)
                        })
                        break;
                    }

                    case 'alcatraz': {
                        if(current_island === input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${input}__**.` });
                        if(current_island !== 'classic' && current_island !== input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${current_island}__**.` });

                        if(Number(rank) <= 20) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez d'experiences afin de naviguer sur cette île, cela peut être dangereux !` });

                        interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} **chargement de l'île __${input}__ en cours...**` }).then(async (m) => {
                            await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`, `${input}`);

                            await interaction.member.roles.add('1080209444438282270');

                            setTimeout(async () => {
                                await m.edit({
                                    content: `\`[🗺️]\` ${interaction.member} de retour sur l'île **__${input}__** !`
                                }).then(async (msg) => {
                                    
                                })
                            }, 5000)
                        })
                        break;
                    }

                    case 'pyrallis': {
                        if(current_island === input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${input}__**.` });
                        if(current_island !== 'classic' && current_island !== input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà sur l'île **__${current_island}__**.` });

                        if(Number(rank) <= 25) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez d'experiences afin de naviguer sur cette île, cela peut être dangereux !` });

                        interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} **chargement de l'île __${input}__ en cours...**` }).then(async (m) => {
                            await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.current_islands`, `${input}`);

                            await interaction.member.roles.add('1080209477984338011');

                            setTimeout(async () => {
                                await m.edit({
                                    content: `\`[🗺️]\` ${interaction.member} de retour sur l'île **__${input}__** !`
                                }).then(async (msg) => {
                                    
                                })
                            }, 5000)
                        })
                        break;
                    }
                }

                break;
            }

            case 'trade': {
                let new_str;

                new_str = await input.replace('<', '');
                new_str = await new_str.replace('@', '');
                new_str = await new_str.replace('>', '');

                const target = interaction.guild.members.cache.get(new_str);
                
                interaction.followUp({
                    content: `${interaction.member}`,
                    embeds: [{
                        color: Colors.Green,
                        title: `Aventure > Trade`,
                        description: `Un échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **en cours d'execution**...`,
                        fields: [
                            {
                                name: `Etape`,
                                value: `\`#1\``
                            },
                            {
                                name: `Status`,
                                value: `> \`[🟡]\` En attente...`
                            }
                        ]
                    }]
                }).then(async (msg) => {
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('accept')
                                .setLabel('Accepter')
                                .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                                .setCustomId('decline')
                                .setLabel('Refuser')
                                .setStyle(ButtonStyle.Danger)
                        )
                    try {
                        target.send({
                            content: `${target.user}`,
                            embeds: [{
                                color: Colors.Green,
                                title: `Aventure > Trade`,
                                description: `L'utilisateur **${interaction.user.tag}** souhaite effectuer un échange avec vous.\n\n> \`[⚠️]\` **__Une seconde confirmation vous sera demandée.__**`
                            }],
                            components: [ row ]
                        }).then(async (m) => {
                            const filter = (interaction) => interaction.user.id === target.user.id && interaction.isButton();
                            await Buttons();

                            async function Buttons() {
                                let collected;
                                try {
                                    collected = await m.awaitMessageComponent({ filter: filter, time: 0 });
                                } catch(err) {
                                    if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                        return m.delete();
                                    }
                                }

                                if(!collected.deffered) await collected.deferUpdate();

                                switch(collected.customId) {
                                    case 'accept': {
                                        target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **validé**.` })
                                        m.delete();

                                        msg.edit({
                                            content: `${interaction.member}`,
                                            embeds: [{
                                                color: Colors.Green,
                                                title: `Aventure > Trade`,
                                                description: `Un échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **en cours d'execution**...`,
                                                fields: [
                                                    {
                                                        name: `Etape`,
                                                        value: `> \`#2\``
                                                    },
                                                    {
                                                        name: `Status`,
                                                        value: `> \`[🟢]\` Validée.`
                                                    },
                                                    {
                                                        name: `Objets / Ressources`,
                                                        value: `> En attente...`
                                                    }
                                                ]
                                            }]
                                        }).then(async () => {
                                            await interaction.channel.send({
                                                content: `${interaction.member} voici votre inventaire d'objet(s) / ressource(s).`
                                            }).then(async (m) => {
                                                let ressources = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                                let tools = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.tools`);

                                                const row = new ActionRowBuilder()
                                                    .addComponents(
                                                        new ButtonBuilder()
                                                            .setCustomId('golds')
                                                            .setEmoji('🪙')
                                                            .setLabel("Pièces d'or")
                                                            .setStyle(ButtonStyle.Secondary),
                                                        new ButtonBuilder()
                                                            .setCustomId('woods')
                                                            .setEmoji('🪵')
                                                            .setLabel("Planches de bois")
                                                            .setStyle(ButtonStyle.Secondary),
                                                        new ButtonBuilder()
                                                            .setCustomId('rocks')
                                                            .setEmoji('🪨')
                                                            .setLabel("Chutes de pierres")
                                                            .setStyle(ButtonStyle.Secondary),
                                                    )

                                                m.edit({
                                                    embeds: [{
                                                        color: Colors.Green,
                                                        title: `Aventure > Trade > Inventaire`,
                                                        fields: [
                                                            {
                                                                name: `\u200b`,
                                                                value: `> **__Ressources: __**`
                                                            },
                                                            {
                                                                name: "`🪙`",
                                                                value: `${ressources ? `${ressources[0]}` : '0'}`,
                                                                inline: true
                                                            },
                                                            {
                                                                name: "`🪵`",
                                                                value: `${ressources ? `${ressources[1]}` : '0'}`,
                                                                inline: true
                                                            },
                                                            {
                                                                name: "`🪨`",
                                                                value: `${ressources ? `${ressources[2]}` : '0'}`,
                                                                inline: true
                                                            },
                                                            {
                                                                name: `\u200b`,
                                                                value: `> **__Outils: __**`
                                                            },
                                                        ]
                                                    }],
                                                    components: [ row ]
                                                }).then(async (m_) => {
                                                    const filter_2 = (interaction) => interaction.user.id === interaction.member.id && interaction.isButton();
                                                    await Buttons_2();

                                                    async function Buttons_2() {
                                                        let collected;
                                                        try {
                                                            collected = await m_.awaitMessageComponent({ filter: filter_2, time: 0 });
                                                        } catch(err) {
                                                            if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                                                return m_.delete();
                                                            }
                                                        }
                                                    
                                                        if(!collected.deffered) await collected.deferUpdate();

                                                        switch(collected.customId) {
                                                            case 'golds': {
                                                                m.delete();

                                                                msg.edit({
                                                                    content: `${interaction.member}`,
                                                                    embeds: [{
                                                                        color: Colors.Green,
                                                                        title: `Aventure > Trade`,
                                                                        description: `Un échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **en cours d'execution**...`,
                                                                        fields: [
                                                                            {
                                                                                name: `Etape`,
                                                                                value: `> \`#2\``
                                                                            },
                                                                            {
                                                                                name: `Status`,
                                                                                value: `> \`[🟢]\` Validée.`
                                                                            },
                                                                            {
                                                                                name: `Objets / Ressources`,
                                                                                value: `> \`[🪙]\` Pièces d'or (**En attente...**)`
                                                                            }
                                                                        ]
                                                                    }]
                                                                }).then(async (m_gold) => {
                                                                    const row = new ActionRowBuilder()
                                                                        .addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('plus_1')
                                                                                .setLabel('+ 1')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('plus_10')
                                                                                .setLabel('+ 10')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('plus_100')
                                                                                .setLabel('+ 100')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                        );

                                                                    const row_2 = new ActionRowBuilder()
                                                                        .addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('minus_1')
                                                                                .setLabel('- 1')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('minus_10')
                                                                                .setLabel('- 10')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('minus_100')
                                                                                .setLabel('- 100')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                        )

                                                                    const row_3 = new ActionRowBuilder()
                                                                        .addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('confirm')
                                                                                .setLabel('Confirmer')
                                                                                .setStyle(ButtonStyle.Success),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('cancel')
                                                                                .setLabel('Annuler')
                                                                                .setStyle(ButtonStyle.Danger)
                                                                        )
                                                                    interaction.channel.send({
                                                                        content: `\`[🗺️]\` ${interaction.member} combien de pièces d'or voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                        embeds: [{
                                                                            color: Colors.Green,
                                                                            title: `Aventure > Trade`,
                                                                            fields: [
                                                                                {
                                                                                    name: `\u200b`,
                                                                                    value: `> \`[🪙]\` **__Nombres:__**`
                                                                                },
                                                                                {
                                                                                    name: `\u200b`,
                                                                                    value: `0`
                                                                                }
                                                                            ]
                                                                        }],
                                                                        components: [ row, row_2, row_3 ]
                                                                    }).then(async (m_gold_count) => {
                                                                        const filter_3 = (interaction) => interaction.user.id === interaction.member.id && interaction.isButton();
                                                                        await Buttons_3();

                                                                        async function Buttons_3() {
                                                                            let collected;
                                                                            try {
                                                                                collected = await m_gold_count.awaitMessageComponent({ filter: filter_3, time: 0 });
                                                                            } catch(err) {
                                                                                if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                                                                    return m_gold_count.delete();
                                                                                }
                                                                            }
                                                                        
                                                                            if(!collected.deffered) await collected.deferUpdate();

                                                                            switch(collected.customId) {
                                                                                case 'plus_1': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) + 1);

                                                                                    m_gold_count.edit({
                                                                                        content: `\`[🗺️]\` ${interaction.member} combien de pièces d'or voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `> \`[🪙]\` **__Nombres:__**`
                                                                                                },
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `${count}`
                                                                                                }
                                                                                            ]
                                                                                        }],
                                                                                        components: [ row, row_2, row_3 ]
                                                                                    })

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'plus_10': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) + 10);

                                                                                    m_gold_count.edit({
                                                                                        content: `\`[🗺️]\` ${interaction.member} combien de pièces d'or voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `> \`[🪙]\` **__Nombres:__**`
                                                                                                },
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `${count}`
                                                                                                }
                                                                                            ]
                                                                                        }],
                                                                                        components: [ row, row_2, row_3 ]
                                                                                    })

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'plus_100': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) + 100);

                                                                                    m_gold_count.edit({
                                                                                        content: `\`[🗺️]\` ${interaction.member} combien de pièces d'or voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `> \`[🪙]\` **__Nombres:__**`
                                                                                                },
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `${count}`
                                                                                                }
                                                                                            ]
                                                                                        }],
                                                                                        components: [ row, row_2, row_3 ]
                                                                                    })

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'minus_1': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) - 1);

                                                                                    if(count < 0) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas avoir une valeur négative.`, ephemeral: true });
                                                                                    } else {
                                                                                        m_gold_count.edit({
                                                                                            content: `\`[🗺️]\` ${interaction.member} combien de pièces d'or voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                            embeds: [{
                                                                                                color: Colors.Green,
                                                                                                title: `Aventure > Trade`,
                                                                                                fields: [
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `> \`[🪙]\` **__Nombres:__**`
                                                                                                    },
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `${count}`
                                                                                                    }
                                                                                                ]
                                                                                            }],
                                                                                            components: [ row, row_2, row_3 ]
                                                                                        })
                                                                                    }

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'minus_10': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) - 10);

                                                                                    if(count < 0) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas avoir une valeur négative.`, ephemeral: true });
                                                                                    } else {
                                                                                        m_gold_count.edit({
                                                                                            content: `\`[🗺️]\` ${interaction.member} combien de pièces d'or voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                            embeds: [{
                                                                                                color: Colors.Green,
                                                                                                title: `Aventure > Trade`,
                                                                                                fields: [
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `> \`[🪙]\` **__Nombres:__**`
                                                                                                    },
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `${count}`
                                                                                                    }
                                                                                                ]
                                                                                            }],
                                                                                            components: [ row, row_2, row_3 ]
                                                                                        })
                                                                                    }

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'minus_100': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) - 100);

                                                                                    if(count < 0) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas avoir une valeur négative.`, ephemeral: true });
                                                                                    } else {
                                                                                        m_gold_count.edit({
                                                                                            content: `\`[🗺️]\` ${interaction.member} combien de pièces d'or voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                            embeds: [{
                                                                                                color: Colors.Green,
                                                                                                title: `Aventure > Trade`,
                                                                                                fields: [
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `> \`[🪙]\` **__Nombres:__**`
                                                                                                    },
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `${count}`
                                                                                                    }
                                                                                                ]
                                                                                            }],
                                                                                            components: [ row, row_2, row_3 ]
                                                                                        })
                                                                                    }

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'confirm': {
                                                                                    let ressources = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                                                                    let count = Number(m_gold_count.embeds[0].data.fields[1].value);

                                                                                    if(!ressources || ressources == null) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de pièce d'or afin d'effectuer cet échange.` }).then(async () => {
                                                                                            msg.edit({
                                                                                                content: `${interaction.member}`,
                                                                                                embeds: [{
                                                                                                    color: Colors.Green,
                                                                                                    title: `Aventure > Trade`,
                                                                                                    description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                                                                    fields: [
                                                                                                        {
                                                                                                            name: `Status`,
                                                                                                            value: `> \`[🔴]\` Annulé.`
                                                                                                        },
                                                                                                    ]
                                                                                                }]
                                                                                            }).then(async () => {
                                                                                                target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                                                                                m_gold_count.delete();
                                                                                            })
                                                                                        })
                                                                                    } else {
                                                                                        if(Number(ressources[0]) < Number(count)) {
                                                                                            console.log(`${Number(ressources[0])} < ${Number(count)}`)
                                                                                            interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de pièce d'or afin d'effectuer cet échange.` }).then(async () => {
                                                                                                msg.edit({
                                                                                                    content: `${interaction.member}`,
                                                                                                    embeds: [{
                                                                                                        color: Colors.Green,
                                                                                                        title: `Aventure > Trade`,
                                                                                                        description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                                                                        fields: [
                                                                                                            {
                                                                                                                name: `Status`,
                                                                                                                value: `> \`[🔴]\` Annulé.`
                                                                                                            },
                                                                                                        ]
                                                                                                    }]
                                                                                                }).then(async () => {
                                                                                                    target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                                                                                    m_gold_count.delete();
                                                                                                })
                                                                                            })
                                                                                        } else {
                                                                                            msg.edit({
                                                                                                content: `${interaction.member}`,
                                                                                                embeds: [{
                                                                                                    color: Colors.Green,
                                                                                                    title: `Aventure > Trade`,
                                                                                                    description: `Un échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **effectué**...`,
                                                                                                    fields: [
                                                                                                        {
                                                                                                            name: `Status`,
                                                                                                            value: `> \`[🟢]\` Validée.`
                                                                                                        },
                                                                                                        {
                                                                                                            name: `Objets / Ressources`,
                                                                                                            value: `> \`[🪙]\` Pièces d'or (**${count}**)`
                                                                                                        }
                                                                                                    ]
                                                                                                }]
                                                                                            }).then(async () => {
                                                                                                await m_gold_count.delete();

                                                                                                let sender_new_data = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                                                                                let receiver_new_data = await db.get(`guild_${interaction.guild.id}_${target.user.id}.ressources`);

                                                                                                sender_new_data[0] = Math.floor(sender_new_data[0] - count);
                                                                                                receiver_new_data[0] = Math.floor(receiver_new_data[0] + count);

                                                                                                await db.set(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`, sender_new_data);
                                                                                                await db.set(`guild_${interaction.guild.id}_${target.user.id}.ressources`, receiver_new_data);
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                    break;
                                                                                }

                                                                                case 'cancel': {
                                                                                    msg.edit({
                                                                                        content: `${interaction.member}`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `Status`,
                                                                                                    value: `> \`[🔴]\` Annulé.`
                                                                                                },
                                                                                            ]
                                                                                        }]
                                                                                    }).then(async () => {
                                                                                        target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                                                                        m_gold_count.delete();
                                                                                    })
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }
                                                                    })
                                                                })
                                                                break;
                                                            }

                                                            case 'woods': {
                                                                m.delete();

                                                                msg.edit({
                                                                    content: `${interaction.member}`,
                                                                    embeds: [{
                                                                        color: Colors.Green,
                                                                        title: `Aventure > Trade`,
                                                                        description: `Un échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **en cours d'execution**...`,
                                                                        fields: [
                                                                            {
                                                                                name: `Etape`,
                                                                                value: `> \`#2\``
                                                                            },
                                                                            {
                                                                                name: `Status`,
                                                                                value: `> \`[🟢]\` Validée.`
                                                                            },
                                                                            {
                                                                                name: `Objets / Ressources`,
                                                                                value: `> \`[🪵]\` Planches de bois (**En attente...**)`
                                                                            }
                                                                        ]
                                                                    }]
                                                                }).then(async (m_gold) => {
                                                                    const row = new ActionRowBuilder()
                                                                        .addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('plus_1')
                                                                                .setLabel('+ 1')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('plus_10')
                                                                                .setLabel('+ 10')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('plus_100')
                                                                                .setLabel('+ 100')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                        );

                                                                    const row_2 = new ActionRowBuilder()
                                                                        .addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('minus_1')
                                                                                .setLabel('- 1')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('minus_10')
                                                                                .setLabel('- 10')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('minus_100')
                                                                                .setLabel('- 100')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                        )

                                                                    const row_3 = new ActionRowBuilder()
                                                                        .addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('confirm')
                                                                                .setLabel('Confirmer')
                                                                                .setStyle(ButtonStyle.Success),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('cancel')
                                                                                .setLabel('Annuler')
                                                                                .setStyle(ButtonStyle.Danger)
                                                                        )
                                                                    interaction.channel.send({
                                                                        content: `\`[🗺️]\` ${interaction.member} combien de planches de bois voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                        embeds: [{
                                                                            color: Colors.Green,
                                                                            title: `Aventure > Trade`,
                                                                            fields: [
                                                                                {
                                                                                    name: `\u200b`,
                                                                                    value: `> \`[🪵]\` **__Nombres:__**`
                                                                                },
                                                                                {
                                                                                    name: `\u200b`,
                                                                                    value: `0`
                                                                                }
                                                                            ]
                                                                        }],
                                                                        components: [ row, row_2, row_3 ]
                                                                    }).then(async (m_gold_count) => {
                                                                        const filter_3 = (interaction) => interaction.user.id === interaction.member.id && interaction.isButton();
                                                                        await Buttons_3();

                                                                        async function Buttons_3() {
                                                                            let collected;
                                                                            try {
                                                                                collected = await m_gold_count.awaitMessageComponent({ filter: filter_3, time: 0 });
                                                                            } catch(err) {
                                                                                if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                                                                    return m_gold_count.delete();
                                                                                }
                                                                            }
                                                                        
                                                                            if(!collected.deffered) await collected.deferUpdate();

                                                                            switch(collected.customId) {
                                                                                case 'plus_1': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) + 1);

                                                                                    m_gold_count.edit({
                                                                                        content: `\`[🗺️]\` ${interaction.member} combien de planches de bois voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `> \`[🪵]\` **__Nombres:__**`
                                                                                                },
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `${count}`
                                                                                                }
                                                                                            ]
                                                                                        }],
                                                                                        components: [ row, row_2, row_3 ]
                                                                                    })

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'plus_10': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) + 10);

                                                                                    m_gold_count.edit({
                                                                                        content: `\`[🗺️]\` ${interaction.member} combien de planches de bois voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `> \`[🪵]\` **__Nombres:__**`
                                                                                                },
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `${count}`
                                                                                                }
                                                                                            ]
                                                                                        }],
                                                                                        components: [ row, row_2, row_3 ]
                                                                                    })

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'plus_100': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) + 100);

                                                                                    m_gold_count.edit({
                                                                                        content: `\`[🗺️]\` ${interaction.member} combien de planches de bois voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `> \`[🪵]\` **__Nombres:__**`
                                                                                                },
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `${count}`
                                                                                                }
                                                                                            ]
                                                                                        }],
                                                                                        components: [ row, row_2, row_3 ]
                                                                                    })

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'minus_1': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) - 1);

                                                                                    if(count < 0) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas avoir une valeur négative.`, ephemeral: true });
                                                                                    } else {
                                                                                        m_gold_count.edit({
                                                                                            content: `\`[🗺️]\` ${interaction.member} combien de planches de bois voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                            embeds: [{
                                                                                                color: Colors.Green,
                                                                                                title: `Aventure > Trade`,
                                                                                                fields: [
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `> \`[🪵]\` **__Nombres:__**`
                                                                                                    },
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `${count}`
                                                                                                    }
                                                                                                ]
                                                                                            }],
                                                                                            components: [ row, row_2, row_3 ]
                                                                                        })
                                                                                    }

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'minus_10': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) - 10);

                                                                                    if(count < 0) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas avoir une valeur négative.`, ephemeral: true });
                                                                                    } else {
                                                                                        m_gold_count.edit({
                                                                                            content: `\`[🗺️]\` ${interaction.member} combien de planches de bois voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                            embeds: [{
                                                                                                color: Colors.Green,
                                                                                                title: `Aventure > Trade`,
                                                                                                fields: [
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `> \`[🪵]\` **__Nombres:__**`
                                                                                                    },
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `${count}`
                                                                                                    }
                                                                                                ]
                                                                                            }],
                                                                                            components: [ row, row_2, row_3 ]
                                                                                        })
                                                                                    }

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'minus_100': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) - 100);

                                                                                    if(count < 0) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas avoir une valeur négative.`, ephemeral: true });
                                                                                    } else {
                                                                                        m_gold_count.edit({
                                                                                            content: `\`[🗺️]\` ${interaction.member} combien de planches de bois voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                            embeds: [{
                                                                                                color: Colors.Green,
                                                                                                title: `Aventure > Trade`,
                                                                                                fields: [
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `> \`[🪵]\` **__Nombres:__**`
                                                                                                    },
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `${count}`
                                                                                                    }
                                                                                                ]
                                                                                            }],
                                                                                            components: [ row, row_2, row_3 ]
                                                                                        })
                                                                                    }

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'confirm': {
                                                                                    let ressources = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                                                                    let count = Number(m_gold_count.embeds[0].data.fields[1].value);

                                                                                    if(!ressources || ressources == null) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de pièce d'or afin d'effectuer cet échange.` }).then(async () => {
                                                                                            msg.edit({
                                                                                                content: `${interaction.member}`,
                                                                                                embeds: [{
                                                                                                    color: Colors.Green,
                                                                                                    title: `Aventure > Trade`,
                                                                                                    description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                                                                    fields: [
                                                                                                        {
                                                                                                            name: `Status`,
                                                                                                            value: `> \`[🔴]\` Annulé.`
                                                                                                        },
                                                                                                    ]
                                                                                                }]
                                                                                            }).then(async () => {
                                                                                                target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                                                                                m_gold_count.delete();
                                                                                            })
                                                                                        })
                                                                                    } else {
                                                                                        if(Number(ressources[1]) < Number(count)) {
                                                                                            interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de pièce d'or afin d'effectuer cet échange.` }).then(async () => {
                                                                                                msg.edit({
                                                                                                    content: `${interaction.member}`,
                                                                                                    embeds: [{
                                                                                                        color: Colors.Green,
                                                                                                        title: `Aventure > Trade`,
                                                                                                        description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                                                                        fields: [
                                                                                                            {
                                                                                                                name: `Status`,
                                                                                                                value: `> \`[🔴]\` Annulé.`
                                                                                                            },
                                                                                                        ]
                                                                                                    }]
                                                                                                }).then(async () => {
                                                                                                    target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                                                                                    m_gold_count.delete();
                                                                                                })
                                                                                            })
                                                                                        } else {
                                                                                            msg.edit({
                                                                                                content: `${interaction.member}`,
                                                                                                embeds: [{
                                                                                                    color: Colors.Green,
                                                                                                    title: `Aventure > Trade`,
                                                                                                    description: `Un échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **effectué**...`,
                                                                                                    fields: [
                                                                                                        {
                                                                                                            name: `Status`,
                                                                                                            value: `> \`[🟢]\` Validée.`
                                                                                                        },
                                                                                                        {
                                                                                                            name: `Objets / Ressources`,
                                                                                                            value: `> \`[🪵]\` Planches de bois (**${count}**)`
                                                                                                        }
                                                                                                    ]
                                                                                                }]
                                                                                            }).then(async () => {
                                                                                                await m_gold_count.delete();

                                                                                                let sender_new_data = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                                                                                let receiver_new_data = await db.get(`guild_${interaction.guild.id}_${target.user.id}.ressources`);

                                                                                                sender_new_data[1] = Math.floor(sender_new_data[1] - count);
                                                                                                receiver_new_data[1] = Math.floor(receiver_new_data[1] + count);

                                                                                                await db.set(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`, sender_new_data);
                                                                                                await db.set(`guild_${interaction.guild.id}_${target.user.id}.ressources`, receiver_new_data);
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                    break;
                                                                                }

                                                                                case 'cancel': {
                                                                                    msg.edit({
                                                                                        content: `${interaction.member}`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `Status`,
                                                                                                    value: `> \`[🔴]\` Annulé.`
                                                                                                },
                                                                                            ]
                                                                                        }]
                                                                                    }).then(async () => {
                                                                                        target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                                                                        m_gold_count.delete();
                                                                                    })
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }
                                                                    })
                                                                })
                                                                break;
                                                            }

                                                            case 'rocks': {
                                                                m.delete();

                                                                msg.edit({
                                                                    content: `${interaction.member}`,
                                                                    embeds: [{
                                                                        color: Colors.Green,
                                                                        title: `Aventure > Trade`,
                                                                        description: `Un échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **en cours d'execution**...`,
                                                                        fields: [
                                                                            {
                                                                                name: `Etape`,
                                                                                value: `> \`#2\``
                                                                            },
                                                                            {
                                                                                name: `Status`,
                                                                                value: `> \`[🟢]\` Validée.`
                                                                            },
                                                                            {
                                                                                name: `Objets / Ressources`,
                                                                                value: `> \`[🪨]\` Chutes de pierres (**En attente...**)`
                                                                            }
                                                                        ]
                                                                    }]
                                                                }).then(async (m_gold) => {
                                                                    const row = new ActionRowBuilder()
                                                                        .addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('plus_1')
                                                                                .setLabel('+ 1')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('plus_10')
                                                                                .setLabel('+ 10')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('plus_100')
                                                                                .setLabel('+ 100')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                        );

                                                                    const row_2 = new ActionRowBuilder()
                                                                        .addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('minus_1')
                                                                                .setLabel('- 1')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('minus_10')
                                                                                .setLabel('- 10')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('minus_100')
                                                                                .setLabel('- 100')
                                                                                .setStyle(ButtonStyle.Secondary),
                                                                        )

                                                                    const row_3 = new ActionRowBuilder()
                                                                        .addComponents(
                                                                            new ButtonBuilder()
                                                                                .setCustomId('confirm')
                                                                                .setLabel('Confirmer')
                                                                                .setStyle(ButtonStyle.Success),
                                                                            new ButtonBuilder()
                                                                                .setCustomId('cancel')
                                                                                .setLabel('Annuler')
                                                                                .setStyle(ButtonStyle.Danger)
                                                                        )
                                                                    interaction.channel.send({
                                                                        content: `\`[🗺️]\` ${interaction.member} combien de chutes de pierres voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                        embeds: [{
                                                                            color: Colors.Green,
                                                                            title: `Aventure > Trade`,
                                                                            fields: [
                                                                                {
                                                                                    name: `\u200b`,
                                                                                    value: `> \`[🪨]\` **__Nombres:__**`
                                                                                },
                                                                                {
                                                                                    name: `\u200b`,
                                                                                    value: `0`
                                                                                }
                                                                            ]
                                                                        }],
                                                                        components: [ row, row_2, row_3 ]
                                                                    }).then(async (m_gold_count) => {
                                                                        const filter_3 = (interaction) => interaction.user.id === interaction.member.id && interaction.isButton();
                                                                        await Buttons_3();

                                                                        async function Buttons_3() {
                                                                            let collected;
                                                                            try {
                                                                                collected = await m_gold_count.awaitMessageComponent({ filter: filter_3, time: 0 });
                                                                            } catch(err) {
                                                                                if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                                                                    return m_gold_count.delete();
                                                                                }
                                                                            }
                                                                        
                                                                            if(!collected.deffered) await collected.deferUpdate();

                                                                            switch(collected.customId) {
                                                                                case 'plus_1': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) + 1);

                                                                                    m_gold_count.edit({
                                                                                        content: `\`[🗺️]\` ${interaction.member} combien de chutes de pierres voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `> \`[🪨]\` **__Nombres:__**`
                                                                                                },
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `${count}`
                                                                                                }
                                                                                            ]
                                                                                        }],
                                                                                        components: [ row, row_2, row_3 ]
                                                                                    })

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'plus_10': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) + 10);

                                                                                    m_gold_count.edit({
                                                                                        content: `\`[🗺️]\` ${interaction.member} combien de chutes de pierres voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `> \`[🪨]\` **__Nombres:__**`
                                                                                                },
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `${count}`
                                                                                                }
                                                                                            ]
                                                                                        }],
                                                                                        components: [ row, row_2, row_3 ]
                                                                                    })

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'plus_100': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) + 100);

                                                                                    m_gold_count.edit({
                                                                                        content: `\`[🗺️]\` ${interaction.member} combien de chutes de pierres voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `> \`[🪨]\` **__Nombres:__**`
                                                                                                },
                                                                                                {
                                                                                                    name: `\u200b`,
                                                                                                    value: `${count}`
                                                                                                }
                                                                                            ]
                                                                                        }],
                                                                                        components: [ row, row_2, row_3 ]
                                                                                    })

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'minus_1': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) - 1);

                                                                                    if(count < 0) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas avoir une valeur négative.`, ephemeral: true });
                                                                                    } else {
                                                                                        m_gold_count.edit({
                                                                                            content: `\`[🗺️]\` ${interaction.member} combien de chutes de pierres voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                            embeds: [{
                                                                                                color: Colors.Green,
                                                                                                title: `Aventure > Trade`,
                                                                                                fields: [
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `> \`[🪨]\` **__Nombres:__**`
                                                                                                    },
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `${count}`
                                                                                                    }
                                                                                                ]
                                                                                            }],
                                                                                            components: [ row, row_2, row_3 ]
                                                                                        })
                                                                                    }

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'minus_10': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) - 10);

                                                                                    if(count < 0) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas avoir une valeur négative.`, ephemeral: true });
                                                                                    } else {
                                                                                        m_gold_count.edit({
                                                                                            content: `\`[🗺️]\` ${interaction.member} combien de chutes de pierres voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                            embeds: [{
                                                                                                color: Colors.Green,
                                                                                                title: `Aventure > Trade`,
                                                                                                fields: [
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `> \`[🪨]\` **__Nombres:__**`
                                                                                                    },
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `${count}`
                                                                                                    }
                                                                                                ]
                                                                                            }],
                                                                                            components: [ row, row_2, row_3 ]
                                                                                        })
                                                                                    }

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'minus_100': {
                                                                                    let count = Math.floor(Number(m_gold_count.embeds[0].data.fields[1].value) - 100);

                                                                                    if(count < 0) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous ne pouvez pas avoir une valeur négative.`, ephemeral: true });
                                                                                    } else {
                                                                                        m_gold_count.edit({
                                                                                            content: `\`[🗺️]\` ${interaction.member} combien de chutes de pierres voulez-vous échanger avec \`${target.user.tag}\` ?`,
                                                                                            embeds: [{
                                                                                                color: Colors.Green,
                                                                                                title: `Aventure > Trade`,
                                                                                                fields: [
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `> \`[🪨]\` **__Nombres:__**`
                                                                                                    },
                                                                                                    {
                                                                                                        name: `\u200b`,
                                                                                                        value: `${count}`
                                                                                                    }
                                                                                                ]
                                                                                            }],
                                                                                            components: [ row, row_2, row_3 ]
                                                                                        })
                                                                                    }

                                                                                    Buttons_3();
                                                                                    break;
                                                                                }

                                                                                case 'confirm': {
                                                                                    let ressources = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                                                                    let count = Number(m_gold_count.embeds[0].data.fields[1].value);

                                                                                    if(!ressources || ressources == null) {
                                                                                        interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de pièce d'or afin d'effectuer cet échange.` }).then(async () => {
                                                                                            msg.edit({
                                                                                                content: `${interaction.member}`,
                                                                                                embeds: [{
                                                                                                    color: Colors.Green,
                                                                                                    title: `Aventure > Trade`,
                                                                                                    description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                                                                    fields: [
                                                                                                        {
                                                                                                            name: `Status`,
                                                                                                            value: `> \`[🔴]\` Annulé.`
                                                                                                        },
                                                                                                    ]
                                                                                                }]
                                                                                            }).then(async () => {
                                                                                                target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                                                                                m_gold_count.delete();
                                                                                            })
                                                                                        })
                                                                                    } else {
                                                                                        if(Number(ressources[1]) < Number(count)) {
                                                                                            interaction.channel.send({ content: `\`[🗺️]\` ${interaction.member} vous n'avez pas assez de pièce d'or afin d'effectuer cet échange.` }).then(async () => {
                                                                                                msg.edit({
                                                                                                    content: `${interaction.member}`,
                                                                                                    embeds: [{
                                                                                                        color: Colors.Green,
                                                                                                        title: `Aventure > Trade`,
                                                                                                        description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                                                                        fields: [
                                                                                                            {
                                                                                                                name: `Status`,
                                                                                                                value: `> \`[🔴]\` Annulé.`
                                                                                                            },
                                                                                                        ]
                                                                                                    }]
                                                                                                }).then(async () => {
                                                                                                    target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                                                                                    m_gold_count.delete();
                                                                                                })
                                                                                            })
                                                                                        } else {
                                                                                            msg.edit({
                                                                                                content: `${interaction.member}`,
                                                                                                embeds: [{
                                                                                                    color: Colors.Green,
                                                                                                    title: `Aventure > Trade`,
                                                                                                    description: `Un échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **effectué**...`,
                                                                                                    fields: [
                                                                                                        {
                                                                                                            name: `Status`,
                                                                                                            value: `> \`[🟢]\` Validée.`
                                                                                                        },
                                                                                                        {
                                                                                                            name: `Objets / Ressources`,
                                                                                                            value: `> \`[🪨]\` Chutes de pierres (**${count}**)`
                                                                                                        }
                                                                                                    ]
                                                                                                }]
                                                                                            }).then(async () => {
                                                                                                await m_gold_count.delete();

                                                                                                let sender_new_data = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                                                                                                let receiver_new_data = await db.get(`guild_${interaction.guild.id}_${target.user.id}.ressources`);

                                                                                                sender_new_data[2] = Math.floor(sender_new_data[2] - count);
                                                                                                receiver_new_data[2] = Math.floor(receiver_new_data[2] + count);

                                                                                                await db.set(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`, sender_new_data);
                                                                                                await db.set(`guild_${interaction.guild.id}_${target.user.id}.ressources`, receiver_new_data);
                                                                                            })
                                                                                        }
                                                                                    }
                                                                                    break;
                                                                                }

                                                                                case 'cancel': {
                                                                                    msg.edit({
                                                                                        content: `${interaction.member}`,
                                                                                        embeds: [{
                                                                                            color: Colors.Green,
                                                                                            title: `Aventure > Trade`,
                                                                                            description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                                                            fields: [
                                                                                                {
                                                                                                    name: `Status`,
                                                                                                    value: `> \`[🔴]\` Annulé.`
                                                                                                },
                                                                                            ]
                                                                                        }]
                                                                                    }).then(async () => {
                                                                                        target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                                                                        m_gold_count.delete();
                                                                                    })
                                                                                    break;
                                                                                }
                                                                            }
                                                                        }
                                                                    })
                                                                })
                                                                break;
                                                            }
                                                        }
                                                    }
                                                })
                                            })
                                        })
                                        break;   
                                    }

                                    case 'decline': {
                                        msg.edit({
                                            content: `${interaction.member}`,
                                            embeds: [{
                                                color: Colors.Green,
                                                title: `Aventure > Trade`,
                                                description: `L'échange entre \`${interaction.user.tag}\` et \`${target.user.tag}\` est **annulé**...`,
                                                fields: [
                                                    {
                                                        name: `Status`,
                                                        value: `> \`[🔴]\` Refusée.`
                                                    },
                                                ]
                                            }]
                                        }).then(async () => {
                                            target.send({ content: `\`[🗺️]\` ${target.user} l'échange avec \`${interaction.user.tag}\` est **annulé**.` })
                                            m.delete();
                                        })
                                        break;
                                    }
                                }
                            }
                        })
                    } catch(err) {
                        msg.edit({ content: `\`[🗺️]\` ${interaction.member} l'utilisateur **__${target.user.tag}__** n'autorise pas les messages privés.` })
                    }
                })
                break;
            }

            case 'jobs': {
                let jobs = await db.get(`guild_${interaction.guild.id}_${interaction.member.id}.jobs`);

                if(!jobs || jobs === null) {
                    switch(input) {
                        case 'miner': {
                            interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes désormais **mineur**.` }).then(async () => {
                                await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.jobs`, 'miner');
                            })
                            break;
                        }

                        case 'hunter': {
                            interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes désormais **chasseur**.` }).then(async () => {
                                await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.jobs`, 'hunter');
                            })
                            break;
                        }

                        case 'lumberjack': {
                            interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes désormais **bûcherons**.` }).then(async () => {
                                await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.jobs`, 'lumberjack');
                            })
                            break;
                        }
                    }
                } else {
                    const row = new ActionRowBuilder()
                        .addComponents(
                            new ButtonBuilder()
                                .setCustomId('confirm')
                                .setLabel('Confirmer')
                                .setStyle(ButtonStyle.Success),
                            new ButtonBuilder()
                                .setCustomId('cancel')
                                .setLabel('Annuler')
                                .setStyle(ButtonStyle.Danger)
                        )

                    switch(input) {
                        case 'miner': {
                            if(jobs === input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà **mineur**.` });

                            interaction.followUp({
                                content: `\`[🗺️]\` ${interaction.member} voulez-vous réellement changer de métier ?`,
                                components: [ row ]
                            }).then(async (msg) => {
                                const filter = (interaction) => interaction.user.id === target.user.id && interaction.isButton();
                                await Buttons();
    
                                async function Buttons() {
                                    let collected;
                                    try {
                                        collected = await msg.awaitMessageComponent({ filter: filter, time: 0 });
                                    } catch(err) {
                                        if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                            return msg.delete();
                                        }
                                    }
    
                                    if(!collected.deffered) await collected.deferUpdate();
    
                                    switch(collected.customId) {
                                        case 'confirm': {
                                            msg.edit({ content: `\`[🗺️]\` ${interaction.member} vous êtes désormais **mineur**.` }).then(async () => {
                                                await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.jobs`, 'miner');
                                            })
                                            break;
                                        }

                                        case 'cancel': {
                                            msg.edit({ content: `\`[🗺️]\` ${interaction.member} le changement de métier vient d'être annulé.` })
                                            break;
                                        }
                                    }
                                }
                            })
                            break;
                        }

                        case 'hunter': {
                            if(jobs === input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà **mineur**.` });

                            interaction.followUp({
                                content: `\`[🗺️]\` ${interaction.member} voulez-vous réellement changer de métier ?`,
                                components: [ row ]
                            }).then(async (msg) => {
                                const filter = (interaction) => interaction.user.id === target.user.id && interaction.isButton();
                                await Buttons();
    
                                async function Buttons() {
                                    let collected;
                                    try {
                                        collected = await msg.awaitMessageComponent({ filter: filter, time: 0 });
                                    } catch(err) {
                                        if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                            return msg.delete();
                                        }
                                    }
    
                                    if(!collected.deffered) await collected.deferUpdate();
    
                                    switch(collected.customId) {
                                        case 'confirm': {
                                            msg.edit({ content: `\`[🗺️]\` ${interaction.member} vous êtes désormais **chasseur**.` }).then(async () => {
                                                await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.jobs`, 'hunter');
                                            })
                                            break;
                                        }

                                        case 'cancel': {
                                            msg.edit({ content: `\`[🗺️]\` ${interaction.member} le changement de métier vient d'être annulé.` })
                                            break;
                                        }
                                    }
                                }
                            })
                            break;
                        }

                        case 'lumberjack': {
                            if(jobs === input) return interaction.followUp({ content: `\`[🗺️]\` ${interaction.member} vous êtes déjà **mineur**.` });

                            interaction.followUp({
                                content: `\`[🗺️]\` ${interaction.member} voulez-vous réellement changer de métier ?`,
                                components: [ row ]
                            }).then(async (msg) => {
                                const filter = (interaction) => interaction.user.id === target.user.id && interaction.isButton();
                                await Buttons();
    
                                async function Buttons() {
                                    let collected;
                                    try {
                                        collected = await msg.awaitMessageComponent({ filter: filter, time: 0 });
                                    } catch(err) {
                                        if(err.code === 'INTERACTION_COLLECTOR_ERROR') {
                                            return msg.delete();
                                        }
                                    }
    
                                    if(!collected.deffered) await collected.deferUpdate();
    
                                    switch(collected.customId) {
                                        case 'confirm': {
                                            msg.edit({ content: `\`[🗺️]\` ${interaction.member} vous êtes désormais **bûcherons**.` }).then(async () => {
                                                await db.set(`guild_${interaction.guild.id}_${interaction.member.id}.jobs`, 'lumberjack');
                                            })
                                            break;
                                        }

                                        case 'cancel': {
                                            msg.edit({ content: `\`[🗺️]\` ${interaction.member} le changement de métier vient d'être annulé.` })
                                            break;
                                        }
                                    }
                                }
                            })
                            break;
                        }
                    }
                }
                break;
            }
        }
    }

    }
}