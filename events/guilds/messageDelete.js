const db = require('quick.db');

module.exports = {
	name: 'messageDelete',
	once: false,
execute: async (message, client) => {
    await db.set(`snipe_${client.user.id}`, [`${message.author.id}`, `${message.content}`]);
    }
}