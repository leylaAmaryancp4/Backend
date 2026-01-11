// 1. Create a TCP Chat Server
 let net = require('node:net');
 const PORT = 3001; 
 const MAX_CLIENTS = 10;
 let clients = {}; //userId: soket
let server = net.createServer((socket)=>{
 let userId = `User_${Math.floor( 1000 + Math.random()* 9000)}`;

 if (Object.keys(clients).length >= MAX_CLIENTS) {
    socket.write("Server is full, try again later.\n");
    socket.end();
    return;
 }
clients[userId] = socket;

  console.log(`${userId}  joined the chat`);
  socket.write(`Welcome  ${userId} \n`);

   socket.on('data',(data)=>{
    const message = data.toString().trim();
    handleMessage(userId, message);

   })
   socket.on('end',()=>{
    delete clients[userId];
    console.log(`${userId} disconnected`)

})

socket.on('error',()=>{
    delete clients[userId];
})

})

//2. Implement a Custom broadcast Function
  function broadcast(sender, message){
   for(let id in clients){
    if(id ===  sender) continue;
 

const socket = clients[id];
if(socket.destroyed){ // destroyed true -> connected chka 
    delete clients[id];
    continue;
}
socket.write(message  + '\n');
}
  }

  // 3. Implement Private Messaging
   function handleMessage(sender, message){
    if(!message.startsWith('@')){
        broadcast(sender, message);
        return;
    }
    const [target, ...text] = message.slice(1).split(' ');
    const socket = clients[target];

    if(!socket || socket.destroyed){
        return clients[sender].write(` User ${target} not found`);
}
socket.write(` From ${sender}.${text.join(' ')}\n`);
   }

   
 
server.listen(PORT,()=>{
    console.log(`TCP chat server runs on PORT ${ PORT}`);
  })  

  
  

