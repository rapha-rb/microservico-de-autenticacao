import express, { NextFunction, Request, Response } from 'express';
import errorHandler from './middlewares/error-handler.middleware';
import authorizationRoute from './routes/authorization.route';
import statusRoute from './routes/status.route';
import usersRouter from './routes/users.route';



const app = express();

//configurações da aplicação (middles)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//configurações da rotas
app.use(statusRoute);
app.use(usersRouter);
app.use(authorizationRoute);

//configuração do handler de erro
app.use(errorHandler)

//configurações do servidor
app.listen(3000, () => {
    console.log('Aplicação executando na porta 3000');
});