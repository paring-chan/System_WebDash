import {Command} from "discord-akairo";
import * as googleTTS from 'google-tts-api'
import {Collection, Guild} from "discord.js";

class TTSPlayer {
    guild: Guild
    constructor(guild: Guild) {
        this.guild = guild
    }
    queue: string[] = []
    playing = false

    say(text: string) {
        const urls = googleTTS.getAllAudioUrls(text, {
            lang: 'ko-KR',
        })
        urls.forEach(v => this.queue.push(v.url))
        this.execute()
    }

    execute() {
        if (this.playing) return
        const i = this.queue.shift()
        if (!i) return
        const voice = this.guild.me.voice
        if (!voice) return
        voice.connection.play(i).once('finish', () => {
            this.execute()
            this.playing = false
        })
    }
}

export default class Say extends Command {
    static playerMap: Collection<Guild, TTSPlayer> = new Collection()

    constructor() {
        super('say', {
            aliases: ['say'],
            args: [
                {
                    id: 'args',
                    type: 'string',
                    prompt: {
                        start: '제가 TTS로 말할 문장을 입력해주세요!',
                        retry: '제가 TTS로 말할 문장을 입력해주세요!'
                    },
                    match: 'rest'
                }
            ],
            clientPermissions: [
                'CONNECT',
                'SPEAK'
            ]
        });
    }
    async exec(msg, {args} : {args: string}) {
        if (!msg.member?.voice?.channel) return msg.reply('먼저 음성채널에 들어가주세요!')
        let player = Say.playerMap.get(msg.guild)
        if (!player) {
            player = new TTSPlayer(msg.guild)
            Say.playerMap.set(msg.guild, player)
        }
        await msg.member.voice.channel.join()
        player.say(args)
        msg.react('✅')
    }
}