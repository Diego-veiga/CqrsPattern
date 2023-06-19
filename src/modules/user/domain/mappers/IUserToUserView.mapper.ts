import User from '@modules/user/infra/typeorm/entities/user';
import UserView from '../UserView';

export default interface IUserToUserViewMapper {
  mapperUserToUserView(model: User): UserView;
}
