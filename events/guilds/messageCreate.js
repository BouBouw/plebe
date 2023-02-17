const db = require('quick.db');

module.exports = {
	name: 'messageCreate',
	once: false,
execute: async (message, client) => {
    await checkBoss();
    await levelSystem();

    async function checkBoss() {
        if(message.author.id === '853261887520505866') {
            if(message.content.includes('Bonjour') || message.content.includes('Salut') || message.content.includes('slt')) {
                message.reply({
                    content: `✨ Bonjour maître ${message.author}.`
                })
            }
        }
    }

    async function levelSystem() {
        if(message.author.bot) return;

        let initialExp = 399;

        async function checkLevel() {
            let exp = await db.fetch(`guild_${message.guild.id}_exp_${message.author.id}`);
            let rank = await db.fetch(`guild_${message.guild.id}_rank_${message.author.id}`);

            const nextLevelExp = initialExp * (Math.pow(2, rank) - 1);

            if(nextLevelExp <= exp) {
                await db.add(`guild_${message.guild.id}_rank_${message.author.id}`, 1);
                return message.guild.channels.cache.get('1040345632088530974').send({ content: `:tada: - ${message.author}, tu viens d'atteindre le niveau \`${db.fetch(`guild_${message.guild.id}_rank_${message.author.id}`)}\` !` })
            }
        }
        checkLevel();

        async function AddExp() {
            let rank = await db.fetch(`guild_${message.guild.id}_rank_${message.author.id}`);

            let randomExp = Math.floor((Math.random() * message.content.length) * 2);

            if(rank !== 0) {
                await db.add(`guild_${message.guild.id}_exp_${message.author.id}`, Number(randomExp))
            } else {
                await db.set(`guild_${message.guild.id}_rank_${message.author.id}`, 1);
                await db.add(`guild_${message.guild.id}_exp_${message.author.id}`, randomExp);
            }
        }
        AddExp();
    }

    }
}