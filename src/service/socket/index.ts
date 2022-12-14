/* eslint-disable */
import React from 'react'
import { io, Socket } from 'socket.io-client'
import { config } from '../../config'
import { ChatEvent, PresentationEvent } from './event'

export class SocketService {
    readonly socket: Socket
    constructor() {
        this.socket = io(config.socket.SERVER_URL || 'http://localhost:3300', {
            autoConnect: false,
        })
    }

    getSocket(): Socket {
        return this.socket
    }

    establishConnection() {
        this.socket.connect()
        // Try to reconnect
        this.socket.on('connect_error', () => {
            setTimeout(() => {
                this.socket.connect()
            }, 1000)
        })
        this.socket.on(PresentationEvent.DISCONNECT, (reason) => {
            throw new Error(reason)
        })
    }

    disconnect() {
        this.socket.disconnect()
    }
}

export const socketService = new SocketService()
export const SocketContext = React.createContext(socketService)
