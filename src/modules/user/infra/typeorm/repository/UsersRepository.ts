import IUsersRepository from '@modules/user/domain/repositories/IUsersRepository';
import User from '../entities/user';
import { inject, injectable } from 'tsyringe';
import { Repository } from 'typeorm';
import { ICreateUser } from '@modules/user/domain/ICreateUsers';
import UserView from '@modules/user/domain/UserView';
import { IUpdateUser } from '@modules/user/domain/IUpdateUsers';
import { dataSource } from '@shared/infra/typeorm';
import { generatedId } from '@shared/utils/generateId';
import { UserToUserViewMapper } from '@modules/user/mappers/userToUserView.mappper';

@injectable()
export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor(
    @inject('UserToUserViewMapper')
    private userToUserViewMapper: UserToUserViewMapper,
  ) {
    this.ormRepository = dataSource.getRepository(User);
  }

  async create(user: ICreateUser): Promise<User> {
    const newUser = this.ormRepository.create(user);
    newUser.id = generatedId();

    return await this.ormRepository.save(newUser);
  }
  async findByEmail(email: string): Promise<UserView | null> {
    const userData = await this.ormRepository.findOne({ where: { email } });
    if (userData) {
      return this.userToUserViewMapper.mapperUserToUserView(userData);
    }
    return null;
  }

  async findAll(): Promise<UserView[]> {
    const usersView: UserView[] = [];
    const usersData = await this.ormRepository.find();
    if (usersData.length) {
      usersData.forEach(ud => {
        usersView.push(this.userToUserViewMapper.mapperUserToUserView(ud));
      });
    }
    return usersView;
  }
  async findById(id: string): Promise<UserView | null> {
    const userData = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    if (userData) {
      return this.userToUserViewMapper.mapperUserToUserView(userData);
    }
    return null;
  }

  async delete(id: string): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(User)
      .set({
        active: false,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  async update(user: IUpdateUser): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update(User)
      .set({
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      })
      .where('id = :id', { id: user.id })
      .execute();
  }
}
