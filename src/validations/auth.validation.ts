import Joi from "joi"


export const registerValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
    username: Joi.string().required()
})


export const loginValidationSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
})
