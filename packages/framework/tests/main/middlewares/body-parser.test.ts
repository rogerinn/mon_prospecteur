import app from '@/framework/src/main/config/app'
import request from 'supertest'

describe('Body parser middleware', () => {
  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'Rogerio' })
      .expect({ name: 'Rogerio' })
  })
})
