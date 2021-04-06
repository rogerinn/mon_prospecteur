import { Controller, HttpResponse, Validation } from '@/framework/src/presentation/protocols'

export class SignUpController implements Controller {
  constructor (private readonly validation: Validation) { }

  async handle (request: SignUpController.Request): Promise<HttpResponse|null> {
    return null
  }
}

export namespace SignUpController {
  export type Request = {
    email: string
    password: string
    confirmPassword: string
  }
}
