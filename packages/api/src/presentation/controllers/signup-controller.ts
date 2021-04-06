import { serverError } from '@/framework/src/presentation/helpers'
import { Controller, HttpResponse, Validation } from '@/framework/src/presentation/protocols'

export class SignUpController implements Controller {
  constructor (private readonly validation: Validation) { }

  async handle (request: SignUpController.Request): Promise<HttpResponse|null> {
    try {
      this.validation.validate(request)
      return null
    } catch (error) {
      return serverError()
    }
  }
}

export namespace SignUpController {
  export type Request = {
    email: string
    password: string
    confirmPassword: string
  }
}
