import {Injectable, OnModuleInit} from "@nestjs/common";
import NextServer from 'next/dist/next-server/server/next-server'
import next from 'next'

@Injectable()
export class ViewService implements OnModuleInit {
    private server: NextServer

    async onModuleInit(): Promise<void> {
        try {
            this.server = next({ dev: true, dir: './src/client' })
        } catch (err) {
            console.error(err)
        }
    }

    getNextServer() : NextServer {
        return this.server
    }
}