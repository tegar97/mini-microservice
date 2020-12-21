const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')

const app = express();
app.use(bodyParser.json())

let events = []
app.post('/events',async (req,res) =>{
    const event = req.body;
    events.push(event)
    await axios.post('http://localhost:4002/events',event)
 
    await axios.post('http://localhost:4000/events',event)
    await axios.post('http://localhost:4003/events',event)
    await axios.post('http://localhost:4004/events',event)

    res.send({status: 'OKKKK'})
})

app.get('/events',(req,res) =>{
    res.send(events)
})


app.listen(4005,() => {
    console.log('Listening On 4005')
})