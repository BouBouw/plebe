const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const db = require('quick.db');

module.exports = {
	name: 'interactionCreate',
	once: false,
execute: async (interaction, client) => {
    if (!interaction.isButton()) return;
    openChest();

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