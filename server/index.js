const express = require('express')
const next = require('next')


const port = parseInt(process.env.PORT, 10) || 3000 
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = express()

  server.get('/a', (req, res) => {
    return app.render(req, res, '/a', req.query)
  })

  server.get('/api/tv', async (req,res) => {
   console.log('we are hereon api route');

   try{
    const response = await fetch('http://api.tvmaze.com/shows?page=1');

   const data = await response.json();
   let i = 0;
   let sorted = [];
   while(i < 30){
    sorted.push(data[i]);
    i++;
   }
  
   res.json(sorted)

   } catch (err){
    console.log('###### Error Handler', err)
    throw err;
   }

  }) 

  server.get('/b', (req, res) => {
    return app.render(req, res, '/b', req.query)
  })

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})