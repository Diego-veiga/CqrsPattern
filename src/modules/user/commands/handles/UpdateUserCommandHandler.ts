import { IUpdateUser } from '@modules/user/domain/IUpdateUsers';
import IUserService from '@modules/user/services/interfaces/IUserService';
import { AppError } from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';
import IUpdateUserCommand from '../Interfaces/IUpdateUserCommand';

@injectable()
export default class UpdateUserCommandHandler {
  constructor(@inject('UserService') private userService: IUserService) {}
  async handle(updateUserCommand: IUpdateUserCommand): Promise<void> {
    const userExist = await this.userService.FindById(updateUserCommand.id);
    if (!userExist) {
      throw new AppError('User not found');
    }
    const userWithEmail = await this.userService.FindByEmail(
      updateUserCommand.email,
    );
    if (userWithEmail && userWithEmail.id !== updateUserCommand.id) {
      throw new AppError(
        'There is already another user with this e-mail address ',
      );
    }
    const updateUser: IUpdateUser = {
      id: updateUserCommand.id,
      name: updateUserCommand.name,
      lastName: updateUserCommand.lastName,
      email: updateUserCommand.email,
      password: await hash(updateUserCommand.password, 8),
    };
    await this.userService.update(updateUser);
  }
}
