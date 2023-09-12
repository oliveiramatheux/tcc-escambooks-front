import { io } from 'socket.io-client'
import config from './index'

export const socket = io(config.socketServiceUrl || '', {
  autoConnect: false
})
