const Joi = require('joi');

const validateRegisterInput = (input) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(5).max(255).required(),
        email: Joi.string().min(5).max(255).required().email(),
    });

    return schema.validate(input);
}

exports.validateRegisterInput = validateRegisterInput;