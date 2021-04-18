/* eslint-disable no-console */
import http from 'http'

const options = {
  method: 'get',
  host: 'localhost',
  path: '/liveliness',
  port: process.env.PORT,
  timeout: 2000,
}

const request = http
  .request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`)

    if (res.statusCode == 200) process.exit(0)
    process.exit(1)
  })
  .on('error', function (err) {
    console.log('ERROR: ', err)
    process.exit(1)
  })

request.end()
