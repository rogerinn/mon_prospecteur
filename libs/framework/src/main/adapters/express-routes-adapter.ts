import { IController } from '@/libs/framework/src/presentation/protocols'
import { Request, Response } from 'express'

export const adaptRoute = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const request = {
      body: req.body
    }
    const httpResponse = await controller.handle(request)
    if (httpResponse) res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
