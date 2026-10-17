
const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events
} = require("discord.js");

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Configure os IDs dos administradores no GitHub Secrets.
// Nunca coloque o token diretamente neste arquivo.
const ADMINS = (process.env.ADMINS || "")
  .split(",")
  .map(id => id.trim())
  .filter(Boolean);

let servicoAtivo = false;

client.once(Events.ClientReady, (bot) => {
  console.log(`ET Org Apostados conectado como ${bot.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand() &&
      !interaction.isButton()) return;

  if (interaction.isChatInputCommand()) {
    if (interaction.commandName !== "painel") return;

    if (!ADMINS.includes(interaction.user.id)) {
      return interaction.reply({
        content: "⛔ Somente administradores autorizados podem abrir o painel.",
        ephemeral: true
      });
    }

    const embed = new EmbedBuilder()
      .setColor(0x7B2CFF)
      .setTitle("👽 ET ORG — PAINEL ADM")
      .setDescription(
        `**Serviço:** ${servicoAtivo ? "🟢 ATIVO" : "🔴 PAUSADO"}\n\n` +
        "⚔️ Gerencie o serviço de novas partidas.\n" +
        "💰 Configure pagamentos em uma próxima etapa.\n" +
        "🏆 Consulte o ranking quando estiver implementado."
      )
      .setFooter({ text: "ET Org Apostados • Administração" });

    const botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("alternar_servico")
        .setLabel(servicoAtivo ? "Pausar serviço" : "Ativar serviço")
        .setStyle(servicoAtivo ? ButtonStyle.Danger : ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("ver_status")
        .setLabel("Ver status")
        .setStyle(ButtonStyle.Primary)
    );

    return interaction.reply({
      embeds: [embed],
      components: [botoes],
      ephemeral: true
    });
  }

  if (!ADMINS.includes(interaction.user.id)) {
    return interaction.reply({
      content: "⛔ Você não tem autorização para usar este botão.",
      ephemeral: true
    });
  }

  if (interaction.customId === "alternar_servico") {
    servicoAtivo = !servicoAtivo;

    const embed = new EmbedBuilder()
      .setColor(servicoAtivo ? 0x22C55E : 0xEF4444)
      .setTitle("👽 ET ORG — PAINEL ADM")
      .setDescription(
        `**Serviço:** ${servicoAtivo ? "🟢 ATIVO" : "🔴 PAUSADO"}`
      );

    const botoes = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("alternar_servico")
        .setLabel(servicoAtivo ? "Pausar serviço" : "Ativar serviço")
        .setStyle(servicoAtivo ? ButtonStyle.Danger : ButtonStyle.Success),
      new ButtonBuilder()
        .setCustomId("ver_status")
        .setLabel("Ver status")
        .setStyle(ButtonStyle.Primary)
    );

    return interaction.update({
      embeds: [embed],
      components: [botoes]
    });
  }

  if (interaction.customId === "ver_status") {
    return interaction.reply({
      content: `Status do serviço: ${servicoAtivo ? "🟢 ATIVO" : "🔴 PAUSADO"}`,
      ephemeral: true
    });
  }
});

client.login(process.env.DISCORD_TOKEN);

