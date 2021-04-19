import { UserModel } from '@/api/src/domain/models/user'

export interface AddUser {
  add: (account: AddUser.Params) => Promise<UserModel>
}

export namespace AddUser {
  export type Params = Omit<UserModel, 'id'>
}
