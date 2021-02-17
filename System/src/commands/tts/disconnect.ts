import {Command} from "discord-akairo";

export default class extends Command {
    constructor() {
        super('disconnect', {
            aliases: ['연결해제']
        });
    }
    async exec(message) {
        if (!message.member?.voice?.channel) return message.reply('먼저 음성채널에 들어가주세요!')
        await message.member.voice.channel.leave()
        message.react('✅')
    }
}