const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('quick.db');
const fetch = require('node-fetch');
const ms = require('ms');

const config = require('../../config.json');

module.exports = {
	name: 'interactionCreate',
	once: false,
execute: async (interaction, client) => {
    await Modals();
    await Buttons();

    async function Modals() {
        if(!interaction.isModalSubmit()) return;

        switch(interaction.customId) {
            case 'modal_mute': {
                const target = interaction.guild.members.cache.get(interaction.fields.getTextInputValue('user'));

                const time = interaction.fields.getTextInputValue('time');
                const duration = ms(time);

                if(isNaN(ms(time))) return interaction.channel.send({ content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.` })
                if(duration > 2419200000 || duration < 10000) return interaction.channel.send({ content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.` })

                let validReason;
                const reason = interaction.fields.getTextInputValue('reason');
                if(!reason) {
                    validReason = `[Mod.] Rendu muet par ${interaction.user.tag} (${interaction.user.id}).`
                } else {
                    validReason = interaction.fields.getTextInputValue('reason');
                }

                if(target.isCommunicationDisabled()) return interaction.channel.send({ content: `\`[❌]\` ${interaction.member} l'utilisateur **${target.user.tag}** est déjà muet.` })
                target.disableCommunicationUntil(Date.now() + (duration), `${validReason}`).then(async () => {
                    return interaction.channel.send({ content: `\`[✅]\` ${interaction.member} l'utilisateur **${target.user.tag}** vient d'être rendu muet.` })
                })
                break;
            }

            case 'modal_warn': {
                const target = interaction.guild.members.cache.get(interaction.fields.getTextInputValue('user'));
                const reason = interaction.fields.getTextInputValue('reason');

                const row = await db.get(`guild_${interaction.guild.id}_${target.user.id}.warns`);
                if(!row || row === null) {
                    await db.set(`guild_${interaction.guild.id}_${target.user.id}.warns`, [`${reason}`]);
                    return interaction.channel.send({ content: `\`[✅]\` ${interaction.member} l'utilisateur **${target.user.tag}** vient d'être averti.` })
                } else {
                    await db.push(`guild_${interaction.guild.id}_${target.user.id}.warns`, `${reason}`);
                    interaction.channel.send({ content: `\`[✅]\` ${interaction.member} l'utilisateur **${target.user.tag}** vient d'être averti.` })
                }
                break;
            }
        } 
    }

    async function Buttons() {
        if(!interaction.isButton()) return;

        await Mods();
        await openChest();

        async function openChest() {
            const array = await db.get(`client_${client.user.id}_chestId`);
            if(!array) return;
            let _chestId = interaction.customId;
            if(array.includes(_chestId)) {
                interaction.reply({ content: `${interaction.member} vous venez d'ouvrir un coffre. Vous remportez le butin !`, ephemeral: true }).then(async () => {
                    const filtered = array.filter(id => id !== _chestId);
                    await db.set(`client_${client.user.id}_chestId`, filtered);

                    async function giveChestContent() {
                        let gold = Number(interaction.message.embeds[0].data.fields[1].value);
                        let wood = Number(interaction.message.embeds[0].data.fields[2].value);
                        let rock = Number(interaction.message.embeds[0].data.fields[3].value);

                        const userInventory = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);
                        if(!userInventory || userInventory === null) {
                            await db.set(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`, [`${gold}`, `${wood}`, `${rock}`]);
                        } else {
                            const row = await db.get(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`);

                            row[0] = Math.floor(row[0] + gold);
                            row[1] = Math.floor(row[1] + wood);
                            row[2] = Math.floor(row[2] + rock);

                            await db.set(`guild_${interaction.guild.id}_${interaction.user.id}.ressources`, row);
                        }
                    }
                    giveChestContent();

                    interaction.message.edit({
                        components: []
                    }).then(async (msg) => {
                        const row_0 = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder()
                                    .setCustomId('disable')
                                    .setLabel(`${interaction.user.tag}`)
                                    .setEmoji('👤')
                                    .setStyle(ButtonStyle.Success)
                                    .setDisabled(true)
                            )

                        msg.edit({
                            components: [ row_0 ]
                        })
                    })
                })
            }
        }

        async function Mods() {
            switch(interaction.customId) {
                case 'signal': {
                    const member = interaction.guild.members.cache.get(interaction.message.embeds[0].data.fields[1].value);

                    const row = await db.get(`blacklist_${interaction.guild.id}.bl_users`);
                    if(!row || row === null) {
                        await db.set(`blacklist_${interaction.guild.id}.bl_users`, [`${member.user.id}`]);
                    
                        return interaction.channel.send({
                            content: `\`[✅]\` ${interaction.member} vous venez d'ajouter **${member.user.tag}** sur la liste noire.`,
                            ephemeral: true
                        }).then(async (msg) => {
                            try {
                                await member.ban({ reason: `[AUTO-MOD] Membre sur la liste noire.` })
                            } catch(err) {
                                msg.edit({
                                    content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.`,
                                    ephemeral: true
                                })
                            }
                        })
                    } else {
                        await db.push(`blacklist_${interaction.guild.id}.bl_users`, `${member.user.id}`);

                        interaction.channel.send({
                            content: `\`[✅]\` ${interaction.member} vous venez d'ajouter **${member.user.tag}** sur la liste noire.`,
                            ephemeral: true
                        }).then(async (msg) => {
                            try {
                                await member.ban({ reason: `[AUTO-MOD] Membre sur la liste noire.` })
                            } catch(err) {
                                msg.edit({
                                    content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.`,
                                    ephemeral: true
                                })
                            }
                        })
                    }
                    break;
                }

                case 'ban': {
                    const member = interaction.guild.members.cache.get(interaction.message.embeds[0].data.fields[1].value);

                    interaction.channel.send({
                        content: `\`[✅]\` ${interaction.member} vous venez de bannir **${member.user.tag}**.`
                    }).then(async (msg) => {
                        try {
                            await member.ban({ reason: `[AUTO-MOD] Membre banni.` })
                        } catch(err) {
                            msg.edit({
                                content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.`,
                                ephemeral: true
                            })
                        }
                    })
                    break;
                }

                case 'informations': {
                    const member = interaction.guild.members.cache.get(interaction.message.embeds[0].data.fields[1].value);

                    const fetchUser = async () => {
                        const response = await fetch(`https://discord.com/api/v9/users/${interaction.message.embeds[0].data.fields[1].value}`, {
                            headers: {
                                Auhorization: `Bot ${config.token}`
                            }
                        })

                        switch(response.status) {
                            case 401: {
                                interaction.channel.send({
                                    content: `\`[⚠️]\` ${interaction.member} une erreur est survenue.`,
                                    ephemeral: true
                                })
                                break;
                            }
                        }
                        // return JSON.parse(await response.json());
                    }
                    fetchUser();
                    break;
                }

                case 'mute': {
                    const member = await interaction.guild.members.cache.get(interaction.message.embeds[0].data.fields[1].value);

                    const { channel } = member.voice;
                    if(channel) {
                        member.voice.setMute().then(async () => {
                            interaction.channel.send({ 
                                content: `\`[✅]\` ${interaction.member} l'utilisateur **${member.user.tag}** vient d'être rendu muet dans ${interaction.guild.channels.cache.get(channel.id)}.`
                            })
                        })
                    } else {
                        interaction.channel.send({
                            content: `\`[❌]\` ${interaction.member} l'utilisateur **${member.user.tag}** n'est pas en vocal.`
                        })
                    }
                    break;
                }

                case 'deafen': {
                    const member = await interaction.guild.members.cache.get(interaction.message.embeds[0].data.fields[1].value);

                    const { channel } = member.voice;
                    if(channel) {
                        member.voice.setDeaf(true).then(async () => {
                            interaction.channel.send({ 
                                content: `\`[✅]\` ${interaction.member} l'utilisateur **${member.user.tag}** vient d'être rendu sourd dans ${interaction.guild.channels.cache.get(channel.id)}.`
                            })
                        })
                    } else {
                        interaction.channel.send({
                            content: `\`[❌]\` ${interaction.member} l'utilisateur **${member.user.tag}** n'est pas en vocal.`
                        })
                    }
                    break;
                }

                case 'disconnect': {
                    const member = await interaction.guild.members.cache.get(interaction.message.embeds[0].data.fields[1].value);

                    const { channel } = member.voice;
                    if(channel) {
                        member.voice.disconnect().then(async () => {
                            interaction.channel.send({ 
                                content: `\`[✅]\` ${interaction.member} l'utilisateur **${member.user.tag}** vient d'être déconnecter de ${interaction.guild.channels.cache.get(channel.id)}.`
                            })
                        })
                    } else {
                        interaction.channel.send({
                            content: `\`[❌]\` ${interaction.member} l'utilisateur **${member.user.tag}** n'est pas en vocal.`
                        })
                    }
                    break;
                }
            }
        }

        switch(interaction.customId) {
            case 'men': {
                if(interaction.member.roles.cache.has('1075852830822383796')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('1075852830822383796')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('1075852830822383796');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('1075852830822383796')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('1075852830822383796');
                    })
                }
                break;
            }

            case 'women': {
                if(interaction.member.roles.cache.has('1075852852796346438')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('1075852852796346438')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('1075852852796346438');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('1075852852796346438')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('1075852852796346438');
                    })
                }
                break;
            }

            case 'other': {
                if(interaction.member.roles.cache.has('1075852873428123708')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('1075852873428123708')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('1075852873428123708');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('1075852873428123708')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('1075852873428123708');
                    })
                }
                break;
            }

            case 'minor': {
                if(interaction.member.roles.cache.has('964332612392992828')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964332612392992828')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964332612392992828');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964332612392992828')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964332612392992828');
                    })
                }
                break;
            }

            case 'major': {
                if(interaction.member.roles.cache.has('976569512226865154')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('976569512226865154')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('976569512226865154');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('976569512226865154')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('976569512226865154');
                    })
                }
                break;
            }

            case 'fr': {
                if(interaction.member.roles.cache.has('964591522685280277')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591522685280277')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964591522685280277');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591522685280277')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964591522685280277');
                    })
                }
                break;
            }

            case 'ch': {
                if(interaction.member.roles.cache.has('964592143731658784')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592143731658784')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964592143731658784');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592143731658784')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964592143731658784');
                    })
                }
                break;
            }

            case 'es': {
                if(interaction.member.roles.cache.has('964591974319542313')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591974319542313')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964591974319542313');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591974319542313')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964591974319542313');
                    })
                }
                break;
            }

            case 'al': {
                if(interaction.member.roles.cache.has('964591767188013076')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591767188013076')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964591767188013076');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591767188013076')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964591767188013076');
                    })
                }
                break;
            }

            case 'ma': {
                if(interaction.member.roles.cache.has('964591718068523018')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591718068523018')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964591718068523018');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591718068523018')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964591718068523018');
                    })
                }
                break;
            }

            case 'tn': {
                if(interaction.member.roles.cache.has('964591941264212040')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591941264212040')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964591941264212040');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591941264212040')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964591941264212040');
                    })
                }
                break;
            }

            case 'cn': {
                if(interaction.member.roles.cache.has('964592047489167391')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592047489167391')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964592047489167391');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592047489167391')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964592047489167391');
                    })
                }
                break;
            }

            case 'vi': {
                if(interaction.member.roles.cache.has('964592220818796655')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592220818796655')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964592220818796655');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592220818796655')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964592220818796655');
                    })
                }
                break;
            }

            case 'th': {
                if(interaction.member.roles.cache.has('964592278024884325')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592278024884325')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964592278024884325');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592278024884325')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964592278024884325');
                    })
                }
                break;
            }

            case 'tr': {
                if(interaction.member.roles.cache.has('964591838466031656')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591838466031656')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964591838466031656');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964591838466031656')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964591838466031656');
                    })
                }
                break;
            }

            case 'it': {
                if(interaction.member.roles.cache.has('964592460519059517')) {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592460519059517')} vous à été supprimer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.remove('964592460519059517');
                    })
                } else {
                    interaction.reply({ content: `${interaction.member} le rôle ${interaction.guild.roles.cache.get('964592460519059517')} vous à été attribuer.`, ephemeral: true }).then(async () => {
                        await interaction.member.roles.add('964592460519059517');
                    })
                }
                break;
            }
        }
    }

    }
}