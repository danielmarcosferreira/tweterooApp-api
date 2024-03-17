import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const users = []
const tweets = []

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body

    if (!username, !avatar) {
        console.log("Deu erro");
        return res.status(400).send("Insira todos os campos")
    }

    const newUser = {
        id: users.length + 1,
        username,
        avatar
    }

    users.push(newUser)
    return res.send("Deu bom")
})

app.get("/sign-up", (req, res) => {
    console.log("entrou aqui");
    return res.send(users)
})

app.post("/tweets", (req, res) => {
    const { username, tweet } = req.body;

    if (!username, !tweet) {
        console.log("entrou aqui");
        return res.status(400).send("Insira todos os campos")
    }

    const avatar = users.find((user) => user.username === username)?.avatar

    const newTweet = {
        id: tweets.length + 1,
        username,
        avatar,
        tweet
    }

    tweets.push(newTweet)
    return res.status(201).send("Deu bom")
})

app.get("/tweets", (req, res) => {
    return res.send(tweets)
})


app.listen(4000, () => console.log("Server running in port 4000"));