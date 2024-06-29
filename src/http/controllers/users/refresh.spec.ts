import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Refresh Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to refresh token', async () => {
    await request(app.server).post('/users').send({
      name: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')

    const response_refresh = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies ? cookies.join('; ') : '')
      .send()

    expect(response_refresh.body).toEqual({
      token: expect.any(String),
      user: {
        id: expect.any(String),
      },
    })

    expect(response_refresh.statusCode).toBe(200)
  })
})
