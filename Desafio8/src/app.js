import __dirname from './utils.js';
import path from 'path';
import express from 'express';
import session from 'express-session';
import { engine } from 'express-handlebars';
import mongoose from 'mongoose';
// import crypto from 'crypto' investigar un poco mas para poder darle una mejor validez

import { router as vistasRouter } from './routes/vistas.router.js';
import { router as sessionRouter } from './routes/session.router.js';
import { initPassport } from './config/config.passport.js';
import passport from 'passport';

const PORT = 3000;

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'coder123',
    resave: true,
    saveUninitialized: true
  }));
  
initPassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/public')));

app.use('/', vistasRouter);
app.use('/api/sessions', sessionRouter);

const server = app.listen(PORT, () => {
    console.log(`Server escuchando en puerto ${PORT}`);
});

try {
    mongoose.connect('mongodb+srv://backend49975:CoderCoder@cluster0.dxc9fdl.mongodb.net/?retryWrites=true&w=majority',
        { dbName: "clase24" });
    console.log("DB online...!!!");
    // await usuariosModelo.create({nombre:"Francisco", email:"fran@prueba.com", password: crypto.createHmac("sha256", "Coder123").update("123").digest("hex")})
    // console.log(await usuariosModelo.find())
} catch (error) {
    console.log(error.message);
}
