import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import {
  getUsers, getUser, updateProfile, updateAvatar, getMe,
} from '../controllers/users';

const usersRouter = Router();

usersRouter.get('/', getUsers);
usersRouter.get('/me', getMe);
usersRouter.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().length(24).required(),
  }),
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().uri(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), getUser);
usersRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
  }),
}), updateProfile);
usersRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().uri(),
  }),
}), updateAvatar);

export default usersRouter;
