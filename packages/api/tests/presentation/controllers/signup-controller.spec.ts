import { HttpResponse, Validation, IErrorHandling } from '@/framework/src/presentation/protocols'
import { badRequest, serverError } from '@/framework/src/presentation/helpers'
import { MissingParamError } from '@/framework/src/presentation/errors/missing-param-error'
import { SignUp } from '@/api/src/presentation/controllers/signup-controller'
import faker from 'faker'
import { AddUser } from '@/api/src/domain/usecases/add-account'
import { UserModel } from '@/api/src/domain/models/account'

const makeFakeRequest = (): SignUp.Request => {
  const password = faker.internet.email()
  return {
    email: faker.internet.email(),
    password,
    confirmPassword: password
  }
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

const makeErrorHandling = (): IErrorHandling => {
  class ErrorHandlingStub implements IErrorHandling {
    handle (error: Error): HttpResponse {
      return badRequest(error)
    }
  }
  return new ErrorHandlingStub()
}

const makeAddUser = (): AddUser => {
  class AddUserStub implements AddUser {
    async add (params: AddUser.Params): Promise<UserModel> {
      return new Promise((resolve) => resolve({ id: faker.datatype.id, ...params }))
    }
  }
  return new AddUserStub()
}

type SutType = {
  sut: SignUp.Controller
  validationStub: Validation
  errorHandlingStub: IErrorHandling
  addUserStub: AddUser
}

const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const errorHandlingStub = makeErrorHandling()
  const addUserStub = makeAddUser()
  const sut = new SignUp.Controller(validationStub, errorHandlingStub, addUserStub)
  return {
    sut,
    validationStub,
    errorHandlingStub,
    addUserStub
  }
}

describe('SignUp controller', () => {
  test('Should call validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(validationSpy).toHaveBeenCalledWith(request)
  })

  test('Should return error if validation returns error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('field')))
  })

  test('Should throws if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(serverError())
  })

  test('Should call error handling with correct error', async () => {
    const { sut, validationStub, errorHandlingStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    const errorHandlingSpy = jest.spyOn(errorHandlingStub, 'handle')
    await sut.handle(makeFakeRequest())
    expect(errorHandlingSpy).toHaveBeenCalledWith(new MissingParamError('any_field'))
  })

  test('Should return error if validation returns error', async () => {
    const { sut, validationStub, errorHandlingStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    jest.spyOn(errorHandlingStub, 'handle').mockReturnValueOnce(badRequest(new MissingParamError('any_field')))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('any_field')))
  })

  test('Should throws if error handling throws', async () => {
    const { sut, validationStub, errorHandlingStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
    jest.spyOn(errorHandlingStub, 'handle').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(serverError())
  })

  test('Should call addUserStub with correct values', async () => {
    const { sut, addUserStub } = makeSut()
    const validationSpy = jest.spyOn(addUserStub, 'add')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(validationSpy).toHaveBeenCalledWith(request)
  })

  test('Should throws if addUserStub throws', async () => {
    const { sut, addUserStub } = makeSut()
    jest.spyOn(addUserStub, 'add').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(serverError())
  })

  test('Should return null', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toBeNull()
  })
})
