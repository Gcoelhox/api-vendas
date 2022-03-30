import { Router } from 'express';
import ForgotPasswordController from '../controller/ForgotPasswordController';
import { celebrate, Joi, Segments } from 'celebrate';
import ResetPassword from '../controller/ResetPasswordController';

const passwordRouter = Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPassword = new ResetPassword();

passwordRouter.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
    },
  }),
  forgotPasswordController.create,
);

passwordRouter.post(
  '/reset',
  celebrate({
    [Segments.BODY]: {
      password: Joi.string().required(),
      token: Joi.string().uuid().required(),
      password_confirmation: Joi.string().required().valid(Joi.ref('password')),
    },
  }),
  resetPassword.create,
);

export default passwordRouter;
