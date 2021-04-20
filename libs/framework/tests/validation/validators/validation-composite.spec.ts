import { MissingParamError } from '@/libs/framework/src/presentation/errors/missing-param-error'
import { Validation } from '@/libs/framework/src/presentation/protocols'
import { ValidationComposite } from '@/libs/framework/src/validation/validators/validation-composite'
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
  sut: ValidationComposite
  validationStub: Validation[]
}

const makeSut = (): SutType => {
  const validationStub = [makeValidation(), makeValidation()]
  const sut = new ValidationComposite(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('Validation Composite', () => {
  test('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new Error('field'))
    const error = sut.validate({ field: faker.random.word() })
    expect(error).toEqual(new Error('field'))
  })

  test('Should return the fisrt error if more then validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStub[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: faker.random.word() })
    expect(error).toEqual(new Error())
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ field: faker.random.word() })
    expect(error).toBeFalsy()
  })
})
