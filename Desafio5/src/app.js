// Imports
import express from 'express';
import { engine } from 'express-handlebars';
import { join } from 'path';
import { router as viewsRouter } from './routes/routes.views.js';
import { productsRouter } from './routes/routes.products.js';
import { cartsRouter } from './routes/routes.carts.js';
import { Server } from 'socket.io';
import { messagesModel } from './dao/models/messages.model.js'; // Ajusta la ruta si es necesario
import __dirname from './utils.js';
import mongoose from 'mongoose';

// Definitions
const PORT = 3000;
const viewFolder = join(__dirname, '/views');
const publicFolder = join(__dirname, '/public');
const app = express();
const server = app.listen(PORT, () => console.log('Server online on Port: ', PORT));
export const io = new Server(server);

// Methods
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', viewFolder);
app.use(express.static(publicFolder));
app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

async function connectDB() {
  try {
    await mongoose.connect("mongodb+srv://FranciscoAguilera:Coder1996@kampf96.kkrwrxi.mongodb.net/eccommerce?retryWrites=true&w=majority", { dbName: 'ecommerce' });
    console.log('DB Online');
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
}

async function getChats() {
  try {
    let result = await messagesModel.find();
    return result;
  } catch (error) {
    console.error('Error loading the chats:', error);
    throw error;
  }
}

async function saveChats({ sender, message }) {
  try {
    let result = await messagesModel.create({ email: sender, message: message });
    return result;
  } catch (error) {
    console.error('Error saving the chats:', error);
    throw error;
  }
}

// Init
connectDB();

let users = [];

io.on("connection", (socket) => {
  console.log(`New socket connected with ID: ${socket.id}`);
  socket.on("login", async (name) => {
    console.log("The user with the following ID has logged in: ", name);
    socket.broadcast.emit("newUser", name);
    users.push({ name, id: socket.id });
    let messagesDB = await getChats();
    console.log('Messages in the DB: ', messagesDB);
    socket.emit("getMessages", messagesDB);
  });

  socket.on("message", async (messageObj) => {
    console.log(
      `The user ${messageObj.sender} sent the following message: ${messageObj.message}`
    );
    io.emit("newMessage", messageObj);
    await saveChats(messageObj);
  });

  socket.on("disconnect", () => {
    let disconnectedUser = users.find((user) => user.id === socket.id);
    if (disconnectedUser) {
      io.emit("userDisconnect", disconnectedUser.name);
    }
  });
});
