import { MongoHelper } from '../helpers/mongo-helper'
import { AddUserRepository } from '@/products/api/src/data/protocols/add-user-repository'
import { UserModel } from '@/products/api/src/domain/models/user'

export class AddUserMongoRepository implements AddUserRepository {
  async add (data: AddUserRepository.Params): Promise<UserModel> {
    const userCollection = await MongoHelper.getCollection('accounts')
    const result = await userCollection.insertOne(data)
    return MongoHelper.map((result).ops[0])
  }
}
