import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import {engine} from 'express-handlebars';
import mongoose from 'mongoose'
import sessions from 'express-session'
import mongoStore from 'connect-mongo'
// import crypto from 'crypto' investigar un poco mas para poder darle una mejior valides 

import { router as vistasRouter } from './routes/vistas.router.js';
import { router as sessionRouter } from './routes/session.router.js';
import { usuariosModelo } from './dao/models/usuario.modelo.js';

import {initPassport} from './config/config.passport.js';
import passport from 'passport';

const PORT=3000;

const app=express();

app.use(sessions(
    {
        secret:"coder123",
        resave: true, saveUninitialized: true,
        store: mongoStore.create(
            {
                mongoUrl:'mongodb+srv://FranciscoAguilera:Coder1996@kampf96.kkrwrxi.mongodb.net/?retryWrites=true&w=majority',
                mongoOptions:{dbName:"Desafio6"},
                ttl:3600
            }
        )
    }
))
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname,'/views'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
initPassport()
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname,'/public')));

app.use('/', vistasRouter)
app.use('/api/sessions', sessionRouter)

const server=app.listen(PORT,()=>{
    console.log(`Server escuchando en puerto ${PORT}`);
});

try {
    mongoose.connect('mongodb+srv://backend49975:CoderCoder@cluster0.dxc9fdl.mongodb.net/?retryWrites=true&w=majority',
    {dbName:"clase19"})
    console.log("DB online...!!!")
    // await usuariosModelo.create({nombre:"Francisco", email:"fran@prueba.com", password: crypto.createHmac("sha256", "Coder123").update("123").digest("hex")})
    // console.log(await usuariosModelo.find())
} catch (error) {
    console.log(error.message)
}