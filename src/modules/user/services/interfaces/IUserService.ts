import { ICreateUser } from '@modules/user/domain/ICreateUsers';

export default interface IUserService {
  ExistUserThisEmail(email: string): Promise<boolean>;
  CreateUser(user: ICreateUser): Promise<void>;
}
