const { ApplicationCommandType, ApplicationCommandOptionType, PermissionsBitField, ModalBuilder, Colors, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, TextInputStyle } = require('discord.js');
const moment = require('moment');
const db = require('quick.db');

module.exports = {
    name: 'mod',
    description: '(⛔) Modération',
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'membre',
            description: 'Membre à ban',
            type: ApplicationCommandOptionType.User,
            required: true,
        },
    ],
execute: async (client, interaction, args) => {
    const target = interaction.options.getMember('membre');

    const x = Date.now() - target.user.createdTimestamp;
    const created = Math.floor(x / 86400000);
    const memberJoinedAt = target.joinedTimestamp ? Date.now() - target.joinedTimestamp : Date.now();
    const memberjoined = Math.floor(memberJoinedAt / 86400000)

    const row_0 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('mod_mute')
                .setEmoji('🔇')
                .setLabel("Rendre muet l'utilisateur")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('mod_warn')
                .setEmoji('🔔')
                .setLabel("Avertir l'utilisateur")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('mod_kick')
                .setEmoji('🚪')
                .setLabel("Expulser l'utilisateur")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('mod_ban')
                .setEmoji('🚫')
                .setLabel("Bannir l'utilisateur")
                .setStyle(ButtonStyle.Secondary),
        )

    const row_1 = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId('mod_voice_mute')
                .setEmoji('📞')
                .setLabel("Rendre muet l'utilisateur en vocal")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('mod_quarantine')
                .setEmoji('⛔')
                .setLabel("Mettre l'utilisateur en quarantaine")
                .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
                .setCustomId('mod_blacklist')
                .setEmoji('📜')
                .setLabel("Ajouter l'utilisateur a la liste noire")
                .setStyle(ButtonStyle.Danger),
        )

    return interaction.channel.send({
        content: `${interaction.member}`,
        embeds: [{
            color: Colors.Orange,
            title: `Panel de modération`,
            thumbnail :{
                url: `${target.user.displayAvatarURL({ dynamic: true })}`
            },
            description: `Ci-dessous ce situe la panel de modération conernant **${target.user.tag}**.`,
            fields: [
                {
                    name: `\u200b`,
                    value: `> **__Informations utilisateur:__**`
                },
                {
                    name: "`🏷️`",
                    value: `${target} (**${target.user.tag}**)`
                },
                {
                    name: "`🆔`",
                    value: `**${target.user.id}**`
                },
                {
                    name: "`⌛`",
                    value: `Crée le \`${moment(target.user.createdAt).format('DD/MM/YYYY')}\` (__Il y a \`${created}\` jour(s)__)\n Rejoins le \`${moment(target.user.joinedAt).format('DD/MM/YYYY')}\` (__Il y a \`${memberjoined}\` jour(s)__)`
                },
                {
                    name: `\u200b`,
                    value: `> **__Action mod. utilisateur:__**`
                },
            ]
        }],
        components: [ row_0, row_1 ]
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
                case 'mod_mute': {
                    const modal = new ModalBuilder()
                        .setCustomId('modal_mute')
                        .setTitle(`Rendre muet l'utilisateur ${target.user.tag}`);

                    const question_0 = new TextInputBuilder()
                        .setCustomId('time')
                        .setLabel("Combien de jour voulez-vous le rendre muet ?")
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)

                    const question_1 = new TextInputBuilder()
                        .setCustomId('reason')
                        .setLabel('Raison')
                        .setMinLength(5)
                        .setMaxLength(255)
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(false)

                    const user_infos = new TextInputBuilder()
                        .setCustomId('user')
                        .setLabel('Utilisateur')
                        .setValue(`${target.user.id}`)
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)

                    const firstQuestion = new ActionRowBuilder().addComponents(question_0);
                    const secondQuestion = new ActionRowBuilder().addComponents(question_1);
                    const userInfos = new ActionRowBuilder().addComponents(user_infos);

                    modal.addComponents(firstQuestion, secondQuestion, userInfos);

                    await interaction.showModal(modal);

                    await Buttons();

                    break;
                }

                case 'mod_warn': {
                    const modal = new ModalBuilder()
                        .setCustomId('modal_warn')
                        .setTitle(`Avertir l'utilisateur ${target.user.tag}`);

                    const qst_0 = new TextInputBuilder()
                        .setCustomId('reason')
                        .setLabel("Raison")
                        .setMinLength(5)
                        .setMaxLength(100)
                        .setStyle(TextInputStyle.Paragraph)
                        .setRequired(true)

                    const user_infos = new TextInputBuilder()
                        .setCustomId('user')
                        .setLabel('Utilisateur')
                        .setValue(`${target.user.id}`)
                        .setStyle(TextInputStyle.Short)
                        .setRequired(true)

                    const firstQuestion = new ActionRowBuilder().addComponents(qst_0);
                    const UserInfos = new ActionRowBuilder().addComponents(user_infos);

                    modal.addComponents(firstQuestion, UserInfos);

                    await interaction.showModal(modal);

                    await Buttons();

                    break;
                }

                case 'mod_kick': {
                    interaction.channel.send({ content: `\`[✅]\` ${interaction.member} vous venez d'expulser **${target.user.tag}**.` }).then(async (msg) => {
                        try {
                            await target.kick({ reason: `[Mod.] Expulser par ${interaction.user.tag} (${interaction.user.id}).` })
                        } catch(err) {
                            msg.edit({ content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.` })
                        }
                    })
                    await Buttons();

                    break;
                }

                case 'mod_ban': {
                    interaction.channel.send({ content: `\`[✅]\` ${interaction.member} vous venez de bannir **${target.user.tag}**.` }).then(async (msg) => {
                        try {
                            await target.ban({ reason: `[Mod.] Banni par ${interaction.user.tag} (${interaction.user.id}).` })
                        } catch(err) {
                            msg.edit({ content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.` })
                        }
                    })
                    break;
                }

                case 'mod_voice_mute': {
                    const { channel } = target.voice;
                    if(channel) {
                        target.voice.setMute().then(async () => {
                            await target.voice.setDeaf(true).then(async () => {
                                interaction.channel.send({ content: `\`[✅]\` ${interaction.member} l'utilisateur **${target.user.tag}** vient d'être rendu muet dans ${interaction.guild.channels.cache.get(channel.id)}.` })
                            })
                        })
                    } else {
                        interaction.channel.send({ content: `\`[❌]\` ${interaction.member} l'utilisateur **${target.user.tag}** n'est pas en vocal.` })
                    }
                    await Buttons();

                    break;
                }

                case 'mod_quarantine': {
                    interaction.channel.send({ content: `\`[✅]\` ${interaction.member} vous venez de mettre en quarantaine **${target.user.tag}**.` }).then(async (msg) => {
                        const c = interaction.guild.channels.cache.get('1081082891511025715');

                        await interaction.guild.channels.cache.forEach(async (channel) => {
                            channel.permissionOverwrites.edit([
                                {
                                    id: target.user.id,
                                    deny: [ PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.SendMessages, PermissionsBitField.Flags.Connect ]
                                }
                            ])
                        })

                        if(target.voice) await target.voice.disconnect();

                        await c.permissionOverwrites.edit([
                            {
                                id: target.user.id,
                                allow: [ PermissionsBitField.Flags.ViewChannel ,PermissionsBitField.Flags.SendMessages ]
                            }
                        ])

                        await c.send({ content: `> L'utilisateur **${target.user.tag}** est désormais dans la quarantaine.` })
                    })

                    await Buttons();

                    break;
                }

                case 'mod_blacklist': {
                    interaction.channel.send({ content: `\`[✅]\` ${interaction.member} vous venez d'ajouter' **${target.user.tag}** à la liste noire.` }).then(async (msg) => {
                        const row = await db.get(`blacklist_${interaction.guild.id}.bl_users`);
                        
                        if(!row || row === null) {
                            await db.set(`blacklist_${interaction.guild.id}.bl_users`, [`${target.user.id}`]);
                        
                            try {
                                target.ban({ reason: `[Mod.] Blacklist par ${interaction.user.tag} (${interaction.user.id}).`})
                            } catch(err) {
                                msg.edit({ content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.` })
                            }
                        } else {
                            await db.push(`blacklist_${interaction.guild.id}.bl_users`, `${target.user.id}`);

                            try {
                                target.ban({ reason: `[Mod.] Blacklist par ${interaction.user.tag} (${interaction.user.id}).`})
                            } catch(err) {
                                msg.edit({ content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.` })
                            }
                        }
                    })

                    await Buttons();

                    break;
                }
            }
        }
    })

    }
}