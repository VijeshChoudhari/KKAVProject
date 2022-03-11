const Joi = require('@hapi/joi');


//Validatiion Schema for Registeration
const registerValidation = (data) =>{
    const schema = Joi.object({
        Email : Joi.string().min(8).email().required(),
        Password : Joi.string().min(6).required()
    });
    return schema.validate({Email : data.email , Password : data.password}) 
}

//Validation schema for Login
const LoginValidation = (data) =>{
    const schema = Joi.object({
        Email : Joi.string().min(8).email().required(),
        Password : Joi.string().min(6).required()
    });
    return schema.validate({Email : data.email , Password : data.password}) 
}

//Validation schema for Profile Setup
const ProfileValidation = (data) =>{
    const schema = Joi.object({
        Name : Joi.string().min(5).required(),
        Profile : Joi.string().required(),
        Role : Joi.string(),
        Working_Place : Joi.string(),
        Github_Profile : Joi.string().required().min(8),
        LinkedIn_Profile : Joi.string().required().min(6)
    });
    return schema.validate({
        Name : data.name,
        Profile : data.profile,
        Role : data.role,
        Working_Place : data.working_place,
        Github_Profile : data.github_profile,
        LinkedIn_Profile : data.linkedin_profile
    }) 
}

//Validation for Project adding
const ProjectValidation = (data)=>{
    const schema = Joi.object({
        Project_Name : Joi.string().min(3).required(),
        Tech_Stack : Joi.array().required(),
        Github_Link : Joi.string().required(),
        About_Project : Joi.string().required(),
    })
    return schema.validate({
        Project_Name : data.project_name,
        Tech_Stack : data.tech_stack,
        Github_Link : data.github_link,
        About_Project : data.about_project
    })
}

module.exports.registerValidation = registerValidation;
module.exports.LoginValidation = LoginValidation;
module.exports.ProfileValidation = ProfileValidation;
module.exports.ProjectValidation = ProjectValidation;