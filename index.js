const express = require("express")
const Heroku = require("heroku-client")

const app = express()

app.post("/restart/:appName", async (req, res, next) => {
  var appName = req.params.appName,
    privateKey = req.headers["x-user-key"]

  if (privateKey !== process.env.PRIVATE_KEY) return res.sendStatus(401)

  var api = new Heroku({ token: process.env.HEROKU_API_TOKEN })

  const restart = await api.delete(`/apps/${appName}/dynos`)
  res.send(restart)
})

app.listen(process.env.PORT)
