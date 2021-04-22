import { AddUserRepository } from '@/products/api/src/data/protocols/add-user-repository'
import { MongoHelper } from '@/products/api/src/infra/db/mongodb/helpers/mongo-helper'
import { AddUserMongoRepository } from '@/products/api/src/infra/db/mongodb/user-repository/user'

type SutTypes = {
  sut: AddUserRepository
}
const makeSut = (): SutTypes => {
  const sut = new AddUserMongoRepository()
  return {
    sut
  }
}
describe('User Mongo repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect()
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const usersCollection = await MongoHelper.getCollection('users')
    await usersCollection.deleteMany({})
  })

  test('Should return an user on success ', async () => {
    const { sut } = makeSut()
    const user = await sut.add({
      email: 'any_email',
      password: 'any_password'
    })
    expect(user).toBeTruthy()
    expect(user.id).toBeTruthy()
    expect(user.email).toBe('any_email')
    expect(user.password).toBe('any_password')
  })
})
