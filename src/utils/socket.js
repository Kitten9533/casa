import IO from 'socket.io-client';
import config from '../../config/server.conf.js'

const socket = new IO(config.server, {});
export default socket