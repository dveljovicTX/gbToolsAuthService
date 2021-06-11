import * as joi from 'joi';

const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().required()
});

const forgotPasswordSchema = joi.object({
    username: joi.string().required()
});

const resetPasswordSchema = joi.object({
    username: joi.string().required(),
    verificationCode: joi.string().required(),
    newPassword: joi.string().required()
});

const validateLoginSchema = (payload: object) => {
    return loginSchema.validate(payload);
}

const forgotPasswordValidator = (payload: object) => {
    return forgotPasswordSchema.validate(payload);
}

const resetPasswordValidator = (payload: object) => {
    return resetPasswordSchema.validate(payload);
}

export {validateLoginSchema, forgotPasswordValidator, resetPasswordValidator};