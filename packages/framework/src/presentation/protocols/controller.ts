import { HttpResponse } from '@/framework/src/presentation/protocols/index'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
