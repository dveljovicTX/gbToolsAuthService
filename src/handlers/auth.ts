import {
    validateLoginSchema,
    forgotPasswordValidator,
    resetPasswordValidator
} from '../validators/authRequestsValidator';
import {httpOk, httpBadRequest} from '../helpers/getJsonResponse';
import {CognitoService} from '../services/cognitoService';

const cognitoService = new CognitoService();

const login = async (event: any) => {
    const body = JSON.parse(event.body);
    const {error} = validateLoginSchema(body);
    if (error) return httpBadRequest(error.message);
    const {username, password} = body;
    try {
        const authData = await cognitoService.login(username, password);
        return httpOk(authData);
    } catch (e) {
        return httpBadRequest(e);
    }
};

const forgotPassword = async (event: any) => {
    const body = JSON.parse(event.body);
    const {error} = forgotPasswordValidator(body);
    if (error) return httpBadRequest(error.message);
    const {username} = body;
    try {
        const res = await cognitoService.forgotPassword(username);
        return httpOk(res);
    } catch (e) {
        return httpBadRequest(e);
    }
}

const resetPassword = async (event: any) => {
    const body = JSON.parse(event.body);
    const {error} = resetPasswordValidator(body);
    if (error) return httpBadRequest(error.message);
    const {username, newPassword, verificationCode} = body;
    try {
        await cognitoService.resetPassword(username, verificationCode, newPassword);
        return httpOk({message: 'Password changed successfully'});
    } catch (e) {
        return httpBadRequest(e);
    }
}

export {login, forgotPassword, resetPassword};