import { App } from "./app";
import {AuthRoute} from './routes/authRoute';
import {CognitoService} from './services/cognitoService';
import {AuthController} from './controllers/authController';

const app = new App([
    new AuthRoute(new AuthController(new CognitoService()))
])

app.listen();