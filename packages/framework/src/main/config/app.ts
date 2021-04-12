import express from 'express'
import setupMiddlewares from './middlewares'
import SetupRoutes from './routes'

const app = express()
setupMiddlewares(app)
SetupRoutes(app)
export default app
