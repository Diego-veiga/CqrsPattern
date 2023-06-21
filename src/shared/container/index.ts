import IUserToUserViewMapper from '@modules/user/domain/mappers/IUserToUserView.mapper';
import IUsersRepository from '@modules/user/domain/repositories/IUsersRepository';
import UsersRepository from '@modules/user/infra/typeorm/repository/UsersRepository';
import { UserToUserViewMapper } from '@modules/user/mappers/userToUserView.mappper';
import IUserService from '@modules/user/services/interfaces/IUserService';
import UserService from '@modules/user/services/UserService';
import { container } from 'tsyringe';

container.registerSingleton<IUserService>('UserService', UserService);

container.registerSingleton<IUsersRepository>(
  'UserRepository',
  UsersRepository,
);
container.registerSingleton<IUserToUserViewMapper>(
  'UserToUserViewMapper',
  UserToUserViewMapper,
);
