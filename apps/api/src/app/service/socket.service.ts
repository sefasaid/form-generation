import { Injectable } from '@nestjs/common';

import { Server } from 'socket.io';
@Injectable()
export class SocketService {
    private server!: Server;
    constructor(
    ) { }

    setServer(server: Server) {
        this.server = server;
    }


    sendMessage(sessionId: string, message: string, sender?: string) {
        this.server.to(sessionId).emit('message', { sender: sender || '', data: message });
    }

}
