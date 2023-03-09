import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { Route } from './routeInteface';

export class AuthRoute implements Route {
    public path = '/auth';
    public router: Router;

    constructor(private  readonly authController: AuthController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/login`, this.authController.login.bind(this.authController));
        this.router.post(`${this.path}/forgot-password`, this.authController.forgotPassword.bind(this.authController));
        this.router.post(`${this.path}/reset-password`, this.authController.resetPassword.bind(this.authController));
    }
}