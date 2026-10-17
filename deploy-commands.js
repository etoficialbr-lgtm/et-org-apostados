
const { REST, Routes, SlashCommandBuilder } = require("discord.js");

const commands = [
  new SlashCommandBuilder()
    .setName("painel")
    .setDescription("Abrir o painel ADM do ET Org Apostados")
    .toJSON()
];

const rest = new REST({ version: "10" })
  .setToken(process.env.DISCORD_TOKEN);

rest.put(
  Routes.applicationGuildCommands(
    process.env.CLIENT_ID,
    process.env.GUILD_ID
  ),
  { body: commands }
)
  .then(() => console.log("Comando /painel registrado!"))
  .catch(console.error);
