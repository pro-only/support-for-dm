const Discord = require(`discord.js`);
const kahrbadata = require('../data.json');
const log = require(`../handlers/logHandler.js`);
const client = new Discord.Client();

module.exports = (client, msg) => {
  if (msg.author.bot) return;

  let guild = client.guilds.get(kahrbadata.guild);

  if (msg.guild === null) {
    if (guild.channels.exists('name', `dm-${msg.author.id}`)) {
      let c = guild.channels.find(channel => channel.name === `dm-${msg.author.id}`);
      msg.react('✅')
      c.send("**📨 Message From :" + msg.author +  "**\n\n```yaml\n" + msg.content + "\n```")
    } else {
      guild.createChannel(`dm-${msg.author.id}`, 'text').then(async c => {
        c.setParent(kahrbadata.ticket_category)

        let everyone = guild.id;
        let rolesupp = guild.roles.find("name", kahrbadata.SupportROLE);

        c.overwritePermissions(everyone, {
          READ_MESSAGES: false,
          SEND_MESSAGES: false
        })

        c.overwritePermissions(rolesupp, {
          READ_MESSAGES: true,
          SEND_MESSAGES: true
        })
        msg.react('✅')
        c.send("**🎟️ NEW TICKET ( BY: "+ msg.author +" )"+"**\n\n```yaml\n" + msg.content + "\n```")
      })
    }
  }

  if (!msg.content.startsWith(kahrbadata.prefix)) return;
  let command = msg.content.toLowerCase().split(' ')[0].slice(kahrbadata.prefix.length);
  let params = msg.content.split(' ').slice(1);
  let cmd;
  client.cmd = cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
      cmd.run(client, msg, params);
    }
  }
