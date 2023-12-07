import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Ruta de usuarios');
});

router.post('/', (req, res) => {
  // Lógica para manejar la creación de un nuevo usuario
  res.send('Crear nuevo usuario');
});

export default router;
