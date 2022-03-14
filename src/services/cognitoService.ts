import {AuthenticationDetails, CognitoUserPool, CognitoUser} from 'amazon-cognito-identity-js';
import {userPoolId, clientId} from '../config/cognitoConfig';

class CognitoService {
    private readonly userPool: CognitoUserPool;

    constructor() {
        this.userPool = new CognitoUserPool({UserPoolId: userPoolId, ClientId: clientId});
    }

    public async login(username: string, password: string) {
        const loginDetails = {
            Username: username,
            Password: password
        };

        const authenticationDetails = new AuthenticationDetails(loginDetails);

        const userDetails = {
            Username: username,
            Pool: this.userPool
        };
        const cognitoUser = new CognitoUser(userDetails);

        return new Promise((resolve, reject) => {
            cognitoUser.authenticateUser(authenticationDetails, {
                onSuccess: data => resolve({token: data.getIdToken().getJwtToken(), payload: data.getIdToken().payload}),
                newPasswordRequired: (userAttributes) => {
                    cognitoUser.completeNewPasswordChallenge(loginDetails.Password, {email: userAttributes.email}, {
                        onSuccess: data => resolve({token: data.getIdToken().getJwtToken(), payload: data.getIdToken().payload}),
                        onFailure: err => reject(err)
                    });
                },
                onFailure: err => reject(err)
            });
        })
    };

    public async forgotPassword(username: string) {
        const userDetails = {
            Username: username,
            Pool: this.userPool
        };
        const cognitoUser = new CognitoUser(userDetails);

        return new Promise((resolve, reject) => {
            cognitoUser.forgotPassword({
                onSuccess: data => resolve(data),
                onFailure: err => reject(err)
            })
        })
    }

    public async resetPassword(username: string, verificationCode: string, newPassword: string) {
        const userDetails = {
            Username: username,
            Pool: this.userPool
        };
        const cognitoUser = new CognitoUser(userDetails);

        return new Promise((resolve, reject) => {
            cognitoUser.confirmPassword(verificationCode, newPassword, {
                onSuccess: (): void => resolve(true),
                onFailure: err => reject(err)
            })
        })
    }
}

export {CognitoService};