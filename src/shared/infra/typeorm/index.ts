import User from '@modules/user/infra/typeorm/entities/user';
import { DataSource } from 'typeorm';
import { CreateUser1682587596261 } from './migrations/1682587596261-CreateUser';
import { AddColumnActiveInUser1687342743718 } from './migrations/1687342743718-addColumnActiveInUser';

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.HOST_DATABASE || 'localhost',
  port: Number(process.env.PORT_DATABASE) || 5432,
  username: process.env.USERNAME_DATABASE || 'postgres',
  password: process.env.PASSWORD_DATABASE || '1234',
  database: process.env.DATABASE || 'cqrs',
  entities: [User],
  logging: true,
  migrations: [CreateUser1682587596261, AddColumnActiveInUser1687342743718],
});
