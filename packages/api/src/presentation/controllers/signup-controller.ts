
export namespace SignUpController {
  export type Request = {
    email: string
    password: string
    confirmPassword: string
  }

  export class Controller implements IController {
    constructor (private readonly validation: Validation,
      private readonly errorHandler: IErrorHandling
    ) { }

    async handle (request: SignUp.Request): Promise<HttpResponse | null> {
      try {
        const error = this.validation.validate(request)
        if (error) {
          return this.errorHandler.handle(error)
        }
        return null
      } catch (error) {
        return serverError()
      }
    }
  }
}
