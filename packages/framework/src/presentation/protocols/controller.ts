import { HttpResponse } from '@/framework/src/presentation/protocols/index'

export interface IController<T = any> {
  handle: (request: T) => Promise<HttpResponse|null>
}
