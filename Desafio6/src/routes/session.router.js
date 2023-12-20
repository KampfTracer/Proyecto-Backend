import { Router } from 'express';
import { usuariosModelo } from '../dao/models/usuario.modelo.js'
import crypto from 'crypto'
export const router = Router();

router.post('/login', async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        return res.redirect('/login?error=Complete todos los datos');
    }

    password = crypto.createHmac("sha256", "coder123").update(password).digest("hex");

    let usuario = await usuariosModelo.findOne({ email, password });
    
    if (!usuario) {
        return res.redirect('/login?error=Credenciales incorrectas');
    }

    req.session.usuario = {
        nombre: usuario.nombre,
        email: usuario.email
    };

    res.redirect('/perfil');
});

router.post('/registro', async (req, res) => {
    let { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
        return res.redirect('/registro?error=Complete todos los datos');
    }

    let existe = await usuariosModelo.findOne({ email });
    if (existe) {
        return res.redirect(`/registro?error=Existen usuarios similares con email ${email} en la base de datos`);
    }

    password = crypto.createHmac("sha256", "coder123").update(password).digest("hex");

    try {
        let usuario = await usuariosModelo.create({ nombre, email, password });
        res.redirect(`/login?mensaje=Usuario ${email} registrado correctamente`);
    } catch (error) {
        res.redirect('/registro?error=Error inesperado. Reintente mas tarde');
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.redirect('/login?error=Fallo en el logout');
        }
    });

    res.redirect('/login');
});
