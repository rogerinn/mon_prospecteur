import { badRequest } from '@/framework/src/presentation/helpers'
import { HttpResponse } from '../protocols'

export interface IErrorHandling {
  handle: (error: Error) => HttpResponse
}

export class ErrorHandling implements IErrorHandling {
  handle (error: Error): HttpResponse {
    const errors = {
      'Missing param': badRequest(error)
    }
    return errors[error.name]
  }
}
