import { config } from '../config/config.dotenv.js';
import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
    if (!req.cookies.ecommerce) {
        res.setHeader('Content-Type', 'application/json');
        return res.redirect('/login');
    }

    let token = req.cookies.ecommerce

    try {
        let user = jwt.verify(token, config.SECRETCODE)
        req.user = user
        next()
    } catch (error) {
        return res.status(401).json({ error })
    }

}

export default auth;