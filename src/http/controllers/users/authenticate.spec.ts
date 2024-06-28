import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'

describe('Authenticate Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    const response_register = await request(app.server).post('/users').send({
      name: 'johndoe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const response_session = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: '123456',
    })

    console.log(response_session.body)

    expect(response_register.statusCode).toBe(201)
    expect(response_session.statusCode).toBe(200)
    expect(response_session.body).toEqual({
      user: {
        id: expect.any(String),
        email: 'johndoe@example.com',
      },
      token: expect.any(String),
    })
  })
})
