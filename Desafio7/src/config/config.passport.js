// config.passport.js
import passport from 'passport';
import local from 'passport-local';
import github from 'passport-github2';
import { usuariosModelo } from '../dao/models/usuario.modelo.js';
import { creaHash, validaPassword } from '../utils.js';

export const initPassport = () => {
    // Estrategia de GitHub
    passport.use('github', new github.Strategy(
        {
            clientID: "Iv1.c5336e4be86af1e0", 
            clientSecret: "9a1c10917a971f20848f569f55ea5631c5b11c3e", 
            callbackURL: "http://localhost:3000/api/sessions/callbackGithub", 
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let usuario = await usuariosModelo.findOne({ email: profile._json.email });

                if (!usuario) {
                    let nuevoUsuario = {
                        nombre: profile._json.name,
                        email: profile._json.email,
                        profile,
                    };

                    usuario = await usuariosModelo.create(nuevoUsuario);
                }

                return done(null, usuario);

            } catch (error) {
                return done(error);
            }
        }
    ));

    // Estrategia de registro local
    passport.use('registro', new local.Strategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
        },
        async (req, email, password, done) => {
            try {
                password = creaHash(password);

                let usuario = await usuariosModelo.create({ email, password });

                return done(null, usuario);

            } catch (error) {
                return done(error);
            }
        }
    ));

    // Estrategia de login local
    passport.use('login', new local.Strategy(
        {
            usernameField: 'email',
        },
        async (email, password, done) => {
            try {
                let usuario = await usuariosModelo.findOne({ email }).lean();

                if (!usuario) {
                    return done(null, false, { message: 'Usuario no encontrado' });
                }

                if (!validaPassword(usuario, password)) {
                    return done(null, false, { message: 'Credenciales incorrectas' });
                }

                delete usuario.password;
                return done(null, usuario);

            } catch (error) {
                return done(error);
            }
        }
    ));

    // Serializador y deserializador
    passport.serializeUser((usuario, done) => {
        return done(null, usuario._id);
    });

    passport.deserializeUser(async (id, done) => {
        let usuario = await usuariosModelo.findById(id);
        return done(null, usuario);
    });
};
