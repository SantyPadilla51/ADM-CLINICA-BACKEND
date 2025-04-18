import { Router } from "express"
import { crearUsuario, mostrarPefil, iniciarSesion, recuperarPassword, comprobarToken, nuevoPassword, confirmarCuenta, eliminarPerfil, editarPefil } from "../controllers/DoctorController.js"
import authMiddleware from "../middleware/authMiddleware.js"

const routerDoc = Router()

routerDoc.post('/crear-usuario', crearUsuario)
routerDoc.post('/iniciar-sesion', iniciarSesion)
routerDoc.get('/confirmar-cuenta/:token', confirmarCuenta)
routerDoc.post('/olvide-password', recuperarPassword)
routerDoc.get('/olvide-password/:token', comprobarToken)
routerDoc.post('/olvide-password/:token', nuevoPassword)
routerDoc.get('/perfil', authMiddleware, mostrarPefil)
routerDoc.put('/editar-perfil/:id', authMiddleware, editarPefil)
routerDoc.delete('/eliminar-perfil/:id', authMiddleware, eliminarPerfil)


export default routerDoc