const { Client, Intents, Collection, EmbedBuilder, GatewayIntentBits, Partials } = require('discord.js')
const moment = require('moment');
const date = require('date');
const fs = require('fs')
const config = require('./config.json');

let time = Date.now();
time = Math.round(time/1000);

const client = new Client({
  partials: [Partials.Message,
              Partials.GuildMember,
              Partials.User,
              Partials.Channel
            ],
  intents: [GatewayIntentBits.Guilds, 
            GatewayIntentBits.GuildMembers, 
            GatewayIntentBits.GuildPresences, 
            GatewayIntentBits.GuildMessages, 
            GatewayIntentBits.GuildMessageReactions, 
            GatewayIntentBits.GuildVoiceStates, 
            GatewayIntentBits.DirectMessages,
            GatewayIntentBits.MessageContent
          ]
  })

client.commands = new Collection();
client.aliases = new Collection();

client.login(config.token);

process.on('warning', (warning) => {
    console.log(warning.stack);
});


fs.readdir('./events/', (err, files) => {
    if (err)  throw err;

    for (const f of files.filter(f => f.endsWith('.js'))) {
        const event = require(`./events/${f}`);
        const eventName = f.split('.')[0];
        client.on(eventName, event.bind(null, client))
        delete require.cache[require.resolve(`./events/${f}`)]
        console.log(`-> ${f} chargé`)
    }
})

fs.readdir('./commands/', (err, files) => {
  if (err)  throw err;
  for (const command of files.filter(f => f.endsWith('.js'))) {
    const props = require(`./commands/${command}`)
    if(props.name){
      client.commands.set(props.name, props)
      console.log(`-> ${command} chargé`)
    } 

    if(props.aliases && Array.isArray(props.aliases)){
      props.aliases.forEach(alias => client.aliases.set(alias, props.name));
    }
  }
})
