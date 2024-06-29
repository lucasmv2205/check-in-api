import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-authenticate-user'

describe('nearby gyms Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'javascript',
        description: 'some description',
        phone: '123456789',
        latitude: -18.794968,
        longitude: -48.1124632,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'typescript',
        description: 'some description',
        phone: '123456789',
        latitude: -18.9221205,
        longitude: -48.2493067,
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({ latitude: -18.794968, longitude: -48.1124632 })
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'javascript',
      }),
    ])
  })
})
