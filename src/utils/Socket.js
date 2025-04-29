
const socket = require("socket.io");


const initializeServer = (server)=>{
    const io = socket(server, {
            cors:{
                origin: "http://localhost:5173",
                credentials:true,
            },
    });

    io.on("connection" , (socket)=>{
        socket.on("joinChat", ()=>{});

        socket.on("sendmessage", ()=>{});

        socket.on("disconnect", ()=>{});
    })

}

module.exports = initializeServer;