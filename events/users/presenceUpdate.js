module.exports = {
	name: 'presenceUpdate',
	once: false,
execute: async (oldPresence, newPresence, client) => {
    await helpRole();

    async function helpRole() {
        let status = newPresence.activities.map(a => a.state);
        if(status[0] && status[0].includes('.gg/plebe')) {
            await newPresence.member.roles.add('1077294295125606500')
            .catch((err) => { return; })
        } else {
            await newPresence.member.roles.remove('1077294295125606500')
            .catch((err) => { return; })
        }
    }

    }
}