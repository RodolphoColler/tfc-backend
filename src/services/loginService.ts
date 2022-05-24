import bcrypt from 'bcryptjs';
import Users from '../database/models/users';
import { IUser, IUserCredentials } from '../interfaces/userInterface';
import jwtToken from '../helpers/jwt';

export default class Login {
  static async getUser({ email, password }: IUserCredentials) {
    const user = await Users.findOne({ where: { email } });

    if (!user) return { code: 404, error: 'User not found' };

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return { code: 400, error: 'Incorrect email or password' };

    const userData = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };

    const token = jwtToken(userData);

    return { code: 200, result: { user: userData, token } };
  }

  static getUserRole(tokenPayload: IUser) {
    return { code: 200, result: tokenPayload.role };
  }
}
