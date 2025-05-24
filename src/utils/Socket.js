
const socket = require("socket.io");
const crypto = require('crypto');
const { Chat } = require("../model/Chat");



// Crypto is for secure our roomId
const getSecureRoomid = ( userID, target_id ) => {
    return crypto
        .createHash("sha256")
        .update([userID, target_id].sort().join("_"))
        .digest("hex");
}



const initializeServer = (server) => {

    // set up the websocket server on the same http server
    // so the HTTP and WebSocket share the same port
    const io = socket(server, {
        cors: {
            origin: "http://localhost:5173",
            credentials: true,
        },
    });

    // Setup an event listener for new socket connection from clients
    io.on("connection", (socket) => {
        socket.on("joinChat", ({ firstName, userID, target_id}) => {
            const roomId = getSecureRoomid(userID, target_id);
            console.log(roomId);

            console.log(firstName + " joined Room " + roomId);
            socket.join(roomId);
        });

        socket.on("sendmessage", async ({ firstName, userID, target_id, text }) => {
            try {
                const roomId = getSecureRoomid(userID, target_id);
               
                console.log(firstName + " " + text);

                // check whether our USERID and Target_id are friends


                let chat = await Chat.findOne({
                    participents: { $all: [userID, target_id] },
                });
        
                // save message to the database
                if (!chat) {
                    chat = new Chat({
                        participents: [userID, target_id],
                        message: [],
                    });
                }

                chat.message.push({
                    senderId: userID,
                    text,
                });

                await chat.save();
                // ToDo: CHeck if userId and senderId are friends?
                console.log(firstName + " = " + roomId);
                io.to(roomId).emit("messageReceived", { firstName, text, TimeStamp: new Date() });
            }
            catch (err) {
                console.log(err);
            }

        });

        socket.on("disconnect", () => {});
    });

};

module.exports = initializeServer;


