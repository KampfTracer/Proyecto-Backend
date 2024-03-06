import nodemailer from "nodemailer"
import { config } from "../config/config.dotenv.js"

const transport=nodemailer.createTransport(
    {
        service: 'gmail',
        port: 587, 
        auth: {
            user: "franciscogabrielaguilera@gmail.com",
            pass: config.EMAIL_PASS
        }
    }
)

export const sendEmail=(to, subject, message)=>{
    return transport.sendMail(
        {
            to, subject, 
            html: message
        }
    )    
}