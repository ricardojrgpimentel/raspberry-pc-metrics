const http = require('follow-redirects').http
const fs = require('fs')
const express = require('express')
const app = express()


app.get('/', (req, res, next) => {
  console.log('get /')
  let options = {
    'method': 'GET',
    'hostname': 'localhost',
    'port': 82,
    'path': '/mahm',
    'headers': {
      'Authorization': 'Basic TVNJQWZ0ZXJidXJuZXI6MTIzNDU='
    },
    'maxRedirects': 20
  };

  let request = http.request(options, (response) => {
    let chunks = [];

    response.on("data", chunk => {
      chunks.push(chunk)
    })

    response.on("end", chunk => {
      let body = Buffer.concat(chunks);
      res.header("Access-Control-Allow-Origin", "*")
      res.set('Content-Type', 'text/xml')
      res.send(body.toString())
    })

    response.on("error", error => {
      throw new Error('BROKEN', error)
    })
  })
  request.on('error', error => {
    next(error)
  })
  request.end()
})

app.listen(8080)
console.log("server running")