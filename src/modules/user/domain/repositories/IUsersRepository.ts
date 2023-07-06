import User from '@modules/user/infra/typeorm/entities/user';
import { ICreateUser } from '../ICreateUsers';
import { IUpdateUser } from '../IUpdateUsers';
import UserView from '../UserView';

export default interface IUsersRepository {
  create(user: ICreateUser): Promise<User>;
  findByEmail(email: string): Promise<UserView | null>;
  findById(id: string): Promise<UserView | null>;
  findAll(): Promise<UserView[]>;
  delete(id: string): Promise<void>;
  update(user: IUpdateUser): Promise<void>;
}
