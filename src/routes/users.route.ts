import { Router, Request, NextFunction, Response} from "express";
import jwtAutheticationMiddleware from '../middlewares/jwt-authentication.middleware';
import userRepository from "../repositories/user.repository";

//import { StatusCodes } from "http-status-codes";

//get /users
//get /users/:uuid
//post /users
//put /users/:uuid
//delete/users/:uuid

const usersRouter = Router();

usersRouter.get('/users', jwtAutheticationMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    res.status(200).send(users);

});

usersRouter.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const uuid = req.params.uuid;
        const user = await userRepository.findById(uuid);
        res.status(200).send(user);
    } catch (error) {
       next(error);
    }    
});

usersRouter.post('/users', async (req: Request, res: Response, next: NextFunction) => { 
    const newUser = req.body;
    const uuid = await userRepository.create(newUser);
    res.status(201).send(uuid);
});

usersRouter.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    const modifiedfUser = req.body;
    modifiedfUser.uuid = uuid;
    await userRepository.update(modifiedfUser);
    res.status(200).send();
});

usersRouter.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    const uuid = req.params.uuid;
    await userRepository.remove(uuid);
    res.sendStatus(200);
});

export default usersRouter;