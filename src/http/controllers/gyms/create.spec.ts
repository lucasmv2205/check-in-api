import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-authenticate-user'

describe('Create gyms Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create gym', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'gym johndoe',
        description: 'some description',
        phone: '123456789',
        latitude: -23.5489,
        longitude: -46.6388,
      })

    expect(response.statusCode).toBe(201)
  })
})
