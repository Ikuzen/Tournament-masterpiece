const Joi = require('@hapi/joi');
export const users_schema = Joi.object({
    username: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .min(7)
        .max(30)
        .required(),
    email: Joi.string().email({ tlds: { allow: false } }),
    birthDate: Joi.date()

})

export function schemaVerify(object: any): any {
    return users_schema.validate(object);
}
