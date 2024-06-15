const express = require('express')
const app = express()
const port = 3000

// Cors
const cors = require('cors')
app.use(cors())

// Simple JSON response endpoint
app.get('/json-response', (req, res) => {
    // res.json({message: "Hello!", time: new Date().toISOString()})
    res.status(500).json({message: "Error!"})
})

// Server-Sent Events endpoint (SSE)
app.get('/events', (req, res)=>{
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
    // Function to send a message
    const sendEvent = (data) => {
        const sseFormattedResponse = `data: ${JSON.stringify(data)}\n\n`
        res.write(sseFormattedResponse)
    }

    // Send an event every second
    const intervalId = setInterval(()=>{
        const message ={
            time: new Date().toLocaleDateString(),
            message: "This is a test event"
        }
        sendEvent(message)
    }, 1000)

    // Clear interval and close connection on client disconnect
    req.on("close", () => {
        clearInterval(intervalId)
        res.end()
    })
})


app.listen(port,()=>{
    console.log('listen port '+port)
})