import { Request, Response, NextFunction, Router } from "express";
import JWT from 'jsonwebtoken';
import basicAuthenticationMiddleware from "../middlewares/basic-authentication.middleware";
import jwtAutheticationMiddleware from "../middlewares/jwt-authentication.middleware";
import ForbiddenError from "../models/errors/forbidden.error.model";

const authorizationRoute = Router();

authorizationRoute.post('/token/validate', jwtAutheticationMiddleware, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
});

authorizationRoute.post('/token', basicAuthenticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try{
    const user = req.user;
    if (!user) {
        throw new ForbiddenError('usuário não informado!');
    }
    const jwtPayload = { username: user.username };
    const jwtOptions = { subject: user?.uuid };
    const secretKey = 'my_secret_key';
    const jwt = JWT.sign(jwtPayload, secretKey, jwtOptions);
    res.status(200).json( { token: jwt });
   
    } catch (error) {
        next(error);
    }
});



export default authorizationRoute;