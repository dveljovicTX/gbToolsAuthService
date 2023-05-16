import { NextFunction, Request, Response } from 'express';
import {CognitoService} from '../services/cognitoService';
import {
    forgotPasswordValidator,
    resetPasswordValidator,
    validateLoginSchema
} from '../validators/authRequestsValidator';

export class AuthController {
    constructor(
        private readonly cognitoService: CognitoService
    ){}

    public async login(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const {error} = validateLoginSchema(req.body);
        if (error) return res.send(400).send({message: error.message});
        try {
            const {username, password} = req.body;
            const authData = await this.cognitoService.login(username, password);
            return res.status(200).send(authData);
        } catch (e) {
            return res.status(400).send(e);
        }
    }

    public async forgotPassword(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const {error} = forgotPasswordValidator(req.body);
        if (error) return res.send(400).send({message: error.message});
        const {username} = req.body;
        try {
            const data = await this.cognitoService.forgotPassword(username);
            return res.status(200).send(data);
        } catch (e) {
            return res.status(400).send(e);
        }
    }

    public async resetPassword(req: Request, res: Response, next: NextFunction): Promise<Response> {
        const {error} = resetPasswordValidator(req.body);
        if (error) return res.send(400).send({message: error.message});
        const {username, newPassword, verificationCode} = req.body;
        try {
            await this.cognitoService.resetPassword(username, verificationCode, newPassword);
            return res.status(200).send({message: 'Password changed successfully'});
        } catch (e) {
            return res.status(400).send(e);
        }
    }
}