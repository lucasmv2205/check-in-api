import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-authenticate-user'

describe('Search gyms Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'javascript',
        description: 'some description',
        phone: '123456789',
        latitude: -23.5489,
        longitude: -46.6388,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'typescript',
        description: 'some description',
        phone: '123456789',
        latitude: -23.5489,
        longitude: -46.6388,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ q: 'javascript' })
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
