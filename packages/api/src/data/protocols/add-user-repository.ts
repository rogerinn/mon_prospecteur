import { AddUser } from '@/api/src/domain/usecases/add-user'
import { UserModel } from '@/api/src/domain/models/user'

export interface AddUserRepository {
  add: (account: AddAccountRepository.Params) => Promise<UserModel>
}

export namespace AddAccountRepository {
  export type Params = AddUser.Params
  export type Result = boolean
}
