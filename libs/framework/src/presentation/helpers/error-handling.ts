import { badRequest } from '@/libs/framework/src/presentation/helpers'
import { HttpResponse, IErrorHandling } from '@/libs/framework/src/presentation/protocols'

export class ErrorHandling implements IErrorHandling {
  handle (error: Error): HttpResponse {
    const errors = {
      'Missing param': badRequest(error)
    }
    return errors[error.name]
  }
}
