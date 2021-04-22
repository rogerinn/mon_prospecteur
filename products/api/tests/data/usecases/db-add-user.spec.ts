import { AddUserRepository } from '@/products/api/src/data/protocols/add-user-repository'
import { UserModel } from '@/products/api/src/domain/models/user'
import { DbAddUser } from '@/products/api/src/data/usecases/db-add-user'
import { Hasher } from '@/products/api/src/data/protocols/cryptography/hasher'
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

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (plaintext: string): Promise<string> {
      return await new Promise(resolve => resolve(faker.datatype.uuid))
    }
  }
  return new HasherStub()
}

type SutType = {
  sut: DbAddUser
  addUserRepositoryStub: AddUserRepository
  hasherStub: Hasher
}

const makeSut = (): SutType => {
  const addUserRepositoryStub = makeAddUserRepository()
  const hasherStub = makeHasher()
  const sut = new DbAddUser(addUserRepositoryStub, hasherStub)
  return {
    sut,
    addUserRepositoryStub,
    hasherStub
  }
}

describe('DbAddUser controller', () => {
  test('Should call repository with correct values', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    const addUserSpy = jest.spyOn(addUserRepositoryStub, 'add')
    const { id, ...rest } = makeFakeUser()
    await sut.add(rest)
    expect(addUserSpy).toHaveBeenCalledWith({ ...rest, password: faker.datatype.uuid })
  })

  test('Should throws if repository throws', async () => {
    const { sut, addUserRepositoryStub } = makeSut()
    jest.spyOn(addUserRepositoryStub, 'add').mockImplementationOnce(() => { throw new Error() })
    const { id, ...rest } = makeFakeUser()
    const promise = sut.add(rest)
    await expect(promise).rejects.toThrow()
  })

  test('Should call hash with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const hasherSpy = jest.spyOn(hasherStub, 'hash')
    const { id, password, ...rest } = makeFakeUser()
    await sut.add({ ...rest, password })
    expect(hasherSpy).toHaveBeenCalledWith(password)
  })

  test('Should call hash with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockImplementationOnce(async () => { throw new Error() })
    const { id, ...rest } = makeFakeUser()
    const promise = sut.add(rest)
    await expect(promise).rejects.toThrow()
  })
})
