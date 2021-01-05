
module.exports = connectSockets
var msgs = {}
function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg=>{
           if(!msgs[socket.myTopic]) msgs[socket.myTopic] = []
           msgs[socket.myTopic].push(msg)
           console.log('///////////////////////')
            console.log('msgs: after', msgs)
            io.to(socket.myTopic).emit('chat addMsg', msg)
        })
        
        socket.on('chat topic', topic=>{
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic;

            if(msgs[topic]){
                console.log('In !!!');
                console.log('********topic:', topic)
                console.log('//////msgs:', msgs[topic])
            io.to(socket.myTopic).emit('history msg', msgs[topic]) 
            }
        })
        // user typing actions:
        socket.on('typing',user=>{
            const msg = user + ' ' + 'is typing...'
            io.to(socket.myTopic).emit('msg',msg)
            // io.to(socket.myTopic).emit('isTyping',true)
            socket.broadcast.emit('isTyping',true)
        })
        //reset 
        socket.on('reset is typing',()=>{
            // io.to(socket.myTopic).emit('isTyping',false)
            socket.broadcast.emit('isTyping',false)

        })
    })
}