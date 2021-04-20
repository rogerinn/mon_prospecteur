
import { BcryptAdapter } from '@/products/api/src/infra/cryptography/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'hash'
  }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt Adapter', () => {
  describe('hash()', () => {
    test('Should call hash with correct values', async () => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should throw if hash throws', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })
  })
})
