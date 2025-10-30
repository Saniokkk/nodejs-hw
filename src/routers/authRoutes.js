import { Router } from 'express';
import { celebrate } from 'celebrate';

import { loginUser, registerUser } from '../controllers/authController.js';
import { loginUserSchema, registerUserSchema } from '../validations/authValidation.js';

const authRouter = new Router()

authRouter.use("/auth/register", celebrate(registerUserSchema), registerUser)
authRouter.use("/auth/login", celebrate(loginUserSchema), loginUser)

export default authRouter

