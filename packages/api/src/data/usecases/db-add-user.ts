import { AddUser } from '@/api/src/domain/usecases/add-user'
import { UserModel } from '@/api/src/domain/models/user'
import { AddUserRepository } from '@/api/src/data/protocols/add-user-repository'

export class DbAddUser implements AddUser {
  constructor (private readonly addUserRepository: AddUserRepository) {}
  async add (user: DbAddUser.Params): Promise<UserModel> {
    return await this.addUserRepository.add(user)
  }
}

export namespace DbAddUser {
  export type Params = Omit<UserModel, 'id'>
}
