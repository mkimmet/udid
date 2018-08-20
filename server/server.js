// server.js
// load the server resource and route GET method
const server = require('server');
const { get, socket } = require('server/router');

// get server port from environment or default to 3000
const port = process.env.PORT || 3000;

server({ port }, [
    get('/:id', ctx => {
        //'<h1>Hello you!</h1>'
        //socket('message', ctx => {
            // Send the message to every socket
            //ctx.io.emit('message', "MESSAGE RECEIVED");
            console.log(ctx.params.id);
            ctx.io.to(ctx.params.id).emit('message',"HELLO");
          //});
          return '<h1>Hello you!</h1>';
    }),
    socket('join', ctx => {
        // Send the message to every socket
        ctx.socket.join(ctx.data);
        console.log("-"+ ctx.data+ "-");
      }),
    socket('message', ctx => {
      // Send the message to every socket
      ctx.io.emit('message', ctx.data);
      
    }),
    socket('connect', ctx => {
      console.log('client connected', Object.keys(ctx.io.sockets.sockets));
      ctx.io.emit('count', {msg: 'HI U', count: Object.keys(ctx.io.sockets.sockets).length});
    })
  ])
    .then(() => console.log(`Server running at http://localhost:${port}`));