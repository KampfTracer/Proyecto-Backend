import { Router } from 'express';
import passport from 'passport';
import { usuariosModelo } from '../dao/models/usuario.modelo.js';
import { creaHash, validaPassword } from '../utils.js';
import { generaToken, passportCall } from "../utils.js";
import {MiRouter} from "./router.js";

export class SessionsRouter extends MiRouter {
    init() {
        this.post("/registro", ["PUBLIC"], passportCall("registro"), (req, res) => {
            return res.successAlta("Registro correcto...!!!", req.user);
        });

        this.post("/login", ["PUBLIC"], passportCall("login"), (req, res) => {
            let token = generaToken(req.user);
            res.cookie("coderCookie", token, { httpOnly: true, maxAge: 1000 * 60 * 60 });
            return res.success(`Login correcto para el usuario ${req.user.nombre}, con rol: ${req.user.rol}`);
        });
    }
}

export const router = Router();

router.get('/github', passport.authenticate('github', {}), (req, res) => {});

router.get('/callbackGithub', passport.authenticate('github', { failureRedirect: "/api/sessions/errorGithub" }), (req, res) => {
    console.log(req.user);
    req.session.usuario = req.user;
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        message: "Acceso OK...!!!", usuario: req.user
    });
});

router.get('/errorGithub', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        error: "Error al autenticar con Github"
    });
});

router.get('/errorLogin', (req, res) => {
    return res.redirect('/login?error=Error en el proceso de login... :(');
});

router.post('/login', passport.authenticate('login', { failureRedirect: '/api/sessions/errorLogin' }), async (req, res) => {
    console.log(req.user);
    req.session.usuario = {
        nombre: req.user.nombre, email: req.user.email
    };
    res.redirect('/perfil');
});

router.get('/errorRegistro', (req, res) => {
    return res.redirect('/registro?error=Error en el proceso de registro');
});

router.post('/registro', passport.authenticate('registro', { failureRedirect: '/api/sessions/errorRegistro' }), async (req, res) => {
    let { email } = req.body;
    res.redirect(`/login?mensaje=Usuario ${email} registrado correctamente`);
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.redirect('/login?error=fallo en el logout');
        }
    });
    res.redirect('/login');
});
