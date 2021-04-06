import { Validation } from '@/framework/src/presentation/protocols'
import { SignUpController } from '@/api/src/presentation/controllers/signup-controller'

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
    await sut.handle({ email: 'any_data', password: 'any_password', confirmPassword: 'any_password' })
    expect(validationSpy).toHaveBeenCalledWith({ email: 'any_data', password: 'any_password', confirmPassword: 'any_password' })
  })

  test('Should return null', async () => {
    const { sut } = makeSut()
    const response = await sut.handle({ email: 'any_data', password: 'any_password', confirmPassword: 'any_password' })
    expect(response).toBeNull()
  })
})
