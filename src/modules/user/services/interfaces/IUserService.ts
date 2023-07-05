import { ICreateUser } from '@modules/user/domain/ICreateUsers';
import UserView from '@modules/user/domain/UserView';
import { string } from 'joi';

export default interface IUserService {
  ExistUserThisEmail(email: string): Promise<boolean>;
  FindById(id: string): Promise<UserView | null>;
  CreateUser(user: ICreateUser): Promise<void>;
  Delete(user: string): Promise<void>;
}
