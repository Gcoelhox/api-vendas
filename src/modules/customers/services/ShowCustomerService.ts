import Customer from '../typeorm/entities/Customer';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import CustomersRepository from '../typeorm/repositories/CustomersRepository';

interface IRequest {
  id: string;
}

class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Usuário não encontrado', 404);
    }
    return customer;
  }
}

export default ShowCustomerService;
