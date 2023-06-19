import { container } from 'tsyringe';
import '@modules/users/providers';
import IUsersRepository from '@modules/user/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repository/UsersRepository';
import UserService from '@modules/user/services/UserService';
import IUserService from '@modules/user/services/interfaces/IUserService';

//Services
container.registerSingleton<IUserService>('UserService', UserService);

//Repositories
container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository,
);
