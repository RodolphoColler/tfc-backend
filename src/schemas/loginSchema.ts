import joi from 'joi';

const joiObject = joi.object({
  email: joi.string().empty().required()
    .regex(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    .messages({
      'any.required': '404|Email is required',
      'string.empty': '400|All fields must be filled',
      'string.pattern.base': '401|Incorrect email or password',
    }),
  password: joi.string().min(6).empty().required()
    .messages({
      'any.required': '404|Password is required',
      'string.empty': '400|All fields must be filled',
      'string.min': '401|Incorrect email or password',
    }),
});

export default joiObject;
