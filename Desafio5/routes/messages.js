// Importa los modelos y las bibliotecas necesarias
import express from 'express';
import Message from '../src/dao/models/messagesmodels';

const messagesRouter = express.Router();
export default messagesRouter;

// Obtener todos los mensajes
messagesRouter.get('/', async (req, res) => {
  try {
    const mensajes = await Message.find();
    res.status(200).json(mensajes);
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    res.status(500).json({ error: 'Error interno del servidor al obtener mensajes' });
  }
});

// Agregar un nuevo mensaje
messagesRouter.post('/', async (req, res) => {
  try {
    const newMessage = req.body;


    const mensaje = await Message.create(newMessage);

    res.status(201).json({ message: 'Mensaje agregado exitosamente', mensaje });
  } catch (error) {
    console.error('Error al agregar un nuevo mensaje:', error);
    res.status(500).json({ error: 'Error interno del servidor al agregar un mensaje' });
  }
});


