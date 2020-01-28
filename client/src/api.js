import io from 'socket.io-client'
import feathers from '@feathersjs/client'

const socket = io('http://localhost:3030')
const API = feathers()

API.configure(feathers.socketio(socket))
API.configure(feathers.authentication())

export default API
