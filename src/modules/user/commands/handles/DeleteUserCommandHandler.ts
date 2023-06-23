import IUserService from '@modules/user/services/interfaces/IUserService';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IDeleteUserCommand from '../Interfaces/IDeleteUserCommand';

@injectable()
export default class DeleteUserCommandHandler {
  constructor(@inject('UserService') private userService: IUserService) {}
  async handle(deleteUserCommand: IDeleteUserCommand): Promise<void> {
    if (!(await this.userService.FindById(deleteUserCommand.id))) {
      throw new AppError('There is already a user with this Email');
    }

    await this.userService.Delete(deleteUserCommand.id);
  }
}
