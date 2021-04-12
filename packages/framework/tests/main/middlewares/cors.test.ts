import app from '@/framework/src/main/config/app'
import request from 'supertest'

describe('Cors middleware', () => {
  test('Should enable cors', async () => {
    app.post('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_body_parser')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-methods', '*')
      .expect('access-control-allow-headers', '*')
  })
})
