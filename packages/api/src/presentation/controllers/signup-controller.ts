import { serverError, ok } from '@/framework/src/presentation/helpers'
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
        return ok(await this.addUser.add(request))
      } catch (error) {
        return serverError()
      }
    }
  }
}
