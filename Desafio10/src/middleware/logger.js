import winston from 'winston';
import { config } from '../config/config.dotenv.js';

// Filtra solo mensajes de nivel "info"
const filterInfo = winston.format((info) => {
    if (info.level === "info") {
        return info;
    }
});

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    }
};

// Configuración del logger
const logger = winston.createLogger({
    levels: customLevels.levels,
    transports: [
        // Transporte para registros de nivel "info"
        new winston.transports.File({
            level: "info",
            filename: "../src/logs/info.log",
            format: winston.format.combine(
                filterInfo(),
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
        // Transporte para registros de nivel "error"
        new winston.transports.File({
            level: "error",
            filename: "../src/logs/errors.log",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            )
        }),
    ]
});

// Transporte para registros en la consola (solo en desarrollo)
const developmentLogger = new winston.transports.Console({
    level: "debug",
    format: winston.format.combine(
        winston.format.colorize({
            colors: {
                fatal: "red",
                error: "red",
                warning: "yellow",
                info: "green",
                http: "cyan",
                debug: "blue"
            }
        }),
        winston.format.timestamp(),
        winston.format.simple()
    )
});

// Agrega el transporte de consola solo en modo desarrollo
if (config.MODE === "development") {
    logger.add(developmentLogger);
}

// Middleware para agregar el logger a la solicitud
export const loggerMiddleware = (req, res, next) => {
    req.logger = logger;

    next();
};

export default { loggerMiddleware, logger };
