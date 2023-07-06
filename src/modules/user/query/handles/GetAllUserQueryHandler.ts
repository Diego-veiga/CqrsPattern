import UserView from '@modules/user/domain/UserView';
import IUserService from '@modules/user/services/interfaces/IUserService';

import { inject, injectable } from 'tsyringe';

@injectable()
export default class GetAllUserQueryHandler {
  constructor(@inject('UserService') private userService: IUserService) {}
  async handle(): Promise<UserView[]> {
    const user = await this.userService.FindAll();

    return user;
  }
}
