const { ActivityType } = require('discord.js');
const constantes = require('../assets/constantes.json');
const aff_horaire = new Date();

module.exports = (client) => {
  console.log('je suis pret !')
  client.user.setPresence({activities: [{name: "Une question ? MP-moi !", type: ActivityType.Listening}], status: 'online'}); 
  
  client.channels.cache.get(constantes["office"]).send(`<@1071171895971557458> Je viens de redémarrer.`)
}
