const { ChannelType } = require('discord.js');
const { ChatGPTApi } = require("chatgpt-api-client");
const db = require('quick.db');

module.exports = {
	name: 'messageCreate',
	once: false,
execute: async (message, client) => {
    if(!message.guild || message.channel.type === ChannelType.DM) return;
    // if(message.author.id === '853261887520505866') return await db.delete(`guild_${message.guild.id}_${message.author.id}.islands`);
    // console.log(db.get(`guild_${message.guild.id}_${message.author.id}.islands`))
    // await AI();

    await Adventure();

    async function AI() {
        let target = message.author;
        let value = message.content;

        if(message.author.bot) return;
        if(message.content.includes("@here") || message.content.includes("@everyone")) return;

        if(message.mentions.has(client.user.id)) {
            const api = new ChatGPTApi({ apiKey: "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" });

            const response = await api.sendMessage({
                prompt: value.replace("<@1037473266480201798>", ""),
            });
            
            message.reply({ content: `${response.choices[0].text}`});
        }
    }

    async function Adventure() {
        let rank = await db.fetch(`guild_${message.guild.id}_rank_${message.author.id}`);

        switch(rank) {
            case 5: {
                let row = await db.get(`guild_${message.guild.id}_${message.author.id}.islands`);
                if(!row || row == null) {
                    db.set(`guild_${message.guild.id}_${message.author.id}.islands`, ['utopia']);

                    return message.reply({
                        content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Utopia**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                    })
                } else {
                    if(row.includes('utopia')) {
                        return;
                    } else {
                        db.push(`guild_${message.guild.id}_${message.author.id}.islands`, 'utopia');

                        message.reply({
                            content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Utopia**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                        })
                    }
                }
                break;
            }

            case 10: {
                let row = await db.get(`guild_${message.guild.id}_${message.author.id}.islands`);
                if(!row || row == null) {
                    db.set(`guild_${message.guild.id}_${message.author.id}.islands`, ['utopia', 'avalon']);

                    return message.reply({
                        content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Avalon**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                    })
                } else {
                    if(row.includes('avalon')) {
                        return;
                    } else {
                        db.push(`guild_${message.guild.id}_${message.author.id}.islands`, 'avalon');

                        message.reply({
                            content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Avalon**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                        })
                    }
                }
                break;
            }

            case 20: {
                let row = await db.get(`guild_${message.guild.id}_${message.author.id}.islands`);
                if(!row || row == null) {
                    db.set(`guild_${message.guild.id}_${message.author.id}.islands`, ['utopia', 'avalon', 'baltia']);

                    return message.reply({
                        content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Baltia**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                    })
                } else {
                    if(row.includes('baltia')) {
                        return;
                    } else {
                        db.push(`guild_${message.guild.id}_${message.author.id}.islands`, 'baltia');

                        message.reply({
                            content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Baltia**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                        })
                    }
                }
                break;
            }

            case 30: {
                let row = await db.get(`guild_${message.guild.id}_${message.author.id}.islands`);
                if(!row || row == null) {
                    db.set(`guild_${message.guild.id}_${message.author.id}.islands`, ['utopia', 'avalon', 'baltia', 'brittia']);

                    return message.reply({
                        content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Brittia**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                    })
                } else {
                    if(row.includes('brittia')) {
                        return;
                    } else {
                        db.push(`guild_${message.guild.id}_${message.author.id}.islands`, 'brittia');

                        message.reply({
                            content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Brittia**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                        })
                    }
                }
                break;
            }

            case 40: {
                let row = await db.get(`guild_${message.guild.id}_${message.author.id}.islands`);
                if(!row || row == null) {
                    db.set(`guild_${message.guild.id}_${message.author.id}.islands`, ['utopia', 'avalon', 'baltia', 'brittia', 'alcatraz']);

                    return message.reply({
                        content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Alcatraz**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                    })
                } else {
                    if(row.includes('alcatraz')) {
                        return;
                    } else {
                        db.push(`guild_${message.guild.id}_${message.author.id}.islands`, 'alcatraz');

                        message.reply({
                            content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Alcatraz**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                        })
                    }
                }
                break;
            }

            case 50: {
                let row = await db.get(`guild_${message.guild.id}_${message.author.id}.islands`);
                if(!row || row == null) {
                    db.set(`guild_${message.guild.id}_${message.author.id}.islands`, ['utopia', 'avalon', 'baltia', 'brittia', 'alcatraz', 'pyrallis']);

                    return message.reply({
                        content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Pyrallis**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                    })
                } else {
                    if(row.includes('pyrallis')) {
                        return;
                    } else {
                        db.push(`guild_${message.guild.id}_${message.author.id}.islands`, 'pyrallis');

                        message.reply({
                            content: `\`[🗺️]\` ${message.author} vous avez désormais accès à l'île **Pyrallis**. Utilisez votre bateau pour vous y rendre et commencer vos quêtes.`
                        })
                    }
                }
                break;
            }
        }
    }

    }
}