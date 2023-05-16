import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { Route } from './routeInteface';

export class AuthRoute implements Route {
    public router: Router;

    constructor(private  readonly authController: AuthController) {
        this.router = Router();
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`/login`, this.authController.login.bind(this.authController));
        this.router.post(`/forgot-password`, this.authController.forgotPassword.bind(this.authController));
        this.router.post(`/reset-password`, this.authController.resetPassword.bind(this.authController));
    }
}