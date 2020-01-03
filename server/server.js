const http = require('follow-redirects').http
const fs = require('fs')
const express = require('express')
const app = express()


app.get('/', (req, res) => {
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

  let request = http.request(options, function (response) {
    let chunks = [];

    response.on("data", function (chunk) {
      chunks.push(chunk);
    });

    response.on("end", function (chunk) {
      let body = Buffer.concat(chunks);
      console.log("sending body")
      res.header("Access-Control-Allow-Origin", "*")
      res.set('Content-Type', 'text/xml')
      res.send(body.toString())
    })

    response.on("error", function (error) {
      console.error(error)
    })
  })

  request.end()
})

app.listen(8080)
console.log("server running")