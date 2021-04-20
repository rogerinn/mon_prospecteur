import { serverError, ok } from '@/libs/framework/src/presentation/helpers'
import { IController, HttpResponse, Validation, IErrorHandling } from '@/libs/framework/src/presentation/protocols'
import { AddUser } from '../../domain/usecases/add-user'

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

    async handle (request: SignUp.Request): Promise<HttpResponse> {
      try {
        const error = this.validation.validate(request)
        if (error) {
          return this.errorHandler.handle(error)
        }
        const { email, password } = request
        return ok(await this.addUser.add({ email, password }))
      } catch (error) {
        return serverError()
      }
    }
  }
}
