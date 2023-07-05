import { ICreateUser } from '@modules/user/domain/ICreateUsers';
import IUserService from '@modules/user/services/interfaces/IUserService';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import ICreateUserCommand from '../Interfaces/ICreateUserCommand';

@injectable()
export default class CreateUserCommandHandler {
  constructor(@inject('UserService') private userService: IUserService) {}
  async handle(createUserCommand: ICreateUserCommand): Promise<void> {
    if (await this.userService.ExistUserThisEmail(createUserCommand.email)) {
      throw new AppError('There is already a user with this Email');
    }

    const newUser: ICreateUser = {
      name: createUserCommand.name,
      lastName: createUserCommand.lastName,
      email: createUserCommand.email,
      password: await hash(createUserCommand.password, 8),
    };

    await this.userService.CreateUser(newUser);
  }
}
