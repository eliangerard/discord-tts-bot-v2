module.exports = {
	name: 'ready',
	once: true,
	async execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}, if a Channel was setted before reboot, I will grab it until the first message :)`);
	},
};