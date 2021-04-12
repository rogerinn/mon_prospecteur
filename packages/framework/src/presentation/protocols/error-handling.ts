import { HttpResponse } from './index'

export interface IErrorHandling {
  handle: (error: Error) => HttpResponse
}
