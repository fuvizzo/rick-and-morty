import Joi from 'joi';

const onlyLettersRegex = /^[a-zA-Z\u00C0-\u017F\s]+$/;

const FieldProps = {
  FirstName: { LABEL: 'First name' },
  LastName: { LABEL: 'Last name' },
  Email: { LABEL: 'Email address' },
  Password: { LABEL: 'Password' },
  RefreshToken: { LABEL: 'Refresh token' },
};

const email = Joi.string().email().required().label(FieldProps.Email.LABEL);
const password = Joi.string().required().label(FieldProps.Password.LABEL);

export const SignUpSchema = Joi.object({
  firstName: Joi.string().regex(onlyLettersRegex).required().label(FieldProps.FirstName.LABEL),
  lastName: Joi.string().regex(onlyLettersRegex).required().label(FieldProps.LastName.LABEL),
  email,
  password,
});

export const SignInSchema = Joi.object({
  email,
  password,
});

export const RefreshTokenSchema = Joi.string().required().label(FieldProps.RefreshToken.LABEL);
