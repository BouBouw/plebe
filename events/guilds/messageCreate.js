const db = require('quick.db');

module.exports = {
	name: 'messageCreate',
	once: false,
execute: async (message, client) => {
    await levelSystem();

    async function levelSystem() {
        if(message.author.bot) return;

        let initialExp = 399;

        let expUser = db.get(`guild_${message.guild.id}_exp_${message.author.id}`);
        let rankUser = db.get(`guild_${message.guild.id}_rank_${message.author.id}`);

        let randomExp = Math.floor((Math.random() * message.content.length) * 2);

        if(expUser === null && undefined) {
            await db.set(`guild_${message.guild.id}_exp_${message.author.id}`, 0)
            await db.set(`guild_${message.guild.id}_rank_${message.author.id}`, 0)
        } else {
            await db.add(`guild_${message.guild.id}_exp_${message.author.id}`, randomExp)

            if(rankUser === 0) {
                if(expUser === initialExp) {
                    await db.add(`guild_${message.guild.id}_rank_${message.author.id}`, 1)

                    let newRank = await db.get(`guild_${message.guild.id}_rank_${message.author.id}`)
                    return message.guild.channels.cache.get('1040345632088530974').send({ content: `:tada: - ${message.author}, tu viens d'atteindre le niveau \`${newRank}\` !` })
                }
            } else {
                await db.add(`guild_${message.guild.id}_exp_${message.author.id}`, randomExp)

                const nextLevelExp = initialExp * (Math.pow(2, rankUser) - 1);

                if(nextLevelExp < expUser) {
                    await db.add(`guild_${message.guild.id}_rank_${message.author.id}`, 1)

                    let newRank = await db.get(`guild_${message.guild.id}_rank_${message.author.id}`)
                    return message.guild.channels.cache.get('1040345632088530974').send({ content: `:tada: - ${message.author}, tu viens d'atteindre le niveau \`${newRank}\` !` })
                }
            }
        }
    }

    }
}