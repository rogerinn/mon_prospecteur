import { AddUser } from '@/products/api/src/domain/usecases/add-user'
import { UserModel } from '@/products/api/src/domain/models/user'
import { AddUserRepository } from '@/products/api/src/data/protocols/add-user-repository'
import { Hasher } from '../protocols/cryptography/hasher'

export class DbAddUser implements AddUser {
  constructor
  (
    private readonly addUserRepository: AddUserRepository,
    private readonly hasher: Hasher
  ) { }

  async add (user: DbAddUser.Params): Promise<UserModel> {
    const hashedPassword = await this.hasher.hash(user.password)
    return await this.addUserRepository.add({ ...user, password: hashedPassword })
  }
}

export namespace DbAddUser {
  export type Params = Omit<UserModel, 'id'>
}
