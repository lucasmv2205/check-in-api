import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/test/create-authenticate-user'

describe('Profile Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get user profile', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response_profile = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(response_profile.statusCode).toBe(200)
    expect(response_profile.body).toEqual({
      user: {
        id: expect.any(String),
        name: 'johndoe',
        email: 'johndoe@example.com',
        created_at: expect.any(String),
      },
    })
  })
})
