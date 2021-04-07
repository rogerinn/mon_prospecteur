import { badRequest, ErrorHandling } from '@/framework/src/presentation/helpers'

type SutType = {
  sut: ErrorHandling
}

const makeSut = (): SutType => {
  const sut = new ErrorHandling()
  return {
    sut
  }
}

describe('Error handling', () => {
  test('Should call validation with correct values', async () => {
    const { sut } = makeSut()
    const exception = {
      name: 'Missing param',
      message: 'any_message'
    }
    const response = sut.handle(exception)
    expect(response).toEqual(badRequest(exception))
  })
})
