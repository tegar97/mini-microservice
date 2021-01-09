const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const axios = require('axios')
app.use(bodyParser.json());
app.use(cors())

const posts = {};
// QUCIK EXAMPLE

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const {
            id,
            title
        } = data;

        posts[id] = {
            id,
            title,
            comments: []
        };
    }

    if (type === 'CommentCreated') {
        const {
            id,
            content,
            postId,
            status
        } = data;
        const post = posts[postId];
        post.comments.push({
            id,
            content,
            status
        })
    }

    if (type === 'CommentUpdated') {
        const {
            id,
            content,
            postId,
            status
        } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => {
            return comment.id === id;
        })

        comment.status = status;
        comment.content = content;
    }
}
app.get('/posts', (req, res) => {
    res.send(posts)
})

app.post('/events', (req, res) => {
    const {
        type,
        data
    } = req.body;

    handleEvent(type, data);

    res.send({})
})

app.listen(4003, async () => {
    const res = await axios.get('http://event-bus-srv:4005/events');
    for (let event of res.data) {
        console.log('Processing event', event.type)

        handleEvent(event.type, event.data)
    }
    console.log('Listen on port 4003')
})