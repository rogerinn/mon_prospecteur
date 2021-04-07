import { Validation } from '@/framework/src/presentation/protocols'
import { badRequest, serverError } from '@/framework/src/presentation/helpers'
import { MissingParamError } from '@/framework/src/presentation/errors/missing-param-error'
import { SignUpController } from '@/api/src/presentation/controllers/signup-controller'
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
  sut: SignUpController
  validationStub: Validation
}

const makeFakeRequest = (): SignUpController.Request => {
  const password = faker.internet.email()
  return {
    email: faker.internet.email(),
    password,
    confirmPassword: password
  }
}

const makeSut = (): SutType => {
  const validationStub = makeValidation()
  const sut = new SignUpController(validationStub)
  return {
    sut,
    validationStub
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
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(serverError())
  })

  test('Should return error if validation returns error', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(badRequest(new MissingParamError('field')))
  })

  test('Should return null', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    const response = await sut.handle(request)
    expect(response).toBeNull()
  })
})
