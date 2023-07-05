import { ICreateUser } from '@modules/user/domain/ICreateUsers';
import { IUpdateUser } from '@modules/user/domain/IUpdateUsers';
import UserView from '@modules/user/domain/UserView';

export default interface IUserService {
  FindByEmail(email: string): Promise<UserView | null>;
  FindById(id: string): Promise<UserView | null>;
  CreateUser(user: ICreateUser): Promise<void>;
  Delete(user: string): Promise<void>;
  update(user: IUpdateUser): Promise<void>;
}
