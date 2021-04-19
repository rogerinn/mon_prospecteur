import { AddUserRepository } from '@/api/src/data/protocols/add-user-repository'
import { UserModel } from '@/api/src/domain/models/user'
import { DbAddUser } from '@/api/src/data/usecases/db-add-user'
import faker from 'faker'

const makeFakeUser = (): UserModel => ({
  id: faker.datatype.id,
  email: faker.internet.email(),
  password: faker.internet.email()

})

const makeAddUserRepository = (): AddUserRepository => {
  class AddUserRepositoryStub implements AddUserRepository {
    async add (input: DbAddUser.Params): Promise<UserModel> {
      return await new Promise(resolve => resolve(makeFakeUser()))
    }
  }
  return new AddUserRepositoryStub()
}

type SutType = {
  sut: DbAddUser
  addUserRepositoryStub: AddUserRepository
}

const makeSut = (): SutType => {
  const addUserRepositoryStub = makeAddUserRepository()
  const sut = new DbAddUser(addUserRepositoryStub)
  return {
    sut,
    addUserRepositoryStub
  }
}

describe('DbAddUser controller', () => {
  test('Should call repository with correct values', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addUserSpy = jest.spyOn(addUserRepositoryStub, 'add')
    const { id, ...rest } = makeFakeUser()
    await sut.add(rest)
    expect(addUserSpy).toHaveBeenCalledWith(rest)
  })
})
