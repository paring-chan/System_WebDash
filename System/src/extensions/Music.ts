// import {Module, Command, CTSContext, Listener} from "command.ts-rewrite";

// export default class extends Module {
//     @Listener('ready', 'ready')
//     async ready() {
//         this.client.manager.init(this.client.user!.id)
//         console.log(`${this.client.user!.tag} on Ready.`)
//     }

//     @Command({name: 'play', guildOnly: true, aliases: ['재생', 'p'], args: [{rest: true}]})
//     async play(ctx: CTSContext, arg: string) {
//         if (!ctx.message.guild) return
//         if (!ctx.member?.voice?.channel) return await ctx.reply('음성통화방에 참가후 다시 시도해주세요.')
//         if (!arg) return await ctx.reply('재생하실 영상의 Url, 또는 검색어를 포함해주세요.')
//         const player = this.client.manager.create({
//             guild: ctx.message.guild.id,
//             textChannel: ctx.message.channel.id,
//             voiceChannel: ctx.member.voice.channelID!
//         })
//         let res = await this.client.manager.search(arg, ctx.author)
//         if (res.loadType === 'NO_MATCHES') {
//             return ctx.reply('검색 결과가 없어요!')
//         } else if (res.loadType === 'LOAD_FAILED') {
//             return ctx.reply('로딩 실패: ' + res.exception.message)
//         } else if (res.loadType === 'PLAYLIST_LOADED') {
//             player.queue.add(res.tracks)
//             player.connect()
//             await ctx.reply(`재생목록이 추가되었습니다(곡 ${res.tracks.length}개)`)
//             if (!player.playing) await player.play()
//         } else {
//             const t = res.tracks[0]
//             player.queue.add(t)
//             player.connect()
//             await ctx.reply(`곡 \`${t.title}\`을(를) 재생할게요!`)
//             if (!player.playing) await player.play()
//         }
//     }

//     @Listener('raw', 'raw')
//     async raw(payload: any) {
//         this.client.manager.updateVoiceState(payload)
//     }
// }

