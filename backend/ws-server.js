const WebSocket = require('ws')

// A WebSocket server on port 8080
const wss = new WebSocket.WebSocketServer({port: 8080})

// A function to broadcastig a message to all connected clients
function broadcast(message){
    wss.clients.forEach(function each(client){
        if(client.readyState === WebSocket.OPEN){
            client.send(message)
        }
    })
}

// We set an interval to send a "Hello" message every 1 second
setInterval(()=>{
    broadcast(
        `{"time" : "${new Date().toLocaleTimeString()}", "message": "Hello"}`
    )
}, 1000)

console.log("WebSocket server started on ws://localhost: 8080")