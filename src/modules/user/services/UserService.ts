import { inject, injectable } from 'tsyringe';
import { ICreateUser } from '../domain/ICreateUsers';
import { IUpdateUser } from '../domain/IUpdateUsers';
import IUsersRepository from '../domain/repositories/IUsersRepository';
import UserView from '../domain/UserView';
import IUserService from './interfaces/IUserService';

@injectable()
export default class UserService implements IUserService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUsersRepository,
  ) {}
  async FindAll(): Promise<UserView[]> {
    return await this.userRepository.findAll();
  }

  async FindByEmail(email: string): Promise<UserView | null> {
    return await this.userRepository.findByEmail(email);
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
  async update(user: IUpdateUser): Promise<void> {
    await this.userRepository.update(user);
  }
}
