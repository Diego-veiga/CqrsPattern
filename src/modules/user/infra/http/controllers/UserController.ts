import CreateUserCommandHandler from '@modules/user/commands/handles/CreateUserCommandHandler';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class UserController {
  async create(request: Request, response: Response): Promise<Response> {
    const createCommandHandler = container.resolve(CreateUserCommandHandler);
    const { name, lastName, email, password } = request.body;
    await createCommandHandler.handle({ name, lastName, email, password });

    return response.status(201).json({ message: 'user created successfully' });
  }
}
