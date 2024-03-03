import dotenv from 'dotenv'
import {__dirname} from '../utils.js'
dotenv.config({
    override:true,
    path: `${__dirname}/.env` 
})

export const config={
    PORT:process.env.PORT||8080,
    MONGO_URL:process.env.MONGO_URL, 
    SECRETCODE:process.env.SECRETCODE, 
    DBNAME:process.env.DBNAME,
    GITHUB_CLIENT:process.env.GITHUB_CLIENT,
    GITHUB_SECRET:process.env.GITHUB_SECRET
}