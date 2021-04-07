import { HttpResponse, Validation } from '@/framework/src/presentation/protocols'
import { badRequest, serverError, IErrorHandling } from '@/framework/src/presentation/helpers'
import { MissingParamError } from '@/framework/src/presentation/errors/missing-param-error'
import { SignUp } from '@/api/src/presentation/controllers/signup-controller'
import faker from 'faker'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | undefined {
      return undefined
    }
  }
  return new ValidationStub()
}

type SutType = {
  sut: SignUp.Controller
  validationStub: Validation
  errorHandlingStub: IErrorHandling
}

const makeErrorHandling = (): IErrorHandling => {
  class ErrorHandling implements IErrorHandling {
    handle (error: Error): HttpResponse {
      return badRequest(error)
    }
  }
  return new ErrorHandling()
}

const makeFakeRequest = (): SignUp.Request => {
  const password = faker.internet.email()
  return {
    email: faker.internet.email(),
    password,
    confirmPassword: password
  }
}

const makeFakeRequest = (): SignUpController.Request => {
  const password = faker.internet.email()
  return {
    email: faker.internet.email(),
    password,
    confirmPassword: password
  }>>>>>>> main
}

const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const errorHandlingStub = makeErrorHandling()
  const sut = new SignUp.Controller(validationStub, errorHandlingStub)
  return {
    sut,
    validationStub,
    errorHandlingStub
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

  test('Should throws if validation throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(serverError())
  })

  test('Should return error if validation returns error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(badRequest(new MissingParamError('field')))
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

  test('Should throws if throws', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockImplementationOnce(() => { throw new Error() })
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(serverError())
  })

  test('Should return null', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toBeNull()
  })
})
