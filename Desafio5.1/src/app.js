import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import {Server} from 'socket.io'

import { router as vistasRouter } from './routes/vistasRouter.js';

const PORT=3000;

const app=express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,'/public')));

app.use('/', vistasRouter)


const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

const io = new Server(server)
let usuarios = [];
let mensajes = [];
io.on("connection", socket=>{
    console.log(`se ha conectado un cliente con id ${socket.id}`)
    socket.on('id', nombre=>{ // recibe con on el socket id
        usuarios.push({nombre, id:socket.id})
        socket.broadcast.emit('nuevoUsuario', nombre) //emite a todos menos al que lo envia
        socket.emit("hello", mensajes)
    });

    socket.on('mensaje', datos=>{
        mensajes.push(datos);
        io.emit('nuevoMensaje', datos)
    })

    socket.on("disconnect", ()=>{
        let usuario = usuarios.find(u=>u.id === socket.id)
        if (usuario) {
            io.emit("usuarioDesconectado", usuario.nombre)
        }
    })

})
