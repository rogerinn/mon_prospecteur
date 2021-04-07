import { badRequest } from '@/framework/src/presentation/helpers'

export class ErrorHandling {
  handle (error: Error): Error | undefined {
    const errors = {
      'Missing param': badRequest(error)
    }
    return errors[error.name]
  }
}
