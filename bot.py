
import os
import discord
from discord import app_commands

TOKEN = os.getenv("DISCORD_TOKEN")

intents = discord.Intents.default()
bot = discord.Client(intents=intents)
tree = app_commands.CommandTree(bot)


@bot.event
async def on_ready():
    await tree.sync()
    print(f"ET Org Apostados online: {bot.user}")


@tree.command(
    name="ping",
    description="Verifica se o ET Org Apostados está online"
)
async def ping(interaction: discord.Interaction):
    await interaction.response.send_message(
        "👽 ET Org Apostados está online!",
        ephemeral=True
    )


if not TOKEN:
    raise RuntimeError("Configure a variável DISCORD_TOKEN.")

bot.run(TOKEN)
