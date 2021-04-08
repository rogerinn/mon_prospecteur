import { AccountModel } from '@/api/src/domain/models/account'

export interface AddAccount {
  add: (account: AddAccount.Params) => Promise<AccountModel>
}

export namespace AddAccount {
  export type Params = Omit<AccountModel, 'id'>

  export type Result = boolean
}
