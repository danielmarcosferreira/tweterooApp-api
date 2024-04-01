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
        return res.status(400).send({ error: "Insira todos os campos" })
    }

    const doesUserExist = users.find(user => user.username === username)
    if(doesUserExist) {
        res.status(409).send({ error: "Usuario ja existe" })
    }

    const newUser = {
        id: users.length + 1,
        username,
        avatar
    }

    users.push(newUser)
    return res.send({ message: "OK" })
})

app.get("/sign-up", (req, res) => {
    return res.send(users)
})

app.post("/tweets", (req, res) => {
    const {user} = req.headers
    const { tweet } = req.body;

    if (!user, !tweet) {
        return res.status(400).send({error: "Insira todos os campos"})
    }

    const newTweet = {
        id: tweets.length + 1,
        user,
        tweet
    }

    tweets.push(newTweet)
    return res.status(201).send({message: "OK"})
})

app.get("/tweets", (req, res) => {
    tweets.forEach(tweet => {
        const {avatar} = users.find(user => user.username === tweet.user)
        tweet.avatar = avatar
    })
    return res.send(tweets.slice(-10).reverse())
})

app.get("/tweets/:username", (req, res) => {
    const {username} = req.params

    const tweetsUser = tweets.filter((tweet) => tweet.username === username)

    return res.send(tweetsUser.reverse())
})

app.listen(4005, () => console.log("Server running in port 4005"));