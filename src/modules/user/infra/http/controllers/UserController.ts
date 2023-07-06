import CreateUserCommandHandler from '@modules/user/commands/handles/CreateUserCommandHandler';
import DeleteUserCommandHandler from '@modules/user/commands/handles/DeleteUserCommandHandler';
import UpdateUserCommandHandler from '@modules/user/commands/handles/UpdateUserCommandHandler';
import GetAllUserQueryHandler from '@modules/user/query/handles/GetAllUserQueryHandler';
import GetUserByIdQueryHandler from '@modules/user/query/handles/GetUserByIdQueryHandler';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const createCommandHandler = container.resolve(CreateUserCommandHandler);
    const { name, lastName, email, password } = request.body;
    await createCommandHandler.handle({ name, lastName, email, password });

    return response.status(201).json({ message: 'user created successfully' });
  }
  async delete(request: Request, response: Response): Promise<Response> {
    const deleteCommandHandler = container.resolve(DeleteUserCommandHandler);
    const { id } = request.params;
    await deleteCommandHandler.handle({ id });

    return response.status(200).json({ message: 'user successfully removed' });
  }
  async update(request: Request, response: Response): Promise<Response> {
    const updateCommandHandler = container.resolve(UpdateUserCommandHandler);
    const { id } = request.params;
    const { name, lastName, email, password } = request.body;
    await updateCommandHandler.handle({ id, name, lastName, email, password });

    return response.status(200).json({ message: 'user successfully updated' });
  }
  async findById(request: Request, response: Response): Promise<Response> {
    const getUserByIdQueryHandler = container.resolve(GetUserByIdQueryHandler);
    const { id } = request.params;

    const user = await getUserByIdQueryHandler.handle({
      id,
    });

    return response.status(200).json(user);
  }
  async findAll(request: Request, response: Response): Promise<Response> {
    const getAllUserQueryHandler = container.resolve(GetAllUserQueryHandler);

    const users = await getAllUserQueryHandler.handle();

    return response.status(200).json(users);
  }
}
