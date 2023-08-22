const express = require('express')
const app = express()

let port = 8080

app.get('/', (req, res) => {
  res.send('Welcome')
})

app.listen(port, (req, res) => {
  console.log('listening on')
})