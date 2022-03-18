import { NextFunction, Request, Response, Router } from 'express';

const statusRoute = Router();

statusRoute.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(200);
});

export default statusRoute;