import { Router } from "express";
const routerauth = Router();
import * as controller from '../controller/AuthController.js';
import userVerification from "../middlewares/authMiddleware.js";

routerauth.post('/signup', controller.Signup)
routerauth.post('/login', controller.Login)
routerauth.post('/',userVerification)
export default routerauth