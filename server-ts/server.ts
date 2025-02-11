import fs from "node:fs";
import next from "next";
import spdy from "spdy";
import express, { Request, Response } from "express";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))

config({path: `${__dirname}/.env`})

const args = process.argv.slice(2);
const dev = args.some(v => v === "dev");
const test = args.some(v => v === 'test');
console.log(args.find(v => v.match(/^port=/)) || 'no port')
const port = Number(args.find(v => v.match(/^port=/))?.substring(5)) || (dev ? 8082 : test ? 8083 : 8080);
const hostname = (dev || test) ? 'localhost' : process.env.NEXT_PUBLIC_HOSTNAME
const project = process.env.NEXT_PUBLIC_PROJECT
const app = next({ ...(dev ? {dev} : {}), hostname, port, dir: __dirname });

// const shouldCompress = (req: Request, res: Response) => {
//   // don't compress responses asking explicitly not
//   if (req.headers['x-no-compression']) {
//     return false
//   }

//   // use compression filter function
//   return compression.filter(req, res)
// }

const handler = app.getRequestHandler();

const exp = express()
// we might want to use this later for streaming requests. Right now, it's not needed
// exp.use(compression({filter: shouldCompress}))
// exp.get('/api/stream', (req, res) => {
//   res.write('hello')
//   res.write('world')
//   res.end()
// })
exp.all('*', (req, res) => {
  handler(req, res)
})

app.prepare().then(() => {

  const name = (dev || test) ? project : hostname
  spdy.createServer(  {
    key: (dev || test) && fs.existsSync(`${name}.key`) ? fs.readFileSync(`${name}.key`) : fs.readFileSync(`/var/www/html/certs/${name}/privkey.pem`),
    cert: (dev || test) && fs.existsSync(`${name}.crt`) ? fs.readFileSync(`${name}.crt`) : fs.readFileSync(`/var/www/html/certs/${name}/fullchain.pem`),
    ca: (dev || test) && fs.existsSync(`${name}.csr`) ? fs.readFileSync(`${name}.csr`) : fs.readFileSync(`/var/www/html/certs/${name}/chain.pem`)
  }, exp).listen(port, () => {
    console.log(`Listening on HTTPS port ${port}`);
  })

});