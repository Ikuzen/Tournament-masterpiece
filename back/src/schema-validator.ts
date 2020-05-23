const Joi = require('@hapi/joi');
export const tournament_schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    size: Joi.number()
        .integer()
        .min(2)
        .max(256)
        .required()
})
    .with('name', 'size')

