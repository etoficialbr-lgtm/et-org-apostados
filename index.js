
const { Client, GatewayIntentBits, REST, Routes, SlashCommandBuilder } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

const commands = [
  new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Verifica se o ET Org Apostados está online')
].map(command => command.toJSON());

client.once('ready', async () => {
  console.log(`👽 ET Org Apostados online: ${client.user.tag}`);

  try {
    const rest = new REST({ version: '10' }).setToken(token);
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands }
    );
    console.log('Comando /ping registrado!');
  } catch (error) {
    console.error('Erro ao registrar comando:', error);
  }
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply({
      content: '👽 ET Org Apostados está online!',
      ephemeral: true
    });
  }
});

if (!token) {
  console.error('Configure a variável secreta DISCORD_TOKEN.');
  process.exit(1);
}

client.login(token);
