const { Client, Collection, GatewayIntentBits } = require('discord.js');
const {MongoClient} = require('mongodb');
const fs = require('node:fs');
const path = require('node:path');

const client = new Client({ intents: 
    [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ] });
client.config = require("./config.json");
const uri = client.config.mongoDB.stringKey
client.mongo = new MongoClient(uri);
client.ttsChannel = null;
client.firstVerify = false;

const getFiles = (dirName) => {
    let files = [];
    const items = fs.readdirSync(dirName, { withFileTypes: true });

    items.forEach(item => {
        if (item.isDirectory()) {
            files = [
                ...files.filter(file => file.endsWith('.js')),
                ...(getFiles(`${dirName}/${item.name}`)),
            ];
        } else {
            files.push(`${dirName}/${item.name}`);
        }
    })

    return files;
};


client.commands = new Collection();
const commandFiles = getFiles('commands');
console.log(commandFiles);

commandFiles.forEach(file => {
	const filePath = path.join(__dirname, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
});

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
eventFiles.forEach(file => {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name,(...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
});

client.login(client.config.token);