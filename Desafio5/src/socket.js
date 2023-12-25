import messageModel from "./dao/models/message.model.js";

export default (io) => {
  const connectedUsers = new Set();

  const getMessages = async () => {
    try {
      const messages = await messageModel.find();
      io.to(socket.id).emit("server:messages", messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const updateUserList = () => {
    const connectedUsersArray = Array.from(connectedUsers);
    io.emit("server:userList", connectedUsersArray);
  };

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    connectedUsers.add(socket.id);
    io.emit("server:users", Array.from(connectedUsers));

    socket.on("auth", (user) => {
      console.log("User authenticated:", user);
      connectedUsers.add(user);
      io.emit("server:users", Array.from(connectedUsers));
    });

    getMessages();
    updateUserList();

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      connectedUsers.delete(socket.id);
      updateUserList();
    });

    socket.on("client:newMessage", async (data) => {
      try {
        const newMessage = new messageModel(data);
        const result = await newMessage.save();
        io.emit("server:newMessage", result);
      } catch (error) {
        console.error("Error saving new message:", error);
      }
    });
  });
};
