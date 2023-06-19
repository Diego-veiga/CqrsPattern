import CreateUserCommand from '../CreateUserCommand';

export default interface ICreateUserCommandHandler {
  handle(createUserCommand: CreateUserCommand): Promise<void>;
}
