import { Express } from 'express'
import { bodyParser, cors, contentType } from '@/libs/framework/src/main/middlewares/index'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
