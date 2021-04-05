import { HttpResponse } from '@api/presentation/protocols'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
