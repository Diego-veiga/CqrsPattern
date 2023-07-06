import UserView from '@modules/user/domain/UserView';
import IUserService from '@modules/user/services/interfaces/IUserService';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IGetUserByIdQuery from '../IGeUserByIdQuery';

@injectable()
export default class GetUserByIdQueryHandler {
  constructor(@inject('UserService') private userService: IUserService) {}
  async handle(query: IGetUserByIdQuery): Promise<UserView | null> {
    const user = await this.userService.FindById(query.id);
    if (!user) {
      throw new AppError('User not found ');
    }

    return user;
  }
}
