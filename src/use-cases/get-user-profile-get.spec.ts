import { it, describe, expect, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repositories'
import { hash } from 'bcryptjs'
import { GetUserProfileUseCase } from './get-user-profile'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

let prismaUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    prismaUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(prismaUsersRepository) // sut -> system under test
  })

  it('should be able to get user profile', async () => {
    const createdUser = await prismaUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('John Doe')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(async () => {
      await sut.execute({
        userId: 'non existing id',
      })
    }).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
