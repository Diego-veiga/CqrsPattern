import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/ICreateUsers';
import IUsersRepository from '../domain/repositories/IUsersRepository';
import UserView from '../domain/UserView';
import IUserService from './interfaces/IUserService';

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}

  async ExistUserThisEmail(email: string): Promise<boolean> {
    const userExist = await this.userRepository.findByEmail(email);
    return userExist ? true : false;
  }
  async CreateUser(user: ICreateUser): Promise<void> {
    await this.userRepository.create(user);
  }
  async FindById(id: string): Promise<UserView | null> {
    return await this.userRepository.findById(id);
  }
  async Delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
