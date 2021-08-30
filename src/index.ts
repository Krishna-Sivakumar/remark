import express from 'express';
import cors from 'cors';
import { Comment } from './utils'
import { insertComment, getComments } from './database';

const app = express()
app.use(cors())
app.use(express.json())

app.get('/:urlhash', async (request, response) => {
    // Returns comments in a URL
    try {
        let comments = await getComments(request.params.urlhash)
        response.json(comments)
    } catch (err) {
        response.status(404).json({ message: err })
    }
})

app.post('/:urlhash', async (request, response) => {
    // Add comment to a URL
    const urlhash = request.params.urlhash

    let comment: Comment = {
        parent: null,
        urlhash: urlhash,
        ...request.body
    }

    try {
        let status = await insertComment(comment)

        if (status.success) {
            response.json({ id: status.id })
        } else {
            response.status(404).json({
                id: null,
                message: status.message
            })
        }

    } catch (err) {
        response.status(404).json({ message: err })
    }
})

app.listen(5000, () => {
    console.log(`listening on port ${5000}`)
})
