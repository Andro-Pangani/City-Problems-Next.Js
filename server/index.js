const express = require('express');
const next = require('next');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const cookieParser = require('cookie-parser');
const numeral = require('numeral');

// [FUNCTION TO CHECK FOR => ]
// [MEMORY LEAK <== ]
// ==>
// setInterval(() => {
//   const { rss, heapTotal } = process.memoryUsage();

//   console.log(
//     'rss',
//     numeral(rss).format('0.0 ib'),
//     'heapTotal',
//     numeral(heapTotal).format('0. 0 ib')
//   );
// }, 5000);
// <==

console.log(process.env.NODE_ENV, ' ###### NODE ENV');

const bodyParser = require('body-parser');

// COOKIE SECURITY
// IF USER WILL CHANGE COOKIES

const COOKIE_SECRET = 'Q323421341ASDFFASD3235AWAEDFA';
exports.COOKIE_OPTIONS = {
  httpOnly: true,
  secure: !dev,
  signed: true,
};
//         * FIREBASE SETUP *

const admin = require('firebase-admin');

const mail = require('./keys/keys').mail;
const privateKey = require('./keys/keys').privateKey.replace(/\\n/g, '\n');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: 'deligation-40179',
    client_email: mail,
    private_key: privateKey,
  }),
});

const routes = require('./routes');

app.prepare().then(() => {
  const server = express();

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: false }));
  server.use(cookieParser(COOKIE_SECRET));
  server.use(express.json());

  server.use('/', routes);

  server.get('/a', (req, res) => {
    return res.send('Hello from /a route');
  });

  server.get('/api/tv', async (req, res) => {
    console.log('we are hereon api route');

    try {
      const response = await fetch('http://api.tvmaze.com/shows?page=1');

      const data = await response.json();
      let i = 0;
      let sorted = [];
      while (i < 30) {
        sorted.push(data[i]);
        i++;
      }

      res.json(sorted);
    } catch (err) {
      console.log('###### Error Handler', err);
      throw err;
    }
  });

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query);
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
