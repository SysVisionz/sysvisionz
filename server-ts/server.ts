import fs from "node:fs";
import next from "next";
import compression from "compression";
import spdy from "spdy";
import express, { Request, Response } from "express";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { config } from 'dotenv'
import { set } from "mongoose";

const __dirname = dirname(fileURLToPath(import.meta.url))

config({path: `${__dirname}/.env`})

const args = process.argv.slice(2);
const dev = args.some(v => v === "dev");
const test = args.some(v => v === 'test');
const port = dev ? 8082 : test ? 8083 : Number(args.find(v => v.match(/^port=/))?.substring(5)) || 8096;
const hostname = (dev || test) ? 'localhost' : process.env.NEXT_PUBLIC_HOSTNAME
const project = process.env.NEXT_PUBLIC_PROJECT
// Init the Next app:
const app = next({ ...(dev ? {dev} : {}), hostname, port, dir: __dirname });

// Create the secure HTTPS server:
// Don't forget to create the keys for your (dev || test)elopment

const shouldCompress = (req: Request, res: Response) => {
  // don't compress responses asking explicitly not
  if (req.headers['x-no-compression']) {
    return false
  }

  // use compression filter function
  return compression.filter(req, res)
}

const handler = app.getRequestHandler();

const exp = express()
exp.use(compression({filter: shouldCompress}))
exp.get('/api/stream', (req, res) => {
  res.write('hello')
  res.write('world')
  setTimeout(() => {
    res.write('!')
    res.write('okay.')
    setTimeout(() => {
      res.end()
    }, 1000)
  }, 3000)
})
exp.all('*', (req, res) => {
  handler(req, res)
})

app.prepare().then(() => {

  const name = (dev || test) ? project : hostname
  spdy.createServer(  {
    key: (dev || test) && fs.existsSync(`${name}.key`) ? fs.readFileSync(`${name}.key`) : fs.readFileSync(`/etc/letsencrypt/live/${name}/privkey.pem`),
    cert: (dev || test) && fs.existsSync(`${name}.crt`) ? fs.readFileSync(`${name}.crt`) : fs.readFileSync(`/etc/letsencrypt/live/${name}/fullchain.pem`),
    ca: (dev || test) && fs.existsSync(`${name}.csr`) ? fs.readFileSync(`${name}.csr`) : fs.readFileSync(`/etc/letsencrypt/live/${name}/chain.pem`)
  }, exp).listen(port, () => {
    console.log(`Listening on HTTPS port ${port}`);
  })

  // server.on("error", (err) => console.error(err));
  
  // server.on("request", (req: Http2ServerRequest, res: Http2ServerResponse) => {
  //   const parsedUrl = parse(req.url, true);
  //   const stream = req.stream
  //   stream.on('data', (chunk) => {
  //     console.log(`received chunk: ${chunk.toString()}`)
  //   })
    
  //   handler(req as unknown as IncomingMessage, res as unknown as ServerResponse<IncomingMessage>, parsedUrl);
    
  //   // this is theoretically how the http/2 streaming would work. It's probably completely incorrect and sucks.
  //   // const parsedUrl = parse(req.url, true);
  //   // if (!parsedUrl.path.match(/^\/api\/stream/)){
  //   //   console.log('normal request received')
  //   //   console.log(parsedUrl.path)
  //   //   handler(req, res, parsedUrl);
  //   // }
  //   // else {
  //   //   openStreams.set(req.stream.id, req.stream)
  //   //   req.stream.on('streamClosed', () => {
  //   //     openStreams.delete(req.stream.id, req.stream)
  //   //   })
  //   //   const stream = req.stream
  //   //   stream.on('data', (chunk) => {
  //   //     console.log(`received chunk: ${chunk.toJSON()}`)
  //   //   })
  //   // }
  // });
  // server.listen(port);

  // console.log(`Listening on HTTPS port ${port}`);
});