import { AddUser } from '@/products/api/src/domain/usecases/add-user'
import { UserModel } from '@/products/api/src/domain/models/user'

export interface AddUserRepository {
  add: (account: AddUserRepository.Params) => Promise<UserModel>
}

export namespace AddUserRepository {
  export type Params = AddUser.Params
}
