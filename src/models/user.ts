import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: true,
    },
    about: {
      type: String,
      minlength: 2,
      maxlength: 200,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

export default model<IUser>('user', userSchema);
