import { serverError } from '@/framework/src/presentation/helpers'
import { IController, HttpResponse, Validation, IErrorHandling } from '@/framework/src/presentation/protocols'
import { AddUser } from '../../domain/usecases/add-account'

export namespace SignUp {
  export type Request = {
    email: string
    password: string
    confirmPassword: string
  }

  export class Controller implements IController {
    constructor (
      private readonly validation: Validation,
      private readonly errorHandler: IErrorHandling,
      private readonly addUser: AddUser
    ) { }

    async handle (request: SignUp.Request): Promise<HttpResponse | null> {
      try {
        const error = this.validation.validate(request)
        if (error) {
          return this.errorHandler.handle(error)
        }
        await this.addUser.add(request)
        return null
      } catch (error) {
        return serverError()
      }
    }
  }
}
