const Joi = require('@hapi/joi');

const registerValidation = async (data) =>{
    const schema = Joi.object({
        Email : Joi.string().min(10).email().required(),
        Password : Joi.string().min(6).required()
    });
    return schema.validate({Email : data.email , Password : data.password}) 
}

const LoginValidation = async (data) =>{
    const schema = Joi.object({
        Email : Joi.string().min(10).email().required(),
        Password : Joi.string().min(6).required()
    });
    return schema.validate({Email : data.email , Password : data.password}) 
}
module.exports.registerValidation = registerValidation;
module.exports.LoginValidation = LoginValidation;